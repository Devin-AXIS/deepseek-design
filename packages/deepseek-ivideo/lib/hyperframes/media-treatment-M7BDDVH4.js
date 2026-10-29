import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  readOptionalString
} from "./chunk-ZKDMAOFU.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  patchElementInHtml
} from "./chunk-R2DYALSM.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallHint
} from "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-USDEMXXL.js";
import {
  HF_COLOR_GRADING_ATTR,
  getHfColorGradingCapabilities,
  hasHfColorGradingAuthoredValues,
  normalizeHfColorGrading,
  serializeHfColorGrading
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LCSMOLGX.js";
import "./chunk-CGTUSO6Y.js";
import {
  cleanAssetUrl,
  isRemoteOrInlineUrl,
  resolveExistingLocalAsset
} from "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import {
  isColorGradingVariableRef,
  isPathInside,
  rewriteAssetPath,
  validateColorGradingContract
} from "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/media-treatment.ts
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, relative, resolve } from "path";

// ../core/dist/mediaGradeAnalyzer.js
import { execFileSync } from "child_process";
import { basename, extname } from "path";
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tif",
  ".tiff"
]);
var SAMPLE_FRAMES = 5;
var DEFAULT_TIMEOUT_MS = 15e3;
var ADJUST_LIMITS = {
  exposure: { min: -2, max: 2 },
  contrast: { min: -1, max: 1 },
  whites: { min: -1, max: 1 },
  blacks: { min: -1, max: 1 },
  temperature: { min: -1, max: 1 },
  tint: { min: -1, max: 1 }
};
function clamp(value, key) {
  const limit = ADJUST_LIMITS[key];
  if (!Number.isFinite(value))
    return 0;
  return Math.min(limit.max, Math.max(limit.min, value));
}
function round(value) {
  const rounded = Math.round(value * 1e3) / 1e3;
  return Object.is(rounded, -0) ? 0 : rounded;
}
function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length);
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function asRecord(value) {
  return isRecord(value) ? value : {};
}
function probeMedia(mediaPath, ffprobePath) {
  try {
    const raw = execFileSync(ffprobePath, [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=color_space,color_transfer,color_primaries,pix_fmt,duration:format=duration",
      "-of",
      "json",
      "--",
      mediaPath
    ], { encoding: "utf8", timeout: 5e3, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
    const parsed = asRecord(JSON.parse(raw));
    const streams = Array.isArray(parsed.streams) ? parsed.streams : [];
    const stream = asRecord(streams[0]);
    const format = asRecord(parsed.format);
    const duration = Number(stream.duration ?? format.duration);
    const text = (key) => {
      const value = stream[key];
      return typeof value === "string" && value ? value : "unknown";
    };
    return {
      duration: Number.isFinite(duration) && duration > 0 ? duration : null,
      colorSpace: text("color_space"),
      transfer: text("color_transfer"),
      primaries: text("color_primaries"),
      pixelFormat: text("pix_fmt")
    };
  } catch {
    return {
      duration: null,
      colorSpace: "unknown",
      transfer: "unknown",
      primaries: "unknown",
      pixelFormat: "unknown"
    };
  }
}
function parseMediaTreatmentSignalStats(raw) {
  const frames = [];
  let current = null;
  for (const line of raw.split(/\r?\n/)) {
    const frame = line.match(/^frame:\d.*pts_time:([+-]?(?:\d+(?:\.\d+)?|\.\d+))/);
    if (frame?.[1]) {
      if (current)
        frames.push(current);
      current = { ptsTime: Number(frame[1]) };
      continue;
    }
    const stat = line.match(/lavfi\.signalstats\.([A-Z]+)=([+-]?(?:\d+(?:\.\d+)?|\.\d+))/);
    if (!stat?.[1] || !stat[2])
      continue;
    current ??= {};
    current[stat[1]] = Number(stat[2]);
  }
  if (current)
    frames.push(current);
  return frames.filter((frame) => Number.isFinite(frame.YMIN) && Number.isFinite(frame.YLOW) && Number.isFinite(frame.YAVG) && Number.isFinite(frame.YHIGH) && Number.isFinite(frame.YMAX) && Number.isFinite(frame.UAVG) && Number.isFinite(frame.VAVG));
}
function summarizeFrames(frames) {
  if (frames.length === 0)
    throw new Error("FFmpeg returned no analyzable video frames");
  const values = (key) => frames.map((frame) => Number(frame[key]));
  return {
    frames: frames.length,
    yMin: Math.min(...values("YMIN")),
    yLow: average(values("YLOW")),
    yAvg: average(values("YAVG")),
    yHigh: average(values("YHIGH")),
    yMax: Math.max(...values("YMAX")),
    uAvg: average(values("UAVG")),
    vAvg: average(values("VAVG")),
    satAvg: average(frames.map((frame) => frame.SATAVG ?? 0)),
    shadowClipRisk: average(frames.map((frame) => Number(frame.YLOW) <= 16 ? 1 : 0)),
    highlightClipRisk: average(frames.map((frame) => Number(frame.YHIGH) >= 235 ? 1 : 0))
  };
}
function suggestedExposure(normalizedAverage, yLow, yHigh) {
  if (normalizedAverage < 0.28 && yHigh / 255 < 0.65) {
    return clamp((0.32 - normalizedAverage) * 1.2, "exposure");
  }
  if (normalizedAverage > 0.72 && yLow / 255 > 0.3) {
    return clamp((0.68 - normalizedAverage) * 1.2, "exposure");
  }
  return 0;
}
function suggestedTemperature(uAverage, vAverage) {
  const chromaWarmth = (vAverage - 128 + (128 - uAverage)) / 128;
  return Math.abs(chromaWarmth) >= 0.08 ? clamp(-chromaWarmth * 0.25, "temperature") : 0;
}
function suggestedTint(uAverage, vAverage) {
  const cast = uAverage + vAverage - 256;
  return Math.abs(cast) >= 10 ? clamp(-cast / 512, "tint") : 0;
}
function statsToAdjust(stats) {
  const yMin = Number(stats.yMin);
  const yLow = Number(stats.yLow ?? stats.yMin);
  const yMax = Number(stats.yMax);
  const yHigh = Number(stats.yHigh ?? stats.yMax);
  const yAvg = Number(stats.yAvg);
  const uAvg = Number(stats.uAvg);
  const vAvg = Number(stats.vAvg);
  const shadowClipRisk = Number(stats.shadowClipRisk ?? (yLow <= 16 ? 1 : 0));
  const highlightClipRisk = Number(stats.highlightClipRisk ?? (yHigh >= 235 ? 1 : 0));
  const percentileSpread = (yHigh - yLow) / 255;
  const normalizedAverage = yAvg / 255;
  const contrast = percentileSpread < 0.35 ? clamp((0.35 - percentileSpread) * 0.4, "contrast") : 0;
  return {
    adjust: {
      exposure: round(suggestedExposure(normalizedAverage, yLow, yHigh)),
      contrast: round(contrast),
      blacks: round(clamp(shadowClipRisk * 0.08, "blacks")),
      whites: round(clamp(-highlightClipRisk * 0.08, "whites")),
      temperature: round(suggestedTemperature(uAvg, vAvg)),
      tint: round(suggestedTint(uAvg, vAvg))
    },
    measured: {
      frames: Number(stats.frames ?? 1),
      yMin: round(yMin),
      yLow: round(yLow),
      yAvg: round(yAvg),
      yHigh: round(yHigh),
      yMax: round(yMax),
      uAvg: round(uAvg),
      vAvg: round(vAvg),
      satAvg: round(Number(stats.satAvg ?? 0)),
      shadowClipRisk: round(shadowClipRisk),
      highlightClipRisk: round(highlightClipRisk)
    }
  };
}
function summarizeMediaTreatmentAnalysis(probe, frames) {
  const result = statsToAdjust(summarizeFrames(frames));
  const hdr = ["smpte2084", "arib-std-b67"].includes(probe.transfer);
  const diagnosis = [];
  if (result.measured.shadowClipRisk > 0) {
    diagnosis.push("sampled frames contain deep or clipped shadows");
  }
  if (result.measured.highlightClipRisk > 0) {
    diagnosis.push("sampled frames contain bright or clipped highlights");
  }
  if (diagnosis.length === 0)
    diagnosis.push("no obvious technical imbalance in sampled frames");
  const warnings = [];
  if (hdr)
    warnings.push("HDR transfer detected; the realtime treatment path is SDR/Rec.709.");
  if (probe.colorSpace === "unknown" || probe.transfer === "unknown") {
    warnings.push("Source color metadata is incomplete; camera LOG cannot be identified reliably from container metadata alone.");
  }
  return {
    ...result,
    source: {
      colorSpace: probe.colorSpace,
      transfer: probe.transfer,
      primaries: probe.primaries,
      pixelFormat: probe.pixelFormat,
      hdr,
      log: "unknown"
    },
    diagnosis,
    warnings
  };
}
function analyzeMediaGrade(mediaPath, options = {}) {
  const ffmpegPath = options.ffmpegPath ?? "ffmpeg";
  const ffprobePath = options.ffprobePath ?? "ffprobe";
  try {
    const probe = probeMedia(mediaPath, ffprobePath);
    const isImage = IMAGE_EXTENSIONS.has(extname(mediaPath).toLowerCase());
    const fps = !isImage && probe.duration ? Math.max(0.1, Math.min(2, SAMPLE_FRAMES / probe.duration)) : null;
    const filters = [
      fps ? `fps=${fps.toFixed(4)}` : null,
      "format=yuv444p",
      "signalstats",
      "metadata=print:file=-"
    ].filter(Boolean).join(",");
    const raw = execFileSync(ffmpegPath, [
      "-hide_banner",
      "-nostdin",
      "-v",
      "error",
      "-i",
      mediaPath,
      "-vf",
      filters,
      "-frames:v",
      String(SAMPLE_FRAMES),
      "-f",
      "null",
      "-"
    ], {
      encoding: "utf8",
      timeout: Number(process.env.HYPERFRAMES_ANALYZE_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    return summarizeMediaTreatmentAnalysis(probe, parseMediaTreatmentSignalStats(raw));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`grade analysis failed for ${mediaPath}: ${message}`);
  }
}

// src/commands/media-treatment-analysis.ts
function analyzeMediaTreatment(mediaPath) {
  const ffmpegPath = findFFmpeg();
  const ffprobePath = findFFprobe();
  if (!ffmpegPath || !ffprobePath) {
    throw new Error(`FFmpeg and ffprobe are required. ${getFFmpegInstallHint()}`);
  }
  const analysis = analyzeMediaGrade(mediaPath, { ffmpegPath, ffprobePath });
  const { adjust, ...evidence } = analysis;
  return { ...evidence, suggestedPatch: { adjust } };
}

// src/commands/media-treatment.ts
function getMediaTreatmentCapabilityOverview() {
  const capabilities = getHfColorGradingCapabilities();
  const family = (id, label, description) => ({
    id,
    label,
    description
  });
  return {
    version: capabilities.version,
    targetTags: capabilities.targetTags,
    colorSpace: capabilities.colorSpace,
    families: [
      family("correction", "Adjust", "Fix exposure, tonal balance, color casts, and saturation."),
      family(
        "grading",
        "Color Grading",
        "Shape tonal color with wheels, RGB and hue curves, and selective HSL correction."
      ),
      family(
        "presets",
        "Presets",
        "Apply a tested starting point, then tune only when the source or intent requires it."
      ),
      family("finishing", "Finish", "Shape vignette and deterministic film grain."),
      ...capabilities.effectFamilies,
      family(
        "palettes",
        "Palettes",
        "Reusable two-to-six-color palettes for compatible art effects."
      ),
      family(
        "animation",
        "Animation",
        "Seek-safe CSS properties that registered GSAP timelines may animate."
      ),
      family("lut", "Custom LUT", "Apply a user-owned 3D .cube LUT."),
      {
        id: "overlays",
        label: "Overlays",
        description: "Install authored HUD, light-leak, flash, or freeze-frame overlay blocks.",
        owner: "registry"
      }
    ],
    discovery: {
      detail: "Use --capability <family-or-item> for exact controls and examples.",
      full: "Use --all only for tooling or exhaustive inspection."
    }
  };
}
function getMediaTreatmentCapabilityDetail(id) {
  const capabilities = getHfColorGradingCapabilities();
  const animation = (path) => {
    const property = capabilities.animatable.find((candidate) => candidate.path === path);
    if (!property) return null;
    return {
      property,
      initial: `style="${property.name}: <start>"`,
      tween: `timeline.to("<selector>", { "${property.name}": <end>, duration: <seconds> })`,
      rules: [
        "Author the initial value inline on the media element.",
        "Use finite keyframes on a paused timeline registered in window.__timelines.",
        "Do not use a frame-zero set, timers, random values, or onUpdate callbacks."
      ]
    };
  };
  const effect = capabilities.effects.find(({ key }) => key === id);
  if (effect) {
    return {
      id,
      family: effect.family,
      label: effect.label,
      description: effect.description,
      renderLane: effect.renderLane,
      supportsPalette: effect.supportsPalette,
      apply: { effects: effect.apply },
      controls: effect.controls,
      animation: animation(`effects.${id}`)
    };
  }
  const effectFamily = capabilities.effectFamilies.find((family) => family.id === id);
  if (effectFamily) {
    return {
      ...effectFamily,
      effects: capabilities.effects.filter((candidate) => candidate.family === id).map((candidate) => ({
        id: candidate.key,
        label: candidate.label,
        description: candidate.description,
        renderLane: candidate.renderLane,
        supportsPalette: candidate.supportsPalette,
        animatable: capabilities.animatable.some(
          ({ path }) => path === `effects.${candidate.key}`
        )
      }))
    };
  }
  const adjustment = capabilities.adjustments.find(({ key }) => key === id);
  if (adjustment) {
    return {
      id,
      family: "correction",
      description: `Adjust ${id} within the canonical correction range.`,
      control: adjustment,
      apply: { adjust: { [id]: adjustment.identity } },
      animation: animation(`adjust.${id}`)
    };
  }
  const finishing = capabilities.finishing.find(({ key }) => key === id);
  if (finishing) {
    return {
      id,
      family: "finishing",
      description: `Adjust ${id} within the canonical finishing range.`,
      control: finishing,
      apply: { details: { [id]: finishing.identity } }
    };
  }
  const preset = capabilities.presets.find((candidate) => candidate.id === id);
  if (preset) {
    return {
      id: preset.id,
      label: preset.label,
      description: "Tested built-in media preset.",
      apply: { preset: preset.id, intensity: preset.intensity }
    };
  }
  const palette = capabilities.palettes.find((candidate) => candidate.id === id);
  if (palette) return { ...palette, apply: { palette: palette.colors } };
  const details = {
    grading: {
      id,
      description: "Shape media after primary correction with wheels, curves, HSL secondaries, and an optional user-owned LUT.",
      order: [
        "adjust",
        "wheels",
        "curves",
        "hueCurves",
        "secondaries",
        "lut",
        "details",
        "effects"
      ],
      discover: ["wheels", "curves", "hue-curves", "secondary", "scopes", "lut"]
    },
    correction: {
      id,
      description: "Fix exposure, tonal balance, color casts, and saturation.",
      controls: capabilities.adjustments
    },
    wheels: {
      id,
      description: "Shadow, midtone, and highlight color wheels.",
      contract: capabilities.wheels,
      apply: {
        wheels: {
          shadows: { hue: 205, amount: 0.08, level: 0 },
          highlights: { hue: 35, amount: 0.06, level: 0 }
        }
      }
    },
    curves: {
      id,
      description: "Master and per-channel curves using normalized [input, output] points.",
      contract: capabilities.curves,
      apply: {
        curves: {
          master: [
            [0, 0],
            [0.25, 0.2],
            [0.75, 0.82],
            [1, 1]
          ]
        }
      }
    },
    "hue-curves": {
      id,
      description: "Hue-selective curves using [hueDegrees, delta] points.",
      contract: capabilities.hueCurves,
      apply: {
        hueCurves: {
          hueVsSaturation: [
            [180, 0],
            [210, 0.15],
            [240, 0]
          ]
        }
      }
    },
    secondary: {
      id,
      description: "Up to four ordered HSL selections with bounded color correction.",
      contract: capabilities.secondaries,
      apply: {
        secondaries: [
          {
            key: {
              hue: { center: 215, range: 25, softness: 10 },
              saturation: { min: 0.2, max: 1, softness: 0.08 },
              luma: { min: 0.1, max: 0.9, softness: 0.08 }
            },
            correction: { saturation: 0.15, luma: 0.03 }
          }
        ]
      }
    },
    scopes: {
      id,
      description: "Deterministic source measurements for agent decisions; visual scopes remain a Studio display.",
      command: "hyperframes media-treatment --file compositions/scene.html --selector '#hero' --analyze --json",
      output: [
        "source color metadata and HDR/LOG warnings",
        "luma percentile and clipping evidence",
        "bounded suggested primary correction"
      ]
    },
    presets: {
      id,
      description: "Tested starting points for color and stylized media effects.",
      presets: capabilities.presets
    },
    finishing: {
      id,
      description: "Vignette and deterministic film-grain controls.",
      controls: capabilities.finishing
    },
    palettes: {
      id,
      description: "Named palettes plus the custom palette contract.",
      contract: capabilities.palette,
      palettes: capabilities.palettes
    },
    animation: {
      id,
      description: "Seek-safe CSS properties for registered GSAP timelines.",
      properties: capabilities.animatable
    },
    lut: {
      id,
      description: "User-owned 3D .cube LUT support.",
      contract: capabilities.lut
    },
    overlays: {
      id,
      description: "Authored overlay blocks owned by the HyperFrames Registry.",
      discover: "hyperframes catalog",
      apply: "hyperframes add <overlay> --dir <project> --no-clipboard --json"
    }
  };
  const detail = Object.hasOwn(details, id) ? Reflect.get(details, id) : void 0;
  if (detail) return detail;
  throw new Error(`Unknown media-treatment capability: ${id}`);
}
var examples = [
  [
    "Discover the complete treatment surface without loading every control",
    `hyperframes media-treatment --capabilities --json`
  ],
  [
    "Inspect one relevant effect in detail",
    `hyperframes media-treatment --capability kuwahara --json`
  ],
  [
    "Inspect the exhaustive machine-readable catalog",
    `hyperframes media-treatment --capabilities --all --json`
  ],
  [
    "Apply a resolved treatment to one media element",
    `hyperframes media-treatment --selector '#hero' --grading '{"preset":"skin-soft","intensity":0.6}' --apply`
  ],
  [
    "Preview the exact mutation without writing",
    `hyperframes media-treatment --file compositions/scene.html --selector 'video' --grading '{"preset":"warm-daylight"}' --apply --dry-run --json`
  ],
  [
    "Measure one local media source before choosing a correction",
    `hyperframes media-treatment --selector '#hero' --analyze --json`
  ],
  ["Remove a treatment", `hyperframes media-treatment --selector '#hero' --clear`]
];
function parseSourceDocument(source) {
  if (/<!doctype|<html[\s>]/i.test(source)) return parseHTML(source).document;
  return parseHTML(`<!DOCTYPE html><html><body>${source}</body></html>`).document;
}
function assertKnownGradingShape(value) {
  const issue = validateColorGradingContract(value)[0];
  if (issue) {
    const hint = issue.hint ? ` ${issue.hint}` : "";
    throw new Error(`Invalid color-grading ${issue.path}: ${issue.message}.${hint}`);
  }
}
function containsColorGradingVariableRef(value) {
  if (isColorGradingVariableRef(value)) return true;
  if (Array.isArray(value)) return value.some(containsColorGradingVariableRef);
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value).some(containsColorGradingVariableRef);
}
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseStoredGrading(raw) {
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}
function mergeGradingPatch(current, patch) {
  if (!isRecord2(current) || !isRecord2(patch)) return patch;
  const merged = { ...current };
  for (const [key, value] of Object.entries(patch)) {
    merged[key] = isRecord2(value) && isRecord2(merged[key]) ? mergeGradingPatch(merged[key], value) : value;
  }
  return merged;
}
function serializeGradingPatch(before, patch) {
  assertKnownGradingShape(patch);
  if (isColorGradingVariableRef(before) && isRecord2(patch)) {
    throw new Error("Cannot merge a grading patch into an unresolved whole-grade variable");
  }
  const current = typeof before === "string" && !isColorGradingVariableRef(before) ? { preset: before } : before;
  const grading = mergeGradingPatch(current, patch);
  assertKnownGradingShape(grading);
  if (containsColorGradingVariableRef(grading)) {
    return typeof grading === "string" ? grading.trim() : JSON.stringify(grading);
  }
  const normalized = normalizeHfColorGrading(grading);
  if (!normalized) throw new Error("--grading must be valid HyperFrames color-grading JSON");
  return hasHfColorGradingAuthoredValues(normalized) ? serializeHfColorGrading(normalized) : null;
}
function queryIncludingTemplates(root, selector) {
  const matches = Array.from(root.querySelectorAll(selector));
  if (matches.length > 0) return matches;
  for (const template of root.querySelectorAll("template")) {
    const nested = queryIncludingTemplates(template, selector);
    if (nested.length > 0) return nested;
  }
  return [];
}
function selectMediaElement(source, selector, selectorIndex) {
  const document = parseSourceDocument(source);
  let matches;
  try {
    matches = queryIncludingTemplates(document, selector);
  } catch {
    throw new Error(`Invalid selector: ${selector}`);
  }
  if (matches.length === 0) throw new Error(`Selector did not match: ${selector}`);
  if (selectorIndex === void 0 && matches.length > 1) {
    throw new Error(
      `Selector matched ${matches.length} elements; use a unique selector or --selector-index`
    );
  }
  const resolvedIndex = selectorIndex ?? 0;
  const element = matches[resolvedIndex];
  if (!element) {
    throw new Error(`--selector-index ${resolvedIndex} is outside ${matches.length} matches`);
  }
  const tag = element.tagName.toLowerCase();
  if (tag !== "img" && tag !== "video") {
    throw new Error(`Color grading requires an <img> or <video>; selector matched <${tag}>`);
  }
  return { element, selectorIndex: resolvedIndex, tag };
}
function applyMediaTreatmentToHtml(source, options) {
  const { element, selectorIndex, tag } = selectMediaElement(
    source,
    options.selector,
    options.selectorIndex
  );
  const before = parseStoredGrading(element.getAttribute(HF_COLOR_GRADING_ATTR));
  const value = options.clear ? null : serializeGradingPatch(before, options.grading);
  const changed = element.getAttribute(HF_COLOR_GRADING_ATTR) !== value;
  const after = parseStoredGrading(value);
  if (!changed) return { html: source, changed: false, tag, value, before, after };
  const patched = patchElementInHtml(source, { selector: options.selector, selectorIndex }, [
    { type: "attribute", property: HF_COLOR_GRADING_ATTR, value }
  ]);
  if (!patched.matched) throw new Error(`Could not persist selector: ${options.selector}`);
  return { html: patched.html, changed: true, tag, value, before, after };
}
function parseSelectorIndex(raw) {
  if (raw === void 0) return void 0;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("--selector-index must be a non-negative integer");
  }
  return value;
}
function mediaSourceForElement(element) {
  const src = element.getAttribute("src") ?? (element.tagName.toLowerCase() === "video" ? element.querySelector("source")?.getAttribute("src") : null);
  if (!src) throw new Error("Selected media has no analyzable src");
  return src;
}
function resolveMediaTreatmentSource(projectDir, compositionFile, source) {
  const sourceUrl = source.trim();
  if (!sourceUrl) throw new Error("Selected media has no analyzable local src");
  if (isRemoteOrInlineUrl(sourceUrl)) {
    throw new Error(
      "Media analysis requires a local project asset; freeze remote media with media-use first"
    );
  }
  const cleanSource = cleanAssetUrl(sourceUrl);
  if (!cleanSource) throw new Error("Selected media has no analyzable local src");
  const projectRelative = cleanSource.startsWith("/") ? cleanSource : rewriteAssetPath(compositionFile, cleanSource, (path) => existsSync(join(projectDir, path)));
  const asset = resolveExistingLocalAsset(projectDir, projectRelative);
  if (!asset) throw new Error(`Media file not found: ${source}`);
  return asset.resolved;
}
function parseGrading(raw, apply, clear) {
  if (clear) {
    if (raw !== void 0 || apply) {
      throw new Error("Use either --apply with --grading or --clear, not both");
    }
    return void 0;
  }
  if (!apply) {
    if (raw !== void 0) throw new Error("--grading requires --apply");
    throw new Error("Use --apply with --grading <json> or --clear");
  }
  if (raw === void 0) throw new Error("--apply requires --grading <json>");
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse --grading JSON: ${normalizeErrorMessage(error)}`);
  }
}
function mutationVerb(action, changed, dryRun) {
  if (dryRun) return `Would ${action}`;
  if (!changed) return action === "apply" ? "Already applied" : "Already clear";
  return action === "apply" ? "Applied" : "Cleared";
}
function runCapabilityQuery(args) {
  const capability = readOptionalString(args.capability);
  const hasMutationOption = [
    readOptionalString(args.selector),
    readOptionalString(args.grading),
    args.clear,
    args["dry-run"],
    args.apply,
    args.analyze
  ].some(Boolean);
  if (hasMutationOption) throw new Error("--capabilities cannot be combined with mutation options");
  if (args.all === true && capability)
    throw new Error("Use either --all or --capability, not both");
  let capabilities = getMediaTreatmentCapabilityOverview();
  if (args.all === true) capabilities = getHfColorGradingCapabilities();
  else if (capability) capabilities = getMediaTreatmentCapabilityDetail(capability);
  console.log(JSON.stringify(withMeta({ ok: true, capabilities }), null, 2));
}
function resolveMutationFile(args) {
  const project = resolveProject(readOptionalString(args.project));
  const fileArg = readOptionalString(args.file) ?? "index.html";
  const filePath = resolve(project.dir, fileArg);
  if (!isPathInside(filePath, project.dir) || !filePath.toLowerCase().endsWith(".html")) {
    throw new Error("--file must be an HTML file inside the project");
  }
  if (!existsSync(filePath)) throw new Error(`Composition file not found: ${fileArg}`);
  return { project, filePath };
}
function analyzeTarget(args) {
  const { project, filePath } = resolveMutationFile(args);
  const selector = readOptionalString(args.selector);
  if (!selector) throw new Error("--selector is required");
  if (readOptionalString(args.grading) || args.clear === true || args.apply === true || args["dry-run"] === true) {
    throw new Error("--analyze cannot be combined with mutation options");
  }
  const selectorIndex = parseSelectorIndex(readOptionalString(args["selector-index"]));
  const { element, tag } = selectMediaElement(
    readFileSync(filePath, "utf8"),
    selector,
    selectorIndex
  );
  const source = mediaSourceForElement(element);
  const compositionFile = relative(project.dir, filePath).split("\\").join("/");
  const mediaPath = resolveMediaTreatmentSource(project.dir, compositionFile, source);
  return {
    ok: true,
    action: "analyze",
    file: compositionFile || "index.html",
    selector,
    selectorIndex: selectorIndex ?? 0,
    tag,
    media: source,
    ...analyzeMediaTreatment(mediaPath)
  };
}
function prepareMutation(args) {
  const { project, filePath } = resolveMutationFile(args);
  const selector = readOptionalString(args.selector);
  if (!selector) throw new Error("--selector is required");
  const clear = args.clear === true;
  const apply = args.apply === true;
  const selectorIndex = parseSelectorIndex(readOptionalString(args["selector-index"]));
  const result = applyMediaTreatmentToHtml(readFileSync(filePath, "utf8"), {
    selector,
    selectorIndex,
    grading: parseGrading(readOptionalString(args.grading), apply, clear),
    clear
  });
  const dryRun = args["dry-run"] === true;
  if (result.changed && !dryRun) writeFileSync(filePath, result.html);
  const action = result.value === null ? "clear" : "apply";
  return {
    action,
    result,
    selector,
    payload: {
      ok: true,
      action,
      file: relative(project.dir, filePath) || "index.html",
      selector,
      selectorIndex: selectorIndex ?? 0,
      tag: result.tag,
      changed: result.changed,
      dryRun,
      before: result.before,
      after: result.after
    }
  };
}
function isCapabilityQuery(args) {
  return args.capabilities === true || Boolean(readOptionalString(args.capability)) || args.all === true;
}
function printAnalysis(args) {
  const result = analyzeTarget(args);
  if (args.json === true) {
    console.log(JSON.stringify(withMeta(result), null, 2));
    return;
  }
  console.log(`${c.success("\u25C7")}  Analyzed ${c.accent(result.selector)}`);
  for (const diagnosis of result.diagnosis) console.log(`   ${diagnosis}`);
  for (const warning of result.warnings) console.log(`   ${c.warn(warning)}`);
  console.log(`   suggested patch: ${JSON.stringify(result.suggestedPatch)}`);
}
function printMutation(args) {
  const { action, result, selector, payload } = prepareMutation(args);
  if (args.json === true) {
    console.log(JSON.stringify(withMeta(payload), null, 2));
    return;
  }
  const verb = mutationVerb(action, result.changed, payload.dryRun);
  console.log(`${c.success("\u25C7")}  ${verb} media treatment on ${c.accent(selector)}`);
}
function printFailure(error, json) {
  const message = normalizeErrorMessage(error);
  if (json) console.log(JSON.stringify(withMeta({ ok: false, error: message })));
  else console.error(`${c.error("\u2717")} ${message}`);
  failCommand(1, error);
}
var mediaTreatmentCommand = defineCommand({
  meta: {
    name: "media-treatment",
    description: "Discover, apply, or clear deterministic media treatments"
  },
  args: {
    capabilities: {
      type: "boolean",
      description: "Print a concise agent-readable capability overview",
      default: false
    },
    capability: {
      type: "string",
      description: "Inspect one family, control, effect, preset, or palette"
    },
    all: {
      type: "boolean",
      description: "Print the exhaustive capability catalog",
      default: false
    },
    project: { type: "string", description: "Project directory (default: cwd)" },
    file: {
      type: "string",
      description: "Composition file relative to project (default: index.html)"
    },
    selector: {
      type: "string",
      description: "Unique CSS selector for one <img> or <video>"
    },
    "selector-index": {
      type: "string",
      description: "Zero-based match index when the selector is not unique"
    },
    grading: { type: "string", description: "Canonical color-grading JSON patch" },
    apply: {
      type: "boolean",
      description: "Apply the validated grading patch (explicit agent form)",
      default: false
    },
    analyze: {
      type: "boolean",
      description: "Measure selected local media and suggest a bounded primary correction",
      default: false
    },
    clear: { type: "boolean", description: "Remove color grading from the target", default: false },
    "dry-run": {
      type: "boolean",
      description: "Validate and report without writing",
      default: false
    },
    json: { type: "boolean", description: "Output an agent-friendly JSON result", default: false }
  },
  run({ args }) {
    try {
      if (isCapabilityQuery(args)) return runCapabilityQuery(args);
      if (args.analyze === true) {
        printAnalysis(args);
        return;
      }
      printMutation(args);
    } catch (error) {
      printFailure(error, args.json === true);
    }
  }
});
export {
  applyMediaTreatmentToHtml,
  examples,
  getMediaTreatmentCapabilityDetail,
  getMediaTreatmentCapabilityOverview,
  mediaTreatmentCommand,
  resolveMediaTreatmentSource
};
