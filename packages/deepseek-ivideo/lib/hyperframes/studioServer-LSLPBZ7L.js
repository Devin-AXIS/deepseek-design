import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  renderJobObservabilityTelemetryPayload,
  renderObservabilityTelemetryPayload
} from "./chunk-VXVRPIJA.js";
import {
  affectsPreview,
  createBackgroundRemovalJob,
  createStudioApi,
  getElementScreenshotClip,
  getMimeType,
  loadRegistryPreviewAssetFromRoot,
  loadRegistryPreviewFromRoot,
  resolveGsapRegistryItemEngine,
  reviewComponentVariables,
  reviewVideoRuntime
} from "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import {
  DEFAULT_HISTORY_ROOT,
  DELETED_VERSION,
  HistoryBusyError,
  HistoryClosedError,
  STUDIO_SIGNATURE_MANIFEST_PATHS,
  affectsProjectSignature,
  createProjectSignature,
  fileContentVersion,
  historyCache,
  identifyFileWrite,
  openProjectHistory
} from "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import {
  DEFAULT_PROJECT_CONFIG,
  loadProjectConfig,
  resolveAutoProxy
} from "./chunk-OV3IB6LQ.js";
import {
  publishItem,
  recordRewrittenInstall
} from "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import {
  isAtomicTempPath
} from "./chunk-6LTRBXKR.js";
import "./chunk-OLJM7Q7L.js";
import {
  trackRenderComplete,
  trackRenderError
} from "./chunk-D3TRQ4GS.js";
import {
  canaryDecisionsForStudio,
  shouldTrack
} from "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import {
  bytesToMb,
  detectAgentRuntime
} from "./chunk-GQJZORQP.js";
import {
  DEFAULT_REGISTRY_URL,
  publishRegistryFile,
  registryTargetPath
} from "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import "./chunk-54HJ63Q2.js";
import "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
import {
  createStudioManualEditsRenderBodyScript
} from "./chunk-H6T6FXDE.js";
import {
  SYSTEM_FONT_SIZE_LIMIT
} from "./chunk-TJSTGSAW.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import {
  fpsToNumber,
  realProjectRoot
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import {
  readConfig
} from "./chunk-2SBJMKLH.js";
import {
  isDevMode
} from "./chunk-ISN5GRYI.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/server/studioServer.ts
import { Hono } from "hono";
import { createHash as createHash2 } from "crypto";
import { streamSSE } from "hono/streaming";
import {
  existsSync as existsSync2,
  mkdirSync,
  readFileSync as readFileSync3,
  readdirSync as readdirSync2,
  writeFileSync,
  statSync as statSync2,
  unlinkSync
} from "fs";
import { resolve as resolve2, join as join2, basename as basename2, dirname as dirname3, isAbsolute, relative as relative2 } from "path";

// src/server/fileWatcher.ts
import { lstatSync, readFileSync, readdirSync, watch } from "fs";
import { basename, dirname, extname, join, relative, sep } from "path";
function readWatchedFileVersion(path) {
  try {
    const info = lstatSync(path);
    if (!info.isFile() || info.size > 2e6 || !/\.(?:html|css|[cm]?js|json|svg|tsx?|jsx|md)$/i.test(extname(path))) return null;
    return fileContentVersion(readFileSync(path));
  } catch (error) {
    return error instanceof Error && "code" in error && error.code === "ENOENT" ? DELETED_VERSION : null;
  }
}
var WATCHER_EXCLUDED_DIRS = /* @__PURE__ */ new Set([
  ".cache",
  ".git",
  ".hyperframes",
  ".thumbnails",
  ".next",
  ".thumbnails",
  ".transcode-cache",
  ".vite",
  ".waveform-cache",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "outputs",
  "renders"
]);
var QUIET_MS = 30;
var BURST_MS = 300;
function shouldWatchProjectFile(filename) {
  if (!filename || isAtomicTempPath(filename)) return false;
  const parts = filename.split(/[\\/]+/);
  return !parts.some((part) => WATCHER_EXCLUDED_DIRS.has(part));
}
function isDirectory(path) {
  try {
    return lstatSync(path).isDirectory();
  } catch {
    return false;
  }
}
function watchProjectTree(projectDir, onChange) {
  if (process.platform !== "linux") {
    const tree = watch(projectDir, { recursive: true }, (_event, filename) => {
      if (filename) onChange(filename.toString());
    });
    tree.on("error", () => tree.close());
    return () => tree.close();
  }
  const directories = /* @__PURE__ */ new Map();
  const unwatch = (dir) => {
    for (const [watched, watcher] of directories) {
      if (watched === dir || watched.startsWith(dir + sep)) {
        watcher.close();
        directories.delete(watched);
      }
    }
  };
  const watchDirectory = (dir, movedIn = false) => {
    if (directories.has(dir)) unwatch(dir);
    let watcher;
    try {
      watcher = watch(dir, { persistent: true }, (event, name) => {
        if (!name) return;
        const path = join(dir, name.toString());
        onChange(relative(projectDir, path));
        if (event !== "rename") return;
        if (isDirectory(path)) descend(path, true);
        else unwatch(path);
      });
    } catch {
      return;
    }
    watcher.on("error", () => unwatch(dir));
    directories.set(dir, watcher);
    walkChildren(dir, movedIn);
  };
  const walkChildren = (dir, movedIn) => {
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
    }
    for (const entry of entries) {
      const child = join(dir, entry.name);
      if (entry.isDirectory()) descend(child, movedIn);
      else if (movedIn) onChange(relative(projectDir, child));
    }
    if (movedIn && relative(projectDir, dir) === ".hyperframes") {
      for (const manifest of STUDIO_SIGNATURE_MANIFEST_PATHS) onChange(manifest);
    }
  };
  const descend = (dir, movedIn = false) => {
    const rel = relative(projectDir, dir);
    if (shouldWatchProjectFile(rel) || rel === ".hyperframes") watchDirectory(dir, movedIn);
  };
  let parent = null;
  try {
    parent = watch(dirname(projectDir), { persistent: true }, (event, name) => {
      if (event !== "rename" || name?.toString() !== basename(projectDir)) return;
      watchDirectory(projectDir);
      onChange(".");
    });
    parent.on("error", () => parent?.close());
  } catch {
  }
  watchDirectory(projectDir);
  return () => {
    parent?.close();
    for (const watcher of directories.values()) watcher.close();
    directories.clear();
  };
}
function createProjectWatcher(projectDir) {
  const projectDirName = basename(projectDir);
  const listeners = /* @__PURE__ */ new Set();
  const pendingPaths = /* @__PURE__ */ new Set();
  let debounceTimer = null;
  let lastFlushAt = Number.NEGATIVE_INFINITY;
  let closeTree = null;
  try {
    closeTree = watchProjectTree(projectDir, (relativePath) => {
      if (!shouldWatchProjectFile(relativePath) && !affectsProjectSignature(projectDir, join(projectDir, relativePath))) {
        return;
      }
      pendingPaths.add(relativePath);
      if (debounceTimer) clearTimeout(debounceTimer);
      const delay = Math.max(QUIET_MS, lastFlushAt + BURST_MS - Date.now());
      debounceTimer = setTimeout(() => {
        const changedPaths = [...pendingPaths];
        pendingPaths.clear();
        debounceTimer = null;
        lastFlushAt = Date.now();
        for (const changedPath of changedPaths) {
          for (const fn of listeners) {
            fn(changedPath);
          }
        }
      }, delay);
    });
  } catch {
  }
  return {
    addListener(fn) {
      listeners.add(fn);
    },
    removeListener(fn) {
      listeners.delete(fn);
    },
    close() {
      if (debounceTimer) clearTimeout(debounceTimer);
      pendingPaths.clear();
      closeTree?.();
      listeners.clear();
    }
  };
}

// src/server/runtimeSource.ts
import { createHash } from "crypto";
import { existsSync } from "fs";

// src/server/readBundleFile.ts
import { openSync, fstatSync, closeSync, statSync, readFileSync as readFileSync2, constants } from "fs";
function readBundleFile(filePath) {
  let fd;
  try {
    fd = openSync(filePath, constants.O_RDONLY | constants.O_NONBLOCK);
  } catch (error) {
    if (error instanceof Error && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR"))
      return null;
    if (!statSync(filePath, { throwIfNoEntry: false })?.isFile()) return null;
    throw error;
  }
  try {
    if (!fstatSync(fd).isFile()) return null;
    return readFileSync2(fd);
  } finally {
    closeSync(fd);
  }
}

// src/server/runtimeSource.ts
import { resolve, dirname as dirname2 } from "path";
var ARTIFACT_NAMES = ["hyperframe-runtime.js", "hyperframe.runtime.iife.js"];
async function loadRuntimeSource() {
  return await buildFromSource() ?? await getInlinedRuntime() ?? readPrebuiltArtifact();
}
async function loadRuntimeSourceSignature() {
  const source = await loadRuntimeSource();
  if (!source) return null;
  return createHash("sha256").update(source).digest("hex");
}
function hashSignatureParts(parts) {
  const hash = createHash("sha256");
  for (const part of parts) {
    hash.update(part ?? "");
    hash.update("\n--hf-signature-part--\n");
  }
  return hash.digest("hex");
}
var ENTRY_TS = resolve(__dirname, "..", "..", "..", "core", "src", "runtime", "entry.ts");
async function buildFromSource() {
  if (!existsSync(ENTRY_TS)) return null;
  try {
    const mod = await import("./src-S2KSXXAR.js");
    if (typeof mod.loadHyperframeRuntimeSource === "function") {
      const source = mod.loadHyperframeRuntimeSource();
      if (source) return source;
    }
  } catch {
  }
  return null;
}
async function getInlinedRuntime() {
  try {
    const mod = await import("./src-S2KSXXAR.js");
    if (typeof mod.getHyperframeRuntimeScript === "function") {
      return mod.getHyperframeRuntimeScript() ?? null;
    }
  } catch {
  }
  return null;
}
function readPrebuiltArtifact() {
  return readFromDir(__dirname) ?? readFromCoreDistDir() ?? readFromNodeModules();
}
function readFromDir(dir) {
  for (const name of ARTIFACT_NAMES) {
    const path = resolve(dir, name);
    const content = readBundleFile(path);
    if (content !== null) return content.toString("utf-8");
  }
  return null;
}
function readFromCoreDistDir() {
  return readFromDir(resolve(__dirname, "..", "..", "..", "core", "dist"));
}
function readFromNodeModules() {
  const subPaths = ["node_modules/hyperframes/dist", "node_modules/@hyperframes/core/dist"];
  let dir = __dirname;
  for (; ; ) {
    for (const sub of subPaths) {
      const result = readFromDir(resolve(dir, sub));
      if (result) return result;
    }
    const parent = dirname2(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

// src/server/telemetryIdentity.ts
import { hostname, networkInterfaces } from "os";
function resolveCliTelemetryDistinctId() {
  try {
    if (!shouldTrack()) return null;
    const id = readConfig().anonymousId;
    return typeof id === "string" && id.length > 0 ? id : null;
  } catch {
    return null;
  }
}
function resolveCliBucketSeed() {
  try {
    if (!shouldTrack()) return null;
    const seed = readConfig().bucketSeed;
    return typeof seed === "string" && seed.length > 0 ? seed : null;
  } catch {
    return null;
  }
}
function encodeInlineScriptValue(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\//g, "\\/");
}
function encodeInlineScriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\//g, "\\/");
}
function resolveCliCanaryDecisions() {
  try {
    const decisions = canaryDecisionsForStudio();
    return Object.keys(decisions).length > 0 ? decisions : null;
  } catch {
    return null;
  }
}
function buildCliIdentityScript(options = {}) {
  const { includeIdentity = true } = options;
  const parts = [];
  parts.push(`window.__HF_CLI_TELEMETRY_DISABLED=${!shouldTrack()};`);
  const cliId = includeIdentity ? resolveCliTelemetryDistinctId() : null;
  if (cliId) {
    parts.push(`window.__HF_CLI_DISTINCT_ID=${encodeInlineScriptValue(cliId)};`);
    const seed = resolveCliBucketSeed();
    if (seed) parts.push(`window.__HF_CLI_BUCKET_SEED=${encodeInlineScriptValue(seed)};`);
  }
  const decisions = resolveCliCanaryDecisions();
  if (decisions !== null) {
    parts.push(`window.__HF_CLI_CANARY_DECISIONS=${encodeInlineScriptJson(decisions)};`);
  }
  const agent = shouldTrack() ? detectAgentRuntime() : null;
  if (agent) {
    parts.push(`window.__HF_CLI_AGENT_RUNTIME=${encodeInlineScriptValue(agent)};`);
  }
  return parts.length === 0 ? "" : `<script>${parts.join("")}</script>`;
}
function buildStudioHeadScripts(envScript, options = {}) {
  return `${buildCliIdentityScript(options)}${envScript}`;
}

// src/server/studioRenderTelemetry.ts
import { freemem } from "os";
function memSnapshot() {
  return {
    peakMemoryMb: bytesToMb(process.memoryUsage.rss()),
    memoryFreeMb: bytesToMb(freemem())
  };
}
function stagesPayload(stages) {
  return {
    stageCompileMs: stages.compileMs,
    stageVideoExtractMs: stages.videoExtractMs,
    stageAudioProcessMs: stages.audioProcessMs,
    stageCaptureMs: stages.captureMs,
    stageCaptureSetupMs: stages.captureSetupMs,
    stageCaptureFrameMs: stages.captureFrameMs,
    stageEncodeMs: stages.encodeMs,
    stageAssembleMs: stages.assembleMs
  };
}
function extractPayload(extract) {
  if (!extract) return {};
  return {
    extractResolveMs: extract.resolveMs,
    extractHdrProbeMs: extract.hdrProbeMs,
    extractHdrPreflightMs: extract.hdrPreflightMs,
    extractHdrPreflightCount: extract.hdrPreflightCount,
    extractVfrProbeMs: extract.vfrProbeMs,
    extractVfrPreflightMs: extract.vfrPreflightMs,
    extractVfrPreflightCount: extract.vfrPreflightCount,
    extractPhase3Ms: extract.extractMs,
    extractCacheHits: extract.cacheHits,
    extractCacheMisses: extract.cacheMisses
  };
}
function perfPayload(perf, elapsedMs) {
  if (!perf) return {};
  const compositionDurationMs = Math.round(perf.compositionDurationSeconds * 1e3);
  const speedRatio = compositionDurationMs > 0 && elapsedMs > 0 ? Math.round(compositionDurationMs / elapsedMs * 100) / 100 : void 0;
  return {
    workers: perf.workers,
    compositionDurationMs,
    compositionWidth: perf.resolution.width,
    compositionHeight: perf.resolution.height,
    totalFrames: perf.totalFrames,
    speedRatio,
    captureAvgMs: perf.captureAvgMs,
    capturePeakMs: perf.capturePeakMs,
    tmpPeakBytes: perf.tmpPeakBytes,
    ...stagesPayload(perf.stages),
    ...extractPayload(perf.videoExtractBreakdown),
    ...renderObservabilityTelemetryPayload(perf.observability)
  };
}
function emitStudioRenderError(opts, elapsedMs, failedStage, err, job) {
  if (opts.telemetryOptOut === true) return;
  trackRenderError({
    fps: fpsToNumber(opts.fps),
    quality: opts.quality,
    docker: false,
    source: "studio",
    failedStage,
    errorMessage: err instanceof Error ? err.message : String(err),
    elapsedMs,
    outputFormat: opts.format,
    outputResolutionPreset: opts.outputResolution,
    distinctId: opts.distinctId,
    ...renderJobObservabilityTelemetryPayload(job),
    ...memSnapshot()
  });
}
function emitStudioRenderComplete(opts, elapsedMs, perf) {
  if (opts.telemetryOptOut === true) return;
  trackRenderComplete({
    durationMs: elapsedMs,
    fps: fpsToNumber(opts.fps),
    quality: opts.quality,
    docker: false,
    gpu: false,
    source: "studio",
    outputFormat: opts.format,
    outputResolutionPreset: opts.outputResolution,
    distinctId: opts.distinctId,
    ...perfPayload(perf, elapsedMs),
    ...memSnapshot()
  });
}

// src/server/studioServer.ts
var STUDIO_MANUAL_EDITS_PATH = ".hyperframes/studio-manual-edits.json";
var REMOTE_GIF_IMG_SRC_RE = /<img\b[^>]*?\bsrc\s*=\s*["'](https?:\/\/[^"']+\.gif(?:[?#][^"']*)?)["'][^>]*>/gi;
async function loadStudioProducer() {
  return isDevMode() ? await import("./src-765M5G3G.js") : await import("./src-765M5G3G.js");
}
function resolveDistDir() {
  return resolveStudioBundle().dir;
}
function resolveStudioBundle() {
  const builtPath = resolve2(__dirname, "studio");
  const builtIndex = resolve2(builtPath, "index.html");
  if (existsSync2(builtIndex)) {
    return { dir: builtPath, indexPath: builtIndex, available: true, checkedPaths: [builtIndex] };
  }
  const devPath = resolve2(__dirname, "..", "..", "..", "studio", "dist");
  const devIndex = resolve2(devPath, "index.html");
  if (existsSync2(devIndex)) {
    return {
      dir: devPath,
      indexPath: devIndex,
      available: true,
      checkedPaths: [builtIndex, devIndex]
    };
  }
  return {
    dir: builtPath,
    indexPath: builtIndex,
    available: false,
    checkedPaths: [builtIndex, devIndex]
  };
}
function resolveRuntimePath() {
  const builtPath = resolve2(__dirname, "hyperframe-runtime.js");
  if (existsSync2(builtPath)) return builtPath;
  const iifePath = resolve2(__dirname, "hyperframe.runtime.iife.js");
  if (existsSync2(iifePath)) return iifePath;
  const devPath = resolve2(
    __dirname,
    "..",
    "..",
    "..",
    "core",
    "dist",
    "hyperframe.runtime.iife.js"
  );
  if (existsSync2(devPath)) return devPath;
  return builtPath;
}
function readStudioManualEditManifestContent(projectDir) {
  const manifestPath = join2(projectDir, STUDIO_MANUAL_EDITS_PATH);
  if (!existsSync2(manifestPath)) return "";
  try {
    return readFileSync3(manifestPath, "utf-8");
  } catch {
    return "";
  }
}
async function applyStudioManualEditsToThumbnailPage(page, manifestContent, activeCompositionPath) {
  const script = createStudioManualEditsRenderBodyScript(manifestContent, {
    activeCompositionPath
  });
  if (!script) return;
  await page.addScriptTag({ content: script });
}
async function reapplyStudioManualEditsToThumbnailPage(page) {
  await page.evaluate(() => {
    const apply = window.__hfStudioManualEditsApply;
    if (typeof apply === "function") apply();
  });
}
function collectRemoteGifImageSources(html) {
  const urls = /* @__PURE__ */ new Set();
  const re = new RegExp(REMOTE_GIF_IMG_SRC_RE.source, REMOTE_GIF_IMG_SRC_RE.flags);
  let match;
  while ((match = re.exec(html)) !== null) {
    if (match[1]) urls.add(match[1]);
  }
  return [...urls];
}
async function downloadRemoteGifImageSources(html, downloadDir, downloadToTemp) {
  const sourceAssets = /* @__PURE__ */ new Map();
  await Promise.all(
    collectRemoteGifImageSources(html).map(async (url) => {
      try {
        sourceAssets.set(url, await downloadToTemp(url, downloadDir));
      } catch (err) {
        console.warn(
          "[Studio] Remote animated GIF prep skipped:",
          err instanceof Error ? err.message : err
        );
      }
    })
  );
  return sourceAssets;
}
var _thumbnailBrowserLease = null;
var _thumbnailBrowserInitializing = null;
var THUMBNAIL_BROWSER_TIMEOUT_MS = 6e4;
var THUMBNAIL_PAGE_TIMEOUT_MS = 15e3;
var THUMBNAIL_NAVIGATION_TIMEOUT_MS = 2e4;
var THUMBNAIL_TIMELINE_TIMEOUT_MS = 5e3;
var THUMBNAIL_SCREENSHOT_TIMEOUT_MS = 2e4;
function withThumbnailTimeout(promise, timeoutMs, message) {
  let timeout;
  return Promise.race([
    promise.finally(() => {
      if (timeout) clearTimeout(timeout);
    }),
    new Promise((_, reject) => {
      timeout = setTimeout(() => reject(new Error(message)), timeoutMs);
    })
  ]);
}
async function getThumbnailBrowser(browserGpuMode) {
  if (_thumbnailBrowserLease?.browser.connected) return _thumbnailBrowserLease.browser;
  if (_thumbnailBrowserInitializing) {
    return (await _thumbnailBrowserInitializing)?.browser ?? null;
  }
  _thumbnailBrowserInitializing = (async () => {
    try {
      const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
      const { acquireBrowser, buildChromeArgs } = await import("./src-2CXRYIST.js");
      const chromeArgs = buildChromeArgs({
        width: 1920,
        height: 1080,
        captureMode: "screenshot"
      }, { browserGpuMode });
      const launchOptions = {
        forceScreenshot: true,
        browserTimeout: THUMBNAIL_BROWSER_TIMEOUT_MS,
        protocolTimeout: Math.max(12e4, THUMBNAIL_BROWSER_TIMEOUT_MS * 2)
      };
      let acquired;
      try {
        const managedBrowser = await ensureBrowser({ preferManagedChrome: true });
        process.env.PRODUCER_HEADLESS_SHELL_PATH = managedBrowser.executablePath;
        acquired = await acquireBrowser(chromeArgs, {
          ...launchOptions,
          chromePath: managedBrowser.executablePath
        });
      } catch (managedError) {
        console.warn(
          "[Studio] Managed thumbnail browser failed; retrying with a system browser:",
          managedError instanceof Error ? managedError.message : managedError
        );
        const { findSystemBrowser } = await import("./manager-VQUQB7DK.js");
        const systemBrowser = findSystemBrowser();
        if (!systemBrowser) throw managedError;
        process.env.PRODUCER_HEADLESS_SHELL_PATH = systemBrowser.executablePath;
        acquired = await acquireBrowser(chromeArgs, {
          ...launchOptions,
          chromePath: systemBrowser.executablePath,
          enableBrowserPool: false
        });
      }
      _thumbnailBrowserLease = acquired;
      acquired.browser.on("disconnected", () => {
        if (_thumbnailBrowserLease === acquired) _thumbnailBrowserLease = null;
        _thumbnailBrowserInitializing = null;
      });
      return acquired;
    } catch (err) {
      console.warn(
        "[Studio] Failed to launch thumbnail browser:",
        err instanceof Error ? err.message : err
      );
      _thumbnailBrowserInitializing = null;
      return null;
    }
  })();
  return (await _thumbnailBrowserInitializing)?.browser ?? null;
}
async function closeThumbnailBrowser() {
  if (!_thumbnailBrowserLease) return;
  const lease = _thumbnailBrowserLease;
  _thumbnailBrowserLease = null;
  _thumbnailBrowserInitializing = null;
  await lease.release().catch(() => {
  });
}
async function loadPreviewServerBuildSignature() {
  const runtimeSignature = await loadRuntimeSourceSignature();
  const studioBundle = resolveStudioBundle();
  const studioIndex = studioBundle.available && existsSync2(studioBundle.indexPath) ? readFileSync3(studioBundle.indexPath, "utf-8") : "";
  return hashSignatureParts([
    VERSION,
    runtimeSignature,
    studioIndex,
    createStudioServer.toString(),
    createStudioApi.toString(),
    createProjectSignature.toString(),
    getMimeType.toString(),
    getElementScreenshotClip.toString()
  ]);
}
var EXTERNAL_GSAP_SCRIPT_RE = /<script\b[^>]*\bsrc=(["'])https?:\/\/[^"']*\/gsap(?:\.min)?\.js(?:\?[^"']*)?\1[^>]*>\s*<\/script>\s*/gi;
var LOCAL_GSAP_SCRIPT_RE = /<script\b[^>]*\bsrc=(["'])(?:\.\/|\/)?assets\/gsap(?:\.min)?\.js(?:\?[^"']*)?\1[^>]*>/i;
function rewriteWrittenToHostViewport(projectDir, written, preserveAuthoredSize = false) {
  const indexPath = join2(projectDir, "index.html");
  if (!existsSync2(indexPath)) return;
  const indexHtml = readFileSync3(indexPath, "utf-8");
  const hostW = indexHtml.match(/data-width="(\d+)"/)?.[1];
  const hostH = indexHtml.match(/data-height="(\d+)"/)?.[1];
  const hasProjectGsap = existsSync2(join2(projectDir, "assets", "gsap.min.js")) && LOCAL_GSAP_SCRIPT_RE.test(indexHtml);
  for (const absPath of written) {
    if (!absPath.endsWith(".html")) continue;
    const original = readFileSync3(absPath, "utf-8");
    let content = hasProjectGsap ? original.replace(EXTERNAL_GSAP_SCRIPT_RE, "") : original;
    if (hostW && hostH && !preserveAuthoredSize) {
      content = content.replace(
        /(<meta\s+name="viewport"\s+content="width=)\d+(,\s*height=)\d+/i,
        `$1${hostW}$2${hostH}`
      );
      content = content.replace(
        /(\bwidth:\s*)\d+(px;\s*\n?\s*height:\s*)\d+(px;)/g,
        (match, pre, mid, post) => {
          if (match.includes("1920") || match.includes("1080")) {
            return `${pre}${hostW}${mid}${hostH}${post}`;
          }
          return match;
        }
      );
    }
    if (content !== original) {
      const root = realProjectRoot(projectDir);
      publishRegistryFile(root, relative2(root, absPath).replaceAll("\\", "/"), content);
    }
  }
}
function resolveBundledRegistryRoot() {
  const candidates = [
    resolve2(__dirname, "..", "..", "..", "..", "registry"),
    resolve2(__dirname, "..", "..", "..", "registry")
  ];
  return candidates.find((candidate) => existsSync2(join2(candidate, "registry.json"))) ?? null;
}
function loadBundledRegistryItems(registryRoot) {
  const items = [];
  for (const subdir of ["blocks", "components"]) {
    const dir = join2(registryRoot, subdir);
    if (!existsSync2(dir)) continue;
    for (const entry of readdirSync2(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const manifestPath = join2(dir, entry.name, "registry-item.json");
      if (!existsSync2(manifestPath)) continue;
      try {
        const item = JSON.parse(readFileSync3(manifestPath, "utf-8"));
        if (item.type === "hyperframes:block" || item.type === "hyperframes:component") {
          const itemRoot = join2(dir, entry.name);
          const runtimeSources = item.files.flatMap((file) => {
            if (!/\.(?:html|js|mjs|ts|tsx)$/i.test(file.path)) return [];
            const sourcePath = resolve2(itemRoot, file.path);
            const relativePath = relative2(itemRoot, sourcePath);
            if (!relativePath || relativePath.startsWith("..") || isAbsolute(relativePath)) {
              return [];
            }
            try {
              return [readFileSync3(sourcePath, "utf-8")];
            } catch {
              return [];
            }
          });
          const engine = resolveGsapRegistryItemEngine(item, runtimeSources);
          items.push(engine ? { ...item, engine } : item);
        }
      } catch {
      }
    }
  }
  return items;
}
function installBundledRegistryItem(bundledRoot, item, projectDir) {
  const subdir = item.type === "hyperframes:block" ? "blocks" : "components";
  const itemDir = join2(bundledRoot, subdir, item.name);
  const root = realProjectRoot(projectDir);
  const sourceRoot = realProjectRoot(itemDir);
  const outcomes = item.files.map((file) => {
    const bytes = readFileSync3(registryTargetPath(sourceRoot, file.path));
    return {
      destPath: registryTargetPath(root, file.target),
      target: file.target,
      preserved: false,
      hash: createHash2("sha256").update(bytes).digest("hex"),
      vars: null,
      bytes
    };
  });
  return publishItem({ root, outcomes, force: false });
}
function createStudioServer(options) {
  const { projectDir, projectName } = options;
  const projectId = projectName || basename2(projectDir);
  const studioDir = resolveDistDir();
  const runtimePath = resolveRuntimePath();
  const watcher = createProjectWatcher(projectDir);
  const projectConfig = loadProjectConfig(projectDir);
  const usesDefaultRegistryPaths = Object.entries(DEFAULT_PROJECT_CONFIG.paths).every(
    ([kind, path]) => projectConfig.paths[kind] === path
  );
  const bundledRegistryRoot = projectConfig.registry === DEFAULT_REGISTRY_URL && usesDefaultRegistryPaths ? resolveBundledRegistryRoot() : null;
  let bundledRegistryItems = null;
  let bundledRegistryItemsByName = null;
  const getBundledRegistryItems = () => {
    if (!bundledRegistryRoot) return null;
    if (bundledRegistryItems) return bundledRegistryItems;
    bundledRegistryItems = loadBundledRegistryItems(bundledRegistryRoot);
    bundledRegistryItemsByName = /* @__PURE__ */ new Map();
    for (const item of bundledRegistryItems) {
      if (!bundledRegistryItemsByName.has(item.name)) {
        bundledRegistryItemsByName.set(item.name, item);
      }
    }
    return bundledRegistryItems;
  };
  const getBundledRegistryItem = (blockName) => {
    getBundledRegistryItems();
    return bundledRegistryItemsByName?.get(blockName);
  };
  const project = { id: projectId, dir: projectDir, title: projectId };
  let cachedProjectSignature = null;
  watcher.addListener(() => {
    cachedProjectSignature = null;
  });
  const histories = historyCache((dir) => openProjectHistory({ projectDir: dir, historyRoot: options.historyRoot ?? DEFAULT_HISTORY_ROOT }).catch((error) => {
    if (error instanceof HistoryBusyError || error instanceof HistoryClosedError) histories.forget(dir);
    console.warn("[Studio] Project history unavailable:", error);
    return null;
  }));
  watcher.addListener((path) => {
    void histories.peek(projectDir)?.then((opened) => opened?.noteChange(path));
  });
  const adapter = {
    history: () => histories.get(projectDir),
    // Explicit option wins (preview's resolved --proxy/--no-proxy + config);
    // otherwise honor the project's hyperframes.json media.autoProxy so every
    // createStudioServer caller (e.g. the background preview child) gets the
    // configured behavior without its own plumbing.
    autoProxy: options.autoProxy ?? resolveAutoProxy(projectDir, void 0),
    listProjects: () => [project],
    resolveProject: (id) => id === projectId ? project : null,
    async bundle(dir) {
      try {
        const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
        let html = await bundleToSingleHtml(dir, {
          runtime: "placeholder",
          inlineAssets: false,
          inlineColorGradingLuts: false
        });
        html = html.replace(
          'data-hyperframes-preview-runtime="1" src=""',
          'data-hyperframes-preview-runtime="1" src="/api/runtime.js"'
        );
        return html;
      } catch (err) {
        console.error("[studio] Bundle failed:", err);
        return null;
      }
    },
    async transformPreviewHtml({ html, project: project2 }) {
      const { injectDeterministicFontFaces } = await import("./deterministicFonts-5UVUUYHV.js");
      const { prepareAnimatedGifInputs } = await import("./animatedGifPrep-IIIDXDDL.js");
      const { downloadToTemp } = await import("./urlDownloader-DL6VGAPJ.js");
      const gifOutputDir = join2(project2.dir, ".hyperframes", "prepared-assets", "gif");
      const gifDownloadDir = join2(project2.dir, ".hyperframes", "prepared-assets", "downloads");
      const prepared = await prepareAnimatedGifInputs(html, {
        projectDir: project2.dir,
        downloadDir: gifDownloadDir,
        outputDir: gifOutputDir,
        outputSrcPrefix: ".hyperframes/prepared-assets/gif",
        cacheDir: gifOutputDir,
        sourceAssets: await downloadRemoteGifImageSources(html, gifDownloadDir, downloadToTemp)
      });
      return injectDeterministicFontFaces(prepared.html, {
        maxSystemFontBytes: SYSTEM_FONT_SIZE_LIMIT
      });
    },
    getProjectSignature(dir) {
      if (resolve2(dir) !== resolve2(projectDir)) return createProjectSignature(dir);
      cachedProjectSignature ??= createProjectSignature(projectDir);
      return cachedProjectSignature;
    },
    invalidateProjectSignature(dir) {
      if (resolve2(dir) === resolve2(projectDir)) cachedProjectSignature = null;
    },
    async lint(html, opts) {
      const { lintHyperframeHtml } = await import("./dist-CGLXUK27.js");
      return await lintHyperframeHtml(html, opts);
    },
    runtimeUrl: "/api/runtime.js",
    rendersDir: () => join2(projectDir, "renders"),
    startRender(opts) {
      const abortController = new AbortController();
      const state = {
        id: opts.jobId,
        status: "rendering",
        progress: 0,
        outputPath: opts.outputPath,
        cancel: () => abortController.abort()
      };
      const startTime = Date.now();
      (async () => {
        let renderJob;
        const removeCancelledOutput = () => {
          state.status = "cancelled";
          for (const suffix of ["", ".meta.json"]) {
            const fp = suffix ? opts.outputPath.replace(/\.(mp4|webm|mov)$/, suffix) : opts.outputPath;
            try {
              if (existsSync2(fp)) unlinkSync(fp);
            } catch {
            }
          }
        };
        try {
          const { createRenderJob, executeRenderJob } = await loadStudioProducer();
          const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
          mkdirSync(dirname3(opts.outputPath), { recursive: true });
          try {
            const browser = await ensureBrowser({ preferManagedChrome: true });
            if (browser.executablePath && !process.env.PRODUCER_HEADLESS_SHELL_PATH) {
              process.env.PRODUCER_HEADLESS_SHELL_PATH = browser.executablePath;
            }
          } catch {
          }
          const manifestContent = readStudioManualEditManifestContent(opts.project.dir);
          const manualEditsRenderScript = createStudioManualEditsRenderBodyScript(manifestContent);
          const job = createRenderJob({
            // opts.fps is already an Fps rational — see vite-config-studio
            // adapter for the same convention.
            fps: opts.fps,
            quality: opts.quality,
            format: opts.format,
            outputResolution: opts.outputResolution,
            outputResolutionAspectAgnostic: opts.outputResolutionAspectAgnostic,
            motionBlur: opts.motionBlur ? { samplesPerFrame: 4, shutterAngle: 180, shutterPhase: -90, blend: "linear" } : void 0,
            outputSize: opts.outputSize,
            captureSize: opts.captureSize,
            ...manualEditsRenderScript ? { renderBodyScripts: [manualEditsRenderScript] } : {},
            ...opts.composition ? { entryFile: opts.composition } : {},
            ...opts.variables ? { variables: opts.variables } : {}
          });
          renderJob = job;
          const onProgress = (j) => {
            state.progress = j.progress;
            if (j.currentStage) state.stage = j.currentStage;
          };
          await executeRenderJob(
            job,
            opts.project.dir,
            opts.outputPath,
            onProgress,
            abortController.signal
          );
          if (abortController.signal.aborted) {
            removeCancelledOutput();
            return;
          }
          state.status = "complete";
          state.progress = 100;
          const metaPath = opts.outputPath.replace(/\.(mp4|webm|mov)$/, ".meta.json");
          mkdirSync(dirname3(metaPath), { recursive: true });
          writeFileSync(
            metaPath,
            JSON.stringify({ status: "complete", durationMs: Date.now() - startTime })
          );
          emitStudioRenderComplete(opts, Date.now() - startTime, job.perfSummary);
        } catch (err) {
          if (abortController.signal.aborted) {
            removeCancelledOutput();
            return;
          }
          state.status = "failed";
          state.error = err instanceof Error ? err.message : String(err);
          emitStudioRenderError(opts, Date.now() - startTime, state.stage, err, renderJob);
          try {
            const metaPath = opts.outputPath.replace(/\.(mp4|webm|mov)$/, ".meta.json");
            mkdirSync(dirname3(metaPath), { recursive: true });
            writeFileSync(metaPath, JSON.stringify({ status: "failed" }));
          } catch {
          }
        }
      })();
      return state;
    },
    startBackgroundRemoval(opts) {
      return createBackgroundRemovalJob(opts, async (renderOpts) => {
        const sourcePipelinePath = "../background-removal/pipeline.ts";
        const pipeline = await import("./pipeline-CDFHTKYZ.js").catch(
          () => import(sourcePipelinePath)
        );
        return pipeline.render(renderOpts);
      });
    },
    async generateThumbnail(opts) {
      const browser = await withThumbnailTimeout(
        getThumbnailBrowser(options.browserGpuMode),
        THUMBNAIL_BROWSER_TIMEOUT_MS + 5e3,
        "Timed out while starting the thumbnail browser"
      );
      if (!browser) {
        console.warn("[Studio] Thumbnail: no usable browser could be started");
        return null;
      }
      let page = null;
      try {
        page = await withThumbnailTimeout(
          browser.newPage(),
          THUMBNAIL_PAGE_TIMEOUT_MS,
          "Timed out while opening the thumbnail page"
        );
        await page.setViewport({ width: opts.width || 1920, height: opts.height || 1080 });
        await withThumbnailTimeout(
          page.goto(opts.previewUrl, {
            waitUntil: "domcontentloaded",
            timeout: THUMBNAIL_NAVIGATION_TIMEOUT_MS
          }),
          THUMBNAIL_NAVIGATION_TIMEOUT_MS + 1e3,
          "Timed out while loading the preview for capture"
        );
        await page.waitForFunction(
          () => {
            const w = window;
            return !!(w.__timelines && Object.keys(w.__timelines).length > 0);
          },
          { timeout: THUMBNAIL_TIMELINE_TIMEOUT_MS }
        ).catch(() => {
        });
        await page.evaluate((t) => {
          const w = window;
          if (typeof w.__player?.seek === "function") {
            w.__player.seek(t);
          } else if (w.__timelines) {
            for (const tl of Object.values(w.__timelines)) {
              tl?.pause?.(t);
            }
            w.gsap?.ticker?.tick?.();
          }
        }, opts.seekTime);
        const manifestContent = readStudioManualEditManifestContent(opts.project.dir);
        await applyStudioManualEditsToThumbnailPage(page, manifestContent, opts.compPath);
        await page.evaluate(() => {
          void document.fonts?.ready;
          const body = document.body;
          if (body && getComputedStyle(body).backgroundColor === "rgba(0, 0, 0, 0)") {
            body.style.backgroundColor = "#1c2028";
          }
        });
        await new Promise((r) => setTimeout(r, 200));
        await reapplyStudioManualEditsToThumbnailPage(page);
        if (opts.componentVariables) return await withThumbnailTimeout(page.evaluate(reviewComponentVariables, opts.componentVariables), 15e3, "Timed out validating component content");
        if (opts.runtimeReview) return await withThumbnailTimeout(page.evaluate(reviewVideoRuntime), 3e4, "Timed out inspecting executed video timing and layout");
        let clip;
        if (opts.selector) {
          clip = await page.evaluate(getElementScreenshotClip, opts.selector, opts.selectorIndex);
        }
        const screenshot = await withThumbnailTimeout(
          page.screenshot(
            opts.format === "png" ? {
              type: "png",
              ...clip ? { clip } : {}
            } : {
              type: "jpeg",
              quality: 80,
              ...clip ? { clip } : {}
            }
          ),
          THUMBNAIL_SCREENSHOT_TIMEOUT_MS,
          "Timed out while taking the screenshot"
        );
        return Buffer.from(screenshot);
      } catch (err) {
        console.warn(
          "[Studio] Thumbnail generation failed:",
          err instanceof Error ? err.message : err
        );
        await closeThumbnailBrowser();
        return null;
      } finally {
        await page?.close().catch(() => {
        });
      }
    },
    async listRegistryCatalog() {
      const items = getBundledRegistryItems();
      if (items) return items;
      const { listRegistryItems, loadAllItems } = await import("./resolver-NJUKCOXZ.js");
      const registry = { baseUrl: loadProjectConfig(projectDir).registry };
      const entries = await listRegistryItems(void 0, registry);
      const blockAndComponentEntries = entries.filter(
        (e) => e.type === "hyperframes:block" || e.type === "hyperframes:component"
      );
      return loadAllItems(blockAndComponentEntries, registry);
    },
    async loadRegistryPreview({ blockName }) {
      if (!bundledRegistryRoot) return null;
      return loadRegistryPreviewFromRoot(bundledRegistryRoot, blockName);
    },
    async loadRegistryPreviewAsset({ blockName, assetPath }) {
      if (!bundledRegistryRoot) return null;
      return loadRegistryPreviewAssetFromRoot(bundledRegistryRoot, blockName, assetPath);
    },
    async installRegistryBlock(opts) {
      if (bundledRegistryRoot) {
        const item2 = getBundledRegistryItem(opts.blockName);
        if (!item2) throw new Error(`Item "${opts.blockName}" not found in bundled registry`);
        const installed = installBundledRegistryItem(bundledRegistryRoot, item2, opts.project.dir);
        rewriteWrittenToHostViewport(opts.project.dir, installed.written, Boolean(item2.visualComponent));
        recordRewrittenInstall(opts.project.dir, installed.written);
        return {
          written: [...installed.written, ...installed.preserved].map((path) => relative2(realProjectRoot(opts.project.dir), path).replaceAll("\\", "/")),
          block: item2
        };
      }
      const { addToProject, primaryInstalledTarget } = await import("./add-JO6ITEV7.js");
      const { result, item } = await addToProject({
        name: opts.blockName,
        projectDir: opts.project.dir,
        skipClipboard: true,
        source: "studio"
      });
      for (const warning of result.warnings) {
        process.stderr.write(`hyperframes:registry ${warning}
`);
      }
      const written = result.written;
      rewriteWrittenToHostViewport(opts.project.dir, written, Boolean(item.visualComponent));
      recordRewrittenInstall(opts.project.dir, written);
      const root = realProjectRoot(opts.project.dir);
      const primary = primaryInstalledTarget(item);
      const primaryPath = registryTargetPath(root, primary);
      const others = written.filter((abs) => abs !== primaryPath).map((abs) => relative2(root, abs).replaceAll("\\", "/"));
      return {
        written: written.includes(primaryPath) ? [primary, ...others] : others,
        block: item
      };
    }
  };
  const app = new Hono();
  app.get("/__hyperframes_config", (c) => {
    const serve = async () => {
      const serverBuildSignature = await loadPreviewServerBuildSignature();
      return c.json({
        isHyperframes: true,
        pid: process.pid,
        projectName: projectId,
        projectDir,
        serverBuildSignature,
        version: VERSION
      });
    };
    return serve();
  });
  app.get("/api/runtime.js", (c) => {
    const serve = async () => {
      const runtimeSource = await loadRuntimeSource() ?? (existsSync2(runtimePath) ? readFileSync3(runtimePath, "utf-8") : null);
      if (!runtimeSource) return c.text("runtime not available", 404);
      return c.body(runtimeSource, 200, {
        "Content-Type": "text/javascript",
        "Cache-Control": "no-store"
      });
    };
    return serve();
  });
  app.get("/api/telemetry-identity", (c) => {
    return c.json({ distinctId: resolveCliTelemetryDistinctId() });
  });
  app.get("/api/events", (c) => {
    return streamSSE(c, async (stream) => {
      const listener = (path) => {
        const absPath = resolve2(projectDir, path);
        const version = readWatchedFileVersion(absPath);
        const receipt = version === null ? null : identifyFileWrite(absPath, version);
        void stream.writeSSE({ event: "file-change", data: JSON.stringify({
          path,
          version,
          projectId,
          affectsPreview: affectsPreview(projectDir, path),
          ...receipt
        }) }).catch(() => {
        });
      };
      watcher.addListener(listener);
      await new Promise((resolve3) => {
        const abort = () => stream.abort();
        const heartbeat = setInterval(() => {
          void stream.write(": heartbeat\n\n");
        }, 3e4);
        stream.onAbort(() => {
          clearInterval(heartbeat);
          c.req.raw.signal.removeEventListener("abort", abort);
          watcher.removeListener(listener);
          resolve3();
        });
        c.req.raw.signal.addEventListener("abort", abort, { once: true });
        if (c.req.raw.signal.aborted) abort();
        void stream.write(": connected\n\n");
      });
    });
  });
  let cachedFFmpegPath;
  app.post("/api/projects/:id/render", async (c, next) => {
    const { findFFmpeg, getFFmpegInstallHint } = await import("./ffmpeg-QIUFEFTY.js");
    if (!cachedFFmpegPath) {
      cachedFFmpegPath = findFFmpeg();
    }
    if (!cachedFFmpegPath) {
      return c.json({ error: "FFmpeg not found", hint: getFFmpegInstallHint() }, 503);
    }
    return next();
  });
  const api = createStudioApi(adapter);
  app.all("/api/*", async (c) => {
    const url = new URL(c.req.url);
    url.pathname = url.pathname.slice(4);
    const forwardReq = new Request(url.toString(), {
      method: c.req.method,
      headers: c.req.raw.headers,
      body: c.req.raw.body,
      // @ts-expect-error -- Node needs duplex for streaming bodies
      duplex: "half"
    });
    return api.fetch(forwardReq);
  });
  const serveStudioStaticFile = (c) => {
    const filePath = resolve2(studioDir, c.req.path.slice(1));
    if (!existsSync2(filePath) || !statSync2(filePath).isFile()) return c.text("not found", 404);
    const content = readFileSync3(filePath);
    return new Response(content, {
      headers: { "Content-Type": getMimeType(filePath), "Cache-Control": "no-store" }
    });
  };
  app.get("/assets/*", serveStudioStaticFile);
  app.get("/icons/*", serveStudioStaticFile);
  app.get("/favicon.svg", serveStudioStaticFile);
  function buildRuntimeEnvScript() {
    const overrides = {};
    for (const [key, value] of Object.entries(process.env)) {
      if (key.startsWith("VITE_STUDIO_") && value !== void 0) {
        overrides[key] = value;
      }
    }
    if (Object.keys(overrides).length === 0) return "";
    return `<script>window.__HF_STUDIO_ENV__=${JSON.stringify(overrides)};</script>`;
  }
  app.get("*", (c) => {
    const indexPath = resolve2(studioDir, "index.html");
    if (!existsSync2(indexPath)) {
      return c.html(
        `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HyperFrames Studio unavailable</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #0d0f14;
        color: #eef2f7;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        width: min(560px, calc(100vw - 48px));
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        padding: 28px;
        background: #151923;
      }
      h1 {
        margin: 0 0 12px;
        font-size: 22px;
        line-height: 1.2;
      }
      p {
        margin: 0 0 18px;
        color: #aab3c2;
        line-height: 1.5;
      }
      code {
        display: block;
        padding: 12px 14px;
        border-radius: 6px;
        background: #090b10;
        color: #8ff0c2;
        overflow-wrap: anywhere;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Studio bundle missing</h1>
      <p>The preview server started, but this CLI build does not contain the Studio assets.</p>
      <code>bun run build</code>
    </main>
  </body>
</html>`,
        500
      );
    }
    let html = readFileSync3(indexPath, "utf-8");
    const headScript = buildStudioHeadScripts(buildRuntimeEnvScript());
    if (headScript) {
      html = html.replace("<head>", `<head>${headScript}`);
    }
    return c.html(html);
  });
  return { app, watcher, adapter, shutdown: async () => {
    watcher.close();
    await histories.closeAll();
    await closeThumbnailBrowser();
  } };
}
export {
  closeThumbnailBrowser,
  createStudioServer,
  loadPreviewServerBuildSignature,
  resolveStudioBundle
};
