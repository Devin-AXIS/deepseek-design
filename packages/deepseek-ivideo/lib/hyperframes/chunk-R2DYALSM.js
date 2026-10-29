import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  EXCLUDED_TAGS,
  ensureHfIds,
  mintHfId,
  walkCompositionDescendants
} from "./chunk-A4KQZXZI.js";
import {
  removeElementWithGsapCascade
} from "./chunk-AR25A7XZ.js";
import {
  require_dist
} from "./chunk-CGTUSO6Y.js";
import {
  parseCompositionVariables,
  updateTextVariableBinding
} from "./chunk-ZCT2RZ33.js";
import {
  readClipTiming,
  readMediaOffsetSeconds,
  readPlaybackRate,
  writeClipTiming
} from "./chunk-TQFG7HTI.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import {
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// ../studio-server/src/helpers/sourceMutation.ts
var import_postcss_selector_parser = __toESM(require_dist(), 1);
import postcss from "postcss";

// ../core/dist/utils/htmlAttrSafety.js
var ALLOWED_HTML_ATTRS = /* @__PURE__ */ new Set([
  "id",
  "class",
  "style",
  "title",
  "name",
  "for",
  "type",
  "lang",
  "dir",
  "translate",
  "hidden",
  "tabindex",
  "draggable",
  "contenteditable",
  "role",
  "slot",
  "href",
  "target",
  "rel",
  "src",
  "srcset",
  "sizes",
  "alt",
  "poster",
  "loading",
  "decoding",
  "crossorigin",
  "preload",
  "autoplay",
  "loop",
  "muted",
  "controls",
  "playsinline",
  "width",
  "height",
  "colspan",
  "rowspan",
  "scope",
  "placeholder",
  "value",
  "min",
  "max",
  "step",
  "pattern",
  "required",
  "disabled",
  "readonly",
  "checked",
  "selected",
  "multiple",
  "accept",
  "maxlength",
  "minlength",
  "rows",
  "cols",
  "wrap"
]);
var URI_BEARING_ATTRS = /* @__PURE__ */ new Set([
  "src",
  "href",
  "action",
  "formaction",
  "poster",
  "srcset",
  "xlink:href"
]);
var DANGEROUS_URI_SCHEMES = /^(?:javascript|vbscript):/i;
var DANGEROUS_DATA_URI = /^data\s*:\s*text\/html/i;
function isAllowedHtmlAttribute(name) {
  const lower = name.toLowerCase();
  if (lower.startsWith("on"))
    return false;
  if (ALLOWED_HTML_ATTRS.has(lower))
    return true;
  if (lower.startsWith("data-"))
    return true;
  if (lower.startsWith("aria-"))
    return true;
  return false;
}
function isSafeAttributeValue(name, value) {
  if (URI_BEARING_ATTRS.has(name.toLowerCase())) {
    const trimmed = value.trim();
    if (DANGEROUS_URI_SCHEMES.test(trimmed))
      return false;
    if (DANGEROUS_DATA_URI.test(trimmed))
      return false;
  }
  return true;
}

// ../core/dist/utils/richTextSanitize.js
var FORMATTING_TAGS = /* @__PURE__ */ new Set(["SPAN", "B", "STRONG", "I", "EM", "U", "BR"]);
var FORMATTING_STYLE_PROPS = /* @__PURE__ */ new Set([
  "color",
  "background-color",
  "font-weight",
  "font-style",
  "text-decoration-line",
  "font-family",
  "font-size",
  "letter-spacing",
  "line-height",
  // Paints the glyph fill and inherits, so an ancestor that sets it wins over
  // any `color` below. The editor mirrors a run's colour into it when that is
  // happening, and stripping it here would put the colour back to invisible.
  "-webkit-text-fill-color"
]);
var FORMATTING_ATTRS = /* @__PURE__ */ new Set(["data-hf-text-key", "data-hf-id"]);
var SAFE_ATTR_VALUE = /^[A-Za-z0-9_:-]+$/;
var OPAQUE_TAGS = /* @__PURE__ */ new Set([
  "SCRIPT",
  "STYLE",
  "TEMPLATE",
  "NOSCRIPT",
  "IFRAME",
  "OBJECT",
  "EMBED",
  "SVG",
  "MATH"
]);
var UNSAFE_VALUE = /url\(|expression\(|javascript:|vbscript:|@import|<\//i;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
function isRichTextFormattingAttribute(name, value) {
  return FORMATTING_ATTRS.has(name.toLowerCase()) && SAFE_ATTR_VALUE.test(value);
}
function isRichTextFormattingStyle(property, value) {
  return FORMATTING_STYLE_PROPS.has(property.toLowerCase()) && value.length > 0 && !UNSAFE_VALUE.test(value);
}
function isElementNode(node) {
  return node.nodeType === ELEMENT_NODE;
}
function sanitizeRichTextChildren(parent) {
  const pending = Array.from(parent.childNodes, (node) => ({ phase: "visit", node })).reverse();
  for (let frame = pending.pop(); frame; frame = pending.pop()) {
    if (frame.phase === "sanitize") {
      if (!FORMATTING_TAGS.has(frame.tag))
        unwrap(frame.element);
      else
        stripAttributes(frame.element);
      continue;
    }
    const child = frame.node;
    if (child.nodeType === TEXT_NODE)
      continue;
    if (!isElementNode(child)) {
      child.parentNode?.removeChild(child);
      continue;
    }
    const element = child;
    const tag = element.tagName.toUpperCase();
    if (OPAQUE_TAGS.has(tag)) {
      element.parentNode?.removeChild(element);
      continue;
    }
    pending.push({ phase: "sanitize", element, tag });
    for (const descendant of Array.from(element.childNodes).reverse()) {
      pending.push({ phase: "visit", node: descendant });
    }
  }
}
function unwrap(element) {
  const parent = element.parentNode;
  if (!parent)
    return;
  while (element.firstChild)
    parent.insertBefore(element.firstChild, element);
  parent.removeChild(element);
}
function stripAttributes(element) {
  const style = element.getAttribute("style");
  for (const name of Array.from(element.getAttributeNames())) {
    const value = element.getAttribute(name) ?? "";
    if (isRichTextFormattingAttribute(name, value))
      continue;
    element.removeAttribute(name);
  }
  if (style === null)
    return;
  const safe = filterStyle(style);
  if (safe)
    element.setAttribute("style", safe);
  else
    element.removeAttribute("style");
}
function filterStyle(style) {
  return splitDeclarations(style).map((declaration) => {
    const colon = declaration.indexOf(":");
    if (colon === -1)
      return null;
    const property = declaration.slice(0, colon).trim().toLowerCase();
    const value = declaration.slice(colon + 1).trim();
    if (!isRichTextFormattingStyle(property, value))
      return null;
    return `${property}: ${value}`;
  }).filter((declaration) => declaration !== null).join("; ");
}
function isQuoteDelimiter(char) {
  return char === "'" || char === '"';
}
function nextParenthesisDepth(depth, char) {
  if (char === "(")
    return depth + 1;
  if (char === ")")
    return Math.max(0, depth - 1);
  return depth;
}
function isDeclarationSeparator(char, depth, quote) {
  return char === ";" && depth === 0 && quote === null;
}
function splitDeclarations(style) {
  const declarations = [];
  let current = "";
  let depth = 0;
  let quote = null;
  for (const char of style) {
    if (char === quote)
      quote = null;
    else if (quote === null && isQuoteDelimiter(char))
      quote = char;
    else if (isDeclarationSeparator(char, depth, quote)) {
      declarations.push(current);
      current = "";
      continue;
    } else if (quote === null) {
      depth = nextParenthesisDepth(depth, char);
    }
    current += char;
  }
  if (current.trim())
    declarations.push(current);
  return declarations;
}

// ../core/dist/mediaLink.js
var MEDIA_LINK_ATTR = "data-link";
function readNumber(el, names, fallback) {
  for (const name of names) {
    const raw = el.getAttribute(name);
    if (raw === null || raw.trim() === "")
      continue;
    const value = Number(raw);
    if (Number.isFinite(value))
      return value;
  }
  return fallback;
}
function readLinkTiming(el) {
  return {
    start: readNumber(el, ["data-start"], 0),
    duration: readNumber(el, ["data-duration"], 0),
    mediaStart: readMediaOffsetSeconds((name) => el.getAttribute(name)),
    playbackRate: readNumber(el, ["data-playback-rate"], 1)
  };
}
var LINK_SCOPE_SELECTOR = "[data-composition-id], [data-composition-file]";
function mintLinkId(taken) {
  const used = new Set(taken);
  let n = 1;
  while (used.has(`lk-${n}`))
    n += 1;
  return `lk-${n}`;
}
function takenLinkIds(doc) {
  return Array.from(doc.querySelectorAll(`[id], [${MEDIA_LINK_ATTR}], [${SYNC_ORIGIN_ATTR}]`)).flatMap((el) => [
    el.id,
    el.getAttribute(MEDIA_LINK_ATTR) ?? "",
    el.getAttribute(SYNC_ORIGIN_ATTR) ?? ""
  ]);
}
function renameShared(doc, ids, attr, taken) {
  const renamed = /* @__PURE__ */ new Map();
  for (const id of ids) {
    const el = doc.getElementById(id);
    const old = el?.getAttribute(attr);
    if (!el || !old)
      continue;
    let fresh = renamed.get(old);
    if (!fresh) {
      fresh = mintLinkId(taken);
      taken.add(fresh);
      renamed.set(old, fresh);
    }
    el.setAttribute(attr, fresh);
  }
}
function relinkSplitHalves(doc, rightHalfIds) {
  const taken = new Set(takenLinkIds(doc));
  renameShared(doc, rightHalfIds, MEDIA_LINK_ATTR, taken);
  renameShared(doc, idsWithBothSidesCut(doc, rightHalfIds), SYNC_ORIGIN_ATTR, taken);
}
function idsWithBothSidesCut(doc, rightHalfIds) {
  const tagsByOrigin = /* @__PURE__ */ new Map();
  const originOf = (id) => doc.getElementById(id)?.getAttribute(SYNC_ORIGIN_ATTR) ?? null;
  for (const id of rightHalfIds) {
    const origin = originOf(id);
    const tag = doc.getElementById(id)?.tagName.toLowerCase();
    if (!origin || !tag)
      continue;
    tagsByOrigin.set(origin, (tagsByOrigin.get(origin) ?? /* @__PURE__ */ new Set()).add(tag));
  }
  return rightHalfIds.filter((id) => {
    const tags = tagsByOrigin.get(originOf(id) ?? "");
    return tags?.has("video") === true && tags.has("audio");
  });
}
var SYNC_ORIGIN_ATTR = "data-sync-origin";
var rateOf = (timing) => timing.playbackRate > 0 ? timing.playbackRate : 1;
function sourceZeroTime(timing) {
  return timing.start - timing.mediaStart / rateOf(timing);
}
function syncOffsetFrames(clip, partner, fps) {
  if (Math.abs(rateOf(clip) - rateOf(partner)) > 1e-6)
    return null;
  const frames = Math.round((sourceZeroTime(clip) - sourceZeroTime(partner)) * fps);
  return Object.is(frames, -0) ? 0 : frames;
}
function sharedSeconds(a, b) {
  return Math.min(a.start + a.duration, b.start + b.duration) - Math.max(a.start, b.start);
}
function sameOriginInScope(el, tag, origin) {
  const scopeOf = (node) => node.closest(LINK_SCOPE_SELECTOR) ?? el.ownerDocument;
  const scope = scopeOf(el);
  return Array.from(scope.querySelectorAll(tag)).filter((candidate) => candidate.getAttribute(SYNC_ORIGIN_ATTR) === origin && scopeOf(candidate) === scope);
}
function findSyncPartner(el) {
  const origin = el.getAttribute(SYNC_ORIGIN_ATTR);
  const tag = el.tagName.toLowerCase();
  if (!origin || tag !== "video" && tag !== "audio")
    return null;
  const partnerTag = tag === "video" ? "audio" : "video";
  const own = readLinkTiming(el);
  let best = null;
  for (const candidate of sameOriginInScope(el, partnerTag, origin)) {
    const timing = readLinkTiming(candidate);
    const shared = sharedSeconds(own, timing);
    const distance = Math.abs(timing.start - own.start);
    if (!best || shared > best.shared || shared === best.shared && distance < best.distance) {
      best = { el: candidate, shared, distance };
    }
  }
  return best?.el ?? null;
}

// ../studio-server/src/helpers/sourceStyleMutation.ts
function parseStyleDecls(style) {
  const props = /* @__PURE__ */ new Map();
  const order = [];
  let i = 0;
  while (i < style.length) {
    let depth = 0;
    let inSingle = false;
    let inDouble = false;
    const start = i;
    while (i < style.length) {
      const ch = style[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === "(") depth++;
        else if (ch === ")") depth = Math.max(0, depth - 1);
        else if (ch === ";" && depth === 0) break;
      }
      i++;
    }
    const decl = style.slice(start, i).trim();
    i++;
    if (!decl) continue;
    const colon = decl.indexOf(":");
    if (colon < 0) continue;
    const key = decl.slice(0, colon).trim();
    const val = decl.slice(colon + 1).trim();
    if (!key) continue;
    if (!props.has(key)) order.push(key);
    props.set(key, val);
  }
  return { props, order };
}
function serializeStyleDecls(props, order) {
  return order.map((k) => `${k}: ${props.get(k) ?? ""}`).filter((d) => d.trim()).join("; ");
}
function patchStyleAttrString(style, property, value) {
  const { props, order } = parseStyleDecls(style);
  if (value === null) {
    props.delete(property);
    const idx = order.indexOf(property);
    if (idx >= 0) order.splice(idx, 1);
  } else {
    if (!props.has(property)) order.push(property);
    props.set(property, value);
  }
  return serializeStyleDecls(props, order);
}

// ../studio-server/src/helpers/sourceMutation.ts
function parseSourceDocument(raw) {
  const source = ensureHfIds(raw);
  const hasDocumentShell = /<!doctype|<html[\s>]/i.test(source);
  if (hasDocumentShell) {
    return { document: parseHTML(source).document, wrappedFragment: false };
  }
  return {
    document: parseHTML(`<!DOCTYPE html><html><head></head><body>${source}</body></html>`).document,
    wrappedFragment: true
  };
}
function duplicateCssRulesForId(document, originalId, newId) {
  const idToken = `#${originalId}`;
  const transform = (0, import_postcss_selector_parser.default)((selectors) => {
    selectors.walkIds((node) => {
      if (node.value === originalId) node.value = newId;
    });
  });
  for (const styleEl of document.querySelectorAll("style")) {
    const css = styleEl.textContent ?? "";
    let root;
    try {
      root = postcss.parse(css);
    } catch {
      continue;
    }
    const clones = [];
    root.walkRules((rule) => {
      if (!rule.selector.includes(idToken)) return;
      const newSelector = transform.processSync(rule.selector);
      if (newSelector === rule.selector) return;
      const clone = rule.clone({ selector: newSelector });
      clones.push(clone);
    });
    if (clones.length > 0) {
      for (const c of clones) root.append(c);
      styleEl.textContent = root.toString();
    }
  }
}
function querySelectorAllWithTemplates(root, selector) {
  const matches = Array.from(root.querySelectorAll(selector));
  if (matches.length > 0) return matches;
  const templates = Array.from(root.querySelectorAll("template"));
  for (const tmpl of templates) {
    const inner = querySelectorAllWithTemplates(tmpl, selector);
    if (inner.length > 0) return inner;
  }
  return [];
}
function escapeCssAttrValue(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function findByHfId(document, hfId) {
  try {
    const matches = querySelectorAllWithTemplates(
      document,
      `[data-hf-id="${escapeCssAttrValue(hfId)}"]`
    );
    if (matches.length > 1) {
      console.warn(
        `sourceMutation: data-hf-id "${hfId}" matched ${matches.length} elements; using the first. ids must be unique per document.`
      );
    }
    return matches[0] ?? null;
  } catch {
    return null;
  }
}
function findTargetElement(document, target) {
  if (target.hfId) {
    const byHfId = findByHfId(document, target.hfId);
    if (byHfId) return byHfId;
  }
  if (target.id) {
    const byId = document.getElementById(target.id);
    if (byId) return byId;
  }
  if (!target.selector) return null;
  try {
    const matches = querySelectorAllWithTemplates(document, target.selector);
    return matches[target.selectorIndex ?? 0] ?? null;
  } catch {
    return null;
  }
}
function removeElementsFromHtml(source, targets) {
  const { document, wrappedFragment } = parseSourceDocument(source);
  let removed = false;
  for (const target of targets) {
    const element = findTargetElement(document, target);
    if (!element) continue;
    removeElementWithGsapCascade(document, element);
    removed = true;
  }
  if (!removed) return source;
  return wrappedFragment ? document.body.innerHTML || "" : document.toString();
}
function removeElementFromHtml(source, target) {
  return removeElementsFromHtml(source, [target]);
}
function isHTMLElement(el) {
  const HTMLEl = el.ownerDocument?.defaultView?.HTMLElement;
  return HTMLEl ? el instanceof HTMLEl : el.nodeType === 1 && "style" in el;
}
function dedupeClonedCompositionId(document, clone) {
  const compositionId = clone.getAttribute("data-composition-id");
  if (!compositionId) return;
  const usedCompositionIds = new Set(
    querySelectorAllWithTemplates(document, "[data-composition-id]").map(
      (node) => node.getAttribute("data-composition-id")
    )
  );
  const base = `${compositionId}-split`;
  let nextCompositionId = base;
  let suffix = 2;
  while (usedCompositionIds.has(nextCompositionId)) nextCompositionId = `${base}-${suffix++}`;
  clone.setAttribute("data-composition-id", nextCompositionId);
}
function resolveOperationTarget(parent, op) {
  if (op.childSelector === void 0) return parent;
  try {
    const child = parent.querySelectorAll(op.childSelector)[op.childIndex ?? 0] ?? null;
    return child && isHTMLElement(child) ? child : null;
  } catch {
    return null;
  }
}
function stampNewChildIds(parent) {
  const assigned = /* @__PURE__ */ new Set();
  const root = parent.ownerDocument?.body ?? parent;
  walkCompositionDescendants(root, (el) => {
    const id = el.getAttribute("data-hf-id");
    if (id) assigned.add(id);
  });
  for (const el of parent.querySelectorAll("*")) {
    if (el.getAttribute("data-hf-id")) continue;
    if (EXCLUDED_TAGS.has(el.tagName.toLowerCase())) continue;
    el.setAttribute("data-hf-id", mintHfId(el, assigned));
  }
}
function patchElementInHtml(source, target, operations, takenIds) {
  const { document, wrappedFragment } = parseSourceDocument(source);
  const el = findTargetElement(document, target);
  if (!el || !isHTMLElement(el)) return { html: source, matched: false };
  const htmlEl = el;
  const originalHtml = wrappedFragment ? document.body.innerHTML || "" : document.toString();
  const resolved = [];
  for (const op of operations) {
    const opTarget = resolveOperationTarget(htmlEl, op);
    if (!opTarget) return { html: source, matched: false };
    resolved.push({ op, target: opTarget });
  }
  for (const { op, target: opTarget } of resolved) {
    switch (op.type) {
      case "inline-style":
        {
          const raw = opTarget.getAttribute("style") ?? "";
          const patched = patchStyleAttrString(raw, op.property, op.value);
          opTarget.setAttribute("style", patched);
        }
        break;
      case "attribute":
        {
          const fullAttr = op.property.startsWith("data-") ? op.property : `data-${op.property}`;
          if (op.value != null) {
            opTarget.setAttribute(fullAttr, op.value);
          } else {
            opTarget.removeAttribute(fullAttr);
          }
        }
        break;
      case "html-attribute":
        if (!isAllowedHtmlAttribute(op.property)) break;
        if (op.value != null) {
          if (!isSafeAttributeValue(op.property, op.value)) break;
          opTarget.setAttribute(op.property, op.value);
        } else {
          opTarget.removeAttribute(op.property);
        }
        break;
      case "ensure-id":
        if (opTarget.getAttribute("id") || !op.value) break;
        opTarget.setAttribute("id", nextUniqueId(document, op.value, takenIds));
        break;
      case "text-content":
        if (op.value != null) {
          const inner = opTarget.children.length === 1 ? opTarget.firstElementChild : null;
          const textTarget = inner && isHTMLElement(inner) ? inner : opTarget;
          const binding = textTarget.getAttribute("data-var-text") ?? opTarget.getAttribute("data-var-text");
          if (binding) {
            const declaration = document.querySelector("[data-composition-variables]");
            if (declaration) {
              const variables = parseCompositionVariables(declaration);
              const values = Object.fromEntries(variables.map((v) => [v.id, v.default]));
              const update = updateTextVariableBinding(binding, values, op.value);
              if (update) {
                const variable = variables.find((v) => v.id === update.id);
                variable.default = update.value;
                declaration.setAttribute("data-composition-variables", JSON.stringify(variables));
              }
            }
          }
          textTarget.textContent = op.value;
        }
        break;
      // The one operation that can write markup, so the one that has to check
      // it. Assigned first and sanitised after, rather than sanitising a
      // string: parsing is what turns a payload into the tree the allowlist
      // can actually judge, and linkedom never runs anything it parses.
      case "inner-html":
      case "rich-text":
        if (op.value != null) {
          opTarget.innerHTML = op.value;
          sanitizeRichTextChildren(opTarget);
          stampNewChildIds(opTarget);
        }
        break;
    }
  }
  const html = wrappedFragment ? document.body.innerHTML || "" : document.toString();
  const elementId = htmlEl.getAttribute("id");
  if (html === originalHtml) return { html: source, matched: true, elementId };
  return { html: ensureHfIds(html), matched: true, elementId };
}
function nextUniqueId(document, base, takenIds) {
  let id = base;
  let suffix = 2;
  while (document.getElementById(id) || takenIds?.has(id)) id = `${base}-${suffix++}`;
  return id;
}
function probeElementsInSource(source, targets) {
  const { document } = parseSourceDocument(source);
  return targets.map((target) => {
    if (!target.id && !target.hfId && !target.selector) return false;
    const el = findTargetElement(document, target);
    return el != null && isHTMLElement(el);
  });
}
function probeElementInSource(source, target) {
  return probeElementsInSource(source, [target])[0] ?? false;
}
function resolveElementTiming(el) {
  const timing = readClipTiming(el);
  return { start: timing.start ?? 0, duration: timing.duration ?? 0 };
}
function setElementDuration(el, start, duration, trackIndex) {
  writeClipTiming(el, {
    start: Math.round(start * 1e3) / 1e3,
    duration: Math.round(duration * 1e3) / 1e3,
    ...trackIndex != null ? { trackIndex } : {}
  });
}
function splitElementInHtml(source, target, splitTime, newId, fallbackTiming) {
  const { document, wrappedFragment } = parseSourceDocument(source);
  const el = findTargetElement(document, target);
  if (!el || !isHTMLElement(el)) return { html: source, matched: false, newId: null };
  const timing = resolveElementTiming(el);
  let { start, duration } = timing;
  if (duration <= 0 && fallbackTiming && fallbackTiming.duration > 0) {
    start = fallbackTiming.start;
    duration = fallbackTiming.duration;
  }
  if (duration <= 0 || splitTime <= start || splitTime >= start + duration) {
    return { html: source, matched: false, newId: null };
  }
  newId = nextUniqueId(document, newId);
  const firstDuration = splitTime - start;
  const secondDuration = duration - firstDuration;
  const clone = el.cloneNode(true);
  if (!isHTMLElement(clone)) return { html: source, matched: false, newId: null };
  clone.setAttribute("id", newId);
  dedupeClonedCompositionId(document, clone);
  clone.removeAttribute("data-hf-id");
  for (const node of clone.querySelectorAll("[data-hf-id]")) node.removeAttribute("data-hf-id");
  setElementDuration(clone, splitTime, secondDuration, fallbackTiming?.track);
  const playbackStartAttr = el.hasAttribute("data-playback-start") ? "data-playback-start" : el.hasAttribute("data-media-start") ? "data-media-start" : fallbackTiming?.stampPlaybackStart ? "data-playback-start" : el.matches("audio, video") ? "data-media-start" : null;
  if (playbackStartAttr) {
    const readAttr = (name) => el.getAttribute(name);
    const authoredTrim = el.getAttribute(playbackStartAttr);
    const currentTrim = authoredTrim !== null ? readMediaOffsetSeconds(readAttr) : fallbackTiming?.playbackStart ?? 0;
    const rate = readPlaybackRate(readAttr, fallbackTiming?.playbackRate);
    if (authoredTrim === null || Number(authoredTrim) !== currentTrim)
      el.setAttribute(playbackStartAttr, String(Math.round(currentTrim * 1e3) / 1e3));
    clone.setAttribute(
      playbackStartAttr,
      String(Math.round((currentTrim + firstDuration * rate) * 1e3) / 1e3)
    );
  }
  const originalId = el.getAttribute("id");
  if (originalId) {
    duplicateCssRulesForId(document, originalId, newId);
  }
  setElementDuration(el, start, firstDuration, fallbackTiming?.track);
  if (el.nextSibling) {
    el.parentElement.insertBefore(clone, el.nextSibling);
  } else {
    el.parentElement.appendChild(clone);
  }
  const html = wrappedFragment ? document.body.innerHTML || "" : document.toString();
  return {
    // The split owns its new nodes' stable ids. Leaving the clone unstamped makes
    // the next preview request persist different bytes after history is recorded.
    html: ensureHfIds(html),
    matched: true,
    newId
  };
}
function getInlineStylePx(el, property) {
  const style = (isHTMLElement(el) ? el.getAttribute("style") : null) ?? "";
  const { props } = parseStyleDecls(style);
  const raw = props.get(property);
  if (!raw) return 0;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}
function setInlineLeftTop(el, left, top) {
  let style = el.getAttribute("style") ?? "";
  style = patchStyleAttrString(style, "left", `${left}px`);
  style = patchStyleAttrString(style, "top", `${top}px`);
  el.setAttribute("style", style);
}
function uniqueGroupDomId(document, groupId) {
  const base = groupId.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "group";
  return nextUniqueId(document, base);
}
function wrapElementsInHtml(source, targets, groupId, bbox, rebases) {
  const { document, wrappedFragment } = parseSourceDocument(source);
  if (targets.length === 0) {
    return { html: source, matched: false, groupId: null, error: "no targets" };
  }
  const els = [];
  const seen = /* @__PURE__ */ new Set();
  for (const target of targets) {
    const el = findTargetElement(document, target);
    if (!el || !isHTMLElement(el) || seen.has(el)) continue;
    seen.add(el);
    els.push(el);
  }
  if (els.length === 0) {
    return { html: source, matched: false, groupId: null, error: "no targets matched" };
  }
  const parent = els[0]?.parentElement;
  if (!parent || els.some((el) => el.parentElement !== parent)) {
    return {
      html: source,
      matched: false,
      groupId: null,
      error: "grouped elements must share a single parent"
    };
  }
  const memberSet = new Set(els);
  const ordered = Array.from(parent.children).filter((c) => memberSet.has(c));
  const rebaseByEl = /* @__PURE__ */ new Map();
  for (const rebase of rebases) {
    const el = findTargetElement(document, rebase.target);
    if (el) rebaseByEl.set(el, { left: rebase.left, top: rebase.top, track: rebase.track });
  }
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-hf-group", groupId);
  wrapper.setAttribute("id", uniqueGroupDomId(document, groupId));
  const memberZIndexes = ordered.map(
    (el) => Number.parseInt(
      parseStyleDecls(el.getAttribute("style") ?? "").props.get("z-index") ?? "",
      10
    )
  ).filter((z) => Number.isFinite(z));
  const maxZ = memberZIndexes.length > 0 ? Math.max(...memberZIndexes) : null;
  wrapper.setAttribute(
    "style",
    `position: absolute; left: ${bbox.left}px; top: ${bbox.top}px; width: ${bbox.width}px; height: ${bbox.height}px` + (maxZ !== null ? `; z-index: ${maxZ}` : "")
  );
  parent.insertBefore(wrapper, ordered[ordered.length - 1] ?? null);
  for (const el of ordered) {
    const rebase = rebaseByEl.get(el);
    if (rebase) setInlineLeftTop(el, rebase.left, rebase.top);
    if (rebase?.track != null) writeClipTiming(el, { trackIndex: Math.round(rebase.track) });
    wrapper.appendChild(el);
  }
  return {
    html: wrappedFragment ? document.body.innerHTML || "" : document.toString(),
    matched: true,
    groupId
  };
}
function buildChildTrackMap(document, group, childTracks) {
  const trackByEl = /* @__PURE__ */ new Map();
  for (const entry of childTracks) {
    const el = findTargetElement(document, entry.target);
    if (el && group.contains(el) && entry.track != null) trackByEl.set(el, entry.track);
  }
  return trackByEl;
}
function relocateGroupChildren(group, parent, wLeft, wTop, trackByEl) {
  const members = [];
  for (const child of Array.from(group.children)) {
    if (isHTMLElement(child)) {
      const newLeft = getInlineStylePx(child, "left") + wLeft;
      const newTop = getInlineStylePx(child, "top") + wTop;
      setInlineLeftTop(child, newLeft, newTop);
      const track = trackByEl.get(child);
      if (track != null) writeClipTiming(child, { trackIndex: Math.round(track) });
      if (child.id) {
        members.push({
          id: child.id,
          cx: newLeft + getInlineStylePx(child, "width") / 2,
          cy: newTop + getInlineStylePx(child, "height") / 2
        });
      }
    }
    parent.insertBefore(child, group);
  }
  return members;
}
function unwrapElementsFromHtml(source, groupTarget, childTracks = []) {
  const { document, wrappedFragment } = parseSourceDocument(source);
  const group = findTargetElement(document, groupTarget);
  if (!group || !isHTMLElement(group)) return { html: source, unwrapped: false };
  if (!group.hasAttribute("data-hf-group")) return { html: source, unwrapped: false };
  const parent = group.parentElement;
  if (!parent) return { html: source, unwrapped: false };
  const trackByEl = buildChildTrackMap(document, group, childTracks);
  const wLeft = getInlineStylePx(group, "left");
  const wTop = getInlineStylePx(group, "top");
  const groupCenter = {
    cx: wLeft + getInlineStylePx(group, "width") / 2,
    cy: wTop + getInlineStylePx(group, "height") / 2
  };
  const members = relocateGroupChildren(group, parent, wLeft, wTop, trackByEl);
  const groupId = group.id || void 0;
  group.remove();
  return {
    html: wrappedFragment ? document.body.innerHTML || "" : document.toString(),
    unwrapped: true,
    unwrappedGroupId: groupId,
    members,
    groupCenter
  };
}
function relinkSplitHalvesInHtml(source, rightHalfIds) {
  const { document, wrappedFragment } = parseSourceDocument(source);
  const carriesPairing = (id) => {
    const el = document.getElementById(id);
    return Boolean(el?.hasAttribute("data-link") || el?.hasAttribute("data-sync-origin"));
  };
  if (!rightHalfIds.some(carriesPairing)) {
    return source;
  }
  relinkSplitHalves(document, rightHalfIds);
  return wrappedFragment ? document.body.innerHTML || "" : document.toString();
}

export {
  MEDIA_LINK_ATTR,
  readLinkTiming,
  relinkSplitHalves,
  syncOffsetFrames,
  findSyncPartner,
  parseSourceDocument,
  findTargetElement,
  removeElementsFromHtml,
  removeElementFromHtml,
  isHTMLElement,
  dedupeClonedCompositionId,
  patchElementInHtml,
  nextUniqueId,
  probeElementsInSource,
  probeElementInSource,
  splitElementInHtml,
  wrapElementsInHtml,
  unwrapElementsFromHtml,
  relinkSplitHalvesInHtml
};
