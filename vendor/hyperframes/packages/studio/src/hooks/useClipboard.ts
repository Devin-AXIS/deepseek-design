import { useCallback, useRef } from "react";
import type { TimelineElement } from "../player";
import { usePlayerStore } from "../player";
import { rebaseExpandedTimelineEdit } from "../utils/timelineToolbarSelection";
import type { DomEditSelection } from "../components/editor/domEditing";
import {
  type ClipboardPayload,
  type TimelineClipboardClip,
} from "../utils/clipboardPayload";
import { pasteElementHtml, pasteTimelineClips } from "../utils/clipboardPlacement";
import { extendRootDurationInSource } from "../utils/rootDuration";
import { saveProjectFilesWithHistory, type RecordEditInput } from "../utils/studioFileHistory";
import { findElementForSelection } from "../components/editor/domEditingElement";
import { findTimelineElementInIframe, readFileContent } from "./timelineEditingHelpers";
import { buildTimelineElementKey } from "../player/lib/timelineElementHelpers";
import {
  authoredMarkup,
  findAuthoredElement,
  findAuthoredElementById,
  liveMarkupWithoutPreviewMarks,
  parseSavedSource,
} from "../utils/authoredSource";
import { serializeStudioFileMutations } from "../utils/studioFileMutationCoordinator";

type InPlace = { inPlace?: boolean };

const pasteStart = (
  payload: Extract<ClipboardPayload, { kind: "timeline-clip" }>,
  targetPath: string,
  playhead: number,
  options?: InPlace,
) =>
  options?.inPlace && payload.copiedInComposition === targetPath
    ? Math.min(...payload.clips.map((clip) => clip.start))
    : playhead;

const pasteWords = (payload: ClipboardPayload) =>
  payload.kind === "timeline-clip"
    ? {
        label: clipLabel("Paste", payload.clips.length),
        toast: clipToast("Pasted", payload.clips.length),
      }
    : { label: "Paste element", toast: "Pasted element" };

export interface UseClipboardOptions {
  projectId: string | null;
  activeCompPath: string | null;
  domEditSelectionRef: React.MutableRefObject<DomEditSelection | null>;
  showToast: (message: string, tone?: "error" | "info") => void;
  writeProjectFile: (path: string, content: string) => Promise<void>;
  recordEdit: (input: RecordEditInput) => Promise<void>;
  domEditSaveTimestampRef: React.MutableRefObject<number>;
  reloadPreview: () => void;
  handleTimelineElementDelete: (element: TimelineElement) => Promise<void>;
  handleDomEditElementDelete: (selection: DomEditSelection) => Promise<void>;
  previewIframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
  waitForPendingDomEditSaves: () => Promise<void>;
}

/** The timeline element(s) a copy/cut/duplicate acts on: the multi-selection
 *  when one is active, else the single primary selection. */
function getSelectedElements(): TimelineElement[] {
  const { selectedElementId, selectedElementIds, elements } = usePlayerStore.getState();
  if (!selectedElementId) return [];
  const ids = selectedElementIds.size > 1 ? selectedElementIds : new Set([selectedElementId]);
  return elements.filter((el) => ids.has(el.key ?? el.id));
}

function elementKey(domId: string, sourceFile: string): string {
  return buildTimelineElementKey({ id: domId, fallbackIndex: 0, domId, sourceFile });
}

/** "Paste clip" / "Paste clips" — the edit-history label, no count shown. */
function clipLabel(verb: string, clipCount: number): string {
  return `${verb} ${clipCount > 1 ? "clips" : "clip"}`;
}

/** "Pasted clip" / "Pasted 3 clips" — the toast message, count shown once plural. */
function clipToast(verbPast: string, clipCount: number): string {
  return clipCount > 1 ? `${verbPast} ${clipCount} clips` : `${verbPast} clip`;
}

function getSelectedDomElement(
  iframeRef: React.MutableRefObject<HTMLIFrameElement | null>,
  selection: DomEditSelection,
  activeCompositionPath: string | null,
): Element | null {
  let doc: Document | null = null;
  try {
    doc = iframeRef.current?.contentDocument ?? null;
  } catch {
    return null;
  }
  if (!doc) return null;

  return findElementForSelection(doc, selection, activeCompositionPath);
}

function savedMarkupElseLive(saved: Document, live: Element, sourceFile: string): string {
  const authored = findAuthoredElement(saved, live) ?? findAuthoredElementById(saved, live);
  return authored
    ? authoredMarkup(authored, live, sourceFile)
    : liveMarkupWithoutPreviewMarks(live);
}

async function readSavedMarkup(
  readSaved: (path: string) => Promise<string>,
  paths: string[],
  lives: Element[],
): Promise<string[]> {
  const sources = new Map<string, Promise<Document>>();
  return Promise.all(
    paths.map(async (path, index) => {
      if (!sources.has(path)) sources.set(path, readSaved(path).then(parseSavedSource));
      const saved = await (sources.get(path) as Promise<Document>);
      return savedMarkupElseLive(saved, lives[index] as Element, path);
    }),
  );
}

export function useClipboard({
  projectId,
  activeCompPath,
  domEditSelectionRef,
  showToast,
  writeProjectFile,
  recordEdit,
  domEditSaveTimestampRef,
  reloadPreview,
  handleTimelineElementDelete,
  handleDomEditElementDelete,
  previewIframeRef,
  waitForPendingDomEditSaves,
}: UseClipboardOptions) {
  const clipboardRef = useRef<Promise<ClipboardPayload | null> | null>(null);
  const projectIdRef = useRef(projectId);
  projectIdRef.current = projectId;

  // After any save still in flight on the file, so a copy right after an edit takes the edit.
  const readSaved = useCallback(
    async (path: string): Promise<string> => {
      const pid = projectIdRef.current;
      if (!pid) throw new Error("No project is open.");
      // Only the order matters here; a failed save already shows its own banner.
      await waitForPendingDomEditSaves().catch(() => {});
      return serializeStudioFileMutations(writeProjectFile, [path], () =>
        readFileContent(pid, path),
      );
    },
    [waitForPendingDomEditSaves, writeProjectFile],
  );

  // Resolved through findTimelineElementInIframe, the same composition-aware
  // lookup every other timeline editor uses — unlike findElementForSelection,
  // it can address a composition-instance clip's root.
  const findSelectedClips = useCallback((selected = getSelectedElements()): {
    elements: TimelineElement[];
    lives: Element[];
  } | null => {
    if (selected.length === 0) return null;
    const lives: Element[] = [];
    for (const element of selected) {
      const live = findTimelineElementInIframe(previewIframeRef.current, element, activeCompPath);
      if (!live) {
        showToast(`Unable to copy "${element.label ?? element.id}".`, "info");
        return null;
      }
      lives.push(live);
    }
    return { elements: selected, lives };
  }, [activeCompPath, previewIframeRef, showToast]);

  const readClips = useCallback(
    async (targets: {
      elements: TimelineElement[];
      lives: Element[];
    }): Promise<TimelineClipboardClip[]> => {
      const paths = targets.elements.map((el) => el.sourceFile || activeCompPath || "index.html");
      const markup = await readSavedMarkup(readSaved, paths, targets.lives);
      return targets.elements.map((element, index) => ({
        html: markup[index] as string,
        start: element.start,
        duration: element.duration,
        // authoredTrack, not track: `track` can be a display-lane number
        // remapped by normalizeToZones, and writing THAT into data-track-index
        // re-targets the wrong track in the sparse authored file.
        track: element.authoredTrack ?? element.track,
      }));
    },
    [activeCompPath, readSaved],
  );

  const copyTimelineSelection = useCallback((selected?: TimelineElement[]): Promise<ClipboardPayload> | null => {
    const targets = findSelectedClips(selected);
    if (!targets) return null;
    const sourceProjectId = projectIdRef.current;
    const sourceFile = targets.elements[0]?.sourceFile || activeCompPath || "index.html";
    return readClips(targets).then((clips) => {
      showToast(clips.length > 1 ? `Copied ${clips.length} clips` : "Copied clip", "info");
      return {
        kind: "timeline-clip",
        clips,
        sourceFile,
        projectId: sourceProjectId ?? undefined,
        copiedInComposition: activeCompPath || "index.html",
      };
    });
  }, [activeCompPath, findSelectedClips, readClips, showToast]);

  const copyDomSelection = useCallback(
    (domSelection: DomEditSelection): Promise<ClipboardPayload> | null => {
      const live = getSelectedDomElement(previewIframeRef, domSelection, activeCompPath);
      if (!live) {
        showToast("Unable to copy this element.", "info");
        return null;
      }
      const sourceFile = domSelection.sourceFile || activeCompPath || "index.html";
      const sourceProjectId = projectIdRef.current;
      return readSaved(sourceFile).then((content) => {
        showToast("Copied element", "info");
        return {
          kind: "dom-element",
          html: savedMarkupElseLive(parseSavedSource(content), live, sourceFile),
          sourceFile,
          projectId: sourceProjectId ?? undefined,
          originSelector: domSelection.selector,
          originSelectorIndex: domSelection.selectorIndex,
        };
      });
    },
    [activeCompPath, previewIframeRef, readSaved, showToast],
  );

  // The key handler needs its answer now, so the targets are found here and only the file read
  // is pending. Returns this copy's own result; a failed copy leaves the clipboard as it was.
  const copyToClipboard = useCallback((selected?: TimelineElement[]): Promise<ClipboardPayload | null> | null => {
    const domSelection = domEditSelectionRef.current;
    let pending: Promise<ClipboardPayload> | null;
    if (usePlayerStore.getState().selectedElementId) pending = copyTimelineSelection(selected);
    else if (domSelection) pending = copyDomSelection(domSelection);
    else {
      showToast("Nothing selected to copy.", "info");
      return null;
    }
    if (!pending) return null;
    const own = pending.catch((error: unknown) => {
      showToast(error instanceof Error ? error.message : "Failed to copy", "error");
      return null;
    });
    const previous = clipboardRef.current;
    const settled = own.then((payload) => payload ?? previous);
    clipboardRef.current = settled;
    void settled.then((payload) => {
      if (!payload && clipboardRef.current === settled) clipboardRef.current = null;
    });
    return own;
  }, [copyDomSelection, copyTimelineSelection, domEditSelectionRef, showToast]);

  const handleCopy = useCallback((): boolean => copyToClipboard() !== null, [copyToClipboard]);

  // Two independent paste modes (timeline clip vs DOM element) behind one guarded save.
  // fallow-ignore-next-line complexity
  const handlePaste = useCallback(
    async (options?: InPlace) => {
      const pid = projectIdRef.current;
      if (!pid) return;
      const payload = await clipboardRef.current;
      if (!payload) {
        showToast("Nothing to paste.", "info");
        return;
      }
      if (projectIdRef.current !== pid) return;

      const targetPath = activeCompPath || "index.html";
      try {
        let pastedIds: string[] = [];
        const fromThisFile = payload.sourceFile === targetPath && payload.projectId === pid;
        const paste = (originalContent: string) => {
          if (projectIdRef.current !== pid) throw new Error("The video project changed.");
          domEditSaveTimestampRef.current = Date.now();
          if (payload.kind !== "timeline-clip")
            return pasteElementHtml(originalContent, payload, fromThisFile);
          const { currentTime, elements } = usePlayerStore.getState();
          const pasted = pasteTimelineClips(
            originalContent,
            payload.clips,
            pasteStart(payload, targetPath, currentTime, options),
            elements,
            fromThisFile,
          );
          pastedIds = pasted.ids;
          // A clip pasted past the current composition end would exist in the
          // file but never appear on the timeline or in playback/export (the
          // root's data-duration is what actually bounds the render).
          return extendRootDurationInSource(pasted.content, pasted.requiredEnd);
        };

        const { label, toast } = pasteWords(payload);

        await saveProjectFilesWithHistory({
          projectId: pid,
          kind: "timeline",
          label,
          files: { [targetPath]: paste },
          readFile: (path) => readFileContent(pid, path),
          writeFile: writeProjectFile,
          recordEdit,
        });

        // CapCut: the pasted clip(s) become the selection; the playhead does not
        // move. reloadPreview is a bare refresh-key bump with no selection
        // snapshot of its own; calling setSelection before it is what makes the
        // post-reload store state land on the pasted ids instead of stale ones.
        if (pastedIds.length > 0) {
          usePlayerStore.getState().setSelection(pastedIds.map((id) => elementKey(id, targetPath)));
        }
        reloadPreview();
        showToast(toast, "info");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to paste";
        showToast(message);
      }
    },
    [activeCompPath, domEditSaveTimestampRef, recordEdit, reloadPreview, showToast, writeProjectFile],
  );

  // Duplicates the selection right after it, or with `inPlace` at its own time on a track of its own,
  // without touching the clipboard — a pending copy must survive a Cmd+D. Shares
  // pasteTimelineClips with handlePaste; only the anchor and clip source differ (the
  // selection's end or start here, the playhead or the copy's own time there).
  const handleDuplicate = useCallback(
    async (options?: InPlace): Promise<boolean> => {
      const targets = findSelectedClips();
      if (!targets) return false;
      const pid = projectIdRef.current;
      if (!pid) return false;

      const { elements } = targets;
      const pathOf = (el: TimelineElement) => el.sourceFile || activeCompPath || "index.html";
      const targetPath = pathOf(elements[0]!);
      if (elements.some((element) => pathOf(element) !== targetPath)) {
        showToast("Select clips in the same composition to duplicate them.", "info");
        return false;
      }
      // The copy lands in targetPath's own clock, so anchor and lane check are local to it.
      const anchorTime = rebaseExpandedTimelineEdit(
        elements[0]!,
        options?.inPlace
          ? Math.min(...elements.map((el) => el.start))
          : Math.max(...elements.map((el) => el.start + el.duration)),
      ).time;

      try {
        const clips = await readClips(targets);
        let ids: string[] = [];
        const duplicate = (originalContent: string) => {
          if (projectIdRef.current !== pid) throw new Error("The video project changed.");
          domEditSaveTimestampRef.current = Date.now();
          const liveElements = usePlayerStore
            .getState()
            .elements.filter((el) => pathOf(el) === targetPath)
            .map((el) => rebaseExpandedTimelineEdit(el, el.start).element);
          const pasted = pasteTimelineClips(originalContent, clips, anchorTime, liveElements, true);
          ids = pasted.ids;
          return extendRootDurationInSource(pasted.content, pasted.requiredEnd);
        };

        await saveProjectFilesWithHistory({
          projectId: pid,
          kind: "timeline",
          label: clipLabel("Duplicate", clips.length),
          files: { [targetPath]: duplicate },
          readFile: (path) => readFileContent(pid, path),
          writeFile: writeProjectFile,
          recordEdit,
        });

        // The duplicate becomes the selection, mirroring CapCut's own paste
        // convention — there is no CapCut Duplicate to match directly (Cmd+D is
        // a no-op there); this is our own choice for consistency with paste.
        // Select before reloading, same reason as handlePaste above.
        if (ids.length > 0) {
          usePlayerStore.getState().setSelection(ids.map((id) => elementKey(id, targetPath)));
        }
        reloadPreview();
        showToast(clipToast("Duplicated", clips.length), "info");
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to duplicate";
        showToast(message);
        return false;
      }
    },
    [
      activeCompPath,
      domEditSaveTimestampRef,
      findSelectedClips,
      readClips,
      recordEdit,
      reloadPreview,
      showToast,
      writeProjectFile,
    ],
  );

  const handleCut = useCallback(async (): Promise<boolean> => {
    const { selectedElementId, elements } = usePlayerStore.getState();
    const active = elements.find((element) => (element.key ?? element.id) === selectedElementId);
    const domSelection = domEditSelectionRef.current;
    const pid = projectIdRef.current;
    if (selectedElementId && !active) return false;
    const copied = copyToClipboard(active ? [active] : undefined);
    if (!copied || !(await copied) || projectIdRef.current !== pid) return false;

    if (active) {
      await handleTimelineElementDelete(active);
      return true;
    }

    if (domSelection) {
      await handleDomEditElementDelete(domSelection);
      return true;
    }
    return true;
  }, [
    copyToClipboard,
    domEditSelectionRef,
    handleTimelineElementDelete,
    handleDomEditElementDelete,
  ]);

  return { handleCopy, handlePaste, handleCut, handleDuplicate };
}
