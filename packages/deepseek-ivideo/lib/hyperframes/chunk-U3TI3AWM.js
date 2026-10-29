import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  DEFAULT_VP9_CPU_USED,
  isHttpUrl,
  runFfmpeg
} from "./chunk-3NHZZLH3.js";
import {
  parseAnimatedGifMetadata
} from "./chunk-SIG2LUMK.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";

// ../producer/src/services/animatedGifPrep.ts
import { createHash } from "crypto";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync
} from "fs";
import { dirname, isAbsolute, join, resolve } from "path";

// ../producer/src/services/render/encoderInterruption.ts
var ENCODER_INTERRUPTED = "ENCODER_INTERRUPTED";
var EncoderInterruptedError = class extends Error {
  code = ENCODER_INTERRUPTED;
  owner = "system";
  retryable = true;
  /** Retained inside the producer for diagnostics; never copied to the wire envelope. */
  diagnosticMessage;
  constructor(prefix, diagnosticMessage) {
    super(`${prefix}: encoder process was interrupted by the host lifecycle`);
    this.name = "EncoderInterruptedError";
    this.diagnosticMessage = diagnosticMessage;
  }
};
function encoderFailureError(prefix, result) {
  const message = `${prefix}: ${result.error ?? "unknown encoder failure"}`;
  return result.failureReason === "external_interruption" ? new EncoderInterruptedError(prefix, message) : new Error(message);
}

// ../producer/src/services/animatedGifPrep.ts
var PREPARED_GIF_SUBDIR = "_animated_gif";
var CACHE_SCHEMA = "hfgif-v1";
function splitUrlSuffix(src) {
  const queryIdx = src.indexOf("?");
  const hashIdx = src.indexOf("#");
  if (queryIdx < 0 && hashIdx < 0) return { basePath: src, suffix: "" };
  const cutIdx = queryIdx < 0 ? hashIdx : hashIdx < 0 ? queryIdx : Math.min(queryIdx, hashIdx);
  return { basePath: src.slice(0, cutIdx), suffix: src.slice(cutIdx) };
}
function normalizeRelPath(path) {
  return path.replace(/\\/g, "/").replace(/^\/+/, "");
}
function hasGifExtension(src) {
  const { basePath } = splitUrlSuffix(src.trim().toLowerCase());
  return basePath.endsWith(".gif");
}
function readLoopOverride(el) {
  const raw = el.getAttribute("data-loop");
  if (raw == null) return null;
  const normalized = raw.trim().toLowerCase();
  if (normalized === "" || normalized === "true" || normalized === "1" || normalized === "yes") {
    return true;
  }
  if (normalized === "false" || normalized === "0" || normalized === "no") {
    return false;
  }
  return null;
}
function resolveGifSourcePath(src, options) {
  const trimmed = src.trim();
  if (!trimmed || trimmed.startsWith("data:")) return null;
  const { basePath } = splitUrlSuffix(trimmed);
  const normalizedBase = normalizeRelPath(basePath);
  const mapped = options.sourceAssets?.get(trimmed) ?? options.sourceAssets?.get(basePath) ?? options.sourceAssets?.get(normalizedBase);
  if (mapped && existsSync(mapped)) return mapped;
  if (isHttpUrl(trimmed)) return null;
  const projectRelative = basePath.startsWith("/") ? basePath.slice(1) : basePath;
  const candidates = [
    isAbsolute(basePath) ? basePath : resolve(options.projectDir, projectRelative),
    resolve(options.downloadDir, normalizedBase)
  ];
  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}
function isUsableFile(path) {
  try {
    const stat = statSync(path);
    return stat.isFile() && stat.size > 0;
  } catch {
    return false;
  }
}
function computePreparedGifHash(bytes, loopIterations, padSeconds) {
  return createHash("sha256").update(CACHE_SCHEMA).update("\0").update(String(loopIterations)).update("\0").update(String(padSeconds)).update("\0").update(bytes).digest("hex");
}
function resolveLoop(metadata, override) {
  if (override != null) return override;
  return metadata.loopCount === 0;
}
var MAX_LOOP_ITERATIONS = 1e3;
var MAX_PAD_SECONDS = 3600;
function resolveCompositionDurationSeconds(document) {
  let max = null;
  for (const el of Array.from(document.querySelectorAll("[data-composition-id][data-duration]"))) {
    const value = Number.parseFloat(el.getAttribute("data-duration") || "");
    if (Number.isFinite(value) && value > 0) {
      max = max == null ? value : Math.max(max, value);
    }
  }
  return max;
}
function resolveClipWindowSeconds(img, compositionDuration) {
  const durationRaw = img.getAttribute("data-duration");
  if (durationRaw != null) {
    const duration = Number.parseFloat(durationRaw);
    if (Number.isFinite(duration) && duration > 0) return duration;
  }
  if (compositionDuration != null) {
    const startRaw = Number.parseFloat(img.getAttribute("data-start") || "0");
    const start = Number.isFinite(startRaw) && startRaw > 0 ? startRaw : 0;
    const window = compositionDuration - start;
    return window > 0 ? window : null;
  }
  return null;
}
function resolvePreparedPlayback(metadata, loop, windowSeconds) {
  const gifDuration = metadata.durationSeconds > 0 ? metadata.durationSeconds : null;
  let loopIterations = 1;
  if (loop) {
    loopIterations = windowSeconds != null && gifDuration != null ? Math.min(MAX_LOOP_ITERATIONS, Math.max(1, Math.ceil(windowSeconds / gifDuration))) : 1;
  } else if (metadata.loopCount != null && metadata.loopCount > 1) {
    loopIterations = Math.min(MAX_LOOP_ITERATIONS, metadata.loopCount);
  }
  let padSeconds = 0;
  if (windowSeconds != null && gifDuration != null) {
    const covered = gifDuration * loopIterations;
    if (windowSeconds > covered) {
      padSeconds = Math.min(windowSeconds - covered, MAX_PAD_SECONDS);
    }
  }
  return { loopIterations, padSeconds: Math.round(padSeconds * 1e3) / 1e3 };
}
function buildAnimatedGifTranscodeArgs(input) {
  const args = ["-hide_banner", "-loglevel", "error"];
  if (input.loopIterations > 1) {
    args.push("-stream_loop", String(input.loopIterations - 1));
  }
  args.push(
    "-ignore_loop",
    "1",
    "-i",
    input.inputPath,
    "-an",
    "-c:v",
    "libvpx-vp9",
    "-pix_fmt",
    "yuva420p",
    "-auto-alt-ref",
    "0",
    "-deadline",
    "good",
    "-cpu-used",
    String(DEFAULT_VP9_CPU_USED),
    "-crf",
    "18",
    "-b:v",
    "0",
    ...input.padSeconds && input.padSeconds > 0 ? ["-vf", `tpad=stop_mode=clone:stop_duration=${input.padSeconds}`] : [],
    // Explicit muxer: the transcode writes to a `.tmp-<pid>-<ts>` path whose
    // extension ffmpeg cannot infer the container from.
    "-f",
    "webm",
    "-y",
    input.outputPath
  );
  return args;
}
async function runAnimatedGifTranscode(request) {
  const timeout = request.timeoutMs ?? 3e5;
  const result = await runFfmpeg(request.args, { timeout });
  if (result.success) return;
  if (result.failureReason === "external_interruption") {
    throw encoderFailureError("Animated GIF transcode failed", {
      error: `exit ${result.exitCode}: ${result.stderr.slice(-500)}`,
      failureReason: result.failureReason
    });
  }
  if (result.terminationReason === "deadline") {
    throw new Error(`Animated GIF transcode timed out after ${timeout}ms`);
  }
  throw result.error ?? new Error(`Animated GIF transcode failed (${result.exitCode}): ${result.stderr.slice(-500)}`);
}
async function ensurePreparedWebm(input) {
  if (!existsSync(dirname(input.cachePath))) {
    mkdirSync(dirname(input.cachePath), { recursive: true });
  }
  if (!existsSync(dirname(input.outputPath))) {
    mkdirSync(dirname(input.outputPath), { recursive: true });
  }
  if (!isUsableFile(input.cachePath)) {
    const tmpPath = `${input.cachePath}.tmp-${process.pid}-${Date.now()}`;
    const args = buildAnimatedGifTranscodeArgs({
      inputPath: input.sourcePath,
      outputPath: tmpPath,
      loopIterations: input.loopIterations,
      padSeconds: input.padSeconds
    });
    const transcode = input.transcode ?? runAnimatedGifTranscode;
    try {
      await transcode({
        inputPath: input.sourcePath,
        outputPath: tmpPath,
        args,
        timeoutMs: input.timeoutMs
      });
      if (!isUsableFile(tmpPath)) {
        throw new Error("Animated GIF transcode produced an empty output");
      }
      if (!isUsableFile(input.cachePath)) {
        renameSync(tmpPath, input.cachePath);
      } else {
        rmSync(tmpPath, { force: true });
      }
    } catch (error) {
      rmSync(tmpPath, { force: true });
      throw error;
    }
  }
  if (resolve(input.outputPath) !== resolve(input.cachePath) && !isUsableFile(input.outputPath)) {
    copyFileSync(input.cachePath, input.outputPath);
  }
}
function ensureElementId(el, document, fallbackIndex) {
  const existing = (el.getAttribute("id") || "").trim();
  if (existing) return existing;
  let next = fallbackIndex;
  while (document.getElementById(`hf-gif-${next}`)) next += 1;
  const id = `hf-gif-${next}`;
  el.setAttribute("id", id);
  return id;
}
function ensureTimingAttributes(video) {
  if (!video.hasAttribute("data-start")) {
    video.setAttribute("data-start", "0");
  }
  if (!video.hasAttribute("data-end")) {
    const durationRaw = video.getAttribute("data-duration");
    if (durationRaw != null) {
      const start = Number.parseFloat(video.getAttribute("data-start") || "0");
      const duration = Number.parseFloat(durationRaw);
      if (Number.isFinite(start) && Number.isFinite(duration) && duration > 0) {
        video.setAttribute("data-end", String(start + duration));
      }
    }
  }
}
function replaceImageWithVideo(input) {
  const document = input.img.ownerDocument;
  const video = document.createElement("video");
  for (const attr of Array.from(input.img.attributes)) {
    if (attr.name === "src") continue;
    video.setAttribute(attr.name, attr.value);
  }
  video.setAttribute("id", input.id);
  video.setAttribute("src", input.outputSrc);
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("preload", "auto");
  video.setAttribute("data-has-audio", "false");
  video.setAttribute("data-hf-prepared-gif", "true");
  if (input.loop) {
    video.setAttribute("loop", "");
  } else {
    video.removeAttribute("loop");
  }
  ensureTimingAttributes(video);
  input.img.replaceWith(video);
  return video;
}
async function prepareAnimatedGifInputs(html, options) {
  const outputDir = options.outputDir ?? join(options.downloadDir, PREPARED_GIF_SUBDIR);
  const outputSrcPrefix = normalizeRelPath(options.outputSrcPrefix ?? PREPARED_GIF_SUBDIR);
  const cacheDir = options.cacheDir ?? outputDir;
  const { document } = parseHTML(html);
  const preparedAssets = /* @__PURE__ */ new Map();
  const preparedGifs = [];
  const images = Array.from(document.querySelectorAll("img[src]"));
  const compositionDuration = resolveCompositionDurationSeconds(document);
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = (img.getAttribute("src") || "").trim();
    if (!hasGifExtension(src)) continue;
    const sourcePath = resolveGifSourcePath(src, options);
    if (!sourcePath) continue;
    const bytes = readFileSync(sourcePath);
    const metadata = parseAnimatedGifMetadata(bytes);
    if (!metadata?.animated) continue;
    const loop = resolveLoop(metadata, readLoopOverride(img));
    const windowSeconds = resolveClipWindowSeconds(img, compositionDuration);
    const { loopIterations, padSeconds } = resolvePreparedPlayback(metadata, loop, windowSeconds);
    const hash = computePreparedGifHash(bytes, loopIterations, padSeconds);
    const filename = `${CACHE_SCHEMA}-${hash.slice(0, 24)}.webm`;
    const cachePath = join(cacheDir, filename);
    const outputPath = join(outputDir, filename);
    const outputSrc = `${outputSrcPrefix}/${filename}`;
    await ensurePreparedWebm({
      sourcePath,
      cachePath,
      outputPath,
      loopIterations,
      padSeconds,
      timeoutMs: options.timeoutMs,
      transcode: options.transcode
    });
    const id = ensureElementId(img, document, i);
    replaceImageWithVideo({ img, id, outputSrc, loop });
    preparedAssets.set(outputSrc, outputPath);
    preparedGifs.push({
      id,
      sourceSrc: src,
      outputSrc,
      outputPath,
      metadata,
      loop,
      loopIterations,
      padSeconds
    });
  }
  return {
    html: preparedGifs.length > 0 ? document.toString() : html,
    preparedAssets,
    preparedGifs
  };
}

export {
  EncoderInterruptedError,
  encoderFailureError,
  buildAnimatedGifTranscodeArgs,
  prepareAnimatedGifInputs
};
