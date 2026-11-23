import { copySelectedAnimationsInScript } from "@hyperframes/parsers/gsap-writer-acorn";
import {
  createMotionInstance,
  MOTION_DATA_PREFIX,
  readMotionInstanceFromExtras,
} from "@hyperframes/core/motion-presets";
import type { GsapAnimation } from "@hyperframes/core/gsap-parser";
import { ID_ATTR_RE } from "./clipboardPayload";
import { escapeRegex } from "./sourcePatcher";

const ID_ATTRS = new RegExp(ID_ATTR_RE.source, "g");
// One pass over both, so a `<style>` written inside a script's text is left as script.
const BLOCKS =
  /<!--[\s\S]*?-->|(<script\b(?![^>]*\bsrc\s*=)[^>]*>)([\s\S]*?)(<\/script>)|(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi;

/** Each id a paste renamed (`goodbye` to `goodbye-2`), from the same markup before and after the rename. */
export function renamedIds(before: string, after: string): Map<string, string> {
  const ids = (html: string) =>
    Array.from(html.matchAll(ID_ATTRS), (match) => match[1] as string);
  const renamed = ids(after);
  const renames = new Map<string, string>();
  ids(before).forEach((from, index) => {
    const to = renamed[index];
    if (to && to !== from) renames.set(from, to);
  });
  return renames;
}

/** Gives each renamed copy the look and motion its original has in `html`: a copy of every CSS rule keyed to
 *  the original's id, and of every tween on it, moved by `delta` seconds. */
export function carryLook(
  html: string,
  renames: ReadonlyMap<string, string>,
  delta: number,
  stableIds: ReadonlyMap<string, string> = new Map(),
): string {
  return html.replace(
    BLOCKS,
    (block, scriptOpen, script, scriptClose, styleOpen, css, styleClose) => {
      if (scriptOpen !== undefined)
        return (
          scriptOpen +
          copySelectedAnimationsInScript(script, delta, (animation) =>
            retargetTween(animation, renames, stableIds, delta),
          ) +
          scriptClose
        );
      if (styleOpen === undefined) return block;
      return styleOpen + withCopiedRules(css, renames) + styleClose;
    },
  );
}

/** Preserve the selector form used by the saved composition. */
export function copiedSelector(
  selector: string,
  ids: ReadonlyMap<string, string>,
  stableIds: ReadonlyMap<string, string>,
): string | undefined {
  if (selector.startsWith("#")) {
    const id = ids.get(selector.slice(1));
    return id && `#${id}`;
  }
  const match = selector.match(/^\[data-hf-id=(["'])([^"']+)\1\]$/);
  if (!match) return undefined;
  const hfId = stableIds.get(match[2]!);
  return hfId ? `[data-hf-id=${match[1]}${hfId}${match[1]}]` : undefined;
}

function retargetTween(
  animation: GsapAnimation,
  ids: ReadonlyMap<string, string>,
  stableIds: ReadonlyMap<string, string>,
  delta: number,
) {
  const motion = readMotionInstanceFromExtras(animation.extras);
  if (!motion) {
    const selector = copiedSelector(animation.targetSelector, ids, stableIds);
    return selector ? { selector } : null;
  }
  const source = motion.target.selector;
  const target = copiedSelector(source, ids, stableIds);
  if (
    !target ||
    (animation.targetSelector !== source &&
      !animation.targetSelector.startsWith(`${source} `))
  )
    return null;
  const start = Math.max(0, motion.start + delta);
  const clone = createMotionInstance({
    ...motion,
    target: {
      selector: target,
      elementId: motion.target.elementId && ids.get(motion.target.elementId),
      hfId: motion.target.hfId && stableIds.get(motion.target.hfId),
    },
    start,
    end:
      motion.end === undefined ? undefined : start + motion.end - motion.start,
  });
  const trackId = animation.extras?.id;
  const suffix =
    typeof trackId === "string" && trackId.startsWith(`${motion.id}:`)
      ? trackId.slice(motion.id.length)
      : "";
  return {
    selector: target + animation.targetSelector.slice(source.length),
    extras: {
      id: clone.id + suffix,
      data: MOTION_DATA_PREFIX + JSON.stringify(clone),
    },
  };
}

function withCopiedRules(css: string, renames: ReadonlyMap<string, string>): string {
  if (renames.size === 0) return css;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  const indent = css.match(/\n([ \t]*)\S/)?.[1] ?? "";
  const alternatives = Array.from(renames.keys(), escapeRegex).sort((a, b) => b.length - a.length).join("|");
  const ids = new RegExp(`#(${alternatives})(?![\\w-])`, "g");
  const negative = new RegExp(`:not\\([^)]*#(?:${alternatives})(?![\\w-])`);
  const copyRules = (rules: CSSRuleList): string[] =>
    Array.from(rules).flatMap((rule) => {
      if (rule instanceof CSSStyleRule) {
        const selectors = selectorList(rule.selectorText).flatMap((selector) => {
          if (negative.test(selector)) return [];
          const copied = selector.replace(ids, (_match, id: string) => `#${renames.get(id)}`);
          return copied === selector ? [] : [copied];
        });
        return selectors.length > 0
          ? [selectors.join(", ") + rule.cssText.slice(rule.selectorText.length)]
          : [];
      }
      if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) {
        const nested = copyRules(rule.cssRules);
        if (nested.length > 0)
          return [rule.cssText.slice(0, rule.cssText.indexOf("{") + 1) + nested.join(" ") + "}"];
      }
      return [];
    });
  const copies = copyRules(sheet.cssRules);
  if (copies.length === 0) return css;
  const body = css.trimEnd();
  return body + copies.map((rule) => "\n" + indent + rule).join("") + css.slice(body.length);
}

/** A selector list's own entries: its commas outside brackets and parentheses. */
function selectorList(text: string): string[] {
  const selectors: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (char === "(" || char === "[") depth++;
    else if (char === ")" || char === "]") depth--;
    else if (char === "," && depth === 0) {
      selectors.push(text.slice(start, index).trim());
      start = index + 1;
    }
  }
  selectors.push(text.slice(start).trim());
  return selectors;
}
