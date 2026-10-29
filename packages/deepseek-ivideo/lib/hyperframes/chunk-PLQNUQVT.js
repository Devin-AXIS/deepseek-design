import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  loadOptionalPackage
} from "./chunk-3DKN5WKL.js";
import {
  ensureModel,
  selectProviders
} from "./chunk-2NCHQUPX.js";
import {
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallHint
} from "./chunk-TVCRUG2S.js";
import {
  DEFAULT_VP9_CPU_USED,
  renderProvenanceArgs
} from "./chunk-3NHZZLH3.js";
import {
  runCancellableProcess
} from "./chunk-LCSMOLGX.js";

// src/background-removal/pipeline.ts
import { spawn } from "child_process";
import { randomUUID } from "crypto";
import { renameSync, rmSync } from "fs";
import { basename, dirname, extname, join, toNamespacedPath } from "path";

// src/background-removal/inference.ts
var INPUT_SIZE = 320;
var INPUT_PLANE = INPUT_SIZE * INPUT_SIZE;
var MEAN = [0.485, 0.456, 0.406];
var STD = [0.229, 0.224, 0.225];
async function loadNative(name, load) {
  try {
    return await load();
  } catch (err) {
    throw new Error(
      `remove-background needs the optional native module '${name}', which isn't available (${err.message}). Install it with \`npm i ${name}\`, or reinstall hyperframes with optional dependencies enabled.`
    );
  }
}
async function createSession(options = {}) {
  const sharp = (await loadNative("sharp", () => import("sharp"))).default;
  const ort = await loadOptionalPackage(
    "onnxruntime-node",
    "background removal"
  );
  const choice = selectProviders(options.device ?? "auto");
  const path = await ensureModel(options.model, { onProgress: options.onProgress });
  options.onProgress?.(`Loading model on ${choice.label}...`);
  const tryCreate = (providers) => ort.InferenceSession.create(path, {
    executionProviders: providers,
    graphOptimizationLevel: "all"
  });
  let session;
  let providerUsed = choice.label;
  try {
    session = await tryCreate(choice.providers);
  } catch (err) {
    if (choice.providers[0] === "cpu") throw err;
    options.onProgress?.(
      `${choice.label} provider failed (${err.message}); falling back to CPU.`
    );
    session = await tryCreate(["cpu"]);
    providerUsed = "CPU";
  }
  const inputName = session.inputNames[0];
  const outputName = session.outputNames[0];
  if (!inputName || !outputName) {
    throw new Error("ONNX session is missing input or output bindings");
  }
  const inputData = new Float32Array(3 * INPUT_PLANE);
  const maskBuf = Buffer.allocUnsafe(INPUT_PLANE);
  let rgbaBuf = null;
  let rgbaBgBuf = null;
  return {
    provider: providerUsed,
    async process(rgb, width, height, withBackground = false) {
      const tensor = await preprocess(sharp, ort, rgb, width, height, inputData);
      const outputs = await session.run({ [inputName]: tensor });
      const output = outputs[outputName];
      if (!output) throw new Error(`Model did not return output '${outputName}'`);
      const expectedBytes = width * height * 4;
      if (!rgbaBuf || rgbaBuf.length !== expectedBytes) {
        rgbaBuf = Buffer.allocUnsafe(expectedBytes);
      }
      if (withBackground) {
        if (!rgbaBgBuf || rgbaBgBuf.length !== expectedBytes) {
          rgbaBgBuf = Buffer.allocUnsafe(expectedBytes);
        }
      }
      return await postprocess(
        sharp,
        output,
        rgb,
        width,
        height,
        maskBuf,
        rgbaBuf,
        withBackground ? rgbaBgBuf : null
      );
    },
    async close() {
      await session.release();
    }
  };
}
async function preprocess(sharp, ort, rgb, width, height, inputData) {
  const resized = await sharp(rgb, { raw: { width, height, channels: 3 } }).resize(INPUT_SIZE, INPUT_SIZE, { kernel: "lanczos3", fit: "fill" }).raw().toBuffer();
  let maxPixel = 0;
  for (let i = 0; i < resized.length; i++) {
    if (resized[i] > maxPixel) maxPixel = resized[i];
  }
  if (maxPixel === 0) maxPixel = 1;
  for (let y = 0; y < INPUT_SIZE; y++) {
    for (let x = 0; x < INPUT_SIZE; x++) {
      const src = (y * INPUT_SIZE + x) * 3;
      const dst = y * INPUT_SIZE + x;
      inputData[dst] = (resized[src] / maxPixel - MEAN[0]) / STD[0];
      inputData[INPUT_PLANE + dst] = (resized[src + 1] / maxPixel - MEAN[1]) / STD[1];
      inputData[2 * INPUT_PLANE + dst] = (resized[src + 2] / maxPixel - MEAN[2]) / STD[2];
    }
  }
  return new ort.Tensor("float32", inputData, [1, 3, INPUT_SIZE, INPUT_SIZE]);
}
async function postprocess(sharp, output, rgb, width, height, maskBuf, rgbaBuf, rgbaBgBuf) {
  const raw = output.data;
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i < INPUT_PLANE; i++) {
    const v = raw[i];
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const range = hi - lo || 1;
  for (let i = 0; i < INPUT_PLANE; i++) {
    const norm = (raw[i] - lo) / range;
    maskBuf[i] = Math.max(0, Math.min(255, Math.round(norm * 255)));
  }
  const fullMask = await sharp(maskBuf, {
    raw: { width: INPUT_SIZE, height: INPUT_SIZE, channels: 1 }
  }).resize(width, height, { kernel: "lanczos3", fit: "fill" }).toColourspace("b-w").raw().toBuffer();
  const result = applyMask(rgb, fullMask, rgbaBuf, rgbaBgBuf, width * height);
  refineHumanEdges(rgb, fullMask, result.fg, width, height);
  if (result.bg) {
    for (let i = 0; i < fullMask.length; i++) result.bg[i * 4 + 3] = 255 - result.fg[i * 4 + 3];
  }
  return result;
}
function nearestEdgeSamples(mask, width, height, foreground, radius) {
  const samples = new Int32Array(mask.length).fill(-1);
  const inset = Math.max(1, Math.round(radius / 5));
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const certain = foreground ? mask[i] >= 250 && mask[y * width + Math.max(0, x - inset)] >= 250 && mask[y * width + Math.min(width - 1, x + inset)] >= 250 && mask[Math.max(0, y - inset) * width + x] >= 250 && mask[Math.min(height - 1, y + inset) * width + x] >= 250 : mask[i] <= 5;
      if (certain) samples[i] = i;
    }
  }
  const consider = (i, neighbor, x, y) => {
    const candidate = samples[neighbor];
    if (candidate < 0) return;
    const distance = (candidate % width - x) ** 2 + (Math.floor(candidate / width) - y) ** 2;
    if (distance > radius * radius) return;
    const current = samples[i];
    if (current < 0 || distance < (current % width - x) ** 2 + (Math.floor(current / width) - y) ** 2)
      samples[i] = candidate;
  };
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      if (x > 0) consider(i, i - 1, x, y);
      if (y > 0) consider(i, i - width, x, y);
    }
  for (let y = height - 1; y >= 0; y--)
    for (let x = width - 1; x >= 0; x--) {
      const i = y * width + x;
      if (x + 1 < width) consider(i, i + 1, x, y);
      if (y + 1 < height) consider(i, i + width, x, y);
    }
  return samples;
}
function refineHumanEdges(rgb, mask, rgba, width, height) {
  const radius = Math.max(6, Math.min(24, Math.ceil(Math.max(width, height) / INPUT_SIZE * 6)));
  const foreground = nearestEdgeSamples(mask, width, height, true, radius);
  const background = nearestEdgeSamples(mask, width, height, false, radius);
  for (let i = 0; i < mask.length; i++) {
    const f = foreground[i], b = background[i];
    if (mask[i] <= 5 || f < 0 || b < 0 || f === i) continue;
    let contrast = 0, projection = 0;
    for (let c = 0; c < 3; c++) {
      const delta = rgb[f * 3 + c] - rgb[b * 3 + c];
      contrast += delta * delta;
      projection += (rgb[i * 3 + c] - rgb[b * 3 + c]) * delta;
    }
    if (contrast < 3 * 25 ** 2) continue;
    const alpha = Math.max(0, Math.min(1, projection / contrast));
    let residual = 0;
    for (let c = 0; c < 3; c++) {
      const expected = alpha * rgb[f * 3 + c] + (1 - alpha) * rgb[b * 3 + c];
      residual += (rgb[i * 3 + c] - expected) ** 2;
    }
    if (residual > 3 * 25 ** 2) continue;
    rgba[i * 4 + 3] = Math.min(mask[i], Math.round(alpha * 255));
    for (let c = 0; c < 3; c++) {
      const expected = alpha * rgb[f * 3 + c] + (1 - alpha) * rgb[b * 3 + c];
      const corrected = rgb[f * 3 + c] + (rgb[i * 3 + c] - expected) / Math.max(alpha, 0.2);
      rgba[i * 4 + c] = Math.max(0, Math.min(255, Math.round(corrected)));
    }
  }
}
function applyMask(rgb, mask, fg, bg, pixels) {
  if (bg) {
    for (let i = 0; i < pixels; i++) {
      const r = rgb[i * 3];
      const g = rgb[i * 3 + 1];
      const b = rgb[i * 3 + 2];
      const m = mask[i];
      const o = i * 4;
      fg[o] = r;
      fg[o + 1] = g;
      fg[o + 2] = b;
      fg[o + 3] = m;
      bg[o] = r;
      bg[o + 1] = g;
      bg[o + 2] = b;
      bg[o + 3] = 255 - m;
    }
    return { fg, bg };
  }
  for (let i = 0; i < pixels; i++) {
    fg[i * 4] = rgb[i * 3];
    fg[i * 4 + 1] = rgb[i * 3 + 1];
    fg[i * 4 + 2] = rgb[i * 3 + 2];
    fg[i * 4 + 3] = mask[i];
  }
  return { fg, bg: null };
}

// src/background-removal/pipeline.ts
var QUALITY_CRF = {
  fast: 30,
  balanced: 18,
  best: 12
};
var QUALITIES = Object.keys(QUALITY_CRF);
var DEFAULT_QUALITY = "balanced";
var isQuality = (v) => typeof v === "string" && QUALITIES.includes(v);
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([".mp4", ".mov", ".webm", ".mkv", ".avi"]);
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp"]);
function inferOutputFormat(outputPath) {
  const ext = extname(outputPath).toLowerCase();
  if (ext === ".webm") return "webm";
  if (ext === ".mov") return "mov";
  if (ext === ".png") return "png";
  throw new Error(
    `Unsupported output extension: ${ext}. Use .webm (VP9 alpha), .mov (ProRes 4444), or .png.`
  );
}
function inferInputKind(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  throw new Error(
    `Unsupported input: ${ext}. Use a video (mp4/mov/webm/mkv/avi) or image (jpg/png/webp).`
  );
}
async function probeMedia(inputPath) {
  const isImage = inferInputKind(inputPath) === "image";
  const engine = await import("./src-2CXRYIST.js");
  const meta = await engine.extractMediaMetadata(inputPath);
  if (isImage) {
    return { width: meta.width, height: meta.height, fps: 0, frameCount: 1, durationSeconds: 0 };
  }
  const fps = meta.fps || 30;
  const frameCount = meta.durationSeconds ? Math.round(meta.durationSeconds * fps) : 0;
  return { ...meta, fps, frameCount };
}
function buildEncoderArgs(format, width, height, fps, outputPath, quality = DEFAULT_QUALITY, audioInputPath) {
  const base = [
    "-y",
    "-f",
    "rawvideo",
    "-pix_fmt",
    "rgba",
    "-s",
    `${width}x${height}`,
    "-r",
    String(fps || 30),
    "-i",
    "-",
    ...audioInputPath && format !== "png" ? ["-i", audioInputPath] : []
  ];
  const audioArgs = audioInputPath ? ["-map", "0:v:0", "-map", "1:a:0?", "-c:a", format === "webm" ? "libopus" : "pcm_s16le"] : ["-an"];
  if (format === "webm") {
    return [
      ...base,
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "0",
      "-crf",
      String(QUALITY_CRF[quality]),
      "-deadline",
      "good",
      "-row-mt",
      "1",
      "-cpu-used",
      String(DEFAULT_VP9_CPU_USED),
      "-auto-alt-ref",
      "0",
      "-pix_fmt",
      "yuva420p",
      // Tag the output as BT.709 limited range so browsers use the same
      // YUV→RGB matrix the source video was encoded with. Without these tags
      // ffmpeg's default RGB→YUV conversion is BT.601, which causes a visible
      // color shift (red/skin tones in particular) when the matted overlay is
      // composited over the original mp4.
      "-colorspace",
      "bt709",
      "-color_primaries",
      "bt709",
      "-color_trc",
      "bt709",
      "-color_range",
      "tv",
      "-metadata:s:v:0",
      "alpha_mode=1",
      ...audioArgs,
      ...renderProvenanceArgs(outputPath),
      outputPath
    ];
  }
  if (format === "mov") {
    return [
      ...base,
      "-c:v",
      "prores_ks",
      "-profile:v",
      "4444",
      "-vendor",
      "apl0",
      "-pix_fmt",
      "yuva444p10le",
      ...audioArgs,
      ...renderProvenanceArgs(outputPath),
      outputPath
    ];
  }
  return [...base, "-frames:v", "1", "-pix_fmt", "rgba", "-update", "1", outputPath];
}
async function* readFrames(stream, frameBytes) {
  let buffered = Buffer.alloc(0);
  for await (const chunk of stream) {
    buffered = buffered.length === 0 ? chunk : Buffer.concat([buffered, chunk]);
    while (buffered.length >= frameBytes) {
      yield Buffer.from(buffered.subarray(0, frameBytes));
      buffered = buffered.subarray(frameBytes);
    }
  }
}
function resolveRenderTargets(inputPath, outputPath, backgroundOutputPath) {
  const format = inferOutputFormat(outputPath);
  const inputKind = inferInputKind(inputPath);
  if (inputKind === "image" && format !== "png") {
    throw new Error(
      `Image input requires a .png output (got ${extname(outputPath)}). Use a video input for .webm/.mov.`
    );
  }
  if (inputKind === "video" && format === "png") {
    throw new Error(
      `Video input requires a .webm or .mov output (got .png). Use an image input for .png.`
    );
  }
  let bgFormat;
  if (backgroundOutputPath) {
    if (inputKind === "image") {
      throw new Error(
        "--background-output is not supported for image inputs. Use a video input (mp4/mov/webm) to produce both a cutout and a background plate."
      );
    }
    bgFormat = inferOutputFormat(backgroundOutputPath);
    if (bgFormat === "png") {
      throw new Error(
        "--background-output must be .webm or .mov; .png is only valid for single-image inputs."
      );
    }
  }
  return { format, inputKind, bgFormat };
}
async function render(options) {
  const ffmpegPath = findFFmpeg();
  if (!ffmpegPath || !findFFprobe()) {
    throw new Error(`ffmpeg and ffprobe are required. Install: ${getFFmpegInstallHint()}`);
  }
  const { format, bgFormat } = resolveRenderTargets(
    options.inputPath,
    options.outputPath,
    options.backgroundOutputPath
  );
  const media = await probeMedia(options.inputPath);
  options.onProgress?.({
    kind: "metadata",
    width: media.width,
    height: media.height,
    fps: media.fps,
    frameCount: media.frameCount
  });
  if (options.foregroundPath && format === "webm" && !bgFormat) {
    const foreground = await probeMedia(options.foregroundPath);
    if (foreground.hasAlpha && foreground.videoCodec === "vp9" && foreground.width === media.width && foreground.height === media.height && Math.abs(foreground.fps - media.fps) < 0.01 && Math.abs(foreground.durationSeconds - media.durationSeconds) <= Math.max(0.25, 3 / media.fps)) {
      options.onProgress?.({ kind: "info", message: "Reusing completed foreground and preserving source audio" });
      const output2 = tempBeside(options.outputPath);
      const start = Date.now();
      try {
        await runCancellableProcess(ffmpegPath, [
          "-v",
          "error",
          "-y",
          "-i",
          toNamespacedPath(options.foregroundPath),
          "-i",
          toNamespacedPath(options.inputPath),
          "-map",
          "0:v:0",
          "-map",
          "1:a:0?",
          "-c:v",
          "copy",
          "-c:a",
          "libopus",
          "-metadata:s:v:0",
          "alpha_mode=1",
          ...renderProvenanceArgs(options.outputPath),
          toNamespacedPath(output2)
        ], { timeoutMs: 12e4, maxBufferBytes: 16384 });
        renameSync(output2, options.outputPath);
        return {
          outputPath: options.outputPath,
          framesProcessed: media.frameCount,
          durationSeconds: (Date.now() - start) / 1e3,
          avgMsPerFrame: 0,
          provider: "reused-foreground",
          format
        };
      } finally {
        rmSync(output2, { force: true, maxRetries: 3 });
      }
    }
    options.onProgress?.({ kind: "info", message: "Foreground no longer matches source; regenerating" });
  }
  const session = await createSession({
    model: options.model,
    device: options.device,
    onProgress: (msg) => options.onProgress?.({ kind: "info", message: msg })
  });
  const output = tempBeside(options.outputPath);
  const background = options.backgroundOutputPath && tempBeside(options.backgroundOutputPath);
  try {
    const start = Date.now();
    const framesProcessed = await runPipeline(
      { ...options, outputPath: output, backgroundOutputPath: background },
      session,
      media,
      format,
      bgFormat,
      ffmpegPath
    );
    renameSync(output, options.outputPath);
    if (background) renameSync(background, options.backgroundOutputPath);
    const durationSeconds = (Date.now() - start) / 1e3;
    const avgMsPerFrame = framesProcessed ? durationSeconds * 1e3 / framesProcessed : 0;
    return {
      outputPath: options.outputPath,
      backgroundOutputPath: options.backgroundOutputPath,
      framesProcessed,
      durationSeconds,
      avgMsPerFrame,
      provider: session.provider,
      format
    };
  } finally {
    await session.close();
    rmSync(output, { force: true, maxRetries: 3 });
    if (background) rmSync(background, { force: true, maxRetries: 3 });
  }
}
function tempBeside(path) {
  return join(dirname(path), `.tmp-${randomUUID()}-${basename(path)}`);
}
var RECENT_WINDOW = 30;
function spawnFfmpeg(ffmpegPath, args, label, stdio) {
  const proc = spawn(ffmpegPath, args, { stdio, windowsHide: true });
  let stderrBuf = "";
  proc.stderr?.on("data", (d) => {
    stderrBuf = (stderrBuf + d.toString()).slice(-4e3);
  });
  proc.stdin?.on("error", () => {
  });
  const exit = waitForExit(proc, label, () => stderrBuf);
  return { proc, exit, getStderr: () => stderrBuf };
}
async function runPipeline(options, session, media, format, bgFormat, ffmpegPath) {
  const { inputPath, outputPath, backgroundOutputPath } = options;
  const { width, height, fps, frameCount } = media;
  const frameBytes = width * height * 3;
  const quality = options.quality ?? DEFAULT_QUALITY;
  const decoder = spawnFfmpeg(
    ffmpegPath,
    [
      "-loglevel",
      "error",
      "-i",
      toNamespacedPath(inputPath),
      "-f",
      "rawvideo",
      "-pix_fmt",
      "rgb24",
      "-an",
      "-"
    ],
    "ffmpeg decoder",
    ["ignore", "pipe", "pipe"]
  );
  const fg = spawnFfmpeg(
    ffmpegPath,
    buildEncoderArgs(
      format,
      width,
      height,
      fps || 30,
      toNamespacedPath(outputPath),
      quality,
      inferInputKind(inputPath) === "video" ? toNamespacedPath(inputPath) : void 0
    ),
    "ffmpeg encoder",
    ["pipe", "ignore", "pipe"]
  );
  const bg = backgroundOutputPath && bgFormat ? spawnFfmpeg(
    ffmpegPath,
    buildEncoderArgs(
      bgFormat,
      width,
      height,
      fps || 30,
      toNamespacedPath(backgroundOutputPath),
      quality
    ),
    "ffmpeg background encoder",
    ["pipe", "ignore", "pipe"]
  ) : null;
  const processes = bg ? [decoder, fg, bg] : [decoder, fg];
  let processError;
  const stopProcesses = () => {
    for (const { proc } of processes) {
      proc.kill("SIGKILL");
      proc.stdout?.destroy();
      proc.stdin?.destroy();
    }
  };
  for (const { exit } of processes) {
    void exit.catch((error) => {
      processError ??= error;
      stopProcesses();
    });
  }
  let processed = 0;
  const total = frameCount;
  const recentMs = new Array(RECENT_WINDOW).fill(0);
  let recentSum = 0;
  let recentSlot = 0;
  let recentCount = 0;
  try {
    for await (const rgb of readFrames(decoder.proc.stdout, frameBytes)) {
      const t0 = Date.now();
      const result = await session.process(rgb, width, height, bg !== null);
      const elapsed = Date.now() - t0;
      recentSum += elapsed - recentMs[recentSlot];
      recentMs[recentSlot] = elapsed;
      recentSlot = (recentSlot + 1) % RECENT_WINDOW;
      if (recentCount < RECENT_WINDOW) recentCount++;
      if (processError) throw processError;
      const writes = [{ proc: fg.proc, frame: result.fg }];
      if (bg && result.bg) writes.push({ proc: bg.proc, frame: result.bg });
      await Promise.all(
        writes.map(
          ({ proc, frame }) => new Promise((resolve, reject) => {
            proc.stdin.write(frame, (error) => error ? reject(error) : resolve());
          })
        )
      );
      processed++;
      options.onProgress?.({
        kind: "frame",
        index: processed,
        total,
        avgMsPerFrame: recentSum / recentCount
      });
    }
    fg.proc.stdin.end();
    bg?.proc.stdin.end();
    await Promise.all(processes.map(({ exit }) => exit));
  } catch (err) {
    stopProcesses();
    await Promise.allSettled(processes.map(({ exit }) => exit));
    throw processError ?? err;
  }
  if (processed === 0) {
    throw new Error(
      `No frames produced from ${inputPath}. Decoder stderr:
${decoder.getStderr().slice(-400)}`
    );
  }
  return processed;
}
function waitForExit(proc, label, getStderr) {
  return new Promise((resolve, reject) => {
    proc.on("error", reject);
    proc.on("exit", (code, signal) => {
      if (code === 0 && !signal) {
        resolve();
        return;
      }
      const cause = signal ? `killed by ${signal}` : `exited with code ${code}`;
      reject(new Error(`${label} ${cause}: ${getStderr().slice(-400)}`));
    });
  });
}

export {
  QUALITIES,
  DEFAULT_QUALITY,
  isQuality,
  inferOutputFormat,
  inferInputKind,
  buildEncoderArgs,
  resolveRenderTargets,
  render,
  waitForExit
};
