import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  emitWords
} from "./chunk-6IHWCZ3W.js";
import {
  DEFAULT_MODEL,
  ensureModel,
  ensureWhisper,
  hasFFmpeg
} from "./chunk-PXSM4HPB.js";
import {
  stoppedByCancelSignal
} from "./chunk-QPIYSFE4.js";
import {
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallHint
} from "./chunk-TVCRUG2S.js";
import {
  findWavChunk
} from "./chunk-UOFAE5RF.js";

// src/whisper/transcribe.ts
import { execFile, execFileSync } from "child_process";
import { once } from "events";
import { createInterface } from "readline";
import { existsSync, readFileSync, mkdirSync, rmSync, statSync, unlinkSync } from "fs";
import { join, extname } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
var WHISPER_TIMEOUT_FLOOR_MS = 3e5;
var WHISPER_TIMEOUT_PER_AUDIO_SECOND_MS = 1e4;
var WHISPER_TIMEOUT_CAP_MS = 432e5;
var AUDIO_PREPARATION_TIMEOUT_FLOOR_MS = 12e4;
var AUDIO_PREPARATION_TIMEOUT_PER_MEDIA_SECOND_MS = 500;
var AUDIO_PREPARATION_TIMEOUT_CAP_MS = 216e5;
var WHISPER_MODEL_SLOWDOWN_FACTORS = {
  tiny: 0.5,
  "tiny.en": 0.5,
  base: 0.7,
  "base.en": 0.7,
  small: 1,
  "small.en": 1,
  medium: 2,
  "medium.en": 2,
  "large-v1": 4,
  "large-v2": 4,
  "large-v3": 4,
  "large-v3-turbo": 2
};
var DEFAULT_MODEL_SLOWDOWN_FACTOR = 1;
function whisperModelSlowdownFactor(model) {
  return WHISPER_MODEL_SLOWDOWN_FACTORS[model.toLowerCase()] ?? DEFAULT_MODEL_SLOWDOWN_FACTOR;
}
function resolveWhisperTimeoutMs(durationSeconds, options) {
  if (options?.overrideMs != null && Number.isFinite(options.overrideMs) && options.overrideMs > 0) {
    return Math.min(WHISPER_TIMEOUT_CAP_MS, options.overrideMs);
  }
  const factor = options?.model ? whisperModelSlowdownFactor(options.model) : 1;
  if (durationSeconds === null || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return Math.min(WHISPER_TIMEOUT_CAP_MS, Math.ceil(WHISPER_TIMEOUT_FLOOR_MS * factor));
  }
  return Math.min(
    WHISPER_TIMEOUT_CAP_MS,
    Math.max(
      WHISPER_TIMEOUT_FLOOR_MS,
      Math.ceil(durationSeconds * WHISPER_TIMEOUT_PER_AUDIO_SECOND_MS * factor)
    )
  );
}
function resolveAudioPreparationTimeoutMs(durationSeconds) {
  if (durationSeconds === null || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return AUDIO_PREPARATION_TIMEOUT_FLOOR_MS;
  }
  return Math.min(
    AUDIO_PREPARATION_TIMEOUT_CAP_MS,
    Math.max(
      AUDIO_PREPARATION_TIMEOUT_FLOOR_MS,
      Math.ceil(durationSeconds * AUDIO_PREPARATION_TIMEOUT_PER_MEDIA_SECOND_MS)
    )
  );
}
function getMediaDurationSeconds(filePath) {
  try {
    const ffprobePath = findFFprobe();
    if (!ffprobePath) return null;
    const raw = execFileSync(
      ffprobePath,
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        "--",
        filePath
      ],
      { encoding: "utf-8", timeout: 1e4 }
    );
    const durationSeconds = Number.parseFloat(raw.trim());
    return Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : null;
  } catch {
    return null;
  }
}
function getPreparedWavDurationSeconds(wavPath) {
  try {
    return statSync(wavPath).size / (16e3 * 2);
  } catch {
    return null;
  }
}
function detectSpeechOnset(wavPath) {
  const SAMPLE_RATE = 16e3;
  const WINDOW_SECONDS = 0.5;
  const WINDOW_SAMPLES = SAMPLE_RATE * WINDOW_SECONDS;
  const SUSTAINED_WINDOWS = 3;
  const SILENCE_THRESHOLD_RATIO = 0.6;
  const MIN_INTRO_SECONDS = 3;
  try {
    const buf = readFileSync(wavPath);
    const dataChunk = findWavChunk(buf, "data");
    if (!dataChunk) return null;
    const pcm = new Int16Array(buf.buffer, buf.byteOffset + dataChunk.offset, dataChunk.size / 2);
    const totalWindows = Math.floor(pcm.length / WINDOW_SAMPLES);
    if (totalWindows < 10) return null;
    const rmsValues = [];
    for (let i = 0; i < totalWindows; i++) {
      const start = i * WINDOW_SAMPLES;
      let sumSq = 0;
      for (let j = start; j < start + WINDOW_SAMPLES; j++) {
        const sample = pcm[j] ?? 0;
        sumSq += sample * sample;
      }
      rmsValues.push(Math.sqrt(sumSq / WINDOW_SAMPLES));
    }
    const sorted = [...rmsValues].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)] ?? 0;
    const threshold = median * SILENCE_THRESHOLD_RATIO;
    const introAvg = rmsValues.slice(0, Math.min(20, rmsValues.length)).reduce((a, b) => a + b, 0) / Math.min(20, rmsValues.length);
    if (introAvg >= threshold) return null;
    let consecutive = 0;
    for (let i = 0; i < rmsValues.length; i++) {
      if ((rmsValues[i] ?? 0) >= threshold) {
        consecutive++;
        if (consecutive >= SUSTAINED_WINDOWS) {
          const onsetSeconds = (i - SUSTAINED_WINDOWS + 1) * WINDOW_SECONDS;
          return onsetSeconds >= MIN_INTRO_SECONDS ? onsetSeconds : null;
        }
      } else {
        consecutive = 0;
      }
    }
  } catch {
  }
  return null;
}
var AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"]);
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([".mp4", ".webm", ".mov", ".mkv", ".avi"]);
function isAudioFile(filePath) {
  return AUDIO_EXTENSIONS.has(extname(filePath).toLowerCase());
}
function isVideoFile(filePath) {
  return VIDEO_EXTENSIONS.has(extname(filePath).toLowerCase());
}
function tempWavPath() {
  return join(tmpdir(), `hyperframes-audio-${process.pid}-${randomUUID()}.wav`);
}
function runFfmpeg(ffmpegPath, args, output, timeout) {
  try {
    execFileSync(ffmpegPath, ["-nostats", "-hide_banner", ...args, "-y", output], {
      stdio: ["ignore", "ignore", "pipe"],
      maxBuffer: 64 * 1024 * 1024,
      timeout
    });
  } catch (err) {
    rmSync(output, { force: true });
    const stop = err;
    if (stop.code) throw err;
    const said = String(stop.stderr ?? "").trim();
    const cancelled = /Exiting normally, received signal/.test(said) || stoppedByCancelSignal(stop);
    const reason = said.split("\n").at(-1) || err.message;
    const failure = new Error(`ffmpeg failed: ${reason}`, { cause: err });
    throw Object.assign(failure, { cancelled, stderr: said });
  }
}
function extractAudio(videoPath) {
  const ffmpegPath = findFFmpeg();
  if (!ffmpegPath) {
    throw new Error(
      `ffmpeg is required to extract audio from video. Install: ${getFFmpegInstallHint()}`
    );
  }
  const wavPath = tempWavPath();
  runFfmpeg(
    ffmpegPath,
    ["-i", videoPath, "-vn", "-ar", "16000", "-ac", "1", "-f", "wav"],
    wavPath,
    resolveAudioPreparationTimeoutMs(getMediaDurationSeconds(videoPath))
  );
  return wavPath;
}
function isPcm16kMono(stream) {
  return stream?.codec_name === "pcm_s16le" && stream.sample_rate === "16000" && stream.channels === 1;
}
function isWav16kMono(filePath) {
  try {
    const ffprobePath = findFFprobe();
    if (!ffprobePath) return false;
    const raw = execFileSync(
      ffprobePath,
      ["-v", "quiet", "-print_format", "json", "-show_streams", "--", filePath],
      { encoding: "utf-8", timeout: 1e4 }
    );
    const parsed = JSON.parse(raw);
    return isPcm16kMono(parsed.streams?.find((s) => s.codec_type === "audio"));
  } catch {
    return false;
  }
}
function prepareAudio(audioPath) {
  if (extname(audioPath).toLowerCase() === ".wav" && isWav16kMono(audioPath)) {
    return audioPath;
  }
  const ffmpegPath = findFFmpeg();
  if (!ffmpegPath) {
    throw new Error(`ffmpeg is required to prepare audio. Install: ${getFFmpegInstallHint()}`);
  }
  const wavPath = tempWavPath();
  runFfmpeg(
    ffmpegPath,
    ["-i", audioPath, "-ar", "16000", "-ac", "1", "-f", "wav"],
    wavPath,
    resolveAudioPreparationTimeoutMs(getMediaDurationSeconds(audioPath))
  );
  return wavPath;
}
function dtwPresetForModel(model) {
  return model.replace(/-/g, ".");
}
function initialModelForLanguage(model, language) {
  const baseLanguage = language?.trim().toLowerCase().split(/[-_]/, 1)[0];
  if (baseLanguage && baseLanguage !== "en" && model.endsWith(".en")) {
    return model.slice(0, -3);
  }
  return model;
}
function prepareWav(inputPath, onProgress) {
  if (isAudioFile(inputPath)) {
    onProgress?.("Preparing audio...");
    return prepareAudio(inputPath);
  }
  if (isVideoFile(inputPath)) {
    if (!hasFFmpeg()) {
      throw new Error(
        `ffmpeg is required to extract audio from video. Install: ${getFFmpegInstallHint()}`
      );
    }
    onProgress?.("Extracting audio from video...");
    return extractAudio(inputPath);
  }
  throw new Error(`Unsupported file type: ${extname(inputPath).toLowerCase()}`);
}
async function transcribe(inputPath, outputDir, options) {
  const model = initialModelForLanguage(options?.model ?? DEFAULT_MODEL, options?.language);
  options?.onProgress?.("Checking whisper...");
  const whisper = await ensureWhisper({
    onProgress: options?.onProgress,
    installRuntime: options?.installRuntime
  });
  options?.onProgress?.("Checking model...");
  const modelPath = await ensureModel(model, {
    onProgress: options?.onProgress,
    onDownloadProgress: options?.onEvent ? (receivedBytes, totalBytes) => options.onEvent?.({
      type: "progress",
      phase: "download",
      model,
      receivedBytes,
      totalBytes
    }) : void 0
  });
  const wavPath = prepareWav(inputPath, options?.onProgress);
  const automaticLanguage = options?.language === void 0 && !model.endsWith(".en");
  const language = options?.language ?? (automaticLanguage ? "auto" : "en");
  options?.onProgress?.("Transcribing...");
  const wavSeconds = getPreparedWavDurationSeconds(wavPath);
  options?.onEvent?.({
    type: "progress",
    phase: "transcription",
    model,
    status: "started",
    durationSeconds: wavSeconds
  });
  const outputBase = join(outputDir, "transcript");
  mkdirSync(outputDir, { recursive: true });
  const whisperArgs = [
    "--model",
    modelPath,
    "--output-json-full",
    "--output-file",
    outputBase,
    "--dtw",
    dtwPresetForModel(model),
    "--suppress-nst"
  ];
  whisperArgs.push("--language", language);
  const onEvent = options?.onEvent;
  if (onEvent) whisperArgs.push("--print-progress");
  whisperArgs.push(wavPath);
  const whisperTimeoutMs = resolveWhisperTimeoutMs(wavSeconds, {
    model,
    overrideMs: options?.timeoutMs
  });
  let through = 0;
  const heard = (words, at) => {
    if (!onEvent || words.length === 0 && at <= through) return;
    through = Math.max(through, at);
    emitWords(onEvent, model, words, through);
  };
  try {
    await runWhisper(whisper.executablePath, whisperArgs, {
      timeoutMs: whisperTimeoutMs,
      signal: options?.startCancellation?.(),
      onStdout: onEvent && ((line) => {
        const segment = segmentWords(line);
        if (segment) heard(segment.words, segment.end);
      }),
      onStderr: onEvent && wavSeconds ? (line) => {
        const percent = /progress =\s*(\d+)%/.exec(line)?.[1];
        if (percent) heard([], Number(percent) / 100 * wavSeconds);
      } : void 0
    });
  } catch (err) {
    throw wrapWhisperTimeoutError(err, {
      effectiveTimeoutMs: whisperTimeoutMs,
      model,
      wasOverride: options?.timeoutMs != null
    });
  }
  const transcriptPath = `${outputBase}.json`;
  if (!existsSync(transcriptPath)) {
    throw new Error("Whisper did not produce output. Check the input file.");
  }
  const transcript = JSON.parse(readFileSync(transcriptPath, "utf-8"));
  const reportedLanguage = transcript.result?.language;
  const detectedLanguage = automaticLanguage && typeof reportedLanguage === "string" && reportedLanguage.length > 0 ? reportedLanguage : null;
  const segments = transcript.transcription ?? [];
  let wordCount = 0;
  let maxEnd = 0;
  for (const seg of segments) {
    for (const token of seg.tokens ?? []) {
      const text = (token.text ?? "").trim();
      if (text && !text.startsWith("[_") && !text.startsWith("[BLANK")) wordCount++;
      if (token.offsets?.to > maxEnd) maxEnd = token.offsets.to;
    }
  }
  options?.onProgress?.("Detecting speech onset...");
  const speechOnsetSeconds = detectSpeechOnset(wavPath);
  if (wavPath !== inputPath) {
    try {
      unlinkSync(wavPath);
    } catch {
    }
  }
  options?.onEvent?.({ type: "progress", phase: "transcription", model, status: "completed" });
  return {
    model,
    detectedLanguage,
    transcriptPath,
    wordCount,
    durationSeconds: maxEnd / 1e3,
    speechOnsetSeconds
  };
}
var SEGMENT_LINE = /^\[(\d+):(\d+):([\d.]+) --> (\d+):(\d+):([\d.]+)\]\s*(.*)$/;
var toSeconds = (h, m, s) => Number(h) * 3600 + Number(m) * 60 + Number(s);
var toMs = (seconds) => Math.round(seconds * 1e3) / 1e3;
function segmentWords(line) {
  const m = SEGMENT_LINE.exec(line);
  if (!m) return null;
  const start = toSeconds(m[1], m[2], m[3]);
  const end = toSeconds(m[4], m[5], m[6]);
  const texts = m[7].split(/\s+/).filter((t) => t && !t.startsWith("[_") && !t.startsWith("[BLANK"));
  const letters = texts.reduce((n, t) => n + t.length, 0);
  let at = start;
  const words = texts.map((text) => {
    const from = at;
    at += (end - start) * text.length / letters;
    return { text, start: toMs(from), end: toMs(at) };
  });
  return { words, end };
}
async function runWhisper(executable, args, options) {
  let stdout = null;
  let stderr = null;
  const exited = new Promise((resolve, reject) => {
    const child = execFile(
      executable,
      args,
      { timeout: options.timeoutMs, signal: options.signal, maxBuffer: 256 * 1024 * 1024 },
      (err, _out, errText) => {
        if (!err) return resolve();
        const timedOut = err.killed && err.signal === "SIGTERM" && !options.signal?.aborted;
        err.message = err.message.split("\n")[0];
        reject(Object.assign(err, { stderr: errText }, timedOut ? { code: "ETIMEDOUT" } : {}));
      }
    );
    stdout = child.stdout;
    stderr = child.stderr;
  });
  const read = (stream, onLine) => stream && onLine ? once(createInterface({ input: stream }).on("line", onLine), "close") : null;
  await Promise.all([exited, read(stdout, options.onStdout), read(stderr, options.onStderr)]);
}
function isWhisperTimeoutError(err) {
  return err instanceof Error && err.code === "ETIMEDOUT";
}
function wrapWhisperTimeoutError(err, options) {
  if (!isWhisperTimeoutError(err)) {
    return err instanceof Error ? err : new Error(String(err));
  }
  const seconds = Math.round(options.effectiveTimeoutMs / 1e3);
  const source = options.wasOverride ? `explicit --timeout ${options.effectiveTimeoutMs}ms` : `auto-scaled default for model ${options.model}`;
  const message = `Whisper transcription exceeded ${seconds}s (${source}). Raise --timeout <ms> or set HYPERFRAMES_TRANSCRIBE_TIMEOUT_MS. Slow CPUs (e.g. emulated arm64/x64, low-power laptops) may need many multiples of realtime on heavier models \u2014 medium.en can run ~10-15x realtime on constrained hardware.`;
  const wrapped = new Error(message);
  wrapped.cause = err;
  return wrapped;
}

export {
  whisperModelSlowdownFactor,
  resolveWhisperTimeoutMs,
  resolveAudioPreparationTimeoutMs,
  getMediaDurationSeconds,
  getPreparedWavDurationSeconds,
  detectSpeechOnset,
  isPcm16kMono,
  dtwPresetForModel,
  initialModelForLanguage,
  prepareWav,
  transcribe,
  isWhisperTimeoutError,
  wrapWhisperTimeoutError
};
