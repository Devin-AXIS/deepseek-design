import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  CANVAS_DIMENSIONS,
  isCompositionElement,
  isMediaElement,
  isTextElement,
  keyframesToGsapAnimations,
  serializeGsapAnimations
} from "./chunk-AR25A7XZ.js";
import {
  COLOR_GRADING_ADJUST_KEYS,
  COLOR_GRADING_ADVANCED_LIMITS,
  COLOR_GRADING_COLOR_SPACE,
  COLOR_GRADING_CONTRACT_VERSION,
  COLOR_GRADING_CURVE_KEYS,
  COLOR_GRADING_DETAIL_KEYS,
  COLOR_GRADING_EFFECT_KEYS,
  COLOR_GRADING_HUE_CURVE_KEYS,
  COLOR_GRADING_LUT_KEYS,
  COLOR_GRADING_MAX_CURVE_POINTS,
  COLOR_GRADING_MAX_SECONDARIES,
  COLOR_GRADING_TOP_LEVEL_KEYS,
  COLOR_GRADING_WHEEL_KEYS,
  COMPOSITION_ATTRIBUTES,
  MAX_PLAYBACK_RATE,
  MIN_PLAYBACK_RATE,
  clampPlaybackRate,
  parseNumeric,
  parseStartExpression,
  readAuthoredDurationSeconds,
  readMediaOffsetSeconds,
  readPlaybackRate,
  resolveMediaDuration,
  resolveNaturalDurationSeconds
} from "./chunk-TQFG7HTI.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";

// ../core/src/runtime/authoredTiming.ts
function finiteNumber(value) {
  if (value == null) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function resolveAuthoredTimingWindow(values) {
  const parsedStart = finiteNumber(values.start);
  if (parsedStart == null) return null;
  const start = Math.max(0, parsedStart);
  const publicDuration = finiteNumber(values.duration);
  const preservedDuration = finiteNumber(values.authoredDuration);
  const duration = publicDuration != null && publicDuration > 0 ? publicDuration : preservedDuration != null && preservedDuration > 0 ? preservedDuration : null;
  if (duration != null) return { start, duration, end: start + duration };
  const publicEnd = finiteNumber(values.end);
  const preservedEnd = finiteNumber(values.authoredEnd);
  const end = publicEnd != null && publicEnd > start ? publicEnd : preservedEnd != null && preservedEnd > start ? preservedEnd : null;
  return { start, duration: end == null ? null : end - start, end };
}

// ../core/src/core.types.ts
function toFps(input) {
  if (typeof input === "number") {
    return { num: input, den: 1 };
  }
  return input;
}
function fpsToNumber(fps) {
  return fps.num / fps.den;
}
function fpsToFfmpegArg(fps) {
  return fps.den === 1 ? String(fps.num) : `${fps.num}/${fps.den}`;
}
function parseFps(input) {
  if (typeof input === "number") {
    if (!Number.isFinite(input)) return { ok: false, reason: "not-a-number" };
    if (!Number.isInteger(input)) return { ok: false, reason: "ambiguous-decimal" };
    if (input <= 0) return { ok: false, reason: "non-positive" };
    if (input > 240) return { ok: false, reason: "out-of-range" };
    return { ok: true, value: { num: input, den: 1 } };
  }
  const raw = input.trim();
  if (raw === "") return { ok: false, reason: "empty" };
  if (raw.includes("/")) {
    const parts = raw.split("/");
    if (parts.length !== 2) return { ok: false, reason: "invalid-fraction" };
    const num = Number(parts[0]);
    const den = Number(parts[1]);
    if (!Number.isFinite(num) || !Number.isFinite(den)) {
      return { ok: false, reason: "not-a-number" };
    }
    if (!Number.isInteger(num) || !Number.isInteger(den)) {
      return { ok: false, reason: "invalid-fraction" };
    }
    if (den <= 0) return { ok: false, reason: "invalid-fraction" };
    if (num <= 0) return { ok: false, reason: "non-positive" };
    const decimal = num / den;
    if (decimal < 1 || decimal > 240) return { ok: false, reason: "out-of-range" };
    return { ok: true, value: { num, den } };
  }
  if (!/^-?\d+$/.test(raw)) {
    if (/^-?\d*\.\d+$/.test(raw)) return { ok: false, reason: "ambiguous-decimal" };
    return { ok: false, reason: "not-a-number" };
  }
  const n = Number(raw);
  if (n <= 0) return { ok: false, reason: "non-positive" };
  if (n > 240) return { ok: false, reason: "out-of-range" };
  return { ok: true, value: { num: n, den: 1 } };
}
function parseFpsWithDefault(input) {
  if (input === void 0 || input === "") return { ok: true, value: { num: 30, den: 1 } };
  return parseFps(input);
}

// ../core/src/templates/base.ts
function generateBaseHtml(resolution = "portrait") {
  return `<!DOCTYPE html>
<html data-resolution="${resolution}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="stage">
    <div id="stage-zoom-container"></div>
  </div>
</body>
</html>`;
}
function getStageStyles(resolution = "portrait") {
  const { width, height } = CANVAS_DIMENSIONS[resolution];
  return `position: relative; width: ${width}px; height: ${height}px; overflow: hidden; background: #000;`;
}

// ../core/src/gsapCdn.ts
var GSAP_CDN_VERSION = "3.15.0";
function gsapCdnDist(gsapVersion) {
  const version = gsapVersion && /^\d+(\.\d+)*$/.test(gsapVersion) ? gsapVersion : GSAP_CDN_VERSION;
  return `https://cdn.jsdelivr.net/npm/gsap@${version}/dist/`;
}

// ../core/src/templates/constants.ts
var GSAP_CDN = `${gsapCdnDist()}gsap.min.js`;
var BASE_STYLES = `* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 100%; height: 100%; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center; }`;
var ELEMENT_BASE_STYLES = `position: absolute; visibility: hidden;`;
var MEDIA_STYLES = `width: 100%; height: 100%; object-fit: contain;`;
var TEXT_STYLES = `display: flex; align-items: center; justify-content: center; font-family: "Inter", sans-serif; font-size: 48px; font-weight: bold; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); width: 100%; height: 100%;`;
var ZOOM_CONTAINER_STYLES = `position: absolute; inset: 0; transform-origin: 0 0;`;

// ../core/src/utils/htmlAttrSafety.ts
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
function isSafeAttributeValue(name, value) {
  if (URI_BEARING_ATTRS.has(name.toLowerCase())) {
    const trimmed = value.trim();
    if (DANGEROUS_URI_SCHEMES.test(trimmed)) return false;
    if (DANGEROUS_DATA_URI.test(trimmed)) return false;
  }
  return true;
}

// ../core/src/utils/richTextSanitize.ts
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
  const pending = Array.from(
    parent.childNodes,
    (node) => ({ phase: "visit", node })
  ).reverse();
  for (let frame = pending.pop(); frame; frame = pending.pop()) {
    if (frame.phase === "sanitize") {
      if (!FORMATTING_TAGS.has(frame.tag)) unwrap(frame.element);
      else stripAttributes(frame.element);
      continue;
    }
    const child = frame.node;
    if (child.nodeType === TEXT_NODE) continue;
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
  if (!parent) return;
  while (element.firstChild) parent.insertBefore(element.firstChild, element);
  parent.removeChild(element);
}
function stripAttributes(element) {
  const style = element.getAttribute("style");
  for (const name of Array.from(element.getAttributeNames())) {
    const value = element.getAttribute(name) ?? "";
    if (isRichTextFormattingAttribute(name, value)) continue;
    element.removeAttribute(name);
  }
  if (style === null) return;
  const safe = filterStyle(style);
  if (safe) element.setAttribute("style", safe);
  else element.removeAttribute("style");
}
function filterStyle(style) {
  return splitDeclarations(style).map((declaration) => {
    const colon = declaration.indexOf(":");
    if (colon === -1) return null;
    const property = declaration.slice(0, colon).trim().toLowerCase();
    const value = declaration.slice(colon + 1).trim();
    if (!isRichTextFormattingStyle(property, value)) return null;
    return `${property}: ${value}`;
  }).filter((declaration) => declaration !== null).join("; ");
}
function isQuoteDelimiter(char) {
  return char === "'" || char === '"';
}
function nextParenthesisDepth(depth, char) {
  if (char === "(") return depth + 1;
  if (char === ")") return Math.max(0, depth - 1);
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
    if (char === quote) quote = null;
    else if (quote === null && isQuoteDelimiter(char)) quote = char;
    else if (isDeclarationSeparator(char, depth, quote)) {
      declarations.push(current);
      current = "";
      continue;
    } else if (quote === null) {
      depth = nextParenthesisDepth(depth, char);
    }
    current += char;
  }
  if (current.trim()) declarations.push(current);
  return declarations;
}

// ../core/src/generators/richTextHtml.ts
function escape(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function richTextHtml(content) {
  const { document: document2 } = parseHTML("<html><body></body></html>");
  const host = document2.createElement("div");
  host.innerHTML = content;
  sanitizeRichTextChildren(host);
  const result = [];
  const pending = Array.from(host.childNodes).reverse();
  for (let node = pending.pop(); node !== void 0; node = pending.pop()) {
    if (typeof node === "string") {
      result.push(node);
      continue;
    }
    if (node.nodeType === 3) {
      result.push(escape(node.textContent ?? ""));
      continue;
    }
    if (node.nodeType !== 1) continue;
    const element = node;
    const tag = element.tagName.toLowerCase();
    const attrs = Array.from(
      element.attributes,
      (attr) => ` ${attr.name}="${escape(attr.value)}"`
    ).join("");
    result.push(`<${tag}${attrs}>`);
    if (tag === "br") continue;
    pending.push(`</${tag}>`, ...Array.from(element.childNodes).reverse());
  }
  return result.join("");
}

// ../core/src/generators/hyperframes.ts
function escapeHtmlAttributeValue(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function elementSelector(id) {
  const escaped = id.replace(
    /[^a-zA-Z0-9_-]|^-?\d/g,
    (match) => Array.from(match, (char) => `\\${char.codePointAt(0)?.toString(16)} `).join("")
  );
  return `#${escaped}`;
}
function cssString(value) {
  return value.replace(/[\\'\r\n\f]/g, (char) => `\\${char.codePointAt(0)?.toString(16)} `);
}
function sourceAttribute(src, composition = false) {
  const normalized = Array.from(src).filter((char) => char.charCodeAt(0) > 32).join("");
  if (!isSafeAttributeValue("src", normalized) || composition && /^data:/i.test(normalized)) {
    throw new Error("Unsafe media or composition source URL");
  }
  return escapeHtmlAttributeValue(src);
}
function finiteNumber2(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error("Expected a finite generator numeric value");
  }
  return value;
}
function cssValue(value) {
  if (/[;{}<>\r\n]/.test(value)) throw new Error("Invalid generated CSS value");
  return value;
}
var GOOGLE_FONTS_BASE = "https://fonts.googleapis.com/css2";
var FONT_WEIGHTS = {
  Inter: "400;500;600;700;800;900",
  Roboto: "400;500;700;900",
  Montserrat: "400;500;600;700;800;900",
  Poppins: "400;500;600;700;800;900",
  "Bebas Neue": "400",
  Oswald: "400;500;600;700",
  Anton: "400",
  "Playfair Display": "400;500;600;700;800;900",
  Lora: "400;500;600;700",
  Pacifico: "400",
  "Permanent Marker": "400",
  "Fira Code": "400;500;600;700"
};
function generateGoogleFontsUrl(fontFamilies) {
  if (fontFamilies.length === 0) return null;
  const families = fontFamilies.filter((f) => f in FONT_WEIGHTS).map((f) => {
    const weights = FONT_WEIGHTS[f];
    const encodedName = f.replace(/ /g, "+");
    return `family=${encodedName}:wght@${weights}`;
  });
  if (families.length === 0) return null;
  return `${GOOGLE_FONTS_BASE}?${families.join("&")}&display=swap`;
}
function sortElements(elements) {
  return [...elements].sort((a, b) => {
    if (a.zIndex !== b.zIndex) {
      return (a.zIndex ?? 0) - (b.zIndex ?? 0);
    }
    return a.startTime - b.startTime;
  });
}
function generateHyperframesStyles(elements, resolution, customStyles) {
  const { width, height } = CANVAS_DIMENSIONS[resolution];
  const sortedElements = sortElements(elements);
  const elementStyles = sortedElements.map((el) => generateElementStyles(el)).join("\n");
  const usedFonts = /* @__PURE__ */ new Set();
  for (const el of sortedElements) {
    if (isTextElement(el) && el.fontFamily) {
      usedFonts.add(el.fontFamily);
    }
  }
  usedFonts.add("Inter");
  const googleFontsUrl = generateGoogleFontsUrl([...usedFonts]);
  const googleFontsLink = googleFontsUrl ? `<link data-hf-fonts="true" rel="preconnect" href="https://fonts.googleapis.com">
  <link data-hf-fonts="true" rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link data-hf-fonts="true" href="${googleFontsUrl}" rel="stylesheet">` : "";
  const coreCss = `${BASE_STYLES}
#stage { position: relative; width: ${width}px; height: ${height}px; overflow: hidden; background: #fff; }
#stage-zoom-container { ${ZOOM_CONTAINER_STYLES} }
${elementStyles}`.trim();
  const customCss = customStyles?.trim() ? customStyles.trim() : "";
  return { coreCss, customCss, googleFontsLink };
}
function generateElementStyles(element) {
  const baseStyles = "position: absolute;";
  if (isTextElement(element)) {
    const fontSize = element.fontSize ?? 48;
    const fontWeight = element.fontWeight ?? 700;
    const fontFamily = element.fontFamily ?? "Inter";
    const color = element.color ?? "white";
    const textShadow = element.textShadow !== false ? "text-shadow: 2px 2px 4px rgba(0,0,0,0.8);" : "";
    const textOutline = element.textOutline ? `-webkit-text-stroke: ${finiteNumber2(element.textOutlineWidth ?? 2)}px ${cssValue(
      element.textOutlineColor ?? "#000000"
    )}; paint-order: stroke fill;` : "";
    const textHighlight = element.textHighlight ? `background-color: ${cssValue(element.textHighlightColor ?? "yellow")}; padding: ${finiteNumber2(element.textHighlightPadding ?? 4)}px ${finiteNumber2(
      (element.textHighlightPadding ?? 4) * 1.5
    )}px; border-radius: ${finiteNumber2(
      element.textHighlightRadius ?? 4
    )}px; box-decoration-break: clone; -webkit-box-decoration-break: clone;` : "";
    return `    ${elementSelector(element.id)} { ${baseStyles} width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; pointer-events: none; }
    ${elementSelector(element.id)} > div { font-family: '${cssString(fontFamily)}', sans-serif; font-size: ${finiteNumber2(fontSize)}px; font-weight: ${finiteNumber2(fontWeight)}; color: ${cssValue(color)}; ${textShadow} ${textOutline} ${textHighlight} pointer-events: auto; cursor: grab; white-space: pre-wrap; text-align: center; }`;
  }
  switch (element.type) {
    case "video":
      return `    ${elementSelector(element.id)} { ${baseStyles} width: 100%; height: 100%; object-fit: contain; transform-origin: center center; }`;
    case "image":
      return `    ${elementSelector(element.id)} { ${baseStyles} max-width: 100%; max-height: 100%; transform-origin: center center; }`;
    case "audio":
      return `    ${elementSelector(element.id)} { ${baseStyles} }`;
    case "composition":
      return `    ${elementSelector(element.id)} { ${baseStyles} width: 100%; height: 100%; position: absolute; }`;
  }
}
function generateGsapTimelineScript(elements, totalDuration, options = {}) {
  const {
    animations,
    generateDefaultAnimations = true,
    resolution = "landscape",
    keyframes,
    stageZoomKeyframes
  } = options;
  const { width, height } = CANVAS_DIMENSIONS[resolution];
  const sortedElements = sortElements(elements);
  const hasMedia = sortedElements.some((el) => el.type === "video" || el.type === "audio");
  let keyframeAnimations = [];
  if (keyframes) {
    for (const element of sortedElements) {
      const elementKeyframes = keyframes[element.id];
      if (elementKeyframes && elementKeyframes.length > 0) {
        const baseScale = isMediaElement(element) || isCompositionElement(element) ? element.scale ?? 1 : 1;
        const converted = keyframesToGsapAnimations(
          element.id,
          elementKeyframes,
          element.startTime,
          {
            x: element.x ?? 0,
            y: element.y ?? 0,
            scale: baseScale
          }
        );
        keyframeAnimations = keyframeAnimations.concat(
          converted.map((animation) => ({
            ...animation,
            targetSelector: elementSelector(element.id)
          }))
        );
      }
    }
  }
  const zoomAnimations = generateZoomGsapAnimations(stageZoomKeyframes || [], width, height);
  const initialPositionSets = generateInitialPositionSets(sortedElements, keyframes);
  const visibilityAnimations = generateVisibilityForElementsWithoutKeyframes(
    sortedElements,
    keyframes
  );
  let gsapScript;
  if (animations && animations.length > 0) {
    const allAnimations = [...animations, ...keyframeAnimations];
    gsapScript = serializeGsapAnimations(allAnimations, "tl", {
      includeMediaSync: hasMedia
    });
    const prependAnimations = [initialPositionSets, visibilityAnimations].filter(Boolean).join("\n");
    if (prependAnimations) {
      gsapScript = gsapScript.replace(
        "const tl = gsap.timeline({ paused: true });",
        `const tl = gsap.timeline({ paused: true });
${prependAnimations}`
      );
    }
    if (zoomAnimations) {
      gsapScript += "\n" + zoomAnimations;
    }
  } else if (keyframeAnimations.length > 0) {
    gsapScript = serializeGsapAnimations(keyframeAnimations, "tl", {
      includeMediaSync: hasMedia
    });
    const prependAnimations = [initialPositionSets, visibilityAnimations].filter(Boolean).join("\n");
    if (prependAnimations) {
      gsapScript = gsapScript.replace(
        "const tl = gsap.timeline({ paused: true });",
        `const tl = gsap.timeline({ paused: true });
${prependAnimations}`
      );
    }
    if (zoomAnimations) {
      gsapScript += "\n" + zoomAnimations;
    }
  } else if (generateDefaultAnimations) {
    gsapScript = generateDefaultGsapAnimations(
      sortedElements,
      totalDuration,
      stageZoomKeyframes,
      width,
      height
    );
  } else {
    gsapScript = `
    const tl = gsap.timeline({ paused: true });
${initialPositionSets ? initialPositionSets + "\n" : ""}    tl.to({}, { duration: ${finiteNumber2(totalDuration || 1)} });
    `;
    if (zoomAnimations) {
      gsapScript += "\n" + zoomAnimations;
    }
  }
  return gsapScript;
}
function generateHyperframesHtml(elements, totalDuration, options = {}) {
  const {
    animations,
    styles,
    generateDefaultAnimations = true,
    resolution = "landscape",
    compositionId = `comp-${Date.now()}`,
    keyframes,
    stageZoomKeyframes,
    includeScripts = false,
    includeStyles = false
  } = options;
  const maxZoomTime = stageZoomKeyframes && stageZoomKeyframes.length > 0 ? Math.max(...stageZoomKeyframes.map((kf) => kf.time)) : 0;
  const calculatedDuration = elements.length > 0 ? Math.max(...elements.map((el) => el.startTime + el.duration), totalDuration, maxZoomTime) : Math.max(totalDuration, maxZoomTime);
  const sortedElements = sortElements(elements);
  const elementsHtml = sortedElements.map((el) => generateElementHtml(el, keyframes?.[el.id])).join("\n      ");
  const customStyles = styles || "";
  const zoomKeyframesAttr = stageZoomKeyframes && stageZoomKeyframes.length > 0 ? ` data-zoom-keyframes='${escapeHtmlAttributeValue(JSON.stringify(stageZoomKeyframes))}'` : "";
  let styleTags = "";
  let googleFontsLink = "";
  if (includeStyles) {
    const styles2 = generateHyperframesStyles(sortedElements, resolution, customStyles);
    googleFontsLink = styles2.googleFontsLink;
    styleTags = [
      styles2.coreCss ? `  <style data-hf-core="true">
    ${styles2.coreCss.replace(/<\/style/gi, (match) => `<\\${match.slice(1)}`).split("\n").join("\n    ")}
  </style>` : "",
      styles2.customCss ? `  <style data-hf-custom="true">
    ${styles2.customCss.replace(/<\/style/gi, (match) => `<\\${match.slice(1)}`).split("\n").join("\n    ")}
  </style>` : ""
    ].filter(Boolean).join("\n");
  }
  const gsapScript = includeScripts ? generateGsapTimelineScript(sortedElements, totalDuration, {
    animations,
    generateDefaultAnimations,
    resolution,
    keyframes,
    stageZoomKeyframes
  }) : "";
  const gsapCdnTag = includeScripts ? `  <script src="${GSAP_CDN}"></script>` : "";
  const gsapScriptTag = includeScripts ? `  <script>
${gsapScript.replace(/<\/script/gi, (match) => `<\\${match.slice(1)}`)}
  </script>` : "";
  const customStylesAttr = customStyles ? ` data-custom-styles='${escapeHtmlAttributeValue(JSON.stringify(customStyles))}'` : "";
  const resolutionAttr = ` data-resolution="${escapeHtmlAttributeValue(resolution)}"`;
  return `<!DOCTYPE html>
<html data-composition-id="${escapeHtmlAttributeValue(compositionId)}" data-composition-duration="${calculatedDuration}"${resolutionAttr}${customStylesAttr}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${googleFontsLink}
  ${gsapCdnTag}
${styleTags ? `  ${styleTags}` : ""}
</head>
<body>
  <div id="stage">
    <div id="stage-zoom-container"${zoomKeyframesAttr}>
      ${elementsHtml}
    </div>
  </div>
  ${gsapScriptTag}
</body>
</html>`;
}
function calculateZoomTransform(scale, focusX, focusY, canvasWidth, canvasHeight) {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const x = centerX - focusX * scale;
  const y = centerY - focusY * scale;
  return { x, y };
}
function generateZoomGsapAnimations(zoomKeyframes, canvasWidth, canvasHeight) {
  if (!zoomKeyframes || zoomKeyframes.length === 0) {
    return "";
  }
  const sortedKeyframes = [...zoomKeyframes].sort((a, b) => a.time - b.time);
  const animations = [];
  animations.push("    // Stage zoom animations");
  for (let i = 0; i < sortedKeyframes.length; i++) {
    const kf = sortedKeyframes[i];
    if (!kf) continue;
    const { x, y } = calculateZoomTransform(
      kf.zoom.scale,
      kf.zoom.focusX,
      kf.zoom.focusY,
      canvasWidth,
      canvasHeight
    );
    if (i === 0) {
      animations.push(
        `    tl.set("#stage-zoom-container", { scale: ${finiteNumber2(kf.zoom.scale)}, x: ${finiteNumber2(x)}, y: ${finiteNumber2(y)} }, ${finiteNumber2(kf.time)});`
      );
    } else {
      const prevKf = sortedKeyframes[i - 1];
      if (!prevKf) continue;
      const duration = kf.time - prevKf.time;
      const ease = kf.ease ? `, ease: ${JSON.stringify(kf.ease)}` : "";
      animations.push(
        `    tl.to("#stage-zoom-container", { scale: ${finiteNumber2(kf.zoom.scale)}, x: ${finiteNumber2(x)}, y: ${finiteNumber2(y)}, duration: ${finiteNumber2(duration)}${ease} }, ${finiteNumber2(prevKf.time)});`
      );
    }
  }
  return animations.join("\n");
}
function generateElementHtml(element, keyframes) {
  const baseAttrs = [
    `id="${escapeHtmlAttributeValue(String(element.id))}"`,
    `data-hf-id="${escapeHtmlAttributeValue(String(element.id))}"`,
    `${COMPOSITION_ATTRIBUTES.start}="${escapeHtmlAttributeValue(String(element.startTime))}"`,
    `${COMPOSITION_ATTRIBUTES.duration}="${escapeHtmlAttributeValue(String(element.duration))}"`,
    `${COMPOSITION_ATTRIBUTES.trackIndex}="${escapeHtmlAttributeValue(String(element.zIndex))}"`,
    `data-name="${escapeHtmlAttributeValue(String(element.name))}"`
  ];
  if (element.x !== void 0 && element.x !== 0) {
    baseAttrs.push(`data-x="${escapeHtmlAttributeValue(String(element.x))}"`);
  }
  if (element.y !== void 0 && element.y !== 0) {
    baseAttrs.push(`data-y="${escapeHtmlAttributeValue(String(element.y))}"`);
  }
  if (element.scale !== void 0 && element.scale !== 1) {
    baseAttrs.push(`data-scale="${escapeHtmlAttributeValue(String(element.scale))}"`);
  }
  if (element.opacity !== void 0 && element.opacity !== 1) {
    baseAttrs.push(`data-opacity="${escapeHtmlAttributeValue(String(element.opacity))}"`);
  }
  if (keyframes && keyframes.length > 0) {
    const kfJson = JSON.stringify(keyframes);
    baseAttrs.push(`data-keyframes='${escapeHtmlAttributeValue(kfJson)}'`);
  }
  if (isTextElement(element)) {
    const textAttrs = [...baseAttrs, `data-type="text"`];
    if (element.color) {
      textAttrs.push(`data-color="${escapeHtmlAttributeValue(String(element.color))}"`);
    }
    if (element.fontSize) {
      textAttrs.push(`data-font-size="${escapeHtmlAttributeValue(String(element.fontSize))}"`);
    }
    if (element.fontWeight) {
      textAttrs.push(`data-font-weight="${escapeHtmlAttributeValue(String(element.fontWeight))}"`);
    }
    if (element.fontFamily) {
      textAttrs.push(`data-font-family="${escapeHtmlAttributeValue(String(element.fontFamily))}"`);
    }
    if (element.textShadow === false) {
      textAttrs.push(`data-text-shadow="false"`);
    }
    if (element.textOutline) {
      textAttrs.push(`data-text-outline="true"`);
      if (element.textOutlineColor) {
        textAttrs.push(
          `data-text-outline-color="${escapeHtmlAttributeValue(String(element.textOutlineColor))}"`
        );
      }
      if (element.textOutlineWidth) {
        textAttrs.push(
          `data-text-outline-width="${escapeHtmlAttributeValue(String(element.textOutlineWidth))}"`
        );
      }
    }
    if (element.textHighlight) {
      textAttrs.push(`data-text-highlight="true"`);
      if (element.textHighlightColor) {
        textAttrs.push(
          `data-text-highlight-color="${escapeHtmlAttributeValue(String(element.textHighlightColor))}"`
        );
      }
      if (element.textHighlightPadding) {
        textAttrs.push(
          `data-text-highlight-padding="${escapeHtmlAttributeValue(String(element.textHighlightPadding))}"`
        );
      }
      if (element.textHighlightRadius) {
        textAttrs.push(
          `data-text-highlight-radius="${escapeHtmlAttributeValue(String(element.textHighlightRadius))}"`
        );
      }
    }
    const content = richTextHtml(element.content ?? element.name);
    return `<div ${textAttrs.join(" ")}><div>${content}</div></div>`;
  }
  if (isCompositionElement(element)) {
    const compositionAttrs = [
      ...baseAttrs,
      `data-type="composition"`,
      `data-composition-id="${escapeHtmlAttributeValue(String(element.compositionId))}"`
    ];
    if (element.sourceDuration) {
      compositionAttrs.push(
        `data-source-duration="${escapeHtmlAttributeValue(String(element.sourceDuration))}"`
      );
    }
    if (element.sourceWidth) {
      compositionAttrs.push(
        `data-source-width="${escapeHtmlAttributeValue(String(element.sourceWidth))}"`
      );
    }
    if (element.sourceHeight) {
      compositionAttrs.push(
        `data-source-height="${escapeHtmlAttributeValue(String(element.sourceHeight))}"`
      );
    }
    if (element.variableValues && Object.keys(element.variableValues).length > 0) {
      const varJson = JSON.stringify(element.variableValues);
      compositionAttrs.push(`data-variable-values='${escapeHtmlAttributeValue(varJson)}'`);
    }
    const attrs2 = compositionAttrs.join(" ");
    let iframeSrc = element.src.split("?")[0] ?? "";
    if (element.variableValues && Object.keys(element.variableValues).length > 0) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(element.variableValues)) {
        params.set(key, String(value));
      }
      iframeSrc = `${iframeSrc}?${params.toString()}`;
    }
    return `<div ${attrs2} style="width: 100%; height: 100%;">
      <iframe src="${sourceAttribute(iframeSrc, true)}" sandbox="allow-scripts allow-same-origin" style="width: 100%; height: 100%; border: none; pointer-events: none;"></iframe>
      <div class="composition-click-overlay" style="position: absolute; inset: 0; cursor: pointer;"></div>
    </div>`;
  }
  if (isMediaElement(element)) {
    if (element.mediaStartTime) {
      baseAttrs.push(
        `data-media-start="${escapeHtmlAttributeValue(String(element.mediaStartTime))}"`
      );
    }
    if (element.sourceDuration) {
      baseAttrs.push(
        `data-source-duration="${escapeHtmlAttributeValue(String(element.sourceDuration))}"`
      );
    }
    if (element.isAroll) {
      baseAttrs.push(`data-aroll="true"`);
    }
    if (element.volume !== void 0 && element.volume !== 1) {
      baseAttrs.push(`data-volume="${escapeHtmlAttributeValue(String(element.volume))}"`);
    }
    if (element.type === "video" && element.hasAudio) {
      baseAttrs.push(`data-has-audio="true"`);
    }
  }
  const attrs = baseAttrs.join(" ");
  switch (element.type) {
    case "video":
      return `<video ${attrs} src="${sourceAttribute(element.src)}" playsinline></video>`;
    case "image":
      return `<img ${attrs} src="${sourceAttribute(element.src)}" alt="${escapeHtmlAttributeValue(String(element.name))}" />`;
    case "audio":
      return `<audio ${attrs} src="${sourceAttribute(element.src)}"></audio>`;
    default:
      return "";
  }
}
function generateInitialPositionSets(elements, keyframes) {
  const sets = [];
  const timeEpsilon = 1e-3;
  for (const el of elements) {
    const elementKeyframes = keyframes?.[el.id];
    const hasBaseKeyframe = elementKeyframes?.some(
      (kf) => Math.abs(kf.time) <= timeEpsilon && (kf.properties.x !== void 0 || kf.properties.y !== void 0 || kf.properties.scale !== void 0)
    );
    const xVal = el.x ?? 0;
    const yVal = el.y ?? 0;
    const scaleVal = isMediaElement(el) ? el.scale ?? 1 : 1;
    if (el.type === "audio") continue;
    if (isCompositionElement(el)) continue;
    if (hasBaseKeyframe) {
      continue;
    }
    if (scaleVal !== 1) {
      sets.push(
        `    tl.set(${JSON.stringify(elementSelector(el.id))}, { x: ${finiteNumber2(xVal)}, y: ${finiteNumber2(yVal)}, scale: ${finiteNumber2(scaleVal)} }, 0);`
      );
    } else if (xVal !== 0 || yVal !== 0) {
      sets.push(
        `    tl.set(${JSON.stringify(elementSelector(el.id))}, { x: ${finiteNumber2(xVal)}, y: ${finiteNumber2(yVal)} }, 0);`
      );
    }
  }
  return sets.length > 0 ? sets.join("\n") : "";
}
function generateVisibilityForElementsWithoutKeyframes(elements, keyframes) {
  const animations = [];
  for (const el of elements) {
    const elementKeyframes = keyframes?.[el.id];
    const opacityKeyframes = elementKeyframes?.filter((kf) => kf.properties.opacity !== void 0) || [];
    const start = el.startTime;
    const end = el.startTime + el.duration;
    animations.push("    // Element visibility");
    animations.push(
      `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "hidden" }, 0);`
    );
    let elementOpacity = el.opacity ?? 1;
    if (opacityKeyframes.length > 0) {
      const firstOpacityKeyframe = [...opacityKeyframes].sort((a, b) => a.time - b.time)[0];
      if (firstOpacityKeyframe?.properties.opacity !== void 0) {
        elementOpacity = firstOpacityKeyframe.properties.opacity;
      }
    }
    const needsOpacity = elementOpacity !== 1 || opacityKeyframes.length > 0;
    if (needsOpacity) {
      animations.push(
        `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "visible", opacity: ${finiteNumber2(elementOpacity)} }, ${finiteNumber2(start)});`
      );
    } else {
      animations.push(
        `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "visible" }, ${finiteNumber2(start)});`
      );
    }
    animations.push(
      `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "hidden" }, ${finiteNumber2(end)});`
    );
  }
  return animations.length > 0 ? animations.join("\n") : "";
}
function generateDefaultGsapAnimations(elements, totalDuration, stageZoomKeyframes, canvasWidth, canvasHeight) {
  if (elements.length === 0 && (!stageZoomKeyframes || stageZoomKeyframes.length === 0)) {
    return `
    const tl = gsap.timeline({ paused: true });
    tl.to({}, { duration: ${finiteNumber2(totalDuration || 1)} });
    `;
  }
  const animations = [];
  const initialPositionSets = generateInitialPositionSets(elements);
  if (initialPositionSets) {
    animations.push(initialPositionSets);
  }
  for (const el of elements) {
    const start = el.startTime;
    const end = el.startTime + el.duration;
    const elementOpacity = el.opacity ?? 1;
    animations.push("    // Element visibility");
    animations.push(
      `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "hidden" }, 0);`
    );
    if (elementOpacity !== 1) {
      animations.push(
        `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "visible", opacity: ${finiteNumber2(elementOpacity)} }, ${finiteNumber2(start)});`
      );
    } else {
      animations.push(
        `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "visible" }, ${finiteNumber2(start)});`
      );
    }
    animations.push(
      `    tl.set(${JSON.stringify(elementSelector(el.id))}, { visibility: "hidden" }, ${finiteNumber2(end)});`
    );
  }
  const mediaElements = elements.filter((el) => el.type === "video" || el.type === "audio");
  const mediaSync = mediaElements.length > 0 ? `
    // Sync media playback
    tl.eventCallback("onUpdate", function() {
      const time = tl.time();
      document.querySelectorAll("video[data-start], audio[data-start]").forEach(function(media) {
        const start = parseFloat(media.dataset.start);
        const end = parseFloat(media.dataset.end) || Infinity;
        const mediaTime = time - start;
        if (time >= start && time < end) {
          if (Math.abs(media.currentTime - mediaTime) > 0.1) {
            media.currentTime = mediaTime;
          }
          if (media.paused && !tl.paused()) {
            media.play().catch(function() {});
          }
        } else if (!media.paused) {
          media.pause();
        }
      });
    });` : "";
  const zoomAnimations = stageZoomKeyframes && stageZoomKeyframes.length > 0 && canvasWidth && canvasHeight ? "\n" + generateZoomGsapAnimations(stageZoomKeyframes, canvasWidth, canvasHeight) : "";
  return `
    const tl = gsap.timeline({ paused: true });
${animations.join("\n")}
    ${mediaSync}${zoomAnimations}
  `;
}

// ../core/src/compiler/timingResolver.ts
function resolveTimings(input) {
  const { elements, wordTimings, anchors } = input;
  const anchorMap = /* @__PURE__ */ new Map();
  for (const anchor of anchors) {
    anchorMap.set(anchor.hfId, anchor);
  }
  const wordMap = /* @__PURE__ */ new Map();
  for (const wt of wordTimings) {
    wordMap.set(wt.index, wt);
  }
  const result = {};
  for (const el of elements) {
    const anchor = anchorMap.get(el.hfId);
    if (anchor === void 0) {
      result[el.hfId] = {
        enterAt: el.start,
        exitAt: el.start + el.duration,
        holdDuration: 0
      };
      continue;
    }
    const word = wordMap.get(anchor.wordIndex);
    const wordStart = word !== void 0 ? word.start : 0;
    const enterOffset = anchor.enterOffset ?? 0;
    const enterAt = wordStart + enterOffset;
    const holdDuration = Math.max(
      0,
      anchor.slotEnd - (enterAt + anchor.enterDuration + anchor.exitDuration)
    );
    const exitAt = enterAt + anchor.enterDuration + holdDuration + anchor.exitDuration;
    result[el.hfId] = { enterAt, exitAt, holdDuration };
  }
  return result;
}

// ../core/src/audioFx.ts
var HF_AUDIO_FX_ATTR = "data-fx-chain";
var HF_AUDIO_FX_DATA_KEY = HF_AUDIO_FX_ATTR.slice("data-".length);
var freq = (key = "frequency", label = "Frequency", def = 1e3, min = 20, max = 2e4) => ({
  kind: "number",
  key,
  label,
  unit: "Hz",
  min,
  max,
  step: 1,
  default: def,
  scale: "log",
  automatable: true
});
var qParam = (def = 0.707, hint = "Bandwidth \u2014 higher is narrower.") => ({
  kind: "number",
  key: "q",
  label: "Q",
  unit: "",
  min: 0.1,
  max: 20,
  step: 0.01,
  default: def,
  scale: "log",
  automatable: true,
  hint
});
var gainDb = (min = -40, max = 40, def = 0) => ({
  kind: "number",
  key: "gain",
  label: "Gain",
  unit: "dB",
  min,
  max,
  step: 0.1,
  default: def,
  automatable: true
});
var poles = {
  kind: "enum",
  key: "poles",
  label: "Slope",
  options: [
    { value: "1", label: "6 dB/oct" },
    { value: "2", label: "12 dB/oct" }
  ],
  default: "2",
  hint: "Two poles is the usual biquad; one pole is gentler."
};
var HF_AUDIO_FX = [
  {
    id: "gain",
    label: "Gain",
    group: "dynamics",
    description: "Raise or lower the whole signal. Automate it to duck under something else.",
    // Cuts go deep, boosts stay modest: this is a level stage for making room,
    // and a chain that can add 40 dB clips long before it is useful.
    params: [gainDb(-60, 12, 0)],
    web: "gain-node"
  },
  {
    id: "peaking",
    label: "Peaking EQ",
    group: "filter",
    description: "Boost or cut a band, leaving everything either side alone.",
    params: [freq("frequency", "Frequency", 1e3), gainDb(-40, 40, 0), qParam(1)],
    web: "biquad-peaking"
  },
  {
    id: "lowshelf",
    label: "Low Shelf",
    group: "filter",
    description: "Lift or drop everything below the corner frequency.",
    // No Q: the Web Audio spec leaves it unused for shelving filters, so the
    // control moved nothing — and being automatable, a lane drawn on it would
    // have been silently inert.
    params: [freq("frequency", "Frequency", 200, 20, 2e3), gainDb(-40, 40, 0)],
    web: "biquad-lowshelf"
  },
  {
    id: "highshelf",
    label: "High Shelf",
    group: "filter",
    description: "Lift or drop everything above the corner frequency.",
    params: [freq("frequency", "Frequency", 4e3, 500, 2e4), gainDb(-40, 40, 0)],
    web: "biquad-highshelf"
  },
  {
    id: "highpass",
    label: "High-pass",
    group: "filter",
    description: "Remove low frequencies \u2014 the usual fix for rumble on a voice.",
    params: [freq("frequency", "Cutoff", 300, 20, 2e4), qParam(0.707), poles],
    web: "biquad-highpass"
  },
  {
    id: "lowpass",
    label: "Low-pass",
    group: "filter",
    description: "Remove high frequencies \u2014 darkens or muffles a track.",
    params: [freq("frequency", "Cutoff", 8e3, 100, 2e4), qParam(0.707), poles],
    web: "biquad-lowpass"
  },
  {
    id: "compressor",
    label: "Compressor",
    group: "dynamics",
    description: "Pull loud parts down so the quiet ones can come up.",
    params: [
      {
        kind: "number",
        key: "threshold",
        label: "Threshold",
        unit: "dB",
        min: -60,
        max: 0,
        step: 0.5,
        default: -24,
        hint: "Level above which the compressor starts working."
      },
      {
        kind: "number",
        key: "ratio",
        label: "Ratio",
        unit: ":1",
        min: 1,
        max: 20,
        step: 0.1,
        default: 4
      },
      {
        kind: "number",
        key: "attack",
        label: "Attack",
        unit: "ms",
        min: 0.01,
        max: 2e3,
        step: 0.1,
        default: 20,
        scale: "log"
      },
      {
        kind: "number",
        key: "release",
        label: "Release",
        unit: "ms",
        min: 0.01,
        max: 9e3,
        step: 1,
        default: 250,
        scale: "log"
      },
      {
        kind: "number",
        key: "knee",
        label: "Knee",
        unit: "",
        min: 1,
        max: 8,
        step: 0.01,
        default: 2.83,
        hint: "1 is a hard corner; higher eases into it."
      },
      {
        kind: "number",
        key: "makeup",
        label: "Makeup",
        unit: "dB",
        min: 0,
        max: 36,
        step: 0.1,
        default: 0
      },
      {
        kind: "number",
        key: "mix",
        label: "Mix",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 1,
        hint: "Below 1 blends the dry signal back in."
      }
    ],
    web: "worklet-compressor"
  },
  {
    id: "limiter",
    label: "Limiter",
    group: "dynamics",
    description: "Hard ceiling \u2014 nothing gets past the limit.",
    params: [
      {
        kind: "number",
        key: "limit",
        label: "Ceiling",
        unit: "dB",
        min: -24,
        max: 0,
        step: 0.1,
        default: -1
      },
      {
        kind: "number",
        key: "attack",
        label: "Attack",
        unit: "ms",
        min: 0.1,
        max: 80,
        step: 0.1,
        default: 5
      },
      {
        kind: "number",
        key: "release",
        label: "Release",
        unit: "ms",
        min: 1,
        max: 8e3,
        step: 1,
        default: 50,
        scale: "log"
      },
      {
        kind: "number",
        key: "level_out",
        label: "Output",
        unit: "dB",
        min: -24,
        max: 24,
        step: 0.1,
        default: 0
      }
    ],
    web: "worklet-limiter"
  },
  {
    id: "gate",
    label: "Noise Gate",
    group: "dynamics",
    description: "Silence the track when it drops below the threshold.",
    params: [
      {
        kind: "number",
        key: "threshold",
        label: "Threshold",
        unit: "dB",
        min: -80,
        max: 0,
        step: 0.5,
        default: -35
      },
      {
        kind: "number",
        key: "range",
        label: "Range",
        unit: "dB",
        min: -80,
        max: 0,
        step: 0.5,
        default: -24,
        hint: "How far down the gate pulls when closed."
      },
      {
        kind: "number",
        key: "ratio",
        label: "Ratio",
        unit: ":1",
        min: 1,
        max: 20,
        step: 0.1,
        default: 10
      },
      {
        kind: "number",
        key: "attack",
        label: "Attack",
        unit: "ms",
        min: 0.01,
        max: 9e3,
        step: 0.1,
        default: 1,
        scale: "log"
      },
      {
        kind: "number",
        key: "release",
        label: "Release",
        unit: "ms",
        min: 0.01,
        max: 9e3,
        step: 1,
        default: 100,
        scale: "log"
      },
      {
        kind: "number",
        key: "knee",
        label: "Knee",
        unit: "",
        min: 1,
        max: 8,
        step: 0.01,
        default: 2.83
      }
    ],
    web: "worklet-gate"
  },
  {
    id: "saturate",
    label: "Saturation",
    group: "nonlinear",
    description: "Soft-clip the waveform for warmth or outright distortion.",
    params: [
      {
        kind: "enum",
        key: "type",
        label: "Curve",
        options: [
          { value: "tanh", label: "Tanh" },
          { value: "atan", label: "Arctan" },
          { value: "cubic", label: "Cubic" },
          { value: "exp", label: "Exponential" },
          { value: "alg", label: "Algebraic" },
          { value: "quintic", label: "Quintic" },
          { value: "sin", label: "Sine" },
          { value: "erf", label: "Error function" },
          { value: "hard", label: "Hard clip" }
        ],
        default: "tanh"
      },
      {
        kind: "number",
        key: "threshold",
        label: "Threshold",
        unit: "dB",
        min: -40,
        max: 0,
        step: 0.1,
        default: -6
      },
      {
        kind: "number",
        key: "output",
        automatable: true,
        label: "Output",
        unit: "dB",
        min: -24,
        max: 24,
        step: 0.1,
        default: 0
      },
      {
        kind: "number",
        key: "oversample",
        label: "Oversample",
        unit: "x",
        min: 1,
        max: 8,
        step: 1,
        default: 4,
        hint: "Higher costs more but keeps aliasing down."
      }
    ],
    web: "waveshaper"
  },
  {
    id: "bitcrush",
    label: "Bitcrush",
    group: "nonlinear",
    description: "Drop bit depth and sample rate for a lo-fi, digital sound.",
    params: [
      {
        kind: "number",
        key: "bits",
        label: "Bit depth",
        unit: "bit",
        min: 1,
        max: 32,
        step: 0.1,
        default: 8
      },
      {
        kind: "number",
        key: "samples",
        label: "Sample hold",
        unit: "x",
        min: 1,
        max: 250,
        step: 1,
        default: 1,
        hint: "Repeats each sample N times \u2014 a crude downsample."
      },
      {
        kind: "number",
        key: "mix",
        label: "Mix",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 1
      }
    ],
    web: "worklet-bitcrush"
  },
  {
    id: "pitchshift",
    label: "Pitch shift",
    group: "time",
    // The granular algorithm reads from a 100 ms grain, so its output runs a
    // constant ~50 ms behind its input and nothing in the graph subtracts that
    // — there is no latency/pre-roll concept here yet. It is inaudible on its
    // own and audible against picture or against an unshifted track, so it is
    // stated rather than hidden. `semitones: 0` bypasses the node entirely.
    description: "Shifts pitch up or down without changing playback speed. Adds ~50 ms of latency.",
    params: [
      {
        kind: "number",
        key: "semitones",
        label: "Semitones",
        unit: "st",
        min: -12,
        max: 12,
        step: 1,
        default: 0
      },
      {
        kind: "number",
        key: "mix",
        label: "Mix",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 1
      }
    ],
    web: "worklet-pitchshift"
  },
  {
    id: "delay",
    label: "Delay",
    group: "time",
    description: "Repeating echoes behind the dry signal.",
    params: [
      {
        kind: "number",
        key: "time",
        automatable: true,
        label: "Time",
        unit: "ms",
        min: 1,
        max: 5e3,
        step: 1,
        default: 250,
        scale: "log"
      },
      // aecho rejects a decay of exactly 0 ("out of allowed range: (0, 1]"),
      // so the floor is a hair above silence rather than at it.
      {
        kind: "number",
        key: "feedback",
        automatable: true,
        label: "Feedback",
        unit: "",
        min: 0.01,
        max: 0.95,
        step: 0.01,
        default: 0.35
      },
      {
        kind: "number",
        key: "mix",
        automatable: true,
        label: "Mix",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.4
      }
    ],
    web: "delay-feedback"
  },
  {
    id: "chorus",
    label: "Chorus",
    group: "time",
    description: "Detuned copies of the signal for width and thickness.",
    params: [
      {
        kind: "number",
        key: "delay",
        automatable: true,
        label: "Delay",
        unit: "ms",
        min: 1,
        max: 100,
        step: 0.1,
        default: 7
      },
      {
        kind: "number",
        key: "depth",
        automatable: true,
        label: "Depth",
        unit: "ms",
        min: 0,
        max: 10,
        step: 0.01,
        default: 2
      },
      {
        kind: "number",
        key: "speed",
        automatable: true,
        label: "Rate",
        unit: "Hz",
        min: 0.01,
        max: 10,
        step: 0.01,
        default: 1
      },
      {
        kind: "number",
        key: "mix",
        automatable: true,
        label: "Mix",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.5
      }
    ],
    web: "chorus-lfo"
  },
  {
    id: "phaser",
    label: "Phaser",
    group: "time",
    description: "Sweeping notches moving through the spectrum.",
    params: [
      {
        kind: "number",
        key: "in_gain",
        automatable: true,
        label: "Input",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.4
      },
      {
        kind: "number",
        key: "out_gain",
        automatable: true,
        label: "Output",
        unit: "",
        min: 0,
        max: 2,
        step: 0.01,
        default: 0.74
      },
      // aphaser advertises a delay range starting at 0 but rejects it at
      // runtime with "delay is too small"; 0.1 ms is the real floor.
      {
        kind: "number",
        key: "delay",
        label: "Delay",
        unit: "ms",
        min: 0.1,
        max: 5,
        step: 0.1,
        default: 3
      },
      {
        kind: "number",
        key: "decay",
        label: "Decay",
        unit: "",
        min: 0,
        max: 0.99,
        step: 0.01,
        default: 0.4
      },
      {
        kind: "number",
        key: "speed",
        automatable: true,
        label: "Rate",
        unit: "Hz",
        min: 0.1,
        max: 2,
        step: 0.01,
        default: 0.5
      },
      {
        kind: "enum",
        key: "type",
        label: "Waveform",
        options: [
          { value: "0", label: "Triangular" },
          { value: "1", label: "Sinusoidal" }
        ],
        default: "0"
      }
    ],
    web: "allpass-phaser"
  },
  {
    id: "reverb",
    label: "Reverb",
    group: "time",
    description: "Room tail. Both ends convolve the same generated impulse, so preview matches render.",
    params: [
      {
        kind: "number",
        key: "size",
        label: "Room size",
        unit: "",
        min: 0.05,
        max: 1,
        step: 0.01,
        default: 0.7
      },
      {
        kind: "number",
        key: "damping",
        label: "Damping",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.5,
        hint: "Higher rolls the top off the tail faster."
      },
      {
        kind: "number",
        key: "wet",
        automatable: true,
        label: "Wet",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.35
      },
      {
        kind: "number",
        key: "dry",
        automatable: true,
        label: "Dry",
        unit: "",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.7
      }
    ],
    web: "convolver"
  }
];
var BY_ID = new Map(HF_AUDIO_FX.map((d) => [d.id, d]));
var HF_AUDIO_FX_IDS = HF_AUDIO_FX.map((d) => d.id);

// ../core/src/audioGain.ts
var MAX_AUDIO_GAIN_DB = 12;
function audioDbToGain(db) {
  return 10 ** (db / 20);
}
var MAX_AUDIO_GAIN = audioDbToGain(MAX_AUDIO_GAIN_DB);

// ../core/src/audioAutomation.ts
var HF_AUDIO_AUTOMATION_ATTR = "data-automation";
var HF_AUDIO_AUTOMATION_DATA_KEY = HF_AUDIO_AUTOMATION_ATTR.slice("data-".length);
var HF_AUDIO_AUTOMATION_VERSION = 1;
var MAX_AUTOMATION_POINTS = 512;
var AudioAutomationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AudioAutomationError";
  }
};
var VOLUME_TARGET = "volume";
var RATE_TARGET = "rate";
function parseAutomationTarget(target) {
  if (target === VOLUME_TARGET) return { kind: "volume" };
  if (target === RATE_TARGET) return { kind: "rate" };
  const parts = target.split(".");
  if (parts.length === 3 && parts[0] === "fx" && parts[1] === PRESET_TARGET_KEY) {
    const presetId = parts[2];
    return presetId ? { kind: "preset", presetId } : null;
  }
  if (parts.length !== 3 || parts[0] !== "fx") return null;
  const [, nodeId, param] = parts;
  if (!nodeId || !param) return null;
  return { kind: "fx", nodeId, param };
}
var PRESET_TARGET_KEY = "preset";
var VOLUME_RANGE = {
  min: 0,
  max: MAX_AUDIO_GAIN,
  step: 0.01,
  unit: "",
  label: "Volume",
  scale: "linear",
  default: 1
};
var RATE_RANGE = {
  min: MIN_PLAYBACK_RATE,
  max: MAX_PLAYBACK_RATE,
  step: 0.05,
  unit: "x",
  label: "Speed",
  scale: "log",
  default: 1
};
function numberOrNull(raw) {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (typeof raw === "string" && raw.trim() !== "") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}
function clampCurve(v) {
  const n = numberOrNull(v);
  if (n === null || n === 0) return 0;
  return Math.min(1, Math.max(-1, n));
}
function clampVia(rawX, rawY) {
  const x = numberOrNull(rawX);
  const y = numberOrNull(rawY);
  if (x === null || y === null) return null;
  const inside = (n) => Math.min(0.999, Math.max(1e-3, n));
  const cx = inside(x);
  const cy = inside(y);
  if (Math.abs(cx - cy) < 1e-6) return null;
  return { x: cx, y: cy };
}
function shapeFields(p) {
  const curve = clampCurve(p?.curve);
  const via = clampVia(p?.viaX, p?.viaY);
  return {
    ...curve ? { curve } : {},
    ...via ? { viaX: via.x, viaY: via.y } : {}
  };
}
function cleanPoint(p, range) {
  const t = numberOrNull(p?.t);
  const v = numberOrNull(p?.v);
  if (t === null || v === null) return null;
  const clamped = range ? Math.min(range.max, Math.max(range.min, v)) : v;
  return { t: Math.max(0, t), v: clamped, ...shapeFields(p) };
}
function normalizePoints(points, range) {
  const clean = points.map((p) => cleanPoint(p, range)).filter((p) => p !== null).sort((a, b) => a.t - b.t);
  const out = [];
  for (const p of clean) {
    if (out.length > 0 && out[out.length - 1].t === p.t) out[out.length - 1] = p;
    else out.push(p);
  }
  return out.slice(0, MAX_AUTOMATION_POINTS);
}
function normalizeAutomation(automation) {
  const lanes = [];
  for (const lane of automation.lanes) {
    if (!parseAutomationTarget(lane.target)) continue;
    const range = lane.target === VOLUME_TARGET ? VOLUME_RANGE : lane.target === RATE_TARGET ? RATE_RANGE : null;
    const points = normalizePoints(lane.points ?? [], range);
    if (points.length > 0) lanes.push({ target: lane.target, points });
  }
  return { version: HF_AUDIO_AUTOMATION_VERSION, lanes };
}
function parseAutomation(json) {
  let raw;
  try {
    raw = JSON.parse(json);
  } catch (err) {
    throw new AudioAutomationError(`Automation is not valid JSON: ${err.message}`);
  }
  if (typeof raw !== "object" || raw === null) {
    throw new AudioAutomationError("Automation must be a JSON object.");
  }
  const obj = raw;
  if (obj.version !== HF_AUDIO_AUTOMATION_VERSION) {
    throw new AudioAutomationError(`Unsupported automation version: ${String(obj.version)}`);
  }
  if (!Array.isArray(obj.lanes)) {
    throw new AudioAutomationError("Automation is missing a `lanes` array.");
  }
  const lanes = obj.lanes.map((l, i) => {
    if (typeof l !== "object" || l === null) {
      throw new AudioAutomationError(`Lane ${i} is not an object.`);
    }
    const lane = l;
    if (typeof lane.target !== "string" || !parseAutomationTarget(lane.target)) {
      throw new AudioAutomationError(`Lane ${i} has an unreadable target: ${String(lane.target)}`);
    }
    if (!Array.isArray(lane.points)) {
      throw new AudioAutomationError(`Lane ${i} is missing a \`points\` array.`);
    }
    return { target: lane.target, points: lane.points };
  });
  return normalizeAutomation({ version: HF_AUDIO_AUTOMATION_VERSION, lanes });
}
function applyCurve(x, curve) {
  if (!curve) return x;
  return Math.pow(x, Math.pow(2, 2 * curve));
}
function viaConic(viaX, viaY) {
  const dx = viaX - 0.5;
  const dy = viaY - 0.5;
  const edge = 0.999;
  const MAX_WEIGHT = 1e6;
  const needX = dx > 0 ? dx / (edge - viaX) : dx < 0 ? -dx / (viaX - (1 - edge)) : 0;
  const needY = dy > 0 ? dy / (edge - viaY) : dy < 0 ? -dy / (viaY - (1 - edge)) : 0;
  const w = Math.min(MAX_WEIGHT, Math.max(1, needX, needY));
  return { cx: viaX + dx / w, cy: viaY + dy / w, w };
}
function shapeVia(x, viaX, viaY) {
  const { cx, cy, w } = viaConic(viaX, viaY);
  const spread = 2 - 2 * w;
  const a = x * spread - 1 + 2 * w * cx;
  const b = -x * spread - 2 * w * cx;
  const t = conicParam(a, b, x);
  const rest = 1 - t;
  const denominator = rest * rest + 2 * w * t * rest + t * t;
  if (!(denominator > 0)) return x;
  return (2 * w * cy * t * rest + t * t) / denominator;
}
function conicParam(a, b, c) {
  if (Math.abs(a) < 1e-12) return Math.abs(b) < 1e-12 ? c : -c / b;
  const root = Math.sqrt(Math.max(0, b * b - 4 * a * c));
  const first = (-b + root) / (2 * a);
  const second = (-b - root) / (2 * a);
  const onArc = (t) => t >= -1e-9 && t <= 1 + 1e-9;
  if (onArc(first)) return Math.min(1, Math.max(0, first));
  if (onArc(second)) return Math.min(1, Math.max(0, second));
  return c;
}
function shapeProgress(x, point) {
  const via = clampVia(point.viaX, point.viaY);
  if (via) return shapeVia(Math.min(1, Math.max(0, x)), via.x, via.y);
  return applyCurve(x, point.curve);
}
function lerpValue(a, b, x, scale) {
  if (scale === "log" && a > 0 && b > 0) {
    return Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * x);
  }
  return a + (b - a) * x;
}
function sampleAutomationLane(lane, t, scale = "linear") {
  const pts = lane.points;
  if (pts.length === 0) return 0;
  const first = pts[0];
  if (t <= first.t) return first.v;
  const last = pts[pts.length - 1];
  if (t >= last.t) return last.v;
  let lo = 0;
  let hi = pts.length - 1;
  while (hi - lo > 1) {
    const mid = lo + hi >> 1;
    if (pts[mid].t <= t) lo = mid;
    else hi = mid;
  }
  const a = pts[lo];
  const b = pts[hi];
  const span = b.t - a.t;
  if (span <= 0) return b.v;
  return lerpValue(a.v, b.v, shapeProgress((t - a.t) / span, a), scale);
}

// ../core/src/runtime/audioAutomationVolume.ts
var cache = /* @__PURE__ */ new Map();
var CACHE_LIMIT = 64;
function laneFromAttr(raw, target = VOLUME_TARGET) {
  const key = `${target}\0${raw}`;
  const hit = cache.get(key);
  if (hit !== void 0) return hit;
  let lane = null;
  try {
    lane = parseAutomation(raw).lanes.find((l) => l.target === target) ?? null;
  } catch {
    lane = null;
  }
  if (cache.size > CACHE_LIMIT) cache.clear();
  cache.set(key, lane);
  return lane;
}

// ../core/src/speedRamp.ts
var SHIFT_RESAMPLES = 16;
function shiftRateLane(spec, dt) {
  if (typeof spec === "number" || dt === 0) return spec;
  const next = spec.points.findIndex((p) => p.t > dt);
  const later = next < 0 ? [] : spec.points.slice(next).map((p) => ({ ...p, t: p.t - dt }));
  const left = next > 0 ? spec.points[next - 1] : void 0;
  const shaped = left !== void 0 && (left.curve || left.viaX !== void 0);
  const cut = shaped && next > 0 ? spec.points[next].t - dt : 0;
  const samples = Array.from({ length: shaped ? SHIFT_RESAMPLES - 1 : 0 }, (_, k) => {
    const t = (k + 1) * cut / SHIFT_RESAMPLES;
    return { t, v: rateAt(spec, dt + t) };
  });
  return { ...spec, points: [{ t: 0, v: rateAt(spec, dt) }, ...samples, ...later] };
}
var CELLS_PER_SEGMENT = 48;
var tables = /* @__PURE__ */ new WeakMap();
function buildTable(lane) {
  const pts = lane.points;
  const firstRate = pts[0].v;
  const lastRate = pts[pts.length - 1].v;
  const ts = [0];
  const ss = [0];
  const push = (t) => {
    const prevT = ts[ts.length - 1];
    if (t <= prevT) return;
    const prevRate = sampleAutomationLane(lane, prevT, "log");
    ts.push(t);
    ss.push(
      ss[ss.length - 1] + (prevRate + sampleAutomationLane(lane, t, "log")) / 2 * (t - prevT)
    );
  };
  const first = Math.max(0, pts[0].t);
  push(first);
  for (let i = 1; i < pts.length; i += 1) {
    const a = pts[i - 1].t;
    const b = pts[i].t;
    if (b <= 0) continue;
    for (let k = 1; k <= CELLS_PER_SEGMENT; k += 1)
      push(Math.max(a, 0) + (b - a) * k / CELLS_PER_SEGMENT);
  }
  return { ts: Float64Array.from(ts), ss: Float64Array.from(ss), firstRate, lastRate };
}
function tableFor(lane) {
  let table = tables.get(lane);
  if (!table) {
    table = buildTable(lane);
    tables.set(lane, table);
  }
  return table;
}
function usable(spec) {
  return typeof spec !== "number" && spec.points.length > 0;
}
function rateAt(spec, t) {
  if (typeof spec === "number") return spec;
  return usable(spec) ? sampleAutomationLane(spec, t, "log") : 1;
}
function interpolate(xs, ys, x) {
  let lo = 0;
  let hi = xs.length - 1;
  while (hi - lo > 1) {
    const mid = lo + hi >> 1;
    if (xs[mid] <= x) lo = mid;
    else hi = mid;
  }
  return ys[lo] + (ys[hi] - ys[lo]) * (x - xs[lo]) / (xs[hi] - xs[lo]);
}
function sourceTimeAt(spec, t) {
  if (typeof spec === "number") return t * spec;
  if (!usable(spec)) return t;
  const { ts, ss, firstRate, lastRate } = tableFor(spec);
  const last = ts.length - 1;
  if (t <= 0) return t * firstRate;
  if (t >= ts[last]) return ss[last] + (t - ts[last]) * lastRate;
  return interpolate(ts, ss, t);
}
function timeAtSourceTime(spec, source) {
  if (typeof spec === "number") return source / spec;
  if (!usable(spec)) return source;
  const { ts, ss, firstRate, lastRate } = tableFor(spec);
  const last = ts.length - 1;
  if (source <= 0) return source / firstRate;
  if (source >= ss[last]) return ts[last] + (source - ss[last]) / lastRate;
  return interpolate(ss, ts, source);
}
function parseRateLane(raw) {
  return raw ? laneFromAttr(raw, RATE_TARGET) : null;
}
function resolveRateSpec(automationAttr, constant) {
  return parseRateLane(automationAttr) ?? constant;
}
var SPEED_PRESETS = [
  {
    id: "montage",
    label: "Montage",
    points: [
      [0, 0.9],
      [0.15, 0.3],
      [0.5, 2.5],
      [0.85, 0.3],
      [1, 0.9]
    ]
  },
  {
    id: "hero",
    label: "Hero",
    points: [
      [0, 1],
      [0.25, 1.6],
      [0.5, 0.25],
      [0.75, 1.6],
      [1, 1]
    ]
  },
  {
    id: "bullet",
    label: "Bullet",
    points: [
      [0, 3],
      [0.4, 3],
      [0.5, 0.15],
      [0.6, 3],
      [1, 3]
    ]
  },
  {
    id: "jump-cut",
    label: "Jump cut",
    points: [
      [0, 0.5],
      [0.24, 0.5],
      [0.26, 3],
      [0.5, 3],
      [0.52, 0.5],
      [0.74, 0.5],
      [0.76, 3],
      [1, 3]
    ]
  },
  {
    id: "flash-in",
    label: "Flash in",
    points: [
      [0, 0.3],
      [0.6, 0.6],
      [1, 5]
    ]
  },
  {
    id: "flash-out",
    label: "Flash out",
    points: [
      [0, 5],
      [0.4, 0.6],
      [1, 0.3]
    ]
  },
  {
    id: "ramp-in",
    label: "Ramp in",
    points: [
      [0, 0.5],
      [1, 1]
    ]
  },
  {
    id: "ramp-out",
    label: "Ramp out",
    points: [
      [0, 1],
      [1, 0.5]
    ]
  },
  {
    id: "slowmo-middle",
    label: "Slow-mo middle",
    points: [
      [0, 1],
      [1 / 3, 0.35],
      [2 / 3, 0.35],
      [1, 1]
    ]
  }
];

// ../core/src/runtime/domRealm.ts
var XHTML_NS = "http://www.w3.org/1999/xhtml";
function isElementNode2(value) {
  return value != null && value.nodeType === 1;
}
function isHtmlElement(value) {
  return isElementNode2(value) && value.namespaceURI === XHTML_NS;
}
function isHtmlTag(value, tag) {
  return isHtmlElement(value) && value.localName === tag;
}
function isVideoElement(value) {
  return isHtmlTag(value, "video");
}
function isAudioElement(value) {
  return isHtmlTag(value, "audio");
}
function isMediaElement2(value) {
  return isVideoElement(value) || isAudioElement(value);
}
function isImageElement(value) {
  return isHtmlTag(value, "img");
}

// ../core/src/runtime/playbackRate.ts
var normalizePlaybackRate = clampPlaybackRate;
function parseStrictFiniteTimingNumber(raw) {
  return parseNumeric(raw);
}
function readElementPlaybackRate(el) {
  return readPlaybackRate(
    (name) => el.getAttribute(name),
    isMediaElement2(el) ? el.defaultPlaybackRate : 1
  );
}
function normalizeRateSpec(spec) {
  return typeof spec === "object" ? spec : normalizePlaybackRate(spec ?? 1);
}
function readElementRateSpec(el) {
  return resolveRateSpec(el.getAttribute("data-automation"), readElementPlaybackRate(el));
}
function readMediaStart(el) {
  return readMediaOffsetSeconds((name) => el.getAttribute(name));
}
function resolveNaturalMediaTimelineDuration(el, sourceDuration) {
  return resolveNaturalMediaTimelineDurationFromValues(
    sourceDuration,
    readMediaStart(el),
    readElementRateSpec(el)
  );
}
function resolveTimedImageDurationSeconds(el, startSeconds = 0) {
  if (!isImageElement(el)) return null;
  if (!el.hasAttribute("data-start") && !el.hasAttribute("data-track-index")) return null;
  return resolveMediaDuration({
    tag: "img",
    authoredDurationSeconds: readAuthoredDurationSeconds(
      (name) => el.getAttribute(name),
      startSeconds
    ),
    sourceDurationSeconds: null,
    mediaStartSeconds: 0,
    playbackRate: 1
  }).seconds;
}
function resolveNaturalMediaTimelineDurationFromValues(sourceDuration, mediaStart, playbackRate) {
  if (typeof playbackRate === "number") {
    return resolveNaturalDurationSeconds(sourceDuration, mediaStart, playbackRate);
  }
  if (!Number.isFinite(sourceDuration)) return null;
  return timeAtSourceTime(playbackRate, Math.max(0, sourceDuration - mediaStart));
}

// ../core/src/compiler/timingCompiler.ts
var MEDIA_DURATION_CLAMP_EPSILON_SECONDS = 0.05;
function shouldClampMediaDuration(declaredDuration, maxDuration) {
  return declaredDuration > maxDuration + MEDIA_DURATION_CLAMP_EPSILON_SECONDS;
}
function shouldClampResolvedMediaDuration(tagName, declaredDuration, maxDuration) {
  return tagName === "audio" && shouldClampMediaDuration(declaredDuration, maxDuration);
}
function getAttr(tag, attr) {
  const match = tag.match(new RegExp(`(?<![\\w-])${attr}=(?:"([^"]+)"|'([^']+)')`));
  return match ? match[1] ?? match[2] ?? null : null;
}
function tagAttrReader(tag) {
  return {
    getAttribute: (name) => {
      const raw = getAttr(tag, name);
      return raw && name === "data-automation" ? raw.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&") : raw;
    }
  };
}
function hasAttr(tag, attr) {
  return new RegExp(`\\s${attr}(?:\\s|=|>|/)`).test(tag);
}
function injectAttr(tag, attr, value) {
  return tag.replace(/>$/, ` ${attr}="${value}">`);
}
function setAttr(tag, attr, value) {
  if (!hasAttr(tag, attr)) return injectAttr(tag, attr, value);
  return tag.replace(new RegExp(`(${attr}=["'])[^"']*(["'])`), `$1${value}$2`);
}
function maskInertRegions(html) {
  const stash = [];
  const parts = [];
  const opening = /<!--|<script\b|<style\b/gi;
  const closings = /* @__PURE__ */ new Map([
    ["<!--", /--!?>/g],
    ["<script", /<\/script\s*>/gi],
    ["<style", /<\/style\s*>/gi]
  ]);
  let cursor = 0;
  let match;
  while ((match = opening.exec(html)) !== null) {
    const kind = match[0].toLowerCase();
    const closing = closings.get(kind);
    if (!closing) continue;
    closing.lastIndex = opening.lastIndex;
    const end = closing.exec(html) ? closing.lastIndex : -1;
    if (end < 0) {
      closings.delete(kind);
      continue;
    }
    const token = `\0HFMASK${stash.length}\0`;
    parts.push(html.slice(cursor, match.index), token);
    stash.push(html.slice(match.index, end));
    cursor = end;
    opening.lastIndex = cursor;
  }
  parts.push(html.slice(cursor));
  const masked = parts.join("");
  const restore = (s) => (
    // oxlint-disable-next-line no-control-regex -- NUL cannot appear in HTML, which is what makes it a safe mask delimiter
    s.replace(/\u0000HFMASK(\d+)\u0000/g, (_, i) => stash[Number(i)] ?? "")
  );
  return { masked, restore };
}
function* iterateOpeningTags(html, prefix) {
  let match;
  while ((match = prefix.exec(html)) !== null) {
    const closing = html.indexOf(">", prefix.lastIndex);
    if (closing < 0) break;
    const end = closing + 1;
    yield { tag: html.slice(match.index, end), index: match.index, end };
    prefix.lastIndex = end;
  }
}
function replaceOpeningTags(html, prefix, replace) {
  const parts = [];
  let cursor = 0;
  for (const { tag, index, end } of iterateOpeningTags(html, prefix)) {
    parts.push(html.slice(cursor, index), replace(tag));
    cursor = end;
  }
  parts.push(html.slice(cursor));
  return parts.join("");
}
function replaceIdTags(html, id, replace) {
  const idPattern = new RegExp(`id=["']${escapeRegex(id)}["']`, "gi");
  const lastClosing = html.lastIndexOf(">");
  const parts = [];
  let cursor = 0;
  let candidate = idPattern.exec(html);
  for (const { index, end } of iterateOpeningTags(html, /</g)) {
    if (index < cursor) continue;
    let targetEnd = -1;
    while (candidate && candidate.index < end) {
      const candidateEnd = candidate.index + candidate[0].length;
      if (candidate.index > index && candidateEnd <= lastClosing) targetEnd = candidateEnd;
      idPattern.lastIndex = candidate.index + 1;
      candidate = idPattern.exec(html);
    }
    if (targetEnd < 0) continue;
    const closing = html.indexOf(">", targetEnd) + 1;
    parts.push(html.slice(cursor, index), replace(html.slice(index, closing)));
    cursor = closing;
  }
  parts.push(html.slice(cursor));
  return parts.join("");
}
function compileTag(tag, isVideo, generateId) {
  let result = tag;
  let unresolved = null;
  let id = getAttr(result, "id");
  if (!id) {
    id = `${isVideo ? "hf-video" : "hf-audio"}-${generateId()}`;
    result = injectAttr(result, "id", id);
  }
  let startStr = getAttr(result, "data-start");
  if (startStr === null) {
    result = injectAttr(result, "data-start", "0");
    result = injectAttr(result, "data-hf-auto-start", "");
    startStr = "0";
  }
  const start = parseNumeric(startStr);
  const attrReader = tagAttrReader(result);
  const mediaStart = readMediaStart(attrReader);
  const playbackRate = readElementRateSpec(attrReader);
  if (!hasAttr(result, "data-end")) {
    const durationStr = getAttr(result, "data-duration");
    const duration = parseStrictFiniteTimingNumber(durationStr);
    if (duration != null) {
      if (start != null) {
        result = injectAttr(result, "data-end", String(start + duration));
      }
    } else if (id) {
      unresolved = {
        id,
        tagName: isVideo ? "video" : "audio",
        src: getAttr(result, "src") ?? void 0,
        start: start ?? 0,
        mediaStart,
        playbackRate
      };
    }
  }
  if (isVideo && !hasAttr(result, "data-has-audio")) {
    result = injectAttr(result, "data-has-audio", hasAttr(result, "muted") ? "false" : "true");
  }
  return { tag: result, unresolved };
}
function compileTimingAttrs(html) {
  const unresolved = [];
  let nextVideoId = 0;
  let nextAudioId = 0;
  const { masked, restore } = maskInertRegions(html);
  html = masked;
  html = replaceOpeningTags(html, /<video/gi, (match) => {
    const { tag, unresolved: u } = compileTag(match, true, () => nextVideoId++);
    if (u) unresolved.push(u);
    return tag;
  });
  html = replaceOpeningTags(html, /<audio/gi, (match) => {
    const { tag, unresolved: u } = compileTag(match, false, () => nextAudioId++);
    if (u) unresolved.push(u);
    return tag;
  });
  for (const { tag: match } of iterateOpeningTags(html, /<(?:div|section)/gi)) {
    if (!hasAttr(match, "data-start")) continue;
    if (hasAttr(match, "data-end") || hasAttr(match, "data-duration")) continue;
    const id = getAttr(match, "id");
    const compositionSrc = getAttr(match, "data-composition-src");
    if (id) {
      const startStr = getAttr(match, "data-start");
      unresolved.push({
        id,
        tagName: "div",
        start: parseNumeric(startStr) ?? 0,
        mediaStart: 0,
        playbackRate: 1,
        compositionSrc: compositionSrc ?? void 0
      });
    }
  }
  return { html: restore(html), unresolved };
}
function injectDurations(html, resolutions) {
  for (const { id, duration } of resolutions) {
    html = replaceIdTags(html, id, (tag) => {
      let result = tag;
      if (parseStrictFiniteTimingNumber(getAttr(result, "data-duration")) == null) {
        result = setAttr(result, "data-duration", String(duration));
      }
      if (!hasAttr(result, "data-end")) {
        const start = parseNumeric(getAttr(result, "data-start"));
        if (start != null) {
          result = injectAttr(result, "data-end", String(start + duration));
        }
      }
      return result;
    });
  }
  return html;
}
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function extractResolvedMedia(html) {
  const resolved = [];
  html = maskInertRegions(html).masked;
  for (const { tag } of iterateOpeningTags(html, /<(?:video|audio)/gi)) {
    const id = getAttr(tag, "id");
    const durationStr = getAttr(tag, "data-duration");
    if (!id || durationStr === null) continue;
    const duration = parseStrictFiniteTimingNumber(durationStr);
    if (duration == null || duration <= 0) continue;
    const isVideo = /^<video/i.test(tag);
    const startStr = getAttr(tag, "data-start");
    const attrReader = tagAttrReader(tag);
    resolved.push({
      id,
      tagName: isVideo ? "video" : "audio",
      src: getAttr(tag, "src") ?? void 0,
      start: parseNumeric(startStr) ?? 0,
      duration,
      mediaStart: readMediaStart(attrReader),
      playbackRate: readElementRateSpec(attrReader),
      loop: hasAttr(tag, "loop")
    });
  }
  return resolved;
}
function clampDurations(html, clamps) {
  for (const { id, duration } of clamps) {
    html = replaceIdTags(html, id, (tag) => {
      tag = tag.replace(/data-duration=["'][^"']*["']/, `data-duration="${duration}"`);
      const start = parseNumeric(getAttr(tag, "data-start"));
      if (start != null) {
        tag = tag.replace(/data-end=["'][^"']*["']/, `data-end="${start + duration}"`);
      }
      return tag;
    });
  }
  return html;
}

// ../core/src/audibleVideo.ts
var AUDIBLE_VIDEO_QUALIFIER = ':not([muted]):is(:not([data-has-audio]),[data-has-audio="true"])';
var AUDIBLE_MEDIA_SELECTOR = `audio[data-start], video[data-start]${AUDIBLE_VIDEO_QUALIFIER}`;
function isAudibleVideoElement(el) {
  if (el.tagName.toLowerCase() !== "video" || el.hasAttribute("muted")) return false;
  const declared = el.getAttribute("data-has-audio");
  return declared === null || declared === "true";
}
function audibleVideoNeedsWebAudio(fields) {
  return (fields.volume ?? 1) > 1 || Boolean(fields.fxChain || fields.automation || fields.audioGroup);
}

// ../core/src/compiler/mediaRenderIds.ts
var MEDIA_RENDER_ID_ATTR = "data-hf-render-id";
var AUDIO_GROUP_RENDER_ID_ATTR = "data-hf-group-render-id";
var MEDIA_SELECTOR = "video, audio, img[src]";
var AUDIO_GROUP_SELECTOR = "hf-audio-group[id]";
function uniqueRenderId(baseId, taken) {
  if (!taken.has(baseId)) return baseId;
  let suffix = 2;
  while (taken.has(`${baseId}__hf${suffix}`)) suffix += 1;
  return `${baseId}__hf${suffix}`;
}
function assignMediaRenderIds(document2) {
  const taken = /* @__PURE__ */ new Set();
  const pending = [];
  for (const el of document2.querySelectorAll(MEDIA_SELECTOR)) {
    const existing = el.getAttribute(MEDIA_RENDER_ID_ATTR);
    if (existing) {
      taken.add(existing);
      continue;
    }
    pending.push(el);
  }
  for (const el of pending) {
    const baseId = el.getAttribute("id");
    const renderId = uniqueRenderId(baseId || `hf-media-${taken.size}`, taken);
    taken.add(renderId);
    el.setAttribute(MEDIA_RENDER_ID_ATTR, renderId);
  }
  assignAudioGroupRenderIds(document2, taken);
}
function assignAudioGroupRenderIds(document2, taken) {
  const busesById = stampAudioGroupBuses(document2, taken);
  if (busesById.size === 0) return;
  for (const member of document2.querySelectorAll(
    `audio[data-audio-group], video[data-audio-group]${AUDIBLE_VIDEO_QUALIFIER}`
  )) {
    const groupId = member.getAttribute("data-audio-group");
    const buses = groupId ? busesById.get(groupId) : void 0;
    if (!groupId || !buses?.length) continue;
    const renderId = busForMember(member, groupId, buses)?.getAttribute(MEDIA_RENDER_ID_ATTR);
    if (renderId) member.setAttribute(AUDIO_GROUP_RENDER_ID_ATTR, renderId);
  }
}
function stampAudioGroupBuses(document2, taken) {
  const busesById = /* @__PURE__ */ new Map();
  for (const bus of document2.querySelectorAll(
    AUDIO_GROUP_SELECTOR
  )) {
    const id = bus.getAttribute("id");
    if (!id) continue;
    const renderId = bus.getAttribute(MEDIA_RENDER_ID_ATTR) ?? uniqueRenderId(id, taken);
    taken.add(renderId);
    bus.setAttribute(MEDIA_RENDER_ID_ATTR, renderId);
    const existing = busesById.get(id);
    if (existing) existing.push(bus);
    else busesById.set(id, [bus]);
  }
  return busesById;
}
function busForMember(member, groupId, buses) {
  if (buses.length === 1) return buses[0];
  const scope = member.closest?.("[data-composition-id]");
  if (!scope) return buses[0];
  return buses.find(
    (candidate) => candidate.getAttribute("id") === groupId && candidate.closest?.("[data-composition-id]") === scope
  ) ?? buses[0];
}

// ../core/src/runtime/renderFrameSibling.ts
var RENDER_FRAME_ID_PREFIX = "__render_frame_";
var RENDER_FRAME_ID_SUFFIX = "__";
function renderFrameIdForRenderId(renderId) {
  return `${RENDER_FRAME_ID_PREFIX}${renderId}${RENDER_FRAME_ID_SUFFIX}`;
}

// ../core/src/compiler/htmlDocument.ts
var RUNTIME_BOOTSTRAP_ATTR = "data-hyperframes-preview-runtime";
var RUNTIME_FILES = [
  "hyperframe.runtime.iife.js",
  "hyperframes-runtime.modular.inline.js",
  "hyperframe-runtime.modular-runtime.inline.js"
];
var SIMPLE_RUNTIME_FLAG_ASSIGNMENTS = [
  /^window\.__playerReady\s*=\s*(?:true|false)\s*;?$/,
  /^window\.__renderReady\s*=\s*(?:true|false)\s*;?$/
];
function lowerAscii(text) {
  return text.replace(
    /[A-Z][\s\S]{0,65535}/g,
    (chunk) => chunk.replace(/[A-Z]+/g, (letters) => letters.toLowerCase())
  );
}
function stripEmbeddedRuntimeScripts(html) {
  if (!html) return html;
  const loweredHtml = lowerAscii(html);
  let output = "";
  let cursor = 0;
  while (cursor < html.length) {
    const scriptStart = findScriptStart(loweredHtml, cursor);
    if (scriptStart === -1) {
      output += html.slice(cursor);
      break;
    }
    output += html.slice(cursor, scriptStart);
    const startTagEnd = findTagEnd(html, scriptStart + 1);
    if (startTagEnd === -1) {
      output += html.slice(scriptStart);
      break;
    }
    const closeTagEnd = findScriptCloseTagEnd(loweredHtml, startTagEnd + 1);
    const scriptEnd = closeTagEnd === -1 ? html.length : closeTagEnd;
    const block = html.slice(scriptStart, scriptEnd);
    if (!shouldStripRuntimeScriptBlock(block, html.slice(scriptStart, startTagEnd + 1))) {
      output += block;
    }
    cursor = scriptEnd;
  }
  return output;
}
function findScriptStart(loweredHtml, from) {
  let index = loweredHtml.indexOf("<script", from);
  while (index !== -1) {
    const next = loweredHtml[index + "<script".length] ?? "";
    if (isTagBoundary(next)) return index;
    index = loweredHtml.indexOf("<script", index + 1);
  }
  return -1;
}
function findTagEnd(html, from) {
  let quote;
  let state = "tagName";
  for (let index = from; index < html.length; index += 1) {
    const char = html.charAt(index);
    if (quote) {
      quote = char === quote ? void 0 : quote;
      continue;
    }
    if (char === ">") return index;
    if (state === "equals" && (char === '"' || char === "'")) {
      quote = char;
      state = "between";
      continue;
    }
    state = nextTagState(state, char, index === from);
  }
  return -1;
}
function nextTagState(state, char, first) {
  if (isHtmlWhitespace(char)) return stateAfterWhitespace(state);
  if (char === "/" && !first) return stateAfterSlash(state);
  if (char === "=" && state === "name") return "equals";
  if (state === "equals") return "value";
  return state === "between" ? "name" : state;
}
function stateAfterWhitespace(state) {
  return state === "tagName" || state === "value" ? "between" : state;
}
function stateAfterSlash(state) {
  return state === "equals" || state === "value" ? "value" : "between";
}
function findScriptCloseTagEnd(loweredHtml, from) {
  let index = loweredHtml.indexOf("</script", from);
  while (index !== -1) {
    const closeTagEnd = findScriptCloseTagBoundary(loweredHtml, index + "</script".length);
    if (closeTagEnd !== -1) return closeTagEnd;
    index = loweredHtml.indexOf("</script", index + 1);
  }
  return -1;
}
function findScriptCloseTagBoundary(loweredHtml, from) {
  let cursor = from;
  while (cursor < loweredHtml.length && isHtmlWhitespace(loweredHtml[cursor] ?? "")) {
    cursor += 1;
  }
  return loweredHtml[cursor] === ">" ? cursor + 1 : -1;
}
function shouldStripRuntimeScriptBlock(block, startTag) {
  const script = parseHTML(`${startTag}</script>`).document.querySelector("script");
  if (script?.hasAttribute(RUNTIME_BOOTSTRAP_ATTR) || isRuntimeFileUrl(script?.getAttribute("src"))) {
    return true;
  }
  const scriptSource = getScriptSource(block).trim();
  return SIMPLE_RUNTIME_FLAG_ASSIGNMENTS.some((pattern) => pattern.test(scriptSource));
}
function isRuntimeFileUrl(src) {
  const path = lowerAscii(src?.split(/[?#]/, 1)[0] ?? "");
  return RUNTIME_FILES.some((file) => path === file || path.endsWith(`/${file}`));
}
function getScriptSource(block) {
  const startTagEnd = findTagEnd(block, 1);
  if (startTagEnd === -1) return "";
  const loweredBlock = lowerAscii(block);
  const closeTagStart = loweredBlock.lastIndexOf("</script");
  const end = closeTagStart === -1 ? block.length : closeTagStart;
  return block.slice(startTagEnd + 1, end);
}
function isTagBoundary(char) {
  return char === "" || char === ">" || char === "/" || isHtmlWhitespace(char);
}
function isHtmlWhitespace(char) {
  return char === " " || char === "\n" || char === "	" || char === "\r" || char === "\f";
}

// ../core/src/compiler/scriptRuns.ts
var AFTER_FONTS_SCRIPT_TYPE = "text/hf-after-fonts";
var AFTER_FONTS_MODULE_TYPE = `${AFTER_FONTS_SCRIPT_TYPE}+module`;
var AFTER_FONTS_SCRIPTS = `script[type="${AFTER_FONTS_SCRIPT_TYPE}"], script[type="${AFTER_FONTS_MODULE_TYPE}"]`;
var INLINED_FILE_ATTR = "data-hf-inlined-src";
var COMPOSITION_SOURCE_URL = "hyperframes-composition://body";
var DEFERRED_FILE = `[defer][src], [defer][${INLINED_FILE_ATTR}]`;
var UNCONDITIONAL_CSS_KEY = JSON.stringify(["", ""]);

// ../core/src/utils/cssSelector.ts
function queryByAttr(root, attr, value, tag) {
  const selector = tag ? `${tag}[${attr}]` : `[${attr}]`;
  for (const el of root.querySelectorAll(selector)) {
    if (el.getAttribute(attr) === value) return el;
  }
  return null;
}

// ../core/src/media/gif.ts
var BROWSER_MIN_DELAY_CENTISECONDS = 10;
function normalizeDelayCentiseconds(delay) {
  if (delay <= 1) return BROWSER_MIN_DELAY_CENTISECONDS;
  return Math.max(0, delay);
}
function readAscii(bytes, start, length) {
  if (start + length > bytes.length) return "";
  let value = "";
  for (let i = start; i < start + length; i++) {
    value += String.fromCharCode(bytes[i] ?? 0);
  }
  return value;
}
function readU16LE(bytes, offset2) {
  if (offset2 + 1 >= bytes.length) return null;
  return (bytes[offset2] ?? 0) | (bytes[offset2 + 1] ?? 0) << 8;
}
function colorTableByteLength(packed) {
  return 3 * 2 ** ((packed & 7) + 1);
}
function skipSubBlocks(bytes, offset2) {
  let pos = offset2;
  while (pos < bytes.length) {
    const size = bytes[pos];
    if (size === void 0) return null;
    pos += 1;
    if (size === 0) return pos;
    pos += size;
  }
  return null;
}
function parseApplicationExtension(bytes, offset2) {
  const blockSize = bytes[offset2];
  if (blockSize === void 0 || offset2 + 1 + blockSize > bytes.length) return null;
  const appId = readAscii(bytes, offset2 + 1, blockSize);
  let pos = offset2 + 1 + blockSize;
  let loopCount = null;
  while (pos < bytes.length) {
    const size = bytes[pos];
    if (size === void 0) return null;
    pos += 1;
    if (size === 0) return { nextOffset: pos, loopCount };
    if (pos + size > bytes.length) return null;
    if ((appId === "NETSCAPE2.0" || appId === "ANIMEXTS1.0") && size >= 3 && bytes[pos] === 1) {
      loopCount = readU16LE(bytes, pos + 1);
    }
    pos += size;
  }
  return null;
}
var PLAIN_TEXT_LABEL = 1;
function parseAnimatedGifMetadata(bytes, onFrame) {
  if (bytes.length < 13) return null;
  const signature = readAscii(bytes, 0, 6);
  if (signature !== "GIF87a" && signature !== "GIF89a") return null;
  const width = readU16LE(bytes, 6);
  const height = readU16LE(bytes, 8);
  if (width == null || height == null || width <= 0 || height <= 0) return null;
  const packed = bytes[10] ?? 0;
  let pos = 13;
  if ((packed & 128) !== 0) {
    pos += colorTableByteLength(packed);
  }
  let frameCount = 0;
  let controlPackedOffset = null;
  const delaysCentiseconds = [];
  let loopCount = null;
  while (pos < bytes.length) {
    const introducer = bytes[pos];
    if (introducer === void 0) return null;
    pos += 1;
    if (introducer === 59) break;
    if (introducer === 33) {
      const label = bytes[pos];
      if (label === void 0) return null;
      pos += 1;
      if (label === 249) {
        const blockSize = bytes[pos];
        if (blockSize !== 4 || pos + 6 > bytes.length) return null;
        const delay = readU16LE(bytes, pos + 2);
        if (delay == null) return null;
        delaysCentiseconds.push(normalizeDelayCentiseconds(delay));
        controlPackedOffset = pos + 1;
        pos += 1 + blockSize;
        if (bytes[pos] !== 0) return null;
        pos += 1;
        continue;
      }
      if (label === 255) {
        const parsed = parseApplicationExtension(bytes, pos);
        if (!parsed) return null;
        if (parsed.loopCount != null) loopCount = parsed.loopCount;
        pos = parsed.nextOffset;
        continue;
      }
      if (label === PLAIN_TEXT_LABEL) controlPackedOffset = null;
      const next = skipSubBlocks(bytes, pos);
      if (next == null) return null;
      pos = next;
      continue;
    }
    if (introducer === 44) {
      if (pos + 9 > bytes.length) return null;
      const imagePacked = bytes[pos + 8] ?? 0;
      const localColorTable = (imagePacked & 128) !== 0;
      onFrame?.({ controlPackedOffset, localColorTable });
      controlPackedOffset = null;
      pos += 9;
      if (localColorTable) {
        pos += colorTableByteLength(imagePacked);
      }
      if (pos >= bytes.length) return null;
      pos += 1;
      const next = skipSubBlocks(bytes, pos);
      if (next == null) return null;
      pos = next;
      frameCount += 1;
      continue;
    }
    return null;
  }
  const durationSeconds = delaysCentiseconds.reduce((total, delay) => total + delay, 0) / 100;
  return {
    width,
    height,
    frameCount,
    delaysCentiseconds,
    durationSeconds,
    loopCount,
    animated: frameCount > 1
  };
}
var DISPOSAL_BITS = 28;
var LEAVE_IN_PLACE = 1 << 2;
var DISPOSE_TO_BACKGROUND = 2 << 2;
var HAS_TRANSPARENT_INDEX = 1;
var TRANSPARENT_INDEX_AFTER_PACKED = 3;
function frameLayouts(bytes) {
  const frames = [];
  return parseAnimatedGifMetadata(bytes, (frame) => frames.push(frame)) === null ? null : frames;
}
function disposalOf(bytes, frame) {
  return frame.controlPackedOffset === null ? null : (bytes[frame.controlPackedOffset] ?? 0) & DISPOSAL_BITS;
}
function gifClearsAfterLeavingFrameInPlace(bytes) {
  const frames = frameLayouts(bytes);
  if (frames === null) return null;
  let sawOpaque = false;
  for (const frame of frames) {
    const disposal = disposalOf(bytes, frame);
    if (disposal === LEAVE_IN_PLACE) sawOpaque = true;
    else if (disposal === DISPOSE_TO_BACKGROUND && sawOpaque) return true;
  }
  return false;
}
function clearGifFramesBeforeNext(bytes) {
  const frames = frameLayouts(bytes);
  if (frames === null) return false;
  const controls = frames.flatMap(
    (f) => f.controlPackedOffset === null ? [] : [f.controlPackedOffset]
  );
  const shared = frames.flatMap(
    (f) => f.controlPackedOffset === null || f.localColorTable ? [] : [f.controlPackedOffset]
  );
  const hasIndex = (at) => ((bytes[at] ?? 0) & HAS_TRANSPARENT_INDEX) !== 0;
  const source = shared.find(hasIndex);
  for (const at of controls) {
    bytes[at] = (bytes[at] ?? 0) & ~DISPOSAL_BITS | DISPOSE_TO_BACKGROUND;
  }
  if (source === void 0) return true;
  for (const at of shared) {
    if (hasIndex(at)) continue;
    bytes[at] = (bytes[at] ?? 0) | HAS_TRANSPARENT_INDEX;
    bytes[at + TRANSPARENT_INDEX_AFTER_PACKED] = bytes[source + TRANSPARENT_INDEX_AFTER_PACKED] ?? 0;
  }
  return true;
}

// ../core/src/colorLuts.ts
var CubeLutParseError = class extends Error {
  lineNumber;
  constructor(message, lineNumber = null) {
    super(lineNumber == null ? message : `${message} at line ${lineNumber}`);
    this.name = "CubeLutParseError";
    this.lineNumber = lineNumber;
  }
};
var DEFAULT_DOMAIN_MIN = [0, 0, 0];
var DEFAULT_DOMAIN_MAX = [1, 1, 1];
var DEFAULT_MAX_CUBE_LUT_SIZE = 64;
function stripComment(line) {
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') inQuote = !inQuote;
    if (char === "#" && !inQuote) return line.slice(0, i);
  }
  return line;
}
function parseFiniteNumber(value, lineNumber) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new CubeLutParseError(`Invalid number "${value}"`, lineNumber);
  }
  return parsed;
}
function parseVec3(parts, keyword, lineNumber) {
  if (parts.length !== 3) {
    throw new CubeLutParseError(`${keyword} expects three numbers`, lineNumber);
  }
  return [
    parseFiniteNumber(parts[0], lineNumber),
    parseFiniteNumber(parts[1], lineNumber),
    parseFiniteNumber(parts[2], lineNumber)
  ];
}
function parseSize(value, keyword, lineNumber) {
  if (!value) throw new CubeLutParseError(`${keyword} expects a size`, lineNumber);
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 2) {
    throw new CubeLutParseError(`${keyword} must be an integer greater than 1`, lineNumber);
  }
  return parsed;
}
function validateDomain(domainMin, domainMax) {
  if (domainMax[0] <= domainMin[0] || domainMax[1] <= domainMin[1] || domainMax[2] <= domainMin[2]) {
    throw new CubeLutParseError("DOMAIN_MAX values must be greater than DOMAIN_MIN values");
  }
}
function parseTitle(line) {
  const quoted = /^TITLE\s+"([^"]*)"\s*$/i.exec(line);
  if (quoted) return quoted[1] ?? null;
  const bare = /^TITLE\s+(.+)\s*$/i.exec(line);
  return bare ? (bare[1] ?? "").trim() || null : null;
}
function isNumericDataLine(token) {
  return /^[+-]?(?:\d|\.\d)/.test(token);
}
function parseCubeLut(input, options = {}) {
  const maxSize = options.maxSize ?? DEFAULT_MAX_CUBE_LUT_SIZE;
  let title = null;
  let domainMin = DEFAULT_DOMAIN_MIN;
  let domainMax = DEFAULT_DOMAIN_MAX;
  let lut1dSize = null;
  let lut3dSize = null;
  const rows = [];
  const lines = input.replace(/^\uFEFF/, "").split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const lineNumber = i + 1;
    const line = stripComment(lines[i] ?? "").trim();
    if (!line) continue;
    const parts = line.split(/\s+/);
    const keyword = (parts[0] ?? "").toUpperCase();
    const rest = parts.slice(1);
    if (keyword === "TITLE") {
      title = parseTitle(line);
      continue;
    }
    if (keyword === "DOMAIN_MIN") {
      domainMin = parseVec3(rest, keyword, lineNumber);
      continue;
    }
    if (keyword === "DOMAIN_MAX") {
      domainMax = parseVec3(rest, keyword, lineNumber);
      continue;
    }
    if (keyword === "LUT_3D_INPUT_RANGE") {
      if (rest.length !== 2) {
        throw new CubeLutParseError(`${keyword} expects two numbers`, lineNumber);
      }
      const min = parseFiniteNumber(rest[0], lineNumber);
      const max = parseFiniteNumber(rest[1], lineNumber);
      if (max <= min) {
        throw new CubeLutParseError("LUT_3D_INPUT_RANGE max must exceed min", lineNumber);
      }
      domainMin = [min, min, min];
      domainMax = [max, max, max];
      continue;
    }
    if (keyword === "LUT_1D_SIZE") {
      lut1dSize = parseSize(rest[0], keyword, lineNumber);
      continue;
    }
    if (keyword === "LUT_3D_SIZE") {
      lut3dSize = parseSize(rest[0], keyword, lineNumber);
      if (lut3dSize > maxSize) {
        throw new CubeLutParseError(`LUT_3D_SIZE ${lut3dSize} exceeds max ${maxSize}`, lineNumber);
      }
      continue;
    }
    if (!isNumericDataLine(keyword)) {
      if (keyword.startsWith("LUT_")) {
        throw new CubeLutParseError(`Unsupported cube keyword ${keyword}`, lineNumber);
      }
      continue;
    }
    if (!lut3dSize) {
      if (lut1dSize) {
        throw new CubeLutParseError("1D cube LUTs are not supported yet", lineNumber);
      }
      throw new CubeLutParseError("LUT data appears before LUT_3D_SIZE", lineNumber);
    }
    if (parts.length !== 3) {
      throw new CubeLutParseError("LUT data rows must contain three numbers", lineNumber);
    }
    rows.push(
      parseFiniteNumber(parts[0], lineNumber),
      parseFiniteNumber(parts[1], lineNumber),
      parseFiniteNumber(parts[2], lineNumber)
    );
  }
  if (lut1dSize && lut3dSize) {
    throw new CubeLutParseError("Mixed 1D and 3D cube LUTs are not supported yet");
  }
  if (!lut3dSize) {
    if (lut1dSize) throw new CubeLutParseError("1D cube LUTs are not supported yet");
    throw new CubeLutParseError("Missing LUT_3D_SIZE");
  }
  validateDomain(domainMin, domainMax);
  const expectedRows = lut3dSize * lut3dSize * lut3dSize;
  if (rows.length !== expectedRows * 3) {
    throw new CubeLutParseError(
      `Expected ${expectedRows} LUT rows for size ${lut3dSize}, found ${rows.length / 3}`
    );
  }
  return {
    title,
    size: lut3dSize,
    domainMin,
    domainMax,
    data: new Float32Array(rows)
  };
}

// ../core/src/colorGrading.ts
var HF_COLOR_GRADING_ATTR = "data-color-grading";
var HF_COLOR_GRADING_CANVAS_ID_PREFIX = "__hf_color_grading_";
var HF_COLOR_GRADING_COLOR_SPACE = COLOR_GRADING_COLOR_SPACE;
var ADJUST_ZERO = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  temperature: 0,
  tint: 0,
  vibrance: 0,
  saturation: 0
};
var DETAIL_DEFAULTS = {
  vignette: 0,
  vignetteMidpoint: 0.5,
  vignetteRoundness: 0,
  vignetteFeather: 0.65,
  grain: 0,
  grainSize: 0.25,
  grainRoughness: 0.5
};
var EFFECT_DEFAULTS = {
  blur: 0,
  pixelate: 0,
  chromaBleed: 0,
  tapeDamage: 0,
  tapeTracking: 0,
  tapeNoise: 1,
  tapeSpeed: 0.5,
  filmArtifacts: 0,
  halftone: 0,
  halftoneSize: 0,
  twoInkPrint: 0,
  twoInkPrintSize: 0,
  ascii: 0,
  asciiSize: 5 / 76,
  asciiInvert: 0,
  asciiStyle: 0,
  asciiColor: 1,
  asciiRotation: 0,
  dither: 0,
  ditherSize: 0,
  bloom: 0,
  bloomRadius: 8,
  monoScreen: 0,
  monoScreenSize: 0,
  monoScreenAngle: 0,
  monoScreenSpread: 0,
  monoScreenShape: 0,
  monoScreenInvert: 0,
  scanlines: 0,
  scanlineCount: 0,
  scanlineSoftness: 0,
  chromaticAberration: 0,
  chromaticAngle: 0,
  crtCurvature: 0,
  digitalGlitch: 0,
  digitalGlitchColorSplit: 0,
  digitalGlitchLineTear: 0,
  digitalGlitchPixelate: 0,
  digitalGlitchBlockAmount: 0,
  digitalGlitchBlockDisplacement: 0,
  digitalGlitchBlockOpacity: 0,
  digitalGlitchSpeed: 0,
  engraving: 0,
  engravingSpacing: 7 / 17,
  engravingMinThickness: 0.2,
  engravingMaxThickness: 3.2 / 7,
  engravingAngle: 0.25,
  engravingContrast: 7 / 15,
  engravingSharpness: 0.59,
  engravingWave: 0.2,
  engravingWaveFrequency: 2 / 9,
  crosshatch: 0,
  crosshatchSpacing: 7 / 25,
  crosshatchThickness: 0.25,
  crosshatchAngle: 0.25,
  crosshatchContrast: 1 / 3,
  crosshatchEdges: 0.5,
  crosshatchLineWeight: 0,
  crosshatchWave: 0.33,
  crosshatchWaveFrequency: 2 / 9,
  kuwahara: 0,
  kuwaharaRadius: 1 / 7,
  kuwaharaSharpness: 5 / 16,
  kuwaharaSaturation: 0.5
};
var HF_COLOR_GRADING_TOP_LEVEL_KEYS = COLOR_GRADING_TOP_LEVEL_KEYS;
var HF_COLOR_GRADING_LUT_KEYS = COLOR_GRADING_LUT_KEYS;
var HF_COLOR_GRADING_PALETTES = [
  { id: "noir", label: "Noir", group: "Classic", colors: ["#000000", "#ffffff"] },
  {
    id: "ink-paper",
    label: "Ink & Paper",
    group: "Classic",
    colors: ["#1a1a2e", "#f5f5dc"]
  },
  {
    id: "terminal",
    label: "Terminal",
    group: "Classic",
    colors: ["#001100", "#00ff00"]
  },
  {
    id: "amber-glow",
    label: "Amber Glow",
    group: "Classic",
    colors: ["#1a0f00", "#ffcc00"]
  },
  {
    id: "handheld-green",
    label: "Handheld Green",
    group: "Classic",
    colors: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"]
  },
  {
    id: "golden-hour",
    label: "Golden Hour",
    group: "Mood",
    colors: ["#1a1205", "#4a3510", "#8b6914", "#d4a017", "#fff8dc"]
  },
  {
    id: "deep-sea",
    label: "Deep Sea",
    group: "Mood",
    colors: ["#0a1628", "#1a3a5c", "#2d6187", "#5ba4c9", "#a8dce8"]
  },
  {
    id: "arctic-night",
    label: "Arctic Night",
    group: "Mood",
    colors: ["#0a0a14", "#1a2a4a", "#3a5a8a", "#6a9aca", "#cae8ff"]
  },
  {
    id: "synthwave",
    label: "Synthwave",
    group: "Mood",
    colors: ["#120458", "#7b2cbf", "#e040fb", "#ff6ec7", "#fff59d"]
  },
  {
    id: "vaporwave",
    label: "Vaporwave",
    group: "Mood",
    colors: ["#1a0a2e", "#3d1a5c", "#ff71ce", "#01cdfe", "#fffb96"]
  },
  {
    id: "forest",
    label: "Forest",
    group: "Mood",
    colors: ["#1a2e1a", "#2d4a2d", "#4a7c4a", "#7ab37a", "#c8e6c8"]
  },
  {
    id: "sepia",
    label: "Sepia",
    group: "Mono",
    colors: ["#1a1610", "#3d3020", "#6b5a40", "#a89070", "#e8dcc8"]
  },
  {
    id: "blueprint",
    label: "Blueprint",
    group: "Mono",
    colors: ["#001830", "#003060", "#0050a0", "#0080e0", "#e0f0ff"]
  },
  {
    id: "warm-print",
    label: "Warm Print",
    group: "HyperFrames",
    colors: ["#17121a", "#824c50", "#e09873", "#f7ddb1"]
  },
  {
    id: "electric-ink",
    label: "Electric Ink",
    group: "HyperFrames",
    colors: ["#080717", "#3c185f", "#7e2278", "#d9339f", "#ff6b66", "#aafae0"]
  }
];
var HF_COLOR_GRADING_ADJUST_KEYS = COLOR_GRADING_ADJUST_KEYS;
var HF_COLOR_GRADING_WHEEL_KEYS = COLOR_GRADING_WHEEL_KEYS;
var HF_COLOR_GRADING_CURVE_KEYS = COLOR_GRADING_CURVE_KEYS;
var HF_COLOR_GRADING_HUE_CURVE_KEYS = COLOR_GRADING_HUE_CURVE_KEYS;
var HF_COLOR_GRADING_DETAIL_KEYS = COLOR_GRADING_DETAIL_KEYS;
var HF_COLOR_GRADING_EFFECT_KEYS = COLOR_GRADING_EFFECT_KEYS;
var VINTAGE_WASH_ADJUST = {
  exposure: 0.03,
  contrast: -0.12,
  highlights: -0.1,
  shadows: 0.16,
  whites: -0.04,
  blacks: 0.08,
  temperature: 0.13,
  vibrance: -0.08,
  saturation: -0.08
};
var VINTAGE_WASH_DETAILS = { vignette: 0.18 };
function preset(id, label, adjust = {}, details = {}, effects = {}, intensity = 1) {
  return {
    id,
    label,
    intensity,
    adjust: { ...ADJUST_ZERO, ...adjust },
    details: { ...DETAIL_DEFAULTS, ...details },
    effects: { ...EFFECT_DEFAULTS, ...effects }
  };
}
var HF_COLOR_GRADING_PRESETS = [
  preset("neutral", "Neutral"),
  preset("warm-daylight", "Warm Daylight", {
    exposure: 0.06,
    contrast: 0.07,
    highlights: -0.06,
    shadows: 0.08,
    temperature: 0.18,
    saturation: 0.08
  }),
  preset("clean-studio", "Clean Studio", {
    contrast: 0.08,
    highlights: -0.08,
    shadows: 0.06,
    temperature: -0.08,
    tint: 0.03,
    saturation: 0.04
  }),
  preset("skin-soft", "Skin Soft", {
    exposure: 0.04,
    contrast: -0.03,
    highlights: -0.12,
    shadows: 0.12,
    temperature: 0.08,
    tint: 0.02,
    saturation: 0.04
  }),
  preset("food-pop", "Food Pop", {
    exposure: 0.06,
    contrast: 0.1,
    shadows: 0.06,
    temperature: 0.14,
    vibrance: 0.1,
    saturation: 0.18
  }),
  preset(
    "night-lift",
    "Night Lift",
    {
      exposure: 0.08,
      contrast: 0.08,
      highlights: -0.18,
      shadows: 0.2,
      blacks: -0.08,
      saturation: 0.04
    },
    {
      vignette: 0.12
    }
  ),
  preset(
    "muted-editorial",
    "Muted Editorial",
    {
      exposure: -0.02,
      contrast: 0.08,
      highlights: -0.08,
      shadows: 0.06,
      blacks: -0.05,
      temperature: -0.03,
      saturation: -0.12
    },
    {
      vignette: 0.1
    }
  ),
  preset("vintage-wash", "Vintage Wash", VINTAGE_WASH_ADJUST, VINTAGE_WASH_DETAILS),
  preset("mono-clean", "Mono Clean", {
    contrast: 0.12,
    highlights: -0.04,
    shadows: 0.04,
    blacks: -0.08,
    saturation: -1
  }),
  preset(
    "mono-fade",
    "Mono Fade",
    {
      contrast: -0.04,
      highlights: -0.06,
      shadows: 0.1,
      blacks: 0.12,
      saturation: -1
    },
    {
      vignette: 0.08
    }
  ),
  preset("soft-boost", "Soft Boost", {
    exposure: 0.06,
    contrast: -0.04,
    highlights: -0.14,
    shadows: 0.16,
    vibrance: 0.08,
    saturation: 0.1
  }),
  preset("bright-pop", "Bright Pop", {
    exposure: 0.12,
    contrast: 0.12,
    whites: 0.08,
    blacks: -0.04,
    vibrance: 0.08,
    saturation: 0.14
  }),
  preset("deep-contrast", "Deep Contrast", {
    exposure: -0.03,
    contrast: 0.2,
    highlights: -0.08,
    shadows: -0.08,
    blacks: -0.12,
    saturation: 0.06
  }),
  preset(
    "creator-camcorder",
    "Creator Camcorder",
    {
      contrast: 0.08,
      highlights: -0.05,
      shadows: 0.02,
      whites: 0.03,
      blacks: -0.04,
      temperature: -0.03,
      tint: -0.015,
      vibrance: -0.03,
      saturation: -0.06
    },
    { vignette: 0.06, grain: 0.08, grainSize: 0.18, grainRoughness: 0.58 },
    { chromaBleed: 0.55 },
    0.72
  ),
  preset(
    "vhs-playback",
    "VHS Playback",
    { contrast: -0.04, saturation: -0.08 },
    { grain: 0.16, grainSize: 0.12, grainRoughness: 0.72 },
    {
      tapeDamage: 0.82,
      tapeTracking: 0.85,
      tapeNoise: 0.3,
      tapeSpeed: 0.5,
      chromaBleed: 0.5,
      chromaticAberration: 0.18,
      scanlines: 0.35,
      scanlineCount: 0.17,
      scanlineSoftness: 1,
      digitalGlitch: 0.32,
      digitalGlitchLineTear: 0.08,
      digitalGlitchSpeed: 0.5
    }
  ),
  preset(
    "home-movie-8mm",
    "8mm Home Movie",
    VINTAGE_WASH_ADJUST,
    {
      ...VINTAGE_WASH_DETAILS,
      vignette: 0.28,
      vignetteMidpoint: 0.54,
      vignetteFeather: 0.72,
      grain: 0.34,
      grainSize: 0.18,
      grainRoughness: 0.72
    },
    { filmArtifacts: 0.62 },
    0.72
  ),
  preset(
    "editorial-halftone",
    "Editorial Halftone",
    { contrast: 0.04, saturation: 0.04 },
    {},
    { halftone: 0.94, halftoneSize: 0.36 }
  ),
  preset(
    "two-ink-print",
    "Two-Ink Print",
    { contrast: 0.08, highlights: -0.06, shadows: 0.04 },
    {},
    { twoInkPrint: 1, twoInkPrintSize: 0.42 }
  )
];
var PRESETS_BY_ID = new Map(
  HF_COLOR_GRADING_PRESETS.map((preset2) => [preset2.id, preset2])
);
var VARIABLE_REF_RE = /^\$(?:\{([A-Za-z0-9_.:-]+)\}|([A-Za-z0-9_.:-]+))$/;
var ADJUST_LIMITS = {
  exposure: { min: -2, max: 2 },
  contrast: { min: -1, max: 1 },
  highlights: { min: -1, max: 1 },
  shadows: { min: -1, max: 1 },
  whites: { min: -1, max: 1 },
  blacks: { min: -1, max: 1 },
  temperature: { min: -1, max: 1 },
  tint: { min: -1, max: 1 },
  vibrance: { min: -1, max: 1 },
  saturation: { min: -1, max: 1 }
};
var TONAL_WHEEL_DEFAULT = {
  hue: 0,
  amount: 0,
  level: 0
};
var WHEEL_LIMITS = {
  amount: COLOR_GRADING_ADVANCED_LIMITS.unit,
  level: COLOR_GRADING_ADVANCED_LIMITS.signedUnit
};
var RGB_CURVE_IDENTITY = [
  [0, 0],
  [1, 1]
];
var HUE_CURVE_IDENTITY = [];
var HUE_CURVE_LIMITS = {
  hueVsHue: COLOR_GRADING_ADVANCED_LIMITS.secondaryHueShift,
  hueVsSaturation: COLOR_GRADING_ADVANCED_LIMITS.signedUnit,
  hueVsLuma: COLOR_GRADING_ADVANCED_LIMITS.signedUnit
};
var SECONDARY_HUE_DEFAULT = {
  center: 0,
  range: 180,
  softness: 0
};
var SECONDARY_SOFT_RANGE_DEFAULT = {
  min: 0,
  max: 1,
  softness: 0.05
};
var DETAIL_LIMITS = {
  vignette: COLOR_GRADING_ADVANCED_LIMITS.unit,
  vignetteMidpoint: COLOR_GRADING_ADVANCED_LIMITS.unit,
  vignetteRoundness: COLOR_GRADING_ADVANCED_LIMITS.signedUnit,
  vignetteFeather: COLOR_GRADING_ADVANCED_LIMITS.unit,
  grain: COLOR_GRADING_ADVANCED_LIMITS.unit,
  grainSize: COLOR_GRADING_ADVANCED_LIMITS.unit,
  grainRoughness: COLOR_GRADING_ADVANCED_LIMITS.unit
};
var UNIT_LIMIT = COLOR_GRADING_ADVANCED_LIMITS.unit;
var EFFECT_LIMIT_OVERRIDES = COLOR_GRADING_ADVANCED_LIMITS.effects;
var HF_COLOR_GRADING_ACTIVE_EFFECT_KEYS = [
  "blur",
  "pixelate",
  "chromaBleed",
  "tapeDamage",
  "filmArtifacts",
  "halftone",
  "twoInkPrint",
  "ascii",
  "dither",
  "bloom",
  "monoScreen",
  "scanlines",
  "chromaticAberration",
  "crtCurvature",
  "digitalGlitch",
  "engraving",
  "crosshatch",
  "kuwahara"
];
var EFFECT_FAMILIES = [
  {
    id: "essentials",
    label: "Essentials",
    description: "Common optical, focus, and privacy-oriented primitives."
  },
  {
    id: "retro-glitch",
    label: "Retro & Glitch",
    description: "Tape, film, CRT, channel separation, and digital disruption."
  },
  {
    id: "print",
    label: "Print",
    description: "Halftone, limited-ink, dither, and screen-print rendering."
  },
  {
    id: "art",
    label: "Art",
    description: "ASCII, engraved, crosshatched, and painterly rendering."
  }
];
var EFFECT_METADATA = {
  blur: {
    family: "essentials",
    label: "Blur",
    description: "Defocus or soften a full media layer."
  },
  pixelate: {
    family: "essentials",
    label: "Pixelate",
    description: "Turn a media layer into a block mosaic."
  },
  bloom: {
    family: "essentials",
    label: "Bloom",
    description: "Add thresholded glow around bright image regions."
  },
  chromaBleed: {
    family: "retro-glitch",
    label: "Chroma Softening",
    description: "Smear color like low-bandwidth video."
  },
  tapeDamage: {
    family: "retro-glitch",
    label: "Tape Damage",
    description: "Add moving tracking errors and tape noise."
  },
  filmArtifacts: {
    family: "retro-glitch",
    label: "Film Artifacts",
    description: "Add deterministic dust and film wear."
  },
  scanlines: {
    family: "retro-glitch",
    label: "Scanlines",
    description: "Overlay configurable horizontal display lines."
  },
  crtCurvature: {
    family: "retro-glitch",
    label: "CRT Curvature",
    description: "Warp media toward curved CRT geometry."
  },
  chromaticAberration: {
    family: "retro-glitch",
    label: "Channel Separation",
    description: "Offset color channels by angle."
  },
  digitalGlitch: {
    family: "retro-glitch",
    label: "Digital Glitch",
    description: "Compose tears, blocks, and color splits."
  },
  halftone: {
    family: "print",
    label: "Halftone",
    description: "Render source color through a print-dot raster."
  },
  twoInkPrint: {
    family: "print",
    label: "Two-Ink Print",
    description: "Reduce media to a two-ink print treatment."
  },
  dither: {
    family: "print",
    label: "Ordered Dither",
    description: "Quantize media into an ordered limited palette."
  },
  monoScreen: {
    family: "print",
    label: "Mono Screen",
    description: "Build monochrome dot, shape, or line artwork."
  },
  ascii: {
    family: "art",
    label: "ASCII",
    description: "Render media as configurable procedural glyph cells."
  },
  engraving: {
    family: "art",
    label: "Engraving",
    description: "Translate luminance into directional engraved lines."
  },
  crosshatch: {
    family: "art",
    label: "Crosshatch",
    description: "Translate media into layered hand-hatched lines."
  },
  kuwahara: {
    family: "art",
    label: "Kuwahara Paint",
    description: "Apply edge-preserving painterly smoothing."
  }
};
var HF_COLOR_GRADING_EFFECT_PRESETS = HF_COLOR_GRADING_PRESETS.filter(
  (preset2) => HF_COLOR_GRADING_ACTIVE_EFFECT_KEYS.some((key) => preset2.effects[key] > 1e-4)
);
var HF_COLOR_GRADING_GRADE_PRESETS = HF_COLOR_GRADING_PRESETS.filter(
  (preset2) => !HF_COLOR_GRADING_EFFECT_PRESETS.includes(preset2)
);
var HF_COLOR_GRADING_EFFECT_APPLY_DEFAULTS = {
  blur: { blur: 0.45 },
  pixelate: { pixelate: 0.55 },
  bloom: { bloom: 0.55, bloomRadius: 8 },
  chromaBleed: { chromaBleed: 0.55 },
  tapeDamage: {
    tapeDamage: 0.65,
    tapeTracking: 0.55,
    tapeNoise: 0.25,
    tapeSpeed: 0.5
  },
  filmArtifacts: { filmArtifacts: 0.55 },
  scanlines: { scanlines: 0.35, scanlineCount: 0.17, scanlineSoftness: 1 },
  chromaticAberration: { chromaticAberration: 0.15, chromaticAngle: 0 },
  crtCurvature: { crtCurvature: 0.2 },
  digitalGlitch: {
    digitalGlitch: 0.55,
    digitalGlitchColorSplit: 0.25,
    digitalGlitchLineTear: 0.25,
    digitalGlitchPixelate: 0.15,
    digitalGlitchBlockAmount: 0.5,
    digitalGlitchBlockDisplacement: 0.25,
    digitalGlitchBlockOpacity: 0,
    digitalGlitchSpeed: 0.5
  },
  halftone: { halftone: 0.94, halftoneSize: 0.36 },
  twoInkPrint: { twoInkPrint: 1, twoInkPrintSize: 0.42 },
  ascii: {
    ascii: 1,
    asciiSize: 5 / 76,
    asciiInvert: 0,
    asciiStyle: 0,
    asciiColor: 1,
    asciiRotation: 0
  },
  dither: { dither: 1, ditherSize: 0.5 },
  monoScreen: {
    monoScreen: 1,
    monoScreenSize: 0.35,
    monoScreenAngle: 0.25,
    monoScreenSpread: 0.3,
    monoScreenShape: 0,
    monoScreenInvert: 0
  },
  engraving: {
    engraving: 1,
    engravingSpacing: 7 / 17,
    engravingMinThickness: 0.2,
    engravingMaxThickness: 3.2 / 7,
    engravingAngle: 0.25,
    engravingContrast: 7 / 15,
    engravingSharpness: 0.59,
    engravingWave: 0.2,
    engravingWaveFrequency: 2 / 9
  },
  crosshatch: {
    crosshatch: 1,
    crosshatchSpacing: 7 / 25,
    crosshatchThickness: 0.25,
    crosshatchAngle: 0.25,
    crosshatchContrast: 1 / 3,
    crosshatchEdges: 0.5,
    crosshatchLineWeight: 0,
    crosshatchWave: 0.33,
    crosshatchWaveFrequency: 2 / 9
  },
  kuwahara: {
    kuwahara: 1,
    kuwaharaRadius: 1 / 7,
    kuwaharaSharpness: 5 / 16,
    kuwaharaSaturation: 0.5
  }
};
var HF_COLOR_GRADING_ANIMATABLE_PROPERTIES = [
  { path: "intensity", name: "--hf-color-grading-intensity", min: 0, max: 1 },
  { path: "lut.intensity", name: "--hf-color-grading-lut-intensity", min: 0, max: 1 },
  { path: "adjust.exposure", name: "--hf-color-grading-exposure", min: -2, max: 2 },
  { path: "effects.blur", name: "--hf-color-grading-blur", min: 0, max: 1 },
  { path: "effects.bloom", name: "--hf-color-grading-bloom", min: 0, max: 3 },
  { path: "effects.kuwahara", name: "--hf-color-grading-kuwahara", min: 0, max: 1 },
  { path: "effects.pixelate", name: "--hf-color-grading-pixelate", min: 0, max: 1 },
  { path: "effects.ascii", name: "--hf-color-grading-ascii", min: 0, max: 1 },
  { path: "effects.dither", name: "--hf-color-grading-dither", min: 0, max: 1 }
];
function effectLimit(key) {
  return EFFECT_LIMIT_OVERRIDES[key] ?? UNIT_LIMIT;
}
var PALETTE_EFFECT_KEYS = /* @__PURE__ */ new Set([
  "ascii",
  "dither",
  "monoScreen",
  "engraving",
  "crosshatch"
]);
var MULTIPASS_EFFECT_KEYS = /* @__PURE__ */ new Set(["blur", "bloom", "kuwahara"]);
function getHfColorGradingCapabilities() {
  return {
    version: COLOR_GRADING_CONTRACT_VERSION,
    targetTags: ["img", "video"],
    colorSpace: HF_COLOR_GRADING_COLOR_SPACE,
    intensity: { identity: 1, min: 0, max: 1 },
    palette: { minColors: 2, maxColors: 6, colorFormat: "#rrggbb" },
    lut: {
      format: "3d-cube",
      maxCubeSize: DEFAULT_MAX_CUBE_LUT_SIZE,
      intensity: { ...UNIT_LIMIT }
    },
    presets: [...HF_COLOR_GRADING_GRADE_PRESETS, ...HF_COLOR_GRADING_EFFECT_PRESETS].map(
      (preset2) => ({
        id: preset2.id,
        label: preset2.label,
        intensity: preset2.intensity
      })
    ),
    adjustments: HF_COLOR_GRADING_ADJUST_KEYS.map((key) => ({
      key,
      identity: ADJUST_ZERO[key],
      ...ADJUST_LIMITS[key]
    })),
    wheels: {
      zones: HF_COLOR_GRADING_WHEEL_KEYS,
      controls: {
        hue: {
          identity: 0,
          unit: "degrees",
          wrap: true,
          min: COLOR_GRADING_ADVANCED_LIMITS.hueDegrees.min,
          maxExclusive: COLOR_GRADING_ADVANCED_LIMITS.hueDegrees.max
        },
        amount: { identity: 0, ...WHEEL_LIMITS.amount },
        level: { identity: 0, ...WHEEL_LIMITS.level }
      }
    },
    curves: {
      channels: HF_COLOR_GRADING_CURVE_KEYS,
      input: { min: 0, max: 1 },
      output: { min: 0, max: 1 },
      minPoints: 2,
      maxPoints: COLOR_GRADING_MAX_CURVE_POINTS,
      implicitEndpoints: true,
      endpointsCountTowardMax: true
    },
    hueCurves: {
      channels: HF_COLOR_GRADING_HUE_CURVE_KEYS.map((key) => ({
        key,
        input: { min: 0, maxExclusive: 360, unit: "degrees", wrap: true },
        output: HUE_CURVE_LIMITS[key]
      })),
      minPoints: 3,
      maxPoints: COLOR_GRADING_MAX_CURVE_POINTS
    },
    secondaries: {
      max: COLOR_GRADING_MAX_SECONDARIES,
      hue: {
        center: {
          min: COLOR_GRADING_ADVANCED_LIMITS.hueDegrees.min,
          maxExclusive: COLOR_GRADING_ADVANCED_LIMITS.hueDegrees.max,
          unit: "degrees",
          wrap: true
        },
        range: { ...COLOR_GRADING_ADVANCED_LIMITS.secondaryHueRange, unit: "degrees" },
        softness: { ...COLOR_GRADING_ADVANCED_LIMITS.secondaryHueSoftness, unit: "degrees" },
        rangePlusSoftnessMax: COLOR_GRADING_ADVANCED_LIMITS.secondaryHueCombinedMax
      },
      saturation: {
        min: { ...UNIT_LIMIT },
        max: { ...UNIT_LIMIT },
        relation: "min < max",
        softness: { ...COLOR_GRADING_ADVANCED_LIMITS.secondarySoftRangeSoftness }
      },
      luma: {
        min: { ...UNIT_LIMIT },
        max: { ...UNIT_LIMIT },
        relation: "min < max",
        softness: { ...COLOR_GRADING_ADVANCED_LIMITS.secondarySoftRangeSoftness }
      },
      correction: {
        hueShift: { ...COLOR_GRADING_ADVANCED_LIMITS.secondaryHueShift, unit: "degrees" },
        saturation: { ...COLOR_GRADING_ADVANCED_LIMITS.signedUnit },
        luma: { ...COLOR_GRADING_ADVANCED_LIMITS.signedUnit },
        temperature: { ...COLOR_GRADING_ADVANCED_LIMITS.signedUnit },
        tint: { ...COLOR_GRADING_ADVANCED_LIMITS.signedUnit }
      }
    },
    effectFamilies: EFFECT_FAMILIES,
    finishing: HF_COLOR_GRADING_DETAIL_KEYS.map((key) => ({
      key,
      identity: DETAIL_DEFAULTS[key],
      ...DETAIL_LIMITS[key]
    })),
    effects: HF_COLOR_GRADING_ACTIVE_EFFECT_KEYS.map((key) => {
      const apply = HF_COLOR_GRADING_EFFECT_APPLY_DEFAULTS[key];
      return {
        key,
        ...EFFECT_METADATA[key],
        apply: { ...apply },
        supportsPalette: PALETTE_EFFECT_KEYS.has(key),
        renderLane: MULTIPASS_EFFECT_KEYS.has(key) ? "multipass" : "single-pass",
        controls: HF_COLOR_GRADING_EFFECT_KEYS.filter(
          (control) => Object.hasOwn(apply, control)
        ).map((control) => ({
          key: control,
          identity: EFFECT_DEFAULTS[control],
          recommended: apply[control] ?? EFFECT_DEFAULTS[control],
          ...effectLimit(control)
        }))
      };
    }),
    palettes: HF_COLOR_GRADING_PALETTES.map(({ id, label, group, colors }) => ({
      id,
      label,
      group,
      colors
    })),
    animatable: HF_COLOR_GRADING_ANIMATABLE_PROPERTIES
  };
}
var EFFECT_PALETTE_COLOR = /^#[0-9a-f]{6}$/i;
function normalizePalette(value) {
  if (!Array.isArray(value) || value.length < 2 || value.length > 6) return null;
  if (!value.every((color) => typeof color === "string" && EFFECT_PALETTE_COLOR.test(color))) {
    return null;
  }
  return value.map((color) => color.toLowerCase());
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function clamp(value, min, max) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(min, value));
}
function clampUnit(value, fallback) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(1, Math.max(0, parsed));
}
function readLimitedValue(value, limit) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return clamp(parsed, limit.min, limit.max);
}
function wrapDegrees(value, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return (parsed % 360 + 360) % 360;
}
function normalizeWheels(value) {
  const wheels = isRecord(value) ? value : {};
  return HF_COLOR_GRADING_WHEEL_KEYS.reduce(
    (result, key) => {
      const wheel = isRecord(wheels[key]) ? wheels[key] : {};
      result[key] = {
        hue: wrapDegrees(wheel.hue, TONAL_WHEEL_DEFAULT.hue),
        amount: readLimitedValue(wheel.amount ?? TONAL_WHEEL_DEFAULT.amount, WHEEL_LIMITS.amount),
        level: readLimitedValue(wheel.level ?? TONAL_WHEEL_DEFAULT.level, WHEEL_LIMITS.level)
      };
      return result;
    },
    {
      shadows: { ...TONAL_WHEEL_DEFAULT },
      midtones: { ...TONAL_WHEEL_DEFAULT },
      highlights: { ...TONAL_WHEEL_DEFAULT }
    }
  );
}
function normalizeCurvePoint(value) {
  if (!Array.isArray(value) || value.length !== 2) return null;
  const input = Number(value[0]);
  const output = Number(value[1]);
  return Number.isFinite(input) && Number.isFinite(output) ? [clamp(input, 0, 1), clamp(output, 0, 1)] : null;
}
function hasDuplicateCurveInputs(points) {
  return points.some((point, index) => index > 0 && point[0] === points[index - 1]?.[0]);
}
function completeCurveEndpoints(points) {
  if ((points[0]?.[0] ?? 0) > 0) points.unshift([0, 0]);
  if ((points.at(-1)?.[0] ?? 1) < 1) points.push([1, 1]);
}
function normalizeCurve(value) {
  if (!Array.isArray(value) || value.length < 2) return RGB_CURVE_IDENTITY;
  const points = [];
  for (const valuePoint of value) {
    const point = normalizeCurvePoint(valuePoint);
    if (!point) return RGB_CURVE_IDENTITY;
    points.push(point);
  }
  points.sort((a, b) => a[0] - b[0]);
  if (hasDuplicateCurveInputs(points)) return RGB_CURVE_IDENTITY;
  completeCurveEndpoints(points);
  if (points.length > COLOR_GRADING_MAX_CURVE_POINTS) return RGB_CURVE_IDENTITY;
  return points;
}
function normalizeCurves(value) {
  const curves = isRecord(value) ? value : {};
  return HF_COLOR_GRADING_CURVE_KEYS.reduce(
    (result, key) => {
      result[key] = normalizeCurve(curves[key]);
      return result;
    },
    {
      master: RGB_CURVE_IDENTITY,
      red: RGB_CURVE_IDENTITY,
      green: RGB_CURVE_IDENTITY,
      blue: RGB_CURVE_IDENTITY
    }
  );
}
function normalizeHueCurvePoint(value, limit) {
  if (!Array.isArray(value) || value.length !== 2) return null;
  const hue = Number(value[0]);
  const delta = Number(value[1]);
  return Number.isFinite(hue) && Number.isFinite(delta) ? [wrapDegrees(hue), clamp(delta, limit.min, limit.max)] : null;
}
function normalizeHueCurve(value, limit) {
  if (!Array.isArray(value) || value.length < 3 || value.length > COLOR_GRADING_MAX_CURVE_POINTS) {
    return HUE_CURVE_IDENTITY;
  }
  const points = [];
  for (const candidate of value) {
    const point = normalizeHueCurvePoint(candidate, limit);
    if (!point) return HUE_CURVE_IDENTITY;
    points.push(point);
  }
  points.sort((a, b) => a[0] - b[0]);
  return hasDuplicateCurveInputs(points) ? HUE_CURVE_IDENTITY : points;
}
function normalizeHueCurves(value) {
  const curves = isRecord(value) ? value : {};
  return HF_COLOR_GRADING_HUE_CURVE_KEYS.reduce(
    (result, key) => {
      result[key] = normalizeHueCurve(curves[key], HUE_CURVE_LIMITS[key]);
      return result;
    },
    {
      hueVsHue: HUE_CURVE_IDENTITY,
      hueVsSaturation: HUE_CURVE_IDENTITY,
      hueVsLuma: HUE_CURVE_IDENTITY
    }
  );
}
function normalizeSoftRange(value) {
  const range = isRecord(value) ? value : {};
  const first = readLimitedValue(range.min ?? SECONDARY_SOFT_RANGE_DEFAULT.min, UNIT_LIMIT);
  const second = readLimitedValue(range.max ?? SECONDARY_SOFT_RANGE_DEFAULT.max, UNIT_LIMIT);
  return {
    min: Math.min(first, second),
    max: Math.max(first, second),
    softness: readLimitedValue(
      range.softness ?? SECONDARY_SOFT_RANGE_DEFAULT.softness,
      COLOR_GRADING_ADVANCED_LIMITS.secondarySoftRangeSoftness
    )
  };
}
function normalizeSecondaryHue(value) {
  const hue = isRecord(value) ? value : {};
  const range = readLimitedValue(
    hue.range ?? SECONDARY_HUE_DEFAULT.range,
    COLOR_GRADING_ADVANCED_LIMITS.secondaryHueRange
  );
  return {
    center: wrapDegrees(hue.center, SECONDARY_HUE_DEFAULT.center),
    range,
    softness: readLimitedValue(hue.softness ?? SECONDARY_HUE_DEFAULT.softness, {
      min: COLOR_GRADING_ADVANCED_LIMITS.secondaryHueSoftness.min,
      max: COLOR_GRADING_ADVANCED_LIMITS.secondaryHueCombinedMax - range
    })
  };
}
function normalizeSecondaryCorrection(value) {
  return {
    hueShift: readLimitedValue(
      value.hueShift ?? 0,
      COLOR_GRADING_ADVANCED_LIMITS.secondaryHueShift
    ),
    saturation: readLimitedValue(value.saturation ?? 0, COLOR_GRADING_ADVANCED_LIMITS.signedUnit),
    luma: readLimitedValue(value.luma ?? 0, COLOR_GRADING_ADVANCED_LIMITS.signedUnit),
    temperature: readLimitedValue(value.temperature ?? 0, COLOR_GRADING_ADVANCED_LIMITS.signedUnit),
    tint: readLimitedValue(value.tint ?? 0, COLOR_GRADING_ADVANCED_LIMITS.signedUnit)
  };
}
function normalizeSecondary(value) {
  if (!isRecord(value) || !isRecord(value.key) || !isRecord(value.correction)) return null;
  return {
    enabled: value.enabled !== false,
    key: {
      hue: normalizeSecondaryHue(value.key.hue),
      saturation: normalizeSoftRange(value.key.saturation),
      luma: normalizeSoftRange(value.key.luma)
    },
    correction: normalizeSecondaryCorrection(value.correction)
  };
}
function normalizeSecondaries(value) {
  if (!Array.isArray(value)) return [];
  const result = [];
  for (const candidate of value.slice(0, COLOR_GRADING_MAX_SECONDARIES)) {
    const secondary = normalizeSecondary(candidate);
    if (secondary) result.push(secondary);
  }
  return result;
}
function normalizePresetId(value) {
  if (value == null) return null;
  const preset2 = String(value).trim();
  return preset2 ? preset2 : null;
}
function normalizeLut(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const src = value.trim();
    return src ? { src, intensity: 1 } : null;
  }
  if (!isRecord(value)) return null;
  const rawSrc = value.src;
  if (typeof rawSrc !== "string" || rawSrc.trim() === "") return null;
  return {
    src: rawSrc.trim(),
    intensity: clampUnit(value.intensity, 1)
  };
}
function readColorGradingObject(raw) {
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);
        return isRecord(parsed) ? parsed : null;
      } catch {
        return null;
      }
    }
    return { preset: trimmed };
  }
  return isRecord(raw) ? raw : null;
}
function resolveStringVariableRef(value, variables) {
  const match = value.trim().match(VARIABLE_REF_RE);
  if (!match) return value;
  const key = match[1] ?? match[2] ?? "";
  return key && Object.hasOwn(variables, key) ? variables[key] : value;
}
function resolveHfColorGradingVariables(raw, variables) {
  if (typeof raw === "string") {
    const direct = resolveStringVariableRef(raw, variables);
    if (direct !== raw) return direct;
    const trimmed = raw.trim();
    if (!trimmed.startsWith("{")) return raw;
    try {
      return resolveHfColorGradingVariables(JSON.parse(trimmed), variables);
    } catch {
      return raw;
    }
  }
  if (Array.isArray(raw)) {
    return raw.map((value) => resolveHfColorGradingVariables(value, variables));
  }
  if (!isRecord(raw)) return raw;
  const resolved = {};
  for (const [key, value] of Object.entries(raw)) {
    resolved[key] = resolveHfColorGradingVariables(value, variables);
  }
  return resolved;
}
function getHfColorGradingPreset(id) {
  if (!id) return null;
  return PRESETS_BY_ID.get(id) ?? null;
}
function normalizeHfColorGrading(raw) {
  const grading = readColorGradingObject(raw);
  if (!grading) return null;
  if (grading.enabled === false) return null;
  const presetId = normalizePresetId(grading.preset);
  const preset2 = getHfColorGradingPreset(presetId);
  const presetAdjust = preset2?.adjust ?? ADJUST_ZERO;
  const presetDetails = preset2?.details ?? DETAIL_DEFAULTS;
  const presetEffects = preset2?.effects ?? EFFECT_DEFAULTS;
  const rawAdjust = isRecord(grading.adjust) ? grading.adjust : {};
  const rawDetails = isRecord(grading.details) ? grading.details : {};
  const rawEffects = isRecord(grading.effects) ? grading.effects : {};
  const adjust = HF_COLOR_GRADING_ADJUST_KEYS.reduce(
    (result, key) => {
      result[key] = readLimitedValue(rawAdjust[key] ?? presetAdjust[key], ADJUST_LIMITS[key]);
      return result;
    },
    { ...ADJUST_ZERO }
  );
  const details = HF_COLOR_GRADING_DETAIL_KEYS.reduce(
    (result, key) => {
      result[key] = readLimitedValue(rawDetails[key] ?? presetDetails[key], DETAIL_LIMITS[key]);
      return result;
    },
    { ...DETAIL_DEFAULTS }
  );
  const effects = HF_COLOR_GRADING_EFFECT_KEYS.reduce(
    (result, key) => {
      result[key] = readLimitedValue(
        rawEffects[key] ?? presetEffects[key],
        EFFECT_LIMIT_OVERRIDES[key] ?? UNIT_LIMIT
      );
      return result;
    },
    { ...EFFECT_DEFAULTS }
  );
  return {
    enabled: true,
    preset: presetId,
    intensity: clampUnit(grading.intensity, preset2?.intensity ?? 1),
    adjust,
    wheels: normalizeWheels(grading.wheels),
    curves: normalizeCurves(grading.curves),
    hueCurves: normalizeHueCurves(grading.hueCurves),
    secondaries: normalizeSecondaries(grading.secondaries),
    details,
    effects,
    palette: normalizePalette(grading.palette),
    lut: normalizeLut(grading.lut),
    colorSpace: typeof grading.colorSpace === "string" && grading.colorSpace.trim() ? grading.colorSpace.trim() : HF_COLOR_GRADING_COLOR_SPACE
  };
}
function normalizeHfColorGradingWithVariables(raw, variables) {
  return normalizeHfColorGrading(resolveHfColorGradingVariables(raw, variables));
}
function hasWheelGrade(wheels) {
  return HF_COLOR_GRADING_WHEEL_KEYS.some(
    (key) => Math.abs(wheels[key].amount) > 1e-4 || Math.abs(wheels[key].level) > 1e-4
  );
}
function hasHfColorGradingRgbCurveValues(curves) {
  return HF_COLOR_GRADING_CURVE_KEYS.some(
    (key) => curves[key].some(([input, output]) => Math.abs(input - output) > 1e-4)
  );
}
function hasHfColorGradingHueCurveValues(curves) {
  return HF_COLOR_GRADING_HUE_CURVE_KEYS.some(
    (key) => curves[key].some(([, delta]) => Math.abs(delta) > 1e-4)
  );
}
function hasHfColorGradingSecondaryValues(secondaries) {
  return secondaries.some(
    (secondary) => secondary.enabled && Object.values(secondary.correction).some((value) => Math.abs(value) > 1e-4)
  );
}
function serializeHfColorGrading(grading) {
  const normalized = normalizeHfColorGrading(grading);
  if (!normalized) return "";
  const {
    enabled: _enabled,
    wheels,
    curves,
    hueCurves,
    secondaries,
    palette,
    ...serializable
  } = normalized;
  return JSON.stringify({
    ...serializable,
    ...hasWheelGrade(wheels) ? { wheels } : {},
    ...hasHfColorGradingRgbCurveValues(curves) ? { curves } : {},
    ...hasHfColorGradingHueCurveValues(hueCurves) ? { hueCurves } : {},
    // Preserve a keyed secondary even before it changes pixels so Studio and
    // CLI can author its qualifier and correction in separate transactions.
    ...secondaries.length > 0 ? { secondaries } : {},
    ...palette ? { palette } : {}
  });
}
function isHfColorGradingActive(grading) {
  if (!grading?.enabled) return false;
  const hasIndependentTreatment = Math.abs(grading.details.vignette) > 1e-4 || Math.abs(grading.details.grain) > 1e-4 || HF_COLOR_GRADING_ACTIVE_EFFECT_KEYS.some((key) => Math.abs(grading.effects[key]) > 1e-4);
  if (hasIndependentTreatment) return true;
  if (grading.intensity === 0) return false;
  if (grading.lut && grading.lut.intensity !== 0) return true;
  return HF_COLOR_GRADING_ADJUST_KEYS.some((key) => Math.abs(grading.adjust[key]) > 1e-4) || (grading.wheels ? hasWheelGrade(grading.wheels) : false) || (grading.curves ? hasHfColorGradingRgbCurveValues(grading.curves) : false) || (grading.hueCurves ? hasHfColorGradingHueCurveValues(grading.hueCurves) : false) || (grading.secondaries ? hasHfColorGradingSecondaryValues(grading.secondaries) : false);
}
function hasHfColorGradingAuthoredValues(grading) {
  if (!grading) return false;
  if (grading.secondaries?.length) return true;
  return isHfColorGradingActive(grading);
}

// ../core/src/hdrToneMap.ts
function known(value) {
  return value && value !== "unknown" && value !== "reserved" ? value : void 0;
}
function hdrToSdrToneMapFilter(probed, firstFrame) {
  const fill = (key, fallback) => known(firstFrame[key]) ? void 0 : known(probed[key]) ?? fallback;
  const tags = [
    ["colorspace", fill("colorSpace", "bt2020nc")],
    ["color_primaries", fill("colorPrimaries", "bt2020")],
    ["color_trc", fill("colorTransfer")]
  ].filter(([, value]) => value);
  const setTags = tags.length ? `setparams=${tags.map((tag) => tag.join("=")).join(":")},` : "";
  return `${setTags}zscale=t=linear:npl=100,tonemap=hable:desat=0,zscale=p=bt709:t=bt709:m=bt709:r=tv`;
}
function firstFrameColourArgs(videoPath) {
  return [
    ...["-hide_banner", "-nostats", "-i", videoPath, "-map", "0:v:0", "-frames:v", "1"],
    ...["-vf", "showinfo", "-f", "null", "-"]
  ];
}
function parseFirstFrameColour(stderr) {
  const tags = / color_space:(\S+) color_primaries:(\S+) color_trc:(\S+)/.exec(stderr);
  return tags ? { colorSpace: tags[1], colorPrimaries: tags[2], colorTransfer: tags[3] } : {};
}

// ../core/src/inline-scripts/hyperframesRuntime.engine.ts
import { buildSync } from "esbuild";
import { existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
function applyDefaultParityMode(script, enabled) {
  const parityFlagPattern = /var\s+_parityModeEnabled\s*=\s*(?:true|false)\s*;/;
  if (!parityFlagPattern.test(script)) return script;
  return script.replace(
    parityFlagPattern,
    `var _parityModeEnabled = ${enabled ? "true" : "false"};`
  );
}
function buildHyperframesRuntimeScript(options = {}) {
  const entryPath = resolve(dirname(fileURLToPath(import.meta.url)), "../runtime/entry.ts");
  if (!existsSync(entryPath)) return null;
  const result = buildSync({
    entryPoints: [entryPath],
    bundle: true,
    write: false,
    platform: "browser",
    format: "iife",
    target: ["es2020"],
    minify: options.minify ?? true,
    legalComments: "none"
  });
  let script = result.outputFiles[0]?.text ?? "";
  if (typeof options.defaultParityMode === "boolean") {
    script = applyDefaultParityMode(script, options.defaultParityMode);
  }
  if (options.sourceUrl && options.sourceUrl.trim()) {
    script = `${script}
//# sourceURL=${options.sourceUrl.trim()}`;
  }
  return script;
}

// ../core/src/inline-scripts/runtimeContract.ts
var HYPERFRAME_RUNTIME_GLOBALS = {
  player: "__player",
  playerReady: "__playerReady",
  renderReady: "__renderReady",
  timelines: "__timelines",
  clipManifest: "__clipManifest"
};
var HYPERFRAME_BRIDGE_SOURCES = {
  parent: "hf-parent",
  preview: "hf-preview"
};
var HYPERFRAME_CONTROL_ACTIONS = [
  "play",
  "pause",
  "seek",
  "set-muted",
  "set-playback-rate",
  "set-color-grading",
  "set-color-grading-compare",
  "enable-pick-mode",
  "disable-pick-mode"
];

// ../core/src/inline-scripts/hyperframe.ts
var HYPERFRAME_RUNTIME_ARTIFACTS = {
  iife: "hyperframe.runtime.iife.js",
  esm: "hyperframe.runtime.mjs",
  manifest: "hyperframe.manifest.json"
};
var HYPERFRAME_RUNTIME_CONTRACT = {
  globals: HYPERFRAME_RUNTIME_GLOBALS,
  messageSources: HYPERFRAME_BRIDGE_SOURCES
};
function loadHyperframeRuntimeSource() {
  return buildHyperframesRuntimeScript();
}

// ../core/src/generated/runtime-inline.ts
var RUNTIME_IIFE = '"use strict";(()=>{var HS=Object.create;var ks=Object.defineProperty;var GS=Object.getOwnPropertyDescriptor;var BS=Object.getOwnPropertyNames;var US=Object.getPrototypeOf,VS=Object.prototype.hasOwnProperty;var WS=(e,t,n)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var me=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var $S=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of BS(t))!VS.call(e,i)&&i!==n&&ks(e,i,{get:()=>t[i],enumerable:!(r=GS(t,i))||r.enumerable});return e};var qS=(e,t,n)=>(n=e!=null?HS(US(e)):{},$S(t||!e||!e.__esModule?ks(n,"default",{value:e,enumerable:!0}):n,e));var ce=(e,t,n)=>WS(e,typeof t!="symbol"?t+"":t,n);var Sh=me((xD,au)=>{var se=String,xh=function(){return{isColorSupported:!1,reset:se,bold:se,dim:se,italic:se,underline:se,inverse:se,hidden:se,strikethrough:se,black:se,red:se,green:se,yellow:se,blue:se,magenta:se,cyan:se,white:se,gray:se,bgBlack:se,bgRed:se,bgGreen:se,bgYellow:se,bgBlue:se,bgMagenta:se,bgCyan:se,bgWhite:se,blackBright:se,redBright:se,greenBright:se,yellowBright:se,blueBright:se,magentaBright:se,cyanBright:se,whiteBright:se,bgBlackBright:se,bgRedBright:se,bgGreenBright:se,bgYellowBright:se,bgBlueBright:se,bgMagentaBright:se,bgCyanBright:se,bgWhiteBright:se}};au.exports=xh();au.exports.createColors=xh});var su=me(()=>{});var fa=me((ED,Ah)=>{"use strict";var vh=Sh(),Eh=su(),fi=class e extends Error{constructor(t,n,r,i,o,a){super(t),this.name="CssSyntaxError",this.reason=t,o&&(this.file=o),i&&(this.source=i),a&&(this.plugin=a),typeof n<"u"&&typeof r<"u"&&(typeof n=="number"?(this.line=n,this.column=r):(this.line=n.line,this.column=n.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,e)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line<"u"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(t){if(!this.source)return"";let n=this.source;t==null&&(t=vh.isColorSupported);let r=d=>d,i=d=>d,o=d=>d;if(t){let{bold:d,gray:f,red:m}=vh.createColors(!0);i=p=>d(m(p)),r=p=>f(p),Eh&&(o=p=>Eh(p))}let a=n.split(/\\r?\\n/),s=Math.max(this.line-3,0),l=Math.min(this.line+2,a.length),u=String(l).length;return a.slice(s,l).map((d,f)=>{let m=s+1+f,p=" "+(" "+m).slice(-u)+" | ";if(m===this.line){if(d.length>160){let b=20,y=Math.max(0,this.column-b),v=Math.max(this.column+b,this.endColumn+b),A=d.slice(y,v),E=r(p.replace(/\\d/g," "))+d.slice(0,Math.min(this.column-1,b-1)).replace(/[^\\t]/g," ");return i(">")+r(p)+o(A)+`\n `+E+i("^")}let g=r(p.replace(/\\d/g," "))+d.slice(0,this.column-1).replace(/[^\\t]/g," ");return i(">")+r(p)+o(d)+`\n `+g+i("^")}return" "+r(p)+o(d)}).join(`\n`)}toString(){let t=this.showSourceCode();return t&&(t=`\n\n`+t+`\n`),this.name+": "+this.message+t}};Ah.exports=fi;fi.default=fi});var lu=me((AD,Th)=>{"use strict";var fw=/(<)(\\/?style\\b)/gi,pw=/(<)(!--)/g,hw=/[\\t\\n\\f\\r "#\'()/;[\\\\\\]{}]/;function dt(e){return typeof e!="string"||!e.includes("<")?e:e.replace(fw,"\\\\3c $2").replace(pw,"\\\\3c $2")}var wh={after:`\n`,beforeClose:`\n`,beforeComment:`\n`,beforeDecl:`\n`,beforeOpen:" ",beforeRule:`\n`,colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",indent:"    ",semicolon:!1};function gw(e){return e[0].toUpperCase()+e.slice(1)}function _h(e,t){let n="@"+t.name,r=t.params?e.rawValue(t,"params"):"",i=t.raws.afterName;return typeof i>"u"?i=r?" ":"":i===""&&r&&!hw.test(r[0])&&(i=" "),n+i+r}function Rh(e,t,n){let r=n.nodes,i=r.length-1;for(;i>0&&r[i].type==="comment";)i-=1;let o=e.raw(n,"semicolon"),a=n.type==="document";for(let s=r.length-1;s>=0;s--){let l=r[s],u=i!==s||o;!u&&s<r.length-1&&(l.type==="atrule"&&!l.nodes||l.type==="decl"&&l.prop.startsWith("--"))&&(u=!0),t.push({document:a,node:l,semicolon:u})}}function Ch(e,t,n,r){let i=e.raw(n,"between","beforeOpen");e.builder(dt(r+i)+"{",n,"start");let o=n.nodes&&n.nodes.length,a=()=>{let s=o?e.raw(n,"after"):e.raw(n,"after","emptyBody");s&&e.builder(dt(s)),e.builder("}",n,"end"),n.type==="rule"&&n.raws.ownSemicolon&&e.builder(dt(n.raws.ownSemicolon),n,"end")};o?(t.push(a),Rh(e,t,n)):a()}var pi=class e{constructor(t){this.builder=t}atrule(t,n){let r=_h(this,t);if(t.nodes)this.block(t,r);else{let i=(t.raws.between||"")+(n?";":"");this.builder(dt(r+i),t)}}beforeAfter(t,n){let r;t.type==="decl"?r=this.raw(t,null,"beforeDecl"):t.type==="comment"?r=this.raw(t,null,"beforeComment"):n==="before"?r=this.raw(t,null,"beforeRule"):r=this.raw(t,null,"beforeClose");let i=t.parent,o=0;for(;i&&i.type!=="root";)o+=1,i=i.parent;if(r.includes(`\n`)){let a=this.raw(t,null,"indent");if(a.length)for(let s=0;s<o;s++)r+=a}return r}block(t,n){let r=this.raw(t,"between","beforeOpen");this.builder(dt(n+r)+"{",t,"start");let i;t.nodes&&t.nodes.length?(this.body(t),i=this.raw(t,"after")):i=this.raw(t,"after","emptyBody"),i&&this.builder(dt(i)),this.builder("}",t,"end")}body(t){let n=e.prototype,r=["atrule","block","body","rule","stringify"].every(o=>this[o]===n[o]),i=[];for(Rh(this,i,t);i.length>0;){let o=i.pop();if(typeof o=="function"){o();continue}let a=o.node,s=this.raw(a,"before");s&&this.builder(o.document?s:dt(s)),r&&a.type==="rule"?Ch(this,i,a,this.rawValue(a,"selector")):r&&a.type==="atrule"&&a.nodes?Ch(this,i,a,_h(this,a)):this.stringify(a,o.semicolon)}}comment(t){let n=this.raw(t,"left","commentLeft"),r=this.raw(t,"right","commentRight");this.builder(dt("/*"+n+t.text+r+"*/"),t)}decl(t,n){let r=t.raws,i=this.raw(t,"between","colon"),o=t.prop+i+this.rawValue(t,"value");t.important&&(o+=r.important||" !important"),n&&(o+=";"),this.builder(dt(o),t)}document(t){this.body(t)}raw(t,n,r){let i;if(r||(r=n),n&&(i=t.raws[n],typeof i<"u"))return i;let o=t.parent;if(r==="before"&&(!o||o.type==="root"&&o.first===t||o&&o.type==="document"))return"";if(!o)return wh[r];let a=t.root(),s=a.rawCache||(a.rawCache={});if(typeof s[r]<"u")return s[r];if(r==="before"||r==="after")return this.beforeAfter(t,r);{let l="raw"+gw(r);this[l]?i=this[l](a,t):a.walk(u=>{if(i=u.raws[n],typeof i<"u")return!1})}return typeof i>"u"&&(i=wh[r]),s[r]=i,i}rawBeforeClose(t){let n;return t.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after<"u")return n=r.raws.after,n.includes(`\n`)&&(n=n.replace(/[^\\n]+$/,"")),!1}),n&&(n=n.replace(/\\S/g,"")),n}rawBeforeComment(t,n){let r;return t.walkComments(i=>{if(typeof i.raws.before<"u")return r=i.raws.before,r.includes(`\n`)&&(r=r.replace(/[^\\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(n,null,"beforeDecl"):r&&(r=r.replace(/\\S/g,"")),r}rawBeforeDecl(t,n){let r;return t.walkDecls(i=>{if(typeof i.raws.before<"u")return r=i.raws.before,r.includes(`\n`)&&(r=r.replace(/[^\\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(n,null,"beforeRule"):r&&(r=r.replace(/\\S/g,"")),r}rawBeforeOpen(t){let n;return t.walk(r=>{if(r.type!=="decl"&&(n=r.raws.between,typeof n<"u"))return!1}),n}rawBeforeRule(t){let n;return t.walk(r=>{if(r.nodes&&(r.parent!==t||t.first!==r)&&typeof r.raws.before<"u")return n=r.raws.before,n.includes(`\n`)&&(n=n.replace(/[^\\n]+$/,"")),!1}),n&&(n=n.replace(/\\S/g,"")),n}rawColon(t){let n;return t.walkDecls(r=>{if(typeof r.raws.between<"u")return n=r.raws.between.replace(/[^\\s:]/g,""),!1}),n}rawEmptyBody(t){let n;return t.walk(r=>{if(r.nodes&&r.nodes.length===0&&(n=r.raws.after,typeof n<"u"))return!1}),n}rawIndent(t){if(t.raws.indent)return t.raws.indent;let n;return t.walk(r=>{let i=r.parent;if(i&&i!==t&&i.parent&&i.parent===t&&typeof r.raws.before<"u"){let o=r.raws.before.split(`\n`);return n=o[o.length-1],n=n.replace(/\\S/g,""),!1}}),n}rawSemicolon(t){let n;return t.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(n=r.raws.semicolon,typeof n<"u"))return!1}),n}rawValue(t,n){let r=t[n],i=t.raws[n];return i&&i.value===r?i.raw:r}root(t){if(t.source&&t.source.input.hasBOM&&this.builder("\\uFEFF",t,"start"),this.body(t),t.raws.after){let n=t.raws.after,r=t.parent&&t.parent.type==="document";this.builder(r?n:dt(n))}}rule(t){this.block(t,this.rawValue(t,"selector")),t.raws.ownSemicolon&&this.builder(dt(t.raws.ownSemicolon),t,"end")}stringify(t,n){if(!this[t.type])throw new Error("Unknown AST node type "+t.type+". Maybe you need to change PostCSS stringifier.");this[t.type](t,n)}};Th.exports=pi;pi.default=pi});var hi=me((wD,kh)=>{"use strict";var bw=lu();function uu(e,t){new bw(t).stringify(e)}kh.exports=uu;uu.default=uu});var gi=me((_D,cu)=>{"use strict";cu.exports.isClean=Symbol("isClean");cu.exports.my=Symbol("my")});var xi=me((CD,Mh)=>{"use strict";var yw=fa(),xw=lu(),Sw=hi(),{isClean:bi,my:vw}=gi();function Ew(e,t){let n=new e.constructor,r=[[e,n,t]];for(;r.length>0;){let[i,o,a]=r.pop();for(let s in i){if(!Object.prototype.hasOwnProperty.call(i,s)||s==="proxyCache")continue;let l=i[s],u=typeof l;if(s==="parent"&&u==="object")a&&(o[s]=a);else if(s==="source")o[s]=l;else if(Array.isArray(l)){let d=[];o[s]=d;for(let f of l){let m=new f.constructor;d.push(m),r.push([f,m,o])}}else{if(u==="object"&&l!==null){let d=new l.constructor;r.push([l,d,void 0]),l=d}o[s]=l}}}return n}function At(e,t){if(t&&typeof t.offset<"u")return t.offset;let n=1,r=1,i=0;for(let o=0;o<e.length;o++){if(r===t.line&&n===t.column){i=o;break}e[o]===`\n`?(n=1,r+=1):n+=1}return i}var yi=class e{get proxyOf(){return this}constructor(t={}){this.raws={},this[bi]=!1,this[vw]=!0;for(let n of Object.keys(t))if(n!=="__proto__")if(n==="nodes"){this.nodes=[];for(let r of t[n])typeof r.clone=="function"&&r.parent?this.append(r.clone()):this.append(r)}else this[n]=t[n]}addToError(t){if(t.postcssNode=this,t.stack&&this.source&&/\\n\\s{4}at /.test(t.stack)){let n=this.source;t.stack=t.stack.replace(/\\n\\s{4}at /,`$&${n.input.from}:${n.start.line}:${n.start.column}$&`)}return t}after(t){return this.parent.insertAfter(this,t),this}assign(t={}){for(let n in t)this[n]=t[n];return this}before(t){return this.parent.insertBefore(this,t),this}cleanRaws(t){delete this.raws.before,delete this.raws.after,t||delete this.raws.between}clone(t={}){let n=Ew(this);for(let r in t)n[r]=t[r];return n}cloneAfter(t={}){let n=this.clone(t);return this.parent.insertAfter(this,n),n}cloneBefore(t={}){let n=this.clone(t);return this.parent.insertBefore(this,n),n}error(t,n={}){if(this.source){let{end:r,start:i}=this.rangeBy(n);return this.source.input.error(t,{column:i.column,line:i.line},{column:r.column,line:r.line},n)}return new yw(t)}getProxyProcessor(){return{get(t,n){return n==="proxyOf"?t:n==="root"?()=>t.root().toProxy():t[n]},set(t,n,r){return t[n]===r||(t[n]=r,(n==="prop"||n==="value"||n==="name"||n==="params"||n==="important"||n==="text")&&t.markDirty()),!0}}}markClean(){this[bi]=!0}markDirty(){if(this[bi]){this[bi]=!1;let t=this;for(;t=t.parent;)t[bi]=!1}}next(){if(!this.parent)return;let t=this.parent.index(this);return this.parent.nodes[t+1]}positionBy(t={}){let n="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:At(n,this.source.start)};if(t.index)r=this.positionInside(t.index);else if(t.word){let o=n.slice(At(n,this.source.start),At(n,this.source.end)).indexOf(t.word);o!==-1&&(r=this.positionInside(o))}return r}positionInside(t){let n=this.source.start.column,r=this.source.start.line,i="document"in this.source.input?this.source.input.document:this.source.input.css,o=At(i,this.source.start),a=o+t;for(let s=o;s<a;s++)i[s]===`\n`?(n=1,r+=1):n+=1;return{column:n,line:r,offset:a}}prev(){if(!this.parent)return;let t=this.parent.index(this);return this.parent.nodes[t-1]}rangeBy(t={}){let n="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:At(n,this.source.start)},i=this.source.end?{column:this.source.end.column+1,line:this.source.end.line,offset:typeof this.source.end.offset=="number"?this.source.end.offset:At(n,this.source.end)+1}:{column:r.column+1,line:r.line,offset:r.offset+1};if(t.word){let a=n.slice(At(n,this.source.start),At(n,this.source.end)).indexOf(t.word);a!==-1&&(r=this.positionInside(a),i=this.positionInside(a+t.word.length))}else t.start?r={column:t.start.column,line:t.start.line,offset:At(n,t.start)}:typeof t.index=="number"&&(r=this.positionInside(t.index)),t.end?i={column:t.end.column,line:t.end.line,offset:At(n,t.end)}:typeof t.endIndex=="number"?i=this.positionInside(t.endIndex):typeof t.index=="number"&&(i=this.positionInside(t.index+1));return(i.line<r.line||i.line===r.line&&i.column<=r.column)&&(i={column:r.column+1,line:r.line,offset:r.offset+1}),{end:i,start:r}}raw(t,n){return new xw().raw(this,t,n)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}replaceWith(...t){if(this.parent){let n=this,r=!1;for(let i of t)i===this?r=!0:r?(this.parent.insertAfter(n,i),n=i):this.parent.insertBefore(n,i);r||this.remove()}return this}root(){let t=this;for(;t.parent&&t.parent.type!=="document";)t=t.parent;return t}toJSON(t,n){let r=n==null;n=n||new Map;let i=[],o=[[this,i,0]];for(let s=0;s<o.length;s++){let[l,u,d]=o[s],f={};u[d]=f;for(let m in l){if(!Object.prototype.hasOwnProperty.call(l,m)||m==="parent"||m==="proxyCache")continue;let p=l[m];if(Array.isArray(p)){let g=[];f[m]=g;for(let b=0;b<p.length;b++){let y=p[b];typeof y=="object"&&y.toJSON?y.toJSON===e.prototype.toJSON?o.push([y,g,b]):g[b]=y.toJSON(null,n):g[b]=y}}else if(typeof p=="object"&&p.toJSON)p.toJSON===e.prototype.toJSON?o.push([p,f,m]):f[m]=p.toJSON(null,n);else if(m==="source"){if(p==null)continue;let g=n.get(p.input);g==null&&(g=n.size,n.set(p.input,g)),f[m]={end:p.end,inputId:g,start:p.start}}else f[m]=p}}let a=i[0];return r&&(a.inputs=[...n.keys()].map(s=>s.toJSON())),a}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}toString(t=Sw){t.stringify&&(t=t.stringify);let n="";return t(this,r=>{n+=r}),n}warn(t,n,r={}){let i={node:this};for(let o in r)i[o]=r[o];return t.warn(n,i)}};Mh.exports=yi;yi.default=yi});var vi=me((RD,Lh)=>{"use strict";var Aw=xi(),Si=class extends Aw{constructor(t){super(t),this.type="comment"}};Lh.exports=Si;Si.default=Si});var Ai=me((TD,Nh)=>{"use strict";var ww=xi(),Ei=class extends ww{get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}constructor(t){t&&typeof t.value<"u"&&typeof t.value!="string"&&(t={...t,value:String(t.value)}),super(t),this.type="decl"}};Nh.exports=Ei;Ei.default=Ei});var Pt=me((kD,Bh)=>{"use strict";var Ih=vi(),Dh=Ai(),Fh=xi(),{isClean:Ph,my:Oh}=gi(),du,Hh,Gh,mu;function _w(e){let t=e.slice();for(;t.length>0;){let n=t.pop();if(delete n.source,n.nodes){n.nodes=n.nodes.slice();for(let r of n.nodes)t.push(r)}}return e.slice()}function Cw(e){let t=[e];for(;t.length>0;){let n=t.pop();if(n[Ph]=!1,n.proxyOf.nodes)for(let r of n.proxyOf.nodes)t.push(r)}}var wt=class e extends Fh{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}append(...t){for(let n of t){let r=this.normalize(n,this.last);for(let i of r)this.proxyOf.nodes.push(i)}return this.markDirty(),this}cleanRaws(t){let n=[this];for(;n.length>0;){let r=n.pop();if(r!==this&&r.cleanRaws!==e.prototype.cleanRaws){r.cleanRaws(t);continue}if(Fh.prototype.cleanRaws.call(r,t),r.nodes)for(let i of r.nodes)n.push(i)}}each(t){if(!this.proxyOf.nodes)return;let n=this.getIterator(),r,i;for(;this.indexes[n]<this.proxyOf.nodes.length&&(r=this.indexes[n],i=t(this.proxyOf.nodes[r],r),i!==!1);)this.indexes[n]+=1;return delete this.indexes[n],i}every(t){return this.nodes.every(t)}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let t=this.lastEach;return this.indexes[t]=0,t}getProxyProcessor(){return{get(t,n){return n==="proxyOf"?t:t[n]?n==="each"||typeof n=="string"&&n.startsWith("walk")?(...r)=>t[n](...r.map(i=>typeof i=="function"?(o,a)=>i(o.toProxy(),a):i)):n==="every"||n==="some"?r=>t[n]((i,...o)=>r(i.toProxy(),...o)):n==="root"?()=>t.root().toProxy():n==="nodes"?t.nodes.map(r=>r.toProxy()):n==="first"||n==="last"?t[n].toProxy():t[n]:t[n]},set(t,n,r){return t[n]===r||(t[n]=r,(n==="name"||n==="params"||n==="selector")&&t.markDirty()),!0}}}index(t){return typeof t=="number"?t:(t.proxyOf&&(t=t.proxyOf),this.proxyOf.nodes.indexOf(t))}insertAfter(t,n){let r=this.index(t),i=this.normalize(n,this.proxyOf.nodes[r]).reverse();r=this.index(t);for(let a of i)this.proxyOf.nodes.splice(r+1,0,a);let o;for(let a in this.indexes)o=this.indexes[a],r<o&&(this.indexes[a]=o+i.length);return this.markDirty(),this}insertBefore(t,n){let r=this.index(t),i=r===0?"prepend":!1,o=this.normalize(n,this.proxyOf.nodes[r],i).reverse();r=this.index(t);for(let s of o)this.proxyOf.nodes.splice(r,0,s);let a;for(let s in this.indexes)a=this.indexes[s],r<=a&&(this.indexes[s]=a+o.length);return this.markDirty(),this}normalize(t,n){if(typeof t=="string")t=_w(Hh(t).nodes);else if(typeof t>"u")t=[];else if(Array.isArray(t)){t=t.slice(0);for(let i of t)i.parent&&i.parent.removeChild(i,"ignore")}else if(t.type==="root"&&this.type!=="document"){t=t.nodes.slice(0);for(let i of t)i.parent&&i.parent.removeChild(i,"ignore")}else if(t.type)t=[t];else if(t.prop){if(typeof t.value>"u")throw new Error("Value field is missed in node creation");typeof t.value!="string"&&(t.value=String(t.value)),t=[new Dh(t)]}else if(t.selector||t.selectors)t=[new mu(t)];else if(t.name)t=[new du(t)];else if(t.text)t=[new Ih(t)];else throw new Error("Unknown node type in node creation");return t.map(i=>(i[Oh]||e.rebuild(i),i=i.proxyOf,i.parent&&i.parent.removeChild(i),i[Ph]&&Cw(i),i.raws||(i.raws={}),typeof i.raws.before>"u"&&n&&typeof n.raws.before<"u"&&(i.raws.before=n.raws.before.replace(/\\S/g,"")),i.parent=this.proxyOf,i))}prepend(...t){t=t.reverse();for(let n of t){let r=this.normalize(n,this.first,"prepend").reverse();for(let i of r)this.proxyOf.nodes.unshift(i);for(let i in this.indexes)this.indexes[i]=this.indexes[i]+r.length}return this.markDirty(),this}push(t){return t.parent=this,this.proxyOf.nodes.push(t),this}removeAll(){for(let t of this.proxyOf.nodes)t.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(t){t=this.index(t),this.proxyOf.nodes[t].parent=void 0,this.proxyOf.nodes.splice(t,1);let n;for(let r in this.indexes)n=this.indexes[r],n>=t&&(this.indexes[r]=n-1);return this.markDirty(),this}replaceValues(t,n,r){return r||(r=n,n={}),this.walkDecls(i=>{n.props&&!n.props.includes(i.prop)||n.fast&&!i.value.includes(n.fast)||(i.value=i.value.replace(t,r))}),this.markDirty(),this}some(t){return this.nodes.some(t)}walk(t){if(!this.proxyOf.nodes)return;let n=[{iterator:this.getIterator(),node:this.proxyOf}];for(;n.length>0;){let{iterator:r,node:i}=n[n.length-1],o=i.indexes[r];if(o>=i.proxyOf.nodes.length){delete i.indexes[r],n.pop();let l=n[n.length-1];l&&(l.node.indexes[l.iterator]+=1);continue}let a=i.proxyOf.nodes[o],s;try{s=t(a,o)}catch(l){throw a.addToError(l)}if(s===!1){for(let l of n)delete l.node.indexes[l.iterator];return!1}a.walk&&a.proxyOf.nodes?n.push({iterator:a.getIterator(),node:a}):i.indexes[r]+=1}}walkAtRules(t,n){return n?t instanceof RegExp?this.walk((r,i)=>{if(r.type==="atrule"&&t.test(r.name))return n(r,i)}):this.walk((r,i)=>{if(r.type==="atrule"&&r.name===t)return n(r,i)}):(n=t,this.walk((r,i)=>{if(r.type==="atrule")return n(r,i)}))}walkComments(t){return this.walk((n,r)=>{if(n.type==="comment")return t(n,r)})}walkDecls(t,n){return n?t instanceof RegExp?this.walk((r,i)=>{if(r.type==="decl"&&t.test(r.prop))return n(r,i)}):this.walk((r,i)=>{if(r.type==="decl"&&r.prop===t)return n(r,i)}):(n=t,this.walk((r,i)=>{if(r.type==="decl")return n(r,i)}))}walkRules(t,n){return n?t instanceof RegExp?this.walk((r,i)=>{if(r.type==="rule"&&t.test(r.selector))return n(r,i)}):this.walk((r,i)=>{if(r.type==="rule"&&r.selector===t)return n(r,i)}):(n=t,this.walk((r,i)=>{if(r.type==="rule")return n(r,i)}))}};wt.registerParse=e=>{Hh=e};wt.registerRule=e=>{mu=e};wt.registerAtRule=e=>{du=e};wt.registerRoot=e=>{Gh=e};Bh.exports=wt;wt.default=wt;wt.rebuild=e=>{let t=[e];for(;t.length>0;){let n=t.pop();if(n.type==="atrule"?Object.setPrototypeOf(n,du.prototype):n.type==="rule"?Object.setPrototypeOf(n,mu.prototype):n.type==="decl"?Object.setPrototypeOf(n,Dh.prototype):n.type==="comment"?Object.setPrototypeOf(n,Ih.prototype):n.type==="root"&&Object.setPrototypeOf(n,Gh.prototype),n[Oh]=!0,n.nodes)for(let r of n.nodes)t.push(r)}}});var pa=me((MD,Vh)=>{"use strict";var Uh=Pt(),ar=class extends Uh{constructor(t){super(t),this.type="atrule"}append(...t){return this.proxyOf.nodes||(this.nodes=[]),super.append(...t)}prepend(...t){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...t)}};Vh.exports=ar;ar.default=ar;Uh.registerAtRule(ar)});var ha=me((LD,qh)=>{"use strict";var Rw=Pt(),Wh,$h,_n=class extends Rw{constructor(t){super({type:"document",...t}),this.nodes||(this.nodes=[])}toResult(t={}){return new Wh(new $h,this,t).stringify()}};_n.registerLazyResult=e=>{Wh=e};_n.registerProcessor=e=>{$h=e};qh.exports=_n;_n.default=_n});var jh=me((ND,zh)=>{var Tw="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",kw=(e,t=21)=>(n=t)=>{let r="",i=n|0;for(;i-- >0;)r+=e[Math.random()*e.length|0];return r},Mw=(e=21)=>{let t="",n=e|0;for(;n-- >0;)t+=Tw[Math.random()*64|0];return t};zh.exports={nanoid:Mw,customAlphabet:kw}});var ga=me(()=>{});var ba=me(()=>{});var fu=me(()=>{});var Kh=me(()=>{});var pu=me((UD,Qh)=>{"use strict";var{existsSync:Lw,readFileSync:Nw,realpathSync:Fw}=Kh(),{dirname:ya,isAbsolute:Iw,join:Dw,relative:Pw,sep:Ow}=ga(),{SourceMapConsumer:Yh,SourceMapGenerator:Xh}=ba();function Jh(e){try{return Fw(e)}catch{return e}}function Hw(e){return Buffer?Buffer.from(e,"base64").toString():window.atob(e)}var wi=class{constructor(t,n){if(n.map===!1)return;n.unsafeMap&&(this.unsafeMap=!0),this.loadAnnotation(t),this.inline=this.startWith(this.annotation,"data:");let r=n.map?n.map.prev:void 0,i=this.loadMap(n.from,r);!this.mapFile&&n.from&&(this.mapFile=n.from),this.mapFile&&(this.root=ya(this.mapFile)),i&&(this.text=i)}consumer(){return this.consumerCache||(this.consumerCache=new Yh(this.json||this.text)),this.consumerCache}decodeInline(t){let n=/^data:application\\/json;charset=utf-?8;base64,/,r=/^data:application\\/json;base64,/,i=/^data:application\\/json;charset=utf-?8,/,o=/^data:application\\/json,/,a=t.match(i)||t.match(o);if(a)return decodeURIComponent(t.substr(a[0].length));let s=t.match(n)||t.match(r);if(s)return Hw(t.substr(s[0].length));let l=t.slice(22);throw l=l.slice(0,l.indexOf(",")),new Error("Unsupported source map encoding "+l)}getAnnotationURL(t){return t.replace(/^\\/\\*\\s*# sourceMappingURL=/,"").trim()}isMap(t){return typeof t!="object"?!1:typeof t.mappings=="string"||typeof t._mappings=="string"||Array.isArray(t.sections)}loadAnnotation(t){let n=t.match(/\\/\\*\\s*# sourceMappingURL=/g);if(!n)return;let r=t.lastIndexOf(n.pop()),i=t.indexOf("*/",r);r>-1&&i>-1&&(this.annotation=this.getAnnotationURL(t.substring(r,i)))}loadFile(t,n,r){if(!r&&!this.unsafeMap){if(!/\\.map$/i.test(t)||!n)return;let i=Pw(Jh(ya(n)),Jh(t));if(i===".."||i.startsWith(".."+Ow)||Iw(i))return}if(this.root=ya(t),Lw(t))return this.mapFile=t,Nw(t,"utf-8").toString().trim()}loadMap(t,n){if(n===!1)return!1;if(n){if(typeof n=="string")return n;if(typeof n=="function"){let r=n(t);if(r){let i=this.loadFile(r,t,!0);if(!i)throw new Error("Unable to load previous source map: "+r.toString());return i}}else{if(n instanceof Yh)return Xh.fromSourceMap(n).toString();if(n instanceof Xh)return n.toString();if(this.isMap(n))return JSON.stringify(n);throw new Error("Unsupported previous source map format: "+n.toString())}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let r=this.annotation;t&&(r=Dw(ya(t),r));let i=this.loadFile(r,t,!1);if(i)try{this.json=JSON.parse(i.replace(/^\\)]}\'[^\\n]*\\n/,""))}catch{return}return i}}}startWith(t,n){return t?t.substr(0,n.length)===n:!1}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}};Qh.exports=wi;wi.default=wi});var _i=me((VD,rg)=>{"use strict";var{nanoid:Gw}=jh(),{isAbsolute:bu,resolve:yu}=ga(),{SourceMapConsumer:Bw,SourceMapGenerator:Uw}=ba(),{fileURLToPath:Zh,pathToFileURL:xa}=fu(),eg=fa(),Vw=pu(),hu=su(),gu=Symbol("lineToIndexCache"),Ww=!!(Bw&&Uw),tg=!!(yu&&bu);function ng(e){if(e[gu])return e[gu];let t=e.css.split(`\n`),n=new Array(t.length),r=0;for(let i=0,o=t.length;i<o;i++)n[i]=r,r+=t[i].length+1;return e[gu]=n,n}var sr=class{get from(){return this.file||this.id}constructor(t,n={}){if(t===null||typeof t>"u"||typeof t=="object"&&!t.toString)throw new Error(`PostCSS received ${t} instead of CSS string`);if(this.css=t.toString(),this.css[0]==="\\uFEFF"||this.css[0]==="\\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,this.document=this.css,n.document&&(this.document=n.document.toString()),n.from&&(!tg||/^\\w+:\\/\\//.test(n.from)||bu(n.from)?this.file=n.from:this.file=yu(n.from)),tg&&Ww){let r=new Vw(this.css,n);if(r.text){this.map=r;let i=r.consumer().file;!this.file&&i&&(this.file=this.mapResolve(i))}}this.file||(this.id="<input css "+Gw(6)+">"),this.map&&(this.map.file=this.from)}error(t,n,r,i={}){let o,a,s,l,u;if(n&&typeof n=="object"){let f=n,m=r;if(typeof f.offset=="number"){l=f.offset;let p=this.fromOffset(l);n=p.line,r=p.col}else n=f.line,r=f.column,l=this.fromLineAndColumn(n,r);if(typeof m.offset=="number"){s=m.offset;let p=this.fromOffset(s);a=p.line,o=p.col}else a=m.line,o=m.column,s=this.fromLineAndColumn(m.line,m.column)}else if(r)l=this.fromLineAndColumn(n,r);else{l=n;let f=this.fromOffset(l);n=f.line,r=f.col}let d=this.origin(n,r,a,o);return d?u=new eg(t,d.endLine===void 0?d.line:{column:d.column,line:d.line},d.endLine===void 0?d.column:{column:d.endColumn,line:d.endLine},d.source,d.file,i.plugin):u=new eg(t,a===void 0?n:{column:r,line:n},a===void 0?r:{column:o,line:a},this.css,this.file,i.plugin),u.input={column:r,endColumn:o,endLine:a,endOffset:s,line:n,offset:l,source:this.css},this.file&&(xa&&(u.input.url=xa(this.file).toString()),u.input.file=this.file),u}fromLineAndColumn(t,n){return ng(this)[t-1]+n-1}fromOffset(t){let n=ng(this),r=n[n.length-1],i=0;if(t>=r)i=n.length-1;else{let o=n.length-2,a;for(;i<o;)if(a=i+(o-i>>1),t<n[a])o=a-1;else if(t>=n[a+1])i=a+1;else{i=a;break}}return{col:t-n[i]+1,line:i+1}}mapResolve(t){return/^\\w+:\\/\\//.test(t)?t:yu(this.map.consumer().sourceRoot||this.map.root||".",t)}origin(t,n,r,i){if(!this.map)return!1;let o=this.map.consumer(),a=o.originalPositionFor({column:n-1,line:t});if(!a.source)return!1;let s;if(typeof r=="number"){let f=o.originalPositionFor({column:i-1,line:r});f.source&&(s=f)}let l;bu(a.source)?l=xa(a.source):l=new URL(a.source,this.map.consumer().sourceRoot||xa(this.map.mapFile));let u={column:a.column+1,endColumn:s&&s.column+1,endLine:s&&s.line,line:a.line,url:l.toString()};if(l.protocol==="file:")if(Zh)u.file=Zh(l);else throw new Error("file: protocol is not available in this PostCSS build");let d=o.sourceContentFor(a.source);return d&&(u.source=d),u}toJSON(){let t={};for(let n of["hasBOM","css","file","id"])this[n]!=null&&(t[n]=this[n]);return this.map&&(t.map={...this.map},t.map.consumerCache&&(t.map.consumerCache=void 0)),t}};rg.exports=sr;sr.default=sr;hu&&hu.registerInput&&hu.registerInput(sr)});var lr=me((WD,sg)=>{"use strict";var ig=Pt(),og,ag,en=class extends ig{constructor(t){super(t),this.type="root",this.nodes||(this.nodes=[])}normalize(t,n,r){let i=new Set;for(let a of Array.isArray(t)?t:[t])a&&typeof a=="object"&&!a.parent&&a.raws&&typeof a.raws.before<"u"&&i.add(a.raws);let o=super.normalize(t);if(n){if(r==="prepend")this.nodes.length>1?n.raws.before=this.nodes[1].raws.before:delete n.raws.before;else if(this.first!==n)for(let a of o)i.has(a.raws)||(a.raws.before=n.raws.before)}return o}removeChild(t,n){let r=this.index(t);return!n&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(t)}toResult(t={}){return new og(new ag,this,t).stringify()}};en.registerLazyResult=e=>{og=e};en.registerProcessor=e=>{ag=e};sg.exports=en;en.default=en;ig.registerRoot(en)});var xu=me(($D,lg)=>{"use strict";var Ci={comma(e){return Ci.split(e,[","],!0)},space(e){let t=[" ",`\n`,"	"];return Ci.split(e,t)},split(e,t,n){if(typeof e!="string")return[];let r=[],i="",o=!1,a=0,s=!1,l="",u=!1;for(let d of e)u?u=!1:d==="\\\\"?u=!0:s?d===l&&(s=!1):d===\'"\'||d==="\'"?(s=!0,l=d):d==="("?a+=1:d===")"?a>0&&(a-=1):a===0&&t.includes(d)&&(o=!0),o?(i!==""&&r.push(i.trim()),i="",o=!1):i+=d;return(n||i!=="")&&r.push(i.trim()),r}};lg.exports=Ci;Ci.default=Ci});var Sa=me((qD,cg)=>{"use strict";var ug=Pt(),$w=xu(),ur=class extends ug{get selectors(){return $w.comma(this.selector)}set selectors(t){let n=this.selector?this.selector.match(/,\\s*/):null,r=n?n[0]:","+this.raw("between","beforeOpen");this.selector=t.join(r)}constructor(t){super(t),this.type="rule",this.nodes||(this.nodes=[])}};cg.exports=ur;ur.default=ur;ug.registerRule(ur)});var fg=me((zD,mg)=>{"use strict";var qw=pa(),zw=vi(),jw=Ai(),Kw=_i(),Yw=pu(),Xw=lr(),Jw=Sa();function dg(e,t){return e.inputs?e.inputs.map(n=>{let r={...n,__proto__:Kw.prototype};return r.map&&(r.map={...r.map,__proto__:Yw.prototype}),r}):t}function Qw(e,t,n){let r={...e};if(delete r.inputs,delete r.nodes,r.source){let{inputId:o,...a}=r.source;r.source=a,o!=null&&(r.source.input=t[o])}let i;if(r.type==="root")i=new Xw(r);else if(r.type==="decl")i=new jw(r);else if(r.type==="rule")i=new Jw(r);else if(r.type==="comment")i=new zw(r);else if(r.type==="atrule")i=new qw(r);else throw new Error("Unknown node type: "+e.type);if(n){i.nodes=n;for(let o of n)o.parent=i}return i}function va(e,t){if(Array.isArray(e))return e.map(i=>va(i));let n,r=[{childIndex:0,children:[],inputs:dg(e,t),json:e}];for(;r.length>0;){let i=r[r.length-1],o=i.json.nodes;if(o&&i.childIndex<o.length){let s=o[i.childIndex];i.childIndex+=1,r.push({childIndex:0,children:[],inputs:dg(s,i.inputs),json:s});continue}r.pop();let a=Qw(i.json,i.inputs,o?i.children:void 0);r.length>0?r[r.length-1].children.push(a):n=a}return n}mg.exports=va;va.default=va});var vu=me((jD,xg)=>{"use strict";var{dirname:Ea,relative:hg,resolve:gg,sep:bg}=ga(),{SourceMapConsumer:yg,SourceMapGenerator:Aa}=ba(),{pathToFileURL:pg}=fu(),Zw=_i(),e_=!!(yg&&Aa),t_=!!(Ea&&gg&&hg&&bg),Su=class{constructor(t,n,r,i){this.stringify=t,this.mapOpts=r.map||{},this.root=n,this.opts=r,this.css=i,this.originalCSS=i,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,this.memoizedFileURLs=new Map,this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let t;this.isInline()?t="data:application/json;base64,"+this.toBase64(this.map.toString()):typeof this.mapOpts.annotation=="string"?t=this.mapOpts.annotation:typeof this.mapOpts.annotation=="function"?t=this.mapOpts.annotation(this.opts.to,this.root):t=this.outputFile()+".map";let n=`\n`;this.css.includes(`\\r\n`)&&(n=`\\r\n`),this.css+=n+"/*# sourceMappingURL="+t+" */"}applyPrevMaps(){for(let t of this.previous()){let n=this.toUrl(this.path(t.file)),r=t.root||Ea(t.file),i;this.mapOpts.sourcesContent===!1?(i=new yg(t.text),i.sourcesContent&&(i.sourcesContent=null)):i=t.consumer(),this.map.applySourceMap(i,n,this.toUrl(this.path(r)))}}clearAnnotation(){if(this.mapOpts.annotation!==!1){if(this.root){let t;for(let n=this.root.nodes.length-1;n>=0;n--)t=this.root.nodes[n],t.type==="comment"&&t.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(n)}else if(this.css){let t;for(;(t=this.css.lastIndexOf("/*#"))!==-1;){let n=this.css.indexOf("*/",t+3);if(n===-1)break;for(;t>0&&this.css[t-1]===`\n`;)t--;this.css=this.css.slice(0,t)+this.css.slice(n+2)}}}}generate(){if(this.clearAnnotation(),t_&&e_&&this.isMap())return this.generateMap();{let t="";return this.stringify(this.root,n=>{t+=n}),[t]}}generateMap(){if(this.root)this.generateString();else if(this.previous().length===1){let t=this.previous()[0].consumer();t.file=this.outputFile(),this.map=Aa.fromSourceMap(t,{ignoreInvalidMapping:!0})}else this.map=new Aa({file:this.outputFile(),ignoreInvalidMapping:!0}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}generateString(){this.css="",this.map=new Aa({file:this.outputFile(),ignoreInvalidMapping:!0});let t=1,n=1,r="<no source>",i={generated:{column:0,line:0},original:{column:0,line:0},source:""},o,a;this.stringify(this.root,(s,l,u)=>{if(this.css+=s,l&&u!=="end"&&(i.generated.line=t,i.generated.column=n-1,l.source&&l.source.start?(i.source=this.sourcePath(l),i.original.line=l.source.start.line,i.original.column=l.source.start.column-1,this.map.addMapping(i)):(i.source=r,i.original.line=1,i.original.column=0,this.map.addMapping(i))),a=s.match(/\\n/g),a?(t+=a.length,o=s.lastIndexOf(`\n`),n=s.length-o):n+=s.length,l&&u!=="start"){let d=l.parent||{raws:{}};(!(l.type==="decl"||l.type==="atrule"&&!l.nodes)||l!==d.last||d.raws.semicolon)&&(l.source&&l.source.end?(i.source=this.sourcePath(l),i.original.line=l.source.end.line,i.original.column=l.source.end.column-1,i.generated.line=t,i.generated.column=n-2,this.map.addMapping(i)):(i.source=r,i.original.line=1,i.original.column=0,i.generated.line=t,i.generated.column=n-1,this.map.addMapping(i)))}})}isAnnotation(){return this.isInline()?!0:typeof this.mapOpts.annotation<"u"?this.mapOpts.annotation:this.previous().length?this.previous().some(t=>t.annotation):!0}isInline(){if(typeof this.mapOpts.inline<"u")return this.mapOpts.inline;let t=this.mapOpts.annotation;return typeof t<"u"&&t!==!0?!1:this.previous().length?this.previous().some(n=>n.inline):!0}isMap(){return typeof this.opts.map<"u"?!!this.opts.map:this.previous().length>0}isSourcesContent(){return typeof this.mapOpts.sourcesContent<"u"?this.mapOpts.sourcesContent:this.previous().length?this.previous().some(t=>t.withContent()):!0}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}path(t){if(this.mapOpts.absolute||t.charCodeAt(0)===60||/^\\w+:\\/\\//.test(t))return t;let n=this.memoizedPaths.get(t);if(n)return n;let r=this.opts.to?Ea(this.opts.to):".";typeof this.mapOpts.annotation=="string"&&(r=Ea(gg(r,this.mapOpts.annotation)));let i=hg(r,t);return this.memoizedPaths.set(t,i),i}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk(t=>{if(t.source&&t.source.input.map){let n=t.source.input.map;this.previousMaps.includes(n)||this.previousMaps.push(n)}});else{let t=new Zw(this.originalCSS,this.opts);t.map&&this.previousMaps.push(t.map)}return this.previousMaps}setSourcesContent(){let t={};if(this.root)this.root.walk(n=>{if(n.source){let r=n.source.input.from;if(r&&!t[r]){t[r]=!0;let i=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r));this.map.setSourceContent(i,n.source.input.css)}}});else if(this.css){let n=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(n,this.css)}}sourcePath(t){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(t.source.input.from):this.toUrl(this.path(t.source.input.from))}toBase64(t){return Buffer?Buffer.from(t).toString("base64"):window.btoa(unescape(encodeURIComponent(t)))}toFileUrl(t){let n=this.memoizedFileURLs.get(t);if(n)return n;if(pg){let r=pg(t).toString();return this.memoizedFileURLs.set(t,r),r}else throw new Error("`map.absolute` option is not available in this PostCSS build")}toUrl(t){let n=this.memoizedURLs.get(t);if(n)return n;bg==="\\\\"&&(t=t.replace(/\\\\/g,"/"));let r=encodeURI(t).replace(/[#?]/g,encodeURIComponent);return this.memoizedURLs.set(t,r),r}};xg.exports=Su});var Eg=me((KD,vg)=>{"use strict";var wa=/[\\t\\n\\f\\r "#\'()/;[\\\\\\]{}]/g,_a=/[\\t\\n\\f\\r !"#\'():;@[\\\\\\]{}]|\\/(?=\\*)/g,n_=/.[\\r\\n"\'(/\\\\]/,Sg=/[\\da-f]/i;vg.exports=function(t,n={}){let r=t.css.valueOf(),i=n.ignoreErrors,o,a,s,l,u,d,f,m,p,g,b=r.length,y=0,v=[],A=[],E=-1;function T(){return y}function P(M){throw t.error("Unclosed "+M,y)}function N(){return A.length===0&&y>=b}function D(M){if(A.length)return A.pop();if(y>=b)return;let k=M?M.ignoreUnclosed:!1;switch(o=r.charCodeAt(y),o){case 10:case 32:case 9:case 13:case 12:{l=y;do l+=1,o=r.charCodeAt(l);while(o===32||o===10||o===9||o===13||o===12);d=["space",r.slice(y,l)],y=l-1;break}case 91:case 93:case 123:case 125:case 58:case 59:case 41:{let U=String.fromCharCode(o);d=[U,U,y];break}case 40:{if(g=v.length?v.pop()[1]:"",p=r.charCodeAt(y+1),g==="url"&&p!==39&&p!==34&&p!==32&&p!==10&&p!==9&&p!==12&&p!==13){l=y;do{if(f=!1,l=r.indexOf(")",l+1),l===-1)if(i||k){l=y;break}else P("bracket");for(m=l;r.charCodeAt(m-1)===92;)m-=1,f=!f}while(f);d=["brackets",r.slice(y,l+1),y,l],y=l}else y<=E?d=["(","(",y]:(l=r.indexOf(")",y+1),a=r.slice(y,l+1),l===-1||n_.test(a)?(E=l===-1?b:l,d=["(","(",y]):(d=["brackets",a,y,l],y=l));break}case 39:case 34:{u=o===39?"\'":\'"\',l=y;do{if(f=!1,l=r.indexOf(u,l+1),l===-1)if(i||k){l=y+1;break}else P("string");for(m=l;r.charCodeAt(m-1)===92;)m-=1,f=!f}while(f);d=["string",r.slice(y,l+1),y,l],y=l;break}case 64:{wa.lastIndex=y+1,wa.test(r),wa.lastIndex===0?l=r.length-1:l=wa.lastIndex-2,d=["at-word",r.slice(y,l+1),y,l],y=l;break}case 92:{for(l=y,s=!0;r.charCodeAt(l+1)===92;)l+=1,s=!s;if(o=r.charCodeAt(l+1),s&&o!==47&&o!==32&&o!==10&&o!==9&&o!==13&&o!==12&&(l+=1,Sg.test(r.charAt(l)))){for(;Sg.test(r.charAt(l+1));)l+=1;r.charCodeAt(l+1)===32&&(l+=1)}d=["word",r.slice(y,l+1),y,l],y=l;break}default:{o===47&&r.charCodeAt(y+1)===42?(l=r.indexOf("*/",y+2)+1,l===0&&(i||k?l=r.length:P("comment")),d=["comment",r.slice(y,l+1),y,l],y=l):(_a.lastIndex=y+1,_a.test(r),_a.lastIndex===0?l=r.length-1:l=_a.lastIndex-2,d=["word",r.slice(y,l+1),y,l],v.push(d),y=l);break}}return y++,d}function R(M){A.push(M)}return{back:R,endOfFile:N,nextToken:D,position:T}}});var Cg=me((YD,_g)=>{"use strict";var r_=pa(),i_=vi(),o_=Ai(),a_=lr(),Ag=Sa(),s_=Eg(),wg={empty:!0,space:!0};function l_(e){for(let t=e.length-1;t>=0;t--){let n=e[t],r=n[3]||n[2];if(r)return r}}function Eu(e,t,n){let r="";for(let i=t;i<n;i++)r+=e[i][1];return r}var Au=class{constructor(t){this.input=t,this.root=new a_,this.current=this.root,this.spaces="",this.semicolon=!1,this.createTokenizer(),this.root.source={input:t,start:{column:1,line:1,offset:0}}}atrule(t){let n=new r_;n.name=t[1].slice(1),n.name===""&&this.unnamedAtrule(n,t),this.init(n,t[2]);let r,i,o,a=!1,s=!1,l=[],u=[];for(;!this.tokenizer.endOfFile();){if(t=this.tokenizer.nextToken(),r=t[0],r==="("||r==="["?u.push(r==="("?")":"]"):r==="{"&&u.length>0?u.push("}"):r===u[u.length-1]&&u.pop(),u.length===0)if(r===";"){n.source.end=this.getPosition(t[2]),n.source.end.offset++,this.semicolon=!0;break}else if(r==="{"){s=!0;break}else if(r==="}"){if(l.length>0){for(o=l.length-1,i=l[o];i&&i[0]==="space";)i=l[--o];i&&(n.source.end=this.getPosition(i[3]||i[2]),n.source.end.offset++)}this.end(t);break}else l.push(t);else l.push(t);if(this.tokenizer.endOfFile()){a=!0;break}}n.raws.between=this.spacesAndCommentsFromEnd(l),l.length?(n.raws.afterName=this.spacesAndCommentsFromStart(l),this.raw(n,"params",l),a&&(t=l[l.length-1],n.source.end=this.getPosition(t[3]||t[2]),n.source.end.offset++,this.spaces=n.raws.between,n.raws.between="")):(n.raws.afterName="",n.params=""),s&&(n.nodes=[],this.current=n)}checkMissedSemicolon(t){let n=this.colon(t);if(n===!1)return;let r=0,i;for(let o=n-1;o>=0&&(i=t[o],!(i[0]!=="space"&&(r+=1,r===2)));o--);throw this.input.error("Missed semicolon",i[0]==="word"?i[3]+1:i[2])}colon(t){let n=0,r,i,o;for(let[a,s]of t.entries()){if(i=s,o=i[0],o==="("&&(n+=1),o===")"&&(n-=1),n===0&&o===":")if(!r)this.doubleColon(i);else{if(r[0]==="word"&&r[1]==="progid")continue;return a}r=i}return!1}comment(t){let n=new i_;this.init(n,t[2]),n.source.end=this.getPosition(t[3]||t[2]),n.source.end.offset++;let r=t[1].slice(2,-2);if(!r.trim())n.text="",n.raws.left=r,n.raws.right="";else{let i=r.match(/^(\\s*)([^]*\\S)(\\s*)$/);n.text=i[2],n.raws.left=i[1],n.raws.right=i[3]}}createTokenizer(){this.tokenizer=s_(this.input)}decl(t,n){let r=new o_;this.init(r,t[0][2]);let i=t[t.length-1];i[0]===";"&&(this.semicolon=!0,t.pop()),r.source.end=this.getPosition(i[3]||i[2]||l_(t)),r.source.end.offset++;let o=0;for(;t[o][0]!=="word";)o===t.length-1&&this.unknownWord([t[o]]),o++;r.raws.before+=Eu(t,0,o),r.source.start=this.getPosition(t[o][2]);let a=o;for(;o<t.length;){let m=t[o][0];if(m===":"||m==="space"||m==="comment")break;o++}r.prop=Eu(t,a,o);let s=o,l;for(;o<t.length&&(l=t[o],o++,l[0]!==":");)l[0]==="word"&&/\\w/.test(l[1])&&this.unknownWord([l]);r.raws.between=Eu(t,s,o),(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let u=o;for(;o<t.length;){let m=t[o][0];if(m!=="space"&&m!=="comment")break;o++}let d=t.slice(u,o);t=t.slice(o),this.precheckMissedSemicolon(t);for(let m=t.length-1;m>=0;m--){if(l=t[m],l[1].toLowerCase()==="!important"){r.important=!0;let p=this.stringFrom(t,m);p=this.spacesFromEnd(t)+p,p!==" !important"&&(r.raws.important=p);break}else if(l[1].toLowerCase()==="important"){let p=t.slice(0),g="";for(let b=m;b>0;b--){let y=p[b][0];if(g.trim().startsWith("!")&&y!=="space")break;g=p.pop()[1]+g}g.trim().startsWith("!")&&(r.important=!0,r.raws.important=g,t=p)}if(l[0]!=="space"&&l[0]!=="comment")break}t.some(m=>m[0]!=="space"&&m[0]!=="comment")&&(r.raws.between+=d.map(m=>m[1]).join(""),d=[]),this.raw(r,"value",d.concat(t),n),r.value.includes(":")&&!n&&this.checkMissedSemicolon(t)}doubleColon(t){throw this.input.error("Double colon",{offset:t[2]},{offset:t[2]+t[1].length})}emptyRule(t){let n=new Ag;this.init(n,t[2]),n.selector="",n.raws.between="",this.current=n}end(t){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(t[2]),this.current.source.end.offset++,this.current=this.current.parent):this.unexpectedClose(t)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.root.source.end=this.getPosition(this.tokenizer.position())}freeSemicolon(t){if(this.spaces+=t[1],this.current.nodes){let n=this.current.nodes[this.current.nodes.length-1];n&&n.type==="rule"&&!n.raws.ownSemicolon&&(n.raws.ownSemicolon=this.spaces,this.spaces="",n.source.end=this.getPosition(t[2]),n.source.end.offset+=n.raws.ownSemicolon.length)}}getPosition(t){let n=this.input.fromOffset(t);return{column:n.col,line:n.line,offset:t}}init(t,n){this.current.push(t),t.source={input:this.input,start:this.getPosition(n)},t.raws.before=this.spaces,this.spaces="",t.type!=="comment"&&(this.semicolon=!1)}other(t){let n=!1,r=null,i=!1,o=null,a=[],s=t[1].startsWith("--"),l=[],u=t;for(;u;){if(r=u[0],l.push(u),r==="("||r==="[")o||(o=u),a.push(r==="("?")":"]");else if(s&&i&&r==="{")o||(o=u),a.push("}");else if(a.length===0)if(r===";")if(i){this.decl(l,s);return}else break;else if(r==="{"){this.rule(l);return}else if(r==="}"){this.tokenizer.back(l.pop()),n=!0;break}else r===":"&&(i=!0);else r===a[a.length-1]&&(a.pop(),a.length===0&&(o=null));u=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(n=!0),a.length>0&&this.unclosedBracket(o),n&&i){if(!s)for(;l.length&&(u=l[l.length-1][0],!(u!=="space"&&u!=="comment"));)this.tokenizer.back(l.pop());this.decl(l,s)}else this.unknownWord(l)}parse(){let t;for(;!this.tokenizer.endOfFile();)switch(t=this.tokenizer.nextToken(),t[0]){case"space":this.spaces+=t[1];break;case";":this.freeSemicolon(t);break;case"}":this.end(t);break;case"comment":this.comment(t);break;case"at-word":this.atrule(t);break;case"{":this.emptyRule(t);break;default:this.other(t);break}this.endFile()}precheckMissedSemicolon(){}raw(t,n,r,i){let o,a,s=r.length,l="",u=!0,d,f;for(let m=0;m<s;m+=1)o=r[m],a=o[0],a==="space"&&m===s-1&&!i?u=!1:a==="comment"?(f=r[m-1]?r[m-1][0]:"empty",d=r[m+1]?r[m+1][0]:"empty",!wg[f]&&!wg[d]?l.slice(-1)===","?u=!1:l+=o[1]:u=!1):l+=o[1];if(!u){let m=r.reduce((p,g)=>p+g[1],"");t.raws[n]={raw:m,value:l}}t[n]=l}rule(t){t.pop();let n=new Ag;this.init(n,t[0][2]),n.raws.between=this.spacesAndCommentsFromEnd(t),this.raw(n,"selector",t),this.current=n}spacesAndCommentsFromEnd(t){let n,r="";for(;t.length&&(n=t[t.length-1][0],!(n!=="space"&&n!=="comment"));)r=t.pop()[1]+r;return r}spacesAndCommentsFromStart(t){let n,r="";for(;t.length&&(n=t[0][0],!(n!=="space"&&n!=="comment"));)r+=t.shift()[1];return r}spacesFromEnd(t){let n,r="";for(;t.length&&(n=t[t.length-1][0],n==="space");)r=t.pop()[1]+r;return r}stringFrom(t,n){let r="";for(let i=n;i<t.length;i++)r+=t[i][1];return t.splice(n,t.length-n),r}unclosedBlock(){let t=this.current.source.start;throw this.input.error("Unclosed block",t.line,t.column)}unclosedBracket(t){throw this.input.error("Unclosed bracket",{offset:t[2]},{offset:t[2]+1})}unexpectedClose(t){throw this.input.error("Unexpected }",{offset:t[2]},{offset:t[2]+1})}unknownWord(t){throw this.input.error("Unknown word "+t[0][1],{offset:t[0][2]},{offset:t[0][2]+t[0][1].length})}unnamedAtrule(t,n){throw this.input.error("At-rule without name",{offset:n[2]},{offset:n[2]+n[1].length})}};_g.exports=Au});var Ra=me((XD,Rg)=>{"use strict";var u_=Pt(),c_=_i(),d_=Cg();function Ca(e,t){let n=new c_(e,t),r=new d_(n);try{r.parse()}catch(i){throw i}return r.root}Rg.exports=Ca;Ca.default=Ca;u_.registerParse(Ca)});var wu=me((JD,Tg)=>{"use strict";var m_=Pt(),{my:f_}=gi(),Ri=class{constructor(t,n={}){if(this.type="warning",this.text=t,n.node&&n.node.source){n.node[f_]||m_.rebuild(n.node);let r=n.node.rangeBy(n);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in n)this[r]=n[r]}toString(){return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Tg.exports=Ri;Ri.default=Ri});var Ta=me((QD,kg)=>{"use strict";var p_=wu(),Ti=class{get content(){return this.css}constructor(t,n,r){this.processor=t,this.messages=[],this.root=n,this.opts=r,this.css="",this.map=void 0}toString(){return this.css}warn(t,n={}){n.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(n.plugin=this.lastPlugin.postcssPlugin);let r=new p_(t,n);return this.messages.push(r),r}warnings(){return this.messages.filter(t=>t.type==="warning")}};kg.exports=Ti;Ti.default=Ti});var _u=me((ZD,Lg)=>{"use strict";var Mg={};Lg.exports=function(t){Mg[t]||(Mg[t]=!0,typeof console<"u"&&console.warn&&console.warn(t))}});var Tu=me((tP,Dg)=>{"use strict";var h_=Pt(),g_=ha(),b_=vu(),y_=Ra(),Ng=Ta(),x_=lr(),S_=hi(),{isClean:mt,my:v_}=gi(),eP=_u(),E_={atrule:"AtRule",comment:"Comment",decl:"Declaration",document:"Document",root:"Root",rule:"Rule"},A_={AtRule:!0,AtRuleExit:!0,Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,RootExit:!0,Rule:!0,RuleExit:!0},w_={Once:!0,postcssPlugin:!0,prepare:!0},cr=0;function ki(e){return typeof e=="object"&&typeof e.then=="function"}function Cu(e){let t=!1,n=E_[e.type];return e.type==="decl"?t=e.prop.toLowerCase():e.type==="atrule"&&(t=e.name.toLowerCase()),t&&e.append?[n,n+"-"+t,cr,n+"Exit",n+"Exit-"+t]:t?[n,n+"-"+t,n+"Exit",n+"Exit-"+t]:e.append?[n,cr,n+"Exit"]:[n,n+"Exit"]}function Fg(e){let t;return e.type==="document"?t=["Document",cr,"DocumentExit"]:e.type==="root"?t=["Root",cr,"RootExit"]:t=Cu(e),{eventIndex:0,events:t,iterator:0,node:e,visitorIndex:0,visitors:[]}}function Ig(e){let t=[e];for(;t.length>0;){let n=t.pop();if(n[mt]=!1,n.nodes)for(let r of n.nodes)t.push(r)}return e}var Ru={},tn=class e{get content(){return this.stringify().content}get css(){return this.stringify().css}get map(){return this.stringify().map}get messages(){return this.sync().messages}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){return this.sync().root}get[Symbol.toStringTag](){return"LazyResult"}constructor(t,n,r){this.stringified=!1,this.processed=!1;let i;if(typeof n=="object"&&n!==null&&(n.type==="root"||n.type==="document"))i=Ig(n);else if(n instanceof e||n instanceof Ng)i=Ig(n.root),n.map&&(typeof r.map>"u"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=n.map);else{let o=y_;r.syntax&&(o=r.syntax.parse),r.parser&&(o=r.parser),o.parse&&(o=o.parse);try{i=o(n,r)}catch(a){this.processed=!0,this.error=a}i&&!i[v_]&&h_.rebuild(i)}this.result=new Ng(t,i,r),this.helpers={...Ru,postcss:Ru,result:this.result},this.plugins=this.processor.plugins.map(o=>typeof o=="object"&&o.prepare?{...o,...o.prepare(this.result)}:o)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}catch(t){return this.async().catch(t)}finally(t){return this.async().then(t,t)}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(t,n){let r=this.result.lastPlugin;try{n&&n.addToError(t),this.error=t,t.name==="CssSyntaxError"&&!t.plugin?(t.plugin=r.postcssPlugin,t.setMessage()):r.postcssVersion}catch(i){console&&console.error&&console.error(i)}return t}prepareVisitors(){this.listeners={};let t=(n,r,i)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([n,i])};for(let n of this.plugins)if(typeof n=="object")for(let r in n){if(!A_[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${n.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!w_[r])if(typeof n[r]=="object")for(let i in n[r])i==="*"?t(n,r,n[r][i]):t(n,r+"-"+i.toLowerCase(),n[r][i]);else typeof n[r]=="function"&&t(n,r,n[r])}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){this.plugin=0;for(let t=0;t<this.plugins.length;t++){let n=this.plugins[t],r=this.runOnRoot(n);if(ki(r))try{await r}catch(i){throw this.handleError(i)}}if(this.prepareVisitors(),this.hasListener){let t=this.result.root;for(;!t[mt];){t[mt]=!0;let n=[Fg(t)];for(;n.length>0;){let r=this.visitTick(n);if(ki(r))try{await r}catch(i){let o=n[n.length-1].node;throw this.handleError(i,o)}}}if(this.listeners.OnceExit)for(let[n,r]of this.listeners.OnceExit){this.result.lastPlugin=n;try{if(t.type==="document"){let i=t.nodes.map(o=>r(o,this.helpers));await Promise.all(i)}else await r(t,this.helpers)}catch(i){throw this.handleError(i)}}}return this.processed=!0,this.stringify()}runOnRoot(t){this.result.lastPlugin=t;try{if(typeof t=="object"&&t.Once){if(this.result.root.type==="document"){let n=this.result.root.nodes.map(r=>t.Once(r,this.helpers));return ki(n[0])?Promise.all(n):n}return t.Once(this.result.root,this.helpers)}else if(typeof t=="function")return t(this.result.root,this.result)}catch(n){throw this.handleError(n)}}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let t=this.result.opts,n=S_;t.syntax&&(n=t.syntax.stringify),t.stringifier&&(n=t.stringifier),n.stringify&&(n=n.stringify);let r=this.result.root.source;if(t.map===void 0&&!(r&&r.input&&r.input.map)){let a="";return n(this.result.root,s=>{a+=s}),this.result.css=a,this.result}let o=new b_(n,this.result.root,this.result.opts).generate();return this.result.css=o[0],this.result.map=o[1],this.result}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let t of this.plugins){let n=this.runOnRoot(t);if(ki(n))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let t=this.result.root;for(;!t[mt];)t[mt]=!0,this.walkSync(t);if(this.listeners.OnceExit)if(t.type==="document")for(let n of t.nodes)this.visitSync(this.listeners.OnceExit,n);else this.visitSync(this.listeners.OnceExit,t)}return this.result}then(t,n){return this.async().then(t,n)}toString(){return this.css}visitSync(t,n){for(let[r,i]of t){this.result.lastPlugin=r;let o;try{o=i(n,this.helpers)}catch(a){throw this.handleError(a,n.proxyOf)}if(n.type!=="root"&&n.type!=="document"&&!n.parent)return!0;if(ki(o))throw this.getAsyncError()}}visitTick(t){let n=t[t.length-1],{node:r,visitors:i}=n;if(r.type!=="root"&&r.type!=="document"&&!r.parent){t.pop();return}if(i.length>0&&n.visitorIndex<i.length){let[a,s]=i[n.visitorIndex];n.visitorIndex+=1,n.visitorIndex===i.length&&(n.visitors=[],n.visitorIndex=0),this.result.lastPlugin=a;try{return s(r.toProxy(),this.helpers)}catch(l){throw this.handleError(l,r)}}if(n.iterator!==0){let a=n.iterator;n.descending&&(n.descending=!1,r.indexes[a]+=1);let s;for(;s=r.nodes[r.indexes[a]];){if(!s[mt]){s[mt]=!0,n.descending=!0,t.push(Fg(s));return}r.indexes[a]+=1}n.iterator=0,delete r.indexes[a]}let o=n.events;for(;n.eventIndex<o.length;){let a=o[n.eventIndex];if(n.eventIndex+=1,a===cr){r.nodes&&r.nodes.length&&(r[mt]=!0,n.iterator=r.getIterator());return}else if(this.listeners[a]){n.visitors=this.listeners[a];return}}t.pop()}walkSync(t){t[mt]=!0;let n=[{eventIndex:0,events:Cu(t),iterator:0,node:t}];for(;n.length>0;){let r=n[n.length-1],i=r.node;if(r.iterator!==0){let o=r.iterator;r.descending&&(r.descending=!1,i.indexes[o]+=1);let a,s=!1;for(;a=i.nodes[i.indexes[o]];){if(!a[mt]){a[mt]=!0,r.descending=!0,n.push({eventIndex:0,events:Cu(a),iterator:0,node:a}),s=!0;break}i.indexes[o]+=1}if(s)continue;r.iterator=0,delete i.indexes[o]}if(r.eventIndex<r.events.length){let o=r.events[r.eventIndex];if(r.eventIndex+=1,o===cr)i.nodes&&i.nodes.length&&(r.iterator=i.getIterator());else{let a=this.listeners[o];a&&this.visitSync(a,i.toProxy())&&n.pop()}continue}n.pop()}}warnings(){return this.sync().warnings()}};tn.registerPostcss=e=>{Ru=e};Dg.exports=tn;tn.default=tn;x_.registerLazyResult(tn);g_.registerLazyResult(tn)});var Og=me((rP,Pg)=>{"use strict";var __=vu(),C_=Ra(),R_=Ta(),T_=hi(),nP=_u(),Mi=class{get content(){return this.result.css}get css(){return this.result.css}get map(){return this.result.map}get messages(){return[]}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){if(this._root)return this._root;let t,n=C_;try{t=n(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=t,t}get[Symbol.toStringTag](){return"NoWorkResult"}constructor(t,n,r){n=n.toString(),this.stringified=!1,this._processor=t,this._css=n,this._opts=r,this._map=void 0;let i=T_;this.result=new R_(this._processor,void 0,this._opts),this.result.css=n;let o=this;Object.defineProperty(this.result,"root",{get(){return o.root}});let a=new __(i,void 0,this._opts,n);if(a.isMap()){let[s,l]=a.generate();s&&(this.result.css=s),l&&(this.result.map=l)}else a.clearAnnotation(),this.result.css=a.css}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}catch(t){return this.async().catch(t)}finally(t){return this.async().then(t,t)}sync(){if(this.error)throw this.error;return this.result}then(t,n){return this.async().then(t,n)}toString(){return this._css}warnings(){return[]}};Pg.exports=Mi;Mi.default=Mi});var Gg=me((iP,Hg)=>{"use strict";var k_=ha(),M_=Tu(),L_=Og(),N_=lr(),Cn=class{constructor(t=[]){this.version="8.5.26",this.plugins=this.normalize(t)}normalize(t){let n=[];for(let r of t)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))n=n.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)n.push(r);else if(typeof r=="function")n.push(r);else if(!(typeof r=="object"&&(r.parse||r.stringify)))throw new Error(r+" is not a PostCSS plugin");return n}process(t,n={}){return!this.plugins.length&&!n.parser&&!n.stringifier&&!n.syntax?new L_(this,t,n):new M_(this,t,n)}use(t){return this.plugins=this.plugins.concat(this.normalize([t])),this}};Hg.exports=Cn;Cn.default=Cn;N_.registerProcessor(Cn);k_.registerProcessor(Cn)});var jg=me((oP,zg)=>{"use strict";var Bg=pa(),Ug=vi(),F_=Pt(),I_=fa(),Vg=Ai(),Wg=ha(),D_=fg(),P_=_i(),O_=Tu(),H_=xu(),G_=xi(),B_=Ra(),ku=Gg(),U_=Ta(),$g=lr(),qg=Sa(),V_=hi(),W_=wu();function Se(...e){return e.length===1&&Array.isArray(e[0])&&(e=e[0]),new ku(e)}Se.plugin=function(t,n){let r=!1;function i(...a){console&&console.warn&&!r&&(r=!0,console.warn(t+`: postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration`),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(t+`: \\u91CC\\u9762 postcss.plugin \\u88AB\\u5F03\\u7528. \\u8FC1\\u79FB\\u6307\\u5357:\nhttps://www.w3ctech.com/topic/2226`));let s=n(...a);return s.postcssPlugin=t,s.postcssVersion=new ku().version,s}let o;return Object.defineProperty(i,"postcss",{get(){return o||(o=i()),o}}),i.process=function(a,s,l){return Se([i(l)]).process(a,s)},i};Se.stringify=V_;Se.parse=B_;Se.fromJSON=D_;Se.list=H_;Se.comment=e=>new Ug(e);Se.atRule=e=>new Bg(e);Se.decl=e=>new Vg(e);Se.rule=e=>new qg(e);Se.root=e=>new $g(e);Se.document=e=>new Wg(e);Se.CssSyntaxError=I_;Se.Declaration=Vg;Se.Container=F_;Se.Processor=ku;Se.Document=Wg;Se.Comment=Ug;Se.Warning=W_;Se.AtRule=Bg;Se.Result=U_;Se.Input=P_;Se.Rule=qg;Se.Root=$g;Se.Node=G_;O_.registerPostcss(Se);zg.exports=Se;Se.default=Se});function sm(e){return e?/[\\w-]/.test(e)||e.charCodeAt(0)>=128:!1}function lm(e){return e===" "||e==="	"||e===`\n`||e==="\\r"||e==="\\f"}var zS=/^[0-9a-fA-F]{1,6}/;function jS(e){let t=e>=55296&&e<=57343;return e===0||e>1114111||t?65533:e}function um(e,t){return e[t]==="\\r"&&e[t+1]===`\n`?t+2:lm(e[t])?t+1:t}function Ms(e,t){let n=e[t+1];if(n===void 0||/[\\n\\r\\f]/.test(n))return null;let r=zS.exec(e.slice(t+1,t+7));if(!r)return{value:n,end:t+2};let i=jS(Number.parseInt(r[0],16));return{value:String.fromCodePoint(i),end:um(e,t+1+r[0].length)}}function KS(e,t){let n=i=>sm(i)&&!/[0-9-]/.test(i),r=i=>e[i]==="\\\\"&&Ms(e,i)!==null;return e[t]==="-"?e[t+1]==="-"||n(e[t+1])||r(t+1):n(e[t])||r(t)}function bo(e,t){let n=t;for(;e.startsWith("/*",n);){let r=e.indexOf("*/",n+2);n=r<0?e.length:r+2}return n}function Fr(e,t){let n=bo(e,t);for(;lm(e[n]);)n=bo(e,n+1);return n}function Ir(e,t){if(!KS(e,t))return null;let n=t,r="";for(;n<e.length;){let i=e[n];if(i==="\\\\"){let o=Ms(e,n);if(!o)break;r+=o.value,n=o.end;continue}if(!sm(i))break;r+=i,n+=1}return n===t?null:{value:r,end:n}}var Ls=45;function cm(e){return e>=48&&e<=57}function YS(e){return e>=128||e===Ls||e===95||cm(e)||e>=65&&e<=90||e>=97&&e<=122}function XS(e,t){let n=e.charCodeAt(t);return n>=1&&n<=31||n===127?!0:cm(n)?t===0||t===1&&e.charCodeAt(0)===Ls:!1}function Mt(e){let t="";for(let n=0;n<e.length;n+=1){let r=e.charCodeAt(n),i=e[n];r===0?t+="\\uFFFD":XS(e,n)?t+=`\\\\${r.toString(16)} `:n===0&&e.length===1&&r===Ls?t+=`\\\\${i}`:YS(r)?t+=i:t+=`\\\\${i}`}return t}var dm=/\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/|\\\\(?:[0-9a-fA-F]{1,6}(?:\\r\\n|[ \\t\\r\\n\\f])?|[\\s\\S])|"(?:[^"\\\\]|\\\\[\\s\\S])*"|\'(?:[^\'\\\\]|\\\\[\\s\\S])*\'|\\[(?:\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/|\\\\[\\s\\S]|"(?:[^"\\\\]|\\\\[\\s\\S])*"|\'(?:[^\'\\\\]|\\\\[\\s\\S])*\'|[^\\]"\'\\\\/]|\\/(?!\\*))*\\]/g;function JS(e){let t=new Array(e.length).fill(!0);for(let n of e.matchAll(dm)){let r=n.index;t.fill(!1,r,r+n[0].length)}return t}function yo(e,t,n){if(t.length===0||!e.includes("#"))return e;let r=new Set(t),i=JS(e),o="",a=0;for(;a<e.length;){let s=i[a]&&e[a]==="#"?Ir(e,a+1):null;s&&r.has(s.value)?(o+=n(s.value),a=s.end):(o+=e[a],a+=1)}return o}function QS(e){let t="";for(let n=0;n<e.length;n+=1){if(e[n]==="\\\\"){let r=e[n+1];if(r!==void 0&&/[\\n\\r\\f]/.test(r)){n=um(e,n+1)-1;continue}let i=Ms(e,n);if(i){t+=i.value,n=i.end-1;continue}}t+=e[n]}return t}function Ns(e){return Array.from(e,t=>{let n=t.charCodeAt(0);return n===0?"\\uFFFD":n<32||n===127?`\\\\${n.toString(16)} `:t===\'"\'||t==="\\\\"?`\\\\${t}`:t}).join("")}function ZS(e,t){return e?{kind:"any"}:t===void 0?{kind:"none"}:{kind:"named",prefix:t}}function ev(e,t){return e[t]==="|"&&e[t+1]!=="="}function tv(e,t){let n=e[t]==="*",r=n?{value:"*",end:t+1}:Ir(e,t),i=bo(e,r?.end??t);if(!ev(e,i))return n?null:r?{token:r,namespace:{kind:"none"}}:null;let o=Ir(e,bo(e,i+1));return o?{token:o,namespace:ZS(n,r?.value)}:null}function nv(e){if(e[0]!=="[")return null;let t=Fr(e,1),n=tv(e,t);if(!n)return null;let{token:r,namespace:i}=n;return{name:r.value,rawName:e.slice(t,r.end),namespace:i,end:r.end}}function rv(e,t){let n=/^(?:"((?:\\\\[\\s\\S]|[^"\\\\])*)"|\'((?:\\\\[\\s\\S]|[^\'\\\\])*)\')/.exec(e.slice(t));return n?{value:QS(n[1]??n[2]),end:t+n[0].length}:Ir(e,t)}function iv(e,t){let n=Fr(e,t),r=Ir(e,n);if(r){if(!/^[is]$/i.test(r.value))return null;n=Fr(e,r.end)}return e[n]!=="]"||n!==e.length-1?null:{flag:r?.value}}function mm(e){let t=nv(e);if(!t)return null;let n=Fr(e,t.end),i=["=","~=","|=","^=","$=","*="].find(s=>e.startsWith(s,n));if(!i)return null;let o=rv(e,Fr(e,n+i.length));if(!o)return null;let a=iv(e,o.end);return a?{name:t.name,rawName:t.rawName,namespace:t.namespace,operator:i,value:o.value,flag:a.flag}:null}function Fs(e,t){return e.replace(dm,n=>n.startsWith("[")?t(n):n)}var ut="data-hf-svg-reference-aliases";function xo(e,t,n,r){let i={"=":(f,m)=>f===m,"~=":(f,m)=>f.split(/[ \\t\\r\\n\\f]+/).includes(m),"|=":(f,m)=>f===m||f.startsWith(m+"-"),"^=":(f,m)=>f.startsWith(m),"$=":(f,m)=>f.endsWith(m),"*=":(f,m)=>f.includes(m)},o=(f,m,p)=>!m&&p!=="="&&p!=="|="?!1:i[p](f,m),a=f=>f.replace(/[A-Z]/g,m=>m.toLowerCase()),s=f=>{let m=mm(f);if(!m)return f;let{name:p,rawName:g,namespace:b,operator:y,value:v,flag:A}=m;if(b.kind==="named"!=(r!==void 0))return f;let E=A?.toLowerCase()==="i"?a:D=>D,T=a(p),P=n.filter(D=>{let R=b.kind==="none"?D.name:D.localName,M=b.kind==="named"?r.get(b.prefix):null;return(b.kind==="any"||D.namespaceURI===M)&&a(R)===T}),N=new Set([f]);for(let D of P)o(E(D.before),E(v),y)&&N.add(`[${g}="${Ns(D.after)}"${A?` ${A}`:""}]`);return N.size===1?f:`:is(${[...N].join(", ")})`};if(r)return Fs(e,s);let l=new Map(t.map(({id:f,replacement:m})=>[f,m])),u=new Map;for(let f of n){if(f.name!=="id"||f.before===f.after||l.has(f.before))continue;let m=u.get(f.before);m||(m=new Set([`#${Mt(f.before)}`]),u.set(f.before,m)),m.add(`#${Mt(f.after)}`)}for(let[f,m]of u)l.set(f,`:is(${[...m].join(", ")})`);let d=yo(e,[...l.keys()],f=>l.get(f));return Fs(d,s)}function yn(e,t,n=!0){let r=[],o=(n?[...e.querySelectorAll(`[${t}]`)]:[]).map(s=>s.getAttribute(t)),a=e.getAttribute?.(t);a&&o.unshift(a);for(let s of o){let l;try{l=JSON.parse(s)}catch{continue}if(!Array.isArray(l))continue;let u=l;for(let d of u){if(!av(d))continue;let{name:f,localName:m,namespaceURI:p,before:g,after:b}=d;r.push({name:f,localName:m,namespaceURI:p,before:g,after:b})}}return r}function av(e){if(!e||typeof e!="object")return!1;let{name:t,localName:n,namespaceURI:r,before:i,after:o}=e;return typeof t=="string"&&typeof n=="string"&&(r===null||typeof r=="string")&&typeof i=="string"&&typeof o=="string"}function sv(e){let t=[],n=[],r=!1,i,o=new WeakMap,a=(u,d)=>{for(let f of u){if("selectorText"in f){let m=f,p=o.get(m),g=m.selectorText,b=p?.applied===g?p.authored:g,y=xo(b,[],n,d);y!==g&&(m.selectorText=y),y===b?o.delete(m):o.set(m,{authored:b,applied:m.selectorText})}"cssRules"in f&&a(f.cssRules,d)}},s=()=>{if(n.length)for(let u of e.document.styleSheets){let d;try{d=u.cssRules}catch{continue}let f=new Map;for(let m of d){if(!("namespaceURI"in m))continue;let{prefix:p,namespaceURI:g}=m;p&&f.set(p,g||null)}f.size&&a(d,f)}},l={rewrite:(u,d=[])=>{if(typeof u!="string"||!u.includes("#")&&!u.includes("["))return u;let f=xo(u,d.length?[...d,...t]:t,n);if(f!==u){if(!i){let m=e.document.createElement("div");i=m.matches.bind(m)}i(u)}return f},refresh(){n=yn(e.document,ut).filter(m=>m.before!==m.after);let u=new Set(n.filter(m=>m.name==="id").map(m=>m.before)),d=new Set;t=[];for(let m of e.document.querySelectorAll("[data-hf-authored-id][id]")){let p=m.getAttribute("data-hf-authored-id");if(!p||p===m.id||d.has(p)||u.has(p))continue;d.add(p);let g=Ns(p);t.push({id:p,replacement:`:is(#${Mt(p)}, [data-hf-authored-id="${g}"])`})}if(s(),r||!t.length&&!n.length)return;let f=e.Element.prototype;f.querySelector=new Proxy(f.querySelector,{apply(m,p,g){return Reflect.apply(m,p,[l.rewrite(g[0])])}}),f.querySelectorAll=new Proxy(f.querySelectorAll,{apply(m,p,g){return Reflect.apply(m,p,[l.rewrite(g[0])])}}),r=!0}};e.__hfSvgSelectorAliases=l,l.refresh()}function In(){let e=window;e.__hfSvgSelectorAliases?e.__hfSvgSelectorAliases.refresh():sv(e)}function lv(e,t){let n=typeof t=="number"?t:t.num/t.den,r=Math.max(0,e)*n,i=Math.round(r),o=Number.EPSILON*Math.max(1,r)*8;return Math.abs(r-i)<=o?i:Math.ceil(r)}function Is(e,t){return lv(e,t)/(typeof t=="number"?t:t.num/t.den)}var fm=1,Dr="hf-runtime-filler",uv=["seconds-time","rational-fps","seek-keep-playing","composition-manifest-v1","runtime-data","play-range"];function cv(e,t){let n=Math.abs(e),r=Math.abs(t);for(;r!==0;){let i=n%r;n=r,r=i}return n||1}function dv(e){let t=Number.isFinite(e)&&e>0?e:30,n=Number.isInteger(t)?1:1e6,r=Math.round(t*n),i=cv(r,n);return{numerator:r/i,denominator:n/i}}function pm(e,t,n){return Math.max(e,(Math.ceil(t*n-1e-6)-1)/n)}function Ds(e){if(typeof e!="object"||e===null)return null;let t=e;return!Number.isFinite(t.numerator)||!Number.isFinite(t.denominator)||(t.numerator??0)<=0||(t.denominator??0)<=0?null:Number(t.numerator)/Number(t.denominator)}function So(e){return{protocolVersion:fm,capabilities:uv,fps:dv(e)}}function mv(e){return Array.isArray(e)&&e.every(t=>typeof t=="string")}function hm(e,t=30){if(typeof e!="object"||e===null)return{status:"legacy",fps:t};let n=e;if(n.protocolVersion===void 0)return{status:"legacy",fps:t};if(n.protocolVersion!==fm)return{status:"unsupported",code:"unsupported_protocol_version",receivedVersion:n.protocolVersion};let r=Ds(n.fps);return r===null||!mv(n.capabilities)?{status:"unsupported",code:"invalid_protocol_metadata",receivedVersion:n.protocolVersion}:{status:"supported",fps:r,metadata:n}}var Dn=Object.freeze({start:"data-start",duration:"data-duration",trackIndex:"data-track-index",derivedEnd:"data-end",legacyTrack:"data-layer"}),bL=Object.freeze([Dn.start,Dn.duration,Dn.trackIndex]),yL=Object.freeze([Dn.derivedEnd]),xL=Object.freeze([Dn.derivedEnd,Dn.legacyTrack]);function zt(e){if(e==null||e.trim()==="")return null;let t=Number(e);return Number.isFinite(t)?t:null}var bm=/^[A-Za-z0-9_.:-]+$/;function ym(e,t){let n=e.charCodeAt(t);return n>=48&&n<=57}function gm(e,t){let n=t;for(;n>=0&&ym(e,n);)n--;return n}function fv(e,t){let n=t;for(;n>=0&&(e[n]??"").trim()==="";)n--;return n}function pv(e){let t=e.length-1;if(!ym(e,t))return null;let n=gm(e,t);return e[n]==="."&&(n=gm(e,n-1)),n+1}function hv(e){let t=pv(e);if(t==null)return null;let n=fv(e,t-1),r=e[n];if(r!=="+"&&r!=="-")return null;let i=e.slice(0,n).trim();if(!bm.test(i))return null;let o=Number(e.slice(t));return Number.isFinite(o)?{refId:i,operator:r,magnitude:o}:null}function Ps(e){let t=(e??"").trim();if(!t)return null;let n=zt(t);if(n!=null)return{kind:"absolute",value:n};if(bm.test(t))return{kind:"reference",refId:t,offset:0};let r=hv(t);return r?{kind:"reference",refId:r.refId,offset:r.operator==="-"?-r.magnitude:r.magnitude}:null}var xm=e=>{let t=zt(e);return t!==null&&t>=0?t:null};function Sm(e){return xm(e("data-playback-start"))??xm(e("data-media-start"))??0}var Pr=.1,Or=10;function Os(e){return Number.isFinite(e)&&e>0?Math.max(Pr,Math.min(Or,e)):1}function vm(e,t=1){let n=Number.parseFloat(e("data-playback-rate")??"");return Os(Number.isFinite(n)&&n>0?n:t)}function Hs(e){let t=zt(e("data-duration"));return t!==null&&t>0?t:null}function Em(e,t){let n=Hs(e);if(n!==null)return n;let r=zt(e("data-end"));return r!==null?r-t:null}var gv=3;function Gs(e,t,n){return Number.isFinite(e)?Math.max(0,e-t)/Os(n):null}function Bs(e){let{tag:t,authoredDurationSeconds:n,sourceDurationSeconds:r,mediaStartSeconds:i,playbackRate:o}=e;if(n!==null&&n>0)return{seconds:n,source:"authored"};if(t==="img")return{seconds:gv,source:"default"};if(r===null)return{seconds:null,source:"pending",reason:"source duration not yet probed"};let a=Gs(r,i,o);return a===null?{seconds:null,source:"pending",reason:"source reported a non-finite duration"}:{seconds:a,source:"media"}}var xn="data-fx-chain",wL=xn.slice(5),Am=1,Hr=(e="frequency",t="Frequency",n=1e3,r=20,i=2e4)=>({kind:"number",key:e,label:t,unit:"Hz",min:r,max:i,step:1,default:n,scale:"log",automatable:!0}),Us=(e=.707,t="Bandwidth \\u2014 higher is narrower.")=>({kind:"number",key:"q",label:"Q",unit:"",min:.1,max:20,step:.01,default:e,scale:"log",automatable:!0,hint:t}),vo=(e=-40,t=40,n=0)=>({kind:"number",key:"gain",label:"Gain",unit:"dB",min:e,max:t,step:.1,default:n,automatable:!0}),wm={kind:"enum",key:"poles",label:"Slope",options:[{value:"1",label:"6 dB/oct"},{value:"2",label:"12 dB/oct"}],default:"2",hint:"Two poles is the usual biquad; one pole is gentler."},Cm=[{id:"gain",label:"Gain",group:"dynamics",description:"Raise or lower the whole signal. Automate it to duck under something else.",params:[vo(-60,12,0)],web:"gain-node"},{id:"peaking",label:"Peaking EQ",group:"filter",description:"Boost or cut a band, leaving everything either side alone.",params:[Hr("frequency","Frequency",1e3),vo(-40,40,0),Us(1)],web:"biquad-peaking"},{id:"lowshelf",label:"Low Shelf",group:"filter",description:"Lift or drop everything below the corner frequency.",params:[Hr("frequency","Frequency",200,20,2e3),vo(-40,40,0)],web:"biquad-lowshelf"},{id:"highshelf",label:"High Shelf",group:"filter",description:"Lift or drop everything above the corner frequency.",params:[Hr("frequency","Frequency",4e3,500,2e4),vo(-40,40,0)],web:"biquad-highshelf"},{id:"highpass",label:"High-pass",group:"filter",description:"Remove low frequencies \\u2014 the usual fix for rumble on a voice.",params:[Hr("frequency","Cutoff",300,20,2e4),Us(.707),wm],web:"biquad-highpass"},{id:"lowpass",label:"Low-pass",group:"filter",description:"Remove high frequencies \\u2014 darkens or muffles a track.",params:[Hr("frequency","Cutoff",8e3,100,2e4),Us(.707),wm],web:"biquad-lowpass"},{id:"compressor",label:"Compressor",group:"dynamics",description:"Pull loud parts down so the quiet ones can come up.",params:[{kind:"number",key:"threshold",label:"Threshold",unit:"dB",min:-60,max:0,step:.5,default:-24,hint:"Level above which the compressor starts working."},{kind:"number",key:"ratio",label:"Ratio",unit:":1",min:1,max:20,step:.1,default:4},{kind:"number",key:"attack",label:"Attack",unit:"ms",min:.01,max:2e3,step:.1,default:20,scale:"log"},{kind:"number",key:"release",label:"Release",unit:"ms",min:.01,max:9e3,step:1,default:250,scale:"log"},{kind:"number",key:"knee",label:"Knee",unit:"",min:1,max:8,step:.01,default:2.83,hint:"1 is a hard corner; higher eases into it."},{kind:"number",key:"makeup",label:"Makeup",unit:"dB",min:0,max:36,step:.1,default:0},{kind:"number",key:"mix",label:"Mix",unit:"",min:0,max:1,step:.01,default:1,hint:"Below 1 blends the dry signal back in."}],web:"worklet-compressor"},{id:"limiter",label:"Limiter",group:"dynamics",description:"Hard ceiling \\u2014 nothing gets past the limit.",params:[{kind:"number",key:"limit",label:"Ceiling",unit:"dB",min:-24,max:0,step:.1,default:-1},{kind:"number",key:"attack",label:"Attack",unit:"ms",min:.1,max:80,step:.1,default:5},{kind:"number",key:"release",label:"Release",unit:"ms",min:1,max:8e3,step:1,default:50,scale:"log"},{kind:"number",key:"level_out",label:"Output",unit:"dB",min:-24,max:24,step:.1,default:0}],web:"worklet-limiter"},{id:"gate",label:"Noise Gate",group:"dynamics",description:"Silence the track when it drops below the threshold.",params:[{kind:"number",key:"threshold",label:"Threshold",unit:"dB",min:-80,max:0,step:.5,default:-35},{kind:"number",key:"range",label:"Range",unit:"dB",min:-80,max:0,step:.5,default:-24,hint:"How far down the gate pulls when closed."},{kind:"number",key:"ratio",label:"Ratio",unit:":1",min:1,max:20,step:.1,default:10},{kind:"number",key:"attack",label:"Attack",unit:"ms",min:.01,max:9e3,step:.1,default:1,scale:"log"},{kind:"number",key:"release",label:"Release",unit:"ms",min:.01,max:9e3,step:1,default:100,scale:"log"},{kind:"number",key:"knee",label:"Knee",unit:"",min:1,max:8,step:.01,default:2.83}],web:"worklet-gate"},{id:"saturate",label:"Saturation",group:"nonlinear",description:"Soft-clip the waveform for warmth or outright distortion.",params:[{kind:"enum",key:"type",label:"Curve",options:[{value:"tanh",label:"Tanh"},{value:"atan",label:"Arctan"},{value:"cubic",label:"Cubic"},{value:"exp",label:"Exponential"},{value:"alg",label:"Algebraic"},{value:"quintic",label:"Quintic"},{value:"sin",label:"Sine"},{value:"erf",label:"Error function"},{value:"hard",label:"Hard clip"}],default:"tanh"},{kind:"number",key:"threshold",label:"Threshold",unit:"dB",min:-40,max:0,step:.1,default:-6},{kind:"number",key:"output",automatable:!0,label:"Output",unit:"dB",min:-24,max:24,step:.1,default:0},{kind:"number",key:"oversample",label:"Oversample",unit:"x",min:1,max:8,step:1,default:4,hint:"Higher costs more but keeps aliasing down."}],web:"waveshaper"},{id:"bitcrush",label:"Bitcrush",group:"nonlinear",description:"Drop bit depth and sample rate for a lo-fi, digital sound.",params:[{kind:"number",key:"bits",label:"Bit depth",unit:"bit",min:1,max:32,step:.1,default:8},{kind:"number",key:"samples",label:"Sample hold",unit:"x",min:1,max:250,step:1,default:1,hint:"Repeats each sample N times \\u2014 a crude downsample."},{kind:"number",key:"mix",label:"Mix",unit:"",min:0,max:1,step:.01,default:1}],web:"worklet-bitcrush"},{id:"pitchshift",label:"Pitch shift",group:"time",description:"Shifts pitch up or down without changing playback speed. Adds ~50 ms of latency.",params:[{kind:"number",key:"semitones",label:"Semitones",unit:"st",min:-12,max:12,step:1,default:0},{kind:"number",key:"mix",label:"Mix",unit:"",min:0,max:1,step:.01,default:1}],web:"worklet-pitchshift"},{id:"delay",label:"Delay",group:"time",description:"Repeating echoes behind the dry signal.",params:[{kind:"number",key:"time",automatable:!0,label:"Time",unit:"ms",min:1,max:5e3,step:1,default:250,scale:"log"},{kind:"number",key:"feedback",automatable:!0,label:"Feedback",unit:"",min:.01,max:.95,step:.01,default:.35},{kind:"number",key:"mix",automatable:!0,label:"Mix",unit:"",min:0,max:1,step:.01,default:.4}],web:"delay-feedback"},{id:"chorus",label:"Chorus",group:"time",description:"Detuned copies of the signal for width and thickness.",params:[{kind:"number",key:"delay",automatable:!0,label:"Delay",unit:"ms",min:1,max:100,step:.1,default:7},{kind:"number",key:"depth",automatable:!0,label:"Depth",unit:"ms",min:0,max:10,step:.01,default:2},{kind:"number",key:"speed",automatable:!0,label:"Rate",unit:"Hz",min:.01,max:10,step:.01,default:1},{kind:"number",key:"mix",automatable:!0,label:"Mix",unit:"",min:0,max:1,step:.01,default:.5}],web:"chorus-lfo"},{id:"phaser",label:"Phaser",group:"time",description:"Sweeping notches moving through the spectrum.",params:[{kind:"number",key:"in_gain",automatable:!0,label:"Input",unit:"",min:0,max:1,step:.01,default:.4},{kind:"number",key:"out_gain",automatable:!0,label:"Output",unit:"",min:0,max:2,step:.01,default:.74},{kind:"number",key:"delay",label:"Delay",unit:"ms",min:.1,max:5,step:.1,default:3},{kind:"number",key:"decay",label:"Decay",unit:"",min:0,max:.99,step:.01,default:.4},{kind:"number",key:"speed",automatable:!0,label:"Rate",unit:"Hz",min:.1,max:2,step:.01,default:.5},{kind:"enum",key:"type",label:"Waveform",options:[{value:"0",label:"Triangular"},{value:"1",label:"Sinusoidal"}],default:"0"}],web:"allpass-phaser"},{id:"reverb",label:"Reverb",group:"time",description:"Room tail. Both ends convolve the same generated impulse, so preview matches render.",params:[{kind:"number",key:"size",label:"Room size",unit:"",min:.05,max:1,step:.01,default:.7},{kind:"number",key:"damping",label:"Damping",unit:"",min:0,max:1,step:.01,default:.5,hint:"Higher rolls the top off the tail faster."},{kind:"number",key:"wet",automatable:!0,label:"Wet",unit:"",min:0,max:1,step:.01,default:.35},{kind:"number",key:"dry",automatable:!0,label:"Dry",unit:"",min:0,max:1,step:.01,default:.7}],web:"convolver"}],Vs=new Map(Cm.map(e=>[e.id,e]));function Gr(e){return Vs.get(e)}var _L=Cm.map(e=>e.id);function Br(e,t){let n=Vs.get(e);if(!n)return{};let r={};for(let i of n.params){let o=t?.[i.key];if(i.kind==="enum"){let s=i.options.some(l=>l.value===o);r[i.key]=s?o:i.default;continue}let a=typeof o=="number"?o:typeof o=="string"&&o.trim()!==""?Number(o):Number.NaN;r[i.key]=Number.isFinite(a)?Math.min(i.max,Math.max(i.min,a)):i.default}return r}var jt=class extends Error{constructor(t){super(t),this.name="AudioFxChainError"}};function Rm(e){let t;try{t=JSON.parse(e)}catch(i){throw new jt(`Chain file is not valid JSON: ${i.message}`)}if(typeof t!="object"||t===null)throw new jt("Chain file must be a JSON object.");let n=t;if(n.version!==Am)throw new jt(`Unsupported chain version: ${String(n.version)}`);if(!Array.isArray(n.nodes))throw new jt("Chain file is missing a `nodes` array.");let r=n.nodes.map(bv);return{version:Am,nodes:r}}function Ur(e){return e.nodes.filter(t=>t.enabled!==!1)}function bv(e,t){if(typeof e!="object"||e===null)throw new jt(`Node ${t} is not an object.`);let n=e;if(typeof n.type!="string"||!Vs.has(n.type))throw new jt(`Node ${t} has unknown effect type: ${String(n.type)}`);return xv({type:n.type,id:Eo(n.id),fromCarve:_m(n.fromCarve),fromPreset:Eo(n.fromPreset),label:Eo(n.label),fromEq:Eo(n.fromEq),fromLeveller:_m(n.fromLeveller),presetAmount:yv(n.presetAmount),enabled:n.enabled!==!1,params:Br(n.type,n.params??void 0)})}function Eo(e){return typeof e=="string"&&e?e:void 0}function _m(e){return e===!0?!0:void 0}function yv(e){if(!(typeof e!="number"||!Number.isFinite(e)))return Math.min(1,Math.max(0,e))}function xv(e){for(let t of Object.keys(e))e[t]===void 0&&delete e[t];return e}function Sv(e){return 10**(e/20)}var Ws=Sv(12);function et(e){return Number.isFinite(e)?Math.max(0,Math.min(Ws,e)):1}function Ao(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):1}function Tm(e,t){let n=typeof HTMLMediaElement>"u"?void 0:Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"volume"),r=n?.get,i=n?.set;if(!r||!i)return t();let o=Number(r.call(e));Object.defineProperty(e,"volume",{configurable:!0,get:()=>o,set:a=>{o=Number(a),i.call(e,Ao(o))}});try{return t()}finally{delete e.volume,i.call(e,Ao(o))}}var Nt="data-automation",FL=Nt.slice(5),wo=1,vv=512,Lt=class extends Error{constructor(t){super(t),this.name="AudioAutomationError"}},Pn="volume",_o="rate";function Wr(e){if(e===Pn)return{kind:"volume"};if(e===_o)return{kind:"rate"};let t=e.split(".");if(t.length===3&&t[0]==="fx"&&t[1]===Ev){let i=t[2];return i?{kind:"preset",presetId:i}:null}if(t.length!==3||t[0]!=="fx")return null;let[,n,r]=t;return!n||!r?null:{kind:"fx",nodeId:n,param:r}}var Ev="preset";var Av={min:0,max:1,step:.01,unit:"",label:"Amount",scale:"linear",default:1},Co={min:0,max:Ws,step:.01,unit:"",label:"Volume",scale:"linear",default:1},km={min:Pr,max:Or,step:.05,unit:"x",label:"Speed",scale:"log",default:1};function $s(e,t){let n=Wr(e);if(!n)return null;if(n.kind==="volume")return Co;if(n.kind==="rate")return km;if(n.kind==="preset")return t?.nodes.some(s=>s.fromPreset===n.presetId)?{...Av,label:`${n.presetId} \\xB7 Amount`}:null;let r=t?.nodes.find(a=>a.id===n.nodeId);if(!r)return null;let i=Gr(r.type),o=i?.params.find(a=>a.key===n.param);return!o||o.kind!=="number"?null:{min:o.min,max:o.max,step:o.step,unit:o.unit,label:`${i?.label??r.type} \\xB7 ${o.label}`,scale:o.scale==="log"&&o.min>0?"log":"linear",default:o.default}}function Vr(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"&&e.trim()!==""){let t=Number(e);return Number.isFinite(t)?t:null}return null}function wv(e){let t=Vr(e);return t===null||t===0?0:Math.min(1,Math.max(-1,t))}function Mm(e,t){let n=Vr(e),r=Vr(t);if(n===null||r===null)return null;let i=s=>Math.min(.999,Math.max(.001,s)),o=i(n),a=i(r);return Math.abs(o-a)<1e-6?null:{x:o,y:a}}function _v(e){let t=wv(e?.curve),n=Mm(e?.viaX,e?.viaY);return{...t?{curve:t}:{},...n?{viaX:n.x,viaY:n.y}:{}}}function Cv(e,t){let n=Vr(e?.t),r=Vr(e?.v);if(n===null||r===null)return null;let i=t?Math.min(t.max,Math.max(t.min,r)):r;return{t:Math.max(0,n),v:i,..._v(e)}}function Lm(e,t){let n=e.map(i=>Cv(i,t)).filter(i=>i!==null).sort((i,o)=>i.t-o.t),r=[];for(let i of n)r.length>0&&r[r.length-1].t===i.t?r[r.length-1]=i:r.push(i);return r.slice(0,vv)}function Rv(e){let t=[];for(let n of e.lanes){if(!Wr(n.target))continue;let r=n.target===Pn?Co:n.target===_o?km:null,i=Lm(n.points??[],r);i.length>0&&t.push({target:n.target,points:i})}return{version:wo,lanes:t}}function Nm(e,t){let n=[];for(let r of e.lanes){let i=$s(r.target,t);if(!i)continue;let o=Lm(r.points,i);o.length>0&&n.push({target:r.target,points:o})}return{version:wo,lanes:n}}function Ro(e){let t;try{t=JSON.parse(e)}catch(i){throw new Lt(`Automation is not valid JSON: ${i.message}`)}if(typeof t!="object"||t===null)throw new Lt("Automation must be a JSON object.");let n=t;if(n.version!==wo)throw new Lt(`Unsupported automation version: ${String(n.version)}`);if(!Array.isArray(n.lanes))throw new Lt("Automation is missing a `lanes` array.");let r=n.lanes.map((i,o)=>{if(typeof i!="object"||i===null)throw new Lt(`Lane ${o} is not an object.`);let a=i;if(typeof a.target!="string"||!Wr(a.target))throw new Lt(`Lane ${o} has an unreadable target: ${String(a.target)}`);if(!Array.isArray(a.points))throw new Lt(`Lane ${o} is missing a \\`points\\` array.`);return{target:a.target,points:a.points}});return Rv({version:wo,lanes:r})}function Tv(e,t){return t?Math.pow(e,Math.pow(2,2*t)):e}function kv(e,t){let n=e-.5,r=t-.5,i=.999,o=1e6,a=n>0?n/(i-e):n<0?-n/(e-(1-i)):0,s=r>0?r/(i-t):r<0?-r/(t-(1-i)):0,l=Math.min(o,Math.max(1,a,s));return{cx:e+n/l,cy:t+r/l,w:l}}function Mv(e,t,n){let{cx:r,cy:i,w:o}=kv(t,n),a=2-2*o,s=e*a-1+2*o*r,l=-e*a-2*o*r,u=Lv(s,l,e),d=1-u,f=d*d+2*o*u*d+u*u;return f>0?(2*o*i*u*d+u*u)/f:e}function Lv(e,t,n){if(Math.abs(e)<1e-12)return Math.abs(t)<1e-12?n:-n/t;let r=Math.sqrt(Math.max(0,t*t-4*e*n)),i=(-t+r)/(2*e),o=(-t-r)/(2*e),a=s=>s>=-1e-9&&s<=1+1e-9;return a(i)?Math.min(1,Math.max(0,i)):a(o)?Math.min(1,Math.max(0,o)):n}function Nv(e,t){let n=Mm(t.viaX,t.viaY);return n?Mv(Math.min(1,Math.max(0,e)),n.x,n.y):Tv(e,t.curve)}function Fv(e,t,n,r){return r==="log"&&e>0&&t>0?Math.exp(Math.log(e)+(Math.log(t)-Math.log(e))*n):e+(t-e)*n}function Ft(e,t,n="linear"){let r=e.points;if(r.length===0)return 0;let i=r[0];if(t<=i.t)return i.v;let o=r[r.length-1];if(t>=o.t)return o.v;let a=0,s=r.length-1;for(;s-a>1;){let f=a+s>>1;r[f].t<=t?a=f:s=f}let l=r[a],u=r[s],d=u.t-l.t;return d<=0?u.v:Fv(l.v,u.v,Nv((t-l.t)/d,l),n)}function Fm(e){return e.points.length<=1||e.points.every(t=>t.v===e.points[0].v)}function Im(e,t,n,r,i="linear"){let o=Math.max(2,Math.floor(r)),a=new Float32Array(o),s=n-t;for(let l=0;l<o;l+=1)a[l]=Ft(e,t+s*l/(o-1),i);return a}var To=new Map,Iv=64;function qs(e,t=Pn){let n=`${t}\\0${e}`,r=To.get(n);if(r!==void 0)return r;let i=null;try{i=Ro(e).lanes.find(o=>o.target===t)??null}catch{i=null}return To.size>Iv&&To.clear(),To.set(n,i),i}function Dm(e,t){let n=(typeof e.getAttribute=="function"?e.getAttribute(Nt):null)??"";if(!n)return null;let r=qs(n);return!r||r.points.length===0?null:Ft(r,t)}var Pm=48,Om=new WeakMap;function Dv(e){let t=e.points,n=t[0].v,r=t[t.length-1].v,i=[0],o=[0],a=l=>{let u=i[i.length-1];if(l<=u)return;let d=Ft(e,u,"log");i.push(l),o.push(o[o.length-1]+(d+Ft(e,l,"log"))/2*(l-u))},s=Math.max(0,t[0].t);a(s);for(let l=1;l<t.length;l+=1){let u=t[l-1].t,d=t[l].t;if(!(d<=0))for(let f=1;f<=Pm;f+=1)a(Math.max(u,0)+(d-u)*f/Pm)}return{ts:Float64Array.from(i),ss:Float64Array.from(o),firstRate:n,lastRate:r}}function Hm(e){let t=Om.get(e);return t||(t=Dv(e),Om.set(e,t)),t}function zs(e){return typeof e!="number"&&e.points.length>0}function js(e,t){return typeof e=="number"?e:zs(e)?Ft(e,t,"log"):1}function Gm(e,t,n){let r=0,i=e.length-1;for(;i-r>1;){let o=r+i>>1;e[o]<=n?r=o:i=o}return t[r]+(t[i]-t[r])*(n-e[r])/(e[i]-e[r])}function On(e,t){if(typeof e=="number")return t*e;if(!zs(e))return t;let{ts:n,ss:r,firstRate:i,lastRate:o}=Hm(e),a=n.length-1;return t<=0?t*i:t>=n[a]?r[a]+(t-n[a])*o:Gm(n,r,t)}function Sn(e,t){if(typeof e=="number")return t/e;if(!zs(e))return t;let{ts:n,ss:r,firstRate:i,lastRate:o}=Hm(e),a=n.length-1;return t<=0?t/i:t>=r[a]?n[a]+(t-r[a])/o:Gm(r,n,t)}function Pv(e){return e?qs(e,_o):null}function Bm(e,t){return Pv(e)??t}var BL=[{id:"montage",label:"Montage",points:[[0,.9],[.15,.3],[.5,2.5],[.85,.3],[1,.9]]},{id:"hero",label:"Hero",points:[[0,1],[.25,1.6],[.5,.25],[.75,1.6],[1,1]]},{id:"bullet",label:"Bullet",points:[[0,3],[.4,3],[.5,.15],[.6,3],[1,3]]},{id:"jump-cut",label:"Jump cut",points:[[0,.5],[.24,.5],[.26,3],[.5,3],[.52,.5],[.74,.5],[.76,3],[1,3]]},{id:"flash-in",label:"Flash in",points:[[0,.3],[.6,.6],[1,5]]},{id:"flash-out",label:"Flash out",points:[[0,5],[.4,.6],[1,.3]]},{id:"ramp-in",label:"Ramp in",points:[[0,.5],[1,1]]},{id:"ramp-out",label:"Ramp out",points:[[0,1],[1,.5]]},{id:"slowmo-middle",label:"Slow-mo middle",points:[[0,1],[1/3,.35],[2/3,.35],[1,1]]}];var Um="http://www.w3.org/1999/xhtml";function Me(e){return e!=null&&e.nodeType===1}function ye(e){return Me(e)&&e.namespaceURI===Um}function Hn(e,t){return ye(e)&&e.localName===t}function xe(e){return Hn(e,"video")}function ko(e){return Hn(e,"audio")}function pe(e){return xe(e)||ko(e)}function Pe(e){return Hn(e,"img")}function $r(e){return Hn(e,"canvas")}function Vm(e){return Hn(e,"style")}function Wm(e){return Hn(e,"link")}function Ks(e){return Me(e)&&(e.namespaceURI===Um||e.namespaceURI==="http://www.w3.org/2000/svg")}function _e(e){return zt(e)}function Ve(e){return vm(t=>e.getAttribute(t),pe(e)?e.defaultPlaybackRate:1)}function bt(e){return Bm(e.getAttribute("data-automation"),Ve(e))}function Gn(e){return Sm(t=>e.getAttribute(t))}function yt(e,t){return Ov(t,Gn(e),bt(e))}function Bn(e){let t=Bs({tag:"video",authoredDurationSeconds:Hs(n=>e.getAttribute(n)),sourceDurationSeconds:Number.isFinite(e.duration)?e.duration:null,mediaStartSeconds:Gn(e),playbackRate:Ve(e)});return t.source==="media"?yt(e,e.duration):t.seconds}function Un(e,t=0){return!Pe(e)||!e.hasAttribute("data-start")&&!e.hasAttribute("data-track-index")?null:Bs({tag:"img",authoredDurationSeconds:Em(n=>e.getAttribute(n),t),sourceDurationSeconds:null,mediaStartSeconds:0,playbackRate:1}).seconds}function Ov(e,t,n){return typeof n=="number"?Gs(e,t,n):Number.isFinite(e)?Sn(n,Math.max(0,e-t)):null}var Mo="hyperframes-studio-preview",Vn="data-hf-upcoming",Ys="data-hf-preview-lazy";var Hv="__hf_preview_time";function Lo(e){let t=Number(new URLSearchParams(e).get(Hv));return Number.isFinite(t)&&t>=0?Math.min(t,7200):0}var zm="data-hf-first-pass-hide",$m="[data-start]:not(video, audio, img) { visibility: hidden !important; }",Gv=\'img[loading="lazy"] { display: none !important; }\',jm="data-hf-skip-hidden-images",qr=`[data-start]:not(video, audio, img, [${Vn}])[style*="visibility: hidden"]`,Bv=`${qr} img { display: none !important; }`,Uv=`meta[name="${Mo}"]`,qm="data-hf-hidden-layer-style";function Xs(e,t,n){let r=e.ownerDocument.createElement("style");r.setAttribute(t,""),r.textContent=n,e.appendChild(r)}function Js(e){let t=e.head??e.documentElement;t&&!e.querySelector(`style[${qm}]`)&&Xs(t,qm,"[data-hidden] { display: none !important; }")}function Wn(){return document.querySelector(`style[${jm}]`)!==null}function Km(){if(typeof document>"u")return;Js(document);let e=document.head??document.documentElement;if(!e)return;let t=document.querySelector(Uv)!==null;t&&!Wn()&&Xs(e,jm,Bv);let n=window;if(n.__hfFirstPassHidden||n.__hyperframeRuntimeBootstrapped)return;let r=t?`${$m} ${Gv}`:$m;Xs(e,zm,r),n.__hfFirstPassHidden=!0}function Ym(){let e=window;if(!e.__hfFirstPassHidden)return!1;e.__hfFirstPassHidden=!1;for(let t of document.querySelectorAll(`style[${zm}]`))t.remove();return!0}function No(e){e.preload!=="auto"&&(e.preload="auto");let t=e.tagName==="VIDEO"&&e.networkState===2;e.readyState<3&&!t&&e.load()}function Qs(e){for(let t of e.querySelectorAll("source"))t.remove();e.removeAttribute("src"),e.load()}function Xm(e){if(e.querySelector("source"))return;let t=e.getAttribute("src");Qs(e),t!==null&&e.setAttribute("src",t)}function Jm(e){return _e(e.getAttribute("data-duration"))!=null}function Qm(){let e=window;if(e.__hfMediaDeferral?.disconnect(),e.__hfMediaDeferral=void 0,!Wn())return;let t=Lo(window.location.search),n=r=>{let i=_e(r.getAttribute("data-start")),o=_e(r.getAttribute("data-duration"));i!=null&&o!=null&&(i>t||i+o<=t)&&(r.preload="none")};e.__hfMediaDeferral=new MutationObserver(r=>{for(let i of r)for(let o of i.addedNodes){if(o.nodeType!==1)continue;let a=o;a.matches("video, audio")&&n(a);for(let s of a.querySelectorAll("video, audio"))n(s)}}),e.__hfMediaDeferral.observe(document.documentElement,{childList:!0,subtree:!0})}function Fo(){return globalThis}function O(e,t){if(typeof window>"u")return;let n=Fo(),r=n.__hf?.onSwallowed;if(r)try{r({label:e,error:t})}catch(i){}(n.__hfDebug||n.__HYPERFRAMES_DEBUG)&&console.debug(`[hyperframes] ${e} swallowed:`,t)}var Zm=30;function ef(e){Zm=Number.isFinite(e)&&e>0?e:30}function Ae(e){try{window.parent.postMessage({...e,...So(Zm)},"*")}catch(t){O("bridge.postMessage",t)}}var Vv=new Map(Object.entries({play:(e,t)=>t.onPlay(),pause:(e,t)=>t.onPause(),"stop-media":(e,t)=>t.onStopMedia(),seek:(e,t)=>t.onSeek(Wv(e,t),e.seekMode??"commit"),tick:(e,t)=>t.onTick(),"set-muted":(e,t)=>t.onSetMuted(!!e.muted),"set-volume":(e,t)=>t.onSetVolume(Math.max(0,Math.min(1,Number(e.volume??1)))),"set-media-output-muted":(e,t)=>t.onSetMediaOutputMuted(!!e.muted),"set-native-media-sync-disabled":(e,t)=>t.onSetNativeMediaSyncDisabled(!!e.disabled),"set-web-audio-media-disabled":(e,t)=>t.onSetWebAudioMediaDisabled(!!e.disabled),"set-playback-rate":(e,t)=>t.onSetPlaybackRate(Number(e.playbackRate??1)),"set-idle-heartbeat":(e,t)=>t.onSetIdleHeartbeat(!!e.slow),"set-root-duration":(e,t)=>t.onSetRootDuration(Number(e.durationSeconds??0)),"set-play-range":(e,t)=>t.onSetPlayRange(Number(e.startSeconds??0),e.endSeconds==null?null:Number(e.endSeconds)),"set-color-grading":(e,t)=>t.onSetColorGrading(e.target??null,e.grading??null),"set-color-grading-compare":(e,t)=>t.onSetColorGradingCompare(e.target??null,e.compare??null),"enable-pick-mode":(e,t)=>t.onEnablePickMode(),"disable-pick-mode":(e,t)=>t.onDisablePickMode(),"flash-elements":e=>qv(e),"set-runtime-data":(e,t)=>{typeof e.channel=="string"&&t.onSetRuntimeData?.(e.channel,e.payload,e.requestId)},"clear-runtime-data":(e,t)=>{typeof e.channel=="string"&&t.onClearRuntimeData?.(e.channel,e.requestId)}}));function Wv(e,t){let n=Number(e.timeSeconds);if(Number.isFinite(n))return Math.max(0,n);let i=Ds(e.fps)??t.getCanonicalFps();return Math.max(0,Number(e.frame??0))/i}function $v(e){let t=hm(e);return t.status!=="unsupported"?!1:(Ae({source:"hf-preview",type:"diagnostic",code:`runtime.protocol.${t.code}`,details:{receivedVersion:typeof t.receivedVersion=="string"||typeof t.receivedVersion=="number"?t.receivedVersion:null}}),!0)}function qv(e){let t=e.selectors,n=e.duration||800;t&&zv(t,n)}function tf(e){let t=n=>{if(n.source!==window.parent&&n.source!==window)return;let r=n.data;if(!r||r.source!=="hf-parent"||r.type!=="control"||$v(r))return;let i=r.action;if(typeof i!="string")return;let o=Vv.get(i);o&&o(r,e)};return window.addEventListener("message",t),Ae({source:"hf-preview",type:"ready"}),t}function zv(e,t){if(!document.getElementById("__hf-flash-styles")){let n=document.createElement("style");n.id="__hf-flash-styles",n.textContent=`\n      .__hf-flash {\n        outline: 2px solid rgba(59, 130, 246, 0.6) !important;\n        outline-offset: 2px !important;\n        animation: __hf-flash-pulse ${t}ms ease-out forwards !important;\n      }\n      @keyframes __hf-flash-pulse {\n        0% { outline-color: rgba(59, 130, 246, 0.8); }\n        100% { outline-color: transparent; }\n      }\n    `,document.head.appendChild(n)}for(let n of e)try{document.querySelectorAll(n).forEach(i=>{i.classList.add("__hf-flash"),setTimeout(()=>i.classList.remove("__hf-flash"),t)})}catch(r){O("bridge.flashElements.querySelector",r)}}var Io=e=>4*Number.EPSILON*Math.max(1,Math.abs(e));function zr(e,t){return!Number.isFinite(e)||!Number.isFinite(t)?e===t:Math.abs(e-t)<=Io(Math.max(Math.abs(e),Math.abs(t)))}var nf=(e,t)=>e>=t||zr(e,t),Kt=(e,t,n)=>nf(e,t)&&e<n&&!zr(e,n),jv=1e-6,$n=(e,t,n,r)=>Kt(e,t,n)||nf(e,t)&&r>0&&n>=r-jv;var Zs=null;function rf(e){Zs=e}function tt(e,t){if(Zs)try{Zs({source:"hf-preview",type:"analytics",event:e,properties:t??{}})}catch(n){O("runtime.analytics.site1",n)}}function Kv(e){let t=e.toLowerCase().replace(/[^a-z0-9]+/g,"-"),n=0,r=t.length;for(;n<r&&t[n]==="-";)n++;for(;r>n&&t[r-1]==="-";)r--;let i=t.slice(n,r);return i.length>0?i:"node"}function qn(e){return`--${Kv(e)}`}function of(e){let t=new Map;for(let n of e){let r=qn(n),i=t.get(r);i?i.includes(n)||i.push(n):t.set(r,[n])}return[...t.values()].filter(n=>n.length>1)}function sf(){if(typeof document>"u")return{};let e=new Set;document.documentElement?.hasAttribute("data-composition-variables")&&e.add(document.documentElement);for(let i of Array.from(document.querySelectorAll("[data-composition-variables]")))e.add(i);let t={};for(let i of e)Object.assign(t,jr(i));let n=Po(),r={...t,...n};for(let i of e)tl(i,r);return r}var af=new Set;function lf(e){let t=e?.getAttribute("data-composition-variables");if(!t)return[];let n;try{n=JSON.parse(t)}catch{return[]}return Array.isArray(n)?n.filter(r=>!!r&&typeof r=="object"):[]}function Yv(e,t){return t?.trim()||e.getAttribute("data-composition-id")?.trim()||e.querySelector("[data-composition-id]")?.getAttribute("data-composition-id")?.trim()||"composition"}function Xv(e){return Array.isArray(e.options)?e.options.map(t=>t&&typeof t=="object"?t.value:t).filter(t=>typeof t=="string"||typeof t=="number"):[]}function Jv(e,t){if(typeof e.id!="string")return null;let n=t[e.id];if(n==null||"default"in e&&String(n)===String(e.default))return null;let r=Xv(e);return r.length===0||r.some(i=>String(i)===String(n))?null:{id:e.id,value:n,allowed:r}}function tl(e,t,n){if(!e)return;let r=lf(e);if(r.length===0)return;let i=Yv(e,n);for(let o of r){let a=Jv(o,t);if(!a)continue;let s=`${i}|${a.id}|${String(a.value)}`;if(af.has(s))continue;af.add(s);let l="default"in o?JSON.stringify(o.default):"the composition default";console.warn(`[hyperframes] runtime_unknown_enum_value: ${i} variable "${a.id}" got ${JSON.stringify(a.value)}, which is not a declared option (${a.allowed.join(", ")}). Rendering ${l} instead.`)}}function jr(e){let t={};for(let n of lf(e))typeof n.id!="string"||!("default"in n)||(t[n.id]=n.default);return t}var el="data-hf-css-vars";function Do(e){return"style"in e&&typeof e.style?.setProperty=="function"}function nl(e,t){if(!Do(e))return;let n=[];for(let[r,i]of Object.entries(t))if(typeof i=="string"&&i!==""||typeof i=="number"){let o=qn(r);e.style.setProperty(o,String(i)),n.push(o)}n.length>0&&e.setAttribute(el,n.join(" "))}function uf(e,t,n){let r={};for(let[i,o]of Object.entries(t)){let a=qn(i);((Do(e)?e.style.getPropertyValue(a):"")||(n?n.getComputedStyle(e).getPropertyValue(a):"")).trim()===""&&(r[i]=o)}return r}function cf(e){if(!Do(e))return;let t=e.getAttribute(el);if(t){for(let n of t.split(" "))n.startsWith("--")&&e.style.removeProperty(n);e.removeAttribute(el)}}function df(e){let t=new Set;e.documentElement?.hasAttribute("data-composition-variables")&&t.add(e.documentElement);for(let i of Array.from(e.querySelectorAll("[data-composition-variables]")))t.add(i);let n=Po(),r=[];for(let i of t)r.push(...Qv(i,n,e.defaultView));for(let i of of(r))console.warn(`composition variables ${i.join(", ")} collapse to the same CSS property ${qn(i[0]??"")} \\u2014 rename one to avoid cross-talk`)}function Qv(e,t,n){if(!Do(e))return[];let r=jr(e),i={};for(let[o,a]of Object.entries(r)){if(o in t)continue;let s=qn(o);(e.style.getPropertyValue(s)||(n?n.getComputedStyle(e).getPropertyValue(s):"")).trim()===""&&(i[o]=a)}for(let[o,a]of Object.entries(t))o in r&&(i[o]=a);return nl(e,i),Object.keys(r)}function mf(e){let t=e.getAttribute("data-variable-values");if(!t)return{};let n;try{n=JSON.parse(t)}catch{return{}}return!n||typeof n!="object"||Array.isArray(n)?{}:n}function Po(){if(typeof window>"u")return{};let e=window.__hfVariables;return!e||typeof e!="object"||Array.isArray(e)?{}:e}function ff(e){let t=[],n=(m,p=()=>m.getAnimations())=>{if(typeof m.getAnimations!="function")return[];try{return p()}catch{return[]}},r=m=>{let p=new Map;if(t.length===0)return p;let g=typeof CSSAnimation<"u";for(let b of n(document,m)){if(g&&!(b instanceof CSSAnimation))continue;let y=b.effect;if(!y?.target||y.pseudoElement)continue;let v=p.get(y.target);v?v.push(b):p.set(y.target,[b])}return p},i=(m=[],p=[])=>[...p,...m.filter(g=>!p.includes(g)&&g.playState!=="idle")],o=m=>{let p=m.closest("[data-start]")??m;return e?.resolveStartSeconds?e.resolveStartSeconds(p):Number.parseFloat(p.getAttribute("data-start")??"0")||0},a=m=>{let p=A=>(A||"").split(",").map(E=>Number.parseFloat(E)/(E.trim().endsWith("ms")?1e3:1)),g=p(m.animationDuration),b=p(m.animationDelay),y=m.animationName.split(","),v=0;return y.forEach((A,E)=>{if(A.trim()==="none")return;let T=b[E%b.length]+g[E%g.length];T>v&&(v=T)}),{cycleSeconds:v,delays:y.map((A,E)=>b[E%b.length]||0)}},s=(m,p)=>{let g=null;try{g=m.effect?.getComputedTiming?.()??null}catch(y){O("runtime.adapters.css.site5",y)}if(!g)return{};let b=Number(g.endTime);return Number.isFinite(b)?{endSeconds:p+b/1e3}:{unbounded:!0}},l=(m,p)=>{for(let g of m){try{g.currentTime=p}catch(b){O("runtime.adapters.css.site1",b)}try{g.pause()}catch(b){O("runtime.adapters.css.site2",b)}}},u=m=>{for(let p of m)try{p.play()}catch(g){O("runtime.adapters.css.site3",g)}},d=m=>{for(let p of m)try{p.pause()}catch(g){O("runtime.adapters.css.site4",g)}},f=m=>{m.baseDelay?m.el.style.animationDelay=m.baseDelay:m.el.style.removeProperty("animation-delay"),m.basePlayState?m.el.style.animationPlayState=m.basePlayState:m.el.style.removeProperty("animation-play-state")};return{name:"css",discover:()=>{for(let g of t)f(g);let m=new Map(t.map(g=>[g.el,g.handles]));t=[];let p=document.querySelectorAll("*");for(let g of p){if(!ye(g))continue;let b=window.getComputedStyle(g);!b.animationName||b.animationName==="none"||t.push({el:g,baseDelay:g.style.animationDelay||"",basePlayState:g.style.animationPlayState||"",...a(b),handles:m.get(g)})}},getAnimationCycleEndSeconds:()=>{let m=0;for(let p of t)!p.el.isConnected||p.cycleSeconds<=0||(m=Math.max(m,o(p.el)+p.cycleSeconds));return m>0?m:null},getInferredDurationSeconds:()=>{let m=0;for(let p of t){if(!p.el.isConnected)continue;let g=o(p.el);for(let b of n(p.el)){let y=s(b,g);y.endSeconds!=null&&(m=Math.max(m,y.endSeconds))}}return m>0?m:null},seek:m=>{let p=Number(m.time)||0,g=r(m.pageAnimations);for(let b of t)b.handles=i(b.handles,g.get(b.el));for(let b of t){if(!b.el.isConnected)continue;let y=o(b.el),v=Math.max(0,p-y)*1e3;if(b.handles?.length){b.el.style.animationDelay!==b.baseDelay&&f(b),l(b.handles,v);continue}b.el.style.animationPlayState="paused",b.el.style.animationDelay=b.delays.map(A=>`${Number((A-v/1e3).toFixed(3))}s`).join(", ")}},pause:m=>{let p=r(m?.pageAnimations);for(let g of t){if(!g.el.isConnected)continue;let b=p.get(g.el);b&&(d(b),f(g))}},play:()=>{let m=r();for(let p of t)p.el.isConnected&&(f(p),u(m.get(p.el)??[]))},revert:()=>{t=[]}}}function il(e,t){e.totalDuration?.();let n=e.getChildren?.(!1,!0,!0)??[],r=eE(e).map(s=>[s,s.ratio,s._zTime,s._act]),i=pf(n,t).map(s=>[s,s._ts]),o=new Set;for(let[s]of i)for(let l=s.parent;l&&!o.has(l);l=l.parent)o.add(l);let a=[...o].map(s=>[s,s._dur,s._tDur,s._end,s._dirty]);for(let[s]of i)s._ts=0;try{e.totalTime(t>=.001?t-.001:t+.001,!0),hf(n,t),e.totalTime(t,!0)}finally{for(let[s,l]of i)s._ts=l;for(let[s,l,u,d,f]of a)Object.assign(s,{_dur:l,_tDur:u,_end:d,_dirty:f})}for(let[s,l,u,d]of r)s.ratio=l,s._zTime=u,s._act=d}var Zv=1e-6;function pf(e,t,n=[]){for(let r of e)r.startTime()>t+Zv?n.push(r):r.getChildren&&r.endTime()>=t&&pf(r.getChildren(!1,!0,!0),r.time(),n);return n}function eE(e){return(e.getChildren?.(!0,!0,!0)??[]).filter(t=>{let n=t;return typeof n.getChildren=="function"||n.totalDuration?.()===0})}var rl=2e-8,tE=e=>{let t=e;return typeof t?.render=="function"&&typeof t.startTime=="function"&&typeof t.paused=="function"&&typeof t.timeScale=="function"&&t.timeScale()>0&&!t.paused()};function nE(e){return e.vars?.keyframes&&(e.render(rl,!0),e.render(-rl,!0)),e._startAt&&e._startAt.render(rl,!0,!0),!!(e.vars?.keyframes||e._startAt)}function hf(e,t){for(let n of e.filter(tE)){let r=(t-n.startTime())*n.timeScale();if(Math.abs(r)<1e-9&&nE(n))continue;let i=n.getChildren?n:n.timeline;i?.getChildren&&r>0&&r<=n.totalDuration()&&hf(i.getChildren(!1,!0,!0),r)}}function gf(e){return{name:"gsap",discover:()=>{},seek:t=>{let n=e.getTimeline();if(!n)return;n.pause();let r=Math.max(0,Number(t.time)||0),i=t.suppressEvents===!0;typeof n.totalTime=="function"?(n.totalTime(r,i),il({totalTime:n.totalTime.bind(n),totalDuration:n.totalDuration?.bind(n),getChildren:n.getChildren?.bind(n)},r)):n.seek(r,i)},pause:()=>{let t=e.getTimeline();t&&t.pause()}}}function bf(){return{name:"animejs",discover:()=>{try{let e=window.anime;if(!e||typeof e.running>"u")return;let t=e.running;if(!Array.isArray(t)||t.length===0)return;let n=window.__hfAnime??[],r=new Set(n);for(let i of t)r.has(i)||n.push(i);window.__hfAnime=n}catch(e){O("runtime.adapters.animejs.site1",e)}},seek:e=>{let t=Math.max(0,(Number(e.time)||0)*1e3),n=window.__hfAnime;if(!(!n||n.length===0))for(let r of n)try{typeof r.seek=="function"&&r.seek(t)}catch(i){O("runtime.adapters.animejs.site2",i)}},pause:()=>{let e=window.__hfAnime;if(!(!e||e.length===0))for(let t of e)try{typeof t.pause=="function"&&t.pause()}catch(n){O("runtime.adapters.animejs.site3",n)}},play:()=>{let e=window.__hfAnime;if(!(!e||e.length===0))for(let t of e)try{typeof t.play=="function"&&t.play()}catch(n){O("runtime.adapters.animejs.site4",n)}},revert:()=>{}}}function Ef(e){let t=r=>{let i=xf(r),o=i&&typeof i.closest=="function"?i.closest("[data-composition-id]"):null;return o&&e?.resolveStartSeconds?e.resolveStartSeconds(o):0},n=(r,i)=>Math.max(0,i-t(r));return{name:"lottie",discover:()=>{try{let r=window.lottie;if(r&&typeof r.getRegisteredAnimations=="function"){let i=r.getRegisteredAnimations();if(Array.isArray(i)&&i.length>0){let o=window.__hfLottie??[],a=new Set(o);for(let s of i)a.has(s)||o.push(s);window.__hfLottie=o}}}catch(r){O("runtime.adapters.lottie.site1",r)}},seek:r=>{let i=Math.max(0,Number(r.time)||0),o=window.__hfLottie;if(!(!o||o.length===0))for(let a of o)try{let s=n(a,i),l=a.loop===!0;if(Oo(a)){let u=s*a.frameRate;a.totalFrames>0&&l?a.goToAndStop(Sf(u,a.totalFrames),!0):a.totalFrames>0&&u>=a.totalFrames?a.goToAndStop(a.totalFrames-1,!0):a.goToAndStop(s*1e3,!1)}else if(ol(a)){if(typeof a.setCurrentRawFrameValue=="function"){let u=a.totalFrames??0,d=a.frameRate??30,f=l&&u>0?Sf(s*d,u):s*d;u>0&&a.setCurrentRawFrameValue(Math.min(f,u-1))}else if(typeof a.seek=="function"){let u=a.duration??0;if(Number.isFinite(u)&&u>0){let d=Math.min(100,(l?s%u:s)/u*100);a.seek(d)}}}}catch(s){O("runtime.adapters.lottie.site2",s)}},pause:()=>{let r=window.__hfLottie;if(!(!r||r.length===0))for(let i of r)try{(Oo(i)||ol(i))&&i.pause()}catch(o){O("runtime.adapters.lottie.site3",o)}},revert:()=>{},getInferredDurationSeconds:()=>yf((r,i)=>i),getAnimationCycleEndSeconds:()=>yf((r,i)=>xf(r)?.isConnected===!1?null:t(r)+i)}}function yf(e){let t=window.__hfLottie;if(!t||t.length===0)return null;let n=0,r=!1;for(let i of t){let o=null;try{let a=rE(i);o=a==null?null:e(i,a)}catch(a){O("runtime.adapters.lottie.site4",a)}o!=null&&(r=!0,n=Math.max(n,o))}return r?n:null}function xf(e){return Oo(e)?e.wrapper:e.canvas}function Sf(e,t){let n=e%t;return t-n<1e-6?0:n}function vf(e,t){return!Number.isFinite(e)||!e||e<=0||!Number.isFinite(t)||!t||t<=0?null:e/t}function rE(e){return Oo(e)?vf(e.totalFrames,e.frameRate):ol(e)?Number.isFinite(e.duration)&&(e.duration??0)>0?e.duration??null:vf(e.totalFrames,e.frameRate):null}function Oo(e){return typeof e=="object"&&e!==null&&typeof e.goToAndStop=="function"}function ol(e){return typeof e=="object"&&e!==null&&typeof e.pause=="function"&&("totalFrames"in e||"duration"in e)}var al=-1,Ho=new Set,zn,sl=0;function Af(e){let t=[],n=!0,r={time:e,waitUntil:i=>{if(!n)throw new Error("hf-seek waitUntil() must be called synchronously from the event listener");t.push(i)}};try{window.dispatchEvent(new CustomEvent("hf-seek",{detail:r}))}catch(i){O("runtime.adapters.seek-dispatch.site1",i)}finally{n=!1}t.length!==0&&nt(Promise.all(t))}function nt(e){let t=e.then(()=>({status:"fulfilled"})).catch(n=>({status:"rejected",reason:n}));Ho.add(t),t.then(n=>{Ho.delete(t)&&n.status==="rejected"&&zn===void 0&&(zn={reason:n.reason})})}function Go(e){e!==al&&(al=e,Af(e))}function Bo(e){al=e,Af(e)}function wf(){return sl>0}async function ll(){sl+=1;let e=zn;try{for(await Promise.resolve();Ho.size>0;){let r=(await Promise.all([...Ho])).find(i=>i.status==="rejected");e===void 0&&r?.status==="rejected"&&(e={reason:r.reason})}let t=zn;if(e===void 0&&(e=t),zn===t&&(zn=void 0),e)throw e.reason}finally{sl-=1}}function _f(){let e=null,t=0,n=null,r=null,i=null,o=null,a=()=>{if(typeof window>"u")return null;let d=window.THREE?.DefaultLoadingManager;return!d||typeof d!="object"||typeof d.itemsLoaded!="number"||typeof d.itemsTotal!="number"?null:d},s=u=>{o||u.itemsTotal<=u.itemsLoaded||(o=new Promise(d=>{u.onLoad=function(){try{i?.call(this)}finally{o=null,u.onLoad=i??null,d()}}}))},l=u=>{n!==u&&(n=u,r=u.onStart??null,i=u.onLoad??null,u.onStart=function(d,f,m){try{r?.call(this,d,f,m)}finally{s(u)}})};return{name:"three",discover:()=>{let u=a();u&&(l(u),s(u))},seek:u=>{e=Math.max(0,Number(u.time)||0),t=e,window.__hfThreeTime=e,Go(e)},pause:()=>{e==null&&(e=Math.max(0,t))},play:()=>{e=null},revert:()=>{e=null,t=0},getReadyPromise:()=>{let u=a();return!u||u.itemsTotal<=u.itemsLoaded?null:(o||s(u),o)}}}function xt(e){let t=null,n=new WeakSet;return{name:e.name,discover:()=>{},seek:()=>{},pause:()=>{},play:()=>{},revert:()=>{},getReadyPromise:()=>{let r=e.getInstances();if(r.length===0)return null;let i=r.filter(o=>!n.has(o));return i.length===0?null:t||(t=Promise.allSettled(i.map(o=>e.waitFor(o).then(()=>{n.add(o)}))).then(()=>{t=null}),t)}}}function Cf(){return xt({name:"mapbox",getInstances:()=>{if(typeof window>"u")return[];let e=window.__hfMapbox;return Array.isArray(e)?e:[]},waitFor:e=>new Promise(t=>{if(e.loaded()){t();return}e.on("load",t)})})}function Rf(){return xt({name:"leaflet",getInstances:()=>{if(typeof window>"u")return[];let e=window.__hfLeaflet;return Array.isArray(e)?e:[]},waitFor:e=>new Promise(t=>e.whenReady(t))})}function Tf(){return xt({name:"google-maps",getInstances:()=>{if(typeof window>"u")return[];let e=window.__hfGoogleMaps;return Array.isArray(e)?e:[]},waitFor:e=>new Promise(t=>{let n=e.addListener("tilesloaded",()=>{n.remove(),t()})})})}function kf(){return xt({name:"maplibre",getInstances:()=>{if(typeof window>"u")return[];let e=window.__hfMaplibre;return Array.isArray(e)?e:[]},waitFor:e=>new Promise(t=>{if(e.loaded()){t();return}e.on("load",t)})})}function Mf(){return xt({name:"d3",getInstances:()=>{if(typeof window>"u")return[];let e=window.__hfD3;return Array.isArray(e)?e:[]},waitFor:e=>e.end()})}var iE=250;function Lf(){let e=null,t=0,n=null,r=()=>{n!==null&&(window.clearInterval(n),n=null)},i=()=>{n===null&&document.querySelector("[data-composition-id][data-requires-webgpu]")&&(n=window.setInterval(()=>{e!==null&&(wf()||(window.__hfTypegpuTime=e,Bo(e)))},iE))};return{name:"typegpu",discover:()=>{},seek:o=>{e=Math.max(0,Number(o.time)||0),t=e,window.__hfTypegpuTime=e,Go(e)},pause:()=>{e==null&&(e=Math.max(0,t)),i()},play:()=>{r(),e=null},revert:()=>{r(),e=null,t=0}}}var oE=["width","height","top","left","right","bottom","inset","object-fit","object-position","z-index","opacity","visibility","filter","mix-blend-mode","backdrop-filter","border-radius","overflow","clip-path","mask","mask-image","mask-size","mask-position","mask-repeat","transform","transform-origin","translate","rotate","scale","box-sizing"];function ul(e){return Number.isFinite(e)&&e>0?e:30}function cl(e){return Number.isFinite(e)&&e>0?e:0}function dl(e,t){let n=ul(t);return Math.floor(cl(e)*n+1e-9)/n}function Ff(e,t,n){let r=Number.isInteger(n)?n:1;if(r<=1)return dl(e,t);let i=ul(t)*r;return Math.round(cl(e)*i)/i}function Nf(e,t){let n=ul(t),r=cl(e),i=r*n,o=Math.round(i);return Math.abs(i-o)<=.001?o/n:r}function Uo(e,t,n){return{start:Nf(e,n),end:Number.isFinite(t)?Nf(t,n):t}}function Vo(e,t,n=oE){for(let r of n){let i=t.getPropertyValue(r);i&&e.setProperty(r,i)}}var jn=new Map,If=()=>jn.size>0;function Df(e){if(jn.has(e.element))throw new Error("This element already has a frame source");let t=e.sourceRange;if(t&&(!Number.isFinite(t.start)||t.start<0||!Number.isFinite(t.duration)||t.duration<=0||!Number.isFinite(t.fps)||t.fps<=0))throw new Error("Frame source ranges require a nonnegative start, positive duration and FPS");let n=new AbortController,r=new Promise(u=>{n.signal.addEventListener("abort",()=>u(),{once:!0})}),i=Promise.race([Promise.resolve(e.ready),r]);i.catch(()=>{});let o=null,a=null,s=async()=>{let u;try{for(await i;!n.signal.aborted&&o!==null;){let d=o;o=null;try{await Promise.race([e.render(d,n.signal),r])}catch(f){u??(u={reason:f})}}if(u)throw u.reason}finally{o=null,a=null}},l={element:e.element,ready:i,seek(u){return o=t?t.start+Math.min(Math.max(0,u),Math.max(0,t.duration-1/t.fps)):u,a??(a=s()),a},dispose(){n.signal.aborted||(n.abort(),o=null,jn.delete(e.element),e.dispose?.())}};return jn.set(e.element,l),l.dispose}function Pf(e){let t=new Set,n=[],r=null,i=()=>{for(let s of t)jn.get(s.element)!==s&&t.delete(s);let a=[];for(let[s,l]of jn){if(!s.isConnected){l.dispose();continue}t.has(l)||(t.add(l),nt(l.ready)),a.push([s,l])}return a},o=new MutationObserver(()=>{i()});return o.observe(document,{childList:!0,subtree:!0}),{name:"frame-source",discover:()=>{i()},pause:()=>{},seek:({time:a})=>{for(let[s,l]of i()){let u=e.start(s),d=e.duration(s),f=u+(d??1/0),m=e.exportRenderSeek()?Uo(u,f,e.canonicalFps()):{start:u,end:f};if(!$n(a,m.start,m.end,e.compositionDuration()))continue;let p=Math.max(0,a-u),g=Gn(s)+On(bt(s),p);nt(l.seek(g))}},getReadyPromise:()=>{let a=i().map(([,s])=>s);return a.length===0?null:((a.length!==n.length||a.some((s,l)=>s!==n[l]))&&(n=a,r=Promise.all(a.map(s=>s.ready))),r)},revert:()=>{o.disconnect();for(let a of t)a.dispose();t.clear()}}}var Of=\':not([muted]):is(:not([data-has-audio]),[data-has-audio="true"])\',YN=`audio[data-start], video[data-start]${Of}`;function Wo(e){if(e.tagName.toLowerCase()!=="video"||e.hasAttribute("muted"))return!1;let t=e.getAttribute("data-has-audio");return t===null||t==="true"}function Hf(e){return(e.volume??1)>1||!!(e.fxChain||e.automation||e.audioGroup)}var Kr="data-hf-render-id",Gf="data-hf-group-render-id";function aE(e){return e.getAttribute(Kr)||e.id||null}var sE="__render_frame_",lE="__";function uE(e){return`${sE}${e}${lE}`}function cE(e){let t=aE(e);return t?uE(t):null}function It(e){let t=cE(e),n=t?document.getElementById(t):null;if(!n)return null;let r=e.nextElementSibling;for(;r&&r.id!==t;)r=r.nextElementSibling;return r??(r=n),Pe(r)?r:null}function Bf(e){let t=e.nextElementSibling;if(Pe(t)&&t.classList.contains("__render_frame__")&&t.complete&&t.naturalWidth>0)return t;let n=It(e);return n&&n.complete&&n.naturalWidth>0?n:null}function Uf(){let e=globalThis.GPUQueue;if(!e?.prototype?.copyExternalImageToTexture)return;let t=e.prototype.copyExternalImageToTexture;e.prototype.copyExternalImageToTexture=function(n,r,i){if(xe(n?.source)){let o=Bf(n.source);if(o)return t.call(this,{...n,source:o},r,i)}return t.call(this,n,r,i)}}function Vf(){let e=[globalThis.WebGL2RenderingContext,globalThis.WebGLRenderingContext],t=["texImage2D","texSubImage2D"];for(let n of e){let r=n?.prototype;if(r)for(let i of t){let o=r[i];if(typeof o!="function"||o.__hfVideoPatched)continue;let a=function(...s){let l=s.length-1,u=s[l];if(xe(u)){let d=Bf(u);d&&(s[l]=d)}return o.apply(this,s)};a.__hfVideoPatched=!0,r[i]=a}}}function Wf(){let e=!1,t=0,n=!1,r,i,o,a=new Set,s=new WeakMap,l=(y=()=>document.getAnimations())=>{if(!document.getAnimations)return[];try{return y()}catch{return[]}},u=y=>{let v=Number(y.currentTime);return Number.isFinite(v)&&v>0?v:0},d=(y,v)=>v<=0?y:y>=v?Math.max(0,y-v):y,f=(y,v)=>{let A=s.get(y);if(A)return A;let E={compositionTimeMs:v,animationTimeMs:e?d(u(y),v):u(y)};return s.set(y,E),E},m=(y,v)=>{if(!a.has(y)){a.add(y);let A=()=>{a.delete(y)};try{y.addEventListener("finish",A,{once:!0}),y.addEventListener("cancel",A,{once:!0})}catch(E){O("runtime.adapters.waapi.site4",E)}}f(y,v)},p=(y,v)=>{for(let A of y)m(A,v)},g=()=>{if(n||typeof Element>"u")return;let y=Element.prototype;if(typeof y.animate!="function"||y.__hfOriginalAnimate)return;let v=y.animate;try{Object.defineProperty(y,"__hfOriginalAnimate",{value:v,configurable:!0});let A=function(...E){let T=v.apply(this,E);return m(T,t),T};y.animate=A,r=y,i=v,o=A,n=!0}catch{}},b=y=>{let v=null;try{v=y.effect?.getComputedTiming?.()??null}catch(T){O("runtime.adapters.waapi.site4",T)}if(!v)return{};let A=Number(v.endTime);return Number.isFinite(A)?{endSeconds:(s.get(y)?.compositionTimeMs??0)/1e3+A/1e3}:{unbounded:!0}};return{name:"waapi",discover:()=>{e=!0,g(),p(l(),t)},seek:y=>{let v=Math.max(0,(Number(y.time)||0)*1e3);t=v,(!e||a.size>0)&&p(l(y.pageAnimations),e?v:0);for(let A of a){let E=e?f(A,v):f(A,0),T=E.animationTimeMs+Math.max(0,v-E.compositionTimeMs);try{A.currentTime=T}catch(P){O("runtime.adapters.waapi.site1",P)}try{A.pause()}catch(P){O("runtime.adapters.waapi.site2",P)}}},pause:y=>{e||p(l(y?.pageAnimations),t);for(let v of a)try{v.pause()}catch(A){O("runtime.adapters.waapi.site3",A)}},revert:()=>{if(a.clear(),s=new WeakMap,e=!1,t=0,r&&i&&o&&r.animate===o)try{r.animate=i,r.__hfOriginalAnimate===i&&delete r.__hfOriginalAnimate}catch(y){O("runtime.adapters.waapi.site5",y)}r=void 0,i=void 0,o=void 0,n=!1},getInferredDurationSeconds:()=>{let y=0;for(let v of l()){let A=b(v);A.endSeconds!=null&&(y=Math.max(y,A.endSeconds))}return y>0?y:null}}}var dE=\'[data-layer-role="background"], .scene-fill, .background, .backdrop, .bg, .scene.clip\',$f=["mask-image","mask-size","mask-repeat"],Yr=new Map,ml=new Map,Xr=new Map;function qf(e){let t=Yr.get(e);t&&($f.forEach((n,r)=>{let[i,o]=t[r];i?e.style.setProperty(n,i,o):e.style.removeProperty(n)}),Yr.delete(e))}function mE(e){return e.backgroundImage!=="none"||!/^(?:|rgba?\\(0, 0, 0, 0\\)|transparent)$/i.test(e.backgroundColor)}function fE(e){let t=Xr.get(e);if(t)return t;let n=getComputedStyle(e);return mE(n)?(t||(t=document.createElement("div"),t.dataset.avatarBackgroundProxy="true",t.setAttribute("aria-hidden","true"),t.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:-1",e.prepend(t),Xr.set(e,t),ml.set(e,["background-image","background-color","isolation"].map(r=>[e.style.getPropertyValue(r),e.style.getPropertyPriority(r)]))),t.style.background=n.background,t.style.borderRadius=n.borderRadius,e.style.setProperty("background-image","none","important"),e.style.setProperty("background-color","transparent","important"),e.style.setProperty("isolation","isolate"),t):null}function pE(e){let t=ml.get(e);t&&["background-image","background-color","isolation"].forEach((r,i)=>{let[o,a]=t[i];o?e.style.setProperty(r,o,a):e.style.removeProperty(r)});let n=Xr.get(e);n&&(qf(n),n.remove()),ml.delete(e),Xr.delete(e)}function hE(e,t,n){let r=e;for(;r&&r.parentElement!==t.parentElement;)r=r.parentElement;if(!r||r===t||(Number(getComputedStyle(r).zIndex)||0)<(Number(getComputedStyle(t).zIndex)||0))return"";let i=t.getBoundingClientRect(),o=Math.max(n.left,i.left),a=Math.max(n.top,i.top),s=Math.min(n.right,i.right),l=Math.min(n.bottom,i.bottom);if(s<=o||l<=a)return"";let u=(o-n.left)/n.width*1e4,d=(a-n.top)/n.height*1e4,f=(s-o)/n.width*1e4,m=(l-a)/n.height*1e4;return`<rect x="${u}" y="${d}" width="${f}" height="${m}" fill="black"/>`}function zf(){let e=Array.from(document.querySelectorAll("video[data-avatar-cutout]")).filter(r=>{let i=document.getElementById(r.dataset.avatarCutout||""),o=getComputedStyle(r);return i?.dataset.avatarSource===r.id&&i.parentElement===r.parentElement&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||1)>0}),t=new Set,n=new Set;if(e.length)for(let r of document.querySelectorAll(dE)){let i=r.getBoundingClientRect();if(i.width<=0||i.height<=0)continue;let o=!!(r.childElementCount||r.textContent?.trim()),a=o?fE(r):r;if(!a)continue;o&&n.add(r);let s=e.map(d=>hE(a,d,i)).join("");if(!s)continue;if(!Yr.has(a)){let d=getComputedStyle(a).maskImage;if(d&&d!=="none")continue;Yr.set(a,$f.map(f=>[a.style.getPropertyValue(f),a.style.getPropertyPriority(f)]))}let l=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10000 10000" preserveAspectRatio="none"><defs><mask id="cutout"><rect width="10000" height="10000" fill="white"/>${s}</mask></defs><rect width="10000" height="10000" fill="white" mask="url(#cutout)"/></svg>`,u=`url("data:image/svg+xml,${encodeURIComponent(l)}")`;a.style.maskImage!==u&&(a.style.maskImage=u),a.style.maskSize="100% 100%",a.style.maskRepeat="no-repeat",t.add(a)}for(let r of Yr.keys())t.has(r)||qf(r);for(let r of Xr.keys())n.has(r)||pE(r)}var Kn="data-hf-authored-duration",Yn="data-hf-authored-end";function Jr(e){if(e==null||typeof e=="string"&&e.trim()==="")return null;let t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?t:null}function Xn(e){let t=Jr(e.start);if(t==null)return null;let n=Math.max(0,t),r=Jr(e.duration),i=Jr(e.authoredDuration),o=r!=null&&r>0?r:i!=null&&i>0?i:null;if(o!=null)return{start:n,duration:o,end:n+o};let a=Jr(e.end),s=Jr(e.authoredEnd),l=a!=null&&a>n?a:s!=null&&s>n?s:null;return{start:n,duration:l==null?null:l-n,end:l}}var $o="data-hf-media-start-basis";function jf(e){return e?.trim().toLowerCase()==="global"?"global":"local"}function gE(e){return jf(e.basis)==="global"?e.authoredStart:e.hostStart+e.authoredStart}function Kf(e){return Xf(e)?gE({authoredStart:e.authoredStart,hostStart:e.hostStart,basis:e.basis}):e.ordinaryStart()}function Yf(e){return Xf(e)&&jf(e.basis)==="global"}function Xf(e){return!e.hasAutoStart&&e.authoredStart!=null&&e.hostStart>0}function ei(e){let t=Array.from(document.querySelectorAll(`[data-composition-id="${CSS.escape(e)}"]`));return t.find(n=>!n.hasAttribute("data-hf-inner-root")&&(n.hasAttribute("data-composition-file")||n.hasAttribute("data-composition-src")))??t.find(n=>!n.hasAttribute("data-hf-inner-root"))??t[0]??null}function Qr(e){if(!e.hasAttribute("data-composition-id")&&!e.hasAttribute("data-composition-src")&&!e.hasAttribute("data-composition-file"))return 1;let t=_e(e.getAttribute("data-playback-rate"));return t!=null&&t>0?t:1}function qo(e){return e.hasAttribute("data-source-duration")?Math.max(0,_e(e.getAttribute("data-playback-start"))??0):0}function zo(e){let t=e;for(;t;){if(t.hasAttribute("data-source-duration")&&Qr(t)>0&&(t.hasAttribute("data-composition-id")||t.hasAttribute("data-composition-src")||t.hasAttribute("data-composition-file")))return!0;t=Zr(t)}return!1}function Zr(e){return e.parentElement?.closest("[data-composition-id]:not([data-hf-inner-root])")??null}function Ye(e){let t=1,n=Zr(e);for(;n;)t*=Qr(n),n=Zr(n);return t}function fl(e){let{element:t,timeline:n,parent:r,timelineRegistry:i,resolver:o}=e,a=Qr(t)*Ye(t),s=qo(t),l=o.resolveStartForElement(t,0),u=1,d=0,f=0;for(let m of document.querySelectorAll("[data-composition-id]"))if(i[m.getAttribute("data-composition-id")]===r){u=Qr(m)*Ye(m),d=o.resolveStartForElement(m,0),f=qo(m);break}return zo(t)&&n.timeScale?.(a/u),f+(l-s/a-d)*u}function Xe(e){let t=e.timelineRegistry??{},n=e.includeAuthoredTimingAttrs??!1,r=e.documentRef??document,i=new WeakMap,o=new WeakMap,a=new Set,s=g=>{let b=r.getElementById(g);return b||(r.querySelector(`[data-composition-id="${CSS.escape(g)}"]`)??null)},l=g=>{let b=o.get(g);if(b!==void 0)return b;let y=null,v=Xn({start:0,duration:g.getAttribute("data-duration"),authoredDuration:n?g.getAttribute("data-hf-authored-duration"):null});if(v?.duration!=null&&v.duration>0&&(y=v.duration/Ye(g)),y==null||y<=0){let A=d(g,0),E=Xn({start:A,end:g.getAttribute("data-end"),authoredEnd:n?g.getAttribute("data-hf-authored-end"):null});if(E?.duration!=null&&E.duration>0)if(zo(g)){let T=Zr(g),P=T?d(T,0):0,N=T?qo(T):0,D=_e(g.getAttribute("data-end")??g.getAttribute("data-hf-authored-end"));D!=null&&(y=P+(D-N)/Ye(g)-A)}else y=E.duration}if((y==null||y<=0)&&pe(g)&&(y=yt(g,g.duration),y!=null&&(y/=Ye(g))),(y==null||y<=0)&&(y=Un(g)),y==null||y<=0){let A=g.getAttribute("data-composition-id");if(A){let E=t[A]??null;if(E&&typeof E.duration=="function")try{let T=Number(E.duration());Number.isFinite(T)&&T>0&&(y=T/(Qr(g)*Ye(g)))}catch(T){O("runtime.startResolver.site1",T)}}}return y!=null&&Number.isFinite(y)&&y>0?(o.set(g,y),y):(o.set(g,null),null)},u=(g,b)=>{if(g.hasAttribute("data-composition-id")){let v=g.parentElement?.closest("[data-composition-id]:not([data-hf-inner-root])");return v?d(v,b):0}let y=g.closest("[data-composition-id]");return y?d(y,b):0},d=(g,b)=>{let y=i.get(g);if(y!==void 0)return y??b;if(a.has(g))return b;a.add(g);try{let v=Ps(g.getAttribute("data-start"));if(!v){if(g.hasAttribute("data-composition-id")){let N=g.parentElement;if(N&&(N.hasAttribute("data-composition-src")||N.hasAttribute("data-composition-id")||N.hasAttribute("data-composition-file"))){let D=d(N,b);return i.set(g,D),D}}return i.set(g,b),b}if(v.kind==="absolute"){let N=Math.max(0,v.value),D=Zr(g),R=D?qo(D):0,M=Math.max(0,u(g,b)+(N-R)/Ye(g));return i.set(g,M),M}let A=s(v.refId);if(!A)return i.set(g,b),b;let E=d(A,0),T=l(A);if(T==null||T<=0){let N=Math.max(0,E+v.offset/Ye(g));return i.set(g,N),N}let P=Math.max(0,E+T+v.offset/Ye(g));return i.set(g,P),P}finally{a.delete(g)}},f=g=>{let b=g.closest("[data-composition-id]");return{authoredStart:_e(g.getAttribute("data-start")),hostStart:b?d(b,0):0,hasAutoStart:g.hasAttribute("data-hf-auto-start"),basis:g.getAttribute($o)}};return{resolveStartForElement:(g,b=0)=>d(g,Math.max(0,b)),resolveDurationForElement:g=>l(g),resolveMediaStartForElement:g=>{let b=f(g);return Kf({...b,ordinaryStart:()=>d(g,b.hostStart)})},resolveHostStartForElement:g=>u(g,0),isRootGlobalMediaStartForElement:g=>pe(g)&&Yf(f(g))}}function bE(e,t,n){let r=e.filter(o=>Number.isFinite(o.time)&&Number.isFinite(o.volume)).map(o=>({time:Math.max(0,o.time-t),volume:et(o.volume)})).sort((o,a)=>o.time-a.time),i=[];for(let o of r){let a=i.at(-1);a&&Math.abs(a.time-o.time)<1e-9?a.volume=o.volume:i.push(o)}return i.length===0||i[0].time>0&&i.unshift({time:0,volume:et(n)}),i}function Jf(e,t){if(e.length===0)return 1;let n=0;for(;n<e.length-2&&t>=e[n+1].time;)n+=1;let r=e[n],i=e[n+1]??r,o=i.time-r.time,a=o<=0?0:Math.min(1,Math.max(0,(t-r.time)/o));return r.volume+(i.volume-r.volume)*a}function yE(e,t,n,r){let i=e.at(-1);!i||Math.abs(i.volume-n.volume)>1e-4?(i&&t&&t.time>i.time&&e.push(t),e.push(n)):r&&n.time>i.time&&e.push(n)}function xE(e){let t=Number.parseFloat(e??"");return Number.isFinite(t)?t:void 0}function SE(e,t){let n=Xe({timelineRegistry:window.__timelines,includeAuthoredTimingAttrs:!0}).resolveMediaStartForElement(e),r=_e(e.dataset.end)??void 0,i=_e(e.dataset.duration)??void 0,o=t;i!==void 0&&i>0?o=n+i:r!==void 0&&r>n&&(o=r);let a=xE(e.dataset.volume)??1;return{start:n,end:o,staticVolume:et(a)}}function vE(e,t,n,r,{start:i,end:o,staticVolume:a}){let s=1/Math.min(60,Math.max(1,r)),l=Math.max(0,i),u=Math.min(n,o),d=Tm(e,()=>{e.volume=a;let m=[],p;for(let g=l;g<=u+1e-6;g=Math.min(u,g+s)){t(g);let b=Number(e.volume);if(Number.isFinite(b)){let y={time:Number(g.toFixed(6)),volume:Number(et(b).toFixed(6))};yE(m,p,y,g===u),p=y}if(g===u)break}return m});return d.some(m=>Math.abs(m.volume-a)>1e-4)?d:null}function jo(e,t,n=0){return n>3||e===null||typeof e!="object"?!1:Array.isArray(e)?e.some(r=>jo(r,t,n+1)):Object.getPrototypeOf(e)!==Object.prototype?!1:Object.entries(e).some(([r,i])=>t(r)||jo(i,t,n+1))}var EE=e=>typeof e?.nodeType=="number";function AE(e,t){for(let n=Object(e);n;n=Object.getPrototypeOf(n)){let r=Object.getOwnPropertyDescriptor(n,t);if(r)return typeof r.set=="function"}return!1}function wE(e,t){if(typeof e.getChildren!="function")return!0;try{return e.getChildren(!0,!0,!1).some(n=>(n.targets?.()??[]).some(i=>EE(i)?i===t&&jo(n.vars,o=>o==="volume"):jo(n.vars,o=>AE(i,o))))}catch{return!0}}function Qf(e,t,n,r,i={}){if(i.allowLiveTimelineSeek===!1||!t||!pe(e)||n<=0||!wE(t,e))return;let o=u=>{try{typeof t.totalTime=="function"?t.totalTime(u,!0):typeof t.seek=="function"&&t.seek(u,!0)}catch{}},a=typeof t.totalTime=="function"?Number(t.totalTime()):typeof t.seek=="function"?Number(t.seek()):0,s=SE(e,n),l=vE(e,o,n,60,s);if(Number.isFinite(a)&&o(a),l){let u=bE(l,s.start,s.staticVolume);u.length>0&&r.set(e,u)}}var tp="data-fade-in",np="data-fade-out",EF=tp.slice(5),AF=np.slice(5),rp=Object.freeze({fadeIn:0,fadeOut:0});function pl(e){return Number.isFinite(e)&&e>0?e:0}function Zf(e){return e==null||e===""?0:pl(Number.parseFloat(e))}function ip(e){return{fadeIn:Zf(e.getAttribute(tp)),fadeOut:Zf(e.getAttribute(np))}}function _E(e,t){let n=pl(e.fadeIn),r=pl(e.fadeOut);if(!Number.isFinite(t)||t<=0)return{fadeIn:n,fadeOut:r};let i=n+r;if(i<=t)return{fadeIn:n,fadeOut:r};let o=t/i;return{fadeIn:n*o,fadeOut:r*o}}function op(e,t,n){if(!Number.isFinite(e))return 1;let{fadeIn:r,fadeOut:i}=_E(n,t),o=1;return r>0&&(o*=ep(e/r)),i>0&&Number.isFinite(t)&&(o*=ep((t-e)/i)),o}function ep(e){return!Number.isFinite(e)||e<0?0:e>1?1:e}var Jn="hf-audio-group",Ko="data-audio-group";function hl(e){let t=e?.getAttribute("data-volume"),n=t?parseFloat(t):1;return Number.isFinite(n)?n:1}function gl(e,t){let n=Array.from(e?.querySelectorAll?.(`${Jn}[${Kr}]`)??[]).find(i=>i.getAttribute(Kr)===t);if(n)return n;let r=e?.getElementById(t)??null;return r&&r.tagName?.toLowerCase()===Jn?r:null}function Yo(e,t){let n=t?.getAttribute?.(Gf)??t?.getAttribute?.(Ko);return n?gl(e,n)?.hasAttribute("data-hidden")??!1:!1}function Xo(e){return typeof e.tagName!="string"||typeof e.getAttribute!="function"||!CE(e)?null:e.getAttribute(Ko)||null}function CE(e){return e.tagName.toLowerCase()==="audio"?!0:typeof e.hasAttribute=="function"&&Wo(e)}function ap(e){let t="__hf-audio-group-inert";if(!e?.head||e.getElementById(t))return;let n=e.createElement("style");n.id=t,n.textContent=`${Jn}{display:none!important}`,e.head.appendChild(n)}function St(e){return Gn(e)}var sp=new WeakSet;function RE(e){if(!e.error||e.readyState!==0||sp.has(e))return;let t=e.getAttribute("src");if(!t)return;sp.add(e);let n=new URL(t,document.baseURI);n.searchParams.set("_hfAvatarRetry","1"),e.src=n.href,e.load()}function El(){for(let e of document.querySelectorAll("video[data-avatar-source]")){let t=document.getElementById(e.dataset.avatarSource||"");if(!(t instanceof HTMLVideoElement)||t.parentElement!==e.parentElement||t.dataset.avatarCutout!==e.id){e.style.display="none",e.pause();continue}RE(e);let n=getComputedStyle(t);Vo(e.style,n),e.style.position=n.position,e.style.display=n.display,e.style.pointerEvents="none";let r=Array.from(t.parentElement?.children??[]).filter(i=>!i.hasAttribute("data-avatar-source")&&i instanceof HTMLElement);e.style.zIndex=String(Math.max(0,...r.map(i=>Number.parseFloat(getComputedStyle(i).zIndex)||0))+1);for(let i of["data-start","data-duration","data-media-start","data-playback-start","data-playback-rate","data-source-duration","data-hidden","loop"]){let o=t.getAttribute(i);o===null?e.hasAttribute(i)&&e.removeAttribute(i):e.getAttribute(i)!==o&&e.setAttribute(i,o)}e.defaultPlaybackRate=t.defaultPlaybackRate,e.muted=!0,e.volume=0}zf()}function Al(){let e=document.documentElement;if(!e||typeof MutationObserver>"u")return()=>{};let t=!1,n=new MutationObserver(r=>{!r.some(({target:o})=>o instanceof HTMLVideoElement&&o.hasAttribute("data-avatar-cutout"))||t||(t=!0,queueMicrotask(()=>{t=!1,El()}))});return n.observe(e,{subtree:!0,attributes:!0,attributeFilter:["style","class","data-avatar-cutout","data-start","data-duration","data-media-start","data-playback-start","data-playback-rate","data-source-duration","data-hidden","loop"]}),()=>n.disconnect()}var lp=["seeked","loadeddata","error","emptied","abort"],wl=5e3,Jo=new WeakMap;function up(e){let t=e.readyState<e.HAVE_CURRENT_DATA&&e.networkState===e.NETWORK_LOADING&&!window.__HF_EXPORT_RENDER_SEEK_CONFIG;e.tagName!=="VIDEO"||!(e.seeking||t)||It(e)||(Jo.get(e)?.(),nt(new Promise(n=>{let r=o=>{if(!(o?.type==="loadeddata"&&e.seeking)){clearTimeout(i);for(let a of lp)e.removeEventListener(a,r,!0);Jo.get(e)===r&&Jo.delete(e),n()}},i=setTimeout(r,wl);for(let o of lp)e.addEventListener(o,r,!0);Jo.set(e,r)})))}function cp(e){let t=e.isVideo?e.explicitDuration??e.sourceDuration:e.sourceDuration,n=(e.isVideo?[t,e.hostRemaining]:[t,e.hostRemaining,e.explicitDuration]).filter(r=>r!=null&&Number.isFinite(r)&&r>=0);return n.length>0?Math.min(...n):null}function dp(e){let t=e?.elements??Array.from(document.querySelectorAll("video, audio")),n=e?.shouldIncludeElement?t.filter(a=>e.shouldIncludeElement?.(a)):t.filter(a=>a.hasAttribute("data-start")),r=[],i=[],o=0;for(let a of n){let s=e?.resolveStartSeconds?e.resolveStartSeconds(a):Number.parseFloat(a.dataset.start??"0");if(!Number.isFinite(s))continue;let l=St(a),u=e?.resolvePlaybackRate?.(a)??Ve(a),d=bt(a),f=a.loop,m=Number.isFinite(a.duration)&&a.duration>0?a.duration:null,p=e?.resolveDurationSeconds?.(a)??Number.parseFloat(a.dataset.duration??"");(!Number.isFinite(p)||p<0)&&m!=null&&(p=Math.max(0,Sn(d,m-l)));let g=Number.isFinite(p)&&p>=0,b=g?s+p:Number.POSITIVE_INFINITY,y=Number.parseFloat(a.dataset.volume??""),v={el:a,start:s,mediaStart:l,duration:g?p:Number.POSITIVE_INFINITY,end:b,volume:Number.isFinite(y)?y:null,playbackRate:u,rate:d,loop:f,sourceDuration:m,fades:ip(a)};r.push(v),a.tagName==="VIDEO"&&i.push(v),Number.isFinite(b)&&(o=Math.max(o,b))}return{timedMediaEls:n,mediaClips:r,videoClips:i,maxMediaEnd:o}}var xl=new WeakMap,Qo=new WeakMap,ti=new WeakMap,Sl=new WeakSet,Qn=new WeakSet,bl=new WeakSet;function TE(e){if(Qn.has(e))return;Qn.add(e);let t=()=>Qn.delete(e);e.addEventListener("playing",t,{once:!0}),e.addEventListener("pause",t,{once:!0}),e.addEventListener("error",t,{once:!0})}var kE=3;function _l(e){return e.error!=null||e.networkState===kE}var vl=new WeakMap;function yl(e){return Number.isFinite(e)?Math.max(0,Math.min(1,e)):1}function Cl(e){xl.delete(e),Qo.delete(e),ti.delete(e),Sl.delete(e),vl.delete(e),ni.delete(e)}var Rl=.5,Yt=.04,ME=.03,LE=.01,ni=new WeakMap;function NE(e,t,n){let r=Math.sign(t),i=ni.get(e);if(Math.abs(t)>Yt)ni.set(e,r);else if(i!==r||Math.abs(t)<=LE)return ni.delete(e),n;return n*(1+r*ME)}function mp(e){let t=!!(e.outputMuted||e.userMuted);for(let n of e.clips){let{el:r}=n;if(!r.isConnected)continue;let i=n.rate??n.playbackRate,o=r.tagName==="VIDEO"&&!n.loop,a=Kt(e.timeSeconds,n.start,n.end),s=n.start-e.timeSeconds,l=r.tagName==="AUDIO"&&!a&&s>0&&s*Math.max(1,js(i,0))<=Math.max(e.cueAheadSeconds??0,bl.has(r)?Yt:0);l?bl.add(r):bl.delete(r);let u=o&&!a&&(e.timeSeconds>=n.end||zr(e.timeSeconds,n.end))&&$n(e.timeSeconds,n.start,n.end,e.getCompositionDuration()),d=On(i,Math.max(0,Math.min(e.timeSeconds,n.end)-n.start))+n.mediaStart,f=u||o&&n.sourceDuration!=null&&d>=n.sourceDuration&&a;f&&n.sourceDuration!=null&&(d=Math.min(d,n.sourceDuration));let m=Qo.get(r),p=r.tagName==="AUDIO"&&(m===void 0||d<m-.04),g=!n.loop&&n.sourceDuration!=null&&d>=n.mediaStart&&d<n.sourceDuration&&(o||p);if((a||u||l)&&d>=0&&(!r.ended||n.loop||f||g)){if(Qo.set(r,d),n.loop&&n.sourceDuration!=null&&n.sourceDuration>0){let Z=n.sourceDuration-n.mediaStart;Z>0&&d>=n.sourceDuration&&(d=n.mediaStart+(d-n.mediaStart)%Z)}let v=yl(e.userVolume??1),A=et(n.volume??1),E=vl.get(r),T=yl(r.volume),P,N=Dm(r,e.timeSeconds-n.start);if(N!==null)P=et(N);else if(n.volumeKeyframes&&n.volumeKeyframes.length>0){let Z=e.timeSeconds-n.start;P=et(Jf(n.volumeKeyframes,Z))}else e.isWebAudioRouted?.(r)?P=A:E===void 0?P=A>1?A:T:Math.abs(T-E)>1e-4?P=T:P=A;let D=n.fades??rp;(D.fadeIn>0||D.fadeOut>0)&&(P*=op(e.timeSeconds-n.start,n.duration,D));let M=r.closest("[data-hidden]")!==null||Yo(r.ownerDocument,r)?0:yl(P*v);r.volume=M,vl.set(r,M),e.onElementVolume?.(r,M,P),(t||e.isWebAudioOwned?.(r))&&(r.muted=!0),r.preload!=="auto"&&(r.preload="auto");let k=js(i,e.timeSeconds-n.start)*e.playbackRate,U=2,K=r.currentTime||0,X=Math.abs(K-d),L=d-K,C=xl.get(r);xl.set(r,L);let H=C===void 0,J=!H&&Math.abs(L-C)>.5,B=X>3,z=r.tagName==="AUDIO"&&H&&K-d>Yt,q=f&&X>.001||r.ended&&g&&X>.001||z||X>Rl&&(H||J||B),Y=r.tagName==="VIDEO"&&!r.paused&&e.playing,j=C!==void 0&&Math.abs(L-C)<.004,G=!1;if(!Y&&!q&&!H&&j&&X>Yt){let Z=(ti.get(r)??0)+1;ti.set(r,Z),Z>=U&&(G=!0,ti.set(r,0))}else X<=Yt&&ti.set(r,0);let V=!Y&&e.forceSync&&X>.02;try{(!Y||q)&&ni.delete(r);let Z=Y&&!q?NE(r,L,k):k;Math.abs(r.playbackRate-Z)>1e-6&&(r.playbackRate=Z)}catch(Z){O("runtime.media.site1",Z)}if(q||G||V){if(!(r.tagName==="VIDEO"&&!!It(r))){try{r.currentTime=d}catch(de){O("runtime.media.site2",de)}if(Math.abs(r.currentTime-d)>.5&&!Sl.has(r)){Sl.add(r),r.load();try{r.currentTime=d}catch(de){O("runtime.media.site3",de)}}up(r)}Qn.delete(r)}else e.playing||up(r);f?r.paused||r.pause():e.playing&&r.paused&&!Qn.has(r)&&!_l(r)?(TE(r),r.play().catch(Z=>{Qn.delete(r),(Z&&typeof Z=="object"&&"name"in Z?String(Z.name??""):"")==="NotAllowedError"&&e.onAutoplayBlocked?.()})):!e.playing&&!r.paused&&r.pause();continue}let y=Kt(e.timeSeconds,n.start,n.end);Cl(r),y&&Qo.set(r,d),r.paused||r.pause()}}var Xt=new WeakMap;function ri(e){return Xt.has(e)?Xt.get(e)??null:e.getAttribute("src")}async function fp(e,t){let n=0;for(;t();){let r=await fetch(e,{headers:{Range:"bytes=0-0"},cache:"no-store"}).catch(()=>null);r?.body?.cancel().catch(()=>{});let i=r?.status===202||r?.status===503;if(!i&&r?.ok)return!0;if(!i&&++n>3)return!1;let o=Math.min(Number(r?.headers.get("Retry-After"))||2,30);await new Promise(a=>setTimeout(a,o*1e3))}return!1}var FE="hf-proxy",pp="runtime_media_proxy_fallback",hp="runtime_media_proxy_unavailable",gp=new WeakSet,ii=new WeakMap;function Zo(e){return e.currentSrc||e.src}function Tl(e){return window.__HF_EXPORT_RENDER_SEEK_CONFIG?!0:xe(e)&&!!It(e)}function kl(e){let t=Zo(e);if(!t)return null;let n;try{n=new URL(t,document.baseURI)}catch{return null}if(n.origin!==window.location.origin)return null;try{return decodeURIComponent(n.pathname)}catch{return n.pathname}}function IE(e,t){let n=null;for(let r of Object.keys(t))e.endsWith(r)&&(n===null||r.length>n.length)&&(n=r);return n?t[n]??null:null}function DE(e,t){let n=e.normalize("NFC").toLowerCase(),r=-1,i=null,o=!1;for(let[a,s]of Object.entries(t)){let l=a.normalize("NFC").toLowerCase();n.endsWith(l)&&(l.length>r?(r=l.length,i=s,o=!1):l.length===r&&(o=!0))}return o?null:i}function Ml(e,t){return t[e]??IE(e,t)??DE(e,t)}function PE(e,t){let n=new URL(e,document.baseURI);return n.searchParams.set(FE,t?t.hasAlpha?"vp8":"h264":"auto"),n.href}var OE={cross_origin:"video reports zero decodable width but its source is cross-origin; no local proxy can be served for it",proxy_playback_failed:"the authoring proxy itself failed to decode; render output is unaffected",browser_safe_codec:"the file errored but its codec is browser-decodable; a proxy cannot help (the file itself is likely corrupt)",invalid_source_url:"the media source URL is malformed and cannot be proxied"};function Jt(e,t,n){if(gp.has(e))return;gp.add(e);let r=OE[t];Ae({source:"hf-preview",type:"diagnostic",code:hp,details:{asset:n,codecName:null,reason:t,note:r}}),console.info(`[hyperframes] ${hp}: "${n}" (${t}): ${r}`)}function Ll(e,t=null,n="reactive"){if(Xt.has(e)||ii.has(e)&&ii.get(e)===e.getAttribute("src"))return;let r=Zo(e),i;try{i=PE(r,t)}catch(d){O("runtime.mediaProxy.swap",d),Jt(e,"invalid_source_url",r);return}let o=e.getAttribute("src");ii.set(e,o);let a=()=>e.isConnected&&e.getAttribute("src")===o,s=fp(i,a).then(d=>{if(!a()){ii.get(e)===o&&ii.delete(e);return}if(!d){Jt(e,"proxy_playback_failed",r);return}return Xt.set(e,o),Cl(e),e.src=i,e.load(),new Promise(f=>{e.addEventListener("loadeddata",f,{once:!0}),e.addEventListener("error",f,{once:!0})})});nt(Promise.race([s,new Promise(d=>setTimeout(d,wl))]));let l=t?.codecName??null;Ae({source:"hf-preview",type:"diagnostic",code:pp,details:{asset:r,codecName:l,trigger:n,note:"render output is unaffected; only this preview element was swapped to an authoring proxy"}}),console.info(`[hyperframes] ${pp}: "${r}" uses a codec (${l??"unknown"}) this browser can\'t decode; auto-swapped to an authoring proxy for this preview only. Render output is unaffected.`)}function bp(e){if(Tl(e)||!xe(e)||Xt.has(e))return;let t=window.__HF_MEDIA_CODEC_MAP__;if(!t)return;let n=kl(e);if(n===null)return;let r=Ml(n,t);if(!r||!r.browserHostile)return;let i=r.representativeMime?e.canPlayType(r.representativeMime):"";i==="probably"||i==="maybe"||Ll(e,r,"proactive")}function yp(e){if(Tl(e)||!xe(e)||e.videoWidth!==0)return;let t=Zo(e);if(Xt.has(e)){Jt(e,"proxy_playback_failed",t);return}let n=window.__HF_MEDIA_CODEC_MAP__;if(!n)return;let r=kl(e);if(r===null){Jt(e,"cross_origin",t);return}let i=Ml(r,n);if(i&&!i.browserHostile){Jt(e,"browser_safe_codec",t);return}Ll(e,i,"reactive")}function xp(e){if(Tl(e)||!xe(e))return;let t=Zo(e);if(Xt.has(e)){Jt(e,"proxy_playback_failed",t);return}let n=window.__HF_MEDIA_CODEC_MAP__;if(!n)return;let r=kl(e);if(r===null){Jt(e,"cross_origin",t);return}let i=Ml(r,n);if(i&&!i.browserHostile){Jt(e,"browser_safe_codec",t);return}Ll(e,i,"tertiary")}var Ne=class extends Error{constructor(n,r=null){super(r==null?n:`${n} at line ${r}`);ce(this,"lineNumber");this.name="CubeLutParseError",this.lineNumber=r}},HE=[0,0,0],GE=[1,1,1],ea=64;function BE(e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];if(r===\'"\'&&(t=!t),r==="#"&&!t)return e.slice(0,n)}return e}function Qt(e,t){let n=Number(e);if(!Number.isFinite(n))throw new Ne(`Invalid number "${e}"`,t);return n}function Sp(e,t,n){if(e.length!==3)throw new Ne(`${t} expects three numbers`,n);return[Qt(e[0],n),Qt(e[1],n),Qt(e[2],n)]}function vp(e,t,n){if(!e)throw new Ne(`${t} expects a size`,n);let r=Number(e);if(!Number.isInteger(r)||r<2)throw new Ne(`${t} must be an integer greater than 1`,n);return r}function UE(e,t){if(t[0]<=e[0]||t[1]<=e[1]||t[2]<=e[2])throw new Ne("DOMAIN_MAX values must be greater than DOMAIN_MIN values")}function VE(e){let t=/^TITLE\\s+"([^"]*)"\\s*$/i.exec(e);if(t)return t[1]??null;let n=/^TITLE\\s+(.+)\\s*$/i.exec(e);return n&&(n[1]??"").trim()||null}function WE(e){return/^[+-]?(?:\\d|\\.\\d)/.test(e)}function Ep(e,t={}){let n=t.maxSize??ea,r=null,i=HE,o=GE,a=null,s=null,l=[],u=e.replace(/^\\uFEFF/,"").split(/\\r?\\n/);for(let f=0;f<u.length;f++){let m=f+1,p=BE(u[f]??"").trim();if(!p)continue;let g=p.split(/\\s+/),b=(g[0]??"").toUpperCase(),y=g.slice(1);if(b==="TITLE"){r=VE(p);continue}if(b==="DOMAIN_MIN"){i=Sp(y,b,m);continue}if(b==="DOMAIN_MAX"){o=Sp(y,b,m);continue}if(b==="LUT_3D_INPUT_RANGE"){if(y.length!==2)throw new Ne(`${b} expects two numbers`,m);let v=Qt(y[0],m),A=Qt(y[1],m);if(A<=v)throw new Ne("LUT_3D_INPUT_RANGE max must exceed min",m);i=[v,v,v],o=[A,A,A];continue}if(b==="LUT_1D_SIZE"){a=vp(y[0],b,m);continue}if(b==="LUT_3D_SIZE"){if(s=vp(y[0],b,m),s>n)throw new Ne(`LUT_3D_SIZE ${s} exceeds max ${n}`,m);continue}if(!WE(b)){if(b.startsWith("LUT_"))throw new Ne(`Unsupported cube keyword ${b}`,m);continue}if(!s)throw a?new Ne("1D cube LUTs are not supported yet",m):new Ne("LUT data appears before LUT_3D_SIZE",m);if(g.length!==3)throw new Ne("LUT data rows must contain three numbers",m);l.push(Qt(g[0],m),Qt(g[1],m),Qt(g[2],m))}if(a&&s)throw new Ne("Mixed 1D and 3D cube LUTs are not supported yet");if(!s)throw a?new Ne("1D cube LUTs are not supported yet"):new Ne("Missing LUT_3D_SIZE");UE(i,o);let d=s*s*s;if(l.length!==d*3)throw new Ne(`Expected ${d} LUT rows for size ${s}, found ${l.length/3}`);return{title:r,size:s,domainMin:i,domainMax:o,data:new Float32Array(l)}}function $E(e){return Number.isFinite(e)?Math.min(1,Math.max(0,e)):0}function oi(e){return Math.round($E(e)*255)}function Nl(e){let t=e.size,n=t*t,r=t,i=new Uint8Array(n*r*4);for(let o=0;o<t;o++)for(let a=0;a<t;a++)for(let s=0;s<t;s++){let l=((o*t+a)*t+s)*3,u=(a*n+o*t+s)*4;i[u]=oi(e.data[l]??0),i[u+1]=oi(e.data[l+1]??0),i[u+2]=oi(e.data[l+2]??0),i[u+3]=255}return{width:n,height:r,data:i}}var Ap="rec709";var Ce={hueDegrees:{min:0,max:360,inclusiveMax:!1},unit:{min:0,max:1},signedUnit:{min:-1,max:1},secondaryHueRange:{min:0,max:180},secondaryHueSoftness:{min:0,max:180},secondaryHueCombinedMax:180,secondarySoftRangeSoftness:{min:0,max:.5},secondaryHueShift:{min:-180,max:180},effects:{asciiStyle:{min:0,max:7},bloom:{min:0,max:3},bloomRadius:{min:1,max:100},monoScreenShape:{min:0,max:4}}};var wp=["exposure","contrast","highlights","shadows","whites","blacks","temperature","tint","vibrance","saturation"],_p=["shadows","midtones","highlights"],Cp=["master","red","green","blue"],Rp=["hueVsHue","hueVsSaturation","hueVsLuma"];var Tp=["vignette","vignetteMidpoint","vignetteRoundness","vignetteFeather","grain","grainSize","grainRoughness"],kp=["blur","pixelate","chromaBleed","tapeDamage","tapeTracking","tapeNoise","tapeSpeed","filmArtifacts","halftone","halftoneSize","twoInkPrint","twoInkPrintSize","ascii","asciiSize","asciiInvert","asciiStyle","asciiColor","asciiRotation","dither","ditherSize","bloom","bloomRadius","monoScreen","monoScreenSize","monoScreenAngle","monoScreenSpread","monoScreenShape","monoScreenInvert","scanlines","scanlineCount","scanlineSoftness","chromaticAberration","chromaticAngle","crtCurvature","digitalGlitch","digitalGlitchColorSplit","digitalGlitchLineTear","digitalGlitchPixelate","digitalGlitchBlockAmount","digitalGlitchBlockDisplacement","digitalGlitchBlockOpacity","digitalGlitchSpeed","engraving","engravingSpacing","engravingMinThickness","engravingMaxThickness","engravingAngle","engravingContrast","engravingSharpness","engravingWave","engravingWaveFrequency","crosshatch","crosshatchSpacing","crosshatchThickness","crosshatchAngle","crosshatchContrast","crosshatchEdges","crosshatchLineWeight","crosshatchWave","crosshatchWaveFrequency","kuwahara","kuwaharaRadius","kuwaharaSharpness","kuwaharaSaturation"];var oI=Ce.unit,aI=Ce.signedUnit,sI=Ce.effects;var vt=1024,ai=16;function Mp(e,t,n,r){let i=((2*e+t)*n-e*r)/(e+t);return Math.sign(i)!==Math.sign(n)?0:Math.sign(n)!==Math.sign(r)&&Math.abs(i)>3*Math.abs(n)?3*n:i}function Fe(e,t){let n=e[t];if(n===void 0)throw new RangeError("Color curve points must be contiguous");return n}function qE(e){let t=[],n=[],r=Fe(e,0);for(let a of e.slice(1)){let s=a[0]-r[0];t.push(s),n.push((a[1]-r[1])/s),r=a}let i=Fe(n,0);if(e.length===2)return[i,i];let o=new Array(e.length);o[0]=Mp(Fe(t,0),Fe(t,1),i,Fe(n,1)),o[o.length-1]=Mp(Fe(t,t.length-1),Fe(t,t.length-2),Fe(n,n.length-1),Fe(n,n.length-2));for(let a=1;a<e.length-1;a+=1){let s=Fe(n,a-1),l=Fe(n,a);if(s===0||l===0||Math.sign(s)!==Math.sign(l)){o[a]=0;continue}let u=Fe(t,a-1),d=Fe(t,a),f=2*d+u,m=d+2*u;o[a]=(f+m)/(f/s+m/l)}return o}function Lp(e,t){if(e.length<2)throw new RangeError("A color curve requires at least two points");if(!Number.isInteger(t)||t<2)throw new RangeError("Curve LUT size must be at least 2");let n=Number.NEGATIVE_INFINITY;for(let[r,i]of e){if(!Number.isFinite(r)||!Number.isFinite(i))throw new TypeError("Color curve points must be finite");if(r<=n)throw new RangeError("Color curve inputs must be strictly increasing");n=r}}function zE(e,t,n){if(!Number.isFinite(t)||!Number.isFinite(n)||t>=n)throw new RangeError("Curve output bounds must be finite and increasing");if(e.some(([,r])=>r<t||r>n))throw new RangeError(`Curve outputs must be between ${t} and ${n}`)}function jE(e,t,n,r,i){let o=n[0]-t[0],a=Math.min(1,Math.max(0,(e-t[0])/o)),s=a*a,l=s*a;return(2*l-3*s+1)*t[1]+(l-2*s+a)*o*r+(-2*l+3*s)*n[1]+(l-s)*o*i}function Np(e,t,n,r,i){zE(e,r,i);let o=qE(e),a=new Float32Array(t),s=0;for(let l=0;l<t;l+=1){let u=n(l);for(;s<e.length-2&&u>Fe(e,s+1)[0];)s+=1;let d=Fe(e,s),f=Fe(e,s+1),m=jE(u,d,f,Fe(o,s),Fe(o,s+1));a[l]=Math.min(i,Math.max(r,m))}return a}function Zn(e,t=vt){if(Lp(e,t),e.length>ai)throw new RangeError(`A color curve supports at most ${ai} points`);if(e.some(([n])=>n<0||n>1))throw new RangeError("Color curve inputs must be between 0 and 1");if(e[0]?.[0]!==0||e[e.length-1]?.[0]!==1)throw new RangeError("Color curves must include input endpoints 0 and 1");return Np(e,t,n=>n/(t-1),0,1)}function Il(e,t,n,r=vt){if(e.length<3)throw new RangeError("A hue curve requires at least three points");if(e.length>ai)throw new RangeError(`A hue curve supports at most ${ai} points`);let i=[...e].sort((l,u)=>l[0]-u[0]);for(let l=0;l<i.length;l+=1){let u=i[l];if(!u||u[0]<0||u[0]>=360)throw new RangeError("Hue curve inputs must be from 0 up to 360 degrees");if(l>0&&u[0]===i[l-1]?.[0])throw new RangeError("Hue curve inputs must be unique")}let o=i.slice(-2).map(([l,u])=>[l-360,u]),a=i.slice(0,2).map(([l,u])=>[l+360,u]),s=[...o,...i,...a];return Lp(s,r),Np(s,r,l=>l/r*360,t,n)}var si="data-color-grading",vn="data-hf-color-grading-source-hidden",En="data-hf-authored-opacity",Op="__hf_color_grading_",YE=Ap,Ol={exposure:0,contrast:0,highlights:0,shadows:0,whites:0,blacks:0,temperature:0,tint:0,vibrance:0,saturation:0},Hl={vignette:0,vignetteMidpoint:.5,vignetteRoundness:0,vignetteFeather:.65,grain:0,grainSize:.25,grainRoughness:.5},Gl={blur:0,pixelate:0,chromaBleed:0,tapeDamage:0,tapeTracking:0,tapeNoise:1,tapeSpeed:.5,filmArtifacts:0,halftone:0,halftoneSize:0,twoInkPrint:0,twoInkPrintSize:0,ascii:0,asciiSize:5/76,asciiInvert:0,asciiStyle:0,asciiColor:1,asciiRotation:0,dither:0,ditherSize:0,bloom:0,bloomRadius:8,monoScreen:0,monoScreenSize:0,monoScreenAngle:0,monoScreenSpread:0,monoScreenShape:0,monoScreenInvert:0,scanlines:0,scanlineCount:0,scanlineSoftness:0,chromaticAberration:0,chromaticAngle:0,crtCurvature:0,digitalGlitch:0,digitalGlitchColorSplit:0,digitalGlitchLineTear:0,digitalGlitchPixelate:0,digitalGlitchBlockAmount:0,digitalGlitchBlockDisplacement:0,digitalGlitchBlockOpacity:0,digitalGlitchSpeed:0,engraving:0,engravingSpacing:7/17,engravingMinThickness:.2,engravingMaxThickness:3.2/7,engravingAngle:.25,engravingContrast:7/15,engravingSharpness:.59,engravingWave:.2,engravingWaveFrequency:2/9,crosshatch:0,crosshatchSpacing:7/25,crosshatchThickness:.25,crosshatchAngle:.25,crosshatchContrast:1/3,crosshatchEdges:.5,crosshatchLineWeight:0,crosshatchWave:.33,crosshatchWaveFrequency:2/9,kuwahara:0,kuwaharaRadius:1/7,kuwaharaSharpness:5/16,kuwaharaSaturation:.5};var ra=wp,Hp=_p,Gp=Cp,Bp=Rp,Ul=Tp,Vl=kp,Fp={exposure:.03,contrast:-.12,highlights:-.1,shadows:.16,whites:-.04,blacks:.08,temperature:.13,vibrance:-.08,saturation:-.08},Ip={vignette:.18};function Ie(e,t,n={},r={},i={},o=1){return{id:e,label:t,intensity:o,adjust:{...Ol,...n},details:{...Hl,...r},effects:{...Gl,...i}}}var Wl=[Ie("neutral","Neutral"),Ie("warm-daylight","Warm Daylight",{exposure:.06,contrast:.07,highlights:-.06,shadows:.08,temperature:.18,saturation:.08}),Ie("clean-studio","Clean Studio",{contrast:.08,highlights:-.08,shadows:.06,temperature:-.08,tint:.03,saturation:.04}),Ie("skin-soft","Skin Soft",{exposure:.04,contrast:-.03,highlights:-.12,shadows:.12,temperature:.08,tint:.02,saturation:.04}),Ie("food-pop","Food Pop",{exposure:.06,contrast:.1,shadows:.06,temperature:.14,vibrance:.1,saturation:.18}),Ie("night-lift","Night Lift",{exposure:.08,contrast:.08,highlights:-.18,shadows:.2,blacks:-.08,saturation:.04},{vignette:.12}),Ie("muted-editorial","Muted Editorial",{exposure:-.02,contrast:.08,highlights:-.08,shadows:.06,blacks:-.05,temperature:-.03,saturation:-.12},{vignette:.1}),Ie("vintage-wash","Vintage Wash",Fp,Ip),Ie("mono-clean","Mono Clean",{contrast:.12,highlights:-.04,shadows:.04,blacks:-.08,saturation:-1}),Ie("mono-fade","Mono Fade",{contrast:-.04,highlights:-.06,shadows:.1,blacks:.12,saturation:-1},{vignette:.08}),Ie("soft-boost","Soft Boost",{exposure:.06,contrast:-.04,highlights:-.14,shadows:.16,vibrance:.08,saturation:.1}),Ie("bright-pop","Bright Pop",{exposure:.12,contrast:.12,whites:.08,blacks:-.04,vibrance:.08,saturation:.14}),Ie("deep-contrast","Deep Contrast",{exposure:-.03,contrast:.2,highlights:-.08,shadows:-.08,blacks:-.12,saturation:.06}),Ie("creator-camcorder","Creator Camcorder",{contrast:.08,highlights:-.05,shadows:.02,whites:.03,blacks:-.04,temperature:-.03,tint:-.015,vibrance:-.03,saturation:-.06},{vignette:.06,grain:.08,grainSize:.18,grainRoughness:.58},{chromaBleed:.55},.72),Ie("vhs-playback","VHS Playback",{contrast:-.04,saturation:-.08},{grain:.16,grainSize:.12,grainRoughness:.72},{tapeDamage:.82,tapeTracking:.85,tapeNoise:.3,tapeSpeed:.5,chromaBleed:.5,chromaticAberration:.18,scanlines:.35,scanlineCount:.17,scanlineSoftness:1,digitalGlitch:.32,digitalGlitchLineTear:.08,digitalGlitchSpeed:.5}),Ie("home-movie-8mm","8mm Home Movie",Fp,{...Ip,vignette:.28,vignetteMidpoint:.54,vignetteFeather:.72,grain:.34,grainSize:.18,grainRoughness:.72},{filmArtifacts:.62},.72),Ie("editorial-halftone","Editorial Halftone",{contrast:.04,saturation:.04},{},{halftone:.94,halftoneSize:.36}),Ie("two-ink-print","Two-Ink Print",{contrast:.08,highlights:-.06,shadows:.04},{},{twoInkPrint:1,twoInkPrintSize:.42})],XE=new Map(Wl.map(e=>[e.id,e])),JE=/^\\$(?:\\{([A-Za-z0-9_.:-]+)\\}|([A-Za-z0-9_.:-]+))$/,QE={exposure:{min:-2,max:2},contrast:{min:-1,max:1},highlights:{min:-1,max:1},shadows:{min:-1,max:1},whites:{min:-1,max:1},blacks:{min:-1,max:1},temperature:{min:-1,max:1},tint:{min:-1,max:1},vibrance:{min:-1,max:1},saturation:{min:-1,max:1}},er={hue:0,amount:0,level:0},Dp={amount:Ce.unit,level:Ce.signedUnit},Zt=[[0,0],[1,1]],tr=[],ZE={hueVsHue:Ce.secondaryHueShift,hueVsSaturation:Ce.signedUnit,hueVsLuma:Ce.signedUnit},Dl={center:0,range:180,softness:0},Pl={min:0,max:1,softness:.05},eA={vignette:Ce.unit,vignetteMidpoint:Ce.unit,vignetteRoundness:Ce.signedUnit,vignetteFeather:Ce.unit,grain:Ce.unit,grainSize:Ce.unit,grainRoughness:Ce.unit},Bl=Ce.unit,tA=Ce.effects,Up=["blur","pixelate","chromaBleed","tapeDamage","filmArtifacts","halftone","twoInkPrint","ascii","dither","bloom","monoScreen","scanlines","chromaticAberration","crtCurvature","digitalGlitch","engraving","crosshatch","kuwahara"];var nA=Wl.filter(e=>Up.some(t=>e.effects[t]>1e-4)),hI=Wl.filter(e=>!nA.includes(e)),gI={blur:{blur:.45},pixelate:{pixelate:.55},bloom:{bloom:.55,bloomRadius:8},chromaBleed:{chromaBleed:.55},tapeDamage:{tapeDamage:.65,tapeTracking:.55,tapeNoise:.25,tapeSpeed:.5},filmArtifacts:{filmArtifacts:.55},scanlines:{scanlines:.35,scanlineCount:.17,scanlineSoftness:1},chromaticAberration:{chromaticAberration:.15,chromaticAngle:0},crtCurvature:{crtCurvature:.2},digitalGlitch:{digitalGlitch:.55,digitalGlitchColorSplit:.25,digitalGlitchLineTear:.25,digitalGlitchPixelate:.15,digitalGlitchBlockAmount:.5,digitalGlitchBlockDisplacement:.25,digitalGlitchBlockOpacity:0,digitalGlitchSpeed:.5},halftone:{halftone:.94,halftoneSize:.36},twoInkPrint:{twoInkPrint:1,twoInkPrintSize:.42},ascii:{ascii:1,asciiSize:5/76,asciiInvert:0,asciiStyle:0,asciiColor:1,asciiRotation:0},dither:{dither:1,ditherSize:.5},monoScreen:{monoScreen:1,monoScreenSize:.35,monoScreenAngle:.25,monoScreenSpread:.3,monoScreenShape:0,monoScreenInvert:0},engraving:{engraving:1,engravingSpacing:7/17,engravingMinThickness:.2,engravingMaxThickness:3.2/7,engravingAngle:.25,engravingContrast:7/15,engravingSharpness:.59,engravingWave:.2,engravingWaveFrequency:2/9},crosshatch:{crosshatch:1,crosshatchSpacing:7/25,crosshatchThickness:.25,crosshatchAngle:.25,crosshatchContrast:1/3,crosshatchEdges:.5,crosshatchLineWeight:0,crosshatchWave:.33,crosshatchWaveFrequency:2/9},kuwahara:{kuwahara:1,kuwaharaRadius:1/7,kuwaharaSharpness:5/16,kuwaharaSaturation:.5}},Vp=[{path:"intensity",name:"--hf-color-grading-intensity",min:0,max:1},{path:"lut.intensity",name:"--hf-color-grading-lut-intensity",min:0,max:1},{path:"adjust.exposure",name:"--hf-color-grading-exposure",min:-2,max:2},{path:"effects.blur",name:"--hf-color-grading-blur",min:0,max:1},{path:"effects.bloom",name:"--hf-color-grading-bloom",min:0,max:3},{path:"effects.kuwahara",name:"--hf-color-grading-kuwahara",min:0,max:1},{path:"effects.pixelate",name:"--hf-color-grading-pixelate",min:0,max:1},{path:"effects.ascii",name:"--hf-color-grading-ascii",min:0,max:1},{path:"effects.dither",name:"--hf-color-grading-dither",min:0,max:1}];var rA=/^#[0-9a-f]{6}$/i;function iA(e){return!Array.isArray(e)||e.length<2||e.length>6||!e.every(t=>typeof t=="string"&&rA.test(t))?null:e.map(t=>t.toLowerCase())}function Oe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function na(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):0}function Wp(e,t){let n=typeof e=="number"?e:Number(e);return Number.isFinite(n)?Math.min(1,Math.max(0,n)):t}function We(e,t){let n=typeof e=="number"?e:Number(e);return Number.isFinite(n)?na(n,t.min,t.max):0}function $l(e,t=0){let n=typeof e=="number"?e:Number(e);return Number.isFinite(n)?(n%360+360)%360:t}function oA(e){let t=Oe(e)?e:{};return Hp.reduce((n,r)=>{let i=Oe(t[r])?t[r]:{};return n[r]={hue:$l(i.hue,er.hue),amount:We(i.amount??er.amount,Dp.amount),level:We(i.level??er.level,Dp.level)},n},{shadows:{...er},midtones:{...er},highlights:{...er}})}function aA(e){if(!Array.isArray(e)||e.length!==2)return null;let t=Number(e[0]),n=Number(e[1]);return Number.isFinite(t)&&Number.isFinite(n)?[na(t,0,1),na(n,0,1)]:null}function $p(e){return e.some((t,n)=>n>0&&t[0]===e[n-1]?.[0])}function sA(e){(e[0]?.[0]??0)>0&&e.unshift([0,0]),(e.at(-1)?.[0]??1)<1&&e.push([1,1])}function lA(e){if(!Array.isArray(e)||e.length<2)return Zt;let t=[];for(let n of e){let r=aA(n);if(!r)return Zt;t.push(r)}return t.sort((n,r)=>n[0]-r[0]),$p(t)||(sA(t),t.length>16)?Zt:t}function uA(e){let t=Oe(e)?e:{};return Gp.reduce((n,r)=>(n[r]=lA(t[r]),n),{master:Zt,red:Zt,green:Zt,blue:Zt})}function cA(e,t){if(!Array.isArray(e)||e.length!==2)return null;let n=Number(e[0]),r=Number(e[1]);return Number.isFinite(n)&&Number.isFinite(r)?[$l(n),na(r,t.min,t.max)]:null}function dA(e,t){if(!Array.isArray(e)||e.length<3||e.length>16)return tr;let n=[];for(let r of e){let i=cA(r,t);if(!i)return tr;n.push(i)}return n.sort((r,i)=>r[0]-i[0]),$p(n)?tr:n}function mA(e){let t=Oe(e)?e:{};return Bp.reduce((n,r)=>(n[r]=dA(t[r],ZE[r]),n),{hueVsHue:tr,hueVsSaturation:tr,hueVsLuma:tr})}function Pp(e){let t=Oe(e)?e:{},n=We(t.min??Pl.min,Bl),r=We(t.max??Pl.max,Bl);return{min:Math.min(n,r),max:Math.max(n,r),softness:We(t.softness??Pl.softness,Ce.secondarySoftRangeSoftness)}}function fA(e){let t=Oe(e)?e:{},n=We(t.range??Dl.range,Ce.secondaryHueRange);return{center:$l(t.center,Dl.center),range:n,softness:We(t.softness??Dl.softness,{min:Ce.secondaryHueSoftness.min,max:Ce.secondaryHueCombinedMax-n})}}function pA(e){return{hueShift:We(e.hueShift??0,Ce.secondaryHueShift),saturation:We(e.saturation??0,Ce.signedUnit),luma:We(e.luma??0,Ce.signedUnit),temperature:We(e.temperature??0,Ce.signedUnit),tint:We(e.tint??0,Ce.signedUnit)}}function hA(e){return!Oe(e)||!Oe(e.key)||!Oe(e.correction)?null:{enabled:e.enabled!==!1,key:{hue:fA(e.key.hue),saturation:Pp(e.key.saturation),luma:Pp(e.key.luma)},correction:pA(e.correction)}}function gA(e){if(!Array.isArray(e))return[];let t=[];for(let n of e.slice(0,4)){let r=hA(n);r&&t.push(r)}return t}function bA(e){if(e==null)return null;let t=String(e).trim();return t||null}function yA(e){if(e==null)return null;if(typeof e=="string"){let n=e.trim();return n?{src:n,intensity:1}:null}if(!Oe(e))return null;let t=e.src;return typeof t!="string"||t.trim()===""?null:{src:t.trim(),intensity:Wp(e.intensity,1)}}function xA(e){if(typeof e=="string"){let t=e.trim();if(!t)return null;if(t.startsWith("{"))try{let n=JSON.parse(t);return Oe(n)?n:null}catch{return null}return{preset:t}}return Oe(e)?e:null}function SA(e,t){let n=e.trim().match(JE);if(!n)return e;let r=n[1]??n[2]??"";return r&&Object.hasOwn(t,r)?t[r]:e}function ta(e,t){if(typeof e=="string"){let r=SA(e,t);if(r!==e)return r;let i=e.trim();if(!i.startsWith("{"))return e;try{return ta(JSON.parse(i),t)}catch{return e}}if(Array.isArray(e))return e.map(r=>ta(r,t));if(!Oe(e))return e;let n={};for(let[r,i]of Object.entries(e))n[r]=ta(i,t);return n}function vA(e){return e?XE.get(e)??null:null}function ia(e){let t=xA(e);if(!t||t.enabled===!1)return null;let n=bA(t.preset),r=vA(n),i=r?.adjust??Ol,o=r?.details??Hl,a=r?.effects??Gl,s=Oe(t.adjust)?t.adjust:{},l=Oe(t.details)?t.details:{},u=Oe(t.effects)?t.effects:{},d=ra.reduce((p,g)=>(p[g]=We(s[g]??i[g],QE[g]),p),{...Ol}),f=Ul.reduce((p,g)=>(p[g]=We(l[g]??o[g],eA[g]),p),{...Hl}),m=Vl.reduce((p,g)=>(p[g]=We(u[g]??a[g],tA[g]??Bl),p),{...Gl});return{enabled:!0,preset:n,intensity:Wp(t.intensity,r?.intensity??1),adjust:d,wheels:oA(t.wheels),curves:uA(t.curves),hueCurves:mA(t.hueCurves),secondaries:gA(t.secondaries),details:f,effects:m,palette:iA(t.palette),lut:yA(t.lut),colorSpace:typeof t.colorSpace=="string"&&t.colorSpace.trim()?t.colorSpace.trim():YE}}function qp(e,t){return ia(ta(e,t))}function EA(e){return Hp.some(t=>Math.abs(e[t].amount)>1e-4||Math.abs(e[t].level)>1e-4)}function ql(e){return Gp.some(t=>e[t].some(([n,r])=>Math.abs(n-r)>1e-4))}function zl(e){return Bp.some(t=>e[t].some(([,n])=>Math.abs(n)>1e-4))}function jl(e){return e.some(t=>t.enabled&&Object.values(t.correction).some(n=>Math.abs(n)>1e-4))}function zp(e){return e?.enabled?Math.abs(e.details.vignette)>1e-4||Math.abs(e.details.grain)>1e-4||Up.some(n=>Math.abs(e.effects[n])>1e-4)?!0:e.intensity===0?!1:e.lut&&e.lut.intensity!==0?!0:ra.some(n=>Math.abs(e.adjust[n])>1e-4)||(e.wheels?EA(e.wheels):!1)||(e.curves?ql(e.curves):!1)||(e.hueCurves?zl(e.hueCurves):!1)||(e.secondaries?jl(e.secondaries):!1):!1}var oa=/^(|transparent|rgba\\(.*,\\s*0\\)|.*\\/\\s*0%?\\s*\\))$/,AA=new Set(["IMG","VIDEO","IFRAME","EMBED","OBJECT","CANVAS"]),jp="http://www.w3.org/2000/svg",wA=new Set(["svg","g","foreignObject"]),_A=["Top","Right","Bottom","Left"],CA={left:-1/0,right:1/0,top:-1/0,bottom:1/0},Kp=e=>!!e.backgroundImage&&e.backgroundImage!=="none"||!oa.test(e.backgroundColor),RA=e=>{let t=e.getPropertyValue("-webkit-text-fill-color")||e.color,n=Number.parseFloat(e.getPropertyValue("-webkit-text-stroke-width"))||0,r=e.getPropertyValue("-webkit-text-stroke-color")||e.color;return!oa.test(t)||n>0&&!oa.test(r)},Yp=e=>_A.map(t=>e[`border${t}Style`]!=="none"&&!oa.test(e[`border${t}Color`])&&Number.parseFloat(e[`border${t}Width`])||0),aa=e=>e.bottom-e.top,Kl=(e,t,n)=>t>=e.left&&t<=e.right&&n>=e.top&&n<=e.bottom,Xp=(e,t)=>({left:Math.min(e.left,t.left),right:Math.max(e.right,t.right),top:Math.min(e.top,t.top),bottom:Math.max(e.bottom,t.bottom)}),TA=(e,t)=>t.display==="none"||t.position==="absolute"||t.position==="fixed"||Number.parseFloat(t.opacity)<=.01&&!e.hasAttribute(vn);function kA(e,t,n){if(e.width<=0&&e.height<=0)return!1;let r=3*(Number.parseFloat(t.fontSize)||16),i=Math.max(r,Math.min(2*e.height,20*r/3));return n<e.top-i||n>e.bottom+i}function MA(e,t,n,r){let[i,o,a,s]=Yp(t);if(!(i||o||a||s))return!1;let l=e.getBoundingClientRect(),{offsetWidth:u,offsetHeight:d}=e,f=u>0?l.width/u:1,m=d>0?l.height/d:1,p={left:l.left+s*f,right:l.right-o*f,top:l.top+i*m,bottom:l.bottom-a*m};return!Kl(p,n,r)}function LA(e){let t=[];for(let n of[...e].sort((r,i)=>r.left-i.left)){let r=t.findIndex(i=>n.top<i.bottom&&n.bottom>i.top&&n.left-i.right<=2*Math.max(aa(i),aa(n)));r<0?t.push(n):t[r]=Xp(t[r],n)}return t}function NA(e){let t=[...e].sort((n,r)=>n.top-r.top);return t.flatMap((n,r)=>t.slice(r+1).flatMap(i=>{let o=i.left<n.right&&i.right>n.left,a=i.top-n.bottom<=2*Math.min(aa(n),aa(i));return o&&a&&i.top>n.bottom?[Xp(n,i)]:[]}))}function Jp(e,t,n){let r=e.defaultView,i=typeof e.createRange().getClientRects=="function",o=e.createRange(),a=new Map,s=new Map,l=new Map,u=y=>{let v=s.get(y);if(v===void 0){let A=r.getComputedStyle(y);v=TA(y,A)||i&&kA(y.getBoundingClientRect(),A,n),s.set(y,v)}return v},d=y=>{let v=l.get(y);if(v===void 0){let A=y.parentElement,E=A&&y.nodeValue?.trim()?r.getComputedStyle(A):null;v=!!E&&E.visibility!=="hidden"&&RA(E),l.set(y,v)}return v},f=y=>{if(!i)return[CA];let v=[];o.selectNodeContents(y);for(let A of o.getClientRects()){let E=A.bottom-A.top;A.width>0&&E>0&&n>=A.top-2*E&&n<=A.bottom+2*E&&v.push(A)}return v},m=y=>{let v=a.get(y);if(v)return v;v=[];for(let A of y.childNodes)A.nodeType===3?d(A)&&v.push(...f(A)):A.nodeType===1&&A.hasChildNodes()&&!u(A)&&v.push(...m(A));return a.set(y,v),v};function p(y){let v=LA(m(y));return v.some(A=>Kl(A,t,n))||NA(v).some(A=>Kl(A,t,n))}function g(y,v){let A=r.getComputedStyle(y,v);return!A.content||A.content==="none"||A.content==="normal"||A.display==="none"?!1:A.content!==\'""\'||Kp(A)||Yp(A).some(E=>E>0)}let b=(y,v)=>/inset/.test(v.boxShadow)||MA(y,v,t,n)||g(y,"::before")||g(y,"::after");return y=>{if(AA.has(y.tagName)||!(y.namespaceURI!==jp||wA.has(y.localName))||!r)return!0;let A=r.getComputedStyle(y);return Kp(A)||b(y,A)||y.namespaceURI!==jp&&p(y)}}var FA=["[data-hyperframes-ignore]","[data-hyperframes-picker-ignore]","[data-hf-ignore]","[data-no-inspect]","[data-no-pick]","[data-hyper-shader-loading]"].join(","),IA=["[data-hyperframes-picker-block]","[data-hyper-shader-loading]"].join(","),Qp="[data-hf-inner-root],[data-composition-id]:not([data-composition-id] *)",Zp=`${Qp}{pointer-events:auto!important}`,DA=`@layer hf-picker{${Zp}}`;function eh(e){let t=!1,n=null,r=null,i=null,o=null,a,s=new Set;function l(L,C){try{window.dispatchEvent(new CustomEvent(L,{detail:C}))}catch(H){O("runtime.picker.site1",H)}}function u(L){i=L,l("hyperframe:picker:hovered",{elementInfo:i,isPickMode:t,timestamp:Date.now()})}function d(L){o=L,l("hyperframe:picker:selected",{elementInfo:o,isPickMode:t,timestamp:Date.now()})}function f(L){if(s=new Set(Array.from(document.querySelectorAll(Qp)).filter(J=>getComputedStyle(J).pointerEvents==="none")),s.size===0)return L();let C=m(),H=C?p(C):g();try{return L()}finally{H(),s=new Set}}function m(){if(a!==void 0)return a;if(a=null,!Array.isArray(document.adoptedStyleSheets)||typeof CSSStyleSheet>"u")return null;try{let L=new CSSStyleSheet;L.replaceSync(DA),a=L}catch(L){O("runtime.picker.site2",L)}return a}function p(L){return document.adoptedStyleSheets=[...document.adoptedStyleSheets,L],()=>{document.adoptedStyleSheets=document.adoptedStyleSheets.filter(C=>C!==L)}}function g(){let L=document.createElement("style");return L.textContent=Zp,(document.head??document.documentElement).appendChild(L),()=>L.remove()}function b(L){let C=L.ownerDocument.defaultView;if(!C)return!1;let H=L;if(C.getComputedStyle(L).visibility==="hidden")return!0;for(;H&&H!==document.body&&H!==document.documentElement;){let J=C.getComputedStyle(H);if(J.display==="none"||J.pointerEvents==="none")return!0;let B=Number.parseFloat(J.opacity);if(Number.isFinite(B)&&B<=.01&&!H.hasAttribute(vn))return!0;H=H.parentElement}return!1}function y(L){if(!L||L===document.body||L===document.documentElement)return!1;let C=L.tagName.toLowerCase();return!(C==="script"||C==="style"||C==="link"||C==="meta"||s.has(L)||L.closest(FA)||b(L))}function v(L){return!!L?.closest(IA)}function A(L){let C=L.parentElement?.getAttribute("data-composition-id");return!L.hasAttribute("data-hf-inner-root")||!C?null:`[data-composition-id="${CSS.escape(C)}"] > [data-hf-inner-root]`}function E(L){let C=A(L);if(C)return C;let H=L;if(H.id)return`#${CSS.escape(H.id)}`;let J=L.getAttribute("data-composition-id");if(J)return`[data-composition-id="${CSS.escape(J)}"]`;let B=L.getAttribute("data-composition-src");if(B)return`[data-composition-src="${CSS.escape(B)}"]`;let z=L.getAttribute("data-track-index");if(z)return`[data-track-index="${CSS.escape(z)}"]`;let q=L.tagName.toLowerCase(),Y=L.parentElement;if(!Y)return q;let j=Y.querySelectorAll(`:scope > ${q}`);if(j.length===1)return q;for(let G=0;G<j.length;G+=1)if(j[G]===L)return`${q}:nth-of-type(${G+1})`;return q}function T(L){let C=L.tagName.toLowerCase(),H=(L.textContent??"").trim().replace(/\\s+/g," "),J=(z,q)=>{let Y=Array.from(z);return Y.length>q?`${Y.slice(0,q-1).join("")}\\u2026`:z},B=/^h[1-6]$/.test(C);return B||C==="p"||C==="span"||C==="div"?H.length>0?J(H,56):B?"Heading":"Text":C==="img"?"Image":C==="video"?"Video":C==="audio"?"Audio":C==="svg"?"Shape":L.getAttribute("data-composition-src")?"Composition":C==="section"?"Section":`${C.charAt(0).toUpperCase()}${C.slice(1)}`}function P(L,C,H){let J=typeof H=="number"&&H>0?H:8,B=[];if(document.elementsFromPoint)B=document.elementsFromPoint(L,C);else if(document.elementFromPoint){let G=document.elementFromPoint(L,C);B=G?[G]:[]}if(v(B[0]??null))return[];let z={},q=[],Y=[],j=Jp(document,L,C);for(let[G,V]of B.entries()){if(!y(V))continue;let Z=`${V.tagName}::${V.id||""}::${G}`;if(!z[Z]&&(z[Z]=!0,q.push(V),(Y.some(de=>V.contains(de))||j(V))&&(Y.push(V),Y.length>=J)))break}return Y.length>0?Y:q.slice(0,J)}function N(L){let C=L.getBoundingClientRect(),H={};for(let B of Array.from(L.attributes))B.name.startsWith("data-")&&(H[B.name]=B.value);return{id:L.id||null,tagName:L.tagName.toLowerCase(),selector:E(L),label:T(L),boundingBox:{x:C.left,y:C.top,width:C.width,height:C.height},textContent:L.textContent?L.textContent.trim().slice(0,200):null,src:L.getAttribute("src")||L.getAttribute("data-composition-src")||null,dataAttributes:H}}function D(L,C,H){return f(()=>P(L,C,H)).map(N)}function R(L){if(!t)return;let C=f(()=>{let J=P(L.clientX,L.clientY,1)[0]??(Me(L.target)?L.target:null);return y(J)?J:null});if(!C||n===C)return;n&&n.classList.remove("__hf-pick-highlight"),n=C,C.classList.add("__hf-pick-highlight");let H=N(C);u(H),e.postMessage({source:"hf-preview",type:"element-hovered",elementInfo:H})}function M(L){if(!t)return;L.preventDefault(),L.stopPropagation(),L.stopImmediatePropagation();let C=D(L.clientX,L.clientY,8);C.length!==0&&(u(C[0]??null),e.postMessage({source:"hf-preview",type:"element-pick-candidates",candidates:C,selectedIndex:0,point:{x:L.clientX,y:L.clientY}}))}function k(L){L.key==="Escape"&&(K(),e.postMessage({source:"hf-preview",type:"pick-mode-cancelled"}))}function U(){t||(t=!0,r=document.createElement("style"),r.textContent=[".__hf-pick-highlight { outline: 2px solid #4f8cf7 !important; outline-offset: 2px; cursor: crosshair !important; }",".__hf-pick-active * { cursor: crosshair !important; }"].join(`\n`),document.head.appendChild(r),document.body.classList.add("__hf-pick-active"),document.addEventListener("mousemove",R,!0),document.addEventListener("click",M,!0),document.addEventListener("keydown",k,!0),l("hyperframe:picker:mode",{isPickMode:!0,timestamp:Date.now()}))}function K(){t&&(t=!1,n&&(n.classList.remove("__hf-pick-highlight"),n=null),r&&(r.remove(),r=null),document.body.classList.remove("__hf-pick-active"),document.removeEventListener("mousemove",R,!0),document.removeEventListener("click",M,!0),document.removeEventListener("keydown",k,!0),l("hyperframe:picker:mode",{isPickMode:!1,timestamp:Date.now()}))}function X(){window.__HF_PICKER_API={enable:U,disable:K,isActive:()=>t,getHovered:()=>i,getSelected:()=>o,getCandidatesAtPoint:(L,C,H)=>Number.isFinite(L)&&Number.isFinite(C)?D(L,C,H):[],pickAtPoint:(L,C,H)=>{if(!Number.isFinite(L)||!Number.isFinite(C))return null;let J=D(L,C,8);if(!J.length)return null;let B=Math.max(0,Math.min(J.length-1,Number(H??0))),z=J[B]??null;return z?(d(z),e.postMessage({source:"hf-preview",type:"element-picked",elementInfo:z}),K(),z):null},describe:L=>Me(L)?N(L):null,pickManyAtPoint:(L,C,H)=>{if(!Number.isFinite(L)||!Number.isFinite(C))return[];let J=D(L,C,8);if(!J.length)return[];let B=[],z=Array.isArray(H)?H:[0];for(let q of z){let Y=Math.max(0,Math.min(J.length-1,Math.floor(Number(q)))),j=J[Y];if(!j)continue;B.some(V=>V.selector===j.selector&&V.tagName===j.tagName)||B.push(j)}return B.length?(d(B[0]??null),e.postMessage({source:"hf-preview",type:"element-picked-many",elementInfos:B}),K(),B):[]}},l("hyperframe:picker:api-ready",{hasApi:!0,timestamp:Date.now()})}return{enablePickMode:U,disablePickMode:K,installPickerApi:X}}function li(e,t,n){let r=e?.[t];return typeof r=="function"?Number(r.call(e))||n:typeof r=="number"&&Number.isFinite(r)?r:(r!=null&&O("runtime.player.nonConformantNum",{prop:t,actual:typeof r}),n)}function ct(e,t){let n=e?.[t];if(typeof n=="function"){n.call(e);return}n!==void 0&&O("runtime.player.nonConformantVoid",{method:t,actual:typeof n})}function ui(e,t,n){if(e){for(let r of Object.values(e))if(!(!r||r===t))try{n(r)}catch(i){O("runtime.player.site1",i)}}}function sa(e,t,n){return n?.exact===!0||n?.subframe===!0?Number.isFinite(e)&&e>0?e:0:Ff(e,t,n?.subFrameDivisions)}function th(e,t,n,r){let i=sa(t,n,r),o=r?.suppressEvents===!0;return ct(e,"pause"),typeof e.totalTime=="function"?e.totalTime(i,o):typeof e.seek=="function"&&e.seek(i,o),i}function PA(e,t,n,r,i){let o=[];ui(e,t,a=>{ct(a,"play"),o.push(a)});try{return th(t,n,r,i)}finally{for(let a of o)try{ct(a,"pause")}catch(s){O("runtime.player.site2",s)}}}function OA(e,t){ui(e,t,n=>{ct(n,"play")})}function nh(e){let t=e.transport;return t?{_timeline:null,play:()=>t.play(),pause:()=>t.pause(),seek:(n,r)=>t.seek(n,r),renderSeek:(n,r)=>t.renderSeek(n,r),getTime:()=>t.getTime(),getDuration:()=>t.getDuration(),isPlaying:()=>t.isPlaying(),setPlaybackRate:n=>t.setPlaybackRate(n),getPlaybackRate:()=>t.getPlaybackRate()}:{_timeline:null,play:()=>{let n=e.getTimeline();if(!n||e.getIsPlaying())return;let r=Math.max(0,Number(e.getSafeDuration?.()??li(n,"duration",0))||0);r>0&&Math.max(0,li(n,"time",0))>=r&&(ct(n,"pause"),typeof n.seek=="function"&&n.seek(0,!1),e.onDeterministicSeek(0),e.setIsPlaying(!1),e.onSyncMedia(0,!1),e.onRenderFrameSeek(0)),typeof n.timeScale=="function"&&n.timeScale(e.getPlaybackRate()),ct(n,"play"),ui(e.getTimelineRegistry?.(),n,i=>{typeof i.timeScale=="function"&&i.timeScale(e.getPlaybackRate()),ct(i,"play")}),e.onDeterministicPlay(),e.setIsPlaying(!0),e.onShowNativeVideos(),e.onStatePost(!0)},pause:()=>{let n=e.getTimeline();if(!n)return;ct(n,"pause"),ui(e.getTimelineRegistry?.(),n,i=>{ct(i,"pause")});let r=Math.max(0,li(n,"time",0));e.onDeterministicSeek(r),e.onDeterministicPause(),e.setIsPlaying(!1),e.onSyncMedia(r,!1),e.onRenderFrameSeek(r),e.onStatePost(!0)},seek:(n,r)=>{let i=e.getTimeline();if(!i)return;let o=Math.max(0,Number(n)||0),a=e.getIsPlaying(),s=PA(e.getTimelineRegistry?.(),i,o,e.getCanonicalFps());e.onDeterministicSeek(s),r?.keepPlaying&&a?(typeof i.timeScale=="function"&&i.timeScale(e.getPlaybackRate()),ct(i,"play"),ui(e.getTimelineRegistry?.(),i,l=>{typeof l.timeScale=="function"&&l.timeScale(e.getPlaybackRate()),ct(l,"play")}),e.onDeterministicPlay(),e.onShowNativeVideos(),e.onSyncMedia(s,!0)):(e.setIsPlaying(!1),e.onSyncMedia(s,!1)),e.onRenderFrameSeek(s),e.onStatePost(!0)},renderSeek:(n,r)=>{let i=e.getTimeline(),o=e.getCanonicalFps(),a=i?(OA(e.getTimelineRegistry?.(),i),th(i,n,o,r)):sa(Math.max(0,Number(n)||0),o,r);e.onDeterministicSeek(a,r),e.setIsPlaying(!1),e.onSyncMedia(a,!1),e.onRenderFrameSeek(a),e.onStatePost(!0)},getTime:()=>li(e.getTimeline(),"time",0),getDuration:()=>li(e.getTimeline(),"duration",0),isPlaying:()=>e.getIsPlaying(),setPlaybackRate:n=>e.setPlaybackRate(n),getPlaybackRate:()=>e.getPlaybackRate()}}function Yl(){return{capturedTimeline:null,isPlaying:!1,currentTime:0,deterministicAdapters:[],canonicalFps:30,bridgeMuted:!1,bridgeVolume:1,mediaOutputMuted:!1,nativeMediaSyncDisabled:!1,webAudioMediaDisabled:!1,mediaAutoplayBlockedPosted:!1,mediaForceSyncNextTick:!1,playbackRate:1,bridgeLastPostedFrame:-1,bridgeLastPostedAt:0,bridgeLastPostedPlaying:!1,bridgeLastPostedMuted:!1,bridgeMaxPostIntervalMs:80,controlBridgeHandler:null,beforeUnloadHandler:null,injectedCompStyles:[],injectedCompScripts:[],injectedCompLinks:[],cachedTimedMediaEls:[],cachedMediaClips:[],cachedVideoClips:[],cachedMediaTimelineDurationSeconds:0,tornDown:!1,transportClock:null,transportRafId:null}}function An(e){if(e==null||e.trim()==="")return null;let t=Number.parseFloat(e);return Number.isFinite(t)&&t>0?t:null}function nr(e){if(e==null||e.trim()==="")return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null}function Et(e=document){let t=e.querySelector(\'[data-composition-id][data-root="true"]\');return ye(t)?t:e.querySelector("[data-composition-id]")}var HA=new Set(["SCRIPT","STYLE","LINK","META","TEMPLATE","NOSCRIPT"]);function Xl(e){return e.id||e.getAttribute("data-hf-id")||null}function GA(e){return _e(e)}function BA(e,t){let n=e.getAttribute("data-composition-id");if(!n)return null;let r=Number(t[n]?.duration?.());return Number.isFinite(r)&&r>0?r:null}function UA(e){return pe(e)?Number.isFinite(e.duration)?yt(e,e.duration):null:Un(e)}function VA(e,t,n,r){let i=GA(e.getAttribute("data-duration"));return i!=null&&i>0?i:BA(e,t)??UA(e)??Math.max(0,n-r)}function WA(e){for(let[t,n]of e){let r=t.parentElement;for(;r;){let i=e.get(r);if(i){n.parentId=i.id,i.children.push(n);break}r=r.parentElement}}}function rh(e){let{startResolver:t,timelineRegistry:n,rootDuration:r}=e,i=new Map,o=Et(),a=0;for(let s of document.querySelectorAll("[data-start]")){if(s===o||HA.has(s.tagName))continue;let l=t.resolveStartForElement(s,0);if(VA(s,n,r,l)<=0)continue;let u={id:Xl(s)??`__clip-${a++}`,element:s,parentId:null,children:[]};i.set(s,u)}return WA(i),{roots:Array.from(i.values()).filter(s=>s.parentId===null)}}var Jl="css:root",ih=["backdrop-filter","clip-path","filter","mask","mask-border-source","mask-image","perspective","rotate","scale","transform","translate","-webkit-mask-image"],$A=new Set([...ih,"contain","isolation","mask-border","mix-blend-mode","opacity"]),qA=new Set(["absolute","relative"]),zA=new Set(["flex","inline-flex","grid","inline-grid"]),jA=new Set(["layout","paint","strict","content"]),KA=new Set(["size","inline-size"]);function YA(e){return e.position==="fixed"||e.position==="sticky"}function XA(e,t){if(t.zIndex==="auto"||t.zIndex==="")return!1;if(qA.has(t.position))return!0;let n=e.parentElement?e.ownerDocument.defaultView?.getComputedStyle(e.parentElement).display:null;return n!=null&&zA.has(n)}function JA(e){let t=Number.parseFloat(e.opacity);if(Number.isFinite(t)&&t<1||e.getPropertyValue("isolation")==="isolate")return!0;let n=e.getPropertyValue("mix-blend-mode");return n&&n!=="normal"?!0:ih.some(r=>{let i=e.getPropertyValue(r);return i!==""&&i!=="none"})}function QA(e){return e.getPropertyValue("contain").split(/\\s+/).some(n=>jA.has(n))?!0:KA.has(e.getPropertyValue("container-type"))}function ZA(e){return e.getPropertyValue("will-change").split(",").map(t=>t.trim()).some(t=>$A.has(t))}function ew(e,t){return YA(t)||XA(e,t)||JA(t)||QA(t)?!0:ZA(t)}function tw(e){let t=[],n=e;for(;n?.parentElement;)t.push(Array.prototype.indexOf.call(n.parentElement.children,n)),n=n.parentElement;return`css:${t.reverse().join(".")}`}function la(e){let t=e.ownerDocument.defaultView;if(!t)return Jl;let n=e.parentElement;for(;n&&n!==e.ownerDocument.documentElement;){try{if(ew(n,t.getComputedStyle(n)))return tw(n)}catch{return Jl}n=n.parentElement}return Jl}function Ql(e){let t=e.trim().toLowerCase();return!(!t||t==="main"||t.includes("caption")||t.includes("ambient"))}var ua=7200;function ca(e,t){let n=e.tagName.toLowerCase();if(n==="script"||n==="style"||n==="link"||n==="meta")return!1;let i=n==="video"||n==="audio"?t.resolver.resolveMediaStartForElement(e):t.resolver.resolveStartForElement(e,0),o=t.resolver.resolveDurationForElement(e),a=e.getAttribute("data-composition-id");if(a){let u=t.timelineRegistry[a],d=u&&typeof u.duration=="function"?Number(u.duration()):null;!(e.hasAttribute("data-duration")||e.hasAttribute("data-end")||e.hasAttribute(Kn)||e.hasAttribute(Yn))&&(o==null||o<=0)&&d!=null&&Number.isFinite(d)&&d>0&&(o=d)}let s=o!=null&&o>0?i+o:Number.POSITIVE_INFINITY,l=t.exportRenderSeek?Uo(i,s,t.canonicalFps):{start:i,end:s};return $n(t.currentTime,l.start,l.end,t.compositionDuration)}function di(e){return _e(e)}function oh(e){let t=e.getAttribute("data-duration"),n=e.getAttribute(Kn),r=Xn({start:0,duration:t,authoredDuration:n})?.duration;return r??([t,n].map(di).some(o=>o!=null&&o<=0)?0:null)}function ah(e){return Xn({start:0,end:e.getAttribute("data-end"),authoredEnd:e.getAttribute(Yn)})?.end??null}function Zl(e){try{let t=e.style?.zIndex;if(t&&t!=="auto"){let n=parseInt(t,10);if(Number.isFinite(n))return n}return 0}catch{return 0}}function eu(...e){let t=e.filter(n=>Number.isFinite(n??null));return t.length===0?null:Math.max(...t)}function rr(e,t){let n=e.getAttribute("data-track-index")??e.getAttribute("data-track");if(n==null)return t;let r=Number.parseInt(n,10);return Number.isFinite(r)?r:t}function mi(e){let t=String(e??"").trim();if(!t)return null;let n=t.toLowerCase();if(n.startsWith("data:")||n.startsWith("javascript:"))return null;try{return new URL(t,document.baseURI).toString()}catch{return t}}function sh(e){let t=e.getAttribute("src")??e.getAttribute("data-src");if(t)return mi(t);let n=e.getAttribute("data-composition-src");if(n)return mi(n);let r=e.querySelector("img[src], video[src], audio[src], source[src]");return r?mi(r.getAttribute("src")):null}function rw(e){let t=e.className;return typeof t!="string"?null:t.split(/\\s+/).map(n=>n.trim()).find(n=>n&&n!=="clip"&&!n.startsWith("__hf-"))??null}function iw(e){if(!e)return null;try{return new URL(e,document.baseURI).pathname.split("/").filter(Boolean).at(-1)??null}catch{return e.split(/[\\\\/]/).filter(Boolean).at(-1)??null}}function ow(e){let t=e.textContent?.replace(/\\s+/g," ").trim();return t?t.length>32?`${t.slice(0,31)}...`:t:null}function ci(e){let t=e.replace(/\\.[^.]+$/i,"").replace(/[-_]+/g," ").replace(/\\s+/g," ").trim();return t?t.replace(/\\b\\w/g,n=>n.toUpperCase()):e}function lh(e){return e.getAttribute("data-hf-original-composition-id")??e.getAttribute("data-composition-id")}function aw(e,t,n){let r=e.getAttribute("data-timeline-label")??e.getAttribute("data-label")??e.getAttribute("aria-label")??null;if(r?.trim())return r.trim();let i=lh(e);if(i)return ci(i);let o=e.id;if(o)return ci(o);let a=rw(e);if(a)return ci(a);let s=iw(sh(e));if(s)return ci(s);let l=ow(e);return l||`${ci(t)} ${n+1}`}function tu(e){let n=window.__timelines??{},r=Xe({timelineRegistry:n,includeAuthoredTimingAttrs:!0}),i=j=>{if(!j)return null;let G=n[j]??null;if(!G||typeof G.duration!="function")return null;try{let V=Number(G.duration());return Number.isFinite(V)&&V>0?V:null}catch{return null}},o=()=>{let j=Array.from(document.querySelectorAll("video[data-start], audio[data-start]"));if(j.length===0)return null;let G=0;for(let V of j){let Z=r.resolveMediaStartForElement(V);if(!Number.isFinite(Z))continue;let de=Bn(V);de==null||de<=0||(G=Math.max(G,Math.max(0,Z)+de))}return G>0?G:null},a=(j,G)=>{let V=[],Z=null,de=null,le=null,Q=j.parentElement;for(;Q;){let ae=Q.getAttribute("data-composition-id");ae&&(V.push(ae),!le&&Q!==G&&(le=ae),Z==null&&(Z=r.resolveStartForElement(Q,0)),de==null&&(de=di(Q.getAttribute("data-duration"))??i(ae)??null)),Q=Q.parentElement}return{parentCompositionId:le,compositionAncestors:V.reverse(),inheritedStart:Z,inheritedDuration:de}},s=Et(),l=Array.from(document.querySelectorAll("[data-composition-id]")),u=s?.getAttribute("data-composition-id")??null,d=s?r.resolveStartForElement(s,0):0,f=o(),m=f!=null?Math.max(0,f-Math.max(0,d)):null,p=i(u),g=oh(s??document.body),b=eu(...l.filter(j=>j!==s).map(j=>{let G=r.resolveStartForElement(j,0),V=r.resolveDurationForElement(j)??i(j.getAttribute("data-composition-id"))??null;return!Number.isFinite(G)||V==null||V<=0?null:Math.max(0,G)+V})),y=b!=null?Math.max(0,b-Math.max(0,d)):null,v=typeof p=="number"&&Number.isFinite(p)&&p>0?p:null,A=typeof g=="number"&&Number.isFinite(g)&&g>0?g:null,E=typeof m=="number"&&Number.isFinite(m)&&m>0?m:null,T=typeof y=="number"&&Number.isFinite(y)&&y>0?y:null,P=eu(E,T),N=v!=null&&P!=null&&v>=ua,R=A??(N?P:eu(v,E,T))??null,k=(R!=null?d+R:null)??(typeof f=="number"&&Number.isFinite(f)&&f>0?f:null),U=(j,G)=>!Number.isFinite(G)||G<=0?0:k==null||!Number.isFinite(k)?G:!Number.isFinite(j)||j>=k?0:Math.max(0,Math.min(G,k-j)),K=[],X=[],L=Array.from(document.querySelectorAll("[data-start], [data-track-index], [data-composition-id], video, audio, img")),C=0;for(let[j,G]of L.entries()){if(G===s||G.hasAttribute("data-hf-inner-root")||["SCRIPT","STYLE","LINK","META","TEMPLATE","NOSCRIPT"].includes(G.tagName))continue;let V=a(G,s),Z=G.tagName.toLowerCase(),de=Z==="video"||Z==="audio"?r.resolveMediaStartForElement(G):r.resolveStartForElement(G,V.inheritedStart??0),le=G.getAttribute("data-composition-id"),Q=oh(G);if(Q==null&&le&&le!==u&&(Q=i(le)),Q==null&&pe(G)&&Number.isFinite(G.duration)&&(Q=yt(G,G.duration)),Q==null&&(Q=Un(G,de)),Q==null){let we=V.inheritedDuration;if(we!=null&&we>0){let kt=(V.inheritedStart??0)+we;Q=Math.max(0,kt-de)}}if(Q==null||Q<=0||(Q=U(de,Q),Q<=0))continue;let ae=de+Q;C=Math.max(C,ae);let Te=le&&le!==u?"composition":Z==="video"?"video":Z==="audio"?"audio":Z==="img"?"image":"element";K.push({id:Xl(G)??le??null,label:aw(G,Te,K.length),start:de,duration:Q,track:rr(G,j),zIndex:Zl(G),stackingContextId:la(G),kind:Te,tagName:Z,compositionId:G.getAttribute("data-composition-id"),compositionAncestors:V.compositionAncestors,parentCompositionId:V.parentCompositionId,nodePath:null,compositionSrc:mi(G.getAttribute("data-composition-src")),playbackStart:St(G),playbackRate:Ve(G),assetUrl:sh(G),timelineRole:G.getAttribute("data-timeline-role"),timelineLabel:G.getAttribute("data-timeline-label"),timelineClipLabel:G.getAttribute("data-timeline-clip-label"),timelineGroup:G.getAttribute("data-timeline-group"),timelinePriority:di(G.getAttribute("data-timeline-priority"))})}let H=new Set(K.map(j=>j.id)),J=s?.getAttribute("data-composition-id")??null,B=J?n[J]??null:null;if(B&&s){let j=B;if(typeof j.getChildren=="function")try{let G=j.getChildren(!0,!0,!1)??[],V=new Map;for(let le of s.children){let Q=le;if(!Q.id)continue;let ae=Q.tagName.toLowerCase();ae==="script"||ae==="style"||ae==="link"||V.set(Q,{id:Q.id,start:1/0,end:-1/0})}let Z=le=>{let Q=le;for(;Q;){if(V.has(Q))return Q;if(Q===s)return null;Q=Q.parentElement}return null};for(let le of G){if(typeof le.targets!="function"||typeof le.startTime!="function"||typeof le.duration!="function")continue;let Q=le.startTime(),ae=le.parent;for(;ae&&ae!==B&&typeof ae.startTime=="function";)Q+=ae.startTime(),ae=ae.parent;let Te=Q+le.duration();if(!(!Number.isFinite(Q)||!Number.isFinite(Te)))for(let we of le.targets()){if(!Me(we))continue;let Ar=Z(we);if(!Ar)continue;let kt=V.get(Ar);kt&&(kt.start=Math.min(kt.start,Q),kt.end=Math.max(kt.end,Te))}}let de=K.length>0?Math.max(...K.map(le=>le.track))+1:0;for(let[le,Q]of V){if(Q.start===1/0||Q.end===-1/0)continue;let ae=le;if(H.has(ae.id))continue;let Te=Math.max(0,Q.end-Q.start);if(Te<=0)continue;let we=U(Q.start,Te);we<=0||(C=Math.max(C,Q.start+we),K.push({id:ae.id,label:ae.getAttribute("data-timeline-label")??ae.getAttribute("data-label")??ae.getAttribute("aria-label")??ae.id,start:Q.start,duration:we,track:rr(ae,de),zIndex:Zl(ae),stackingContextId:la(ae),kind:"element",tagName:ae.tagName.toLowerCase(),compositionId:ae.getAttribute("data-composition-id"),compositionAncestors:J?[J]:[],parentCompositionId:J,nodePath:null,compositionSrc:null,playbackStart:St(ae),playbackRate:Ve(ae),assetUrl:null,timelineRole:ae.getAttribute("data-timeline-role"),timelineLabel:ae.getAttribute("data-timeline-label"),timelineClipLabel:ae.getAttribute("data-timeline-clip-label"),timelineGroup:ae.getAttribute("data-timeline-group"),timelinePriority:di(ae.getAttribute("data-timeline-priority"))}),H.add(ae.id))}}catch(G){O("runtime.timeline.site1",G)}}if(s&&R!=null&&R>0){let j=K.length>0?Math.max(...K.map(G=>G.track))+1:0;for(let G of s.children){let V=G;if(!V.id||H.has(V.id))continue;let Z=V.getAttribute("data-timeline-role");if(Z!=="overlay"&&Z!=="persistent-overlay")continue;let de=V.tagName.toLowerCase();if(de==="script"||de==="style"||de==="link"||de==="meta"||window.getComputedStyle(V).display==="none")continue;let Q=U(0,R);Q<=0||(C=Math.max(C,Q),K.push({id:V.id,label:V.getAttribute("data-timeline-label")??V.getAttribute("data-label")??V.getAttribute("aria-label")??V.id,start:0,duration:Q,track:rr(V,j),zIndex:Zl(V),stackingContextId:la(V),kind:"element",tagName:de,compositionId:V.getAttribute("data-composition-id"),compositionAncestors:J?[J]:[],parentCompositionId:J,nodePath:null,compositionSrc:null,playbackStart:St(V),playbackRate:Ve(V),assetUrl:null,timelineRole:Z,timelineLabel:V.getAttribute("data-timeline-label"),timelineClipLabel:V.getAttribute("data-timeline-clip-label"),timelineGroup:V.getAttribute("data-timeline-group"),timelinePriority:di(V.getAttribute("data-timeline-priority"))}),H.add(V.id))}}for(let j of l){if(j===s)continue;let G=j.getAttribute("data-composition-id");if(!G||!Ql(G))continue;let V=r.resolveStartForElement(j,0),Z=r.resolveDurationForElement(j);if((Z==null||Z<=0)&&ah(j)!=null){let ae=ah(j);Z=Math.max(0,ae-V)}let de=i(G),le=Z&&Z>0?Z:de;if(le==null||le<=0)continue;let Q=U(V,le);Q<=0||X.push({id:G,label:j.getAttribute("data-label")??lh(j)??G,start:V,duration:Q,thumbnailUrl:mi(j.getAttribute("data-thumbnail-url")),avatarName:null})}let z=Math.max(C||0,R??0),q=z>0?z:1,Y=Math.max(1,Math.ceil(q*Math.max(1,e.canonicalFps)));return{...So(e.canonicalFps),source:"hf-preview",type:"timeline",compositionContractVersion:1,durationSeconds:q,durationInFrames:Y,clips:K,scenes:X,compositionWidth:nr(s?.getAttribute("data-width"))??1920,compositionHeight:nr(s?.getAttribute("data-height"))??1080}}var uh=e=>e!==null&&Number.isFinite(e)&&e>0;function ir(e){let t=e.clipEndsSeconds.filter(r=>r===null).length;if(uh(e.authoredDurationSeconds))return{seconds:e.authoredDurationSeconds,source:"authored",pendingClips:t};let n=e.clipEndsSeconds.filter(uh);return n.length>0?{seconds:Math.max(...n),source:"derived",pendingClips:t}:{seconds:null,source:"unresolved",pendingClips:t,reason:t>0?"every clip\'s length is still pending":"no authored duration and no clip with a length"}}var Dt=1/60,da=e=>e!==null&&e>Dt?e:null;function ch(e){return{width:nr(e.getAttribute("data-width")),height:nr(e.getAttribute("data-height"))}}function dh(e,t){let n=[];for(let r of e.querySelectorAll("video[data-start], audio[data-start]")){let i=t.mediaStart(r);if(!Number.isFinite(i))continue;let o=t.mediaDuration(r);o==null||o<=Dt||n.push(Math.max(0,i)+o)}return da(ir({authoredDurationSeconds:null,clipEndsSeconds:n}).seconds)}function mh(e,t){let n=[];for(let i of e.querySelectorAll("[data-composition-id][data-start]")){if(i.parentElement?.closest("[data-composition-id]")!==e)continue;let o=t.resolveStartForElement(i,0),a=t.resolveDurationForElement(i);!Number.isFinite(o)||a==null||a<=0||n.push(Math.max(0,o)+a)}let r=_e(e.getAttribute("data-duration"));return da(ir({authoredDurationSeconds:null,clipEndsSeconds:[r,...n]}).seconds)}var sw=e=>e.hasAttribute("data-composition-id")||e.hasAttribute("data-composition-src");function fh(e,t,{unregisteredLottie:n}){let r=[];for(let o of e.querySelectorAll("[data-start]")){let a=t.resolveStartForElement(o,0);if(!Number.isFinite(a))continue;let s=t.resolveDurationForElement(o);s!=null?r.push(Math.max(0,a)+s):(pe(o)||sw(o))&&r.push(null)}(n||e.querySelector("[data-lottie-src]"))&&r.push(null);let i=ir({authoredDurationSeconds:null,clipEndsSeconds:r});return i.pendingClips>0?{...i,seconds:null,source:"unresolved",reason:"a clip\'s length is pending"}:i}function ph(e){if(e.declared!==null&&Number.isFinite(e.declared)&&e.declared>0)return e.declared;let t=da(e.timeline()),n=Math.max(0,...e.floors().map(o=>o??0)),r=Number.isFinite(e.fallback)&&e.fallback>Dt?e.fallback:0,i;return t!==null?i=Math.max(t,n,r):da(n)!==null?i=Math.max(n,r):r>0?i=r:i=e.derived(),i>0?i:0}var ma=new WeakMap;function or(e){let t=Number.parseFloat(e??"");return Number.isFinite(t)&&t>0?t:null}function lw(e){return Array.from(e.children).find(t=>t instanceof HTMLElement&&t.hasAttribute("data-hf-inner-root"))??e.querySelector("[data-hf-inner-root]")}function uw(e){if(!e.hasAttribute("data-hf-content-fit"))return!1;let t=lw(e);if(!t)return!1;let n=or(t.getAttribute("data-width")),r=or(t.getAttribute("data-height")),i=e.clientWidth||or(e.style.width)||or(e.getAttribute("data-width")),o=e.clientHeight||or(e.style.height)||or(e.getAttribute("data-height"));if(!n||!r||!i||!o)return!1;let a=Math.min(i/n,o/r);if(!Number.isFinite(a)||a<=0)return!1;let s=n*a,l=r*a;return e.style.overflow="hidden",t.style.position="absolute",t.style.left=`${(i-s)/2}px`,t.style.top=`${(o-l)/2}px`,t.style.width=`${n}px`,t.style.height=`${r}px`,t.style.maxWidth="none",t.style.maxHeight="none",t.style.transformOrigin="0 0",t.style.scale=String(Number(a.toFixed(6))),!0}function hh(e=document){let t=[],n=[],r=Array.from(e.querySelectorAll("[data-hf-content-fit]"));for(let i of r){let o=i,a=()=>uw(i);if(o.__hfAspectFit=a,n.push(o),!a()||ma.has(i))continue;let s=i.ownerDocument.defaultView?.ResizeObserver;if(!s)continue;let l=new s(a);l.observe(i),ma.set(i,l),t.push(i)}return()=>{for(let i of t)ma.get(i)?.disconnect(),ma.delete(i);for(let i of n)delete i.__hfAspectFit}}var nu="data-composition-id",cw="data-composition-src",dw=`[${nu}]`,gD=`[${cw}]`,ru="style",iu="script",ou=\'link[rel="stylesheet"], link[rel="preconnect"]\',gh=`${ru}, ${iu}, ${ou}`;function wn(e){return e?Array.from(e):[]}function bh(e){let{contentNode:t,head:n,documentElement:r,hasTemplate:i,compositionId:o}=e,a=wn(t.querySelectorAll(dw)),s=o?a.find(d=>d.getAttribute(nu)===o)??null:a[0]??null,l=(s??a[0])?.getAttribute(nu)?.trim()||"",u=i?null:n??null;return{innerRoot:s,authoredCompositionId:o||l||null,scriptCompositionId:l||o||null,authoredRootId:s?.getAttribute("id")?.trim()||null,styleSources:[...wn(u?.querySelectorAll(ru)),...wn(t.querySelectorAll(ru))],scriptSources:[...wn(u?.querySelectorAll(iu)),...wn(t.querySelectorAll(iu))],linkSources:[...wn(n?.querySelectorAll(ou)),...wn(t.querySelectorAll(ou))],variableDefaultCarriers:[r,s].filter(d=>d!=null)}}var mw=\'"use strict";(()=>{function I(e){return e?/[\\\\w-]/.test(e)||e.charCodeAt(0)>=128:!1}function _(e){return e===" "||e==="	"||e===`\\n`||e==="\\\\r"||e==="\\\\f"}var j=/^[0-9a-fA-F]{1,6}/;function G(e){let n=e>=55296&&e<=57343;return e===0||e>1114111||n?65533:e}function $(e,n){return e[n]==="\\\\r"&&e[n+1]===`\\n`?n+2:_(e[n])?n+1:n}function R(e,n){let t=e[n+1];if(t===void 0||/[\\\\n\\\\r\\\\f]/.test(t))return null;let i=j.exec(e.slice(n+1,n+7));if(!i)return{value:t,end:n+2};let o=G(Number.parseInt(i[0],16));return{value:String.fromCodePoint(o),end:$(e,n+1+i[0].length)}}function H(e,n){let t=o=>I(o)&&!/[0-9-]/.test(o),i=o=>e[o]==="\\\\\\\\"&&R(e,o)!==null;return e[n]==="-"?e[n+1]==="-"||t(e[n+1])||i(n+1):t(e[n])||i(n)}function y(e,n){let t=n;for(;e.startsWith("/*",t);){let i=e.indexOf("*/",t+2);t=i<0?e.length:i+2}return t}function A(e,n){let t=y(e,n);for(;_(e[t]);)t=y(e,t+1);return t}function h(e,n){if(!H(e,n))return null;let t=n,i="";for(;t<e.length;){let o=e[t];if(o==="\\\\\\\\"){let a=R(e,t);if(!a)break;i+=a.value,t=a.end;continue}if(!I(o))break;i+=o,t+=1}return t===n?null:{value:i,end:t}}var C=45;function T(e){return e>=48&&e<=57}function z(e){return e>=128||e===C||e===95||T(e)||e>=65&&e<=90||e>=97&&e<=122}function J(e,n){let t=e.charCodeAt(n);return t>=1&&t<=31||t===127?!0:T(t)?n===0||n===1&&e.charCodeAt(0)===C:!1}function k(e){let n="";for(let t=0;t<e.length;t+=1){let i=e.charCodeAt(t),o=e[t];i===0?n+="\\\\uFFFD":J(e,t)?n+=`\\\\\\\\${i.toString(16)} `:t===0&&e.length===1&&i===C?n+=`\\\\\\\\${o}`:z(i)?n+=o:n+=`\\\\\\\\${o}`}return n}var W=/\\\\/\\\\*(?:[^*]|\\\\*(?!\\\\/))*\\\\*\\\\/|\\\\\\\\(?:[0-9a-fA-F]{1,6}(?:\\\\r\\\\n|[ \\\\t\\\\r\\\\n\\\\f])?|[\\\\s\\\\S])|"(?:[^"\\\\\\\\]|\\\\\\\\[\\\\s\\\\S])*"|\\\'(?:[^\\\'\\\\\\\\]|\\\\\\\\[\\\\s\\\\S])*\\\'|\\\\[(?:\\\\/\\\\*(?:[^*]|\\\\*(?!\\\\/))*\\\\*\\\\/|\\\\\\\\[\\\\s\\\\S]|"(?:[^"\\\\\\\\]|\\\\\\\\[\\\\s\\\\S])*"|\\\'(?:[^\\\'\\\\\\\\]|\\\\\\\\[\\\\s\\\\S])*\\\'|[^\\\\]"\\\'\\\\\\\\/]|\\\\/(?!\\\\*))*\\\\]/g;function Q(e){let n=new Array(e.length).fill(!0);for(let t of e.matchAll(W)){let i=t.index;n.fill(!1,i,i+t[0].length)}return n}function q(e,n,t){if(n.length===0||!e.includes("#"))return e;let i=new Set(n),o=Q(e),a="",u=0;for(;u<e.length;){let d=o[u]&&e[u]==="#"?h(e,u+1):null;d&&i.has(d.value)?(a+=t(d.value),u=d.end):(a+=e[u],u+=1)}return a}function X(e){let n="";for(let t=0;t<e.length;t+=1){if(e[t]==="\\\\\\\\"){let i=e[t+1];if(i!==void 0&&/[\\\\n\\\\r\\\\f]/.test(i)){t=$(e,t+1)-1;continue}let o=R(e,t);if(o){n+=o.value,t=o.end-1;continue}}n+=e[t]}return n}function N(e){return Array.from(e,n=>{let t=n.charCodeAt(0);return t===0?"\\\\uFFFD":t<32||t===127?`\\\\\\\\${t.toString(16)} `:n===\\\'"\\\'||n==="\\\\\\\\"?`\\\\\\\\${n}`:n}).join("")}function Y(e,n){return e?{kind:"any"}:n===void 0?{kind:"none"}:{kind:"named",prefix:n}}function Z(e,n){return e[n]==="|"&&e[n+1]!=="="}function B(e,n){let t=e[n]==="*",i=t?{value:"*",end:n+1}:h(e,n),o=y(e,i?.end??n);if(!Z(e,o))return t?null:i?{token:i,namespace:{kind:"none"}}:null;let a=h(e,y(e,o+1));return a?{token:a,namespace:Y(t,i?.value)}:null}function K(e){if(e[0]!=="[")return null;let n=A(e,1),t=B(e,n);if(!t)return null;let{token:i,namespace:o}=t;return{name:i.value,rawName:e.slice(n,i.end),namespace:o,end:i.end}}function ee(e,n){let t=/^(?:"((?:\\\\\\\\[\\\\s\\\\S]|[^"\\\\\\\\])*)"|\\\'((?:\\\\\\\\[\\\\s\\\\S]|[^\\\'\\\\\\\\])*)\\\')/.exec(e.slice(n));return t?{value:X(t[1]??t[2]),end:n+t[0].length}:h(e,n)}function ne(e,n){let t=A(e,n),i=h(e,t);if(i){if(!/^[is]$/i.test(i.value))return null;t=A(e,i.end)}return e[t]!=="]"||t!==e.length-1?null:{flag:i?.value}}function F(e){let n=K(e);if(!n)return null;let t=A(e,n.end),o=["=","~=","|=","^=","$=","*="].find(d=>e.startsWith(d,t));if(!o)return null;let a=ee(e,A(e,t+o.length));if(!a)return null;let u=ne(e,a.end);return u?{name:n.name,rawName:n.rawName,namespace:n.namespace,operator:o,value:a.value,flag:u.flag}:null}function E(e,n){return e.replace(W,t=>t.startsWith("[")?n(t):t)}var re="data-hf-svg-reference-aliases";function O(e,n,t,i){let o={"=":(s,r)=>s===r,"~=":(s,r)=>s.split(/[ \\\\t\\\\r\\\\n\\\\f]+/).includes(r),"|=":(s,r)=>s===r||s.startsWith(r+"-"),"^=":(s,r)=>s.startsWith(r),"$=":(s,r)=>s.endsWith(r),"*=":(s,r)=>s.includes(r)},a=(s,r,l)=>!r&&l!=="="&&l!=="|="?!1:o[l](s,r),u=s=>s.replace(/[A-Z]/g,r=>r.toLowerCase()),d=s=>{let r=F(s);if(!r)return s;let{name:l,rawName:g,namespace:m,operator:b,value:D,flag:w}=r;if(m.kind==="named"!=(i!==void 0))return s;let x=w?.toLowerCase()==="i"?u:S=>S,L=u(l),P=t.filter(S=>{let V=m.kind==="none"?S.name:S.localName,U=m.kind==="named"?i.get(m.prefix):null;return(m.kind==="any"||S.namespaceURI===U)&&u(V)===L}),v=new Set([s]);for(let S of P)a(x(S.before),x(D),b)&&v.add(`[${g}="${N(S.after)}"${w?` ${w}`:""}]`);return v.size===1?s:`:is(${[...v].join(", ")})`};if(i)return E(e,d);let p=new Map(n.map(({id:s,replacement:r})=>[s,r])),f=new Map;for(let s of t){if(s.name!=="id"||s.before===s.after||p.has(s.before))continue;let r=f.get(s.before);r||(r=new Set([`#${k(s.before)}`]),f.set(s.before,r)),r.add(`#${k(s.after)}`)}for(let[s,r]of f)p.set(s,`:is(${[...r].join(", ")})`);let c=q(e,[...p.keys()],s=>p.get(s));return E(c,d)}function se(e,n,t=!0){let i=[],a=(t?[...e.querySelectorAll(`[${n}]`)]:[]).map(d=>d.getAttribute(n)),u=e.getAttribute?.(n);u&&a.unshift(u);for(let d of a){let p;try{p=JSON.parse(d)}catch{continue}if(!Array.isArray(p))continue;let f=p;for(let c of f){if(!ie(c))continue;let{name:s,localName:r,namespaceURI:l,before:g,after:m}=c;i.push({name:s,localName:r,namespaceURI:l,before:g,after:m})}}return i}function ie(e){if(!e||typeof e!="object")return!1;let{name:n,localName:t,namespaceURI:i,before:o,after:a}=e;return typeof n=="string"&&typeof t=="string"&&(i===null||typeof i=="string")&&typeof o=="string"&&typeof a=="string"}function oe(e){let n=[],t=[],i=!1,o,a=new WeakMap,u=(f,c)=>{for(let s of f){if("selectorText"in s){let r=s,l=a.get(r),g=r.selectorText,m=l?.applied===g?l.authored:g,b=O(m,[],t,c);b!==g&&(r.selectorText=b),b===m?a.delete(r):a.set(r,{authored:m,applied:r.selectorText})}"cssRules"in s&&u(s.cssRules,c)}},d=()=>{if(t.length)for(let f of e.document.styleSheets){let c;try{c=f.cssRules}catch{continue}let s=new Map;for(let r of c){if(!("namespaceURI"in r))continue;let{prefix:l,namespaceURI:g}=r;l&&s.set(l,g||null)}s.size&&u(c,s)}},p={rewrite:(f,c=[])=>{if(typeof f!="string"||!f.includes("#")&&!f.includes("["))return f;let s=O(f,c.length?[...c,...n]:n,t);if(s!==f){if(!o){let r=e.document.createElement("div");o=r.matches.bind(r)}o(f)}return s},refresh(){t=se(e.document,re).filter(r=>r.before!==r.after);let f=new Set(t.filter(r=>r.name==="id").map(r=>r.before)),c=new Set;n=[];for(let r of e.document.querySelectorAll("[data-hf-authored-id][id]")){let l=r.getAttribute("data-hf-authored-id");if(!l||l===r.id||c.has(l)||f.has(l))continue;c.add(l);let g=N(l);n.push({id:l,replacement:`:is(#${k(l)}, [data-hf-authored-id="${g}"])`})}if(d(),i||!n.length&&!t.length)return;let s=e.Element.prototype;s.querySelector=new Proxy(s.querySelector,{apply(r,l,g){return Reflect.apply(r,l,[p.rewrite(g[0])])}}),s.querySelectorAll=new Proxy(s.querySelectorAll,{apply(r,l,g){return Reflect.apply(r,l,[p.rewrite(g[0])])}}),i=!0}};e.__hfSvgSelectorAliases=p,p.refresh()}function M(){let e=window;e.__hfSvgSelectorAliases||oe(e)}M();})();\\n\';function yh(){return mw}var Re=qS(jg(),1),ka=Re.default,aP=Re.default.stringify,sP=Re.default.fromJSON,lP=Re.default.plugin,uP=Re.default.parse,cP=Re.default.list,dP=Re.default.document,mP=Re.default.comment,fP=Re.default.atRule,pP=Re.default.rule,hP=Re.default.decl,gP=Re.default.root,bP=Re.default.CssSyntaxError,yP=Re.default.Declaration,xP=Re.default.Container,SP=Re.default.Processor,vP=Re.default.Document,EP=Re.default.Comment,AP=Re.default.Warning,wP=Re.default.AtRule,_P=Re.default.Result,CP=Re.default.Input,RP=Re.default.Rule,TP=Re.default.Root,kP=Re.default.Node;var Mu="data-hf-scene",Li="hf-scene-parts",Lu="data-hf-scene-no-swap";var Nu="data-hf-authored-id",Kg="data-hf-inner-root";function Fu(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\\\$&")}function Iu(e){return e.replace(/\\\\/g,"\\\\\\\\").replace(/"/g,\'\\\\"\')}function $_(e){let t=e.trim();return t?Array.from(new Set([t,Mt(t)])).filter(Boolean):[]}function q_(e,t,n){let r=$_(t);return yo(e,r,()=>n)}function z_(e,t){let n=t?.trim();return n?q_(e,n,`[${Nu}="${Iu(n)}"]`):e}function Yg(e){return`${e}:not(:has([${Kg}])), ${e} > [${Kg}]`}function j_(e,t,n,r,i,o){let a=z_(e,r),s=K_(a,t,n),l=s.trim();if(!l||l==="*")return e;if(/^(html|body|:root)$/i.test(l))return o?Yg(t):e;let u=new RegExp(`\\\\[\\\\s*data-composition-id\\\\s*[\\\\^\\\\*\\\\$]?=\\\\s*(["\'])${Fu(n)}\\\\1\\\\s*\\\\]`,"g");if(u.test(l))return l.replace(u,"").trim()===""?Yg(t):s.replace(u,t);let d=s.match(/^\\s*/)?.[0]??"",f=s.match(/\\s*$/)?.[0]??"";if(i){let m=r?`[${Nu}="${Iu(r)}"]`:null;if(m&&l.startsWith(m)){let p=l.slice(m.length);return`${d}${t}${m}${p}${f}`}}return`${d}${t} ${l}${f}`}function K_(e,t,n){let r=Fu(n),i=String.raw`\\[\\s*data-composition-id\\s*=\\s*(?:"${r}"|\'${r}\')\\s*\\]`,o=String.raw`\\s*\\[\\s*data-(?:start|duration)\\s*=\\s*(?:"[^"]*"|\'[^\']*\')\\s*\\]`;return e.replace(new RegExp(`${i}(?:${o})+`,"g"),t).replace(new RegExp(`(?:${o})+${i}`,"g"),t)}var Y_=new Set(["keyframes","-webkit-keyframes","font-face"]);function X_(e){return e?.type==="atrule"}function J_(e){let t=e.parent;for(;t;){if(X_(t)&&Y_.has(t.name.toLowerCase()))return!0;t=t.parent}return!1}function Q_(e){let t=e.parent;for(;t;){if(t.type==="rule")return!0;t=t.parent}return!1}function Xg(e,t,n,r,i){let o=t.trim();if(!e||!o)return e;let a=n||`[data-composition-id="${Iu(o)}"]`,s;try{s=ka.parse(e)}catch{return""}return s.walkRules(l=>{J_(l)||Q_(l)||(l.selectors=l.selectors.map(u=>j_(u,a,o,r,i?.compoundAuthoredRoot,i?.scopeRootSelectors)))}),s.toResult({map:!1}).css}function rt(e){return JSON.stringify(e).replace(/</g,"\\\\u003c")}var Jg=`!__hfBaseHyperframes\n    ? __hfBaseHyperframes\n    : Object.assign({}, __hfBaseHyperframes, {\n        assetUrl: function(path) {\n          var page = window.document.baseURI;\n          return new URL(path, __hfCompositionSrc ? new URL(__hfCompositionSrc, page) : page).href;\n        },\n        getVariables: function() {\n          var byComp = window.__hfVariablesByComp;\n          var scoped = byComp && __hfTimelineCompId ? byComp[__hfTimelineCompId] : null;\n          return scoped ? Object.assign({}, scoped) : {};\n        },\n      })`;function Qg(e,t){return`const __hyperframes = (function(__hfBaseHyperframes, __hfTimelineCompId, __hfCompositionSrc) {\n  return ${Jg};\n})(window.__hyperframes, ${rt(e)}, ${rt(t?.trim()||null)});\n${Du("",e)}\n`}function Du(e,t,n="[HyperFrames] composition script error:",r,i=t,o,a){let s=rt(t),l=rt(i),u=rt(n),d=Fu(t),f=rt(o?.trim()||null),m=rt(r??null),p=rt(String.raw`\\[\\s*data-composition-id\\s*=\\s*(?:"${d}"|\'${d}\')\\s*\\]`),g=rt(String.raw`\\s*\\[\\s*data-(?:start|duration)\\s*=\\s*(?:"[^"]*"|\'[^\']*\')\\s*\\]`);return`(function(){\n  ${`(function(){ ${yh()} })();`}\n  var __hfCompId = ${s};\n  var __hfTimelineCompId = ${l};\n  var __hfErrorLabel = ${u};\n  var __hfAuthoredRootId = ${f};\n  var __hfCompositionSrc = ${rt(a?.trim()||null)};\n  var __hfAuthoredRootAttr = ${rt(Nu)};\n  var __hfEscapeAttr = function(value) {\n    return (value + "").replace(/\\\\\\\\/g, "\\\\\\\\\\\\\\\\").replace(/"/g, "\\\\\\\\\\\\"");\n  };\n  var __hfRootSelector = ${m} || (__hfCompId\n    ? \'[data-composition-id="\' + __hfEscapeAttr(__hfCompId) + \'"]\'\n    : "");\n  var __hfRoot = null;\n  var __hfRootSelectorPattern = ${p};\n  var __hfTimingSelectorPattern = ${g};\n  var __hfAuthoredRootSelector = __hfAuthoredRootId\n    ? "[" + __hfAuthoredRootAttr + \'="\' + __hfEscapeAttr(__hfAuthoredRootId) + \'"]\'\n    : "";\n  var __hfAuthoredRootEntries = __hfAuthoredRootSelector\n    ? [{ id: __hfAuthoredRootId, replacement: __hfAuthoredRootSelector }]\n    : [];\n  var __hfNormalizeSelector = function(selector) {\n    if (!__hfCompId || typeof selector !== "string") return selector;\n    var normalized = selector\n      .replace(new RegExp(__hfRootSelectorPattern + \'(?:\' + __hfTimingSelectorPattern + \')+\', \'g\'), __hfRootSelector)\n      .replace(new RegExp(\'(?:\' + __hfTimingSelectorPattern + \')+\' + __hfRootSelectorPattern, \'g\'), __hfRootSelector);\n    return window.__hfSvgSelectorAliases.rewrite(normalized, __hfAuthoredRootEntries);\n  };\n  var __hfFindRoot = function() {\n    if (!__hfRoot && __hfRootSelector) {\n      var matches = window.document.querySelectorAll(__hfRootSelector);\n      // An unflattened sibling template may retain the same authored id.\n      // Bind scripts to the compiled mount, not that sibling\'s inner root.\n      __hfRoot = Array.prototype.find.call(matches, function(node) {\n        return node.hasAttribute("data-composition-file") || node.hasAttribute("data-composition-src");\n      }) || matches[0] || null;\n    }\n    return __hfRoot;\n  };\n  var __hfContains = function(node) {\n    var root = __hfFindRoot();\n    return !root || node === root || root.contains(node);\n  };\n  var __hfQueryAll = function(selector) {\n    var root = __hfFindRoot();\n    if (!root || typeof selector !== "string") {\n      return window.document.querySelectorAll(selector);\n    }\n    return Array.prototype.filter.call(window.document.querySelectorAll(__hfNormalizeSelector(selector)), function(node) {\n      return __hfContains(node);\n    });\n  };\n  var __hfQueryOne = function(selector) {\n    var matches = __hfQueryAll(selector);\n    return matches[0] || null;\n  };\n  var __hfGetElementById = function(id) {\n    var found = window.document.getElementById(id);\n    if (found && __hfContains(found)) return found;\n    var root = __hfFindRoot();\n    if (!root) return found || null;\n    var idValue = id + "";\n    if (__hfAuthoredRootId && __hfAuthoredRootId === idValue && root.getAttribute && root.getAttribute(__hfAuthoredRootAttr) === idValue) {\n      return root;\n    }\n    if (root.id === idValue) return root;\n    if (typeof root.querySelector !== "function") return null;\n    try {\n      var authoredRootMatch = root.querySelector(\'[\' + __hfAuthoredRootAttr + \'="\' + __hfEscapeAttr(idValue) + \'"]\');\n      if (authoredRootMatch) return authoredRootMatch;\n    } catch {}\n    if (typeof CSS !== "undefined" && CSS && typeof CSS.escape === "function") {\n      try {\n        return root.querySelector("#" + CSS.escape(idValue)) || null;\n      } catch {}\n    }\n    try {\n      return root.querySelector(\'[id="\' + __hfEscapeAttr(idValue) + \'"]\') || null;\n    } catch {}\n    return null;\n  };\n  var __hfScopedDocument = typeof Proxy === "function"\n    ? new Proxy(window.document, {\n        get: function(target, prop, receiver) {\n          if (prop === "querySelector") return __hfQueryOne;\n          if (prop === "querySelectorAll") return __hfQueryAll;\n          if (prop === "getElementById") return __hfGetElementById;\n          var value = Reflect.get(target, prop, target);\n          return typeof value === "function" ? value.bind(target) : value;\n        },\n      })\n    : window.document;\n  var __hfTimelineRegistryProxy = null;\n  var __hfGetTimelineRegistry = function() {\n    window.__timelines = window.__timelines || {};\n    if (!__hfCompId || __hfCompId === __hfTimelineCompId || typeof Proxy !== "function") {\n      return window.__timelines;\n    }\n    if (!__hfTimelineRegistryProxy) {\n      __hfTimelineRegistryProxy = new Proxy(window.__timelines, {\n        get: function(target, prop, receiver) {\n          if (prop !== __hfCompId) {\n            return Reflect.get(target, prop, target);\n          }\n          // Reusing an authored key must only find this mounted instance.\n          // Falling back to its sibling\'s alias lets .clear() erase that\n          // sibling\'s animation when the same component is inserted twice.\n          return Reflect.get(target, __hfTimelineCompId, target);\n        },\n        set: function(target, prop, value, receiver) {\n          if (prop !== __hfCompId) {\n            return Reflect.set(target, prop, value, target);\n          }\n          // The authored node remains in the compiled DOM when its local id\n          // differs from the runtime mount id, so readiness legitimately sees\n          // both compositions. Preserve the first alias for readiness while\n          // keeping every mount\'s own timeline isolated.\n          var root = __hfFindRoot();\n          var authoredMounts = window.document.querySelectorAll(\n            \'[data-composition-id="\' + __hfEscapeAttr(__hfCompId) + \'"][data-composition-file]\'\n          );\n          var reserved = Array.prototype.some.call(authoredMounts, function(node) {\n            return node !== root && (!root || !root.contains(node));\n          });\n          var authoredSet = reserved || Reflect.get(target, __hfCompId, target) !== undefined ||\n            Reflect.set(target, __hfCompId, value, target);\n          var runtimeSet = Reflect.set(target, __hfTimelineCompId, value, target);\n          return authoredSet && runtimeSet;\n        },\n      });\n    }\n    return __hfTimelineRegistryProxy;\n  };\n  var __hfScopedWindow = typeof Proxy === "function"\n    ? new Proxy(window, {\n        get: function(target, prop, receiver) {\n          if (prop === "__timelines") return __hfGetTimelineRegistry();\n          // Inside a sub-composition, __hyperframes is passed as a bare script\n          // param bound to the SCOPED variant (per-comp getVariables). But\n          // authors routinely write the documented window.__hyperframes.\n          // getVariables() form, which would otherwise fall through to the host\n          // page\'s base __hyperframes and return the WRONG (or empty) variables\n          // for this instance. Route it to the scoped variant too so both\n          // spellings resolve to this composition\'s own variables.\n          // (__hfScopedHyperframes is a hoisted var assigned below, before any\n          // sub-comp script -- the only code that reads this -- runs.)\n          if (prop === "__hyperframes") return __hfScopedHyperframes;\n          // Native window methods must stay bound to the real window. Handed\n          // back unbound, "this" at call time is this Proxy and Chrome rejects\n          // it with "Illegal invocation", which broke window.addEventListener,\n          // setTimeout, matchMedia and getComputedStyle inside every\n          // sub-composition -- including the window.addEventListener("hf-seek",\n          // ...) form the Three.js and TypeGPU adapters document. The sibling\n          // document and gsap proxies here already bind.\n          //\n          // Only bind non-constructors. Function.prototype.bind drops static\n          // members, so binding a class exposed on window (window.Texts and\n          // friends) would silently strip its statics. Built-in methods have\n          // no .prototype; classes and constructor functions do.\n          var value = Reflect.get(target, prop, target);\n          return typeof value === "function" && value.prototype === undefined\n            ? value.bind(target)\n            : value;\n        },\n        set: function(target, prop, value, receiver) {\n          if (prop === "__timelines") {\n            // Common authoring boilerplate assigns the registry back to\n            // itself (window.__timelines = window.__timelines || {}). The\n            // getter above returns our proxy; do not replace the canonical\n            // registry with that proxy or later wrappers will stack proxies.\n            if (value === __hfTimelineRegistryProxy) return true;\n            target.__timelines = value || {};\n            __hfTimelineRegistryProxy = null;\n            return true;\n          }\n          return Reflect.set(target, prop, value, target);\n        },\n      })\n    : window;\n  var __hfResolveGsapTarget = function(target) {\n    if (typeof target === "string") return __hfQueryAll(target);\n    if (!Array.isArray(target)) return target;\n    return target.reduce(function(resolved, item) {\n      if (typeof item === "string") {\n        return resolved.concat(Array.prototype.slice.call(__hfQueryAll(item)));\n      }\n      resolved.push(item);\n      return resolved;\n    }, []);\n\n  };\n  var __hfScopeTimeline = function(timeline) {\n    if (!timeline || timeline.__hfScopedCompositionRoot === __hfFindRoot()) return timeline;\n    ["to", "from", "fromTo", "set"].forEach(function(method) {\n      var original = timeline[method];\n      if (typeof original !== "function") return;\n      timeline[method] = function(target) {\n        var args = Array.prototype.slice.call(arguments);\n        args[0] = __hfResolveGsapTarget(target);\n        return original.apply(timeline, args);\n      };\n    });\n    try {\n      Object.defineProperty(timeline, "__hfScopedCompositionRoot", {\n        value: __hfFindRoot(),\n        configurable: true,\n      });\n    } catch {\n      // Best-effort: timelines coming from user code may have a frozen target\n      // or a non-extensible defineProperty path. Swallow \\u2014 the scoped root\n      // is an enrichment, not a correctness invariant for playback.\n    }\n    return timeline;\n  };\n  var __hfBaseGsap = typeof gsap === "undefined" ? window.gsap : gsap;\n  var __hfScopedGsap = !__hfBaseGsap || typeof Proxy !== "function"\n    ? __hfBaseGsap\n    : new Proxy(__hfBaseGsap, {\n        get: function(target, prop, receiver) {\n          if (prop === "timeline") {\n            return function() {\n              return __hfScopeTimeline(target.timeline.apply(target, arguments));\n            };\n          }\n          if (prop === "to" || prop === "from" || prop === "fromTo" || prop === "set") {\n            return function(firstArg) {\n              var args = Array.prototype.slice.call(arguments);\n              args[0] = __hfResolveGsapTarget(firstArg);\n              return target[prop].apply(target, args);\n            };\n          }\n          if (prop === "utils" && target.utils && typeof Proxy === "function") {\n            return new Proxy(target.utils, {\n              get: function(utilsTarget, utilsProp, utilsReceiver) {\n                if (utilsProp === "toArray") {\n                  return function(firstArg) {\n                    var args = Array.prototype.slice.call(arguments);\n                    args[0] = __hfResolveGsapTarget(firstArg);\n                    return utilsTarget.toArray.apply(utilsTarget, args);\n                  };\n                }\n                if (utilsProp === "selector") {\n                  return function(base) {\n                    var baseEl = typeof base === "string" ? __hfQueryOne(base) : base;\n                    var root = baseEl || __hfFindRoot();\n                    return function(selector) {\n                      if (!root || typeof selector !== "string") return [];\n                      return Array.prototype.filter.call(\n                        window.document.querySelectorAll(__hfNormalizeSelector(selector)),\n                        function(node) {\n                          return node === root || (typeof root.contains === "function" && root.contains(node));\n                        },\n                      );\n                    };\n                  };\n                }\n                var value = Reflect.get(utilsTarget, utilsProp, utilsTarget);\n                return typeof value === "function" ? value.bind(utilsTarget) : value;\n              },\n            });\n          }\n          var value = Reflect.get(target, prop, target);\n          return typeof value === "function" ? value.bind(target) : value;\n        },\n      });\n  var __hfBaseHyperframes = window.__hyperframes;\n  var __hfScopedHyperframes = ${Jg};\n  var __hfRun = function() {\n    try {\n      (function(document, gsap, window, __hyperframes) {\n${e.replace(/<\\/(script)/gi,"<\\\\/$1")}\n      }).call(window, __hfScopedDocument, __hfScopedGsap, __hfScopedWindow, __hfScopedHyperframes);\n    } catch (_err) {\n      console.error(__hfErrorLabel, __hfCompId, _err);\n    }\n  };\n  // What the script started on the global gsap timeline, by any route, for a scene swap to revert.\n  // Only a page with a scene manifest can swap; elsewhere the first script stores null and none records.\n  var __hfRecordAnimations = function(run) {\n    if (window.__hfSceneAnimations === undefined) {\n      window.__hfSceneAnimations = window.document.querySelector(${rt(`meta[name="${Li}"]`)})\n        ? {}\n        : null;\n    }\n    var byComp = window.__hfSceneAnimations;\n    var globalTimeline = __hfBaseGsap && __hfBaseGsap.globalTimeline;\n    if (!byComp || !globalTimeline || !__hfTimelineCompId) return run();\n    var before = globalTimeline.getChildren(false);\n    // A set completes as it is made and would leave the timeline before the diff below.\n    var autoRemove = globalTimeline.autoRemoveChildren;\n    globalTimeline.autoRemoveChildren = false;\n    run();\n    globalTimeline.autoRemoveChildren = autoRemove;\n    var recorded = (byComp[__hfTimelineCompId] = byComp[__hfTimelineCompId] || []);\n    globalTimeline.getChildren(false).forEach(function(animation) {\n      if (before.indexOf(animation) >= 0) return;\n      recorded.push(animation);\n      // Dropped as the timeline drops a finished tween (it keeps a paused one); moved back, a tween re-adds itself.\n      if (autoRemove && !animation.getChildren && animation.totalProgress() === 1) globalTimeline.remove(animation);\n    });\n  };\n  __hfFindRoot();\n  __hfRecordAnimations(__hfRun);\n})();`}var Zg=(e,t)=>e&&Object.fromEntries(Object.entries(e).map(([n,r])=>[n,t(r)]));function e0(e,t){let n;try{n=JSON.parse(e)}catch{return null}if(!n||typeof n!="object")return null;let{imports:r,scopes:i}=n;return{imports:Zg(r,t),scopes:i&&Object.fromEntries(Object.entries(i).map(([o,a])=>[t(o),Zg(a,t)??{}]))}}var Pu="text/hf-after-fonts",n0=`${Pu}+module`,r0=`script[type="${Pu}"], script[type="${n0}"]`,i0="__hfAfterFontsClaimed",Z_="data-hf-inlined-src";var o0=`[defer][src], [defer][${Z_}]`;function Ma(e){let t=e.getAttribute("type");return t===Pu?null:t===n0?"module":t}function eC(e){let t=e.getAttribute("type")??"",n=e.tagName.toLowerCase()==="link"?t.split(";")[0].trim():t;if(n!==""&&n.toLowerCase()!=="text/css")return;let r=(e.getAttribute("media")??"").trim().toLowerCase();return JSON.stringify([r==="all"?"":r,e.getAttribute("title")??""])}var HP=JSON.stringify(["",""]);function t0(e){return JSON.stringify([e.getAttribute("href"),(e.getAttribute("rel")??"").trim().toLowerCase(),eC(e)??e.getAttribute("type"),e.hasAttribute("disabled")])}function a0(e,t){let n=t0(t);return[...e.querySelectorAll("link[href]")].some(r=>!r.closest("noscript")&&t0(r)===n)}var He="id",Ou="data-hf-authored-id",dr=/(url\\(\\s*)(["\']?)#([^"\')\\s]+)\\2(\\s*\\))/gi;function l0(e){return e==="href"||e.endsWith(":href")}function tC(e){return e.replace(/[^a-zA-Z0-9_-]/g,"-")}function Hu(e,t){return!e||!e.toLowerCase().includes("url(")?e:e.replace(dr,(n,r,i,o,a)=>{let s=t.get(o);return s?`${r}${i}#${s}${i}${a}`:n})}function nC(e,t,n){if(l0(e)&&t.startsWith("#")){let i=n.get(t.slice(1));return i?`#${i}`:t}dr.lastIndex=0;let r=dr.test(t);return dr.lastIndex=0,r?Hu(t,n):null}function rC(e,t,n){if(e.name===ut||e.name===He)return{kind:"skip"};let r=t&&e.value===t.after?t.before:e.value,i=nC(e.name,r,n);return i!==null?{kind:"managed",before:r,after:i}:t?{kind:"retain",alias:t}:{kind:"skip"}}function iC(e,t,n,r){let i=e.namespaceURI===void 0&&e.name==="xlink:href"&&r;return{name:e.name,localName:i?"href":e.localName,namespaceURI:i?"http://www.w3.org/1999/xlink":e.namespaceURI??null,before:t,after:n}}function oC(e,t){let n=new Map(yn(e,ut,!1).map(o=>[o.name,o])),r=[...n.values()].filter(o=>o.name===He),i=!!e.closest("svg");for(let o of e.attributes?Array.from(e.attributes):[]){let a=rC(o,n.get(o.name),t);if(a.kind!=="skip"){if(a.kind==="retain"){r.push(a.alias);continue}a.after!==o.value&&(o.namespaceURI?e.setAttributeNS(o.namespaceURI,o.name,a.after):e.setAttribute(o.name,a.after)),r.push(iC(o,a.before,a.after,i))}}r.length&&e.setAttribute(ut,JSON.stringify(r))}function s0(e,t,n){let r;for(dr.lastIndex=0;r=dr.exec(e);){let i=r[3];t.has(i)&&n.add(i)}}function aC(e,t,n){if(l0(e.name)&&e.value.startsWith("#")){let r=e.value.slice(1);t.has(r)&&n.add(r)}}function sC(e,t,n){let r=new Set;for(let i of e)for(let o of i.attributes?Array.from(i.attributes):[])!o.value||o.name===ut||(aC(o,n,r),o.value.toLowerCase().includes("url(")&&s0(o.value,n,r));for(let i of t)i.toLowerCase().includes("url(")&&s0(i,n,r);return r}function u0(e,t){return t.some(n=>n===e||n.contains(e))}function lC(e){let t=e.exclude??[],n=[...e.root.querySelectorAll("*")],r=t.length?n.filter(i=>!u0(i,t)):n;return[e.root,...r]}function uC(e){let t=e.exclude??[],n=[...e.root.querySelectorAll("svg [id], svg[id]")];return t.length?n.filter(r=>!u0(r,t)):n}function cC(e){let t=lC(e),n=new Set;if(!e.namespace)return{elements:t,renamable:n};let r=uC(e),i=new Set;for(let a of r){let s=a.getAttribute(He);s&&i.add(s)}if(i.size===0)return{elements:t,renamable:n};let o=sC(t,e.cssTexts??[],i);for(let a of r){let s=a.getAttribute(He);s&&o.has(s)&&n.add(a)}return{elements:t,renamable:n}}function c0(e){if(!e.closest("svg"))return null;let t=yn(e,ut,!1).find(n=>n.name===He);return t?e.getAttribute(He)===t.after?t.before:null:e.getAttribute(Ou)}function dC(e){let t=new Map,n=new Set;for(let r of e.querySelectorAll("[id]")){let i=r.getAttribute(He);if(!i)continue;n.add(i);let o=t.get(i);o?o.push(r):t.set(i,[r]);let a=c0(r);if(a&&a!==i){let s=t.get(a);s?s.push(r):t.set(a,[r])}}return{elementsById:t,usedIds:n}}function mC(e,t,n){let r=`${tC(e)}--${t}`,i=r;for(let o=2;n.has(i);o+=1)i=`${r}-${o}`;return n.add(i),i}function fC(e,t,n){let r=t.find(a=>!n.has(a))??t[0],o=t.filter(a=>a!==r&&a.getAttribute(He)===e).map(a=>n.get(a));return new Set(o.filter(a=>a!==void 0))}function pC(e,t,n){let r=t.map(()=>new Map);for(let[i,o]of e.elementsById)if(!(o.length<2))for(let a of fC(i,o,n))r[a].set(i,mC(t[a].namespace,i,e.usedIds));return r}function hC(e,t,n){let r=new Map;for(let[i,o]of e.elementsById){let a=o[0],s=a.getAttribute(He);if(s!==i){r.set(i,s);continue}let l=n.get(a),u=l===void 0?void 0:t[l].get(i);u&&r.set(i,u)}return r}function gC(e){let t=new Set(e.map(r=>r.getAttribute(He))),n=new Map;for(let r of e){let i=c0(r),o=r.getAttribute(He);!i||!o||(t.add(i),n.set(i,o))}return{ids:t,renamed:n}}function bC(e,t){for(let n of e.elements){let r=n.getAttribute(He);if(r&&e.renamable.has(n)&&t.has(r)){n.hasAttribute(Ou)||n.setAttribute(Ou,r);let i=t.get(r),o=yn(n,ut,!1);o.push({name:He,localName:He,namespaceURI:null,before:r,after:i}),n.setAttribute(ut,JSON.stringify(o)),n.setAttribute(He,i)}oC(n,t)}}function d0(e,t,n){if(t.length===0)return[];let r=dC(e),i=t.map(cC),o=i.flatMap(({renamable:d})=>[...d]);if(n)for(let d of i)for(let f of d.renamable)n.has(f)&&d.renamable.delete(f);let a=new Map;i.forEach(({renamable:d},f)=>{for(let m of d)a.set(m,f)});let s=pC(r,t,a),l=hC(r,s,a),u=i.map((d,f)=>{let m=gC(t[f].referenceTarget==="document"?[]:d.elements),p=[...l].filter(([g])=>!m.ids.has(g));return new Map([...p,...m.renamed,...s[f]])});u.forEach((d,f)=>{bC(i[f],d)});for(let d of o)n?.add(d);return u}function m0(e,t,n=[]){if(!e||t.size===0&&n.length===0||!e.includes("#")&&!e.includes("[")&&!e.toLowerCase().includes("url("))return e;let r;try{r=ka.parse(e)}catch{return e}let i=!1,o=new Set(n.filter(s=>s.name===He).map(s=>s.before)),a=[...t].filter(([s])=>!o.has(s)).map(([s,l])=>({id:s,replacement:`:is(#${Mt(s)}, #${Mt(l)})`}));return r.walkRules(s=>{let l=s.selectors.map(u=>xo(u,a,n));l.some((u,d)=>u!==s.selectors[d])&&(s.selectors=l,i=!0)}),r.walkDecls(s=>{let l=Hu(s.value,t);l!==s.value&&(s.value=l,i=!0)}),r.walkAtRules(s=>{if(!s.params)return;let l=Hu(s.params,t);l!==s.params&&(s.params=l,i=!0)}),i?r.toResult({map:!1}).css:e}var Gu=5e3;window[i0]=!0;async function Bu(){let e=document.fonts;if(!e)return;document.body?.offsetHeight;let t,n=await Promise.race([e.ready.then(()=>!1),new Promise(i=>t=setTimeout(i,Gu,!0))]);if(clearTimeout(t),!n)return;let r=[...new Set(Array.from(e).filter(i=>i.status==="loading").map(i=>i.family))];console.warn(`[hyperframes] fonts still loading after ${Gu} ms, composition scripts run without them: ${r.join(", ")}`),Ae({source:"hf-preview",type:"diagnostic",code:"runtime_font_wait_timeout",details:{loadingFamilies:r,timeoutMs:Gu}})}function yC(e,t){let n=Object.getOwnPropertyDescriptor(e,"addEventListener"),r=e.addEventListener,i=(o,a,s)=>{if(!a)return;o==="DOMContentLoaded"||o==="load"&&e===window&&document.readyState==="complete"?t.push({target:e,type:o,listener:a}):r.call(e,o,a,s)};return e.addEventListener=i,()=>{e.addEventListener===i&&(n?Object.defineProperty(e,"addEventListener",n):delete e.addEventListener)}}function xC(e){if(!e.isConnected)return;let t=document.createElement("script");for(let{name:r,value:i}of Array.from(e.attributes))t.setAttribute(r,i);let n=Ma(e);return n===null?t.removeAttribute("type"):t.setAttribute("type",n),t.async=e.hasAttribute("async"),t.text=e.textContent??"",e.replaceWith(t),t}var SC=e=>new Promise(t=>{e.addEventListener("load",t),e.addEventListener("error",t)});function vC(){let e=document.createElement("script");e.type="module",e.async=!1,e.text=\'document.dispatchEvent(new Event("hf-after-fonts-modules"))\';let t=new Promise(n=>document.addEventListener("hf-after-fonts-modules",n,{once:!0}));return document.body.appendChild(e),t.then(()=>e.remove())}async function La(e,t){await Bu();let n=o=>Ma(o)==="module"||o.matches(o0),r=[],i=[document,window].map(o=>yC(o,r));for(let o of[...e.filter(a=>!n(a)),...e.filter(n)]){let a=xC(o);a?.hasAttribute("src")&&!a.async&&!a.noModule?await SC(a):Ma(o)==="module"&&await vC()}for(let o of i)o();t?.();for(let{target:o,type:a,listener:s}of r){let l=new Event(a);try{typeof s=="function"?s.call(o,l):s.handleEvent(l)}catch(u){reportError(u)}}}var EC=["data-composition-id","data-composition-file","data-start","data-duration","data-end","data-track-index","data-track","data-composition-src","data-hf-authored-duration","data-hf-authored-end"];function f0(e){let t=e.getAttribute("id")?.trim();for(let n of EC)e.removeAttribute(n);t&&(e.removeAttribute("id"),e.setAttribute("data-hf-authored-id",t)),e.setAttribute("data-hf-inner-root","true")}var AC=8e3,wC=/^(?![a-zA-Z][a-zA-Z\\d+\\-.]*:)(?!\\/\\/)(?!\\/)(?!\\.\\.?\\/).+/,_C=/\\burl\\(\\s*(["\']?)([^)"\']+)\\1\\s*\\)/g,CC=["src","href"];function RC(e){return!e||e.startsWith("http://")||e.startsWith("https://")||e.startsWith("//")||e.startsWith("data:")||e.startsWith("#")||e.startsWith("/")}function x0(e,t){if(!t)return e;let n=e.trim();if(RC(n)||!n.startsWith("../")&&n!=="..")return e;try{return new URL(n,t).href}catch{return e}}function S0(e,t){return!t||!e?e:e.replace(_C,(n,r,i)=>{let o=x0(i||"",t);return o===i?n:`url(${r||""}${o}${r||""})`})}function TC(e,t){for(let n of Array.from(e.querySelectorAll("[src], [href]")))for(let r of CC){let i=n.getAttribute(r);if(i==null)continue;let o=x0(i,t);o!==i&&n.setAttribute(r,o)}}function kC(e,t){for(let n of Array.from(e.querySelectorAll("[style]"))){let r=n.getAttribute("style");if(r==null)continue;let i=S0(r,t);i!==r&&n.setAttribute("style",i)}}function MC(e,t){for(let n of Array.from(e.querySelectorAll("style"))){let r=n.textContent||"",i=S0(r,t);i!==r&&(n.textContent=i)}}function v0(e,t){if(t){TC(e,t),kC(e,t),MC(e,t);for(let n of Array.from(e.querySelectorAll("template")))v0(n.content,t)}}function p0(e,t){return`${e}__hf${t}`}var LC=e=>new Promise(t=>{let n=!1,r=Date.now(),i=null,o=a=>{n||(n=!0,i!=null&&window.clearTimeout(i),t({status:a,elapsedMs:Math.max(0,Date.now()-r)}))};e.addEventListener("load",()=>o("load"),{once:!0}),e.addEventListener("error",()=>o("error"),{once:!0}),i=window.setTimeout(()=>o("timeout"),AC)});function Wu(e){for(;e.firstChild;)e.removeChild(e.firstChild);e.textContent=""}function Uu(e){for(let t of Array.from(e.querySelectorAll(gh)))t.remove()}function NC(e){let t=document.importNode(e,!0);f0(t);let n=An(t.getAttribute("data-width")),r=An(t.getAttribute("data-height"));return t.style.width=n===null?"100%":`${n}px`,t.style.height=r===null?"100%":`${r}px`,t}function h0(e,t){let n=e.trim();if(!n)return e;try{return wC.test(n)&&!n.startsWith("#")&&!n.startsWith("?")?new URL(n,document.baseURI).toString():t?new URL(n,t).toString():new URL(n,document.baseURI).toString()}catch{return e}}function g0(e,t){try{let n=new URL(e),r=new URL(t);return n.search="",n.hash="",r.search="",r.hash="",n.href===r.href}catch{return!1}}function Ni(e){let t=(e.getAttribute("data-composition-id")||"").trim()||null;return{authoredCompositionId:(e.getAttribute("data-hf-original-composition-id")||t||"").trim()||null,runtimeCompositionId:t}}function FC(e){let t=new Map;for(let n of e){let r=Ni(n).authoredCompositionId||"";r&&t.set(r,(t.get(r)||0)+1)}return t}function E0(e){let t=Ni(e).authoredCompositionId;return t?!!document.querySelector(`template#${CSS.escape(t)}-template`):!1}function IC(e){return!!e.querySelector(\'[data-hf-inner-root="true"]\')}function b0(e){return e.hasAttribute("data-composition-src")?!0:E0(e)?e.children.length===0||e.hasAttribute("data-hf-original-composition-id")?!0:IC(e):!1}function Na(){return Array.from(document.querySelectorAll("[data-composition-src], [data-composition-id]")).filter(t=>t.hasAttribute("data-composition-src")?!0:E0(t))}function $u(){let e=window.__hfVariablesByComp;if(!e)return;let t=new Set(Na().map(n=>Ni(n).runtimeCompositionId).filter(n=>!!n));for(let n of Object.keys(e))t.has(n)||delete e[n]}function A0(e,t){let n=FC(e),r=new Set(e.flatMap(a=>{let s=Ni(a),l=s.authoredCompositionId?[s.authoredCompositionId]:[];return(t.has(a)||!b0(a))&&s.runtimeCompositionId&&l.push(s.runtimeCompositionId),l})),i=new Map,o=new Map;for(let a of e){let{authoredCompositionId:s,runtimeCompositionId:l}=Ni(a),u=!t.has(a)&&b0(a);if(!s){o.set(a,{authoredCompositionId:null,runtimeCompositionId:l});continue}let d=(n.get(s)||0)>1,f=l||s;if(u){let m=d?(i.get(s)||0)+1:0;if(d){for(;r.has(p0(s,m));)m+=1;i.set(s,m)}f=d?p0(s,m):s,r.add(f),d?a.setAttribute("data-hf-original-composition-id",s):a.removeAttribute("data-hf-original-composition-id"),a.setAttribute("data-composition-id",f)}o.set(a,{authoredCompositionId:s,runtimeCompositionId:f})}return $u(),o}async function w0(e){let t=bh({contentNode:e.sourceNode,head:e.head,hasTemplate:e.hasTemplate,compositionId:e.authoredCompositionId}),n=ye(t.innerRoot)?t.innerRoot:null,r=n??e.sourceNode,i=t.authoredCompositionId,o=t.scriptCompositionId,a=e.runtimeCompositionId||null,s=t.authoredRootId,l=a?`[data-composition-id="${CSS.escape(a)}"]`:void 0;for(let b of t.linkSources){let y=(b.getAttribute("href")||"").trim();if(!y)continue;let v=e.compositionUrl?new URL(y,e.compositionUrl).href:y;if(e.compositionUrl&&g0(v,e.compositionUrl))continue;let A=b.cloneNode(!0);Wm(A)&&(A.href=v,!a0(document.head,A)&&(document.head.appendChild(A),e.injectedLinks.push(A)))}let u=[];(b=>{for(let y of b){let v=y.cloneNode(!0);if(!Vm(v))continue;i&&(v.textContent=Xg(v.textContent||"",i,l,s,{scopeRootSelectors:!0})),document.head.appendChild(v),e.injectedStyles.push(v);let A=v.textContent||"";u.push({element:v,authored:A,applied:A})}})(t.styleSources);let f=b=>{let y=b.getAttribute("type")?.trim()??"",v=b.getAttribute("src")?.trim()??"";if(v){let E=h0(v,e.compositionUrl);return e.compositionUrl&&g0(E,e.compositionUrl)?null:{kind:"external",src:E,type:y}}let A=b.textContent?.trim()??"";return A?{kind:"inline",content:A,type:y,scopeCompositionId:o}:null},m=t.scriptSources.map(f).filter(b=>b!==null);if(n){let b=n.getAttribute("data-width"),y=n.getAttribute("data-height"),v=e.parseDimensionPx(b),A=e.parseDimensionPx(y);b&&e.host.setAttribute("data-width",b),y&&e.host.setAttribute("data-height",y),v&&ye(e.host)&&(e.host.style.width=v),A&&ye(e.host)&&(e.host.style.height=A),n.hasAttribute("data-timeline-locked")&&e.host.setAttribute("data-timeline-locked","");let E=NC(n);!e.authoredCompositionId&&i&&E.setAttribute("data-composition-id",i),Uu(E),e.host.appendChild(E)}else if(e.hasTemplate){let b=document.importNode(r,!0);Uu(b),e.host.appendChild(b)}else e.host.innerHTML=e.fallbackBodyInnerHtml,Uu(e.host);a&&PC(e,r,a);let p=Array.from(e.host.childNodes),g=()=>e.host.isConnected&&(p.length>0||e.host.childNodes.length===0)&&p.every(b=>b.parentNode===e.host);return{host:e.host,namespace:a||i||"",styles:u,isCurrent:g,runScripts:async()=>{if(m.length>0&&await Bu(),!!g())for(let b of m){let y=document.createElement("script");if(b.type&&(y.type=b.type),y.async=!1,b.kind==="external")y.src=b.src;else if(b.type.toLowerCase()==="importmap"){let v=e0(b.content,A=>h0(A,e.compositionUrl));y.textContent=v?JSON.stringify(v):b.content}else if(b.type.toLowerCase()==="module"){let v=b.scopeCompositionId?Qg(a||b.scopeCompositionId,e.compositionUrl?.href):"";y.textContent=v+b.content}else b.scopeCompositionId?y.textContent=Du(b.content,b.scopeCompositionId,"[HyperFrames] composition script error:",l,a||b.scopeCompositionId,s,e.compositionUrl?.href):y.textContent=`(function(){${b.content}})();`;if(document.body.appendChild(y),e.injectedScripts.push(y),b.kind==="external"){let v=await LC(y);v.status!=="load"&&e.onDiagnostic?.({code:"external_composition_script_load_issue",details:{hostCompositionId:e.authoredCompositionId,runtimeCompositionId:e.runtimeCompositionId,hostCompositionSrc:e.hostCompositionSrc,resolvedScriptSrc:b.src,loadStatus:v.status,elapsedMs:v.elapsedMs}})}}}}}async function y0(e,t){let n=Na();if($u(),n.length===0)return[];let r=A0(n,t),i=n.filter(a=>{if(t.has(a)||a.hasAttribute("data-composition-src")||a.children.length>0)return!1;let s=r.get(a)?.authoredCompositionId;return s?!!document.querySelector(`template#${CSS.escape(s)}-template`):!1}),o=[];for(let a of i){let s=r.get(a),l=s?.authoredCompositionId;if(!l)continue;let u=document.querySelector(`template#${CSS.escape(l)}-template`);Wu(a);let d=await w0({host:a,authoredCompositionId:l,runtimeCompositionId:s?.runtimeCompositionId||l,hostCompositionSrc:`template#${l}-template`,sourceNode:u.content,hasTemplate:!0,fallbackBodyInnerHtml:"",compositionUrl:null,injectedStyles:e.injectedStyles,injectedScripts:e.injectedScripts,injectedLinks:e.injectedLinks,parseDimensionPx:e.parseDimensionPx,onDiagnostic:e.onDiagnostic});o.push(d)}return o}async function DC(e){let t=Na();if($u(),t.length===0)return[];let n=A0(t,new Set),r=t.filter(o=>o.hasAttribute("data-composition-src"));return(await Promise.all(r.map(async o=>{let a=o.getAttribute("data-composition-src");if(!a)return null;let s=n.get(o),l=s?.authoredCompositionId||null,u=s?.runtimeCompositionId||l||null,d=null;try{d=new URL(a,document.baseURI)}catch{d=null}Wu(o);let f=p=>{e.onDiagnostic?.({code:"external_composition_load_failed",details:{hostCompositionId:l,runtimeCompositionId:u,hostCompositionSrc:a,errorMessage:p instanceof Error?p.message:"unknown_error"}}),Wu(o)},m=async p=>{let g=await w0(p),b=g.runScripts;return g.runScripts=async()=>{try{await b()}catch(y){f(y)}},g};try{let p=l!=null?document.querySelector(`template#${CSS.escape(l)}-template`):null;if(p)return await m({host:o,authoredCompositionId:l,runtimeCompositionId:u,hostCompositionSrc:a,sourceNode:p.content,hasTemplate:!0,fallbackBodyInnerHtml:"",compositionUrl:d,injectedStyles:e.injectedStyles,injectedScripts:e.injectedScripts,injectedLinks:e.injectedLinks,parseDimensionPx:e.parseDimensionPx,onDiagnostic:e.onDiagnostic});let g=await fetch(a);if(!g.ok)throw new Error(`HTTP ${g.status}`);let b=await g.text(),v=new DOMParser().parseFromString(b,"text/html");v0(v,d);let A=(l?v.querySelector(`template#${CSS.escape(l)}-template`):null)??v.querySelector("template"),E=A?A.content:v.body;return await m({host:o,authoredCompositionId:l,runtimeCompositionId:u,hostCompositionSrc:a,sourceNode:E,hasTemplate:!!A,fallbackBodyInnerHtml:v.body.innerHTML,compositionUrl:d,injectedStyles:e.injectedStyles,injectedScripts:e.injectedScripts,injectedLinks:e.injectedLinks,parseDimensionPx:e.parseDimensionPx,head:v.head,declaredVariableDefaults:jr(v.documentElement),variableDeclarer:v.documentElement,onDiagnostic:e.onDiagnostic})}catch(p){return f(p),null}}))).filter(o=>o!==null)}async function _0(e){let t=new Set,n={host:document.documentElement,namespace:"",referenceTarget:"document",styles:[...document.querySelectorAll("style")].map(f=>({element:f,authored:f.textContent??"",applied:f.textContent??""}))},r=await DC(e),i=await y0(e,new Set(r.map(({host:f})=>f))),o=[...r,...i];Vu([...o,n],t),await Promise.all(r.map(f=>f.runScripts()));let a=i.filter(f=>{if(f.isCurrent())return!0;for(let m of f.styles)m.element.remove();return window.__hfVariablesByComp&&delete window.__hfVariablesByComp[f.namespace],!1}),s=[...r.filter(f=>f.host.isConnected),...a],l=await y0(e,new Set(s.map(({host:f})=>f)));l.length&&Vu([...s,...l,n],t);let u=new Map([...a,...l].map(f=>[f.host,f]));for(let f of Na()){let m=u.get(f);m&&await m.runScripts()}let d=[...s,...l].filter(f=>f.host.isConnected);Vu([...d,n],t)}function Vu(e,t){for(let{styles:r}of e)for(let i of r){let o=i.element.textContent??"";o!==i.applied&&(i.authored=o,i.applied=o)}d0(document,e.map(({host:r,namespace:i,styles:o,referenceTarget:a})=>({root:r,namespace:i,referenceTarget:a,exclude:e.filter(s=>s.host!==r&&r.contains(s.host)).map(s=>s.host),cssTexts:o.map(s=>s.authored)})),t).forEach((r,i)=>{let o=yn(e[i].host,ut);if(!(r.size===0&&o.length===0))for(let a of e[i].styles){let s=m0(a.authored,r,o);s!==a.applied&&(a.element.textContent=s),a.applied=s}}),In()}function PC(e,t,n){let i={...e.declaredVariableDefaults??(Me(t)?jr(t):{}),...mf(e.host)};tl(e.variableDeclarer??(Me(t)?t:null),i,n),cf(e.host),Object.keys(i).length>0?(window.__hfVariablesByComp||(window.__hfVariablesByComp={}),window.__hfVariablesByComp[n]=i,nl(e.host,{...uf(e.host,i,window),...Po()})):window.__hfVariablesByComp&&delete window.__hfVariablesByComp[n]}function OC(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function HC(e){if(!Array.isArray(e))throw new Error("expected a JSON array");if(!e.every(OC))throw new Error("every array entry must be an object");return e}function GC(e){let n=e.vars.data?.captionState;return n==="dim"||n==="active"?n:void 0}function BC(e){return ye(e)?e.dataset.captionWrapper!=="true"?e:e.querySelector(":scope > span")??null:null}function UC(){let e=[],t=document.querySelectorAll(".caption-group");for(let n of t)for(let r of n.children){if(!ye(r))continue;let i=r.dataset.captionWrapper==="true"?r.querySelector(":scope > span"):r.tagName==="SPAN"?r:null;i&&e.push(i)}return e}function VC(e){let t=e.parentElement;if(t?.dataset.captionWrapper==="true")return t;let n=document.createElement("span");return n.style.display="inline-block",n.dataset.captionWrapper="true",e.parentNode?.insertBefore(n,e),n.appendChild(e),n}var zu=()=>window.gsap,R0=()=>fetch("caption-overrides.json").then(e=>e.ok?e.json():null),T0=e=>e===null?[]:HC(e);function k0(e){let t=e instanceof Error?e.message:String(e);console.error(`[HyperFrames] Invalid caption-overrides.json: ${t}`)}function M0(){return zu()?R0().then(T0).catch(e=>(k0(e),[])):Promise.resolve([])}function ju(e,t){return!zu()||document.querySelectorAll(".caption-group").length===0?Promise.resolve():R0().then(n=>Ku(T0(n),e,t)).catch(k0)}function WC(e,t){return(e.wordId?BC(document.getElementById(e.wordId)):null)??(e.wordIndex!==void 0?t[e.wordIndex]??null:null)}function C0(e,t){return Object.fromEntries(t.filter(n=>e[n]!==void 0).map(n=>[n,e[n]]))}function qu(e,t){let n=e.style.color;e.style.color=t;let r=getComputedStyle(e).color;return e.style.color=n,r}function $C(e,t){let n=t[0]?.vars.startAt;return qu(e,n?.color===void 0?"":String(n.color))}function qC(e,t,n,r){let i=GC(e);if(i)return i;let o=String(e.vars.color);return/var\\(|currentcolor/i.test(o)?qu(t,o)===n?"dim":"active":(r.has(o)||r.set(o,qu(t,o)),r.get(o)===n?"dim":"active")}function zC(e,t,n){if(e.dimColor)return e.dimColor;if(!(t.length===0||t.some(r=>r.vars.runBackwards)))return n}function jC(e,t,n,r){let i=e.getTweensOf(t).filter(s=>s.vars.color!==void 0).sort((s,l)=>s.startTime()-l.startTime()),o=$C(t,i);for(let s of i){let u=qC(s,t,o,r)==="dim"?n.dimColor:n.activeColor;u&&(s.vars.color=u),s.vars.runBackwards||s.invalidate?.()}let a=zC(n,i,o);a&&e.set(t,{color:a})}function KC(e,t,n,r){let i=C0(n,["x","y","scale","rotation"]),o=C0(n,["opacity","fontWeight","fontFamily"]);if(n.fontSize!==void 0&&(o.fontSize=`${n.fontSize}px`),(n.activeColor||n.dimColor)&&jC(e,t,n,r),Object.keys(o).length>0&&e.set(t,o),Object.keys(i).length>0){let a=VC(t);e.set(a,i)}}function Ku(e,t,n=()=>{}){let r=zu();if(!r||e.length===0)return;n();let i=UC(),o=new Map;for(let a of e){let s=WC(a,i);!s||t&&!t.some(l=>l.contains(s))||KC(r,s,a,o)}}var Xu="data-hf-edit-base-x",Ju="data-hf-edit-base-y",nn="data-hf-edit-original-translate",Fa=e=>{let t=parseFloat(e??"");return Number.isFinite(t)?t:0},YC=e=>{let t=[],n=0,r="";for(let i of e.trim())i==="("&&(n+=1),i===")"&&(n=Math.max(0,n-1)),/\\s/.test(i)&&n===0?(r&&t.push(r),r=""):r+=i;return r&&t.push(r),t},L0=/^-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)px$/,Yu=(e,t)=>L0.test(e)&&L0.test(t)?`${parseFloat(e)+parseFloat(t)}px`:`calc(${e} + ${t})`,XC=(e,t,n)=>{if(!e||e==="none")return`${t} ${n}`;let[r,i,o]=YC(e);if(r===void 0)return`${t} ${n}`;if(i===void 0)return`${Yu(r,t)} ${n}`;let a=o===void 0?"":` ${o}`;return`${Yu(r,t)} ${Yu(i,n)}${a}`},JC=e=>{try{e.ownerDocument.defaultView?.gsap?.getProperty?.(e,"x")}catch{}},QC=e=>{let t=e.style.getPropertyValue("translate").trim();if(t)return t==="none"?"":t;try{let n=e.ownerDocument.defaultView,r=n?n.getComputedStyle(e).getPropertyValue("translate").trim():"";return r==="none"?"":r}catch{return""}},Ia=new WeakMap;function P0(e){Ia.delete(e)}function ZC(e,t){let n=Ia.get(e);if(!t?.force&&n!==void 0&&e.style.getPropertyValue("translate")!==n){tt("position_edit_fold_skipped",{hfId:e.getAttribute("data-hf-id")});return}let r=Fa(e.getAttribute("data-x"))-Fa(e.getAttribute(Xu)),i=Fa(e.getAttribute("data-y"))-Fa(e.getAttribute(Ju));e.hasAttribute(nn)||e.setAttribute(nn,QC(e)),n===void 0&&JC(e);let o=e.getAttribute(nn)??"",a=XC(o,`${r}px`,`${i}px`);e.style.setProperty("translate",a),Ia.set(e,e.style.getPropertyValue("translate"))}function Fi(e,t){let n=e.querySelectorAll(`[${nn}]:not([${Xu}]):not([${Ju}])`);for(let o=0;o<n.length;o++){let a=n[o];if(a===void 0||!Ks(a))continue;let s=a.getAttribute(nn)??"";s===""?a.style.removeProperty("translate"):a.style.setProperty("translate",s),a.removeAttribute(nn),Ia.delete(a)}let r=e.querySelectorAll(`[${Xu}], [${Ju}]`),i=0;for(let o=0;o<r.length;o++){let a=r[o];a===void 0||!Ks(a)||(ZC(a,t),i+=1)}return i}var N0="__hfPositionEditsSeekReapplyWrapped",F0=new WeakSet,I0=new WeakMap,D0=new WeakMap;function O0(e){let t=e,n=()=>{try{Fi(t.document)}catch{}},r=f=>typeof f=="function"&&(F0.has(f)||!!f[N0]),i=f=>{F0.add(f);try{Object.defineProperty(f,N0,{value:!0})}catch{}},o=f=>{if(typeof f!="function"||r(f))return f;let m=function(...p){let g=f.apply(this,p);return n(),g};return i(m),m},a=(f,m)=>{let p=I0.get(f);if(p?.has(m))return!0;let g=Object.getOwnPropertyDescriptor(f,m);if(g?.configurable===!1){let v=f[m];return typeof v=="function"&&(f[m]=o(v),n()),!1}let b=f[m],y=g?.set;return Object.defineProperty(f,m,{configurable:!0,enumerable:g?.enumerable??!0,get:()=>b,set:v=>{b=o(v),y?.call(f,v)}}),b=o(b),p??(p=new Set),p.add(m),I0.set(f,p),n(),!0},s=(f,m)=>{let p=D0.get(t),g=Object.getOwnPropertyDescriptor(t,f);if(!p?.has(f)){if(g?.configurable===!1){let v=t[f];return v?a(v,m):!1}let y=t[f];Object.defineProperty(t,f,{configurable:!0,enumerable:g?.enumerable??!0,get:()=>y,set:v=>{y=v,y&&a(y,m)}}),p??(p=new Set),p.add(f),D0.set(t,p)}let b=t[f];return b?a(b,m):!1},l=()=>{let f=s("__hf","seek"),m=s("__player","renderSeek");return f&&m};if(l())return;let u=120,d=t.setInterval(()=>{if(l()){t.clearInterval(d);return}u-=1,u<=0&&t.clearInterval(d)},50)}function Da(e){return e.closest("[data-composition-id][data-composition-file], [data-composition-id][data-composition-src]")??e.closest("[data-composition-id]")}function Ii(e){let t=window,r=Da(e)?.getAttribute("data-composition-id")?.trim()??"",i=r?t.__hfVariablesByComp?.[r]:void 0;if(i)return i;let o=t.__hyperframes?.getVariables?.();return o&&typeof o=="object"?o:t.__hfVariables??{}}function Pa(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function Qu(e){let t=e.replace(/[\\u0000-\\u0020]/g,""),n=/^([a-z][a-z0-9+.-]*):/i.exec(t);if(!n)return!0;let r=n[1]?.toLowerCase();return r?r==="https"||r==="http"||r==="blob"?!0:r==="data"?/^data:image\\//i.test(t):!1:!1}function e1(e){let t=e.startsWith("/")?e.slice(1).split("/").map(n=>n.replace(/~1/g,"/").replace(/~0/g,"~")):[e];if(t.some(n=>!n||["__proto__","prototype","constructor"].includes(n)))throw new Error("Invalid text variable binding");return t}function t1(e,t){let[n,...r]=e1(e);if(!n||!Object.hasOwn(t,n))return null;if(!r.length)return{id:n,parent:t,key:n,data:void 0};let i=t[n];if(typeof i!="string")return null;let o=JSON.parse(i),a=o;for(let l of r.slice(0,-1)){if(a===null||typeof a!="object"||!Object.hasOwn(a,l))return null;a=a[l]}let s=r.at(-1);return a===null||typeof a!="object"||!Object.hasOwn(a,s)?null:{id:n,parent:a,key:s,data:o}}function Zu(e,t){try{let n=t1(e,t);return n?.parent[n.key]}catch{return}}var H0=new Set(["img","video","audio","source"]);function n1(e){if(typeof e=="string"&&e.length>0)return e;if(e!==null&&typeof e=="object"){let t=e.url;if(typeof t=="string"&&t.length>0)return t}return null}function r1(e){return e.replace(/[;{}<>\\r\\n]/g,"")}function i1(e){if(Pa(e))return String(e);if(e!==null&&typeof e=="object"){let t=e.name;if(typeof t=="string"&&t.length>0)return t}return null}function tc(e,t){let n=Da(e),r=t.get(n);if(r)return r;let i=Ii(e);return t.set(n,i),i}function o1(e,t){if(e.childElementCount===0){e.textContent=t;return}let n=!1;for(let r of Array.from(e.childNodes))r.nodeType===Node.TEXT_NODE&&(r.nodeValue=n?"":t,n=!0);n||e.insertBefore(e.ownerDocument.createTextNode(t),e.firstChild)}function G0(e,t){let n=Intl.Segmenter;return n?Array.from(new n(void 0,{granularity:t}).segment(e),r=>r.segment):Array.from(e)}function a1(e,t){if(e.textContent===t)return;let n=e.querySelector("[data-ipw-motion-char]")!==null,r=e.ownerDocument.createDocumentFragment();for(let i of G0(t,"word")){if(/^\\s+$/u.test(i)){r.append(e.ownerDocument.createTextNode(i));continue}let o=e.ownerDocument.createElement("span");if(o.setAttribute("data-ipw-motion-word",""),o.setAttribute("style","display:inline-block;white-space:pre;font-weight:700;line-height:1.1;letter-spacing:-0.025em"),n)for(let a of G0(i,"grapheme")){let s=e.ownerDocument.createElement("span");s.setAttribute("data-ipw-motion-char",""),s.setAttribute("style","display:inline-block"),s.textContent=a,o.append(s)}else o.textContent=i;r.append(o)}e.replaceChildren(r)}function s1(e,t){let n=e.getAttribute("data-ipw-motion-source");if(n!==null)try{if(JSON.parse(n)===t)return}catch{}e.replaceChildren(e.ownerDocument.createTextNode(t))}function l1(e,t){e.getAttribute("data-ipw-motion-structure")==="v1"?s1(e,t):e.getAttribute("data-ipw-motion-split")==="v1"?a1(e,t):o1(e,t)}function u1(e){return e.querySelector("[data-hf-root]")??e.getElementById("stage")??e.body?.firstElementChild??e.body}function c1(e,t){for(let n of new Set(e)){let r=tc(n,t);for(let[i,o]of Object.entries(r)){let a=i1(o);a!==null&&ye(n)&&n.style.setProperty(`--${i}`,r1(a))}}}function B0(e,t,n=!0){let r=e.getAttribute("data-var-src")?.trim();if(!r)return null;if(!H0.has(e.tagName.toLowerCase()))return n&&console.warn(`[hyperframes] Ignoring data-var-src on <${e.tagName.toLowerCase()}>: variable-bound src is only allowed on ${Array.from(H0).join("/")}.`),null;let i=n1(tc(e,t)[r]);return i===null?null:Qu(i)?i:(n&&console.warn(`[hyperframes] Ignoring data-var-src="${r}": unsafe URL protocol.`),null)}function U0(e){return B0(e,new Map,!1)??ri(e)}function mr(e,t){let n=new Map,r=o=>t?[...t.matches(o)?[t]:[],...t.querySelectorAll(o)]:Array.from(e.querySelectorAll(o)),i=t?null:u1(e);c1([...i?[i]:[],...r("[data-composition-id]")],n);for(let o of r("[data-var-src]")){let a=B0(o,n);a!==null&&ri(o)!==a&&o.setAttribute("src",a)}for(let o of r("[data-var-text]")){let a=o.getAttribute("data-var-text")?.trim();if(!a)continue;let s=Zu(a,tc(o,n));Pa(s)&&l1(o,String(s))}}var ec=new WeakMap;function V0(e,t){let n=ec.get(e)??new Set;return n.add(t),ec.set(e,n),()=>n.delete(t)}function W0(e,t){let n=Da(e)??e,r=[e,...Array.from(e.querySelectorAll("[data-var-text], [data-var-src]"))],i=ec.get(e),o=new Set(r.flatMap(m=>[m.getAttribute("data-var-text"),m.getAttribute("data-var-src")]).filter(m=>!!m).map(m=>m.startsWith("/")?m.split("/")[1]?.replace(/~1/g,"/").replace(/~0/g,"~"):m));if(!i?.size&&Object.keys(t).some(m=>!o.has(m)))return!1;let a=Ii(e),s={...a,...t},l=e.ownerDocument.defaultView??window,u=n.getAttribute("data-composition-id");if(!u)return!1;let d=l.__hfVariablesByComp??(l.__hfVariablesByComp={}),f=d[u];d[u]=s;try{for(let m of i??[])m(s);mr(e.ownerDocument,e)}catch(m){f?d[u]=f:delete d[u];for(let p of i??[])p(a);throw mr(e.ownerDocument,e),m}return!0}var Ot=new Map,d1="data-hf-color-grading-canvas",m1="__hf_color_grading_canvas__";function eb(){if(typeof MutationObserver>"u"||typeof document>"u")return;let e=document.documentElement;if(!e)return;let t=r=>{ye(r)&&(r.hasAttribute(En)||r.setAttribute(En,r.style.opacity))},n=r=>{if(Me(r)){r.matches("video, img")&&t(r);for(let i of r.querySelectorAll("video, img"))t(i)}};n(e),new MutationObserver(r=>{for(let i of r)for(let o of i.addedNodes)n(o)}).observe(e,{childList:!0,subtree:!0})}var f1=16,p1=4,pr={enabled:!1,position:.5,softness:0,lineWidth:2},nc=["#000000","#ffffff"],h1=["#1a1a1a","#f5f5dc"],Bi=3,g1=Bi-1,b1=5,rc=`${vt}.0`,$0=`${vt-1}.0`,y1=`${Bi}.0`,x1=`${(g1+.5)/Bi}`;function Oa(e){let t=e.getAttribute(si);return t==null?null:qp(t,Ii(e))}var S1=["attribute vec2 a_pos;","varying vec2 v_uv;","void main(){","  v_uv = a_pos * 0.5 + 0.5;","  gl_Position = vec4(a_pos, 0.0, 1.0);","}"].join(`\n`),v1=["#ifdef GL_FRAGMENT_PRECISION_HIGH","precision highp float;","#else","precision mediump float;","#endif","varying vec2 v_uv;","uniform sampler2D u_source;","uniform sampler2D u_blurSource;","uniform sampler2D u_bloomSource;","uniform sampler2D u_kuwaharaSource;","uniform sampler2D u_lut;","uniform sampler2D u_advanced;","uniform vec2 u_resolution;","uniform vec2 u_uvScale;","uniform vec2 u_uvOffset;","uniform float u_blurReady;","uniform float u_bloomReady;","uniform float u_kuwaharaReady;","uniform float u_lutEnabled;","uniform float u_lutSize;","uniform vec2 u_lutTextureSize;","uniform vec3 u_lutDomainMin;","uniform vec3 u_lutDomainMax;","uniform float u_lutIntensity;","uniform vec3 u_shadowWheel;","uniform vec3 u_midtoneWheel;","uniform vec3 u_highlightWheel;","uniform float u_rgbCurvesEnabled;","uniform float u_hueCurvesEnabled;","uniform float u_secondaryCount;","uniform float u_exposure;","uniform float u_contrast;","uniform float u_highlights;","uniform float u_shadows;","uniform float u_whites;","uniform float u_blacks;","uniform float u_temperature;","uniform float u_tint;","uniform float u_vibrance;","uniform float u_saturation;","uniform float u_vignette;","uniform float u_vignetteMidpoint;","uniform float u_vignetteRoundness;","uniform float u_vignetteFeather;","uniform float u_grain;","uniform float u_grainSize;","uniform float u_grainRoughness;","uniform float u_grainSeed;","uniform float u_effectTime;","uniform float u_blur;","uniform float u_bloom;","uniform float u_kuwahara;","uniform float u_pixelate;","uniform float u_chromaBleed;","uniform float u_tapeDamage;","uniform float u_tapeTracking;","uniform float u_tapeNoise;","uniform float u_tapeSpeed;","uniform float u_filmArtifacts;","uniform float u_halftone;","uniform float u_halftoneSize;","uniform float u_twoInkPrint;","uniform float u_twoInkPrintSize;","uniform float u_ascii;","uniform float u_asciiSize;","uniform float u_asciiInvert;","uniform float u_asciiStyle;","uniform float u_asciiColor;","uniform float u_asciiRotation;","uniform float u_dither;","uniform float u_ditherSize;","uniform float u_monoScreen;","uniform float u_monoScreenSize;","uniform float u_monoScreenAngle;","uniform float u_monoScreenSpread;","uniform float u_monoScreenShape;","uniform float u_monoScreenInvert;","uniform float u_scanlines;","uniform float u_scanlineCount;","uniform float u_scanlineSoftness;","uniform float u_chromaticAberration;","uniform float u_chromaticAngle;","uniform float u_crtCurvature;","uniform float u_digitalGlitch;","uniform float u_digitalGlitchColorSplit;","uniform float u_digitalGlitchLineTear;","uniform float u_digitalGlitchPixelate;","uniform float u_digitalGlitchBlockAmount;","uniform float u_digitalGlitchBlockDisplacement;","uniform float u_digitalGlitchBlockOpacity;","uniform float u_digitalGlitchSpeed;","uniform float u_engraving;","uniform float u_engravingSpacing;","uniform float u_engravingMinThickness;","uniform float u_engravingMaxThickness;","uniform float u_engravingAngle;","uniform float u_engravingContrast;","uniform float u_engravingSharpness;","uniform float u_engravingWave;","uniform float u_engravingWaveFrequency;","uniform float u_crosshatch;","uniform float u_crosshatchSpacing;","uniform float u_crosshatchThickness;","uniform float u_crosshatchAngle;","uniform float u_crosshatchContrast;","uniform float u_crosshatchEdges;","uniform float u_crosshatchLineWeight;","uniform float u_crosshatchWave;","uniform float u_crosshatchWaveFrequency;","uniform float u_paletteSize;","uniform vec3 u_palette0;","uniform vec3 u_palette1;","uniform vec3 u_palette2;","uniform vec3 u_palette3;","uniform vec3 u_palette4;","uniform vec3 u_palette5;","uniform float u_intensity;","uniform float u_compareEnabled;","uniform float u_comparePosition;","uniform float u_compareSoftness;","uniform float u_compareLineWidth;","const float PI = 3.14159265359;","float lumaOf(vec3 c){ return dot(c, vec3(0.2126, 0.7152, 0.0722)); }","float bt601Luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }","float grainHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }","float digitalHash(vec2 p){","  vec2 q = mod(floor(p), 251.0);","  float x = mod(q.x * q.x * 157.0 + q.x * 89.0, 251.0);","  float y = mod(q.y * q.y * 113.0 + q.y * 47.0, 251.0);","  float xy = mod(q.x * q.y * 71.0, 251.0);","  return mod(x + y + xy + 19.0, 251.0) / 251.0;","}","float colorSaturation(vec3 c){ return max(max(c.r, c.g), c.b) - min(min(c.r, c.g), c.b); }","vec2 clampUv(vec2 uv){ return clamp(uv, vec2(0.0), vec2(1.0)); }","vec2 applyCrtWarp(vec2 uv){","  vec2 centered = uv * 2.0 - 1.0;","  float curvature = clamp(u_crtCurvature, 0.0, 1.0) * 0.5;","  float dist = dot(centered, centered);","  centered *= 1.0 + curvature * dist;","  return centered * 0.5 + 0.5;","}","vec4 sampleSource(vec2 uv){ return texture2D(u_source, clampUv(uv)); }","vec4 sampleBlur(vec2 uv){ return texture2D(u_blurSource, clampUv(uv)); }","vec3 sampleBloom(vec2 uv){ return texture2D(u_bloomSource, clampUv(uv)).rgb; }","vec3 sampleKuwahara(vec2 uv){","  vec2 displayUv = uv * u_uvScale + u_uvOffset;","  return texture2D(u_kuwaharaSource, clampUv(displayUv)).rgb;","}","vec4 samplePrepared(vec2 uv){","  vec4 base = sampleSource(uv);","  float blur = clamp(u_blur, 0.0, 1.0);","  if (blur > 0.0 && u_blurReady > 0.5) base = mix(base, sampleBlur(uv), blur);","  float kuwahara = clamp(u_kuwahara, 0.0, 1.0);","  if (kuwahara > 0.0 && u_kuwaharaReady > 0.5) {","    base.rgb = mix(base.rgb, sampleKuwahara(uv), kuwahara);","  }","  return base;","}","float tapeTrackingBand(float y, float center, float width){","  float offset = fract(y - center + 0.5) - 0.5;","  float triangle = max(0.0, 1.0 - abs(offset) / max(width, 0.0001));","  return triangle * triangle * (3.0 - 2.0 * triangle);","}","vec4 sampleMedia(vec2 uv){","  float pixel = clamp(u_pixelate, 0.0, 1.0);","  vec2 sampleUv = uv;","  if (pixel > 0.0) {","    float blockSize = mix(1.0, 48.0, pixel);","    vec2 cells = max(u_resolution / blockSize, vec2(1.0));","    sampleUv = (floor(clamp(uv, vec2(0.0), vec2(0.999999)) * cells) + 0.5) / cells;","  }","  float tapeDamage = clamp(u_tapeDamage, 0.0, 1.0);","  float tapeTracking = clamp(u_tapeTracking, 0.0, 1.0);","  float tapeNoise = clamp(u_tapeNoise, 0.0, 1.0);","  float tapeTime = u_effectTime * mix(0.0, 2.0, clamp(u_tapeSpeed, 0.0, 1.0));","  float tapeFrame = floor(tapeTime * 60.0);","  float tapeLine = floor(sampleUv.y * u_resolution.y * 0.5);","  float lineJitter = (digitalHash(vec2(tapeLine, floor(tapeFrame * 0.5))) - 0.5) * 1.8 * tapeNoise;","  float slowWobble = sin(sampleUv.y * 32.0 + tapeTime * 2.6) * 0.55;","  float headSwitch = smoothstep(0.88, 1.0, sampleUv.y) * sin(sampleUv.y * 240.0 + tapeTime * 8.0) * 4.0;","  float trackingShift = tapeTrackingBand(sampleUv.y, fract(0.08 + tapeTime * 0.083), 0.035);","  trackingShift -= tapeTrackingBand(sampleUv.y, fract(0.28 + tapeTime * 0.061), 0.03) * 0.8;","  trackingShift += tapeTrackingBand(sampleUv.y, fract(0.5 + tapeTime * 0.047), 0.04) * 0.75;","  trackingShift -= tapeTrackingBand(sampleUv.y, fract(0.72 + tapeTime * 0.037), 0.028) * 0.65;","  trackingShift += tapeTrackingBand(sampleUv.y, fract(0.89 + tapeTime * 0.029), 0.032) * 0.55;","  trackingShift *= tapeTracking * 48.0;","  float tapeShift = (lineJitter + slowWobble + headSwitch + trackingShift) * tapeDamage;","  float texelX = 1.0 / max(u_resolution.x * max(u_uvScale.x, 0.00001), 1.0);","  vec2 tapeUv = sampleUv + vec2(tapeShift * texelX, 0.0);","  vec4 base = samplePrepared(tapeUv);","  if (tapeDamage > 0.0) {","    vec2 lumaStep = vec2(texelX * mix(1.0, 3.5, tapeDamage), 0.0);","    vec3 leftTape = samplePrepared(tapeUv - lumaStep).rgb;","    vec3 rightTape = samplePrepared(tapeUv + lumaStep).rgb;","    float tapeLuma = (bt601Luma(leftTape) + bt601Luma(base.rgb) * 2.0 + bt601Luma(rightTape)) * 0.25;","    vec3 centerChroma = base.rgb - vec3(bt601Luma(base.rgb));","    vec3 tapeColor = vec3(tapeLuma) + centerChroma;","    vec3 ghost = samplePrepared(tapeUv - vec2(texelX * 12.0, 0.0)).rgb;","    tapeColor = mix(tapeColor, ghost, 0.045 * tapeDamage);","    float fineNoise = digitalHash(floor(gl_FragCoord.xy) + vec2(tapeFrame * 17.0, tapeFrame * 3.0)) - 0.5;","    float band = digitalHash(vec2(floor(sampleUv.y * 92.0), floor(tapeFrame / 3.0)));","    float dropout = smoothstep(0.985, 1.0, band) * (digitalHash(vec2(floor(sampleUv.x * 18.0), tapeLine)) - 0.5);","    tapeColor += (fineNoise * 0.035 + dropout * 0.12) * tapeDamage * tapeNoise;","    base.rgb = mix(base.rgb, clamp(tapeColor, 0.0, 1.0), tapeDamage);","  }","  float chromaBleed = clamp(u_chromaBleed, 0.0, 1.0);","  if (chromaBleed > 0.0) {","    float radius = mix(1.0, 4.0, chromaBleed);","    vec2 stepUv = vec2(texelX * radius, 0.0);","    vec3 c0 = base.rgb;","    vec3 c1 = samplePrepared(tapeUv - stepUv).rgb;","    vec3 c2 = samplePrepared(tapeUv + stepUv).rgb;","    vec3 c3 = samplePrepared(tapeUv - stepUv * 2.0).rgb;","    vec3 c4 = samplePrepared(tapeUv + stepUv * 2.0).rgb;","    float centerLuma = lumaOf(base.rgb);","    vec3 blurredChroma = ((c0 - vec3(lumaOf(c0))) * 6.0 + (c1 - vec3(lumaOf(c1))) * 4.0 + (c2 - vec3(lumaOf(c2))) * 4.0 + (c3 - vec3(lumaOf(c3))) + (c4 - vec3(lumaOf(c4)))) / 16.0;","    base.rgb = mix(base.rgb, clamp(vec3(centerLuma) + blurredChroma, 0.0, 1.0), chromaBleed);","  }","  return base;","}","vec4 sampleChromaticMedia(vec2 uv, vec4 center){","  float amount = clamp(u_chromaticAberration, 0.0, 1.0);","  if (amount <= 0.0) return center;","  float angle = clamp(u_chromaticAngle, 0.0, 1.0) * PI * 2.0;","  vec2 offset = vec2(cos(angle), sin(angle)) * amount * 0.02;","  vec4 positive = sampleMedia(uv + offset);","  vec4 negative = sampleMedia(uv - offset);","  vec3 split = vec3(positive.r, center.g, negative.b);","  return vec4(split, center.a);","}","vec3 sampleDigitalSplit(vec2 uv, vec2 block, float time, float amount){","  float split = amount * 0.06;","  float direction = digitalHash(block * 0.4 + vec2(floor(time * 3.7), floor(time * 5.3)));","  vec2 axis = direction > 0.66 ? vec2(1.0, 0.0) : direction > 0.33 ? vec2(0.0, 1.0) : vec2(0.7071);","  vec4 center = sampleMedia(uv);","  return vec3(sampleMedia(uv + axis * split).r, center.g, sampleMedia(uv - axis * split).b);","}","vec3 applyDigitalGlitch(vec2 uv, vec3 source){","  float amount = clamp(u_digitalGlitch, 0.0, 1.0);","  if (amount <= 0.0) return source;","  float colorSplit = clamp(u_digitalGlitchColorSplit, 0.0, 1.0) * 2.0;","  float lineTear = clamp(u_digitalGlitchLineTear, 0.0, 1.0) * 2.0;","  float pixelate = clamp(u_digitalGlitchPixelate, 0.0, 1.0) * 2.0;","  float blockAmount = clamp(u_digitalGlitchBlockAmount, 0.0, 1.0);","  float blockDisplacement = clamp(u_digitalGlitchBlockDisplacement, 0.0, 1.0) * 2.0;","  float blockOpacity = clamp(u_digitalGlitchBlockOpacity, 0.0, 1.0);","  float speed = clamp(u_digitalGlitchSpeed, 0.0, 1.0) * 2.0;","  float time = u_effectTime * speed;","  float blockCount = 8.0 + blockAmount * 60.0;","  vec2 block = floor(uv * blockCount);","  float randomA = digitalHash(block + vec2(floor(time * 7.3), floor(time * 11.1)));","  float randomB = digitalHash(block * 0.7 + vec2(17.3 + floor(time * 6.6), 29.1));","  float randomC = digitalHash(block + vec2(floor(time * 5.7) * 13.0, 41.0));","  float randomD = digitalHash(block * 1.3 + vec2(7.0, floor(time * 3.2) * 7.0));","  vec2 displaced = uv;","  if (blockDisplacement > 0.0 && blockOpacity > 0.0) {","    float threshold = 1.0 - blockDisplacement * 0.4;","    if (randomA > threshold) {","      displaced += vec2((randomB - 0.5) * blockDisplacement * 0.5, (randomC - 0.5) * blockDisplacement * 0.3);","    }","    if (randomD > 0.92 && blockDisplacement > 0.5) {","      displaced.x += (digitalHash(vec2(block.y, floor(time * 8.0))) - 0.5) * blockDisplacement;","    }","    displaced = mix(uv, displaced, blockOpacity);","  }","  if (lineTear > 0.0) {","    float row = floor(uv.y * (50.0 + lineTear * 150.0));","    float tearA = digitalHash(vec2(row * 7.3 + floor(time * 12.0 + row * 0.1) * 3.7, 13.0));","    float tearB = digitalHash(vec2(row * 13.7 + floor(time * 8.3) * 5.1, 31.0));","    if (tearA > 1.0 - lineTear * 0.5) displaced.x += (tearB - 0.5) * lineTear * 0.4;","    if (tearB > 0.95 && lineTear > 0.3) displaced.x += (tearA - 0.5) * lineTear * 0.8;","  }","  if (pixelate > 0.0) {","    float pixelRandom = digitalHash(block * 0.5 + vec2(floor(time * 4.9), 53.0));","    if (pixelRandom > 1.0 - pixelate * 0.35) {","      float cells = 4.0 + (1.0 - pixelRandom) * pixelate * 40.0;","      displaced = (floor(clampUv(displaced) * cells) + 0.5) / cells;","    }","  }","  displaced = clampUv(displaced);","  vec3 glitch = sampleDigitalSplit(displaced, block, time, colorSplit);","  if (blockDisplacement > 0.2 && blockOpacity > 0.0) {","    float corruption = digitalHash(block * 1.1 + vec2(floor(time * 11.9), 67.0));","    vec3 changed = glitch;","    if (corruption > 0.9) changed = 1.0 - glitch;","    else if (corruption > 0.85) changed = corruption > 0.875 ? glitch.gbr : glitch.brg;","    else if (corruption > 0.8) {","      float channel = digitalHash(block + vec2(73.0));","      if (channel > 0.66) changed.r = min(changed.r * 2.0, 1.0);","      else if (channel > 0.33) changed.g = min(changed.g * 2.0, 1.0);","      else changed.b = min(changed.b * 2.0, 1.0);","    }","    glitch = mix(glitch, changed, blockOpacity);","  }","  if (blockOpacity > 0.0) {","    float flash = digitalHash(block * 0.8 + vec2(floor(time * 14.7), 83.0));","    vec3 flashed = flash > 0.97 ? min(glitch * 1.8, vec3(1.0)) : flash > 0.94 ? glitch * 0.3 : glitch;","    glitch = mix(glitch, flashed, blockOpacity * 0.6);","  }","  if (lineTear > 0.1) {","    float interference = pow(sin(uv.y * (300.0 + randomA * 200.0) + time * 30.0) * 0.5 + 0.5, 6.0);","    glitch -= interference * 0.08 * lineTear;","  }","  return mix(source, clamp(glitch, 0.0, 1.0), amount);","}","float dustMask(vec2 uv, float frameBucket){","  vec2 grid = vec2(128.0, 72.0);","  vec2 cell = floor(uv * grid);","  vec2 local = fract(uv * grid) - 0.5;","  float chance = grainHash(cell + frameBucket * 19.13);","  float radius = mix(0.05, 0.34, grainHash(cell + 7.1));","  return step(0.9975, chance) * (1.0 - smoothstep(radius, radius + 0.08, length(local)));","}","float screenDot(vec2 p, float ink, float angle, float sharpness){","  float c = cos(angle);","  float s = sin(angle);","  vec2 q = mat2(c, -s, s, c) * p;","  vec2 d = fract(q) - 0.5;","  float radius = sqrt(clamp(ink, 0.0, 1.0)) * 0.68;","  float edge = mix(0.16, 0.025, sharpness);","  return 1.0 - smoothstep(radius - edge, radius + edge, length(d));","}","vec3 paletteColor(float index);","float monoScreenMask(vec2 local, float radius, float shape, float softness){","  vec2 centered = local - 0.5;","  float distanceToInk = length(centered);","  if (shape > 0.5 && shape < 1.5) distanceToInk = max(abs(centered.x), abs(centered.y));","  if (shape > 1.5 && shape < 2.5) distanceToInk = abs(centered.x) + abs(centered.y);","  if (shape > 2.5 && shape < 3.5) distanceToInk = max(abs(centered.x) * 0.86 + centered.y * 0.5, -centered.y);","  if (shape > 3.5) distanceToInk = abs(centered.y);","  float shapeRadius = shape > 3.5 ? radius * 0.45 : radius;","  return 1.0 - smoothstep(shapeRadius, shapeRadius + softness, distanceToInk);","}","vec3 applyMonoScreen(vec3 source, float amount){","  if (amount <= 0.0) return source;","  float invert = step(0.5, u_monoScreenInvert);","  float coverage = mix(1.0 - lumaOf(source), lumaOf(source), invert);","  coverage = pow(clamp(coverage, 0.0, 1.0), mix(1.7, 0.58, clamp(u_monoScreenSpread, 0.0, 1.0)));","  float scale = max(min(u_resolution.x, u_resolution.y) / 540.0, 0.25);","  float cellPx = mix(4.0, 18.0, clamp(u_monoScreenSize, 0.0, 1.0)) * scale;","  float angle = clamp(u_monoScreenAngle, 0.0, 1.0) * PI * 0.5;","  float cosine = cos(angle);","  float sine = sin(angle);","  vec2 point = mat2(cosine, -sine, sine, cosine) * gl_FragCoord.xy / max(cellPx, 1.0);","  float radius = sqrt(coverage) * 0.68;","  float inkMask = monoScreenMask(fract(point), radius, floor(u_monoScreenShape + 0.5), 0.035);","  vec3 ink = paletteColor(0.0);","  vec3 paper = paletteColor(max(u_paletteSize - 1.0, 1.0));","  return mix(source, mix(paper, ink, inkMask), amount);","}","vec3 applyEngraving(vec3 source, float amount){","  if (amount <= 0.0) return source;","  float spacing = mix(3.0, 20.0, clamp(u_engravingSpacing, 0.0, 1.0));","  float minThickness = mix(0.0, 2.0, clamp(u_engravingMinThickness, 0.0, 1.0));","  float maxThickness = mix(1.0, 8.0, clamp(u_engravingMaxThickness, 0.0, 1.0));","  float angle = clamp(u_engravingAngle, 0.0, 1.0) * PI;","  vec2 alongAxis = vec2(cos(angle), sin(angle));","  vec2 acrossAxis = vec2(-alongAxis.y, alongAxis.x);","  float along = dot(gl_FragCoord.xy, alongAxis);","  float across = dot(gl_FragCoord.xy, acrossAxis);","  float frequency = mix(1.0, 10.0, clamp(u_engravingWaveFrequency, 0.0, 1.0));","  float wave = sin(along * frequency * 0.01);","  across += wave * clamp(u_engravingWave, 0.0, 1.0) * 3.0;","  float lineIndex = floor(across / max(spacing, 1.0));","  float lineDistance = abs(fract(across / max(spacing, 1.0)) - 0.5) * spacing;","  float contrast = mix(0.5, 2.0, clamp(u_engravingContrast, 0.0, 1.0));","  float darkness = 1.0 - pow(clamp(lumaOf(source), 0.0, 1.0), contrast);","  float variation = mix(0.88, 1.12, digitalHash(vec2(lineIndex, 73.0)));","  float thickness = mix(minThickness, maxThickness, darkness) * variation;","  float edge = mix(1.0, 0.3, clamp(u_engravingSharpness, 0.0, 1.0));","  float inkMask = 1.0 - smoothstep(max(thickness * 0.5 - edge, 0.0), thickness * 0.5 + edge, lineDistance);","  inkMask *= smoothstep(0.015, 0.12, darkness);","  vec3 ink = paletteColor(0.0);","  vec3 paper = paletteColor(max(u_paletteSize - 1.0, 1.0));","  return mix(source, mix(paper, ink, inkMask), amount);","}","float crosshatchLine(vec2 pixel, float angle, float spacing, float thickness, float seed){","  vec2 alongAxis = vec2(cos(angle), sin(angle));","  vec2 acrossAxis = vec2(-alongAxis.y, alongAxis.x);","  float along = dot(pixel, alongAxis);","  float across = dot(pixel, acrossAxis);","  float frequency = mix(1.0, 10.0, clamp(u_crosshatchWaveFrequency, 0.0, 1.0));","  across += sin(along * frequency * 0.02 + u_effectTime + seed) * clamp(u_crosshatchWave, 0.0, 1.0) * 5.0;","  float lineIndex = floor(across / max(spacing, 1.0));","  float distanceToLine = abs(fract(across / max(spacing, 1.0)) - 0.5) * spacing;","  float variation = mix(1.0, 0.5 + digitalHash(vec2(lineIndex, seed)), clamp(u_crosshatchLineWeight, 0.0, 1.0));","  float halfWidth = thickness * variation * 0.5;","  return 1.0 - smoothstep(max(halfWidth - 0.5, 0.0), halfWidth + 0.5, distanceToLine);","}","float crosshatchEdge(vec2 uv){","  vec2 texel = 1.0 / max(u_resolution * u_uvScale, vec2(1.0));","  float tl = lumaOf(sampleMedia(uv + texel * vec2(-1.0, -1.0)).rgb);","  float tc = lumaOf(sampleMedia(uv + texel * vec2( 0.0, -1.0)).rgb);","  float tr = lumaOf(sampleMedia(uv + texel * vec2( 1.0, -1.0)).rgb);","  float ml = lumaOf(sampleMedia(uv + texel * vec2(-1.0,  0.0)).rgb);","  float mr = lumaOf(sampleMedia(uv + texel * vec2( 1.0,  0.0)).rgb);","  float bl = lumaOf(sampleMedia(uv + texel * vec2(-1.0,  1.0)).rgb);","  float bc = lumaOf(sampleMedia(uv + texel * vec2( 0.0,  1.0)).rgb);","  float br = lumaOf(sampleMedia(uv + texel * vec2( 1.0,  1.0)).rgb);","  float gx = -tl - 2.0 * ml - bl + tr + 2.0 * mr + br;","  float gy = -tl - 2.0 * tc - tr + bl + 2.0 * bc + br;","  return length(vec2(gx, gy));","}","vec3 applyCrosshatch(vec2 uv, vec3 source, float amount){","  if (amount <= 0.0) return source;","  float spacing = mix(5.0, 30.0, clamp(u_crosshatchSpacing, 0.0, 1.0));","  float thickness = mix(1.0, 5.0, clamp(u_crosshatchThickness, 0.0, 1.0));","  float baseAngle = -clamp(u_crosshatchAngle, 0.0, 1.0) * PI;","  float contrast = mix(0.5, 2.0, clamp(u_crosshatchContrast, 0.0, 1.0));","  float darkness = 1.0 - pow(clamp(lumaOf(source), 0.0, 1.0), contrast);","  vec3 ink = paletteColor(0.0);","  vec3 paper = paletteColor(max(u_paletteSize - 1.0, 1.0));","  vec3 result = paper;","  float layer = crosshatchLine(gl_FragCoord.xy, baseAngle, spacing, thickness, 1.0) * smoothstep(0.2, 0.4, darkness);","  result = mix(result, ink, layer);","  layer = crosshatchLine(gl_FragCoord.xy, baseAngle + PI * 0.5, spacing * 0.95, thickness * 0.9, 2.0) * smoothstep(0.4, 0.6, darkness);","  result = mix(result, ink, layer);","  layer = crosshatchLine(gl_FragCoord.xy, baseAngle + PI * 0.25, spacing * 0.9, thickness * 0.8, 3.0) * smoothstep(0.6, 0.8, darkness);","  result = mix(result, ink, layer);","  layer = crosshatchLine(gl_FragCoord.xy, baseAngle - PI * 0.25, spacing * 0.85, thickness * 0.7, 4.0) * smoothstep(0.75, 0.9, darkness);","  result = mix(result, ink, layer);","  result = mix(result, ink, smoothstep(0.9, 1.0, darkness) * 0.8);","  float edgeStrength = mix(0.0, 2.0, clamp(u_crosshatchEdges, 0.0, 1.0));","  float edge = smoothstep(0.1, 0.3, crosshatchEdge(uv)) * edgeStrength;","  result = mix(result, ink, clamp(edge, 0.0, 1.0));","  return mix(source, result, amount);","}","vec3 applyHalftone(vec3 source, float amount){","  if (amount <= 0.0) return source;","  vec3 cmy = 1.0 - source;","  float k = min(cmy.r, min(cmy.g, cmy.b));","  vec3 inks = max(cmy - vec3(k * 0.72), 0.0);","  float scale = min(u_resolution.x, u_resolution.y) / 540.0;","  float cellPx = mix(5.0, 14.0, clamp(u_halftoneSize, 0.0, 1.0)) * max(scale, 0.25);","  vec2 p = gl_FragCoord.xy / max(cellPx, 1.0);","  float cyan = screenDot(p, inks.r, 0.261799, 0.78);","  float magenta = screenDot(p, inks.g, 1.308997, 0.78);","  float yellow = screenDot(p, inks.b, 0.0, 0.78);","  float blackInk = screenDot(p, k, 0.785398, 0.82);","  vec3 printColor = vec3(0.975, 0.962, 0.925);","  printColor *= mix(vec3(1.0), vec3(0.05, 0.79, 0.86), cyan);","  printColor *= mix(vec3(1.0), vec3(0.91, 0.08, 0.48), magenta);","  printColor *= mix(vec3(1.0), vec3(0.98, 0.83, 0.08), yellow);","  printColor *= mix(vec3(1.0), vec3(0.035), blackInk * 0.92);","  return mix(source, printColor, amount);","}","vec3 applyTwoInkPrint(vec3 source, float amount){","  if (amount <= 0.0) return source;","  float sourceLuma = lumaOf(source);","  float darkness = 1.0 - sourceLuma;","  float warmBias = clamp(source.r - (source.g + source.b) * 0.5, -0.35, 0.35);","  float coolBias = clamp((source.g + source.b) * 0.5 - source.r, -0.35, 0.35);","  float redTone = smoothstep(0.08, 0.72, darkness) * (1.0 - 0.68 * smoothstep(0.66, 1.0, darkness));","  float tealTone = smoothstep(0.30, 0.92, darkness);","  float redCoverage = clamp(redTone + warmBias * 1.35 - coolBias * 0.35, 0.0, 1.0);","  float tealCoverage = clamp(tealTone + coolBias * 1.1 - warmBias * 0.45, 0.0, 1.0);","  float scale = min(u_resolution.x, u_resolution.y) / 540.0;","  float cellPx = mix(4.5, 12.0, clamp(u_twoInkPrintSize, 0.0, 1.0)) * max(scale, 0.25);","  vec2 p = gl_FragCoord.xy / max(cellPx, 1.0);","  float redDot = screenDot(p, redCoverage, 0.261799, 0.84);","  float tealDot = screenDot(p + vec2(0.12, -0.08), tealCoverage, 1.308997, 0.84);","  float paperNoise = grainHash(floor(gl_FragCoord.xy * 0.5)) - 0.5;","  vec3 paper = vec3(0.955, 0.910, 0.795) + paperNoise * 0.018;","  vec3 vermilion = vec3(0.88, 0.13, 0.075);","  vec3 teal = vec3(0.035, 0.285, 0.355);","  vec3 overprint = vec3(0.045, 0.055, 0.052);","  vec3 printColor = paper * (1.0 - redDot) * (1.0 - tealDot);","  printColor += vermilion * redDot * (1.0 - tealDot);","  printColor += teal * (1.0 - redDot) * tealDot;","  printColor += overprint * redDot * tealDot;","  return mix(source, clamp(printColor, 0.0, 1.0), amount);","}","vec3 paletteColor(float index){","  if (index < 0.5) return u_palette0;","  if (index < 1.5) return u_palette1;","  if (index < 2.5) return u_palette2;","  if (index < 3.5) return u_palette3;","  if (index < 4.5) return u_palette4;","  return u_palette5;","}","float bayer4(vec2 point){","  vec2 cell = mod(floor(point), 4.0);","  if (cell.y < 0.5) {","    if (cell.x < 0.5) return 0.5 / 16.0;","    if (cell.x < 1.5) return 8.5 / 16.0;","    if (cell.x < 2.5) return 2.5 / 16.0;","    return 10.5 / 16.0;","  }","  if (cell.y < 1.5) {","    if (cell.x < 0.5) return 12.5 / 16.0;","    if (cell.x < 1.5) return 4.5 / 16.0;","    if (cell.x < 2.5) return 14.5 / 16.0;","    return 6.5 / 16.0;","  }","  if (cell.y < 2.5) {","    if (cell.x < 0.5) return 3.5 / 16.0;","    if (cell.x < 1.5) return 11.5 / 16.0;","    if (cell.x < 2.5) return 1.5 / 16.0;","    return 9.5 / 16.0;","  }","  if (cell.x < 0.5) return 15.5 / 16.0;","  if (cell.x < 1.5) return 7.5 / 16.0;","  if (cell.x < 2.5) return 13.5 / 16.0;","  return 5.5 / 16.0;","}","float standardAsciiSample(float brightness, vec2 grid){","  if (brightness < 0.1) return 0.0;","  if (brightness < 0.2) return grid.x == 2.0 && grid.y == 5.0 ? 1.0 : 0.0;","  if (brightness < 0.3) return grid.x == 2.0 && (grid.y == 2.0 || grid.y == 4.0) ? 1.0 : 0.0;","  if (brightness < 0.4) return (grid.y == 2.0 || grid.y == 4.0) && grid.x >= 1.0 && grid.x <= 3.0 ? 1.0 : 0.0;","  if (brightness < 0.5) {","    bool cross = (grid.x == 2.0 && grid.y >= 2.0 && grid.y <= 4.0) || (grid.y == 3.0 && grid.x >= 1.0 && grid.x <= 3.0);","    bool diagonals = (grid.x == 1.0 || grid.x == 3.0) && (grid.y == 2.0 || grid.y == 4.0);","    return cross || diagonals ? 1.0 : 0.0;","  }","  if (brightness < 0.6) {","    bool ring = ((grid.y == 2.0 || grid.y == 4.0) && grid.x >= 1.0 && grid.x <= 3.0) || ((grid.x == 1.0 || grid.x == 3.0) && grid.y == 3.0);","    return ring ? 1.0 : 0.0;","  }","  bool outline = ((grid.y == 1.0 || grid.y == 5.0) && grid.x >= 1.0 && grid.x <= 3.0) || ((grid.x == 0.0 || grid.x == 4.0) && grid.y >= 2.0 && grid.y <= 4.0) || ((grid.x == 1.0 || grid.x == 3.0) && grid.y >= 1.0 && grid.y <= 5.0);","  if (brightness < 0.7) return outline ? 1.0 : 0.0;","  if (brightness < 0.8) {","    bool slash = abs(grid.x - 2.0) == abs(grid.y - 3.0) && grid.x >= 1.0 && grid.x <= 3.0;","    return outline || slash ? 1.0 : 0.0;","  }","  if (brightness < 0.9) {","    bool loops = ((grid.y == 1.0 || grid.y == 3.0 || grid.y == 5.0) && grid.x >= 1.0 && grid.x <= 3.0) || ((grid.x == 1.0 || grid.x == 3.0) && (grid.y == 2.0 || grid.y == 4.0));","    return loops ? 1.0 : 0.0;","  }","  return 1.0;","}","float asciiStyleSample(float style, float brightness, vec2 uv){","  vec2 grid = floor(uv * vec2(5.0, 7.0));","  if (style < 0.5) return standardAsciiSample(brightness, grid);","  if (style < 1.5) {","    float checker = mod(grid.x + grid.y, 2.0);","    float ruled = mod(grid.x, 2.0) == 0.0 || mod(grid.y, 2.0) == 0.0 ? 1.0 : 0.0;","    if (brightness < 0.125) return 0.0;","    if (brightness < 0.25) return checker == 0.0 ? 0.5 : 0.0;","    if (brightness < 0.375) return ruled * 0.6;","    if (brightness < 0.5) return checker == 0.0 ? 1.0 : 0.0;","    if (brightness < 0.625) return ruled > 0.5 ? 1.0 : 0.3;","    if (brightness < 0.75) return checker == 0.0 ? 1.0 : 0.7;","    if (brightness < 0.875) return ruled > 0.5 ? 1.0 : 0.85;","    return 1.0;","  }","  if (style < 2.5) {","    if (brightness < 0.14) return 0.0;","    if (brightness < 0.28) return grid.x == 2.0 && grid.y == 1.0 ? 1.0 : 0.0;","    if (brightness < 0.42) return grid.x == 2.0 && grid.y == 5.0 ? 1.0 : 0.0;","    if (brightness < 0.56) return grid.y == 3.0 && grid.x >= 1.0 && grid.x <= 3.0 ? 1.0 : 0.0;","    if (brightness < 0.7) return (grid.x == 2.0 && grid.y >= 2.0 && grid.y <= 4.0) || (grid.y == 3.0 && grid.x >= 1.0 && grid.x <= 3.0) ? 1.0 : 0.0;","    if (brightness < 0.84) return abs(grid.x - 2.0) == abs(grid.y - 3.0) && grid.y >= 2.0 && grid.y <= 4.0 ? 1.0 : 0.0;","    return grid.x == 1.0 || grid.x == 3.0 || grid.y == 2.0 || grid.y == 4.0 ? 1.0 : 0.0;","  }","  if (style < 3.5) return grid.y >= 6.0 - brightness * 7.0 ? 1.0 : 0.0;","  if (style < 4.5) {","    vec2 dots = floor(uv * vec2(2.0, 4.0));","    if (brightness < 0.125) return 0.0;","    if (brightness < 0.25) return dots.y == 3.0 ? 1.0 : 0.0;","    if (brightness < 0.375) return dots.y >= 2.0 ? 1.0 : 0.0;","    if (brightness < 0.5) return dots.y >= 1.0 ? 1.0 : 0.0;","    if (brightness < 0.625) return dots.y >= 1.0 || dots.x == 1.0 ? 1.0 : 0.0;","    if (brightness < 0.75) return 1.0;","    if (brightness < 0.875) return mod(grid.x + grid.y, 2.0) < 1.5 ? 1.0 : 0.7;","    return 1.0;","  }","  if (style < 5.5) {","    if (brightness < 0.125) return 0.0;","    if (brightness < 0.25) return grid.x == 2.0 && grid.y == 3.0 ? 1.0 : 0.0;","    if (brightness < 0.375) return grid.y == 3.0 && grid.x >= 1.0 && grid.x <= 3.0 ? 1.0 : 0.0;","    if (brightness < 0.5) return grid.x + grid.y == 5.0 || grid.x + grid.y == 6.0 ? 1.0 : 0.0;","    if (brightness < 0.625) return grid.x == 2.0 ? 1.0 : 0.0;","    if (brightness < 0.75) return abs(grid.x - grid.y / 1.4) < 0.7 && grid.x >= 1.0 && grid.x <= 3.0 ? 1.0 : 0.0;","    if (brightness < 0.875) return grid.x == 2.0 || grid.y == 3.0 ? 1.0 : 0.0;","    return grid.x == 1.0 || grid.x == 3.0 || grid.y == 2.0 || grid.y == 4.0 ? 1.0 : 0.0;","  }","  if (style < 6.5) {","    bool top = grid.y == 0.0 && grid.x >= 1.0 && grid.x <= 3.0;","    bool topLeft = grid.x == 1.0 && grid.y <= 3.0;","    bool topRight = grid.x == 3.0 && grid.y <= 3.0;","    bool middle = grid.y == 3.0 && grid.x >= 1.0 && grid.x <= 3.0;","    bool bottomLeft = grid.x == 1.0 && grid.y >= 3.0;","    bool bottomRight = grid.x == 3.0 && grid.y >= 3.0;","    bool bottom = grid.y == 6.0 && grid.x >= 1.0 && grid.x <= 3.0;","    if (brightness < 0.1) return 0.0;","    if (brightness < 0.2) return topRight || bottomRight ? 1.0 : 0.0;","    if (brightness < 0.3) return top || topRight || middle || bottomLeft || bottom ? 1.0 : 0.0;","    if (brightness < 0.4) return top || topRight || middle || bottomRight || bottom ? 1.0 : 0.0;","    if (brightness < 0.5) return topLeft || middle || topRight || bottomRight ? 1.0 : 0.0;","    if (brightness < 0.6) return top || topLeft || middle || bottomRight || bottom ? 1.0 : 0.0;","    if (brightness < 0.7) return top || topLeft || middle || bottomLeft || bottomRight || bottom ? 1.0 : 0.0;","    if (brightness < 0.8) return top || topRight || bottomRight ? 1.0 : 0.0;","    if (brightness < 0.9) return top || topLeft || topRight || middle || bottomLeft || bottomRight || bottom ? 1.0 : 0.0;","    return top || topLeft || topRight || middle || bottomRight || bottom ? 1.0 : 0.0;","  }","  float slash = grid.x - grid.y;","  float backslash = grid.x + grid.y;","  if (brightness < 0.16) return 0.0;","  if (brightness < 0.33) return mod(slash, 3.0) < 0.5 ? 1.0 : 0.0;","  if (brightness < 0.5) return mod(slash, 2.0) < 0.5 ? 1.0 : 0.0;","  bool diagonalA = mod(slash, 2.0) < 0.5;","  bool diagonalB = mod(backslash, 2.0) < 0.5;","  if (brightness < 0.66) return diagonalA || diagonalB ? 1.0 : 0.0;","  if (brightness < 0.83) return mod(slash, 1.5) < 0.5 || mod(backslash, 1.5) < 0.5 ? 1.0 : 0.2;","  return mod(slash, 1.0) < 0.6 || mod(backslash, 1.0) < 0.6 ? 1.0 : 0.5;","}","vec3 rgbToHsv(vec3 color){","  float maximum = max(max(color.r, color.g), color.b);","  float minimum = min(min(color.r, color.g), color.b);","  float delta = maximum - minimum;","  float hue = 0.0;","  if (delta > 0.00001) {","    if (maximum == color.r) hue = mod((color.g - color.b) / delta, 6.0);","    else if (maximum == color.g) hue = (color.b - color.r) / delta + 2.0;","    else hue = (color.r - color.g) / delta + 4.0;","    hue = fract(hue / 6.0);","  }","  return vec3(hue, maximum > 0.00001 ? delta / maximum : 0.0, maximum);","}","vec3 hsvToRgb(vec3 color){","  vec3 bands = abs(fract(color.xxx + vec3(0.0, 0.6666667, 0.3333333)) * 6.0 - 3.0);","  return color.z * mix(vec3(1.0), clamp(bands - 1.0, 0.0, 1.0), color.y);","}","vec4 sampleAdvancedCurve(float coordinate, float row){",`  float position = clamp(coordinate, 0.0, 1.0) * ${$0};`,"  float lower = floor(position);",`  float upper = min(lower + 1.0, ${$0});`,`  float y = (row + 0.5) / ${y1};`,`  vec4 before = texture2D(u_advanced, vec2((lower + 0.5) / ${rc}, y));`,`  vec4 after = texture2D(u_advanced, vec2((upper + 0.5) / ${rc}, y));`,"  return mix(before, after, position - lower);","}","vec4 advancedConfig(float index){",`  return texture2D(u_advanced, vec2((index + 0.5) / ${rc}, ${x1}));`,"}","vec3 wheelDirection(float hue){","  vec3 direction = hsvToRgb(vec3(fract(hue), 1.0, 1.0));","  direction -= vec3(lumaOf(direction));","  return direction / max(max(max(abs(direction.r), abs(direction.g)), abs(direction.b)), 0.0001);","}","vec3 applyTonalWheels(vec3 color){","  float luma = lumaOf(color);","  float shadows = 1.0 - smoothstep(0.0, 0.6, luma);","  float highlights = smoothstep(0.4, 1.0, luma);","  float midtones = max(0.0, 1.0 - shadows - highlights);","  float total = max(shadows + midtones + highlights, 0.0001);","  vec3 weights = vec3(shadows, midtones, highlights) / total;","  color += wheelDirection(u_shadowWheel.x) * u_shadowWheel.y * weights.x * 0.18;","  color += wheelDirection(u_midtoneWheel.x) * u_midtoneWheel.y * weights.y * 0.18;","  color += wheelDirection(u_highlightWheel.x) * u_highlightWheel.y * weights.z * 0.18;","  color += u_shadowWheel.z * weights.x * 0.25;","  color += u_midtoneWheel.z * weights.y * 0.25;","  color += u_highlightWheel.z * weights.z * 0.25;","  return color;","}","vec3 applyRgbCurves(vec3 color){","  if (u_rgbCurvesEnabled < 0.5) return color;","  vec3 master = vec3(","    sampleAdvancedCurve(color.r, 0.0).a,","    sampleAdvancedCurve(color.g, 0.0).a,","    sampleAdvancedCurve(color.b, 0.0).a","  );","  return vec3(","    sampleAdvancedCurve(master.r, 0.0).r,","    sampleAdvancedCurve(master.g, 0.0).g,","    sampleAdvancedCurve(master.b, 0.0).b","  );","}","float decodeSigned(float value){ return (value * 255.0 - 128.0) / 127.0; }","vec3 applyHueCurves(vec3 color){","  if (u_hueCurvesEnabled < 0.5) return color;","  vec3 hsv = rgbToHsv(clamp(color, 0.0, 1.0));","  vec3 curves = sampleAdvancedCurve(hsv.x, 1.0).rgb;","  float originalLuma = lumaOf(color);","  hsv.x = fract(hsv.x + decodeSigned(curves.r) * 0.5);","  hsv.y = clamp(hsv.y * max(0.0, 1.0 + decodeSigned(curves.g)), 0.0, 1.0);","  vec3 shifted = hsvToRgb(hsv);","  shifted += vec3(originalLuma - lumaOf(shifted) + decodeSigned(curves.b));","  return shifted;","}","float softRangeMask(float value, float minimum, float maximum, float softness){","  if (value < minimum) {","    if (softness <= 0.0) return 0.0;","    return smoothstep(minimum - softness, minimum, value);","  }","  if (value > maximum) {","    if (softness <= 0.0) return 0.0;","    return 1.0 - smoothstep(maximum, maximum + softness, value);","  }","  return 1.0;","}","float hueRangeMask(float hue, float saturation, vec3 key){","  float distance = abs(fract(hue - key.x + 0.5) - 0.5) * 360.0;","  float range = key.y * 180.0;","  float softness = key.z * 180.0;","  if (range < 179.999 && saturation < 0.001) return 0.0;","  if (distance <= range) return 1.0;","  if (softness <= 0.0) return 0.0;","  return 1.0 - smoothstep(range, range + softness, distance);","}","vec3 applySecondary(vec3 color, float index){","  float base = index * 5.0;","  vec4 hueKey = advancedConfig(base);","  vec4 saturationKey = advancedConfig(base + 1.0);","  vec4 lumaKey = advancedConfig(base + 2.0);","  vec4 correction = advancedConfig(base + 3.0);","  vec4 tintCorrection = advancedConfig(base + 4.0);","  vec3 hsv = rgbToHsv(clamp(color, 0.0, 1.0));","  float luma = lumaOf(color);","  float mask = hueRangeMask(hsv.x, hsv.y, hueKey.rgb);","  mask *= softRangeMask(hsv.y, saturationKey.x, saturationKey.y, saturationKey.z * 0.5);","  mask *= softRangeMask(luma, lumaKey.x, lumaKey.y, lumaKey.z * 0.5);","  if (mask <= 0.0) return color;","  hsv.x = fract(hsv.x + decodeSigned(correction.x) * 0.5);","  vec3 corrected = hsvToRgb(hsv);","  float correctedLuma = lumaOf(corrected);","  corrected = mix(vec3(correctedLuma), corrected, max(0.0, 1.0 + decodeSigned(correction.y)));","  corrected += vec3(decodeSigned(correction.z));","  float temperature = decodeSigned(correction.w);","  float tint = decodeSigned(tintCorrection.x);","  corrected.r += temperature * 0.08 + tint * 0.04;","  corrected.b -= temperature * 0.08 - tint * 0.04;","  corrected.g -= tint * 0.08;","  return mix(color, corrected, mask);","}","vec3 applyAdvancedGrade(vec3 color){","  color = applyTonalWheels(color);","  color = applyRgbCurves(color);","  color = applyHueCurves(color);","  if (u_secondaryCount > 0.5) color = applySecondary(color, 0.0);","  if (u_secondaryCount > 1.5) color = applySecondary(color, 1.0);","  if (u_secondaryCount > 2.5) color = applySecondary(color, 2.0);","  if (u_secondaryCount > 3.5) color = applySecondary(color, 3.0);","  return color;","}","vec3 sampleLut(float r, float g, float b){","  float size = max(u_lutSize, 2.0);","  float x = (r + b * size + 0.5) / max(u_lutTextureSize.x, 1.0);","  float y = (g + 0.5) / max(u_lutTextureSize.y, 1.0);","  return texture2D(u_lut, vec2(x, y)).rgb;","}","vec3 applyLut(vec3 color){","  if (u_lutEnabled < 0.5) return color;","  float size = max(u_lutSize, 2.0);","  vec3 span = max(u_lutDomainMax - u_lutDomainMin, vec3(0.00001));","  vec3 scaled = clamp((color - u_lutDomainMin) / span, 0.0, 1.0) * (size - 1.0);","  vec3 lo = floor(scaled);","  vec3 hi = min(lo + 1.0, vec3(size - 1.0));","  vec3 f = scaled - lo;","  vec3 c000 = sampleLut(lo.r, lo.g, lo.b);","  vec3 c100 = sampleLut(hi.r, lo.g, lo.b);","  vec3 c010 = sampleLut(lo.r, hi.g, lo.b);","  vec3 c110 = sampleLut(hi.r, hi.g, lo.b);","  vec3 c001 = sampleLut(lo.r, lo.g, hi.b);","  vec3 c101 = sampleLut(hi.r, lo.g, hi.b);","  vec3 c011 = sampleLut(lo.r, hi.g, hi.b);","  vec3 c111 = sampleLut(hi.r, hi.g, hi.b);","  vec3 c00 = mix(c000, c100, f.r);","  vec3 c10 = mix(c010, c110, f.r);","  vec3 c01 = mix(c001, c101, f.r);","  vec3 c11 = mix(c011, c111, f.r);","  vec3 c0 = mix(c00, c10, f.g);","  vec3 c1 = mix(c01, c11, f.g);","  vec3 lutColor = mix(c0, c1, f.b);","  return mix(color, lutColor, clamp(u_lutIntensity, 0.0, 1.0));","}","vec3 applyPrimaryGrade(vec3 color){","  color *= pow(2.0, u_exposure);","  float y = lumaOf(color);","  float shadowMask = 1.0 - smoothstep(0.0, 0.65, y);","  float highlightMask = smoothstep(0.35, 1.0, y);","  color += u_shadows * 0.35 * shadowMask;","  color += u_highlights * 0.35 * highlightMask;","  float blackPoint = clamp(u_blacks * 0.18, -0.18, 0.18);","  float whitePoint = clamp(1.0 - u_whites * 0.18, 0.82, 1.18);","  color = (color - blackPoint) / max(whitePoint - blackPoint, 0.2);","  color.r += u_temperature * 0.08 + u_tint * 0.04;","  color.b -= u_temperature * 0.08 - u_tint * 0.04;","  color.g -= u_tint * 0.08;","  color = (color - 0.5) * max(0.0, 1.0 + u_contrast) + 0.5;","  float satLuma = lumaOf(color);","  float currentSat = clamp(colorSaturation(color), 0.0, 1.0);","  float skinLike = smoothstep(0.02, 0.18, color.r - color.g) * smoothstep(0.0, 0.16, color.g - color.b) * smoothstep(0.18, 0.82, satLuma);","  float vibranceWeight = (1.0 - currentSat * 0.72) * mix(1.0, 0.55, skinLike);","  color = mix(vec3(satLuma), color, max(0.0, 1.0 + u_vibrance * vibranceWeight));","  color = mix(vec3(satLuma), color, max(0.0, 1.0 + u_saturation));","  return color;","}","vec3 applyColorGrade(vec3 color){","  color = applyPrimaryGrade(color);","  color = applyAdvancedGrade(color);","  return clamp(applyLut(clamp(color, 0.0, 1.0)), 0.0, 1.0);","}","vec3 applyDither(vec3 source, float amount){","  if (amount <= 0.0) return source;","  float scale = max(min(u_resolution.x, u_resolution.y) / 540.0, 0.25);","  float pixelSize = mix(1.0, 5.0, clamp(u_ditherSize, 0.0, 1.0)) * scale;","  vec2 block = floor(gl_FragCoord.xy / max(pixelSize, 1.0));","  float levels = clamp(u_paletteSize, 2.0, 6.0);","  float index = floor(clamp(lumaOf(source) * (levels - 1.0) + bayer4(block), 0.0, levels - 1.0));","  return mix(source, paletteColor(index), amount);","}","vec2 asciiEdgeDirection(vec2 uv, vec2 stepUv){","  float topLeft = bt601Luma(sampleMedia(uv + vec2(-stepUv.x, -stepUv.y)).rgb);","  float top = bt601Luma(sampleMedia(uv + vec2(0.0, -stepUv.y)).rgb);","  float topRight = bt601Luma(sampleMedia(uv + vec2(stepUv.x, -stepUv.y)).rgb);","  float left = bt601Luma(sampleMedia(uv + vec2(-stepUv.x, 0.0)).rgb);","  float right = bt601Luma(sampleMedia(uv + vec2(stepUv.x, 0.0)).rgb);","  float bottomLeft = bt601Luma(sampleMedia(uv + vec2(-stepUv.x, stepUv.y)).rgb);","  float bottom = bt601Luma(sampleMedia(uv + vec2(0.0, stepUv.y)).rgb);","  float bottomRight = bt601Luma(sampleMedia(uv + stepUv).rgb);","  float x = -topLeft - 2.0 * left - bottomLeft + topRight + 2.0 * right + bottomRight;","  float y = -topLeft - 2.0 * top - topRight + bottomLeft + 2.0 * bottom + bottomRight;","  return vec2(x, y);","}","vec2 rotateAsciiUv(vec2 uv, float angle){","  float cosine = cos(angle);","  float sine = sin(angle);","  vec2 centered = uv - 0.5;","  return vec2(centered.x * cosine - centered.y * sine, centered.x * sine + centered.y * cosine) + 0.5;","}","vec3 applyAscii(vec3 source, float amount){","  if (amount <= 0.0) return source;","  float scale = max(min(u_resolution.x, u_resolution.y) / 540.0, 0.25);","  float cellHeight = mix(4.0, 80.0, clamp(u_asciiSize, 0.0, 1.0)) * scale;","  vec2 cellSize = vec2(cellHeight);","  vec2 cell = floor(gl_FragCoord.xy / cellSize);","  vec2 cellVuv = (cell + 0.5) * cellSize / max(u_resolution, vec2(1.0));","  vec2 cellUv = (cellVuv - u_uvOffset) / u_uvScale;","  cellUv = applyCrtWarp(cellUv);","  vec3 cellColor = applyColorGrade(sampleMedia(cellUv).rgb);","  float brightness = bt601Luma(cellColor);","  float invert = step(0.5, u_asciiInvert);","  brightness = mix(brightness, 1.0 - brightness, invert);","  vec2 glyphUv = fract(gl_FragCoord.xy / cellSize);","  float rotation = clamp(u_asciiRotation, 0.0, 1.0);","  if (rotation > 0.0) {","    vec2 cellStepUv = cellSize / max(u_resolution * u_uvScale, vec2(1.0));","    vec2 edge = asciiEdgeDirection(cellUv, cellStepUv);","    if (length(edge) > 0.1) glyphUv = mix(glyphUv, rotateAsciiUv(glyphUv, atan(edge.y, edge.x)), rotation);","  }","  float ink = asciiStyleSample(floor(u_asciiStyle + 0.5), brightness, glyphUv);","  vec3 background = paletteColor(0.0);","  vec3 inkColor = mix(paletteColor(max(u_paletteSize - 1.0, 1.0)), cellColor, clamp(u_asciiColor, 0.0, 1.0));","  vec3 asciiColor = mix(background, inkColor, ink);","  return mix(source, asciiColor, amount);","}","vec3 applyScanlines(vec3 source, float amount){","  if (amount <= 0.0) return source;","  float count = mix(50.0, 500.0, clamp(u_scanlineCount, 0.0, 1.0));","  float softness = clamp(u_scanlineSoftness, 0.0, 1.0);","  float wave = 0.5 + 0.5 * sin(v_uv.y * count * PI);","  float line = mix(1.0 - wave, pow(1.0 - wave, 2.2), softness);","  return source * (1.0 - line * amount);","}","void main(){","  vec2 uv = (v_uv - u_uvOffset) / u_uvScale;","  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) {","    gl_FragColor = vec4(0.0);","    return;","  }","  vec4 originalSample = sampleSource(uv);","  uv = applyCrtWarp(uv);","  vec2 displayEdge = smoothstep(vec2(0.0), vec2(0.006), uv) * (1.0 - smoothstep(vec2(0.994), vec2(1.0), uv));","  float displayMask = displayEdge.x * displayEdge.y;","  vec4 sampleColor = sampleMedia(uv);","  sampleColor = sampleChromaticMedia(uv, sampleColor);","  sampleColor.rgb = applyDigitalGlitch(uv, sampleColor.rgb);","  vec3 original = originalSample.rgb;","  vec3 color = mix(sampleColor.rgb, applyColorGrade(sampleColor.rgb), u_intensity);","  float grainAmount = clamp(u_grain, 0.0, 1.0);","  if (grainAmount > 0.0) {","    float grainPixelSize = mix(1.0, 6.0, clamp(u_grainSize, 0.0, 1.0));","    vec2 grainCoord = floor(gl_FragCoord.xy / grainPixelSize) + vec2(u_grainSeed, u_grainSeed * 1.37);","    float grainBase = grainHash(grainCoord) - grainHash(grainCoord + vec2(19.19, 73.31));","    float grainFine = grainHash(gl_FragCoord.xy + vec2(u_grainSeed * 2.11, u_grainSeed * 0.71)) - 0.5;","    float grain = mix(grainBase * 0.7, grainBase + grainFine * 0.35, clamp(u_grainRoughness, 0.0, 1.0));","    float grainLuma = lumaOf(color);","    float grainMask = smoothstep(0.02, 0.55, grainLuma) * (1.0 - smoothstep(0.88, 1.0, grainLuma));","    color += grain * grainAmount * mix(0.025, 0.08, grainMask);","  }","  float filmArtifacts = clamp(u_filmArtifacts, 0.0, 1.0);","  if (filmArtifacts > 0.0) {","    float filmFrame = floor(u_grainSeed);","    float dust = dustMask(v_uv, floor(filmFrame / 3.0));","    float dustTone = grainHash(vec2(floor(filmFrame / 3.0), 8.0));","    color = mix(color, vec3(dustTone > 0.5 ? 0.95 : 0.02), dust * 0.72 * filmArtifacts);","    float scratchBucket = floor(filmFrame / 12.0);","    float scratchX = grainHash(vec2(scratchBucket, 4.2));","    float scratchLife = step(0.78, grainHash(vec2(scratchBucket, 8.4)));","    float scratch = (1.0 - smoothstep(0.0, 1.4 / max(u_resolution.x, 1.0), abs(v_uv.x - scratchX))) * scratchLife;","    color = mix(color, vec3(0.94, 0.88, 0.76), scratch * 0.28 * filmArtifacts);","  }","  color = applyMonoScreen(clamp(color, 0.0, 1.0), clamp(u_monoScreen, 0.0, 1.0));","  color = applyEngraving(clamp(color, 0.0, 1.0), clamp(u_engraving, 0.0, 1.0));","  color = applyCrosshatch(uv, clamp(color, 0.0, 1.0), clamp(u_crosshatch, 0.0, 1.0));","  color = applyHalftone(clamp(color, 0.0, 1.0), clamp(u_halftone, 0.0, 1.0));","  color = applyTwoInkPrint(clamp(color, 0.0, 1.0), clamp(u_twoInkPrint, 0.0, 1.0));","  color = applyDither(clamp(color, 0.0, 1.0), clamp(u_dither, 0.0, 1.0));","  color = applyAscii(clamp(color, 0.0, 1.0), clamp(u_ascii, 0.0, 1.0));","  if (u_bloomReady > 0.5 && u_bloom > 0.0) color += sampleBloom(uv) * u_bloom;","  color = applyScanlines(clamp(color, 0.0, 1.0), clamp(u_scanlines, 0.0, 1.0));","  vec2 vignetteAspect = u_resolution.x > u_resolution.y","    ? vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0)","    : vec2(1.0, u_resolution.y / max(u_resolution.x, 1.0));","  vec2 vignetteUv = abs((v_uv - vec2(0.5)) * 2.0) * vignetteAspect;","  float vignettePower = mix(8.0, 1.8, clamp(u_vignetteRoundness * 0.5 + 0.5, 0.0, 1.0));","  float vignetteDistance = pow(pow(vignetteUv.x, vignettePower) + pow(vignetteUv.y, vignettePower), 1.0 / vignettePower);","  float vignetteMidpoint = mix(0.22, 1.08, clamp(u_vignetteMidpoint, 0.0, 1.0));","  float vignetteFeather = mix(0.08, 0.72, clamp(u_vignetteFeather, 0.0, 1.0));","  float vignetteMask = smoothstep(vignetteMidpoint, vignetteMidpoint + vignetteFeather, vignetteDistance);","  color *= 1.0 - vignetteMask * clamp(u_vignette, 0.0, 1.0) * 0.75;","  float warpActive = step(0.0001, u_crtCurvature);","  color *= mix(1.0, displayMask, warpActive);","  vec3 graded = clamp(color, 0.0, 1.0);","  if (u_compareEnabled > 0.5) {","    float pos = clamp(u_comparePosition, 0.0, 1.0);","    float softness = max(u_compareSoftness, 0.00001);","    float afterMask = smoothstep(pos - softness, pos + softness, v_uv.x);","    vec3 splitColor = mix(original, graded, afterMask);","    float lineMask = 0.0;","    if (u_compareLineWidth > 0.0) {","      float lineWidth = max(u_compareLineWidth / max(u_resolution.x, 1.0), 0.00001);","      lineMask = 1.0 - smoothstep(lineWidth, lineWidth * 1.8, abs(v_uv.x - pos));","    }","    gl_FragColor = vec4(mix(splitColor, vec3(1.0), lineMask * 0.82), sampleColor.a);","    return;","  }","  gl_FragColor = vec4(graded, sampleColor.a);","}"].join(`\n`),E1=["#ifdef GL_FRAGMENT_PRECISION_HIGH","precision highp float;","#else","precision mediump float;","#endif","varying vec2 v_uv;","uniform sampler2D u_source;","uniform vec2 u_resolution;","uniform vec2 u_direction;","uniform float u_radius;","uniform float u_bloomPass;","uniform float u_threshold;","vec4 readSource(vec2 uv){","  vec4 color = texture2D(u_source, clamp(uv, vec2(0.0), vec2(1.0)));","  if (u_bloomPass > 0.5) {","    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));","    if (u_threshold >= 0.0 && luminance <= u_threshold) color.rgb = vec3(0.0);","    return vec4(color.rgb, 1.0);","  }","  color.rgb *= color.a;","  return color;","}","void main(){","  if (u_bloomPass > 0.5) {","    vec2 stepUv = u_direction * max(u_radius, 0.0) / max(u_resolution, vec2(1.0)) * 0.5;","    vec4 bloom = readSource(v_uv) * 0.227027;","    bloom += readSource(v_uv + stepUv) * 0.1945946;","    bloom += readSource(v_uv - stepUv) * 0.1945946;","    bloom += readSource(v_uv + stepUv * 2.0) * 0.1216216;","    bloom += readSource(v_uv - stepUv * 2.0) * 0.1216216;","    bloom += readSource(v_uv + stepUv * 3.0) * 0.054054;","    bloom += readSource(v_uv - stepUv * 3.0) * 0.054054;","    bloom += readSource(v_uv + stepUv * 4.0) * 0.016216;","    bloom += readSource(v_uv - stepUv * 4.0) * 0.016216;","    gl_FragColor = bloom;","    return;","  }","  vec2 stepUv = u_direction * max(u_radius, 0.0) / max(u_resolution, vec2(1.0)) / 12.0;","  vec4 color = readSource(v_uv) * 0.08077993;","  color += readSource(v_uv + stepUv * 1.0) * 0.07918038;","  color += readSource(v_uv - stepUv * 1.0) * 0.07918038;","  color += readSource(v_uv + stepUv * 2.0) * 0.07456928;","  color += readSource(v_uv - stepUv * 2.0) * 0.07456928;","  color += readSource(v_uv + stepUv * 3.0) * 0.06747307;","  color += readSource(v_uv - stepUv * 3.0) * 0.06747307;","  color += readSource(v_uv + stepUv * 4.0) * 0.05865827;","  color += readSource(v_uv - stepUv * 4.0) * 0.05865827;","  color += readSource(v_uv + stepUv * 5.0) * 0.04899551;","  color += readSource(v_uv - stepUv * 5.0) * 0.04899551;","  color += readSource(v_uv + stepUv * 6.0) * 0.03931982;","  color += readSource(v_uv - stepUv * 6.0) * 0.03931982;","  color += readSource(v_uv + stepUv * 7.0) * 0.03031761;","  color += readSource(v_uv - stepUv * 7.0) * 0.03031761;","  color += readSource(v_uv + stepUv * 8.0) * 0.02245983;","  color += readSource(v_uv - stepUv * 8.0) * 0.02245983;","  color += readSource(v_uv + stepUv * 9.0) * 0.01598624;","  color += readSource(v_uv - stepUv * 9.0) * 0.01598624;","  color += readSource(v_uv + stepUv * 10.0) * 0.01093238;","  color += readSource(v_uv - stepUv * 10.0) * 0.01093238;","  color += readSource(v_uv + stepUv * 11.0) * 0.00718308;","  color += readSource(v_uv - stepUv * 11.0) * 0.00718308;","  color += readSource(v_uv + stepUv * 12.0) * 0.00453456;","  color += readSource(v_uv - stepUv * 12.0) * 0.00453456;","  if (color.a > 0.0001) color.rgb /= color.a;","  gl_FragColor = color;","}"].join(`\n`),A1=["#ifdef GL_FRAGMENT_PRECISION_HIGH","precision highp float;","#else","precision mediump float;","#endif","varying vec2 v_uv;","uniform sampler2D u_source;","uniform sampler2D u_blurSource;","uniform vec2 u_texel;","uniform vec2 u_uvScale;","uniform vec2 u_uvOffset;","uniform float u_blurReady;","uniform float u_blur;","uniform float u_kuwaharaRadius;","vec3 readPrepared(vec2 displayUv){","  vec2 uv = (displayUv - u_uvOffset) / u_uvScale;","  vec3 color = texture2D(u_source, clamp(uv, vec2(0.0), vec2(1.0))).rgb;","  if (u_blurReady > 0.5 && u_blur > 0.0) {","    vec3 blurred = texture2D(u_blurSource, clamp(uv, vec2(0.0), vec2(1.0))).rgb;","    color = mix(color, blurred, clamp(u_blur, 0.0, 1.0));","  }","  return color;","}","void main(){","  float radius = floor(mix(2.0, 16.0, clamp(u_kuwaharaRadius, 0.0, 1.0)) + 0.5);","  vec3 sum = vec3(0.0);","  float sumSquares = 0.0;","  float count = 0.0;","  for (int offset = 0; offset <= 16; offset++) {","    if (float(offset) > radius) continue;","    vec3 color = readPrepared(v_uv + vec2(float(offset), 0.0) * u_texel);","    sum += color;","    sumSquares += dot(color, color) / 3.0;","    count += 1.0;","  }","  gl_FragColor = vec4(sum / count, sumSquares / count);","}"].join(`\n`),w1=["#ifdef GL_FRAGMENT_PRECISION_HIGH","precision highp float;","#else","precision mediump float;","#endif","varying vec2 v_uv;","uniform sampler2D u_kuwaharaMoments;","uniform vec2 u_texel;","uniform float u_kuwaharaRadius;","uniform float u_kuwaharaSharpness;","uniform float u_kuwaharaSaturation;","void main(){","  float radius = floor(mix(2.0, 16.0, clamp(u_kuwaharaRadius, 0.0, 1.0)) + 0.5);","  vec2 origins[4];","  origins[0] = vec2(-radius, -radius);","  origins[1] = vec2(0.0, -radius);","  origins[2] = vec2(-radius, 0.0);","  origins[3] = vec2(0.0, 0.0);","  vec3 means[4];","  float variances[4];","  float minVariance = 1.0;","  for (int quadrant = 0; quadrant < 4; quadrant++) {","    vec4 moment = vec4(0.0);","    float count = 0.0;","    for (int offset = 0; offset <= 16; offset++) {","      if (float(offset) > radius) continue;","      vec2 sampleOffset = origins[quadrant] + vec2(0.0, float(offset));","      moment += texture2D(u_kuwaharaMoments, clamp(v_uv + sampleOffset * u_texel, vec2(0.0), vec2(1.0)));","      count += 1.0;","    }","    moment /= count;","    vec3 mean = moment.rgb;","    float meanSquare = moment.a * 3.0;","    float variance = max(meanSquare - dot(mean, mean), 0.0);","    means[quadrant] = mean;","    variances[quadrant] = variance;","    minVariance = min(minVariance, variance);","  }","  float exponent = 1.0 + clamp(u_kuwaharaSharpness, 0.0, 1.0) * 8.0;","  vec3 result = vec3(0.0);","  float totalWeight = 0.0;","  for (int quadrant = 0; quadrant < 4; quadrant++) {","    float weight = pow((minVariance + 0.0001) / (variances[quadrant] + 0.0001), exponent);","    result += means[quadrant] * weight;","    totalWeight += weight;","  }","  result /= max(totalWeight, 0.0001);","  float luma = dot(result, vec3(0.2126, 0.7152, 0.0722));","  float saturation = clamp(u_kuwaharaSaturation, 0.0, 1.0) * 2.0;","  gl_FragColor = vec4(clamp(mix(vec3(luma), result, saturation), 0.0, 1.0), 1.0);","}"].join(`\n`);function rn(e){return xe(e)||Pe(e)}function q0(e){let t=window.getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"}function z0(e,t,n){let r=e.createShader(n);return r?(e.shaderSource(r,t),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(O("runtime.colorGrading.compileShader",e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function Va(e,t=v1){let n=z0(e,S1,e.VERTEX_SHADER),r=z0(e,t,e.FRAGMENT_SHADER);if(!n||!r)return n&&e.deleteShader(n),r&&e.deleteShader(r),null;let i=e.createProgram();return i?(e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),e.deleteShader(n),e.deleteShader(r),e.getProgramParameter(i,e.LINK_STATUS)?i:(O("runtime.colorGrading.linkProgram",e.getProgramInfoLog(i)),e.deleteProgram(i),null)):null}function Ha(e,t=e.LINEAR,n=e.UNSIGNED_BYTE){let r=e.createTexture();return r?(e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,n,null),r):null}function _1(e,t){let n=Va(e,E1);return n?{program:n,quad:t,position:e.getAttribLocation(n,"a_pos"),source:e.getUniformLocation(n,"u_source"),resolution:e.getUniformLocation(n,"u_resolution"),direction:e.getUniformLocation(n,"u_direction"),radius:e.getUniformLocation(n,"u_radius"),bloomPass:e.getUniformLocation(n,"u_bloomPass"),threshold:e.getUniformLocation(n,"u_threshold")}:null}function C1(e,t){let n=Va(e,A1);return n?{program:n,quad:t,position:e.getAttribLocation(n,"a_pos"),source:e.getUniformLocation(n,"u_source"),blurSource:e.getUniformLocation(n,"u_blurSource"),texel:e.getUniformLocation(n,"u_texel"),uvScale:e.getUniformLocation(n,"u_uvScale"),uvOffset:e.getUniformLocation(n,"u_uvOffset"),blurReady:e.getUniformLocation(n,"u_blurReady"),blur:e.getUniformLocation(n,"u_blur"),radius:e.getUniformLocation(n,"u_kuwaharaRadius")}:null}function R1(e,t){let n=Va(e,w1);return n?{program:n,quad:t,position:e.getAttribLocation(n,"a_pos"),moments:e.getUniformLocation(n,"u_kuwaharaMoments"),texel:e.getUniformLocation(n,"u_texel"),radius:e.getUniformLocation(n,"u_kuwaharaRadius"),sharpness:e.getUniformLocation(n,"u_kuwaharaSharpness"),saturation:e.getUniformLocation(n,"u_kuwaharaSaturation")}:null}function Oi(e,t=e.UNSIGNED_BYTE,n=e.LINEAR){let r=Ha(e,n,t),i=e.createFramebuffer();if(!r||!i)return r&&e.deleteTexture(r),i&&e.deleteFramebuffer(i),null;e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let o=e.checkFramebufferStatus(e.FRAMEBUFFER);return e.bindFramebuffer(e.FRAMEBUFFER,null),o!==e.FRAMEBUFFER_COMPLETE?(e.deleteTexture(r),e.deleteFramebuffer(i),null):{texture:r,framebuffer:i,type:t,width:1,height:1}}function Ba(e,t,n,r){t.width===n&&t.height===r||(t.width=n,t.height=r,e.bindTexture(e.TEXTURE_2D,t.texture),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n,r,0,e.RGBA,t.type,null))}function ic(e,t,n){let r=[];for(let i of n){let o=e.getUniformLocation(t,`u_${i}`);o!==null&&r.push([i,o])}return r}function j0(e,t,n){t&&e.deleteProgram(t);for(let r of n)r&&e.deleteTexture(r)}function lc(e){let t=e.getContext("webgl",{alpha:!0,premultipliedAlpha:!1});if(!t)return null;let n=Va(t),r=Ha(t),i=Ha(t,t.NEAREST),o=Ha(t,t.NEAREST);if(!n||!r||!i||!o)return j0(t,n,[r,i,o]),null;let a=t.createBuffer();return a?(t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW),{gl:t,program:{program:n,texture:r,lutTexture:i,advancedTexture:o,advancedSignature:null,quad:a,position:t.getAttribLocation(n,"a_pos"),source:t.getUniformLocation(n,"u_source"),blurSource:t.getUniformLocation(n,"u_blurSource"),bloomSource:t.getUniformLocation(n,"u_bloomSource"),kuwaharaSource:t.getUniformLocation(n,"u_kuwaharaSource"),lut:t.getUniformLocation(n,"u_lut"),advanced:t.getUniformLocation(n,"u_advanced"),resolution:t.getUniformLocation(n,"u_resolution"),uvScale:t.getUniformLocation(n,"u_uvScale"),uvOffset:t.getUniformLocation(n,"u_uvOffset"),blurReady:t.getUniformLocation(n,"u_blurReady"),bloomReady:t.getUniformLocation(n,"u_bloomReady"),kuwaharaReady:t.getUniformLocation(n,"u_kuwaharaReady"),lutEnabled:t.getUniformLocation(n,"u_lutEnabled"),lutSize:t.getUniformLocation(n,"u_lutSize"),lutTextureSize:t.getUniformLocation(n,"u_lutTextureSize"),lutDomainMin:t.getUniformLocation(n,"u_lutDomainMin"),lutDomainMax:t.getUniformLocation(n,"u_lutDomainMax"),lutIntensity:t.getUniformLocation(n,"u_lutIntensity"),shadowWheel:t.getUniformLocation(n,"u_shadowWheel"),midtoneWheel:t.getUniformLocation(n,"u_midtoneWheel"),highlightWheel:t.getUniformLocation(n,"u_highlightWheel"),rgbCurvesEnabled:t.getUniformLocation(n,"u_rgbCurvesEnabled"),hueCurvesEnabled:t.getUniformLocation(n,"u_hueCurvesEnabled"),secondaryCount:t.getUniformLocation(n,"u_secondaryCount"),adjustUniforms:ic(t,n,ra),detailUniforms:ic(t,n,Ul),effectUniforms:ic(t,n,Vl),grainSeed:t.getUniformLocation(n,"u_grainSeed"),effectTime:t.getUniformLocation(n,"u_effectTime"),paletteSize:t.getUniformLocation(n,"u_paletteSize"),palette0:t.getUniformLocation(n,"u_palette0"),palette1:t.getUniformLocation(n,"u_palette1"),palette2:t.getUniformLocation(n,"u_palette2"),palette3:t.getUniformLocation(n,"u_palette3"),palette4:t.getUniformLocation(n,"u_palette4"),palette5:t.getUniformLocation(n,"u_palette5"),intensity:t.getUniformLocation(n,"u_intensity"),compareEnabled:t.getUniformLocation(n,"u_compareEnabled"),comparePosition:t.getUniformLocation(n,"u_comparePosition"),compareSoftness:t.getUniformLocation(n,"u_compareSoftness"),compareLineWidth:t.getUniformLocation(n,"u_compareLineWidth")}}):(j0(t,n,[r,i,o]),null)}function T1(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function k1(e){if(!T1(e))return{...pr};let t=(n,r,i,o)=>{let a=typeof n=="number"?n:Number(n);return Math.min(o,Math.max(i,Number.isFinite(a)?a:r))};return{enabled:e.enabled===!0,position:t(e.position,pr.position,0,1),softness:t(e.softness,pr.softness,0,.25),lineWidth:t(e.lineWidth,pr.lineWidth,0,12)}}function tb(e){try{let t=new URL(e,document.baseURI);return t.protocol==="data:"?{href:t.href}:t.protocol!=="http:"&&t.protocol!=="https:"?{error:"LUT must be project-local or a data URL"}:t.origin!==window.location.origin?{error:"Remote LUT URLs are not supported"}:{href:t.href}}catch{return{error:"Invalid LUT URL"}}}function Wa(e){return e instanceof Error?e.message:"LUT failed to load"}function M1(e){let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return(t>>>0)%1e4}function nb(e){let t=e.id||e.currentSrc||e.getAttribute("src")||`${e.tagName}:${Array.prototype.indexOf.call(e.parentNode?.children??[],e)}`;return M1(t)}function uc(e){let t=tb(e);if("error"in t)return{state:"error",message:t.error};let n=Ot.get(t.href);if(n)return n;let r=fetch(t.href,{credentials:"same-origin"}).then(o=>{if(!o.ok)throw new Error(`Failed to load LUT (${o.status})`);return o.text()}).then(o=>Ep(o,{maxSize:ea})),i={state:"pending",promise:r};for(;Ot.size>=f1;){let o=Ot.keys().next().value;if(!o)break;Ot.delete(o)}return Ot.set(t.href,i),r.then(o=>{Ot.get(t.href)===i&&Ot.set(t.href,{state:"ready",lut:o})},o=>{Ot.get(t.href)===i&&Ot.set(t.href,{state:"error",message:Wa(o)})}),i}function K0(e,t,n){if(e.lut?.src===t)return e.lut;let r=Nl(n),{gl:i,program:o}=e;try{return rb(i,o.lutTexture,r),e.lut={src:t,size:n.size,domainMin:n.domainMin,domainMax:n.domainMax,textureWidth:r.width,textureHeight:r.height},e.lutError=null,e.lutLoadingSrc=null,e.lut}catch(a){return e.lut=null,e.lutError=Wa(a),e.lutLoadingSrc=null,O("runtime.colorGrading.uploadLut",a),null}}async function L1(e){let t=uc(e);if(t.state==="ready")return t.lut;if(t.state==="pending")return t.promise;throw new Error(t.message)}function rb(e,t,n){e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,n.width,n.height,0,e.RGBA,e.UNSIGNED_BYTE,n.data)}function N1(e,t,n){let r=Nl(n),{gl:i,program:o}=e;return rb(i,o.lutTexture,r),{src:t,size:n.size,domainMin:n.domainMin,domainMax:n.domainMax,textureWidth:r.width,textureHeight:r.height}}function Ct(e,t){e.deleteTexture(t.texture),e.deleteFramebuffer(t.framebuffer)}function cc(e){let t=e.effectTargets;t&&(e.gl.deleteProgram(t.blurProgram.program),Ct(e.gl,t.scratch),Ct(e.gl,t.blur),t.bloom&&Ct(e.gl,t.bloom),e.effectTargets=null)}function dc(e){let t=e.kuwaharaTargets;t&&(e.gl.deleteProgram(t.horizontalProgram.program),e.gl.deleteProgram(t.resolveProgram.program),Ct(e.gl,t.moments),Ct(e.gl,t.output),e.kuwaharaTargets=null)}function Ga(e,t=!1){cc(e),dc(e),F1(e.gl,e.program),t&&e.gl.getExtension("WEBGL_lose_context")?.loseContext()}function F1(e,t){e.deleteTexture(t.texture),e.deleteTexture(t.lutTexture),e.deleteTexture(t.advancedTexture),e.deleteBuffer(t.quad),e.deleteProgram(t.program)}function I1(e){let t=lc(e.canvas);return t?(Ga(e),e.gl=t.gl,e.program=t.program,e.lut=null,e.lutLoadingSrc=null,e.lutError=null,e.effectError=null,!0):!1}function sc(e){if(!e.sourceHidden)return;e.element.removeAttribute(vn);let t=e.element.style.getPropertyValue("opacity"),n=e.element.style.getPropertyPriority("opacity");t==="0"&&n==="important"&&(e.sourceInlineOpacity===null?e.element.style.removeProperty("opacity"):e.element.style.setProperty("opacity",e.sourceInlineOpacity,e.sourceInlineOpacityPriority)),e.sourceHidden=!1}function D1(e){if(e.effectTargets)return e.effectTargets;let{gl:t}=e,n=_1(t,e.program.quad),r=Oi(t),i=Oi(t);return!n||!r||!i?(n&&t.deleteProgram(n.program),r&&Ct(t,r),i&&Ct(t,i),e.effectError="Framebuffer effects unavailable",null):(e.effectError=null,e.effectTargets={blurProgram:n,scratch:r,blur:i,bloom:null},e.effectTargets)}function P1(e,t){return t.bloom||(t.bloom=Oi(e.gl),e.effectError=t.bloom?null:"Framebuffer effects unavailable"),t.bloom}function Y0(e){let t=e.effectTargets;t?.bloom&&(Ct(e.gl,t.bloom),t.bloom=null)}function O1(e){if(e.kuwaharaTargets)return e.kuwaharaTargets;let{gl:t}=e,n=t.getExtension("OES_texture_half_float"),r=t.getExtension("EXT_color_buffer_half_float");if(!n||!r)return e.effectError="Kuwahara requires half-float framebuffer support",null;let i=C1(t,e.program.quad),o=R1(t,e.program.quad),a=Oi(t,n.HALF_FLOAT_OES,t.NEAREST),s=Oi(t);return!i||!o||!a||!s?(H1(t,i,o,a,s),e.effectError="Kuwahara framebuffer effects unavailable",null):(e.kuwaharaTargets={horizontalProgram:i,resolveProgram:o,moments:a,output:s},e.kuwaharaTargets)}function H1(e,t,n,r,i){t&&e.deleteProgram(t.program),n&&e.deleteProgram(n.program),r&&Ct(e,r),i&&Ct(e,i)}function ib(e,t,n,r,i){let o=Math.max(1,Math.ceil(r)),a=Math.max(1,Math.ceil(i));return Ba(e,t,o,a),Ba(e,n,o,a),{width:o,height:a}}function Ua(e,t,n,r,i,o,a,s=!1,l=-1){e.bindFramebuffer(e.FRAMEBUFFER,r.framebuffer),e.viewport(0,0,i.width,i.height),e.useProgram(t.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(t.source,0),e.uniform2f(t.resolution,i.width,i.height),e.uniform2f(t.direction,o.x,o.y),e.uniform1f(t.radius,a),e.uniform1f(t.bloomPass,s?1:0),e.uniform1f(t.threshold,l),Hi(e,t)}function G1(e,t,n,r,i,o,a){let s=ib(e,t.scratch,r,i/2,o/2),l=a/2;Ua(e,t.blurProgram,n,t.scratch,s,{x:1,y:0},l,!0,.5),Ua(e,t.blurProgram,t.scratch.texture,r,s,{x:0,y:1},l,!0)}function B1(e,t,n,r,i,o,a){let s=n;for(let l=0;l<Math.max(1,Math.floor(a));l++)Ua(e,t.blurProgram,s,t.scratch,i,{x:1,y:0},o),Ua(e,t.blurProgram,t.scratch.texture,r,i,{x:0,y:1},o),s=r.texture}function Hi(e,t){e.bindBuffer(e.ARRAY_BUFFER,t.quad),e.enableVertexAttribArray(t.position),e.vertexAttribPointer(t.position,2,e.FLOAT,!1,0,0),e.drawArrays(e.TRIANGLE_STRIP,0,4)}function U1(e,t,n,r,i,o,a,s){Ba(e,t.moments,i.width,i.height),Ba(e,t.output,i.width,i.height);let l=t.horizontalProgram;e.bindFramebuffer(e.FRAMEBUFFER,t.moments.framebuffer),e.viewport(0,0,i.width,i.height),e.useProgram(l.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,r),e.uniform1i(l.source,0),e.uniform1i(l.blurSource,1),e.uniform2f(l.texel,1/i.width,1/i.height),e.uniform2f(l.uvScale,o.scaleX,o.scaleY),e.uniform2f(l.uvOffset,o.offsetX,o.offsetY),e.uniform1f(l.blurReady,a?1:0),e.uniform1f(l.blur,s.blur),e.uniform1f(l.radius,s.kuwaharaRadius),Hi(e,l);let u=t.resolveProgram;e.bindFramebuffer(e.FRAMEBUFFER,t.output.framebuffer),e.useProgram(u.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t.moments.texture),e.uniform1i(u.moments,0),e.uniform2f(u.texel,1/i.width,1/i.height),e.uniform1f(u.radius,s.kuwaharaRadius),e.uniform1f(u.sharpness,s.kuwaharaSharpness),e.uniform1f(u.saturation,s.kuwaharaSaturation),Hi(e,u)}function V1(e,t,n,r){if(n<=0)return!1;let i=ib(e.gl,t.scratch,t.blur,r.width,r.height);return B1(e.gl,t,e.program.texture,t.blur,i,.75+Math.pow(n,1.35)*32,n>.55?3:2),!0}function W1(e,t,n,r,i,o){if(n<=0)return Y0(e),null;o||Y0(e);let a=o?P1(e,t):t.blur;return a?(G1(e.gl,t,e.program.texture,a,i.width,i.height,r),a.texture):null}function $1(e,t,n,r){let{program:i}=e,o=t.effects.blur,a=t.effects.bloom;if(o<=0&&a<=0)return e.effectTargets&&r&&cc(e),{blurReady:!1,bloomReady:!1,blurTexture:i.texture,bloomTexture:i.texture};let s=D1(e);if(!s)return{blurReady:!1,bloomReady:!1,blurTexture:i.texture,bloomTexture:i.texture};let l=V1(e,s,o,n),u=W1(e,s,a,t.effects.bloomRadius,n,l);return{blurReady:l,bloomReady:u!==null,blurTexture:s.blur.texture,bloomTexture:u??i.texture}}function q1(e,t,n,r,i,o,a){let s=t.effects.kuwahara;if(s<=0&&!o)return e.kuwaharaTargets&&a&&dc(e),{kuwaharaReady:!1,kuwaharaTexture:e.program.texture};let l=O1(e);return!l||s<=0?{kuwaharaReady:!1,kuwaharaTexture:l?.output.texture??e.program.texture}:(U1(e.gl,l,e.program.texture,e.effectTargets?.blur.texture??e.program.texture,n,r,i,t.effects),{kuwaharaReady:!0,kuwaharaTexture:l.output.texture})}function ob(e,t,n,r,i={}){let o=i.releaseIdleTargets??!0;e.effectError=null;let a=$1(e,t,n,o),s=q1(e,t,n,r,a.blurReady,i.preserveKuwahara??!1,o);return{...a,...s}}function z1(e){let t=e.grading.lut?.src.trim()??"",n=e.grading.lut?.intensity??1;if(!t||n<=0)return e.lut=null,e.lutLoadingSrc=null,e.lutError=null,null;let r=tb(t);if("error"in r)return e.lut=null,e.lutLoadingSrc=null,e.lutError=r.error,null;if(e.lut?.src===r.href)return e.lut;e.lut=null;let i=uc(t);return i.state==="ready"?K0(e,r.href,i.lut):i.state==="error"?(e.lutError=i.message,e.lutLoadingSrc=null,null):(e.lutLoadingSrc!==r.href&&(e.lutLoadingSrc=r.href,e.lutError=null,i.promise.then(o=>{e.destroyed||e.grading.lut?.src.trim()!==t||(K0(e,r.href,o),it(e))},o=>{e.destroyed||e.grading.lut?.src.trim()!==t||(e.lut=null,e.lutError=Wa(o),e.lutLoadingSrc=null,it(e))})),null)}function Di(e){if(!e)return null;if(typeof e=="string"){let t=e.trim();if(!t)return null;let n=document.getElementById(t.replace(/^#/,""));if(n&&rn(n))return n;try{let r=document.querySelector(t);return r&&rn(r)?r:null}catch{return null}}if(e.hfId){let t=document.querySelector(`[data-hf-id="${CSS.escape(e.hfId)}"]`);if(t&&rn(t))return t}if(e.id){let t=document.getElementById(e.id);if(t&&rn(t))return t}if(!e.selector)return null;try{let t=Array.from(document.querySelectorAll(e.selector)),n=Math.max(0,Math.floor(Number(e.selectorIndex??0)||0)),r=t[n]??null;return r&&rn(r)?r:null}catch{return null}}function ab(e){return xe(e)?e.videoWidth>0&&e.videoHeight>0?{width:e.videoWidth,height:e.videoHeight}:null:Pe(e)&&e.naturalWidth>0&&e.naturalHeight>0?{width:e.naturalWidth,height:e.naturalHeight}:null}function sb(e){return xe(e)?e.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&e.videoWidth>0&&e.videoHeight>0:Pe(e)?e.complete&&e.naturalWidth>0&&e.naturalHeight>0:!1}function lb(e){let t=It(e);return t&&sb(t)?t:null}function X0(e){if(!xe(e))return!1;let t=lb(e);if(!t)return!1;let n=window.getComputedStyle(t);return n.display!=="none"&&n.visibility!=="hidden"}function j1(e){return Pe(e)&&e.classList.contains("__render_frame__")}function K1(e,t){t.parentNode&&t.nextSibling!==e.canvas&&t.parentNode.insertBefore(e.canvas,t.nextSibling)}function ub(e){if(xe(e)){let t=lb(e);if(t)return t}return sb(e)?e:null}function J0(e,t){let n=e.toLowerCase();if(n==="center")return .5;if(t==="x"){if(n==="left")return 0;if(n==="right")return 1}else{if(n==="top")return 0;if(n==="bottom")return 1}if(n.endsWith("%")){let r=Number.parseFloat(n);return Number.isFinite(r)?r/100:null}return null}function Y1(e){let t=e.trim().split(/\\s+/).filter(Boolean),n=.5,r=.5;for(let i=0;i<t.length;i++){let o=t[i]??"",a=J0(o,"x"),s=J0(o,"y");if(a!==null&&(o==="left"||o==="right"||o.endsWith("%")&&i===0)){n=a;continue}if(s!==null&&(o==="top"||o==="bottom"||o.endsWith("%")&&i>0)){r=s;continue}}return{x:n,y:r}}function cb(e,t,n,r,i,o){if(e<=0||t<=0||n<=0||r<=0)return{scaleX:1,scaleY:1,offsetX:0,offsetY:0};let a=i||"fill",s=e,l=t;if(a==="contain"||a==="cover"||a==="scale-down"){let m=a==="cover"?Math.max(e/n,t/r):Math.min(e/n,t/r);s=n*m,l=r*m,a==="scale-down"&&s>n&&l>r&&(s=n,l=r)}else a==="none"&&(s=n,l=r);let u=Y1(o||"center"),d=(e-s)*u.x/e,f=(t-l)*u.y/t;return{scaleX:s/e,scaleY:l/t,offsetX:d,offsetY:f}}function X1(e,t){window.getComputedStyle(t).position==="static"&&(e.touchedParent||(e.touchedParent=t,e.parentInlinePosition=t.style.position||null),t.style.position="relative")}function Q0(e,t){return Math.max(0,Math.round(e>0?e:t))}function J1(e,t){let{element:n,canvas:r}=e,i=n.parentElement;i&&X1(e,i);let o=window.getComputedStyle(t);Vo(r.style,o),r.style.pointerEvents="none",r.style.position="absolute",r.style.inset="auto",r.style.left=`${n.offsetLeft}px`,r.style.top=`${n.offsetTop}px`,r.style.right="auto",r.style.bottom="auto",r.style.width=`${n.offsetWidth}px`,r.style.height=`${n.offsetHeight}px`,r.style.display="block",r.style.opacity=e.sourceOpacityForCanvas,r.style.visibility=e.sourceVisibleForCanvas?"visible":"hidden";let a=n.getBoundingClientRect(),s=Q0(n.offsetWidth,a.width),l=Q0(n.offsetHeight,a.height);if(s<=0||l<=0)return r.style.display="none",null;let u=Math.max(1,window.devicePixelRatio||1),d=Math.round(s*u),f=Math.round(l*u);return r.width!==d&&(r.width=d),r.height!==f&&(r.height=f),{width:d,height:f}}function fr(e,t,n){e.uniform3f(t,Number.parseInt(n.slice(1,3),16)/255,Number.parseInt(n.slice(3,5),16)/255,Number.parseInt(n.slice(5,7),16)/255)}function Tn(e,t,n,r){e.set(r,(t*vt+n)*4)}function on(e,t){return Math.min(1,Math.max(1/255,(e*(127/t)+128)/255))}function oc(e,t,n){return e.length>=3?Il(e,t,n):new Float32Array(vt)}function Rn(e,t){return e[t]??0}function Q1(e,t,n){let r=Zn(t.red),i=Zn(t.green),o=Zn(t.blue),a=Zn(t.master),s=oc(n.hueVsHue,-180,180),l=oc(n.hueVsSaturation,-1,1),u=oc(n.hueVsLuma,-1,1);for(let d=0;d<vt;d+=1)Tn(e,0,d,[Rn(r,d),Rn(i,d),Rn(o,d),Rn(a,d)]),Tn(e,1,d,[on(Rn(s,d),180),on(Rn(l,d),1),on(Rn(u,d),1),1])}function Z1(e,t,n){let r=n*b1;Tn(e,2,r,[t.key.hue.center/360,t.key.hue.range/180,t.key.hue.softness/180,1]),Tn(e,2,r+1,[t.key.saturation.min,t.key.saturation.max,t.key.saturation.softness/.5,0]),Tn(e,2,r+2,[t.key.luma.min,t.key.luma.max,t.key.luma.softness/.5,0]),Tn(e,2,r+3,[on(t.correction.hueShift,180),on(t.correction.saturation,1),on(t.correction.luma,1),on(t.correction.temperature,1)]),Tn(e,2,r+4,[on(t.correction.tint,1),.5,.5,1])}function eR(e,t,n){let r=new Float32Array(vt*Bi*4);Q1(r,e,t);let i=0;for(let o of n)o.enabled&&(Z1(r,o,i),i+=1);return r}var Z0=new WeakMap;function tR(e,t,n){let r=Z0.get(e);if(r?.hueCurves===t&&r.secondaries===n)return r.signature;let i=JSON.stringify([e,t,n]);return Z0.set(e,{hueCurves:t,secondaries:n,signature:i}),i}function nR(e,t,n,r){let{curves:i,hueCurves:o}=n,a=tR(i,o,r);if(t.advancedSignature===a)return;let s=Uint8Array.from(eR(i,o,r),oi);e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,t.advancedTexture),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,vt,Bi,0,e.RGBA,e.UNSIGNED_BYTE,s),t.advancedSignature=a}function ac(e,t,n){e.uniform3f(t,n.hue/360,n.amount,n.level)}function db(e,t,n,r,i,o,a,s,l,u,d,f){e.uniform1i(t.source,0),e.uniform1i(t.blurSource,1),e.uniform1i(t.lut,2),e.uniform1i(t.kuwaharaSource,3),e.uniform1i(t.bloomSource,4),e.uniform1i(t.advanced,5),e.uniform2f(t.resolution,l.width,l.height),e.uniform2f(t.uvScale,u.scaleX,u.scaleY),e.uniform2f(t.uvOffset,u.offsetX,u.offsetY),e.uniform1f(t.blurReady,i?1:0),e.uniform1f(t.bloomReady,o?1:0),e.uniform1f(t.kuwaharaReady,a?1:0),e.uniform1f(t.lutEnabled,r?1:0),e.uniform1f(t.lutSize,r?.size??2),e.uniform2f(t.lutTextureSize,r?.textureWidth??1,r?.textureHeight??1),e.uniform3f(t.lutDomainMin,r?.domainMin[0]??0,r?.domainMin[1]??0,r?.domainMin[2]??0),e.uniform3f(t.lutDomainMax,r?.domainMax[0]??1,r?.domainMax[1]??1,r?.domainMax[2]??1),e.uniform1f(t.lutIntensity,n.lut?.intensity??0);let{curves:m,hueCurves:p,secondaries:g}=n,b=ql(m),y=zl(p),v=jl(g)?g.reduce((T,P)=>T+Number(P.enabled),0):0;(b||y||v>0)&&nR(e,t,n,g),ac(e,t.shadowWheel,n.wheels.shadows),ac(e,t.midtoneWheel,n.wheels.midtones),ac(e,t.highlightWheel,n.wheels.highlights),e.uniform1f(t.rgbCurvesEnabled,b?1:0),e.uniform1f(t.hueCurvesEnabled,y?1:0),e.uniform1f(t.secondaryCount,v);for(let[T,P]of t.adjustUniforms)e.uniform1f(P,n.adjust[T]);for(let[T,P]of t.detailUniforms)e.uniform1f(P,n.details[T]);e.uniform1f(t.grainSeed,d),e.uniform1f(t.effectTime,f);for(let[T,P]of t.effectUniforms)e.uniform1f(P,n.effects[T]);let A=n.palette??(n.effects.engraving>0||n.effects.crosshatch>0?h1:nc),E=A[A.length-1]??nc[1];e.uniform1f(t.paletteSize,A.length),fr(e,t.palette0,A[0]??nc[0]),fr(e,t.palette1,A[1]??E),fr(e,t.palette2,A[2]??E),fr(e,t.palette3,A[3]??E),fr(e,t.palette4,A[4]??E),fr(e,t.palette5,A[5]??E),e.uniform1f(t.intensity,n.intensity),e.uniform1f(t.compareEnabled,s.enabled?1:0),e.uniform1f(t.comparePosition,s.position),e.uniform1f(t.compareSoftness,s.softness),e.uniform1f(t.compareLineWidth,s.lineWidth)}function rR(e){if(!e.sourceHidden){let t=e.element.getAttribute(En);t!==null?(e.sourceInlineOpacity=t===""?null:t,e.sourceInlineOpacityPriority=""):(e.sourceInlineOpacity=e.element.style.getPropertyValue("opacity")||null,e.sourceInlineOpacityPriority=e.element.style.getPropertyPriority("opacity"))}e.element.setAttribute(vn,"true"),e.element.style.setProperty("opacity","0","important"),e.sourceHidden=!0}function Ht(e){let t=Vp.find(n=>n.path===e);if(!t)throw new Error(`Missing color-grading animation property: ${e}`);return t}var mb=Ht("intensity"),fb=Ht("lut.intensity"),pb=Ht("adjust.exposure"),hb=Ht("effects.kuwahara"),gb=[["blur",Ht("effects.blur")],["bloom",Ht("effects.bloom")],["kuwahara",hb],["pixelate",Ht("effects.pixelate")],["ascii",Ht("effects.ascii")],["dither",Ht("effects.dither")]],bb=[mb,fb,pb,...gb.map(([,e])=>e)];function kn(e,t){let n=e.style.getPropertyValue(t.name);if(!n)return null;let r=Number(n);return Number.isFinite(r)?Math.min(t.max,Math.max(t.min,r)):null}function Pi(e,t){return t!==null&&(zp(t)||bb.some(n=>kn(e,n)!==null))}function iR(e,t){let n=null;for(let[r,i]of gb){let o=kn(e,i);o!==null&&(n??(n={...t.effects}),n[r]=o)}return n}function oR(e){let{element:t,grading:n}=e,r=kn(t,mb),i=kn(t,fb),o=kn(t,pb),a=iR(t,n);if(![r,i,o].some(u=>u!==null)&&a===null)return n;let l={...n,adjust:o===null?n.adjust:{...n.adjust,exposure:o},effects:a??n.effects};return r!==null&&(l.intensity=r),n.lut&&i!==null&&(l.lut={...n.lut,intensity:i}),l}function yb(e,t,n){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n)}function xb(e,t,n){let r=[t.texture,n.blurTexture,t.lutTexture,n.kuwaharaTexture,n.bloomTexture,t.advancedTexture];for(let[i,o]of r.entries())e.activeTexture(e.TEXTURE0+i),e.bindTexture(e.TEXTURE_2D,o)}function it(e){if(e.destroyed||e.contextLost)return!1;let t=ub(e.element);if(!t)return e.hasDrawn||(e.canvas.style.display="none"),!1;let n=ab(t);if(!n)return!1;let r=ye(t)?t:e.element,i=e.element.style.getPropertyValue("opacity"),o=e.element.style.getPropertyPriority("opacity"),a=e.sourceHidden&&i==="0"&&o==="important",s=e.element.style.getPropertyValue("visibility"),l=j1(t);l&&K1(e,t),a&&!l&&(e.sourceInlineOpacity!==null?e.element.style.setProperty("opacity",e.sourceInlineOpacity,e.sourceInlineOpacityPriority||""):e.element.style.removeProperty("opacity"));let u=window.getComputedStyle(l?t:e.element);e.sourceOpacityForCanvas=u.opacity||"1",a&&!l&&e.element.style.setProperty("opacity","0","important"),e.sourceVisibleForCanvas=(l||s!=="hidden")&&u.visibility!=="hidden";let d=J1(e,r);if(!d)return!1;let f=window.getComputedStyle(r),m=cb(d.width,d.height,n.width,n.height,f.objectFit,f.objectPosition),{gl:p,program:g}=e;try{let b=oR(e),y=z1(e);yb(p,g.texture,t);let v=kn(e.element,hb)!==null,A=ob(e,b,d,m,{preserveKuwahara:v});p.bindFramebuffer(p.FRAMEBUFFER,null),p.viewport(0,0,d.width,d.height),p.useProgram(g.program),xb(p,g,A);let E=window.__player?.getTime?.(),T=typeof E=="number"&&Number.isFinite(E)?Math.max(0,E):xe(e.element)?Math.max(0,e.element.currentTime):0,P=e.grainSeed+Math.floor(T*60);return db(p,g,b,y,A.blurReady,A.bloomReady,A.kuwaharaReady,e.compare,d,m,P,T),Hi(p,g),rR(e),e.hasDrawn=!0,e.drawError=null,!0}catch(b){return e.drawError=b instanceof Error?b.message:"Shader draw failed",O("runtime.colorGrading.drawEntry",b),!1}}function aR(e,t,n){let r=e.getBoundingClientRect(),i=e.offsetWidth||r.width||t.width,o=e.offsetHeight||r.height||t.height,a=Math.min(320,Math.max(64,Math.round(n??160))),s=i>0&&o>0?i/o:t.width/t.height;return s>=1?{width:a,height:Math.max(1,Math.round(a/s))}:{width:Math.max(1,Math.round(a*s)),height:a}}function sR(){let e=document.createElement("canvas"),t=lc(e);return t?{canvas:e,...t,lut:null,effectTargets:null,kuwaharaTargets:null,effectError:null}:null}function lR(e,t){let n=t?void 0:window.__player?.getTime?.();return typeof n=="number"&&Number.isFinite(n)?Math.max(0,n):xe(e)?Math.max(0,e.currentTime):0}function uR(e,t,n,r){let i=ub(t);if(!i)return null;let o=ab(i);if(!o)return null;let a=aR(t,o,n);e.canvas.width=a.width,e.canvas.height=a.height;let s=ye(i)?i:t,l=window.getComputedStyle(s),u=cb(a.width,a.height,o.width,o.height,l.objectFit,l.objectPosition);return yb(e.gl,e.program.texture,i),{dimensions:a,uv:u,effectTime:lR(t,r),grainSeed:nb(t)+(xe(t)?Math.floor(t.currentTime*60):0)}}async function cR(e,t,n,r,i=!1){let o=uR(e,t,r,i);if(!o)return null;let{dimensions:a,uv:s,grainSeed:l,effectTime:u}=o,d=[];for(let f of n.slice(0,32)){let m=ia(f.grading);if(!m){d.push({id:f.id,dataUrl:null,error:"Invalid grading"});continue}let p=null;try{m.lut&&(e.lut?.src!==m.lut.src&&(e.lut=N1(e,m.lut.src,await L1(m.lut.src))),p=e.lut),d.push({id:f.id,dataUrl:dR(e,m,p,a,s,l,u)})}catch(g){d.push({id:f.id,dataUrl:null,error:Wa(g)})}}return{...a,images:d}}function dR(e,t,n,r,i,o,a){let{canvas:s,gl:l,program:u}=e,d=ob(e,t,r,i,{releaseIdleTargets:!1});return l.bindFramebuffer(l.FRAMEBUFFER,null),l.viewport(0,0,r.width,r.height),l.useProgram(u.program),xb(l,u,d),n||(e.lut=null),db(l,u,t,n,d.blurReady,d.bloomReady,d.kuwaharaReady,pr,r,i,o,a),Hi(l,u),s.toDataURL("image/png")}function _t(e,t,n,r){t.addEventListener(n,r),e.cleanup.push(()=>t.removeEventListener(n,r))}function mR(e){e.animationFrame!==null&&(window.cancelAnimationFrame(e.animationFrame),e.animationFrame=null),e.videoFrameHandle!==null&&xe(e.element)&&(e.element.cancelVideoFrameCallback?.(e.videoFrameHandle),e.videoFrameHandle=null)}function Gi(e){if(e.destroyed||!xe(e.element)||e.videoFrameHandle!==null||e.animationFrame!==null)return;let t=e.element,n=t;if(typeof n.requestVideoFrameCallback=="function"){e.videoFrameHandle=n.requestVideoFrameCallback(()=>{e.videoFrameHandle=null,it(e),!e.destroyed&&!t.paused&&!t.ended&&Gi(e)});return}e.animationFrame=window.requestAnimationFrame(()=>{e.animationFrame=null,it(e),!e.destroyed&&!t.paused&&!t.ended&&Gi(e)})}function fR(e){let t=()=>{it(e)};if(_t(e,e.element,"load",t),_t(e,e.element,"loadedmetadata",t),_t(e,e.element,"loadeddata",t),_t(e,e.element,"seeked",t),_t(e,e.element,"timeupdate",t),_t(e,window,"resize",t),xe(e.element)&&(_t(e,e.element,"play",()=>Gi(e)),_t(e,e.element,"pause",t)),_t(e,e.canvas,"webglcontextlost",n=>{n.preventDefault(),e.contextLost=!0,e.drawError="WebGL context lost",e.canvas.style.display="none",sc(e)}),_t(e,e.canvas,"webglcontextrestored",()=>{if(e.contextLost=!1,!I1(e)){e.contextLost=!0,e.drawError="WebGL context restore failed",sc(e);return}e.drawError=null,it(e)}),typeof ResizeObserver<"u"&&(e.resizeObserver=new ResizeObserver(t),e.resizeObserver.observe(e.element)),typeof MutationObserver<"u"){let n=()=>{let a=e.element.style;return`${a.transform}|${a.translate}|${a.rotate}|${a.scale}|${a.left}|${a.top}|${a.width}|${a.height}`},r=n(),i=!1,o=new MutationObserver(()=>{i||n()!==r&&(i=!0,requestAnimationFrame(()=>{i=!1,r=n(),it(e)}))});o.observe(e.element,{attributes:!0,attributeFilter:["style"]}),e.cleanup.push(()=>o.disconnect())}}function pR(e){if(e.destroyed)return null;e.destroyed=!0,mR(e),e.resizeObserver?.disconnect();for(let t of e.cleanup)t();return e.cleanup.length=0,e.canvas.remove(),cc(e),dc(e),sc(e),e.touchedParent&&(e.parentInlinePosition===null?e.touchedParent.style.removeProperty("position"):e.touchedParent.style.position=e.parentInlinePosition),{canvas:e.canvas,gl:e.gl,program:e.program,effectTargets:null,kuwaharaTargets:null,effectError:null}}function Sb(e,t){return e.removeAttribute("style"),t.id?e.id=`${Op}${t.id}`:e.removeAttribute("id"),e.className=m1,e.setAttribute(d1,"true"),e.setAttribute("data-hyperframes-ignore",""),e.setAttribute("data-hyperframes-picker-ignore",""),e.setAttribute("data-hf-ignore",""),e.setAttribute("aria-hidden","true"),e.style.pointerEvents="none",e.style.display="none",t.parentNode?.insertBefore(e,t.nextSibling),e}function hR(e){return Sb(document.createElement("canvas"),e)}function vb(e){let t=new WeakMap,n=new Set,r=[],i=null,o=null,a=Promise.resolve(),s=!1,l=(R,M,k)=>{let U=t.get(R);if(U)return U.grading=M,U.source=k,it(U),xe(R)&&!R.paused&&Gi(U),!0;let K=r.pop();if(K)Sb(K.canvas,R);else{let L=hR(R),C=lc(L);if(!C)return L.remove(),!1;K={canvas:L,gl:C.gl,program:C.program,effectTargets:null,kuwaharaTargets:null,effectError:null}}let X={element:R,...K,grading:M,compare:{...pr},lut:null,lutLoadingSrc:null,lutError:null,drawError:null,effectTargets:null,kuwaharaTargets:null,effectError:null,source:k,animationFrame:null,videoFrameHandle:null,resizeObserver:null,cleanup:[],touchedParent:null,parentInlinePosition:null,sourceHidden:!1,sourceInlineOpacity:null,sourceInlineOpacityPriority:"",sourceOpacityForCanvas:window.getComputedStyle(R).opacity||"1",sourceVisibleForCanvas:window.getComputedStyle(R).visibility!=="hidden",hasDrawn:!1,contextLost:!1,grainSeed:nb(R),destroyed:!1};return t.set(R,X),n.add(R),fR(X),it(X),xe(R)&&!R.paused&&Gi(X),!0},u=(R,M)=>{if(s)return!1;let k=Di(R);if(!k)return!1;let U=t.get(k);if(!U){let K=Oa(k);if(!Pi(k,K)||!l(k,K,"attribute"))return!1;U=t.get(k)}return U?(U.compare=k1(M),it(U),!0):!1},d=R=>{let M=t.get(R);if(!M)return;let k=pR(M);k&&(M.contextLost||r.length>=p1?Ga(k,!0):r.push(k)),t.delete(R),n.delete(R)},f=()=>{if(s)return 0;let R=new Set;document.querySelectorAll(`video[${si}], img[${si}]`).forEach(k=>{if(!rn(k))return;R.add(k);let U=Oa(k);Pi(k,U)&&(q0(k)||X0(k))?l(k,U,"attribute"):d(k)});for(let k of n){let U=t.get(k);U&&(!k.isConnected||U.source==="attribute"&&!R.has(k))&&d(k)}return n.size},m=()=>{if(s)return 0;let R=0;for(let M of n){let k=t.get(M);k&&it(k)&&(R+=1)}return R},p=async()=>{let R=new Set;for(let M of n){let k=t.get(M)?.grading.lut;if(!k?.src.trim()||(k.intensity??1)<=0)continue;let U=uc(k.src);U.state==="pending"&&R.add(U.promise)}return R.size>0&&await Promise.allSettled(R),m(),R.size},g=()=>{if(s)return 0;let R=0;for(let M of n){let k=t.get(M);!k||!bb.some(K=>kn(M,K)!==null)||xe(M)&&!M.paused&&!M.ended||it(k)&&(R+=1)}return R},b=(R,M)=>{if(s)return!1;let k=Di(R);if(!k)return!1;let U=ia(M);return Pi(k,U)?l(k,U,"live"):(d(k),!0)},y=(R,M)=>{if(!rn(R))return!1;let k=t.get(R);if(!k){if(!M)return!1;let U=Oa(R);return Pi(R,U)&&l(R,U,"attribute")}return k.sourceVisibleForCanvas=M,!M&&k.source==="attribute"&&d(R),!0},v=R=>rn(R)&&t.has(R),A=R=>{let M=Di(R);if(!M)return{state:"missing",message:"Media not found"};let k=t.get(M);if(k)return k.effectError?{state:"unavailable",message:k.effectError}:k.drawError?{state:"unavailable",message:k.drawError}:k.lutError?{state:"unavailable",message:`LUT error: ${k.lutError}`}:k.grading.lut&&k.lutLoadingSrc?{state:"pending",message:"Loading LUT"}:k.canvas.style.display==="none"?{state:"pending",message:"Waiting for media frame"}:{state:"active",message:k.lut?"Shader + LUT active":"Shader active"};let U=Oa(M);return Pi(M,U)?!q0(M)&&!X0(M)?{state:"pending",message:"Waiting for visible media"}:{state:"unavailable",message:"WebGL unavailable"}:{state:"inactive",message:"No grading applied"}},E=async(R,M,k)=>{let U=async()=>{if(s||M.length===0)return null;let X=Di(R);return!X||(o??(o=sR()),!o)?null:cR(o,X,M,k?.maxDimension,k?.useMediaTime)},K=a.then(U,U);return a=K.then(()=>{},()=>{}),K},T=R=>{let M=Di(R);if(!xe(M))return null;if(!M.paused)return()=>{};let k=M.currentTime,U=M.loop,K=M.muted;return M.loop=!0,M.muted=!0,(M.ended||Number.isFinite(M.duration)&&k>=M.duration)&&(M.currentTime=0),e?.lease(M),M.play().catch(()=>{}),()=>{e?.release(M),M.pause(),M.loop=U,M.muted=K,M.currentTime=k}},P=()=>{if(!s){s=!0,i?.disconnect(),i=null;for(let R of n)d(R);for(let R of r)Ga(R,!0);r.length=0,o&&(Ga(o,!0),o=null)}};document.body&&(i=new MutationObserver(()=>f()),i.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[si]}));let N={refresh:f,redraw:m,redrawAnimated:g,waitForActiveLuts:p,setGrading:b,setCompare:u,setSourceVisibility:y,isGraded:v,getStatus:A,renderPreviews:E,startPreviewPlayback:T,destroy:P},D=window;return D.__hf=D.__hf||{},D.__hf.colorGrading=N,f(),N}var gR={mulX:374761393,mulY:668265263,mulMix:1274126177,offset:2654435769,shift1:13,shift2:16,divisor:4294967296},{mulX:bR,mulY:yR,mulMix:Eb,offset:xR,shift1:SR,shift2:vR,divisor:ER}=gR,AR=20,Ab=`#version 300 es\nprecision highp float;\nprecision highp int;\n\nin vec2 v_uv;\nout vec4 fragColor;\n\nuniform vec2 u_size;\nuniform float u_t;\nuniform float u_fps;\nuniform float u_fractalType;\nuniform float u_noiseType;\nuniform float u_invert;\nuniform float u_contrast;\nuniform float u_brightness;\nuniform float u_scale;\nuniform float u_complexity;\nuniform float u_subInfluence;\nuniform float u_subScaling;\nuniform float u_evolution;\nuniform float u_randomSeed;\nuniform float u_opacity;\n\nfloat hfHashUnit(int ix, int iy, int seed) {\n  uint h = ((uint(ix) * ${bR}u) ^ (uint(iy) * ${yR}u) ^ (uint(seed) * ${Eb}u)) + ${xR}u;\n  h = h ^ (h >> ${SR}u);\n  h = h * ${Eb}u;\n  h = h ^ (h >> ${vR}u);\n  return float(h) / ${ER}.0;\n}\n\nfloat hfFade(float f, float noiseType) {\n  if (noiseType < 1.5) return 0.0;\n  if (noiseType < 2.5) return f;\n  if (noiseType < 3.5) return f * f * (3.0 - 2.0 * f);\n  return f * f * f * (f * (f * 6.0 - 15.0) + 10.0);\n}\n\nfloat hfValueNoise(vec2 p, int seed) {\n  vec2 cell = floor(p);\n  vec2 f = p - cell;\n  int ix = int(cell.x);\n  int iy = int(cell.y);\n  float sx = hfFade(f.x, u_noiseType);\n  float sy = hfFade(f.y, u_noiseType);\n  float bottom = mix(hfHashUnit(ix, iy, seed), hfHashUnit(ix + 1, iy, seed), sx);\n  float top = mix(hfHashUnit(ix, iy + 1, seed), hfHashUnit(ix + 1, iy + 1, seed), sx);\n  return mix(bottom, top, sy);\n}\n\nfloat hfFbm(vec2 p) {\n  float lacunarity = 100.0 / max(u_subScaling, 1.0);\n  float gain = u_subInfluence / 100.0;\n  int seed = int(u_randomSeed);\n  float amp = 1.0;\n  float freq = 1.0;\n  float sum = 0.0;\n  float norm = 0.0;\n  for (int i = 0; i < ${AR}; i++) {\n    if (float(i) >= u_complexity) break;\n    sum += amp * hfValueNoise(p * freq, seed + i);\n    norm += amp;\n    amp *= gain;\n    freq *= lacunarity;\n  }\n  return norm > 0.0 ? sum / norm : 0.0;\n}\n\nvoid main() {\n  vec2 px = v_uv * u_size;\n  vec2 p = px / max(u_scale, 1.0) + vec2(u_evolution, u_evolution * 0.5);\n  float v = hfFbm(p);\n  v = (v - 0.5) * (u_contrast / 100.0) + 0.5 + u_brightness / 100.0;\n  if (u_invert > 0.5) v = 1.0 - v;\n  v = clamp(v, 0.0, 1.0);\n  float a = clamp(u_opacity / 100.0, 0.0, 1.0);\n  fragColor = vec4(v * a, v * a, v * a, a);\n}\n`;var mc={lumaR:.299,lumaG:.587,lumaB:.114},{lumaR:wR,lumaG:_R,lumaB:CR}=mc,wb=`#version 300 es\nprecision highp float;\n\nin vec2 v_uv;\nout vec4 fragColor;\n\nuniform vec2 u_size;\nuniform float u_t;\nuniform float u_fps;\nuniform sampler2D u_src;\nuniform sampler2D u_src2;\n// 1 when the map ref named another element, 0 when the map is the layer\n// itself. Set by the runtime for every pass, from whether a ref resolved.\nuniform float u_hasSrc2;\nuniform float u_useH;\nuniform float u_maxH;\nuniform float u_useV;\nuniform float u_maxV;\nuniform float u_behavior;\nuniform float u_edge;\nuniform float u_expand;\n\nvec4 hfSampleSrc(vec2 uv) {\n  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);\n  return texture(u_src, uv);\n}\n\n// The selector\'s value, in [0, 1]. Half and Off both land on 0.5, which is the\n// "no displacement" midpoint the caller subtracts.\nfloat hfMapChannel(vec4 premultiplied, float selector) {\n  vec3 rgb = premultiplied.a > 0.0 ? premultiplied.rgb / premultiplied.a : vec3(0.0);\n  if (selector < 1.5) return rgb.r;\n  if (selector < 2.5) return rgb.g;\n  if (selector < 3.5) return rgb.b;\n  if (selector < 4.5) return premultiplied.a;\n  if (selector < 8.5) return dot(rgb, vec3(${wR}, ${_R}, ${CR}));\n  if (selector < 9.5) return 1.0;\n  return 0.5;\n}\n\nvoid main() {\n  vec4 mapTexel = u_hasSrc2 > 0.5 ? texture(u_src2, v_uv) : texture(u_src, v_uv);\n  float h = hfMapChannel(mapTexel, u_useH);\n  float v = hfMapChannel(mapTexel, u_useV);\n  vec2 d = vec2((h - 0.5) * 2.0 * u_maxH, (v - 0.5) * 2.0 * u_maxV);\n  fragColor = hfSampleSrc(v_uv + d / u_size);\n}\n`;var{lumaR:RR,lumaG:TR,lumaB:kR}=mc;var _b=`#version 300 es\nprecision highp float;\n\nin vec2 v_uv;\nout vec4 fragColor;\n\nuniform vec2 u_size;\nuniform float u_t;\nuniform float u_fps;\nuniform sampler2D u_src;\nuniform sampler2D u_src2;\nuniform float u_mode;\n\n// The matte texel is premultiplied, so its rgb is already "over black" \\u2014 the\n// composite After Effects reads a luma matte through.\nfloat hfCoverage(vec4 matte, float mode) {\n  if (mode < 1.5) return matte.a;\n  if (mode < 2.5) return 1.0 - matte.a;\n  float luma = dot(matte.rgb, vec3(${RR}, ${TR}, ${kR}));\n  if (mode < 3.5) return luma;\n  return 1.0 - luma;\n}\n\nvoid main() {\n  vec4 src = texture(u_src, v_uv);\n  vec4 matte = texture(u_src2, v_uv);\n  fragColor = src * clamp(hfCoverage(matte, u_mode), 0.0, 1.0);\n}\n`;var MR={lcgMulA:1103515245,lcgMulB:12996205,lcgAdd:12345,highMask:32640,lowMask:255,byteScale:32704},{lcgMulA:LR,lcgMulB:NR,lcgAdd:Cb,highMask:FR,lowMask:IR,byteScale:DR}=MR,Rb=`#version 300 es\nprecision highp float;\n// NOT decoration: a fragment shader\'s default integer precision is mediump,\n// and a mediump uint is only guaranteed 16 bits (ESSL 3.00 \\xA74.5.2). Every step\n// below \\u2014 the Jenkins mix, both LCG rounds \\u2014 is defined by 32-bit wraparound,\n// so without this the hash is a different function on any implementation that\n// honours the minimum. ANGLE and SwiftShader both use 32-bit ints, which is\n// exactly why no test on this machine would catch it.\nprecision highp int;\n\nin vec2 v_uv;\nout vec4 fragColor;\n\nuniform vec2 u_size;\nuniform float u_t;\nuniform float u_fps;\nuniform sampler2D u_src;\nuniform float u_amount;\nuniform float u_useColorNoise;\nuniform float u_clipping;\n\n// Bob Jenkins\' 1997 integer mix, the six-round shift/xor/subtract sequence the\n// metallib runs verbatim. uint arithmetic wraps in GLSL ES 3.00, which is what\n// makes this bit-identical to the C original.\nuint hfJenkinsMix(uint a, uint b, uint c) {\n  a -= b; a -= c; a ^= (c >> 13u);\n  b -= c; b -= a; b ^= (a << 8u);\n  c -= a; c -= b; c ^= (b >> 13u);\n  a -= b; a -= c; a ^= (c >> 12u);\n  b -= c; b -= a; b ^= (a << 16u);\n  c -= a; c -= b; c ^= (b >> 5u);\n  a -= b; a -= c; a ^= (c >> 3u);\n  b -= c; b -= a; b ^= (a << 10u);\n  c -= a; c -= b; c ^= (b >> 15u);\n  return c;\n}\n\n// The hash\'s 15-bit output byte for one channel.\nfloat hfNoiseByte(uint a, uint y, uint seed) {\n  uint h = hfJenkinsMix(a, y, seed);\n  uint t2 = h * ${LR}u + ${Cb}u;\n  uint t4 = t2 * ${NR}u + ${Cb}u;\n  return float(((t4 >> 16u) & ${IR}u) ^ ((t2 >> 9u) & ${FR}u));\n}\n\nvoid main() {\n  vec4 src = texture(u_src, v_uv);\n  vec2 px = floor(v_uv * u_size);\n  uint x = uint(max(px.x, 0.0));\n  // After Effects indexes rows from the top; v_uv is y-up.\n  uint y = uint(max(u_size.y - 1.0 - px.y, 0.0));\n  float frame = floor(u_t * u_fps + 0.5);\n  uint seed = uint(max(frame, 0.0)) & 0xFFFFu;\n\n  float amount = u_amount * 0.01;\n  vec3 nz;\n  if (u_useColorNoise > 0.5) {\n    uint a = x * 3u;\n    nz = vec3(hfNoiseByte(a, y, seed), hfNoiseByte(a + 1u, y, seed), hfNoiseByte(a + 2u, y, seed));\n  } else {\n    nz = vec3(hfNoiseByte(x, y, seed));\n  }\n  nz = amount * (nz / ${DR}.0 - 0.5);\n\n  vec4 out4 = vec4(src.rgb + nz, src.a);\n  // A valid premultiplied colour needs rgb <= a component-wise; noise on a\n  // near-transparent texel can push rgb above it, which our fixed 8-bit RGBA\n  // storage cannot carry safely the way AE\'s float pipeline can (see the doc\n  // comment above). This runs before, and independently of, u_clipping.\n  out4.rgb = min(out4.rgb, out4.a);\n  fragColor = u_clipping > 0.5 ? clamp(out4, 0.0, 1.0) : out4;\n}\n`;var PR={tau:6.283185307179586,degreesPerTurn:360},{tau:OR,degreesPerTurn:HR}=PR,Tb=`#version 300 es\nprecision highp float;\n\nin vec2 v_uv;\nout vec4 fragColor;\n\nuniform vec2 u_size;\nuniform float u_t;\nuniform float u_fps;\nuniform sampler2D u_src;\nuniform float u_waveType;\nuniform float u_height;\nuniform float u_width;\nuniform float u_direction;\nuniform float u_speed;\nuniform float u_pinning;\nuniform float u_phase;\n\n// Outside the layer\'s own box there is nothing to warp in from, so the wave\n// carries transparency rather than a smeared edge pixel.\nvec4 hfSampleSrc(vec2 uv) {\n  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);\n  return texture(u_src, uv);\n}\n\nvoid main() {\n  vec2 px = v_uv * u_size;\n  float dir = radians(u_direction);\n  vec2 travel = vec2(sin(dir), -cos(dir));\n  vec2 swing = vec2(-travel.y, travel.x);\n  float proj = (px.x + 1.0) * travel.x + px.y * travel.y;\n  float turns = proj / max(u_width, 1.0) + u_phase / ${HR}.0 + u_speed * u_t;\n  float disp = u_height * sin(${OR} * turns);\n  fragColor = hfSampleSrc((px + swing * disp) / u_size);\n}\n`;var fc="data-vfx-chain",kb=1,Mb=[{value:1,label:"Red"},{value:2,label:"Green"},{value:3,label:"Blue"},{value:4,label:"Alpha"},{value:5,label:"Luminance"},{value:6,label:"Hue"},{value:7,label:"Lightness"},{value:8,label:"Saturation"},{value:9,label:"Full"},{value:10,label:"Half"},{value:11,label:"Off"}],GR=[{id:"fractal-noise",label:"Fractal Noise",ae:"ADBE Fractal Noise",capture:"none",frag:Ab,params:[{kind:"enum",key:"fractalType",label:"Fractal Type",options:[{value:1,label:"Basic"}],default:1,hint:"Only Basic is implemented in v1."},{kind:"enum",key:"noiseType",label:"Noise Type",options:[{value:1,label:"Block"},{value:2,label:"Linear"},{value:3,label:"Soft Linear"},{value:4,label:"Spline"}],default:3},{kind:"bool",key:"invert",label:"Invert",default:!1},{kind:"number",key:"contrast",label:"Contrast",unit:"%",min:0,max:1e3,step:1,default:100},{kind:"number",key:"brightness",label:"Brightness",unit:"",min:-1e3,max:1e3,step:1,default:0},{kind:"number",key:"scale",label:"Scale",unit:"%",min:6,max:1e4,step:1,default:100},{kind:"number",key:"complexity",label:"Complexity",unit:"",min:1,max:20,step:1,default:6},{kind:"number",key:"subInfluence",label:"Sub Influence",unit:"%",min:0,max:100,step:1,default:70},{kind:"number",key:"subScaling",label:"Sub Scaling",unit:"%",min:0,max:100,step:1,default:56},{kind:"number",key:"evolution",label:"Evolution",unit:"revolutions",min:-1e4,max:1e4,step:.01,default:0,animatable:!0},{kind:"number",key:"randomSeed",label:"Random Seed",unit:"",min:0,max:99999,step:1,default:0},{kind:"number",key:"opacity",label:"Opacity",unit:"%",min:0,max:100,step:1,default:100,animatable:!0}]},{id:"wave-warp",label:"Wave Warp",ae:"ADBE Wave Warp",capture:"self",frag:Tb,params:[{kind:"enum",key:"waveType",label:"Wave Type",options:[{value:1,label:"Sine"}],default:1,hint:"Only Sine is implemented in v1; the exporter marks the others cosmetic."},{kind:"number",key:"height",label:"Wave Height",unit:"px",min:-1e3,max:1e3,step:1,default:10,animatable:!0},{kind:"number",key:"width",label:"Wave Width",unit:"px",min:1,max:1e4,step:1,default:40,animatable:!0},{kind:"number",key:"direction",label:"Direction",unit:"deg",min:-360,max:360,step:1,default:90},{kind:"number",key:"speed",label:"Wave Speed",unit:"waves/s",min:-100,max:100,step:.1,default:1},{kind:"enum",key:"pinning",label:"Pinning",options:[{value:1,label:"None"}],default:1,hint:"Only None is implemented in v1; the exporter marks the others cosmetic."},{kind:"number",key:"phase",label:"Phase",unit:"deg",min:-360,max:360,step:1,default:0,animatable:!0}]},{id:"displacement-map",label:"Displacement Map",ae:"ADBE Displacement Map",capture:"self",frag:wb,params:[{kind:"ref",key:"map",label:"Displacement Map Layer",optional:!0},{kind:"enum",key:"useH",label:"Use For Horizontal Displacement",options:Mb,default:1,hint:"Hue, Lightness and Saturation are read as Luminance in v1."},{kind:"number",key:"maxH",label:"Max Horizontal Displacement",unit:"px",min:-32e3,max:32e3,step:1,default:5,animatable:!0},{kind:"enum",key:"useV",label:"Use For Vertical Displacement",options:Mb,default:2,hint:"Hue, Lightness and Saturation are read as Luminance in v1."},{kind:"number",key:"maxV",label:"Max Vertical Displacement",unit:"px",min:-32e3,max:32e3,step:1,default:5,animatable:!0},{kind:"enum",key:"behavior",label:"Displacement Map Behavior",options:[{value:1,label:"Center Map"}],default:1,hint:"Only Center Map is implemented in v1."},{kind:"enum",key:"edge",label:"Edge Behavior",options:[{value:0,label:"Off"}],default:0,hint:"Only Off (transparent outside the layer) is implemented in v1."},{kind:"bool",key:"expand",label:"Expand Output",default:!0}]},{id:"luma-matte",label:"Matte",capture:"self",frag:_b,params:[{kind:"ref",key:"matte",label:"Matte Layer"},{kind:"enum",key:"mode",label:"Matte Mode",options:[{value:1,label:"Alpha"},{value:2,label:"Alpha Inverted"},{value:3,label:"Luma"},{value:4,label:"Luma Inverted"}],default:1}]},{id:"noise",label:"Noise",ae:"ADBE Noise",capture:"self",frag:Rb,params:[{kind:"number",key:"amount",label:"Amount of Noise",unit:"%",min:0,max:400,step:.1,default:0,animatable:!0},{kind:"bool",key:"useColorNoise",label:"Use Color Noise",default:!1},{kind:"bool",key:"clipping",label:"Clip Result Values",default:!0}]}],$a=new Map(GR.map(e=>[e.id,e]));function Fb(e){return $a.get(e)}function Ib(e,t){let n=$a.get(e);if(!n)return{};let r={};for(let i of n.params){let o=t?.[i.key];r[i.key]=i.kind==="enum"?BR(i,o):i.kind==="bool"?UR(i,o):i.kind==="ref"?VR(o):WR(i,o)}return r}function Db(e){let t=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(t)?t:void 0}function BR(e,t){let n=Db(t);return n!==void 0&&e.options.some(r=>r.value===n)?n:e.default}function UR(e,t){return typeof t=="boolean"?t:e.default}function VR(e){return typeof e=="string"?e:""}function WR(e,t){let n=Db(t);return n!==void 0?Math.min(e.max,Math.max(e.min,n)):e.default}var ft=class extends Error{constructor(t){super(t),this.name="VfxChainError"}};function pc(e){return e.nodes.filter(t=>t.enabled!==!1)}var Lb={none:0,self:1,backdrop:2};function Pb(e){let t="none";for(let n of pc(e)){let r=$a.get(n.type);r&&Lb[r.capture]>Lb[t]&&(t=r.capture)}return t}function Ob(e){let t;try{t=JSON.parse(e)}catch(i){throw new ft(`Chain file is not valid JSON: ${i.message}`)}if(typeof t!="object"||t===null)throw new ft("Chain file must be a JSON object.");let n=t;if(n.version!==kb)throw new ft(`Unsupported chain version: ${String(n.version)}`);if(!Array.isArray(n.nodes))throw new ft("Chain file is missing a `nodes` array.");let r=n.nodes.map(zR);return{version:kb,nodes:r}}function Nb(e){return typeof e=="object"&&e!==null}function $R(e,t){if(typeof e.type!="string"||!$a.has(e.type))throw new ft(`Node ${t} has unknown effect type: ${String(e.type)}`);return e.type}function qR(e,t){if(typeof e.id!="string"||e.id==="")throw new ft(`Node ${t} is missing an id.`);return e.id}function zR(e,t){if(!Nb(e))throw new ft(`Node ${t} is not an object.`);let n=e,r=$R(n,t),i=qR(n,t),o=Nb(n.params)?n.params:{};return jR({type:r,id:i,enabled:n.enabled===!1?!1:void 0,params:o})}function jR(e){for(let t of Object.keys(e))e[t]===void 0&&delete e[t];return e}var KR="data-vfx-ref-visible",Wb="[HyperFrames] composition script error:",YR={preserveDrawingBuffer:!0,antialias:!1,premultipliedAlpha:!0,alpha:!0},XR=`#version 300 es\nout vec2 v_uv;\nvoid main() {\n  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));\n  v_uv = p;\n  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);\n}\n`,Gt=[],$b=30,qb=0,yc=0,zb=-1,hc=null,gc=null;function ot(e){console.error(Wb,`vfx: ${e}`)}function jb(e){console.error(Wb,`vfx-frame: ${e}`)}function Hb(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(ot(`shader failed to compile: ${e.getShaderInfoLog(r)??"(no log)"}`),e.deleteShader(r),null)):null}function JR(e,t){let n=Hb(e,e.VERTEX_SHADER,XR),r=n?Hb(e,e.FRAGMENT_SHADER,t):null;if(!n||!r)return null;let i=e.createProgram();return i?(e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),e.deleteShader(n),e.deleteShader(r),e.getProgramParameter(i,e.LINK_STATUS)?i:(ot(`program failed to link: ${e.getProgramInfoLog(i)??"(no log)"}`),e.deleteProgram(i),null)):null}var Gb="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";function QR(e){let t=e.querySelector("canvas.hf-vfx-out");if($r(t))return t.style.cssText=Gb+t.style.cssText,t;let n=document.createElement("canvas");return n.className="hf-vfx-out",n.style.cssText=Gb,e.appendChild(n),n}function ZR(e,t,n){let r={};for(let i of n.params)i.kind!=="ref"&&(r[i.key]=e.getUniformLocation(t,`u_${i.key}`));return{size:e.getUniformLocation(t,"u_size"),t:e.getUniformLocation(t,"u_t"),fps:e.getUniformLocation(t,"u_fps"),src:e.getUniformLocation(t,"u_src"),src2:e.getUniformLocation(t,"u_src2"),hasSrc2:e.getUniformLocation(t,"u_hasSrc2"),params:r}}function eT(e,t,n,r){return r.optional?{kind:"none"}:(ot(`${Rt(e)}: node "${t.id}" (${n.id}) needs a "${r.key}" param naming the id of the element to read as its second source.`),{kind:"error"})}function tT(e,t,n,r,i,o){let a=n.params.find(f=>f.kind==="ref");if(!a)return{kind:"none"};let s=r[a.key];if(typeof s!="string"||s==="")return eT(e,t,n,a);let l=e.ownerDocument.getElementById(s);if(!ye(l))return ot(`${Rt(e)}: node "${t.id}" (${n.id}) names "${a.key}" element #${s}, which is not in the composition.`),{kind:"error"};if(l===e)return a.optional?{kind:"none"}:{kind:"self"};let u=o.get(l);if(u)return{kind:"source",source:u};let d=Kb(l,i,`${Rt(e)}: "${a.key}" source`);return d?(d.visible=d.canvas.hasAttribute(KR),o.set(l,d),{kind:"source",source:d}):{kind:"error"}}function nT(e,t,n){let r=[],i=new Map;for(let o of pc(t)){let a=Fb(o.type);if(!a)return ot(`node "${o.id}" has unknown effect type "${o.type}"`),null;let s=JR(e,a.frag);if(!s)return ot(`node "${o.id}" (${a.id}) has no usable program`),null;let l=Ib(a.id,o.params),u=tT(n,o,a,l,e,i);if(u.kind==="error")return null;r.push({node:o,def:a,program:s,params:l,locations:ZR(e,s,a),...u.kind==="source"?{ref:u.source}:{},selfRef:u.kind==="self"})}return r}function rT(e){let t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),t}function iT(e){let t=e.parentElement;if(!t||e.id==="")return null;let n=t.children;for(let r=0;r<n.length;r++){let i=n.item(r);if($r(i)&&i.classList.contains("hf-vfx-src")&&i.getAttribute("data-vfx-for")===e.id)return i}return null}function Kb(e,t,n){let r=iT(e),i=r??e.querySelector("canvas.hf-vfx-src"),o=$r(i)?i.querySelector(":scope > .hf-vfx-in"):null;if(!$r(i)||!ye(o)){ot(`${n}: a capturing chain needs <canvas layoutsubtree class="hf-vfx-src"><div class="hf-vfx-in">\\u2026</div></canvas> in source \\u2014 inside the element for its own pixels, or beside it with data-vfx-for="${e.id}" for the layers below it.`);return}let a=i.getContext("2d");if(!a||typeof a.drawElementImage!="function"){ot(`${n}: drawElementImage is unavailable, so the layer cannot be captured. In Studio, enable chrome://flags/#canvas-draw-element.`);return}return{canvas:i,inner:o,ctx:a,texture:rT(t),backdrop:r!==null,visible:!1,emptyBoxReported:!1,laidOutEmpty:an(o)===null}}function oT(e){e.out.addEventListener("webglcontextlost",t=>{t.preventDefault(),!(!Gt.includes(e)||e.contextLost)&&(e.contextLost=!0,ot(`${Rt(e.host)}: WebGL context lost.`))})}function aT(e){try{return Ob(e.getAttribute(fc)??"")}catch(t){let n=t instanceof ft?t.message:String(t);return ot(`${Rt(e)}: ${n}`),null}}function sT(e){let t=aT(e);if(!t)return null;let n=QR(e),r=n.getContext("webgl2",YR);if(!r)return ot(`${Rt(e)}: WebGL2 is unavailable, so the chain cannot paint.`),n.remove(),null;let i=nT(r,t,e);if(!i)return n.remove(),null;let o=Pb(t),a=o==="none"?void 0:Kb(e,r,Rt(e));if(o!=="none"&&!a)return n.remove(),null;let s=a?.backdrop?"backdrop":o,l={host:e,chain:t,capture:s,out:n,gl:r,passes:i,src:a,contextLost:!1};return oT(l),l}function xc(e){let t=getComputedStyle(e);return t.display!=="none"&&t.visibility!=="hidden"}function Yb(e){if(getComputedStyle(e.inner).visibility==="hidden")return!1;for(let t=e.inner;t;t=t.parentElement)if(getComputedStyle(t).display==="none")return!1;return!0}function Rt(e){return e.id?`#${e.id}`:`<${e.tagName.toLowerCase()}>`}function hr(e){let t=e.src?[e.src]:[];for(let n of e.passes)n.ref&&!t.includes(n.ref)&&t.push(n.ref);return t}function Sc(e){return e.src?.backdrop===!0}function Ui(e){let t=[];for(let n of e.passes)n.ref?.visible&&!t.includes(n.ref)&&t.push(n.ref);return t}function lT(){for(let e of Gt){let{gl:t}=e;for(let n of e.passes)t.deleteProgram(n.program);for(let n of hr(e))t.deleteTexture(n.texture);if(e.ping){for(let n of e.ping.textures)t.deleteTexture(n);for(let n of e.ping.framebuffers)t.deleteFramebuffer(n)}}}function qa(e,t){lT(),Gt=[],$b=Number.isFinite(t)&&t>0?t:30;let n=e.querySelectorAll(`[${fc}]`);for(let r of n){if(!ye(r))continue;let i=sT(r);i&&Gt.push(i)}return Gt}function an(e){let t=typeof window>"u"?1:window.devicePixelRatio||1,n=Math.round(e.offsetWidth*t),r=Math.round(e.offsetHeight*t);return n>0&&r>0?{width:n,height:r}:null}function Bb(e,t,n){let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,t,n,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let i=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),[r,i]}function uT(e,t,n){let r=e.ping;if(r&&r.width===t&&r.height===n)return r;let{gl:i}=e;if(r){for(let l of r.textures)i.deleteTexture(l);for(let l of r.framebuffers)i.deleteFramebuffer(l)}let o=Bb(i,t,n),a=Bb(i,t,n),s={textures:[o[0],a[0]],framebuffers:[o[1],a[1]],width:t,height:n};return e.ping=s,s}function cT(e,t,n){if(e.kind==="ref")return null;if(e.kind==="number"&&e.animatable){let i=n.getPropertyValue(`--vfx-${t.node.id}-${e.key}`).trim(),o=i===""?Number.NaN:Number.parseFloat(i);if(Number.isFinite(o))return Math.min(e.max,Math.max(e.min,o))}let r=t.params[e.key];return typeof r=="boolean"?r?1:0:typeof r=="number"?r:0}function dT(e,t,n,r,i,o){let{gl:a}=e,{locations:s}=t;a.uniform2f(s.size,i,o),a.uniform1f(s.t,r),a.uniform1f(s.fps,$b),a.uniform1f(s.hasSrc2,t.ref||t.selfRef?1:0);for(let l of t.def.params){let u=cT(l,t,n);u!==null&&a.uniform1f(s.params[l.key]??null,u)}}function mT(e,t,n){return e===t||!n?null:n.framebuffers[e%2]??null}function fT(e,t,n){return t===0?e.src?.texture??null:n?.textures[(t-1)%2]??null}function pT(e,t,n,r){let{gl:i}=e,o=e.passes[t];i.bindFramebuffer(i.FRAMEBUFFER,mT(t,n,r));let a=fT(e,t,r);a&&Ub(i,o.locations.src,a,0),o.ref?(Ub(i,o.locations.src2,o.ref.texture,1),i.activeTexture(i.TEXTURE0)):o.selfRef&&a&&i.uniform1i(o.locations.src2,0)}function Ub(e,t,n,r){e.activeTexture(r===0?e.TEXTURE0:e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(t,r)}function vc(e,t){let n=an(e.host);if(!n)return;let{gl:r,out:i,passes:o}=e;i.width!==n.width&&(i.width=n.width),i.height!==n.height&&(i.height=n.height);let a=o.length>1?uT(e,n.width,n.height):null,s=getComputedStyle(e.host),l=o.length-1;for(let u=0;u<=l;u++){let d=o[u];r.useProgram(d.program),pT(e,u,l,a),r.viewport(0,0,n.width,n.height),dT(e,d,s,t,n.width,n.height),r.drawArrays(r.TRIANGLES,0,3)}}function Xb(e,t){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t.texture),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.canvas),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0)}var hT={upload:!0,keepBitmap:!1},gT={upload:!1,keepBitmap:!0},bT={upload:!0,keepBitmap:!0},yT={upload:!1,keepBitmap:!0};function Jb(e,t){e.canvas.width!==t.width&&(e.canvas.width=t.width),e.canvas.height!==t.height&&(e.canvas.height=t.height)}function Vb(e,t,n,r){return Jb(t,n),t.ctx.clearRect(0,0,n.width,n.height),r.upload&&Xb(e.gl,t),!0}function Ec(e,t,n,r,i){if(!Yb(t))return Vb(e,t,n,i);if(an(t.inner)===null)return t.emptyBoxReported||(t.emptyBoxReported=!0,jb(`${Rt(e.host)}: the .hf-vfx-in wrapper measures 0\\xD70, so its capture would be empty. Inside a layoutsubtree canvas an inset or percentage box has no size \\u2014 the wrapper must state an explicit width and height in px.`)),Vb(e,t,n,i);Jb(t,n),t.ctx.clearRect(0,0,n.width,n.height);try{t.ctx.drawElementImage(t.inner,0,0,n.width,n.height)}catch(o){return r||ot(`${Rt(e.host)}: drawElementImage failed: ${o.message} In Studio, enable chrome://flags/#canvas-draw-element.`),!1}return i.upload&&Xb(e.gl,t),i.keepBitmap||t.ctx.clearRect(0,0,n.width,n.height),!0}function Qb(e,t){return e.visible?an(e.inner)??t:t}function Zb(e,t=!1){let n=an(e.host),r=hr(e);if(!n||r.length===0)return!1;let i=!0;for(let o of r){let a=o.visible?bT:hT;Ec(e,o,Qb(o,n),t,a)||(i=!1)}return i}function ey(e,t=!1){let n=e.src;if(!n)return!1;let r=an(e.host)??an(n.inner);return r?Ec(e,n,r,t,gT):!1}function bc(e,t=!1){let n=!0;for(let r of Ui(e)){let i=Qb(r,{width:0,height:0});Ec(e,r,i,t,yT)||(n=!1)}return n}function xT(e){let t=!1;return Sc(e)&&ey(e)&&(t=!0),Ui(e).length>0&&bc(e)&&(t=!0),t}function ST(){let e=!1;for(let t of Gt)if(!t.contextLost&&hr(t).length!==0){if(!xc(t.host)){xT(t)&&(e=!0);continue}Zb(t)&&(vc(t,qb),e=!0)}return zb=yc,window.__hf_page_composite_pending=!1,e}function vT(){let e=window,t=e.__hf_page_composite_resolve;t!==hc&&(gc=typeof t=="function"?t:null,hc=()=>{let n=gc?gc():!1;return ST()||n},e.__hf_page_composite_resolve=hc),e.__hf_page_composite_pending=!0}var ty=2e3;function ET(e){return new Promise(t=>{let n=!1,r=a=>{n||(n=!0,clearTimeout(o),e.removeEventListener("paint",i),t(a))},i=()=>r("painted"),o=setTimeout(()=>r("timeout"),ty);e.addEventListener("paint",i,{once:!0});try{e.requestPaint?.()}catch{}if(typeof requestAnimationFrame!="function"){r("painted");return}requestAnimationFrame(()=>requestAnimationFrame(()=>r("painted")))})}async function AT(e,t){return(await Promise.all(t.map(r=>ET(r.canvas)))).includes("timeout")?(jb(`${Rt(e.host)}: no paint arrived within ${ty}ms, so this frame\'s capture was skipped (a BeginFrame-controlled compositor without a tick for this frame is a known cause).`),!1):!0}function wT(e){return xc(e.host)?"paint":Sc(e)?"passThrough":"refOnly"}function _T(e,t){return(t==="passThrough"?[...e.src?[e.src]:[],...Ui(e)]:t==="refOnly"?Ui(e):hr(e)).filter(Yb)}function CT(e,t){return t!==yc||zb===t?!1:Gt.includes(e)&&!e.contextLost}async function RT(e,t,n,r){let i=wT(e);if(await AT(e,_T(e,i))&&CT(e,n)){if(i==="passThrough"){ey(e,r),bc(e,r);return}if(i==="refOnly"){bc(e,r);return}Zb(e,r)&&vc(e,t)}}async function TT(e,t,n,r){await Promise.all(e.map(i=>RT(i,t,n,r)))}function kT(){for(let e of Gt.flatMap(hr)){let t=an(e.inner)===null;e.laidOutEmpty&&!t&&e.canvas.insertBefore(e.inner,e.inner.nextSibling),e.laidOutEmpty=t}}function Ac(e,t){qb=e;let n=++yc;kT();let r=[];for(let i of Gt)if(!i.contextLost){if(!xc(i.host)){(Sc(i)||Ui(i).length>0)&&r.push(i);continue}hr(i).length>0?r.push(i):vc(i,e)}r.length!==0&&(t?.engineMode&&vT(),nt(TT(r,e,n,t?.engineMode===!0)))}var MT=500,LT=33,NT=3,za=class{constructor(t){ce(this,"_baseTime",0);ce(this,"_playStartMs",null);ce(this,"_rate",1);ce(this,"_duration",1/0);ce(this,"_playStart",0);ce(this,"_playEnd",1/0);ce(this,"_playHold",1/0);ce(this,"_nowMs");ce(this,"_audioSource",null);ce(this,"_lastReadMs",null);ce(this,"_lastNow",0);this._baseTime=t?.initialTime??0,this._rate=t?.rate??1,this._duration=t?.duration??1/0,this._nowMs=t?.nowMs??(()=>performance.now())}now(){if(this._playStartMs===null)return this._baseTime;if(this._audioSource){let r=null;if("currentTimeSeconds"in this._audioSource?r=this._audioSource.currentTimeSeconds:r=this._elementTimeNeverBehind(this._audioSource),r!==null){let i=Math.min(r,this.getEnd());return this._baseTime=Math.max(0,i),this._playStartMs=this._nowMs(),this._lastReadMs=null,this._lastNow=this._baseTime,this._baseTime}}this._applyStallCorrection();let t=(this._nowMs()-this._playStartMs)/1e3,n=this._baseTime+t*this._rate;return this._lastNow=Math.max(0,Math.min(n,this.getEnd())),this._lastNow}_elementTimeNeverBehind(t){let{el:n,compositionStart:r,mediaStart:i,rate:o}=t;if(n.paused||!Number.isFinite(n.currentTime))return null;if(n.seeking)return this._lastNow;let a=o??1,s=Sn(a,n.currentTime-i)+r;return s>=this._lastNow?s:this._heldTimeWhenBehind(n,this._lastNow-s,a)}_heldTimeWhenBehind(t,n,r){return t.loop&&n>Sn(r,t.duration)/2?null:t.readyState<NT||n<=Rl?this._lastNow:null}_applyStallCorrection(){if(this._playStartMs===null)return;let t=this._nowMs();if(this._lastReadMs!==null){let n=t-this._lastReadMs;n>MT&&(this._playStartMs+=n-LT)}this._lastReadMs=t}play(){return this._playStartMs!==null||this._baseTime>=this.getEnd()?!1:(this._playStartMs=this._nowMs(),this._lastNow=this._baseTime,this._lastReadMs=null,!0)}pause(){return this._playStartMs===null?!1:(this._baseTime=this.now(),this._playStartMs=null,!0)}seek(t){let n=Number.isFinite(this._duration)?Math.max(0,Math.min(t,this._duration)):Math.max(0,t);this._baseTime=n,this._lastNow=n,this._playStartMs!==null&&(this._playStartMs=this._nowMs(),this._lastReadMs=null)}isPlaying(){return this._playStartMs!==null}setRate(t){let n=Number.isFinite(t)&&t>0?Math.max(.1,Math.min(5,t)):1;this._playStartMs!==null&&(this._baseTime=this.now(),this._playStartMs=this._nowMs(),this._lastReadMs=null),this._rate=n}getRate(){return this._rate}setDuration(t){this._duration=Number.isFinite(t)&&t>0?t:1/0,this._baseTime>this._duration&&(this._baseTime=this._duration)}getDuration(){return this._duration}setPlayRange(t,n,r){this._playStart=Number.isFinite(t)&&t>0?t:0,this._playEnd=n!==null&&Number.isFinite(n)&&n>this._playStart?n:1/0,this._playHold=pm(this._playStart,this._playEnd,r)}getPlayStart(){return this._playStart}getEnd(){return Math.min(this._duration,this._playEnd)}getStopTime(){return this._playEnd<this._duration?this._playHold:this.getEnd()}attachAudioSource(t){this._audioSource=t}detachAudioSource(){this._audioSource&&this._playStartMs!==null&&(this._baseTime=this.now(),this._playStartMs=this._nowMs(),this._lastReadMs=null),this._audioSource=null}audioElement(){return this._audioSource&&"el"in this._audioSource?this._audioSource.el:null}hasAudioSource(){return this._audioSource!==null}getSource(){if(this._audioSource&&this._playStartMs!==null){if("currentTimeSeconds"in this._audioSource)return"audio";let{el:t}=this._audioSource;if(!t.paused&&Number.isFinite(t.currentTime))return"audio"}return"monotonic"}snapshot(){return{time:this.now(),playing:this.isPlaying(),rate:this._rate,duration:this._duration,source:this.getSource()}}reachedEnd(){let t=this.now();return t>=this.getEnd()||this._playStartMs===null&&t>=this.getStopTime()}};var FT=100,IT=8,DT=4096,wc=e=>e;function PT(e,t,n){return!(!!e.curve||e.viaX!==void 0&&e.viaY!==void 0)&&t==="linear"&&!n}function OT(e){let t=Math.ceil(e*FT);return Math.min(DT,Math.max(IT,t))}function HT(e,t,n,r,i){let{scheduledAt:o,elapsed:a,rate:s}=r,l=i??wc,u=A=>o+(A-a)/s,d=e.points[t],f=e.points[t+1],m=u(f.t);if(m<=o)return null;let p=Math.max(o,u(d.t)),g=m-p;if(g<=0)return null;if(PT(d,n,i))return{kind:"ramp",time:m,value:l(f.v)};let b=OT(g),y=Im(e,Math.max(d.t,a),f.t,b,n),v=new Float32Array(b);for(let A=0;A<b;A+=1)v[A]=l(y[A]??0);return{kind:"curve",time:p,duration:g,values:v}}function GT(e,t,n,r){let i=[];for(let a=0;a+1<e.points.length;a+=1){let s=HT(e,a,t,n,r);s&&i.push(s)}let o=i[0];return o?.kind==="curve"&&o.time<=n.scheduledAt||i.unshift({kind:"set",time:n.scheduledAt,value:(r??wc)(Ft(e,n.elapsed,t))}),i}function BT(e,t){for(let n of t)if(n.kind==="set")e.setValueAtTime(n.value,n.time);else if(n.kind==="ramp")e.linearRampToValueAtTime(n.value,n.time);else try{e.setValueCurveAtTime(n.values,n.time,n.duration)}catch{let r=n.values[n.values.length-1]??0;e.linearRampToValueAtTime(r,n.time+n.duration)}}function Vi(e){for(let t of e)t.param.cancelScheduledValues(0)}function gr(e,t){for(let n of e)typeof n.param.cancelAndHoldAtTime=="function"?n.param.cancelAndHoldAtTime(t):n.param.cancelScheduledValues(t)}function _c(e,t,n,r){if(t.points.length!==0)for(let i of e){if(Vi([i]),Fm(t)){let o=(i.map??wc)(t.points[0].v);i.param.setValueAtTime(o,r.scheduledAt);continue}BT(i.param,GT(t,n,r,i.map))}}function ny(e,t,n,r,i){let o=new Map(n.filter(s=>s.id).map(s=>[s.id,s.handle])),a=[];for(let s of e.lanes){let l=Wr(s.target);if(!l)continue;let u=l.kind==="preset"?i?.[l.presetId]:l.kind==="fx"?o.get(l.nodeId)?.automation?.[l.param]:void 0;if(!u||u.length===0)continue;let d=$s(s.target,t);d&&(_c(u,s,d.scale,r),a.push(...u))}return a}function ry(e){return e.lanes.find(t=>t.target===Pn)??null}var UT=`\nconst dbToLin = (db) => Math.pow(10, db / 20);\n\n/**\n * One-pole envelope followers, one per channel.\n *\n * Per channel matters: the followers advance once per sample, so a single shared\n * follower stepped once per channel per sample. On stereo that ran a 20 ms attack\n * as 10 ms, and gave the right channel a gain computed from an envelope that had\n * already traversed the left \\u2014 so the two channels ducked by different amounts\n * from the same input and the image pumped.\n */\nclass EnvBank {\n  constructor(attackMs, releaseMs) { this.set(attackMs, releaseMs); this.values = []; }\n  set(attackMs, releaseMs) {\n    this.a = Math.exp(-1 / (sampleRate * Math.max(1e-5, attackMs / 1000)));\n    this.r = Math.exp(-1 / (sampleRate * Math.max(1e-5, releaseMs / 1000)));\n  }\n  push(ch, x) {\n    const prev = this.values[ch] ?? 0;\n    const m = Math.abs(x);\n    const c = m > prev ? this.a : this.r;\n    const next = m + c * (prev - m);\n    this.values[ch] = next;\n    return next;\n  }\n}\n\n/** Soft-knee gain computer in dB, matching acompressor\'s shape. */\nfunction kneeGain(envDb, thresholdDb, ratio, kneeDb) {\n  const over = envDb - thresholdDb;\n  if (kneeDb > 0 && over > -kneeDb && over < kneeDb) {\n    const t = (over + kneeDb) / (2 * kneeDb);\n    return -((1 - 1 / ratio) * kneeDb * t * t);\n  }\n  return over > 0 ? -(over * (1 - 1 / ratio)) : 0;\n}\n\n// log10/exp per sample is the single most expensive thing a dynamics processor\n// can do on the audio thread, and every sample below the knee needs neither:\n// its gain is exactly unity. Comparing envelopes in the linear domain lets the\n// quiet majority of samples skip the transcendentals entirely.\nconst LN10_OVER_20 = Math.LN10 / 20;\nconst dbToLinFast = (db) => Math.exp(db * LN10_OVER_20);\n\nclass HfCompressor extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.env = new EnvBank(this.p.attack ?? 20, this.p.release ?? 250);\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n      this.env.set(this.p.attack ?? 20, this.p.release ?? 250);\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const makeup = dbToLin(p.makeup ?? 0);\n    const mix = p.mix ?? 1;\n    // Knee is expressed as a ratio in FFmpeg; convert to dB width.\n    const kneeDb = 20 * Math.log10(Math.max(1.0001, p.knee ?? 2.83));\n    const thresholdDb = p.threshold ?? -24;\n    const ratio = p.ratio ?? 4;\n    // Below this the gain computer returns unity, so the sample needs no\n    // logarithm at all.\n    const kneeStartLin = dbToLin(thresholdDb - kneeDb);\n    const dry = 1 - mix;\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      for (let n = 0; n < inp.length; n++) {\n        const x = inp[n];\n        // Per-channel follower, and the sub-knee shortcut: below the knee the\n        // gain is exactly unity, so the sample needs no logarithm at all.\n        const env = this.env.push(ch, x);\n        if (env <= kneeStartLin) {\n          out[n] = x * makeup * mix + x * dry;\n          continue;\n        }\n        const envDb = 20 * Math.log10(env);\n        const g = dbToLinFast(kneeGain(envDb, thresholdDb, ratio, kneeDb));\n        out[n] = x * g * makeup * mix + x * dry;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-compressor", HfCompressor);\n\nclass HfLimiter extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.env = new EnvBank(this.p.attack ?? 5, this.p.release ?? 50);\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n      this.env.set(this.p.attack ?? 5, this.p.release ?? 50);\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const ceiling = dbToLin(this.p.limit ?? -1);\n    const outGain = dbToLin(this.p.level_out ?? 0);\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      for (let n = 0; n < inp.length; n++) {\n        const x = inp[n];\n        const env = this.env.push(ch, x);\n        // Only ever attenuate: a limiter that can raise level is a compressor.\n        const g = env > ceiling ? ceiling / env : 1;\n        out[n] = x * g * outGain;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-limiter", HfLimiter);\n\nclass HfGate extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.env = new EnvBank(this.p.attack ?? 1, this.p.release ?? 100);\n    this.gains = [];\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n      this.env.set(this.p.attack ?? 1, this.p.release ?? 100);\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const threshold = dbToLin(p.threshold ?? -35);\n    const floor = dbToLin(p.range ?? -24);\n    const ratio = p.ratio ?? 10;\n    // Knee is declared in the registry as a ratio, like the compressor\'s; a\n    // hard threshold ignored it and chattered on material sitting right at the\n    // gate point.\n    const kneeDb = 20 * Math.log10(Math.max(1.0001, p.knee ?? 2.83));\n    const kneeLin = dbToLin((p.threshold ?? -35) + kneeDb);\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      for (let n = 0; n < inp.length; n++) {\n        const x = inp[n];\n        const env = this.env.push(ch, x);\n        let target = 1;\n        // Above the threshold the gate is fully open; skip the pow entirely.\n        if (env < threshold) {\n          const under = env > 1e-9 ? threshold / env : 1e9;\n          target = Math.max(floor, 1 / Math.pow(under, ratio - 1));\n          if (!isFinite(target)) target = floor;\n        }\n        // Smooth toward the target so the gate does not click on every sample.\n        const held = this.gains[ch] ?? 1;\n        const c = target < held ? this.env.r : this.env.a;\n        const smoothed = target + c * (held - target);\n        this.gains[ch] = smoothed;\n        out[n] = x * smoothed;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-gate", HfGate);\n\nclass HfBitcrush extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.holds = [];\n    this.held = [];\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const levels = Math.pow(2, (p.bits ?? 8) - 1);\n    const step = Math.max(1, Math.round(p.samples ?? 1));\n    const mix = p.mix ?? 1;\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      if (this.held[ch] === undefined) this.held[ch] = 0;\n      if (this.holds[ch] === undefined) this.holds[ch] = 0;\n      for (let n = 0; n < inp.length; n++) {\n        // Per channel: advancing one shared counter only on the last channel\n        // left every earlier channel either unheld or frozen for a whole\n        // 128-sample quantum, clicking once a block.\n        if (this.holds[ch] === 0) this.held[ch] = Math.round(inp[n] * levels) / levels;\n        out[n] = this.held[ch] * mix + inp[n] * (1 - mix);\n        this.holds[ch] = (this.holds[ch] + 1) % step;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-bitcrush", HfBitcrush);\n\n/** Linear-interpolated read, \\`delaySamples\\` behind the write head. */\nfunction readTap(ring, write, delaySamples) {\n  const len = ring.length;\n  const pos = (write - 1 - delaySamples + len) % len;\n  const i0 = Math.floor(pos);\n  const frac = pos - i0;\n  const i1 = (i0 + 1) % len;\n  return ring[i0] * (1 - frac) + ring[i1] * frac;\n}\n\n/** Equal-power-ish crossfade, zero at a tap\'s reset point \\u2014 hides the splice. */\nfunction xfade(phase) {\n  return Math.sin(Math.PI * phase);\n}\n\n/**\n * Dual-tap granular delay line: two read taps 180\\xB0 apart in a 100 ms grain,\n * each sweeping at a speed relative to the write head that shifts pitch\n * without changing duration. One tap is always fading in as the other fades\n * out, which hides the splice each tap makes when it wraps.\n *\n * write/phase are block-level state, advanced once per SAMPLE across all\n * channels together (not once per channel) \\u2014 advancing them inside the\n * per-channel loop would move the tap 2x/4x too fast on a stereo/quad input.\n */\nclass HfPitchshift extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.grain = Math.round(sampleRate * 0.1);\n    this.buf = [];\n    this.write = 0;\n    this.phase = 0;\n    // Samples written so far, capped at one grain. The taps read up to a grain\n    // behind the write head, so until this fills they would read the ring\'s\n    // zeros \\u2014 the head of every clip came out attenuated or silent.\n    this.filled = 0;\n    // How much of the wet (pitch-shifted) path is currently in the output, and\n    // where it is heading. Crossing between dry and wet is a ~50 ms jump in the\n    // signal, so it is RAMPED rather than switched: a hard swap either way is a\n    // click. Ramping in both directions is also what lets a node return to true\n    // bypass at semitones 0 \\u2014 a one-way latch left preview stuck with the delay\n    // that the render, building a fresh node from the attribute, does not have.\n    this.wet = 0;\n    this.wetTarget = 0;\n    // ~15 ms one-pole, short enough to feel immediate on a slider drag and long\n    // enough that the splice is inaudible.\n    this.wetCoef = Math.exp(-1 / (sampleRate * 0.015));\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const semitones = Math.max(-12, Math.min(12, p.semitones ?? 0));\n    const mix = Math.max(0, Math.min(1, p.mix ?? 1));\n    const grain = this.grain;\n    const ringLen = grain * 2;\n    const n = i[0] ? i[0].length : 0;\n    for (let ch = 0; ch < i.length; ch++) {\n      if (!this.buf[ch]) this.buf[ch] = new Float32Array(ringLen);\n    }\n\n    // Nothing to shift, or mixed fully out. The grain delay is ~grain/2\n    // whatever the ratio, so at semitones=0 this degenerated into a pure 50 ms\n    // delay of the signal \\u2014 while the copy for that exact setting reads\n    // "Unchanged pitch".\n    this.wetTarget = semitones === 0 ? 0 : mix;\n\n    // Fully dry AND settled: take the cheap transparent path. The ring keeps\n    // filling, so a later shift does not start cold.\n    if (this.wetTarget === 0 && this.wet < 1e-4) {\n      this.wet = 0;\n      let w = this.write;\n      for (let s = 0; s < n; s++) {\n        for (let ch = 0; ch < i.length; ch++) {\n          const x = i[ch][s];\n          this.buf[ch][w] = x;\n          o[ch][s] = x;\n        }\n        w = (w + 1) % ringLen;\n      }\n      this.write = w;\n      this.filled = Math.min(grain, this.filled + n);\n      return true;\n    }\n\n    const ratio = Math.pow(2, semitones / 12);\n    const inc = (1 - ratio) / grain;\n    let write = this.write, phase = this.phase, filled = this.filled, wetNow = this.wet;\n    const target = this.wetTarget, coef = this.wetCoef;\n    for (let s = 0; s < n; s++) {\n      phase += inc;\n      phase -= Math.floor(phase);\n      const phaseB = (phase + 0.5) % 1;\n      const gA = xfade(phase), gB = xfade(phaseB);\n      // Ramp the wet path in as the ring fills rather than reading zeros:\n      // 100 ms of unshifted audio at the head of a clip beats 50 ms of silence.\n      const warm = filled >= grain ? 1 : filled / grain;\n      wetNow = target + coef * (wetNow - target);\n      const wetMix = wetNow * warm;\n      for (let ch = 0; ch < i.length; ch++) {\n        const ring = this.buf[ch];\n        const inp = i[ch], out = o[ch];\n        const x = inp[s];\n        ring[write] = x;\n        const wet =\n          readTap(ring, write, phase * grain) * gA + readTap(ring, write, phaseB * grain) * gB;\n        out[s] = x * (1 - wetMix) + wet * wetMix;\n      }\n      write = (write + 1) % ringLen;\n      if (filled < grain) filled++;\n    }\n    this.write = write;\n    this.phase = phase;\n    this.filled = filled;\n    this.wet = wetNow;\n    return true;\n  }\n}\nregisterProcessor("hf-pitchshift", HfPitchshift);\n`,Cc=new WeakMap;function Rc(e){return iy.has(e)}var iy=new WeakSet;function Tc(e){let t=Cc.get(e);return t||(t=(async()=>{if(!e.audioWorklet)throw new Error("AudioWorklet is unavailable \\u2014 the page needs a secure context (https, localhost or file://)");let n=`data:text/javascript;base64,${btoa(String.fromCharCode(...new TextEncoder().encode(UT)))}`;await e.audioWorklet.addModule(n),iy.add(e)})().catch(n=>{throw Cc.delete(e),n}),Cc.set(e,t)),t}function VT(e,t,n){let r=.6+Math.max(0,Math.min(1,t))*2.6,i=Math.max(1,Math.floor(e*r)),o=new Float32Array(i),a=Math.round(t*1e3)*2654435761+Math.round(n*1e3)*40503>>>0,s=()=>(a=a*1664525+1013904223>>>0,a/4294967295*2-1),l=Math.max(.001,1-Math.max(0,Math.min(1,n))),u=0,d=0;for(let m=0;m<i;m++){u+=l*(s()-u);let p=u*Math.pow(1-m/i,2.5);o[m]=p,d+=p*p}let f=Math.sqrt(d);if(f>0)for(let m=0;m<i;m++)o[m]=(o[m]??0)/f;return o}var ve=e=>typeof e=="number"?e:Number(e??0),kc=e=>e/1e3;function ly(e,t,n,r){let i=Math.max(1,Math.round(e.sampleRate)),o=e.createBuffer(1,i,e.sampleRate),a=o.getChannelData(0);for(let u=0;u<i;u++){let d=u/i;a[u]=t==="sine"?Math.sin(2*Math.PI*d):4*Math.abs((d+.75)%1-.5)-1}let s=e.createBufferSource();s.buffer=o,s.loop=!0,s.playbackRate.value=n;let l=(r*n%1+1)%1*(i/e.sampleRate);return s.start(typeof e.currentTime=="number"?e.currentTime:0,l),s}function uy(e){try{e.stop()}catch{}e.disconnect()}function Mc(e,t){return[{param:e},{param:t,map:n=>1-n}]}function cy(e,t,n){e.gain.value=n,t.gain.value=1-n}function Lc(e,t,n){return{input:e,output:e,update:t,automation:n,dispose:()=>e.disconnect()}}var WT=new Set(["peaking","highpass","lowpass"]),oy=e=>Math.pow(10,e/20),$T=(e,t)=>{let n=e.createGain(),r=i=>{n.gain.value=oy(ve(i.gain))};return r(t),Lc(n,r,{gain:[{param:n.gain,map:oy}]})};function Wi(e,t){return(n,r)=>{let i=n.createBiquadFilter();i.type=e;let o=a=>{i.frequency.value=ve(a.frequency),a.q!==void 0&&(i.Q.value=ve(a.q)),t&&(i.gain.value=ve(a.gain))};return o(r),Lc(i,o,{frequency:[{param:i.frequency}],...WT.has(e)?{q:[{param:i.Q}]}:{},...t?{gain:[{param:i.gain}]}:{}})}}function qT(e){return(t,n)=>{let r=Math.tan(Math.PI*ve(n.frequency)/t.sampleRate),i=e==="highpass"?t.createIIRFilter([1/(1+r),-1/(1+r)],[1,(r-1)/(r+1)]):t.createIIRFilter([r/(1+r),r/(1+r)],[1,(r-1)/(r+1)]);return Lc(i,()=>{})}}function $i(e){return(t,n)=>{let r=new AudioWorkletNode(t,e,{processorOptions:{...n}});return{input:r,output:r,update:i=>r.port.postMessage({...i}),dispose:()=>{r.port.postMessage({__hfDispose:!0}),r.disconnect()}}}}var zT={tanh:Math.tanh,atan:e=>2/Math.PI*Math.atan(Math.PI/2*e),cubic:e=>Math.abs(e)>=1?Math.sign(e):e-e**3/3,exp:e=>Math.sign(e)*(1-Math.exp(-Math.abs(e))),alg:e=>e/Math.sqrt(1+e*e),quintic:e=>Math.abs(e)>=1?Math.sign(e):e-e**5/5,sin:e=>Math.abs(e)>=1?Math.sign(e):Math.sin(Math.PI/2*e),erf:e=>Math.tanh(1.20211*e),hard:e=>Math.max(-1,Math.min(1,e))},jT=(e,t)=>{let n=e.createWaveShaper(),r=e.createGain(),i=e.createGain();r.connect(n).connect(i);let o=a=>{let s=zT[String(a.type)]??Math.tanh,l=Math.pow(10,ve(a.threshold)/20),u=8192,d=new Float32Array(u);for(let f=0;f<u;f++){let m=f/(u-1)*2-1;d[f]=s(m/Math.max(1e-6,l))*l}n.curve=d,n.oversample=ve(a.oversample)>=4?"4x":ve(a.oversample)>=2?"2x":"none",i.gain.value=Math.pow(10,ve(a.output)/20)};return o(t),{input:r,output:i,update:o,automation:{output:[{param:i.gain,map:a=>Math.pow(10,a/20)}]},dispose:()=>{r.disconnect(),n.disconnect(),i.disconnect()}}},KT=(e,t)=>{let n=e.createGain(),r=e.createGain(),i=e.createDelay(5),o=e.createGain(),a=e.createGain(),s=e.createGain();n.connect(i),i.connect(o),o.connect(i),i.connect(a).connect(r),n.connect(s).connect(r);let l=u=>{i.delayTime.value=Math.min(5,ve(u.time)/1e3),o.gain.value=ve(u.feedback),cy(a,s,ve(u.mix))};return l(t),{input:n,output:r,update:l,automation:{time:[{param:i.delayTime,map:u=>Math.min(5,kc(u))}],feedback:[{param:o.gain}],mix:Mc(a.gain,s.gain)},dispose:()=>[n,r,i,o,a,s].forEach(u=>u.disconnect())}},YT=(e,t,n)=>{let r=e.createGain(),i=e.createGain(),o=e.createDelay(.5),a=ly(e,"sine",ve(t.speed),n),s=e.createGain(),l=e.createGain(),u=e.createGain();a.connect(s).connect(o.delayTime),r.connect(o).connect(l).connect(i),r.connect(u).connect(i);let d=f=>{o.delayTime.value=ve(f.delay)/1e3,s.gain.value=ve(f.depth)/1e3,a.playbackRate.value=ve(f.speed),cy(l,u,ve(f.mix))};return d(t),{input:r,output:i,update:d,automation:{delay:[{param:o.delayTime,map:kc}],depth:[{param:s.gain,map:kc}],speed:[{param:a.playbackRate}],mix:Mc(l.gain,u.gain)},dispose:()=>{uy(a),[r,i,o,s,l,u].forEach(f=>f.disconnect())}}},XT=6,JT=(e,t,n)=>{let r=e.createGain(),i=e.createGain(),o=e.createGain(),a=e.createGain(),s=ly(e,String(t.type)==="1"?"sine":"triangle",ve(t.speed),n),l=e.createGain(),u=e.createGain(),d=e.createGain(),f=[];r.connect(o);let m=o;for(let g=0;g<XT;g++){let b=e.createBiquadFilter();b.type="allpass",b.Q.value=.7071,l.connect(b.frequency),m.connect(b),m=b,f.push(b)}s.connect(l),m.connect(u).connect(a),o.connect(d).connect(a),a.connect(i);let p=g=>{let b=1e3/Math.max(.1,ve(g.delay));for(let y of f)y.frequency.value=b;l.gain.value=b*ve(g.decay),s.playbackRate.value=ve(g.speed),o.gain.value=ve(g.in_gain),a.gain.value=ve(g.out_gain),u.gain.value=1,d.gain.value=1};return p(t),{input:r,output:i,update:p,automation:{speed:[{param:s.playbackRate}],in_gain:[{param:o.gain}],out_gain:[{param:a.gain}]},dispose:()=>{uy(s),[r,i,o,a,l,u,d,...f].forEach(g=>g.disconnect())}}},QT=(e,t)=>{let n=e.createGain(),r=e.createGain(),i=e.createConvolver(),o=e.createGain(),a=e.createGain();i.normalize=!1,n.connect(i).connect(o).connect(r),n.connect(a).connect(r);let s="",l=u=>{let d=`${ve(u.size)}:${ve(u.damping)}`;if(d!==s){let f=VT(e.sampleRate,ve(u.size),ve(u.damping)),m=e.createBuffer(1,f.length,e.sampleRate);m.getChannelData(0).set(f),i.buffer=m,s=d}o.gain.value=ve(u.wet),a.gain.value=ve(u.dry)};return l(t),{input:n,output:r,update:l,automation:{wet:[{param:o.gain}],dry:[{param:a.gain}]},dispose:()=>[n,r,i,o,a].forEach(u=>u.disconnect())}},ZT={"gain-node":$T,"biquad-peaking":Wi("peaking",!0),"biquad-lowshelf":Wi("lowshelf",!0),"biquad-highshelf":Wi("highshelf",!0),"biquad-highpass":Wi("highpass",!1),"biquad-lowpass":Wi("lowpass",!1),"worklet-compressor":$i("hf-compressor"),"worklet-limiter":$i("hf-limiter"),"worklet-gate":$i("hf-gate"),"worklet-bitcrush":$i("hf-bitcrush"),"worklet-pitchshift":$i("hf-pitchshift"),waveshaper:jT,"delay-feedback":KT,"chorus-lfo":YT,"allpass-phaser":JT,convolver:QT};function dy(e){return e.nodes.some(t=>Gr(t.type)?.web.startsWith("worklet-")??!1)}function ek(e,t,n,r=0){let i=Gr(t);if(!i)throw new Error(`Unknown effect type: ${t}`);let o=Br(t,n);if((t==="highpass"||t==="lowpass")&&String(o.poles)==="1")return qT(t)(e,o,r);let a=ZT[i.web];if(!a)throw new Error(`No Web Audio builder for ${i.web}`);return a(e,o,r)}function ay(e){let t=[];for(let n of e){let r=n.fromPreset,i=t.at(-1);if(i&&i.preset===r)i.nodes.push(n);else{let o=typeof n.presetAmount=="number"?n.presetAmount:1;t.push({...r?{preset:r}:{},amount:Math.min(1,Math.max(0,o)),nodes:[n]})}}return t}function sy(e){return Ur(e).map(t=>{let n=Br(t.type,t.params),r=n.poles!==void 0?`:${n.poles}`:"",i=String(n.poles)==="1"?`@${n.frequency}`:"",o=t.type==="phaser"?`~${n.type}`:"",a=t.fromPreset?`%${t.fromPreset}`:"";return`${t.type}${r}${i}${o}${a}`}).join("|")}function my(e,t,n=0){var f;let r=e.createGain(),i=e.createGain(),o=[],a=[],s=ay(Ur(t)),l=r;for(let m of s){let p=null;if(m.preset){let g=e.createGain(),b=e.createGain(),y=e.createGain(),v=e.createGain();y.gain.value=m.amount,b.gain.value=1-m.amount,l.connect(g),g.connect(b).connect(v),p={entry:g,wet:y,dry:b,join:v},l=g}for(let g of m.nodes){let b=ek(e,g.type,g.params??{},n);l.connect(b.input),l=b.output,o.push({...g.id?{id:g.id}:{},type:g.type,handle:b})}p&&m.preset&&(l.connect(p.wet).connect(p.join),a.push({id:m.preset,...p}),l=p.join)}l.connect(i);let u=sy(t),d={};for(let m of a)(d[f=m.id]??(d[f]=[])).push(...Mc(m.wet.gain,m.dry.gain));return{input:r,output:i,presets:d,nodes:o,update(m){if(sy(m)!==u)return!1;Ur(m).forEach((g,b)=>{let y=o[b];y&&(y.handle.update(Br(g.type,g.params)),g.id===void 0?delete y.id:y.id=g.id)});let p=0;for(let g of ay(Ur(m))){if(!g.preset)continue;let b=a[p++];!b||b.id!==g.preset||(b.wet.gain.value=g.amount,b.dry.gain.value=1-g.amount)}return!0},dispose(){for(let{handle:m}of o)m.dispose();for(let{entry:m,wet:p,dry:g,join:b}of a)m.disconnect(),p.disconnect(),g.disconnect(),b.disconnect();r.disconnect(),i.disconnect()}}}var fy={version:1,nodes:[]},py={version:1,lanes:[]};function hy(e,t){let n=(typeof e.getAttribute=="function"?e.getAttribute(Nt):null)??"";if(!n)return py;try{return Nm(Ro(n),t)}catch{return py}}function br(e){let t=(typeof e.getAttribute=="function"?e.getAttribute(xn):null)??"";if(!t)return{chain:fy,raw:""};try{return{chain:Rm(t),raw:t}}catch{return{chain:fy,raw:""}}}function gy(e){return hy(e,br(e).chain)}function ja(e,t,n,r,i){let{chain:o}=br(t),a=null,s=[],l=!1,u=0,d=()=>{try{a?(n.disconnect(a.input),a.output.disconnect(r),a.dispose()):n.disconnect(r)}catch{}a=null},f=(E,T)=>{if(E.nodes.length===0){n.connect(r);return}if(dy(E)&&!Rc(e)){n.connect(r);let P=++u;Tc(e).then(()=>{l||P!==u||y(br(t).chain)}).catch(()=>{});return}try{let P=my(e,E,T);n.connect(P.input),P.output.connect(r),a=P}catch{n.connect(r)}},m=(E,T)=>{s=T&&a?ny(hy(t,E),E,a.nodes,T,a.presets):[]},p=i?{...i}:null;f(o,p?.elapsed??0),m(o,p);let g=()=>{if(!p)return null;let E=typeof e.currentTime=="number"?e.currentTime:p.scheduledAt;return{scheduledAt:E,elapsed:p.elapsed+(E-p.scheduledAt)*p.rate,rate:p.rate}},b=E=>{let T=g();T&&(gr(s,T.scheduledAt),m(E,T))},y=E=>{let T=g();gr(s,T?.scheduledAt??0),d(),f(E,T?.elapsed??0),m(E,T)},v=null,A=t;return typeof MutationObserver<"u"&&typeof A?.nodeType=="number"&&(v=new MutationObserver(()=>{let E=br(t);s.length>0&&Vi(s),!a||!a.update(E.chain)?y(E.chain):b(E.chain)}),v.observe(A,{attributes:!0,attributeFilter:[xn,Nt]})),{reanchor:E=>{if(l)return;let T=g();T&&gr(s,T.scheduledAt),p={...E},m(br(t).chain,p)},setRate:E=>{let T=g();l||!T||!Number.isFinite(E)||E<=0||E===T.rate||(p={...T,rate:E},gr(s,T.scheduledAt),m(br(t).chain,p))},dispose:()=>{l=!0,v?.disconnect(),s.length>0&&gr(s,typeof e.currentTime=="number"?e.currentTime:0),a?.dispose()}}}function by(e,t){e.getFloatTimeDomainData(t);let n=0;for(let r=0;r<t.length;r++)n=Math.max(n,Math.abs(t[r]??0));return n}function Nc(e,t){let n=e.createGain();n.channelCount=2,n.channelCountMode="explicit";let r=e.createChannelSplitter(2),i=e.createAnalyser(),o=e.createAnalyser();i.fftSize=o.fftSize=2048,t.connect(n),n.connect(r),r.connect(i,0),r.connect(o,1);let a=new Float32Array(new ArrayBuffer(2048*4)),s=new Float32Array(new ArrayBuffer(2048*4));return{read:()=>({l:by(i,a),r:by(o,s)}),dispose:()=>{try{t.disconnect(n),n.disconnect(),r.disconnect()}catch{}}}}var yy="runtime_web_audio_bypass";function Fc(e,t){return typeof e.getAttribute=="function"?e.getAttribute(t):null}function qi(e,t){return Fc(e,t)!==null}function tk(e){return qi(e,"crossorigin")?!0:e.crossOrigin!=null}function nk(e){return typeof e.baseURI=="string"&&e.baseURI?e.baseURI:typeof document<"u"?document.baseURI:""}function rk(e){let t=typeof e.currentSrc=="string"?e.currentSrc:"";if(t)return[t];let n=Fc(e,"src");if(n)return[n];if(typeof e.querySelectorAll!="function")return[];let r=[];for(let i of Array.from(e.querySelectorAll("source"))){let o=i.getAttribute("src");o&&r.push(o)}return r}function ik(e,t){let n;try{n=new URL(e,nk(t))}catch{return null}return n.protocol!=="http:"&&n.protocol!=="https:"?null:n}function ok(){return typeof window.origin=="string"?window.origin:window.location.origin}function ak(e,t){if(typeof window>"u")return null;let n=ik(e,t);if(!n)return null;let r=ok(),i=r==="null";return!i&&n.origin===r||tk(t)?null:i?"opaque_document_origin":"cross_origin_no_cors"}function Sy(e){return(typeof e.currentSrc=="string"?e.currentSrc:"")?!0:qi(e,"src")}function yr(e){for(let t of rk(e)){let n=ak(t,e);if(n)return{kind:"decode-only",reason:n,asset:t}}return{kind:"web-audio"}}function sk(e){let t=[];qi(e,xn)&&t.push("fx-chain"),qi(e,Nt)&&t.push("automation"),qi(e,Ko)&&t.push("audio-group");let n=Number.parseFloat(Fc(e,"data-volume")??"");return Number.isFinite(n)&&n>1&&t.push("above-unity-gain"),t}function lk(){return typeof window<"u"&&!!window.__HF_EXPORT_RENDER_SEEK_CONFIG}var xy=new WeakSet,uk={cross_origin_no_cors:"cross-origin media without a `crossorigin` opt-in is silent through createMediaElementSource (Web Audio spec); using native playback instead",opaque_document_origin:"this document\'s security origin is opaque (a sandbox without `allow-same-origin`), so no media is same-origin with it and createMediaElementSource would be silent (Web Audio spec); using native playback instead"},ck={cross_origin_no_cors:"proxy or download the asset to a same-origin URL to keep it.",opaque_document_origin:"add `allow-same-origin` to the sandbox, or serve the asset with a `crossorigin` attribute and an `Access-Control-Allow-Origin` of `null` or `*`, to keep it."};function xr(e,t){if(t.kind==="web-audio"||lk()||xy.has(e))return;let n=sk(e);xy.add(e);let r={asset:t.asset,reason:t.reason,lostProcessing:n,note:uk[t.reason]};Ae({source:"hf-preview",type:"diagnostic",code:yy,details:r});let i=n.length>0?` Native playback cannot reproduce: ${n.join(", ")} \\u2014 ${ck[t.reason]}`:"";console.info(`[hyperframes] ${yy}: "${t.asset}" (${t.reason}): Web Audio capture withheld; the track plays through native HTMLMediaElement output.${i}`)}function Ic(e){return!Number.isFinite(e)||e<=0?1:e}function vy(e){return et(e)}function dk(e,t){t||e.paused||!Fo().__hfDebug||console.debug("[hyperframes] webAudioTransport claimed fallback-playing element:",e.currentSrc||e.getAttribute("src")||"")}function mk(e,t){let{elapsed:n,mediaStart:r,scheduledAt:i,globalRate:o,mediaRate:a,clipDuration:s}=t,l=Number.isFinite(s)&&s>0,u=s*a;if(n>=0){let f=n*a,m=u-f;return l&&m<=0?!1:(l?e.start(0,f+r,m):e.start(0,f+r),!0)}let d=-n/o;return l?e.start(i+d,r,u):e.start(i+d,r),!0}function Ka(e,t,n){let r=ry(gy(e));r&&_c([{param:t.gain}],r,Co.scale,n)}function Sr(e){return e.sourceKind==="buffer"}var fk=1e4,Ya=class{constructor(){ce(this,"_ctx",null);ce(this,"_bufferCache",new Map);ce(this,"_failedSrcs",new Set);ce(this,"_mediaElementSources",new WeakMap);ce(this,"_activeSources",[]);ce(this,"_masterGain",null);ce(this,"_monitorGain",null);ce(this,"_masterVolume",1);ce(this,"_masterMuted",!1);ce(this,"_groups",new Map);ce(this,"_metering",!1);ce(this,"_masterTap",null);ce(this,"_groupTaps",new Map);ce(this,"_rateAnchorCtx",0);ce(this,"_rateAnchorComp",0);ce(this,"_rate",1);ce(this,"_paused",!0);ce(this,"_playGeneration",0);ce(this,"_playingCaptured",new Set);ce(this,"_suspendPending",!1);ce(this,"_restTimer",null)}async init(){try{return this._ctx=new AudioContext,this._ctx.onstatechange=()=>this.rest(),this._masterGain=this._ctx.createGain(),this._monitorGain=this._ctx.createGain(),this._masterGain.connect(this._monitorGain),this._monitorGain.connect(this._ctx.destination),this.applyMasterGain(),this._metering&&this.attachMasterTap(),!0}catch{return!1}}async wake(){!this._ctx||this._ctx.state==="running"&&!this._suspendPending||(this._suspendPending=!1,await this._ctx.resume())}rest(){this._restTimer!==null&&clearTimeout(this._restTimer),this._restTimer=null,!(!this._ctx||this._ctx.state!=="running"||this._suspendPending)&&(this._restTimer=setTimeout(()=>{this._restTimer=null,this.suspendIfIdle()},fk))}suspendIfIdle(){for(let t of this._playingCaptured)t.paused&&this._playingCaptured.delete(t);!this._ctx||!this._paused||this._suspendPending||this._playingCaptured.size>0||(this._suspendPending=!0,this._ctx.suspend().catch(t=>{this._suspendPending=!1,O("webAudioTransport.suspend",t)}))}get context(){return this._ctx}getTime(){return!this._ctx||this._paused?-1:this._rateAnchorComp+(this._ctx.currentTime-this._rateAnchorCtx)*this._rate}async decodeAudioElement(t){let n=t.currentSrc||t.getAttribute("src");if(!n)return null;if(this._bufferCache.has(n))return this._bufferCache.get(n);if(this._failedSrcs.has(n)||!this._ctx)return null;let r;try{let i=await fetch(n,{cache:"no-store"});if(!i.ok)return O("webAudioTransport.fetch",new Error(`${i.status} ${n}`)),null;r=await i.arrayBuffer()}catch(i){return O("webAudioTransport.fetch",i),null}try{let i=await this._ctx.decodeAudioData(r);return this._bufferCache.set(n,i),i}catch(i){return this._failedSrcs.add(n),O("webAudioTransport.decode",i),null}}startGeneration(){return this._playGeneration+=1,this._playGeneration}currentGeneration(){return this._playGeneration}acquireMediaElementSource(t){let n=this._mediaElementSources.get(t);if(n){let a=yr(t);if(a.kind!=="web-audio"){try{n.disconnect()}catch{}return this._mediaElementSources.delete(t),xr(t,a),null}return n}if(!this._ctx)return null;let r=yr(t);if(r.kind!=="web-audio")return xr(t,r),null;let i=this._ctx.createMediaElementSource(t);this._mediaElementSources.set(t,i),t.paused||this._playingCaptured.add(t),t.addEventListener("play",()=>{this._playingCaptured.add(t),this.wake()});let o=()=>{this._playingCaptured.delete(t),this.rest()};return t.addEventListener("pause",o),t.addEventListener("emptied",o),i}async scheduleMediaElementPlayback(t,n,r,i,o,a,s=1){if(!this._ctx||!this._masterGain||a!==this._playGeneration)return null;try{if(await this.wake(),a!==this._playGeneration)return null;let l=this.acquireMediaElementSource(t);if(!l)return null;l.disconnect();let u=Ic(s),d=this._ctx.createGain();d.gain.value=o;let f=this._ctx.currentTime,m=i-n,p={scheduledAt:f,elapsed:m,rate:u},g=ja(this._ctx,t,l,d,p);d.connect(this.resolveDestination(t,f,i,u)??this._masterGain),Ka(t,d,p),this._rate=u,this._rateAnchorCtx=f,this._rateAnchorComp=i;let b={fx:g,el:t,sourceNode:l,sourceKind:"media-element",gainNode:d,compositionStart:n,mediaStart:r,scheduledAt:f,priorMuted:t.muted,priorVolume:t.volume,mediaPlaybackRate:Ve(t),bounded:!1};return t.volume=1,this._activeSources.push(b),this._paused=!1,b}catch(l){return O("webAudioTransport.mediaElementSource",l),null}}groupInput(t,n,r){let i=this._groups.get(t);if(i){if(i.generation!==this._playGeneration)try{i.reanchor(r),i.generation=this._playGeneration}catch(m){O("webAudioTransport.groupReanchor",m)}return i.input}if(!this._ctx||!this._masterGain)return null;let o=this._ctx.createGain(),a=this._ctx.createGain();a.connect(this._masterGain);let s=()=>gl(n,t),l=s(),u=this._ctx.createGain();u.gain.value=l?.hasAttribute("data-hidden")?0:1,u.connect(a);let d=this._ctx.createGain();d.gain.value=vy(hl(l)),d.connect(u);let f=ja(this._ctx,l??{getAttribute:()=>null},o,d,r);return l&&Ka(l,d,r),this._groups.set(t,{input:o,output:a,isPresent:()=>s()!==null,fader:d,muteGain:u,fx:f,generation:this._playGeneration,reanchor:m=>{Vi([{param:d.gain}]);let p=s();d.gain.value=vy(hl(p)),u.gain.value=p?.hasAttribute("data-hidden")?0:1,f?.reanchor(m),p&&Ka(p,d,m)},dispose:()=>{try{f?.dispose(),o.disconnect(),d.disconnect(),u.disconnect(),a.disconnect()}catch{}}}),this.attachGroupTap(t,a),o}startMetering(){this._metering=!0,this.attachMasterTap();for(let[t,n]of this._groups)this.attachGroupTap(t,n.output)}stopMetering(){this._metering=!1,this._masterTap?.dispose(),this._masterTap=null;for(let t of this._groupTaps.values())t.dispose();this._groupTaps.clear()}readLevels(){let t={};for(let[n,r]of this._groupTaps)this._groups.get(n)?.isPresent()&&(t[n]=r.read());return{master:this._masterTap?.read()??{l:0,r:0},groups:t}}attachMasterTap(){this._ctx&&this._masterGain&&!this._masterTap&&(this._masterTap=Nc(this._ctx,this._masterGain))}attachGroupTap(t,n){this._metering&&this._ctx&&!this._groupTaps.has(t)&&this._groupTaps.set(t,Nc(this._ctx,n))}setGroupMuted(t,n){let r=this._groups.get(t);if(r)try{r.muteGain.gain.value=n?0:1}catch(i){O("webAudioTransport.setGroupMuted",i)}}resolveDestination(t,n,r,i){if(!this._masterGain)return null;let o=Xo(t);if(!o)return this._masterGain;let a={scheduledAt:n,elapsed:r,rate:i};return this.groupInput(o,t.ownerDocument,a)??this._masterGain}handleSourceEnded(t,n,r,i){let o=this._activeSources.indexOf(n);if(o!==-1){this._activeSources.splice(o,1),r.muted=i;try{t.disconnect(),n.fx?.dispose(),n.gainNode.disconnect()}catch{}this._activeSources.length===0&&(this._paused=!0)}}async schedulePlayback(t,n,r,i,o,a,s,l=1,u=Number.POSITIVE_INFINITY){if(!this._ctx||!this._masterGain||s!==this._playGeneration)return null;try{if(await this.wake(),s!==this._playGeneration)return null;let d=o(),f=Ic(l),m=Ve(t),p=f*m,g=this._ctx.createBufferSource();g.buffer=n,g.playbackRate.value=p;let b=this._ctx.createGain();b.gain.value=a;let y=d-r,v=this._ctx.currentTime,A={scheduledAt:v,elapsed:y,rate:f},E=ja(this._ctx,t,g,b,A);if(b.connect(this.resolveDestination(t,v,d,f)??this._masterGain),Ka(t,b,A),this._rate=f,this._rateAnchorCtx=v,this._rateAnchorComp=d,!mk(g,{elapsed:y,mediaStart:i,scheduledAt:v,globalRate:f,mediaRate:m,clipDuration:u}))return g.disconnect(),E?.dispose(),b.disconnect(),null;let T=t.muted;t.muted=!0,dk(t,T);let P={fx:E,el:t,sourceNode:g,sourceKind:"buffer",gainNode:b,compositionStart:r,mediaStart:i,scheduledAt:v,priorMuted:T,priorVolume:t.volume,mediaPlaybackRate:m,bounded:Number.isFinite(u)&&u>0};return this._activeSources.push(P),this._paused=!1,g.addEventListener("ended",()=>this.handleSourceEnded(g,P,t,T)),P}catch(d){return O("webAudioTransport.schedule",d),null}}setRate(t){let n=Ic(t);if(n===this._rate)return!1;this._ctx&&!this._paused&&(this._rateAnchorComp=this.getTime(),this._rateAnchorCtx=this._ctx.currentTime),this._rate=n;for(let r of this._activeSources)try{Sr(r)&&(r.sourceNode.playbackRate.value=n*r.mediaPlaybackRate),r.fx?.setRate(n)}catch(i){O("webAudioTransport.setRate",i)}for(let r of this._groups.values())try{r.fx?.setRate(n)}catch(i){O("webAudioTransport.setRate.group",i)}return!0}hasBoundedActiveSources(){return this._activeSources.some(t=>Sr(t)&&t.bounded)}stopAll(){for(let t of this._activeSources){try{Sr(t)&&t.sourceNode.stop(),t.sourceNode.disconnect(),t.fx?.dispose(),t.gainNode.disconnect()}catch{}Sr(t)?t.el.muted=t.priorMuted:(t.el.volume=t.priorVolume,this._ctx&&t.sourceNode.connect(this._ctx.destination))}this._activeSources=[],this._paused=!0,this._playGeneration+=1,this.rest()}setVolume(t){this._masterVolume=Math.max(0,Math.min(1,t)),this.applyMasterGain()}setElementVolume(t,n){let r=et(n);for(let i of this._activeSources)if(i.el===t)try{i.sourceKind==="media-element"&&(i.el.volume=1),i.gainNode.gain.value=r}catch(o){O("webAudioTransport.setElementVolume",o)}}setMuted(t){this._masterMuted=t,this.applyMasterGain()}applyMasterGain(){this._monitorGain&&(this._monitorGain.gain.value=this._masterMuted?0:this._masterVolume)}ownsClock(){return!this._paused&&this._activeSources.some(Sr)}ownsElement(t){return!this._paused&&this._activeSources.some(n=>n.el===t&&Sr(n))}routesElement(t){return!this._paused&&this._activeSources.some(n=>n.el===t)}destroy(){this.stopAll(),this.stopMetering();for(let t of this._groups.values())t.dispose();if(this._groups.clear(),this._bufferCache.clear(),this._failedSrcs.clear(),this._mediaElementSources=new WeakMap,this._playingCaptured.clear(),this._suspendPending=!1,this._restTimer!==null&&clearTimeout(this._restTimer),this._restTimer=null,this._ctx)try{this._ctx.close()}catch{}this._ctx=null,this._masterGain=null,this._monitorGain=null,this._masterVolume=1,this._masterMuted=!1}};var zi="data-hf-studio-manual-edit-gesture";var Ey=`[${zi}]`;function Ay(e,t){let n=e.defaultView?.MutationObserver??globalThis.MutationObserver;if(!n||!e.documentElement)return{isActive:()=>e.querySelector(Ey)!=null,observing:!1,disconnect:()=>{}};let r=new Set(e.querySelectorAll(Ey)),i=s=>{for(let l of s){let u=l.target;Me(u)&&(u.hasAttribute(zi)?r.add(u):r.delete(u))}},o=s=>{s.length!==0&&(i(s),t())},a=new n(o);return a.observe(e.documentElement,{subtree:!0,attributes:!0,attributeFilter:[zi]}),{observing:!0,isActive:()=>{o(a.takeRecords());for(let s of r){if(s.isConnected&&s.hasAttribute(zi))return!0;r.delete(s)}return!1},disconnect:()=>{a.disconnect(),r.clear()}}}var wy=333.3333333333333,_y=1e3*60/60;function Cy(e){return e.isPlaying&&e.hasCapturedTimeline&&e.currentTimeSeconds<2?!1:e.compositionChanged===!0?!0:e.isPlaying?e.playingPollDue===!0:Number.isInteger(e.tick)&&e.tick>0&&e.tick%60===0}var pk=/^\\s*spring\\(\\s*([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+))\\s*\\)\\s*$/;function Ry(e){return Math.max(0,Math.min(1,e))}function Ty(e){let t=pk.exec(e);if(!t)return null;let n=Number(t[1]);return Number.isFinite(n)?Ry(n):null}function ky(e,t){if(!Number.isFinite(e))return e;if(e<=0)return 0;if(e>=1)return 1;let n=Ry(t),r=12-n*6,i=Math.PI*2*(1+n*1.5),o=1-Math.exp(-r)*Math.cos(i);return(1-Math.exp(-r*e)*Math.cos(i*e))/o}var hk=/^\\s*wiggle\\(\\s*(\\d+)\\s*,\\s*(easeOut|easeInOut|anticipate|uniform)\\s*(?:,\\s*([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?)\\s*)?\\)\\s*$/,gk=Math.PI*2;function bk(e){let t=hk.exec(e);if(!t)return null;let n=Number(t[1]);if(!Number.isSafeInteger(n)||n<1)return null;let r=t[2];if(r!=="easeOut"&&r!=="easeInOut"&&r!=="anticipate"&&r!=="uniform")return null;if(t[3]===void 0)return{wiggles:n,type:r};let i=Number(t[3]);return!Number.isFinite(i)||i<0||i>1?null:{wiggles:n,type:r,amplitude:i}}function yk(e,t,n,r){if(!Number.isFinite(e))return e;if(e<=0)return 0;if(e>=1)return 1;let i=r??(n==="easeInOut"?.08:n==="uniform"?.14:n==="anticipate"?.12:.16),o=n==="easeInOut"?i*Math.sin(Math.PI*e):n==="uniform"?i:i*(1-e);return e+(n==="anticipate"?-1:1)*o*Math.sin(gk*t*e)}function My(e,t){let n=bk(e);if(!n)return null;let r=`${n.wiggles}:${n.type}:${n.amplitude??"default"}`,i=t?.get(r);if(i)return i;let o=a=>yk(a,n.wiggles,n.type,n.amplitude);return t?.set(r,o),o}var xk=24,Ly=e=>e>=1?1:0,Sk=e=>e,Xa=String.raw`([+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?)`,vk=new RegExp(String.raw`^\\s*M\\s*0\\s*,\\s*0\\s+C\\s*${Xa}\\s*,\\s*${Xa}\\s+${Xa}\\s*,\\s*${Xa}\\s+1\\s*,\\s*1\\s*$`,"i");function Ny(e,t,n){let r=1-e;return 3*r*r*e*t+3*r*e*e*n+e*e*e}function Ek(e,t,n,r,i){if(!Number.isFinite(e))return e;if(e<=0)return 0;if(e>=1)return 1;let o=0,a=1;for(let s=0;s<xk;s+=1){let l=(o+a)/2;Ny(l,t,r)<e?o=l:a=l}return Ny((o+a)/2,n,i)}function Ak(e){let t=vk.exec(e);if(!t)return null;let n=Number(t[1]),r=Number(t[2]),i=Number(t[3]),o=Number(t[4]);return Math.min(n,i)<0||Math.max(n,i)>1?null:a=>Ek(a,n,r,i,o)}function wk(e,t){if(!e.startsWith("spring("))return null;let n=Ty(e);if(n===null)return null;let r=t.get(n);if(r)return r;let i=o=>ky(o,n);return t.set(n,i),i}function _k(e,t){if(!e.startsWith("custom(")||!e.endsWith(")"))return null;let n=e.slice(7,-1),r=t.get(n);if(r)return r;let i=Ak(n);return i&&t.set(n,i),i}function Fy(e){if(e.__hfCustomEaseInstalled)return!0;let t=e.parseEase;if(!t)return!1;let n=new Map,r=new Map,i=new Map,o=l=>typeof l!="string"?null:l==="hold"?Ly:My(l,i)??wk(l,r)??_k(l,n),a=(l,u,d=[])=>{let f=o(l);return f||(typeof l=="string"&&/^(?:hold|spring|wiggle|custom)(?:\\(|$)/.test(l.trim())&&tt("custom_ease_parse_failed",{ease:l}),t.call(u,l,...d)??Sk)};e.parseEase=function(u,...d){return a(u,this,d)};let s=e.registerEase;if(typeof s=="function"){s("hold",Ly);let l=u=>{let d=f=>f;d.config=(...f)=>a(`${u}(${f.join(",")})`,e),s(u,d)};l("spring"),l("wiggle"),l("custom")}return e.__hfCustomEaseInstalled=!0,!0}var Pc="first-frame",Ck=3;function Rk(e){let t=e.ownerDocument?.defaultView;return t&&e instanceof t.Element?!0:e instanceof Element}function Tk(e){if(!Rk(e)||e.tagName!=="AUDIO"&&e.tagName!=="VIDEO")return!1;let t=e.ownerDocument?.defaultView;return t&&e instanceof t.HTMLMediaElement?!0:e instanceof HTMLMediaElement}function kk(e){return e.hasAttribute("data-start")||e.hasAttribute("data-track-index")}function Mk(e,t,n,r){let i=e;for(;i;){if(kk(i)&&!ca(i,{currentTime:r,compositionDuration:Number.POSITIVE_INFINITY,canonicalFps:30,exportRenderSeek:!1,timelineRegistry:n,resolver:t}))return!1;i=i.parentElement}return!0}function Iy(e,t,n,r,i){return t==="all"?!0:Mk(e,n,r,i)}function Lk(e,{scope:t="all",currentTime:n=0}={}){let r=e.defaultView,i=Xe({documentRef:e,timelineRegistry:r?.__timelines,includeAuthoredTimingAttrs:!0}),o=e.querySelector(`meta[name="${Mo}"]`)!==null,a=Array.from(e.querySelectorAll("video, audio")).filter(Tk).filter(u=>Iy(u,o&&u.preload!=="auto"?Pc:t,i,r?.__timelines??{},n)).filter(u=>u.readyState<Ck),s=Array.from(e.querySelectorAll("img")).filter(u=>Iy(u,u.getAttribute("loading")?.toLowerCase()==="lazy"?Pc:t,i,r?.__timelines??{},n)).filter(u=>!u.complete),l=e.fonts?.status==="loading";return{pendingMedia:a,pendingImages:s,fontsLoading:l}}function Nk(e,{pendingMedia:t,pendingImages:n,fontsLoading:r},i){let o=t.map(l=>new Promise(u=>{if(l.error){u();return}let d=()=>{l.removeEventListener("canplay",d),l.removeEventListener("error",d),i.removeEventListener("abort",d),u()};l.addEventListener("canplay",d),l.addEventListener("error",d),i.addEventListener("abort",d,{once:!0})})),a=n.map(l=>l.decode?l.decode().catch(()=>{}):Promise.resolve()),s=r&&e.fonts?e.fonts.ready.then(()=>{}):Promise.resolve();return Promise.all([...o,...a,s]).then(()=>{})}function Fk(e,t,{scope:n="all",currentTime:r=0}={}){let i=Lk(e,{scope:n,currentTime:r});return i.pendingMedia.length===0&&i.pendingImages.length===0&&!i.fontsLoading?null:Nk(e,i,t)}var Ik=50;function Dk(e,t){let n=e.defaultView;return!n||n.__renderReady||!n.__hf?null:new Promise(r=>{let i,o=()=>{i!==void 0&&clearTimeout(i),t.removeEventListener("abort",o),r()};if(t.aborted){o();return}t.addEventListener("abort",o,{once:!0});let a=()=>{if(n.__renderReady){o();return}i=setTimeout(a,Ik)};a()})}var Pk=50,Ok=1.5,Hk=2,Gk=1500;function Dc(e,t){return new Promise(n=>{if(t.aborted){n(-1);return}let r=0,i=()=>{e.cancelAnimationFrame?.(r),n(-1)};t.addEventListener("abort",i,{once:!0}),r=e.requestAnimationFrame(o=>{t.removeEventListener("abort",i),n(o)})})}function Bk(e,t){let n=e.defaultView;return n?(async()=>{let r=await Dc(n,t);if(t.aborted)return;let i=await Dc(n,t),o=i-r,a=0;for(;!t.aborted&&a<Hk;){if(i-r>=Gk)return;let s=await Dc(n,t);if(t.aborted)return;let l=s-i;o=Math.min(o,l),a=l<Pk||l<=o*Ok?a+1:0,i=s}})():null}var Uk=8e3;function Vk(e,t,n={}){let r=n.inputs??[(u,d)=>Fk(u,d,{scope:n.scope,currentTime:n.currentTime}),Dk,Bk],i=new AbortController,o=r.map(u=>u(e,i.signal)).filter(u=>u!==null);if(o.length===0){t({timedOut:!1});return}let a=n.timeoutMs??Uk,s,l=new Promise(u=>{s=setTimeout(()=>u("timed-out"),a)});Promise.race([Promise.all(o).then(()=>"done"),l]).then(u=>{clearTimeout(s),i.abort(),t({timedOut:u==="timed-out"})})}function Dy(e,t,n={}){Vk(e,t,{...n,scope:Pc})}var Gc=new Map,ji=new Map,Oc=new Map,Hc=()=>{},Oy=()=>{},Py=0;function Bc(e){return/^[a-z][a-z0-9-]{0,63}$/.test(e)}function Hy(e){let t=(Oc.get(e)??0)+1;return Oc.set(e,t),t}function Gy(e){return typeof e=="number"&&Number.isSafeInteger(e)&&e>0?e:(Py-=1,Py)}function Uc(e,t){let n=ji.get(e);if(!n)return;let r=()=>Oc.get(e)===t.generation&&ji.get(e)===n;try{Promise.resolve(n(t.payload)).then(()=>{r()&&Oy(e,t.requestId)},i=>{r()&&Hc(e,t.requestId,i)})}catch(i){r()&&Hc(e,t.requestId,i)}}function By(e){Hc=e}function Uy(e){Oy=e}function Ja(e,t,n){if(!Bc(e))return;let r={payload:t,requestId:Gy(n),generation:Hy(e)};Gc.set(e,r),Uc(e,r)}function Qa(e,t){Bc(e)&&(Gc.delete(e),Uc(e,{payload:void 0,requestId:Gy(t),generation:Hy(e)}))}function Vy(e,t){if(!Bc(e))throw new Error(`Invalid HyperFrames runtime-data channel: ${e}`);ji.set(e,t);let n=Gc.get(e);return n&&Uc(e,n),()=>{ji.get(e)===t&&ji.delete(e)}}var Wy=!1;function Tt(e){if(e){if(typeof e.pause!="function"){Wy||(Wy=!0,tt("timeline_missing_pause",{}));return}try{e.pause()}catch(t){O("runtime.timeline.pause",t)}}}function qk(e){let t=e;if(typeof t.remove=="function")for(let n of e.getChildren?.(!1,!0,!1)??[])n.data===Dr&&t.remove(n)}function zk(){let e=window.__HF_EXPORT_RENDER_SEEK_CONFIG,t=e?.fps,n=e?.fpsSource,r=Number(t);return!e||t==null?{fps:null,source:"default",rawFpsSource:n,rawFps:t,fallbackReason:"missing"}:!Number.isFinite(r)||r<=0?{fps:null,source:"default",rawFpsSource:n,rawFps:t,fallbackReason:"invalid"}:{fps:r,source:n==="render-options"||n==="default"?n:"unknown",rawFpsSource:n,rawFps:t,fallbackReason:e.fpsFallbackReason}}function jk(e,t){return t!==null&&e.length===t.length&&e.every((n,r)=>n===t[r])}function $y(e,t,n){let r=null,i=!0;return()=>{let o=e();if(o.length===0)return r=null,i=!0,!0;if(jk(o,r))return i;r=o,i=!1;let a=o.length===1?o[0]:Promise.all(o);return Promise.resolve(a).then(()=>{r===o&&(i=!0,t())},s=>{r===o&&(i=!0,n(s),t())}),i}}function Ki(e){let t=e.querySelector(`meta[name="${Li}"]`)?.getAttribute("content");if(!t)return null;try{return JSON.parse(t)}catch{return null}}var qc=e=>JSON.stringify([Array.from(e.attributes,t=>[t.name,t.value]).filter(([t])=>t!==En),e.innerHTML]),Kk=new Set(["style","preload","src",En,nn]),Yk=e=>e.split(/\\s+/).filter(t=>t&&!t.startsWith("__hf-")).join(" "),qy=e=>JSON.stringify([Array.from(e.attributes,({name:t,value:n})=>[t,t==="class"?Yk(n):n]).filter(([t,n])=>!Kk.has(t)&&!(t==="class"&&!n)).sort(([t],[n])=>t<n?-1:1),e.hasAttribute("data-var-src")?null:ri(e),e.innerHTML]),Yi=new WeakMap,jy=e=>e.localName==="video"||e.localName==="audio",Wc=e=>{if(!Me(e))return;let t=jy(e)?[e]:e.firstElementChild?e.querySelectorAll("video, audio"):[];for(let n of t)Yi.has(n)||Yi.set(n,qc(n))},Za=null;function Ky(){typeof MutationObserver>"u"||!Ki(document)||(Wc(document.documentElement),Za=new MutationObserver(e=>{for(let t of e){t.addedNodes.forEach(Wc);let{target:n}=t;Me(n)&&jy(n)&&Yi.set(n,qc(n))}}),Za.observe(document.documentElement,{childList:!0,subtree:!0}))}function Yy(){let e=i=>i?.config?.({force3D:!1}),t=Object.getOwnPropertyDescriptor(window,"gsap"),n=window.gsap;if(e(n),t?.configurable===!1||t?.get?.hfFlat)return;let r=Object.assign(()=>t?.get?t.get.call(window):n,{hfFlat:!0});Object.defineProperty(window,"gsap",{configurable:!0,enumerable:!0,get:r,set:i=>{t?.set?t.set.call(window,i):n=i,e(i)}})}var Xk=new Map([["image",["href","xlink:href"]],["object",["data"]]]),Jk=1e3;function Qk(){let e;return()=>e??(e=document.getAnimations())}var $c=e=>ko(e)||xe(e)&&Wo(e)&&Hf({volume:Number.parseFloat(e.dataset.volume??""),fxChain:e.getAttribute("data-fx-chain"),automation:e.getAttribute("data-automation"),audioGroup:e.getAttribute("data-audio-group")}),Xy="audio[data-start], video[data-start]",Vc=e=>Array.from(e.querySelectorAll(Xy)).filter($c);function zy(e){let t=e.matches(`[${Ys}]`)?[e]:Array.from(e.querySelectorAll(`img[${Ys}]`)).filter(n=>n.closest("[data-start]")===e);for(let n of t)n.setAttribute("loading","eager")}function Jy(){let e=Yl();Wn()&&(e.currentTime=Lo(window.location.search));let t=e.currentTime>0;Za?.disconnect(),Za=null,Ki(document)&&Wc(document.documentElement);let n=()=>{};rf(Ae),By((c,h,x)=>{Ae({source:"hf-preview",type:"runtime-data-error",channel:c,requestId:h,message:x instanceof Error?x.message:String(x)})}),Uy((c,h)=>{try{n()}catch(x){Ae({source:"hf-preview",type:"runtime-data-error",channel:c,requestId:h,message:x instanceof Error?x.message:String(x)});return}Ae({source:"hf-preview",type:"runtime-data-applied",channel:c,requestId:h})}),Fi(document),mr(document),ap(document),Js(document);let r=zk();if(e.canonicalFps=r.fps??e.canonicalFps,ef(e.canonicalFps),window.__HF_EXPORT_RENDER_SEEK_CONFIG){let c=JSON.stringify({canonicalFps:e.canonicalFps,source:r.source,rawFpsSource:r.rawFpsSource,rawFps:r.rawFps,fallbackReason:r.fallbackReason});console.info(`[hyperframes] render runtime fps ${c}`)}let i=null,o=null,a=null,s=[],l=new Set,u=null,d=new Set,f=(c,h,x)=>{d.has(c)||(d.add(c),tt(h,x))};if(typeof window.__hfRuntimeTeardown=="function")try{window.__hfRuntimeTeardown()}catch(c){O("runtime.init.site1",c)}let m=new za({initialTime:e.currentTime});e.transportClock=m;let p=new Ya,g=!1;p.init().then(c=>{g=c}),window.__hf=window.__hf||{};let b=c=>c.closest("[data-hidden]")!==null||Yo(c.ownerDocument,c),y=()=>{let c=window.gsap,h=window;if(!(!c?.registerPlugin||h.__hfAutoNoopRegistered))try{c.registerPlugin({name:"_auto",init:()=>!1}),h.__hfAutoNoopRegistered=!0}catch(x){f("auto_marker_install_failed","auto_marker_install_failed",{reason:"threw"}),O("runtime.autoMarker.install",x)}},v=()=>{let c=window.gsap;if(!c){f("custom_ease_missing_gsap","custom_ease_install_failed",{reason:"missing_gsap"});return}try{Fy(c)||f("custom_ease_no_parse_ease","custom_ease_install_failed",{reason:"no_parseEase"})}catch(h){f("custom_ease_install_threw","custom_ease_install_failed",{reason:"threw"}),O("runtime.customEase.install",h)}};y(),v(),document.documentElement&&(document.documentElement.style.margin="0",document.documentElement.style.padding="0",document.documentElement.style.overflow="hidden"),document.body&&(document.body.style.margin="0",document.body.style.padding="0",document.body.style.overflow="hidden");try{df(document)}catch(c){O("runtime.init.cssVariables",c)}if(window.__timelines=window.__timelines||{},Array.isArray(window.__timelines)){let c=window.__timelines,h=Et()?.getAttribute("data-composition-id")??"root",x={};if(c.length===1)x[h]=c[0];else for(let S=0;S<c.length;S++)x[`tl-${S}`]=c[S];window.__timelines=x}let A=Et();A&&!A.hasAttribute("data-start")&&A.setAttribute("data-start","0");let E=c=>{s.push(c)};E(Al()),E(Al());let T=(c,h,x)=>{let S=x??`${c}:${JSON.stringify(h)}`;l.has(S)||(l.add(S),Ae({source:"hf-preview",type:"diagnostic",code:c,details:h}))},P=c=>{let h={scale:1,focusX:960,focusY:540},x=[],S=[],w={time:c.getTime(),duration:c.getDuration(),isPlaying:c.isPlaying(),renderMode:!1,timelineDirty:!1};return{play:c.play,pause:c.pause,seek:c.seek,getTime:c.getTime,getDuration:c.getDuration,isPlaying:c.isPlaying,getMainTimeline:()=>null,getElementBounds:()=>{},getElementsAtPoint:()=>{},setElementPosition:()=>{},previewElementPosition:()=>{},setElementKeyframes:()=>{},setElementScale:()=>{},setElementFontSize:()=>{},setElementTextContent:()=>{},setElementTextColor:()=>{},setElementTextShadow:()=>{},setElementTextFontWeight:()=>{},setElementTextFontFamily:()=>{},setElementTextOutline:()=>{},setElementTextHighlight:()=>{},setElementVolume:()=>{},setStageZoom:()=>{},getStageZoom:()=>h,setStageZoomKeyframes:()=>{},getStageZoomKeyframes:()=>x,addElement:()=>!1,removeElement:()=>!1,updateElementTiming:()=>!1,setElementTiming:()=>{},updateElementSrc:()=>!1,updateElementLayer:()=>!1,updateElementBasePosition:()=>!1,markTimelineDirty:()=>{},isTimelineDirty:()=>!1,rebuildTimeline:()=>{},ensureTimeline:()=>{},enableRenderMode:()=>{},disableRenderMode:()=>{},renderSeek:c.renderSeek,getElementVisibility:()=>({visible:!1}),getVisibleElements:()=>S,getRenderState:()=>({...w,time:c.getTime(),duration:c.getDuration(),isPlaying:c.isPlaying()})}},N=.75,D=.05,R=100,M=240,k=c=>{if(c instanceof Error)return c.message||String(c);if(typeof c=="string")return c;try{return JSON.stringify(c)}catch{return String(c??"")}},U=c=>{let h=c.toLowerCase();return h.includes("cannot read properties of null")||h.includes("cannot set properties of null")?{code:"runtime_null_dom_access",category:"dom-null-access"}:h.includes("failed to execute \'queryselector\'")?{code:"runtime_invalid_selector",category:"selector-invalid"}:h.includes("is not defined")?{code:"runtime_reference_missing",category:"reference-missing"}:{code:"runtime_script_error",category:"script-error"}},K=c=>{let h=An(c);return h===null?null:`${h}px`},X=()=>Et(),L=()=>{let c=X();if(!c)return;let h=K(c.getAttribute("data-width")),x=K(c.getAttribute("data-height"));h&&(c.style.width=h),x&&(c.style.height=x),h&&c.style.setProperty("--comp-width",h),x&&c.style.setProperty("--comp-height",x),h&&(document.documentElement.style.width=h),x&&(document.documentElement.style.height=x),h&&(document.body.style.width=h),x&&(document.body.style.height=x)},C=()=>{let c=X(),h=Array.from(document.querySelectorAll("[data-composition-id]")).filter(x=>x.hasAttribute("data-duration")||x.hasAttribute("data-end"));for(let x of h){if(c&&x===c)continue;let S=x.getAttribute("data-duration"),w=x.getAttribute("data-end");S!=null&&!x.hasAttribute(Kn)&&x.setAttribute(Kn,S),w!=null&&!x.hasAttribute(Yn)&&x.setAttribute(Yn,w),x.removeAttribute("data-duration"),x.removeAttribute("data-end")}},H=()=>{let c=X();if(!c)return;c.style.position||(c.style.position="relative"),c.style.overflow="hidden";let h=K(c.getAttribute("data-width")),x=K(c.getAttribute("data-height"));h&&(c.style.width=h),x&&(c.style.height=x);let S=Array.from(c.children).filter(_=>{let I=_.tagName.toLowerCase();return I==="script"||I==="style"||I==="link"||I==="meta"||!_.hasAttribute("data-start")?!1:!_.hasAttribute("data-hf-autostamped")}),w=S.filter(_=>_.style.getPropertyValue("display")==="none").map(_=>({el:_,priority:_.style.getPropertyPriority("display")}));for(let{el:_}of w)_.style.removeProperty("display");for(let _ of S){let I=_.tagName.toLowerCase(),F=(_.style.top==="0px"||_.style.top==="0")&&(_.style.left==="0px"||_.style.left==="0")&&_.style.width==="100%"&&_.style.height==="100%",$=/translate\\(\\s*-50%\\s*,\\s*-50%\\s*\\)/.test(_.style.transform);if(F&&$&&!_.hasAttribute("data-width")&&!_.hasAttribute("data-height")){let ue=_.style.top,ge=_.style.left,ze=_.style.width,lt=_.style.height;_.style.top="",_.style.left="",_.style.width="",_.style.height="";let je=window.getComputedStyle(_);je.top!=="auto"||je.bottom!=="auto"||je.left!=="auto"||je.right!=="auto"||je.width!=="0px"||je.height!=="0px"||(_.style.top=ue,_.style.left=ge,_.style.width=ze,_.style.height=lt)}let te=window.getComputedStyle(_),fe=te.position;if(fe!=="absolute"&&fe!=="fixed"&&(_.style.position="absolute"),I!=="audio"){let ue=K(_.getAttribute("data-width")),ge=K(_.getAttribute("data-height")),ze=te.width!=="0px"&&te.width!=="auto",lt=te.height!=="0px"&&te.height!=="auto";ue?!_.style.width&&!ze&&(_.style.width=ue):!_.style.width&&te.width==="0px"&&(_.style.width="100%"),ge?!_.style.height&&!lt&&(_.style.height=ge):!_.style.height&&te.height==="0px"&&(_.style.height="100%")}}for(let{el:_,priority:I}of w)_.style.setProperty("display","none",I)},J=c=>Xe({timelineRegistry:window.__timelines??{},includeAuthoredTimingAttrs:c}),B=null,z=c=>{let h=B;B=J(!0);try{return c()}finally{B=h}},q=c=>c&&B?B:J(c),Y=(c,h=0,x)=>q(x?.includeAuthoredTimingAttrs??!0).resolveStartForElement(c,h),j=(c,h)=>q(h?.includeAuthoredTimingAttrs??!0).resolveDurationForElement(c),G=c=>{let h=c.closest("[data-composition-id]"),x=h?Y(h,0):null,S=h?j(h,{includeAuthoredTimingAttrs:!0}):null;return{compositionRoot:h,inheritedStart:x,inheritedDuration:S}},V=c=>q(!0).resolveMediaStartForElement(c);window.__hfResolveMediaStartSeconds=V,s.push(()=>{window.__hfResolveMediaStartSeconds===V&&delete window.__hfResolveMediaStartSeconds});let Z=!!document.querySelector("[data-composition-src]"),de=!1;{let c=document.querySelectorAll("[data-composition-id]:not([data-composition-src])");for(let h of c){let x=h.getAttribute("data-composition-id");if(x&&h.children.length===0&&document.querySelector(`template#${CSS.escape(x)}-template`)){de=!0;break}}}let le=!Z&&!de,Q=[],ae=()=>{Q.push(hh(document))};ae(),E(()=>{for(let c of Q.splice(0))c()});let Te=c=>{if(!c||typeof c.duration!="function")return null;try{let h=Number(c.duration());return Number.isFinite(h)?Math.max(0,h):null}catch{return null}},we=c=>typeof c=="number"&&Number.isFinite(c)&&c>Dt,Ar=()=>Array.from(document.querySelectorAll("video[data-start], audio[data-start]")).length===0?null:z(()=>dh(document,{mediaStart:V,mediaDuration:Bn})),kt=()=>{let c=X();if(!c)return null;let h=window.__timelines??{},x=Xe({timelineRegistry:h,includeAuthoredTimingAttrs:!0});return mh(c,x)},Ox=()=>{let c=window;return!!(c.lottie||c.DotLottie)},td=()=>{let c=X();if(!c)return ir({authoredDurationSeconds:null,clipEndsSeconds:[]});let h=Xe({timelineRegistry:window.__timelines??{},includeAuthoredTimingAttrs:!0});return fh(c,h,{unregisteredLottie:Ox()})},ls=null,Hx=()=>{if(wr)return td();let c=Cr();return ls?.revision!==c&&(ls={revision:c,result:td()}),ls.result},Gx=c=>{window.__hf=window.__hf||{},window.__hf.durationSource={source:c.source,seconds:c.seconds,pendingClips:c.pendingClips},c.source==="derived"&&T("composition_duration_derived",{source:c.source,seconds:c.seconds,pendingClips:c.pendingClips},`composition_duration_derived:${c.seconds}`)},Bx=()=>{let c=Ar();return typeof c!="number"||!Number.isFinite(c)||c<=Dt?null:c},Ux=c=>we(c)?Math.max(Dt,c*N):Dt,us=(c=!1)=>{let h=0;for(let x of e.deterministicAdapters){let S=c?x.getAnimationCycleEndSeconds:x.getInferredDurationSeconds;if(typeof S!="function")continue;let w=null;try{w=S()}catch(_){O("runtime.init.adapterDuration",_)}typeof w=="number"&&Number.isFinite(w)&&w>0&&(h=Math.max(h,w))}return h>Dt?h:null},wr=!1,nd=()=>wr&&window.__HF_EXPORT_RENDER_SEEK_CONFIG!=null,Vx=["data-start","data-duration","data-end","data-composition-id","data-composition-src","data-composition-file","data-root","data-hf-authored-duration","data-hf-authored-end","data-hf-auto-start",$o,"data-playback-rate","data-automation","data-playback-start","data-media-start","id","src"],rd=["loadedmetadata","durationchange","emptied"],Zi=null,id=-1,od=null,dn=null,ad=0,Ut=()=>{},_r=()=>{ad+=1,Ut()},sd=c=>{c.some(h=>h.type==="attributes"?Me(h.target)&&h.attributeName!==null&&h.target.getAttribute(h.attributeName)!==h.oldValue:[...h.addedNodes,...h.removedNodes].some(x=>x.nodeType===1))&&_r()},ld=()=>({media:Bx(),authoredComposition:kt()}),Wx=()=>{let c=window.__timelines??{},h="";for(let x of Object.keys(c)){let S=c[x];S&&(h+=`${x}=${Te(S)??"?"};`)}return h},$x=()=>{if(!(dn||typeof MutationObserver>"u")){dn=new MutationObserver(sd),dn.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,attributeFilter:[...Vx,"data-width","data-height"]});for(let c of rd)document.addEventListener(c,_r,!0);s.push(()=>{dn?.disconnect(),dn=null,_r();for(let c of rd)document.removeEventListener(c,_r,!0)})}},Cr=()=>{$x(),dn&&sd(dn.takeRecords());let c=Wx();return c!==od&&(od=c,_r()),ad},ud=c=>wr?ld():(c??(c=Cr()),Zi&&id===c||(id=c,Zi=ld()),Zi),Ge=(c,h=0,x)=>{let S=null,w=ph({declared:_e(X()?.getAttribute("data-duration")),timeline:()=>Te(c),floors:()=>{let{media:_,authoredComposition:I}=ud(x);return[_,I,us()]},fallback:h,derived:()=>(S=Hx(),S.seconds??0)});return S?Gx(S):window.__hf?.durationSource&&delete window.__hf.durationSource,w},cs=new WeakMap,cd=null,ds=()=>{let c=window.__timelines??{},h=oe=>{let ee=Object.entries(c).filter(W=>!!W[1]&&typeof W[1].play=="function"&&typeof W[1].pause=="function");if(ee.length!==1)return{timeline:null};let ne=ee[0];if(!ne)return{timeline:null};let[re,Ee]=ne;return{timeline:Ee,selectedTimelineIds:[re],selectedDurationSeconds:Te(Ee),diagnostics:{code:"root_timeline_sole_registered_fallback",details:{reason:oe,soleTimelineId:re}}}},x=Xe({timelineRegistry:c,includeAuthoredTimingAttrs:!0}),{media:S,authoredComposition:w}=ud(),_=Math.max(S??0,w??0)||null,I=Ux(_),F=oe=>{let ee=ei(oe);return ee?x.resolveStartForElement(ee,0):0},$=(oe,ee)=>{let ne=ei(ee.compositionId),re=ne?fl({element:ne,timeline:ee.timeline,parent:oe,timelineRegistry:c,resolver:x}):F(ee.compositionId);oe.add(ee.timeline,re),cs.set(ee.timeline,{hostId:ee.compositionId,parent:oe,at:re})},te=(oe,ee)=>{let ne=ee.timeline,re=cs.get(ne);return re&&re.parent===oe&&ne.parent===oe?re:null},fe=(oe,ee)=>Math.abs(oe.at-F(ee.compositionId))<1e-6,$e=(oe,ee)=>{let ne=te(oe,ee),re=ei(ee.compositionId);if(re&&zo(re)){let Ee=fl({element:re,timeline:ee.timeline,parent:oe,timelineRegistry:c,resolver:x});ee.timeline.startTime?.(Ee)}!ne||fe(ne,ee)||$(oe,ee)},ue=oe=>{let ee=window.gsap;if(!ee||typeof ee.timeline!="function")return null;let ne=ee.timeline({paused:!0});for(let re of oe)$(ne,re);return Nr(ze(ne,oe)),ne},ge=(oe,ee)=>{if(!we(oe))return null;let ne=window.gsap;if(!ne||typeof ne.timeline!="function")return null;let re=ne.timeline({paused:!0});if(ee){try{re.add(ee,0)}catch(W){O("runtime.init.site2",W)}Nr(ze(re,[{timeline:ee}]))}let Ee=re;if(typeof Ee.to=="function")try{Ee.to({},{duration:oe,data:Dr})}catch(W){O("runtime.init.site3",W)}return re},ze=(oe,ee)=>{if(!oe||typeof oe.getChildren!="function")return[];try{let ne=oe.getChildren(!0,!0,!0);return Array.isArray(ne)?ee.filter(re=>ne.includes(re.timeline)):[]}catch{return[]}},lt=(oe,ee)=>{let ne=oe,re={addedIds:[],nested:[]};if(typeof ne.getChildren!="function")return re;try{let Ee=ne.getChildren(!0,!0,!0)??[];if(!Array.isArray(Ee))return re;let W=[];for(let ie of ee){if(Ee.includes(ie.timeline)){$e(oe,ie);continue}try{$(oe,ie),W.push(ie.compositionId)}catch(he){O("runtime.init.site4",he)}}return{addedIds:W,nested:ze(oe,ee)}}catch{return re}},je=X(),ke=je?.getAttribute("data-composition-id")??null;if(!ke)return h("root_missing_composition_id");let De=c[ke]??null,Le=(()=>{if(!je)return[];let oe=new Set,ee=Array.from(je.querySelectorAll("[data-composition-id]")),ne=[];for(let re of ee){if(re.hasAttribute("data-hf-inner-root")||re.hasAttribute("data-hf-inner-root"))continue;let Ee=re.getAttribute("data-composition-id");if(!Ee||Ee===ke||oe.has(Ee))continue;oe.add(Ee);let W=c[Ee]??null;if(!W||typeof W.play!="function"||typeof W.pause!="function")continue;let ie=Te(W);ne.push({compositionId:Ee,timeline:W,durationSeconds:ie??0})}return ne})(),Nr=oe=>{for(let ee of oe){let ne=ee.timeline;if(typeof ne.paused=="function")try{ne.paused(!1)}catch(re){O("runtime.init.site5",re)}}};if(De){let oe=Le.length>0?lt(De,Le):{addedIds:[],nested:[]},ee=oe.addedIds;if(Nr(oe.nested),(Le.length>0||!document.querySelector("[data-composition-id]:not([data-composition-id=\'"+ke+"\'])"))&&(Ln=!0),ee.length>0)try{let W=De.time();De.seek(W,!1)}catch{}qk(De);let ne=Te(De);if(!we(ne)&&Le.length>0){let W=Le.map(Ke=>Ke.compositionId),ie=ue(Le),he=Te(ie);if(ie&&we(he))return{timeline:ie,selectedTimelineIds:W,selectedDurationSeconds:he,mediaDurationFloorSeconds:S,diagnostics:{code:"root_timeline_unusable_fallback",details:{rootCompositionId:ke,rootDurationSeconds:ne,fallbackKind:"composite_by_root_children",minCandidateDurationSeconds:I,selectedDurationSeconds:he,mediaDurationFloorSeconds:S,authoredCompositionDurationFloorSeconds:w,selectedTimelineIds:W,autoNestedChildren:ee}}};let be=ge(_??0,De),qe=Te(be);if(be&&we(qe))return{timeline:be,selectedTimelineIds:[ke],selectedDurationSeconds:qe,mediaDurationFloorSeconds:S,diagnostics:{code:"root_timeline_unusable_media_floor_fallback",details:{rootCompositionId:ke,rootDurationSeconds:ne,fallbackKind:"media_duration_floor",mediaDurationFloorSeconds:S,authoredCompositionDurationFloorSeconds:w,selectedDurationSeconds:qe,selectedTimelineIds:[ke],autoNestedChildren:ee}}}}if(!we(ne)&&Le.length===0){let W=ge(_??0,De),ie=Te(W);if(W&&we(ie))return{timeline:W,selectedTimelineIds:[ke],selectedDurationSeconds:ie,mediaDurationFloorSeconds:S,diagnostics:{code:"root_timeline_unusable_media_floor_fallback",details:{rootCompositionId:ke,rootDurationSeconds:ne,fallbackKind:"media_duration_floor",mediaDurationFloorSeconds:S,authoredCompositionDurationFloorSeconds:w,selectedDurationSeconds:ie,selectedTimelineIds:[ke]}}}}let re=_e(je?.getAttribute("data-duration")),Ee=Math.max(we(re)?re:0,w??0);if(Ee>0&&we(Ee)&&we(ne)&&Ee>=ne+.5){let W=De;if(typeof W.to=="function")try{W.to({},{duration:0,data:Dr},Ee)}catch(he){O("runtime.init.site6",he)}let ie=Te(De);if(we(ie))return{timeline:De,selectedTimelineIds:[ke],selectedDurationSeconds:ie,mediaDurationFloorSeconds:S,diagnostics:{code:"root_timeline_padded_to_declared_duration",details:{rootCompositionId:ke,rootDurationSeconds:ne,rootDeclaredDur:re,authoredCompositionDurationFloorSeconds:w,newDur:ie}}}}return{timeline:De,selectedTimelineIds:[ke],selectedDurationSeconds:ne,mediaDurationFloorSeconds:S,diagnostics:ee.length>0?{code:"root_timeline_auto_nested_children",details:{rootCompositionId:ke,selectedDurationSeconds:ne,autoNestedChildren:ee}}:void 0}}if(Le.length>0){let oe=Le.map(W=>W.compositionId),ee=cd,ne=ee?.size===Le.length&&we(Te(ee.timeline))&&Le.every(W=>{let ie=te(ee.timeline,W);return ie!==null&&fe(ie,W)})?ee.timeline:null,re=ne??ue(Le),Ee=Te(re);if(re)return ne||(cd={timeline:re,size:Le.length}),{timeline:re,selectedTimelineIds:oe,selectedDurationSeconds:Ee,mediaDurationFloorSeconds:S,diagnostics:{code:"root_timeline_missing_fallback",details:{rootCompositionId:ke,fallbackKind:"composite_by_root_children",minCandidateDurationSeconds:I,selectedDurationSeconds:Ee,mediaDurationFloorSeconds:S,selectedTimelineIds:oe}}}}return h("root_composition_id_unmatched_in_registry")},Ln=!1,qx=c=>{let h=window.gsap,x=c;if(!(!x||typeof x.getChildren!="function"||!h||typeof h.parseEase!="function"))for(let S of x.getChildren(!0,!0,!0)){let w=S,_=w.timeline;if(!_||!("_ease"in _)||typeof _._ease=="function")continue;let I=w.vars?.keyframes,$=(I&&!Array.isArray(I)?I.ease:void 0)??w.vars?.ease??"none";try{let te=h.parseEase($);typeof te=="function"&&(_._ease=te)}catch(te){tt("keyframe_ease_repair_failed",{ease:typeof $=="string"?$:String($)}),O("runtime.keyframeEase.repair",te)}}},Nn=()=>{if(v(),!le)return!1;let c=e.capturedTimeline,h=Te(c),x=we(h);if(c&&x&&Ln)return!1;let S=ds();if(!S.timeline)return!1;if(c&&c===S.timeline){typeof c.timeScale=="function"&&c.timeScale(e.playbackRate);let _=Ge(c,0);return _>0&&m.setDuration(_),!1}e.capturedTimeline=S.timeline,typeof e.capturedTimeline.timeScale=="function"&&e.capturedTimeline.timeScale(e.playbackRate),qx(e.capturedTimeline);let w=Ge(e.capturedTimeline,0);if(w<=0&&typeof e.capturedTimeline.progress=="function"&&(e.capturedTimeline.progress(1,!0),e.capturedTimeline.progress(0,!1),Tt(e.capturedTimeline)),w>0){try{m.setDuration(w)}catch{}if(typeof e.capturedTimeline.totalTime=="function"){typeof e.capturedTimeline.progress=="function"&&e.capturedTimeline.progress(1e-4,!0);let I=Math.max(0,e.currentTime||0);e.capturedTimeline.totalTime(I,!1),Tt(e.capturedTimeline)}let _=window.__hfStudioManualEditsApply;typeof _=="function"&&_(),Fi(document)}if(S.diagnostics&&Ae({source:"hf-preview",type:"diagnostic",code:S.diagnostics.code,details:S.diagnostics.details}),Ae({source:"hf-preview",type:"diagnostic",code:"timeline_bound",details:{selectedTimelineIds:S.selectedTimelineIds??[],selectedDurationSeconds:S.selectedDurationSeconds??null,mediaDurationFloorSeconds:S.mediaDurationFloorSeconds??null}}),window.parent!==window){let _=X(),I=w>0?w:0,F=String(I>0?I:1),$=new Set,te=ue=>ue.tagName.toLowerCase()===Jn,fe=new Set(document.querySelectorAll("[data-start]")),$e=ue=>{let ge=ue.parentElement;for(;ge&&ge!==_;){if(fe.has(ge))return!0;ge=ge.parentElement}return!1};if(e.capturedTimeline.getChildren)try{for(let ue of e.capturedTimeline.getChildren(!0))if(typeof ue.targets=="function")for(let ge of ue.targets())ye(ge)&&ge!==_&&(te(ge)||ge.hasAttribute("data-start")||$e(ge)||$.has(ge)||($.add(ge),ge.setAttribute("data-start","0"),ge.setAttribute("data-duration",F),ge.setAttribute("data-hf-autostamped","1")))}catch{}if(ye(_))for(let ue of _.querySelectorAll("[id]"))ye(ue)&&ue!==_&&(ue.hasAttribute("data-start")||$e(ue)||$.has(ue)||ue.tagName==="SCRIPT"||ue.tagName==="STYLE"||ue.tagName==="LINK"||te(ue)||($.add(ue),ue.setAttribute("data-start","0"),ue.setAttribute("data-duration",F),ue.setAttribute("data-hf-autostamped","1")))}for(let _ of Vt)Rr.delete(_),ms(_);return!0},dd=()=>{if(e.tornDown)return;let c=ds();if(!c.timeline){e.capturedTimeline=null,Ln=!1,m.setDuration(0),fn(e.currentTime);return}if(e.capturedTimeline!==c.timeline)Ln=!1,Nn();else{let h=Ge(e.capturedTimeline,0);h>0&&h!==m.getDuration()&&(m.setDuration(h),Qe())}fn(e.currentTime),El()};n=()=>{dd(),Qe()},window.__hfForceTimelineRebind=()=>{dd(),Qe()};let zx=()=>{let c=X();if(!ye(c))return;let h=c.getBoundingClientRect(),x=An(c.getAttribute("data-width")),S=An(c.getAttribute("data-height")),w=window.getComputedStyle(c),_=x!==null&&S!==null,I=h.width<=0||h.height<=0||c.clientWidth<=0||c.clientHeight<=0;!_||!I||T("root_stage_layout_zero",{compositionId:c.getAttribute("data-composition-id")??null,declaredWidth:x,declaredHeight:S,rectWidth:Math.round(h.width),rectHeight:Math.round(h.height),clientWidth:c.clientWidth,clientHeight:c.clientHeight,display:w.display,visibility:w.visibility,overflow:w.overflow},`root-stage-layout-zero:${c.getAttribute("data-composition-id")??"unknown"}`)},jx=()=>{e.tornDown||(u!=null&&window.cancelAnimationFrame(u),u=window.requestAnimationFrame(()=>{u=null,zx()}))},Kx=()=>{o=c=>{let h=k(c.error??c.message).slice(0,M);if(!h)return;let x=U(h);Ae({source:"hf-preview",type:"diagnostic",code:x.code,details:{category:x.category,message:h,filename:c.filename||null,line:Number.isFinite(c.lineno)?c.lineno:null,column:Number.isFinite(c.colno)?c.colno:null}})},a=c=>{let h=k(c.reason).slice(0,M);if(!h)return;let x=U(h);Ae({source:"hf-preview",type:"diagnostic",code:`${x.code}_unhandled_rejection`,details:{category:`${x.category}-unhandled-rejection`,message:h}})},window.addEventListener("error",o),window.addEventListener("unhandledrejection",a)},md=new WeakSet,Yx=()=>{let c=Array.from(document.querySelectorAll("img, video, audio, source, link[rel=\'stylesheet\']"));for(let x of c){if(md.has(x))continue;md.add(x);let S=()=>{if(!Me(x))return;let w=x.tagName.toLowerCase(),_=x.getAttribute("src")??x.getAttribute("href")??x.getAttribute("poster")??null,I=w==="link"?"runtime_stylesheet_load_failed":"runtime_asset_load_failed";T(I,{tagName:w,assetUrl:_,currentSrc:(Pe(x)||pe(x))&&x.currentSrc||null,readyState:pe(x)?x.readyState:null,networkState:pe(x)?x.networkState:null},`${I}:${w}:${_??"unknown"}`)};x.addEventListener("error",S),E(()=>{x.removeEventListener("error",S)})}let h=document.fonts;h&&h.ready.then(()=>{if(e.tornDown)return;let x=Array.from(h).filter(S=>S.status==="error").map(S=>S.family).filter(S=>!!S).slice(0,10);x.length!==0&&T("runtime_font_load_issue",{failedFamilies:x,totalFaces:Array.from(h).length},`runtime-font-load-issue:${x.join("|")}`)}).catch(()=>{})},Xx=(c,h)=>{if(!c.timeline)return!1;let x=e.capturedTimeline;if(x&&x===c.timeline)return!1;let S=Math.max(0,e.currentTime||0);e.capturedTimeline=c.timeline,typeof e.capturedTimeline.timeScale=="function"&&e.capturedTimeline.timeScale(e.playbackRate);try{Tt(e.capturedTimeline),typeof e.capturedTimeline.seek=="function"&&e.capturedTimeline.seek(S,!1)}catch(w){O("runtime.init.site7",w)}return Ae({source:"hf-preview",type:"diagnostic",code:"timeline_loop_guard_rebind",details:{reason:h,previousTime:S,selectedTimelineIds:c.selectedTimelineIds??[],selectedDurationSeconds:c.selectedDurationSeconds??null,mediaDurationFloorSeconds:c.mediaDurationFloorSeconds??null}}),!0},mn=null,fd=!1,Vt=new Set,Rr=new WeakMap,eo=()=>{e.tornDown||(mn!=null&&window.clearTimeout(mn),mn=window.setTimeout(()=>{if(e.tornDown||(mn=null,nd()))return;let c=ds();if(!c.timeline||!we(c.mediaDurationFloorSeconds??null))return;if(!e.capturedTimeline){Nn()&&(Qe(),Be(!0));return}if(fd)return;let x=Te(e.capturedTimeline),S=c.selectedDurationSeconds??Te(c.timeline);we(S)&&(!we(x)||S>=x+D)&&Xx(c,"manual")&&(fd=!0,Ae({source:"hf-preview",type:"diagnostic",code:"timeline_rebind_after_media_metadata",details:{previousDurationSeconds:x??null,selectedDurationSeconds:S??null,selectedTimelineIds:c.selectedTimelineIds??[],mediaDurationFloorSeconds:c.mediaDurationFloorSeconds??null}}),Qe(),Be(!0))},R))},pd=c=>{pe(c.currentTarget)&&yp(c.currentTarget)},hd=c=>{pe(c.currentTarget)&&xp(c.currentTarget)},gd=c=>{$c(c)&&Sy(c)&&xr(c,yr(c))},bd=c=>{let h=c.currentTarget;pe(h)&&gd(h)},yd=c=>{c.removeEventListener("loadedmetadata",eo),c.removeEventListener("durationchange",eo),c.removeEventListener("loadedmetadata",pd),c.removeEventListener("loadedmetadata",bd),c.removeEventListener("error",hd),Vt.delete(c)},Jx=()=>{for(let c of Vt)yd(c)},Qx=()=>{for(let c of Vt)c.isConnected||(yd(c),c.pause(),Qs(c))},xd=c=>{let h=Number.parseFloat(c.dataset.volume??"");return Number.isFinite(h)?Math.max(0,Math.min(1,h)):null},to=()=>{if(e.tornDown)return;let c=Array.from(document.querySelectorAll("video, audio")),h=[];for(let x of c){if(Vt.has(x))continue;Vt.add(x);let S=xd(x);S!==null&&(x.volume=S),x.addEventListener("loadedmetadata",eo),x.addEventListener("durationchange",eo),x.addEventListener("loadedmetadata",bd),gd(x),x.addEventListener("loadedmetadata",pd),x.addEventListener("error",hd),bp(x),bs(x)?h.push(x):No(x),ms(x)}h.length>0&&fn(e.currentTime,h)},ms=c=>{Rr.has(c)||Qf(c,e.capturedTimeline,Ge(e.capturedTimeline,0),Rr,{allowLiveTimelineSeek:!window.__HF_RENDER_CAPTURE_MODE})},fs=new WeakMap,Zx=c=>{let h=fs.get(c);if(h!==void 0)return h;let x=window.getComputedStyle(c).position,S=x==="static"||x==="relative"||x==="sticky";return fs.set(c,S),S},ps=new WeakMap,eS=c=>{let h=ps.get(c);if(h!==void 0)return h;let x=c.querySelector("[data-start]")===null;return ps.set(c,x),x},tS=()=>{fs=new WeakMap,ps=new WeakMap},no=new WeakMap,Sd=(c,h)=>{if(!no.has(c)){let x=c.style.getPropertyValue("display"),S=c.style.getPropertyPriority("display"),w=h&&x==="none"&&!S;no.set(c,w?{value:"",priority:""}:{value:x,priority:S})}c.style.display="none"},vd=c=>{let h=no.get(c);h&&(no.delete(c),h.value?c.style.setProperty("display",h.value,h.priority):c.style.removeProperty("display"))},ro=new WeakSet,io=!1,Ed=c=>pe(c)&&c.hasAttribute("data-start")&&($c(c)||p.routesElement(c)),Ad=c=>Ed(c)||Array.from(c.querySelectorAll(Xy)).some(Ed),wd=new WeakMap,nS=(c,h)=>{for(let x of Vc(document)){if(Xo(x)!==c||p.routesElement(x)||b(x))continue;let S=V(x),w=_e(x.dataset.duration),_=w!=null&&w>0?S+w:1/0;if(Number.isFinite(S)&&h<_)return!0}return!1},rS=c=>{let h=!1;for(let x of document.querySelectorAll(Jn)){let S=x.hasAttribute("data-hidden"),w=wd.get(x);w!==S&&(wd.set(x,S),x.id&&(p.setGroupMuted(x.id,S),w&&!S&&nS(x.id,c)&&(h=!0)))}return h},_d=c=>{let h=Ge(e.capturedTimeline,0,c);return(x,S)=>ca(x,{currentTime:S,compositionDuration:h,canonicalFps:e.canonicalFps,exportRenderSeek:!!window.__HF_EXPORT_RENDER_SEEK_CONFIG,timelineRegistry:window.__timelines??{},resolver:q(!0)})},Cd=(c,h,x,S)=>{for(let w=c;w&&w!==S;w=w.parentElement)if(ye(w)&&w.hasAttribute("data-start")&&!x(w,h))return!1;return!0},hs=Wn(),iS=2,Rd=4,gs=(c,h,x,S=iS)=>{let w=pe(c)?V(c):Y(c,Number.NaN),_=w+(j(c)??Number.NaN);return w>x&&w<=x+S||_<=x&&_>=x-S||h(c,x+S)},oo=null,bs=c=>hs&&c.hasAttribute("data-start")&&Jm(c),Tr=new WeakMap,Td=new WeakMap,ao=new WeakSet,kd=c=>c.parentElement?.closest("[data-composition-id]"),oS=c=>{let h=rr(c,Number.NaN),x=lo(Array.from(Vt).filter(_=>_.isConnected&&rr(_,Number.NaN)===h&&kd(_)===kd(c))).mediaClips,S=x.find(_=>_.el===c)?.end??Number.NaN,w;for(let _ of x)_.el!==c&&_.start>=S-Io(S)&&!(w&&w.start<=_.start)&&(w=_);!w||!bs(w.el)||(Td.set(w.el,c),Tr.get(w.el)!==!0&&(Tr.set(w.el,!0),No(w.el)))},aS=(c,h,x)=>{let S=m.isPlaying();h&&S?ao.has(c)||(ao.add(c),oS(c)):ao.delete(c);let w=Td.get(c),_=h||x||w!==void 0&&ao.has(w),I=Tr.get(c);I!==_&&(Tr.set(c,_),_?(!h||I===void 0)&&No(c):c.preload!=="none"&&(c.preload="none",I&&Xm(c)))},sS=(c,h,x)=>Tr.get(c)===!0&&gs(c,h,x,Rd)||oo!==null&&m.isPlaying()&&(h(c,oo)||gs(c,h,oo,Rd)),lS=(c,h,x)=>{let S=X(),w=!1,_=_d(x);for(let F of h){if(!ye(F))continue;if(F.hasAttribute("data-hidden")){ro.has(F)||(ro.add(F),Ad(F)&&(io=!0)),Sd(F,!1),(xe(F)||Pe(F))&&i?.setSourceVisibility(F,!1);continue}ro.has(F)&&(vd(F),ro.delete(F),Ad(F)&&(io=!0));let $=_(F,c)&&Cd(F.parentElement,c,_,S);F.style.visibility=$?"visible":"hidden";let te=hs&&!$&&gs(F,_,c);te&&!F.hasAttribute(Vn)&&zy(F),F.toggleAttribute(Vn,te),pe(F)&&Vt.has(F)&&bs(F)&&aS(F,$,te||sS(F,_,c)),!pe(F)&&!Pe(F)&&(w=!0),(xe(F)||Pe(F))&&i?.setSourceVisibility(F,$),$?vd(F):Zx(F)&&eS(F)&&Sd(F,!0)}w&&Ym()&&i?.refresh();let I=rS(c);if((io||I)&&m.isPlaying()){p.stopAll();for(let F of Vc(document))b(F)&&(F.volume=0);Cs()}io=!1},fn=(c,h=Array.from(document.querySelectorAll("[data-start]")),x)=>z(()=>lS(c,h,x)),uS=c=>z(()=>{if(!hs)return[];let h=X(),x=_d();return Array.from(document.images).filter(S=>S.closest(\'[data-start][style*="visibility: hidden"]\')!==null&&(S.closest(qr)!==null||!S.complete)&&Cd(S,c,x,h))}),kr=null,pn=null,so=[],Md=c=>c.hasAttribute("data-start")||!!G(c).compositionRoot,lo=c=>dp({resolvePlaybackRate:h=>Ve(h)*Ye(h),elements:c,shouldIncludeElement:Md,resolveStartSeconds:h=>V(h),resolveDurationSeconds:h=>{let x=G(h),S=V(h),w=x.inheritedStart!=null&&x.inheritedDuration!=null&&x.inheritedDuration>0?Math.max(0,x.inheritedStart+x.inheritedDuration-S):null,_=Number.isFinite(h.duration)?yt(h,h.duration):null,I=_==null?null:_/Ye(h),F=_e(h.dataset.duration),$=F!=null&&F>0?F/Ye(h):null;return cp({isVideo:h.tagName==="VIDEO",sourceDuration:I,hostRemaining:w,explicitDuration:$})}}),cS=()=>{let c=Cr();if(kr&&kr.revision===c)return kr;let h=lo().mediaClips;return kr={revision:c,clips:h,byStart:[...h].sort((x,S)=>x.start-S.start),byEnd:[...h].sort((x,S)=>x.end-S.end)},pn=null,so=[],kr},Ld=(c,h,x,S)=>{let w=0,_=c.length;for(;w<_;){let F=w+_>>1;h(c[F])<x?w=F+1:_=F}let I=[];for(let F=w;F<c.length&&h(c[F])<=S;F+=1)I.push(c[F]);return I},dS=(c,h,x)=>{let S=pn;if(S===null)return c.clips.map($=>$.el);let w=2*Io(Math.max(Math.abs(S),Math.abs(h))),_=Math.min(S,h)-w,I=Math.max(S,h)+w,F=new Set;for(let $ of so)F.add($.el);for(let $ of Ld(c.byStart,te=>te.start,_,I+x))F.add($.el);for(let $ of Ld(c.byEnd,te=>te.end,_,I))F.add($.el);return[...F]},uo=new WeakSet,Nd=c=>{uo.add(c)},Fd=c=>{uo.delete(c),Ut()};window.__hf.leasePausedMedia=Nd,window.__hf.releasePausedMedia=Fd,window.__hf.setLoopStart=c=>{oo=c!=null&&Number.isFinite(c)&&c>=0?c:null};let mS=c=>{let h=cs.get(c)?.hostId,x=h?document.querySelector(`[data-composition-id="${CSS.escape(h)}"]`):null,S=x?j(x):null;return x&&S?Y(x,0)+S:1/0},Id=c=>{let h=0;for(let x of c){if(x.data===Dr)continue;let S=x.getChildren?x:x.timeline,w=Number(x.duration?.())/Number(S?.duration?.()),_=S?.getChildren?Id(S.getChildren(!1,!0,!0))*(Number.isFinite(w)&&w>0?w:1):Number(x.duration?.())||0,I=Math.abs(Number(x.timeScale?.())||1),F=(Number(x.startTime?.())||0)+_/I;F>=ua||(h=Math.max(h,Math.min(F,mS(x))))}return h};window.__hf.animationEnd=()=>{let c=e.capturedTimeline,h=c?.getChildren?Id(c.getChildren(!1,!0,!0)):Te(c)??0,x=Math.max(h,us(!0)??0);return x>0&&x<ua?x:null},window.__hf.audioMeter={start:()=>p.startMetering(),stop:()=>p.stopMetering(),read:()=>p.readLevels()};let fS=()=>{for(let c of document.querySelectorAll("video, audio"))if(pe(c)&&!c.paused&&Md(c)&&!uo.has(c))return!0;return!1},Dd=()=>Ut();document.addEventListener("play",Dd,!0),s.push(()=>{document.removeEventListener("play",Dd,!0)});let Je=c=>{let h=!wr,x=e.isPlaying&&!e.mediaForceSyncNextTick&&pn!==null?Math.min(Math.max(0,e.currentTime-pn),Yt*Math.min(1,e.playbackRate)):0,S=z(()=>{if(!h)return lo().mediaClips;let I=cS();return lo(dS(I,e.currentTime,x)).mediaClips});for(let I of S){let F=Rr.get(I.el);F&&(I.volumeKeyframes=F)}let w=e.isPlaying?S:S.filter(I=>!uo.has(I.el)),_=e.mediaForceSyncNextTick;_&&(e.mediaForceSyncNextTick=!1),e.nativeMediaSyncDisabled||(mp({clips:w,timeSeconds:e.currentTime,playing:e.isPlaying,playbackRate:e.playbackRate,outputMuted:e.mediaOutputMuted,userMuted:e.bridgeMuted,userVolume:e.bridgeVolume,forceSync:_,cueAheadSeconds:x,getCompositionDuration:()=>Ge(e.capturedTimeline,0,c),onElementVolume:(I,F,$)=>p.setElementVolume(I,$),isWebAudioOwned:I=>p.ownsElement(I),isWebAudioRouted:I=>p.routesElement(I),onAutoplayBlocked:()=>{e.mediaAutoplayBlockedPosted||(e.mediaAutoplayBlockedPosted=!0,Ae({source:"hf-preview",type:"media-autoplay-blocked"}))}}),h?(pn=e.currentTime,so=S.filter(I=>Kt(e.currentTime,I.start-Yt,I.end))):(pn=null,so=[])),fn(e.currentTime,void 0,c)},Be=c=>{c&&Ut();let h=Math.max(0,Math.round((e.currentTime||0)*e.canonicalFps)),x=Date.now();(c||h!==e.bridgeLastPostedFrame||e.isPlaying!==e.bridgeLastPostedPlaying||e.bridgeMuted!==e.bridgeLastPostedMuted||x-e.bridgeLastPostedAt>=e.bridgeMaxPostIntervalMs)&&(e.bridgeLastPostedFrame=h,e.bridgeLastPostedPlaying=e.isPlaying,e.bridgeLastPostedMuted=e.bridgeMuted,e.bridgeLastPostedAt=x,Ae({source:"hf-preview",type:"state",frame:h,currentTime:e.currentTime||0,ended:m.reachedEnd(),isPlaying:e.isPlaying,muted:e.bridgeMuted,playbackRate:e.playbackRate}))},ys="",Pd=!1,Od=!1,Hd=0,Gd="",pS=()=>{let c="";for(let h of document.querySelectorAll("[data-start]"))c+=`${h.id}:${h.tagName}|`;return c},Qe=()=>{C(),L(),H();let c=X();if(c){let{width:S,height:w}=ch(c);S!==null&&w!==null&&Ae({source:"hf-preview",type:"stage-size",width:S,height:w})}Nn();let h=tu({canonicalFps:e.canonicalFps});window.__clipManifest=h,Gd=JSON.stringify(h);let x=pS();if(ys!==x&&tS(),!window.__clipTree||ys!==x){let S=window;window.__clipTree=rh({startResolver:Xe({timelineRegistry:S.__timelines??{},includeAuthoredTimingAttrs:!0}),timelineRegistry:S.__timelines??{},rootDuration:h.durationInFrames/e.canonicalFps}),ys=x}Ae({...h,assetsReady:Od}),Pd||(Pd=!0,Dy(document,({timedOut:S})=>{e.tornDown||(Od=!0,Ae({source:"hf-preview",type:"assets-ready",timedOut:S}))},{currentTime:e.currentTime})),jx()},hS=()=>{JSON.stringify(tu({canonicalFps:e.canonicalFps}))!==Gd&&Qe()},xs=c=>typeof c=="number"&&Number.isFinite(c)&&c>0?c:0,gS=c=>{let h=xs(Number(c));if(h<=0)return;let x=X(),S=xs(_e(x?.getAttribute("data-duration"))),w=Math.max(Hd,xs(m.getDuration()),S);h<=w||(Hd=h,x?.setAttribute("data-duration",String(h)),m.setDuration(Is(h,e.canonicalFps)),Qe(),Be(!0))},Ze=(c,h=0,x)=>{for(let S of e.deterministicAdapters){try{c==="discover"&&S.discover(),c==="pause"&&S.pause({pageAnimations:x}),c==="play"&&S.play&&S.play()}catch(w){O("runtime.init.site8",w)}if(c==="discover")try{S.seek({time:h,suppressEvents:!0})}catch(w){O("runtime.init.site9",w)}}},hn=()=>{window.__renderReady=!1},bS=$y(()=>{let c=[];for(let h of e.deterministicAdapters){let x=h.getReadyPromise;if(typeof x=="function")try{let S=x();S&&c.push(S)}catch(S){O("runtime.init.adapterReady",S)}}return c},()=>hn(),c=>O("runtime.init.adapterReady",c)),yS=$y(()=>{let c=window.__hf?.buildReady;return c?Object.values(c).filter(h=>h!=null&&typeof h.then=="function"):[]},()=>hn(),c=>O("runtime.init.buildReady",c)),xS=()=>{to(),Yx();let c=ju();return mr(document),qa(document.body,e.canonicalFps),c};if(le)ju();else{let c={injectedStyles:e.injectedCompStyles,injectedScripts:e.injectedCompScripts,injectedLinks:e.injectedCompLinks,parseDimensionPx:K,onDiagnostic:({code:h,details:x})=>{Ae({source:"hf-preview",type:"diagnostic",code:h,details:x})}};_0(c).finally(()=>{le=!0,ae(),xS(),hn()})}let Bd=c=>{let h=new Set,x=S=>{for(let w of(S??"").matchAll(/url\\(\\s*([\'"]?)(.*?)\\1\\s*\\)|@import\\s+([\'"])(.*?)\\3/gi))h.add(w[2]??w[4]);for(let w of(S??"").matchAll(/image-set\\((?:[^()]|\\([^()]*\\))*\\)/gi))for(let _ of w[0].matchAll(/([\'"])(.*?)\\1/g))h.add(_[2])};for(let S of c)if(S.tagName==="STYLE"&&x(S.textContent),!(S.tagName==="STYLE"||S.tagName==="SCRIPT"))for(let w of[S,...S.querySelectorAll("*")]){let _=Xk.get(w.localName)??[],I=[U0(w),...[..._,"poster","srcset"].map(F=>w.getAttribute(F))];for(let F of I)F&&h.add(F);x(w.getAttribute("style"))}return h},Ss=0,SS=(c,h,x)=>{let S=new Map;for(let w of x?c.querySelectorAll("video, audio"):[]){let _=Yi.get(w);if(!_||i?.isGraded(w))continue;let{srcObject:I,sinkId:F,mediaKeys:$}=w;I||F||$||S.set(_,[...S.get(_)??[],w])}for(let w of h.querySelectorAll("video, audio")){let _=qc(w),I=S.get(_)?.shift();if(!I||qy(I)!==qy(w)){Yi.set(w,_);continue}w.replaceWith(I),window.gsap?.set?.(I,{clearProps:"all"});let F=w.getAttribute("style");F===null?I.removeAttribute("style"):I.setAttribute("style",F),P0(I);let $=I;$.volume=xd($)??1,$.muted=e.bridgeMuted||e.mediaOutputMuted||$.defaultMuted,$.defaultPlaybackRate=1,$.playbackRate=e.playbackRate,$.preservesPitch=!0}},Ud=c=>[c,...c.querySelectorAll("[data-composition-id]")].flatMap(h=>h.getAttribute("data-composition-id")||[]),vS=(c,h,x,S)=>{let w=new Set(Ud(h).flatMap(F=>[x[F],...S[F]??[]])),_=new Set([h,...h.querySelectorAll("*")]);for(let F of window.gsap?.globalTimeline?.getChildren?.(!0,!0,!1)??[]){if(!F.targets?.().some(te=>_.has(te)))continue;let $=F;for(;$&&!w.has($);)$=$.parent;if(!$)throw new Error(`scene ${c} cannot be swapped: an animation outside it moves its elements`)}let I=F=>typeof F?.nodeType=="number"&&!_.has(F);for(let F of w)for(let $ of F?[F,...F.getChildren?.(!0,!0,!1)??[]]:[])if($.targets?.().some(I))throw new Error(`scene ${c} cannot be swapped: its animations write outside the scene`)},ES=async(c,h)=>{let x=Ss,S=new DOMParser().parseFromString(c,"text/html"),w=Ki(document),_=Ki(S);if(!w||!_)throw new Error("no scene manifest");if(w.shared!==_.shared)throw new Error("the film changed outside its scenes");let I=Object.keys(_.scenes);if(I.length!==Object.keys(w.scenes).length||I.some(W=>!(W in w.scenes)))throw new Error("scenes were added or removed");let F=I.filter(W=>_.scenes[W]!==w.scenes[W]);if(F.length===0)throw new Error("no scene changed");let $=F.map(W=>{let ie=gt=>Array.from(gt.querySelectorAll(`[${Mu}="${CSS.escape(W)}"]`)),he=gt=>gt.tagName!=="STYLE"&&gt.tagName!=="SCRIPT",be=ie(document),qe=ie(S),Ke=be.filter(he),bn=qe.filter(he),Ue=Ke[0],qt=bn[0];if(!Ue||!qt||Ke.length>1||bn.length>1)throw new Error(`scene ${W} cannot be swapped: it has no single host`);if(Ue.hasAttribute("data-hf-original-composition-id"))throw new Error(`scene ${W} cannot be swapped: it is a duplicated instance`);let om=Ue.getAttribute(Lu)??qt.getAttribute(Lu);if(om!==null)throw new Error(`scene ${W} cannot be swapped: ${om}`);let PS=Bd(be);if([...Bd(qe)].some(gt=>!PS.has(gt)))throw new Error(`scene ${W} cannot be swapped: it loads media this scene has not loaded`);let am=gt=>gt.filter(OS=>OS.tagName==="STYLE").length;if(am(be)!==am(qe))throw new Error(`scene ${W} cannot be swapped: its styles moved`);return{name:W,oldParts:be,homes:be.map(gt=>gt.parentNode),newParts:qe,oldHost:Ue,newHost:qt}}),te=()=>{let W=X(),ie=new Set;for(let he of document.querySelectorAll(`[${Mu}]`)){if(he.tagName==="STYLE"||he.tagName==="SCRIPT")continue;let be=he.parentElement;for(;be;be=be===W?null:be.parentElement)ie.add(be)}return[...ie].flatMap(he=>[he,...Array.from(he.children).filter(be=>!be.hasAttribute("data-hf-ignore")),null])},fe=te(),$e=$.some(({newHost:W})=>W.querySelector(".caption-group"))?await M0():[];if(e.tornDown)throw new Error("the preview was torn down during the swap");if(h?.aborted)throw new Error("the swap was cancelled");if(x!==Ss)throw new Error("the preview changed while this swap waited");let ue=()=>{let W=({oldParts:be,homes:qe})=>be.some((Ke,bn)=>!Ke.isConnected||Ke.parentNode!==qe[bn]),ie=te();if(ie.length!==fe.length||ie.some((be,qe)=>be!==fe[qe])||$.some(W))throw new Error("a scene changed while this swap waited")};ue();let ge=()=>window.__timelines??(window.__timelines={}),ze=()=>window.__hfSceneAnimations??(window.__hfSceneAnimations={}),lt=()=>{for(let{name:W,oldHost:ie}of $)vS(W,ie,ge(),ze())};lt(),Ss+=1;let je=e.capturedTimeline,ke=[],De=[],Ts=$.flatMap(({oldHost:W})=>Ud(W)),Le=new Set,Nr=()=>{let W=Le.size;for(let ie of Ts)for(let he of[...(ze()[ie]??[]).slice().reverse(),ge()[ie]]){if(!he||Le.has(he))continue;Le.add(he);let be=he;be.revert?be.revert():be.totalTime?.(0,!0),je?.remove?.(he),be.revert||be.kill?.()}return Le.size>W},oe=0;for(;Nr();)if(++oe>8)throw new Error("the old scene keeps starting animations as they stop");ue(),lt();for(let W of Ts)delete ge()[W],delete ze()[W];p.stopAll(),m.detachAudioSource();for(let{oldParts:W,newParts:ie,oldHost:he,newHost:be}of $){let qe=ie.filter(Ue=>Ue.tagName==="STYLE");W.filter(Ue=>Ue.tagName==="STYLE").forEach((Ue,qt)=>Ue.replaceWith(document.importNode(qe[qt],!0)));for(let Ue of W)Ue!==he&&Ue.remove();let Ke=document.importNode(be,!0),bn=Ue=>JSON.stringify(Ue.flatMap(qt=>qt.tagName==="SCRIPT"?qt.textContent:[]));SS(he,Ke,bn(W)===bn(ie)),he.replaceWith(Ke),De.push(Ke),Ke.querySelector(".caption-group")&&ke.push(Ke)}In();let ee=$.flatMap(({newParts:W})=>W.filter(ie=>ie.tagName==="SCRIPT").map(ie=>document.body.appendChild(document.importNode(ie,!0))));if(await La(ee),e.tornDown)throw new Error("the preview was torn down during the swap");document.querySelector(`meta[name="${Li}"]`)?.setAttribute("content",JSON.stringify(_));for(let W of De)mr(document,W);to();let ne=()=>{for(let W of ke)for(let ie of[W,...W.querySelectorAll("[data-composition-id]")]){let he=ie.getAttribute("data-composition-id");he&&window.__timelines?.[he]?.totalTime?.(0,!0)}};qa(document.body,e.canonicalFps),Ku($e,ke,ne),Qx(),Ln=!1,Nn();for(let W of De)for(let ie of W.querySelectorAll("video, audio"))Rr.delete(ie),ms(ie);let re=Ge(e.capturedTimeline,0);re>0&&m.setDuration(re),Ze("discover",e.currentTime),Fi(document);let Ee=m.isPlaying()&&re>0&&e.currentTime>=re;Mr.seek(Ee?re:e.currentTime,{keepPlaying:!Ee}),fn(e.currentTime),Qe()};Ki(document)&&(window.__hfSwapScenes=ES,E(()=>{delete window.__hfSwapScenes}));let co=eh({postMessage:c=>Ae(c)});co.installPickerApi(),fn(e.currentTime,Array.from(document.querySelectorAll("video[data-start], img[data-start]")));let ht=vb({lease:Nd,release:Fd});i=ht,E(()=>{ht.destroy(),i=null}),qa(document.body,e.canonicalFps);let vs=c=>{let h=Number(c);!Number.isFinite(h)||h<=0?e.playbackRate=1:e.playbackRate=Math.max(.1,Math.min(5,h)),e.mediaForceSyncNextTick=!0,e.capturedTimeline&&typeof e.capturedTimeline.timeScale=="function"&&e.capturedTimeline.timeScale(e.playbackRate);let x=document.querySelectorAll("video, audio");for(let S of x)if(pe(S))try{S.playbackRate=e.playbackRate}catch(w){O("runtime.init.site10",w)}},AS=1e3,Wt=null,Vd=()=>{let c=Wt;Wt=null,c?.apply()},Wd=(c,h)=>{p.stopAll(),m.detachAudioSource();let x=m.isPlaying();x&&m.pause(),m.seek(c),e.currentTime=m.now(),e.isPlaying=!1,e.mediaForceSyncNextTick=!0;let S=e.capturedTimeline;Tt(S);let w=gn(e.currentTime);if(Ze("pause",0,w),h?.keepPlaying&&x){Mr.play();return}Je(),ht.redraw(),Ac(e.currentTime),Be(!0)},Mr={play:()=>{Vd();let c=e.capturedTimeline;if(m.isPlaying())return;let h=Ge(c,0);if(h>0){if(m.setDuration(h),m.reachedEnd()){let x=m.getPlayStart();m.seek(x),e.currentTime=x,gn(x)}}else{let x=X(),S=Number(x?.getAttribute("data-duration")??0);S>0&&m.setDuration(Is(S,e.canonicalFps))}Tt(c),m.play()&&(e.isPlaying=!0,e.mediaForceSyncNextTick=!0,rm(m.now()),g&&!e.nativeMediaSyncDisabled&&!e.webAudioMediaDisabled&&Cs(),Ze("play"),Je(),ht.redraw(),Be(!0))},pause:()=>{if(!m.isPlaying())return;p.stopAll(),m.detachAudioSource(),m.pause(),e.isPlaying=!1,e.currentTime=m.now(),e.mediaForceSyncNextTick=!0,rm(e.currentTime);let c=e.capturedTimeline;Tt(c),Ze("pause"),Je(),ht.redraw(),Be(!0)},seek:(c,h)=>{let x=dl(Math.max(0,Number(c)||0),e.canonicalFps);Wt=null;let S=m.isPlaying()?[]:uS(x);if(S.length===0){Wd(x,h);return}let w={time:x,apply:()=>Wd(x,h)};Wt=w;for(let te of S){zy(te);for(let fe=te.closest(qr);fe;fe=te.closest(qr))fe.setAttribute(Vn,"")}let _=0,I=new Promise(te=>{_=window.setTimeout(()=>{Wt===w&&O("runtime.init.seekHoldCap",S),te()},AS)}),F=Promise.all(S.map(te=>te.decode?te.decode().catch(()=>{}):void 0)),$=Promise.race([F,I]).then(()=>{window.clearTimeout(_),Wt===w&&Vd()});return nt($),$},renderSeek:(c,h)=>{Wt=null,wr=!0;let x=sa(Math.max(0,Number(c)||0),e.canonicalFps,h);p.stopAll(),m.detachAudioSource(),m.isPlaying()&&m.pause(),m.seek(x),e.currentTime=m.now(),e.isPlaying=!1,e.mediaForceSyncNextTick=!0;let S=gn(e.currentTime,{activateChildren:!0,suppressEvents:h?.suppressEvents});Ze("pause",0,S),Je(),ht.redraw(),Ac(e.currentTime,{engineMode:!0}),Be(!0)},getTime:()=>Wt?.time??m.now(),getDuration:()=>{let c=m.getDuration();return Number.isFinite(c)?c:0},isPlaying:()=>m.isPlaying(),setPlaybackRate:c=>{vs(c),m.setRate(e.playbackRate),im()},getPlaybackRate:()=>e.playbackRate},$d=Ge(e.capturedTimeline,0);$d>0&&m.setDuration($d);let st=nh({getTimeline:()=>e.capturedTimeline,setTimeline:c=>{e.capturedTimeline=c},getTimelineRegistry:()=>window.__timelines??{},getIsPlaying:()=>e.isPlaying,setIsPlaying:c=>{e.isPlaying!==c&&(e.mediaForceSyncNextTick=!0),e.isPlaying=c},getPlaybackRate:()=>e.playbackRate,setPlaybackRate:vs,getCanonicalFps:()=>e.canonicalFps,onSyncMedia:(c,h)=>{e.currentTime=Math.max(0,Number(c)||0),e.isPlaying!==h&&(e.mediaForceSyncNextTick=!0),e.isPlaying=h,Je()},onStatePost:Be,onDeterministicSeek:(c,h)=>{for(let x of e.deterministicAdapters)if(!(x.name==="gsap"&&e.capturedTimeline))try{x.seek({time:Number(c)||0,suppressEvents:h?.suppressEvents})}catch(S){O("runtime.init.site11",S)}},onDeterministicPause:()=>Ze("pause"),onDeterministicPlay:()=>Ze("play"),onRenderFrameSeek:()=>{ht.redraw()},onShowNativeVideos:()=>{},getSafeDuration:()=>Ge(e.capturedTimeline,0),transport:Mr});window.__player=P(st),window.__playerReady=!0,tt("composition_loaded",{duration:st.getDuration(),compositionId:Et()?.getAttribute("data-composition-id")??null}),e.deterministicAdapters=[Pf({start:c=>Y(c,0),duration:c=>j(c),compositionDuration:()=>Ge(e.capturedTimeline,0),canonicalFps:()=>e.canonicalFps,exportRenderSeek:()=>!!window.__HF_EXPORT_RENDER_SEEK_CONFIG}),Wf(),ff({resolveStartSeconds:c=>Y(c,0)}),bf(),Ef({resolveStartSeconds:c=>Y(c,0)}),_f(),Cf(),Rf(),Tf(),kf(),Mf(),Lf(),gf({getTimeline:()=>e.capturedTimeline})],Uf(),Vf(),window.__hfReseekGpu=c=>{let h=Math.max(0,Number(c)||0);window.__hfThreeTime=h,window.__hfTypegpuTime=h,Bo(h)},window.__hfWaitForSeekCompletion=ll,s.push(()=>{window.__hfWaitForSeekCompletion===ll&&delete window.__hfWaitForSeekCompletion}),Kx(),to(),Ze("discover");let wS=()=>{let c=e.capturedTimeline,h=Nn();e.capturedTimeline&&(h||e.capturedTimeline!==c||!st._timeline)&&(st._timeline=e.capturedTimeline);let x=Ge(e.capturedTimeline,0);if(x>0&&m.setDuration(x),t&&(t=!1,queueMicrotask(()=>{e.tornDown||Mr.seek(e.currentTime,{keepPlaying:!1})})),Ze("discover",e.currentTime),!e.capturedTimeline){let S=window.__timelines??{},w=Object.keys(S).filter(_=>S[_]);if(w.length>0){let I=X()?.getAttribute("data-composition-id")??null;T("root_timeline_unbound_registry_present",{reason:I?"root data-composition-id has no matching key in window.__timelines":"root composition element has no data-composition-id attribute",rootCompositionId:I,registeredTimelineKeys:w},"root_timeline_unbound_registry_present"),console.warn("[hyperframes] Root timeline not bound \\u2014 render will freeze at t=0. "+(I?`Root data-composition-id is "${I}" but window.__timelines has no such key. `:"Root composition element has no data-composition-id. ")+`Registered timeline keys: [${w.join(", ")}]. Register the root timeline under its data-composition-id (window.__timelines["${I??"<root-id>"}"] = tl).`)}}fn(e.currentTime,Array.from(document.querySelectorAll("[data-start]:not(video, audio, img)"))),window.__renderReady=!0,Qe(),Be(!0)},Fn=null,_S=()=>{if(Fn)return;let c=()=>{window.removeEventListener("hf-timelines-built",c),Fn=null,hn()};Fn=c,window.addEventListener("hf-timelines-built",c)};E(()=>{Fn&&(window.removeEventListener("hf-timelines-built",Fn),Fn=null)}),hn=()=>{if(!e.tornDown){if(!le){window.__renderReady=!1;return}if(window.__hfTimelinesBuilding){window.__renderReady=!1,_S();return}if(Ze("discover",e.currentTime),!bS()){window.__renderReady=!1;return}if(!yS()){window.__renderReady=!1;return}wS()}},hn(),le&&setTimeout(()=>{hn()},0);let Es=0,mo=!1,fo=Number.NaN,po=null,ho=!1,$t=null,qd=!1,go=!1,zd="",jd=-1,Lr=!1,Kd=Number.NEGATIVE_INFINITY,Yd=Number.NEGATIVE_INFINITY,Xd="",Jd=!1,CS=(c,h,x,S)=>{try{let w=S?.suppressEvents===!0;Tt(c),typeof c.totalTime=="function"?c.totalTime(h,w):c.seek(h,w)}catch(w){O(x,w)}},RS=(c,h)=>{let x=window.__timelines??{},S=X()?.getAttribute("data-composition-id")??null;for(let[w,_]of Object.entries(x)){if(!_||w===S)continue;let I=ei(w);if(!I)continue;let F=Y(I,0);if(!Number.isFinite(F))continue;let $=Te(_),te=St(I)+On(bt(I),Math.max(0,c-F)),fe=Math.max(0,$!=null&&$>0?Math.min($,te):te);CS(_,fe,"runtime.init.transport.childTimeline",h)}},TS=c=>{let h=window.__timelines??{},x=[];for(let S of Object.values(h))if(!(!S||S===c)){x.push(S);try{S.play()}catch(w){O("runtime.init.activateSiblings",w)}}return x},Qd=c=>typeof c=="object"&&c!==null,kS=["onStart","onUpdate","onComplete","onReverseComplete","onRepeat"],Zd=(c,h)=>{let x=c[h];if(typeof x!="function")return null;try{let S=Number(x.call(c));return Number.isFinite(S)?S:null}catch(S){return O("runtime.init.gsapCallbackDuration",S),null}},MS=c=>{if(!("getChildren"in c)||typeof c.getChildren!="function")return!1;let h;try{h=c.getChildren(!0,!0,!0)}catch(x){return O("runtime.init.gsapCallbackChildren",x),!1}if(!Array.isArray(h))return!1;for(let x of h){if(!Qd(x))continue;let S=x.vars;if(!Qd(S)||!kS.some(F=>typeof S[F]=="function"))continue;let I=Zd(x,"totalDuration")??Zd(x,"duration");if(I!=null&&I<=1e-6)return!0}return!1};function gn(c,h){let x=e.capturedTimeline,S=x&&h?.activateChildren?TS(x):[];try{let w=LS(x,c,h);return fo=c,po=x,w}finally{for(let w of S)Tt(w)}}function LS(c,h,x){let S=x?.suppressEvents===!0;if(c){let _=h;if(typeof c.totalDuration=="function")try{let I=Number(c.totalDuration());Number.isFinite(I)&&I>0&&h>I&&(_=I)}catch(I){O("runtime.init.transport.clampDuration",I)}try{typeof c.totalTime=="function"?(c.totalTime(_,S),!S&&!MS(c)&&il({totalTime:c.totalTime.bind(c),totalDuration:c.totalDuration?.bind(c),getChildren:c.getChildren?.bind(c)},_)):c.seek(_,S)}catch(I){O("runtime.init.transport.seek",I)}}RS(h,x);let w=Qk();for(let _ of e.deterministicAdapters)if(!(_.name==="gsap"&&c))try{_.seek({time:h,suppressEvents:S,pageAnimations:w})}catch(I){O("runtime.init.transport.adapter",I)}return w}let As=Ay(document,()=>{Ut()});s.push(()=>As.disconnect());let em=()=>{try{return As.isActive()}catch{return!1}},NS=()=>!m.isPlaying()&&!nd()&&As.observing&&(!ho||em())&&!Lr&&e.currentTime===fo&&e.capturedTimeline===po,ws=()=>`${Cr()}|${us()??""}`,tm=()=>{$t=window.setTimeout(FS,qd&&e.capturedTimeline&&Ln?Jk:e.bridgeMaxPostIntervalMs)},FS=()=>{if($t=null,!e.tornDown&&!(typeof window>"u"||typeof document>"u")){if(ws()!==zd){Ut();return}Be(!1),tm()}},IS=()=>{if(e.transportRafId=null,e.tornDown)return;let c=go;if(go=!1,c||!NS()){e.transportRafId=window.requestAnimationFrame(_s);return}zd=ws(),tm()};Ut=()=>{e.tornDown||(go=!0,!(mo||e.transportRafId!=null)&&($t!=null&&(window.clearTimeout($t),$t=null),go=!1,e.transportRafId=window.requestAnimationFrame(_s)))};let DS=c=>{let h=document.querySelectorAll("audio[data-start]"),x=null;for(let S of c?[c,...h]:h){if(!pe(S)||!S.isConnected||b(S)||_l(S)||S.ended&&!S.loop||!S.hasAttribute("src")&&!S.querySelector("source[src]"))continue;let w=V(S),_=_e(S.dataset.duration),I=_!=null&&_>0?w+_:1/0;if(!Number.isFinite(w)||!Kt(e.currentTime,w,I))continue;if(S===c)return{el:S,start:w};let F=w+(Bn(S)??1/0);(!x||F>x.runsUntil)&&(x={el:S,start:w,runsUntil:F})}return x};function nm(){if(m.isPlaying()&&!e.mediaOutputMuted)if(!e.nativeMediaSyncDisabled&&!e.webAudioMediaDisabled&&p.ownsClock()&&p.context){let c=p.getTime();c>=0&&m.attachAudioSource({currentTimeSeconds:c})}else{let c=DS(m.audioElement());c&&!c.el.paused?m.attachAudioSource({el:c.el,compositionStart:c.start,mediaStart:St(c.el),rate:bt(c.el)}):c&&c.el.readyState<HTMLMediaElement.HAVE_FUTURE_DATA?m.attachAudioSource({currentTimeSeconds:e.currentTime}):m.hasAudioSource()&&m.detachAudioSource()}else m.hasAudioSource()&&m.detachAudioSource()}let _s=()=>{if(!(e.tornDown||mo)){mo=!0;try{Es+=1;let c=Cr();c!==jd&&(jd=c,Lr=!0);let h=Date.now(),x=m.isPlaying(),S=x&&h-Yd>=_y,w=Jd&&!x;if(Jd=x,S){Yd=h;let fe=ws();fe!==Xd&&(Xd=fe,Lr=!0)}let _=Lr&&h-Kd>=wy;_&&(Kd=h);let I=fe=>!x&&Es%fe===0;if(Cy({tick:Es,isPlaying:x,hasCapturedTimeline:e.capturedTimeline!=null,currentTimeSeconds:m.now(),compositionChanged:_,playingPollDue:S})){let fe=e.capturedTimeline;if(Nn()){e.capturedTimeline&&!st._timeline&&(st._timeline=e.capturedTimeline),e.capturedTimeline&&e.capturedTimeline!==fe&&Tt(e.capturedTimeline);let $e=Ge(e.capturedTimeline,0,c);$e>0&&m.setDuration($e),Qe()}}if(_||I(20)?(Qe(),Lr=!1):(S||w)&&hS(),(_||I(30))&&to(),e.capturedTimeline){let fe=Ge(e.capturedTimeline,0,c);fe>0&&(!m.isPlaying()||fe>=m.getDuration())&&m.setDuration(fe)}nm();let F=m.now();e.currentTime=F;let $=m.isPlaying();if(!$&&em()?ho=!0:($||ho||F!==fo||e.capturedTimeline!==po)&&(gn(F),$||(ho=!1)),$&&ht.redrawAnimated(),m.isPlaying()&&m.reachedEnd()){p.stopAll(),m.detachAudioSource(),m.pause(),e.isPlaying=!1;let fe=m.getStopTime();Number.isFinite(fe)&&(m.seek(fe),e.currentTime=fe,gn(fe)),Ze("pause"),Je(c),Be(!0);return}m.isPlaying()?Je(c):fS()&&(pn=null,Je(c)),Be(!1)}finally{mo=!1,IS()}}},rm=c=>{let h=document.querySelectorAll("video, audio");for(let x of h){if(!pe(x)||!x.isConnected||!x.hasAttribute("data-start"))continue;let S=V(x);if(!Number.isFinite(S))continue;let w=_e(x.dataset.duration),_=w!=null&&w>0?S+w:1/0;if(!Kt(c,S,_))continue;let I=St(x),F=c-S+I;if(F>=0)try{x.currentTime=F}catch{}}},Cs=()=>{if(e.nativeMediaSyncDisabled||e.webAudioMediaDisabled)return;let c=p.startGeneration();for(let h of Vc(document)){if(b(h))continue;let x=V(h);if(!Number.isFinite(x))continue;let S=St(h),w=Number.parseFloat(h.dataset.volume??""),_=Number.isFinite(w)?w:1,I=_e(h.dataset.duration),F=I!=null&&I>0?I:Number.POSITIVE_INFINITY,$=h.closest("[data-composition-id]");if($){let $e=Y($,0),ue=j($,{includeAuthoredTimingAttrs:!0});ue!=null&&ue>0&&(F=Math.min(F,Math.max(0,$e+ue-x)))}let te=yr(h);xr(h,te),(te.kind==="web-audio"?p.scheduleMediaElementPlayback(h,x,S,m.now(),_,c,e.playbackRate):Promise.resolve(null)).then($e=>{let ue=c!==p.currentGeneration();if($e||!ko(h)||!m.isPlaying()||ue||typeof bt(h)!="number")return;let ge=e.playbackRate*Ve(h),ze=h.hasAttribute("data-fx-chain")||h.hasAttribute("data-automation");if(Math.abs(ge-1)>1e-9){te.kind==="web-audio"&&ze&&(h.muted=!0);return}p.decodeAudioElement(h).then(lt=>{!lt||!m.isPlaying()||p.schedulePlayback(h,lt,x,S,()=>m.now(),_,c,e.playbackRate,F)})})}};function im(){p.setRate(e.playbackRate)&&!e.nativeMediaSyncDisabled&&!e.webAudioMediaDisabled&&g&&m.isPlaying()&&p.hasBoundedActiveSources()&&(p.stopAll(),Cs())}if(e.capturedTimeline){let c=Ge(e.capturedTimeline,0);c>0&&m.setDuration(c),Tt(e.capturedTimeline)}O0(window),e.transportRafId=window.requestAnimationFrame(_s),Qe(),Be(!0),e.controlBridgeHandler=tf({onPlay:()=>{st.play(),tt("composition_played",{time:st.getTime()})},onPause:()=>{st.pause(),tt("composition_paused",{time:st.getTime()})},onStopMedia:()=>{p.stopAll();let c=document.querySelectorAll("video, audio");for(let h of c)pe(h)&&!h.paused&&h.pause()},onSeek:(c,h)=>{st.seek(c),tt("composition_seeked",{time:c})},onSetMuted:c=>{e.bridgeMuted=c;let h=c||e.mediaOutputMuted;p.setMuted(h);let x=document.querySelectorAll("video, audio");for(let S of x)pe(S)&&(S.muted=h||S.defaultMuted)},onSetVolume:c=>{e.bridgeVolume=c,p.setVolume(c);let h=document.querySelectorAll("video, audio");for(let x of h){if(!pe(x))continue;let S=parseFloat(x.dataset.volume??""),w=Number.isFinite(S)?S:1;x.volume=Ao(w*c)}},onSetMediaOutputMuted:c=>{e.mediaOutputMuted=c;let h=c||e.bridgeMuted;p.setMuted(h);let x=document.querySelectorAll("video, audio");for(let S of x)pe(S)&&(S.muted=h||S.defaultMuted)},onSetNativeMediaSyncDisabled:c=>{e.nativeMediaSyncDisabled!==c&&(e.nativeMediaSyncDisabled=c,e.mediaForceSyncNextTick=!0,c?(p.stopAll(),m.detachAudioSource()):Je())},onSetWebAudioMediaDisabled:c=>{e.webAudioMediaDisabled!==c&&(e.webAudioMediaDisabled=c,e.mediaForceSyncNextTick=!0,c&&(p.stopAll(),m.detachAudioSource()),Je())},onSetPlaybackRate:c=>{vs(c),e.transportClock&&e.transportClock.setRate(e.playbackRate),im()},onSetIdleHeartbeat:c=>{qd=c,Ut()},onSetRootDuration:gS,onSetPlayRange:(c,h)=>{m.setPlayRange(c,h,e.canonicalFps);let x=m.getPlayStart();if(m.isPlaying()&&(m.now()<x||m.reachedEnd())){Mr.seek(x,{keepPlaying:!0});return}Be(!0)},onSetColorGrading:(c,h)=>{ht.setGrading(c,h)},onSetColorGradingCompare:(c,h)=>{ht.setCompare(c,h)},onTick:()=>{if(e.tornDown||!m.isPlaying())return;nm();let c=m.now();if(e.currentTime=c,(c!==fo||e.capturedTimeline!==po)&&gn(c),m.reachedEnd()){p.stopAll(),m.detachAudioSource(),m.pause(),e.isPlaying=!1;let h=m.getStopTime();Number.isFinite(h)&&(m.seek(h),e.currentTime=h,gn(h)),Ze("pause"),Je(),Be(!0)}},onEnablePickMode:()=>co.enablePickMode(),onDisablePickMode:()=>co.disablePickMode(),onSetRuntimeData:Ja,onClearRuntimeData:Qa,getCanonicalFps:()=>e.canonicalFps});let Rs=()=>{if(!e.tornDown){e.tornDown=!0,e.transportRafId!=null&&(window.cancelAnimationFrame(e.transportRafId),e.transportRafId=null),$t!=null&&(window.clearTimeout($t),$t=null),e.transportClock=null,p.destroy(),mn!=null&&(window.clearTimeout(mn),mn=null),u!=null&&(window.cancelAnimationFrame(u),u=null),Jx(),e.controlBridgeHandler&&(window.removeEventListener("message",e.controlBridgeHandler),e.controlBridgeHandler=null),o&&(window.removeEventListener("error",o),o=null),a&&(window.removeEventListener("unhandledrejection",a),a=null),e.beforeUnloadHandler&&(window.removeEventListener("beforeunload",e.beforeUnloadHandler),e.beforeUnloadHandler=null),co.disablePickMode();for(let c of e.deterministicAdapters)if(!(!c||typeof c.revert!="function"))try{c.revert()}catch(h){O("runtime.init.site12",h)}e.deterministicAdapters=[],window.__hf?.buildReady&&(window.__hf.buildReady={});for(let c of s.splice(0))try{c()}catch(h){O("runtime.init.site13",h)}for(let c of e.injectedCompStyles)try{c.remove()}catch(h){O("runtime.init.site14",h)}e.injectedCompStyles=[];for(let c of e.injectedCompLinks)try{c.remove()}catch(h){O("runtime.init.site15",h)}e.injectedCompLinks=[];for(let c of e.injectedCompScripts)try{c.remove()}catch(h){O("runtime.init.site16",h)}e.injectedCompScripts=[],e.capturedTimeline=null,n=()=>{},window.__hfRuntimeTeardown===Rs&&(window.__hfRuntimeTeardown=null)}};window.__hfRuntimeTeardown=Rs,e.beforeUnloadHandler=Rs,window.addEventListener("beforeunload",e.beforeUnloadHandler)}var Qy=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","ON","ON","ET","ET","ET","ON","ON","ON","ON","ON","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","ON","ET","ET","ET","ET","ON","ON","ON","ON","L","ON","ON","BN","ON","ON","ET","ET","EN","EN","ON","L","ON","ON","ON","EN","L","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L"],zc=[[697,698,"ON"],[706,719,"ON"],[722,735,"ON"],[741,749,"ON"],[751,767,"ON"],[768,879,"NSM"],[884,885,"ON"],[894,894,"ON"],[900,901,"ON"],[903,903,"ON"],[1014,1014,"ON"],[1155,1161,"NSM"],[1418,1418,"ON"],[1421,1422,"ON"],[1423,1423,"ET"],[1424,1424,"R"],[1425,1469,"NSM"],[1470,1470,"R"],[1471,1471,"NSM"],[1472,1472,"R"],[1473,1474,"NSM"],[1475,1475,"R"],[1476,1477,"NSM"],[1478,1478,"R"],[1479,1479,"NSM"],[1480,1535,"R"],[1536,1541,"AN"],[1542,1543,"ON"],[1544,1544,"AL"],[1545,1546,"ET"],[1547,1547,"AL"],[1548,1548,"CS"],[1549,1549,"AL"],[1550,1551,"ON"],[1552,1562,"NSM"],[1563,1610,"AL"],[1611,1631,"NSM"],[1632,1641,"AN"],[1642,1642,"ET"],[1643,1644,"AN"],[1645,1647,"AL"],[1648,1648,"NSM"],[1649,1749,"AL"],[1750,1756,"NSM"],[1757,1757,"AN"],[1758,1758,"ON"],[1759,1764,"NSM"],[1765,1766,"AL"],[1767,1768,"NSM"],[1769,1769,"ON"],[1770,1773,"NSM"],[1774,1775,"AL"],[1776,1785,"EN"],[1786,1808,"AL"],[1809,1809,"NSM"],[1810,1839,"AL"],[1840,1866,"NSM"],[1867,1957,"AL"],[1958,1968,"NSM"],[1969,1983,"AL"],[1984,2026,"R"],[2027,2035,"NSM"],[2036,2037,"R"],[2038,2041,"ON"],[2042,2044,"R"],[2045,2045,"NSM"],[2046,2069,"R"],[2070,2073,"NSM"],[2074,2074,"R"],[2075,2083,"NSM"],[2084,2084,"R"],[2085,2087,"NSM"],[2088,2088,"R"],[2089,2093,"NSM"],[2094,2136,"R"],[2137,2139,"NSM"],[2140,2143,"R"],[2144,2191,"AL"],[2192,2193,"AN"],[2194,2198,"AL"],[2199,2207,"NSM"],[2208,2249,"AL"],[2250,2273,"NSM"],[2274,2274,"AN"],[2275,2306,"NSM"],[2362,2362,"NSM"],[2364,2364,"NSM"],[2369,2376,"NSM"],[2381,2381,"NSM"],[2385,2391,"NSM"],[2402,2403,"NSM"],[2433,2433,"NSM"],[2492,2492,"NSM"],[2497,2500,"NSM"],[2509,2509,"NSM"],[2530,2531,"NSM"],[2546,2547,"ET"],[2555,2555,"ET"],[2558,2558,"NSM"],[2561,2562,"NSM"],[2620,2620,"NSM"],[2625,2626,"NSM"],[2631,2632,"NSM"],[2635,2637,"NSM"],[2641,2641,"NSM"],[2672,2673,"NSM"],[2677,2677,"NSM"],[2689,2690,"NSM"],[2748,2748,"NSM"],[2753,2757,"NSM"],[2759,2760,"NSM"],[2765,2765,"NSM"],[2786,2787,"NSM"],[2801,2801,"ET"],[2810,2815,"NSM"],[2817,2817,"NSM"],[2876,2876,"NSM"],[2879,2879,"NSM"],[2881,2884,"NSM"],[2893,2893,"NSM"],[2901,2902,"NSM"],[2914,2915,"NSM"],[2946,2946,"NSM"],[3008,3008,"NSM"],[3021,3021,"NSM"],[3059,3064,"ON"],[3065,3065,"ET"],[3066,3066,"ON"],[3072,3072,"NSM"],[3076,3076,"NSM"],[3132,3132,"NSM"],[3134,3136,"NSM"],[3142,3144,"NSM"],[3146,3149,"NSM"],[3157,3158,"NSM"],[3170,3171,"NSM"],[3192,3198,"ON"],[3201,3201,"NSM"],[3260,3260,"NSM"],[3276,3277,"NSM"],[3298,3299,"NSM"],[3328,3329,"NSM"],[3387,3388,"NSM"],[3393,3396,"NSM"],[3405,3405,"NSM"],[3426,3427,"NSM"],[3457,3457,"NSM"],[3530,3530,"NSM"],[3538,3540,"NSM"],[3542,3542,"NSM"],[3633,3633,"NSM"],[3636,3642,"NSM"],[3647,3647,"ET"],[3655,3662,"NSM"],[3761,3761,"NSM"],[3764,3772,"NSM"],[3784,3790,"NSM"],[3864,3865,"NSM"],[3893,3893,"NSM"],[3895,3895,"NSM"],[3897,3897,"NSM"],[3898,3901,"ON"],[3953,3966,"NSM"],[3968,3972,"NSM"],[3974,3975,"NSM"],[3981,3991,"NSM"],[3993,4028,"NSM"],[4038,4038,"NSM"],[4141,4144,"NSM"],[4146,4151,"NSM"],[4153,4154,"NSM"],[4157,4158,"NSM"],[4184,4185,"NSM"],[4190,4192,"NSM"],[4209,4212,"NSM"],[4226,4226,"NSM"],[4229,4230,"NSM"],[4237,4237,"NSM"],[4253,4253,"NSM"],[4957,4959,"NSM"],[5008,5017,"ON"],[5120,5120,"ON"],[5760,5760,"WS"],[5787,5788,"ON"],[5906,5908,"NSM"],[5938,5939,"NSM"],[5970,5971,"NSM"],[6002,6003,"NSM"],[6068,6069,"NSM"],[6071,6077,"NSM"],[6086,6086,"NSM"],[6089,6099,"NSM"],[6107,6107,"ET"],[6109,6109,"NSM"],[6128,6137,"ON"],[6144,6154,"ON"],[6155,6157,"NSM"],[6158,6158,"BN"],[6159,6159,"NSM"],[6277,6278,"NSM"],[6313,6313,"NSM"],[6432,6434,"NSM"],[6439,6440,"NSM"],[6450,6450,"NSM"],[6457,6459,"NSM"],[6464,6464,"ON"],[6468,6469,"ON"],[6622,6655,"ON"],[6679,6680,"NSM"],[6683,6683,"NSM"],[6742,6742,"NSM"],[6744,6750,"NSM"],[6752,6752,"NSM"],[6754,6754,"NSM"],[6757,6764,"NSM"],[6771,6780,"NSM"],[6783,6783,"NSM"],[6832,6877,"NSM"],[6880,6891,"NSM"],[6912,6915,"NSM"],[6964,6964,"NSM"],[6966,6970,"NSM"],[6972,6972,"NSM"],[6978,6978,"NSM"],[7019,7027,"NSM"],[7040,7041,"NSM"],[7074,7077,"NSM"],[7080,7081,"NSM"],[7083,7085,"NSM"],[7142,7142,"NSM"],[7144,7145,"NSM"],[7149,7149,"NSM"],[7151,7153,"NSM"],[7212,7219,"NSM"],[7222,7223,"NSM"],[7376,7378,"NSM"],[7380,7392,"NSM"],[7394,7400,"NSM"],[7405,7405,"NSM"],[7412,7412,"NSM"],[7416,7417,"NSM"],[7616,7679,"NSM"],[8125,8125,"ON"],[8127,8129,"ON"],[8141,8143,"ON"],[8157,8159,"ON"],[8173,8175,"ON"],[8189,8190,"ON"],[8192,8202,"WS"],[8203,8205,"BN"],[8207,8207,"R"],[8208,8231,"ON"],[8232,8232,"WS"],[8233,8233,"B"],[8234,8238,"BN"],[8239,8239,"CS"],[8240,8244,"ET"],[8245,8259,"ON"],[8260,8260,"CS"],[8261,8286,"ON"],[8287,8287,"WS"],[8288,8303,"BN"],[8304,8304,"EN"],[8308,8313,"EN"],[8314,8315,"ES"],[8316,8318,"ON"],[8320,8329,"EN"],[8330,8331,"ES"],[8332,8334,"ON"],[8352,8399,"ET"],[8400,8432,"NSM"],[8448,8449,"ON"],[8451,8454,"ON"],[8456,8457,"ON"],[8468,8468,"ON"],[8470,8472,"ON"],[8478,8483,"ON"],[8485,8485,"ON"],[8487,8487,"ON"],[8489,8489,"ON"],[8494,8494,"ET"],[8506,8507,"ON"],[8512,8516,"ON"],[8522,8525,"ON"],[8528,8543,"ON"],[8585,8587,"ON"],[8592,8721,"ON"],[8722,8722,"ES"],[8723,8723,"ET"],[8724,9013,"ON"],[9083,9108,"ON"],[9110,9257,"ON"],[9280,9290,"ON"],[9312,9351,"ON"],[9352,9371,"EN"],[9450,9899,"ON"],[9901,10239,"ON"],[10496,11123,"ON"],[11126,11263,"ON"],[11493,11498,"ON"],[11503,11505,"NSM"],[11513,11519,"ON"],[11647,11647,"NSM"],[11744,11775,"NSM"],[11776,11869,"ON"],[11904,11929,"ON"],[11931,12019,"ON"],[12032,12245,"ON"],[12272,12287,"ON"],[12288,12288,"WS"],[12289,12292,"ON"],[12296,12320,"ON"],[12330,12333,"NSM"],[12336,12336,"ON"],[12342,12343,"ON"],[12349,12351,"ON"],[12441,12442,"NSM"],[12443,12444,"ON"],[12448,12448,"ON"],[12539,12539,"ON"],[12736,12773,"ON"],[12783,12783,"ON"],[12829,12830,"ON"],[12880,12895,"ON"],[12924,12926,"ON"],[12977,12991,"ON"],[13004,13007,"ON"],[13175,13178,"ON"],[13278,13279,"ON"],[13311,13311,"ON"],[19904,19967,"ON"],[42128,42182,"ON"],[42509,42511,"ON"],[42607,42610,"NSM"],[42611,42611,"ON"],[42612,42621,"NSM"],[42622,42623,"ON"],[42654,42655,"NSM"],[42736,42737,"NSM"],[42752,42785,"ON"],[42888,42888,"ON"],[43010,43010,"NSM"],[43014,43014,"NSM"],[43019,43019,"NSM"],[43045,43046,"NSM"],[43048,43051,"ON"],[43052,43052,"NSM"],[43064,43065,"ET"],[43124,43127,"ON"],[43204,43205,"NSM"],[43232,43249,"NSM"],[43263,43263,"NSM"],[43302,43309,"NSM"],[43335,43345,"NSM"],[43392,43394,"NSM"],[43443,43443,"NSM"],[43446,43449,"NSM"],[43452,43453,"NSM"],[43493,43493,"NSM"],[43561,43566,"NSM"],[43569,43570,"NSM"],[43573,43574,"NSM"],[43587,43587,"NSM"],[43596,43596,"NSM"],[43644,43644,"NSM"],[43696,43696,"NSM"],[43698,43700,"NSM"],[43703,43704,"NSM"],[43710,43711,"NSM"],[43713,43713,"NSM"],[43756,43757,"NSM"],[43766,43766,"NSM"],[43882,43883,"ON"],[44005,44005,"NSM"],[44008,44008,"NSM"],[44013,44013,"NSM"],[64285,64285,"R"],[64286,64286,"NSM"],[64287,64296,"R"],[64297,64297,"ES"],[64298,64335,"R"],[64336,64450,"AL"],[64451,64466,"ON"],[64467,64829,"AL"],[64830,64847,"ON"],[64848,64911,"AL"],[64912,64913,"ON"],[64914,64967,"AL"],[64968,64975,"ON"],[64976,65007,"BN"],[65008,65020,"AL"],[65021,65023,"ON"],[65024,65039,"NSM"],[65040,65049,"ON"],[65056,65071,"NSM"],[65072,65103,"ON"],[65104,65104,"CS"],[65105,65105,"ON"],[65106,65106,"CS"],[65108,65108,"ON"],[65109,65109,"CS"],[65110,65118,"ON"],[65119,65119,"ET"],[65120,65121,"ON"],[65122,65123,"ES"],[65124,65126,"ON"],[65128,65128,"ON"],[65129,65130,"ET"],[65131,65131,"ON"],[65136,65278,"AL"],[65279,65279,"BN"],[65281,65282,"ON"],[65283,65285,"ET"],[65286,65290,"ON"],[65291,65291,"ES"],[65292,65292,"CS"],[65293,65293,"ES"],[65294,65295,"CS"],[65296,65305,"EN"],[65306,65306,"CS"],[65307,65312,"ON"],[65339,65344,"ON"],[65371,65381,"ON"],[65504,65505,"ET"],[65506,65508,"ON"],[65509,65510,"ET"],[65512,65518,"ON"],[65520,65528,"BN"],[65529,65533,"ON"],[65534,65535,"BN"],[65793,65793,"ON"],[65856,65932,"ON"],[65936,65948,"ON"],[65952,65952,"ON"],[66045,66045,"NSM"],[66272,66272,"NSM"],[66273,66299,"EN"],[66422,66426,"NSM"],[67584,67870,"R"],[67871,67871,"ON"],[67872,68096,"R"],[68097,68099,"NSM"],[68100,68100,"R"],[68101,68102,"NSM"],[68103,68107,"R"],[68108,68111,"NSM"],[68112,68151,"R"],[68152,68154,"NSM"],[68155,68158,"R"],[68159,68159,"NSM"],[68160,68324,"R"],[68325,68326,"NSM"],[68327,68408,"R"],[68409,68415,"ON"],[68416,68863,"R"],[68864,68899,"AL"],[68900,68903,"NSM"],[68904,68911,"AL"],[68912,68921,"AN"],[68922,68927,"AL"],[68928,68937,"AN"],[68938,68968,"R"],[68969,68973,"NSM"],[68974,68974,"ON"],[68975,69215,"R"],[69216,69246,"AN"],[69247,69290,"R"],[69291,69292,"NSM"],[69293,69311,"R"],[69312,69327,"AL"],[69328,69336,"ON"],[69337,69369,"AL"],[69370,69375,"NSM"],[69376,69423,"R"],[69424,69445,"AL"],[69446,69456,"NSM"],[69457,69487,"AL"],[69488,69505,"R"],[69506,69509,"NSM"],[69510,69631,"R"],[69633,69633,"NSM"],[69688,69702,"NSM"],[69714,69733,"ON"],[69744,69744,"NSM"],[69747,69748,"NSM"],[69759,69761,"NSM"],[69811,69814,"NSM"],[69817,69818,"NSM"],[69826,69826,"NSM"],[69888,69890,"NSM"],[69927,69931,"NSM"],[69933,69940,"NSM"],[70003,70003,"NSM"],[70016,70017,"NSM"],[70070,70078,"NSM"],[70089,70092,"NSM"],[70095,70095,"NSM"],[70191,70193,"NSM"],[70196,70196,"NSM"],[70198,70199,"NSM"],[70206,70206,"NSM"],[70209,70209,"NSM"],[70367,70367,"NSM"],[70371,70378,"NSM"],[70400,70401,"NSM"],[70459,70460,"NSM"],[70464,70464,"NSM"],[70502,70508,"NSM"],[70512,70516,"NSM"],[70587,70592,"NSM"],[70606,70606,"NSM"],[70608,70608,"NSM"],[70610,70610,"NSM"],[70625,70626,"NSM"],[70712,70719,"NSM"],[70722,70724,"NSM"],[70726,70726,"NSM"],[70750,70750,"NSM"],[70835,70840,"NSM"],[70842,70842,"NSM"],[70847,70848,"NSM"],[70850,70851,"NSM"],[71090,71093,"NSM"],[71100,71101,"NSM"],[71103,71104,"NSM"],[71132,71133,"NSM"],[71219,71226,"NSM"],[71229,71229,"NSM"],[71231,71232,"NSM"],[71264,71276,"ON"],[71339,71339,"NSM"],[71341,71341,"NSM"],[71344,71349,"NSM"],[71351,71351,"NSM"],[71453,71453,"NSM"],[71455,71455,"NSM"],[71458,71461,"NSM"],[71463,71467,"NSM"],[71727,71735,"NSM"],[71737,71738,"NSM"],[71995,71996,"NSM"],[71998,71998,"NSM"],[72003,72003,"NSM"],[72148,72151,"NSM"],[72154,72155,"NSM"],[72160,72160,"NSM"],[72193,72198,"NSM"],[72201,72202,"NSM"],[72243,72248,"NSM"],[72251,72254,"NSM"],[72263,72263,"NSM"],[72273,72278,"NSM"],[72281,72283,"NSM"],[72330,72342,"NSM"],[72344,72345,"NSM"],[72544,72544,"NSM"],[72546,72548,"NSM"],[72550,72550,"NSM"],[72752,72758,"NSM"],[72760,72765,"NSM"],[72850,72871,"NSM"],[72874,72880,"NSM"],[72882,72883,"NSM"],[72885,72886,"NSM"],[73009,73014,"NSM"],[73018,73018,"NSM"],[73020,73021,"NSM"],[73023,73029,"NSM"],[73031,73031,"NSM"],[73104,73105,"NSM"],[73109,73109,"NSM"],[73111,73111,"NSM"],[73459,73460,"NSM"],[73472,73473,"NSM"],[73526,73530,"NSM"],[73536,73536,"NSM"],[73538,73538,"NSM"],[73562,73562,"NSM"],[73685,73692,"ON"],[73693,73696,"ET"],[73697,73713,"ON"],[78912,78912,"NSM"],[78919,78933,"NSM"],[90398,90409,"NSM"],[90413,90415,"NSM"],[92912,92916,"NSM"],[92976,92982,"NSM"],[94031,94031,"NSM"],[94095,94098,"NSM"],[94178,94178,"ON"],[94180,94180,"NSM"],[113821,113822,"NSM"],[113824,113827,"BN"],[117760,117973,"ON"],[118e3,118009,"EN"],[118010,118012,"ON"],[118016,118451,"ON"],[118458,118480,"ON"],[118496,118512,"ON"],[118528,118573,"NSM"],[118576,118598,"NSM"],[119143,119145,"NSM"],[119155,119162,"BN"],[119163,119170,"NSM"],[119173,119179,"NSM"],[119210,119213,"NSM"],[119273,119274,"ON"],[119296,119361,"ON"],[119362,119364,"NSM"],[119365,119365,"ON"],[119552,119638,"ON"],[120513,120513,"ON"],[120539,120539,"ON"],[120571,120571,"ON"],[120597,120597,"ON"],[120629,120629,"ON"],[120655,120655,"ON"],[120687,120687,"ON"],[120713,120713,"ON"],[120745,120745,"ON"],[120771,120771,"ON"],[120782,120831,"EN"],[121344,121398,"NSM"],[121403,121452,"NSM"],[121461,121461,"NSM"],[121476,121476,"NSM"],[121499,121503,"NSM"],[121505,121519,"NSM"],[122880,122886,"NSM"],[122888,122904,"NSM"],[122907,122913,"NSM"],[122915,122916,"NSM"],[122918,122922,"NSM"],[123023,123023,"NSM"],[123184,123190,"NSM"],[123566,123566,"NSM"],[123628,123631,"NSM"],[123647,123647,"ET"],[124140,124143,"NSM"],[124398,124399,"NSM"],[124643,124643,"NSM"],[124646,124646,"NSM"],[124654,124655,"NSM"],[124661,124661,"NSM"],[124928,125135,"R"],[125136,125142,"NSM"],[125143,125251,"R"],[125252,125258,"NSM"],[125259,126063,"R"],[126064,126143,"AL"],[126144,126207,"R"],[126208,126287,"AL"],[126288,126463,"R"],[126464,126703,"AL"],[126704,126705,"ON"],[126706,126719,"AL"],[126720,126975,"R"],[126976,127019,"ON"],[127024,127123,"ON"],[127136,127150,"ON"],[127153,127167,"ON"],[127169,127183,"ON"],[127185,127221,"ON"],[127232,127242,"EN"],[127243,127247,"ON"],[127279,127279,"ON"],[127338,127343,"ON"],[127405,127405,"ON"],[127584,127589,"ON"],[127744,128728,"ON"],[128732,128748,"ON"],[128752,128764,"ON"],[128768,128985,"ON"],[128992,129003,"ON"],[129008,129008,"ON"],[129024,129035,"ON"],[129040,129095,"ON"],[129104,129113,"ON"],[129120,129159,"ON"],[129168,129197,"ON"],[129200,129211,"ON"],[129216,129217,"ON"],[129232,129240,"ON"],[129280,129623,"ON"],[129632,129645,"ON"],[129648,129660,"ON"],[129664,129674,"ON"],[129678,129734,"ON"],[129736,129736,"ON"],[129741,129756,"ON"],[129759,129770,"ON"],[129775,129784,"ON"],[129792,129938,"ON"],[129940,130031,"ON"],[130032,130041,"EN"],[130042,130042,"ON"],[131070,131071,"BN"],[196606,196607,"BN"],[262142,262143,"BN"],[327678,327679,"BN"],[393214,393215,"BN"],[458750,458751,"BN"],[524286,524287,"BN"],[589822,589823,"BN"],[655358,655359,"BN"],[720894,720895,"BN"],[786430,786431,"BN"],[851966,851967,"BN"],[917502,917759,"BN"],[917760,917999,"NSM"],[918e3,921599,"BN"],[983038,983039,"BN"],[1048574,1048575,"BN"],[1114110,1114111,"BN"]];function Zk(e){if(e<=255)return Qy[e];let t=0,n=zc.length-1;for(;t<=n;){let r=t+n>>1,i=zc[r];if(e<i[0]){n=r-1;continue}if(e>i[1]){t=r+1;continue}return i[2]}return"L"}function eM(e){let t=e.length;if(t===0)return null;let n=new Array(t),r=!1;for(let u=0;u<t;){let d=e.charCodeAt(u),f=d,m=1;if(d>=55296&&d<=56319&&u+1<t){let g=e.charCodeAt(u+1);g>=56320&&g<=57343&&(f=(d-55296<<10)+(g-56320)+65536,m=2)}let p=Zk(f);(p==="R"||p==="AL"||p==="AN")&&(r=!0);for(let g=0;g<m;g++)n[u+g]=p;u+=m}if(!r)return null;let i=0;for(let u=0;u<t;u++){let d=n[u];if(d==="L"){i=0;break}if(d==="R"||d==="AL"){i=1;break}}let o=new Int8Array(t);for(let u=0;u<t;u++)o[u]=i;let a=i&1?"R":"L",s=a,l=s;for(let u=0;u<t;u++)n[u]==="NSM"?n[u]=l:l=n[u];l=s;for(let u=0;u<t;u++){let d=n[u];d==="EN"?n[u]=l==="AL"?"AN":"EN":(d==="R"||d==="L"||d==="AL")&&(l=d)}for(let u=0;u<t;u++)n[u]==="AL"&&(n[u]="R");for(let u=1;u<t-1;u++)n[u]==="ES"&&n[u-1]==="EN"&&n[u+1]==="EN"&&(n[u]="EN"),n[u]==="CS"&&(n[u-1]==="EN"||n[u-1]==="AN")&&n[u+1]===n[u-1]&&(n[u]=n[u-1]);for(let u=0;u<t;u++){if(n[u]!=="EN")continue;let d;for(d=u-1;d>=0&&n[d]==="ET";d--)n[d]="EN";for(d=u+1;d<t&&n[d]==="ET";d++)n[d]="EN"}for(let u=0;u<t;u++){let d=n[u];(d==="WS"||d==="ES"||d==="ET"||d==="CS")&&(n[u]="ON")}l=s;for(let u=0;u<t;u++){let d=n[u];d==="EN"?n[u]=l==="L"?"L":"EN":(d==="R"||d==="L")&&(l=d)}for(let u=0;u<t;u++){if(n[u]!=="ON")continue;let d=u+1;for(;d<t&&n[d]==="ON";)d++;let f=u>0?n[u-1]:s,m=d<t?n[d]:s,p=f!=="L"?"R":"L";if(p===(m!=="L"?"R":"L"))for(let b=u;b<d;b++)n[b]=p;u=d-1}for(let u=0;u<t;u++)n[u]==="ON"&&(n[u]=a);for(let u=0;u<t;u++){let d=n[u];(o[u]&1)===0?d==="R"?o[u]++:(d==="AN"||d==="EN")&&(o[u]+=2):(d==="L"||d==="AN"||d==="EN")&&o[u]++}return o}function Zy(e,t){let n=eM(e);if(n===null)return null;let r=new Int8Array(t.length);for(let i=0;i<t.length;i++)r[i]=n[t[i]];return r}var tM=/[ \\t\\n\\r\\f]+/g,nM=/[\\t\\n\\r\\f]| {2,}|^ | $/;function rM(e){let t=e??"normal";return t==="pre-wrap"?{mode:t,preserveOrdinarySpaces:!0,preserveHardBreaks:!0}:{mode:t,preserveOrdinarySpaces:!1,preserveHardBreaks:!1}}function iM(e){if(!nM.test(e))return e;let t=e.replace(tM," ");return t.charCodeAt(0)===32&&(t=t.slice(1)),t.length>0&&t.charCodeAt(t.length-1)===32&&(t=t.slice(0,-1)),t}function oM(e){return/[\\r\\f]/.test(e)?e.replace(/\\r\\n/g,`\n`).replace(/[\\r\\f]/g,`\n`):e.replace(/\\r\\n/g,`\n`)}var jc=null,aM;function sM(){return jc===null&&(jc=new Intl.Segmenter(aM,{granularity:"word"})),jc}var lM=/\\p{Script=Arabic}/u,es=/\\p{M}/u,sx=/\\p{Nd}/u;function ex(e){return lM.test(e)}function tx(e){return e>=19968&&e<=40959||e>=13312&&e<=19903||e>=131072&&e<=173791||e>=173824&&e<=177983||e>=177984&&e<=178207||e>=178208&&e<=183983||e>=183984&&e<=191471||e>=191472&&e<=192093||e>=194560&&e<=195103||e>=196608&&e<=201551||e>=201552&&e<=205743||e>=205744&&e<=210041||e>=63744&&e<=64255||e>=12288&&e<=12351||e>=12352&&e<=12447||e>=12448&&e<=12543||e>=44032&&e<=55215||e>=65280&&e<=65519}function pt(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(!(n<12288)){if(n>=55296&&n<=56319&&t+1<e.length){let r=e.charCodeAt(t+1);if(r>=56320&&r<=57343){let i=(n-55296<<10)+(r-56320)+65536;if(tx(i))return!0;t++;continue}}if(tx(n))return!0}}return!1}function uM(e){let t=rs(e);return t!==null&&(ns.has(t)||sn.has(t))}var cM=new Set(["\\xA0","\\u202F","\\u2060","\\uFEFF"]);function dM(e){return pt(e)}function mM(e){let t=rs(e);return t!==null&&cM.has(t)}function ts(e){return!uM(e)&&!mM(e)}var ns=new Set(["\\uFF0C","\\uFF0E","\\uFF01","\\uFF1A","\\uFF1B","\\uFF1F","\\u3001","\\u3002","\\u30FB","\\uFF09","\\u3015","\\u3009","\\u300B","\\u300D","\\u300F","\\u3011","\\u3017","\\u3019","\\u301B","\\u30FC","\\u3005","\\u303B","\\u309D","\\u309E","\\u30FD","\\u30FE"]),Ji=new Set([\'"\',"(","[","{","\\u201C","\\u2018","\\xAB","\\u2039","\\uFF08","\\u3014","\\u3008","\\u300A","\\u300C","\\u300E","\\u3010","\\u3016","\\u3018","\\u301A"]),Yc=new Set(["\'","\\u2019"]),sn=new Set([".",",","!","?",":",";","\\u060C","\\u061B","\\u061F","\\u0964","\\u0965","\\u104A","\\u104B","\\u104C","\\u104D","\\u104F",")","]","}","%",\'"\',"\\u201D","\\u2019","\\xBB","\\u203A","\\u2026"]),fM=new Set([":",".","\\u060C","\\u061B"]),pM=new Set(["\\u104F"]),hM=new Set(["\\u201D","\\u2019","\\xBB","\\u203A","\\u300D","\\u300F","\\u3011","\\u300B","\\u3009","\\u3015","\\uFF09"]);function gM(e){if(Xc(e))return!0;let t=!1;for(let n of e){if(sn.has(n)){t=!0;continue}if(!(t&&es.test(n)))return!1}return t}function bM(e){for(let t of e)if(!ns.has(t)&&!sn.has(t))return!1;return e.length>0}function yM(e){if(Xc(e))return!0;for(let t of e)if(!Ji.has(t)&&!Yc.has(t)&&!es.test(t))return!1;return e.length>0}function Xc(e){let t=!1;for(let n of e)if(!(n==="\\\\"||es.test(n))){if(Ji.has(n)||sn.has(n)||Yc.has(n)){t=!0;continue}return!1}return t}function lx(e,t){let n=t-1;if(n<=0)return Math.max(n,0);let r=e.charCodeAt(n);if(r<56320||r>57343)return n;let i=n-1;if(i<0)return n;let o=e.charCodeAt(i);return o>=55296&&o<=56319?i:n}function rs(e){if(e.length===0)return null;let t=lx(e,e.length);return e.slice(t)}function xM(e){let t=Array.from(e),n=t.length;for(;n>0;){let r=t[n-1];if(es.test(r)){n--;continue}if(Ji.has(r)||Yc.has(r)){n--;continue}break}return n<=0||n===t.length?null:{head:t.slice(0,n).join(""),tail:t.slice(n).join("")}}function SM(e,t,n){return n==="text"&&!t&&e.length===1&&e!=="-"&&e!=="\\u2014"?e:null}function nx(e,t,n,r){let i=t[r],o=e[r];if(i==null)return o;let a=n[r];if(o.length===a)return o;let s=i.repeat(a);return e[r]=s,s}function rx(e,t){return e&&t!==null&&fM.has(t)}function vM(e){let t=rs(e);return t!==null&&pM.has(t)}function EM(e){if(e.length<2||e[0]!==" ")return null;let t=e.slice(1);return/^\\p{M}+$/u.test(t)?{space:" ",marks:t}:null}function is(e){let t=e.length;for(;t>0;){let n=lx(e,t),r=e.slice(n,t);if(hM.has(r))return!0;if(!sn.has(r))return!1;t=n}return!1}function AM(e,t){if(t.preserveOrdinarySpaces||t.preserveHardBreaks){if(e===" ")return"preserved-space";if(e==="	")return"tab";if(t.preserveHardBreaks&&e===`\n`)return"hard-break"}return e===" "?"space":e==="\\xA0"||e==="\\u202F"||e==="\\u2060"||e==="\\uFEFF"?"glue":e==="\\u200B"?"zero-width-break":e==="\\xAD"?"soft-hyphen":"text"}var wM=/[\\x20\\t\\n\\xA0\\xAD\\u200B\\u202F\\u2060\\uFEFF]/;function at(e){return e.length===1?e[0]:e.join("")}function _M(e,t){let n=[];for(let r=e.length-1;r>=0;r--)n.push(e[r]);return n.push(t),at(n)}function CM(e,t,n,r){if(!wM.test(e))return[{text:e,isWordLike:t,kind:"text",start:n}];let i=[],o=null,a=[],s=n,l=!1,u=0;for(let d of e){let f=AM(d,r),m=f==="text"&&t;if(o!==null&&f===o&&m===l){a.push(d),u+=d.length;continue}o!==null&&i.push({text:at(a),isWordLike:l,kind:o,start:s}),o=f,a=[d],s=n+u,l=m,u+=d.length}return o!==null&&i.push({text:at(a),isWordLike:l,kind:o,start:s}),i}function Kc(e){return e==="space"||e==="preserved-space"||e==="zero-width-break"||e==="hard-break"}var RM=/^[A-Za-z][A-Za-z0-9+.-]*:$/;function TM(e,t){let n=e.texts[t];return n.startsWith("www.")?!0:RM.test(n)&&t+1<e.len&&e.kinds[t+1]==="text"&&e.texts[t+1]==="//"}function kM(e){return e.includes("?")&&(e.includes("://")||e.startsWith("www."))}function MM(e){let t=e.texts.slice(),n=e.isWordLike.slice(),r=e.kinds.slice(),i=e.starts.slice();for(let a=0;a<e.len;a++){if(r[a]!=="text"||!TM(e,a))continue;let s=[t[a]],l=a+1;for(;l<e.len&&!Kc(r[l]);){s.push(t[l]),n[a]=!0;let u=t[l].includes("?");if(r[l]="text",t[l]="",l++,u)break}t[a]=at(s)}let o=0;for(let a=0;a<t.length;a++){let s=t[a];s.length!==0&&(o!==a&&(t[o]=s,n[o]=n[a],r[o]=r[a],i[o]=i[a]),o++)}return t.length=o,n.length=o,r.length=o,i.length=o,{len:o,texts:t,isWordLike:n,kinds:r,starts:i}}function LM(e){let t=[],n=[],r=[],i=[];for(let o=0;o<e.len;o++){let a=e.texts[o];if(t.push(a),n.push(e.isWordLike[o]),r.push(e.kinds[o]),i.push(e.starts[o]),!kM(a))continue;let s=o+1;if(s>=e.len||Kc(e.kinds[s]))continue;let l=[],u=e.starts[s],d=s;for(;d<e.len&&!Kc(e.kinds[d]);)l.push(e.texts[d]),d++;l.length>0&&(t.push(at(l)),n.push(!0),r.push("text"),i.push(u),o=d-1)}return{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}var NM=new Set([":","-","/","\\xD7",",",".","+","\\u2013","\\u2014"]),ix=/^[A-Za-z0-9_]+[,:;]*$/,ox=/[,:;]+$/;function ux(e){for(let t of e)if(sx.test(t))return!0;return!1}function Xi(e){if(e.length===0)return!1;for(let t of e)if(!(sx.test(t)||NM.has(t)))return!1;return!0}function FM(e){let t=[],n=[],r=[],i=[];for(let o=0;o<e.len;o++){let a=e.texts[o],s=e.kinds[o];if(s==="text"&&Xi(a)&&ux(a)){let l=[a],u=o+1;for(;u<e.len&&e.kinds[u]==="text"&&Xi(e.texts[u]);)l.push(e.texts[u]),u++;t.push(at(l)),n.push(!0),r.push("text"),i.push(e.starts[o]),o=u-1;continue}t.push(a),n.push(e.isWordLike[o]),r.push(s),i.push(e.starts[o])}return{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}function IM(e){let t=[],n=[],r=[],i=[];for(let o=0;o<e.len;o++){let a=e.texts[o],s=e.kinds[o],l=e.isWordLike[o];if(s==="text"&&l&&ix.test(a)){let u=[a],d=ox.test(a),f=o+1;for(;d&&f<e.len&&e.kinds[f]==="text"&&e.isWordLike[f]&&ix.test(e.texts[f]);){let m=e.texts[f];u.push(m),d=ox.test(m),f++}t.push(at(u)),n.push(!0),r.push("text"),i.push(e.starts[o]),o=f-1;continue}t.push(a),n.push(l),r.push(s),i.push(e.starts[o])}return{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}function DM(e){let t=[],n=[],r=[],i=[];for(let o=0;o<e.len;o++){let a=e.texts[o];if(e.kinds[o]==="text"&&a.includes("-")){let s=a.split("-"),l=s.length>1;for(let u=0;u<s.length;u++){let d=s[u];if(!l)break;(d.length===0||!ux(d)||!Xi(d))&&(l=!1)}if(l){let u=0;for(let d=0;d<s.length;d++){let f=s[d],m=d<s.length-1?`${f}-`:f;t.push(m),n.push(!0),r.push("text"),i.push(e.starts[o]+u),u+=m.length}continue}}t.push(a),n.push(e.isWordLike[o]),r.push(e.kinds[o]),i.push(e.starts[o])}return{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}function PM(e){let t=[],n=[],r=[],i=[],o=0;for(;o<e.len;){let a=[e.texts[o]],s=e.isWordLike[o],l=e.kinds[o],u=e.starts[o];if(l==="glue"){let d=[a[0]],f=u;for(o++;o<e.len&&e.kinds[o]==="glue";)d.push(e.texts[o]),o++;let m=at(d);if(o<e.len&&e.kinds[o]==="text")a[0]=m,a.push(e.texts[o]),s=e.isWordLike[o],l="text",u=f,o++;else{t.push(m),n.push(!1),r.push("glue"),i.push(f);continue}}else o++;if(l==="text")for(;o<e.len&&e.kinds[o]==="glue";){let d=[];for(;o<e.len&&e.kinds[o]==="glue";)d.push(e.texts[o]),o++;let f=at(d);if(o<e.len&&e.kinds[o]==="text"){a.push(f,e.texts[o]),s=s||e.isWordLike[o],o++;continue}a.push(f)}t.push(at(a)),n.push(s),r.push(l),i.push(u)}return{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}function OM(e){let t=e.texts.slice(),n=e.isWordLike.slice(),r=e.kinds.slice(),i=e.starts.slice();for(let o=0;o<t.length-1;o++){if(r[o]!=="text"||r[o+1]!=="text"||!pt(t[o])||!pt(t[o+1]))continue;let a=xM(t[o]);a!==null&&(t[o]=a.head,t[o+1]=a.tail+t[o+1],i[o+1]=i[o]+a.head.length)}return{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}function ax(e,t,n){let r=sM(),i=0,o=[],a=[],s=[],l=[],u=[],d=[],f=[],m=[],p=[],g=[],b=[],y=[];for(let N of r.segment(e))for(let D of CM(N.segment,N.isWordLike??!1,N.index,n)){let H=function(){d[C]!==null&&(a[C]=[nx(o,d,f,C)],d[C]=null),a[C].push(D.text),s[C]=s[C]||D.isWordLike,m[C]=m[C]||k,p[C]=p[C]||U,g[C]=X,b[C]=L,y[C]=rx(p[C],K)},R=D.kind==="text",M=SM(D.text,D.isWordLike,D.kind),k=pt(D.text),U=ex(D.text),K=rs(D.text),X=is(D.text),L=vM(D.text),C=i-1;t.carryCJKAfterClosingQuote&&R&&i>0&&l[C]==="text"&&k&&m[C]&&g[C]||R&&i>0&&l[C]==="text"&&bM(D.text)&&m[C]||R&&i>0&&l[C]==="text"&&b[C]?H():R&&i>0&&l[C]==="text"&&D.isWordLike&&U&&y[C]?(H(),s[C]=!0):M!==null&&i>0&&l[C]==="text"&&d[C]===M?f[C]=(f[C]??1)+1:R&&!D.isWordLike&&i>0&&l[C]==="text"&&(gM(D.text)||D.text==="-"&&s[C])?H():(o[i]=D.text,a[i]=[D.text],s[i]=D.isWordLike,l[i]=D.kind,u[i]=D.start,d[i]=M,f[i]=M===null?0:1,m[i]=k,p[i]=U,g[i]=X,b[i]=L,y[i]=rx(U,K),i++)}for(let N=0;N<i;N++){if(d[N]!==null){o[N]=nx(o,d,f,N);continue}o[N]=at(a[N])}for(let N=1;N<i;N++)l[N]==="text"&&!s[N]&&Xc(o[N])&&l[N-1]==="text"&&(o[N-1]+=o[N],s[N-1]=s[N-1]||s[N],o[N]="");let v=Array.from({length:i},()=>null),A=-1;for(let N=i-1;N>=0;N--){let D=o[N];if(D.length!==0){if(l[N]==="text"&&!s[N]&&yM(D)&&A>=0&&l[A]==="text"){let R=v[A]??[];R.push(D),v[A]=R,u[A]=u[N],o[N]="";continue}A=N}}for(let N=0;N<i;N++){let D=v[N];D!=null&&(o[N]=_M(D,o[N]))}let E=0;for(let N=0;N<i;N++){let D=o[N];D.length!==0&&(E!==N&&(o[E]=D,s[E]=s[N],l[E]=l[N],u[E]=u[N]),E++)}o.length=E,s.length=E,l.length=E,u.length=E;let T=PM({len:E,texts:o,isWordLike:s,kinds:l,starts:u}),P=OM(IM(DM(FM(LM(MM(T))))));for(let N=0;N<P.len-1;N++){let D=EM(P.texts[N]);D!==null&&(P.kinds[N]!=="space"&&P.kinds[N]!=="preserved-space"||P.kinds[N+1]!=="text"||!ex(P.texts[N+1])||(P.texts[N]=D.space,P.isWordLike[N]=!1,P.kinds[N]=P.kinds[N]==="preserved-space"?"preserved-space":"space",P.texts[N+1]=D.marks+P.texts[N+1],P.starts[N+1]=P.starts[N]+D.space.length))}return P}function HM(e,t){if(e.len===0)return[];if(!t.preserveHardBreaks)return[{startSegmentIndex:0,endSegmentIndex:e.len,consumedEndSegmentIndex:e.len}];let n=[],r=0;for(let i=0;i<e.len;i++)e.kinds[i]==="hard-break"&&(n.push({startSegmentIndex:r,endSegmentIndex:i,consumedEndSegmentIndex:i+1}),r=i+1);return r<e.len&&n.push({startSegmentIndex:r,endSegmentIndex:e.len,consumedEndSegmentIndex:e.len}),n}function GM(e){if(e.len<=1)return e;let t=[],n=[],r=[],i=[],o=null,a=!1,s=0,l=!1,u=!1;function d(){o!==null&&(t.push(at(o)),n.push(a),r.push("text"),i.push(s),o=null)}for(let f=0;f<e.len;f++){let m=e.texts[f],p=e.kinds[f],g=e.isWordLike[f],b=e.starts[f];if(p==="text"){let y=dM(m),v=ts(m);if(o!==null&&l&&u){o.push(m),a=a||g,l=l||y,u=v;continue}d(),o=[m],a=g,s=b,l=y,u=v;continue}d(),t.push(m),n.push(g),r.push(p),i.push(b)}return d(),{len:t.length,texts:t,isWordLike:n,kinds:r,starts:i}}function cx(e,t,n="normal",r="normal"){let i=rM(n),o=i.mode==="pre-wrap"?oM(e):iM(e);if(o.length===0)return{normalized:o,chunks:[],len:0,texts:[],isWordLike:[],kinds:[],starts:[]};let a=r==="keep-all"?GM(ax(o,t,i)):ax(o,t,i);return{normalized:o,chunks:HM(a,i),...a}}var vr=null,dx=new Map,Er=null,BM=96,UM=/\\p{Emoji_Presentation}/u,VM=/[\\p{Emoji_Presentation}\\p{Extended_Pictographic}\\p{Regional_Indicator}\\uFE0F\\u20E3]/u,Jc=null,mx=new Map;function Qc(){if(vr!==null)return vr;if(typeof OffscreenCanvas<"u")return vr=new OffscreenCanvas(1,1).getContext("2d"),vr;if(typeof document<"u")return vr=document.createElement("canvas").getContext("2d"),vr;throw new Error("Text measurement requires OffscreenCanvas or a DOM canvas context.")}function WM(e){let t=dx.get(e);return t||(t=new Map,dx.set(e,t)),t}function Bt(e,t){let n=t.get(e);return n===void 0&&(n={width:Qc().measureText(e).width,containsCJK:pt(e)},t.set(e,n)),n}function un(){if(Er!==null)return Er;if(typeof navigator>"u")return Er={lineFitEpsilon:.005,carryCJKAfterClosingQuote:!1,preferPrefixWidthsForBreakableRuns:!1,preferEarlySoftHyphenBreak:!1},Er;let e=navigator.userAgent,n=navigator.vendor==="Apple Computer, Inc."&&e.includes("Safari/")&&!e.includes("Chrome/")&&!e.includes("Chromium/")&&!e.includes("CriOS/")&&!e.includes("FxiOS/")&&!e.includes("EdgiOS/"),r=e.includes("Chrome/")||e.includes("Chromium/")||e.includes("CriOS/")||e.includes("Edg/");return Er={lineFitEpsilon:n?1/64:.005,carryCJKAfterClosingQuote:r,preferPrefixWidthsForBreakableRuns:n,preferEarlySoftHyphenBreak:n},Er}function $M(e){let t=e.match(/(\\d+(?:\\.\\d+)?)\\s*px/);return t?parseFloat(t[1]):16}function fx(){return Jc===null&&(Jc=new Intl.Segmenter(void 0,{granularity:"grapheme"})),Jc}function qM(e){return UM.test(e)||e.includes("\\uFE0F")}function px(e){return VM.test(e)}function zM(e,t){let n=mx.get(e);if(n!==void 0)return n;let r=Qc();r.font=e;let i=r.measureText("\\u{1F600}").width;if(n=0,i>t+.5&&typeof document<"u"&&document.body!==null){let o=document.createElement("span");o.style.font=e,o.style.display="inline-block",o.style.visibility="hidden",o.style.position="absolute",o.textContent="\\u{1F600}",document.body.appendChild(o);let a=o.getBoundingClientRect().width;document.body.removeChild(o),i-a>.5&&(n=i-a)}return mx.set(e,n),n}function jM(e){let t=0,n=fx();for(let r of n.segment(e))qM(r.segment)&&t++;return t}function KM(e,t){return t.emojiCount===void 0&&(t.emojiCount=jM(e)),t.emojiCount}function ln(e,t,n){return n===0?t.width:t.width-KM(e,t)*n}function hx(e,t,n,r,i){if(t.breakableFitAdvances!==void 0)return t.breakableFitAdvances;let o=fx(),a=[];for(let d of o.segment(e))a.push(d.segment);if(a.length<=1)return t.breakableFitAdvances=null,t.breakableFitAdvances;if(i==="sum-graphemes"){let d=[];for(let f of a){let m=Bt(f,n);d.push(ln(f,m,r))}return t.breakableFitAdvances=d,t.breakableFitAdvances}if(i==="pair-context"||a.length>BM){let d=[],f=null,m=0;for(let p of a){let g=Bt(p,n),b=ln(p,g,r);if(f===null)d.push(b);else{let y=f+p,v=Bt(y,n);d.push(ln(y,v,r)-m)}f=p,m=b}return t.breakableFitAdvances=d,t.breakableFitAdvances}let s=[],l="",u=0;for(let d of a){l+=d;let f=Bt(l,n),m=ln(l,f,r);s.push(m-u),u=m}return t.breakableFitAdvances=s,t.breakableFitAdvances}function gx(e,t){let n=Qc();n.font=e;let r=WM(e),i=$M(e),o=t?zM(e,i):0;return{cache:r,fontSize:i,emojiCorrection:o}}function YM(e,t){for(;t<e.widths.length;){let n=e.kinds[t];if(n!=="space"&&n!=="zero-width-break"&&n!=="soft-hyphen")break;t++}return t}function bx(e,t){if(t<=0)return 0;let n=e%t;return Math.abs(n)<=1e-6?t:t-n}function yx(e,t,n,r,i){let o=0,a=t;for(;o<e.length;){let s=a+e[o];if((o+1<e.length?s+i:s)>n+r)break;a=s,o++}return{fitCount:o,fittedWidth:a}}function XM(e,t){let n=0,r=e.chunks.length;for(;n<r;){let i=Math.floor((n+r)/2);t<e.chunks[i].consumedEndSegmentIndex?r=i:n=i+1}return n<e.chunks.length?n:-1}function xx(e,t,n){let r=n.segmentIndex;if(n.graphemeIndex>0)return t;let i=e.chunks[t];if(i.startSegmentIndex===i.endSegmentIndex&&r===i.startSegmentIndex)return n.segmentIndex=r,n.graphemeIndex=0,t;for(r<i.startSegmentIndex&&(r=i.startSegmentIndex);r<i.endSegmentIndex;){let o=e.kinds[r];if(o!=="space"&&o!=="zero-width-break"&&o!=="soft-hyphen")return n.segmentIndex=r,n.graphemeIndex=0,t;r++}return i.consumedEndSegmentIndex>=e.widths.length?-1:(n.segmentIndex=i.consumedEndSegmentIndex,n.graphemeIndex=0,t+1)}function Sx(e,t){if(t.segmentIndex>=e.widths.length)return-1;let n=XM(e,t.segmentIndex);return n<0?-1:xx(e,n,t)}function JM(e,t,n){if(n.segmentIndex>=e.widths.length)return-1;let r=t;for(;r<e.chunks.length&&n.segmentIndex>=e.chunks[r].consumedEndSegmentIndex;)r++;return r>=e.chunks.length?-1:xx(e,r,n)}function vx(e,t){return e.simpleLineWalkFastPath?Ex(e,t):Zc(e,t)}function Ex(e,t,n){let{widths:r,kinds:i,breakableFitAdvances:o}=e;if(r.length===0)return 0;let s=un().lineFitEpsilon,l=t+s,u=0,d=0,f=!1,m=0,p=0,g=0,b=0,y=-1,v=0;function A(){y=-1,v=0}function E(M=g,k=b,U=d){u++,n?.({startSegmentIndex:m,startGraphemeIndex:p,endSegmentIndex:M,endGraphemeIndex:k,width:U}),d=0,f=!1,A()}function T(M,k){f=!0,m=M,p=0,g=M+1,b=0,d=k}function P(M,k,U){f=!0,m=M,p=k,g=M,b=k+1,d=U}function N(M,k){if(!f){T(M,k);return}d+=k,g=M+1,b=0}function D(M,k){let U=o[M];for(let K=k;K<U.length;K++){let X=U[K];f?d+X>l?(E(),P(M,K,X)):(d+=X,g=M,b=K+1):P(M,K,X)}f&&g===M&&b===U.length&&(g=M+1,b=0)}let R=0;for(;R<r.length&&!(!f&&(R=YM(e,R),R>=r.length));){let M=r[R],k=i[R],U=k==="space"||k==="preserved-space"||k==="tab"||k==="zero-width-break"||k==="soft-hyphen";if(!f){M>t&&o[R]!==null?D(R,0):T(R,M),U&&(y=R+1,v=d-M),R++;continue}if(d+M>l){if(U){N(R,M),E(R+1,0,d-M),R++;continue}if(y>=0){if(g>y||g===y&&b>0){E();continue}E(y,0,v);continue}if(M>t&&o[R]!==null){E(),D(R,0),R++;continue}E();continue}N(R,M),U&&(y=R+1,v=d-M),R++}return f&&E(),u}function Zc(e,t,n){if(e.simpleLineWalkFastPath)return Ex(e,t,n);let{widths:r,lineEndFitAdvances:i,lineEndPaintAdvances:o,kinds:a,breakableFitAdvances:s,discretionaryHyphenWidth:l,tabStopAdvance:u,chunks:d}=e;if(r.length===0||d.length===0)return 0;let f=un(),m=f.lineFitEpsilon,p=t+m,g=0,b=0,y=!1,v=0,A=0,E=0,T=0,P=-1,N=0,D=0,R=null;function M(){P=-1,N=0,D=0,R=null}function k(B=E,z=T,q=b){g++,n?.({startSegmentIndex:v,startGraphemeIndex:A,endSegmentIndex:B,endGraphemeIndex:z,width:q}),b=0,y=!1,M()}function U(B,z){y=!0,v=B,A=0,E=B+1,T=0,b=z}function K(B,z,q){y=!0,v=B,A=z,E=B,T=z+1,b=q}function X(B,z){if(!y){U(B,z);return}b+=z,E=B+1,T=0}function L(B,z,q,Y){if(!z)return;let j=B==="tab"?0:i[q],G=B==="tab"?Y:o[q];P=q+1,N=b-Y+j,D=b-Y+G,R=B}function C(B,z){let q=s[B];for(let Y=z;Y<q.length;Y++){let j=q[Y];y?b+j>p?(k(),K(B,Y,j)):(b+=j,E=B,T=Y+1):K(B,Y,j)}y&&E===B&&T===q.length&&(E=B+1,T=0)}function H(B){if(R!=="soft-hyphen")return!1;let z=s[B];if(z==null)return!1;let{fitCount:q,fittedWidth:Y}=yx(z,b,t,m,l);return q===0?!1:(b=Y,E=B,T=q,M(),q===z.length?(E=B+1,T=0,!0):(k(B,q,Y+l),C(B,q),!0))}function J(B){g++,n?.({startSegmentIndex:B.startSegmentIndex,startGraphemeIndex:0,endSegmentIndex:B.consumedEndSegmentIndex,endGraphemeIndex:0,width:0}),M()}for(let B=0;B<d.length;B++){let z=d[B];if(z.startSegmentIndex===z.endSegmentIndex){J(z);continue}y=!1,b=0,v=z.startSegmentIndex,A=0,E=z.startSegmentIndex,T=0,M();let q=z.startSegmentIndex;for(;q<z.endSegmentIndex;){let Y=a[q],j=Y==="space"||Y==="preserved-space"||Y==="tab"||Y==="zero-width-break"||Y==="soft-hyphen",G=Y==="tab"?bx(b,u):r[q];if(Y==="soft-hyphen"){y&&(E=q+1,T=0,P=q+1,N=b+l,D=b+l,R=Y),q++;continue}if(!y){G>t&&s[q]!==null?C(q,0):U(q,G),L(Y,j,q,G),q++;continue}if(b+G>p){let Z=b+(Y==="tab"?0:i[q]),de=b+(Y==="tab"?G:o[q]);if(R==="soft-hyphen"&&f.preferEarlySoftHyphenBreak&&N<=p){k(P,0,D);continue}if(R==="soft-hyphen"&&H(q)){q++;continue}if(j&&Z<=p){X(q,G),k(q+1,0,de),q++;continue}if(P>=0&&N<=p){if(E>P||E===P&&T>0){k();continue}let le=P;k(le,0,D),q=le;continue}if(G>t&&s[q]!==null){k(),C(q,0),q++;continue}k();continue}X(q,G),L(Y,j,q,G),q++}if(y){let Y=P===z.consumedEndSegmentIndex?D:b;k(z.consumedEndSegmentIndex,0,Y)}}return g}function Ax(e,t,n,r){let i=e.chunks[n];if(i.startSegmentIndex===i.endSegmentIndex)return t.segmentIndex=i.consumedEndSegmentIndex,t.graphemeIndex=0,0;let{widths:o,lineEndFitAdvances:a,lineEndPaintAdvances:s,kinds:l,breakableFitAdvances:u,discretionaryHyphenWidth:d,tabStopAdvance:f}=e,m=un(),p=m.lineFitEpsilon,g=r+p,b=0,y=!1,v=t.segmentIndex,A=t.graphemeIndex,E=-1,T=0,P=0,N=null;function D(){E=-1,T=0,P=0,N=null}function R(C=v,H=A,J=b){return y?(t.segmentIndex=C,t.graphemeIndex=H,J):null}function M(C,H){y=!0,v=C+1,A=0,b=H}function k(C,H,J){y=!0,v=C,A=H+1,b=J}function U(C,H){if(!y){M(C,H);return}b+=H,v=C+1,A=0}function K(C,H,J,B){if(!H)return;let z=C==="tab"?0:a[J],q=C==="tab"?B:s[J];E=J+1,T=b-B+z,P=b-B+q,N=C}function X(C,H){let J=u[C];for(let B=H;B<J.length;B++){let z=J[B];if(!y)k(C,B,z);else{if(b+z>g)return R();b+=z,v=C,A=B+1}}return y&&v===C&&A===J.length&&(v=C+1,A=0),null}function L(C){if(N!=="soft-hyphen"||E<0)return null;let H=u[C]??null;if(H!==null){let{fitCount:J,fittedWidth:B}=yx(H,b,r,p,d);if(J===H.length)return b=B,v=C+1,A=0,D(),null;if(J>0)return R(C,J,B+d)}return T<=g?R(E,0,P):null}for(let C=t.segmentIndex;C<i.endSegmentIndex;C++){let H=l[C],J=H==="space"||H==="preserved-space"||H==="tab"||H==="zero-width-break"||H==="soft-hyphen",B=C===t.segmentIndex?t.graphemeIndex:0,z=H==="tab"?bx(b,f):o[C];if(H==="soft-hyphen"&&B===0){y&&(v=C+1,A=0,E=C+1,T=b+d,P=b+d,N=H);continue}if(!y){if(B>0){let Y=X(C,B);if(Y!==null)return Y}else if(z>r&&u[C]!==null){let Y=X(C,0);if(Y!==null)return Y}else M(C,z);K(H,J,C,z);continue}if(b+z>g){let Y=b+(H==="tab"?0:a[C]),j=b+(H==="tab"?z:s[C]);if(N==="soft-hyphen"&&m.preferEarlySoftHyphenBreak&&T<=g)return R(E,0,P);let G=L(C);if(G!==null)return G;if(J&&Y<=g)return U(C,z),R(C+1,0,j);if(E>=0&&T<=g)return v>E||v===E&&A>0?R():R(E,0,P);if(z>r&&u[C]!==null){let V=R();if(V!==null)return V;let Z=X(C,0);if(Z!==null)return Z}return R()}U(C,z),K(H,J,C,z)}return E===i.consumedEndSegmentIndex&&A===0?R(i.consumedEndSegmentIndex,0,P):R(i.consumedEndSegmentIndex,0,b)}function QM(e,t,n){let{widths:r,kinds:i,breakableFitAdvances:o}=e,s=un().lineFitEpsilon,l=n+s,u=0,d=!1,f=t.segmentIndex,m=t.graphemeIndex,p=-1,g=0;for(let b=t.segmentIndex;b<r.length;b++){let y=r[b],v=i[b],A=v==="space"||v==="preserved-space"||v==="tab"||v==="zero-width-break"||v==="soft-hyphen",E=b===t.segmentIndex?t.graphemeIndex:0,T=o[b];if(!d){if(E>0||y>n&&T!==null){let P=T,N=P[E];d=!0,u=N,f=b,m=E+1;for(let D=E+1;D<P.length;D++){let R=P[D];if(u+R>l)return t.segmentIndex=f,t.graphemeIndex=m,u;u+=R,f=b,m=D+1}f===b&&m===P.length&&(f=b+1,m=0)}else d=!0,u=y,f=b+1,m=0;A&&(p=b+1,g=u-y);continue}if(u+y>l)return A?(t.segmentIndex=b+1,t.graphemeIndex=0,u):p>=0?f>p||f===p&&m>0?(t.segmentIndex=f,t.graphemeIndex=m,u):(t.segmentIndex=p,t.graphemeIndex=0,g):(t.segmentIndex=f,t.graphemeIndex=m,u);u+=y,f=b+1,m=0,A&&(p=b+1,g=u-y)}return d?(t.segmentIndex=f,t.graphemeIndex=m,u):null}function ZM(e,t,n){let r=Sx(e,t);return r<0?null:e.simpleLineWalkFastPath?QM(e,t,n):Ax(e,t,r,n)}function wx(e,t){if(e.widths.length===0)return{lineCount:0,maxLineWidth:0};let n={segmentIndex:0,graphemeIndex:0},r=0,i=0;if(!e.simpleLineWalkFastPath){let o=Sx(e,n);for(;o>=0;){let a=Ax(e,n,o,t);if(a===null)return{lineCount:r,maxLineWidth:i};r++,a>i&&(i=a),o=JM(e,o,n)}return{lineCount:r,maxLineWidth:i}}for(;;){let o=ZM(e,n,t);if(o===null)return{lineCount:r,maxLineWidth:i};r++,o>i&&(i=o)}}var ed=null;function eL(){return ed===null&&(ed=new Intl.Segmenter(void 0,{granularity:"grapheme"})),ed}function tL(e){return e?{widths:[],lineEndFitAdvances:[],lineEndPaintAdvances:[],kinds:[],simpleLineWalkFastPath:!0,segLevels:null,breakableFitAdvances:[],discretionaryHyphenWidth:0,tabStopAdvance:0,chunks:[],segments:[]}:{widths:[],lineEndFitAdvances:[],lineEndPaintAdvances:[],kinds:[],simpleLineWalkFastPath:!0,segLevels:null,breakableFitAdvances:[],discretionaryHyphenWidth:0,tabStopAdvance:0,chunks:[]}}function nL(e,t){let n=[],r=[],i=0,o=!1,a=!1,s=!1;function l(){r.length!==0&&(n.push({text:r.length===1?r[0]:r.join(""),start:i}),r=[],o=!1,a=!1,s=!1)}function u(f,m,p){r=[f],i=m,o=p,a=is(f),s=Ji.has(f)}function d(f,m){r.push(f),o=o||m;let p=is(f);f.length===1&&sn.has(f)?a=a||p:a=p,s=!1}for(let f of eL().segment(e)){let m=f.segment,p=pt(m);if(r.length===0){u(m,f.index,p);continue}if(s||ns.has(m)||sn.has(m)||t.carryCJKAfterClosingQuote&&p&&a){d(m,p);continue}if(!o&&!p){d(m,p);continue}l(),u(m,f.index,p)}return l(),n}function rL(e){if(e.length<=1)return e;let t=[],n=[e[0].text],r=e[0].start,i=pt(e[0].text),o=ts(e[0].text);function a(){t.push({text:n.length===1?n[0]:n.join(""),start:r})}for(let s=1;s<e.length;s++){let l=e[s],u=pt(l.text),d=ts(l.text);if(i&&o){n.push(l.text),i=i||u,o=d;continue}a(),n=[l.text],r=l.start,i=u,o=d}return a(),t}function iL(e,t,n,r){let i=un(),{cache:o,emojiCorrection:a}=gx(t,px(e.normalized)),s=ln("-",Bt("-",o),a),u=ln(" ",Bt(" ",o),a)*8;if(e.len===0)return tL(n);let d=[],f=[],m=[],p=[],g=e.chunks.length<=1,b=n?[]:null,y=[],v=n?[]:null,A=Array.from({length:e.len});function E(D,R,M,k,U,K,X){U!=="text"&&U!=="space"&&U!=="zero-width-break"&&(g=!1),d.push(R),f.push(M),m.push(k),p.push(U),b?.push(K),y.push(X),v!==null&&v.push(D)}function T(D,R,M,k,U){let K=Bt(D,o),X=ln(D,K,a),L=R==="space"||R==="preserved-space"||R==="zero-width-break"?0:X,C=R==="space"||R==="zero-width-break"?0:X;if(U&&k&&D.length>1){let H="sum-graphemes";Xi(D)?H="pair-context":i.preferPrefixWidthsForBreakableRuns&&(H="segment-prefixes");let J=hx(D,K,o,a,H);E(D,X,L,C,R,M,J);return}E(D,X,L,C,R,M,null)}for(let D=0;D<e.len;D++){A[D]=d.length;let R=e.texts[D],M=e.isWordLike[D],k=e.kinds[D],U=e.starts[D];if(k==="soft-hyphen"){E(R,0,s,s,k,U,null);continue}if(k==="hard-break"){E(R,0,0,0,k,U,null);continue}if(k==="tab"){E(R,0,0,0,k,U,null);continue}let K=Bt(R,o);if(k==="text"&&K.containsCJK){let X=nL(R,i),L=r==="keep-all"?rL(X):X;for(let C=0;C<L.length;C++){let H=L[C];T(H.text,"text",U+H.start,M,r==="keep-all"||!pt(H.text))}continue}T(R,k,U,M,!0)}let P=oL(e.chunks,A,d.length),N=b===null?null:Zy(e.normalized,b);return v!==null?{widths:d,lineEndFitAdvances:f,lineEndPaintAdvances:m,kinds:p,simpleLineWalkFastPath:g,segLevels:N,breakableFitAdvances:y,discretionaryHyphenWidth:s,tabStopAdvance:u,chunks:P,segments:v}:{widths:d,lineEndFitAdvances:f,lineEndPaintAdvances:m,kinds:p,simpleLineWalkFastPath:g,segLevels:N,breakableFitAdvances:y,discretionaryHyphenWidth:s,tabStopAdvance:u,chunks:P}}function oL(e,t,n){let r=[];for(let i=0;i<e.length;i++){let o=e[i],a=o.startSegmentIndex<t.length?t[o.startSegmentIndex]:n,s=o.endSegmentIndex<t.length?t[o.endSegmentIndex]:n,l=o.consumedEndSegmentIndex<t.length?t[o.consumedEndSegmentIndex]:n;r.push({startSegmentIndex:a,endSegmentIndex:s,consumedEndSegmentIndex:l})}return r}function _x(e,t,n,r){let i=r?.wordBreak??"normal",o=cx(e,un(),r?.whiteSpace,i);return iL(o,t,n,i)}function os(e,t,n){return _x(e,t,!1,n)}function Cx(e,t,n){return _x(e,t,!0,n)}function as(e,t,n){let r=vx(e,t);return{lineCount:r,height:r*n}}function aL(e){return{width:e.width,start:{segmentIndex:e.startSegmentIndex,graphemeIndex:e.startGraphemeIndex},end:{segmentIndex:e.endSegmentIndex,graphemeIndex:e.endGraphemeIndex}}}function sL(e,t,n){return e.widths.length===0?0:Zc(e,t,r=>{n(aL(r))})}function Rx(e,t){return wx(e,t)}function Tx(e){let t=0;return sL(e,Number.POSITIVE_INFINITY,n=>{n.width>t&&(t=n.width)}),t}var lL={maxWidth:1600,baseFontSize:78,minFontSize:42,fontWeight:900,fontFamily:"Outfit",step:2};function kx(e,t){let n={...lL,...t},r=1.2;for(let i=n.baseFontSize;i>=n.minFontSize;i-=n.step){let o=`${n.fontWeight} ${i}px ${n.fontFamily}`,a=os(e,o),{lineCount:s}=as(a,n.maxWidth,i*r);if(s<=1)return{fontSize:i,fits:!0}}return{fontSize:n.minFontSize,fits:!1}}var Mx={prepare:os,layout:as,prepareWithSegments:Cx,measureLineStats:Rx,measureNaturalWidth:Tx};function Lx(e,t){if(e.trimStart().startsWith("[")){let n=JSON.parse(e);if(!Array.isArray(n)||!n.every(r=>typeof r=="string"))throw Error("List must be a JSON array of texts");return n}return Array.from(e,n=>t.includes(n)?`\n`:n).join("").split(`\n`).map(n=>n.trim()).filter(Boolean)}function Qi(e,t){if(!(!e||typeof e!="object"||Array.isArray(e)))return Reflect.get(e,t)}function Mn(e,t,n){return e.columns.find(r=>t.includes(r.role))??e.columns[n]}function uL(e,t){if(t.type==="number"){if(typeof e!="number"&&typeof e!="string"||typeof e=="string"&&e.trim()==="")return;let n=typeof e=="number"?e:Number(e);return Number.isFinite(n)?n:void 0}return typeof e=="string"?e.trim():void 0}function ss(e,t){let n=[],r=[];for(let[a,s]of e.entries()){let l={};for(let d of t.columns){let f=Qi(s,d.id),m=uL(f,d);if(m===void 0||m===""){d.required?r.push({path:`rows.${a}.${d.id}`,message:`${d.label} is required`}):m===void 0&&f!==void 0&&!(typeof f=="string"&&f.trim()==="")&&r.push({path:`rows.${a}.${d.id}`,message:`${d.label} must be a valid ${d.type}`});continue}if(l[d.id]=m,typeof m=="number"&&(d.min!==void 0&&m<d.min||d.max!==void 0&&m>d.max)&&r.push({path:`rows.${a}.${d.id}`,message:`${d.label} must be within ${d.min??"\\u2212\\u221E"}\\u2013${d.max??"\\u221E"}`}),typeof m=="number"&&d.integer&&!Number.isInteger(m)&&r.push({path:`rows.${a}.${d.id}`,message:`${d.label} must be an integer`}),typeof m=="string"&&(d.maxLength!==void 0&&Array.from(m).length>d.maxLength&&r.push({path:`rows.${a}.${d.id}`,message:`${d.label} allows at most ${d.maxLength} characters`}),d.list)){let p=d.list,g=[];try{g=Lx(m,p.separators)}catch{r.push({path:`rows.${a}.${d.id}`,message:`${d.label} must be a list of texts`})}(g.length>p.maxItems||g.some(b=>Array.from(b).length>p.itemMaxLength||!b.trim()))&&r.push({path:`rows.${a}.${d.id}`,message:`${d.label} allows at most ${p.maxItems} items and ${p.itemMaxLength} characters per item`})}d.options&&!d.options.some(p=>p.value===m)&&r.push({path:`rows.${a}.${d.id}`,message:`${d.label} is not an available option`})}let u=Qi(s,t.rowId);l[t.rowId]===void 0&&(typeof u=="string"||typeof u=="number")&&(l[t.rowId]=u),n.push(l)}let i=t.minRows??0;n.length<i&&r.push({path:"rows",message:`At least ${i} rows are required`}),t.maxRows!==void 0&&n.length>t.maxRows&&r.push({path:"rows",message:`At most ${t.maxRows} rows are allowed`});let o=new Set;for(let[a,s]of n.entries()){let l=s[t.rowId];l!==void 0&&(o.has(l)&&r.push({path:`rows.${a}.${t.rowId}`,message:"Row id must be unique"}),o.add(l))}return{document:{version:1,kind:t.kind,rows:n},issues:r}}function cL(e,t){try{let n=JSON.parse(e),r=Qi(n,"version"),i=Qi(n,"kind"),o=Qi(n,"rows");return r!==1||i!==t.kind||!Array.isArray(o)?{document:{version:1,kind:t.kind,rows:[]},issues:[{path:"data",message:"Data document does not match this component contract"}]}:ss(o,t)}catch{return{document:{version:1,kind:t.kind,rows:[]},issues:[{path:"data",message:"Data document is not valid JSON"}]}}}function dL(e,t){let n=Mn(t,["id","label"],0),r=Mn(t,["value"],1);if(!n||!r)return{document:{version:1,kind:t.kind,rows:[]},issues:[{path:"columns",message:"Key-value data needs two columns"}]};let i=e.split(",").map(o=>{let a=o.lastIndexOf(":");return{[n.id]:o.slice(0,a).trim(),[r.id]:a>=0?o.slice(a+1).trim():""}}).filter(o=>o[n.id]!=="");return ss(i,t)}function mL(e,t){let n=Mn(t,["source"],0),r=Mn(t,["target"],1),i=Mn(t,["value"],2);if(!n||!r||!i)return{document:{version:1,kind:t.kind,rows:[]},issues:[{path:"columns",message:"Route data needs source, target, and value columns"}]};let o=e.split(",").map(a=>{let s=a.lastIndexOf(":"),l=a.slice(0,s).split(">");return{[n.id]:(l[0]??"").trim(),[r.id]:(l[1]??"").trim(),[i.id]:s>=0?a.slice(s+1).trim():"",[t.rowId]:`${(l[0]??"").trim()}>${(l[1]??"").trim()}`}}).filter(a=>a[n.id]!==""||a[r.id]!=="");return ss(o,t)}function fL(e,t){let n=Mn(t,["id","label"],0),r=Mn(t,["value"],1);if(!n||!r)return{document:{version:1,kind:t.kind,rows:[]},issues:[{path:"columns",message:"Label-detail data needs two columns"}]};let i=e.split("|").map(o=>{let a=o.indexOf("::");return{[n.id]:(a>=0?o.slice(0,a):o).trim(),[r.id]:(a>=0?o.slice(a+2):"").trim()}}).filter(o=>o[n.id]!=="");return ss(i,t)}function Nx(e,t){return e.binding.encoding==="json"?cL(t,e):e.binding.encoding==="route-value-list"?mL(t,e):e.binding.encoding==="label-detail-list"?fL(t,e):dL(t,e)}function Fx(e){return new URL(e,document.baseURI).href}var cn="appifact-film:";function Ix(e){let{iframe:t,runnerHtml:n,load:r}=e,i=(t.getAttribute("sandbox")??"").split(/\\s+/);if(!i.includes("allow-scripts")||i.includes("allow-same-origin"))throw new Error(\'Film runners require sandbox="allow-scripts" without allow-same-origin\');let o=0,a=!1,s=!1,l=null,u,d,f=new Promise((E,T)=>{u=E,d=T});f.catch(()=>{});let m=null,p=E=>{l=E,clearTimeout(g),d(E),m&&(clearTimeout(m.timer),m.reject(E),m=null)},g=setTimeout(()=>p(new Error("Film runner did not become ready within 20 s")),2e4),b=E=>{if(E.type!==cn+"frame"&&E.type!==cn+"frame-error"||!("seq"in E)||m===null||m.sequence!==E.seq)return;let T=m;m=null,clearTimeout(T.timer),E.type===cn+"frame-error"?T.reject(new Error("message"in E?String(E.message):"Film frame failed")):T.resolve()},y=E=>{try{let T=t.contentWindow;if(!T)throw new Error("Film runner window is unavailable");T.postMessage(E,"*")}catch(T){p(T instanceof Error?T:new Error(String(T)))}},v=E=>{if(E.type===cn+"hello"){if(a){p(new Error("Film runner reloaded; recreate the bridge before seeking"));return}a=!0,y({...r,type:cn+"load"})}else E.type===cn+"ready"&&a?(clearTimeout(g),u()):E.type===cn+"error"&&p(new Error("message"in E?String(E.message):"Film runner failed"))},A=E=>{if(s||l||E.source!==t.contentWindow||E.origin!=="null")return;let T=E.data;!T||typeof T!="object"||!("type"in T)||(v(T),b(T))};return window.addEventListener("message",A),t.srcdoc=n,{ready:f,async render(E){if(await f,l)throw l;if(m)throw new Error("Film seeks must be serialized; use registerFrameSource");let T=++o;return new Promise((P,N)=>{let D=setTimeout(()=>{p(new Error("Film frame did not arrive within 15 s"))},15e3);m={sequence:T,resolve:P,reject:N,timer:D},y({type:cn+"frame",t:E,seq:T})})},dispose(){s||(s=!0,window.removeEventListener("message",A),p(new Error("Film bridge was disposed")),t.srcdoc="")}}}window.__timelines=window.__timelines||{};eb();Ky();Yy();window.__hfHasFrameSources=If;Km();Qm();window.__hyperframes={assetUrl:Fx,fitTextFontSize:kx,getVariables:sf,onVariablesChange:V0,updateVariables:W0,pretext:Mx,parseVisualComponentData:Nx,registerRuntimeDataHandler:Vy,setRuntimeData:Ja,clearRuntimeData:Qa,registerFrameSource:Df,createFilmBridge:Ix};function Dx(){let e=window;e.__hyperframeRuntimeBootstrapped||(e.__hyperframeRuntimeBootstrapped=!0,Jy())}function Px(){In();let e=Array.from(document.querySelectorAll(r0));e.length===0?Dx():La(e,Dx)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Px,{once:!0}):Px();})();\n';
function getHyperframeRuntimeScript() {
  return RUNTIME_IIFE;
}

// ../core/src/inline-scripts/parityContract.ts
var MEDIA_VISUAL_STYLE_PROPERTIES = [
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "inset",
  "object-fit",
  "object-position",
  "z-index",
  "opacity",
  "visibility",
  "filter",
  "mix-blend-mode",
  "backdrop-filter",
  "border-radius",
  "overflow",
  "clip-path",
  "mask",
  "mask-image",
  "mask-size",
  "mask-position",
  "mask-repeat",
  "transform",
  "transform-origin",
  "translate",
  "rotate",
  "scale",
  "box-sizing"
];
var FRAME_BOUNDARY_EPSILON = 1e-3;
function safeFps(fps) {
  return Number.isFinite(fps) && fps > 0 ? fps : 30;
}
function safeTime(timeSeconds) {
  return Number.isFinite(timeSeconds) && timeSeconds > 0 ? timeSeconds : 0;
}
function quantizeTimeToFrame(timeSeconds, fps) {
  const grid = safeFps(fps);
  const frameIndex = Math.floor(safeTime(timeSeconds) * grid + 1e-9);
  return frameIndex / grid;
}
function quantizeSeekTime(timeSeconds, fps, subFrameDivisions) {
  const divisions = Number.isInteger(subFrameDivisions) ? subFrameDivisions : 1;
  if (divisions <= 1) return quantizeTimeToFrame(timeSeconds, fps);
  const grid = safeFps(fps) * divisions;
  return Math.round(safeTime(timeSeconds) * grid) / grid;
}
function snapTimeToFrameBoundary(timeSeconds, fps) {
  const grid = safeFps(fps);
  const time = safeTime(timeSeconds);
  const framePosition = time * grid;
  const nearestFrame = Math.round(framePosition);
  return Math.abs(framePosition - nearestFrame) <= FRAME_BOUNDARY_EPSILON ? nearestFrame / grid : time;
}
function exportClipWindow(start, end, fps) {
  return {
    start: snapTimeToFrameBoundary(start, fps),
    end: Number.isFinite(end) ? snapTimeToFrameBoundary(end, fps) : end
  };
}
function copyMediaVisualStyles(targetStyle, sourceStyle, properties = MEDIA_VISUAL_STYLE_PROPERTIES) {
  for (const property of properties) {
    const value = sourceStyle.getPropertyValue(property);
    if (value) {
      targetStyle.setProperty(property, value);
    }
  }
}

// ../core/src/telemetryRedaction.ts
var MAX_TELEMETRY_STRING_LENGTH = 240;
function truncateTelemetryString(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1)}\u2026`;
}
function redactUrlQueryStrings(value) {
  return value.replace(/\b(https?:\/\/[^\s?]+)\?[^\s]*/g, "$1?\u2026");
}
var SEGMENT = String.raw`[^\s/\\'"]+`;
var SEGMENT_NODOT = String.raw`[^\s/\\'".]+`;
var TOKEN_TAIL = String.raw`[^\s'")]*`;
var ABSOLUTE_PATH = new RegExp(
  String.raw`(?<![:\w/\\])(?:[A-Za-z]:)?(?:[\\/]${SEGMENT}){2,}${TOKEN_TAIL}`,
  "g"
);
var RELATIVE_PATH = new RegExp(
  String.raw`(?<![\w/\\.])\.{1,2}(?:[\\/]${SEGMENT})+${TOKEN_TAIL}`,
  "g"
);
var ASSET_BASENAME = /(?<![\w/\\])[^\s/\\'"]+\.(?:mp4|mov|mkv|webm|avi|m4v|mpe?g|ts|mp3|wav|aac|m4a|flac|ogg|opus|png|jpe?g|gif|webp|svg|html?|json|srt|vtt|ass)\b/gi;
var BARE_RELATIVE_PATH = new RegExp(
  [
    // Two or more separators: `customer/acme/video.mp4`. No extension needed —
    // that much structure is already a path.
    String.raw`(?<![^\s'\"(=,\[])(?:${SEGMENT}[\\/]){2,}${SEGMENT}${TOKEN_TAIL}`,
    // One separator, but the last segment carries a file extension:
    // `assets/bgm.mp3`. That segment is dot-free on purpose — SEGMENT includes
    // `.`, so a greedy one swallows the extension this rule needs.
    String.raw`(?<![^\s'\"(=,\[])${SEGMENT}[\\/]${SEGMENT_NODOT}\.\w{1,8}\b${TOKEN_TAIL}`
  ].join("|"),
  "g"
);
function redactKnownPaths(value, paths) {
  if (typeof value !== "string") return "";
  let out = value;
  for (const path of paths) {
    if (typeof path !== "string" || path.length === 0) continue;
    const basename2 = path.split(/[\\/]/).pop() ?? "";
    for (const literal of [path, basename2].filter((v) => v.length > 2)) {
      out = out.split(literal).join("[path]");
    }
  }
  return out;
}
function redactFilePaths(value) {
  return value.replace(/file:\/\/[^\s'")]+/g, "[file-url]").replace(RELATIVE_PATH, "[path]").replace(BARE_RELATIVE_PATH, "[path]").replace(ABSOLUTE_PATH, "[path]").replace(ASSET_BASENAME, "[file]");
}
function redactTelemetryString(value, maxLength = MAX_TELEMETRY_STRING_LENGTH) {
  return truncateTelemetryString(redactFilePaths(redactUrlQueryStrings(value)), maxLength);
}

// ../core/src/safePath.ts
import { resolve as resolve2, sep, join, dirname as dirname2, basename, relative, isAbsolute } from "path";
import { lstatSync, mkdirSync, realpathSync, statSync } from "fs";
function realpath(path) {
  try {
    return realpathSync.native(path);
  } catch (error) {
    if (error.code === "EISDIR") return realpathSync(path);
    throw error;
  }
}
function isMissingPath(path) {
  try {
    lstatSync(path);
    return false;
  } catch (error) {
    return Boolean(
      error && typeof error === "object" && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR")
    );
  }
}
function isSafePath(base, resolved) {
  let baseReal;
  try {
    baseReal = realpath(resolve2(base));
  } catch {
    return false;
  }
  const target = resolve2(resolved);
  const trailing = [];
  let probe = target;
  for (; ; ) {
    let ancestorReal;
    try {
      ancestorReal = realpath(probe);
    } catch {
      if (!isMissingPath(probe)) return false;
      const parent = dirname2(probe);
      if (parent === probe) return false;
      trailing.push(basename(probe));
      probe = parent;
      continue;
    }
    const targetReal = trailing.length ? join(ancestorReal, ...[...trailing].reverse()) : ancestorReal;
    return targetReal === baseReal || targetReal.startsWith(baseReal + sep);
  }
}
function resolveWithinProject(base, relativePath) {
  const resolved = resolve2(base, relativePath);
  return isSafePath(base, resolved) ? resolved : null;
}
var ProjectRootMissingError = class extends Error {
  constructor(root) {
    super(`Project folder not found: ${root}`);
    this.root = root;
    this.name = "ProjectRootMissingError";
  }
  root;
};
var isProjectRootMissing = (error) => error instanceof Error && error.name === "ProjectRootMissingError";
function folderGone(dir) {
  try {
    return !statSync(dir, { throwIfNoEntry: false });
  } catch {
    return false;
  }
}
function realProjectRoot(root) {
  try {
    return realpath(root);
  } catch (error) {
    if (folderGone(root)) throw new ProjectRootMissingError(root);
    throw error;
  }
}
function mkdirWithinProject(root, dir) {
  if (folderGone(root)) throw new ProjectRootMissingError(root);
  const inside = relative(resolve2(root), resolve2(dir));
  if (inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  let path = resolve2(root);
  for (const part of inside.split(sep).filter(Boolean)) {
    path = join(path, part);
    try {
      mkdirSync(path);
    } catch (error) {
      const code = error.code;
      if (code === "ENOENT" && folderGone(root)) throw new ProjectRootMissingError(root);
      if (code !== "EEXIST") throw error;
    }
  }
}

// ../core/src/projectRule.ts
var PROJECT_MARKER_FILES = ["hyperframes.json", "meta.json", "project.json"];
function isHyperframesProject(fileNames) {
  const names = new Set(fileNames);
  return names.has("index.html") && PROJECT_MARKER_FILES.some((name) => names.has(name));
}

// ../core/src/adapters/gsap.ts
function createGSAPFrameAdapter(options) {
  const { fps, timeline } = options;
  const adapterId = options.id ?? "gsap";
  const getDurationSeconds = () => {
    const totalDuration = typeof timeline.totalDuration === "function" ? timeline.totalDuration() : timeline.duration();
    return Number.isFinite(totalDuration) && totalDuration > 0 ? totalDuration : 0;
  };
  return {
    id: adapterId,
    init: () => {
      timeline.pause?.();
    },
    getDurationFrames: () => {
      const durationSeconds = getDurationSeconds();
      return Math.max(0, Math.ceil(durationSeconds * fps));
    },
    seekFrame: (frame) => {
      const clampedFrame = Number.isFinite(frame) ? Math.max(0, frame) : 0;
      const targetSeconds = clampedFrame / fps;
      timeline.pause?.();
      timeline.seek(targetSeconds, false);
    }
  };
}

// ../../node_modules/.bun/@chenglou+pretext@0.0.5/node_modules/@chenglou/pretext/dist/generated/bidi-data.js
var latin1BidiTypes = [
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "S",
  "B",
  "S",
  "WS",
  "B",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "B",
  "B",
  "B",
  "S",
  "WS",
  "ON",
  "ON",
  "ET",
  "ET",
  "ET",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ES",
  "CS",
  "ES",
  "CS",
  "CS",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "EN",
  "CS",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "B",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "BN",
  "CS",
  "ON",
  "ET",
  "ET",
  "ET",
  "ET",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "ON",
  "ON",
  "BN",
  "ON",
  "ON",
  "ET",
  "ET",
  "EN",
  "EN",
  "ON",
  "L",
  "ON",
  "ON",
  "ON",
  "EN",
  "L",
  "ON",
  "ON",
  "ON",
  "ON",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "ON",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L",
  "L"
];
var nonLatin1BidiRanges = [
  [697, 698, "ON"],
  [706, 719, "ON"],
  [722, 735, "ON"],
  [741, 749, "ON"],
  [751, 767, "ON"],
  [768, 879, "NSM"],
  [884, 885, "ON"],
  [894, 894, "ON"],
  [900, 901, "ON"],
  [903, 903, "ON"],
  [1014, 1014, "ON"],
  [1155, 1161, "NSM"],
  [1418, 1418, "ON"],
  [1421, 1422, "ON"],
  [1423, 1423, "ET"],
  [1424, 1424, "R"],
  [1425, 1469, "NSM"],
  [1470, 1470, "R"],
  [1471, 1471, "NSM"],
  [1472, 1472, "R"],
  [1473, 1474, "NSM"],
  [1475, 1475, "R"],
  [1476, 1477, "NSM"],
  [1478, 1478, "R"],
  [1479, 1479, "NSM"],
  [1480, 1535, "R"],
  [1536, 1541, "AN"],
  [1542, 1543, "ON"],
  [1544, 1544, "AL"],
  [1545, 1546, "ET"],
  [1547, 1547, "AL"],
  [1548, 1548, "CS"],
  [1549, 1549, "AL"],
  [1550, 1551, "ON"],
  [1552, 1562, "NSM"],
  [1563, 1610, "AL"],
  [1611, 1631, "NSM"],
  [1632, 1641, "AN"],
  [1642, 1642, "ET"],
  [1643, 1644, "AN"],
  [1645, 1647, "AL"],
  [1648, 1648, "NSM"],
  [1649, 1749, "AL"],
  [1750, 1756, "NSM"],
  [1757, 1757, "AN"],
  [1758, 1758, "ON"],
  [1759, 1764, "NSM"],
  [1765, 1766, "AL"],
  [1767, 1768, "NSM"],
  [1769, 1769, "ON"],
  [1770, 1773, "NSM"],
  [1774, 1775, "AL"],
  [1776, 1785, "EN"],
  [1786, 1808, "AL"],
  [1809, 1809, "NSM"],
  [1810, 1839, "AL"],
  [1840, 1866, "NSM"],
  [1867, 1957, "AL"],
  [1958, 1968, "NSM"],
  [1969, 1983, "AL"],
  [1984, 2026, "R"],
  [2027, 2035, "NSM"],
  [2036, 2037, "R"],
  [2038, 2041, "ON"],
  [2042, 2044, "R"],
  [2045, 2045, "NSM"],
  [2046, 2069, "R"],
  [2070, 2073, "NSM"],
  [2074, 2074, "R"],
  [2075, 2083, "NSM"],
  [2084, 2084, "R"],
  [2085, 2087, "NSM"],
  [2088, 2088, "R"],
  [2089, 2093, "NSM"],
  [2094, 2136, "R"],
  [2137, 2139, "NSM"],
  [2140, 2143, "R"],
  [2144, 2191, "AL"],
  [2192, 2193, "AN"],
  [2194, 2198, "AL"],
  [2199, 2207, "NSM"],
  [2208, 2249, "AL"],
  [2250, 2273, "NSM"],
  [2274, 2274, "AN"],
  [2275, 2306, "NSM"],
  [2362, 2362, "NSM"],
  [2364, 2364, "NSM"],
  [2369, 2376, "NSM"],
  [2381, 2381, "NSM"],
  [2385, 2391, "NSM"],
  [2402, 2403, "NSM"],
  [2433, 2433, "NSM"],
  [2492, 2492, "NSM"],
  [2497, 2500, "NSM"],
  [2509, 2509, "NSM"],
  [2530, 2531, "NSM"],
  [2546, 2547, "ET"],
  [2555, 2555, "ET"],
  [2558, 2558, "NSM"],
  [2561, 2562, "NSM"],
  [2620, 2620, "NSM"],
  [2625, 2626, "NSM"],
  [2631, 2632, "NSM"],
  [2635, 2637, "NSM"],
  [2641, 2641, "NSM"],
  [2672, 2673, "NSM"],
  [2677, 2677, "NSM"],
  [2689, 2690, "NSM"],
  [2748, 2748, "NSM"],
  [2753, 2757, "NSM"],
  [2759, 2760, "NSM"],
  [2765, 2765, "NSM"],
  [2786, 2787, "NSM"],
  [2801, 2801, "ET"],
  [2810, 2815, "NSM"],
  [2817, 2817, "NSM"],
  [2876, 2876, "NSM"],
  [2879, 2879, "NSM"],
  [2881, 2884, "NSM"],
  [2893, 2893, "NSM"],
  [2901, 2902, "NSM"],
  [2914, 2915, "NSM"],
  [2946, 2946, "NSM"],
  [3008, 3008, "NSM"],
  [3021, 3021, "NSM"],
  [3059, 3064, "ON"],
  [3065, 3065, "ET"],
  [3066, 3066, "ON"],
  [3072, 3072, "NSM"],
  [3076, 3076, "NSM"],
  [3132, 3132, "NSM"],
  [3134, 3136, "NSM"],
  [3142, 3144, "NSM"],
  [3146, 3149, "NSM"],
  [3157, 3158, "NSM"],
  [3170, 3171, "NSM"],
  [3192, 3198, "ON"],
  [3201, 3201, "NSM"],
  [3260, 3260, "NSM"],
  [3276, 3277, "NSM"],
  [3298, 3299, "NSM"],
  [3328, 3329, "NSM"],
  [3387, 3388, "NSM"],
  [3393, 3396, "NSM"],
  [3405, 3405, "NSM"],
  [3426, 3427, "NSM"],
  [3457, 3457, "NSM"],
  [3530, 3530, "NSM"],
  [3538, 3540, "NSM"],
  [3542, 3542, "NSM"],
  [3633, 3633, "NSM"],
  [3636, 3642, "NSM"],
  [3647, 3647, "ET"],
  [3655, 3662, "NSM"],
  [3761, 3761, "NSM"],
  [3764, 3772, "NSM"],
  [3784, 3790, "NSM"],
  [3864, 3865, "NSM"],
  [3893, 3893, "NSM"],
  [3895, 3895, "NSM"],
  [3897, 3897, "NSM"],
  [3898, 3901, "ON"],
  [3953, 3966, "NSM"],
  [3968, 3972, "NSM"],
  [3974, 3975, "NSM"],
  [3981, 3991, "NSM"],
  [3993, 4028, "NSM"],
  [4038, 4038, "NSM"],
  [4141, 4144, "NSM"],
  [4146, 4151, "NSM"],
  [4153, 4154, "NSM"],
  [4157, 4158, "NSM"],
  [4184, 4185, "NSM"],
  [4190, 4192, "NSM"],
  [4209, 4212, "NSM"],
  [4226, 4226, "NSM"],
  [4229, 4230, "NSM"],
  [4237, 4237, "NSM"],
  [4253, 4253, "NSM"],
  [4957, 4959, "NSM"],
  [5008, 5017, "ON"],
  [5120, 5120, "ON"],
  [5760, 5760, "WS"],
  [5787, 5788, "ON"],
  [5906, 5908, "NSM"],
  [5938, 5939, "NSM"],
  [5970, 5971, "NSM"],
  [6002, 6003, "NSM"],
  [6068, 6069, "NSM"],
  [6071, 6077, "NSM"],
  [6086, 6086, "NSM"],
  [6089, 6099, "NSM"],
  [6107, 6107, "ET"],
  [6109, 6109, "NSM"],
  [6128, 6137, "ON"],
  [6144, 6154, "ON"],
  [6155, 6157, "NSM"],
  [6158, 6158, "BN"],
  [6159, 6159, "NSM"],
  [6277, 6278, "NSM"],
  [6313, 6313, "NSM"],
  [6432, 6434, "NSM"],
  [6439, 6440, "NSM"],
  [6450, 6450, "NSM"],
  [6457, 6459, "NSM"],
  [6464, 6464, "ON"],
  [6468, 6469, "ON"],
  [6622, 6655, "ON"],
  [6679, 6680, "NSM"],
  [6683, 6683, "NSM"],
  [6742, 6742, "NSM"],
  [6744, 6750, "NSM"],
  [6752, 6752, "NSM"],
  [6754, 6754, "NSM"],
  [6757, 6764, "NSM"],
  [6771, 6780, "NSM"],
  [6783, 6783, "NSM"],
  [6832, 6877, "NSM"],
  [6880, 6891, "NSM"],
  [6912, 6915, "NSM"],
  [6964, 6964, "NSM"],
  [6966, 6970, "NSM"],
  [6972, 6972, "NSM"],
  [6978, 6978, "NSM"],
  [7019, 7027, "NSM"],
  [7040, 7041, "NSM"],
  [7074, 7077, "NSM"],
  [7080, 7081, "NSM"],
  [7083, 7085, "NSM"],
  [7142, 7142, "NSM"],
  [7144, 7145, "NSM"],
  [7149, 7149, "NSM"],
  [7151, 7153, "NSM"],
  [7212, 7219, "NSM"],
  [7222, 7223, "NSM"],
  [7376, 7378, "NSM"],
  [7380, 7392, "NSM"],
  [7394, 7400, "NSM"],
  [7405, 7405, "NSM"],
  [7412, 7412, "NSM"],
  [7416, 7417, "NSM"],
  [7616, 7679, "NSM"],
  [8125, 8125, "ON"],
  [8127, 8129, "ON"],
  [8141, 8143, "ON"],
  [8157, 8159, "ON"],
  [8173, 8175, "ON"],
  [8189, 8190, "ON"],
  [8192, 8202, "WS"],
  [8203, 8205, "BN"],
  [8207, 8207, "R"],
  [8208, 8231, "ON"],
  [8232, 8232, "WS"],
  [8233, 8233, "B"],
  [8234, 8238, "BN"],
  [8239, 8239, "CS"],
  [8240, 8244, "ET"],
  [8245, 8259, "ON"],
  [8260, 8260, "CS"],
  [8261, 8286, "ON"],
  [8287, 8287, "WS"],
  [8288, 8303, "BN"],
  [8304, 8304, "EN"],
  [8308, 8313, "EN"],
  [8314, 8315, "ES"],
  [8316, 8318, "ON"],
  [8320, 8329, "EN"],
  [8330, 8331, "ES"],
  [8332, 8334, "ON"],
  [8352, 8399, "ET"],
  [8400, 8432, "NSM"],
  [8448, 8449, "ON"],
  [8451, 8454, "ON"],
  [8456, 8457, "ON"],
  [8468, 8468, "ON"],
  [8470, 8472, "ON"],
  [8478, 8483, "ON"],
  [8485, 8485, "ON"],
  [8487, 8487, "ON"],
  [8489, 8489, "ON"],
  [8494, 8494, "ET"],
  [8506, 8507, "ON"],
  [8512, 8516, "ON"],
  [8522, 8525, "ON"],
  [8528, 8543, "ON"],
  [8585, 8587, "ON"],
  [8592, 8721, "ON"],
  [8722, 8722, "ES"],
  [8723, 8723, "ET"],
  [8724, 9013, "ON"],
  [9083, 9108, "ON"],
  [9110, 9257, "ON"],
  [9280, 9290, "ON"],
  [9312, 9351, "ON"],
  [9352, 9371, "EN"],
  [9450, 9899, "ON"],
  [9901, 10239, "ON"],
  [10496, 11123, "ON"],
  [11126, 11263, "ON"],
  [11493, 11498, "ON"],
  [11503, 11505, "NSM"],
  [11513, 11519, "ON"],
  [11647, 11647, "NSM"],
  [11744, 11775, "NSM"],
  [11776, 11869, "ON"],
  [11904, 11929, "ON"],
  [11931, 12019, "ON"],
  [12032, 12245, "ON"],
  [12272, 12287, "ON"],
  [12288, 12288, "WS"],
  [12289, 12292, "ON"],
  [12296, 12320, "ON"],
  [12330, 12333, "NSM"],
  [12336, 12336, "ON"],
  [12342, 12343, "ON"],
  [12349, 12351, "ON"],
  [12441, 12442, "NSM"],
  [12443, 12444, "ON"],
  [12448, 12448, "ON"],
  [12539, 12539, "ON"],
  [12736, 12773, "ON"],
  [12783, 12783, "ON"],
  [12829, 12830, "ON"],
  [12880, 12895, "ON"],
  [12924, 12926, "ON"],
  [12977, 12991, "ON"],
  [13004, 13007, "ON"],
  [13175, 13178, "ON"],
  [13278, 13279, "ON"],
  [13311, 13311, "ON"],
  [19904, 19967, "ON"],
  [42128, 42182, "ON"],
  [42509, 42511, "ON"],
  [42607, 42610, "NSM"],
  [42611, 42611, "ON"],
  [42612, 42621, "NSM"],
  [42622, 42623, "ON"],
  [42654, 42655, "NSM"],
  [42736, 42737, "NSM"],
  [42752, 42785, "ON"],
  [42888, 42888, "ON"],
  [43010, 43010, "NSM"],
  [43014, 43014, "NSM"],
  [43019, 43019, "NSM"],
  [43045, 43046, "NSM"],
  [43048, 43051, "ON"],
  [43052, 43052, "NSM"],
  [43064, 43065, "ET"],
  [43124, 43127, "ON"],
  [43204, 43205, "NSM"],
  [43232, 43249, "NSM"],
  [43263, 43263, "NSM"],
  [43302, 43309, "NSM"],
  [43335, 43345, "NSM"],
  [43392, 43394, "NSM"],
  [43443, 43443, "NSM"],
  [43446, 43449, "NSM"],
  [43452, 43453, "NSM"],
  [43493, 43493, "NSM"],
  [43561, 43566, "NSM"],
  [43569, 43570, "NSM"],
  [43573, 43574, "NSM"],
  [43587, 43587, "NSM"],
  [43596, 43596, "NSM"],
  [43644, 43644, "NSM"],
  [43696, 43696, "NSM"],
  [43698, 43700, "NSM"],
  [43703, 43704, "NSM"],
  [43710, 43711, "NSM"],
  [43713, 43713, "NSM"],
  [43756, 43757, "NSM"],
  [43766, 43766, "NSM"],
  [43882, 43883, "ON"],
  [44005, 44005, "NSM"],
  [44008, 44008, "NSM"],
  [44013, 44013, "NSM"],
  [64285, 64285, "R"],
  [64286, 64286, "NSM"],
  [64287, 64296, "R"],
  [64297, 64297, "ES"],
  [64298, 64335, "R"],
  [64336, 64450, "AL"],
  [64451, 64466, "ON"],
  [64467, 64829, "AL"],
  [64830, 64847, "ON"],
  [64848, 64911, "AL"],
  [64912, 64913, "ON"],
  [64914, 64967, "AL"],
  [64968, 64975, "ON"],
  [64976, 65007, "BN"],
  [65008, 65020, "AL"],
  [65021, 65023, "ON"],
  [65024, 65039, "NSM"],
  [65040, 65049, "ON"],
  [65056, 65071, "NSM"],
  [65072, 65103, "ON"],
  [65104, 65104, "CS"],
  [65105, 65105, "ON"],
  [65106, 65106, "CS"],
  [65108, 65108, "ON"],
  [65109, 65109, "CS"],
  [65110, 65118, "ON"],
  [65119, 65119, "ET"],
  [65120, 65121, "ON"],
  [65122, 65123, "ES"],
  [65124, 65126, "ON"],
  [65128, 65128, "ON"],
  [65129, 65130, "ET"],
  [65131, 65131, "ON"],
  [65136, 65278, "AL"],
  [65279, 65279, "BN"],
  [65281, 65282, "ON"],
  [65283, 65285, "ET"],
  [65286, 65290, "ON"],
  [65291, 65291, "ES"],
  [65292, 65292, "CS"],
  [65293, 65293, "ES"],
  [65294, 65295, "CS"],
  [65296, 65305, "EN"],
  [65306, 65306, "CS"],
  [65307, 65312, "ON"],
  [65339, 65344, "ON"],
  [65371, 65381, "ON"],
  [65504, 65505, "ET"],
  [65506, 65508, "ON"],
  [65509, 65510, "ET"],
  [65512, 65518, "ON"],
  [65520, 65528, "BN"],
  [65529, 65533, "ON"],
  [65534, 65535, "BN"],
  [65793, 65793, "ON"],
  [65856, 65932, "ON"],
  [65936, 65948, "ON"],
  [65952, 65952, "ON"],
  [66045, 66045, "NSM"],
  [66272, 66272, "NSM"],
  [66273, 66299, "EN"],
  [66422, 66426, "NSM"],
  [67584, 67870, "R"],
  [67871, 67871, "ON"],
  [67872, 68096, "R"],
  [68097, 68099, "NSM"],
  [68100, 68100, "R"],
  [68101, 68102, "NSM"],
  [68103, 68107, "R"],
  [68108, 68111, "NSM"],
  [68112, 68151, "R"],
  [68152, 68154, "NSM"],
  [68155, 68158, "R"],
  [68159, 68159, "NSM"],
  [68160, 68324, "R"],
  [68325, 68326, "NSM"],
  [68327, 68408, "R"],
  [68409, 68415, "ON"],
  [68416, 68863, "R"],
  [68864, 68899, "AL"],
  [68900, 68903, "NSM"],
  [68904, 68911, "AL"],
  [68912, 68921, "AN"],
  [68922, 68927, "AL"],
  [68928, 68937, "AN"],
  [68938, 68968, "R"],
  [68969, 68973, "NSM"],
  [68974, 68974, "ON"],
  [68975, 69215, "R"],
  [69216, 69246, "AN"],
  [69247, 69290, "R"],
  [69291, 69292, "NSM"],
  [69293, 69311, "R"],
  [69312, 69327, "AL"],
  [69328, 69336, "ON"],
  [69337, 69369, "AL"],
  [69370, 69375, "NSM"],
  [69376, 69423, "R"],
  [69424, 69445, "AL"],
  [69446, 69456, "NSM"],
  [69457, 69487, "AL"],
  [69488, 69505, "R"],
  [69506, 69509, "NSM"],
  [69510, 69631, "R"],
  [69633, 69633, "NSM"],
  [69688, 69702, "NSM"],
  [69714, 69733, "ON"],
  [69744, 69744, "NSM"],
  [69747, 69748, "NSM"],
  [69759, 69761, "NSM"],
  [69811, 69814, "NSM"],
  [69817, 69818, "NSM"],
  [69826, 69826, "NSM"],
  [69888, 69890, "NSM"],
  [69927, 69931, "NSM"],
  [69933, 69940, "NSM"],
  [70003, 70003, "NSM"],
  [70016, 70017, "NSM"],
  [70070, 70078, "NSM"],
  [70089, 70092, "NSM"],
  [70095, 70095, "NSM"],
  [70191, 70193, "NSM"],
  [70196, 70196, "NSM"],
  [70198, 70199, "NSM"],
  [70206, 70206, "NSM"],
  [70209, 70209, "NSM"],
  [70367, 70367, "NSM"],
  [70371, 70378, "NSM"],
  [70400, 70401, "NSM"],
  [70459, 70460, "NSM"],
  [70464, 70464, "NSM"],
  [70502, 70508, "NSM"],
  [70512, 70516, "NSM"],
  [70587, 70592, "NSM"],
  [70606, 70606, "NSM"],
  [70608, 70608, "NSM"],
  [70610, 70610, "NSM"],
  [70625, 70626, "NSM"],
  [70712, 70719, "NSM"],
  [70722, 70724, "NSM"],
  [70726, 70726, "NSM"],
  [70750, 70750, "NSM"],
  [70835, 70840, "NSM"],
  [70842, 70842, "NSM"],
  [70847, 70848, "NSM"],
  [70850, 70851, "NSM"],
  [71090, 71093, "NSM"],
  [71100, 71101, "NSM"],
  [71103, 71104, "NSM"],
  [71132, 71133, "NSM"],
  [71219, 71226, "NSM"],
  [71229, 71229, "NSM"],
  [71231, 71232, "NSM"],
  [71264, 71276, "ON"],
  [71339, 71339, "NSM"],
  [71341, 71341, "NSM"],
  [71344, 71349, "NSM"],
  [71351, 71351, "NSM"],
  [71453, 71453, "NSM"],
  [71455, 71455, "NSM"],
  [71458, 71461, "NSM"],
  [71463, 71467, "NSM"],
  [71727, 71735, "NSM"],
  [71737, 71738, "NSM"],
  [71995, 71996, "NSM"],
  [71998, 71998, "NSM"],
  [72003, 72003, "NSM"],
  [72148, 72151, "NSM"],
  [72154, 72155, "NSM"],
  [72160, 72160, "NSM"],
  [72193, 72198, "NSM"],
  [72201, 72202, "NSM"],
  [72243, 72248, "NSM"],
  [72251, 72254, "NSM"],
  [72263, 72263, "NSM"],
  [72273, 72278, "NSM"],
  [72281, 72283, "NSM"],
  [72330, 72342, "NSM"],
  [72344, 72345, "NSM"],
  [72544, 72544, "NSM"],
  [72546, 72548, "NSM"],
  [72550, 72550, "NSM"],
  [72752, 72758, "NSM"],
  [72760, 72765, "NSM"],
  [72850, 72871, "NSM"],
  [72874, 72880, "NSM"],
  [72882, 72883, "NSM"],
  [72885, 72886, "NSM"],
  [73009, 73014, "NSM"],
  [73018, 73018, "NSM"],
  [73020, 73021, "NSM"],
  [73023, 73029, "NSM"],
  [73031, 73031, "NSM"],
  [73104, 73105, "NSM"],
  [73109, 73109, "NSM"],
  [73111, 73111, "NSM"],
  [73459, 73460, "NSM"],
  [73472, 73473, "NSM"],
  [73526, 73530, "NSM"],
  [73536, 73536, "NSM"],
  [73538, 73538, "NSM"],
  [73562, 73562, "NSM"],
  [73685, 73692, "ON"],
  [73693, 73696, "ET"],
  [73697, 73713, "ON"],
  [78912, 78912, "NSM"],
  [78919, 78933, "NSM"],
  [90398, 90409, "NSM"],
  [90413, 90415, "NSM"],
  [92912, 92916, "NSM"],
  [92976, 92982, "NSM"],
  [94031, 94031, "NSM"],
  [94095, 94098, "NSM"],
  [94178, 94178, "ON"],
  [94180, 94180, "NSM"],
  [113821, 113822, "NSM"],
  [113824, 113827, "BN"],
  [117760, 117973, "ON"],
  [118e3, 118009, "EN"],
  [118010, 118012, "ON"],
  [118016, 118451, "ON"],
  [118458, 118480, "ON"],
  [118496, 118512, "ON"],
  [118528, 118573, "NSM"],
  [118576, 118598, "NSM"],
  [119143, 119145, "NSM"],
  [119155, 119162, "BN"],
  [119163, 119170, "NSM"],
  [119173, 119179, "NSM"],
  [119210, 119213, "NSM"],
  [119273, 119274, "ON"],
  [119296, 119361, "ON"],
  [119362, 119364, "NSM"],
  [119365, 119365, "ON"],
  [119552, 119638, "ON"],
  [120513, 120513, "ON"],
  [120539, 120539, "ON"],
  [120571, 120571, "ON"],
  [120597, 120597, "ON"],
  [120629, 120629, "ON"],
  [120655, 120655, "ON"],
  [120687, 120687, "ON"],
  [120713, 120713, "ON"],
  [120745, 120745, "ON"],
  [120771, 120771, "ON"],
  [120782, 120831, "EN"],
  [121344, 121398, "NSM"],
  [121403, 121452, "NSM"],
  [121461, 121461, "NSM"],
  [121476, 121476, "NSM"],
  [121499, 121503, "NSM"],
  [121505, 121519, "NSM"],
  [122880, 122886, "NSM"],
  [122888, 122904, "NSM"],
  [122907, 122913, "NSM"],
  [122915, 122916, "NSM"],
  [122918, 122922, "NSM"],
  [123023, 123023, "NSM"],
  [123184, 123190, "NSM"],
  [123566, 123566, "NSM"],
  [123628, 123631, "NSM"],
  [123647, 123647, "ET"],
  [124140, 124143, "NSM"],
  [124398, 124399, "NSM"],
  [124643, 124643, "NSM"],
  [124646, 124646, "NSM"],
  [124654, 124655, "NSM"],
  [124661, 124661, "NSM"],
  [124928, 125135, "R"],
  [125136, 125142, "NSM"],
  [125143, 125251, "R"],
  [125252, 125258, "NSM"],
  [125259, 126063, "R"],
  [126064, 126143, "AL"],
  [126144, 126207, "R"],
  [126208, 126287, "AL"],
  [126288, 126463, "R"],
  [126464, 126703, "AL"],
  [126704, 126705, "ON"],
  [126706, 126719, "AL"],
  [126720, 126975, "R"],
  [126976, 127019, "ON"],
  [127024, 127123, "ON"],
  [127136, 127150, "ON"],
  [127153, 127167, "ON"],
  [127169, 127183, "ON"],
  [127185, 127221, "ON"],
  [127232, 127242, "EN"],
  [127243, 127247, "ON"],
  [127279, 127279, "ON"],
  [127338, 127343, "ON"],
  [127405, 127405, "ON"],
  [127584, 127589, "ON"],
  [127744, 128728, "ON"],
  [128732, 128748, "ON"],
  [128752, 128764, "ON"],
  [128768, 128985, "ON"],
  [128992, 129003, "ON"],
  [129008, 129008, "ON"],
  [129024, 129035, "ON"],
  [129040, 129095, "ON"],
  [129104, 129113, "ON"],
  [129120, 129159, "ON"],
  [129168, 129197, "ON"],
  [129200, 129211, "ON"],
  [129216, 129217, "ON"],
  [129232, 129240, "ON"],
  [129280, 129623, "ON"],
  [129632, 129645, "ON"],
  [129648, 129660, "ON"],
  [129664, 129674, "ON"],
  [129678, 129734, "ON"],
  [129736, 129736, "ON"],
  [129741, 129756, "ON"],
  [129759, 129770, "ON"],
  [129775, 129784, "ON"],
  [129792, 129938, "ON"],
  [129940, 130031, "ON"],
  [130032, 130041, "EN"],
  [130042, 130042, "ON"],
  [131070, 131071, "BN"],
  [196606, 196607, "BN"],
  [262142, 262143, "BN"],
  [327678, 327679, "BN"],
  [393214, 393215, "BN"],
  [458750, 458751, "BN"],
  [524286, 524287, "BN"],
  [589822, 589823, "BN"],
  [655358, 655359, "BN"],
  [720894, 720895, "BN"],
  [786430, 786431, "BN"],
  [851966, 851967, "BN"],
  [917502, 917759, "BN"],
  [917760, 917999, "NSM"],
  [918e3, 921599, "BN"],
  [983038, 983039, "BN"],
  [1048574, 1048575, "BN"],
  [1114110, 1114111, "BN"]
];

// ../../node_modules/.bun/@chenglou+pretext@0.0.5/node_modules/@chenglou/pretext/dist/bidi.js
function classifyCodePoint(codePoint) {
  if (codePoint <= 255)
    return latin1BidiTypes[codePoint];
  let lo = 0;
  let hi = nonLatin1BidiRanges.length - 1;
  while (lo <= hi) {
    const mid = lo + hi >> 1;
    const range = nonLatin1BidiRanges[mid];
    if (codePoint < range[0]) {
      hi = mid - 1;
      continue;
    }
    if (codePoint > range[1]) {
      lo = mid + 1;
      continue;
    }
    return range[2];
  }
  return "L";
}
function computeBidiLevels(str) {
  const len = str.length;
  if (len === 0)
    return null;
  const types = new Array(len);
  let sawBidi = false;
  for (let i = 0; i < len; ) {
    const first = str.charCodeAt(i);
    let codePoint = first;
    let codeUnitLength = 1;
    if (first >= 55296 && first <= 56319 && i + 1 < len) {
      const second = str.charCodeAt(i + 1);
      if (second >= 56320 && second <= 57343) {
        codePoint = (first - 55296 << 10) + (second - 56320) + 65536;
        codeUnitLength = 2;
      }
    }
    const t = classifyCodePoint(codePoint);
    if (t === "R" || t === "AL" || t === "AN")
      sawBidi = true;
    for (let j = 0; j < codeUnitLength; j++) {
      types[i + j] = t;
    }
    i += codeUnitLength;
  }
  if (!sawBidi)
    return null;
  let startLevel = 0;
  for (let i = 0; i < len; i++) {
    const t = types[i];
    if (t === "L") {
      startLevel = 0;
      break;
    }
    if (t === "R" || t === "AL") {
      startLevel = 1;
      break;
    }
  }
  const levels = new Int8Array(len);
  for (let i = 0; i < len; i++)
    levels[i] = startLevel;
  const e = startLevel & 1 ? "R" : "L";
  const sor = e;
  let lastType = sor;
  for (let i = 0; i < len; i++) {
    if (types[i] === "NSM")
      types[i] = lastType;
    else
      lastType = types[i];
  }
  lastType = sor;
  for (let i = 0; i < len; i++) {
    const t = types[i];
    if (t === "EN")
      types[i] = lastType === "AL" ? "AN" : "EN";
    else if (t === "R" || t === "L" || t === "AL")
      lastType = t;
  }
  for (let i = 0; i < len; i++) {
    if (types[i] === "AL")
      types[i] = "R";
  }
  for (let i = 1; i < len - 1; i++) {
    if (types[i] === "ES" && types[i - 1] === "EN" && types[i + 1] === "EN") {
      types[i] = "EN";
    }
    if (types[i] === "CS" && (types[i - 1] === "EN" || types[i - 1] === "AN") && types[i + 1] === types[i - 1]) {
      types[i] = types[i - 1];
    }
  }
  for (let i = 0; i < len; i++) {
    if (types[i] !== "EN")
      continue;
    let j;
    for (j = i - 1; j >= 0 && types[j] === "ET"; j--)
      types[j] = "EN";
    for (j = i + 1; j < len && types[j] === "ET"; j++)
      types[j] = "EN";
  }
  for (let i = 0; i < len; i++) {
    const t = types[i];
    if (t === "WS" || t === "ES" || t === "ET" || t === "CS")
      types[i] = "ON";
  }
  lastType = sor;
  for (let i = 0; i < len; i++) {
    const t = types[i];
    if (t === "EN")
      types[i] = lastType === "L" ? "L" : "EN";
    else if (t === "R" || t === "L")
      lastType = t;
  }
  for (let i = 0; i < len; i++) {
    if (types[i] !== "ON")
      continue;
    let end = i + 1;
    while (end < len && types[end] === "ON")
      end++;
    const before = i > 0 ? types[i - 1] : sor;
    const after = end < len ? types[end] : sor;
    const bDir = before !== "L" ? "R" : "L";
    const aDir = after !== "L" ? "R" : "L";
    if (bDir === aDir) {
      for (let j = i; j < end; j++)
        types[j] = bDir;
    }
    i = end - 1;
  }
  for (let i = 0; i < len; i++) {
    if (types[i] === "ON")
      types[i] = e;
  }
  for (let i = 0; i < len; i++) {
    const t = types[i];
    if ((levels[i] & 1) === 0) {
      if (t === "R")
        levels[i]++;
      else if (t === "AN" || t === "EN")
        levels[i] += 2;
    } else if (t === "L" || t === "AN" || t === "EN") {
      levels[i]++;
    }
  }
  return levels;
}
function computeSegmentLevels(normalized, segStarts) {
  const bidiLevels = computeBidiLevels(normalized);
  if (bidiLevels === null)
    return null;
  const segLevels = new Int8Array(segStarts.length);
  for (let i = 0; i < segStarts.length; i++) {
    segLevels[i] = bidiLevels[segStarts[i]];
  }
  return segLevels;
}

// ../../node_modules/.bun/@chenglou+pretext@0.0.5/node_modules/@chenglou/pretext/dist/analysis.js
var collapsibleWhitespaceRunRe = /[ \t\n\r\f]+/g;
var needsWhitespaceNormalizationRe = /[\t\n\r\f]| {2,}|^ | $/;
function getWhiteSpaceProfile(whiteSpace) {
  const mode = whiteSpace ?? "normal";
  return mode === "pre-wrap" ? { mode, preserveOrdinarySpaces: true, preserveHardBreaks: true } : { mode, preserveOrdinarySpaces: false, preserveHardBreaks: false };
}
function normalizeWhitespaceNormal(text) {
  if (!needsWhitespaceNormalizationRe.test(text))
    return text;
  let normalized = text.replace(collapsibleWhitespaceRunRe, " ");
  if (normalized.charCodeAt(0) === 32) {
    normalized = normalized.slice(1);
  }
  if (normalized.length > 0 && normalized.charCodeAt(normalized.length - 1) === 32) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}
function normalizeWhitespacePreWrap(text) {
  if (!/[\r\f]/.test(text))
    return text.replace(/\r\n/g, "\n");
  return text.replace(/\r\n/g, "\n").replace(/[\r\f]/g, "\n");
}
var sharedWordSegmenter = null;
var segmenterLocale;
function getSharedWordSegmenter() {
  if (sharedWordSegmenter === null) {
    sharedWordSegmenter = new Intl.Segmenter(segmenterLocale, { granularity: "word" });
  }
  return sharedWordSegmenter;
}
var arabicScriptRe = new RegExp("\\p{Script=Arabic}", "u");
var combiningMarkRe = new RegExp("\\p{M}", "u");
var decimalDigitRe = new RegExp("\\p{Nd}", "u");
function containsArabicScript(text) {
  return arabicScriptRe.test(text);
}
function isCJKCodePoint(codePoint) {
  return codePoint >= 19968 && codePoint <= 40959 || codePoint >= 13312 && codePoint <= 19903 || codePoint >= 131072 && codePoint <= 173791 || codePoint >= 173824 && codePoint <= 177983 || codePoint >= 177984 && codePoint <= 178207 || codePoint >= 178208 && codePoint <= 183983 || codePoint >= 183984 && codePoint <= 191471 || codePoint >= 191472 && codePoint <= 192093 || codePoint >= 194560 && codePoint <= 195103 || codePoint >= 196608 && codePoint <= 201551 || codePoint >= 201552 && codePoint <= 205743 || codePoint >= 205744 && codePoint <= 210041 || codePoint >= 63744 && codePoint <= 64255 || codePoint >= 12288 && codePoint <= 12351 || codePoint >= 12352 && codePoint <= 12447 || codePoint >= 12448 && codePoint <= 12543 || codePoint >= 44032 && codePoint <= 55215 || codePoint >= 65280 && codePoint <= 65519;
}
function isCJK(s) {
  for (let i = 0; i < s.length; i++) {
    const first = s.charCodeAt(i);
    if (first < 12288)
      continue;
    if (first >= 55296 && first <= 56319 && i + 1 < s.length) {
      const second = s.charCodeAt(i + 1);
      if (second >= 56320 && second <= 57343) {
        const codePoint = (first - 55296 << 10) + (second - 56320) + 65536;
        if (isCJKCodePoint(codePoint))
          return true;
        i++;
        continue;
      }
    }
    if (isCJKCodePoint(first))
      return true;
  }
  return false;
}
function endsWithLineStartProhibitedText(text) {
  const last = getLastCodePoint(text);
  return last !== null && (kinsokuStart.has(last) || leftStickyPunctuation.has(last));
}
var keepAllGlueChars = /* @__PURE__ */ new Set([
  "\xA0",
  "\u202F",
  "\u2060",
  "\uFEFF"
]);
function containsCJKText(text) {
  return isCJK(text);
}
function endsWithKeepAllGlueText(text) {
  const last = getLastCodePoint(text);
  return last !== null && keepAllGlueChars.has(last);
}
function canContinueKeepAllTextRun(previousText) {
  return !endsWithLineStartProhibitedText(previousText) && !endsWithKeepAllGlueText(previousText);
}
var kinsokuStart = /* @__PURE__ */ new Set([
  "\uFF0C",
  "\uFF0E",
  "\uFF01",
  "\uFF1A",
  "\uFF1B",
  "\uFF1F",
  "\u3001",
  "\u3002",
  "\u30FB",
  "\uFF09",
  "\u3015",
  "\u3009",
  "\u300B",
  "\u300D",
  "\u300F",
  "\u3011",
  "\u3017",
  "\u3019",
  "\u301B",
  "\u30FC",
  "\u3005",
  "\u303B",
  "\u309D",
  "\u309E",
  "\u30FD",
  "\u30FE"
]);
var kinsokuEnd = /* @__PURE__ */ new Set([
  '"',
  "(",
  "[",
  "{",
  "\u201C",
  "\u2018",
  "\xAB",
  "\u2039",
  "\uFF08",
  "\u3014",
  "\u3008",
  "\u300A",
  "\u300C",
  "\u300E",
  "\u3010",
  "\u3016",
  "\u3018",
  "\u301A"
]);
var forwardStickyGlue = /* @__PURE__ */ new Set([
  "'",
  "\u2019"
]);
var leftStickyPunctuation = /* @__PURE__ */ new Set([
  ".",
  ",",
  "!",
  "?",
  ":",
  ";",
  "\u060C",
  "\u061B",
  "\u061F",
  "\u0964",
  "\u0965",
  "\u104A",
  "\u104B",
  "\u104C",
  "\u104D",
  "\u104F",
  ")",
  "]",
  "}",
  "%",
  '"',
  "\u201D",
  "\u2019",
  "\xBB",
  "\u203A",
  "\u2026"
]);
var arabicNoSpaceTrailingPunctuation = /* @__PURE__ */ new Set([
  ":",
  ".",
  "\u060C",
  "\u061B"
]);
var myanmarMedialGlue = /* @__PURE__ */ new Set([
  "\u104F"
]);
var closingQuoteChars = /* @__PURE__ */ new Set([
  "\u201D",
  "\u2019",
  "\xBB",
  "\u203A",
  "\u300D",
  "\u300F",
  "\u3011",
  "\u300B",
  "\u3009",
  "\u3015",
  "\uFF09"
]);
function isLeftStickyPunctuationSegment(segment) {
  if (isEscapedQuoteClusterSegment(segment))
    return true;
  let sawPunctuation = false;
  for (const ch of segment) {
    if (leftStickyPunctuation.has(ch)) {
      sawPunctuation = true;
      continue;
    }
    if (sawPunctuation && combiningMarkRe.test(ch))
      continue;
    return false;
  }
  return sawPunctuation;
}
function isCJKLineStartProhibitedSegment(segment) {
  for (const ch of segment) {
    if (!kinsokuStart.has(ch) && !leftStickyPunctuation.has(ch))
      return false;
  }
  return segment.length > 0;
}
function isForwardStickyClusterSegment(segment) {
  if (isEscapedQuoteClusterSegment(segment))
    return true;
  for (const ch of segment) {
    if (!kinsokuEnd.has(ch) && !forwardStickyGlue.has(ch) && !combiningMarkRe.test(ch))
      return false;
  }
  return segment.length > 0;
}
function isEscapedQuoteClusterSegment(segment) {
  let sawQuote = false;
  for (const ch of segment) {
    if (ch === "\\" || combiningMarkRe.test(ch))
      continue;
    if (kinsokuEnd.has(ch) || leftStickyPunctuation.has(ch) || forwardStickyGlue.has(ch)) {
      sawQuote = true;
      continue;
    }
    return false;
  }
  return sawQuote;
}
function previousCodePointStart(text, end) {
  const last = end - 1;
  if (last <= 0)
    return Math.max(last, 0);
  const lastCodeUnit = text.charCodeAt(last);
  if (lastCodeUnit < 56320 || lastCodeUnit > 57343)
    return last;
  const maybeHigh = last - 1;
  if (maybeHigh < 0)
    return last;
  const highCodeUnit = text.charCodeAt(maybeHigh);
  return highCodeUnit >= 55296 && highCodeUnit <= 56319 ? maybeHigh : last;
}
function getLastCodePoint(text) {
  if (text.length === 0)
    return null;
  const start = previousCodePointStart(text, text.length);
  return text.slice(start);
}
function splitTrailingForwardStickyCluster(text) {
  const chars = Array.from(text);
  let splitIndex = chars.length;
  while (splitIndex > 0) {
    const ch = chars[splitIndex - 1];
    if (combiningMarkRe.test(ch)) {
      splitIndex--;
      continue;
    }
    if (kinsokuEnd.has(ch) || forwardStickyGlue.has(ch)) {
      splitIndex--;
      continue;
    }
    break;
  }
  if (splitIndex <= 0 || splitIndex === chars.length)
    return null;
  return {
    head: chars.slice(0, splitIndex).join(""),
    tail: chars.slice(splitIndex).join("")
  };
}
function getRepeatableSingleCharRunChar(text, isWordLike, kind) {
  return kind === "text" && !isWordLike && text.length === 1 && text !== "-" && text !== "\u2014" ? text : null;
}
function materializeDeferredSingleCharRun(texts, chars, lengths, index) {
  const ch = chars[index];
  const text = texts[index];
  if (ch == null)
    return text;
  const length = lengths[index];
  if (text.length === length)
    return text;
  const materialized = ch.repeat(length);
  texts[index] = materialized;
  return materialized;
}
function hasArabicNoSpacePunctuation(containsArabic, lastCodePoint) {
  return containsArabic && lastCodePoint !== null && arabicNoSpaceTrailingPunctuation.has(lastCodePoint);
}
function endsWithMyanmarMedialGlue(segment) {
  const lastCodePoint = getLastCodePoint(segment);
  return lastCodePoint !== null && myanmarMedialGlue.has(lastCodePoint);
}
function splitLeadingSpaceAndMarks(segment) {
  if (segment.length < 2 || segment[0] !== " ")
    return null;
  const marks = segment.slice(1);
  if (new RegExp("^\\p{M}+$", "u").test(marks)) {
    return { space: " ", marks };
  }
  return null;
}
function endsWithClosingQuote(text) {
  let end = text.length;
  while (end > 0) {
    const start = previousCodePointStart(text, end);
    const ch = text.slice(start, end);
    if (closingQuoteChars.has(ch))
      return true;
    if (!leftStickyPunctuation.has(ch))
      return false;
    end = start;
  }
  return false;
}
function classifySegmentBreakChar(ch, whiteSpaceProfile) {
  if (whiteSpaceProfile.preserveOrdinarySpaces || whiteSpaceProfile.preserveHardBreaks) {
    if (ch === " ")
      return "preserved-space";
    if (ch === "	")
      return "tab";
    if (whiteSpaceProfile.preserveHardBreaks && ch === "\n")
      return "hard-break";
  }
  if (ch === " ")
    return "space";
  if (ch === "\xA0" || ch === "\u202F" || ch === "\u2060" || ch === "\uFEFF") {
    return "glue";
  }
  if (ch === "\u200B")
    return "zero-width-break";
  if (ch === "\xAD")
    return "soft-hyphen";
  return "text";
}
var breakCharRe = /[\x20\t\n\xA0\xAD\u200B\u202F\u2060\uFEFF]/;
function joinTextParts(parts) {
  return parts.length === 1 ? parts[0] : parts.join("");
}
function joinReversedPrefixParts(prefixParts, tail) {
  const parts = [];
  for (let i = prefixParts.length - 1; i >= 0; i--) {
    parts.push(prefixParts[i]);
  }
  parts.push(tail);
  return joinTextParts(parts);
}
function splitSegmentByBreakKind(segment, isWordLike, start, whiteSpaceProfile) {
  if (!breakCharRe.test(segment)) {
    return [{ text: segment, isWordLike, kind: "text", start }];
  }
  const pieces = [];
  let currentKind = null;
  let currentTextParts = [];
  let currentStart = start;
  let currentWordLike = false;
  let offset2 = 0;
  for (const ch of segment) {
    const kind = classifySegmentBreakChar(ch, whiteSpaceProfile);
    const wordLike = kind === "text" && isWordLike;
    if (currentKind !== null && kind === currentKind && wordLike === currentWordLike) {
      currentTextParts.push(ch);
      offset2 += ch.length;
      continue;
    }
    if (currentKind !== null) {
      pieces.push({
        text: joinTextParts(currentTextParts),
        isWordLike: currentWordLike,
        kind: currentKind,
        start: currentStart
      });
    }
    currentKind = kind;
    currentTextParts = [ch];
    currentStart = start + offset2;
    currentWordLike = wordLike;
    offset2 += ch.length;
  }
  if (currentKind !== null) {
    pieces.push({
      text: joinTextParts(currentTextParts),
      isWordLike: currentWordLike,
      kind: currentKind,
      start: currentStart
    });
  }
  return pieces;
}
function isTextRunBoundary(kind) {
  return kind === "space" || kind === "preserved-space" || kind === "zero-width-break" || kind === "hard-break";
}
var urlSchemeSegmentRe = /^[A-Za-z][A-Za-z0-9+.-]*:$/;
function isUrlLikeRunStart(segmentation, index) {
  const text = segmentation.texts[index];
  if (text.startsWith("www."))
    return true;
  return urlSchemeSegmentRe.test(text) && index + 1 < segmentation.len && segmentation.kinds[index + 1] === "text" && segmentation.texts[index + 1] === "//";
}
function isUrlQueryBoundarySegment(text) {
  return text.includes("?") && (text.includes("://") || text.startsWith("www."));
}
function mergeUrlLikeRuns(segmentation) {
  const texts = segmentation.texts.slice();
  const isWordLike = segmentation.isWordLike.slice();
  const kinds = segmentation.kinds.slice();
  const starts = segmentation.starts.slice();
  for (let i = 0; i < segmentation.len; i++) {
    if (kinds[i] !== "text" || !isUrlLikeRunStart(segmentation, i))
      continue;
    const mergedParts = [texts[i]];
    let j = i + 1;
    while (j < segmentation.len && !isTextRunBoundary(kinds[j])) {
      mergedParts.push(texts[j]);
      isWordLike[i] = true;
      const endsQueryPrefix = texts[j].includes("?");
      kinds[j] = "text";
      texts[j] = "";
      j++;
      if (endsQueryPrefix)
        break;
    }
    texts[i] = joinTextParts(mergedParts);
  }
  let compactLen = 0;
  for (let read = 0; read < texts.length; read++) {
    const text = texts[read];
    if (text.length === 0)
      continue;
    if (compactLen !== read) {
      texts[compactLen] = text;
      isWordLike[compactLen] = isWordLike[read];
      kinds[compactLen] = kinds[read];
      starts[compactLen] = starts[read];
    }
    compactLen++;
  }
  texts.length = compactLen;
  isWordLike.length = compactLen;
  kinds.length = compactLen;
  starts.length = compactLen;
  return {
    len: compactLen,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function mergeUrlQueryRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0; i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    texts.push(text);
    isWordLike.push(segmentation.isWordLike[i]);
    kinds.push(segmentation.kinds[i]);
    starts.push(segmentation.starts[i]);
    if (!isUrlQueryBoundarySegment(text))
      continue;
    const nextIndex = i + 1;
    if (nextIndex >= segmentation.len || isTextRunBoundary(segmentation.kinds[nextIndex])) {
      continue;
    }
    const queryParts = [];
    const queryStart = segmentation.starts[nextIndex];
    let j = nextIndex;
    while (j < segmentation.len && !isTextRunBoundary(segmentation.kinds[j])) {
      queryParts.push(segmentation.texts[j]);
      j++;
    }
    if (queryParts.length > 0) {
      texts.push(joinTextParts(queryParts));
      isWordLike.push(true);
      kinds.push("text");
      starts.push(queryStart);
      i = j - 1;
    }
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
var numericJoinerChars = /* @__PURE__ */ new Set([
  ":",
  "-",
  "/",
  "\xD7",
  ",",
  ".",
  "+",
  "\u2013",
  "\u2014"
]);
var asciiPunctuationChainSegmentRe = /^[A-Za-z0-9_]+[,:;]*$/;
var asciiPunctuationChainTrailingJoinersRe = /[,:;]+$/;
function segmentContainsDecimalDigit(text) {
  for (const ch of text) {
    if (decimalDigitRe.test(ch))
      return true;
  }
  return false;
}
function isNumericRunSegment(text) {
  if (text.length === 0)
    return false;
  for (const ch of text) {
    if (decimalDigitRe.test(ch) || numericJoinerChars.has(ch))
      continue;
    return false;
  }
  return true;
}
function mergeNumericRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0; i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    const kind = segmentation.kinds[i];
    if (kind === "text" && isNumericRunSegment(text) && segmentContainsDecimalDigit(text)) {
      const mergedParts = [text];
      let j = i + 1;
      while (j < segmentation.len && segmentation.kinds[j] === "text" && isNumericRunSegment(segmentation.texts[j])) {
        mergedParts.push(segmentation.texts[j]);
        j++;
      }
      texts.push(joinTextParts(mergedParts));
      isWordLike.push(true);
      kinds.push("text");
      starts.push(segmentation.starts[i]);
      i = j - 1;
      continue;
    }
    texts.push(text);
    isWordLike.push(segmentation.isWordLike[i]);
    kinds.push(kind);
    starts.push(segmentation.starts[i]);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function mergeAsciiPunctuationChains(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0; i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    const kind = segmentation.kinds[i];
    const wordLike = segmentation.isWordLike[i];
    if (kind === "text" && wordLike && asciiPunctuationChainSegmentRe.test(text)) {
      const mergedParts = [text];
      let endsWithJoiners = asciiPunctuationChainTrailingJoinersRe.test(text);
      let j = i + 1;
      while (endsWithJoiners && j < segmentation.len && segmentation.kinds[j] === "text" && segmentation.isWordLike[j] && asciiPunctuationChainSegmentRe.test(segmentation.texts[j])) {
        const nextText = segmentation.texts[j];
        mergedParts.push(nextText);
        endsWithJoiners = asciiPunctuationChainTrailingJoinersRe.test(nextText);
        j++;
      }
      texts.push(joinTextParts(mergedParts));
      isWordLike.push(true);
      kinds.push("text");
      starts.push(segmentation.starts[i]);
      i = j - 1;
      continue;
    }
    texts.push(text);
    isWordLike.push(wordLike);
    kinds.push(kind);
    starts.push(segmentation.starts[i]);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function splitHyphenatedNumericRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  for (let i = 0; i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    if (segmentation.kinds[i] === "text" && text.includes("-")) {
      const parts = text.split("-");
      let shouldSplit = parts.length > 1;
      for (let j = 0; j < parts.length; j++) {
        const part = parts[j];
        if (!shouldSplit)
          break;
        if (part.length === 0 || !segmentContainsDecimalDigit(part) || !isNumericRunSegment(part)) {
          shouldSplit = false;
        }
      }
      if (shouldSplit) {
        let offset2 = 0;
        for (let j = 0; j < parts.length; j++) {
          const part = parts[j];
          const splitText = j < parts.length - 1 ? `${part}-` : part;
          texts.push(splitText);
          isWordLike.push(true);
          kinds.push("text");
          starts.push(segmentation.starts[i] + offset2);
          offset2 += splitText.length;
        }
        continue;
      }
    }
    texts.push(text);
    isWordLike.push(segmentation.isWordLike[i]);
    kinds.push(segmentation.kinds[i]);
    starts.push(segmentation.starts[i]);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function mergeGlueConnectedTextRuns(segmentation) {
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  let read = 0;
  while (read < segmentation.len) {
    const textParts = [segmentation.texts[read]];
    let wordLike = segmentation.isWordLike[read];
    let kind = segmentation.kinds[read];
    let start = segmentation.starts[read];
    if (kind === "glue") {
      const glueParts = [textParts[0]];
      const glueStart = start;
      read++;
      while (read < segmentation.len && segmentation.kinds[read] === "glue") {
        glueParts.push(segmentation.texts[read]);
        read++;
      }
      const glueText = joinTextParts(glueParts);
      if (read < segmentation.len && segmentation.kinds[read] === "text") {
        textParts[0] = glueText;
        textParts.push(segmentation.texts[read]);
        wordLike = segmentation.isWordLike[read];
        kind = "text";
        start = glueStart;
        read++;
      } else {
        texts.push(glueText);
        isWordLike.push(false);
        kinds.push("glue");
        starts.push(glueStart);
        continue;
      }
    } else {
      read++;
    }
    if (kind === "text") {
      while (read < segmentation.len && segmentation.kinds[read] === "glue") {
        const glueParts = [];
        while (read < segmentation.len && segmentation.kinds[read] === "glue") {
          glueParts.push(segmentation.texts[read]);
          read++;
        }
        const glueText = joinTextParts(glueParts);
        if (read < segmentation.len && segmentation.kinds[read] === "text") {
          textParts.push(glueText, segmentation.texts[read]);
          wordLike = wordLike || segmentation.isWordLike[read];
          read++;
          continue;
        }
        textParts.push(glueText);
      }
    }
    texts.push(joinTextParts(textParts));
    isWordLike.push(wordLike);
    kinds.push(kind);
    starts.push(start);
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function carryTrailingForwardStickyAcrossCJKBoundary(segmentation) {
  const texts = segmentation.texts.slice();
  const isWordLike = segmentation.isWordLike.slice();
  const kinds = segmentation.kinds.slice();
  const starts = segmentation.starts.slice();
  for (let i = 0; i < texts.length - 1; i++) {
    if (kinds[i] !== "text" || kinds[i + 1] !== "text")
      continue;
    if (!isCJK(texts[i]) || !isCJK(texts[i + 1]))
      continue;
    const split = splitTrailingForwardStickyCluster(texts[i]);
    if (split === null)
      continue;
    texts[i] = split.head;
    texts[i + 1] = split.tail + texts[i + 1];
    starts[i + 1] = starts[i] + split.head.length;
  }
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function buildMergedSegmentation(normalized, profile, whiteSpaceProfile) {
  const wordSegmenter = getSharedWordSegmenter();
  let mergedLen = 0;
  const mergedTexts = [];
  const mergedTextParts = [];
  const mergedWordLike = [];
  const mergedKinds = [];
  const mergedStarts = [];
  const mergedSingleCharRunChars = [];
  const mergedSingleCharRunLengths = [];
  const mergedContainsCJK = [];
  const mergedContainsArabicScript = [];
  const mergedEndsWithClosingQuote = [];
  const mergedEndsWithMyanmarMedialGlue = [];
  const mergedHasArabicNoSpacePunctuation = [];
  for (const s of wordSegmenter.segment(normalized)) {
    for (const piece of splitSegmentByBreakKind(s.segment, s.isWordLike ?? false, s.index, whiteSpaceProfile)) {
      let appendPieceToPrevious2 = function() {
        if (mergedSingleCharRunChars[prevIndex] !== null) {
          mergedTextParts[prevIndex] = [
            materializeDeferredSingleCharRun(mergedTexts, mergedSingleCharRunChars, mergedSingleCharRunLengths, prevIndex)
          ];
          mergedSingleCharRunChars[prevIndex] = null;
        }
        mergedTextParts[prevIndex].push(piece.text);
        mergedWordLike[prevIndex] = mergedWordLike[prevIndex] || piece.isWordLike;
        mergedContainsCJK[prevIndex] = mergedContainsCJK[prevIndex] || pieceContainsCJK;
        mergedContainsArabicScript[prevIndex] = mergedContainsArabicScript[prevIndex] || pieceContainsArabicScript;
        mergedEndsWithClosingQuote[prevIndex] = pieceEndsWithClosingQuote;
        mergedEndsWithMyanmarMedialGlue[prevIndex] = pieceEndsWithMyanmarMedialGlue;
        mergedHasArabicNoSpacePunctuation[prevIndex] = hasArabicNoSpacePunctuation(mergedContainsArabicScript[prevIndex], pieceLastCodePoint);
      };
      var appendPieceToPrevious = appendPieceToPrevious2;
      const isText = piece.kind === "text";
      const repeatableSingleCharRunChar = getRepeatableSingleCharRunChar(piece.text, piece.isWordLike, piece.kind);
      const pieceContainsCJK = isCJK(piece.text);
      const pieceContainsArabicScript = containsArabicScript(piece.text);
      const pieceLastCodePoint = getLastCodePoint(piece.text);
      const pieceEndsWithClosingQuote = endsWithClosingQuote(piece.text);
      const pieceEndsWithMyanmarMedialGlue = endsWithMyanmarMedialGlue(piece.text);
      const prevIndex = mergedLen - 1;
      if (profile.carryCJKAfterClosingQuote && isText && mergedLen > 0 && mergedKinds[prevIndex] === "text" && pieceContainsCJK && mergedContainsCJK[prevIndex] && mergedEndsWithClosingQuote[prevIndex]) {
        appendPieceToPrevious2();
      } else if (isText && mergedLen > 0 && mergedKinds[prevIndex] === "text" && isCJKLineStartProhibitedSegment(piece.text) && mergedContainsCJK[prevIndex]) {
        appendPieceToPrevious2();
      } else if (isText && mergedLen > 0 && mergedKinds[prevIndex] === "text" && mergedEndsWithMyanmarMedialGlue[prevIndex]) {
        appendPieceToPrevious2();
      } else if (isText && mergedLen > 0 && mergedKinds[prevIndex] === "text" && piece.isWordLike && pieceContainsArabicScript && mergedHasArabicNoSpacePunctuation[prevIndex]) {
        appendPieceToPrevious2();
        mergedWordLike[prevIndex] = true;
      } else if (repeatableSingleCharRunChar !== null && mergedLen > 0 && mergedKinds[prevIndex] === "text" && mergedSingleCharRunChars[prevIndex] === repeatableSingleCharRunChar) {
        mergedSingleCharRunLengths[prevIndex] = (mergedSingleCharRunLengths[prevIndex] ?? 1) + 1;
      } else if (isText && !piece.isWordLike && mergedLen > 0 && mergedKinds[prevIndex] === "text" && (isLeftStickyPunctuationSegment(piece.text) || piece.text === "-" && mergedWordLike[prevIndex])) {
        appendPieceToPrevious2();
      } else {
        mergedTexts[mergedLen] = piece.text;
        mergedTextParts[mergedLen] = [piece.text];
        mergedWordLike[mergedLen] = piece.isWordLike;
        mergedKinds[mergedLen] = piece.kind;
        mergedStarts[mergedLen] = piece.start;
        mergedSingleCharRunChars[mergedLen] = repeatableSingleCharRunChar;
        mergedSingleCharRunLengths[mergedLen] = repeatableSingleCharRunChar === null ? 0 : 1;
        mergedContainsCJK[mergedLen] = pieceContainsCJK;
        mergedContainsArabicScript[mergedLen] = pieceContainsArabicScript;
        mergedEndsWithClosingQuote[mergedLen] = pieceEndsWithClosingQuote;
        mergedEndsWithMyanmarMedialGlue[mergedLen] = pieceEndsWithMyanmarMedialGlue;
        mergedHasArabicNoSpacePunctuation[mergedLen] = hasArabicNoSpacePunctuation(pieceContainsArabicScript, pieceLastCodePoint);
        mergedLen++;
      }
    }
  }
  for (let i = 0; i < mergedLen; i++) {
    if (mergedSingleCharRunChars[i] !== null) {
      mergedTexts[i] = materializeDeferredSingleCharRun(mergedTexts, mergedSingleCharRunChars, mergedSingleCharRunLengths, i);
      continue;
    }
    mergedTexts[i] = joinTextParts(mergedTextParts[i]);
  }
  for (let i = 1; i < mergedLen; i++) {
    if (mergedKinds[i] === "text" && !mergedWordLike[i] && isEscapedQuoteClusterSegment(mergedTexts[i]) && mergedKinds[i - 1] === "text") {
      mergedTexts[i - 1] += mergedTexts[i];
      mergedWordLike[i - 1] = mergedWordLike[i - 1] || mergedWordLike[i];
      mergedTexts[i] = "";
    }
  }
  const forwardStickyPrefixParts = Array.from({ length: mergedLen }, () => null);
  let nextLiveIndex = -1;
  for (let i = mergedLen - 1; i >= 0; i--) {
    const text = mergedTexts[i];
    if (text.length === 0)
      continue;
    if (mergedKinds[i] === "text" && !mergedWordLike[i] && isForwardStickyClusterSegment(text) && nextLiveIndex >= 0 && mergedKinds[nextLiveIndex] === "text") {
      const prefixParts = forwardStickyPrefixParts[nextLiveIndex] ?? [];
      prefixParts.push(text);
      forwardStickyPrefixParts[nextLiveIndex] = prefixParts;
      mergedStarts[nextLiveIndex] = mergedStarts[i];
      mergedTexts[i] = "";
      continue;
    }
    nextLiveIndex = i;
  }
  for (let i = 0; i < mergedLen; i++) {
    const prefixParts = forwardStickyPrefixParts[i];
    if (prefixParts == null)
      continue;
    mergedTexts[i] = joinReversedPrefixParts(prefixParts, mergedTexts[i]);
  }
  let compactLen = 0;
  for (let read = 0; read < mergedLen; read++) {
    const text = mergedTexts[read];
    if (text.length === 0)
      continue;
    if (compactLen !== read) {
      mergedTexts[compactLen] = text;
      mergedWordLike[compactLen] = mergedWordLike[read];
      mergedKinds[compactLen] = mergedKinds[read];
      mergedStarts[compactLen] = mergedStarts[read];
    }
    compactLen++;
  }
  mergedTexts.length = compactLen;
  mergedWordLike.length = compactLen;
  mergedKinds.length = compactLen;
  mergedStarts.length = compactLen;
  const compacted = mergeGlueConnectedTextRuns({
    len: compactLen,
    texts: mergedTexts,
    isWordLike: mergedWordLike,
    kinds: mergedKinds,
    starts: mergedStarts
  });
  const withMergedUrls = carryTrailingForwardStickyAcrossCJKBoundary(mergeAsciiPunctuationChains(splitHyphenatedNumericRuns(mergeNumericRuns(mergeUrlQueryRuns(mergeUrlLikeRuns(compacted))))));
  for (let i = 0; i < withMergedUrls.len - 1; i++) {
    const split = splitLeadingSpaceAndMarks(withMergedUrls.texts[i]);
    if (split === null)
      continue;
    if (withMergedUrls.kinds[i] !== "space" && withMergedUrls.kinds[i] !== "preserved-space" || withMergedUrls.kinds[i + 1] !== "text" || !containsArabicScript(withMergedUrls.texts[i + 1])) {
      continue;
    }
    withMergedUrls.texts[i] = split.space;
    withMergedUrls.isWordLike[i] = false;
    withMergedUrls.kinds[i] = withMergedUrls.kinds[i] === "preserved-space" ? "preserved-space" : "space";
    withMergedUrls.texts[i + 1] = split.marks + withMergedUrls.texts[i + 1];
    withMergedUrls.starts[i + 1] = withMergedUrls.starts[i] + split.space.length;
  }
  return withMergedUrls;
}
function compileAnalysisChunks(segmentation, whiteSpaceProfile) {
  if (segmentation.len === 0)
    return [];
  if (!whiteSpaceProfile.preserveHardBreaks) {
    return [{
      startSegmentIndex: 0,
      endSegmentIndex: segmentation.len,
      consumedEndSegmentIndex: segmentation.len
    }];
  }
  const chunks = [];
  let startSegmentIndex = 0;
  for (let i = 0; i < segmentation.len; i++) {
    if (segmentation.kinds[i] !== "hard-break")
      continue;
    chunks.push({
      startSegmentIndex,
      endSegmentIndex: i,
      consumedEndSegmentIndex: i + 1
    });
    startSegmentIndex = i + 1;
  }
  if (startSegmentIndex < segmentation.len) {
    chunks.push({
      startSegmentIndex,
      endSegmentIndex: segmentation.len,
      consumedEndSegmentIndex: segmentation.len
    });
  }
  return chunks;
}
function mergeKeepAllTextSegments(segmentation) {
  if (segmentation.len <= 1)
    return segmentation;
  const texts = [];
  const isWordLike = [];
  const kinds = [];
  const starts = [];
  let pendingTextParts = null;
  let pendingWordLike = false;
  let pendingStart = 0;
  let pendingContainsCJK = false;
  let pendingCanContinue = false;
  function flushPendingText() {
    if (pendingTextParts === null)
      return;
    texts.push(joinTextParts(pendingTextParts));
    isWordLike.push(pendingWordLike);
    kinds.push("text");
    starts.push(pendingStart);
    pendingTextParts = null;
  }
  for (let i = 0; i < segmentation.len; i++) {
    const text = segmentation.texts[i];
    const kind = segmentation.kinds[i];
    const wordLike = segmentation.isWordLike[i];
    const start = segmentation.starts[i];
    if (kind === "text") {
      const textContainsCJK = containsCJKText(text);
      const textCanContinue = canContinueKeepAllTextRun(text);
      if (pendingTextParts !== null && pendingContainsCJK && pendingCanContinue) {
        pendingTextParts.push(text);
        pendingWordLike = pendingWordLike || wordLike;
        pendingContainsCJK = pendingContainsCJK || textContainsCJK;
        pendingCanContinue = textCanContinue;
        continue;
      }
      flushPendingText();
      pendingTextParts = [text];
      pendingWordLike = wordLike;
      pendingStart = start;
      pendingContainsCJK = textContainsCJK;
      pendingCanContinue = textCanContinue;
      continue;
    }
    flushPendingText();
    texts.push(text);
    isWordLike.push(wordLike);
    kinds.push(kind);
    starts.push(start);
  }
  flushPendingText();
  return {
    len: texts.length,
    texts,
    isWordLike,
    kinds,
    starts
  };
}
function analyzeText(text, profile, whiteSpace = "normal", wordBreak = "normal") {
  const whiteSpaceProfile = getWhiteSpaceProfile(whiteSpace);
  const normalized = whiteSpaceProfile.mode === "pre-wrap" ? normalizeWhitespacePreWrap(text) : normalizeWhitespaceNormal(text);
  if (normalized.length === 0) {
    return {
      normalized,
      chunks: [],
      len: 0,
      texts: [],
      isWordLike: [],
      kinds: [],
      starts: []
    };
  }
  const segmentation = wordBreak === "keep-all" ? mergeKeepAllTextSegments(buildMergedSegmentation(normalized, profile, whiteSpaceProfile)) : buildMergedSegmentation(normalized, profile, whiteSpaceProfile);
  return {
    normalized,
    chunks: compileAnalysisChunks(segmentation, whiteSpaceProfile),
    ...segmentation
  };
}

// ../../node_modules/.bun/@chenglou+pretext@0.0.5/node_modules/@chenglou/pretext/dist/measurement.js
var measureContext = null;
var segmentMetricCaches = /* @__PURE__ */ new Map();
var cachedEngineProfile = null;
var MAX_PREFIX_FIT_GRAPHEMES = 96;
var emojiPresentationRe = new RegExp("\\p{Emoji_Presentation}", "u");
var maybeEmojiRe = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Regional_Indicator}\uFE0F\u20E3]/u;
var sharedGraphemeSegmenter = null;
var emojiCorrectionCache = /* @__PURE__ */ new Map();
function getMeasureContext() {
  if (measureContext !== null)
    return measureContext;
  if (typeof OffscreenCanvas !== "undefined") {
    measureContext = new OffscreenCanvas(1, 1).getContext("2d");
    return measureContext;
  }
  if (typeof document !== "undefined") {
    measureContext = document.createElement("canvas").getContext("2d");
    return measureContext;
  }
  throw new Error("Text measurement requires OffscreenCanvas or a DOM canvas context.");
}
function getSegmentMetricCache(font) {
  let cache2 = segmentMetricCaches.get(font);
  if (!cache2) {
    cache2 = /* @__PURE__ */ new Map();
    segmentMetricCaches.set(font, cache2);
  }
  return cache2;
}
function getSegmentMetrics(seg, cache2) {
  let metrics = cache2.get(seg);
  if (metrics === void 0) {
    const ctx = getMeasureContext();
    metrics = {
      width: ctx.measureText(seg).width,
      containsCJK: isCJK(seg)
    };
    cache2.set(seg, metrics);
  }
  return metrics;
}
function getEngineProfile() {
  if (cachedEngineProfile !== null)
    return cachedEngineProfile;
  if (typeof navigator === "undefined") {
    cachedEngineProfile = {
      lineFitEpsilon: 5e-3,
      carryCJKAfterClosingQuote: false,
      preferPrefixWidthsForBreakableRuns: false,
      preferEarlySoftHyphenBreak: false
    };
    return cachedEngineProfile;
  }
  const ua = navigator.userAgent;
  const vendor = navigator.vendor;
  const isSafari = vendor === "Apple Computer, Inc." && ua.includes("Safari/") && !ua.includes("Chrome/") && !ua.includes("Chromium/") && !ua.includes("CriOS/") && !ua.includes("FxiOS/") && !ua.includes("EdgiOS/");
  const isChromium = ua.includes("Chrome/") || ua.includes("Chromium/") || ua.includes("CriOS/") || ua.includes("Edg/");
  cachedEngineProfile = {
    lineFitEpsilon: isSafari ? 1 / 64 : 5e-3,
    carryCJKAfterClosingQuote: isChromium,
    preferPrefixWidthsForBreakableRuns: isSafari,
    preferEarlySoftHyphenBreak: isSafari
  };
  return cachedEngineProfile;
}
function parseFontSize(font) {
  const m = font.match(/(\d+(?:\.\d+)?)\s*px/);
  return m ? parseFloat(m[1]) : 16;
}
function getSharedGraphemeSegmenter() {
  if (sharedGraphemeSegmenter === null) {
    sharedGraphemeSegmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
  }
  return sharedGraphemeSegmenter;
}
function isEmojiGrapheme(g) {
  return emojiPresentationRe.test(g) || g.includes("\uFE0F");
}
function textMayContainEmoji(text) {
  return maybeEmojiRe.test(text);
}
function getEmojiCorrection(font, fontSize) {
  let correction = emojiCorrectionCache.get(font);
  if (correction !== void 0)
    return correction;
  const ctx = getMeasureContext();
  ctx.font = font;
  const canvasW = ctx.measureText("\u{1F600}").width;
  correction = 0;
  if (canvasW > fontSize + 0.5 && typeof document !== "undefined" && document.body !== null) {
    const span = document.createElement("span");
    span.style.font = font;
    span.style.display = "inline-block";
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.textContent = "\u{1F600}";
    document.body.appendChild(span);
    const domW = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    if (canvasW - domW > 0.5) {
      correction = canvasW - domW;
    }
  }
  emojiCorrectionCache.set(font, correction);
  return correction;
}
function countEmojiGraphemes(text) {
  let count = 0;
  const graphemeSegmenter = getSharedGraphemeSegmenter();
  for (const g of graphemeSegmenter.segment(text)) {
    if (isEmojiGrapheme(g.segment))
      count++;
  }
  return count;
}
function getEmojiCount(seg, metrics) {
  if (metrics.emojiCount === void 0) {
    metrics.emojiCount = countEmojiGraphemes(seg);
  }
  return metrics.emojiCount;
}
function getCorrectedSegmentWidth(seg, metrics, emojiCorrection) {
  if (emojiCorrection === 0)
    return metrics.width;
  return metrics.width - getEmojiCount(seg, metrics) * emojiCorrection;
}
function getSegmentBreakableFitAdvances(seg, metrics, cache2, emojiCorrection, mode) {
  if (metrics.breakableFitAdvances !== void 0)
    return metrics.breakableFitAdvances;
  const graphemeSegmenter = getSharedGraphemeSegmenter();
  const graphemes = [];
  for (const gs of graphemeSegmenter.segment(seg)) {
    graphemes.push(gs.segment);
  }
  if (graphemes.length <= 1) {
    metrics.breakableFitAdvances = null;
    return metrics.breakableFitAdvances;
  }
  if (mode === "sum-graphemes") {
    const advances2 = [];
    for (const grapheme of graphemes) {
      const graphemeMetrics = getSegmentMetrics(grapheme, cache2);
      advances2.push(getCorrectedSegmentWidth(grapheme, graphemeMetrics, emojiCorrection));
    }
    metrics.breakableFitAdvances = advances2;
    return metrics.breakableFitAdvances;
  }
  if (mode === "pair-context" || graphemes.length > MAX_PREFIX_FIT_GRAPHEMES) {
    const advances2 = [];
    let previousGrapheme = null;
    let previousWidth = 0;
    for (const grapheme of graphemes) {
      const graphemeMetrics = getSegmentMetrics(grapheme, cache2);
      const currentWidth = getCorrectedSegmentWidth(grapheme, graphemeMetrics, emojiCorrection);
      if (previousGrapheme === null) {
        advances2.push(currentWidth);
      } else {
        const pair = previousGrapheme + grapheme;
        const pairMetrics = getSegmentMetrics(pair, cache2);
        advances2.push(getCorrectedSegmentWidth(pair, pairMetrics, emojiCorrection) - previousWidth);
      }
      previousGrapheme = grapheme;
      previousWidth = currentWidth;
    }
    metrics.breakableFitAdvances = advances2;
    return metrics.breakableFitAdvances;
  }
  const advances = [];
  let prefix = "";
  let prefixWidth = 0;
  for (const grapheme of graphemes) {
    prefix += grapheme;
    const prefixMetrics = getSegmentMetrics(prefix, cache2);
    const nextPrefixWidth = getCorrectedSegmentWidth(prefix, prefixMetrics, emojiCorrection);
    advances.push(nextPrefixWidth - prefixWidth);
    prefixWidth = nextPrefixWidth;
  }
  metrics.breakableFitAdvances = advances;
  return metrics.breakableFitAdvances;
}
function getFontMeasurementState(font, needsEmojiCorrection) {
  const ctx = getMeasureContext();
  ctx.font = font;
  const cache2 = getSegmentMetricCache(font);
  const fontSize = parseFontSize(font);
  const emojiCorrection = needsEmojiCorrection ? getEmojiCorrection(font, fontSize) : 0;
  return { cache: cache2, fontSize, emojiCorrection };
}

// ../../node_modules/.bun/@chenglou+pretext@0.0.5/node_modules/@chenglou/pretext/dist/line-break.js
function normalizeSimpleLineStartSegmentIndex(prepared, segmentIndex) {
  while (segmentIndex < prepared.widths.length) {
    const kind = prepared.kinds[segmentIndex];
    if (kind !== "space" && kind !== "zero-width-break" && kind !== "soft-hyphen")
      break;
    segmentIndex++;
  }
  return segmentIndex;
}
function getTabAdvance(lineWidth, tabStopAdvance) {
  if (tabStopAdvance <= 0)
    return 0;
  const remainder = lineWidth % tabStopAdvance;
  if (Math.abs(remainder) <= 1e-6)
    return tabStopAdvance;
  return tabStopAdvance - remainder;
}
function fitSoftHyphenBreak(graphemeFitAdvances, initialWidth, maxWidth, lineFitEpsilon, discretionaryHyphenWidth) {
  let fitCount = 0;
  let fittedWidth = initialWidth;
  while (fitCount < graphemeFitAdvances.length) {
    const nextWidth = fittedWidth + graphemeFitAdvances[fitCount];
    const nextLineWidth = fitCount + 1 < graphemeFitAdvances.length ? nextWidth + discretionaryHyphenWidth : nextWidth;
    if (nextLineWidth > maxWidth + lineFitEpsilon)
      break;
    fittedWidth = nextWidth;
    fitCount++;
  }
  return { fitCount, fittedWidth };
}
function countPreparedLines(prepared, maxWidth) {
  if (prepared.simpleLineWalkFastPath) {
    return walkPreparedLinesSimple(prepared, maxWidth);
  }
  return walkPreparedLines(prepared, maxWidth);
}
function walkPreparedLinesSimple(prepared, maxWidth, onLine) {
  const { widths, kinds, breakableFitAdvances } = prepared;
  if (widths.length === 0)
    return 0;
  const engineProfile = getEngineProfile();
  const lineFitEpsilon = engineProfile.lineFitEpsilon;
  const fitLimit = maxWidth + lineFitEpsilon;
  let lineCount = 0;
  let lineW = 0;
  let hasContent = false;
  let lineStartSegmentIndex = 0;
  let lineStartGraphemeIndex = 0;
  let lineEndSegmentIndex = 0;
  let lineEndGraphemeIndex = 0;
  let pendingBreakSegmentIndex = -1;
  let pendingBreakPaintWidth = 0;
  function clearPendingBreak() {
    pendingBreakSegmentIndex = -1;
    pendingBreakPaintWidth = 0;
  }
  function emitCurrentLine(endSegmentIndex = lineEndSegmentIndex, endGraphemeIndex = lineEndGraphemeIndex, width = lineW) {
    lineCount++;
    onLine?.({
      startSegmentIndex: lineStartSegmentIndex,
      startGraphemeIndex: lineStartGraphemeIndex,
      endSegmentIndex,
      endGraphemeIndex,
      width
    });
    lineW = 0;
    hasContent = false;
    clearPendingBreak();
  }
  function startLineAtSegment(segmentIndex, width) {
    hasContent = true;
    lineStartSegmentIndex = segmentIndex;
    lineStartGraphemeIndex = 0;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
    lineW = width;
  }
  function startLineAtGrapheme(segmentIndex, graphemeIndex, width) {
    hasContent = true;
    lineStartSegmentIndex = segmentIndex;
    lineStartGraphemeIndex = graphemeIndex;
    lineEndSegmentIndex = segmentIndex;
    lineEndGraphemeIndex = graphemeIndex + 1;
    lineW = width;
  }
  function appendWholeSegment(segmentIndex, width) {
    if (!hasContent) {
      startLineAtSegment(segmentIndex, width);
      return;
    }
    lineW += width;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
  }
  function appendBreakableSegmentFrom(segmentIndex, startGraphemeIndex) {
    const fitAdvances = breakableFitAdvances[segmentIndex];
    for (let g = startGraphemeIndex; g < fitAdvances.length; g++) {
      const gw = fitAdvances[g];
      if (!hasContent) {
        startLineAtGrapheme(segmentIndex, g, gw);
      } else if (lineW + gw > fitLimit) {
        emitCurrentLine();
        startLineAtGrapheme(segmentIndex, g, gw);
      } else {
        lineW += gw;
        lineEndSegmentIndex = segmentIndex;
        lineEndGraphemeIndex = g + 1;
      }
    }
    if (hasContent && lineEndSegmentIndex === segmentIndex && lineEndGraphemeIndex === fitAdvances.length) {
      lineEndSegmentIndex = segmentIndex + 1;
      lineEndGraphemeIndex = 0;
    }
  }
  let i = 0;
  while (i < widths.length) {
    if (!hasContent) {
      i = normalizeSimpleLineStartSegmentIndex(prepared, i);
      if (i >= widths.length)
        break;
    }
    const w = widths[i];
    const kind = kinds[i];
    const breakAfter = kind === "space" || kind === "preserved-space" || kind === "tab" || kind === "zero-width-break" || kind === "soft-hyphen";
    if (!hasContent) {
      if (w > maxWidth && breakableFitAdvances[i] !== null) {
        appendBreakableSegmentFrom(i, 0);
      } else {
        startLineAtSegment(i, w);
      }
      if (breakAfter) {
        pendingBreakSegmentIndex = i + 1;
        pendingBreakPaintWidth = lineW - w;
      }
      i++;
      continue;
    }
    const newW = lineW + w;
    if (newW > fitLimit) {
      if (breakAfter) {
        appendWholeSegment(i, w);
        emitCurrentLine(i + 1, 0, lineW - w);
        i++;
        continue;
      }
      if (pendingBreakSegmentIndex >= 0) {
        if (lineEndSegmentIndex > pendingBreakSegmentIndex || lineEndSegmentIndex === pendingBreakSegmentIndex && lineEndGraphemeIndex > 0) {
          emitCurrentLine();
          continue;
        }
        emitCurrentLine(pendingBreakSegmentIndex, 0, pendingBreakPaintWidth);
        continue;
      }
      if (w > maxWidth && breakableFitAdvances[i] !== null) {
        emitCurrentLine();
        appendBreakableSegmentFrom(i, 0);
        i++;
        continue;
      }
      emitCurrentLine();
      continue;
    }
    appendWholeSegment(i, w);
    if (breakAfter) {
      pendingBreakSegmentIndex = i + 1;
      pendingBreakPaintWidth = lineW - w;
    }
    i++;
  }
  if (hasContent)
    emitCurrentLine();
  return lineCount;
}
function walkPreparedLines(prepared, maxWidth, onLine) {
  if (prepared.simpleLineWalkFastPath) {
    return walkPreparedLinesSimple(prepared, maxWidth, onLine);
  }
  const { widths, lineEndFitAdvances, lineEndPaintAdvances, kinds, breakableFitAdvances, discretionaryHyphenWidth, tabStopAdvance, chunks } = prepared;
  if (widths.length === 0 || chunks.length === 0)
    return 0;
  const engineProfile = getEngineProfile();
  const lineFitEpsilon = engineProfile.lineFitEpsilon;
  const fitLimit = maxWidth + lineFitEpsilon;
  let lineCount = 0;
  let lineW = 0;
  let hasContent = false;
  let lineStartSegmentIndex = 0;
  let lineStartGraphemeIndex = 0;
  let lineEndSegmentIndex = 0;
  let lineEndGraphemeIndex = 0;
  let pendingBreakSegmentIndex = -1;
  let pendingBreakFitWidth = 0;
  let pendingBreakPaintWidth = 0;
  let pendingBreakKind = null;
  function clearPendingBreak() {
    pendingBreakSegmentIndex = -1;
    pendingBreakFitWidth = 0;
    pendingBreakPaintWidth = 0;
    pendingBreakKind = null;
  }
  function emitCurrentLine(endSegmentIndex = lineEndSegmentIndex, endGraphemeIndex = lineEndGraphemeIndex, width = lineW) {
    lineCount++;
    onLine?.({
      startSegmentIndex: lineStartSegmentIndex,
      startGraphemeIndex: lineStartGraphemeIndex,
      endSegmentIndex,
      endGraphemeIndex,
      width
    });
    lineW = 0;
    hasContent = false;
    clearPendingBreak();
  }
  function startLineAtSegment(segmentIndex, width) {
    hasContent = true;
    lineStartSegmentIndex = segmentIndex;
    lineStartGraphemeIndex = 0;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
    lineW = width;
  }
  function startLineAtGrapheme(segmentIndex, graphemeIndex, width) {
    hasContent = true;
    lineStartSegmentIndex = segmentIndex;
    lineStartGraphemeIndex = graphemeIndex;
    lineEndSegmentIndex = segmentIndex;
    lineEndGraphemeIndex = graphemeIndex + 1;
    lineW = width;
  }
  function appendWholeSegment(segmentIndex, width) {
    if (!hasContent) {
      startLineAtSegment(segmentIndex, width);
      return;
    }
    lineW += width;
    lineEndSegmentIndex = segmentIndex + 1;
    lineEndGraphemeIndex = 0;
  }
  function updatePendingBreakForWholeSegment(kind, breakAfter, segmentIndex, segmentWidth) {
    if (!breakAfter)
      return;
    const fitAdvance = kind === "tab" ? 0 : lineEndFitAdvances[segmentIndex];
    const paintAdvance = kind === "tab" ? segmentWidth : lineEndPaintAdvances[segmentIndex];
    pendingBreakSegmentIndex = segmentIndex + 1;
    pendingBreakFitWidth = lineW - segmentWidth + fitAdvance;
    pendingBreakPaintWidth = lineW - segmentWidth + paintAdvance;
    pendingBreakKind = kind;
  }
  function appendBreakableSegmentFrom(segmentIndex, startGraphemeIndex) {
    const fitAdvances = breakableFitAdvances[segmentIndex];
    for (let g = startGraphemeIndex; g < fitAdvances.length; g++) {
      const gw = fitAdvances[g];
      if (!hasContent) {
        startLineAtGrapheme(segmentIndex, g, gw);
      } else if (lineW + gw > fitLimit) {
        emitCurrentLine();
        startLineAtGrapheme(segmentIndex, g, gw);
      } else {
        lineW += gw;
        lineEndSegmentIndex = segmentIndex;
        lineEndGraphemeIndex = g + 1;
      }
    }
    if (hasContent && lineEndSegmentIndex === segmentIndex && lineEndGraphemeIndex === fitAdvances.length) {
      lineEndSegmentIndex = segmentIndex + 1;
      lineEndGraphemeIndex = 0;
    }
  }
  function continueSoftHyphenBreakableSegment(segmentIndex) {
    if (pendingBreakKind !== "soft-hyphen")
      return false;
    const fitWidths = breakableFitAdvances[segmentIndex];
    if (fitWidths == null)
      return false;
    const { fitCount, fittedWidth } = fitSoftHyphenBreak(fitWidths, lineW, maxWidth, lineFitEpsilon, discretionaryHyphenWidth);
    if (fitCount === 0)
      return false;
    lineW = fittedWidth;
    lineEndSegmentIndex = segmentIndex;
    lineEndGraphemeIndex = fitCount;
    clearPendingBreak();
    if (fitCount === fitWidths.length) {
      lineEndSegmentIndex = segmentIndex + 1;
      lineEndGraphemeIndex = 0;
      return true;
    }
    emitCurrentLine(segmentIndex, fitCount, fittedWidth + discretionaryHyphenWidth);
    appendBreakableSegmentFrom(segmentIndex, fitCount);
    return true;
  }
  function emitEmptyChunk(chunk) {
    lineCount++;
    onLine?.({
      startSegmentIndex: chunk.startSegmentIndex,
      startGraphemeIndex: 0,
      endSegmentIndex: chunk.consumedEndSegmentIndex,
      endGraphemeIndex: 0,
      width: 0
    });
    clearPendingBreak();
  }
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    if (chunk.startSegmentIndex === chunk.endSegmentIndex) {
      emitEmptyChunk(chunk);
      continue;
    }
    hasContent = false;
    lineW = 0;
    lineStartSegmentIndex = chunk.startSegmentIndex;
    lineStartGraphemeIndex = 0;
    lineEndSegmentIndex = chunk.startSegmentIndex;
    lineEndGraphemeIndex = 0;
    clearPendingBreak();
    let i = chunk.startSegmentIndex;
    while (i < chunk.endSegmentIndex) {
      const kind = kinds[i];
      const breakAfter = kind === "space" || kind === "preserved-space" || kind === "tab" || kind === "zero-width-break" || kind === "soft-hyphen";
      const w = kind === "tab" ? getTabAdvance(lineW, tabStopAdvance) : widths[i];
      if (kind === "soft-hyphen") {
        if (hasContent) {
          lineEndSegmentIndex = i + 1;
          lineEndGraphemeIndex = 0;
          pendingBreakSegmentIndex = i + 1;
          pendingBreakFitWidth = lineW + discretionaryHyphenWidth;
          pendingBreakPaintWidth = lineW + discretionaryHyphenWidth;
          pendingBreakKind = kind;
        }
        i++;
        continue;
      }
      if (!hasContent) {
        if (w > maxWidth && breakableFitAdvances[i] !== null) {
          appendBreakableSegmentFrom(i, 0);
        } else {
          startLineAtSegment(i, w);
        }
        updatePendingBreakForWholeSegment(kind, breakAfter, i, w);
        i++;
        continue;
      }
      const newW = lineW + w;
      if (newW > fitLimit) {
        const currentBreakFitWidth = lineW + (kind === "tab" ? 0 : lineEndFitAdvances[i]);
        const currentBreakPaintWidth = lineW + (kind === "tab" ? w : lineEndPaintAdvances[i]);
        if (pendingBreakKind === "soft-hyphen" && engineProfile.preferEarlySoftHyphenBreak && pendingBreakFitWidth <= fitLimit) {
          emitCurrentLine(pendingBreakSegmentIndex, 0, pendingBreakPaintWidth);
          continue;
        }
        if (pendingBreakKind === "soft-hyphen" && continueSoftHyphenBreakableSegment(i)) {
          i++;
          continue;
        }
        if (breakAfter && currentBreakFitWidth <= fitLimit) {
          appendWholeSegment(i, w);
          emitCurrentLine(i + 1, 0, currentBreakPaintWidth);
          i++;
          continue;
        }
        if (pendingBreakSegmentIndex >= 0 && pendingBreakFitWidth <= fitLimit) {
          if (lineEndSegmentIndex > pendingBreakSegmentIndex || lineEndSegmentIndex === pendingBreakSegmentIndex && lineEndGraphemeIndex > 0) {
            emitCurrentLine();
            continue;
          }
          const nextSegmentIndex = pendingBreakSegmentIndex;
          emitCurrentLine(nextSegmentIndex, 0, pendingBreakPaintWidth);
          i = nextSegmentIndex;
          continue;
        }
        if (w > maxWidth && breakableFitAdvances[i] !== null) {
          emitCurrentLine();
          appendBreakableSegmentFrom(i, 0);
          i++;
          continue;
        }
        emitCurrentLine();
        continue;
      }
      appendWholeSegment(i, w);
      updatePendingBreakForWholeSegment(kind, breakAfter, i, w);
      i++;
    }
    if (hasContent) {
      const finalPaintWidth = pendingBreakSegmentIndex === chunk.consumedEndSegmentIndex ? pendingBreakPaintWidth : lineW;
      emitCurrentLine(chunk.consumedEndSegmentIndex, 0, finalPaintWidth);
    }
  }
  return lineCount;
}

// ../../node_modules/.bun/@chenglou+pretext@0.0.5/node_modules/@chenglou/pretext/dist/layout.js
var sharedGraphemeSegmenter2 = null;
function getSharedGraphemeSegmenter2() {
  if (sharedGraphemeSegmenter2 === null) {
    sharedGraphemeSegmenter2 = new Intl.Segmenter(void 0, { granularity: "grapheme" });
  }
  return sharedGraphemeSegmenter2;
}
function createEmptyPrepared(includeSegments) {
  if (includeSegments) {
    return {
      widths: [],
      lineEndFitAdvances: [],
      lineEndPaintAdvances: [],
      kinds: [],
      simpleLineWalkFastPath: true,
      segLevels: null,
      breakableFitAdvances: [],
      discretionaryHyphenWidth: 0,
      tabStopAdvance: 0,
      chunks: [],
      segments: []
    };
  }
  return {
    widths: [],
    lineEndFitAdvances: [],
    lineEndPaintAdvances: [],
    kinds: [],
    simpleLineWalkFastPath: true,
    segLevels: null,
    breakableFitAdvances: [],
    discretionaryHyphenWidth: 0,
    tabStopAdvance: 0,
    chunks: []
  };
}
function buildBaseCjkUnits(segText, engineProfile) {
  const units = [];
  let unitParts = [];
  let unitStart = 0;
  let unitContainsCJK = false;
  let unitEndsWithClosingQuote = false;
  let unitIsSingleKinsokuEnd = false;
  function pushUnit() {
    if (unitParts.length === 0)
      return;
    units.push({
      text: unitParts.length === 1 ? unitParts[0] : unitParts.join(""),
      start: unitStart
    });
    unitParts = [];
    unitContainsCJK = false;
    unitEndsWithClosingQuote = false;
    unitIsSingleKinsokuEnd = false;
  }
  function startUnit(grapheme, start, graphemeContainsCJK) {
    unitParts = [grapheme];
    unitStart = start;
    unitContainsCJK = graphemeContainsCJK;
    unitEndsWithClosingQuote = endsWithClosingQuote(grapheme);
    unitIsSingleKinsokuEnd = kinsokuEnd.has(grapheme);
  }
  function appendToUnit(grapheme, graphemeContainsCJK) {
    unitParts.push(grapheme);
    unitContainsCJK = unitContainsCJK || graphemeContainsCJK;
    const graphemeEndsWithClosingQuote = endsWithClosingQuote(grapheme);
    if (grapheme.length === 1 && leftStickyPunctuation.has(grapheme)) {
      unitEndsWithClosingQuote = unitEndsWithClosingQuote || graphemeEndsWithClosingQuote;
    } else {
      unitEndsWithClosingQuote = graphemeEndsWithClosingQuote;
    }
    unitIsSingleKinsokuEnd = false;
  }
  for (const gs of getSharedGraphemeSegmenter2().segment(segText)) {
    const grapheme = gs.segment;
    const graphemeContainsCJK = isCJK(grapheme);
    if (unitParts.length === 0) {
      startUnit(grapheme, gs.index, graphemeContainsCJK);
      continue;
    }
    if (unitIsSingleKinsokuEnd || kinsokuStart.has(grapheme) || leftStickyPunctuation.has(grapheme) || engineProfile.carryCJKAfterClosingQuote && graphemeContainsCJK && unitEndsWithClosingQuote) {
      appendToUnit(grapheme, graphemeContainsCJK);
      continue;
    }
    if (!unitContainsCJK && !graphemeContainsCJK) {
      appendToUnit(grapheme, graphemeContainsCJK);
      continue;
    }
    pushUnit();
    startUnit(grapheme, gs.index, graphemeContainsCJK);
  }
  pushUnit();
  return units;
}
function mergeKeepAllTextUnits(units) {
  if (units.length <= 1)
    return units;
  const merged = [];
  let currentTextParts = [units[0].text];
  let currentStart = units[0].start;
  let currentContainsCJK = isCJK(units[0].text);
  let currentCanContinue = canContinueKeepAllTextRun(units[0].text);
  function flushCurrent() {
    merged.push({
      text: currentTextParts.length === 1 ? currentTextParts[0] : currentTextParts.join(""),
      start: currentStart
    });
  }
  for (let i = 1; i < units.length; i++) {
    const next = units[i];
    const nextContainsCJK = isCJK(next.text);
    const nextCanContinue = canContinueKeepAllTextRun(next.text);
    if (currentContainsCJK && currentCanContinue) {
      currentTextParts.push(next.text);
      currentContainsCJK = currentContainsCJK || nextContainsCJK;
      currentCanContinue = nextCanContinue;
      continue;
    }
    flushCurrent();
    currentTextParts = [next.text];
    currentStart = next.start;
    currentContainsCJK = nextContainsCJK;
    currentCanContinue = nextCanContinue;
  }
  flushCurrent();
  return merged;
}
function measureAnalysis(analysis, font, includeSegments, wordBreak) {
  const engineProfile = getEngineProfile();
  const { cache: cache2, emojiCorrection } = getFontMeasurementState(font, textMayContainEmoji(analysis.normalized));
  const discretionaryHyphenWidth = getCorrectedSegmentWidth("-", getSegmentMetrics("-", cache2), emojiCorrection);
  const spaceWidth = getCorrectedSegmentWidth(" ", getSegmentMetrics(" ", cache2), emojiCorrection);
  const tabStopAdvance = spaceWidth * 8;
  if (analysis.len === 0)
    return createEmptyPrepared(includeSegments);
  const widths = [];
  const lineEndFitAdvances = [];
  const lineEndPaintAdvances = [];
  const kinds = [];
  let simpleLineWalkFastPath = analysis.chunks.length <= 1;
  const segStarts = includeSegments ? [] : null;
  const breakableFitAdvances = [];
  const segments = includeSegments ? [] : null;
  const preparedStartByAnalysisIndex = Array.from({ length: analysis.len });
  function pushMeasuredSegment(text, width, lineEndFitAdvance, lineEndPaintAdvance, kind, start, breakableFitAdvance) {
    if (kind !== "text" && kind !== "space" && kind !== "zero-width-break") {
      simpleLineWalkFastPath = false;
    }
    widths.push(width);
    lineEndFitAdvances.push(lineEndFitAdvance);
    lineEndPaintAdvances.push(lineEndPaintAdvance);
    kinds.push(kind);
    segStarts?.push(start);
    breakableFitAdvances.push(breakableFitAdvance);
    if (segments !== null)
      segments.push(text);
  }
  function pushMeasuredTextSegment(text, kind, start, wordLike, allowOverflowBreaks) {
    const textMetrics = getSegmentMetrics(text, cache2);
    const width = getCorrectedSegmentWidth(text, textMetrics, emojiCorrection);
    const lineEndFitAdvance = kind === "space" || kind === "preserved-space" || kind === "zero-width-break" ? 0 : width;
    const lineEndPaintAdvance = kind === "space" || kind === "zero-width-break" ? 0 : width;
    if (allowOverflowBreaks && wordLike && text.length > 1) {
      let fitMode = "sum-graphemes";
      if (isNumericRunSegment(text)) {
        fitMode = "pair-context";
      } else if (engineProfile.preferPrefixWidthsForBreakableRuns) {
        fitMode = "segment-prefixes";
      }
      const fitAdvances = getSegmentBreakableFitAdvances(text, textMetrics, cache2, emojiCorrection, fitMode);
      pushMeasuredSegment(text, width, lineEndFitAdvance, lineEndPaintAdvance, kind, start, fitAdvances);
      return;
    }
    pushMeasuredSegment(text, width, lineEndFitAdvance, lineEndPaintAdvance, kind, start, null);
  }
  for (let mi = 0; mi < analysis.len; mi++) {
    preparedStartByAnalysisIndex[mi] = widths.length;
    const segText = analysis.texts[mi];
    const segWordLike = analysis.isWordLike[mi];
    const segKind = analysis.kinds[mi];
    const segStart = analysis.starts[mi];
    if (segKind === "soft-hyphen") {
      pushMeasuredSegment(segText, 0, discretionaryHyphenWidth, discretionaryHyphenWidth, segKind, segStart, null);
      continue;
    }
    if (segKind === "hard-break") {
      pushMeasuredSegment(segText, 0, 0, 0, segKind, segStart, null);
      continue;
    }
    if (segKind === "tab") {
      pushMeasuredSegment(segText, 0, 0, 0, segKind, segStart, null);
      continue;
    }
    const segMetrics = getSegmentMetrics(segText, cache2);
    if (segKind === "text" && segMetrics.containsCJK) {
      const baseUnits = buildBaseCjkUnits(segText, engineProfile);
      const measuredUnits = wordBreak === "keep-all" ? mergeKeepAllTextUnits(baseUnits) : baseUnits;
      for (let i = 0; i < measuredUnits.length; i++) {
        const unit = measuredUnits[i];
        pushMeasuredTextSegment(unit.text, "text", segStart + unit.start, segWordLike, wordBreak === "keep-all" || !isCJK(unit.text));
      }
      continue;
    }
    pushMeasuredTextSegment(segText, segKind, segStart, segWordLike, true);
  }
  const chunks = mapAnalysisChunksToPreparedChunks(analysis.chunks, preparedStartByAnalysisIndex, widths.length);
  const segLevels = segStarts === null ? null : computeSegmentLevels(analysis.normalized, segStarts);
  if (segments !== null) {
    return {
      widths,
      lineEndFitAdvances,
      lineEndPaintAdvances,
      kinds,
      simpleLineWalkFastPath,
      segLevels,
      breakableFitAdvances,
      discretionaryHyphenWidth,
      tabStopAdvance,
      chunks,
      segments
    };
  }
  return {
    widths,
    lineEndFitAdvances,
    lineEndPaintAdvances,
    kinds,
    simpleLineWalkFastPath,
    segLevels,
    breakableFitAdvances,
    discretionaryHyphenWidth,
    tabStopAdvance,
    chunks
  };
}
function mapAnalysisChunksToPreparedChunks(chunks, preparedStartByAnalysisIndex, preparedEndSegmentIndex) {
  const preparedChunks = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const startSegmentIndex = chunk.startSegmentIndex < preparedStartByAnalysisIndex.length ? preparedStartByAnalysisIndex[chunk.startSegmentIndex] : preparedEndSegmentIndex;
    const endSegmentIndex = chunk.endSegmentIndex < preparedStartByAnalysisIndex.length ? preparedStartByAnalysisIndex[chunk.endSegmentIndex] : preparedEndSegmentIndex;
    const consumedEndSegmentIndex = chunk.consumedEndSegmentIndex < preparedStartByAnalysisIndex.length ? preparedStartByAnalysisIndex[chunk.consumedEndSegmentIndex] : preparedEndSegmentIndex;
    preparedChunks.push({
      startSegmentIndex,
      endSegmentIndex,
      consumedEndSegmentIndex
    });
  }
  return preparedChunks;
}
function prepareInternal(text, font, includeSegments, options) {
  const wordBreak = options?.wordBreak ?? "normal";
  const analysis = analyzeText(text, getEngineProfile(), options?.whiteSpace, wordBreak);
  return measureAnalysis(analysis, font, includeSegments, wordBreak);
}
function prepare(text, font, options) {
  return prepareInternal(text, font, false, options);
}
function getInternalPrepared(prepared) {
  return prepared;
}
function layout(prepared, maxWidth, lineHeight) {
  const lineCount = countPreparedLines(getInternalPrepared(prepared), maxWidth);
  return { lineCount, height: lineCount * lineHeight };
}

// ../core/src/text/fitTextFontSize.ts
var DEFAULTS = {
  maxWidth: 1600,
  baseFontSize: 78,
  minFontSize: 42,
  fontWeight: 900,
  fontFamily: "Outfit",
  step: 2
};
function fitTextFontSize(text, options) {
  const opts = { ...DEFAULTS, ...options };
  const lineHeightRatio = 1.2;
  for (let size = opts.baseFontSize; size >= opts.minFontSize; size -= opts.step) {
    const font = `${opts.fontWeight} ${size}px ${opts.fontFamily}`;
    const prepared = prepare(text, font);
    const { lineCount } = layout(prepared, opts.maxWidth, size * lineHeightRatio);
    if (lineCount <= 1) {
      return { fontSize: size, fits: true };
    }
  }
  return { fontSize: opts.minFontSize, fits: false };
}

// ../core/src/utils/renderOutputTimestamp.ts
function formatRenderOutputTimestamp(now) {
  const pad = (value) => String(value).padStart(2, "0");
  const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `${datePart}_${timePart}`;
}

// ../core/src/structuredTextMotion.ts
var STRUCTURED_TEXT_ROLES = /* @__PURE__ */ new Set([
  "unit",
  "text",
  "background",
  "clone-primary",
  "clone-accent",
  "mask",
  "texture",
  "particle-container",
  "particle"
]);
var STRUCTURED_MOTION_PROPERTIES = /* @__PURE__ */ new Set([
  "opacity",
  "x",
  "y",
  "scale",
  "scaleX",
  "scaleY",
  "rotation",
  "rotationX",
  "rotationY",
  "skewX",
  "skewY",
  "color",
  "backgroundColor",
  "backgroundImage",
  "backgroundClip",
  "backgroundPosition",
  "backgroundSize",
  "borderRadius",
  "boxShadow",
  "clipPath",
  "filter",
  "fontWeight",
  "letterSpacing",
  "mixBlendMode",
  "textShadow",
  "transformOrigin",
  "visibility",
  "WebkitBackgroundClip",
  "WebkitTextFillColor"
]);
var MAX_LAYERS = 16;
var MAX_TRACKS = 32;
var MAX_KEYFRAMES_PER_TRACK = 16;
var MAX_PARTICLES = 96;
var MAX_TEXT_UNITS = 512;
var MAX_ASSETS = 8;
var MAX_ASSET_PATH_LENGTH = 256;
var MAX_EASE_LENGTH = 96;
var GSAP_EASE_PATTERN = /^(?:none|linear|(?:power[0-4]|sine|expo|circ|back|elastic|bounce|steps)(?:\.(?:in|out|inOut))?)(?:\(-?(?:\d+(?:\.\d+)?|\.\d+)(?:\s*,\s*-?(?:\d+(?:\.\d+)?|\.\d+))*\))?$/;
function segmentStructuredText(text, split) {
  return segmentStructuredTextFallback(text, split);
}
function segmentStructuredTextFallback(text, split) {
  if (split === "whole") return text ? [text] : [];
  const Segmenter = Intl.Segmenter;
  if (!Segmenter) {
    throw new Error("Structured text motion requires Intl.Segmenter support");
  }
  const segments = Array.from(
    new Segmenter("und", { granularity: split === "word" ? "word" : "grapheme" }).segment(text)
  );
  return split === "word" ? segments.filter((segment) => segment.isWordLike).map((segment) => segment.segment) : segments.map((segment) => segment.segment);
}
function structuredTextSeed(value) {
  const input = String(value);
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function createStructuredTextRng(seed) {
  let state = structuredTextSeed(seed);
  return () => {
    state += 1831565813;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}
function assertFinite(value, label, max = 60) {
  if (!Number.isFinite(value) || value < 0 || value > max) {
    throw new Error(`${label} must be a finite number between 0 and ${max}`);
  }
}
function validateRole(role, path) {
  if (!STRUCTURED_TEXT_ROLES.has(role)) {
    throw new Error(`${path} has an unsupported structured text role: ${role}`);
  }
}
function validateKeyframes(keyframes, path) {
  if (!Array.isArray(keyframes) || keyframes.length === 0 || keyframes.length > MAX_KEYFRAMES_PER_TRACK) {
    throw new Error(`${path} must contain between 1 and ${MAX_KEYFRAMES_PER_TRACK} keyframes`);
  }
  for (const [index, keyframe] of keyframes.entries()) {
    assertFinite(keyframe.percentage, `${path}[${index}].percentage`, 100);
    for (const [property, value] of Object.entries(keyframe.properties)) {
      if (!STRUCTURED_MOTION_PROPERTIES.has(property)) {
        throw new Error(`${path}[${index}] has an unsupported property: ${property}`);
      }
      if (typeof value !== "number" && typeof value !== "string") {
        throw new Error(`${path}[${index}].${property} must be a finite number or string value`);
      }
      if (typeof value === "number" && !Number.isFinite(value)) {
        throw new Error(`${path}[${index}].${property} must be finite`);
      }
    }
    if (keyframe.ease !== void 0 && (typeof keyframe.ease !== "string" || keyframe.ease.length === 0 || keyframe.ease.length > MAX_EASE_LENGTH || !GSAP_EASE_PATTERN.test(keyframe.ease))) {
      throw new Error(`${path}[${index}].ease must use a safe GSAP ease string`);
    }
  }
}
function validateRange(range, path) {
  if (range.length !== 2 || !Number.isFinite(range[0]) || !Number.isFinite(range[1])) {
    throw new Error(`${path} must contain two finite numbers`);
  }
}
function copyValidatedAssets(assets) {
  if (assets === void 0) return void 0;
  if (!Array.isArray(assets) || assets.length > MAX_ASSETS) {
    throw new Error(
      `Structured text assets must contain at most ${MAX_ASSETS} registry-relative paths`
    );
  }
  return assets.map((asset, index) => {
    if (typeof asset !== "string" || asset.length === 0 || asset.length > MAX_ASSET_PATH_LENGTH || !asset.startsWith("registry/") || asset.startsWith("/") || asset.startsWith("\\") || asset.startsWith("//") || asset.startsWith("\\\\") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(asset) || !/^[A-Za-z0-9._/-]+$/.test(asset) || asset.split("/").some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
      throw new Error(`assets[${index}] must be a safe registry-relative path`);
    }
    return asset;
  });
}
function validateStructuredTextRecipe(recipe) {
  if (recipe.version !== 1) throw new Error("Structured text recipe version must be 1");
  if (!recipe.id.trim() || !recipe.presetId.trim())
    throw new Error("Structured text recipe ids are required");
  if (!["whole", "word", "character"].includes(recipe.split)) {
    throw new Error(`Unsupported structured text split: ${recipe.split}`);
  }
  if (!Array.isArray(recipe.layers) || recipe.layers.length === 0 || recipe.layers.length > MAX_LAYERS) {
    throw new Error(`Structured text recipes support between 1 and ${MAX_LAYERS} layers`);
  }
  recipe.layers.forEach((layer, index) => {
    validateRole(layer.role, `layers[${index}]`);
    if (typeof layer.perUnit !== "boolean" || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(layer.className)) {
      throw new Error(`layers[${index}] must use a boolean perUnit and safe className`);
    }
  });
  if (!Array.isArray(recipe.tracks) || recipe.tracks.length === 0 || recipe.tracks.length > MAX_TRACKS) {
    throw new Error(`Structured text recipes support between 1 and ${MAX_TRACKS} tracks`);
  }
  recipe.tracks.forEach((track, index) => {
    validateRole(track.role, `tracks[${index}]`);
    assertFinite(track.position, `tracks[${index}].position`);
    assertFinite(track.duration, `tracks[${index}].duration`);
    assertFinite(track.stagger, `tracks[${index}].stagger`, 10);
    validateKeyframes(track.keyframes, `tracks[${index}].keyframes`);
  });
  if (recipe.particles) {
    if (!Number.isInteger(recipe.particles.count) || recipe.particles.count < 0 || recipe.particles.count > MAX_PARTICLES) {
      throw new Error(
        `Structured text particle count must be an integer between 0 and ${MAX_PARTICLES}`
      );
    }
    validateRange(recipe.particles.x, "particles.x");
    validateRange(recipe.particles.y, "particles.y");
    validateRange(recipe.particles.size, "particles.size");
    validateRange(recipe.particles.delay, "particles.delay");
  }
  copyValidatedAssets(recipe.assets);
}
function randomInRange(random, range) {
  return range[0] + (range[1] - range[0]) * random();
}
function roundTime(value) {
  return Math.round(value * 1e12) / 1e12;
}
function recipeTrackTargetCount(recipe, track, unitCount) {
  if (track.role === "particle") return recipe.particles?.count ?? 0;
  const layer = recipe.layers.find((candidate) => candidate.role === track.role);
  return layer?.perUnit ? unitCount : 1;
}
function naturalTrackEnd(recipe, track, unitCount) {
  const targetCount = recipeTrackTargetCount(recipe, track, unitCount);
  return track.position + track.duration + track.stagger * Math.max(0, targetCount - 1);
}
function structuredTimingScale(recipe, unitCount, duration) {
  const naturalDuration = Math.max(
    ...recipe.tracks.map((track) => naturalTrackEnd(recipe, track, unitCount)),
    0
  );
  if (naturalDuration <= 0) return 1;
  return duration / naturalDuration;
}
function compileStructuredTextMotion(instance, text, recipe) {
  if (!recipe) return void 0;
  validateStructuredTextRecipe(recipe);
  if (recipe.presetId !== instance.presetId) {
    throw new Error(`Structured text recipe ${recipe.id} does not match ${instance.presetId}`);
  }
  const units = segmentStructuredText(text, recipe.split);
  if (units.length > MAX_TEXT_UNITS) {
    throw new Error(`Structured text recipes support at most ${MAX_TEXT_UNITS} text units`);
  }
  const seed = structuredTextSeed(recipe.seed ?? `${instance.id}:${recipe.id}:${text}`);
  const random = createStructuredTextRng(seed);
  const assets = copyValidatedAssets(recipe.assets);
  const particleSpec = recipe.particles;
  const actionDuration = instance.loop ? instance.duration * 0.8 : instance.duration;
  const timingScale = structuredTimingScale(recipe, units.length, actionDuration);
  const particles = particleSpec && units.length > 0 ? Array.from({ length: particleSpec.count }, (_, index) => ({
    unitIndex: units.length ? index % units.length : 0,
    x: randomInRange(random, particleSpec.x),
    y: randomInRange(random, particleSpec.y),
    size: randomInRange(random, particleSpec.size),
    delay: randomInRange(random, particleSpec.delay)
  })) : void 0;
  return {
    version: 1,
    recipeId: recipe.id,
    split: recipe.split,
    units: units.map((sourceText, index) => ({ index, sourceText })),
    layers: recipe.layers.map((layer) => ({ ...layer })),
    tracks: recipe.tracks.map((track) => ({
      ...track,
      position: roundTime(track.position * timingScale),
      duration: roundTime(track.duration * timingScale),
      stagger: roundTime(track.stagger * timingScale),
      keyframes: track.keyframes.map((keyframe) => ({
        ...keyframe,
        properties: { ...keyframe.properties }
      }))
    })),
    ...particles ? { particles } : {},
    ...assets ? { assets } : {},
    seed
  };
}
function isStructuredTextPreset(preset2) {
  return preset2.structuredText !== void 0;
}
function structuredMotionSelector(baseSelector, role) {
  validateRole(role, "role");
  return `${baseSelector} [data-ipw-motion-role="${role}"]`;
}

// ../core/src/structuredTextDom.ts
var STRUCTURE_ATTRIBUTE = "data-ipw-motion-structure";
var SOURCE_ATTRIBUTE = "data-ipw-motion-source";
var ROLE_ATTRIBUTE = "data-ipw-motion-role";
var PRESENTATION_ATTRIBUTE = "data-ipw-motion-presentation";
var STRUCTURED_TEXT_STYLE_ID = "ipw-structured-text-motion-styles";
var STRUCTURED_TEXT_STYLES = `
[data-ipw-motion-role="clone-primary"]::before,
[data-ipw-motion-role="clone-accent"]::before {
  content: attr(data-ipw-motion-clone-text);
}
`;
function encodeSourceText(sourceText) {
  return JSON.stringify(sourceText);
}
function readSourceText(target) {
  const encoded = target.getAttribute(SOURCE_ATTRIBUTE);
  if (encoded === null) return void 0;
  try {
    const source = JSON.parse(encoded);
    return typeof source === "string" ? source : void 0;
  } catch {
    return void 0;
  }
}
function addText(pieces, value) {
  if (!value) return;
  const previous = pieces.at(-1);
  if (previous?.kind === "text") {
    previous.value += value;
    return;
  }
  pieces.push({ kind: "text", value });
}
function addUnit(pieces, value, unitIndex) {
  if (value) pieces.push({ kind: "unit", value, unitIndex });
}
function splitInterveningText(pieces, value, prefix) {
  for (const part of value.split(/(\s+)/u)) {
    if (!part) continue;
    if (/^\s+$/u.test(part)) {
      addText(pieces, part);
      continue;
    }
    const previous = pieces.at(-1);
    if (previous?.kind === "unit") {
      previous.value += part;
    } else {
      prefix.value += part;
    }
  }
}
function buildWordPieces(sourceText, compiled) {
  const pieces = [];
  const prefix = { value: "" };
  let cursor = 0;
  for (const unit of compiled.units) {
    const index = sourceText.indexOf(unit.sourceText, cursor);
    if (index < 0) return [{ kind: "unit", value: sourceText, unitIndex: 0 }];
    splitInterveningText(pieces, sourceText.slice(cursor, index), prefix);
    addUnit(pieces, prefix.value + unit.sourceText, unit.index);
    prefix.value = "";
    cursor = index + unit.sourceText.length;
  }
  splitInterveningText(pieces, sourceText.slice(cursor), prefix);
  if (prefix.value) addText(pieces, prefix.value);
  return pieces;
}
function buildCharacterPieces(sourceText, compiled) {
  const pieces = [];
  let cursor = 0;
  for (const unit of compiled.units) {
    const index = sourceText.indexOf(unit.sourceText, cursor);
    if (index < 0) return [{ kind: "unit", value: sourceText, unitIndex: 0 }];
    addText(pieces, sourceText.slice(cursor, index));
    if (/^\s+$/u.test(unit.sourceText)) {
      addText(pieces, unit.sourceText);
    } else {
      addUnit(pieces, unit.sourceText, unit.index);
    }
    cursor = index + unit.sourceText.length;
  }
  addText(pieces, sourceText.slice(cursor));
  return pieces;
}
function buildContentPieces(sourceText, compiled) {
  if (compiled.split === "whole") {
    return sourceText ? [{ kind: "unit", value: sourceText, unitIndex: compiled.units[0]?.index ?? 0 }] : [];
  }
  return compiled.split === "word" ? buildWordPieces(sourceText, compiled) : buildCharacterPieces(sourceText, compiled);
}
function createLayer(document2, layer) {
  const element = document2.createElement("span");
  element.className = layer.className;
  element.setAttribute(ROLE_ATTRIBUTE, layer.role);
  return element;
}
function ensureStructuredTextStyles(document2) {
  if (document2.getElementById(STRUCTURED_TEXT_STYLE_ID)) return;
  const style = document2.createElement("style");
  style.id = STRUCTURED_TEXT_STYLE_ID;
  style.textContent = STRUCTURED_TEXT_STYLES;
  document2.head?.append(style);
}
function applyMotionTextPresentation(target) {
  const document2 = target.ownerDocument;
  if (!document2) return;
  ensureStructuredTextStyles(document2);
  target.setAttribute(PRESENTATION_ATTRIBUTE, "text-v1");
}
function removeMotionTextPresentation(target) {
  target.removeAttribute(PRESENTATION_ATTRIBUTE);
}
function applyUnitStyles(unit) {
  unit.style.display = "inline-block";
  unit.style.position = "relative";
  unit.style.isolation = "isolate";
  unit.style.whiteSpace = "pre";
  unit.style.verticalAlign = "baseline";
  unit.style.transformOrigin = "50% 50%";
}
function applyLayerStyles(layer, role) {
  if (role === "background") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "0";
    layer.style.pointerEvents = "none";
    layer.style.transformOrigin = "left center";
  } else if (role === "text") {
    layer.style.display = "inline-block";
    layer.style.position = "relative";
    layer.style.zIndex = "1";
    layer.style.font = "inherit";
    layer.style.fontWeight = "inherit";
    layer.style.lineHeight = "inherit";
    layer.style.letterSpacing = "inherit";
    layer.style.color = "inherit";
    layer.style.whiteSpace = "pre";
    layer.style.setProperty("-webkit-text-stroke", "inherit");
  } else if (role === "clone-primary" || role === "clone-accent") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "2";
    layer.style.pointerEvents = "none";
    layer.style.userSelect = "none";
    layer.style.font = "inherit";
    layer.style.fontWeight = "inherit";
    layer.style.lineHeight = "inherit";
    layer.style.letterSpacing = "inherit";
    layer.style.color = "inherit";
    layer.style.whiteSpace = "pre";
    layer.style.setProperty("-webkit-text-stroke", "inherit");
  } else if (role === "particle-container") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "3";
    layer.style.overflow = "visible";
    layer.style.pointerEvents = "none";
  } else if (role === "texture" || role === "mask") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "0";
    layer.style.pointerEvents = "none";
  }
}
function createUnit(document2, value, layers, split, recipeId) {
  const unitLayer = layers.find((layer) => layer.role === "unit");
  const unit = createLayer(document2, unitLayer ?? {
    role: "unit",
    perUnit: true,
    className: "ipw-motion-unit"
  });
  if (split === "word") unit.setAttribute("data-ipw-motion-word", "");
  if (split === "character") unit.setAttribute("data-ipw-motion-char", "");
  applyUnitStyles(unit);
  if (recipeId === "caption-highlight.word-sweep") {
    unit.style.padding = "0.075em 0.15em 0.1em";
    unit.style.lineHeight = "1";
  }
  let hasTextLayer = false;
  for (const layer of layers) {
    if (!layer.perUnit || layer.role === "unit" || layer.role === "particle") continue;
    const child = createLayer(document2, layer);
    applyLayerStyles(child, layer.role);
    if (layer.role === "text" && !hasTextLayer) {
      child.textContent = value;
      hasTextLayer = true;
    } else if (layer.role === "clone-primary" || layer.role === "clone-accent") {
      child.dataset.ipwMotionCloneText = value;
      child.setAttribute("aria-hidden", "true");
    } else {
      child.setAttribute("aria-hidden", "true");
    }
    unit.append(child);
  }
  if (!hasTextLayer) {
    const text = createLayer(document2, {
      role: "text",
      perUnit: true,
      className: "ipw-motion-text"
    });
    text.textContent = value;
    applyLayerStyles(text, "text");
    unit.append(text);
  }
  return unit;
}
function appendParticles(compiled, unitByIndex) {
  if (!compiled.particles) return;
  const particleLayer = compiled.layers.find((layer) => layer.role === "particle");
  for (const particle of compiled.particles) {
    if (!Number.isInteger(particle.unitIndex) || !Number.isFinite(particle.x) || !Number.isFinite(particle.y) || !Number.isFinite(particle.size) || !Number.isFinite(particle.delay)) continue;
    const unit = unitByIndex.get(particle.unitIndex);
    if (!unit) continue;
    const container = Array.from(unit.children).find(
      (child) => child.getAttribute(ROLE_ATTRIBUTE) === "particle-container"
    ) ?? unit;
    const element = createLayer(unit.ownerDocument, particleLayer ?? {
      role: "particle",
      perUnit: true,
      className: "ipw-motion-particle"
    });
    const size = Math.max(0, particle.size);
    const delay = Math.max(0, particle.delay);
    element.setAttribute("aria-hidden", "true");
    element.dataset.ipwMotionParticleX = String(particle.x);
    element.dataset.ipwMotionParticleY = String(particle.y);
    element.dataset.ipwMotionParticleSize = String(size);
    element.dataset.ipwMotionParticleDelay = String(delay);
    element.style.position = "absolute";
    element.style.pointerEvents = "none";
    element.style.left = "50%";
    element.style.top = "50%";
    element.style.setProperty("--ipw-motion-particle-x", `${particle.x}px`);
    element.style.setProperty("--ipw-motion-particle-y", `${particle.y}px`);
    element.style.setProperty("--ipw-motion-particle-size", `${size}px`);
    element.style.setProperty("--ipw-motion-particle-delay", `${delay}s`);
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.animationDelay = `${delay}s`;
    container.append(element);
  }
}
function appendGlobalDecorativeLayers(target, layers) {
  const document2 = target.ownerDocument;
  if (!document2) return;
  for (const layer of layers) {
    if (layer.perUnit || layer.role === "unit" || layer.role === "text") continue;
    const decorative = createLayer(document2, layer);
    decorative.setAttribute("aria-hidden", "true");
    applyLayerStyles(decorative, layer.role);
    target.append(decorative);
  }
}
function snapshotStructuredText(target) {
  return {
    attributes: Array.from(target.attributes, ({ name, value }) => ({ name, value })),
    childNodes: Array.from(target.childNodes)
  };
}
function restoreStructuredText(target, snapshot) {
  for (const attribute of Array.from(target.attributes)) target.removeAttribute(attribute.name);
  for (const attribute of snapshot.attributes) target.setAttribute(attribute.name, attribute.value);
  target.replaceChildren(...snapshot.childNodes);
}
function unwrapStructuredText(target) {
  const sourceText = readSourceText(target) ?? target.textContent ?? "";
  const document2 = target.ownerDocument;
  if (!document2) return;
  target.replaceChildren(document2.createTextNode(sourceText));
  target.removeAttribute(STRUCTURE_ATTRIBUTE);
  target.removeAttribute(SOURCE_ATTRIBUTE);
  removeMotionTextPresentation(target);
}
function materializeStructuredText(target, compiled, sourceText) {
  const document2 = target.ownerDocument;
  if (!document2) return;
  const source = readSourceText(target) ?? sourceText ?? target.textContent ?? "";
  if (target.hasAttribute(STRUCTURE_ATTRIBUTE) || target.hasAttribute(SOURCE_ATTRIBUTE)) {
    unwrapStructuredText(target);
  }
  applyMotionTextPresentation(target);
  const fragment = document2.createDocumentFragment();
  const unitByIndex = /* @__PURE__ */ new Map();
  for (const piece of buildContentPieces(source, compiled)) {
    if (piece.kind === "text") {
      fragment.append(document2.createTextNode(piece.value));
    } else {
      const unit = createUnit(document2, piece.value, compiled.layers, compiled.split, compiled.recipeId);
      unitByIndex.set(piece.unitIndex, unit);
      fragment.append(unit);
    }
  }
  target.replaceChildren(fragment);
  appendParticles(compiled, unitByIndex);
  appendGlobalDecorativeLayers(target, compiled.layers);
  target.setAttribute(STRUCTURE_ATTRIBUTE, "v1");
  target.setAttribute(SOURCE_ATTRIBUTE, encodeSourceText(source));
}

// ../core/src/runtime/getVariables.ts
function getVariables() {
  if (typeof document === "undefined") return {};
  const declarers = /* @__PURE__ */ new Set();
  if (document.documentElement?.hasAttribute("data-composition-variables")) {
    declarers.add(document.documentElement);
  }
  for (const el of Array.from(document.querySelectorAll("[data-composition-variables]"))) {
    declarers.add(el);
  }
  const declaredDefaults = {};
  for (const el of declarers) {
    Object.assign(declaredDefaults, readDeclaredDefaults(el));
  }
  const overrides = readRenderOverrides();
  const merged = { ...declaredDefaults, ...overrides };
  for (const el of declarers) warnUnknownEnumValues(el, merged);
  return merged;
}
var warnedUnknownEnumValues = /* @__PURE__ */ new Set();
function readDeclarations(el) {
  const raw = el?.getAttribute("data-composition-variables");
  if (!raw) return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (entry) => !!entry && typeof entry === "object"
  );
}
function compositionLabel(declarer, compositionId) {
  return compositionId?.trim() || declarer.getAttribute("data-composition-id")?.trim() || declarer.querySelector("[data-composition-id]")?.getAttribute("data-composition-id")?.trim() || "composition";
}
function declaredOptions(entry) {
  if (!Array.isArray(entry.options)) return [];
  return entry.options.map(
    (option) => option && typeof option === "object" ? option.value : option
  ).filter((v) => typeof v === "string" || typeof v === "number");
}
function unknownEnumValue(entry, resolved) {
  if (typeof entry.id !== "string") return null;
  const value = resolved[entry.id];
  if (value === void 0 || value === null) return null;
  if ("default" in entry && String(value) === String(entry.default)) return null;
  const allowed = declaredOptions(entry);
  if (allowed.length === 0 || allowed.some((v) => String(v) === String(value))) return null;
  return { id: entry.id, value, allowed };
}
function warnUnknownEnumValues(declarer, resolved, compositionId) {
  if (!declarer) return;
  const entries = readDeclarations(declarer);
  if (entries.length === 0) return;
  const move = compositionLabel(declarer, compositionId);
  for (const entry of entries) {
    const found = unknownEnumValue(entry, resolved);
    if (!found) continue;
    const key = `${move}|${found.id}|${String(found.value)}`;
    if (warnedUnknownEnumValues.has(key)) continue;
    warnedUnknownEnumValues.add(key);
    const fallback = "default" in entry ? JSON.stringify(entry.default) : "the composition default";
    console.warn(
      `[hyperframes] runtime_unknown_enum_value: ${move} variable "${found.id}" got ${JSON.stringify(found.value)}, which is not a declared option (${found.allowed.join(", ")}). Rendering ${fallback} instead.`
    );
  }
}
function readDeclaredDefaults(root) {
  const out = {};
  for (const entry of readDeclarations(root)) {
    if (typeof entry.id !== "string" || !("default" in entry)) continue;
    out[entry.id] = entry.default;
  }
  return out;
}
function readRenderOverrides() {
  if (typeof window === "undefined") return {};
  const raw = window.__hfVariables;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  return raw;
}

// ../core/src/runtime/globals.ts
function getDebugSurface() {
  return globalThis;
}

// ../core/src/runtime/diagnostics.ts
function swallow(label, error) {
  if (typeof window === "undefined") return;
  const w = getDebugSurface();
  const handler = w.__hf?.onSwallowed;
  if (handler) {
    try {
      handler({ label, error });
    } catch (handlerError) {
      void handlerError;
    }
  }
  if (w.__hfDebug || w.__HYPERFRAMES_DEBUG) {
    console.debug(`[hyperframes] ${label} swallowed:`, error);
  }
}

// ../core/src/mediaTiming.ts
var MEDIA_START_BASIS_ATTR = "data-hf-media-start-basis";
function readMediaStartBasis(value) {
  return value?.trim().toLowerCase() === "global" ? "global" : "local";
}
function resolveAbsoluteMediaStartSeconds(input) {
  return readMediaStartBasis(input.basis) === "global" ? input.authoredStart : input.hostStart + input.authoredStart;
}
function resolveMediaStartSeconds(input) {
  if (!hasLiteralNestedStart(input)) return input.ordinaryStart();
  return resolveAbsoluteMediaStartSeconds({
    authoredStart: input.authoredStart,
    hostStart: input.hostStart,
    basis: input.basis
  });
}
function isRootGlobalMediaStart(input) {
  return hasLiteralNestedStart(input) && readMediaStartBasis(input.basis) === "global";
}
function hasLiteralNestedStart(input) {
  return !input.hasAutoStart && input.authoredStart != null && input.hostStart > 0;
}

// ../core/src/runtime/startResolver.ts
function readCompositionPlaybackRate(element) {
  if (!element.hasAttribute("data-composition-id") && !element.hasAttribute("data-composition-src") && !element.hasAttribute("data-composition-file"))
    return 1;
  const rate = parseStrictFiniteTimingNumber(element.getAttribute("data-playback-rate"));
  return rate != null && rate > 0 ? rate : 1;
}
function readCompositionPlaybackStart(element) {
  return element.hasAttribute("data-source-duration") ? Math.max(0, parseStrictFiniteTimingNumber(element.getAttribute("data-playback-start")) ?? 0) : 0;
}
function hasCompositionRetime(element) {
  let node = element;
  while (node) {
    if (node.hasAttribute("data-source-duration") && readCompositionPlaybackRate(node) > 0 && (node.hasAttribute("data-composition-id") || node.hasAttribute("data-composition-src") || node.hasAttribute("data-composition-file")))
      return true;
    node = parentComposition(node);
  }
  return false;
}
function parentComposition(element) {
  return element.parentElement?.closest("[data-composition-id]:not([data-hf-inner-root])") ?? null;
}
function resolveAncestorCompositionPlaybackRate(element) {
  let rate = 1;
  let host = parentComposition(element);
  while (host) {
    rate *= readCompositionPlaybackRate(host);
    host = parentComposition(host);
  }
  return rate;
}
function createRuntimeStartTimeResolver(params) {
  const timelineRegistry = params.timelineRegistry ?? {};
  const includeAuthoredTimingAttrs = params.includeAuthoredTimingAttrs ?? false;
  const doc = params.documentRef ?? document;
  const startCache = /* @__PURE__ */ new WeakMap();
  const durationCache = /* @__PURE__ */ new WeakMap();
  const visiting = /* @__PURE__ */ new Set();
  const findReferenceTarget = (refId) => {
    const byId = doc.getElementById(refId);
    if (byId) return byId;
    return doc.querySelector(`[data-composition-id="${CSS.escape(refId)}"]`) ?? null;
  };
  const resolveDurationForElement = (element) => {
    const cached = durationCache.get(element);
    if (cached !== void 0) return cached;
    let resolved = null;
    const durationTiming = resolveAuthoredTimingWindow({
      start: 0,
      duration: element.getAttribute("data-duration"),
      authoredDuration: includeAuthoredTimingAttrs ? element.getAttribute("data-hf-authored-duration") : null
    });
    if (durationTiming?.duration != null && durationTiming.duration > 0) {
      resolved = durationTiming.duration / resolveAncestorCompositionPlaybackRate(element);
    }
    if (resolved == null || resolved <= 0) {
      const start = resolveStartForElementInternal(element, 0);
      const endTiming = resolveAuthoredTimingWindow({
        start,
        end: element.getAttribute("data-end"),
        authoredEnd: includeAuthoredTimingAttrs ? element.getAttribute("data-hf-authored-end") : null
      });
      if (endTiming?.duration != null && endTiming.duration > 0) {
        if (hasCompositionRetime(element)) {
          const host = parentComposition(element);
          const hostStart = host ? resolveStartForElementInternal(host, 0) : 0;
          const trim = host ? readCompositionPlaybackStart(host) : 0;
          const end = parseStrictFiniteTimingNumber(element.getAttribute("data-end") ?? element.getAttribute("data-hf-authored-end"));
          if (end != null) resolved = hostStart + (end - trim) / resolveAncestorCompositionPlaybackRate(element) - start;
        } else resolved = endTiming.duration;
      }
    }
    if ((resolved == null || resolved <= 0) && isMediaElement2(element)) {
      resolved = resolveNaturalMediaTimelineDuration(element, element.duration);
      if (resolved != null) resolved /= resolveAncestorCompositionPlaybackRate(element);
    }
    if (resolved == null || resolved <= 0) resolved = resolveTimedImageDurationSeconds(element);
    if (resolved == null || resolved <= 0) {
      const compositionId = element.getAttribute("data-composition-id");
      if (compositionId) {
        const timeline = timelineRegistry[compositionId] ?? null;
        if (timeline && typeof timeline.duration === "function") {
          try {
            const timelineDuration = Number(timeline.duration());
            if (Number.isFinite(timelineDuration) && timelineDuration > 0) {
              resolved = timelineDuration / (readCompositionPlaybackRate(element) * resolveAncestorCompositionPlaybackRate(element));
            }
          } catch (err) {
            swallow("runtime.startResolver.site1", err);
          }
        }
      }
    }
    if (resolved != null && Number.isFinite(resolved) && resolved > 0) {
      durationCache.set(element, resolved);
      return resolved;
    }
    durationCache.set(element, null);
    return null;
  };
  const resolveHostOffsetForElement = (element, fallback) => {
    if (element.hasAttribute("data-composition-id")) {
      const parentComposition2 = element.parentElement?.closest("[data-composition-id]:not([data-hf-inner-root])");
      if (!parentComposition2) return 0;
      return resolveStartForElementInternal(parentComposition2, fallback);
    }
    const compositionRoot = element.closest("[data-composition-id]");
    if (!compositionRoot) return 0;
    return resolveStartForElementInternal(compositionRoot, fallback);
  };
  const resolveStartForElementInternal = (element, fallback) => {
    const cached = startCache.get(element);
    if (cached !== void 0) {
      return cached == null ? fallback : cached;
    }
    if (visiting.has(element)) {
      return fallback;
    }
    visiting.add(element);
    try {
      const expression = parseStartExpression(element.getAttribute("data-start"));
      if (!expression) {
        if (element.hasAttribute("data-composition-id")) {
          const parent = element.parentElement;
          if (parent && (parent.hasAttribute("data-composition-src") || parent.hasAttribute("data-composition-id") || parent.hasAttribute("data-composition-file"))) {
            const parentStart = resolveStartForElementInternal(parent, fallback);
            startCache.set(element, parentStart);
            return parentStart;
          }
        }
        startCache.set(element, fallback);
        return fallback;
      }
      if (expression.kind === "absolute") {
        const absolute = Math.max(0, expression.value);
        const host = parentComposition(element);
        const trim = host ? readCompositionPlaybackStart(host) : 0;
        const resolved2 = Math.max(
          0,
          resolveHostOffsetForElement(element, fallback) + (absolute - trim) / resolveAncestorCompositionPlaybackRate(element)
        );
        startCache.set(element, resolved2);
        return resolved2;
      }
      const target = findReferenceTarget(expression.refId);
      if (!target) {
        startCache.set(element, fallback);
        return fallback;
      }
      const targetStart = resolveStartForElementInternal(target, 0);
      const targetDuration = resolveDurationForElement(target);
      if (targetDuration == null || targetDuration <= 0) {
        const unresolved = Math.max(
          0,
          targetStart + expression.offset / resolveAncestorCompositionPlaybackRate(element)
        );
        startCache.set(element, unresolved);
        return unresolved;
      }
      const resolved = Math.max(
        0,
        targetStart + targetDuration + expression.offset / resolveAncestorCompositionPlaybackRate(element)
      );
      startCache.set(element, resolved);
      return resolved;
    } finally {
      visiting.delete(element);
    }
  };
  const mediaStartInput = (element) => {
    const compositionRoot = element.closest("[data-composition-id]");
    return {
      authoredStart: parseStrictFiniteTimingNumber(element.getAttribute("data-start")),
      hostStart: compositionRoot ? resolveStartForElementInternal(compositionRoot, 0) : 0,
      hasAutoStart: element.hasAttribute("data-hf-auto-start"),
      basis: element.getAttribute(MEDIA_START_BASIS_ATTR)
    };
  };
  const resolveMediaStartForElement = (element) => {
    const input = mediaStartInput(element);
    return resolveMediaStartSeconds({
      ...input,
      ordinaryStart: () => resolveStartForElementInternal(element, input.hostStart)
    });
  };
  const isRootGlobalMediaStartForElement = (element) => isMediaElement2(element) && isRootGlobalMediaStart(mediaStartInput(element));
  return {
    resolveStartForElement: (element, fallback = 0) => resolveStartForElementInternal(element, Math.max(0, fallback)),
    resolveDurationForElement: (element) => resolveDurationForElement(element),
    resolveMediaStartForElement,
    resolveHostStartForElement: (element) => resolveHostOffsetForElement(element, 0),
    isRootGlobalMediaStartForElement
  };
}

// ../core/src/clipFacts.ts
var instantTolerance = (time) => 4 * Number.EPSILON * Math.max(1, Math.abs(time));
function sameInstant(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;
  return Math.abs(a - b) <= instantTolerance(Math.max(Math.abs(a), Math.abs(b)));
}

// ../core/src/runtime/clipWindow.ts
var hasClipStarted = (time, start) => time >= start || sameInstant(time, start);
var isInClipWindow = (time, start, end) => hasClipStarted(time, start) && time < end && !sameInstant(time, end);
var TERMINAL_EPSILON_SECONDS = 1e-6;
var isClipVisibleAt = (time, start, end, compositionDuration) => isInClipWindow(time, start, end) || hasClipStarted(time, start) && compositionDuration > 0 && end >= compositionDuration - TERMINAL_EPSILON_SECONDS;

// ../core/src/runtime/validateVariables.ts
function validateVariables(values, declarations) {
  const decls = /* @__PURE__ */ new Map();
  for (const decl of declarations) decls.set(decl.id, decl);
  const issues = [];
  for (const [id, value] of Object.entries(values)) {
    const decl = decls.get(id);
    if (!decl) {
      issues.push({ kind: "undeclared", variableId: id });
      continue;
    }
    const mismatch = checkType(value, decl);
    if (mismatch) issues.push(mismatch);
  }
  return issues;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function checkType(value, decl) {
  switch (decl.type) {
    case "string":
    case "color":
      if (typeof value !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: decl.type,
          actual: jsTypeOf(value)
        };
      }
      return null;
    case "number":
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "number",
          actual: jsTypeOf(value)
        };
      }
      return null;
    case "boolean":
      if (typeof value !== "boolean") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "boolean",
          actual: jsTypeOf(value)
        };
      }
      return null;
    case "enum": {
      if (typeof value !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "enum (string)",
          actual: jsTypeOf(value)
        };
      }
      const allowed = decl.options.map((o) => o.value);
      if (!allowed.includes(value)) {
        return { kind: "enum-out-of-range", variableId: decl.id, allowed, actual: value };
      }
      return null;
    }
    case "font": {
      if (typeof value === "string") return null;
      if (!isPlainObject(value)) {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "font (object {name, source} or string)",
          actual: jsTypeOf(value)
        };
      }
      if (typeof value.name !== "string" || typeof value.source !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "font object {name: string, source: string}",
          actual: "object missing string name/source"
        };
      }
      return null;
    }
    case "image": {
      if (typeof value === "string") return null;
      if (!isPlainObject(value)) {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "image (object {url} or string)",
          actual: jsTypeOf(value)
        };
      }
      if (typeof value.url !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "image object {url: string}",
          actual: "object missing string url"
        };
      }
      return null;
    }
  }
}
function jsTypeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}
function formatVariableValidationIssue(issue) {
  switch (issue.kind) {
    case "undeclared":
      return `Variable "${issue.variableId}" is not declared in data-composition-variables.`;
    case "type-mismatch":
      return `Variable "${issue.variableId}" expected ${issue.expected}, got ${issue.actual}.`;
    case "enum-out-of-range":
      return `Variable "${issue.variableId}" must be one of ${issue.allowed.map((v) => `"${v}"`).join(", ")} (got "${issue.actual}").`;
  }
}

// ../core/src/registry/componentContent.ts
function parseComponentTextList(value, separators) {
  if (value.trimStart().startsWith("[")) {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || !parsed.every((s) => typeof s === "string")) {
      throw Error("List must be a JSON array of texts");
    }
    return parsed;
  }
  return Array.from(value, (ch) => separators.includes(ch) ? "\n" : ch).join("").split("\n").map((s) => s.trim()).filter(Boolean);
}

// ../core/src/registry/componentData.ts
function readObjectValue(value, key) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return void 0;
  return Reflect.get(value, key);
}
function findColumn(contract, roles, fallbackIndex) {
  return contract.columns.find((column) => roles.includes(column.role)) ?? contract.columns[fallbackIndex];
}
function parseCell(raw, column) {
  if (column.type === "number") {
    if (typeof raw !== "number" && typeof raw !== "string") return void 0;
    if (typeof raw === "string" && raw.trim() === "") return void 0;
    const numberValue = typeof raw === "number" ? raw : Number(raw);
    return Number.isFinite(numberValue) ? numberValue : void 0;
  }
  return typeof raw === "string" ? raw.trim() : void 0;
}
function normalizeRows(rawRows, contract) {
  const rows = [];
  const issues = [];
  for (const [rowIndex, rawRow] of rawRows.entries()) {
    const row = {};
    for (const column of contract.columns) {
      const raw = readObjectValue(rawRow, column.id);
      const cell = parseCell(raw, column);
      if (cell === void 0 || cell === "") {
        if (column.required) {
          issues.push({
            path: `rows.${rowIndex}.${column.id}`,
            message: `${column.label} is required`
          });
        } else if (cell === void 0 && raw !== void 0 && !(typeof raw === "string" && raw.trim() === "")) {
          issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be a valid ${column.type}` });
        }
        continue;
      }
      row[column.id] = cell;
      if (typeof cell === "number" && (column.min !== void 0 && cell < column.min || column.max !== void 0 && cell > column.max)) {
        issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be within ${column.min ?? "\u2212\u221E"}\u2013${column.max ?? "\u221E"}` });
      }
      if (typeof cell === "number" && column.integer && !Number.isInteger(cell)) {
        issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be an integer` });
      }
      if (typeof cell === "string") {
        if (column.maxLength !== void 0 && Array.from(cell).length > column.maxLength) {
          issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} allows at most ${column.maxLength} characters` });
        }
        if (column.list) {
          const limit = column.list;
          let list = [];
          try {
            list = parseComponentTextList(cell, limit.separators);
          } catch {
            issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} must be a list of texts` });
          }
          if (list.length > limit.maxItems || list.some((item) => Array.from(item).length > limit.itemMaxLength || !item.trim())) {
            issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} allows at most ${limit.maxItems} items and ${limit.itemMaxLength} characters per item` });
          }
        }
      }
      if (column.options && !column.options.some((option) => option.value === cell)) {
        issues.push({ path: `rows.${rowIndex}.${column.id}`, message: `${column.label} is not an available option` });
      }
    }
    const hiddenRowId = readObjectValue(rawRow, contract.rowId);
    if (row[contract.rowId] === void 0 && (typeof hiddenRowId === "string" || typeof hiddenRowId === "number")) {
      row[contract.rowId] = hiddenRowId;
    }
    rows.push(row);
  }
  const minRows = contract.minRows ?? 0;
  if (rows.length < minRows) {
    issues.push({ path: "rows", message: `At least ${minRows} rows are required` });
  }
  if (contract.maxRows !== void 0 && rows.length > contract.maxRows) {
    issues.push({ path: "rows", message: `At most ${contract.maxRows} rows are allowed` });
  }
  const seenIds = /* @__PURE__ */ new Set();
  for (const [rowIndex, row] of rows.entries()) {
    const rowId = row[contract.rowId];
    if (rowId === void 0) continue;
    if (seenIds.has(rowId)) {
      issues.push({ path: `rows.${rowIndex}.${contract.rowId}`, message: "Row id must be unique" });
    }
    seenIds.add(rowId);
  }
  return { document: { version: 1, kind: contract.kind, rows }, issues };
}
function parseJsonRows(value, contract) {
  try {
    const parsed = JSON.parse(value);
    const version = readObjectValue(parsed, "version");
    const kind = readObjectValue(parsed, "kind");
    const rows = readObjectValue(parsed, "rows");
    if (version !== 1 || kind !== contract.kind || !Array.isArray(rows)) {
      return {
        document: { version: 1, kind: contract.kind, rows: [] },
        issues: [{ path: "data", message: "Data document does not match this component contract" }]
      };
    }
    return normalizeRows(rows, contract);
  } catch {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "data", message: "Data document is not valid JSON" }]
    };
  }
}
function parseKeyValueRows(value, contract) {
  const keyColumn = findColumn(contract, ["id", "label"], 0);
  const valueColumn = findColumn(contract, ["value"], 1);
  if (!keyColumn || !valueColumn) {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "columns", message: "Key-value data needs two columns" }]
    };
  }
  const rows = value.split(",").map((entry) => {
    const separator = entry.lastIndexOf(":");
    return {
      [keyColumn.id]: entry.slice(0, separator).trim(),
      [valueColumn.id]: separator >= 0 ? entry.slice(separator + 1).trim() : ""
    };
  }).filter((row) => row[keyColumn.id] !== "");
  return normalizeRows(rows, contract);
}
function parseRouteRows(value, contract) {
  const sourceColumn = findColumn(contract, ["source"], 0);
  const targetColumn = findColumn(contract, ["target"], 1);
  const valueColumn = findColumn(contract, ["value"], 2);
  if (!sourceColumn || !targetColumn || !valueColumn) {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "columns", message: "Route data needs source, target, and value columns" }]
    };
  }
  const rows = value.split(",").map((entry) => {
    const valueSeparator = entry.lastIndexOf(":");
    const route = entry.slice(0, valueSeparator).split(">");
    return {
      [sourceColumn.id]: (route[0] ?? "").trim(),
      [targetColumn.id]: (route[1] ?? "").trim(),
      [valueColumn.id]: valueSeparator >= 0 ? entry.slice(valueSeparator + 1).trim() : "",
      [contract.rowId]: `${(route[0] ?? "").trim()}>${(route[1] ?? "").trim()}`
    };
  }).filter((row) => row[sourceColumn.id] !== "" || row[targetColumn.id] !== "");
  return normalizeRows(rows, contract);
}
function parseLabelDetailRows(value, contract) {
  const labelColumn = findColumn(contract, ["id", "label"], 0);
  const detailColumn = findColumn(contract, ["value"], 1);
  if (!labelColumn || !detailColumn) {
    return {
      document: { version: 1, kind: contract.kind, rows: [] },
      issues: [{ path: "columns", message: "Label-detail data needs two columns" }]
    };
  }
  const rows = value.split("|").map((entry) => {
    const separator = entry.indexOf("::");
    return {
      [labelColumn.id]: (separator >= 0 ? entry.slice(0, separator) : entry).trim(),
      [detailColumn.id]: (separator >= 0 ? entry.slice(separator + 2) : "").trim()
    };
  }).filter((row) => row[labelColumn.id] !== "");
  return normalizeRows(rows, contract);
}
function parseVisualComponentData(contract, value) {
  if (contract.binding.encoding === "json") return parseJsonRows(value, contract);
  if (contract.binding.encoding === "route-value-list") return parseRouteRows(value, contract);
  if (contract.binding.encoding === "label-detail-list") return parseLabelDetailRows(value, contract);
  return parseKeyValueRows(value, contract);
}
function serializeVisualComponentData(contract, document2) {
  if (contract.binding.encoding === "json") return JSON.stringify(document2);
  if (contract.binding.encoding === "route-value-list") {
    const sourceColumn = findColumn(contract, ["source"], 0);
    const targetColumn = findColumn(contract, ["target"], 1);
    const valueColumn2 = findColumn(contract, ["value"], 2);
    if (!sourceColumn || !targetColumn || !valueColumn2) return "";
    return document2.rows.map(
      (row) => `${row[sourceColumn.id] ?? ""}>${row[targetColumn.id] ?? ""}:${row[valueColumn2.id] ?? ""}`
    ).join(",");
  }
  if (contract.binding.encoding === "label-detail-list") {
    const labelColumn = findColumn(contract, ["id", "label"], 0);
    const detailColumn = findColumn(contract, ["value"], 1);
    if (!labelColumn || !detailColumn) return "";
    return document2.rows.map((row) => `${row[labelColumn.id] ?? ""}::${row[detailColumn.id] ?? ""}`).join("|");
  }
  const keyColumn = findColumn(contract, ["id", "label"], 0);
  const valueColumn = findColumn(contract, ["value"], 1);
  if (!keyColumn || !valueColumn) return "";
  return document2.rows.map((row) => `${row[keyColumn.id] ?? ""}:${row[valueColumn.id] ?? ""}`).join(",");
}
function createVisualComponentDataRow(contract) {
  const row = {};
  for (const column of contract.columns) row[column.id] = column.options?.[0]?.value ?? (column.type === "number" ? 0 : "");
  return row;
}
function formatVisualComponentDataForAi(contract, value) {
  const parsed = parseVisualComponentData(contract, value);
  return JSON.stringify(
    {
      contractVersion: 1,
      kind: contract.kind,
      mode: contract.mode,
      rowId: contract.rowId,
      columns: contract.columns,
      minRows: contract.minRows,
      maxRows: contract.maxRows,
      valueFormat: contract.valueFormat,
      allowedOperations: [
        "set",
        "upsertRows",
        "removeRows",
        ...contract.highlightVariable ? ["setHighlight"] : []
      ],
      data: parsed.document,
      validation: { valid: parsed.issues.length === 0, issues: parsed.issues }
    },
    null,
    2
  );
}

// ../core/src/registry/types.ts
var VISUAL_COMPONENT_CATEGORIES = [
  "maps",
  "media",
  "business"
];
function resolveVisualComponentCategory(value) {
  if (typeof value !== "string") return null;
  const canonical = VISUAL_COMPONENT_CATEGORIES.find((category) => category === value);
  if (canonical) return canonical;
  switch (value) {
    case "interface":
      return "media";
    case "product":
      return "business";
    default:
      return null;
  }
}
var ITEM_TYPES = [
  "hyperframes:example",
  "hyperframes:block",
  "hyperframes:component"
];
var FILE_TYPES = [
  "hyperframes:composition",
  "hyperframes:asset",
  "hyperframes:snippet",
  "hyperframes:style",
  "hyperframes:timeline"
];
var ITEM_TYPE_DIRS = {
  "hyperframes:example": "examples",
  "hyperframes:block": "blocks",
  "hyperframes:component": "components"
};
function isExampleItem(item) {
  return item.type === "hyperframes:example";
}
function isBlockItem(item) {
  return item.type === "hyperframes:block";
}
function isComponentItem(item) {
  return item.type === "hyperframes:component";
}

// ../core/src/canary.ts
function fnv1a32(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)) >>> 0;
  }
  return hash >>> 0;
}
function canaryBucket(feature, unitId) {
  return fnv1a32(`${feature}:${unitId}`) % 100;
}
function evaluateCanary(input) {
  if (input.override === true) return { enabled: true, reason: "forced_on" };
  if (input.override === false) return { enabled: false, reason: "forced_off" };
  const pct = Math.max(0, Math.min(100, Math.trunc(input.percentage)));
  if (pct <= 0) return { enabled: false, reason: "out_of_cohort" };
  if (pct >= 100) return { enabled: true, reason: "in_cohort" };
  if (input.exclude) return { enabled: false, reason: "excluded" };
  const unitId = input.unitId?.trim();
  if (!unitId) return { enabled: false, reason: "no_unit_id" };
  const bucket = canaryBucket(input.feature, unitId);
  return bucket < pct ? { enabled: true, reason: "in_cohort", bucket } : { enabled: false, reason: "out_of_cohort", bucket };
}
function parseCanaryOverride(raw) {
  const v = raw?.trim().toLowerCase();
  if (v === void 0 || v === "") return void 0;
  if (v === "1" || v === "true" || v === "on" || v === "yes") return true;
  if (v === "0" || v === "false" || v === "off" || v === "no") return false;
  return void 0;
}

// ../core/src/canaryRegistry.ts
var CANARIES = [
  // ── Calibration ──────────────────────────────────────────────────────────
  // Two INERT canaries that gate nothing. They exist to validate the rollout
  // mechanism against real traffic before anything real depends on it, and
  // they answer questions the synthetic tests cannot:
  //
  //   1. Does a requested percentage land on target in the wild? The unit
  //      tests use generated UUIDs and weight every install equally; real
  //      render volume is heavily skewed toward a few heavy installs, so the
  //      render-weighted share could differ from the install-weighted one.
  //   2. How fast does CUMULATIVE exposure drift above the target? Install
  //      ids churn (measured: 24.7x more distinct ids over 30 days than in
  //      any single day), so the set of installs enrolled AT SOME POINT grows
  //      even though the instantaneous share stays flat. That drift is the
  //      real limit on a canary's blast-radius guarantee.
  //   3. Are two canaries actually independent on real ids, not just on
  //      generated ones? Overlap should be ~p1*p2, not ~min(p1,p2).
  //
  // Two different percentages so the answer is a line, not a point.
  // Delete both once the calibration window is read.
  {
    name: "calibration-10",
    percentage: 10,
    description: "Inert. Validates rollout accuracy and cumulative-exposure drift at 10%.",
    owner: "vance",
    sunsetAfter: "2026-09-15"
  },
  {
    name: "calibration-50",
    percentage: 50,
    description: "Inert. Second calibration point, and an independence check against calibration-10.",
    owner: "vance",
    sunsetAfter: "2026-09-15"
  }
];
function findCanary(name) {
  return CANARIES.find((c) => c.name === name);
}
function canaryEnvVar(name) {
  return `HF_CANARY_${name.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`;
}
function overdueCanaries(now = /* @__PURE__ */ new Date()) {
  return CANARIES.filter((c) => {
    const sunsetEnd = Date.parse(`${c.sunsetAfter}T23:59:59.999Z`);
    return Number.isFinite(sunsetEnd) && now.getTime() > sunsetEnd;
  }).map((c) => c.name);
}

// ../core/src/vfx/fractalNoise.frag.ts
var HASH_CONSTANTS = {
  /** Odd 32-bit multipliers, one per lattice axis plus one for the seed. */
  mulX: 374761393,
  mulY: 668265263,
  mulMix: 1274126177,
  /** 2^32/φ — breaks the all-zero fixed point at lattice corner (0, 0). */
  offset: 2654435769,
  shift1: 13,
  shift2: 16,
  /** 2^32: maps the mixed 32-bit word into [0, 1). */
  divisor: 4294967296
};
var { mulX, mulY, mulMix, offset, shift1, shift2, divisor } = HASH_CONSTANTS;
var MAX_OCTAVES = 20;
var FRACTAL_NOISE_FRAG = `#version 300 es
precision highp float;
precision highp int;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_size;
uniform float u_t;
uniform float u_fps;
uniform float u_fractalType;
uniform float u_noiseType;
uniform float u_invert;
uniform float u_contrast;
uniform float u_brightness;
uniform float u_scale;
uniform float u_complexity;
uniform float u_subInfluence;
uniform float u_subScaling;
uniform float u_evolution;
uniform float u_randomSeed;
uniform float u_opacity;

float hfHashUnit(int ix, int iy, int seed) {
  uint h = ((uint(ix) * ${mulX}u) ^ (uint(iy) * ${mulY}u) ^ (uint(seed) * ${mulMix}u)) + ${offset}u;
  h = h ^ (h >> ${shift1}u);
  h = h * ${mulMix}u;
  h = h ^ (h >> ${shift2}u);
  return float(h) / ${divisor}.0;
}

float hfFade(float f, float noiseType) {
  if (noiseType < 1.5) return 0.0;
  if (noiseType < 2.5) return f;
  if (noiseType < 3.5) return f * f * (3.0 - 2.0 * f);
  return f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
}

float hfValueNoise(vec2 p, int seed) {
  vec2 cell = floor(p);
  vec2 f = p - cell;
  int ix = int(cell.x);
  int iy = int(cell.y);
  float sx = hfFade(f.x, u_noiseType);
  float sy = hfFade(f.y, u_noiseType);
  float bottom = mix(hfHashUnit(ix, iy, seed), hfHashUnit(ix + 1, iy, seed), sx);
  float top = mix(hfHashUnit(ix, iy + 1, seed), hfHashUnit(ix + 1, iy + 1, seed), sx);
  return mix(bottom, top, sy);
}

float hfFbm(vec2 p) {
  float lacunarity = 100.0 / max(u_subScaling, 1.0);
  float gain = u_subInfluence / 100.0;
  int seed = int(u_randomSeed);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 0.0;
  float norm = 0.0;
  for (int i = 0; i < ${MAX_OCTAVES}; i++) {
    if (float(i) >= u_complexity) break;
    sum += amp * hfValueNoise(p * freq, seed + i);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return norm > 0.0 ? sum / norm : 0.0;
}

void main() {
  vec2 px = v_uv * u_size;
  vec2 p = px / max(u_scale, 1.0) + vec2(u_evolution, u_evolution * 0.5);
  float v = hfFbm(p);
  v = (v - 0.5) * (u_contrast / 100.0) + 0.5 + u_brightness / 100.0;
  if (u_invert > 0.5) v = 1.0 - v;
  v = clamp(v, 0.0, 1.0);
  float a = clamp(u_opacity / 100.0, 0.0, 1.0);
  fragColor = vec4(v * a, v * a, v * a, a);
}
`;

// ../core/src/vfx/displacementMap.frag.ts
var DISPLACEMENT_MAP_CONSTANTS = {
  lumaR: 0.299,
  lumaG: 0.587,
  lumaB: 0.114
};
var { lumaR, lumaG, lumaB } = DISPLACEMENT_MAP_CONSTANTS;
var DISPLACEMENT_MAP_FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_size;
uniform float u_t;
uniform float u_fps;
uniform sampler2D u_src;
uniform sampler2D u_src2;
// 1 when the map ref named another element, 0 when the map is the layer
// itself. Set by the runtime for every pass, from whether a ref resolved.
uniform float u_hasSrc2;
uniform float u_useH;
uniform float u_maxH;
uniform float u_useV;
uniform float u_maxV;
uniform float u_behavior;
uniform float u_edge;
uniform float u_expand;

vec4 hfSampleSrc(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  return texture(u_src, uv);
}

// The selector's value, in [0, 1]. Half and Off both land on 0.5, which is the
// "no displacement" midpoint the caller subtracts.
float hfMapChannel(vec4 premultiplied, float selector) {
  vec3 rgb = premultiplied.a > 0.0 ? premultiplied.rgb / premultiplied.a : vec3(0.0);
  if (selector < 1.5) return rgb.r;
  if (selector < 2.5) return rgb.g;
  if (selector < 3.5) return rgb.b;
  if (selector < 4.5) return premultiplied.a;
  if (selector < 8.5) return dot(rgb, vec3(${lumaR}, ${lumaG}, ${lumaB}));
  if (selector < 9.5) return 1.0;
  return 0.5;
}

void main() {
  vec4 mapTexel = u_hasSrc2 > 0.5 ? texture(u_src2, v_uv) : texture(u_src, v_uv);
  float h = hfMapChannel(mapTexel, u_useH);
  float v = hfMapChannel(mapTexel, u_useV);
  vec2 d = vec2((h - 0.5) * 2.0 * u_maxH, (v - 0.5) * 2.0 * u_maxV);
  fragColor = hfSampleSrc(v_uv + d / u_size);
}
`;

// ../core/src/vfx/lumaMatte.frag.ts
var { lumaR: lumaR2, lumaG: lumaG2, lumaB: lumaB2 } = DISPLACEMENT_MAP_CONSTANTS;
var LUMA_MATTE_FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_size;
uniform float u_t;
uniform float u_fps;
uniform sampler2D u_src;
uniform sampler2D u_src2;
uniform float u_mode;

// The matte texel is premultiplied, so its rgb is already "over black" \u2014 the
// composite After Effects reads a luma matte through.
float hfCoverage(vec4 matte, float mode) {
  if (mode < 1.5) return matte.a;
  if (mode < 2.5) return 1.0 - matte.a;
  float luma = dot(matte.rgb, vec3(${lumaR2}, ${lumaG2}, ${lumaB2}));
  if (mode < 3.5) return luma;
  return 1.0 - luma;
}

void main() {
  vec4 src = texture(u_src, v_uv);
  vec4 matte = texture(u_src2, v_uv);
  fragColor = src * clamp(hfCoverage(matte, u_mode), 0.0, 1.0);
}
`;

// ../core/src/vfx/noise.frag.ts
var NOISE_CONSTANTS = {
  lcgMulA: 1103515245,
  lcgMulB: 12996205,
  lcgAdd: 12345,
  highMask: 32640,
  lowMask: 255,
  byteScale: 32704
};
var { lcgMulA, lcgMulB, lcgAdd, highMask, lowMask, byteScale } = NOISE_CONSTANTS;
var NOISE_FRAG = `#version 300 es
precision highp float;
// NOT decoration: a fragment shader's default integer precision is mediump,
// and a mediump uint is only guaranteed 16 bits (ESSL 3.00 \xA74.5.2). Every step
// below \u2014 the Jenkins mix, both LCG rounds \u2014 is defined by 32-bit wraparound,
// so without this the hash is a different function on any implementation that
// honours the minimum. ANGLE and SwiftShader both use 32-bit ints, which is
// exactly why no test on this machine would catch it.
precision highp int;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_size;
uniform float u_t;
uniform float u_fps;
uniform sampler2D u_src;
uniform float u_amount;
uniform float u_useColorNoise;
uniform float u_clipping;

// Bob Jenkins' 1997 integer mix, the six-round shift/xor/subtract sequence the
// metallib runs verbatim. uint arithmetic wraps in GLSL ES 3.00, which is what
// makes this bit-identical to the C original.
uint hfJenkinsMix(uint a, uint b, uint c) {
  a -= b; a -= c; a ^= (c >> 13u);
  b -= c; b -= a; b ^= (a << 8u);
  c -= a; c -= b; c ^= (b >> 13u);
  a -= b; a -= c; a ^= (c >> 12u);
  b -= c; b -= a; b ^= (a << 16u);
  c -= a; c -= b; c ^= (b >> 5u);
  a -= b; a -= c; a ^= (c >> 3u);
  b -= c; b -= a; b ^= (a << 10u);
  c -= a; c -= b; c ^= (b >> 15u);
  return c;
}

// The hash's 15-bit output byte for one channel.
float hfNoiseByte(uint a, uint y, uint seed) {
  uint h = hfJenkinsMix(a, y, seed);
  uint t2 = h * ${lcgMulA}u + ${lcgAdd}u;
  uint t4 = t2 * ${lcgMulB}u + ${lcgAdd}u;
  return float(((t4 >> 16u) & ${lowMask}u) ^ ((t2 >> 9u) & ${highMask}u));
}

void main() {
  vec4 src = texture(u_src, v_uv);
  vec2 px = floor(v_uv * u_size);
  uint x = uint(max(px.x, 0.0));
  // After Effects indexes rows from the top; v_uv is y-up.
  uint y = uint(max(u_size.y - 1.0 - px.y, 0.0));
  float frame = floor(u_t * u_fps + 0.5);
  uint seed = uint(max(frame, 0.0)) & 0xFFFFu;

  float amount = u_amount * 0.01;
  vec3 nz;
  if (u_useColorNoise > 0.5) {
    uint a = x * 3u;
    nz = vec3(hfNoiseByte(a, y, seed), hfNoiseByte(a + 1u, y, seed), hfNoiseByte(a + 2u, y, seed));
  } else {
    nz = vec3(hfNoiseByte(x, y, seed));
  }
  nz = amount * (nz / ${byteScale}.0 - 0.5);

  vec4 out4 = vec4(src.rgb + nz, src.a);
  // A valid premultiplied colour needs rgb <= a component-wise; noise on a
  // near-transparent texel can push rgb above it, which our fixed 8-bit RGBA
  // storage cannot carry safely the way AE's float pipeline can (see the doc
  // comment above). This runs before, and independently of, u_clipping.
  out4.rgb = min(out4.rgb, out4.a);
  fragColor = u_clipping > 0.5 ? clamp(out4, 0.0, 1.0) : out4;
}
`;

// ../core/src/vfx/waveWarp.frag.ts
var WAVE_WARP_CONSTANTS = {
  tau: 6.283185307179586,
  degreesPerTurn: 360
};
var { tau, degreesPerTurn } = WAVE_WARP_CONSTANTS;
var WAVE_WARP_FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_size;
uniform float u_t;
uniform float u_fps;
uniform sampler2D u_src;
uniform float u_waveType;
uniform float u_height;
uniform float u_width;
uniform float u_direction;
uniform float u_speed;
uniform float u_pinning;
uniform float u_phase;

// Outside the layer's own box there is nothing to warp in from, so the wave
// carries transparency rather than a smeared edge pixel.
vec4 hfSampleSrc(vec2 uv) {
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  return texture(u_src, uv);
}

void main() {
  vec2 px = v_uv * u_size;
  float dir = radians(u_direction);
  vec2 travel = vec2(sin(dir), -cos(dir));
  vec2 swing = vec2(-travel.y, travel.x);
  float proj = (px.x + 1.0) * travel.x + px.y * travel.y;
  float turns = proj / max(u_width, 1.0) + u_phase / ${degreesPerTurn}.0 + u_speed * u_t;
  float disp = u_height * sin(${tau} * turns);
  fragColor = hfSampleSrc((px + swing * disp) / u_size);
}
`;

// ../core/src/vfx.ts
var HF_VFX_ATTR = "data-vfx-chain";
var HF_VFX_CHAIN_VERSION = 1;
var DISPLACEMENT_CHANNELS = [
  { value: 1, label: "Red" },
  { value: 2, label: "Green" },
  { value: 3, label: "Blue" },
  { value: 4, label: "Alpha" },
  { value: 5, label: "Luminance" },
  { value: 6, label: "Hue" },
  { value: 7, label: "Lightness" },
  { value: 8, label: "Saturation" },
  { value: 9, label: "Full" },
  { value: 10, label: "Half" },
  { value: 11, label: "Off" }
];
var HF_VFX = [
  {
    id: "fractal-noise",
    label: "Fractal Noise",
    ae: "ADBE Fractal Noise",
    capture: "none",
    frag: FRACTAL_NOISE_FRAG,
    params: [
      {
        kind: "enum",
        key: "fractalType",
        label: "Fractal Type",
        options: [{ value: 1, label: "Basic" }],
        default: 1,
        hint: "Only Basic is implemented in v1."
      },
      {
        kind: "enum",
        key: "noiseType",
        label: "Noise Type",
        options: [
          { value: 1, label: "Block" },
          { value: 2, label: "Linear" },
          { value: 3, label: "Soft Linear" },
          { value: 4, label: "Spline" }
        ],
        default: 3
      },
      { kind: "bool", key: "invert", label: "Invert", default: false },
      {
        kind: "number",
        key: "contrast",
        label: "Contrast",
        unit: "%",
        min: 0,
        max: 1e3,
        step: 1,
        default: 100
      },
      {
        kind: "number",
        key: "brightness",
        label: "Brightness",
        unit: "",
        min: -1e3,
        max: 1e3,
        step: 1,
        default: 0
      },
      {
        kind: "number",
        key: "scale",
        label: "Scale",
        unit: "%",
        min: 6,
        max: 1e4,
        step: 1,
        default: 100
      },
      {
        kind: "number",
        key: "complexity",
        label: "Complexity",
        unit: "",
        min: 1,
        max: 20,
        step: 1,
        default: 6
      },
      {
        kind: "number",
        key: "subInfluence",
        label: "Sub Influence",
        unit: "%",
        min: 0,
        max: 100,
        step: 1,
        default: 70
      },
      {
        kind: "number",
        key: "subScaling",
        label: "Sub Scaling",
        unit: "%",
        min: 0,
        max: 100,
        step: 1,
        default: 56
      },
      {
        kind: "number",
        key: "evolution",
        label: "Evolution",
        unit: "revolutions",
        min: -1e4,
        max: 1e4,
        step: 0.01,
        default: 0,
        animatable: true
      },
      {
        kind: "number",
        key: "randomSeed",
        label: "Random Seed",
        unit: "",
        min: 0,
        max: 99999,
        step: 1,
        default: 0
      },
      {
        kind: "number",
        key: "opacity",
        label: "Opacity",
        unit: "%",
        min: 0,
        max: 100,
        step: 1,
        default: 100,
        animatable: true
      }
    ]
  },
  {
    id: "wave-warp",
    label: "Wave Warp",
    ae: "ADBE Wave Warp",
    capture: "self",
    frag: WAVE_WARP_FRAG,
    params: [
      {
        kind: "enum",
        key: "waveType",
        label: "Wave Type",
        options: [{ value: 1, label: "Sine" }],
        default: 1,
        hint: "Only Sine is implemented in v1; the exporter marks the others cosmetic."
      },
      {
        kind: "number",
        key: "height",
        label: "Wave Height",
        unit: "px",
        min: -1e3,
        max: 1e3,
        step: 1,
        default: 10,
        animatable: true
      },
      {
        kind: "number",
        key: "width",
        label: "Wave Width",
        unit: "px",
        min: 1,
        max: 1e4,
        step: 1,
        default: 40,
        animatable: true
      },
      {
        kind: "number",
        key: "direction",
        label: "Direction",
        unit: "deg",
        min: -360,
        max: 360,
        step: 1,
        default: 90
      },
      {
        kind: "number",
        key: "speed",
        label: "Wave Speed",
        unit: "waves/s",
        min: -100,
        max: 100,
        step: 0.1,
        default: 1
      },
      {
        kind: "enum",
        key: "pinning",
        label: "Pinning",
        options: [{ value: 1, label: "None" }],
        default: 1,
        hint: "Only None is implemented in v1; the exporter marks the others cosmetic."
      },
      {
        kind: "number",
        key: "phase",
        label: "Phase",
        unit: "deg",
        min: -360,
        max: 360,
        step: 1,
        default: 0,
        animatable: true
      }
    ]
  },
  {
    id: "displacement-map",
    label: "Displacement Map",
    ae: "ADBE Displacement Map",
    capture: "self",
    frag: DISPLACEMENT_MAP_FRAG,
    params: [
      {
        kind: "ref",
        key: "map",
        label: "Displacement Map Layer",
        // Optional: empty means the AE default the corpus uses, a map layer
        // pointing at the layer itself, which `u_src` already holds.
        optional: true
      },
      {
        kind: "enum",
        key: "useH",
        label: "Use For Horizontal Displacement",
        options: DISPLACEMENT_CHANNELS,
        default: 1,
        hint: "Hue, Lightness and Saturation are read as Luminance in v1."
      },
      {
        kind: "number",
        key: "maxH",
        label: "Max Horizontal Displacement",
        unit: "px",
        min: -32e3,
        max: 32e3,
        step: 1,
        default: 5,
        animatable: true
      },
      {
        kind: "enum",
        key: "useV",
        label: "Use For Vertical Displacement",
        options: DISPLACEMENT_CHANNELS,
        default: 2,
        hint: "Hue, Lightness and Saturation are read as Luminance in v1."
      },
      {
        kind: "number",
        key: "maxV",
        label: "Max Vertical Displacement",
        unit: "px",
        min: -32e3,
        max: 32e3,
        step: 1,
        default: 5,
        animatable: true
      },
      {
        kind: "enum",
        key: "behavior",
        label: "Displacement Map Behavior",
        options: [{ value: 1, label: "Center Map" }],
        default: 1,
        hint: "Only Center Map is implemented in v1."
      },
      {
        kind: "enum",
        key: "edge",
        label: "Edge Behavior",
        options: [{ value: 0, label: "Off" }],
        default: 0,
        hint: "Only Off (transparent outside the layer) is implemented in v1."
      },
      {
        kind: "bool",
        key: "expand",
        label: "Expand Output",
        default: true
      }
    ]
  },
  {
    id: "luma-matte",
    label: "Matte",
    // Not one AE effect: the runtime form of every matte the exporter cannot
    // express as CSS — unsupported track-matte sources, stencils and
    // silhouettes, Set Matte. Which element is the source and which the matte
    // is the exporter's choice of what to wrap and what to name in `matte`.
    capture: "self",
    frag: LUMA_MATTE_FRAG,
    params: [
      { kind: "ref", key: "matte", label: "Matte Layer" },
      {
        kind: "enum",
        key: "mode",
        label: "Matte Mode",
        options: [
          { value: 1, label: "Alpha" },
          { value: 2, label: "Alpha Inverted" },
          { value: 3, label: "Luma" },
          { value: 4, label: "Luma Inverted" }
        ],
        default: 1
      }
    ]
  },
  {
    id: "noise",
    label: "Noise",
    ae: "ADBE Noise",
    // `self` on a content layer and `backdrop` on an adjustment layer are the
    // same kernel reading the same `u_src`; the runtime resolves which from
    // the DOM (a `data-vfx-for` wrapper), so the def declares only that a
    // texture is needed.
    capture: "self",
    frag: NOISE_FRAG,
    params: [
      {
        kind: "number",
        key: "amount",
        label: "Amount of Noise",
        unit: "%",
        min: 0,
        max: 400,
        step: 0.1,
        default: 0,
        animatable: true
      },
      {
        kind: "bool",
        key: "useColorNoise",
        label: "Use Color Noise",
        default: false
      },
      {
        kind: "bool",
        key: "clipping",
        label: "Clip Result Values",
        default: true
      }
    ]
  }
];
var BY_ID2 = new Map(HF_VFX.map((d) => [d.id, d]));
function getVfxDef(id) {
  return BY_ID2.get(id);
}
function normalizeVfxParams(id, values) {
  const def = BY_ID2.get(id);
  if (!def) return {};
  const out = {};
  for (const p of def.params) {
    const raw = values?.[p.key];
    out[p.key] = p.kind === "enum" ? normalizeEnumParam(p, raw) : p.kind === "bool" ? normalizeBoolParam(p, raw) : p.kind === "ref" ? normalizeRefParam(raw) : normalizeNumberParam(p, raw);
  }
  return out;
}
function coerceFiniteNumber(raw) {
  const n = typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() !== "" ? Number(raw) : Number.NaN;
  return Number.isFinite(n) ? n : void 0;
}
function normalizeEnumParam(p, raw) {
  const n = coerceFiniteNumber(raw);
  return n !== void 0 && p.options.some((o) => o.value === n) ? n : p.default;
}
function normalizeBoolParam(p, raw) {
  return typeof raw === "boolean" ? raw : p.default;
}
function normalizeRefParam(raw) {
  return typeof raw === "string" ? raw : "";
}
function normalizeNumberParam(p, raw) {
  const n = coerceFiniteNumber(raw);
  return n !== void 0 ? Math.min(p.max, Math.max(p.min, n)) : p.default;
}
var VfxChainError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "VfxChainError";
  }
};
function enabledVfxNodes(chain) {
  return chain.nodes.filter((n) => n.enabled !== false);
}
var CAPTURE_RANK = { none: 0, self: 1, backdrop: 2 };
function chainCapture(chain) {
  let best = "none";
  for (const node of enabledVfxNodes(chain)) {
    const def = BY_ID2.get(node.type);
    if (def && CAPTURE_RANK[def.capture] > CAPTURE_RANK[best]) best = def.capture;
  }
  return best;
}
function parseVfxChain(json) {
  let raw;
  try {
    raw = JSON.parse(json);
  } catch (err) {
    throw new VfxChainError(`Chain file is not valid JSON: ${err.message}`);
  }
  if (typeof raw !== "object" || raw === null) {
    throw new VfxChainError("Chain file must be a JSON object.");
  }
  const obj = raw;
  if (obj.version !== HF_VFX_CHAIN_VERSION) {
    throw new VfxChainError(`Unsupported chain version: ${String(obj.version)}`);
  }
  if (!Array.isArray(obj.nodes)) {
    throw new VfxChainError("Chain file is missing a `nodes` array.");
  }
  const nodes = obj.nodes.map(parseVfxNode);
  return { version: HF_VFX_CHAIN_VERSION, nodes };
}
function serializeVfxChain(chain) {
  return JSON.stringify({
    version: HF_VFX_CHAIN_VERSION,
    nodes: chain.nodes.map(serializeVfxNode)
  });
}
function isPlainObject2(v) {
  return typeof v === "object" && v !== null;
}
function requireVfxNodeType(node, i) {
  if (typeof node.type !== "string" || !BY_ID2.has(node.type)) {
    throw new VfxChainError(`Node ${i} has unknown effect type: ${String(node.type)}`);
  }
  return node.type;
}
function requireVfxNodeId(node, i) {
  if (typeof node.id !== "string" || node.id === "") {
    throw new VfxChainError(`Node ${i} is missing an id.`);
  }
  return node.id;
}
function parseVfxNode(n, i) {
  if (!isPlainObject2(n)) {
    throw new VfxChainError(`Node ${i} is not an object.`);
  }
  const node = n;
  const type = requireVfxNodeType(node, i);
  const id = requireVfxNodeId(node, i);
  const params = isPlainObject2(node.params) ? node.params : {};
  return withoutUndefined({
    type,
    id,
    enabled: node.enabled === false ? false : void 0,
    params
  });
}
function serializeVfxNode(node) {
  return withoutUndefined({
    type: node.type,
    id: node.id,
    enabled: node.enabled === false ? false : void 0,
    params: node.params
  });
}
function withoutUndefined(obj) {
  for (const key of Object.keys(obj)) {
    if (obj[key] === void 0) delete obj[key];
  }
  return obj;
}

export {
  resolveAuthoredTimingWindow,
  toFps,
  fpsToNumber,
  fpsToFfmpegArg,
  parseFps,
  parseFpsWithDefault,
  generateBaseHtml,
  getStageStyles,
  GSAP_CDN,
  BASE_STYLES,
  ELEMENT_BASE_STYLES,
  MEDIA_STYLES,
  TEXT_STYLES,
  ZOOM_CONTAINER_STYLES,
  generateHyperframesStyles,
  generateGsapTimelineScript,
  generateHyperframesHtml,
  resolveTimings,
  shiftRateLane,
  sourceTimeAt,
  timeAtSourceTime,
  normalizePlaybackRate,
  parseStrictFiniteTimingNumber,
  readElementPlaybackRate,
  normalizeRateSpec,
  readElementRateSpec,
  readMediaStart,
  resolveNaturalMediaTimelineDuration,
  resolveNaturalMediaTimelineDurationFromValues,
  MEDIA_DURATION_CLAMP_EPSILON_SECONDS,
  shouldClampMediaDuration,
  shouldClampResolvedMediaDuration,
  compileTimingAttrs,
  injectDurations,
  extractResolvedMedia,
  clampDurations,
  AUDIBLE_MEDIA_SELECTOR,
  isAudibleVideoElement,
  audibleVideoNeedsWebAudio,
  MEDIA_RENDER_ID_ATTR,
  AUDIO_GROUP_RENDER_ID_ATTR,
  assignMediaRenderIds,
  RENDER_FRAME_ID_PREFIX,
  RENDER_FRAME_ID_SUFFIX,
  renderFrameIdForRenderId,
  RUNTIME_BOOTSTRAP_ATTR,
  stripEmbeddedRuntimeScripts,
  COMPOSITION_SOURCE_URL,
  queryByAttr,
  parseAnimatedGifMetadata,
  gifClearsAfterLeavingFrameInPlace,
  clearGifFramesBeforeNext,
  CubeLutParseError,
  parseCubeLut,
  HF_COLOR_GRADING_ATTR,
  HF_COLOR_GRADING_CANVAS_ID_PREFIX,
  HF_COLOR_GRADING_COLOR_SPACE,
  HF_COLOR_GRADING_TOP_LEVEL_KEYS,
  HF_COLOR_GRADING_LUT_KEYS,
  HF_COLOR_GRADING_PALETTES,
  HF_COLOR_GRADING_ADJUST_KEYS,
  HF_COLOR_GRADING_WHEEL_KEYS,
  HF_COLOR_GRADING_CURVE_KEYS,
  HF_COLOR_GRADING_HUE_CURVE_KEYS,
  HF_COLOR_GRADING_DETAIL_KEYS,
  HF_COLOR_GRADING_EFFECT_KEYS,
  HF_COLOR_GRADING_PRESETS,
  HF_COLOR_GRADING_ACTIVE_EFFECT_KEYS,
  HF_COLOR_GRADING_EFFECT_PRESETS,
  HF_COLOR_GRADING_GRADE_PRESETS,
  HF_COLOR_GRADING_EFFECT_APPLY_DEFAULTS,
  HF_COLOR_GRADING_ANIMATABLE_PROPERTIES,
  getHfColorGradingCapabilities,
  resolveHfColorGradingVariables,
  normalizeHfColorGrading,
  normalizeHfColorGradingWithVariables,
  serializeHfColorGrading,
  isHfColorGradingActive,
  hasHfColorGradingAuthoredValues,
  hdrToSdrToneMapFilter,
  firstFrameColourArgs,
  parseFirstFrameColour,
  buildHyperframesRuntimeScript,
  HYPERFRAME_RUNTIME_GLOBALS,
  HYPERFRAME_BRIDGE_SOURCES,
  HYPERFRAME_CONTROL_ACTIONS,
  HYPERFRAME_RUNTIME_ARTIFACTS,
  HYPERFRAME_RUNTIME_CONTRACT,
  loadHyperframeRuntimeSource,
  getHyperframeRuntimeScript,
  MEDIA_VISUAL_STYLE_PROPERTIES,
  quantizeTimeToFrame,
  quantizeSeekTime,
  exportClipWindow,
  copyMediaVisualStyles,
  redactKnownPaths,
  redactTelemetryString,
  realpath,
  isSafePath,
  resolveWithinProject,
  ProjectRootMissingError,
  isProjectRootMissing,
  folderGone,
  realProjectRoot,
  mkdirWithinProject,
  PROJECT_MARKER_FILES,
  isHyperframesProject,
  createGSAPFrameAdapter,
  fitTextFontSize,
  formatRenderOutputTimestamp,
  segmentStructuredText,
  structuredTextSeed,
  createStructuredTextRng,
  validateStructuredTextRecipe,
  compileStructuredTextMotion,
  isStructuredTextPreset,
  structuredMotionSelector,
  snapshotStructuredText,
  restoreStructuredText,
  unwrapStructuredText,
  materializeStructuredText,
  getVariables,
  createRuntimeStartTimeResolver,
  hasClipStarted,
  isInClipWindow,
  isClipVisibleAt,
  validateVariables,
  formatVariableValidationIssue,
  parseVisualComponentData,
  serializeVisualComponentData,
  createVisualComponentDataRow,
  formatVisualComponentDataForAi,
  VISUAL_COMPONENT_CATEGORIES,
  resolveVisualComponentCategory,
  ITEM_TYPES,
  FILE_TYPES,
  ITEM_TYPE_DIRS,
  isExampleItem,
  isBlockItem,
  isComponentItem,
  canaryBucket,
  evaluateCanary,
  parseCanaryOverride,
  CANARIES,
  findCanary,
  canaryEnvVar,
  overdueCanaries,
  HF_VFX_ATTR,
  HF_VFX_CHAIN_VERSION,
  HF_VFX,
  getVfxDef,
  normalizeVfxParams,
  chainCapture,
  parseVfxChain,
  serializeVfxChain
};
