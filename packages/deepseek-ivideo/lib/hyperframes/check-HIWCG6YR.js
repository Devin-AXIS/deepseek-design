import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  rectToBbox
} from "./chunk-WBLXWOYK.js";
import {
  loadProducer
} from "./chunk-AM7M3H6I.js";
import {
  trackLintRun
} from "./chunk-GF4F5JSM.js";
import {
  assertionTargets,
  buildLayoutSampleTimes,
  buildTransitionSampleTimes,
  collapseStaticLayoutIssues,
  collectSamplingTargets,
  dedupeLayoutIssues,
  evaluateMotion,
  findMotionSpec,
  formatLayoutIssue,
  limitLayoutIssues,
  mergeSampleTimes,
  parseAt,
  readMotionSpec
} from "./chunk-QHB3PMQ6.js";
import "./chunk-UQR6E2MI.js";
import "./chunk-RYA6RITK.js";
import "./chunk-KXH7PX6M.js";
import "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFF75FSN.js";
import "./chunk-PFCFR3KZ.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-XUHOIDKG.js";
import "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6LTRBXKR.js";
import {
  resolveLocalBrowserGpuMode
} from "./chunk-UITPTRCM.js";
import "./chunk-OLJM7Q7L.js";
import {
  trackCheckReport,
  trackCommandFailure
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand,
  parseArgs
} from "./chunk-S3S4TGEH.js";
import {
  getRunId
} from "./chunk-54HJ63Q2.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
import {
  extractMediaMetadata,
  findHdrAutoPromotion
} from "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-Q5X2B5WT.js";
import "./chunk-TWWSYAKJ.js";
import {
  lintProject,
  shouldBlockRender
} from "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import {
  resolveProjectRelativeSrc
} from "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
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
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/utils/checkPipeline.ts
import { mkdirSync, writeFileSync } from "fs";
import { join, relative } from "path";

// src/utils/hdrPromotion.ts
async function bundleProjectHtml(projectDir) {
  const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
  return bundleToSingleHtml(projectDir);
}
async function collectBundledRenderMedia(html) {
  const producer = await loadProducer();
  if (!producer.collectRenderMedia) throw new Error("Render media collector unavailable");
  return producer.collectRenderMedia(html);
}
var DEFAULT_DEPENDENCIES = {
  bundleHtml: bundleProjectHtml,
  collectMedia: collectBundledRenderMedia
};
async function inspectHdrAutoPromotion(project, extractMetadata = extractMediaMetadata, dependencies = DEFAULT_DEPENDENCIES) {
  const assets = [];
  const media = await dependencies.collectMedia(await dependencies.bundleHtml(project.dir));
  for (const { src } of [...media.videos, ...media.images]) {
    const path = /^https?:\/\//i.test(src) ? src : resolveProjectRelativeSrc(src, project.dir, project.dir);
    try {
      assets.push({
        asset: src,
        colorSpace: (await extractMetadata(path)).colorSpace
      });
    } catch {
      continue;
    }
  }
  return findHdrAutoPromotion(assets);
}

// src/commands/contrast-bg.ts
function relativeLuminance(color) {
  const channel = (value) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(color[0]) + 0.7152 * channel(color[1]) + 0.0722 * channel(color[2]);
}
function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}
function requiredContrastRatio(large) {
  return large ? 3 : 4.5;
}
function suggestCompliantForegroundColor(foreground, background, requiredRatio) {
  if (contrastRatio(foreground, background) >= requiredRatio) return [...foreground];
  const black = [0, 0, 0];
  const white = [255, 255, 255];
  const target = contrastRatio(white, background) >= contrastRatio(black, background) ? white : black;
  for (let step = 1; step <= 255; step += 1) {
    const amount = step / 255;
    const candidate = [
      Math.round(foreground[0] + (target[0] - foreground[0]) * amount),
      Math.round(foreground[1] + (target[1] - foreground[1]) * amount),
      Math.round(foreground[2] + (target[2] - foreground[2]) * amount)
    ];
    if (contrastRatio(candidate, background) >= requiredRatio) return candidate;
  }
  return [...target];
}
function parseColorRGBA(color) {
  const body = /rgba?\(([^)]+)\)/.exec(color ?? "")?.[1];
  if (body == null) return null;
  const p = body.split(",").map((s) => parseFloat(s.trim()));
  if (p.length < 3 || p.some((n) => Number.isNaN(n))) return null;
  const [r, g, b, a] = p;
  if (r == null || g == null || b == null) return null;
  return [r, g, b, a ?? 1];
}

// src/utils/checkPipeline.ts
var MOTION_FPS = 20;
var MOTION_MAX_SAMPLES = 300;
var ZERO_BBOX = { x: 0, y: 0, width: 0, height: 0 };
var FRAME_BREACH_FLOOR_PX = 120;
var FRAME_BREACH_FLOOR_FRACTION = 0.06;
var DEFAULT_CHECK_OPTIONS = {
  samples: 9,
  atTransitions: false,
  maxIssues: 80,
  collapseStatic: true,
  tolerance: 2,
  timeout: 3e3,
  contrast: true,
  strict: false,
  snapshots: false,
  browserGpuMode: "auto"
};
function selectContrastTimes(grid) {
  if (grid.length <= 5) return [...grid];
  return Array.from({ length: 5 }, (_, index) => {
    const selected = Math.floor(index * (grid.length - 1) / 4);
    return grid[selected] ?? grid[0] ?? 0;
  });
}
function buildMotionSampleTimes(duration) {
  if (!Number.isFinite(duration) || duration <= 0) return [];
  const count = Math.min(MOTION_MAX_SAMPLES, Math.max(2, Math.ceil(duration * MOTION_FPS) + 1));
  const step = duration / (count - 1);
  return Array.from({ length: count }, (_, index) => Math.round(index * step * 1e3) / 1e3);
}
function gateSampleTimes(duration, seeks, fallback) {
  if (!Number.isFinite(duration) || duration <= 0) return [];
  const fractions = seeks && seeks.length > 0 ? seeks : [fallback];
  return mergeSampleTimes(fractions.map((fraction) => fraction * duration));
}
async function buildSampleGrid(driver, options) {
  const duration = await driver.getDuration();
  const baseSamples = buildLayoutSampleTimes({
    duration,
    samples: options.samples,
    at: options.at
  });
  const transitions = options.atTransitions ? buildTransitionSampleTimes({
    duration,
    boundaries: await driver.getTransitionBoundaries(),
    cap: options.maxTransitionSamples
  }) : { times: [], dropped: 0 };
  const captionSamples = options.captionZone ? gateSampleTimes(duration, options.captionZone.seek, 1) : [];
  const frameSamples = options.frameCheck ? gateSampleTimes(duration, options.frameCheck.seek, 0.5) : [];
  const auditSamples = mergeSampleTimes(baseSamples, transitions.times);
  const layoutSamples = mergeSampleTimes(auditSamples, captionSamples, frameSamples);
  if (layoutSamples.length === 0) {
    throw new Error("Could not determine composition duration \u2014 no layout samples run");
  }
  return {
    duration,
    layoutSamples,
    userPickedSamples: options.at?.length ? baseSamples : [],
    captionSamples,
    frameSamples,
    transitionSamples: transitions.times,
    transitionSamplesDropped: transitions.dropped,
    contrastSamples: options.contrast ? selectContrastTimes(auditSamples) : []
  };
}
async function planMotionSampling(driver, motion, duration) {
  if (motion.kind !== "valid") {
    return { times: [], selectors: [], livenessScopes: [], preflightIssues: [], assertions: [] };
  }
  const preflightIssues = await driver.findAmbiguousSelectors(
    collectSamplingTargets(motion.spec.assertions).selectors
  );
  const ambiguous = new Set(preflightIssues.map((issue) => issue.selector));
  const assertions = motion.spec.assertions.filter(
    (assertion) => !assertionTargets(assertion).selectors.some((selector) => ambiguous.has(selector))
  );
  noteSkippedAssertions(preflightIssues, motion.spec.assertions);
  const targets = collectSamplingTargets(assertions);
  const times = assertions.length > 0 ? buildMotionSampleTimes(motion.spec.duration ?? duration) : [];
  return { times, ...targets, preflightIssues, assertions };
}
function noteSkippedAssertions(issues, assertions) {
  for (const issue of issues) {
    const skipped = assertions.filter(
      (assertion) => assertionTargets(assertion).selectors.includes(issue.selector)
    ).length;
    if (skipped > 0) issue.message += ` ${skipped} assertion(s) naming it were not evaluated.`;
  }
}
function geometryRequest(time, grid, options) {
  const text = grid.captionSamples.includes(time);
  const media = grid.frameSamples.includes(time);
  if (!text && !media) return null;
  const configuredTolerance = options.frameCheck?.tol;
  const tolerance = typeof configuredTolerance === "number" ? configuredTolerance : 2;
  return { text, media, tolerance };
}
function candidateIsSized(candidate, canvas) {
  if (candidate.elementRect.width < 4 || candidate.elementRect.height < 4) return false;
  return !(candidate.elementRect.width >= 0.95 * canvas.width && candidate.elementRect.height >= 0.95 * canvas.height);
}
function geometryIssueAnchor(candidate, time) {
  return {
    selector: candidate.selector,
    dataAttributes: candidate.dataAttributes,
    sourceFile: candidate.sourceFile,
    bbox: candidate.bbox,
    time,
    rect: candidate.rect
  };
}
function captionBoxOverlapsZone(box, zone, canvas) {
  const zx0 = zone.x0 * canvas.width;
  const zy0 = zone.y0 * canvas.height;
  const zx1 = zone.x1 * canvas.width;
  const zy1 = zone.y1 * canvas.height;
  const bx1 = box.left + box.width;
  const by1 = box.top + box.height;
  const overlaps = box.left < zx1 && bx1 > zx0 && box.top < zy1 && by1 > zy0;
  return { overlaps, cy: box.top + box.height / 2 };
}
function captionFinding(candidate, options, canvas, time) {
  const zone = options.captionZone;
  if (!zone || candidate.kind !== "text" || !candidateIsSized(candidate, canvas)) return null;
  if ("data-layout-allow-caption-zone" in candidate.dataAttributes) return null;
  const { overlaps, cy } = captionBoxOverlapsZone(candidate.elementRect, zone, canvas);
  if (!overlaps) return null;
  const text = candidate.text.slice(0, 48);
  const pctFromBottom = Math.round((canvas.height - cy) / canvas.height * 100);
  return {
    key: `${candidate.tag}|${text}`,
    issue: {
      ...geometryIssueAnchor(candidate, time),
      code: "caption_zone_collision",
      severity: zone.severity === "error" ? "error" : "warning",
      text,
      message: `<${candidate.tag}> "${text}" overlaps the reserved caption band (~${pctFromBottom}% up from the bottom).`,
      fixHint: "Keep main content outside the configured caption band, or mark intentional lower-third copy with data-layout-allow-caption-zone."
    }
  };
}
function maxOverflow(candidate) {
  if (!candidate.overflow) return 0;
  return Math.max(
    candidate.overflow.left ?? 0,
    candidate.overflow.top ?? 0,
    candidate.overflow.right ?? 0,
    candidate.overflow.bottom ?? 0
  );
}
function overflowMessage(candidate) {
  const overflow = candidate.overflow ?? {};
  const edges = [];
  if (overflow.left) edges.push(`${overflow.left}px past the left`);
  if (overflow.top) edges.push(`${overflow.top}px past the top`);
  if (overflow.right) edges.push(`${overflow.right}px past the right`);
  if (overflow.bottom) edges.push(`${overflow.bottom}px past the bottom`);
  return `<${candidate.tag}> "${candidate.text.slice(0, 48)}" spills outside the frame (${edges.join(", ")}).`;
}
function frameFinding(candidate, options, canvas, time) {
  if (!options.frameCheck || candidate.kind !== "media" || !candidateIsSized(candidate, canvas)) {
    return null;
  }
  const floor = Math.max(
    FRAME_BREACH_FLOOR_PX,
    FRAME_BREACH_FLOOR_FRACTION * Math.min(canvas.width, canvas.height)
  );
  if (maxOverflow(candidate) < floor) return null;
  const text = candidate.text.slice(0, 48);
  return {
    key: `${candidate.tag}|${text}|${Math.round(candidate.rect.left)},${Math.round(candidate.rect.top)}`,
    issue: {
      ...geometryIssueAnchor(candidate, time),
      code: "frame_out_of_frame",
      severity: options.frameCheck.severity === "error" ? "error" : "warning",
      text,
      overflow: candidate.overflow,
      message: overflowMessage(candidate),
      fixHint: "Keep media within the composition frame's safe area."
    }
  };
}
function appendGeometryFinding(result, seen, issues) {
  if (!result || seen.has(result.key)) return;
  seen.add(result.key);
  issues.push(result.issue);
}
async function collectGeometryAt(driver, options, grid, canvas, time, seen) {
  const request = geometryRequest(time, grid, options);
  if (!request) return [];
  const candidates = await driver.collectGeometryCandidates(time, request);
  const issues = [];
  for (const candidate of candidates) {
    if (request.text) {
      appendGeometryFinding(captionFinding(candidate, options, canvas, time), seen.caption, issues);
    }
    if (request.media) {
      appendGeometryFinding(frameFinding(candidate, options, canvas, time), seen.frame, issues);
    }
  }
  return issues;
}
async function collectGridSamples(driver, options, grid, motion) {
  const layoutSet = new Set(grid.layoutSamples);
  const motionSet = new Set(motion.times);
  const contrastSet = new Set(grid.contrastSamples);
  const geometryEnabled = grid.captionSamples.length > 0 || grid.frameSamples.length > 0;
  const canvas = geometryEnabled ? await driver.getCanvas() : null;
  const geometrySeen = { caption: /* @__PURE__ */ new Set(), frame: /* @__PURE__ */ new Set() };
  const collected = {
    layoutIssues: [],
    motionFrames: [],
    contrastEntries: [],
    screenshots: [],
    contrastMs: 0,
    layoutStateSignatures: [],
    rotationSamples: [],
    indicatorFrames: []
  };
  for (const time of mergeSampleTimes(grid.layoutSamples, motion.times)) {
    await driver.seek(time);
    const issuesAtTime = [];
    if (layoutSet.has(time)) {
      const layoutIssues = await driver.collectLayout(time, options.tolerance, options.layout);
      collected.layoutIssues.push(...layoutIssues);
      issuesAtTime.push(...layoutIssues);
      collected.layoutStateSignatures.push({
        time,
        signature: await driver.collectLayoutGeometry()
      });
      collected.rotationSamples.push(...await driver.collectRotationSample(time));
      collected.indicatorFrames.push(await driver.collectOffPivotRotationSample(time));
    }
    if (canvas) {
      const geometryIssues = await collectGeometryAt(
        driver,
        options,
        grid,
        canvas,
        time,
        geometrySeen
      );
      collected.layoutIssues.push(...geometryIssues);
      issuesAtTime.push(...geometryIssues);
    }
    if (motionSet.has(time)) {
      collected.motionFrames.push(
        await driver.collectMotionFrame(time, motion.selectors, motion.livenessScopes)
      );
    }
    if (contrastSet.has(time)) {
      const contrastStart = Date.now();
      const capture = options.snapshots ? await driver.collectContrast(time, annotationBoxesFrom(issuesAtTime)) : await driver.collectContrast(time);
      collected.contrastMs += Date.now() - contrastStart;
      collected.contrastEntries.push(...capture.entries);
      collected.screenshots.push({ time, pngBase64: capture.pngBase64 });
    }
  }
  await collectMotionOverlapSamples(driver, grid, collected);
  return collected;
}
var OVERLAP_SAMPLE_FPS = 8;
var OVERLAP_MAX_SAMPLES = 600;
function buildOverlapSampleTimes(duration) {
  if (!Number.isFinite(duration) || duration <= 0) return [];
  const count = Math.min(
    OVERLAP_MAX_SAMPLES,
    Math.max(2, Math.ceil(duration * OVERLAP_SAMPLE_FPS) + 1)
  );
  const step = duration / (count - 1);
  return mergeSampleTimes(
    Array.from({ length: count }, (_, index) => Math.round(index * step * 1e3) / 1e3)
  );
}
async function collectMotionOverlapSamples(driver, grid, collected) {
  const baseTimes = new Set(grid.layoutSamples);
  for (const time of buildOverlapSampleTimes(grid.duration)) {
    if (baseTimes.has(time)) continue;
    await driver.seekGeometry(time);
    collected.layoutIssues.push(...await driver.collectOverlap(time));
  }
}
var SWEEP_STATIC_MIN_DURATION_SEC = 3;
var ZERO_LAYOUT_RECT = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
};
function detectSweepStatic(duration, layoutStateSignatures, motionIssues, hasNoTimelineDeclaration) {
  if (hasNoTimelineDeclaration) return [];
  if (duration < SWEEP_STATIC_MIN_DURATION_SEC) return [];
  if (layoutStateSignatures.length < 2) return [];
  if (motionIssues.some((issue) => issue.code === "motion_frozen")) return [];
  if (allSame(layoutStateSignatures)) return [sweepStaticIssue("error")];
  if (allSame(layoutStateSignatures.map(seenPart))) return [sweepStaticIssue("warning")];
  return [];
}
var AUDIO_TIME_SEPARATOR = "";
function seenPart(signature) {
  return signature.split(AUDIO_TIME_SEPARATOR)[0] ?? signature;
}
function allSame(values) {
  return values.every((value) => value === values[0]);
}
function sweepStaticIssue(severity) {
  return {
    code: "sweep_static",
    severity,
    time: 0,
    selector: "[data-composition-id]",
    dataAttributes: {},
    sourceFile: "index.html",
    bbox: ZERO_BBOX,
    rect: ZERO_LAYOUT_RECT,
    message: severity === "error" ? "Timeline did not advance under seek; every green verdict on this run is unreliable." : "Only the audio advanced under seek; nothing on screen moved.",
    fixHint: "If the composition is meant to be still, add `data-no-timeline` to the element with `data-composition-id`. Otherwise confirm it seeks a paused GSAP/CSS timeline under `data-*` timing attributes rather than only autoplaying."
  };
}
var ROTATION_MIN_SAMPLES = 3;
var ROTATION_MIN_ANGLE_SPREAD_DEG = 20;
var ROTATION_MAX_SIZE_RATIO = 1.6;
var ROTATION_RIGID_AABB_RATIO = 1.15;
var ROTATION_RIGID_ESTIMATE_MIN_DET = 0.15;
var ROTATION_MIN_MEDIAN_AREA_PX = 2500;
var ROTATION_DRIFT_SIZE_FRACTION = 0.1;
var ROTATION_DRIFT_VIEWPORT_FRACTION = 0.02;
function median(values) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const upper = sorted[mid] ?? 0;
  return sorted.length % 2 === 0 ? ((sorted[mid - 1] ?? 0) + upper) / 2 : upper;
}
function maxAngleSpread(angles) {
  let max = 0;
  for (let i = 0; i < angles.length; i++) {
    const a = angles[i];
    if (a === void 0) continue;
    for (let j = i + 1; j < angles.length; j++) {
      const b = angles[j];
      if (b === void 0) continue;
      const raw = Math.abs(a - b) % 360;
      max = Math.max(max, Math.min(raw, 360 - raw));
    }
  }
  return max;
}
function maxCenterDrift(samples) {
  let max = 0;
  for (let i = 0; i < samples.length; i++) {
    const first = samples[i];
    if (!first) continue;
    for (let j = i + 1; j < samples.length; j++) {
      const second = samples[j];
      if (!second) continue;
      max = Math.max(max, Math.hypot(first.cx - second.cx, first.cy - second.cy));
    }
  }
  return max;
}
function rotationDriftFinding(samples, drift) {
  const last = samples[samples.length - 1];
  if (!last) return null;
  const rect = {
    left: last.cx - last.w / 2,
    top: last.cy - last.h / 2,
    right: last.cx + last.w / 2,
    bottom: last.cy + last.h / 2,
    width: last.w,
    height: last.h
  };
  return {
    code: "rotation_pivot_drift",
    // EF promotes this to error separately; keep it a warning here.
    severity: "warning",
    time: last.time,
    selector: last.selector,
    dataAttributes: {},
    sourceFile: "index.html",
    bbox: rectToBbox(rect),
    rect,
    message: `Rotating element's bounding-box center drifts ${Math.round(drift)}px across rotation \u2014 it is not spinning about its own center (check transformOrigin/svgOrigin).`,
    fixHint: "The bounding-box center should stay fixed while the element spins; check its transformOrigin/svgOrigin so rotation pivots about the element's own center rather than a point in a coordinate space it was resized out of."
  };
}
function groupBy(items, keyOf) {
  const byKey = /* @__PURE__ */ new Map();
  for (const item of items) {
    const group = byKey.get(keyOf(item));
    if (group) group.push(item);
    else byKey.set(keyOf(item), [item]);
  }
  return byKey;
}
function groupBySelector(samples) {
  return groupBy(samples, (sample) => sample.selector);
}
function hasEnoughRotationSamples(group) {
  return group.length >= ROTATION_MIN_SAMPLES;
}
function isActuallySpinning(group) {
  return maxAngleSpread(group.map((s) => s.angle)) > ROTATION_MIN_ANGLE_SPREAD_DEG;
}
function aabbForRotatedRect(elemW, elemH, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  const cosAbs = Math.abs(Math.cos(rad));
  const sinAbs = Math.abs(Math.sin(rad));
  return { w: elemW * cosAbs + elemH * sinAbs, h: elemW * sinAbs + elemH * cosAbs };
}
function unrotatedSizeFromSample(sample) {
  const rad = sample.angle * Math.PI / 180;
  const cosAbs = Math.abs(Math.cos(rad));
  const sinAbs = Math.abs(Math.sin(rad));
  const det = cosAbs * cosAbs - sinAbs * sinAbs;
  if (Math.abs(det) < ROTATION_RIGID_ESTIMATE_MIN_DET) return null;
  const elemW = (cosAbs * sample.w - sinAbs * sample.h) / det;
  const elemH = (cosAbs * sample.h - sinAbs * sample.w) / det;
  if (!(elemW > 0) || !(elemH > 0)) return null;
  return { w: elemW, h: elemH };
}
function aabbMatchesSample(expected, sample) {
  if (expected.w <= 0 || expected.h <= 0 || sample.w <= 0 || sample.h <= 0) return false;
  return Math.max(expected.w, sample.w) / Math.min(expected.w, sample.w) <= ROTATION_RIGID_AABB_RATIO && Math.max(expected.h, sample.h) / Math.min(expected.h, sample.h) <= ROTATION_RIGID_AABB_RATIO;
}
function isSingularRotationAngle(angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  const cosAbs = Math.abs(Math.cos(rad));
  const sinAbs = Math.abs(Math.sin(rad));
  return Math.abs(cosAbs * cosAbs - sinAbs * sinAbs) < ROTATION_RIGID_ESTIMATE_MIN_DET;
}
function isNearSquareAabb(sample) {
  if (sample.w <= 0 || sample.h <= 0) return false;
  return Math.max(sample.w, sample.h) / Math.min(sample.w, sample.h) <= ROTATION_RIGID_AABB_RATIO;
}
function fitsSingularPhaseRigidProjection(group) {
  if (group.length === 0 || !group.every((s) => isSingularRotationAngle(s.angle))) return false;
  if (!group.every(isNearSquareAabb)) return false;
  const ref = group[0];
  if (!ref) return false;
  return group.every((sample) => aabbMatchesSample({ w: ref.w, h: ref.h }, sample));
}
function fitsOneRigidRectangle(group) {
  for (const ref of group) {
    const size = unrotatedSizeFromSample(ref);
    if (!size) continue;
    if (group.every(
      (sample) => aabbMatchesSample(aabbForRotatedRect(size.w, size.h, sample.angle), sample)
    )) {
      return true;
    }
  }
  return fitsSingularPhaseRigidProjection(group);
}
function isRotationSizeStable(group) {
  if (group.some((s) => s.w <= 0 || s.h <= 0)) return false;
  const longSides = group.map((s) => Math.max(s.w, s.h));
  const minLong = Math.min(...longSides);
  if (minLong <= 0) return false;
  if (Math.max(...longSides) / minLong > ROTATION_MAX_SIZE_RATIO) return false;
  return fitsOneRigidRectangle(group);
}
function isSizableRotation(group) {
  return median(group.map((s) => s.w * s.h)) >= ROTATION_MIN_MEDIAN_AREA_PX;
}
function isRotationDriftCandidate(group) {
  return hasEnoughRotationSamples(group) && isActuallySpinning(group) && isRotationSizeStable(group) && isSizableRotation(group);
}
function detectRotationPivotDrift(samples, canvas) {
  const findings = [];
  const viewportFloor = ROTATION_DRIFT_VIEWPORT_FRACTION * Math.min(canvas.width, canvas.height);
  for (const group of groupBySelector(samples).values()) {
    if (!isRotationDriftCandidate(group)) continue;
    const medianSize = median(group.map((s) => Math.max(s.w, s.h)));
    const threshold = Math.max(ROTATION_DRIFT_SIZE_FRACTION * medianSize, viewportFloor);
    const drift = maxCenterDrift(group);
    if (drift <= threshold) continue;
    const finding = rotationDriftFinding(group, drift);
    if (finding) findings.push(finding);
  }
  return findings;
}
var INDICATOR_MIN_SAMPLES = 5;
var INDICATOR_MIN_ANGLE_SPREAD_DEG = 20;
var INDICATOR_MIN_HUB_CIRCLES = 2;
var INDICATOR_MAX_FIT_RESIDUAL_FRACTION = 0.05;
var INDICATOR_MAX_RIGID_LEN_VARIATION = 0.15;
var INDICATOR_DRIFT_LENGTH_FRACTION = 0.35;
function fitCircle(points) {
  const count = points.length;
  if (count < 3) return null;
  const meanX = points.reduce((sum, p) => sum + p.x, 0) / count;
  const meanY = points.reduce((sum, p) => sum + p.y, 0) / count;
  let suu = 0;
  let svv = 0;
  let suv = 0;
  let suuu = 0;
  let svvv = 0;
  let suvv = 0;
  let svuu = 0;
  for (const point of points) {
    const u = point.x - meanX;
    const v = point.y - meanY;
    suu += u * u;
    svv += v * v;
    suv += u * v;
    suuu += u * u * u;
    svvv += v * v * v;
    suvv += u * v * v;
    svuu += v * u * u;
  }
  const determinant = suu * svv - suv * suv;
  if (Math.abs(determinant) < 1e-6) return null;
  const rhsU = (suuu + suvv) / 2;
  const rhsV = (svvv + svuu) / 2;
  const uc = (rhsU * svv - rhsV * suv) / determinant;
  const vc = (rhsV * suu - rhsU * suv) / determinant;
  const cx = uc + meanX;
  const cy = vc + meanY;
  const radius = Math.sqrt(uc * uc + vc * vc + (suu + svv) / count);
  let squaredError = 0;
  for (const point of points) {
    const delta = Math.hypot(point.x - cx, point.y - cy) - radius;
    squaredError += delta * delta;
  }
  return { cx, cy, radius, residual: Math.sqrt(squaredError / count) };
}
var INDICATOR_MIN_HUB_PRESENCE_FRACTION = 0.6;
function resolveHub(group) {
  const present = group.filter(
    (s) => s.hx !== null && s.hy !== null && s.hubCount >= INDICATOR_MIN_HUB_CIRCLES
  );
  if (present.length < INDICATOR_MIN_HUB_PRESENCE_FRACTION * group.length) return null;
  const hx = median(present.map((s) => s.hx));
  const hy = median(present.map((s) => s.hy));
  return { hx, hy };
}
function isRigidBody(group) {
  const lengths = group.map((s) => s.len).filter((len) => len > 0);
  if (lengths.length < group.length) return false;
  const mid = median(lengths);
  if (mid <= 0) return false;
  const spread = Math.max(...lengths) - Math.min(...lengths);
  return spread <= INDICATOR_MAX_RIGID_LEN_VARIATION * mid;
}
function recoverPivot(group) {
  if (group.length < INDICATOR_MIN_SAMPLES) return null;
  const endpointA = group.map((s) => ({ x: s.ax, y: s.ay }));
  const endpointB = group.map((s) => ({ x: s.bx, y: s.by }));
  const fits = [fitCircle(endpointA), fitCircle(endpointB)].filter(
    (fit) => fit !== null
  );
  if (fits.length === 0) return null;
  const best = fits.reduce((widest, fit) => fit.radius > widest.radius ? fit : widest);
  if (best.radius <= 0) return null;
  if (best.residual > INDICATOR_MAX_FIT_RESIDUAL_FRACTION * best.radius) return null;
  return best;
}
function offPivotRotationFinding(group, drift) {
  const last = group[group.length - 1];
  if (!last) return null;
  const rect = {
    left: Math.min(last.ax, last.bx) - 4,
    top: Math.min(last.ay, last.by) - 4,
    right: Math.max(last.ax, last.bx) + 4,
    bottom: Math.max(last.ay, last.by) + 4,
    width: Math.abs(last.bx - last.ax) + 8,
    height: Math.abs(last.by - last.ay) + 8
  };
  return {
    code: "off_pivot_rotation",
    severity: "warning",
    time: last.time,
    selector: last.selector,
    dataAttributes: {},
    sourceFile: "index.html",
    bbox: rectToBbox(rect),
    rect,
    message: `Gauge/dial pointer rotates about a point ${Math.round(drift)}px from the dial hub \u2014 its center-of-rotation is off the hub, so it points wrong or overshoots the track (check the rotating group's pivot: translate to the hub before rotate, or set svgOrigin/transform-origin to the hub).`,
    fixHint: "The pointer's center-of-rotation must coincide with the dial hub. Rotate the group about the hub (e.g. transform-origin/svgOrigin set to the hub center, or translate the group so its rotation pivot lands on the hub) rather than about the element's own bbox center."
  };
}
function countAngularBodies(angles) {
  const clusters = [];
  for (const angle of angles) {
    if (!clusters.some((rep) => Math.min(Math.abs(angle - rep), 360 - Math.abs(angle - rep)) <= 25)) {
      clusters.push(angle);
    }
  }
  return clusters.length;
}
function angleAboutHub(group, hub) {
  const midX = median(group.map((s) => (s.ax + s.bx) / 2));
  const midY = median(group.map((s) => (s.ay + s.by) / 2));
  return Math.atan2(midY - hub.hy, midX - hub.hx) * 180 / Math.PI;
}
function buildIndicatorCandidate(group) {
  if (group.length < INDICATOR_MIN_SAMPLES) return null;
  if (maxAngleSpread(group.map((s) => s.angle)) <= INDICATOR_MIN_ANGLE_SPREAD_DEG) return null;
  const hub = resolveHub(group);
  if (!hub) return null;
  if (!isRigidBody(group)) return null;
  const pivot = recoverPivot(group);
  if (!pivot) return null;
  const drift = Math.hypot(pivot.cx - hub.hx, pivot.cy - hub.hy);
  const length = median(group.map((s) => s.len));
  const eligible = drift > INDICATOR_DRIFT_LENGTH_FRACTION * length;
  return {
    // Scoped-known blind spot: hubs bucketed by rounded screen coords, so two
    // separate dials whose screen hubs land in the same 5px bucket merge into
    // one multi-body group (rare — distinct dials stacked at ~identical screen
    // position). Key by owning <svg> identity if that pattern shows up.
    hubKey: `${Math.round(hub.hx / 5)}:${Math.round(hub.hy / 5)}`,
    angleAboutHub: angleAboutHub(group, hub),
    drift,
    length,
    finding: eligible ? offPivotRotationFinding(group, drift) : null
  };
}
function selectHubFindings(candidates) {
  const byHub = groupBy(candidates, (candidate) => candidate.hubKey);
  const findings = [];
  for (const group of byHub.values()) {
    const eligible = group.filter((c2) => c2.finding !== null);
    if (countAngularBodies(eligible.map((c2) => c2.angleAboutHub)) >= 2) continue;
    const best = group.filter((c2) => c2.finding !== null).reduce(
      (max, c2) => !max || c2.length > max.length ? c2 : max,
      null
    );
    if (best?.finding) findings.push(best.finding);
  }
  return findings;
}
function detectOffPivotRotation(frames) {
  const timed = frames.flatMap(
    (frame) => frame.samples.map((sample) => ({ ...sample, time: frame.time }))
  );
  const candidates = [];
  for (const group of groupBySelector(timed).values()) {
    const candidate = buildIndicatorCandidate(group);
    if (candidate) candidates.push(candidate);
  }
  return selectHubFindings(candidates);
}
function annotationBoxesFrom(issues) {
  return issues.filter((issue) => issue.severity === "error" && issue.bbox.width > 0 && issue.bbox.height > 0).map((issue, index) => ({ label: `${index + 1} ${issue.code}`, bbox: issue.bbox }));
}
async function runAuditGrid(driver, options, motion) {
  await driver.initialize(options.contrast);
  const grid = await buildSampleGrid(driver, options);
  const plan = await planMotionSampling(driver, motion, grid.duration);
  const seekLoopStart = Date.now();
  const collected = await collectGridSamples(driver, options, grid, plan);
  const seekLoopMs = Date.now() - seekLoopStart;
  let motionIssues = plan.preflightIssues;
  if (motion.kind === "valid" && plan.assertions.length > 0 && collected.motionFrames.length > 0) {
    const evaluated = evaluateMotion(
      collected.motionFrames,
      plan.assertions,
      await driver.getCanvas()
    );
    motionIssues = [...motionIssues, ...await driver.anchorMotionIssues(evaluated)];
  }
  const userPicked = new Set(grid.userPickedSamples);
  const sweepFindings = detectSweepStatic(
    grid.duration,
    collected.layoutStateSignatures.filter((sample) => !userPicked.has(sample.time)).map((sample) => sample.signature),
    motionIssues,
    await driver.hasNoTimelineDeclaration()
  );
  const rotationFindings = detectRotationPivotDrift(
    collected.rotationSamples,
    await driver.getCanvas()
  );
  const offPivotFindings = detectOffPivotRotation(collected.indicatorFrames);
  const contrast = buildContrastResults(collected.contrastEntries);
  return {
    duration: grid.duration,
    layoutSamples: grid.layoutSamples,
    transitionSamples: grid.transitionSamples,
    transitionSamplesDropped: grid.transitionSamplesDropped,
    runtimeFindings: [],
    layoutIssues: [
      ...collected.layoutIssues,
      ...sweepFindings,
      ...rotationFindings,
      ...offPivotFindings
    ],
    motionIssues,
    motionSampleCount: collected.motionFrames.length,
    contrastSamples: grid.contrastSamples,
    contrastFindings: contrast.findings,
    contrastChecked: collected.contrastEntries.length,
    contrastPassed: contrast.passed,
    screenshots: collected.screenshots,
    timings: { launchSettleMs: 0, seekLoopMs, contrastMs: collected.contrastMs },
    skipped: false
  };
}
async function runCheckPipeline(project, options, dependencies = DEFAULT_DEPENDENCIES2) {
  let lintResult;
  const lintStartedAt = Date.now();
  try {
    lintResult = await dependencies.lintProject(project.dir);
  } catch (error) {
    return failureReport(options, runtimeFailure(error, "check_lint_failure"));
  }
  trackLintRun(project.dir, lintResult, {
    command: "check",
    durationMs: Date.now() - lintStartedAt,
    ...getRunId() !== void 0 ? { runId: getRunId() } : {}
  });
  const lint = buildLintSection(lintResult);
  let hdrPromotion = null;
  let hdrInspection = "available";
  try {
    hdrPromotion = await (dependencies.inspectHdrAutoPromotion ?? inspectHdrAutoPromotion)(project);
  } catch {
    hdrInspection = "unavailable";
  }
  if (shouldBlockRender(true, false, lintResult.totalErrors, lintResult.totalWarnings)) {
    return buildReport(
      options,
      lint,
      emptyBrowserResult(),
      { kind: "none" },
      [],
      [],
      hdrPromotion,
      hdrInspection
    );
  }
  const motion = dependencies.resolveMotionSpec(project.dir);
  const specFindings = motion.kind === "invalid" ? [
    findingAtRoot(
      "motion_spec_invalid",
      "error",
      motion.message,
      relative(project.dir, motion.path) || "index.motion.json"
    )
  ] : [];
  let browser;
  try {
    browser = await dependencies.runBrowserCheck(project, options, motion);
  } catch (error) {
    browser = emptyBrowserResult();
    browser.runtimeFindings.push(runtimeFailure(error));
  }
  const snapshotFiles = options.snapshots ? await writeContrastSnapshots(dependencies, project.dir, browser) : [];
  const report = buildReport(
    options,
    lint,
    browser,
    motion,
    specFindings,
    snapshotFiles,
    hdrPromotion,
    hdrInspection
  );
  return options.snapshots ? await withFindingCrops(dependencies, project, options, report) : report;
}
async function writeContrastSnapshots(dependencies, projectDir, browser) {
  const files = [];
  for (let index = 0; index < browser.screenshots.length; index += 1) {
    const shot = browser.screenshots[index];
    if (!shot) continue;
    try {
      files.push(await dependencies.writeSnapshot(projectDir, index, shot.time, shot.pngBase64));
    } catch (error) {
      browser.runtimeFindings.push(runtimeFailure(error, "snapshot_write_failed"));
    }
  }
  return files;
}
async function withFindingCrops(dependencies, project, options, report) {
  const cropRequests = selectFindingCropRequests(report);
  if (cropRequests.length === 0) return report;
  try {
    const findingFiles = await dependencies.captureFindingCrops(project, options, cropRequests);
    return { ...report, snapshots: { ...report.snapshots, findingFiles } };
  } catch (error) {
    console.error("   finding crops skipped: " + normalizeErrorMessage(error));
    trackCommandFailure("check-finding-crops", error);
    return report;
  }
}
var MAX_FINDING_CROPS = 12;
function selectFindingCropRequests(report) {
  const candidates = [
    ...report.layout.findings,
    ...report.motion.findings,
    ...report.contrast.findings,
    ...report.runtime.findings
  ];
  const requests = [];
  for (const finding of candidates) {
    if (requests.length >= MAX_FINDING_CROPS) break;
    if (finding.severity !== "error" || !hasRealBbox(finding.bbox)) continue;
    requests.push({
      filename: findingCropFilename(requests.length, finding.code),
      time: finding.time,
      bbox: finding.bbox
    });
  }
  return requests;
}
function hasRealBbox(bbox) {
  return bbox.width > 0 && bbox.height > 0;
}
function findingCropFilename(index, code) {
  const safeCode = code.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `finding-${String(index).padStart(2, "0")}-${safeCode}.png`;
}
function checkExitCode(report) {
  return report.ok ? 0 : 1;
}
function contrastFailureHeld(entries) {
  const sampledTimes = new Set(entries.map((entry) => entry.time)).size;
  const failureSamples = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    if (entry.wcagAA) continue;
    const key = `${entry.selector}|${entry.text}`;
    const times = failureSamples.get(key) ?? /* @__PURE__ */ new Set();
    times.add(entry.time);
    failureSamples.set(key, times);
  }
  return (entry) => sampledTimes < 2 || (failureSamples.get(`${entry.selector}|${entry.text}`)?.size ?? 0) >= 2;
}
function buildContrastResults(entries) {
  const findings = [];
  let passed = 0;
  const isHeld = contrastFailureHeld(entries);
  for (const entry of entries) {
    if (entry.wcagAA) {
      passed += 1;
      continue;
    }
    const held = isHeld(entry);
    const requiredRatio = requiredContrastRatio(entry.large);
    findings.push({
      code: "contrast_aa_failure",
      severity: held ? "error" : "warning",
      message: `Contrast is ${entry.ratio}:1; WCAG AA requires ${requiredRatio}:1.`,
      text: entry.text,
      fg: entry.fg,
      bg: entry.bg,
      ratio: entry.ratio,
      requiredRatio,
      suggestedColor: suggestedColor(entry.fg, entry.bg, requiredRatio),
      large: entry.large,
      selector: entry.selector,
      dataAttributes: entry.dataAttributes,
      sourceFile: entry.sourceFile,
      bbox: entry.bbox,
      time: entry.time
    });
  }
  return { findings, passed };
}
function suggestedColor(fg, bg, requiredRatio) {
  const foreground = parseColorRGBA(fg);
  const background = parseColorRGBA(bg);
  if (!foreground || !background) return fg;
  const fgRgb = [foreground[0], foreground[1], foreground[2]];
  const bgRgb = [background[0], background[1], background[2]];
  const suggested = suggestCompliantForegroundColor(fgRgb, bgRgb, requiredRatio);
  return `rgb(${suggested[0]},${suggested[1]},${suggested[2]})`;
}
function buildLintSection(result) {
  const findings = result.results.flatMap(
    ({ file, result: fileResult }) => fileResult.findings.map((finding) => ({
      code: finding.code,
      severity: finding.severity,
      message: finding.message,
      selector: finding.selector ?? (finding.elementId ? `#${finding.elementId}` : "[data-composition-id]"),
      dataAttributes: {},
      sourceFile: finding.file ?? file,
      bbox: ZERO_BBOX,
      time: 0,
      fixHint: finding.fixHint
    }))
  );
  return { ...section(findings), filesScanned: result.results.length };
}
function buildReport(options, lint, browser, motion, extraMotionFindings, snapshotFiles, hdrPromotion = null, hdrInspection = "available") {
  const layout = shapeLayoutSection(browser.layoutIssues, browser, options);
  const shapedMotion = shapeLayoutFindings(browser.motionIssues, options);
  const motionFindings = [...shapedMotion.findings, ...extraMotionFindings];
  const runtime = section(browser.runtimeFindings);
  const motionSection = section(motionFindings);
  const contrastSection = section(browser.contrastFindings);
  const warningCount = lint.warningCount + runtime.warningCount + layout.warningCount + motionSection.warningCount + contrastSection.warningCount;
  const errorCount = lint.errorCount + runtime.errorCount + layout.errorCount + motionSection.errorCount + contrastSection.errorCount;
  const report = {
    ok: errorCount === 0 && (!options.strict || warningCount === 0),
    strict: options.strict,
    browserSkipped: browser.skipped,
    lint,
    runtime,
    layout,
    motion: {
      ...motionSection,
      enabled: motion.kind !== "none",
      specPath: motion.kind === "none" ? void 0 : motion.path,
      samples: browser.motionSampleCount
    },
    contrast: {
      ...contrastSection,
      enabled: options.contrast,
      samples: browser.contrastSamples,
      checked: browser.contrastChecked,
      passed: browser.contrastPassed
    },
    hdr: { autoPromotion: hdrPromotion, inspection: hdrInspection },
    snapshots: {
      enabled: options.snapshots,
      files: snapshotFiles,
      times: options.snapshots ? browser.screenshots.map((shot) => shot.time) : [],
      findingFiles: []
    }
  };
  trackCheckReport({
    contrastGate: options.contrast,
    motionGate: motion.kind !== "none",
    captionZoneGate: options.captionZone !== void 0,
    frameCheckGate: options.frameCheck !== void 0,
    snapshotsGate: options.snapshots,
    lintErrors: lint.errorCount,
    lintWarnings: lint.warningCount,
    runtimeErrors: runtime.errorCount,
    runtimeWarnings: runtime.warningCount,
    layoutErrors: layout.errorCount,
    layoutWarnings: layout.warningCount,
    motionErrors: motionSection.errorCount,
    motionWarnings: motionSection.warningCount,
    contrastErrors: contrastSection.errorCount,
    contrastWarnings: contrastSection.warningCount,
    launchSettleMs: browser.timings.launchSettleMs,
    seekLoopMs: browser.timings.seekLoopMs,
    contrastMs: browser.timings.contrastMs,
    gridPoints: browser.layoutSamples.length,
    contrastPoints: browser.contrastChecked,
    ok: report.ok,
    exitCode: checkExitCode(report),
    runId: getRunId()
  });
  return report;
}
function shapeLayoutSection(issues, browser, options) {
  const shaped = shapeLayoutFindings(issues, options, browser.layoutSamples.length);
  return {
    ...section(shaped.findings),
    duration: browser.duration,
    samples: browser.layoutSamples,
    transitionSamples: browser.transitionSamples,
    transitionSamplesDropped: browser.transitionSamplesDropped,
    tolerance: options.tolerance,
    totalIssueCount: shaped.totalIssueCount,
    truncated: shaped.truncated
  };
}
function shapeLayoutFindings(issues, options, totalSampleCount) {
  const deduped = dedupeLayoutIssues(issues);
  const all = options.collapseStatic ? collapseStaticLayoutIssues(deduped, totalSampleCount) : deduped;
  const limited = limitLayoutIssues(all, options.maxIssues);
  return {
    findings: limited.issues.map(ensureAnchoredLayoutIssue),
    totalIssueCount: limited.totalIssueCount,
    truncated: limited.truncated
  };
}
function ensureAnchoredLayoutIssue(issue) {
  const sourceFile = Reflect.get(issue, "sourceFile");
  const dataAttributes = Reflect.get(issue, "dataAttributes");
  const bbox = Reflect.get(issue, "bbox");
  if (typeof sourceFile === "string" && isStringRecord(dataAttributes) && isBbox(bbox)) {
    return { ...issue, sourceFile, dataAttributes, bbox };
  }
  return {
    ...issue,
    sourceFile: "index.html",
    dataAttributes: {},
    bbox: rectToBbox(issue.rect)
  };
}
function section(findings) {
  const errorCount = findings.filter((finding) => finding.severity === "error").length;
  const warningCount = findings.filter((finding) => finding.severity === "warning").length;
  const infoCount = findings.filter((finding) => finding.severity === "info").length;
  return { ok: errorCount === 0, errorCount, warningCount, infoCount, findings };
}
function emptyBrowserResult() {
  return {
    duration: 0,
    layoutSamples: [],
    transitionSamples: [],
    transitionSamplesDropped: 0,
    runtimeFindings: [],
    layoutIssues: [],
    motionIssues: [],
    motionSampleCount: 0,
    contrastSamples: [],
    contrastFindings: [],
    contrastChecked: 0,
    contrastPassed: 0,
    screenshots: [],
    timings: { launchSettleMs: 0, seekLoopMs: 0, contrastMs: 0 },
    skipped: true
  };
}
function runtimeFailure(error, code = "check_runtime_failure") {
  return findingAtRoot(code, "error", normalizeErrorMessage(error), "index.html");
}
function findingAtRoot(code, severity, message, sourceFile) {
  return {
    code,
    severity,
    message,
    selector: "[data-composition-id]",
    dataAttributes: {},
    sourceFile,
    bbox: ZERO_BBOX,
    time: 0
  };
}
function failureReport(options, finding) {
  const lint = { ...section([]), filesScanned: 0 };
  const browser = emptyBrowserResult();
  browser.runtimeFindings.push(finding);
  return buildReport(options, lint, browser, { kind: "none" }, [], []);
}
function isBbox(value) {
  if (typeof value !== "object" || value === null) return false;
  return ["x", "y", "width", "height"].every((key) => typeof Reflect.get(value, key) === "number");
}
function isStringRecord(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return Object.keys(value).every((key) => typeof Reflect.get(value, key) === "string");
}
function resolveMotionSpec(projectDir) {
  const path = findMotionSpec(projectDir);
  if (!path) return { kind: "none" };
  const result = readMotionSpec(path);
  return result.ok ? { kind: "valid", path, spec: result.spec } : {
    kind: "invalid",
    path,
    message: `Invalid motion spec ${path}: ${result.errors.join("; ")}`
  };
}
async function runBrowserCheck(project, options, motion) {
  const module = await import("./checkBrowser-PKCGRQGS.js");
  return module.runBrowserCheck(project, options, motion, runAuditGrid);
}
async function writeSnapshot(projectDir, index, time, pngBase64) {
  const snapshotDir = join(projectDir, "snapshots");
  mkdirSync(snapshotDir, { recursive: true });
  const filename = `frame-${String(index).padStart(2, "0")}-at-${time.toFixed(1)}s.png`;
  const path = join(snapshotDir, filename);
  writeFileSync(path, Buffer.from(pngBase64, "base64"));
  return join("snapshots", filename);
}
async function captureFindingCrops(project, options, requests) {
  const module = await import("./checkBrowser-PKCGRQGS.js");
  return module.captureFindingCrops(project, options, requests);
}
var DEFAULT_DEPENDENCIES2 = {
  lintProject,
  resolveMotionSpec,
  runBrowserCheck,
  writeSnapshot,
  captureFindingCrops,
  inspectHdrAutoPromotion
};

// src/commands/check.ts
var examples = [
  ["Run the full verification gate", "hyperframes check"],
  ["Output one agent-readable envelope", "hyperframes check --json"],
  ["Persist the five audited contrast frames", "hyperframes check --snapshots"],
  ["Also fail on warnings", "hyperframes check --strict"]
];
var DEFAULT_COMMAND_DEPENDENCIES = {
  resolveProject,
  runPipeline: runCheckPipeline,
  withMeta
};
var CHECK_COMMAND_ARGS = {
  dir: { type: "positional", description: "Project directory", required: false },
  json: { type: "boolean", description: "Output agent-readable JSON", default: false },
  samples: {
    type: "string",
    description: "Number of midpoint samples across the duration (default: 9)",
    default: "9"
  },
  at: {
    type: "string",
    description: "Comma-separated timestamps in seconds (e.g., --at 1.5,4,7.25)"
  },
  "at-transitions": {
    type: "boolean",
    description: "Also sample at every tween start/end boundary (plus segment midpoints) to catch transient overlaps at transition seams",
    default: false
  },
  "max-transition-samples": {
    type: "string",
    description: "Optional cap on transition-derived samples; when it truncates, the omitted count is reported (default: unlimited)"
  },
  "max-issues": {
    type: "string",
    description: "Maximum issues to print or return after static collapse (default: 80)",
    default: "80"
  },
  "collapse-static": {
    type: "boolean",
    description: "Collapse repeated static issues across samples (default: true)",
    default: true
  },
  tolerance: {
    type: "string",
    description: "Allowed pixel overflow before reporting an issue (default: 2)",
    default: "2"
  },
  timeout: {
    type: "string",
    description: "Initial render-ready timeout in ms; also sets the navigation minimum (10s floor, default: 3000)",
    default: "3000"
  },
  contrast: {
    type: "boolean",
    description: "Run the WCAG AA contrast pass (enabled by default)",
    default: true
  },
  strict: {
    type: "boolean",
    description: "Exit non-zero on warnings too",
    default: false
  },
  proxy: {
    type: "boolean",
    description: "Auto-transcode browser-hostile video codecs (default: hyperframes.json media.autoProxy, which defaults on)",
    default: void 0
  },
  "browser-gpu": {
    type: "boolean",
    description: "Use hardware browser GPU capture; pass --no-browser-gpu for deterministic SwiftShader (default: auto-detect, PRODUCER_BROWSER_GPU_MODE overrides)",
    default: void 0
  },
  snapshots: {
    type: "boolean",
    description: "Save the five contrast-pass PNGs under snapshots/",
    default: false
  },
  "caption-zone": {
    type: "string",
    description: 'Caption band "x0=0;y0=.82;x1=1;y1=1[;severity=warning|error][;seek=.5,1]" (fractions 0-1; defaults: warning, seek=1)'
  },
  "frame-check": {
    type: "string",
    description: 'Bare --frame-check uses defaults (tol=2px, severity=warning, seek=.5; breach floor=max(120px, 6% of shorter canvas edge)); or pass "severity=error;seek=.25,.75;tol=4" to tune'
  },
  layout: {
    type: "string",
    description: 'Layout knobs: "proseCoverageFloor=0.05" (0\u20131; default 0.15).'
  }
};
function createCheckCommand(dependencies = DEFAULT_COMMAND_DEPENDENCIES) {
  return defineCommand({
    meta: {
      name: "check",
      description: "Run lint, runtime, layout, motion, and WCAG contrast verification in one browser session"
    },
    args: CHECK_COMMAND_ARGS,
    async run({ rawArgs }) {
      const args = parseArgs(normalizeFrameCheckRawArgs(rawArgs), CHECK_COMMAND_ARGS);
      const asJson = args.json === true;
      try {
        const project = dependencies.resolveProject(args.dir);
        const options = parseCheckOptions(args);
        if (!asJson) {
          console.log(`${c.accent("\u25C6")}  Checking ${c.accent(project.name)}`);
        }
        const report = await dependencies.runPipeline(project, options);
        if (asJson) {
          console.log(JSON.stringify(dependencies.withMeta(report), null, 2));
        } else {
          printHumanReport(report);
        }
        setCommandExitCode(checkExitCode(report));
      } catch (error) {
        const message = normalizeErrorMessage(error);
        if (asJson) {
          console.log(
            JSON.stringify(dependencies.withMeta({ ok: false, error: message }), null, 2)
          );
        } else {
          console.error(`${c.error("\u2717")} Check failed: ${message}`);
        }
        setCommandExitCode(1);
      }
    }
  });
}
function normalizeFrameCheckRawArgs(rawArgs) {
  return rawArgs.map((arg, index) => {
    if (arg !== "--frame-check") return arg;
    const next = rawArgs[index + 1];
    return next === void 0 || next.startsWith("-") ? "--frame-check=" : arg;
  });
}
function parseCheckOptions(args) {
  const maxTransitionSamples = positiveInteger(args["max-transition-samples"], 0);
  return {
    samples: positiveInteger(args.samples, DEFAULT_CHECK_OPTIONS.samples),
    at: parseAt(args.at),
    atTransitions: args["at-transitions"] === true,
    maxTransitionSamples: maxTransitionSamples > 0 ? maxTransitionSamples : void 0,
    maxIssues: positiveInteger(args["max-issues"], DEFAULT_CHECK_OPTIONS.maxIssues),
    collapseStatic: args["collapse-static"] !== false,
    tolerance: nonNegativeNumber(args.tolerance, DEFAULT_CHECK_OPTIONS.tolerance),
    timeout: Math.max(500, positiveInteger(args.timeout, DEFAULT_CHECK_OPTIONS.timeout)),
    contrast: args.contrast !== false,
    strict: args.strict === true,
    snapshots: args.snapshots === true,
    captionZone: parseCaptionZone(args["caption-zone"]),
    frameCheck: parseFrameCheck(args["frame-check"]),
    layout: parseLayout(args.layout),
    autoProxy: args.proxy,
    browserGpuMode: resolveLocalBrowserGpuMode(args["browser-gpu"])
  };
}
var CAPTION_ZONE_FIELDS = /* @__PURE__ */ new Set(["x0", "y0", "x1", "y1", "severity", "seek"]);
var FRAME_CHECK_FIELDS = /* @__PURE__ */ new Set(["severity", "seek", "tol"]);
var LAYOUT_FIELDS = /* @__PURE__ */ new Set(["proseCoverageFloor"]);
function parseFrameCheck(value) {
  if (value === void 0 || value === null || value === false) return void 0;
  if (value === true || value === "") return {};
  if (typeof value !== "string") throw frameCheckError();
  if (value.startsWith("-")) throw swallowedOptionError("frame-check", value);
  const fields = parseFrameCheckFields(value);
  const severity = captionSeverity(fields.get("severity"), frameCheckError);
  const seek = captionSeeks(fields.get("seek"), frameCheckError);
  const tol = parseFrameCheckTolerance(fields.get("tol"));
  return {
    ...severity ? { severity } : {},
    ...seek ? { seek } : {},
    ...tol !== void 0 ? { tol } : {}
  };
}
function parseFrameCheckFields(value) {
  const fields = /* @__PURE__ */ new Map();
  for (const part of value.split(";")) {
    const { key, entry } = parseCaptionField(part, frameCheckError);
    if (!FRAME_CHECK_FIELDS.has(key) || fields.has(key)) throw frameCheckError();
    fields.set(key, entry);
  }
  return fields;
}
function parseFrameCheckTolerance(raw) {
  if (raw === void 0) return void 0;
  const tol = parseNumberStrict(raw);
  if (tol === null || tol < 0) throw frameCheckError();
  return tol;
}
function frameCheckError() {
  return new Error(
    'Invalid --frame-check: use bare --frame-check or "severity=warning|error;seek=.25,.75;tol=4" (all fields optional)'
  );
}
function swallowedOptionError(flag, value) {
  return new Error(
    `Invalid --${flag}: value "${value}" appears to have swallowed the next option; use --${flag}= or move --${flag} to the end`
  );
}
function parseLayout(value) {
  if (value === void 0 || value === null || value === false) return void 0;
  if (value === true || value === "") throw layoutError();
  if (typeof value !== "string") throw layoutError();
  const fields = parseLayoutFields(value);
  const proseCoverageFloor = parseProseCoverageFloor(fields.get("proseCoverageFloor"));
  if (proseCoverageFloor === void 0) throw layoutError();
  return { proseCoverageFloor };
}
function parseLayoutFields(value) {
  const fields = /* @__PURE__ */ new Map();
  for (const part of value.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const separator = trimmed.indexOf("=");
    if (separator <= 0) throw layoutError();
    const key = trimmed.slice(0, separator).trim();
    const entry = trimmed.slice(separator + 1).trim();
    if (!LAYOUT_FIELDS.has(key) || fields.has(key)) throw layoutError();
    fields.set(key, entry);
  }
  return fields;
}
function parseProseCoverageFloor(raw) {
  if (raw === void 0) return void 0;
  const floor = parseNumberStrict(raw);
  if (floor === null || floor < 0 || floor > 1) throw layoutError();
  return floor;
}
function layoutError() {
  return new Error(
    'Invalid --layout: use "proseCoverageFloor=0.05" with a fraction from 0 to 1 (inclusive)'
  );
}
function parseNumberStrict(raw) {
  if (raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
function parseCaptionZone(value) {
  if (value === void 0 || value === null) return void 0;
  const fields = parseCaptionFields(captionZoneString(value));
  const { x0, y0, x1, y1 } = parseCaptionBounds(fields);
  const severity = captionSeverity(fields.get("severity"));
  const seek = captionSeeks(fields.get("seek"));
  return {
    x0,
    y0,
    x1,
    y1,
    ...severity ? { severity } : {},
    ...seek ? { seek } : {}
  };
}
function captionZoneString(value) {
  if (typeof value !== "string" || value.trim() === "") throw captionZoneError();
  return value;
}
function parseCaptionFields(value) {
  const fields = /* @__PURE__ */ new Map();
  for (const part of value.split(";")) {
    const { key, entry } = parseCaptionField(part);
    if (!CAPTION_ZONE_FIELDS.has(key) || fields.has(key)) throw captionZoneError();
    fields.set(key, entry);
  }
  return fields;
}
function parseCaptionField(part, errorFactory = captionZoneError) {
  const separator = part.indexOf("=");
  if (separator <= 0) throw errorFactory();
  return {
    key: part.slice(0, separator).trim(),
    entry: part.slice(separator + 1).trim()
  };
}
function parseCaptionBounds(fields) {
  const x0 = requiredCaptionFraction(fields, "x0");
  const y0 = requiredCaptionFraction(fields, "y0");
  const x1 = requiredCaptionFraction(fields, "x1");
  const y1 = requiredCaptionFraction(fields, "y1");
  if (x0 > x1 || y0 > y1) throw captionZoneError();
  return { x0, y0, x1, y1 };
}
function requiredCaptionFraction(fields, key) {
  const value = captionFraction(fields.get(key));
  if (value === null) throw captionZoneError();
  return value;
}
function captionFraction(value) {
  if (value === void 0 || value === "") return null;
  const parsed = parseNumberStrict(value);
  return parsed !== null && parsed >= 0 && parsed <= 1 ? parsed : null;
}
function captionSeverity(value, errorFactory = captionZoneError) {
  if (value === void 0) return void 0;
  if (value === "error" || value === "warning") return value;
  throw errorFactory();
}
function captionSeeks(value, errorFactory = captionZoneError) {
  if (value === void 0) return void 0;
  if (value === "") return [];
  const values = value.split(",").map(captionFraction);
  if (values.some((entry) => entry === null)) throw errorFactory();
  return values.flatMap((entry) => entry === null ? [] : entry);
}
function captionZoneError() {
  return new Error(
    'Invalid --caption-zone; use "x0=0;y0=.82;x1=1;y1=1[;severity=warning|error][;seek=.5,1]" with fractions from 0 to 1.'
  );
}
function positiveInteger(value, fallback) {
  const parsed = parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function nonNegativeNumber(value, fallback) {
  const parsed = parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}
function printHumanReport(report) {
  printSection("Lint", report.lint);
  if (report.browserSkipped) {
    console.log();
    console.log(
      `  ${c.warn("\u26A0")} Browser session never ran \u2014 layout, motion, and contrast below are empty placeholders, not a clean pass.`
    );
  }
  printSection("Runtime", report.runtime);
  printLayoutSection("Layout", report.layout);
  printSection("Motion", report.motion);
  printContrastSection(report);
  printSnapshotSection(report);
  console.log();
  const label = report.ok ? c.success("Check passed") : c.error("Check failed");
  console.log(`${report.ok ? c.success("\u25C7") : c.error("\u25C7")}  ${label}`);
}
function printSection(title, section2) {
  console.log();
  console.log(c.bold(title));
  if (section2.findings.length === 0) {
    console.log(`  ${c.success("\u25C7")} 0 errors, 0 warnings`);
    return;
  }
  for (const finding of section2.findings) printFinding(finding);
  printCounts(section2);
}
function printLayoutSection(title, section2) {
  console.log();
  console.log(c.bold(title));
  if (section2.findings.length === 0) {
    console.log(`  ${c.success("\u25C7")} 0 issues across ${section2.samples.length} sample(s)`);
  } else {
    for (const finding of section2.findings) {
      const formatted = formatLayoutIssue(finding).replace(/\n/g, "\n    ");
      console.log(`  ${findingIcon(finding)} ${formatted}`);
    }
    printCounts(section2);
  }
  if (section2.transitionSamplesDropped > 0) {
    console.log(
      `  ${c.warn("\u26A0")} ${section2.transitionSamplesDropped} transition sample(s) omitted`
    );
  }
}
function printContrastSection(report) {
  const section2 = report.contrast;
  console.log();
  console.log(c.bold("Contrast"));
  if (!section2.enabled) {
    console.log(`  ${c.dim("\u25C7")} skipped`);
    return;
  }
  if (section2.findings.length === 0) {
    console.log(
      `  ${c.success("\u25C7")} ${section2.passed}/${section2.checked} text checks pass WCAG AA`
    );
    return;
  }
  for (const finding of section2.findings) {
    console.log(
      `  ${c.error("\u2717")} ${finding.selector} ${finding.ratio}:1 (need ${finding.requiredRatio}:1, t=${finding.time}s)`
    );
    console.log(`    ${c.dim(`Try ${finding.suggestedColor}; source ${finding.sourceFile}`)}`);
  }
  printCounts(section2);
}
function printSnapshotSection(report) {
  console.log();
  console.log(c.bold("Snapshots"));
  if (!report.snapshots.enabled) {
    console.log(`  ${c.dim("\u25C7")} disabled`);
  } else {
    console.log(`  ${c.success("\u25C7")} ${report.snapshots.files.length} PNG(s) saved`);
    for (const file of report.snapshots.files) console.log(`    ${c.dim(file)}`);
    if (report.snapshots.findingFiles.length > 0) {
      console.log(
        `  ${c.success("\u25C7")} ${report.snapshots.findingFiles.length} finding crop(s) saved`
      );
      for (const file of report.snapshots.findingFiles) console.log(`    ${c.dim(file)}`);
    }
  }
}
function printFinding(finding) {
  const where = `${finding.sourceFile} ${finding.selector} t=${finding.time}s`;
  console.log(`  ${findingIcon(finding)} ${finding.code}: ${finding.message}`);
  console.log(`    ${c.dim(where)}`);
  if (finding.fixHint) console.log(`    ${c.dim(`Fix: ${finding.fixHint}`)}`);
}
function findingIcon(finding) {
  if (finding.severity === "error") return c.error("\u2717");
  if (finding.severity === "warning") return c.warn("\u26A0");
  return c.dim("\u2139");
}
function printCounts(section2) {
  console.log(
    `  ${c.dim(`${section2.errorCount} error(s), ${section2.warningCount} warning(s), ${section2.infoCount} info(s)`)}`
  );
}
var check_default = createCheckCommand();
export {
  createCheckCommand,
  check_default as default,
  examples,
  parseFrameCheck,
  parseLayout
};
