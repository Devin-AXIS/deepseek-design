import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  BUNDLED_VOICES,
  DEFAULT_VOICE,
  SUPPORTED_LANGS,
  inferLangFromVoiceId,
  isSupportedLang
} from "./chunk-JYYOAKHS.js";
import {
  errorBox
} from "./chunk-IHFUKJOR.js";
import "./chunk-WCJGTLPF.js";
import {
  ft
} from "./chunk-WMQNIQDJ.js";
import {
  isTextFile
} from "./chunk-K4WKGXRC.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand,
  failUsage
} from "./chunk-PBN6GBJE.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/tts.ts
import { readFileSync } from "fs";
import { resolve } from "path";
var examples = [
  ["Generate speech from text", 'hyperframes tts "Welcome to HyperFrames"'],
  ["Choose a voice", 'hyperframes tts "Hello world" --voice am_adam'],
  ["Save to a specific file", 'hyperframes tts "Intro" --voice bf_emma --output narration.wav'],
  ["Adjust speech speed", 'hyperframes tts "Slow and clear" --speed 0.8'],
  [
    "Generate Spanish speech",
    'hyperframes tts "La reuni\xF3n empieza a las nueve" --voice ef_dora --output es.wav'
  ],
  [
    "Override phonemizer language",
    'hyperframes tts "Ciao a tutti" --voice af_heart --lang it --output accented.wav'
  ],
  ["Read text from a file", "hyperframes tts script.txt"],
  ["List available voices", "hyperframes tts --list"]
];
var voiceList = BUNDLED_VOICES.map((v) => `${v.id} (${v.label})`).join(", ");
var langList = SUPPORTED_LANGS.join(", ");
var tts_default = defineCommand({
  meta: {
    name: "tts",
    description: "Generate speech audio from text using a local AI model (Kokoro-82M)"
  },
  args: {
    input: {
      type: "positional",
      description: "Text to speak, or path to a .txt file",
      required: false
    },
    "text-file": {
      type: "string",
      description: "Read text from a .txt file (compatibility alias)"
    },
    output: {
      type: "string",
      description: "Output file path (default: speech.wav in current directory)",
      alias: ["o", "out"]
    },
    voice: {
      type: "string",
      description: `Voice ID (default: ${DEFAULT_VOICE}). Options: ${voiceList}`,
      alias: "v"
    },
    speed: {
      type: "string",
      description: "Speech speed multiplier (default: 1.0)",
      alias: "s"
    },
    lang: {
      type: "string",
      description: `Phonemizer language (auto-detected from voice prefix when omitted). Options: ${langList}`,
      alias: "l"
    },
    list: {
      type: "boolean",
      description: "List available voices and exit",
      default: false
    },
    json: {
      type: "boolean",
      description: "Output result as JSON",
      default: false
    }
  },
  // fallow-ignore-next-line complexity
  async run({ args }) {
    if (args["text-file"] && args.input) {
      console.error(c.error("Pass text to speak or --text-file, not both."));
      failUsage();
    }
    if (args.list) {
      return listVoices(args.json);
    }
    const input = args["text-file"] ?? args.input;
    if (!input) {
      console.error(c.error("Provide text to speak, or use --list to see available voices."));
      failCommand();
    }
    let text;
    if (isTextFile(input)) {
      text = readFileSync(resolve(input), "utf-8").trim();
      if (!text) {
        console.error(c.error("File is empty."));
        failCommand();
      }
    } else {
      text = input;
    }
    if (!text.trim()) {
      console.error(c.error("No text provided."));
      failCommand();
    }
    const output = resolve(args.output ?? "speech.wav");
    const voice = args.voice ?? DEFAULT_VOICE;
    const speed = args.speed ? parseFloat(args.speed) : 1;
    if (isNaN(speed) || speed <= 0 || speed > 3) {
      console.error(c.error("Speed must be a number between 0.1 and 3.0"));
      failCommand();
    }
    const inferredLang = inferLangFromVoiceId(voice);
    let lang = inferredLang;
    if (args.lang != null) {
      const requested = String(args.lang).toLowerCase();
      if (!isSupportedLang(requested)) {
        errorBox("Invalid --lang", `Got "${args.lang}". Must be one of: ${langList}.`);
        failCommand();
      }
      lang = requested;
    }
    if (!args.json && args.lang != null && lang !== inferredLang) {
      console.log(
        c.dim(
          `  Note: voice "${voice}" is ${inferredLang}, rendering with --lang ${lang} instead.`
        )
      );
    }
    const { synthesize } = await import("./synthesize-4RPDY46T.js");
    const spin = args.json ? null : ft();
    spin?.start(`Generating speech with ${c.accent(voice)} (${lang})...`);
    try {
      const result = await synthesize(text, output, {
        voice,
        speed,
        lang,
        onProgress: spin ? (msg) => spin.message(msg) : void 0
      });
      if (args.json) {
        console.log(
          JSON.stringify({
            ok: true,
            voice,
            speed,
            lang,
            langApplied: result.langApplied,
            durationSeconds: result.durationSeconds,
            outputPath: result.outputPath
          })
        );
      } else {
        spin?.stop(
          c.success(
            `Generated ${c.accent(result.durationSeconds.toFixed(1) + "s")} of speech \u2192 ${c.accent(result.outputPath)}`
          )
        );
        if (args.lang != null && !result.langApplied) {
          console.log(
            c.dim(
              "  Note: installed kokoro-onnx version does not support the --lang kwarg; phonemization used Kokoro's default."
            )
          );
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (args.json) {
        console.log(JSON.stringify({ ok: false, error: message }));
      } else {
        spin?.stop(c.error(`Speech synthesis failed: ${message}`));
      }
      failCommand();
    }
  }
});
function listVoices(json) {
  const rows = BUNDLED_VOICES.map((v) => ({ ...v, defaultLang: inferLangFromVoiceId(v.id) }));
  if (json) {
    console.log(JSON.stringify(rows));
    return;
  }
  console.log(`
${c.bold("Available voices")} (Kokoro-82M)
`);
  console.log(
    `  ${c.dim("ID")}                ${c.dim("Name")}         ${c.dim("Language")}   ${c.dim("Lang code")}  ${c.dim("Gender")}`
  );
  console.log(`  ${c.dim("\u2500".repeat(72))}`);
  for (const row of rows) {
    const id = row.id.padEnd(18);
    const label = row.label.padEnd(13);
    const lang = row.language.padEnd(10);
    const code = row.defaultLang.padEnd(10);
    console.log(`  ${c.accent(id)} ${label} ${lang} ${code} ${row.gender}`);
  }
  console.log(
    `
  ${c.dim("Use any Kokoro voice ID \u2014 see https://github.com/thewh1teagle/kokoro-onnx for all 54 voices")}`
  );
  console.log(
    `  ${c.dim("Override phonemizer with --lang <" + SUPPORTED_LANGS.join("|") + ">")}
`
  );
}
export {
  tts_default as default,
  examples
};
