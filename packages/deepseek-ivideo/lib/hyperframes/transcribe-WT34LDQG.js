import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  createProgressWriter
} from "./chunk-6IHWCZ3W.js";
import {
  DEFAULT_MODEL,
  isWhisperUnavailable
} from "./chunk-PXSM4HPB.js";
import "./chunk-WCJGTLPF.js";
import {
  trackTranscribeUnavailable
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  ft
} from "./chunk-WMQNIQDJ.js";
import "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import "./chunk-LCSMOLGX.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  PARAKEET_LANGUAGES,
  findParakeet,
  parakeetSpeaks,
  transcribeWithParakeet
} from "./chunk-KDPYVTEU.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/transcribe.ts
import { existsSync, rmSync, writeFileSync } from "fs";
import { resolve, join, extname, dirname } from "path";
var examples = [
  ["Transcribe an audio file", "hyperframes transcribe audio.mp3"],
  ["Transcribe a video file", "hyperframes transcribe video.mp4"],
  ["Use a larger model for better accuracy", "hyperframes transcribe audio.mp3 --model medium.en"],
  ["Set language to filter non-target speech", "hyperframes transcribe audio.mp3 --language en"],
  ["Import an existing SRT file", "hyperframes transcribe subtitles.srt"],
  ["Import an OpenAI Whisper JSON response", "hyperframes transcribe response.json"],
  ["Export captions to SRT", "hyperframes transcribe transcript.json --to srt"],
  [
    "Export single-word/CJK captions without re-grouping",
    "hyperframes transcribe transcript.json --to vtt --preserve-cues"
  ]
];
var CLI_TIMEOUT_MIN_MS = 5e3;
var transcribe_default = defineCommand({
  meta: {
    name: "transcribe",
    description: "Transcribe audio/video to word-level timestamps, or import an existing transcript"
  },
  args: {
    input: {
      type: "positional",
      description: "Audio/video file to transcribe, or transcript file to import (.json, .srt, .vtt)",
      required: true
    },
    dir: {
      type: "string",
      description: "Project directory (default: current directory)",
      alias: "d"
    },
    engine: {
      type: "string",
      description: "ASR engine: auto (Parakeet if installed and it covers --language, else whisper), parakeet, or whisper. Default: auto. Parakeet is more accurate and faster; install it with `hyperframes models install parakeet`.",
      alias: "e"
    },
    model: {
      type: "string",
      description: `Whisper model (default: ${DEFAULT_MODEL}). Options: tiny.en, base.en, small.en, medium.en, large-v3`,
      alias: "m"
    },
    language: {
      type: "string",
      description: "Language code (e.g. en, es, ja). Whisper transcribes as this language; Parakeet, used when it covers it, detects the language itself.",
      alias: "l"
    },
    json: {
      type: "boolean",
      description: "Output result as JSON; progress JSON lines go to stderr",
      default: false
    },
    to: {
      type: "string",
      description: "Export transcript sidecar format: srt or vtt"
    },
    output: {
      type: "string",
      alias: "o",
      description: "Output path for exported SRT/VTT sidecar"
    },
    "preserve-cues": {
      type: "boolean",
      description: "Keep each transcript entry as its own caption cue (skip word-level grouping). Use when exporting an already-cued transcript whose entries have no internal spaces, e.g. single-word or CJK captions.",
      default: false
    },
    "runtime-install": {
      type: "boolean",
      default: true,
      description: "Allow installing the Whisper runtime. Use --no-runtime-install to require an existing runtime; model downloads remain allowed."
    },
    optional: {
      type: "boolean",
      description: "Treat captions as optional: if whisper-cpp is unavailable, skip and exit 0 instead of failing. For pipelines that continue without captions.",
      default: false
    },
    timeout: {
      type: "string",
      description: "Whisper spawn timeout in ms. Overrides the duration+model auto-scaled default. Increase on slow CPUs (e.g. emulated arm64/x64, low-power laptops) where whisper.cpp takes many seconds per audio second on medium/large models. Applies to the whisper engine only; Parakeet has a separate fixed timeout. Minimum 5000 (5 s). Env: HYPERFRAMES_TRANSCRIBE_TIMEOUT_MS."
    }
  },
  async run({ args }) {
    const inputPath = resolve(args.input);
    if (!existsSync(inputPath)) {
      const message = `File not found: ${args.input}`;
      console.error(c.error(message));
      failCommand(1, message);
    }
    const dir = resolve(args.dir ?? dirname(inputPath));
    const ext = extname(inputPath).toLowerCase();
    const isImport = ext === ".json" || ext === ".srt" || ext === ".vtt";
    const to = parseExportFormat(args.to, args.json);
    if (to) {
      if (!isImport) {
        failWith(
          "--to can only export from transcript files (.json, .srt, .vtt). Run transcribe first.",
          args.json
        );
      }
      return exportTranscript(inputPath, dir, to, args.output, args.json, args["preserve-cues"]);
    }
    if (isImport) {
      return importTranscript(inputPath, dir, args.json);
    }
    const timeoutMs = parseTimeoutMs(args.timeout, args.json);
    return transcribeAudio(inputPath, dir, {
      engine: args.engine,
      model: args.model,
      language: args.language,
      json: args.json,
      optional: args.optional,
      installRuntime: args["runtime-install"],
      timeoutMs
    });
  }
});
function parseTimeoutMs(raw, json) {
  const source = raw ?? process.env["HYPERFRAMES_TRANSCRIBE_TIMEOUT_MS"];
  if (source == null || source === "") return void 0;
  const parsed = Number.parseInt(source, 10);
  if (!Number.isFinite(parsed) || parsed < CLI_TIMEOUT_MIN_MS) {
    const origin = raw != null ? "--timeout" : "HYPERFRAMES_TRANSCRIBE_TIMEOUT_MS";
    failWith(
      `Invalid ${origin}: "${source}". Must be an integer >= ${CLI_TIMEOUT_MIN_MS} (ms).`,
      json
    );
  }
  return parsed;
}
function failWith(message, json) {
  if (json) {
    console.log(JSON.stringify({ ok: false, error: message }));
  } else {
    console.error(c.error(message));
  }
  failCommand(1, message);
}
function parseExportFormat(value, json) {
  if (!value) return void 0;
  const normalized = value.toLowerCase();
  if (normalized === "srt" || normalized === "vtt") return normalized;
  failWith(`Unsupported caption export format: ${value}. Use srt or vtt.`, json);
}
function exitNoWords(json) {
  failWith("No words found in transcript.", json);
}
async function importTranscript(inputPath, dir, json) {
  const { loadTranscript, patchCaptionHtml } = await import("./normalize-IGLHCWTF.js");
  const { words, format } = loadTranscript(inputPath);
  if (words.length === 0) exitNoWords(json);
  const outPath = join(dir, "transcript.json");
  writeFileSync(outPath, JSON.stringify(words, null, 2));
  patchCaptionHtml(dir, words);
  if (json) {
    console.log(
      JSON.stringify({ ok: true, format, wordCount: words.length, transcriptPath: outPath })
    );
  } else {
    console.log(
      `${c.success("\u25C7")}  Imported ${c.accent(String(words.length))} words from ${c.accent(format)} format \u2192 ${c.accent("transcript.json")}`
    );
  }
}
async function exportTranscript(inputPath, dir, to, output, json, preserveCues) {
  const { loadTranscript, formatSrt, formatVtt } = await import("./normalize-IGLHCWTF.js");
  const { words, format } = loadTranscript(inputPath);
  if (words.length === 0) exitNoWords(json);
  const preGrouped = preserveCues || format === "srt" || format === "vtt" || void 0;
  const outPath = resolve(output ?? join(dir, `transcript.${to}`));
  const content = to === "srt" ? formatSrt(words, { preGrouped }) : formatVtt(words, { preGrouped });
  writeFileSync(outPath, content);
  if (json) {
    console.log(
      JSON.stringify({ ok: true, format: to, wordCount: words.length, outputPath: outPath })
    );
  } else {
    console.log(
      `${c.success("\u25C7")}  Exported ${c.accent(String(words.length))} words to ${c.accent(to.toUpperCase())} \u2192 ${c.accent(outPath)}`
    );
  }
}
var PARAKEET_INSTALL_COMMAND = "hyperframes models install parakeet";
function pickRunner(engine, sherpaUsable, language) {
  if (engine === "whisper" || !parakeetSpeaks(language)) return "whisper";
  if (sherpaUsable()) return "sherpa";
  return findParakeet() ? "parakeet-mlx" : "whisper";
}
var parakeetFallsBack = (engine) => engine === "auto";
async function transcribeAudio(inputPath, dir, opts) {
  const { transcribe } = await import("./transcribe-5NQZDEAX.js");
  const { loadTranscript, patchCaptionHtml } = await import("./normalize-IGLHCWTF.js");
  const {
    DecodeCancelled,
    prepareSherpaWav,
    sherpaParakeetInstalled,
    sherpaUnsupportedReason,
    transcribeWithSherpa
  } = await import("./sherpa-LCYCZKZD.js");
  const { createRenderCancellationScope, stoppedByCancelSignal } = await import("./renderCancellation-2I42VBS4.js");
  const engine = (opts.engine ?? "auto").toLowerCase();
  if (engine !== "auto" && engine !== "parakeet" && engine !== "whisper") {
    failWith(`Unknown --engine: ${opts.engine}. Use auto, parakeet, or whisper.`, !!opts.json);
  }
  const unsupported = sherpaUnsupportedReason();
  const sherpaUsable = () => !unsupported && sherpaParakeetInstalled();
  let runner = pickRunner(engine, sherpaUsable, opts.language);
  if (engine === "parakeet" && runner === "whisper") {
    failWith(
      !parakeetSpeaks(opts.language) ? `Parakeet does not transcribe --language ${opts.language}; it covers ${PARAKEET_LANGUAGES.split(" ").join(", ")}. Use --engine whisper.` : unsupported ?? `Parakeet is not installed. Install it with: ${PARAKEET_INSTALL_COMMAND} (or use --engine whisper)`,
      !!opts.json
    );
  }
  const model = opts.model ?? DEFAULT_MODEL;
  if (runner !== "whisper" && opts.model && !opts.json) {
    console.error(
      c.dim(`  Note: --model applies to the whisper engine only; ignored under Parakeet.`)
    );
  }
  const label = (r) => c.accent(r === "whisper" ? model : "Parakeet");
  const spin = opts.json ? null : ft();
  spin?.start(`Transcribing with ${label(runner)}...`);
  const onProgress = spin ? (msg) => spin.message(msg) : void 0;
  const onEvent = opts.json ? createProgressWriter(process.stderr) : void 0;
  let wavPath = inputPath;
  let cancellation = runner === "sherpa" ? createRenderCancellationScope() : null;
  const run = (r) => {
    switch (r) {
      case "sherpa":
        return transcribeWithSherpa(wavPath, dir, {
          onProgress,
          onEvent,
          signal: cancellation.signal
        });
      case "parakeet-mlx":
        return transcribeWithParakeet(wavPath, dir, {
          onProgress,
          onEvent
        });
      case "whisper":
        return transcribe(wavPath, dir, {
          model,
          language: opts.language,
          onProgress,
          onEvent,
          timeoutMs: opts.timeoutMs,
          installRuntime: opts.installRuntime,
          startCancellation: () => (cancellation ??= createRenderCancellationScope()).signal
        });
      default: {
        const unreachable = r;
        throw new Error(`Unknown transcription runner: ${unreachable}`);
      }
    }
  };
  try {
    if (runner === "sherpa") wavPath = prepareSherpaWav(inputPath, onProgress);
    let result;
    try {
      result = await run(runner);
    } catch (err) {
      if (runner !== "sherpa" || err instanceof DecodeCancelled) throw err;
      const reason = normalizeErrorMessage(err).replace(/\.+$/, "");
      const parakeetError = `Parakeet failed: ${reason}. To repair it, run: ${PARAKEET_INSTALL_COMMAND}`;
      if (!parakeetFallsBack(engine)) throw new Error(parakeetError);
      runner = pickRunner(engine, () => false, opts.language);
      spin?.clear();
      console.error(c.warn(`${parakeetError}. Using ${runner} for this run.`));
      spin?.start(`Transcribing with ${label(runner)}...`);
      try {
        result = await run(runner);
      } catch (fallbackErr) {
        if (stoppedByCancelSignal(fallbackErr)) {
          throw new DecodeCancelled("Transcription cancelled");
        }
        const why = normalizeErrorMessage(fallbackErr);
        throw new Error(`${parakeetError}. The ${runner} fallback failed too: ${why}`);
      }
    }
    const { words } = loadTranscript(result.transcriptPath);
    writeFileSync(result.transcriptPath, JSON.stringify(words, null, 2));
    patchCaptionHtml(dir, words);
    if (opts.json) {
      console.log(
        JSON.stringify({
          ok: true,
          engine: runner === "whisper" ? "whisper" : "parakeet",
          model: result.model,
          detectedLanguage: result.detectedLanguage,
          wordCount: words.length,
          durationSeconds: result.durationSeconds,
          speechOnsetSeconds: result.speechOnsetSeconds,
          transcriptPath: result.transcriptPath
        })
      );
    } else {
      const onsetNote = result.speechOnsetSeconds != null ? ` \u2014 speech detected at ${result.speechOnsetSeconds.toFixed(1)}s` : "";
      spin?.stop(
        c.success(
          `Transcribed ${c.accent(String(words.length))} words (${result.durationSeconds.toFixed(1)}s${onsetNote})`
        )
      );
    }
  } catch (err) {
    if (err instanceof DecodeCancelled || cancellation?.signal.aborted) {
      const message2 = "Transcription cancelled";
      if (opts.json) console.log(JSON.stringify({ ok: false, error: message2 }));
      else spin?.stop(c.warn(message2));
      setCommandExitCode(130);
      return;
    }
    const base = err instanceof Error ? err.message : String(err);
    const stderr = err && typeof err === "object" && "stderr" in err && err.stderr ? String(err.stderr).trim().split("\n").slice(-3).filter((line) => !base.includes(line)).join("\n") : "";
    const message = stderr ? `${base}
${stderr}` : base;
    if (isWhisperUnavailable(err)) {
      trackTranscribeUnavailable({ optional: opts.optional === true });
      const install = engine === "auto" && parakeetSpeaks(opts.language) && !unsupported ? PARAKEET_INSTALL_COMMAND : void 0;
      if (opts.json) {
        console.log(
          JSON.stringify({ ok: false, skipped: true, reason: "whisper_unavailable", install })
        );
      } else {
        const orParakeet = install ? `
Or transcribe with Parakeet after: ${install}` : "";
        spin?.stop(c.warn(`Captions skipped \u2014 ${message}${orParakeet}`));
      }
      setCommandExitCode(opts.optional ? 0 : 1);
      return;
    }
    if (opts.json) {
      console.log(JSON.stringify({ ok: false, error: message }));
    } else {
      spin?.stop(c.error(`Transcription failed: ${message}`));
    }
    failCommand(1, err);
  } finally {
    cancellation?.dispose();
    if (wavPath !== inputPath) rmSync(wavPath, { force: true });
  }
}
export {
  transcribe_default as default,
  examples
};
