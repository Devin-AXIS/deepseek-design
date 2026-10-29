import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  mkdirWithinProject,
  realProjectRoot,
  realpath
} from "./chunk-2Z55WR76.js";
import {
  firstFrameColourArgs,
  hdrToSdrToneMapFilter,
  parseFirstFrameColour
} from "./chunk-SIG2LUMK.js";
import {
  cleanAssetUrl,
  isRemoteOrInlineUrl,
  isUnresolvedAssetPlaceholder,
  maskNonScannableRanges,
  resolveLocalAssetCandidates
} from "./chunk-JFKL3WAE.js";
import {
  rewriteAssetPath
} from "./chunk-TQFG7HTI.js";
import {
  findFfBinary
} from "./chunk-PJ3HDUCY.js";

// ../studio-server/src/helpers/mediaCodecMap.ts
import { existsSync, statSync } from "fs";
import { relative, resolve, sep } from "path";

// ../studio-server/src/helpers/mediaMetadata.ts
import { execFile } from "child_process";
import { extname } from "path";
var execFileRunner = (command, args, options) => new Promise((resolvePromise) => {
  execFile(
    command,
    args,
    { timeout: options?.timeout, maxBuffer: options?.maxBuffer, windowsHide: true },
    (error, stdout, stderr) => {
      if (error && error.code === "ENOENT") {
        resolvePromise({ status: null, stdout: "", stderr: "", error });
        return;
      }
      if (error) {
        const status = typeof error.code === "number" ? error.code : 1;
        resolvePromise({ status, stdout: stdout ?? "", stderr: stderr ?? "" });
        return;
      }
      resolvePromise({ status: 0, stdout: stdout ?? "", stderr: stderr ?? "" });
    }
  );
});
var VIDEO_EXT = /* @__PURE__ */ new Set([
  ".mp4",
  ".mov",
  ".webm",
  ".mkv",
  ".avi",
  ".m4v",
  ".mxf",
  ".mts",
  ".m2ts",
  ".ts"
]);
var IMAGE_EXT = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
var AUDIO_EXT = /* @__PURE__ */ new Set([".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac"]);
function lower(value) {
  return value?.toLowerCase() ?? "";
}
function inferKindFromPath(path) {
  const ext = extname(path).toLowerCase();
  if (VIDEO_EXT.has(ext)) return "video";
  if (IMAGE_EXT.has(ext)) return "image";
  if (AUDIO_EXT.has(ext)) return "audio";
  return "unknown";
}
function colorLabel(input) {
  if (input.isHdr) {
    if (input.hdrTransfer === "pq") return "HDR PQ";
    if (input.hdrTransfer === "hlg") return "HDR HLG";
    return "HDR";
  }
  if (input.colorPrimaries.includes("bt709") || input.colorSpace.includes("bt709") || input.colorTransfer.includes("bt709")) {
    return "SDR Rec.709";
  }
  return "SDR/unknown";
}
var ALPHA_PIX_FMT_RE = /^(?:yuva|rgba|argb|bgra|abgr|gbrap|ya)/;
function pixelFormatHasAlpha(pixFmt) {
  return pixFmt !== void 0 && ALPHA_PIX_FMT_RE.test(pixFmt.toLowerCase());
}
function classifyMediaColor(stream) {
  const colorPrimaries = lower(stream?.color_primaries);
  const colorSpace = lower(stream?.color_space);
  const colorTransfer = lower(stream?.color_transfer);
  const isHdr = colorPrimaries.includes("bt2020") || colorSpace.includes("bt2020") || colorTransfer === "smpte2084" || colorTransfer === "arib-std-b67";
  const hdrTransfer = isHdr ? colorTransfer === "smpte2084" ? "pq" : colorTransfer === "arib-std-b67" ? "hlg" : "unknown" : null;
  return {
    dynamicRange: stream ? isHdr ? "hdr" : "sdr" : "unknown",
    hdrTransfer,
    label: stream ? colorLabel({ isHdr, hdrTransfer, colorPrimaries, colorSpace, colorTransfer }) : "Unknown",
    isHdr,
    codecName: stream?.codec_name,
    profile: stream?.profile,
    pixelFormat: stream?.pix_fmt,
    // WebM stores VP8/VP9 alpha separately; ffprobe can still report yuv420p.
    hasAlpha: pixelFormatHasAlpha(stream?.pix_fmt) || Object.entries(stream?.tags ?? {}).some(
      ([key, value]) => key.toLowerCase() === "alpha_mode" && String(value) === "1"
    ),
    colorSpace: stream?.color_space,
    colorTransfer: stream?.color_transfer,
    colorPrimaries: stream?.color_primaries,
    bitsPerRawSample: stream?.bits_per_raw_sample
  };
}
async function probeFirstFrameColour(filePath, runner = execFileRunner) {
  const ffmpegPath = findFfBinary("ffmpeg", { configuredMustExist: true }) ?? (runner === execFileRunner ? void 0 : "ffmpeg");
  if (!ffmpegPath) return {};
  const result = await runner(ffmpegPath, firstFrameColourArgs(filePath), {
    timeout: 15e3,
    maxBuffer: 1024 * 1024
  });
  return result.status === 0 ? parseFirstFrameColour(String(result.stderr)) : {};
}
async function probeMediaMetadata(filePath, runner = execFileRunner) {
  const kind = inferKindFromPath(filePath);
  if (kind === "audio" || kind === "unknown") {
    return { kind, color: classifyMediaColor(null) };
  }
  const ffprobePath = findFfBinary("ffprobe", { configuredMustExist: true }) ?? (runner === execFileRunner ? void 0 : "ffprobe");
  if (!ffprobePath) {
    return { kind, color: classifyMediaColor(null), probeError: "ffprobe unavailable" };
  }
  const result = await runner(
    ffprobePath,
    [
      "-v",
      "error",
      "-show_entries",
      "stream=codec_type,codec_name,profile,pix_fmt,color_space,color_transfer,color_primaries,bits_per_raw_sample:stream_disposition=attached_pic:stream_tags=alpha_mode",
      "-of",
      "json",
      "--",
      filePath
    ],
    { timeout: 15e3, maxBuffer: 1024 * 1024 }
  );
  if (result.error?.code === "ENOENT") {
    return { kind, color: classifyMediaColor(null), probeError: "ffprobe unavailable" };
  }
  if (result.status !== 0) {
    return { kind, color: classifyMediaColor(null), probeError: "ffprobe failed" };
  }
  try {
    const parsed = JSON.parse(String(result.stdout || "{}"));
    const stream = parsed.streams?.find((item) => {
      if (kind === "image") return item.codec_type === "video";
      return item.codec_type === kind && item.disposition?.attached_pic !== 1;
    });
    const metadata = { kind, color: classifyMediaColor(stream) };
    if (kind === "video") {
      metadata.hasAudio = (parsed.streams ?? []).some((item) => item.codec_type === "audio");
    }
    return metadata;
  } catch {
    return { kind, color: classifyMediaColor(null), probeError: "ffprobe returned invalid json" };
  }
}

// ../studio-server/src/helpers/mediaCodecMap.ts
var BROWSER_HOSTILE_CODECS = {
  // HEVC decode is platform-bound, not absent: macOS Chrome answers
  // canPlayType with "probably" and keeps the source, while Chrome on
  // Windows/Linux and Firefox everywhere need the substitute.
  hevc: { representativeMime: 'video/mp4; codecs="hvc1.1.6.L120.B0"', prewarm: true },
  prores: { representativeMime: null, prewarm: true },
  // Every mainstream engine decodes AV1 and VP9, so canPlayType keeps the
  // original and only the rare browser that cannot pays for a transcode.
  av1: { representativeMime: 'video/mp4; codecs="av01.0.08M.08"', prewarm: false },
  vp9: { representativeMime: 'video/webm; codecs="vp09.00.10.08"', prewarm: false }
};
function hostileCodecEntry(codecName) {
  return Object.hasOwn(BROWSER_HOSTILE_CODECS, codecName) ? BROWSER_HOSTILE_CODECS[codecName] : void 0;
}
function shouldPrewarmProxy(facts) {
  return hostileCodecEntry(facts.codecName)?.prewarm === true;
}
var proxyDemand = { prewarmsRequested: 0, proxyRequests: 0 };
function writeDemandLine(event) {
  try {
    process.stderr.write(
      `[hyperframes:media-proxy] ${JSON.stringify({ event, ...proxyDemand })}
`
    );
  } catch {
  }
}
function isMediaProxyDebugEnabled() {
  const value = process.env.HYPERFRAMES_DEBUG_MEDIA_PROXY;
  return value === "1" || value === "true";
}
var summaryHookInstalled = false;
function recordProxyPrewarm() {
  proxyDemand.prewarmsRequested++;
  if (!summaryHookInstalled) {
    summaryHookInstalled = true;
    process.once("exit", () => writeDemandLine("summary"));
  }
  if (isMediaProxyDebugEnabled()) writeDemandLine("prewarm_requested");
}
function recordProxyRequest() {
  proxyDemand.proxyRequests++;
}
var PROXY_VARIANT_CONFIG = {
  h264: { extension: ".mp4", contentType: "video/mp4" },
  vp8: { extension: ".webm", contentType: "video/webm" }
};
function isProxyVariant(value) {
  return Object.hasOwn(PROXY_VARIANT_CONFIG, value);
}
function isProxyVariantRequest(value) {
  return value === "auto" || isProxyVariant(value);
}
function proxyVariantFor(facts) {
  return facts.hasAlpha ? "vp8" : "h264";
}
function resolveProxyVariantRequest(request, facts) {
  const expected = proxyVariantFor(facts);
  return request === "auto" || request === expected ? expected : null;
}
function decideMediaProxyEligibility(facts) {
  if (!facts) return { eligible: false, reason: "unknown_codec" };
  if (!facts.browserHostile) return { eligible: false, reason: "browser_safe_codec" };
  return { eligible: true };
}
function codecFactsFor(codecName, hasAlpha) {
  const hostile = hostileCodecEntry(codecName);
  return {
    codecName,
    browserHostile: hostile !== void 0,
    representativeMime: hostile?.representativeMime ?? null,
    hasAlpha
  };
}
async function probeCodecFacts(filePath, runner) {
  const metadata = runner ? await probeMediaMetadata(filePath, runner) : await probeMediaMetadata(filePath);
  if (metadata.probeError) return void 0;
  if (metadata.kind !== "video") return null;
  const codecName = metadata.color.codecName;
  if (!codecName) return null;
  return codecFactsFor(codecName, metadata.color.hasAlpha === true);
}
function createMediaCodecProbeCache() {
  return /* @__PURE__ */ new Map();
}
var defaultProbeCache = /* @__PURE__ */ new Map();
var MAX_PROBE_CACHE_ENTRIES = 512;
function rememberProbeResult(cache, filePath, result) {
  if (!cache.has(filePath) && cache.size >= MAX_PROBE_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.delete(filePath);
  cache.set(filePath, result);
}
async function probeAssetCodec(filePath, runner, cache = defaultProbeCache) {
  let stat;
  let target;
  try {
    stat = statSync(filePath);
    target = realpath(filePath);
  } catch {
    return null;
  }
  const cached = cache.get(filePath);
  if (cached && cached.target === target && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
    rememberProbeResult(cache, filePath, cached);
    return cached.facts;
  }
  const facts = await probeCodecFacts(filePath, runner);
  if (facts === void 0) return null;
  rememberProbeResult(cache, filePath, { target, mtimeMs: stat.mtimeMs, size: stat.size, facts });
  return facts;
}
var VIDEO_SRC_RE = /<video\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
function resolveExistingLocalAsset(projectDir, url) {
  const projectRoot = resolve(projectDir);
  const resolvedPath = resolveLocalAssetCandidates(projectRoot, url).find(
    (candidate) => existsSync(candidate)
  );
  if (!resolvedPath) return null;
  const rootRelative = relative(projectRoot, resolvedPath).split(sep).join("/");
  return { resolvedPath, rootRelativePathname: `/${rootRelative}` };
}
function collectLocalVideoAssets(projectDir, htmlSources) {
  const candidates = /* @__PURE__ */ new Map();
  for (const { html, compSrcPath } of htmlSources) {
    const scannable = maskNonScannableRanges(html);
    const re = new RegExp(VIDEO_SRC_RE.source, VIDEO_SRC_RE.flags);
    let match;
    while ((match = re.exec(scannable)) !== null) {
      const rawSrc = match[1] ?? "";
      if (isUnresolvedAssetPlaceholder(rawSrc)) continue;
      const src = cleanAssetUrl(rawSrc);
      if (!src || isRemoteOrInlineUrl(src)) continue;
      const rootRelativeSrc = compSrcPath ? rewriteAssetPath(compSrcPath, src) : src;
      const resolved = resolveExistingLocalAsset(projectDir, rootRelativeSrc);
      if (!resolved) continue;
      candidates.set(resolved.resolvedPath, resolved.rootRelativePathname);
    }
  }
  return candidates;
}
var PROBE_CONCURRENCY = 8;
async function scanProjectMediaCodecMap(projectDir, htmlSources, options = {}) {
  const candidates = collectLocalVideoAssets(projectDir, htmlSources);
  if (candidates.size === 0) return {};
  const cache = options.cache ?? defaultProbeCache;
  const entries = [...candidates.entries()];
  const facts = new Array(entries.length).fill(null);
  let nextIndex = 0;
  const workerCount = Math.min(PROBE_CONCURRENCY, entries.length);
  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextIndex < entries.length) {
        const index = nextIndex++;
        const entry = entries[index];
        if (!entry) break;
        facts[index] = await probeAssetCodec(entry[0], options.runner, cache);
      }
    })
  );
  const map = {};
  entries.forEach(([, pathname], index) => {
    const entryFacts = facts[index];
    if (entryFacts?.browserHostile) map[pathname] = entryFacts;
  });
  return map;
}

// ../studio-server/src/helpers/proxyCache.ts
import { existsSync as existsSync2, readdirSync, statSync as statSync2, unlinkSync } from "fs";
import { extname as extname2, join } from "path";
var DEFAULT_MAX_BYTES = 10 * 1024 * 1024 * 1024;
var DEFAULT_STALE_TEMP_MS = 60 * 60 * 1e3;
var DEFAULT_MIN_SWEEP_INTERVAL_MS = 5 * 60 * 1e3;
var PROXY_EXTENSIONS = new Set(
  Object.values(PROXY_VARIANT_CONFIG).map(({ extension }) => extension)
);
var TRANSCODER_PROXY_NAME = /^[0-9a-f]{64}\.\w+$/;
var TRANSCODER_TEMP_NAME = /^\.tmp-[0-9a-f-]{36}-[0-9a-f]{64}\.\w+$/;
var lastSweepAt = /* @__PURE__ */ new Map();
var MAX_TRACKED_CACHE_DIRS = 128;
function positiveEnvNumber(name, fallback) {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function proxyCacheCleanupDefaults() {
  return {
    maxBytes: positiveEnvNumber("HYPERFRAMES_PROXY_CACHE_MAX_BYTES", DEFAULT_MAX_BYTES),
    maxIdleMs: positiveEnvNumber("HYPERFRAMES_PROXY_CACHE_MAX_IDLE_DAYS", 30) * 24 * 60 * 60 * 1e3,
    staleTempMs: positiveEnvNumber("HYPERFRAMES_PROXY_CACHE_STALE_TEMP_MS", DEFAULT_STALE_TEMP_MS),
    minSweepIntervalMs: positiveEnvNumber(
      "HYPERFRAMES_PROXY_CACHE_SWEEP_INTERVAL_MS",
      DEFAULT_MIN_SWEEP_INTERVAL_MS
    )
  };
}
function shouldSkipSweep(cacheDir, now, minSweepIntervalMs) {
  const previousSweep = lastSweepAt.get(cacheDir);
  if (previousSweep !== void 0 && now - previousSweep < minSweepIntervalMs) return true;
  lastSweepAt.delete(cacheDir);
  lastSweepAt.set(cacheDir, now);
  while (lastSweepAt.size > MAX_TRACKED_CACHE_DIRS) {
    const oldest = lastSweepAt.keys().next().value;
    if (oldest === void 0) break;
    lastSweepAt.delete(oldest);
  }
  return false;
}
function readCacheInventory(cacheDir, protectedPaths, now, staleTempMs) {
  const entries = [];
  const staleTemps = [];
  for (const dirent of readdirSync(cacheDir, { withFileTypes: true })) {
    if (!dirent.isFile()) continue;
    const path = join(cacheDir, dirent.name);
    const stat = statSync2(path);
    const entry = {
      path,
      size: stat.size,
      modifiedAt: stat.mtimeMs,
      protected: protectedPaths.has(path)
    };
    if (TRANSCODER_TEMP_NAME.test(dirent.name)) {
      if (now - stat.mtimeMs >= staleTempMs) staleTemps.push(entry);
    } else if (TRANSCODER_PROXY_NAME.test(dirent.name) && PROXY_EXTENSIONS.has(extname2(dirent.name))) {
      entries.push(entry);
    }
  }
  const oldestFirst = (a, b) => a.modifiedAt - b.modifiedAt || a.path.localeCompare(b.path);
  entries.sort(oldestFirst);
  staleTemps.sort(oldestFirst);
  return { entries, staleTemps };
}
function evictCacheEntries(entries, staleTemps, now, maxIdleMs, maxBytes, dryRun) {
  const bytesBefore = entries.reduce((total, entry) => total + entry.size, 0);
  let bytesAfter = bytesBefore;
  const removed = [];
  const remove = (entry, countsTowardBudget) => {
    if (!dryRun) unlinkSync(entry.path);
    removed.push(entry.path);
    if (countsTowardBudget) bytesAfter -= entry.size;
  };
  for (const entry of staleTemps) remove(entry, false);
  const kept = [];
  for (const entry of entries) {
    if (!entry.protected && now - entry.modifiedAt >= maxIdleMs) remove(entry, true);
    else kept.push(entry);
  }
  for (const entry of kept) {
    if (bytesAfter <= maxBytes) break;
    if (!entry.protected && existsSync2(entry.path)) remove(entry, true);
  }
  return { removed, bytesBefore, bytesAfter };
}
function cleanupProxyCache(cacheDir, options = {}) {
  const defaults = proxyCacheCleanupDefaults();
  const now = options.now ?? Date.now();
  const minSweepIntervalMs = options.minSweepIntervalMs ?? defaults.minSweepIntervalMs;
  if (shouldSkipSweep(cacheDir, now, minSweepIntervalMs)) {
    return { removed: [], bytesBefore: 0, bytesAfter: 0, skipped: true };
  }
  if (!existsSync2(cacheDir)) {
    return { removed: [], bytesBefore: 0, bytesAfter: 0, skipped: false };
  }
  const maxBytes = options.maxBytes ?? defaults.maxBytes;
  const maxIdleMs = options.maxIdleMs ?? defaults.maxIdleMs;
  const staleTempMs = options.staleTempMs ?? defaults.staleTempMs;
  const protectedPaths = options.protectedPaths ?? /* @__PURE__ */ new Set();
  const { entries, staleTemps } = readCacheInventory(cacheDir, protectedPaths, now, staleTempMs);
  return {
    ...evictCacheEntries(entries, staleTemps, now, maxIdleMs, maxBytes, options.dryRun ?? false),
    skipped: false
  };
}

// ../studio-server/src/helpers/proxyTranscoder.ts
import { spawn } from "child_process";
import { createHash, randomUUID } from "crypto";
import { existsSync as existsSync3, renameSync, statSync as statSync3, unlinkSync as unlinkSync2, utimesSync } from "fs";
import { basename, dirname, isAbsolute, join as join2, relative as relative2, resolve as resolve2, sep as sep2 } from "path";
var PROXY_PARAMS_VERSION = "v5";
var CACHE_DIR_NAME = ".transcode-cache";
function boundedEnvInteger(name, fallback, min, max) {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
}
var MAX_CONCURRENT_TRANSCODES = boundedEnvInteger("HYPERFRAMES_PROXY_MAX_CONCURRENCY", 2, 1, 16);
var MAX_QUEUED_TRANSCODES = boundedEnvInteger("HYPERFRAMES_PROXY_MAX_QUEUE", 8, 0, 256);
var STDERR_TAIL_MAX_CHARS = 4e3;
var TRANSCODE_TIMEOUT_MS = 15 * 60 * 1e3;
var FAILURE_CACHE_TTL_MS = 60 * 1e3;
var PROXY_PENDING_RETRY_AFTER_SECONDS = 2;
var ENVIRONMENT_FAILURE_TTL_MS = 5 * PROXY_PENDING_RETRY_AFTER_SECONDS * 1e3;
var MAX_FAILURE_CACHE_ENTRIES = 128;
var DEFAULT_PROXY_WAIT_TIMEOUT_MS = 2 * 60 * 1e3;
var ProxyTranscodeError = class extends Error {
  exitCode;
  stderrTail;
  constructor(message, exitCode, stderrTail) {
    super(message);
    this.name = "ProxyTranscodeError";
    this.exitCode = exitCode;
    this.stderrTail = stderrTail;
  }
};
var FfmpegUnavailableError = class extends ProxyTranscodeError {
  constructor() {
    super("ffmpeg binary not found", null, "");
  }
};
var FfmpegMissingFilterError = class extends ProxyTranscodeError {
  constructor() {
    super(
      "HDR proxying requires ffmpeg zscale/tonemap filters (libzimg); install an ffmpeg build with libzimg support",
      null,
      ""
    );
    this.name = "FfmpegMissingFilterError";
  }
};
var ProxyCapacityError = class extends ProxyTranscodeError {
  constructor() {
    super("media proxy queue is full; retry shortly", null, "");
    this.name = "ProxyCapacityError";
  }
};
var ProxySourceOutsideProjectError = class extends ProxyTranscodeError {
  constructor() {
    super("media proxy source must be addressed through the project", null, "");
    this.name = "ProxySourceOutsideProjectError";
  }
};
var ProxyWaitTimeoutError = class extends ProxyTranscodeError {
  constructor(timeoutMs) {
    super(`media proxy did not become ready within ${timeoutMs}ms`, null, "");
    this.name = "ProxyWaitTimeoutError";
  }
};
async function waitForProxy(promise, timeoutMs = DEFAULT_PROXY_WAIT_TIMEOUT_MS) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_resolve, reject) => {
        timer = setTimeout(() => reject(new ProxyWaitTimeoutError(timeoutMs)), timeoutMs);
        timer.unref();
      })
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
function canonicalizeProxySource(projectDir, absoluteSourcePath) {
  const requestedProjectDir = resolve2(projectDir);
  const requestedSourcePath = resolve2(absoluteSourcePath);
  const requestedRelativePath = relative2(requestedProjectDir, requestedSourcePath);
  if (requestedRelativePath === ".." || requestedRelativePath.startsWith(`..${sep2}`) || isAbsolute(requestedRelativePath)) {
    throw new ProxySourceOutsideProjectError();
  }
  const canonicalProjectDir = realProjectRoot(projectDir);
  const canonicalSourcePath = realpath(absoluteSourcePath);
  const canonicalRelativePath = relative2(canonicalProjectDir, canonicalSourcePath);
  const sourceIsInsideCanonicalProject = canonicalRelativePath !== ".." && !canonicalRelativePath.startsWith(`..${sep2}`) && !isAbsolute(canonicalRelativePath);
  return {
    projectDir: canonicalProjectDir,
    sourcePath: canonicalSourcePath,
    relativePath: requestedRelativePath.normalize("NFC"),
    // An external target needs a stable identity in addition to its project-local
    // symlink path, otherwise retargeting the link can reuse an unrelated proxy.
    cacheIdentity: (sourceIsInsideCanonicalProject ? canonicalRelativePath : canonicalSourcePath).normalize("NFC")
  };
}
function buildProxyCacheKey(source, variant) {
  const stat = statSync3(source.sourcePath);
  return createHash("sha256").update(
    `${source.relativePath}\0${source.cacheIdentity}\0${stat.mtimeMs}\0${stat.size}\0${PROXY_PARAMS_VERSION}\0${variant}`
  ).digest("hex");
}
function getCanonicalProxyCachePath(source, variant) {
  const key = buildProxyCacheKey(source, variant);
  return join2(
    source.projectDir,
    CACHE_DIR_NAME,
    `${key}${PROXY_VARIANT_CONFIG[variant].extension}`
  );
}
var activeTranscodes = 0;
var waitQueue = [];
function acquireSlot() {
  return new Promise((resolveSlot, reject) => {
    const tryAcquire = () => {
      if (activeTranscodes < MAX_CONCURRENT_TRANSCODES) {
        activeTranscodes++;
        resolveSlot();
      } else {
        if (waitQueue.length >= MAX_QUEUED_TRANSCODES) {
          reject(new ProxyCapacityError());
          return;
        }
        waitQueue.push(tryAcquire);
      }
    };
    tryAcquire();
  });
}
function releaseSlot() {
  activeTranscodes--;
  const next = waitQueue.shift();
  if (next) next();
}
var inFlight = /* @__PURE__ */ new Map();
function maintainProxyCache(cacheDir) {
  try {
    cleanupProxyCache(cacheDir, { protectedPaths: new Set(inFlight.keys()) });
  } catch (error) {
    console.warn(
      `[media-proxy] cache cleanup failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function markCacheEntryUsed(cachePath) {
  try {
    const now = /* @__PURE__ */ new Date();
    utimesSync(cachePath, now, now);
  } catch {
  }
}
var failedTranscodes = /* @__PURE__ */ new Map();
var hdrFilterCheck;
function ensureHdrFilters(ffmpegPath) {
  if (hdrFilterCheck?.ffmpegPath === ffmpegPath) return hdrFilterCheck.promise;
  const promise = new Promise((resolveCheck, rejectCheck) => {
    const proc = spawn(ffmpegPath, ["-hide_banner", "-filters"], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });
    let stdout = "";
    proc.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    proc.on("error", () => rejectCheck(new FfmpegMissingFilterError()));
    proc.on("close", (code) => {
      if (code !== 0 || !/\bzscale\b/.test(stdout) || !/\btonemap\b/.test(stdout)) {
        rejectCheck(new FfmpegMissingFilterError());
      } else {
        resolveCheck();
      }
    });
  });
  hdrFilterCheck = { ffmpegPath, promise };
  return promise;
}
function rememberFailure(cachePath, error) {
  const ttlMs = error instanceof FfmpegUnavailableError || error instanceof FfmpegMissingFilterError ? ENVIRONMENT_FAILURE_TTL_MS : FAILURE_CACHE_TTL_MS;
  failedTranscodes.delete(cachePath);
  failedTranscodes.set(cachePath, { error, expiresAt: Date.now() + ttlMs });
  while (failedTranscodes.size > MAX_FAILURE_CACHE_ENTRIES) {
    const oldest = failedTranscodes.keys().next().value;
    if (oldest === void 0) break;
    failedTranscodes.delete(oldest);
  }
}
async function runFfmpeg(sourcePath, outputPath, variant) {
  const metadata = await probeMediaMetadata(sourcePath);
  const ffmpegPath = findFfBinary("ffmpeg", { configuredMustExist: true });
  if (!ffmpegPath) {
    throw new FfmpegUnavailableError();
  }
  const keepsAlpha = variant === "vp8";
  const { hdrTransfer } = metadata.color;
  const toneMap = (hdrTransfer === "pq" || hdrTransfer === "hlg") && !keepsAlpha;
  if (toneMap) await ensureHdrFilters(ffmpegPath);
  const firstFrame = toneMap ? await probeFirstFrameColour(sourcePath) : {};
  const evenScale = "scale=trunc(iw/2)*2:trunc(ih/2)*2";
  const pixelFormat = keepsAlpha ? "yuva420p" : "yuv420p";
  const videoFilter = toneMap ? [
    hdrToSdrToneMapFilter(metadata.color, firstFrame),
    `${evenScale}:out_color_matrix=bt709:out_range=tv`,
    `format=${pixelFormat}`
  ].join(",") : [evenScale, `format=${pixelFormat}`].join(",");
  return new Promise((resolvePromise, reject) => {
    const commonArgs = ["-y", "-i", sourcePath, "-vf", videoFilter];
    const h264Args = [
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-pix_fmt",
      "yuv420p",
      "-colorspace",
      "bt709",
      "-color_primaries",
      "bt709",
      "-color_trc",
      "bt709",
      "-crf",
      "18",
      "-preset",
      "veryfast",
      "-c:a",
      "aac",
      "-movflags",
      "+faststart"
    ];
    const vp8Args = [
      "-c:v",
      "libvpx",
      "-b:v",
      "0",
      "-crf",
      "23",
      "-deadline",
      "good",
      "-pix_fmt",
      "yuva420p",
      "-colorspace",
      "bt709",
      "-color_primaries",
      "bt709",
      "-color_trc",
      "bt709",
      "-cpu-used",
      "4",
      "-auto-alt-ref",
      "0",
      "-metadata:s:v:0",
      "alpha_mode=1",
      "-ac",
      "2",
      "-c:a",
      "libopus"
    ];
    const args = [...commonArgs, ...variant === "vp8" ? vp8Args : h264Args, outputPath];
    const proc = spawn(ffmpegPath, args, {
      stdio: ["ignore", "ignore", "pipe"],
      timeout: TRANSCODE_TIMEOUT_MS,
      killSignal: "SIGKILL",
      windowsHide: true
    });
    let stderrTail = "";
    proc.stderr?.on("data", (chunk) => {
      stderrTail = (stderrTail + chunk.toString()).slice(-STDERR_TAIL_MAX_CHARS);
    });
    proc.on("error", (err) => {
      reject(new ProxyTranscodeError(`failed to spawn ffmpeg: ${err.message}`, null, stderrTail));
    });
    proc.on("close", (code, signal) => {
      if (code === 0) {
        resolvePromise();
      } else if (signal) {
        reject(
          new ProxyTranscodeError(
            `ffmpeg killed by ${signal} (timeout ${TRANSCODE_TIMEOUT_MS}ms or external kill)`,
            null,
            stderrTail
          )
        );
      } else {
        reject(new ProxyTranscodeError(`ffmpeg exited with code ${code}`, code, stderrTail));
      }
    });
  });
}
async function transcodeToCache(projectDir, absoluteSourcePath, cachePath, variant) {
  await acquireSlot();
  try {
    if (existsSync3(cachePath)) return cachePath;
    const cacheDir = dirname(cachePath);
    mkdirWithinProject(projectDir, cacheDir);
    const tempPath = join2(cacheDir, `.tmp-${randomUUID()}-${basename(cachePath)}`);
    try {
      await runFfmpeg(absoluteSourcePath, tempPath, variant);
      renameSync(tempPath, cachePath);
      maintainProxyCache(cacheDir);
      return cachePath;
    } finally {
      if (existsSync3(tempPath)) unlinkSync2(tempPath);
    }
  } finally {
    releaseSlot();
  }
}
var settledProxyCount = 0;
function proxyActivityMark(projectDir) {
  if (!existsSync3(projectDir)) return String(settledProxyCount);
  const cacheDir = join2(realpath(projectDir), CACHE_DIR_NAME) + sep2;
  for (const cachePath of inFlight.keys()) if (cachePath.startsWith(cacheDir)) return null;
  return String(settledProxyCount);
}
async function resolveProxy(projectDir, absoluteSourcePath, variant = "h264") {
  const source = canonicalizeProxySource(projectDir, absoluteSourcePath);
  const cachePath = getCanonicalProxyCachePath(source, variant);
  if (existsSync3(cachePath)) {
    markCacheEntryUsed(cachePath);
    maintainProxyCache(dirname(cachePath));
    return cachePath;
  }
  const rememberedFailure = failedTranscodes.get(cachePath);
  if (rememberedFailure) {
    if (rememberedFailure.expiresAt > Date.now()) throw rememberedFailure.error;
    failedTranscodes.delete(cachePath);
  }
  const existing = inFlight.get(cachePath);
  if (existing) return existing;
  const promise = transcodeToCache(source.projectDir, source.sourcePath, cachePath, variant).catch((err) => {
    if (!(err instanceof ProxyCapacityError)) rememberFailure(cachePath, err);
    throw err;
  }).finally(() => {
    inFlight.delete(cachePath);
    settledProxyCount += 1;
  });
  inFlight.set(cachePath, promise);
  return promise;
}

export {
  probeMediaMetadata,
  shouldPrewarmProxy,
  recordProxyPrewarm,
  recordProxyRequest,
  PROXY_VARIANT_CONFIG,
  isProxyVariantRequest,
  proxyVariantFor,
  resolveProxyVariantRequest,
  decideMediaProxyEligibility,
  createMediaCodecProbeCache,
  probeAssetCodec,
  scanProjectMediaCodecMap,
  cleanupProxyCache,
  PROXY_PARAMS_VERSION,
  CACHE_DIR_NAME,
  TRANSCODE_TIMEOUT_MS,
  PROXY_PENDING_RETRY_AFTER_SECONDS,
  ProxyTranscodeError,
  ProxyCapacityError,
  ProxyWaitTimeoutError,
  waitForProxy,
  proxyActivityMark,
  resolveProxy
};
