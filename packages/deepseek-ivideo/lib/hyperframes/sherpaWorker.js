import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  SHERPA_ERROR_PREFIX,
  SHERPA_RESULT_PREFIX,
  SHERPA_WINDOW_PREFIX,
  droppedSpeechGaps,
  silenceCuts,
  spliceGap
} from "./chunk-KDPYVTEU.js";
import {
  readWav
} from "./chunk-UOFAE5RF.js";
import "./chunk-M2WBOQ2Q.js";

// src/whisper/sherpaWorker.ts
import { createRequire } from "module";
var { wavPath, runtimePath, config } = JSON.parse(process.env.HYPERFRAMES_PARAKEET_INPUT ?? "{}");
var parentPid = process.ppid;
var RETRY_PAD_SECONDS = 0.5;
var GAP_MARGIN_SECONDS = 0.5;
function decodeWindow(recognizer, wave, padSeconds = 0) {
  const pad = Math.round(padSeconds * wave.sampleRate);
  const samples = new Float32Array(pad + wave.samples.length);
  samples.set(wave.samples, pad);
  const stream = recognizer.createStream();
  stream.acceptWaveform({ sampleRate: wave.sampleRate, samples });
  recognizer.decode(stream);
  const { tokens, timestamps, durations } = recognizer.getResult(stream);
  return { tokens, timestamps: timestamps.map((t) => Math.max(0, t - padSeconds)), durations };
}
try {
  const sherpa = createRequire(import.meta.url)(runtimePath);
  const recognizer = new sherpa.OfflineRecognizer(config);
  const wave = readWav(wavPath);
  const cuts = silenceCuts(wave.samples, wave.sampleRate);
  const windows = [];
  for (let k = 0; k + 1 < cuts.length; k++) {
    if (process.ppid !== parentPid) throw new Error("the CLI exited, so the decode stopped");
    const slice = {
      sampleRate: wave.sampleRate,
      samples: wave.samples.subarray(cuts[k], cuts[k + 1])
    };
    let decoded = decodeWindow(recognizer, slice);
    const gaps = droppedSpeechGaps(slice.samples, slice.sampleRate, decoded);
    let spliced = decoded;
    for (const [from, to] of gaps) {
      const lo = Math.max(0, from - GAP_MARGIN_SECONDS);
      const at = (seconds) => Math.round(seconds * slice.sampleRate);
      const samples = slice.samples.subarray(at(lo), at(to + GAP_MARGIN_SECONDS));
      const patch = decodeWindow(
        recognizer,
        { sampleRate: slice.sampleRate, samples },
        RETRY_PAD_SECONDS
      );
      spliced = spliceGap(spliced, patch, lo, [from, to]);
    }
    if (spliced.tokens.length > decoded.tokens.length) decoded = spliced;
    else if (gaps.length > 0) {
      const retry = decodeWindow(recognizer, slice, RETRY_PAD_SECONDS);
      if (retry.tokens.length > decoded.tokens.length) decoded = retry;
    }
    const window = { offset: cuts[k] / wave.sampleRate, ...decoded };
    windows.push(window);
    const through = cuts[k + 1] / wave.sampleRate;
    process.stdout.write(`${SHERPA_WINDOW_PREFIX}${JSON.stringify({ window, through })}
`);
  }
  process.stdout.write(`${SHERPA_RESULT_PREFIX}${JSON.stringify(windows)}
`);
} catch (err) {
  const message = (err instanceof Error ? err.message : String(err)).replace(/\s+/g, " ").trim();
  process.stderr.write(`${SHERPA_ERROR_PREFIX}${message}
`, () => {
    throw err;
  });
}
