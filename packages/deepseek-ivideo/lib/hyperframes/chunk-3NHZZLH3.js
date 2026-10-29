import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  AUDIO_GROUP_RENDER_ID_ATTR as AUDIO_GROUP_RENDER_ID_ATTR2,
  COLOR_GRADING_SOURCE_HIDDEN_ATTR,
  HF_AUDIO_AUTOMATION_ATTR,
  HF_AUDIO_FX_ATTR,
  MEDIA_RENDER_ID_ATTR as MEDIA_RENDER_ID_ATTR2,
  VOLUME_TARGET,
  enabledAudioFxNodes,
  fxAutomationTarget,
  injectScriptsIntoHtml,
  normalizeAudioFxParams,
  parseAudioFxChain,
  parseAutomation,
  parseHTMLContent,
  resolveAutomation,
  sampleAutomationLane,
  serializeAutomation
} from "./chunk-7QZSGMGW.js";
import {
  clampAudioGain,
  isAudibleVideoElement as isAudibleVideoElement2
} from "./chunk-KKH3A7YS.js";
import {
  LOW_MEMORY_TOTAL_MB_THRESHOLD,
  getSystemTotalMb,
  isLowMemorySystem
} from "./chunk-USDEMXXL.js";
import {
  AUDIO_GROUP_RENDER_ID_ATTR,
  COMPOSITION_SOURCE_URL,
  HF_COLOR_GRADING_CANVAS_ID_PREFIX,
  MEDIA_DURATION_CLAMP_EPSILON_SECONDS,
  MEDIA_RENDER_ID_ATTR,
  MEDIA_VISUAL_STYLE_PROPERTIES,
  RENDER_FRAME_ID_PREFIX,
  RENDER_FRAME_ID_SUFFIX,
  exportClipWindow,
  firstFrameColourArgs,
  fpsToFfmpegArg,
  fpsToNumber,
  hasClipStarted,
  hdrToSdrToneMapFilter,
  isAudibleVideoElement,
  isInClipWindow,
  normalizePlaybackRate,
  normalizeRateSpec,
  parseFirstFrameColour,
  parseStrictFiniteTimingNumber,
  quantizeSeekTime,
  quantizeTimeToFrame,
  readElementRateSpec,
  readMediaStart,
  redactTelemetryString,
  renderFrameIdForRenderId,
  resolveAuthoredTimingWindow,
  shiftRateLane,
  sourceTimeAt,
  timeAtSourceTime,
  toFps
} from "./chunk-SIG2LUMK.js";
import {
  chromeMajorCeiling,
  exceedsChromeCeiling
} from "./chunk-TWWSYAKJ.js";
import {
  isWithinProjectRoot,
  resolveProjectRelativeSrc
} from "./chunk-JFKL3WAE.js";
import {
  parseNumeric,
  parseStartExpression
} from "./chunk-TQFG7HTI.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import {
  FFMPEG_PATH_ENV,
  FFPROBE_PATH_ENV,
  findFfBinary
} from "./chunk-PJ3HDUCY.js";

// ../engine/src/config.ts
import { tmpdir } from "os";
import { join } from "path";

// ../engine/src/services/vp9Options.ts
var DEFAULT_VP9_CPU_USED = 4;
var MIN_VP9_CPU_USED = -8;
var MAX_VP9_CPU_USED = 8;
function normalizeVp9CpuUsed(value) {
  if (value === void 0 || !Number.isFinite(value)) return DEFAULT_VP9_CPU_USED;
  const integer = Math.trunc(value);
  return Math.max(MIN_VP9_CPU_USED, Math.min(MAX_VP9_CPU_USED, integer));
}
function appendVp9CpuUsedArg(args, value) {
  args.push("-cpu-used", String(normalizeVp9CpuUsed(value)));
}

// ../engine/src/config.ts
var DEFAULT_CONFIG = {
  fps: 30,
  quality: "standard",
  format: "jpeg",
  jpegQuality: 80,
  concurrency: "auto",
  coresPerWorker: 2.5,
  minParallelFrames: 120,
  largeRenderThreshold: 1e3,
  disableGpu: false,
  browserGpuMode: "software",
  allowSoftwareWebGpu: false,
  enableBrowserPool: true,
  browserTimeout: 12e4,
  protocolTimeout: 3e5,
  forceScreenshot: false,
  staticFrameDedup: true,
  useDrawElement: true,
  enableDrawElementWorkerEncode: true,
  // Auto-detected per host in `resolveConfig`; defaults off for the raw
  // DEFAULT_CONFIG (used directly by tests and worker-sizing fallbacks).
  lowMemoryMode: false,
  enablePageSideCompositing: true,
  vp9CpuUsed: DEFAULT_VP9_CPU_USED,
  enableChunkedEncode: false,
  chunkSizeFrames: 360,
  enableStreamingEncode: true,
  streamingEncodeMaxDurationSeconds: 240,
  streamingEncodeDurationCapEnabled: false,
  ffmpegEncodeTimeout: 6e5,
  ffmpegProcessTimeout: 3e5,
  ffmpegStreamingTimeout: 6e5,
  hdr: false,
  hdrAutoDetect: true,
  audioGain: 1,
  frameDataUriCacheLimit: 256,
  frameDataUriCacheBytesLimitMb: 1500,
  playerReadyTimeout: 45e3,
  renderReadyTimeout: 15e3,
  pageNavigationTimeout: 6e4,
  verifyRuntime: true,
  extractCacheMaxBytes: 2 * 1024 ** 3,
  debug: false
};
var OPTIONAL_ENGINE_CONFIG_FIELDS = [
  "chromePath",
  "expectedChromiumMajor",
  "pageSideCompositingAutoDisabled",
  "forceScreenshotExplicitlyOptedOut",
  "streamingEncodeAutoDisabledOnWin32Compound",
  "runtimeManifestPath",
  "extractCacheDir"
];
var BOOLEAN_ENGINE_CONFIG_FIELDS = [
  "disableGpu",
  "allowSoftwareWebGpu",
  "enableBrowserPool",
  "forceScreenshot",
  "staticFrameDedup",
  "useDrawElement",
  "enableDrawElementWorkerEncode",
  "lowMemoryMode",
  "enablePageSideCompositing",
  "enableChunkedEncode",
  "enableStreamingEncode",
  "streamingEncodeDurationCapEnabled",
  "hdrAutoDetect",
  "verifyRuntime",
  "debug"
];
var POSITIVE_NUMBER_ENGINE_CONFIG_FIELDS = [
  "browserTimeout",
  "protocolTimeout",
  "chunkSizeFrames",
  "ffmpegEncodeTimeout",
  "ffmpegProcessTimeout",
  "ffmpegStreamingTimeout",
  "frameDataUriCacheLimit",
  "frameDataUriCacheBytesLimitMb",
  "playerReadyTimeout",
  "renderReadyTimeout",
  "pageNavigationTimeout",
  "extractCacheMaxBytes"
];
var ENUM_ENGINE_CONFIG_FIELDS = {
  fps: [24, 30, 60],
  quality: ["draft", "standard", "high"],
  format: ["jpeg", "png"],
  browserGpuMode: ["software", "hardware", "auto"]
};
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
}
function assertEngineConfigNumber(config, field, min, integer = false) {
  const value = config[field];
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || integer && !Number.isInteger(value)) {
    throw new Error(
      `Engine config ${field} must be a ${integer ? "finite integer" : "finite number"} >= ${min}`
    );
  }
}
function assertPositiveEngineConfigNumber(config, field) {
  const value = config[field];
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    throw new Error(`Engine config ${field} must be a finite number > 0`);
  }
}
function assertEngineConfigEnum(config, field, values) {
  if (!values.includes(config[field])) throw new Error(`Engine config ${field} is invalid`);
}
function validateRequiredEngineConfigFields(config) {
  const requiredFields = Object.keys(DEFAULT_CONFIG);
  for (const field of requiredFields) {
    if (!Object.hasOwn(config, field)) {
      throw new Error(`Engine config snapshot is missing required field ${field}`);
    }
  }
  const allowedFields = /* @__PURE__ */ new Set([...requiredFields, ...OPTIONAL_ENGINE_CONFIG_FIELDS]);
  for (const field of Object.keys(config)) {
    if (!allowedFields.has(field))
      throw new Error(`Engine config snapshot has unknown field ${field}`);
  }
}
function validateEngineConfigScalars(config) {
  for (const [field, values] of Object.entries(ENUM_ENGINE_CONFIG_FIELDS)) {
    assertEngineConfigEnum(config, field, values);
  }
  assertEngineConfigNumber(config, "jpegQuality", 0);
  if (typeof config.jpegQuality === "number" && config.jpegQuality > 100) {
    throw new Error("Engine config jpegQuality must be <= 100");
  }
}
function validateEngineConfigParallelism(config) {
  if (config.concurrency !== "auto" && (typeof config.concurrency !== "number" || !Number.isInteger(config.concurrency) || config.concurrency < 1)) {
    throw new Error("Engine config concurrency must be a positive integer or auto");
  }
  assertPositiveEngineConfigNumber(config, "coresPerWorker");
  for (const field of ["minParallelFrames", "largeRenderThreshold"]) {
    assertEngineConfigNumber(config, field, 0, true);
  }
}
function validateEngineConfigVp9(config) {
  if (typeof config.vp9CpuUsed !== "number" || !Number.isInteger(config.vp9CpuUsed) || config.vp9CpuUsed < -8 || config.vp9CpuUsed > 8) {
    throw new Error("Engine config vp9CpuUsed must be an integer in [-8, 8]");
  }
}
function validateEngineConfigRuntime(config) {
  for (const field of BOOLEAN_ENGINE_CONFIG_FIELDS) {
    if (typeof config[field] !== "boolean")
      throw new Error(`Engine config ${field} must be a boolean`);
  }
  for (const field of POSITIVE_NUMBER_ENGINE_CONFIG_FIELDS) {
    assertEngineConfigNumber(config, field, 1, field === "frameDataUriCacheLimit");
  }
  assertEngineConfigNumber(config, "streamingEncodeMaxDurationSeconds", 0);
  assertEngineConfigNumber(config, "audioGain", 0);
}
function validateEngineConfigHdr(config) {
  const { hdr } = config;
  if (hdr !== false && (!isPlainObject(hdr) || Object.keys(hdr).length !== 1 || hdr.transfer !== "hlg" && hdr.transfer !== "pq")) {
    throw new Error("Engine config hdr must be false or an hlg/pq transfer object");
  }
}
function validateOptionalEngineConfigFields(config) {
  for (const field of ["chromePath", "runtimeManifestPath", "extractCacheDir"]) {
    if (config[field] !== void 0 && (typeof config[field] !== "string" || config[field].length === 0)) {
      throw new Error(`Engine config ${field} must be a non-empty string`);
    }
  }
  if (config.expectedChromiumMajor !== void 0) {
    assertEngineConfigNumber(config, "expectedChromiumMajor", 1, true);
  }
  for (const field of [
    "pageSideCompositingAutoDisabled",
    "forceScreenshotExplicitlyOptedOut",
    "streamingEncodeAutoDisabledOnWin32Compound"
  ]) {
    if (config[field] !== void 0 && typeof config[field] !== "boolean") {
      throw new Error(`Engine config ${field} must be a boolean`);
    }
  }
}
function validateEngineConfigSnapshot(value) {
  if (!isPlainObject(value)) throw new Error("Engine config snapshot must be a plain object");
  validateRequiredEngineConfigFields(value);
  validateEngineConfigScalars(value);
  validateEngineConfigParallelism(value);
  validateEngineConfigVp9(value);
  validateEngineConfigRuntime(value);
  validateEngineConfigHdr(value);
  validateOptionalEngineConfigFields(value);
}
var PROTOCOL_TIMEOUT_REFERENCE_PIXELS = 1920 * 1080;
var MAX_SCALED_PROTOCOL_TIMEOUT_MS = 18e5;
function scaleProtocolTimeoutForComposition(baseTimeoutMs, dims) {
  const { width, height } = dims;
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return baseTimeoutMs;
  }
  const factor = width * height / PROTOCOL_TIMEOUT_REFERENCE_PIXELS;
  if (factor <= 1) return baseTimeoutMs;
  const scaled = Math.ceil(baseTimeoutMs * factor);
  const ceiling = Math.max(baseTimeoutMs, MAX_SCALED_PROTOCOL_TIMEOUT_MS);
  return Math.min(ceiling, Math.max(baseTimeoutMs, scaled));
}
function shouldAutoDisableStreamingEncodeOnWin32Compound(opts) {
  if (opts.userExplicitlySet) return false;
  if (opts.platform !== "win32") return false;
  if (!opts.softwareGpuForced) return false;
  if (opts.workers !== 1) return false;
  if (opts.compositionDurationSec !== void 0 && opts.compositionDurationSec <= 120) {
    return false;
  }
  return true;
}
var EXTRACT_CACHE_DIR_DISABLED_ALIASES = ["off", "none", "false", "0"];
function defaultExtractCacheDir() {
  return join(tmpdir(), `hyperframes-extract-cache-${process.getuid?.() ?? "u"}`);
}
function resolveExtractCacheDir(env = process.env) {
  const raw = env["HYPERFRAMES_EXTRACT_CACHE_DIR"];
  if (raw === void 0) {
    return { dir: defaultExtractCacheDir(), disabled: false, source: "default" };
  }
  const normalized = raw.trim().toLowerCase();
  if (EXTRACT_CACHE_DIR_DISABLED_ALIASES.includes(normalized)) {
    return { dir: void 0, disabled: true, source: "env", rawValue: raw };
  }
  return { dir: raw, disabled: false, source: "env", rawValue: raw };
}
function resolveExtractCacheDirFromEnv(env) {
  const raw = env("HYPERFRAMES_EXTRACT_CACHE_DIR");
  return resolveExtractCacheDir(raw === void 0 ? {} : { HYPERFRAMES_EXTRACT_CACHE_DIR: raw }).dir;
}
function memoryAdaptiveCacheLimit() {
  const total = getSystemTotalMb();
  if (total < 4096) return 32;
  if (total <= LOW_MEMORY_TOTAL_MB_THRESHOLD) return 64;
  return DEFAULT_CONFIG.frameDataUriCacheLimit;
}
function memoryAdaptiveCacheBytesMb() {
  const total = getSystemTotalMb();
  if (total < 4096) return 128;
  if (total <= LOW_MEMORY_TOTAL_MB_THRESHOLD) return 256;
  return DEFAULT_CONFIG.frameDataUriCacheBytesLimitMb;
}
function isDrawElementPlatform(platform) {
  return platform === "darwin" || platform === "win32";
}
function resolveDefaultDrawElement(args) {
  if (!args.useDrawElement) return false;
  if (args.explicitOptIn) return true;
  if (args.chromeCeiling !== void 0) return false;
  if (!isDrawElementPlatform(args.platform) || args.browserGpuMode === "software") return false;
  return args.workerEncode;
}
function explainDrawElementDisabled(args) {
  if (!isDrawElementPlatform(args.platform)) return "unsupported_platform";
  if (args.chromeCeiling !== void 0) return "old_chrome";
  if (args.browserGpuMode === "software") return "software_gpu";
  if (!args.workerEncode) return "worker_encode_off";
  return "disabled";
}
function resolveConfig(overrides) {
  const env = (key) => process.env[key];
  const envNum = (key, fallback) => {
    const raw = env(key);
    if (raw === void 0 || raw === "") return fallback;
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  };
  const envBool = (key, fallback) => {
    const raw = env(key);
    if (raw === void 0) return fallback;
    return raw === "true";
  };
  const envVp9CpuUsed = () => {
    const raw = env("PRODUCER_VP9_CPU_USED");
    if (raw === void 0 || raw === "") return DEFAULT_CONFIG.vp9CpuUsed;
    return normalizeVp9CpuUsed(Number(raw));
  };
  const envBrowserGpuMode = () => {
    const raw = env("PRODUCER_BROWSER_GPU_MODE");
    if (raw === "hardware" || raw === "software" || raw === "auto") return raw;
    return DEFAULT_CONFIG.browserGpuMode;
  };
  const resolveLowMemoryMode = () => {
    const raw = env("PRODUCER_LOW_MEMORY_MODE")?.toLowerCase();
    if (raw === "true" || raw === "on" || raw === "1") return true;
    if (raw === "false" || raw === "off" || raw === "0") return false;
    return isLowMemorySystem();
  };
  const resolveStaticFrameDedup = () => {
    const raw = env("HF_STATIC_DEDUP")?.trim().toLowerCase();
    return !(raw === "false" || raw === "off" || raw === "0");
  };
  const fromEnv = {
    concurrency: env("PRODUCER_MAX_WORKERS") ? Number(env("PRODUCER_MAX_WORKERS")) : void 0,
    coresPerWorker: envNum("PRODUCER_CORES_PER_WORKER", DEFAULT_CONFIG.coresPerWorker),
    minParallelFrames: envNum("PRODUCER_MIN_PARALLEL_FRAMES", DEFAULT_CONFIG.minParallelFrames),
    largeRenderThreshold: envNum(
      "PRODUCER_LARGE_RENDER_THRESHOLD",
      DEFAULT_CONFIG.largeRenderThreshold
    ),
    chromePath: env("PRODUCER_HEADLESS_SHELL_PATH"),
    disableGpu: envBool("PRODUCER_DISABLE_GPU", DEFAULT_CONFIG.disableGpu),
    browserGpuMode: envBrowserGpuMode(),
    allowSoftwareWebGpu: envBool(
      "PRODUCER_ALLOW_SOFTWARE_WEBGPU",
      DEFAULT_CONFIG.allowSoftwareWebGpu
    ),
    enableBrowserPool: envBool("PRODUCER_ENABLE_BROWSER_POOL", DEFAULT_CONFIG.enableBrowserPool),
    browserTimeout: envNum("PRODUCER_PUPPETEER_LAUNCH_TIMEOUT_MS", DEFAULT_CONFIG.browserTimeout),
    protocolTimeout: envNum(
      "PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS",
      DEFAULT_CONFIG.protocolTimeout
    ),
    expectedChromiumMajor: env("PRODUCER_EXPECTED_CHROMIUM_MAJOR") ? Number(env("PRODUCER_EXPECTED_CHROMIUM_MAJOR")) : void 0,
    forceScreenshot: envBool("PRODUCER_FORCE_SCREENSHOT", DEFAULT_CONFIG.forceScreenshot),
    staticFrameDedup: resolveStaticFrameDedup(),
    useDrawElement: envBool("PRODUCER_EXPERIMENTAL_FAST_CAPTURE", DEFAULT_CONFIG.useDrawElement),
    enableDrawElementWorkerEncode: envBool(
      "HF_DE_WORKER_ENCODE",
      DEFAULT_CONFIG.enableDrawElementWorkerEncode
    ),
    lowMemoryMode: resolveLowMemoryMode(),
    enablePageSideCompositing: envBool(
      "HF_PAGE_SIDE_COMPOSITING",
      DEFAULT_CONFIG.enablePageSideCompositing
    ),
    vp9CpuUsed: envVp9CpuUsed(),
    enableChunkedEncode: envBool(
      "PRODUCER_ENABLE_CHUNKED_ENCODE",
      DEFAULT_CONFIG.enableChunkedEncode
    ),
    chunkSizeFrames: Math.max(
      120,
      envNum("PRODUCER_CHUNK_SIZE_FRAMES", DEFAULT_CONFIG.chunkSizeFrames)
    ),
    enableStreamingEncode: envBool(
      "PRODUCER_ENABLE_STREAMING_ENCODE",
      DEFAULT_CONFIG.enableStreamingEncode
    ),
    streamingEncodeMaxDurationSeconds: Math.max(
      0,
      envNum(
        "PRODUCER_STREAMING_ENCODE_MAX_DURATION_SECONDS",
        DEFAULT_CONFIG.streamingEncodeMaxDurationSeconds
      )
    ),
    streamingEncodeDurationCapEnabled: envBool(
      "PRODUCER_STREAMING_ENCODE_DURATION_CAP_ENABLED",
      DEFAULT_CONFIG.streamingEncodeDurationCapEnabled
    ),
    ffmpegEncodeTimeout: envNum("FFMPEG_ENCODE_TIMEOUT_MS", DEFAULT_CONFIG.ffmpegEncodeTimeout),
    ffmpegProcessTimeout: envNum("FFMPEG_PROCESS_TIMEOUT_MS", DEFAULT_CONFIG.ffmpegProcessTimeout),
    ffmpegStreamingTimeout: envNum(
      "FFMPEG_STREAMING_TIMEOUT_MS",
      DEFAULT_CONFIG.ffmpegStreamingTimeout
    ),
    hdr: (() => {
      const raw = env("PRODUCER_HDR_TRANSFER");
      if (raw === "hlg" || raw === "pq") return { transfer: raw };
      return false;
    })(),
    hdrAutoDetect: envBool("PRODUCER_HDR_AUTO_DETECT", DEFAULT_CONFIG.hdrAutoDetect),
    audioGain: envNum("PRODUCER_AUDIO_GAIN", DEFAULT_CONFIG.audioGain),
    frameDataUriCacheLimit: Math.max(
      32,
      envNum("PRODUCER_FRAME_DATA_URI_CACHE_LIMIT", memoryAdaptiveCacheLimit())
    ),
    frameDataUriCacheBytesLimitMb: Math.max(
      64,
      envNum("PRODUCER_FRAME_DATA_URI_CACHE_BYTES_MB", memoryAdaptiveCacheBytesMb())
    ),
    playerReadyTimeout: envNum(
      "PRODUCER_PLAYER_READY_TIMEOUT_MS",
      DEFAULT_CONFIG.playerReadyTimeout
    ),
    renderReadyTimeout: envNum(
      "PRODUCER_RENDER_READY_TIMEOUT_MS",
      DEFAULT_CONFIG.renderReadyTimeout
    ),
    pageNavigationTimeout: envNum(
      "PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS",
      DEFAULT_CONFIG.pageNavigationTimeout
    ),
    verifyRuntime: env("PRODUCER_VERIFY_HYPERFRAME_RUNTIME") !== "false",
    runtimeManifestPath: env("PRODUCER_HYPERFRAME_MANIFEST_PATH"),
    extractCacheDir: resolveExtractCacheDirFromEnv(env),
    extractCacheMaxBytes: envNum("HYPERFRAMES_EXTRACT_CACHE_MAX_MB", DEFAULT_CONFIG.extractCacheMaxBytes / 1024 ** 2) * 1024 ** 2
  };
  const cleanEnv = Object.fromEntries(Object.entries(fromEnv).filter(([, v]) => v !== void 0));
  const merged = {
    ...DEFAULT_CONFIG,
    ...cleanEnv,
    ...overrides
  };
  const explicitDrawElementOptIn = env("PRODUCER_EXPERIMENTAL_FAST_CAPTURE") === "true" || overrides?.useDrawElement === true;
  merged.useDrawElement = resolveDefaultDrawElement({
    useDrawElement: merged.useDrawElement,
    explicitOptIn: explicitDrawElementOptIn,
    platform: process.platform,
    browserGpuMode: merged.browserGpuMode,
    workerEncode: merged.enableDrawElementWorkerEncode,
    chromeCeiling: chromeMajorCeiling()
  });
  const explicitForceScreenshotOptOut = env("PRODUCER_FORCE_SCREENSHOT") === "false" || overrides?.forceScreenshot === false;
  if (explicitForceScreenshotOptOut) {
    merged.forceScreenshotExplicitlyOptedOut = true;
  }
  if (merged.browserGpuMode === "software" && !merged.forceScreenshot && !explicitForceScreenshotOptOut) {
    merged.forceScreenshot = true;
  }
  const streamingEncodeUserExplicitlySet = env("PRODUCER_ENABLE_STREAMING_ENCODE") !== void 0 || overrides?.enableStreamingEncode !== void 0;
  const softwareGpuForced = merged.browserGpuMode === "software" || merged.disableGpu || merged.lowMemoryMode;
  const resolvedWorkers = typeof merged.concurrency === "number" ? merged.concurrency : NaN;
  if (merged.enableStreamingEncode && shouldAutoDisableStreamingEncodeOnWin32Compound({
    platform: process.platform,
    softwareGpuForced,
    workers: resolvedWorkers,
    compositionDurationSec: void 0,
    userExplicitlySet: streamingEncodeUserExplicitlySet
  })) {
    merged.enableStreamingEncode = false;
    merged.streamingEncodeAutoDisabledOnWin32Compound = true;
    console.error(
      "[hyperframes] Windows compound-workaround auto-detected \u2014 disabling streaming-encode (platform=win32, software-GPU forced, workers=1). Field signal ts=1784131903. Override: PRODUCER_ENABLE_STREAMING_ENCODE=true."
    );
  }
  if (merged.useDrawElement && merged.enablePageSideCompositing) {
    merged.enablePageSideCompositing = false;
    merged.pageSideCompositingAutoDisabled = true;
  }
  return {
    ...merged,
    vp9CpuUsed: normalizeVp9CpuUsed(merged.vp9CpuUsed)
  };
}
function shouldClampToScreenshotForConcreteGpu(resolvedGpuMode, currentForceScreenshot, env = process.env, opts = {}) {
  if (currentForceScreenshot) return false;
  if (resolvedGpuMode !== "software") return false;
  if (opts.programmaticOptOut) return false;
  return env["PRODUCER_FORCE_SCREENSHOT"] !== "false";
}
function applyConcreteGpuScreenshotClamp(currentForceScreenshot, resolvedGpuMode, cfg, env = process.env) {
  return currentForceScreenshot || shouldClampToScreenshotForConcreteGpu(resolvedGpuMode, currentForceScreenshot, env, {
    programmaticOptOut: cfg?.forceScreenshotExplicitlyOptedOut ?? false
  });
}

// ../engine/src/services/browserManager.ts
import { execSync } from "child_process";
import { existsSync, readdirSync } from "fs";
import { join as join2 } from "path";
import { homedir } from "os";

// ../engine/src/services/browserLeasePool.ts
function freezeFingerprint(fingerprint) {
  return Object.freeze({
    ...fingerprint,
    args: Object.freeze([...fingerprint.args])
  });
}
function fingerprintKey(fingerprint) {
  return JSON.stringify([
    fingerprint.args,
    fingerprint.executablePath ?? null,
    fingerprint.browserTimeoutMs,
    fingerprint.protocolTimeoutMs,
    fingerprint.requestedCaptureMode
  ]);
}
var BrowserLeasePool = class _BrowserLeasePool {
  constructor(options) {
    this.options = options;
  }
  options;
  /** Under the CLI's 3s exit watchdog, alongside the render-wait bound it races. */
  static DRAIN_FORCE_CLOSE_MS = 1e3;
  available = /* @__PURE__ */ new Map();
  entries = /* @__PURE__ */ new Set();
  leasesByBrowser = /* @__PURE__ */ new Map();
  drainPromise = null;
  closed = false;
  async acquire(fingerprintInput, pooled) {
    if (this.closed) throw new Error("Browser pool is closed; no new browsers can be acquired");
    if (this.drainPromise) await this.drainPromise;
    if (this.closed) throw new Error("Browser pool is closed; no new browsers can be acquired");
    const fingerprint = freezeFingerprint(fingerprintInput);
    const entry = this.reserveEntry(fingerprint, pooled);
    return this.issueLease(entry);
  }
  async issueLease(entry) {
    try {
      const result = await entry.launchPromise;
      if (entry.state !== "ready") {
        throw new Error("Browser pool drained during acquisition");
      }
      return this.createLease(entry, result);
    } catch (error) {
      entry.refCount = Math.max(0, entry.refCount - 1);
      throw error;
    }
  }
  reserveEntry(fingerprint, pooled) {
    const key = fingerprintKey(fingerprint);
    let entry = pooled ? this.available.get(key) : void 0;
    if (entry?.state === "ready" && !entry.result?.browser.connected) {
      this.requestClose(entry, true);
      entry = void 0;
    }
    if (!entry || entry.state === "closing") return this.createEntry(key, fingerprint, pooled);
    entry.refCount += 1;
    return entry;
  }
  /** Preserve legacy release-by-handle only when ownership is unambiguous. */
  async releaseByBrowser(browser) {
    const leases = this.leasesByBrowser.get(browser);
    if (leases?.size === 1) {
      const lease = leases.values().next().value;
      await lease.release();
      return;
    }
    if (leases) {
      throw new Error(
        `Cannot release a pooled browser by handle while ${leases.size} leases are active; release the owning BrowserLease instead`
      );
    }
    await this.options.close(browser).catch(() => {
    });
  }
  /** Preserve the legacy ambiguous-handle no-op without closing another owner's browser. */
  forceReleaseByBrowser(browser) {
    const leases = this.leasesByBrowser.get(browser);
    if (leases?.size === 1) {
      const lease = leases.values().next().value;
      lease.forceRelease();
      return;
    }
    if (leases) return;
    this.options.forceClose(browser);
  }
  drain() {
    if (this.drainPromise) return this.drainPromise;
    const entries = [...this.entries];
    for (const entry of entries) this.requestClose(entry, false);
    const settle = Promise.all(entries.map((entry) => entry.closePromise));
    const bound = new Promise(
      (resolve) => setTimeout(resolve, _BrowserLeasePool.DRAIN_FORCE_CLOSE_MS).unref()
    );
    this.drainPromise = Promise.race([settle, bound]).then(() => {
      for (const entry of entries) if (this.entries.has(entry)) this.requestClose(entry, true);
      return settle;
    }).then(() => {
      this.drainPromise = null;
    });
    return this.drainPromise;
  }
  /** Terminal: drains every entry and refuses every `acquire()` after. */
  close() {
    this.closed = true;
    return this.drain();
  }
  /** Test-only state reset. Call `drain()` first when entries own real browsers. */
  reset() {
    this.available.clear();
    this.entries.clear();
    this.leasesByBrowser.clear();
    this.drainPromise = null;
    this.closed = false;
  }
  createEntry(key, fingerprint, pooled) {
    const entry = {
      key,
      fingerprint,
      pooled,
      state: "launching",
      refCount: 1,
      closeRequested: false,
      forceCloseRequested: false,
      launchPromise: void 0
    };
    entry.launchPromise = this.options.launch(fingerprint).then(
      (result) => {
        entry.result = result;
        if (entry.closeRequested) {
          entry.state = "closing";
        } else {
          entry.state = "ready";
        }
        return result;
      },
      (error) => {
        if (this.available.get(key) === entry) this.available.delete(key);
        this.entries.delete(entry);
        throw error;
      }
    );
    this.entries.add(entry);
    if (pooled) this.available.set(key, entry);
    return entry;
  }
  createLease(entry, result) {
    let active = true;
    let lease;
    const deactivate = (force) => {
      if (!active) return false;
      active = false;
      this.removeLease(result.browser, lease);
      entry.refCount = Math.max(0, entry.refCount - 1);
      if (entry.refCount === 0) this.requestClose(entry, force);
      return true;
    };
    lease = {
      ...result,
      fingerprint: entry.fingerprint,
      release: async () => {
        if (!deactivate(false)) return;
        await entry.closePromise;
      },
      forceRelease: () => {
        if (!deactivate(true) && entry.refCount === 0 && entry.closePromise) {
          this.requestClose(entry, true);
        }
      }
    };
    const leases = this.leasesByBrowser.get(result.browser) ?? /* @__PURE__ */ new Set();
    leases.add(lease);
    this.leasesByBrowser.set(result.browser, leases);
    return lease;
  }
  requestClose(entry, force) {
    if (force) {
      entry.forceCloseRequested = true;
      entry.forceClose?.();
    }
    if (entry.closePromise) return;
    entry.closeRequested = true;
    if (this.available.get(entry.key) === entry) this.available.delete(entry.key);
    entry.closePromise = entry.launchPromise.then(async (result) => {
      entry.state = "closing";
      if (entry.forceCloseRequested) {
        this.options.forceClose(result.browser);
      } else {
        await Promise.race([
          this.options.close(result.browser).catch(() => {
          }),
          new Promise((resolve) => {
            entry.forceClose = () => {
              entry.forceClose = void 0;
              this.options.forceClose(result.browser);
              resolve();
            };
          })
        ]);
      }
    }).catch(() => {
    }).finally(() => {
      entry.forceClose = void 0;
      this.entries.delete(entry);
      if (entry.result) this.leasesByBrowser.delete(entry.result.browser);
    });
  }
  removeLease(browser, lease) {
    const leases = this.leasesByBrowser.get(browser);
    if (!leases) return;
    leases.delete(lease);
    if (leases.size === 0) this.leasesByBrowser.delete(browser);
  }
};

// ../engine/src/services/browserManager.ts
var _puppeteer;
var hostHandlesSigint = false;
function setHostHandlesSigint(owned) {
  hostHandlesSigint = owned;
}
var sigintLaunchOptions = () => ({ handleSIGINT: !hostHandlesSigint });
function isSoftwareWebGlRenderer(rendererInfo) {
  const renderer = rendererInfo.trim().toLowerCase();
  return renderer.includes("swiftshader") || renderer.includes("llvmpipe") || renderer.includes("lavapipe") || renderer.includes("softpipe") || renderer.includes("mesa offscreen") || renderer.includes("microsoft basic render driver") || renderer.includes("software rasterizer");
}
async function getPuppeteer() {
  if (_puppeteer) return _puppeteer;
  try {
    const mod = await import("puppeteer");
    _puppeteer = mod.default;
  } catch {
    const mod = await import("puppeteer-core");
    _puppeteer = mod.default;
  }
  if (!_puppeteer) throw new Error("Neither puppeteer nor puppeteer-core found");
  return _puppeteer;
}
async function probeHardwareWebGlInfo(ppt, options) {
  let probeBrowser;
  try {
    probeBrowser = await ppt.launch({
      ...sigintLaunchOptions(),
      headless: true,
      args: options.args,
      defaultViewport: { width: 64, height: 64 },
      executablePath: options.executablePath,
      timeout: options.browserTimeout
    });
    const page = await probeBrowser.newPage();
    return await page.evaluate(() => {
      const unavailable = { hasWebGL: false, vendor: "", renderer: "" };
      const c = document.createElement("canvas");
      let gl = c.getContext("webgl");
      if (gl === null) {
        gl = c.getContext("experimental-webgl");
      }
      if (gl === null) return unavailable;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      let vendorParam = gl.VENDOR;
      let rendererParam = gl.RENDERER;
      if (ext !== null) {
        vendorParam = ext.UNMASKED_VENDOR_WEBGL;
        rendererParam = ext.UNMASKED_RENDERER_WEBGL;
      }
      const vendor = gl.getParameter(vendorParam);
      const renderer = gl.getParameter(rendererParam);
      return {
        hasWebGL: true,
        vendor: vendor == null ? "" : String(vendor),
        renderer: renderer == null ? "" : String(renderer)
      };
    });
  } finally {
    await probeBrowser?.close().catch(() => {
    });
  }
}
function compareBrowserVersionsDescending(left, right) {
  const parse = (value) => {
    const version = value.slice(value.indexOf("-") + 1);
    const segments = [];
    for (const segment of version.split(".")) {
      const parsed = Number.parseInt(segment, 10);
      if (!Number.isFinite(parsed)) break;
      segments.push(parsed);
    }
    return segments;
  };
  const leftSegments = parse(left);
  const rightSegments = parse(right);
  const length = Math.max(leftSegments.length, rightSegments.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (rightSegments[index] ?? 0) - (leftSegments[index] ?? 0);
    if (difference !== 0) return difference;
  }
  return 0;
}
var CACHED_HEADLESS_SHELL_EXECUTABLES = {
  "darwin/arm64": ["chrome-headless-shell-mac-arm64", "chrome-headless-shell"],
  "darwin/x64": ["chrome-headless-shell-mac-x64", "chrome-headless-shell"],
  "linux/x64": ["chrome-headless-shell-linux64", "chrome-headless-shell"],
  "win32/ia32": ["chrome-headless-shell-win32", "chrome-headless-shell.exe"],
  "win32/x64": ["chrome-headless-shell-win64", "chrome-headless-shell.exe"]
};
function cachedHeadlessShellExecutable(hostPlatform = process.platform, hostArch = process.arch) {
  return CACHED_HEADLESS_SHELL_EXECUTABLES[`${hostPlatform}/${hostArch}`];
}
function findCachedHeadlessShell(baseDir) {
  if (!existsSync(baseDir)) return void 0;
  const executable = cachedHeadlessShellExecutable();
  if (!executable) return void 0;
  try {
    const ceiling = chromeMajorCeiling();
    const versions = readdirSync(baseDir).sort(compareBrowserVersionsDescending);
    for (const version of versions) {
      if (exceedsChromeCeiling(version, ceiling)) continue;
      const binary = join2(baseDir, version, ...executable);
      if (existsSync(binary)) return binary;
    }
  } catch {
  }
  return void 0;
}
function resolveHeadlessShellPath(config) {
  if (config?.chromePath) {
    return config.chromePath;
  }
  if (process.env.PRODUCER_HEADLESS_SHELL_PATH) {
    const envPath = process.env.PRODUCER_HEADLESS_SHELL_PATH;
    if (!existsSync(envPath)) {
      throw new Error(
        `[BrowserManager] Chrome binary not found at PRODUCER_HEADLESS_SHELL_PATH="${envPath}". Run \`hyperframes browser ensure\` to re-download.`
      );
    }
    return envPath;
  }
  if (process.env.HYPERFRAMES_BROWSER_PATH) {
    const envPath = process.env.HYPERFRAMES_BROWSER_PATH;
    if (!existsSync(envPath)) {
      throw new Error(
        `[BrowserManager] Chrome binary not found at HYPERFRAMES_BROWSER_PATH="${envPath}". Run \`hyperframes browser ensure\` to re-download.`
      );
    }
    return envPath;
  }
  const home = homedir();
  return findCachedHeadlessShell(
    join2(home, ".cache", "hyperframes", "chrome", "chrome-headless-shell")
  ) ?? findCachedHeadlessShell(join2(home, ".cache", "puppeteer", "chrome-headless-shell"));
}
var ENABLE_BROWSER_POOL = DEFAULT_CONFIG.enableBrowserPool;
var BEGINFRAME_ONLY_FLAGS = /* @__PURE__ */ new Set([
  "--deterministic-mode",
  "--enable-begin-frame-control",
  "--disable-new-content-rendering-timeout",
  "--run-all-compositor-stages-before-draw",
  "--disable-threaded-animation",
  "--disable-threaded-scrolling",
  "--disable-checker-imaging",
  "--disable-image-animation-resync",
  "--enable-surface-synchronization"
]);
function stripBeginFrameFlags(args) {
  return args.filter((a) => !BEGINFRAME_ONLY_FLAGS.has(a));
}
var BEGINFRAME_SCREENSHOT_PROBE_ATTEMPTS = 10;
var BEGINFRAME_PROBE_TIMEOUT_MS = 2e3;
var BEGINFRAME_PROBE_CLEANUP_TIMEOUT_MS = 250;
async function awaitBeforeDeadline(operation, deadline, label) {
  const remainingMs = deadline - Date.now();
  if (remainingMs <= 0) {
    throw new Error(`beginFrame probe timeout before ${label}`);
  }
  let timeout;
  try {
    return await Promise.race([
      operation,
      new Promise((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error(`beginFrame probe timeout during ${label}`)),
          remainingMs
        );
      })
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
async function settleWithin(operation, timeoutMs) {
  let timeout;
  try {
    return await Promise.race([
      operation.then(
        () => true,
        () => false
      ),
      new Promise((resolveTimeout) => {
        timeout = setTimeout(() => resolveTimeout(false), timeoutMs);
      })
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
async function closeBrowserAfterFailedProbe(browser, timeoutMs = BEGINFRAME_PROBE_CLEANUP_TIMEOUT_MS) {
  if (await settleWithin(browser.close(), timeoutMs)) return;
  try {
    browser.process()?.kill("SIGKILL");
  } catch {
  }
  await settleWithin(browser.disconnect(), timeoutMs);
}
async function probeBeginFrameSupport(browser, timeoutMs = BEGINFRAME_PROBE_TIMEOUT_MS) {
  const started = Date.now();
  const deadline = started + timeoutMs;
  let page;
  let result;
  try {
    page = await awaitBeforeDeadline(browser.newPage(), deadline, "newPage");
    await awaitBeforeDeadline(
      page.goto(
        "data:text/html,<style>html,body{margin:0;background:%23173}</style><div>hf-beginframe-probe</div>",
        { waitUntil: "domcontentloaded", timeout: timeoutMs }
      ),
      deadline,
      "navigation"
    );
    const client = await awaitBeforeDeadline(
      page.createCDPSession(),
      deadline,
      "CDP session creation"
    );
    await awaitBeforeDeadline(
      client.send("HeadlessExperimental.enable"),
      deadline,
      "HeadlessExperimental.enable"
    );
    await awaitBeforeDeadline(
      client.send("HeadlessExperimental.beginFrame", {
        frameTimeTicks: 0,
        interval: 33,
        noDisplayUpdates: true
      }),
      deadline,
      "warm-up beginFrame"
    );
    let bytes = Buffer.alloc(0);
    let isPng = false;
    let attempts = 0;
    for (attempts = 1; attempts <= BEGINFRAME_SCREENSHOT_PROBE_ATTEMPTS; attempts += 1) {
      const response = await awaitBeforeDeadline(
        client.send("HeadlessExperimental.beginFrame", {
          frameTimeTicks: 1e3 + (attempts - 1) * 33,
          interval: 33,
          screenshot: { format: "png" }
        }),
        deadline,
        `screenshot beginFrame attempt ${attempts}`
      );
      const screenshot = response.screenshotData ?? "";
      bytes = screenshot ? Buffer.from(screenshot, "base64") : Buffer.alloc(0);
      isPng = bytes.length >= 8 && bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
      if (isPng) break;
      await awaitBeforeDeadline(
        new Promise((resolveDelay) => setTimeout(resolveDelay, 10)),
        deadline,
        `screenshot retry delay ${attempts}`
      );
    }
    if (!isPng) {
      throw new Error(
        `beginFrame screenshot returned ${bytes.length} bytes after ${BEGINFRAME_SCREENSHOT_PROBE_ATTEMPTS} attempts with signature ${bytes.length >= 4 ? bytes.subarray(0, 4).toString("hex") : "<empty>"}`
      );
    }
    await awaitBeforeDeadline(client.detach(), deadline, "CDP detach").catch(() => {
    });
    result = {
      supported: true,
      detail: `enable + warm-up + ${bytes.length}-byte PNG beginFrame succeeded after ${attempts} screenshot attempt(s)`,
      durationMs: Date.now() - started
    };
  } catch (error) {
    result = {
      supported: false,
      detail: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - started
    };
  }
  if (page && !await settleWithin(page.close(), BEGINFRAME_PROBE_CLEANUP_TIMEOUT_MS)) {
    return {
      supported: false,
      detail: `${result.detail}; probe page cleanup timed out`,
      durationMs: Date.now() - started
    };
  }
  return result;
}
var _autoBrowserGpuModeCache;
async function getPuppeteerOrNull() {
  try {
    return await getPuppeteer();
  } catch {
    return null;
  }
}
function getHardwareGpuProbeArgs(platform) {
  return [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
    ...getBrowserGpuArgs("hardware", platform)
  ];
}
function resolveWebGlProbeMode(info) {
  if (!info.hasWebGL) return "software";
  if (!info.vendor.trim() && !info.renderer.trim()) return "software";
  return isSoftwareWebGlRenderer(info.renderer) ? "software" : "hardware";
}
function describeWebGlProbe(info) {
  if (!info.hasWebGL) return "WebGL unavailable";
  return `WebGL renderer vendor=${JSON.stringify(info.vendor)} renderer=${JSON.stringify(info.renderer)}`;
}
function formatProbeFailure(err) {
  return `probe failed (${err instanceof Error ? err.message : String(err)})`;
}
async function probeAutoBrowserGpuMode(options) {
  const platform = options.platform ?? process.platform;
  const browserTimeout = options.browserTimeout ?? DEFAULT_CONFIG.browserTimeout;
  const executablePath = options.chromePath ?? resolveHeadlessShellPath({});
  const ppt = await getPuppeteerOrNull();
  if (ppt === null) {
    logResolvedBrowserGpuMode("software", "puppeteer unavailable");
    return { mode: "software", cause: "probe-error" };
  }
  try {
    const info = await probeHardwareWebGlInfo(ppt, {
      args: getHardwareGpuProbeArgs(platform),
      browserTimeout,
      executablePath
    });
    const resolved = resolveWebGlProbeMode(info);
    logResolvedBrowserGpuMode(resolved, describeWebGlProbe(info));
    return resolved === "hardware" ? { mode: "hardware" } : { mode: "software", cause: "no-gpu" };
  } catch (err) {
    logResolvedBrowserGpuMode("software", formatProbeFailure(err));
    return { mode: "software", cause: "probe-error" };
  }
}
function resolveBrowserGpuMode(mode, options = {}) {
  if (mode === "software") return Promise.resolve(mode);
  _autoBrowserGpuModeCache ??= probeAutoBrowserGpuMode(options);
  if (mode === "auto") return _autoBrowserGpuModeCache.then((probed) => probed.mode);
  return _autoBrowserGpuModeCache.then((probed) => {
    if (probed.mode === "software" && !_unverifiedHardwareGpuWarned) {
      _unverifiedHardwareGpuWarned = true;
      console.warn(
        buildUnverifiedHardwareGpuWarning(options.platform ?? process.platform, probed.cause)
      );
    }
    return "hardware";
  });
}
var _unverifiedHardwareGpuWarned = false;
function buildUnverifiedHardwareGpuWarning(platform, cause) {
  if (cause === "probe-error") {
    return "[hyperframes] browserGpuMode=hardware was requested, but the GPU probe could not run, so hardware acceleration is UNVERIFIED \u2014 if Chrome falls back to software WebGL the capture will run at CPU speed. Honouring the explicit request anyway.\n  This is a probe failure, not evidence of a missing GPU: see the `browserGpuMode probe \u2192 software (probe failed ...)` line above for the underlying error, which usually means Chrome could not launch (bad HYPERFRAMES_BROWSER_PATH, missing shared libraries, or a denied sandbox) rather than a GPU problem.\n  Run `hyperframes doctor` to check the Chrome install.";
  }
  const remediation = platform === "linux" ? "Inside Docker, the container needs GPU passthrough: `--gpus all` with the NVIDIA Container Toolkit installed, or `--device /dev/dri` for Mesa/AMD/Intel. The image also needs the matching userspace driver + libEGL. Verify with `hyperframes render --browser-gpu` and watch for this warning disappearing." : "Check that the host exposes a GPU to this process and that the graphics drivers are installed.";
  return `[hyperframes] browserGpuMode=hardware was requested, but the WebGL probe found no hardware GPU \u2014 Chrome will silently fall back to software WebGL and the capture will run at CPU speed. Honouring the explicit request anyway.
  ${remediation}
  Pass --no-browser-gpu to select deterministic SwiftShader instead of waiting on a hardware path that is not there.`;
}
function logResolvedBrowserGpuMode(resolved, reason) {
  console.error(`[hyperframes] browserGpuMode probe \u2192 ${resolved} (${reason})`);
}
function createBrowserLaunchFingerprint(chromeArgs, config) {
  const launchConfig = {
    browserTimeout: DEFAULT_CONFIG.browserTimeout,
    protocolTimeout: DEFAULT_CONFIG.protocolTimeout,
    forceScreenshot: DEFAULT_CONFIG.forceScreenshot,
    ...config
  };
  const headlessShell = resolveHeadlessShellPath(launchConfig);
  const beginFrameControlEnabled = chromeArgs.includes("--enable-begin-frame-control");
  const requestedCaptureMode = headlessShell && process.platform === "linux" && !launchConfig.forceScreenshot && beginFrameControlEnabled ? "beginframe" : "screenshot";
  return {
    args: chromeArgs,
    executablePath: headlessShell,
    browserTimeoutMs: launchConfig.browserTimeout,
    protocolTimeoutMs: launchConfig.protocolTimeout,
    requestedCaptureMode
  };
}
async function acquireBrowser(chromeArgs, config) {
  const enablePool = config?.enableBrowserPool ?? DEFAULT_CONFIG.enableBrowserPool;
  return browserLeasePool.acquire(createBrowserLaunchFingerprint(chromeArgs, config), enablePool);
}
async function launchBrowser(fingerprint) {
  const ppt = await getPuppeteer();
  let captureMode = fingerprint.requestedCaptureMode;
  let browser;
  try {
    browser = await ppt.launch({
      ...sigintLaunchOptions(),
      headless: true,
      args: [...fingerprint.args],
      defaultViewport: null,
      executablePath: fingerprint.executablePath,
      timeout: fingerprint.browserTimeoutMs,
      protocolTimeout: fingerprint.protocolTimeoutMs
    });
    const browserVersion = await browser.version().catch(() => "unknown");
    const gpuFlags = fingerprint.args.filter(
      (a) => a.startsWith("--use-gl=") || a.startsWith("--use-angle=")
    );
    console.log(
      `[BrowserManager] Browser launched (${browserVersion}, ${captureMode}, gl=${gpuFlags.join(" ") || "default"}, headlessShell=${!!fingerprint.executablePath}, platform=${process.platform})`
    );
    if (captureMode === "beginframe") {
      const probe = await probeBeginFrameSupport(browser).catch((error) => ({
        supported: true,
        detail: `probe harness error ignored: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: 0
      }));
      if (!probe.supported) {
        await closeBrowserAfterFailedProbe(browser);
        browser = void 0;
        console.warn(
          `[BrowserManager] HeadlessExperimental.beginFrame probe failed after ${probe.durationMs}ms: ${probe.detail}; falling back to screenshot mode.`
        );
        captureMode = "screenshot";
        browser = await ppt.launch({
          ...sigintLaunchOptions(),
          headless: true,
          args: stripBeginFrameFlags([...fingerprint.args]),
          defaultViewport: null,
          executablePath: fingerprint.executablePath,
          timeout: fingerprint.browserTimeoutMs,
          protocolTimeout: fingerprint.protocolTimeoutMs
        });
      }
    }
    return { browser, captureMode };
  } catch (error) {
    await browser?.close().catch(() => {
    });
    throw error;
  }
}
function forceCloseBrowserProcess(browser) {
  const proc = browser.process?.();
  if (proc && !proc.killed) {
    try {
      proc.kill("SIGKILL");
    } catch {
    }
  }
  try {
    browser.disconnect();
  } catch {
  }
}
var browserLeasePool = new BrowserLeasePool({
  launch: launchBrowser,
  close: async (browser) => browser.close(),
  forceClose: forceCloseBrowserProcess
});
async function releaseBrowser(browser, _config) {
  await browserLeasePool.releaseByBrowser(browser);
}
function forceReleaseBrowser(browser) {
  browserLeasePool.forceReleaseByBrowser(browser);
}
async function drainBrowserPool() {
  await browserLeasePool.drain();
}
async function closeBrowserPool() {
  await browserLeasePool.close();
}
var _cachedVramMb = null;
function probeNvidiaVramMb() {
  if (_cachedVramMb !== null) return _cachedVramMb;
  try {
    const out = execSync("nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits", {
      timeout: 3e3,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true
    }).trim();
    const mb = parseInt(out.split("\n")[0] ?? "", 10);
    if (Number.isFinite(mb) && mb > 0) {
      _cachedVramMb = mb;
      return mb;
    }
  } catch {
  }
  return null;
}
function getGpuMemBudgetMb() {
  const vram = probeNvidiaVramMb();
  if (vram) return Math.min(vram, 16384);
  const total = getSystemTotalMb();
  if (total < 4096) return 512;
  if (total <= LOW_MEMORY_TOTAL_MB_THRESHOLD) return 1024;
  return Math.min(Math.floor(total / 2), 16384);
}
function getLowMemoryFlags() {
  const total = getSystemTotalMb();
  if (total > LOW_MEMORY_TOTAL_MB_THRESHOLD) return [];
  const heapMb = total < 4096 ? 256 : 512;
  return [`--js-flags=--max-old-space-size=${heapMb}`];
}
var CANVAS_DRAW_ELEMENT_FEATURE_FLAG = "--enable-features=CanvasDrawElement";
var WEBGPU_FLAG = "--enable-unsafe-webgpu";
function usesSoftwareWebGpu(requiresWebGpu, config) {
  return !!requiresWebGpu && !!config?.allowSoftwareWebGpu && !(config.disableGpu ?? DEFAULT_CONFIG.disableGpu) && (config.browserGpuMode ?? DEFAULT_CONFIG.browserGpuMode) === "software";
}
function buildChromeArgs(options, config) {
  const platform = options.platform ?? process.platform;
  const gpuDisabled = config?.disableGpu ?? DEFAULT_CONFIG.disableGpu;
  const browserGpuMode = gpuDisabled ? "software" : config?.browserGpuMode ?? DEFAULT_CONFIG.browserGpuMode;
  const softwareWebGpu = usesSoftwareWebGpu(options.requiresWebGpu, config);
  const chromeArgs = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    softwareWebGpu ? `${CANVAS_DRAW_ELEMENT_FEATURE_FLAG},Vulkan` : CANVAS_DRAW_ELEMENT_FEATURE_FLAG,
    "--enable-webgl",
    "--ignore-gpu-blocklist",
    ...getBrowserGpuArgs(browserGpuMode, platform),
    "--font-render-hinting=none",
    "--force-color-profile=srgb",
    "--force-device-scale-factor=1",
    `--window-size=${options.width},${options.height}`,
    // Prevent Chrome from throttling background tabs/timers — critical when the
    // page is offscreen during headless capture
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-background-media-suspend",
    // Reduce overhead from unused Chrome features
    "--disable-breakpad",
    "--disable-component-extensions-with-background-pages",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-hang-monitor",
    "--disable-ipc-flooding-protection",
    "--disable-popup-blocking",
    "--disable-sync",
    "--disable-component-update",
    "--disable-domain-reliability",
    "--disable-print-preview",
    "--no-pings",
    "--no-zygote",
    // Memory — scale GPU budget to available system RAM
    `--force-gpu-mem-available-mb=${getGpuMemBudgetMb()}`,
    "--disk-cache-size=268435456",
    ...getLowMemoryFlags(),
    // Disable features that add overhead
    "--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process,Translate,BackForwardCache,IntensiveWakeUpThrottling",
    // Allow AudioContext to start without a user gesture in headless Chrome.
    // Without this flag, any code path that constructs an AudioContext
    // (including GSAP tweening an <audio> element's volume) triggers the
    // autoplay policy and causes the AudioContext to stay suspended. The
    // frame-capture loop then blocks waiting for it, deadlocking the render.
    "--autoplay-policy=no-user-gesture-required"
  ];
  if (browserGpuMode !== "software" || options.requiresWebGpu) {
    chromeArgs.push(WEBGPU_FLAG);
  }
  if (softwareWebGpu) chromeArgs.push("--use-vulkan=swiftshader");
  if (browserGpuMode === "software" && !softwareWebGpu) {
    chromeArgs.push("--disable-gpu-compositing");
  }
  if (options.captureMode !== "screenshot") {
    chromeArgs.push(
      "--deterministic-mode",
      "--enable-begin-frame-control",
      "--disable-new-content-rendering-timeout",
      "--run-all-compositor-stages-before-draw",
      "--disable-threaded-animation",
      "--disable-threaded-scrolling",
      "--disable-checker-imaging",
      "--disable-image-animation-resync",
      "--enable-surface-synchronization"
    );
  }
  if (gpuDisabled) {
    chromeArgs.push("--disable-gpu");
  }
  return chromeArgs;
}
function compositionRequiresWebGpu(html) {
  for (const [tag] of html.matchAll(/<(?:[^<>"']|"[^"]*"|'[^']*')*>/g)) {
    if (/\bdata-composition-id\b/i.test(tag)) return /\bdata-requires-webgpu(?:\s|=|>)/i.test(tag);
  }
  return false;
}
var WebGpuUnavailableError = class extends Error {
  constructor() {
    super(
      "This composition declares data-requires-webgpu, but no hardware WebGPU adapter could be obtained on this browser launch. Run on a host with a GPU, set PRODUCER_ALLOW_SOFTWARE_WEBGPU=true to render it on SwiftShader (slow), or remove data-requires-webgpu."
    );
    this.name = "WebGpuUnavailableError";
  }
};
var WEBGPU_ADAPTER_PROBE_TIMEOUT_MS = 1e4;
async function assertWebGpuAdapterAvailable(page, requiresWebGpu, softwareWebGpu = false) {
  if (!requiresWebGpu) return;
  const hasUsableAdapter = await page.evaluate(
    async (timeoutMs, acceptFallback) => {
      if (typeof navigator === "undefined" || !navigator.gpu) return false;
      try {
        const adapter = await Promise.race([
          navigator.gpu.requestAdapter(),
          new Promise((resolve) => setTimeout(() => resolve(null), timeoutMs))
        ]);
        return !!adapter && (acceptFallback || !adapter.info.isFallbackAdapter);
      } catch {
        return false;
      }
    },
    WEBGPU_ADAPTER_PROBE_TIMEOUT_MS,
    softwareWebGpu
  );
  if (!hasUsableAdapter) throw new WebGpuUnavailableError();
}
function getBrowserGpuArgs(mode, platform) {
  if (mode === "software") {
    return ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"];
  }
  if (mode === "auto") {
    return ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"];
  }
  switch (platform) {
    case "darwin":
      return ["--use-gl=angle", "--use-angle=metal", "--enable-gpu-rasterization"];
    case "win32":
      return ["--use-gl=angle", "--use-angle=d3d11", "--enable-gpu-rasterization"];
    case "linux":
      return [
        "--use-gl=angle",
        "--use-angle=gl-egl",
        "--enable-gpu-rasterization",
        "--ignore-gpu-blocklist",
        "--disable-software-rasterizer"
      ];
    default:
      return ["--enable-gpu-rasterization"];
  }
}

// ../engine/src/services/protocolTimeoutErrorHint.ts
var PROTOCOL_TIMEOUT_MATCHER = /Runtime\.callFunctionOn timed out|Target closed|protocolTimeout/i;
function augmentProtocolTimeoutError(err, effectiveTimeoutMs) {
  if (!(err instanceof Error)) return new Error(String(err));
  if (!PROTOCOL_TIMEOUT_MATCHER.test(err.message)) return err;
  const augmented = new Error(
    `${err.message}

HyperFrames effective protocolTimeout: ${effectiveTimeoutMs} ms.

To raise the timeout:
  Env: PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS=<higher-ms>
  CLI: --protocol-timeout <higher-ms>

Field signal ts=1784047847: this class of failure appears on RAM-pressured hosts with heavy-asset compositions (9+ videos + 20+ images). If raising the timeout doesn't help, consider FFmpeg-only encoding.`
  );
  augmented.cause = err;
  return augmented;
}
function isProtocolTimeoutError(err) {
  const message = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  return PROTOCOL_TIMEOUT_MATCHER.test(message);
}

// ../engine/src/services/pageNavigationTimeoutErrorHint.ts
var NAVIGATION_TIMEOUT_MATCHER = /Navigation timeout|net::ERR_TIMED_OUT/i;
function augmentPageNavigationTimeoutError(err, effectiveTimeoutMs, context = {}) {
  if (!(err instanceof Error)) return new Error(String(err));
  if (!NAVIGATION_TIMEOUT_MATCHER.test(err.message)) return err;
  const platform = context.platform ?? process.platform;
  const arch = context.arch ?? process.arch;
  const dockerHint = shouldSurfaceDockerHint({
    platform,
    arch,
    hasCss3D: context.hasCss3D,
    hasAudio: context.hasAudio
  }) ? buildDockerHintBlock() : "";
  const augmented = new Error(
    `${err.message}

HyperFrames effective page.goto navigation timeout: ${effectiveTimeoutMs} ms.

To raise the timeout:
  Env: PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS=<higher-ms>  (milliseconds)
  CLI: --browser-timeout <seconds>                     (seconds)

To use a different browser binary (e.g. system Chrome instead of the pinned chrome-headless-shell):
  Env: HYPERFRAMES_BROWSER_PATH=<path-to-Chrome-or-chrome-headless-shell>
` + dockerHint
  );
  augmented.cause = err;
  return augmented;
}
function isPageNavigationTimeoutError(err) {
  const message = err instanceof Error ? err.message : typeof err === "string" ? err : "";
  return NAVIGATION_TIMEOUT_MATCHER.test(message);
}
function shouldSurfaceDockerHint(gate) {
  return gate.platform === "darwin" && gate.arch === "arm64" && gate.hasCss3D === true && gate.hasAudio === true;
}
function buildDockerHintBlock() {
  return `
Field signal ts=1784146416 (darwin/arm64 host mode, CLI 0.7.58): the compound of
a CSS 3D rendering context + audio track on macOS arm64 has been reported to hit
Navigation timeout twice at page.goto while the same composition renders
identically under Docker. Consider:
  hyperframes render ... --docker
`;
}

// ../engine/src/services/frameCapture.ts
import { existsSync as existsSync3, mkdirSync, writeFileSync } from "fs";
import { join as join3 } from "path";

// ../engine/src/services/drawElementCaptureError.ts
var DrawElementCaptureError = class extends Error {
  frameIndex;
  constructor(frameIndex, reason, cause) {
    super(
      `drawElement capture failed at frame ${frameIndex}: ${reason}; fresh screenshot capture required`,
      { cause }
    );
    this.name = "DrawElementCaptureError";
    Object.defineProperty(this, "deCaptureFailure", { value: true, enumerable: true });
    this.frameIndex = frameIndex;
  }
};
function isDrawElementCaptureError(error) {
  let current = error;
  for (let depth = 0; depth < 5 && typeof current === "object" && current !== null; depth++) {
    if ("deCaptureFailure" in current && current.deCaptureFailure === true) return true;
    current = "cause" in current ? current.cause : void 0;
  }
  return false;
}

// ../engine/src/utils/alphaBlit.ts
import { deflateSync, inflateSync } from "zlib";

// ../engine/src/utils/crc32.ts
import * as zlib from "zlib";
var nativeCrc32 = typeof zlib.crc32 === "function" ? zlib.crc32 : void 0;
function crc32Fallback(data, seed) {
  let crc = seed ^ 4294967295;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i] ?? 0;
    for (let bit = 0; bit < 8; bit++) {
      const mask = -(crc & 1);
      crc = crc >>> 1 ^ 3988292384 & mask;
    }
  }
  return (crc ^ 4294967295) >>> 0;
}
function chunkCrc32(chunkType, chunkData) {
  const typeBytes = Buffer.from(chunkType, "ascii");
  if (nativeCrc32) return nativeCrc32(chunkData, nativeCrc32(typeBytes));
  return crc32Fallback(chunkData, crc32Fallback(typeBytes, 0));
}

// ../engine/src/utils/alphaBlit.ts
function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}
function decodePngRaw(buf, caller) {
  if (buf[0] !== 137 || buf[1] !== 80 || buf[2] !== 78 || buf[3] !== 71 || buf[4] !== 13 || buf[5] !== 10 || buf[6] !== 26 || buf[7] !== 10) {
    throw new Error(`${caller}: not a PNG file`);
  }
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  let sawIhdr = false;
  const idatChunks = [];
  while (pos + 12 <= buf.length) {
    const chunkLen = buf.readUInt32BE(pos);
    const chunkType = buf.toString("ascii", pos + 4, pos + 8);
    const chunkData = buf.subarray(pos + 8, pos + 8 + chunkLen);
    if (chunkType === "IHDR") {
      width = chunkData.readUInt32BE(0);
      height = chunkData.readUInt32BE(4);
      bitDepth = chunkData[8] ?? 0;
      colorType = chunkData[9] ?? 0;
      interlace = chunkData[12] ?? 0;
      sawIhdr = true;
    } else if (chunkType === "IDAT") {
      idatChunks.push(Buffer.from(chunkData));
    } else if (chunkType === "IEND") {
      break;
    }
    pos += 12 + chunkLen;
  }
  if (!sawIhdr) {
    throw new Error(`${caller}: PNG missing IHDR chunk`);
  }
  if (colorType !== 2 && colorType !== 6) {
    throw new Error(`${caller}: unsupported color type ${colorType} (expected 2=RGB or 6=RGBA)`);
  }
  if (interlace !== 0) {
    throw new Error(
      `${caller}: Adam7-interlaced PNGs are not supported (interlace method ${interlace})`
    );
  }
  const channels = colorType === 6 ? 4 : 3;
  const bpp = channels * (bitDepth / 8);
  const stride = width * bpp;
  const compressed = Buffer.concat(idatChunks);
  const decompressed = inflateSync(compressed);
  const rawPixels = Buffer.allocUnsafe(height * stride);
  const prevRow = new Uint8Array(stride);
  const currRow = new Uint8Array(stride);
  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++] ?? 0;
    const rawRow = decompressed.subarray(srcPos, srcPos + stride);
    srcPos += stride;
    switch (filterType) {
      case 0:
        currRow.set(rawRow);
        break;
      case 1:
        for (let x = 0; x < stride; x++) {
          currRow[x] = (rawRow[x] ?? 0) + (x >= bpp ? currRow[x - bpp] ?? 0 : 0) & 255;
        }
        break;
      case 2:
        for (let x = 0; x < stride; x++) {
          currRow[x] = (rawRow[x] ?? 0) + (prevRow[x] ?? 0) & 255;
        }
        break;
      case 3:
        for (let x = 0; x < stride; x++) {
          const left = x >= bpp ? currRow[x - bpp] ?? 0 : 0;
          const up = prevRow[x] ?? 0;
          currRow[x] = (rawRow[x] ?? 0) + Math.floor((left + up) / 2) & 255;
        }
        break;
      case 4:
        for (let x = 0; x < stride; x++) {
          const left = x >= bpp ? currRow[x - bpp] ?? 0 : 0;
          const up = prevRow[x] ?? 0;
          const upLeft = x >= bpp ? prevRow[x - bpp] ?? 0 : 0;
          currRow[x] = (rawRow[x] ?? 0) + paeth(left, up, upLeft) & 255;
        }
        break;
      default:
        throw new Error(`${caller}: unknown filter type ${filterType} at row ${y}`);
    }
    rawPixels.set(currRow, y * stride);
    prevRow.set(currRow);
  }
  return { width, height, bitDepth, colorType, rawPixels };
}
function decodePng(buf) {
  const { width, height, bitDepth, colorType, rawPixels } = decodePngRaw(buf, "decodePng");
  if (bitDepth !== 8) {
    throw new Error(`decodePng: unsupported bit depth ${bitDepth} (expected 8)`);
  }
  const output = new Uint8Array(width * height * 4);
  if (colorType === 6) {
    output.set(rawPixels);
  } else {
    for (let i = 0; i < width * height; i++) {
      output[i * 4 + 0] = rawPixels[i * 3 + 0] ?? 0;
      output[i * 4 + 1] = rawPixels[i * 3 + 1] ?? 0;
      output[i * 4 + 2] = rawPixels[i * 3 + 2] ?? 0;
      output[i * 4 + 3] = 255;
    }
  }
  return { width, height, data: output };
}
var PNG_DEFLATE_LEVEL = 1;
function pngChunk(type, body) {
  const header = Buffer.alloc(8);
  header.writeUInt32BE(body.length, 0);
  header.write(type, 4, "ascii");
  const trailer = Buffer.alloc(4);
  trailer.writeUInt32BE(chunkCrc32(type, body), 0);
  return Buffer.concat([header, body, trailer]);
}
function encodePng(width, height, rgba) {
  const expected = width * height * 4;
  if (rgba.length !== expected) {
    throw new Error(
      `encodePng: expected ${expected} bytes for ${width}x${height}, got ${rgba.length}`
    );
  }
  const stride = width * 4;
  const filtered = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    filtered[y * (stride + 1)] = 0;
    filtered.set(rgba.subarray(y * stride, (y + 1) * stride), y * (stride + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(filtered, { level: PNG_DEFLATE_LEVEL })),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}
function decodePngToRgb48le(buf) {
  const { width, height, bitDepth, colorType, rawPixels } = decodePngRaw(buf, "decodePngToRgb48le");
  if (bitDepth !== 16) {
    throw new Error(`decodePngToRgb48le: unsupported bit depth ${bitDepth} (expected 16)`);
  }
  const bpp = colorType === 6 ? 8 : 6;
  const output = Buffer.allocUnsafe(width * height * 6);
  for (let y = 0; y < height; y++) {
    const dstBase = y * width * 6;
    const srcRowBase = y * width * bpp;
    for (let x = 0; x < width; x++) {
      const srcBase = srcRowBase + x * bpp;
      output[dstBase + x * 6 + 0] = rawPixels[srcBase + 1] ?? 0;
      output[dstBase + x * 6 + 1] = rawPixels[srcBase + 0] ?? 0;
      output[dstBase + x * 6 + 2] = rawPixels[srcBase + 3] ?? 0;
      output[dstBase + x * 6 + 3] = rawPixels[srcBase + 2] ?? 0;
      output[dstBase + x * 6 + 4] = rawPixels[srcBase + 5] ?? 0;
      output[dstBase + x * 6 + 5] = rawPixels[srcBase + 4] ?? 0;
    }
  }
  return { width, height, data: output };
}
function srgbByteToLinear(value) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function buildSrgbToSignalLut(transfer) {
  const lut = new Uint16Array(256);
  const hlgA = 0.17883277;
  const hlgB = 1 - 4 * hlgA;
  const hlgC = 0.5 - hlgA * Math.log(4 * hlgA);
  const pqM1 = 0.1593017578125;
  const pqM2 = 78.84375;
  const pqC1 = 0.8359375;
  const pqC2 = 18.8515625;
  const pqC3 = 18.6875;
  const pqMaxNits = 1e4;
  const sdrNits = 203;
  for (let i = 0; i < 256; i++) {
    if (transfer === "srgb") {
      lut[i] = i * 257;
      continue;
    }
    const linear = srgbByteToLinear(i);
    let signal;
    if (transfer === "hlg") {
      signal = linear <= 1 / 12 ? Math.sqrt(3 * linear) : hlgA * Math.log(12 * linear - hlgB) + hlgC;
    } else {
      const Lp = Math.max(0, linear * sdrNits / pqMaxNits);
      const Lm1 = Math.pow(Lp, pqM1);
      signal = Math.pow((pqC1 + pqC2 * Lm1) / (1 + pqC3 * Lm1), pqM2);
    }
    lut[i] = Math.min(65535, Math.round(signal * 65535));
  }
  return lut;
}
var SRGB_TO_SRGB_16 = buildSrgbToSignalLut("srgb");
var SRGB_TO_HLG = buildSrgbToSignalLut("hlg");
var SRGB_TO_PQ = buildSrgbToSignalLut("pq");
function getSrgbToSignalLut(transfer) {
  if (transfer === "pq") return SRGB_TO_PQ;
  if (transfer === "hlg") return SRGB_TO_HLG;
  return SRGB_TO_SRGB_16;
}
function blitRgba8OverRgb48le(domRgba, canvas, width, height, transfer = "hlg") {
  const pixelCount = width * height;
  const lut = getSrgbToSignalLut(transfer);
  for (let i = 0; i < pixelCount; i++) {
    const da = domRgba[i * 4 + 3] ?? 0;
    if (da === 0) {
      continue;
    } else if (da === 255) {
      const r16 = lut[domRgba[i * 4 + 0] ?? 0] ?? 0;
      const g16 = lut[domRgba[i * 4 + 1] ?? 0] ?? 0;
      const b16 = lut[domRgba[i * 4 + 2] ?? 0] ?? 0;
      canvas.writeUInt16LE(r16, i * 6);
      canvas.writeUInt16LE(g16, i * 6 + 2);
      canvas.writeUInt16LE(b16, i * 6 + 4);
    } else {
      const alpha = da / 255;
      const invAlpha = 1 - alpha;
      const hdrR = (canvas[i * 6 + 0] ?? 0) | (canvas[i * 6 + 1] ?? 0) << 8;
      const hdrG = (canvas[i * 6 + 2] ?? 0) | (canvas[i * 6 + 3] ?? 0) << 8;
      const hdrB = (canvas[i * 6 + 4] ?? 0) | (canvas[i * 6 + 5] ?? 0) << 8;
      const domR = lut[domRgba[i * 4 + 0] ?? 0] ?? 0;
      const domG = lut[domRgba[i * 4 + 1] ?? 0] ?? 0;
      const domB = lut[domRgba[i * 4 + 2] ?? 0] ?? 0;
      canvas.writeUInt16LE(Math.round(domR * alpha + hdrR * invAlpha), i * 6);
      canvas.writeUInt16LE(Math.round(domG * alpha + hdrG * invAlpha), i * 6 + 2);
      canvas.writeUInt16LE(Math.round(domB * alpha + hdrB * invAlpha), i * 6 + 4);
    }
  }
}
function cornerAlpha(px, py, cx, cy, r) {
  const dx = px - cx;
  const dy = py - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > r + 0.5) return 0;
  if (dist > r - 0.5) return r + 0.5 - dist;
  return 1;
}
function roundedRectAlpha(px, py, w, h, radii) {
  const [tl, tr, br, bl] = radii;
  if (px < tl && py < tl) return cornerAlpha(px, py, tl, tl, tl);
  if (px >= w - tr && py < tr) return cornerAlpha(px, py, w - tr, tr, tr);
  if (px >= w - br && py >= h - br) return cornerAlpha(px, py, w - br, h - br, br);
  if (px < bl && py >= h - bl) return cornerAlpha(px, py, bl, h - bl, bl);
  return 1;
}
function blitRgb48leRegion(canvas, source, dx, dy, sw, sh, canvasWidth, canvasHeight, opacity, borderRadius) {
  if (sw <= 0 || sh <= 0) return;
  const op = opacity ?? 1;
  if (op <= 0) return;
  const x0 = Math.max(0, dx);
  const y0 = Math.max(0, dy);
  const x1 = Math.min(canvasWidth, dx + sw);
  const y1 = Math.min(canvasHeight, dy + sh);
  if (x0 >= x1 || y0 >= y1) return;
  const clippedW = x1 - x0;
  const srcOffsetX = x0 - dx;
  const srcOffsetY = y0 - dy;
  const hasMask = borderRadius !== void 0;
  if (op >= 0.999 && !hasMask) {
    for (let y = 0; y < y1 - y0; y++) {
      const srcRowOff = ((srcOffsetY + y) * sw + srcOffsetX) * 6;
      const dstRowOff = ((y0 + y) * canvasWidth + x0) * 6;
      source.copy(canvas, dstRowOff, srcRowOff, srcRowOff + clippedW * 6);
    }
  } else if (!hasMask) {
    const invOp = 1 - op;
    for (let y = 0; y < y1 - y0; y++) {
      let srcOff = ((srcOffsetY + y) * sw + srcOffsetX) * 6;
      let dstOff = ((y0 + y) * canvasWidth + x0) * 6;
      for (let x = 0; x < clippedW; x++) {
        const sr = source[srcOff] | source[srcOff + 1] << 8;
        const sg = source[srcOff + 2] | source[srcOff + 3] << 8;
        const sb = source[srcOff + 4] | source[srcOff + 5] << 8;
        const dr = canvas[dstOff] | canvas[dstOff + 1] << 8;
        const dg = canvas[dstOff + 2] | canvas[dstOff + 3] << 8;
        const db = canvas[dstOff + 4] | canvas[dstOff + 5] << 8;
        const r = sr * op + dr * invOp + 0.5 | 0;
        const g = sg * op + dg * invOp + 0.5 | 0;
        const b = sb * op + db * invOp + 0.5 | 0;
        canvas[dstOff] = r & 255;
        canvas[dstOff + 1] = r >>> 8;
        canvas[dstOff + 2] = g & 255;
        canvas[dstOff + 3] = g >>> 8;
        canvas[dstOff + 4] = b & 255;
        canvas[dstOff + 5] = b >>> 8;
        srcOff += 6;
        dstOff += 6;
      }
    }
  } else {
    for (let y = 0; y < y1 - y0; y++) {
      for (let x = 0; x < clippedW; x++) {
        let effectiveOp = op;
        if (hasMask) {
          const ma = roundedRectAlpha(srcOffsetX + x, srcOffsetY + y, sw, sh, borderRadius);
          if (ma <= 0) continue;
          effectiveOp *= ma;
        }
        const srcOff = ((srcOffsetY + y) * sw + srcOffsetX + x) * 6;
        const dstOff = ((y0 + y) * canvasWidth + x0 + x) * 6;
        if (effectiveOp >= 0.999) {
          source.copy(canvas, dstOff, srcOff, srcOff + 6);
        } else {
          const invEff = 1 - effectiveOp;
          const sr = source.readUInt16LE(srcOff);
          const sg = source.readUInt16LE(srcOff + 2);
          const sb = source.readUInt16LE(srcOff + 4);
          const dr = canvas.readUInt16LE(dstOff);
          const dg = canvas.readUInt16LE(dstOff + 2);
          const db = canvas.readUInt16LE(dstOff + 4);
          canvas.writeUInt16LE(Math.round(sr * effectiveOp + dr * invEff), dstOff);
          canvas.writeUInt16LE(Math.round(sg * effectiveOp + dg * invEff), dstOff + 2);
          canvas.writeUInt16LE(Math.round(sb * effectiveOp + db * invEff), dstOff + 4);
        }
      }
    }
  }
}
function blitRgb48leAffine(canvas, source, matrix, srcW, srcH, canvasW, canvasH, opacity, borderRadius) {
  const a = matrix[0];
  const b = matrix[1];
  const c = matrix[2];
  const d = matrix[3];
  const tx = matrix[4];
  const ty = matrix[5];
  if (a === void 0 || b === void 0 || c === void 0 || d === void 0 || tx === void 0 || ty === void 0)
    return;
  const det = a * d - b * c;
  if (Math.abs(det) < 1e-10) return;
  const invA = d / det;
  const invB = -b / det;
  const invC = -c / det;
  const invD = a / det;
  const invTx = -(invA * tx + invC * ty);
  const invTy = -(invB * tx + invD * ty);
  const op = opacity ?? 1;
  if (op <= 0) return;
  const hasMask = borderRadius !== void 0;
  const corners = [
    [tx, ty],
    [a * srcW + tx, b * srcW + ty],
    [c * srcH + tx, d * srcH + ty],
    [a * srcW + c * srcH + tx, b * srcW + d * srcH + ty]
  ];
  let minX = canvasW, maxX = 0, minY = canvasH, maxY = 0;
  for (const corner of corners) {
    const cx = corner[0] ?? 0;
    const cy = corner[1] ?? 0;
    if (cx < minX) minX = cx;
    if (cx > maxX) maxX = cx;
    if (cy < minY) minY = cy;
    if (cy > maxY) maxY = cy;
  }
  const startX = Math.max(0, Math.floor(minX));
  const endX = Math.min(canvasW, Math.ceil(maxX));
  const startY = Math.max(0, Math.floor(minY));
  const endY = Math.min(canvasH, Math.ceil(maxY));
  for (let dy = startY; dy < endY; dy++) {
    for (let dx = startX; dx < endX; dx++) {
      const sx = invA * dx + invC * dy + invTx;
      const sy = invB * dx + invD * dy + invTy;
      if (sx < 0 || sy < 0 || sx >= srcW || sy >= srcH) continue;
      let effectiveOp = op;
      if (hasMask) {
        const ma = roundedRectAlpha(sx, sy, srcW, srcH, borderRadius);
        if (ma <= 0) continue;
        effectiveOp *= ma;
      }
      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      const fx = sx - x0;
      const fy = sy - y0;
      const x1 = Math.min(x0 + 1, srcW - 1);
      const y1 = Math.min(y0 + 1, srcH - 1);
      const off00 = (y0 * srcW + x0) * 6;
      const off10 = (y0 * srcW + x1) * 6;
      const off01 = (y1 * srcW + x0) * 6;
      const off11 = (y1 * srcW + x1) * 6;
      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;
      const sr = source.readUInt16LE(off00) * w00 + source.readUInt16LE(off10) * w10 + source.readUInt16LE(off01) * w01 + source.readUInt16LE(off11) * w11;
      const sg = source.readUInt16LE(off00 + 2) * w00 + source.readUInt16LE(off10 + 2) * w10 + source.readUInt16LE(off01 + 2) * w01 + source.readUInt16LE(off11 + 2) * w11;
      const sb = source.readUInt16LE(off00 + 4) * w00 + source.readUInt16LE(off10 + 4) * w10 + source.readUInt16LE(off01 + 4) * w01 + source.readUInt16LE(off11 + 4) * w11;
      const dstOff = (dy * canvasW + dx) * 6;
      if (effectiveOp >= 0.999) {
        canvas.writeUInt16LE(Math.round(sr), dstOff);
        canvas.writeUInt16LE(Math.round(sg), dstOff + 2);
        canvas.writeUInt16LE(Math.round(sb), dstOff + 4);
      } else {
        const invEff = 1 - effectiveOp;
        const dr = canvas.readUInt16LE(dstOff);
        const dg = canvas.readUInt16LE(dstOff + 2);
        const db = canvas.readUInt16LE(dstOff + 4);
        canvas.writeUInt16LE(Math.round(sr * effectiveOp + dr * invEff), dstOff);
        canvas.writeUInt16LE(Math.round(sg * effectiveOp + dg * invEff), dstOff + 2);
        canvas.writeUInt16LE(Math.round(sb * effectiveOp + db * invEff), dstOff + 4);
      }
    }
  }
}
function parseObjectPositionAxis(value, axis) {
  const lower = value.trim().toLowerCase();
  if (lower === "left" || lower === "top") return 0;
  if (lower === "right" || lower === "bottom") return 1;
  if (lower === "center" || lower === "") return 0.5;
  if (lower.endsWith("%")) {
    const pct = parseFloat(lower) / 100;
    return Number.isFinite(pct) ? Math.max(0, Math.min(1, pct)) : 0.5;
  }
  if (axis === "x" || axis === "y") return 0.5;
  return 0.5;
}
function parseObjectPosition(css) {
  if (!css || !css.trim()) return { x: 0.5, y: 0.5 };
  const tokens = css.trim().split(/\s+/);
  if (tokens.length === 1) {
    const single = tokens[0] ?? "";
    const v = parseObjectPositionAxis(single, "x");
    return { x: v, y: 0.5 };
  }
  return {
    x: parseObjectPositionAxis(tokens[0] ?? "", "x"),
    y: parseObjectPositionAxis(tokens[1] ?? "", "y")
  };
}
function computeObjectFitRect(srcW, srcH, dstW, dstH, fit, pos) {
  let renderedW = dstW;
  let renderedH = dstH;
  if (fit === "fill") {
    return { dx: 0, dy: 0, dw: dstW, dh: dstH };
  }
  if (fit === "none") {
    renderedW = srcW;
    renderedH = srcH;
  } else if (fit === "scale-down") {
    const scale = Math.min(dstW / srcW, dstH / srcH, 1);
    renderedW = srcW * scale;
    renderedH = srcH * scale;
  } else if (fit === "cover") {
    const scale = Math.max(dstW / srcW, dstH / srcH);
    renderedW = srcW * scale;
    renderedH = srcH * scale;
  } else {
    const scale = Math.min(dstW / srcW, dstH / srcH);
    renderedW = srcW * scale;
    renderedH = srcH * scale;
  }
  const dx = (dstW - renderedW) * pos.x;
  const dy = (dstH - renderedH) * pos.y;
  return { dx, dy, dw: renderedW, dh: renderedH };
}
function resampleRgb48leObjectFit(source, srcW, srcH, dstW, dstH, fit = "fill", objectPosition) {
  if (srcW <= 0 || srcH <= 0 || dstW <= 0 || dstH <= 0) {
    return source;
  }
  if (fit === "fill" && srcW === dstW && srcH === dstH) {
    return source;
  }
  const pos = parseObjectPosition(objectPosition);
  const rect = computeObjectFitRect(srcW, srcH, dstW, dstH, fit, pos);
  const dst = Buffer.alloc(dstW * dstH * 6);
  const stride = dstW * 6;
  const xMin = Math.max(0, Math.floor(rect.dx));
  const yMin = Math.max(0, Math.floor(rect.dy));
  const xMax = Math.min(dstW, Math.ceil(rect.dx + rect.dw));
  const yMax = Math.min(dstH, Math.ceil(rect.dy + rect.dh));
  if (rect.dw <= 0 || rect.dh <= 0) {
    return dst;
  }
  const invScaleX = srcW / rect.dw;
  const invScaleY = srcH / rect.dh;
  for (let dy = yMin; dy < yMax; dy++) {
    const rowOff = dy * stride;
    const sy = (dy + 0.5 - rect.dy) * invScaleY - 0.5;
    const syc = Math.max(0, Math.min(srcH - 1, sy));
    const y0 = Math.floor(syc);
    const y1 = Math.min(y0 + 1, srcH - 1);
    const fy = syc - y0;
    const ify = 1 - fy;
    for (let dx = xMin; dx < xMax; dx++) {
      const sx = (dx + 0.5 - rect.dx) * invScaleX - 0.5;
      const sxc = Math.max(0, Math.min(srcW - 1, sx));
      const x0 = Math.floor(sxc);
      const x1 = Math.min(x0 + 1, srcW - 1);
      const fx = sxc - x0;
      const ifx = 1 - fx;
      const off00 = (y0 * srcW + x0) * 6;
      const off10 = (y0 * srcW + x1) * 6;
      const off01 = (y1 * srcW + x0) * 6;
      const off11 = (y1 * srcW + x1) * 6;
      const w00 = ifx * ify;
      const w10 = fx * ify;
      const w01 = ifx * fy;
      const w11 = fx * fy;
      const r = source.readUInt16LE(off00) * w00 + source.readUInt16LE(off10) * w10 + source.readUInt16LE(off01) * w01 + source.readUInt16LE(off11) * w11;
      const g = source.readUInt16LE(off00 + 2) * w00 + source.readUInt16LE(off10 + 2) * w10 + source.readUInt16LE(off01 + 2) * w01 + source.readUInt16LE(off11 + 2) * w11;
      const b = source.readUInt16LE(off00 + 4) * w00 + source.readUInt16LE(off10 + 4) * w10 + source.readUInt16LE(off01 + 4) * w01 + source.readUInt16LE(off11 + 4) * w11;
      const dstOff = rowOff + dx * 6;
      dst.writeUInt16LE(Math.round(r), dstOff);
      dst.writeUInt16LE(Math.round(g), dstOff + 2);
      dst.writeUInt16LE(Math.round(b), dstOff + 4);
    }
  }
  return dst;
}
function normalizeObjectFit(value) {
  switch ((value ?? "").trim().toLowerCase()) {
    case "cover":
      return "cover";
    case "contain":
      return "contain";
    case "none":
      return "none";
    case "scale-down":
      return "scale-down";
    default:
      return "fill";
  }
}
function parseTransformMatrix(css) {
  if (!css || css === "none") return null;
  const match2d = css.match(/^matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,)]+)\)$/);
  if (match2d) {
    const values = match2d.slice(1, 7).map(Number);
    if (!values.every(Number.isFinite)) return null;
    return values;
  }
  const match3d = css.match(/^matrix3d\(([^)]+)\)$/);
  if (match3d) {
    const raw = match3d[1];
    if (!raw) return null;
    const parts = raw.split(",").map((s) => Number(s.trim()));
    if (parts.length !== 16 || !parts.every(Number.isFinite)) return null;
    warnIfZSignificant(parts);
    return [
      parts[0],
      parts[1],
      parts[4],
      parts[5],
      parts[12],
      parts[13]
    ];
  }
  return null;
}
var warnedZSignificant = false;
var Z_EPSILON = 1e-6;
function warnIfZSignificant(parts) {
  if (warnedZSignificant) return;
  const a3 = parts[8] ?? 0;
  const b3 = parts[9] ?? 0;
  const c1 = parts[2] ?? 0;
  const c2 = parts[6] ?? 0;
  const c3 = parts[10] ?? 1;
  const d1 = parts[3] ?? 0;
  const d2 = parts[7] ?? 0;
  const d3 = parts[11] ?? 0;
  const d4 = parts[15] ?? 1;
  if (Math.abs(a3) > Z_EPSILON || Math.abs(b3) > Z_EPSILON || Math.abs(c1) > Z_EPSILON || Math.abs(c2) > Z_EPSILON || Math.abs(c3 - 1) > Z_EPSILON || Math.abs(d1) > Z_EPSILON || Math.abs(d2) > Z_EPSILON || Math.abs(d3) > Z_EPSILON || Math.abs(d4 - 1) > Z_EPSILON) {
    warnedZSignificant = true;
    console.warn(
      `[alphaBlit] parseTransformMatrix received a matrix3d with non-trivial 3D components (a3=${a3}, b3=${b3}, c1=${c1}, c2=${c2}, c3=${c3}, d1=${d1}, d2=${d2}, d3=${d3}, d4=${d4}). The engine projects 3D transforms to 2D (m11, m12, m21, m22, m41, m42) and silently discards perspective and out-of-plane rotation. If your composition uses real 3D (rotateX/Y, perspective), the rendered output will not match the studio preview. Z translation (translateZ) is dropped by design and does not trigger this warning. This warning is emitted once per process.`
    );
  }
}

// ../engine/src/services/motionBlur.ts
var MAX_SAMPLES_PER_FRAME = 64;
var DEFAULT_SAMPLES_PER_FRAME = 16;
var DEFAULT_SHUTTER_ANGLE = 180;
var DEFAULT_SHUTTER_PHASE = -90;
var SUB_FRAME_DIVISIONS = 4096;
function finiteOr(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}
function resolveMotionBlurPlan(options) {
  if (!options) return null;
  const fixedSamplesPerFrame = options.samplesPerFrame === void 0 ? null : Math.min(
    MAX_SAMPLES_PER_FRAME,
    Math.max(1, Math.round(finiteOr(options.samplesPerFrame, DEFAULT_SAMPLES_PER_FRAME)))
  );
  const shutterAngle = finiteOr(options.shutterAngle, DEFAULT_SHUTTER_ANGLE);
  const shutterPhase = finiteOr(options.shutterPhase, DEFAULT_SHUTTER_PHASE);
  const blend = options.blend === "linear" ? "linear" : "srgb";
  return {
    blend,
    subFrameDivisions: SUB_FRAME_DIVISIONS,
    windowStartFrames: shutterPhase / 360,
    shutterFrames: shutterAngle / 360,
    fixedSamplesPerFrame
  };
}
function sampleTickOffsets(plan, samplesPerFrame) {
  const offsets = [];
  for (let k = 0; k < samplesPerFrame; k++) {
    const offsetFrames = plan.windowStartFrames + (k + 0.5) / samplesPerFrame * plan.shutterFrames;
    offsets.push(Math.round(offsetFrames * plan.subFrameDivisions));
  }
  return offsets;
}
function motionBlurSampleTimes(plan, frameIndex, fps, samplesPerFrame) {
  const grid = fps * plan.subFrameDivisions;
  const frameTicks = frameIndex * plan.subFrameDivisions;
  return sampleTickOffsets(plan, samplesPerFrame).map(
    (offset) => Math.max(0, frameTicks + offset) / grid
  );
}
function motionBlurProbeTimes(plan, frameIndex, fps) {
  const grid = fps * plan.subFrameDivisions;
  const frameTicks = frameIndex * plan.subFrameDivisions;
  const startTick = Math.round(plan.windowStartFrames * plan.subFrameDivisions);
  const endTick = Math.round(
    (plan.windowStartFrames + plan.shutterFrames) * plan.subFrameDivisions
  );
  return {
    windowStart: Math.max(0, frameTicks + startTick) / grid,
    windowEnd: Math.max(0, frameTicks + endTick) / grid
  };
}
function motionBlurWindowIsStatic(plan, frameIndex, staticFrames) {
  const worstCaseSamples = plan.fixedSamplesPerFrame ?? MAX_SAMPLES_PER_FRAME;
  const inset = plan.shutterFrames / (2 * worstCaseSamples);
  const minOffsetFrames = plan.windowStartFrames + inset;
  const maxOffsetFrames = plan.windowStartFrames + plan.shutterFrames - inset;
  const first = Math.floor(frameIndex - 1 + Math.min(0, minOffsetFrames));
  const last = Math.floor(frameIndex + Math.max(0, maxOffsetFrames)) + 1;
  for (let frame = first; frame <= last; frame++) {
    if (!staticFrames.has(frame)) return false;
  }
  return true;
}
var ADAPTIVE_SAMPLE_STEPS = [
  { maxDiff: 3, samples: DEFAULT_SAMPLES_PER_FRAME },
  { maxDiff: 6, samples: 32 },
  { maxDiff: Infinity, samples: MAX_SAMPLES_PER_FRAME }
];
function adaptiveSampleCount(diff) {
  for (const step of ADAPTIVE_SAMPLE_STEPS) {
    if (diff <= step.maxDiff) return step.samples;
  }
  return MAX_SAMPLES_PER_FRAME;
}
var SPATIAL_TWEEN_PROPERTIES = [
  "x",
  "y",
  "z",
  "xPercent",
  "yPercent",
  "rotation",
  "rotate",
  "rotationX",
  "rotationY",
  "rotationZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skewX",
  "skewY",
  "perspective",
  "transformPerspective",
  "top",
  "left",
  "right",
  "bottom",
  "width",
  "height",
  "translate",
  "translateX",
  "translateY",
  "translateZ",
  "transform"
];
function probeDiffMagnitude(a, b) {
  const decodedA = decodePng(a);
  const decodedB = decodePng(b);
  if (decodedA.width !== decodedB.width || decodedA.height !== decodedB.height) {
    throw new Error(
      `probeDiffMagnitude: sample geometry mismatch (${decodedA.width}x${decodedA.height} vs ${decodedB.width}x${decodedB.height})`
    );
  }
  let sum = 0;
  for (let i = 0; i < decodedA.data.length; i++) {
    sum += Math.abs(decodedA.data[i] - decodedB.data[i]);
  }
  return sum / decodedA.data.length;
}
var SRGB_TO_LINEAR = (() => {
  const lut = new Float64Array(256);
  for (let i = 0; i < 256; i++) lut[i] = srgbByteToLinear(i);
  return lut;
})();
var SRGB_PASSTHROUGH = (() => {
  const lut = new Float64Array(256);
  for (let i = 0; i < 256; i++) lut[i] = i;
  return lut;
})();
function linearToByte(value) {
  const c = value <= 31308e-7 ? value * 12.92 : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
  return clampByte(c * 255);
}
function clampByte(value) {
  return Math.min(255, Math.max(0, Math.round(value)));
}
var MotionBlurAccumulator = class {
  toWorking;
  fromWorking;
  /** Premultiplied r, g, b and alpha sums per pixel. Null until the first sample sets the size. */
  sums = null;
  width = 0;
  height = 0;
  count = 0;
  constructor(blend) {
    this.toWorking = blend === "linear" ? SRGB_TO_LINEAR : SRGB_PASSTHROUGH;
    this.fromWorking = blend === "linear" ? linearToByte : clampByte;
  }
  /** Fold one captured sample PNG into the running average. */
  add(png) {
    const { width, height, data } = decodePng(png);
    if (!this.sums) {
      this.width = width;
      this.height = height;
      this.sums = new Float32Array(width * height * 4);
    } else if (width !== this.width || height !== this.height) {
      throw new Error(
        `MotionBlurAccumulator: sample geometry mismatch (${width}x${height} vs ${this.width}x${this.height})`
      );
    }
    const sums = this.sums;
    const toWorking = this.toWorking;
    for (let i = 0; i < sums.length; i += 4) {
      const alpha = data[i + 3] / 255;
      sums[i] = sums[i] + toWorking[data[i]] * alpha;
      sums[i + 1] = sums[i + 1] + toWorking[data[i + 1]] * alpha;
      sums[i + 2] = sums[i + 2] + toWorking[data[i + 2]] * alpha;
      sums[i + 3] = sums[i + 3] + alpha;
    }
    this.count += 1;
  }
  /** Un-premultiply and encode the average. Throws if no sample was ever added. */
  finish() {
    const sums = this.sums;
    if (!sums) throw new Error("MotionBlurAccumulator: no samples");
    const out = new Uint8Array(sums.length);
    for (let i = 0; i < sums.length; i += 4) {
      const alphaSum = sums[i + 3];
      out[i + 3] = clampByte(alphaSum / this.count * 255);
      if (alphaSum === 0) continue;
      const scale = 1 / alphaSum;
      out[i] = this.fromWorking(sums[i] * scale);
      out[i + 1] = this.fromWorking(sums[i + 1] * scale);
      out[i + 2] = this.fromWorking(sums[i + 2] * scale);
    }
    return { width: this.width, height: this.height, data: out };
  }
};

// ../engine/src/services/screenshotService.ts
var cdpSessionCache = /* @__PURE__ */ new WeakMap();
async function getCdpSession(page) {
  let client = cdpSessionCache.get(page);
  if (!client) {
    client = await page.createCDPSession();
    cdpSessionCache.set(page, client);
  }
  return client;
}
function shouldDefaultCaptureBeyondViewport(browserVersion, platform = process.platform) {
  return platform === "darwin" && browserVersion.startsWith("Chrome/");
}
async function probeBeginFrameLiveness(page, timeoutMs, frameTimeTicks, intervalMs) {
  const client = await getCdpSession(page);
  const params = {};
  if (typeof frameTimeTicks === "number") params.frameTimeTicks = frameTimeTicks;
  if (typeof intervalMs === "number") params.interval = intervalMs;
  let timer;
  try {
    return await Promise.race([
      client.send("HeadlessExperimental.beginFrame", params).then(() => true).catch(() => false),
      new Promise((resolve) => {
        timer = setTimeout(() => resolve(false), timeoutMs);
      })
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
var lastFrameCache = /* @__PURE__ */ new WeakMap();
var PENDING_FRAME_RETRIES = 5;
async function sendBeginFrame(client, params) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await client.send("HeadlessExperimental.beginFrame", params);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const isPending = msg.includes("Another frame is pending");
      if (isPending && attempt < PENDING_FRAME_RETRIES) {
        await new Promise((r) => setTimeout(r, 50 * 2 ** attempt));
        continue;
      }
      if (isPending) {
        throw new Error(
          `[BeginFrame] Frame still pending after ${PENDING_FRAME_RETRIES} retries \u2014 CPU overloaded by parallel renders. Reduce concurrent renders or use --docker for isolation.`
        );
      }
      throw err;
    }
  }
}
async function beginFrameCapture(page, options, frameTimeTicks, interval) {
  const client = await getCdpSession(page);
  const isPng = options.format === "png";
  const screenshot = {
    format: isPng ? "png" : "jpeg",
    quality: isPng ? void 0 : options.quality ?? 80,
    optimizeForSpeed: true
  };
  const result = await sendBeginFrame(client, { frameTimeTicks, interval, screenshot });
  let buffer;
  if (result.screenshotData) {
    buffer = Buffer.from(result.screenshotData, "base64");
    lastFrameCache.set(page, buffer);
  } else {
    const cached = lastFrameCache.get(page);
    if (cached) {
      buffer = cached;
    } else {
      const fallback = await sendBeginFrame(client, {
        frameTimeTicks: frameTimeTicks + 1e-3,
        interval,
        screenshot
      });
      buffer = fallback.screenshotData ? Buffer.from(fallback.screenshotData, "base64") : Buffer.alloc(0);
      if (buffer.length > 0) lastFrameCache.set(page, buffer);
    }
  }
  return {
    buffer,
    hasDamage: result.hasDamage
  };
}
async function pageContentExceedsCaptureHeight(page, requestedHeight) {
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  return scrollHeight > requestedHeight + 1;
}
async function pageScreenshotCapture(page, options) {
  const client = await getCdpSession(page);
  const isPng = options.format === "png";
  const dpr = options.deviceScaleFactor ?? 1;
  const clip = { x: 0, y: 0, width: options.width, height: options.height, scale: dpr };
  const result = await client.send("Page.captureScreenshot", {
    format: isPng ? "png" : "jpeg",
    quality: isPng ? void 0 : options.quality ?? 80,
    fromSurface: true,
    // Use Chrome's faster viewport-bound screenshot path by default. Callers
    // opt into the beyond-viewport path only for known compositor edge cases,
    // such as native video surfaces in tall portrait renders.
    captureBeyondViewport: options.captureBeyondViewport ?? false,
    optimizeForSpeed: !isPng,
    clip
  });
  return Buffer.from(result.data, "base64");
}
async function captureScreenshotWithAlpha(page, width, height) {
  const client = await getCdpSession(page);
  await client.send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 }
  });
  try {
    const result = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      // Preserve the #1094 tall-portrait edge-clipping guard on HDR alpha captures.
      captureBeyondViewport: true,
      optimizeForSpeed: false,
      // `true` uses a zero-alpha-aware fast path that crushes real alpha values — observed empirically, CDP docs don't spell it out
      clip: { x: 0, y: 0, width, height, scale: 1 }
    });
    return Buffer.from(result.data, "base64");
  } finally {
    await client.send("Emulation.setDefaultBackgroundColorOverride", {}).catch(() => {
    });
  }
}
var TRANSPARENT_BG_STYLE_ID = "__hf_transparent_bg__";
async function initTransparentBackground(page, { clearCompositionRoot = false } = {}) {
  const client = await getCdpSession(page);
  await client.send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 }
  });
  await page.evaluate(
    (styleId, clearCompositionRoot2) => {
      const selector = clearCompositionRoot2 ? "html,body,[data-composition-id]" : "html,body";
      let style = document.getElementById(styleId);
      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
      }
      style.textContent = `${selector}{background:transparent !important;background-color:transparent !important;background-image:none !important;}`;
    },
    TRANSPARENT_BG_STYLE_ID,
    clearCompositionRoot
  );
}
async function captureAlphaPng(page, width, height) {
  const client = await getCdpSession(page);
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    // Preserve the #1094 tall-portrait edge-clipping guard on HDR alpha captures.
    captureBeyondViewport: true,
    optimizeForSpeed: false,
    // must be false to preserve alpha
    clip: { x: 0, y: 0, width, height, scale: 1 }
  });
  return Buffer.from(result.data, "base64");
}
var DOM_LAYER_MASK_STYLE_ID = "__hf_dom_layer_mask__";
var DOM_LAYER_MASK_HIDDEN_ATTR = "data-hf-dom-layer-mask-hidden";
var DOM_LAYER_MASK_PREV_VISIBILITY_ATTR = "data-hf-dom-layer-mask-prev-visibility";
var DOM_LAYER_MASK_PREV_PRIORITY_ATTR = "data-hf-dom-layer-mask-prev-priority";
async function applyDomLayerMask(page, showIds, extraHideIds) {
  await page.evaluate(
    // fallow-ignore-next-line complexity
    (args) => {
      const existing = document.getElementById(args.styleId);
      if (existing) existing.remove();
      const renderFrameId = (id) => `${args.renderFramePrefix}${id}${args.renderFrameSuffix}`;
      const restoreMaskedElements = () => {
        const masked = document.querySelectorAll(`[${args.hiddenAttr}="1"]`);
        for (const node of masked) {
          if (!(node instanceof HTMLElement)) continue;
          const prevVisibility = node.getAttribute(args.prevVisibilityAttr);
          const prevPriority = node.getAttribute(args.prevPriorityAttr);
          if (prevVisibility === null) {
            node.style.removeProperty("visibility");
          } else {
            node.style.setProperty("visibility", prevVisibility, prevPriority ?? "");
          }
          node.removeAttribute(args.hiddenAttr);
          node.removeAttribute(args.prevVisibilityAttr);
          node.removeAttribute(args.prevPriorityAttr);
        }
      };
      restoreMaskedElements();
      const rememberAndHideElement = (el) => {
        if (el.getAttribute(args.hiddenAttr) !== "1") {
          const prevVisibility = el.style.getPropertyValue("visibility");
          const prevPriority = typeof el.style.getPropertyPriority === "function" ? el.style.getPropertyPriority("visibility") : "";
          if (prevVisibility) {
            el.setAttribute(args.prevVisibilityAttr, prevVisibility);
          } else {
            el.removeAttribute(args.prevVisibilityAttr);
          }
          if (prevPriority) {
            el.setAttribute(args.prevPriorityAttr, prevPriority);
          } else {
            el.removeAttribute(args.prevPriorityAttr);
          }
          el.setAttribute(args.hiddenAttr, "1");
        }
        el.style.setProperty("visibility", "hidden", "important");
      };
      const hiddenTimedDescendants = [];
      const rememberHiddenTimedDescendants = (root) => {
        for (const node of root.querySelectorAll("[data-start]")) {
          if (!(node instanceof HTMLElement)) continue;
          const computed = window.getComputedStyle(node);
          if (computed.visibility !== "hidden" && computed.display !== "none") continue;
          hiddenTimedDescendants.push(node);
        }
      };
      const showSelectors = [];
      for (const id of args.show) {
        const el = window.__hfMediaEl?.(id) ?? document.getElementById(id);
        if (el) rememberHiddenTimedDescendants(el);
        if (el?.hasAttribute(args.renderIdAttr)) {
          const attrEscaped = id.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
          const byRenderId = `[${args.renderIdAttr}="${attrEscaped}"]`;
          showSelectors.push(byRenderId, `${byRenderId} *`);
        } else {
          const escaped = CSS.escape(id);
          showSelectors.push(`#${escaped}`, `#${escaped} *`);
        }
        const renderEscaped = CSS.escape(renderFrameId(id));
        showSelectors.push(`#${renderEscaped}`, `#${renderEscaped} *`);
        const colorGradingEscaped = CSS.escape(`${args.canvasIdPrefix}${id}`);
        showSelectors.push(`#${colorGradingEscaped}`, `#${colorGradingEscaped} *`);
      }
      const massHideRule = "body *{visibility:hidden !important;}";
      const showRule = showSelectors.length === 0 ? "" : `${showSelectors.join(",")}{visibility:visible !important;}`;
      const style = document.createElement("style");
      style.id = args.styleId;
      style.textContent = `${massHideRule}
${showRule}`;
      document.head.appendChild(style);
      for (const el of hiddenTimedDescendants) {
        rememberAndHideElement(el);
      }
      for (const id of args.hide) {
        const el = window.__hfMediaEl?.(id) ?? document.getElementById(id);
        if (el instanceof HTMLElement) {
          rememberAndHideElement(el);
        }
        const img = document.getElementById(renderFrameId(id));
        if (img) {
          rememberAndHideElement(img);
        }
        const colorGradingCanvas = document.getElementById(`${args.canvasIdPrefix}${id}`);
        if (colorGradingCanvas instanceof HTMLElement) {
          rememberAndHideElement(colorGradingCanvas);
        }
      }
    },
    {
      show: showIds,
      hide: extraHideIds,
      renderIdAttr: MEDIA_RENDER_ID_ATTR,
      renderFramePrefix: RENDER_FRAME_ID_PREFIX,
      renderFrameSuffix: RENDER_FRAME_ID_SUFFIX,
      styleId: DOM_LAYER_MASK_STYLE_ID,
      hiddenAttr: DOM_LAYER_MASK_HIDDEN_ATTR,
      prevVisibilityAttr: DOM_LAYER_MASK_PREV_VISIBILITY_ATTR,
      prevPriorityAttr: DOM_LAYER_MASK_PREV_PRIORITY_ATTR,
      canvasIdPrefix: HF_COLOR_GRADING_CANVAS_ID_PREFIX
    }
  );
}
async function removeDomLayerMask(page, _extraHideIds) {
  await page.evaluate(
    (args) => {
      const style = document.getElementById(args.styleId);
      if (style) style.remove();
      const masked = document.querySelectorAll(`[${args.hiddenAttr}="1"]`);
      for (const node of masked) {
        if (!(node instanceof HTMLElement)) continue;
        const prevVisibility = node.getAttribute(args.prevVisibilityAttr);
        const prevPriority = node.getAttribute(args.prevPriorityAttr);
        if (prevVisibility === null) {
          node.style.removeProperty("visibility");
        } else {
          node.style.setProperty("visibility", prevVisibility, prevPriority ?? "");
        }
        node.removeAttribute(args.hiddenAttr);
        node.removeAttribute(args.prevVisibilityAttr);
        node.removeAttribute(args.prevPriorityAttr);
      }
    },
    {
      styleId: DOM_LAYER_MASK_STYLE_ID,
      hiddenAttr: DOM_LAYER_MASK_HIDDEN_ATTR,
      prevVisibilityAttr: DOM_LAYER_MASK_PREV_VISIBILITY_ATTR,
      prevPriorityAttr: DOM_LAYER_MASK_PREV_PRIORITY_ATTR
    }
  );
}
async function ensureRenderFrameSiblings(page) {
  await page.evaluate(
    (prefix, suffix) => {
      for (const video of Array.from(
        document.querySelectorAll("video[data-start]")
      )) {
        const next = video.nextElementSibling;
        if (next !== null && next.classList.contains("__render_frame__")) continue;
        const img = document.createElement("img");
        img.classList.add("__render_frame__");
        img.id = `${prefix}${window.__hfMediaId?.(video) || video.id}${suffix}`;
        img.style.pointerEvents = "none";
        img.style.position = "absolute";
        img.style.visibility = "hidden";
        video.parentNode?.insertBefore(img, video.nextSibling);
      }
    },
    RENDER_FRAME_ID_PREFIX,
    RENDER_FRAME_ID_SUFFIX
  );
}
async function injectVideoFramesBatch(page, updates) {
  if (updates.length === 0) return [];
  return await page.evaluate(
    // fallow-ignore-next-line complexity
    async (items, visualProperties, colorGradingSourceHiddenAttr) => {
      const injectedIds = [];
      const pendingDecodes = [];
      const replacementLayoutProperties = /* @__PURE__ */ new Set([
        "width",
        "height",
        "top",
        "left",
        "right",
        "bottom",
        "inset"
      ]);
      const isVisualAncestorHidden = (el) => {
        let parent = el.parentElement;
        while (parent !== null && parent !== document.documentElement) {
          const computed = window.getComputedStyle(parent);
          if (computed.display === "none") return true;
          if (computed.visibility === "hidden" && (parent.hasAttribute("data-composition-src") || parent.hasAttribute("data-composition-file"))) {
            return true;
          }
          parent = parent.parentElement;
        }
        return false;
      };
      for (const item of items) {
        const video = window.__hfMediaEl?.(item.videoId) ?? document.getElementById(item.videoId);
        if (!video) continue;
        let img = video.nextElementSibling;
        const hasImg = img !== null && img.classList.contains("__render_frame__");
        if (isVisualAncestorHidden(video)) {
          if (hasImg && img) img.style.setProperty("visibility", "hidden", "important");
          continue;
        }
        const isNewImage = !hasImg;
        const computedStyle = window.getComputedStyle(video);
        const opacityParsed = parseFloat(computedStyle.opacity);
        const computedOpacity = video.hasAttribute(colorGradingSourceHiddenAttr) ? 1 : Number.isNaN(opacityParsed) ? 1 : opacityParsed;
        if (isNewImage) {
          img = document.createElement("img");
          img.classList.add("__render_frame__");
          img.id = item.frameId;
          img.style.pointerEvents = "none";
          video.parentNode?.insertBefore(img, video.nextSibling);
        }
        if (!img) continue;
        for (const property of visualProperties) {
          if (property === "opacity") continue;
          if (replacementLayoutProperties.has(property)) {
            continue;
          }
          const value = computedStyle.getPropertyValue(property);
          if (value) {
            img.style.setProperty(property, value);
          }
        }
        {
          const videoRect = video.getBoundingClientRect();
          const offsetLeft = Number.isFinite(video.offsetLeft) ? video.offsetLeft : 0;
          const offsetTop = Number.isFinite(video.offsetTop) ? video.offsetTop : 0;
          const offsetWidth = video.offsetWidth > 0 ? video.offsetWidth : videoRect.width;
          const offsetHeight = video.offsetHeight > 0 ? video.offsetHeight : videoRect.height;
          img.style.position = "absolute";
          img.style.inset = "auto";
          img.style.left = `${offsetLeft}px`;
          img.style.top = `${offsetTop}px`;
          img.style.right = "auto";
          img.style.bottom = "auto";
          img.style.width = `${offsetWidth}px`;
          img.style.height = `${offsetHeight}px`;
        }
        img.style.objectFit = computedStyle.objectFit;
        img.style.objectPosition = computedStyle.objectPosition;
        img.style.zIndex = computedStyle.zIndex;
        img.decoding = "sync";
        if (img.getAttribute("src") !== item.dataUri) {
          img.src = item.dataUri;
          const source = item.dataUri.startsWith("data:") ? "inline frame" : item.dataUri;
          pendingDecodes.push(
            img.decode().catch((error) => {
              throw new Error(
                `Video frame for "${item.videoId}" failed to load (${source}): ${error instanceof Error ? error.message : String(error)}`
              );
            })
          );
        }
        img.style.opacity = String(computedOpacity);
        img.style.visibility = "visible";
        video.style.setProperty("visibility", "hidden", "important");
        video.style.setProperty("pointer-events", "none", "important");
        injectedIds.push(item.videoId);
      }
      if (pendingDecodes.length > 0) {
        await Promise.all(pendingDecodes);
      }
      if (injectedIds.length > 0) {
        const redraw = window.__hf?.colorGrading?.redraw;
        redraw?.();
      }
      return injectedIds;
    },
    // Build the sibling id with core's function rather than a template here,
    // so the id the readers look up has exactly one definition.
    updates.map((update) => ({ ...update, frameId: renderFrameIdForRenderId(update.videoId) })),
    [...MEDIA_VISUAL_STYLE_PROPERTIES],
    COLOR_GRADING_SOURCE_HIDDEN_ATTR
  );
}
async function syncVideoFrameVisibility(page, activeVideoIds) {
  await page.evaluate(
    // fallow-ignore-next-line complexity
    (ids, colorGradingSourceHiddenAttr) => {
      const isVisualAncestorHidden = (el) => {
        let parent = el.parentElement;
        while (parent !== null && parent !== document.documentElement) {
          const computed = window.getComputedStyle(parent);
          if (computed.display === "none") return true;
          if (computed.visibility === "hidden" && (parent.hasAttribute("data-composition-src") || parent.hasAttribute("data-composition-file"))) {
            return true;
          }
          parent = parent.parentElement;
        }
        return false;
      };
      const active = new Set(ids);
      const setColorGradingVisibility = window.__hf?.colorGrading?.setSourceVisibility;
      const videos = Array.from(
        document.querySelectorAll("video[data-start]")
      );
      for (const video of videos) {
        const img = video.nextElementSibling;
        const hasImg = img && img.classList.contains("__render_frame__");
        const ancestorHidden = isVisualAncestorHidden(video);
        const visible = active.has(video.id) && !ancestorHidden;
        if (visible) {
          video.style.setProperty("visibility", "hidden", "important");
          video.style.setProperty("pointer-events", "none", "important");
          if (hasImg) {
            if (video.hasAttribute(colorGradingSourceHiddenAttr)) img.style.opacity = "1";
            img.style.visibility = "visible";
          }
        } else {
          video.style.setProperty("visibility", "hidden", "important");
          video.style.setProperty("pointer-events", "none", "important");
          if (hasImg) {
            img.style.setProperty("visibility", "hidden", "important");
          }
        }
        setColorGradingVisibility?.(video, visible);
      }
    },
    activeVideoIds,
    COLOR_GRADING_SOURCE_HIDDEN_ATTR
  );
}

// ../engine/src/services/drawElementService.ts
var DE_CANVAS_NOT_INITIALIZED_CODE = "HF_DE_CANVAS_NOT_INITIALIZED";
function resolveDrawElementCaptureMode(isSwiftShader, transparent) {
  void transparent;
  if (isSwiftShader) return "screenshot";
  return "drawelement";
}
function instrumentAcceleratedCanvases() {
  const w = window;
  w.__hf_accel_canvases = [];
  w.__hf_canvas_2d = [];
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function(type, attrs) {
    const isGl = type === "webgl" || type === "webgl2" || type === "experimental-webgl";
    const isAccel = isGl || type === "webgpu";
    const finalAttrs = isGl ? { ...attrs, preserveDrawingBuffer: true } : attrs;
    const ctx = orig.call(this, type, finalAttrs);
    if (ctx && isAccel) {
      const list = w.__hf_accel_canvases ?? [];
      if (!list.includes(this)) list.push(this);
      w.__hf_accel_canvases = list;
    }
    if (ctx && type === "2d") {
      const list2d = w.__hf_canvas_2d ?? [];
      if (!list2d.includes(this)) list2d.push(this);
      w.__hf_canvas_2d = list2d;
    }
    return ctx;
  };
}
function classifyGpuRenderer(renderer) {
  if (!renderer) return void 0;
  const r = renderer.toLowerCase();
  const backend = r.includes("swiftshader") ? "swiftshader" : r.includes("metal") ? "metal" : r.includes("direct3d11") || r.includes("d3d11") ? "d3d11" : r.includes("direct3d9") || r.includes("d3d9") ? "d3d9" : r.includes("vulkan") ? "vulkan" : r.includes("opengl") || r.includes("angle") ? "opengl" : "other";
  const vendor = r.includes("apple") ? "apple" : r.includes("nvidia") ? "nvidia" : r.includes("amd") || r.includes("radeon") ? "amd" : r.includes("intel") ? "intel" : r.includes("microsoft") ? "microsoft" : "other";
  return `${backend}/${vendor}`;
}
async function detectGpuBackend(page) {
  return page.evaluate(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return { isSwiftShader: false, renderer: null };
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return { isSwiftShader: false, renderer: null };
    const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    return { isSwiftShader: renderer.toLowerCase().includes("swiftshader"), renderer };
  });
}
async function injectDrawElementCanvas(page, width, height) {
  await page.evaluate(
    ({ w, h }) => {
      const root = document.querySelector("[data-composition-id]");
      if (!root || document.getElementById("__hf_de_canvas")) return;
      try {
        window.__HF_ROOT_BASE_OPACITY__ = parseFloat(getComputedStyle(root).opacity) || 1;
      } catch {
      }
      const parent = root.parentNode;
      if (!parent) throw new Error("drawElement: composition root has no parent node");
      const canvas = document.createElement("canvas");
      canvas.id = "__hf_de_canvas";
      canvas.setAttribute("layoutsubtree", "");
      canvas.width = w;
      canvas.height = h;
      canvas.style.cssText = "display:block;position:absolute;top:0;left:0;z-index:0";
      parent.insertBefore(canvas, root);
      canvas.appendChild(root);
      const tick = document.createElement("div");
      tick.id = "__hf_de_tick";
      tick.style.cssText = "position:absolute;left:0px;top:0;width:1px;height:1px;background:#000;opacity:0.01;pointer-events:none";
      canvas.appendChild(tick);
      window.__hfDeInvalidate = () => {
        tick.style.backgroundColor = tick.style.backgroundColor === "rgb(0, 0, 0)" ? "rgb(1, 1, 1)" : "rgb(0, 0, 0)";
        const cvp = canvas;
        if (typeof cvp.requestPaint === "function") {
          try {
            cvp.requestPaint();
            return true;
          } catch {
          }
        }
        return false;
      };
    },
    { w: width, h: height }
  );
}
async function captureDrawElementFrame(page, width, height, format = "jpeg", quality = 80, syncToPaintEvent = true) {
  const dataUrl = await page.evaluate(
    ({
      w,
      h,
      fmt,
      q,
      sync
    }) => {
      const canvas = document.getElementById("__hf_de_canvas");
      const root = document.querySelector("[data-composition-id]");
      if (!root) {
        throw new Error("HF_DE_COMPOSITION_ROOT_MISSING: drawElement composition root not found");
      }
      if (!canvas) {
        throw new Error("HF_DE_CANVAS_NOT_INITIALIZED: drawElement canvas not initialized");
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("drawElement: 2d context unavailable");
      const aw = window;
      let usedRequestPaint = false;
      aw.__hf3d?.update();
      const accel = (aw.__hf_accel_canvases ?? []).filter((c) => root.contains(c));
      if (!sync) {
        for (const c of (aw.__hf_canvas_2d ?? []).filter((c2) => root.contains(c2))) {
          if (!accel.includes(c)) accel.push(c);
        }
        accel.sort(
          (a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        );
      }
      for (const c of accel) {
        if (c.style.visibility !== "hidden") c.style.visibility = "hidden";
      }
      return new Promise((resolveCapture, rejectCapture) => {
        let settled = false;
        const drawAndEncode = () => {
          if (settled) return;
          settled = true;
          try {
            ctx.clearRect(0, 0, w, h);
            let bg = "";
            for (let el = root.parentElement; el; el = el.parentElement) {
              const c = getComputedStyle(el).backgroundColor;
              if (c && c !== "transparent" && c !== "rgba(0, 0, 0, 0)") {
                bg = c;
                break;
              }
            }
            if (!bg && fmt === "jpeg") bg = "#fff";
            if (bg) {
              ctx.fillStyle = bg;
              ctx.fillRect(0, 0, w, h);
            }
            const rootRect = root.getBoundingClientRect();
            for (const c of accel) {
              if (c.hasAttribute("data-hf-3d")) continue;
              const r = c.getBoundingClientRect();
              try {
                ctx.drawImage(c, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height);
              } catch {
              }
            }
            let __appliedTransform = false;
            let __appliedAlpha = false;
            if (aw.__HF_ROOT_PROPS__) {
              try {
                const rcs = getComputedStyle(root);
                if (!usedRequestPaint) {
                  const baseOp = aw.__HF_ROOT_BASE_OPACITY__ ?? 1;
                  const curOp = parseFloat(rcs.opacity);
                  if (baseOp > 1e-3 && Number.isFinite(curOp)) {
                    const ratio = curOp / baseOp;
                    if (Math.abs(ratio - 1) > 2e-3) {
                      ctx.globalAlpha = Math.max(0, Math.min(1, ratio));
                      __appliedAlpha = true;
                    }
                  }
                }
                const curTransform = rcs.transform;
                if (curTransform && curTransform !== "none") {
                  const m = new DOMMatrix(curTransform);
                  const origin = rcs.transformOrigin.split(" ");
                  const ox = parseFloat(origin[0] ?? "0") || 0;
                  const oy = parseFloat(origin[1] ?? "0") || 0;
                  ctx.translate(ox, oy);
                  ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
                  ctx.translate(-ox, -oy);
                  __appliedTransform = true;
                }
              } catch {
              }
            }
            ctx.drawElementImage(root, 0, 0);
            if (__appliedAlpha) ctx.globalAlpha = 1;
            if (__appliedTransform) ctx.setTransform(1, 0, 0, 1, 0, 0);
            for (const c of accel) {
              if (!c.hasAttribute("data-hf-3d")) continue;
              const r = c.getBoundingClientRect();
              try {
                ctx.drawImage(c, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height);
              } catch {
              }
            }
          } catch (e) {
            rejectCapture(e instanceof Error ? e : new Error(String(e)));
            return;
          }
          setTimeout(() => {
            try {
              resolveCapture(
                fmt === "png" ? canvas.toDataURL("image/png") : canvas.toDataURL("image/jpeg", q / 100)
              );
            } catch (e) {
              rejectCapture(e instanceof Error ? e : new Error(String(e)));
            }
          }, 0);
        };
        if (!sync) {
          drawAndEncode();
          return;
        }
        const onPaint = () => {
          canvas.removeEventListener("paint", onPaint);
          drawAndEncode();
        };
        canvas.addEventListener("paint", onPaint);
        usedRequestPaint = aw.__hfDeInvalidate?.() === true;
        setTimeout(() => {
          canvas.removeEventListener("paint", onPaint);
          drawAndEncode();
        }, 250);
      });
    },
    { w: width, h: height, fmt: format, q: quality, sync: syncToPaintEvent }
  );
  const base64 = dataUrl.split(",")[1];
  if (!base64) throw new Error("drawElement: toDataURL returned no base64 payload");
  return Buffer.from(base64, "base64");
}
var workerEncodeStates = /* @__PURE__ */ new WeakMap();
var workerEncodeBoundPages = /* @__PURE__ */ new WeakSet();
async function initDrawElementWorkerEncode(page) {
  const existing = workerEncodeStates.get(page);
  if (existing) {
    for (const entry of existing.pending.values()) {
      entry.reject(new Error("drawElement worker encode: session reused, frame dropped"));
    }
    existing.pending.clear();
    existing.nextId = 0;
  } else {
    const state = { nextId: 0, pending: /* @__PURE__ */ new Map() };
    workerEncodeStates.set(page, state);
  }
  if (!workerEncodeBoundPages.has(page)) {
    workerEncodeBoundPages.add(page);
    await page.exposeFunction("__hfFrameReady", (id, b64, error) => {
      const s = workerEncodeStates.get(page);
      if (!s) return;
      if (id < 0) {
        for (const entry2 of s.pending.values()) {
          entry2.reject(new Error(`drawElement worker encode failed: ${error ?? "worker error"}`));
        }
        s.pending.clear();
        return;
      }
      const entry = s.pending.get(id);
      if (!entry) return;
      s.pending.delete(id);
      if (error) {
        entry.reject(new Error(`drawElement worker encode failed: ${error}`));
      } else if (!b64) {
        entry.reject(new Error(`drawElement worker encode returned empty frame (frame ${id})`));
      } else {
        entry.resolve(Buffer.from(b64, "base64"));
      }
    });
  }
  await page.evaluate(() => {
    const ew = window;
    if (ew.__hfEncWorker) {
      ew.__hfEncWorker.terminate();
      ew.__hfEncWorker = void 0;
    }
    const workerSrc = `
      // Reuse one OffscreenCanvas across frames (dimensions are constant for a
      // render) \u2014 a fresh canvas per frame churns ~w*h*4 bytes of backing store
      // every frame and pressures GC on the encode hot path.
      let oc = null, c = null;
      self.onmessage = async (e) => {
        const { bmp, id, w, h, q } = e.data;
        try {
          if (!oc || oc.width !== w || oc.height !== h) {
            oc = new OffscreenCanvas(w, h);
            c = oc.getContext('2d');
          }
          if (!c) throw new Error('OffscreenCanvas 2d context unavailable');
          c.drawImage(bmp, 0, 0);
          bmp.close();
          const blob = await oc.convertToBlob({ type: 'image/jpeg', quality: q });
          const ab = await blob.arrayBuffer();
          const u = new Uint8Array(ab);
          let s = ''; const CH = 0x8000;
          for (let i = 0; i < u.length; i += CH)
            s += String.fromCharCode.apply(null, u.subarray(i, i + CH));
          self.postMessage({ id, b64: btoa(s) });
        } catch (err) {
          try { if (bmp) bmp.close(); } catch (_) {}
          self.postMessage({ id, error: (err && err.message) || String(err) });
        }
      };
    `;
    const url = URL.createObjectURL(new Blob([workerSrc], { type: "text/javascript" }));
    const worker = new Worker(url);
    URL.revokeObjectURL(url);
    ew.__hfEncWorker = worker;
    worker.onmessage = (ev) => {
      const d = ev.data;
      ew.__hfFrameReady?.(d.id, d.b64 ?? "", d.error);
    };
    worker.onerror = (err) => {
      ew.__hfFrameReady?.(-1, "", err.message || "worker fatal error");
    };
  });
}
function cleanupDrawElementWorkerEncode(page) {
  const state = workerEncodeStates.get(page);
  if (!state) return;
  for (const entry of state.pending.values()) {
    entry.reject(new Error("drawElement worker encode: session closed"));
  }
  state.pending.clear();
  workerEncodeStates.delete(page);
}
async function produceDrawElementFrame(page, width, height, quality = 80, syncToPaintEvent = true) {
  const state = workerEncodeStates.get(page);
  if (!state) {
    throw new Error(
      "drawElement worker encode not initialized; call initDrawElementWorkerEncode first"
    );
  }
  const frameId = ++state.nextId;
  const encodeResult = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (state.pending.delete(frameId)) {
        reject(new Error(`drawElement worker encode timed out (frame ${frameId})`));
      }
    }, 3e4);
    state.pending.set(frameId, {
      resolve: (b) => {
        clearTimeout(timer);
        resolve(b);
      },
      reject: (e) => {
        clearTimeout(timer);
        reject(e);
      }
    });
  });
  void encodeResult.catch(() => {
  });
  await page.evaluate(
    ({ w, h, q, sync, fid }) => {
      const canvas = document.getElementById("__hf_de_canvas");
      const root = document.querySelector("[data-composition-id]");
      if (!root) {
        throw new Error("HF_DE_COMPOSITION_ROOT_MISSING: drawElement composition root not found");
      }
      if (!canvas) {
        throw new Error("HF_DE_CANVAS_NOT_INITIALIZED: drawElement canvas not initialized");
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("drawElement: 2d context unavailable");
      const aw = window;
      aw.__hf3d?.update();
      const accel = (aw.__hf_accel_canvases ?? []).filter((c) => root.contains(c));
      if (!sync) {
        for (const c of (aw.__hf_canvas_2d ?? []).filter((c2) => root.contains(c2))) {
          if (!accel.includes(c)) accel.push(c);
        }
        accel.sort(
          (a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        );
      }
      for (const c of accel) {
        if (c.style.visibility !== "hidden") c.style.visibility = "hidden";
      }
      return new Promise((resolveCapture, rejectCapture) => {
        let settled = false;
        let usedRequestPaint = false;
        const drawAndKick = () => {
          if (settled) return;
          settled = true;
          try {
            ctx.clearRect(0, 0, w, h);
            let bg = "";
            for (let el = root.parentElement; el; el = el.parentElement) {
              const c = getComputedStyle(el).backgroundColor;
              if (c && c !== "transparent" && c !== "rgba(0, 0, 0, 0)") {
                bg = c;
                break;
              }
            }
            if (!bg) bg = "#fff";
            if (bg) {
              ctx.fillStyle = bg;
              ctx.fillRect(0, 0, w, h);
            }
            const rootRect = root.getBoundingClientRect();
            for (const c of accel) {
              if (c.hasAttribute("data-hf-3d")) continue;
              const r = c.getBoundingClientRect();
              try {
                ctx.drawImage(c, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height);
              } catch {
              }
            }
            let __appliedTransform = false;
            let __appliedAlpha = false;
            if (aw.__HF_ROOT_PROPS__) {
              try {
                const rcs = getComputedStyle(root);
                if (!usedRequestPaint) {
                  const baseOp = aw.__HF_ROOT_BASE_OPACITY__ ?? 1;
                  const curOp = parseFloat(rcs.opacity);
                  if (baseOp > 1e-3 && Number.isFinite(curOp)) {
                    const ratio = curOp / baseOp;
                    if (Math.abs(ratio - 1) > 2e-3) {
                      ctx.globalAlpha = Math.max(0, Math.min(1, ratio));
                      __appliedAlpha = true;
                    }
                  }
                }
                const curTransform = rcs.transform;
                if (curTransform && curTransform !== "none") {
                  const m = new DOMMatrix(curTransform);
                  const origin = rcs.transformOrigin.split(" ");
                  const ox = parseFloat(origin[0] ?? "0") || 0;
                  const oy = parseFloat(origin[1] ?? "0") || 0;
                  ctx.translate(ox, oy);
                  ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
                  ctx.translate(-ox, -oy);
                  __appliedTransform = true;
                }
              } catch {
              }
            }
            ctx.drawElementImage(root, 0, 0);
            if (__appliedAlpha) ctx.globalAlpha = 1;
            if (__appliedTransform) ctx.setTransform(1, 0, 0, 1, 0, 0);
            for (const c of accel) {
              if (!c.hasAttribute("data-hf-3d")) continue;
              const r = c.getBoundingClientRect();
              try {
                ctx.drawImage(c, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height);
              } catch {
              }
            }
          } catch (e) {
            rejectCapture(e instanceof Error ? e : new Error(String(e)));
            return;
          }
          createImageBitmap(canvas).then((bmp) => {
            const ew = window;
            if (!ew.__hfEncWorker) {
              bmp.close();
              rejectCapture(new Error("drawElement: encode worker not initialized"));
              return;
            }
            ew.__hfEncWorker.postMessage({ bmp, id: fid, w, h, q: q / 100 }, [bmp]);
            resolveCapture();
          }).catch((e) => {
            rejectCapture(e instanceof Error ? e : new Error(String(e)));
          });
        };
        if (!sync) {
          drawAndKick();
          return;
        }
        const onPaint = () => {
          canvas.removeEventListener("paint", onPaint);
          drawAndKick();
        };
        canvas.addEventListener("paint", onPaint);
        usedRequestPaint = aw.__hfDeInvalidate?.() === true;
        setTimeout(() => {
          canvas.removeEventListener("paint", onPaint);
          drawAndKick();
        }, 250);
      });
    },
    { w: width, h: height, q: quality, sync: syncToPaintEvent, fid: frameId }
  );
  return { encodeResult };
}
async function produceDrawElementFrameBatch(page, times, width, height, quality = 80) {
  const state = workerEncodeStates.get(page);
  if (!state) {
    throw new Error(
      "drawElement worker encode not initialized; call initDrawElementWorkerEncode first"
    );
  }
  const fids = [];
  const encodeResults = [];
  for (let i = 0; i < times.length; i++) {
    const frameId = ++state.nextId;
    fids.push(frameId);
    const p = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (state.pending.delete(frameId)) {
          reject(new Error(`drawElement worker encode timed out (frame ${frameId})`));
        }
      }, 3e4);
      state.pending.set(frameId, {
        resolve: (b) => {
          clearTimeout(timer);
          resolve(b);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        }
      });
    });
    void p.catch(() => {
    });
    encodeResults.push(p);
  }
  const outcome = await page.evaluate(
    async ({
      frames,
      w,
      h,
      q
    }) => {
      const canvas = document.getElementById("__hf_de_canvas");
      const root = document.querySelector("[data-composition-id]");
      if (!root) {
        return {
          failedAt: 0,
          error: "HF_DE_COMPOSITION_ROOT_MISSING: drawElement composition root not found"
        };
      }
      if (!canvas) {
        return {
          failedAt: 0,
          error: "HF_DE_CANVAS_NOT_INITIALIZED: drawElement canvas not initialized"
        };
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return { failedAt: 0, error: "drawElement: 2d context unavailable" };
      const aw = window;
      let usedRequestPaint = false;
      const waitPaint = () => new Promise((res) => {
        let done = false;
        const settle = () => {
          if (done) return;
          done = true;
          canvas.removeEventListener("paint", settle);
          res();
        };
        canvas.addEventListener("paint", settle);
        usedRequestPaint = aw.__hfDeInvalidate?.() === true;
        setTimeout(settle, 250);
      });
      let prevBitmap = Promise.resolve();
      let prevBitmapIdx = -1;
      const errMsg = (e) => e instanceof Error ? e.message : String(e);
      for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        if (!frame) return { failedAt: i, error: "batch frame missing" };
        const { t, fid } = frame;
        try {
          if (aw.__hf && typeof aw.__hf.seek === "function") aw.__hf.seek(t);
          await aw.__hfDecodeDynamicCssBackgroundImages?.();
          aw.__hf3d?.update();
          const accel = (aw.__hf_accel_canvases ?? []).filter((c) => root.contains(c));
          for (const c of accel) {
            if (c.style.visibility !== "hidden") c.style.visibility = "hidden";
          }
          await waitPaint();
          try {
            await prevBitmap;
          } catch (e) {
            return { failedAt: prevBitmapIdx, error: errMsg(e) };
          }
          ctx.clearRect(0, 0, w, h);
          let bg = "";
          for (let el = root.parentElement; el; el = el.parentElement) {
            const c = getComputedStyle(el).backgroundColor;
            if (c && c !== "transparent" && c !== "rgba(0, 0, 0, 0)") {
              bg = c;
              break;
            }
          }
          ctx.fillStyle = bg || "#fff";
          ctx.fillRect(0, 0, w, h);
          const rootRect = root.getBoundingClientRect();
          for (const c of accel) {
            if (c.hasAttribute("data-hf-3d")) continue;
            const r = c.getBoundingClientRect();
            try {
              ctx.drawImage(c, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height);
            } catch {
            }
          }
          let appliedTransform = false;
          let appliedAlpha = false;
          if (aw.__HF_ROOT_PROPS__) {
            try {
              const rcs = getComputedStyle(root);
              if (!usedRequestPaint) {
                const baseOp = aw.__HF_ROOT_BASE_OPACITY__ ?? 1;
                const curOp = parseFloat(rcs.opacity);
                if (baseOp > 1e-3 && Number.isFinite(curOp)) {
                  const ratio = curOp / baseOp;
                  if (Math.abs(ratio - 1) > 2e-3) {
                    ctx.globalAlpha = Math.max(0, Math.min(1, ratio));
                    appliedAlpha = true;
                  }
                }
              }
              const curTransform = rcs.transform;
              if (curTransform && curTransform !== "none") {
                const m = new DOMMatrix(curTransform);
                const origin = rcs.transformOrigin.split(" ");
                const ox = parseFloat(origin[0] ?? "0") || 0;
                const oy = parseFloat(origin[1] ?? "0") || 0;
                ctx.translate(ox, oy);
                ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
                ctx.translate(-ox, -oy);
                appliedTransform = true;
              }
            } catch {
            }
          }
          ctx.drawElementImage(root, 0, 0);
          if (appliedAlpha) ctx.globalAlpha = 1;
          if (appliedTransform) ctx.setTransform(1, 0, 0, 1, 0, 0);
          for (const c of accel) {
            if (!c.hasAttribute("data-hf-3d")) continue;
            const r = c.getBoundingClientRect();
            try {
              ctx.drawImage(c, r.left - rootRect.left, r.top - rootRect.top, r.width, r.height);
            } catch {
            }
          }
          prevBitmapIdx = i;
          prevBitmap = createImageBitmap(canvas).then((bmp) => {
            if (!aw.__hfEncWorker) {
              bmp.close();
              throw new Error("drawElement: encode worker not initialized");
            }
            aw.__hfEncWorker.postMessage({ bmp, id: fid, w, h, q: q / 100 }, [bmp]);
          });
        } catch (e) {
          try {
            await prevBitmap;
          } catch {
          }
          return { failedAt: i, error: errMsg(e) };
        }
      }
      try {
        await prevBitmap;
      } catch (e) {
        return { failedAt: prevBitmapIdx, error: errMsg(e) };
      }
      return { failedAt: null };
    },
    { frames: times.map((t, i) => ({ t, fid: fids[i] ?? 0 })), w: width, h: height, q: quality }
  );
  if (outcome.failedAt !== null) {
    for (let k = outcome.failedAt; k < fids.length; k++) {
      const fid = fids[k];
      if (fid === void 0) continue;
      const entry = state.pending.get(fid);
      if (entry) {
        state.pending.delete(fid);
        entry.reject(
          new Error(`drawElement batch produce failed at frame ${k}: ${outcome.error ?? "?"}`)
        );
      }
    }
  }
  return { encodeResults, failedAt: outcome.failedAt, error: outcome.error };
}

// ../engine/src/services/threeDProjection.ts
async function initThreeDProjectionInPage() {
  const root = document.querySelector("[data-composition-id]");
  if (!root) return { ok: true, groups: 0, quads: 0 };
  const isThreeDMatrix = (transform) => {
    if (!transform.startsWith("matrix3d")) return false;
    const n = (transform.slice(transform.indexOf("(") + 1).match(/-?[\d.e+-]+/g) ?? []).map(Number);
    if (n.length !== 16) return false;
    const eps = 1e-6;
    const cross = [n[2], n[6], n[8], n[9], n[3], n[7], n[11]];
    if (cross.some((v) => Math.abs(v ?? 0) > eps)) return true;
    return Math.abs((n[10] ?? 1) - 1) > eps;
  };
  const isContextRoot = (el) => {
    const cs = getComputedStyle(el);
    if (cs.perspective !== "none") return true;
    if (cs.transformStyle === "preserve-3d") {
      const parent = el.parentElement;
      if (!parent || getComputedStyle(parent).perspective === "none") return true;
    }
    return false;
  };
  const groupRoots = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    const el = node;
    if (groupRoots.some((g) => g.contains(el))) {
      node = walker.nextNode();
      continue;
    }
    if (isContextRoot(el)) groupRoots.push(el);
    node = walker.nextNode();
  }
  const selfQuadEls = /* @__PURE__ */ new Set();
  const claimed = (el) => groupRoots.some((g) => g === el || g.contains(el) || el.contains(g));
  {
    const w3d = window;
    for (const target of w3d.__hf3dTweenTargets ?? []) {
      let els = [];
      if (typeof target === "string") {
        try {
          els = Array.from(document.querySelectorAll(target));
        } catch {
          els = [];
        }
      } else if (target instanceof HTMLElement) {
        els = [target];
      } else if (Array.isArray(target)) {
        els = target.filter((t) => t instanceof HTMLElement);
      }
      for (const el of els) {
        if (root.contains(el) && !claimed(el)) selfQuadEls.add(el);
      }
    }
    const scan = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let n2 = scan.nextNode();
    while (n2) {
      const el = n2;
      if (!claimed(el) && !selfQuadEls.has(el) && isThreeDMatrix(getComputedStyle(el).transform)) {
        let covered = false;
        for (const s of selfQuadEls) {
          if (s.contains(el)) {
            covered = true;
            break;
          }
        }
        if (!covered) selfQuadEls.add(el);
      }
      n2 = scan.nextNode();
    }
  }
  if (groupRoots.length === 0 && selfQuadEls.size === 0) {
    return { ok: true, groups: 0, quads: 0 };
  }
  const animatedEls = /* @__PURE__ */ new Set();
  {
    const wAll = window;
    for (const target of wAll.__hfAllTweenTargets ?? []) {
      if (typeof target === "string") {
        try {
          for (const el of Array.from(document.querySelectorAll(target))) {
            if (el instanceof HTMLElement) animatedEls.add(el);
          }
        } catch {
        }
      } else if (target instanceof HTMLElement) {
        animatedEls.add(target);
      } else if (Array.isArray(target)) {
        for (const t of target) if (t instanceof HTMLElement) animatedEls.add(t);
      }
    }
  }
  const hasAnimatedStrictDescendant = (el) => {
    for (const a of animatedEls) {
      if (a !== el && el.contains(a)) return true;
    }
    return false;
  };
  const toDataUrl = async (url) => {
    const resp = await fetch(url);
    const blob = await resp.blob();
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = () => reject(new Error(`FileReader failed for ${url}`));
      r.readAsDataURL(blob);
    });
  };
  const buildFontCss = async () => {
    const rules = [];
    for (const sheet of Array.from(document.styleSheets)) {
      let cssRules;
      try {
        cssRules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of Array.from(cssRules)) {
        if (!(rule instanceof CSSFontFaceRule)) continue;
        let text = rule.cssText;
        const urls = Array.from(text.matchAll(/url\((['"]?)([^'")]+)\1\)/g));
        for (const m of urls) {
          const src = m[2];
          if (!src) continue;
          try {
            const data = await toDataUrl(new URL(src, document.baseURI).href);
            text = text.replace(m[0], `url(${data})`);
          } catch {
          }
        }
        rules.push(text);
      }
    }
    return rules.join("\n");
  };
  const fontCss = await buildFontCss();
  const URL_VALUE_PATTERN = /url\((['"]?)(?!data:)([^'")]+)\1\)/g;
  const inlineCloneStyles = async (orig, clone) => {
    const origEls = [
      orig,
      ...Array.from(orig.querySelectorAll("*"))
    ];
    const cloneEls = [
      clone,
      ...Array.from(clone.querySelectorAll("*"))
    ];
    for (let i = 0; i < origEls.length; i++) {
      const source = origEls[i];
      const target = cloneEls[i];
      if (!source || !target || !target.style) continue;
      const cs = getComputedStyle(source);
      let cssText = "";
      for (const prop of Array.from(cs)) {
        cssText += `${prop}:${cs.getPropertyValue(prop)};`;
      }
      target.setAttribute("style", cssText);
      target.removeAttribute("class");
      const bg = cs.getPropertyValue("background-image");
      if (bg && bg !== "none") {
        let inlined = bg;
        for (const m of Array.from(bg.matchAll(URL_VALUE_PATTERN))) {
          const src = m[2];
          if (!src) continue;
          try {
            inlined = inlined.replace(m[0], `url(${await toDataUrl(src)})`);
          } catch {
          }
        }
        target.style.backgroundImage = inlined;
      }
    }
    for (const img of Array.from(clone.querySelectorAll("img"))) {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("data:")) {
        try {
          img.setAttribute("src", await toDataUrl(new URL(src, document.baseURI).href));
        } catch {
          img.removeAttribute("src");
        }
      }
    }
  };
  const rasterizeQuad = async (el, shell) => {
    const w = Math.max(1, Math.ceil(el.offsetWidth));
    const h = Math.max(1, Math.ceil(el.offsetHeight));
    const clone = el.cloneNode(true);
    await inlineCloneStyles(el, clone);
    if (shell) {
      for (const child of Array.from(clone.children)) {
        child.style.display = "none";
      }
    }
    clone.style.transform = "none";
    clone.style.position = "static";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.margin = "0";
    clone.style.visibility = "visible";
    clone.style.opacity = "1";
    clone.style.clipPath = "none";
    clone.style.backfaceVisibility = "visible";
    const xml = new XMLSerializer().serializeToString(clone);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` + (fontCss ? `<style>${fontCss.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</style>` : "") + `<foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await img.decode();
    return img;
  };
  const ident = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const mul = (a, b) => {
    const o = new Array(16).fill(0);
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 4; c++)
        for (let k = 0; k < 4; k++)
          o[r * 4 + c] = (o[r * 4 + c] ?? 0) + (a[r * 4 + k] ?? 0) * (b[k * 4 + c] ?? 0);
    return o;
  };
  const translate = (x, y, z = 0) => {
    const m = ident();
    m[3] = x;
    m[7] = y;
    m[11] = z;
    return m;
  };
  const perspectiveMat = (d) => {
    const m = ident();
    m[14] = -1 / d;
    return m;
  };
  const parseTransform = (value) => {
    if (!value || value === "none") return ident();
    const nums = (value.slice(value.indexOf("(") + 1).match(/-?[\d.e+-]+/g) ?? []).map(Number);
    const at = (i) => nums[i] ?? 0;
    if (value.startsWith("matrix3d") && nums.length === 16) {
      return [
        at(0),
        at(4),
        at(8),
        at(12),
        at(1),
        at(5),
        at(9),
        at(13),
        at(2),
        at(6),
        at(10),
        at(14),
        at(3),
        at(7),
        at(11),
        at(15)
      ];
    }
    if (nums.length === 6) {
      return [at(0), at(2), 0, at(4), at(1), at(3), 0, at(5), 0, 0, 1, 0, 0, 0, 0, 1];
    }
    return ident();
  };
  const parseOrigin = (value) => {
    const nums = (value.match(/-?[\d.]+/g) ?? []).map(Number);
    return [nums[0] ?? 0, nums[1] ?? 0, nums[2] ?? 0];
  };
  const colMajor = (m) => {
    const at = (i) => m[i] ?? 0;
    return new Float32Array([
      at(0),
      at(4),
      at(8),
      at(12),
      at(1),
      at(5),
      at(9),
      at(13),
      at(2),
      at(6),
      at(10),
      at(14),
      at(3),
      at(7),
      at(11),
      at(15)
    ]);
  };
  const groups = [];
  const threeDNodes = new Set(selfQuadEls);
  {
    const scan3 = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let n3 = scan3.nextNode();
    while (n3) {
      const el = n3;
      const cs = getComputedStyle(el);
      if (cs.transformStyle === "preserve-3d" || isThreeDMatrix(cs.transform)) {
        threeDNodes.add(el);
      }
      n3 = scan3.nextNode();
    }
  }
  const subtreeHasThreeD = (el) => {
    for (const node3 of threeDNodes) {
      if (el !== node3 && el.contains(node3)) return true;
    }
    return false;
  };
  const hasOwnPaint = (el) => {
    const cs = getComputedStyle(el);
    if (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") {
      return true;
    }
    if (cs.backgroundImage !== "none") return true;
    if (Number.parseFloat(cs.borderTopWidth) > 0 || Number.parseFloat(cs.borderLeftWidth) > 0) {
      return true;
    }
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE && (child.textContent ?? "").trim() !== "") {
        return true;
      }
    }
    return false;
  };
  const collectQuads = (parent, chain, out) => {
    for (const child of Array.from(parent.children)) {
      const cs = getComputedStyle(child);
      if (cs.display === "none") continue;
      if (child instanceof HTMLCanvasElement) continue;
      if (cs.transformStyle === "preserve-3d" || subtreeHasThreeD(child)) {
        if (hasOwnPaint(child)) out.push({ el: child, chain: [...chain, child], shell: true });
        collectQuads(child, [...chain, child], out);
      } else {
        out.push({ el: child, chain: [...chain, child], shell: false });
      }
    }
  };
  const VS = "attribute vec3 p; attribute vec2 t; uniform mat4 m; varying vec2 v;void main(){ gl_Position = m * vec4(p,1.0); v = t; }";
  const FS = "precision mediump float; uniform sampler2D s; uniform float a; varying vec2 v;void main(){ gl_FragColor = texture2D(s, v) * a; }";
  const groupSpecs = [
    ...groupRoots.map((g) => ({ g, self: false })),
    ...Array.from(selfQuadEls).map((g) => ({ g, self: true }))
  ];
  for (const { g, self } of groupSpecs) {
    const quadDescs = [];
    if (self) {
      quadDescs.push({ el: g, chain: [], shell: false });
    } else {
      collectQuads(g, [], quadDescs);
    }
    if (quadDescs.length === 0) continue;
    const allChainEls = Array.from(/* @__PURE__ */ new Set([g, ...quadDescs.flatMap((q) => q.chain)]));
    const savedTransforms = allChainEls.map((el) => el.style.transform);
    for (const el of allChainEls) el.style.transform = "none";
    void g.offsetWidth;
    const geoOffsets = /* @__PURE__ */ new Map();
    const geoSizes = /* @__PURE__ */ new Map();
    for (const el of allChainEls) {
      const parent = el.parentElement === g ? g : el.parentElement;
      const pRect = parent.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      geoOffsets.set(el, [r.left - pRect.left, r.top - pRect.top]);
      geoSizes.set(el, [el.offsetWidth, el.offsetHeight]);
    }
    for (let i = 0; i < allChainEls.length; i++) {
      const el = allChainEls[i];
      if (el) el.style.transform = savedTransforms[i] ?? "";
    }
    for (const desc of quadDescs) {
      const leafSize = geoSizes.get(desc.el) ?? [0, 0];
      const inlineInChain = [g, ...desc.chain].some(
        (el) => getComputedStyle(el).display === "inline"
      );
      if (leafSize[0] < 1 || leafSize[1] < 1 || inlineInChain) {
        return {
          ok: false,
          groups: 0,
          quads: 0,
          reason: "degenerate 3D geometry (zero-size or inline-box quad) \u2014 quad projection cannot reproduce Blink's lenient rendering"
        };
      }
      if (!desc.shell && hasAnimatedStrictDescendant(desc.el)) {
        return {
          ok: false,
          groups: 0,
          quads: 0,
          reason: "3D quad contains GSAP-animated descendants \u2014 static texture would freeze them at init state"
        };
      }
    }
    const gw = g.offsetWidth;
    const gh = g.offsetHeight;
    const pad = Math.ceil(Math.max(gw, gh) * 0.25);
    const canvasW = gw + pad * 2;
    const canvasH = gh + pad * 2;
    const anchor = g.offsetParent ?? g.parentElement ?? root;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("data-hf-3d", "");
    canvas.width = canvasW;
    canvas.height = canvasH;
    canvas.style.cssText = `position:absolute;left:${g.offsetLeft - pad}px;top:${g.offsetTop - pad}px;width:${canvasW}px;height:${canvasH}px;pointer-events:none;z-index:${getComputedStyle(g).zIndex === "auto" ? "0" : getComputedStyle(g).zIndex};`;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      // instrumentAcceleratedCanvases forces this too, but the module must
      // not depend on instrumentation order: the composite drawImage happens
      // after a paint yield, and a non-preserved buffer reads blank there.
      preserveDrawingBuffer: true
    });
    if (!gl) return { ok: false, groups: 0, quads: 0, reason: "webgl unavailable" };
    const sh = (type, src) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("createShader failed");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(String(gl.getShaderInfoLog(s)));
      }
      return s;
    };
    const prog = gl.createProgram();
    if (!prog) throw new Error("createProgram failed");
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CW);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    const cs = getComputedStyle(g);
    const perspective = cs.perspective === "none" ? 0 : Number.parseFloat(cs.perspective);
    const pOrigin = parseOrigin(cs.perspectiveOrigin);
    g.style.perspective = "none";
    const backfaceHiddenByEl = /* @__PURE__ */ new Map();
    for (const desc of quadDescs) {
      backfaceHiddenByEl.set(desc.el, getComputedStyle(desc.el).backfaceVisibility === "hidden");
    }
    for (const el of allChainEls) {
      el.style.transformStyle = "flat";
      el.style.backfaceVisibility = "visible";
    }
    const quads = [];
    for (const desc of quadDescs) {
      const img = await rasterizeQuad(desc.el, desc.shell);
      const tex = gl.createTexture();
      if (!tex) throw new Error("createTexture failed");
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const size = geoSizes.get(desc.el) ?? [desc.el.offsetWidth, desc.el.offsetHeight];
      const [qw, qh] = size;
      const verts = new Float32Array([
        0,
        0,
        0,
        0,
        1,
        qw,
        0,
        0,
        1,
        1,
        qw,
        qh,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        qw,
        qh,
        0,
        1,
        0,
        0,
        qh,
        0,
        0,
        0
      ]);
      const buf = gl.createBuffer();
      if (!buf) throw new Error("createBuffer failed");
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
      quads.push({
        el: desc.el,
        chain: desc.chain,
        offsets: desc.chain.map((el) => geoOffsets.get(el) ?? [0, 0]),
        tex,
        buf,
        backfaceHidden: backfaceHiddenByEl.get(desc.el) ?? false
      });
    }
    g.style.clipPath = "inset(100%)";
    anchor.appendChild(canvas);
    groups.push({
      rootEl: g,
      gl,
      prog,
      quads,
      perspective,
      perspOrigin: [pOrigin[0], pOrigin[1]],
      pad,
      canvasW,
      canvasH
    });
  }
  const Z_SCALE = 1 / 1e5;
  const strippedTransforms = /* @__PURE__ */ new WeakMap();
  const isThreeDMat4 = (m) => {
    const eps = 1e-9;
    return Math.abs(m[2] ?? 0) > eps || Math.abs(m[6] ?? 0) > eps || Math.abs(m[8] ?? 0) > eps || Math.abs(m[9] ?? 0) > eps || Math.abs((m[10] ?? 1) - 1) > eps || Math.abs(m[12] ?? 0) > eps || Math.abs(m[13] ?? 0) > eps || Math.abs(m[14] ?? 0) > eps || Math.abs((m[15] ?? 1) - 1) > eps;
  };
  const readTransform = (el) => {
    const value = getComputedStyle(el).transform;
    if (value === "none") {
      return strippedTransforms.get(el) ?? ident();
    }
    const m = parseTransform(value);
    if (isThreeDMat4(m)) {
      strippedTransforms.set(el, m);
      el.style.transform = "none";
    }
    return m;
  };
  const update = () => {
    for (const grp of groups) {
      const { gl, prog, pad, canvasW, canvasH } = grp;
      gl.viewport(0, 0, canvasW, canvasH);
      gl.clearColor(0, 0, 0, 0);
      gl.clearDepth(1);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(prog);
      const ndc = [
        2 / canvasW,
        0,
        0,
        -1,
        0,
        -2 / canvasH,
        0,
        1,
        0,
        0,
        Z_SCALE,
        0,
        0,
        0,
        0,
        1
      ];
      const toCanvas = translate(pad, pad);
      let view = mul(ndc, toCanvas);
      {
        const gCs = getComputedStyle(grp.rootEl);
        const gT = readTransform(grp.rootEl);
        const [gox, goy, goz] = parseOrigin(gCs.transformOrigin);
        view = mul(view, mul(translate(gox, goy, goz), mul(gT, translate(-gox, -goy, -goz))));
      }
      if (grp.perspective > 0) {
        const [px, py] = grp.perspOrigin;
        view = mul(
          view,
          mul(translate(px, py), mul(perspectiveMat(grp.perspective), translate(-px, -py)))
        );
      }
      const mLoc = gl.getUniformLocation(prog, "m");
      const aLoc = gl.getUniformLocation(prog, "a");
      const pLoc = gl.getAttribLocation(prog, "p");
      const tLoc = gl.getAttribLocation(prog, "t");
      const gAlphaCs = getComputedStyle(grp.rootEl);
      const groupAlpha = Number.parseFloat(gAlphaCs.opacity) || 0;
      for (const quad of grp.quads) {
        const quadCs = getComputedStyle(quad.el);
        if (quadCs.visibility === "hidden" || quadCs.display === "none") continue;
        let m = view;
        let alpha = groupAlpha;
        for (let i = 0; i < quad.chain.length; i++) {
          const el = quad.chain[i];
          if (!el) continue;
          const [ox, oy] = quad.offsets[i] ?? [0, 0];
          const elCs = getComputedStyle(el);
          alpha *= Number.parseFloat(elCs.opacity) || 0;
          const t = readTransform(el);
          const [tox, toy, toz] = parseOrigin(elCs.transformOrigin);
          m = mul(
            m,
            mul(
              translate(ox, oy),
              mul(translate(tox, toy, toz), mul(t, translate(-tox, -toy, -toz)))
            )
          );
        }
        if (alpha <= 1e-3) continue;
        gl.uniform1f(aLoc, Math.min(1, alpha));
        if (quad.backfaceHidden) gl.enable(gl.CULL_FACE);
        else gl.disable(gl.CULL_FACE);
        gl.bindBuffer(gl.ARRAY_BUFFER, quad.buf);
        gl.enableVertexAttribArray(pLoc);
        gl.vertexAttribPointer(pLoc, 3, gl.FLOAT, false, 20, 0);
        gl.enableVertexAttribArray(tLoc);
        gl.vertexAttribPointer(tLoc, 2, gl.FLOAT, false, 20, 12);
        gl.bindTexture(gl.TEXTURE_2D, quad.tex);
        gl.uniformMatrix4fv(mLoc, false, colMajor(m));
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    }
  };
  window.__hf3d = { update };
  update();
  return {
    ok: true,
    groups: groups.length,
    quads: groups.reduce((n, grp) => n + grp.quads.length, 0),
    selfQuads: selfQuadEls.size,
    stubTargets: (window.__hf3dTweenTargets ?? []).length
  };
}
async function initThreeDProjection(page) {
  try {
    return await page.evaluate(initThreeDProjectionInPage);
  } catch (e) {
    return { ok: false, groups: 0, quads: 0, reason: e instanceof Error ? e.message : String(e) };
  }
}
async function detectCssEffectRisk(page) {
  try {
    return await page.evaluate(() => {
      const root = document.querySelector("[data-composition-id]");
      if (!root) return null;
      const scanComputed = () => {
        const els = [root, ...Array.from(root.querySelectorAll("*"))];
        for (const el of els) {
          const cs = getComputedStyle(el);
          const bf = cs.backdropFilter || cs.webkitBackdropFilter || "";
          if (bf && bf !== "none") return "backdrop-filter";
          const f = cs.filter || "";
          if (f && f !== "none" && f.indexOf("blur(") !== -1) return "filter:blur";
          if (f && f !== "none" && f.indexOf("drop-shadow(") !== -1) return "filter:drop-shadow";
          const mbm = cs.mixBlendMode || "";
          if (mbm && mbm !== "normal") return "mix-blend-mode";
          const an = cs.animationName || "";
          const ad = cs.animationDuration || "0s";
          if (an && an !== "none" && ad !== "0s" && parseFloat(ad) > 0) return "css-animation";
        }
        return null;
      };
      const scanStyleSheets = () => {
        for (const sheet of Array.from(document.styleSheets)) {
          let rules = null;
          try {
            rules = sheet.cssRules;
          } catch {
            continue;
          }
          for (const rule of Array.from(rules ?? [])) {
            const txt = rule.cssText || "";
            if (/backdrop-filter\s*:\s*(?!none)/i.test(txt)) return "backdrop-filter";
            if (/(?:^|[^-])filter\s*:[^;{}]*blur\(/i.test(txt)) return "filter:blur";
            if (/(?:^|[^-])filter\s*:[^;{}]*drop-shadow\(/i.test(txt)) {
              return "filter:drop-shadow";
            }
            if (/mix-blend-mode\s*:\s*(?!normal)/i.test(txt)) return "mix-blend-mode";
          }
        }
        return null;
      };
      const scanTweenVars = () => {
        const walk = (tl) => {
          if (typeof tl.getChildren !== "function") return null;
          for (const c of tl.getChildren(false, true, true)) {
            const sub = walk(c);
            if (sub) return sub;
            const vars = c.vars || {};
            for (const k of Object.keys(vars)) {
              const kl = k.toLowerCase();
              if (kl.includes("blend")) return "mix-blend-mode";
              if (kl.includes("backdrop")) return "backdrop-filter";
              if (kl === "filter" && /blur\(/i.test(String(vars[k] ?? ""))) return "filter:blur";
              if (kl === "filter" && /drop-shadow\(/i.test(String(vars[k] ?? ""))) {
                return "filter:drop-shadow";
              }
            }
          }
          return null;
        };
        const tls = window.__timelines || {};
        for (const tl of Object.values(tls)) {
          const r = walk(tl);
          if (r) return r;
        }
        return null;
      };
      const scanWebgl = () => {
        const aw = window;
        const accel = (aw.__hf_accel_canvases ?? []).filter((c) => root.contains(c));
        return accel.length > 0 ? "webgl-context" : null;
      };
      return scanComputed() || scanStyleSheets() || scanTweenVars() || scanWebgl();
    });
  } catch {
    return null;
  }
}

// ../engine/src/utils/psnrFilterAvailability.ts
import { execFile } from "child_process";
import { promisify } from "util";

// ../engine/src/utils/ffmpegBinaries.ts
import { existsSync as existsSync2 } from "fs";
import { win32 } from "path";
function ffmpegPathArgument(value) {
  return process.platform === "win32" && value.length >= 260 && win32.isAbsolute(value) ? win32.toNamespacedPath(value) : value;
}
function getFfmpegBinary() {
  return findFfBinary("ffmpeg") ?? "ffmpeg";
}
function getFfprobeBinary() {
  return findFfBinary("ffprobe") ?? "ffprobe";
}
function assertConfiguredFfmpegBinariesExist() {
  const ffmpegPath = process.env[FFMPEG_PATH_ENV]?.trim();
  if (ffmpegPath && !existsSync2(ffmpegPath)) {
    throw new Error(
      `[FFmpeg] FFmpeg binary not found at ${FFMPEG_PATH_ENV}="${ffmpegPath}". Install FFmpeg or unset the override.${pathEncodingHint(ffmpegPath)}`
    );
  }
  const ffprobePath = process.env[FFPROBE_PATH_ENV]?.trim();
  if (ffprobePath && !existsSync2(ffprobePath)) {
    throw new Error(
      `[FFmpeg] FFprobe binary not found at ${FFPROBE_PATH_ENV}="${ffprobePath}". Install FFmpeg or unset the override.${pathEncodingHint(ffprobePath)}`
    );
  }
}
function pathEncodingHint(configuredPath) {
  if (!configuredPath.includes("\uFFFD")) return "";
  return " The path contains a Unicode replacement character, which usually means it was mangled while being copied or decoded.";
}

// ../engine/src/utils/psnrFilterAvailability.ts
var cachedFilterList = null;
function isPsnrFilterAvailable() {
  return isFfmpegFilterAvailable("psnr");
}
async function isFfmpegFilterAvailable(name) {
  if (cachedFilterList === null) cachedFilterList = listFilters();
  const stdout = await cachedFilterList;
  return stdout !== null && new RegExp(`(^|\\s)${name}(\\s|$)`, "m").test(stdout);
}
async function listFilters() {
  const execFileP = promisify(execFile);
  try {
    const { stdout } = await execFileP(getFfmpegBinary(), ["-hide_banner", "-filters"], {
      maxBuffer: 4 * 1024 * 1024,
      timeout: 5e3,
      windowsHide: true
    });
    return stdout;
  } catch {
    return null;
  }
}

// ../engine/src/services/captureWarning.ts
function cloneCaptureWarning(warning) {
  return {
    ...warning,
    details: warning.details ? {
      ...warning.details,
      sources: warning.details.sources ? [...warning.details.sources] : void 0,
      failureReasons: warning.details.failureReasons ? [...warning.details.failureReasons] : void 0,
      failureStages: warning.details.failureStages ? [...warning.details.failureStages] : void 0
    } : void 0
  };
}
function cloneCaptureWarnings(warnings) {
  return warnings.map(cloneCaptureWarning);
}

// ../engine/src/services/mediaRenderIdBridge.ts
async function installMediaRenderIdBridge(page) {
  await page.evaluateOnNewDocument((attr) => {
    window.__hfMediaEl = (id) => {
      const escaped = id.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return document.querySelector(`[${attr}="${escaped}"]`) ?? document.getElementById(id);
    };
    window.__hfMediaId = (el) => el.getAttribute(attr) || el.id;
  }, MEDIA_RENDER_ID_ATTR);
}

// ../engine/src/services/chromeMemorySampler.ts
function maxDefined(a, b) {
  if (a === void 0) return b;
  if (b === void 0) return a;
  return Math.max(a, b);
}
function mergeSample(prev, pids, rss) {
  if (rss.length === 0) return prev;
  const byPid = new Map(rss.map((s) => [s.pid, s.rssMb]));
  const browserMb = pids.browser === void 0 ? void 0 : byPid.get(pids.browser);
  const rendererMbs = pids.renderers.map((p) => byPid.get(p)).filter((v) => v !== void 0);
  const gpuMbs = pids.gpu.map((p) => byPid.get(p)).filter((v) => v !== void 0);
  const rendererMax = rendererMbs.length > 0 ? Math.max(...rendererMbs) : void 0;
  const total = rss.reduce((sum, s) => sum + s.rssMb, 0);
  return {
    browserRssPeakMb: maxDefined(prev.browserRssPeakMb, browserMb),
    rendererRssPeakMb: maxDefined(prev.rendererRssPeakMb, rendererMax),
    rssLastMb: total,
    gpuProcessSeenLastSample: gpuMbs.length > 0,
    samples: prev.samples + 1
  };
}
function createChromeMemorySampler(deps) {
  const setIntervalFn = deps.setIntervalFn ?? setInterval;
  const clearIntervalFn = deps.clearIntervalFn ?? clearInterval;
  let stats = { samples: 0 };
  let timer = null;
  let inFlight = null;
  const runSample = async () => {
    try {
      const pids = await deps.getPids();
      const all = [pids.browser, ...pids.renderers, ...pids.gpu].filter(
        (p) => typeof p === "number"
      );
      const rss = await deps.sampleRss(all);
      const next = mergeSample(stats, pids, rss);
      if (next !== stats) {
        stats = next;
        deps.onSample?.(stats);
      }
    } catch {
    }
  };
  const sampleOnce = () => {
    if (inFlight !== null) return inFlight;
    inFlight = runSample().finally(() => {
      inFlight = null;
    });
    return inFlight;
  };
  return {
    start() {
      if (timer !== null) return;
      timer = setIntervalFn(() => {
        void sampleOnce();
      }, deps.intervalMs);
      timer.unref();
    },
    stop() {
      if (timer === null) return;
      clearIntervalFn(timer);
      timer = null;
    },
    stats: () => stats,
    sampleOnce
  };
}

// ../engine/src/utils/processRss.ts
import { execFile as execFile2 } from "child_process";
import { readFile } from "fs/promises";
import { promisify as promisify2 } from "util";
var KB_PER_MB = 1024;
var defaultReadFile = (path) => readFile(path, "utf8");
function defaultExec() {
  const execFileP = promisify2(execFile2);
  return async (file, args) => {
    const { stdout } = await execFileP(file, [...args], { windowsHide: true, timeout: 5e3 });
    return { stdout: String(stdout) };
  };
}
function parsePsRss(stdout) {
  const samples = [];
  for (const line of stdout.split("\n")) {
    const match = /^\s*(\d+)\s+(\d+)\s*$/.exec(line);
    if (!match) continue;
    const pid = Number(match[1]);
    const rssKb = Number(match[2]);
    if (!Number.isFinite(pid) || !Number.isFinite(rssKb)) continue;
    samples.push({ pid, rssMb: Math.round(rssKb / KB_PER_MB) });
  }
  return samples;
}
function parseTasklistCsv(pid, stdout) {
  const line = stdout.split(/\r?\n/).find((l) => l.startsWith('"'));
  if (!line) return [];
  const cells = line.split('","').map((c) => c.replace(/^"|"$/g, ""));
  const memCell = cells[4];
  if (typeof memCell !== "string") return [];
  const kb = Number(memCell.replace(/[^0-9]/g, ""));
  if (!Number.isFinite(kb) || kb <= 0) return [];
  return [{ pid, rssMb: Math.round(kb / KB_PER_MB) }];
}
function parseProcStatusRss(pid, status) {
  const match = /^VmRSS:\s*(\d+)\s*kB/m.exec(status);
  if (!match) return [];
  const kb = Number(match[1]);
  if (!Number.isFinite(kb) || kb <= 0) return [];
  return [{ pid, rssMb: Math.round(kb / KB_PER_MB) }];
}
async function sampleProcessRss(pids, exec = defaultExec(), platform = process.platform, readStatus = defaultReadFile) {
  const unique = [...new Set(pids.filter((p) => Number.isInteger(p) && p > 0))];
  if (unique.length === 0) return [];
  if (platform === "linux") {
    const perPid = await Promise.all(
      unique.map(async (pid) => {
        try {
          return parseProcStatusRss(pid, await readStatus(`/proc/${pid}/status`));
        } catch {
          return [];
        }
      })
    );
    return perPid.flat();
  }
  try {
    if (platform === "win32") {
      const results = [];
      for (const pid of unique) {
        const { stdout: stdout2 } = await exec("tasklist", ["/FO", "CSV", "/NH", "/FI", `PID eq ${pid}`]);
        results.push(...parseTasklistCsv(pid, stdout2));
      }
      return results;
    }
    const { stdout } = await exec("ps", ["-o", "pid=,rss=", "-p", unique.join(",")]);
    return parsePsRss(stdout);
  } catch {
    return [];
  }
}

// ../engine/src/services/captureFailure.ts
var CaptureFailure = class extends Error {
  kind;
  cause;
  workerDiagnostics;
  constructor(input) {
    super(input.message);
    this.name = "CaptureFailure";
    this.kind = input.kind;
    this.cause = input.cause;
    this.workerDiagnostics = Object.freeze(
      (input.workerDiagnostics ?? []).map(
        (diagnostic) => Object.freeze({ ...diagnostic, lines: Object.freeze([...diagnostic.lines]) })
      )
    );
    if (input.cause instanceof Error && input.cause.stack) this.stack = input.cause.stack;
  }
};
var TRANSIENT_BROWSER_ERROR_PATTERNS = [
  /Navigating frame was detached/i,
  /Target closed/i,
  /Session closed/i,
  /browser has disconnected/i,
  /Page crashed/i,
  /Execution context was destroyed/i,
  /Cannot find context with specified id/i,
  /Failed to launch the browser process/i,
  /Navigation timeout of \d+ ms exceeded/i,
  /ECONNREFUSED/i,
  /net::ERR_NETWORK_CHANGED/i,
  /Composition has zero duration[\s\S]*Runtime ready: false/,
  // CDP can refuse a capture call outright with this exact wording; timed-out
  // variants of the same call hit PROTOCOL_TIMEOUT_PATTERNS, checked first.
  // Anchored to this literal reason (not just the CDP method) so an unrelated,
  // genuinely deterministic Page.captureScreenshot error isn't swept in too.
  /Protocol error \(Page\.captureScreenshot\): Unable to capture screenshot/i
];
var PROTOCOL_TIMEOUT_PATTERNS = [
  /Network\.enable timed out/i,
  /Runtime\.callFunctionOn timed out/i,
  /Runtime\.evaluate timed out/i,
  /Page\.captureScreenshot timed out/i,
  /HeadlessExperimental\.beginFrame timed out/i,
  /drawElement worker encode timed out \(frame \d+\)/i,
  /Protocol error[\s\S]*tim(?:ed|e) out/i,
  /Waiting failed:\s*\d+\s*ms exceeded/i,
  /Waiting failed[\s\S]*timeout/i,
  /timeout exceeded/i
];
var MEMORY_EXHAUSTION_ERROR_PATTERNS = [
  /Set maximum size exceeded/i,
  /Map maximum size exceeded/i,
  /Invalid (?:array|string) length/i,
  /Array buffer allocation failed/i,
  /Cannot create a string longer than/i,
  /Reached heap limit/i,
  /JavaScript heap out of memory/i
];
var BUN_MEMORY_EXHAUSTION_EXACT_MESSAGE = /^out of memory\.?$/i;
var BUN_MEMORY_EXHAUSTION_WRAPPED_WORKER_MESSAGE = /\bworker \d+: out of memory\.?(?:;|$)/i;
var VERIFICATION_ERROR_PATTERNS = [
  /DrawElementVerificationError/i,
  /drawElement self-verify/i,
  /verification (?:failed|mismatch)/i,
  /blank drawElement frame/i
];
var AUTHORING_ERROR_PATTERNS = [
  /Composition has zero duration[\s\S]*Runtime ready: true/i,
  /data-duration/i,
  /No root \[data-composition-id\]/i,
  /failed to parse/i,
  /unparseable/i
];
function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}
function matchesAny(message, patterns) {
  return patterns.some((pattern) => pattern.test(message));
}
var IO_OPERATION_TOKENS = ["read", "write", "rename", "copy", "open", "file", "directory"];
function hasIoOperationFailure(message) {
  const normalized = message.toLowerCase();
  return normalized.split(/[\r\n]/).some(
    (line) => IO_OPERATION_TOKENS.some((operation) => {
      const operationIndex = line.indexOf(operation);
      if (operationIndex < 0) return false;
      const failureStart = operationIndex + operation.length;
      return line.indexOf("failed", failureStart) >= 0 || line.indexOf("error", failureStart) >= 0;
    })
  );
}
var BROKEN_PIPE_MESSAGE = /\bwrite (?:EPIPE|EOF|ECONNRESET)\b/;
function ioError(error, message) {
  const code = error instanceof Error ? error.code : void 0;
  return Boolean(
    code && /^(?:EACCES|ECONNRESET|EEXIST|EIO|EMFILE|ENFILE|ENOENT|ENOSPC|EOF|EPERM|EPIPE|EROFS)$/.test(
      code
    )
  ) || BROKEN_PIPE_MESSAGE.test(message) || hasIoOperationFailure(message);
}
function classifyCaptureFailure(error, options = {}) {
  if (error instanceof CaptureFailure && !options.workerDiagnostics && !options.signal?.aborted) {
    return error;
  }
  const message = messageOf(error);
  let kind;
  if (options.signal?.aborted || /(?:render|capture)?_?cancelled|AbortError/i.test(message)) {
    kind = "cancelled";
  } else if (BUN_MEMORY_EXHAUSTION_EXACT_MESSAGE.test(message.trim()) || BUN_MEMORY_EXHAUSTION_WRAPPED_WORKER_MESSAGE.test(message) || matchesAny(message, MEMORY_EXHAUSTION_ERROR_PATTERNS)) {
    kind = "memory_exhaustion";
  } else if (matchesAny(message, VERIFICATION_ERROR_PATTERNS)) {
    kind = "verification";
  } else if (matchesAny(message, PROTOCOL_TIMEOUT_PATTERNS)) {
    kind = "protocol_timeout";
  } else if (matchesAny(message, TRANSIENT_BROWSER_ERROR_PATTERNS)) {
    kind = "transient_browser";
  } else if (matchesAny(message, AUTHORING_ERROR_PATTERNS)) {
    kind = "authoring";
  } else {
    kind = ioError(error, message) ? "io" : "authoring";
  }
  return new CaptureFailure({
    kind,
    message,
    cause: error,
    workerDiagnostics: options.workerDiagnostics ?? (error instanceof CaptureFailure ? error.workerDiagnostics : void 0)
  });
}
function isTransientBrowserError(error) {
  return classifyCaptureFailure(error).kind === "transient_browser";
}
function isMemoryExhaustionError(error) {
  return classifyCaptureFailure(error).kind === "memory_exhaustion";
}
function isFatalCaptureFailure(failure) {
  return !["cancelled", "transient_browser", "protocol_timeout"].includes(failure.kind);
}

// ../engine/src/services/frameCapture.ts
var DrawElementVerificationError = class extends Error {
  kind;
  frameIndex;
  failedDb;
  verifyThresholdDb;
  constructor(message, details) {
    super(message);
    this.name = "DrawElementVerificationError";
    this.deVerificationFailure = true;
    this.kind = details.kind;
    this.frameIndex = details.frameIndex;
    this.failedDb = details.failedDb;
    this.verifyThresholdDb = details.verifyThresholdDb;
  }
};
function isDrawElementVerificationError(err) {
  let e = err;
  for (let depth = 0; depth < 5 && typeof e === "object" && e !== null; depth++) {
    if (e.deVerificationFailure === true) return true;
    e = e.cause;
  }
  return false;
}
function getDrawElementVerificationDetails(err) {
  let e = err;
  for (let depth = 0; depth < 5 && typeof e === "object" && e !== null; depth++) {
    const rec = e;
    if (rec.deVerificationFailure === true) {
      const details = {
        kind: rec.kind === "blank" ? "blank" : "psnr"
      };
      if (typeof rec.frameIndex === "number") details.frameIndex = rec.frameIndex;
      if (typeof rec.failedDb === "number") details.failedDb = rec.failedDb;
      if (typeof rec.verifyThresholdDb === "number")
        details.verifyThresholdDb = rec.verifyThresholdDb;
      return details;
    }
    e = e.cause;
  }
  return void 0;
}
async function decodeDynamicCssBackgroundImages(page) {
  await page.evaluate(async () => {
    const root = globalThis;
    const decode = root.__hfDecodeDynamicCssBackgroundImages ??= async () => {
      const decoded = root.__hf_css_background_decoded ??= /* @__PURE__ */ new Set();
      const urls = [];
      const parseBackgroundUrls = (value) => {
        const found = [];
        let cursor = 0;
        while (cursor < value.length) {
          const start = value.indexOf("url(", cursor);
          if (start < 0) break;
          let index = start + 4;
          while (index < value.length && /\s/.test(value[index] ?? "")) index += 1;
          const quote = value[index] === '"' || value[index] === "'" ? value[index] : null;
          if (quote) index += 1;
          const contentStart = index;
          let contentEnd = -1;
          while (index < value.length) {
            const char = value[index];
            if (char === "\\") {
              index = Math.min(index + 2, value.length);
              continue;
            }
            if (quote && char === quote || !quote && char === ")") {
              contentEnd = index;
              break;
            }
            index += 1;
          }
          if (contentEnd < 0) break;
          if (quote) {
            index += 1;
            while (index < value.length && /\s/.test(value[index] ?? "")) index += 1;
            if (value[index] !== ")") {
              cursor = index;
              continue;
            }
          }
          const url = value.slice(contentStart, contentEnd).trim();
          if (url) found.push(url);
          cursor = index + 1;
        }
        return found;
      };
      for (const element of document.querySelectorAll('[style*="background"]')) {
        const backgroundImage = element.style.backgroundImage;
        if (!backgroundImage || backgroundImage === "none") continue;
        for (const url of parseBackgroundUrls(backgroundImage)) {
          if (!decoded.has(url)) urls.push(url);
        }
      }
      await Promise.all(
        [...new Set(urls)].map(async (url) => {
          const image = new Image();
          image.src = url;
          try {
            await image.decode();
            decoded.add(url);
          } catch {
          }
        })
      );
    };
    await decode();
  });
}
var BROWSER_CONSOLE_BUFFER_SIZE = 200;
var CAPTURE_SESSION_CLOSE_TIMEOUT_MS = 5e3;
function appendBrowserDiagnostic(session, text) {
  session.browserConsoleBuffer.push(text);
  if (session.browserConsoleBuffer.length > BROWSER_CONSOLE_BUFFER_SIZE) {
    session.browserConsoleBuffer.shift();
  }
}
async function collectSessionInitTelemetry(page, initStart) {
  const initDurationMs = Date.now() - initStart;
  let elementCount;
  try {
    elementCount = await page.evaluate(() => document.getElementsByTagName("*").length);
  } catch {
    elementCount = void 0;
  }
  let tweenCount = 0;
  try {
    tweenCount = await page.evaluate(() => {
      const timelines = window.__timelines || {};
      const seen = /* @__PURE__ */ new Set();
      let count = 0;
      for (const timeline of Object.values(timelines)) {
        const maybeTimeline = timeline;
        if (typeof maybeTimeline?.getChildren !== "function") continue;
        const children = maybeTimeline.getChildren(true, true, false);
        for (const child of children) {
          if (child && typeof child === "object" && !seen.has(child)) {
            seen.add(child);
            count++;
          }
        }
      }
      return count;
    });
  } catch {
    tweenCount = 0;
  }
  return { initDurationMs, tweenCount, elementCount };
}
async function recordSessionInitTelemetry(session, initStart) {
  const telemetry = await collectSessionInitTelemetry(session.page, initStart);
  session.initTelemetry = telemetry;
  appendBrowserDiagnostic(
    session,
    `[FrameCapture:INIT] complete initDurationMs=${telemetry.initDurationMs} tweenCount=${telemetry.tweenCount}` + // Omitted rather than zeroed when unmeasured, so the parser reports
    // absent instead of inventing an empty DOM.
    (telemetry.elementCount === void 0 ? "" : ` elementCount=${telemetry.elementCount}`)
  );
}
function sanitizeDiagnosticUrl(input) {
  if (!input) return "(empty)";
  if (input.startsWith("data:")) return "data:<redacted>";
  if (input.startsWith("blob:")) return "blob:<redacted>";
  if (input.startsWith("/")) {
    try {
      const url = new URL(input, "http://hyperframes.local");
      return url.pathname;
    } catch {
      return input;
    }
  }
  try {
    const url = new URL(input);
    url.username = "";
    url.password = "";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return input;
  }
}
function formatNavigationFailureDiagnostic(input) {
  const message = input.error instanceof Error ? input.error.message : String(input.error);
  return `[FrameCapture:ERROR] page.goto failed mode=${input.captureMode} timeoutMs=${input.timeoutMs} elapsedMs=${input.elapsedMs} url=${sanitizeDiagnosticUrl(input.url)} error=${message}`;
}
function formatNavigationStartDiagnostic(input) {
  return `[FrameCapture:NAV] page.goto start mode=${input.captureMode} timeoutMs=${input.timeoutMs} url=${sanitizeDiagnosticUrl(input.url)}`;
}
function formatRequestFailureDiagnostic(input) {
  return `[Browser:REQUESTFAILED] ${input.method} ${sanitizeDiagnosticUrl(input.url)} resource=${input.resourceType} error=${input.failureText}`;
}
function shouldIgnoreRequestFailureDiagnostic(input) {
  if (input.failureText !== "net::ERR_ABORTED") return false;
  if (input.resourceType === "media") return true;
  try {
    return /\.(?:aac|flac|m4a|mp3|mp4|mov|oga|ogg|ogv|wav|webm)$/i.test(
      new URL(input.url).pathname
    );
  } catch {
    return false;
  }
}
function formatHttpErrorDiagnostic(input) {
  const statusText = input.statusText ? ` ${input.statusText}` : "";
  return `[Browser:HTTP${input.status}] ${input.method} ${sanitizeDiagnosticUrl(input.url)} resource=${input.resourceType}${statusText}`;
}
var LOCKED_WARMUP_TICKS = 60;
var realSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function warmupFrameTimeTicks(state, intervalMs) {
  return state.ticks * intervalMs;
}
var BEGIN_FRAME_CAPTURE_HEADROOM_INTERVALS = 10;
var BEGIN_FRAME_COMMIT_LEAD_INTERVALS = 6;
var BEGIN_FRAME_PROBE_LEAD_INTERVALS = 5;
function deriveBeginFrameTimeTicks(state, warmupIntervalMs, captureIntervalMs) {
  const legacyCaptureTimeTicks = (state.ticks + BEGIN_FRAME_CAPTURE_HEADROOM_INTERVALS) * captureIntervalMs;
  const legacyCommitTimeTicks = deriveBeginFrameCommitTimeTicks(
    legacyCaptureTimeTicks,
    captureIntervalMs
  );
  const lastWarmupTimeTicks = Math.max(0, state.ticks - 1) * warmupIntervalMs;
  if (legacyCommitTimeTicks > lastWarmupTimeTicks) return legacyCaptureTimeTicks;
  const monotonicCaptureTimeTicks = warmupFrameTimeTicks(state, warmupIntervalMs) + BEGIN_FRAME_CAPTURE_HEADROOM_INTERVALS * captureIntervalMs;
  return monotonicCaptureTimeTicks;
}
function deriveBeginFrameCommitTimeTicks(captureTimeTicks, captureIntervalMs) {
  return captureTimeTicks - BEGIN_FRAME_COMMIT_LEAD_INTERVALS * captureIntervalMs;
}
function deriveBeginFrameProbeTimeTicks(captureTimeTicks, captureIntervalMs) {
  return Math.max(0, captureTimeTicks - BEGIN_FRAME_PROBE_LEAD_INTERVALS * captureIntervalMs);
}
function deriveBeginFrameTimelineTicks(state, warmupIntervalMs, captureIntervalMs) {
  const capture = deriveBeginFrameTimeTicks(state, warmupIntervalMs, captureIntervalMs);
  return {
    capture,
    commit: deriveBeginFrameCommitTimeTicks(capture, captureIntervalMs),
    probe: deriveBeginFrameProbeTimeTicks(capture, captureIntervalMs)
  };
}
function prepareBeginFrameTimeline(session, state, warmupIntervalMs) {
  const timeline = deriveBeginFrameTimelineTicks(
    state,
    warmupIntervalMs,
    session.beginFrameIntervalMs
  );
  session.beginFrameTimeTicks = timeline.capture;
  return {
    timeline,
    commitParams: {
      frameTimeTicks: timeline.commit,
      interval: session.beginFrameIntervalMs,
      noDisplayUpdates: false
    }
  };
}
async function cancelWarmupOnError(state, setup) {
  try {
    return await setup();
  } catch (error) {
    state.cancelled = true;
    throw error;
  }
}
async function driveWarmupTicks(options, state) {
  const sleep = options.sleep ?? realSleep;
  while (!state.cancelled) {
    if (options.lockWarmupTicks) {
      if (state.ticks >= LOCKED_WARMUP_TICKS) return;
    } else {
      if (!state.running) return;
    }
    try {
      await options.tick(state.ticks * options.intervalMs, options.intervalMs);
      state.ticks += 1;
    } catch {
    }
    await sleep(options.intervalMs);
  }
}
function resolveCaptureSessionOptions(options, browserVersion, platform = process.platform) {
  return {
    ...options,
    captureBeyondViewport: options.captureBeyondViewport ?? shouldDefaultCaptureBeyondViewport(browserVersion, platform)
  };
}
async function waitForCloseWithTimeout(promise) {
  let timedOut = false;
  let timer;
  await Promise.race([
    promise.then(
      () => void 0,
      () => void 0
    ),
    new Promise((resolve) => {
      timer = setTimeout(() => {
        timedOut = true;
        resolve();
      }, CAPTURE_SESSION_CLOSE_TIMEOUT_MS);
    })
  ]);
  if (timer) clearTimeout(timer);
  return !timedOut;
}
async function initDrawElementOrTransparentBackground(session, page, logInitPhase) {
  const supersampling = (session.options.deviceScaleFactor ?? 1) > 1;
  const forceScreenshot = session.config?.forceScreenshot ?? false;
  const forceDE = process.env.HF_FORCE_DRAWELEMENT === "1";
  const useDrawElement = ((session.config?.useDrawElement ?? false) || forceDE) && !supersampling && (!forceScreenshot || forceDE);
  if ((session.config?.useDrawElement ?? false) && supersampling) {
    session.deGateReason = "supersampling";
    session.deFallbackTrigger = "supersampling";
    console.log(
      "[engine] --experimental-fast-capture disabled for this render: drawElementImage ignores deviceScaleFactor, so supersampled (DPR > 1) output uses screenshot capture."
    );
  }
  if ((session.config?.useDrawElement ?? false) && !supersampling && forceScreenshot) {
    session.deGateReason = "render_mode_hint";
    session.deFallbackTrigger = "render_mode_hint";
    console.log(
      "[engine] fast capture: falling back to screenshot \u2014 render-mode compatibility hint forced screenshot capture (e.g. raw requestAnimationFrame composition)."
    );
  }
  if (useDrawElement) {
    const gpuBackend = await detectGpuBackend(page);
    session.isSwiftShader = gpuBackend.isSwiftShader;
    session.gpuRenderer = classifyGpuRenderer(gpuBackend.renderer);
    const transparent = session.options.format === "png" && session.options.transparentBackground !== false;
    async function routeToFallback() {
      session.captureMode = session.launchCaptureMode;
      if (transparent) {
        await initTransparentBackground(session.page);
      }
      if (session.launchCaptureMode === "screenshot") {
        await armStaticDedup(session, page, logInitPhase);
      }
    }
    const supportsDrawElement = await page.evaluate(() => {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      return typeof ctx?.drawElementImage === "function";
    });
    if (!supportsDrawElement) {
      session.deGateReason = "unsupported_chrome";
      session.deFallbackTrigger = "unsupported_chrome";
      console.log(
        `[engine] fast capture: falling back to ${session.launchCaptureMode} capture \u2014 this Chrome build does not implement canvas.drawElementImage (Dev/Canary-only feature); run \`hyperframes browser ensure --force\` to fetch a supported build, or set HYPERFRAMES_BROWSER_PATH to one.`
      );
      await routeToFallback();
      return;
    }
    if (!forceDE && !await isPsnrFilterAvailable()) {
      session.deGateReason = "ffmpeg_no_psnr_filter";
      session.deFallbackTrigger = "ffmpeg_no_psnr_filter";
      console.warn(
        `[engine] fast capture: falling back to ${session.launchCaptureMode} capture \u2014 host ffmpeg is missing or was built without the \`psnr\` filter (libpostproc), so drawElement self-verification cannot run. Install an ffmpeg build that includes libpostproc (or set HYPERFRAMES_FFMPEG_PATH to one) to re-enable fast capture.`
      );
      await routeToFallback();
      return;
    }
    const mode = resolveDrawElementCaptureMode(session.isSwiftShader, transparent);
    if (mode === "screenshot") {
      session.deGateReason = "swiftshader";
      session.deFallbackTrigger = "swiftshader";
      console.log(
        `[engine] fast capture: falling back to ${session.launchCaptureMode} capture \u2014 SwiftShader (software rasterizer \u2014 no GPU egress to skip, drawElement is parity-or-slower; see fast-capture-limitations.md)`
      );
      await routeToFallback();
    } else {
      if (!forceDE && process.env.HF_FAST_CAPTURE_CSSFX !== "true") {
        const cssFx = await detectCssEffectRisk(page);
        if (cssFx) {
          session.deGateReason = `css_effect:${(cssFx.split(":")[0] ?? "").replace(/[^a-z-]/gi, "")}`;
          session.deFallbackTrigger = cssFx;
          console.log(
            `[engine] fast capture: falling back to ${session.launchCaptureMode} capture \u2014 ${cssFx} detected (drawElementImage cannot reproduce it; see fast-capture-limitations.md)`
          );
          await routeToFallback();
          return;
        }
      }
      if (!forceDE && process.env.HF_FAST_CAPTURE_INTERVAL_SS !== "false") {
        const fps = fpsToNumber(session.options.fps);
        const { frames: atRisk, totalFrames } = await computeTimelineAtRiskFrames(page, fps);
        const atRiskFraction = atRisk.size / totalFrames;
        const fractionFloor = Number(process.env.HF_FAST_CAPTURE_INTERVAL_FRACTION ?? "0");
        logInitPhase(
          `timeline at-risk predictor: ${atRisk.size}/${totalFrames} frames (${Math.round(atRiskFraction * 100)}%)`
        );
        if (atRisk.size > 0 && atRiskFraction > fractionFloor) {
          session.deGateReason = "at_risk_timeline";
          session.deFallbackTrigger = "at_risk_timeline";
          console.log(
            `[engine] fast capture: falling back to ${session.launchCaptureMode} capture \u2014 ${atRisk.size}/${totalFrames} frames animate a compositor-incompatible prop (blend/3D/clip/mask); drawElementImage drops these mid-animation (deterministic timeline gate; see fast-capture-limitations.md Lim 7)`
          );
          await routeToFallback();
          return;
        }
      }
      const threeD = await initThreeDProjection(page);
      if (!forceDE && !threeD.ok) {
        session.deGateReason = "3d_init_failed";
        session.deFallbackTrigger = "3d_init_failed";
        console.log(
          `[engine] fast capture: falling back to ${session.launchCaptureMode} capture \u2014 3D projection init failed (${threeD.reason ?? "unknown"})`
        );
        await routeToFallback();
        return;
      }
      if (threeD.groups > 0) {
        logInitPhase(
          `3D projection active: ${threeD.groups} context(s), ${threeD.quads} quad(s), ${threeD.selfQuads ?? 0} self-quad el(s), ${threeD.stubTargets ?? 0} stub target(s)`
        );
      }
      await armStaticDedup(session, page, logInitPhase);
      if (!session.onBeforeCapture && !forceDE) {
        const hasVideos = await page.evaluate(() => document.querySelector("video") !== null);
        if (hasVideos) {
          session.deInitDeferred = true;
          logInitPhase("drawElement init deferred: video comp awaiting frame injector");
          return;
        }
      }
      await finalizeDrawElementInit(session, page, logInitPhase, { transparent, forceDE });
    }
  } else if (session.options.format === "png" && session.options.transparentBackground !== false) {
    await initTransparentBackground(session.page);
  }
}
async function finalizeDrawElementInit(session, page, logInitPhase, opts) {
  const { transparent, forceDE } = opts;
  await decodeDynamicCssBackgroundImages(page);
  {
    const verifyStart = Date.now();
    await captureDeVerificationFrames(session, page, logInitPhase);
    session.deVerifyInitMs = Date.now() - verifyStart;
  }
  await injectDrawElementCanvas(page, session.options.width, session.options.height);
  if (transparent) {
    await initTransparentBackground(session.page);
  }
  session.captureMode = "drawelement";
  session.drawElementReady = true;
  logInitPhase("drawElement canvas injected");
  if (process.env.HF_FAST_CAPTURE_BOUNDARY_SS !== "false" && !forceDE) {
    const fps = fpsToNumber(session.options.fps);
    const boundaryFrames = await computeClipBoundaryFrames(page, fps);
    if (boundaryFrames.size > 0) {
      session.clipBoundaryFrames = boundaryFrames;
      logInitPhase(`screenshot fallback: ${boundaryFrames.size} clip-boundary frame(s)`);
    }
  }
  const workerEncodeEnabled = (session.config?.enableDrawElementWorkerEncode ?? false) && !transparent && session.beginFrameTimeTicks === 0;
  if (workerEncodeEnabled) {
    await initDrawElementWorkerEncode(page);
    session.workerEncodeEnabled = true;
    logInitPhase("drawElement worker encode initialized");
  }
}
async function completeDeferredDrawElementInit(session) {
  if (!session.deInitDeferred || !session.onBeforeCapture) return;
  const page = session.page;
  const logInitPhase = (phase) => console.log(`[initSession:${session.captureMode}] ${phase} (deferred drawElement init)`);
  await finalizeDrawElementInit(session, page, logInitPhase, {
    transparent: session.options.format === "png" && session.options.transparentBackground !== false,
    forceDE: process.env.HF_FORCE_DRAWELEMENT === "1"
  });
  session.deInitDeferred = false;
}
async function createCaptureSession(serverUrl, outputDir, options, onBeforeCapture = null, config) {
  if (!existsSync3(outputDir)) mkdirSync(outputDir, { recursive: true });
  const headlessShell = resolveHeadlessShellPath(config);
  const isLinux = process.platform === "linux";
  const forceScreenshot = config?.forceScreenshot ?? DEFAULT_CONFIG.forceScreenshot;
  const useDrawElement = config?.useDrawElement ?? false;
  const drawElementTransparent = useDrawElement && options.format === "png" && options.transparentBackground !== false;
  if (useDrawElement && (config?.enablePageSideCompositing ?? DEFAULT_CONFIG.enablePageSideCompositing)) {
    console.warn(
      "[engine] useDrawElement is incompatible with page-side shader compositing \u2014 ignoring enablePageSideCompositing for this render. Prefer resolveConfig, which disables page-side compositing automatically for fast-capture renders."
    );
  }
  const supersampling = (options.deviceScaleFactor ?? 1) > 1;
  const requestedGpuMode = config?.browserGpuMode ?? DEFAULT_CONFIG.browserGpuMode;
  const resolvedGpuMode = await resolveBrowserGpuMode(requestedGpuMode, {
    chromePath: headlessShell ?? void 0,
    browserTimeout: config?.browserTimeout
  });
  const effectiveForceScreenshot = applyConcreteGpuScreenshotClamp(
    forceScreenshot,
    resolvedGpuMode,
    config
  );
  const preMode = headlessShell && isLinux && !effectiveForceScreenshot && !supersampling && !drawElementTransparent ? "beginframe" : "screenshot";
  const requiresWebGpu = options.requiresWebGpu ?? await fetch(`${serverUrl}/index.html`, { signal: AbortSignal.timeout(5e3) }).then((res) => res.text()).then(compositionRequiresWebGpu).catch(() => false);
  const gpuConfig = { ...config, browserGpuMode: resolvedGpuMode };
  const chromeArgs = buildChromeArgs(
    { width: options.width, height: options.height, captureMode: preMode, requiresWebGpu },
    gpuConfig
  );
  const browserLease = await acquireBrowser(chromeArgs, config);
  return constructCaptureSessionWithRollback({
    browserLease,
    serverUrl,
    outputDir,
    options,
    onBeforeCapture,
    config,
    useDrawElement,
    requiresWebGpu,
    softwareWebGpu: usesSoftwareWebGpu(requiresWebGpu, gpuConfig)
  });
}
async function constructCaptureSessionWithRollback(input) {
  let page;
  try {
    return await constructCaptureSession({
      ...input,
      onPageCreated: (createdPage) => {
        page = createdPage;
      }
    });
  } catch (error) {
    let pageClosed = true;
    try {
      if (page) {
        const rollbackPage = page;
        pageClosed = await waitForCloseWithTimeout(
          Promise.resolve().then(() => rollbackPage.close())
        );
      }
    } finally {
      if (!pageClosed) {
        console.warn(
          "[FrameCapture] Timed out closing page during construction rollback; forcing browser process shutdown"
        );
        input.browserLease.forceRelease();
      } else {
        const browserClosed = await waitForCloseWithTimeout(input.browserLease.release());
        if (!browserClosed) {
          console.warn(
            "[FrameCapture] Timed out closing browser during construction rollback; forcing browser process shutdown"
          );
          input.browserLease.forceRelease();
        }
      }
    }
    throw error;
  }
}
async function constructCaptureSession(input) {
  const {
    browserLease,
    serverUrl,
    outputDir,
    options,
    onBeforeCapture,
    config,
    useDrawElement,
    requiresWebGpu,
    softwareWebGpu,
    onPageCreated
  } = input;
  const { browser, captureMode } = browserLease;
  const page = await browser.newPage();
  onPageCreated(page);
  await page.evaluateOnNewDocument(() => {
    const w = window;
    if (typeof w.__name !== "function") {
      w.__name = (fn, _name) => fn;
    }
  });
  await installMediaRenderIdBridge(page);
  if (useDrawElement) {
    await page.evaluateOnNewDocument(instrumentAcceleratedCanvases);
  }
  if (process.env.HF_FAST_CAPTURE_AUTOALPHA !== void 0) {
    console.warn(
      "[engine] HF_FAST_CAPTURE_AUTOALPHA is retired and ignored \u2014 the requestPaint paint contract captures animated opacity natively (see drawElementService.ts)."
    );
  }
  if (useDrawElement && process.env.HF_FAST_CAPTURE_ROOT_PROPS !== "false") {
    await page.evaluateOnNewDocument(() => {
      window.__HF_ROOT_PROPS__ = true;
    });
  }
  if (options.variables && Object.keys(options.variables).length > 0) {
    const variablesJson = JSON.stringify(options.variables);
    await page.evaluateOnNewDocument((json) => {
      try {
        window.__hfVariables = JSON.parse(json);
      } catch {
      }
    }, variablesJson);
  }
  const browserVersion = await browser.version();
  const sessionOptions = resolveCaptureSessionOptions(options, browserVersion);
  const expectedMajor = config?.expectedChromiumMajor;
  if (Number.isFinite(expectedMajor)) {
    const actualChromiumMajor = Number.parseInt(
      (browserVersion.match(/(\d+)\./) || [])[1] || "",
      10
    );
    if (Number.isFinite(actualChromiumMajor) && actualChromiumMajor !== expectedMajor) {
      throw new Error(
        `[FrameCapture] Chromium major mismatch expected=${expectedMajor} actual=${actualChromiumMajor} raw=${browserVersion}`
      );
    }
  }
  const viewport = {
    width: sessionOptions.width,
    height: sessionOptions.height,
    deviceScaleFactor: sessionOptions.deviceScaleFactor || 1
  };
  await page.setViewport(viewport);
  return {
    browser,
    browserLease,
    page,
    options: sessionOptions,
    serverUrl,
    outputDir,
    onBeforeCapture,
    requiresWebGpu,
    softwareWebGpu,
    isInitialized: false,
    browserConsoleBuffer: [],
    scriptLoadFailures: [],
    pageErrors: [],
    warnings: [],
    capturePerf: {
      frames: 0,
      seekMs: 0,
      beforeCaptureMs: 0,
      screenshotMs: 0,
      totalMs: 0,
      frameMs: []
    },
    captureMode,
    launchCaptureMode: captureMode,
    beginFrameTimeTicks: 0,
    // Frame interval in ms: 1000 * den / num. For 30/1 → 33.333…, for
    // 30000/1001 (NTSC) → 33.366…. JavaScript number precision is fine at
    // these scales — no rounding required.
    beginFrameIntervalMs: 1e3 * options.fps.den / Math.max(1, options.fps.num),
    beginFrameHasDamageCount: 0,
    beginFrameNoDamageCount: 0,
    config
  };
}
function isFontResourceError(type, text, locationUrl) {
  if (type !== "error") return false;
  if (!text.startsWith("Failed to load resource")) return false;
  return /fonts\.googleapis|fonts\.gstatic|\.(woff2?|ttf|otf)(\b|$)/i.test(
    `${locationUrl} ${text}`
  );
}
function formatConsoleDiagnostic(type, text, locationUrl) {
  const isFontLoadError = isFontResourceError(type, text, locationUrl);
  if (isFontLoadError) return { text: `[Browser] ${text}`, suppressHostLog: true };
  if (text.startsWith("[hyperframes]")) {
    return {
      text: `[HyperFrames] ${text.slice("[hyperframes]".length).trim()}`,
      suppressHostLog: false
    };
  }
  const isResourceLoadError = type === "error" && text.startsWith("Failed to load resource");
  const prefix = isResourceLoadError ? "[non-blocking]" : type === "error" ? "[Browser:ERROR]" : type === "warn" ? "[Browser:WARN]" : "[Browser]";
  return { text: `${prefix} ${text}`, suppressHostLog: false };
}
var HF_READY_DIAGNOSTIC_EXPR = `(async function() {
  var hf = window.__hf;
  var player = window.__player;
  var renderReady = !!window.__renderReady;
  var hasSeek = !!(hf && typeof hf.seek === "function");
  var duration = hf ? hf.duration : -1;
  var hasTimeline = !!(window.__timelines && Object.keys(window.__timelines).length > 0);
  var root = document.querySelector("[data-composition-id]");
  var declaredDuration = root ? Number(root.getAttribute("data-duration")) : -1;
  var registry = (window.__hf && window.__hf.buildReady) || {};
  var keys = Object.keys(registry);
  // A microtask race mis-sorts a non-native thenable (extra adoption tick)
  // and rejects the whole expression on a rejected entry. Settling each
  // key onto its own record and waiting one macrotask avoids both.
  var settled = {};
  if (keys.length > 0) {
    keys.forEach(function(key) {
      Promise.resolve(registry[key]).then(
        function() { settled[key] = "resolved"; },
        function() { settled[key] = "rejected"; },
      );
    });
    await new Promise(function(r) { setTimeout(r, 0); });
  }
  // A thenable resolving via its own setTimeout(0) can still misreport as
  // pending here (macrotask registration order, not resolution order) \u2014 a
  // narrow case that self-corrects on the next ~1s diagnostic tick.
  var pendingBuildReadyKeys = keys.filter(function(key) { return !settled[key]; });
  var rejectedBuildReadyKeys = keys.filter(function(key) { return settled[key] === "rejected"; });
  return {
    renderReady: renderReady,
    hasHf: !!hf,
    hasSeek: hasSeek,
    hasPlayer: !!player,
    duration: duration,
    hasTimeline: hasTimeline,
    declaredDuration: declaredDuration,
    pendingBuildReadyKeys: pendingBuildReadyKeys,
    rejectedBuildReadyKeys: rejectedBuildReadyKeys,
  };
})()`;
function buildZeroDurationDiagnostic(diag) {
  const hints = [];
  if (diag.pendingBuildReadyKeys.length > 0) {
    hints.push(
      `window.__hf.buildReady never resolved for: ${diag.pendingBuildReadyKeys.join(", ")}. The runtime holds render-ready until every registered buildReady promise settles \u2014 find where the composition registers that key and confirm it actually resolves.`
    );
  }
  if (diag.rejectedBuildReadyKeys.length > 0) {
    hints.push(
      `window.__hf.buildReady rejected for: ${diag.rejectedBuildReadyKeys.join(", ")}. That key's build promise failed rather than hanging \u2014 find why it rejects.`
    );
  }
  if (!diag.hasPlayer) {
    hints.push("window.__player was never set \u2014 the HyperFrames runtime did not initialize.");
  }
  if (!diag.hasTimeline) {
    hints.push(
      "No GSAP timeline registered (window.__timelines is empty). CSS/WAAPI/Lottie animations are usually auto-detected (the runtime infers duration from the longest running animation) \u2014 this composition's duration could not be inferred, which usually means an infinite/unbounded animation (e.g. animation-iteration-count: infinite, repeat: -1 WAAPI, or a looping Lottie clip) or a Three.js scene with no discoverable AnimationClip."
    );
  }
  if (diag.declaredDuration <= 0 && !diag.hasTimeline) {
    hints.push(
      'Fix: add data-duration="<seconds>" to your root <div data-composition-id="..."> element.'
    );
  }
  if (diag.hasSeek && diag.duration === 0 && diag.renderReady) {
    hints.push("The runtime finished initializing but reported zero duration \u2014 this is permanent.");
  }
  return `[FrameCapture] Composition has zero duration.
  Runtime ready: ${diag.renderReady}, __player: ${diag.hasPlayer}, __hf.seek: ${diag.hasSeek}, GSAP timeline: ${diag.hasTimeline}, data-duration: ${diag.declaredDuration > 0 ? diag.declaredDuration + "s" : "not set"}
` + (hints.length > 0 ? hints.map((h) => `  \u2192 ${h}`).join("\n") : "");
}
async function evaluateHfDiagnostic(page) {
  return await page.evaluate(HF_READY_DIAGNOSTIC_EXPR);
}
async function pollHfReady(page, timeoutMs, intervalMs = 100) {
  const readyExpr = `!!(window.__hf && typeof window.__hf.seek === "function" && window.__hf.duration > 0)`;
  const FAST_FAIL_AFTER_MS = 1e4;
  const DIAGNOSTIC_INTERVAL_MS = 1e3;
  const deadline = Date.now() + timeoutMs;
  let lastDiagnosticAt = 0;
  while (Date.now() < deadline) {
    const ready = Boolean(await page.evaluate(readyExpr));
    if (ready) return;
    const elapsed = timeoutMs - (deadline - Date.now());
    if (elapsed >= FAST_FAIL_AFTER_MS) {
      const now = Date.now();
      if (now - lastDiagnosticAt >= DIAGNOSTIC_INTERVAL_MS) {
        lastDiagnosticAt = now;
        const diag2 = await evaluateHfDiagnostic(page);
        if (diag2.renderReady && diag2.hasSeek && !diag2.hasTimeline && diag2.declaredDuration <= 0 && diag2.duration <= 0) {
          throw new Error(buildZeroDurationDiagnostic(diag2));
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  const diag = await evaluateHfDiagnostic(page);
  if (diag.hasSeek && diag.duration === 0) {
    throw new Error(buildZeroDurationDiagnostic(diag));
  }
  throw new Error(
    `[FrameCapture] window.__hf not ready after ${timeoutMs}ms. Page must expose window.__hf = { duration, seek }.
  State: __hf=${diag.hasHf}, seek=${diag.hasSeek}, player=${diag.hasPlayer}, renderReady=${diag.renderReady}, duration=${diag.duration}`
  );
}
async function pollSubCompositionTimelines(page, timeoutMs, intervalMs = 150, getScriptLoadFailures, scriptFailureGraceMs = 2e3, onPending, shouldStop) {
  const expression = `(function() {
    var hosts = document.querySelectorAll("[data-composition-id]");
    if (hosts.length === 0) return true;
    var timelines = window.__timelines || {};
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].hasAttribute("data-no-timeline")) continue;
      var id = hosts[i].getAttribute("data-composition-id");
      if (!id) continue;
      if (!timelines[id]) return false;
    }
    return true;
  })()`;
  const start = Date.now();
  const deadline = start + timeoutMs;
  let ready = false;
  let scriptFailureBail = false;
  for (; ; ) {
    ready = Boolean(await page.evaluate(expression));
    if (ready || shouldStop?.()) break;
    const now = Date.now();
    if (now >= deadline) break;
    const failures = getScriptLoadFailures?.() ?? [];
    if (failures.length > 0 && now - start >= scriptFailureGraceMs) {
      scriptFailureBail = true;
      console.warn(
        `[FrameCapture] Sub-composition timeline wait cut short after ${now - start}ms: script resource(s) failed to load (${failures.join(", ")}) \u2014 the timeline registration they carry can never arrive. Fix the script reference; the render proceeds without those animations.`
      );
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  if (ready) {
    await page.evaluate(`(function() {
      if (typeof window.__hfForceTimelineRebind === "function") {
        window.__hfForceTimelineRebind();
      }
    })()`);
    return "ready";
  }
  const evaluated = await page.evaluate(`(function() {
    var hosts = document.querySelectorAll("[data-composition-id]");
    var timelines = window.__timelines || {};
    var m = [];
    for (var i = 0; i < hosts.length; i++) {
      if (hosts[i].hasAttribute("data-no-timeline")) continue;
      var id = hosts[i].getAttribute("data-composition-id");
      if (id && !timelines[id]) m.push(id);
    }
    return m;
  })()`);
  const pendingIds = Array.isArray(evaluated) ? evaluated.map((id) => String(id)) : [];
  onPending?.(pendingIds);
  const missing = pendingIds.join(", ");
  if (scriptFailureBail) {
    console.warn(`[FrameCapture] Composition(s) still waiting on the failed script: ${missing}.`);
  } else {
    console.warn(
      `[FrameCapture] Sub-composition timelines not registered after ${timeoutMs}ms: ${missing}. Compositions that load data asynchronously (e.g. fetch) must register window.__timelines[id] after setup completes. Compositions intentionally driven without GSAP timelines (CSS animations / rAF) can mark the host with data-no-timeline to skip this wait.`
    );
  }
  return scriptFailureBail ? "script_failure" : "timeout";
}
async function pollVideosReady(page, skipIds, timeoutMs, intervalMs = 100) {
  const check = async () => {
    return Boolean(
      await page.evaluate((skipIdList) => {
        const skip = new Set(skipIdList);
        const vids = Array.from(document.querySelectorAll("video")).filter((v) => !skip.has(v.id));
        return vids.length === 0 || vids.every((v) => {
          const ve = v;
          if (ve.readyState >= 2) return true;
          if (ve.error) return true;
          if (ve.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) return true;
          return false;
        });
      }, skipIds)
    );
  };
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await check()) return true;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return check();
}
async function pollImagesReady(page, timeoutMs, intervalMs = 100) {
  const check = async () => {
    return Boolean(
      await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll("img"));
        return imgs.length === 0 || imgs.every((img) => {
          const ie = img;
          const src = ie.getAttribute("src") || "";
          if (!src || src.startsWith("data:")) return true;
          if (ie.complete && ie.naturalWidth === 0) return true;
          if (ie.complete && ie.naturalWidth > 0) return true;
          return false;
        });
      })
    );
  };
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await check()) return true;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return check();
}
async function collectMediaReadinessWarnings(page, skipIds, timeoutMs) {
  const snapshot = await page.evaluate((skipIdList) => {
    const skipped = new Set(skipIdList);
    const result = {
      pendingImages: [],
      failedImages: [],
      pendingVideos: [],
      failedVideos: []
    };
    for (const img of document.querySelectorAll("img")) {
      const src = img.getAttribute("src") || "";
      if (!src || src.startsWith("data:")) continue;
      if (!img.complete) result.pendingImages.push(img.src || src);
      else if (img.naturalWidth <= 0) result.failedImages.push(img.src || src);
    }
    for (const media of document.querySelectorAll("video")) {
      const mediaElement = media;
      if (skipped.has(mediaElement.id)) continue;
      const src = mediaElement.currentSrc || mediaElement.getAttribute("src") || "(no src)";
      const failed = Boolean(mediaElement.error) || mediaElement.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
      const pending = !failed && mediaElement.readyState < HTMLMediaElement.HAVE_CURRENT_DATA;
      if (failed) result.failedVideos.push(src);
      else if (pending) result.pendingVideos.push(src);
    }
    return result;
  }, skipIds);
  const warnings = [];
  const append = (code, mediaType, sources) => {
    if (sources.length === 0) return;
    const timedOut = code === "media_readiness_timeout";
    warnings.push({
      code,
      message: timedOut ? `${mediaType} media did not become capture-ready within ${timeoutMs}ms` : `${mediaType} media failed to load before capture`,
      details: { mediaType, sources: [...new Set(sources)].sort(), timeoutMs }
    });
  };
  append("media_readiness_timeout", "image", snapshot.pendingImages);
  append("media_load_failed", "image", snapshot.failedImages);
  append("media_readiness_timeout", "video", snapshot.pendingVideos);
  append("media_load_failed", "video", snapshot.failedVideos);
  return warnings;
}
function recordCaptureWarnings(session, warnings) {
  for (const warning of warnings) {
    const key = `${warning.code}:${JSON.stringify(warning.details ?? {})}`;
    if (session.warnings.some(
      (existing) => `${existing.code}:${JSON.stringify(existing.details ?? {})}` === key
    )) {
      continue;
    }
    session.warnings.push(warning);
    console.warn(`[FrameCapture:${warning.code}] ${warning.message}`, warning.details ?? {});
  }
}
function recordSubTimelineWarning(session, timeoutMs) {
  const outcome = session.subTimelineWaitOutcome;
  if (outcome === "ready" || !outcome) return;
  const threwThenTimedOut = outcome === "timeout" && session.pageErrors.length > 0;
  const scriptFailure = outcome === "script_failure" || threwThenTimedOut;
  const sources = [...session.scriptLoadFailures, ...session.pageErrors];
  const pending = session.pendingTimelineIds ?? [];
  const pendingSuffix = pending.length > 0 ? ` (still unregistered: ${pending.join(", ")})` : "";
  recordCaptureWarnings(session, [
    {
      code: scriptFailure ? "sub_timeline_script_failure" : "sub_timeline_readiness_timeout",
      message: threwThenTimedOut ? `A composition script threw and a timeline did not register within ${timeoutMs}ms${pendingSuffix} (${sources.join(", ")}). Fix the error; a composition animated by CSS or rAF rather than a GSAP timeline must mark its host with data-no-timeline.` : scriptFailure ? `A sub-composition timeline script failed to load (${sources.join(", ")})` : `Sub-composition timelines did not become ready within ${timeoutMs}ms${pendingSuffix}. This can be intentional: a composition driven by CSS animations or rAF never registers window.__timelines[id], and marking its host with data-no-timeline skips the wait entirely. Otherwise, a composition that sets up asynchronously must register window.__timelines[id] once setup completes.`,
      details: {
        timeoutMs,
        sources,
        pendingCompositionIds: [...pending]
      }
    }
  ]);
}
var LIVE_MAP_MARKERS = [
  { selector: ".leaflet-container", library: "Leaflet" },
  { selector: ".maplibregl-map", library: "MapLibre GL" },
  { selector: ".mapboxgl-map", library: "Mapbox GL" },
  { selector: ".gm-style", library: "Google Maps" },
  { selector: ".ol-viewport", library: "OpenLayers" }
];
function buildLiveMapWarning(libraries) {
  return {
    code: "live_map_detected",
    message: `Live map viewport(s) detected in the composition (${libraries.join(", ")}). Map tiles load over the network at render time, which the deterministic-render contract forbids \u2014 frames captured before tiles arrive ship a blank or partial map with no error. Bake the map to a video first (see the motion-graphics maps skill / bake-basemap.mjs) and use the baked file as the imagery layer.`,
    details: { sources: [...libraries] }
  };
}
async function recordLiveMapWarning(session, page) {
  const libraries = await page.evaluate(
    (markers) => markers.filter((m) => document.querySelector(m.selector) !== null).map((m) => m.library),
    LIVE_MAP_MARKERS
  );
  if (libraries.length === 0) return;
  recordCaptureWarnings(session, [buildLiveMapWarning(libraries)]);
}
async function decodeAllImages(page) {
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        const ie = img;
        if (typeof ie.decode !== "function") return Promise.resolve();
        if (!ie.complete || ie.naturalWidth === 0) return Promise.resolve();
        return ie.decode().catch(() => void 0);
      })
    );
  });
}
async function applyVideoMetadataHints(page, hints) {
  if (!hints || hints.length === 0) return;
  await page.evaluate(
    (metadataHints) => {
      for (const hint of metadataHints) {
        if (!hint.id || !Number.isFinite(hint.width) || !Number.isFinite(hint.height) || hint.width <= 0 || hint.height <= 0) {
          continue;
        }
        const video = window.__hfMediaEl?.(hint.id) ?? document.getElementById(hint.id);
        if (!video) continue;
        if (!video.hasAttribute("width")) video.setAttribute("width", String(hint.width));
        if (!video.hasAttribute("height")) video.setAttribute("height", String(hint.height));
        const computed = window.getComputedStyle(video);
        if (!video.style.aspectRatio && (!computed.aspectRatio || computed.aspectRatio === "auto")) {
          video.style.aspectRatio = `${hint.width} / ${hint.height}`;
        }
      }
    },
    [...hints]
  );
}
async function waitForOptionalTailwindReady(page, timeoutMs) {
  const hasTailwindReady = await page.evaluate(
    `(() => { const ready = window.__tailwindReady; return !!ready && typeof ready.then === "function"; })()`
  );
  if (!hasTailwindReady) return;
  const ready = await Promise.race([
    page.evaluate(
      `Promise.resolve(window.__tailwindReady).then(() => true, () => false)`
    ),
    new Promise((resolve) => setTimeout(() => resolve(false), timeoutMs))
  ]);
  if (!ready) {
    throw new Error(
      `[FrameCapture] window.__tailwindReady not resolved after ${timeoutMs}ms. Tailwind browser runtime must finish before frame capture starts.`
    );
  }
}
var VfxFailureError = class extends Error {
  constructor(detail) {
    super(`A VFX chain failed, so its frames would render without the effect (${detail})`);
    this.detail = detail;
    this.name = "VfxFailureError";
  }
  detail;
};
function assertVfxIntact(session) {
  if (session.vfxFailure) throw new VfxFailureError(session.vfxFailure);
}
function recordConsoleScriptError(session, error) {
  if (!error?.startsWith("runtime-error:vfx:")) {
    recordPageError(session, error);
    return;
  }
  if (session.vfxFailure) return;
  session.vfxFailure = error;
  const message = new VfxFailureError(error).message;
  recordCaptureWarnings(session, [{ code: "vfx_failure", message, details: { sources: [error] } }]);
}
function recordPageError(session, error) {
  if (error && !session.pageErrors.includes(error)) session.pageErrors.push(error);
}
function recordScriptLoadFailure(session, url) {
  if (!session.scriptLoadFailures.includes(url)) {
    session.scriptLoadFailures.push(url);
  }
}
var SCRIPT_ERROR_LABEL = "[HyperFrames] composition script error:";
function classifyConsoleScriptError(type, text) {
  if (type !== "error" || !text.startsWith(SCRIPT_ERROR_LABEL)) return null;
  const [detail = ""] = text.slice(SCRIPT_ERROR_LABEL.length).trim().split("\n");
  return `runtime-error:${detail.trimEnd() || "unknown"}`;
}
function classifyConsoleScriptFailure(type, text) {
  if (type !== "error") return null;
  if (/failed to find a valid digest in the ['"]integrity['"] attribute/i.test(text) && /resource has been blocked/i.test(text)) {
    return "runtime-error:subresource-integrity";
  }
  return null;
}
function isPlayPauseAbort(message) {
  return /^AbortError:/.test(message) && message.includes("play()") && message.includes("pause()");
}
function classifyPageError(details, projectScripts) {
  const exception = details.exception;
  const message = String(exception?.description ?? exception?.value ?? details.text);
  const [firstLine = ""] = message.split("\n");
  if (isPlayPauseAbort(firstLine)) return null;
  const frames = (details.stackTrace?.callFrames ?? []).map((frame) => frame.url);
  if (frames.length === 0 && details.text.startsWith("Uncaught (in promise)")) return null;
  const urls = frames.length > 0 ? frames : [details.url];
  const owned = (url) => url !== void 0 && (projectScripts.has(url) || url.startsWith(COMPOSITION_SOURCE_URL));
  return urls.some(owned) ? `runtime-error:${firstLine}` : null;
}
async function initializeSession(session) {
  const { page, serverUrl } = session;
  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();
    const locationUrl = msg.location()?.url ?? "";
    const diagnostic = formatConsoleDiagnostic(type, text, locationUrl);
    if (!diagnostic.suppressHostLog) console.log(diagnostic.text);
    appendBrowserDiagnostic(session, diagnostic.text);
    const scriptFailure = classifyConsoleScriptFailure(type, text);
    if (scriptFailure) recordScriptLoadFailure(session, scriptFailure);
    recordConsoleScriptError(session, classifyConsoleScriptError(type, text));
  });
  page.on("pageerror", (err) => {
    const message = err instanceof Error ? err.message : String(err);
    const text = `[Browser:PAGEERROR] ${message}`;
    if (!isPlayPauseAbort(message)) console.error(text);
    appendBrowserDiagnostic(session, text);
  });
  page.on("requestfailed", (request) => {
    const resourceType = request.resourceType();
    const url2 = request.url();
    const failureText = request.failure()?.errorText ?? "unknown";
    if (resourceType === "script") {
      recordScriptLoadFailure(session, request.url());
    }
    if (shouldIgnoreRequestFailureDiagnostic({ resourceType, url: url2, failureText })) return;
    appendBrowserDiagnostic(
      session,
      formatRequestFailureDiagnostic({
        method: request.method(),
        resourceType,
        url: url2,
        failureText
      })
    );
  });
  const projectScripts = /* @__PURE__ */ new Set();
  page.on("response", (response) => {
    const status = response.status();
    const request = response.request();
    const isScript = request.resourceType() === "script";
    const responseUrl = response.url();
    if (status < 400) {
      if (isScript && responseUrl.startsWith(`${serverUrl}/`)) projectScripts.add(responseUrl);
      return;
    }
    if (isScript) recordScriptLoadFailure(session, responseUrl);
    appendBrowserDiagnostic(
      session,
      formatHttpErrorDiagnostic({
        method: request.method(),
        resourceType: request.resourceType(),
        url: response.url(),
        status,
        statusText: response.statusText()
      })
    );
  });
  const url = `${serverUrl}/index.html`;
  const runtimeClient = await getCdpSession(page);
  runtimeClient.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    recordPageError(session, classifyPageError(exceptionDetails, projectScripts));
  });
  await runtimeClient.send("Runtime.enable");
  const pageNavigationTimeout = session.config?.pageNavigationTimeout ?? DEFAULT_CONFIG.pageNavigationTimeout;
  const initStart = Date.now();
  const logInitPhase = (phase) => {
    console.log(`[initSession:${session.captureMode}] ${phase} (${Date.now() - initStart}ms)`);
  };
  const gotoEntryPage = async () => {
    appendBrowserDiagnostic(
      session,
      formatNavigationStartDiagnostic({
        captureMode: session.captureMode,
        url,
        timeoutMs: pageNavigationTimeout
      })
    );
    logInitPhase("page.goto start");
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: pageNavigationTimeout });
    } catch (error) {
      appendBrowserDiagnostic(
        session,
        formatNavigationFailureDiagnostic({
          captureMode: session.captureMode,
          url,
          timeoutMs: pageNavigationTimeout,
          elapsedMs: Date.now() - initStart,
          error
        })
      );
      throw error;
    }
    await assertWebGpuAdapterAvailable(
      page,
      session.requiresWebGpu ?? false,
      session.softwareWebGpu
    );
  };
  if (session.captureMode === "screenshot") {
    await gotoEntryPage();
    logInitPhase("page.goto complete");
    await page.evaluate(`window.__hfFlushSync?.()`);
    logInitPhase("GSAP proxy flush complete");
    const pageReadyTimeout = session.config?.playerReadyTimeout ?? DEFAULT_CONFIG.playerReadyTimeout;
    await pollHfReady(page, pageReadyTimeout);
    logInitPhase("pollHfReady complete");
    session.subTimelineWaitOutcome = await pollSubCompositionTimelines(
      page,
      pageReadyTimeout,
      void 0,
      () => session.scriptLoadFailures,
      void 0,
      (ids) => {
        session.pendingTimelineIds = [...ids];
      },
      () => session.vfxFailure !== void 0
    );
    logInitPhase(`pollSubCompositionTimelines complete (${session.subTimelineWaitOutcome})`);
    assertVfxIntact(session);
    recordSubTimelineWarning(session, pageReadyTimeout);
    await applyVideoMetadataHints(page, session.options.videoMetadataHints);
    logInitPhase("applyVideoMetadataHints complete");
    const skipVideoIds = session.options.skipReadinessVideoIds ?? [];
    const [videosReady] = await Promise.all([
      pollVideosReady(page, skipVideoIds, pageReadyTimeout),
      pollImagesReady(page, pageReadyTimeout).then(async (ready) => {
        if (!ready) {
          const failedImages = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img")).filter((img) => {
              const ie = img;
              const src = ie.getAttribute("src") || "";
              if (!src || src.startsWith("data:")) return false;
              return !(ie.complete && ie.naturalWidth > 0);
            }).map((img) => img.src || img.getAttribute("src") || "(no src)").join(", ");
          });
          console.warn(
            `[FrameCapture] Some image elements did not load within ${pageReadyTimeout}ms: ${failedImages}. Continuing render \u2014 affected images may appear blank/missing in early frames.`
          );
        }
        await decodeAllImages(page);
        return ready;
      }),
      page.evaluate(`document.fonts?.ready`),
      waitForOptionalTailwindReady(page, pageReadyTimeout)
    ]);
    logInitPhase("media + fonts + tailwind ready");
    if (!videosReady) {
      const failedVideos = await page.evaluate((skipIdList) => {
        const skip = new Set(skipIdList);
        return Array.from(document.querySelectorAll("video")).filter((v) => !skip.has(v.id)).filter((v) => v.readyState < 2 && !v.error).map((v) => v.src || v.getAttribute("src") || "(no src)").join(", ");
      }, skipVideoIds);
      console.warn(
        `[FrameCapture] Some video elements did not decode within ${pageReadyTimeout}ms: ${failedVideos}. Continuing render \u2014 affected videos will appear as blank/black frames.`
      );
    }
    recordCaptureWarnings(
      session,
      await collectMediaReadinessWarnings(page, skipVideoIds, pageReadyTimeout)
    );
    await recordLiveMapWarning(session, page);
    await recordSessionInitTelemetry(session, initStart);
    if (session.options.captureBeyondViewport) {
      const needsBeyondViewport = await pageContentExceedsCaptureHeight(
        page,
        session.options.height
      );
      if (!needsBeyondViewport) {
        session.options.captureBeyondViewport = false;
        logInitPhase("captureBeyondViewport downgraded: page content fits the capture viewport");
      }
    }
    await initDrawElementOrTransparentBackground(session, page, logInitPhase);
    await armStaticDedup(session, session.page, logInitPhase);
    await ensureRenderFrameSiblings(session.page);
    finalizeSessionInit(session);
    return;
  }
  const warmupIntervalMs = 33;
  const warmupState = {
    running: true,
    ticks: 0
  };
  const lockWarmupTicks = session.options.lockWarmupTicks === true;
  let warmupClient = null;
  const acquireWarmupClient = async () => {
    try {
      warmupClient = await getCdpSession(page);
      await warmupClient.send("HeadlessExperimental.enable");
    } catch {
    }
  };
  const warmupLoopPromise = (async () => {
    await acquireWarmupClient();
    await driveWarmupTicks(
      {
        intervalMs: warmupIntervalMs,
        lockWarmupTicks,
        tick: async (frameTimeTicks, interval) => {
          if (!warmupClient) {
            return;
          }
          await warmupClient.send("HeadlessExperimental.beginFrame", {
            frameTimeTicks,
            interval,
            noDisplayUpdates: true
          });
        }
      },
      warmupState
    );
  })();
  warmupLoopPromise.catch(() => {
  });
  logInitPhase("warmup loop started");
  await cancelWarmupOnError(warmupState, async () => {
    await gotoEntryPage();
    logInitPhase("page.goto complete");
    await page.evaluate(`window.__hfFlushSync?.()`);
    logInitPhase("GSAP proxy flush complete");
    const pageReadyTimeout = session.config?.playerReadyTimeout ?? DEFAULT_CONFIG.playerReadyTimeout;
    await pollHfReady(page, pageReadyTimeout);
    logInitPhase("pollHfReady complete");
    session.subTimelineWaitOutcome = await pollSubCompositionTimelines(
      page,
      pageReadyTimeout,
      void 0,
      () => session.scriptLoadFailures,
      void 0,
      (ids) => {
        session.pendingTimelineIds = [...ids];
      },
      () => session.vfxFailure !== void 0
    );
    logInitPhase(`pollSubCompositionTimelines complete (${session.subTimelineWaitOutcome})`);
    assertVfxIntact(session);
    recordSubTimelineWarning(session, pageReadyTimeout);
    await applyVideoMetadataHints(page, session.options.videoMetadataHints);
    logInitPhase("applyVideoMetadataHints complete");
    const bfSkipVideoIds = session.options.skipReadinessVideoIds ?? [];
    const [bfVideosReady] = await Promise.all([
      pollVideosReady(page, bfSkipVideoIds, pageReadyTimeout),
      pollImagesReady(page, pageReadyTimeout).then(async (ready) => {
        if (!ready) {
          const failedImages = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img")).filter((img) => {
              const ie = img;
              const src = ie.getAttribute("src") || "";
              if (!src || src.startsWith("data:")) return false;
              return !(ie.complete && ie.naturalWidth > 0);
            }).map((img) => img.src || img.getAttribute("src") || "(no src)").join(", ");
          });
          console.warn(
            `[FrameCapture] Some image elements did not load within ${pageReadyTimeout}ms: ${failedImages}. Continuing render \u2014 affected images may appear blank/missing in early frames.`
          );
        }
        await decodeAllImages(page);
        return ready;
      }),
      page.evaluate(`document.fonts?.ready`),
      waitForOptionalTailwindReady(page, pageReadyTimeout)
    ]);
    logInitPhase("media + fonts + tailwind ready");
    if (!bfVideosReady) {
      const failedVideos = await page.evaluate((skipIdList) => {
        const skip = new Set(skipIdList);
        return Array.from(document.querySelectorAll("video")).filter((v) => !skip.has(v.id)).filter((v) => v.readyState < 2 && !v.error).map((v) => v.src || v.getAttribute("src") || "(no src)").join(", ");
      }, bfSkipVideoIds);
      console.warn(
        `[FrameCapture] Some video elements did not decode within ${pageReadyTimeout}ms: ${failedVideos}. Continuing render \u2014 affected videos will appear as blank/black frames.`
      );
    }
    recordCaptureWarnings(
      session,
      await collectMediaReadinessWarnings(page, bfSkipVideoIds, pageReadyTimeout)
    );
    await recordLiveMapWarning(session, page);
    await recordSessionInitTelemetry(session, initStart);
  });
  warmupState.running = false;
  await warmupLoopPromise.catch(() => {
  });
  const preparedBeginFrameTimeline = prepareBeginFrameTimeline(
    session,
    warmupState,
    warmupIntervalMs
  );
  await initDrawElementOrTransparentBackground(session, page, logInitPhase);
  await armStaticDedup(session, session.page, logInitPhase);
  await ensureRenderFrameSiblings(page);
  const commitCdp = await getCdpSession(page);
  await commitCdp.send("HeadlessExperimental.beginFrame", preparedBeginFrameTimeline.commitParams);
  finalizeSessionInit(session);
}
async function captureFrameErrorDiagnostics(session, frameIndex, time, error) {
  try {
    const diagnosticsDir = join3(session.outputDir, "diagnostics");
    if (!existsSync3(diagnosticsDir)) mkdirSync(diagnosticsDir, { recursive: true });
    const base = join3(diagnosticsDir, `frame-error-${frameIndex}`);
    const pageScreenshotCanResolve = session.launchCaptureMode !== "beginframe";
    if (pageScreenshotCanResolve) {
      await session.page.screenshot({ path: `${base}.png`, type: "png", fullPage: true });
    }
    const html = await session.page.content();
    writeFileSync(`${base}.html`, html, "utf-8");
    writeFileSync(
      `${base}.json`,
      JSON.stringify(
        {
          frameIndex,
          time,
          error: error.message,
          stack: error.stack,
          browserConsoleTail: session.browserConsoleBuffer.slice(-30)
        },
        null,
        2
      ),
      "utf-8"
    );
    return `${base}.json`;
  } catch {
    return null;
  }
}
async function waitForPendingSeekCompletion(page) {
  await page.evaluate(async () => {
    const waitForCompletion = window.__hfWaitForSeekCompletion;
    await waitForCompletion?.();
  });
}
async function seekPageTimeline(page, time, seekOptions) {
  return page.evaluate(
    (t, opts) => {
      if (window.__hf && typeof window.__hf.seek === "function") {
        window.__hf.seek(t, opts);
      }
      return !!window.__hf_page_composite_pending;
    },
    time,
    seekOptions
  );
}
async function prepareFrameForCapture(session, frameIndex, time, seekOptions, heldVideoTime) {
  const { page, options } = session;
  if (!session.isInitialized) {
    throw new Error("[FrameCapture] Session not initialized");
  }
  assertVfxIntact(session);
  const quantizedTime = quantizeSeekTime(
    time,
    fpsToNumber(options.fps),
    seekOptions?.subFrameDivisions
  );
  const seekStart = Date.now();
  const hasPendingComposite = await seekPageTimeline(page, quantizedTime, seekOptions);
  await decodeDynamicCssBackgroundImages(page);
  const seekMs = Date.now() - seekStart;
  const beforeCaptureStart = Date.now();
  if (session.onBeforeCapture) {
    await session.onBeforeCapture(page, quantizedTime, heldVideoTime);
  }
  await waitForPendingSeekCompletion(page);
  await page.evaluate(async () => {
    const runtime = window.__hf?.colorGrading;
    await runtime?.waitForActiveLuts?.();
  });
  const beforeCaptureMs = Date.now() - beforeCaptureStart;
  if (hasPendingComposite && session.captureMode !== "beginframe" && session.captureMode !== "drawelement") {
    await page.evaluate(async () => {
      const w = window;
      if (typeof w.__hf_page_composite_prepare === "function") {
        await w.__hf_page_composite_prepare();
      }
    });
    const cdp = await getCdpSession(page);
    await cdp.send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 1,
      clip: { x: 0, y: 0, width: 1, height: 1, scale: 1 }
    });
    await page.evaluate(() => {
      const w = window;
      if (typeof w.__hf_page_composite_resolve === "function") {
        w.__hf_page_composite_resolve();
      }
    });
  }
  return { quantizedTime, seekMs, beforeCaptureMs };
}
function computeAuthoredClipBoundaryFrames(schedule, fps) {
  const frames = /* @__PURE__ */ new Set();
  for (const rawTiming of schedule) {
    const timing = resolveAuthoredTimingWindow(rawTiming);
    if (!timing) continue;
    const edges = [Math.round(timing.start * fps)];
    if (timing.end != null) edges.push(Math.round(timing.end * fps));
    for (const e of edges) {
      for (const f of [e - 1, e, e + 1]) {
        if (f >= 0) frames.add(f);
      }
    }
  }
  return frames;
}
async function computeClipBoundaryFrames(page, fps) {
  const schedule = await page.evaluate(
    () => Array.from(document.querySelectorAll("[data-start]")).map((el) => ({
      start: el.getAttribute("data-start"),
      duration: el.getAttribute("data-duration"),
      authoredDuration: el.getAttribute("data-hf-authored-duration"),
      end: el.getAttribute("data-end"),
      authoredEnd: el.getAttribute("data-hf-authored-end")
    }))
  );
  return computeAuthoredClipBoundaryFrames(schedule, fps);
}
var MAX_STATIC_DEDUP_ANALYSIS_FRAMES = 1e6;
function isStaticDedupFrameAnalysisSafe(totalFrames) {
  return Number.isFinite(totalFrames) && Number.isSafeInteger(totalFrames) && totalFrames > 0 && totalFrames <= MAX_STATIC_DEDUP_ANALYSIS_FRAMES;
}
async function computeStaticFrameSet(page, fps) {
  const result = await page.evaluate((spatialProps) => {
    const SPATIAL_PROPS = new Set(spatialProps);
    function isSpatial(vars) {
      if (!vars) return false;
      for (const key of Object.keys(vars)) if (SPATIAL_PROPS.has(key)) return true;
      return false;
    }
    const intervals2 = [];
    let tweenCount2 = 0;
    let hasTimelineCall2 = false;
    function walk(tl, offset) {
      if (typeof tl.getChildren !== "function") return;
      if (typeof tl.vars?.onUpdate === "function") {
        const total = typeof tl.totalDuration === "function" ? tl.totalDuration() : 0;
        if (total > 0) intervals2.push({ start: offset, end: offset + total, spatial: true });
      }
      for (const child of tl.getChildren(false, true, true)) {
        const start = offset + (typeof child.startTime === "function" ? child.startTime() : 0);
        const single = typeof child.duration === "function" ? child.duration() : 0;
        const total = typeof child.totalDuration === "function" ? child.totalDuration() : single;
        if (typeof child.getChildren === "function") {
          if (total > single + 1e-6) {
            intervals2.push({ start, end: start + total, spatial: true });
            walk(child, start);
          } else {
            walk(child, start);
          }
        } else {
          tweenCount2++;
          intervals2.push({ start, end: start + total, spatial: isSpatial(child.vars) });
          if (total <= 1e-6 && (typeof child.vars?.onComplete === "function" || typeof child.vars?.onReverseComplete === "function")) {
            hasTimelineCall2 = true;
          }
        }
      }
    }
    const w = window;
    for (const tl of Object.values(w.__timelines || {})) {
      if (tl && typeof tl.getChildren === "function") walk(tl, 0);
    }
    const hasVideo2 = !!document.querySelector("video");
    const hasCanvas2 = !!document.querySelector("canvas");
    const hasFrameSources2 = w.__hfHasFrameSources?.() ?? false;
    const hasIframe2 = !!document.querySelector("iframe");
    const hasUnresolvableClipStart2 = Array.from(document.querySelectorAll("[data-start]")).some(
      (el) => {
        const v = el.dataset.start;
        return v != null && v.trim() !== "" && !Number.isFinite(parseFloat(v));
      }
    );
    let hasNonGsapAnim2 = false;
    try {
      const docAnims = document.getAnimations;
      if (typeof docAnims === "function") {
        hasNonGsapAnim2 = docAnims.call(document).some((a) => {
          const t = a;
          return t.playState === "running" || t.playState === "paused";
        });
      }
    } catch {
      hasNonGsapAnim2 = true;
    }
    return {
      intervals: intervals2,
      tweenCount: tweenCount2,
      duration: w.__hf?.duration ?? 0,
      hasVideo: hasVideo2,
      hasCanvas: hasCanvas2,
      hasFrameSources: hasFrameSources2,
      hasIframe: hasIframe2,
      hasNonGsapAnim: hasNonGsapAnim2,
      hasUnresolvableClipStart: hasUnresolvableClipStart2,
      hasTimelineCall: hasTimelineCall2
    };
  }, SPATIAL_TWEEN_PROPERTIES);
  const {
    intervals,
    tweenCount,
    duration,
    hasVideo,
    hasCanvas,
    hasFrameSources,
    hasIframe,
    hasNonGsapAnim,
    hasUnresolvableClipStart,
    hasTimelineCall
  } = result;
  const totalFrames = Math.max(1, Math.ceil(duration * fps));
  if (!isStaticDedupFrameAnalysisSafe(totalFrames)) {
    return {
      totalFrames,
      staticFrameSet: /* @__PURE__ */ new Set(),
      nonSpatialOnlyFrameSet: /* @__PURE__ */ new Set(),
      hasVideo,
      hasCanvas,
      hasNonGsapAnim,
      tweenCount,
      eligible: false,
      reason: `static-dedup frame analysis limit (${MAX_STATIC_DEDUP_ANALYSIS_FRAMES})`
    };
  }
  const animated = /* @__PURE__ */ new Set();
  const spatialFrameSet = /* @__PURE__ */ new Set();
  for (const { start, end, spatial } of intervals) {
    const lo = Math.max(0, Math.floor(start * fps));
    const hi = Math.min(totalFrames - 1, Math.ceil(end * fps));
    for (let f = lo; f <= hi; f++) {
      animated.add(f);
      if (spatial) spatialFrameSet.add(f);
    }
  }
  for (const f of await computeClipBoundaryFrames(page, fps)) animated.add(f);
  const reasons = [];
  if (!(duration > 0)) reasons.push("unknown/zero duration");
  if (hasVideo) reasons.push("video");
  if (hasCanvas) reasons.push("canvas/webgl");
  if (hasFrameSources) reasons.push("registered frame source");
  if (hasIframe) reasons.push("iframe");
  if (tweenCount === 0) reasons.push("no GSAP tweens (non-GSAP animation)");
  if (hasNonGsapAnim) reasons.push("running CSS/WAAPI animation");
  if (hasTimelineCall) reasons.push("tl.call() side effect (not seek-safe)");
  if (hasUnresolvableClipStart) reasons.push("unresolvable clip start (reference expression)");
  const eligible = reasons.length === 0;
  const staticFrameSet = /* @__PURE__ */ new Set();
  if (eligible) {
    for (let f = 1; f < totalFrames; f++) {
      if (!animated.has(f) && !animated.has(f - 1)) staticFrameSet.add(f);
    }
  }
  const nonSpatialOnlyFrameSet = /* @__PURE__ */ new Set();
  if (eligible) {
    for (const f of animated) if (!spatialFrameSet.has(f)) nonSpatialOnlyFrameSet.add(f);
  }
  return {
    totalFrames,
    staticFrameSet,
    nonSpatialOnlyFrameSet,
    hasVideo,
    hasCanvas,
    hasNonGsapAnim,
    tweenCount,
    eligible,
    reason: eligible ? "eligible" : reasons.join("+")
  };
}
var STATIC_VERIFY_REFERENCE_STRIDE = 24;
var STATIC_VERIFY_MAX_MS = 15e3;
var STATIC_VERIFY_MIN_SCREENSHOT_CAP = 400;
var STATIC_VERIFY_SAMPLE_CAP_MULTIPLIER = 8;
var STATIC_VERIFY_MAX_GLOBAL_SAMPLE_FLOOR = STATIC_VERIFY_MIN_SCREENSHOT_CAP / STATIC_VERIFY_SAMPLE_CAP_MULTIPLIER;
function contiguousStaticRuns(frames) {
  const runs = [];
  for (const frame of frames) {
    const last = runs.at(-1);
    if (last && frame === last.b + 1) last.b = frame;
    else runs.push({ a: frame, b: frame });
  }
  return runs;
}
function mandatoryRunComparisons(anchor, end) {
  const points = /* @__PURE__ */ new Set();
  for (let frame = anchor + STATIC_VERIFY_REFERENCE_STRIDE; frame < end; frame += STATIC_VERIFY_REFERENCE_STRIDE) {
    points.add(frame);
  }
  points.add(end);
  return [...points].sort((left, right) => left - right);
}
function planStaticVerification(staticFrames, sampleFloor) {
  const frames = [...staticFrames].sort((left, right) => left - right);
  const allRuns = contiguousStaticRuns(frames).map(({ a, b }) => {
    const comparisons = mandatoryRunComparisons(a - 1, b);
    const frameCount = b - a + 1;
    return {
      a,
      b,
      anchor: a - 1,
      comparisons,
      frameCount,
      netSavings: frameCount - comparisons.length - 1
    };
  });
  const runs = allRuns.filter((run) => run.anchor >= 0 && run.netSavings > 0);
  const skippedRuns = allRuns.filter((run) => run.anchor < 0 || run.netSavings <= 0).map((run) => ({ a: run.a, b: run.b, reason: "unprofitable" }));
  const normalizedSampleFloor = Number.isFinite(sampleFloor) ? Math.max(1, Math.floor(sampleFloor)) : 1;
  const effectiveSampleFloor = Math.min(
    normalizedSampleFloor,
    STATIC_VERIFY_MAX_GLOBAL_SAMPLE_FLOOR
  );
  const comparisonCount = () => runs.reduce((sum, run) => sum + run.comparisons.length, 0);
  while (comparisonCount() < effectiveSampleFloor) {
    const candidates = runs.filter((run) => run.frameCount > run.comparisons.length + 2).flatMap((run) => {
      const points = [run.anchor, ...run.comparisons];
      return points.slice(1).map((right, index) => ({
        run,
        left: points[index],
        right,
        width: right - points[index]
      }));
    }).filter((gap) => gap.width > 1).sort(
      (left, right) => right.width - left.width || left.run.a - right.run.a || left.left - right.left
    );
    const selected = candidates[0];
    if (!selected) break;
    selected.run.comparisons.push(Math.floor((selected.left + selected.right) / 2));
    selected.run.comparisons.sort((left, right) => left - right);
    selected.run.netSavings = selected.run.frameCount - selected.run.comparisons.length - 1;
  }
  runs.sort((left, right) => right.netSavings - left.netSavings || left.a - right.a);
  const plannedComparisons = comparisonCount();
  return {
    runs,
    skippedRuns,
    effectiveSampleFloor,
    predictedFrames: frames.length,
    verifiedCandidateFrames: runs.reduce((sum, run) => sum + run.frameCount, 0),
    plannedAnchors: runs.length,
    plannedComparisons,
    plannedScreenshots: runs.length + plannedComparisons
  };
}
async function createStaticVerificationPage(session) {
  const page = await session.browser.newPage();
  const pageNavigationTimeout = session.config?.pageNavigationTimeout ?? DEFAULT_CONFIG.pageNavigationTimeout;
  const pageReadyTimeout = session.config?.playerReadyTimeout ?? DEFAULT_CONFIG.playerReadyTimeout;
  try {
    await page.evaluateOnNewDocument(() => {
      const w = window;
      if (typeof w.__name !== "function") {
        w.__name = (fn, _name) => fn;
      }
    });
    if (session.options.variables && Object.keys(session.options.variables).length > 0) {
      const variablesJson = JSON.stringify(session.options.variables);
      await page.evaluateOnNewDocument((json) => {
        window.__hfVariables = JSON.parse(json);
      }, variablesJson);
    }
    await page.setViewport({
      width: session.options.width,
      height: session.options.height,
      deviceScaleFactor: session.options.deviceScaleFactor || 1
    });
    await page.goto(`${session.serverUrl}/index.html`, {
      waitUntil: "domcontentloaded",
      timeout: pageNavigationTimeout
    });
    await page.evaluate(`window.__hfFlushSync?.()`);
    await pollHfReady(page, pageReadyTimeout);
    await pollSubCompositionTimelines(page, pageReadyTimeout);
    await applyVideoMetadataHints(page, session.options.videoMetadataHints);
    const skipVideoIds = session.options.skipReadinessVideoIds ?? [];
    await Promise.all([
      pollVideosReady(page, skipVideoIds, pageReadyTimeout),
      pollImagesReady(page, pageReadyTimeout).then(
        (ready) => ready ? decodeAllImages(page) : void 0
      ),
      page.evaluate(`document.fonts?.ready`),
      waitForOptionalTailwindReady(page, pageReadyTimeout)
    ]);
    if (session.options.format === "png" && session.options.transparentBackground !== false) await initTransparentBackground(page);
    return page;
  } catch (error) {
    await page.close().catch(() => {
    });
    throw error;
  }
}
async function verifyStaticFramesSafe(session, page, staticFrames, fps, sampleCount, dependencies = {}) {
  const plan = planStaticVerification(staticFrames, sampleCount);
  const now = dependencies.now ?? Date.now;
  const capture = dependencies.capture ?? pageScreenshotCapture;
  const startedAt = now();
  const deadline = startedAt + STATIC_VERIFY_MAX_MS;
  const verifiedFrames = /* @__PURE__ */ new Set();
  const stats = {
    plannedRuns: plan.runs.length,
    completedRuns: 0,
    plannedAnchors: plan.plannedAnchors,
    completedAnchors: 0,
    plannedComparisons: plan.plannedComparisons,
    completedComparisons: 0,
    seeks: 0,
    screenshots: 0,
    byteComparisons: 0,
    elapsedMs: 0,
    predictedFrames: plan.predictedFrames,
    verifiedFrames: 0,
    unverifiedFrames: plan.predictedFrames
  };
  const finish = (outcome, badFrame) => ({
    outcome,
    verifiedFrames,
    ...badFrame == null ? {} : { badFrame },
    stats
  });
  if (plan.runs.length === 0) return finish("unprofitable");
  const seekToFrame = async (frameIdx) => {
    stats.seeks++;
    const t = quantizeTimeToFrame(frameIdx / fps, fps);
    await page.evaluate((tt) => {
      const hf = window.__hf;
      if (hf && typeof hf.seek === "function") hf.seek(tt, { suppressEvents: false });
    }, t);
  };
  const hardCap = Math.max(
    STATIC_VERIFY_MIN_SCREENSHOT_CAP,
    plan.effectiveSampleFloor * STATIC_VERIFY_SAMPLE_CAP_MULTIPLIER,
    Math.ceil(plan.predictedFrames / STATIC_VERIFY_REFERENCE_STRIDE) * 3 + plan.runs.length
  );
  const seekCapture = async (frameIdx) => {
    if (now() >= deadline) return "time_budget";
    if (stats.screenshots >= hardCap) return "count_budget";
    await seekToFrame(frameIdx);
    stats.screenshots++;
    return capture(page, session.options);
  };
  try {
    for (const run of plan.runs) {
      const anchorBuf = await seekCapture(run.anchor);
      if (typeof anchorBuf === "string") return finish(anchorBuf, run.a);
      stats.completedAnchors++;
      for (const f of run.comparisons) {
        const cur = await seekCapture(f);
        if (typeof cur === "string") return finish(cur, f);
        stats.completedComparisons++;
        stats.byteComparisons++;
        if (!anchorBuf.equals(cur)) {
          verifiedFrames.clear();
          stats.verifiedFrames = 0;
          stats.unverifiedFrames = plan.predictedFrames;
          return finish("mismatch", f);
        }
      }
      stats.completedRuns++;
      for (let frame = run.a; frame <= run.b; frame++) verifiedFrames.add(frame);
      stats.verifiedFrames = verifiedFrames.size;
      stats.unverifiedFrames = plan.predictedFrames - verifiedFrames.size;
    }
    return finish("verified");
  } catch {
    verifiedFrames.clear();
    stats.verifiedFrames = 0;
    stats.unverifiedFrames = plan.predictedFrames;
    return finish("infrastructure");
  } finally {
    await seekToFrame(0).catch(() => {
    });
    stats.elapsedMs = Math.max(0, now() - startedAt);
  }
}
async function armStaticDedup(session, page, logInitPhase) {
  let sharedStaticFrameStats;
  if (session.options.motionBlur && session.options.motionBlur.samplesPerFrame === void 0 && !session.motionBlurNonSpatialFrames) {
    sharedStaticFrameStats = await computeStaticFrameSet(page, fpsToNumber(session.options.fps));
    session.motionBlurNonSpatialFrames = sharedStaticFrameStats.nonSpatialOnlyFrameSet;
  }
  if (session.staticFrames || session.staticDedupSkipReason) return;
  session.staticDedupEnabled = session.config?.staticFrameDedup !== false;
  if (!session.staticDedupEnabled) return;
  if (session.captureMode !== "screenshot") {
    session.staticDedupSkipReason = "capture_mode";
    logInitPhase(
      `static-frame dedup: disabled (capture mode ${session.captureMode}, not screenshot)`
    );
    return;
  }
  if (session.onBeforeCapture) {
    session.staticDedupSkipReason = "video_injection";
    logInitPhase("static-frame dedup: disabled (before-capture hook / video injection active)");
    return;
  }
  const pageComposite = await page.evaluate(
    () => typeof window.__hf_page_composite_prepare === "function"
  ).catch(() => true);
  if (pageComposite) {
    session.staticDedupSkipReason = "page_composite";
    logInitPhase("static-frame dedup: disabled (page-side compositing active)");
    return;
  }
  const fps = fpsToNumber(session.options.fps);
  const stats = sharedStaticFrameStats ?? await computeStaticFrameSet(page, fps);
  if (!stats.eligible || stats.staticFrameSet.size === 0) {
    session.staticDedupSkipReason = "ineligible";
    logInitPhase(`static-frame dedup: disabled (${stats.reason})`);
    return;
  }
  const rawSamples = Number(process.env.HF_STATIC_DEDUP_SAMPLES ?? "24");
  const samples = Number.isFinite(rawSamples) && rawSamples >= 1 ? rawSamples : 24;
  session.staticDedupPredictedCount = stats.staticFrameSet.size;
  if (process.env.HF_STATIC_DEDUP_VERIFY === "false") {
    session.staticFrames = stats.staticFrameSet;
    logInitPhase(
      `static-frame dedup: ${stats.staticFrameSet.size}/${stats.totalFrames} frame(s) reusable (verification explicitly disabled)`
    );
    return;
  }
  let verificationPage;
  let verdict;
  try {
    verificationPage = await createStaticVerificationPage(session);
    verdict = await verifyStaticFramesSafe(
      session,
      verificationPage,
      stats.staticFrameSet,
      fps,
      samples
    );
  } catch {
    session.staticDedupSkipReason = "verification_failed";
    logInitPhase("static-frame dedup: disabled (verification infrastructure failure)");
    return;
  } finally {
    await verificationPage?.close().catch(() => {
    });
  }
  session.staticDedupVerification = verdict;
  if (verdict.outcome === "mismatch" || verdict.outcome === "infrastructure") {
    session.staticDedupSkipReason = "verification_failed";
    logInitPhase(
      verdict.outcome === "mismatch" ? `static-frame dedup: disabled (verification mismatch at predicted-static frame ${verdict.badFrame})` : "static-frame dedup: disabled (verification infrastructure failure)"
    );
    return;
  }
  if (verdict.outcome === "unprofitable") {
    session.staticDedupSkipReason = "unprofitable";
    logInitPhase("static-frame dedup: disabled (verification cost cannot save captures)");
    return;
  }
  if (verdict.verifiedFrames.size === 0) {
    session.staticDedupSkipReason = "verification_budget";
    logInitPhase(
      `static-frame dedup: disabled (${verdict.outcome} before frame ${verdict.badFrame}; no run fully verified)`
    );
    return;
  }
  session.staticFrames = verdict.verifiedFrames;
  logInitPhase(
    `static-frame dedup: ${verdict.verifiedFrames.size}/${stats.staticFrameSet.size} predicted frame(s) reusable (outcome=${verdict.outcome}, runs=${verdict.stats.completedRuns}/${verdict.stats.plannedRuns}, screenshots=${verdict.stats.screenshots}, seeks=${verdict.stats.seeks}, elapsedMs=${verdict.stats.elapsedMs})`
  );
}
async function computeTimelineAtRiskFrames(page, fps) {
  const result = await page.evaluate(() => {
    const AT_RISK_PROPS = /* @__PURE__ */ new Set([
      "backdropFilter",
      "backdrop-filter",
      "mixBlendMode",
      "mix-blend-mode",
      "rotationX",
      "rotationY",
      "rotateX",
      "rotateY",
      "z",
      "translateZ",
      "clipPath",
      "clip-path",
      "maskImage",
      "mask"
    ]);
    function walkTimeline(tl, offset, out) {
      if (typeof tl.getChildren !== "function") return;
      for (const child of tl.getChildren(false, true, true)) {
        const childStart = offset + (typeof child.startTime === "function" ? child.startTime() : 0);
        const childDur = typeof child.duration === "function" ? child.duration() : 0;
        if (typeof child.getChildren === "function") {
          walkTimeline(child, childStart, out);
        } else {
          const vars = child.vars || {};
          if (Object.keys(vars).some((k) => AT_RISK_PROPS.has(k))) {
            out.push({ start: childStart, end: childStart + childDur });
          }
        }
      }
    }
    const w = window;
    const timelines = w.__timelines || {};
    const intervals2 = [];
    for (const tl of Object.values(timelines)) {
      if (tl && typeof tl.getChildren === "function") {
        walkTimeline(tl, 0, intervals2);
      }
    }
    const duration2 = w.__hf?.duration ?? 0;
    return { intervals: intervals2, duration: duration2 };
  });
  const { intervals, duration } = result;
  const frames = /* @__PURE__ */ new Set();
  for (const { start, end } of intervals) {
    const lo = Math.floor(start * fps) - 1;
    const hi = Math.ceil(end * fps) + 1;
    for (let f = Math.max(0, lo); f <= hi; f++) {
      frames.add(f);
    }
  }
  const totalFrames = Math.max(1, Math.ceil(duration * fps));
  return { frames, totalFrames };
}
function isNoCachedPaintRecordError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes("No cached paint record for element");
}
function isCanvasNotInitializedError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes(DE_CANVAS_NOT_INITIALIZED_CODE);
}
function isRecoverableDrawElementError(err) {
  return isNoCachedPaintRecordError(err) || isCanvasNotInitializedError(err);
}
var DE_FRAME_TIMEOUT_MS = Number(process.env.HF_DE_FRAME_TIMEOUT_MS ?? "15000");
var DeFrameTimeoutError = class extends Error {
  constructor(label, ms) {
    super(`drawElement ${label} exceeded ${ms}ms (renderer stopped scheduling; see PRINFRA-488)`);
    this.name = "DeFrameTimeoutError";
  }
};
async function withFrameDeadline(work, label, ms, onTimeout) {
  if (!(ms > 0)) return work;
  let timer;
  const guard = new Promise((_resolve, reject) => {
    timer = setTimeout(() => {
      onTimeout?.();
      reject(new DeFrameTimeoutError(label, ms));
    }, ms);
  });
  try {
    return await Promise.race([work, guard]);
  } finally {
    if (timer) clearTimeout(timer);
    void work.catch(() => {
    });
  }
}
function resolveSessionMotionBlur(session) {
  const plan = resolveMotionBlurPlan(session.options.motionBlur);
  if (!plan) return void 0;
  if (session.captureMode !== "screenshot") {
    throw new Error(
      `[MotionBlur] sub-frame motion blur requires screenshot capture mode, got "${session.captureMode}"`
    );
  }
  if (session.options.format !== "png") {
    throw new Error(
      `[MotionBlur] sub-frame motion blur requires format "png", got "${session.options.format ?? "jpeg"}"`
    );
  }
  return plan;
}
async function captureFrameSurface(session, frameIndex, time, seekOptions, heldVideoTime) {
  const { page, options } = session;
  const { quantizedTime, seekMs, beforeCaptureMs } = await prepareFrameForCapture(
    session,
    frameIndex,
    time,
    seekOptions,
    heldVideoTime
  );
  const screenshotStart = Date.now();
  let screenshotBuffer;
  if (session.captureMode === "beginframe") {
    const frameTimeTicks = session.beginFrameTimeTicks + frameIndex * session.beginFrameIntervalMs;
    const result = await beginFrameCapture(
      page,
      options,
      frameTimeTicks,
      session.beginFrameIntervalMs
    );
    if (result.hasDamage) session.beginFrameHasDamageCount++;
    else session.beginFrameNoDamageCount++;
    screenshotBuffer = result.buffer;
  } else if (session.captureMode === "drawelement" && session.clipBoundaryFrames?.has(frameIndex) && process.env.HF_FAST_CAPTURE_BOUNDARY_SS === "true") {
    throw new DrawElementCaptureError(
      frameIndex,
      "boundary screenshot requested on an injected canvas page"
    );
  } else if (session.captureMode === "drawelement") {
    if (session.beginFrameTimeTicks > 0) {
      const client = await getCdpSession(page);
      await client.send("HeadlessExperimental.beginFrame", {
        frameTimeTicks: session.beginFrameTimeTicks + frameIndex * session.beginFrameIntervalMs,
        interval: session.beginFrameIntervalMs,
        noDisplayUpdates: false
        // no screenshot param — we capture via canvas
      });
    }
    try {
      screenshotBuffer = await captureDrawElementFrame(
        page,
        options.width,
        options.height,
        options.format ?? "jpeg",
        options.quality ?? 80,
        // Paint-event sync only without BeginFrame (macOS / screenshot-launched):
        // under BeginFrame control the per-frame beginFrame above already painted
        // a fresh snapshot, and no further paint would arrive during a wait.
        session.beginFrameTimeTicks === 0
      );
      if ((options.format ?? "jpeg") !== "png" && process.env.HF_FORCE_DRAWELEMENT !== "1") {
        const sizes = session.deFrameSizes ??= [];
        const sorted = sizes.length >= 12 ? [...sizes].sort((a, b) => a - b) : null;
        const median = sorted ? sorted[sorted.length >> 1] ?? 0 : 0;
        const floor = Math.max(2e4, median * 0.12);
        if (screenshotBuffer.length < floor) {
          throw new DrawElementCaptureError(
            frameIndex,
            `suspect small frame (${screenshotBuffer.length}B < ${Math.round(floor)}B)`
          );
        } else {
          if (sizes.length >= 60) sizes.shift();
          sizes.push(screenshotBuffer.length);
        }
      }
    } catch (err) {
      if (isRecoverableDrawElementError(err)) {
        session.deNcprFallbacks = (session.deNcprFallbacks ?? 0) + 1;
        const reason = isCanvasNotInitializedError(err) ? "drawElement canvas not initialized" : "No cached paint record";
        throw new DrawElementCaptureError(frameIndex, reason, err);
      } else {
        throw err;
      }
    }
  } else {
    screenshotBuffer = await pageScreenshotCapture(page, options);
  }
  const screenshotMs = Date.now() - screenshotStart;
  return { buffer: screenshotBuffer, quantizedTime, seekMs, beforeCaptureMs, screenshotMs };
}
function finalizeSessionInit(session) {
  session.motionBlur = resolveSessionMotionBlur(session);
  session.isInitialized = true;
  startChromeMemorySampler(session);
}
function classifyChromeProcesses(browserPid, processInfo) {
  const renderers = [];
  const gpu = [];
  for (const row of processInfo) {
    if (row.type === "renderer") renderers.push(row.id);
    else if (row.type === "GPU") gpu.push(row.id);
  }
  return browserPid === void 0 ? { renderers, gpu } : { browser: browserPid, renderers, gpu };
}
async function readChromePids(browserPid, createBrowserCdpSession) {
  const cdp = await createBrowserCdpSession();
  try {
    const info = await cdp.send("SystemInfo.getProcessInfo");
    return classifyChromeProcesses(browserPid, info.processInfo);
  } finally {
    await cdp.detach().catch(() => {
    });
  }
}
var CHROME_MEMORY_SAMPLE_MS_DEFAULT = 2e3;
function resolveChromeMemorySampleMs() {
  const raw = process.env.HF_CHROME_MEMORY_SAMPLE_MS;
  const parsed = raw === void 0 ? Number.NaN : Number(raw);
  return Number.isFinite(parsed) && parsed >= 250 ? parsed : CHROME_MEMORY_SAMPLE_MS_DEFAULT;
}
function startChromeMemorySampler(session) {
  if (session.chromeMemory) return;
  if (process.env.HF_CHROME_MEMORY_SAMPLER === "false") return;
  const sampler = createChromeMemorySampler({
    intervalMs: resolveChromeMemorySampleMs(),
    onSample: session.options.onMemorySample,
    sampleRss: (pids) => sampleProcessRss(pids),
    getPids: () => readChromePids(
      session.browser.process()?.pid,
      () => session.browser.target().createCDPSession()
    )
  });
  session.chromeMemory = sampler;
  sampler.start();
}
async function resolveAdaptiveSampleCount(session, frameIndex, absFrameIndex, plan, fps, sampleSeek, frameTime) {
  if (session.motionBlurNonSpatialFrames?.has(absFrameIndex)) {
    return {
      samplesPerFrame: DEFAULT_SAMPLES_PER_FRAME,
      seekMs: 0,
      beforeCaptureMs: 0,
      screenshotMs: 0
    };
  }
  const { windowStart, windowEnd } = motionBlurProbeTimes(plan, absFrameIndex, fps);
  const probeA = await captureFrameSurface(session, frameIndex, windowStart, sampleSeek, frameTime);
  const probeB = await captureFrameSurface(session, frameIndex, windowEnd, sampleSeek, frameTime);
  return {
    samplesPerFrame: adaptiveSampleCount(probeDiffMagnitude(probeA.buffer, probeB.buffer)),
    seekMs: probeA.seekMs + probeB.seekMs,
    beforeCaptureMs: probeA.beforeCaptureMs + probeB.beforeCaptureMs,
    screenshotMs: probeA.screenshotMs + probeB.screenshotMs
  };
}
async function captureAccumulatedFrame(session, frameIndex, absFrameIndex, plan) {
  const fps = fpsToNumber(session.options.fps);
  const frameTime = quantizeSeekTime(absFrameIndex / fps, fps);
  const eventfulSeekStart = Date.now();
  await seekPageTimeline(session.page, frameTime, void 0);
  const totals = { seekMs: Date.now() - eventfulSeekStart, beforeCaptureMs: 0, screenshotMs: 0 };
  if (session.onBeforeCapture) {
    const injectStart = Date.now();
    await session.onBeforeCapture(session.page, frameTime, frameTime);
    totals.beforeCaptureMs += Date.now() - injectStart;
  }
  const sampleSeek = {
    suppressEvents: true,
    subFrameDivisions: plan.subFrameDivisions
  };
  let samplesPerFrame = plan.fixedSamplesPerFrame;
  if (samplesPerFrame === null) {
    const chosen = await resolveAdaptiveSampleCount(
      session,
      frameIndex,
      absFrameIndex,
      plan,
      fps,
      sampleSeek,
      frameTime
    );
    samplesPerFrame = chosen.samplesPerFrame;
    totals.seekMs += chosen.seekMs;
    totals.beforeCaptureMs += chosen.beforeCaptureMs;
    totals.screenshotMs += chosen.screenshotMs;
  }
  const accumulator = new MotionBlurAccumulator(plan.blend);
  for (const sampleTime of motionBlurSampleTimes(plan, absFrameIndex, fps, samplesPerFrame)) {
    const sample = await captureFrameSurface(
      session,
      frameIndex,
      sampleTime,
      sampleSeek,
      frameTime
    );
    totals.seekMs += sample.seekMs;
    totals.beforeCaptureMs += sample.beforeCaptureMs;
    totals.screenshotMs += sample.screenshotMs;
    accumulator.add(sample.buffer);
  }
  const restoreSeekStart = Date.now();
  await seekPageTimeline(session.page, frameTime, { suppressEvents: true });
  totals.seekMs += Date.now() - restoreSeekStart;
  const blended = accumulator.finish();
  return {
    buffer: encodePng(blended.width, blended.height, blended.data),
    quantizedTime: frameTime,
    ...totals
  };
}
async function captureFrameCore(session, frameIndex, time) {
  const { options } = session;
  const startTime = Date.now();
  const absFrameIndex = Math.floor(time * fpsToNumber(options.fps) + 1e-9);
  if (session.staticFrames?.has(absFrameIndex) && session.lastFrameBuffer && session.lastFrameAbsoluteIndex === absFrameIndex - 1 && (!session.motionBlur || motionBlurWindowIsStatic(session.motionBlur, absFrameIndex, session.staticFrames))) {
    session.staticDedupCount = (session.staticDedupCount ?? 0) + 1;
    session.lastFrameAbsoluteIndex = absFrameIndex;
    return {
      buffer: session.lastFrameBuffer,
      quantizedTime: quantizeTimeToFrame(time, fpsToNumber(options.fps)),
      captureTimeMs: Date.now() - startTime
    };
  }
  try {
    const plan = session.motionBlur;
    const { buffer, quantizedTime, seekMs, beforeCaptureMs, screenshotMs } = plan ? await captureAccumulatedFrame(session, frameIndex, absFrameIndex, plan) : await captureFrameSurface(session, frameIndex, time);
    const captureTimeMs = Date.now() - startTime;
    session.capturePerf.frames += 1;
    session.capturePerf.seekMs += seekMs;
    session.capturePerf.beforeCaptureMs += beforeCaptureMs;
    session.capturePerf.screenshotMs += screenshotMs;
    session.capturePerf.totalMs += captureTimeMs;
    session.capturePerf.frameMs.push(captureTimeMs);
    if (session.staticFrames) {
      session.lastFrameBuffer = buffer;
      session.lastFrameAbsoluteIndex = absFrameIndex;
    }
    return { buffer, quantizedTime, captureTimeMs };
  } catch (captureError) {
    if (session.isInitialized) {
      await captureFrameErrorDiagnostics(
        session,
        frameIndex,
        time,
        captureError instanceof Error ? captureError : new Error(String(captureError))
      );
    }
    throw captureError;
  }
}
async function captureFrame(session, frameIndex, time) {
  const { buffer, quantizedTime, captureTimeMs } = await captureFrameCore(
    session,
    frameIndex,
    time
  );
  const framePath = writeCapturedFrame(session, frameIndex, buffer);
  return { frameIndex, time: quantizedTime, path: framePath, captureTimeMs };
}
function frameFileExtension(format) {
  return format === "png" ? "png" : "jpg";
}
function writeCapturedFrame(session, fileIndex, buffer) {
  const ext = frameFileExtension(session.options.format);
  const framePath = join3(session.outputDir, `frame_${String(fileIndex).padStart(6, "0")}.${ext}`);
  writeFileSync(framePath, buffer);
  return framePath;
}
async function captureFrameToBuffer(session, frameIndex, time) {
  const { buffer, captureTimeMs } = session.captureMode === "drawelement" ? await withFrameDeadline(
    captureFrameCore(session, frameIndex, time),
    `frame ${frameIndex}`,
    DE_FRAME_TIMEOUT_MS,
    () => {
      session.deFrameTimeouts = (session.deFrameTimeouts ?? 0) + 1;
      console.log(
        `[engine] fast capture: frame ${frameIndex} \u2014 capture exceeded ${DE_FRAME_TIMEOUT_MS}ms; renderer stalled after drawElementImage (PRINFRA-488). Failing the drawElement attempt so the whole render retries via screenshot.`
      );
    }
  ) : await captureFrameCore(session, frameIndex, time);
  return { buffer, captureTimeMs };
}
async function captureFrameToBufferPipelined(session, frameIndex, time) {
  const { page, options } = session;
  const startTime = Date.now();
  if (session.staticFrames?.has(frameIndex) && session.lastEncodeResult) {
    const lastIdx = session.lastEncodeResultFrame ?? frameIndex - 1;
    let gapStatic = true;
    for (let j = lastIdx + 1; j <= frameIndex; j++) {
      if (!session.staticFrames.has(j)) {
        gapStatic = false;
        break;
      }
    }
    if (gapStatic) {
      session.staticDedupCount = (session.staticDedupCount ?? 0) + 1;
      session.capturePerf.frames += 1;
      session.lastEncodeResultFrame = frameIndex;
      return { encodeResult: session.lastEncodeResult, captureTimeMs: Date.now() - startTime };
    }
  }
  try {
    const { quantizedTime, seekMs, beforeCaptureMs } = await prepareFrameForCapture(
      session,
      frameIndex,
      time
    );
    void quantizedTime;
    if (session.clipBoundaryFrames?.has(frameIndex) && process.env.HF_FAST_CAPTURE_BOUNDARY_SS === "true") {
      throw new DrawElementCaptureError(
        frameIndex,
        "boundary screenshot requested on an injected canvas page"
      );
    }
    const { encodeResult } = await produceDrawElementFrame(
      page,
      options.width,
      options.height,
      options.quality ?? 80,
      true
    );
    const captureTimeMs = Date.now() - startTime;
    session.capturePerf.frames += 1;
    session.capturePerf.seekMs += seekMs;
    session.capturePerf.beforeCaptureMs += beforeCaptureMs;
    session.capturePerf.screenshotMs += captureTimeMs - seekMs - beforeCaptureMs;
    session.capturePerf.totalMs += captureTimeMs;
    session.capturePerf.frameMs.push(captureTimeMs);
    if (session.staticFrames) {
      session.lastEncodeResult = encodeResult;
      session.lastEncodeResultFrame = frameIndex;
    }
    return { encodeResult, captureTimeMs };
  } catch (captureError) {
    if (session.isInitialized) {
      await captureFrameErrorDiagnostics(
        session,
        frameIndex,
        time,
        captureError instanceof Error ? captureError : new Error(String(captureError))
      );
    }
    if (isRecoverableDrawElementError(captureError)) {
      session.deNcprFallbacks = (session.deNcprFallbacks ?? 0) + 1;
      const reason = isCanvasNotInitializedError(captureError) ? "drawElement canvas not initialized" : "No cached paint record";
      throw new DrawElementCaptureError(frameIndex, reason, captureError);
    }
    throw captureError;
  }
}
async function recaptureDrawElementFrameForVerify(session, frameIndex, time) {
  const { page, options } = session;
  if (!session.isInitialized) {
    throw new Error("[FrameCapture] Session not initialized");
  }
  await prepareFrameForCapture(session, frameIndex, time);
  const { encodeResult } = await produceDrawElementFrame(
    page,
    options.width,
    options.height,
    options.quality ?? 80,
    true
  );
  return encodeResult;
}
async function captureFramesBatchPipelined(session, frameIndices, times) {
  const { page, options } = session;
  if (!session.isInitialized) {
    throw new Error("[FrameCapture] Session not initialized");
  }
  assertVfxIntact(session);
  const startTime = Date.now();
  const fps = fpsToNumber(options.fps);
  const quantized = times.map((t) => quantizeTimeToFrame(t, fps));
  const { encodeResults, failedAt, error } = await produceDrawElementFrameBatch(
    page,
    quantized,
    options.width,
    options.height,
    options.quality ?? 80
  );
  for (const result of encodeResults) void result.catch(() => {
  });
  const okCount = failedAt === null ? frameIndices.length : failedAt;
  const elapsed = Date.now() - startTime;
  session.capturePerf.frames += okCount;
  session.capturePerf.screenshotMs += elapsed;
  session.capturePerf.totalMs += elapsed;
  if (okCount > 0) {
    const perFrame = elapsed / okCount;
    for (let s2 = 0; s2 < okCount; s2++) session.capturePerf.frameMs.push(perFrame);
  }
  const results = [];
  for (let i = 0; i < okCount; i++) {
    const frameIndex = frameIndices[i];
    const encodeResult = encodeResults[i];
    if (frameIndex === void 0 || !encodeResult) break;
    results.push({ frameIndex, encodeResult });
  }
  if (failedAt !== null) {
    if (isRecoverableDrawElementError(error)) {
      const reason = isCanvasNotInitializedError(error) ? "drawElement canvas not initialized" : "No cached paint record";
      session.deNcprFallbacks = (session.deNcprFallbacks ?? 0) + 1;
      throw new DrawElementCaptureError(frameIndices[failedAt] ?? failedAt, reason, error);
    } else {
      console.log(
        `[engine] fast capture: batch produce failed at frame ${frameIndices[failedAt] ?? "?"} (${error ?? "?"}); re-capturing ${frameIndices.length - failedAt} frame(s) per-frame`
      );
      for (let i = failedAt; i < frameIndices.length; i++) {
        const frameIndex = frameIndices[i];
        const time = times[i];
        if (frameIndex === void 0 || time === void 0) break;
        const { encodeResult } = await captureFrameToBufferPipelined(session, frameIndex, time);
        results.push({ frameIndex, encodeResult });
      }
    }
  }
  const last = results[results.length - 1];
  if (session.staticFrames && last) session.lastEncodeResult = last.encodeResult;
  return results;
}
async function discardWarmupCapture(session, frameIndex = 0, time = 0, innerCapture = captureFrameCore) {
  const perfBefore = { ...session.capturePerf };
  const hasDamageBefore = session.beginFrameHasDamageCount;
  const noDamageBefore = session.beginFrameNoDamageCount;
  const dedupCountBefore = session.staticDedupCount;
  const lastFrameBufferBefore = session.lastFrameBuffer;
  const lastFrameAbsoluteIndexBefore = session.lastFrameAbsoluteIndex;
  try {
    await innerCapture(session, frameIndex, time);
  } finally {
    session.capturePerf = perfBefore;
    session.beginFrameHasDamageCount = hasDamageBefore;
    session.beginFrameNoDamageCount = noDamageBefore;
    session.staticDedupCount = dedupCountBefore;
    session.lastFrameBuffer = lastFrameBufferBefore;
    session.lastFrameAbsoluteIndex = lastFrameAbsoluteIndexBefore;
  }
}
async function closeCaptureSession(session) {
  if (session.chromeMemory) {
    session.chromeMemory.stop();
    await session.chromeMemory.sampleOnce();
  }
  const reused = session.staticDedupCount ?? 0;
  if (session.staticFrames && reused > 0) {
    const captured = session.capturePerf.frames;
    const total = captured + reused;
    const pct = total > 0 ? Math.round(reused / total * 100) : 0;
    const avgTotalMs = captured > 0 ? Math.round(session.capturePerf.totalMs / captured) : 0;
    console.log(
      `[static-dedup] reused ${reused}/${total} frame(s) (${pct}%), est. ~${reused * avgTotalMs}ms saved (avg ${avgTotalMs}ms/frame)`
    );
    session.staticDedupCount = 0;
  }
  if (session.workerEncodeEnabled && session.page && !session.pageReleased) {
    cleanupDrawElementWorkerEncode(session.page);
  }
  if (!session.pageReleased && session.page) {
    const pageClosed = await waitForCloseWithTimeout(session.page.close());
    if (!pageClosed) {
      console.warn("[FrameCapture] Timed out closing page; forcing browser process shutdown");
      if (session.browserLease) session.browserLease.forceRelease();
      else forceReleaseBrowser(session.browser);
      session.browserReleased = true;
    }
    session.pageReleased = true;
  }
  if (!session.browserReleased && session.browser) {
    const browserClosed = await waitForCloseWithTimeout(
      session.browserLease?.release() ?? releaseBrowser(session.browser, session.config)
    );
    if (!browserClosed) {
      console.warn("[FrameCapture] Timed out closing browser; forcing browser process shutdown");
      if (session.browserLease) session.browserLease.forceRelease();
      else forceReleaseBrowser(session.browser);
    }
    session.browserReleased = true;
  }
  session.isInitialized = false;
}
function prepareCaptureSessionForReuse(session, outputDir, onBeforeCapture) {
  if (!existsSync3(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  session.outputDir = outputDir;
  session.onBeforeCapture = onBeforeCapture;
  session.capturePerf = {
    frames: 0,
    seekMs: 0,
    beforeCaptureMs: 0,
    screenshotMs: 0,
    totalMs: 0,
    frameMs: []
  };
  session.beginFrameHasDamageCount = 0;
  session.beginFrameNoDamageCount = 0;
  session.lastFrameBuffer = void 0;
  session.lastFrameAbsoluteIndex = void 0;
  session.staticDedupCount = 0;
}
async function getCompositionDuration(session) {
  if (!session.isInitialized) throw new Error("[FrameCapture] Session not initialized");
  return session.page.evaluate(() => {
    return window.__hf?.duration ?? 0;
  });
}
function computeDeVerifySampleFractions(k) {
  if (k <= 0) return [];
  if (k === 1) return [0.95];
  return [...Array.from({ length: k - 1 }, (_, i) => (i + 1) / k), 0.95];
}
async function captureDeVerificationFrames(session, page, logInitPhase) {
  const kRaw = Number(process.env.HF_DE_VERIFY ?? session.options.deVerifySamples ?? "4");
  const k = Number.isFinite(kRaw) ? Math.max(0, Math.min(8, Math.floor(kRaw))) : 4;
  if (k === 0 || process.env.HF_FORCE_DRAWELEMENT === "1") return;
  if (session.options.format === "png") return;
  const fps = fpsToNumber(session.options.fps);
  const duration = session.options.compositionDurationSeconds ?? await page.evaluate(
    () => window.__hf?.duration ?? 0
  );
  const totalFrames = Math.floor(duration * fps);
  if (totalFrames < 10) return;
  if (duration > 3600) {
    logInitPhase(`drawElement self-verify skipped: implausible duration ${duration}s`);
    return;
  }
  if (!session.onBeforeCapture) {
    const hasVideos = await page.evaluate(() => document.querySelector("video") !== null);
    if (hasVideos) {
      logInitPhase("drawElement self-verify skipped: video comp without frame injector");
      return;
    }
  }
  const boundary = await computeClipBoundaryFrames(page, fps);
  const fractions = computeDeVerifySampleFractions(k);
  const seekTo = async (t) => {
    await page.evaluate((tt) => {
      const hf = window.__hf;
      if (hf && typeof hf.seek === "function") hf.seek(tt, { suppressEvents: true });
    }, t);
  };
  await seekTo(quantizeTimeToFrame(0, fps));
  await pageScreenshotCapture(page, session.options);
  const frames = /* @__PURE__ */ new Map();
  for (const f of fractions) {
    let idx = Math.min(totalFrames - 1, Math.max(1, Math.round(totalFrames * f)));
    let guard = 0;
    while (boundary.has(idx) && guard++ < 6) idx = Math.min(totalFrames - 1, idx + 2);
    if (boundary.has(idx)) continue;
    if (frames.has(idx)) continue;
    const t = quantizeTimeToFrame(idx / fps, fps);
    await seekTo(t);
    if (session.onBeforeCapture) await session.onBeforeCapture(page, t);
    await pageScreenshotCapture(page, session.options);
    frames.set(idx, await pageScreenshotCapture(page, session.options));
  }
  await seekTo(quantizeTimeToFrame(0, fps));
  session.deVerifyFrames = frames;
  logInitPhase(
    `drawElement self-verify armed: ${frames.size} ground-truth frame(s) @ [${[...frames.keys()].join(", ")}] of ${totalFrames}`
  );
}
function medianOf(samples) {
  if (samples.length === 0) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  return Math.round(sorted[Math.floor(sorted.length / 2)] ?? 0);
}
function percentileOf(samples, p) {
  if (samples.length === 0) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(p * sorted.length)));
  return Math.round(sorted[idx] ?? 0);
}
var DE_FALLBACK_RATIO_WARN_THRESHOLD = 0.5;
function getCapturePerfSummary(session) {
  const frames = Math.max(1, session.capturePerf.frames);
  const ncprFallbacks = session.deNcprFallbacks ?? 0;
  if (frames > 0 && ncprFallbacks / frames > DE_FALLBACK_RATIO_WARN_THRESHOLD) {
    const pct = Math.round(ncprFallbacks / frames * 100);
    console.warn(
      `[engine] fast capture: ${ncprFallbacks}/${frames} frame(s) (${pct}%) rejected due to missing canvas/paint records; fresh screenshot capture required.`
    );
  }
  return {
    frames: session.capturePerf.frames,
    avgTotalMs: Math.round(session.capturePerf.totalMs / frames),
    avgSeekMs: Math.round(session.capturePerf.seekMs / frames),
    avgBeforeCaptureMs: Math.round(session.capturePerf.beforeCaptureMs / frames),
    avgScreenshotMs: Math.round(session.capturePerf.screenshotMs / frames),
    p50TotalMs: medianOf(session.capturePerf.frameMs),
    p95TotalMs: percentileOf(session.capturePerf.frameMs, 0.95),
    p99TotalMs: percentileOf(session.capturePerf.frameMs, 0.99),
    subTimelineWaitOutcome: session.subTimelineWaitOutcome,
    initDurationMs: session.initTelemetry?.initDurationMs,
    initTweenCount: session.initTelemetry?.tweenCount,
    initElementCount: session.initTelemetry?.elementCount,
    warnings: cloneCaptureWarnings(session.warnings),
    staticDedupReused: session.staticDedupCount ?? 0,
    staticDedupEnabled: session.staticDedupEnabled ?? false,
    // armed ⟺ a non-empty static set survived verification.
    staticDedupArmed: (session.staticFrames?.size ?? 0) > 0,
    staticDedupPredicted: session.staticDedupPredictedCount ?? 0,
    staticDedupVerified: session.staticFrames?.size ?? 0,
    staticDedupVerificationOutcome: session.staticDedupVerification?.outcome,
    staticDedupVerificationPlannedRuns: session.staticDedupVerification?.stats.plannedRuns,
    staticDedupVerificationCompletedRuns: session.staticDedupVerification?.stats.completedRuns,
    staticDedupVerificationScreenshots: session.staticDedupVerification?.stats.screenshots,
    staticDedupVerificationSeeks: session.staticDedupVerification?.stats.seeks,
    staticDedupVerificationComparisons: session.staticDedupVerification?.stats.byteComparisons,
    staticDedupVerificationElapsedMs: session.staticDedupVerification?.stats.elapsedMs,
    staticDedupSkipReason: session.staticDedupSkipReason,
    beginFrameNoDamage: session.beginFrameNoDamageCount,
    beginFrameHasDamage: session.beginFrameHasDamageCount,
    captureMode: session.captureMode,
    gpuRenderer: session.gpuRenderer,
    chromeBrowserRssPeakMb: session.chromeMemory?.stats().browserRssPeakMb,
    chromeRendererRssPeakMb: session.chromeMemory?.stats().rendererRssPeakMb,
    chromeRssLastMb: session.chromeMemory?.stats().rssLastMb,
    chromeGpuProcessSeenLastSample: session.chromeMemory?.stats().gpuProcessSeenLastSample,
    chromeMemorySamples: session.chromeMemory?.stats().samples,
    deGateReason: session.deGateReason,
    deFallbackTrigger: session.deFallbackTrigger,
    deWorkerEncode: session.workerEncodeEnabled ?? false,
    deVerifyArmed: session.deVerifyFrames?.size ?? 0,
    deVerifyInitMs: session.deVerifyInitMs ?? 0,
    deBoundaryFrames: session.clipBoundaryFrames?.size ?? 0,
    deNcprFallbacks: ncprFallbacks,
    deFrameTimeouts: session.deFrameTimeouts ?? 0
  };
}

// ../engine/src/services/chunkEncoder.ts
import {
  closeSync,
  copyFileSync,
  existsSync as existsSync4,
  ftruncateSync,
  mkdirSync as mkdirSync2,
  mkdtempSync,
  openSync,
  readFileSync as readFileSync3,
  readdirSync as readdirSync2,
  statSync as statSync2,
  writeFileSync as writeFileSync2,
  writeSync
} from "fs";
import { join as join5, dirname as dirname2, extname } from "path";

// ../engine/src/utils/gpuEncoder.ts
import { spawn } from "child_process";

// ../engine/src/utils/managedChildProcess.ts
var DEFAULT_TERMINATION_GRACE_MS = 2e3;
var DEFAULT_STDERR_MAX_BYTES = 64 * 1024;
var ManagedChildProcess = class {
  constructor(child, options = {}) {
    this.child = child;
    this.options = options;
    this.now = options.now ?? Date.now;
    this.startedAtMs = this.now();
    this.outcomePromise = new Promise((resolve) => {
      this.resolveOutcome = resolve;
    });
    child.stderr?.on("data", this.onStderr);
    child.once("spawn", this.onSpawn);
    child.once("close", this.onClose);
    child.on("error", this.onError);
    this.installAbort();
    this.installDeadline();
    this.markActivity();
  }
  child;
  options;
  startedAtMs;
  now;
  outcomePromise;
  resolveOutcome;
  requestedReason = null;
  stderrTail = Buffer.alloc(0);
  spawned = false;
  settled = false;
  deadlineTimer = null;
  inactivityTimer = null;
  escalationTimer = null;
  wait() {
    return this.outcomePromise;
  }
  get isSettled() {
    return this.settled;
  }
  markActivity() {
    if (this.settled || this.options.inactivityTimeoutMs === void 0) return;
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(
      () => this.requestTermination("inactivity"),
      Math.max(0, this.options.inactivityTimeoutMs)
    );
    this.inactivityTimer.unref?.();
  }
  onStderr = (data) => {
    const chunk = Buffer.isBuffer(data) ? data : Buffer.from(data);
    const maxBytes = this.options.stderrMaxBytes ?? DEFAULT_STDERR_MAX_BYTES;
    this.stderrTail = Buffer.concat([this.stderrTail, chunk]);
    if (this.stderrTail.byteLength > maxBytes) {
      this.stderrTail = this.stderrTail.subarray(this.stderrTail.byteLength - maxBytes);
    }
    this.options.onStderr?.(chunk.toString());
  };
  onSpawn = () => {
    this.spawned = true;
  };
  onClose = (exitCode, signal) => {
    this.settle({
      reason: this.requestedReason ?? "exit",
      exitCode,
      signal,
      stderr: this.stderrTail.toString(),
      durationMs: this.now() - this.startedAtMs
    });
  };
  onError = (error) => {
    if (this.spawned) return;
    this.settle({
      reason: "spawn_error",
      exitCode: null,
      signal: null,
      stderr: this.stderrTail.length > 0 ? this.stderrTail.toString() : error.message,
      durationMs: this.now() - this.startedAtMs,
      error
    });
  };
  installAbort() {
    const signal = this.options.signal;
    if (!signal) return;
    if (signal.aborted) {
      this.requestTermination("abort");
      return;
    }
    signal.addEventListener("abort", this.onAbort, { once: true });
  }
  onAbort = () => {
    this.requestTermination("abort");
  };
  installDeadline() {
    if (this.options.deadlineAtMs === void 0) return;
    const remainingMs = Math.max(0, this.options.deadlineAtMs - this.now());
    this.deadlineTimer = setTimeout(() => this.requestTermination("deadline"), remainingMs);
    this.deadlineTimer.unref?.();
  }
  requestTermination(reason) {
    if (this.settled || this.requestedReason) return;
    this.requestedReason = reason;
    try {
      this.child.kill("SIGTERM");
    } catch {
    }
    const graceMs = this.options.terminationGraceMs ?? DEFAULT_TERMINATION_GRACE_MS;
    this.escalationTimer = setTimeout(
      () => {
        if (this.settled) return;
        try {
          this.child.kill("SIGKILL");
        } catch {
        }
      },
      Math.max(0, graceMs)
    );
    this.escalationTimer.unref?.();
  }
  settle(outcome) {
    if (this.settled) return;
    this.settled = true;
    this.clearTimers();
    this.options.signal?.removeEventListener("abort", this.onAbort);
    this.child.stderr?.off("data", this.onStderr);
    this.child.off("spawn", this.onSpawn);
    this.child.off("close", this.onClose);
    this.child.off("error", this.onError);
    this.resolveOutcome(outcome);
  }
  clearTimers() {
    if (this.deadlineTimer) clearTimeout(this.deadlineTimer);
    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    if (this.escalationTimer) clearTimeout(this.escalationTimer);
    this.deadlineTimer = null;
    this.inactivityTimer = null;
    this.escalationTimer = null;
  }
};

// ../engine/src/utils/processTracker.ts
var tracked = /* @__PURE__ */ new Set();
function trackChildProcess(proc) {
  tracked.add(proc);
  const remove = () => tracked.delete(proc);
  proc.once("exit", remove);
  proc.once("close", remove);
}
function killTrackedProcesses() {
  const alive = [];
  for (const proc of tracked) {
    if (!proc.killed) {
      try {
        proc.kill("SIGTERM");
        alive.push(proc);
      } catch {
      }
    }
  }
  tracked.clear();
  if (alive.length === 0) return;
  setTimeout(() => {
    for (const proc of alive) {
      try {
        proc.kill("SIGKILL");
      } catch {
      }
    }
  }, 500).unref();
}

// ../engine/src/utils/gpuEncoder.ts
var GPU_ENCODER_CANDIDATES = [
  "nvenc",
  "videotoolbox",
  "vaapi",
  "qsv",
  "amf"
];
var H264_ENCODER_BY_GPU = {
  nvenc: "h264_nvenc",
  videotoolbox: "h264_videotoolbox",
  vaapi: "h264_vaapi",
  qsv: "h264_qsv",
  amf: "h264_amf"
};
var GPU_PROBE_TIMEOUT_MS = 2e3;
var GPU_PROBE_KILL_GRACE_MS = 1e3;
function getCompiledGpuEncoders(ffmpegEncodersStdout) {
  return GPU_ENCODER_CANDIDATES.filter(
    (encoder) => ffmpegEncodersStdout.includes(H264_ENCODER_BY_GPU[encoder])
  );
}
async function selectUsableGpuEncoder(candidates, isUsable) {
  const results = await Promise.all(
    candidates.map(async (encoder) => {
      try {
        return { encoder, usable: await isUsable(encoder) };
      } catch {
        return { encoder, usable: false };
      }
    })
  );
  for (const result of results) {
    if (result.usable) {
      return result.encoder;
    }
  }
  return null;
}
async function detectGpuEncoder() {
  const ffmpeg = spawn(getFfmpegBinary(), ["-encoders"], {
    stdio: ["pipe", "pipe", "pipe"],
    // See runFfmpeg.ts: keeps a console window off the user's desktop on Windows.
    windowsHide: true
  });
  trackChildProcess(ffmpeg);
  let stdout = "";
  ffmpeg.stdout.on("data", (data) => {
    stdout += data.toString();
  });
  const outcome = await new ManagedChildProcess(ffmpeg, {
    deadlineAtMs: Date.now() + 3e4
  }).wait();
  if (outcome.reason !== "exit" || outcome.exitCode !== 0) return null;
  const candidates = getCompiledGpuEncoders(stdout);
  return selectUsableGpuEncoder(candidates, canUseGpuEncoder).catch(() => null);
}
var cachedGpuEncoder = void 0;
async function getCachedGpuEncoder() {
  if (cachedGpuEncoder === void 0) {
    cachedGpuEncoder = await detectGpuEncoder();
  }
  return cachedGpuEncoder;
}
function getGpuEncoderName(encoder, codec) {
  if (!encoder) return codec === "h264" ? "libx264" : "libx265";
  switch (encoder) {
    case "nvenc":
      return codec === "h264" ? "h264_nvenc" : "hevc_nvenc";
    case "videotoolbox":
      return codec === "h264" ? "h264_videotoolbox" : "hevc_videotoolbox";
    case "vaapi":
      return codec === "h264" ? "h264_vaapi" : "hevc_vaapi";
    case "qsv":
      return codec === "h264" ? "h264_qsv" : "hevc_qsv";
    case "amf":
      return codec === "h264" ? "h264_amf" : "hevc_amf";
    default:
      return codec === "h264" ? "libx264" : "libx265";
  }
}
function buildVideoToolboxRateControlArgs(input) {
  if (input.bitrate) return ["-b:v", input.bitrate, "-allow_sw", "1"];
  const bitsPerPixel = input.quality <= 15 ? 0.24 : input.quality <= 18 ? 0.16 : 0.08;
  const megabitsPerSecond = Math.max(
    1,
    Math.round(input.width * input.height * input.fps * bitsPerPixel / 1e6)
  );
  return ["-b:v", `${megabitsPerSecond}M`, "-allow_sw", "1"];
}
var GPU_PROBE_WIDTH = 320;
var GPU_PROBE_HEIGHT = 240;
function getProbeArgs(encoder) {
  const args = [
    "-hide_banner",
    "-loglevel",
    "error",
    "-f",
    "lavfi",
    "-i",
    `color=size=${GPU_PROBE_WIDTH}x${GPU_PROBE_HEIGHT}:rate=1:duration=1`,
    "-frames:v",
    "1",
    "-an"
  ];
  if (encoder === "vaapi") {
    args.push("-vaapi_device", "/dev/dri/renderD128", "-vf", "format=nv12,hwupload");
  }
  args.push("-c:v", getGpuEncoderName(encoder, "h264"));
  if (encoder === "videotoolbox") {
    args.push(
      ...buildVideoToolboxRateControlArgs({
        width: GPU_PROBE_WIDTH,
        height: GPU_PROBE_HEIGHT,
        fps: 1,
        quality: 23
      })
    );
  }
  if (encoder === "amf") {
    args.push("-rc", "cqp", "-qp_i", "28", "-qp_p", "28");
  }
  args.push("-f", "null", "-");
  return args;
}
async function canUseGpuEncoder(encoder) {
  const ffmpeg = spawn(getFfmpegBinary(), getProbeArgs(encoder), {
    stdio: ["ignore", "ignore", "pipe"],
    windowsHide: true
  });
  trackChildProcess(ffmpeg);
  const outcome = await new ManagedChildProcess(ffmpeg, {
    deadlineAtMs: Date.now() + GPU_PROBE_TIMEOUT_MS,
    terminationGraceMs: GPU_PROBE_KILL_GRACE_MS
  }).wait();
  const usable = outcome.reason === "exit" && outcome.exitCode === 0;
  logGpuProbeFailure(encoder, {
    code: outcome.exitCode,
    signal: outcome.signal,
    stderr: outcome.stderr,
    error: outcome.error,
    timedOut: outcome.reason === "deadline"
  });
  return usable;
}
function logGpuProbeFailure(encoder, result) {
  if (!isGpuProbeDebugEnabled()) return;
  if (result.code === 0 && !result.error && !result.timedOut) return;
  const reason = result.error ? result.error.message : result.timedOut ? `timed out after ${GPU_PROBE_TIMEOUT_MS}ms` : `exit=${String(result.code)} signal=${String(result.signal ?? "")}`;
  const stderr = result.stderr?.trim();
  console.warn(`[gpuEncoder] ${encoder} probe failed: ${reason}${stderr ? `
${stderr}` : ""}`);
}
function isGpuProbeDebugEnabled() {
  const value = process.env.HYPERFRAMES_DEBUG_GPU_PROBE;
  return value === "1" || value === "true";
}
var NVENC_PRESET_MAP = {
  ultrafast: "p1",
  superfast: "p1",
  veryfast: "p2",
  faster: "p3",
  fast: "p4",
  medium: "p4",
  slow: "p5",
  slower: "p6",
  veryslow: "p7",
  placebo: "p7"
};
var QSV_PRESET_MAP = {
  ultrafast: "veryfast",
  superfast: "veryfast",
  placebo: "veryslow"
};
function mapPresetForGpuEncoder(encoder, preset) {
  switch (encoder) {
    case "nvenc":
      if (/^p[1-7]$/.test(preset)) return preset;
      return NVENC_PRESET_MAP[preset] ?? "p4";
    case "qsv":
      return QSV_PRESET_MAP[preset] ?? preset;
    default:
      return preset;
  }
}

// ../engine/src/utils/hdr.ts
function isHdrColorSpace(cs) {
  if (!cs) return false;
  return cs.colorTransfer === "smpte2084" || cs.colorTransfer === "arib-std-b67";
}
function detectTransfer(cs) {
  if (cs?.colorTransfer === "smpte2084") return "pq";
  return "hlg";
}
var DEFAULT_HDR10_MASTERING = {
  masterDisplay: "G(13250,34500)B(7500,3000)R(34000,16000)WP(15635,16450)L(10000000,1)",
  maxCll: "1000,400"
};
function getHdrEncoderColorParams(transfer, mastering = DEFAULT_HDR10_MASTERING) {
  const colorTrc = transfer === "pq" ? "smpte2084" : "arib-std-b67";
  const tagging = `colorprim=bt2020:transfer=${colorTrc}:colormatrix=bt2020nc`;
  const metadata = `master-display=${mastering.masterDisplay}:max-cll=${mastering.maxCll}`;
  return {
    colorPrimaries: "bt2020",
    colorTrc,
    colorspace: "bt2020nc",
    pixelFormat: "yuv420p10le",
    x265ColorParams: `${tagging}:${metadata}`,
    mastering
  };
}
var HDR_AUTO_PROMOTION_PIPELINE = {
  colorSpace: "BT.2020",
  codec: "HEVC Main10"
};
function sanitizeHdrAutoPromotionAsset(asset) {
  return asset.split(/[\r\n?#]/, 1)[0] ?? "";
}
function findHdrAutoPromotion(sources) {
  const source = sources.find(({ colorSpace }) => isHdrColorSpace(colorSpace));
  return source ? {
    triggeringAsset: sanitizeHdrAutoPromotionAsset(source.asset),
    output: HDR_AUTO_PROMOTION_PIPELINE
  } : null;
}
function formatHdrAutoPromotionWarning(promotion) {
  return `[Render] HDR auto-promotion triggered by "${promotion.triggeringAsset}" \u2014 output: ${promotion.output.colorSpace} / ${promotion.output.codec}`;
}
function analyzeCompositionHdr(colorSpaces) {
  let hasPq = false;
  let hasHdr = false;
  for (const cs of colorSpaces) {
    if (!isHdrColorSpace(cs)) continue;
    hasHdr = true;
    if (cs?.colorTransfer === "smpte2084") hasPq = true;
  }
  if (!hasHdr) return { hasHdr: false, dominantTransfer: null };
  const dominantTransfer = hasPq ? "pq" : "hlg";
  return { hasHdr: true, dominantTransfer };
}

// ../engine/src/utils/evenDimensions.ts
var EVEN_DIMENSION_PAD = "pad=ceil(iw/2)*2:ceil(ih/2)*2";
function requiresEvenDimensions(pixelFormat) {
  return pixelFormat.startsWith("yuv420") || pixelFormat.startsWith("yuvj420");
}
function withEvenDimensionPad(vfChain, pixelFormat, width, height) {
  if (!requiresEvenDimensions(pixelFormat)) return vfChain;
  if (width !== void 0 && height !== void 0 && width % 2 === 0 && height % 2 === 0) {
    return vfChain;
  }
  return vfChain ? `${vfChain},${EVEN_DIMENSION_PAD}` : EVEN_DIMENSION_PAD;
}

// ../engine/src/utils/sdrCaptureColor.ts
var SDR_RGB_TO_BT709_FILTER = "scale=out_color_matrix=bt709:out_range=tv:flags=neighbor";
var SDR_CAPTURE_TO_BT709_FILTER = `scale=in_color_matrix=bt601:in_range=pc:flags=neighbor,format=gbrp,${SDR_RGB_TO_BT709_FILTER}`;

// ../engine/src/utils/runFfmpeg.ts
import { spawn as spawn2 } from "child_process";
var FFMPEG_SIGTERM_EXIT_LINE = /^Exiting normally, received signal 15\.?\r?$/m;
function isExternalFfmpegInterruption(result) {
  if (result.terminationReason !== "exit" || result.exitCode === 0) return false;
  if (result.signal === "SIGTERM") return true;
  return result.exitCode === 255 && FFMPEG_SIGTERM_EXIT_LINE.test(result.stderr);
}
function ffmpegStatsReader(onStats) {
  let rest = "";
  return (chunk) => {
    const lines = (rest + chunk).split(/[\r\n]/);
    rest = lines.pop() ?? "";
    for (const line of lines) {
      const frame = /frame=\s*(\d+)/.exec(line)?.[1];
      const time = /time=\s*(\d+):(\d+):(\d+(?:\.\d+)?)/.exec(line);
      if (frame === void 0 && !time) continue;
      onStats({
        frames: frame === void 0 ? void 0 : Number(frame),
        seconds: time ? Math.round((Number(time[1]) * 3600 + Number(time[2]) * 60 + Number(time[3])) * 100) / 100 : void 0
      });
    }
  };
}
var DEFAULT_TIMEOUT = 3e5;
var DEFAULT_STDERR_TAIL_LINES = 15;
function formatWindowsFfmpegExit(exitCode) {
  if (process.platform !== "win32" || exitCode === null) return void 0;
  if (exitCode === 3221225781 || exitCode === -1073741515) {
    const ffmpegPath = getFfmpegBinary();
    return `[FFmpeg] Windows could not start "${ffmpegPath}": 0xC0000135 (STATUS_DLL_NOT_FOUND). A required DLL could not be loaded. Install a working 64-bit Windows FFmpeg build with all required runtime DLLs.`;
  }
  if (exitCode === 3221225595 || exitCode === -1073741701) {
    return "[FFmpeg] Windows could not start ffmpeg.exe (STATUS_INVALID_IMAGE_FORMAT). The binary may be corrupted or the wrong architecture. Reinstall a 64-bit Windows FFmpeg build.";
  }
  if (exitCode === 3221225794 || exitCode === -1073741502) {
    return "[FFmpeg] Windows failed while initializing ffmpeg.exe. The binary may be corrupted, blocked, or missing runtime DLLs. Reinstall a 64-bit Windows FFmpeg build.";
  }
  return void 0;
}
function formatFfmpegError(exitCode, stderr, tailLines = DEFAULT_STDERR_TAIL_LINES) {
  const tail = (stderr ?? "").split(/\r?\n/).filter((line) => line.length > 0).slice(-tailLines).join("\n");
  if (exitCode === null) {
    return tail ? `[FFmpeg] ${tail}` : "[FFmpeg] process error";
  }
  const windowsMessage = formatWindowsFfmpegExit(exitCode);
  if (windowsMessage) {
    return tail ? `${windowsMessage}
ffmpeg stderr (tail):
${tail}` : windowsMessage;
  }
  return tail ? `FFmpeg exited with code ${exitCode}
ffmpeg stderr (tail):
${tail}` : `FFmpeg exited with code ${exitCode}`;
}
function spawnFfmpeg(args) {
  const ffmpeg = spawn2(getFfmpegBinary(), args.map(ffmpegPathArgument), {
    windowsHide: true
  });
  trackChildProcess(ffmpeg);
  return ffmpeg;
}
function succeeded(outcome) {
  return outcome.reason === "exit" && outcome.exitCode === 0;
}
function toResult(outcome, stderr = outcome.stderr) {
  const result = {
    success: succeeded(outcome),
    exitCode: outcome.exitCode,
    signal: outcome.signal,
    stderr,
    durationMs: outcome.durationMs,
    terminationReason: outcome.reason,
    error: outcome.error
  };
  if (isExternalFfmpegInterruption(result)) {
    result.failureReason = "external_interruption";
  }
  return result;
}
async function runFfmpeg(args, opts) {
  const timeout = opts?.timeout ?? DEFAULT_TIMEOUT;
  const managed = new ManagedChildProcess(spawnFfmpeg(args), {
    signal: opts?.signal,
    deadlineAtMs: Date.now() + timeout,
    onStderr: opts?.onStderr
  });
  return toResult(await managed.wait());
}
async function runFfmpegPipeline(producerArgs, consumerArgs, opts) {
  const deadlineAtMs = Date.now() + (opts?.timeout ?? DEFAULT_TIMEOUT);
  const producer = spawnFfmpeg(producerArgs);
  const consumer = spawnFfmpeg(consumerArgs);
  consumer.stdin?.on("error", () => {
  });
  for (const event of ["close", "error"]) {
    consumer.once(event, () => producer.stdout?.destroy());
    producer.once(event, () => consumer.stdin?.end());
  }
  if (consumer.stdin) producer.stdout?.pipe(consumer.stdin);
  const settleOrder = [];
  const outcomes = await Promise.all(
    [producer, consumer].map(
      (child) => new ManagedChildProcess(child, {
        signal: opts?.signal,
        deadlineAtMs,
        onStderr: opts?.onStderr
      }).wait().then((outcome) => {
        settleOrder.push(outcome);
        return outcome;
      })
    )
  );
  const reported = settleOrder.find((outcome) => !succeeded(outcome)) ?? outcomes[1];
  const stderr = [...outcomes.filter((outcome) => outcome !== reported), reported].map((outcome) => outcome.stderr).join("");
  return toResult(reported, stderr);
}

// ../engine/src/utils/ffprobe.ts
import { spawn as spawn3 } from "child_process";
import { createReadStream, readFileSync, statSync } from "fs";
import { StringDecoder } from "string_decoder";
import { basename } from "path";
var FFPROBE_STDERR_MAX_BYTES = 8 * 1024;
var FFPROBE_STDOUT_MAX_CHARS = 8e6;
var FFPROBE_ERROR_MAX_CHARS = 4 * 1024;
function redactFfprobeInput(stderr, filePath) {
  if (!filePath) return stderr;
  let redacted = stderr.split(filePath).join("[input]");
  const inputBasename = basename(filePath);
  if (inputBasename) redacted = redacted.split(inputBasename).join("[input]");
  if (!redacted.startsWith("[input]")) {
    for (let offset = 1; offset < filePath.length; offset += 1) {
      const suffix = filePath.slice(offset);
      if (suffix.length < 4 || !redacted.startsWith(suffix)) continue;
      const boundary = redacted[suffix.length];
      if (boundary !== void 0 && !/[\s:'")\]}]/.test(boundary)) continue;
      redacted = `[input]${redacted.slice(suffix.length)}`;
      break;
    }
  }
  return redacted;
}
function sanitizeFfprobeDiagnostic(stderr, filePath) {
  const stderrWithoutInput = redactFfprobeInput(stderr, filePath);
  const redacted = redactTelemetryString(stderrWithoutInput, FFPROBE_STDERR_MAX_BYTES);
  if (redacted.length <= FFPROBE_ERROR_MAX_CHARS) return redacted;
  return `\u2026${redacted.slice(-(FFPROBE_ERROR_MAX_CHARS - 1))}`;
}
async function runFfprobe(filePath, argsWithoutInput, signal, stdoutOptions) {
  if (filePath === "-") {
    throw new Error('[FFmpeg] Refusing to probe "-": stdin is not a supported input path.');
  }
  const command = getFfprobeBinary();
  const proc = spawn3(command, ["-v", "error", ...argsWithoutInput, "--", filePath], {
    // Nothing is ever written to the child's stdin; leaving it as a pipe is
    // what lets a stdin-reading invocation block indefinitely.
    stdio: ["ignore", "pipe", "pipe"],
    // See runFfmpeg.ts: keeps a console window off the user's desktop on Windows.
    windowsHide: true
  });
  trackChildProcess(proc);
  const decoder = new StringDecoder("utf8");
  let stdout = "";
  let stdoutTruncated = false;
  const stdoutMaxChars = stdoutOptions?.maxChars ?? FFPROBE_STDOUT_MAX_CHARS;
  proc.stdout.on("data", (data) => {
    if (stdoutTruncated) return;
    stdout += decoder.write(data);
    if (stdout.length > stdoutMaxChars) {
      if (stdoutOptions?.retainTail) {
        stdout = stdout.slice(-stdoutMaxChars);
      } else {
        stdoutTruncated = true;
        stdout = "";
      }
    }
  });
  const managed = new ManagedChildProcess(proc, {
    signal,
    deadlineAtMs: Date.now() + 3e4,
    stderrMaxBytes: FFPROBE_STDERR_MAX_BYTES
  });
  const outcome = await managed.wait();
  stdout += decoder.end();
  if (stdoutTruncated) {
    throw new Error(
      `[FFmpeg] ffprobe output exceeded ${stdoutMaxChars} characters; refusing to parse a truncated result.`
    );
  }
  if (outcome.reason === "spawn_error") {
    if (outcome.error?.code === "ENOENT") {
      const configured = process.env[FFPROBE_PATH_ENV]?.trim();
      throw new Error(
        configured ? `[FFmpeg] ffprobe not found at ${FFPROBE_PATH_ENV}="${configured}". Please install FFmpeg.` : "[FFmpeg] ffprobe not found. Please install FFmpeg."
      );
    }
    throw outcome.error ?? new Error(outcome.stderr);
  }
  if (outcome.reason !== "exit" || outcome.exitCode !== 0) {
    const diagnostic = sanitizeFfprobeDiagnostic(outcome.stderr, filePath);
    throw new Error(
      `[FFmpeg] ffprobe ${outcome.reason} with code ${outcome.exitCode}: ${diagnostic}`
    );
  }
  return stdout;
}
function parseProbeJson(stdout) {
  try {
    return JSON.parse(stdout);
  } catch (e) {
    throw new Error(
      `[FFmpeg] Failed to parse ffprobe output: ${e instanceof Error ? e.message : e}`
    );
  }
}
var videoMetadataCache = /* @__PURE__ */ new Map();
var finalVideoFrameTimestampCache = /* @__PURE__ */ new Map();
var finalVideoFrameTimestampSignalCaches = /* @__PURE__ */ new WeakMap();
var audioMetadataCache = /* @__PURE__ */ new Map();
var mediaProbeOutputCache = /* @__PURE__ */ new Map();
var mediaProbeOutputSignalCaches = /* @__PURE__ */ new WeakMap();
var MEDIA_PROBE_OUTPUT_CACHE_MAX_ENTRIES = 128;
var AAC_LC_SAMPLES_PER_PACKET = 1024;
var STILL_IMAGE_DEMUXERS = /* @__PURE__ */ new Set([
  "apng",
  "bmp_pipe",
  "dds_pipe",
  "dpx_pipe",
  "exr_pipe",
  "gif",
  "ico",
  "image2",
  "image2pipe",
  "jpeg_pipe",
  "jxl_pipe",
  "png_pipe",
  "qdraw_pipe",
  "sgi_pipe",
  "svg_pipe",
  "tiff_pipe",
  "webp_pipe"
]);
async function hasAvifFileBrand(filePath) {
  try {
    const chunks = [];
    for await (const chunk of createReadStream(filePath, { start: 0, end: 4095 })) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const bytes = Buffer.concat(chunks);
    if (bytes.length < 16 || bytes.toString("ascii", 4, 8) !== "ftyp") return false;
    const boxSize = bytes.readUInt32BE(0);
    if (boxSize < 16 || boxSize > bytes.length) return false;
    const avifBrands = /* @__PURE__ */ new Set(["avif", "avis"]);
    if (avifBrands.has(bytes.toString("ascii", 8, 12))) return true;
    for (let offset = 16; offset + 4 <= boxSize; offset += 4) {
      if (avifBrands.has(bytes.toString("ascii", offset, offset + 4))) return true;
    }
    return false;
  } catch {
    return false;
  }
}
async function isStillImageVisual(output, filePath) {
  const formatNames = (output.format.format_name ?? "").split(",").map((name) => name.trim().toLowerCase()).filter(Boolean);
  return formatNames.some((name) => STILL_IMAGE_DEMUXERS.has(name)) || await hasAvifFileBrand(filePath);
}
function isPngImageProbe(output) {
  const formatNames = (output.format.format_name ?? "").split(",").map((name) => name.trim().toLowerCase());
  return formatNames.includes("png_pipe") || output.streams.some(
    (stream) => stream.codec_type === "video" && stream.codec_name?.toLowerCase() === "png"
  );
}
function mediaFileIdentity(filePath) {
  try {
    const stat = statSync(filePath, { bigint: true });
    return [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(":");
  } catch {
    return null;
  }
}
async function probeMediaOutput(filePath, signal) {
  let cache = mediaProbeOutputCache;
  if (signal) {
    cache = mediaProbeOutputSignalCaches.get(signal) ?? /* @__PURE__ */ new Map();
    mediaProbeOutputSignalCaches.set(signal, cache);
  }
  const identity = mediaFileIdentity(filePath);
  const cached = cache.get(filePath);
  if (identity !== null && cached?.identity === identity) {
    if (!signal) {
      cache.delete(filePath);
      cache.set(filePath, cached);
    }
    return cached.promise;
  }
  const promise = runFfprobe(
    filePath,
    ["-print_format", "json", "-show_format", "-show_streams"],
    signal
  ).then(parseProbeJson);
  if (identity !== null) {
    cache.set(filePath, { identity, promise });
    if (!signal && cache.size > MEDIA_PROBE_OUTPUT_CACHE_MAX_ENTRIES) {
      const oldestPath = cache.keys().next().value;
      if (oldestPath !== void 0) cache.delete(oldestPath);
    }
  }
  promise.catch(() => {
    if (cache.get(filePath)?.promise === promise) {
      cache.delete(filePath);
    }
  });
  return promise;
}
var StructurallyIncompletePngError = class extends Error {
};
async function readFileRange(filePath, start, length, signal) {
  const chunks = [];
  for await (const chunk of createReadStream(filePath, {
    start,
    end: start + length - 1,
    highWaterMark: length,
    signal
  })) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
async function hasCompletePngStructure(filePath, signal) {
  try {
    signal?.throwIfAborted();
    const fileSize = statSync(filePath).size;
    const signature = await readFileRange(filePath, 0, 8, signal);
    signal?.throwIfAborted();
    if (signature.length !== 8 || !signature.equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
      return false;
    }
    let seenHeader = false;
    let seenImageData = false;
    let offset = 8;
    while (offset + 12 <= fileSize) {
      signal?.throwIfAborted();
      const chunkHeader = await readFileRange(filePath, offset, 8, signal);
      signal?.throwIfAborted();
      if (chunkHeader.length !== 8) return false;
      const chunkLength = chunkHeader.readUInt32BE(0);
      const chunkEnd = offset + 12 + chunkLength;
      if (chunkEnd > fileSize) return false;
      const chunkType = chunkHeader.toString("ascii", 4, 8);
      if (chunkType === "IHDR") seenHeader = chunkLength === 13 && offset === 8;
      if (chunkType === "IDAT") seenImageData = true;
      if (chunkType === "IEND") return seenHeader && seenImageData && chunkLength === 0;
      offset = chunkEnd;
    }
    return false;
  } catch (error) {
    if (signal?.aborted) throw signal.reason ?? error;
    return false;
  }
}
async function probeMediaProfile(filePath, options) {
  try {
    const output = await probeMediaOutput(filePath, options?.signal);
    options?.signal?.throwIfAborted();
    const videoStreams = output.streams.filter((stream) => stream.codec_type === "video");
    const hasMovingVideoStream = videoStreams.some(
      (stream) => stream.disposition?.attached_pic !== 1
    );
    const isStillImage = videoStreams.length > 0 && await isStillImageVisual(output, filePath);
    options?.signal?.throwIfAborted();
    if (isStillImage && isPngImageProbe(output) && !await hasCompletePngStructure(filePath, options?.signal)) {
      throw new StructurallyIncompletePngError("[FFmpeg] PNG input is structurally incomplete");
    }
    return {
      hasVideoStream: videoStreams.length > 0,
      hasAudioStream: output.streams.some((stream) => stream.codec_type === "audio"),
      visualKind: isStillImage ? "still" : hasMovingVideoStream ? "moving" : "none"
    };
  } catch (error) {
    if (options?.signal?.aborted) throw options.signal.reason ?? error;
    if (error instanceof StructurallyIncompletePngError) throw error;
    const stillImage = extractStillImageMetadata(filePath);
    if (stillImage && await hasCompletePngStructure(filePath, options?.signal)) {
      return { hasVideoStream: true, hasAudioStream: false, visualKind: "still" };
    }
    throw error;
  }
}
function extractPngMetadataFromBuffer(buf) {
  if (buf.length < 8 || buf[0] !== 137 || buf[1] !== 80 || buf[2] !== 78 || buf[3] !== 71 || buf[4] !== 13 || buf[5] !== 10 || buf[6] !== 26 || buf[7] !== 10) {
    return null;
  }
  let width = 0;
  let height = 0;
  let seenIdat = false;
  let colorSpaceFromCicp = null;
  let pos = 8;
  while (pos + 12 <= buf.length) {
    const chunkLen = buf.readUInt32BE(pos);
    const chunkType = buf.toString("ascii", pos + 4, pos + 8);
    if (pos + 12 + chunkLen > buf.length) return null;
    const chunkData = buf.subarray(pos + 8, pos + 8 + chunkLen);
    const chunkCrc = buf.readUInt32BE(pos + 8 + chunkLen);
    if (chunkCrc32(chunkType, chunkData) !== chunkCrc) return null;
    if (chunkType === "IHDR" && chunkLen >= 13 && width === 0 && height === 0) {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    }
    if (chunkType === "IDAT") {
      seenIdat = true;
    }
    if (chunkType === "cICP" && chunkLen === 4 && !seenIdat) {
      const primariesCode = chunkData[0] ?? 0;
      const transferCode = chunkData[1] ?? 0;
      const matrixCode = chunkData[2] ?? 0;
      colorSpaceFromCicp = {
        colorPrimaries: primariesCode === 9 ? "bt2020" : primariesCode === 1 ? "bt709" : `unknown-${primariesCode}`,
        colorTransfer: transferCode === 16 ? "smpte2084" : transferCode === 18 ? "arib-std-b67" : transferCode === 1 ? "bt709" : `unknown-${transferCode}`,
        colorSpace: matrixCode === 9 ? "bt2020nc" : matrixCode === 0 ? "gbr" : `unknown-${matrixCode}`
      };
    }
    if (width > 0 && height > 0 && colorSpaceFromCicp !== null) break;
    if (chunkType === "IEND") break;
    pos += 12 + chunkLen;
  }
  return width > 0 && height > 0 ? { width, height, colorSpace: colorSpaceFromCicp } : null;
}
function pixelFormatHasAlpha(pixelFormat) {
  return /^(?:yuva|rgba|argb|bgra|abgr|gbrap|ya|ayuv)/i.test(pixelFormat);
}
function extractStillImageMetadata(filePath) {
  try {
    return extractPngMetadataFromBuffer(readFileSync(filePath));
  } catch {
    return null;
  }
}
function readTagCI(tags, name) {
  if (!tags) return "";
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(tags)) {
    if (key.toLowerCase() === target && typeof value === "string") return value;
  }
  return "";
}
function parseFrameRate(frameRateStr) {
  if (!frameRateStr) return 0;
  const parts = frameRateStr.split("/");
  if (parts.length > 2) return 0;
  const strict = (part) => part === void 0 || part.trim() === "" ? NaN : Number(part.trim());
  const raw = parts.length === 2 ? (() => {
    const num = strict(parts[0]);
    const den = strict(parts[1]);
    if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return NaN;
    return num / den;
  })() : strict(frameRateStr);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  const rounded = Math.round(raw * 100) / 100;
  if (!Number.isFinite(rounded)) return 0;
  return rounded > 0 ? rounded : 0.01;
}
async function extractMediaMetadata(filePath) {
  const cached = videoMetadataCache.get(filePath);
  if (cached) return cached;
  const probePromise = (async () => {
    let stillImageMetaMemo;
    const stillImage = () => {
      stillImageMetaMemo ??= extractStillImageMetadata(filePath);
      return stillImageMetaMemo;
    };
    let output = null;
    try {
      output = await probeMediaOutput(filePath);
    } catch (error) {
      if (!stillImage()) throw error;
    }
    const videoStream = output?.streams.find((s) => s.codec_type === "video");
    if (!videoStream) {
      const stillImageMeta = stillImage();
      if (stillImageMeta) {
        return {
          durationSeconds: 0,
          videoStreamDurationSeconds: 0,
          videoStreamStartSeconds: 0,
          width: stillImageMeta.width,
          height: stillImageMeta.height,
          fps: 0,
          videoCodec: "png",
          hasAudio: false,
          isVFR: false,
          hasAlpha: false,
          colorSpace: stillImageMeta.colorSpace,
          frames: 1
        };
      }
      throw new Error("[FFmpeg] No video stream found");
    }
    const rFps = parseFrameRate(videoStream.r_frame_rate);
    const avgFps = parseFrameRate(videoStream.avg_frame_rate);
    const fps = avgFps || rFps;
    const isVFR = rFps > 0 && avgFps > 0 && Math.abs(rFps - avgFps) / Math.max(rFps, avgFps) > 0.1;
    const colorTransfer = videoStream.color_transfer || "";
    const colorPrimaries = videoStream.color_primaries || "";
    const colorSpaceVal = videoStream.color_space || "";
    const cicp = colorTransfer && colorPrimaries && colorSpaceVal ? null : stillImage()?.colorSpace;
    const merged = {
      colorTransfer: colorTransfer || cicp?.colorTransfer || "",
      colorPrimaries: colorPrimaries || cicp?.colorPrimaries || "",
      colorSpace: colorSpaceVal || cicp?.colorSpace || ""
    };
    const colorSpace = merged.colorTransfer || merged.colorPrimaries || merged.colorSpace ? merged : null;
    const pixelFormat = videoStream.pix_fmt || "";
    const alphaMode = readTagCI(videoStream.tags, "alpha_mode");
    const hasAlpha = pixelFormatHasAlpha(pixelFormat) || alphaMode === "1";
    const containerDuration = output?.format.duration ? parseFloat(output.format.duration) : 0;
    const streamDuration = videoStream.duration ? parseFloat(videoStream.duration) : 0;
    const parsedStreamStart = videoStream.start_time ? parseFloat(videoStream.start_time) : 0;
    const streamStart = Number.isFinite(parsedStreamStart) ? parsedStreamStart : 0;
    const parsedNbFrames = videoStream.nb_frames ? parseInt(videoStream.nb_frames, 10) : NaN;
    const frames = Number.isFinite(parsedNbFrames) && parsedNbFrames > 0 ? parsedNbFrames : void 0;
    let effectiveStreamDuration;
    if (streamDuration > 0) {
      effectiveStreamDuration = streamDuration;
    } else if (frames !== void 0 && fps > 0 && containerDuration > 0) {
      const frameDerivedDuration = frames / fps;
      effectiveStreamDuration = frameDerivedDuration < containerDuration * 0.9 ? frameDerivedDuration : containerDuration;
    } else {
      effectiveStreamDuration = containerDuration;
    }
    return {
      durationSeconds: containerDuration,
      videoStreamDurationSeconds: effectiveStreamDuration,
      videoStreamStartSeconds: streamStart,
      width: videoStream.width || stillImage()?.width || 0,
      height: videoStream.height || stillImage()?.height || 0,
      fps,
      videoCodec: videoStream.codec_name || "unknown",
      hasAudio: output?.streams.some((s) => s.codec_type === "audio") ?? false,
      isVFR,
      hasAlpha,
      colorSpace,
      colorRange: videoStream.color_range,
      pixelFormat,
      frames
    };
  })();
  videoMetadataCache.set(filePath, probePromise);
  probePromise.catch(() => {
    if (videoMetadataCache.get(filePath) === probePromise) {
      videoMetadataCache.delete(filePath);
    }
  });
  return probePromise;
}
function resolveStreamWindow(filePath, metadata) {
  const videoStreamDurationSeconds = metadata.videoStreamDurationSeconds;
  const candidateStart = metadata.videoStreamStartSeconds ?? 0;
  const videoStreamStartSeconds = Number.isFinite(candidateStart) ? candidateStart : 0;
  const cacheKey = `${filePath}\0${String(videoStreamStartSeconds)}\0${String(videoStreamDurationSeconds)}`;
  return { videoStreamStartSeconds, videoStreamDurationSeconds, cacheKey };
}
async function extractFinalVideoFrameTimestamp(filePath, metadata, signal) {
  const {
    videoStreamStartSeconds,
    videoStreamDurationSeconds: videoDurationSeconds,
    cacheKey
  } = resolveStreamWindow(filePath, metadata);
  let probeCache = finalVideoFrameTimestampCache;
  if (signal) {
    probeCache = finalVideoFrameTimestampSignalCaches.get(signal) ?? /* @__PURE__ */ new Map();
    finalVideoFrameTimestampSignalCaches.set(signal, probeCache);
  }
  const cached = probeCache.get(cacheKey);
  if (cached) return cached;
  const probePromise = (async () => {
    if (!(videoDurationSeconds > 0) || !Number.isFinite(videoDurationSeconds)) {
      throw new Error(
        `[FFmpeg] Cannot locate final video frame for invalid duration ${String(videoDurationSeconds)}`
      );
    }
    const streamEnd = videoStreamStartSeconds + videoDurationSeconds;
    const intervalStart = Math.max(videoStreamStartSeconds, streamEnd - 1);
    const parseFinalTimestamp = (stdout) => stdout.split("\n").map((line) => line.trim().split(",")[0]?.trim() ?? "").filter((value) => value.length > 0).map((value) => Number(value)).filter((timestamp2) => Number.isFinite(timestamp2)).at(-1);
    const probe = async (readInterval) => {
      const args = [
        "-select_streams",
        "v:0",
        "-show_entries",
        "frame=best_effort_timestamp_time",
        "-of",
        "csv=p=0"
      ];
      if (readInterval) args.splice(2, 0, "-read_intervals", readInterval);
      const stdout = await runFfprobe(filePath, args, signal, {
        retainTail: true,
        maxChars: 64 * 1024
      });
      return parseFinalTimestamp(stdout);
    };
    const timestamp = await probe(`${intervalStart}%${streamEnd}`) ?? await probe(
      /* full scan */
    );
    if (timestamp === void 0) {
      throw new Error("[FFmpeg] ffprobe found no decodable final video frame");
    }
    return Math.min(Math.max(timestamp - videoStreamStartSeconds, 0), videoDurationSeconds);
  })();
  probeCache.set(cacheKey, probePromise);
  probePromise.catch(() => {
    if (probeCache.get(cacheKey) === probePromise) {
      probeCache.delete(cacheKey);
    }
  });
  return probePromise;
}
var extractVideoMetadata = extractMediaMetadata;
async function extractAudioMetadata(filePath, options) {
  const cached = options?.signal ? void 0 : audioMetadataCache.get(filePath);
  if (cached) return cached;
  const probePromise = (async () => {
    const output = await probeMediaOutput(filePath, options?.signal);
    const audioStream = output.streams.find((s) => s.codec_type === "audio");
    if (!audioStream) throw new Error("[FFmpeg] No audio stream found");
    let durationSeconds = output.format.duration ? parseFloat(output.format.duration) : 0;
    const streamDuration = audioStream.duration ? parseFloat(audioStream.duration) : void 0;
    const sampleRate = audioStream.sample_rate ? parseInt(audioStream.sample_rate) : 44100;
    const audioCodec = audioStream.codec_name || "unknown";
    const isAacLc = /^\s*LC\s*$/i.test(audioStream.profile ?? "");
    if (audioCodec === "aac" && isAacLc && sampleRate > 0) {
      try {
        const packetStdout = await runFfprobe(
          filePath,
          [
            "-select_streams",
            "a:0",
            "-count_packets",
            "-show_entries",
            "stream=nb_read_packets",
            "-print_format",
            "json"
          ],
          options?.signal
        );
        const packetOutput = parseProbeJson(packetStdout);
        const packetCount = Number(packetOutput.streams[0]?.nb_read_packets);
        if (Number.isFinite(packetCount) && packetCount > 0) {
          durationSeconds = packetCount * AAC_LC_SAMPLES_PER_PACKET / sampleRate;
        }
      } catch (error) {
        if (options?.signal?.aborted) throw error;
      }
    }
    return {
      durationSeconds,
      streamDurationSeconds: streamDuration && streamDuration > 0 ? streamDuration : void 0,
      sampleRate,
      channels: audioStream.channels || 2,
      audioCodec,
      bitrate: output.format.bit_rate ? parseInt(output.format.bit_rate) : void 0
    };
  })();
  if (options?.signal) return probePromise;
  audioMetadataCache.set(filePath, probePromise);
  probePromise.catch(() => {
    if (audioMetadataCache.get(filePath) === probePromise) {
      audioMetadataCache.delete(filePath);
    }
  });
  return probePromise;
}
var keyframeCache = /* @__PURE__ */ new Map();
var PROBLEMATIC_KEYFRAME_INTERVAL_SECONDS = 2;
async function analyzeKeyframeIntervals(filePath, metadata) {
  const { videoStreamStartSeconds, videoStreamDurationSeconds, cacheKey } = resolveStreamWindow(
    filePath,
    metadata
  );
  const cached = keyframeCache.get(cacheKey);
  if (cached) return cached;
  const promise = analyzeKeyframeIntervalsUncached(
    filePath,
    videoStreamStartSeconds,
    videoStreamDurationSeconds
  );
  keyframeCache.set(cacheKey, promise);
  promise.catch(() => {
    if (keyframeCache.get(cacheKey) === promise) {
      keyframeCache.delete(cacheKey);
    }
  });
  return promise;
}
async function analyzeKeyframeIntervalsUncached(filePath, videoStreamStartSeconds, videoStreamDurationSeconds) {
  const stdout = await runFfprobe(filePath, [
    "-select_streams",
    "v:0",
    "-skip_frame",
    "nokey",
    "-show_entries",
    "frame=pts_time",
    "-of",
    "csv=p=0"
  ]);
  const timestamps = stdout.split("\n").map((line) => parseFloat(line.trim())).filter((t) => Number.isFinite(t));
  if (timestamps.length === 0) {
    return {
      avgIntervalSeconds: 0,
      maxIntervalSeconds: 0,
      keyframeCount: 0,
      isProblematic: false
    };
  }
  if (timestamps.length === 1) {
    const streamEnd = videoStreamStartSeconds + videoStreamDurationSeconds;
    const rawInterval = streamEnd - (timestamps[0] ?? videoStreamStartSeconds);
    const singleGopInterval = Number.isFinite(rawInterval) ? Math.max(rawInterval, 0) : 0;
    const roundedInterval = Math.round(singleGopInterval * 100) / 100;
    return {
      avgIntervalSeconds: roundedInterval,
      maxIntervalSeconds: roundedInterval,
      keyframeCount: 1,
      isProblematic: singleGopInterval > PROBLEMATIC_KEYFRAME_INTERVAL_SECONDS
    };
  }
  let maxInterval = 0;
  let totalInterval = 0;
  for (let i = 1; i < timestamps.length; i++) {
    const interval = (timestamps[i] ?? 0) - (timestamps[i - 1] ?? 0);
    totalInterval += interval;
    if (interval > maxInterval) maxInterval = interval;
  }
  const avgInterval = totalInterval / (timestamps.length - 1);
  return {
    avgIntervalSeconds: Math.round(avgInterval * 100) / 100,
    maxIntervalSeconds: Math.round(maxInterval * 100) / 100,
    keyframeCount: timestamps.length,
    isProblematic: maxInterval > PROBLEMATIC_KEYFRAME_INTERVAL_SECONDS
  };
}

// ../engine/src/utils/renderProvenance.ts
import { readFileSync as readFileSync2 } from "fs";
import { dirname, join as join4 } from "path";
import { fileURLToPath } from "url";
var PROVENANCE_RENDERER_TAG = "hyperframes_renderer";
var PROVENANCE_VERSION_TAG = "hyperframes_version";
var PROVENANCE_RENDERER_NAME = "hyperframes";
var UNRESOLVED_VERSION = "unresolved";
var OWN_PACKAGE_NAME = /^(?:hyperframes|@hyperframes\/[^/]+)$/;
var MAX_WALK_DEPTH = 12;
function resolveOwnVersionFrom(startDir) {
  let dir = startDir;
  for (let depth = 0; depth < MAX_WALK_DEPTH; depth++) {
    const candidate = join4(dir, "package.json");
    let pkg;
    try {
      pkg = JSON.parse(readFileSync2(candidate, "utf8"));
    } catch {
      pkg = void 0;
    }
    if (pkg && typeof pkg.name === "string" && OWN_PACKAGE_NAME.test(pkg.name)) {
      if (typeof pkg.version === "string" && pkg.version.length > 0) return pkg.version;
      reportUnresolved(`found ${pkg.name} at ${candidate} but it declares no version`);
      return UNRESOLVED_VERSION;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  reportUnresolved(`no package.json matching ${OWN_PACKAGE_NAME} within ${MAX_WALK_DEPTH} levels`);
  return UNRESOLVED_VERSION;
}
function reportUnresolved(reason) {
  console.warn(
    `[renderProvenance] could not resolve the engine version (${reason}); stamping ${PROVENANCE_VERSION_TAG}="${UNRESOLVED_VERSION}". This is a lookup failure, not a version - do not treat it as one.`
  );
}
function readEngineVersion() {
  try {
    return resolveOwnVersionFrom(dirname(fileURLToPath(import.meta.url)));
  } catch {
    reportUnresolved("import.meta.url is not a file URL");
    return UNRESOLVED_VERSION;
  }
}
var PROVENANCE_VERSION = readEngineVersion();
function isMovFamilyContainer(outputPath) {
  const lower = outputPath.toLowerCase();
  return lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".m4v");
}
function renderProvenanceArgs(outputPath) {
  const args = [
    "-metadata",
    `${PROVENANCE_RENDERER_TAG}=${PROVENANCE_RENDERER_NAME}`,
    "-metadata",
    `${PROVENANCE_VERSION_TAG}=${PROVENANCE_VERSION}`
  ];
  if (isMovFamilyContainer(outputPath)) {
    args.push("-movflags", "+use_metadata_tags");
  }
  return args;
}
function appendRenderProvenanceArgs(args, outputPath) {
  args.push(...renderProvenanceArgs(outputPath));
}
function readRenderProvenance(tags) {
  const renderer = readTagCI(tags, PROVENANCE_RENDERER_TAG);
  if (renderer === "") return null;
  return { renderer, version: readTagCI(tags, PROVENANCE_VERSION_TAG) };
}

// ../engine/src/services/chunkEncoder.ts
var ENCODER_PRESETS = {
  draft: { preset: "ultrafast", quality: 28, codec: "h264" },
  standard: { preset: "medium", quality: 18, codec: "h264" },
  high: { preset: "slow", quality: 15, codec: "h264" }
};
function targetDimensions(options) {
  return {
    width: options.outputWidth ?? options.width,
    height: options.outputHeight ?? options.height
  };
}
function scaleFilter(options, rangeConversion = "none") {
  const needsResize = options.outputWidth !== void 0 && options.outputHeight !== void 0 && (options.outputWidth !== options.width || options.outputHeight !== options.height);
  if (!needsResize) {
    return rangeConversion === "full-to-tv" ? "scale=in_range=pc:out_range=tv" : "";
  }
  const range = rangeConversion === "full-to-tv" ? ":in_range=pc:out_range=tv" : "";
  return `scale=w=${options.outputWidth}:h=${options.outputHeight}${range}`;
}
function appendVideoFilter(args, filter) {
  if (!filter) return;
  const vfIdx = args.indexOf("-vf");
  if (vfIdx === -1) {
    args.push("-vf", filter);
    return;
  }
  args[vfIdx + 1] = `${filter},${args[vfIdx + 1]}`;
}
function appendEncodeTimeoutMessage(error, timedOut, timeoutMs) {
  if (!timedOut) return error;
  return `${error}
FFmpeg killed after exceeding ffmpegEncodeTimeout (${timeoutMs} ms). Long or high-frame-count renders may need more time: set FFMPEG_ENCODE_TIMEOUT_MS to a higher value (ms), or set PRODUCER_ENABLE_CHUNKED_ENCODE=true to encode in smaller chunks instead of one long-running ffmpeg process.`;
}
function isAacSidecar(audioPath) {
  return extname(audioPath).toLowerCase() === ".aac";
}
var KNOWN_NON_AAC_AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([
  ".flac",
  ".mp3",
  ".oga",
  ".ogg",
  ".opus",
  ".wav",
  ".webm"
]);
async function shouldCopyAacSidecar(audioPath, options) {
  if (options?.audioCodec === "aac" || isAacSidecar(audioPath)) return true;
  const audioExtension = extname(audioPath).toLowerCase();
  if (KNOWN_NON_AAC_AUDIO_EXTENSIONS.has(audioExtension)) return false;
  try {
    const metadata = await extractAudioMetadata(audioPath);
    return metadata.audioCodec === "aac";
  } catch {
    return false;
  }
}
function getEncoderPreset(quality, format = "mp4", hdr) {
  const base = ENCODER_PRESETS[quality];
  if (format === "webm") {
    return {
      preset: base.preset === "ultrafast" ? "realtime" : "good",
      quality: base.quality,
      codec: "vp9",
      pixelFormat: "yuva420p"
    };
  }
  if (format === "mov") {
    return {
      preset: "4444",
      quality: base.quality,
      codec: "prores",
      pixelFormat: "yuva444p10le"
    };
  }
  if (hdr) {
    return {
      preset: base.preset === "ultrafast" ? "fast" : base.preset,
      quality: base.quality,
      codec: "h265",
      pixelFormat: "yuv420p10le",
      hdr
    };
  }
  return { ...base, pixelFormat: "yuv420p" };
}
function resolveLockedGopSize(options) {
  if (options.lockGopForChunkConcat !== true) return null;
  if (typeof options.gopSize !== "number" || !Number.isFinite(options.gopSize) || options.gopSize <= 0) {
    throw new Error(
      `[chunkEncoder] lockGopForChunkConcat=true requires a positive integer gopSize (received ${String(options.gopSize)})`
    );
  }
  return Math.floor(options.gopSize);
}
function appendLockedGopArgs(args, gopSize) {
  args.push(
    "-g",
    String(gopSize),
    "-keyint_min",
    String(gopSize),
    "-sc_threshold",
    "0",
    "-force_key_frames",
    `expr:eq(mod(n,${gopSize}),0)`
  );
}
function lockedGopCodecParams(codec, gopSize) {
  const shared = "scenecut=0:open-gop=0:repeat-headers=1";
  return codec === "h264" ? shared : `keyint=${gopSize}:min-keyint=${gopSize}:${shared}`;
}
function buildEncoderArgs(options, inputArgs, outputPath, gpuEncoder = null) {
  const {
    fps,
    codec = "h264",
    preset = "medium",
    quality = 23,
    bitrate,
    pixelFormat = "yuv420p",
    vp9CpuUsed,
    useGpu = false
  } = options;
  if (options.hdr && codec === "h264") {
    console.warn(
      "[chunkEncoder] HDR is not supported with codec=h264 (libx264 has no HDR support). Stripping HDR metadata and tagging output as SDR/BT.709. Use codec=h265 for HDR output."
    );
    options = { ...options, hdr: void 0 };
  }
  const args = [...inputArgs, "-r", fpsToFfmpegArg(fps)];
  const shouldUseGpu = useGpu && gpuEncoder !== null;
  if (codec === "h264" || codec === "h265") {
    if (shouldUseGpu) {
      const encoderName = getGpuEncoderName(gpuEncoder, codec);
      args.push("-c:v", encoderName);
      switch (gpuEncoder) {
        case "nvenc":
          args.push("-preset", mapPresetForGpuEncoder("nvenc", preset));
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-cq", String(quality));
          break;
        case "videotoolbox":
          args.push(
            ...buildVideoToolboxRateControlArgs({
              bitrate,
              width: options.width,
              height: options.height,
              fps: fpsToNumber(fps),
              quality
            })
          );
          break;
        case "vaapi":
          args.unshift("-vaapi_device", "/dev/dri/renderD128");
          args.push("-vf", "format=nv12,hwupload");
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-qp", String(quality));
          break;
        case "qsv":
          args.push("-preset", mapPresetForGpuEncoder("qsv", preset));
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-global_quality", String(quality));
          break;
        case "amf":
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-rc", "cqp", "-qp_i", String(quality), "-qp_p", String(quality));
          break;
      }
      if (codec === "h264" && (gpuEncoder === "nvenc" || gpuEncoder === "qsv" || gpuEncoder === "vaapi" || gpuEncoder === "amf")) {
        args.push("-bf", "0");
        if (gpuEncoder === "qsv") {
          args.push("-b_strategy", "0");
        }
      }
    } else {
      const encoderName = codec === "h264" ? "libx264" : "libx265";
      args.push("-c:v", encoderName, "-preset", preset);
      if (bitrate) args.push("-b:v", bitrate);
      else args.push("-crf", String(quality));
      const gop = resolveLockedGopSize(options);
      const lockGop = gop !== null;
      if (gop !== null) appendLockedGopArgs(args, gop);
      if (codec === "h264" || codec === "h265" && lockGop) {
        args.push("-bf", "0");
      }
      const xParamsFlag = codec === "h264" ? "-x264-params" : "-x265-params";
      const colorParams = codec === "h265" && options.hdr ? getHdrEncoderColorParams(options.hdr.transfer).x265ColorParams : "colorprim=bt709:transfer=bt709:colormatrix=bt709";
      const gopParams = gop !== null ? lockedGopCodecParams(codec, gop) : "";
      const joinParams = (...parts) => parts.filter((p) => p.length > 0).join(":");
      if (preset === "ultrafast") {
        args.push(xParamsFlag, joinParams("aq-mode=3", colorParams, gopParams));
      } else {
        args.push(
          xParamsFlag,
          joinParams("aq-mode=3", "aq-strength=0.8", "deblock=1,1", colorParams, gopParams)
        );
      }
    }
    if (codec === "h265") {
      args.push("-tag:v", "hvc1");
    }
  } else if (codec === "vp9") {
    args.push("-c:v", "libvpx-vp9", "-b:v", bitrate || "0", "-crf", String(quality));
    args.push("-deadline", preset === "ultrafast" ? "realtime" : "good");
    args.push("-row-mt", "1");
    appendVp9CpuUsedArg(args, vp9CpuUsed);
    const vp9Gop = resolveLockedGopSize(options);
    const lockGopVp9 = vp9Gop !== null;
    if (vp9Gop !== null) {
      args.push("-g", String(vp9Gop), "-keyint_min", String(vp9Gop), "-auto-alt-ref", "0");
    }
    if (pixelFormat === "yuva420p") {
      if (!lockGopVp9) {
        args.push("-auto-alt-ref", "0");
      }
      args.push("-metadata:s:v:0", "alpha_mode=1");
    }
  } else if (codec === "prores") {
    args.push("-c:v", "prores_ks", "-profile:v", preset, "-vendor", "apl0");
    appendVideoFilter(args, scaleFilter(options));
    args.push("-pix_fmt", pixelFormat);
    appendRenderProvenanceArgs(args, outputPath);
    return [...args, "-y", outputPath];
  }
  if (codec === "h264" || codec === "h265") {
    if (options.hdr) {
      const transferTag = options.hdr.transfer === "pq" ? "smpte2084" : "arib-std-b67";
      args.push(
        "-colorspace:v",
        "bt2020nc",
        "-color_primaries:v",
        "bt2020",
        "-color_trc:v",
        transferTag,
        "-color_range",
        "tv"
      );
    } else {
      args.push(
        "-colorspace:v",
        "bt709",
        "-color_primaries:v",
        "bt709",
        "-color_trc:v",
        "bt709",
        "-color_range",
        "tv"
      );
    }
    const sdrFilter = options.hdr ? void 0 : SDR_CAPTURE_TO_BT709_FILTER;
    const captureFilter = [sdrFilter ?? "scale=in_range=pc:out_range=tv", scaleFilter(options)].filter(Boolean).join(",");
    const target = targetDimensions(options);
    if (gpuEncoder === "vaapi") {
      const vfIdx = args.indexOf("-vf");
      if (vfIdx !== -1) {
        args[vfIdx + 1] = `${withEvenDimensionPad(captureFilter, pixelFormat, target.width, target.height)},${args[vfIdx + 1]}`;
      }
    } else if (shouldUseGpu) {
      const gpuFilter = [sdrFilter, scaleFilter(options)].filter(Boolean).join(",");
      const vf = withEvenDimensionPad(gpuFilter, pixelFormat, target.width, target.height);
      if (vf) args.push("-vf", vf);
    } else {
      args.push(
        "-vf",
        withEvenDimensionPad(captureFilter, pixelFormat, target.width, target.height)
      );
    }
    args.push("-video_track_timescale", "90000");
  }
  if (gpuEncoder !== "vaapi") {
    if (codec === "vp9") {
      appendVideoFilter(args, scaleFilter(options));
    }
    args.push("-pix_fmt", pixelFormat);
  }
  args.push("-avoid_negative_ts", "make_zero");
  appendRenderProvenanceArgs(args, outputPath);
  args.push("-y", outputPath);
  return args;
}
var framesReader = (onFrames) => onFrames && ffmpegStatsReader(({ frames }) => frames !== void 0 && onFrames(frames));
var secondsReader = (onSeconds) => onSeconds && ffmpegStatsReader(({ seconds }) => seconds !== void 0 && onSeconds(seconds));
async function encodeFramesFromDir(framesDir, framePattern, outputPath, options, signal, config, onFramesEncoded) {
  const startTime = Date.now();
  const outputDir = dirname2(outputPath);
  if (!existsSync4(outputDir)) mkdirSync2(outputDir, { recursive: true });
  const files = readdirSync2(framesDir).filter((f) => f.match(/\.(jpg|jpeg|png)$/i));
  const frameCount = files.length;
  if (frameCount === 0) {
    return {
      success: false,
      outputPath,
      durationMs: Date.now() - startTime,
      framesEncoded: 0,
      fileSize: 0,
      error: "[FFmpeg] No frame files found in directory"
    };
  }
  let gpuEncoder = null;
  if (options.useGpu) {
    gpuEncoder = await getCachedGpuEncoder();
  }
  const inputPath = join5(framesDir, framePattern);
  const inputArgs = ["-framerate", fpsToFfmpegArg(options.fps), "-i", inputPath];
  const args = buildEncoderArgs(options, inputArgs, outputPath, gpuEncoder);
  const encodeTimeout = config?.ffmpegEncodeTimeout ?? DEFAULT_CONFIG.ffmpegEncodeTimeout;
  const result = await runFfmpeg(args, {
    signal,
    timeout: encodeTimeout,
    onStderr: framesReader(onFramesEncoded)
  });
  if (result.terminationReason === "abort") {
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      framesEncoded: 0,
      fileSize: 0,
      error: "FFmpeg encode cancelled"
    };
  }
  if (!result.success) {
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      framesEncoded: 0,
      fileSize: 0,
      error: appendEncodeTimeoutMessage(
        formatFfmpegError(result.exitCode, result.stderr),
        result.terminationReason === "deadline",
        encodeTimeout
      ),
      failureReason: isExternalFfmpegInterruption(result) ? "external_interruption" : void 0
    };
  }
  const fileSize = existsSync4(outputPath) ? statSync2(outputPath).size : 0;
  return {
    success: true,
    outputPath,
    durationMs: Date.now() - startTime,
    framesEncoded: frameCount,
    fileSize
  };
}
function buildConcatArgs(concatListPath, outputPath) {
  const args = ["-f", "concat", "-safe", "0", "-i", concatListPath, "-c", "copy"];
  appendRenderProvenanceArgs(args, outputPath);
  args.push("-y", outputPath);
  return args;
}
var concatListSeq = 0;
function writeConcatList(dir, inputPaths) {
  concatListSeq += 1;
  const listPath = join5(dir, `concat-list-${process.pid}-${concatListSeq}.txt`);
  const body = inputPaths.map((p) => `file '${p.replace(/'/g, "'\\''")}'`).join("\n");
  writeFileSync2(listPath, body, "utf-8");
  return listPath;
}
async function concatVideoFiles(inputPaths, outputPath, signal, config) {
  const [firstInput] = inputPaths;
  if (firstInput === void 0) {
    return { success: false, error: "concatVideoFiles: no inputs", externalInterruption: false };
  }
  mkdirSync2(dirname2(outputPath), { recursive: true });
  const listPath = writeConcatList(dirname2(firstInput), inputPaths);
  const encodeTimeout = config?.ffmpegEncodeTimeout ?? DEFAULT_CONFIG.ffmpegEncodeTimeout;
  const result = await runFfmpeg(buildConcatArgs(listPath, outputPath), {
    signal,
    timeout: encodeTimeout
  });
  if (result.success) return { success: true };
  return {
    success: false,
    error: appendEncodeTimeoutMessage(
      `Chunk concat failed: ${result.stderr.slice(-400)}`,
      result.terminationReason === "deadline",
      encodeTimeout
    ),
    externalInterruption: isExternalFfmpegInterruption(result)
  };
}
async function encodeFramesChunkedConcat(framesDir, framePattern, outputPath, options, chunkSizeFrames, signal, config, onFramesEncoded) {
  const start = Date.now();
  const files = readdirSync2(framesDir).filter((f) => f.match(/\.(jpg|jpeg|png)$/i)).sort();
  if (files.length === 0) {
    return {
      success: false,
      outputPath,
      durationMs: Date.now() - start,
      framesEncoded: 0,
      fileSize: 0,
      error: "[FFmpeg] No frame files found in directory"
    };
  }
  const chunkSize = Math.max(30, Math.floor(chunkSizeFrames));
  const chunkCount = Math.ceil(files.length / chunkSize);
  mkdirSync2(dirname2(outputPath), { recursive: true });
  const chunkDir = mkdtempSync(join5(dirname2(outputPath), "chunk-encode-"));
  const chunkPaths = [];
  for (let i = 0; i < chunkCount; i++) {
    if (signal?.aborted) {
      return {
        success: false,
        outputPath,
        durationMs: Date.now() - start,
        framesEncoded: 0,
        fileSize: 0,
        error: "Chunked encode cancelled"
      };
    }
    const startNumber = i * chunkSize;
    const framesInChunk = Math.min(chunkSize, files.length - startNumber);
    const ext = outputPath.endsWith(".webm") ? ".webm" : outputPath.endsWith(".mov") ? ".mov" : ".mp4";
    const chunkPath = join5(chunkDir, `chunk_${String(i).padStart(4, "0")}${ext}`);
    const inputPath = join5(framesDir, framePattern);
    const inputArgs = [
      "-framerate",
      fpsToFfmpegArg(options.fps),
      "-start_number",
      String(startNumber),
      "-i",
      inputPath,
      "-frames:v",
      String(framesInChunk)
    ];
    let gpuEncoder = null;
    if (options.useGpu) gpuEncoder = await getCachedGpuEncoder();
    const args = buildEncoderArgs(options, inputArgs, chunkPath, gpuEncoder);
    const encodeTimeout = config?.ffmpegEncodeTimeout ?? DEFAULT_CONFIG.ffmpegEncodeTimeout;
    const processResult = await runFfmpeg(args, {
      signal,
      timeout: encodeTimeout,
      onStderr: framesReader(
        onFramesEncoded && ((frames) => onFramesEncoded(startNumber + frames))
      )
    });
    const chunkResult = {
      success: processResult.success,
      error: processResult.success ? void 0 : appendEncodeTimeoutMessage(
        `Chunk ${i} encode failed: ${processResult.stderr.slice(-400)}`,
        processResult.terminationReason === "deadline",
        encodeTimeout
      )
    };
    if (!chunkResult.success) {
      return {
        success: false,
        outputPath,
        durationMs: Date.now() - start,
        framesEncoded: 0,
        fileSize: 0,
        error: chunkResult.error,
        failureReason: isExternalFfmpegInterruption(processResult) ? "external_interruption" : void 0
      };
    }
    chunkPaths.push(chunkPath);
  }
  const concatResult = await concatVideoFiles(chunkPaths, outputPath, signal, config);
  if (!concatResult.success) {
    return {
      success: false,
      outputPath,
      durationMs: Date.now() - start,
      framesEncoded: 0,
      fileSize: 0,
      error: concatResult.error,
      failureReason: concatResult.externalInterruption ? "external_interruption" : void 0
    };
  }
  const fileSize = existsSync4(outputPath) ? statSync2(outputPath).size : 0;
  return {
    success: true,
    outputPath,
    durationMs: Date.now() - start,
    framesEncoded: files.length,
    fileSize
  };
}
async function muxVideoWithAudio(videoPath, audioPath, outputPath, signal, config, fps, onSecondsWritten) {
  const outputDir = dirname2(outputPath);
  if (!existsSync4(outputDir)) mkdirSync2(outputDir, { recursive: true });
  const isWebm = outputPath.endsWith(".webm");
  const isMov = outputPath.endsWith(".mov");
  const shouldCopyAudio = isWebm ? false : await shouldCopyAacSidecar(audioPath, config);
  const args = ["-i", videoPath, "-i", audioPath, "-c:v", "copy"];
  if (isWebm) {
    args.push("-c:a", "libopus", "-b:a", "128k");
  } else if (isMov) {
    if (shouldCopyAudio) {
      args.push("-c:a", "copy");
    } else {
      args.push("-c:a", "aac", "-b:a", "192k");
    }
  } else {
    if (shouldCopyAudio) {
      args.push("-c:a", "copy", "-movflags", "+faststart");
    } else {
      args.push("-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart");
    }
  }
  appendRenderProvenanceArgs(args, outputPath);
  if (fps !== void 0) {
    args.push("-r", fpsToFfmpegArg(fps));
  }
  args.push("-y", outputPath);
  const processTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const result = await runFfmpeg(args, {
    signal,
    timeout: processTimeout,
    onStderr: secondsReader(onSecondsWritten)
  });
  if (signal?.aborted) {
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      error: "FFmpeg mux cancelled"
    };
  }
  return {
    success: result.success,
    outputPath,
    durationMs: result.durationMs,
    error: !result.success ? formatFfmpegError(result.exitCode, result.stderr) : void 0,
    failureReason: result.failureReason
  };
}
var HLS_MASTER_PLAYLIST = "master.m3u8";
var HLS_VIDEO_PLAYLIST = "video.m3u8";
var HLS_AUDIO_PLAYLIST = "audio.m3u8";
function stripAudioOnlyVariants(masterPlaylist) {
  const lines = masterPlaylist.split("\n");
  const kept = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("#EXT-X-STREAM-INF:") && !line.includes("RESOLUTION=")) {
      if (kept.at(-1) === "") kept.pop();
      i += 1;
      continue;
    }
    kept.push(line);
  }
  return kept.join("\n");
}
async function packageHls(videoPath, audioPath, outputDir, options) {
  const { segmentSeconds, signal } = options;
  if (!Number.isInteger(segmentSeconds) || segmentSeconds <= 0) {
    throw new Error(
      `[chunkEncoder] packageHls requires a positive integer segmentSeconds (received ${String(segmentSeconds)})`
    );
  }
  if (outputDir.includes("%")) {
    throw new Error(`[chunkEncoder] packageHls outputDir must not contain "%": ${outputDir}`);
  }
  if (!existsSync4(outputDir)) mkdirSync2(outputDir, { recursive: true });
  const hasAudio = audioPath !== null;
  const args = hasAudio ? ["-i", videoPath, "-i", audioPath, "-map", "0:v:0", "-map", "1:a:0"] : ["-i", videoPath, "-map", "0:v:0"];
  args.push(
    "-c",
    "copy",
    "-f",
    "hls",
    "-hls_time",
    String(segmentSeconds),
    "-hls_playlist_type",
    "vod",
    "-hls_flags",
    "independent_segments",
    "-hls_segment_type",
    "mpegts",
    "-var_stream_map",
    hasAudio ? "v:0,agroup:aud,name:video a:0,agroup:aud,name:audio" : "v:0,name:video",
    "-master_pl_name",
    HLS_MASTER_PLAYLIST,
    "-hls_segment_filename",
    join5(outputDir, "%v_%05d.ts"),
    // Without these the mpegts muxer starts the stream at PTS 1.4 s.
    "-muxdelay",
    "0",
    "-muxpreload",
    "0"
  );
  args.push("-y", join5(outputDir, "%v.m3u8"));
  const processTimeout = options.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const result = await runFfmpeg(args, { signal, timeout: processTimeout });
  if (signal?.aborted) {
    return {
      success: false,
      outputPath: outputDir,
      durationMs: result.durationMs,
      error: "FFmpeg HLS packaging cancelled"
    };
  }
  if (result.success && hasAudio) {
    const masterPath = join5(outputDir, HLS_MASTER_PLAYLIST);
    let master;
    try {
      master = openSync(masterPath, "r+", 384);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (master !== void 0) {
      try {
        const stripped = stripAudioOnlyVariants(readFileSync3(master, "utf-8"));
        ftruncateSync(master, 0);
        writeSync(master, stripped, 0, "utf-8");
      } finally {
        closeSync(master);
      }
    }
  }
  return {
    success: result.success,
    outputPath: outputDir,
    durationMs: result.durationMs,
    error: !result.success ? formatFfmpegError(result.exitCode, result.stderr) : void 0,
    failureReason: result.failureReason
  };
}
async function applyFaststart(inputPath, outputPath, signal, config, fps, onSecondsWritten) {
  if (outputPath.endsWith(".webm") || outputPath.endsWith(".mov")) {
    if (inputPath !== outputPath) copyFileSync(inputPath, outputPath);
    return { success: true, outputPath, durationMs: 0 };
  }
  const args = ["-i", inputPath, "-c", "copy", "-movflags", "+faststart"];
  appendRenderProvenanceArgs(args, outputPath);
  if (fps !== void 0) {
    args.push("-r", fpsToFfmpegArg(fps));
  }
  args.push("-y", outputPath);
  const processTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const result = await runFfmpeg(args, {
    signal,
    timeout: processTimeout,
    onStderr: secondsReader(onSecondsWritten)
  });
  if (signal?.aborted) {
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      error: "FFmpeg faststart cancelled"
    };
  }
  return {
    success: result.success,
    outputPath,
    durationMs: result.durationMs,
    error: !result.success ? formatFfmpegError(result.exitCode, result.stderr) : void 0,
    failureReason: result.failureReason
  };
}

// ../engine/src/utils/jpegInput.ts
function jpegInputError(buffer) {
  if (buffer.length === 0) return "empty frame";
  if (buffer[0] !== 255 || buffer[1] !== 216) return "missing JPEG SOI marker";
  let offset = 2;
  while (offset < buffer.length) {
    const segment = readSegment(buffer, offset);
    if (typeof segment === "string") return segment;
    const { marker, start, end } = segment;
    if (marker === 219) {
      const error = quantizationTableError(buffer, start, end);
      if (error) return error;
    }
    if (marker === 218) return void 0;
    offset = end;
  }
  return "missing JPEG scan";
}
function readSegment(buffer, offset) {
  if (buffer[offset++] !== 255) return "invalid JPEG marker";
  while (buffer[offset] === 255) offset++;
  const marker = buffer[offset++];
  if (marker === void 0) return "truncated JPEG marker";
  if (marker === 1) return { marker, start: offset, end: offset };
  if (offset + 2 > buffer.length) return "truncated JPEG segment length";
  const length = buffer.readUInt16BE(offset);
  const end = offset + length;
  if (length < 2 || end > buffer.length) return "invalid JPEG segment length";
  return { marker, start: offset + 2, end };
}
function quantizationTableError(buffer, start, end) {
  if (start === end) return "empty JPEG DQT segment";
  let offset = start;
  while (offset < end) {
    const descriptor = buffer[offset++];
    if (descriptor === void 0) return "truncated JPEG DQT descriptor";
    const precision = descriptor >> 4;
    if (precision > 1) return `invalid JPEG DQT precision ${precision}`;
    if ((descriptor & 15) > 3) return "invalid JPEG DQT table id";
    offset += precision === 0 ? 64 : 128;
    if (offset > end) return "truncated JPEG DQT table";
  }
  return void 0;
}

// ../engine/src/services/streamingEncoder.ts
import { spawn as spawn4 } from "child_process";
import { once } from "events";
import { existsSync as existsSync5, mkdirSync as mkdirSync3, statSync as statSync3 } from "fs";
import { dirname as dirname3 } from "path";
function createFrameReorderBuffer(startFrame, endFrame) {
  let cursor = startFrame;
  let aborted = null;
  const pending = /* @__PURE__ */ new Map();
  const enqueueAt = (frame, resolve, reject) => {
    const list = pending.get(frame);
    if (list === void 0) {
      pending.set(frame, [{ resolve, reject }]);
    } else {
      list.push({ resolve, reject });
    }
  };
  const flushAt = (frame) => {
    const list = pending.get(frame);
    if (list === void 0) return;
    pending.delete(frame);
    for (const waiter of list) waiter.resolve();
  };
  const waitForFrame = (frame) => new Promise((resolve, reject) => {
    if (aborted) {
      reject(aborted);
      return;
    }
    if (frame === cursor) {
      resolve();
      return;
    }
    enqueueAt(frame, resolve, reject);
  });
  const advanceTo = (frame) => {
    cursor = frame;
    flushAt(frame);
  };
  const waitForAllDone = () => new Promise((resolve, reject) => {
    if (aborted) {
      reject(aborted);
      return;
    }
    if (cursor >= endFrame) {
      resolve();
      return;
    }
    enqueueAt(endFrame, resolve, reject);
  });
  const abort = (err) => {
    if (aborted) return;
    aborted = err;
    for (const [frame, list] of pending) {
      pending.delete(frame);
      for (const waiter of list) waiter.reject(err);
    }
  };
  return { waitForFrame, advanceTo, waitForAllDone, abort };
}
function targetDimensions2(options) {
  return {
    width: options.outputWidth ?? options.width,
    height: options.outputHeight ?? options.height
  };
}
function scaleFilter2(options, rangeConversion = "none") {
  const needsResize = options.outputWidth !== void 0 && options.outputHeight !== void 0 && (options.outputWidth !== options.width || options.outputHeight !== options.height);
  if (!needsResize) {
    return rangeConversion === "full-to-tv" ? "scale=in_range=pc:out_range=tv" : "";
  }
  const range = rangeConversion === "full-to-tv" ? ":in_range=pc:out_range=tv" : "";
  return `scale=w=${options.outputWidth}:h=${options.outputHeight}${range}`;
}
function appendVideoFilter2(args, filter) {
  if (!filter) return;
  const vfIdx = args.indexOf("-vf");
  if (vfIdx === -1) {
    args.push("-vf", filter);
    return;
  }
  args[vfIdx + 1] = `${filter},${args[vfIdx + 1]}`;
}
function buildStreamingArgs(options, outputPath, gpuEncoder = null) {
  const {
    fps,
    codec = "h264",
    preset = "medium",
    quality = 23,
    bitrate,
    pixelFormat = "yuv420p",
    vp9CpuUsed,
    useGpu = false,
    imageFormat = "jpeg"
  } = options;
  const args = [];
  if (options.rawInputFormat) {
    const hdrTransfer = options.hdr?.transfer;
    const inputColorTrc = hdrTransfer === "pq" ? "smpte2084" : hdrTransfer === "hlg" ? "arib-std-b67" : void 0;
    args.push(
      "-f",
      "rawvideo",
      "-pix_fmt",
      options.rawInputFormat,
      "-s",
      `${options.width}x${options.height}`,
      "-framerate",
      fpsToFfmpegArg(fps)
    );
    if (inputColorTrc) {
      args.push(
        "-color_primaries",
        "bt2020",
        "-color_trc",
        inputColorTrc,
        "-colorspace",
        "bt2020nc"
      );
    }
    args.push("-i", "-");
  } else {
    const inputCodec = imageFormat === "png" ? "png" : "mjpeg";
    args.push(
      "-f",
      "image2pipe",
      "-vcodec",
      inputCodec,
      "-framerate",
      fpsToFfmpegArg(fps),
      "-i",
      "-"
    );
  }
  args.push("-r", fpsToFfmpegArg(fps));
  const shouldUseGpu = useGpu && gpuEncoder !== null;
  if (codec === "h264" || codec === "h265") {
    if (shouldUseGpu) {
      const encoderName = getGpuEncoderName(gpuEncoder, codec);
      args.push("-c:v", encoderName);
      switch (gpuEncoder) {
        case "nvenc":
          args.push("-preset", mapPresetForGpuEncoder("nvenc", preset));
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-cq", String(quality));
          break;
        case "videotoolbox":
          args.push(
            ...buildVideoToolboxRateControlArgs({
              bitrate,
              width: options.width,
              height: options.height,
              fps: fpsToNumber(fps),
              quality
            })
          );
          break;
        case "vaapi":
          args.unshift("-vaapi_device", "/dev/dri/renderD128");
          args.push("-vf", "format=nv12,hwupload");
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-qp", String(quality));
          break;
        case "qsv":
          args.push("-preset", mapPresetForGpuEncoder("qsv", preset));
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-global_quality", String(quality));
          break;
        case "amf":
          if (bitrate) args.push("-b:v", bitrate);
          else args.push("-rc", "cqp", "-qp_i", String(quality), "-qp_p", String(quality));
          break;
      }
      if (codec === "h264" && (gpuEncoder === "nvenc" || gpuEncoder === "qsv" || gpuEncoder === "vaapi" || gpuEncoder === "amf")) {
        args.push("-bf", "0");
        if (gpuEncoder === "qsv") {
          args.push("-b_strategy", "0");
        }
      }
    } else {
      const encoderName = codec === "h264" ? "libx264" : "libx265";
      args.push("-c:v", encoderName, "-preset", preset);
      if (bitrate) args.push("-b:v", bitrate);
      else args.push("-crf", String(quality));
      const lockedGop = resolveLockedGopSize(options);
      if (lockedGop !== null) appendLockedGopArgs(args, lockedGop);
      if (codec === "h264" || lockedGop !== null) {
        args.push("-bf", "0");
      }
      const xParamsFlag = codec === "h264" ? "-x264-params" : "-x265-params";
      const colorParams = options.rawInputFormat && options.hdr ? getHdrEncoderColorParams(options.hdr.transfer).x265ColorParams : "colorprim=bt709:transfer=bt709:colormatrix=bt709";
      const gopParams = lockedGop !== null ? `:${lockedGopCodecParams(codec, lockedGop)}` : "";
      if (preset === "ultrafast") {
        args.push(xParamsFlag, `aq-mode=3:${colorParams}${gopParams}`);
      } else {
        args.push(xParamsFlag, `aq-mode=3:aq-strength=0.8:deblock=1,1:${colorParams}${gopParams}`);
      }
      if (codec === "h265") {
        args.push("-tag:v", "hvc1");
      }
    }
  } else if (codec === "vp9") {
    args.push("-c:v", "libvpx-vp9", "-b:v", bitrate || "0", "-crf", String(quality));
    args.push("-deadline", preset === "ultrafast" ? "realtime" : "good");
    args.push("-row-mt", "1");
    appendVp9CpuUsedArg(args, vp9CpuUsed);
    if (pixelFormat === "yuva420p") {
      args.push("-auto-alt-ref", "0");
      args.push("-metadata:s:v:0", "alpha_mode=1");
    }
  } else if (codec === "prores") {
    args.push("-c:v", "prores_ks", "-profile:v", preset, "-vendor", "apl0");
    appendVideoFilter2(args, scaleFilter2(options));
    args.push("-pix_fmt", pixelFormat);
    appendRenderProvenanceArgs(args, outputPath);
    return [...args, "-y", outputPath];
  }
  if (codec === "h264" || codec === "h265") {
    if (options.rawInputFormat && options.hdr) {
      args.push(
        "-colorspace:v",
        "bt2020nc",
        "-color_primaries:v",
        "bt2020",
        "-color_trc:v",
        options.hdr.transfer === "pq" ? "smpte2084" : "arib-std-b67",
        "-color_range",
        "tv"
      );
    } else {
      args.push(
        "-colorspace:v",
        "bt709",
        "-color_primaries:v",
        "bt709",
        "-color_trc:v",
        "bt709",
        "-color_range",
        "tv"
      );
    }
    const sdrFilter = options.rawInputFormat ? SDR_RGB_TO_BT709_FILTER : SDR_CAPTURE_TO_BT709_FILTER;
    const outputFilter = [sdrFilter, scaleFilter2(options)].filter(Boolean).join(",");
    const target = targetDimensions2(options);
    if (options.rawInputFormat && options.hdr) {
      appendVideoFilter2(args, scaleFilter2(options));
    } else if (gpuEncoder === "vaapi") {
      const vfIdx = args.indexOf("-vf");
      if (vfIdx !== -1) {
        args[vfIdx + 1] = `${withEvenDimensionPad(outputFilter, pixelFormat, target.width, target.height)},${args[vfIdx + 1]}`;
      }
    } else {
      args.push("-vf", withEvenDimensionPad(outputFilter, pixelFormat, target.width, target.height));
    }
    args.push("-video_track_timescale", "90000");
  }
  if (gpuEncoder !== "vaapi") {
    if (codec === "vp9") {
      appendVideoFilter2(args, scaleFilter2(options));
    }
    args.push("-pix_fmt", pixelFormat);
  }
  args.push("-avoid_negative_ts", "make_zero");
  appendRenderProvenanceArgs(args, outputPath);
  args.push("-y", outputPath);
  return args;
}
async function spawnStreamingEncoder(outputPath, options, signal, config) {
  const outputDir = dirname3(outputPath);
  if (!existsSync5(outputDir)) mkdirSync3(outputDir, { recursive: true });
  let gpuEncoder = null;
  if (options.useGpu) {
    gpuEncoder = await getCachedGpuEncoder();
  }
  const args = buildStreamingArgs(options, outputPath, gpuEncoder);
  const ffmpeg = spawn4(getFfmpegBinary(), args.map(ffmpegPathArgument), {
    stdio: ["pipe", "pipe", "pipe"],
    // See runFfmpeg.ts: keeps a console window off the user's desktop on Windows.
    windowsHide: true
  });
  trackChildProcess(ffmpeg);
  let exitStatus = "running";
  let stderr = "";
  let exitCode = null;
  let exitSignal = null;
  let terminationReason = "exit";
  ffmpeg.stdin?.on("error", () => {
  });
  ffmpeg.stdout?.on("error", () => {
  });
  const streamingTimeout = config?.ffmpegStreamingTimeout ?? DEFAULT_CONFIG.ffmpegStreamingTimeout;
  let framesEncoded = 0;
  let onFramesEncoded;
  const managed = new ManagedChildProcess(ffmpeg, {
    signal,
    inactivityTimeoutMs: streamingTimeout,
    onStderr: ffmpegStatsReader(({ frames }) => {
      if (frames === void 0) return;
      framesEncoded = frames;
      onFramesEncoded?.(frames);
    })
  });
  const exitPromise = managed.wait().then((outcome) => {
    exitCode = outcome.exitCode;
    exitSignal = outcome.signal;
    stderr = outcome.stderr;
    terminationReason = outcome.reason;
    exitStatus = outcome.reason === "exit" && outcome.exitCode === 0 ? "success" : "error";
    return outcome;
  });
  const waitForDrainOrExit = async (stdin) => {
    const abortController = new AbortController();
    try {
      const drainPromise = once(stdin, "drain", { signal: abortController.signal }).then(
        () => "drain"
      );
      const closePromise = once(ffmpeg, "close", { signal: abortController.signal }).then(
        () => "exit"
      );
      const racePromise = Promise.race([drainPromise, closePromise]).catch(async (err) => {
        if (err instanceof Error && err.name === "AbortError") {
          return "exit";
        }
        await exitPromise;
        return "exit";
      });
      if (managed.isSettled || exitStatus !== "running") {
        return "exit";
      }
      return await racePromise;
    } finally {
      abortController.abort();
    }
  };
  let inputFrameIndex = 0;
  const encoder = {
    writeFrame: async (buffer) => {
      const stdin = ffmpeg.stdin;
      if (exitStatus !== "running") {
        return false;
      }
      if (!stdin || stdin.destroyed) {
        await exitPromise;
        return false;
      }
      const copy = Buffer.from(buffer);
      if (!options.rawInputFormat && (options.imageFormat ?? "jpeg") === "jpeg") {
        const error = jpegInputError(copy);
        if (error) throw new Error(`Invalid JPEG input at frame ${inputFrameIndex}: ${error}`);
      }
      const accepted = stdin.write(copy);
      inputFrameIndex++;
      if (accepted) {
        managed.markActivity();
        return true;
      }
      const drainResult = await waitForDrainOrExit(stdin);
      if (drainResult !== "drain" || exitStatus !== "running") {
        return false;
      }
      managed.markActivity();
      return true;
    },
    close: async (onEncoded) => {
      if (onEncoded && exitStatus === "running") {
        onFramesEncoded = onEncoded;
        onEncoded(framesEncoded);
      }
      const stdin = ffmpeg.stdin;
      if (stdin && !stdin.destroyed) {
        await new Promise((resolve) => {
          stdin.end(() => resolve());
        });
      }
      const outcome = await exitPromise;
      const durationMs = outcome.durationMs;
      if (terminationReason === "abort") {
        return {
          success: false,
          durationMs,
          fileSize: 0,
          error: "Streaming encode cancelled"
        };
      }
      if (exitCode !== 0) {
        const inactivitySuffix = terminationReason === "inactivity" ? `
FFmpeg stopped after ${streamingTimeout} ms without consuming a frame.` : "";
        return {
          success: false,
          durationMs,
          fileSize: 0,
          error: `${formatFfmpegError(exitCode, stderr)}${inactivitySuffix}`,
          failureReason: isExternalFfmpegInterruption({
            exitCode,
            signal: exitSignal,
            stderr,
            terminationReason
          }) ? "external_interruption" : void 0
        };
      }
      const fileSize = existsSync5(outputPath) ? statSync3(outputPath).size : 0;
      return { success: true, durationMs, fileSize };
    },
    getExitStatus: () => exitStatus,
    getExitError: () => {
      if (exitStatus !== "error") return void 0;
      return formatFfmpegError(exitCode, stderr);
    },
    getExitFailureReason: () => {
      if (exitStatus !== "error") return void 0;
      return isExternalFfmpegInterruption({
        exitCode,
        signal: exitSignal,
        stderr,
        terminationReason
      }) ? "external_interruption" : void 0;
    }
  };
  return encoder;
}

// ../core/dist/audioGroups.js
var HF_AUDIO_GROUP_TAG = "hf-audio-group";
var HF_AUDIO_GROUP_ATTR = "data-audio-group";
function readAudioGroupVolume(el) {
  const raw = el?.getAttribute("data-volume");
  const parsed = raw ? parseFloat(raw) : 1;
  return Number.isFinite(parsed) ? parsed : 1;
}
function buildGroup(id, memberIds, el) {
  const fxChain = el?.getAttribute(HF_AUDIO_FX_ATTR);
  const automation = el?.getAttribute(HF_AUDIO_AUTOMATION_ATTR);
  return {
    id,
    label: el?.getAttribute("data-label") || id,
    memberIds,
    ...fxChain ? { fxChain } : {},
    ...automation ? { automation } : {},
    volume: readAudioGroupVolume(el),
    hidden: el?.hasAttribute("data-hidden") ?? false
  };
}
function resolveAudioGroups(root) {
  const membersByGroup = /* @__PURE__ */ new Map();
  const candidates = root.querySelectorAll(`audio[${HF_AUDIO_GROUP_ATTR}], video[${HF_AUDIO_GROUP_ATTR}]`);
  for (const member of candidates) {
    if (!isGroupableMember(member))
      continue;
    const groupId = member.getAttribute(AUDIO_GROUP_RENDER_ID_ATTR2) ?? member.getAttribute(HF_AUDIO_GROUP_ATTR);
    if (!groupId || !member.id)
      continue;
    const members = membersByGroup.get(groupId);
    if (members)
      members.push(member.id);
    else
      membersByGroup.set(groupId, [member.id]);
  }
  const groupElements = /* @__PURE__ */ new Map();
  for (const el of root.querySelectorAll(HF_AUDIO_GROUP_TAG)) {
    const key = el.getAttribute(MEDIA_RENDER_ID_ATTR2) ?? el.id;
    if (key)
      groupElements.set(key, el);
  }
  const groups = [];
  for (const [id, memberIds] of membersByGroup) {
    groups.push(buildGroup(id, memberIds, groupElements.get(id)));
  }
  return groups;
}
function isGroupableMember(el) {
  if (el.tagName.toLowerCase() === "audio")
    return true;
  return typeof el.hasAttribute === "function" && isAudibleVideoElement2(el);
}

// ../engine/src/services/mediaHidden.ts
function isSelfOrAncestorHidden(el) {
  for (let current = el; current; current = current.parentElement) {
    if (current.hasAttribute("data-hidden")) return true;
  }
  return false;
}
function memberGroupKey(el) {
  return el.getAttribute(AUDIO_GROUP_RENDER_ID_ATTR) ?? el.getAttribute(HF_AUDIO_GROUP_ATTR);
}
function audioGroupsById(document2) {
  return new Map(resolveAudioGroups(document2).map((group) => [group.id, group]));
}
function isMemberGroupHidden(groupsById, el) {
  const groupId = memberGroupKey(el);
  return groupId ? groupsById.get(groupId)?.hidden ?? false : false;
}

// ../engine/src/services/videoFrameExtractor.ts
import { copyFileSync as copyFileSync2, existsSync as existsSync8, linkSync as linkSync2, mkdirSync as mkdirSync6, rmSync as rmSync4 } from "fs";
import { join as join10 } from "path";

// ../engine/src/services/referenceResolver.ts
function findReferenceTargetEl(doc, refId) {
  return doc.getElementById(refId) ?? doc.querySelector(`[data-composition-id="${refId}"]`);
}
function resolveReferencedStart(doc, el, startCache, visiting) {
  const cached = startCache.get(el);
  if (cached !== void 0) return cached;
  if (visiting.has(el)) return 0;
  visiting.add(el);
  try {
    const expression = parseStartExpression(el.getAttribute("data-start"));
    if (!expression) {
      startCache.set(el, 0);
      return 0;
    }
    if (expression.kind === "absolute") {
      const value = Math.max(0, expression.value);
      startCache.set(el, value);
      return value;
    }
    const target = findReferenceTargetEl(doc, expression.refId);
    if (!target) {
      startCache.set(el, 0);
      return 0;
    }
    const targetStart = resolveReferencedStart(doc, target, startCache, visiting);
    const targetDuration = resolveReferencedDuration(doc, target, startCache, visiting);
    const resolved = targetDuration != null && targetDuration > 0 ? Math.max(0, targetStart + targetDuration + expression.offset) : Math.max(0, targetStart + expression.offset);
    startCache.set(el, resolved);
    return resolved;
  } finally {
    visiting.delete(el);
  }
}
function resolveReferencedDuration(doc, el, startCache, visiting) {
  const durationAttr = parseNumeric(el.getAttribute("data-duration"));
  if (durationAttr != null && durationAttr > 0) return durationAttr;
  const endAttr = parseNumeric(el.getAttribute("data-end"));
  if (endAttr != null) {
    const start = resolveReferencedStart(doc, el, startCache, visiting);
    const delta = endAttr - start;
    if (Number.isFinite(delta) && delta > 0) return delta;
  }
  return null;
}

// ../engine/src/services/mediaTimelineWindow.ts
function isKnownInactiveTimelineWindow(element, resolvedStart) {
  const duration = parseStrictFiniteTimingNumber(element.getAttribute("data-duration"));
  if (duration != null && duration <= 0) return true;
  const end = parseStrictFiniteTimingNumber(element.getAttribute("data-end"));
  return end != null && end <= resolvedStart;
}

// ../engine/src/utils/alphaPlaneProbe.ts
import { mkdtempSync as mkdtempSync2, readFileSync as readFileSync4, rmSync } from "fs";
import { tmpdir as tmpdir2 } from "os";
import { join as join6 } from "path";
var BYTES_PER_SAMPLE_FRAME = 8 * 8 * 4;
var MAX_SAMPLE_BYTES = BYTES_PER_SAMPLE_FRAME * 3;
function sampledRgbaAlphaIsFullyOpaque(buf) {
  if (buf.length === 0 || buf.length > MAX_SAMPLE_BYTES || buf.length % BYTES_PER_SAMPLE_FRAME !== 0) {
    return void 0;
  }
  for (let i = 3; i < buf.length; i += 4) {
    if (buf[i] !== 255) return false;
  }
  return true;
}
async function probeInputAlphaPlane(videoPath, decoder, signal) {
  let probeDir;
  try {
    probeDir = mkdtempSync2(join6(tmpdir2(), "hf-alpha-probe-"));
    const samplePath = join6(probeDir, "alpha.raw");
    const result = await runFfmpeg(
      [
        "-v",
        "error",
        "-c:v",
        decoder,
        "-i",
        videoPath,
        "-frames:v",
        "3",
        "-vf",
        "scale=8:8",
        "-pix_fmt",
        "rgba",
        "-f",
        "rawvideo",
        samplePath
      ],
      { timeout: 3e4, signal }
    );
    if (!result.success) return void 0;
    return sampledRgbaAlphaIsFullyOpaque(readFileSync4(samplePath));
  } catch {
    return void 0;
  } finally {
    if (probeDir) rmSync(probeDir, { recursive: true, force: true });
  }
}
function inputAlphaOpaqueWarning(src) {
  return `[hyperframes:render] WARNING: video src="${src}" declares an alpha channel but its first frames decode fully opaque. If it should be transparent, re-export it with an alpha pixel format and avoid remuxing afterward, which can drop the alpha while keeping the tag.
`;
}

// ../engine/src/utils/urlDownloader.ts
import {
  closeSync as closeSync2,
  createReadStream as createReadStream2,
  createWriteStream,
  existsSync as existsSync6,
  fsyncSync,
  linkSync,
  mkdtempSync as mkdtempSync3,
  mkdirSync as mkdirSync4,
  lstatSync,
  openSync as openSync2,
  readdirSync as readdirSync3,
  rmdirSync,
  rmSync as rmSync2,
  statSync as statSync4,
  unlinkSync
} from "fs";
import { createHash, randomUUID } from "crypto";
import { BlockList, isIP } from "net";
import { dirname as dirname4, extname as extname2, join as join7 } from "path";
import { Readable, Transform } from "stream";
import { pipeline } from "stream/promises";
var inFlightDownloads = /* @__PURE__ */ new Map();
var signalScopes = /* @__PURE__ */ new WeakMap();
var nextSignalScope = 1;
function signalScopeKey(signal) {
  if (!signal) return "none";
  let scope = signalScopes.get(signal);
  if (scope === void 0) {
    scope = nextSignalScope;
    nextSignalScope += 1;
    signalScopes.set(signal, scope);
  }
  return String(scope);
}
function safeDownloadUrlIdentity(url) {
  let canonical = url;
  let host;
  try {
    const parsed = new URL(url);
    canonical = `${parsed.origin}${parsed.pathname}`;
    host = parsed.hostname.toLowerCase();
  } catch {
  }
  return {
    urlFingerprint: createHash("sha256").update(canonical).digest("hex"),
    host
  };
}
function writeUrlDownloadTelemetry(event) {
  try {
    process.stderr.write(`[hyperframes:download] ${JSON.stringify(event)}
`);
  } catch {
  }
}
var UrlDownloadError = class extends Error {
  constructor(kind, retryable, message, status, telemetry, locallyRetryable = retryable) {
    super(message);
    this.kind = kind;
    this.retryable = retryable;
    this.status = status;
    this.telemetry = telemetry;
    this.locallyRetryable = locallyRetryable;
    this.name = "UrlDownloadError";
  }
  kind;
  retryable;
  status;
  telemetry;
  locallyRetryable;
};
function classifyHttpFailure(status) {
  const message = `HTTP ${status}`;
  if (status === 404 || status === 410) {
    return new UrlDownloadError("http_not_found", false, message, status);
  }
  if (status === 408 || status === 429 || status >= 500) {
    return new UrlDownloadError("http_transient", true, message, status);
  }
  return new UrlDownloadError("http_rejected", false, message, status);
}
function classifyDownloadFailure(error) {
  if (error instanceof UrlDownloadError) return error;
  let current = error;
  for (let depth = 0; current && depth < 4; depth += 1) {
    if (isRetryableNetworkCause(current)) {
      return new UrlDownloadError(
        "network",
        true,
        `Download failed due to a transient network error${describeCause(current)}`
      );
    }
    current = typeof current === "object" && current !== null && "cause" in current ? current.cause : void 0;
  }
  return new UrlDownloadError(
    "filesystem",
    false,
    `Download failed while writing the local artifact${describeCause(error)}`
  );
}
function describeCause(error) {
  const name = error instanceof Error && /^[A-Za-z]{1,40}$/.test(error.name) ? error.name : "";
  const rawCode = typeof error === "object" && error !== null && "code" in error ? error.code : void 0;
  const code = typeof rawCode === "string" && /^[A-Z0-9_]{1,40}$/.test(rawCode) ? rawCode : "";
  const tag = [name, code].filter(Boolean).join(" ");
  return tag ? ` (${tag})` : "";
}
var RETRYABLE_NETWORK_CODES = /* @__PURE__ */ new Set(["ECONNRESET", "ECONNREFUSED", "ETIMEDOUT", "EAI_AGAIN"]);
function isRetryableNetworkCause(error) {
  const message = error instanceof Error ? error.message : String(error);
  const code = typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : "";
  return RETRYABLE_NETWORK_CODES.has(code) || code.startsWith("UND_ERR_") || /fetch failed|network|socket|connection reset|terminated/i.test(message);
}
var NON_PUBLIC_IPV4_ADDRESSES = new BlockList();
for (const [network, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4]
]) {
  NON_PUBLIC_IPV4_ADDRESSES.addSubnet(network, prefix, "ipv4");
}
var NON_PUBLIC_IPV6_ADDRESSES = new BlockList();
for (const [network, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["::ffff:0:0", 96],
  ["fc00::", 7],
  ["fe80::", 10],
  ["fec0::", 10],
  ["ff00::", 8],
  ["2001:db8::", 32]
]) {
  NON_PUBLIC_IPV6_ADDRESSES.addSubnet(network, prefix, "ipv6");
}
function isBlockedNetworkHost(hostname) {
  const h = hostname.toLowerCase().replace(/\.$/, "").replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal"))
    return true;
  const addressType = isIP(h);
  if (addressType === 0) return false;
  return addressType === 4 ? NON_PUBLIC_IPV4_ADDRESSES.check(h, "ipv4") : NON_PUBLIC_IPV6_ADDRESSES.check(h, "ipv6");
}
function assertPublicHttpsUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("[URLDownloader] Invalid URL");
  }
  if (parsed.protocol !== "https:") {
    throw new Error(`[URLDownloader] Only HTTPS URLs are permitted in compositions`);
  }
  if (isBlockedNetworkHost(parsed.hostname)) {
    throw new Error("[URLDownloader] URL targets a private/reserved address and is not permitted");
  }
}
function getFilenameFromUrl(url, validationScope) {
  const physicalIdentity = validationScope === "" ? url : `${url}\0${validationScope}`;
  const hash = createHash("md5").update(physicalIdentity).digest("hex").slice(0, 12);
  const urlObj = new URL(url);
  const ext = extname2(urlObj.pathname) || ".mp4";
  return `download_${hash}${ext}`;
}
function sameFileIdentity(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}
var CACHE_LOCK_POLL_MS = 10;
var CACHE_LOCK_STALE_MS = 5 * 6e4;
var CACHE_LOCK_RECLAIM_NAME = ".hf-reclaim";
var CACHE_LOCK_OWNER_PREFIX = ".hf-owner-";
function sameCacheLockStatGeneration(left, right) {
  return sameFileIdentity(left, right) && left.mtimeMs === right.mtimeMs && left.ctimeMs === right.ctimeMs && left.birthtimeMs === right.birthtimeMs;
}
function observeCachePathLock(lockPath) {
  for (let pass = 0; pass < 3; pass += 1) {
    const before = lstatSync(lockPath);
    const owner = readdirSync3(lockPath).find((name) => name.startsWith(CACHE_LOCK_OWNER_PREFIX));
    const after = lstatSync(lockPath);
    if (sameCacheLockStatGeneration(before, after)) return { stats: after, owner };
  }
  throw new UrlDownloadError("filesystem", true, "Cache lock changed repeatedly during inspection");
}
function sameCachePathLock(left, right) {
  if (left.owner !== void 0 || right.owner !== void 0) {
    return left.owner !== void 0 && left.owner === right.owner;
  }
  return sameFileIdentity(left.stats, right.stats);
}
function removeCacheLockDirectoryIfEmpty(lockPath) {
  try {
    rmdirSync(lockPath);
  } catch (error) {
    const code = error.code;
    if (code !== "ENOENT" && code !== "ENOTEMPTY" && code !== "EEXIST") throw error;
  }
}
function releaseOwnedCachePathLock(lockPath, owner) {
  try {
    rmdirSync(join7(lockPath, owner));
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  removeCacheLockDirectoryIfEmpty(lockPath);
}
async function waitForCacheLock(signal) {
  if (signal?.aborted) {
    throw new UrlDownloadError("cancelled", false, "Download cancelled");
  }
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, CACHE_LOCK_POLL_MS);
    const onAbort = () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", onAbort);
      reject(new UrlDownloadError("cancelled", false, "Download cancelled"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
async function acquireCachePathLock(localPath, timeoutMs, signal) {
  const lockPath = `${localPath}.hf-lock`;
  const startedAt = Date.now();
  for (; ; ) {
    if (signal?.aborted) {
      throw new UrlDownloadError("cancelled", false, "Download cancelled");
    }
    let createdLock = false;
    try {
      mkdirSync4(lockPath);
      createdLock = true;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
    }
    if (createdLock) {
      const owner = `${CACHE_LOCK_OWNER_PREFIX}${randomUUID()}`;
      try {
        mkdirSync4(join7(lockPath, owner));
        const entries = readdirSync3(lockPath);
        if (entries.length === 1 && entries[0] === owner) {
          return () => releaseOwnedCachePathLock(lockPath, owner);
        }
        rmdirSync(join7(lockPath, owner));
        removeCacheLockDirectoryIfEmpty(lockPath);
        continue;
      } catch (error) {
        if (error.code === "ENOENT") continue;
        throw error;
      }
    }
    let observedLock;
    try {
      observedLock = observeCachePathLock(lockPath);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (Date.now() - observedLock.stats.mtimeMs > CACHE_LOCK_STALE_MS) {
      if (observedLock.owner) {
        try {
          rmdirSync(join7(lockPath, observedLock.owner));
        } catch (error) {
          if (error.code === "ENOENT") continue;
          throw error;
        }
        removeCacheLockDirectoryIfEmpty(lockPath);
        continue;
      }
      const reclaimPath = join7(lockPath, CACHE_LOCK_RECLAIM_NAME);
      try {
        mkdirSync4(reclaimPath);
      } catch (error) {
        const code = error.code;
        if (code === "EEXIST" || code === "ENOENT") continue;
        throw error;
      }
      try {
        const currentLock = observeCachePathLock(lockPath);
        if (sameCachePathLock(currentLock, observedLock)) {
          rmdirSync(reclaimPath);
          removeCacheLockDirectoryIfEmpty(lockPath);
        } else {
          rmdirSync(reclaimPath);
        }
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
      continue;
    }
    if (Date.now() - startedAt >= timeoutMs) {
      throw new UrlDownloadError(
        "timeout",
        true,
        `Download cache lock timeout after ${timeoutMs / 1e3}s`
      );
    }
    await waitForCacheLock(signal);
  }
}
var REDIRECT_STATUSES = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var MAX_REDIRECTS = 5;
function assertAllowedDownloadUrl(url, redirect) {
  try {
    assertPublicHttpsUrl(url);
  } catch {
    throw new UrlDownloadError(
      "http_rejected",
      false,
      redirect ? "Download redirect target is not permitted" : "Download URL is not permitted"
    );
  }
}
async function cancelResponseBody(response) {
  try {
    await response.body?.cancel();
  } catch {
  }
}
function resolveRedirectUrl(response, currentUrl, redirects) {
  if (redirects >= MAX_REDIRECTS) {
    throw new UrlDownloadError("http_rejected", false, "Download exceeded redirect limit");
  }
  const location = response.headers.get("location");
  if (!location) {
    throw new UrlDownloadError(
      "http_rejected",
      false,
      "Download redirect omitted a Location header"
    );
  }
  try {
    return new URL(location, currentUrl).toString();
  } catch {
    throw new UrlDownloadError("http_rejected", false, "Download redirect Location is invalid");
  }
}
async function fetchWithValidatedRedirects(initialUrl, controller) {
  let currentUrl = initialUrl;
  for (let redirects = 0; ; redirects += 1) {
    assertAllowedDownloadUrl(currentUrl, redirects > 0);
    const response = await fetch(currentUrl, {
      signal: controller.signal,
      redirect: "manual",
      headers: { "accept-encoding": "identity" }
    });
    if (!REDIRECT_STATUSES.has(response.status)) return { response, finalUrl: currentUrl };
    await cancelResponseBody(response);
    currentUrl = resolveRedirectUrl(response, currentUrl, redirects);
  }
}
async function fetchPublicHttpsText(url, options) {
  const timeoutMs = options.timeoutMs ?? 15e3;
  if (!Number.isSafeInteger(options.maxBytes) || options.maxBytes <= 0) {
    throw new RangeError("maxBytes must be a positive safe integer");
  }
  assertPublicHttpsUrl(url);
  const controller = new AbortController();
  let timedOut = false;
  let callerAborted = options.signal?.aborted ?? false;
  const onCallerAbort = () => {
    callerAborted = true;
    controller.abort();
  };
  options.signal?.addEventListener("abort", onCallerAbort, { once: true });
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  try {
    if (callerAborted) {
      throw new UrlDownloadError("cancelled", false, "Text fetch cancelled");
    }
    const { response } = await fetchWithValidatedRedirects(url, controller);
    if (!response.ok) {
      await cancelResponseBody(response);
      throw classifyHttpFailure(response.status);
    }
    if (!response.body) return "";
    let declaredLength;
    try {
      declaredLength = parseDeclaredLength(response);
    } catch (error) {
      await cancelResponseBody(response);
      throw error;
    }
    const contentEncoding = response.headers.get("content-encoding")?.trim().toLowerCase();
    const expectedBytes = !contentEncoding || contentEncoding === "identity" ? declaredLength : void 0;
    if (declaredLength !== void 0 && declaredLength > options.maxBytes) {
      await cancelResponseBody(response);
      throw new UrlDownloadError(
        "length_mismatch",
        false,
        "Text response exceeded the configured byte limit",
        response.status
      );
    }
    const reader = response.body.getReader();
    const chunks = [];
    let receivedBytes = 0;
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedBytes += value.byteLength;
      if (receivedBytes > options.maxBytes) {
        await reader.cancel();
        throw new UrlDownloadError(
          "length_mismatch",
          false,
          "Text response exceeded the configured byte limit",
          response.status,
          { receivedBytes }
        );
      }
      chunks.push(value);
    }
    if (expectedBytes !== void 0 && receivedBytes !== expectedBytes) {
      throw new UrlDownloadError(
        "length_mismatch",
        true,
        "Text response byte count did not match its declared length",
        response.status,
        { expectedBytes, receivedBytes }
      );
    }
    return new TextDecoder().decode(Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))));
  } catch (error) {
    if (callerAborted) {
      throw new UrlDownloadError("cancelled", false, "Text fetch cancelled");
    }
    if (timedOut) {
      throw new UrlDownloadError("timeout", true, `Text fetch timeout after ${timeoutMs / 1e3}s`);
    }
    throw classifyDownloadFailure(error);
  } finally {
    clearTimeout(timeoutId);
    options.signal?.removeEventListener("abort", onCallerAbort);
    controller.abort();
  }
}
function parseDeclaredLength(response) {
  const raw = response.headers.get("content-length");
  if (raw === null) return void 0;
  if (!/^\d+$/.test(raw.trim())) {
    throw new UrlDownloadError(
      "length_mismatch",
      true,
      "Download response Content-Length is malformed",
      response.status,
      { status: response.status }
    );
  }
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new UrlDownloadError(
      "length_mismatch",
      true,
      "Download response Content-Length is out of range",
      response.status,
      { status: response.status }
    );
  }
  return value;
}
function classifyRangeDisposition(response) {
  const contentRange = response.headers.get("content-range");
  if (response.status === 206) {
    const match2 = contentRange?.match(/^bytes (\d+)-(\d+)\/(\d+|\*)$/i);
    if (!match2) return "malformed_206";
    const start2 = Number(match2[1]);
    const end2 = Number(match2[2]);
    const total2 = match2[3] === "*" ? void 0 : Number(match2[3]);
    if (!Number.isSafeInteger(start2) || !Number.isSafeInteger(end2) || start2 < 0 || end2 < start2 || total2 !== void 0 && (!Number.isSafeInteger(total2) || total2 <= end2)) {
      return "malformed_206";
    }
    return "unsolicited_206";
  }
  if (response.status !== 200 || contentRange === null) return "none";
  const match = contentRange.match(/^bytes (\d+)-(\d+)\/(\d+)$/i);
  const contentLength = response.headers.get("content-length")?.trim();
  const contentEncoding = response.headers.get("content-encoding")?.trim().toLowerCase();
  if (!match || !contentLength || !/^\d+$/.test(contentLength)) {
    return "content_range_on_200";
  }
  const start = Number(match[1]);
  const end = Number(match[2]);
  const total = Number(match[3]);
  const declaredLength = Number(contentLength);
  return Number.isSafeInteger(start) && Number.isSafeInteger(end) && Number.isSafeInteger(total) && Number.isSafeInteger(declaredLength) && start === 0 && total > 0 && end === total - 1 && declaredLength === total && (!contentEncoding || contentEncoding === "identity") ? "full_object_200" : "content_range_on_200";
}
function looksLikeRemoteErrorDocument(prefix) {
  const text = prefix.toString("utf8").replace(/^\uFEFF?\s*/, "").toLowerCase();
  return text.startsWith("<!doctype html") || text.startsWith("<html") || text.startsWith("<head") || text.startsWith("<body") || text.startsWith("<error") || /^\{\s*"(?:error|message|detail|code|status)"\s*:/i.test(text) || /^<\?xml\b/.test(text) && /<(?:html|error)\b/.test(text);
}
function normalizeCallerSha256(value) {
  if (value === void 0) return void 0;
  const normalized = value.trim().toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(normalized)) {
    throw new UrlDownloadError(
      "hash_mismatch",
      false,
      "Caller-provided SHA-256 checksum is malformed"
    );
  }
  return normalized;
}
function expectedResponseSha256(response, callerSha256) {
  if (callerSha256) return { value: callerSha256, encoding: "hex", source: "caller" };
  const amazonChecksum = response.headers.get("x-amz-checksum-sha256")?.trim();
  const amazonChecksumType = response.headers.get("x-amz-checksum-type")?.trim().toUpperCase();
  if (amazonChecksum && amazonChecksumType !== "COMPOSITE") {
    return { value: amazonChecksum, encoding: "base64", source: "server" };
  }
  const digest = response.headers.get("digest");
  const sha256Digest = digest?.match(/(?:^|,)\s*sha-256=:?([^,:\s]+):?/i)?.[1];
  return sha256Digest ? { value: sha256Digest, encoding: "base64", source: "server" } : null;
}
function checksumMismatchError(source, status, telemetry) {
  return new UrlDownloadError(
    "hash_mismatch",
    source === "server",
    "Download payload checksum did not match",
    status,
    telemetry,
    true
  );
}
async function fetchToPartial(url, partialPath, controller, options) {
  const { response, finalUrl } = await fetchWithValidatedRedirects(url, controller);
  const finalIdentity = safeDownloadUrlIdentity(finalUrl);
  const rangeDisposition = classifyRangeDisposition(response);
  if (rangeDisposition !== "none" && rangeDisposition !== "full_object_200") {
    await cancelResponseBody(response);
    throw new UrlDownloadError(
      "range_protocol",
      true,
      rangeDisposition === "malformed_206" ? "Download received a malformed unsolicited partial response" : "Download received an unsolicited partial response",
      response.status,
      {
        finalHost: finalIdentity.host,
        status: response.status,
        rangeDisposition
      }
    );
  }
  if (!response.ok) {
    try {
      await response.body?.cancel();
    } catch {
    }
    const classified = classifyHttpFailure(response.status);
    throw new UrlDownloadError(
      classified.kind,
      classified.retryable,
      classified.message,
      classified.status,
      { finalHost: finalIdentity.host, status: response.status, rangeDisposition }
    );
  }
  if (!response.body) {
    throw new UrlDownloadError(
      "empty_body",
      true,
      "Download response body is empty",
      response.status,
      {
        finalHost: finalIdentity.host,
        status: response.status
      }
    );
  }
  let declaredLength;
  try {
    declaredLength = parseDeclaredLength(response);
  } catch (error) {
    await cancelResponseBody(response);
    if (error instanceof UrlDownloadError) {
      throw new UrlDownloadError(error.kind, error.retryable, error.message, error.status, {
        ...error.telemetry,
        finalHost: finalIdentity.host,
        rangeDisposition
      });
    }
    throw error;
  }
  const contentEncoding = response.headers.get("content-encoding")?.trim().toLowerCase();
  const expectedBytes = !contentEncoding || contentEncoding === "identity" ? declaredLength : void 0;
  let receivedBytes = 0;
  const sha256 = createHash("sha256");
  const md5 = createHash("md5");
  const prefixChunks = [];
  let prefixBytes = 0;
  const inspector = new Transform({
    transform(chunk, _encoding, callback) {
      const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      receivedBytes += bytes.length;
      sha256.update(bytes);
      md5.update(bytes);
      if (prefixBytes < 1024) {
        const remaining = 1024 - prefixBytes;
        const sample = bytes.subarray(0, remaining);
        prefixChunks.push(sample);
        prefixBytes += sample.length;
      }
      callback(null, bytes);
    }
  });
  const readableStream = Readable.fromWeb(response.body);
  const fileStream = createWriteStream(partialPath, { flags: "wx" });
  await pipeline(readableStream, inspector, fileStream, { signal: controller.signal });
  const localSize = statSync4(partialPath).size;
  const sha256Bytes = sha256.digest();
  const localSha256 = sha256Bytes.toString("hex");
  const md5Base64 = md5.digest("base64");
  const telemetry = {
    finalHost: finalIdentity.host,
    status: response.status,
    expectedBytes,
    receivedBytes,
    rangeDisposition,
    localSize,
    localSha256
  };
  if (receivedBytes === 0 || localSize === 0) {
    throw new UrlDownloadError(
      "empty_body",
      true,
      "Download response body contained zero bytes",
      response.status,
      telemetry
    );
  }
  if (localSize !== receivedBytes || expectedBytes !== void 0 && receivedBytes !== expectedBytes) {
    throw new UrlDownloadError(
      "length_mismatch",
      true,
      "Download response byte count did not match its declared length",
      response.status,
      telemetry
    );
  }
  const prefix = Buffer.concat(prefixChunks);
  if (looksLikeRemoteErrorDocument(prefix)) {
    throw new UrlDownloadError(
      "invalid_payload",
      false,
      "Download returned an HTML or JSON error document",
      response.status,
      telemetry
    );
  }
  const expectedSha256 = expectedResponseSha256(response, options.expectedSha256);
  const checksumMatches = expectedSha256 === null || (expectedSha256.encoding === "base64" ? sha256Bytes.toString("base64") === expectedSha256.value : localSha256 === expectedSha256.value);
  const contentMd5 = response.headers.get("content-md5")?.trim();
  if (!checksumMatches) {
    throw checksumMismatchError(expectedSha256?.source ?? "server", response.status, telemetry);
  }
  if (expectedSha256 === null && contentMd5 && md5Base64 !== contentMd5) {
    throw checksumMismatchError("server", response.status, telemetry);
  }
  const etag = response.headers.get("etag")?.trim();
  return {
    finalHost: finalIdentity.host,
    status: response.status,
    expectedBytes,
    receivedBytes,
    rangeDisposition,
    etagFingerprint: etag ? createHash("sha256").update(etag).digest("hex") : void 0,
    etagWeak: etag ? /^W\//i.test(etag) : void 0,
    localSize,
    localSha256
  };
}
function syncAndPublishPartial(partialPath, localPath) {
  const fd = openSync2(partialPath, "r+");
  try {
    fsyncSync(fd);
  } finally {
    closeSync2(fd);
  }
  try {
    linkSync(partialPath, localPath);
    unlinkSync(partialPath);
    return "published";
  } catch (error) {
    const code = error.code;
    if (code !== "EEXIST") throw error;
    let winner;
    try {
      winner = lstatSync(localPath);
    } catch (inspectionError) {
      if (inspectionError.code !== "ENOENT") throw inspectionError;
      throw new UrlDownloadError(
        "filesystem",
        true,
        "Concurrent cache artifact disappeared before validation"
      );
    }
    if (!winner.isFile() || winner.size === 0) throw error;
    return "race_reused";
  }
}
function emitDownloadTelemetry(options, event) {
  try {
    options.onTelemetry?.(event);
  } catch {
  }
}
async function runDownloadAttempt(url, localPath, timeoutMs, attempt, options, signal) {
  const attemptDir = mkdtempSync3(join7(dirname4(localPath), ".hf-download-"));
  const partialPath = join7(attemptDir, "payload");
  const controller = new AbortController();
  let timedOut = false;
  let callerAborted = signal?.aborted ?? false;
  const onCallerAbort = () => {
    callerAborted = true;
    controller.abort();
  };
  signal?.addEventListener("abort", onCallerAbort, { once: true });
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const identity = safeDownloadUrlIdentity(url);
  try {
    if (callerAborted) {
      throw new UrlDownloadError("cancelled", false, "Download cancelled");
    }
    const integrity = await fetchToPartial(url, partialPath, controller, options);
    let outcome = syncAndPublishPartial(partialPath, localPath);
    let publishedIntegrity = integrity;
    if (outcome === "race_reused") {
      let inspection;
      try {
        inspection = await inspectExistingFile(localPath);
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        throw new UrlDownloadError(
          "filesystem",
          true,
          "Concurrent cache artifact disappeared before validation",
          integrity.status,
          integrity
        );
      }
      publishedIntegrity = {
        ...integrity,
        localSize: inspection.localSize,
        localSha256: inspection.localSha256
      };
      if (!localInspectionMatchesOptions(inspection, options)) {
        if (looksLikeRemoteErrorDocument(inspection.prefix)) {
          throw new UrlDownloadError(
            "invalid_payload",
            false,
            "Concurrent download published an HTML or JSON error document",
            integrity.status,
            publishedIntegrity
          );
        }
        throw checksumMismatchError("caller", integrity.status, publishedIntegrity);
      }
    }
    emitDownloadTelemetry(options, {
      urlFingerprint: identity.urlFingerprint,
      initialHost: identity.host,
      attempt,
      outcome,
      ...publishedIntegrity
    });
    return localPath;
  } catch (error) {
    if (callerAborted) {
      const classified2 = new UrlDownloadError("cancelled", false, "Download cancelled");
      emitDownloadTelemetry(options, {
        urlFingerprint: identity.urlFingerprint,
        initialHost: identity.host,
        attempt,
        outcome: "attempt_failed",
        failureKind: classified2.kind
      });
      throw classified2;
    }
    if (timedOut) {
      const classified2 = new UrlDownloadError(
        "timeout",
        true,
        `Download timeout after ${timeoutMs / 1e3}s`
      );
      emitDownloadTelemetry(options, {
        urlFingerprint: identity.urlFingerprint,
        initialHost: identity.host,
        attempt,
        outcome: "attempt_failed",
        failureKind: classified2.kind
      });
      throw classified2;
    }
    const classified = classifyDownloadFailure(error);
    emitDownloadTelemetry(options, {
      urlFingerprint: identity.urlFingerprint,
      initialHost: identity.host,
      attempt,
      outcome: "attempt_failed",
      failureKind: classified.kind,
      ...classified.telemetry
    });
    throw classified;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onCallerAbort);
    controller.abort();
    rmSync2(attemptDir, { recursive: true, force: true });
  }
}
async function downloadWithRetry(url, localPath, timeoutMs, signal, onTransientRetry, options = {}) {
  const maxTransientRetries = 1;
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await runDownloadAttempt(url, localPath, timeoutMs, attempt + 1, options, signal);
    } catch (error) {
      const classified = classifyDownloadFailure(error);
      if (!classified.locallyRetryable || attempt >= maxTransientRetries) {
        const identity2 = safeDownloadUrlIdentity(url);
        throw new UrlDownloadError(
          classified.kind,
          classified.retryable,
          classified.message,
          classified.status,
          {
            ...classified.telemetry,
            urlFingerprint: identity2.urlFingerprint,
            initialHost: identity2.host,
            attempt: attempt + 1
          },
          classified.locallyRetryable
        );
      }
      if (classified.retryable) onTransientRetry?.(classified);
      const identity = safeDownloadUrlIdentity(url);
      emitDownloadTelemetry(options, {
        urlFingerprint: identity.urlFingerprint,
        initialHost: identity.host,
        attempt: attempt + 1,
        outcome: "retrying",
        failureKind: classified.kind,
        ...classified.telemetry
      });
    }
  }
}
async function inspectExistingFile(path) {
  const sha256 = createHash("sha256");
  const prefixChunks = [];
  let prefixBytes = 0;
  let localSize = 0;
  for await (const chunk of createReadStream2(path)) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    localSize += bytes.length;
    sha256.update(bytes);
    if (prefixBytes < 1024) {
      const sample = bytes.subarray(0, 1024 - prefixBytes);
      prefixChunks.push(sample);
      prefixBytes += sample.length;
    }
  }
  return {
    localSize,
    localSha256: sha256.digest("hex"),
    prefix: Buffer.concat(prefixChunks)
  };
}
function localInspectionMatchesOptions(inspection, options) {
  const expectedSha256 = options.expectedSha256?.trim().toLowerCase();
  return inspection.localSize > 0 && !looksLikeRemoteErrorDocument(inspection.prefix) && (!expectedSha256 || inspection.localSha256 === expectedSha256);
}
function sameCacheEntry(before, after) {
  return sameFileIdentity(before, after) && before.size === after.size && before.mtimeMs === after.mtimeMs;
}
async function reuseOrInvalidateCachedFile(url, localPath, timeoutMs, signal, options) {
  const releaseLock = await acquireCachePathLock(localPath, timeoutMs, signal);
  try {
    for (let pass = 0; pass < 3; pass += 1) {
      let before;
      try {
        before = lstatSync(localPath);
      } catch (error) {
        if (error.code === "ENOENT") continue;
        throw error;
      }
      if (!before.isFile() || before.size === 0) {
        rmSync2(localPath, { recursive: before.isDirectory(), force: true });
        return false;
      }
      let inspection;
      try {
        inspection = await inspectExistingFile(localPath);
      } catch (error) {
        if (error.code === "ENOENT") continue;
        throw error;
      }
      let after;
      try {
        after = lstatSync(localPath);
      } catch (error) {
        if (error.code === "ENOENT") continue;
        throw error;
      }
      if (!sameCacheEntry(before, after)) continue;
      if (localInspectionMatchesOptions(inspection, options)) {
        const identity = safeDownloadUrlIdentity(url);
        emitDownloadTelemetry(options, {
          urlFingerprint: identity.urlFingerprint,
          initialHost: identity.host,
          attempt: 0,
          outcome: "cache_hit",
          receivedBytes: inspection.localSize,
          localSize: inspection.localSize,
          localSha256: inspection.localSha256,
          rangeDisposition: "none"
        });
        return true;
      }
      rmSync2(localPath, { force: true });
      return false;
    }
    return false;
  } finally {
    releaseLock();
  }
}
async function downloadToTemp(url, destDir, timeoutMs = 3e5, signal, onTransientRetry, options = {}) {
  assertPublicHttpsUrl(url);
  const expectedSha256 = normalizeCallerSha256(options.expectedSha256);
  const normalizedOptions = { ...options, expectedSha256 };
  const cacheKey = `${url}\0${destDir}`;
  const validationScope = expectedSha256 ?? "";
  const inFlightKey = `${cacheKey}\0${timeoutMs}\0${signalScopeKey(signal)}\0${validationScope}`;
  const inFlight = inFlightDownloads.get(inFlightKey);
  if (inFlight) {
    return inFlight;
  }
  if (!existsSync6(destDir)) {
    mkdirSync4(destDir, { recursive: true });
  }
  const filename = getFilenameFromUrl(url, validationScope);
  const localPath = join7(destDir, filename);
  const downloadPromise = (async () => {
    const cacheStartedAt = Date.now();
    const reused = await reuseOrInvalidateCachedFile(
      url,
      localPath,
      timeoutMs,
      signal,
      normalizedOptions
    );
    const remainingTimeoutMs = timeoutMs - (Date.now() - cacheStartedAt);
    if (remainingTimeoutMs <= 0) {
      throw new UrlDownloadError(
        "timeout",
        true,
        `Download cache inspection timeout after ${timeoutMs / 1e3}s`
      );
    }
    if (reused) return localPath;
    return downloadWithRetry(
      url,
      localPath,
      remainingTimeoutMs,
      signal,
      onTransientRetry,
      normalizedOptions
    );
  })();
  const trackedDownload = downloadPromise.finally(() => {
    inFlightDownloads.delete(inFlightKey);
  });
  inFlightDownloads.set(inFlightKey, trackedDownload);
  return trackedDownload;
}
function isHttpUrl(path) {
  return path.startsWith("http://") || path.startsWith("https://");
}

// ../engine/src/utils/htmlTemplate.ts
function getSingleMeaningfulChild(container) {
  let child = null;
  for (const node of Array.from(container.childNodes)) {
    if (node.nodeType === 3 && !(node.textContent || "").trim()) continue;
    if (node.nodeType === 8) continue;
    if (node.nodeType !== 1) return null;
    if (child) return null;
    child = node;
  }
  return child;
}
function unwrapTemplate(html) {
  const lowered = html.toLowerCase();
  if (!lowered.includes("<template") || !lowered.includes("</template>")) {
    return html;
  }
  const { body } = parseHTMLContent(html);
  if (!body) return html;
  let container = body;
  const bodyWrapper = getSingleMeaningfulChild(container);
  if (bodyWrapper?.tagName === "BODY") {
    container = bodyWrapper;
  }
  const template = getSingleMeaningfulChild(container);
  if (template?.tagName !== "TEMPLATE") {
    return html;
  }
  return template.innerHTML ?? html;
}

// ../engine/src/services/extractionCache.ts
import { createHash as createHash2, randomUUID as randomUUID2 } from "crypto";
import {
  existsSync as existsSync7,
  lstatSync as lstatSync2,
  mkdirSync as mkdirSync5,
  readdirSync as readdirSync5,
  renameSync,
  rmSync as rmSync3,
  statSync as statSync5,
  utimesSync,
  writeFileSync as writeFileSync3
} from "fs";
import { join as join9 } from "path";

// ../engine/src/services/extractedFrameIndex.ts
import { readdirSync as readdirSync4 } from "fs";
import { join as join8 } from "path";
var FRAME_FILENAME_PREFIX = "frame_";
var ExtractedFrameSequenceError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ExtractedFrameSequenceError";
  }
};
function extractedFrameIndex(file, format) {
  const match = new RegExp(`^${FRAME_FILENAME_PREFIX}(\\d+)\\.${format}$`).exec(file);
  if (!match) {
    throw new ExtractedFrameSequenceError(`Invalid extracted frame filename: ${file}`);
  }
  const ordinal = Number.parseInt(match[1], 10);
  if (!Number.isSafeInteger(ordinal) || ordinal < 1) {
    throw new ExtractedFrameSequenceError(`Invalid extracted frame ordinal: ${file}`);
  }
  return ordinal - 1;
}
function framePathsFromDirectory(outputDir, format) {
  const suffix = `.${format}`;
  const indexed = /* @__PURE__ */ new Map();
  for (const file of readdirSync4(outputDir)) {
    if (!file.startsWith(FRAME_FILENAME_PREFIX) || !file.endsWith(suffix)) continue;
    const index = extractedFrameIndex(file, format);
    if (indexed.has(index)) {
      throw new ExtractedFrameSequenceError(
        `Duplicate extracted frame index ${index}: ${indexed.get(index)} and ${file}`
      );
    }
    indexed.set(index, join8(outputDir, file));
  }
  const ordered = /* @__PURE__ */ new Map();
  for (let index = 0; index < indexed.size; index += 1) {
    const path = indexed.get(index);
    if (!path) {
      throw new ExtractedFrameSequenceError(
        `Missing extracted frame index ${index} in ${outputDir}`
      );
    }
    ordered.set(index, path);
  }
  return ordered;
}

// ../engine/src/services/extractionCache.ts
var COMPLETE_SENTINEL = ".hf-complete";
var GC_MARKER = ".hf-last-gc";
var SCHEMA_PREFIX = "hfcache-v6-";
var KEY_HEX_CHARS = 16;
function readKeyStat(videoPath) {
  try {
    const stat = statSync5(videoPath);
    return { mtimeMs: Math.floor(stat.mtimeMs), size: stat.size };
  } catch {
    return null;
  }
}
function canonicalKeyBlob(input) {
  const durationForKey = Number.isFinite(input.duration) ? input.duration : -1;
  const blob = {
    p: input.videoPath,
    m: input.mtimeMs,
    s: input.size,
    ms: input.mediaStart,
    d: durationForKey,
    f: input.fps,
    fmt: input.format
  };
  if (input.transform !== void 0) blob.t = input.transform;
  return JSON.stringify(blob);
}
function computeCacheKey(input) {
  return createHash2("sha256").update(canonicalKeyBlob(input)).digest("hex");
}
function cacheEntryDirName(keyHash) {
  return SCHEMA_PREFIX + keyHash.slice(0, KEY_HEX_CHARS);
}
function hasFrameFiles(dir) {
  try {
    return readdirSync5(dir).some((file) => file.startsWith(FRAME_FILENAME_PREFIX));
  } catch {
    return false;
  }
}
function lookupCacheEntry(rootDir, input) {
  const keyHash = computeCacheKey(input);
  const dir = join9(rootDir, cacheEntryDirName(keyHash));
  const complete = existsSync7(join9(dir, COMPLETE_SENTINEL)) && hasFrameFiles(dir);
  return { entry: { dir, keyHash }, hit: complete };
}
function partialCacheEntryDir(entry) {
  return `${entry.dir}.partial-${process.pid}-${randomUUID2().slice(0, 8)}`;
}
function isTargetExistsRenameError(err) {
  const code = err.code;
  return code === "EEXIST" || code === "ENOTEMPTY" || code === "EPERM";
}
function adoptPublishedWinner(entry, partialDir) {
  if (!existsSync7(join9(entry.dir, COMPLETE_SENTINEL))) return null;
  removeDir(partialDir);
  return { dir: entry.dir, published: true };
}
function publishCacheEntry(entry, partialDir) {
  try {
    writeFileSync3(join9(partialDir, COMPLETE_SENTINEL), "", "utf-8");
  } catch {
    return { dir: partialDir, published: false };
  }
  try {
    renameSync(partialDir, entry.dir);
    return { dir: entry.dir, published: true };
  } catch (err) {
    if (!isTargetExistsRenameError(err)) return { dir: partialDir, published: false };
  }
  const winner = adoptPublishedWinner(entry, partialDir);
  if (winner) return winner;
  try {
    rmSync3(entry.dir, { recursive: true, force: true });
  } catch {
    return { dir: partialDir, published: false };
  }
  try {
    renameSync(partialDir, entry.dir);
    return { dir: entry.dir, published: true };
  } catch {
    return adoptPublishedWinner(entry, partialDir) ?? { dir: partialDir, published: false };
  }
}
function touchCacheDir(dir) {
  const now = /* @__PURE__ */ new Date();
  try {
    utimesSync(dir, now, now);
  } catch {
  }
  try {
    utimesSync(join9(dir, COMPLETE_SENTINEL), now, now);
  } catch {
  }
}
function touchCacheEntry(entry) {
  touchCacheDir(entry.dir);
}
var CACHE_GENERATION_PREFIX = "hfcache-v";
function isCacheLikeChild(name) {
  return name.startsWith(CACHE_GENERATION_PREFIX) || name.includes(".partial-");
}
function isPartialChild(name) {
  return name.includes(".partial-");
}
function directorySizeBytes(path) {
  try {
    const stat = lstatSync2(path);
    if (!stat.isDirectory()) return stat.size;
  } catch {
    return 0;
  }
  let total = 0;
  let children;
  try {
    children = readdirSync5(path);
  } catch {
    return 0;
  }
  for (const child of children) {
    const childPath = join9(path, child);
    try {
      const stat = lstatSync2(childPath);
      if (stat.isDirectory()) {
        total += directorySizeBytes(childPath);
      } else {
        total += stat.size;
      }
    } catch {
    }
  }
  return total;
}
function removeDir(path) {
  try {
    rmSync3(path, { recursive: true, force: true });
  } catch {
  }
}
function collectGcEntry(dir, name, now, minAgeMs, stats, remove) {
  try {
    const dirStat = statSync5(dir);
    if (isPartialChild(name) && now - dirStat.mtimeMs >= minAgeMs) {
      remove(dir);
      stats.agedPartialsRemoved += 1;
      return null;
    }
    let lastUseMs = dirStat.mtimeMs;
    try {
      lastUseMs = statSync5(join9(dir, COMPLETE_SENTINEL)).mtimeMs;
    } catch {
    }
    return { dir, size: directorySizeBytes(dir), lastUseMs, ageMs: now - lastUseMs };
  } catch {
    return null;
  }
}
function gcSweepDue(rootDir, maxAgeMs) {
  try {
    return Date.now() - statSync5(join9(rootDir, GC_MARKER)).mtimeMs > maxAgeMs;
  } catch {
    return true;
  }
}
function markGcSweep(rootDir) {
  try {
    writeFileSync3(join9(rootDir, GC_MARKER), "", "utf-8");
  } catch {
  }
}
function gcExtractionCache(rootDir, opts) {
  const stats = { evictedEntries: 0, evictedBytes: 0, agedPartialsRemoved: 0 };
  const remove = opts.dryRun ? () => {
  } : removeDir;
  if (!opts.dryRun) markGcSweep(rootDir);
  try {
    const now = Date.now();
    const entries = [];
    for (const child of readdirSync5(rootDir, { withFileTypes: true })) {
      if (!child.isDirectory() || !isCacheLikeChild(child.name)) continue;
      const entry = collectGcEntry(
        join9(rootDir, child.name),
        child.name,
        now,
        opts.minAgeMs,
        stats,
        remove
      );
      if (entry) entries.push(entry);
    }
    let totalBytes = entries.reduce((sum, e) => sum + e.size, 0);
    if (totalBytes <= opts.maxBytes) return stats;
    entries.sort((a, b) => a.lastUseMs - b.lastUseMs);
    for (const entry of entries) {
      if (entry.ageMs < opts.minAgeMs) continue;
      remove(entry.dir);
      stats.evictedEntries += 1;
      stats.evictedBytes += entry.size;
      totalBytes -= entry.size;
      if (totalBytes <= opts.maxBytes) break;
    }
  } catch {
  }
  return stats;
}
function rehydrateCacheEntry(entry, options) {
  const framePattern = `${FRAME_FILENAME_PREFIX}%05d.${options.format}`;
  const framePaths = framePathsFromDirectory(entry.dir, options.format);
  return {
    videoId: options.videoId,
    srcPath: options.srcPath,
    outputDir: entry.dir,
    framePattern,
    fps: options.fps,
    totalFrames: framePaths.size,
    metadata: options.metadata,
    framePaths
  };
}

// ../engine/src/services/videoFrameExtractor.ts
var VIDEO_FRAME_FORMATS = ["auto", "jpg", "png"];
function isVideoFrameFormat(value) {
  return typeof value === "string" && VIDEO_FRAME_FORMATS.includes(value);
}
function extractionFrameCountForDuration(durationSeconds, fps, isVFR) {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) return 0;
  const serialized = String(durationSeconds).toLowerCase();
  const decimal = /^(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/.exec(serialized);
  if (!decimal) return 0;
  const whole = decimal[1] ?? "0";
  const fraction = decimal[2] ?? "";
  const exponent = Number.parseInt(decimal[3] ?? "0", 10);
  const digits = BigInt(`${whole}${fraction}`);
  const microsecondScale = exponent + 6 - fraction.length;
  const microseconds = microsecondScale >= 0 ? digits * 10n ** BigInt(microsecondScale) : digits / 10n ** BigInt(-microsecondScale);
  let fpsNumerator;
  let fpsDenominator;
  if (typeof fps === "object") {
    if (!Number.isSafeInteger(fps.num) || !Number.isSafeInteger(fps.den) || fps.num <= 0 || fps.den <= 0) {
      return 0;
    }
    fpsNumerator = BigInt(fps.num);
    fpsDenominator = BigInt(fps.den);
  } else {
    if (!Number.isFinite(fps) || fps <= 0) return 0;
    const serializedFps = String(fps).toLowerCase();
    const fpsDecimal = /^(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/.exec(serializedFps);
    if (!fpsDecimal) return 0;
    const fpsWhole = fpsDecimal[1] ?? "0";
    const fpsFraction = fpsDecimal[2] ?? "";
    const fpsExponent = Number.parseInt(fpsDecimal[3] ?? "0", 10);
    const fpsDigits = BigInt(`${fpsWhole}${fpsFraction}`);
    const fpsScale = fpsExponent - fpsFraction.length;
    fpsNumerator = fpsScale >= 0 ? fpsDigits * 10n ** BigInt(fpsScale) : fpsDigits;
    fpsDenominator = fpsScale >= 0 ? 1n : 10n ** BigInt(-fpsScale);
  }
  const frameNumerator = microseconds * fpsNumerator;
  const frameDenominator = 1000000n * fpsDenominator;
  const frameCount = isVFR ? (frameNumerator + frameDenominator - 1n) / frameDenominator : (2n * frameNumerator + frameDenominator) / (2n * frameDenominator);
  const frames = Number(frameCount);
  return Math.max(1, Number.isSafeInteger(frames) ? frames : Number.MAX_SAFE_INTEGER);
}
var EXTRACT_CACHE_MIN_AGE_MS = 60 * 60 * 1e3;
var GC_STALENESS_MS = 24 * 60 * 60 * 1e3;
var SDR_TO_HDR_COLORSPACE_FILTER = "colorspace=all=bt2020:iall=bt709:range=tv";
var HDR_TO_SDR_ZSCALE_TRANSFORM_KEY = "hdr2sdr-hable-srgb";
var HDR_TO_SDR_VIDEOTOOLBOX_TRANSFORM_KEY = "hdr2sdr-videotoolbox-hdr";
var SDR_CANVAS_PASSTHROUGH_FILTER = "setparams=color_primaries=bt709:color_trc=iec61966-2-1";
var SDR_JPEG_AS_BT601_FULL_RANGE_FILTER = "scale=flags=neighbor,format=gbrp,scale=out_color_matrix=bt601:out_range=pc:flags=neighbor,format=yuv420p";
var warnedMissingZscale = false;
async function toneMapsWithZscale() {
  return process.platform !== "darwin" || isFfmpegFilterAvailable("zscale");
}
async function hdrToSdrTransformKey() {
  if (await toneMapsWithZscale()) return HDR_TO_SDR_ZSCALE_TRANSFORM_KEY;
  if (!warnedMissingZscale) {
    warnedMissingZscale = true;
    process.stderr.write(
      "[hyperframes:render] WARNING: this ffmpeg has no zscale filter, so forced-SDR HDR footage is tone-mapped by Chrome instead of the hable curve used on Linux and in Studio, and renders darker. Install an ffmpeg built with libzimg to match.\n"
    );
  }
  return HDR_TO_SDR_VIDEOTOOLBOX_TRANSFORM_KEY;
}
function sdrToHdrTransformKey(transfer) {
  return `sdr2hdr-${transfer}`;
}
function safeVideoExtractionSourceIdentity(source) {
  if (!isHttpUrl(source)) return null;
  const identity = safeDownloadUrlIdentity(source);
  return {
    sourceFingerprint: `sha256:${identity.urlFingerprint}`,
    host: identity.host ?? "other"
  };
}
function downloadStatusClass(error) {
  const status = error.status ?? error.telemetry?.status;
  if (typeof status === "number" && status >= 400 && status < 500) return "http_4xx";
  if (typeof status === "number" && status >= 500 && status < 600) return "http_5xx";
  if (error.kind === "timeout") return "timeout";
  if (error.kind === "network") return "network";
  return "other";
}
function downloadFailureGroup(source, error) {
  const sourceIdentity = safeVideoExtractionSourceIdentity(source);
  const failureHost = error.telemetry?.finalHost ?? error.telemetry?.initialHost;
  const attempt = error.telemetry?.attempt;
  return {
    ...sourceIdentity ? { sourceFingerprint: sourceIdentity.sourceFingerprint } : {},
    ...failureHost ?? sourceIdentity?.host ? { host: failureHost ?? sourceIdentity?.host } : {},
    statusClass: downloadStatusClass(error),
    retry: {
      phase: "download",
      used: typeof attempt === "number" && attempt >= 2 ? 1 : 0,
      budget: 1
    }
  };
}
var VideoSourceExtractionError = class extends Error {
  constructor(kind, retryable, message, diagnostic = message) {
    super(message);
    this.kind = kind;
    this.retryable = retryable;
    this.diagnostic = diagnostic;
    this.name = "VideoSourceExtractionError";
  }
  kind;
  retryable;
  diagnostic;
  hyperframesVideoSourceExtractionError = true;
};
function isVideoSourceExtractionError(error) {
  return typeof error === "object" && error !== null && "hyperframesVideoSourceExtractionError" in error && error.hyperframesVideoSourceExtractionError === true;
}
function boundedTransientRetryBudget(value) {
  return Number.isFinite(value) && (value ?? 0) >= 1 ? 1 : 0;
}
function errorText(error) {
  return error instanceof Error ? error.message : String(error);
}
function classifyVideoExtractionError(error) {
  if (isVideoSourceExtractionError(error)) return error;
  const diagnostic = errorText(error);
  const lowered = diagnostic.toLowerCase();
  if (error instanceof UrlDownloadError) {
    if (error.kind === "cancelled") {
      return new VideoSourceExtractionError(
        "cancelled",
        false,
        "Video extraction cancelled",
        diagnostic
      );
    }
    if (error.kind === "http_not_found") {
      return new VideoSourceExtractionError(
        "download_not_found",
        false,
        "Video source was not found",
        diagnostic
      );
    }
    if (error.kind === "http_rejected") {
      return new VideoSourceExtractionError(
        "source_rejected",
        false,
        "Video source download was rejected",
        diagnostic
      );
    }
    if (error.kind === "invalid_payload") {
      return new VideoSourceExtractionError(
        "invalid_media",
        false,
        "Video source download returned a non-media payload",
        diagnostic
      );
    }
    if (error.retryable) {
      return new VideoSourceExtractionError(
        "download_transient",
        true,
        "Video source download failed transiently",
        diagnostic
      );
    }
    return new VideoSourceExtractionError(
      "internal",
      false,
      "Video source download failed internally",
      diagnostic
    );
  }
  if (lowered.includes("cancelled") || lowered.includes("aborted")) {
    return new VideoSourceExtractionError(
      "cancelled",
      false,
      "Video extraction cancelled",
      diagnostic
    );
  }
  if (lowered.includes("video file not found")) {
    return new VideoSourceExtractionError(
      "source_missing",
      false,
      "Video source is missing",
      diagnostic
    );
  }
  if (lowered.includes("only https urls are permitted") || lowered.includes("private/reserved address") || lowered.includes("invalid url")) {
    return new VideoSourceExtractionError(
      "source_rejected",
      false,
      "Video source URL is not permitted",
      diagnostic
    );
  }
  const httpStatus = diagnostic.match(/\bHTTP\s+(\d{3})\b/i)?.[1];
  if (httpStatus) {
    const status = Number(httpStatus);
    if (status === 404 || status === 410) {
      return new VideoSourceExtractionError(
        "download_not_found",
        false,
        "Video source was not found",
        diagnostic
      );
    }
    if (status === 408 || status === 429 || status >= 500) {
      return new VideoSourceExtractionError(
        "download_transient",
        true,
        "Video source download failed transiently",
        diagnostic
      );
    }
    return new VideoSourceExtractionError(
      "source_rejected",
      false,
      "Video source download was rejected",
      diagnostic
    );
  }
  if (lowered.includes("[urldownloader] download timeout") || lowered.includes("[urldownloader] download failed") || lowered.includes("fetch failed") || lowered.includes("network")) {
    return new VideoSourceExtractionError(
      "download_transient",
      true,
      "Video source download failed transiently",
      diagnostic
    );
  }
  if (lowered.includes("ffprobe not found")) {
    return new VideoSourceExtractionError(
      "ffmpeg_unavailable",
      false,
      "FFprobe is unavailable",
      diagnostic
    );
  }
  if (lowered.includes("ffprobe deadline")) {
    return new VideoSourceExtractionError(
      "ffmpeg_timeout",
      true,
      "Video inspection timed out",
      diagnostic
    );
  }
  if (lowered.includes("ffprobe") || lowered.includes("failed to parse ffprobe output") || lowered.includes("no video stream found")) {
    return new VideoSourceExtractionError(
      "invalid_media",
      false,
      "Video source could not be inspected",
      diagnostic
    );
  }
  return new VideoSourceExtractionError(
    "internal",
    false,
    "Video extraction failed internally",
    diagnostic
  );
}
async function runVideoExtractionWithRetry(operation, options = {}) {
  const maxTransientRetries = boundedTransientRetryBudget(options.maxTransientRetries);
  let retries = 0;
  for (; ; ) {
    if (options.signal?.aborted) {
      throw new VideoSourceExtractionError("cancelled", false, "Video extraction cancelled");
    }
    try {
      return { result: await operation(), retries };
    } catch (error) {
      const classified = classifyVideoExtractionError(error);
      if (options.signal?.aborted) {
        throw new VideoSourceExtractionError(
          "cancelled",
          false,
          "Video extraction cancelled",
          classified.diagnostic
        );
      }
      if (classified.kind === "cancelled" || !classified.retryable || retries >= maxTransientRetries) {
        throw classified;
      }
      retries += 1;
      await options.onRetry?.();
    }
  }
}
function resolveMediaElementSrc(el) {
  const direct = el.getAttribute("src");
  if (direct) return direct;
  let remote = null;
  for (const source of el.querySelectorAll("source")) {
    const src = source.getAttribute("src");
    if (!src) continue;
    if (!/^https?:\/\//i.test(src)) return src;
    remote ??= src;
  }
  return remote;
}
function parseVideoElements(html) {
  const videos = [];
  const { document: document2 } = parseHTML(unwrapTemplate(html));
  const startCache = /* @__PURE__ */ new Map();
  const visiting = /* @__PURE__ */ new Set();
  const groupsById = audioGroupsById(document2);
  const videoEls = document2.querySelectorAll("video");
  let autoIdCounter = 0;
  for (const el of videoEls) {
    const src = resolveMediaElementSrc(el);
    if (!src) continue;
    const id = el.getAttribute(MEDIA_RENDER_ID_ATTR) || el.getAttribute("id") || `hf-video-${autoIdCounter++}`;
    if (!el.getAttribute("id")) {
      el.setAttribute("id", id);
    }
    const startAttr = el.getAttribute("data-start");
    const endAttr = el.getAttribute("data-end");
    const durationAttr = el.getAttribute("data-duration");
    const hasAudioAttr = el.getAttribute("data-has-audio");
    const start = startAttr ? resolveReferencedStart(document2, el, startCache, visiting) : 0;
    if (isKnownInactiveTimelineWindow(el, start)) continue;
    let end = 0;
    const authoredEnd = parseStrictFiniteTimingNumber(endAttr);
    const authoredDuration = parseStrictFiniteTimingNumber(durationAttr);
    if (authoredEnd != null) {
      end = authoredEnd;
    } else if (authoredDuration != null) {
      end = start + authoredDuration;
    } else {
      end = Infinity;
    }
    videos.push({
      id,
      src,
      start,
      end,
      mediaStart: readMediaStart(el),
      playbackRate: readElementRateSpec(el),
      loop: el.hasAttribute("loop"),
      hasAudio: hasAudioAttr === "true",
      ...isSelfOrAncestorHidden(el) || isAudibleVideoElement(el) && isMemberGroupHidden(groupsById, el) ? { hidden: true } : {}
    });
  }
  return videos;
}
function parseImageElements(html) {
  const images = [];
  const { document: document2 } = parseHTML(unwrapTemplate(html));
  const startCache = /* @__PURE__ */ new Map();
  const visiting = /* @__PURE__ */ new Set();
  const imgEls = document2.querySelectorAll("img[src]");
  let autoIdCounter = 0;
  for (const el of imgEls) {
    const src = el.getAttribute("src");
    if (!src) continue;
    const id = el.getAttribute(MEDIA_RENDER_ID_ATTR) || el.getAttribute("id") || `hf-img-${autoIdCounter++}`;
    if (!el.getAttribute("id")) {
      el.setAttribute("id", id);
    }
    const startAttr = el.getAttribute("data-start");
    const endAttr = el.getAttribute("data-end");
    const durationAttr = el.getAttribute("data-duration");
    const start = startAttr ? resolveReferencedStart(document2, el, startCache, visiting) : 0;
    let end = 0;
    const authoredEnd = parseStrictFiniteTimingNumber(endAttr);
    const authoredDuration = parseStrictFiniteTimingNumber(durationAttr);
    if (authoredEnd != null) {
      end = authoredEnd;
    } else if (authoredDuration != null) {
      end = start + authoredDuration;
    } else {
      end = Infinity;
    }
    images.push({ id, src, start, end });
  }
  return images;
}
async function readFirstFrameColour(videoPath, signal) {
  const result = await runFfmpeg(firstFrameColourArgs(videoPath), { signal });
  return parseFirstFrameColour(result.stderr);
}
var CHROME_BT601_UNTAGGED_CODECS = /* @__PURE__ */ new Set(["vp9", "av1"]);
function chromeGuessForUntaggedMatrix(metadata) {
  const matrix = metadata.colorSpace?.colorSpace;
  if (matrix && matrix !== "unknown") return [];
  const hd = metadata.height >= 720 && !CHROME_BT601_UNTAGGED_CODECS.has(metadata.videoCodec);
  return [`setparams=colorspace=${hd ? "bt709" : "smpte170m"}`];
}
var NUT_RAW_PIXEL_FORMATS = /* @__PURE__ */ new Set([
  "yuv420p",
  "yuvj420p",
  "yuv422p",
  "yuvj422p",
  "yuv444p",
  "yuvj444p",
  "yuva420p",
  "yuva444p",
  "yuv440p",
  "yuv411p",
  "yuv410p",
  "yuva422p",
  "yuv420p10le",
  "yuv422p10le",
  "yuv444p10le",
  "yuva420p10le",
  "yuva444p10le",
  "yuv420p12le",
  "nv12",
  "nv21",
  "yuyv422",
  "uyvy422",
  "gray",
  "gray10le",
  "ya8",
  "gbrp",
  "gbrap",
  "gbrp10le",
  "gbrp12le",
  "gbrap10le",
  "rgb24",
  "bgr24",
  "rgba",
  "bgra",
  "argb",
  "abgr",
  "rgb48le",
  "rgba64le"
]);
function restoreSourceColourFilter(metadata) {
  const tags = [
    ["range", metadata.colorRange],
    ["colorspace", metadata.colorSpace?.colorSpace],
    ["color_primaries", metadata.colorSpace?.colorPrimaries],
    ["color_trc", metadata.colorSpace?.colorTransfer]
  ].filter(([, value]) => value && value !== "unknown" && value !== "reserved");
  return tags.length > 0 ? [`setparams=${tags.map(([key, value]) => `${key}=${value}`).join(":")}`] : [];
}
async function extractVideoFramesRange(videoPath, videoId, startTime, duration, options, signal, config, outputDirOverride) {
  const ffmpegProcessTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const { outputDir, quality = 95 } = options;
  const normalizedFps = toFps(options.fps);
  const fps = fpsToNumber(normalizedFps);
  const ffmpegFps = fpsToFfmpegArg(normalizedFps);
  const videoOutputDir = outputDirOverride ?? join10(outputDir, videoId);
  if (!existsSync8(videoOutputDir)) mkdirSync6(videoOutputDir, { recursive: true });
  let metadata;
  try {
    metadata = await extractMediaMetadata(videoPath);
  } catch (error) {
    throw classifyVideoExtractionError(error);
  }
  const playableDuration = resolvePlayableVideoDuration(metadata);
  if (!(playableDuration > 0)) {
    throw new VideoSourceExtractionError(
      "invalid_media",
      false,
      "Video source has no positive duration",
      `Playable video stream duration is ${playableDuration}s`
    );
  }
  if (startTime >= playableDuration) {
    throw new VideoSourceExtractionError(
      "media_start_out_of_range",
      false,
      "Video media start is outside the source duration",
      `Video media start ${startTime}s is outside playable video duration ${playableDuration}s`
    );
  }
  const format = resolveFrameFormat(metadata, options.format);
  const framePattern = `${FRAME_FILENAME_PREFIX}%05d.${format}`;
  const outputPattern = join10(videoOutputDir, framePattern);
  const isHdr = isHdrColorSpace(metadata.colorSpace);
  const isMacOS = process.platform === "darwin";
  const toneMappedToSdr = options.toneMapHdrToSdr === true && isHdr && await toneMapsWithZscale();
  const decodeWithVideoToolbox = isHdr && isMacOS && !toneMappedToSdr;
  const sampleCfrAtOutputFps = !options.finalFrameOnly && !metadata.isVFR;
  const args = [];
  if (decodeWithVideoToolbox) {
    args.push("-hwaccel", "videotoolbox");
  }
  if (codecMayHaveAlpha(metadata.videoCodec)) {
    args.push("-c:v", decoderForCodec(metadata.videoCodec));
  }
  if (options.finalFrameOnly) {
    args.push("-i", videoPath, "-ss", String(startTime), "-frames:v", "1");
  } else {
    if (sampleCfrAtOutputFps) args.push("-noaccurate_seek");
    args.push("-ss", String(startTime), "-i", videoPath, "-t", String(duration));
  }
  const vfFilters = [];
  if (decodeWithVideoToolbox) {
    vfFilters.push("format=nv12");
  }
  if (sampleCfrAtOutputFps) {
    vfFilters.push(
      "settb=intb/2",
      "setpts=PTS-lte(TB\\,0.001)",
      `fps=${ffmpegFps}:start_time=0:round=up`
    );
  }
  if (options.sdrToHdrTransfer) {
    vfFilters.push(SDR_TO_HDR_COLORSPACE_FILTER);
  }
  if (toneMappedToSdr) {
    const frameColour = await readFirstFrameColour(videoPath, signal);
    vfFilters.push(hdrToSdrToneMapFilter(metadata.colorSpace ?? {}, frameColour));
  }
  if (toneMappedToSdr || !isHdr && !options.sdrToHdrTransfer) {
    vfFilters.push(
      ...isHdr ? [] : chromeGuessForUntaggedMatrix(metadata),
      SDR_CANVAS_PASSTHROUGH_FILTER
    );
    if (format === "jpg") vfFilters.push(SDR_JPEG_AS_BT601_FULL_RANGE_FILTER);
  }
  const encodeArgs = ["-q:v", format === "jpg" ? String(Math.ceil((100 - quality) / 3)) : "0"];
  if (format === "png") encodeArgs.push("-compression_level", "1");
  encodeArgs.push("-y", outputPattern);
  const runOptions = { signal, timeout: ffmpegProcessTimeout };
  const resampleVfrToCfr = !options.finalFrameOnly && metadata.isVFR;
  if (resampleVfrToCfr) args.push("-fps_mode", "cfr", "-r", ffmpegFps);
  let processResult;
  if (resampleVfrToCfr && vfFilters.length > 0 && !isHdr && NUT_RAW_PIXEL_FORMATS.has(metadata.pixelFormat ?? "")) {
    processResult = await runFfmpegPipeline(
      [...args, "-an", "-sn", "-dn", "-c:v", "rawvideo", "-f", "nut", "pipe:1"],
      [
        "-f",
        "nut",
        "-i",
        "pipe:0",
        "-vf",
        [...restoreSourceColourFilter(metadata), ...vfFilters].join(","),
        "-fps_mode",
        "passthrough",
        ...encodeArgs
      ],
      runOptions
    );
  } else {
    if (vfFilters.length > 0) args.push("-vf", vfFilters.join(","));
    processResult = await runFfmpeg([...args, ...encodeArgs], runOptions);
  }
  if (processResult.failureReason === "external_interruption") {
    throw new VideoSourceExtractionError(
      "external_interruption",
      true,
      "Video frame extraction interrupted by host lifecycle",
      `FFmpeg exited with code ${processResult.exitCode}: ${processResult.stderr.slice(-500)}`
    );
  }
  if (processResult.terminationReason === "abort") {
    throw new VideoSourceExtractionError("cancelled", false, "Video extraction cancelled");
  }
  if (processResult.terminationReason === "spawn_error") {
    throw classifyFfmpegSpawnError(processResult.error, processResult.stderr);
  }
  if (!processResult.success) {
    const hdrPrefix = options.sdrToHdrTransfer ? `SDR\u2192HDR conversion failed (colorspace filter in extract pass, target ${options.sdrToHdrTransfer}): ` : "";
    const timedOut = processResult.terminationReason === "deadline";
    const timeoutSuffix = timedOut ? ` (timed out after ${ffmpegProcessTimeout} ms)` : "";
    const diagnostic = `${hdrPrefix}FFmpeg exited with code ${processResult.exitCode}${timeoutSuffix}: ` + processResult.stderr.slice(-500);
    if (timedOut) {
      throw new VideoSourceExtractionError(
        "ffmpeg_timeout",
        true,
        "Video frame extraction timed out",
        diagnostic
      );
    }
    const transientIo = /resource temporarily unavailable|device or resource busy|input\/output error/i.test(
      processResult.stderr
    );
    throw new VideoSourceExtractionError(
      transientIo ? "ffmpeg_transient" : "ffmpeg_failed",
      transientIo,
      transientIo ? "Video frame extraction hit a transient I/O failure" : "Video source could not be decoded",
      diagnostic
    );
  }
  const framePaths = framePathsFromDirectory(videoOutputDir, format);
  if (framePaths.size === 0 && duration > 0) {
    throw new VideoSourceExtractionError(
      "zero_output",
      false,
      "Video source produced no decodable frames",
      `FFmpeg exited successfully but produced no frames (start=${startTime}, duration=${duration})`
    );
  }
  if (framePaths.size > 0 && duration > 0 && !options.finalFrameOnly) {
    const expectedAtFps = extractionFrameCountForDuration(duration, normalizedFps, metadata.isVFR);
    if (expectedAtFps > 0 && framePaths.size <= expectedAtFps * 0.6) {
      const correctedDuration = startTime + framePaths.size / fps;
      if (correctedDuration < metadata.videoStreamDurationSeconds) {
        metadata.videoStreamDurationSeconds = correctedDuration;
      }
    }
  }
  return {
    videoId,
    srcPath: videoPath,
    outputDir: videoOutputDir,
    framePattern,
    fps,
    totalFrames: framePaths.size,
    metadata,
    framePaths
  };
}
var TRANSIENT_FFMPEG_SPAWN_CODES = /* @__PURE__ */ new Set(["EAGAIN", "EMFILE", "ENFILE"]);
function classifyFfmpegSpawnError(error, stderr = "") {
  const code = typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : "";
  if (code === "ENOENT") {
    return new VideoSourceExtractionError(
      "ffmpeg_unavailable",
      false,
      "FFmpeg is unavailable",
      "[FFmpeg] ffmpeg not found"
    );
  }
  const diagnostic = error instanceof Error ? error.message : stderr;
  const retryable = TRANSIENT_FFMPEG_SPAWN_CODES.has(code);
  return new VideoSourceExtractionError(
    retryable ? "ffmpeg_transient" : "ffmpeg_failed",
    retryable,
    retryable ? "FFmpeg could not be started due to transient resource pressure" : "FFmpeg could not be started",
    diagnostic
  );
}
function resolveSegmentDuration(requested, mediaStart, sourceDuration) {
  if (Number.isFinite(requested) && requested > 0) return requested;
  const sourceRemaining = sourceDuration - mediaStart;
  return sourceRemaining > 0 ? sourceRemaining : sourceDuration;
}
function resolvePlayableVideoDuration(metadata) {
  return Number.isFinite(metadata.videoStreamDurationSeconds) && metadata.videoStreamDurationSeconds > 0 ? metadata.videoStreamDurationSeconds : metadata.durationSeconds;
}
function canHoldFinalFramePastEof(video) {
  const timelineDuration = video.end - video.start;
  return !video.loop && Number.isFinite(timelineDuration) && timelineDuration > 0;
}
var FINAL_FRAME_LOGICAL_DURATION_SECONDS = 1e-6;
function rebaseVideoToWindow(video, window2) {
  if (window2.preserveTimelinePhase) return;
  const start = Math.abs(window2.compositionStart) < 1e-9 ? 0 : window2.compositionStart;
  video.playbackRate = shiftRateLane(normalizeRateSpec(video.playbackRate), start - video.start);
  video.start = start;
  if (!window2.preserveTimelineEnd) {
    video.end = start + (window2.timelineDurationSeconds ?? window2.durationSeconds);
  }
  video.mediaStart = window2.mediaStart;
}
function resolveTimelineExtractionWindow(video, resolvedDuration, timelineEnd, sourceDuration) {
  const playbackRate = normalizeRateSpec(video.playbackRate);
  const withTimelineDuration = (window2, timelineDurationSeconds) => playbackRate === 1 ? window2 : { ...window2, timelineDurationSeconds };
  if (timelineEnd === void 0) {
    return withTimelineDuration(
      {
        compositionStart: video.start,
        mediaStart: video.mediaStart,
        durationSeconds: sourceTimeAt(playbackRate, resolvedDuration)
      },
      resolvedDuration
    );
  }
  if (!Number.isFinite(timelineEnd)) {
    throw new Error(`Video extraction timelineEnd must be finite; got ${String(timelineEnd)}`);
  }
  const compositionStart = Math.max(0, video.start);
  const trimmedPreroll = compositionStart - video.start;
  const trimmedSourcePreroll = sourceTimeAt(playbackRate, trimmedPreroll);
  const timelineDuration = Math.max(0, timelineEnd - compositionStart);
  const resolvedVisibleDuration = resolvedDuration - trimmedPreroll;
  const visibleDuration = Math.max(0, Math.min(resolvedVisibleDuration, timelineDuration));
  const visibleSourceDuration = typeof playbackRate === "number" ? visibleDuration * playbackRate : sourceTimeAt(playbackRate, trimmedPreroll + visibleDuration) - trimmedSourcePreroll;
  let mediaStart = video.mediaStart + trimmedSourcePreroll;
  if (visibleDuration > 0 && sourceDuration !== void 0) {
    const sourceRemaining = Math.max(0, sourceDuration - video.mediaStart);
    if (sourceRemaining > 0 && video.loop && Number.isFinite(video.end)) {
      const phaseOffset = trimmedSourcePreroll % sourceRemaining;
      const phaseRemaining = sourceRemaining - phaseOffset;
      if (visibleSourceDuration >= phaseRemaining) {
        return withTimelineDuration(
          {
            compositionStart: video.start,
            mediaStart: video.mediaStart,
            durationSeconds: sourceRemaining,
            preserveTimelinePhase: true
          },
          visibleDuration
        );
      }
      mediaStart = video.mediaStart + phaseOffset;
    } else if (sourceRemaining > 0) {
      const sourceVisibleAfterPreroll = Math.max(0, sourceRemaining - trimmedSourcePreroll);
      if (visibleSourceDuration <= sourceVisibleAfterPreroll) {
        return withTimelineDuration(
          {
            compositionStart,
            mediaStart,
            durationSeconds: visibleSourceDuration
          },
          visibleDuration
        );
      }
      const extractionDuration = Math.min(
        sourceRemaining,
        Math.max(sourceVisibleAfterPreroll, FINAL_FRAME_LOGICAL_DURATION_SECONDS)
      );
      const extractionOffset = sourceRemaining - extractionDuration;
      return withTimelineDuration(
        {
          compositionStart: video.start + timeAtSourceTime(playbackRate, extractionOffset),
          mediaStart: video.mediaStart + extractionOffset,
          durationSeconds: extractionDuration,
          preserveTimelineEnd: true,
          ensureFinalFrame: true
        },
        visibleDuration
      );
    } else if (canHoldFinalFramePastEof(video)) {
      const logicalDuration = Math.min(sourceDuration, FINAL_FRAME_LOGICAL_DURATION_SECONDS);
      return withTimelineDuration(
        {
          compositionStart: video.start,
          mediaStart: sourceDuration - logicalDuration,
          durationSeconds: logicalDuration,
          preserveTimelineEnd: true,
          ensureFinalFrame: true
        },
        visibleDuration
      );
    }
  }
  return withTimelineDuration(
    {
      compositionStart,
      mediaStart,
      durationSeconds: visibleSourceDuration
    },
    visibleDuration
  );
}
async function resolveFinalFrameExtractionWindow(videoPath, video, metadata, window2, signal) {
  if (!window2.ensureFinalFrame) return window2;
  const playableDuration = resolvePlayableVideoDuration(metadata);
  const finalFrameTimestamp = await extractFinalVideoFrameTimestamp(
    videoPath,
    {
      videoStreamDurationSeconds: playableDuration,
      videoStreamStartSeconds: metadata.videoStreamStartSeconds
    },
    signal
  );
  if (window2.mediaStart < finalFrameTimestamp - 1e-9) return window2;
  const sourceRemaining = playableDuration - video.mediaStart;
  const logicalDuration = Math.min(
    Math.max(sourceRemaining, window2.durationSeconds),
    FINAL_FRAME_LOGICAL_DURATION_SECONDS
  );
  return {
    compositionStart: Math.max(0, video.start),
    mediaStart: playableDuration - logicalDuration,
    extractionMediaStart: finalFrameTimestamp,
    durationSeconds: logicalDuration,
    ...window2.timelineDurationSeconds !== void 0 ? { timelineDurationSeconds: window2.timelineDurationSeconds } : {},
    preserveTimelineEnd: true,
    finalFrameOnly: true
  };
}
function resolveVideoExtractionWindow(video, metadata, timelineEnd) {
  const playableDuration = resolvePlayableVideoDuration(metadata);
  if (!(playableDuration > 0)) {
    throw new VideoSourceExtractionError(
      "invalid_media",
      false,
      "Video source has no positive duration",
      `Playable video stream duration is ${playableDuration}s`
    );
  }
  const requestedTimelineDuration = video.end - video.start;
  const heldPastEof = video.mediaStart >= playableDuration && canHoldFinalFramePastEof(video);
  if (video.mediaStart >= playableDuration && !heldPastEof) {
    throw new VideoSourceExtractionError(
      "media_start_out_of_range",
      false,
      "Video media start is outside the source duration",
      `Video media start ${video.mediaStart}s is outside playable video duration ${playableDuration}s`
    );
  }
  const playbackRate = normalizeRateSpec(video.playbackRate);
  const resolvedDuration = Number.isFinite(requestedTimelineDuration) && requestedTimelineDuration > 0 ? requestedTimelineDuration : timeAtSourceTime(
    playbackRate,
    resolveSegmentDuration(requestedTimelineDuration, video.mediaStart, playableDuration)
  );
  return resolveTimelineExtractionWindow(
    video,
    resolvedDuration,
    timelineEnd ?? (heldPastEof ? video.end : void 0),
    playableDuration
  );
}
function resolveVideoExtractionDuration(video, metadata, timelineEnd) {
  return resolveVideoExtractionWindow(video, metadata, timelineEnd).durationSeconds;
}
var ALPHA_CAPABLE_CODECS = /* @__PURE__ */ new Set(["vp9", "vp8", "prores"]);
function codecMayHaveAlpha(codec) {
  return ALPHA_CAPABLE_CODECS.has((codec ?? "").toLowerCase());
}
function decoderForCodec(codec) {
  const c = (codec ?? "").toLowerCase();
  if (c === "vp9") return "libvpx-vp9";
  if (c === "vp8") return "libvpx";
  return c;
}
function resolveFrameFormat(metadata, requested) {
  if (metadata.hasAlpha || codecMayHaveAlpha(metadata.videoCodec)) return "png";
  if (requested === "png" || requested === "jpg") return requested;
  return "jpg";
}
function extractedFramesFromDirectory(work, outputDir, srcPath, fps) {
  const framePattern = `${FRAME_FILENAME_PREFIX}%05d.${work.format}`;
  const framePaths = framePathsFromDirectory(outputDir, work.format);
  return {
    videoId: work.video.id,
    srcPath,
    outputDir,
    framePattern,
    fps,
    totalFrames: framePaths.size,
    metadata: work.metadata,
    framePaths
  };
}
function frameFileName(frameNumber, format) {
  return `${FRAME_FILENAME_PREFIX}${String(frameNumber).padStart(5, "0")}.${format}`;
}
function linkOrCopyFrame(src, dest) {
  try {
    linkSync2(src, dest);
  } catch {
    copyFileSync2(src, dest);
  }
}
function supersetGroupingKey(work, fps) {
  return [
    work.videoPath,
    String(fps),
    work.format,
    work.sdrToHdrTransfer ?? "",
    work.hdrToSdrTransformKey ?? "",
    work.finalFrameOnly ? "final" : "range"
  ].join("\0");
}
function isIntegralFrameOffset(offsetSeconds, fps) {
  const frames = offsetSeconds * fps;
  return Math.abs(frames - Math.round(frames)) <= 1e-4;
}
function windowsOverlapOrTouch(misses, baseStart) {
  const unionEnd = Math.max(
    ...misses.map(({ work }) => work.video.mediaStart + work.videoDuration)
  );
  const unionDuration = unionEnd - baseStart;
  const summedDuration = misses.reduce((sum, { work }) => sum + work.videoDuration, 0);
  return unionDuration > 0 && unionDuration <= summedDuration + 1e-9;
}
function buildSupersetGroup(groupId, misses, fps) {
  if (misses.length < 2) return null;
  if (misses.some(({ work }) => work.finalFrameOnly)) return null;
  if (misses.some(({ work }) => work.metadata.isVFR)) return null;
  const baseStart = Math.min(...misses.map(({ work }) => work.video.mediaStart));
  if (!misses.every(({ work }) => isIntegralFrameOffset(work.video.mediaStart - baseStart, fps))) {
    return null;
  }
  if (!windowsOverlapOrTouch(misses, baseStart)) return null;
  const unionEnd = Math.max(
    ...misses.map(({ work }) => work.video.mediaStart + work.videoDuration)
  );
  return {
    groupId,
    baseStart,
    unionDuration: unionEnd - baseStart,
    members: misses.map((miss) => ({
      miss,
      offsetFrames: Math.round((miss.work.video.mediaStart - baseStart) * fps)
    }))
  };
}
function overlapClusters(misses) {
  const sorted = [...misses].sort((a, b) => a.work.video.mediaStart - b.work.video.mediaStart);
  const clusters = [];
  let current = [];
  let currentEnd = -Infinity;
  for (const miss of sorted) {
    const start = miss.work.video.mediaStart;
    const end = start + miss.work.videoDuration;
    if (current.length > 0 && start > currentEnd + 1e-9) {
      clusters.push(current);
      current = [];
      currentEnd = -Infinity;
    }
    current.push(miss);
    currentEnd = Math.max(currentEnd, end);
  }
  if (current.length > 0) clusters.push(current);
  return clusters;
}
function planSupersetGroups(misses, fps) {
  const bySource = /* @__PURE__ */ new Map();
  for (const miss of misses) {
    const key = supersetGroupingKey(miss.work, fps);
    bySource.set(key, [...bySource.get(key) ?? [], miss]);
  }
  const groups = [];
  const direct = [];
  let groupIndex = 0;
  for (const groupMisses of bySource.values()) {
    for (const cluster of overlapClusters(groupMisses)) {
      const group = buildSupersetGroup(`__superset-${groupIndex}`, cluster, fps);
      if (group) {
        groups.push(group);
        groupIndex += 1;
      } else {
        direct.push(...cluster);
      }
    }
  }
  return { groups, direct };
}
function sliceSupersetMember(member, superset, outputDir, fps, configuredFps) {
  const { work } = member.miss;
  rmSync4(outputDir, { recursive: true, force: true });
  mkdirSync6(outputDir, { recursive: true });
  const requestedFrames = extractionFrameCountForDuration(
    work.videoDuration,
    configuredFps,
    work.metadata.isVFR
  );
  const availableFrames = Math.max(0, superset.totalFrames - member.offsetFrames);
  const frameCount = Math.min(requestedFrames, availableFrames);
  for (let i = 0; i < frameCount; i += 1) {
    const sourceFrame = superset.framePaths.get(member.offsetFrames + i);
    if (!sourceFrame) throw new Error(`superset frame ${member.offsetFrames + i} missing`);
    linkOrCopyFrame(sourceFrame, join10(outputDir, frameFileName(i + 1, work.format)));
  }
  return extractedFramesFromDirectory(work, outputDir, work.videoPath, fps);
}
async function extractAllVideoFrames(videos, baseDir, options, signal, config, compiledDir) {
  if (options.timelineEnd !== void 0 && !Number.isFinite(options.timelineEnd)) {
    throw new Error(
      `Video extraction timelineEnd must be finite; got ${String(options.timelineEnd)}`
    );
  }
  const configuredFps = toFps(options.fps);
  const fps = fpsToNumber(configuredFps);
  const fpsKey = fpsToFfmpegArg(configuredFps);
  const startTime = Date.now();
  const extracted = [];
  const errors = [];
  let totalFramesExtracted = 0;
  const breakdown = {
    resolveMs: 0,
    cachePublishFailures: 0,
    cacheGcEvictions: 0,
    cacheGcBytesFreed: 0,
    cacheAgedPartialsCleared: 0,
    hdrProbeMs: 0,
    hdrPreflightMs: 0,
    hdrPreflightCount: 0,
    vfrProbeMs: 0,
    vfrPreflightMs: 0,
    vfrPreflightCount: 0,
    extractMs: 0,
    cacheHits: 0,
    cacheMisses: 0,
    transientRetries: 0
  };
  const recordTransientRetries = (count) => {
    breakdown.transientRetries = (breakdown.transientRetries ?? 0) + count;
  };
  const phase1Start = Date.now();
  const resolvedVideos = [];
  const warnedSrcs = /* @__PURE__ */ new Set();
  for (const video of videos) {
    if (signal?.aborted) break;
    if (options.timelineEnd !== void 0 && video.start >= options.timelineEnd) continue;
    try {
      let videoPath = video.src;
      if (!isHttpUrl(videoPath)) {
        videoPath = resolveProjectRelativeSrc(video.src, baseDir, compiledDir);
      }
      if (isHttpUrl(videoPath)) {
        const downloadDir = join10(options.outputDir, "_downloads");
        mkdirSync6(downloadDir, { recursive: true });
        videoPath = await downloadToTemp(
          videoPath,
          downloadDir,
          void 0,
          signal,
          () => recordTransientRetries(1),
          { onTelemetry: writeUrlDownloadTelemetry }
        );
      }
      if (!existsSync8(videoPath)) {
        if (!warnedSrcs.has(video.src)) {
          warnedSrcs.add(video.src);
          process.stderr.write(
            `[hyperframes:render] WARNING: video src="${video.src}" could not be resolved on disk (looked for ${videoPath}). The rendered output will show this video's first frame for the entire clip duration. If your <video> lives inside a sub-composition, prefer project-root-relative paths (e.g. src="assets/foo.mp4") over "../assets/foo.mp4".
`
          );
        }
        errors.push({
          videoId: video.id,
          kind: "source_missing",
          retryable: false,
          error: `Video file not found: ${videoPath}`
        });
        continue;
      }
      resolvedVideos.push({ video, videoPath });
    } catch (err) {
      const classified = classifyVideoExtractionError(err);
      errors.push({
        videoId: video.id,
        kind: classified.kind,
        retryable: classified.retryable,
        ...err instanceof UrlDownloadError ? { group: downloadFailureGroup(video.src, err) } : {},
        error: classified.diagnostic
      });
    }
  }
  breakdown.resolveMs = Date.now() - phase1Start;
  const cacheKeyInputs = resolvedVideos.map(({ video, videoPath }) => {
    const stat = readKeyStat(videoPath);
    if (!stat) return null;
    return {
      videoPath,
      mtimeMs: stat.mtimeMs,
      size: stat.size,
      mediaStart: video.mediaStart
    };
  });
  const phase2ProbeStart = Date.now();
  const metadataResults = await Promise.all(
    resolvedVideos.map(async ({ video, videoPath }, index) => {
      try {
        const attempted = !options.collectProbeFailures && boundedTransientRetryBudget(options.maxTransientRetries) === 0 ? { result: await extractMediaMetadata(videoPath), retries: 0 } : await runVideoExtractionWithRetry(() => extractMediaMetadata(videoPath), {
          signal,
          maxTransientRetries: options.maxTransientRetries,
          onRetry: () => recordTransientRetries(1)
        });
        return {
          video,
          videoPath,
          metadata: attempted.result,
          cacheKeyInput: cacheKeyInputs[index] ?? null
        };
      } catch (error) {
        if (!options.collectProbeFailures) throw error;
        errors.push(extractionError(video.id, error));
        return null;
      }
    })
  );
  const probedVideos = metadataResults.filter((entry) => entry !== null);
  resolvedVideos.splice(
    0,
    resolvedVideos.length,
    ...probedVideos.map(({ video, videoPath }) => ({ video, videoPath }))
  );
  cacheKeyInputs.splice(
    0,
    cacheKeyInputs.length,
    ...probedVideos.map(({ cacheKeyInput }) => cacheKeyInput)
  );
  const videoMetadata = probedVideos.map(({ metadata }) => metadata);
  const videoColorSpaces = videoMetadata.map((m) => m.colorSpace);
  const sdrToHdrTransfers = resolvedVideos.map(() => void 0);
  breakdown.hdrProbeMs = Date.now() - phase2ProbeStart;
  const alphaWarnedSrcs = /* @__PURE__ */ new Set();
  if (resolvedVideos.length > 0) {
    await Promise.all(
      resolvedVideos.map(async ({ video, videoPath }, index) => {
        if (signal?.aborted) return;
        const metadata = videoMetadata[index];
        if (!metadata?.hasAlpha || !codecMayHaveAlpha(metadata.videoCodec)) return;
        if (alphaWarnedSrcs.has(video.src)) return;
        alphaWarnedSrcs.add(video.src);
        const decoder = decoderForCodec(metadata.videoCodec);
        if (await probeInputAlphaPlane(videoPath, decoder, signal) !== true) return;
        process.stderr.write(inputAlphaOpaqueWarning(video.src));
      })
    );
  }
  const hdrPreflightStart = Date.now();
  const hdrInfo = analyzeCompositionHdr(videoColorSpaces);
  const hdrSkippedIndices = /* @__PURE__ */ new Set();
  if (hdrInfo.hasHdr && hdrInfo.dominantTransfer) {
    const targetTransfer = hdrInfo.dominantTransfer;
    for (let i = 0; i < resolvedVideos.length; i++) {
      if (signal?.aborted) break;
      const cs = videoColorSpaces[i] ?? null;
      if (!isHdrColorSpace(cs)) {
        const entry = resolvedVideos[i];
        const metadata = videoMetadata[i];
        if (!entry || !metadata) continue;
        const playableDuration = resolvePlayableVideoDuration(metadata);
        if (entry.video.mediaStart >= playableDuration && !canHoldFinalFramePastEof(entry.video)) {
          errors.push({
            videoId: entry.video.id,
            kind: "media_start_out_of_range",
            retryable: false,
            error: `SDR\u2192HDR conversion skipped: mediaStart (${entry.video.mediaStart}s) \u2265 playable video duration (${playableDuration}s)`
          });
          hdrSkippedIndices.add(i);
          continue;
        }
        sdrToHdrTransfers[i] = targetTransfer;
        breakdown.hdrPreflightCount += 1;
      }
    }
  }
  breakdown.hdrPreflightMs = Date.now() - hdrPreflightStart;
  if (hdrSkippedIndices.size > 0) {
    for (let i = resolvedVideos.length - 1; i >= 0; i--) {
      if (hdrSkippedIndices.has(i)) {
        resolvedVideos.splice(i, 1);
        videoMetadata.splice(i, 1);
        videoColorSpaces.splice(i, 1);
        cacheKeyInputs.splice(i, 1);
        sdrToHdrTransfers.splice(i, 1);
      }
    }
  }
  const vfrPreflightStart = Date.now();
  for (let i = 0; i < resolvedVideos.length; i++) {
    if (signal?.aborted) break;
    const vfrProbeStart = Date.now();
    const metadata = videoMetadata[i];
    breakdown.vfrProbeMs += Date.now() - vfrProbeStart;
    if (metadata?.isVFR) breakdown.vfrPreflightCount += 1;
  }
  breakdown.vfrPreflightMs = Date.now() - vfrPreflightStart;
  const phase3Start = Date.now();
  const configuredCacheRootDir = config?.extractCacheDir;
  let cacheRootDir;
  if (configuredCacheRootDir) {
    try {
      mkdirSync6(configuredCacheRootDir, { recursive: true });
      cacheRootDir = configuredCacheRootDir;
    } catch {
      process.stderr.write(
        `[hyperframes:render] WARNING: extraction cache dir ${configuredCacheRootDir} is not writable; caching disabled for this render
`
      );
    }
  }
  function extractionError(videoId, err) {
    const classified = classifyVideoExtractionError(err);
    return {
      videoId,
      kind: classified.kind,
      retryable: classified.retryable,
      error: classified.diagnostic
    };
  }
  function scopedExtractionOptions(work) {
    return {
      ...options,
      format: work.format,
      sdrToHdrTransfer: work.sdrToHdrTransfer,
      toneMapHdrToSdr: work.hdrToSdrTransformKey !== void 0,
      finalFrameOnly: work.finalFrameOnly
    };
  }
  function rehydratePublishedCache(work, target) {
    const rehydrated = rehydrateCacheEntry(target.entry, {
      videoId: work.video.id,
      srcPath: target.srcPath,
      fps,
      format: work.format,
      metadata: work.metadata
    });
    return { ...rehydrated, ownedByLookup: true };
  }
  function lookupCacheFor(work) {
    if (!cacheRootDir) return { work };
    const keyInput = cacheKeyInputs[work.index];
    if (!keyInput) return { work };
    const transformParts = [
      work.sdrToHdrTransfer ? sdrToHdrTransformKey(work.sdrToHdrTransfer) : void 0,
      work.hdrToSdrTransformKey,
      work.finalFrameOnly ? "final-frame" : void 0
    ].filter((part) => part !== void 0);
    const transform = transformParts.length > 0 ? transformParts.join("+") : void 0;
    const lookup = lookupCacheEntry(cacheRootDir, {
      videoPath: keyInput.videoPath,
      mtimeMs: keyInput.mtimeMs,
      size: keyInput.size,
      mediaStart: keyInput.mediaStart,
      duration: work.videoDuration,
      fps: fpsKey,
      format: work.format,
      transform
    });
    if (!lookup.hit) {
      breakdown.cacheMisses += 1;
      return { work, cacheTarget: { entry: lookup.entry, srcPath: keyInput.videoPath } };
    }
    breakdown.cacheHits += 1;
    touchCacheEntry(lookup.entry);
    return {
      result: rehydratePublishedCache(work, { entry: lookup.entry, srcPath: keyInput.videoPath })
    };
  }
  async function extractDirectMiss(miss, maxTransientRetries = options.maxTransientRetries ?? 0) {
    const { work, cacheTarget } = miss;
    if (!cacheTarget) {
      const outputDir = join10(options.outputDir, work.video.id);
      const attempted2 = await runVideoExtractionWithRetry(
        () => extractVideoFramesRange(
          work.videoPath,
          work.video.id,
          work.extractionMediaStart,
          work.videoDuration,
          scopedExtractionOptions(work),
          signal,
          config
        ),
        {
          signal,
          maxTransientRetries,
          onRetry: () => {
            recordTransientRetries(1);
            rmSync4(outputDir, { recursive: true, force: true });
          }
        }
      );
      return attempted2.result;
    }
    const partialDir = partialCacheEntryDir(cacheTarget.entry);
    rmSync4(partialDir, { recursive: true, force: true });
    mkdirSync6(partialDir, { recursive: true });
    const attempted = await runVideoExtractionWithRetry(
      () => extractVideoFramesRange(
        work.videoPath,
        work.video.id,
        work.extractionMediaStart,
        work.videoDuration,
        scopedExtractionOptions(work),
        signal,
        config,
        partialDir
      ),
      {
        signal,
        maxTransientRetries,
        onRetry: () => {
          recordTransientRetries(1);
          rmSync4(partialDir, { recursive: true, force: true });
          mkdirSync6(partialDir, { recursive: true });
        }
      }
    );
    const result = attempted.result;
    const published = publishCacheEntry(cacheTarget.entry, partialDir);
    if (!published.published) {
      breakdown.cachePublishFailures += 1;
      return { ...result, ownedByLookup: false };
    }
    return rehydratePublishedCache(work, cacheTarget);
  }
  async function executeDirectMiss(miss, maxTransientRetries = options.maxTransientRetries ?? 0) {
    try {
      return { result: await extractDirectMiss(miss, maxTransientRetries) };
    } catch (err) {
      return { error: extractionError(miss.work.video.id, err) };
    }
  }
  function materializeSupersetMember(member, superset) {
    const { miss } = member;
    const { work, cacheTarget } = miss;
    if (!cacheTarget) {
      return sliceSupersetMember(
        member,
        superset,
        join10(options.outputDir, work.video.id),
        fps,
        configuredFps
      );
    }
    const partialDir = partialCacheEntryDir(cacheTarget.entry);
    const sliced = sliceSupersetMember(member, superset, partialDir, fps, configuredFps);
    const published = publishCacheEntry(cacheTarget.entry, partialDir);
    if (!published.published) {
      breakdown.cachePublishFailures += 1;
      return { ...sliced, ownedByLookup: false };
    }
    return rehydratePublishedCache(work, cacheTarget);
  }
  async function executeSupersetGroup(group) {
    const first = group.members[0]?.miss.work;
    if (!first) return [];
    const tempDir = cacheRootDir ? join10(cacheRootDir, `${group.groupId}.partial-${process.pid}`) : join10(options.outputDir, group.groupId);
    try {
      rmSync4(tempDir, { recursive: true, force: true });
      const superset = await extractVideoFramesRange(
        first.videoPath,
        group.groupId,
        group.baseStart,
        group.unionDuration,
        scopedExtractionOptions(first),
        signal,
        config,
        tempDir
      );
      const outcomes = [];
      for (const member of group.members) {
        outcomes.push([
          member.miss.work.dedupeKey,
          { result: materializeSupersetMember(member, superset) }
        ]);
      }
      return outcomes;
    } catch (err) {
      if (signal?.aborted) {
        return group.members.map((member) => [
          member.miss.work.dedupeKey,
          { error: extractionError(member.miss.work.video.id, err) }
        ]);
      }
      const fallback = await Promise.all(
        group.members.map(
          async (member) => [member.miss.work.dedupeKey, await executeDirectMiss(member.miss)]
        )
      );
      return fallback;
    } finally {
      rmSync4(tempDir, { recursive: true, force: true });
    }
  }
  const preparedExtractions = await Promise.all(
    resolvedVideos.map(async ({ video, videoPath }, index) => {
      if (signal?.aborted) {
        throw new Error("Video frame extraction cancelled");
      }
      try {
        const metadata = videoMetadata[index] ?? await extractMediaMetadata(videoPath);
        const initialWindow = resolveVideoExtractionWindow(video, metadata, options.timelineEnd);
        const window2 = await resolveFinalFrameExtractionWindow(
          videoPath,
          video,
          metadata,
          initialWindow,
          signal
        );
        const videoDuration = window2.durationSeconds;
        if (videoDuration <= 0) {
          return { skipped: true };
        }
        rebaseVideoToWindow(video, window2);
        const keyInput = cacheKeyInputs[index];
        const extractionMediaStart = window2.extractionMediaStart ?? window2.mediaStart;
        if (keyInput) keyInput.mediaStart = extractionMediaStart;
        const format = resolveFrameFormat(metadata, options.format);
        const sdrToHdrTransfer = sdrToHdrTransfers[index];
        const hdrToSdrTransform = options.toneMapHdrToSdr === true && isHdrColorSpace(metadata.colorSpace) ? await hdrToSdrTransformKey() : void 0;
        const finalFrameOnly = window2.finalFrameOnly === true;
        const dedupeKey = `${videoPath}\0${extractionMediaStart}\0${videoDuration}\0${fpsKey}\0${format}\0${sdrToHdrTransfer ?? ""}\0${hdrToSdrTransform ?? ""}\0${finalFrameOnly ? "final" : "range"}`;
        return {
          work: {
            video,
            videoPath,
            index,
            metadata,
            videoDuration,
            extractionMediaStart,
            finalFrameOnly,
            format,
            sdrToHdrTransfer,
            hdrToSdrTransformKey: hdrToSdrTransform,
            dedupeKey
          }
        };
      } catch (err) {
        return { error: extractionError(video.id, err) };
      }
    })
  );
  const uniqueWorks = /* @__PURE__ */ new Map();
  for (const prepared of preparedExtractions) {
    if ("work" in prepared && !uniqueWorks.has(prepared.work.dedupeKey)) {
      uniqueWorks.set(prepared.work.dedupeKey, prepared.work);
    }
  }
  const uniqueOutcomes = /* @__PURE__ */ new Map();
  const cacheMisses = [];
  for (const work of uniqueWorks.values()) {
    const lookup = lookupCacheFor(work);
    if ("work" in lookup) {
      cacheMisses.push(lookup);
    } else {
      uniqueOutcomes.set(work.dedupeKey, lookup);
    }
  }
  const supersetPlan = planSupersetGroups(cacheMisses, fps);
  const directOutcomes = await Promise.all(
    supersetPlan.direct.map(
      async (miss) => [miss.work.dedupeKey, await executeDirectMiss(miss)]
    )
  );
  for (const [key, outcome] of directOutcomes) uniqueOutcomes.set(key, outcome);
  const supersetOutcomes = await Promise.all(
    supersetPlan.groups.map((group) => executeSupersetGroup(group))
  );
  for (const groupOutcomes of supersetOutcomes) {
    for (const [key, outcome] of groupOutcomes) uniqueOutcomes.set(key, outcome);
  }
  const results = [];
  for (const prepared of preparedExtractions) {
    if ("skipped" in prepared) continue;
    if ("error" in prepared) {
      results.push(prepared);
      continue;
    }
    const outcome = uniqueOutcomes.get(prepared.work.dedupeKey);
    if (!outcome) {
      results.push({
        error: extractionError(prepared.work.video.id, "missing extraction result")
      });
      continue;
    }
    if ("error" in outcome) {
      const isFollower = outcome.error.videoId !== prepared.work.video.id;
      const message = isFollower ? `[shared extraction, leader ${outcome.error.videoId}] ${outcome.error.error}` : outcome.error.error;
      results.push({
        error: {
          videoId: prepared.work.video.id,
          kind: outcome.error.kind,
          retryable: outcome.error.retryable,
          error: message
        }
      });
      continue;
    }
    results.push({ result: { ...outcome.result, videoId: prepared.work.video.id } });
  }
  breakdown.extractMs = Date.now() - phase3Start;
  for (const item of results) {
    if ("error" in item && item.error) {
      errors.push(item.error);
    } else if ("result" in item) {
      extracted.push(item.result);
      totalFramesExtracted += item.result.totalFrames;
    }
  }
  const sweepDue = breakdown.cacheMisses > 0 || cacheRootDir !== void 0 && gcSweepDue(cacheRootDir, GC_STALENESS_MS);
  if (cacheRootDir && sweepDue) {
    const gcStats = gcExtractionCache(cacheRootDir, {
      maxBytes: config?.extractCacheMaxBytes ?? DEFAULT_CONFIG.extractCacheMaxBytes,
      minAgeMs: EXTRACT_CACHE_MIN_AGE_MS
    });
    breakdown.cacheGcEvictions = gcStats.evictedEntries;
    breakdown.cacheGcBytesFreed = gcStats.evictedBytes;
    breakdown.cacheAgedPartialsCleared = gcStats.agedPartialsRemoved;
  }
  return {
    success: errors.length === 0,
    extracted,
    errors,
    totalFramesExtracted,
    durationMs: Date.now() - startTime,
    phaseBreakdown: breakdown
  };
}
function getFrameIndexAtTime(extracted, globalTime, videoStart, loop = false, mediaStart = 0, holdLastFrame = false, playbackRate = 1) {
  let localTime = Math.max(0, globalTime - videoStart);
  const normalizedPlaybackRate = normalizeRateSpec(playbackRate);
  const loopDuration = timeAtSourceTime(
    normalizedPlaybackRate,
    Math.max(0, resolvePlayableVideoDuration(extracted.metadata) - mediaStart)
  );
  if (typeof normalizedPlaybackRate === "number" && loop && loopDuration > 0 && localTime >= loopDuration) {
    localTime %= loopDuration;
  }
  let sourceTime = sourceTimeAt(normalizedPlaybackRate, localTime);
  if (typeof normalizedPlaybackRate === "object" && loop) {
    const cycle = Math.max(0, resolvePlayableVideoDuration(extracted.metadata) - mediaStart);
    if (cycle > 0 && sourceTime >= cycle) sourceTime %= cycle;
  }
  const frameIndex = Math.floor(sourceTime * extracted.fps + 1e-9);
  if (frameIndex < 0 || extracted.totalFrames <= 0) return null;
  if (frameIndex >= extracted.totalFrames) {
    return loop || holdLastFrame ? extracted.totalFrames - 1 : null;
  }
  return frameIndex;
}
function getFrameAtTime(extracted, globalTime, videoStart, loop = false, mediaStart = 0) {
  if (!hasClipStarted(globalTime, videoStart)) return null;
  const frameIndex = getFrameIndexAtTime(extracted, globalTime, videoStart, loop, mediaStart);
  return frameIndex == null ? null : extracted.framePaths.get(frameIndex) || null;
}
function analyzeClipMediaFit(params) {
  const { slotSeconds, mediaSeconds, loop } = params;
  if (loop) return null;
  if (!(slotSeconds > 0) || !Number.isFinite(mediaSeconds) || mediaSeconds < 0) return null;
  const toleranceSeconds = MEDIA_DURATION_CLAMP_EPSILON_SECONDS;
  const shortfallSeconds = slotSeconds - mediaSeconds;
  if (shortfallSeconds <= toleranceSeconds) return null;
  return { shortfallSeconds, toleranceSeconds };
}
var FrameLookupTable = class {
  /** The render's `fps`, so a clip shows in exactly export visibility's frames; omit for authored times. */
  constructor(fps) {
    this.fps = fps;
  }
  fps;
  videos = /* @__PURE__ */ new Map();
  orderedVideos = [];
  activeVideoIds = /* @__PURE__ */ new Set();
  startCursor = 0;
  lastTime = null;
  addVideo(extracted, start, end, mediaStart, loop = false, playbackRate = 1) {
    this.videos.set(extracted.videoId, {
      extracted,
      start,
      clipWindow: this.fps ? exportClipWindow(start, end, this.fps) : { start, end },
      mediaStart,
      loop,
      playbackRate: normalizeRateSpec(playbackRate)
    });
    this.orderedVideos = Array.from(this.videos.entries()).map(([videoId, video]) => ({ videoId, ...video })).sort((a, b) => a.clipWindow.start - b.clipWindow.start);
    this.resetActiveState();
  }
  getFrame(videoId, globalTime) {
    const video = this.videos.get(videoId);
    if (!video) return null;
    if (!isInClipWindow(globalTime, video.clipWindow.start, video.clipWindow.end)) return null;
    const frameIndex = getFrameIndexAtTime(
      video.extracted,
      globalTime,
      video.start,
      video.loop,
      video.mediaStart,
      true,
      video.playbackRate
    );
    return frameIndex == null ? null : video.extracted.framePaths.get(frameIndex) || null;
  }
  frameDirs() {
    return [...new Set(Array.from(this.videos.values(), (video) => video.extracted.outputDir))];
  }
  resetActiveState() {
    this.activeVideoIds.clear();
    this.startCursor = 0;
    this.lastTime = null;
  }
  refreshActiveSet(globalTime) {
    if (this.lastTime == null || globalTime < this.lastTime) {
      this.activeVideoIds.clear();
      this.startCursor = 0;
      for (const entry of this.orderedVideos) {
        if (!hasClipStarted(globalTime, entry.clipWindow.start)) break;
        if (isInClipWindow(globalTime, entry.clipWindow.start, entry.clipWindow.end)) {
          this.activeVideoIds.add(entry.videoId);
        }
        this.startCursor += 1;
      }
      this.lastTime = globalTime;
      return;
    }
    while (this.startCursor < this.orderedVideos.length) {
      const candidate = this.orderedVideos[this.startCursor];
      if (!candidate) break;
      if (!hasClipStarted(globalTime, candidate.clipWindow.start)) {
        break;
      }
      if (isInClipWindow(globalTime, candidate.clipWindow.start, candidate.clipWindow.end)) {
        this.activeVideoIds.add(candidate.videoId);
      }
      this.startCursor += 1;
    }
    for (const videoId of Array.from(this.activeVideoIds)) {
      const video = this.videos.get(videoId);
      if (!video || !isInClipWindow(globalTime, video.clipWindow.start, video.clipWindow.end)) {
        this.activeVideoIds.delete(videoId);
      }
    }
    this.lastTime = globalTime;
  }
  getActiveFramePayloads(globalTime) {
    const frames = /* @__PURE__ */ new Map();
    this.refreshActiveSet(globalTime);
    for (const videoId of this.activeVideoIds) {
      const video = this.videos.get(videoId);
      if (!video) continue;
      const frameIndex = getFrameIndexAtTime(
        video.extracted,
        globalTime,
        video.start,
        video.loop,
        video.mediaStart,
        true,
        video.playbackRate
      );
      if (frameIndex == null) continue;
      const framePath = video.extracted.framePaths.get(frameIndex);
      if (!framePath) continue;
      frames.set(videoId, { framePath, frameIndex });
    }
    return frames;
  }
  getActiveFrames(globalTime) {
    const payloads = this.getActiveFramePayloads(globalTime);
    const frames = /* @__PURE__ */ new Map();
    for (const [videoId, payload] of payloads) {
      frames.set(videoId, payload.framePath);
    }
    return frames;
  }
  cleanup() {
    for (const video of this.videos.values()) {
      if (video.extracted.ownedByLookup) continue;
      if (existsSync8(video.extracted.outputDir)) {
        rmSync4(video.extracted.outputDir, { recursive: true, force: true });
      }
    }
    this.videos.clear();
    this.orderedVideos = [];
    this.resetActiveState();
  }
};
function createFrameLookupTable(videos, extracted, fps) {
  const table = new FrameLookupTable(fps);
  const extractedMap = /* @__PURE__ */ new Map();
  for (const ext of extracted) extractedMap.set(ext.videoId, ext);
  for (const video of videos) {
    const ext = extractedMap.get(video.id);
    if (ext) {
      table.addVideo(ext, video.start, video.end, video.mediaStart, video.loop, video.playbackRate);
    }
  }
  return table;
}

// ../engine/src/services/videoFrameInjector.ts
import { promises as fs } from "fs";
function createFrameSourceCache(entryLimit, bytesLimit, frameSrcResolver) {
  const cache = /* @__PURE__ */ new Map();
  const inFlight = /* @__PURE__ */ new Map();
  let totalBytes = 0;
  let evictions = 0;
  let oversizedRejections = 0;
  function evictOldest() {
    const oldestKey = cache.keys().next().value;
    if (!oldestKey) return;
    const dropped = cache.get(oldestKey);
    cache.delete(oldestKey);
    totalBytes = Math.max(0, totalBytes - (dropped?.length ?? 0));
    evictions++;
  }
  function remember(framePath, dataUri) {
    if (dataUri.length > bytesLimit) {
      oversizedRejections++;
      if (cache.has(framePath)) {
        totalBytes = Math.max(0, totalBytes - (cache.get(framePath)?.length ?? 0));
        cache.delete(framePath);
      }
      return dataUri;
    }
    if (cache.has(framePath)) {
      totalBytes = Math.max(0, totalBytes - (cache.get(framePath)?.length ?? 0));
      cache.delete(framePath);
    }
    cache.set(framePath, dataUri);
    totalBytes += dataUri.length;
    while ((cache.size > entryLimit || totalBytes > bytesLimit) && cache.size > 0) {
      evictOldest();
    }
    return dataUri;
  }
  async function get(framePath) {
    const servedSrc = frameSrcResolver?.(framePath);
    if (servedSrc) return servedSrc;
    const cached = cache.get(framePath);
    if (cached) {
      remember(framePath, cached);
      return cached;
    }
    const existing = inFlight.get(framePath);
    if (existing) {
      return existing;
    }
    const pending = fs.readFile(framePath).then((frameData) => {
      const mimeType = framePath.endsWith(".png") ? "image/png" : "image/jpeg";
      const dataUri = `data:${mimeType};base64,${frameData.toString("base64")}`;
      return remember(framePath, dataUri);
    }).finally(() => {
      inFlight.delete(framePath);
    });
    inFlight.set(framePath, pending);
    return pending;
  }
  return {
    get,
    stats: () => ({
      entries: cache.size,
      bytes: totalBytes,
      evictions,
      oversizedRejections
    })
  };
}
var CACHE_TOUCH_THROTTLE_MS = 5 * 60 * 1e3;
function createVideoFrameInjector(frameLookup, config) {
  if (!frameLookup) return null;
  const entryLimit = Math.max(
    32,
    config?.frameDataUriCacheLimit ?? DEFAULT_CONFIG.frameDataUriCacheLimit
  );
  const bytesLimitMb = Math.max(
    64,
    config?.frameDataUriCacheBytesLimitMb ?? DEFAULT_CONFIG.frameDataUriCacheBytesLimitMb
  );
  const bytesLimit = bytesLimitMb * 1024 * 1024;
  const frameCache = createFrameSourceCache(entryLimit, bytesLimit, config?.frameSrcResolver);
  const lastInjectedFrameByVideo = /* @__PURE__ */ new Map();
  const lastCacheTouchByDir = /* @__PURE__ */ new Map();
  function renewCacheLease(cacheDir) {
    const now = Date.now();
    const lastTouch = lastCacheTouchByDir.get(cacheDir);
    if (lastTouch !== void 0 && now - lastTouch < CACHE_TOUCH_THROTTLE_MS) return;
    touchCacheDir(cacheDir);
    lastCacheTouchByDir.set(cacheDir, now);
  }
  return async (page, time, heldVideoTime) => {
    for (const cacheDir of frameLookup.frameDirs()) renewCacheLease(cacheDir);
    const activePayloads = frameLookup.getActiveFramePayloads(time);
    if (heldVideoTime !== void 0) {
      for (const [videoId, payload] of frameLookup.getActiveFramePayloads(heldVideoTime)) {
        if (activePayloads.has(videoId)) activePayloads.set(videoId, payload);
      }
    }
    const updates = [];
    const activeIds = /* @__PURE__ */ new Set();
    if (activePayloads.size > 0) {
      const pendingReads = [];
      for (const [videoId, payload] of activePayloads) {
        activeIds.add(videoId);
        const lastFrameIndex = lastInjectedFrameByVideo.get(videoId);
        if (lastFrameIndex === payload.frameIndex) continue;
        pendingReads.push(
          frameCache.get(payload.framePath).then((dataUri) => ({ videoId, dataUri, frameIndex: payload.frameIndex }))
        );
      }
      updates.push(...await Promise.all(pendingReads));
    }
    for (const videoId of Array.from(lastInjectedFrameByVideo.keys())) {
      if (!activeIds.has(videoId)) {
        lastInjectedFrameByVideo.delete(videoId);
      }
    }
    await syncVideoFrameVisibility(page, Array.from(activeIds));
    if (updates.length > 0) {
      const injectedIds = new Set(
        await injectVideoFramesBatch(
          page,
          updates.map((u) => ({ videoId: u.videoId, dataUri: u.dataUri }))
        )
      );
      for (const update of updates) {
        if (injectedIds.has(update.videoId)) {
          lastInjectedFrameByVideo.set(update.videoId, update.frameIndex);
        }
      }
      if (injectedIds.size > 0) {
        await page.evaluate((t) => {
          window.__hfReseekGpu?.(t);
        }, time);
      }
    }
  };
}
async function hideVideoElements(page, videoIds) {
  await setVideoElementsVisibility(page, videoIds, false);
}
async function showVideoElements(page, videoIds) {
  await setVideoElementsVisibility(page, videoIds, true);
}
async function setVideoElementsVisibility(page, videoIds, visible) {
  if (videoIds.length === 0) return;
  await page.evaluate(
    (entries, canvasIdPrefix, shouldShow) => {
      const apply = (node) => {
        if (!(node instanceof HTMLElement)) return;
        if (shouldShow) {
          node.style.removeProperty("visibility");
        } else {
          node.style.setProperty("visibility", "hidden", "important");
        }
      };
      for (const { id, frameId } of entries) {
        const video = window.__hfMediaEl?.(id) ?? document.getElementById(id);
        if (!video) continue;
        apply(video);
        apply(document.getElementById(frameId));
        apply(document.getElementById(`${canvasIdPrefix}${id}`));
      }
    },
    // Sibling ids come from core's function, never a template here, so the
    // format has one definition across the engine and the runtime readers.
    videoIds.map((id) => ({ id, frameId: renderFrameIdForRenderId(id) })),
    HF_COLOR_GRADING_CANVAS_ID_PREFIX,
    visible
  );
}
async function queryVideoElementBounds(page, videoIds) {
  if (videoIds.length === 0) return [];
  return page.evaluate((ids) => {
    const resolveVideo = (id) => window.__hfMediaEl?.(id) ?? document.getElementById(id);
    return ids.map((id) => {
      const el = resolveVideo(id);
      if (!el) {
        return {
          videoId: id,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          opacity: 0,
          transform: "none",
          zIndex: 0,
          visible: false
        };
      }
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const zIndexParsed = parseInt(style.zIndex);
      const zIndex = Number.isNaN(zIndexParsed) ? 0 : zIndexParsed;
      const opacityParsed = parseFloat(style.opacity);
      const opacity = Number.isNaN(opacityParsed) ? 1 : opacityParsed;
      const transform = style.transform || "none";
      const visible = style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
      return {
        videoId: id,
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        opacity,
        transform,
        zIndex,
        visible
      };
    });
  }, videoIds);
}
async function queryElementStacking(page, nativeHdrIds) {
  const hdrIds = Array.from(nativeHdrIds);
  return page.evaluate(
    // fallow-ignore-next-line complexity
    (hdrIdList, prefix, suffix) => {
      const hdrSet = new Set(hdrIdList);
      const elements = document.querySelectorAll("[data-start]");
      const results = [];
      function getEffectiveZIndex(node) {
        let current = node;
        while (current) {
          const cs = window.getComputedStyle(current);
          const pos = cs.position;
          const z = parseInt(cs.zIndex);
          if (!Number.isNaN(z) && pos !== "static") return z;
          current = current.parentElement;
        }
        return 0;
      }
      function getEffectiveBorderRadius(node) {
        function resolveRadius(value, el) {
          if (value.includes("%")) {
            const pct = parseFloat(value) / 100;
            const w = el instanceof HTMLElement ? el.offsetWidth : 0;
            const h = el instanceof HTMLElement ? el.offsetHeight : 0;
            return pct * Math.min(w, h);
          }
          const parsed = parseFloat(value);
          return Number.isNaN(parsed) ? 0 : parsed;
        }
        const selfCs = window.getComputedStyle(node);
        const selfRadii = [
          resolveRadius(selfCs.borderTopLeftRadius, node),
          resolveRadius(selfCs.borderTopRightRadius, node),
          resolveRadius(selfCs.borderBottomRightRadius, node),
          resolveRadius(selfCs.borderBottomLeftRadius, node)
        ];
        if (selfRadii[0] > 0 || selfRadii[1] > 0 || selfRadii[2] > 0 || selfRadii[3] > 0) {
          return selfRadii;
        }
        let current = node.parentElement;
        while (current) {
          const cs = window.getComputedStyle(current);
          if (cs.overflow !== "visible") {
            const tl = resolveRadius(cs.borderTopLeftRadius, current);
            const tr = resolveRadius(cs.borderTopRightRadius, current);
            const brr = resolveRadius(cs.borderBottomRightRadius, current);
            const bl = resolveRadius(cs.borderBottomLeftRadius, current);
            if (tl > 0 || tr > 0 || brr > 0 || bl > 0) {
              return [tl, tr, brr, bl];
            }
          }
          current = current.parentElement;
        }
        return [0, 0, 0, 0];
      }
      function getClipRect(node) {
        let current = node.parentElement;
        let clip = null;
        while (current) {
          const cs = window.getComputedStyle(current);
          if (cs.overflow === "hidden" || cs.overflow === "clip") {
            const r = current.getBoundingClientRect();
            const ancestor = {
              x: Math.round(r.x),
              y: Math.round(r.y),
              width: Math.round(r.width),
              height: Math.round(r.height)
            };
            if (!clip) {
              clip = ancestor;
            } else {
              const x1 = Math.max(clip.x, ancestor.x);
              const y1 = Math.max(clip.y, ancestor.y);
              const x2 = Math.min(clip.x + clip.width, ancestor.x + ancestor.width);
              const y2 = Math.min(clip.y + clip.height, ancestor.y + ancestor.height);
              clip = { x: x1, y: y1, width: Math.max(0, x2 - x1), height: Math.max(0, y2 - y1) };
            }
          }
          current = current.parentElement;
        }
        return clip;
      }
      function getEffectiveOpacity(node) {
        let opacity = 1;
        let current = node;
        while (current) {
          const cs = window.getComputedStyle(current);
          const val = parseFloat(cs.opacity);
          opacity *= Number.isNaN(val) ? 1 : val;
          current = current.parentElement;
        }
        return opacity;
      }
      function getViewportMatrix(node) {
        const chain = [];
        let current = node;
        while (current instanceof HTMLElement) {
          chain.push(current);
          const next = current.offsetParent ?? current.parentElement;
          if (next === current) break;
          current = next;
        }
        let mat = new DOMMatrix();
        for (let i = chain.length - 1; i >= 0; i--) {
          const htmlEl = chain[i];
          if (!htmlEl) continue;
          mat = mat.translate(htmlEl.offsetLeft, htmlEl.offsetTop);
          const cs = window.getComputedStyle(htmlEl);
          const origin = cs.transformOrigin.split(" ");
          const ox = resolveLength(origin[0] ?? "0", htmlEl.offsetWidth);
          const oy = resolveLength(origin[1] ?? "0", htmlEl.offsetHeight);
          const individualTransform = composeIndividualTransforms(cs);
          const hasIndividual = individualTransform !== null;
          const hasTransform = cs.transform && cs.transform !== "none";
          if (hasIndividual || hasTransform) {
            mat = mat.translate(ox, oy);
            if (hasIndividual) mat = mat.multiply(individualTransform);
            if (hasTransform) {
              try {
                const t = new DOMMatrix(cs.transform);
                if (Number.isFinite(t.a) && Number.isFinite(t.b) && Number.isFinite(t.c) && Number.isFinite(t.d) && Number.isFinite(t.e) && Number.isFinite(t.f)) {
                  mat = mat.multiply(t);
                }
              } catch {
              }
            }
            mat = mat.translate(-ox, -oy);
          }
        }
        return mat.toString();
      }
      function composeIndividualTransforms(cs) {
        const translate = cs.getPropertyValue("translate").trim();
        const rotate = cs.getPropertyValue("rotate").trim();
        const scale = cs.getPropertyValue("scale").trim();
        const hasTranslate = translate && translate !== "none";
        const hasRotate = rotate && rotate !== "none";
        const hasScale = scale && scale !== "none";
        if (!hasTranslate && !hasRotate && !hasScale) return null;
        let m = new DOMMatrix();
        if (hasTranslate) {
          const parts = translate.split(/\s+/);
          const tx = parseFloat(parts[0] ?? "0") || 0;
          const ty = parseFloat(parts[1] ?? "0") || 0;
          if (tx !== 0 || ty !== 0) m = m.translate(tx, ty);
        }
        if (hasRotate) {
          const deg = parseFloat(rotate) || 0;
          if (deg !== 0) m = m.rotate(deg);
        }
        if (hasScale) {
          const parts = scale.split(/\s+/);
          const sx = parseFloat(parts[0] ?? "1") || 1;
          const sy = parseFloat(parts[1] ?? String(sx)) || sx;
          if (sx !== 1 || sy !== 1) m = m.scale(sx, sy);
        }
        return m;
      }
      function resolveLength(value, basis) {
        if (value.endsWith("%")) {
          const pct = parseFloat(value) / 100;
          return Number.isFinite(pct) ? pct * basis : 0;
        }
        const n = parseFloat(value);
        return Number.isFinite(n) ? n : 0;
      }
      function isElementPaintable(node) {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
      }
      for (const el of elements) {
        const id = window.__hfMediaId?.(el) || el.id;
        if (!id) continue;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const zIndex = getEffectiveZIndex(el);
        const isHdrEl = hdrSet.has(id);
        const opacity = getEffectiveOpacity(el);
        const visible = isElementPaintable(el);
        const renderFrame = document.getElementById(`${prefix}${id}${suffix}`);
        const renderFrameVisible = renderFrame ? isElementPaintable(renderFrame) : false;
        const htmlEl = el instanceof HTMLElement ? el : null;
        results.push({
          id,
          zIndex,
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          layoutWidth: htmlEl?.offsetWidth || Math.round(rect.width),
          layoutHeight: htmlEl?.offsetHeight || Math.round(rect.height),
          opacity,
          visible,
          renderFrameVisible,
          isHdr: hdrSet.has(id),
          // For HDR elements, use the full accumulated viewport matrix so the
          // affine blit can apply rotation/scale/translate properly. For DOM
          // elements, the element-level transform is sufficient for reference.
          transform: isHdrEl ? getViewportMatrix(el) : style.transform || "none",
          borderRadius: isHdrEl ? getEffectiveBorderRadius(el) : [0, 0, 0, 0],
          // `getComputedStyle` returns "" when the property doesn't apply (e.g.
          // for non-replaced elements); normalize to the CSS defaults so callers
          // can rely on a populated value.
          objectFit: style.objectFit || "fill",
          objectPosition: style.objectPosition || "50% 50%",
          clipRect: isHdrEl ? getClipRect(el) : null
        });
      }
      return results;
    },
    hdrIds,
    RENDER_FRAME_ID_PREFIX,
    RENDER_FRAME_ID_SUFFIX
  );
}

// ../engine/src/services/audioMixer.ts
import { closeSync as closeSync3, existsSync as existsSync10, mkdirSync as mkdirSync7, mkdtempSync as mkdtempSync6, openSync as openSync3, rmSync as rmSync7, writeFileSync as writeFileSync6 } from "fs";
import { join as join13, dirname as dirname6, isAbsolute, relative } from "path";

// ../engine/src/utils/notMediaPayload.ts
import { createHash as createHash3 } from "crypto";
import { open as openFile } from "fs/promises";
var NOT_MEDIA_PAYLOAD = "NOT_MEDIA_PAYLOAD";
var MAX_LISTED_FINGERPRINTS = 8;
var NotMediaPayloadError = class extends Error {
  code = NOT_MEDIA_PAYLOAD;
  owner = "user";
  retryable = false;
  elementFingerprints;
  constructor(elementFingerprints) {
    const listed = elementFingerprints.slice(0, MAX_LISTED_FINGERPRINTS).join(",");
    const elided = elementFingerprints.length - MAX_LISTED_FINGERPRINTS;
    super(
      `${elementFingerprints.length} media source(s) are text documents (HTML/XML/JSON), not media containers [elements=${listed}${elided > 0 ? `,+${elided}` : ""}]. Either an unresolved nested-composition preview URL was authored as a media src, or the source answered with an error page or API error body carrying a success status.`
    );
    this.name = "NotMediaPayloadError";
    this.elementFingerprints = elementFingerprints;
  }
};
function fingerprintElementId(elementId) {
  return createHash3("sha256").update(elementId).digest("hex").slice(0, 16);
}
var SNIFF_BYTES = 512;
var DOCUMENT_OPENING_BYTES = /* @__PURE__ */ new Set([60, 123, 91]);
var SKIPPABLE_LEADING_BYTES = /* @__PURE__ */ new Set([0, 9, 10, 11, 12, 13, 32]);
var BYTE_ORDER_MARKS = [
  Buffer.from([239, 187, 191]),
  // UTF-8
  Buffer.from([255, 254]),
  // UTF-16 LE
  Buffer.from([254, 255])
  // UTF-16 BE
];
function byteOrderMarkLength(head) {
  for (const mark of BYTE_ORDER_MARKS) {
    if (head.length >= mark.length && head.subarray(0, mark.length).equals(mark)) {
      return mark.length;
    }
  }
  return 0;
}
async function readHead(filePath) {
  const fh = await openFile(filePath, "r");
  try {
    const buf = Buffer.alloc(SNIFF_BYTES);
    let filled = 0;
    while (filled < buf.length) {
      const { bytesRead } = await fh.read(buf, filled, buf.length - filled, filled);
      if (bytesRead === 0) break;
      filled += bytesRead;
    }
    return buf.subarray(0, filled);
  } finally {
    await fh.close().catch(() => {
    });
  }
}
function startsWithDocumentByte(head) {
  for (let index = byteOrderMarkLength(head); index < head.length; index++) {
    const byte = head[index];
    if (byte === void 0) break;
    if (SKIPPABLE_LEADING_BYTES.has(byte)) continue;
    return DOCUMENT_OPENING_BYTES.has(byte);
  }
  return false;
}
async function isNotMediaPayload(filePath) {
  try {
    return startsWithDocumentByte(await readHead(filePath));
  } catch {
    return false;
  }
}
async function assertMediaPayload(filePath, elementId) {
  if (await isNotMediaPayload(filePath)) {
    throw new NotMediaPayloadError([fingerprintElementId(elementId)]);
  }
}

// ../core/dist/audioFade.js
var HF_AUDIO_FADE_IN_ATTR = "data-fade-in";
var HF_AUDIO_FADE_OUT_ATTR = "data-fade-out";
var HF_AUDIO_FADE_IN_DATA_KEY = HF_AUDIO_FADE_IN_ATTR.slice("data-".length);
var HF_AUDIO_FADE_OUT_DATA_KEY = HF_AUDIO_FADE_OUT_ATTR.slice("data-".length);
var NO_FADES = Object.freeze({ fadeIn: 0, fadeOut: 0 });
function finiteFadeSeconds(value) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}
function readFadeSeconds(raw) {
  if (raw == null || raw === "")
    return 0;
  return finiteFadeSeconds(Number.parseFloat(raw));
}
function readElementFades(el) {
  return {
    fadeIn: readFadeSeconds(el.getAttribute(HF_AUDIO_FADE_IN_ATTR)),
    fadeOut: readFadeSeconds(el.getAttribute(HF_AUDIO_FADE_OUT_ATTR))
  };
}
function clampFadesToDuration(fades, duration) {
  const fadeIn = finiteFadeSeconds(fades.fadeIn);
  const fadeOut = finiteFadeSeconds(fades.fadeOut);
  if (!Number.isFinite(duration) || duration <= 0)
    return { fadeIn, fadeOut };
  const total = fadeIn + fadeOut;
  if (total <= duration)
    return { fadeIn, fadeOut };
  const scale = duration / total;
  return { fadeIn: fadeIn * scale, fadeOut: fadeOut * scale };
}

// ../engine/src/services/audioVolumeEnvelope.ts
import { mkdtempSync as mkdtempSync4, readFileSync as readFileSync5, renameSync as renameSync2, rmSync as rmSync5, writeFileSync as writeFileSync4 } from "fs";
import { dirname as dirname5, join as join11 } from "path";

// ../core/dist/mediaTiming.js
var MEDIA_START_BASIS_ATTR = "data-hf-media-start-basis";
function readMediaStartBasis(value) {
  return value?.trim().toLowerCase() === "global" ? "global" : "local";
}
function resolveAbsoluteMediaStartSeconds(input) {
  return readMediaStartBasis(input.basis) === "global" ? input.authoredStart : input.hostStart + input.authoredStart;
}
function resolveMediaStartSeconds(input) {
  if (!hasLiteralNestedStart(input))
    return input.ordinaryStart();
  return resolveAbsoluteMediaStartSeconds({
    authoredStart: input.authoredStart,
    hostStart: input.hostStart,
    basis: input.basis
  });
}
function hasLiteralNestedStart(input) {
  return !input.hasAutoStart && input.authoredStart != null && input.hostStart > 0;
}

// ../core/dist/runtime/mediaVolumeEnvelope.js
function normaliseEnvelope(keyframes, trackStart, baseVolume) {
  const points = keyframes.filter((k) => Number.isFinite(k.time) && Number.isFinite(k.volume)).map((k) => ({
    time: Math.max(0, k.time - trackStart),
    volume: clampAudioGain(k.volume)
  })).sort((a, b) => a.time - b.time);
  const deduped = [];
  for (const point of points) {
    const previous = deduped.at(-1);
    if (previous && Math.abs(previous.time - point.time) < 1e-9) {
      previous.volume = point.volume;
    } else {
      deduped.push(point);
    }
  }
  if (deduped.length === 0)
    return deduped;
  if (deduped[0].time > 0) {
    deduped.unshift({ time: 0, volume: clampAudioGain(baseVolume) });
  }
  return deduped;
}

// ../engine/src/services/wavChunks.ts
function* riffChunks(buffer) {
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    yield { id, body: offset + 8, size };
    offset += 8 + size + size % 2;
  }
}
var EXTENSIBLE_FORMATS = /* @__PURE__ */ new Map([
  ["0100000000001000800000aa00389b71", 1],
  ["0300000000001000800000aa00389b71", 3]
]);
function extensibleFormatTag(fmt) {
  const extraSize = fmt.readUInt16LE(16);
  if (extraSize < 22 || 18 + extraSize > fmt.length) return null;
  return EXTENSIBLE_FORMATS.get(fmt.toString("hex", 24, 40)) ?? null;
}
function wavFormatTag(buffer, body, size) {
  const fmt = buffer.subarray(body, body + size);
  if (fmt.length < 16) return null;
  const tag = fmt.readUInt16LE(0);
  if (tag !== 65534) return tag;
  return fmt.length < 40 ? null : extensibleFormatTag(fmt);
}

// ../engine/src/services/audioVolumeEnvelope.ts
var PCM_FORMAT = 1;
var FLOAT_FORMAT = 3;
function readFmtChunk(buffer, body, size) {
  const format = wavFormatTag(buffer, body, size);
  const bits = buffer.readUInt16LE(body + 14);
  const float = format === FLOAT_FORMAT;
  if (!float && format !== PCM_FORMAT) return null;
  if (bits !== (float ? 32 : 16)) return null;
  const numChannels = buffer.readUInt16LE(body + 2);
  if (numChannels < 1) return null;
  return { numChannels, sampleRate: buffer.readUInt32LE(body + 4), float };
}
function isRiffWave(buffer) {
  return buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WAVE";
}
function parseWavLayout(buffer) {
  if (!isRiffWave(buffer)) return null;
  let fmt = null;
  let data = null;
  for (const { id, body, size } of riffChunks(buffer)) {
    if (id === "fmt " && body + 16 <= buffer.length) {
      fmt = readFmtChunk(buffer, body, size);
    } else if (id === "data") {
      data = { offset: body, size: Math.min(size, buffer.length - body) };
    }
  }
  if (!fmt || !data) return null;
  return { ...fmt, dataOffset: data.offset, dataSize: data.size };
}
function createEnvelopeWalker(keyframes, trackStart, baseVolume) {
  const envelope = normaliseEnvelope(keyframes, trackStart, baseVolume);
  const first = envelope[0];
  if (!first) return null;
  let segment = 0;
  return (time) => {
    for (; ; ) {
      const next = envelope[segment + 1];
      if (segment >= envelope.length - 2 || !next || time < next.time) break;
      segment += 1;
    }
    const a = envelope[segment] ?? first;
    const b = envelope[segment + 1] ?? a;
    const span = b.time - a.time;
    const progress = span <= 0 ? 0 : Math.min(1, Math.max(0, (time - a.time) / span));
    return a.volume + (b.volume - a.volume) * progress;
  };
}
function scaleSamples(buffer, layout, gainAt) {
  const { numChannels, sampleRate, dataOffset, dataSize, float } = layout;
  const bytesPerSample = float ? 4 : 2;
  const frameBytes = numChannels * bytesPerSample;
  const frameCount = Math.floor(dataSize / frameBytes);
  const scaleOne = float ? (at, gain) => buffer.writeFloatLE(buffer.readFloatLE(at) * gain, at) : (at, gain) => {
    const scaled = Math.round(buffer.readInt16LE(at) * gain);
    buffer.writeInt16LE(scaled < -32768 ? -32768 : scaled > 32767 ? 32767 : scaled, at);
  };
  for (let frame = 0; frame < frameCount; frame += 1) {
    const gain = gainAt(frame / sampleRate);
    const base = dataOffset + frame * frameBytes;
    for (let channel = 0; channel < numChannels; channel += 1) {
      scaleOne(base + channel * bytesPerSample, gain);
    }
  }
}
function applyVolumeEnvelopeToWav(wavPath, keyframes, trackStart, baseVolume) {
  const gainAt = createEnvelopeWalker(keyframes, trackStart, baseVolume);
  if (!gainAt) return false;
  let stagingDir;
  try {
    const buffer = readFileSync5(wavPath);
    const layout = parseWavLayout(buffer);
    if (!layout) return false;
    scaleSamples(buffer, layout, gainAt);
    stagingDir = mkdtempSync4(join11(dirname5(wavPath), ".hf-volume-"));
    const tempPath = join11(stagingDir, "audio.wav");
    writeFileSync4(tempPath, buffer, { flag: "wx" });
    renameSync2(tempPath, wavPath);
    return true;
  } catch {
    return false;
  } finally {
    if (stagingDir) {
      try {
        rmSync5(stagingDir, { recursive: true, force: true });
      } catch {
      }
    }
  }
}

// ../core/dist/audio/audioFxTail.js
var MAX_FX_TAIL_SECONDS = 5;
var TAIL_FLOOR = 1e-3;
function knobMax(node, key, automation) {
  const fallback = Number(normalizeAudioFxParams(node.type, node.params)[key] ?? 0);
  if (!node.id || !automation)
    return Number.isFinite(fallback) ? fallback : 0;
  const lane = automation.lanes.find((l) => l.target === fxAutomationTarget(node.id ?? "", key));
  if (!lane || lane.points.length === 0)
    return Number.isFinite(fallback) ? fallback : 0;
  return lane.points.reduce((max, p) => Math.max(max, p.v), -Infinity);
}
function delayTail(time, feedback) {
  const gap = Math.min(5, time / 1e3);
  if (gap <= 0)
    return 0;
  const fb = Math.max(0, Math.min(0.999, feedback));
  if (fb <= 0)
    return gap;
  return Math.ceil(Math.log(TAIL_FLOOR) / Math.log(fb)) * gap;
}
function reverbTail(node, automation) {
  return knobMax(node, "wet", automation) > 0 ? 0.6 + Math.max(0, Math.min(1, knobMax(node, "size", automation))) * 2.6 : 0;
}
function delayNodeTail(node, automation) {
  return knobMax(node, "mix", automation) > 0 ? delayTail(knobMax(node, "time", automation), knobMax(node, "feedback", automation)) : 0;
}
function chorusTail(node, automation) {
  return knobMax(node, "mix", automation) > 0 ? knobMax(node, "delay", automation) / 1e3 : 0;
}
function pitchshiftTail(node, automation) {
  return knobMax(node, "mix", automation) > 0 ? 0.2 : 0;
}
function nodeTail(node, automation) {
  if (node.enabled === false)
    return 0;
  switch (node.type) {
    case "reverb":
      return reverbTail(node, automation);
    case "delay":
      return delayNodeTail(node, automation);
    case "chorus":
      return chorusTail(node, automation);
    case "pitchshift":
      return pitchshiftTail(node, automation);
    default:
      return 0;
  }
}
function chainTailSeconds(chain, automation) {
  const total = chain.nodes.reduce((sum, node) => sum + nodeTail(node, automation), 0);
  return Math.min(MAX_FX_TAIL_SECONDS, total);
}

// ../engine/src/services/audioFxRender.ts
import { existsSync as existsSync9, mkdtempSync as mkdtempSync5, readFileSync as readFileSync6, rmSync as rmSync6, writeFileSync as writeFileSync5 } from "fs";
import { tmpdir as tmpdir3 } from "os";
import { join as join12 } from "path";
import { pathToFileURL } from "url";

// ../core/dist/generated/audio-fx-runtime-inline.js
var AUDIO_FX_RUNTIME_IIFE = '"use strict";(()=>{var Ae="data-fx-chain",yt=Ae.slice(5),j=1,M=(e="frequency",t="Frequency",n=1e3,o=20,a=2e4)=>({kind:"number",key:e,label:t,unit:"Hz",min:o,max:a,step:1,default:n,scale:"log",automatable:!0}),S=(e=.707,t="Bandwidth \\u2014 higher is narrower.")=>({kind:"number",key:"q",label:"Q",unit:"",min:.1,max:20,step:.01,default:e,scale:"log",automatable:!0,hint:t}),R=(e=-40,t=40,n=0)=>({kind:"number",key:"gain",label:"Gain",unit:"dB",min:e,max:t,step:.1,default:n,automatable:!0}),z={kind:"enum",key:"poles",label:"Slope",options:[{value:"1",label:"6 dB/oct"},{value:"2",label:"12 dB/oct"}],default:"2",hint:"Two poles is the usual biquad; one pole is gentler."},K=[{id:"gain",label:"Gain",group:"dynamics",description:"Raise or lower the whole signal. Automate it to duck under something else.",params:[R(-60,12,0)],web:"gain-node"},{id:"peaking",label:"Peaking EQ",group:"filter",description:"Boost or cut a band, leaving everything either side alone.",params:[M("frequency","Frequency",1e3),R(-40,40,0),S(1)],web:"biquad-peaking"},{id:"lowshelf",label:"Low Shelf",group:"filter",description:"Lift or drop everything below the corner frequency.",params:[M("frequency","Frequency",200,20,2e3),R(-40,40,0)],web:"biquad-lowshelf"},{id:"highshelf",label:"High Shelf",group:"filter",description:"Lift or drop everything above the corner frequency.",params:[M("frequency","Frequency",4e3,500,2e4),R(-40,40,0)],web:"biquad-highshelf"},{id:"highpass",label:"High-pass",group:"filter",description:"Remove low frequencies \\u2014 the usual fix for rumble on a voice.",params:[M("frequency","Cutoff",300,20,2e4),S(.707),z],web:"biquad-highpass"},{id:"lowpass",label:"Low-pass",group:"filter",description:"Remove high frequencies \\u2014 darkens or muffles a track.",params:[M("frequency","Cutoff",8e3,100,2e4),S(.707),z],web:"biquad-lowpass"},{id:"compressor",label:"Compressor",group:"dynamics",description:"Pull loud parts down so the quiet ones can come up.",params:[{kind:"number",key:"threshold",label:"Threshold",unit:"dB",min:-60,max:0,step:.5,default:-24,hint:"Level above which the compressor starts working."},{kind:"number",key:"ratio",label:"Ratio",unit:":1",min:1,max:20,step:.1,default:4},{kind:"number",key:"attack",label:"Attack",unit:"ms",min:.01,max:2e3,step:.1,default:20,scale:"log"},{kind:"number",key:"release",label:"Release",unit:"ms",min:.01,max:9e3,step:1,default:250,scale:"log"},{kind:"number",key:"knee",label:"Knee",unit:"",min:1,max:8,step:.01,default:2.83,hint:"1 is a hard corner; higher eases into it."},{kind:"number",key:"makeup",label:"Makeup",unit:"dB",min:0,max:36,step:.1,default:0},{kind:"number",key:"mix",label:"Mix",unit:"",min:0,max:1,step:.01,default:1,hint:"Below 1 blends the dry signal back in."}],web:"worklet-compressor"},{id:"limiter",label:"Limiter",group:"dynamics",description:"Hard ceiling \\u2014 nothing gets past the limit.",params:[{kind:"number",key:"limit",label:"Ceiling",unit:"dB",min:-24,max:0,step:.1,default:-1},{kind:"number",key:"attack",label:"Attack",unit:"ms",min:.1,max:80,step:.1,default:5},{kind:"number",key:"release",label:"Release",unit:"ms",min:1,max:8e3,step:1,default:50,scale:"log"},{kind:"number",key:"level_out",label:"Output",unit:"dB",min:-24,max:24,step:.1,default:0}],web:"worklet-limiter"},{id:"gate",label:"Noise Gate",group:"dynamics",description:"Silence the track when it drops below the threshold.",params:[{kind:"number",key:"threshold",label:"Threshold",unit:"dB",min:-80,max:0,step:.5,default:-35},{kind:"number",key:"range",label:"Range",unit:"dB",min:-80,max:0,step:.5,default:-24,hint:"How far down the gate pulls when closed."},{kind:"number",key:"ratio",label:"Ratio",unit:":1",min:1,max:20,step:.1,default:10},{kind:"number",key:"attack",label:"Attack",unit:"ms",min:.01,max:9e3,step:.1,default:1,scale:"log"},{kind:"number",key:"release",label:"Release",unit:"ms",min:.01,max:9e3,step:1,default:100,scale:"log"},{kind:"number",key:"knee",label:"Knee",unit:"",min:1,max:8,step:.01,default:2.83}],web:"worklet-gate"},{id:"saturate",label:"Saturation",group:"nonlinear",description:"Soft-clip the waveform for warmth or outright distortion.",params:[{kind:"enum",key:"type",label:"Curve",options:[{value:"tanh",label:"Tanh"},{value:"atan",label:"Arctan"},{value:"cubic",label:"Cubic"},{value:"exp",label:"Exponential"},{value:"alg",label:"Algebraic"},{value:"quintic",label:"Quintic"},{value:"sin",label:"Sine"},{value:"erf",label:"Error function"},{value:"hard",label:"Hard clip"}],default:"tanh"},{kind:"number",key:"threshold",label:"Threshold",unit:"dB",min:-40,max:0,step:.1,default:-6},{kind:"number",key:"output",automatable:!0,label:"Output",unit:"dB",min:-24,max:24,step:.1,default:0},{kind:"number",key:"oversample",label:"Oversample",unit:"x",min:1,max:8,step:1,default:4,hint:"Higher costs more but keeps aliasing down."}],web:"waveshaper"},{id:"bitcrush",label:"Bitcrush",group:"nonlinear",description:"Drop bit depth and sample rate for a lo-fi, digital sound.",params:[{kind:"number",key:"bits",label:"Bit depth",unit:"bit",min:1,max:32,step:.1,default:8},{kind:"number",key:"samples",label:"Sample hold",unit:"x",min:1,max:250,step:1,default:1,hint:"Repeats each sample N times \\u2014 a crude downsample."},{kind:"number",key:"mix",label:"Mix",unit:"",min:0,max:1,step:.01,default:1}],web:"worklet-bitcrush"},{id:"pitchshift",label:"Pitch shift",group:"time",description:"Shifts pitch up or down without changing playback speed. Adds ~50 ms of latency.",params:[{kind:"number",key:"semitones",label:"Semitones",unit:"st",min:-12,max:12,step:1,default:0},{kind:"number",key:"mix",label:"Mix",unit:"",min:0,max:1,step:.01,default:1}],web:"worklet-pitchshift"},{id:"delay",label:"Delay",group:"time",description:"Repeating echoes behind the dry signal.",params:[{kind:"number",key:"time",automatable:!0,label:"Time",unit:"ms",min:1,max:5e3,step:1,default:250,scale:"log"},{kind:"number",key:"feedback",automatable:!0,label:"Feedback",unit:"",min:.01,max:.95,step:.01,default:.35},{kind:"number",key:"mix",automatable:!0,label:"Mix",unit:"",min:0,max:1,step:.01,default:.4}],web:"delay-feedback"},{id:"chorus",label:"Chorus",group:"time",description:"Detuned copies of the signal for width and thickness.",params:[{kind:"number",key:"delay",automatable:!0,label:"Delay",unit:"ms",min:1,max:100,step:.1,default:7},{kind:"number",key:"depth",automatable:!0,label:"Depth",unit:"ms",min:0,max:10,step:.01,default:2},{kind:"number",key:"speed",automatable:!0,label:"Rate",unit:"Hz",min:.01,max:10,step:.01,default:1},{kind:"number",key:"mix",automatable:!0,label:"Mix",unit:"",min:0,max:1,step:.01,default:.5}],web:"chorus-lfo"},{id:"phaser",label:"Phaser",group:"time",description:"Sweeping notches moving through the spectrum.",params:[{kind:"number",key:"in_gain",automatable:!0,label:"Input",unit:"",min:0,max:1,step:.01,default:.4},{kind:"number",key:"out_gain",automatable:!0,label:"Output",unit:"",min:0,max:2,step:.01,default:.74},{kind:"number",key:"delay",label:"Delay",unit:"ms",min:.1,max:5,step:.1,default:3},{kind:"number",key:"decay",label:"Decay",unit:"",min:0,max:.99,step:.01,default:.4},{kind:"number",key:"speed",automatable:!0,label:"Rate",unit:"Hz",min:.1,max:2,step:.01,default:.5},{kind:"enum",key:"type",label:"Waveform",options:[{value:"0",label:"Triangular"},{value:"1",label:"Sinusoidal"}],default:"0"}],web:"allpass-phaser"},{id:"reverb",label:"Reverb",group:"time",description:"Room tail. Both ends convolve the same generated impulse, so preview matches render.",params:[{kind:"number",key:"size",label:"Room size",unit:"",min:.05,max:1,step:.01,default:.7},{kind:"number",key:"damping",label:"Damping",unit:"",min:0,max:1,step:.01,default:.5,hint:"Higher rolls the top off the tail faster."},{kind:"number",key:"wet",automatable:!0,label:"Wet",unit:"",min:0,max:1,step:.01,default:.35},{kind:"number",key:"dry",automatable:!0,label:"Dry",unit:"",min:0,max:1,step:.01,default:.7}],web:"convolver"}],E=new Map(K.map(e=>[e.id,e]));function F(e){return E.get(e)}var kt=K.map(e=>e.id);function k(e,t){let n=E.get(e);if(!n)return{};let o={};for(let a of n.params){let r=t?.[a.key];if(a.kind==="enum"){let s=a.options.some(l=>l.value===r);o[a.key]=s?r:a.default;continue}let i=typeof r=="number"?r:typeof r=="string"&&r.trim()!==""?Number(r):Number.NaN;o[a.key]=Number.isFinite(i)?Math.min(a.max,Math.max(a.min,i)):a.default}return o}var A=class extends Error{constructor(t){super(t),this.name="AudioFxChainError"}};function J(e){let t;try{t=JSON.parse(e)}catch(a){throw new A(`Chain file is not valid JSON: ${a.message}`)}if(typeof t!="object"||t===null)throw new A("Chain file must be a JSON object.");let n=t;if(n.version!==j)throw new A(`Unsupported chain version: ${String(n.version)}`);if(!Array.isArray(n.nodes))throw new A("Chain file is missing a `nodes` array.");let o=n.nodes.map(ye);return{version:j,nodes:o}}function H(e){return e.nodes.filter(t=>t.enabled!==!1)}function ye(e,t){if(typeof e!="object"||e===null)throw new A(`Node ${t} is not an object.`);let n=e;if(typeof n.type!="string"||!E.has(n.type))throw new A(`Node ${t} has unknown effect type: ${String(n.type)}`);return we({type:n.type,id:D(n.id),fromCarve:Y(n.fromCarve),fromPreset:D(n.fromPreset),label:D(n.label),fromEq:D(n.fromEq),fromLeveller:Y(n.fromLeveller),presetAmount:ke(n.presetAmount),enabled:n.enabled!==!1,params:k(n.type,n.params??void 0)})}function D(e){return typeof e=="string"&&e?e:void 0}function Y(e){return e===!0?!0:void 0}function ke(e){if(!(typeof e!="number"||!Number.isFinite(e)))return Math.min(1,Math.max(0,e))}function we(e){for(let t of Object.keys(e))e[t]===void 0&&delete e[t];return e}var ve=`\nconst dbToLin = (db) => Math.pow(10, db / 20);\n\n/**\n * One-pole envelope followers, one per channel.\n *\n * Per channel matters: the followers advance once per sample, so a single shared\n * follower stepped once per channel per sample. On stereo that ran a 20 ms attack\n * as 10 ms, and gave the right channel a gain computed from an envelope that had\n * already traversed the left \\u2014 so the two channels ducked by different amounts\n * from the same input and the image pumped.\n */\nclass EnvBank {\n  constructor(attackMs, releaseMs) { this.set(attackMs, releaseMs); this.values = []; }\n  set(attackMs, releaseMs) {\n    this.a = Math.exp(-1 / (sampleRate * Math.max(1e-5, attackMs / 1000)));\n    this.r = Math.exp(-1 / (sampleRate * Math.max(1e-5, releaseMs / 1000)));\n  }\n  push(ch, x) {\n    const prev = this.values[ch] ?? 0;\n    const m = Math.abs(x);\n    const c = m > prev ? this.a : this.r;\n    const next = m + c * (prev - m);\n    this.values[ch] = next;\n    return next;\n  }\n}\n\n/** Soft-knee gain computer in dB, matching acompressor\'s shape. */\nfunction kneeGain(envDb, thresholdDb, ratio, kneeDb) {\n  const over = envDb - thresholdDb;\n  if (kneeDb > 0 && over > -kneeDb && over < kneeDb) {\n    const t = (over + kneeDb) / (2 * kneeDb);\n    return -((1 - 1 / ratio) * kneeDb * t * t);\n  }\n  return over > 0 ? -(over * (1 - 1 / ratio)) : 0;\n}\n\n// log10/exp per sample is the single most expensive thing a dynamics processor\n// can do on the audio thread, and every sample below the knee needs neither:\n// its gain is exactly unity. Comparing envelopes in the linear domain lets the\n// quiet majority of samples skip the transcendentals entirely.\nconst LN10_OVER_20 = Math.LN10 / 20;\nconst dbToLinFast = (db) => Math.exp(db * LN10_OVER_20);\n\nclass HfCompressor extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.env = new EnvBank(this.p.attack ?? 20, this.p.release ?? 250);\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n      this.env.set(this.p.attack ?? 20, this.p.release ?? 250);\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const makeup = dbToLin(p.makeup ?? 0);\n    const mix = p.mix ?? 1;\n    // Knee is expressed as a ratio in FFmpeg; convert to dB width.\n    const kneeDb = 20 * Math.log10(Math.max(1.0001, p.knee ?? 2.83));\n    const thresholdDb = p.threshold ?? -24;\n    const ratio = p.ratio ?? 4;\n    // Below this the gain computer returns unity, so the sample needs no\n    // logarithm at all.\n    const kneeStartLin = dbToLin(thresholdDb - kneeDb);\n    const dry = 1 - mix;\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      for (let n = 0; n < inp.length; n++) {\n        const x = inp[n];\n        // Per-channel follower, and the sub-knee shortcut: below the knee the\n        // gain is exactly unity, so the sample needs no logarithm at all.\n        const env = this.env.push(ch, x);\n        if (env <= kneeStartLin) {\n          out[n] = x * makeup * mix + x * dry;\n          continue;\n        }\n        const envDb = 20 * Math.log10(env);\n        const g = dbToLinFast(kneeGain(envDb, thresholdDb, ratio, kneeDb));\n        out[n] = x * g * makeup * mix + x * dry;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-compressor", HfCompressor);\n\nclass HfLimiter extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.env = new EnvBank(this.p.attack ?? 5, this.p.release ?? 50);\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n      this.env.set(this.p.attack ?? 5, this.p.release ?? 50);\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const ceiling = dbToLin(this.p.limit ?? -1);\n    const outGain = dbToLin(this.p.level_out ?? 0);\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      for (let n = 0; n < inp.length; n++) {\n        const x = inp[n];\n        const env = this.env.push(ch, x);\n        // Only ever attenuate: a limiter that can raise level is a compressor.\n        const g = env > ceiling ? ceiling / env : 1;\n        out[n] = x * g * outGain;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-limiter", HfLimiter);\n\nclass HfGate extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.env = new EnvBank(this.p.attack ?? 1, this.p.release ?? 100);\n    this.gains = [];\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n      this.env.set(this.p.attack ?? 1, this.p.release ?? 100);\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const threshold = dbToLin(p.threshold ?? -35);\n    const floor = dbToLin(p.range ?? -24);\n    const ratio = p.ratio ?? 10;\n    // Knee is declared in the registry as a ratio, like the compressor\'s; a\n    // hard threshold ignored it and chattered on material sitting right at the\n    // gate point.\n    const kneeDb = 20 * Math.log10(Math.max(1.0001, p.knee ?? 2.83));\n    const kneeLin = dbToLin((p.threshold ?? -35) + kneeDb);\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      for (let n = 0; n < inp.length; n++) {\n        const x = inp[n];\n        const env = this.env.push(ch, x);\n        let target = 1;\n        // Above the threshold the gate is fully open; skip the pow entirely.\n        if (env < threshold) {\n          const under = env > 1e-9 ? threshold / env : 1e9;\n          target = Math.max(floor, 1 / Math.pow(under, ratio - 1));\n          if (!isFinite(target)) target = floor;\n        }\n        // Smooth toward the target so the gate does not click on every sample.\n        const held = this.gains[ch] ?? 1;\n        const c = target < held ? this.env.r : this.env.a;\n        const smoothed = target + c * (held - target);\n        this.gains[ch] = smoothed;\n        out[n] = x * smoothed;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-gate", HfGate);\n\nclass HfBitcrush extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.holds = [];\n    this.held = [];\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const levels = Math.pow(2, (p.bits ?? 8) - 1);\n    const step = Math.max(1, Math.round(p.samples ?? 1));\n    const mix = p.mix ?? 1;\n    for (let ch = 0; ch < i.length; ch++) {\n      const inp = i[ch], out = o[ch];\n      if (this.held[ch] === undefined) this.held[ch] = 0;\n      if (this.holds[ch] === undefined) this.holds[ch] = 0;\n      for (let n = 0; n < inp.length; n++) {\n        // Per channel: advancing one shared counter only on the last channel\n        // left every earlier channel either unheld or frozen for a whole\n        // 128-sample quantum, clicking once a block.\n        if (this.holds[ch] === 0) this.held[ch] = Math.round(inp[n] * levels) / levels;\n        out[n] = this.held[ch] * mix + inp[n] * (1 - mix);\n        this.holds[ch] = (this.holds[ch] + 1) % step;\n      }\n    }\n    return true;\n  }\n}\nregisterProcessor("hf-bitcrush", HfBitcrush);\n\n/** Linear-interpolated read, \\`delaySamples\\` behind the write head. */\nfunction readTap(ring, write, delaySamples) {\n  const len = ring.length;\n  const pos = (write - 1 - delaySamples + len) % len;\n  const i0 = Math.floor(pos);\n  const frac = pos - i0;\n  const i1 = (i0 + 1) % len;\n  return ring[i0] * (1 - frac) + ring[i1] * frac;\n}\n\n/** Equal-power-ish crossfade, zero at a tap\'s reset point \\u2014 hides the splice. */\nfunction xfade(phase) {\n  return Math.sin(Math.PI * phase);\n}\n\n/**\n * Dual-tap granular delay line: two read taps 180\\xB0 apart in a 100 ms grain,\n * each sweeping at a speed relative to the write head that shifts pitch\n * without changing duration. One tap is always fading in as the other fades\n * out, which hides the splice each tap makes when it wraps.\n *\n * write/phase are block-level state, advanced once per SAMPLE across all\n * channels together (not once per channel) \\u2014 advancing them inside the\n * per-channel loop would move the tap 2x/4x too fast on a stereo/quad input.\n */\nclass HfPitchshift extends AudioWorkletProcessor {\n  constructor(o) {\n    super();\n    this.p = o.processorOptions || {};\n    this.grain = Math.round(sampleRate * 0.1);\n    this.buf = [];\n    this.write = 0;\n    this.phase = 0;\n    // Samples written so far, capped at one grain. The taps read up to a grain\n    // behind the write head, so until this fills they would read the ring\'s\n    // zeros \\u2014 the head of every clip came out attenuated or silent.\n    this.filled = 0;\n    // How much of the wet (pitch-shifted) path is currently in the output, and\n    // where it is heading. Crossing between dry and wet is a ~50 ms jump in the\n    // signal, so it is RAMPED rather than switched: a hard swap either way is a\n    // click. Ramping in both directions is also what lets a node return to true\n    // bypass at semitones 0 \\u2014 a one-way latch left preview stuck with the delay\n    // that the render, building a fresh node from the attribute, does not have.\n    this.wet = 0;\n    this.wetTarget = 0;\n    // ~15 ms one-pole, short enough to feel immediate on a slider drag and long\n    // enough that the splice is inaudible.\n    this.wetCoef = Math.exp(-1 / (sampleRate * 0.015));\n    this.port.onmessage = (e) => {\n      if (e.data && e.data.__hfDispose) { this.dead = true; return; }\n      this.p = { ...this.p, ...e.data };\n    };\n  }\n  process(inputs, outputs) {\n    if (this.dead) return false;\n    const i = inputs[0], o = outputs[0];\n    if (!i || !i.length) return true;\n    const p = this.p;\n    const semitones = Math.max(-12, Math.min(12, p.semitones ?? 0));\n    const mix = Math.max(0, Math.min(1, p.mix ?? 1));\n    const grain = this.grain;\n    const ringLen = grain * 2;\n    const n = i[0] ? i[0].length : 0;\n    for (let ch = 0; ch < i.length; ch++) {\n      if (!this.buf[ch]) this.buf[ch] = new Float32Array(ringLen);\n    }\n\n    // Nothing to shift, or mixed fully out. The grain delay is ~grain/2\n    // whatever the ratio, so at semitones=0 this degenerated into a pure 50 ms\n    // delay of the signal \\u2014 while the copy for that exact setting reads\n    // "Unchanged pitch".\n    this.wetTarget = semitones === 0 ? 0 : mix;\n\n    // Fully dry AND settled: take the cheap transparent path. The ring keeps\n    // filling, so a later shift does not start cold.\n    if (this.wetTarget === 0 && this.wet < 1e-4) {\n      this.wet = 0;\n      let w = this.write;\n      for (let s = 0; s < n; s++) {\n        for (let ch = 0; ch < i.length; ch++) {\n          const x = i[ch][s];\n          this.buf[ch][w] = x;\n          o[ch][s] = x;\n        }\n        w = (w + 1) % ringLen;\n      }\n      this.write = w;\n      this.filled = Math.min(grain, this.filled + n);\n      return true;\n    }\n\n    const ratio = Math.pow(2, semitones / 12);\n    const inc = (1 - ratio) / grain;\n    let write = this.write, phase = this.phase, filled = this.filled, wetNow = this.wet;\n    const target = this.wetTarget, coef = this.wetCoef;\n    for (let s = 0; s < n; s++) {\n      phase += inc;\n      phase -= Math.floor(phase);\n      const phaseB = (phase + 0.5) % 1;\n      const gA = xfade(phase), gB = xfade(phaseB);\n      // Ramp the wet path in as the ring fills rather than reading zeros:\n      // 100 ms of unshifted audio at the head of a clip beats 50 ms of silence.\n      const warm = filled >= grain ? 1 : filled / grain;\n      wetNow = target + coef * (wetNow - target);\n      const wetMix = wetNow * warm;\n      for (let ch = 0; ch < i.length; ch++) {\n        const ring = this.buf[ch];\n        const inp = i[ch], out = o[ch];\n        const x = inp[s];\n        ring[write] = x;\n        const wet =\n          readTap(ring, write, phase * grain) * gA + readTap(ring, write, phaseB * grain) * gB;\n        out[s] = x * (1 - wetMix) + wet * wetMix;\n      }\n      write = (write + 1) % ringLen;\n      if (filled < grain) filled++;\n    }\n    this.write = write;\n    this.phase = phase;\n    this.filled = filled;\n    this.wet = wetNow;\n    return true;\n  }\n}\nregisterProcessor("hf-pitchshift", HfPitchshift);\n`,I=new WeakMap;var Me=new WeakSet;function O(e){let t=I.get(e);return t||(t=(async()=>{if(!e.audioWorklet)throw new Error("AudioWorklet is unavailable \\u2014 the page needs a secure context (https, localhost or file://)");let n=`data:text/javascript;base64,${btoa(String.fromCharCode(...new TextEncoder().encode(ve)))}`;await e.audioWorklet.addModule(n),Me.add(e)})().catch(n=>{throw I.delete(e),n}),I.set(e,t)),t}function Fe(e,t,n){let o=.6+Math.max(0,Math.min(1,t))*2.6,a=Math.max(1,Math.floor(e*o)),r=new Float32Array(a),i=Math.round(t*1e3)*2654435761+Math.round(n*1e3)*40503>>>0,s=()=>(i=i*1664525+1013904223>>>0,i/4294967295*2-1),l=Math.max(.001,1-Math.max(0,Math.min(1,n))),u=0,d=0;for(let c=0;c<a;c++){u+=l*(s()-u);let b=u*Math.pow(1-c/a,2.5);r[c]=b,d+=b*b}let m=Math.sqrt(d);if(m>0)for(let c=0;c<a;c++)r[c]=(r[c]??0)/m;return r}var f=e=>typeof e=="number"?e:Number(e??0),B=e=>e/1e3;function te(e,t,n,o){let a=Math.max(1,Math.round(e.sampleRate)),r=e.createBuffer(1,a,e.sampleRate),i=r.getChannelData(0);for(let u=0;u<a;u++){let d=u/a;i[u]=t==="sine"?Math.sin(2*Math.PI*d):4*Math.abs((d+.75)%1-.5)-1}let s=e.createBufferSource();s.buffer=r,s.loop=!0,s.playbackRate.value=n;let l=(o*n%1+1)%1*(a/e.sampleRate);return s.start(typeof e.currentTime=="number"?e.currentTime:0,l),s}function ne(e){try{e.stop()}catch{}e.disconnect()}function L(e,t){return[{param:e},{param:t,map:n=>1-n}]}function ae(e,t,n){e.gain.value=n,t.gain.value=1-n}function G(e,t,n){return{input:e,output:e,update:t,automation:n,dispose:()=>e.disconnect()}}var He=new Set(["peaking","highpass","lowpass"]),Q=e=>Math.pow(10,e/20),Te=(e,t)=>{let n=e.createGain(),o=a=>{n.gain.value=Q(f(a.gain))};return o(t),G(n,o,{gain:[{param:n.gain,map:Q}]})};function T(e,t){return(n,o)=>{let a=n.createBiquadFilter();a.type=e;let r=i=>{a.frequency.value=f(i.frequency),i.q!==void 0&&(a.Q.value=f(i.q)),t&&(a.gain.value=f(i.gain))};return r(o),G(a,r,{frequency:[{param:a.frequency}],...He.has(e)?{q:[{param:a.Q}]}:{},...t?{gain:[{param:a.gain}]}:{}})}}function Ne(e){return(t,n)=>{let o=Math.tan(Math.PI*f(n.frequency)/t.sampleRate),a=e==="highpass"?t.createIIRFilter([1/(1+o),-1/(1+o)],[1,(o-1)/(o+1)]):t.createIIRFilter([o/(1+o),o/(1+o)],[1,(o-1)/(o+1)]);return G(a,()=>{})}}function N(e){return(t,n)=>{let o=new AudioWorkletNode(t,e,{processorOptions:{...n}});return{input:o,output:o,update:a=>o.port.postMessage({...a}),dispose:()=>{o.port.postMessage({__hfDispose:!0}),o.disconnect()}}}}var Pe={tanh:Math.tanh,atan:e=>2/Math.PI*Math.atan(Math.PI/2*e),cubic:e=>Math.abs(e)>=1?Math.sign(e):e-e**3/3,exp:e=>Math.sign(e)*(1-Math.exp(-Math.abs(e))),alg:e=>e/Math.sqrt(1+e*e),quintic:e=>Math.abs(e)>=1?Math.sign(e):e-e**5/5,sin:e=>Math.abs(e)>=1?Math.sign(e):Math.sin(Math.PI/2*e),erf:e=>Math.tanh(1.20211*e),hard:e=>Math.max(-1,Math.min(1,e))},_e=(e,t)=>{let n=e.createWaveShaper(),o=e.createGain(),a=e.createGain();o.connect(n).connect(a);let r=i=>{let s=Pe[String(i.type)]??Math.tanh,l=Math.pow(10,f(i.threshold)/20),u=8192,d=new Float32Array(u);for(let m=0;m<u;m++){let c=m/(u-1)*2-1;d[m]=s(c/Math.max(1e-6,l))*l}n.curve=d,n.oversample=f(i.oversample)>=4?"4x":f(i.oversample)>=2?"2x":"none",a.gain.value=Math.pow(10,f(i.output)/20)};return r(t),{input:o,output:a,update:r,automation:{output:[{param:a.gain,map:i=>Math.pow(10,i/20)}]},dispose:()=>{o.disconnect(),n.disconnect(),a.disconnect()}}},Re=(e,t)=>{let n=e.createGain(),o=e.createGain(),a=e.createDelay(5),r=e.createGain(),i=e.createGain(),s=e.createGain();n.connect(a),a.connect(r),r.connect(a),a.connect(i).connect(o),n.connect(s).connect(o);let l=u=>{a.delayTime.value=Math.min(5,f(u.time)/1e3),r.gain.value=f(u.feedback),ae(i,s,f(u.mix))};return l(t),{input:n,output:o,update:l,automation:{time:[{param:a.delayTime,map:u=>Math.min(5,B(u))}],feedback:[{param:r.gain}],mix:L(i.gain,s.gain)},dispose:()=>[n,o,a,r,i,s].forEach(u=>u.disconnect())}},De=(e,t,n)=>{let o=e.createGain(),a=e.createGain(),r=e.createDelay(.5),i=te(e,"sine",f(t.speed),n),s=e.createGain(),l=e.createGain(),u=e.createGain();i.connect(s).connect(r.delayTime),o.connect(r).connect(l).connect(a),o.connect(u).connect(a);let d=m=>{r.delayTime.value=f(m.delay)/1e3,s.gain.value=f(m.depth)/1e3,i.playbackRate.value=f(m.speed),ae(l,u,f(m.mix))};return d(t),{input:o,output:a,update:d,automation:{delay:[{param:r.delayTime,map:B}],depth:[{param:s.gain,map:B}],speed:[{param:i.playbackRate}],mix:L(l.gain,u.gain)},dispose:()=>{ne(i),[o,a,r,s,l,u].forEach(m=>m.disconnect())}}},Ce=6,Se=(e,t,n)=>{let o=e.createGain(),a=e.createGain(),r=e.createGain(),i=e.createGain(),s=te(e,String(t.type)==="1"?"sine":"triangle",f(t.speed),n),l=e.createGain(),u=e.createGain(),d=e.createGain(),m=[];o.connect(r);let c=r;for(let p=0;p<Ce;p++){let h=e.createBiquadFilter();h.type="allpass",h.Q.value=.7071,l.connect(h.frequency),c.connect(h),c=h,m.push(h)}s.connect(l),c.connect(u).connect(i),r.connect(d).connect(i),i.connect(a);let b=p=>{let h=1e3/Math.max(.1,f(p.delay));for(let g of m)g.frequency.value=h;l.gain.value=h*f(p.decay),s.playbackRate.value=f(p.speed),r.gain.value=f(p.in_gain),i.gain.value=f(p.out_gain),u.gain.value=1,d.gain.value=1};return b(t),{input:o,output:a,update:b,automation:{speed:[{param:s.playbackRate}],in_gain:[{param:r.gain}],out_gain:[{param:i.gain}]},dispose:()=>{ne(s),[o,a,r,i,l,u,d,...m].forEach(p=>p.disconnect())}}},Ee=(e,t)=>{let n=e.createGain(),o=e.createGain(),a=e.createConvolver(),r=e.createGain(),i=e.createGain();a.normalize=!1,n.connect(a).connect(r).connect(o),n.connect(i).connect(o);let s="",l=u=>{let d=`${f(u.size)}:${f(u.damping)}`;if(d!==s){let m=Fe(e.sampleRate,f(u.size),f(u.damping)),c=e.createBuffer(1,m.length,e.sampleRate);c.getChannelData(0).set(m),a.buffer=c,s=d}r.gain.value=f(u.wet),i.gain.value=f(u.dry)};return l(t),{input:n,output:o,update:l,automation:{wet:[{param:r.gain}],dry:[{param:i.gain}]},dispose:()=>[n,o,a,r,i].forEach(u=>u.disconnect())}},Ie={"gain-node":Te,"biquad-peaking":T("peaking",!0),"biquad-lowshelf":T("lowshelf",!0),"biquad-highshelf":T("highshelf",!0),"biquad-highpass":T("highpass",!1),"biquad-lowpass":T("lowpass",!1),"worklet-compressor":N("hf-compressor"),"worklet-limiter":N("hf-limiter"),"worklet-gate":N("hf-gate"),"worklet-bitcrush":N("hf-bitcrush"),"worklet-pitchshift":N("hf-pitchshift"),waveshaper:_e,"delay-feedback":Re,"chorus-lfo":De,"allpass-phaser":Se,convolver:Ee};function oe(e){return e.nodes.some(t=>F(t.type)?.web.startsWith("worklet-")??!1)}function Oe(e,t,n,o=0){let a=F(t);if(!a)throw new Error(`Unknown effect type: ${t}`);let r=k(t,n);if((t==="highpass"||t==="lowpass")&&String(r.poles)==="1")return Ne(t)(e,r,o);let i=Ie[a.web];if(!i)throw new Error(`No Web Audio builder for ${a.web}`);return i(e,r,o)}function Z(e){let t=[];for(let n of e){let o=n.fromPreset,a=t.at(-1);if(a&&a.preset===o)a.nodes.push(n);else{let r=typeof n.presetAmount=="number"?n.presetAmount:1;t.push({...o?{preset:o}:{},amount:Math.min(1,Math.max(0,r)),nodes:[n]})}}return t}function ee(e){return H(e).map(t=>{let n=k(t.type,t.params),o=n.poles!==void 0?`:${n.poles}`:"",a=String(n.poles)==="1"?`@${n.frequency}`:"",r=t.type==="phaser"?`~${n.type}`:"",i=t.fromPreset?`%${t.fromPreset}`:"";return`${t.type}${o}${a}${r}${i}`}).join("|")}function re(e,t,n=0){var m;let o=e.createGain(),a=e.createGain(),r=[],i=[],s=Z(H(t)),l=o;for(let c of s){let b=null;if(c.preset){let p=e.createGain(),h=e.createGain(),g=e.createGain(),v=e.createGain();g.gain.value=c.amount,h.gain.value=1-c.amount,l.connect(p),p.connect(h).connect(v),b={entry:p,wet:g,dry:h,join:v},l=p}for(let p of c.nodes){let h=Oe(e,p.type,p.params??{},n);l.connect(h.input),l=h.output,r.push({...p.id?{id:p.id}:{},type:p.type,handle:h})}b&&c.preset&&(l.connect(b.wet).connect(b.join),i.push({id:c.preset,...b}),l=b.join)}l.connect(a);let u=ee(t),d={};for(let c of i)(d[m=c.id]??(d[m]=[])).push(...L(c.wet.gain,c.dry.gain));return{input:o,output:a,presets:d,nodes:r,update(c){if(ee(c)!==u)return!1;H(c).forEach((p,h)=>{let g=r[h];g&&(g.handle.update(k(p.type,p.params)),p.id===void 0?delete g.id:g.id=p.id)});let b=0;for(let p of Z(H(c))){if(!p.preset)continue;let h=i[b++];!h||h.id!==p.preset||(h.wet.gain.value=p.amount,h.dry.gain.value=1-p.amount)}return!0},dispose(){for(let{handle:c}of r)c.dispose();for(let{entry:c,wet:b,dry:p,join:h}of i)c.disconnect(),b.disconnect(),p.disconnect(),h.disconnect();o.disconnect(),a.disconnect()}}}function Be(e){return 10**(e/20)}var ie=Be(12);var q=.1,V=10;var Le="data-automation",Et=Le.slice(5),C=1,Ge=512,x=class extends Error{constructor(t){super(t),this.name="AudioAutomationError"}},U="volume",se="rate";function _(e){if(e===U)return{kind:"volume"};if(e===se)return{kind:"rate"};let t=e.split(".");if(t.length===3&&t[0]==="fx"&&t[1]===qe){let a=t[2];return a?{kind:"preset",presetId:a}:null}if(t.length!==3||t[0]!=="fx")return null;let[,n,o]=t;return!n||!o?null:{kind:"fx",nodeId:n,param:o}}function ue(e,t){return`fx.${e}.${t}`}var qe="preset";var Ve={min:0,max:1,step:.01,unit:"",label:"Amount",scale:"linear",default:1},le={min:0,max:ie,step:.01,unit:"",label:"Volume",scale:"linear",default:1},de={min:q,max:V,step:.05,unit:"x",label:"Speed",scale:"log",default:1};function X(e,t){let n=_(e);if(!n)return null;if(n.kind==="volume")return le;if(n.kind==="rate")return de;if(n.kind==="preset")return t?.nodes.some(s=>s.fromPreset===n.presetId)?{...Ve,label:`${n.presetId} \\xB7 Amount`}:null;let o=t?.nodes.find(i=>i.id===n.nodeId);if(!o)return null;let a=F(o.type),r=a?.params.find(i=>i.key===n.param);return!r||r.kind!=="number"?null:{min:r.min,max:r.max,step:r.step,unit:r.unit,label:`${a?.label??o.type} \\xB7 ${r.label}`,scale:r.scale==="log"&&r.min>0?"log":"linear",default:r.default}}function P(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"&&e.trim()!==""){let t=Number(e);return Number.isFinite(t)?t:null}return null}function Ue(e){let t=P(e);return t===null||t===0?0:Math.min(1,Math.max(-1,t))}function ce(e,t){let n=P(e),o=P(t);if(n===null||o===null)return null;let a=s=>Math.min(.999,Math.max(.001,s)),r=a(n),i=a(o);return Math.abs(r-i)<1e-6?null:{x:r,y:i}}function Xe(e){let t=Ue(e?.curve),n=ce(e?.viaX,e?.viaY);return{...t?{curve:t}:{},...n?{viaX:n.x,viaY:n.y}:{}}}function $e(e,t){let n=P(e?.t),o=P(e?.v);if(n===null||o===null)return null;let a=t?Math.min(t.max,Math.max(t.min,o)):o;return{t:Math.max(0,n),v:a,...Xe(e)}}function me(e,t){let n=e.map(a=>$e(a,t)).filter(a=>a!==null).sort((a,r)=>a.t-r.t),o=[];for(let a of n)o.length>0&&o[o.length-1].t===a.t?o[o.length-1]=a:o.push(a);return o.slice(0,Ge)}function We(e){let t=[];for(let n of e.lanes){if(!_(n.target))continue;let o=n.target===U?le:n.target===se?de:null,a=me(n.points??[],o);a.length>0&&t.push({target:n.target,points:a})}return{version:C,lanes:t}}function pe(e,t){let n=[];for(let o of e.lanes){let a=X(o.target,t);if(!a)continue;let r=me(o.points,a);r.length>0&&n.push({target:o.target,points:r})}return{version:C,lanes:n}}function he(e){let t;try{t=JSON.parse(e)}catch(a){throw new x(`Automation is not valid JSON: ${a.message}`)}if(typeof t!="object"||t===null)throw new x("Automation must be a JSON object.");let n=t;if(n.version!==C)throw new x(`Unsupported automation version: ${String(n.version)}`);if(!Array.isArray(n.lanes))throw new x("Automation is missing a `lanes` array.");let o=n.lanes.map((a,r)=>{if(typeof a!="object"||a===null)throw new x(`Lane ${r} is not an object.`);let i=a;if(typeof i.target!="string"||!_(i.target))throw new x(`Lane ${r} has an unreadable target: ${String(i.target)}`);if(!Array.isArray(i.points))throw new x(`Lane ${r} is missing a \\`points\\` array.`);return{target:i.target,points:i.points}});return We({version:C,lanes:o})}function je(e,t){return t?Math.pow(e,Math.pow(2,2*t)):e}function ze(e,t){let n=e-.5,o=t-.5,a=.999,r=1e6,i=n>0?n/(a-e):n<0?-n/(e-(1-a)):0,s=o>0?o/(a-t):o<0?-o/(t-(1-a)):0,l=Math.min(r,Math.max(1,i,s));return{cx:e+n/l,cy:t+o/l,w:l}}function Ye(e,t,n){let{cx:o,cy:a,w:r}=ze(t,n),i=2-2*r,s=e*i-1+2*r*o,l=-e*i-2*r*o,u=Ke(s,l,e),d=1-u,m=d*d+2*r*u*d+u*u;return m>0?(2*r*a*u*d+u*u)/m:e}function Ke(e,t,n){if(Math.abs(e)<1e-12)return Math.abs(t)<1e-12?n:-n/t;let o=Math.sqrt(Math.max(0,t*t-4*e*n)),a=(-t+o)/(2*e),r=(-t-o)/(2*e),i=s=>s>=-1e-9&&s<=1+1e-9;return i(a)?Math.min(1,Math.max(0,a)):i(r)?Math.min(1,Math.max(0,r)):n}function Je(e,t){let n=ce(t.viaX,t.viaY);return n?Ye(Math.min(1,Math.max(0,e)),n.x,n.y):je(e,t.curve)}function Qe(e,t,n,o){return o==="log"&&e>0&&t>0?Math.exp(Math.log(e)+(Math.log(t)-Math.log(e))*n):e+(t-e)*n}function $(e,t,n="linear"){let o=e.points;if(o.length===0)return 0;let a=o[0];if(t<=a.t)return a.v;let r=o[o.length-1];if(t>=r.t)return r.v;let i=0,s=o.length-1;for(;s-i>1;){let m=i+s>>1;o[m].t<=t?i=m:s=m}let l=o[i],u=o[s],d=u.t-l.t;return d<=0?u.v:Qe(l.v,u.v,Je((t-l.t)/d,l),n)}function fe(e){return e.points.length<=1||e.points.every(t=>t.v===e.points[0].v)}function be(e,t,n,o,a="linear"){let r=Math.max(2,Math.floor(o)),i=new Float32Array(r),s=n-t;for(let l=0;l<r;l+=1)i[l]=$(e,t+s*l/(r-1),a);return i}var Ze=100,et=8,tt=4096,W=e=>e;function nt(e,t,n){return!(!!e.curve||e.viaX!==void 0&&e.viaY!==void 0)&&t==="linear"&&!n}function at(e){let t=Math.ceil(e*Ze);return Math.min(tt,Math.max(et,t))}function ot(e,t,n,o,a){let{scheduledAt:r,elapsed:i,rate:s}=o,l=a??W,u=w=>r+(w-i)/s,d=e.points[t],m=e.points[t+1],c=u(m.t);if(c<=r)return null;let b=Math.max(r,u(d.t)),p=c-b;if(p<=0)return null;if(nt(d,n,a))return{kind:"ramp",time:c,value:l(m.v)};let h=at(p),g=be(e,Math.max(d.t,i),m.t,h,n),v=new Float32Array(h);for(let w=0;w<h;w+=1)v[w]=l(g[w]??0);return{kind:"curve",time:b,duration:p,values:v}}function rt(e,t,n,o){let a=[];for(let i=0;i+1<e.points.length;i+=1){let s=ot(e,i,t,n,o);s&&a.push(s)}let r=a[0];return r?.kind==="curve"&&r.time<=n.scheduledAt||a.unshift({kind:"set",time:n.scheduledAt,value:(o??W)($(e,n.elapsed,t))}),a}function it(e,t){for(let n of t)if(n.kind==="set")e.setValueAtTime(n.value,n.time);else if(n.kind==="ramp")e.linearRampToValueAtTime(n.value,n.time);else try{e.setValueCurveAtTime(n.values,n.time,n.duration)}catch{let o=n.values[n.values.length-1]??0;e.linearRampToValueAtTime(o,n.time+n.duration)}}function st(e){for(let t of e)t.param.cancelScheduledValues(0)}function ut(e,t,n,o){if(t.points.length!==0)for(let a of e){if(st([a]),fe(t)){let r=(a.map??W)(t.points[0].v);a.param.setValueAtTime(r,o.scheduledAt);continue}it(a.param,rt(t,n,o,a.map))}}function ge(e,t,n,o,a){let r=new Map(n.filter(s=>s.id).map(s=>[s.id,s.handle])),i=[];for(let s of e.lanes){let l=_(s.target);if(!l)continue;let u=l.kind==="preset"?a?.[l.presetId]:l.kind==="fx"?r.get(l.nodeId)?.automation?.[l.param]:void 0;if(!u||u.length===0)continue;let d=X(s.target,t);d&&(ut(u,s,d.scale,o),i.push(...u))}return i}var lt=5,dt=.001;function y(e,t,n){let o=Number(k(e.type,e.params)[t]??0);if(!e.id||!n)return Number.isFinite(o)?o:0;let a=n.lanes.find(r=>r.target===ue(e.id??"",t));return!a||a.points.length===0?Number.isFinite(o)?o:0:a.points.reduce((r,i)=>Math.max(r,i.v),-1/0)}function ct(e,t){let n=Math.min(5,e/1e3);if(n<=0)return 0;let o=Math.max(0,Math.min(.999,t));return o<=0?n:Math.ceil(Math.log(dt)/Math.log(o))*n}function mt(e,t){return y(e,"wet",t)>0?.6+Math.max(0,Math.min(1,y(e,"size",t)))*2.6:0}function pt(e,t){return y(e,"mix",t)>0?ct(y(e,"time",t),y(e,"feedback",t)):0}function ht(e,t){return y(e,"mix",t)>0?y(e,"delay",t)/1e3:0}function ft(e,t){return y(e,"mix",t)>0?.2:0}function bt(e,t){if(e.enabled===!1)return 0;switch(e.type){case"reverb":return mt(e,t);case"delay":return pt(e,t);case"chorus":return ht(e,t);case"pitchshift":return ft(e,t);default:return 0}}function xe(e,t){let n=e.nodes.reduce((o,a)=>o+bt(a,t),0);return Math.min(lt,n)}function gt(e,t,n,o,a){let r=e.createBuffer(n,o,a);for(let i=0;i<n;i++){let s=t[i];s&&r.getChannelData(i).set(s)}return r}function xt(e){let t=[];for(let n=0;n<e.numberOfChannels;n++)t.push(new Float32Array(e.getChannelData(n)));return t}async function At(e,t,n,o){let a=J(n),r=Math.max(1,e.length),i=e[0]?.length??0;if(i===0)return e;let s=o?pe(he(o),a):null,l=Math.ceil(xe(a,s??void 0)*t),u=new OfflineAudioContext(r,i+l,t);oe(a)&&await O(u);let d=u.createBufferSource();d.buffer=gt(u,e,r,i,t);let m=re(u,a);return s&&ge(s,a,m.nodes,{scheduledAt:0,elapsed:0,rate:1},m.presets),d.connect(m.input),m.output.connect(u.destination),d.start(),xt(await u.startRendering())}window.__HF_AUDIO_FX={render:At};})();\n';
function getAudioFxRuntimeScript() {
  return AUDIO_FX_RUNTIME_IIFE;
}

// ../engine/src/services/audioFxRender.ts
var AudioFxRenderError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "AudioFxRenderError";
  }
};
function readWavChunks(buf) {
  const head = { format: 1, channels: 1, sampleRate: 48e3, bits: 16 };
  let data;
  for (const { id, body, size } of riffChunks(buf)) {
    if (id === "fmt ") {
      const format = wavFormatTag(buf, body, size);
      if (format === null) throw new AudioFxRenderError("Invalid or unsupported WAV format header");
      head.format = format;
      head.channels = buf.readUInt16LE(body + 2);
      head.sampleRate = buf.readUInt32LE(body + 4);
      head.bits = buf.readUInt16LE(body + 14);
    } else if (id === "data") {
      data = buf.subarray(body, Math.min(buf.length, body + size));
      break;
    }
  }
  return { ...head, data };
}
function readWav(path) {
  const buf = readFileSync6(path);
  if (buf.length < 44 || buf.toString("ascii", 0, 4) !== "RIFF") {
    throw new AudioFxRenderError(`Not a WAV file: ${path}`);
  }
  const { format, channels, sampleRate, bits, data } = readWavChunks(buf);
  if (!data) throw new AudioFxRenderError(`WAV has no data chunk: ${path}`);
  return {
    samples: decodeSamples(data, format, bits, path),
    sampleRate,
    channels,
    float: format === 3 && bits === 32
  };
}
function decodeSamples(data, format, bits, path) {
  if (format === 3 && bits === 32) {
    const n = Math.floor(data.length / 4);
    if (data.byteOffset % 4 === 0) return new Float32Array(data.buffer, data.byteOffset, n);
    const copied = new Float32Array(n);
    for (let i = 0; i < n; i++) copied[i] = data.readFloatLE(i * 4);
    return copied;
  }
  if (format === 1 && bits === 16) {
    const n = Math.floor(data.length / 2);
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) out[i] = data.readInt16LE(i * 2) / 32768;
    return out;
  }
  throw new AudioFxRenderError(`Unsupported WAV format ${format}/${bits}-bit: ${path}`);
}
function writeWav(path, samples, sampleRate, channels = 1, float = false) {
  const n = samples.length;
  const bytesPerSample = float ? 4 : 2;
  const bytes = n * bytesPerSample;
  const buf = Buffer.alloc(44 + bytes);
  buf.write("RIFF", 0, "ascii");
  buf.writeUInt32LE(36 + bytes, 4);
  buf.write("WAVE", 8, "ascii");
  buf.write("fmt ", 12, "ascii");
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(float ? 3 : 1, 20);
  buf.writeUInt16LE(channels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * channels * bytesPerSample, 28);
  buf.writeUInt16LE(channels * bytesPerSample, 32);
  buf.writeUInt16LE(float ? 32 : 16, 34);
  buf.write("data", 36, "ascii");
  buf.writeUInt32LE(bytes, 40);
  for (let i = 0; i < n; i++) {
    if (float) {
      buf.writeFloatLE(samples[i] ?? 0, 44 + i * 4);
      continue;
    }
    const v = Math.max(-1, Math.min(1, samples[i] ?? 0));
    buf.writeInt16LE(Math.round(v * 32767), 44 + i * 2);
  }
  writeFileSync5(path, buf);
}
function deinterleave(samples, channels) {
  if (channels <= 1) return [samples];
  const frames = Math.floor(samples.length / channels);
  const out = Array.from({ length: channels }, () => new Float32Array(frames));
  for (let i = 0; i < frames; i++) {
    for (let c = 0; c < channels; c++) {
      out[c][i] = samples[i * channels + c] ?? 0;
    }
  }
  return out;
}
function interleave(planes) {
  if (planes.length === 1) return planes[0];
  const frames = planes[0]?.length ?? 0;
  const out = new Float32Array(frames * planes.length);
  for (let i = 0; i < frames; i++) {
    for (let c = 0; c < planes.length; c++) {
      out[i * planes.length + c] = planes[c][i] ?? 0;
    }
  }
  return out;
}
var TRANSFER_BYTES = 8 * 1024 * 1024;
function applyEnvelopeToPlanes(planes, sampleRate, gainAt) {
  const frames = planes[0]?.length ?? 0;
  for (let frame = 0; frame < frames; frame += 1) {
    const gain = gainAt(frame / sampleRate);
    for (const plane of planes) plane[frame] = (plane[frame] ?? 0) * gain;
  }
}
async function applyAudioFxChain(inputWav, chain, outputWav, options) {
  if (enabledAudioFxNodes(chain).length === 0) return { path: inputWav, envelopeBaked: false };
  if (!existsSync9(inputWav)) {
    throw new AudioFxRenderError(`Audio FX input is missing: ${inputWav}`);
  }
  const { samples, sampleRate, channels, float } = readWav(inputWav);
  const planes = deinterleave(samples, channels);
  if ((planes[0]?.length ?? 0) === 0) return { path: inputWav, envelopeBaked: false };
  const hostDir = mkdtempSync5(join12(tmpdir3(), "hf-fx-host-"));
  let lease = null;
  try {
    if (options.signal?.aborted) {
      throw new AudioFxRenderError(`Audio FX cancelled for track ${options.trackId}`);
    }
    lease = await acquireBrowser(["--no-sandbox", "--autoplay-policy=no-user-gesture-required"]);
    const page = await lease.browser.newPage();
    try {
      const hostPage = join12(hostDir, "audio-fx.html");
      writeFileSync5(hostPage, "<!doctype html><meta charset=utf-8><title>audio fx</title>");
      await page.goto(pathToFileURL(hostPage).href, { waitUntil: "domcontentloaded" });
      await page.addScriptTag({ content: getAudioFxRuntimeScript() });
      await sendPlanesToPage(page, planes);
      const outLengths = await renderPlanesInPage(
        page,
        sampleRate,
        chain,
        options.automation ? serializeAutomation(options.automation) : ""
      );
      const outPlanes = await readPlanesFromPage(page, outLengths);
      if (outPlanes.length === 0 || (outPlanes[0]?.length ?? 0) === 0) {
        throw new AudioFxRenderError(`Audio FX produced no samples for track ${options.trackId}`);
      }
      const gainAt = envelopeWalkerFor(options.envelope);
      if (gainAt) applyEnvelopeToPlanes(outPlanes, sampleRate, gainAt);
      writeWav(outputWav, interleave(outPlanes), sampleRate, outPlanes.length, float);
      return { path: outputWav, envelopeBaked: gainAt !== null };
    } finally {
      await page.close().catch(() => void 0);
    }
  } catch (err) {
    if (err instanceof AudioFxRenderError) throw err;
    throw new AudioFxRenderError(
      `Audio FX failed for track ${options.trackId}: ${err.message}`
    );
  } finally {
    rmSync6(hostDir, { recursive: true, force: true });
    await lease?.release().catch(() => void 0);
  }
}
async function sendPlanesToPage(page, planes) {
  await page.evaluate((count) => {
    window.__HF_FX_IO = {
      in: Array.from({ length: count }, () => []),
      out: []
    };
  }, planes.length);
  for (let p = 0; p < planes.length; p += 1) {
    const plane = planes[p];
    if (!plane) continue;
    const bytes = Buffer.from(plane.buffer, plane.byteOffset, plane.length * 4);
    for (let at = 0; at < bytes.length; at += TRANSFER_BYTES) {
      await page.evaluate(
        ([index, b64]) => {
          const bin = atob(b64);
          const chunk = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) chunk[i] = bin.charCodeAt(i);
          window.__HF_FX_IO?.in[index]?.push(chunk);
        },
        [p, bytes.subarray(at, at + TRANSFER_BYTES).toString("base64")]
      );
    }
  }
}
async function renderPlanesInPage(page, sampleRate, chain, automationJson) {
  return await page.evaluate(
    async ([rate, chainJson, automation]) => {
      const w = window;
      const io = w.__HF_FX_IO;
      if (!w.__HF_AUDIO_FX || !io) throw new Error("audio FX runtime failed to load");
      const inPlanes = io.in.map((chunks) => {
        const bytes = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
        let at = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, at);
          at += chunk.length;
        }
        return new Float32Array(bytes.buffer);
      });
      io.in = [];
      io.out = await w.__HF_AUDIO_FX.render(inPlanes, rate, chainJson, automation || void 0);
      return io.out.map((plane) => plane.length);
    },
    [sampleRate, JSON.stringify(chain), automationJson]
  );
}
async function readPlaneFromPage(page, index, byteLength) {
  const parts = [];
  for (let at = 0; at < byteLength; at += TRANSFER_BYTES) {
    const b64 = await page.evaluate(
      ([plane_index, offset, limit]) => {
        const plane = window.__HF_FX_IO?.out[plane_index];
        if (!plane) return "";
        const u8 = new Uint8Array(
          plane.buffer,
          plane.byteOffset + offset,
          Math.min(limit, plane.length * 4 - offset)
        );
        let s = "";
        const CHUNK = 32768;
        for (let i = 0; i < u8.length; i += CHUNK) {
          s += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
        }
        return btoa(s);
      },
      [index, at, TRANSFER_BYTES]
    );
    parts.push(Buffer.from(b64, "base64"));
  }
  const buf = Buffer.concat(parts);
  return new Float32Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
async function readPlanesFromPage(page, outLengths) {
  const outPlanes = [];
  for (let p = 0; p < outLengths.length; p += 1) {
    outPlanes.push(await readPlaneFromPage(page, p, (outLengths[p] ?? 0) * 4));
  }
  return outPlanes;
}
function envelopeWalkerFor(envelope) {
  if (!envelope) return null;
  return createEnvelopeWalker(envelope.keyframes, envelope.trackStart, envelope.baseVolume);
}

// ../engine/src/services/audioMixer.ts
var MIXED_AUDIO_FILENAME = "audio.m4a";
function clampVolume(volume) {
  return clampAudioGain(volume);
}
function safePathSegment(id, fallbackIndex) {
  const cleaned = id.replace(/[^A-Za-z0-9_-]/g, "_");
  return `${cleaned || "group"}-${fallbackIndex}`;
}
function formatFilterNumber(value) {
  return Number(value.toFixed(6)).toString();
}
function buildAtempoFilter(playbackRate) {
  let remaining = normalizePlaybackRate(playbackRate);
  if (Math.abs(remaining - 1) < 1e-9) return null;
  const stages = [];
  while (remaining < 0.5 - 1e-9) {
    stages.push(0.5);
    remaining /= 0.5;
  }
  while (remaining > 2 + 1e-9) {
    stages.push(2);
    remaining /= 2;
  }
  if (Math.abs(remaining - 1) >= 1e-9) stages.push(remaining);
  return stages.map((stage) => `atempo=${formatFilterNumber(stage)}`).join(",");
}
var RAMP_SLICE_SECONDS = 0.25;
var MAX_RAMP_SLICES = 240;
function buildRampFilterComplex(lane, duration, tailFilter) {
  const slices = Math.min(MAX_RAMP_SLICES, Math.max(1, Math.ceil(duration / RAMP_SLICE_SECONDS)));
  const step = duration / slices;
  const split = Array.from({ length: slices }, (_, i) => `[s${i}]`).join("");
  const parts = [`[0:a]asplit=${slices}${split}`];
  for (let i = 0; i < slices; i += 1) {
    const from = sourceTimeAt(lane, i * step);
    const to = sourceTimeAt(lane, (i + 1) * step);
    const tempo = buildAtempoFilter((to - from) / step);
    const chain = [
      `atrim=start=${formatFilterNumber(from)}:end=${formatFilterNumber(to)}`,
      "asetpts=PTS-STARTPTS",
      ...tempo ? [tempo] : [],
      "apad",
      "asetpts=N/SR/TB",
      `atrim=0:${formatFilterNumber(step)}`
    ].join(",");
    parts.push(`[s${i}]${chain}[t${i}]`);
  }
  const joined = Array.from({ length: slices }, (_, i) => `[t${i}]`).join("");
  parts.push(`${joined}concat=n=${slices}:v=0:a=1${tailFilter ? "[cat]" : "[out]"}`);
  if (tailFilter) parts.push(`[cat]${tailFilter}[out]`);
  return parts.join(";");
}
function preparedAudioOutputArgs(srcPath, playbackRate, duration = 0) {
  return stereoOutputArgs(srcPath).then((channelArgs) => {
    const filters = [];
    const outputArgs = [];
    if (channelArgs[0] === "-af" && channelArgs[1]) {
      filters.push(channelArgs[1]);
    } else {
      outputArgs.push(...channelArgs);
    }
    if (typeof playbackRate === "object") {
      const graph = buildRampFilterComplex(playbackRate, duration, filters.join(",") || null);
      return ["-filter_complex", graph, "-map", "[out]", ...outputArgs];
    }
    const atempo = buildAtempoFilter(playbackRate);
    if (atempo) filters.push(atempo);
    if (filters.length > 0) outputArgs.push("-af", filters.join(","));
    return outputArgs;
  });
}
function escapeExpressionCommas(expression) {
  return expression.replace(/\\/g, "\\\\").replace(/,/g, "\\,");
}
function legacyFilterScriptOptionIsUnsupported(stderr) {
  return /filter_complex_script/i.test(stderr) && /(?:unrecognized option|option (?:was )?not found)/i.test(stderr);
}
var MAX_VOLUME_SEGMENTS = 32;
var VOLUME_SIMPLIFY_EPSILON = 5e-3;
var STEREO_CHANNEL_FILTER = "pan=stereo|FL=FL+FC|FR=FR+FC";
async function stereoOutputArgs(srcPath) {
  try {
    const { channels } = await extractAudioMetadata(srcPath);
    if (channels === 1) return ["-af", STEREO_CHANNEL_FILTER];
  } catch {
  }
  return ["-ac", "2"];
}
function simplifyVolumeKeyframes(keyframes) {
  if (keyframes.length < 3) return keyframes;
  const keep = new Array(keyframes.length).fill(false);
  keep[0] = true;
  keep[keyframes.length - 1] = true;
  const stack = [[0, keyframes.length - 1]];
  while (stack.length > 0) {
    const [startIndex, endIndex] = stack.pop();
    const start = keyframes[startIndex];
    const end = keyframes[endIndex];
    const span = end.time - start.time;
    let maxDistance = VOLUME_SIMPLIFY_EPSILON;
    let splitIndex = -1;
    for (let i = startIndex + 1; i < endIndex; i += 1) {
      const point = keyframes[i];
      const interpolated = span === 0 ? start.volume : start.volume + (end.volume - start.volume) * (point.time - start.time) / span;
      const distance = Math.abs(point.volume - interpolated);
      if (distance > maxDistance) {
        maxDistance = distance;
        splitIndex = i;
      }
    }
    if (splitIndex !== -1) {
      keep[splitIndex] = true;
      stack.push([startIndex, splitIndex], [splitIndex, endIndex]);
    }
  }
  const simplified = keyframes.filter((_, i) => keep[i]);
  if (simplified.length <= MAX_VOLUME_SEGMENTS) return simplified;
  const step = (simplified.length - 1) / (MAX_VOLUME_SEGMENTS - 1);
  const sampled = [];
  for (let i = 0; i < MAX_VOLUME_SEGMENTS; i += 1) {
    const point = simplified[Math.round(i * step)];
    if (sampled.length === 0 || point.time > sampled.at(-1).time) sampled.push(point);
  }
  return sampled;
}
function buildVolumeExpression(track, ignoreKeyframes = false) {
  const trimDuration = track.end - track.start;
  const staticVolume = clampVolume(track.volume);
  const keyframes = (ignoreKeyframes ? [] : track.volumeKeyframes ?? []).filter((keyframe) => Number.isFinite(keyframe.time) && Number.isFinite(keyframe.volume)).map((keyframe) => ({
    time: Math.max(0, Math.min(trimDuration, keyframe.time - track.start)),
    volume: clampVolume(keyframe.volume)
  })).sort((a, b) => a.time - b.time);
  if (keyframes.length === 0) return `volume=${formatFilterNumber(staticVolume)}`;
  if (keyframes[0].time > 0) {
    keyframes.unshift({ time: 0, volume: staticVolume });
  }
  const deduped = [];
  for (const keyframe of keyframes) {
    const previous = deduped.at(-1);
    if (previous && Math.abs(previous.time - keyframe.time) < 1e-6) {
      previous.volume = keyframe.volume;
    } else {
      deduped.push(keyframe);
    }
  }
  const simplified = simplifyVolumeKeyframes(deduped);
  if (simplified.length === 1) {
    return `volume=${formatFilterNumber(simplified[0].volume)}`;
  }
  let expression = formatFilterNumber(simplified.at(-1).volume);
  for (let i = simplified.length - 2; i >= 0; i -= 1) {
    const current = simplified[i];
    const next = simplified[i + 1];
    const currentTime = formatFilterNumber(current.time);
    const nextTime = formatFilterNumber(next.time);
    const currentVolume = formatFilterNumber(current.volume);
    const span = Math.max(1e-6, next.time - current.time);
    const slope = formatFilterNumber((next.volume - current.volume) / span);
    const segment = `${currentVolume}+(${slope})*(t-${currentTime})`;
    expression = `if(lt(t,${nextTime}),${segment},${expression})`;
  }
  return `volume=${escapeExpressionCommas(expression)}:eval=frame`;
}
function buildFadeFilters(track) {
  const duration = track.end - track.start;
  const { fadeIn, fadeOut } = clampFadesToDuration(
    { fadeIn: track.fadeIn ?? 0, fadeOut: track.fadeOut ?? 0 },
    duration
  );
  const stages = [];
  if (fadeIn > 0) stages.push(`afade=t=in:st=0:d=${formatFilterNumber(fadeIn)}`);
  if (fadeOut > 0 && duration > 0) {
    stages.push(
      `afade=t=out:st=${formatFilterNumber(Math.max(0, duration - fadeOut))}:d=${formatFilterNumber(fadeOut)}`
    );
  }
  return stages.length ? `,${stages.join(",")}` : "";
}
function buildTrackInputFilter(track, index, volumeFilter, totalDuration) {
  const delayMs = Math.round(track.start * 1e3);
  const trimDuration = track.end - track.start + (track.tailSeconds ?? 0);
  return `[${index}:a]atrim=0:${formatFilterNumber(trimDuration)},${volumeFilter}${buildFadeFilters(track)},adelay=${delayMs}|${delayMs},apad,asetpts=N/SR/TB,atrim=0:${formatFilterNumber(totalDuration)}[a${index}]`;
}
function missingSourceMessage(elementId, src, baseDir, resolvedPath) {
  const relativePath = relative(baseDir, resolvedPath).replace(/\\/g, "/");
  const insideProject = !relativePath.startsWith("..") && !isAbsolute(relativePath);
  const authored = /^([\\/]|[A-Za-z]:)/.test(src) ? "" : `src="${src}" `;
  return `Source not found for audio element ${elementId}: ${authored}resolved to ${insideProject ? relativePath : "a path outside the project"}`;
}
function boundedDetail(message, maxLength = 2e3) {
  const redacted = message.replace(/\bhttps?:\/\/[^\s"'<>]+/gi, "<redacted-url>").replace(/\bfile:\/\/[^\s"'<>]+/gi, "<redacted-path>").replace(
    /\b[A-Za-z]:[\\/].+?(?=:\s[A-Z]|\s(?:ENOENT|EACCES|EPERM)\b|\r?$)/gm,
    "<redacted-path>"
  ).replace(
    /(^|[\s"'(])\/.+?(?=:\s[A-Z]|\s(?:ENOENT|EACCES|EPERM)\b|\r?$)/gm,
    "$1<redacted-path>"
  );
  return redacted.length <= maxLength ? redacted : `${redacted.slice(0, maxLength - 1)}\u2026`;
}
function probeFailure(message, elementId) {
  const unavailable = /(?:not found|ENOENT|spawn)/i.test(message);
  const cancelled = /(?:aborted|AbortError|cancelled|canceled)/i.test(message);
  const timedOut = /(?:timed?\s*out|timeout|deadline|inactivity)/i.test(message);
  const invalidMedia = /(?:invalid data found|could not find codec parameters|moov atom not found|no audio stream)/i.test(
    message
  );
  return {
    stage: "probe",
    reason: cancelled ? "cancelled" : invalidMedia ? "invalid_media" : unavailable ? "ffmpeg_unavailable" : timedOut ? "ffmpeg_timeout" : "probe_failed",
    owner: cancelled || invalidMedia ? "user" : "system",
    retryable: !cancelled && !invalidMedia && (unavailable || timedOut),
    elementId,
    detail: boundedDetail(`Audio probe failed for element ${elementId}: ${message}`)
  };
}
function downloadFailure(error, elementId) {
  const message = error instanceof Error ? error.message : String(error);
  const invalidSource = error instanceof UrlDownloadError ? error.kind === "http_not_found" || error.kind === "http_rejected" || error.kind === "invalid_payload" || error.kind === "cancelled" : /(?:invalid URL|only HTTPS|private\/reserved|HTTP (?:400|401|403|404|405|410|422)\b)/i.test(
    message
  );
  const retryable = error instanceof UrlDownloadError ? error.retryable : !invalidSource;
  return {
    stage: "download",
    reason: "download_failed",
    owner: invalidSource ? "user" : "system",
    retryable,
    elementId,
    detail: boundedDetail(`Download failed for audio element ${elementId}: ${message}`)
  };
}
function ffmpegFailure(stage, result, elementId) {
  const stderr = result.stderr ?? "";
  let reason = "ffmpeg_failed";
  let owner = "system";
  let retryable = false;
  if (result.failureReason === "external_interruption") {
    reason = "external_interruption";
    retryable = true;
  } else if (result.terminationReason === "abort") {
    reason = "cancelled";
    owner = "user";
  } else if (result.terminationReason === "deadline" || result.terminationReason === "inactivity") {
    reason = "ffmpeg_timeout";
    retryable = true;
  } else if (result.terminationReason === "spawn_error") {
    reason = "ffmpeg_unavailable";
    retryable = true;
  } else if (/(?:unrecognized option|option (?:was )?not found|no option name near)/i.test(stderr)) {
    reason = "ffmpeg_unsupported";
  } else if ((stage === "extract" || stage === "prepare") && /(?:invalid data found|could not find codec parameters|moov atom not found)/i.test(stderr)) {
    reason = "invalid_media";
    owner = "user";
  }
  return {
    stage,
    reason,
    owner,
    retryable,
    elementId,
    detail: boundedDetail(
      result.error?.message ? `${formatFfmpegError(result.exitCode, stderr)}: ${result.error.message}` : formatFfmpegError(result.exitCode, stderr)
    )
  };
}
var CURVED_SEGMENT_SAMPLES_PER_SEC = 30;
function volumeLaneKeyframes(automation, trackStart, duration) {
  const lane = automation.lanes.find((l) => l.target === VOLUME_TARGET);
  if (!lane || lane.points.length === 0) return null;
  const out = [];
  const push = (t, v) => {
    out.push({ time: trackStart + t, volume: v });
  };
  const first = lane.points[0];
  if (first.t > 0) push(0, first.v);
  for (let i = 0; i < lane.points.length; i += 1) {
    const a = lane.points[i];
    push(a.t, a.v);
    const b = lane.points[i + 1];
    if (!b || !a.curve) continue;
    const steps = Math.max(2, Math.ceil((b.t - a.t) * CURVED_SEGMENT_SAMPLES_PER_SEC));
    for (let k = 1; k < steps; k += 1) {
      const t = a.t + (b.t - a.t) * k / steps;
      push(t, sampleAutomationLane(lane, t));
    }
  }
  const last = lane.points[lane.points.length - 1];
  if (duration > last.t) push(duration, last.v);
  return out;
}
function parseAudioElements(html) {
  const elements = [];
  const { document: document2 } = parseHTML(unwrapTemplate(html));
  const startCache = /* @__PURE__ */ new Map();
  const visiting = /* @__PURE__ */ new Set();
  const resolveStart = (el) => el.getAttribute("data-start") ? resolveReferencedStart(document2, el, startCache, visiting) : 0;
  const parseEnd = (raw) => {
    return parseStrictFiniteTimingNumber(raw) ?? 0;
  };
  const isHidden = isSelfOrAncestorHidden;
  const groupsById = new Map(
    resolveAudioGroups(document2).map((group) => [group.id, group])
  );
  const memberGroupHidden = (el) => isMemberGroupHidden(groupsById, el);
  const build = (el, id, src, type, joinsGroup) => {
    const layerAttr = el.getAttribute("data-layer");
    const volumeAttr = el.getAttribute("data-volume");
    const fades = readElementFades(el);
    const fxChain = el.getAttribute(HF_AUDIO_FX_ATTR);
    const automation = el.getAttribute(HF_AUDIO_AUTOMATION_ATTR);
    const groupId = joinsGroup ? memberGroupKey(el) : null;
    const group = groupId ? groupsById.get(groupId) : void 0;
    return {
      id,
      src,
      start: resolveStart(el),
      end: parseEnd(el.getAttribute("data-end")),
      mediaStart: readMediaStart(el),
      playbackRate: readElementRateSpec(el),
      layer: layerAttr ? parseInt(layerAttr) : 0,
      volume: volumeAttr ? parseFloat(volumeAttr) : 1,
      ...fades.fadeIn > 0 ? { fadeIn: fades.fadeIn } : {},
      ...fades.fadeOut > 0 ? { fadeOut: fades.fadeOut } : {},
      ...fxChain ? { fxChain } : {},
      ...automation ? { automation } : {},
      ...group ? {
        groupId: group.id,
        ...group.fxChain ? { groupFxChain: group.fxChain } : {},
        ...group.automation ? { groupAutomation: group.automation } : {},
        groupVolume: group.volume
      } : {},
      type
    };
  };
  const trackId = (el) => el.getAttribute(MEDIA_RENDER_ID_ATTR) || el.getAttribute("id");
  for (const el of document2.querySelectorAll("audio[id]")) {
    const id = trackId(el);
    const src = resolveMediaElementSrc(el);
    if (!id || !src || isHidden(el) || memberGroupHidden(el)) continue;
    if (isKnownInactiveTimelineWindow(el, resolveStart(el))) continue;
    elements.push(build(el, id, src, "audio", true));
  }
  for (const el of document2.querySelectorAll('video[id][data-has-audio="true"]')) {
    if (!isAudibleVideoElement(el)) continue;
    const id = trackId(el);
    const src = resolveMediaElementSrc(el);
    if (!id || !src || isHidden(el) || memberGroupHidden(el)) continue;
    if (isKnownInactiveTimelineWindow(el, resolveStart(el))) continue;
    elements.push(build(el, `${id}-audio`, src, "video", true));
  }
  return elements;
}
async function extractAudioFromVideo(videoPath, outputPath, options, signal, config) {
  const ffmpegProcessTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const outputDir = dirname6(outputPath);
  if (!existsSync10(outputDir)) mkdirSync7(outputDir, { recursive: true });
  const playbackRate = normalizeRateSpec(options?.playbackRate);
  const args = [];
  if (options?.startTime !== void 0) args.push("-ss", String(options.startTime));
  if (options?.duration !== void 0) {
    args.push("-t", String(sourceTimeAt(playbackRate, options.duration)));
  }
  args.push("-i", videoPath);
  const outputArgs = await preparedAudioOutputArgs(videoPath, playbackRate, options?.duration);
  args.push("-vn", "-acodec", "pcm_s16le", "-ar", "48000", ...outputArgs);
  if (playbackRate !== 1 && options?.duration !== void 0) {
    args.push("-t", String(options.duration));
  }
  args.push("-y", outputPath);
  const result = await runFfmpeg(args, { signal, timeout: ffmpegProcessTimeout });
  if (signal?.aborted) {
    const failure = {
      stage: "cancelled",
      reason: "cancelled",
      owner: "user",
      retryable: false,
      detail: "Audio extract cancelled"
    };
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      error: failure.detail,
      failure
    };
  }
  if (!result.success) {
    const failure = ffmpegFailure("extract", result);
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      error: failure.detail,
      failure
    };
  }
  return { success: true, outputPath, durationMs: result.durationMs };
}
async function prepareAudioTrack(srcPath, outputPath, mediaStart, duration, playbackRate = 1, signal, config) {
  const ffmpegProcessTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const outputDir = dirname6(outputPath);
  if (!existsSync10(outputDir)) mkdirSync7(outputDir, { recursive: true });
  const normalizedPlaybackRate = normalizeRateSpec(playbackRate);
  const outputArgs = await preparedAudioOutputArgs(srcPath, normalizedPlaybackRate, duration);
  const args = [
    "-ss",
    String(mediaStart),
    "-t",
    String(sourceTimeAt(normalizedPlaybackRate, duration)),
    "-i",
    srcPath,
    "-acodec",
    "pcm_s16le",
    "-ar",
    "48000",
    ...outputArgs
  ];
  if (normalizedPlaybackRate !== 1) args.push("-t", String(duration));
  args.push("-y", outputPath);
  const result = await runFfmpeg(args, { signal, timeout: ffmpegProcessTimeout });
  if (signal?.aborted) {
    const failure2 = {
      stage: "cancelled",
      reason: "cancelled",
      owner: "user",
      retryable: false,
      detail: "Audio prepare cancelled"
    };
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      error: failure2.detail,
      failure: failure2
    };
  }
  const failure = !result.success ? ffmpegFailure("prepare", result) : void 0;
  return {
    success: result.success,
    outputPath,
    durationMs: result.durationMs,
    error: failure?.detail,
    failure
  };
}
async function generateSilence(outputPath, duration, signal, config) {
  const ffmpegProcessTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const outputDir = dirname6(outputPath);
  if (!existsSync10(outputDir)) mkdirSync7(outputDir, { recursive: true });
  const args = [
    "-f",
    "lavfi",
    "-i",
    "anullsrc=r=48000:cl=stereo",
    "-t",
    String(duration),
    "-acodec",
    "pcm_s16le",
    "-y",
    outputPath
  ];
  const result = await runFfmpeg(args, { signal, timeout: ffmpegProcessTimeout });
  if (signal?.aborted) {
    const failure2 = {
      stage: "cancelled",
      reason: "cancelled",
      owner: "user",
      retryable: false,
      detail: "Silence generation cancelled"
    };
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      error: failure2.detail,
      failure: failure2
    };
  }
  const failure = !result.success ? ffmpegFailure("silence", result) : void 0;
  return {
    success: result.success,
    outputPath,
    durationMs: result.durationMs,
    error: failure?.detail,
    failure
  };
}
async function mixAudioTracks(tracks, outputPath, totalDuration, signal, config) {
  const ffmpegProcessTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const masterOutputGain = config?.audioGain ?? DEFAULT_CONFIG.audioGain;
  if (tracks.length === 0) {
    const result2 = await generateSilence(outputPath, totalDuration, signal, config);
    return {
      success: result2.success,
      outputPath,
      durationMs: result2.durationMs,
      tracksProcessed: 0,
      error: result2.error,
      failures: result2.failure ? [result2.failure] : void 0
    };
  }
  const outputDir = dirname6(outputPath);
  if (!existsSync10(outputDir)) mkdirSync7(outputDir, { recursive: true });
  const buildFilterComplex = (ignoreAutomation) => {
    const filterParts = [];
    tracks.forEach((track, i) => {
      const volumeFilter = buildVolumeExpression(track, ignoreAutomation);
      filterParts.push(buildTrackInputFilter(track, i, volumeFilter, totalDuration));
    });
    const mixInputs = tracks.map((_, i) => `[a${i}]`).join("");
    const mixFilter = `${mixInputs}amix=inputs=${tracks.length}:duration=longest:dropout_transition=0[mixed]`;
    const compensatedGain = masterOutputGain * tracks.length;
    const postMixGainFilter = `[mixed]volume=${formatFilterNumber(compensatedGain)}[out]`;
    return [...filterParts, mixFilter, postMixGainFilter].join(";");
  };
  const runMix = async (ignoreAutomation) => {
    const inputs = [];
    tracks.forEach((track) => inputs.push("-i", track.srcPath));
    const scriptDir = mkdtempSync6(join13(outputDir, ".filter-complex-"));
    const scriptPath = join13(scriptDir, "graph.txt");
    const fd = openSync3(scriptPath, "wx", 384);
    try {
      writeFileSync6(fd, buildFilterComplex(ignoreAutomation));
    } finally {
      closeSync3(fd);
    }
    const args = [
      ...inputs,
      "-filter_complex_script",
      scriptPath,
      "-map",
      "[out]",
      "-acodec",
      "aac",
      "-b:a",
      "192k",
      "-t",
      String(totalDuration),
      "-y",
      outputPath
    ];
    try {
      const legacyResult = await runFfmpeg(args, { signal, timeout: ffmpegProcessTimeout });
      if (legacyResult.success || !legacyFilterScriptOptionIsUnsupported(legacyResult.stderr)) {
        return legacyResult;
      }
      const currentArgs = [...args];
      currentArgs[currentArgs.indexOf("-filter_complex_script")] = "-/filter_complex";
      return await runFfmpeg(currentArgs, { signal, timeout: ffmpegProcessTimeout });
    } finally {
      rmSync7(scriptDir, { recursive: true, force: true });
    }
  };
  let result = await runMix(false);
  let degradedAutomation = false;
  const hasAutomation = tracks.some((track) => (track.volumeKeyframes?.length ?? 0) > 0);
  if (!result.success && result.failureReason !== "external_interruption" && !signal?.aborted && hasAutomation) {
    const retry = await runMix(true);
    if (retry.success) {
      result = retry;
      degradedAutomation = true;
    }
  }
  if (signal?.aborted) {
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      tracksProcessed: 0,
      error: "Audio mix cancelled",
      failures: [
        {
          stage: "cancelled",
          reason: "cancelled",
          owner: "user",
          retryable: false,
          detail: "Audio mix cancelled"
        }
      ]
    };
  }
  if (!result.success) {
    const failure = ffmpegFailure("mix", result);
    return {
      success: false,
      outputPath,
      durationMs: result.durationMs,
      tracksProcessed: 0,
      error: failure.detail,
      failures: [failure]
    };
  }
  return {
    success: true,
    outputPath,
    durationMs: result.durationMs,
    tracksProcessed: tracks.length,
    error: degradedAutomation ? "Volume automation exceeded this ffmpeg build's expression limits; rendered at base volume" : void 0
  };
}
function groupNormalizeOptionUnsupported(stderr) {
  return /normalize/i.test(stderr) && /(?:unrecognized option|option (?:was )?not found|no option name)/i.test(stderr);
}
async function mixGroupMembers(memberTracks, outputPath, totalDuration, signal, config) {
  const ffmpegProcessTimeout = config?.ffmpegProcessTimeout ?? DEFAULT_CONFIG.ffmpegProcessTimeout;
  const outputDir = dirname6(outputPath);
  if (!existsSync10(outputDir)) mkdirSync7(outputDir, { recursive: true });
  const buildInputFilters = (ignoreKeyframes) => memberTracks.map((track, i) => {
    const volumeFilter = buildVolumeExpression(track, ignoreKeyframes);
    return buildTrackInputFilter(track, i, volumeFilter, totalDuration);
  });
  const mixInputs = memberTracks.map((_, i) => `[a${i}]`).join("");
  const runOnce = async (useNormalize2, ignoreKeyframes = false) => {
    const inputFilters = buildInputFilters(ignoreKeyframes);
    const mixFilter = useNormalize2 ? `${mixInputs}amix=inputs=${memberTracks.length}:duration=longest:dropout_transition=0:normalize=0[out]` : (
      // Every member is padded and trimmed to totalDuration above, and
      // dropout_transition=0 keeps all N inputs active for that whole span.
      // amix's default normalize therefore divides by exactly N throughout;
      // compensate by THIS group's own member count — never the render's
      // global track count.
      `${mixInputs}amix=inputs=${memberTracks.length}:duration=longest:dropout_transition=0[mixed];[mixed]volume=${formatFilterNumber(memberTracks.length)}[out]`
    );
    const filterComplex = [...inputFilters, mixFilter].join(";");
    const scriptDir = mkdtempSync6(join13(outputDir, ".group-filter-complex-"));
    const scriptPath = join13(scriptDir, "graph.txt");
    const fd = openSync3(scriptPath, "wx", 384);
    try {
      writeFileSync6(fd, filterComplex);
    } finally {
      closeSync3(fd);
    }
    try {
      const inputs = [];
      memberTracks.forEach((track) => inputs.push("-i", track.srcPath));
      const args = [
        ...inputs,
        "-filter_complex_script",
        scriptPath,
        "-map",
        "[out]",
        // Float, not pcm_s16le: `normalize=0` sums the members at unity, so any
        // over-unity sum hard-clipped at ±1 in the intermediate — BEFORE the
        // group's FX chain and its fader ran. Pulling the group down, or the
        // Giant preset's compressor, then operated on distortion. Preview
        // cannot reproduce it (its bus is float), and it only shows up in the
        // export. Both readers downstream take float: `readWav` (format 3) and
        // `applyVolumeEnvelopeToWav`.
        "-acodec",
        "pcm_f32le",
        "-ar",
        "48000",
        "-t",
        String(totalDuration),
        "-y",
        outputPath
      ];
      const legacyResult = await runFfmpeg(args, { signal, timeout: ffmpegProcessTimeout });
      if (legacyResult.success || !legacyFilterScriptOptionIsUnsupported(legacyResult.stderr)) {
        return legacyResult;
      }
      const currentArgs = [...args];
      currentArgs[currentArgs.indexOf("-filter_complex_script")] = "-/filter_complex";
      return await runFfmpeg(currentArgs, { signal, timeout: ffmpegProcessTimeout });
    } finally {
      rmSync7(scriptDir, { recursive: true, force: true });
    }
  };
  let useNormalize = true;
  let result = await runOnce(useNormalize);
  if (!result.success && groupNormalizeOptionUnsupported(result.stderr)) {
    useNormalize = false;
    result = await runOnce(useNormalize);
  }
  let degradedAutomation = false;
  const hasAutomation = memberTracks.some((track) => (track.volumeKeyframes?.length ?? 0) > 0);
  if (!result.success && !signal?.aborted && hasAutomation) {
    const retry = await runOnce(useNormalize, true);
    if (retry.success) {
      result = retry;
      degradedAutomation = true;
    }
  }
  if (signal?.aborted) return { success: false, error: "Group sub-mix cancelled" };
  if (!result.success)
    return { success: false, error: formatFfmpegError(result.exitCode, result.stderr) };
  return { success: true, degradedAutomation };
}
async function processCompositionAudio(elements, baseDir, workDir, outputPath, totalDuration, signal, config, compiledDir) {
  const startMs = Date.now();
  const tracks = [];
  const failures = [];
  const groupTracks = /* @__PURE__ */ new Map();
  const groupMeta = /* @__PURE__ */ new Map();
  if (!existsSync10(workDir)) mkdirSync7(workDir, { recursive: true });
  const internalController = new AbortController();
  const effectiveSignal = internalController.signal;
  if (signal) {
    if (signal.aborted) internalController.abort();
    else signal.addEventListener("abort", () => internalController.abort(), { once: true });
  }
  await Promise.all(
    elements.map(async (element) => {
      if (effectiveSignal.aborted) {
        failures.push({
          stage: "cancelled",
          reason: "cancelled",
          owner: "user",
          retryable: false,
          elementId: element.id,
          detail: boundedDetail(`Cancelled audio element ${element.id}`)
        });
        return;
      }
      try {
        let srcPath = element.src;
        if (!isHttpUrl(srcPath)) {
          srcPath = resolveProjectRelativeSrc(element.src, baseDir, compiledDir);
        }
        if (isHttpUrl(srcPath)) {
          try {
            srcPath = await downloadToTemp(
              srcPath,
              workDir,
              void 0,
              effectiveSignal,
              void 0,
              {
                onTelemetry: writeUrlDownloadTelemetry
              }
            );
          } catch (err) {
            failures.push(downloadFailure(err, element.id));
            return;
          }
        }
        if (!existsSync10(srcPath)) {
          failures.push({
            stage: "source",
            reason: "source_not_found",
            owner: "user",
            retryable: false,
            elementId: element.id,
            detail: boundedDetail(missingSourceMessage(element.id, element.src, baseDir, srcPath))
          });
          return;
        }
        if (await isNotMediaPayload(srcPath)) {
          failures.push({
            stage: "source",
            reason: "invalid_media",
            owner: "user",
            retryable: false,
            elementId: element.id,
            detail: boundedDetail(
              `Audio element ${element.id} source is a text document (HTML/XML/JSON), not media`
            )
          });
          return;
        }
        if (element.end - element.start <= 0) {
          let metadata;
          try {
            metadata = await extractAudioMetadata(srcPath);
          } catch (err) {
            failures.push(
              probeFailure(err instanceof Error ? err.message : String(err), element.id)
            );
            return;
          }
          const effectiveDuration = timeAtSourceTime(
            normalizeRateSpec(element.playbackRate),
            metadata.durationSeconds - element.mediaStart
          );
          element.end = element.start + (effectiveDuration > 0 ? effectiveDuration : metadata.durationSeconds);
        }
        let audioSrcPath = srcPath;
        if (element.type === "video") {
          const extractedPath = join13(workDir, `${element.id}-extracted.wav`);
          const extractResult = await extractAudioFromVideo(
            srcPath,
            extractedPath,
            {
              startTime: element.mediaStart,
              duration: element.end - element.start,
              playbackRate: element.playbackRate
            },
            effectiveSignal,
            config
          );
          if (!extractResult.success) {
            failures.push(
              extractResult.failure ? { ...extractResult.failure, elementId: element.id } : {
                stage: "extract",
                reason: "ffmpeg_failed",
                owner: "system",
                retryable: false,
                elementId: element.id,
                detail: boundedDetail(`Audio extract failed for element ${element.id}`)
              }
            );
            return;
          }
          audioSrcPath = extractedPath;
        } else {
          const trimmedPath = join13(workDir, `${element.id}-trimmed.wav`);
          const prepResult = await prepareAudioTrack(
            srcPath,
            trimmedPath,
            element.mediaStart,
            element.end - element.start,
            element.playbackRate,
            effectiveSignal,
            config
          );
          if (!prepResult.success) {
            failures.push(
              prepResult.failure ? { ...prepResult.failure, elementId: element.id } : {
                stage: "prepare",
                reason: "ffmpeg_failed",
                owner: "system",
                retryable: false,
                elementId: element.id,
                detail: boundedDetail(`Audio prepare failed for element ${element.id}`)
              }
            );
            return;
          }
          audioSrcPath = trimmedPath;
        }
        const automation = element.automation ? resolveAutomation(
          parseAutomation(element.automation),
          element.fxChain ? parseAudioFxChain(element.fxChain) : void 0
        ) : null;
        const laneKeyframes = automation ? volumeLaneKeyframes(automation, element.start, element.end - element.start) : null;
        const envelopeKeyframes = laneKeyframes ?? element.volumeKeyframes;
        const envelope = envelopeKeyframes && envelopeKeyframes.length > 0 ? {
          keyframes: envelopeKeyframes,
          trackStart: element.start,
          baseVolume: element.volume ?? 1
        } : null;
        let bakedEnvelope = false;
        let tailSeconds = 0;
        if (element.fxChain) {
          const chain = parseAudioFxChain(element.fxChain);
          tailSeconds = chainTailSeconds(chain, automation ?? void 0);
          const fxResult = await applyAudioFxChain(
            audioSrcPath,
            chain,
            join13(workDir, `${element.id}-fx.wav`),
            {
              trackId: element.id,
              signal: effectiveSignal,
              ...automation ? { automation } : {},
              ...envelope ? { envelope } : {}
            }
          );
          audioSrcPath = fxResult.path;
          bakedEnvelope = fxResult.envelopeBaked;
        }
        if (envelope && !bakedEnvelope) {
          bakedEnvelope = applyVolumeEnvelopeToWav(
            audioSrcPath,
            envelope.keyframes,
            envelope.trackStart,
            envelope.baseVolume
          );
        }
        const track = {
          id: element.id,
          srcPath: audioSrcPath,
          start: element.start,
          end: element.end,
          mediaStart: element.mediaStart,
          duration: element.end - element.start,
          // Gain is already in the samples when baked, so mix at unity.
          volume: bakedEnvelope ? 1 : element.volume ?? 1,
          volumeKeyframes: bakedEnvelope ? void 0 : envelopeKeyframes ?? void 0,
          ...element.fadeIn ? { fadeIn: element.fadeIn } : {},
          ...element.fadeOut ? { fadeOut: element.fadeOut } : {},
          ...tailSeconds > 0 ? { tailSeconds } : {}
        };
        if (element.groupId) {
          const bucket = groupTracks.get(element.groupId);
          if (bucket) bucket.push(track);
          else groupTracks.set(element.groupId, [track]);
          if (!groupMeta.has(element.groupId)) {
            groupMeta.set(element.groupId, {
              ...element.groupFxChain ? { fxChain: element.groupFxChain } : {},
              ...element.groupAutomation ? { automation: element.groupAutomation } : {},
              volume: element.groupVolume ?? 1
            });
          }
        } else {
          tracks.push(track);
        }
      } catch (err) {
        if (err instanceof AudioFxRenderError) throw err;
        failures.push({
          stage: "internal",
          reason: "internal",
          owner: "system",
          retryable: false,
          elementId: element.id,
          detail: boundedDetail(
            `Audio processing failed for element ${element.id}: ${err instanceof Error ? err.message : String(err)}`
          )
        });
      }
    })
  ).catch((err) => {
    internalController.abort();
    try {
      rmSync7(workDir, { recursive: true, force: true });
    } catch {
    }
    throw err;
  });
  const bail = () => {
    try {
      rmSync7(workDir, { recursive: true, force: true });
    } catch {
    }
    return {
      success: false,
      outputPath,
      durationMs: Date.now() - startMs,
      tracksProcessed: tracks.length,
      error: boundedDetail(
        `Audio processing failed: ${failures.map((failure) => failure.detail).join(", ")}`
      ),
      failures
    };
  };
  if (failures.length > 0) return bail();
  const groupsDegradedAutomation = [];
  let groupIndex = -1;
  for (const [groupId, memberTracks] of groupTracks) {
    groupIndex += 1;
    const meta = groupMeta.get(groupId);
    if (!meta) continue;
    const pathId = safePathSegment(groupId, groupIndex);
    const groupWavPath = join13(workDir, `group-${pathId}.wav`);
    try {
      const subMix = await mixGroupMembers(
        memberTracks,
        groupWavPath,
        totalDuration,
        effectiveSignal,
        config
      );
      if (!subMix.success) {
        failures.push({
          stage: "mix",
          reason: "ffmpeg_failed",
          owner: "system",
          retryable: false,
          elementId: groupId,
          detail: boundedDetail(
            `Group sub-mix failed for group ${groupId}: ${subMix.error ?? "unknown"}`
          )
        });
        continue;
      }
      if (subMix.degradedAutomation) groupsDegradedAutomation.push(groupId);
      const automation = meta.automation ? resolveAutomation(
        parseAutomation(meta.automation),
        meta.fxChain ? parseAudioFxChain(meta.fxChain) : void 0
      ) : null;
      const laneKeyframes = automation ? volumeLaneKeyframes(automation, 0, totalDuration) : null;
      const envelope = laneKeyframes && laneKeyframes.length > 0 ? { keyframes: laneKeyframes, trackStart: 0, baseVolume: meta.volume } : null;
      let groupSrcPath = groupWavPath;
      let bakedEnvelope = false;
      if (meta.fxChain) {
        const chain = parseAudioFxChain(meta.fxChain);
        const fxResult = await applyAudioFxChain(
          groupSrcPath,
          chain,
          join13(workDir, `group-${pathId}-fx.wav`),
          {
            trackId: groupId,
            signal: effectiveSignal,
            ...automation ? { automation } : {},
            ...envelope ? { envelope } : {}
          }
        );
        groupSrcPath = fxResult.path;
        bakedEnvelope = fxResult.envelopeBaked;
      }
      if (envelope && !bakedEnvelope) {
        bakedEnvelope = applyVolumeEnvelopeToWav(
          groupSrcPath,
          envelope.keyframes,
          envelope.trackStart,
          envelope.baseVolume
        );
      }
      tracks.push({
        id: groupId,
        srcPath: groupSrcPath,
        start: 0,
        end: totalDuration,
        mediaStart: 0,
        duration: totalDuration,
        volume: bakedEnvelope ? 1 : meta.volume,
        // Same fallback an ungrouped track gets: when the envelope could not be
        // baked into the samples, hand the keyframes to the outer mix's volume
        // expression instead of dropping the group's automation on the floor.
        ...bakedEnvelope || !laneKeyframes?.length ? {} : { volumeKeyframes: laneKeyframes }
      });
    } catch (err) {
      if (err instanceof AudioFxRenderError) throw err;
      failures.push({
        stage: "mix",
        reason: "internal",
        owner: "system",
        retryable: false,
        elementId: groupId,
        detail: boundedDetail(
          `Audio processing failed for group ${groupId}: ${err instanceof Error ? err.message : String(err)}`
        )
      });
    }
  }
  if (failures.length > 0) return bail();
  const mixResult = await mixAudioTracks(tracks, outputPath, totalDuration, signal, config);
  try {
    rmSync7(workDir, { recursive: true, force: true });
  } catch {
  }
  const degradedNote = groupsDegradedAutomation.length > 0 ? `Volume automation exceeded this ffmpeg build's expression limits in group(s) ${groupsDegradedAutomation.join(", ")}; rendered at base volume` : void 0;
  return {
    ...mixResult,
    durationMs: Date.now() - startMs,
    // Both, when both degraded. `mixResult.error ?? degradedNote` reported only
    // the outer mix and dropped the one that names which GROUPS lost their
    // members' automation — two different losses, and the operator needs to
    // hear about the one they can act on.
    error: [mixResult.error, degradedNote].filter(Boolean).join("; ") || void 0
  };
}

// ../engine/src/services/parallelCoordinator.ts
import { cpus, freemem } from "os";
import { existsSync as existsSync11, mkdirSync as mkdirSync8, readdirSync as readdirSync6 } from "fs";
import { copyFile, readFile as readFile2, rename } from "fs/promises";
import { join as join15 } from "path";
import { getHeapStatistics } from "v8";

// ../engine/src/utils/psnr.ts
import { execFile as execFile3 } from "child_process";
import { mkdtemp, rm, writeFile } from "fs/promises";
import { tmpdir as tmpdir4 } from "os";
import { join as join14 } from "path";
import { promisify as promisify3 } from "util";
async function psnrDb(a, b) {
  const execFileP = promisify3(execFile3);
  const dir = await mkdtemp(join14(tmpdir4(), "hf-de-verify-"));
  try {
    const pa = join14(dir, "a.jpg");
    const pb = join14(dir, "b.jpg");
    await Promise.all([writeFile(pa, a), writeFile(pb, b)]);
    const { stderr } = await execFileP(
      getFfmpegBinary(),
      ["-hide_banner", "-i", pa, "-i", pb, "-lavfi", "psnr", "-f", "null", "-"],
      { maxBuffer: 4 * 1024 * 1024, windowsHide: true }
    );
    const m = /average:(inf|[\d.]+)/.exec(stderr);
    if (!m) throw new Error(`psnr parse failed: ${stderr.slice(-300)}`);
    return m[1] === "inf" ? Infinity : Number(m[1]);
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {
    });
  }
}
function resolveDeVerifyMinDb() {
  const raw = Number(process.env.HF_DE_VERIFY_MIN_DB ?? "32");
  return Number.isFinite(raw) && raw >= 10 && raw <= 60 ? raw : 32;
}

// ../engine/src/utils/assertSwiftShader.ts
var BROWSER_GPU_NOT_SOFTWARE = "BROWSER_GPU_NOT_SOFTWARE";
var SwiftShaderAssertionError = class extends Error {
  code = BROWSER_GPU_NOT_SOFTWARE;
  vendor;
  renderer;
  constructor(message, vendor, renderer) {
    super(message);
    this.name = "SwiftShaderAssertionError";
    this.vendor = vendor;
    this.renderer = renderer;
  }
};
var SWIFTSHADER_VENDOR_SIGNATURE = "Google Inc. (Google)";
var SWIFTSHADER_RENDERER_TOKEN = "swiftshader";
async function readWebGlVendorInfo(page) {
  await page.goto("chrome://gpu", { waitUntil: "domcontentloaded", timeout: 3e4 });
  const info = await page.evaluate(() => {
    const w = window;
    const rows = w.browserBridge?.gpuInfo_?.graphics_info?.basic_info ?? [];
    let vendor = "";
    let renderer = "";
    for (const row of rows) {
      if (typeof row.description !== "string" || typeof row.value !== "string") continue;
      if (row.description === "GL_VENDOR") vendor = row.value;
      else if (row.description === "GL_RENDERER") renderer = row.value;
    }
    return { vendor, renderer };
  });
  return info;
}
async function assertSwiftShader(page, readInfo = readWebGlVendorInfo) {
  const { vendor, renderer } = await readInfo(page);
  const vendorMatches = vendor.trim() === SWIFTSHADER_VENDOR_SIGNATURE;
  const rendererMatches = renderer.toLowerCase().includes(SWIFTSHADER_RENDERER_TOKEN);
  if (vendorMatches && rendererMatches) return;
  throw new SwiftShaderAssertionError(
    `[assertSwiftShader] Chrome reported a non-SwiftShader WebGL backend. Distributed renders require pure-software GL for pixel-identical retries. Got vendor=${JSON.stringify(vendor)} renderer=${JSON.stringify(renderer)}; expected vendor=${JSON.stringify(SWIFTSHADER_VENDOR_SIGNATURE)} renderer to contain "SwiftShader". Ensure Chrome was launched with --use-gl=swiftshader --use-angle=swiftshader and that the SwiftShader libraries are present in the runtime image.`,
    vendor,
    renderer
  );
}

// ../engine/src/utils/readWebGlVendorInfoFromCanvas.ts
async function readWebGlVendorInfoFromCanvas(page) {
  await page.goto("about:blank", { waitUntil: "domcontentloaded", timeout: 3e4 });
  return page.evaluate(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      if (!gl) {
        return { vendor: "", renderer: "" };
      }
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (!ext) {
        return {
          vendor: String(gl.getParameter(gl.VENDOR) ?? ""),
          renderer: String(gl.getParameter(gl.RENDERER) ?? "")
        };
      }
      return {
        vendor: String(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) ?? ""),
        renderer: String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "")
      };
    } catch {
      return { vendor: "", renderer: "" };
    }
  });
}

// ../engine/src/services/parallelCoordinator.ts
var MEMORY_PER_WORKER_MB = 1536;
var HEAP_RESERVED_MB = 1024;
var HEAP_PER_WORKER_MB = 640;
var MIN_WORKERS = 1;
var MAX_WORKER_DIAGNOSTIC_LINES = 8;
var ABSOLUTE_MAX_WORKERS = 24;
function defaultSafeMaxWorkers() {
  return Math.max(6, Math.min(16, Math.floor(cpus().length / 8)));
}
var MIN_FRAMES_PER_WORKER = 30;
function shouldDisableBrowserPoolForParallelWorker({
  parallel,
  platform,
  deviceScaleFactor,
  headlessShellPath
}) {
  return Boolean(
    parallel && platform === "linux" && headlessShellPath && (deviceScaleFactor ?? 1) <= 1
  );
}
function selectWorkerDiagnostics(lines, maxLines = MAX_WORKER_DIAGNOSTIC_LINES) {
  return lines.filter(
    (line) => /\[(FrameCapture:ERROR|Browser:ERROR|Browser:PAGEERROR|Browser:REQUESTFAILED|Browser:HTTP\d{3})\]/.test(
      line
    )
  ).slice(-maxLines);
}
function compactDiagnosticLine(line) {
  return line.replace(/\s+/g, " ").trim();
}
function expectedFramesForTask(task) {
  const stride = task.frameStride ?? 1;
  return Math.max(0, Math.ceil((task.endFrame - task.startFrame) / stride));
}
function synthesizeSilentWorkerExitError(result, expectedFrames) {
  return `worker ${result.workerId} exited without terminal error string (framesCaptured=${result.framesCaptured}, expected=${expectedFrames}, range=[${result.startFrame}, ${result.endFrame})). Field signal ts=1784042064 \u2014 this class of failure has been reported; consider re-run with --workers=1 to isolate.`;
}
function flagSilentWorkerExits(results) {
  for (const r of results) {
    if (!r.error && r.framesCaptured < expectedFramesForTask(r)) {
      r.error = synthesizeSilentWorkerExitError(r, expectedFramesForTask(r));
    }
  }
}
function formatWorkerFailure(result) {
  const errorText2 = result.error && result.error.length > 0 ? result.error : synthesizeSilentWorkerExitError(result, expectedFramesForTask(result));
  const base = `Worker ${result.workerId}: ${errorText2}`;
  if (!result.diagnostics || result.diagnostics.length === 0) return base;
  const diagnostics = result.diagnostics.map(compactDiagnosticLine).join(" | ");
  return `${base}; diagnostics: ${diagnostics}`;
}
function computeWorkerSizing(totalFrames, requested, config) {
  const cpuCount = cpus().length;
  const totalMemoryMb = getSystemTotalMb();
  const heapLimitMb = Math.round(getHeapStatistics().heap_size_limit / (1024 * 1024));
  const heapBasedWorkers = Math.max(
    1,
    Math.floor((heapLimitMb - HEAP_RESERVED_MB) / HEAP_PER_WORKER_MB)
  );
  const cpuBasedWorkers = Math.max(1, cpuCount - 2);
  const memoryBasedWorkers = Math.max(1, Math.floor(totalMemoryMb * 0.5 / MEMORY_PER_WORKER_MB));
  const frameBasedWorkers = Math.floor(totalFrames / MIN_FRAMES_PER_WORKER);
  const captureCostMultiplier = Math.max(1, config?.captureCostMultiplier ?? 1);
  const base = {
    cpuBasedWorkers,
    memoryBasedWorkers,
    frameBasedWorkers,
    heapBasedWorkers,
    heapLimitMb,
    totalMemoryMb,
    cpuCount,
    captureCostMultiplier
  };
  const finish = (workers, boundBy2, effectiveMaxWorkers2) => ({
    workers,
    boundBy: boundBy2,
    effectiveMaxWorkers: effectiveMaxWorkers2,
    ...base,
    exceedsHeapAdvisory: workers > heapBasedWorkers
  });
  if (requested !== void 0) {
    return finish(
      Math.max(MIN_WORKERS, Math.min(ABSOLUTE_MAX_WORKERS, requested)),
      "explicit",
      ABSOLUTE_MAX_WORKERS
    );
  }
  const effectiveMaxWorkers = (() => {
    const concurrency = config?.concurrency ?? DEFAULT_CONFIG.concurrency;
    if (concurrency !== "auto") {
      return Math.max(MIN_WORKERS, Math.min(ABSOLUTE_MAX_WORKERS, Math.floor(concurrency)));
    }
    return defaultSafeMaxWorkers();
  })();
  const effectiveCoresPerWorker = config?.coresPerWorker ?? DEFAULT_CONFIG.coresPerWorker;
  const effectiveMinParallelFrames = config?.minParallelFrames ?? DEFAULT_CONFIG.minParallelFrames;
  const effectiveLargeRenderThreshold = config?.largeRenderThreshold ?? DEFAULT_CONFIG.largeRenderThreshold;
  if (totalFrames < MIN_FRAMES_PER_WORKER * 2) {
    return finish(1, "too_few_frames", effectiveMaxWorkers);
  }
  const optimal = Math.min(cpuBasedWorkers, memoryBasedWorkers, frameBasedWorkers);
  const optimalBound = optimal === cpuBasedWorkers ? "cpu" : optimal === memoryBasedWorkers ? "memory" : "frames";
  const minWorkersForJob = totalFrames >= effectiveMinParallelFrames ? 2 : MIN_WORKERS;
  let finalWorkers = Math.max(minWorkersForJob, Math.min(effectiveMaxWorkers, optimal));
  let boundBy = finalWorkers === optimal ? optimalBound : finalWorkers === effectiveMaxWorkers && effectiveMaxWorkers < optimal ? "max_workers" : "min_parallel_floor";
  const weightedFrames = totalFrames * captureCostMultiplier;
  const contentionThreshold = Math.max(
    effectiveMinParallelFrames,
    Math.floor(effectiveLargeRenderThreshold / 3)
  );
  if (totalFrames >= effectiveLargeRenderThreshold || weightedFrames >= contentionThreshold) {
    const weightedCoresPerWorker = effectiveCoresPerWorker * captureCostMultiplier;
    const cpuScaledMax = Math.max(MIN_WORKERS, Math.floor(cpuCount / weightedCoresPerWorker));
    if (finalWorkers > cpuScaledMax) {
      finalWorkers = cpuScaledMax;
      boundBy = "contention";
    }
  }
  if (finalWorkers > heapBasedWorkers) {
    finalWorkers = heapBasedWorkers;
    boundBy = "heap";
  }
  return finish(finalWorkers, boundBy, effectiveMaxWorkers);
}
function calculateOptimalWorkers(totalFrames, requested, config) {
  return computeWorkerSizing(totalFrames, requested, config).workers;
}
function distributeFrames(totalFrames, workerCount, workDir, rangeStart = 0) {
  const tasks = [];
  const framesPerWorker = Math.ceil(totalFrames / workerCount);
  for (let i = 0; i < workerCount; i++) {
    const startFrame = rangeStart + i * framesPerWorker;
    const endFrame = Math.min(rangeStart + (i + 1) * framesPerWorker, rangeStart + totalFrames);
    if (startFrame >= rangeStart + totalFrames) break;
    tasks.push({
      workerId: i,
      startFrame,
      endFrame,
      outputDir: join15(workDir, `worker-${i}`),
      outputFrameOffset: rangeStart
    });
  }
  return tasks;
}
function distributeFramesInterleaved(totalFrames, workerCount, workDir, rangeStart = 0) {
  const tasks = [];
  for (let i = 0; i < workerCount && i < totalFrames; i++) {
    tasks.push({
      workerId: i,
      startFrame: rangeStart + i,
      endFrame: rangeStart + totalFrames,
      frameStride: workerCount,
      outputDir: join15(workDir, `worker-${i}`),
      outputFrameOffset: rangeStart
    });
  }
  return tasks;
}
function shouldVerifyWorkerGpu(workerId, config) {
  return config?.browserGpuMode === "software" && workerId === 0;
}
function withParallelWorkerDeadline(promise, diagnostic, timeoutMs, signal) {
  if (signal?.aborted) return Promise.reject(new Error("Parallel worker cancelled"));
  return new Promise((resolve, reject) => {
    let timer;
    const cleanup = () => {
      if (timer) clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    };
    const onAbort = () => {
      cleanup();
      reject(new Error("Parallel worker cancelled"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
    if (timeoutMs > 0) {
      timer = setTimeout(() => {
        cleanup();
        const error = new Error(
          `Parallel worker operation timeout exceeded after ${timeoutMs}ms: worker=${diagnostic.workerId} phase=${diagnostic.phase} frame=${diagnostic.frameIndex ?? "n/a"} browser=${diagnostic.browserExecutable} version=${diagnostic.browserVersion} CanvasDrawElement=${diagnostic.canvasDrawElement} gpu=${diagnostic.gpuBackend}`
        );
        error.name = "ParallelWorkerPhaseTimeoutError";
        reject(error);
      }, timeoutMs);
      timer.unref?.();
    }
    promise.then(
      (value) => {
        cleanup();
        resolve(value);
      },
      (error) => {
        cleanup();
        reject(error);
      }
    );
  });
}
var LATE_LAUNCH_CLOSE_WAIT_MS = 1e4;
function resolveParallelWorkerTimeoutMs(enabled) {
  if (!enabled) return 0;
  const raw = process.env.HF_DE_PARALLEL_PHASE_TIMEOUT_MS;
  if (raw === "0") return 0;
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3e4;
}
async function captureFrameRange(session, task, captureOptions, signal, onFrameCaptured, onFrameBuffer, phaseTimeoutMs, diagnosticFor, onWorkerPhase) {
  let framesCaptured = 0;
  const outputOffset = task.outputFrameOffset ?? 0;
  const stride = task.frameStride ?? 1;
  const runCaptureOperation = (phase, frameIndex, operation) => {
    const diagnostic = diagnosticFor(phase, frameIndex);
    if (framesCaptured === 0) onWorkerPhase?.(diagnostic);
    return withParallelWorkerDeadline(operation(), diagnostic, phaseTimeoutMs, signal);
  };
  const awaitEncode = (frameIndex, encodeResult) => {
    const diagnostic = diagnosticFor("frame_encode", frameIndex);
    if (framesCaptured === 0) onWorkerPhase?.(diagnostic);
    return withParallelWorkerDeadline(encodeResult, diagnostic, phaseTimeoutMs, signal);
  };
  if (onFrameBuffer && session.workerEncodeEnabled) {
    const dbg = process.env.HF_DE_PAR_DEBUG === "1";
    const dbgT0 = Date.now();
    const dbgWin = 40 * stride;
    let prev = null;
    for (let i = task.startFrame; i < task.endFrame; i += stride) {
      if (signal?.aborted) throw new Error("Parallel worker cancelled");
      const time = i * captureOptions.fps.den / captureOptions.fps.num;
      if (dbg && i < task.startFrame + dbgWin) {
        console.log(`[par:w${task.workerId}] +${Date.now() - dbgT0}ms produce ${i} start`);
      }
      const { encodeResult } = await runCaptureOperation(
        "frame_capture",
        i,
        () => captureFrameToBufferPipelined(session, i - outputOffset, time)
      );
      encodeResult.catch(() => {
      });
      if (dbg && i < task.startFrame + dbgWin) {
        console.log(`[par:w${task.workerId}] +${Date.now() - dbgT0}ms produce ${i} kicked`);
      }
      if (prev) {
        if (dbg && prev.idx < task.startFrame + dbgWin) {
          console.log(
            `[par:w${task.workerId}] +${Date.now() - dbgT0}ms drain ${prev.idx} await-encode`
          );
        }
        const buf = await awaitEncode(prev.idx, prev.encodeResult);
        if (dbg && prev.idx < task.startFrame + dbgWin) {
          console.log(
            `[par:w${task.workerId}] +${Date.now() - dbgT0}ms drain ${prev.idx} encoded ${buf.length}B`
          );
        }
        await onFrameBuffer(prev.idx, buf, session);
        if (dbg && prev.idx < task.startFrame + dbgWin) {
          console.log(`[par:w${task.workerId}] +${Date.now() - dbgT0}ms drain ${prev.idx} written`);
        }
        framesCaptured++;
        if (onFrameCaptured) onFrameCaptured(task.workerId, prev.idx);
      }
      prev = { idx: i, encodeResult };
    }
    if (prev) {
      await onFrameBuffer(prev.idx, await awaitEncode(prev.idx, prev.encodeResult), session);
      framesCaptured++;
      if (onFrameCaptured) onFrameCaptured(task.workerId, prev.idx);
    }
    return framesCaptured;
  }
  for (let i = task.startFrame; i < task.endFrame; i += stride) {
    if (signal?.aborted) throw new Error("Parallel worker cancelled");
    const time = i * captureOptions.fps.den / captureOptions.fps.num;
    const fileFrameIdx = i - outputOffset;
    if (onFrameBuffer) {
      const { buffer } = await runCaptureOperation(
        "frame_capture",
        i,
        () => captureFrameToBuffer(session, fileFrameIdx, time)
      );
      await onFrameBuffer(i, buffer, session);
    } else {
      await runCaptureOperation(
        "frame_capture",
        i,
        () => captureFrame(session, fileFrameIdx, time)
      );
    }
    framesCaptured++;
    if (onFrameCaptured) onFrameCaptured(task.workerId, i);
  }
  return framesCaptured;
}
function selectVerifySampleIndicesForTask(sampleIndices, task) {
  const stride = task.frameStride ?? 1;
  const selected = [];
  for (const idx of sampleIndices) {
    if (idx < task.startFrame || idx >= task.endFrame) continue;
    if ((idx - task.startFrame) % stride !== 0) continue;
    selected.push(idx);
  }
  return selected.sort((a, b) => a - b);
}
function logParDebug(message) {
  if (process.env.HF_DE_PAR_DEBUG === "1") console.log(message());
}
function assertDiskSampleAboveFloor(db, verifyMinDb, idx, workerId) {
  if (db < verifyMinDb) {
    throw new DrawElementVerificationError(
      `drawElement self-verify failed at frame ${idx} (disk path, worker ${workerId}): ${db.toFixed(1)}dB < ${verifyMinDb}dB vs pre-injection screenshot`,
      { kind: "psnr", frameIndex: idx, failedDb: db, verifyThresholdDb: verifyMinDb }
    );
  }
  console.log(
    `[Parallel] drawElement disk self-verify passed (worker ${workerId}, frame ${idx}, ${db === Infinity ? "inf" : db.toFixed(1)}dB)`
  );
}
function isFfmpegInfrastructureFailure(err) {
  if (!err || typeof err !== "object") return false;
  const record = err;
  if (record.code === "ENOENT") return true;
  const message = typeof record.message === "string" ? record.message : "";
  const stderr = typeof record.stderr === "string" ? record.stderr : "";
  const text = `${message}
${stderr}`;
  return /\bENOENT\b|No such filter|Unknown filter/i.test(text);
}
async function psnrForDiskSample(framePath, truth, workerId, idx) {
  try {
    return await psnrDb(await readFile2(framePath), truth);
  } catch (err) {
    if (isFfmpegInfrastructureFailure(err)) {
      const detail = err instanceof Error ? err.message : String(err);
      throw new Error(
        `[Parallel] drawElement disk self-verify aborted (worker ${workerId}, frame ${idx}): ffmpeg or the \`psnr\` filter is unavailable \u2014 ${detail}. The preflight in initDrawElementOrTransparentBackground normally catches this at bootstrap; if you hit this after a successful preflight, ffmpeg was replaced mid-render or HYPERFRAMES_FFMPEG_PATH now points at a different binary.`,
        { cause: err }
      );
    }
    console.warn(
      `[Parallel] drawElement disk self-verify sample skipped (worker ${workerId}, frame ${idx}): ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }
}
async function verifyDiskDrawElementSamples(session, task, streaming) {
  if (streaming || session.captureMode !== "drawelement") return;
  const truths = session.deVerifyFrames;
  if (!truths || truths.size === 0) return;
  const verifyMinDb = resolveDeVerifyMinDb();
  const ext = session.options.format === "png" ? "png" : "jpg";
  const offset = task.outputFrameOffset ?? 0;
  for (const idx of selectVerifySampleIndicesForTask(truths.keys(), task)) {
    const truth = truths.get(idx);
    if (!truth) continue;
    const framePath = join15(task.outputDir, `frame_${String(idx - offset).padStart(6, "0")}.${ext}`);
    const db = await psnrForDiskSample(framePath, truth, task.workerId, idx);
    if (db === null) continue;
    assertDiskSampleAboveFloor(db, verifyMinDb, idx, task.workerId);
  }
}
async function executeWorkerTask(task, serverUrl, captureOptions, createBeforeCaptureHook, signal, onFrameCaptured, onFrameBuffer, config, parallel, onFailure, onWorkerPhase) {
  const startTime = Date.now();
  let framesCaptured = 0;
  if (!existsSync11(task.outputDir)) mkdirSync8(task.outputDir, { recursive: true });
  let session = null;
  let perf;
  const needsSeparateBrowsers = shouldDisableBrowserPoolForParallelWorker({
    parallel,
    platform: process.platform,
    forceScreenshot: config?.forceScreenshot,
    deviceScaleFactor: captureOptions.deviceScaleFactor,
    headlessShellPath: resolveHeadlessShellPath(config)
  });
  const workerConfig = needsSeparateBrowsers ? { ...config, enableBrowserPool: false } : config;
  const phaseTimeoutMs = resolveParallelWorkerTimeoutMs(
    Boolean(parallel && onFrameBuffer && workerConfig?.useDrawElement)
  );
  let browserVersion = "unknown";
  let canvasDrawElement = "unknown";
  let gpuBackend = "unknown";
  let browserExecutable = resolveHeadlessShellPath(workerConfig) ?? "system/default";
  const diagnosticFor = (phase, frameIndex) => ({
    workerId: task.workerId,
    phase,
    frameIndex,
    browserExecutable,
    browserVersion,
    canvasDrawElement,
    gpuBackend
  });
  const runPhase = (phase, operation) => {
    const diagnostic = diagnosticFor(phase);
    onWorkerPhase?.(diagnostic);
    return withParallelWorkerDeadline(operation(), diagnostic, phaseTimeoutMs, signal);
  };
  try {
    const launch = createCaptureSession(
      serverUrl,
      task.outputDir,
      captureOptions,
      createBeforeCaptureHook(),
      workerConfig
    );
    session = await runPhase("browser_launch", () => launch).catch(async (error) => {
      const closing = launch.then(closeCaptureSession).catch(() => {
      });
      await Promise.race([
        closing,
        new Promise((settle) => setTimeout(settle, LATE_LAUNCH_CLOSE_WAIT_MS).unref())
      ]);
      throw error;
    });
    const activeSession = session;
    browserExecutable = activeSession.browser?.process?.()?.spawnfile || browserExecutable;
    logParDebug(() => `[par:w${task.workerId}] session created`);
    browserVersion = await runPhase(
      "browser_probe",
      async () => await activeSession.browser?.version?.().catch(() => "unknown") ?? "unknown"
    );
    await runPhase("session_init", async () => {
      if (shouldVerifyWorkerGpu(task.workerId, workerConfig)) {
        await assertSwiftShader(activeSession.page, readWebGlVendorInfoFromCanvas);
      }
      await initializeSession(activeSession);
    });
    canvasDrawElement = activeSession.captureMode === "drawelement";
    gpuBackend = activeSession.gpuRenderer ?? "unknown";
    logParDebug(
      () => `[par:w${task.workerId}] init done (mode=${session?.captureMode} workerEncode=${session?.workerEncodeEnabled === true})`
    );
    framesCaptured = await captureFrameRange(
      activeSession,
      task,
      captureOptions,
      signal,
      onFrameCaptured,
      onFrameBuffer,
      phaseTimeoutMs,
      diagnosticFor,
      onWorkerPhase
    );
    await verifyDiskDrawElementSamples(activeSession, task, Boolean(onFrameBuffer));
    perf = getCapturePerfSummary(activeSession);
    return {
      workerId: task.workerId,
      framesCaptured,
      startFrame: task.startFrame,
      endFrame: task.endFrame,
      frameStride: task.frameStride,
      durationMs: Date.now() - startTime,
      perf
    };
  } catch (error) {
    const diagnostics = session ? selectWorkerDiagnostics(session.browserConsoleBuffer) : [];
    const workerDiagnostic = {
      workerId: task.workerId,
      framesCaptured,
      startFrame: task.startFrame,
      endFrame: task.endFrame,
      lines: diagnostics
    };
    const failure = classifyCaptureFailure(error, {
      signal,
      workerDiagnostics: [workerDiagnostic]
    });
    onFailure?.(failure);
    return {
      workerId: task.workerId,
      framesCaptured,
      startFrame: task.startFrame,
      endFrame: task.endFrame,
      frameStride: task.frameStride,
      durationMs: Date.now() - startTime,
      perf,
      error: failure.message,
      diagnostics: diagnostics.length > 0 ? diagnostics : void 0,
      failure
    };
  } finally {
    if (session) await closeCaptureSession(session).catch(() => {
    });
  }
}
function resolveParallelDeVerifySamples(callerValue, workerCount) {
  if (callerValue !== void 0) return callerValue;
  if (workerCount <= 1) return void 0;
  return Math.min(8, 4 + 2 * (workerCount - 1));
}
function isPoolFatalWorkerFailure(failure, streaming) {
  if (streaming) return failure.kind !== "cancelled";
  return isFatalCaptureFailure(failure);
}
function createPoolFailureHandler(args) {
  let firstFatalFailure;
  return {
    firstFatalFailure: () => firstFatalFailure,
    onFailure: (failure) => {
      if (firstFatalFailure || !isPoolFatalWorkerFailure(failure, args.streaming)) return;
      firstFatalFailure = failure;
      try {
        args.hooks?.onWorkerFailure?.(failure);
      } catch {
      } finally {
        args.peerController.abort(failure);
      }
    }
  };
}
async function executeParallelCapture(serverUrl, workDir, tasks, captureOptions, createBeforeCaptureHook, signal, onProgress, onFrameBuffer, config, hooks) {
  const totalFrames = tasks.reduce(
    (sum, t) => sum + Math.ceil((t.endFrame - t.startFrame) / (t.frameStride ?? 1)),
    0
  );
  const workerProgress = /* @__PURE__ */ new Map();
  const workerPhases = /* @__PURE__ */ new Map();
  for (const task of tasks) workerProgress.set(task.workerId, 0);
  const onFrameCaptured = (workerId, _frameIndex) => {
    const current = workerProgress.get(workerId) || 0;
    workerProgress.set(workerId, current + 1);
    if (onProgress) {
      const capturedFrames = Array.from(workerProgress.values()).reduce((a, b) => a + b, 0);
      onProgress({
        totalFrames,
        capturedFrames,
        activeWorkers: tasks.length,
        workerProgress: new Map(workerProgress)
      });
    }
  };
  const onWorkerPhase = (diagnostic) => {
    workerPhases.set(diagnostic.workerId, diagnostic);
    if (!onProgress) return;
    const capturedFrames = Array.from(workerProgress.values()).reduce((a, b) => a + b, 0);
    onProgress({
      totalFrames,
      capturedFrames,
      activeWorkers: tasks.length,
      workerProgress: new Map(workerProgress),
      latestWorkerPhase: diagnostic
    });
  };
  const parallel = tasks.length > 1;
  const deVerifySamples = resolveParallelDeVerifySamples(
    captureOptions.deVerifySamples,
    tasks.length
  );
  const workerCaptureOptions = deVerifySamples === captureOptions.deVerifySamples ? captureOptions : { ...captureOptions, deVerifySamples };
  const peerController = new AbortController();
  const workerSignal = signal ? AbortSignal.any([signal, peerController.signal]) : peerController.signal;
  const failureHandler = createPoolFailureHandler({
    streaming: Boolean(onFrameBuffer),
    peerController,
    hooks
  });
  const onFailure = failureHandler.onFailure;
  const results = await Promise.all(
    tasks.map(
      (task) => executeWorkerTask(
        task,
        serverUrl,
        workerCaptureOptions,
        createBeforeCaptureHook,
        workerSignal,
        onFrameCaptured,
        onFrameBuffer,
        config,
        parallel,
        onFailure,
        onWorkerPhase
      )
    )
  );
  flagSilentWorkerExits(results);
  const errors = results.filter((r) => r.failure || r.error);
  if (errors.length > 0) {
    const errorMessages = errors.map(formatWorkerFailure).join("; ");
    const representative = failureHandler.firstFatalFailure() ?? errors.find((result) => result.failure)?.failure;
    const workerDiagnostics = errors.flatMap((result) => result.failure?.workerDiagnostics ?? []);
    throw new CaptureFailure({
      kind: representative?.kind ?? "io",
      message: `[Parallel] Capture failed: ${errorMessages}`,
      cause: representative,
      workerDiagnostics
    });
  }
  return results;
}
async function mergeWorkerFrames(workDir, tasks, outputDir) {
  if (!existsSync11(outputDir)) mkdirSync8(outputDir, { recursive: true });
  let totalFrames = 0;
  const sortedTasks = [...tasks].sort((a, b) => a.startFrame - b.startFrame);
  for (const task of sortedTasks) {
    if (!existsSync11(task.outputDir)) {
      continue;
    }
    const files = readdirSync6(task.outputDir).filter((f) => f.startsWith("frame_") && (f.endsWith(".jpg") || f.endsWith(".png"))).sort();
    const copyTasks = files.map(async (file) => {
      const sourcePath = join15(task.outputDir, file);
      const targetPath = join15(outputDir, file);
      try {
        await rename(sourcePath, targetPath);
      } catch {
        await copyFile(sourcePath, targetPath);
      }
    });
    await Promise.all(copyTasks);
    totalFrames += files.length;
  }
  return totalFrames;
}
function getSystemResources() {
  return {
    cpuCores: cpus().length,
    totalMemoryMB: getSystemTotalMb(),
    freeMemoryMB: Math.round(freemem() / (1024 * 1024)),
    recommendedWorkers: calculateOptimalWorkers(1e3)
  };
}

// ../engine/src/services/fileServer.ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { readFileSync as readFileSync7, openSync as openSync4, fstatSync, closeSync as closeSync4, statSync as statSync6, constants } from "fs";
import { join as join16, extname as extname3 } from "path";
var MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
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
function readRegularFile(filePath) {
  let fd;
  try {
    fd = openSync4(filePath, constants.O_RDONLY | constants.O_NONBLOCK);
  } catch (error) {
    if (error instanceof Error && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR"))
      return null;
    if (!statSync6(filePath, { throwIfNoEntry: false })?.isFile()) return null;
    throw error;
  }
  try {
    if (!fstatSync(fd).isFile()) return null;
    return readFileSync7(fd);
  } finally {
    closeSync4(fd);
  }
}
function resolveContainedPaths(projectDir, compiledDir, relativePath) {
  const projectPath = join16(projectDir, relativePath);
  if (!isWithinProjectRoot(projectDir, projectPath)) return null;
  if (!compiledDir) return { projectPath, compiledPath: null };
  const compiledPath = join16(compiledDir, relativePath);
  if (!isWithinProjectRoot(compiledDir, compiledPath)) return null;
  return { projectPath, compiledPath };
}
function createFileServer(options) {
  const { projectDir, compiledDir, port = 0, stripEmbeddedRuntime = true } = options;
  const headScripts = options.headScripts ?? [];
  const bodyScripts = options.bodyScripts ?? [];
  const app = new Hono();
  app.get("/*", (c) => {
    let requestPath = c.req.path;
    if (requestPath === "/") requestPath = "/index.html";
    const relativePath = requestPath.replace(/^\//, "");
    const resolved = resolveContainedPaths(projectDir, compiledDir, relativePath);
    if (!resolved) return c.text("Not found", 404);
    const content = (resolved.compiledPath ? readRegularFile(resolved.compiledPath) : null) ?? readRegularFile(resolved.projectPath);
    if (content === null) return c.text("Not found", 404);
    const ext = extname3(relativePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    if (ext === ".html") {
      const rawHtml = content.toString("utf-8");
      const html = relativePath === "index.html" ? injectScriptsIntoHtml(rawHtml, headScripts, bodyScripts, stripEmbeddedRuntime) : rawHtml;
      return c.text(html, 200, { "Content-Type": contentType });
    }
    return new Response(content, {
      status: 200,
      headers: { "Content-Type": contentType }
    });
  });
  return new Promise((resolve) => {
    const server = serve({ fetch: app.fetch, port }, (info) => {
      const actualPort = info.port;
      const url = `http://localhost:${actualPort}`;
      resolve({
        url,
        port: actualPort,
        close: () => server.close()
      });
    });
  });
}

// ../engine/src/utils/layerCompositor.ts
function groupIntoLayers(elements) {
  const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  const layers = [];
  for (const el of sorted) {
    if (el.isHdr) {
      layers.push({ type: "hdr", element: el });
    } else {
      const last = layers[layers.length - 1];
      if (last && last.type === "dom") {
        last.elementIds.push(el.id);
      } else {
        layers.push({ type: "dom", elementIds: [el.id] });
      }
    }
  }
  return layers;
}

// ../engine/src/utils/gpuParityDiff.ts
var DEFAULT_PIXEL_CHANNEL_TOLERANCE = 8;
var DEFAULT_BLACK_SUM_THRESHOLD = 12;
var DEFAULT_CONTENT_SUM_THRESHOLD = 32;
var DEFAULT_BLACK_ONLY_FRACTION_THRESHOLD = 1e-3;
function diffGpuParityFrames(a, b, options = {}) {
  if (a.width !== b.width || a.height !== b.height) {
    throw new Error(
      `diffGpuParityFrames: frame size mismatch \u2014 A is ${a.width}x${a.height}, B is ${b.width}x${b.height}`
    );
  }
  const expectedLen = a.width * a.height * 4;
  if (a.data.length !== expectedLen) {
    throw new Error(
      `diffGpuParityFrames: frame A data length ${a.data.length} does not match expected ${expectedLen} (${a.width}x${a.height} * 4)`
    );
  }
  if (b.data.length !== expectedLen) {
    throw new Error(
      `diffGpuParityFrames: frame B data length ${b.data.length} does not match expected ${expectedLen} (${b.width}x${b.height} * 4)`
    );
  }
  const tol = options.pixelChannelTolerance ?? DEFAULT_PIXEL_CHANNEL_TOLERANCE;
  const blackSum = options.blackSumThreshold ?? DEFAULT_BLACK_SUM_THRESHOLD;
  const contentSum = options.contentSumThreshold ?? DEFAULT_CONTENT_SUM_THRESHOLD;
  if (contentSum <= blackSum) {
    throw new Error(
      `diffGpuParityFrames: contentSumThreshold (${contentSum}) must be strictly greater than blackSumThreshold (${blackSum}) \u2014 overlapping thresholds would double-classify borderline pixels`
    );
  }
  const total = a.width * a.height;
  const aData = a.data;
  const bData = b.data;
  let diffPixels = 0;
  let blackOnlyAPixels = 0;
  let blackOnlyBPixels = 0;
  let aMinX = a.width;
  let aMinY = a.height;
  let aMaxX = -1;
  let aMaxY = -1;
  let bMinX = a.width;
  let bMinY = a.height;
  let bMaxX = -1;
  let bMaxY = -1;
  for (let y = 0; y < a.height; y++) {
    for (let x = 0; x < a.width; x++) {
      const i = (y * a.width + x) * 4;
      const ar = aData[i] ?? 0;
      const ag = aData[i + 1] ?? 0;
      const ab = aData[i + 2] ?? 0;
      const br = bData[i] ?? 0;
      const bg = bData[i + 1] ?? 0;
      const bb = bData[i + 2] ?? 0;
      if (Math.abs(ar - br) > tol || Math.abs(ag - bg) > tol || Math.abs(ab - bb) > tol) {
        diffPixels++;
      }
      const aSum = ar + ag + ab;
      const bSum = br + bg + bb;
      if (aSum <= blackSum && bSum >= contentSum) {
        blackOnlyAPixels++;
        if (x < aMinX) aMinX = x;
        if (y < aMinY) aMinY = y;
        if (x > aMaxX) aMaxX = x;
        if (y > aMaxY) aMaxY = y;
      } else if (bSum <= blackSum && aSum >= contentSum) {
        blackOnlyBPixels++;
        if (x < bMinX) bMinX = x;
        if (y < bMinY) bMinY = y;
        if (x > bMaxX) bMaxX = x;
        if (y > bMaxY) bMaxY = y;
      }
    }
  }
  return {
    width: a.width,
    height: a.height,
    totalPixels: total,
    diffPixels,
    diffFraction: diffPixels / total,
    blackOnlyInA: {
      pixels: blackOnlyAPixels,
      fraction: blackOnlyAPixels / total,
      boundingBox: blackOnlyAPixels === 0 ? null : { x: aMinX, y: aMinY, width: aMaxX - aMinX + 1, height: aMaxY - aMinY + 1 }
    },
    blackOnlyInB: {
      pixels: blackOnlyBPixels,
      fraction: blackOnlyBPixels / total,
      boundingBox: blackOnlyBPixels === 0 ? null : { x: bMinX, y: bMinY, width: bMaxX - bMinX + 1, height: bMaxY - bMinY + 1 }
    }
  };
}
function diffGpuParityPngs(pngA, pngB, options = {}) {
  let a;
  let b;
  try {
    a = decodePng(pngA);
  } catch (err) {
    throw new Error(`diffGpuParityPngs: failed to decode frame A`, { cause: err });
  }
  try {
    b = decodePng(pngB);
  } catch (err) {
    throw new Error(`diffGpuParityPngs: failed to decode frame B`, { cause: err });
  }
  return diffGpuParityFrames(a, b, options);
}
function verifyGpuParity(a, b, options = {}) {
  const diff = diffGpuParityFrames(a, b, options);
  const threshold = options.blackOnlyFractionThreshold ?? DEFAULT_BLACK_ONLY_FRACTION_THRESHOLD;
  if (diff.blackOnlyInA.fraction > threshold) {
    const bb = diff.blackOnlyInA.boundingBox;
    const region = bb ? ` (bbox ${bb.x},${bb.y} ${bb.width}x${bb.height})` : "";
    return {
      ok: false,
      reason: `hardware-GPU frame has ${diff.blackOnlyInA.pixels} pixel(s) (${(diff.blackOnlyInA.fraction * 100).toFixed(3)}%) that are solid-black while software-GPU frame has content there${region} \u2014 likely shape-dependent hardware-GPU capture bug`,
      diff
    };
  }
  if (diff.blackOnlyInB.fraction > threshold) {
    const bb = diff.blackOnlyInB.boundingBox;
    const region = bb ? ` (bbox ${bb.x},${bb.y} ${bb.width}x${bb.height})` : "";
    return {
      ok: false,
      reason: `software-GPU frame has ${diff.blackOnlyInB.pixels} pixel(s) (${(diff.blackOnlyInB.fraction * 100).toFixed(3)}%) that are solid-black while hardware-GPU frame has content there${region} \u2014 unexpected inverse pattern, worth investigating`,
      diff
    };
  }
  return { ok: true, reason: "", diff };
}

// ../engine/src/services/hdrCapture.ts
import { existsSync as existsSync12, readdirSync as readdirSync7 } from "fs";
import { join as join17 } from "path";
import { homedir as homedir2 } from "os";
var PQ_M1 = 0.1593017578125;
var PQ_M2 = 78.84375;
var PQ_C1 = 0.8359375;
var PQ_C2 = 18.8515625;
var PQ_C3 = 18.6875;
var PQ_MAX_NITS = 1e4;
var SDR_NITS = 203;
function linearToPQ(L) {
  const Lp = Math.max(0, L * SDR_NITS / PQ_MAX_NITS);
  const Lm1 = Math.pow(Lp, PQ_M1);
  return Math.pow((PQ_C1 + PQ_C2 * Lm1) / (1 + PQ_C3 * Lm1), PQ_M2);
}
function float16Decode(h) {
  const sign = h >> 15 & 1;
  const exp = h >> 10 & 31;
  const frac = h & 1023;
  if (exp === 0) return (sign ? -1 : 1) * Math.pow(2, -14) * (frac / 1024);
  if (exp === 31) return frac ? NaN : sign ? -Infinity : Infinity;
  return (sign ? -1 : 1) * Math.pow(2, exp - 15) * (1 + frac / 1024);
}
async function initHdrReadback(page, width, height) {
  return page.evaluate(
    async (w, h) => {
      if (!navigator.gpu) return false;
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) return false;
      const device = await adapter.requestDevice();
      const bytesPerPixel = 8;
      const bytesPerRow = Math.ceil(w * bytesPerPixel / 256) * 256;
      const renderTexture = device.createTexture({
        size: [w, h],
        format: "rgba16float",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC | GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING
      });
      const readBuffer = device.createBuffer({
        size: bytesPerRow * h,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
      });
      const captureRuntime = {
        device,
        renderTexture,
        readBuffer,
        bytesPerRow,
        width: w,
        height: h,
        /**
         * Upload pre-converted float16 RGBA data and read it back.
         * The float16 data must be row-aligned to bytesPerRow.
         *
         * Input: base64-encoded Uint16Array (float16 RGBA, row-padded)
         * Output: base64-encoded readback of the same texture
         */
        async uploadAndReadback(float16Base64) {
          const binary = atob(float16Base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
          device.queue.writeTexture(
            { texture: renderTexture },
            bytes.buffer,
            { bytesPerRow, rowsPerImage: h },
            [w, h]
          );
          const encoder = device.createCommandEncoder();
          encoder.copyTextureToBuffer(
            { texture: renderTexture },
            { buffer: readBuffer, bytesPerRow },
            [w, h]
          );
          device.queue.submit([encoder.finish()]);
          await readBuffer.mapAsync(GPUMapMode.READ);
          const readBytes = new Uint8Array(readBuffer.getMappedRange().slice(0));
          readBuffer.unmap();
          let b64 = "";
          const chunkSize = 32768;
          for (let i = 0; i < readBytes.length; i += chunkSize) {
            const slice = readBytes.subarray(i, Math.min(i + chunkSize, readBytes.length));
            b64 += String.fromCharCode(...slice);
          }
          return { base64: btoa(b64), bytesPerRow };
        }
      };
      window.__hfHdrCapture = captureRuntime;
      return true;
    },
    width,
    height
  );
}
async function uploadAndReadbackHdrFrame(page, float16Base64) {
  const result = await page.evaluate(
    async (b64) => {
      const hdr = window.__hfHdrCapture;
      if (!hdr) throw new Error("HDR capture not initialized");
      return hdr.uploadAndReadback(b64);
    },
    float16Base64
  );
  return {
    rawBuffer: Buffer.from(result.base64, "base64"),
    bytesPerRow: result.bytesPerRow
  };
}
function float16ToPqRgb(rawBuffer, bytesPerRow, width, height) {
  const data = new Uint16Array(rawBuffer.buffer, rawBuffer.byteOffset, rawBuffer.byteLength / 2);
  const channelsPerRow = bytesPerRow / 2;
  const output = Buffer.alloc(width * height * 6);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = y * channelsPerRow + x * 4;
      const r = float16Decode(data[srcIdx] ?? 0);
      const g = float16Decode(data[srcIdx + 1] ?? 0);
      const b = float16Decode(data[srcIdx + 2] ?? 0);
      const dstIdx = (y * width + x) * 6;
      output.writeUInt16LE(Math.round(Math.min(1, linearToPQ(r)) * 65535), dstIdx);
      output.writeUInt16LE(Math.round(Math.min(1, linearToPQ(g)) * 65535), dstIdx + 2);
      output.writeUInt16LE(Math.round(Math.min(1, linearToPQ(b)) * 65535), dstIdx + 4);
    }
  }
  return output;
}
function resolveHeadedChromePath() {
  const baseDir = join17(homedir2(), ".cache", "puppeteer", "chrome");
  if (!existsSync12(baseDir)) return void 0;
  const versions = readdirSync7(baseDir).sort().reverse();
  for (const version of versions) {
    const candidates = [
      join17(
        baseDir,
        version,
        "chrome-mac-arm64",
        "Google Chrome for Testing.app",
        "Contents",
        "MacOS",
        "Google Chrome for Testing"
      ),
      join17(
        baseDir,
        version,
        "chrome-mac-x64",
        "Google Chrome for Testing.app",
        "Contents",
        "MacOS",
        "Google Chrome for Testing"
      ),
      join17(baseDir, version, "chrome-linux64", "chrome"),
      join17(baseDir, version, "chrome-win64", "chrome.exe")
    ];
    for (const binary of candidates) {
      if (existsSync12(binary)) return binary;
    }
  }
  return void 0;
}
async function launchHdrBrowser(width, height) {
  let ppt;
  try {
    const mod = await import("puppeteer");
    ppt = mod.default;
  } catch (err) {
    const code = err?.code;
    if (code !== "ERR_MODULE_NOT_FOUND" && code !== "MODULE_NOT_FOUND") {
      throw err;
    }
    const mod = await import("puppeteer-core");
    ppt = mod.default;
  }
  if (!ppt) throw new Error("Neither puppeteer nor puppeteer-core found");
  const chromePath = resolveHeadedChromePath();
  if (!chromePath) {
    throw new Error(
      "[HDR] No Chrome binary found. Install: npx @puppeteer/browsers install chrome@stable"
    );
  }
  const browser = await ppt.launch({
    ...sigintLaunchOptions(),
    headless: false,
    executablePath: chromePath,
    args: buildHdrChromeArgs(width, height)
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  return { browser, page };
}
function buildHdrChromeArgs(width, height) {
  return [
    "--enable-unsafe-webgpu",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--window-position=-10000,-10000",
    `--window-size=${width},${height}`,
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-background-media-suspend",
    "--disable-extensions",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-sync",
    "--no-zygote",
    "--force-gpu-mem-available-mb=4096",
    "--autoplay-policy=no-user-gesture-required"
  ];
}

export {
  DEFAULT_VP9_CPU_USED,
  MIN_VP9_CPU_USED,
  MAX_VP9_CPU_USED,
  normalizeVp9CpuUsed,
  DEFAULT_CONFIG,
  validateEngineConfigSnapshot,
  scaleProtocolTimeoutForComposition,
  EXTRACT_CACHE_DIR_DISABLED_ALIASES,
  defaultExtractCacheDir,
  resolveExtractCacheDir,
  explainDrawElementDisabled,
  resolveConfig,
  shouldClampToScreenshotForConcreteGpu,
  applyConcreteGpuScreenshotClamp,
  BrowserLeasePool,
  setHostHandlesSigint,
  resolveHeadlessShellPath,
  ENABLE_BROWSER_POOL,
  resolveBrowserGpuMode,
  acquireBrowser,
  releaseBrowser,
  drainBrowserPool,
  closeBrowserPool,
  buildChromeArgs,
  compositionRequiresWebGpu,
  WebGpuUnavailableError,
  assertWebGpuAdapterAvailable,
  augmentProtocolTimeoutError,
  isProtocolTimeoutError,
  augmentPageNavigationTimeoutError,
  isPageNavigationTimeoutError,
  DrawElementCaptureError,
  isDrawElementCaptureError,
  decodePng,
  decodePngToRgb48le,
  blitRgba8OverRgb48le,
  roundedRectAlpha,
  blitRgb48leRegion,
  blitRgb48leAffine,
  resampleRgb48leObjectFit,
  normalizeObjectFit,
  parseTransformMatrix,
  cdpSessionCache,
  getCdpSession,
  probeBeginFrameLiveness,
  beginFrameCapture,
  pageScreenshotCapture,
  captureScreenshotWithAlpha,
  initTransparentBackground,
  captureAlphaPng,
  DOM_LAYER_MASK_STYLE_ID,
  applyDomLayerMask,
  removeDomLayerMask,
  injectVideoFramesBatch,
  syncVideoFrameVisibility,
  getFfmpegBinary,
  getFfprobeBinary,
  assertConfiguredFfmpegBinariesExist,
  cloneCaptureWarning,
  cloneCaptureWarnings,
  createChromeMemorySampler,
  CaptureFailure,
  classifyCaptureFailure,
  isTransientBrowserError,
  isMemoryExhaustionError,
  isFatalCaptureFailure,
  DrawElementVerificationError,
  isDrawElementVerificationError,
  getDrawElementVerificationDetails,
  deriveBeginFrameProbeTimeTicks,
  completeDeferredDrawElementInit,
  createCaptureSession,
  VfxFailureError,
  initializeSession,
  captureFrame,
  frameFileExtension,
  writeCapturedFrame,
  captureFrameToBuffer,
  captureFrameToBufferPipelined,
  recaptureDrawElementFrameForVerify,
  captureFramesBatchPipelined,
  discardWarmupCapture,
  closeCaptureSession,
  prepareCaptureSessionForReuse,
  getCompositionDuration,
  percentileOf,
  getCapturePerfSummary,
  ManagedChildProcess,
  trackChildProcess,
  killTrackedProcesses,
  detectGpuEncoder,
  isHdrColorSpace,
  detectTransfer,
  DEFAULT_HDR10_MASTERING,
  getHdrEncoderColorParams,
  HDR_AUTO_PROMOTION_PIPELINE,
  sanitizeHdrAutoPromotionAsset,
  findHdrAutoPromotion,
  formatHdrAutoPromotionWarning,
  analyzeCompositionHdr,
  isExternalFfmpegInterruption,
  formatFfmpegError,
  runFfmpeg,
  probeMediaProfile,
  extractMediaMetadata,
  extractFinalVideoFrameTimestamp,
  extractVideoMetadata,
  extractAudioMetadata,
  analyzeKeyframeIntervals,
  PROVENANCE_RENDERER_TAG,
  PROVENANCE_VERSION_TAG,
  PROVENANCE_RENDERER_NAME,
  PROVENANCE_VERSION,
  renderProvenanceArgs,
  appendRenderProvenanceArgs,
  readRenderProvenance,
  ENCODER_PRESETS,
  getEncoderPreset,
  buildEncoderArgs,
  encodeFramesFromDir,
  buildConcatArgs,
  concatVideoFiles,
  encodeFramesChunkedConcat,
  muxVideoWithAudio,
  HLS_MASTER_PLAYLIST,
  HLS_VIDEO_PLAYLIST,
  HLS_AUDIO_PLAYLIST,
  packageHls,
  applyFaststart,
  createFrameReorderBuffer,
  spawnStreamingEncoder,
  HF_AUDIO_GROUP_TAG,
  HF_AUDIO_GROUP_ATTR,
  resolveReferencedStart,
  resolveReferencedDuration,
  safeDownloadUrlIdentity,
  writeUrlDownloadTelemetry,
  isBlockedNetworkHost,
  assertPublicHttpsUrl,
  fetchPublicHttpsText,
  downloadToTemp,
  isHttpUrl,
  directorySizeBytes,
  gcExtractionCache,
  VIDEO_FRAME_FORMATS,
  isVideoFrameFormat,
  extractionFrameCountForDuration,
  EXTRACT_CACHE_MIN_AGE_MS,
  safeVideoExtractionSourceIdentity,
  VideoSourceExtractionError,
  isVideoSourceExtractionError,
  classifyVideoExtractionError,
  runVideoExtractionWithRetry,
  parseVideoElements,
  parseImageElements,
  extractVideoFramesRange,
  resolvePlayableVideoDuration,
  resolveTimelineExtractionWindow,
  resolveFinalFrameExtractionWindow,
  resolveVideoExtractionWindow,
  resolveVideoExtractionDuration,
  extractAllVideoFrames,
  getFrameAtTime,
  analyzeClipMediaFit,
  FrameLookupTable,
  createFrameLookupTable,
  createVideoFrameInjector,
  hideVideoElements,
  showVideoElements,
  queryVideoElementBounds,
  queryElementStacking,
  NOT_MEDIA_PAYLOAD,
  NotMediaPayloadError,
  fingerprintElementId,
  isNotMediaPayload,
  assertMediaPayload,
  MEDIA_START_BASIS_ATTR,
  readMediaStartBasis,
  resolveAbsoluteMediaStartSeconds,
  resolveMediaStartSeconds,
  MIXED_AUDIO_FILENAME,
  parseAudioElements,
  processCompositionAudio,
  psnrDb,
  resolveDeVerifyMinDb,
  BROWSER_GPU_NOT_SOFTWARE,
  SwiftShaderAssertionError,
  readWebGlVendorInfo,
  assertSwiftShader,
  readWebGlVendorInfoFromCanvas,
  shouldDisableBrowserPoolForParallelWorker,
  computeWorkerSizing,
  calculateOptimalWorkers,
  distributeFrames,
  distributeFramesInterleaved,
  selectVerifySampleIndicesForTask,
  verifyDiskDrawElementSamples,
  executeParallelCapture,
  mergeWorkerFrames,
  getSystemResources,
  createFileServer,
  groupIntoLayers,
  diffGpuParityFrames,
  diffGpuParityPngs,
  verifyGpuParity,
  initHdrReadback,
  uploadAndReadbackHdrFrame,
  float16ToPqRgb,
  launchHdrBrowser,
  buildHdrChromeArgs
};
