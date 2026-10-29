import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  runEnvironmentChecks
} from "./chunk-YWFRK7NU.js";
import {
  reportVariableIssues,
  resolveVariablesArg,
  validateVariablesAgainstProject
} from "./chunk-6RZ4BVBM.js";
import {
  loadProducer
} from "./chunk-AM7M3H6I.js";
import {
  hasExplicitCompositionArg,
  parseGifLoopArg,
  parseHlsSegmentSecondsArg,
  resolveBrowserTimeoutMsArg,
  resolveCompositionEntryArg,
  resolveDefaultFpsArg,
  windowsChromeCrashRemediation
} from "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFCFR3KZ.js";
import {
  renderJobObservabilityTelemetryPayload
} from "./chunk-VXVRPIJA.js";
import {
  formatLintStartupMessage
} from "./chunk-6CSYCFQV.js";
import {
  desktopHint
} from "./chunk-VBEGG5QH.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import {
  errorBox,
  formatBytes,
  formatRenderPipelineDetail,
  formatRenderSummaryDetail,
  formatScreenshotFallbackHint,
  resolvePrintedCaptureMode
} from "./chunk-IHFUKJOR.js";
import {
  loadProjectConfig,
  readProjectConfigWithStatus,
  seedProjectAuthoringSkill
} from "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import {
  normalizeSkillSlug
} from "./chunk-HVW7ABXD.js";
import "./chunk-GX6TLRYJ.js";
import "./chunk-6LTRBXKR.js";
import {
  createRenderCancellationScope
} from "./chunk-QPIYSFE4.js";
import {
  parseFeedbackRating,
  trackRenderComplete,
  trackRenderError,
  trackRenderFeedback,
  trackRenderObservation,
  trackRenderPreflightRejected
} from "./chunk-D3TRQ4GS.js";
import {
  shouldTrack
} from "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import {
  bytesToMb,
  detectAgentRuntime
} from "./chunk-GQJZORQP.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import {
  H264EncoderUnavailableError,
  chromeLaunchRemediation,
  detectH264EncoderModeForRender,
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallHint
} from "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  markRenderSucceeded,
  runPostRenderStep,
  runPostRenderStepAsync
} from "./chunk-L3YOGIPG.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand,
  failUsage,
  requestCliExit,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import {
  EXTRACT_CACHE_DIR_DISABLED_ALIASES,
  MAX_VP9_CPU_USED,
  MIN_VP9_CPU_USED,
  isVideoFrameFormat
} from "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import {
  formatRenderOutputTimestamp,
  fpsToFfmpegArg,
  fpsToNumber,
  parseFps
} from "./chunk-SIG2LUMK.js";
import {
  checkOutputResolutionCompatibility,
  isAspectAgnosticResolutionAlias,
  normalizeResolutionFlag,
  suggestMatchingPreset
} from "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import {
  hasDefinitiveEntryMismatch
} from "./chunk-Q5X2B5WT.js";
import "./chunk-GOPKWMQZ.js";
import {
  killOrphanedProcessesForRender
} from "./chunk-LAOCA3MQ.js";
import {
  runRenderSetupWorker
} from "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import {
  lintProject,
  shouldBlockRender
} from "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import {
  collectSubCompositionSrcs
} from "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import {
  readConfig,
  readConfigFresh,
  recordRecentRender,
  writeConfig,
  writeConfigWithResult
} from "./chunk-2SBJMKLH.js";
import {
  isDevMode
} from "./chunk-ISN5GRYI.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/render.ts
import { mkdtempSync, readdirSync, readFileSync as readFileSync4, statSync as statSync2, writeFileSync, rmSync } from "fs";

// src/commands/render/plan.ts
import { statSync } from "fs";
import { dirname, join, resolve as resolve2 } from "path";

// src/utils/catalogUsage.ts
import { readFileSync } from "fs";
import { isAbsolute, relative, resolve } from "path";
var EMPTY = Object.freeze({
  installed: [],
  usedBlocks: [],
  manifestUnreadable: false
});
var UNREADABLE = Object.freeze({
  installed: [],
  usedBlocks: [],
  manifestUnreadable: true
});
var MAX_VISITED_FILES = 250;
var MAX_HTML_BYTES = 20 * 1024 * 1024;
var REGISTRY_ITEM_NAME = /^[a-z0-9][a-z0-9-]{0,63}$/;
function reachableCompositions(projectDir, entryPath) {
  const seen = /* @__PURE__ */ new Set();
  const queue = [resolve(entryPath)];
  while (queue.length > 0 && seen.size < MAX_VISITED_FILES) {
    const current = queue.shift();
    if (seen.has(current)) continue;
    seen.add(current);
    let html;
    try {
      html = readFileSync(current, "utf-8");
    } catch {
      continue;
    }
    if (html.length > MAX_HTML_BYTES) continue;
    for (const src of collectSubCompositionSrcs(html)) {
      queue.push(resolve(projectDir, src));
    }
  }
  return seen;
}
function isReached(projectDir, target, reachable) {
  if (isAbsolute(target)) return false;
  const abs = resolve(projectDir, target);
  if (relative(projectDir, abs).startsWith("..")) return false;
  return reachable.has(abs);
}
function reportableNames(names) {
  return [...new Set(names.filter((name) => REGISTRY_ITEM_NAME.test(name)))].sort();
}
function summarizeCatalogUsage(projectDir, entryPath) {
  const { status, config } = readProjectConfigWithStatus(projectDir);
  if (status === "unreadable") return UNREADABLE;
  const items = config?.registryItems ?? [];
  if (items.length === 0) return EMPTY;
  const installed = reportableNames(items.map((item) => item.name));
  if (installed.length === 0) return EMPTY;
  const reachable = reachableCompositions(projectDir, entryPath);
  const usedBlocks = reportableNames(
    items.filter(
      (item) => item.type === "hyperframes:block" && isReached(projectDir, item.target, reachable)
    ).map((item) => item.name)
  );
  return { installed, usedBlocks, manifestUnreadable: false };
}

// src/commands/render/plan.ts
var QUALITY_ALIASES = {
  draft: { quality: "draft" },
  standard: { quality: "standard" },
  high: { quality: "high" },
  looks: { quality: "standard", crf: 16 },
  delivery: { quality: "high" }
};
var RENDER_FORMATS = ["mp4", "webm", "mov", "png-sequence", "gif", "hls"];
var VALID_FORMAT = new Set(RENDER_FORMATS);
var RENDER_FORMAT_LABEL = "mp4, webm, mov, png-sequence, gif, or hls";
var DEFAULT_HLS_SEGMENT_SECONDS = 4;
var FORMAT_EXT = {
  mp4: ".mp4",
  webm: ".webm",
  mov: ".mov",
  "png-sequence": "",
  gif: ".gif",
  // Directory output, like png-sequence: playlists and .ts segments go inside.
  hls: ""
};
function formatFpsParseError(input, reason) {
  switch (reason) {
    case "empty":
      return "Frame rate must not be empty.";
    case "not-a-number":
      return `Got "${input}". Frame rate must be an integer (e.g. 30) or a rational (e.g. 30000/1001 for NTSC).`;
    case "non-positive":
      return `Got "${input}". Frame rate must be greater than zero.`;
    case "out-of-range":
      return `Got "${input}". Frame rate must be in the range 1\u2013240.`;
    case "invalid-fraction":
      return `Got "${input}". Rational frame rates must be two positive integers separated by '/' (e.g. 30000/1001).`;
    case "ambiguous-decimal":
      return `Got "${input}". Decimal frame rates are ambiguous \u2014 use the exact rational form instead (e.g. 30000/1001 for 29.97).`;
  }
}
function parseRenderFormat(input) {
  if (!VALID_FORMAT.has(input)) return void 0;
  return RENDER_FORMATS.find((format) => format === input);
}
function positiveInteger(raw, title, message, min = 1) {
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < min) {
    errorBox(title, message);
    failUsage();
  }
  return parsed;
}
var HF_ENV_OVERRIDE_RE = /^(HF|HYPERFRAMES)_/;
var MAX_REPORTED_ENV_OVERRIDES = 20;
var CLI_INTERNAL_HF_ENV_KEYS = /* @__PURE__ */ new Set(["HF_SHADER_WORKER_ENTRY"]);
function resolveHfEnvOverrides() {
  return Object.keys(process.env).filter((name) => HF_ENV_OVERRIDE_RE.test(name) && !CLI_INTERNAL_HF_ENV_KEYS.has(name)).sort().slice(0, MAX_REPORTED_ENV_OVERRIDES);
}
function createRenderPlan(args, now = /* @__PURE__ */ new Date()) {
  const hfEnvOverrides = resolveHfEnvOverrides();
  const hasExplicitComposition = hasExplicitCompositionArg(args.composition);
  const project = resolveProject(args.dir, { requireIndex: !hasExplicitComposition });
  const entryFile = resolveCompositionEntryArg(args.composition, project.dir, statSync);
  const renderTarget = entryFile ? resolve2(project.dir, entryFile) : project.indexPath;
  const fpsArg = resolveDefaultFpsArg(args.fps, project.dir, project.indexPath, entryFile);
  const fpsParse = parseFps(fpsArg ?? "30");
  if (!fpsParse.ok) {
    errorBox("Invalid fps", formatFpsParseError(fpsArg ?? "30", fpsParse.reason));
    failUsage();
  }
  let fps = fpsParse.value;
  const qualityRaw = args.quality ?? "looks";
  if (!(qualityRaw in QUALITY_ALIASES)) {
    errorBox(
      "Invalid quality",
      `Got "${qualityRaw}". Must be draft, looks, delivery, standard, or high.`
    );
    failUsage();
  }
  const qualityAlias = QUALITY_ALIASES[qualityRaw];
  const quality = qualityAlias.quality;
  const flagSkill = normalizeSkillSlug(args.skill);
  const projectConfigSkill = loadProjectConfig(project.dir).authoringSkill;
  const authoringSkill = flagSkill ?? projectConfigSkill;
  const invalidAuthoringSkill = typeof args.skill === "string" && args.skill.trim() !== "" && !flagSkill ? args.skill : void 0;
  const authoringSkillSource = flagSkill ? "flag" : projectConfigSkill ? "project-config" : void 0;
  const catalogUsage = summarizeCatalogUsage(project.dir, renderTarget);
  const formatRaw = args.format ?? "mp4";
  const format = parseRenderFormat(formatRaw);
  if (!format) {
    errorBox("Invalid format", `Got "${formatRaw}". Must be ${RENDER_FORMAT_LABEL}.`);
    failUsage();
  }
  let gifFpsCapped = false;
  if (format === "gif" && fpsToNumber(fps) > 30) {
    fps = { num: 30, den: 1 };
    gifFpsCapped = true;
  }
  const gifLoopParse = parseGifLoopArg(args["gif-loop"]);
  if (!gifLoopParse.ok) {
    errorBox("Invalid gif-loop", gifLoopParse.message);
    failUsage();
  }
  const gifLoop = gifLoopParse.value ?? (format === "gif" ? 0 : void 0);
  const hlsSegmentParse = parseHlsSegmentSecondsArg(args["hls-segment-seconds"]);
  if (!hlsSegmentParse.ok) {
    errorBox("Invalid hls-segment-seconds", hlsSegmentParse.message);
    failUsage();
  }
  const hlsSegmentSeconds = format === "hls" ? hlsSegmentParse.value ?? DEFAULT_HLS_SEGMENT_SECONDS : void 0;
  const videoFrameFormatRaw = args["video-frame-format"] ?? "auto";
  if (!isVideoFrameFormat(videoFrameFormatRaw)) {
    errorBox(
      "Invalid video-frame-format",
      `Got "${videoFrameFormatRaw}". Must be auto, jpg, or png.`
    );
    failUsage();
  }
  let outputResolution;
  let outputResolutionAspectAgnostic = false;
  if (args.resolution !== void 0) {
    outputResolution = normalizeResolutionFlag(args.resolution);
    if (!outputResolution) {
      errorBox(
        "Invalid resolution",
        `Got "${args.resolution}". Must be one of: landscape, portrait, landscape-4k, portrait-4k, square, square-4k (or aliases 1080p, 4k, uhd, 1080p-square, square-1080p, 4k-square).`
      );
      failUsage();
    }
    outputResolutionAspectAgnostic = isAspectAgnosticResolutionAlias(args.resolution);
    if (args.hdr) {
      errorBox(
        "Conflicting flags",
        "--resolution cannot be combined with --hdr. The HDR pipeline composites at composition dimensions and does not yet support supersampling.",
        "Render in two passes: HDR at composition resolution, then upscale separately with ffmpeg."
      );
      failUsage();
    }
  }
  if (args.hdr && args.sdr) {
    errorBox("Conflicting flags", "--hdr and --sdr are mutually exclusive.");
    failUsage();
  }
  if (format === "hls" && args.hdr) {
    errorBox(
      "Unsupported HLS output",
      "--hdr cannot be combined with --format hls. HLS output is SDR only (H.264 + AAC in MPEG-TS); HDR10 would need fMP4 segments and HEVC.",
      "Render HDR to MP4, or drop --hdr."
    );
    failUsage();
  }
  if (format === "hls" && args.gpu) {
    errorBox(
      "Unsupported HLS output",
      "--gpu cannot be combined with --format hls. Fixed-length segments require the software encoder's forced-keyframe lock, which GPU encoders ignore.",
      "Re-run without --gpu."
    );
    failUsage();
  }
  const workers = args.workers != null && args.workers !== "auto" ? positiveInteger(
    args.workers,
    "Invalid workers",
    `Got "${args.workers}". Must be a positive number or "auto".`
  ) : void 0;
  const protocolTimeout = args["protocol-timeout"] != null ? positiveInteger(
    args["protocol-timeout"],
    "Invalid protocol-timeout",
    `Got "${args["protocol-timeout"]}". Must be a number >= 1000 (ms).`,
    1e3
  ) : void 0;
  const playerReadyTimeout = args["player-ready-timeout"] != null ? positiveInteger(
    args["player-ready-timeout"],
    "Invalid player-ready-timeout",
    `Got "${args["player-ready-timeout"]}". Must be a number >= 1000 (ms).`,
    1e3
  ) : void 0;
  const environment = {};
  if (args["page-side-compositing"] === false) environment.HF_PAGE_SIDE_COMPOSITING = "false";
  if (args["low-memory-mode"] != null) {
    environment.PRODUCER_LOW_MEMORY_MODE = args["low-memory-mode"] ? "true" : "false";
  }
  if (args["experimental-fast-capture"] != null) {
    environment.PRODUCER_EXPERIMENTAL_FAST_CAPTURE = args["experimental-fast-capture"] ? "true" : "false";
  }
  if (typeof args["frames-cache-dir"] === "string" && args["frames-cache-dir"].trim() !== "") {
    const raw = args["frames-cache-dir"].trim();
    const normalized = raw.toLowerCase();
    const isDisableAlias = EXTRACT_CACHE_DIR_DISABLED_ALIASES.includes(normalized);
    environment.HYPERFRAMES_EXTRACT_CACHE_DIR = isDisableAlias ? raw : resolve2(raw);
  }
  if (args["max-concurrent-renders"] != null) {
    const parsed = positiveInteger(
      args["max-concurrent-renders"],
      "Invalid max-concurrent-renders",
      `Got "${args["max-concurrent-renders"]}". Must be a number between 1 and 10.`
    );
    if (parsed > 10) {
      errorBox(
        "Invalid max-concurrent-renders",
        `Got "${args["max-concurrent-renders"]}". Must be a number between 1 and 10.`
      );
      failUsage();
    }
    environment.PRODUCER_MAX_CONCURRENT_RENDERS = String(parsed);
  }
  const batchPath = typeof args.batch === "string" && args.batch.trim() !== "" ? args.batch.trim() : void 0;
  if (batchPath && (args.variables != null || args["variables-file"] != null)) {
    errorBox(
      "Conflicting variables flags",
      "Use either --batch or --variables/--variables-file, not both."
    );
    failUsage();
  }
  if (!batchPath && args["batch-concurrency"] != null) {
    errorBox("Invalid batch-concurrency", "--batch-concurrency requires --batch.");
    failUsage();
  }
  if (!batchPath && args["batch-fail-fast"]) {
    errorBox("Invalid batch-fail-fast", "--batch-fail-fast requires --batch.");
    failUsage();
  }
  const batchConcurrency = args["batch-concurrency"] != null ? positiveInteger(
    args["batch-concurrency"],
    "Invalid batch-concurrency",
    `Got "${args["batch-concurrency"]}". Must be a positive integer.`
  ) : 1;
  const rendersDir = resolve2("renders");
  const ext = FORMAT_EXT[format];
  const timestamp = formatRenderOutputTimestamp(now);
  const batchOutputTemplate = args.output ? args.output : join(rendersDir, `${project.name}_${timestamp}_{index}${ext}`);
  const outputPath = args.output ? resolve2(args.output) : join(rendersDir, `${project.name}_${timestamp}${ext}`);
  const useDocker = args.docker ?? false;
  const useGpu = args.gpu ?? false;
  const browserGpuMode = resolveBrowserGpuForCli(useDocker, args["browser-gpu"]);
  if (useDocker && args["browser-gpu"] === true) {
    errorBox(
      "Browser GPU is local-only",
      "--browser-gpu uses the host Chrome GPU backend. Docker mode keeps browser rendering deterministic and does not expose a cross-platform Chrome GPU backend.",
      "Run without --docker, or use --gpu for Docker GPU encoding where your Docker host supports GPU passthrough."
    );
    failUsage();
  }
  const videoBitrate = args["video-bitrate"]?.trim();
  if (args.crf != null && videoBitrate) {
    errorBox("Conflicting encoder settings", "Use either --crf or --video-bitrate, not both.");
    failUsage();
  }
  const crf = args.crf != null ? positiveInteger(
    args.crf,
    "Invalid crf",
    `Got "${args.crf}". Must be a non-negative integer.`,
    0
  ) : format === "mov" || args["video-bitrate"] ? void 0 : "crf" in qualityAlias ? qualityAlias.crf : void 0;
  let vp9CpuUsed;
  if (args["vp9-cpu-used"] != null) {
    const parsed = Number(args["vp9-cpu-used"]);
    if (!Number.isInteger(parsed) || parsed < MIN_VP9_CPU_USED || parsed > MAX_VP9_CPU_USED) {
      errorBox(
        "Invalid vp9-cpu-used",
        `Got "${args["vp9-cpu-used"]}". Must be an integer between ${MIN_VP9_CPU_USED} and ${MAX_VP9_CPU_USED}.`
      );
      failUsage();
    }
    vp9CpuUsed = parsed;
  }
  if (args["video-bitrate"] != null && !videoBitrate) {
    errorBox(
      "Invalid video-bitrate",
      `Got "${args["video-bitrate"]}". Must be a non-empty bitrate such as "10M".`
    );
    failUsage();
  }
  if (format === "mov" && (crf !== void 0 || videoBitrate !== void 0)) {
    const flag = crf !== void 0 ? "--crf" : "--video-bitrate";
    errorBox(
      "Unsupported ProRes rate control",
      `${flag} does not apply to MOV. MOV uses a fixed alpha-preserving ProRes 4444 profile.`,
      `Remove ${flag}, or choose MP4/WebM when you need CRF or target-bitrate control.`
    );
    failUsage();
  }
  const quiet = args.quiet ?? false;
  const batchJson = args.json ?? false;
  return Object.freeze({
    project,
    entryFile,
    renderTarget,
    fps,
    quality,
    authoringSkill,
    invalidAuthoringSkill,
    authoringSkillSource,
    catalogUsage,
    format,
    gifLoop,
    gifFpsCapped,
    hlsSegmentSeconds,
    videoFrameFormat: videoFrameFormatRaw,
    outputResolution,
    outputResolutionAspectAgnostic,
    outputResolutionRaw: args.resolution,
    workers,
    protocolTimeout,
    playerReadyTimeout,
    pageNavigationTimeoutMs: resolveBrowserTimeoutMsArg(args["browser-timeout"]),
    batchPath,
    batchConcurrency,
    batchFailFast: args["batch-fail-fast"] ?? false,
    batchOutputTemplate,
    outputPath,
    useDocker,
    useGpu,
    browserGpuMode,
    quiet,
    lintVerbose: args["lint-verbose"] ?? false,
    debug: args.debug ?? false,
    resumeSegments: args.resume ?? false,
    keepSegments: args["keep-segments"] ?? false,
    bestEffort: args["best-effort"] ?? true,
    batchJson,
    effectiveQuiet: quiet || batchPath != null && batchJson,
    strictAll: args["strict-all"] ?? false,
    strictErrors: (args.strict ?? false) || (args["strict-all"] ?? false),
    crf,
    vp9CpuUsed,
    videoBitrate,
    hdrMode: args.sdr ? "force-sdr" : args.hdr ? "force-hdr" : "auto",
    pageSideCompositing: args["page-side-compositing"] !== false,
    experimentalFastCapture: args["experimental-fast-capture"] === true,
    variablesArg: args.variables,
    variablesFileArg: args["variables-file"],
    strictVariables: args["strict-variables"] ?? false,
    environment: Object.freeze(environment),
    hfEnvOverrides
  });
}
function applyRenderEnvironment(plan) {
  for (const [key, value] of Object.entries(plan.environment)) process.env[key] = value;
}
function renderOutputDirectory(plan) {
  return dirname(plan.outputPath);
}
function resolveBrowserGpuForCli(useDocker, browserGpuArg, envMode = process.env.PRODUCER_BROWSER_GPU_MODE) {
  if (useDocker) return "software";
  if (browserGpuArg === true) return "hardware";
  if (browserGpuArg === false) return "software";
  if (envMode === "hardware" || envMode === "software" || envMode === "auto") return envMode;
  return "auto";
}

// src/commands/render/present.ts
import { cpus } from "os";
import { readFileSync as readFileSync2 } from "fs";
async function presentRenderPlan(plan) {
  await presentRenderWarnings(plan);
  if (plan.effectiveQuiet || plan.batchPath) return;
  presentRenderSummary(plan);
}
async function presentRenderWarnings(plan) {
  if (plan.invalidAuthoringSkill) {
    process.stderr.write(
      `hyperframes: ignoring --skill="${plan.invalidAuthoringSkill}" \u2014 not a valid slug (lowercase letters/digits/hyphens, max 64); this render will be unattributed.
`
    );
  }
  if (!plan.effectiveQuiet && plan.gifFpsCapped) {
    console.log(c.warn("  GIF output is capped at 30fps. Use --fps 15 for smaller files."));
  }
  if (!plan.effectiveQuiet) await warnForSlideshow(plan);
}
function presentRenderSummary(plan) {
  const workerLabel = plan.workers != null ? `${plan.workers} workers` : `auto workers (${cpus().length} cores detected)`;
  const nameLabel = plan.entryFile ? `${plan.project.name}/${plan.entryFile}` : plan.project.name;
  console.log("");
  console.log(
    c.accent("\u25C6") + "  Rendering " + c.accent(nameLabel) + c.dim(" \u2192 " + plan.outputPath)
  );
  console.log(
    c.dim(`   ${fpsToFfmpegArg(plan.fps)}fps \xB7 ${plan.quality} \xB7 ${workerLabel}`)
  );
  if (plan.outputResolution) {
    console.log(c.dim("   Output resolution: " + plan.outputResolution));
  }
  if (plan.format === "hls") {
    console.log(c.dim(`   HLS: ${plan.hlsSegmentSeconds}s segments in a playlist directory`));
  }
  const gpuModes = formatGpuModes(plan);
  if (gpuModes) console.log(c.dim("   GPU: " + gpuModes));
  console.log("");
}
function formatGpuModes(plan) {
  const modes = [];
  if (plan.useGpu) modes.push("encoder GPU");
  if (plan.browserGpuMode === "hardware") modes.push("browser GPU (forced)");
  else if (plan.browserGpuMode === "auto") modes.push("browser GPU (auto-detect)");
  return modes.length > 0 ? modes.join(" + ") : void 0;
}
async function warnForSlideshow(plan) {
  try {
    const { slideshowIslandRegex } = await import("./slideshow-TBTDYAJD.js");
    if (!slideshowIslandRegex("i").test(readFileSync2(plan.renderTarget, "utf8"))) return;
    console.log(
      c.warn("\u26A0") + "  This composition carries a slideshow island \u2014 `render` captures only the first scene, so the MP4 will be truncated to slide 1. Use " + c.accent("hyperframes present") + " for the deck; a linear main-line MP4 export is not yet available."
    );
    console.log("");
  } catch {
  }
}

// src/commands/render/execute.ts
import { mkdirSync, readFileSync as readFileSync3 } from "fs";
function renderLintContinuationHint(strictErrors) {
  return strictErrors ? "  Continuing render despite lint warnings. Use --strict-all to block warnings." : "  Continuing render despite lint issues. Use --strict to block errors.";
}
function renderLintShouldAbort(strictErrors, strictAll, lintResult, definitiveEntryMismatch) {
  return definitiveEntryMismatch || shouldBlockRender(strictErrors, strictAll, lintResult.totalErrors, lintResult.totalWarnings);
}
async function executeRenderPlan(plan, dependencies, cancellation) {
  assertRenderActive(cancellation);
  applyRenderEnvironment(plan);
  if (!plan.batchPath) mkdirSync(renderOutputDirectory(plan), { recursive: true });
  let batchModule;
  let preparedBatch;
  if (plan.batchPath) {
    batchModule = await import("./batchRender-4ZN7H7W4.js");
    try {
      preparedBatch = batchModule.prepareBatchRender({
        batchPath: plan.batchPath,
        outputTemplate: plan.batchOutputTemplate,
        indexPath: plan.renderTarget,
        strictVariables: plan.strictVariables,
        quiet: plan.quiet || plan.batchJson,
        json: plan.batchJson
      });
    } catch (error) {
      batchModule.exitBatchRenderInputError(error);
    }
  }
  const browserPath = plan.useDocker ? void 0 : await ensureRenderBrowser(plan, cancellation?.signal);
  assertRenderActive(cancellation);
  await runRenderLint(plan, lintProject, cancellation?.signal);
  assertRenderActive(cancellation);
  await runResolutionPreflight(plan, dependencies.checkResolution);
  assertRenderActive(cancellation);
  if (plan.batchPath && batchModule && preparedBatch) {
    await executeBatchRender(
      plan,
      browserPath,
      batchModule,
      preparedBatch,
      dependencies,
      cancellation
    );
    return;
  }
  const variables = resolveVariablesArg(plan.variablesArg, plan.variablesFileArg);
  if (variables && Object.keys(variables).length > 0) {
    const issues = validateVariablesAgainstProject(plan.renderTarget, variables);
    reportVariableIssues(issues, { strict: plan.strictVariables, quiet: plan.quiet });
  }
  const options = renderOptionsFromPlan(plan, browserPath, variables);
  const execute = plan.useDocker ? dependencies.renderDocker : dependencies.renderLocal;
  await execute(plan.project.dir, plan.outputPath, options, cancellation);
}
function renderOptionsFromPlan(plan, browserPath, variables) {
  const options = {
    fps: plan.fps,
    quality: plan.quality,
    authoringSkill: plan.authoringSkill,
    authoringSkillSource: plan.authoringSkillSource,
    authoringSkillInvalid: plan.invalidAuthoringSkill,
    hfEnvOverrides: plan.hfEnvOverrides,
    catalogUsage: plan.catalogUsage,
    format: plan.format,
    gifLoop: plan.gifLoop,
    gifFpsCapped: plan.gifFpsCapped,
    hlsSegmentSeconds: plan.hlsSegmentSeconds,
    workers: plan.workers,
    gpu: plan.useGpu,
    browserGpuMode: plan.browserGpuMode,
    hdrMode: plan.hdrMode,
    crf: plan.crf,
    vp9CpuUsed: plan.vp9CpuUsed,
    videoBitrate: plan.videoBitrate,
    videoFrameFormat: plan.videoFrameFormat,
    quiet: plan.quiet,
    browserPath,
    debug: plan.debug,
    resumeSegments: plan.resumeSegments,
    keepSegments: plan.keepSegments,
    bestEffort: plan.bestEffort,
    variables,
    entryFile: plan.entryFile,
    outputResolution: plan.outputResolution,
    outputResolutionAspectAgnostic: plan.outputResolutionAspectAgnostic,
    outputResolutionRaw: plan.outputResolutionRaw,
    pageNavigationTimeoutMs: plan.pageNavigationTimeoutMs,
    protocolTimeout: plan.protocolTimeout,
    playerReadyTimeout: plan.playerReadyTimeout,
    exitAfterComplete: true,
    manageDeParallelRouterBreaker: true
  };
  if (plan.useDocker) {
    options.pageSideCompositing = plan.pageSideCompositing;
    options.experimentalFastCapture = plan.experimentalFastCapture;
  }
  return options;
}
function assertRenderActive(cancellation) {
  cancellation?.checkAncestors();
  cancellation?.signal.throwIfAborted();
}
async function ensureRenderBrowser(plan, signal) {
  const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
  let browserSpinner;
  try {
    if (plan.effectiveQuiet) {
      return (await ensureBrowser({ preferManagedChrome: true, signal })).executablePath;
    }
    const clack = await import("./dist-EWXJGN63.js");
    browserSpinner = clack.spinner();
    browserSpinner.start("Checking browser...");
    const info = await ensureBrowser({
      preferManagedChrome: true,
      signal,
      onProgress: (downloaded, total) => {
        if (total <= 0) return;
        const pct = Math.floor(downloaded / total * 100);
        browserSpinner?.message(
          `Downloading Chrome... ${c.progress(pct + "%")} ${c.dim("(" + formatBytes(downloaded) + " / " + formatBytes(total) + ")")}`
        );
      }
    });
    browserSpinner.stop(c.dim(`Browser: ${info.source}`));
    return info.executablePath;
  } catch (error) {
    browserSpinner?.stop(c.error("Browser not available"));
    if (signal?.aborted) signal.throwIfAborted();
    errorBox(
      "Chrome not found",
      normalizeErrorMessage(error),
      "Run: npx hyperframes browser ensure"
    );
    failCommand();
  }
}
async function runRenderLint(plan, runLint = lintProject, signal) {
  const explicitEntry = plan.entryFile ? plan.renderTarget : void 0;
  const lintResult = signal && runLint === lintProject ? await runRenderLintInOwnedProcess(plan.project.dir, explicitEntry, signal) : await runLint(plan.project.dir, explicitEntry);
  if (lintResult.totalErrors === 0 && lintResult.totalWarnings === 0) return;
  const definitiveEntryMismatch = hasDefinitiveEntryMismatch(lintResult);
  const willAbort = renderLintShouldAbort(
    plan.strictErrors,
    plan.strictAll,
    lintResult,
    definitiveEntryMismatch
  );
  presentRenderLintFindings(lintResult, plan.effectiveQuiet, plan.lintVerbose || willAbort);
  if (willAbort) {
    presentRenderLintAbort(plan, definitiveEntryMismatch);
    failCommand();
  }
  presentRenderLintContinuation(plan);
}
async function runRenderLintInOwnedProcess(projectDir, entryFile, signal) {
  return runRenderSetupWorker(
    "lint",
    { projectDir, entryFile },
    {
      signal,
      maxBufferBytes: 8 * 1024 * 1024
    }
  );
}
function presentRenderLintFindings(lintResult, quiet, lintVerbose) {
  if (quiet) return;
  console.log("");
  for (const line of formatLintStartupMessage(
    lintResult,
    lintVerbose ? { kind: "verbose", options: { errorsFirst: true } } : { kind: "summary" }
  ))
    console.log(line);
}
function presentRenderLintAbort(plan, definitiveEntryMismatch) {
  if (plan.effectiveQuiet) return;
  console.log("");
  console.log(
    c.error(
      definitiveEntryMismatch ? "  Aborting render because the default index.html entry is blank." : `  Aborting render due to lint issues (${plan.strictAll ? "--strict-all" : "--strict"} mode).`
    )
  );
  console.log("");
}
function presentRenderLintContinuation(plan) {
  if (plan.effectiveQuiet) return;
  console.log(c.dim(renderLintContinuationHint(plan.strictErrors)));
  console.log("");
}
async function runResolutionPreflight(plan, checkResolution) {
  if (!plan.outputResolution) return;
  let issue;
  try {
    issue = await checkResolution(readFileSync3(plan.renderTarget, "utf8"), plan.outputResolution, {
      alphaRequested: plan.format === "webm" || plan.format === "mov" || plan.format === "png-sequence",
      hdrRequested: plan.hdrMode === "force-hdr",
      aspectAgnostic: plan.outputResolutionAspectAgnostic
    });
  } catch {
  }
  if (!issue) return;
  trackRenderPreflightRejected({ kind: issue.kind });
  errorBox("Output resolution incompatible", issue.message);
  failCommand();
}
function batchRowRenderOptions(plan, browserPath) {
  const batchQuiet = plan.quiet || plan.batchJson;
  return {
    fps: plan.fps,
    quality: plan.quality,
    authoringSkill: plan.authoringSkill,
    authoringSkillSource: plan.authoringSkillSource,
    authoringSkillInvalid: plan.invalidAuthoringSkill,
    hfEnvOverrides: plan.hfEnvOverrides,
    catalogUsage: plan.catalogUsage,
    format: plan.format,
    gifLoop: plan.gifLoop,
    gifFpsCapped: plan.gifFpsCapped,
    hlsSegmentSeconds: plan.hlsSegmentSeconds,
    workers: plan.workers,
    gpu: plan.useGpu,
    browserGpuMode: plan.browserGpuMode,
    hdrMode: plan.hdrMode,
    crf: plan.crf,
    vp9CpuUsed: plan.vp9CpuUsed,
    videoBitrate: plan.videoBitrate,
    videoFrameFormat: plan.videoFrameFormat,
    quiet: batchQuiet,
    browserPath,
    entryFile: plan.entryFile,
    outputResolution: plan.outputResolution,
    outputResolutionAspectAgnostic: plan.outputResolutionAspectAgnostic,
    outputResolutionRaw: plan.outputResolutionRaw,
    pageNavigationTimeoutMs: plan.pageNavigationTimeoutMs,
    protocolTimeout: plan.protocolTimeout,
    playerReadyTimeout: plan.playerReadyTimeout,
    debug: plan.debug,
    resumeSegments: plan.resumeSegments,
    keepSegments: plan.keepSegments,
    bestEffort: plan.bestEffort,
    exitAfterComplete: false,
    throwOnError: true,
    skipFeedback: true,
    desktopHint: false,
    manageDeParallelRouterBreaker: plan.batchConcurrency <= 1
  };
}
async function executeBatchRender(plan, browserPath, batchModule, preparedBatch, dependencies, cancellation) {
  const batchQuiet = plan.quiet || plan.batchJson;
  const renderOptionsBase = batchRowRenderOptions(plan, browserPath);
  const manifest = await batchModule.runBatchRender({
    prepared: preparedBatch,
    concurrency: plan.batchConcurrency,
    failFast: plan.batchFailFast,
    quiet: batchQuiet,
    json: plan.batchJson,
    renderOne: (row) => {
      assertRenderActive(cancellation);
      const options = { ...renderOptionsBase, variables: row.variables };
      if (plan.useDocker) options.pageSideCompositing = plan.pageSideCompositing;
      const execute = plan.useDocker ? dependencies.renderDocker : dependencies.renderLocal;
      return execute(plan.project.dir, row.outputPath, options, cancellation);
    }
  });
  if (manifest.failed > 0) setCommandExitCode(1);
}

// src/commands/render.ts
import { freemem, tmpdir } from "os";
import { resolve as resolve3, dirname as dirname2, join as join2, basename } from "path";
import { execFileSync as execFileSync2, spawn } from "child_process";

// src/utils/webmAlphaCheck.ts
import { execFileSync } from "child_process";
function webmAlphaAdvisory(format, probe) {
  if (format !== "webm") return void 0;
  if (!probe.probed) return void 0;
  if (!probe.alphaMode) {
    return "The WebM output has no VP9 alpha sidecar (the ALPHA_MODE stream tag is absent), so transparency was flattened to opaque. Your ffmpeg/libvpx-vp9 build cannot emit the alpha plane on this platform. For guaranteed transparency, re-render with --format mov (ProRes 4444).";
  }
  if (probe.sampledAlphaFullyOpaque) {
    return "The WebM declares alpha (ALPHA_MODE=1) but every sampled decoded pixel reads alpha=255. This may be intentional (the composition has no transparent regions in the samples) OR your ffmpeg/libvpx-vp9 build wrote the tag without emitting the alpha side data \u2014 a known Windows-build quirk. To rule it out, re-render with --format mov (ProRes 4444), or with --format png-sequence and encode the frames yourself: ffmpeg -framerate <fps> -i frame_%06d.png -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le out.mov";
  }
  return void 0;
}
function probeWebmAlpha(filePath) {
  try {
    const ffprobePath = findFFprobe();
    if (!ffprobePath) return { probed: false, alphaMode: false };
    const raw = execFileSync(
      ffprobePath,
      [
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=codec_name:stream_tags=alpha_mode",
        "-of",
        "json",
        "--",
        filePath
      ],
      { encoding: "utf-8", timeout: 15e3, windowsHide: true }
    );
    const parsed = JSON.parse(raw);
    const stream = parsed.streams?.[0];
    if (!stream || typeof stream.codec_name !== "string") {
      return { probed: false, alphaMode: false };
    }
    const tags = stream.tags ?? {};
    const alphaMode = Object.entries(tags).some(
      ([k, v]) => k.toLowerCase() === "alpha_mode" && String(v) === "1"
    );
    const probe = { probed: true, alphaMode };
    if (alphaMode) {
      const opaque = sampledAlphaIsFullyOpaque(filePath);
      if (opaque === true) probe.sampledAlphaFullyOpaque = true;
    }
    return probe;
  } catch {
    return { probed: false, alphaMode: false };
  }
}
var BYTES_PER_SAMPLE_FRAME = 8 * 8 * 4;
var MAX_SAMPLE_BYTES = BYTES_PER_SAMPLE_FRAME * 3;
function sampledAlphaIsFullyOpaque(filePath) {
  const ffmpegPath = findFFmpeg();
  if (!ffmpegPath) return void 0;
  try {
    const buf = execFileSync(
      ffmpegPath,
      [
        "-v",
        "error",
        "-c:v",
        "libvpx-vp9",
        "-i",
        filePath,
        "-frames:v",
        "3",
        "-vf",
        "scale=8:8",
        "-pix_fmt",
        "rgba",
        "-f",
        "rawvideo",
        "-"
      ],
      {
        timeout: 3e4,
        maxBuffer: 4096,
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true
      }
    );
    if (buf.length === 0 || buf.length > MAX_SAMPLE_BYTES || buf.length % BYTES_PER_SAMPLE_FRAME !== 0) {
      return void 0;
    }
    for (let i = 3; i < buf.length; i += 4) {
      if (buf[i] !== 255) return false;
    }
    return true;
  } catch {
    return void 0;
  }
}
function warnIfWebmAlphaDropped(outputPath, format, quiet) {
  if (quiet || format !== "webm") return;
  const advisory = webmAlphaAdvisory(format, probeWebmAlpha(outputPath));
  if (!advisory) return;
  console.warn(`
${c.warn("\u26A0")}  ${c.bold("Transparency not preserved")}`);
  console.warn(`   ${c.dim(advisory)}
`);
}

// src/ui/progress.ts
var { stdout } = process;
function renderProgress(percent, stage, row) {
  const width = 25;
  const filled = Math.floor(percent / (100 / width));
  const empty = width - filled;
  const bar = c.progress("\u2588".repeat(filled)) + c.dim("\u2591".repeat(empty));
  const line = `  ${bar}  ${c.bold(String(Math.round(percent)) + "%")}  ${c.dim(stage)}`;
  if (row !== void 0 && stdout.isTTY) {
    stdout.write(`\x1B[${row};1H\x1B[2K${line}`);
  } else if (!stdout.isTTY) {
    stdout.write(`${line}
`);
  } else {
    stdout.write(`\r\x1B[2K${line}`);
  }
}
function renderMachineProgress(percent, stage) {
  if (stdout.isTTY || process.env.HYPERFRAMES_STDOUT_IS_TTY === "1" || !stage) return;
  stdout.write(`@hf-progress ${JSON.stringify({ ...stage, pct: Math.round(percent) })}
`);
}

// src/telemetry/feedback.ts
import * as readline from "readline";
var DEFAULT_FEEDBACK_INTERVAL = 15;
function getFeedbackInterval() {
  const env = process.env.HYPERFRAMES_FEEDBACK_INTERVAL;
  if (env) {
    const n = parseInt(env, 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return DEFAULT_FEEDBACK_INTERVAL;
}
var promptedThisSession = false;
async function maybePromptRenderFeedback(opts) {
  if (promptedThisSession) return;
  if (opts.quiet) return;
  if (!shouldTrack()) return;
  if (process.env.CI) return;
  const config = readConfig();
  config.renderSuccessCount = (config.renderSuccessCount ?? 0) + 1;
  const lastAt = config.lastFeedbackPromptAt ?? 0;
  const isFirstEverRender = lastAt === 0;
  const sinceLastPrompt = config.renderSuccessCount - lastAt;
  if (!isFirstEverRender && sinceLastPrompt < getFeedbackInterval()) {
    writeConfig(config);
    return;
  }
  if (detectAgentRuntime()) {
    promptedThisSession = true;
    config.lastFeedbackPromptAt = config.renderSuccessCount;
    writeConfig(config);
    console.log(
      c.dim("  [hyperframes] ") + c.dim("Agent feedback: ") + c.accent('hyperframes feedback --rating <0-10> --comment "..."')
    );
    return;
  }
  if (!process.stdin.isTTY) {
    writeConfig(config);
    return;
  }
  promptedThisSession = true;
  config.lastFeedbackPromptAt = config.renderSuccessCount;
  writeConfig(config);
  const answer = await askQuestion(
    `  ${c.dim("How likely are you to recommend HyperFrames?")} ${c.accent("[0=not likely 10=extremely likely, enter to skip]")} `
  );
  const rating = parseFeedbackRating(answer);
  if (rating !== null) {
    const details = await askQuestion(`  ${c.dim("Any details?")} ${c.accent("(enter to skip)")} `);
    const trimmedDetails = details.trim();
    trackRenderFeedback({
      rating,
      renderDurationMs: opts.renderDurationMs,
      comment: trimmedDetails || void 0,
      doctorSummary: await getDoctorSummary()
    });
    console.log(c.dim("  Thanks for the feedback!"));
  }
}
async function getDoctorSummary() {
  try {
    const [{ getSystemMeta }, { findFFmpeg: findFFmpeg2 }] = await Promise.all([
      import("./system-OQLOGGPJ.js"),
      import("./ffmpeg-QIUFEFTY.js")
    ]);
    const sys = getSystemMeta();
    const parts = [
      `os=${process.platform}/${process.arch}`,
      `node=${process.version}`,
      `cpu=${sys.cpu_count}cores`,
      `mem=${(sys.memory_total_mb / 1024).toFixed(0)}GB`,
      `ffmpeg=${findFFmpeg2() ? "yes" : "no"}`
    ];
    if (sys.is_docker) parts.push("docker");
    if (sys.is_wsl) parts.push("wsl");
    if (sys.client) parts.push(`client=${sys.client}`);
    return parts.join(" ");
  } catch {
    return "";
  }
}
function askQuestion(prompt) {
  return new Promise((resolve4) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(prompt, (answer) => {
      rl.close();
      resolve4(answer);
    });
    const timeout = setTimeout(() => {
      rl.close();
      resolve4("");
    }, 1e4);
    if (typeof timeout === "object" && timeout !== null && "unref" in timeout) {
      timeout.unref();
    }
  });
}

// src/utils/dockerRunArgs.ts
function resolveDockerPlatform(arch = process.arch, env = process.env) {
  const override = env.HYPERFRAMES_DOCKER_PLATFORM;
  if (override && override.trim() !== "") return override.trim();
  return arch === "arm64" ? "linux/arm64" : "linux/amd64";
}
function buildDockerRunArgs(input) {
  const { imageTag, projectDir, outputDir, outputFilename, options } = input;
  const platform = input.platform ?? resolveDockerPlatform();
  return [
    "run",
    "--rm",
    ...input.hostStdoutIsTty ? ["-e", "HYPERFRAMES_STDOUT_IS_TTY=1"] : [],
    "--platform",
    platform,
    "--shm-size=2g",
    // GPU encoding requires host GPU passthrough.
    ...options.gpu ? ["--gpus", "all"] : [],
    "-v",
    `${projectDir}:/project:ro`,
    "-v",
    `${outputDir}:/output`,
    // Keep debug artifacts on the mounted host output path. The producer roots
    // `.debug` at dirname(PRODUCER_RENDERS_DIR), so `/output/renders` maps to
    // `/output/.debug/<job id>` instead of a disposable container path.
    ...options.debug ? ["-e", "PRODUCER_RENDERS_DIR=/output/renders"] : [],
    imageTag,
    "/project",
    "--output",
    `/output/${outputFilename}`,
    "--fps",
    fpsToFfmpegArg(options.fps),
    "--quality",
    options.quality,
    "--format",
    options.format,
    ...options.gifLoop != null ? ["--gif-loop", String(options.gifLoop)] : [],
    ...options.hlsSegmentSeconds != null ? ["--hls-segment-seconds", String(options.hlsSegmentSeconds)] : [],
    ...options.workers != null ? ["--workers", String(options.workers)] : [],
    ...options.crf != null ? ["--crf", String(options.crf)] : [],
    ...options.vp9CpuUsed != null ? ["--vp9-cpu-used", String(options.vp9CpuUsed)] : [],
    ...options.videoBitrate ? ["--video-bitrate", options.videoBitrate] : [],
    ...options.videoFrameFormat && options.videoFrameFormat !== "auto" ? ["--video-frame-format", options.videoFrameFormat] : [],
    ...options.quiet ? ["--quiet"] : [],
    ...options.debug ? ["--debug"] : [],
    // The in-container CLI is best-effort by default. Only forward the
    // explicit strict opt-in so Docker and local renders cannot drift.
    ...options.bestEffort === false ? ["--no-best-effort"] : [],
    ...options.gpu ? ["--gpu"] : [],
    ...options.browserGpu ? [] : ["--no-browser-gpu"],
    ...options.hdrMode === "force-hdr" ? ["--hdr"] : [],
    ...options.hdrMode === "force-sdr" ? ["--sdr"] : [],
    ...options.variables && Object.keys(options.variables).length > 0 ? ["--variables", JSON.stringify(options.variables)] : [],
    ...options.entryFile ? ["--composition", options.entryFile] : [],
    ...options.outputResolution ? ["--resolution", options.outputResolution] : [],
    ...options.pageSideCompositing === false ? ["--no-page-side-compositing"] : [],
    ...options.experimentalFastCapture ? ["--experimental-fast-capture"] : [],
    ...options.pageNavigationTimeoutMs != null ? ["--browser-timeout", String(options.pageNavigationTimeoutMs / 1e3)] : [],
    ...options.protocolTimeoutMs != null ? ["--protocol-timeout", String(options.protocolTimeoutMs)] : [],
    ...options.playerReadyTimeoutMs != null ? ["--player-ready-timeout", String(options.playerReadyTimeoutMs)] : []
  ];
}

// src/utils/dockerStderrTail.ts
var MAX_TAIL_CHARS = 2e3;
var MAX_LINE_CHARS = 160;
var STACK_FRAME = /^at\s/;
var ERROR_LINE = /error|fail|exception|cannot|not found|denied|killed|no space/i;
function createStderrTail() {
  let buffer = "";
  return {
    push(chunk) {
      buffer = (buffer + chunk).slice(-MAX_TAIL_CHARS);
    },
    tail: () => buffer.trim()
  };
}
function lastErrorLine(tail) {
  const lines = tail.split(/[\r\n]+/).map((line2) => line2.trim()).filter((line2) => line2 && !STACK_FRAME.test(line2));
  const line = [...lines].reverse().find((l) => ERROR_LINE.test(l)) ?? lines.at(-1) ?? "";
  return line.slice(0, MAX_LINE_CHARS);
}
var DockerRenderExitError = class extends Error {
  constructor(exitCode, stderrTail) {
    const last = lastErrorLine(stderrTail);
    super(`Docker render exited with code ${exitCode}${last ? `: ${last}` : ""}`);
    this.name = "DockerRenderExitError";
  }
};

// src/browser/macosOldChromeCrash.ts
var DYLD_SYMBOL_NOT_FOUND = /Symbol not found:/i;
var MACOS_13_ONLY_SYMBOL = /_kVTCompressionPropertyKey_ReferenceBufferCount/;
var VIDEO_TOOLBOX = /VideoToolbox/;
function isMacosOldChromeCrashError(errorMessage) {
  if (!/Failed to launch the browser process/i.test(errorMessage)) return false;
  if (!DYLD_SYMBOL_NOT_FOUND.test(errorMessage)) return false;
  return MACOS_13_ONLY_SYMBOL.test(errorMessage) || VIDEO_TOOLBOX.test(errorMessage);
}
function macosOldChromeCrashRemediation(errorMessage) {
  if (process.platform !== "darwin") return void 0;
  if (!isMacosOldChromeCrashError(errorMessage)) return void 0;
  return [
    "chrome-headless-shell crashed at launch (macOS dyld: Symbol not found in VideoToolbox).",
    "The pinned Chromium build requires macOS 13+. HyperFrames installs Chrome 150 on macOS 12 by",
    "itself, so this crash means a newer browser was supplied. Unset the override, or point it at",
    "an older chrome-headless-shell:",
    "",
    "  npx @puppeteer/browsers install chrome-headless-shell@150",
    '  export HYPERFRAMES_BROWSER_PATH="$HOME/.cache/puppeteer/chrome-headless-shell/mac-150.0.7871.124/chrome-headless-shell-mac-x64/chrome-headless-shell"',
    "",
    "(PRODUCER_HEADLESS_SHELL_PATH works as an alias for the same override.)",
    "Alternatively, point HYPERFRAMES_BROWSER_PATH at your installed Google Chrome",
    '("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome") to fall back to the screenshot',
    "capture path."
  ].join("\n");
}

// src/commands/render.ts
var examples = [
  ["Render to MP4", "hyperframes render --output output.mp4"],
  ["Render a specific composition", "hyperframes render -c compositions/intro.html -o intro.mp4"],
  [
    "Upsample any composition to 4K (supersamples via Chrome DPR)",
    "hyperframes render --resolution 4k --output 4k.mp4"
  ],
  ["Render transparent overlay (ProRes)", "hyperframes render --format mov --output overlay.mov"],
  ["Render transparent WebM overlay", "hyperframes render --format webm --output overlay.webm"],
  [
    "Render animated GIF for PRs/docs",
    "hyperframes render --format gif --fps 15 --gif-loop 0 --output demo.gif"
  ],
  [
    "Render PNG sequence (RGBA frames for AE/Nuke/Fusion)",
    "hyperframes render --format png-sequence --output frames/"
  ],
  [
    "Render HLS VOD (master playlist + MPEG-TS segments in a directory)",
    "hyperframes render --format hls --output stream/"
  ],
  ["High quality at 60fps", "hyperframes render --fps 60 --quality high --output hd.mp4"],
  ["Deterministic render via Docker", "hyperframes render --docker --output deterministic.mp4"],
  ["Parallel rendering with 6 workers", "hyperframes render --workers 6 --output fast.mp4"],
  ["Opt out of browser GPU render", "hyperframes render --no-browser-gpu --output cpu.mp4"],
  [
    "Show full lint findings instead of the summary line",
    "hyperframes render --lint-verbose --output out.mp4"
  ],
  [
    "Relocate frame cache off C: (Windows) or another small partition",
    "hyperframes render --frames-cache-dir D:/hf-cache --output out.mp4"
  ],
  ["HDR output (auto-detected)", "hyperframes render --output hdr-output.mp4"],
  [
    "Override composition variables (parametrized render)",
    `hyperframes render --variables '{"title":"Q4 Report","theme":"dark"}' --output q4.mp4`
  ],
  [
    "Variables from a JSON file",
    "hyperframes render --variables-file ./vars.json --output out.mp4"
  ],
  [
    "Batch render one output per variables row",
    'hyperframes render --batch rows.json --output "renders/{name}.mp4"'
  ]
];
var render_default = defineCommand({
  meta: {
    name: "render",
    description: "Render a composition to MP4, WebM, MOV, GIF, HLS, or a PNG sequence"
  },
  args: {
    dir: {
      type: "positional",
      description: "Project directory",
      required: false
    },
    composition: {
      type: "string",
      alias: "c",
      description: "Render a specific composition file instead of index.html (e.g. compositions/intro.html). Sub-compositions using <template> wrappers must be referenced from index.html via data-composition-src. Pass `.` (or omit the flag) to render the project's index.html."
    },
    output: {
      type: "string",
      alias: "o",
      description: "Output path (default: renders/<name>.mp4)"
    },
    fps: {
      type: "string",
      alias: "f",
      description: "Frame rate. Accepts integer (24, 25, 30, 50, 60, 120, 240) or ffmpeg-style rational (30000/1001 for NTSC 29.97, 24000/1001 for 23.976, 60000/1001 for 59.94). Range 1-240. Defaults to the composition's root data-fps, else 30."
      // No `default` here on purpose: citty would set args.fps="30" on
      // omission, which would make explicitFps always non-null and short-
      // circuit the data-fps resolution below (resolveDefaultFpsArg). The
      // "30" fallback lives at the parseFps(fpsArg ?? "30") call instead.
    },
    quality: {
      type: "string",
      alias: "q",
      description: "Quality: draft, looks, delivery, or standard/high. looks is the default (CRF 16). delivery is high. MOV always uses the fixed alpha-preserving ProRes 4444 profile.",
      default: "looks"
    },
    skill: {
      type: "string",
      description: "Authoring workflow skill that initiated this render (e.g. product-launch-video). Recorded on anonymous render telemetry for per-skill usage breakdowns; ignored unless it is a slug."
    },
    format: {
      type: "string",
      description: "Output format: mp4, webm, mov, gif, png-sequence, hls (MOV/WebM render with transparency; png-sequence writes RGBA frames to a directory for AE/Nuke/Fusion ingest; gif is best at 15fps for PRs/docs; hls writes a VOD playlist directory \u2014 H.264/AAC, SDR only, no GPU encoding)",
      default: "mp4"
    },
    "gif-loop": {
      type: "string",
      description: "GIF loop count, 0 = infinite. Range: 0-65535. Only used with --format gif."
    },
    "hls-segment-seconds": {
      type: "string",
      description: "HLS target segment length in whole seconds (default: 4). Range: 1-60. Also fixes the encoder GOP at segment x fps frames so every segment starts on a keyframe. Only used with --format hls."
    },
    "video-frame-format": {
      type: "string",
      description: "Source video frame extraction format: auto, jpg, png (default: auto). Use png for UI recordings, screen captures, and color-sensitive source videos; alpha-capable sources always extract as PNG.",
      default: "auto"
    },
    workers: {
      type: "string",
      alias: "w",
      description: "Parallel render workers (number or 'auto'). Default: auto. Each worker launches a separate Chrome process (~256 MB RAM)."
    },
    docker: {
      type: "boolean",
      description: "Use Docker for deterministic render",
      default: false
    },
    hdr: {
      type: "boolean",
      description: "Force HDR output even if no HDR sources are detected",
      default: false
    },
    sdr: {
      type: "boolean",
      description: "Force SDR output even if HDR sources are detected",
      default: false
    },
    crf: {
      type: "string",
      description: "Override MP4/WebM encoder CRF. Mutually exclusive with --video-bitrate; unsupported for MOV."
    },
    "video-bitrate": {
      type: "string",
      description: "Target MP4/WebM video bitrate such as 10M. Mutually exclusive with --crf; unsupported for MOV."
    },
    "vp9-cpu-used": {
      type: "string",
      description: "libvpx-vp9 -cpu-used value for WebM encodes (-8 to 8). Higher is faster with a larger quality/size tradeoff. Env: PRODUCER_VP9_CPU_USED."
    },
    gpu: { type: "boolean", description: "Use GPU encoding", default: false },
    "browser-gpu": {
      type: "boolean",
      description: "Force host GPU acceleration for Chrome/WebGL capture. Default: auto (probe on first launch; fall back to software if no GPU). Use --no-browser-gpu to force software (SwiftShader)."
    },
    quiet: {
      type: "boolean",
      description: "Suppress verbose output",
      default: false
    },
    "lint-verbose": {
      type: "boolean",
      description: "Show full lint findings instead of the summary line",
      default: false
    },
    debug: {
      type: "boolean",
      description: "Write full render diagnostics and keep intermediate artifacts under the producer .debug directory.",
      default: false
    },
    "best-effort": {
      type: "boolean",
      description: "Allow output with structured capture-readiness warnings (default). Use --no-best-effort to fail on missing or unready media.",
      default: true
    },
    strict: {
      type: "boolean",
      description: "Fail render on lint errors",
      default: false
    },
    "strict-all": {
      type: "boolean",
      description: "Fail render on lint errors AND warnings",
      default: false
    },
    "max-concurrent-renders": {
      type: "string",
      description: "Max concurrent renders when using the producer server (1-10). Default: 2."
    },
    variables: {
      type: "string",
      description: `JSON object of variable values, merged over the composition's data-composition-variables defaults. Example: --variables '{"title":"Hello"}'. Read inside the composition via window.__hyperframes.getVariables().`
    },
    "variables-file": {
      type: "string",
      description: "Path to a JSON file with variable values (alternative to --variables). The file must contain a single JSON object."
    },
    "strict-variables": {
      type: "boolean",
      description: "Fail render if any --variables key is undeclared or has a wrong type vs the composition's data-composition-variables. Without this flag, mismatches are warnings.",
      default: false
    },
    batch: {
      type: "string",
      description: 'Path to a JSON array of variable rows (or {"rows":[...]}). Renders one output per row.'
    },
    "batch-concurrency": {
      type: "string",
      description: "Maximum number of batch rows to render at once. Default: 1, because each render already parallelizes across workers."
    },
    "batch-fail-fast": {
      type: "boolean",
      description: "Stop launching new batch rows after the first row failure.",
      default: false
    },
    json: {
      type: "boolean",
      description: "With --batch, emit exactly one final JSON result document.",
      default: false
    },
    resolution: {
      type: "string",
      description: "Output resolution preset: landscape (1920x1080), portrait (1080x1920), landscape-4k (3840x2160), portrait-4k (2160x3840), square (1080x1080), square-4k (2160x2160). Aliases: 1080p, 4k, uhd, 1080p-square, square-1080p, 4k-square. The composition is unchanged \u2014 Chrome renders at higher DPR (deviceScaleFactor) so the captured screenshot lands at the requested dimensions. Aspect ratio must match the composition; the scale must be an integer multiple. Not yet supported with --hdr."
    },
    "page-side-compositing": {
      type: "boolean",
      description: "Run shader transitions on a page-side WebGL canvas inside Chrome instead of the Node-side layered blend. ~6\xD7 faster for SDR shader-transition renders. Used for mp4, hls and gif output without HDR content; for mp4 and hls it usually turns off under --experimental-fast-capture. webm and mov output take the layered path. --no-page-side-compositing forces the layered path for mp4 and hls; gif always uses the page-side canvas.",
      default: true
    },
    "browser-timeout": {
      type: "string",
      description: "Puppeteer page-navigation timeout in SECONDS for the entry HTML. Increase when heavy compositions (many videos / fonts / asset requests) cannot reach domcontentloaded within the 60s default (see issue #1199). Accepts 0.001-86400 (24h cap). Note: this controls page.goto only \u2014 very heavy compositions may also need PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS / PRODUCER_PLAYER_READY_TIMEOUT_MS bumped (the post-goto window.__hf readiness poll has its own 45s budget). Env fallback: PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS (MILLISECONDS)."
    },
    "protocol-timeout": {
      type: "string",
      description: "CDP protocol timeout in ms. Increase on slow/low-memory machines where Chrome operations time out. Default: 300000 (5 min). Env: PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS."
    },
    "player-ready-timeout": {
      type: "string",
      description: "Timeout in ms for the composition player to become ready. Increase for complex compositions on slow hardware. Default: 45000 (45 s). Env: PRODUCER_PLAYER_READY_TIMEOUT_MS."
    },
    resume: {
      type: "boolean",
      description: "Segmented capture only (HF_SEGMENTED_CAPTURE=true): reuse segments a previous run of the same composition and settings already finished, recorded in renders/.hf-segments/<hash>/segments.json. Each reused segment is re-validated before it is skipped.",
      default: false
    },
    "keep-segments": {
      type: "boolean",
      description: "Segmented capture only: keep renders/.hf-segments/<hash> after a successful render instead of deleting it.",
      default: false
    },
    "low-memory-mode": {
      type: "boolean",
      description: "Force the low-memory safe render profile on (--low-memory-mode) or off (--no-low-memory-mode). Safe mode pins to 1 worker, uses screenshot capture, and skips auto-worker calibration to avoid memory thrash on constrained machines. Default: auto-detected from total RAM (<= 8 GB). Env: PRODUCER_LOW_MEMORY_MODE."
    },
    "experimental-fast-capture": {
      type: "boolean",
      description: "Capture frames via Chrome's drawElementImage API instead of Page.captureScreenshot \u2014 reads DOM paint records directly, ~2x faster. Default: on where it can engage (macOS + hardware-GPU browser); incompatible compositions and self-verification failures fall back to screenshot capture automatically. Pass =false to disable. Env: PRODUCER_EXPERIMENTAL_FAST_CAPTURE."
      // No `default` — an omitted flag must stay `undefined` so the `!= null`
      // guard below leaves PRODUCER_EXPERIMENTAL_FAST_CAPTURE untouched and the
      // env fallback survives (matches the --low-memory-mode idiom).
    },
    "frames-cache-dir": {
      type: "string",
      description: `Directory for the content-addressed extracted-frame cache. Use to relocate the cache off the system drive when the OS temp directory lives on a small partition (e.g. Windows C: exhaustion during long renders). Pass ${EXTRACT_CACHE_DIR_DISABLED_ALIASES.map((a) => `"${a}"`).join(" / ")} to disable caching entirely (frames extract into the render's workDir and are cleaned up when the render ends). Default: <tmpdir>/hyperframes-extract-cache-<uid>. Env: HYPERFRAMES_EXTRACT_CACHE_DIR.`
    }
  },
  // Keep the transport adapter thin: each phase has one ownership boundary.
  async run({ args }) {
    const plan = createRenderPlan(args);
    const cancellation = plan.useDocker ? void 0 : createRenderCancellationScope();
    try {
      seedProjectAuthoringSkill(plan.project.dir, args.skill);
      await presentRenderPlan(plan);
      await executeRenderPlan(
        plan,
        {
          renderDocker,
          renderLocal,
          checkResolution: checkRenderResolutionPreflight
        },
        cancellation
      );
    } catch (error) {
      if (cancellation?.signal.aborted) {
        const reason = cancellation.signal.reason;
        const message = reason instanceof Error ? reason.message : String(reason);
        process.stderr.write(`Render cancelled: ${message}
`);
        requestCliExit(1);
      }
      throw error;
    } finally {
      cancellation?.dispose();
    }
  }
});
async function readCompositionDimensions(compositionHtml) {
  try {
    const { ensureDOMParser } = await import("./dom-IROKGVJI.js");
    ensureDOMParser();
    const doc = new DOMParser().parseFromString(compositionHtml, "text/html");
    const rootEl = doc.querySelector("[data-composition-id]");
    const width = parseInt(rootEl?.getAttribute("data-width") ?? "", 10);
    const height = parseInt(rootEl?.getAttribute("data-height") ?? "", 10);
    if (width > 0 && height > 0) return { width, height };
  } catch {
  }
  return void 0;
}
async function checkRenderResolutionPreflight(compositionHtml, outputResolution, modes) {
  if (!outputResolution) return void 0;
  const dims = await readCompositionDimensions(compositionHtml);
  if (!dims) return void 0;
  const effective = modes.aspectAgnostic === true ? suggestMatchingPreset(dims.width, dims.height, outputResolution) ?? outputResolution : outputResolution;
  const compat = checkOutputResolutionCompatibility({
    compositionWidth: dims.width,
    compositionHeight: dims.height,
    outputResolution: effective,
    alphaRequested: modes.alphaRequested,
    hdrRequested: modes.hdrRequested
  });
  if (compat.ok || !compat.message || !compat.kind) return void 0;
  return { message: compat.message, kind: compat.kind };
}
var DOCKER_IMAGE_PREFIX = "hyperframes-renderer";
function dockerImageTag(version) {
  return `${DOCKER_IMAGE_PREFIX}:${version}`;
}
function resolveDockerfilePath() {
  const builtPath = resolve3(__dirname, "docker", "Dockerfile.render");
  const devPath = resolve3(__dirname, "..", "src", "docker", "Dockerfile.render");
  for (const p of [builtPath, devPath]) {
    try {
      statSync2(p);
      return p;
    } catch {
      continue;
    }
  }
  throw new Error("Dockerfile.render not found \u2014 CLI package may be corrupted");
}
function dockerImageExists(tag) {
  try {
    execFileSync2("docker", ["image", "inspect", tag], { stdio: "pipe", timeout: 1e4 });
    return true;
  } catch {
    return false;
  }
}
function dockerImageTagForPlatform(version, platform) {
  const archSuffix = platform === "linux/arm64" ? "-arm64" : "";
  return `${dockerImageTag(version)}${archSuffix}`;
}
function ensureDockerImage(version, platform, quiet) {
  const tag = dockerImageTagForPlatform(version, platform);
  if (dockerImageExists(tag)) {
    if (!quiet) console.log(c.dim(`  Docker image: ${tag} (cached)`));
    return tag;
  }
  if (!quiet) console.log(c.dim(`  Building Docker image: ${tag} (${platform})...`));
  const dockerfilePath = resolveDockerfilePath();
  const tmpDir = mkdtempSync(join2(tmpdir(), "hyperframes-docker-"));
  writeFileSync(join2(tmpDir, "Dockerfile"), readFileSync4(dockerfilePath));
  const targetArch = platform === "linux/arm64" ? "arm64" : "amd64";
  try {
    execFileSync2(
      "docker",
      [
        "build",
        "--platform",
        platform,
        "--build-arg",
        `HYPERFRAMES_VERSION=${version}`,
        "--build-arg",
        `TARGETARCH=${targetArch}`,
        "-t",
        tag,
        tmpDir
      ],
      { stdio: quiet ? "pipe" : "inherit", timeout: 6e5 }
    );
  } catch (error) {
    const message = normalizeErrorMessage(error);
    throw new Error(`Failed to build Docker image: ${message}`);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
  if (!quiet) console.log(c.dim(`  Docker image: ${tag} (built)`));
  return tag;
}
function resolveDockerHostPlatform(options) {
  const platform = resolveDockerPlatform();
  if (options.gpu && platform === "linux/arm64") {
    errorBox(
      "--gpu is not supported with --docker on arm64 hosts",
      "Docker Desktop/colima on Apple Silicon doesn't expose --gpus host passthrough to linux/arm64 containers.",
      "Drop --gpu, or run a native (non-Docker) render on this host, or set HYPERFRAMES_DOCKER_PLATFORM=linux/amd64 if you need GPU encoding (slow under qemu but works)."
    );
    failCommand();
  }
  if (!options.quiet && platform === "linux/arm64") {
    console.log(
      c.dim(
        "  Host is arm64 \u2014 using linux/arm64 image with Playwright's chrome-headless-shell (output won't be byte-identical to amd64 renders; set HYPERFRAMES_DOCKER_PLATFORM=linux/amd64 to force parity)."
      )
    );
  }
  return platform;
}
async function renderDocker(projectDir, outputPath, options) {
  const startTime = Date.now();
  const dockerVersion = isDevMode() ? "latest" : VERSION;
  if (!options.quiet && isDevMode()) {
    console.log(c.dim("  Dev mode: using hyperframes@latest in Docker image"));
  }
  const platform = resolveDockerHostPlatform(options);
  let imageTag;
  try {
    imageTag = ensureDockerImage(dockerVersion, platform, options.quiet);
  } catch (error) {
    const message = normalizeErrorMessage(error);
    const isDockerMissing = /connect|not found|ENOENT/i.test(message);
    errorBox(
      isDockerMissing ? "Docker not available" : "Docker image build failed",
      message,
      isDockerMissing ? "Install Docker: https://docs.docker.com/get-docker/" : "Check Docker is running: docker info"
    );
    failCommand();
  }
  const outputDir = dirname2(outputPath);
  const outputFilename = basename(outputPath);
  const dockerArgs = buildDockerRunArgs({
    imageTag,
    projectDir: resolve3(projectDir),
    outputDir: resolve3(outputDir),
    outputFilename,
    platform,
    hostStdoutIsTty: process.stdout.isTTY === true,
    options: {
      fps: options.fps,
      quality: options.quality,
      format: options.format,
      gifLoop: options.gifLoop,
      hlsSegmentSeconds: options.hlsSegmentSeconds,
      workers: options.workers,
      gpu: options.gpu,
      browserGpu: options.browserGpuMode === "hardware",
      hdrMode: options.hdrMode,
      crf: options.crf,
      vp9CpuUsed: options.vp9CpuUsed,
      videoBitrate: options.videoBitrate,
      videoFrameFormat: options.videoFrameFormat,
      quiet: options.quiet,
      variables: options.variables,
      entryFile: options.entryFile,
      outputResolution: options.outputResolutionRaw ?? options.outputResolution,
      pageSideCompositing: options.pageSideCompositing,
      debug: options.debug,
      bestEffort: options.bestEffort,
      experimentalFastCapture: options.experimentalFastCapture,
      pageNavigationTimeoutMs: options.pageNavigationTimeoutMs,
      protocolTimeoutMs: options.protocolTimeout,
      playerReadyTimeoutMs: options.playerReadyTimeout
    }
  });
  if (!options.quiet) {
    console.log(c.dim("  Running render in Docker container..."));
    console.log("");
  }
  try {
    await new Promise((resolvePromise, reject) => {
      const stderrTail = createStderrTail();
      const child = spawn("docker", dockerArgs, {
        stdio: options.quiet ? ["pipe", "pipe", "pipe"] : ["inherit", "inherit", "pipe"]
      });
      child.stderr?.on("data", (chunk) => {
        process.stderr.write(chunk);
        stderrTail.push(chunk.toString());
      });
      child.on("close", (code) => {
        if (code === 0) resolvePromise();
        else reject(new DockerRenderExitError(code, stderrTail.tail()));
      });
      child.on("error", (err) => reject(err));
    });
  } catch (error) {
    handleRenderError(error, options, startTime, true, "Check Docker is running: docker info");
  }
  const elapsed = Date.now() - startTime;
  markRenderSucceeded();
  runPostRenderStep(
    "trackRenderComplete",
    () => trackRenderComplete({
      durationMs: elapsed,
      fps: fpsToNumber(options.fps),
      quality: options.quality,
      workers: options.workers,
      docker: true,
      gpu: options.gpu,
      authoringSkill: options.authoringSkill,
      authoringSkillSource: options.authoringSkillSource,
      authoringSkillInvalid: options.authoringSkillInvalid,
      hfEnvOverrides: options.hfEnvOverrides,
      catalogUsage: options.catalogUsage,
      ...renderOutputShapeTelemetryPayload(options),
      ...renderEnvironmentTelemetryPayload(options),
      ...getMemorySnapshot()
    })
  );
  runPostRenderStep(
    "printRenderComplete",
    () => printRenderComplete({
      outputPath,
      projectDir,
      desktopHint: wantsDesktopHint(options),
      elapsedMs: elapsed,
      quiet: options.quiet,
      format: options.format
    })
  );
  runPostRenderStep(
    "warnIfWebmAlphaDropped",
    () => warnIfWebmAlphaDropped(outputPath, options.format, options.quiet)
  );
  if (options.exitAfterComplete) scheduleRenderProcessExit();
  return { renderTimeMs: elapsed };
}
async function renderLocal(projectDir, outputPath, options, commandCancellation) {
  const cancellation = commandCancellation ?? createRenderCancellationScope();
  try {
    return await executeLocalRender(projectDir, outputPath, options, cancellation);
  } finally {
    if (!commandCancellation) cancellation.dispose();
  }
}
async function executeLocalRender(projectDir, outputPath, options, cancellation) {
  cancellation.checkAncestors();
  cancellation.signal.throwIfAborted();
  let recoveredOrphanTrees = 0;
  try {
    recoveredOrphanTrees = await killOrphanedProcessesForRender(cancellation.signal);
  } catch {
    if (cancellation.signal.aborted) cancellation.signal.throwIfAborted();
  }
  cancellation.checkAncestors();
  cancellation.signal.throwIfAborted();
  if (recoveredOrphanTrees > 0 && !options.quiet) {
    console.warn(
      c.warn(
        `  Recovered ${recoveredOrphanTrees} orphaned browser process ${recoveredOrphanTrees === 1 ? "tree" : "trees"} from an interrupted render.`
      )
    );
  }
  const preflight = await runEnvironmentChecks({
    projectDir,
    diskPaths: [tmpdir(), dirname2(outputPath)],
    browserPath: options.browserPath,
    includeBrowser: true,
    includeDisk: true,
    includeWindowsUnc: true,
    signal: cancellation.signal
  });
  options = {
    ...options,
    ffmpegVersionMajor: preflight.ffmpegVersionMajor,
    browserVersionMajor: preflight.browserVersionMajor,
    browserInstall: preflight.browserInstall
  };
  cancellation.checkAncestors();
  cancellation.signal.throwIfAborted();
  const failedChecks = preflight.outcomes.filter((outcome2) => !outcome2.ok);
  if (failedChecks.length > 0) {
    for (const check of failedChecks) {
      errorBox(check.title ?? `${check.name} check failed`, check.detail, check.hint);
    }
    failCommand();
  }
  if (!options.quiet) {
    for (const outcome2 of preflight.outcomes) {
      if (outcome2.level === "warn") {
        console.warn(c.warn(`  ${outcome2.name}: ${outcome2.detail}`));
        if (outcome2.hint) console.warn(c.dim(`  ${outcome2.hint}`));
      }
    }
  }
  if (preflight.ffmpegPath) process.env.HYPERFRAMES_FFMPEG_PATH = preflight.ffmpegPath;
  if (preflight.ffprobePath) process.env.HYPERFRAMES_FFPROBE_PATH = preflight.ffprobePath;
  if (preflight.browser?.executablePath && !process.env.PRODUCER_HEADLESS_SHELL_PATH) {
    process.env.PRODUCER_HEADLESS_SHELL_PATH = preflight.browser.executablePath;
  }
  const isHls = options.format === "hls";
  if (!options.gpu && (options.format === "mp4" || isHls) && preflight.ffmpegPath) {
    let encoderMode = "software";
    try {
      encoderMode = await detectH264EncoderModeForRender(
        preflight.ffmpegPath,
        false,
        cancellation.signal
      );
    } catch (error) {
      if (cancellation.signal.aborted) cancellation.signal.throwIfAborted();
      if (error instanceof H264EncoderUnavailableError && (options.hdrMode === "force-sdr" || isHls)) {
        errorBox(
          `${isHls ? "HLS" : "MP4"} H.264 encoder unavailable`,
          error.message,
          `Install an FFmpeg build with libx264 support (${getFFmpegInstallHint()})` + (isHls ? "." : ", or render WebM instead: hyperframes render --format webm --output output.webm")
        );
        failCommand();
      }
      if (!options.quiet) {
        const detail = error instanceof Error ? error.message : String(error);
        console.warn(c.warn(`  Unable to probe H.264 encoder capabilities: ${detail}`));
      }
    }
    if (encoderMode === "gpu" && isHls) {
      errorBox(
        "HLS H.264 encoder unavailable",
        "FFmpeg does not include libx264, and HLS cannot fall back to VideoToolbox: fixed-length segments require the software encoder's forced-keyframe lock.",
        `Install an FFmpeg build with libx264 support (${getFFmpegInstallHint()}).`
      );
      failCommand();
    }
    if (encoderMode === "gpu") {
      console.warn(
        c.warn("  FFmpeg does not include libx264; falling back to VideoToolbox H.264 encoding.")
      );
      options = { ...options, gpu: true };
    }
  }
  cancellation.checkAncestors();
  cancellation.signal.throwIfAborted();
  const producer = await loadProducer();
  const deParallelRouterActive = options.manageDeParallelRouterBreaker === true ? applyDeParallelRouterCircuitBreaker(options.quiet) : (
    // Not managing the breaker: the router still runs (producer default),
    // we just don't enforce or record the per-install trip.
    false
  );
  const startTime = Date.now();
  const logger = createRenderTelemetryLogger(
    producer.createConsoleLogger?.(options.debug ? "debug" : options.quiet ? "warn" : "info") ?? createNoopProducerLogger()
  );
  const engineConfig = producer.resolveConfig({
    browserGpuMode: options.browserGpuMode ?? "software",
    // Local auto opts out of the software-GPU screenshot clamp. Docker and
    // --no-browser-gpu request software; --resolution supersamples via screenshot.
    ...options.browserGpuMode === "auto" && options.outputResolution == null && process.env.PRODUCER_FORCE_SCREENSHOT !== "true" ? { forceScreenshot: false } : {},
    ...options.pageNavigationTimeoutMs != null ? { pageNavigationTimeout: options.pageNavigationTimeoutMs } : {},
    ...options.protocolTimeout != null && { protocolTimeout: options.protocolTimeout },
    ...options.playerReadyTimeout != null && { playerReadyTimeout: options.playerReadyTimeout },
    ...options.vp9CpuUsed != null ? { vp9CpuUsed: options.vp9CpuUsed } : {}
  });
  const request = producer.createRenderRequest({
    projectDir,
    outputPath,
    engineConfig,
    options: {
      fps: options.fps,
      quality: options.quality,
      format: options.format,
      gifLoop: options.gifLoop,
      hlsSegmentSeconds: options.hlsSegmentSeconds,
      workers: options.workers,
      useGpu: options.gpu,
      hdrMode: options.hdrMode,
      crf: options.crf,
      videoBitrate: options.videoBitrate,
      videoFrameFormat: options.videoFrameFormat,
      variables: options.variables,
      entryFile: options.entryFile,
      outputResolution: options.outputResolution,
      outputResolutionAspectAgnostic: options.outputResolutionAspectAgnostic,
      debug: options.debug,
      resumeSegments: options.resumeSegments,
      keepSegments: options.keepSegments,
      strictness: options.bestEffort === false ? "strict" : "best-effort"
    }
  });
  const job = producer.createRenderJob(producer.renderConfigFromRequest(request, { logger }));
  const onProgress = options.quiet ? void 0 : (progressJob, message) => {
    renderProgress(progressJob.progress, message);
    renderMachineProgress(progressJob.progress, progressJob.stageProgress);
  };
  try {
    cancellation.checkAncestors();
    await producer.executeRenderJob(
      job,
      projectDir,
      outputPath,
      onProgress,
      cancellation.signal,
      cancellation.checkAncestors
    );
  } catch (error) {
    maybeConsumeDeParallelRouterTrial(deParallelRouterActive, job, options.quiet);
    const inContainer = process.env.CONTAINER === "true";
    handleRenderError(
      error,
      options,
      startTime,
      false,
      inContainer ? "" : "Try --docker for containerized rendering",
      job.failedStage,
      job
    );
  }
  markRenderSucceeded();
  maybeConsumeDeParallelRouterTrial(deParallelRouterActive, job, options.quiet);
  const elapsed = Date.now() - startTime;
  if (job.outcome === "completed_with_warnings") {
    for (const warning of job.warnings) {
      console.warn(c.warn(`  [${warning.code}] ${warning.message}`));
    }
  }
  runPostRenderStep("trackRenderMetrics", () => trackRenderMetrics(job, elapsed, options, false));
  runPostRenderStep(
    "printRenderComplete",
    () => printRenderComplete({
      outputPath,
      projectDir,
      desktopHint: wantsDesktopHint(options),
      elapsedMs: elapsed,
      quiet: options.quiet,
      format: options.format,
      perf: job.perfSummary,
      requestedGpuMode: options.browserGpuMode
    })
  );
  runPostRenderStep(
    "warnIfWebmAlphaDropped",
    () => warnIfWebmAlphaDropped(outputPath, options.format, options.quiet)
  );
  if (!options.skipFeedback) {
    await runPostRenderStepAsync(
      "maybePromptRenderFeedback",
      () => maybePromptRenderFeedback({
        renderDurationMs: elapsed,
        quiet: options.quiet
      })
    );
  }
  if (options.exitAfterComplete) scheduleRenderProcessExit();
  const durationMs = job.perfSummary ? Math.round(job.perfSummary.compositionDurationSeconds * 1e3) : void 0;
  const outcome = job.outcome === "completed_with_warnings" ? "completed_with_warnings" : "completed";
  return {
    renderTimeMs: elapsed,
    durationMs,
    outcome,
    warnings: job.warnings.map((warning) => ({ code: warning.code, message: warning.message }))
  };
}
function isUnrefableTimer(timer) {
  return typeof timer === "object" && timer !== null && "unref" in timer && typeof timer.unref === "function";
}
function scheduleRenderProcessExit() {
  const timer = setTimeout(() => requestCliExit(0), 100);
  if (isUnrefableTimer(timer)) timer.unref();
}
function getMemorySnapshot() {
  return {
    peakMemoryMb: bytesToMb(process.memoryUsage.rss()),
    memoryFreeMb: bytesToMb(freemem())
  };
}
function renderOutputShapeTelemetryPayload(options) {
  return {
    outputResolutionPreset: options.outputResolution,
    outputFormat: options.format,
    hdrMode: options.hdrMode,
    videoFrameFormat: options.videoFrameFormat,
    gifFpsCapped: options.gifFpsCapped
  };
}
function renderEnvironmentTelemetryPayload(options) {
  return {
    ffmpegVersionMajor: options.ffmpegVersionMajor,
    browserVersionMajor: options.browserVersionMajor,
    browserInstall: options.browserInstall
  };
}
function metaString(meta, key) {
  const value = meta?.[key];
  return typeof value === "string" ? value : void 0;
}
function metaNumber(meta, key) {
  const value = meta?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function metaBoolean(meta, key) {
  const value = meta?.[key];
  return typeof value === "boolean" ? value : void 0;
}
function trackRenderTraceFromLog(message, meta) {
  if (message !== "[Render:trace]") return;
  const status = metaString(meta, "status");
  if (status !== "start" && status !== "end" && status !== "checkpoint" && status !== "error") {
    return;
  }
  trackRenderObservation({
    source: "cli",
    renderJobId: metaString(meta, "renderJobId"),
    phase: metaString(meta, "phase"),
    status,
    compositionHash: metaString(meta, "compositionHash"),
    elapsedMs: metaNumber(meta, "elapsedMs"),
    durationMs: metaNumber(meta, "durationMs"),
    message: metaString(meta, "message"),
    workerCount: metaNumber(meta, "workerCount"),
    forceScreenshot: metaBoolean(meta, "forceScreenshot"),
    useStreamingEncode: metaBoolean(meta, "useStreamingEncode"),
    useLayeredComposite: metaBoolean(meta, "useLayeredComposite"),
    usePageSideCompositing: metaBoolean(meta, "usePageSideCompositing"),
    hasHdrContent: metaBoolean(meta, "hasHdrContent"),
    captureMode: metaString(meta, "captureMode"),
    captureOperation: metaString(meta, "captureOperation"),
    framesCompleted: metaNumber(meta, "framesCompleted"),
    totalFrames: metaNumber(meta, "totalFrames"),
    heartbeatIndex: metaNumber(meta, "heartbeatIndex"),
    stageElapsedMs: metaNumber(meta, "stageElapsedMs"),
    videoCount: metaNumber(meta, "videoCount"),
    extractedVideoCount: metaNumber(meta, "extractedVideoCount"),
    totalFramesExtracted: metaNumber(meta, "totalFramesExtracted"),
    maxFramesPerVideo: metaNumber(meta, "maxFramesPerVideo"),
    avgFramesPerExtractedVideo: metaNumber(meta, "avgFramesPerExtractedVideo"),
    vfrPreflightCount: metaNumber(meta, "vfrPreflightCount"),
    vfrPreflightMs: metaNumber(meta, "vfrPreflightMs"),
    cacheHits: metaNumber(meta, "cacheHits"),
    cacheMisses: metaNumber(meta, "cacheMisses")
  });
}
function createRenderTelemetryLogger(base) {
  return {
    error(message, meta) {
      base.error(message, meta);
      trackRenderTraceFromLog(message, meta);
    },
    warn(message, meta) {
      base.warn(message, meta);
      trackRenderTraceFromLog(message, meta);
    },
    info(message, meta) {
      base.info(message, meta);
      trackRenderTraceFromLog(message, meta);
    },
    debug(message, meta) {
      base.debug(message, meta);
      trackRenderTraceFromLog(message, meta);
    },
    isLevelEnabled(level) {
      return base.isLevelEnabled?.(level) ?? true;
    }
  };
}
function createNoopProducerLogger() {
  return {
    error() {
    },
    warn() {
    },
    info() {
    },
    debug() {
    },
    isLevelEnabled() {
      return true;
    }
  };
}
var deParallelRouterUserManaged = false;
var deParallelRouterUserManagedResolved = false;
var deParallelRouterBreakerTrippedThisProcess = false;
function __resetDeParallelRouterTrialStateForTests() {
  deParallelRouterBreakerTrippedThisProcess = false;
  deParallelRouterUserManaged = false;
  deParallelRouterUserManagedResolved = false;
}
function hasDeParallelRouterBreakerTripped(config) {
  return deParallelRouterBreakerTrippedThisProcess || Boolean(config.deParallelRouterTrialFired);
}
function userValueEnablesDeParallelRouter() {
  const raw = process.env.HF_DE_PARALLEL_ROUTER?.trim().toLowerCase();
  if (raw === void 0 || raw === "") return true;
  return !(raw === "false" || raw === "0" || raw === "off" || raw === "no");
}
function applyDeParallelRouterBreaker() {
  if (deParallelRouterUserManaged) return;
  process.env.HF_DE_PARALLEL_ROUTER = "false";
}
function applyDeParallelRouterCircuitBreaker(quiet) {
  if (!deParallelRouterUserManagedResolved) {
    deParallelRouterUserManaged = (process.env.HF_DE_PARALLEL_ROUTER ?? "").trim() !== "";
    deParallelRouterUserManagedResolved = true;
  }
  if (deParallelRouterUserManaged) {
    return userValueEnablesDeParallelRouter();
  }
  if (deParallelRouterBreakerTrippedThisProcess) {
    applyDeParallelRouterBreaker();
    return false;
  }
  if (hasDeParallelRouterBreakerTripped(readConfigFresh())) {
    deParallelRouterBreakerTrippedThisProcess = true;
    applyDeParallelRouterBreaker();
    if (!quiet) {
      console.log(
        c.dim(
          "  Parallel drawElement capture stays off for this install (a previous render had to fall back). Re-enable with HF_DE_PARALLEL_ROUTER=true."
        )
      );
    }
    return false;
  }
  return true;
}
function resolveDeParallelRouterOutcome(job) {
  const outcome = job.perfSummary?.drawElement?.parallelRouter ?? job.errorDetails?.observability?.capture.deParallelRouter;
  return outcome === "none" ? void 0 : outcome;
}
function persistDeParallelRouterTrialFired() {
  const MAX_ATTEMPTS = 3;
  let mirrored = false;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const config = readConfigFresh();
    if (config.deParallelRouterTrialFired && mirrored) return true;
    config.deParallelRouterTrialFired = true;
    const result = writeConfigWithResult(config);
    if (!result.ok) return false;
    mirrored = result.mirrored !== false;
    if (mirrored) return true;
  }
  return false;
}
function maybeConsumeDeParallelRouterTrial(routerActive, job, quiet) {
  if (!routerActive) return;
  const outcome = resolveDeParallelRouterOutcome(job);
  if (outcome === void 0) return;
  const config = readConfigFresh();
  const renderCount = (config.deParallelRouterTrialRenderCount ?? 0) + 1;
  config.deParallelRouterTrialRenderCount = renderCount;
  const fired = outcome !== "routed";
  if (fired) {
    config.deParallelRouterTrialFired = true;
    deParallelRouterBreakerTrippedThisProcess = true;
    applyDeParallelRouterBreaker();
  }
  writeConfig(config);
  if (fired && !deParallelRouterUserManaged) reportDeParallelRouterBreakerTrip(quiet);
}
function reportDeParallelRouterBreakerTrip(quiet) {
  const persisted = persistDeParallelRouterTrialFired();
  if (quiet) return;
  console.log(
    c.dim(
      "  A frame failed verification, so parallel drawElement capture fell back to the screenshot path and is now off for this install. Re-enable: HF_DE_PARALLEL_ROUTER=true"
    )
  );
  if (persisted) return;
  console.warn(
    c.warn(
      "  Could not persist the parallel drawElement circuit breaker to ~/.hyperframes/config.json (unwritable?). It stays off for this process; future runs may retry it. Set HF_DE_PARALLEL_ROUTER=false to opt out for good."
    )
  );
}
var KNOWN_STAGE_CODES = {
  Queued: "queued",
  "Compiling composition": "compiling_composition",
  "Extracting video frames": "extracting_video_frames",
  "Processing audio tracks": "processing_audio_tracks",
  "Starting frame capture": "starting_frame_capture",
  "Render complete": "render_complete",
  "Render cancelled": "render_cancelled",
  pipeline: "pipeline",
  "Starting browsers": "starting_browsers",
  // Was "Encoding video" before encode reported frames; keeps the same bucket.
  "Encoding frame": "encoding_video"
};
var STAGE_COUNTS = /\([^)]*\)|\d+\/\d+/g;
function normalizeStageCode(stage) {
  const base = stage.replace(STAGE_COUNTS, "").trim();
  const known = KNOWN_STAGE_CODES[base];
  if (known) return known;
  const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return slug || "unknown";
}
function handleRenderError(error, options, startTime, docker, hint, failedStage, job) {
  const message = normalizeErrorMessage(error);
  trackRenderError({
    fps: fpsToNumber(options.fps),
    quality: options.quality,
    docker,
    workers: options.workers,
    gpu: options.gpu,
    authoringSkill: options.authoringSkill,
    authoringSkillSource: options.authoringSkillSource,
    authoringSkillInvalid: options.authoringSkillInvalid,
    hfEnvOverrides: options.hfEnvOverrides,
    elapsedMs: Date.now() - startTime,
    errorMessage: message,
    failedStage,
    ...renderOutputShapeTelemetryPayload(options),
    ...renderEnvironmentTelemetryPayload(options),
    // A bucketable failure taxonomy alongside the free-text error_message
    // above: error.name is one of ~20 typed producer error classes
    // (CaptureFailure, DrawElementCaptureError, SwiftShaderAssertionError, …);
    // failed_stage_code is the same job.currentStage value normalized to a
    // stable code. Error-conditional by nature — there is no equivalent on
    // the render_complete success path, since nothing failed to name.
    errorName: error instanceof Error ? error.name : "unknown",
    failedStageCode: normalizeStageCode(failedStage || "pipeline"),
    ...renderJobObservabilityTelemetryPayload(job),
    ...getMemorySnapshot()
  });
  if (job?.id) recordRecentRender(job.id, false);
  if (options.throwOnError) {
    throw new Error(message);
  }
  const remediation = chromeLaunchRemediation(message);
  if (remediation) {
    errorBox("Render failed \u2014 Chrome could not launch", message, remediation);
    failCommand();
  }
  const macosRemediation = macosOldChromeCrashRemediation(message);
  if (macosRemediation) {
    errorBox("Render failed \u2014 Chrome could not launch", message, macosRemediation);
    failCommand();
  }
  const windowsRemediation = windowsChromeCrashRemediation(message);
  if (windowsRemediation) {
    errorBox(
      "Render failed \u2014 chrome-headless-shell crashed at launch",
      message,
      windowsRemediation
    );
    failCommand();
  }
  errorBox("Render failed", message, hint);
  failCommand();
}
function trackRenderMetrics(job, elapsedMs, options, docker) {
  recordRecentRender(job.id, true);
  const perf = job.perfSummary;
  const compositionDurationMs = perf ? Math.round(perf.compositionDurationSeconds * 1e3) : void 0;
  const speedRatio = compositionDurationMs && compositionDurationMs > 0 && elapsedMs > 0 ? Math.round(compositionDurationMs / elapsedMs * 100) / 100 : void 0;
  const stages = perf?.stages ?? {};
  const extract = perf?.videoExtractBreakdown;
  trackRenderComplete({
    durationMs: elapsedMs,
    fps: fpsToNumber(options.fps),
    quality: options.quality,
    workers: options.workers ?? perf?.workers,
    workersBoundBy: perf?.workerSizing?.boundBy,
    workersCpuBased: perf?.workerSizing?.cpuBasedWorkers,
    workersMemoryBased: perf?.workerSizing?.memoryBasedWorkers,
    workersHeapBased: perf?.workerSizing?.heapBasedWorkers,
    workersFrameBased: perf?.workerSizing?.frameBasedWorkers,
    workersHeapLimitMb: perf?.workerSizing?.heapLimitMb,
    workersExceedHeapAdvisory: perf?.workerSizing?.exceedsHeapAdvisory,
    docker,
    gpu: options.gpu,
    authoringSkill: options.authoringSkill,
    authoringSkillSource: options.authoringSkillSource,
    authoringSkillInvalid: options.authoringSkillInvalid,
    hfEnvOverrides: options.hfEnvOverrides,
    catalogUsage: options.catalogUsage,
    ...renderOutputShapeTelemetryPayload(options),
    ...renderEnvironmentTelemetryPayload(options),
    chromeBrowserRssPeakMb: perf?.chromeMemory?.browserRssPeakMb,
    chromeRendererRssPeakMb: perf?.chromeMemory?.rendererRssPeakMb,
    chromeRssLastMb: perf?.chromeMemory?.rssLastMb,
    chromeGpuProcessSeenLastSample: perf?.chromeMemory?.gpuProcessSeenLastSample,
    chromeMemorySamples: perf?.chromeMemory?.samples,
    staticDedupEnabled: perf?.staticDedup?.enabled,
    staticDedupArmed: perf?.staticDedup?.armed,
    staticDedupSkipReason: perf?.staticDedup?.skipReason,
    staticDedupPredictedFrames: perf?.staticDedup?.predictedFrames,
    staticDedupReusedFrames: perf?.staticDedup?.reusedFrames,
    beginFrameNoDamageFrames: perf?.beginFrameReuse?.noDamageFrames,
    beginFrameHasDamageFrames: perf?.beginFrameReuse?.hasDamageFrames,
    deCaptureMode: perf?.drawElement?.mode,
    vfxHostCount: perf?.drawElement?.vfxHostCount,
    vfxCapture: perf?.drawElement?.vfxCapture,
    vfxTypes: perf?.drawElement?.vfxTypes,
    deCompileGate: perf?.drawElement?.compileGate,
    deClampReason: perf?.drawElement?.clampReason,
    deWorkerInversion: perf?.drawElement?.workerInversion,
    dePreInversionWorkers: perf?.drawElement?.preInversionWorkers,
    compositionElementCount: perf?.drawElement?.compositionElementCount,
    compositionElementCountSource: perf?.drawElement?.compositionElementCountSource,
    compositionElementTags: perf?.drawElement?.compositionElementTags,
    arollVideoCount: perf?.drawElement?.arollVideoCount,
    heygenVideoCount: perf?.drawElement?.heygenVideoCount,
    adaptersUsed: perf?.drawElement?.adaptersUsed,
    audioCount: perf?.drawElement?.audioCount,
    imageCount: perf?.drawElement?.imageCount,
    subCompositionCount: perf?.drawElement?.subCompositionCount,
    audioGroupCount: perf?.drawElement?.audioGroupCount,
    colorGradingCount: perf?.drawElement?.colorGradingCount,
    hasLut: perf?.drawElement?.hasLut,
    rootBodyMismatch: perf?.drawElement?.rootBodyMismatch,
    rootBodyDeltaPxBucket: perf?.drawElement?.rootBodyDeltaPxBucket,
    deShortBand: perf?.drawElement?.shortBand,
    deParallelRouter: perf?.drawElement?.parallelRouter,
    dePreRouterWorkers: perf?.drawElement?.preRouterWorkers,
    deGateReason: perf?.drawElement?.gateReason,
    gpuRenderer: perf?.drawElement?.gpuRenderer,
    deWorkerEncode: perf?.drawElement?.workerEncode,
    deVerifyArmed: perf?.drawElement?.verifyArmed,
    deVerifyChecked: perf?.drawElement?.verifyChecked,
    deVerifyMinDb: perf?.drawElement?.verifyMinDb,
    deVerifyInitMs: perf?.drawElement?.verifyInitMs,
    deSelfVerifyFallback: perf?.drawElement?.selfVerifyFallback,
    deFallbackReason: perf?.drawElement?.fallbackReason,
    deFallbackFailedDb: perf?.drawElement?.fallbackFailedDb,
    deFallbackFrameIndex: perf?.drawElement?.fallbackFrameIndex,
    deFallbackThresholdDb: perf?.drawElement?.fallbackThresholdDb,
    deBlankSuspects: perf?.drawElement?.blankSuspects,
    deBlankDeterministicAccepts: perf?.drawElement?.blankDeterministicAccepts,
    deBlankRecaptures: perf?.drawElement?.blankRecaptures,
    deBoundaryFrames: perf?.drawElement?.boundaryFrames,
    deNcprFallbacks: perf?.drawElement?.ncprFallbacks,
    deFrameTimeouts: perf?.drawElement?.frameTimeouts,
    compositionDurationMs,
    compositionWidth: perf?.resolution.width,
    compositionHeight: perf?.resolution.height,
    totalFrames: perf?.totalFrames,
    speedRatio,
    captureAvgMs: perf?.captureAvgMs,
    captureP50Ms: perf?.captureP50Ms,
    subTimelineWait: perf?.subTimelineWait,
    videoCount: perf?.videoCount,
    capturePeakMs: perf?.capturePeakMs,
    tmpPeakBytes: perf?.tmpPeakBytes,
    stageCompileMs: stages.compileMs,
    stageVideoExtractMs: stages.videoExtractMs,
    stageAudioProcessMs: stages.audioProcessMs,
    stageCaptureMs: stages.captureMs,
    stageCaptureSetupMs: stages.captureSetupMs,
    stageCaptureFrameMs: stages.captureFrameMs,
    stageEncodeMs: stages.encodeMs,
    stageAssembleMs: stages.assembleMs,
    extractResolveMs: extract?.resolveMs,
    extractHdrProbeMs: extract?.hdrProbeMs,
    extractHdrPreflightMs: extract?.hdrPreflightMs,
    extractHdrPreflightCount: extract?.hdrPreflightCount,
    extractVfrProbeMs: extract?.vfrProbeMs,
    extractVfrPreflightMs: extract?.vfrPreflightMs,
    extractVfrPreflightCount: extract?.vfrPreflightCount,
    extractPhase3Ms: extract?.extractMs,
    extractCacheHits: extract?.cacheHits,
    extractCacheMisses: extract?.cacheMisses,
    ...renderJobObservabilityTelemetryPayload(job),
    ...getMemorySnapshot()
  });
}
function readOutputFootprint(outputPath) {
  try {
    const stat = statSync2(outputPath);
    if (!stat.isDirectory()) return { fileSize: formatBytes(stat.size), isDirectory: false };
    let total = 0;
    for (const entry of readdirSync(outputPath, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      try {
        total += statSync2(join2(outputPath, entry.name)).size;
      } catch {
      }
    }
    return { fileSize: formatBytes(total), isDirectory: true };
  } catch {
    return { fileSize: "unknown", isDirectory: false };
  }
}
function wantsDesktopHint(options) {
  return options.desktopHint !== false;
}
function printRenderComplete(input) {
  if (input.quiet) return;
  const { outputPath, elapsedMs, perf } = input;
  const { fileSize, isDirectory } = readOutputFootprint(outputPath);
  const detail = formatRenderSummaryDetail({
    elapsedMs,
    outputDurationSeconds: perf?.compositionDurationSeconds,
    isDirectory,
    frameCount: perf?.totalFrames,
    playlistDirectory: input.format === "hls"
  });
  console.log("");
  console.log(c.success("\u25C7") + "  " + c.accent(outputPath));
  console.log("   " + c.bold(fileSize) + c.dim(" \xB7 " + detail));
  if (perf) printRenderPipeline(perf, input.requestedGpuMode);
  const hint = input.desktopHint ? desktopHint(input.projectDir) : null;
  if (hint) console.log("   " + c.dim(hint));
}
function printRenderPipeline(perf, requestedGpuMode) {
  const capture = {
    captureMode: resolvePrintedCaptureMode(
      perf.drawElement?.mode,
      perf.observability?.capture.captureMode
    ),
    browserGpuMode: perf.observability?.capture.browserGpuMode
  };
  const pipeline = formatRenderPipelineDetail({
    ...capture,
    streamingEncode: perf.observability?.capture.useStreamingEncode,
    stages: perf.stages
  });
  if (pipeline) console.log("   " + c.dim(pipeline));
  const hint = formatScreenshotFallbackHint({
    ...capture,
    requestedGpuMode,
    platform: process.platform
  });
  if (hint) console.log("   " + c.dim(hint));
}
export {
  __resetDeParallelRouterTrialStateForTests,
  checkRenderResolutionPreflight,
  render_default as default,
  examples,
  normalizeStageCode,
  renderLintContinuationHint,
  renderLocal,
  resolveBrowserGpuForCli,
  runRenderLint,
  wantsDesktopHint
};
