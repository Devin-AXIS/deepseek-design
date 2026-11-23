import {
  EXCLUDED_TAGS,
  mintHfId,
  walkCompositionDescendants,
} from "@hyperframes/parsers/hf-ids";
import type { TimelineElement } from "../player/store/playerStore";
import { formatTimelineAttributeNumber } from "../player/components/timelineEditing";
import { timeRangesOverlap } from "../player/components/timelineCollision";
import {
  deduplicateIds,
  insertAsSibling,
  type TimelineClipboardClip,
} from "./clipboardPayload";
import { carryLook, copiedSelector, renamedIds } from "./clipboardLook";
import { collectHtmlIds } from "./studioHelpers";
import { insertTimelineAssetIntoSource } from "./timelineAssetDrop";

export interface PlacedClip {
  track: number;
  start: number;
  duration: number;
}

function tracksOverlap(a: PlacedClip, b: PlacedClip): boolean {
  return (
    a.track === b.track &&
    timeRangesOverlap(
      a.start,
      a.start + a.duration,
      b.start,
      b.start + b.duration,
    )
  );
}

/** Keep the authored track when it is free over the new time range. */
export function resolveFreeTrack(
  preferred: PlacedClip,
  taken: readonly PlacedClip[],
): number {
  if (!taken.some((t) => tracksOverlap(preferred, t))) return preferred.track;
  const maxTrack = taken.reduce(
    (max, t) => Math.max(max, t.track),
    preferred.track,
  );
  return maxTrack + 1;
}

function allocateCopyId(used: Set<string>, original: string) {
  let id = original;
  for (let suffix = 2; used.has(id); suffix++) id = `${original}-${suffix}`;
  used.add(id);
  return id;
}

const compositionIdsIn = (content: string) =>
  new Set(
    Array.from(
      content.matchAll(/\bdata-composition-id\s*=\s*["']([^"']+)["']/gi),
      (match) => match[1]!,
    ),
  );

/** Mint preview and composition-instance identities in the same file edit as the clone. */
function prepareMarkup(
  html: string,
  parser: DOMParser,
  takenHfIds: Set<string>,
  takenCompositionIds: Set<string>,
  stableIds: Map<string, string>,
): Element | null {
  const root = parser.parseFromString(html, "text/html").body.firstElementChild;
  if (!root) return null;
  const elements = [root];
  walkCompositionDescendants(root, (el) => elements.push(el));
  for (const el of elements) {
    const compositionId = el.getAttribute("data-composition-id");
    if (compositionId && el.hasAttribute("data-composition-src")) {
      const instanceId = allocateCopyId(takenCompositionIds, compositionId);
      if (instanceId !== compositionId) {
        if (!el.hasAttribute("data-hf-original-composition-id"))
          el.setAttribute("data-hf-original-composition-id", compositionId);
        el.setAttribute("data-composition-id", instanceId);
      }
    }
    if (EXCLUDED_TAGS.has(el.tagName.toLowerCase())) {
      el.removeAttribute("data-hf-id");
    } else {
      const oldId = el.getAttribute("data-hf-id");
      const newId = mintHfId(el, takenHfIds);
      if (oldId) stableIds.set(oldId, newId);
      el.setAttribute("data-hf-id", newId);
    }
  }
  return root;
}

function fallbackMarkup(html: string) {
  return html.replace(/\sdata-hf-id=("[^"]*"|'[^']*')/g, "");
}

function retargetMotionMarkup(
  markup: string,
  parser: DOMParser,
  ids: ReadonlyMap<string, string>,
  stableIds: ReadonlyMap<string, string>,
) {
  if (!markup.includes("data-ipw-motion-selector")) return markup;
  const root = parser.parseFromString(markup, "text/html").body
    .firstElementChild;
  if (!root) return markup;
  const retarget = (element: Element) => {
    const selector = element.getAttribute("data-ipw-motion-selector");
    const target = selector && copiedSelector(selector, ids, stableIds);
    if (target) element.setAttribute("data-ipw-motion-selector", target);
  };
  retarget(root);
  walkCompositionDescendants(root, retarget);
  return root.outerHTML;
}

const HF_ID_ATTR_RE = /\bdata-hf-id\s*=\s*["']?([^"'\s>]+)/gi;
const hfIdsInFile = (content: string) =>
  new Set(Array.from(content.matchAll(HF_ID_ATTR_RE), (match) => match[1]));

export function pasteElementHtml(
  content: string,
  payload: {
    html: string;
    originSelector?: string;
    originSelectorIndex?: number;
  },
  fromThisFile = false,
): string {
  const parser = new DOMParser();
  const stableIds = new Map<string, string>();
  const root = prepareMarkup(
    payload.html,
    parser,
    hfIdsInFile(content),
    compositionIdsIn(content),
    stableIds,
  );
  const reminted = root?.outerHTML ?? fallbackMarkup(payload.html);
  const deduped = deduplicateIds(reminted, collectHtmlIds(content));
  const renames = renamedIds(reminted, deduped);
  const result = insertAsSibling(
    content,
    retargetMotionMarkup(deduped, parser, renames, stableIds),
    payload.originSelector,
    payload.originSelectorIndex,
  );
  return fromThisFile ? carryLook(result, renames, 0, stableIds) : result;
}

/** Shared insertion path for paste and duplicate, anchored at the playhead or the selection's end. Returns the
 *  final ids so the caller can select what it placed, and the furthest end any clip lands at so it can grow the
 *  root duration to cover it. `fromThisFile`: the clips came from `content`, so a renamed copy takes its
 *  original's look. */
export function pasteTimelineClips(
  content: string,
  clips: readonly TimelineClipboardClip[],
  anchorTime: number,
  liveElements: readonly TimelineElement[],
  fromThisFile = false,
): { content: string; ids: string[]; requiredEnd: number } {
  const groupMinStart = Math.min(...clips.map((c) => c.start));
  let existingIds = collectHtmlIds(content);
  const taken: PlacedClip[] = liveElements.map((el) => ({
    track: el.authoredTrack ?? el.track,
    start: el.start,
    duration: el.duration,
  }));
  const ids: string[] = [];
  let result = content;
  let requiredEnd = 0;
  const domParser = new DOMParser();
  const takenHfIds = hfIdsInFile(content);
  const takenCompositionIds = compositionIdsIn(content);
  for (const clip of clips) {
    const newStart = anchorTime + (clip.start - groupMinStart);
    const newTrack = resolveFreeTrack(
      { track: clip.track, start: newStart, duration: clip.duration },
      taken,
    );
    taken.push({ track: newTrack, start: newStart, duration: clip.duration });
    requiredEnd = Math.max(requiredEnd, newStart + clip.duration);

    const stableIds = new Map<string, string>();
    const root = prepareMarkup(
      clip.html,
      domParser,
      takenHfIds,
      takenCompositionIds,
      stableIds,
    );
    const authoredStart = Number(
      root?.getAttribute("data-start") ?? clip.start,
    );
    if (root?.hasAttribute("data-start"))
      root.setAttribute("data-start", formatTimelineAttributeNumber(newStart));
    if (root?.hasAttribute("data-track-index"))
      root.setAttribute("data-track-index", String(newTrack));
    const reminted = root?.outerHTML ?? fallbackMarkup(clip.html);
    const deduped = deduplicateIds(reminted, existingIds);
    const renames = renamedIds(reminted, deduped);
    existingIds = existingIds.concat(collectHtmlIds(deduped));
    result = insertTimelineAssetIntoSource(
      result,
      retargetMotionMarkup(deduped, domParser, renames, stableIds),
    );
    if (fromThisFile) {
      result = carryLook(
        result,
        renames,
        newStart -
          (Number.isFinite(authoredStart) ? authoredStart : clip.start),
        stableIds,
      );
    }

    const id = root && (renames.get(root.id) ?? root.id);
    if (id) ids.push(id);
  }
  return { content: result, ids, requiredEnd };
}
