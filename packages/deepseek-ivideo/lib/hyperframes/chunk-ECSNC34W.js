import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  gsapCdnDist
} from "./chunk-MX7ESQNX.js";
import {
  createStudioPositionSeekReapplyScript
} from "./chunk-H6T6FXDE.js";
import {
  GENERIC_FAMILIES,
  collectFontFamilyCustomProperties,
  injectDeterministicFontFaces,
  iterateFontFamilyDeclarations,
  normalizeSystemFontPrimaryFamilies,
  resolveFontFamilyDeclarationFamilies
} from "./chunk-RLSKTKCG.js";
import {
  EncoderInterruptedError,
  encoderFailureError,
  prepareAnimatedGifInputs
} from "./chunk-U3TI3AWM.js";
import {
  BROWSER_GPU_NOT_SOFTWARE,
  CaptureFailure,
  DrawElementVerificationError,
  HDR_AUTO_PROMOTION_PIPELINE,
  HF_AUDIO_GROUP_TAG,
  HLS_MASTER_PLAYLIST,
  HLS_VIDEO_PLAYLIST,
  MEDIA_START_BASIS_ATTR,
  MIXED_AUDIO_FILENAME,
  ManagedChildProcess,
  NotMediaPayloadError,
  VIDEO_FRAME_FORMATS,
  analyzeCompositionHdr,
  analyzeKeyframeIntervals,
  appendRenderProvenanceArgs,
  applyConcreteGpuScreenshotClamp,
  applyDomLayerMask,
  applyFaststart,
  assertConfiguredFfmpegBinariesExist,
  assertMediaPayload,
  assertSwiftShader,
  augmentPageNavigationTimeoutError,
  augmentProtocolTimeoutError,
  blitRgb48leAffine,
  blitRgb48leRegion,
  blitRgba8OverRgb48le,
  calculateOptimalWorkers,
  captureAlphaPng,
  captureFrame,
  captureFrameToBuffer,
  captureFrameToBufferPipelined,
  captureFramesBatchPipelined,
  classifyCaptureFailure,
  classifyVideoExtractionError,
  cloneCaptureWarning,
  cloneCaptureWarnings,
  closeCaptureSession,
  completeDeferredDrawElementInit,
  compositionRequiresWebGpu,
  computeWorkerSizing,
  concatVideoFiles,
  createCaptureSession,
  createFrameLookupTable,
  createFrameReorderBuffer,
  createVideoFrameInjector,
  decodePng,
  decodePngToRgb48le,
  deriveBeginFrameProbeTimeTicks,
  detectTransfer,
  distributeFrames,
  distributeFramesInterleaved,
  downloadToTemp,
  encodeFramesChunkedConcat,
  encodeFramesFromDir,
  executeParallelCapture,
  explainDrawElementDisabled,
  extractAllVideoFrames,
  extractAudioMetadata,
  extractMediaMetadata,
  extractionFrameCountForDuration,
  fetchPublicHttpsText,
  fingerprintElementId,
  formatFfmpegError,
  formatHdrAutoPromotionWarning,
  frameFileExtension,
  getCapturePerfSummary,
  getCompositionDuration,
  getDrawElementVerificationDetails,
  getEncoderPreset,
  getFfmpegBinary,
  getFfprobeBinary,
  groupIntoLayers,
  initTransparentBackground,
  initializeSession,
  isDrawElementCaptureError,
  isDrawElementVerificationError,
  isHdrColorSpace,
  isHttpUrl,
  isMemoryExhaustionError,
  isNotMediaPayload,
  isTransientBrowserError,
  isVideoFrameFormat,
  mergeWorkerFrames,
  muxVideoWithAudio,
  normalizeObjectFit,
  normalizeVp9CpuUsed,
  packageHls,
  parseAudioElements,
  parseImageElements,
  parseTransformMatrix,
  parseVideoElements,
  prepareCaptureSessionForReuse,
  probeBeginFrameLiveness,
  probeMediaProfile,
  processCompositionAudio,
  psnrDb,
  queryElementStacking,
  readMediaStartBasis,
  readWebGlVendorInfoFromCanvas,
  recaptureDrawElementFrameForVerify,
  removeDomLayerMask,
  resampleRgb48leObjectFit,
  resolveAbsoluteMediaStartSeconds,
  resolveBrowserGpuMode,
  resolveConfig,
  resolveDeVerifyMinDb,
  resolveFinalFrameExtractionWindow,
  resolveHeadlessShellPath,
  resolvePlayableVideoDuration,
  resolveReferencedStart,
  resolveVideoExtractionWindow,
  runFfmpeg,
  runVideoExtractionWithRetry,
  safeDownloadUrlIdentity,
  safeVideoExtractionSourceIdentity,
  sanitizeHdrAutoPromotionAsset,
  scaleProtocolTimeoutForComposition,
  shouldDisableBrowserPoolForParallelWorker,
  spawnStreamingEncoder,
  trackChildProcess,
  validateEngineConfigSnapshot,
  verifyDiskDrawElementSamples,
  writeCapturedFrame
} from "./chunk-3NHZZLH3.js";
import {
  assignBundledRuntimeCompositionIds,
  assignMediaRenderIds,
  buildVariablesByCompScript,
  deferScriptsUntilFonts,
  emitMountedModuleScripts,
  emitRootCompositionVariableStyles,
  ensureExternalLinkTag,
  ensureExternalScriptTag,
  headStyleRuns,
  injectScriptsAtHeadStart,
  injectScriptsIntoHtml,
  inlineScriptRuns,
  inlineSubCompositions,
  insertBeforeCloseTag,
  isJavaScriptType,
  isRuntimeFileUrl,
  prepareFlattenedInnerRoot,
  styleElementsFor
} from "./chunk-7QZSGMGW.js";
import {
  MAX_AUDIO_GAIN
} from "./chunk-KKH3A7YS.js";
import {
  parseHostVariableValues,
  readDeclaredDefaults
} from "./chunk-MHDMNQIC.js";
import {
  LOW_MEMORY_TOTAL_MB_THRESHOLD,
  getCgroupMemoryLimitMb,
  getSystemTotalMb
} from "./chunk-USDEMXXL.js";
import {
  COMPOSITION_SOURCE_URL,
  HF_COLOR_GRADING_ATTR,
  HF_VFX_ATTR,
  MEDIA_RENDER_ID_ATTR,
  chainCapture,
  clampDurations,
  clearGifFramesBeforeNext,
  compileTimingAttrs,
  extractResolvedMedia,
  fpsToFfmpegArg,
  fpsToNumber,
  gifClearsAfterLeavingFrameInPlace,
  injectDurations,
  normalizeRateSpec,
  parseFps,
  parseStrictFiniteTimingNumber,
  parseVfxChain,
  readMediaStart,
  redactKnownPaths,
  redactTelemetryString,
  resolveAuthoredTimingWindow,
  resolveNaturalMediaTimelineDurationFromValues,
  shouldClampResolvedMediaDuration,
  sourceTimeAt,
  toFps
} from "./chunk-SIG2LUMK.js";
import {
  CANVAS_DIMENSIONS,
  HTML_BODY_CSS_HEIGHT_FIRST_RE,
  HTML_BODY_CSS_WIDTH_FIRST_RE,
  VALID_CANVAS_RESOLUTIONS,
  checkOutputResolutionCompatibility,
  extractMediaSrcMutations,
  isAspectAgnosticResolutionAlias,
  normalizeResolutionFlag,
  suggestMatchingPreset
} from "./chunk-AR25A7XZ.js";
import {
  chromeMajorCeiling
} from "./chunk-TWWSYAKJ.js";
import {
  lintHyperframeHtml
} from "./chunk-LPWBWBT2.js";
import {
  isUnresolvedAssetPlaceholder,
  readProjectFile,
  resolveProjectRelativeSrc
} from "./chunk-JFKL3WAE.js";
import {
  CSS_URL_RE,
  checkSubCompositionUsability,
  isNonRelativeUrl,
  rewriteAssetPaths,
  rewriteCssAssetUrls,
  rewriteInlineStyleAssetUrls
} from "./chunk-TQFG7HTI.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import {
  TRANSITIONS,
  convertTransfer,
  crossfade
} from "./chunk-3GXQPCJC.js";

// ../producer/src/services/renderOrchestrator.ts
import {
  existsSync as existsSync15,
  mkdirSync as mkdirSync8,
  readFileSync as readFileSync7,
  readdirSync as readdirSync5,
  rmSync as rmSync8,
  statSync as statSync5,
  writeFileSync as writeFileSync5,
  copyFileSync as copyFileSync3,
  appendFileSync
} from "fs";
import { tmpdir as tmpdir2 } from "os";
import { join as join25, dirname as dirname9, resolve as resolve6 } from "path";
import { totalmem as totalmem2 } from "os";
import { randomUUID } from "crypto";
import { fileURLToPath as fileURLToPath4 } from "url";

// ../producer/src/services/fileServer.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import {
  existsSync as existsSync2,
  realpathSync,
  statSync,
  createReadStream,
  openSync,
  fstatSync,
  closeSync,
  constants,
  readFile
} from "fs";
import { promisify } from "util";
import { Readable } from "stream";
import { join, extname, resolve as resolve2, sep } from "path";

// ../producer/src/services/hyperframeRuntimeLoader.ts
import { createHash } from "crypto";
import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
var PRODUCER_DIR = dirname(fileURLToPath(import.meta.url));
var SIBLING_MANIFEST_PATH = resolve(PRODUCER_DIR, "hyperframe.manifest.json");
var MODULE_RELATIVE_MANIFEST_PATH = resolve(
  PRODUCER_DIR,
  "../../../core/dist/hyperframe.manifest.json"
);
var MANIFEST_CANDIDATES = [
  SIBLING_MANIFEST_PATH,
  resolve(process.cwd(), "packages/core/dist/hyperframe.manifest.json"),
  resolve(process.cwd(), "../core/dist/hyperframe.manifest.json"),
  resolve(process.cwd(), "core/dist/hyperframe.manifest.json"),
  MODULE_RELATIVE_MANIFEST_PATH
];
function resolveHyperframeManifestPath() {
  const envOverride = process.env.PRODUCER_HYPERFRAME_MANIFEST_PATH;
  if (envOverride) {
    return envOverride;
  }
  const found = MANIFEST_CANDIDATES.find((candidate) => existsSync(candidate));
  return found ?? MODULE_RELATIVE_MANIFEST_PATH;
}
function triedManifestPaths() {
  return process.env.PRODUCER_HYPERFRAME_MANIFEST_PATH ? [process.env.PRODUCER_HYPERFRAME_MANIFEST_PATH] : MANIFEST_CANDIDATES;
}
function getVerifiedHyperframeRuntimeSource() {
  return resolveVerifiedHyperframeRuntime().runtimeSource;
}
function resolveVerifiedHyperframeRuntime() {
  const manifestPath = resolveHyperframeManifestPath();
  if (!existsSync(manifestPath)) {
    const tried = triedManifestPaths().join(", ");
    throw new Error(
      `[HyperframeRuntimeLoader] Missing manifest. Tried: ${tried}. Searched from cwd=${process.cwd()}. Build core runtime artifacts before rendering.`
    );
  }
  const manifestRaw = readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(manifestRaw);
  const runtimeFileName = manifest.artifacts?.iife;
  if (!runtimeFileName || !manifest.sha256) {
    throw new Error(
      `[HyperframeRuntimeLoader] Invalid manifest at ${manifestPath}; missing iife artifact or sha256.`
    );
  }
  const runtimePath = resolve(dirname(manifestPath), runtimeFileName);
  if (!existsSync(runtimePath)) {
    throw new Error(`[HyperframeRuntimeLoader] Missing runtime artifact at ${runtimePath}.`);
  }
  const runtimeSource = readFileSync(runtimePath, "utf8");
  const runtimeSha = createHash("sha256").update(runtimeSource, "utf8").digest("hex");
  if (runtimeSha !== manifest.sha256) {
    throw new Error(
      `[HyperframeRuntimeLoader] Runtime checksum mismatch. expected=${manifest.sha256} actual=${runtimeSha}`
    );
  }
  return {
    manifestPath,
    runtimePath,
    expectedSha256: manifest.sha256,
    actualSha256: runtimeSha,
    runtimeSource
  };
}

// ../producer/src/generated/hf-early-stub-inline.ts
var HF_EARLY_STUB_IIFE = '"use strict";(()=>{var P=100,x=[],s=[],w=!1,f=!1,T=new Set;function p(n){let e=window.__HF_VIRTUAL_TIME__?.originalRequestAnimationFrame;return typeof e=="function"?e(n):requestAnimationFrame(n)}function b(n){let e=window.__HF_VIRTUAL_TIME__?.originalSetTimeout;if(typeof e=="function"){e(n,0);return}setTimeout(n,0)}function O(n){return n!==null&&typeof n=="object"&&"__hfIsProxy"in n?n.__hfReal:n}function m(n,e){n!=="add"&&v(e)}function h(n){if(n===null||typeof n!="object"||Array.isArray(n))return!1;let e=n;return"rotationX"in e||"rotationY"in e||"transformPerspective"in e}var d=new Set;function v(n){let e=n[0];if(e==null)return;let o=window;d.has(e)||(d.add(e),o.__hfAllTweenTargets=Array.from(d)),(h(n[1])||h(n[2]))&&(T.add(e),o.__hf3dTweenTargets=Array.from(T))}function _(n){let e=n.proxy.__hfReal,o=e[n.method];if(typeof o=="function"){let i=n.method==="add"?n.args.map(O):n.args;o.call(e,...i)}}function l(n,e,o){m(e,o);let i={proxy:n,method:e,args:o};return n.__hfQueue.push(i),s.push(i),R(),n}function y(n){let e=n.proxy.__hfQueue.indexOf(n);e>=0&&n.proxy.__hfQueue.splice(e,1)}function t(){for(;s.length>0;){let n=s.shift();n&&(y(n),_(n))}A()}function k(){f=!1,window.__hfTimelinesBuilding=!1;try{window.dispatchEvent(new CustomEvent("hf-timelines-built"))}catch{}}function A(){f||(f=!0,b(()=>{s.length===0?k():f=!1}))}function g(){w=!1;let n=s.splice(0,P);for(let e of n)y(e),_(e);s.length>0?(w=!0,p(g)):k()}function R(){w||(w=!0,window.__hfTimelinesBuilding=!0,p(g))}var S=new Set(["to","from","fromTo","set","add"]);function I(n,e){let o=e;for(;o!==null&&o!==Object.prototype;){for(let i of Object.getOwnPropertyNames(o)){if(i==="constructor"||i==="then"||i in n||S.has(i)||i.charAt(0)==="_")continue;let u=Object.getOwnPropertyDescriptor(o,i);if(!u||typeof u.value!="function")continue;let r=u.value;n[i]=function(...c){t();let a=r.call(e,...c);return a===e?n:a}}o=Object.getPrototypeOf(o)}}function G(n){let e={__hfReal:n,__hfQueue:[],__hfIsProxy:!0,to(...o){return l(e,"to",o)},from(...o){return l(e,"from",o)},fromTo(...o){return l(e,"fromTo",o)},set(...o){return l(e,"set",o)},add(...o){return l(e,"add",o)},pause(...o){return t(),n.pause(...o),e},play(...o){return t(),n.play(...o),e},seek(...o){return t(),n.seek(...o),e},totalTime(...o){return t(),o.length>0?(n.totalTime(...o),e):n.totalTime()},time(...o){return t(),o.length>0?(n.time(...o),e):n.time()},duration(...o){return t(),o.length>0?(n.duration(...o),e):n.duration()},getChildren(...o){t();let i=n.getChildren(...o);return Array.isArray(i)?i:[]},paused(...o){return t(),o.length>0?(n.paused(...o),e):n.paused()},timeScale(...o){return t(),o.length>0?(n.timeScale(...o),e):n.timeScale()},kill(){t(),n.kill()}};return I(e,n),x.push(e),e}if(typeof window<"u"){window.__hf||(window.__hf={}),window.__hfTimelinesBuilding=!1,window.__hfFlushSync=()=>{t(),s.length===0&&window.__hfTimelinesBuilding&&k()};let n=null;try{Object.defineProperty(window,"gsap",{configurable:!0,enumerable:!0,get(){return n},set(e){if(n=e,!e||typeof e.timeline!="function")return;let o=e.timeline.bind(e);e.timeline=u=>G(o(u));for(let u of["to","from","set"]){let r=e[u];if(typeof r!="function")continue;let c=r.bind(e);e[u]=(...a)=>(m(u,a),c(...a))}let i=e.fromTo;if(typeof i=="function"){let u=i.bind(e);e.fromTo=(...r)=>(m("fromTo",r),u(...r))}}})}catch{}}})();\n';
function getHfEarlyStub() {
  return HF_EARLY_STUB_IIFE;
}

// ../producer/src/logger.ts
var LOG_LEVEL_PRIORITY = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
function createConsoleLogger(level = "info") {
  const threshold = LOG_LEVEL_PRIORITY[level];
  const shouldLog = (msgLevel) => LOG_LEVEL_PRIORITY[msgLevel] <= threshold;
  const formatMeta = (meta) => meta ? ` ${JSON.stringify(meta)}` : "";
  return {
    error(message, meta) {
      if (shouldLog("error")) {
        console.error(`[ERROR] ${message}${formatMeta(meta)}`);
      }
    },
    warn(message, meta) {
      if (shouldLog("warn")) {
        console.warn(`[WARN] ${message}${formatMeta(meta)}`);
      }
    },
    info(message, meta) {
      if (shouldLog("info")) {
        console.error(`[INFO] ${message}${formatMeta(meta)}`);
      }
    },
    debug(message, meta) {
      if (shouldLog("debug")) {
        console.error(`[DEBUG] ${message}${formatMeta(meta)}`);
      }
    },
    isLevelEnabled(msgLevel) {
      return shouldLog(msgLevel);
    }
  };
}
var defaultLogger = createConsoleLogger("info");

// ../producer/src/services/fileServer.ts
var readFileAsync = promisify(readFile);
function isPathInside(child, parent, options = {}) {
  const { resolveSymlinks = false, pathModule } = options;
  const resolveFn = pathModule?.resolve ?? resolve2;
  const separator = pathModule?.sep ?? sep;
  const resolvedChild = resolveFn(child);
  const resolvedParent = resolveFn(parent);
  const normalizedChild = resolveSymlinks && existsSync2(resolvedChild) ? realpathSync.native(resolvedChild) : resolvedChild;
  const normalizedParent = resolveSymlinks && existsSync2(resolvedParent) ? realpathSync.native(resolvedParent) : resolvedParent;
  if (normalizedChild === normalizedParent) return true;
  const parentWithSep = normalizedParent.endsWith(separator) ? normalizedParent : normalizedParent + separator;
  return normalizedChild.startsWith(parentWithSep);
}
var MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".cube": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/vnd.microsoft.icon",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".aac": "audio/aac",
  ".flac": "audio/flac",
  ".m4a": "audio/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf"
};
function parseRangeHeader(header, size) {
  if (!header) return { kind: "absent" };
  const match = /^\s*bytes\s*=\s*(.*?)\s*$/i.exec(header);
  if (!match) return { kind: "absent" };
  const specList = match[1];
  if (!specList || specList.includes(",")) {
    return { kind: "absent" };
  }
  const dashIdx = specList.indexOf("-");
  if (dashIdx < 0) return { kind: "absent" };
  const rawStart = specList.slice(0, dashIdx).trim();
  const rawEnd = specList.slice(dashIdx + 1).trim();
  if (rawStart === "" && rawEnd !== "") {
    if (!/^\d+$/.test(rawEnd)) return { kind: "absent" };
    const suffixLen = Number(rawEnd);
    if (!Number.isFinite(suffixLen)) return { kind: "absent" };
    if (size === 0 || suffixLen === 0) return { kind: "unsatisfiable" };
    const start2 = Math.max(0, size - suffixLen);
    return { kind: "satisfiable", start: start2, end: size - 1 };
  }
  if (!/^\d+$/.test(rawStart)) return { kind: "absent" };
  const start = Number(rawStart);
  if (!Number.isFinite(start)) return { kind: "absent" };
  if (rawEnd === "") {
    if (start >= size) return { kind: "unsatisfiable" };
    return { kind: "satisfiable", start, end: size - 1 };
  }
  if (!/^\d+$/.test(rawEnd)) return { kind: "absent" };
  const requestedEnd = Number(rawEnd);
  if (!Number.isFinite(requestedEnd)) return { kind: "absent" };
  if (requestedEnd < start) return { kind: "unsatisfiable" };
  if (start >= size) return { kind: "unsatisfiable" };
  const end = Math.min(requestedEnd, size - 1);
  return { kind: "satisfiable", start, end };
}
function buildVirtualTimeShim(options) {
  const seedRandomFromFrame = options.seedRandomFromFrame === true;
  const seededRandomBlock = seedRandomFromFrame ? String.raw`
  // Seeded Math.random / crypto.getRandomValues, keyed by virtual time.
  // Mulberry32 — single uint32 state, deterministic, fast.
  var rngState = 0;
  function mulberry32() {
    rngState |= 0; rngState = (rngState + 0x6D2B79F5) | 0;
    var t = rngState;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function reseedRngFromTime(ms) {
    var ms32 = Math.max(0, Math.floor(Number(ms) || 0)) | 0;
    // Knuth's multiplicative hash + golden-ratio offset — gives a well-
    // distributed seed even for frame 0 (otherwise rngState=0 degenerates
    // the PRNG's first few outputs).
    rngState = (Math.imul(ms32, -1640531527) + 0x9E3779B9) | 0;
  }
  reseedRngFromTime(0);
  try {
    Math.random = function() { return mulberry32(); };
  } catch (e) {}
  if (window.crypto && typeof window.crypto.getRandomValues === "function") {
    try {
      var __seededGetRandomValues = function(arr) {
        if (!arr || typeof arr.byteLength !== "number" || !arr.buffer) return arr;
        var byteLen = arr.byteLength;
        if (byteLen <= 0) return arr;
        var view = new DataView(arr.buffer, arr.byteOffset, byteLen);
        var i = 0;
        for (; i + 4 <= byteLen; i += 4) {
          var word = ((mulberry32() * 4294967296) >>> 0);
          view.setUint32(i, word, true);
        }
        for (; i < byteLen; i++) {
          view.setUint8(i, (mulberry32() * 256) | 0);
        }
        return arr;
      };
      window.crypto.getRandomValues = __seededGetRandomValues;
    } catch (e) {}
  }
` : "";
  const seekToTimeReseedCall = seedRandomFromFrame ? "reseedRngFromTime(safeTimeMs);\n      " : "";
  return String.raw`(function() {
  if (window.__HF_VIRTUAL_TIME__) return;

  var virtualNowMs = 0;
  var rafId = 1;
  var rafQueue = [];
  var OriginalDate = Date;
  var originalSetTimeout = window.setTimeout.bind(window);
  var originalClearTimeout = window.clearTimeout.bind(window);
  var originalSetInterval = window.setInterval.bind(window);
  var originalClearInterval = window.clearInterval.bind(window);
  var originalRequestAnimationFrame = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : null;
  var originalCancelAnimationFrame = window.cancelAnimationFrame
    ? window.cancelAnimationFrame.bind(window)
    : null;
${seededRandomBlock}
  function flushAnimationFrame() {
    if (!rafQueue.length) return;
    var current = rafQueue.slice();
    rafQueue.length = 0;
    for (var i = 0; i < current.length; i++) {
      var entry = current[i];
      if (entry.cancelled) continue;
      try {
        entry.callback(virtualNowMs);
      } catch {}
    }
  }

  function VirtualDate() {
    var args = Array.prototype.slice.call(arguments);
    if (!(this instanceof VirtualDate)) {
      return OriginalDate.apply(null, args.length ? args : [virtualNowMs]);
    }
    var instance = args.length ? new (Function.prototype.bind.apply(OriginalDate, [null].concat(args)))() : new OriginalDate(virtualNowMs);
    Object.setPrototypeOf(instance, VirtualDate.prototype);
    return instance;
  }

  VirtualDate.prototype = OriginalDate.prototype;
  Object.setPrototypeOf(VirtualDate, OriginalDate);
  VirtualDate.now = function() { return virtualNowMs; };
  VirtualDate.parse = OriginalDate.parse.bind(OriginalDate);
  VirtualDate.UTC = OriginalDate.UTC.bind(OriginalDate);

  try {
    Object.defineProperty(window, "Date", {
      configurable: true,
      writable: true,
      value: VirtualDate,
    });
  } catch {}

  if (window.performance && typeof window.performance.now === "function") {
    try {
      Object.defineProperty(window.performance, "now", {
        configurable: true,
        value: function() { return virtualNowMs; },
      });
    } catch {}
  }

  window.requestAnimationFrame = function(callback) {
    if (typeof callback !== "function") return 0;
    var entry = { id: rafId++, callback: callback, cancelled: false };
    rafQueue.push(entry);
    return entry.id;
  };
  window.cancelAnimationFrame = function(id) {
    for (var i = 0; i < rafQueue.length; i++) {
      if (rafQueue[i].id === id) {
        rafQueue[i].cancelled = true;
      }
    }
  };

  window.__HF_VIRTUAL_TIME__ = {
    originalSetTimeout: originalSetTimeout,
    originalClearTimeout: originalClearTimeout,
    originalSetInterval: originalSetInterval,
    originalClearInterval: originalClearInterval,
    originalRequestAnimationFrame: originalRequestAnimationFrame,
    originalCancelAnimationFrame: originalCancelAnimationFrame,
    seekToTime: function(nextTimeMs) {
      var safeTimeMs = Math.max(0, Number(nextTimeMs) || 0);
      virtualNowMs = safeTimeMs;
      ${seekToTimeReseedCall}flushAnimationFrame();
      return virtualNowMs;
    },
    getTime: function() {
      return virtualNowMs;
    },
  };
})();`;
}
var VIRTUAL_TIME_SHIM = buildVirtualTimeShim({ seedRandomFromFrame: false });
var RENDER_SEEK_MODE = process.env.PRODUCER_RUNTIME_RENDER_SEEK_MODE === "strict-boundary" ? "strict-boundary" : "preview-phase";
var RENDER_SEEK_DIAGNOSTICS = process.env.PRODUCER_DEBUG_SEEK_DIAGNOSTICS === "true";
var RENDER_SEEK_STEP = Math.max(
  1 / 600,
  Number(process.env.PRODUCER_RENDER_SEEK_STEP || 1 / 120)
);
var RENDER_SEEK_OFFSET_FRACTION = Math.max(
  0,
  Math.min(0.95, Number(process.env.PRODUCER_RUNTIME_RENDER_SEEK_OFFSET_FRACTION || 0.5))
);
function resolveRenderFpsConfig(fps) {
  if (!fps) return { value: 30, source: "default", fallbackReason: "missing" };
  const value = fpsToNumber(fps);
  if (!Number.isFinite(value) || value <= 0) {
    return { value: 30, source: "default", fallbackReason: "invalid" };
  }
  return { value, source: "render-options" };
}
function buildRenderModeScript(fps) {
  const renderFps = resolveRenderFpsConfig(fps);
  return `(function() {
  var __realSetTimeout =
    window.__HF_VIRTUAL_TIME__ && typeof window.__HF_VIRTUAL_TIME__.originalSetTimeout === "function"
      ? window.__HF_VIRTUAL_TIME__.originalSetTimeout
      : window.setTimeout.bind(window);
  var __seekMode = ${JSON.stringify(RENDER_SEEK_MODE)};
  var __seekDiagnostics = ${RENDER_SEEK_DIAGNOSTICS ? "true" : "false"};
  var __seekStep = ${RENDER_SEEK_STEP};
  var __seekOffsetFraction = ${RENDER_SEEK_OFFSET_FRACTION};
  var __renderFps = ${renderFps.value};
  var __renderFpsSource = ${JSON.stringify(renderFps.source)};
  var __renderFpsFallbackReason = ${JSON.stringify(renderFps.fallbackReason ?? null)};
  window.__HF_EXPORT_RENDER_SEEK_CONFIG = {
    mode: __seekMode,
    diagnostics: __seekDiagnostics,
    step: __seekStep,
    offsetFraction: __seekOffsetFraction,
    fps: __renderFps,
    fpsSource: __renderFpsSource,
    fpsFallbackReason: __renderFpsFallbackReason || undefined,
    owner: "runtime",
  };
  function installMediaFallbackPlayer() {
    if (document.querySelector('[data-composition-id]')) return false;
    var mediaEls = Array.from(document.querySelectorAll('video, audio'));
    if (!mediaEls.length) return false;

    var isPlaying = false;
    var currentTime = 0;
    function fallbackDuration() {
      var maxDuration = 0;
      for (var i = 0; i < mediaEls.length; i++) {
        var d = Number(mediaEls[i].duration);
        if (isFinite(d) && d > maxDuration) maxDuration = d;
      }
      return Math.max(0, maxDuration);
    }
    function syncFallbackMedia(time, playing) {
      for (var i = 0; i < mediaEls.length; i++) {
        var media = mediaEls[i];
        var existing = Number(media.currentTime) || 0;
        if (Math.abs(existing - time) > 0.3) {
          try { media.currentTime = time; } catch (e) {}
        }
        if (playing) {
          if (media.paused) {
            media.play().catch(function() {});
          }
        } else if (!media.paused) {
          media.pause();
        }
      }
    }

    var basePlayer = window.__player && typeof window.__player === 'object' ? window.__player : {};
    window.__player = {
      ...basePlayer,
      _timeline: null,
      play: function() {
        isPlaying = true;
        syncFallbackMedia(currentTime, true);
      },
      pause: function() {
        isPlaying = false;
        syncFallbackMedia(currentTime, false);
      },
      seek: function(time) {
        var safeTime = Math.max(0, Number(time) || 0);
        currentTime = safeTime;
        isPlaying = false;
        syncFallbackMedia(safeTime, false);
      },
      renderSeek: function(time) {
        var safeTime = Math.max(0, Number(time) || 0);
        currentTime = safeTime;
        isPlaying = false;
        syncFallbackMedia(safeTime, false);
      },
      getTime: function() {
        var primary = mediaEls[0];
        if (!primary) return currentTime;
        var t = Number(primary.currentTime);
        return isFinite(t) ? t : currentTime;
      },
      getDuration: function() {
        return fallbackDuration();
      },
      isPlaying: function() {
        return isPlaying;
      },
    };
    window.__playerReady = true;
    // Media-fallback player has no timeline to bind, so render-ready is immediate.
    // init.ts defers __renderReady until the timeline is bound \u2014 different runtime.
    window.__renderReady = true;
    return true;
  }

  function waitForPlayer() {
    var hasComposition = Boolean(document.querySelector('[data-composition-id]'));
    if (hasComposition) {
      if (window.__player && typeof window.__player.renderSeek === "function") {
        window.__playerReady = true;
        return;
      }
      __realSetTimeout(waitForPlayer, 50);
      return;
    }
    if (installMediaFallbackPlayer()) {
      return;
    }
    __realSetTimeout(waitForPlayer, 50);
  }
  waitForPlayer();
})();`;
}
var HF_EARLY_STUB = getHfEarlyStub();
var HF_PAGE_SIDE_COMPOSITING_STUB = `(function() {
  if (typeof window === "undefined") return;
  window.__HF_PAGE_SIDE_COMPOSITING__ = true;
})();`;
var HF_BRIDGE_SCRIPT = `(function() {
  var __realSetInterval =
    window.__HF_VIRTUAL_TIME__ && typeof window.__HF_VIRTUAL_TIME__.originalSetInterval === "function"
      ? window.__HF_VIRTUAL_TIME__.originalSetInterval
      : window.setInterval.bind(window);
  var __realClearInterval =
    window.__HF_VIRTUAL_TIME__ && typeof window.__HF_VIRTUAL_TIME__.originalClearInterval === "function"
      ? window.__HF_VIRTUAL_TIME__.originalClearInterval
      : window.clearInterval.bind(window);
  function getDeclaredDuration() {
    var root = document.querySelector('[data-composition-id]');
    if (!root) return 0;
    var d = Number(root.getAttribute('data-duration'));
    if (Number.isFinite(d) && d > 0) return d;
    var comps = document.querySelectorAll('[data-composition-src]');
    var maxEnd = 0;
    for (var i = 0; i < comps.length; i++) {
      var start = Number(comps[i].getAttribute('data-start')) || 0;
      var dur = Number(comps[i].getAttribute('data-duration')) || 0;
      if (dur > 0) maxEnd = Math.max(maxEnd, start + dur);
    }
    if (maxEnd > 0) console.warn('[HF Bridge] No root data-duration; derived ' + maxEnd + 's from sub-compositions');
    return maxEnd;
  }
  function seekSameOriginChildFrames(frameWindow, nextTimeMs) {
    var frames;
    try {
      frames = frameWindow.frames;
    } catch (_error) {
      return;
    }
    if (!frames || typeof frames.length !== "number") return;
    for (var i = 0; i < frames.length; i++) {
      var childWindow = null;
      try {
        childWindow = frames[i];
        if (!childWindow || childWindow === frameWindow) continue;
        if (
          childWindow.__HF_VIRTUAL_TIME__ &&
          typeof childWindow.__HF_VIRTUAL_TIME__.seekToTime === "function"
        ) {
          childWindow.__HF_VIRTUAL_TIME__.seekToTime(nextTimeMs);
        }
      } catch (_error) {
        continue;
      }
      seekSameOriginChildFrames(childWindow, nextTimeMs);
    }
  }
  function bridge() {
    var p = window.__player;
    if (!p || typeof p.renderSeek !== "function" || typeof p.getDuration !== "function") {
      return false;
    }
    var hf = window.__hf || {};
    Object.defineProperty(hf, "duration", {
      configurable: true,
      enumerable: true,
      get: function() {
        // While the GSAP tween-batching interceptor (HF_EARLY_STUB) is draining
        // queued tweens via rAF, the real timelines are still empty. Return 0
        // here so pollHfReady in the engine keeps waiting (its condition is
        // __hf.duration > 0), preventing the capture pipeline from seeking
        // empty timelines and producing blank/incorrect frames.
        if (window.__hfTimelinesBuilding) return 0;
        if (!window.__renderReady) return 0;
        var d = p.getDuration();
        return d > 0 ? d : getDeclaredDuration();
      },
    });
    hf.seek = function(t, options) {
      p.renderSeek(t, options);
      var nextTimeMs = (Math.max(0, Number(t) || 0)) * 1000;
      if (window.__HF_VIRTUAL_TIME__ && typeof window.__HF_VIRTUAL_TIME__.seekToTime === "function") {
        window.__HF_VIRTUAL_TIME__.seekToTime(nextTimeMs);
      }
      seekSameOriginChildFrames(window, nextTimeMs);
    };
    window.__hf = hf;
    return true;
  }
  if (bridge()) return;
  var iv = __realSetInterval(function() {
    if (bridge()) __realClearInterval(iv);
  }, 50);
})();`;
var RENDER_CAPTURE_MODE_SHIM = "globalThis.__HF_RENDER_CAPTURE_MODE = true;";
function closeFileServerSafely(fileServer, label, log = defaultLogger) {
  try {
    fileServer.close();
  } catch (err) {
    log.warn(`[${label}] file server close failed`, {
      error: err instanceof Error ? err.message : String(err)
    });
  }
}
function openRegularFile(filePath) {
  let fd;
  try {
    fd = openSync(filePath, constants.O_RDONLY | constants.O_NONBLOCK);
  } catch (error) {
    if (error instanceof Error && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR"))
      return null;
    if (!statSync(filePath, { throwIfNoEntry: false })?.isFile()) return null;
    throw error;
  }
  let accepted = false;
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile()) return null;
    accepted = true;
    return { fd, stat, filePath };
  } finally {
    if (!accepted) closeSync(fd);
  }
}
function createFileServer(options) {
  const { projectDir, compiledDir, port = 0, stripEmbeddedRuntime = true } = options;
  const preHeadScripts = [
    HF_EARLY_STUB,
    RENDER_CAPTURE_MODE_SHIM,
    ...options.preHeadScripts ?? []
  ];
  const headScripts = options.headScripts ?? [getVerifiedHyperframeRuntimeSource()];
  const bodyScripts = [
    buildRenderModeScript(options.fps),
    HF_BRIDGE_SCRIPT,
    ...options.bodyScripts ?? []
  ];
  const app = new Hono();
  app.get("/*", async (c) => {
    let requestPath = c.req.path;
    if (requestPath === "/") requestPath = "/index.html";
    const relativePath = requestPath.replace(/^\//, "").split("/").map((seg) => {
      try {
        return decodeURIComponent(seg);
      } catch {
        return seg;
      }
    }).join("/");
    let file = null;
    for (const root of compiledDir ? [compiledDir, projectDir] : [projectDir]) {
      const candidate = join(root, relativePath);
      if (isPathInside(candidate, root)) file = openRegularFile(candidate);
      if (file) break;
    }
    if (!file) {
      if (!/favicon\.ico$/i.test(requestPath)) {
        console.warn(`[FileServer] 404 Not Found: ${requestPath}`);
      }
      return c.text("Not found", 404);
    }
    const { fd, stat, filePath } = file;
    let streamOwnsFd = false;
    try {
      const ext = extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      if (ext === ".html") {
        const rawHtml = await readFileAsync(fd, "utf-8");
        const isIndex = relativePath === "index.html";
        let html = rawHtml;
        if (preHeadScripts.length > 0) {
          html = injectScriptsAtHeadStart(html, preHeadScripts);
        }
        html = isIndex ? injectScriptsIntoHtml(html, headScripts, bodyScripts, stripEmbeddedRuntime) : html;
        return c.text(html, 200, { "Content-Type": contentType });
      }
      const totalSize = stat.size;
      const rangeHeader = c.req.header("range");
      const rangeRequest = parseRangeHeader(rangeHeader, totalSize);
      if (rangeRequest.kind === "unsatisfiable") {
        return new Response(null, {
          status: 416,
          headers: {
            "Content-Type": contentType,
            "Content-Range": `bytes */${totalSize}`,
            "Accept-Ranges": "bytes"
          }
        });
      }
      const range = rangeRequest.kind === "satisfiable" ? rangeRequest : null;
      const responseOptions = {
        status: range ? 206 : 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(range ? range.end - range.start + 1 : totalSize),
          "Accept-Ranges": "bytes",
          ...range ? { "Content-Range": `bytes ${range.start}-${range.end}/${totalSize}` } : {}
        }
      };
      if (c.req.method === "HEAD") return new Response(null, responseOptions);
      const stream = createReadStream(filePath, {
        fd,
        autoClose: true,
        ...range ? { start: range.start, end: range.end } : {}
      });
      streamOwnsFd = true;
      try {
        const webStream = Readable.toWeb(stream);
        return new Response(webStream, responseOptions);
      } catch (error) {
        stream.destroy();
        throw error;
      }
    } finally {
      if (!streamOwnsFd) closeSync(fd);
    }
  });
  return new Promise((resolve11) => {
    const connections = /* @__PURE__ */ new Set();
    const server = serve({ fetch: app.fetch, port, hostname: "127.0.0.1" }, (info) => {
      resolve11({
        url: `http://localhost:${info.port}`,
        port: info.port,
        addPreHeadScript: (script) => {
          preHeadScripts.push(script);
        },
        close: () => {
          for (const socket of connections) socket.destroy();
          connections.clear();
          server.close();
        }
      });
    });
    server.on("connection", (socket) => {
      connections.add(socket);
      socket.on("close", () => connections.delete(socket));
    });
  });
}

// ../producer/src/services/render/renderFormat.ts
function outputNeedsAlpha(format) {
  return format !== "mp4" && format !== "hls";
}
function outputSupportsPageSideShaderCompositing(format) {
  return format === "mp4" || format === "gif" || format === "hls";
}
function outputUsesH264Pipeline(format) {
  return format === "mp4" || format === "hls";
}

// ../producer/src/services/render/hlsConfig.ts
var DEFAULT_HLS_SEGMENT_SECONDS = 4;
function validateHlsRenderConfig(config) {
  if (config.format !== "hls") return;
  const segmentSeconds = config.hlsSegmentSeconds;
  if (segmentSeconds !== void 0 && (!Number.isInteger(segmentSeconds) || segmentSeconds <= 0)) {
    throw new Error(
      `[Render] hlsSegmentSeconds must be a positive integer (got ${String(segmentSeconds)}). Whole seconds keep the integer #EXT-X-TARGETDURATION ffmpeg writes honest.`
    );
  }
  if (config.hdrMode === "force-hdr") {
    throw new Error(
      `[Render] format "hls" does not support hdrMode "force-hdr". HLS v1 is SDR only (H.264 + AAC in MPEG-TS); HDR10 would need fMP4 segments and HEVC. Use --format mp4 for HDR10 output, or drop --hdr.`
    );
  }
  if (config.useGpu === true) {
    throw new Error(
      `[Render] format "hls" does not support GPU encoding. Fixed-length segments require the software encoder's forced-keyframe lock, which GPU encoders ignore. Re-run without --gpu.`
    );
  }
}
function resolveHlsSegmentSeconds(config) {
  return config.hlsSegmentSeconds ?? DEFAULT_HLS_SEGMENT_SECONDS;
}
function resolveHlsGopSize(fps, segmentSeconds) {
  return Math.max(1, Math.round(fpsToNumber(fps) * segmentSeconds));
}
function resolveHlsEncoderGopLock(outputFormat, fps, segmentSeconds) {
  if (outputFormat !== "hls") return { lockGopForChunkConcat: false, gopSize: void 0 };
  return {
    lockGopForChunkConcat: true,
    gopSize: resolveHlsGopSize(fps, segmentSeconds ?? DEFAULT_HLS_SEGMENT_SECONDS)
  };
}

// ../producer/src/services/render/shared.ts
import {
  copyFileSync,
  cpSync,
  existsSync as existsSync3,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync
} from "fs";
import { basename as basename2, dirname as dirname2, isAbsolute, join as join3, relative, resolve as resolve3 } from "path";

// ../producer/src/utils/paths.ts
import {
  basename,
  join as join2,
  resolve as nodeResolve,
  relative as nodeRelative,
  isAbsolute as nodeIsAbsolute
} from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
var DEFAULT_RENDERS_DIR = process.env.PRODUCER_RENDERS_DIR ?? // fileURLToPath (not URL.pathname): on Windows .pathname is "/D:/..." which
// resolves to a bogus renders dir.
nodeResolve(fileURLToPath2(import.meta.url), "../../..", "renders");
function isPathInside2(childPath, parentPath, options = {}) {
  const resolvePath = options.pathModule?.resolve ?? nodeResolve;
  const relativePath = options.pathModule?.relative ?? nodeRelative;
  const isPathAbsolute = options.pathModule?.isAbsolute ?? nodeIsAbsolute;
  const absChild = resolvePath(childPath);
  const absParent = resolvePath(parentPath);
  if (absChild === absParent) return true;
  const rel = relativePath(absParent, absChild);
  return rel !== "" && !rel.startsWith("..") && !isPathAbsolute(rel);
}
function toExternalAssetKey(absPath) {
  if (absPath.startsWith("hf-ext/")) return absPath;
  let normalised = absPath.replace(/\\/g, "/");
  normalised = normalised.replace(/^\/\/\?\/UNC\//i, "//");
  normalised = normalised.replace(/^\/\/\?\//, "");
  normalised = normalised.replace(/^\/\/([^/]+)\//, "unc/$1/");
  normalised = normalised.replace(/^\/+/, "");
  normalised = normalised.replace(/^([A-Za-z]):\/?/, "$1/");
  return "hf-ext/" + normalised;
}
function formatCaptureFrameName(index, ext) {
  return `frame_${String(index).padStart(6, "0")}.${ext}`;
}
function formatExportFrameName(index, ext) {
  return `frame_${String(index + 1).padStart(6, "0")}.${ext}`;
}
function resolveRenderPaths(projectDir, outputPath, rendersDir = DEFAULT_RENDERS_DIR) {
  const absoluteProjectDir = nodeResolve(projectDir);
  const projectName = basename(absoluteProjectDir);
  const resolvedOutputPath = outputPath ?? join2(rendersDir, `${projectName}.mp4`);
  const absoluteOutputPath = nodeResolve(resolvedOutputPath);
  return { absoluteProjectDir, absoluteOutputPath };
}

// ../producer/src/services/render/shared.ts
var BROWSER_MEDIA_EPSILON = 1e-4;
function resolveBrowserMediaEnd(start, end, duration) {
  return Number.isFinite(duration) && duration > 0 ? start + duration : end;
}
function writeFileExclusiveSync(path, data) {
  try {
    writeFileSync(path, data, { flag: "wx", mode: 384 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "EEXIST") {
      return;
    }
    throw error;
  }
}
function projectBrowserEndToCompositionTimeline(existingStart, browserStart, browserEnd) {
  return browserEnd + (existingStart - browserStart);
}
function resolveDeviceScaleFactor(input) {
  if (!input.outputResolution) return 1;
  const compat = checkOutputResolutionCompatibility({
    compositionWidth: input.compositionWidth,
    compositionHeight: input.compositionHeight,
    outputResolution: input.outputResolution,
    alphaRequested: input.alphaRequested,
    hdrRequested: input.hdrRequested
  });
  if (!compat.ok) throw new Error(compat.message);
  const target = CANVAS_DIMENSIONS[input.outputResolution];
  return target.width / input.compositionWidth;
}
function writeCompiledArtifacts(compiled, workDir, includeSummary) {
  const compileDir = join3(workDir, "compiled");
  mkdirSync(compileDir, { recursive: true });
  writeFileSync(join3(compileDir, "index.html"), compiled.html, "utf-8");
  for (const [srcPath, html] of compiled.subCompositions) {
    const outPath = join3(compileDir, srcPath);
    mkdirSync(dirname2(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
  }
  for (const [relativePath, absolutePath] of compiled.externalAssets) {
    const outPath = resolve3(join3(compileDir, relativePath));
    if (!isPathInside2(outPath, compileDir)) {
      console.warn(`[Render] Skipping external asset with unsafe path: ${relativePath}`);
      continue;
    }
    mkdirSync(dirname2(outPath), { recursive: true });
    copyFileSync(absolutePath, outPath);
  }
  if (includeSummary) {
    const summary = {
      width: compiled.width,
      height: compiled.height,
      staticDuration: compiled.staticDuration,
      videos: compiled.videos.map((v) => ({
        id: v.id,
        src: v.src,
        start: v.start,
        end: v.end,
        mediaStart: v.mediaStart
      })),
      audios: compiled.audios.map((a) => ({
        id: a.id,
        src: a.src,
        start: a.start,
        end: a.end,
        mediaStart: a.mediaStart
      })),
      subCompositions: Array.from(compiled.subCompositions.keys()),
      renderModeHints: compiled.renderModeHints,
      hasShaderTransitions: compiled.hasShaderTransitions
    };
    writeFileSync(join3(compileDir, "summary.json"), JSON.stringify(summary, null, 2), "utf-8");
  }
}
function applyRenderModeHints(alreadyForced, compiled, log = defaultLogger) {
  if (alreadyForced || !compiled.renderModeHints.recommendScreenshot) {
    return { forceScreenshot: alreadyForced, autoSelected: false };
  }
  log.warn("Auto-selected screenshot capture mode for render compatibility", {
    reasonCodes: compiled.renderModeHints.reasons.map((reason) => reason.code),
    reasons: compiled.renderModeHints.reasons.map((reason) => reason.message)
  });
  return { forceScreenshot: true, autoSelected: true };
}
function updateJobStatus(job, status, stage, progress, onProgress, stageProgress) {
  job.warnings ??= [];
  job.status = status;
  job.currentStage = stage;
  job.stageProgress = stageProgress;
  const boundedProgress = Math.max(0, Math.min(100, Math.round(progress)));
  job.progress = Math.max(job.progress, boundedProgress);
  if (status === "failed" || status === "complete" || status === "cancelled") {
    job.completedAt = /* @__PURE__ */ new Date();
    job.outcome = status === "failed" ? "failed" : status === "cancelled" ? "cancelled" : job.warnings.length > 0 ? "completed_with_warnings" : "completed";
  }
  if (onProgress) void onProgress(job, stage);
}
var PROGRESS_REPORT_INTERVAL_MS = 250;
var lastFrameReportAt = /* @__PURE__ */ new WeakMap();
var lastStartupReportAt = /* @__PURE__ */ new WeakMap();
var lastReportSent = /* @__PURE__ */ new WeakMap();
function reportThrottled(lastReportAt, job, stage, progress, onProgress, force, stageProgress, status = "rendering") {
  const now = Date.now();
  const last = lastReportAt.get(job);
  const sent = `${stage}|${progress}`;
  const due = lastReportSent.get(job) !== sent && (force || last === void 0 || now - last >= PROGRESS_REPORT_INTERVAL_MS);
  if (due) {
    lastReportAt.set(job, now);
    lastReportSent.set(job, sent);
  }
  updateJobStatus(job, status, stage, progress, due ? onProgress : void 0, stageProgress);
}
function reportFrameProgress(job, stage, progress, onProgress, done, total) {
  reportThrottled(lastFrameReportAt, job, stage, progress, onProgress, done === total, {
    code: "capture",
    done,
    total
  });
}
var lastEncodeReportAt = /* @__PURE__ */ new WeakMap();
function reportEncodeProgress(job, done, total, onProgress, from) {
  if (total <= 0) return;
  const frames = Math.min(done, total);
  reportThrottled(
    lastEncodeReportAt,
    job,
    `Encoding frame ${frames}/${total}`,
    from + (90 - from) * frames / total,
    onProgress,
    frames === total,
    { code: "encode", done: frames, total },
    "encoding"
  );
}
var lastAssembleReportAt = /* @__PURE__ */ new WeakMap();
function reportAssembleProgress(job, done, total, onProgress) {
  if (total <= 0) return;
  const seconds = Math.min(done, total);
  reportThrottled(
    lastAssembleReportAt,
    job,
    "Assembling final video",
    90 + 9 * seconds / total,
    onProgress,
    seconds >= total,
    { code: "assemble", done: seconds, total },
    "assembling"
  );
}
var workerPhasesByJob = /* @__PURE__ */ new WeakMap();
function reportWorkerStartup(job, progress, onProgress) {
  const phase = progress.latestWorkerPhase;
  if (!phase) return;
  const phases = workerPhasesByJob.get(job) ?? /* @__PURE__ */ new Map();
  workerPhasesByJob.set(job, phases);
  phases.set(phase.workerId, phase.phase);
  const ready = [...phases].filter(
    ([id, p]) => id < progress.activeWorkers && (p === "frame_capture" || p === "frame_encode")
  ).length;
  reportThrottled(
    lastStartupReportAt,
    job,
    `Starting browsers (${ready}/${progress.activeWorkers} ready)`,
    job.progress,
    onProgress,
    false,
    { code: "start_browsers", done: ready, total: progress.activeWorkers }
  );
}
var materializePathModule = {
  resolve: resolve3,
  join: join3,
  dirname: dirname2,
  basename: basename2,
  relative,
  isAbsolute
};
var materializeFileSystem = {
  existsSync: existsSync3,
  mkdirSync,
  symlinkSync,
  cpSync,
  rmSync
};
function createMemorySampler(intervalMs = 250) {
  let peakRss = 0;
  let peakHeap = 0;
  const sample = () => {
    try {
      const m = process.memoryUsage();
      if (m.rss > peakRss) peakRss = m.rss;
      if (m.heapUsed > peakHeap) peakHeap = m.heapUsed;
    } catch {
    }
  };
  sample();
  const interval = setInterval(sample, intervalMs);
  interval.unref();
  let stopped = false;
  return {
    // Resampling at read time means callers see the value at the
    // moment of inspection, not the last 250ms tick — important for
    // the success-path perf summary which captures peaks just before
    // returning.
    peakRssBytes: () => {
      sample();
      return peakRss;
    },
    peakHeapUsedBytes: () => {
      sample();
      return peakHeap;
    },
    stop: () => {
      if (stopped) return;
      stopped = true;
      sample();
      clearInterval(interval);
    }
  };
}
var warnedSymlinkFallback = false;
function tryWindowsFrameJunction(fileSystem, src, dest) {
  if (process.platform !== "win32") return false;
  try {
    fileSystem.symlinkSync(src, dest, "junction");
    return true;
  } catch (error) {
    const code = error instanceof Error && "code" in error && typeof error.code === "string" ? error.code : void 0;
    if (["EPERM", "EACCES", "UNKNOWN", "EINVAL", "ENOSYS", "EOPNOTSUPP", "ENOTSUP"].includes(
      code ?? ""
    )) {
      return false;
    }
    throw error;
  }
}
function linkOrCopyFrameDir(fileSystem, src, dest) {
  try {
    fileSystem.symlinkSync(src, dest, "dir");
  } catch (err) {
    const code = err?.code;
    if (code !== "EPERM" && code !== "EACCES" && code !== "UNKNOWN") throw err;
    if (tryWindowsFrameJunction(fileSystem, src, dest)) return;
    if (!warnedSymlinkFallback) {
      warnedSymlinkFallback = true;
      defaultLogger.info(
        `[Render] Linking extracted frames was rejected (${code}); copying them into the compiled dir instead.`
      );
    }
    fileSystem.cpSync(src, dest, { recursive: true });
  }
}
function stageExtractedFrameDir(fileSystem, src, dest, materializeSymlinks) {
  try {
    stageExtractedFrameDirOnce(fileSystem, src, dest, materializeSymlinks);
  } catch (err) {
    if (err?.code !== "EEXIST") throw err;
    fileSystem.rmSync?.(dest, { recursive: true, force: true });
    stageExtractedFrameDirOnce(fileSystem, src, dest, materializeSymlinks);
  }
}
function stageExtractedFrameDirOnce(fileSystem, src, dest, materializeSymlinks) {
  if (materializeSymlinks) {
    fileSystem.cpSync(src, dest, { recursive: true });
    return;
  }
  linkOrCopyFrameDir(fileSystem, src, dest);
}
function materializeExtractedFramesForCompiledDir(extracted, compiledDir, options = {}) {
  const pathModule = options.pathModule ?? materializePathModule;
  const fileSystem = options.fileSystem ?? materializeFileSystem;
  const resolvedCompiledDir = pathModule.resolve(compiledDir);
  const compiledFrameRoot = pathModule.join(resolvedCompiledDir, "__hyperframes_video_frames");
  for (const ext of extracted) {
    const resolvedOut = pathModule.resolve(ext.outputDir);
    if (isPathInside2(resolvedOut, resolvedCompiledDir, { pathModule })) continue;
    const linkPath = pathModule.join(compiledFrameRoot, ext.videoId);
    if (!fileSystem.existsSync(linkPath)) {
      fileSystem.mkdirSync(pathModule.dirname(linkPath), { recursive: true });
      stageExtractedFrameDir(
        fileSystem,
        resolvedOut,
        linkPath,
        options.materializeSymlinks === true
      );
    }
    const remapped = /* @__PURE__ */ new Map();
    for (const [idx, framePath] of ext.framePaths) {
      remapped.set(idx, pathModule.join(linkPath, pathModule.basename(framePath)));
    }
    ext.framePaths = remapped;
    ext.outputDir = linkPath;
  }
}

// ../producer/src/services/render/cleanup.ts
import { freemem } from "os";

// ../producer/src/utils/errorMessage.ts
function normalizeErrorMessage(error) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    const msg = error.message;
    if (typeof msg === "string") return msg;
    try {
      return JSON.stringify(error);
    } catch {
      try {
        return `{${Object.keys(error).join(", ")}}`;
      } catch {
      }
    }
  }
  return String(error ?? "unknown error");
}

// ../producer/src/services/render/cleanup.ts
function buildRenderErrorDetails(input) {
  const errorMessage = normalizeErrorMessage(input.error);
  const errorStack = input.error instanceof Error ? input.error.stack : void 0;
  return {
    message: errorMessage,
    stack: errorStack,
    elapsedMs: Date.now() - input.pipelineStartMs,
    freeMemoryMB: Math.round(freemem() / (1024 * 1024)),
    browserConsoleTail: input.lastBrowserConsole.length > 0 ? input.lastBrowserConsole.slice(-30) : void 0,
    perfStages: Object.keys(input.perfStages).length > 0 ? { ...input.perfStages } : void 0,
    hdrDiagnostics: input.hdrDiagnostics.videoExtractionFailures > 0 || input.hdrDiagnostics.imageDecodeFailures > 0 ? { ...input.hdrDiagnostics } : void 0,
    observability: input.observability,
    subTimelineWait: input.subTimelineWait
  };
}

// ../producer/src/services/render/renderEventPublisher.ts
function snapshotJob(job) {
  return {
    ...job,
    warnings: cloneCaptureWarnings(job.warnings)
  };
}
var OrderedRenderEventPublisher = class {
  constructor(sink, log) {
    this.sink = sink;
    this.log = log;
  }
  sink;
  log;
  tail = Promise.resolve();
  publish(job, message) {
    if (!this.sink) return;
    const snapshot = snapshotJob(job);
    this.tail = this.tail.then(() => this.sink?.(snapshot, message)).then(() => void 0).catch((error) => {
      try {
        this.log.warn("Render event sink rejected an update", {
          status: snapshot.status,
          progress: snapshot.progress,
          error: error instanceof Error ? error.message : String(error)
        });
      } catch {
      }
    });
  }
  async flush() {
    await this.tail;
  }
};
function publishRenderFailure(job, failure, onProgress) {
  job.error = failure.error;
  job.failedStage = failure.failedStage;
  job.errorDetails = failure.errorDetails;
  updateJobStatus(job, "failed", `Failed: ${failure.error}`, job.progress, onProgress);
}

// ../producer/src/services/render/renderExecutionContext.ts
function scopedLogger(logger, fields) {
  const merge = (meta) => ({ ...fields, ...meta });
  return {
    error: (message, meta) => logger.error(message, merge(meta)),
    warn: (message, meta) => logger.warn(message, merge(meta)),
    info: (message, meta) => logger.info(message, merge(meta)),
    debug: (message, meta) => logger.debug(message, merge(meta)),
    isLevelEnabled: logger.isLevelEnabled?.bind(logger)
  };
}
function composeSignal(signal, deadlineAtMs) {
  if (deadlineAtMs === void 0) return signal;
  const remainingMs = Math.max(0, deadlineAtMs - Date.now());
  const deadlineSignal = remainingMs === 0 ? AbortSignal.abort(new Error("render_deadline_exceeded")) : AbortSignal.timeout(Math.min(remainingMs, 2147483647));
  return signal ? AbortSignal.any([signal, deadlineSignal]) : deadlineSignal;
}
var RenderExecutionContext = class {
  request;
  signal;
  logger;
  events;
  onProgress;
  disposers = [];
  disposePromise = null;
  constructor(options) {
    this.request = Object.freeze({ ...options.request });
    this.signal = composeSignal(options.signal, options.deadlineAtMs);
    this.logger = scopedLogger(options.logger, { renderJobId: options.request.renderJobId });
    this.events = new OrderedRenderEventPublisher(options.progressSink, this.logger);
    this.onProgress = options.progressSink ? (job, message) => this.events.publish(job, message) : void 0;
  }
  /** Register cleanup in acquisition order; execution is LIFO and exactly once. */
  defer(label, dispose) {
    if (this.disposePromise) throw new Error("Cannot register a disposer after context disposal");
    const entry = { active: true, label, dispose };
    this.disposers.push(entry);
    return () => {
      entry.active = false;
    };
  }
  assertActive(createError = () => new Error("render_cancelled")) {
    if (this.signal?.aborted) throw createError();
  }
  dispose() {
    if (this.disposePromise) return this.disposePromise;
    this.disposePromise = this.disposeOnce();
    return this.disposePromise;
  }
  async disposeOnce() {
    await this.events.flush();
    for (const entry of this.disposers.reverse()) {
      if (!entry.active) continue;
      entry.active = false;
      try {
        await entry.dispose();
      } catch (error) {
        try {
          this.logger.debug(`Cleanup failed (${entry.label})`, {
            error: error instanceof Error ? error.message : String(error)
          });
        } catch {
        }
      }
    }
  }
};

// ../producer/src/services/render/artifactTransaction.ts
import {
  closeSync as closeSync2,
  existsSync as existsSync5,
  fstatSync as fstatSync2,
  openSync as openSync2,
  readSync,
  readdirSync as readdirSync2,
  renameSync,
  rmSync as rmSync3
} from "fs";
import { dirname as dirname4, extname as extname2, join as join5, resolve as resolve4 } from "path";

// ../producer/src/services/render/renderDirOwner.ts
import {
  existsSync as existsSync4,
  lstatSync,
  mkdtempSync,
  readFileSync as readFileSync2,
  readdirSync,
  readlinkSync,
  rmSync as rmSync2,
  writeFileSync as writeFileSync2
} from "fs";
import { hostname, uptime } from "os";
import { dirname as dirname3, join as join4 } from "path";
var OWNER_FILE = "owner.json";
var TRANSACTION_BACKUP = "backup";
var RENDER_TEMP_DIR = /^(work-[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}|hf-render|\..+\.hf-transaction)-[A-Za-z0-9]{6}$/;
var RENDER_JOB_DIR = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
function pidScope() {
  const attempt = (read) => {
    try {
      return read();
    } catch {
      return void 0;
    }
  };
  return {
    host: hostname(),
    // Without /proc (macOS, Windows) the boot time, to the minute, stands in for the boot id.
    boot: attempt(() => readFileSync2("/proc/sys/kernel/random/boot_id", "utf-8").trim()) ?? String(Math.round(Date.now() / 6e4 - uptime() / 60)),
    pidns: attempt(() => readlinkSync("/proc/self/ns/pid"))
  };
}
function createOwnedRenderDir(prefix) {
  const dir = mkdtempSync(prefix);
  const owner = { pid: process.pid, ...pidScope() };
  writeFileSync2(join4(dir, OWNER_FILE), JSON.stringify(owner));
  return dir;
}
function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}
function inThisPidScope(owner) {
  const scope = pidScope();
  return owner.host === scope.host && owner.boot === scope.boot && owner.pidns === scope.pidns;
}
function ownerState(dir) {
  let owner;
  try {
    owner = JSON.parse(readFileSync2(join4(dir, OWNER_FILE), "utf-8"));
  } catch (error) {
    return error.code === "ENOENT" ? "none" : "unknown";
  }
  const { pid } = owner;
  if (!inThisPidScope(owner) || typeof pid !== "number" || !Number.isInteger(pid) || pid <= 0) {
    return "unknown";
  }
  return alive(pid) ? "live" : "gone";
}
function newestWriteMs(path) {
  const stat = lstatSync(path);
  if (!stat.isDirectory()) return stat.mtimeMs;
  return readdirSync(path).reduce(
    (newest, name) => Math.max(newest, newestWriteMs(join4(path, name))),
    stat.mtimeMs
  );
}
function isAbandoned(dir, ownerlessIdleMs, now) {
  try {
    if (!lstatSync(dir).isDirectory() || existsSync4(join4(dir, TRANSACTION_BACKUP))) return false;
    const owner = ownerState(dir);
    if (owner === "gone") return true;
    return owner === "none" && ownerlessIdleMs !== void 0 && now - newestWriteMs(dir) >= ownerlessIdleMs;
  } catch {
    return false;
  }
}
function listAbandonedRenderDirs(parent, options = {}) {
  let names;
  try {
    names = readdirSync(parent);
  } catch {
    return [];
  }
  const now = Date.now();
  return names.filter((name) => (options.names ?? RENDER_TEMP_DIR).test(name)).map((name) => join4(parent, name)).filter((dir) => isAbandoned(dir, options.ownerlessIdleMs, now));
}
function createRenderWorkDir(prefix, outputDir) {
  for (const parent of /* @__PURE__ */ new Set([outputDir, dirname3(prefix)])) {
    for (const dir of listAbandonedRenderDirs(parent)) {
      try {
        rmSync2(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      } catch {
      }
    }
  }
  return createOwnedRenderDir(prefix);
}

// ../producer/src/services/render/artifactTransaction.ts
var defaultFileSystem = {
  existsSync: existsSync5,
  renameSync,
  rmSync: rmSync3
};
async function defaultArtifactDurationProbe(path) {
  const meta = await extractMediaMetadata(path);
  return {
    durationSeconds: meta.durationSeconds,
    frames: meta.frames
  };
}
function buildArtifactExpectation(input) {
  if (input.outputFormat === "png-sequence" || input.outputFormat === "gif") return void 0;
  if (!Number.isFinite(input.durationSeconds) || input.durationSeconds <= 0) return void 0;
  const expectation = {
    expectedDurationSeconds: input.durationSeconds,
    fps: input.fps,
    expectedFrames: input.expectedFrames
  };
  if (input.outputFormat !== "hls") return expectation;
  return {
    ...expectation,
    probeTarget: HLS_VIDEO_PLAYLIST,
    requiredFiles: [HLS_MASTER_PLAYLIST]
  };
}
function createSiblingTransactionDirectory(destination) {
  const parent = dirname4(destination);
  return createOwnedRenderDir(join5(parent, ".render.hf-transaction-"));
}
function assertReadableNonEmptyFile(path) {
  const fd = openSync2(path, "r");
  try {
    const stat = fstatSync2(fd);
    if (!stat.isFile() || stat.size <= 0) {
      throw new Error(`Render artifact is not a non-empty file: ${path}`);
    }
    readSync(fd, Buffer.allocUnsafe(1), 0, 1, 0);
  } finally {
    closeSync2(fd);
  }
}
function collectDirectoryFiles(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync2(directory, { withFileTypes: true })) {
      const path = join5(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit(root);
  return files;
}
function durationToleranceSeconds(expected) {
  if (expected.toleranceSeconds !== void 0) return expected.toleranceSeconds;
  const fps = expected.fps;
  return fps && fps > 0 ? 1 / fps : 0.02;
}
function assertUsableProbedDuration(probedSeconds, expectedSeconds, stagingPath) {
  if (!Number.isFinite(probedSeconds) || probedSeconds <= 0) {
    throw new Error(
      `Render artifact duration probe returned no usable duration for ${stagingPath} (got ${String(probedSeconds)}); expected ${expectedSeconds.toFixed(3)}s. Refusing to publish an artifact whose duration cannot be verified.`
    );
  }
}
function assertDurationWithinTolerance(expectedSeconds, probedSeconds, toleranceSeconds, stagingPath) {
  const deficit = expectedSeconds - probedSeconds;
  if (deficit <= toleranceSeconds) return;
  throw new Error(
    `Render artifact is truncated: expected ${expectedSeconds.toFixed(3)}s, probed ${probedSeconds.toFixed(3)}s (deficit ${deficit.toFixed(3)}s exceeds tolerance ${toleranceSeconds.toFixed(3)}s). Artifact: ${stagingPath}`
  );
}
function assertFrameCountWithinTolerance(expectedFrames, probedFrames, stagingPath) {
  if (probedFrames === void 0 || !Number.isFinite(probedFrames) || probedFrames <= 0) {
    return;
  }
  const shortfall = expectedFrames - probedFrames;
  if (shortfall <= 1) return;
  throw new Error(
    `Render artifact is truncated: expected ${expectedFrames} frames, probed ${probedFrames} frames (shortfall ${shortfall} frames). Artifact: ${stagingPath}`
  );
}
var ArtifactTransaction = class {
  constructor(destinationPath, kind, fileSystem = defaultFileSystem, durationProbe = defaultArtifactDurationProbe) {
    this.kind = kind;
    this.fileSystem = fileSystem;
    this.destinationPath = resolve4(destinationPath);
    this.transactionDirectory = createSiblingTransactionDirectory(this.destinationPath);
    this.stagingPath = join5(this.transactionDirectory, `artifact${extname2(this.destinationPath)}`);
    this.backupPath = join5(this.transactionDirectory, TRANSACTION_BACKUP);
    this.durationProbe = durationProbe;
  }
  kind;
  fileSystem;
  destinationPath;
  stagingPath;
  transactionDirectory;
  backupPath;
  state = "active";
  durationProbe;
  async validate(expected) {
    if (this.kind === "file") {
      assertReadableNonEmptyFile(this.stagingPath);
      if (expected) await this.assertArtifactDuration(expected);
      return;
    }
    this.assertReadableNonEmptyDirectory();
    if (expected) await this.assertDirectoryExpectation(expected);
  }
  assertReadableNonEmptyDirectory() {
    let files;
    try {
      files = collectDirectoryFiles(this.stagingPath);
    } catch (error) {
      throw new Error(`Render artifact is not a readable directory: ${this.stagingPath}`, {
        cause: error
      });
    }
    if (files.length === 0) {
      throw new Error(`Render artifact directory is empty: ${this.stagingPath}`);
    }
    for (const file of files) assertReadableNonEmptyFile(file);
  }
  /**
   * The named-entry and duration gates a directory artifact opts into. A
   * directory has no single probe target, so an expectation without
   * `probeTarget` (png-sequence) keeps the historical behavior: structure only.
   */
  async assertDirectoryExpectation(expected) {
    for (const required of expected.requiredFiles ?? []) {
      const path = join5(this.stagingPath, required);
      if (!existsSync5(path)) {
        throw new Error(`Render artifact directory is missing ${required}: ${this.stagingPath}`);
      }
      assertReadableNonEmptyFile(path);
    }
    if (expected.probeTarget === void 0) return;
    await this.assertArtifactDuration(expected, join5(this.stagingPath, expected.probeTarget));
  }
  async assertArtifactDuration(expected, probePath = this.stagingPath) {
    const expectedSeconds = expected.expectedDurationSeconds;
    if (!Number.isFinite(expectedSeconds) || expectedSeconds <= 0) return;
    const probed = await this.runDurationProbe(probePath);
    assertUsableProbedDuration(probed.durationSeconds, expectedSeconds, probePath);
    const toleranceSeconds = durationToleranceSeconds(expected);
    assertDurationWithinTolerance(
      expectedSeconds,
      probed.durationSeconds,
      toleranceSeconds,
      probePath
    );
    if (expected.expectedFrames !== void 0) {
      assertFrameCountWithinTolerance(expected.expectedFrames, probed.frames, probePath);
    }
  }
  async runDurationProbe(probePath) {
    try {
      return await this.durationProbe(probePath);
    } catch (error) {
      throw new Error(
        `Render artifact duration probe failed for ${probePath}: ${error instanceof Error ? error.message : String(error)}`,
        { cause: error }
      );
    }
  }
  async commit() {
    if (this.state !== "active") {
      throw new Error(`Cannot commit an artifact transaction in state ${this.state}`);
    }
    await this.validate();
    const hadDestination = this.fileSystem.existsSync(this.destinationPath);
    if (this.kind === "file" || !hadDestination) {
      this.fileSystem.renameSync(this.stagingPath, this.destinationPath);
      this.state = "committed";
      this.cleanupTransactionDirectory();
      return;
    }
    this.fileSystem.renameSync(this.destinationPath, this.backupPath);
    try {
      this.fileSystem.renameSync(this.stagingPath, this.destinationPath);
      this.state = "committed";
    } catch (error) {
      this.restoreBackupIfDestinationUnclaimed();
      this.state = "rolled-back";
      this.cleanupTransactionDirectory();
      throw error;
    }
    this.cleanupTransactionDirectory();
  }
  rollback() {
    if (this.state !== "active") return;
    this.fileSystem.rmSync(this.stagingPath, { recursive: true, force: true });
    if (this.fileSystem.existsSync(this.backupPath) && !this.fileSystem.existsSync(this.destinationPath)) {
      this.fileSystem.renameSync(this.backupPath, this.destinationPath);
    }
    this.cleanupTransactionDirectory();
    this.state = "rolled-back";
  }
  restoreBackupIfDestinationUnclaimed() {
    if (!this.fileSystem.existsSync(this.backupPath) || this.fileSystem.existsSync(this.destinationPath)) {
      return;
    }
    try {
      this.fileSystem.renameSync(this.backupPath, this.destinationPath);
    } catch (error) {
      if (!this.fileSystem.existsSync(this.destinationPath)) throw error;
    }
  }
  cleanupTransactionDirectory() {
    try {
      this.fileSystem.rmSync(this.transactionDirectory, { recursive: true, force: true });
    } catch {
    }
  }
};
async function commitArtifactTransaction(transaction, assertNotAborted) {
  assertNotAborted();
  await transaction.commit();
}

// ../producer/src/services/render/capturePlan.ts
function capturePathForPlanKind(kind) {
  switch (kind) {
    case "sdr_streaming":
      return "streaming";
    case "sdr_disk":
      return "disk";
    case "hdr_layered":
      return "hdr_layered";
    case "sdr_segmented":
      return "segmented";
  }
}
function drawElementVerificationFailure(plan2, hasDiskFallbackHeadroom) {
  const { routing } = plan2;
  const needsHeadroom = routing.kind !== "default" && routing.fallback.kind === "sdr_disk" && routing.memoryExhaustionFallback.kind === "sdr_streaming";
  return {
    kind: "draw_element_verification",
    diskFallbackAvailable: needsHeadroom ? hasDiskFallbackHeadroom() : void 0
  };
}
function streamingCaptureFailure(plan2, classification, hasDiskFallbackHeadroom) {
  return classification.isVerifyError ? drawElementVerificationFailure(plan2, hasDiskFallbackHeadroom) : { kind: "capture_failure", memoryExhaustion: classification.isMemoryExhaustion };
}
function assertWorkerCount(workerCount) {
  if (!Number.isInteger(workerCount) || workerCount < 1) {
    throw new Error(`CapturePlan workerCount must be a positive integer; got ${workerCount}`);
  }
}
function freezeTarget(target) {
  assertWorkerCount(target.workerCount);
  if (target.kind === "sdr_disk" && target.forceParallelStream) {
    throw new Error("CapturePlan disk fallback cannot force parallel streaming");
  }
  return Object.freeze({ ...target });
}
function freezeRouting(routing) {
  if (!routing || routing.kind === "default") return Object.freeze({ kind: "default" });
  return Object.freeze({
    ...routing,
    fallback: freezeTarget(routing.fallback),
    memoryExhaustionFallback: freezeTarget(routing.memoryExhaustionFallback)
  });
}
function createCapturePlan(input) {
  assertWorkerCount(input.workerCount);
  const base = {
    workerCount: input.workerCount,
    forceScreenshot: input.forceScreenshot || input.usePageSideCompositing,
    forceParallelStream: input.useStreamingEncode ? input.forceParallelStream ?? false : false,
    usePageSideCompositing: input.usePageSideCompositing,
    hasHdrContent: input.hasHdrContent,
    needsAlpha: input.needsAlpha,
    routing: freezeRouting(input.routing)
  };
  if (input.useLayeredComposite) {
    return Object.freeze({
      ...base,
      kind: "hdr_layered",
      forceScreenshot: true,
      forceParallelStream: false
    });
  }
  if (input.useSegmentedCapture === true) {
    return Object.freeze({ ...base, kind: "sdr_segmented", forceParallelStream: false });
  }
  if (input.useStreamingEncode) {
    return Object.freeze({ ...base, kind: "sdr_streaming" });
  }
  return Object.freeze({ ...base, kind: "sdr_disk", forceParallelStream: false });
}
function revertedRouting(routing) {
  if (routing.kind === "default") return routing;
  return freezeRouting({ ...routing, state: "reverted" });
}
function replanSegmentedAfterFailure(plan2, failure) {
  const keepSegmenting = failure.kind === "draw_element_verification" || failure.kind === "draw_element_capture";
  return createCapturePlan({
    ...plan2,
    forceScreenshot: keepSegmenting || failure.kind === "capture_failure",
    useStreamingEncode: true,
    useLayeredComposite: false,
    useSegmentedCapture: keepSegmenting,
    forceParallelStream: false,
    routing: revertedRouting(plan2.routing)
  });
}
function replanAfterFailure(plan2, failure) {
  if (plan2.kind === "sdr_segmented") return replanSegmentedAfterFailure(plan2, failure);
  if (plan2.kind === "sdr_disk" && (failure.kind === "draw_element_verification" || failure.kind === "draw_element_capture")) {
    return createCapturePlan({
      ...plan2,
      forceScreenshot: true,
      useStreamingEncode: false,
      useLayeredComposite: false,
      forceParallelStream: false
    });
  }
  if (plan2.kind !== "sdr_streaming") {
    throw new Error(`Cannot apply ${failure.kind} to ${plan2.kind} capture plan`);
  }
  if (failure.kind === "streaming_unavailable") {
    return createCapturePlan({
      ...plan2,
      useStreamingEncode: false,
      useLayeredComposite: false,
      forceParallelStream: false
    });
  }
  const isMemoryExhaustion = failure.kind === "capture_failure" && failure.memoryExhaustion;
  const diskFallbackUnavailable = failure.kind === "draw_element_verification" && failure.diskFallbackAvailable === false;
  const retryAtOneWorker = isMemoryExhaustion || plan2.forceParallelStream;
  const fallback = plan2.routing.kind === "default" ? {
    kind: plan2.kind,
    workerCount: retryAtOneWorker ? 1 : plan2.workerCount,
    forceParallelStream: false
  } : isMemoryExhaustion || diskFallbackUnavailable ? plan2.routing.memoryExhaustionFallback : plan2.routing.fallback;
  return createCapturePlan({
    ...plan2,
    workerCount: fallback.workerCount,
    forceScreenshot: true,
    forceParallelStream: fallback.forceParallelStream,
    useStreamingEncode: fallback.kind === "sdr_streaming",
    useLayeredComposite: false,
    routing: revertedRouting(plan2.routing)
  });
}

// ../producer/src/services/render/stages/captureSegmentedStage.ts
import { existsSync as existsSync6, mkdirSync as mkdirSync3, rmSync as rmSync5, statSync as statSync2 } from "fs";
import { join as join9 } from "path";

// ../producer/src/services/render/captureStageError.ts
var CaptureStageError = class extends CaptureFailure {
  browserConsole;
  constructor(input) {
    const classified = classifyCaptureFailure(input.cause);
    super({
      kind: classified.kind,
      message: normalizeErrorMessage(input.cause),
      cause: input.cause,
      workerDiagnostics: classified.workerDiagnostics
    });
    this.name = "CaptureStageError";
    this.browserConsole = input.browserConsole.slice();
    if (input.cause instanceof Error && input.cause.stack) {
      this.stack = input.cause.stack;
    }
  }
};
function wrapCaptureStageError(error, browserConsole) {
  if (error instanceof CaptureStageError || error instanceof EncoderInterruptedError) return error;
  return new CaptureStageError({ cause: error, browserConsole });
}
function getCaptureStageBrowserConsole(error) {
  if (error instanceof CaptureStageError) return error.browserConsole;
  return [];
}

// ../producer/src/services/hdrCompositor.ts
import { readSync as readSync2, closeSync as closeSync3 } from "fs";
import { join as join6 } from "path";

// ../producer/src/services/render/hdrPerf.ts
function createHdrPerfCollector() {
  return {
    frames: 0,
    normalFrames: 0,
    transitionFrames: 0,
    domLayerCaptures: 0,
    hdrVideoLayerBlits: 0,
    hdrImageLayerBlits: 0,
    timings: {
      frameSeekMs: 0,
      frameInjectMs: 0,
      stackingQueryMs: 0,
      canvasClearMs: 0,
      normalCompositeMs: 0,
      transitionCompositeMs: 0,
      encoderWriteMs: 0,
      hdrVideoReadDecodeMs: 0,
      hdrVideoTransferMs: 0,
      hdrVideoBlitMs: 0,
      hdrImageTransferMs: 0,
      hdrImageBlitMs: 0,
      domLayerSeekMs: 0,
      domLayerInjectMs: 0,
      domMaskApplyMs: 0,
      domScreenshotMs: 0,
      domMaskRemoveMs: 0,
      domPngDecodeMs: 0,
      domBlitMs: 0
    }
  };
}
function addHdrTiming(perf, key, startMs) {
  if (!perf) return;
  perf.timings[key] += Date.now() - startMs;
}
function timeHdrPhase(perf, key, fn) {
  if (!perf) return fn();
  const start = Date.now();
  const result = fn();
  addHdrTiming(perf, key, start);
  return result;
}
async function timeHdrPhaseAsync(perf, key, fn) {
  if (!perf) return fn();
  const start = Date.now();
  const result = await fn();
  addHdrTiming(perf, key, start);
  return result;
}
function averageTiming(totalMs, count) {
  return count > 0 ? Math.round(totalMs / count * 100) / 100 : 0;
}
function finalizeHdrPerf(perf) {
  const avgMs = {};
  const perFrameKeys = [
    "frameSeekMs",
    "frameInjectMs",
    "stackingQueryMs",
    "canvasClearMs",
    "encoderWriteMs"
  ];
  for (const key of perFrameKeys) avgMs[key] = averageTiming(perf.timings[key], perf.frames);
  avgMs.normalCompositeMs = averageTiming(perf.timings.normalCompositeMs, perf.normalFrames);
  avgMs.transitionCompositeMs = averageTiming(
    perf.timings.transitionCompositeMs,
    perf.transitionFrames
  );
  const perDomLayerKeys = [
    "domLayerSeekMs",
    "domLayerInjectMs",
    "domMaskApplyMs",
    "domScreenshotMs",
    "domMaskRemoveMs",
    "domPngDecodeMs",
    "domBlitMs"
  ];
  for (const key of perDomLayerKeys) {
    avgMs[key] = averageTiming(perf.timings[key], perf.domLayerCaptures);
  }
  const perHdrVideoKeys = [
    "hdrVideoReadDecodeMs",
    "hdrVideoTransferMs",
    "hdrVideoBlitMs"
  ];
  for (const key of perHdrVideoKeys) {
    avgMs[key] = averageTiming(perf.timings[key], perf.hdrVideoLayerBlits);
  }
  const perHdrImageKeys = ["hdrImageTransferMs", "hdrImageBlitMs"];
  for (const key of perHdrImageKeys) {
    avgMs[key] = averageTiming(perf.timings[key], perf.hdrImageLayerBlits);
  }
  return {
    frames: perf.frames,
    normalFrames: perf.normalFrames,
    transitionFrames: perf.transitionFrames,
    domLayerCaptures: perf.domLayerCaptures,
    hdrVideoLayerBlits: perf.hdrVideoLayerBlits,
    hdrImageLayerBlits: perf.hdrImageLayerBlits,
    timings: { ...perf.timings },
    avgMs
  };
}

// ../producer/src/services/hdrCompositor.ts
function countNonZeroAlpha(rgba) {
  let n = 0;
  for (let p = 3; p < rgba.length; p += 4) {
    if (rgba[p] !== 0) n++;
  }
  return n;
}
function countNonZeroRgb48(buf) {
  let n = 0;
  for (let p = 0; p < buf.length; p += 6) {
    if (buf[p] !== 0 || buf[p + 1] !== 0 || buf[p + 2] !== 0 || buf[p + 3] !== 0 || buf[p + 4] !== 0 || buf[p + 5] !== 0)
      n++;
  }
  return n;
}
var TRANSFORM_IDENTITY_EPSILON = 1e-3;
var OPAQUE_ALPHA_THRESHOLD = 0.999;
var RGB48_BYTES_PER_PIXEL = 6;
function isAffineMatrix(m) {
  return m.length === 6;
}
function resolveBlitOpacity(opacity) {
  return opacity < OPAQUE_ALPHA_THRESHOLD ? opacity : void 0;
}
function cropRgb48le(src, srcW, srcH, cropX, cropY, cropW, cropH) {
  const dst = Buffer.alloc(cropW * cropH * RGB48_BYTES_PER_PIXEL);
  for (let row = 0; row < cropH; row++) {
    const srcRow = cropY + row;
    if (srcRow < 0 || srcRow >= srcH) continue;
    const srcOff = (srcRow * srcW + cropX) * RGB48_BYTES_PER_PIXEL;
    const dstOff = row * cropW * RGB48_BYTES_PER_PIXEL;
    const copyLen = Math.min(cropW, srcW - cropX) * RGB48_BYTES_PER_PIXEL;
    if (copyLen > 0) src.copy(dst, dstOff, srcOff, srcOff + copyLen);
  }
  return dst;
}
function closeHdrVideoFrameSource(source, log) {
  try {
    closeSync3(source.fd);
  } catch (err) {
    log?.warn("Failed to close HDR raw frame file", {
      rawPath: source.rawPath,
      error: err instanceof Error ? err.message : String(err)
    });
  }
}
function resolveHdrVideoFrameIndex(time, startTime, fps, frameCount, loop = false) {
  const frameIndex = Math.round((time - startTime) * fps);
  if (frameIndex < 0 || frameCount < 1) return null;
  return loop ? frameIndex % frameCount : Math.min(frameIndex, frameCount - 1);
}
function blitHdrVideoLayer(canvas, el, time, fps, hdrVideoFrameSources, hdrStartTimes, width, height, log, sourceTransfer, targetTransfer, hdrPerf) {
  const frameSource = hdrVideoFrameSources.get(el.id);
  const startTime = hdrStartTimes.get(el.id);
  if (!frameSource || startTime === void 0 || el.opacity <= 0) {
    return;
  }
  const effectiveIndex = resolveHdrVideoFrameIndex(
    time,
    startTime,
    fps,
    frameSource.frameCount,
    frameSource.loop
  );
  if (effectiveIndex === null) return;
  const frameOffset = effectiveIndex * frameSource.frameSize;
  try {
    if (hdrPerf) hdrPerf.hdrVideoLayerBlits += 1;
    const bytesRead = timeHdrPhase(
      hdrPerf,
      "hdrVideoReadDecodeMs",
      () => readSync2(frameSource.fd, frameSource.scratch, 0, frameSource.frameSize, frameOffset)
    );
    if (bytesRead !== frameSource.frameSize) return;
    const hdrRgb = frameSource.scratch;
    const srcW = frameSource.width;
    const srcH = frameSource.height;
    if (sourceTransfer && targetTransfer && sourceTransfer !== targetTransfer) {
      timeHdrPhase(
        hdrPerf,
        "hdrVideoTransferMs",
        () => convertTransfer(hdrRgb, sourceTransfer, targetTransfer)
      );
    }
    const rawMatrix = parseTransformMatrix(el.transform);
    const matrix = rawMatrix && isAffineMatrix(rawMatrix) ? rawMatrix : null;
    const br = el.borderRadius;
    const hasBorderRadius = br[0] > 0 || br[1] > 0 || br[2] > 0 || br[3] > 0;
    const borderRadiusParam = hasBorderRadius ? br : void 0;
    let blitX = el.x;
    let blitY = el.y;
    let blitSrcX = 0;
    let blitSrcY = 0;
    let blitW = srcW;
    let blitH = srcH;
    let clipped = false;
    if (el.clipRect) {
      const cr = el.clipRect;
      const cx1 = Math.max(blitX, cr.x);
      const cy1 = Math.max(blitY, cr.y);
      const cx2 = Math.min(blitX + blitW, cr.x + cr.width);
      const cy2 = Math.min(blitY + blitH, cr.y + cr.height);
      if (cx2 <= cx1 || cy2 <= cy1) return;
      blitSrcX = cx1 - blitX;
      blitSrcY = cy1 - blitY;
      blitW = cx2 - cx1;
      blitH = cy2 - cy1;
      blitX = cx1;
      blitY = cy1;
      clipped = true;
    }
    const isTranslationOnly = !!(matrix && Math.abs(matrix[0] - 1) < TRANSFORM_IDENTITY_EPSILON && Math.abs(matrix[1]) < TRANSFORM_IDENTITY_EPSILON && Math.abs(matrix[2]) < TRANSFORM_IDENTITY_EPSILON && Math.abs(matrix[3] - 1) < TRANSFORM_IDENTITY_EPSILON);
    timeHdrPhase(hdrPerf, "hdrVideoBlitMs", () => {
      if (matrix && !isTranslationOnly) {
        if (clipped && log) {
          log.debug(
            `HDR clip rect on affine-transformed element ${el.id} \u2014 clip not applied (affine scissor not yet supported)`
          );
        }
        blitRgb48leAffine(
          canvas,
          hdrRgb,
          matrix,
          srcW,
          srcH,
          width,
          height,
          resolveBlitOpacity(el.opacity),
          borderRadiusParam
        );
      } else if (clipped) {
        const croppedBuf = cropRgb48le(hdrRgb, srcW, srcH, blitSrcX, blitSrcY, blitW, blitH);
        blitRgb48leRegion(
          canvas,
          croppedBuf,
          blitX,
          blitY,
          blitW,
          blitH,
          width,
          height,
          resolveBlitOpacity(el.opacity),
          borderRadiusParam
        );
      } else {
        blitRgb48leRegion(
          canvas,
          hdrRgb,
          el.x,
          el.y,
          srcW,
          srcH,
          width,
          height,
          resolveBlitOpacity(el.opacity),
          borderRadiusParam
        );
      }
    });
  } catch (err) {
    if (log) {
      log.debug(`HDR blit failed for ${el.id}`, {
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }
}
function blitHdrImageLayer(canvas, el, hdrImageBuffers, hdrImageTransferCache, width, height, log, sourceTransfer, targetTransfer, hdrPerf) {
  const buf = hdrImageBuffers.get(el.id);
  if (!buf || el.opacity <= 0) {
    return;
  }
  if (el.clipRect && log) {
    log.debug(`HDR clip rect on image element ${el.id} \u2014 clip not yet supported for images`);
  }
  try {
    if (hdrPerf) hdrPerf.hdrImageLayerBlits += 1;
    const hdrRgb = timeHdrPhase(
      hdrPerf,
      "hdrImageTransferMs",
      () => sourceTransfer && targetTransfer ? hdrImageTransferCache.getConverted(el.id, sourceTransfer, targetTransfer, buf.data) : buf.data
    );
    const rawMatrix = parseTransformMatrix(el.transform);
    const matrix = rawMatrix && isAffineMatrix(rawMatrix) ? rawMatrix : null;
    const br = el.borderRadius;
    const hasBorderRadius = br[0] > 0 || br[1] > 0 || br[2] > 0 || br[3] > 0;
    const borderRadiusParam = hasBorderRadius ? br : void 0;
    timeHdrPhase(hdrPerf, "hdrImageBlitMs", () => {
      if (matrix) {
        blitRgb48leAffine(
          canvas,
          hdrRgb,
          matrix,
          buf.width,
          buf.height,
          width,
          height,
          resolveBlitOpacity(el.opacity),
          borderRadiusParam
        );
      } else {
        blitRgb48leRegion(
          canvas,
          hdrRgb,
          el.x,
          el.y,
          buf.width,
          buf.height,
          width,
          height,
          resolveBlitOpacity(el.opacity),
          borderRadiusParam
        );
      }
    });
  } catch (err) {
    if (log) {
      log.debug(`HDR image blit failed for ${el.id}`, {
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }
}
function shouldUseLayeredComposite(options) {
  return options.hasHdrContent || options.hasShaderTransitions && !options.isPngSequence;
}
function resolveCompositeTransfer(hasHdrContent, effectiveHdr) {
  return hasHdrContent && effectiveHdr ? effectiveHdr.transfer : "srgb";
}
function selectDomLayerShowIds(layerElementIds, fullStacking) {
  const byId = new Map(fullStacking.map((el) => [el.id, el]));
  return layerElementIds.filter((id) => {
    const el = byId.get(id);
    return !!el && el.opacity > 0 && (el.visible || el.renderFrameVisible === true);
  });
}
async function compositeHdrFrame(ctx, canvas, time, fullStacking, elementFilter, debugFrameIndex = -1) {
  const {
    log,
    domSession,
    beforeCaptureHook,
    width,
    height,
    fps,
    compositeTransfer,
    nativeHdrImageIds,
    hdrImageBuffers,
    hdrImageTransferCache,
    hdrVideoFrameSources,
    hdrVideoStartTimes,
    imageTransfers,
    videoTransfers,
    debugDumpEnabled,
    debugDumpDir,
    hdrPerf
  } = ctx;
  const filteredStacking = elementFilter ? fullStacking.filter((e) => elementFilter.has(e.id)) : fullStacking;
  const layers = groupIntoLayers(filteredStacking);
  const allElementIds = fullStacking.map((e) => e.id);
  const shouldLog = debugDumpEnabled && debugFrameIndex >= 0;
  if (shouldLog) {
    log.info("[diag] compositeToBuffer plan", {
      frame: debugFrameIndex,
      time: time.toFixed(3),
      filterSize: elementFilter?.size,
      fullStackingCount: fullStacking.length,
      filteredCount: filteredStacking.length,
      layerCount: layers.length,
      layers: layers.map(
        (l) => l.type === "hdr" ? {
          type: "hdr",
          id: l.element.id,
          z: l.element.zIndex,
          visible: l.element.visible,
          opacity: l.element.opacity,
          bounds: `${Math.round(l.element.x)},${Math.round(l.element.y)} ${Math.round(l.element.width)}x${Math.round(l.element.height)}`
        } : { type: "dom", ids: l.elementIds }
      )
    });
  }
  for (const [layerIdx, layer] of layers.entries()) {
    if (layer.type === "hdr") {
      if (layer.element.opacity <= 0) continue;
      const before = shouldLog ? countNonZeroRgb48(canvas) : 0;
      const isHdrImage = nativeHdrImageIds.has(layer.element.id);
      const hdrTargetTransfer = compositeTransfer === "srgb" ? void 0 : compositeTransfer;
      if (isHdrImage) {
        blitHdrImageLayer(
          canvas,
          layer.element,
          hdrImageBuffers,
          hdrImageTransferCache,
          width,
          height,
          log,
          imageTransfers.get(layer.element.id),
          hdrTargetTransfer,
          hdrPerf
        );
      } else {
        blitHdrVideoLayer(
          canvas,
          layer.element,
          time,
          fps,
          hdrVideoFrameSources,
          hdrVideoStartTimes,
          width,
          height,
          log,
          videoTransfers.get(layer.element.id),
          hdrTargetTransfer,
          hdrPerf
        );
      }
      if (shouldLog) {
        const after = countNonZeroRgb48(canvas);
        if (isHdrImage) {
          const buf = hdrImageBuffers.get(layer.element.id);
          log.info("[diag] hdr layer blit", {
            frame: debugFrameIndex,
            layerIdx,
            id: layer.element.id,
            kind: "image",
            pixelsAdded: after - before,
            totalNonZero: after,
            bufferDecoded: !!buf,
            bufferDims: buf ? `${buf.width}x${buf.height}` : null
          });
        } else {
          const frameSource = hdrVideoFrameSources.get(layer.element.id);
          const startTime = hdrVideoStartTimes.get(layer.element.id) ?? 0;
          const localTime = time - startTime;
          const frameNum = Math.floor(localTime * fps) + 1;
          log.info("[diag] hdr layer blit", {
            frame: debugFrameIndex,
            layerIdx,
            id: layer.element.id,
            kind: "video",
            pixelsAdded: after - before,
            totalNonZero: after,
            startTime,
            localTime: localTime.toFixed(3),
            hdrFrameNum: frameNum,
            rawPath: frameSource?.rawPath ?? null,
            frameCount: frameSource?.frameCount ?? null
          });
        }
      }
    } else {
      const layerIds = new Set(layer.elementIds);
      const showIds = selectDomLayerShowIds(layer.elementIds, fullStacking);
      if (showIds.length === 0) {
        if (shouldLog) {
          log.info("[diag] dom layer skipped, all elements not paintable", {
            frame: debugFrameIndex,
            layerIdx,
            layerIds: layer.elementIds
          });
        }
        continue;
      }
      const hideIds = allElementIds.filter((id) => !layerIds.has(id));
      if (hdrPerf) hdrPerf.domLayerCaptures += 1;
      await timeHdrPhaseAsync(
        hdrPerf,
        "domLayerSeekMs",
        () => domSession.page.evaluate((t) => {
          if (window.__hf && typeof window.__hf.seek === "function") window.__hf.seek(t);
        }, time)
      );
      if (beforeCaptureHook) {
        await timeHdrPhaseAsync(
          hdrPerf,
          "domLayerInjectMs",
          () => beforeCaptureHook(domSession.page, time)
        );
      }
      await timeHdrPhaseAsync(
        hdrPerf,
        "domMaskApplyMs",
        () => applyDomLayerMask(domSession.page, showIds, hideIds)
      );
      const domPng = await timeHdrPhaseAsync(
        hdrPerf,
        "domScreenshotMs",
        () => captureAlphaPng(domSession.page, width, height)
      );
      await timeHdrPhaseAsync(
        hdrPerf,
        "domMaskRemoveMs",
        () => removeDomLayerMask(domSession.page, hideIds)
      );
      try {
        const { data: domRgba } = timeHdrPhase(hdrPerf, "domPngDecodeMs", () => decodePng(domPng));
        const before = shouldLog ? countNonZeroRgb48(canvas) : 0;
        const alphaPixels = shouldLog ? countNonZeroAlpha(domRgba) : 0;
        timeHdrPhase(
          hdrPerf,
          "domBlitMs",
          () => blitRgba8OverRgb48le(domRgba, canvas, width, height, compositeTransfer)
        );
        if (shouldLog && debugDumpDir) {
          const after = countNonZeroRgb48(canvas);
          const dumpName = `frame_${String(debugFrameIndex).padStart(4, "0")}_layer_${String(layerIdx).padStart(2, "0")}_dom.png`;
          const dumpPath = join6(debugDumpDir, dumpName);
          writeFileExclusiveSync(dumpPath, domPng);
          log.info("[diag] dom layer blit", {
            frame: debugFrameIndex,
            layerIdx,
            layerIds: layer.elementIds,
            showIds,
            hideCount: hideIds.length,
            pngBytes: domPng.length,
            alphaPixels,
            pixelsAdded: after - before,
            totalNonZero: after,
            dumpPath
          });
        }
      } catch (err) {
        log.warn("DOM layer decode/blit failed; skipping overlay", {
          layerIds: layer.elementIds,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
  }
  if (shouldLog && debugDumpDir) {
    const finalNonZero = countNonZeroRgb48(canvas);
    log.info("[diag] compositeToBuffer end", {
      frame: debugFrameIndex,
      finalNonZeroPixels: finalNonZero,
      totalPixels: width * height,
      coverage: (finalNonZero / (width * height) * 100).toFixed(1) + "%"
    });
  }
}

// ../producer/src/services/render/stages/captureHdrResources.ts
import {
  closeSync as closeSync4,
  constants as constants2,
  fstatSync as fstatSync3,
  mkdirSync as mkdirSync2,
  mkdtempSync as mkdtempSync2,
  openSync as openSync3,
  readFileSync as readFileSync3,
  rmSync as rmSync4,
  statfsSync
} from "fs";
import { join as join7 } from "path";
var NO_FOLLOW_FLAG = constants2.O_NOFOLLOW ?? 0;
function tempDirSafePrefix(id) {
  const safe = id.replace(/[^A-Za-z0-9_.-]/g, "_").slice(0, 80);
  return safe || "video";
}
function planHdrResources(args) {
  const { composition, nativeHdrVideoIds, nativeHdrImageIds, projectDir, compiledDir } = args;
  const hdrVideoIds = composition.videos.filter((v) => nativeHdrVideoIds.has(v.id)).map((v) => v.id);
  const hdrVideoSrcPaths = /* @__PURE__ */ new Map();
  for (const v of composition.videos) {
    if (!hdrVideoIds.includes(v.id)) continue;
    hdrVideoSrcPaths.set(v.id, resolveProjectRelativeSrc(v.src, projectDir, compiledDir));
  }
  const hdrVideoStartTimes = /* @__PURE__ */ new Map();
  for (const v of composition.videos) {
    if (hdrVideoIds.includes(v.id)) hdrVideoStartTimes.set(v.id, v.start);
  }
  const hdrImageStartTimes = /* @__PURE__ */ new Map();
  for (const img of composition.images) {
    if (nativeHdrImageIds.has(img.id)) hdrImageStartTimes.set(img.id, img.start);
  }
  return {
    hdrVideoIds,
    hdrVideoSrcPaths,
    hdrVideoStartTimes,
    hdrImageStartTimes,
    hdrExtractionDims: /* @__PURE__ */ new Map(),
    hdrImageFitInfo: /* @__PURE__ */ new Map()
  };
}
async function probeHdrExtractionDims(args) {
  const { domSession, nativeHdrIds, nativeHdrImageIds, composition, prep } = args;
  const uniqueStartTimes = [
    .../* @__PURE__ */ new Set([...prep.hdrVideoStartTimes.values(), ...prep.hdrImageStartTimes.values()])
  ].sort((a, b) => a - b);
  for (const seekTime of uniqueStartTimes) {
    await domSession.page.evaluate((t) => {
      if (window.__hf && typeof window.__hf.seek === "function") window.__hf.seek(t);
    }, seekTime);
    if (domSession.onBeforeCapture) {
      await domSession.onBeforeCapture(domSession.page, seekTime);
    }
    const stacking = await queryElementStacking(domSession.page, nativeHdrIds);
    for (const el of stacking) {
      if (el.isHdr && el.layoutWidth > 0 && el.layoutHeight > 0 && !prep.hdrExtractionDims.has(el.id)) {
        prep.hdrExtractionDims.set(el.id, { width: el.layoutWidth, height: el.layoutHeight });
      }
      if (el.isHdr && nativeHdrImageIds.has(el.id) && !prep.hdrImageFitInfo.has(el.id)) {
        prep.hdrImageFitInfo.set(el.id, { fit: el.objectFit, position: el.objectPosition });
      }
    }
  }
  for (const [imageId, startTime] of prep.hdrImageStartTimes) {
    if (prep.hdrExtractionDims.has(imageId)) continue;
    const img = composition.images.find((i) => i.id === imageId);
    if (!img) continue;
    const duration = img.end - img.start;
    const retryTime = startTime + Math.min(0.5, duration * 0.1);
    await domSession.page.evaluate((t) => {
      if (window.__hf && typeof window.__hf.seek === "function") window.__hf.seek(t);
    }, retryTime);
    if (domSession.onBeforeCapture) {
      await domSession.onBeforeCapture(domSession.page, retryTime);
    }
    const retryStacking = await queryElementStacking(domSession.page, nativeHdrIds);
    for (const el of retryStacking) {
      if (el.id === imageId && el.isHdr && el.layoutWidth > 0 && el.layoutHeight > 0) {
        prep.hdrExtractionDims.set(el.id, { width: el.layoutWidth, height: el.layoutHeight });
        if (!prep.hdrImageFitInfo.has(el.id)) {
          prep.hdrImageFitInfo.set(el.id, { fit: el.objectFit, position: el.objectPosition });
        }
        break;
      }
    }
  }
}
function estimateHdrExtractionBytes(videos, fps) {
  let total = 0;
  for (const v of videos) {
    const frames = Math.ceil(Math.max(0, v.durationSeconds) * fps);
    total += frames * v.width * v.height * 6;
  }
  return total;
}
var HDR_EXTRACTION_HEADROOM_FRACTION = 0.9;
var HDR_EXTRACTION_CGROUP_BUDGET_FRACTION = 0.5;
var HDR_EXTRACTION_WARN_BYTES = 1e10;
var HDR_EXTRACTION_MAX_BYTES_ENV = "HDR_EXTRACTION_MAX_BYTES";
var BYTES_PER_MIB = 1024 * 1024;
var aggregateHdrExtractionReservedBytes = 0;
function resolveHdrExtractionBudgetBytes(raw, cgroupLimitMb = getCgroupMemoryLimitMb()) {
  let configuredBudget;
  if (raw !== void 0 && raw.trim() !== "") {
    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(`${HDR_EXTRACTION_MAX_BYTES_ENV} must be a positive finite byte count`);
    }
    configuredBudget = Math.floor(value);
  }
  const cgroupBudget = cgroupLimitMb !== null && Number.isFinite(cgroupLimitMb) && cgroupLimitMb > 0 ? Math.floor(cgroupLimitMb * BYTES_PER_MIB * HDR_EXTRACTION_CGROUP_BUDGET_FRACTION) : void 0;
  if (configuredBudget === void 0) return cgroupBudget;
  if (cgroupBudget === void 0) return configuredBudget;
  return Math.min(configuredBudget, cgroupBudget);
}
function resolveHdrExtractionActiveBudgetBytes(configuredBudgetBytes, freeBytes) {
  const diskBudgetBytes = Math.floor(freeBytes * HDR_EXTRACTION_HEADROOM_FRACTION);
  return configuredBudgetBytes === void 0 ? diskBudgetBytes : Math.min(configuredBudgetBytes, diskBudgetBytes);
}
function reserveHdrExtractionBytes(estimatedBytes, budgetBytes) {
  if (!Number.isFinite(estimatedBytes) || estimatedBytes < 0) {
    throw new Error(`HDR extraction reservation must be a finite non-negative byte count`);
  }
  const aggregateBytes = aggregateHdrExtractionReservedBytes + estimatedBytes;
  if (budgetBytes !== void 0 && aggregateBytes > budgetBytes) {
    throw new Error(
      `Concurrent HDR pre-extractions need ~${(aggregateBytes / 1e9).toFixed(1)} GB of raw 16-bit frame scratch, exceeding the active ${(budgetBytes / 1e9).toFixed(1)} GB budget.`
    );
  }
  aggregateHdrExtractionReservedBytes = aggregateBytes;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    aggregateHdrExtractionReservedBytes = Math.max(
      0,
      aggregateHdrExtractionReservedBytes - estimatedBytes
    );
  };
}
function resolveHdrExtractionWindow(video, compositionDuration, metadata) {
  if (!Number.isFinite(compositionDuration) || compositionDuration <= 0) {
    throw new Error(
      `Cannot extract HDR video "${video.id}" with invalid composition duration ${String(compositionDuration)}`
    );
  }
  const window2 = resolveVideoExtractionWindow(video, metadata, compositionDuration);
  if (!Number.isFinite(window2.durationSeconds)) {
    throw new Error(
      `HDR video "${video.id}" has no finite interval inside the ${compositionDuration}s composition`
    );
  }
  if (window2.durationSeconds <= 0) return null;
  if (!Number.isFinite(window2.mediaStart) || window2.mediaStart < 0) {
    throw new Error(`HDR video "${video.id}" has invalid mediaStart ${String(window2.mediaStart)}`);
  }
  return window2;
}
function cleanupHdrFrameDirectory(frameDir, rawPath, log) {
  if (process.env.KEEP_TEMP === "1") return;
  try {
    rmSync4(frameDir, { recursive: true, force: true });
  } catch (err) {
    log?.warn("Failed to clean up HDR raw frame directory", {
      frameDir,
      rawPath,
      error: err instanceof Error ? err.message : String(err)
    });
  }
}
function cleanupHdrVideoFrameSource(source, log) {
  closeHdrVideoFrameSource(source, log);
  cleanupHdrFrameDirectory(source.dir, source.rawPath, log);
}
function assertHdrExtractionDiskHeadroom(framesDir, plannedVideos, fps, log) {
  const estimatedBytes = estimateHdrExtractionBytes(plannedVideos, fps);
  const configuredBudget = resolveHdrExtractionBudgetBytes(
    process.env[HDR_EXTRACTION_MAX_BYTES_ENV]
  );
  const estimatedGb = (estimatedBytes / 1e9).toFixed(1);
  if (configuredBudget !== void 0 && estimatedBytes > configuredBudget) {
    throw new Error(
      `HDR pre-extraction needs ~${estimatedGb} GB of raw 16-bit frames, exceeding the active scratch budget of ${(configuredBudget / 1e9).toFixed(1)} GB. If the composition doesn't need HDR output, re-run with --sdr; otherwise reduce its HDR duration/resolution or use a render container with a larger memory limit.`
    );
  }
  let freeBytes;
  try {
    const stat = statfsSync(framesDir);
    freeBytes = stat.bavail * stat.bsize;
  } catch {
    return { estimatedBytes, budgetBytes: configuredBudget };
  }
  const diskBudgetBytes = Math.floor(freeBytes * HDR_EXTRACTION_HEADROOM_FRACTION);
  if (estimatedBytes > diskBudgetBytes) {
    throw new Error(
      `HDR pre-extraction needs ~${estimatedGb} GB of raw 16-bit frames but only ${(freeBytes / 1e9).toFixed(1)} GB is free at ${framesDir}. If the composition doesn't need HDR output, re-run with --sdr; otherwise free up disk space and retry.`
    );
  }
  if (estimatedBytes > HDR_EXTRACTION_WARN_BYTES) {
    log.warn(
      `HDR pre-extraction will write ~${estimatedGb} GB of raw 16-bit frames (pass --sdr to skip if HDR output isn't needed)`,
      { estimatedBytes, freeBytes }
    );
  }
  return {
    estimatedBytes,
    budgetBytes: resolveHdrExtractionActiveBudgetBytes(configuredBudget, freeBytes)
  };
}
async function extractHdrVideoFrames(args) {
  const { job, log, framesDir, composition, prep, width, height, abortSignal, hdrDiagnostics } = args;
  const runFfmpegImpl = args.runFfmpegImpl ?? runFfmpeg;
  const extractMediaMetadataImpl = args.extractMediaMetadataImpl ?? extractMediaMetadata;
  const resolveFinalFrameExtractionWindowImpl = args.resolveFinalFrameExtractionWindowImpl ?? resolveFinalFrameExtractionWindow;
  const out = /* @__PURE__ */ new Map();
  mkdirSync2(framesDir, { recursive: true });
  const plannedVideos = [];
  const extractionWindows = /* @__PURE__ */ new Map();
  for (const [videoId, srcPath] of prep.hdrVideoSrcPaths) {
    const video = composition.videos.find((v) => v.id === videoId);
    if (!video) continue;
    const dims = prep.hdrExtractionDims.get(videoId) ?? { width, height };
    const metadata = await extractMediaMetadataImpl(srcPath);
    const initialWindow = resolveHdrExtractionWindow(video, composition.duration, metadata);
    if (!initialWindow) continue;
    const window2 = await resolveFinalFrameExtractionWindowImpl(
      srcPath,
      video,
      metadata,
      initialWindow,
      abortSignal
    );
    extractionWindows.set(videoId, window2);
    prep.hdrVideoStartTimes.set(videoId, window2.compositionStart);
    plannedVideos.push({
      durationSeconds: window2.durationSeconds,
      width: dims.width,
      height: dims.height
    });
  }
  const { estimatedBytes, budgetBytes } = assertHdrExtractionDiskHeadroom(
    framesDir,
    plannedVideos,
    fpsToNumber(job.config.fps),
    log
  );
  const releaseReservation = reserveHdrExtractionBytes(estimatedBytes, budgetBytes);
  const createdFrameDirs = /* @__PURE__ */ new Set();
  try {
    for (const [videoId, srcPath] of prep.hdrVideoSrcPaths) {
      const video = composition.videos.find((v) => v.id === videoId);
      const window2 = extractionWindows.get(videoId);
      if (!video || !window2) continue;
      mkdirSync2(framesDir, { recursive: true });
      const frameDir = mkdtempSync2(join7(framesDir, `hdr_${tempDirSafePrefix(videoId)}-`));
      createdFrameDirs.add(frameDir);
      const dims = prep.hdrExtractionDims.get(videoId) ?? { width, height };
      const rawPath = join7(frameDir, "frames.rgb48le");
      const extractionStart = String(window2.extractionMediaStart ?? window2.mediaStart);
      const ffmpegArgs = [];
      if (window2.finalFrameOnly) {
        ffmpegArgs.push("-i", srcPath, "-ss", extractionStart, "-frames:v", "1");
      } else {
        ffmpegArgs.push(
          "-ss",
          extractionStart,
          "-i",
          srcPath,
          "-t",
          String(window2.durationSeconds)
        );
      }
      if (!window2.finalFrameOnly) {
        ffmpegArgs.push("-r", fpsToFfmpegArg(job.config.fps));
      }
      ffmpegArgs.push(
        "-vf",
        `scale=${dims.width}:${dims.height}:force_original_aspect_ratio=increase,crop=${dims.width}:${dims.height}`,
        "-pix_fmt",
        "rgb48le",
        "-f",
        "rawvideo",
        "-y",
        rawPath
      );
      const result = await runFfmpegImpl(ffmpegArgs, { signal: abortSignal });
      if (!result.success) {
        hdrDiagnostics.videoExtractionFailures += 1;
        log.error("HDR frame pre-extraction failed; aborting render", {
          videoId,
          srcPath,
          stderr: result.stderr.slice(-400)
        });
        throw encoderFailureError(`HDR frame extraction failed for video "${videoId}"`, {
          error: `Aborting render to avoid shipping black HDR layers: ${result.stderr.slice(-400)}`,
          failureReason: result.failureReason
        });
      }
      const frameSize = dims.width * dims.height * 6;
      const fd = openSync3(rawPath, constants2.O_RDONLY | NO_FOLLOW_FLAG);
      let handedOff = false;
      try {
        const frameCount = Math.floor(fstatSync3(fd).size / frameSize);
        if (frameCount < 1) {
          hdrDiagnostics.videoExtractionFailures += 1;
          throw new Error(
            `HDR frame extraction produced no frames for video "${videoId}". Aborting render to avoid shipping black HDR layers.`
          );
        }
        out.set(videoId, {
          dir: frameDir,
          rawPath,
          fd,
          width: dims.width,
          height: dims.height,
          frameSize,
          frameCount,
          scratch: Buffer.allocUnsafe(frameSize),
          loop: video.loop
        });
        handedOff = true;
      } finally {
        if (!handedOff) closeSync4(fd);
      }
    }
    return { sources: out, estimatedBytes, releaseReservation };
  } catch (error) {
    for (const source of out.values()) {
      cleanupHdrVideoFrameSource(source, log);
      createdFrameDirs.delete(source.dir);
    }
    for (const frameDir of createdFrameDirs) {
      cleanupHdrFrameDirectory(frameDir, void 0, log);
    }
    releaseReservation();
    throw error;
  }
}
function decodeHdrImageBuffers(args) {
  const { log, hdrImageSrcPaths, prep, hdrDiagnostics } = args;
  const out = /* @__PURE__ */ new Map();
  for (const [imageId, srcPath] of hdrImageSrcPaths) {
    try {
      const decoded = decodePngToRgb48le(readFileSync3(srcPath));
      const layout = prep.hdrExtractionDims.get(imageId);
      const fitInfo = prep.hdrImageFitInfo.get(imageId);
      if (layout && (layout.width !== decoded.width || layout.height !== decoded.height)) {
        const fit = normalizeObjectFit(fitInfo?.fit);
        const resampled = resampleRgb48leObjectFit(
          decoded.data,
          decoded.width,
          decoded.height,
          layout.width,
          layout.height,
          fit,
          fitInfo?.position
        );
        out.set(imageId, { data: resampled, width: layout.width, height: layout.height });
      } else {
        out.set(imageId, {
          data: Buffer.from(decoded.data),
          width: decoded.width,
          height: decoded.height
        });
      }
    } catch (err) {
      hdrDiagnostics.imageDecodeFailures += 1;
      log.error("HDR image decode failed; aborting render", {
        imageId,
        srcPath,
        error: err instanceof Error ? err.message : String(err)
      });
      throw new Error(
        `HDR image decode failed for image "${imageId}". Aborting render to avoid shipping missing HDR image layers.`
      );
    }
  }
  return out;
}

// ../producer/src/services/render/stages/captureHdrFrameShared.ts
function shouldUseHybridLayeredPath(args) {
  if (args.hasHdrContent) return false;
  if (args.workerCount <= 1) return false;
  if (args.totalFrames <= 0) return false;
  if (args.transitionFramesCount >= args.totalFrames) return false;
  return true;
}
function distributeLayeredHybridFrameRanges(totalFrames, workerCount) {
  const safeWorkers = Math.max(1, workerCount);
  const safeFrames = Math.max(0, totalFrames);
  const framesPerWorker = Math.max(1, Math.ceil(safeFrames / safeWorkers));
  const ranges = [];
  for (let w = 0; w < safeWorkers; w++) {
    const start = Math.min(safeFrames, w * framesPerWorker);
    const end = Math.min(safeFrames, start + framesPerWorker);
    ranges.push({ start, end });
  }
  return ranges;
}
function partitionTransitionFrames(transitionRanges, totalFrames) {
  const frames = /* @__PURE__ */ new Set();
  if (totalFrames <= 0) return frames;
  for (const range of transitionRanges) {
    const start = Math.max(0, range.startFrame);
    const end = Math.min(totalFrames - 1, range.endFrame);
    for (let i = start; i <= end; i++) frames.add(i);
  }
  return frames;
}
async function seekAndInject(page, time, beforeCaptureHook, hdrPerf, seekKey, injectKey) {
  await timeHdrPhaseAsync(
    hdrPerf,
    seekKey,
    () => page.evaluate((t) => {
      if (window.__hf && typeof window.__hf.seek === "function") window.__hf.seek(t);
    }, time)
  );
  if (beforeCaptureHook) {
    await timeHdrPhaseAsync(hdrPerf, injectKey, () => beforeCaptureHook(page, time));
  }
}
async function seekInjectAndQueryStacking(page, time, beforeCaptureHook, nativeHdrIds, hdrPerf, seekKey, injectKey, stackingKey) {
  await seekAndInject(page, time, beforeCaptureHook, hdrPerf, seekKey, injectKey);
  return timeHdrPhaseAsync(hdrPerf, stackingKey, () => queryElementStacking(page, nativeHdrIds));
}
async function captureSceneIntoBuffer(a) {
  const {
    session,
    sceneBuf,
    sceneIds,
    stackingInfo,
    time,
    width,
    height,
    nativeHdrIds,
    nativeHdrImageIds,
    beforeCaptureHook,
    hdrCompositeCtx,
    compositeTransfer,
    hdrTargetTransfer,
    hdrPerf,
    log,
    frameIdx
  } = a;
  await seekAndInject(
    session.page,
    time,
    beforeCaptureHook,
    hdrPerf,
    "domLayerSeekMs",
    "domLayerInjectMs"
  );
  for (const el of stackingInfo) {
    if (!el.isHdr || !sceneIds.has(el.id)) continue;
    if (nativeHdrImageIds.has(el.id)) {
      blitHdrImageLayer(
        sceneBuf,
        el,
        hdrCompositeCtx.hdrImageBuffers,
        hdrCompositeCtx.hdrImageTransferCache,
        width,
        height,
        log,
        hdrCompositeCtx.imageTransfers.get(el.id),
        hdrTargetTransfer,
        hdrPerf
      );
    } else {
      blitHdrVideoLayer(
        sceneBuf,
        el,
        time,
        hdrCompositeCtx.fps,
        hdrCompositeCtx.hdrVideoFrameSources,
        hdrCompositeCtx.hdrVideoStartTimes,
        width,
        height,
        log,
        hdrCompositeCtx.videoTransfers.get(el.id),
        hdrTargetTransfer,
        hdrPerf
      );
    }
  }
  const showIds = selectDomLayerShowIds(Array.from(sceneIds), stackingInfo);
  const hideIds = stackingInfo.map((e) => e.id).filter((id) => !sceneIds.has(id) || nativeHdrIds.has(id));
  if (showIds.length === 0) return;
  if (hdrPerf) hdrPerf.domLayerCaptures += 1;
  await timeHdrPhaseAsync(
    hdrPerf,
    "domMaskApplyMs",
    () => applyDomLayerMask(session.page, showIds, hideIds)
  );
  const domPng = await timeHdrPhaseAsync(
    hdrPerf,
    "domScreenshotMs",
    () => captureAlphaPng(session.page, width, height)
  );
  await timeHdrPhaseAsync(
    hdrPerf,
    "domMaskRemoveMs",
    () => removeDomLayerMask(session.page, hideIds)
  );
  try {
    const { data: domRgba } = timeHdrPhase(hdrPerf, "domPngDecodeMs", () => decodePng(domPng));
    timeHdrPhase(
      hdrPerf,
      "domBlitMs",
      () => blitRgba8OverRgb48le(domRgba, sceneBuf, width, height, compositeTransfer)
    );
  } catch (err) {
    log.warn("DOM layer decode/blit failed; skipping overlay for transition scene", {
      frameIndex: frameIdx,
      sceneIds: Array.from(sceneIds),
      error: err instanceof Error ? err.message : String(err)
    });
  }
}
async function captureTransitionFrameOnWorker(a) {
  const {
    session,
    frameIdx,
    time,
    transition,
    buffers,
    nativeHdrIds,
    nativeHdrImageIds,
    sceneElements,
    hdrCompositeCtx,
    width,
    height,
    compositeTransfer,
    hdrTargetTransfer,
    hdrPerf,
    log
  } = a;
  const beforeCaptureHook = session.onBeforeCapture;
  if (hdrPerf) {
    hdrPerf.frames += 1;
    hdrPerf.transitionFrames += 1;
  }
  const stackingInfo = await seekInjectAndQueryStacking(
    session.page,
    time,
    beforeCaptureHook,
    nativeHdrIds,
    hdrPerf,
    "frameSeekMs",
    "frameInjectMs",
    "stackingQueryMs"
  );
  const sceneAIds = new Set(sceneElements[transition.fromScene] ?? []);
  const sceneBIds = new Set(sceneElements[transition.toScene] ?? []);
  buffers.bufferA.fill(0);
  buffers.bufferB.fill(0);
  const sceneCaptures = [
    [buffers.bufferA, sceneAIds],
    [buffers.bufferB, sceneBIds]
  ];
  for (const [sceneBuf, sceneIds] of sceneCaptures) {
    await captureSceneIntoBuffer({
      session,
      sceneBuf,
      sceneIds,
      stackingInfo,
      time,
      width,
      height,
      nativeHdrIds,
      nativeHdrImageIds,
      beforeCaptureHook,
      hdrCompositeCtx,
      compositeTransfer,
      hdrTargetTransfer,
      hdrPerf,
      log,
      frameIdx
    });
  }
}
function ensureFrameWritten(frameWritten, frameIndex, encoder) {
  if (frameWritten) return;
  const reason = encoder?.getExitError();
  const base = `Streaming encoder exited before frame ${frameIndex} was written`;
  throw encoderFailureError(base, {
    error: reason,
    failureReason: encoder?.getExitFailureReason?.()
  });
}
function cleanupEndedHdrVideos(args) {
  if (process.env.KEEP_TEMP === "1") return;
  const {
    time,
    activeTransition,
    hdrVideoEndTimes,
    cleanedUpVideos,
    hdrVideoFrameSources,
    sceneElements,
    log
  } = args;
  for (const [videoId, endTime] of hdrVideoEndTimes) {
    if (time > endTime && !cleanedUpVideos.has(videoId)) {
      const stillNeeded = activeTransition && (sceneElements[activeTransition.fromScene]?.includes(videoId) || sceneElements[activeTransition.toScene]?.includes(videoId));
      if (!stillNeeded) {
        const frameSource = hdrVideoFrameSources.get(videoId);
        if (frameSource) {
          cleanupHdrVideoFrameSource(frameSource, log);
          hdrVideoFrameSources.delete(videoId);
        }
        cleanedUpVideos.add(videoId);
      }
    }
  }
}

// ../producer/src/services/render/segmentPlan.ts
var DEFAULT_SEGMENT_FRAMES = 3e3;
var MIN_SEGMENT_FRAMES = 30;
function assertPositiveInteger(name, value) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`[segmentPlan] ${name} must be a positive integer (got ${String(value)})`);
  }
}
function planSegments(totalFrames, segmentFrames) {
  assertPositiveInteger("totalFrames", totalFrames);
  assertPositiveInteger("segmentFrames", segmentFrames);
  const slices = [];
  for (let start = 0, index = 0; start < totalFrames; start += segmentFrames, index += 1) {
    slices.push({
      index,
      startFrame: start,
      endFrame: Math.min(totalFrames, start + segmentFrames)
    });
  }
  return slices;
}
function resolveSegmentFrames(env) {
  const raw = env.HF_SEGMENT_FRAMES;
  if (raw === void 0 || raw.trim() === "") return DEFAULT_SEGMENT_FRAMES;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed)) return DEFAULT_SEGMENT_FRAMES;
  return Math.max(MIN_SEGMENT_FRAMES, parsed);
}

// ../producer/src/services/render/segmentQueue.ts
function createSegmentQueue(slices) {
  let cursor = 0;
  return {
    next: () => slices[cursor++],
    remaining: () => Math.max(0, slices.length - cursor)
  };
}

// ../producer/src/services/render/segmentRecycle.ts
var DEFAULT_SEGMENT_BROWSER_RECYCLE = 3;
function resolveSegmentBrowserRecycle(env) {
  const raw = env.HF_SEGMENT_BROWSER_RECYCLE;
  if (raw === void 0 || raw.trim() === "") return DEFAULT_SEGMENT_BROWSER_RECYCLE;
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : DEFAULT_SEGMENT_BROWSER_RECYCLE;
}
var TARGET_LOSS_PATTERNS = [/target closed/i, /detached frame/i, /session closed/i];
function isTargetLossError(error) {
  if (!(error instanceof Error)) return false;
  return TARGET_LOSS_PATTERNS.some((re) => re.test(error.message));
}

// ../producer/src/services/render/stages/captureStreamingStage.ts
import { mkdtemp, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join as join8 } from "path";

// ../producer/src/services/render/perfSummary.ts
import { arch, cpus, platform, totalmem } from "os";
function worstSubTimelineWaitOutcome(perfs) {
  const outcomes = perfs.map((p) => p.subTimelineWaitOutcome).filter((o) => !!o);
  if (outcomes.length === 0) return void 0;
  if (outcomes.includes("script_failure")) return "script_failure";
  if (outcomes.includes("timeout")) return "timeout";
  return "ready";
}
function pushWorkerDedupPerfs(results, sink) {
  for (const r of results) {
    if (r.perf) sink.push(r.perf);
  }
}
function roundDb(value) {
  return value === void 0 ? void 0 : Math.round(Math.min(value, 999) * 10) / 10;
}
function aggregateDrawElement(perfs, de) {
  if (perfs.length === 0) return void 0;
  const modes = [...new Set(perfs.map((p) => p.captureMode).filter(Boolean))].sort();
  const gateReasons = [
    ...new Set(perfs.map((p) => p.deGateReason).filter((r) => !!r))
  ].sort();
  const gpuRenderers = [
    ...new Set(perfs.map((p) => p.gpuRenderer).filter((r) => !!r))
  ].sort();
  const drain = de.drainStats;
  return {
    mode: modes.join("|") || "unknown",
    compileGate: de.compileGate,
    clampReason: de.clampReason,
    workerInversion: de.workerInversion ?? "none",
    preInversionWorkers: de.preInversionWorkers,
    compositionElementCount: de.compositionElementCount,
    compositionElementCountSource: de.compositionElementCountSource,
    compositionElementTags: de.compositionElementTags,
    arollVideoCount: de.arollVideoCount,
    heygenVideoCount: de.heygenVideoCount,
    adaptersUsed: de.adaptersUsed,
    audioCount: de.audioCount,
    imageCount: de.imageCount,
    subCompositionCount: de.subCompositionCount,
    audioGroupCount: de.audioGroupCount,
    colorGradingCount: de.colorGradingCount,
    hasLut: de.hasLut,
    rootBodyMismatch: de.rootBodyMismatch,
    rootBodyDeltaPxBucket: de.rootBodyDeltaPxBucket,
    vfxHostCount: de.vfxHostCount,
    vfxCapture: de.vfxCapture,
    vfxTypes: de.vfxTypes,
    shortBand: de.shortBand,
    parallelRouter: de.parallelRouter ?? "none",
    preRouterWorkers: de.preRouterWorkers,
    gateReason: gateReasons.length > 0 ? gateReasons.join("|") : void 0,
    gpuRenderer: gpuRenderers.length > 0 ? gpuRenderers.join("|") : void 0,
    workerEncode: perfs.some((p) => p.deWorkerEncode),
    verifyArmed: perfs.reduce((sum, p) => sum + (p.deVerifyArmed ?? 0), 0),
    verifyChecked: drain?.verifyChecked ?? 0,
    verifyMinDb: roundDb(drain?.verifyMinDb),
    verifyInitMs: perfs.reduce((sum, p) => sum + (p.deVerifyInitMs ?? 0), 0),
    selfVerifyFallback: de.selfVerifyFallback,
    fallbackReason: de.fallbackReason,
    fallbackFailedDb: roundDb(de.fallbackFailedDb),
    fallbackFrameIndex: de.fallbackFrameIndex,
    fallbackThresholdDb: roundDb(de.fallbackThresholdDb),
    blankSuspects: drain?.blankSuspects ?? 0,
    blankDeterministicAccepts: drain?.blankDeterministicAccepts ?? 0,
    blankRecaptures: drain?.blankRecaptures ?? 0,
    boundaryFrames: perfs.reduce((sum, p) => sum + (p.deBoundaryFrames ?? 0), 0),
    ncprFallbacks: perfs.reduce((sum, p) => sum + (p.deNcprFallbacks ?? 0), 0),
    frameTimeouts: perfs.reduce((sum, p) => sum + (p.deFrameTimeouts ?? 0), 0)
  };
}
function maxDefined(values) {
  const present = values.filter((v) => typeof v === "number");
  return present.length > 0 ? Math.max(...present) : void 0;
}
function aggregateChromeMemory(perfs) {
  const sampled = perfs.filter((p) => (p.chromeMemorySamples ?? 0) > 0);
  if (sampled.length === 0) return void 0;
  return {
    browserRssPeakMb: maxDefined(sampled.map((p) => p.chromeBrowserRssPeakMb)),
    rendererRssPeakMb: maxDefined(sampled.map((p) => p.chromeRendererRssPeakMb)),
    // Last samples are per session; summing approximates the whole fleet's
    // footprint at the end of capture (workers run concurrently).
    rssLastMb: sampled.reduce((sum, p) => sum + (p.chromeRssLastMb ?? 0), 0),
    gpuProcessSeenLastSample: sampled.some((p) => p.chromeGpuProcessSeenLastSample === true),
    samples: sampled.reduce((sum, p) => sum + (p.chromeMemorySamples ?? 0), 0)
  };
}
function aggregateDedup(perfs) {
  if (perfs.length === 0) return void 0;
  const armed = perfs.some((p) => p.staticDedupArmed);
  const skipReasons = armed ? [] : [
    ...new Set(perfs.map((p) => p.staticDedupSkipReason).filter((r) => !!r))
  ].sort();
  const verificationPerfs = perfs.filter((perf) => perf.staticDedupVerificationOutcome);
  const verificationOutcomes = [
    ...new Set(
      verificationPerfs.map((perf) => perf.staticDedupVerificationOutcome).filter((outcome) => outcome != null)
    )
  ].sort();
  return {
    enabled: perfs.some((p) => p.staticDedupEnabled),
    armed,
    predictedFrames: perfs.reduce((sum, p) => sum + (p.staticDedupPredicted ?? 0), 0),
    reusedFrames: perfs.reduce((sum, p) => sum + (p.staticDedupReused ?? 0), 0),
    skipReason: skipReasons.length > 0 ? skipReasons.join("|") : void 0,
    ...verificationPerfs.length === 0 ? {} : {
      verifiedFrames: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerified ?? 0),
        0
      ),
      verificationOutcomes,
      plannedRuns: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerificationPlannedRuns ?? 0),
        0
      ),
      completedRuns: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerificationCompletedRuns ?? 0),
        0
      ),
      screenshots: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerificationScreenshots ?? 0),
        0
      ),
      seeks: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerificationSeeks ?? 0),
        0
      ),
      comparisons: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerificationComparisons ?? 0),
        0
      ),
      verificationElapsedMs: verificationPerfs.reduce(
        (sum, perf) => sum + (perf.staticDedupVerificationElapsedMs ?? 0),
        0
      )
    }
  };
}
function aggregateBeginFrameReuse(perfs) {
  const noDamageFrames = perfs.reduce((sum, p) => sum + (p.beginFrameNoDamage ?? 0), 0);
  const hasDamageFrames = perfs.reduce((sum, p) => sum + (p.beginFrameHasDamage ?? 0), 0);
  if (noDamageFrames + hasDamageFrames === 0) return void 0;
  return { noDamageFrames, hasDamageFrames };
}
function buildRenderPerfSummary(input) {
  return {
    renderId: input.job.id,
    totalElapsedMs: input.totalElapsedMs,
    // RenderPerfSummary surfaces fps as a decimal because it lands in JSON
    // payloads (CLI telemetry, regression-harness reports) where a single
    // number is friendlier than `{num,den}`. Callers needing the rational
    // back can read `job.config.fps`.
    fps: fpsToNumber(input.job.config.fps),
    quality: input.job.config.quality,
    workers: input.workerCount,
    workerSizing: input.workerSizing,
    chunkedEncode: input.enableChunkedEncode,
    chunkSizeFrames: input.enableChunkedEncode ? input.chunkedEncodeSize : null,
    compositionDurationSeconds: input.compositionDurationSeconds,
    totalFrames: input.totalFrames,
    resolution: { width: input.outputWidth, height: input.outputHeight },
    videoCount: input.videoCount,
    audioCount: input.audioCount,
    stages: input.perfStages,
    videoExtractBreakdown: input.videoExtractBreakdown,
    tmpPeakBytes: input.tmpPeakBytes,
    captureCalibration: input.captureCalibration ? {
      sampledFrames: input.captureCalibration.samples.map((sample) => sample.frameIndex),
      p95Ms: input.captureCalibration.estimate.p95Ms,
      multiplier: input.captureCalibration.estimate.multiplier,
      reasons: input.captureCalibration.estimate.reasons
    } : void 0,
    captureAttempts: input.captureAttempts.length > 0 ? input.captureAttempts : void 0,
    hdrDiagnostics: input.hdrDiagnostics.videoExtractionFailures > 0 || input.hdrDiagnostics.imageDecodeFailures > 0 ? { ...input.hdrDiagnostics } : void 0,
    hdrPerf: input.hdrPerf ? finalizeHdrPerf(input.hdrPerf) : void 0,
    observability: input.observability,
    captureAvgMs: input.totalFrames > 0 ? Math.round(
      (input.perfStages.captureFrameMs ?? input.perfStages.captureMs ?? 0) / input.totalFrames
    ) : void 0,
    subTimelineWait: worstSubTimelineWaitOutcome(input.dedupPerfs),
    captureP50Ms: (() => {
      const withSamples = input.dedupPerfs.filter((p) => (p.p50TotalMs ?? 0) > 0);
      if (withSamples.length === 0) return void 0;
      return withSamples.reduce((a, b) => b.frames > a.frames ? b : a).p50TotalMs;
    })(),
    peakRssMb: Math.round(input.peakRssBytes / (1024 * 1024)),
    peakHeapUsedMb: Math.round(input.peakHeapUsedBytes / (1024 * 1024)),
    staticDedup: aggregateDedup(input.dedupPerfs),
    chromeMemory: aggregateChromeMemory(input.dedupPerfs),
    beginFrameReuse: aggregateBeginFrameReuse(input.dedupPerfs),
    drawElement: aggregateDrawElement(
      input.dedupPerfs,
      input.drawElement ?? { selfVerifyFallback: false }
    ),
    host: {
      platform: platform(),
      arch: arch(),
      cpuCount: cpus().length,
      totalMemMb: Math.round(totalmem() / (1024 * 1024)),
      nodeVersion: process.version,
      gpuDisabled: input.gpuDisabled
    }
  };
}

// ../producer/src/services/render/stages/captureStreamingStage.ts
var DEFAULT_CAPTURE_STALL_MS = 6e4;
var DE_STALL_POLL_MS = 5e3;
var ParallelCaptureStallError = class extends Error {
  variant;
  constructor(args) {
    const phases = args.phaseSummary ? ` Last worker phases: ${args.phaseSummary}.` : "";
    super(
      args.variant === "drain" ? `[Render] Parallel ${args.captureLabel} capture stalled: no frame progress for ${args.stallTimeoutMs}ms (stuck at ${args.lastCapturedFrames}/${args.totalFrames}).${phases}` : `[Render] Parallel ${args.captureLabel} capture stalled after ${args.stallTimeoutMs}ms with no frame progress (last frame ${args.lastCapturedFrames}/${args.totalFrames}); retrying on a fresh screenshot session.${phases}`
    );
    this.name = "ParallelCaptureStallError";
    this.variant = args.variant;
  }
};
function resolveCaptureStallTimeoutMs() {
  const raw = process.env.HF_DE_STALL_MS ?? process.env.HF_DE_PARALLEL_STALL_MS;
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CAPTURE_STALL_MS;
}
function captureModeLabel(mode) {
  if (mode === "drawelement") return "drawElement";
  if (mode === "beginframe") return "BeginFrame";
  return "screenshot";
}
var SequentialCaptureStallError = class extends Error {
  captureMode;
  constructor(captureMode, stallTimeoutMs, frameIndex, totalFrames) {
    super(
      `[Render] Sequential ${captureModeLabel(captureMode)} capture stalled: no frame progress for ${stallTimeoutMs}ms (stuck at frame ${frameIndex}/${totalFrames}).`
    );
    this.name = "SequentialCaptureStallError";
    this.captureMode = captureMode;
  }
};
function raceAgainstStall(promise, deadlineMs, input, signal) {
  return new Promise((resolve11, reject) => {
    const timer = setTimeout(
      () => {
        reject(
          signal?.aborted ? new Error(
            `[Render] Sequential ${captureModeLabel(input.captureMode)} capture aborted while a capture call was in flight (frame ${input.frameIndex}/${input.totalFrames}).`
          ) : new SequentialCaptureStallError(
            input.captureMode,
            input.stallTimeoutMs,
            input.frameIndex,
            input.totalFrames
          )
        );
      },
      Math.max(0, deadlineMs)
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve11(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}
function createDrainFrameGuard(args) {
  const { log, stats, frameTime } = args;
  const verifyMinDb = resolveDeVerifyMinDb();
  const rawEnv = process.env.HF_DE_VERIFY_MIN_DB;
  if (rawEnv !== void 0 && Number(rawEnv) !== verifyMinDb) {
    log.warn(`[Render] HF_DE_VERIFY_MIN_DB out of range [10,60]; using ${verifyMinDb}`, {
      raw: rawEnv
    });
  }
  const sizes = [];
  let absFloor = 2e4;
  const blankFloor = () => {
    if (sizes.length < 12) return 0;
    const sorted = [...sizes].sort((x, y) => x - y);
    const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
    return Math.max(absFloor, median * 0.12);
  };
  let acceptedSmall = null;
  return async (session, idx, buf) => {
    if (process.env.HF_FORCE_DRAWELEMENT !== "1") {
      const floor = blankFloor();
      if (floor > 0 && buf.length < floor && acceptedSmall?.equals(buf)) {
        stats.blankSuspects += 1;
        stats.blankDeterministicAccepts += 1;
      } else if (floor > 0 && buf.length < floor) {
        stats.blankSuspects += 1;
        stats.blankRecaptures += 1;
        log.warn("[Render] drawElement blank-frame suspect; re-capturing", {
          frame: idx,
          bytes: buf.length,
          floor: Math.round(floor)
        });
        let retryBuf;
        try {
          retryBuf = await recaptureDrawElementFrameForVerify(session, idx, frameTime(idx));
        } catch (err) {
          throw new DrawElementVerificationError(
            `blank drawElement frame ${idx}: ${buf.length}B < floor ${Math.round(floor)}B and recapture failed (${err instanceof Error ? err.message : String(err)})`,
            { kind: "blank", frameIndex: idx }
          );
        }
        if (retryBuf.equals(buf)) {
          stats.blankDeterministicAccepts += 1;
          log.info("[Render] drawElement small frame is deterministic; accepted", {
            frame: idx,
            bytes: buf.length
          });
          absFloor = Math.min(absFloor, Math.floor(buf.length / 2));
          acceptedSmall = buf;
        } else if (retryBuf.length < floor) {
          throw new DrawElementVerificationError(
            `blank drawElement frame ${idx}: ${buf.length}B (retry ${retryBuf.length}B) < floor ${Math.round(floor)}B`,
            { kind: "blank", frameIndex: idx }
          );
        } else {
          buf = retryBuf;
        }
      }
      sizes.push(buf.length);
      if (sizes.length > 60) sizes.shift();
    }
    const truth = session.deVerifyFrames?.get(idx);
    if (truth) {
      let db;
      try {
        db = await psnrDb(buf, truth);
      } catch (err) {
        log.warn("[Render] drawElement self-verify sample skipped (psnr infrastructure)", {
          frame: idx,
          error: err instanceof Error ? err.message : String(err)
        });
        return buf;
      }
      if (db < verifyMinDb) {
        const dumpDir = await mkdtemp(join8(tmpdir(), "hf-de-verify-fail-")).catch(() => null);
        if (dumpDir) {
          await Promise.all([
            writeFile(join8(dumpDir, `frame-${idx}-de.jpg`), buf),
            writeFile(join8(dumpDir, `frame-${idx}-truth.jpg`), truth)
          ]).catch(() => {
          });
        }
        throw new DrawElementVerificationError(
          `drawElement self-verify failed at frame ${idx}: ${db.toFixed(1)}dB < ${verifyMinDb}dB vs pre-injection screenshot${dumpDir ? ` (pair: ${dumpDir})` : ""}`,
          { kind: "psnr", frameIndex: idx, failedDb: db, verifyThresholdDb: verifyMinDb }
        );
      }
      stats.verifyChecked += 1;
      stats.verifyMinDb = stats.verifyMinDb === void 0 ? db : Math.min(stats.verifyMinDb, db);
      log.info("[Render] drawElement self-verify passed", {
        frame: idx,
        psnrDb: db === Infinity ? "inf" : Number(db.toFixed(1))
      });
    }
    return buf;
  };
}
async function runWorkerEncodePipelineLoop(session, totalFrames, job, currentEncoder, reorderBuffer, assertNotAborted, onProgress, log, stats, abortSignal) {
  let prev = null;
  const frameTime = (i) => i * job.config.fps.den / job.config.fps.num;
  const guard = createDrainFrameGuard({ log, stats, frameTime });
  const guardFrame = (idx, buf) => guard(session, idx, buf);
  const stallTimeoutMs = resolveCaptureStallTimeoutMs();
  let lastProgressAt = Date.now();
  const captureWithStallGuard = (idx, promise) => raceAgainstStall(
    promise,
    stallTimeoutMs - (Date.now() - lastProgressAt),
    { captureMode: session.captureMode, frameIndex: idx, totalFrames, stallTimeoutMs },
    abortSignal
  );
  const drainPrev = async () => {
    if (!prev) return;
    assertNotAborted();
    const buf = await guardFrame(prev.idx, await prev.encodeResult);
    await reorderBuffer.waitForFrame(prev.idx);
    ensureFrameWritten(await currentEncoder.writeFrame(buf), prev.idx, currentEncoder);
    reorderBuffer.advanceTo(prev.idx + 1);
    job.framesRendered = prev.idx + 1;
    lastProgressAt = Date.now();
    reportFrameProgress(
      job,
      `Streaming frame ${prev.idx + 1}/${totalFrames}`,
      Math.round(25 + (prev.idx + 1) / totalFrames * 55),
      onProgress,
      prev.idx + 1,
      totalFrames
    );
  };
  const batchNRaw = Number(process.env.HF_DE_BATCH ?? "4");
  const batchN = Number.isFinite(batchNRaw) ? Math.floor(batchNRaw) : 4;
  const drainBatch = async (batch) => {
    for (const item of batch) {
      assertNotAborted();
      const buf = await guardFrame(item.idx, await item.encodeResult);
      await reorderBuffer.waitForFrame(item.idx);
      ensureFrameWritten(await currentEncoder.writeFrame(buf), item.idx, currentEncoder);
      reorderBuffer.advanceTo(item.idx + 1);
      job.framesRendered = item.idx + 1;
      lastProgressAt = Date.now();
      reportFrameProgress(
        job,
        `Streaming frame ${item.idx + 1}/${totalFrames}`,
        Math.round(25 + (item.idx + 1) / totalFrames * 55),
        onProgress,
        item.idx + 1,
        totalFrames
      );
    }
  };
  if (batchN > 1 && !session.onBeforeCapture) {
    const boundarySS = process.env.HF_FAST_CAPTURE_BOUNDARY_SS === "true";
    const batchable = (f) => !session.staticFrames?.has(f) && !(boundarySS && session.clipBoundaryFrames?.has(f));
    let prevBatch = [];
    let i = 0;
    while (i < totalFrames) {
      assertNotAborted();
      if (batchable(i)) {
        const idxs = [];
        while (idxs.length < batchN && i < totalFrames && batchable(i)) {
          idxs.push(i);
          i++;
        }
        const results = await captureWithStallGuard(
          idxs[0] ?? i,
          captureFramesBatchPipelined(session, idxs, idxs.map(frameTime))
        );
        await drainBatch(prevBatch);
        prevBatch = results.map((r) => ({ idx: r.frameIndex, encodeResult: r.encodeResult }));
      } else {
        const { encodeResult } = await captureWithStallGuard(
          i,
          captureFrameToBufferPipelined(session, i, frameTime(i))
        );
        await drainBatch(prevBatch);
        prevBatch = [{ idx: i, encodeResult }];
        i++;
      }
    }
    await drainBatch(prevBatch);
    return;
  }
  for (let i = 0; i < totalFrames; i++) {
    assertNotAborted();
    const time = frameTime(i);
    const { encodeResult } = await captureWithStallGuard(
      i,
      captureFrameToBufferPipelined(session, i, time)
    );
    await drainPrev();
    prev = { idx: i, encodeResult };
  }
  await drainPrev();
}
async function runCaptureStreamingStage(input) {
  const {
    fileServer,
    workDir,
    framesDir,
    videoOnlyPath,
    job,
    totalFrames,
    cfg,
    plan: plan2,
    log,
    outputFormat,
    streamingEncoderOptions,
    buildCaptureOptions,
    createRenderVideoFrameInjector,
    abortSignal,
    assertNotAborted,
    onProgress,
    dedupPerfs
  } = input;
  let { probeSession } = input;
  let { workerCount } = plan2;
  const { forceScreenshot, forceParallelStream } = plan2;
  let lastBrowserConsole = [];
  let deDrainStats;
  let captureBeyondViewport = probeSession?.options.captureBeyondViewport;
  const captureCfg = cfg.forceScreenshot === forceScreenshot ? cfg : { ...cfg, forceScreenshot };
  let streamingEncoder = null;
  let streamingEncoderClosed = false;
  try {
    streamingEncoder = await spawnStreamingEncoder(
      videoOnlyPath,
      streamingEncoderOptions,
      abortSignal,
      cfg
    );
    assertNotAborted();
  } catch (err) {
    if (abortSignal?.aborted) {
      if (streamingEncoder && !streamingEncoderClosed) {
        await streamingEncoder.close().catch(() => {
        });
        streamingEncoderClosed = true;
      }
      throw err;
    }
    log.warn("[Render] Streaming encoder spawn failed; falling back to disk-frame encode.", {
      error: err instanceof Error ? err.message : String(err),
      outputFormat,
      workerCount,
      durationSeconds: job.duration
    });
    return { success: false };
  }
  const currentEncoder = streamingEncoder;
  try {
    const reorderBuffer = createFrameReorderBuffer(0, totalFrames);
    if (workerCount > 1) {
      const deParallelStream = forceParallelStream === true || process.env.HF_DE_PARALLEL_STREAM === "true";
      const tasks = deParallelStream ? distributeFramesInterleaved(totalFrames, workerCount, workDir) : distributeFrames(totalFrames, workerCount, workDir);
      const parallelStats = {
        verifyChecked: 0,
        blankSuspects: 0,
        blankDeterministicAccepts: 0,
        blankRecaptures: 0
      };
      const parallelGuard = createDrainFrameGuard({
        log,
        stats: parallelStats,
        frameTime: (i) => i * job.config.fps.den / job.config.fps.num
      });
      let parallelGuardRan = false;
      let parallelDrainError = null;
      const onFrameBuffer = async (frameIndex, buffer, workerSession) => {
        try {
          if (deParallelStream && workerSession.captureMode === "drawelement") {
            parallelGuardRan = true;
            buffer = await parallelGuard(workerSession, frameIndex, buffer);
          }
          await reorderBuffer.waitForFrame(frameIndex);
          ensureFrameWritten(await currentEncoder.writeFrame(buffer), frameIndex, currentEncoder);
          reorderBuffer.advanceTo(frameIndex + 1);
        } catch (err) {
          const e = err instanceof Error ? err : new Error(String(err));
          if (!parallelDrainError) {
            parallelDrainError = e;
            reorderBuffer.abort(e);
          }
          throw e;
        }
      };
      const captureLabel = input.parallelCaptureLabel ?? "worker";
      let watchdogArmed = false;
      const stallController = new AbortController();
      const forwardParentAbort = () => stallController.abort();
      if (abortSignal) {
        if (abortSignal.aborted) stallController.abort();
        else abortSignal.addEventListener("abort", forwardParentAbort, { once: true });
      }
      const stallTimeoutMs = resolveCaptureStallTimeoutMs();
      let lastCapturedFrames = 0;
      let lastProgressAt = Date.now();
      const workerPhases = /* @__PURE__ */ new Map();
      const phaseSummary = () => [...workerPhases.entries()].sort(([left], [right]) => left - right).map(([workerId, detail]) => `worker=${workerId} ${detail}`).join("; ");
      let stalled = false;
      const stallTimer = setInterval(
        () => {
          if (!watchdogArmed || Date.now() - lastProgressAt <= stallTimeoutMs) return;
          stalled = true;
          const stallErr = new ParallelCaptureStallError({
            variant: "drain",
            captureLabel,
            stallTimeoutMs,
            lastCapturedFrames,
            totalFrames,
            phaseSummary: phaseSummary()
          });
          reorderBuffer.abort(stallErr);
          stallController.abort();
        },
        Math.min(stallTimeoutMs, DE_STALL_POLL_MS)
      );
      let workerResults;
      try {
        workerResults = await executeParallelCapture(
          fileServer.url,
          workDir,
          tasks,
          buildCaptureOptions(),
          createRenderVideoFrameInjector,
          stallController.signal,
          (progress) => {
            if (progress.latestWorkerPhase) {
              const phase = progress.latestWorkerPhase;
              const detail = `phase=${phase.phase} frame=${phase.frameIndex ?? "n/a"} browser=${phase.browserExecutable} version=${phase.browserVersion} CanvasDrawElement=${phase.canvasDrawElement} gpu=${phase.gpuBackend}`;
              workerPhases.set(phase.workerId, detail);
              if (phase.phase === "frame_capture" && !watchdogArmed) {
                watchdogArmed = true;
                lastProgressAt = Date.now();
              }
              log.info("[Render] Parallel capture worker phase", {
                workerId: phase.workerId,
                phase: phase.phase,
                frameIndex: phase.frameIndex,
                browserExecutable: phase.browserExecutable,
                browserVersion: phase.browserVersion,
                canvasDrawElement: phase.canvasDrawElement,
                gpuBackend: phase.gpuBackend
              });
              if (progress.capturedFrames === 0) reportWorkerStartup(job, progress, onProgress);
              return;
            }
            if (progress.capturedFrames > lastCapturedFrames) {
              lastCapturedFrames = progress.capturedFrames;
              lastProgressAt = Date.now();
              watchdogArmed = true;
            }
            job.framesRendered = progress.capturedFrames;
            const frameProgress = progress.capturedFrames / progress.totalFrames;
            reportFrameProgress(
              job,
              `Streaming frame ${progress.capturedFrames}/${progress.totalFrames} (${workerCount} workers)`,
              Math.round(25 + frameProgress * 55),
              onProgress,
              progress.capturedFrames,
              progress.totalFrames
            );
          },
          onFrameBuffer,
          // Interleaved DE workers each need their own browser PROCESS:
          // pages co-tenant in one browser share one compositor, whose
          // internal frame scheduling deprioritizes non-active pages — their
          // canvas `paint` events starve and the drawElement paint-wait slows
          // ~3x (measured: 86s vs 30s on a 3,245-frame rAF comp). This is
          // Chromium's internal frame-production scheduling on ALL platforms,
          // NOT the Linux-only HeadlessExperimental.beginFrame capture mode.
          deParallelStream ? { ...captureCfg, enableBrowserPool: false } : captureCfg,
          {
            // A worker died (Target closed, Page crashed, launch failure).
            // Its frames are gone and peers are parked in waitForFrame on the
            // first of them; release them with the ORIGINAL failure so the
            // orchestrator sees a transient browser error it knows how to
            // retry, not the stall the watchdog would have raised a minute
            // later. First failure wins, same as the drain guard above.
            onWorkerFailure: (failure) => {
              if (parallelDrainError) return;
              parallelDrainError = failure;
              reorderBuffer.abort(failure);
            }
          }
        );
      } catch (err) {
        if (parallelDrainError) throw parallelDrainError;
        if (stalled && abortSignal?.aborted !== true) {
          throw new ParallelCaptureStallError({
            variant: "pool",
            captureLabel,
            stallTimeoutMs,
            lastCapturedFrames,
            totalFrames,
            phaseSummary: phaseSummary()
          });
        }
        throw err;
      } finally {
        clearInterval(stallTimer);
        abortSignal?.removeEventListener("abort", forwardParentAbort);
      }
      if (parallelDrainError) throw parallelDrainError;
      pushWorkerDedupPerfs(workerResults, dedupPerfs);
      if (parallelGuardRan) {
        deDrainStats = parallelStats;
      }
      if (probeSession) {
        captureBeyondViewport = probeSession.options.captureBeyondViewport;
        lastBrowserConsole = probeSession.browserConsoleBuffer;
        await closeCaptureSession(probeSession);
        probeSession = null;
      }
    } else {
      const videoInjector = createRenderVideoFrameInjector();
      const session = probeSession ?? await createCaptureSession(
        fileServer.url,
        framesDir,
        buildCaptureOptions(),
        videoInjector,
        captureCfg
      );
      captureBeyondViewport = session.options.captureBeyondViewport;
      if (probeSession) {
        prepareCaptureSessionForReuse(session, framesDir, videoInjector);
        probeSession = null;
      }
      try {
        if (!session.isInitialized) {
          await initializeSession(session);
        }
        await completeDeferredDrawElementInit(session);
        assertNotAborted();
        lastBrowserConsole = session.browserConsoleBuffer;
        if (session.workerEncodeEnabled) {
          deDrainStats = {
            verifyChecked: 0,
            blankSuspects: 0,
            blankDeterministicAccepts: 0,
            blankRecaptures: 0
          };
          await runWorkerEncodePipelineLoop(
            session,
            totalFrames,
            job,
            currentEncoder,
            reorderBuffer,
            assertNotAborted,
            onProgress,
            log,
            deDrainStats,
            abortSignal
          );
        } else {
          const stallTimeoutMs = resolveCaptureStallTimeoutMs();
          let lastProgressAt = Date.now();
          for (let i = 0; i < totalFrames; i++) {
            assertNotAborted();
            const time = i * job.config.fps.den / job.config.fps.num;
            const { buffer } = await raceAgainstStall(
              captureFrameToBuffer(session, i, time),
              stallTimeoutMs - (Date.now() - lastProgressAt),
              { captureMode: session.captureMode, frameIndex: i, totalFrames, stallTimeoutMs },
              abortSignal
            );
            await reorderBuffer.waitForFrame(i);
            ensureFrameWritten(await currentEncoder.writeFrame(buffer), i, currentEncoder);
            reorderBuffer.advanceTo(i + 1);
            job.framesRendered = i + 1;
            lastProgressAt = Date.now();
            const frameProgress = (i + 1) / totalFrames;
            const progress = 25 + frameProgress * 55;
            reportFrameProgress(
              job,
              `Streaming frame ${i + 1}/${totalFrames}`,
              Math.round(progress),
              onProgress,
              i + 1,
              totalFrames
            );
          }
        }
        dedupPerfs.push(getCapturePerfSummary(session));
      } catch (error) {
        lastBrowserConsole = session.browserConsoleBuffer;
        throw wrapCaptureStageError(error, lastBrowserConsole);
      } finally {
        lastBrowserConsole = session.browserConsoleBuffer;
        await closeCaptureSession(session);
      }
    }
    const encodeFrom = job.progress;
    const encodeResult = await currentEncoder.close(
      (frames) => reportEncodeProgress(job, frames, totalFrames, onProgress, encodeFrom)
    );
    streamingEncoderClosed = true;
    assertNotAborted();
    if (!encodeResult.success) {
      throw encoderFailureError("Streaming encode failed", encodeResult);
    }
    reportEncodeProgress(job, totalFrames, totalFrames, onProgress, encodeFrom);
    return {
      success: true,
      encodeMs: encodeResult.durationMs,
      probeSession,
      lastBrowserConsole,
      workerCount,
      deDrainStats,
      captureBeyondViewport
    };
  } finally {
    if (streamingEncoder && !streamingEncoderClosed) {
      try {
        await streamingEncoder.close();
      } catch (err) {
        log.warn("streamingEncoder defensive close failed", {
          err: err instanceof Error ? err.message : String(err)
        });
      }
    }
  }
}

// ../producer/src/services/render/stages/captureSegmentedStage.ts
function segmentOutputPath(segmentDir, index) {
  return join9(segmentDir, `segment_${String(index).padStart(5, "0")}.mp4`);
}
function segmentEncoderOptions(base, segment) {
  return {
    ...base,
    lockGopForChunkConcat: true,
    gopSize: segment.endFrame - segment.startFrame
  };
}
var SegmentEncoderSpawnError = class extends Error {
  reason;
  constructor(reason) {
    super(reason instanceof Error ? reason.message : String(reason));
    this.name = "SegmentEncoderSpawnError";
    this.reason = reason;
  }
};
async function captureSegmentFrames(ctx, segment, encoder) {
  let lastProgressAt = Date.now();
  for (let i = segment.startFrame; i < segment.endFrame; i++) {
    ctx.assertNotAborted();
    const time = i * ctx.job.config.fps.den / ctx.job.config.fps.num;
    const { buffer } = await raceAgainstStall(
      ctx.captureFrame(ctx.session, i, time),
      ctx.stallTimeoutMs - (Date.now() - lastProgressAt),
      {
        captureMode: ctx.session.captureMode,
        frameIndex: i,
        totalFrames: ctx.totalFrames,
        stallTimeoutMs: ctx.stallTimeoutMs
      },
      ctx.abortSignal
    );
    ensureFrameWritten(await encoder.writeFrame(buffer), i, encoder);
    ctx.job.framesRendered = i + 1;
    lastProgressAt = Date.now();
    reportFrameProgress(
      ctx.job,
      `Streaming frame ${i + 1}/${ctx.totalFrames} (segment ${segment.index + 1}/${ctx.segmentCount}` + (ctx.skipped > 0 ? `, skipped ${ctx.skipped}` : "") + ")",
      Math.round(25 + (i + 1) / ctx.totalFrames * 55),
      ctx.onProgress,
      i + 1,
      ctx.totalFrames
    );
  }
}
async function captureSegment(ctx, segment) {
  const segmentPath = segmentOutputPath(ctx.segmentDir, segment.index);
  let encoder;
  try {
    encoder = await ctx.spawnEncoder(
      segmentPath,
      segmentEncoderOptions(ctx.streamingEncoderOptions, segment),
      ctx.abortSignal,
      ctx.cfg
    );
    ctx.assertNotAborted();
  } catch (err) {
    if (ctx.abortSignal?.aborted) throw err;
    throw new SegmentEncoderSpawnError(err);
  }
  let encoderClosed = false;
  try {
    await captureSegmentFrames(ctx, segment, encoder);
    const encodeResult = await encoder.close();
    encoderClosed = true;
    if (!encodeResult.success) {
      throw encoderFailureError(`Segment ${segment.index} encode failed`, encodeResult);
    }
    ctx.onSegmentComplete?.({
      index: segment.index,
      startFrame: segment.startFrame,
      endFrame: segment.endFrame,
      path: segmentPath,
      // Recorded so resume can prove the file on disk is the one that
      // finished; absent only in unit tests, whose fake encoder writes none.
      bytes: existsSync6(segmentPath) ? statSync2(segmentPath).size : 0
    });
    return encodeResult.durationMs;
  } finally {
    if (!encoderClosed) {
      await encoder.close().catch(() => {
      });
    }
  }
}
var DEFAULT_DEPS = {
  spawnEncoder: spawnStreamingEncoder,
  captureFrame: captureFrameToBuffer,
  concat: concatVideoFiles,
  // Through the import binding, not captured: a value captured at module load
  // is invisible to a test that swaps the engine module after this file has
  // been evaluated (bun updates live bindings, not copies).
  closeSession: (session) => closeCaptureSession(session),
  removeFile: (path) => rmSync5(path, { force: true })
};
function defaultSessionFactory(input) {
  let probeSession = input.probeSession;
  return {
    create: async () => {
      const session = probeSession ?? await openSegmentedSession(input);
      if (probeSession) {
        openSegmentedSessionReuse(input, probeSession);
        probeSession = null;
      }
      try {
        if (!session.isInitialized) await initializeSession(session);
        await completeDeferredDrawElementInit(session);
      } catch (error) {
        await closeCaptureSession(session).catch(() => {
        });
        throw error;
      }
      return session;
    }
  };
}
function openSegmentedSessionReuse(input, session) {
  prepareCaptureSessionForReuse(session, input.framesDir, input.createRenderVideoFrameInjector());
}
async function openSegmentedSession(input) {
  const captureCfg = input.cfg.forceScreenshot === input.plan.forceScreenshot ? input.cfg : { ...input.cfg, forceScreenshot: input.plan.forceScreenshot };
  const videoInjector = input.createRenderVideoFrameInjector();
  const captureOptions = input.buildCaptureOptions();
  const ownBrowser = shouldDisableBrowserPoolForParallelWorker({
    parallel: (input.workerCount ?? 1) > 1,
    platform: process.platform,
    deviceScaleFactor: captureOptions.deviceScaleFactor,
    headlessShellPath: resolveHeadlessShellPath(captureCfg)
  });
  return createCaptureSession(
    input.fileServer.url,
    input.framesDir,
    captureOptions,
    videoInjector,
    ownBrowser ? { ...captureCfg, enableBrowserPool: false } : captureCfg
  );
}
async function concatSegments(concat, segmentPaths, videoOnlyPath, abortSignal, cfg) {
  const result = await concat(segmentPaths, videoOnlyPath, abortSignal, cfg);
  if (result.success) return;
  throw encoderFailureError("Segment concat failed", {
    error: result.error,
    failureReason: result.externalInterruption ? "external_interruption" : void 0
  });
}
async function createSegmentWorker(run, id) {
  const { input, deps } = run;
  const factory = input.sessionFactoryForWorker?.(id) ?? run.sessionFactory;
  return {
    id,
    factory,
    sessionSegments: 0,
    ctx: {
      session: await factory.create(),
      job: input.job,
      cfg: input.cfg,
      totalFrames: input.totalFrames,
      segmentCount: run.segments.length,
      segmentDir: run.segmentDir,
      skipped: run.skipSize,
      streamingEncoderOptions: input.streamingEncoderOptions,
      spawnEncoder: deps.spawnEncoder,
      captureFrame: deps.captureFrame,
      stallTimeoutMs: resolveCaptureStallTimeoutMs(),
      abortSignal: input.abortSignal,
      assertNotAborted: input.assertNotAborted,
      onProgress: input.onProgress,
      onSegmentComplete: input.onSegmentComplete
    }
  };
}
async function recycleWorkerSession(run, worker, why) {
  run.input.dedupPerfs.push(getCapturePerfSummary(worker.ctx.session));
  const memory = worker.ctx.session.chromeMemory?.stats();
  await run.deps.closeSession(worker.ctx.session);
  worker.ctx.session = await worker.factory.create();
  worker.sessionSegments = 0;
  if (why === "cadence") run.totals.browserRecycles += 1;
  run.input.log.info(`[Render] segment browser recycled (${why})`, {
    worker: worker.id,
    rendererRssPeakMb: memory?.rendererRssPeakMb,
    rssLastMb: memory?.rssLastMb,
    samples: memory?.samples
  });
}
function onSegmentSpawnFailure(run, err, segment) {
  if (run.workerCount > 1 || segment.index !== run.pending[0]?.index) throw err.reason;
  run.input.log.warn(
    "[Render] Segment encoder spawn failed; falling back to single-encoder streaming.",
    {
      error: err.message,
      outputFormat: run.input.outputFormat,
      segments: run.segments.length,
      durationSeconds: run.input.job.duration
    }
  );
  return "fallback";
}
async function retryAfterTargetLoss(run, worker, err, segment, segmentPath) {
  if (!isTargetLossError(err) || run.input.abortSignal?.aborted) throw err;
  run.totals.segmentRetries += 1;
  run.input.updateCaptureObservability?.({ segmentRetries: run.totals.segmentRetries });
  run.input.log.warn(
    `[Render] segment ${segment.index}: browser target lost; retrying once on a fresh session`,
    { worker: worker.id, error: err instanceof Error ? err.message : String(err) }
  );
  run.deps.removeFile(segmentPath);
  await recycleWorkerSession(run, worker, "retry");
  run.totals.encodeMs += await captureSegment(worker.ctx, segment);
}
async function runOneSegment(run, worker, segment) {
  const segmentPath = segmentOutputPath(run.segmentDir, segment.index);
  if (run.recycleEvery > 0 && worker.sessionSegments >= run.recycleEvery) {
    await recycleWorkerSession(run, worker, "cadence");
  }
  run.input.updateCaptureObservability?.({
    capturePath: "segmented",
    segmentIndex: segment.index
  });
  try {
    run.totals.encodeMs += await captureSegment(worker.ctx, segment);
  } catch (err) {
    if (err instanceof SegmentEncoderSpawnError) return onSegmentSpawnFailure(run, err, segment);
    await retryAfterTargetLoss(run, worker, err, segment, segmentPath);
  }
  worker.sessionSegments += 1;
  return "done";
}
async function concatResumedRun(run, segmentPaths) {
  const { input, deps } = run;
  input.log.info("[Render] every segment already complete (resume); concatenating without capture");
  if (input.probeSession) await deps.closeSession(input.probeSession);
  await concatSegments(
    deps.concat,
    segmentPaths,
    input.videoOnlyPath,
    input.abortSignal,
    input.cfg
  );
  return {
    success: true,
    encodeMs: 0,
    probeSession: null,
    lastBrowserConsole: [],
    workerCount: run.workerCount,
    segments: run.segments.length,
    segmentPaths,
    segmentRetries: 0,
    browserRecycles: 0
  };
}
async function runCaptureSegmentedStage(input) {
  const { log, dedupPerfs, assertNotAborted } = input;
  const deps = { ...DEFAULT_DEPS, ...input.deps };
  const segments = planSegments(input.totalFrames, input.segmentFrames);
  const segmentDir = input.segmentDir ?? join9(input.workDir, "segments");
  mkdirSync3(segmentDir, { recursive: true });
  const skip = input.completedSegments ?? /* @__PURE__ */ new Set();
  const pending = segments.filter((s) => !skip.has(s.index));
  for (const index of skip) log.info("[Render] segment skipped (resume)", { index });
  const run = {
    input,
    deps,
    totals: { encodeMs: 0, segmentRetries: 0, browserRecycles: 0 },
    segments,
    pending,
    segmentDir,
    skipSize: skip.size,
    workerCount: Math.max(1, input.workerCount ?? 1),
    recycleEvery: input.browserRecycleEverySegments ?? 0,
    sessionFactory: input.sessionFactory ?? defaultSessionFactory(input)
  };
  const queue = createSegmentQueue(pending);
  const segmentPaths = segments.map((s) => segmentOutputPath(segmentDir, s.index));
  if (pending.length === 0) return concatResumedRun(run, segmentPaths);
  let fellBackToStreaming = false;
  const workers = [];
  const consoleOf = () => workers[0]?.ctx.session.browserConsoleBuffer ?? [];
  let lastBrowserConsole = [];
  const runWorkerLoop = async (worker) => {
    for (; ; ) {
      if (fellBackToStreaming) return;
      assertNotAborted();
      const segment = queue.next();
      if (!segment) return;
      if (await runOneSegment(run, worker, segment) === "fallback") {
        fellBackToStreaming = true;
        return;
      }
    }
  };
  try {
    assertNotAborted();
    for (let id = 0; id < run.workerCount; id++) workers.push(await createSegmentWorker(run, id));
    const outcomes = await Promise.allSettled(workers.map((w) => runWorkerLoop(w)));
    for (const worker of workers) dedupPerfs.push(getCapturePerfSummary(worker.ctx.session));
    const failure = outcomes.find((o) => o.status === "rejected");
    if (failure && failure.status === "rejected") throw failure.reason;
  } catch (error) {
    lastBrowserConsole = consoleOf();
    throw wrapCaptureStageError(error, lastBrowserConsole);
  } finally {
    lastBrowserConsole = consoleOf();
    for (const worker of workers) await deps.closeSession(worker.ctx.session);
  }
  if (fellBackToStreaming) return { success: false };
  await concatSegments(
    deps.concat,
    segmentPaths,
    input.videoOnlyPath,
    input.abortSignal,
    input.cfg
  );
  return {
    success: true,
    encodeMs: run.totals.encodeMs,
    probeSession: null,
    lastBrowserConsole,
    workerCount: run.workerCount,
    segments: segments.length,
    segmentPaths,
    segmentRetries: run.totals.segmentRetries,
    browserRecycles: run.totals.browserRecycles
  };
}

// ../producer/src/services/render/segmentManifest.ts
import { createHash as createHash2 } from "crypto";
import { existsSync as existsSync7, mkdirSync as mkdirSync4, readFileSync as readFileSync4, renameSync as renameSync2, statSync as statSync3, writeFileSync as writeFileSync3 } from "fs";
import { join as join10 } from "path";
var MANIFEST_FILENAME = "segments.json";
function computeSegmentPlanHash(input) {
  const ordered = [
    input.compositionHash,
    input.cliVersion,
    String(input.totalFrames),
    String(input.segmentFrames),
    `${input.fps.num}/${input.fps.den}`,
    `${input.width}x${input.height}`,
    input.codec,
    input.preset,
    input.quality === void 0 ? "" : String(input.quality),
    input.bitrate ?? "",
    input.pixelFormat ?? "",
    input.imageFormat,
    input.useGpu ? "gpu" : "cpu",
    `${input.outputWidth}x${input.outputHeight}`,
    input.motionBlur
  ].join(" ");
  return createHash2("sha256").update(ordered).digest("hex").slice(0, 16);
}
function segmentDirFor(projectRendersDir, planHash) {
  return join10(projectRendersDir, ".hf-segments", planHash);
}
function hasNumber(value, key) {
  return key in value && typeof Reflect.get(value, key) === "number";
}
function hasString(value, key) {
  return key in value && typeof Reflect.get(value, key) === "string";
}
function isEntry(value) {
  if (typeof value !== "object" || value === null) return false;
  return hasNumber(value, "index") && hasNumber(value, "startFrame") && hasNumber(value, "endFrame") && hasString(value, "path") && hasNumber(value, "bytes") && hasString(value, "completedAt");
}
function isManifest(value) {
  if (typeof value !== "object" || value === null) return false;
  const completed = Reflect.get(value, "completed");
  return Reflect.get(value, "version") === 1 && hasString(value, "planHash") && hasNumber(value, "totalFrames") && hasNumber(value, "segmentFrames") && Array.isArray(completed) && completed.every(isEntry);
}
function readSegmentManifest(segmentDir) {
  const path = join10(segmentDir, MANIFEST_FILENAME);
  if (!existsSync7(path)) return null;
  try {
    const parsed = JSON.parse(readFileSync4(path, "utf-8"));
    return isManifest(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function writeSegmentManifest(segmentDir, manifest) {
  mkdirSync4(segmentDir, { recursive: true });
  const tmp = join10(segmentDir, `${MANIFEST_FILENAME}.${process.pid}.tmp`);
  writeFileSync3(tmp, JSON.stringify(manifest, null, 2), "utf-8");
  renameSync2(tmp, join10(segmentDir, MANIFEST_FILENAME));
}
async function probeSegmentFrameCount(path, probe) {
  try {
    const meta = await probe(path);
    if (!Number.isFinite(meta.videoStreamDurationSeconds) || !Number.isFinite(meta.fps))
      return null;
    if (meta.fps <= 0) return null;
    return Math.round(meta.videoStreamDurationSeconds * meta.fps);
  } catch {
    return null;
  }
}
async function validateCompletedSegments(manifest, expectedHash, probeFrames) {
  const ok = /* @__PURE__ */ new Set();
  if (manifest.planHash !== expectedHash) return ok;
  for (const entry of manifest.completed) {
    if (!existsSync7(entry.path)) continue;
    const size = statSync3(entry.path).size;
    if (size <= 0 || size !== entry.bytes) continue;
    const frames = await probeFrames(entry.path);
    if (frames !== entry.endFrame - entry.startFrame) continue;
    ok.add(entry.index);
  }
  return ok;
}

// ../producer/src/services/render/hdrMode.ts
function formatDowngradeWarning(outputFormat, forcedHdrWithoutSources) {
  const hdrSourceReason = forcedHdrWithoutSources ? "HDR was forced without detected HDR sources" : "HDR source detected";
  const formatReason = outputFormat === "hls" ? "HLS output is SDR-only (H.264 in MPEG-TS)" : "HDR + alpha is not supported";
  return `[Render] ${hdrSourceReason}, but format is "${outputFormat}" \u2014 falling back to SDR. ${formatReason}. Use --format mp4 for HDR10 output.`;
}
function findRenderHdrAutoPromotionTrigger(input) {
  for (const extracted of input.extractionResult?.extracted ?? []) {
    if (!isHdrColorSpace(extracted.metadata.colorSpace)) continue;
    const source = input.videos.find(({ id }) => id === extracted.videoId)?.src;
    if (source) return source;
  }
  return input.images.find(({ id }) => input.nativeHdrImageIds.has(id))?.src;
}
function logHdrResolution(input, hdrMode, effectiveHdr, forcedHdrWithoutSources) {
  if (forcedHdrWithoutSources) {
    input.log.warn(
      "[Render] HDR forced by --hdr flag, but no HDR sources were detected \u2014 defaulting to HLG. SDR-only compositions may look perceptually wrong on HDR displays."
    );
  }
  if (!effectiveHdr) {
    input.log.info(
      hdrMode === "force-sdr" ? "[Render] SDR forced by --sdr flag" : "[Render] No HDR sources detected \u2014 rendering SDR"
    );
    return;
  }
  if (hdrMode === "auto") {
    input.log.warn(
      formatHdrAutoPromotionWarning({
        triggeringAsset: sanitizeHdrAutoPromotionAsset(
          input.autoPromotionTrigger ?? "an HDR-tagged asset"
        ),
        output: HDR_AUTO_PROMOTION_PIPELINE
      })
    );
    return;
  }
  const reason = forcedHdrWithoutSources ? "forced by --hdr flag (no HDR sources detected \u2014 defaulting to HLG)" : "forced by --hdr flag";
  input.log.info(
    `[Render] HDR ${reason} \u2014 output: ${effectiveHdr.transfer.toUpperCase()} (BT.2020, 10-bit H.265)`
  );
}
function resolveEffectiveHdrMode(input) {
  const hdrMode = input.hdrMode ?? "auto";
  const videoColorSpaces = (input.extractionResult?.extracted ?? []).map(
    (ext) => ext.metadata.colorSpace
  );
  const allColorSpaces = [...videoColorSpaces, ...input.imageColorSpaces];
  const info = allColorSpaces.length > 0 ? analyzeCompositionHdr(allColorSpaces) : null;
  let effectiveHdr;
  let forcedHdrWithoutSources = false;
  if (hdrMode === "force-sdr") {
    effectiveHdr = void 0;
  } else if (hdrMode === "force-hdr") {
    if (info?.hasHdr && info.dominantTransfer) {
      effectiveHdr = { transfer: info.dominantTransfer };
    } else {
      effectiveHdr = { transfer: "hlg" };
      forcedHdrWithoutSources = true;
    }
  } else if (info?.hasHdr && info.dominantTransfer) {
    effectiveHdr = { transfer: info.dominantTransfer };
  }
  if (effectiveHdr && input.outputFormat !== "mp4") {
    input.log.warn(formatDowngradeWarning(input.outputFormat, forcedHdrWithoutSources));
    effectiveHdr = void 0;
  }
  logHdrResolution(input, hdrMode, effectiveHdr, forcedHdrWithoutSources);
  return effectiveHdr;
}

// ../producer/src/services/render/captureBeyondViewport.ts
function resolveVideoCaptureBeyondViewport(videoCount) {
  if (videoCount <= 0) return void 0;
  return true;
}

// ../producer/src/services/render/captureCost.ts
import { join as join11 } from "path";
var CAPTURE_CALIBRATION_TARGET_MS = 600;
var MAX_MEASURED_CAPTURE_COST_MULTIPLIER = 8;
var CAPTURE_CALIBRATION_PROTOCOL_TIMEOUT_MS = 3e4;
function estimateCaptureCostMultiplier(compiled) {
  let multiplier = 1;
  const reasons = [];
  if (compiled.hasShaderTransitions) {
    multiplier += 2;
    reasons.push("shader-transitions");
  }
  const reasonCodes = new Set(compiled.renderModeHints.reasons.map((reason) => reason.code));
  if (reasonCodes.has("requestAnimationFrame")) {
    multiplier += 1;
    reasons.push("requestAnimationFrame");
  }
  if (reasonCodes.has("iframe")) {
    multiplier += 0.5;
    reasons.push("iframe");
  }
  return {
    multiplier: Math.round(multiplier * 100) / 100,
    reasons
  };
}
function combineCaptureCostEstimates(staticCost, measuredCost) {
  if (!measuredCost || measuredCost.multiplier <= 1) return staticCost;
  if (staticCost.multiplier >= measuredCost.multiplier) {
    return {
      multiplier: staticCost.multiplier,
      reasons: [...staticCost.reasons, ...measuredCost.reasons],
      p95Ms: measuredCost.p95Ms
    };
  }
  return {
    multiplier: measuredCost.multiplier,
    reasons: [...measuredCost.reasons, ...staticCost.reasons],
    p95Ms: measuredCost.p95Ms
  };
}
function buildHeapAdvisoryWarning(sizing, requestedWorkers) {
  if (requestedWorkers !== void 0 || !sizing.exceedsHeapAdvisory) return void 0;
  return `[Render] ${sizing.workers} capture workers may exceed this process's V8 heap (limit ${sizing.heapLimitMb}MB supports ~${sizing.heapBasedWorkers}). If the render dies with "JavaScript heap out of memory", raise the heap (NODE_OPTIONS=--max-old-space-size=8192) or pass --workers ${sizing.heapBasedWorkers}.`;
}
function resolveRenderWorkerCount(totalFrames, requestedWorkers, cfg, compiled, log = defaultLogger, measuredCaptureCost, onSizing) {
  const reasonCodes = new Set(compiled.renderModeHints.reasons.map((r) => r.code));
  if (reasonCodes.has("htmlInCanvas")) {
    log.warn(
      "[Render] html-in-canvas (drawElementImage) detected \u2014 pinning to 1 worker (Chrome concurrency limitation).",
      { requestedWorkers }
    );
    return 1;
  }
  if (cfg.lowMemoryMode && requestedWorkers === void 0) {
    log.info(
      "[Render] Low-memory profile \u2014 pinning to 1 capture worker (auto-worker calibration skipped)."
    );
    return 1;
  }
  const captureCost = combineCaptureCostEstimates(
    estimateCaptureCostMultiplier(compiled),
    measuredCaptureCost
  );
  const sizing = computeWorkerSizing(totalFrames, requestedWorkers, {
    ...cfg,
    captureCostMultiplier: captureCost.multiplier
  });
  onSizing?.(sizing);
  const workerCount = sizing.workers;
  if (requestedWorkers !== void 0 || captureCost.multiplier <= 1) {
    return workerCount;
  }
  const baselineWorkers = calculateOptimalWorkers(totalFrames, void 0, cfg);
  if (workerCount < baselineWorkers) {
    log.warn(
      "[Render] Reduced auto worker count for high-cost capture workload to avoid Chrome compositor starvation.",
      {
        from: baselineWorkers,
        to: workerCount,
        costMultiplier: captureCost.multiplier,
        reasons: captureCost.reasons
      }
    );
  }
  return workerCount;
}
function createCaptureCalibrationConfig(cfg) {
  return {
    ...cfg,
    protocolTimeout: Math.min(cfg.protocolTimeout, CAPTURE_CALIBRATION_PROTOCOL_TIMEOUT_MS)
  };
}
function estimateMeasuredCaptureCostMultiplier(samples) {
  if (samples.length === 0) {
    return { multiplier: 1, reasons: [] };
  }
  const sorted = [...samples].sort((a, b) => a.captureTimeMs - b.captureTimeMs);
  const p95Index = Math.max(0, Math.ceil(sorted.length * 0.95) - 1);
  const p95Sample = sorted[p95Index] ?? sorted[sorted.length - 1];
  if (!p95Sample) {
    return { multiplier: 1, reasons: [] };
  }
  const p95Ms = Math.round(p95Sample.captureTimeMs);
  const multiplier = Math.min(
    MAX_MEASURED_CAPTURE_COST_MULTIPLIER,
    Math.max(1, Math.round(p95Ms / CAPTURE_CALIBRATION_TARGET_MS * 100) / 100)
  );
  return {
    multiplier,
    reasons: multiplier > 1 ? [`calibration-p95=${p95Ms}ms`] : [],
    p95Ms
  };
}
function selectCaptureCalibrationFrames(totalFrames) {
  if (totalFrames <= 0) return [];
  const lastFrame = totalFrames - 1;
  const candidates = [
    0,
    Math.floor(totalFrames * 0.25),
    Math.floor(totalFrames * 0.5),
    Math.floor(totalFrames * 0.75),
    lastFrame
  ];
  return Array.from(
    new Set(candidates.map((frame) => Math.max(0, Math.min(lastFrame, frame))))
  ).sort((a, b) => a - b);
}
async function measureCaptureCostFromSession(session, totalFrames, fps, log) {
  const sampledFrames = selectCaptureCalibrationFrames(totalFrames);
  const samples = [];
  const totalSamples = sampledFrames.length;
  const savedStaticFrames = session.staticFrames;
  session.staticFrames = void 0;
  try {
    for (let i = 0; i < sampledFrames.length; i++) {
      const frameIndex = sampledFrames[i];
      log?.info(`Calibration: capturing test frame ${i + 1}/${totalSamples}...`);
      const time = frameIndex / fps;
      const startedAt = Date.now();
      const result = await captureFrameToBuffer(session, frameIndex, time);
      samples.push({
        frameIndex,
        captureTimeMs: result.captureTimeMs || Date.now() - startedAt
      });
    }
  } finally {
    session.staticFrames = savedStaticFrames;
    session.lastFrameBuffer = void 0;
  }
  const estimate = estimateMeasuredCaptureCostMultiplier(samples);
  if (estimate.p95Ms !== void 0) {
    log?.info(`Calibration complete, estimated cost: ${estimate.p95Ms}ms/frame (p95)`);
  }
  return {
    estimate,
    samples
  };
}
function logCaptureCalibrationResult(calibration, log) {
  if (calibration.estimate.multiplier > 1) {
    log.warn("[Render] Measured slow frame capture during auto-worker calibration.", {
      multiplier: calibration.estimate.multiplier,
      p95Ms: calibration.estimate.p95Ms,
      sampledFrames: calibration.samples.map((sample) => sample.frameIndex)
    });
  } else {
    log.debug("[Render] Auto-worker calibration kept baseline capture cost.", {
      p95Ms: calibration.estimate.p95Ms,
      sampledFrames: calibration.samples.map((sample) => sample.frameIndex)
    });
  }
}
function createFailedCaptureCalibrationEstimate(reason) {
  return {
    estimate: {
      multiplier: MAX_MEASURED_CAPTURE_COST_MULTIPLIER,
      reasons: [reason]
    },
    samples: []
  };
}
async function runCaptureCalibration(input) {
  const {
    cfg,
    fileServer,
    workDir,
    log,
    job,
    totalFrames,
    buildCaptureOptions,
    createRenderVideoFrameInjector,
    assertNotAborted
  } = input;
  let probeSession = input.probeSession;
  let forceScreenshot = input.forceScreenshot;
  let lastBrowserConsole = [];
  const fps = fpsToNumber(job.config.fps);
  const sessionRef = { current: null };
  const runOneCalibration = async (sessionDir, sessionCfg) => {
    log.info("Launching browser for capture calibration...");
    const session = await createCaptureSession(
      fileServer.url,
      sessionDir,
      buildCaptureOptions(),
      createRenderVideoFrameInjector(),
      sessionCfg
    );
    sessionRef.current = session;
    if (!session.isInitialized) {
      log.info("Initializing calibration session...");
      const calInitStart = Date.now();
      const calHeartbeat = setInterval(() => {
        const elapsed = ((Date.now() - calInitStart) / 1e3).toFixed(1);
        log.info(`Still waiting for browser initialization... (${elapsed}s elapsed)`);
      }, 3e4);
      try {
        await initializeSession(session);
      } finally {
        clearInterval(calHeartbeat);
      }
    }
    assertNotAborted();
    log.info("Calibration session ready, capturing test frames...");
    const result = await measureCaptureCostFromSession(session, totalFrames, fps, log);
    logCaptureCalibrationResult(result, log);
    return result;
  };
  const calibrationCfg = createCaptureCalibrationConfig({ ...cfg, forceScreenshot });
  log.info("[Render] Calibration config", {
    protocolTimeout: calibrationCfg.protocolTimeout,
    parentProtocolTimeout: cfg.protocolTimeout,
    forceScreenshot,
    totalFrames
  });
  let calibration;
  try {
    calibration = await runOneCalibration(join11(workDir, "capture-calibration"), calibrationCfg);
  } catch (error) {
    const shouldFallback = !forceScreenshot && shouldFallbackToScreenshotAfterCalibrationError(error);
    if (!shouldFallback) {
      calibration = createFailedCaptureCalibrationEstimate("calibration-failed");
      log.warn("[Render] Auto-worker calibration failed; using conservative worker budget.", {
        protocolTimeout: calibrationCfg.protocolTimeout,
        error: error instanceof Error ? error.message : String(error)
      });
    } else {
      forceScreenshot = true;
      if (probeSession) {
        lastBrowserConsole = probeSession.browserConsoleBuffer;
        await closeCaptureSession(probeSession).catch(() => {
        });
        probeSession = null;
      }
      if (sessionRef.current) {
        lastBrowserConsole = sessionRef.current.browserConsoleBuffer;
        await closeCaptureSession(sessionRef.current).catch(() => {
        });
        sessionRef.current = null;
      }
      log.warn(
        "[Render] BeginFrame auto-worker calibration timed out; retrying calibration in screenshot capture mode.",
        {
          protocolTimeout: calibrationCfg.protocolTimeout,
          error: error instanceof Error ? error.message : String(error)
        }
      );
      const screenshotCfg = createCaptureCalibrationConfig({ ...cfg, forceScreenshot: true });
      try {
        calibration = await runOneCalibration(
          join11(workDir, "capture-calibration-screenshot"),
          screenshotCfg
        );
      } catch (fallbackError) {
        calibration = createFailedCaptureCalibrationEstimate("calibration-screenshot-failed");
        log.warn(
          "[Render] Screenshot auto-worker calibration failed after BeginFrame fallback; using conservative worker budget.",
          {
            protocolTimeout: screenshotCfg.protocolTimeout,
            error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError)
          }
        );
      }
    }
  } finally {
    if (sessionRef.current) {
      lastBrowserConsole = sessionRef.current.browserConsoleBuffer;
      await closeCaptureSession(sessionRef.current).catch(() => {
      });
    }
  }
  return { calibration, forceScreenshot, probeSession, lastBrowserConsole };
}
function shouldFallbackToScreenshotAfterCalibrationError(error) {
  const message = normalizeErrorMessage(error);
  return /HeadlessExperimental\.beginFrame timed out|beginFrame probe timeout|Another frame is pending|Frame still pending|Protocol error.*HeadlessExperimental\.beginFrame|Runtime\.callFunctionOn timed out|Runtime\.evaluate timed out/i.test(
    message
  );
}

// ../producer/src/services/render/observability.ts
import { createHash as createHash3 } from "crypto";
var MAX_EVENTS = 160;
var ALLOWED_STRING_DATA_KEYS = /* @__PURE__ */ new Set([
  "browserGpuMode",
  "captureMode",
  "captureOperation",
  "compositionHash",
  "effectiveHdr",
  "format",
  "quality",
  "renderJobId",
  "requestedHdrMode",
  "requestedWorkers",
  // "calibrating" during pre-capture browser warm-up / calibration stages;
  // "capturing" during capture_disk / capture_streaming / capture_hdr_*
  // stages. Distinguishes healthy 0-frame heartbeats (browser starting up)
  // from actual zero-frame stalls once capture is meant to be underway.
  // Field signal ts=1784019503.
  "stagePhase",
  // Full-fidelity fast-capture fallback trigger — the specific reason
  // drawElement gated off ("filter:blur", "filter:drop-shadow",
  // "backdrop-filter", "clip-path", "at_risk_timeline", "swiftshader", …).
  // Populated on the `capture_fallback_profile` checkpoint emitted by
  // `fallbackCaptureProfile.ts` when the operator opts into
  // `HF_PROFILE_FALLBACK_CAPTURE=true` so downstream metric consumers can
  // characterize per-frame perf by the exact trigger. Complementary to
  // `deGateReason`, which is the low-cardinality bucket for aggregation —
  // this string preserves the fine-grained "which CSS property" for
  // diagnostic reads. Sanitized like any observation message; low-cardinality
  // by construction (bounded by the fallback-trigger enumeration).
  "triggerReason"
]);
var RESERVED_LOG_KEYS = /* @__PURE__ */ new Set([
  "data",
  "durationMs",
  "elapsedMs",
  "message",
  "phase",
  "renderJobId",
  "status"
]);
function sanitizeObservationMessage(value) {
  return redactTelemetryString(value);
}
function computeCompositionObservabilityHash(compiledHtml) {
  return createHash3("sha256").update(compiledHtml, "utf8").digest("hex").slice(0, 16);
}
function sanitizeObservationData(data) {
  if (!data) return void 0;
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (RESERVED_LOG_KEYS.has(key)) continue;
    if (typeof value === "string") {
      if (!ALLOWED_STRING_DATA_KEYS.has(key)) continue;
      sanitized[key] = sanitizeObservationMessage(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}
function isHttpErrorDiagnostic(line) {
  return /\[Browser:HTTP\d{3}\]/.test(line);
}
function readUnsignedIntAfter(line, prefix) {
  const start = line.indexOf(prefix);
  if (start < 0) return void 0;
  let value = 0;
  let digits = 0;
  for (let i = start + prefix.length; i < line.length; i++) {
    const code = line.charCodeAt(i);
    if (code < 48 || code > 57) break;
    value = value * 10 + code - 48;
    digits += 1;
    if (value > Number.MAX_SAFE_INTEGER) return void 0;
  }
  return digits > 0 ? value : void 0;
}
function maxReading(current, next) {
  if (next === void 0) return current;
  return current === void 0 ? next : Math.max(current, next);
}
function summarizeInitObservability(lines, fallback) {
  let initDurationMs = fallback?.initDurationMs;
  let tweenCount = fallback?.tweenCount;
  let elementCount = fallback?.elementCount;
  for (const line of lines) {
    if (!line.includes("[FrameCapture:INIT]")) continue;
    initDurationMs = maxReading(initDurationMs, readUnsignedIntAfter(line, "initDurationMs="));
    tweenCount = maxReading(tweenCount, readUnsignedIntAfter(line, "tweenCount="));
    elementCount = maxReading(elementCount, readUnsignedIntAfter(line, "elementCount="));
  }
  if (initDurationMs === void 0 && tweenCount === void 0 && elementCount === void 0) {
    return void 0;
  }
  return { initDurationMs, tweenCount, elementCount };
}
function summarizeBrowserDiagnostics(lines) {
  let errors = 0;
  let pageErrors = 0;
  let requestFailed = 0;
  let httpErrors = 0;
  let navigationStarts = 0;
  let navigationFailures = 0;
  let consoleErrors = 0;
  let consoleWarnings = 0;
  for (const line of lines) {
    const isPageError = line.includes("PAGEERROR");
    const isRequestFailed = line.includes("REQUESTFAILED");
    const isHttpError = isHttpErrorDiagnostic(line);
    const isNavigationFailure = line.includes("[FrameCapture:ERROR] page.goto failed");
    const isConsoleError = line.includes("[error]");
    if (isPageError) pageErrors++;
    if (isRequestFailed) requestFailed++;
    if (isHttpError) httpErrors++;
    if (line.includes("[FrameCapture:NAV] page.goto start")) navigationStarts++;
    if (isNavigationFailure) navigationFailures++;
    if (isConsoleError) consoleErrors++;
    if (line.includes("[warn]")) consoleWarnings++;
    if (line.includes("ERROR") && !isPageError && !isRequestFailed && !isHttpError && !isNavigationFailure && !isConsoleError) {
      errors++;
    }
  }
  return {
    total: lines.length,
    errors,
    pageErrors,
    requestFailed,
    httpErrors,
    navigationStarts,
    navigationFailures,
    consoleErrors,
    consoleWarnings
  };
}
var RenderObservabilityRecorder = class {
  constructor(input) {
    this.input = input;
  }
  input;
  events = [];
  eventCount = 0;
  failedPhase;
  checkpoint(phase, message, data) {
    return this.record({
      phase,
      status: "checkpoint",
      elapsedMs: Date.now() - this.input.pipelineStartMs,
      message: sanitizeObservationMessage(message),
      data: sanitizeObservationData(data)
    });
  }
  stageStart(phase, data) {
    this.record({
      phase,
      status: "start",
      elapsedMs: Date.now() - this.input.pipelineStartMs,
      data: sanitizeObservationData(data)
    });
    return Date.now();
  }
  stageEnd(phase, startedAtMs, data) {
    this.record({
      phase,
      status: "end",
      elapsedMs: Date.now() - this.input.pipelineStartMs,
      durationMs: Date.now() - startedAtMs,
      data: sanitizeObservationData(data)
    });
  }
  stageError(phase, startedAtMs, error, data) {
    this.failedPhase = phase;
    this.record({
      phase,
      status: "error",
      elapsedMs: Date.now() - this.input.pipelineStartMs,
      durationMs: Date.now() - startedAtMs,
      message: sanitizeObservationMessage(normalizeErrorMessage(error)),
      data: sanitizeObservationData(data)
    });
  }
  summary(input) {
    const lastEvent = this.events[this.events.length - 1];
    return {
      renderJobId: this.input.renderJobId,
      compositionHash: input.compositionHash,
      events: this.events.slice(),
      eventCount: this.eventCount,
      lastEvent,
      failedPhase: this.failedPhase,
      browserDiagnostics: summarizeBrowserDiagnostics(input.lastBrowserConsole),
      capture: { ...input.capture },
      extraction: input.extraction ? { ...input.extraction } : void 0,
      init: summarizeInitObservability(input.lastBrowserConsole, input.initFallback)
    };
  }
  hasFailure() {
    return this.failedPhase !== void 0;
  }
  /** A phase failure that was subsequently recovered (e.g. the drawElement
   * self-verify fallback re-rendering via screenshot) should not brand the
   * whole render as failed in the summary. */
  clearFailure(phase) {
    if (this.failedPhase === phase) this.failedPhase = void 0;
  }
  record(event) {
    this.eventCount++;
    const eventWithJob = { ...event, renderJobId: this.input.renderJobId };
    this.events.push(eventWithJob);
    if (this.events.length > MAX_EVENTS) {
      this.events.shift();
    }
    this.input.log.info("[Render:trace]", {
      renderJobId: eventWithJob.renderJobId,
      phase: eventWithJob.phase,
      status: eventWithJob.status,
      elapsedMs: eventWithJob.elapsedMs,
      durationMs: eventWithJob.durationMs,
      message: eventWithJob.message,
      ...eventWithJob.data
    });
    return eventWithJob;
  }
};
var HEARTBEAT_RAMP_MS = [3e4, 6e4, 12e4];
var HEARTBEAT_REPEAT_MS = 12e4;
var HEARTBEAT_RAMP_END_MS = HEARTBEAT_RAMP_MS[HEARTBEAT_RAMP_MS.length - 1] ?? HEARTBEAT_REPEAT_MS;
function heartbeatTargetMs(index) {
  const rampTarget = HEARTBEAT_RAMP_MS[index];
  if (rampTarget !== void 0) return rampTarget;
  const overflow = index - HEARTBEAT_RAMP_MS.length + 1;
  return HEARTBEAT_RAMP_END_MS + overflow * HEARTBEAT_REPEAT_MS;
}
async function observeRenderStage(recorder, phase, data, fn, options = {}) {
  const heartbeatMessage = options.heartbeatMessage ?? "stage still running";
  const startedAt = recorder.stageStart(phase, data);
  let heartbeatCount = 0;
  let lastFiredAtMs = 0;
  let heartbeatTimer;
  const scheduleNextHeartbeat = () => {
    const targetMs = heartbeatTargetMs(heartbeatCount);
    heartbeatTimer = setTimeout(() => {
      lastFiredAtMs = targetMs;
      heartbeatCount += 1;
      recorder.checkpoint(phase, heartbeatMessage, {
        ...data,
        heartbeatIndex: heartbeatCount,
        stageElapsedMs: Date.now() - startedAt
      });
      scheduleNextHeartbeat();
    }, targetMs - lastFiredAtMs);
    heartbeatTimer.unref?.();
  };
  scheduleNextHeartbeat();
  const clearHeartbeats = () => {
    clearTimeout(heartbeatTimer);
  };
  try {
    const result = await fn();
    clearHeartbeats();
    recorder.stageEnd(phase, startedAt, data);
    return result;
  } catch (error) {
    clearHeartbeats();
    recorder.stageError(phase, startedAt, error, data);
    throw error;
  }
}

// ../producer/src/services/render/fallbackCaptureProfile.ts
var FALLBACK_PROFILE_ENV_VAR = "HF_PROFILE_FALLBACK_CAPTURE";
function fallbackEngaged(perf) {
  return Boolean(perf.deFallbackTrigger) || Boolean(perf.deGateReason);
}
function resolveTrigger(perf) {
  return perf.deFallbackTrigger ?? perf.deGateReason ?? "unknown";
}
function emitFallbackCaptureProfile(recorder, perfSummaries, env = process.env) {
  if (env[FALLBACK_PROFILE_ENV_VAR] !== "true") return 0;
  let emitted = 0;
  for (const perf of perfSummaries) {
    if (!fallbackEngaged(perf)) continue;
    const trigger = resolveTrigger(perf);
    recorder.checkpoint("capture_fallback_profile", `fast-capture fallback profile (${trigger})`, {
      stagePhase: "fallback-capture",
      triggerReason: trigger,
      frameCount: perf.frames,
      captureTimeP50Ms: perf.p50TotalMs,
      captureTimeP95Ms: perf.p95TotalMs,
      captureTimeP99Ms: perf.p99TotalMs,
      captureTimeAvgTotalMs: perf.avgTotalMs
    });
    emitted++;
  }
  return emitted;
}

// ../producer/src/services/render/videoFrameCoverage.ts
var SHORT_CLIP_ONE_FRAME_TOLERANCE_MIN_EXPECTED_FRAMES = 14;
var SHORT_CLIP_ONE_FRAME_TOLERANCE_MAX_EXPECTED_FRAMES = 20;
var VideoFrameCoverageError = class extends Error {
  // Read structurally by isVideoFrameCoverageError and cross-module callers.
  // fallow-ignore-next-line unused-class-member
  hyperframesVideoFrameCoverageError = true;
  threshold;
  worst;
  failedReports;
  constructor(message, details) {
    super(message);
    this.name = "VideoFrameCoverageError";
    this.threshold = details.threshold;
    this.worst = details.worst;
    this.failedReports = details.failedReports;
  }
};
function resolveVideoCoverageThreshold(envValue = process.env.HF_VIDEO_COVERAGE_THRESHOLD) {
  if (envValue === void 0) return 0.95;
  const parsed = Number(envValue);
  if (!Number.isFinite(parsed)) return 0.95;
  if (parsed <= 0) return null;
  if (parsed > 1) return 1;
  return parsed;
}
function expectedFramesForClip(start, end, fps, rounding = "ceil") {
  const fpsValue = fpsToNumber(toFps(fps));
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(fpsValue)) return 0;
  if (fpsValue <= 0) return 0;
  const duration = Math.max(0, end - start);
  if (duration === 0) return 0;
  return extractionFrameCountForDuration(duration, fps, rounding === "ceil");
}
function isToleratedShortClipBoundaryMiss(report, threshold) {
  return threshold < 1 && report.capturedFrames > 0 && report.expectedFrames >= SHORT_CLIP_ONE_FRAME_TOLERANCE_MIN_EXPECTED_FRAMES && report.expectedFrames <= SHORT_CLIP_ONE_FRAME_TOLERANCE_MAX_EXPECTED_FRAMES && report.expectedFrames - report.capturedFrames === 1;
}
function expectedFramesForVideo(video, entry, fps) {
  const rounding = entry && !entry.metadata.isVFR ? "nearest" : "ceil";
  const slotSourceDuration = sourceTimeAt(
    normalizeRateSpec(video.playbackRate),
    Math.max(0, video.end - video.start)
  );
  const slotFrames = expectedFramesForClip(0, slotSourceDuration, fps, rounding);
  if (!entry) return slotFrames;
  const sourceDuration = resolvePlayableVideoDuration(entry.metadata) - video.mediaStart;
  if (!Number.isFinite(sourceDuration) || sourceDuration <= 0) return slotFrames;
  const sourceFrames = expectedFramesForClip(0, sourceDuration, fps, rounding);
  return Math.min(slotFrames, sourceFrames);
}
function computeVideoFrameCoverage(videos, extracted, fps) {
  const byId = /* @__PURE__ */ new Map();
  for (const entry of extracted) byId.set(entry.videoId, entry);
  const reports = [];
  for (const video of videos) {
    const entry = byId.get(video.id);
    const expectedFrames = expectedFramesForVideo(video, entry, fps);
    const capturedFrames = entry ? entry.framePaths.size : 0;
    const ratio = expectedFrames === 0 ? 1 : capturedFrames / expectedFrames;
    reports.push({
      videoId: video.id,
      clipStart: video.start,
      clipEnd: video.end,
      expectedFrames,
      capturedFrames,
      ratio
    });
  }
  return reports;
}
function assertVideoFrameCoverage(reports, threshold) {
  if (threshold === null) return;
  const failed = reports.filter(
    (report) => report.expectedFrames > 0 && report.ratio < threshold && !isToleratedShortClipBoundaryMiss(report, threshold)
  );
  if (failed.length === 0) return;
  const sorted = [...failed].sort((a, b) => a.ratio - b.ratio);
  const worst = sorted[0];
  const pct = (worst.ratio * 100).toFixed(1);
  const thresholdPct = (threshold * 100).toFixed(1);
  const suffix = sorted.length > 1 ? ` (+${sorted.length - 1} more clip(s) below threshold)` : "";
  throw new VideoFrameCoverageError(
    `Video "${worst.videoId}" captured ${worst.capturedFrames} of expected ${worst.expectedFrames} frames (coverage ${pct}%, threshold ${thresholdPct}%). check/snapshot may pass while the encoded MP4 renders this clip blank \u2014 aborting render to prevent shipping a wrong MP4.${suffix} Set HF_VIDEO_COVERAGE_THRESHOLD=0 to disable this gate.`,
    { threshold, worst, failedReports: sorted }
  );
}
function countAuthoredTimedClips(html) {
  const { document: document2 } = parseHTML(html);
  return document2.querySelectorAll("[data-start]").length;
}

// ../producer/src/services/render/stages/compileStage.ts
import { join as join13 } from "path";

// ../producer/src/services/htmlCompiler.ts
import { createHash as createHash4 } from "crypto";
import { createReadStream as createReadStream2, existsSync as existsSync9, mkdirSync as mkdirSync5, readFileSync as readFileSync5 } from "fs";
import { join as join12, dirname as dirname5, resolve as resolve5, basename as basename3, relative as relative2 } from "path";

// ../producer/src/services/renderMediaCollector.ts
var COMPOSITION_HOST_ATTR = "data-composition-file";
function resolveHostEnd(host, hostStart) {
  return resolveAuthoredTimingWindow({
    start: hostStart,
    duration: host.getAttribute("data-duration"),
    end: host.getAttribute("data-end")
  })?.end ?? null;
}
var ROOT_WINDOW = { offset: 0, limit: Infinity, basis: "local" };
function resolveHostWindow(element, document2, startCache, visiting) {
  const hosts = [];
  for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
    if (ancestor.hasAttribute(COMPOSITION_HOST_ATTR)) hosts.push(ancestor);
  }
  if (hosts.length === 0) return ROOT_WINDOW;
  let offset = 0;
  let limit = Infinity;
  for (const host of hosts.reverse()) {
    const hostStart = resolveReferencedStart(document2, host, startCache, visiting);
    const hostEnd = resolveHostEnd(host, hostStart);
    if (hostEnd != null) limit = Math.min(limit, offset + hostEnd);
    offset += hostStart;
  }
  const tag = element.tagName.toLowerCase();
  const basis = tag === "video" || tag === "audio" ? readMediaStartBasis(element.getAttribute(MEDIA_START_BASIS_ATTR)) : "local";
  return {
    offset,
    limit,
    basis
  };
}
function collectHostWindows(html) {
  const { document: document2 } = parseHTML(html);
  const windows = /* @__PURE__ */ new Map();
  const startCache = /* @__PURE__ */ new Map();
  const visiting = /* @__PURE__ */ new Set();
  for (const element of document2.querySelectorAll(`[${MEDIA_RENDER_ID_ATTR}]`)) {
    const renderId = element.getAttribute(MEDIA_RENDER_ID_ATTR);
    if (!renderId) continue;
    windows.set(
      renderId,
      resolveHostWindow(element, document2, startCache, visiting)
    );
  }
  return windows;
}
function toAbsoluteWindow(start, end, window2) {
  const absoluteStart = resolveAbsoluteMediaStartSeconds({
    authoredStart: start,
    hostStart: window2.offset,
    basis: window2.basis
  });
  if (absoluteStart >= window2.limit) return null;
  const absoluteEnd = resolveAbsoluteMediaStartSeconds({
    authoredStart: end,
    hostStart: window2.offset,
    basis: window2.basis
  });
  return { start: absoluteStart, end: Math.min(absoluteEnd, window2.limit) };
}
function collectRenderMedia(html) {
  const windows = collectHostWindows(html);
  const windowFor = (id) => windows.get(id) ?? ROOT_WINDOW;
  const videos = [];
  for (const video of parseVideoElements(html)) {
    const absolute = toAbsoluteWindow(video.start, video.end, windowFor(video.id));
    if (absolute) videos.push({ ...video, ...absolute });
  }
  const images = [];
  for (const image of parseImageElements(html)) {
    const absolute = toAbsoluteWindow(image.start, image.end, windowFor(image.id));
    if (absolute) images.push({ ...image, ...absolute });
  }
  const audios = [];
  for (const audio of parseAudioElements(html)) {
    const elementId = audio.type === "video" ? audio.id.replace(/-audio$/, "") : audio.id;
    const authoredEnd = audio.end > 0 ? audio.end : Infinity;
    const absolute = toAbsoluteWindow(audio.start, authoredEnd, windowFor(elementId));
    if (!absolute) continue;
    audios.push({
      ...audio,
      start: absolute.start,
      end: Number.isFinite(absolute.end) ? absolute.end : 0
    });
  }
  return { videos, audios, images };
}

// ../core/dist/generated/position-edits-render-inline.js
var POSITION_EDITS_RENDER_IIFE = '"use strict";(()=>{function T(){return globalThis}function P(e,t){if(typeof window>"u")return;let o=T(),r=o.__hf?.onSwallowed;if(r)try{r({label:e,error:t})}catch(s){}(o.__hfDebug||o.__HYPERFRAMES_DEBUG)&&console.debug(`[hyperframes] ${e} swallowed:`,t)}var x=null;function R(e,t){if(x)try{x({source:"hf-preview",type:"analytics",event:e,properties:t??{}})}catch(o){P("runtime.analytics.site1",o)}}var W="http://www.w3.org/1999/xhtml";function N(e){return e!=null&&e.nodeType===1}function _(e){return N(e)&&(e.namespaceURI===W||e.namespaceURI==="http://www.w3.org/2000/svg")}var w="data-hf-edit-base-x",y="data-hf-edit-base-y",m="data-hf-edit-original-translate",k=e=>{let t=parseFloat(e??"");return Number.isFinite(t)?t:0},O=e=>{let t=[],o=0,r="";for(let s of e.trim())s==="("&&(o+=1),s===")"&&(o=Math.max(0,o-1)),/\\s/.test(s)&&o===0?(r&&t.push(r),r=""):r+=s;return r&&t.push(r),t},L=/^-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)px$/,E=(e,t)=>L.test(e)&&L.test(t)?`${parseFloat(e)+parseFloat(t)}px`:`calc(${e} + ${t})`,V=(e,t,o)=>{if(!e||e==="none")return`${t} ${o}`;let[r,s,a]=O(e);if(r===void 0)return`${t} ${o}`;if(s===void 0)return`${E(r,t)} ${o}`;let i=a===void 0?"":` ${a}`;return`${E(r,t)} ${E(s,o)}${i}`},j=e=>{try{e.ownerDocument.defaultView?.gsap?.getProperty?.(e,"x")}catch{}},G=e=>{let t=e.style.getPropertyValue("translate").trim();if(t)return t==="none"?"":t;try{let o=e.ownerDocument.defaultView,r=o?o.getComputedStyle(e).getPropertyValue("translate").trim():"";return r==="none"?"":r}catch{return""}},b=new WeakMap;function B(e,t){let o=b.get(e);if(!t?.force&&o!==void 0&&e.style.getPropertyValue("translate")!==o){R("position_edit_fold_skipped",{hfId:e.getAttribute("data-hf-id")});return}let r=k(e.getAttribute("data-x"))-k(e.getAttribute(w)),s=k(e.getAttribute("data-y"))-k(e.getAttribute(y));e.hasAttribute(m)||e.setAttribute(m,G(e)),o===void 0&&j(e);let a=e.getAttribute(m)??"",i=V(a,`${r}px`,`${s}px`);e.style.setProperty("translate",i),b.set(e,e.style.getPropertyValue("translate"))}function S(e,t){let o=e.querySelectorAll(`[${m}]:not([${w}]):not([${y}])`);for(let a=0;a<o.length;a++){let i=o[a];if(i===void 0||!_(i))continue;let g=i.getAttribute(m)??"";g===""?i.style.removeProperty("translate"):i.style.setProperty("translate",g),i.removeAttribute(m),b.delete(i)}let r=e.querySelectorAll(`[${w}], [${y}]`),s=0;for(let a=0;a<r.length;a++){let i=r[a];i===void 0||!_(i)||(B(i,t),s+=1)}return s}var $="__hfPositionEditsSeekReapplyWrapped",D=new WeakSet,M=new WeakMap,H=new WeakMap;function F(e){let t=e,o=()=>{try{S(t.document)}catch{}},r=n=>typeof n=="function"&&(D.has(n)||!!n[$]),s=n=>{D.add(n);try{Object.defineProperty(n,$,{value:!0})}catch{}},a=n=>{if(typeof n!="function"||r(n))return n;let l=function(...u){let d=n.apply(this,u);return o(),d};return s(l),l},i=(n,l)=>{let u=M.get(n);if(u?.has(l))return!0;let d=Object.getOwnPropertyDescriptor(n,l);if(d?.configurable===!1){let c=n[l];return typeof c=="function"&&(n[l]=a(c),o()),!1}let p=n[l],f=d?.set;return Object.defineProperty(n,l,{configurable:!0,enumerable:d?.enumerable??!0,get:()=>p,set:c=>{p=a(c),f?.call(n,c)}}),p=a(p),u??(u=new Set),u.add(l),M.set(n,u),o(),!0},g=(n,l)=>{let u=H.get(t),d=Object.getOwnPropertyDescriptor(t,n);if(!u?.has(n)){if(d?.configurable===!1){let c=t[n];return c?i(c,l):!1}let f=t[n];Object.defineProperty(t,n,{configurable:!0,enumerable:d?.enumerable??!0,get:()=>f,set:c=>{f=c,f&&i(f,l)}}),u??(u=new Set),u.add(n),H.set(t,u)}let p=t[n];return p?i(p,l):!1},v=()=>{let n=g("__hf","seek"),l=g("__player","renderSeek");return n&&l};if(v())return;let h=120,A=t.setInterval(()=>{if(v()){t.clearInterval(A);return}h-=1,h<=0&&t.clearInterval(A)},50)}function I(){document.querySelector(`[${w}], [${y}]`)&&(S(document),F(window))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",I,{once:!0}):I();})();\n';
function getPositionEditsRenderScript() {
  return POSITION_EDITS_RENDER_IIFE;
}

// ../producer/src/services/assetMediaType.ts
import { existsSync as existsSync8 } from "fs";

// ../producer/src/utils/semaphore.ts
var Semaphore = class {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
  }
  maxConcurrent;
  queue = [];
  active = 0;
  async acquire() {
    if (this.active < this.maxConcurrent) {
      this.active++;
      return () => this.release();
    }
    return new Promise((resolve11) => {
      this.queue.push(() => {
        this.active++;
        resolve11(() => this.release());
      });
    });
  }
  release() {
    this.active--;
    const next = this.queue.shift();
    if (next) next();
  }
  /** Current number of active slots. */
  get activeCount() {
    return this.active;
  }
  /** Number of waiters in the queue. */
  get waitingCount() {
    return this.queue.length;
  }
};

// ../producer/src/utils/mediaProbeConcurrency.ts
var MEDIA_PROBE_CONCURRENCY = 4;
var sharedMediaProbeSemaphore = new Semaphore(MEDIA_PROBE_CONCURRENCY);
async function withMediaProbeSlot(operation) {
  const release = await sharedMediaProbeSemaphore.acquire();
  try {
    return await operation();
  } finally {
    release();
  }
}

// ../producer/src/services/assetMediaType.ts
var ASSET_MEDIA_TYPE_MISMATCH = "ASSET_MEDIA_TYPE_MISMATCH";
var AssetMediaTypeMismatchError = class extends Error {
  code = ASSET_MEDIA_TYPE_MISMATCH;
  owner = "user";
  retryable = false;
  mismatches;
  constructor(mismatches) {
    const expectedKinds = [...new Set(mismatches.map((item) => item.expected))].sort().join(",");
    super(
      `${mismatches.length} composition asset(s) do not match their authored media element type` + (expectedKinds ? ` (expected: ${expectedKinds})` : "")
    );
    this.name = "AssetMediaTypeMismatchError";
    this.mismatches = mismatches;
  }
};
function detectedAssetMediaType(profile) {
  if (profile.visualKind === "moving") return "video";
  if (profile.visualKind === "still") return "image";
  if (profile.hasAudioStream) return "audio";
  return "unknown";
}
function mediaProfileMatchesElementType(expected, profile) {
  if (expected === "audio") return profile.hasAudioStream;
  if (expected === "image") return profile.visualKind === "still";
  return profile.visualKind === "moving";
}
function assertAssetMediaTypeProfile(expected, profile, elementIdentity) {
  if (mediaProfileMatchesElementType(expected, profile)) return;
  throw new AssetMediaTypeMismatchError([
    {
      expected,
      detected: detectedAssetMediaType(profile),
      elementFingerprint: fingerprintElementId(elementIdentity)
    }
  ]);
}
function isRemoteOrInlineSource(src) {
  return /^(?:https?:|data:|blob:|about:)/i.test(src.trim());
}
async function preflightCompositionAssetMediaTypes(input) {
  const references = [
    ...input.composition.videos.map((asset) => ({
      id: asset.id,
      src: asset.src,
      expected: "video"
    })),
    ...input.composition.audios.map((asset) => ({
      id: asset.id,
      src: asset.src,
      expected: "audio"
    })),
    ...input.composition.images.map((asset) => ({
      id: asset.id,
      src: asset.src,
      expected: "image"
    }))
  ];
  const byPath = /* @__PURE__ */ new Map();
  for (const reference of references) {
    if (!reference.src || isRemoteOrInlineSource(reference.src)) continue;
    const resolvedPath = resolveProjectRelativeSrc(
      reference.src,
      input.projectDir,
      input.compiledDir
    );
    if (!existsSync8(resolvedPath)) continue;
    byPath.set(resolvedPath, [...byPath.get(resolvedPath) ?? [], reference]);
  }
  const mismatches = [];
  const notMediaFingerprints = [];
  const entries = [...byPath];
  await Promise.all(
    entries.map(
      ([resolvedPath, pathReferences]) => withMediaProbeSlot(async () => {
        const sniffableReferences = pathReferences.filter((ref) => ref.expected === "video");
        if (sniffableReferences.length > 0 && await isNotMediaPayload(resolvedPath)) {
          notMediaFingerprints.push(
            ...sniffableReferences.map((ref) => fingerprintElementId(ref.id))
          );
          return;
        }
        let profile;
        try {
          profile = await probeMediaProfile(resolvedPath, { signal: input.signal });
        } catch (error) {
          if (input.signal?.aborted) throw input.signal.reason ?? error;
          return;
        }
        for (const reference of pathReferences) {
          if (mediaProfileMatchesElementType(reference.expected, profile)) continue;
          mismatches.push({
            expected: reference.expected,
            detected: detectedAssetMediaType(profile),
            elementFingerprint: fingerprintElementId(reference.id)
          });
        }
      })
    )
  );
  if (notMediaFingerprints.length > 0) throw new NotMediaPayloadError(notMediaFingerprints);
  if (mismatches.length > 0) throw new AssetMediaTypeMismatchError(mismatches);
}

// ../producer/src/services/htmlCompiler.ts
function logRemoteDownloadTelemetry(event) {
  defaultLogger.info("[Compiler] Remote asset download integrity", { ...event });
}
var INFERRED_MEDIA_DURATION_ATTR = "data-hf-inferred-duration";
function parseSubCompHtmlForValidity(html) {
  return parseHTML(html).document;
}
function endsWithSourceUrl(code) {
  const trimmed = code.trimEnd();
  const lastLine = trimmed.slice(trimmed.lastIndexOf("\n") + 1).trimStart();
  return lastLine.startsWith("//# sourceURL=") || lastLine.startsWith("//@ sourceURL=");
}
function prepareCompositionScripts(html) {
  const { document: document2 } = parseHTML(html);
  for (const el of document2.querySelectorAll("script:not([src])")) {
    const isModule = (el.getAttribute("type") || "").trim().toLowerCase() === "module";
    const runsAsScript = isModule || isJavaScriptType(el);
    const code = el.textContent ?? "";
    if (!runsAsScript || endsWithSourceUrl(code)) continue;
    el.textContent = `${code}
//# sourceURL=${COMPOSITION_SOURCE_URL}`;
  }
  deferScriptsUntilFonts(document2);
  return document2.toString();
}
function injectSdkPositionEditsRenderScript(html) {
  if (!html.includes("data-hf-edit-base-x") && !html.includes("data-hf-edit-base-y")) {
    return html;
  }
  const scriptBody = getPositionEditsRenderScript().replace(/<\/script/gi, "<\\/script");
  const script = `<script>${scriptBody}
//# sourceURL=hyperframes://position-edits</script>`;
  return insertBeforeCloseTag(html, "body", script) ?? `${html}${script}`;
}
var EmptyCompositionError = class extends Error {
  code = "EMPTY_COMPOSITION";
  problems;
  constructor(problems) {
    const lines = problems.map((p) => `  - ${p.srcPath}: ${p.detail}`);
    super(
      `${problems.length} composition file${problems.length === 1 ? "" : "s"} referenced by data-composition-src cannot be rendered:
${lines.join("\n")}

Check that each file referenced by data-composition-src contains valid HTML with a [data-composition-id] element in a <template>, <body>, or bare fragment. If a scene-authoring step is still running, wait for it to finish before referencing the file.`
    );
    this.name = "EmptyCompositionError";
    this.problems = problems;
  }
};
function assertSubCompositionsUsable(html, projectDir, visited = /* @__PURE__ */ new Set()) {
  const { document: document2 } = parseHTML(html);
  const hosts = [...document2.querySelectorAll("[data-composition-src]")];
  const problems = [];
  for (const el of hosts) {
    const srcPath = el.getAttribute("data-composition-src");
    if (!srcPath) continue;
    if (isUnresolvedAssetPlaceholder(srcPath)) continue;
    const filePath = resolve5(projectDir, srcPath);
    if (visited.has(filePath)) continue;
    const read = readProjectFile(filePath);
    if (read.kind === "missing") {
      problems.push({ srcPath, detail: "the file does not exist" });
      continue;
    }
    if (read.kind === "folder") {
      problems.push({ srcPath, detail: "it is a folder, not an HTML file" });
      continue;
    }
    const fileHtml = read.text;
    const validity = checkSubCompositionUsability(fileHtml, parseSubCompHtmlForValidity);
    if (!validity.ok) {
      problems.push({
        srcPath,
        detail: validity.detail ?? "the file is empty or could not be parsed"
      });
      continue;
    }
    const nestedVisited = new Set(visited);
    nestedVisited.add(filePath);
    try {
      assertSubCompositionsUsable(fileHtml, projectDir, nestedVisited);
    } catch (err) {
      if (err instanceof EmptyCompositionError) {
        problems.push(...err.problems);
      } else {
        throw err;
      }
    }
  }
  if (problems.length > 0) {
    throw new EmptyCompositionError(problems);
  }
}
var INLINE_SCRIPT_PATTERN = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
var COMPILER_MOUNT_BLOCK_START = "/* __HF_COMPILER_MOUNT_START__ */";
var COMPILER_MOUNT_BLOCK_END = "/* __HF_COMPILER_MOUNT_END__ */";
function stripJsComments(source) {
  return source.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
}
function stripCompilerMountBootstrap(source) {
  return source.replace(
    new RegExp(
      `${COMPILER_MOUNT_BLOCK_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${COMPILER_MOUNT_BLOCK_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "g"
    ),
    ""
  );
}
function detectRenderModeHints(html) {
  const reasons = [];
  const { document: document2 } = parseHTML(html);
  if (document2.querySelector("canvas[layoutsubtree]")) {
    reasons.push({
      code: "htmlInCanvas",
      message: "Detected html-in-canvas API (layoutsubtree canvas). Chrome does not support concurrent drawElementImage across multiple workers; render is pinned to a single worker."
    });
  }
  if (document2.querySelector("iframe")) {
    reasons.push({
      code: "iframe",
      message: "Detected <iframe> in the composition DOM. Nested iframe animation is routed through screenshot capture mode for compatibility."
    });
  }
  let scriptMatch;
  const scriptPattern = new RegExp(INLINE_SCRIPT_PATTERN.source, INLINE_SCRIPT_PATTERN.flags);
  while ((scriptMatch = scriptPattern.exec(html)) !== null) {
    const attrs = scriptMatch[1] || "";
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const content = stripJsComments(stripCompilerMountBootstrap(scriptMatch[2] || ""));
    if (!/requestAnimationFrame\s*\(/.test(content)) continue;
    reasons.push({
      code: "requestAnimationFrame",
      message: "Detected raw requestAnimationFrame() in an inline script. This render is routed through screenshot capture mode with virtual time enabled."
    });
    break;
  }
  return {
    recommendScreenshot: reasons.length > 0,
    reasons
  };
}
var THREE_D_CONTEXT_PATTERN = /transform-style\s*:\s*preserve-3d|backface-visibility\s*:|perspective\s*:\s*[0-9]|perspective\s*\(|matrix3d\s*\(|rotate3d\s*\(|\btransformPerspective\b/i;
function detectThreeDTransformUsage(html) {
  return THREE_D_CONTEXT_PATTERN.test(html);
}
var MIX_BLEND_MODE_PATTERN = /mix-blend-mode\s*:/i;
function detectMixBlendModeUsage(html) {
  return MIX_BLEND_MODE_PATTERN.test(html);
}
var BACKGROUND_IMAGE_DECL_PATTERN = /(?:^|;|\{)\s*background(?:-image)?\s*:[^;}]*(?:\bgradient\s*\(|url\s*\()/i;
function detectAncestorBackgroundImage(html) {
  const { document: document2 } = parseHTML(html);
  const root = document2.querySelector("[data-composition-id]");
  if (!root) return false;
  const ancestors = [];
  for (let el = root.parentElement; el; el = el.parentElement) ancestors.push(el);
  if (document2.documentElement && !ancestors.includes(document2.documentElement)) {
    ancestors.push(document2.documentElement);
  }
  for (const el of ancestors) {
    const style = el.getAttribute("style");
    if (style && BACKGROUND_IMAGE_DECL_PATTERN.test(`{${style}}`)) return true;
  }
  for (const styleEl of document2.querySelectorAll("style")) {
    const css = styleEl.textContent ?? "";
    for (const rule of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const [, selectorList = "", declarations = ""] = rule;
      if (!BACKGROUND_IMAGE_DECL_PATTERN.test(`{${declarations}}`)) continue;
      for (const selector of selectorList.split(",")) {
        const sel = selector.trim();
        if (!sel || sel.startsWith("@")) continue;
        if (/^(?:html|:root)$/i.test(sel)) return true;
        try {
          for (const matched of document2.querySelectorAll(sel)) {
            if (ancestors.includes(matched)) return true;
          }
        } catch {
        }
      }
    }
  }
  return false;
}
var SHADER_TRANSITION_USAGE_PATTERN = /\b(?:(?:window|globalThis)\s*\.\s*)?HyperShader\s*\.\s*init\s*\(|\b__hf\s*\.\s*transitions\s*=/;
function detectShaderTransitionUsage(html) {
  let scriptMatch;
  const scriptPattern = new RegExp(INLINE_SCRIPT_PATTERN.source, INLINE_SCRIPT_PATTERN.flags);
  while ((scriptMatch = scriptPattern.exec(html)) !== null) {
    const attrs = scriptMatch[1] || "";
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const content = stripJsComments(stripCompilerMountBootstrap(scriptMatch[2] || ""));
    if (SHADER_TRANSITION_USAGE_PATTERN.test(content)) return true;
  }
  return false;
}
async function resolveMediaDuration(src, mediaStart, playbackRate, baseDir, downloadDir, tagName, elementIdentity, log) {
  let filePath = src;
  if (isHttpUrl(src)) {
    if (!existsSync9(downloadDir)) mkdirSync5(downloadDir, { recursive: true });
    try {
      filePath = await downloadToTemp(src, downloadDir, void 0, void 0, void 0, {
        onTelemetry: logRemoteDownloadTelemetry
      });
    } catch {
      return { duration: null, resolvedPath: src };
    }
  } else if (!filePath.startsWith("/")) {
    filePath = join12(baseDir, filePath);
  }
  if (!existsSync9(filePath)) {
    return { duration: null, resolvedPath: filePath };
  }
  const withSrcContext = (error) => {
    if (error instanceof NotMediaPayloadError) return error;
    const originalMessage = error instanceof Error ? error.message : String(error);
    const safeSrc = redactTelemetryString(src);
    const wrapped = new Error(`${originalMessage} [src=${safeSrc}]`);
    if (error instanceof Error && error.stack) wrapped.stack = error.stack;
    return wrapped;
  };
  return withMediaProbeSlot(async () => {
    let profile;
    try {
      await assertMediaPayload(filePath, elementIdentity);
      profile = await probeMediaProfile(filePath);
    } catch (error) {
      if (tagName !== "video") {
        if (error instanceof NotMediaPayloadError) {
          log?.warn(
            `[compile] Audio "${elementIdentity}" (${src}) is a text document, not a media file \u2014 the element is dropped from the render. Point it at a rendered media file.`
          );
        }
        return { duration: null, resolvedPath: filePath };
      }
      throw withSrcContext(error);
    }
    assertAssetMediaTypeProfile(tagName === "video" ? "video" : "audio", profile, elementIdentity);
    let metadata;
    if (tagName === "video") {
      try {
        metadata = await extractMediaMetadata(filePath);
      } catch (error) {
        throw withSrcContext(error);
      }
    } else {
      try {
        metadata = await extractAudioMetadata(filePath);
      } catch {
        return { duration: null, resolvedPath: filePath };
      }
    }
    const fileDuration = metadata.durationSeconds;
    const duration = resolveNaturalMediaTimelineDurationFromValues(
      fileDuration,
      mediaStart,
      playbackRate
    );
    return { duration, resolvedPath: filePath };
  });
}
function markInferredVariableMediaDurations(html, unresolvedMedia) {
  const unresolvedIds = new Set(unresolvedMedia.map((element) => element.id));
  if (unresolvedIds.size === 0) return html;
  const { document: document2 } = parseHTML(html);
  let changed = false;
  for (const element of document2.querySelectorAll("video[data-var-src], audio[data-var-src]")) {
    if (!unresolvedIds.has(element.id)) continue;
    element.setAttribute(INFERRED_MEDIA_DURATION_ATTR, "");
    changed = true;
  }
  return changed ? document2.toString() : html;
}
async function compileHtmlFile(html, baseDir, downloadDir, log) {
  const { html: staticCompiled, unresolved } = compileTimingAttrs(html);
  const mediaUnresolved = unresolved.filter(
    (el) => (el.tagName === "video" || el.tagName === "audio") && el.src
  );
  const unresolvedCompositions = unresolved.filter((el) => el.tagName === "div");
  const resolvedResults = await Promise.all(
    mediaUnresolved.map(
      (el) => resolveMediaDuration(
        el.src,
        el.mediaStart,
        el.playbackRate,
        baseDir,
        downloadDir,
        el.tagName,
        el.id,
        log
      ).then(({ duration }) => ({ id: el.id, duration }))
    )
  );
  const resolutions = resolvedResults.filter(
    (r) => r.duration != null && Number.isFinite(r.duration)
  );
  const markedStaticHtml = markInferredVariableMediaDurations(staticCompiled, mediaUnresolved);
  let compiledHtml = resolutions.length > 0 ? injectDurations(markedStaticHtml, resolutions) : markedStaticHtml;
  const preResolved = extractResolvedMedia(compiledHtml);
  const clampResults = await Promise.all(
    preResolved.filter((el) => !!el.src && !el.loop).map(async (el) => {
      const { duration: maxDuration } = await resolveMediaDuration(
        el.src,
        el.mediaStart,
        el.playbackRate,
        baseDir,
        downloadDir,
        el.tagName,
        el.id,
        log
      );
      return { id: el.id, tagName: el.tagName, duration: el.duration, maxDuration, src: el.src };
    })
  );
  const clampList = [];
  for (const r of clampResults) {
    if (r.maxDuration != null && shouldClampResolvedMediaDuration(r.tagName, r.duration, r.maxDuration)) {
      clampList.push({ id: r.id, duration: r.maxDuration });
      log?.warn(
        `[compile] Audio "${r.id}" (${r.src}) is ${r.maxDuration.toFixed(2)}s but its data-duration is ${r.duration.toFixed(2)}s \u2014 the slot is shortened to the media length. Set data-duration to ~${r.maxDuration.toFixed(2)}s, trim data-media-start, or use a longer/looping source if that isn't intended.`
      );
    }
  }
  if (clampList.length > 0) {
    compiledHtml = clampDurations(compiledHtml, clampList);
  }
  compiledHtml = compiledHtml.replace(/(<video\b[^>]*)\s+crossorigin(?:=["'][^"']*["'])?/gi, "$1");
  compiledHtml = compiledHtml.replace(/(<img\b[^>]*)\s+crossorigin(?:=["'][^"']*["'])?/gi, "$1");
  compiledHtml = compiledHtml.replace(/(<audio\b[^>]*)\s+crossorigin(?:=["'][^"']*["'])?/gi, "$1");
  return { html: compiledHtml, unresolvedCompositions };
}
async function parseSubCompositions(html, projectDir, downloadDir, visited = /* @__PURE__ */ new Set()) {
  const subCompositions = /* @__PURE__ */ new Map();
  const { document: document2 } = parseHTML(html);
  const compEls = document2.querySelectorAll("[data-composition-src]");
  const workItems = [];
  for (const el of compEls) {
    const srcPath = el.getAttribute("data-composition-src");
    if (!srcPath) continue;
    const filePath = resolve5(projectDir, srcPath);
    if (visited.has(filePath)) {
      continue;
    }
    const read = readProjectFile(filePath);
    if (read.kind !== "file") {
      continue;
    }
    const rawSubHtml = read.text;
    const nestedVisited = new Set(visited);
    nestedVisited.add(filePath);
    workItems.push({ srcPath, filePath, rawSubHtml, nestedVisited });
  }
  const results = await Promise.all(
    workItems.map(async (item) => {
      const { html: compiledSub } = await compileHtmlFile(
        item.rawSubHtml,
        dirname5(item.filePath),
        downloadDir
      );
      const nested = await parseSubCompositions(
        compiledSub,
        projectDir,
        downloadDir,
        item.nestedVisited
      );
      return {
        srcPath: item.srcPath,
        compiledSub,
        nested
      };
    })
  );
  for (const r of results) {
    subCompositions.set(r.srcPath, r.compiledSub);
    for (const [key, value] of r.nested.subCompositions) {
      subCompositions.set(key, value);
    }
  }
  return { subCompositions };
}
function promoteCssImportsToLinkTags(html) {
  const { document: document2 } = parseHTML(html);
  const head = document2.querySelector("head");
  if (!head) return html;
  const importRe = /@import\s+url\(\s*['"]?([^'")\s]+)['"]?\s*\)\s*;?/gi;
  const seenUrls = /* @__PURE__ */ new Set();
  const styleEls = document2.querySelectorAll("style");
  for (const styleEl of styleEls) {
    const original = styleEl.textContent || "";
    let modified = original;
    let match;
    importRe.lastIndex = 0;
    while ((match = importRe.exec(original)) !== null) {
      const url = match[1] ?? "";
      if (!url.startsWith("http://") && !url.startsWith("https://")) continue;
      if (seenUrls.has(url)) {
        modified = modified.replace(match[0], "");
        continue;
      }
      seenUrls.add(url);
      modified = modified.replace(match[0], "");
      const preload = document2.createElement("link");
      preload.setAttribute("rel", "preload");
      preload.setAttribute("href", url);
      preload.setAttribute("as", "style");
      head.appendChild(preload);
      const link = document2.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", url);
      head.appendChild(link);
    }
    if (modified !== original) {
      styleEl.textContent = modified;
    }
  }
  return document2.toString();
}
var ProducerHostIdentityMap = class extends Map {
  #document;
  #lateInstanceByCompositionId = /* @__PURE__ */ new Map();
  constructor(document2, initialHosts) {
    super(assignBundledRuntimeCompositionIds(initialHosts));
    this.#document = document2;
  }
  get(host) {
    const existing = super.get(host);
    if (existing) return existing;
    const authoredCompositionId = (host.getAttribute("data-hf-original-composition-id") || host.getAttribute("data-composition-id") || "").trim() || null;
    if (!authoredCompositionId) {
      const identity2 = { authoredCompositionId: null, runtimeCompositionId: null };
      this.set(host, identity2);
      return identity2;
    }
    let instanceIndex = this.#lateInstanceByCompositionId.get(authoredCompositionId) || 0;
    let runtimeCompositionId;
    do {
      instanceIndex += 1;
      runtimeCompositionId = `${authoredCompositionId}__hf${instanceIndex}`;
    } while (Array.from(this.#document.querySelectorAll("[data-composition-id]")).some(
      (element) => element !== host && element.getAttribute("data-composition-id") === runtimeCompositionId
    ));
    this.#lateInstanceByCompositionId.set(authoredCompositionId, instanceIndex);
    host.setAttribute("data-hf-original-composition-id", authoredCompositionId);
    host.setAttribute("data-composition-id", runtimeCompositionId);
    const identity = { authoredCompositionId, runtimeCompositionId };
    this.set(host, identity);
    return identity;
  }
};
function coalesceHeadStylesAndBodyScripts(html) {
  const { document: document2 } = parseHTML(html);
  const head = document2.querySelector("head");
  const body = document2.querySelector("body");
  if (!head) return html;
  const styleEls = Array.from(head.querySelectorAll("style"));
  const importRe = /@import\s+url\([^)]*\)\s*;|@import\s+["'][^"']+["']\s*;/gi;
  for (const run of styleEls.length > 1 ? headStyleRuns(styleEls) : []) {
    const imports = [];
    const cssParts = [];
    const seenImports = /* @__PURE__ */ new Set();
    for (const el of run) {
      const raw = (el.textContent || "").trim();
      if (!raw) continue;
      const nonImportCss = raw.replace(importRe, (match) => {
        const cleaned = match.trim();
        if (!seenImports.has(cleaned)) {
          seenImports.add(cleaned);
          imports.push(cleaned);
        }
        return "";
      });
      const trimmedCss = nonImportCss.trim();
      if (trimmedCss) cssParts.push(trimmedCss);
    }
    const mergedCss = [...imports, ...cssParts].join("\n\n").trim();
    if (!mergedCss) continue;
    run[0].textContent = mergedCss;
    for (const el of run.slice(1)) el.remove();
  }
  if (body) {
    for (const { members, anchor } of inlineScriptRuns(
      Array.from(body.querySelectorAll("script"))
    )) {
      const mergedJs = members.map((el) => (el.textContent || "").trim()).filter(Boolean).join("\n;\n").trim();
      for (const el of members) el.remove();
      if (!mergedJs) continue;
      const script = document2.createElement("script");
      script.textContent = mergedJs;
      if (anchor) anchor.before(script);
      else body.appendChild(script);
    }
  }
  return document2.toString();
}
function inlineSubCompositions2(html, subCompositions, projectDir, variableOverrides = {}) {
  const { document: document2 } = parseHTML(html);
  const head = document2.querySelector("head");
  const body = document2.querySelector("body");
  const hosts = Array.from(document2.querySelectorAll("[data-composition-src]"));
  if (!hosts.length) {
    const emitted = emitRootCompositionVariableStyles(
      document2,
      {},
      variableOverrides
    );
    return emitted ? document2.toString() : html;
  }
  const hostIdentityByElement = new ProducerHostIdentityMap(
    document2,
    hosts
  );
  const result = inlineSubCompositions(
    document2,
    hosts,
    {
      // hostIdentityMap gives each repeated mount a unique runtime id; the
      // shared inliner's default buildScopeSelector already scopes by
      // `[data-composition-id="<runtime id>"]`, matching the preview bundler.
      hostIdentityMap: hostIdentityByElement,
      readVariableDefaults: readDeclaredDefaults,
      parseHostVariables: parseHostVariableValues,
      resolveHtml: (srcPath) => {
        let compHtml = subCompositions.get(srcPath) || null;
        if (!compHtml) {
          const read = readProjectFile(resolve5(projectDir, srcPath));
          if (read.kind === "file") compHtml = read.text;
        }
        return compHtml;
      },
      parseHtml: (htmlStr) => parseHTML(htmlStr).document,
      // Mirrors the preview bundler: a sub-composition's SIBLING assets resolve
      // against its own directory, project-root refs stay as authored.
      assetExists: (path) => existsSync9(resolve5(projectDir, path)),
      // Preserve the authored root wrapper as a child of the host, matching
      // the preview bundler's shape (htmlBundler.ts's prepareFlattenedInnerRoot,
      // which the runtime compositionLoader mirrors with its own copy for the
      // live-loaded case). Without this, the wrapper element (and its
      // class/id) is discarded and any CSS anchored on it —
      // `.wrapper-class .title`, `#wrapper-id` — is dead at render time even
      // though it works in preview.
      flattenInnerRoot: prepareFlattenedInnerRoot,
      onMissingComposition: (srcPath, reason) => {
        console.warn(
          `[Compiler] Skipping sub-composition "${srcPath}": ${reason ?? "the file is missing or empty"}.`
        );
      }
    }
  );
  for (const host of hosts) {
    const hostW = host.getAttribute("data-width");
    const hostH = host.getAttribute("data-height");
    if (hostW && hostH) {
      const existing = host.getAttribute("style") || "";
      const needsWidth = !existing.includes("width");
      const needsHeight = !existing.includes("height");
      const additions = [
        needsWidth ? `width:${hostW}px` : "",
        needsHeight ? `height:${hostH}px` : ""
      ].filter(Boolean).join(";");
      if (additions) {
        host.setAttribute("style", existing ? `${existing};${additions}` : additions);
      }
    }
  }
  if (head) for (const link of result.externalLinks) ensureExternalLinkTag(document2, link);
  if (head) {
    for (const style of styleElementsFor(document2, result.styles, (css) => css.join("\n\n"))) {
      head.appendChild(style);
    }
  }
  const isHoisted = (item) => Boolean(item.integrity?.trim()) || isNonRelativeUrl(item.src);
  if (body) {
    for (const item of result.scriptItems) {
      if (item.kind === "external" && isHoisted(item)) {
        ensureExternalScriptTag(document2, item.src, item);
      }
    }
  }
  const variablesByCompScript = buildVariablesByCompScript(result.variablesByComp);
  if (body) {
    let pending = variablesByCompScript ? [variablesByCompScript] : [];
    const flushInline = () => {
      if (!pending.length) return;
      const scriptEl = document2.createElement("script");
      scriptEl.textContent = pending.join("\n;\n");
      body.appendChild(scriptEl);
      pending = [];
    };
    for (const item of result.scriptItems) {
      if (item.kind === "inline") {
        pending.push(item.content);
      } else if (!isHoisted(item)) {
        flushInline();
        ensureExternalScriptTag(document2, item.src, item);
      }
    }
    flushInline();
  }
  if (body) {
    emitMountedModuleScripts(
      document2,
      result.importMaps,
      result.moduleScripts
    );
  }
  emitRootCompositionVariableStyles(
    document2,
    result.variablesByComp,
    variableOverrides
  );
  assignMediaRenderIds(document2);
  return document2.toString();
}
function ensureFullDocument(html) {
  const trimmed = html.trim();
  if (/^<!DOCTYPE\s+html/i.test(trimmed) || /^<html/i.test(trimmed)) {
    return html;
  }
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>*{margin:0;padding:0;box-sizing:border-box;text-rendering:geometricPrecision}body{overflow:hidden;background:#000;font-family:"Inter",sans-serif}</style>
</head>
<body style="margin:0;overflow:hidden">
${html}
</body>
</html>`;
}
function injectTextRenderingRule(html) {
  const { document: document2 } = parseHTML(html);
  const head = document2.querySelector("head");
  if (!head) return html;
  if (document2.querySelector("style[data-hyperframes-text-rendering]")) {
    return html;
  }
  const styleEl = document2.createElement("style");
  styleEl.setAttribute("data-hyperframes-text-rendering", "true");
  styleEl.textContent = "html,body,*{text-rendering:geometricPrecision}";
  head.insertBefore(styleEl, head.firstChild);
  return document2.toString();
}
var ScriptIntegrityError = class extends Error {
};
function matchesScriptIntegrity(bytes, metadata) {
  const hashes = [
    ...metadata.matchAll(
      /(?:^|[\t\n\f\r ])(sha256|sha384|sha512)-([A-Za-z0-9+/_-]+={0,2})(?:\?[\x21-\x7e]*)?(?=$|[\t\n\f\r ])/gi
    )
  ];
  const strongest = ["sha512", "sha384", "sha256"].find(
    (alg) => hashes.some((hash) => hash[1]?.toLowerCase() === alg)
  );
  if (!strongest) return true;
  const actual = createHash4(strongest).update(bytes).digest();
  return hashes.some(
    (hash) => hash[1]?.toLowerCase() === strongest && actual.equals(Buffer.from(hash[2], "base64"))
  );
}
async function inlineExternalScripts(html) {
  const fullHtml = ensureFullDocument(html);
  const wrappedFragment = fullHtml !== html;
  const { document: document2 } = parseHTML(fullHtml);
  const scripts = document2.querySelectorAll("script[src]");
  const externalScripts = [];
  for (const el of scripts) {
    const src = (el.getAttribute("src") || "").trim();
    if (src && isHttpUrl(src) && !isRuntimeFileUrl(src)) {
      externalScripts.push({ el, src });
    }
  }
  if (externalScripts.length === 0) return html;
  const downloads = await Promise.allSettled(
    externalScripts.map(async ({ el, src }) => {
      const response = await fetch(src, {
        signal: AbortSignal.timeout(15e3)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${src}`);
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (!matchesScriptIntegrity(bytes, el.getAttribute("integrity") || "")) {
        throw new ScriptIntegrityError(`Subresource integrity mismatch for ${src}`);
      }
      return { src, text: new TextDecoder().decode(bytes) };
    })
  );
  for (let i = 0; i < downloads.length; i++) {
    const download = downloads[i];
    const { el, src } = externalScripts[i];
    if (download.status === "fulfilled") {
      const safeText = download.value.text.replace(/<\/script/gi, "<\\/script");
      const inlineScript = document2.createElement("script");
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.toLowerCase() === "src") continue;
        inlineScript.setAttribute(attr.name, attr.value);
      }
      inlineScript.textContent = `/* inlined: ${src} */
${safeText}
//# sourceURL=${new URL(src).href}
`;
      el.replaceWith(inlineScript);
      defaultLogger.info(`[Compiler] Inlined CDN script: ${src}`);
    } else {
      if (download.reason instanceof ScriptIntegrityError) throw download.reason;
      defaultLogger.warn(
        `[Compiler] WARNING: Failed to download CDN script: ${src} \u2014 ${download.reason}. The render may fail if this script is required (e.g. GSAP). Consider bundling it locally in your project.`
      );
    }
  }
  return wrappedFragment ? document2.body.innerHTML || "" : document2.toString();
}
function collectExternalAssets(html, projectDir) {
  const absProjectDir = resolve5(projectDir);
  const externalAssets = /* @__PURE__ */ new Map();
  function processPath(rawPath) {
    const trimmed = rawPath.trim();
    if (isNonRelativeUrl(trimmed)) return null;
    const absPath = resolve5(absProjectDir, trimmed);
    if (isPathInside2(absPath, absProjectDir)) {
      return null;
    }
    if (!existsSync9(absPath)) return null;
    const safeKey = toExternalAssetKey(absPath);
    externalAssets.set(safeKey, absPath);
    return safeKey;
  }
  const { document: document2 } = parseHTML(html);
  for (const el of document2.querySelectorAll("[src], [href]")) {
    for (const attr of ["src", "href"]) {
      const val = (el.getAttribute(attr) || "").trim();
      if (!val) continue;
      const rewritten = processPath(val);
      if (rewritten) el.setAttribute(attr, rewritten);
    }
  }
  for (const styleEl of document2.querySelectorAll("style")) {
    const css = styleEl.textContent || "";
    if (!css.includes("url(")) continue;
    const rewritten = css.replace(CSS_URL_RE, (full, quote, rawUrl) => {
      const result = processPath((rawUrl || "").trim());
      if (!result) return full;
      return `url(${quote || ""}${result}${quote || ""})`;
    });
    if (rewritten !== css) styleEl.textContent = rewritten;
  }
  for (const el of document2.querySelectorAll("[style]")) {
    const style = el.getAttribute("style") || "";
    if (!style.includes("url(")) continue;
    const rewritten = style.replace(CSS_URL_RE, (full, quote, rawUrl) => {
      const result = processPath((rawUrl || "").trim());
      if (!result) return full;
      return `url(${quote || ""}${result}${quote || ""})`;
    });
    if (rewritten !== style) el.setAttribute("style", rewritten);
  }
  if (externalAssets.size > 0) {
    defaultLogger.info(
      `[Compiler] Found ${externalAssets.size} asset(s) outside project directory \u2014 will copy to render output`
    );
  }
  return {
    html: externalAssets.size > 0 ? document2.toString() : html,
    externalAssets
  };
}
var REMOTE_MEDIA_SUBDIR = "_remote_media";
var REMOTE_MEDIA_TAG_RE = /<(?:video|audio)\b[^>]*?\bsrc\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>/gi;
var REMOTE_SOURCE_TAG_RE = /<source\b[^>]*?\bsrc\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>/gi;
var REMOTE_IMG_TAG_RE = /<img\b[^>]*?(?<![\w-])src\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>/gi;
async function downloadAndRewriteUrls(urlSet, html, remoteDir, warnLabel, logLabel, extraRewrite) {
  if (urlSet.size === 0) return { html, remoteMediaAssets: /* @__PURE__ */ new Map() };
  if (!existsSync9(remoteDir)) mkdirSync5(remoteDir, { recursive: true });
  const urlToLocal = /* @__PURE__ */ new Map();
  await Promise.all(
    [...urlSet].map(async (url) => {
      try {
        const localPath = await downloadToTemp(url, remoteDir, void 0, void 0, void 0, {
          onTelemetry: logRemoteDownloadTelemetry
        });
        urlToLocal.set(url, localPath);
      } catch (err) {
        const identity = safeDownloadUrlIdentity(url);
        defaultLogger.warn(`[Compiler] ${warnLabel} \u2014 using original URL as fallback.`, {
          urlFingerprint: identity.urlFingerprint,
          host: identity.host,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    })
  );
  if (urlToLocal.size === 0) return { html, remoteMediaAssets: /* @__PURE__ */ new Map() };
  const remoteMediaAssets = /* @__PURE__ */ new Map();
  const urlToRelPath = /* @__PURE__ */ new Map();
  for (const [url, absPath] of urlToLocal) {
    const relPath = `${REMOTE_MEDIA_SUBDIR}/${basename3(absPath)}`;
    remoteMediaAssets.set(relPath, absPath);
    urlToRelPath.set(url, relPath);
  }
  let result = html;
  for (const [url, relPath] of urlToRelPath) {
    result = result.replaceAll(`"${url}"`, `"${relPath}"`).replaceAll(`'${url}'`, `'${relPath}'`);
    if (extraRewrite) result = extraRewrite(result, url, relPath);
  }
  defaultLogger.info(`[Compiler] ${logLabel} ${urlToLocal.size} to ${REMOTE_MEDIA_SUBDIR}/`);
  return { html: result, remoteMediaAssets };
}
async function localizeRemoteMediaSources(html, downloadDir) {
  const urlSet = /* @__PURE__ */ new Set();
  for (const tagRe of [REMOTE_MEDIA_TAG_RE, REMOTE_SOURCE_TAG_RE]) {
    const re = new RegExp(tagRe.source, tagRe.flags);
    let m;
    while ((m = re.exec(html)) !== null) {
      if (m[1]) urlSet.add(m[1]);
    }
  }
  return downloadAndRewriteUrls(
    urlSet,
    html,
    join12(downloadDir, REMOTE_MEDIA_SUBDIR),
    "Remote media download failed",
    "Localized remote media source(s)"
  );
}
async function localizeRemoteImageSources(html, downloadDir) {
  const urlSet = /* @__PURE__ */ new Set();
  const re = new RegExp(REMOTE_IMG_TAG_RE.source, REMOTE_IMG_TAG_RE.flags);
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[1]) urlSet.add(m[1]);
  }
  return downloadAndRewriteUrls(
    urlSet,
    html,
    join12(downloadDir, REMOTE_MEDIA_SUBDIR),
    "Remote image download failed",
    "Localized remote image source(s)"
  );
}
var REMOTE_BG_URL_RE = /background(?:-image)?\s*:\s*[^;}"']*?url\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)/gi;
async function localizeRemoteBackgroundImages(html, downloadDir) {
  const urlSet = /* @__PURE__ */ new Set();
  const re = new RegExp(REMOTE_BG_URL_RE.source, REMOTE_BG_URL_RE.flags);
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m[1] && !isGoogleFontsUrl(m[1])) urlSet.add(m[1]);
  }
  return downloadAndRewriteUrls(
    urlSet,
    html,
    join12(downloadDir, REMOTE_MEDIA_SUBDIR),
    "Remote background-image download failed",
    "Localized remote background-image(s)",
    // Quoted url('..')/url("..") are rewritten by downloadAndRewriteUrls' default
    // replaceAll; this handles the unquoted url(https://..) form.
    (h, url, rel) => h.replaceAll(`url(${url})`, `url(${rel})`)
  );
}
var REMOTE_FONTFACE_URL_RE = /url\(["']?(https?:\/\/[^"')]+)["']?\)/gi;
function isGoogleFontsUrl(href) {
  try {
    const host = new URL(href).hostname.toLowerCase();
    return host === "fonts.googleapis.com" || host === "fonts.gstatic.com";
  } catch {
    return /fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(href);
  }
}
var MAX_STYLESHEET_BYTES = 2 * 1024 * 1024;
async function fetchExternalStylesheetCss(href) {
  const identity = safeDownloadUrlIdentity(href);
  try {
    return await fetchPublicHttpsText(href, {
      maxBytes: MAX_STYLESHEET_BYTES,
      timeoutMs: 15e3
    });
  } catch (err) {
    defaultLogger.warn("[Compiler] External stylesheet fetch failed \u2014 preserving link tag.", {
      urlFingerprint: identity.urlFingerprint,
      host: identity.host,
      error: err instanceof Error ? err.message : String(err)
    });
    return null;
  }
}
function extractFontFaceBlocks(css) {
  const blocks = [];
  const atRule = /@font-face\s*/gi;
  let m;
  while ((m = atRule.exec(css)) !== null) {
    const openIdx = css.indexOf("{", m.index + m[0].length);
    if (openIdx === -1) break;
    let depth = 1;
    let i = openIdx + 1;
    for (; i < css.length && depth > 0; i++) {
      if (css[i] === "{") depth++;
      else if (css[i] === "}") depth--;
    }
    if (depth === 0) {
      blocks.push(css.slice(m.index, i));
      atRule.lastIndex = i;
    }
  }
  return blocks;
}
async function inlineExternalFontStylesheets(html) {
  const linkRe = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi;
  const hrefRe = /\bhref=["']([^"']+)["']/i;
  const linkMatches = [];
  let linkMatch;
  while ((linkMatch = linkRe.exec(html)) !== null) {
    const tag = linkMatch[0];
    const hrefMatch = hrefRe.exec(tag);
    if (!hrefMatch?.[1]) continue;
    const href = hrefMatch[1];
    if (!/^https?:\/\//i.test(href)) continue;
    if (isGoogleFontsUrl(href)) continue;
    linkMatches.push({ fullMatch: tag, href });
  }
  if (linkMatches.length === 0) return html;
  const MAX_CONCURRENT_STYLESHEET_FETCHES = 4;
  const fetches = [];
  for (let i = 0; i < linkMatches.length; i += MAX_CONCURRENT_STYLESHEET_FETCHES) {
    const batch = linkMatches.slice(i, i + MAX_CONCURRENT_STYLESHEET_FETCHES);
    const results = await Promise.all(
      batch.map(async ({ fullMatch, href }) => {
        const css = await fetchExternalStylesheetCss(href);
        return { fullMatch, href, css };
      })
    );
    fetches.push(...results);
  }
  let result = html;
  for (const { fullMatch, href, css } of fetches) {
    if (css === null) continue;
    const fontFaceBlocks = extractFontFaceBlocks(css);
    if (fontFaceBlocks.length === 0) continue;
    const identity = safeDownloadUrlIdentity(href);
    const inlineStyle = `<style>/* Inlined external font stylesheet */
${fontFaceBlocks.join("\n")}
</style>`;
    result = result.replace(fullMatch, inlineStyle);
    defaultLogger.info("[Compiler] Inlined external @font-face rule(s)", {
      count: fontFaceBlocks.length,
      urlFingerprint: identity.urlFingerprint,
      host: identity.host
    });
  }
  return result;
}
function collectFontFaceUrls(html) {
  const styleBlockRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  const urlSet = /* @__PURE__ */ new Set();
  let styleMatch;
  while ((styleMatch = styleBlockRe.exec(html)) !== null) {
    const cssText = styleMatch[1] ?? "";
    let i = 0;
    while (i < cssText.length) {
      const atIdx = cssText.indexOf("@font-face", i);
      if (atIdx === -1) break;
      const braceStart = cssText.indexOf("{", atIdx);
      if (braceStart === -1) break;
      let depth = 1;
      let j = braceStart + 1;
      while (j < cssText.length && depth > 0) {
        if (cssText[j] === "{") depth++;
        else if (cssText[j] === "}") depth--;
        j++;
      }
      const block = cssText.slice(braceStart + 1, j - 1);
      const urlRe = new RegExp(REMOTE_FONTFACE_URL_RE.source, REMOTE_FONTFACE_URL_RE.flags);
      let urlMatch;
      while ((urlMatch = urlRe.exec(block)) !== null) {
        if (urlMatch[1]) urlSet.add(urlMatch[1]);
      }
      i = j;
    }
  }
  return urlSet;
}
async function localizeRemoteFontFaces(html, downloadDir) {
  const processed = await inlineExternalFontStylesheets(html);
  const urlSet = collectFontFaceUrls(processed);
  return downloadAndRewriteUrls(
    urlSet,
    processed,
    join12(downloadDir, REMOTE_MEDIA_SUBDIR),
    "Remote font download failed",
    "Localized remote font face(s)",
    (h, url, relPath) => h.replaceAll(`url(${url})`, `url("${relPath}")`)
  );
}
var LOCAL_FONTFACE_URL_RE = /url\(["']?(?!data:|file:|https?:\/\/)([^"')]+)["']?\)/gi;
function urlOccurrenceRe(localPath) {
  const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`url\\((["']?)${escaped}\\1\\)`, "g");
}
var MAX_LOCAL_FONT_DATA_URI_BYTES = 5 * 1024 * 1024;
async function readLocalFont(absPath) {
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of createReadStream2(absPath)) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.length;
    if (totalBytes > MAX_LOCAL_FONT_DATA_URI_BYTES) {
      return { kind: "file-backed" };
    }
    chunks.push(buffer);
  }
  return { kind: "inline", buffer: Buffer.concat(chunks, totalBytes) };
}
async function embedLocalFontFaces(html, projectDir) {
  const { fontToDataUri: toDataUri } = await import("./deterministicFonts-5UVUUYHV.js");
  const styleBlockRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  const fontFaceRe = /@font-face\s*\{([^}]*)\}/gi;
  let result = html;
  const embeddedPaths = /* @__PURE__ */ new Set();
  const dataUriByAbsolutePath = /* @__PURE__ */ new Map();
  const fileBackedAbsolutePaths = /* @__PURE__ */ new Set();
  let styleMatch;
  while ((styleMatch = styleBlockRe.exec(html)) !== null) {
    const cssText = styleMatch[1] ?? "";
    const ffRe = new RegExp(fontFaceRe.source, fontFaceRe.flags);
    let ffMatch;
    while ((ffMatch = ffRe.exec(cssText)) !== null) {
      const block = ffMatch[1] ?? "";
      const urlRe = new RegExp(LOCAL_FONTFACE_URL_RE.source, LOCAL_FONTFACE_URL_RE.flags);
      let urlMatch;
      while ((urlMatch = urlRe.exec(block)) !== null) {
        const localPath = urlMatch[1];
        if (!localPath || embeddedPaths.has(localPath)) continue;
        const absPath = localPath.startsWith("/") ? localPath : resolve5(projectDir, localPath);
        if (!isPathInside2(absPath, projectDir)) continue;
        const ext = absPath.match(/\.(woff2?|ttf|otf|ttc)$/i)?.[1]?.toLowerCase() ?? "ttf";
        try {
          if (fileBackedAbsolutePaths.has(absPath)) {
            embeddedPaths.add(localPath);
            continue;
          }
          let dataUri = dataUriByAbsolutePath.get(absPath);
          if (!dataUri) {
            const font = await readLocalFont(absPath);
            if (font.kind === "file-backed") {
              fileBackedAbsolutePaths.add(absPath);
              defaultLogger.info(
                `[Compiler] Kept large local font file-backed: ${localPath} (> ${(MAX_LOCAL_FONT_DATA_URI_BYTES / 1024 / 1024).toFixed(1)} MB)`
              );
              embeddedPaths.add(localPath);
              continue;
            }
            dataUri = await toDataUri(font.buffer, ext);
            dataUriByAbsolutePath.set(absPath, dataUri);
            defaultLogger.info(
              `[Compiler] Embedded local font file: ${localPath} (${(font.buffer.length / 1024).toFixed(0)} KB \u2192 data URI)`
            );
          }
          result = result.replace(urlOccurrenceRe(localPath), `url("${dataUri}")`);
          embeddedPaths.add(localPath);
        } catch (error) {
          defaultLogger.warn(
            `[Compiler] Could not embed local font ${localPath}: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }
    }
  }
  return result;
}
var GSAP_CDN_BASE = gsapCdnDist();
function rewriteUnresolvableGsapToCdn(html, projectDir) {
  return html.replace(
    /(<script\b[^>]*\bsrc=["'])([^"']*gsap[^"']*\/dist\/([^"']+))(["'][^>]*>)/gi,
    (full, prefix, src, file, suffix) => {
      if (/^https?:\/\//i.test(src)) return full;
      const absPath = resolve5(projectDir, src);
      if (existsSync9(absPath)) return full;
      defaultLogger.info(
        `[Compiler] Rewriting missing gsap script to CDN: ${src} \u2192 ${GSAP_CDN_BASE}${file}`
      );
      return `${prefix}${GSAP_CDN_BASE}${file}${suffix}`;
    }
  );
}
function rebaseDirectEntryAssetPaths(html, projectDir, htmlPath) {
  if (!isPathInside2(htmlPath, projectDir)) return html;
  const entryPath = relative2(projectDir, htmlPath).replace(/\\/g, "/");
  if (!entryPath.includes("/")) return html;
  const { document: document2 } = parseHTML(html);
  const assetExists = (path) => existsSync9(resolve5(projectDir, path));
  rewriteAssetPaths(
    document2.querySelectorAll("[src], [href]"),
    entryPath,
    (el, attr) => el.getAttribute(attr),
    (el, attr, value) => el.setAttribute(attr, value),
    assetExists
  );
  rewriteInlineStyleAssetUrls(
    document2.querySelectorAll("[style]"),
    entryPath,
    (el) => el.getAttribute("style"),
    (el, value) => el.setAttribute("style", value),
    assetExists
  );
  for (const style of document2.querySelectorAll("style")) {
    style.textContent = rewriteCssAssetUrls(style.textContent || "", entryPath, assetExists);
  }
  return document2.toString();
}
async function compileForRender(projectDir, htmlPath, downloadDir, options = {}) {
  const entryHtml = rebaseDirectEntryAssetPaths(
    readFileSync5(htmlPath, "utf-8"),
    projectDir,
    htmlPath
  );
  const rawHtml = rewriteUnresolvableGsapToCdn(entryHtml, projectDir);
  assertSubCompositionsUsable(rawHtml, projectDir);
  const { html: compiledHtml, unresolvedCompositions } = await compileHtmlFile(
    rawHtml,
    projectDir,
    downloadDir,
    options.log
  );
  const { subCompositions } = await parseSubCompositions(compiledHtml, projectDir, downloadDir);
  const fullHtml = ensureFullDocument(compiledHtml);
  const inlinedHtml = inlineSubCompositions2(
    fullHtml,
    subCompositions,
    projectDir,
    options.variables ?? {}
  );
  const sanitizedHtml = inlinedHtml.replace(
    /(<(?:video|audio)\b[^>]*?)\s+preload\s*=\s*["']none["']/gi,
    "$1"
  );
  const renderModeHints = detectRenderModeHints(sanitizedHtml);
  const hasShaderTransitions = detectShaderTransitionUsage(sanitizedHtml);
  const usesThreeDTransforms = detectThreeDTransformUsage(sanitizedHtml);
  const usesMixBlendMode = detectMixBlendModeUsage(sanitizedHtml);
  const hasAncestorBackgroundImage = detectAncestorBackgroundImage(sanitizedHtml);
  const normalizedFontHtml = normalizeSystemFontPrimaryFamilies(
    injectTextRenderingRule(
      coalesceHeadStylesAndBodyScripts(promoteCssImportsToLinkTags(sanitizedHtml))
    )
  );
  const coalescedHtml = await injectDeterministicFontFaces(normalizedFontHtml, {
    logger: defaultLogger,
    failClosedFontFetch: options.failClosedFontFetch === true,
    allowSystemFontCapture: options.allowSystemFontCapture,
    abortSignal: options.abortSignal
  });
  const assembledHtml = await inlineExternalScripts(coalescedHtml);
  const HF_POSITION_ATTRS = [
    'data-hf-studio-path-offset="true"',
    'data-hf-studio-box-size="true"',
    'data-hf-studio-rotation="true"',
    'data-hf-studio-motion="'
  ];
  const hasPositionEdits = HF_POSITION_ATTRS.some((attr) => assembledHtml.includes(attr));
  const htmlWithPositionScript = hasPositionEdits ? insertBeforeCloseTag(
    assembledHtml,
    "body",
    `<script>${createStudioPositionSeekReapplyScript()}
//# sourceURL=hyperframes://position-seek-reapply</script>`
  ) ?? assembledHtml : assembledHtml;
  const htmlWithDeferredScripts = prepareCompositionScripts(
    injectSdkPositionEditsRenderScript(htmlWithPositionScript)
  );
  const { html: htmlWithLocalMedia, remoteMediaAssets } = await localizeRemoteMediaSources(
    htmlWithDeferredScripts,
    downloadDir
  );
  const { html: htmlWithLocalImages, remoteMediaAssets: remoteImageAssets } = await localizeRemoteImageSources(htmlWithLocalMedia, downloadDir);
  const { html: htmlWithLocalBg, remoteMediaAssets: remoteBgAssets } = await localizeRemoteBackgroundImages(htmlWithLocalImages, downloadDir);
  const { html: htmlWithLocalizedFonts, remoteMediaAssets: remoteFontAssets } = await localizeRemoteFontFaces(htmlWithLocalBg, downloadDir);
  const gifSourceAssets = new Map(remoteImageAssets);
  const {
    html: htmlWithPreparedGifs,
    preparedAssets: preparedGifAssets,
    preparedGifs
  } = await prepareAnimatedGifInputs(htmlWithLocalizedFonts, {
    projectDir,
    downloadDir,
    cacheDir: options.animatedGifCacheDir,
    sourceAssets: gifSourceAssets,
    timeoutMs: options.ffmpegProcessTimeout
  });
  if (preparedGifs.length > 0) {
    defaultLogger.info(`[Compiler] Prepared ${preparedGifs.length} animated GIF input(s) as WebM`);
  }
  const embeddedHtml = await embedLocalFontFaces(htmlWithPreparedGifs, projectDir);
  const { html, externalAssets } = collectExternalAssets(embeddedHtml, projectDir);
  for (const [relPath, absPath] of remoteMediaAssets) {
    externalAssets.set(relPath, absPath);
  }
  for (const [relPath, absPath] of remoteImageAssets) {
    externalAssets.set(relPath, absPath);
  }
  for (const [relPath, absPath] of remoteBgAssets) {
    externalAssets.set(relPath, absPath);
  }
  for (const [relPath, absPath] of remoteFontAssets) {
    externalAssets.set(relPath, absPath);
  }
  for (const [relPath, absPath] of preparedGifAssets) {
    externalAssets.set(relPath, absPath);
  }
  const { videos, audios, images } = collectRenderMedia(html);
  for (const video of videos) {
    if (isHttpUrl(video.src)) continue;
    const videoPath = resolve5(projectDir, video.src);
    const reencode = `ffmpeg -i "${video.src}" -c:v libx264 -r 30 -g 30 -keyint_min 30 -movflags +faststart -c:a copy output.mp4`;
    (async () => {
      const metadata = await withMediaProbeSlot(() => extractMediaMetadata(videoPath));
      const analysis = await withMediaProbeSlot(
        () => analyzeKeyframeIntervals(videoPath, metadata)
      );
      if (analysis.isProblematic) {
        defaultLogger.warn(
          `[Compiler] WARNING: Video "${video.id}" has sparse keyframes (max interval: ${analysis.maxIntervalSeconds}s). This causes seek failures and frame freezing. Re-encode with: ${reencode}`
        );
      }
      if (metadata.isVFR) {
        defaultLogger.warn(
          `[Compiler] Video "${video.id}" is variable frame rate (VFR); the engine will normalize it to CFR before frame extraction. If rendering feels slow on this video, pre-encode once with: ${reencode}`
        );
      }
    })().catch(() => {
    });
  }
  const { document: document2 } = parseHTML(html);
  const rootEl = document2.querySelector("[data-composition-id]");
  const width = rootEl ? parseInt(rootEl.getAttribute("data-width") || "1080", 10) : 1080;
  const height = rootEl ? parseInt(rootEl.getAttribute("data-height") || "1920", 10) : 1920;
  const staticDuration = rootEl ? parseStrictFiniteTimingNumber(rootEl.getAttribute("data-duration")) ?? parseStrictFiniteTimingNumber(rootEl.getAttribute("data-composition-duration")) ?? 0 : 0;
  return {
    html,
    subCompositions,
    videos,
    audios,
    images,
    unresolvedCompositions,
    externalAssets,
    width,
    height,
    staticDuration,
    renderModeHints,
    hasShaderTransitions,
    usesThreeDTransforms,
    usesMixBlendMode,
    hasAncestorBackgroundImage
  };
}
async function discoverMediaFromBrowser(page) {
  const elements = await page.evaluate(() => {
    const results = [];
    const autoImageIds = /* @__PURE__ */ new Map();
    let autoImageId = 0;
    document.querySelectorAll("img[src]").forEach((image) => {
      if (!image.id) autoImageIds.set(image, `hf-img-${autoImageId++}`);
    });
    const mediaEls = new Set(
      document.querySelectorAll("video[data-start], audio[data-start], img[data-var-src]")
    );
    document.querySelectorAll("picture source[data-var-src]").forEach((source) => {
      const image = source.closest("picture")?.querySelector("img");
      if (image) mediaEls.add(image);
    });
    mediaEls.forEach((el) => {
      const htmlEl = el;
      const isImage = htmlEl.tagName.toLowerCase() === "img";
      const tagName = isImage ? "image" : htmlEl.tagName.toLowerCase() === "video" ? "video" : "audio";
      const id = htmlEl.getAttribute("data-hf-render-id") || htmlEl.id || (isImage ? autoImageIds.get(htmlEl) : void 0);
      if (!id) return;
      const src = htmlEl.currentSrc || htmlEl.src || htmlEl.getAttribute("src") || "";
      const start = parseFloat(htmlEl.getAttribute("data-start") || "0");
      const endRaw = htmlEl.getAttribute("data-end");
      const durationRaw = htmlEl.getAttribute("data-duration");
      const durationInferred = htmlEl.hasAttribute("data-hf-inferred-duration");
      const intrinsicDuration = isImage ? 0 : htmlEl.duration;
      const playbackStartRaw = htmlEl.getAttribute("data-playback-start");
      const mediaStartRaw = htmlEl.getAttribute("data-media-start");
      const loop = htmlEl.hasAttribute("loop");
      const hasAudio = htmlEl.getAttribute("data-has-audio") === "true";
      const volume = parseFloat(htmlEl.getAttribute("data-volume") || "1");
      const muted = !isImage && (htmlEl.hasAttribute("muted") || htmlEl.muted);
      results.push({
        id,
        tagName,
        src,
        start,
        endRaw,
        durationRaw,
        intrinsicDuration,
        durationInferred,
        playbackStartRaw,
        mediaStartRaw,
        loop,
        hasAudio,
        volume,
        muted
      });
    });
    return results;
  });
  return elements.map(
    ({ endRaw, durationRaw, intrinsicDuration, playbackStartRaw, mediaStartRaw, ...element }) => ({
      ...element,
      end: parseStrictFiniteTimingNumber(endRaw) ?? 0,
      duration: element.durationInferred && Number.isFinite(intrinsicDuration) && intrinsicDuration > 0 ? intrinsicDuration : parseStrictFiniteTimingNumber(durationRaw) ?? 0,
      mediaStart: readMediaStart({
        getAttribute(name) {
          if (name === "data-playback-start") return playbackStartRaw;
          if (name === "data-media-start") return mediaStartRaw;
          return null;
        }
      })
    })
  );
}
async function discoverAudioVolumeAutomationFromTimeline(page, audioIds, compositionDuration, sampleFps) {
  if (audioIds.length === 0 || compositionDuration <= 0) return [];
  const sampleStep = 1 / Math.min(60, Math.max(1, sampleFps));
  const rawWindows = await page.evaluate((ids) => {
    return ids.flatMap((id) => {
      const el = window.__hfMediaEl?.(id) ?? document.getElementById(id) ?? document.getElementById(id.replace(/-audio$/, ""));
      if (!(el instanceof HTMLAudioElement) && !(el instanceof HTMLVideoElement)) return [];
      return [
        {
          id,
          startRaw: el.dataset.start ?? null,
          endRaw: el.dataset.end ?? null,
          durationRaw: el.dataset.duration ?? null
        }
      ];
    });
  }, audioIds);
  const clips = rawWindows.map(({ id, startRaw, endRaw, durationRaw }) => {
    const start = parseStrictFiniteTimingNumber(startRaw) ?? 0;
    const authoredDuration = parseStrictFiniteTimingNumber(durationRaw);
    const authoredEnd = parseStrictFiniteTimingNumber(endRaw);
    const end = authoredDuration != null && authoredDuration > 0 ? start + authoredDuration : authoredEnd != null && authoredEnd > start ? authoredEnd : compositionDuration;
    return { id, start, end };
  });
  return page.evaluate(
    ({ clips: clips2, duration, step, maxGain }) => {
      const results = [];
      const clampGain = (value) => Number.isFinite(value) ? Math.max(0, Math.min(maxGain, value)) : 1;
      const volumeDescriptor = typeof HTMLMediaElement === "undefined" ? void 0 : Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "volume");
      const nativeVolumeGet = volumeDescriptor?.get;
      const nativeVolumeSet = volumeDescriptor?.set;
      const withUnclampedVolume = (el, probe) => {
        if (!nativeVolumeGet || !nativeVolumeSet) return probe();
        let authored = Number(nativeVolumeGet.call(el));
        Object.defineProperty(el, "volume", {
          configurable: true,
          get: () => authored,
          set: (value) => {
            authored = Number(value);
            nativeVolumeSet.call(el, Math.max(0, Math.min(1, authored)));
          }
        });
        try {
          return probe();
        } finally {
          delete el.volume;
          nativeVolumeSet.call(el, Math.max(0, Math.min(1, authored)));
        }
      };
      const timelines = window.__timelines;
      if (!timelines) return results;
      const rootEl = document.querySelector("[data-composition-id]");
      const compId = rootEl?.getAttribute("data-composition-id");
      if (!compId) return results;
      const tl = timelines[compId];
      if (!tl) return results;
      const seekTl = (t) => {
        if (typeof tl.totalTime === "function") {
          tl.totalTime(t, true);
        } else if (typeof tl.seek === "function") {
          tl.seek(t, true);
        }
      };
      for (const { id, start, end } of clips2) {
        const el = window.__hfMediaEl?.(id) ?? document.getElementById(id) ?? document.getElementById(id.replace(/-audio$/, ""));
        if (!(el instanceof HTMLAudioElement) && !(el instanceof HTMLVideoElement)) continue;
        const sampleStart = Math.max(0, start);
        const sampleEnd = Math.min(duration, end);
        const initialVolumeAttr = Number.parseFloat(el.dataset.volume ?? "");
        const keyframes = withUnclampedVolume(el, () => {
          if (Number.isFinite(initialVolumeAttr)) {
            el.volume = clampGain(initialVolumeAttr);
          }
          const keyframes2 = [];
          let previousSample;
          for (let t = sampleStart; t <= sampleEnd + 1e-6; t = Math.min(sampleEnd, t + step)) {
            seekTl(t);
            const rawVolume = Number(el.volume);
            if (!Number.isFinite(rawVolume)) {
              if (t === sampleEnd) break;
              continue;
            }
            const volume = clampGain(rawVolume);
            const sample = {
              time: Number(t.toFixed(6)),
              volume: Number(volume.toFixed(6))
            };
            const last = keyframes2.at(-1);
            if (!last || Math.abs(last.volume - volume) > 1e-4) {
              if (last && previousSample && previousSample.time > last.time) {
                keyframes2.push(previousSample);
              }
              keyframes2.push(sample);
            } else if (t === sampleEnd && sample.time > last.time) {
              keyframes2.push(sample);
            }
            previousSample = sample;
            if (t === sampleEnd) break;
          }
          return keyframes2;
        });
        const staticAttr = Number.parseFloat(el.dataset.volume ?? "");
        const staticVolume = Number.isFinite(staticAttr) ? clampGain(staticAttr) : 1;
        const hasAutomation = keyframes.some(
          (keyframe) => Math.abs(keyframe.volume - staticVolume) > 1e-4
        );
        if (hasAutomation) {
          results.push({ id, keyframes });
        }
      }
      seekTl(0);
      return results;
    },
    { clips, duration: compositionDuration, step: sampleStep, maxGain: MAX_AUDIO_GAIN }
  );
}
async function discoverVideoVisibilityFromTimeline(page, compositionDuration) {
  if (compositionDuration <= 0) return [];
  return page.evaluate((duration) => {
    const results = [];
    const videos = document.querySelectorAll("video[data-hf-auto-start]");
    if (videos.length === 0) return results;
    const timelines = window.__timelines;
    if (!timelines) return results;
    const rootEl = document.querySelector("[data-composition-id]");
    const compId = rootEl?.getAttribute("data-composition-id");
    if (!compId) return results;
    const tl = timelines[compId];
    if (!tl) return results;
    const seekTl = (t) => {
      if (typeof tl.totalTime === "function") {
        tl.totalTime(t, true);
      } else if (typeof tl.seek === "function") {
        tl.seek(t, true);
      }
    };
    const SAMPLE_STEP = 0.1;
    const BINARY_PRECISION = 1 / 60;
    const entries = [];
    for (const videoEl of videos) {
      const id = videoEl.getAttribute?.("data-hf-render-id") || videoEl.id;
      if (!id) continue;
      entries.push({
        id,
        sceneEl: videoEl.closest(".scene") || videoEl,
        firstVisible: null,
        lastVisible: null
      });
    }
    if (entries.length === 0) return results;
    for (let t = 0; t <= duration; t += SAMPLE_STEP) {
      seekTl(t);
      for (const entry of entries) {
        const opacity = parseFloat(window.getComputedStyle(entry.sceneEl).opacity);
        if (opacity > 0) {
          if (entry.firstVisible === null) entry.firstVisible = t;
          entry.lastVisible = t;
        }
      }
    }
    for (const entry of entries) {
      const { id, sceneEl, firstVisible, lastVisible } = entry;
      if (firstVisible === null || lastVisible === null) continue;
      let lo = Math.max(0, firstVisible - SAMPLE_STEP);
      let hi = firstVisible;
      while (hi - lo > BINARY_PRECISION) {
        const mid = (lo + hi) / 2;
        seekTl(mid);
        const opacity = parseFloat(window.getComputedStyle(sceneEl).opacity);
        if (opacity > 0) hi = mid;
        else lo = mid;
      }
      const exactStart = hi;
      lo = lastVisible;
      hi = Math.min(duration, lastVisible + SAMPLE_STEP);
      while (hi - lo > BINARY_PRECISION) {
        const mid = (lo + hi) / 2;
        seekTl(mid);
        const opacity = parseFloat(window.getComputedStyle(sceneEl).opacity);
        if (opacity > 0) lo = mid;
        else hi = mid;
      }
      const exactEnd = lo;
      results.push({
        videoId: id,
        visibleStart: Math.max(0, exactStart),
        visibleEnd: Math.min(duration, exactEnd)
      });
    }
    seekTl(0);
    return results;
  }, compositionDuration);
}
async function resolveCompositionDurations(page, unresolved) {
  if (unresolved.length === 0) return [];
  const ids = unresolved.map((el) => el.id);
  const results = await page.evaluate((compIds) => {
    const win = window;
    const timelines = win.__timelines || {};
    const resolved = [];
    for (const id of compIds) {
      const tl = timelines[id];
      if (tl && typeof tl.duration === "function") {
        const dur = tl.duration();
        if (dur > 0) {
          resolved.push({ id, duration: dur, source: "__timelines" });
          continue;
        }
      }
      const el = document.getElementById(id);
      if (el) {
        const durationRaw = el.getAttribute("data-duration");
        const compositionDurationRaw = el.getAttribute("data-composition-duration");
        if (durationRaw != null || compositionDurationRaw != null) {
          resolved.push({
            id,
            duration: 0,
            source: "data-duration",
            ...durationRaw != null ? { durationRaw } : {},
            ...compositionDurationRaw != null ? { compositionDurationRaw } : {}
          });
          continue;
        }
      }
      resolved.push({ id, duration: 0, source: "unresolved" });
    }
    return resolved;
  }, ids);
  const resolutions = [];
  for (const r of results) {
    const duration = parseStrictFiniteTimingNumber(r.durationRaw) ?? parseStrictFiniteTimingNumber(r.compositionDurationRaw) ?? r.duration;
    if (duration != null && duration > 0) {
      resolutions.push({ id: r.id, duration });
    }
  }
  return resolutions;
}
async function recompileWithResolutions(compiled, resolutions, projectDir, downloadDir) {
  if (resolutions.length === 0) return compiled;
  const html = injectDurations(compiled.html, resolutions);
  const { subCompositions } = await parseSubCompositions(html, projectDir, downloadDir);
  const { videos, audios, images } = compiled;
  const remaining = compiled.unresolvedCompositions.filter(
    (c) => !resolutions.some((r) => r.id === c.id)
  );
  return {
    ...compiled,
    html,
    subCompositions,
    videos,
    audios,
    images,
    unresolvedCompositions: remaining,
    renderModeHints: compiled.renderModeHints,
    hasShaderTransitions: compiled.hasShaderTransitions
  };
}

// ../producer/src/services/render/stages/compileStage.ts
function adaptAspectAgnosticResolution(requested, aspectAgnostic, width, height, log) {
  if (!requested || !aspectAgnostic) return requested;
  const flipped = suggestMatchingPreset(width, height, requested);
  if (!flipped || flipped === requested) return requested;
  log.info("Adapted aspect-agnostic --resolution to composition orientation", {
    compositionWidth: width,
    compositionHeight: height,
    requestedResolution: requested,
    effectiveResolution: flipped
  });
  return flipped;
}
async function runCompileStage(input) {
  const {
    projectDir,
    workDir,
    htmlPath,
    entryFile,
    job,
    cfg,
    needsAlpha,
    log,
    assertNotAborted,
    failClosedFontFetch,
    allowSystemFontCapture,
    abortSignal
  } = input;
  const compileStart = Date.now();
  const compiled = await compileForRender(projectDir, htmlPath, join13(workDir, "downloads"), {
    log,
    failClosedFontFetch: failClosedFontFetch === true,
    allowSystemFontCapture,
    abortSignal,
    variables: input.variables,
    animatedGifCacheDir: cfg.extractCacheDir ? join13(cfg.extractCacheDir, "animated-gif") : void 0,
    ffmpegProcessTimeout: cfg.ffmpegProcessTimeout
  });
  assertNotAborted();
  const compileOnlyMs = Date.now() - compileStart;
  let deCompileGate;
  if (cfg.useDrawElement && process.env.HF_FAST_CAPTURE_3D !== "true" && compiled.usesThreeDTransforms) {
    cfg.useDrawElement = false;
    deCompileGate = "3d";
    log.info(
      "[Render] Fast capture: composition uses a CSS 3D rendering context (perspective / preserve-3d / backface-visibility) \u2014 disabling drawElementImage for this render. Capture uses the platform's baseline route."
    );
  }
  if (cfg.useDrawElement && process.env.HF_FAST_CAPTURE_BLEND !== "true" && compiled.usesMixBlendMode) {
    cfg.useDrawElement = false;
    deCompileGate = "mix_blend_mode";
    log.info(
      "[Render] Fast capture: composition uses mix-blend-mode \u2014 disabling drawElementImage for this render. Capture uses the platform's baseline route."
    );
  }
  if (cfg.useDrawElement && process.env.HF_FAST_CAPTURE_ANCESTOR_BG !== "true" && compiled.hasAncestorBackgroundImage) {
    cfg.useDrawElement = false;
    deCompileGate = "ancestor_background_image";
    log.info(
      "[Render] Fast capture: composition root's ancestors (body/html/wrapper) carry a background-image \u2014 disabling drawElementImage for this render. Capture uses the platform's baseline route."
    );
  }
  if (cfg.useDrawElement && process.env.PRODUCER_EXPERIMENTAL_FAST_CAPTURE !== "true" && compiled.hasShaderTransitions) {
    cfg.useDrawElement = false;
    deCompileGate = "shader_transitions";
    log.info(
      "[Render] Fast capture: composition uses shader transitions \u2014 disabling drawElementImage so page-side compositing stays available."
    );
  }
  if (!cfg.useDrawElement && cfg.pageSideCompositingAutoDisabled) {
    cfg.enablePageSideCompositing = true;
    cfg.pageSideCompositingAutoDisabled = false;
  }
  const callerForced = cfg.forceScreenshot || needsAlpha && !cfg.useDrawElement;
  const { forceScreenshot: hintForced } = applyRenderModeHints(callerForced, compiled, log);
  let forceScreenshot = hintForced;
  cfg.forceScreenshot = forceScreenshot;
  writeCompiledArtifacts(compiled, workDir, Boolean(job.config.debug));
  log.info("Compiled composition metadata", {
    entryFile,
    staticDuration: compiled.staticDuration,
    width: compiled.width,
    height: compiled.height,
    videoCount: compiled.videos.length,
    audioCount: compiled.audios.length,
    renderModeHints: compiled.renderModeHints
  });
  const composition = {
    duration: compiled.staticDuration,
    videos: compiled.videos,
    audios: compiled.audios,
    images: compiled.images,
    width: compiled.width,
    height: compiled.height
  };
  await preflightCompositionAssetMediaTypes({
    projectDir,
    compiledDir: join13(workDir, "compiled"),
    composition,
    signal: abortSignal
  });
  assertNotAborted();
  const { width, height } = composition;
  const effectiveResolution = adaptAspectAgnosticResolution(
    job.config.outputResolution,
    job.config.outputResolutionAspectAgnostic,
    width,
    height,
    log
  );
  const deviceScaleFactor = resolveDeviceScaleFactor({
    compositionWidth: width,
    compositionHeight: height,
    outputResolution: effectiveResolution,
    hdrRequested: job.config.hdrMode === "force-hdr",
    alphaRequested: needsAlpha
  });
  const outputWidth = width * deviceScaleFactor;
  const outputHeight = height * deviceScaleFactor;
  if (deviceScaleFactor > 1) {
    log.info("Supersampling composition via deviceScaleFactor", {
      compositionWidth: width,
      compositionHeight: height,
      outputResolution: effectiveResolution,
      outputWidth,
      outputHeight,
      deviceScaleFactor
    });
  }
  return {
    compiled,
    composition,
    deviceScaleFactor,
    outputWidth,
    outputHeight,
    compileOnlyMs,
    forceScreenshot,
    deCompileGate
  };
}

// ../producer/src/services/render/stages/probeStage.ts
import { join as join14 } from "path";

// ../producer/src/services/render/stages/probeFailures.ts
var NETWORK_FAILURE_PATTERN = /404|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION_REFUSED|net::ERR_/i;
var FAVICON_PATTERN = /(?:^|[/?])favicon(?:\.[a-z0-9]+)?(?:[?#\s]|$)/i;
function isActionableProbeFailure(line) {
  return NETWORK_FAILURE_PATTERN.test(line) && !FAVICON_PATTERN.test(line);
}

// ../producer/src/services/render/captureImageFormat.ts
function resolveCaptureImageFormat(input) {
  return input.needsAlpha || input.motionBlur ? "png" : "jpeg";
}

// ../producer/src/services/render/stages/probeStage.ts
var FRAME_BOUNDARY_EPSILON = 1e-3;
function durationToFrameCount(duration, fps) {
  const rawFrameCount = duration * fps;
  const nearestFrame = Math.round(rawFrameCount);
  return Math.abs(rawFrameCount - nearestFrame) <= FRAME_BOUNDARY_EPSILON ? nearestFrame : Math.ceil(rawFrameCount);
}
function hasScriptedAudioVolumeAutomation(html, audioCount) {
  if (audioCount <= 0) return false;
  const { document: document2 } = parseHTML(html);
  const scriptBodies = [...document2.querySelectorAll("script")].map((script) => script.textContent ?? "").join("\n");
  if (!scriptBodies) return false;
  return /\.\s*volume\s*=/i.test(scriptBodies) || /\b(?:gsap|tl|timeline|tween)\s*\.\s*(?:to|fromTo|set)\s*\([\s\S]{0,2000}\bvolume\s*:/i.test(
    scriptBodies
  );
}
function hasAutoStartVideos(html) {
  const { document: document2 } = parseHTML(html);
  return document2.querySelector("video[data-hf-auto-start]") !== null;
}
function hasVariableBoundMedia(html, variables) {
  if (!variables || Object.keys(variables).length === 0) return false;
  const { document: document2 } = parseHTML(html);
  return Array.from(
    document2.querySelectorAll(
      "img[data-var-src], audio[data-var-src], video[data-var-src], source[data-var-src]"
    )
  ).some((element) => {
    const variableId = element.getAttribute("data-var-src")?.trim();
    return Boolean(variableId && Object.hasOwn(variables, variableId));
  });
}
function reconcileBrowserMediaEnd(existingEnd, projectedEnd, sourceChanged, durationInferred) {
  if (projectedEnd <= 0) return existingEnd;
  if (sourceChanged && durationInferred) return projectedEnd;
  return existingEnd <= 0 ? projectedEnd : Math.min(existingEnd, projectedEnd);
}
function hasRuntimeMediaChanges(html) {
  const { document: document2 } = parseHTML(html);
  const scriptBodies = [...document2.querySelectorAll("script")].map(
    (script) => script.textContent ?? ""
  );
  const insertedMedia = scriptBodies.some(
    (script) => /\bcreateElement\s*\(\s*["'`](?:video|audio)["'`]\s*\)/i.test(script) || /\bnew\s+(?:Audio|Video)\s*\(/i.test(script) || /<(?:video|audio)\b[^>]*>/i.test(script)
  );
  if (insertedMedia) return true;
  const isManagedMedia = (element) => {
    const name = element.tagName.toLowerCase();
    if (name === "video" || name === "audio") return true;
    return name === "source" && element.closest("video, audio") !== null;
  };
  for (const script of scriptBodies) {
    for (const mutation of extractMediaSrcMutations(script)) {
      try {
        const id = /^#[A-Za-z_][\w-]*$/.test(mutation.selector) ? mutation.selector.slice(1) : null;
        const idTarget = id ? document2.getElementById(id) : null;
        const targets = id ? idTarget ? [idTarget] : [] : [...document2.querySelectorAll(mutation.selector)];
        if (targets.some(isManagedMedia)) return true;
      } catch {
      }
    }
  }
  return false;
}
function probeRequiresBrowser(args) {
  return args.durationSeconds <= 0 || args.unresolvedCompositionCount > 0 || args.hasAutoStart || args.hasScriptedAudio || args.hasVariableMedia || args.hasInsertedMedia;
}
async function runProbeStage(input) {
  const {
    projectDir,
    workDir,
    job,
    cfg,
    forceScreenshot,
    log,
    assertNotAborted,
    abortSignal,
    composition,
    width,
    height,
    needsAlpha,
    deviceScaleFactor
  } = input;
  let { compiled } = input;
  const probeCfg = cfg.forceScreenshot === forceScreenshot ? cfg : { ...cfg, forceScreenshot };
  let fileServer = null;
  let probeSession = null;
  let beginFrameStalled = false;
  let lastBrowserConsole = [];
  const probeStart = Date.now();
  const hasAutoStart = hasAutoStartVideos(compiled.html);
  const hasScriptedAudio = hasScriptedAudioVolumeAutomation(
    compiled.html,
    composition.audios.length
  );
  const hasVariableMedia = hasVariableBoundMedia(compiled.html, job.config.variables);
  const hasInsertedMedia = hasRuntimeMediaChanges(compiled.html);
  const needsBrowser = probeRequiresBrowser({
    durationSeconds: composition.duration,
    unresolvedCompositionCount: compiled.unresolvedCompositions.length,
    hasAutoStart,
    hasScriptedAudio,
    hasVariableMedia,
    hasInsertedMedia
  });
  try {
    if (needsBrowser) {
      const reasons = [];
      if (composition.duration <= 0) reasons.push("root duration unknown");
      if (compiled.unresolvedCompositions.length > 0)
        reasons.push(`${compiled.unresolvedCompositions.length} unresolved composition(s)`);
      if (hasAutoStart) reasons.push("auto-start video(s)");
      if (hasScriptedAudio) reasons.push("scripted audio volume");
      if (hasInsertedMedia) reasons.push("runtime-created or source-mutated media");
      if (hasVariableMedia) reasons.push("variable-bound media source(s)");
      log.info("Launching browser for composition probe...", {
        reasons
      });
      fileServer = await createFileServer({
        projectDir,
        compiledDir: join14(workDir, "compiled"),
        port: 0,
        preHeadScripts: [VIRTUAL_TIME_SHIM],
        bodyScripts: input.renderBodyScripts,
        fps: job.config.fps
      });
      assertNotAborted();
      const motionBlur = job.config.motionBlur;
      const captureFormat = resolveCaptureImageFormat({ needsAlpha, motionBlur });
      const captureOpts = {
        width,
        height,
        fps: job.config.fps,
        format: captureFormat,
        quality: captureFormat === "png" ? void 0 : 80,
        variables: job.config.variables,
        deviceScaleFactor,
        motionBlur,
        requiresWebGpu: compositionRequiresWebGpu(compiled.html)
      };
      const PROBE_MAX_ATTEMPTS = 2;
      for (let attempt = 1; attempt <= PROBE_MAX_ATTEMPTS; attempt++) {
        const attemptStart = Date.now();
        try {
          log.info("Creating capture session...", { attempt, maxAttempts: PROBE_MAX_ATTEMPTS });
          probeSession = await createCaptureSession(
            fileServer.url,
            join14(workDir, "probe"),
            captureOpts,
            null,
            probeCfg
          );
          log.info("Waiting for composition to initialize...", { attempt });
          const heartbeat = setInterval(() => {
            const elapsed = ((Date.now() - attemptStart) / 1e3).toFixed(1);
            log.info(`Still waiting for browser initialization... (${elapsed}s elapsed)`);
          }, 3e4);
          try {
            await initializeSession(probeSession);
          } finally {
            clearInterval(heartbeat);
          }
        } catch (err) {
          const isTransient = isTransientBrowserError(err);
          const errMsg = err instanceof Error ? err.message : String(err);
          log.warn("Browser probe attempt failed", {
            attempt,
            maxAttempts: PROBE_MAX_ATTEMPTS,
            isTransient,
            error: errMsg,
            elapsedMs: Date.now() - attemptStart
          });
          if (probeSession) {
            try {
              await closeCaptureSession(probeSession);
            } catch (closeErr) {
              log.warn("Failed to close crashed probe session", {
                error: closeErr instanceof Error ? closeErr.message : String(closeErr)
              });
            }
            probeSession = null;
          }
          if (isTransient && attempt < PROBE_MAX_ATTEMPTS) {
            log.info("Retrying with a fresh browser session...", {
              attempt: attempt + 1,
              maxAttempts: PROBE_MAX_ATTEMPTS
            });
            assertNotAborted();
            continue;
          }
          throw err;
        }
        log.info("Composition ready", {
          attempt,
          initMs: Date.now() - attemptStart
        });
        break;
      }
      assertNotAborted();
      if (!probeSession) {
        throw new Error("Browser probe completed without a capture session");
      }
      lastBrowserConsole = probeSession.browserConsoleBuffer;
      if (probeSession.launchCaptureMode === "beginframe") {
        const probeTimeoutMs = Number(process.env.PRODUCER_BEGINFRAME_PROBE_TIMEOUT_MS) > 0 ? Number(process.env.PRODUCER_BEGINFRAME_PROBE_TIMEOUT_MS) : 3e4;
        const livenessStart = Date.now();
        const probeTick = deriveBeginFrameProbeTimeTicks(
          probeSession.beginFrameTimeTicks,
          probeSession.beginFrameIntervalMs
        );
        const alive2 = await probeBeginFrameLiveness(
          probeSession.page,
          probeTimeoutMs,
          probeTick,
          probeSession.beginFrameIntervalMs
        );
        assertNotAborted();
        if (alive2) {
          log.info("BeginFrame liveness probe passed", {
            probeMs: Date.now() - livenessStart
          });
        } else {
          beginFrameStalled = true;
          log.warn(
            "[Render] BeginFrame liveness probe timed out \u2014 this composition stalls BeginFrame on this host (SwiftShader heavy-layer pattern). Relaunching the probe browser in screenshot capture mode; the render will use screenshot capture throughout.",
            { probeTimeoutMs }
          );
          lastBrowserConsole = probeSession.browserConsoleBuffer;
          await closeCaptureSession(probeSession).catch(() => {
          });
          probeSession = await createCaptureSession(
            fileServer.url,
            join14(workDir, "probe-screenshot"),
            captureOpts,
            null,
            { ...probeCfg, forceScreenshot: true }
          );
          await initializeSession(probeSession);
          assertNotAborted();
          lastBrowserConsole = probeSession.browserConsoleBuffer;
        }
      }
      const session = probeSession;
      if (composition.duration <= 0) {
        log.info("Discovering composition duration...");
        const discoveredDuration = await getCompositionDuration(session);
        assertNotAborted();
        log.info("Probed composition duration from browser", {
          discoveredDuration,
          staticDuration: compiled.staticDuration
        });
        composition.duration = discoveredDuration;
      } else {
        log.info("Using static duration from data-duration attribute", {
          duration: composition.duration
        });
      }
      if (compiled.unresolvedCompositions.length > 0) {
        const resolutions = await resolveCompositionDurations(
          session.page,
          compiled.unresolvedCompositions
        );
        assertNotAborted();
        if (resolutions.length > 0) {
          compiled = await recompileWithResolutions(
            compiled,
            resolutions,
            projectDir,
            join14(workDir, "downloads")
          );
          assertNotAborted();
          composition.videos = compiled.videos;
          composition.audios = compiled.audios;
          composition.images = compiled.images;
          writeCompiledArtifacts(compiled, workDir, Boolean(job.config.debug));
        }
      }
      log.info("Discovering media assets from browser DOM...");
      const browserMedia = await discoverMediaFromBrowser(session.page);
      assertNotAborted();
      if (browserMedia.length > 0) {
        const existingVideoIds = new Set(composition.videos.map((v) => v.id));
        const existingAudioIds = new Set(composition.audios.map((a) => a.id));
        const existingImageIds = new Set(composition.images.map((image) => image.id));
        pruneMutedBrowserMedia(composition, browserMedia, existingAudioIds);
        for (const el of browserMedia) {
          if (!el.src || el.src === "about:blank") continue;
          if (el.muted && el.tagName === "audio") continue;
          let src = el.src;
          if (fileServer && src.startsWith(fileServer.url)) {
            src = src.slice(fileServer.url.length).replace(/^\//, "");
          }
          if (el.tagName === "video") {
            if (existingVideoIds.has(el.id)) {
              const existing = composition.videos.find((v) => v.id === el.id);
              if (existing) {
                const sourceChanged = existing.src !== src;
                if (sourceChanged) {
                  existing.src = src;
                }
                const projectedEnd = projectBrowserEndToCompositionTimeline(
                  existing.start,
                  el.start,
                  resolveBrowserMediaEnd(el.start, el.end, el.duration)
                );
                existing.end = reconcileBrowserMediaEnd(
                  existing.end,
                  projectedEnd,
                  sourceChanged,
                  el.durationInferred
                );
                if (el.mediaStart > 0 && (existing.mediaStart <= 0 || Math.abs(existing.mediaStart - el.mediaStart) > BROWSER_MEDIA_EPSILON)) {
                  existing.mediaStart = el.mediaStart;
                }
                if (el.hasAudio && !el.muted && !existing.hasAudio) {
                  existing.hasAudio = true;
                }
                if (el.loop && !existing.loop) {
                  existing.loop = true;
                }
              }
            } else {
              composition.videos.push({
                id: el.id,
                src,
                start: el.start,
                end: resolveBrowserMediaEnd(el.start, el.end, el.duration),
                mediaStart: el.mediaStart,
                loop: el.loop,
                hasAudio: el.hasAudio && !el.muted
              });
              existingVideoIds.add(el.id);
            }
          } else if (el.tagName === "audio") {
            if (existingAudioIds.has(el.id)) {
              const existing = composition.audios.find((a) => a.id === el.id);
              if (existing) {
                const sourceChanged = existing.src !== src;
                if (sourceChanged) {
                  existing.src = src;
                }
                const projectedEnd = projectBrowserEndToCompositionTimeline(
                  existing.start,
                  el.start,
                  resolveBrowserMediaEnd(el.start, el.end, el.duration)
                );
                existing.end = reconcileBrowserMediaEnd(
                  existing.end,
                  projectedEnd,
                  sourceChanged,
                  el.durationInferred
                );
                if (el.mediaStart > 0 && (existing.mediaStart <= 0 || Math.abs(existing.mediaStart - el.mediaStart) > BROWSER_MEDIA_EPSILON)) {
                  existing.mediaStart = el.mediaStart;
                }
                if (el.volume > 0 && Math.abs((existing.volume ?? 1) - el.volume) > BROWSER_MEDIA_EPSILON) {
                  existing.volume = el.volume;
                }
              }
            } else {
              composition.audios.push({
                id: el.id,
                src,
                start: el.start,
                end: resolveBrowserMediaEnd(el.start, el.end, el.duration),
                mediaStart: el.mediaStart,
                layer: 0,
                volume: el.volume,
                type: "audio"
              });
              existingAudioIds.add(el.id);
            }
          } else if (el.tagName === "image") {
            if (existingImageIds.has(el.id)) {
              const existing = composition.images.find((image) => image.id === el.id);
              if (existing) {
                existing.src = src;
                const runtimeEnd = resolveBrowserMediaEnd(el.start, el.end, el.duration);
                const projectedEnd = projectBrowserEndToCompositionTimeline(
                  existing.start,
                  el.start,
                  runtimeEnd
                );
                if (projectedEnd > existing.start && Math.abs(existing.end - projectedEnd) > BROWSER_MEDIA_EPSILON) {
                  existing.end = projectedEnd;
                }
              }
            } else {
              composition.images.push({
                id: el.id,
                src,
                start: el.start,
                end: resolveBrowserMediaEnd(el.start, el.end, el.duration)
              });
              existingImageIds.add(el.id);
            }
          }
        }
      }
      if (composition.audios.length > 0) {
        log.info("Discovering audio volume automation...", {
          audioCount: composition.audios.length
        });
        const automation = await discoverAudioVolumeAutomationFromTimeline(
          session.page,
          composition.audios.map((audio) => audio.id),
          composition.duration,
          fpsToNumber(job.config.fps)
        );
        assertNotAborted();
        if (automation.length > 0) {
          const byId = new Map(automation.map((entry) => [entry.id, entry.keyframes]));
          for (const audio of composition.audios) {
            const keyframes = byId.get(audio.id);
            if (!keyframes || keyframes.length === 0) continue;
            audio.volumeKeyframes = keyframes;
            log.info(`[Probe] Runtime audio volume automation: ${audio.id}`, {
              keyframeCount: keyframes.length
            });
          }
        }
      }
      if (composition.videos.length > 0) {
        log.info("Discovering video visibility windows...", {
          videoCount: composition.videos.length
        });
        const visibilityWindows = await discoverVideoVisibilityFromTimeline(
          session.page,
          composition.duration
        );
        assertNotAborted();
        for (const win of visibilityWindows) {
          const video = composition.videos.find((v) => v.id === win.videoId);
          if (!video) continue;
          if (win.visibleStart >= 0 && win.visibleEnd > win.visibleStart) {
            video.start = win.visibleStart;
            video.end = win.visibleEnd;
            log.info(
              `[Probe] Runtime video discovery: ${video.id} visible ${win.visibleStart.toFixed(2)}s\u2013${win.visibleEnd.toFixed(2)}s`
            );
          }
        }
      }
    }
    await preflightCompositionAssetMediaTypes({
      projectDir,
      compiledDir: join14(workDir, "compiled"),
      composition,
      signal: abortSignal
    });
    assertNotAborted();
  } catch (error) {
    if (probeSession) {
      try {
        await closeCaptureSession(probeSession);
      } catch (closeError) {
        log.warn("Failed to close probe session after media preflight failure", {
          error: closeError instanceof Error ? closeError.message : String(closeError)
        });
      }
      probeSession = null;
    }
    if (fileServer) {
      closeFileServerSafely(fileServer, "probe media preflight", log);
      fileServer = null;
    }
    throw error;
  }
  const browserProbeMs = Date.now() - probeStart;
  const duration = composition.duration;
  const totalFrames = durationToFrameCount(duration, fpsToNumber(job.config.fps));
  if (duration <= 0) {
    const diagnostics = [];
    try {
      if (probeSession) {
        const timelinesInfo = await probeSession.page.evaluate(() => {
          const tl = window.__timelines;
          const hf = window.__hf;
          return {
            timelineKeys: tl ? Object.keys(tl) : [],
            hfDuration: hf?.duration ?? null,
            gsapLoaded: typeof window.gsap !== "undefined"
          };
        });
        if (!timelinesInfo.gsapLoaded) {
          diagnostics.push(
            "GSAP is not loaded \u2014 CDN script may have failed to download. Bundle GSAP locally in your project instead of using a CDN <script src>."
          );
        } else if (timelinesInfo.timelineKeys.length === 0) {
          diagnostics.push(
            'GSAP is loaded but no timelines were registered on window.__timelines. Ensure your script creates a timeline and assigns it: window.__timelines["main"] = gsap.timeline({ paused: true });'
          );
        }
        for (const line of probeSession.browserConsoleBuffer) {
          if (/\[Browser:ERROR\]|\[Browser:PAGEERROR\]|404|net::ERR_/i.test(line)) {
            diagnostics.push(`Browser: ${line}`);
          }
        }
      }
    } catch (err) {
      log.warn("Failed to gather browser diagnostics for zero-duration composition", {
        error: err instanceof Error ? err.message : String(err)
      });
      diagnostics.push("(Could not gather browser diagnostics \u2014 page may have crashed)");
    }
    const hint = diagnostics.length > 0 ? "\n\nDiagnostics:\n  - " + diagnostics.join("\n  - ") : "\n\nCheck that GSAP timelines are registered on window.__timelines.";
    throw new Error("Composition duration is 0 \u2014 this would produce a black video." + hint);
  }
  if (probeSession) {
    const failedRequests = probeSession.browserConsoleBuffer.filter(isActionableProbeFailure);
    if (failedRequests.length > 0) {
      log.warn("Browser encountered network failures during page load:", {
        failures: failedRequests.slice(0, 10)
      });
      for (const line of failedRequests.slice(0, 5)) {
        console.warn(`[Render] Asset load failure: ${line}`);
      }
    }
  }
  return {
    compiled,
    fileServer,
    probeSession,
    lastBrowserConsole,
    duration,
    totalFrames,
    browserProbeMs,
    beginFrameStalled
  };
}
function pruneMutedBrowserMedia(composition, browserMedia, existingAudioIds) {
  for (const el of browserMedia) {
    if (!el.muted) continue;
    if (el.tagName === "video") {
      const existing = composition.videos.find((v) => v.id === el.id);
      if (existing) existing.hasAudio = false;
    } else {
      const idx = composition.audios.findIndex((a) => a.id === el.id);
      if (idx >= 0) composition.audios.splice(idx, 1);
      existingAudioIds?.delete(el.id);
    }
  }
}

// ../producer/src/services/render/planValidation.ts
var PlanValidationError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "PlanValidationError";
    this.code = code;
  }
};
var SYSTEM_FONT_USED = "SYSTEM_FONT_USED";
var DISTRIBUTED_DURATION_OUT_OF_RANGE = "DISTRIBUTED_DURATION_OUT_OF_RANGE";
var RENDER_DURATION_OUT_OF_RANGE = DISTRIBUTED_DURATION_OUT_OF_RANGE;
var MAX_DISTRIBUTED_DURATION_SECONDS = 24 * 60 * 60;
var MAX_RENDER_DURATION_SECONDS = MAX_DISTRIBUTED_DURATION_SECONDS;
function validateNoGpuEncode(config) {
  if (config.useGpu === true) {
    throw new PlanValidationError(
      BROWSER_GPU_NOT_SOFTWARE,
      "[planValidation] GPU encode is banned in distributed mode: config.useGpu === true. Distributed retries must be byte-identical, but NVENC/QSV/VAAPI produce different output across machines. Set useGpu=false (the default) \u2014 software libx264/libx265 is the only supported encoder in distributed mode."
    );
  }
  if (config.browserGpuMode !== void 0 && config.browserGpuMode !== "software") {
    throw new PlanValidationError(
      BROWSER_GPU_NOT_SOFTWARE,
      `[planValidation] Hardware browser GPU is banned in distributed mode: config.browserGpuMode === ${JSON.stringify(config.browserGpuMode)}. Hardware GL is bitwise unstable across drivers. Set browserGpuMode="software" so Chrome launches with --use-gl=swiftshader.`
    );
  }
}
function validateNoSystemFonts(compiledHtml) {
  const customProperties = collectFontFamilyCustomProperties(compiledHtml);
  for (const { surface, declaration } of iterateFontFamilyDeclarations(compiledHtml)) {
    const families = resolveFontFamilyDeclarationFamilies(declaration, customProperties);
    if (families.length === 0) continue;
    const primaryRaw = families[0];
    if (!GENERIC_FAMILIES.has(primaryRaw.toLowerCase())) continue;
    throw new PlanValidationError(
      SYSTEM_FONT_USED,
      `[planValidation] Composition declares a host-OS / generic primary ${surface}: ${JSON.stringify(primaryRaw)} (full declaration: ${JSON.stringify(declaration.trim())}). Distributed chunk workers render in a Linux container and cannot produce byte-identical output for fonts that resolve to host system installations. Use a deterministic web font (e.g. Inter, Montserrat, or another @fontsource family) as the primary family; generic names like "sans-serif" / "-apple-system" / "system-ui" are only allowed as fallbacks.`
    );
  }
}
function validateRenderDuration(input) {
  const { duration, totalFrames, fps } = input;
  const maxFrames = Math.ceil(MAX_RENDER_DURATION_SECONDS * fps);
  if (Number.isFinite(duration) && duration > 0 && Number.isFinite(fps) && fps > 0 && Number.isSafeInteger(totalFrames) && totalFrames > 0 && totalFrames <= maxFrames) {
    return;
  }
  throw new PlanValidationError(
    RENDER_DURATION_OUT_OF_RANGE,
    `[planValidation] Render duration is out of range: duration=${String(duration)}s totalFrames=${String(totalFrames)} fps=${String(fps)} (maxDuration=${String(MAX_RENDER_DURATION_SECONDS)}s, maxFrames=${String(maxFrames)}). This usually means an unbounded timeline escaped into render planning, such as GSAP repeat:-1 / yoyo loops without an explicit finite root duration. Add a finite data-duration or replace infinite repeats with a finite repeat count before rendering.`
  );
}
function validateDistributedDuration(input) {
  validateRenderDuration(input);
}

// ../producer/src/services/render/stages/extractVideosStage.ts
import { existsSync as existsSync10 } from "fs";
import { join as join15 } from "path";

// ../producer/src/services/render/extractionFailureMetadata.ts
function stringOrEmpty(value) {
  return value === void 0 ? "" : value;
}
function retrySortTuple(retry) {
  return retry === void 0 ? ["", -1, -1] : [retry.phase, retry.used, retry.budget];
}
function extractionFailureGroupSortTuple(group) {
  const retry = retrySortTuple(group.retry);
  return [
    group.kind,
    stringOrEmpty(group.sourceFingerprint),
    stringOrEmpty(group.host),
    stringOrEmpty(group.statusClass),
    retry[0],
    retry[1],
    retry[2]
  ];
}
function compareExtractionFailureGroups(left, right) {
  const leftTuple = extractionFailureGroupSortTuple(left);
  const rightTuple = extractionFailureGroupSortTuple(right);
  for (let index = 0; index < leftTuple.length; index += 1) {
    const leftValue = leftTuple[index];
    const rightValue = rightTuple[index];
    if (leftValue < rightValue) return -1;
    if (leftValue > rightValue) return 1;
  }
  return 0;
}
function extractionFailureGroupIdentityKey(group) {
  return JSON.stringify(extractionFailureGroupSortTuple(group));
}

// ../producer/src/services/render/stages/extractVideosStage.ts
var MAX_EXTRACTION_FAILURE_GROUPS = 8;
function buildExtractionFailureMetadata(inputs) {
  const kindCounts = /* @__PURE__ */ new Map();
  const grouped = /* @__PURE__ */ new Map();
  for (const input of inputs) {
    kindCounts.set(input.kind, (kindCounts.get(input.kind) ?? 0) + input.affectedElementCount);
    const key = extractionFailureGroupIdentityKey(input);
    const existing = grouped.get(key);
    if (existing) {
      existing.affectedElementCount += input.affectedElementCount;
    } else {
      grouped.set(key, { ...input });
    }
  }
  const allGroups = [...grouped.values()].sort(compareExtractionFailureGroups);
  return {
    schemaVersion: 1,
    kindCounts: [...kindCounts].map(([kind, affectedElementCount]) => ({
      kind,
      affectedElementCount
    })).sort((a, b) => a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : 0),
    groups: allGroups.slice(0, MAX_EXTRACTION_FAILURE_GROUPS),
    omittedGroupCount: Math.max(0, allGroups.length - MAX_EXTRACTION_FAILURE_GROUPS)
  };
}
function extractionFailureMetadataFromResult(result) {
  return buildExtractionFailureMetadata(
    result.errors.map((failure) => ({
      kind: failure.kind ?? "internal",
      affectedElementCount: 1,
      ...failure.group
    }))
  );
}
function safeVideoExtractionSourceLogMetadata(source) {
  const identity = safeVideoExtractionSourceIdentity(source);
  return identity ? { sourceType: "remote", ...identity } : { sourceType: "local" };
}
function resolveVideoExtractionPolicy(env = process.env) {
  const rawMode = env.HF_VIDEO_EXTRACTION_FAILURE_MODE?.trim().toLowerCase();
  const failureMode = rawMode === "observe" || rawMode === "off" ? rawMode : "enforce";
  const maxTransientRetries = failureMode !== "off" && env.HF_VIDEO_EXTRACTION_MAX_RETRIES?.trim() === "1" ? 1 : 0;
  return { failureMode, maxTransientRetries };
}
var VideoExtractionStageError = class extends Error {
  constructor(code, retryable, failures, extractionFailure = buildExtractionFailureMetadata(
    failures.map((failure) => ({
      kind: failure.kind,
      affectedElementCount: failure.count
    }))
  )) {
    const total = failures.reduce((sum, failure) => sum + failure.count, 0);
    const breakdown = failures.map((failure) => `${failure.kind}=${failure.count}`).join(",");
    super(`Video extraction failed for ${total} source(s) [${code}; ${breakdown}]`);
    this.code = code;
    this.retryable = retryable;
    this.failures = failures;
    this.extractionFailure = extractionFailure;
    this.name = "VideoExtractionStageError";
    this.publicMetadata = { extractionFailure };
  }
  code;
  retryable;
  failures;
  extractionFailure;
  /**
   * Producer servers may expose this explicitly public, JSON-compatible data
   * without knowing its schema. Boundary adapters remain responsible for
   * validating and applying policy to it.
   */
  publicMetadata;
};
function assertVideoExtractionSucceeded(result) {
  throwIfEncoderInterrupted(result);
  const error = buildVideoExtractionStageError(result);
  if (error) throw error;
}
function throwIfEncoderInterrupted(result) {
  const interrupted = result.errors.find((failure) => failure.kind === "external_interruption");
  if (!interrupted) return;
  throw encoderFailureError("Video frame extraction failed", {
    error: String(interrupted.error),
    failureReason: "external_interruption"
  });
}
function buildVideoExtractionStageError(result) {
  if (result.success && result.errors.length === 0) return null;
  const counts = /* @__PURE__ */ new Map();
  for (const failure of result.errors) {
    const kind = failure.kind ?? "internal";
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  const failures = Array.from(counts, ([kind, count]) => ({ kind, count })).sort(
    (a, b) => a.kind.localeCompare(b.kind)
  );
  const retryable = result.errors.length > 0 && result.errors.every((failure) => failure.retryable === true);
  return new VideoExtractionStageError(
    retryable ? "VIDEO_EXTRACTION_FAILED" : "VIDEO_SOURCE_UNRENDERABLE",
    retryable,
    failures,
    extractionFailureMetadataFromResult(result)
  );
}
function buildHdrProbeStageError(failures) {
  const counts = /* @__PURE__ */ new Map();
  for (const failure of failures) {
    counts.set(failure.kind, (counts.get(failure.kind) ?? 0) + 1);
  }
  const summary = Array.from(counts, ([kind, count]) => ({ kind, count })).sort(
    (a, b) => a.kind.localeCompare(b.kind)
  );
  const retryable = failures.length > 0 && failures.every((failure) => failure.retryable);
  return new VideoExtractionStageError(
    retryable ? "VIDEO_EXTRACTION_FAILED" : "VIDEO_SOURCE_UNRENDERABLE",
    retryable,
    summary,
    buildExtractionFailureMetadata(
      failures.map((failure) => ({
        kind: failure.kind,
        affectedElementCount: 1
      }))
    )
  );
}
function isHdrProbeFailure(failure) {
  return failure !== null;
}
function throwHdrProbeFailures(failures, mode) {
  if (failures.length === 0) return;
  const interrupted = failures.find(
    (failure) => failure.classified.kind === "external_interruption"
  );
  if (interrupted) {
    throw encoderFailureError("Video HDR probe failed", {
      error: interrupted.error instanceof Error ? interrupted.error.message : String(interrupted.error),
      failureReason: "external_interruption"
    });
  }
  if (mode === "enforce") {
    throw buildHdrProbeStageError(failures.map((failure) => failure.classified));
  }
  const firstFailure = failures[0];
  if (firstFailure) throw firstFailure.error;
}
function applyVideoExtractionFailurePolicy(result, policy, log) {
  const error = buildVideoExtractionStageError(result);
  if (!error || policy.failureMode === "off") return null;
  log?.warn("Video extraction produced typed source failures", {
    mode: policy.failureMode,
    code: error.code,
    retryable: error.retryable,
    failures: error.failures
  });
  return policy.failureMode === "enforce" ? error : null;
}
async function probeColorSpaceSafely(path, log) {
  try {
    const meta = await extractMediaMetadata(path);
    return meta.colorSpace;
  } catch (error) {
    log?.warn("HDR color-space probe failed; treating source as SDR", {
      path,
      error: error instanceof Error ? error.message : String(error)
    });
    return null;
  }
}
async function runExtractVideosStage(input) {
  const {
    projectDir,
    compiledDir,
    job,
    cfg,
    log,
    composition,
    abortSignal,
    assertNotAborted,
    materializeSymlinks
  } = input;
  const stage2Start = Date.now();
  const extractionPolicy = resolveVideoExtractionPolicy();
  let frameLookup = null;
  let extractionResult = null;
  let failureToEnforce = null;
  let videoReadinessSkipIds = [];
  let videoMetadataHints = [];
  const nativeHdrVideoIds = /* @__PURE__ */ new Set();
  const videoTransfers = /* @__PURE__ */ new Map();
  let hdrProbeTransientRetries = 0;
  if (job.config.hdrMode !== "force-sdr" && composition.videos.length > 0) {
    log?.info("Probing video color spaces...", { videoCount: composition.videos.length });
    const probeFailures = await Promise.all(
      composition.videos.map(async (v) => {
        const videoPath = resolveProjectRelativeSrc(v.src, projectDir, compiledDir);
        if (!existsSync10(videoPath)) return null;
        try {
          const attempted = extractionPolicy.maxTransientRetries === 0 ? { result: await extractMediaMetadata(videoPath), retries: 0 } : await runVideoExtractionWithRetry(() => extractMediaMetadata(videoPath), {
            signal: abortSignal,
            maxTransientRetries: extractionPolicy.maxTransientRetries,
            onRetry: () => {
              hdrProbeTransientRetries += 1;
            }
          });
          const meta = attempted.result;
          if (isHdrColorSpace(meta.colorSpace)) {
            nativeHdrVideoIds.add(v.id);
            videoTransfers.set(v.id, detectTransfer(meta.colorSpace));
          }
          return null;
        } catch (error) {
          if (extractionPolicy.failureMode === "off") throw error;
          const classified = classifyVideoExtractionError(error);
          log?.warn("Video HDR metadata probe failed", {
            mode: extractionPolicy.failureMode,
            kind: classified.kind,
            retryable: classified.retryable,
            transientRetries: hdrProbeTransientRetries
          });
          return { error, classified };
        }
      })
    );
    throwHdrProbeFailures(probeFailures.filter(isHdrProbeFailure), extractionPolicy.failureMode);
  }
  const nativeHdrImageIds = /* @__PURE__ */ new Set();
  const imageTransfers = /* @__PURE__ */ new Map();
  const hdrImageSrcPaths = /* @__PURE__ */ new Map();
  const imageColorSpaces = [];
  if (job.config.hdrMode !== "force-sdr" && composition.images.length > 0) {
    const probed = await Promise.all(
      composition.images.map(async (img) => {
        const imgPath = resolveProjectRelativeSrc(img.src, projectDir, compiledDir);
        if (!existsSync10(imgPath)) return null;
        const colorSpace = await probeColorSpaceSafely(imgPath, log);
        if (isHdrColorSpace(colorSpace)) {
          nativeHdrImageIds.add(img.id);
          imageTransfers.set(img.id, detectTransfer(colorSpace));
          hdrImageSrcPaths.set(img.id, imgPath);
        }
        return colorSpace;
      })
    );
    imageColorSpaces.push(...probed);
  }
  if (composition.videos.length > 0) {
    const totalVideos = composition.videos.length;
    for (let i = 0; i < totalVideos; i++) {
      const v = composition.videos[i];
      log?.info(
        `Extracting frames from video ${i + 1}/${totalVideos}`,
        safeVideoExtractionSourceLogMetadata(v.src)
      );
    }
    extractionResult = await extractAllVideoFrames(
      composition.videos,
      projectDir,
      // Preserve the configured rational through FFmpeg extraction. NTSC
      // rates must remain `30000/1001`, not a rounded JavaScript decimal,
      // because short boundary counts can differ by one frame.
      {
        fps: job.config.fps,
        outputDir: join15(compiledDir, "__hyperframes_video_frames"),
        format: job.config.videoFrameFormat ?? "auto",
        toneMapHdrToSdr: job.config.hdrMode === "force-sdr",
        timelineEnd: composition.duration,
        maxTransientRetries: extractionPolicy.maxTransientRetries,
        collectProbeFailures: extractionPolicy.failureMode === "enforce"
      },
      abortSignal,
      cfg,
      compiledDir
    );
    extractionResult.phaseBreakdown.transientRetries = (extractionResult.phaseBreakdown.transientRetries ?? 0) + hdrProbeTransientRetries;
    assertNotAborted();
    throwIfEncoderInterrupted(extractionResult);
    failureToEnforce = applyVideoExtractionFailurePolicy(extractionResult, extractionPolicy, log);
    materializeExtractedFramesForCompiledDir(extractionResult.extracted, compiledDir, {
      materializeSymlinks
    });
    if (extractionResult.extracted.length > 0) {
      frameLookup = createFrameLookupTable(
        composition.videos,
        extractionResult.extracted,
        resolveRenderFpsConfig(job.config.fps).value
      );
    }
    videoReadinessSkipIds = collectVideoReadinessSkipIds(
      nativeHdrVideoIds,
      extractionResult.extracted
    );
    videoMetadataHints = collectVideoMetadataHints(extractionResult.extracted);
    appendAutoDetectedVideoAudio(composition, extractionResult.extracted);
  }
  const videoExtractMs = Date.now() - stage2Start;
  return {
    extractionResult,
    frameLookup,
    videoReadinessSkipIds,
    videoMetadataHints,
    nativeHdrVideoIds,
    videoTransfers,
    nativeHdrImageIds,
    imageTransfers,
    hdrImageSrcPaths,
    imageColorSpaces,
    videoExtractMs,
    failureToEnforce
  };
}
function appendAutoDetectedVideoAudio(composition, extracted) {
  const existingAudioSrcs = new Set(composition.audios.map((a) => a.src));
  for (const ext of extracted) {
    if (!ext.metadata.hasAudio) continue;
    const video = composition.videos.find((v) => v.id === ext.videoId);
    if (!video || !video.hasAudio || video.hidden || existingAudioSrcs.has(video.src)) continue;
    composition.audios.push({
      id: `${video.id}-audio`,
      src: video.src,
      start: video.start,
      end: video.end,
      mediaStart: video.mediaStart,
      layer: 0,
      volume: 1,
      type: "video"
    });
    existingAudioSrcs.add(video.src);
  }
}

// ../producer/src/services/render/stages/audioStage.ts
import { join as join16 } from "path";
async function runAudioStage(input) {
  const {
    projectDir,
    workDir,
    compiledDir,
    duration,
    ffmpegProcessTimeout,
    audioGain,
    audios,
    abortSignal,
    assertNotAborted,
    log
  } = input;
  const stage3Start = Date.now();
  const audioOutputPath = join16(workDir, MIXED_AUDIO_FILENAME);
  let hasAudio = false;
  let audioError;
  let audioFailures;
  if (audios.length > 0) {
    let audioResult;
    try {
      audioResult = await processCompositionAudio(
        audios,
        projectDir,
        join16(workDir, "audio-work"),
        audioOutputPath,
        duration,
        abortSignal,
        { ffmpegProcessTimeout, audioGain },
        compiledDir
      );
    } catch (err) {
      assertNotAborted();
      const detail = err instanceof Error ? err.message : String(err);
      return {
        audioOutputPath,
        hasAudio: false,
        audioProcessMs: Date.now() - stage3Start,
        audioError: detail,
        // Synthesised rather than left undefined. The warning policy reads
        // owner, retryability, reason and stage off this list, so reporting the
        // FATAL failure — the one that took the whole mix down — with an empty
        // one gave it strictly less classification than a single dropped track
        // gets, which is the opposite of what this stage exists to do.
        // "internal" is the honest bucket: the stages enumerate ffmpeg steps
        // and this is the FX render, which is none of them.
        audioFailures: [
          {
            stage: "internal",
            reason: "internal",
            owner: "system",
            retryable: false,
            detail: detail.slice(0, 2e3)
          }
        ]
      };
    }
    assertNotAborted();
    const interrupted = audioResult.failures?.find(
      (failure) => failure.reason === "external_interruption"
    );
    if (interrupted) {
      throw encoderFailureError("Audio processing failed", {
        error: interrupted.detail,
        failureReason: "external_interruption"
      });
    }
    hasAudio = audioResult.success;
    audioFailures = audioResult.failures;
    if (!hasAudio) {
      audioError = audioResult.error ?? "audio mix failed for an unknown reason";
      for (const failure of audioResult.failures ?? []) {
        log?.warn("Audio track failed", {
          elementId: failure.elementId,
          stage: failure.stage,
          reason: failure.reason,
          owner: failure.owner,
          retryable: failure.retryable,
          detail: failure.detail
        });
      }
    }
  }
  const audioProcessMs = Date.now() - stage3Start;
  return {
    audioOutputPath,
    hasAudio,
    audioProcessMs,
    audioError,
    audioFailures
  };
}

// ../producer/src/services/render/stages/captureStage.ts
import { existsSync as existsSync11, readdirSync as readdirSync3, statfsSync as statfsSync2 } from "fs";
import { join as join17 } from "path";
function shouldAllowAdaptiveCaptureRetry(workerCount, _explicitlyConfigured) {
  return workerCount > 1;
}
var JPEG_RAW_RGBA_DIVISOR = 8;
var DISK_PROJECTION_SAMPLE_FRAMES = 10;
function estimateDiskCaptureBytes(totalFrames, captureOptions) {
  const scale = captureOptions.deviceScaleFactor ?? 1;
  const outputWidth = Math.ceil(captureOptions.width * scale);
  const outputHeight = Math.ceil(captureOptions.height * scale);
  const rawBytes = Math.ceil(totalFrames) * outputWidth * outputHeight * 4;
  return frameFileExtension(captureOptions.format) === "jpg" ? Math.ceil(rawBytes / JPEG_RAW_RGBA_DIVISOR) : rawBytes;
}
function freeDiskBytesAt(path) {
  try {
    const stat = statfsSync2(path);
    return stat.bavail * stat.bsize;
  } catch {
    return null;
  }
}
function inspectDiskCaptureHeadroom(framesDir, totalFrames, captureOptions, freeDiskBytes = freeDiskBytesAt) {
  const freeBytes = freeDiskBytes(framesDir);
  const estimatedBytes = estimateDiskCaptureBytes(totalFrames, captureOptions);
  if (freeBytes === null || estimatedBytes <= freeBytes * 0.9) {
    return { available: true, estimatedBytes, freeBytes };
  }
  return { available: false, estimatedBytes, freeBytes };
}
function diskCaptureShortfallError(needBytes, freeBytes, framesDir, basis) {
  const basisNote = basis === "measured" ? ` (measured from the first ${DISK_PROJECTION_SAMPLE_FRAMES} frames)` : "";
  return new Error(
    `Disk capture may need ~${(needBytes / 1e6).toFixed(1)} MB of temporary frame storage${basisNote}, but only ${(freeBytes / 1e6).toFixed(1)} MB is free at ${framesDir}. Disk capture stores every frame as an image file (JPEG, or PNG for alpha). mp4/mov renders stream instead: always at --workers 1, and multi-worker on Linux BeginFrame capture. This render landed on disk because the output is png-sequence or gif, because it is multi-worker screenshot capture (opt in with HF_CAPTURE_PARALLEL_STREAM=true), or because streaming was switched off: HF_CAPTURE_PARALLEL_STREAM=false, PRODUCER_ENABLE_STREAMING_ENCODE=false, or the duration cap (PRODUCER_STREAMING_ENCODE_DURATION_CAP_ENABLED=true) on a render longer than PRODUCER_STREAMING_ENCODE_MAX_DURATION_SECONDS. HDR and shader-transition renders never reach this check; they run their own compositor. Re-run with --workers 1, use --low-memory-mode, or free up disk space.`
  );
}
function assertDiskCaptureHeadroom(framesDir, totalFrames, captureOptions, freeDiskBytes) {
  const headroom = inspectDiskCaptureHeadroom(
    framesDir,
    totalFrames,
    captureOptions,
    freeDiskBytes
  );
  if (headroom.available) return;
  throw diskCaptureShortfallError(
    headroom.estimatedBytes,
    headroom.freeBytes,
    framesDir,
    "estimate"
  );
}
function measureCaptureFrameBytes(workDir, framesDir) {
  let total = sampleDirectoryBytes(framesDir);
  if (!existsSync11(workDir)) return total;
  for (const attempt of readdirSync3(workDir)) {
    if (/^retry-\d+-batch-\d+-worker-\d+$/.test(attempt)) {
      total += sampleDirectoryBytes(join17(workDir, attempt));
      continue;
    }
    if (!/^capture-attempt-\d+$/.test(attempt)) continue;
    const attemptDir = join17(workDir, attempt);
    for (const name of readdirSync3(attemptDir)) {
      if (/^worker-\d+$/.test(name)) total += sampleDirectoryBytes(join17(attemptDir, name));
    }
  }
  return total;
}
function createDiskCaptureProjection(input) {
  const { framesDir, totalFrames, measureBytes, freeDiskBytes = freeDiskBytesAt } = input;
  let checked = false;
  return (capturedFrames) => {
    if (checked || capturedFrames < DISK_PROJECTION_SAMPLE_FRAMES) return;
    const measured = measureBytes();
    if (measured <= 0) return;
    checked = true;
    const remaining = totalFrames - capturedFrames;
    const freeBytes = freeDiskBytes(framesDir);
    if (remaining <= 0 || freeBytes === null) return;
    const needBytes = Math.ceil(measured / capturedFrames * remaining);
    if (needBytes > freeBytes * 0.9) {
      throw diskCaptureShortfallError(needBytes, freeBytes, framesDir, "measured");
    }
  };
}
async function runCaptureStage(input) {
  const {
    fileServer,
    workDir,
    framesDir,
    job,
    totalFrames,
    cfg,
    plan: plan2,
    log,
    captureAttempts,
    buildCaptureOptions,
    createRenderVideoFrameInjector,
    abortSignal,
    onProgress,
    frameRange,
    dedupPerfs
  } = input;
  let { probeSession } = input;
  let { workerCount } = plan2;
  const { forceScreenshot } = plan2;
  let lastBrowserConsole = [];
  let captureBeyondViewport = probeSession?.options.captureBeyondViewport;
  const captureCfg = cfg.forceScreenshot === forceScreenshot ? cfg : { ...cfg, forceScreenshot };
  if (frameRange !== void 0) {
    if (!Number.isFinite(frameRange.startFrame) || !Number.isFinite(frameRange.endFrame) || frameRange.startFrame < 0 || frameRange.endFrame <= frameRange.startFrame) {
      throw new Error(
        `[captureStage] invalid frameRange: ${JSON.stringify(frameRange)}. Expected non-negative startFrame strictly less than endFrame.`
      );
    }
    const rangeFrames = frameRange.endFrame - frameRange.startFrame;
    if (rangeFrames !== totalFrames) {
      throw new Error(
        `[captureStage] frameRange size (${rangeFrames}) must equal totalFrames (${totalFrames}). Received frameRange=${JSON.stringify(frameRange)}.`
      );
    }
  }
  const captureOptions = buildCaptureOptions();
  assertDiskCaptureHeadroom(framesDir, totalFrames, captureOptions);
  const checkDiskProjection = createDiskCaptureProjection({
    framesDir,
    totalFrames,
    measureBytes: () => measureCaptureFrameBytes(workDir, framesDir)
  });
  if (workerCount > 1) {
    const attempts = await executeDiskCaptureWithAdaptiveRetry({
      serverUrl: fileServer.url,
      workDir,
      framesDir,
      totalFrames,
      initialWorkerCount: workerCount,
      allowRetry: shouldAllowAdaptiveCaptureRetry(workerCount, job.config.workers !== void 0),
      frameExt: frameFileExtension(captureOptions.format),
      captureOptions,
      createBeforeCaptureHook: createRenderVideoFrameInjector,
      abortSignal,
      frameRangeStart: frameRange?.startFrame,
      dedupPerfs,
      onProgress: (progress) => {
        if (progress.latestWorkerPhase) {
          if (progress.capturedFrames === 0) reportWorkerStartup(job, progress, onProgress);
          return;
        }
        job.framesRendered = progress.capturedFrames;
        checkDiskProjection(progress.capturedFrames);
        const frameProgress = progress.capturedFrames / progress.totalFrames;
        reportFrameProgress(
          job,
          `Capturing frame ${progress.capturedFrames}/${progress.totalFrames} (${progress.activeWorkers} workers)`,
          Math.round(25 + frameProgress * 45),
          onProgress,
          progress.capturedFrames,
          progress.totalFrames
        );
      },
      cfg: captureCfg,
      log
    });
    captureAttempts.push(...attempts);
    const lastAttempt = attempts[attempts.length - 1];
    if (lastAttempt) {
      workerCount = lastAttempt.workers;
    }
    if (probeSession) {
      captureBeyondViewport = probeSession.options.captureBeyondViewport;
      lastBrowserConsole = probeSession.browserConsoleBuffer;
      await closeCaptureSession(probeSession);
      probeSession = null;
    }
  } else {
    const sequential = await runSequentialDiskCapture(
      input,
      captureOptions,
      captureCfg,
      checkDiskProjection
    );
    probeSession = null;
    lastBrowserConsole = sequential.lastBrowserConsole;
    captureBeyondViewport = sequential.captureBeyondViewport;
  }
  return { workerCount, probeSession, lastBrowserConsole, captureBeyondViewport };
}
async function runSequentialDiskCapture(input, captureOptions, captureCfg, checkDiskProjection) {
  const {
    fileServer,
    framesDir,
    totalFrames,
    log,
    createRenderVideoFrameInjector,
    abortSignal,
    assertNotAborted,
    frameRange
  } = input;
  let { probeSession } = input;
  let lastBrowserConsole = [];
  let captureBeyondViewport;
  const { rangeStart, rangeEnd } = resolveCaptureRange(frameRange, totalFrames);
  const rangeFrames = rangeEnd - rangeStart;
  const frameExt = frameFileExtension(captureOptions.format);
  let transientRetriesUsed = 0;
  let resumeFrom = 0;
  while (true) {
    const videoInjector = createRenderVideoFrameInjector();
    const session = probeSession ?? await createCaptureSession(
      fileServer.url,
      framesDir,
      captureOptions,
      videoInjector,
      captureCfg
    );
    captureBeyondViewport = session.options.captureBeyondViewport;
    try {
      if (probeSession) {
        prepareCaptureSessionForReuse(session, framesDir, videoInjector);
        probeSession = null;
      }
      await ensureSessionReady(session);
      assertNotAborted();
      lastBrowserConsole = session.browserConsoleBuffer;
      await captureSessionFrames(session, {
        input,
        rangeStart,
        rangeEnd,
        resumeFrom,
        checkDiskProjection
      });
      break;
    } catch (error) {
      lastBrowserConsole = session.browserConsoleBuffer;
      const resume = planTransientResume(error, {
        abortSignal,
        rangeFrames,
        framesDir,
        frameExt,
        retriesUsed: transientRetriesUsed
      });
      if (resume !== null) {
        transientRetriesUsed++;
        resumeFrom = resume;
        log.warn(
          "[Render] Transient browser failure during sequential capture; retrying once with a fresh session.",
          {
            resumeFrom,
            rangeFrames,
            transientRetriesUsed,
            error: error instanceof Error ? error.message : String(error)
          }
        );
        continue;
      }
      throw wrapCaptureStageError(error, lastBrowserConsole);
    } finally {
      lastBrowserConsole = session.browserConsoleBuffer;
      await closeCaptureSession(session);
    }
  }
  return { lastBrowserConsole, captureBeyondViewport };
}
function resolveCaptureRange(frameRange, totalFrames) {
  return { rangeStart: frameRange?.startFrame ?? 0, rangeEnd: frameRange?.endFrame ?? totalFrames };
}
function planTransientResume(error, ctx) {
  const failure = classifyCaptureFailure(error, { signal: ctx.abortSignal });
  const missing = findMissingFrameRanges(ctx.rangeFrames, ctx.framesDir, ctx.frameExt);
  const [firstMissing] = missing;
  if (!firstMissing) return null;
  return isTransientCaptureRetryEligible(failure.kind, missing, ctx.retriesUsed) ? firstMissing.startFrame : null;
}
async function ensureSessionReady(session) {
  if (!session.isInitialized) {
    await initializeSession(session);
    return;
  }
  if (process.env.PRODUCER_EXPERIMENTAL_FAST_CAPTURE === "true") {
    await completeDeferredDrawElementInit(session);
  }
}
async function captureSessionFrames(session, { input, rangeStart, rangeEnd, resumeFrom, checkDiskProjection }) {
  const { job, framesDir, dedupPerfs, assertNotAborted, onProgress } = input;
  const rangeFrames = rangeEnd - rangeStart;
  const reportFrame = (fileIndex) => {
    job.framesRendered = fileIndex + 1;
    checkDiskProjection(fileIndex + 1);
    reportFrameProgress(
      job,
      `Capturing frame ${fileIndex + 1}/${rangeFrames}`,
      Math.round(25 + (fileIndex + 1) / rangeFrames * 45),
      onProgress,
      fileIndex + 1,
      rangeFrames
    );
  };
  if (session.workerEncodeEnabled) {
    let prev = null;
    const drainPrev = async () => {
      if (!prev) return;
      assertNotAborted();
      const buf = await prev.encodeResult;
      writeCapturedFrame(session, prev.fileIndex, buf);
      reportFrame(prev.fileIndex);
    };
    for (let i = resumeFrom; i < rangeFrames; i++) {
      assertNotAborted();
      const absoluteIdx = rangeStart + i;
      const time = absoluteIdx * job.config.fps.den / job.config.fps.num;
      const { encodeResult } = await captureFrameToBufferPipelined(session, i, time);
      await drainPrev();
      prev = { fileIndex: i, encodeResult };
    }
    await drainPrev();
  } else {
    for (let i = resumeFrom; i < rangeFrames; i++) {
      assertNotAborted();
      const absoluteIdx = rangeStart + i;
      const time = absoluteIdx * job.config.fps.den / job.config.fps.num;
      await captureFrame(session, i, time);
      reportFrame(i);
    }
  }
  await verifyDiskDrawElementSamples(
    session,
    {
      workerId: 0,
      startFrame: rangeStart + resumeFrom,
      endFrame: rangeEnd,
      outputDir: framesDir,
      outputFrameOffset: rangeStart
    },
    false
  );
  dedupPerfs.push(getCapturePerfSummary(session));
}

// ../producer/src/services/render/stages/captureHdrStage.ts
import { existsSync as existsSync13, mkdirSync as mkdirSync6 } from "fs";
import { join as join21 } from "path";

// ../producer/src/services/hdrImageTransferCache.ts
var DEFAULT_MAX_BYTES = 200 * 1024 * 1024;
function createHdrImageTransferCache(options = {}) {
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;
  if (!Number.isInteger(maxBytes) || maxBytes < 0) {
    throw new Error(
      `createHdrImageTransferCache: maxBytes must be a non-negative integer, got ${String(maxBytes)}`
    );
  }
  const entries = /* @__PURE__ */ new Map();
  let totalBytes = 0;
  function makeKey(imageId, targetTransfer) {
    return `${imageId}|${targetTransfer}`;
  }
  function evictUntilRoom(needed) {
    while (totalBytes + needed > maxBytes && entries.size > 0) {
      const lruKey = entries.keys().next().value;
      if (lruKey === void 0) break;
      const evicted = entries.get(lruKey);
      if (evicted) totalBytes -= evicted.byteLength;
      entries.delete(lruKey);
    }
  }
  return {
    getConverted(imageId, sourceTransfer, targetTransfer, source) {
      if (sourceTransfer === targetTransfer) {
        return source;
      }
      if (maxBytes === 0) {
        const fresh = Buffer.from(source);
        convertTransfer(fresh, sourceTransfer, targetTransfer);
        return fresh;
      }
      const key = makeKey(imageId, targetTransfer);
      const existing = entries.get(key);
      if (existing) {
        entries.delete(key);
        entries.set(key, existing);
        return existing;
      }
      const converted = Buffer.from(source);
      convertTransfer(converted, sourceTransfer, targetTransfer);
      if (converted.byteLength > maxBytes) {
        return converted;
      }
      evictUntilRoom(converted.byteLength);
      entries.set(key, converted);
      totalBytes += converted.byteLength;
      return converted;
    },
    size() {
      return entries.size;
    },
    bytesUsed() {
      return totalBytes;
    }
  };
}

// ../producer/src/services/render/stages/captureHdrSequentialLoop.ts
import { join as join18 } from "path";
async function runSequentialLayeredFrameLoop(input) {
  const {
    job,
    log,
    width,
    height,
    totalFrames,
    nativeHdrIds,
    nativeHdrImageIds,
    hdrCompositeCtx,
    hdrPerf,
    hdrEncoder,
    domSession,
    transitionRanges,
    sceneElements,
    compositeTransfer,
    hdrTargetTransfer,
    hdrVideoEndTimes,
    cleanedUpVideos,
    hdrVideoFrameSources,
    debugDumpEnabled,
    debugDumpDir,
    assertNotAborted,
    onProgress
  } = input;
  const beforeCaptureHook = domSession.onBeforeCapture;
  const bufSize = width * height * 6;
  const hasTransitions = transitionRanges.length > 0;
  const transitionBuffers = hasTransitions ? {
    bufferA: Buffer.alloc(bufSize),
    bufferB: Buffer.alloc(bufSize),
    output: Buffer.alloc(bufSize)
  } : null;
  const normalCanvas = Buffer.alloc(bufSize);
  for (let i = 0; i < totalFrames; i++) {
    assertNotAborted();
    const time = i * job.config.fps.den / job.config.fps.num;
    if (hdrPerf) hdrPerf.frames += 1;
    const stackingInfo = await seekInjectAndQueryStacking(
      domSession.page,
      time,
      beforeCaptureHook,
      nativeHdrIds,
      hdrPerf,
      "frameSeekMs",
      "frameInjectMs",
      "stackingQueryMs"
    );
    const activeTransition = transitionRanges.find((t) => i >= t.startFrame && i <= t.endFrame);
    if (i % 30 === 0 && (log.isLevelEnabled?.("debug") ?? true)) {
      const hdrEl = stackingInfo.find((e) => e.isHdr);
      log.debug("[Render] HDR layer composite frame", {
        frame: i,
        time: time.toFixed(2),
        hdrElement: hdrEl ? { z: hdrEl.zIndex, visible: hdrEl.visible, width: hdrEl.width } : null,
        stackingCount: stackingInfo.length,
        activeTransition: activeTransition?.shader
      });
    }
    if (activeTransition && transitionBuffers) {
      if (hdrPerf) hdrPerf.transitionFrames += 1;
      const transitionTimingStart = Date.now();
      const progress = activeTransition.endFrame === activeTransition.startFrame ? 1 : (i - activeTransition.startFrame) / (activeTransition.endFrame - activeTransition.startFrame);
      const sceneAIds = new Set(sceneElements[activeTransition.fromScene] ?? []);
      const sceneBIds = new Set(sceneElements[activeTransition.toScene] ?? []);
      timeHdrPhase(hdrPerf, "canvasClearMs", () => {
        transitionBuffers.bufferA.fill(0);
        transitionBuffers.bufferB.fill(0);
      });
      const sceneCaptures = [
        [transitionBuffers.bufferA, sceneAIds],
        [transitionBuffers.bufferB, sceneBIds]
      ];
      for (const [sceneBuf, sceneIds] of sceneCaptures) {
        assertNotAborted();
        await captureSceneIntoBuffer({
          session: domSession,
          sceneBuf,
          sceneIds,
          stackingInfo,
          time,
          width,
          height,
          nativeHdrIds,
          nativeHdrImageIds,
          beforeCaptureHook,
          hdrCompositeCtx,
          compositeTransfer,
          hdrTargetTransfer,
          hdrPerf,
          log,
          frameIdx: i
        });
      }
      const shaderName = activeTransition.shader;
      const transitionFn = shaderName ? TRANSITIONS[shaderName] ?? crossfade : crossfade;
      transitionFn(
        transitionBuffers.bufferA,
        transitionBuffers.bufferB,
        transitionBuffers.output,
        width,
        height,
        progress
      );
      addHdrTiming(hdrPerf, "transitionCompositeMs", transitionTimingStart);
      await timeHdrPhaseAsync(
        hdrPerf,
        "encoderWriteMs",
        async () => ensureFrameWritten(await hdrEncoder.writeFrame(transitionBuffers.output), i, hdrEncoder)
      );
    } else {
      if (hdrPerf) hdrPerf.normalFrames += 1;
      timeHdrPhase(hdrPerf, "canvasClearMs", () => normalCanvas.fill(0));
      await timeHdrPhaseAsync(
        hdrPerf,
        "normalCompositeMs",
        () => compositeHdrFrame(hdrCompositeCtx, normalCanvas, time, stackingInfo, void 0, i)
      );
      if (debugDumpEnabled && debugDumpDir && i % 30 === 0) {
        writeFileExclusiveSync(
          join18(debugDumpDir, `frame_${String(i).padStart(4, "0")}_final_rgb48le.bin`),
          normalCanvas
        );
      }
      await timeHdrPhaseAsync(
        hdrPerf,
        "encoderWriteMs",
        async () => ensureFrameWritten(await hdrEncoder.writeFrame(normalCanvas), i, hdrEncoder)
      );
    }
    cleanupEndedHdrVideos({
      time,
      activeTransition,
      hdrVideoEndTimes,
      cleanedUpVideos,
      hdrVideoFrameSources,
      sceneElements,
      log
    });
    job.framesRendered = i + 1;
    reportFrameProgress(
      job,
      `Layered composite frame ${i + 1}/${job.totalFrames}`,
      Math.round(25 + (i + 1) / totalFrames * 55),
      onProgress,
      i + 1,
      totalFrames
    );
  }
}

// ../producer/src/services/render/stages/captureHdrHybridLoop.ts
import { join as join20 } from "path";

// ../producer/src/services/shaderTransitionWorkerPool.ts
import { Worker } from "worker_threads";
import { fileURLToPath as fileURLToPath3, pathToFileURL } from "url";
import { dirname as dirname6, join as join19 } from "path";
import { createRequire } from "module";
import { existsSync as existsSync12 } from "fs";
import { cpus as cpus2 } from "os";
function resolveWorkerEntry(explicit) {
  if (explicit && explicit.length > 0) {
    return { path: explicit, isTs: explicit.endsWith(".ts") };
  }
  const override = process.env.HF_SHADER_WORKER_ENTRY;
  if (override && override.length > 0) {
    const isTs = override.endsWith(".ts");
    return { path: override, isTs };
  }
  const moduleDir = dirname6(fileURLToPath3(import.meta.url));
  const jsPath = join19(moduleDir, "shaderTransitionWorker.js");
  if (existsSync12(jsPath)) return { path: jsPath, isTs: false };
  const tsPath = join19(moduleDir, "shaderTransitionWorker.ts");
  return { path: tsPath, isTs: true };
}
function buildExecArgv(entryIsTs) {
  const inherited = [...process.execArgv];
  if (!entryIsTs) return inherited;
  const hasLoader = inherited.some(
    (a) => a.includes("tsx/esm") || a.includes("ts-node/esm") || a.includes("--import")
  );
  if (hasLoader) return inherited;
  try {
    const require2 = createRequire(import.meta.url);
    const tsxEsm = require2.resolve("tsx/esm");
    inherited.push("--import", pathToFileURL(tsxEsm).href);
  } catch {
  }
  return inherited;
}
async function createShaderTransitionWorkerPool(opts) {
  const cpuCount = Math.max(1, cpus2().length);
  const size = Math.max(1, Math.min(opts.size, cpuCount));
  const log = opts.log ?? {};
  const { path: entry, isTs: entryIsTs } = resolveWorkerEntry(opts.workerEntryPath);
  const slots = [];
  const queue = [];
  let terminated = false;
  const traceEnabled = process.env.HF_SHADER_POOL_TRACE === "1";
  let nextTaskId = 0;
  const execArgv = buildExecArgv(entryIsTs);
  const failQueueIfNoLiveSlots = () => {
    if (slots.some((s) => !s.dead)) return;
    while (queue.length > 0) {
      const t = queue.shift();
      if (t) t.reject(new Error("shader-blend pool has no live workers; task abandoned"));
    }
  };
  const dispatchNext = (slot) => {
    if (terminated || slot.busy || slot.dead) return;
    const task = queue.shift();
    if (!task) return;
    slot.busy = true;
    slot.current = task;
    if (traceEnabled) {
      const slotIdx = slots.indexOf(slot);
      const waitMs = task.enqueuedAtMs ? Date.now() - task.enqueuedAtMs : 0;
      const busyCount = slots.filter((s) => s.busy).length;
      log.info?.("[shaderPool] dispatch", {
        task: task.traceId,
        slot: slotIdx,
        shader: task.req.shader,
        waitMs,
        busyCount,
        queueDepth: queue.length
      });
    }
    const { bufferA, bufferB, output, shader, width, height, progress } = task.req;
    const abA = bufferA.buffer;
    const abB = bufferB.buffer;
    const abOut = output.buffer;
    try {
      slot.worker.postMessage(
        {
          shader,
          bufferA: abA,
          bufferB: abB,
          output: abOut,
          width,
          height,
          progress
        },
        [abA, abB, abOut]
      );
    } catch (err) {
      slot.busy = false;
      slot.current = null;
      task.reject(err instanceof Error ? err : new Error(String(err)));
    }
  };
  const onWorkerMessage = (slot, reply) => {
    const task = slot.current;
    slot.current = null;
    slot.busy = false;
    if (!task) {
      dispatchNext(slot);
      return;
    }
    if (!reply.ok) {
      task.reject(new Error(reply.error ?? "shader-blend worker failed"));
    } else {
      task.resolve({
        bufferA: Buffer.from(reply.bufferA),
        bufferB: Buffer.from(reply.bufferB),
        output: Buffer.from(reply.output)
      });
    }
    dispatchNext(slot);
  };
  const onWorkerError = (slot, err) => {
    const task = slot.current;
    slot.current = null;
    slot.busy = false;
    slot.dead = true;
    if (task) {
      task.reject(new Error(`shader-blend worker crashed mid-task: ${err.message}; buffers lost`));
    }
    log.warn?.("[shaderTransitionWorkerPool] worker errored", { err: err.message });
    failQueueIfNoLiveSlots();
  };
  const onWorkerExit = (slot, code) => {
    if (terminated) return;
    slot.dead = true;
    if (slot.current) {
      slot.current.reject(new Error(`shader-blend worker exited (code=${code}) mid-task`));
      slot.current = null;
      slot.busy = false;
    }
    log.warn?.("[shaderTransitionWorkerPool] worker exited unexpectedly", { code });
    failQueueIfNoLiveSlots();
  };
  try {
    for (let i = 0; i < size; i++) {
      const worker = new Worker(entry, { execArgv });
      const slot = { worker, busy: false, current: null, dead: false };
      worker.on("message", (msg) => onWorkerMessage(slot, msg));
      worker.on(
        "error",
        (err) => onWorkerError(slot, err instanceof Error ? err : new Error(String(err)))
      );
      worker.on("exit", (code) => onWorkerExit(slot, code));
      slots.push(slot);
    }
  } catch (err) {
    terminated = true;
    await Promise.all(slots.map((s) => s.worker.terminate().catch(() => void 0)));
    throw err;
  }
  log.info?.("[shaderTransitionWorkerPool] spawned", { size, entry });
  return {
    size,
    async run(req) {
      if (terminated) {
        throw new Error("shader-blend pool already terminated");
      }
      return new Promise((resolve11, reject) => {
        const task = traceEnabled ? { req, resolve: resolve11, reject, enqueuedAtMs: Date.now(), traceId: ++nextTaskId } : { req, resolve: resolve11, reject };
        const idle = slots.find((s) => !s.busy && !s.dead);
        if (idle) {
          queue.unshift(task);
          dispatchNext(idle);
        } else if (slots.some((s) => !s.dead)) {
          queue.push(task);
        } else {
          reject(new Error("shader-blend pool has no live workers"));
        }
      });
    },
    async terminate() {
      if (terminated) return;
      terminated = true;
      while (queue.length > 0) {
        const t = queue.shift();
        if (t) t.reject(new Error("shader-blend pool terminated before task ran"));
      }
      for (const slot of slots) {
        const t = slot.current;
        if (t) {
          slot.current = null;
          slot.busy = false;
          t.reject(new Error("shader-blend pool terminated mid-task"));
        }
      }
      await Promise.all(slots.map((s) => s.worker.terminate().catch(() => void 0)));
      log.info?.("[shaderTransitionWorkerPool] terminated", { size });
    }
  };
}

// ../producer/src/services/render/stages/captureHdrHybridLoop.ts
async function runHybridLayeredFrameLoop(input) {
  const {
    job,
    cfg,
    log,
    width,
    height,
    totalFrames,
    nativeHdrIds,
    nativeHdrImageIds,
    hdrCompositeCtx,
    hdrPerf,
    hdrEncoder,
    domSession,
    fileServer,
    buildCaptureOptions,
    createRenderVideoFrameInjector,
    transitionRanges,
    sceneElements,
    compositeTransfer,
    hdrTargetTransfer,
    workerCount,
    debugDumpEnabled,
    debugDumpDir,
    assertNotAborted,
    onProgress
  } = input;
  const transitionFramesSet = partitionTransitionFrames(transitionRanges, totalFrames);
  const hasTransitions = transitionRanges.length > 0;
  const bufSize = width * height * 6;
  const workerSessions = [];
  let shaderPool = null;
  try {
    for (let w = 0; w < workerCount - 1; w++) {
      const s = await createCaptureSession(
        fileServer.url,
        input.framesDir,
        buildCaptureOptions(),
        createRenderVideoFrameInjector(),
        cfg
      );
      await initializeSession(s);
      await initTransparentBackground(s.page, { clearCompositionRoot: true });
      workerSessions.push(s);
    }
    const sessions = [domSession, ...workerSessions];
    const activeWorkerCount = sessions.length;
    if (hasTransitions) {
      try {
        shaderPool = await createShaderTransitionWorkerPool({ size: activeWorkerCount, log });
      } catch (err) {
        log.warn(
          "[Render] Failed to spawn shader-blend worker pool; falling back to inline shader blend",
          { error: err instanceof Error ? err.message : String(err) }
        );
        shaderPool = null;
      }
    }
    const workerCanvases = sessions.map(() => Buffer.alloc(bufSize));
    const DEFAULT_TRANSITION_RING_DEPTH = 4;
    const TRANSITION_RING_DEPTH = Math.max(
      1,
      Number(process.env.HF_TRANSITION_RING_DEPTH ?? String(DEFAULT_TRANSITION_RING_DEPTH))
    );
    const workerTransitionRings = sessions.map(() => {
      if (!hasTransitions) return null;
      const ring = [];
      for (let k = 0; k < TRANSITION_RING_DEPTH; k++) {
        ring.push({
          bufferA: Buffer.alloc(bufSize),
          bufferB: Buffer.alloc(bufSize),
          output: Buffer.alloc(bufSize)
        });
      }
      return ring;
    });
    const workerRanges = distributeLayeredHybridFrameRanges(totalFrames, activeWorkerCount);
    let framesWritten = 0;
    const reorderBuffer = createFrameReorderBuffer(0, totalFrames);
    const writeEncoded = async (frameIdx, buf) => {
      await reorderBuffer.waitForFrame(frameIdx);
      const writeStart = Date.now();
      ensureFrameWritten(await hdrEncoder.writeFrame(buf), frameIdx, hdrEncoder);
      addHdrTiming(hdrPerf, "encoderWriteMs", writeStart);
      reorderBuffer.advanceTo(frameIdx + 1);
      framesWritten += 1;
      job.framesRendered = framesWritten;
      reportFrameProgress(
        job,
        `Layered composite frame ${framesWritten}/${job.totalFrames}`,
        Math.round(25 + framesWritten / totalFrames * 55),
        onProgress,
        framesWritten,
        totalFrames
      );
    };
    const poolRef = shaderPool;
    const workerTaskOf = async (w) => {
      const session = sessions[w];
      const canvas = workerCanvases[w];
      const range = workerRanges[w];
      const ring = workerTransitionRings[w];
      if (!session || !canvas || !range) return;
      const ringInFlight = ring ? ring.map(() => null) : [];
      let nextRingIdx = 0;
      for (let i = range.start; i < range.end; i++) {
        assertNotAborted();
        const time = i * job.config.fps.den / job.config.fps.num;
        const activeTransition = transitionFramesSet.has(i) ? transitionRanges.find((t) => i >= t.startFrame && i <= t.endFrame) : void 0;
        if (activeTransition && ring) {
          const slot = nextRingIdx;
          nextRingIdx = (nextRingIdx + 1) % TRANSITION_RING_DEPTH;
          const prev = ringInFlight[slot];
          if (prev) await prev;
          const buffers = ring[slot];
          if (!buffers) continue;
          await captureTransitionFrameOnWorker({
            session,
            frameIdx: i,
            time,
            transition: activeTransition,
            buffers,
            nativeHdrIds,
            nativeHdrImageIds,
            sceneElements,
            hdrCompositeCtx,
            width,
            height,
            compositeTransfer,
            hdrTargetTransfer,
            hdrPerf,
            log
          });
          const progress = activeTransition.endFrame === activeTransition.startFrame ? 1 : (i - activeTransition.startFrame) / (activeTransition.endFrame - activeTransition.startFrame);
          const frameIdx = i;
          const shaderName = activeTransition.shader;
          const dispatch = (async () => {
            if (poolRef && shaderName) {
              const blendStart = Date.now();
              const result = await poolRef.run({
                shader: shaderName,
                bufferA: buffers.bufferA,
                bufferB: buffers.bufferB,
                output: buffers.output,
                width,
                height,
                progress
              });
              buffers.bufferA = result.bufferA;
              buffers.bufferB = result.bufferB;
              buffers.output = result.output;
              addHdrTiming(hdrPerf, "transitionCompositeMs", blendStart);
            } else {
              const transitionFn = shaderName ? TRANSITIONS[shaderName] ?? crossfade : crossfade;
              const blendStart = Date.now();
              transitionFn(
                buffers.bufferA,
                buffers.bufferB,
                buffers.output,
                width,
                height,
                progress
              );
              addHdrTiming(hdrPerf, "transitionCompositeMs", blendStart);
            }
            await writeEncoded(frameIdx, buffers.output);
          })();
          ringInFlight[slot] = dispatch.catch((err) => {
            throw err instanceof Error ? err : new Error(String(err));
          });
        } else {
          const stackingInfo = await seekInjectAndQueryStacking(
            session.page,
            time,
            session.onBeforeCapture,
            nativeHdrIds,
            hdrPerf,
            "frameSeekMs",
            "frameInjectMs",
            "stackingQueryMs"
          );
          canvas.fill(0);
          const wctx = { ...hdrCompositeCtx, domSession: session };
          await timeHdrPhaseAsync(
            hdrPerf,
            "normalCompositeMs",
            () => compositeHdrFrame(wctx, canvas, time, stackingInfo, void 0, i)
          );
          if (debugDumpEnabled && debugDumpDir && i % 30 === 0) {
            writeFileExclusiveSync(
              join20(debugDumpDir, `frame_${String(i).padStart(4, "0")}_final_rgb48le.bin`),
              canvas
            );
          }
          await writeEncoded(i, canvas);
        }
      }
      for (const pending of ringInFlight) {
        if (pending) await pending;
      }
    };
    await Promise.all(sessions.map((_, w) => workerTaskOf(w)));
    await reorderBuffer.waitForAllDone();
  } finally {
    for (const s of workerSessions) {
      await closeCaptureSession(s).catch((err) => {
        log.warn("Hybrid worker session close failed", {
          err: err instanceof Error ? err.message : String(err)
        });
      });
    }
    if (shaderPool) {
      await shaderPool.terminate().catch((err) => {
        log.warn("Shader-blend worker pool terminate failed", {
          err: err instanceof Error ? err.message : String(err)
        });
      });
    }
  }
}

// ../producer/src/services/render/stages/captureHdrStage.ts
async function runCaptureHdrStage(input) {
  const {
    job,
    cfg,
    plan: plan2,
    log,
    projectDir,
    compiledDir,
    framesDir,
    videoOnlyPath,
    width,
    height,
    totalFrames,
    composition,
    hasHdrContent,
    effectiveHdr,
    nativeHdrVideoIds,
    nativeHdrImageIds,
    videoTransfers,
    imageTransfers,
    hdrImageSrcPaths,
    preset,
    effectiveQuality,
    effectiveBitrate,
    fileServer,
    buildCaptureOptions,
    createRenderVideoFrameInjector,
    hdrDiagnostics,
    abortSignal,
    assertNotAborted,
    onProgress
  } = input;
  const { workerCount } = plan2;
  const stageStart = Date.now();
  let lastBrowserConsole = [];
  let captureDurationMs = 0;
  let encodeMs = 0;
  const nativeHdrIds = /* @__PURE__ */ new Set([...nativeHdrVideoIds, ...nativeHdrImageIds]);
  log.info(
    hasHdrContent ? "[Render] HDR layered composite: z-ordered DOM + native HDR video/image layers" : "[Render] Shader transition composite: z-ordered SDR DOM layers"
  );
  const hdrPerf = createHdrPerfCollector();
  const hdrCfg = { ...cfg, forceScreenshot: true };
  if (!fileServer) throw new Error("fileServer must be initialized before HDR compositing");
  const prep = planHdrResources({
    composition,
    nativeHdrVideoIds,
    nativeHdrImageIds,
    projectDir,
    compiledDir
  });
  const domSession = await createCaptureSession(
    fileServer.url,
    framesDir,
    buildCaptureOptions(),
    createRenderVideoFrameInjector(),
    hdrCfg
  );
  let hdrEncoder = null;
  let hdrEncoderClosed = false;
  let domSessionClosed = false;
  let releaseHdrExtractionReservation = null;
  const hdrVideoFrameSources = /* @__PURE__ */ new Map();
  try {
    await initializeSession(domSession);
    assertNotAborted();
    lastBrowserConsole = domSession.browserConsoleBuffer;
    await initTransparentBackground(domSession.page, { clearCompositionRoot: true });
    const transitionMeta = await domSession.page.evaluate(() => {
      return window.__hf?.transitions ?? [];
    });
    const sceneElements = await domSession.page.evaluate(() => {
      const scenes = document.querySelectorAll(".scene");
      const map = {};
      for (const scene of scenes) {
        if (!scene.id) continue;
        const ids = /* @__PURE__ */ new Set([scene.id]);
        const els = scene.querySelectorAll("[id]");
        for (const el of els) {
          if (el.id) ids.add(el.id);
        }
        map[scene.id] = Array.from(ids);
      }
      return map;
    });
    const fpsDecimal = fpsToNumber(job.config.fps);
    const transitionRanges = transitionMeta.map((t) => ({
      ...t,
      startFrame: Math.floor(t.time * fpsDecimal),
      endFrame: Math.ceil((t.time + t.duration) * fpsDecimal)
    }));
    if (transitionRanges.length > 0) {
      log.info("[Render] Detected shader transitions for layered compositing", {
        count: transitionRanges.length,
        transitions: transitionRanges.map((t) => ({
          shader: t.shader,
          from: t.fromScene,
          to: t.toScene,
          frames: `${t.startFrame}-${t.endFrame}`
        }))
      });
    }
    hdrEncoder = await spawnStreamingEncoder(
      videoOnlyPath,
      {
        fps: job.config.fps,
        width,
        height,
        codec: preset.codec,
        preset: preset.preset,
        quality: effectiveQuality,
        bitrate: effectiveBitrate,
        pixelFormat: preset.pixelFormat,
        hdr: preset.hdr,
        rawInputFormat: "rgb48le"
      },
      abortSignal,
      { ffmpegStreamingTimeout: 36e5 }
    );
    assertNotAborted();
    await probeHdrExtractionDims({
      domSession,
      nativeHdrIds,
      nativeHdrImageIds,
      composition,
      prep
    });
    const extracted = await extractHdrVideoFrames({
      job,
      log,
      framesDir,
      composition,
      prep,
      width,
      height,
      abortSignal,
      hdrDiagnostics
    });
    releaseHdrExtractionReservation = extracted.releaseReservation;
    for (const [id, source] of extracted.sources) hdrVideoFrameSources.set(id, source);
    const hdrImageBuffers = decodeHdrImageBuffers({
      log,
      hdrImageSrcPaths,
      prep,
      hdrDiagnostics
    });
    assertNotAborted();
    try {
      const cleanedUpVideos = /* @__PURE__ */ new Set();
      const hdrVideoEndTimes = /* @__PURE__ */ new Map();
      for (const v of composition.videos) {
        if (hdrVideoFrameSources.has(v.id)) hdrVideoEndTimes.set(v.id, v.end);
      }
      const debugDumpEnabled = process.env.KEEP_TEMP === "1";
      const debugDumpDir = debugDumpEnabled ? join21(framesDir, "debug-composite") : null;
      if (debugDumpDir && !existsSync13(debugDumpDir)) {
        mkdirSync6(debugDumpDir, { recursive: true });
      }
      const compositeTransfer = resolveCompositeTransfer(hasHdrContent, effectiveHdr);
      const hdrTargetTransfer = compositeTransfer === "srgb" ? void 0 : compositeTransfer;
      const hdrCacheMaxBytes = process.env.HDR_TRANSFER_CACHE_MAX_BYTES ? Number(process.env.HDR_TRANSFER_CACHE_MAX_BYTES) : void 0;
      const hdrImageTransferCache = createHdrImageTransferCache(
        hdrCacheMaxBytes !== void 0 ? { maxBytes: hdrCacheMaxBytes } : {}
      );
      const hdrCompositeCtx = {
        log,
        domSession,
        beforeCaptureHook: domSession.onBeforeCapture,
        width,
        height,
        fps: fpsToNumber(job.config.fps),
        compositeTransfer,
        nativeHdrImageIds,
        hdrImageBuffers,
        hdrImageTransferCache,
        hdrVideoFrameSources,
        hdrVideoStartTimes: prep.hdrVideoStartTimes,
        imageTransfers,
        videoTransfers,
        debugDumpEnabled,
        debugDumpDir,
        hdrPerf
      };
      const effectiveWorkerCount = Math.max(1, workerCount);
      const transitionFrameCount = partitionTransitionFrames(transitionRanges, totalFrames).size;
      const useHybrid = shouldUseHybridLayeredPath({
        hasHdrContent,
        transitionFramesCount: transitionFrameCount,
        totalFrames,
        workerCount: effectiveWorkerCount
      });
      if (transitionRanges.length > 0) {
        log.info("[Render] Layered hybrid dispatch decision", {
          hybridEnabled: useHybrid,
          hasHdrContent,
          workerCount: effectiveWorkerCount,
          transitionFrameCount,
          totalFrames
        });
      }
      if (useHybrid) {
        await runHybridLayeredFrameLoop({
          job,
          cfg: hdrCfg,
          log,
          framesDir,
          width,
          height,
          totalFrames,
          nativeHdrIds,
          nativeHdrImageIds,
          hdrCompositeCtx,
          hdrPerf,
          hdrEncoder,
          domSession,
          fileServer,
          buildCaptureOptions,
          createRenderVideoFrameInjector,
          transitionRanges,
          sceneElements,
          compositeTransfer,
          hdrTargetTransfer,
          workerCount: effectiveWorkerCount,
          debugDumpEnabled,
          debugDumpDir,
          assertNotAborted,
          onProgress
        });
      } else {
        await runSequentialLayeredFrameLoop({
          job,
          log,
          width,
          height,
          totalFrames,
          nativeHdrIds,
          nativeHdrImageIds,
          hdrCompositeCtx,
          hdrPerf,
          hdrEncoder,
          domSession,
          transitionRanges,
          sceneElements,
          compositeTransfer,
          hdrTargetTransfer,
          hdrVideoEndTimes,
          cleanedUpVideos,
          hdrVideoFrameSources,
          debugDumpEnabled,
          debugDumpDir,
          assertNotAborted,
          onProgress
        });
      }
    } finally {
      lastBrowserConsole = domSession.browserConsoleBuffer;
      await closeCaptureSession(domSession);
      domSessionClosed = true;
    }
    const encodeFrom = job.progress;
    const hdrEncodeResult = await hdrEncoder.close(
      (frames) => reportEncodeProgress(job, frames, totalFrames, onProgress, encodeFrom)
    );
    hdrEncoderClosed = true;
    assertNotAborted();
    if (!hdrEncodeResult.success) {
      throw encoderFailureError("HDR encode failed", hdrEncodeResult);
    }
    reportEncodeProgress(job, totalFrames, totalFrames, onProgress, encodeFrom);
    captureDurationMs = Date.now() - stageStart;
    encodeMs = hdrEncodeResult.durationMs;
  } catch (error) {
    lastBrowserConsole = domSession.browserConsoleBuffer;
    throw wrapCaptureStageError(error, lastBrowserConsole);
  } finally {
    if (hdrEncoder && !hdrEncoderClosed) {
      try {
        await hdrEncoder.close();
      } catch (err) {
        log.warn("hdrEncoder defensive close failed", {
          err: err instanceof Error ? err.message : String(err)
        });
      }
    }
    if (!domSessionClosed) {
      await closeCaptureSession(domSession).catch((err) => {
        log.warn("closeCaptureSession defensive close failed", {
          err: err instanceof Error ? err.message : String(err)
        });
      });
    }
    for (const frameSource of hdrVideoFrameSources.values()) {
      cleanupHdrVideoFrameSource(frameSource, log);
    }
    hdrVideoFrameSources.clear();
    releaseHdrExtractionReservation?.();
    releaseHdrExtractionReservation = null;
  }
  return {
    lastBrowserConsole,
    hdrPerf,
    captureDurationMs,
    encodeMs,
    warnings: cloneCaptureWarnings(domSession.warnings)
  };
}

// ../producer/src/services/render/stages/encodeStage.ts
import {
  copyFileSync as copyFileSync2,
  existsSync as existsSync14,
  mkdirSync as mkdirSync7,
  readdirSync as readdirSync4,
  readFileSync as readFileSync6,
  rmSync as rmSync6,
  statSync as statSync4,
  writeFileSync as writeFileSync4
} from "fs";
import { dirname as dirname7, join as join23 } from "path";

// ../producer/src/services/render/stages/gifEncodeArgs.ts
import { join as join22 } from "path";
function fpsToFfmpegArg2(fps) {
  return fps.den === 1 ? String(fps.num) : `${fps.num}/${fps.den}`;
}
var KEEP_FILTER_GRAPH_WHEN_FRAMES_DROP_ALPHA = ["-reinit_filter", "0"];
var WRITE_EVERY_FRAME_WHOLE = ["-gifflags", "0"];
function framesInput(input, fpsArg) {
  return [
    "-framerate",
    fpsArg,
    ...KEEP_FILTER_GRAPH_WHEN_FRAMES_DROP_ALPHA,
    "-i",
    join22(input.framesDir, input.framePattern)
  ];
}
function buildGifPalettegenArgs(input) {
  const fpsArg = fpsToFfmpegArg2(input.fps);
  const transparency = input.preserveAlpha ? ":reserve_transparent=1" : "";
  return [
    "-y",
    ...framesInput(input, fpsArg),
    "-vf",
    `fps=${fpsArg},palettegen=stats_mode=diff${transparency}`,
    input.palettePath
  ];
}
function buildGifPaletteuseArgs(input) {
  const fpsArg = fpsToFfmpegArg2(input.fps);
  const transparency = input.preserveAlpha ? ":alpha_threshold=128" : "";
  return [
    "-y",
    ...framesInput(input, fpsArg),
    "-i",
    input.palettePath,
    "-lavfi",
    `fps=${fpsArg} [x]; [x][1:v] paletteuse=dither=sierra2_4a${transparency}`,
    "-loop",
    String(input.loop),
    ...input.wholeFrames ? WRITE_EVERY_FRAME_WHOLE : [],
    input.outputPath
  ];
}

// ../producer/src/services/render/stages/encodeStage.ts
function resolveGifLoop(loop) {
  const resolved = loop ?? 0;
  if (!Number.isInteger(resolved) || resolved < 0 || resolved > 65535) {
    throw new Error(`[Render] gifLoop must be an integer between 0 and 65535 (got ${resolved})`);
  }
  return resolved;
}
function gifEncodeFailure(startTime, outputPath, error, failureReason) {
  return {
    success: false,
    outputPath,
    durationMs: Date.now() - startTime,
    framesEncoded: 0,
    fileSize: 0,
    error,
    failureReason
  };
}
async function reencodeWithClearedWholeFrames(argsInput, run, startTime) {
  const { outputPath } = argsInput;
  const result = await runFfmpeg(buildGifPaletteuseArgs({ ...argsInput, wholeFrames: true }), run);
  if (!result.success) {
    const error = formatFfmpegError(result.exitCode, result.stderr);
    return gifEncodeFailure(startTime, outputPath, error, result.failureReason);
  }
  const gif = readFileSync6(outputPath);
  if (!clearGifFramesBeforeNext(gif)) {
    const error = "[FFmpeg] GIF output could not be parsed to clear its frames";
    return gifEncodeFailure(startTime, outputPath, error);
  }
  writeFileSync4(outputPath, gif);
  return null;
}
async function encodeGifFromDir(framesDir, framePattern, outputPath, input) {
  const startTime = Date.now();
  const files = readdirSync4(framesDir).filter((file) => file.match(/\.(jpg|jpeg|png)$/i));
  const frameCount = files.length;
  if (frameCount === 0) {
    return gifEncodeFailure(startTime, outputPath, "[FFmpeg] No frame files found in directory");
  }
  const argsInput = {
    framesDir,
    framePattern,
    palettePath: input.palettePath,
    outputPath,
    fps: input.fps,
    loop: input.loop,
    preserveAlpha: input.preserveAlpha
  };
  try {
    const run = { signal: input.signal, timeout: input.timeout };
    for (const args of [buildGifPalettegenArgs(argsInput), buildGifPaletteuseArgs(argsInput)]) {
      const result = await runFfmpeg(args, run);
      if (!result.success) {
        const error = formatFfmpegError(result.exitCode, result.stderr);
        return gifEncodeFailure(startTime, outputPath, error, result.failureReason);
      }
    }
    if (input.preserveAlpha && gifClearsAfterLeavingFrameInPlace(readFileSync6(outputPath)) !== false) {
      const failure = await reencodeWithClearedWholeFrames(argsInput, run, startTime);
      if (failure) return failure;
    }
    const fileSize = existsSync14(outputPath) ? statSync4(outputPath).size : 0;
    return {
      success: true,
      outputPath,
      durationMs: Date.now() - startTime,
      framesEncoded: frameCount,
      fileSize
    };
  } finally {
    rmSync6(input.palettePath, { force: true });
  }
}
function startEncodeProgress(job, stage, onProgress) {
  const total = job.totalFrames ?? 0;
  updateJobStatus(job, "encoding", stage, 75, onProgress, {
    code: "encode",
    ...total > 0 && { done: 0, total }
  });
  return (frames = total) => reportEncodeProgress(job, frames, total, onProgress, 75);
}
async function runEncodeStage(input) {
  const {
    job,
    log,
    outputPath,
    framesDir,
    videoOnlyPath,
    width,
    height,
    needsAlpha,
    hasAudio,
    audioOutputPath,
    isPngSequence,
    isGif,
    preset,
    effectiveQuality,
    effectiveBitrate,
    enableChunkedEncode,
    chunkedEncodeSize,
    abortSignal,
    assertNotAborted,
    onProgress
  } = input;
  const stage5Start = Date.now();
  if (isPngSequence) {
    const encoded = startEncodeProgress(job, "Writing PNG sequence", onProgress);
    if (!existsSync14(outputPath)) mkdirSync7(outputPath, { recursive: true });
    const captured = readdirSync4(framesDir).filter((name) => name.endsWith(".png")).sort();
    if (captured.length === 0) {
      throw new Error(
        `[Render] png-sequence output requested but no PNGs were captured to ${framesDir}`
      );
    }
    captured.forEach((name, i) => {
      const dst = join23(outputPath, formatExportFrameName(i, "png"));
      copyFileSync2(join23(framesDir, name), dst);
    });
    if (hasAudio && audioOutputPath && existsSync14(audioOutputPath)) {
      copyFileSync2(audioOutputPath, join23(outputPath, MIXED_AUDIO_FILENAME));
      log.info(
        `[Render] png-sequence: ${MIXED_AUDIO_FILENAME} sidecar written to ${outputPath}/${MIXED_AUDIO_FILENAME}`
      );
    }
    encoded();
    return { encodeMs: Date.now() - stage5Start };
  }
  const engineCfg = input.engineConfig ?? job.config.producerConfig ?? resolveConfig();
  if (isGif) {
    const encoded = startEncodeProgress(job, "Encoding GIF", onProgress);
    if (hasAudio) {
      log.warn("[Render] GIF output does not support audio; audio tracks will be ignored.");
    }
    const frameExt2 = frameFileExtension(input.captureImageFormat);
    const framePattern2 = `frame_%06d.${frameExt2}`;
    const loop = resolveGifLoop(job.config.gifLoop);
    const encodeResult2 = await encodeGifFromDir(framesDir, framePattern2, outputPath, {
      fps: job.config.fps,
      loop,
      palettePath: join23(dirname7(videoOnlyPath), "gif-palette.png"),
      preserveAlpha: needsAlpha,
      signal: abortSignal,
      timeout: engineCfg.ffmpegEncodeTimeout
    });
    assertNotAborted();
    if (!encodeResult2.success) {
      throw encoderFailureError("Encoding failed", encodeResult2);
    }
    encoded();
    return { encodeMs: Date.now() - stage5Start };
  }
  const onFramesEncoded = startEncodeProgress(job, "Encoding video", onProgress);
  const baseScaledEncodeTimeout = Math.ceil((job.duration ?? 0) * 4e3);
  const scaledEncodeTimeout = baseScaledEncodeTimeout * (job.config.quality === "high" ? 6 : 1);
  const videoEngineCfg = scaledEncodeTimeout > engineCfg.ffmpegEncodeTimeout ? { ...engineCfg, ffmpegEncodeTimeout: scaledEncodeTimeout } : engineCfg;
  const frameExt = frameFileExtension(input.captureImageFormat);
  const framePattern = `frame_%06d.${frameExt}`;
  const encoderOpts = {
    outputWidth: input.outputSize?.width,
    outputHeight: input.outputSize?.height,
    fps: job.config.fps,
    width,
    height,
    codec: preset.codec,
    preset: preset.preset,
    quality: effectiveQuality,
    bitrate: effectiveBitrate,
    pixelFormat: preset.pixelFormat,
    vp9CpuUsed: engineCfg.vp9CpuUsed,
    useGpu: job.config.useGpu,
    hdr: preset.hdr,
    // Distributed chunk renders pass these so the encoder writes closed-GOP
    // keyframes that survive `-f concat -c copy` at assemble time. In-process
    // renders leave both undefined → preserves the existing open-GOP output.
    lockGopForChunkConcat: input.lockGopForChunkConcat === true,
    gopSize: input.gopSize
  };
  const encodeResult = enableChunkedEncode ? await encodeFramesChunkedConcat(
    framesDir,
    framePattern,
    videoOnlyPath,
    encoderOpts,
    chunkedEncodeSize,
    abortSignal,
    videoEngineCfg,
    onFramesEncoded
  ) : await encodeFramesFromDir(
    framesDir,
    framePattern,
    videoOnlyPath,
    encoderOpts,
    abortSignal,
    videoEngineCfg,
    onFramesEncoded
  );
  assertNotAborted();
  if (!encodeResult.success) {
    throw encoderFailureError("Encoding failed", encodeResult);
  }
  onFramesEncoded();
  return { encodeMs: Date.now() - stage5Start };
}

// ../producer/src/services/render/stages/assembleStage.ts
import { extname as extname3 } from "path";

// ../producer/src/services/render/audioPadTrim.ts
import { spawn } from "child_process";
import { mkdtempSync as mkdtempSync3, renameSync as renameSync3, rmSync as rmSync7 } from "fs";
import { dirname as dirname8, join as join24 } from "path";
var AUDIO_DURATION_TOLERANCE_SECONDS = 1e-3;
var AAC_DELIVERY_TRUE_PEAK_DBFS = -1;
var AAC_TRUE_PEAK_CORRECTION_HEADROOM_DB = 0.5;
var MAX_TRUE_PEAK_CORRECTION_PASSES = 3;
function buildAacTruePeakCorrectionArgs(inputPath, outputPath, targetDurationSeconds, attenuationDb) {
  return [
    "-i",
    inputPath,
    "-map",
    "0:a:0",
    "-vn",
    "-af",
    `volume=${attenuationDb.toFixed(3)}dB`,
    "-t",
    formatSeconds(targetDurationSeconds),
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-y",
    outputPath
  ];
}
function buildPadTrimAudioPlan(audioPath, outputPath, sourceDurationSeconds, targetDurationSeconds) {
  const delta = targetDurationSeconds - sourceDurationSeconds;
  const targetSec = formatSeconds(targetDurationSeconds);
  if (Math.abs(delta) < AUDIO_DURATION_TOLERANCE_SECONDS) {
    return {
      operation: "copy",
      steps: [{ kind: "copy", args: ["-i", audioPath, "-c:a", "copy", "-y", outputPath] }],
      cleanupPaths: []
    };
  }
  if (delta > 0) {
    return {
      operation: "pad",
      steps: [
        {
          kind: "normalize",
          args: [
            "-i",
            audioPath,
            "-af",
            `apad,atrim=0:${targetSec}`,
            "-t",
            targetSec,
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-y",
            outputPath
          ]
        }
      ],
      cleanupPaths: []
    };
  }
  return {
    operation: "trim",
    steps: [
      {
        kind: "trim",
        args: [
          "-i",
          audioPath,
          "-af",
          `atrim=duration=${targetSec},asetpts=PTS-STARTPTS`,
          // `atrim` limits decoded samples but does not cap muxer timestamps
          // introduced by encoder delay/flush.  The output duration contract
          // is enforced at the container boundary as well; without `-t`, a
          // long primed source can retain its original tail after re-encode.
          "-t",
          targetSec,
          "-c:a",
          "aac",
          "-b:a",
          "192k",
          "-y",
          outputPath
        ]
      }
    ],
    cleanupPaths: []
  };
}
function formatSeconds(sec) {
  return sec.toFixed(6);
}
function sanitizeProbeFailure(reason, paths) {
  const message = reason instanceof Error ? reason.message : String(reason);
  return redactTelemetryString(redactKnownPaths(message, paths));
}
async function padOrTrimAudioToVideoFrameCount(input) {
  const probeVideo = input.probeVideoFrameInfo ?? ((videoPath) => defaultProbeVideoFrameInfo(videoPath, input.signal));
  const probeAudio = input.probeAudioInfo ?? defaultProbeAudioInfo;
  const runner = input.runFfmpeg ?? ((args) => defaultRunFfmpeg(args, input.signal));
  const probeTruePeak = input.probeAudioTruePeakDbfs ?? (input.runFfmpeg ? void 0 : defaultProbeAudioTruePeakDbfs);
  const [videoResult, audioResult] = await Promise.allSettled([
    probeVideo(input.videoPath),
    probeAudio(input.audioPath, input.signal)
  ]);
  const probePaths = [input.videoPath, input.audioPath, input.outputPath];
  if (videoResult.status === "rejected") {
    return failResult(
      input.outputPath,
      0,
      audioResult.status === "fulfilled" ? audioResult.value.durationSeconds : 0,
      `audioPadTrim: failed to probe video: ${sanitizeProbeFailure(
        videoResult.reason,
        probePaths
      )}`
    );
  }
  if (audioResult.status === "rejected") {
    return failResult(
      input.outputPath,
      0,
      0,
      `audioPadTrim: failed to probe audio: ${sanitizeProbeFailure(
        audioResult.reason,
        probePaths
      )}`
    );
  }
  const videoInfo = videoResult.value;
  const audioInfo = audioResult.value;
  if (!Number.isFinite(videoInfo.frameCount) || videoInfo.frameCount <= 0 || !Number.isFinite(videoInfo.fpsNum) || videoInfo.fpsNum <= 0 || !Number.isFinite(videoInfo.fpsDen) || videoInfo.fpsDen <= 0) {
    return failResult(
      input.outputPath,
      0,
      audioInfo.durationSeconds,
      `audioPadTrim: invalid video frame info: ${JSON.stringify(videoInfo)}`
    );
  }
  const targetDurationSeconds = videoInfo.frameCount * videoInfo.fpsDen / videoInfo.fpsNum;
  const plan2 = buildPadTrimAudioPlan(
    input.audioPath,
    input.outputPath,
    audioInfo.durationSeconds,
    targetDurationSeconds
  );
  try {
    for (const step of plan2.steps) {
      const ffmpegResult = await runner(step.args);
      if (!ffmpegResult.success) {
        return {
          success: false,
          outputPath: input.outputPath,
          targetDurationSeconds,
          sourceDurationSeconds: audioInfo.durationSeconds,
          operation: plan2.operation,
          error: ffmpegResult.error,
          failureReason: ffmpegResult.failureReason
        };
      }
    }
  } catch (err) {
    return {
      success: false,
      outputPath: input.outputPath,
      targetDurationSeconds,
      sourceDurationSeconds: audioInfo.durationSeconds,
      operation: plan2.operation,
      error: `audioPadTrim: failed to materialize ${plan2.operation}: ${err instanceof Error ? err.message : String(err)}`
    };
  } finally {
    for (const path of plan2.cleanupPaths) rmSync7(path, { force: true });
  }
  let loweredDb = 0;
  if (probeTruePeak) {
    const correction = await enforceAacTruePeak({
      audioPath: input.outputPath,
      targetDurationSeconds,
      signal: input.signal,
      probeTruePeak,
      runner
    });
    if (!correction.success) {
      return {
        success: false,
        outputPath: input.outputPath,
        targetDurationSeconds,
        sourceDurationSeconds: audioInfo.durationSeconds,
        operation: plan2.operation,
        error: correction.error,
        failureReason: correction.failureReason
      };
    }
    loweredDb = correction.loweredDb ?? 0;
  }
  return {
    success: true,
    outputPath: input.outputPath,
    targetDurationSeconds,
    sourceDurationSeconds: audioInfo.durationSeconds,
    operation: plan2.operation,
    ...loweredDb > 0 ? { audioLoweredDb: loweredDb } : {}
  };
}
async function enforceAacTruePeak(input) {
  let scratchDir;
  try {
    scratchDir = mkdtempSync3(join24(dirname8(input.audioPath), ".true-peak-"));
    const correctedPath = join24(scratchDir, "audio.m4a");
    const correctionTargetDbfs = AAC_DELIVERY_TRUE_PEAK_DBFS - AAC_TRUE_PEAK_CORRECTION_HEADROOM_DB;
    const measurements = [];
    let attenuationDb = 0;
    let measuredPath = input.audioPath;
    for (let pass = 0; pass <= MAX_TRUE_PEAK_CORRECTION_PASSES; pass += 1) {
      const truePeakDbfs = await input.probeTruePeak(measuredPath, input.signal);
      measurements.push(
        `pass ${pass}: ${truePeakDbfs.toFixed(3)} dBFS at ${attenuationDb.toFixed(3)} dB attenuation`
      );
      if (Number.isNaN(truePeakDbfs) || truePeakDbfs === Number.POSITIVE_INFINITY) {
        return { success: false, error: "audioPadTrim: FFmpeg reported an invalid true peak" };
      }
      if (truePeakDbfs <= AAC_DELIVERY_TRUE_PEAK_DBFS) {
        if (measuredPath !== correctedPath) return { success: true };
        renameSync3(correctedPath, input.audioPath);
        return { success: true, loweredDb: Number((-attenuationDb).toFixed(2)) };
      }
      if (pass === MAX_TRUE_PEAK_CORRECTION_PASSES) break;
      attenuationDb += correctionTargetDbfs - truePeakDbfs;
      const result = await input.runner(
        buildAacTruePeakCorrectionArgs(
          input.audioPath,
          correctedPath,
          input.targetDurationSeconds,
          attenuationDb
        )
      );
      if (!result.success) {
        return {
          success: false,
          error: sanitizeProbeFailure(
            result.error ?? "audioPadTrim: failed to constrain AAC true peak",
            [input.audioPath, correctedPath]
          ),
          failureReason: result.failureReason
        };
      }
      measuredPath = correctedPath;
    }
    return {
      success: false,
      error: `audioPadTrim: AAC true peak remained above ${AAC_DELIVERY_TRUE_PEAK_DBFS} dBFS after ${MAX_TRUE_PEAK_CORRECTION_PASSES} correction passes; ${measurements.join("; ")}`
    };
  } catch (err) {
    return {
      success: false,
      error: `audioPadTrim: failed to validate AAC true peak: ${sanitizeProbeFailure(
        err,
        scratchDir ? [input.audioPath, scratchDir] : [input.audioPath]
      )}`
    };
  } finally {
    if (scratchDir) rmSync7(scratchDir, { recursive: true, force: true });
  }
}
function failResult(outputPath, target, source, error) {
  return {
    success: false,
    outputPath,
    targetDurationSeconds: target,
    sourceDurationSeconds: source,
    operation: "copy",
    error
  };
}
async function defaultProbeVideoFrameInfo(videoPath, signal) {
  const fastInfo = await runFfprobeJson(
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=nb_frames,r_frame_rate",
      "-of",
      "json",
      "--",
      videoPath
    ],
    signal
  );
  let stream = fastInfo.streams?.[0];
  const fastCount = Number(stream?.nb_frames);
  if (stream && Number.isFinite(fastCount) && fastCount > 0) {
    return { frameCount: fastCount, ...parseFrameRate(stream.r_frame_rate ?? "") };
  }
  const slowInfo = await runFfprobeJson(
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-count_packets",
      "-show_entries",
      "stream=nb_read_packets,r_frame_rate",
      "-of",
      "json",
      "--",
      videoPath
    ],
    signal
  );
  stream = slowInfo.streams?.[0];
  if (!stream) throw new Error(`ffprobe found no video stream in ${videoPath}`);
  const slowCount = Number(stream.nb_read_packets);
  if (!Number.isFinite(slowCount) || slowCount <= 0) {
    throw new Error(`ffprobe returned no frame count: ${JSON.stringify(stream)}`);
  }
  return { frameCount: slowCount, ...parseFrameRate(stream.r_frame_rate ?? "") };
}
function parseFrameRate(rate) {
  const [n, d] = rate.split("/");
  const fpsNum = Number(n);
  const fpsDen = d === void 0 ? 1 : Number(d);
  if (!Number.isFinite(fpsNum) || !Number.isFinite(fpsDen) || fpsNum <= 0 || fpsDen <= 0) {
    throw new Error(`Invalid r_frame_rate: ${JSON.stringify(rate)}`);
  }
  return { fpsNum, fpsDen };
}
async function defaultProbeAudioInfo(audioPath, signal) {
  const metadata = await extractAudioMetadata(audioPath, { signal });
  return {
    durationSeconds: metadata.durationSeconds,
    sampleRate: metadata.sampleRate,
    channels: metadata.channels,
    audioCodec: metadata.audioCodec
  };
}
async function defaultProbeAudioTruePeakDbfs(audioPath, signal) {
  const result = await runFfmpeg(
    ["-i", audioPath, "-map", "0:a:0", "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"],
    { signal }
  );
  if (!result.success) {
    throw new Error(`[audioPadTrim] ${formatFfmpegError(result.exitCode, result.stderr)}`);
  }
  const matches = [...result.stderr.matchAll(/^\s*Peak:\s*([+-]?(?:[\d.]+|inf)) dBFS$/gim)];
  const token = matches.at(-1)?.[1]?.toLowerCase();
  const value = token === "-inf" ? Number.NEGATIVE_INFINITY : Number(token);
  if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY) {
    throw new Error("[audioPadTrim] FFmpeg did not report AAC true peak");
  }
  return value;
}
async function defaultRunFfmpeg(args, signal) {
  const result = await runFfmpeg(args, { signal });
  if (result.success) return { success: true };
  return {
    success: false,
    error: `[audioPadTrim] ${formatFfmpegError(result.exitCode, result.stderr)}`,
    failureReason: result.failureReason
  };
}
async function runFfprobeJson(args, signal) {
  if (!args.includes("--")) {
    throw new Error('[audioPadTrim] ffprobe args must terminate options with "--".');
  }
  const proc = spawn(getFfprobeBinary(), args, {
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true
  });
  trackChildProcess(proc);
  let stdout = "";
  proc.stdout.on("data", (data) => {
    stdout += data.toString();
  });
  const managed = new ManagedChildProcess(proc, {
    signal,
    deadlineAtMs: Date.now() + 3e4
  });
  const outcome = await managed.wait();
  if (outcome.reason === "spawn_error") {
    if (outcome.error?.code === "ENOENT") {
      throw new Error("[audioPadTrim] ffprobe not found. Please install FFmpeg.");
    }
    throw outcome.error ?? new Error(outcome.stderr);
  }
  if (outcome.reason !== "exit" || outcome.exitCode !== 0) {
    const probed = args[args.length - 1];
    const scrubbed = redactKnownPaths(outcome.stderr, probed === void 0 ? [] : [probed]);
    throw new Error(`ffprobe ${outcome.reason}: ${redactTelemetryString(scrubbed, 2e3)}`);
  }
  try {
    return JSON.parse(stdout);
  } catch (err) {
    throw new Error(`Failed to parse ffprobe output: ${err.message}`);
  }
}

// ../producer/src/services/render/stages/assembleStage.ts
function recordLimiterAttenuation(job, audioLoweredDb) {
  if (audioLoweredDb === void 0) return;
  job.audioLoweredDb = audioLoweredDb;
  const ceiling = `\u2212${Math.abs(AAC_DELIVERY_TRUE_PEAK_DBFS)} dBTP`;
  (job.config.logger ?? defaultLogger).info(
    `Audio lowered by ${audioLoweredDb.toFixed(1)} dB to stay under ${ceiling}`,
    { audioLoweredDb }
  );
}
function startAssembleProgress(job, seconds, onProgress) {
  updateJobStatus(job, "assembling", "Assembling final video", 90, onProgress, {
    code: "assemble",
    ...seconds > 0 && { done: 0, total: seconds }
  });
  if (seconds <= 0) return void 0;
  return (done) => reportAssembleProgress(job, done, seconds, onProgress);
}
async function runAssembleStage(input) {
  const { job, onProgress } = input;
  const seconds = job.duration ?? 0;
  const result = await assembleOutput(input, startAssembleProgress(job, seconds, onProgress));
  reportAssembleProgress(job, seconds, seconds, onProgress);
  return result;
}
async function assembleOutput(input, onSecondsWritten) {
  const {
    job,
    videoOnlyPath,
    audioOutputPath,
    outputPath,
    hasAudio,
    format,
    abortSignal,
    assertNotAborted
  } = input;
  const isHls = format === "hls";
  const stage6Start = Date.now();
  if (hasAudio) {
    const audioExtension = extname3(audioOutputPath);
    const audioStem = audioExtension ? audioOutputPath.slice(0, -audioExtension.length) : audioOutputPath;
    const normalizedAudioPath = `${audioStem}.duration-normalized.m4a`;
    const normalizeResult = await padOrTrimAudioToVideoFrameCount({
      videoPath: videoOnlyPath,
      audioPath: audioOutputPath,
      outputPath: normalizedAudioPath,
      signal: abortSignal
    });
    assertNotAborted();
    if (!normalizeResult.success) {
      throw encoderFailureError("Audio duration normalization failed", normalizeResult);
    }
    recordLimiterAttenuation(job, normalizeResult.audioLoweredDb);
    if (isHls) {
      await runHlsPackaging(input, normalizeResult.outputPath);
    } else {
      const muxResult = await muxVideoWithAudio(
        videoOnlyPath,
        normalizeResult.outputPath,
        outputPath,
        abortSignal,
        {
          audioCodec: "aac"
        },
        job.config.fps,
        onSecondsWritten
      );
      assertNotAborted();
      if (!muxResult.success) {
        throw encoderFailureError("Audio muxing failed", muxResult);
      }
    }
  } else if (isHls) {
    await runHlsPackaging(input, null);
  } else {
    const faststartResult = await applyFaststart(
      videoOnlyPath,
      outputPath,
      abortSignal,
      void 0,
      job.config.fps,
      onSecondsWritten
    );
    assertNotAborted();
    if (!faststartResult.success) {
      throw encoderFailureError("Faststart failed", faststartResult);
    }
  }
  return { assembleMs: Date.now() - stage6Start };
}
async function runHlsPackaging(input, normalizedAudioPath) {
  const packageResult = await packageHls(
    input.videoOnlyPath,
    normalizedAudioPath,
    input.outputPath,
    {
      segmentSeconds: input.hlsSegmentSeconds ?? DEFAULT_HLS_SEGMENT_SECONDS,
      signal: input.abortSignal
    }
  );
  input.assertNotAborted();
  if (!packageResult.success) {
    throw encoderFailureError("HLS packaging failed", packageResult);
  }
}

// ../producer/src/services/render/motionBlurRoute.ts
var UNSUPPORTED_REASON = {
  sdr_streaming: null,
  sdr_disk: null,
  // Segmented capture runs the same per-frame capture loop as sdr_streaming;
  // only the encoder lifetime and the frame range differ, and neither is
  // visible to sub-frame accumulation.
  sdr_segmented: null,
  // Named for HDR but reached by shader transitions with no HDR content at all
  // (`shouldUseLayeredComposite`), so the reason must not blame HDR for a composition
  // that has none.
  hdr_layered: "the layered compositor, used for HDR content and for shader transitions, runs its own capture loop, seeking and blitting each layer itself, so a frame never reaches the sub-frame accumulation branch"
};
function assertMotionBlurSupported(motionBlur, route) {
  if (!motionBlur) return;
  const reason = UNSUPPORTED_REASON[route];
  if (reason === null) return;
  throw new Error(
    `[MotionBlur] sub-frame motion blur is not supported on the "${route}" capture route: ${reason}`
  );
}

// ../producer/src/services/renderOrchestrator.ts
function sampleDirectoryBytes(dir) {
  let total = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    let entries = [];
    try {
      entries = readdirSync5(current);
    } catch {
      continue;
    }
    for (const name of entries) {
      const full = join25(current, name);
      try {
        const st = statSync5(full);
        if (st.isDirectory()) {
          stack.push(full);
        } else if (st.isFile()) {
          total += st.size;
        }
      } catch {
      }
    }
  }
  return total;
}
function summarizeExtractionObservability(extractionResult, videoCount, coverageReports, authoredTimedClipCount) {
  const extracted = extractionResult?.extracted ?? [];
  const totalFramesExtracted = extractionResult?.totalFramesExtracted ?? 0;
  const maxFramesPerVideo = extracted.reduce((max, item) => Math.max(max, item.totalFrames), 0);
  const phaseBreakdown = extractionResult?.phaseBreakdown;
  const coverageGauges = coverageReports && coverageReports.length > 0 ? {
    minVideoFrameCoverageRatio: coverageReports.reduce(
      (min, r) => Math.min(min, r.ratio),
      Number.POSITIVE_INFINITY
    )
  } : {};
  return {
    videoCount,
    extractedVideoCount: extracted.length,
    totalFramesExtracted,
    maxFramesPerVideo,
    avgFramesPerExtractedVideo: extracted.length > 0 ? Math.round(totalFramesExtracted / extracted.length) : void 0,
    vfrProbeMs: phaseBreakdown?.vfrProbeMs,
    vfrPreflightMs: phaseBreakdown?.vfrPreflightMs,
    vfrPreflightCount: phaseBreakdown?.vfrPreflightCount,
    cacheHits: phaseBreakdown?.cacheHits,
    cacheMisses: phaseBreakdown?.cacheMisses,
    transientRetries: phaseBreakdown?.transientRetries,
    ...coverageGauges,
    authoredTimedClipCount
  };
}
var RenderQualityError = class extends Error {
  constructor(warnings) {
    super(
      `Render blocked by ${warnings.length} correctness warning${warnings.length === 1 ? "" : "s"}:
` + warnings.map((warning) => `- ${warning.code}: ${redactTelemetryString(warning.message)}`).join("\n")
    );
    this.warnings = warnings;
    this.name = "RenderQualityError";
  }
  warnings;
};
function applyRenderWarningPolicy(job, captureWarnings, log = defaultLogger) {
  job.warnings ??= [];
  const existing = new Set(
    job.warnings.map((warning) => `${warning.code}:${JSON.stringify(warning.details ?? {})}`)
  );
  for (const warning of captureWarnings) {
    const key = `${warning.code}:${JSON.stringify(warning.details ?? {})}`;
    if (existing.has(key)) continue;
    existing.add(key);
    job.warnings.push({
      ...cloneCaptureWarning(warning),
      stage: "capture-readiness"
    });
  }
  if (job.warnings.length === 0) return;
  const strictness = job.config.strictness ?? "best-effort";
  const typedRetryability = job.warnings.flatMap(
    (warning) => warning.details?.retryable === void 0 ? [] : [warning.details.retryable]
  );
  log.warn("Render completed capture with correctness warnings", {
    strictness,
    warningCodes: job.warnings.map((warning) => warning.code),
    warningReasons: job.warnings.flatMap((warning) => warning.details?.failureReasons ?? []),
    warningStages: job.warnings.flatMap((warning) => warning.details?.failureStages ?? []),
    warningOwners: job.warnings.flatMap(
      (warning) => warning.details?.failureOwner ? [warning.details.failureOwner] : []
    ),
    warningRetryable: typedRetryability.length === 0 ? void 0 : typedRetryability.every((retryable) => retryable)
  });
  const hasAudioProcessingFailure = job.warnings.some(
    (warning) => warning.code === "audio_processing_failed"
  );
  const hasScriptOrVfxFailure = job.warnings.some(
    (warning) => warning.code === "sub_timeline_script_failure" || warning.code === "vfx_failure"
  );
  if (strictness === "strict" || hasAudioProcessingFailure || hasScriptOrVfxFailure) {
    throw new RenderQualityError(job.warnings);
  }
}
var RenderCancelledError = class extends Error {
  reason;
  constructor(message = "render_cancelled", reason = "aborted") {
    super(message);
    this.name = "RenderCancelledError";
    this.reason = reason;
  }
};
function createRenderFileLogger(logPath, base = defaultLogger) {
  const write = (prefix, args) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    const line = `[${ts}] ${prefix} ${args.map((a) => typeof a === "string" ? a : JSON.stringify(a)).join(" ")}
`;
    try {
      appendFileSync(logPath, line);
    } catch (err) {
      base.debug("Debug log write failed", {
        logPath,
        error: err instanceof Error ? err.message : String(err)
      });
    }
  };
  const wrap = (level, prefix) => {
    return (message, meta) => {
      write(prefix, meta ? [message, meta] : [message]);
      base[level](message, meta);
    };
  };
  return {
    error: wrap("error", "ERR"),
    warn: wrap("warn", "WRN"),
    info: wrap("info", "LOG"),
    debug: wrap("debug", "DBG"),
    isLevelEnabled: (level) => base.isLevelEnabled?.(level) ?? true
  };
}
function collectVideoReadinessSkipIds(nativeHdrVideoIds, extractedVideos) {
  return Array.from(
    /* @__PURE__ */ new Set([
      ...nativeHdrVideoIds,
      ...extractedVideos.filter((video) => hasUsableVideoDimensions(video.metadata)).map((video) => video.videoId)
    ])
  ).sort();
}
function hasUsableVideoDimensions(metadata) {
  return Number.isFinite(metadata.width) && Number.isFinite(metadata.height) && metadata.width > 0 && metadata.height > 0;
}
function collectVideoMetadataHints(extractedVideos) {
  return extractedVideos.filter((video) => hasUsableVideoDimensions(video.metadata)).map((video) => ({
    id: video.videoId,
    width: video.metadata.width,
    height: video.metadata.height
  })).sort((a, b) => a.id.localeCompare(b.id));
}
function findMissingFrameRanges(totalFrames, framesDir, frameExt) {
  const ranges = [];
  let rangeStart = null;
  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    const framePath = join25(framesDir, formatCaptureFrameName(frameIndex, frameExt));
    const missing = !existsSync15(framePath) || statSync5(framePath).size <= 8;
    if (missing && rangeStart === null) {
      rangeStart = frameIndex;
    } else if (!missing && rangeStart !== null) {
      ranges.push({ startFrame: rangeStart, endFrame: frameIndex });
      rangeStart = null;
    }
  }
  if (rangeStart !== null) {
    ranges.push({ startFrame: rangeStart, endFrame: totalFrames });
  }
  return ranges;
}
function buildMissingFrameRetryBatches(ranges, maxWorkers, workDir, attempt, rangeStart = 0) {
  const workersPerBatch = Math.max(1, Math.floor(maxWorkers));
  const batches = [];
  for (let i = 0; i < ranges.length; i += workersPerBatch) {
    const batchIndex = batches.length;
    const batch = ranges.slice(i, i + workersPerBatch).map((range, workerId) => ({
      workerId,
      startFrame: rangeStart + range.startFrame,
      endFrame: rangeStart + range.endFrame,
      outputDir: join25(workDir, `retry-${attempt}-batch-${batchIndex}-worker-${workerId}`),
      outputFrameOffset: rangeStart
    }));
    batches.push(batch);
  }
  return batches;
}
function resolveObservedCaptureMode(forceScreenshot, platform2 = process.platform) {
  return forceScreenshot || platform2 !== "linux" ? "screenshot" : "beginframe";
}
function fallbackCaptureModeLabel(args) {
  if (args.forceScreenshot) return "screenshot";
  if (args.useDrawElement) return "drawelement";
  return resolveObservedCaptureMode(false, args.platform);
}
function createCaptureObservabilityUpdater(observability, platform2 = process.platform) {
  return (patch) => {
    Object.assign(observability, patch);
    observability.captureMode = resolveObservedCaptureMode(
      Boolean(observability.forceScreenshot),
      platform2
    );
  };
}
function getNextRetryWorkerCount(currentWorkers) {
  return Math.max(1, Math.floor(currentWorkers / 2));
}
function resolveRenderWorkDirPrefix(outputPath, jobId, platform2 = process.platform, systemTempDir = tmpdir2()) {
  if (platform2 === "win32") return join25(systemTempDir, "hf-render-");
  return join25(dirname9(outputPath), `work-${jobId}-`);
}
var MAX_TRANSIENT_CAPTURE_RETRIES = 1;
function isTransientCaptureRetryEligible(failureKind, missing, retriesUsed) {
  return missing.length > 0 && failureKind === "transient_browser" && retriesUsed < MAX_TRANSIENT_CAPTURE_RETRIES;
}
function captureAttemptMadeProgress(attemptTargetFrameCount, remainingFrameCount) {
  return remainingFrameCount < attemptTargetFrameCount;
}
function resetCaptureAttemptProgress(job) {
  job.framesRendered = 0;
}
function isRecoverableParallelCaptureError(error) {
  const message = normalizeErrorMessage(error);
  if (!message.includes("[Parallel] Capture failed")) return false;
  const kind = classifyCaptureFailure(error).kind;
  return kind === "transient_browser" || kind === "protocol_timeout";
}
function describeMemoryExhaustion(error, ctx) {
  if (!isMemoryExhaustionError(error)) return null;
  const raw = normalizeErrorMessage(error);
  const dims = ctx.width && ctx.height ? ` (${ctx.width}\xD7${ctx.height}${ctx.totalFrames ? `, ${ctx.totalFrames} frames` : ""})` : "";
  return `Render ran out of memory${dims}: ${raw}
The composition is too large for the available memory. To reduce memory pressure:
  - Lower the output resolution or split the composition into shorter scenes.
  - Reduce the frame count (shorter duration or lower fps).
  - Run with fewer parallel workers (\`--workers 1\`).
  - Set PRODUCER_LOW_MEMORY_MODE=true (or \`--low-memory-mode\`) to use the low-memory render profile.`;
}
function countCapturedFrames(totalFrames, framesDir, frameExt) {
  let captured = 0;
  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    const framePath = join25(framesDir, formatCaptureFrameName(frameIndex, frameExt));
    if (existsSync15(framePath)) captured++;
  }
  return captured;
}
function countFrameRanges(ranges) {
  return ranges.reduce((sum, range) => sum + (range.endFrame - range.startFrame), 0);
}
async function executeDiskCaptureWithAdaptiveRetry(options) {
  const attempts = [];
  let currentWorkers = options.initialWorkerCount;
  let missingRanges = null;
  let attempt = 0;
  let transientRetriesUsed = 0;
  let initializationRetriesUsed = 0;
  let pendingTransientRetry = false;
  const rangeStart = options.frameRangeStart ?? 0;
  while (true) {
    const frameCount = missingRanges ? countFrameRanges(missingRanges) : options.totalFrames;
    attempts.push({
      attempt,
      workers: currentWorkers,
      frameCount,
      reason: attempt === 0 ? "initial" : pendingTransientRetry ? "transient-retry" : "retry"
    });
    pendingTransientRetry = false;
    const attemptWorkDir = join25(options.workDir, `capture-attempt-${attempt}`);
    const batches = missingRanges ? buildMissingFrameRetryBatches(
      missingRanges,
      currentWorkers,
      attemptWorkDir,
      attempt,
      rangeStart
    ) : [distributeFrames(options.totalFrames, currentWorkers, attemptWorkDir, rangeStart)];
    options.dedupPerfs.length = 0;
    try {
      for (const tasks of batches) {
        const capturedBeforeBatch = countCapturedFrames(
          options.totalFrames,
          options.framesDir,
          options.frameExt
        );
        try {
          const workerResults = await executeParallelCapture(
            options.serverUrl,
            attemptWorkDir,
            tasks,
            options.captureOptions,
            options.createBeforeCaptureHook,
            options.abortSignal,
            options.onProgress ? (progress) => {
              options.onProgress?.({
                ...progress,
                totalFrames: options.totalFrames,
                capturedFrames: Math.min(
                  options.totalFrames,
                  capturedBeforeBatch + progress.capturedFrames
                )
              });
            } : void 0,
            void 0,
            options.cfg
          );
          pushWorkerDedupPerfs(workerResults, options.dedupPerfs);
        } finally {
          await mergeWorkerFrames(attemptWorkDir, tasks, options.framesDir);
        }
      }
      const remaining = findMissingFrameRanges(
        options.totalFrames,
        options.framesDir,
        options.frameExt
      );
      if (remaining.length === 0) {
        return attempts;
      }
      const remainingCount = countFrameRanges(remaining);
      const madeProgress = captureAttemptMadeProgress(frameCount, remainingCount);
      if (!madeProgress) {
        options.log.warn(
          "[Render] Capture attempt made no forward progress; composition is likely structurally broken \u2014 not retrying.",
          { attempt, frameCount, remainingCount, workers: currentWorkers }
        );
      }
      if (!options.allowRetry || currentWorkers <= 1 || !madeProgress) {
        throw new Error(`[Render] Capture completed but ${remainingCount} frame(s) are missing`);
      }
      const nextWorkers = getNextRetryWorkerCount(currentWorkers);
      options.log.warn("[Render] Retrying missing captured frames with fewer workers.", {
        fromWorkers: currentWorkers,
        toWorkers: nextWorkers,
        missingFrames: countFrameRanges(remaining)
      });
      currentWorkers = nextWorkers;
      missingRanges = remaining;
      attempt++;
    } catch (error) {
      const failure = classifyCaptureFailure(error, { signal: options.abortSignal });
      if (failure.kind === "cancelled") {
        throw error;
      }
      if (isDrawElementVerificationError(error) || isDrawElementCaptureError(error)) {
        throw error;
      }
      const remaining = findMissingFrameRanges(
        options.totalFrames,
        options.framesDir,
        options.frameExt
      );
      if (remaining.length === 0) {
        return attempts;
      }
      const remainingCount = countFrameRanges(remaining);
      const madeProgress = captureAttemptMadeProgress(frameCount, remainingCount);
      if (options.allowRetry && isTransientCaptureRetryEligible(failure.kind, remaining, transientRetriesUsed)) {
        transientRetriesUsed++;
        options.log.warn(
          "[Render] Transient browser failure during capture; retrying once with a fresh session.",
          {
            attempt,
            workers: currentWorkers,
            missingFrames: remainingCount,
            transientRetriesUsed,
            error: error instanceof Error ? error.message : String(error)
          }
        );
        missingRanges = remaining;
        attempt++;
        pendingTransientRetry = true;
        continue;
      }
      if (options.allowRetry && !madeProgress && initializationRetriesUsed === 0 && failure.kind === "protocol_timeout" && /\bNetwork\.enable timed out/i.test(failure.message)) {
        initializationRetriesUsed++;
        const nextWorkers2 = getNextRetryWorkerCount(currentWorkers);
        options.log.warn(
          "[Render] Browser initialization timed out; retrying once with fresh sessions.",
          {
            fromWorkers: currentWorkers,
            toWorkers: nextWorkers2,
            error: failure.message
          }
        );
        currentWorkers = nextWorkers2;
        missingRanges = remaining;
        attempt++;
        continue;
      }
      if (!madeProgress) {
        options.log.warn(
          "[Render] Capture attempt made no forward progress; composition is likely structurally broken \u2014 not retrying.",
          { attempt, frameCount, remainingCount, workers: currentWorkers }
        );
      }
      if (!options.allowRetry || currentWorkers <= 1 || !isRecoverableParallelCaptureError(error) || !madeProgress) {
        throw error;
      }
      const nextWorkers = getNextRetryWorkerCount(currentWorkers);
      options.log.warn("[Render] Parallel capture timed out; retrying missing frames.", {
        fromWorkers: currentWorkers,
        toWorkers: nextWorkers,
        missingFrames: countFrameRanges(remaining),
        error: error instanceof Error ? error.message : String(error)
      });
      currentWorkers = nextWorkers;
      missingRanges = remaining;
      attempt++;
    }
  }
}
function createRenderJob(config) {
  return {
    id: randomUUID(),
    config: {
      ...config,
      fps: toFps(config.fps),
      strictness: config.strictness ?? "best-effort"
    },
    status: "queued",
    progress: 0,
    currentStage: "Queued",
    createdAt: /* @__PURE__ */ new Date(),
    warnings: []
  };
}
function buildCaptureScaleScript(args) {
  const { authoredWidth, authoredHeight, captureWidth, captureHeight } = args;
  return `(() => {
  const root = document.querySelector("[data-composition-id]");
  if (!(root instanceof HTMLElement)) return;
  const authoredWidth = ${JSON.stringify(authoredWidth)};
  const authoredHeight = ${JSON.stringify(authoredHeight)};
  const captureWidth = ${JSON.stringify(captureWidth)};
  const captureHeight = ${JSON.stringify(captureHeight)};
  if (!Number.isFinite(authoredWidth) || !Number.isFinite(authoredHeight) || authoredWidth <= 0 || authoredHeight <= 0) return;
  const scaleX = captureWidth / authoredWidth;
  const scaleY = captureHeight / authoredHeight;
  const scale = Math.min(scaleX, scaleY);
  if (!Number.isFinite(scale) || scale <= 0 || Math.abs(scale - 1) < 0.0001) return;
  const scaledWidth = authoredWidth * scale;
  const scaledHeight = authoredHeight * scale;
  const offsetX = (captureWidth - scaledWidth) / 2;
  const offsetY = (captureHeight - scaledHeight) / 2;
  let wrapper = document.getElementById("__hf_capture_scale_wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "__hf_capture_scale_wrapper";
    const parent = root.parentNode;
    if (!parent) return;
    parent.insertBefore(wrapper, root);
    wrapper.appendChild(root);
  }
  document.documentElement.style.width = captureWidth + "px";
  document.documentElement.style.height = captureHeight + "px";
  document.documentElement.style.margin = "0";
  document.documentElement.style.overflow = "hidden";
  document.body.style.width = captureWidth + "px";
  document.body.style.height = captureHeight + "px";
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  wrapper.style.position = "absolute";
  wrapper.style.left = "0";
  wrapper.style.top = "0";
  wrapper.style.width = authoredWidth + "px";
  wrapper.style.height = authoredHeight + "px";
  wrapper.style.transformOrigin = "0 0";
  wrapper.style.transform = "translate(" + offsetX + "px, " + offsetY + "px) scale(" + scale + ")";
})();`;
}
function normalizeCompositionSrcPath(srcPath) {
  return srcPath.replace(/\\/g, "/").replace(/^\.\//, "");
}
function readSceneRootDuration(entryHtml) {
  if (!entryHtml) return null;
  const { document: document2 } = parseHTML(entryHtml);
  const template = document2.querySelector("template");
  const scope = template ? parseHTML(template.innerHTML).document : document2;
  const root = scope.querySelector("[data-composition-id]");
  return root?.getAttribute("data-duration") ?? null;
}
function createStandaloneEntryRenderClone(root, host, sceneDuration) {
  const hostClone = host.cloneNode(true);
  hostClone.setAttribute("data-start", "0");
  if (root === host) return hostClone;
  const rootClone = root.cloneNode(false);
  if (sceneDuration != null) {
    rootClone.setAttribute("data-duration", sceneDuration);
  } else {
    rootClone.removeAttribute("data-duration");
  }
  rootClone.appendChild(hostClone);
  return rootClone;
}
function replaceBodyWithRenderClone(body, renderClone) {
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  body.appendChild(renderClone);
}
function explainStreamingEncodeGate(cfg, outputFormat, workerCount, durationSeconds, forceParallelStream = false) {
  if (!cfg.enableStreamingEncode) return { enabled: false, reason: "disabled_by_config" };
  if (outputFormat === "png-sequence" || outputFormat === "gif") {
    return { enabled: false, reason: "format_excluded" };
  }
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return { enabled: false, reason: "invalid_duration" };
  }
  const overCap = cfg.streamingEncodeDurationCapEnabled === true && durationSeconds > cfg.streamingEncodeMaxDurationSeconds;
  if (overCap && !cfg.lowMemoryMode) return { enabled: false, reason: "duration_cap" };
  if (forceParallelStream || process.env.HF_DE_PARALLEL_STREAM === "true") {
    return { enabled: true, reason: "parallel_forced" };
  }
  if (workerCount === 1) {
    return { enabled: true, reason: overCap ? "low_memory_mode" : "single_worker" };
  }
  return { enabled: false, reason: "multi_worker" };
}
function shouldUseStreamingEncode(cfg, outputFormat, workerCount, durationSeconds, forceParallelStream = false) {
  return explainStreamingEncodeGate(
    cfg,
    outputFormat,
    workerCount,
    durationSeconds,
    forceParallelStream
  ).enabled;
}
function envInt(name, fallback) {
  const raw = process.env[name];
  if (raw === void 0 || raw.trim() === "") return fallback;
  const parsed = Number(raw);
  return Number.isInteger(parsed) ? parsed : fallback;
}
var MAX_REPORTED_ELEMENT_TAGS = 50;
var VFX_CAPTURE_RANK = { none: 0, self: 1, backdrop: 2 };
var ROOT_COMPOSITION_TAG_RE = /<[a-zA-Z][-a-zA-Z0-9]*\b[^>]*\bdata-composition-id=["'][^"']*["'][^>]*>/i;
function bucketPxDelta(delta) {
  if (delta === 0) return "0";
  if (delta <= 10) return "1-10";
  if (delta <= 50) return "11-50";
  return "51+";
}
function detectRootBodySizeMismatch(html) {
  const rootTag = html.match(ROOT_COMPOSITION_TAG_RE)?.[0];
  const dataWidth = rootTag && Number(rootTag.match(/\bdata-width=["'](\d+)["']/i)?.[1]);
  const dataHeight = rootTag && Number(rootTag.match(/\bdata-height=["'](\d+)["']/i)?.[1]);
  if (!dataWidth || !dataHeight) return {};
  const widthFirst = html.match(HTML_BODY_CSS_WIDTH_FIRST_RE);
  const heightFirst = widthFirst ? void 0 : html.match(HTML_BODY_CSS_HEIGHT_FIRST_RE);
  const [cssWidth, cssHeight] = widthFirst ? [Number(widthFirst[2]), Number(widthFirst[4])] : heightFirst ? [Number(heightFirst[4]), Number(heightFirst[2])] : [void 0, void 0];
  if (!cssWidth || !cssHeight) return {};
  const delta = Math.max(Math.abs(dataWidth - cssWidth), Math.abs(dataHeight - cssHeight));
  return { rootBodyMismatch: delta > 0, rootBodyDeltaPxBucket: bucketPxDelta(delta) };
}
function scanElementTags(html) {
  let markup = html;
  for (let previous = ""; markup !== previous; ) {
    previous = markup;
    markup = markup.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  }
  let total = 0;
  const counts = /* @__PURE__ */ new Map();
  for (const m of markup.matchAll(
    /<\/([a-zA-Z][-a-zA-Z0-9]*)|<(img|br|hr|input|source|track|area|base|col|embed|link|meta|param|wbr)\b|<([a-zA-Z][-a-zA-Z0-9]*)\b[^>]*\/>/gi
  )) {
    total++;
    const tag = (m[1] ?? m[2] ?? m[3] ?? "").toLowerCase();
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const byTag = Object.fromEntries(
    ranked.slice(0, MAX_REPORTED_ELEMENT_TAGS)
  );
  const otherCount = ranked.slice(MAX_REPORTED_ELEMENT_TAGS).reduce((sum, [, count]) => sum + count, 0);
  if (otherCount > 0) byTag.other = (byTag.other ?? 0) + otherCount;
  const arollVideoCount = markup.match(/<video\b[^>]*\bdata-aroll=["']true["'][^>]*>/gi)?.length ?? 0;
  const heygenVideoCount = markup.match(/<video\b[^>]*\bdata-media-source=["']heygen["'][^>]*>/gi)?.length ?? 0;
  const audioCount = counts.get("audio") ?? 0;
  const imageCount = counts.get("img") ?? 0;
  const audioGroupCount = counts.get(HF_AUDIO_GROUP_TAG) ?? 0;
  const subCompositionCount = markup.match(/<[a-zA-Z][-a-zA-Z0-9]*\b[^>]*\bdata-composition-src=["'][^"']*["']/gi)?.length ?? 0;
  let colorGradingCount = 0;
  let hasLut = false;
  for (const m of markup.matchAll(
    new RegExp(`\\b${HF_COLOR_GRADING_ATTR}=(?:"([^"]*)"|'([^']*)')`, "gi")
  )) {
    colorGradingCount++;
    if (!hasLut) hasLut = colorGradingValueHasLut(m[1] ?? m[2] ?? "");
  }
  let vfxHostCount = 0;
  let vfxCapture;
  const vfxTypeSet = /* @__PURE__ */ new Set();
  for (const m of markup.matchAll(new RegExp(`\\b${HF_VFX_ATTR}=(?:"([^"]*)"|'([^']*)')`, "gi"))) {
    vfxHostCount++;
    try {
      const chain = parseVfxChain(decodeHtmlAttrJson(m[1] ?? m[2] ?? ""));
      for (const node of chain.nodes) {
        if (node.enabled === false) continue;
        vfxTypeSet.add(node.type);
      }
      const capture = chainCapture(chain);
      if (vfxCapture === void 0 || VFX_CAPTURE_RANK[capture] > VFX_CAPTURE_RANK[vfxCapture]) {
        vfxCapture = capture;
      }
    } catch {
    }
  }
  const vfxTypes = [...vfxTypeSet].sort().join(",");
  return {
    total,
    byTag,
    arollVideoCount,
    heygenVideoCount,
    audioCount,
    imageCount,
    subCompositionCount,
    audioGroupCount,
    colorGradingCount,
    hasLut,
    vfxHostCount,
    vfxCapture,
    vfxTypes,
    ...detectRootBodySizeMismatch(html)
  };
}
function decodeHtmlAttrJson(rawAttributeValue) {
  return rawAttributeValue.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}
function colorGradingValueHasLut(rawAttributeValue) {
  const decoded = decodeHtmlAttrJson(rawAttributeValue);
  try {
    const parsed = JSON.parse(decoded);
    if (typeof parsed !== "object" || parsed === null || !("lut" in parsed)) return false;
    const lut = parsed.lut;
    if (typeof lut === "string") return lut.trim() !== "";
    if (typeof lut !== "object" || lut === null) return false;
    const src = lut.src;
    return typeof src === "string" && src.trim() !== "";
  } catch {
    return false;
  }
}
async function resolveCompositionElementCount(probeSession, html) {
  if (probeSession?.isInitialized) {
    try {
      const liveCount = await probeSession.page.evaluate(
        // Live HTMLCollection length — avoids materializing a static NodeList
        // on the large-DOM comps this gate exists to catch (review nit).
        () => document.getElementsByTagName("*").length
      );
      if (typeof liveCount === "number" && Number.isFinite(liveCount)) {
        return { count: liveCount, source: "live" };
      }
    } catch {
    }
  }
  const scan = scanElementTags(html);
  return {
    count: scan.total,
    source: "static",
    byTag: scan.byTag,
    arollVideoCount: scan.arollVideoCount,
    heygenVideoCount: scan.heygenVideoCount,
    audioCount: scan.audioCount,
    imageCount: scan.imageCount,
    subCompositionCount: scan.subCompositionCount,
    audioGroupCount: scan.audioGroupCount,
    colorGradingCount: scan.colorGradingCount,
    hasLut: scan.hasLut,
    rootBodyMismatch: scan.rootBodyMismatch,
    rootBodyDeltaPxBucket: scan.rootBodyDeltaPxBucket,
    vfxHostCount: scan.vfxHostCount,
    vfxCapture: scan.vfxCapture,
    vfxTypes: scan.vfxTypes
  };
}
var KNOWN_RUNTIME_ADAPTERS = [
  "animejs",
  "css",
  "d3",
  "google-maps",
  "gsap",
  "leaflet",
  "lottie",
  "mapbox",
  "maplibre",
  "three",
  "typegpu",
  "waapi"
];
var ADAPTER_STATIC_SIGNATURES = {
  animejs: /\b__hfAnime\b/,
  css: /@keyframes\s+[\w-]/,
  d3: /\b__hfD3\b/,
  "google-maps": /\b__hfGoogleMaps\b/,
  gsap: /\bgsap\.(timeline|to|from|fromTo|set)\s*\(/,
  leaflet: /\b__hfLeaflet\b/,
  lottie: /\b__hfLottie\b/,
  mapbox: /\b__hfMapbox\b/,
  maplibre: /\b__hfMaplibre\b/,
  three: /\bwindow\.THREE\b|\bTHREE\.(Scene|WebGLRenderer|PerspectiveCamera|DefaultLoadingManager)\b/,
  typegpu: /\bdata-requires-webgpu\b|\b__hfTypegpuTime\b/,
  waapi: /\.animate\s*\(\s*\[/
};
function detectAdaptersStatic(html) {
  return KNOWN_RUNTIME_ADAPTERS.filter((name) => ADAPTER_STATIC_SIGNATURES[name].test(html));
}
function probeAdaptersUsed() {
  const used = [];
  const w = window;
  const isNonEmptyArray = (value) => Array.isArray(value) && value.length > 0;
  if (typeof w.gsap !== "undefined") used.push("gsap");
  if (typeof w.THREE !== "undefined") used.push("three");
  if (isNonEmptyArray(w.__hfAnime)) used.push("animejs");
  if (isNonEmptyArray(w.__hfD3)) used.push("d3");
  if (isNonEmptyArray(w.__hfGoogleMaps)) used.push("google-maps");
  if (isNonEmptyArray(w.__hfLeaflet)) used.push("leaflet");
  if (isNonEmptyArray(w.__hfLottie)) used.push("lottie");
  if (isNonEmptyArray(w.__hfMapbox)) used.push("mapbox");
  if (isNonEmptyArray(w.__hfMaplibre)) used.push("maplibre");
  if (typeof w.__hfTypegpuTime === "number" || document.querySelector("[data-composition-id][data-requires-webgpu]")) {
    used.push("typegpu");
  }
  let liveAnimations = [];
  try {
    if (typeof document.getAnimations === "function") liveAnimations = document.getAnimations();
  } catch {
  }
  const isKeyframesCss = (animation) => typeof CSSAnimation !== "undefined" && animation instanceof CSSAnimation;
  const isTransition = (animation) => typeof CSSTransition !== "undefined" && animation instanceof CSSTransition;
  if (liveAnimations.some(isKeyframesCss)) used.push("css");
  if (liveAnimations.some((animation) => !isKeyframesCss(animation) && !isTransition(animation))) {
    used.push("waapi");
  }
  return used;
}
async function resolveAdaptersUsed(probeSession, html) {
  const staticAdapters = detectAdaptersStatic(html);
  if (!probeSession?.isInitialized) return staticAdapters;
  try {
    const live = await probeSession.page.evaluate(probeAdaptersUsed);
    if (!Array.isArray(live)) return staticAdapters;
    const detected = /* @__PURE__ */ new Set([...staticAdapters, ...live]);
    return KNOWN_RUNTIME_ADAPTERS.filter((name) => detected.has(name));
  } catch {
    return staticAdapters;
  }
}
function mergeWorkerInitObservability(perfs) {
  let initDurationMs;
  let tweenCount;
  let elementCount;
  for (const perf of perfs) {
    if (perf.initDurationMs !== void 0) {
      initDurationMs = initDurationMs === void 0 ? perf.initDurationMs : Math.max(initDurationMs, perf.initDurationMs);
    }
    if (perf.initTweenCount !== void 0) {
      tweenCount = tweenCount === void 0 ? perf.initTweenCount : Math.max(tweenCount, perf.initTweenCount);
    }
    if (perf.initElementCount !== void 0) {
      elementCount = elementCount === void 0 ? perf.initElementCount : Math.max(elementCount, perf.initElementCount);
    }
  }
  if (initDurationMs === void 0 && tweenCount === void 0 && elementCount === void 0) {
    return void 0;
  }
  return { initDurationMs, tweenCount, elementCount };
}
function resolveDeShortBand(args) {
  const decisive = args.bandEnabled && args.invertAtBandFloor && !args.invertAtBaseFloor;
  if (!decisive) return void 0;
  if (args.elementCountSource !== "live") return "unmeasured";
  return args.bandOpen ? "applied" : "skipped_elements";
}
function shouldPreferSingleWorkerDrawElement(args) {
  return args.workerCount > 1 && typeof args.requestedWorkers !== "number" && args.useDrawElement && !args.deCompileGate && !args.forceScreenshot && outputUsesH264Pipeline(args.outputFormat) && args.minFrames > 0 && args.totalFrames >= args.minFrames && args.singleWorkerStreamingOk && !args.layeredOrEffectRoute && !args.supersampling && !args.probeDeGated && !args.experimentalParallelDeOptIn;
}
function resolveInversionRetryPlan(args) {
  if (args.deWorkerInversion !== "inverted") return null;
  const workerCount = args.isMemoryExhaustion ? 1 : args.preInversionWorkerCount;
  return {
    workerCount,
    useStreamingEncode: shouldUseStreamingEncode(
      args.cfg,
      args.outputFormat,
      workerCount,
      args.durationSeconds
    ),
    deWorkerInversion: "reverted"
  };
}
function isDeParallelRouterEnabled(env) {
  const raw = env.HF_DE_PARALLEL_ROUTER?.trim().toLowerCase();
  if (raw === void 0 || raw === "") return true;
  return !(raw === "false" || raw === "0" || raw === "off" || raw === "no");
}
function shouldPreferParallelDrawElement(args) {
  return args.routerEnabled && args.parallelStreamingAvailable && args.workerCount > 1 && typeof args.requestedWorkers !== "number" && args.useDrawElement && !args.deCompileGate && !args.forceScreenshot && outputUsesH264Pipeline(args.outputFormat) && args.minFrames > 0 && args.totalFrames >= args.minFrames && !args.layeredOrEffectRoute && !args.supersampling && !args.probeDeGated && !args.experimentalParallelDeOptIn && // RAM floor: routed parallel DE runs 3 concurrent hardware-GPU Chrome
  // instances. On a 16 GB machine that produced vertical black slabs in the
  // final MP4 (wild report, CLI 0.7.52) — compositor tiles evicted under
  // GPU/memory pressure, and sampled self-verify can miss partial-frame
  // damage. Single-worker DE (the inversion) stays available below the
  // floor; only the parallel bet is withheld.
  (args.minMemoryMb <= 0 || args.totalMemoryMb >= args.minMemoryMb);
}
function resolveParallelRouterRetryPlan(args) {
  if (args.deParallelRouter !== "routed") return null;
  const workerCount = args.isMemoryExhaustion ? 1 : args.preRouterWorkerCount;
  return {
    workerCount,
    useStreamingEncode: shouldUseStreamingEncode(
      args.cfg,
      args.outputFormat,
      workerCount,
      args.durationSeconds
    ),
    deParallelRouter: "reverted"
  };
}
function shouldRetryViaPinnedFallback(args) {
  if (args.isCancellation || args.isEncoderInterrupted) return false;
  if (args.isVerifyError || args.isDeCaptureError) return true;
  if (args.isDeRendererStall === true || args.isSequentialCaptureStall === true) return true;
  if (args.isParallelCaptureStall === true || args.isEncoderDeath === true) return true;
  if (args.isTransientCaptureError === true) return true;
  return args.deWorkerInversion === "inverted" || args.deParallelRouter === "routed";
}
function isDeRendererStallError(err) {
  if (!(err instanceof Error)) return false;
  return err.name === "DeFrameTimeoutError" || err.message.includes("renderer stopped scheduling");
}
function isSequentialCaptureStallError(err) {
  if (!(err instanceof Error)) return false;
  return err.name === "SequentialCaptureStallError" || /^\[Render\] Sequential (?:drawElement|BeginFrame|screenshot) capture stalled:/.test(
    err.message
  );
}
function isParallelCaptureStallError(err) {
  if (!(err instanceof Error)) return false;
  return err.name === "ParallelCaptureStallError" || /^\[Render\] Parallel \S+ capture stalled/.test(err.message);
}
var ENCODER_DEATH_FRAME_RE = /^Streaming encoder exited before frame (\d+) was written/;
function isRetryableEncoderDeath(err) {
  if (!(err instanceof Error) || err instanceof EncoderInterruptedError) return false;
  const match = ENCODER_DEATH_FRAME_RE.exec(err.message);
  return match !== null && Number(match[1]) >= 2;
}
async function closeOrphanedProbeForRetry(probe, closer, log, retryContext) {
  try {
    await closer(probe);
  } catch (closeErr) {
    log.warn(`[Render] probe close before ${retryContext} retry failed; continuing with retry`, {
      error: closeErr instanceof Error ? closeErr.message : String(closeErr)
    });
  }
}
function resolveParallelCaptureMode(args) {
  const supersampling = (args.deviceScaleFactor ?? 1) > 1;
  return args.headlessShell && args.platform === "linux" && !args.forceScreenshot && !supersampling ? "beginframe" : "screenshot";
}
function isCaptureParallelStreamRouterEnabled(env, resolvedMode) {
  const raw = env.HF_CAPTURE_PARALLEL_STREAM?.trim().toLowerCase();
  if (raw === void 0 || raw === "") return resolvedMode === "beginframe";
  if (raw === "false" || raw === "0" || raw === "off" || raw === "no") return false;
  return true;
}
function isParallelStreamForced(env, flags) {
  return flags.deParallelStreamForced || flags.captureParallelStreamForced || env.HF_DE_PARALLEL_STREAM === "true";
}
var DEFAULT_SEGMENTED_MIN_SECONDS = Number.POSITIVE_INFINITY;
function resolveSegmentedMinSeconds(env) {
  const raw = env.HF_SEGMENTED_MIN_SECONDS;
  if (raw === void 0 || raw.trim() === "") return DEFAULT_SEGMENTED_MIN_SECONDS;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_SEGMENTED_MIN_SECONDS;
}
function shouldSegmentCapture(args) {
  const raw = args.env.HF_SEGMENTED_CAPTURE?.trim().toLowerCase();
  if (raw === "false" || raw === "0" || raw === "off" || raw === "no") return false;
  if (!args.streamingOk || args.layeredOrEffectRoute) return false;
  if (args.outputFormat !== "mp4" && args.outputFormat !== "mov") return false;
  if (raw === "true") return true;
  return args.durationSeconds >= resolveSegmentedMinSeconds(args.env);
}
function shouldStreamParallelCapture(args) {
  return args.routerEnabled && args.workerCount > 1 && !args.useDrawElement && outputUsesH264Pipeline(args.outputFormat) && args.streamingOk && !args.layeredOrEffectRoute;
}
function shouldClampDefaultDrawElement(args) {
  return args.useDrawElement && !args.fastCaptureExplicitOptIn && (!args.useStreamingEncode || args.workerCount > 1) && !args.deParallelStreamVerified;
}
function resolveCaptureForceScreenshotForPageSideCompositing(args) {
  return args.usePageSideCompositing ? true : args.forceScreenshot;
}
function shouldDiscardProbeSessionForPageSideCompositing(args) {
  return args.hasProbeSession && args.usePageSideCompositing;
}
function extractStandaloneEntryFromIndex(indexHtml, entryFile, entryHtml) {
  const normalizedEntryFile = normalizeCompositionSrcPath(entryFile);
  const { document: document2 } = parseHTML(indexHtml);
  const body = document2.querySelector("body");
  if (!body) return null;
  const hosts = Array.from(document2.querySelectorAll("[data-composition-src]"));
  const host = hosts.find(
    (candidate) => normalizeCompositionSrcPath(candidate.getAttribute("data-composition-src") || "") === normalizedEntryFile
  );
  if (!host) return null;
  const root = Array.from(body.children).find(
    (candidate) => candidate.hasAttribute("data-composition-id")
  ) ?? null;
  if (!root) return null;
  const sceneDuration = readSceneRootDuration(entryHtml) ?? host.getAttribute("data-duration");
  const renderClone = createStandaloneEntryRenderClone(root, host, sceneDuration);
  replaceBodyWithRenderClone(body, renderClone);
  return document2.toString();
}
function deVerifyFallbackTelemetry(err) {
  const details = getDrawElementVerificationDetails(err);
  return {
    reason: details?.kind ?? "psnr",
    failedDb: roundDb(details?.failedDb),
    frameIndex: details?.frameIndex,
    thresholdDb: roundDb(details?.verifyThresholdDb)
  };
}
function resolveRenderDebugDir() {
  const producerRoot = process.env.PRODUCER_RENDERS_DIR ? resolve6(process.env.PRODUCER_RENDERS_DIR, "..") : resolve6(dirname9(fileURLToPath4(import.meta.url)), "../..");
  return join25(producerRoot, ".debug");
}
async function executeRenderJob(job, projectDir, outputPath, progressSink, abortSignal, assertRenderActive) {
  validateHlsRenderConfig(job.config);
  const debugDir = resolveRenderDebugDir();
  const outputDir = dirname9(outputPath);
  if (!existsSync15(outputDir)) mkdirSync8(outputDir, { recursive: true });
  const workDir = job.config.debug ? join25(debugDir, job.id) : createRenderWorkDir(resolveRenderWorkDirPrefix(outputPath, job.id), outputDir);
  const pipelineStart = Date.now();
  const baseLog = job.config.logger ?? defaultLogger;
  const logPath = job.config.debug ? join25(workDir, "render.log") : null;
  const execution = new RenderExecutionContext({
    request: { renderJobId: job.id, projectDir, outputPath },
    logger: logPath ? createRenderFileLogger(logPath, baseLog) : baseLog,
    progressSink,
    signal: abortSignal
  });
  const log = execution.logger;
  execution.defer("remove workDir", () => {
    if (job.config.debug) return;
    if (job.status === "complete" && process.env.KEEP_TEMP === "1") {
      log.info("KEEP_TEMP=1 \u2014 leaving workDir on disk for inspection", { workDir });
      return;
    }
    rmSync8(workDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  });
  try {
    await executeRenderPipeline({
      job,
      projectDir,
      outputPath,
      workDir,
      logPath,
      pipelineStart,
      execution,
      assertRenderActive
    });
  } finally {
    await execution.dispose();
  }
}
async function executeRenderPipeline(input) {
  const {
    job,
    projectDir,
    outputPath,
    workDir,
    logPath,
    pipelineStart,
    execution,
    assertRenderActive
  } = input;
  const log = execution.logger;
  const eventPublisher = execution.events;
  const onProgress = execution.onProgress;
  const executionSignal = execution.signal;
  let fileServer = null;
  let probeSession = null;
  let lastBrowserConsole = [];
  let captureCompositionWidth;
  let captureCompositionHeight;
  let captureTotalFrames;
  const perfStages = {};
  const hdrDiagnostics = {
    videoExtractionFailures: 0,
    imageDecodeFailures: 0
  };
  let hdrPerf;
  const perfOutputPath = join25(workDir, "perf-summary.json");
  const cfg = { ...job.config.producerConfig ?? resolveConfig() };
  const observability = new RenderObservabilityRecorder({
    pipelineStartMs: pipelineStart,
    log,
    renderJobId: job.id
  });
  const outputFormat = job.config.format ?? "mp4";
  const isPngSequence = outputFormat === "png-sequence";
  const isGif = outputFormat === "gif";
  const isHls = outputFormat === "hls";
  const hlsSegmentSeconds = isHls ? resolveHlsSegmentSeconds(job.config) : void 0;
  const hlsEncoderGopLock = resolveHlsEncoderGopLock(
    outputFormat,
    job.config.fps,
    job.config.hlsSegmentSeconds
  );
  const artifactTransaction = new ArtifactTransaction(
    outputPath,
    isPngSequence || isHls ? "directory" : "file"
  );
  const stagedOutputPath = artifactTransaction.stagingPath;
  const needsAlpha = outputNeedsAlpha(outputFormat);
  const enableChunkedEncode = cfg.enableChunkedEncode;
  const chunkedEncodeSize = cfg.chunkSizeFrames;
  const captureObservability = {
    forceScreenshot: Boolean(cfg.forceScreenshot),
    captureMode: resolveObservedCaptureMode(Boolean(cfg.forceScreenshot)),
    browserGpuMode: cfg.browserGpuMode,
    protocolTimeoutMs: cfg.protocolTimeout,
    pageNavigationTimeoutMs: cfg.pageNavigationTimeout,
    playerReadyTimeoutMs: cfg.playerReadyTimeout
  };
  let extractionObservability;
  let compositionHash;
  const updateCaptureObservability = createCaptureObservabilityUpdater(captureObservability);
  const captureAttempts = [];
  const dedupPerfs = [];
  const layeredCaptureWarnings = [];
  const recordTransientRetryObservability = () => {
    const count = captureAttempts.filter((a) => a.reason === "transient-retry").length;
    if (count > 0) updateCaptureObservability({ transientRetries: count });
  };
  let memSampler = null;
  let deParallelRouter;
  let workerSizing;
  execution.defer("rollback staged artifact", () => artifactTransaction.rollback());
  execution.defer("close file server", () => {
    if (!fileServer) return;
    closeFileServerSafely(fileServer, "renderExecutionContext", log);
    fileServer = null;
  });
  execution.defer("close probe session", async () => {
    if (!probeSession) return;
    const session = probeSession;
    probeSession = null;
    await closeCaptureSession(session);
  });
  execution.defer("stop memory sampler", () => {
    memSampler?.stop();
    memSampler = null;
  });
  try {
    memSampler = createMemorySampler();
    const assertNotAborted = () => {
      execution.assertActive(() => new RenderCancelledError("render_cancelled"));
    };
    job.startedAt = /* @__PURE__ */ new Date();
    assertNotAborted();
    assertConfiguredFfmpegBinariesExist();
    if (!existsSync15(workDir)) mkdirSync8(workDir, { recursive: true });
    if (job.config.debug) {
      log.info("[Render] Debug artifacts enabled", { workDir, logPath });
    }
    log.info("[Render] Pipeline started", {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      fps: job.config.fps,
      format: outputFormat,
      quality: job.config.quality,
      browserGpuMode: cfg.browserGpuMode,
      forceScreenshot: cfg.forceScreenshot,
      protocolTimeout: cfg.protocolTimeout,
      browserTimeout: cfg.browserTimeout,
      pageNavigationTimeout: cfg.pageNavigationTimeout,
      playerReadyTimeout: cfg.playerReadyTimeout
    });
    observability.checkpoint("pipeline", "started", {
      format: outputFormat,
      quality: job.config.quality,
      browserGpuMode: cfg.browserGpuMode,
      forceScreenshot: Boolean(cfg.forceScreenshot),
      protocolTimeoutMs: cfg.protocolTimeout,
      pageNavigationTimeoutMs: cfg.pageNavigationTimeout,
      playerReadyTimeoutMs: cfg.playerReadyTimeout,
      requestedWorkers: job.config.workers ?? "auto"
    });
    const entryFile = job.config.entryFile || "index.html";
    let htmlPath = join25(projectDir, entryFile);
    if (!existsSync15(htmlPath)) {
      throw new Error(`Entry file not found: ${htmlPath}`);
    }
    assertNotAborted();
    const rawEntry = readFileSync7(htmlPath, "utf-8");
    if (entryFile !== "index.html" && rawEntry.trimStart().startsWith("<template")) {
      const wrapperPath = join25(workDir, "standalone-entry.html");
      const projectIndexPath = join25(projectDir, "index.html");
      if (!existsSync15(projectIndexPath)) {
        throw new Error(
          `Template entry file "${entryFile}" requires a project index.html to extract its render shell.`
        );
      }
      const standaloneHtml = extractStandaloneEntryFromIndex(
        readFileSync7(projectIndexPath, "utf-8"),
        entryFile,
        rawEntry
      );
      if (!standaloneHtml) {
        throw new Error(
          `Entry file "${entryFile}" is not mounted from index.html via data-composition-src, so it cannot be rendered independently.`
        );
      }
      writeFileSync5(wrapperPath, standaloneHtml, "utf-8");
      htmlPath = wrapperPath;
      log.info("Extracted standalone entry from index.html host context", {
        entryFile
      });
    }
    const stage1Start = Date.now();
    updateJobStatus(job, "preprocessing", "Compiling composition", 5, onProgress, {
      code: "compile"
    });
    const compileResult = await observeRenderStage(
      observability,
      "compile",
      { needsAlpha },
      () => runCompileStage({
        projectDir,
        workDir,
        htmlPath,
        entryFile,
        job,
        cfg,
        needsAlpha,
        log,
        assertNotAborted,
        variables: job.config.variables
      })
    );
    let compiled = compileResult.compiled;
    compositionHash = computeCompositionObservabilityHash(compiled.html);
    const composition = compileResult.composition;
    const { deviceScaleFactor, outputWidth, outputHeight } = compileResult;
    const { width, height } = composition;
    const captureSize = job.config.captureSize;
    const captureWidth = captureSize?.width ?? outputWidth;
    const captureHeight = captureSize?.height ?? outputHeight;
    const captureViewportWidth = captureSize?.width ?? width;
    const captureViewportHeight = captureSize?.height ?? height;
    const capturePixelRatio = captureSize ? 1 : deviceScaleFactor;
    const renderBodyScripts = [
      ...captureSize ? [buildCaptureScaleScript({ authoredWidth: width, authoredHeight: height, captureWidth, captureHeight })] : [],
      ...job.config.renderBodyScripts ?? []
    ];
    if (captureSize) {
      cfg.useDrawElement = false;
      cfg.forceScreenshot = true;
    }
    captureCompositionWidth = captureWidth;
    captureCompositionHeight = captureHeight;
    perfStages.compileOnlyMs = compileResult.compileOnlyMs;
    let captureForceScreenshot = captureSize ? true : compileResult.forceScreenshot;
    const deCompileGate = compileResult.deCompileGate;
    let deClampReason = cfg.useDrawElement ? void 0 : explainDrawElementDisabled({
      platform: process.platform,
      browserGpuMode: cfg.browserGpuMode,
      workerEncode: cfg.enableDrawElementWorkerEncode,
      chromeCeiling: chromeMajorCeiling()
    });
    let deWorkerInversion;
    let deParallelStreamForced = false;
    let captureParallelStreamForced = false;
    let deSelfVerifyFallback = false;
    let deFallbackReason;
    let deFallbackFailedDb;
    let deFallbackFrameIndex;
    let deFallbackThresholdDb;
    let deDrainStats;
    updateCaptureObservability({ forceScreenshot: captureForceScreenshot });
    observability.checkpoint("compile", "composition metadata resolved", {
      width,
      height,
      videoCount: composition.videos.length,
      audioCount: composition.audios.length,
      imageCount: composition.images.length,
      deviceScaleFactor,
      forceScreenshot: captureForceScreenshot,
      compositionHash
    });
    if (cfg.lowMemoryMode) {
      captureForceScreenshot = true;
      updateCaptureObservability({ forceScreenshot: captureForceScreenshot });
      log.info(
        "[Render] Low-memory render profile active \u2014 screenshot capture, auto-worker calibration skipped" + (job.config.workers === void 0 ? ", pinned to 1 worker" : "") + ". Override with --no-low-memory-mode or PRODUCER_LOW_MEMORY_MODE=false.",
        { totalMemMb: getSystemTotalMb(), thresholdMb: LOW_MEMORY_TOTAL_MB_THRESHOLD }
      );
    }
    const scaledProtocolTimeout = scaleProtocolTimeoutForComposition(cfg.protocolTimeout, {
      width: outputWidth,
      height: outputHeight
    });
    if (scaledProtocolTimeout > cfg.protocolTimeout) {
      log.info("[Render] Scaled CDP protocol timeout up for large composition.", {
        from: cfg.protocolTimeout,
        to: scaledProtocolTimeout,
        outputWidth,
        outputHeight,
        deviceScaleFactor
      });
      cfg.protocolTimeout = scaledProtocolTimeout;
      updateCaptureObservability({ protocolTimeoutMs: scaledProtocolTimeout });
    }
    const probeResult = await observeRenderStage(
      observability,
      "browser_probe",
      { forceScreenshot: captureForceScreenshot, stagePhase: "calibrating" },
      () => runProbeStage({
        projectDir,
        workDir,
        job,
        cfg,
        forceScreenshot: captureForceScreenshot,
        log,
        assertNotAborted,
        abortSignal: executionSignal,
        compiled,
        composition,
        width: captureViewportWidth,
        height: captureViewportHeight,
        needsAlpha,
        deviceScaleFactor: capturePixelRatio,
        renderBodyScripts
      }),
      // Browser probe is pre-capture; report `browser calibrating` so a
      // slow probe (~64s SwiftShader warm-up on Windows was the reported
      // shape) doesn't read as a zero-frame stall. Field signal ts=1784019503.
      { heartbeatMessage: "browser calibrating (frames not started)" }
    );
    compiled = probeResult.compiled;
    compositionHash = computeCompositionObservabilityHash(compiled.html);
    fileServer = probeResult.fileServer;
    probeSession = probeResult.probeSession;
    lastBrowserConsole = probeResult.lastBrowserConsole;
    let resolvedCaptureBeyondViewport = probeSession?.options.captureBeyondViewport;
    if (resolvedCaptureBeyondViewport !== void 0) {
      updateCaptureObservability({ captureBeyondViewport: resolvedCaptureBeyondViewport });
    }
    job.duration = probeResult.duration;
    job.totalFrames = probeResult.totalFrames;
    const totalFrames = probeResult.totalFrames;
    captureTotalFrames = totalFrames;
    validateRenderDuration({
      duration: probeResult.duration,
      totalFrames,
      fps: fpsToNumber(job.config.fps)
    });
    perfStages.browserProbeMs = probeResult.browserProbeMs;
    perfStages.compileMs = Date.now() - stage1Start;
    if (probeResult.beginFrameStalled && !captureForceScreenshot) {
      captureForceScreenshot = true;
      updateCaptureObservability({ forceScreenshot: captureForceScreenshot });
    }
    observability.checkpoint("browser_probe", "duration resolved", {
      durationSeconds: probeResult.duration,
      totalFrames,
      compositionHash,
      beginFrameStalled: probeResult.beginFrameStalled
    });
    updateJobStatus(job, "preprocessing", "Extracting video frames", 10, onProgress, {
      code: "extract_video"
    });
    const compiledDir = join25(workDir, "compiled");
    const extractResult = await observeRenderStage(
      observability,
      "video_extract",
      { videoCount: composition.videos.length },
      () => runExtractVideosStage({
        projectDir,
        compiledDir,
        job,
        cfg,
        log,
        composition,
        abortSignal: executionSignal,
        assertNotAborted,
        // Local staging can use links; distributed plan() alone requires real copies.
        materializeSymlinks: false
      })
    );
    const {
      extractionResult,
      frameLookup,
      videoReadinessSkipIds,
      videoMetadataHints,
      nativeHdrVideoIds,
      videoTransfers,
      nativeHdrImageIds,
      imageTransfers,
      hdrImageSrcPaths,
      imageColorSpaces,
      failureToEnforce
    } = extractResult;
    perfStages.videoExtractMs = extractResult.videoExtractMs;
    const coverageReports = extractionResult ? computeVideoFrameCoverage(composition.videos, extractionResult.extracted, job.config.fps) : [];
    const coverageThreshold = resolveVideoCoverageThreshold();
    const authoredTimedClipCount = countAuthoredTimedClips(compiled.html);
    extractionObservability = summarizeExtractionObservability(
      extractionResult,
      composition.videos.length,
      coverageReports,
      authoredTimedClipCount
    );
    observability.checkpoint("video_extract", "frames resolved", {
      videoCount: extractionObservability.videoCount,
      extractedVideoCount: extractionObservability.extractedVideoCount,
      totalFramesExtracted: extractionObservability.totalFramesExtracted,
      maxFramesPerVideo: extractionObservability.maxFramesPerVideo,
      avgFramesPerExtractedVideo: extractionObservability.avgFramesPerExtractedVideo ?? null,
      vfrPreflightCount: extractionObservability.vfrPreflightCount ?? null,
      vfrPreflightMs: extractionObservability.vfrPreflightMs ?? null,
      cacheHits: extractionObservability.cacheHits ?? null,
      cacheMisses: extractionObservability.cacheMisses ?? null,
      transientRetries: extractionObservability.transientRetries ?? null,
      minVideoFrameCoverageRatio: extractionObservability.minVideoFrameCoverageRatio ?? null,
      authoredTimedClipCount: extractionObservability.authoredTimedClipCount ?? null
    });
    if (failureToEnforce) throw failureToEnforce;
    assertVideoFrameCoverage(coverageReports, coverageThreshold);
    const autoPromotionTrigger = findRenderHdrAutoPromotionTrigger({
      extractionResult,
      videos: composition.videos,
      images: composition.images,
      nativeHdrImageIds
    });
    const effectiveHdr = resolveEffectiveHdrMode({
      hdrMode: job.config.hdrMode,
      outputFormat,
      extractionResult,
      imageColorSpaces,
      autoPromotionTrigger,
      log
    });
    observability.checkpoint("hdr_detection", "resolved", {
      requestedHdrMode: job.config.hdrMode ?? "auto",
      effectiveHdr: effectiveHdr ? effectiveHdr.transfer : "sdr",
      nativeHdrVideoCount: nativeHdrVideoIds.size,
      nativeHdrImageCount: nativeHdrImageIds.size
    });
    updateJobStatus(job, "preprocessing", "Processing audio tracks", 20, onProgress, {
      code: "process_audio"
    });
    const audioResult = await observeRenderStage(
      observability,
      "audio_process",
      { audioCount: composition.audios.length },
      () => runAudioStage({
        projectDir,
        workDir,
        compiledDir,
        duration: probeResult.duration,
        ffmpegProcessTimeout: cfg.ffmpegProcessTimeout,
        audioGain: cfg.audioGain,
        audios: composition.audios,
        abortSignal: executionSignal,
        assertNotAborted,
        log
      })
    );
    const { audioOutputPath, hasAudio } = audioResult;
    perfStages.audioProcessMs = audioResult.audioProcessMs;
    if (audioResult.audioError) {
      const audioFailures = audioResult.audioFailures ?? [];
      const failureOwner = audioFailures.length === 0 ? void 0 : audioFailures.some((failure) => failure.owner === "system") ? "system" : "user";
      const retryable = audioFailures.length === 0 ? void 0 : audioFailures.every((failure) => failure.retryable);
      applyRenderWarningPolicy(
        job,
        [
          {
            code: "audio_processing_failed",
            message: `Audio mix failed; output would be video-only: ${audioResult.audioError}`,
            details: {
              mediaType: "audio",
              failureReasons: [...new Set(audioFailures.map((failure) => failure.reason))],
              failureStages: [...new Set(audioFailures.map((failure) => failure.stage))],
              failureOwner,
              retryable
            }
          }
        ],
        log
      );
    }
    const stage4Start = Date.now();
    updateJobStatus(job, "rendering", "Starting frame capture", 25, onProgress, {
      code: "start_browsers"
    });
    if (!fileServer) {
      const fileServerStart = observability.stageStart("file_server", { reused: false });
      try {
        fileServer = await createFileServer({
          projectDir,
          compiledDir: join25(workDir, "compiled"),
          port: 0,
          preHeadScripts: [VIRTUAL_TIME_SHIM],
          bodyScripts: renderBodyScripts,
          fps: job.config.fps
        });
        assertNotAborted();
        observability.stageEnd("file_server", fileServerStart);
      } catch (error) {
        observability.stageError("file_server", fileServerStart, error);
        throw error;
      }
    } else {
      observability.checkpoint("file_server", "reused probe file server");
    }
    const activeFileServer = fileServer;
    if (!activeFileServer) {
      throw new Error("File server failed to initialize before frame capture");
    }
    const framesDir = join25(workDir, "captured-frames");
    if (!existsSync15(framesDir)) mkdirSync8(framesDir, { recursive: true });
    updateJobStatus(job, "rendering", "Checking browser GPU", 25, onProgress, {
      code: "start_browsers"
    });
    const resolvedBrowserGpuMode = await resolveBrowserGpuMode(cfg.browserGpuMode, {
      chromePath: resolveHeadlessShellPath(cfg),
      browserTimeout: cfg.browserTimeout
    });
    captureForceScreenshot = applyConcreteGpuScreenshotClamp(
      captureForceScreenshot,
      resolvedBrowserGpuMode,
      cfg
    );
    updateCaptureObservability({
      browserGpuMode: resolvedBrowserGpuMode,
      forceScreenshot: captureForceScreenshot
    });
    const videoCaptureBeyondViewport = resolveVideoCaptureBeyondViewport(composition.videos.length);
    const captureImageFormat = resolveCaptureImageFormat({
      needsAlpha,
      motionBlur: job.config.motionBlur
    });
    const captureOptions = {
      width: captureViewportWidth,
      height: captureViewportHeight,
      fps: job.config.fps,
      format: captureImageFormat,
      transparentBackground: needsAlpha,
      quality: captureImageFormat === "png" ? void 0 : job.config.quality === "draft" ? 80 : 95,
      variables: job.config.variables,
      deviceScaleFactor: capturePixelRatio,
      motionBlur: job.config.motionBlur,
      ...videoCaptureBeyondViewport !== void 0 ? { captureBeyondViewport: videoCaptureBeyondViewport } : {}
    };
    resolvedCaptureBeyondViewport = captureOptions.captureBeyondViewport ?? resolvedCaptureBeyondViewport;
    if (resolvedCaptureBeyondViewport !== void 0) {
      updateCaptureObservability({ captureBeyondViewport: resolvedCaptureBeyondViewport });
    }
    const buildCaptureOptions = () => ({
      ...captureOptions,
      videoMetadataHints,
      skipReadinessVideoIds: videoReadinessSkipIds,
      // Probe-resolved duration: drawElement self-verification derives its
      // sample frame indices from this so they land inside the drained range.
      compositionDurationSeconds: job.duration,
      requiresWebGpu: compositionRequiresWebGpu(compiled.html),
      // Live route for Chrome memory (spec §5 Phase −1). The aggregate route
      // through CapturePerfSummary only exists on success; a mid-capture
      // target loss never builds one, and that is the case this telemetry is
      // for. With parallel workers each session reports through the same
      // callback, so the record holds the most recent session's stats.
      onMemorySample: (stats) => {
        updateCaptureObservability({
          chromeBrowserRssPeakMb: stats.browserRssPeakMb,
          chromeRendererRssPeakMb: stats.rendererRssPeakMb,
          chromeRssLastMb: stats.rssLastMb,
          chromeGpuProcessSeenLastSample: stats.gpuProcessSeenLastSample,
          chromeMemorySamples: stats.samples
        });
      }
    });
    const createRenderVideoFrameInjector = () => createVideoFrameInjector(frameLookup, {
      frameDataUriCacheLimit: cfg.frameDataUriCacheLimit,
      frameDataUriCacheBytesLimitMb: cfg.frameDataUriCacheBytesLimitMb
    });
    let captureCalibration;
    const htmlInCanvasDetected = compiled.renderModeHints.reasons.some(
      (r) => r.code === "htmlInCanvas"
    );
    const nativeHdrIds = /* @__PURE__ */ new Set([...nativeHdrVideoIds, ...nativeHdrImageIds]);
    const hasHdrContent = Boolean(effectiveHdr && nativeHdrIds.size > 0);
    const deSingleMinFramesRaw = process.env.HF_DE_SINGLE_MIN_FRAMES;
    const deSingleMinFramesNum = deSingleMinFramesRaw === void 0 || deSingleMinFramesRaw.trim() === "" ? 900 : Number(deSingleMinFramesRaw);
    const deSingleMinFrames = Number.isFinite(deSingleMinFramesNum) ? deSingleMinFramesNum : 900;
    const deShortBandMinFrames = envInt("HF_DE_SHORT_MIN_FRAMES", 250);
    const deShortBandMaxElements = envInt("HF_DE_SHORT_MAX_ELEMENTS", 2500);
    const {
      count: compositionElementCount,
      source: compositionElementCountSource,
      byTag: compositionElementTags,
      arollVideoCount,
      heygenVideoCount,
      audioCount,
      imageCount,
      subCompositionCount,
      audioGroupCount,
      colorGradingCount,
      hasLut,
      rootBodyMismatch,
      rootBodyDeltaPxBucket,
      vfxHostCount,
      vfxCapture,
      vfxTypes
    } = await resolveCompositionElementCount(probeSession, compiled.html);
    const adaptersUsed = await resolveAdaptersUsed(probeSession, compiled.html);
    const deShortBandEnabled = deShortBandMaxElements > 0;
    const deShortBandOpen = deShortBandEnabled && deShortBandMinFrames > 0 && compositionElementCountSource === "live" && compositionElementCount <= deShortBandMaxElements;
    const deShortBandRoute = process.env.HF_DE_SHORT_BAND_ROUTE === "true";
    const WOULD_RESOLVE_MULTI_WORKER = 2;
    const deInversionArgs = {
      workerCount: WOULD_RESOLVE_MULTI_WORKER,
      requestedWorkers: job.config.workers,
      useDrawElement: cfg.useDrawElement,
      deCompileGate,
      forceScreenshot: captureForceScreenshot,
      outputFormat,
      totalFrames,
      minFrames: deSingleMinFrames,
      singleWorkerStreamingOk: shouldUseStreamingEncode(cfg, outputFormat, 1, job.duration),
      layeredOrEffectRoute: hasHdrContent || compiled.hasShaderTransitions,
      supersampling: deviceScaleFactor > 1,
      probeDeGated: probeSession !== null && probeSession.captureMode !== "drawelement" && !probeSession.deInitDeferred,
      experimentalParallelDeOptIn: process.env.PRODUCER_EXPERIMENTAL_FAST_CAPTURE === "true" || // Verified parallel DE streaming (opt-in) wants its parallelism kept.
      process.env.HF_DE_PARALLEL_STREAM === "true"
    };
    const invertAtBaseFloor = shouldPreferSingleWorkerDrawElement(deInversionArgs);
    const invertAtBandFloor = shouldPreferSingleWorkerDrawElement({
      ...deInversionArgs,
      minFrames: Math.min(deSingleMinFrames, deShortBandMinFrames)
    });
    const deShortBand = resolveDeShortBand({
      invertAtBaseFloor,
      invertAtBandFloor,
      bandEnabled: deShortBandEnabled,
      bandOpen: deShortBandOpen,
      elementCountSource: compositionElementCountSource
    });
    const deInversionEligible = deShortBandRoute && deShortBand === "applied" ? invertAtBandFloor : invertAtBaseFloor;
    const deInversionEffectiveMinFrames = deShortBandRoute && deShortBand === "applied" ? Math.min(deSingleMinFrames, deShortBandMinFrames) : deSingleMinFrames;
    const deParallelRouterEnabled = isDeParallelRouterEnabled(process.env);
    const deParallelMinFramesRaw = process.env.HF_DE_PARALLEL_MIN_FRAMES;
    const deParallelMinFramesNum = deParallelMinFramesRaw === void 0 || deParallelMinFramesRaw.trim() === "" ? 700 : Number(deParallelMinFramesRaw);
    const deParallelMinFrames = Number.isFinite(deParallelMinFramesNum) ? deParallelMinFramesNum : 700;
    const deParallelMinMemRaw = process.env.HF_DE_PARALLEL_MIN_MEM_MB;
    const deParallelMinMemNum = deParallelMinMemRaw === void 0 || deParallelMinMemRaw.trim() === "" ? 24576 : Number(deParallelMinMemRaw);
    const deParallelMinMemoryMb = Number.isFinite(deParallelMinMemNum) ? deParallelMinMemNum : 24576;
    const deParallelRouterEligible = shouldPreferParallelDrawElement({
      workerCount: WOULD_RESOLVE_MULTI_WORKER,
      requestedWorkers: job.config.workers,
      useDrawElement: cfg.useDrawElement,
      deCompileGate,
      forceScreenshot: captureForceScreenshot,
      outputFormat,
      totalFrames,
      minFrames: deParallelMinFrames,
      layeredOrEffectRoute: hasHdrContent || compiled.hasShaderTransitions,
      supersampling: deviceScaleFactor > 1,
      probeDeGated: probeSession !== null && probeSession.captureMode !== "drawelement" && !probeSession.deInitDeferred,
      experimentalParallelDeOptIn: process.env.PRODUCER_EXPERIMENTAL_FAST_CAPTURE === "true" || process.env.HF_DE_PARALLEL_STREAM === "true",
      routerEnabled: deParallelRouterEnabled,
      // Router pins 3 workers for the streaming path; don't pin when a
      // streaming gate (config, format, or the opt-in duration cap) would turn
      // that path off.
      parallelStreamingAvailable: shouldUseStreamingEncode(
        cfg,
        outputFormat,
        3,
        job.duration,
        true
      ),
      totalMemoryMb: Math.round(totalmem2() / (1024 * 1024)),
      minMemoryMb: deParallelMinMemoryMb
    });
    let workerCount;
    const captureStageObservationData = (extra = {}) => ({
      stagePhase: "capturing",
      ...extra,
      get workerCount() {
        return workerCount;
      },
      get forceScreenshot() {
        return captureForceScreenshot;
      },
      get totalFrames() {
        return totalFrames;
      },
      get framesCompleted() {
        return job.framesRendered ?? 0;
      },
      get captureMode() {
        return probeSession?.captureMode ?? fallbackCaptureModeLabel({
          forceScreenshot: captureForceScreenshot,
          useDrawElement: cfg.useDrawElement
        });
      },
      get captureOperation() {
        if ((job.framesRendered ?? 0) >= totalFrames) return "encode";
        const mode = probeSession?.captureMode ?? fallbackCaptureModeLabel({
          forceScreenshot: captureForceScreenshot,
          useDrawElement: cfg.useDrawElement
        });
        if (mode === "screenshot") return "captureScreenshot";
        if (mode === "drawelement") return "drawElement";
        return "beginFrame";
      }
    });
    if (job.config.workers === void 0 && totalFrames >= 60 && !htmlInCanvasDetected && !cfg.lowMemoryMode && !deInversionEligible && !deParallelRouterEligible) {
      updateJobStatus(job, "rendering", "Measuring capture speed", 25, onProgress, {
        code: "start_browsers"
      });
      const outcome = await observeRenderStage(
        observability,
        "capture_calibration",
        captureStageObservationData({
          forceScreenshot: captureForceScreenshot,
          // Override the default `capturing` — calibration writes probe
          // frames only, not `job.framesRendered`, so heartbeats reporting
          // `framesCompleted: 0` misread as broken. Field signal
          // ts=1784019503.
          stagePhase: "calibrating"
        }),
        () => runCaptureCalibration({
          cfg,
          fileServer: activeFileServer,
          workDir,
          log,
          job,
          totalFrames,
          forceScreenshot: captureForceScreenshot,
          probeSession,
          buildCaptureOptions,
          createRenderVideoFrameInjector,
          assertNotAborted
        }),
        { heartbeatMessage: "browser calibrating (frames not started)" }
      );
      captureCalibration = outcome.calibration;
      captureForceScreenshot = outcome.forceScreenshot;
      updateCaptureObservability({ forceScreenshot: captureForceScreenshot });
      probeSession = outcome.probeSession;
      if (outcome.lastBrowserConsole.length > 0) {
        lastBrowserConsole = outcome.lastBrowserConsole;
      }
      observability.checkpoint("capture_calibration", "resolved", {
        forceScreenshot: captureForceScreenshot,
        multiplier: outcome.calibration?.estimate.multiplier ?? null,
        p95Ms: outcome.calibration?.estimate.p95Ms ?? null
      });
    } else {
      observability.checkpoint("capture_calibration", "skipped", {
        requestedWorkers: job.config.workers ?? "auto",
        totalFrames,
        htmlInCanvasDetected,
        lowMemoryMode: Boolean(cfg.lowMemoryMode),
        deInversionEligible,
        deParallelRouterEligible
      });
    }
    workerCount = resolveRenderWorkerCount(
      totalFrames,
      job.config.workers,
      cfg,
      compiled,
      log,
      captureCalibration?.estimate,
      (sizing) => {
        workerSizing = sizing;
        const heapAdvisory = buildHeapAdvisoryWarning(sizing, job.config.workers);
        if (heapAdvisory) {
          log.warn(heapAdvisory, {
            heapLimitMb: sizing.heapLimitMb,
            heapBasedWorkers: sizing.heapBasedWorkers
          });
        }
      }
    );
    const preRoutingWorkerCount = workerCount;
    if (deParallelRouterEligible && workerCount > 1) {
      deParallelRouter = "routed";
      const ROUTER_WORKER_COUNT = 3;
      log.info(
        `[Render] Fast capture: verified parallel drawElement streaming preferred over single-worker inversion (${totalFrames} frames >= ${deParallelMinFrames}; benchmark-validated at 3 workers, pinned regardless of calibration). Set HF_DE_PARALLEL_ROUTER=false or --workers N to override.`
      );
      workerCount = ROUTER_WORKER_COUNT;
      deParallelStreamForced = true;
    } else if (deInversionEligible && workerCount > 1) {
      deWorkerInversion = "inverted";
      log.info(
        `[Render] Fast capture: single-worker drawElement streaming preferred over ${workerCount}-worker screenshot capture (${totalFrames} frames >= ${deInversionEffectiveMinFrames}; verified path, measured faster at every worker count). Set HF_DE_SINGLE_MIN_FRAMES=0 or --workers N to override.`
      );
      workerCount = 1;
    }
    updateCaptureObservability({
      workerCount,
      deWorkerInversion,
      deParallelRouter,
      // Recorded here (not just in the success-path perfSummary) so a hard
      // failure while routed/inverted still tells us what worker count the
      // resolver would have used absent the experiment — the DE-router pin
      // to 3 workers regardless of calibration is the leading suspect for
      // any resource-pressure failure unique to this cohort.
      dePreInversionWorkers: deWorkerInversion ? preRoutingWorkerCount : void 0,
      dePreRouterWorkers: deParallelRouter ? preRoutingWorkerCount : void 0,
      // Short-comp band attribution — see the field docs. Emitted on every
      // render so the fleet element-count distribution is readable, and so a
      // perf shift can be split into "the new band did it" vs "unchanged".
      compositionElementCount,
      compositionElementCountSource,
      compositionElementTags,
      arollVideoCount,
      heygenVideoCount,
      adaptersUsed,
      audioCount,
      imageCount,
      subCompositionCount,
      audioGroupCount,
      colorGradingCount,
      hasLut,
      rootBodyMismatch,
      rootBodyDeltaPxBucket,
      deShortBand,
      // Same rationale as the counters above: carried on live capture
      // observability, not only the success-path perfSummary, so a crash /
      // OOM / timeout still reports which GPU backend it happened on. That
      // is the cohort the win32 D3D11 rollout most needs to attribute.
      deGpuRenderer: probeSession?.gpuRenderer
    });
    observability.checkpoint("worker_resolution", "resolved", {
      workerCount,
      deWorkerInversion: deWorkerInversion ?? "none",
      deParallelRouter: deParallelRouter ?? "none"
    });
    let useStreamingEncode = shouldUseStreamingEncode(
      cfg,
      outputFormat,
      workerCount,
      job.duration,
      deParallelStreamForced
    );
    const deParallelStreamVerified = (deParallelStreamForced || process.env.HF_DE_PARALLEL_STREAM === "true") && useStreamingEncode && workerCount > 1;
    if (shouldClampDefaultDrawElement({
      useDrawElement: cfg.useDrawElement,
      fastCaptureExplicitOptIn: process.env.PRODUCER_EXPERIMENTAL_FAST_CAPTURE === "true",
      useStreamingEncode,
      workerCount,
      deParallelStreamVerified
    })) {
      cfg.useDrawElement = false;
      deClampReason = workerCount > 1 ? "parallel" : "disk_path";
      log.info(
        "[Render] Fast capture: default-on drawElement disabled for this render \u2014 " + (workerCount > 1 ? "parallel capture" : "the disk capture path") + " has no runtime self-verification. Set PRODUCER_EXPERIMENTAL_FAST_CAPTURE=true to override."
      );
      if (probeSession && probeSession.captureMode === "drawelement") {
        lastBrowserConsole = probeSession.browserConsoleBuffer;
        await closeCaptureSession(probeSession);
        probeSession = null;
      }
    }
    const parallelCaptureMode = resolveParallelCaptureMode({
      platform: process.platform,
      headlessShell: resolveHeadlessShellPath(cfg) !== null,
      forceScreenshot: captureForceScreenshot,
      deviceScaleFactor: captureOptions.deviceScaleFactor
    });
    const captureParallelStreamRouterEnabled = isCaptureParallelStreamRouterEnabled(
      process.env,
      parallelCaptureMode
    );
    const captureParallelStreamArgs = {
      workerCount,
      useDrawElement: cfg.useDrawElement,
      outputFormat,
      streamingOk: shouldUseStreamingEncode(cfg, outputFormat, 1, job.duration),
      layeredOrEffectRoute: hasHdrContent || compiled.hasShaderTransitions
    };
    const captureParallelStreamEligible = shouldStreamParallelCapture({
      routerEnabled: captureParallelStreamRouterEnabled,
      ...captureParallelStreamArgs
    });
    if (captureParallelStreamEligible) {
      captureParallelStreamForced = true;
      const captureParallelStream = parallelCaptureMode;
      log.info(
        `[Render] Parallel ${captureParallelStream} capture will stream to the encoder (interleaved, ${workerCount} workers) instead of the disk path. Set HF_CAPTURE_PARALLEL_STREAM=false to disable.`
      );
      updateCaptureObservability({ captureParallelStream });
      observability.checkpoint(
        "worker_resolution",
        `parallel ${captureParallelStream} capture routed to streaming`
      );
    } else if (shouldStreamParallelCapture({ routerEnabled: true, ...captureParallelStreamArgs })) {
      updateCaptureObservability({ captureParallelStream: "eligible_off" });
    }
    if (workerCount > 1 && probeSession) {
      lastBrowserConsole = probeSession.browserConsoleBuffer;
      await closeCaptureSession(probeSession);
      probeSession = null;
    }
    const streamingGate = explainStreamingEncodeGate(
      cfg,
      outputFormat,
      workerCount,
      job.duration,
      deParallelStreamForced || captureParallelStreamForced
    );
    useStreamingEncode = streamingGate.enabled;
    log.info("streaming-encode gate", {
      enabled: useStreamingEncode,
      reason: streamingGate.reason,
      configFlag: cfg.enableStreamingEncode,
      durationCapEnabled: cfg.streamingEncodeDurationCapEnabled,
      outputFormat,
      workerCount,
      durationSeconds: job.duration,
      maxDurationSeconds: cfg.streamingEncodeMaxDurationSeconds
    });
    const FORMAT_EXT = {
      mp4: ".mp4",
      webm: ".webm",
      mov: ".mov",
      "png-sequence": "",
      gif: ".gif",
      hls: ".mp4"
    };
    const videoExt = FORMAT_EXT[outputFormat] ?? ".mp4";
    const videoOnlyPath = join25(workDir, `video-only${videoExt}`);
    const usePageSideCompositingForTransitions = (cfg.enablePageSideCompositing || isGif) && compiled.hasShaderTransitions && !hasHdrContent && outputSupportsPageSideShaderCompositing(outputFormat);
    if (usePageSideCompositingForTransitions) {
      activeFileServer.addPreHeadScript(HF_PAGE_SIDE_COMPOSITING_STUB);
      if (shouldDiscardProbeSessionForPageSideCompositing({
        hasProbeSession: probeSession !== null,
        usePageSideCompositing: true
      }) && probeSession) {
        lastBrowserConsole = probeSession.browserConsoleBuffer;
        await closeCaptureSession(probeSession);
        probeSession = null;
        log.info(
          "[Render] Recreating capture session so page-side compositing pre-head script is loaded."
        );
      }
      captureForceScreenshot = resolveCaptureForceScreenshotForPageSideCompositing({
        forceScreenshot: captureForceScreenshot,
        usePageSideCompositing: true
      });
      updateCaptureObservability({ forceScreenshot: captureForceScreenshot });
      log.info(
        `[Render] Page-side compositing enabled \u2014 bypassing Node-side layered shader-blend path. Engine will capture one ${needsAlpha ? "RGBA PNG" : "opaque RGB"} screenshot per output frame.`
      );
    }
    const useLayeredComposite = !usePageSideCompositingForTransitions && shouldUseLayeredComposite({
      hasHdrContent,
      hasShaderTransitions: compiled.hasShaderTransitions && !isGif,
      isPngSequence
    });
    const inversionFallback = resolveInversionRetryPlan({
      deWorkerInversion,
      preInversionWorkerCount: preRoutingWorkerCount,
      cfg,
      outputFormat,
      durationSeconds: job.duration,
      isMemoryExhaustion: false
    });
    const inversionMemoryExhaustionFallback = resolveInversionRetryPlan({
      deWorkerInversion,
      preInversionWorkerCount: preRoutingWorkerCount,
      cfg,
      outputFormat,
      durationSeconds: job.duration,
      isMemoryExhaustion: true
    });
    const parallelRouterFallback = resolveParallelRouterRetryPlan({
      deParallelRouter,
      preRouterWorkerCount: preRoutingWorkerCount,
      cfg,
      outputFormat,
      durationSeconds: job.duration,
      isMemoryExhaustion: false
    });
    const parallelRouterMemoryExhaustionFallback = resolveParallelRouterRetryPlan({
      deParallelRouter,
      preRouterWorkerCount: preRoutingWorkerCount,
      cfg,
      outputFormat,
      durationSeconds: job.duration,
      isMemoryExhaustion: true
    });
    const captureRouting = inversionFallback && inversionMemoryExhaustionFallback ? {
      kind: "worker_inversion",
      state: "active",
      fallback: {
        kind: inversionFallback.useStreamingEncode ? "sdr_streaming" : "sdr_disk",
        workerCount: inversionFallback.workerCount,
        forceParallelStream: false
      },
      memoryExhaustionFallback: {
        kind: inversionMemoryExhaustionFallback.useStreamingEncode ? "sdr_streaming" : "sdr_disk",
        workerCount: inversionMemoryExhaustionFallback.workerCount,
        forceParallelStream: false
      }
    } : parallelRouterFallback && parallelRouterMemoryExhaustionFallback ? {
      kind: "parallel_router",
      state: "active",
      fallback: {
        kind: parallelRouterFallback.useStreamingEncode ? "sdr_streaming" : "sdr_disk",
        workerCount: parallelRouterFallback.workerCount,
        forceParallelStream: false
      },
      memoryExhaustionFallback: {
        kind: parallelRouterMemoryExhaustionFallback.useStreamingEncode ? "sdr_streaming" : "sdr_disk",
        workerCount: parallelRouterMemoryExhaustionFallback.workerCount,
        forceParallelStream: false
      }
    } : { kind: "default" };
    let capturePlan = createCapturePlan({
      workerCount,
      forceScreenshot: captureForceScreenshot,
      forceParallelStream: isParallelStreamForced(process.env, {
        deParallelStreamForced,
        captureParallelStreamForced
      }),
      useStreamingEncode,
      // Segmented capture is opt-in in Phase 2a and single-worker only; the
      // excluded routes are the ones whose concat-copy or capture loop the
      // segment contract does not cover (webm VP9 concat is fragile, HDR and
      // shader transitions run their own compositor).
      useSegmentedCapture: shouldSegmentCapture({
        env: process.env,
        durationSeconds: job.duration,
        outputFormat,
        layeredOrEffectRoute: hasHdrContent || compiled.hasShaderTransitions,
        streamingOk: shouldUseStreamingEncode(cfg, outputFormat, 1, job.duration)
      }),
      useLayeredComposite,
      usePageSideCompositing: usePageSideCompositingForTransitions,
      hasHdrContent,
      needsAlpha,
      routing: captureRouting
    });
    const syncCapturePlan = () => {
      assertMotionBlurSupported(job.config.motionBlur, capturePlan.kind);
      workerCount = capturePlan.workerCount;
      captureForceScreenshot = capturePlan.forceScreenshot;
      useStreamingEncode = capturePlan.kind === "sdr_streaming";
      deParallelStreamForced = capturePlan.kind === "sdr_streaming" && capturePlan.forceParallelStream;
      if (capturePlan.routing.kind === "worker_inversion") {
        deWorkerInversion = capturePlan.routing.state === "active" ? "inverted" : "reverted";
      }
      if (capturePlan.routing.kind === "parallel_router") {
        deParallelRouter = capturePlan.routing.state === "active" ? "routed" : "reverted";
      }
      updateCaptureObservability({ capturePath: capturePathForPlanKind(capturePlan.kind) });
    };
    syncCapturePlan();
    updateCaptureObservability({
      workerCount: capturePlan.workerCount,
      useStreamingEncode: capturePlan.kind === "sdr_streaming",
      useLayeredComposite: capturePlan.kind === "hdr_layered",
      usePageSideCompositing: capturePlan.usePageSideCompositing,
      hasHdrContent: capturePlan.hasHdrContent,
      forceScreenshot: capturePlan.forceScreenshot,
      // Re-recorded here because `syncCapturePlan` above is where routing is
      // actually decided — including "reverted", which the earlier update
      // could not know. Without this, capture observability keeps whatever
      // was true before the plan resolved, so a render that failed while
      // routed reports no routing state at all: `de_parallel_router` was
      // present on 95% of render_complete events and 0.8% of render_error.
      // The failure path is the one the rollout is watching.
      deWorkerInversion,
      deParallelRouter
    });
    observability.checkpoint("capture_strategy", "resolved", {
      plan: capturePlan.kind,
      workerCount: capturePlan.workerCount,
      forceScreenshot: capturePlan.forceScreenshot,
      captureBeyondViewport: resolvedCaptureBeyondViewport ?? null,
      useStreamingEncode: capturePlan.kind === "sdr_streaming",
      useLayeredComposite: capturePlan.kind === "hdr_layered",
      usePageSideCompositing: capturePlan.usePageSideCompositing,
      hasHdrContent: capturePlan.hasHdrContent,
      hasShaderTransitions: compiled.hasShaderTransitions,
      isPngSequence
    });
    const encoderHdr = hasHdrContent ? effectiveHdr : void 0;
    const presetFormat = outputFormat === "webm" || outputFormat === "mov" ? outputFormat : "mp4";
    const preset = getEncoderPreset(job.config.quality, presetFormat, encoderHdr);
    if (job.config.crf != null && job.config.videoBitrate) {
      log.warn(
        `[Render] Both crf=${job.config.crf} and videoBitrate=${job.config.videoBitrate} were set. These are mutually exclusive; honoring crf and ignoring videoBitrate. Set only one to silence this warning.`
      );
    }
    const effectiveQuality = job.config.crf ?? preset.quality;
    const effectiveBitrate = job.config.crf != null ? void 0 : job.config.videoBitrate;
    resetCaptureAttemptProgress(job);
    if (capturePlan.kind === "hdr_layered") {
      const layeredPlan = capturePlan;
      updateCaptureObservability({ forceScreenshot: layeredPlan.forceScreenshot });
      const hdrRes = await observeRenderStage(
        observability,
        "capture_hdr_layered",
        captureStageObservationData({ hasHdrContent }),
        () => runCaptureHdrStage({
          job,
          cfg,
          plan: layeredPlan,
          log,
          projectDir,
          compiledDir,
          framesDir,
          videoOnlyPath,
          width,
          height,
          totalFrames,
          composition,
          hasHdrContent,
          effectiveHdr,
          nativeHdrVideoIds,
          nativeHdrImageIds,
          videoTransfers,
          imageTransfers,
          hdrImageSrcPaths,
          preset,
          effectiveQuality,
          effectiveBitrate,
          fileServer: activeFileServer,
          buildCaptureOptions,
          createRenderVideoFrameInjector,
          hdrDiagnostics,
          abortSignal: executionSignal,
          assertNotAborted,
          onProgress
        })
      );
      lastBrowserConsole = hdrRes.lastBrowserConsole;
      layeredCaptureWarnings.push(...hdrRes.warnings);
      hdrPerf = hdrRes.hdrPerf;
      perfStages.captureMs = hdrRes.captureDurationMs;
      perfStages.captureFrameMs = hdrRes.captureDurationMs;
      perfStages.captureSetupMs = Math.max(0, Date.now() - stage4Start - hdrRes.captureDurationMs);
      perfStages.encodeMs = hdrRes.encodeMs;
    } else {
      let streamingHandled = false;
      if (capturePlan.kind === "sdr_segmented") {
        const segmentedPlan = capturePlan;
        const captureFrameStart = Date.now();
        resetCaptureAttemptProgress(job);
        const segmentFrames = resolveSegmentFrames(process.env);
        const segmentImageFormat = captureOptions.format || "jpeg";
        const segmentPlanHash = computeSegmentPlanHash({
          compositionHash: compositionHash ?? "",
          cliVersion: process.env.npm_package_version ?? "dev",
          totalFrames,
          segmentFrames,
          fps: job.config.fps,
          width,
          height,
          codec: preset.codec,
          preset: preset.preset,
          quality: effectiveQuality,
          bitrate: effectiveBitrate,
          pixelFormat: preset.pixelFormat,
          imageFormat: segmentImageFormat,
          useGpu: job.config.useGpu === true,
          // Device-scaled: the capture buffer, not the CSS composition size.
          outputWidth: captureCompositionWidth ?? width,
          outputHeight: captureCompositionHeight ?? height,
          motionBlur: job.config.motionBlur ? JSON.stringify(job.config.motionBlur) : ""
        });
        const segmentDir = segmentDirFor(join25(projectDir, "renders"), segmentPlanHash);
        let completedSegments = /* @__PURE__ */ new Set();
        if (job.config.resumeSegments === true) {
          const existing = readSegmentManifest(segmentDir);
          if (existing) {
            completedSegments = await validateCompletedSegments(
              existing,
              segmentPlanHash,
              (path) => probeSegmentFrameCount(path, extractMediaMetadata)
            );
            log.info(`[Render] resuming: ${completedSegments.size} segments complete`, {
              segmentDir
            });
          }
          if (completedSegments.size === 0) {
            rmSync8(segmentDir, { recursive: true, force: true });
          }
        } else {
          rmSync8(segmentDir, { recursive: true, force: true });
        }
        const segmentManifest = readSegmentManifest(segmentDir) ?? {
          version: 1,
          planHash: segmentPlanHash,
          totalFrames,
          segmentFrames,
          completed: []
        };
        const segmentedRes = await observeRenderStage(
          observability,
          "capture_segmented",
          captureStageObservationData(),
          () => runCaptureSegmentedStage({
            fileServer: activeFileServer,
            workDir,
            framesDir,
            videoOnlyPath,
            job,
            totalFrames,
            cfg,
            plan: segmentedPlan,
            log,
            probeSession,
            outputFormat,
            streamingEncoderOptions: {
              fps: job.config.fps,
              width: captureWidth,
              height: captureHeight,
              outputWidth: job.config.outputSize?.width,
              outputHeight: job.config.outputSize?.height,
              codec: preset.codec,
              preset: preset.preset,
              quality: effectiveQuality,
              bitrate: effectiveBitrate,
              pixelFormat: preset.pixelFormat,
              vp9CpuUsed: cfg.vp9CpuUsed,
              useGpu: job.config.useGpu,
              imageFormat: segmentImageFormat,
              hdr: preset.hdr
              // No hlsEncoderGopLock here: each segment sets its own GOP to
              // its own length, and hls never reaches this route.
            },
            buildCaptureOptions,
            createRenderVideoFrameInjector,
            abortSignal: executionSignal,
            assertNotAborted,
            onProgress,
            dedupPerfs,
            segmentFrames,
            segmentDir,
            workerCount: segmentedPlan.workerCount,
            browserRecycleEverySegments: resolveSegmentBrowserRecycle(process.env),
            completedSegments,
            onSegmentComplete: (entry) => {
              segmentManifest.completed = [
                ...segmentManifest.completed.filter((e) => e.index !== entry.index),
                { ...entry, completedAt: (/* @__PURE__ */ new Date()).toISOString() }
              ];
              writeSegmentManifest(segmentDir, segmentManifest);
            },
            updateCaptureObservability
          })
        );
        if (segmentedRes.success) {
          streamingHandled = true;
          workerCount = segmentedRes.workerCount;
          updateCaptureObservability({ workerCount });
          probeSession = segmentedRes.probeSession;
          lastBrowserConsole = segmentedRes.lastBrowserConsole;
          perfStages.captureMs = Date.now() - stage4Start;
          perfStages.captureFrameMs = Date.now() - captureFrameStart;
          perfStages.captureSetupMs = Math.max(0, perfStages.captureMs - perfStages.captureFrameMs);
          perfStages.encodeMs = segmentedRes.encodeMs;
          log.info(
            `[Render] Segmented capture complete: ${segmentedRes.segments} segment(s) concatenated.`,
            {
              segmentRetries: segmentedRes.segmentRetries,
              browserRecycles: segmentedRes.browserRecycles
            }
          );
          updateCaptureObservability({ segmentRetries: segmentedRes.segmentRetries });
          if (job.config.keepSegments !== true) {
            rmSync8(segmentDir, { recursive: true, force: true });
          }
        } else {
          capturePlan = replanAfterFailure(capturePlan, { kind: "streaming_unavailable" });
          syncCapturePlan();
          probeSession = null;
          observability.checkpoint(
            "capture_segmented",
            "segment encoder spawn failed; falling back to single-encoder streaming"
          );
        }
      }
      if (!streamingHandled && capturePlan.kind === "sdr_streaming") {
        const captureFrameStart = Date.now();
        const invokeStreaming = () => {
          if (capturePlan.kind !== "sdr_streaming") {
            throw new Error(`Cannot invoke streaming stage with ${capturePlan.kind} plan`);
          }
          const streamingPlan = capturePlan;
          resetCaptureAttemptProgress(job);
          return observeRenderStage(
            observability,
            "capture_streaming",
            captureStageObservationData(),
            () => runCaptureStreamingStage({
              fileServer: activeFileServer,
              workDir,
              framesDir,
              videoOnlyPath,
              job,
              totalFrames,
              cfg,
              plan: streamingPlan,
              log,
              probeSession,
              outputFormat,
              streamingEncoderOptions: {
                fps: job.config.fps,
                width: captureWidth,
                height: captureHeight,
                outputWidth: job.config.outputSize?.width,
                outputHeight: job.config.outputSize?.height,
                codec: preset.codec,
                preset: preset.preset,
                quality: effectiveQuality,
                bitrate: effectiveBitrate,
                pixelFormat: preset.pixelFormat,
                vp9CpuUsed: cfg.vp9CpuUsed,
                useGpu: job.config.useGpu,
                imageFormat: captureOptions.format || "jpeg",
                hdr: preset.hdr,
                // HLS only: force an IDR every `gopSize` frames so the
                // assemble stage's `-c copy` segmentation cuts exactly on
                // the segment boundary. Every other format leaves the
                // encoder's open-GOP output untouched.
                ...hlsEncoderGopLock
              },
              buildCaptureOptions,
              createRenderVideoFrameInjector,
              abortSignal: executionSignal,
              assertNotAborted,
              onProgress,
              dedupPerfs,
              // The plan's forceScreenshot is per attempt (a retry forces
              // it), so it outranks the mode resolved before the router.
              parallelCaptureLabel: streamingPlan.forceScreenshot ? "screenshot" : cfg.useDrawElement ? "drawElement" : parallelCaptureMode === "beginframe" ? "BeginFrame" : "screenshot"
            })
          );
        };
        let streamingRes;
        try {
          streamingRes = await invokeStreaming();
        } catch (err) {
          const isVerifyError = isDrawElementVerificationError(err);
          const isDeCaptureError = isDrawElementCaptureError(err);
          const isDeStall = isDeRendererStallError(err);
          const isSequentialStall = isSequentialCaptureStallError(err);
          const isParallelStall = isParallelCaptureStallError(err);
          const isEncoderDeath = isRetryableEncoderDeath(err);
          const isCancellation = err instanceof RenderCancelledError || executionSignal?.aborted === true;
          if (!shouldRetryViaPinnedFallback({
            isVerifyError,
            isDeCaptureError,
            isCancellation,
            isEncoderInterrupted: err instanceof EncoderInterruptedError,
            deWorkerInversion,
            deParallelRouter,
            isDeRendererStall: isDeStall,
            isSequentialCaptureStall: isSequentialStall,
            isParallelCaptureStall: isParallelStall,
            isEncoderDeath,
            isTransientCaptureError: isTransientBrowserError(err)
          }))
            throw err;
          const isMemoryExhaustion = !isVerifyError && isMemoryExhaustionError(err);
          deSelfVerifyFallback = isVerifyError;
          if (isVerifyError) {
            const t = deVerifyFallbackTelemetry(err);
            deFallbackReason = t.reason;
            deFallbackFailedDb = t.failedDb;
            deFallbackFrameIndex = t.frameIndex;
            deFallbackThresholdDb = t.thresholdDb;
          } else {
            deFallbackReason = isMemoryExhaustion ? "oom" : isDeStall ? "de_renderer_stall" : isEncoderDeath ? "encoder_death" : isParallelStall ? "parallel_stall" : "capture_error";
          }
          log.warn(
            isVerifyError ? "[Render] drawElement self-verification failed; re-rendering via screenshot" : isDeStall ? "[Render] drawElement renderer stalled; re-rendering via screenshot" : isSequentialStall ? "[Render] sequential capture stalled; retrying on a fresh screenshot session" : isParallelStall ? "[Render] parallel capture stalled; retrying on a fresh screenshot session" : isEncoderDeath ? "[Render] streaming encoder died mid-render; retrying on a fresh screenshot session" : "[Render] capture failed; re-rendering via a fresh screenshot session",
            { error: err instanceof Error ? err.message : String(err) }
          );
          observability.checkpoint(
            "capture_streaming",
            isVerifyError ? "drawElement self-verify failed; retrying with forceScreenshot" : isDeStall ? "drawElement renderer stalled; retrying with forceScreenshot" : isSequentialStall ? "sequential capture stalled; retrying with a fresh screenshot session" : isParallelStall ? "parallel capture stalled; retrying with a fresh screenshot session" : isEncoderDeath ? "streaming encoder died; retrying with a fresh screenshot session" : "capture failed; retrying with a fresh screenshot session"
          );
          const failedRouting = capturePlan.routing.kind;
          const failure = streamingCaptureFailure(
            capturePlan,
            { isVerifyError, isMemoryExhaustion },
            () => inspectDiskCaptureHeadroom(framesDir, totalFrames, buildCaptureOptions()).available
          );
          capturePlan = replanAfterFailure(capturePlan, failure);
          syncCapturePlan();
          updateCaptureObservability({
            forceScreenshot: capturePlan.forceScreenshot,
            deSelfVerifyFallback,
            deFallbackReason,
            deFallbackFailedDb,
            deFallbackFrameIndex,
            deFallbackThresholdDb,
            workerCount: capturePlan.workerCount,
            useStreamingEncode: capturePlan.kind === "sdr_streaming",
            deWorkerInversion,
            deParallelRouter
          });
          if (probeSession) {
            lastBrowserConsole = probeSession.browserConsoleBuffer;
            const orphaned = probeSession;
            probeSession = null;
            await closeOrphanedProbeForRetry(orphaned, closeCaptureSession, log, "streaming");
          }
          if (failedRouting !== "default") {
            const route = failedRouting === "worker_inversion" ? "worker inversion" : "parallel router";
            const diskFallbackLacksHeadroom = failure.kind === "draw_element_verification" && failure.diskFallbackAvailable === false;
            log.info(
              diskFallbackLacksHeadroom ? `[Render] ${route} disk fallback lacks headroom; retrying with ${capturePlan.workerCount}-worker screenshot streaming.` : `[Render] Reverting ${route} for the retry: ${capturePlan.workerCount} workers, plan=${capturePlan.kind}.`
            );
          }
          if (capturePlan.kind === "sdr_streaming") {
            streamingRes = await invokeStreaming();
          } else {
            streamingRes = { success: false };
          }
          observability.clearFailure("capture_streaming");
        }
        const captureFrameMs = Date.now() - captureFrameStart;
        if (streamingRes.success) {
          streamingHandled = true;
          deDrainStats = streamingRes.deDrainStats;
          workerCount = streamingRes.workerCount;
          updateCaptureObservability({ workerCount });
          if (streamingRes.captureBeyondViewport !== void 0) {
            updateCaptureObservability({
              captureBeyondViewport: streamingRes.captureBeyondViewport
            });
          }
          probeSession = streamingRes.probeSession;
          lastBrowserConsole = streamingRes.lastBrowserConsole;
          perfStages.captureMs = Date.now() - stage4Start;
          perfStages.captureFrameMs = captureFrameMs;
          perfStages.captureSetupMs = Math.max(0, perfStages.captureMs - captureFrameMs);
          perfStages.encodeMs = streamingRes.encodeMs;
        } else {
          if (capturePlan.kind === "sdr_streaming") {
            capturePlan = replanAfterFailure(capturePlan, { kind: "streaming_unavailable" });
            syncCapturePlan();
          }
          if (cfg.useDrawElement && !capturePlan.forceScreenshot && process.env.PRODUCER_EXPERIMENTAL_FAST_CAPTURE !== "true") {
            cfg.useDrawElement = false;
            deClampReason = deClampReason ?? "disk_path";
            log.info(
              "[Render] Fast capture: drawElement disabled for the disk fallback \u2014 streaming encoder spawn failed and the disk path has no runtime self-verification."
            );
            if (probeSession && probeSession.captureMode === "drawelement") {
              lastBrowserConsole = probeSession.browserConsoleBuffer;
              await closeCaptureSession(probeSession);
              probeSession = null;
            }
          }
          updateCaptureObservability({ useStreamingEncode: false });
          observability.checkpoint("capture_streaming", "spawn failed; falling back to disk");
        }
      }
      if (!streamingHandled) {
        if (capturePlan.kind !== "sdr_disk") {
          throw new Error(`Disk capture requires sdr_disk plan; got ${capturePlan.kind}`);
        }
        resetCaptureAttemptProgress(job);
        const captureFrameStart = Date.now();
        const invokeDiskCapture = (diskPlan) => observeRenderStage(
          observability,
          "capture_disk",
          captureStageObservationData({ needsAlpha: diskPlan.needsAlpha }),
          () => runCaptureStage({
            fileServer: activeFileServer,
            workDir,
            framesDir,
            job,
            totalFrames,
            cfg,
            plan: diskPlan,
            log,
            probeSession,
            captureAttempts,
            dedupPerfs,
            buildCaptureOptions,
            createRenderVideoFrameInjector,
            abortSignal: executionSignal,
            assertNotAborted,
            onProgress
          })
        );
        let captureRes;
        try {
          captureRes = await invokeDiskCapture(capturePlan);
        } catch (err) {
          if (!isDrawElementVerificationError(err) && !isDrawElementCaptureError(err) || err instanceof RenderCancelledError || executionSignal?.aborted === true) {
            throw err;
          }
          deSelfVerifyFallback = isDrawElementVerificationError(err);
          const t = deVerifyFallbackTelemetry(err);
          deFallbackReason = deSelfVerifyFallback ? t.reason : "capture_error";
          deFallbackFailedDb = t.failedDb;
          deFallbackFrameIndex = t.frameIndex;
          deFallbackThresholdDb = t.thresholdDb;
          log.warn(
            "[Render] drawElement capture failed on the parallel disk path; re-rendering via screenshot",
            { error: err instanceof Error ? err.message : String(err) }
          );
          observability.checkpoint(
            "capture_disk",
            "drawElement capture failed; retrying with a fresh screenshot session"
          );
          rmSync8(framesDir, { recursive: true, force: true });
          mkdirSync8(framesDir, { recursive: true });
          resetCaptureAttemptProgress(job);
          dedupPerfs.length = 0;
          cfg.useDrawElement = false;
          if (probeSession) {
            lastBrowserConsole = probeSession.browserConsoleBuffer;
            const orphaned = probeSession;
            probeSession = null;
            await closeOrphanedProbeForRetry(orphaned, closeCaptureSession, log, "disk verify");
          }
          capturePlan = replanAfterFailure(capturePlan, {
            kind: deSelfVerifyFallback ? "draw_element_verification" : "draw_element_capture"
          });
          syncCapturePlan();
          updateCaptureObservability({
            forceScreenshot: capturePlan.forceScreenshot,
            deSelfVerifyFallback,
            deFallbackReason,
            deFallbackFailedDb,
            deFallbackFrameIndex,
            deFallbackThresholdDb
          });
          if (capturePlan.kind !== "sdr_disk") {
            throw new Error(`Disk verify retry requires sdr_disk plan; got ${capturePlan.kind}`);
          }
          captureRes = await invokeDiskCapture(capturePlan);
          observability.clearFailure("capture_disk");
        }
        const captureFrameMs = Date.now() - captureFrameStart;
        workerCount = captureRes.workerCount;
        updateCaptureObservability({ workerCount });
        if (captureRes.captureBeyondViewport !== void 0) {
          updateCaptureObservability({
            captureBeyondViewport: captureRes.captureBeyondViewport
          });
        }
        probeSession = captureRes.probeSession;
        lastBrowserConsole = captureRes.lastBrowserConsole;
        perfStages.captureMs = Date.now() - stage4Start;
        perfStages.captureFrameMs = captureFrameMs;
        perfStages.captureSetupMs = Math.max(0, perfStages.captureMs - captureFrameMs);
        const encodeRes = await observeRenderStage(
          observability,
          "encode",
          captureStageObservationData({
            hasAudio,
            isPngSequence,
            isGif,
            chunkedEncode: enableChunkedEncode
          }),
          () => runEncodeStage({
            job,
            log,
            outputPath: stagedOutputPath,
            framesDir,
            videoOnlyPath,
            width: captureWidth,
            height: captureHeight,
            outputSize: job.config.outputSize,
            needsAlpha,
            captureImageFormat: captureOptions.format ?? "jpeg",
            hasAudio,
            audioOutputPath,
            isPngSequence,
            isGif,
            preset,
            effectiveQuality,
            effectiveBitrate,
            enableChunkedEncode,
            chunkedEncodeSize,
            engineConfig: cfg,
            // Same value the streaming encoder above spreads — the disk and
            // chunked-concat encoders need an identical GOP lock for HLS.
            ...hlsEncoderGopLock,
            abortSignal: executionSignal,
            assertNotAborted,
            onProgress
          })
        );
        perfStages.encodeMs = encodeRes.encodeMs;
      }
    }
    emitFallbackCaptureProfile(observability, dedupPerfs);
    applyRenderWarningPolicy(
      job,
      [...layeredCaptureWarnings, ...dedupPerfs.flatMap((perf) => perf.warnings ?? [])],
      log
    );
    if (probeSession !== null) {
      const remainingProbeSession = probeSession;
      lastBrowserConsole = remainingProbeSession.browserConsoleBuffer;
      await closeCaptureSession(remainingProbeSession);
      probeSession = null;
    }
    if (frameLookup) frameLookup.cleanup();
    closeFileServerSafely(fileServer, "renderOrchestrator", log);
    fileServer = null;
    if (!isPngSequence && !isGif) {
      const assembleRes = await observeRenderStage(
        observability,
        "assemble",
        captureStageObservationData({ hasAudio }),
        () => runAssembleStage({
          job,
          videoOnlyPath,
          audioOutputPath,
          outputPath: stagedOutputPath,
          hasAudio,
          format: outputFormat,
          hlsSegmentSeconds,
          abortSignal: executionSignal,
          assertNotAborted,
          onProgress
        })
      );
      perfStages.assembleMs = assembleRes.assembleMs;
    } else {
      observability.checkpoint("assemble", `skipped for ${outputFormat}`);
    }
    await artifactTransaction.validate(
      buildArtifactExpectation({
        outputFormat,
        durationSeconds: job.duration,
        fps: fpsToNumber(job.config.fps),
        expectedFrames: captureTotalFrames
      })
    );
    const totalElapsed = Date.now() - pipelineStart;
    const tmpPeakBytes = existsSync15(workDir) ? sampleDirectoryBytes(workDir) : 0;
    recordTransientRetryObservability();
    observability.checkpoint("pipeline", "artifact validated", { totalElapsedMs: totalElapsed });
    const observabilitySummary = observability.summary({
      lastBrowserConsole,
      capture: captureObservability,
      initFallback: mergeWorkerInitObservability(dedupPerfs),
      extraction: extractionObservability,
      compositionHash
    });
    const perfSummary = buildRenderPerfSummary({
      job,
      workerCount,
      workerSizing,
      enableChunkedEncode,
      chunkedEncodeSize,
      compositionDurationSeconds: composition.duration,
      totalFrames,
      outputWidth: job.config.outputSize?.width ?? outputWidth,
      outputHeight: job.config.outputSize?.height ?? outputHeight,
      videoCount: composition.videos.length,
      audioCount: composition.audios.length,
      totalElapsedMs: totalElapsed,
      perfStages,
      videoExtractBreakdown: extractionResult?.phaseBreakdown,
      tmpPeakBytes,
      captureCalibration,
      captureAttempts,
      dedupPerfs,
      drawElement: {
        compileGate: deCompileGate,
        clampReason: deClampReason,
        workerInversion: deWorkerInversion,
        preInversionWorkers: deWorkerInversion ? preRoutingWorkerCount : void 0,
        compositionElementCount,
        compositionElementCountSource,
        compositionElementTags,
        arollVideoCount,
        heygenVideoCount,
        adaptersUsed,
        audioCount,
        imageCount,
        subCompositionCount,
        audioGroupCount,
        colorGradingCount,
        hasLut,
        rootBodyMismatch,
        rootBodyDeltaPxBucket,
        vfxHostCount,
        vfxCapture,
        vfxTypes,
        shortBand: deShortBand,
        parallelRouter: deParallelRouter,
        preRouterWorkers: deParallelRouter ? preRoutingWorkerCount : void 0,
        selfVerifyFallback: deSelfVerifyFallback,
        fallbackReason: deFallbackReason,
        fallbackFailedDb: deFallbackFailedDb,
        fallbackFrameIndex: deFallbackFrameIndex,
        fallbackThresholdDb: deFallbackThresholdDb,
        drainStats: deDrainStats
      },
      hdrDiagnostics,
      hdrPerf,
      observability: observabilitySummary,
      peakRssBytes: memSampler.peakRssBytes(),
      peakHeapUsedBytes: memSampler.peakHeapUsedBytes(),
      gpuDisabled: cfg.disableGpu
    });
    job.perfSummary = perfSummary;
    if (job.config.debug) {
      try {
        writeFileSync5(perfOutputPath, JSON.stringify(perfSummary, null, 2), "utf-8");
      } catch (err) {
        log.debug("Failed to write perf summary", {
          perfOutputPath,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
    if (job.config.debug) {
      if (!isPngSequence && !isHls && existsSync15(stagedOutputPath)) {
        const debugOutput = join25(workDir, `output${videoExt}`);
        copyFileSync3(stagedOutputPath, debugOutput);
      }
    }
    await commitArtifactTransaction(artifactTransaction, () => {
      assertRenderActive?.();
      assertNotAborted();
    });
    job.outputPath = outputPath;
    updateJobStatus(job, "complete", "Render complete", 100, onProgress);
    await eventPublisher.flush();
  } catch (error) {
    if (error instanceof RenderCancelledError || executionSignal?.aborted) {
      job.error = error instanceof Error ? error.message : "render_cancelled";
      updateJobStatus(job, "cancelled", "Render cancelled", job.progress, onProgress);
      await eventPublisher.flush();
      throw error instanceof RenderCancelledError ? error : new RenderCancelledError("render_cancelled");
    }
    if (error instanceof EncoderInterruptedError) {
      log.warn("[Render] encoder process interrupted by host lifecycle", {
        code: error.code,
        diagnostic: error.diagnosticMessage.slice(-2e3)
      });
    }
    const memoryGuidance = describeMemoryExhaustion(error, {
      width: captureCompositionWidth,
      height: captureCompositionHeight,
      totalFrames: captureTotalFrames
    });
    if (memoryGuidance) {
      updateCaptureObservability({ memoryExhaustionDetected: true });
    }
    recordTransientRetryObservability();
    const protocolTimeoutError = augmentProtocolTimeoutError(error, cfg.protocolTimeout);
    const navigationTimeoutError = augmentPageNavigationTimeoutError(
      protocolTimeoutError,
      cfg.pageNavigationTimeout
    );
    const errorMessage = memoryGuidance ?? normalizeErrorMessage(navigationTimeoutError);
    const carriedBrowserConsole = getCaptureStageBrowserConsole(error);
    if (carriedBrowserConsole.length > 0) {
      lastBrowserConsole = [...lastBrowserConsole, ...carriedBrowserConsole].slice(-200);
    }
    if (!observability.hasFailure()) {
      const failureStart = Date.now();
      observability.stageError(job.currentStage || "pipeline", failureStart, error);
    }
    const isTimeoutError = errorMessage.includes("Waiting failed") || errorMessage.includes("timeout exceeded") || errorMessage.includes("Navigation timeout");
    const wasParallel = (captureObservability.workerCount ?? (job.config.workers === 1 ? 1 : 2)) > 1;
    if (isTimeoutError && wasParallel) {
      log.warn(
        `Parallel capture timed out with ${captureObservability.workerCount ?? "auto"} workers. Video-heavy compositions often need sequential capture. Retry with --workers 1`
      );
    }
    const failedStage = job.currentStage || "pipeline";
    const observabilitySummary = observability.summary({
      lastBrowserConsole,
      capture: captureObservability,
      initFallback: mergeWorkerInitObservability(dedupPerfs),
      extraction: extractionObservability,
      compositionHash
    });
    const errorDetails = buildRenderErrorDetails({
      error,
      pipelineStartMs: pipelineStart,
      lastBrowserConsole,
      perfStages,
      hdrDiagnostics,
      observability: observabilitySummary,
      subTimelineWait: worstSubTimelineWaitOutcome(dedupPerfs)
    });
    publishRenderFailure(
      job,
      {
        error: errorMessage,
        failedStage,
        errorDetails
      },
      onProgress
    );
    await eventPublisher.flush();
    log.info("[Render] Failure summary", {
      failedStage,
      error: errorMessage,
      elapsedMs: Date.now() - pipelineStart,
      stageTimings: perfStages,
      isTimeout: isTimeoutError,
      workers: job.config.workers ?? "auto",
      protocolTimeout: cfg.protocolTimeout,
      observedFailedPhase: observabilitySummary.failedPhase,
      observedLastPhase: observabilitySummary.lastEvent?.phase,
      observedLastStatus: observabilitySummary.lastEvent?.status,
      browserDiagnostics: observabilitySummary.browserDiagnostics,
      extraction: observabilitySummary.extraction,
      browserConsoleErrors: lastBrowserConsole.filter(
        (l) => l.includes("ERROR") || l.includes("PAGEERROR") || l.includes("REQUESTFAILED") || l.includes("[FrameCapture:NAV]") || /\[Browser:HTTP\d{3}\]/.test(l)
      ).slice(-5)
    });
    throw error;
  }
}

// ../producer/src/services/distributed/renderConfigValidation.ts
var InvalidConfigError = class extends Error {
  // Read via Error.prototype.toString; fallow can't see it.
  // fallow-ignore-next-line unused-class-member
  name = "InvalidConfigError";
  /** Dotted JSON-pointer-ish path to the offending field, e.g. `config.fps`. */
  field;
  constructor(field, message) {
    super(`[validateConfig] ${field}: ${message}`);
    this.field = field;
  }
};
var ALLOWED_FPS = [24, 30, 60];
var ALLOWED_FORMATS = [
  "mp4",
  "mov",
  "png-sequence",
  "webm"
];
var ALLOWED_CODECS = ["h264", "h265"];
var ALLOWED_QUALITIES = ["draft", "standard", "high"];
var ALLOWED_RUNTIME_CAPS = ["lambda", "temporal", "cloud-run-job", "k8s-job", "none"];
var ALLOWED_HDR_MODES = ["auto", "force-sdr"];
var MAX_DIMENSION = 7680;
var MIN_DIMENSION = 16;
var MAX_CHUNK_SIZE = 3600;
var MAX_PARALLEL_CHUNKS_CEILING = 256;
function validateDistributedRenderConfig(config) {
  if (config === null || typeof config !== "object") {
    throw new InvalidConfigError("config", "must be an object");
  }
  if (!ALLOWED_FPS.includes(config.fps)) {
    throw new InvalidConfigError(
      "config.fps",
      `must be one of ${ALLOWED_FPS.join(", ")}; got ${String(config.fps)}`
    );
  }
  validateIntDimension("config.width", config.width);
  validateIntDimension("config.height", config.height);
  if (!ALLOWED_FORMATS.includes(config.format)) {
    throw new InvalidConfigError(
      "config.format",
      `must be one of ${ALLOWED_FORMATS.join(", ")}; got ${String(config.format)}`
    );
  }
  if (config.codec !== void 0) {
    if (config.format !== "mp4") {
      throw new InvalidConfigError(
        "config.codec",
        `is only valid with format="mp4"; got format=${String(config.format)}`
      );
    }
    if (!ALLOWED_CODECS.includes(config.codec)) {
      throw new InvalidConfigError(
        "config.codec",
        `must be one of ${ALLOWED_CODECS.join(", ")}; got ${String(config.codec)}`
      );
    }
  }
  if (config.quality !== void 0 && !ALLOWED_QUALITIES.includes(config.quality)) {
    throw new InvalidConfigError(
      "config.quality",
      `must be one of ${ALLOWED_QUALITIES.join(", ")}; got ${String(config.quality)}`
    );
  }
  if (config.videoFrameFormat !== void 0 && !isVideoFrameFormat(config.videoFrameFormat)) {
    throw new InvalidConfigError(
      "config.videoFrameFormat",
      `must be one of ${VIDEO_FRAME_FORMATS.join(", ")}; got ${String(config.videoFrameFormat)}`
    );
  }
  if (config.crf !== void 0 && config.bitrate !== void 0) {
    throw new InvalidConfigError("config.crf", "is mutually exclusive with config.bitrate");
  }
  if (config.crf !== void 0 && (!Number.isInteger(config.crf) || config.crf < 0 || config.crf > 51)) {
    throw new InvalidConfigError("config.crf", `must be an integer in [0, 51]; got ${config.crf}`);
  }
  if (config.bitrate !== void 0 && !/^\d+(\.\d+)?[kKmM]?$/.test(config.bitrate)) {
    throw new InvalidConfigError(
      "config.bitrate",
      `must look like "10M" or "5000k"; got ${JSON.stringify(config.bitrate)}`
    );
  }
  if (config.chunkSize !== void 0) {
    if (!Number.isInteger(config.chunkSize) || config.chunkSize < 1) {
      throw new InvalidConfigError(
        "config.chunkSize",
        `must be a positive integer; got ${config.chunkSize}`
      );
    }
    if (config.chunkSize > MAX_CHUNK_SIZE) {
      throw new InvalidConfigError(
        "config.chunkSize",
        `must be <= ${MAX_CHUNK_SIZE}; got ${config.chunkSize}`
      );
    }
  }
  if (config.maxParallelChunks !== void 0) {
    if (!Number.isInteger(config.maxParallelChunks) || config.maxParallelChunks < 1) {
      throw new InvalidConfigError(
        "config.maxParallelChunks",
        `must be a positive integer; got ${config.maxParallelChunks}`
      );
    }
    if (config.maxParallelChunks > MAX_PARALLEL_CHUNKS_CEILING) {
      throw new InvalidConfigError(
        "config.maxParallelChunks",
        `must be <= ${MAX_PARALLEL_CHUNKS_CEILING}; got ${config.maxParallelChunks}`
      );
    }
  }
  if (config.targetChunkFrames !== void 0) {
    if (!Number.isInteger(config.targetChunkFrames) || config.targetChunkFrames < 1) {
      throw new InvalidConfigError(
        "config.targetChunkFrames",
        `must be a positive integer; got ${config.targetChunkFrames}`
      );
    }
    if (config.targetChunkFrames > MAX_CHUNK_SIZE) {
      throw new InvalidConfigError(
        "config.targetChunkFrames",
        `must be <= ${MAX_CHUNK_SIZE}; got ${config.targetChunkFrames}`
      );
    }
  }
  if (config.runtimeCap !== void 0 && !ALLOWED_RUNTIME_CAPS.includes(config.runtimeCap)) {
    throw new InvalidConfigError(
      "config.runtimeCap",
      `must be one of ${ALLOWED_RUNTIME_CAPS.join(", ")}; got ${String(config.runtimeCap)}`
    );
  }
  if (config.hdrMode !== void 0 && !ALLOWED_HDR_MODES.includes(config.hdrMode)) {
    throw new InvalidConfigError(
      "config.hdrMode",
      `distributed mode supports only ${ALLOWED_HDR_MODES.join(", ")}; got ${String(config.hdrMode)}`
    );
  }
  if (config.variables !== void 0) {
    validateVariablesPayload(config.variables);
  }
  if (config.engineConfig !== void 0) {
    try {
      validateEngineConfigSnapshot(config.engineConfig);
    } catch (error) {
      throw new InvalidConfigError(
        "config.engineConfig",
        error instanceof Error ? error.message : "must be a valid engine config snapshot"
      );
    }
  }
  return config;
}
function validateVariablesPayload(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new InvalidConfigError(
      "config.variables",
      `must be a plain JSON object (got ${describeValue(value)})`
    );
  }
  validateJsonSafeValue(value, "config.variables");
}
function validateJsonSafeValue(value, field) {
  walkVariables(value, field, /* @__PURE__ */ new WeakSet());
}
var LEAF_REJECTIONS = {
  undefined: "undefined leaves are silently dropped by JSON.stringify \u2014 use null if you mean an absent value",
  function: "functions are not JSON-serializable",
  symbol: "Symbols are not JSON-serializable",
  bigint: "BigInt values throw at JSON.stringify \u2014 encode as a string if you need 64-bit integers"
};
function walkVariables(value, path, seen) {
  const t = typeof value;
  if (value === null || t === "string" || t === "boolean") return;
  if (t === "number") {
    if (!Number.isFinite(value)) {
      throw new InvalidConfigError(
        path,
        `non-finite numbers (NaN / Infinity) are not JSON-serializable; got ${String(value)}`
      );
    }
    return;
  }
  const leafReject = LEAF_REJECTIONS[t];
  if (leafReject !== void 0) {
    throw new InvalidConfigError(path, leafReject);
  }
  if (seen.has(value)) {
    throw new InvalidConfigError(
      path,
      "circular reference detected \u2014 JSON.stringify cannot serialize cycles"
    );
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      walkVariables(value[i], `${path}[${i}]`, seen);
    }
    return;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto !== Object.prototype && proto !== null) {
    throw new InvalidConfigError(
      path,
      `non-plain objects are not supported (got ${describeValue(value)}); use a plain {\u2026} object`
    );
  }
  for (const key of Object.keys(value)) {
    walkVariables(value[key], `${path}.${key}`, seen);
  }
}
function describeValue(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value !== "object") return typeof value;
  const ctorName = value.constructor?.name ?? "Object";
  return ctorName === "Object" ? "object" : ctorName;
}
function validateIntDimension(field, value) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new InvalidConfigError(field, `must be an integer; got ${String(value)}`);
  }
  if (value < MIN_DIMENSION || value > MAX_DIMENSION) {
    throw new InvalidConfigError(
      field,
      `must be in [${MIN_DIMENSION}, ${MAX_DIMENSION}]; got ${value}`
    );
  }
  if (value % 2 !== 0) {
    throw new InvalidConfigError(field, `must be even (yuv420p constraint); got ${value}`);
  }
}

// ../producer/src/renderRequest.ts
var RENDER_REQUEST_VERSION = 1;
function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
function assertPositiveFps(options) {
  const fps = options.fps;
  if (!isPlainObject(fps) || typeof fps.num !== "number" || typeof fps.den !== "number" || !Number.isInteger(fps.num) || !Number.isInteger(fps.den) || fps.num <= 0 || fps.den <= 0) {
    throw new Error("Render request fps must be a positive rational");
  }
}
function assertOptionalBoolean(options, field) {
  if (options[field] !== void 0 && typeof options[field] !== "boolean") {
    throw new Error(`Render request ${field} must be a boolean`);
  }
}
function assertOptionalInteger(options, field, min = 0) {
  const value = options[field];
  if (value !== void 0 && (typeof value !== "number" || !Number.isInteger(value) || value < min)) {
    throw new Error(`Render request ${field} must be an integer >= ${min}`);
  }
}
function assertOptionalString(options, field) {
  if (options[field] !== void 0 && typeof options[field] !== "string") {
    throw new Error(`Render request ${field} must be a string`);
  }
}
function assertOptionalEnum(options, field, allowed) {
  const value = options[field];
  if (value !== void 0 && (typeof value !== "string" || !allowed.includes(value))) {
    throw new Error(`Render request ${field} is invalid`);
  }
}
function isCanvasResolution(value) {
  return typeof value === "string" && VALID_CANVAS_RESOLUTIONS.some((resolution) => resolution === value);
}
function assertDistributedOptions(value) {
  if (!isPlainObject(value)) throw new Error("Render request distributed must be an object");
  for (const field of ["width", "height"]) {
    if (typeof value[field] !== "number" || !Number.isInteger(value[field]) || value[field] <= 0) {
      throw new Error(`Render request distributed.${field} must be a positive integer`);
    }
  }
  assertOptionalEnum(value, "codec", ["h264", "h265"]);
  for (const field of [
    "chunkSize",
    "maxParallelChunks",
    "targetChunkFrames",
    "planDirSizeLimitBytes"
  ]) {
    assertOptionalInteger(value, field, 1);
  }
  assertOptionalEnum(value, "runtimeCap", [
    "lambda",
    "temporal",
    "cloud-run-job",
    "k8s-job",
    "none"
  ]);
  for (const field of ["rejectOnSystemFonts", "failClosedFontFetch", "cfr"]) {
    assertOptionalBoolean(value, field);
  }
}
function assertRequestOptionScalars(options) {
  assertOptionalInteger(options, "gifLoop");
  assertOptionalInteger(options, "hlsSegmentSeconds", 1);
  assertOptionalInteger(options, "workers", 1);
  assertOptionalInteger(options, "crf");
  for (const field of ["useGpu", "debug", "outputResolutionAspectAgnostic"]) {
    assertOptionalBoolean(options, field);
  }
  for (const field of ["entryFile", "videoBitrate"]) {
    assertOptionalString(options, field);
  }
  assertOptionalEnum(options, "strictness", ["strict", "best-effort"]);
  assertOptionalEnum(options, "hdrMode", ["auto", "force-hdr", "force-sdr"]);
  if (options.videoFrameFormat !== void 0 && !isVideoFrameFormat(options.videoFrameFormat)) {
    throw new Error("Render request videoFrameFormat is invalid");
  }
  if (options.outputResolution !== void 0 && !isCanvasResolution(options.outputResolution)) {
    throw new Error("Render request outputResolution is invalid");
  }
}
function assertRequestOptionObjects(options) {
  validateEngineConfigSnapshot(options.engineConfig);
  if (options.variables !== void 0 && !isPlainObject(options.variables)) {
    throw new Error("Render request variables must be a JSON object");
  }
  if (options.distributed !== void 0) assertDistributedOptions(options.distributed);
}
function assertRequestOptions(options) {
  if (!isPlainObject(options)) throw new Error("Render request options must be an object");
  assertPositiveFps(options);
  if (!["draft", "standard", "high"].includes(String(options.quality))) {
    throw new Error("Render request quality is invalid");
  }
  if (!["mp4", "webm", "mov", "png-sequence", "gif", "hls"].includes(String(options.format))) {
    throw new Error("Render request format is invalid");
  }
  assertRequestOptionScalars(options);
  assertRequestOptionObjects(options);
}
function assertNonEmptyPath(value, field) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Render request ${field} must be a non-empty string`);
  }
}
function omitUndefinedProperties(value) {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== void 0));
}
function assertRenderRequest(value) {
  if (!isPlainObject(value) || value.version !== RENDER_REQUEST_VERSION) {
    const version = isPlainObject(value) ? value.version : void 0;
    throw new Error(`Unsupported render request version: ${String(version)}`);
  }
  assertNonEmptyPath(value.projectDir, "projectDir");
  assertNonEmptyPath(value.outputPath, "outputPath");
  assertRequestOptions(value.options);
  validateJsonSafeValue(value, "renderRequest");
}
function parseRenderRequest(serialized) {
  const value = typeof serialized === "string" ? JSON.parse(serialized) : serialized;
  assertRenderRequest(value);
  return value;
}
function serializeRenderRequest(request) {
  assertRenderRequest(request);
  return JSON.stringify(request);
}
function createRenderRequest(input) {
  const request = {
    version: RENDER_REQUEST_VERSION,
    projectDir: input.projectDir,
    outputPath: input.outputPath,
    options: {
      ...omitUndefinedProperties(input.options),
      engineConfig: input.engineConfig ?? resolveConfig(input.engineOverrides)
    }
  };
  return parseRenderRequest(serializeRenderRequest(request));
}
function renderConfigFromRequest(request, runtime = {}) {
  const { engineConfig, distributed: _distributed, ...options } = request.options;
  return {
    ...options,
    producerConfig: engineConfig,
    logger: runtime.logger
  };
}
function distributedFps(fps) {
  if (fps.den === 1 && (fps.num === 24 || fps.num === 30 || fps.num === 60)) return fps.num;
  throw new Error(`Distributed render does not support fps ${fps.num}/${fps.den}`);
}
function distributedConfigFromRequest(request, runtime = {}) {
  const options = request.options;
  const distributed = options.distributed;
  if (!distributed) throw new Error("Render request is missing distributed options");
  if (options.format === "gif" || options.format === "hls") {
    throw new Error(`Distributed render does not support ${options.format}`);
  }
  if (options.hdrMode === "force-hdr") {
    throw new Error("Distributed render does not support force-hdr");
  }
  return {
    fps: distributedFps(options.fps),
    width: distributed.width,
    height: distributed.height,
    format: options.format,
    codec: distributed.codec,
    quality: options.quality,
    crf: options.crf,
    bitrate: options.videoBitrate,
    videoFrameFormat: options.videoFrameFormat,
    outputResolution: options.outputResolution,
    outputResolutionAspectAgnostic: options.outputResolutionAspectAgnostic,
    chunkSize: distributed.chunkSize,
    maxParallelChunks: distributed.maxParallelChunks,
    targetChunkFrames: distributed.targetChunkFrames,
    runtimeCap: distributed.runtimeCap,
    rejectOnSystemFonts: distributed.rejectOnSystemFonts,
    failClosedFontFetch: distributed.failClosedFontFetch,
    hdrMode: options.hdrMode === "auto" ? "auto" : "force-sdr",
    cfr: distributed.cfr,
    logger: runtime.logger,
    engineConfig: options.engineConfig,
    entryFile: options.entryFile,
    strictness: options.strictness,
    abortSignal: runtime.abortSignal,
    planDirSizeLimitBytes: distributed.planDirSizeLimitBytes,
    variables: options.variables
  };
}
function optionalProperty(key, value) {
  return value === void 0 ? {} : { [key]: value };
}
function renderRequestFromDistributedConfig(input) {
  const { config } = input;
  validateDistributedRenderConfig(config);
  const distributed = {
    width: config.width,
    height: config.height,
    ...optionalProperty("codec", config.codec),
    ...optionalProperty("chunkSize", config.chunkSize),
    ...optionalProperty("maxParallelChunks", config.maxParallelChunks),
    ...optionalProperty("targetChunkFrames", config.targetChunkFrames),
    ...optionalProperty("runtimeCap", config.runtimeCap),
    ...optionalProperty("rejectOnSystemFonts", config.rejectOnSystemFonts),
    ...optionalProperty("failClosedFontFetch", config.failClosedFontFetch),
    ...optionalProperty("cfr", config.cfr),
    ...optionalProperty("planDirSizeLimitBytes", config.planDirSizeLimitBytes)
  };
  const options = {
    fps: { num: config.fps, den: 1 },
    quality: config.quality ?? "standard",
    format: config.format,
    distributed,
    ...optionalProperty("crf", config.crf),
    ...optionalProperty("videoBitrate", config.bitrate),
    ...optionalProperty("videoFrameFormat", config.videoFrameFormat),
    ...optionalProperty("outputResolution", config.outputResolution),
    ...optionalProperty("outputResolutionAspectAgnostic", config.outputResolutionAspectAgnostic),
    ...optionalProperty("hdrMode", config.hdrMode),
    ...optionalProperty("strictness", config.strictness),
    ...optionalProperty("entryFile", config.entryFile),
    ...optionalProperty("variables", config.variables)
  };
  return createRenderRequest({
    projectDir: input.projectDir,
    outputPath: input.outputPath,
    engineConfig: config.engineConfig ?? resolveConfig(),
    options
  });
}

// ../producer/src/server.ts
import {
  existsSync as existsSync18,
  mkdirSync as mkdirSync9,
  statSync as statSync7,
  mkdtempSync as mkdtempSync4,
  writeFileSync as writeFileSync6,
  rmSync as rmSync9,
  createReadStream as createReadStream3
} from "fs";
import { resolve as resolve8, dirname as dirname11, join as join28 } from "path";
import { tmpdir as tmpdir3 } from "os";
import { parseArgs } from "util";
import crypto from "crypto";
import { Hono as Hono2 } from "hono";
import { streamSSE } from "hono/streaming";
import { serve as serve2 } from "@hono/node-server";

// ../producer/src/services/hyperframeLint.ts
import {
  existsSync as existsSync16,
  readFileSync as readFileSync8,
  statSync as statSync6,
  openSync as openSync4,
  fstatSync as fstatSync4,
  closeSync as closeSync5,
  constants as constants3
} from "fs";
import { resolve as resolve7, join as join26, relative as relative3, isAbsolute as isAbsolute2, sep as sep2 } from "path";
function isStringRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  return Object.values(value).every((item) => typeof item === "string");
}
function pickEntryFile(files, preferredEntryFile) {
  const candidates = [];
  if (preferredEntryFile) {
    candidates.push(preferredEntryFile);
  }
  candidates.push("index.html", "src/index.html");
  for (const candidate of candidates) {
    const value = files[candidate];
    if (typeof value === "string" && value.length > 0) {
      return candidate;
    }
  }
  for (const [fileName, content] of Object.entries(files)) {
    if (fileName.toLowerCase().endsWith(".html") && content.length > 0) {
      return fileName;
    }
  }
  return null;
}
function readEntryHtml(filePath) {
  let fd;
  try {
    fd = openSync4(filePath, constants3.O_RDONLY | constants3.O_NONBLOCK);
  } catch (error) {
    if (error instanceof Error && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR"))
      return null;
    if (!statSync6(filePath, { throwIfNoEntry: false })?.isFile()) return null;
    throw error;
  }
  try {
    if (!fstatSync4(fd).isFile()) return null;
    return readFileSync8(fd, "utf-8");
  } finally {
    closeSync5(fd);
  }
}
function readProjectEntryFile(projectDir, preferredEntryFile) {
  const absProjectDir = resolve7(projectDir);
  if (!existsSync16(absProjectDir) || !statSync6(absProjectDir).isDirectory()) {
    return { error: `Project directory not found: ${absProjectDir}` };
  }
  const entryCandidates = [preferredEntryFile, "index.html", "src/index.html"].filter(
    (value) => typeof value === "string" && value.trim().length > 0
  );
  for (const entryFile of entryCandidates) {
    const absoluteEntryPath = resolve7(absProjectDir, entryFile);
    const entryRelativePath = relative3(absProjectDir, absoluteEntryPath);
    if (entryRelativePath === ".." || entryRelativePath.startsWith(`..${sep2}`) || isAbsolute2(entryRelativePath)) {
      return { error: `Entry file must stay inside project directory: ${entryFile}` };
    }
    const html = readEntryHtml(absoluteEntryPath);
    if (html !== null) {
      return {
        entryFile,
        html,
        source: "projectDir"
      };
    }
  }
  return {
    error: `No HTML entry file found in project directory: ${join26(absProjectDir, preferredEntryFile || "index.html")}`
  };
}
function prepareHyperframeLintBody(body) {
  const requestedEntryFile = typeof body.entryFile === "string" && body.entryFile.trim().length > 0 ? body.entryFile.trim() : void 0;
  if (typeof body.projectDir === "string" && body.projectDir.trim().length > 0) {
    const prepared = readProjectEntryFile(body.projectDir, requestedEntryFile);
    if ("error" in prepared) {
      return prepared;
    }
    return { prepared };
  }
  if (isStringRecord(body.files)) {
    const entryFile = pickEntryFile(body.files, requestedEntryFile);
    if (!entryFile) {
      return { error: "No HTML entry file found in files payload" };
    }
    return {
      prepared: {
        entryFile,
        html: body.files[entryFile] ?? "",
        source: "files"
      }
    };
  }
  if (typeof body.html === "string") {
    return {
      prepared: {
        entryFile: requestedEntryFile || "index.html",
        html: body.html,
        source: "html"
      }
    };
  }
  return { error: "Missing lint source: provide projectDir, files, or html" };
}
async function runHyperframeLint(prepared) {
  return lintHyperframeHtml(prepared.html, { filePath: prepared.entryFile });
}

// ../producer/src/services/healthWorker.ts
import { Worker as Worker2 } from "worker_threads";
import { fileURLToPath as fileURLToPath5 } from "url";
import { dirname as dirname10, join as join27 } from "path";
import { existsSync as existsSync17 } from "fs";
var DEFAULT_HEALTH_PORT = 9848;
async function startHealthWorker(options = {}) {
  const log = options.logger ?? defaultLogger2();
  const port = options.port ?? parseInt(process.env.PRODUCER_HEALTH_PORT ?? String(DEFAULT_HEALTH_PORT), 10);
  const entry = options.workerEntry ?? resolveWorkerEntry2();
  if (!entry) {
    throw new Error(
      "[healthWorker] could not resolve worker entry. Pass options.workerEntry or ensure healthWorkerThread.{js,ts} is co-located."
    );
  }
  const worker = new Worker2(entry, {
    workerData: { port },
    // Keep stdio inherited so the worker's console logs land in the pod logs
    // alongside the main thread's.
    stdout: false,
    stderr: false
  });
  await new Promise((resolve11, reject) => {
    const onMessage = (msg) => {
      if (msg?.type === "listening") {
        worker.off("error", onError);
        worker.off("message", onMessage);
        resolve11();
      } else if (msg?.type === "listen-error") {
        worker.off("error", onError);
        worker.off("message", onMessage);
        reject(new Error(`[healthWorker] failed to bind port ${port}: ${msg.error}`));
      }
    };
    const onError = (err) => {
      worker.off("error", onError);
      worker.off("message", onMessage);
      reject(err);
    };
    worker.on("message", onMessage);
    worker.on("error", onError);
  });
  log.info?.(`[healthWorker] /health listening on worker thread, port ${port}`);
  let shutdownPromise = null;
  const shutdown = () => {
    if (shutdownPromise) return shutdownPromise;
    shutdownPromise = (async () => {
      try {
        worker.postMessage({ type: "shutdown" });
        await Promise.race([
          new Promise((res) => worker.once("exit", () => res())),
          new Promise((res) => setTimeout(res, 2e3))
        ]);
      } finally {
        await worker.terminate().catch(() => {
        });
      }
    })();
    return shutdownPromise;
  };
  worker.on("error", (err) => {
    log.error?.(`[healthWorker] worker thread error: ${err.message}`);
  });
  worker.on("exit", (code) => {
    if (code !== 0) {
      log.warn?.(`[healthWorker] worker thread exited with code ${code}`);
    }
  });
  return { port, shutdown };
}
function defaultLogger2() {
  return {
    info: (msg) => console.log(msg),
    warn: (msg) => console.warn(msg),
    error: (msg) => console.error(msg)
  };
}
function resolveWorkerEntry2() {
  const here = dirname10(fileURLToPath5(import.meta.url));
  const candidates = [join27(here, "healthWorkerThread.js"), join27(here, "healthWorkerThread.ts")];
  for (const candidate of candidates) {
    if (existsSync17(candidate)) return candidate;
  }
  return void 0;
}

// ../producer/src/server.ts
var DEFAULT_SERVER_FPS = { num: 30, den: 1 };
var SAFE_RENDER_ERROR_CODES = /* @__PURE__ */ new Set([
  "ASSET_MEDIA_TYPE_MISMATCH",
  "NOT_MEDIA_PAYLOAD",
  "INVALID_VIDEO_METADATA",
  "VIDEO_SOURCE_UNRENDERABLE",
  "VIDEO_EXTRACTION_FAILED",
  "ENCODER_INTERRUPTED"
]);
function extractSafeRenderErrorCode(error) {
  if (typeof error !== "object" || error === null || !("code" in error)) return void 0;
  const code = error.code;
  return typeof code === "string" && SAFE_RENDER_ERROR_CODES.has(code) ? code : void 0;
}
function extractSafeRenderErrorMetadata(error) {
  const errorCode = extractSafeRenderErrorCode(error);
  if (!errorCode || typeof error !== "object" || error === null) return void 0;
  const owner = "owner" in error ? error.owner : void 0;
  const retryable = "retryable" in error ? error.retryable : void 0;
  const publicMetadata = "publicMetadata" in error ? error.publicMetadata : void 0;
  return {
    errorCode,
    errorOwner: owner === "user" || owner === "system" ? owner : void 0,
    retryable: typeof retryable === "boolean" ? retryable : void 0,
    ...isPlainObject2(publicMetadata) ? { errorMetadata: publicMetadata } : {}
  };
}
function parseServerFps(value) {
  if (typeof value !== "number" && typeof value !== "string") return DEFAULT_SERVER_FPS;
  const parsed = parseFps(value);
  return parsed.ok ? parsed.value : DEFAULT_SERVER_FPS;
}
function nonEmptyString(value) {
  if (typeof value !== "string") return void 0;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : void 0;
}
function parseOutputCandidate(body) {
  return nonEmptyString(body.outputPath) ?? nonEmptyString(body.output) ?? null;
}
function parseServerQuality(value) {
  return value === "draft" || value === "standard" || value === "high" ? value : "high";
}
function parseServerFormat(value) {
  return value === "mp4" || value === "webm" || value === "mov" ? value : void 0;
}
function parseServerOutputDynamicRange(value) {
  return value === "auto" || value === "hdr" || value === "sdr" ? value : void 0;
}
function parseLegacyServerHdrMode(value) {
  return value === "auto" || value === "force-hdr" || value === "force-sdr" ? value : void 0;
}
function fromRenderHdrMode(hdrMode) {
  if (hdrMode === "force-hdr") return "hdr";
  if (hdrMode === "force-sdr") return "sdr";
  return hdrMode;
}
function toRenderHdrMode(outputDynamicRange) {
  if (outputDynamicRange === "hdr") return "force-hdr";
  if (outputDynamicRange === "sdr") return "force-sdr";
  return outputDynamicRange;
}
function parseRenderOptions(body) {
  const fps = parseServerFps(body.fps);
  const quality = parseServerQuality(body.quality);
  const workers = typeof body.workers === "number" ? body.workers : void 0;
  const useGpu = body.gpu === true;
  const debug = body.debug === true;
  const strictness = body.bestEffort === false ? "strict" : "best-effort";
  const outputPath = parseOutputCandidate(body);
  const entryFile = nonEmptyString(body.entryFile);
  const format = parseServerFormat(body.format);
  const outputDynamicRange = parseServerOutputDynamicRange(body.outputDynamicRange) ?? fromRenderHdrMode(parseLegacyServerHdrMode(body.hdrMode));
  const videoFrameFormat = isVideoFrameFormat(body.videoFrameFormat) ? body.videoFrameFormat : void 0;
  const { variables, outputResolution, outputResolutionAspectAgnostic, outputSize, captureSize } = parseRenderOverrides(body);
  return {
    outputPath,
    fps,
    quality,
    workers,
    useGpu,
    debug,
    strictness,
    entryFile,
    format,
    outputDynamicRange,
    variables,
    outputResolution,
    outputResolutionAspectAgnostic,
    outputSize,
    captureSize,
    videoFrameFormat
  };
}
function isPlainObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function parseDimensionSize(value) {
  return isPlainObject2(value) && typeof value.width === "number" && typeof value.height === "number" && Number.isInteger(value.width) && Number.isInteger(value.height) && value.width > 0 && value.height > 0 ? { width: value.width, height: value.height } : void 0;
}
function parseRenderOverrides(body) {
  const variables = isPlainObject2(body.variables) ? body.variables : void 0;
  const rawOutputResolution = typeof body.outputResolution === "string" ? body.outputResolution : void 0;
  const outputResolution = rawOutputResolution ? normalizeResolutionFlag(rawOutputResolution) : void 0;
  const outputResolutionAspectAgnostic = outputResolution ? isAspectAgnosticResolutionAlias(rawOutputResolution) : void 0;
  const outputSize = parseDimensionSize(body.outputSize);
  const captureSize = parseDimensionSize(body.captureSize);
  return { variables, outputResolution, outputResolutionAspectAgnostic, outputSize, captureSize };
}
function buildRenderJobConfig(input, outputPath, log) {
  const request = createRenderRequest({
    projectDir: input.projectDir,
    outputPath,
    options: {
      fps: input.fps,
      quality: input.quality,
      format: input.format ?? "mp4",
      workers: input.workers,
      useGpu: input.useGpu,
      debug: input.debug,
      strictness: input.strictness,
      entryFile: input.entryFile,
      variables: input.variables,
      outputResolution: input.outputResolution,
      outputResolutionAspectAgnostic: input.outputResolutionAspectAgnostic,
      videoFrameFormat: input.videoFrameFormat,
      hdrMode: toRenderHdrMode(input.outputDynamicRange)
    }
  });
  return renderConfigFromRequest(request, { logger: log });
}
function resolvePreparedRenderOutput(prepared, rendersDir, log) {
  const { input, cleanupProjectDir } = prepared;
  const absoluteOutputPath = resolveOutputPath(input.projectDir, input.outputPath, rendersDir, log);
  const outputDir = dirname11(absoluteOutputPath);
  if (!existsSync18(outputDir)) mkdirSync9(outputDir, { recursive: true });
  return { input, cleanupProjectDir, absoluteOutputPath };
}
function validateRenderOverrides(body) {
  if (body.variables !== void 0 && !isPlainObject2(body.variables)) {
    return 'variables must be a JSON object keyed by variable id (e.g. {"title":"Hello"})';
  }
  if (body.outputDynamicRange !== void 0 && parseServerOutputDynamicRange(body.outputDynamicRange) === void 0) {
    return 'outputDynamicRange must be one of: "auto", "hdr", "sdr"';
  }
  const legacyHdrMode = parseLegacyServerHdrMode(body.hdrMode);
  if (body.hdrMode !== void 0 && legacyHdrMode === void 0) {
    return 'legacy hdrMode must be one of: "auto", "force-hdr", "force-sdr"';
  }
  const outputDynamicRange = parseServerOutputDynamicRange(body.outputDynamicRange);
  if (outputDynamicRange !== void 0 && legacyHdrMode !== void 0 && outputDynamicRange !== fromRenderHdrMode(legacyHdrMode)) {
    return "outputDynamicRange and legacy hdrMode must describe the same output policy";
  }
  return validateOutputResolutionOverride(body);
}
function validateOutputResolutionOverride(body) {
  if (body.outputResolution === void 0) return void 0;
  if (typeof body.outputResolution !== "string") {
    return 'outputResolution must be a string preset (e.g. "4k", "landscape-4k")';
  }
  const normalized = normalizeResolutionFlag(body.outputResolution);
  if (body.outputResolution.trim().length > 0 && normalized === void 0) {
    return `Invalid outputResolution "${body.outputResolution}". Must be one of: landscape, portrait, landscape-4k, portrait-4k, square, square-4k (aliases: 1080p, 4k, \u2026).`;
  }
  if (normalized !== void 0 && (body.format === "webm" || body.format === "mov")) {
    return `outputResolution is not supported with format "${body.format}" \u2014 the alpha (webm/mov) capture path can't supersample. Use format "mp4", or omit outputResolution to render at the composition's native dimensions.`;
  }
  return void 0;
}
function prepareProjectDirectory(projectDir, options) {
  const candidate = nonEmptyString(projectDir);
  if (!candidate) return null;
  const absProjectDir = resolve8(candidate);
  if (!existsSync18(absProjectDir) || !statSync7(absProjectDir).isDirectory()) {
    return { error: `Project directory not found: ${absProjectDir}` };
  }
  const entry = options.entryFile || "index.html";
  if (!existsSync18(resolve8(absProjectDir, entry))) {
    return { error: `Entry file "${entry}" not found in project directory: ${absProjectDir}` };
  }
  return { prepared: { input: { projectDir: absProjectDir, ...options } } };
}
async function resolveInlineRenderHtml(body) {
  const inlineHtml = typeof body.html === "string" ? body.html : "";
  if (inlineHtml) return { html: inlineHtml };
  const previewUrl = nonEmptyString(body.previewUrl);
  if (!previewUrl)
    return { error: "Missing render source: provide projectDir, previewUrl, or html" };
  try {
    const response = await fetch(previewUrl, { method: "GET" });
    if (!response.ok) {
      return { error: `Failed to fetch previewUrl: ${response.status} ${response.statusText}` };
    }
    return { html: await response.text() };
  } catch (error) {
    return {
      error: `Failed to fetch previewUrl: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}
function materializeInlineProject(html, options) {
  const tempRoot = process.env.PRODUCER_TMP_PROJECT_DIR || tmpdir3();
  const tempProjectDir = mkdtempSync4(join28(tempRoot, "producer-project-"));
  writeFileSync6(join28(tempProjectDir, "index.html"), html, "utf-8");
  return {
    prepared: {
      input: { projectDir: tempProjectDir, ...options },
      cleanupProjectDir: tempProjectDir
    }
  };
}
async function prepareRenderBody(body) {
  const overrideError = validateRenderOverrides(body);
  if (overrideError) return { error: overrideError };
  const options = parseRenderOptions(body);
  const project = prepareProjectDirectory(body.projectDir, options);
  if (project) return project;
  const source = await resolveInlineRenderHtml(body);
  return "error" in source ? source : materializeInlineProject(source.html, options);
}
function resolveOutputPath(projectDir, outputCandidate, rendersDir, log) {
  try {
    return resolveRenderPaths(projectDir, outputCandidate, rendersDir).absoluteOutputPath;
  } catch (error) {
    const fallbackPath = resolve8(rendersDir, `producer-fallback-${Date.now()}.mp4`);
    log.warn("Failed to resolve output path, using fallback", {
      fallback: fallbackPath,
      error: error instanceof Error ? error.message : String(error)
    });
    return fallbackPath;
  }
}
function createArtifactStore(ttlMs) {
  const artifacts = /* @__PURE__ */ new Map();
  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [token, artifact] of artifacts.entries()) {
      if (artifact.expiresAtMs <= now) {
        artifacts.delete(token);
      }
    }
  }, 6e4);
  cleanup.unref();
  return {
    register(path) {
      const token = crypto.randomUUID();
      artifacts.set(token, { path, expiresAtMs: Date.now() + ttlMs });
      return token;
    },
    get(token) {
      return artifacts.get(token);
    },
    delete(token) {
      artifacts.delete(token);
    }
  };
}
function cleanupTempDir(dir, log) {
  if (!dir) return;
  try {
    rmSync9(dir, { recursive: true, force: true });
  } catch (error) {
    log.warn("Failed to cleanup temp project dir", {
      cleanupProjectDir: dir,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
function outputFileSize(path) {
  return existsSync18(path) ? statSync7(path).size : 0;
}
function createBlockingProgressReporter(log, requestId) {
  let lastLoggedPct = -10;
  return (job, message) => {
    const pct = job.progress;
    if (pct < lastLoggedPct + 10) return;
    lastLoggedPct = pct;
    log.info(`render progress ${pct}%`, { requestId, stage: job.currentStage, message });
  };
}
async function prepareSseRenderRequest(c, stream, requestId) {
  let body;
  try {
    body = await c.req.json();
  } catch {
    await stream.writeSSE({
      data: JSON.stringify({
        type: "error",
        requestId,
        error: "Invalid JSON body",
        stage: "validation"
      })
    });
    return null;
  }
  const prepared = await prepareRenderBody(body);
  if (!("error" in prepared)) return prepared.prepared;
  await stream.writeSSE({
    data: JSON.stringify({
      type: "error",
      requestId,
      error: prepared.error,
      stage: "validation"
    })
  });
  return null;
}
function createSseProgressReporter(stream, requestId) {
  return async (job, message) => {
    await stream.writeSSE({
      data: JSON.stringify({
        type: "progress",
        requestId,
        stage: job.currentStage,
        progress: job.progress,
        framesRendered: job.framesRendered ?? 0,
        totalFrames: job.totalFrames ?? 0,
        message
      })
    });
  };
}
async function writeRenderStreamFailure(input) {
  const { error, job, stream, requestId, startedAtMs, log } = input;
  if (error instanceof RenderCancelledError) {
    await stream.writeSSE({
      data: JSON.stringify({
        type: "cancelled",
        requestId,
        stage: job.currentStage,
        outcome: job.outcome ?? "cancelled",
        message: error.message
      })
    });
    return;
  }
  const errorMsg = error instanceof Error ? error.message : String(error);
  const safeError = extractSafeRenderErrorMetadata(error);
  const elapsedMs = Date.now() - startedAtMs;
  log.error("render-stream failed", {
    requestId,
    elapsedMs,
    error: errorMsg,
    stage: job.currentStage
  });
  await stream.writeSSE({
    data: JSON.stringify({
      type: "error",
      requestId,
      error: errorMsg,
      errorCode: safeError?.errorCode,
      errorOwner: safeError?.errorOwner,
      retryable: safeError?.retryable,
      errorMetadata: safeError?.errorMetadata,
      stage: job.currentStage,
      elapsedMs,
      errorDetails: job.errorDetails ?? null,
      outcome: job.outcome ?? "failed",
      warnings: job.warnings
    })
  });
}
function createRenderHandlers(options = {}) {
  const log = options.logger ?? defaultLogger;
  const getRequestId = options.getRequestId ?? ((c) => c.req.header("x-request-id") || crypto.randomUUID());
  const outputUrlPrefix = options.outputUrlPrefix ?? "/outputs";
  const rendersDir = options.rendersDir ?? process.env.PRODUCER_RENDERS_DIR ?? "/tmp";
  const artifactTtlMs = options.artifactTtlMs ?? Number(process.env.PRODUCER_OUTPUT_ARTIFACT_TTL_MS || 15 * 60 * 1e3);
  const store = createArtifactStore(artifactTtlMs);
  const maxConcurrentRenders = options.maxConcurrentRenders ?? Number(process.env.PRODUCER_MAX_CONCURRENT_RENDERS || 2);
  const renderSemaphore = new Semaphore(maxConcurrentRenders);
  const startTime = Date.now();
  const health = (c) => c.json({
    status: "ok",
    uptime: Math.floor((Date.now() - startTime) / 1e3),
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const lint = async (c) => {
    const requestId = getRequestId(c);
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ success: false, requestId, error: "Invalid JSON body" }, 400);
    }
    const preparedResult = prepareHyperframeLintBody(body);
    if ("error" in preparedResult) {
      return c.json({ success: false, requestId, error: preparedResult.error }, 400);
    }
    const result = await runHyperframeLint(preparedResult.prepared);
    log.info("lint completed", {
      requestId,
      entryFile: preparedResult.prepared.entryFile,
      source: preparedResult.prepared.source,
      errorCount: result.errorCount,
      warningCount: result.warningCount
    });
    return c.json({
      success: true,
      requestId,
      entryFile: preparedResult.prepared.entryFile,
      source: preparedResult.prepared.source,
      result
    });
  };
  const render = async (c) => {
    const requestId = getRequestId(c);
    const t0 = Date.now();
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ success: false, requestId, error: "Invalid JSON body" }, 400);
    }
    const preparedResult = await prepareRenderBody(body);
    if ("error" in preparedResult) {
      return c.json({ success: false, requestId, error: preparedResult.error }, 400);
    }
    const { input, cleanupProjectDir, absoluteOutputPath } = resolvePreparedRenderOutput(
      preparedResult.prepared,
      rendersDir,
      log
    );
    const release = await renderSemaphore.acquire();
    log.info("render started", {
      requestId,
      projectDir: input.projectDir,
      fps: input.fps,
      quality: input.quality
    });
    const job = createRenderJob(buildRenderJobConfig(input, absoluteOutputPath, log));
    try {
      await executeRenderJob(
        job,
        input.projectDir,
        absoluteOutputPath,
        createBlockingProgressReporter(log, requestId)
      );
      const fileSize = outputFileSize(absoluteOutputPath);
      const durationMs = Date.now() - t0;
      const outputToken = store.register(absoluteOutputPath);
      const outputUrl = `${outputUrlPrefix}/${outputToken}`;
      log.info("render completed", {
        requestId,
        durationMs,
        fileSize,
        perf: job.perfSummary ?? null
      });
      return c.json({
        success: true,
        requestId,
        outputPath: absoluteOutputPath,
        outputToken,
        outputUrl,
        fileSize,
        durationMs,
        videoDurationSeconds: job.duration ?? null,
        outcome: job.outcome ?? "completed",
        warnings: job.warnings,
        perf: job.perfSummary ?? null
      });
    } catch (error) {
      const durationMs = Date.now() - t0;
      const errorMsg = error instanceof Error ? error.message : String(error);
      const safeError = extractSafeRenderErrorMetadata(error);
      log.error("render failed", {
        requestId,
        durationMs,
        error: errorMsg,
        stage: job.currentStage
      });
      return c.json(
        {
          success: false,
          requestId,
          error: errorMsg,
          errorCode: safeError?.errorCode,
          errorOwner: safeError?.errorOwner,
          retryable: safeError?.retryable,
          errorMetadata: safeError?.errorMetadata,
          stage: job.currentStage,
          durationMs,
          errorDetails: job.errorDetails ?? null
        },
        500
      );
    } finally {
      release();
      cleanupTempDir(cleanupProjectDir, log);
    }
  };
  const renderStream = (c) => {
    return streamSSE(c, async (stream) => {
      const requestId = getRequestId(c);
      const t0 = Date.now();
      const prepared = await prepareSseRenderRequest(c, stream, requestId);
      if (!prepared) return;
      const { input, cleanupProjectDir, absoluteOutputPath } = resolvePreparedRenderOutput(
        prepared,
        rendersDir,
        log
      );
      log.info("render-stream started", { requestId, projectDir: input.projectDir });
      const job = createRenderJob(buildRenderJobConfig(input, absoluteOutputPath, log));
      const abortController = new AbortController();
      const onRequestAbort = () => abortController.abort(new RenderCancelledError("request_aborted"));
      c.req.raw.signal.addEventListener("abort", onRequestAbort, { once: true });
      if (renderSemaphore.activeCount >= maxConcurrentRenders) {
        await stream.writeSSE({
          data: JSON.stringify({
            type: "queued",
            requestId,
            position: renderSemaphore.waitingCount
          })
        });
      }
      const release = await renderSemaphore.acquire();
      try {
        await executeRenderJob(
          job,
          input.projectDir,
          absoluteOutputPath,
          createSseProgressReporter(stream, requestId),
          abortController.signal
        );
        const fileSize = outputFileSize(absoluteOutputPath);
        const outputToken = store.register(absoluteOutputPath);
        const outputUrl = `${outputUrlPrefix}/${outputToken}`;
        log.info("render-stream completed", { requestId, fileSize, perf: job.perfSummary ?? null });
        await stream.writeSSE({
          data: JSON.stringify({
            type: "complete",
            requestId,
            outputPath: absoluteOutputPath,
            outputToken,
            outputUrl,
            fileSize,
            videoDurationSeconds: job.duration ?? null,
            outcome: job.outcome ?? "completed",
            warnings: job.warnings,
            perf: job.perfSummary ?? null
          })
        });
      } catch (error) {
        await writeRenderStreamFailure({
          error,
          job,
          stream,
          requestId,
          startedAtMs: t0,
          log
        });
      } finally {
        release();
        c.req.raw.signal.removeEventListener("abort", onRequestAbort);
        cleanupTempDir(cleanupProjectDir, log);
      }
    });
  };
  const outputs = (c) => {
    const token = c.req.param("token") ?? "";
    const artifact = store.get(token);
    if (!artifact) {
      return c.json({ success: false, error: "Output artifact not found or expired" }, 404);
    }
    if (!existsSync18(artifact.path)) {
      store.delete(token);
      return c.json({ success: false, error: "Output artifact file missing" }, 404);
    }
    const stats = statSync7(artifact.path);
    return new Response(createReadStream3(artifact.path), {
      headers: {
        "content-type": "video/mp4",
        "content-length": String(stats.size),
        "cache-control": "no-store"
      }
    });
  };
  const queue = (c) => c.json({
    maxConcurrentRenders,
    activeRenders: renderSemaphore.activeCount,
    queuedRenders: renderSemaphore.waitingCount
  });
  return { render, renderStream, lint, health, outputs, queue };
}
function createProducerApp(options = {}) {
  const app = new Hono2();
  const handlers = createRenderHandlers(options);
  app.get("/health", handlers.health);
  app.post("/render", handlers.render);
  app.post("/render/stream", handlers.renderStream);
  app.get("/render/queue", handlers.queue);
  app.post("/lint", handlers.lint);
  app.get("/outputs/:token", handlers.outputs);
  return app;
}
function startServer(options = {}) {
  const port = options.port ?? parseInt(process.env.PRODUCER_PORT ?? "9847", 10);
  const log = options.logger ?? defaultLogger;
  const app = createProducerApp(options);
  const server = serve2({ fetch: app.fetch, port }, () => {
    log.info(`Listening on http://localhost:${port}`);
  });
  server.setTimeout(0);
  server.requestTimeout = 0;
  server.keepAliveTimeout = 0;
  const healthWorkerPromise = process.env.PRODUCER_DISABLE_HEALTH_WORKER === "1" ? Promise.resolve(null) : startHealthWorker({ logger: log }).catch((err) => {
    log.error(`[server] health worker failed to start: ${err.message}`);
    return null;
  });
  async function shutdown(signal) {
    log.info(`Received ${signal}, shutting down`);
    const { drainBrowserPool } = await import("./src-2CXRYIST.js");
    await drainBrowserPool().catch(() => {
    });
    const handle = await Promise.race([
      healthWorkerPromise,
      new Promise((res) => setTimeout(() => res(null), 1500).unref())
    ]);
    if (handle) {
      await handle.shutdown().catch(() => {
      });
    }
    server.close(() => {
      log.info("Server closed");
      process.exit(0);
    });
    setTimeout(() => {
      log.warn("Forced exit after 30s timeout");
      process.exit(1);
    }, 3e4).unref();
  }
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
  return server;
}
var entryScript = process.argv[1] ? resolve8(process.argv[1]) : "";
var isPublicServerEntry = entryScript.endsWith("/public-server.js") || entryScript.endsWith("/src/server.ts");
if (isPublicServerEntry) {
  const { values } = parseArgs({
    options: {
      port: { type: "string", short: "p", default: process.env.PRODUCER_PORT ?? "9847" }
    }
  });
  startServer({ port: parseInt(values.port, 10) });
}

// ../producer/src/services/distributed/plan.ts
import { cpSync as cpSync2, existsSync as existsSync21, mkdirSync as mkdirSync11, renameSync as renameSync4, rmSync as rmSync10, writeFileSync as writeFileSync8 } from "fs";
import { join as join32, relative as relative6, sep as sep3 } from "path";

// ../producer/src/services/render/stages/freezePlan.ts
import { existsSync as existsSync19, mkdirSync as mkdirSync10, readFileSync as readFileSync9, readdirSync as readdirSync6, writeFileSync as writeFileSync7 } from "fs";
import { join as join29, relative as relative4, resolve as resolve9 } from "path";

// ../producer/src/services/distributed/planProtocol.ts
var PLAN_SCHEMA_VERSION = 1;
var PLAN_ARTIFACT_LAYOUT = "plan-dir-v1";
var PLAN_HASH_SCHEMA = "hyperframes-plan-hash-v1";
var PLAN_V2_SCHEMA_VERSION = 2;
var PLAN_V2_ARTIFACT_LAYOUT = "content-addressed-plan-v2";
var PLAN_V2_HASH_SCHEMA = "hyperframes-plan-manifest-hash-v2";
var PLAN_PROTOCOL_UNSUPPORTED = "PLAN_PROTOCOL_UNSUPPORTED";
var PLAN_PROTOCOL_V1 = Object.freeze({
  schemaVersion: PLAN_SCHEMA_VERSION,
  artifactLayout: PLAN_ARTIFACT_LAYOUT,
  hashSchema: PLAN_HASH_SCHEMA
});
var CURRENT_PLAN_PROTOCOL = PLAN_PROTOCOL_V1;
var PLAN_PROTOCOL_V2 = Object.freeze({
  schemaVersion: PLAN_V2_SCHEMA_VERSION,
  artifactLayout: PLAN_V2_ARTIFACT_LAYOUT,
  hashSchema: PLAN_V2_HASH_SCHEMA
});
var DISTRIBUTED_RENDER_CAPABILITIES = Object.freeze({
  roles: Object.freeze({
    planner: Object.freeze({
      produces: Object.freeze([PLAN_PROTOCOL_V1, PLAN_PROTOCOL_V2])
    }),
    chunk: Object.freeze({
      accepts: Object.freeze([PLAN_PROTOCOL_V1, PLAN_PROTOCOL_V2]),
      acceptsLegacyV1WithoutDescriptor: true
    }),
    assembler: Object.freeze({
      accepts: Object.freeze([PLAN_PROTOCOL_V1, PLAN_PROTOCOL_V2]),
      acceptsLegacyV1WithoutDescriptor: true
    })
  })
});
function getDistributedRenderCapabilities() {
  return DISTRIBUTED_RENDER_CAPABILITIES;
}
var PlanProtocolUnsupportedError = class extends Error {
  // Public adapters inspect this typed code even though OSS producer does not.
  // fallow-ignore-next-line unused-class-member
  code = PLAN_PROTOCOL_UNSUPPORTED;
  constructor(reason) {
    super(`[planProtocol] ${reason} (${PLAN_PROTOCOL_UNSUPPORTED})`);
    this.name = "PlanProtocolUnsupportedError";
  }
};
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function protocolMatches(descriptor, expected) {
  return descriptor.schemaVersion === expected.schemaVersion && descriptor.artifactLayout === expected.artifactLayout && descriptor.hashSchema === expected.hashSchema;
}
function capabilitiesAccept(capabilities, protocol) {
  return capabilities.accepts.some(
    (accepted) => accepted.schemaVersion === protocol.schemaVersion && accepted.artifactLayout === protocol.artifactLayout && accepted.hashSchema === protocol.hashSchema
  );
}
function readPlanProtocol(planJson, capabilities = DISTRIBUTED_RENDER_CAPABILITIES.roles.chunk) {
  if (!isRecord(planJson)) {
    throw new PlanProtocolUnsupportedError("plan.json must contain a JSON object");
  }
  if (!Object.prototype.hasOwnProperty.call(planJson, "protocol")) {
    if (!capabilities.acceptsLegacyV1WithoutDescriptor || !capabilitiesAccept(capabilities, PLAN_PROTOCOL_V1)) {
      throw new PlanProtocolUnsupportedError(
        "legacy v1 plan without a protocol descriptor is not accepted by this worker"
      );
    }
    return PLAN_PROTOCOL_V1;
  }
  const descriptor = planJson.protocol;
  if (!isRecord(descriptor)) {
    throw new PlanProtocolUnsupportedError("plan.json protocol descriptor must be an object");
  }
  for (const field of ["schemaVersion", "artifactLayout", "hashSchema"]) {
    if (!Object.prototype.hasOwnProperty.call(descriptor, field)) {
      throw new PlanProtocolUnsupportedError(`plan.json protocol descriptor is missing ${field}`);
    }
  }
  const protocol = protocolMatches(descriptor, PLAN_PROTOCOL_V1) ? PLAN_PROTOCOL_V1 : protocolMatches(descriptor, PLAN_PROTOCOL_V2) ? PLAN_PROTOCOL_V2 : null;
  if (protocol === null || !capabilitiesAccept(capabilities, protocol)) {
    throw new PlanProtocolUnsupportedError("unsupported plan.json protocol descriptor");
  }
  return protocol;
}
function readPlanProtocolV1(planJson, capabilities = DISTRIBUTED_RENDER_CAPABILITIES.roles.chunk) {
  const protocol = readPlanProtocol(planJson, capabilities);
  if (protocol !== PLAN_PROTOCOL_V1) {
    throw new PlanProtocolUnsupportedError(
      "content-addressed v2 plan must be materialized before v1 layout access"
    );
  }
  return PLAN_PROTOCOL_V1;
}

// ../producer/src/services/render/stages/planHash.ts
import { createHash as createHash5 } from "crypto";
var PLAN_HASH_SCHEMA_PREFIX = "hyperframes-plan-hash-v1\0";
var FIELD_DELIMITER = Buffer.from([0]);
function computePlanHash(input) {
  const hash = createHash5("sha256");
  hash.update(PLAN_HASH_SCHEMA_PREFIX, "utf8");
  hash.update(input.compositionHtml);
  hash.update(FIELD_DELIMITER);
  const sortedAssets = [...input.assets].sort(
    (a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0
  );
  for (const asset of sortedAssets) {
    hash.update(asset.path, "utf8");
    hash.update(FIELD_DELIMITER);
    hash.update(asset.sha256, "utf8");
    hash.update(FIELD_DELIMITER);
  }
  hash.update(input.fontSnapshotSha, "utf8");
  hash.update(FIELD_DELIMITER);
  hash.update(input.encoderConfigCanonicalJson, "utf8");
  hash.update(FIELD_DELIMITER);
  hash.update(input.producerVersion, "utf8");
  hash.update(FIELD_DELIMITER);
  hash.update(input.ffmpegVersion, "utf8");
  hash.update(FIELD_DELIMITER);
  const d = input.dimensions;
  hash.update(`${d.fpsNum}/${d.fpsDen}x${d.width}x${d.height}x${d.format}`, "utf8");
  return hash.digest("hex");
}
function canonicalJsonStringify(value) {
  if (value === null) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError(`canonicalJsonStringify: non-finite number ${value}`);
    }
    return JSON.stringify(value);
  }
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value)) {
    return `[${value.map(canonicalJsonStringify).join(",")}]`;
  }
  if (typeof value === "object") {
    const obj = value;
    const keys = Object.keys(obj).sort();
    const parts = keys.map((k) => `${JSON.stringify(k)}:${canonicalJsonStringify(obj[k])}`);
    return `{${parts.join(",")}}`;
  }
  throw new TypeError(`canonicalJsonStringify: unsupported value type ${typeof value}`);
}
function sha256Hex(bytes) {
  const h = createHash5("sha256");
  h.update(bytes);
  return h.digest("hex");
}

// ../producer/src/services/render/stages/freezePlan.ts
var COMPILED_INDEX_RELATIVE_PATH = "compiled/index.html";
var HASH_EXCLUDED_PLAN_FILES = /* @__PURE__ */ new Set([
  "plan.json",
  "meta/encoder.json",
  COMPILED_INDEX_RELATIVE_PATH
]);
function stripUndefined(value) {
  if (Array.isArray(value)) return value.map(stripUndefined);
  if (value !== null && typeof value === "object") {
    const obj = value;
    const out = {};
    for (const key of Object.keys(obj)) {
      const v = obj[key];
      if (v === void 0) continue;
      out[key] = stripUndefined(v);
    }
    return out;
  }
  return value;
}
function listPlanFiles(planDir) {
  const results = [];
  const rootResolved = resolve9(planDir);
  function walk(dir) {
    const entries = readdirSync6(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join29(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        results.push({
          planRelativePath: relative4(rootResolved, full).split(/[\\/]+/).join("/"),
          absolutePath: full
        });
      }
    }
  }
  walk(rootResolved);
  results.sort((a, b) => a.planRelativePath < b.planRelativePath ? -1 : 1);
  return results;
}
function collectPlanAssetShas(planDir) {
  const files = listPlanFiles(planDir);
  let compositionHtml = null;
  const assets = [];
  for (const file of files) {
    if (file.planRelativePath === COMPILED_INDEX_RELATIVE_PATH) {
      compositionHtml = readFileSync9(file.absolutePath);
      continue;
    }
    if (HASH_EXCLUDED_PLAN_FILES.has(file.planRelativePath)) continue;
    const bytes = readFileSync9(file.absolutePath);
    assets.push({ path: file.planRelativePath, sha256: sha256Hex(bytes) });
  }
  if (compositionHtml === null) {
    throw new Error(
      `[freezePlan] compiled HTML missing at ${COMPILED_INDEX_RELATIVE_PATH} \u2014 upstream compile stage did not materialize the expected file.`
    );
  }
  return { compositionHtml, assets };
}
function recomputePlanHashFromPlanDir(planDir) {
  const planJsonPath = join29(planDir, "plan.json");
  const encoderJsonPath = join29(planDir, "meta", "encoder.json");
  if (!existsSync19(planJsonPath)) {
    throw new Error(`[freezePlan] plan.json missing: ${planJsonPath}`);
  }
  if (!existsSync19(encoderJsonPath)) {
    throw new Error(`[freezePlan] meta/encoder.json missing: ${encoderJsonPath}`);
  }
  const planJson = JSON.parse(readFileSync9(planJsonPath, "utf-8"));
  const encoderConfigCanonicalJson = readFileSync9(encoderJsonPath, "utf-8");
  const { compositionHtml, assets } = collectPlanAssetShas(planDir);
  return computePlanHash({
    compositionHtml,
    assets,
    fontSnapshotSha: planJson.fontSnapshotSha,
    encoderConfigCanonicalJson,
    producerVersion: planJson.producerVersion,
    ffmpegVersion: planJson.ffmpegVersion,
    dimensions: planJson.dimensions
  });
}
async function freezePlan(input) {
  const {
    planDir,
    composition,
    encoder,
    chunks,
    dimensions,
    producerVersion,
    fontSnapshotSha,
    durationSeconds,
    totalFrames,
    hasAudio
  } = input;
  if (!existsSync19(planDir)) {
    throw new Error(`[freezePlan] planDir does not exist: ${planDir}`);
  }
  const metaDir = join29(planDir, "meta");
  if (!existsSync19(metaDir)) mkdirSync10(metaDir, { recursive: true });
  writeFileSync7(
    join29(metaDir, "composition.json"),
    `${JSON.stringify(composition, null, 2)}
`,
    "utf-8"
  );
  const encoderForCanonical = stripUndefined(encoder);
  const encoderConfigCanonicalJson = canonicalJsonStringify(encoderForCanonical);
  writeFileSync7(join29(metaDir, "encoder.json"), encoderConfigCanonicalJson, "utf-8");
  writeFileSync7(join29(metaDir, "chunks.json"), `${JSON.stringify(chunks, null, 2)}
`, "utf-8");
  const { compositionHtml, assets } = collectPlanAssetShas(planDir);
  const planHash = computePlanHash({
    compositionHtml,
    assets,
    fontSnapshotSha,
    encoderConfigCanonicalJson,
    producerVersion,
    ffmpegVersion: encoder.ffmpegVersion,
    dimensions
  });
  const planJson = {
    protocol: PLAN_PROTOCOL_V1,
    planHash,
    producerVersion,
    ffmpegVersion: encoder.ffmpegVersion,
    fontSnapshotSha,
    dimensions,
    chunkCount: chunks.length,
    totalFrames,
    duration: durationSeconds,
    hasAudio
  };
  const planJsonPath = join29(planDir, "plan.json");
  writeFileSync7(planJsonPath, `${JSON.stringify(planJson, null, 2)}
`, "utf-8");
  return { planJsonPath, planHash };
}

// ../producer/src/services/render/runtimeEnvSnapshot.ts
var RUNTIME_ENV_PREFIXES = [
  "PRODUCER_RUNTIME_",
  "PRODUCER_RENDER_"
];
function snapshotRuntimeEnv(env = process.env) {
  const snapshot = {};
  for (const key of Object.keys(env)) {
    const matches = RUNTIME_ENV_PREFIXES.some((prefix) => key.startsWith(prefix));
    if (!matches) continue;
    const value = env[key];
    if (typeof value !== "string") continue;
    snapshot[key] = value;
  }
  return snapshot;
}
function applyRuntimeEnvSnapshot(snapshot, env = process.env) {
  const previous = {};
  for (const [key, value] of Object.entries(snapshot)) {
    if (typeof value !== "string") continue;
    const matches = RUNTIME_ENV_PREFIXES.some((prefix) => key.startsWith(prefix));
    if (!matches) continue;
    previous[key] = env[key];
    env[key] = value;
  }
  return {
    restore: () => {
      for (const [key, value] of Object.entries(previous)) {
        if (value === void 0) delete env[key];
        else env[key] = value;
      }
    }
  };
}

// ../producer/src/services/distributed/shared.ts
import { execFile as execFileCallback } from "child_process";
import { dirname as dirname12, join as join30 } from "path";
import { existsSync as existsSync20, readFileSync as readFileSync10 } from "fs";
import { fileURLToPath as fileURLToPath6 } from "url";
import { promisify as promisify2 } from "util";
var PLAN_VIDEOS_META_RELATIVE_PATH = "meta/videos.json";
var PLAN_AUDIO_RELATIVE_PATH = MIXED_AUDIO_FILENAME;
var PLAN_AUDIO_LEGACY_RELATIVE_PATH = "audio.aac";
function isPlanAudioArtifactPath(path) {
  return path === PLAN_AUDIO_RELATIVE_PATH || path === PLAN_AUDIO_LEGACY_RELATIVE_PATH;
}
var INVALID_VIDEO_METADATA = "INVALID_VIDEO_METADATA";
var PlanVideosMetadataError = class extends Error {
  // Read by cloud adapters across the package boundary to classify retries.
  // fallow-ignore-next-line unused-class-member
  code = INVALID_VIDEO_METADATA;
  constructor(message) {
    super(message);
    this.name = "PlanVideosMetadataError";
  }
};
function metadataError(field, expectation) {
  throw new PlanVideosMetadataError(`${field} ${expectation}`);
}
function readRecord(value, field) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    metadataError(field, "must be an object");
  }
  return value;
}
function readNonEmptyString(value, field) {
  if (typeof value !== "string" || value.length === 0) {
    metadataError(field, "must be a non-empty string");
  }
  return value;
}
function readString(value, field) {
  if (typeof value !== "string") {
    metadataError(field, "must be a string");
  }
  return value;
}
function readFiniteNumber(value, field) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    metadataError(field, "must be a finite number");
  }
  return value;
}
function readBoolean(value, field) {
  if (typeof value !== "boolean") {
    metadataError(field, "must be boolean");
  }
  return value;
}
function readPositiveInteger(value, field) {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    metadataError(field, "must be a positive integer");
  }
  return value;
}
function readNonNegativeInteger(value, field) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    metadataError(field, "must be a non-negative integer");
  }
  return value;
}
function readRateSpec(value, field) {
  if (value === void 0) return void 0;
  if (typeof value === "number") return readFiniteNumber(value, field);
  const lane = readRecord(value, field);
  if (!Array.isArray(lane.points)) {
    metadataError(`${field}.points`, "must be an array");
  }
  return lane;
}
function readVideoMetadata(value, field) {
  const record = readRecord(value, field);
  let colorSpace = null;
  if (record.colorSpace !== null) {
    const color = readRecord(record.colorSpace, `${field}.colorSpace`);
    colorSpace = {
      colorTransfer: readString(color.colorTransfer, `${field}.colorSpace.colorTransfer`),
      colorPrimaries: readString(color.colorPrimaries, `${field}.colorSpace.colorPrimaries`),
      colorSpace: readString(color.colorSpace, `${field}.colorSpace.colorSpace`)
    };
  }
  return {
    durationSeconds: readFiniteNumber(record.durationSeconds, `${field}.durationSeconds`),
    videoStreamDurationSeconds: readFiniteNumber(
      record.videoStreamDurationSeconds,
      `${field}.videoStreamDurationSeconds`
    ),
    // Plans written before stream-start metadata existed implicitly used the
    // overwhelmingly common start-at-zero domain. Preserve that compatibility
    // while carrying non-zero edit-list/transport timestamps in new plans.
    videoStreamStartSeconds: record.videoStreamStartSeconds === void 0 ? 0 : readFiniteNumber(record.videoStreamStartSeconds, `${field}.videoStreamStartSeconds`),
    width: readPositiveInteger(record.width, `${field}.width`),
    height: readPositiveInteger(record.height, `${field}.height`),
    fps: readFiniteNumber(record.fps, `${field}.fps`),
    videoCodec: readNonEmptyString(record.videoCodec, `${field}.videoCodec`),
    hasAudio: readBoolean(record.hasAudio, `${field}.hasAudio`),
    isVFR: readBoolean(record.isVFR, `${field}.isVFR`),
    hasAlpha: readBoolean(record.hasAlpha, `${field}.hasAlpha`),
    colorSpace
  };
}
function parsePlanVideosJson(value) {
  const record = readRecord(value, "meta/videos.json");
  if (!Array.isArray(record.videos) || !Array.isArray(record.extracted)) {
    metadataError("meta/videos.json", "must contain videos and extracted arrays");
  }
  const videos = record.videos.map((value2, index) => {
    const field = `meta/videos.json.videos[${index}]`;
    const video = readRecord(value2, field);
    return {
      id: readNonEmptyString(video.id, `${field}.id`),
      src: readNonEmptyString(video.src, `${field}.src`),
      start: readFiniteNumber(video.start, `${field}.start`),
      end: readFiniteNumber(video.end, `${field}.end`),
      mediaStart: readFiniteNumber(video.mediaStart, `${field}.mediaStart`),
      playbackRate: readRateSpec(video.playbackRate, `${field}.playbackRate`),
      loop: readBoolean(video.loop, `${field}.loop`),
      hasAudio: readBoolean(video.hasAudio, `${field}.hasAudio`)
    };
  });
  const extracted = record.extracted.map((value2, index) => {
    const field = `meta/videos.json.extracted[${index}]`;
    const entry = readRecord(value2, field);
    return {
      videoId: readNonEmptyString(entry.videoId, `${field}.videoId`),
      srcPath: readNonEmptyString(entry.srcPath, `${field}.srcPath`),
      framePattern: readNonEmptyString(entry.framePattern, `${field}.framePattern`),
      fps: readFiniteNumber(entry.fps, `${field}.fps`),
      totalFrames: readNonNegativeInteger(entry.totalFrames, `${field}.totalFrames`),
      metadata: readVideoMetadata(entry.metadata, `${field}.metadata`)
    };
  });
  const videoIds = /* @__PURE__ */ new Set();
  for (const video of videos) {
    if (videoIds.has(video.id)) {
      metadataError("meta/videos.json.videos", `contains duplicate id ${JSON.stringify(video.id)}`);
    }
    videoIds.add(video.id);
  }
  const extractedIds = /* @__PURE__ */ new Set();
  for (const entry of extracted) {
    if (extractedIds.has(entry.videoId)) {
      metadataError(
        "meta/videos.json.extracted",
        `contains duplicate videoId ${JSON.stringify(entry.videoId)}`
      );
    }
    extractedIds.add(entry.videoId);
    if (!videoIds.has(entry.videoId)) {
      metadataError(
        "meta/videos.json.extracted",
        `references undeclared video ${JSON.stringify(entry.videoId)}`
      );
    }
  }
  for (const video of videos) {
    if (!extractedIds.has(video.id)) {
      metadataError(
        "meta/videos.json.extracted",
        `is missing declared video ${JSON.stringify(video.id)}`
      );
    }
  }
  return { videos, extracted };
}
function buildPlanVideosJson(input) {
  const videos = input.videos.map((video, index) => {
    if (Number.isFinite(video.end)) return { ...video };
    if (!Number.isFinite(input.compositionEnd) || input.compositionEnd <= 0 || input.compositionEnd <= video.start) {
      metadataError(
        `meta/videos.json.videos[${index}].end`,
        "cannot be resolved without a finite composition end after its start"
      );
    }
    return { ...video, end: input.compositionEnd };
  });
  return parsePlanVideosJson({ videos, extracted: input.extracted });
}
var execFile = promisify2(execFileCallback);
var cachedFfmpegVersions = /* @__PURE__ */ new Map();
async function readFfmpegVersion() {
  const binary = getFfmpegBinary();
  const cached = cachedFfmpegVersions.get(binary);
  if (cached !== void 0) return cached;
  let stdout;
  try {
    ({ stdout } = await execFile(binary, ["-version"], {
      maxBuffer: 1024 * 1024,
      // See runFfmpeg.ts: keeps a console window off the user's desktop on Windows.
      windowsHide: true
    }));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    throw Object.assign(
      new Error(`ffmpeg not found at "${binary}": install FFmpeg or set HYPERFRAMES_FFMPEG_PATH.`, {
        cause: error
      }),
      { code: "ENOENT" }
    );
  }
  const firstLine = stdout.split(/\r?\n/)[0]?.trim() ?? "";
  if (!firstLine) {
    throw new Error("ffmpeg -version returned empty output");
  }
  cachedFfmpegVersions.set(binary, firstLine);
  return firstLine;
}
function buildSyntheticRenderJob(input) {
  const renderConfig = {
    fps: input.fps,
    quality: input.quality,
    format: input.format,
    crf: input.crf,
    videoBitrate: input.bitrate,
    videoFrameFormat: input.videoFrameFormat,
    outputResolution: input.outputResolution,
    outputResolutionAspectAgnostic: input.outputResolutionAspectAgnostic,
    // Distributed mode hard-pins to software GPU. The plan-time validator
    // refuses to fan out otherwise.
    useGpu: false,
    debug: false,
    entryFile: input.entryFile,
    logger: input.logger ?? defaultLogger,
    hdrMode: input.hdrMode,
    strictness: input.strictness,
    producerConfig: input.producerConfig,
    variables: input.variables
  };
  return createRenderJob(renderConfig);
}
var cachedProducerVersion = null;
function readProducerVersion() {
  if (cachedProducerVersion !== null) return cachedProducerVersion;
  const startDir = dirname12(fileURLToPath6(import.meta.url));
  let current = startDir;
  for (let i = 0; i < 10; i++) {
    const candidate = join30(current, "package.json");
    if (existsSync20(candidate)) {
      try {
        const pkg = JSON.parse(readFileSync10(candidate, "utf-8"));
        if (pkg.name === "@hyperframes/producer" && typeof pkg.version === "string") {
          cachedProducerVersion = pkg.version;
          return pkg.version;
        }
      } catch {
      }
    }
    const parent = dirname12(current);
    if (parent === current) break;
    current = parent;
  }
  cachedProducerVersion = "0.0.0-unknown";
  return cachedProducerVersion;
}

// ../producer/src/services/distributed/planSize.ts
import { createHash as createHash6 } from "crypto";
import { lstatSync as lstatSync2, readdirSync as readdirSync7 } from "fs";
import { extname as extname4, join as join31, relative as relative5 } from "path";
var MAX_TOP_COMPONENTS = 10;
var SOURCE_MEDIA_EXTENSIONS = /* @__PURE__ */ new Set([
  ".aac",
  ".aiff",
  ".avi",
  ".flac",
  ".m4a",
  ".m4v",
  ".mkv",
  ".mov",
  ".mp3",
  ".mp4",
  ".mpeg",
  ".mpg",
  ".ogg",
  ".ogv",
  ".ts",
  ".wav",
  ".webm"
]);
var PLAN_ROOT_CATEGORY = {
  compiled: "compiled",
  [PLAN_AUDIO_RELATIVE_PATH]: "audio",
  meta: "metadata",
  "plan.json": "metadata"
};
function hashComponent(value) {
  return createHash6("sha256").update(value).digest("hex").slice(0, 12);
}
function classifyFile(segments, rootKind) {
  const rootName = segments[0] ?? "";
  const extractedRootName = rootKind === "compiled" ? "__hyperframes_video_frames" : "video-frames";
  if (rootName === extractedRootName) {
    const videoKey = segments[1] ?? "unknown";
    return {
      category: "video-frames",
      componentLabel: `video-frames:${hashComponent(videoKey)}`
    };
  }
  const category = rootKind === "compiled" ? "compiled" : PLAN_ROOT_CATEGORY[rootName] ?? "other";
  return { category, componentLabel: category };
}
function emptyBreakdown() {
  return {
    totalBytes: 0,
    fileCount: 0,
    compiledBytes: 0,
    sourceMediaBytes: 0,
    videoFramesBytes: 0,
    videoFrameFileCount: 0,
    audioBytes: 0,
    metadataBytes: 0,
    otherBytes: 0,
    topComponents: []
  };
}
function addCategoryBytes(result, category, filePath, sizeBytes) {
  if (category === "compiled") {
    result.compiledBytes += sizeBytes;
    if (SOURCE_MEDIA_EXTENSIONS.has(extname4(filePath).toLowerCase())) {
      result.sourceMediaBytes += sizeBytes;
    }
    return;
  }
  if (category === "video-frames") {
    result.videoFramesBytes += sizeBytes;
    result.videoFrameFileCount += 1;
    return;
  }
  if (category === "audio") {
    result.audioBytes += sizeBytes;
    return;
  }
  if (category === "metadata") {
    result.metadataBytes += sizeBytes;
    return;
  }
  result.otherBytes += sizeBytes;
}
function recordFile(result, components, rootDir, rootKind, filePath) {
  let sizeBytes;
  try {
    const stat = lstatSync2(filePath);
    if (!stat.isFile()) return;
    sizeBytes = stat.size;
  } catch {
    return;
  }
  const rel = relative5(rootDir, filePath);
  const segments = rel.split(/[\\/]+/).filter(Boolean);
  const classified = classifyFile(segments, rootKind);
  result.totalBytes += sizeBytes;
  result.fileCount += 1;
  addCategoryBytes(result, classified.category, filePath, sizeBytes);
  const component = components.get(classified.componentLabel) ?? {
    label: classified.componentLabel,
    sizeBytes: 0,
    fileCount: 0
  };
  component.sizeBytes += sizeBytes;
  component.fileCount += 1;
  components.set(classified.componentLabel, component);
}
function walkRegularFiles(dir, visit) {
  let entries;
  try {
    entries = readdirSync7(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join31(dir, entry.name);
    if (entry.isDirectory()) {
      walkRegularFiles(full, visit);
    } else if (entry.isFile()) {
      visit(full);
    }
  }
}
function measurePlanSizeBreakdown(rootDir, rootKind = "plan") {
  const result = emptyBreakdown();
  const components = /* @__PURE__ */ new Map();
  walkRegularFiles(
    rootDir,
    (filePath) => recordFile(result, components, rootDir, rootKind, filePath)
  );
  result.topComponents = [...components.values()].sort((a, b) => b.sizeBytes - a.sizeBytes || a.label.localeCompare(b.label)).slice(0, MAX_TOP_COMPONENTS);
  return result;
}

// ../producer/src/services/distributed/plan.ts
function applyDistributedAudioWarningPolicy(job, audioError, audioFailures = [], log = defaultLogger) {
  const failureOwner = audioFailures.length === 0 ? void 0 : audioFailures.some((failure) => failure.owner === "system") ? "system" : "user";
  const retryable = audioFailures.length === 0 ? void 0 : audioFailures.every((failure) => failure.retryable);
  applyRenderWarningPolicy(
    job,
    [
      {
        code: "audio_processing_failed",
        message: `Audio mix failed; output would be video-only: ${audioError}`,
        details: {
          mediaType: "audio",
          failureReasons: [...new Set(audioFailures.map((failure) => failure.reason))],
          failureStages: [...new Set(audioFailures.map((failure) => failure.stage))],
          failureOwner,
          retryable
        }
      }
    ],
    log
  );
}
var PLAN_PROJECT_DIR_SKIP_SEGMENTS = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  ".cache",
  "output",
  "failures",
  "dist",
  ".next",
  ".turbo"
]);
var DEFAULT_MAX_PARALLEL_CHUNKS = 16;
var MIN_CHUNK_SIZE = 10;
var PLAN_DIR_SIZE_LIMIT_BYTES = 2 * 1024 * 1024 * 1024;
var PLAN_TOO_LARGE = "PLAN_TOO_LARGE";
var PlanTooLargeError = class extends Error {
  code = PLAN_TOO_LARGE;
  sizeBytes;
  limitBytes;
  breakdown;
  observedAt;
  constructor(sizeBytes, limitBytes, breakdown, observedAt) {
    const breakdownSuffix = breakdown ? ` Breakdown: video-frames=${formatBytes(breakdown.videoFramesBytes)}, compiled=${formatBytes(breakdown.compiledBytes)} (source-media=${formatBytes(breakdown.sourceMediaBytes)}), audio=${formatBytes(breakdown.audioBytes)}, metadata=${formatBytes(breakdown.metadataBytes)}, other=${formatBytes(breakdown.otherBytes)}, files=${breakdown.fileCount}.` : "";
    const observationSuffix = observedAt ? ` Observed at ${observedAt}.` : "";
    super(
      `[plan] planDir size ${formatBytes(sizeBytes)} exceeds the configured ceiling ${formatBytes(limitBytes)} (PLAN_TOO_LARGE). The default 2 GB cap fits inside AWS Lambda's 10 GB /tmp budget alongside the chunk worker's frame buffer and ffmpeg's working set. To unblock: use the content-addressed \`planV2()\` transport, shorten the composition, lower the framerate, or use the in-process renderer (\`executeRenderJob\`) \u2014 it has no planDir size cap.` + observationSuffix + breakdownSuffix
    );
    this.name = "PlanTooLargeError";
    this.sizeBytes = sizeBytes;
    this.limitBytes = limitBytes;
    this.breakdown = breakdown;
    this.observedAt = observedAt;
  }
};
var FORMAT_NOT_SUPPORTED_IN_DISTRIBUTED = "FORMAT_NOT_SUPPORTED_IN_DISTRIBUTED";
var FormatNotSupportedInDistributedError = class extends Error {
  // fallow-ignore-next-line unused-class-member
  code = FORMAT_NOT_SUPPORTED_IN_DISTRIBUTED;
  format;
  reason;
  constructor(format, reason) {
    super(
      `[plan] format ${JSON.stringify(format)} is not supported in distributed mode: ${reason}. Render with the in-process renderer (\`executeRenderJob\`) \u2014 it has full format support \u2014 or pick a distributed-supported format: mp4 SDR, mov ProRes 4444, png-sequence, or webm VP9.`
    );
    this.name = "FormatNotSupportedInDistributedError";
    this.format = format;
    this.reason = reason;
  }
};
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GiB`;
}
function rejectUnsupportedDistributedFormat(config) {
  if (config.hdrMode === "force-hdr") {
    throw new FormatNotSupportedInDistributedError(
      "mp4-hdr",
      "HDR (PQ / HLG) requires per-source HDR pre-extract + HDR signaling re-apply on the assembled file; neither is implemented for the distributed pipeline"
    );
  }
}
function assertPlanSizeWithinLimit(input) {
  const breakdown = measurePlanSizeBreakdown(input.rootDir, input.rootKind);
  if (breakdown.totalBytes <= input.limitBytes) return breakdown;
  input.log.warn("[plan] size budget exceeded", {
    observedAt: input.observedAt,
    sizeBytes: breakdown.totalBytes,
    limitBytes: input.limitBytes,
    fileCount: breakdown.fileCount,
    compiledBytes: breakdown.compiledBytes,
    sourceMediaBytes: breakdown.sourceMediaBytes,
    videoFramesBytes: breakdown.videoFramesBytes,
    videoFrameFileCount: breakdown.videoFrameFileCount,
    audioBytes: breakdown.audioBytes,
    metadataBytes: breakdown.metadataBytes,
    otherBytes: breakdown.otherBytes,
    topComponents: breakdown.topComponents
  });
  throw new PlanTooLargeError(breakdown.totalBytes, input.limitBytes, breakdown, input.observedAt);
}
function resolveChunkPlan(totalFrames, configChunkSize, maxParallelChunks, targetChunkFrames) {
  assertPositiveInteger2("totalFrames", totalFrames);
  assertPositiveInteger2("maxParallelChunks", maxParallelChunks);
  if (configChunkSize !== void 0) {
    assertPositiveInteger2("configChunkSize", configChunkSize);
  }
  if (targetChunkFrames !== void 0) {
    assertPositiveInteger2("targetChunkFrames", targetChunkFrames);
  }
  const autoSizeParallel = targetChunkFrames === void 0 ? maxParallelChunks : Math.min(maxParallelChunks, Math.max(1, Math.ceil(totalFrames / targetChunkFrames)));
  const resolvedChunkSize = configChunkSize ?? Math.max(MIN_CHUNK_SIZE, Math.ceil(totalFrames / autoSizeParallel));
  const naiveCount = Math.ceil(totalFrames / resolvedChunkSize);
  const chunkCount = Math.min(maxParallelChunks, Math.max(1, naiveCount));
  const effectiveChunkSize = Math.max(resolvedChunkSize, Math.ceil(totalFrames / chunkCount));
  const tightChunkCount = Math.min(chunkCount, Math.ceil(totalFrames / effectiveChunkSize));
  return { chunkCount: tightChunkCount, effectiveChunkSize };
}
function assertPositiveInteger2(name, value) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `[plan] resolveChunkPlan: ${name} must be a positive integer (received ${String(value)})`
    );
  }
}
var FREEZE_OWNED_PLAN_FILES = [
  "plan.json",
  join32("meta", "composition.json"),
  join32("meta", "encoder.json"),
  join32("meta", "chunks.json")
];
function removeFreezeOwnedPlanFiles(planDir) {
  for (const relativePath of FREEZE_OWNED_PLAN_FILES) {
    rmSync10(join32(planDir, relativePath), { force: true });
  }
}
function buildChunkSlices(totalFrames, chunkCount, effectiveChunkSize) {
  const slices = [];
  for (let i = 0; i < chunkCount; i++) {
    const startFrame = i * effectiveChunkSize;
    const endFrame = i === chunkCount - 1 ? totalFrames : Math.min(totalFrames, startFrame + effectiveChunkSize);
    slices.push({ index: i, startFrame, endFrame });
  }
  return slices;
}
async function readFontSnapshotSha() {
  const module = await import("./fontData.generated-NXAOI4GH.js");
  const data = module.EMBEDDED_FONT_DATA;
  if (!data || typeof data !== "object") {
    throw new Error(
      "[plan] EMBEDDED_FONT_DATA missing from @hyperframes/core/fonts/embedded-data \u2014 was `bun run build:fonts` run?"
    );
  }
  const dataObj = data;
  const fingerprint = {};
  for (const key of Object.keys(dataObj).sort()) {
    const value = dataObj[key];
    fingerprint[key] = typeof value === "string" ? value.length : JSON.stringify(value ?? null).length;
  }
  return sha256Hex(canonicalJsonStringify(fingerprint));
}
function buildLockedRenderConfig(input) {
  const { config, forceScreenshot, deviceScaleFactor, ffmpegVersion } = input;
  const { encoder, pixelFormat, preset } = resolveEncoderTriple(config);
  const locksVp9CpuUsed = encoder === "libvpx-vp9-software" ? { vp9CpuUsed: normalizeVp9CpuUsed(input.engineConfig.vp9CpuUsed) } : {};
  return {
    captureMode: forceScreenshot ? "screenshot" : "beginframe",
    forceScreenshot,
    deviceScaleFactor,
    useLayeredHdrComposite: false,
    browserGpuMode: "software",
    // Match `LOCKED_WARMUP_TICKS` in `frameCapture.ts` — kept as a literal so
    // a worker that ships a different value will trip `PLAN_HASH_MISMATCH`
    // (the locked config flows into planHash via the canonical JSON).
    warmupTicks: 60,
    encoder,
    quality: config.quality ?? "standard",
    ffmpegVersion,
    preset,
    crf: config.crf,
    bitrate: config.bitrate,
    ...locksVp9CpuUsed,
    // GOP === chunkSize so every chunk's first frame is an IDR keyframe and
    // ffmpeg concat-copy round-trips losslessly.
    gopSize: input.effectiveChunkSize,
    closedGop: true,
    forceKeyframes: "n=0",
    pixelFormat,
    chunkSize: input.effectiveChunkSize,
    chunkCount: input.chunkCount,
    runtimeEnv: input.runtimeEnv,
    variables: config.variables
  };
}
function resolveEncoderTriple(config) {
  if (config.format === "mp4") {
    return resolveMp4EncoderTriple(config.codec);
  }
  if (config.codec !== void 0) {
    throw new Error(
      `[plan] DistributedRenderConfig.codec is only valid for format="mp4"; received codec=${JSON.stringify(config.codec)} with format=${JSON.stringify(config.format)}. Omit codec for non-mp4 formats \u2014 mov is always ProRes 4444, webm is always libvpx-vp9, and png-sequence has no encoder.`
    );
  }
  return resolveNonMp4EncoderTriple(config.format, config.quality ?? "standard");
}
function resolveMp4EncoderTriple(codec) {
  const c = codec ?? "h264";
  if (c !== "h264" && c !== "h265") {
    throw new Error(
      `[plan] DistributedRenderConfig.codec must be "h264" or "h265" for format="mp4"; received ${JSON.stringify(c)}. Omit codec to default to h264.`
    );
  }
  if (c === "h265") {
    return { encoder: "libx265-software", pixelFormat: "yuv420p", preset: "medium" };
  }
  return { encoder: "libx264-software", pixelFormat: "yuv420p", preset: "medium" };
}
function resolveNonMp4EncoderTriple(format, quality) {
  if (format === "mov") {
    return { encoder: "prores-software", pixelFormat: "yuva444p10le", preset: "4444" };
  }
  if (format === "webm") {
    const enginePreset = getEncoderPreset(quality, "webm");
    return {
      encoder: "libvpx-vp9-software",
      pixelFormat: enginePreset.pixelFormat,
      preset: enginePreset.preset
    };
  }
  return { encoder: "png-sequence", pixelFormat: "rgba", preset: "lossless" };
}
function resolveDistributedEngineConfig(config) {
  return {
    ...config.producerConfig ?? config.engineConfig ?? resolveConfig(),
    browserGpuMode: "software",
    forceScreenshot: false,
    // Distributed rendering deliberately opts into deterministic BeginFrame
    // on Linux SwiftShader. Preserve the provenance bit consumed by the
    // engine's software-GPU screenshot clamp; assigning the boolean alone
    // loses the distinction between a default false and this explicit opt-out.
    forceScreenshotExplicitlyOptedOut: true
  };
}
async function buildLocalExecutionPlan(projectDir, config, executionPlanDir, options = {}) {
  const planDir = executionPlanDir;
  rejectUnsupportedDistributedFormat(config);
  validateNoGpuEncode({
    useGpu: false,
    browserGpuMode: "software"
  });
  if (!existsSync21(planDir)) mkdirSync11(planDir, { recursive: true });
  const log = config.logger ?? defaultLogger;
  const sizeLimitBytes = options.executionPlanSizeLimitBytes ?? config.planDirSizeLimitBytes ?? PLAN_DIR_SIZE_LIMIT_BYTES;
  const abortSignal = config.abortSignal;
  const assertNotAborted = () => {
    if (abortSignal?.aborted) {
      throw new Error("[plan] render_cancelled");
    }
  };
  const cfg = resolveDistributedEngineConfig(config);
  const job = buildSyntheticRenderJob({
    fps: { num: config.fps, den: 1 },
    quality: config.quality ?? "standard",
    format: config.format,
    crf: config.crf,
    bitrate: config.bitrate,
    videoFrameFormat: config.videoFrameFormat,
    outputResolution: config.outputResolution,
    outputResolutionAspectAgnostic: config.outputResolutionAspectAgnostic,
    // HDR is banned in distributed mode. force-sdr keeps the
    // extract / encoder paths off the HDR branches entirely.
    hdrMode: config.hdrMode ?? "force-sdr",
    strictness: config.strictness,
    entryFile: config.entryFile ?? "index.html",
    logger: config.logger,
    producerConfig: cfg,
    variables: config.variables
  });
  const entryFile = config.entryFile ?? "index.html";
  const htmlPath = join32(projectDir, entryFile);
  if (!existsSync21(htmlPath)) {
    throw new Error(`[plan] entry file not found: ${htmlPath}`);
  }
  const workDir = join32(planDir, ".plan-work");
  rmSync10(workDir, { recursive: true, force: true });
  mkdirSync11(workDir, { recursive: true });
  const compiledDir = join32(workDir, "compiled");
  mkdirSync11(compiledDir, { recursive: true });
  cpSync2(projectDir, compiledDir, {
    recursive: true,
    dereference: true,
    filter: (src) => {
      const rel = relative6(projectDir, src);
      if (rel === "" || rel.startsWith("..")) return true;
      const firstSegment = rel.split(sep3, 1)[0];
      return firstSegment === void 0 || !PLAN_PROJECT_DIR_SKIP_SEGMENTS.has(firstSegment);
    }
  });
  const finalCompiledDir = join32(planDir, "compiled");
  const needsAlpha = outputNeedsAlpha(config.format);
  const compileResult = await runCompileStage({
    projectDir,
    workDir,
    htmlPath,
    entryFile,
    job,
    cfg,
    needsAlpha,
    log,
    assertNotAborted,
    abortSignal,
    // Distributed renders fail closed on font-fetch errors so the planDir
    // is content-addressed against deterministic fonts only.
    failClosedFontFetch: config.failClosedFontFetch !== false,
    // Distributed renders must not capture host-specific system fonts —
    // the Lambda/worker filesystem won't have the same fonts installed.
    allowSystemFontCapture: false,
    variables: config.variables
  });
  let compiled = compileResult.compiled;
  const composition = compileResult.composition;
  const { deviceScaleFactor } = compileResult;
  let forceScreenshot = compileResult.forceScreenshot;
  if (cfg.lowMemoryMode) forceScreenshot = true;
  const { width, height } = composition;
  if (config.rejectOnSystemFonts !== false) {
    validateNoSystemFonts(compiled.html);
  }
  const probeResult = await runProbeStage({
    projectDir,
    workDir,
    job,
    cfg,
    forceScreenshot,
    log,
    assertNotAborted,
    abortSignal,
    compiled,
    composition,
    width,
    height,
    needsAlpha,
    deviceScaleFactor
  });
  compiled = probeResult.compiled;
  job.duration = probeResult.duration;
  job.totalFrames = probeResult.totalFrames;
  const totalFrames = probeResult.totalFrames;
  validateDistributedDuration({
    duration: probeResult.duration,
    totalFrames,
    fps: fpsToNumber(job.config.fps)
  });
  if (probeResult.fileServer) closeFileServerSafely(probeResult.fileServer, "plan", log);
  if (probeResult.probeSession) {
    try {
      const { closeCaptureSession: closeCaptureSession2 } = await import("./src-2CXRYIST.js");
      await closeCaptureSession2(probeResult.probeSession);
    } catch (err) {
      log.warn("[plan] probe session close failed", {
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }
  assertPlanSizeWithinLimit({
    rootDir: compiledDir,
    rootKind: "compiled",
    limitBytes: sizeLimitBytes,
    observedAt: "pre-extract",
    log
  });
  const extractResult = await runExtractVideosStage({
    projectDir,
    compiledDir,
    job,
    cfg,
    composition,
    abortSignal,
    assertNotAborted,
    materializeSymlinks: true
  });
  if (extractResult.failureToEnforce) throw extractResult.failureToEnforce;
  if (extractResult.extractionResult) {
    assertVideoExtractionSucceeded(extractResult.extractionResult);
  }
  const audioResult = await runAudioStage({
    projectDir,
    workDir,
    compiledDir,
    duration: job.duration,
    ffmpegProcessTimeout: cfg.ffmpegProcessTimeout,
    audioGain: cfg.audioGain,
    audios: composition.audios,
    abortSignal,
    assertNotAborted
  });
  if (audioResult.audioError) {
    applyDistributedAudioWarningPolicy(job, audioResult.audioError, audioResult.audioFailures, log);
  }
  const stagedVideoFrames = join32(compiledDir, "__hyperframes_video_frames");
  const videoFramesDst = join32(planDir, "video-frames");
  if (existsSync21(videoFramesDst)) rmSync10(videoFramesDst, { recursive: true, force: true });
  if (existsSync21(stagedVideoFrames)) {
    renameSync4(stagedVideoFrames, videoFramesDst);
  } else {
    mkdirSync11(videoFramesDst, { recursive: true });
  }
  if (existsSync21(finalCompiledDir)) rmSync10(finalCompiledDir, { recursive: true, force: true });
  renameSync4(compiledDir, finalCompiledDir);
  const planVideosJson = buildPlanVideosJson({
    videos: composition.videos,
    compositionEnd: job.duration ?? Number.NaN,
    extracted: (extractResult.extractionResult?.extracted ?? []).map((ext) => ({
      videoId: ext.videoId,
      srcPath: ext.srcPath,
      framePattern: ext.framePattern,
      fps: ext.fps,
      totalFrames: ext.totalFrames,
      metadata: ext.metadata
    }))
  });
  mkdirSync11(join32(planDir, "meta"), { recursive: true });
  writeFileSync8(
    join32(planDir, PLAN_VIDEOS_META_RELATIVE_PATH),
    JSON.stringify(planVideosJson, null, 2),
    "utf-8"
  );
  const planAudioPath = join32(planDir, PLAN_AUDIO_RELATIVE_PATH);
  if (audioResult.hasAudio && existsSync21(audioResult.audioOutputPath)) {
    renameSync4(audioResult.audioOutputPath, planAudioPath);
  }
  const maxParallel = config.maxParallelChunks ?? DEFAULT_MAX_PARALLEL_CHUNKS;
  const { chunkCount, effectiveChunkSize } = resolveChunkPlan(
    totalFrames,
    config.chunkSize,
    maxParallel,
    config.targetChunkFrames
  );
  const chunks = buildChunkSlices(totalFrames, chunkCount, effectiveChunkSize);
  const ffmpegVersion = await readFfmpegVersion();
  const producerVersion = readProducerVersion();
  const fontSnapshotSha = await readFontSnapshotSha();
  const runtimeEnv = snapshotRuntimeEnv();
  const lockedConfig = buildLockedRenderConfig({
    config,
    forceScreenshot,
    deviceScaleFactor,
    ffmpegVersion,
    engineConfig: cfg,
    effectiveChunkSize,
    chunkCount,
    runtimeEnv
  });
  const compositionJson = {
    durationSeconds: job.duration ?? 0,
    width,
    height,
    fps: job.config.fps,
    videoCount: composition.videos.length,
    audioCount: composition.audios.length,
    imageCount: composition.images.length
  };
  const dimensions = {
    fpsNum: config.fps,
    fpsDen: 1,
    width,
    height,
    format: config.format
  };
  try {
    rmSync10(workDir, { recursive: true, force: true });
  } catch (err) {
    log.warn("[plan] failed to remove temp work dir", {
      workDir,
      error: err instanceof Error ? err.message : String(err)
    });
  }
  removeFreezeOwnedPlanFiles(planDir);
  assertPlanSizeWithinLimit({
    rootDir: planDir,
    rootKind: "plan",
    limitBytes: sizeLimitBytes,
    observedAt: "pre-freeze",
    log
  });
  const freezeResult = await freezePlan({
    planDir,
    composition: compositionJson,
    encoder: lockedConfig,
    chunks,
    dimensions,
    producerVersion,
    fontSnapshotSha,
    durationSeconds: job.duration ?? 0,
    totalFrames,
    hasAudio: audioResult.hasAudio
  });
  const planHash = freezeResult.planHash;
  assertPlanSizeWithinLimit({
    rootDir: planDir,
    rootKind: "plan",
    limitBytes: sizeLimitBytes,
    observedAt: "post-freeze",
    log
  });
  return {
    executionPlanDir: planDir,
    executionPlanHash: planHash,
    chunkCount,
    totalFrames,
    fps: config.fps,
    width,
    height,
    format: config.format,
    ffmpegVersion,
    producerVersion
  };
}
async function plan(projectDir, config, planDir) {
  const executionPlan = await buildLocalExecutionPlan(projectDir, config, planDir);
  return {
    planDir: executionPlan.executionPlanDir,
    planProtocol: PLAN_PROTOCOL_V1,
    planHash: executionPlan.executionPlanHash,
    chunkCount: executionPlan.chunkCount,
    totalFrames: executionPlan.totalFrames,
    fps: executionPlan.fps,
    width: executionPlan.width,
    height: executionPlan.height,
    format: executionPlan.format,
    ffmpegVersion: executionPlan.ffmpegVersion,
    producerVersion: executionPlan.producerVersion
  };
}

// ../producer/src/services/distributed/planV2.ts
import {
  closeSync as closeSync6,
  copyFileSync as copyFileSync5,
  existsSync as existsSync23,
  lstatSync as lstatSync3,
  mkdirSync as mkdirSync13,
  mkdtempSync as mkdtempSync6,
  openSync as openSync5,
  readFileSync as readFileSync11,
  readSync as readSync3,
  readdirSync as readdirSync8,
  renameSync as renameSync6,
  rmSync as rmSync12,
  statSync as statSync9,
  writeFileSync as writeFileSync10
} from "fs";
import { createHash as createHash7 } from "crypto";
import { tmpdir as tmpdir4 } from "os";
import { dirname as dirname14, isAbsolute as isAbsolute3, join as join35, relative as relative7, resolve as resolve10, sep as sep4 } from "path";

// ../producer/src/services/distributed/planV2Publisher.ts
import {
  copyFileSync as copyFileSync4,
  existsSync as existsSync22,
  linkSync,
  mkdirSync as mkdirSync12,
  mkdtempSync as mkdtempSync5,
  renameSync as renameSync5,
  rmSync as rmSync11,
  statSync as statSync8,
  writeFileSync as writeFileSync9
} from "fs";
import { dirname as dirname13, join as join34 } from "path";

// ../producer/src/services/distributed/planV2Errors.ts
var PLAN_V2_INTEGRITY_UNRECOVERABLE = "PLAN_V2_INTEGRITY_UNRECOVERABLE";
var PlanV2IntegrityError = class extends Error {
  // Public adapters inspect this typed code even though OSS producer does not.
  // fallow-ignore-next-line unused-class-member
  code = PLAN_V2_INTEGRITY_UNRECOVERABLE;
  constructor(message) {
    super(`[planV2] ${message}`);
    this.name = "PlanV2IntegrityError";
  }
};

// ../producer/src/services/distributed/planV2Layout.ts
import { join as join33 } from "path";
var SHA256_PATTERN = /^[0-9a-f]{64}$/;
function assertPlanV2Sha256(value, field) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    throw new PlanV2IntegrityError(`${field} must be a lowercase sha256 digest`);
  }
  return value;
}
function planV2BlobPath(root, sha256) {
  const digest = assertPlanV2Sha256(sha256, "artifact sha256");
  return join33(root, "artifacts", "sha256", digest.slice(0, 2), digest);
}

// ../producer/src/services/distributed/planV2Publisher.ts
function canFallbackToCopy(error) {
  if (!(error instanceof Error) || !("code" in error)) return false;
  const code = error.code;
  return code === "EXDEV" || code === "EPERM" || code === "EACCES" || code === "ENOTSUP";
}
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function manifestDigests(manifestBytes) {
  let value;
  try {
    value = JSON.parse(manifestBytes);
  } catch {
    throw new PlanV2IntegrityError("manifest publisher received invalid JSON");
  }
  if (!isRecord2(value) || !Array.isArray(value.artifacts)) {
    throw new PlanV2IntegrityError("manifest publisher requires an artifacts array");
  }
  return value.artifacts.map((artifact, index) => {
    if (!isRecord2(artifact)) {
      throw new PlanV2IntegrityError(`manifest artifacts[${index}] must be an object`);
    }
    return assertPlanV2Sha256(artifact.sha256, `manifest artifacts[${index}].sha256`);
  });
}
var LocalPlanV2ArtifactPublisher = class {
  destinationDir;
  temporaryDir;
  #linkFile;
  #committed = false;
  constructor(destinationDir, options = {}) {
    if (existsSync22(destinationDir)) {
      throw new PlanV2IntegrityError(`output directory already exists: ${destinationDir}`);
    }
    this.destinationDir = destinationDir;
    this.#linkFile = options.linkFile ?? linkSync;
    mkdirSync12(dirname13(destinationDir), { recursive: true });
    this.temporaryDir = mkdtempSync5(join34(dirname13(destinationDir), ".plan-v2-publish-"));
  }
  async putBlob(blob) {
    const digest = assertPlanV2Sha256(blob.sha256, "published blob sha256");
    const sourceSize = statSync8(blob.sourcePath).size;
    if (sourceSize !== blob.sizeBytes) {
      throw new PlanV2IntegrityError(
        `published blob size changed for ${digest}: expected ${blob.sizeBytes}, got ${sourceSize}`
      );
    }
    const destinationPath = planV2BlobPath(this.temporaryDir, digest);
    if (existsSync22(destinationPath)) return;
    mkdirSync12(dirname13(destinationPath), { recursive: true });
    const stagingDir = mkdtempSync5(join34(dirname13(destinationPath), ".plan-v2-blob-"));
    const temporaryPath = join34(stagingDir, "blob");
    try {
      try {
        this.#linkFile(blob.sourcePath, temporaryPath);
      } catch (error) {
        if (!canFallbackToCopy(error)) throw error;
        copyFileSync4(blob.sourcePath, temporaryPath);
      }
      renameSync5(temporaryPath, destinationPath);
    } finally {
      rmSync11(stagingDir, { recursive: true, force: true });
    }
  }
  async commitManifest(manifestBytes) {
    for (const digest of new Set(manifestDigests(manifestBytes))) {
      if (!existsSync22(planV2BlobPath(this.temporaryDir, digest))) {
        throw new PlanV2IntegrityError(
          `cannot commit manifest before referenced blob is durable: ${digest}`
        );
      }
    }
    writeFileSync9(join34(this.temporaryDir, "plan.json"), manifestBytes, "utf-8");
    renameSync5(this.temporaryDir, this.destinationDir);
    this.#committed = true;
  }
  async abort() {
    if (!this.#committed) {
      rmSync11(this.temporaryDir, { recursive: true, force: true });
    }
  }
};

// ../producer/src/services/distributed/planV2.ts
var PLAN_V2_HASH_PREFIX = "hyperframes-plan-manifest-hash-v2\0";
var EXTRACTION_CACHE_COMPLETE_SENTINEL = ".hf-complete";
var PLAN_V2_MATERIALIZATION_MARKER = ".hyperframes-plan-v2.json";
function isRecord3(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isSha256(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
function isNonNegativeIntegerArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "number" && Number.isInteger(item) && item >= 0);
}
function readJsonFile(path, label) {
  const contents = readFileSync11(path, "utf-8");
  try {
    const parsed = JSON.parse(contents);
    return parsed;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new PlanV2IntegrityError(`${label} is not readable JSON: ${detail}`);
  }
}
function assertSafeRelativePath(path) {
  const normalized = path.split(/[\\/]+/);
  if (path.length === 0 || isAbsolute3(path) || normalized.some((part) => part === "" || part === "." || part === "..")) {
    throw new PlanV2IntegrityError(`unsafe artifact path: ${JSON.stringify(path)}`);
  }
}
function listFiles(root) {
  const files = [];
  const rootResolved = resolve10(root);
  function walk(dir) {
    for (const entry of readdirSync8(dir, { withFileTypes: true })) {
      const absolutePath = join35(dir, entry.name);
      if (entry.isDirectory()) {
        walk(absolutePath);
      } else if (entry.isFile()) {
        files.push({
          path: relative7(rootResolved, absolutePath).split(sep4).join("/"),
          absolutePath
        });
      } else {
        throw new PlanV2IntegrityError(
          `unsupported filesystem entry (symlinks and special files are not allowed): ${absolutePath}`
        );
      }
    }
  }
  walk(rootResolved);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
function sha256File(path) {
  const hash = createHash7("sha256");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  const fd = openSync5(path, "r");
  try {
    let bytesRead = 0;
    do {
      bytesRead = readSync3(fd, buffer, 0, buffer.byteLength, null);
      if (bytesRead > 0) hash.update(buffer.subarray(0, bytesRead));
    } while (bytesRead > 0);
  } finally {
    closeSync6(fd);
  }
  return hash.digest("hex");
}
function assertValidExtractionCacheCompleteSentinel(path) {
  const sentinel = lstatSync3(path);
  if (!sentinel.isFile() || sentinel.size !== 0) {
    throw new PlanV2IntegrityError(
      `${EXTRACTION_CACHE_COMPLETE_SENTINEL} must be a zero-byte regular file`
    );
  }
}
function validateExtractionCacheCompleteSentinels(executionPlanDir) {
  const videoRoot = join35(executionPlanDir, "video-frames");
  if (!existsSync23(videoRoot)) return;
  for (const videoEntry of readdirSync8(videoRoot, { withFileTypes: true })) {
    if (!videoEntry.isDirectory()) continue;
    const videoDir = join35(videoRoot, videoEntry.name);
    if (readdirSync8(videoDir).includes(EXTRACTION_CACHE_COMPLETE_SENTINEL)) {
      const sentinelPath = join35(videoDir, EXTRACTION_CACHE_COMPLETE_SENTINEL);
      assertValidExtractionCacheCompleteSentinel(sentinelPath);
    }
  }
}
function isExtractionCacheCompleteSentinelPath(path) {
  const segments = path.split("/");
  return segments.length === 3 && segments[0] === "video-frames" && segments[1] !== "" && segments[2] === EXTRACTION_CACHE_COMPLETE_SENTINEL;
}
function resolveExtractedVideoOutputDir(planDir, videoId) {
  const videoRoot = resolve10(planDir, "video-frames");
  const outputDir = resolve10(videoRoot, videoId);
  if (outputDir === videoRoot || !outputDir.startsWith(`${videoRoot}${sep4}`)) {
    throw new PlanV2IntegrityError(`unsafe extracted video id: ${JSON.stringify(videoId)}`);
  }
  return outputDir;
}
function artifactTargets(path, videoDependencies) {
  if (isPlanAudioArtifactPath(path)) return { chunks: [], assembler: true };
  if (path === "plan.json" || path === "meta/chunks.json" || path === "meta/encoder.json") {
    return { chunks: "all", assembler: true };
  }
  if (path === "meta/composition.json" || path === "meta/videos.json" || path.startsWith("compiled/")) {
    return { chunks: "all", assembler: false };
  }
  if (path.startsWith("video-frames/")) {
    return {
      chunks: videoDependencies === null ? "all" : videoDependencies.get(path) ?? [],
      assembler: false
    };
  }
  return { chunks: "all", assembler: true };
}
function listVideoFramePaths(executionPlanDir, videos) {
  return videos.extracted.map((video) => {
    const outputDir = resolveExtractedVideoOutputDir(executionPlanDir, video.videoId);
    const frameNames = readdirSync8(outputDir).sort();
    const framePaths = /* @__PURE__ */ new Map();
    for (const frameName of frameNames) {
      if (frameName === EXTRACTION_CACHE_COMPLETE_SENTINEL) {
        assertValidExtractionCacheCompleteSentinel(join35(outputDir, frameName));
        continue;
      }
      const match = /(\d+)(?=\.[^.]+$)/.exec(frameName);
      if (!match) {
        throw new PlanV2IntegrityError(`cannot derive extracted frame index from ${frameName}`);
      }
      const oneBasedFrameNumber = Number(match[1]);
      if (!Number.isSafeInteger(oneBasedFrameNumber) || oneBasedFrameNumber < 1) {
        throw new PlanV2IntegrityError(
          `extracted frame filename must use a 1-based safe integer: ${frameName}`
        );
      }
      const frameIndex = oneBasedFrameNumber - 1;
      if (framePaths.has(frameIndex)) {
        throw new PlanV2IntegrityError(
          `duplicate extracted frame index ${frameIndex} in ${outputDir}`
        );
      }
      framePaths.set(frameIndex, join35(outputDir, frameName));
    }
    return {
      ...video,
      outputDir,
      framePaths,
      ownedByLookup: false
    };
  });
}
function parsePlanVideosJson2(value) {
  try {
    return parsePlanVideosJson(value);
  } catch (err) {
    if (err instanceof PlanVideosMetadataError) {
      throw new PlanV2IntegrityError(err.message);
    }
    throw err;
  }
}
function materializeExtractedVideoDirectories(planDir) {
  const videosPath = join35(planDir, PLAN_VIDEOS_META_RELATIVE_PATH);
  if (!existsSync23(videosPath)) return;
  const videos = parsePlanVideosJson2(readJsonFile(videosPath, PLAN_VIDEOS_META_RELATIVE_PATH));
  for (const video of videos.extracted) {
    mkdirSync13(resolveExtractedVideoOutputDir(planDir, video.videoId), { recursive: true });
  }
}
function parseChunkSlices(value) {
  if (!Array.isArray(value)) {
    throw new PlanV2IntegrityError("meta/chunks.json must be an array");
  }
  const indexes = /* @__PURE__ */ new Set();
  return value.map((chunk, position) => {
    const field = `meta/chunks.json[${position}]`;
    if (!isRecord3(chunk)) throw new PlanV2IntegrityError(`${field} must be an object`);
    const index = readNonNegativeInteger2(chunk.index, `${field}.index`);
    const startFrame = readNonNegativeInteger2(chunk.startFrame, `${field}.startFrame`);
    const endFrame = readPositiveInteger2(chunk.endFrame, `${field}.endFrame`);
    if (endFrame <= startFrame) {
      throw new PlanV2IntegrityError(`${field}.endFrame must be greater than startFrame`);
    }
    if (indexes.has(index)) {
      throw new PlanV2IntegrityError(`meta/chunks.json contains duplicate chunk index ${index}`);
    }
    indexes.add(index);
    return { index, startFrame, endFrame };
  });
}
function buildVideoChunkDependencies(executionPlanDir, dimensions) {
  const videoRoot = join35(executionPlanDir, "video-frames");
  const hasExtractedFrames = existsSync23(videoRoot) && listFiles(videoRoot).length > 0;
  const videosPath = join35(executionPlanDir, PLAN_VIDEOS_META_RELATIVE_PATH);
  if (!existsSync23(videosPath)) {
    return hasExtractedFrames ? { mode: "full-source-pack", dependencies: null } : { mode: "exact-rendered-frames", dependencies: /* @__PURE__ */ new Map() };
  }
  const chunksPath = join35(executionPlanDir, "meta", "chunks.json");
  const videos = readJsonFile(videosPath, PLAN_VIDEOS_META_RELATIVE_PATH);
  const chunks = readJsonFile(chunksPath, "meta/chunks.json");
  const parsedVideos = parsePlanVideosJson2(videos);
  const parsedChunks = parseChunkSlices(chunks);
  const extracted = listVideoFramePaths(executionPlanDir, parsedVideos);
  const fpsNum = readPositiveInteger2(dimensions.fpsNum, "dimensions.fpsNum");
  const fpsDen = readPositiveInteger2(dimensions.fpsDen, "dimensions.fpsDen");
  const table = createFrameLookupTable(
    parsedVideos.videos,
    extracted,
    resolveRenderFpsConfig({ num: fpsNum, den: fpsDen }).value
  );
  const mutable = /* @__PURE__ */ new Map();
  for (const chunk of parsedChunks) {
    for (let frame = chunk.startFrame; frame < chunk.endFrame; frame++) {
      const globalTime = frame * fpsDen / fpsNum;
      for (const payload of table.getActiveFramePayloads(globalTime).values()) {
        const path = relative7(resolve10(executionPlanDir), payload.framePath).split(sep4).join("/");
        assertSafeRelativePath(path);
        const indexes = mutable.get(path) ?? /* @__PURE__ */ new Set();
        indexes.add(chunk.index);
        mutable.set(path, indexes);
      }
    }
  }
  return {
    mode: "exact-rendered-frames",
    dependencies: new Map(
      [...mutable].map(([path, indexes]) => [path, [...indexes].sort((a, b) => a - b)])
    )
  };
}
function manifestPayload(manifest) {
  return manifest;
}
function computeManifestHash(manifest) {
  return sha256Hex(`${PLAN_V2_HASH_PREFIX}${canonicalJsonStringify(manifestPayload(manifest))}`);
}
function writeBlob(sourcePath, destinationPath) {
  if (existsSync23(destinationPath)) return;
  mkdirSync13(dirname14(destinationPath), { recursive: true });
  const temporaryDir = mkdtempSync6(join35(dirname14(destinationPath), ".plan-v2-blob-"));
  const temporaryPath = join35(temporaryDir, "blob");
  try {
    copyFileSync5(sourcePath, temporaryPath);
    renameSync6(temporaryPath, destinationPath);
  } finally {
    rmSync12(temporaryDir, { recursive: true, force: true });
  }
}
function buildPlanV2Publication(executionPlanDir) {
  const executionPlanPath = join35(executionPlanDir, "plan.json");
  if (!existsSync23(executionPlanPath)) {
    throw new PlanV2IntegrityError(`execution plan is missing plan.json: ${executionPlanPath}`);
  }
  const executionPlanValue = readJsonFile(executionPlanPath, "execution plan.json");
  if (!isRecord3(executionPlanValue)) {
    throw new PlanV2IntegrityError("execution plan.json must be an object");
  }
  const executionPlan = executionPlanValue;
  readPlanProtocolV1(executionPlan);
  const executionPlanHash = executionPlan.planHash;
  if (!isSha256(executionPlanHash)) {
    throw new PlanV2IntegrityError("execution plan.json.planHash must be a sha256 digest");
  }
  const recomputedExecutionPlanHash = recomputePlanHashFromPlanDir(executionPlanDir);
  if (recomputedExecutionPlanHash !== executionPlanHash) {
    throw new PlanV2IntegrityError(
      `execution plan content fingerprint does not match plan.json.planHash: expected ${executionPlanHash}, recomputed ${recomputedExecutionPlanHash}`
    );
  }
  const artifacts = [];
  const blobs = /* @__PURE__ */ new Map();
  const dimensions = executionPlan.dimensions;
  if (!isRecord3(dimensions)) {
    throw new PlanV2IntegrityError("execution plan.json.dimensions must be an object");
  }
  validateExtractionCacheCompleteSentinels(executionPlanDir);
  const videoDependencyPlan = buildVideoChunkDependencies(executionPlanDir, dimensions);
  for (const file of listFiles(executionPlanDir)) {
    if (isExtractionCacheCompleteSentinelPath(file.path)) continue;
    const targets = artifactTargets(file.path, videoDependencyPlan.dependencies);
    if (file.path.startsWith("video-frames/") && targets.chunks !== "all" && targets.chunks.length === 0 && !targets.assembler) {
      continue;
    }
    const sha256 = sha256File(file.absolutePath);
    const sizeBytes = statSync9(file.absolutePath).size;
    if (!blobs.has(sha256)) {
      blobs.set(sha256, { sourcePath: file.absolutePath, sha256, sizeBytes });
    }
    artifacts.push({
      path: file.path,
      sha256,
      sizeBytes,
      ...targets
    });
  }
  const base = {
    protocol: PLAN_PROTOCOL_V2,
    // Retain the established manifest key byte-for-byte. It now acts as the
    // wire alias for the neutral local execution-plan hash.
    sourcePlanV1Hash: executionPlanHash,
    chunkCount: readPositiveInteger2(executionPlan.chunkCount, "chunkCount"),
    totalFrames: readPositiveInteger2(executionPlan.totalFrames, "totalFrames"),
    fps: readExecutionPlanFps(dimensions),
    width: readPositiveInteger2(dimensions.width, "dimensions.width"),
    height: readPositiveInteger2(dimensions.height, "dimensions.height"),
    format: readDistributedFormat(dimensions.format),
    ffmpegVersion: readString2(executionPlan.ffmpegVersion, "ffmpegVersion"),
    producerVersion: readString2(executionPlan.producerVersion, "producerVersion"),
    limitations: { videoDependencyMode: videoDependencyPlan.mode },
    artifacts
  };
  return {
    manifest: {
      ...base,
      planHash: computeManifestHash(base)
    },
    blobs: [...blobs.values()]
  };
}
function createPlanV2FromExecutionPlan(executionPlanDir, planV2Dir) {
  if (existsSync23(planV2Dir)) {
    throw new PlanV2IntegrityError(`output directory already exists: ${planV2Dir}`);
  }
  const publication = buildPlanV2Publication(executionPlanDir);
  mkdirSync13(dirname14(planV2Dir), { recursive: true });
  const tempDir = mkdtempSync6(join35(dirname14(planV2Dir), ".plan-v2-build-"));
  try {
    for (const blob of publication.blobs) {
      writeBlob(blob.sourcePath, planV2BlobPath(tempDir, blob.sha256));
    }
    writeFileSync10(
      join35(tempDir, "plan.json"),
      canonicalJsonStringify(publication.manifest),
      "utf-8"
    );
    renameSync6(tempDir, planV2Dir);
    return resultFromManifest(planV2Dir, publication.manifest);
  } catch (error) {
    rmSync12(tempDir, { recursive: true, force: true });
    throw error;
  }
}
function createPlanV2FromV1(executionPlanDir, planV2Dir) {
  return createPlanV2FromExecutionPlan(executionPlanDir, planV2Dir);
}
async function publishPlanV2FromExecutionPlan(executionPlanDir, publisher) {
  try {
    const publication = buildPlanV2Publication(executionPlanDir);
    const concurrency = 16;
    for (let offset = 0; offset < publication.blobs.length; offset += concurrency) {
      const batch = publication.blobs.slice(offset, offset + concurrency);
      const results = await Promise.allSettled(batch.map((blob) => publisher.putBlob(blob)));
      for (const result of results) {
        if (result.status === "rejected") throw result.reason;
      }
    }
    await publisher.commitManifest(canonicalJsonStringify(publication.manifest));
    return publication.manifest;
  } catch (error) {
    try {
      await publisher.abort();
    } catch {
    }
    throw error;
  }
}
async function publishPlanV2FromV1(executionPlanDir, publisher) {
  return publishPlanV2FromExecutionPlan(executionPlanDir, publisher);
}
async function planV2WithPublisher(projectDir, config, publisher, options = {}) {
  const stagingRoot = mkdtempSync6(join35(options.stagingParentDir ?? tmpdir4(), ".execution-plan-"));
  try {
    await buildLocalExecutionPlan(projectDir, config, stagingRoot, {
      executionPlanSizeLimitBytes: Number.MAX_SAFE_INTEGER
    });
    return await publishPlanV2FromExecutionPlan(stagingRoot, publisher);
  } catch (error) {
    try {
      await publisher.abort();
    } catch {
    }
    throw error;
  } finally {
    rmSync12(stagingRoot, { recursive: true, force: true });
  }
}
async function planV2(projectDir, config, planV2Dir) {
  if (existsSync23(planV2Dir)) {
    throw new PlanV2IntegrityError(`output directory already exists: ${planV2Dir}`);
  }
  const publisher = new LocalPlanV2ArtifactPublisher(planV2Dir);
  const manifest = await planV2WithPublisher(projectDir, config, publisher, {
    stagingParentDir: dirname14(planV2Dir)
  });
  return resultFromManifest(planV2Dir, manifest);
}
function resultFromManifest(planV2Dir, manifest) {
  return {
    planDir: planV2Dir,
    manifestPath: join35(planV2Dir, "plan.json"),
    planProtocol: PLAN_PROTOCOL_V2,
    planHash: manifest.planHash,
    sourcePlanV1Hash: getPlanV2ExecutionPlanHash(manifest),
    chunkCount: manifest.chunkCount,
    totalFrames: manifest.totalFrames,
    fps: manifest.fps,
    width: manifest.width,
    height: manifest.height,
    format: manifest.format,
    ffmpegVersion: manifest.ffmpegVersion,
    producerVersion: manifest.producerVersion,
    limitations: manifest.limitations
  };
}
function getPlanV2ExecutionPlanHash(plan2) {
  return plan2.sourcePlanV1Hash;
}
function readString2(value, field) {
  if (typeof value !== "string" || value.length === 0) {
    throw new PlanV2IntegrityError(`${field} must be a non-empty string`);
  }
  return value;
}
function readPositiveInteger2(value, field) {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new PlanV2IntegrityError(`${field} must be a positive integer`);
  }
  return value;
}
function readNonNegativeInteger2(value, field) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new PlanV2IntegrityError(`${field} must be a non-negative integer`);
  }
  return value;
}
function readSupportedFps(value) {
  if (value !== 24 && value !== 30 && value !== 60) {
    throw new PlanV2IntegrityError("dimensions.fpsNum must be 24, 30, or 60");
  }
  return value;
}
function readExecutionPlanFps(dimensions) {
  const fpsDen = readPositiveInteger2(dimensions.fpsDen, "dimensions.fpsDen");
  if (fpsDen !== 1) {
    throw new PlanV2IntegrityError("dimensions.fpsDen must be 1 for plan v2");
  }
  return readSupportedFps(dimensions.fpsNum);
}
function readDistributedFormat(value) {
  if (value !== "mp4" && value !== "mov" && value !== "webm" && value !== "png-sequence") {
    throw new PlanV2IntegrityError("dimensions.format is unsupported");
  }
  return value;
}
function parseArtifact(value, index) {
  if (!isRecord3(value)) throw new PlanV2IntegrityError(`artifacts[${index}] must be an object`);
  const path = readString2(value.path, `artifacts[${index}].path`);
  assertSafeRelativePath(path);
  if (!isSha256(value.sha256)) {
    throw new PlanV2IntegrityError(`artifacts[${index}].sha256 must be a lowercase sha256`);
  }
  const sizeBytes = value.sizeBytes;
  if (typeof sizeBytes !== "number" || !Number.isInteger(sizeBytes) || sizeBytes < 0) {
    throw new PlanV2IntegrityError(`artifacts[${index}].sizeBytes must be a non-negative integer`);
  }
  let chunks;
  if (value.chunks === "all") {
    chunks = "all";
  } else if (isNonNegativeIntegerArray(value.chunks)) {
    chunks = value.chunks;
  } else {
    throw new PlanV2IntegrityError(`artifacts[${index}].chunks is invalid`);
  }
  if (typeof value.assembler !== "boolean") {
    throw new PlanV2IntegrityError(`artifacts[${index}].assembler must be boolean`);
  }
  return {
    path,
    sha256: value.sha256,
    sizeBytes,
    chunks,
    assembler: value.assembler
  };
}
function parsePlanV2Manifest(value) {
  if (!isRecord3(value)) throw new PlanV2IntegrityError("manifest must be an object");
  if (!isRecord3(value.protocol) || value.protocol.schemaVersion !== PLAN_PROTOCOL_V2.schemaVersion || value.protocol.artifactLayout !== PLAN_PROTOCOL_V2.artifactLayout || value.protocol.hashSchema !== PLAN_PROTOCOL_V2.hashSchema) {
    throw new PlanV2IntegrityError("manifest protocol is not the supported v2 descriptor");
  }
  if (!isSha256(value.planHash) || !isSha256(value.sourcePlanV1Hash)) {
    throw new PlanV2IntegrityError("manifest hashes must be lowercase sha256 digests");
  }
  if (!Array.isArray(value.artifacts)) throw new PlanV2IntegrityError("artifacts must be an array");
  const artifacts = value.artifacts.map(parseArtifact);
  const paths = /* @__PURE__ */ new Set();
  for (const artifact of artifacts) {
    if (paths.has(artifact.path))
      throw new PlanV2IntegrityError(`duplicate artifact path: ${artifact.path}`);
    paths.add(artifact.path);
  }
  if (!paths.has("plan.json"))
    throw new PlanV2IntegrityError("manifest must include the local execution plan.json artifact");
  if (!isRecord3(value.limitations) || value.limitations.videoDependencyMode !== "exact-rendered-frames" && value.limitations.videoDependencyMode !== "full-source-pack") {
    throw new PlanV2IntegrityError("unsupported video dependency mode");
  }
  const parsed = {
    protocol: PLAN_PROTOCOL_V2,
    planHash: value.planHash,
    sourcePlanV1Hash: value.sourcePlanV1Hash,
    chunkCount: readPositiveInteger2(value.chunkCount, "chunkCount"),
    totalFrames: readPositiveInteger2(value.totalFrames, "totalFrames"),
    fps: readSupportedFps(value.fps),
    width: readPositiveInteger2(value.width, "width"),
    height: readPositiveInteger2(value.height, "height"),
    format: readDistributedFormat(value.format),
    ffmpegVersion: readString2(value.ffmpegVersion, "ffmpegVersion"),
    producerVersion: readString2(value.producerVersion, "producerVersion"),
    limitations: { videoDependencyMode: value.limitations.videoDependencyMode },
    artifacts
  };
  const { planHash: _planHash, ...payload } = parsed;
  const expectedHash = computeManifestHash(payload);
  if (expectedHash !== parsed.planHash) {
    throw new PlanV2IntegrityError("manifest integrity hash mismatch");
  }
  for (const [index, artifact] of parsed.artifacts.entries()) {
    if (artifact.chunks !== "all" && artifact.chunks.some((chunkIndex) => chunkIndex >= parsed.chunkCount)) {
      throw new PlanV2IntegrityError(`artifacts[${index}].chunks contains an out-of-range index`);
    }
  }
  return parsed;
}
function readPlanV2Manifest(planV2Dir) {
  const manifestPath = join35(planV2Dir, "plan.json");
  if (!existsSync23(manifestPath)) {
    throw new PlanV2IntegrityError(`missing v2 manifest: ${manifestPath}`);
  }
  const value = readJsonFile(manifestPath, "v2 manifest");
  return parsePlanV2Manifest(value);
}
function listPlanV2ArtifactsForTarget(manifest, target) {
  if (target.role === "chunk") {
    if (!Number.isInteger(target.chunkIndex) || target.chunkIndex < 0 || target.chunkIndex >= manifest.chunkCount) {
      throw new PlanV2IntegrityError(`chunkIndex ${String(target.chunkIndex)} is out of range`);
    }
    return manifest.artifacts.filter(
      (artifact) => artifact.chunks === "all" || artifact.chunks.some((chunkIndex) => chunkIndex === target.chunkIndex)
    );
  }
  return manifest.artifacts.filter((artifact) => artifact.assembler);
}
function verifyBlob(planV2Dir, artifact) {
  const sourcePath = planV2BlobPath(planV2Dir, artifact.sha256);
  if (!existsSync23(sourcePath)) {
    throw new PlanV2IntegrityError(`missing content-addressed artifact ${artifact.sha256}`);
  }
  const stats = statSync9(sourcePath);
  if (!stats.isFile() || stats.size !== artifact.sizeBytes) {
    throw new PlanV2IntegrityError(`artifact size mismatch for ${artifact.path}`);
  }
  if (sha256File(sourcePath) !== artifact.sha256) {
    throw new PlanV2IntegrityError(`artifact hash mismatch for ${artifact.path}`);
  }
  return sourcePath;
}
function materializePlanV2Target(planV2Dir, target, destinationDir) {
  if (existsSync23(destinationDir)) {
    throw new PlanV2IntegrityError(`materialization destination already exists: ${destinationDir}`);
  }
  const manifest = readPlanV2Manifest(planV2Dir);
  const artifacts = listPlanV2ArtifactsForTarget(manifest, target);
  const audioArtifact = artifacts.find((artifact) => isPlanAudioArtifactPath(artifact.path));
  const verified = artifacts.map((artifact) => ({
    artifact,
    sourcePath: verifyBlob(planV2Dir, artifact)
  }));
  mkdirSync13(dirname14(destinationDir), { recursive: true });
  const tempDir = mkdtempSync6(join35(dirname14(destinationDir), ".plan-v2-materialize-"));
  try {
    for (const { artifact, sourcePath } of verified) {
      const destinationPath = join35(tempDir, ...artifact.path.split("/"));
      mkdirSync13(dirname14(destinationPath), { recursive: true });
      copyFileSync5(sourcePath, destinationPath);
    }
    if (target.role === "chunk") materializeExtractedVideoDirectories(tempDir);
    writeFileSync10(
      join35(tempDir, PLAN_V2_MATERIALIZATION_MARKER),
      canonicalJsonStringify({ manifest, target }),
      "utf-8"
    );
    renameSync6(tempDir, destinationDir);
  } catch (error) {
    rmSync12(tempDir, { recursive: true, force: true });
    throw error;
  }
  return {
    planDir: destinationDir,
    target,
    planHash: manifest.planHash,
    sourcePlanV1Hash: getPlanV2ExecutionPlanHash(manifest),
    artifactCount: artifacts.length,
    sizeBytes: artifacts.reduce((sum, artifact) => sum + artifact.sizeBytes, 0),
    // Join the artifact's OWN name, not the current constant: a plan written
    // before the container change carries the legacy name, and materializing it
    // under the new one would point at a file that was never written.
    audioPath: target.role === "assembler" ? audioArtifact ? join35(destinationDir, audioArtifact.path) : null : null
  };
}
function validatePlanV2MaterializedTarget(planDir, expectedTarget) {
  const markerPath = join35(planDir, PLAN_V2_MATERIALIZATION_MARKER);
  if (!existsSync23(markerPath)) return null;
  const marker = readJsonFile(markerPath, "materialization marker");
  if (!isRecord3(marker) || !isRecord3(marker.manifest) || !isRecord3(marker.target)) {
    throw new PlanV2IntegrityError("malformed materialization marker");
  }
  const target = marker.target;
  if (target.role !== expectedTarget.role || expectedTarget.role === "chunk" && target.chunkIndex !== expectedTarget.chunkIndex) {
    throw new PlanV2IntegrityError(
      "materialization target does not match requested execution role"
    );
  }
  const manifest = parsePlanV2Manifest(marker.manifest);
  const required = listPlanV2ArtifactsForTarget(manifest, expectedTarget);
  for (const artifact of required) {
    const path = join35(planDir, ...artifact.path.split("/"));
    if (!existsSync23(path) || statSync9(path).size !== artifact.sizeBytes) {
      throw new PlanV2IntegrityError(
        `materialized artifact missing or truncated: ${artifact.path}`
      );
    }
    if (sha256File(path) !== artifact.sha256) {
      throw new PlanV2IntegrityError(`materialized artifact hash mismatch: ${artifact.path}`);
    }
  }
  return manifest;
}

// ../producer/src/services/distributed/planV2Execution.ts
import { mkdtempSync as mkdtempSync8, rmSync as rmSync15 } from "fs";
import { tmpdir as tmpdir5 } from "os";
import { join as join38 } from "path";

// ../producer/src/services/distributed/assemble.ts
import {
  cpSync as cpSync3,
  existsSync as existsSync24,
  mkdirSync as mkdirSync14,
  mkdtempSync as mkdtempSync7,
  readFileSync as readFileSync12,
  readdirSync as readdirSync9,
  rmSync as rmSync13,
  statSync as statSync10,
  writeFileSync as writeFileSync11
} from "fs";
import { dirname as dirname15, join as join36 } from "path";
async function assemble(planDir, chunkPaths, audioPath, outputPath, options) {
  const start = Date.now();
  const log = options?.logger ?? defaultLogger;
  const abortSignal = options?.abortSignal;
  const cfr = options?.cfr === true;
  const planJsonPath = join36(planDir, "plan.json");
  const chunksJsonPath = join36(planDir, "meta", "chunks.json");
  if (!existsSync24(planJsonPath)) {
    throw new Error(`[assemble] planDir missing plan.json: ${planJsonPath}`);
  }
  const plan2 = JSON.parse(readFileSync12(planJsonPath, "utf-8"));
  readPlanProtocolV1(plan2, DISTRIBUTED_RENDER_CAPABILITIES.roles.assembler);
  validatePlanV2MaterializedTarget(planDir, { role: "assembler" });
  if (!existsSync24(chunksJsonPath)) {
    throw new Error(`[assemble] planDir missing meta/chunks.json: ${chunksJsonPath}`);
  }
  const chunks = JSON.parse(readFileSync12(chunksJsonPath, "utf-8"));
  if (chunkPaths.length !== chunks.length) {
    throw new Error(
      `[assemble] chunkPaths length (${chunkPaths.length}) does not match chunks.json length (${chunks.length}). Adapters must pass one path per chunk, ordered by index.`
    );
  }
  for (const path of chunkPaths) {
    if (!existsSync24(path)) {
      throw new Error(`[assemble] chunk path does not exist: ${path}`);
    }
  }
  if (plan2.dimensions.format === "png-sequence") {
    return mergePngFrameDirs(chunkPaths, outputPath, plan2.totalFrames, audioPath, start);
  }
  if (!existsSync24(dirname15(outputPath))) {
    mkdirSync14(dirname15(outputPath), { recursive: true });
  }
  const workDir = mkdtempSync7(`${outputPath}.assemble-work-`);
  try {
    const concatOutputPath = join36(workDir, `concat.${plan2.dimensions.format}`);
    const fpsArg = fpsToFfmpegArg({
      num: plan2.dimensions.fpsNum,
      den: plan2.dimensions.fpsDen
    });
    if (chunkPaths.length === 1) {
      const remuxArgs = ["-i", chunkPaths[0], "-c", "copy", "-r", fpsArg];
      appendRenderProvenanceArgs(remuxArgs, concatOutputPath);
      remuxArgs.push("-y", concatOutputPath);
      const remuxResult = await runFfmpeg(remuxArgs, { signal: abortSignal });
      if (!remuxResult.success) {
        throw encoderFailureError("[assemble] ffmpeg single-chunk remux failed", {
          error: `exit ${remuxResult.exitCode}: ${remuxResult.stderr.slice(-400)}`,
          failureReason: remuxResult.failureReason
        });
      }
    } else {
      const concatListPath = join36(workDir, "concat-list.txt");
      const concatBody = chunkPaths.map((path) => `file '${path.replace(/'/g, "'\\''")}'`).join("\n");
      writeFileSync11(concatListPath, `${concatBody}
`, "utf-8");
      const concatArgs = [
        "-r",
        fpsArg,
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        concatListPath,
        "-c",
        "copy"
      ];
      appendRenderProvenanceArgs(concatArgs, concatOutputPath);
      concatArgs.push("-y", concatOutputPath);
      const concatResult = await runFfmpeg(concatArgs, { signal: abortSignal });
      if (!concatResult.success) {
        throw encoderFailureError("[assemble] ffmpeg concat-copy failed", {
          error: `exit ${concatResult.exitCode}: ${concatResult.stderr.slice(-400)}`,
          failureReason: concatResult.failureReason
        });
      }
    }
    let postConcatPath = concatOutputPath;
    if (cfr) {
      if (plan2.dimensions.format !== "mp4") {
        throw new Error(
          `[assemble] cfr=true is only supported for format="mp4" (got "${plan2.dimensions.format}"). Stream-copy paths for webm and mov already produce exact avg_frame_rate; cfr re-encode is not needed.`
        );
      }
      const encoderJsonPath = join36(planDir, "meta", "encoder.json");
      if (!existsSync24(encoderJsonPath)) {
        throw new Error(`[assemble] planDir missing meta/encoder.json: ${encoderJsonPath}`);
      }
      const encoderJson = JSON.parse(readFileSync12(encoderJsonPath, "utf-8"));
      if (encoderJson.encoder === "libx265-software") {
        throw new Error(
          `[assemble] cfr=true is not yet supported with codec: "h265". The cfr re-encode pass uses libx264 and would silently transcode the h265 chunks. Either disable cfr or render with codec: "h264".`
        );
      }
      const cfrOutputPath = join36(workDir, `cfr.${plan2.dimensions.format}`);
      const cfrArgs = [
        "-i",
        concatOutputPath,
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-fps_mode",
        "cfr",
        "-r",
        fpsArg
      ];
      appendRenderProvenanceArgs(cfrArgs, cfrOutputPath);
      cfrArgs.push("-y", cfrOutputPath);
      const cfrResult = await runFfmpeg(cfrArgs, { signal: abortSignal });
      if (!cfrResult.success) {
        throw encoderFailureError("[assemble] ffmpeg cfr re-encode failed", {
          error: `exit ${cfrResult.exitCode}: ${cfrResult.stderr.slice(-400)}`,
          failureReason: cfrResult.failureReason
        });
      }
      postConcatPath = cfrOutputPath;
      log.info("[assemble] cfr re-encode applied", {
        format: plan2.dimensions.format,
        fpsNum: plan2.dimensions.fpsNum,
        fpsDen: plan2.dimensions.fpsDen
      });
    }
    let normalizedAudioPath = null;
    if (audioPath !== null && existsSync24(audioPath)) {
      const paddedAudioPath = join36(workDir, "audio-padded.m4a");
      const padTrimResult = await padOrTrimAudioToVideoFrameCount({
        videoPath: postConcatPath,
        audioPath,
        outputPath: paddedAudioPath,
        signal: abortSignal
      });
      if (!padTrimResult.success) {
        throw encoderFailureError("[assemble] audio pad/trim failed", padTrimResult);
      }
      normalizedAudioPath = paddedAudioPath;
      log.info("[assemble] audio normalized for mux", {
        operation: padTrimResult.operation,
        targetDurationSeconds: padTrimResult.targetDurationSeconds,
        sourceDurationSeconds: padTrimResult.sourceDurationSeconds
      });
    }
    const muxOutputPath = normalizedAudioPath !== null ? join36(workDir, `mux.${plan2.dimensions.format}`) : postConcatPath;
    if (normalizedAudioPath !== null) {
      const muxResult = await muxVideoWithAudio(
        postConcatPath,
        normalizedAudioPath,
        muxOutputPath,
        abortSignal,
        {
          audioCodec: "aac"
        },
        { num: plan2.dimensions.fpsNum, den: plan2.dimensions.fpsDen }
      );
      if (!muxResult.success) {
        throw encoderFailureError("[assemble] audio mux failed", muxResult);
      }
    }
    const faststartResult = await applyFaststart(
      muxOutputPath,
      outputPath,
      abortSignal,
      void 0,
      {
        num: plan2.dimensions.fpsNum,
        den: plan2.dimensions.fpsDen
      }
    );
    if (!faststartResult.success) {
      throw encoderFailureError("[assemble] faststart failed", faststartResult);
    }
  } finally {
    try {
      rmSync13(workDir, { recursive: true, force: true });
    } catch (err) {
      log.warn("[assemble] failed to remove work dir", {
        workDir,
        error: err instanceof Error ? err.message : String(err)
      });
    }
  }
  const fileSize = existsSync24(outputPath) ? statSync10(outputPath).size : 0;
  return {
    outputPath,
    durationMs: Date.now() - start,
    framesEncoded: plan2.totalFrames,
    fileSize
  };
}
function mergePngFrameDirs(chunkPaths, outputPath, totalFrames, audioPath, startTimeMs) {
  if (existsSync24(outputPath)) rmSync13(outputPath, { recursive: true, force: true });
  mkdirSync14(outputPath, { recursive: true });
  let globalIdx = 0;
  for (const chunkDir of chunkPaths) {
    if (!statSync10(chunkDir).isDirectory()) {
      throw new Error(
        `[assemble] png-sequence chunk must be a directory: ${chunkDir} (got a file)`
      );
    }
    const frames = readdirSync9(chunkDir).filter((name) => name.endsWith(".png")).sort();
    if (frames.length === 0) {
      throw new Error(`[assemble] png-sequence chunk has no frames: ${chunkDir}`);
    }
    for (const frame of frames) {
      const dst = join36(outputPath, formatExportFrameName(globalIdx, "png"));
      cpSync3(join36(chunkDir, frame), dst);
      globalIdx += 1;
    }
  }
  if (globalIdx !== totalFrames) {
    console.warn(
      `[assemble] png-sequence frame count mismatch: merged ${globalIdx} frames vs plan.totalFrames=${totalFrames}. Using on-disk count.`
    );
  }
  if (audioPath !== null && existsSync24(audioPath)) {
    const sidecar = join36(outputPath, MIXED_AUDIO_FILENAME);
    cpSync3(audioPath, sidecar);
  }
  let fileSize = 0;
  for (const name of readdirSync9(outputPath)) {
    try {
      fileSize += statSync10(join36(outputPath, name)).size;
    } catch {
    }
  }
  return {
    outputPath,
    durationMs: Date.now() - startTimeMs,
    framesEncoded: globalIdx,
    fileSize
  };
}

// ../producer/src/services/distributed/renderChunk.ts
import { randomBytes } from "crypto";
import { existsSync as existsSync25, mkdirSync as mkdirSync15, readFileSync as readFileSync13, readdirSync as readdirSync10, rmSync as rmSync14, writeFileSync as writeFileSync12 } from "fs";
import { extname as extname5, join as join37 } from "path";
var FFMPEG_VERSION_MISMATCH = "FFMPEG_VERSION_MISMATCH";
var PLAN_HASH_MISMATCH = "PLAN_HASH_MISMATCH";
var MISSING_PLAN_ARTIFACT = "MISSING_PLAN_ARTIFACT";
var CHUNK_INDEX_OUT_OF_RANGE = "CHUNK_INDEX_OUT_OF_RANGE";
var MISSING_RUNTIME_ENV_SNAPSHOT = "MISSING_RUNTIME_ENV_SNAPSHOT";
var LEGACY_DISTRIBUTED_VP9_CPU_USED = 2;
var RenderChunkValidationError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "RenderChunkValidationError";
    this.code = code;
  }
};
function validatePlanVideosForChunk(value) {
  try {
    return parsePlanVideosJson(value);
  } catch (err) {
    throw new RenderChunkValidationError(
      INVALID_VIDEO_METADATA,
      `[renderChunk] invalid meta/videos.json: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
var distributedCaptureSessionDependencies = {
  createCaptureSession,
  assertSwiftShader,
  initializeSession,
  closeCaptureSession,
  readWebGlVendorInfo: readWebGlVendorInfoFromCanvas
};
async function createVerifiedDistributedCaptureSession(serverUrl, framesDir, captureOptions, cfg, dependencies = distributedCaptureSessionDependencies) {
  const session = await dependencies.createCaptureSession(
    serverUrl,
    framesDir,
    captureOptions,
    null,
    cfg
  );
  try {
    await dependencies.assertSwiftShader(session.page, dependencies.readWebGlVendorInfo);
    await dependencies.initializeSession(session);
    return session;
  } catch (error) {
    await dependencies.closeCaptureSession(session).catch(() => {
    });
    throw error;
  }
}
function createChunkVideoFrameInjectorFactory(frameLookup) {
  return () => createVideoFrameInjector(frameLookup);
}
function isCaptureMode(value) {
  return value === "beginframe" || value === "screenshot" || value === "drawelement";
}
function shouldRetryChunkCaptureWithScreenshot(error) {
  const failure = classifyCaptureFailure(error);
  if (failure.kind === "cancelled" || failure.kind === "memory_exhaustion") return false;
  return /HeadlessExperimental\.beginFrame/i.test(failure.message) || /beginFrame probe timeout/i.test(failure.message) || /Another frame is pending|Frame still pending/i.test(failure.message);
}
async function runCaptureWithScreenshotFallback(input) {
  try {
    return await input.run(input.forceScreenshot);
  } catch (error) {
    if (input.forceScreenshot || !shouldRetryChunkCaptureWithScreenshot(error)) throw error;
    input.onFallback?.(error);
    await input.resetForScreenshotRetry();
    return await input.run(true);
  }
}
async function beginFrameSessionNeedsScreenshotFallback(session, probe = probeBeginFrameLiveness) {
  if (session.launchCaptureMode !== "beginframe") return false;
  const timeoutMs = Number(process.env.PRODUCER_BEGINFRAME_PROBE_TIMEOUT_MS) > 0 ? Number(process.env.PRODUCER_BEGINFRAME_PROBE_TIMEOUT_MS) : 3e4;
  const probeTick = deriveBeginFrameProbeTimeTicks(
    session.beginFrameTimeTicks,
    session.beginFrameIntervalMs
  );
  return !await probe(session.page, timeoutMs, probeTick, session.beginFrameIntervalMs);
}
function frameNumberFromFileName(name) {
  const match = /(\d+)(?=\.[^.]+$)/.exec(name);
  if (!match) return null;
  const frameNumber = Number(match[1]);
  return Number.isSafeInteger(frameNumber) ? frameNumber : null;
}
function rebuildExtractedFramesFromPlanDir(planDir, videos, indexMode = "dense-v1") {
  const result = [];
  for (const v of videos) {
    const outputDir = join37(planDir, "video-frames", v.videoId);
    if (!existsSync25(outputDir)) {
      throw new Error(
        `[renderChunk] planDir missing extracted video frames for ${JSON.stringify(v.videoId)}: ${outputDir} not present. plan() should have written frames here; the planDir is malformed.`
      );
    }
    const ext = (extname5(v.framePattern) || ".jpg").toLowerCase();
    const frames = readdirSync10(outputDir).filter((name) => name.toLowerCase().endsWith(ext)).sort((left, right) => {
      const leftNumber = frameNumberFromFileName(left);
      const rightNumber = frameNumberFromFileName(right);
      if (leftNumber === null || rightNumber === null) return left.localeCompare(right);
      return leftNumber - rightNumber || left.localeCompare(right);
    });
    const framePaths = /* @__PURE__ */ new Map();
    for (let i = 0; i < frames.length; i++) {
      const frameName = frames[i];
      if (!frameName) continue;
      const frameNumber = indexMode === "sparse-v2" ? frameNumberFromFileName(frameName) : null;
      const frameIndex = frameNumber === null ? i : frameNumber - 1;
      framePaths.set(frameIndex, join37(outputDir, frameName));
    }
    result.push({
      videoId: v.videoId,
      srcPath: v.srcPath,
      outputDir,
      framePattern: v.framePattern,
      fps: v.fps,
      totalFrames: v.totalFrames,
      metadata: v.metadata,
      framePaths,
      // The chunk worker doesn't own the planDir's video-frames/ directory
      // (the controller does — adapters that fan out chunks across machines
      // share the planDir as read-only). Mark ownership as false so the
      // injector's eventual cleanup doesn't rm bytes another worker may
      // still be reading.
      ownedByLookup: false
    });
  }
  return result;
}
function hashChunkOutput(outputPath, kind) {
  if (kind === "file") return sha256Hex(readFileSync13(outputPath));
  const entries = readdirSync10(outputPath).filter((name) => /\.(png|jpg|jpeg)$/i.test(name)).sort();
  const lines = entries.map(
    (name) => `${name}\0${sha256Hex(readFileSync13(join37(outputPath, name)))}`
  );
  return sha256Hex(lines.join("\0"));
}
function resolvePresetForLockedEncoder(basePreset, lockedEncoder) {
  if (lockedEncoder === "libx265-software") {
    return { ...basePreset, codec: "h265" };
  }
  return basePreset;
}
function resolveLockedVp9CpuUsed(lockedEncoder) {
  if (lockedEncoder.encoder !== "libvpx-vp9-software") return void 0;
  return lockedEncoder.vp9CpuUsed ?? LEGACY_DISTRIBUTED_VP9_CPU_USED;
}
async function renderChunk(planDir, chunkIndex, outputChunkPath) {
  const start = Date.now();
  const log = defaultLogger;
  const planJsonPath = join37(planDir, "plan.json");
  const encoderJsonPath = join37(planDir, "meta", "encoder.json");
  const chunksJsonPath = join37(planDir, "meta", "chunks.json");
  if (!existsSync25(planJsonPath)) {
    throw new RenderChunkValidationError(
      MISSING_PLAN_ARTIFACT,
      `[renderChunk] planDir is missing required artifact: ${planJsonPath}`
    );
  }
  const plan2 = JSON.parse(readFileSync13(planJsonPath, "utf-8"));
  readPlanProtocolV1(plan2, DISTRIBUTED_RENDER_CAPABILITIES.roles.chunk);
  const planHashStarted = Date.now();
  const v2Manifest = validatePlanV2MaterializedTarget(planDir, {
    role: "chunk",
    chunkIndex
  });
  for (const required of [encoderJsonPath, chunksJsonPath]) {
    if (!existsSync25(required)) {
      throw new RenderChunkValidationError(
        MISSING_PLAN_ARTIFACT,
        `[renderChunk] planDir is missing required artifact: ${required}`
      );
    }
  }
  const encoder = JSON.parse(readFileSync13(encoderJsonPath, "utf-8"));
  const chunks = JSON.parse(readFileSync13(chunksJsonPath, "utf-8"));
  const videosJsonPath = join37(planDir, PLAN_VIDEOS_META_RELATIVE_PATH);
  let planVideos = null;
  if (existsSync25(videosJsonPath)) {
    try {
      planVideos = validatePlanVideosForChunk(JSON.parse(readFileSync13(videosJsonPath, "utf-8")));
    } catch (err) {
      if (err instanceof RenderChunkValidationError) throw err;
      throw new RenderChunkValidationError(
        INVALID_VIDEO_METADATA,
        `[renderChunk] failed to parse ${videosJsonPath}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  if (chunkIndex < 0 || chunkIndex >= chunks.length) {
    throw new RenderChunkValidationError(
      CHUNK_INDEX_OUT_OF_RANGE,
      `[renderChunk] chunkIndex ${chunkIndex} is out of range [0, ${chunks.length})`
    );
  }
  const slice = chunks[chunkIndex];
  if (slice === void 0) {
    throw new RenderChunkValidationError(CHUNK_INDEX_OUT_OF_RANGE, "[renderChunk] missing slice");
  }
  const framesInChunk = slice.endFrame - slice.startFrame;
  if (framesInChunk <= 0) {
    throw new RenderChunkValidationError(
      CHUNK_INDEX_OUT_OF_RANGE,
      `[renderChunk] chunk ${chunkIndex} has non-positive frame count: ${framesInChunk}`
    );
  }
  const compiledDir = join37(planDir, "compiled");
  if (!existsSync25(compiledDir)) {
    throw new RenderChunkValidationError(
      MISSING_PLAN_ARTIFACT,
      `[renderChunk] planDir missing compiled/ directory: ${compiledDir}`
    );
  }
  const ffmpegVersion = await readFfmpegVersion();
  if (ffmpegVersion !== plan2.ffmpegVersion) {
    throw new RenderChunkValidationError(
      FFMPEG_VERSION_MISMATCH,
      `[renderChunk] ffmpeg version on this worker does not match planDir. planDir: ${JSON.stringify(plan2.ffmpegVersion)}; worker: ${JSON.stringify(ffmpegVersion)}. Distributed retries require byte-identical ffmpeg builds across workers. Re-plan from a worker matching this version, or run all renders on an image with the planDir's ffmpeg.`
    );
  }
  if (encoder.browserGpuMode !== "software") {
    throw new RenderChunkValidationError(
      BROWSER_GPU_NOT_SOFTWARE,
      `[renderChunk] planDir requires browserGpuMode=software, got ${JSON.stringify(encoder.browserGpuMode)}.`
    );
  }
  const recomputedPlanHash = v2Manifest === null ? recomputePlanHashFromPlanDir(planDir) : plan2.planHash;
  const planHashMs = Date.now() - planHashStarted;
  if (recomputedPlanHash !== plan2.planHash) {
    throw new RenderChunkValidationError(
      PLAN_HASH_MISMATCH,
      `[renderChunk] planDir content fingerprint does not match plan.json.planHash. plan.json: ${plan2.planHash}; recomputed: ${recomputedPlanHash}. Likely a corrupted artifact (partial S3 download, manual tampering) or a planDir produced by an incompatible producer version. Re-plan and re-fan-out.`
    );
  }
  if (!encoder.runtimeEnv || typeof encoder.runtimeEnv !== "object") {
    throw new RenderChunkValidationError(
      MISSING_RUNTIME_ENV_SNAPSHOT,
      "[renderChunk] planDir is missing meta/encoder.json.runtimeEnv snapshot. Re-plan with the current producer."
    );
  }
  const envRestore = applyRuntimeEnvSnapshot(encoder.runtimeEnv);
  try {
    const job = buildSyntheticRenderJob({
      fps: { num: plan2.dimensions.fpsNum, den: plan2.dimensions.fpsDen },
      quality: encoder.quality,
      format: plan2.dimensions.format,
      crf: encoder.crf,
      bitrate: encoder.bitrate,
      hdrMode: "force-sdr",
      entryFile: "index.html"
    });
    job.totalFrames = framesInChunk;
    job.duration = framesInChunk * plan2.dimensions.fpsDen / plan2.dimensions.fpsNum;
    const cfg = {
      ...resolveConfig(),
      browserGpuMode: "software",
      forceScreenshot: encoder.forceScreenshot,
      // `encoder.forceScreenshot=false` is a locked distributed-render
      // decision, not the engine default. Carry that explicit opt-out through
      // the software-GPU clamp so buildChromeArgs includes BeginFrameControl.
      forceScreenshotExplicitlyOptedOut: !encoder.forceScreenshot
    };
    const videoFrameLookup = planVideos && planVideos.extracted.length > 0 ? createFrameLookupTable(
      planVideos.videos,
      rebuildExtractedFramesFromPlanDir(
        planDir,
        planVideos.extracted,
        v2Manifest === null ? "dense-v1" : "sparse-v2"
      ),
      resolveRenderFpsConfig(job.config.fps).value
    ) : null;
    const createChunkVideoFrameInjector = createChunkVideoFrameInjectorFactory(videoFrameLookup);
    const videoCaptureBeyondViewport = resolveVideoCaptureBeyondViewport(
      planVideos?.videos.length ?? 0
    );
    const workDir = `${outputChunkPath}.work.${process.pid}.${randomBytes(4).toString("hex")}`;
    mkdirSync15(workDir, { recursive: true });
    const framesDir = join37(workDir, "captured-frames");
    mkdirSync15(framesDir, { recursive: true });
    const fileServer = await createFileServer({
      projectDir: compiledDir,
      compiledDir,
      port: 0,
      preHeadScripts: [buildVirtualTimeShim({ seedRandomFromFrame: true })],
      // These dimensions are frozen by the controller from the render job, so
      // chunk runtime seek quantization stays on the same fps grid as capture.
      fps: { num: plan2.dimensions.fpsNum, den: plan2.dimensions.fpsDen }
    });
    const captureOptions = {
      width: plan2.dimensions.width,
      height: plan2.dimensions.height,
      fps: { num: plan2.dimensions.fpsNum, den: plan2.dimensions.fpsDen },
      format: plan2.dimensions.format === "mp4" ? "jpeg" : "png",
      quality: plan2.dimensions.format === "mp4" ? 80 : void 0,
      deviceScaleFactor: encoder.deviceScaleFactor,
      // Re-inject the controller's snapshotted variables so the chunk's
      // first capture sees the same `window.__hfVariables` the in-process
      // renderer would have seen. Optional — compositions that don't
      // declare `data-composition-variables` leave this undefined and the
      // engine skips the `evaluateOnNewDocument` injection.
      variables: encoder.variables,
      ...videoCaptureBeyondViewport !== void 0 ? { captureBeyondViewport: videoCaptureBeyondViewport } : {},
      // lock the BeginFrame warmup loop to a fixed iteration count so
      // `beginFrameTimeTicks` is host-independent. Only chunks ever set this.
      lockWarmupTicks: true,
      requiresWebGpu: compositionRequiresWebGpu(
        readFileSync13(join37(compiledDir, "index.html"), "utf-8")
      )
    };
    const chunkWorkerCount = calculateOptimalWorkers(framesInChunk, void 0, cfg);
    let session = null;
    let outputKind;
    let framesEncoded = 0;
    let sessionBootMs = 0;
    let captureStageMs = 0;
    let encodeStageMs = 0;
    let captureMode;
    const capturePerfs = [];
    const captureAttempts = [];
    let forceScreenshotForChunk = encoder.forceScreenshot;
    try {
      if (chunkWorkerCount === 1 || !forceScreenshotForChunk) {
        const bootStarted = Date.now();
        session = await createVerifiedDistributedCaptureSession(
          fileServer.url,
          framesDir,
          captureOptions,
          cfg
        );
        sessionBootMs = Date.now() - bootStarted;
        const browserSelectedScreenshot = session.launchCaptureMode === "screenshot";
        const beginFrameStalled = !browserSelectedScreenshot && await beginFrameSessionNeedsScreenshotFallback(session);
        if (browserSelectedScreenshot) {
          forceScreenshotForChunk = true;
          log.warn(
            "[renderChunk] Browser capability probe selected screenshot capture for the entire chunk",
            { chunkIndex }
          );
          if (chunkWorkerCount > 1) {
            await closeCaptureSession(session);
            session = null;
          }
        } else if (beginFrameStalled) {
          forceScreenshotForChunk = true;
          log.warn(
            "[renderChunk] BeginFrame liveness probe failed; using screenshot capture for the entire chunk",
            { chunkIndex }
          );
          await closeCaptureSession(session).catch(() => {
          });
          session = null;
          if (chunkWorkerCount === 1) {
            const screenshotBootStarted = Date.now();
            const screenshotCfg = {
              ...cfg,
              forceScreenshot: true,
              forceScreenshotExplicitlyOptedOut: false
            };
            session = await createVerifiedDistributedCaptureSession(
              fileServer.url,
              framesDir,
              captureOptions,
              screenshotCfg
            );
            sessionBootMs += Date.now() - screenshotBootStarted;
          }
        } else if (chunkWorkerCount > 1) {
          await closeCaptureSession(session);
          session = null;
        }
      }
      const captureStarted = Date.now();
      captureMode = await runCaptureWithScreenshotFallback({
        forceScreenshot: forceScreenshotForChunk,
        // fallow-ignore-next-line complexity
        run: async (forceScreenshot) => {
          const captureCfg = cfg.forceScreenshot === forceScreenshot ? cfg : {
            ...cfg,
            forceScreenshot,
            forceScreenshotExplicitlyOptedOut: !forceScreenshot
          };
          if (chunkWorkerCount === 1 && session === null) {
            session = await createVerifiedDistributedCaptureSession(
              fileServer.url,
              framesDir,
              captureOptions,
              captureCfg
            );
          }
          const capturePlan = createCapturePlan({
            workerCount: chunkWorkerCount,
            forceScreenshot,
            useStreamingEncode: false,
            useLayeredComposite: false,
            usePageSideCompositing: false,
            hasHdrContent: false,
            needsAlpha: plan2.dimensions.format !== "mp4"
          });
          if (capturePlan.kind !== "sdr_disk") {
            throw new Error(`Distributed chunk requires sdr_disk plan; got ${capturePlan.kind}`);
          }
          const captureSession = session;
          session = null;
          await runCaptureStage({
            fileServer,
            workDir,
            framesDir,
            job,
            totalFrames: framesInChunk,
            cfg: captureCfg,
            plan: capturePlan,
            log,
            probeSession: captureSession,
            captureAttempts,
            // This sink records each worker's effective capture mode so a
            // fallback remains observable to adapters and smoke tests.
            dedupPerfs: capturePerfs,
            buildCaptureOptions: () => captureOptions,
            createRenderVideoFrameInjector: createChunkVideoFrameInjector,
            abortSignal: void 0,
            assertNotAborted: () => {
            },
            frameRange: { startFrame: slice.startFrame, endFrame: slice.endFrame }
          });
          const observedModes = new Set(capturePerfs.map((perf) => perf.captureMode));
          if (observedModes.size !== 1 || ![...observedModes].every(isCaptureMode)) {
            throw new Error(
              `[renderChunk] capture workers reported invalid or inconsistent modes: ${[...observedModes].join(",") || "<none>"}`
            );
          }
          const [observedMode] = observedModes;
          if (!observedMode || !isCaptureMode(observedMode)) {
            throw new Error("[renderChunk] capture completed without an observed mode");
          }
          return observedMode;
        },
        resetForScreenshotRetry: () => {
          rmSync14(workDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
          mkdirSync15(framesDir, { recursive: true });
          capturePerfs.length = 0;
          captureAttempts.length = 0;
          job.framesRendered = 0;
        },
        onFallback: (error) => {
          log.warn(
            "[renderChunk] BeginFrame capture failed; retrying the entire chunk once in screenshot mode",
            {
              chunkIndex,
              error: error instanceof Error ? error.message : String(error)
            }
          );
        }
      });
      captureStageMs = Date.now() - captureStarted;
      applyRenderWarningPolicy(
        job,
        capturePerfs.flatMap((perf) => perf.warnings ?? []),
        log
      );
      framesEncoded = framesInChunk;
      const isPngSequence = plan2.dimensions.format === "png-sequence";
      outputKind = isPngSequence ? "frame-dir" : "file";
      const presetFormat = isPngSequence ? "mp4" : plan2.dimensions.format;
      const basePreset = getEncoderPreset(job.config.quality, presetFormat, void 0);
      const preset = resolvePresetForLockedEncoder(basePreset, encoder.encoder);
      const effectiveQuality = encoder.crf ?? preset.quality;
      const effectiveBitrate = encoder.crf != null ? void 0 : encoder.bitrate;
      const videoOnlyPath = outputChunkPath;
      if (isPngSequence) {
        if (!existsSync25(outputChunkPath)) mkdirSync15(outputChunkPath, { recursive: true });
      } else {
        const outDir = join37(outputChunkPath, "..");
        if (!existsSync25(outDir)) mkdirSync15(outDir, { recursive: true });
      }
      const encodeStarted = Date.now();
      await runEncodeStage({
        job,
        log,
        outputPath: outputChunkPath,
        framesDir,
        videoOnlyPath,
        width: plan2.dimensions.width * encoder.deviceScaleFactor,
        height: plan2.dimensions.height * encoder.deviceScaleFactor,
        needsAlpha: plan2.dimensions.format !== "mp4",
        captureImageFormat: captureOptions.format ?? "jpeg",
        // Each chunk produces video only — audio is muxed once at assemble
        // time. Suppressing `hasAudio` skips the png-sequence audio sidecar
        // AND the mp4 audio mux.
        hasAudio: false,
        isPngSequence,
        // `DistributedFormat` has no "gif" member — distributed chunks are
        // always video segments (gif renders in-process only).
        isGif: false,
        preset,
        effectiveQuality,
        effectiveBitrate,
        engineConfig: {
          ffmpegEncodeTimeout: cfg.ffmpegEncodeTimeout,
          vp9CpuUsed: resolveLockedVp9CpuUsed(encoder) ?? cfg.vp9CpuUsed
        },
        // Distributed chunks emit a single ffmpeg call per chunk; the
        // in-process per-chunk-within-chunk path would re-split our
        // already-chunked work.
        enableChunkedEncode: false,
        chunkedEncodeSize: framesInChunk,
        abortSignal: void 0,
        assertNotAborted: () => {
        },
        // GOP === framesInChunk + force-keyframe at frame 0 → the chunk's
        // first frame is an IDR keyframe and concat-copy at assemble time
        // round-trips losslessly.
        lockGopForChunkConcat: !isPngSequence,
        gopSize: framesInChunk
      });
      encodeStageMs = Date.now() - encodeStarted;
    } finally {
      if (session) {
        try {
          await closeCaptureSession(session);
        } catch (err) {
          log.warn("[renderChunk] error closing capture session in finally", {
            error: err instanceof Error ? err.message : String(err)
          });
        }
      }
      closeFileServerSafely(fileServer, "renderChunk", log);
    }
    if (!captureMode) {
      throw new Error("[renderChunk] capture stage completed without reporting a capture mode");
    }
    const sha256 = hashChunkOutput(outputChunkPath, outputKind);
    const durationMs = Date.now() - start;
    const perfPath = `${outputChunkPath}.perf.json`;
    const perfPayload = {
      planHash: plan2.planHash,
      chunkIndex,
      startFrame: slice.startFrame,
      endFrame: slice.endFrame,
      framesEncoded,
      durationMs,
      planHashMs,
      sessionBootMs,
      captureStageMs,
      encodeStageMs,
      workers: chunkWorkerCount,
      captureMode,
      sha256,
      outputKind,
      producerVersion: plan2.producerVersion,
      ffmpegVersion
    };
    writeFileSync12(perfPath, `${JSON.stringify(perfPayload, null, 2)}
`, "utf-8");
    try {
      rmSync14(workDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } catch (err) {
      log.warn("[renderChunk] failed to remove work dir", {
        workDir,
        error: err instanceof Error ? err.message : String(err)
      });
    }
    return {
      outputPath: outputChunkPath,
      outputKind,
      framesEncoded,
      sha256,
      durationMs,
      planHashMs,
      sessionBootMs,
      captureStageMs,
      encodeStageMs,
      workers: chunkWorkerCount,
      captureMode,
      perfPath
    };
  } finally {
    envRestore.restore();
  }
}

// ../producer/src/services/distributed/planV2Execution.ts
async function renderChunkV2(planV2Dir, chunkIndex, outputChunkPath) {
  const workRoot = mkdtempSync8(join38(tmpdir5(), "hf-plan-v2-chunk-"));
  const materializedPlanDir = join38(workRoot, "plan");
  try {
    materializePlanV2Target(planV2Dir, { role: "chunk", chunkIndex }, materializedPlanDir);
    return await renderChunk(materializedPlanDir, chunkIndex, outputChunkPath);
  } finally {
    rmSync15(workRoot, { recursive: true, force: true });
  }
}
async function assembleV2(planV2Dir, chunkPaths, outputPath, options) {
  const workRoot = mkdtempSync8(join38(tmpdir5(), "hf-plan-v2-assembler-"));
  const materializedPlanDir = join38(workRoot, "plan");
  try {
    const materialized = materializePlanV2Target(
      planV2Dir,
      { role: "assembler" },
      materializedPlanDir
    );
    return await assemble(
      materializedPlanDir,
      chunkPaths,
      materialized.audioPath,
      outputPath,
      options
    );
  } finally {
    rmSync15(workRoot, { recursive: true, force: true });
  }
}

// ../producer/src/services/distributed/projectHash.ts
import { readdirSync as readdirSync11, readFileSync as readFileSync14 } from "fs";
import { createHash as createHash8 } from "crypto";
import { join as join39, relative as relative8 } from "path";

export {
  createConsoleLogger,
  defaultLogger,
  createFileServer,
  resolveRenderPaths,
  normalizeErrorMessage,
  RENDER_JOB_DIR,
  createOwnedRenderDir,
  listAbandonedRenderDirs,
  collectRenderMedia,
  localizeRemoteMediaSources,
  localizeRemoteImageSources,
  localizeRemoteFontFaces,
  RenderQualityError,
  applyRenderWarningPolicy,
  RenderCancelledError,
  createRenderJob,
  resolveRenderDebugDir,
  executeRenderJob,
  RENDER_REQUEST_VERSION,
  parseRenderRequest,
  serializeRenderRequest,
  createRenderRequest,
  renderConfigFromRequest,
  distributedConfigFromRequest,
  renderRequestFromDistributedConfig,
  prepareHyperframeLintBody,
  runHyperframeLint,
  createRenderHandlers,
  createProducerApp,
  startServer,
  PLAN_SCHEMA_VERSION,
  PLAN_ARTIFACT_LAYOUT,
  PLAN_HASH_SCHEMA,
  PLAN_V2_SCHEMA_VERSION,
  PLAN_V2_ARTIFACT_LAYOUT,
  PLAN_V2_HASH_SCHEMA,
  PLAN_PROTOCOL_UNSUPPORTED,
  PLAN_PROTOCOL_V1,
  CURRENT_PLAN_PROTOCOL,
  PLAN_PROTOCOL_V2,
  DISTRIBUTED_RENDER_CAPABILITIES,
  getDistributedRenderCapabilities,
  PlanProtocolUnsupportedError,
  readPlanProtocol,
  readPlanProtocolV1,
  plan,
  PLAN_V2_INTEGRITY_UNRECOVERABLE,
  PlanV2IntegrityError,
  PLAN_V2_MATERIALIZATION_MARKER,
  createPlanV2FromExecutionPlan,
  createPlanV2FromV1,
  publishPlanV2FromExecutionPlan,
  publishPlanV2FromV1,
  planV2WithPublisher,
  planV2,
  getPlanV2ExecutionPlanHash,
  readPlanV2Manifest,
  listPlanV2ArtifactsForTarget,
  materializePlanV2Target,
  validatePlanV2MaterializedTarget,
  assemble,
  renderChunk,
  renderChunkV2,
  assembleV2
};
