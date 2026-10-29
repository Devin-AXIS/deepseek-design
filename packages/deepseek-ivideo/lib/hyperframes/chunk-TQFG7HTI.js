import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../parsers/dist/compositionContract.js
var COMPOSITION_CONTRACT_VERSION = 1;
var COMPOSITION_ATTRIBUTES = Object.freeze({
  start: "data-start",
  duration: "data-duration",
  trackIndex: "data-track-index",
  derivedEnd: "data-end",
  legacyTrack: "data-layer"
});
var CANONICAL_AUTHORED_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.start,
  COMPOSITION_ATTRIBUTES.duration,
  COMPOSITION_ATTRIBUTES.trackIndex
]);
var DERIVED_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.derivedEnd
]);
var LEGACY_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.derivedEnd,
  COMPOSITION_ATTRIBUTES.legacyTrack
]);
var ClipTimingWriteError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "ClipTimingWriteError";
    this.code = code;
  }
};
function parseNumeric(value) {
  if (value == null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
var REFERENCE_ID_PATTERN = /^[A-Za-z0-9_.:-]+$/;
function isAsciiDigitAt(value, index) {
  const code = value.charCodeAt(index);
  return code >= 48 && code <= 57;
}
function skipDigitsLeft(value, start) {
  let cursor = start;
  while (cursor >= 0 && isAsciiDigitAt(value, cursor)) cursor--;
  return cursor;
}
function skipWhitespaceLeft(value, start) {
  let cursor = start;
  while (cursor >= 0 && (value[cursor] ?? "").trim() === "") cursor--;
  return cursor;
}
function findMagnitudeStart(value) {
  const last = value.length - 1;
  if (!isAsciiDigitAt(value, last)) return null;
  let cursor = skipDigitsLeft(value, last);
  if (value[cursor] === ".") cursor = skipDigitsLeft(value, cursor - 1);
  return cursor + 1;
}
function parseReferenceOffset(value) {
  const magnitudeStart = findMagnitudeStart(value);
  if (magnitudeStart == null) return null;
  const operatorIndex = skipWhitespaceLeft(value, magnitudeStart - 1);
  const operator = value[operatorIndex];
  if (operator !== "+" && operator !== "-") return null;
  const refId = value.slice(0, operatorIndex).trim();
  if (!REFERENCE_ID_PATTERN.test(refId)) return null;
  const magnitude = Number(value.slice(magnitudeStart));
  if (!Number.isFinite(magnitude)) return null;
  return { refId, operator, magnitude };
}
function parseStartExpression(raw) {
  const normalized = (raw ?? "").trim();
  if (!normalized) return null;
  const absolute = parseNumeric(normalized);
  if (absolute != null) return { kind: "absolute", value: absolute };
  if (REFERENCE_ID_PATTERN.test(normalized)) {
    return { kind: "reference", refId: normalized, offset: 0 };
  }
  const reference = parseReferenceOffset(normalized);
  if (!reference) return null;
  return {
    kind: "reference",
    refId: reference.refId,
    offset: reference.operator === "-" ? -reference.magnitude : reference.magnitude
  };
}
function pushDiagnostic(diagnostics, code, attribute, value) {
  diagnostics.push({ code, attribute, value });
}
function resolveStart(expression, rawStart, options, diagnostics) {
  if (rawStart == null || rawStart.trim() === "") {
    return options.defaultStart === void 0 ? 0 : options.defaultStart;
  }
  if (!expression) {
    pushDiagnostic(diagnostics, "invalid-start", COMPOSITION_ATTRIBUTES.start, rawStart);
    return null;
  }
  if (expression.kind === "absolute") return Math.max(0, expression.value);
  const referencedEnd = options.resolveReferenceEnd?.(expression.refId);
  if (referencedEnd == null || !Number.isFinite(referencedEnd)) {
    pushDiagnostic(
      diagnostics,
      "unresolved-start-reference",
      COMPOSITION_ATTRIBUTES.start,
      rawStart
    );
    return null;
  }
  return Math.max(0, referencedEnd + expression.offset);
}
var DERIVED_END_EQUALITY_EPSILON_SECONDS = 1e-9;
function derivedEndsAreConsistent(parsedEnd, canonicalEnd) {
  return Math.abs(parsedEnd - canonicalEnd) <= DERIVED_END_EQUALITY_EPSILON_SECONDS;
}
function diagnoseDerivedEnd(rawEnd, canonicalEnd, diagnostics) {
  const parsedEnd = parseNumeric(rawEnd);
  if (parsedEnd == null) {
    pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    pushDiagnostic(diagnostics, "invalid-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return;
  }
  if (canonicalEnd == null) {
    pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return;
  }
  if (derivedEndsAreConsistent(parsedEnd, canonicalEnd)) {
    return;
  }
  pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
  pushDiagnostic(diagnostics, "conflicting-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
}
function readCanonicalDuration(rawDuration, start, diagnostics) {
  const duration = parseNumeric(rawDuration);
  if (duration == null || duration < 0) {
    pushDiagnostic(diagnostics, "invalid-duration", COMPOSITION_ATTRIBUTES.duration, rawDuration);
    return { duration: null, end: null, durationSource: "invalid" };
  }
  return {
    duration,
    end: start == null ? null : start + duration,
    durationSource: "duration"
  };
}
function readLegacyEnd(rawEnd, start, diagnostics) {
  pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
  const end = parseNumeric(rawEnd);
  if (end == null) {
    pushDiagnostic(diagnostics, "invalid-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return { duration: null, end: null, durationSource: "invalid" };
  }
  if (start == null) return { duration: null, end, durationSource: "legacy-end" };
  if (end < start) {
    pushDiagnostic(diagnostics, "end-before-start", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return { duration: null, end: null, durationSource: "invalid" };
  }
  return { duration: end - start, end, durationSource: "legacy-end" };
}
function readDuration(attributes, start, diagnostics) {
  const rawDuration = attributes.getAttribute(COMPOSITION_ATTRIBUTES.duration);
  const rawEnd = attributes.getAttribute(COMPOSITION_ATTRIBUTES.derivedEnd);
  if (rawDuration == null) {
    return rawEnd == null ? { duration: null, end: null, durationSource: "missing" } : readLegacyEnd(rawEnd, start, diagnostics);
  }
  const canonical = readCanonicalDuration(rawDuration, start, diagnostics);
  if (rawEnd != null) diagnoseDerivedEnd(rawEnd, canonical.end, diagnostics);
  return canonical;
}
function readTrackValue(rawValue, attribute, source, diagnostics) {
  const trackIndex = parseNumeric(rawValue);
  if (trackIndex == null || !Number.isInteger(trackIndex)) {
    pushDiagnostic(diagnostics, "invalid-track-index", attribute, rawValue);
    return { trackIndex: 0, trackSource: "invalid" };
  }
  return { trackIndex, trackSource: source };
}
function readTrack(attributes, diagnostics) {
  const rawTrack = attributes.getAttribute(COMPOSITION_ATTRIBUTES.trackIndex);
  const rawLayer = attributes.getAttribute(COMPOSITION_ATTRIBUTES.legacyTrack);
  if (rawTrack == null && rawLayer == null) return { trackIndex: 0, trackSource: "default" };
  if (rawTrack == null && rawLayer != null) {
    pushDiagnostic(diagnostics, "deprecated-layer", COMPOSITION_ATTRIBUTES.legacyTrack, rawLayer);
    return readTrackValue(
      rawLayer,
      COMPOSITION_ATTRIBUTES.legacyTrack,
      "legacy-layer",
      diagnostics
    );
  }
  const canonical = readTrackValue(
    rawTrack ?? "",
    COMPOSITION_ATTRIBUTES.trackIndex,
    "track-index",
    diagnostics
  );
  if (rawLayer == null) return canonical;
  pushDiagnostic(diagnostics, "deprecated-layer", COMPOSITION_ATTRIBUTES.legacyTrack, rawLayer);
  const parsedLayer = parseNumeric(rawLayer);
  if (parsedLayer != null && parsedLayer !== canonical.trackIndex) {
    pushDiagnostic(diagnostics, "conflicting-layer", COMPOSITION_ATTRIBUTES.legacyTrack, rawLayer);
  }
  return canonical;
}
function readClipTiming(attributes, options = {}) {
  const diagnostics = [];
  const rawStart = attributes.getAttribute(COMPOSITION_ATTRIBUTES.start);
  const startExpression = parseStartExpression(rawStart);
  const start = resolveStart(startExpression, rawStart, options, diagnostics);
  const duration = readDuration(attributes, start, diagnostics);
  const track = readTrack(attributes, diagnostics);
  return { startExpression, start, ...duration, ...track, diagnostics };
}
function serializeStartNumber(start) {
  if (!Number.isFinite(start)) {
    throw new ClipTimingWriteError("invalid-start", "start must be finite");
  }
  return String(start);
}
function serializeStartReference(start) {
  if (start.kind === "absolute") return serializeStartNumber(start.value);
  if (!start.refId || !Number.isFinite(start.offset)) {
    throw new ClipTimingWriteError(
      "invalid-start",
      "reference start must have an id and finite offset"
    );
  }
  if (start.offset === 0) return start.refId;
  return `${start.refId} ${start.offset < 0 ? "-" : "+"} ${Math.abs(start.offset)}`;
}
function serializeStart(start) {
  if (typeof start === "number") return serializeStartNumber(start);
  if (typeof start === "object" && start != null) return serializeStartReference(start);
  if (typeof start === "string" && parseStartExpression(start)) return start.trim();
  throw new ClipTimingWriteError("invalid-start", `invalid start expression: ${start ?? ""}`);
}
function writeDuration(attributes, duration, current) {
  if (duration === null) {
    attributes.removeAttribute(COMPOSITION_ATTRIBUTES.duration);
    return;
  }
  if (duration === void 0) {
    if (attributes.getAttribute(COMPOSITION_ATTRIBUTES.duration) == null && current.duration != null) {
      attributes.setAttribute(COMPOSITION_ATTRIBUTES.duration, String(current.duration));
    }
    return;
  }
  if (!Number.isFinite(duration) || duration < 0) {
    throw new ClipTimingWriteError(
      "invalid-duration",
      "duration must be a finite, non-negative number"
    );
  }
  attributes.setAttribute(COMPOSITION_ATTRIBUTES.duration, String(duration));
}
function writeTrack(attributes, trackIndex, current) {
  if (trackIndex === null) {
    attributes.removeAttribute(COMPOSITION_ATTRIBUTES.trackIndex);
    return;
  }
  if (trackIndex === void 0) {
    if (attributes.getAttribute(COMPOSITION_ATTRIBUTES.trackIndex) == null && current.trackSource === "legacy-layer") {
      attributes.setAttribute(COMPOSITION_ATTRIBUTES.trackIndex, String(current.trackIndex));
    }
    return;
  }
  if (!Number.isFinite(trackIndex) || !Number.isInteger(trackIndex)) {
    throw new ClipTimingWriteError("invalid-track-index", "trackIndex must be a finite integer");
  }
  attributes.setAttribute(COMPOSITION_ATTRIBUTES.trackIndex, String(trackIndex));
}
function writeClipTiming(attributes, update) {
  const current = readClipTiming(attributes);
  if (update.start !== void 0) {
    attributes.setAttribute(COMPOSITION_ATTRIBUTES.start, serializeStart(update.start));
  }
  writeDuration(attributes, update.duration, current);
  writeTrack(attributes, update.trackIndex, current);
  const preserveUnresolvedLegacyEnd = update.duration === void 0 && attributes.getAttribute(COMPOSITION_ATTRIBUTES.duration) == null && attributes.getAttribute(COMPOSITION_ATTRIBUTES.derivedEnd) != null && current.duration == null;
  if (!preserveUnresolvedLegacyEnd) {
    attributes.removeAttribute(COMPOSITION_ATTRIBUTES.derivedEnd);
  }
  attributes.removeAttribute(COMPOSITION_ATTRIBUTES.legacyTrack);
  return readClipTiming(attributes);
}

// ../parsers/dist/mediaDuration.js
var COMPOSITION_ATTRIBUTES2 = Object.freeze({
  start: "data-start",
  duration: "data-duration",
  trackIndex: "data-track-index",
  derivedEnd: "data-end",
  legacyTrack: "data-layer"
});
var CANONICAL_AUTHORED_TIMING_ATTRIBUTES2 = Object.freeze([
  COMPOSITION_ATTRIBUTES2.start,
  COMPOSITION_ATTRIBUTES2.duration,
  COMPOSITION_ATTRIBUTES2.trackIndex
]);
var DERIVED_TIMING_ATTRIBUTES2 = Object.freeze([
  COMPOSITION_ATTRIBUTES2.derivedEnd
]);
var LEGACY_TIMING_ATTRIBUTES2 = Object.freeze([
  COMPOSITION_ATTRIBUTES2.derivedEnd,
  COMPOSITION_ATTRIBUTES2.legacyTrack
]);
function parseNumeric2(value) {
  if (value == null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
var nonNegative = (raw) => {
  const value = parseNumeric2(raw);
  return value !== null && value >= 0 ? value : null;
};
function readMediaOffsetSeconds(getAttr) {
  return nonNegative(getAttr("data-playback-start")) ?? nonNegative(getAttr("data-media-start")) ?? 0;
}
var MIN_PLAYBACK_RATE = 0.1;
var MAX_PLAYBACK_RATE = 10;
function clampPlaybackRate(raw) {
  return Number.isFinite(raw) && raw > 0 ? Math.max(MIN_PLAYBACK_RATE, Math.min(MAX_PLAYBACK_RATE, raw)) : 1;
}
function readPlaybackRate(getAttr, fallback = 1) {
  const authored = Number.parseFloat(getAttr("data-playback-rate") ?? "");
  return clampPlaybackRate(Number.isFinite(authored) && authored > 0 ? authored : fallback);
}
function readDataDurationSeconds(getAttr) {
  const duration = parseNumeric2(getAttr("data-duration"));
  return duration !== null && duration > 0 ? duration : null;
}
function readAuthoredDurationSeconds(getAttr, startSeconds) {
  const duration = readDataDurationSeconds(getAttr);
  if (duration !== null) return duration;
  const end = parseNumeric2(getAttr("data-end"));
  return end !== null ? end - startSeconds : null;
}
var DEFAULT_IMAGE_TIMELINE_DURATION_SECONDS = 3;
function resolveNaturalDurationSeconds(sourceDurationSeconds, mediaStartSeconds, playbackRate) {
  if (!Number.isFinite(sourceDurationSeconds)) return null;
  const remaining = Math.max(0, sourceDurationSeconds - mediaStartSeconds);
  return remaining / clampPlaybackRate(playbackRate);
}
function resolveMediaDuration(input) {
  const { tag, authoredDurationSeconds, sourceDurationSeconds, mediaStartSeconds, playbackRate } = input;
  if (authoredDurationSeconds !== null && authoredDurationSeconds > 0) {
    return { seconds: authoredDurationSeconds, source: "authored" };
  }
  if (tag === "img") {
    return { seconds: DEFAULT_IMAGE_TIMELINE_DURATION_SECONDS, source: "default" };
  }
  if (sourceDurationSeconds === null) {
    return { seconds: null, source: "pending", reason: "source duration not yet probed" };
  }
  const seconds = resolveNaturalDurationSeconds(
    sourceDurationSeconds,
    mediaStartSeconds,
    playbackRate
  );
  if (seconds === null) {
    return { seconds: null, source: "pending", reason: "source reported a non-finite duration" };
  }
  return { seconds, source: "media" };
}

// ../parsers/dist/assets.js
import { isAbsolute, relative, resolve } from "path";
import { posix } from "path";
var CSS_URL_RE = /\burl\(\s*(["']?)([^)"'\s](?:[^)"']*[^)"'\s])?)\1\s*\)/g;
var PATH_ATTRS = ["src", "href"];
function isNonRelativeUrl(val) {
  return !val || val.startsWith("http://") || val.startsWith("https://") || val.startsWith("//") || val.startsWith("data:") || val.startsWith("#") || val.startsWith("/");
}
function isPathInside(childPath, parentPath) {
  const absChild = resolve(childPath);
  const absParent = resolve(parentPath);
  if (absChild === absParent) return true;
  const rel = relative(absParent, absChild);
  return rel !== "" && !rel.startsWith("..") && !isAbsolute(rel);
}
var { join, resolve: resolve2, dirname } = posix;
var isAbsoluteOrSpecial = isNonRelativeUrl;
function needsRewrite(val) {
  return val.startsWith("../") || val === "..";
}
function splitPathSuffix(value) {
  const marker = value.search(/[?#]/);
  return marker === -1 ? [value, ""] : [value.slice(0, marker), value.slice(marker)];
}
function rewriteAssetPath(compSrcPath, relativePath, assetExists) {
  if (isAbsoluteOrSpecial(relativePath)) return relativePath;
  const compDir = dirname(compSrcPath);
  if (!compDir || compDir === ".") return relativePath;
  if (!needsRewrite(relativePath)) {
    if (!assetExists) return relativePath;
    const [filePart, suffix] = splitPathSuffix(relativePath);
    if (!filePart) return relativePath;
    const sibling = resolve2("/", join(compDir, filePart)).slice(1);
    return assetExists(sibling) ? sibling + suffix : relativePath;
  }
  const resolved = join(compDir, relativePath);
  const normalized = resolve2("/", resolved).slice(1);
  return normalized;
}
function rewriteAssetPaths(elements, compSrcPath, getAttr, setAttr, assetExists) {
  for (const el of elements) {
    for (const attr of PATH_ATTRS) {
      const val = (getAttr(el, attr) || "").trim();
      const rewritten = rewriteAssetPath(compSrcPath, val, assetExists);
      if (rewritten !== val) {
        setAttr(el, attr, rewritten);
      }
    }
  }
}
function rewriteInlineStyleAssetUrls(elements, compSrcPath, getStyle, setStyle, assetExists) {
  const compDir = dirname(compSrcPath);
  if (!compDir || compDir === ".") return;
  for (const el of elements) {
    const style = getStyle(el);
    if (!style) continue;
    const rewritten = rewriteCssAssetUrls(style, compSrcPath, assetExists);
    if (rewritten !== style) {
      setStyle(el, rewritten);
    }
  }
}
function rewriteCssAssetUrls(cssText, compSrcPath, assetExists) {
  if (!cssText) return cssText;
  return cssText.replace(CSS_URL_RE, (full, quote, rawUrl) => {
    const urlValue = (rawUrl || "").trim();
    const rewritten = rewriteAssetPath(compSrcPath, urlValue, assetExists);
    if (rewritten === urlValue) return full;
    return `url(${quote || ""}${rewritten}${quote || ""})`;
  });
}

// ../parsers/dist/subCompositionValidity.js
function resolveSubCompositionContent(html, document) {
  const template = document.querySelector("template");
  if (template) return { contentHtml: template.innerHTML ?? "", hasTemplate: true };
  const body = document.querySelector("body");
  if (body) return { contentHtml: body.innerHTML ?? "", hasTemplate: false };
  const contentHtml = document.querySelector("html") ? "" : html;
  return { contentHtml, hasTemplate: false };
}
function checkSubCompositionUsability(html, parseHtml) {
  if (html == null || !html.trim()) {
    return {
      ok: false,
      reason: "empty",
      detail: "the file is empty (0 bytes or whitespace-only)"
    };
  }
  const compDoc = parseHtml(html);
  if (!compDoc.documentElement) {
    return {
      ok: false,
      reason: "unparsable",
      detail: "the file's contents could not be parsed as HTML"
    };
  }
  const { contentHtml } = resolveSubCompositionContent(html, compDoc);
  if (!contentHtml.trim()) {
    return {
      ok: false,
      reason: "no-content",
      detail: "the file has no <template> or <body> content to render"
    };
  }
  const contentDoc = parseHtml(contentHtml);
  if (!contentDoc.documentElement) {
    return {
      ok: false,
      reason: "unparsable",
      detail: "the file's resolved contents could not be parsed as HTML"
    };
  }
  if (!contentDoc.querySelector("[data-composition-id]")) {
    return {
      ok: false,
      reason: "no-composition-root",
      detail: "the file's resolved content has no element with a data-composition-id attribute"
    };
  }
  return { ok: true };
}

// ../parsers/dist/colorGradingContract.js
var COLOR_GRADING_CONTRACT_VERSION = 2;
var COLOR_GRADING_COLOR_SPACE = "rec709";
var COLOR_GRADING_MAX_CURVE_POINTS = 16;
var COLOR_GRADING_MAX_SECONDARIES = 4;
var COLOR_GRADING_ADVANCED_LIMITS = {
  hueDegrees: { min: 0, max: 360, inclusiveMax: false },
  unit: { min: 0, max: 1 },
  signedUnit: { min: -1, max: 1 },
  secondaryHueRange: { min: 0, max: 180 },
  secondaryHueSoftness: { min: 0, max: 180 },
  secondaryHueCombinedMax: 180,
  secondarySoftRangeSoftness: { min: 0, max: 0.5 },
  secondaryHueShift: { min: -180, max: 180 },
  effects: {
    asciiStyle: { min: 0, max: 7 },
    bloom: { min: 0, max: 3 },
    bloomRadius: { min: 1, max: 100 },
    monoScreenShape: { min: 0, max: 4 }
  }
};
var COLOR_GRADING_TOP_LEVEL_KEYS = [
  "enabled",
  "preset",
  "intensity",
  "adjust",
  "wheels",
  "curves",
  "hueCurves",
  "secondaries",
  "details",
  "effects",
  "palette",
  "lut",
  "colorSpace"
];
var COLOR_GRADING_ADJUST_KEYS = [
  "exposure",
  "contrast",
  "highlights",
  "shadows",
  "whites",
  "blacks",
  "temperature",
  "tint",
  "vibrance",
  "saturation"
];
var COLOR_GRADING_WHEEL_KEYS = ["shadows", "midtones", "highlights"];
var COLOR_GRADING_CURVE_KEYS = ["master", "red", "green", "blue"];
var COLOR_GRADING_HUE_CURVE_KEYS = ["hueVsHue", "hueVsSaturation", "hueVsLuma"];
var COLOR_GRADING_WHEEL_CONTROL_KEYS = ["hue", "amount", "level"];
var COLOR_GRADING_SECONDARY_KEYS = ["enabled", "key", "correction"];
var COLOR_GRADING_SECONDARY_KEY_KEYS = ["hue", "saturation", "luma"];
var COLOR_GRADING_HUE_RANGE_KEYS = ["center", "range", "softness"];
var COLOR_GRADING_SOFT_RANGE_KEYS = ["min", "max", "softness"];
var COLOR_GRADING_SECONDARY_CORRECTION_KEYS = [
  "hueShift",
  "saturation",
  "luma",
  "temperature",
  "tint"
];
var COLOR_GRADING_DETAIL_KEYS = [
  "vignette",
  "vignetteMidpoint",
  "vignetteRoundness",
  "vignetteFeather",
  "grain",
  "grainSize",
  "grainRoughness"
];
var COLOR_GRADING_EFFECT_KEYS = [
  "blur",
  "pixelate",
  "chromaBleed",
  "tapeDamage",
  "tapeTracking",
  "tapeNoise",
  "tapeSpeed",
  "filmArtifacts",
  "halftone",
  "halftoneSize",
  "twoInkPrint",
  "twoInkPrintSize",
  "ascii",
  "asciiSize",
  "asciiInvert",
  "asciiStyle",
  "asciiColor",
  "asciiRotation",
  "dither",
  "ditherSize",
  "bloom",
  "bloomRadius",
  "monoScreen",
  "monoScreenSize",
  "monoScreenAngle",
  "monoScreenSpread",
  "monoScreenShape",
  "monoScreenInvert",
  "scanlines",
  "scanlineCount",
  "scanlineSoftness",
  "chromaticAberration",
  "chromaticAngle",
  "crtCurvature",
  "digitalGlitch",
  "digitalGlitchColorSplit",
  "digitalGlitchLineTear",
  "digitalGlitchPixelate",
  "digitalGlitchBlockAmount",
  "digitalGlitchBlockDisplacement",
  "digitalGlitchBlockOpacity",
  "digitalGlitchSpeed",
  "engraving",
  "engravingSpacing",
  "engravingMinThickness",
  "engravingMaxThickness",
  "engravingAngle",
  "engravingContrast",
  "engravingSharpness",
  "engravingWave",
  "engravingWaveFrequency",
  "crosshatch",
  "crosshatchSpacing",
  "crosshatchThickness",
  "crosshatchAngle",
  "crosshatchContrast",
  "crosshatchEdges",
  "crosshatchLineWeight",
  "crosshatchWave",
  "crosshatchWaveFrequency",
  "kuwahara",
  "kuwaharaRadius",
  "kuwaharaSharpness",
  "kuwaharaSaturation"
];
var COLOR_GRADING_LUT_KEYS = ["src", "intensity"];
var UNIT_LIMIT = COLOR_GRADING_ADVANCED_LIMITS.unit;
var SIGNED_UNIT_LIMIT = COLOR_GRADING_ADVANCED_LIMITS.signedUnit;
var EFFECT_LIMIT_OVERRIDES = COLOR_GRADING_ADVANCED_LIMITS.effects;
var VARIABLE_REF = /^\$(?:\{[A-Za-z0-9_.:-]+\}|[A-Za-z0-9_.:-]+)$/;
var PALETTE_COLOR = /^#[0-9a-f]{6}$/i;
var OBJECT_SECTIONS = [
  ["adjust", COLOR_GRADING_ADJUST_KEYS],
  ["details", COLOR_GRADING_DETAIL_KEYS],
  ["effects", COLOR_GRADING_EFFECT_KEYS],
  ["lut", COLOR_GRADING_LUT_KEYS]
];
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isColorGradingVariableRef(value) {
  return typeof value === "string" && VARIABLE_REF.test(value.trim());
}
function unknownKeysHint(path, unknown) {
  if (path !== "grading") return `Correct or remove the unsupported "${path}" keys.`;
  const sections = new Set(
    unknown.flatMap(
      (key) => OBJECT_SECTIONS.filter(([, keys]) => keys.includes(key)).map(
        ([section]) => section
      )
    )
  );
  return sections.size === 1 ? `Move those controls under "${[...sections][0]}".` : "Use only the documented media-treatment keys at the top level.";
}
function validateObject(value, path, keys, issues) {
  if (isColorGradingVariableRef(value)) return null;
  if (!isRecord(value)) {
    issues.push({ path, message: "must be an object or variable reference" });
    return null;
  }
  const allowed = new Set(keys);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) {
    issues.push({
      path,
      message: `has unsupported key(s): ${unknown.join(", ")}`,
      hint: unknownKeysHint(path, unknown)
    });
  }
  return value;
}
function isNumberInRange(value, limit, inclusiveMax) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < limit.min) return false;
  return inclusiveMax ? value <= limit.max : value < limit.max;
}
function validateNumericField(value, key, path, limit, issues, inclusiveMax = true) {
  const candidate = value[key];
  if (candidate === void 0 || isColorGradingVariableRef(candidate)) return;
  if (isNumberInRange(candidate, limit, inclusiveMax)) return;
  issues.push({
    path: path ? `${path}.${key}` : key,
    message: `must be a finite number from ${limit.min} ${inclusiveMax ? "through" : "up to"} ${limit.max}`
  });
}
function isFiniteTuple(value) {
  return Array.isArray(value) && value.length === 2 && value.every((coordinate) => typeof coordinate === "number" && Number.isFinite(coordinate));
}
function validateCurve(value, path, issues) {
  if (isColorGradingVariableRef(value)) return;
  if (!Array.isArray(value) || value.length < 2 || value.length > COLOR_GRADING_MAX_CURVE_POINTS) {
    issues.push({
      path,
      message: `must contain 2 to ${COLOR_GRADING_MAX_CURVE_POINTS} [input, output] points`
    });
    return;
  }
  const inputs = /* @__PURE__ */ new Set();
  value.forEach((point, index) => {
    if (!isFiniteTuple(point)) {
      issues.push({ path: `${path}[${index}]`, message: "must be a finite [input, output] tuple" });
      return;
    }
    const [input, output] = point;
    if (input < 0 || input > 1 || output < 0 || output > 1) {
      issues.push({ path: `${path}[${index}]`, message: "coordinates must be between 0 and 1" });
    }
    if (inputs.has(input)) issues.push({ path, message: `contains duplicate input ${input}` });
    inputs.add(input);
  });
  const inferredPointCount = value.length + (inputs.has(0) ? 0 : 1) + (inputs.has(1) ? 0 : 1);
  if (inferredPointCount > COLOR_GRADING_MAX_CURVE_POINTS) {
    issues.push({
      path,
      message: `must contain at most ${COLOR_GRADING_MAX_CURVE_POINTS} points including inferred 0 and 1 endpoints`
    });
  }
}
function validateHueCurve(value, path, outputMin, outputMax, issues) {
  if (isColorGradingVariableRef(value)) return;
  if (!Array.isArray(value) || value.length < 3 || value.length > COLOR_GRADING_MAX_CURVE_POINTS) {
    issues.push({
      path,
      message: `must contain 3 to ${COLOR_GRADING_MAX_CURVE_POINTS} [hueDegrees, delta] points`
    });
    return;
  }
  const hues = /* @__PURE__ */ new Set();
  value.forEach((point, index) => {
    if (!isFiniteTuple(point)) {
      issues.push({ path: `${path}[${index}]`, message: "must be a finite [hue, delta] tuple" });
      return;
    }
    const [hue, delta] = point;
    if (hue < 0 || hue >= 360) {
      issues.push({ path: `${path}[${index}][0]`, message: "must be from 0 up to 360 degrees" });
    }
    if (delta < outputMin || delta > outputMax) {
      issues.push({
        path: `${path}[${index}][1]`,
        message: `must be between ${outputMin} and ${outputMax}`
      });
    }
    if (hues.has(hue)) issues.push({ path, message: `contains duplicate hue ${hue}` });
    hues.add(hue);
  });
}
function validateNumericSection(value, path, keys, limitFor, issues) {
  for (const key of keys) validateNumericField(value, key, path, limitFor(key), issues);
}
function validatePalette(value, issues) {
  if (value === void 0 || value === null || isColorGradingVariableRef(value)) return;
  const hint = 'Use 2 to 6 colors in the intended mapping order, each written as exact "#RRGGBB", or use a project variable reference.';
  if (!Array.isArray(value) || value.length < 2 || value.length > 6) {
    issues.push({ path: "palette", message: "must contain 2 to 6 hex colors", hint });
    return;
  }
  value.forEach((color, index) => {
    if (typeof color !== "string" || !PALETTE_COLOR.test(color)) {
      issues.push({
        path: `palette[${index}]`,
        message: "must be a six-digit hex color",
        hint
      });
    }
  });
}
function validateLut(value, object, issues) {
  if (typeof value === "string") {
    if (!value.trim()) issues.push({ path: "lut", message: "must not be empty" });
    return;
  }
  if (!object) return;
  if (!isColorGradingVariableRef(object.src) && (typeof object.src !== "string" || !object.src.trim())) {
    issues.push({
      path: "lut.src",
      message: "must be a non-empty string or variable reference"
    });
  }
  validateNumericField(object, "intensity", "lut", UNIT_LIMIT, issues);
}
function validateEnabled(grading, issues) {
  if (grading.enabled !== void 0 && !isColorGradingVariableRef(grading.enabled) && typeof grading.enabled !== "boolean") {
    issues.push({ path: "enabled", message: "must be a boolean or variable reference" });
  }
}
function validatePreset(grading, issues) {
  if (grading.preset !== void 0 && grading.preset !== null && !isColorGradingVariableRef(grading.preset) && (typeof grading.preset !== "string" || !grading.preset.trim())) {
    issues.push({
      path: "preset",
      message: "must be a non-empty string, null, or variable reference"
    });
  }
}
function validateColorSpace(grading, issues) {
  if (grading.colorSpace !== void 0 && !isColorGradingVariableRef(grading.colorSpace) && grading.colorSpace !== COLOR_GRADING_COLOR_SPACE) {
    issues.push({
      path: "colorSpace",
      message: `must be "${COLOR_GRADING_COLOR_SPACE}" or a variable reference`
    });
  }
}
function validateTopLevel(grading, issues) {
  validateEnabled(grading, issues);
  validateNumericField(grading, "intensity", "", UNIT_LIMIT, issues);
  validatePreset(grading, issues);
  validateColorSpace(grading, issues);
}
function validateSection(grading, key, keys, issues) {
  const section = grading[key];
  if (section === void 0 || key === "lut" && section === null) return;
  if (key === "lut" && typeof section === "string") {
    validateLut(section, null, issues);
    return;
  }
  const object = validateObject(section, key, keys, issues);
  if (!object) return;
  if (key === "lut") return validateLut(section, object, issues);
  const limitFor = (control) => {
    if (key === "adjust" && control === "exposure") return { min: -2, max: 2 };
    if (key === "adjust" || key === "details" && control === "vignetteRoundness") {
      return SIGNED_UNIT_LIMIT;
    }
    return key === "effects" ? EFFECT_LIMIT_OVERRIDES[control] ?? UNIT_LIMIT : UNIT_LIMIT;
  };
  validateNumericSection(object, key, keys, limitFor, issues);
}
function validateSections(grading, issues) {
  for (const [key, keys] of OBJECT_SECTIONS) validateSection(grading, key, keys, issues);
}
function validateWheels(value, issues) {
  if (value === void 0 || isColorGradingVariableRef(value)) return;
  const wheels = validateObject(value, "wheels", COLOR_GRADING_WHEEL_KEYS, issues);
  if (!wheels) return;
  for (const wheel of COLOR_GRADING_WHEEL_KEYS) {
    if (wheels[wheel] === void 0) continue;
    const path = `wheels.${wheel}`;
    const controls = validateObject(wheels[wheel], path, COLOR_GRADING_WHEEL_CONTROL_KEYS, issues);
    if (!controls) continue;
    validateNumericField(
      controls,
      "hue",
      path,
      COLOR_GRADING_ADVANCED_LIMITS.hueDegrees,
      issues,
      COLOR_GRADING_ADVANCED_LIMITS.hueDegrees.inclusiveMax
    );
    validateNumericField(controls, "amount", path, UNIT_LIMIT, issues);
    validateNumericField(controls, "level", path, SIGNED_UNIT_LIMIT, issues);
  }
}
function validateCurves(value, issues) {
  if (value === void 0 || isColorGradingVariableRef(value)) return;
  const curves = validateObject(value, "curves", COLOR_GRADING_CURVE_KEYS, issues);
  if (!curves) return;
  for (const key of COLOR_GRADING_CURVE_KEYS) {
    if (curves[key] !== void 0) validateCurve(curves[key], `curves.${key}`, issues);
  }
}
function validateHueCurves(value, issues) {
  if (value === void 0 || isColorGradingVariableRef(value)) return;
  const curves = validateObject(value, "hueCurves", COLOR_GRADING_HUE_CURVE_KEYS, issues);
  if (!curves) return;
  const limits = {
    hueVsHue: [-180, 180],
    hueVsSaturation: [-1, 1],
    hueVsLuma: [-1, 1]
  };
  for (const key of COLOR_GRADING_HUE_CURVE_KEYS) {
    if (curves[key] !== void 0) {
      validateHueCurve(curves[key], `hueCurves.${key}`, limits[key][0], limits[key][1], issues);
    }
  }
}
function validateSoftRange(value, path, issues) {
  const range = validateObject(value, path, COLOR_GRADING_SOFT_RANGE_KEYS, issues);
  if (!range) return;
  validateNumericField(range, "min", path, UNIT_LIMIT, issues);
  validateNumericField(range, "max", path, UNIT_LIMIT, issues);
  validateNumericField(
    range,
    "softness",
    path,
    COLOR_GRADING_ADVANCED_LIMITS.secondarySoftRangeSoftness,
    issues
  );
  if (typeof range.min === "number" && typeof range.max === "number" && range.min >= range.max) {
    issues.push({ path, message: "min must be smaller than max" });
  }
}
function validateSecondaryHue(value, path, issues) {
  const hue = validateObject(value, path, COLOR_GRADING_HUE_RANGE_KEYS, issues);
  if (!hue) return;
  validateNumericField(
    hue,
    "center",
    path,
    COLOR_GRADING_ADVANCED_LIMITS.hueDegrees,
    issues,
    COLOR_GRADING_ADVANCED_LIMITS.hueDegrees.inclusiveMax
  );
  validateNumericField(hue, "range", path, COLOR_GRADING_ADVANCED_LIMITS.secondaryHueRange, issues);
  validateNumericField(
    hue,
    "softness",
    path,
    COLOR_GRADING_ADVANCED_LIMITS.secondaryHueSoftness,
    issues
  );
  if (typeof hue.range === "number" && typeof hue.softness === "number" && hue.range + hue.softness > COLOR_GRADING_ADVANCED_LIMITS.secondaryHueCombinedMax) {
    issues.push({
      path,
      message: `range plus softness must not exceed ${COLOR_GRADING_ADVANCED_LIMITS.secondaryHueCombinedMax} degrees`
    });
  }
}
function validateSecondaryKey(value, path, issues) {
  const key = validateObject(value, path, COLOR_GRADING_SECONDARY_KEY_KEYS, issues);
  if (!key) return;
  if (key.hue !== void 0) validateSecondaryHue(key.hue, `${path}.hue`, issues);
  if (key.saturation !== void 0) validateSoftRange(key.saturation, `${path}.saturation`, issues);
  if (key.luma !== void 0) validateSoftRange(key.luma, `${path}.luma`, issues);
}
function validateSecondaryCorrection(value, path, issues) {
  const correction = validateObject(value, path, COLOR_GRADING_SECONDARY_CORRECTION_KEYS, issues);
  if (!correction) return;
  validateNumericField(
    correction,
    "hueShift",
    path,
    COLOR_GRADING_ADVANCED_LIMITS.secondaryHueShift,
    issues
  );
  for (const key of ["saturation", "luma", "temperature", "tint"]) {
    validateNumericField(correction, key, path, SIGNED_UNIT_LIMIT, issues);
  }
}
function validateSecondary(value, index, issues) {
  const path = `secondaries[${index}]`;
  const secondary = validateObject(value, path, COLOR_GRADING_SECONDARY_KEYS, issues);
  if (!secondary) return;
  if (secondary.enabled !== void 0 && typeof secondary.enabled !== "boolean" && !isColorGradingVariableRef(secondary.enabled)) {
    issues.push({ path: `${path}.enabled`, message: "must be a boolean" });
  }
  validateSecondaryKey(secondary.key, `${path}.key`, issues);
  validateSecondaryCorrection(secondary.correction, `${path}.correction`, issues);
}
function validateSecondaries(value, issues) {
  if (value === void 0 || isColorGradingVariableRef(value)) return;
  if (!Array.isArray(value) || value.length > COLOR_GRADING_MAX_SECONDARIES) {
    issues.push({
      path: "secondaries",
      message: `must be an array of at most ${COLOR_GRADING_MAX_SECONDARIES} selections`
    });
    return;
  }
  value.forEach((secondary, index) => validateSecondary(secondary, index, issues));
}
function validateColorGradingContract(value) {
  if (typeof value === "string") {
    return value.trim() ? [] : [{ path: "grading", message: "is empty" }];
  }
  const issues = [];
  const grading = validateObject(value, "grading", COLOR_GRADING_TOP_LEVEL_KEYS, issues);
  if (!grading) return issues;
  validateTopLevel(grading, issues);
  validateSections(grading, issues);
  validateWheels(grading.wheels, issues);
  validateCurves(grading.curves, issues);
  validateHueCurves(grading.hueCurves, issues);
  validateSecondaries(grading.secondaries, issues);
  validatePalette(grading.palette, issues);
  return issues;
}

export {
  COMPOSITION_CONTRACT_VERSION,
  COMPOSITION_ATTRIBUTES,
  CANONICAL_AUTHORED_TIMING_ATTRIBUTES,
  DERIVED_TIMING_ATTRIBUTES,
  LEGACY_TIMING_ATTRIBUTES,
  ClipTimingWriteError,
  parseNumeric,
  parseStartExpression,
  readClipTiming,
  writeClipTiming,
  readMediaOffsetSeconds,
  MIN_PLAYBACK_RATE,
  MAX_PLAYBACK_RATE,
  clampPlaybackRate,
  readPlaybackRate,
  readDataDurationSeconds,
  readAuthoredDurationSeconds,
  resolveNaturalDurationSeconds,
  resolveMediaDuration,
  CSS_URL_RE,
  PATH_ATTRS,
  isNonRelativeUrl,
  isPathInside,
  rewriteAssetPath,
  rewriteAssetPaths,
  rewriteInlineStyleAssetUrls,
  rewriteCssAssetUrls,
  resolveSubCompositionContent,
  checkSubCompositionUsability,
  COLOR_GRADING_CONTRACT_VERSION,
  COLOR_GRADING_COLOR_SPACE,
  COLOR_GRADING_MAX_CURVE_POINTS,
  COLOR_GRADING_MAX_SECONDARIES,
  COLOR_GRADING_ADVANCED_LIMITS,
  COLOR_GRADING_TOP_LEVEL_KEYS,
  COLOR_GRADING_ADJUST_KEYS,
  COLOR_GRADING_WHEEL_KEYS,
  COLOR_GRADING_CURVE_KEYS,
  COLOR_GRADING_HUE_CURVE_KEYS,
  COLOR_GRADING_DETAIL_KEYS,
  COLOR_GRADING_EFFECT_KEYS,
  COLOR_GRADING_LUT_KEYS,
  isColorGradingVariableRef,
  validateColorGradingContract
};
