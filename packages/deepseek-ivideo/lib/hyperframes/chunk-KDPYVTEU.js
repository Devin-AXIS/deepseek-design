import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/whisper/parakeet.ts
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { homedir, tmpdir } from "os";
import { basename, extname, join } from "path";
var PARAKEET_MODEL_LABEL = "parakeet-tdt-0.6b-v3";
var SHERPA_RESULT_PREFIX = "HYPERFRAMES_PARAKEET_RESULT:";
var SHERPA_ERROR_PREFIX = "HYPERFRAMES_PARAKEET_ERROR:";
var SHERPA_WINDOW_PREFIX = "HYPERFRAMES_PARAKEET_WINDOW:";
var PARAKEET_LANGUAGES = "en es fr de bg hr cs da nl et fi el hu it lv lt mt pl pt ro sk sl sv ru uk";
function parakeetSpeaks(language) {
  const base = language?.trim().toLowerCase().split(/[-_]/, 1)[0];
  return !base || PARAKEET_LANGUAGES.split(" ").includes(base);
}
var DEFAULT_MODEL = "mlx-community/parakeet-tdt-0.6b-v3";
var PARAKEET_INSTALL = "uv venv ~/.venvs/parakeet && VIRTUAL_ENV=~/.venvs/parakeet uv pip install parakeet-mlx";
function isRunnable(bin) {
  try {
    execFileSync(bin, ["--help"], { stdio: ["ignore", "ignore", "ignore"], timeout: 1e4 });
    return true;
  } catch {
    return false;
  }
}
function findParakeet() {
  const candidates = [
    process.env.HYPERFRAMES_PARAKEET,
    join(homedir(), ".venvs", "parakeet", "bin", "parakeet-mlx")
  ].filter((p) => Boolean(p));
  for (const path of candidates) {
    if (existsSync(path) && isRunnable(path)) return path;
  }
  try {
    const which = process.platform === "win32" ? "where" : "which";
    const out = execFileSync(which, ["parakeet-mlx"], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5e3
    });
    const first = out.split(/\r?\n/).map((s) => s.trim()).find(Boolean);
    if (first && existsSync(first)) return first;
  } catch {
  }
  return void 0;
}
function tokenBounds(token) {
  const text = typeof token.text === "string" ? token.text : "";
  const start = typeof token.start === "number" ? token.start : 0;
  const end = typeof token.end === "number" ? token.end : start;
  return { text, start, end };
}
function mergeTokensToWords(parakeet) {
  const words = [];
  for (const sentence of parakeet.sentences ?? []) {
    for (const token of sentence.tokens ?? []) {
      const { text, start, end } = tokenBounds(token);
      if (text.startsWith(" ") || words.length === 0) {
        words.push({ text: text.trim(), start, end });
      } else {
        const w = words[words.length - 1];
        w.text += text;
        w.end = end;
      }
    }
  }
  return words.filter((w) => w.text.length > 0);
}
var roundToMs = (seconds) => Math.round(seconds * 1e3) / 1e3;
function mergeWindowsToWords(windows) {
  return mergeTokensToWords({
    sentences: windows.map((w) => ({
      tokens: w.tokens.map((text, i) => {
        const start = w.offset + (w.timestamps[i] ?? 0);
        return { text, start: roundToMs(start), end: roundToMs(start + (w.durations?.[i] ?? 0)) };
      })
    }))
  });
}
function meanEnergy(samples, from, to) {
  let energy = 0;
  for (let i = from; i < to; i++) energy += samples[i] * samples[i];
  return energy / Math.max(1, to - from);
}
function droppedSpeechGaps(samples, sampleRate, decoded) {
  if (decoded.tokens.length === 0) return [];
  const loud = 0.3 * meanEnergy(samples, 0, samples.length);
  const { timestamps, durations } = decoded;
  const gapStarts = [0, ...timestamps.map((t, i) => t + (durations?.[i] ?? 0))];
  const gapEnds = [...timestamps, samples.length / sampleRate];
  const at = (seconds) => Math.round(seconds * sampleRate);
  return gapStarts.map((from, i) => [from, gapEnds[i]]).filter(([from, to]) => to - from >= 1 && meanEnergy(samples, at(from), at(to)) > loud);
}
function overlap(a, b) {
  for (let n = Math.min(a.length, b.length); n > 0; n--) {
    if (a.slice(-n).every((text, i) => text === b[i])) return n;
  }
  return 0;
}
function wordsOf(tokens) {
  const words = [];
  for (const t of tokens) {
    if (t.text.startsWith(" ") || words.length === 0) words.push([t]);
    else words.at(-1).push(t);
  }
  return words;
}
var letters = (word) => word.map((t) => t.text).join("").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
var EDGE_SECONDS = 0.3;
function spliceGap(decoded, patch, offset, [from, to]) {
  const tokens = (w, shift) => w.tokens.map((text, i) => ({
    text,
    start: shift + w.timestamps[i],
    duration: w.durations?.[i] ?? 0
  }));
  const kept = wordsOf(tokens(decoded, 0));
  const added = wordsOf(tokens(patch, offset)).filter(
    ([first]) => first.start >= from && first.start < to
  );
  const before = kept.filter(([first]) => first.start < from).map(letters);
  const after = kept.filter(([first]) => first.start >= to).map(letters);
  const head = added.filter(([first]) => first.start < from + EDGE_SECONDS).map(letters);
  const tail = added.filter(([first]) => first.start >= to - EDGE_SECONDS).map(letters);
  const fresh = added.slice(overlap(before, head), added.length - overlap(tail, after)).map(([first, ...rest]) => [{ ...first, text: ` ${first.text.trimStart()}` }, ...rest]);
  const merged = [...kept, ...fresh].sort((a, b) => a[0].start - b[0].start).flat();
  return {
    tokens: merged.map((t) => t.text),
    timestamps: merged.map((t) => t.start),
    durations: merged.map((t) => t.duration)
  };
}
function quietestBlockCenter(samples, lo, hi, block) {
  let best = hi;
  let bestEnergy = Infinity;
  for (let s = lo; s + block <= hi; s += block) {
    const energy = meanEnergy(samples, s, s + block);
    if (energy < bestEnergy) {
      bestEnergy = energy;
      best = s + block / 2;
    }
  }
  return best;
}
function silenceCuts(samples, sampleRate, windowSeconds = 60) {
  const window = windowSeconds * sampleRate;
  const slack = 5 * sampleRate;
  const cuts = [0];
  while (cuts.at(-1) + window < samples.length) {
    const target = cuts.at(-1) + window;
    const hi = Math.min(target + slack, samples.length);
    cuts.push(quietestBlockCenter(samples, target - slack, hi, sampleRate / 10));
  }
  if (samples.length > 0) cuts.push(samples.length);
  return cuts;
}
function transcribeWithParakeet(inputPath, dir, options) {
  const runner = findParakeet();
  if (!runner) {
    throw new Error(
      `parakeet-mlx not found. Enable the Parakeet engine with:
  ${PARAKEET_INSTALL}
(or use --engine whisper)`
    );
  }
  const model = options?.model ?? DEFAULT_MODEL;
  const cached = existsSync(
    join(homedir(), ".cache", "huggingface", "hub", `models--${model.replace(/\//g, "--")}`)
  );
  options?.onProgress?.(
    cached ? "Transcribing with Parakeet..." : "Downloading Parakeet model (first run, ~600MB)..."
  );
  const workDir = mkdtempSync(join(tmpdir(), "hyperframes-parakeet-"));
  try {
    const argv = [inputPath, "--model", model, "--output-format", "json", "--output-dir", workDir];
    options?.onEvent?.({
      type: "progress",
      phase: "transcription",
      model: PARAKEET_MODEL_LABEL,
      status: "started"
    });
    execFileSync(runner, argv, { stdio: ["ignore", "pipe", "pipe"], timeout: 18e5 });
    const produced = join(workDir, `${basename(inputPath, extname(inputPath))}.json`);
    if (!existsSync(produced)) throw new Error("Parakeet did not produce output.");
    const result = writeParakeetTranscript(
      dir,
      mergeTokensToWords(JSON.parse(readFileSync(produced, "utf-8")))
    );
    options?.onEvent?.({
      type: "progress",
      phase: "transcription",
      model: result.model,
      status: "completed"
    });
    return result;
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
}
function writeParakeetTranscript(dir, words) {
  mkdirSync(dir, { recursive: true });
  const transcriptPath = join(dir, "transcript.json");
  writeFileSync(transcriptPath, JSON.stringify(words, null, 2));
  const durationSeconds = words.length > 0 ? words[words.length - 1].end : 0;
  return {
    model: PARAKEET_MODEL_LABEL,
    detectedLanguage: null,
    transcriptPath,
    wordCount: words.length,
    durationSeconds,
    speechOnsetSeconds: null
  };
}

export {
  PARAKEET_MODEL_LABEL,
  SHERPA_RESULT_PREFIX,
  SHERPA_ERROR_PREFIX,
  SHERPA_WINDOW_PREFIX,
  PARAKEET_LANGUAGES,
  parakeetSpeaks,
  findParakeet,
  mergeWindowsToWords,
  droppedSpeechGaps,
  spliceGap,
  silenceCuts,
  transcribeWithParakeet,
  writeParakeetTranscript
};
