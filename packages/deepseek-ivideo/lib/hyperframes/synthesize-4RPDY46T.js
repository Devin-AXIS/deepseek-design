import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  DEFAULT_VOICE,
  ensureModel,
  ensureVoices,
  inferLangFromVoiceId
} from "./chunk-JYYOAKHS.js";
import {
  findPython,
  hasPythonPackage
} from "./chunk-5ETJX6WM.js";
import {
  writeNewFileSync
} from "./chunk-4YYJOFKS.js";
import "./chunk-WCJGTLPF.js";
import "./chunk-M2WBOQ2Q.js";

// src/tts/synthesize.ts
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { join, dirname, basename } from "path";
import { homedir } from "os";
var SYNTH_SCRIPT = `
import sys, json, inspect, re

model_path = sys.argv[1]
voices_path = sys.argv[2]
text = sys.argv[3]
voice = sys.argv[4]
speed = float(sys.argv[5])
output_path = sys.argv[6]
lang = sys.argv[7] if len(sys.argv) > 7 else ""

import kokoro_onnx
import soundfile as sf

model = kokoro_onnx.Kokoro(model_path, voices_path)

kwargs = {"voice": voice, "speed": speed}
supports_lang = "lang" in inspect.signature(model.create).parameters
if lang and supports_lang:
    kwargs["lang"] = lang

def is_voice_token_overflow(error):
    return bool(re.search(
        r"index \\d+ is out of bounds for axis 0 with size 510",
        str(error),
        re.IGNORECASE,
    ))

def split_for_retry(value):
    midpoint = len(value) // 2
    boundaries = [
        index + 1
        for index, char in enumerate(value)
        if (char in "\u3002\uFF01\uFF1F!?\\n" or char.isspace()) and 0 < index < len(value) - 1
    ]
    split_at = min(boundaries, key=lambda index: abs(index - midpoint)) if boundaries else midpoint
    return value[:split_at], value[split_at:]

def synthesize_text(value):
    try:
        return model.create(value, **kwargs)
    except IndexError as error:
        if not is_voice_token_overflow(error) or len(value) < 2:
            raise
        left, right = split_for_retry(value)
        left_samples, left_rate = synthesize_text(left)
        right_samples, right_rate = synthesize_text(right)
        if left_rate != right_rate:
            raise RuntimeError("Kokoro returned inconsistent sample rates across text chunks")
        samples = list(left_samples)
        samples.extend(right_samples)
        return samples, left_rate

samples, sample_rate = synthesize_text(text)
sf.write(output_path, samples, sample_rate)

duration = len(samples) / sample_rate
print(json.dumps({
    "outputPath": output_path,
    "sampleRate": sample_rate,
    "durationSeconds": round(duration, 3),
    "langApplied": bool(lang and supports_lang),
}))
`;
var ESPEAK_LANG_OVERRIDES = {
  zh: "cmn"
};
var SCRIPT_DIR = join(homedir(), ".cache", "hyperframes", "tts");
var SCRIPT_PATH = join(SCRIPT_DIR, "synth-v3.py");
function ensureSynthScript() {
  if (!existsSync(SCRIPT_PATH)) {
    mkdirSync(SCRIPT_DIR, { recursive: true });
    writeNewFileSync(SCRIPT_PATH, SYNTH_SCRIPT);
    const currentName = basename(SCRIPT_PATH);
    try {
      for (const entry of readdirSync(SCRIPT_DIR)) {
        if (entry !== currentName && /^synth(-v\d+)?\.py$/.test(entry)) {
          try {
            unlinkSync(join(SCRIPT_DIR, entry));
          } catch {
          }
        }
      }
    } catch {
    }
  }
  return SCRIPT_PATH;
}
async function synthesize(text, outputPath, options) {
  const voice = options?.voice ?? DEFAULT_VOICE;
  const speed = options?.speed ?? 1;
  const lang = options?.lang ?? inferLangFromVoiceId(voice);
  options?.onProgress?.("Checking Python runtime...");
  const python = findPython();
  if (!python) {
    throw new Error(
      "Python 3 is required for text-to-speech. Install Python 3.10+ and run: pip install kokoro-onnx soundfile (or point HYPERFRAMES_PYTHON at a venv python that has them)"
    );
  }
  if (!hasPythonPackage(python, "kokoro_onnx")) {
    throw new Error(
      "The kokoro-onnx package is not installed. Run: pip install kokoro-onnx soundfile (or point HYPERFRAMES_PYTHON at a venv python that has them)"
    );
  }
  if (!hasPythonPackage(python, "soundfile")) {
    throw new Error("The soundfile package is not installed. Run: pip install soundfile");
  }
  const [modelPath, voicesPath] = await Promise.all([
    ensureModel(options?.model, { onProgress: options?.onProgress }),
    ensureVoices({ onProgress: options?.onProgress })
  ]);
  const scriptPath = ensureSynthScript();
  mkdirSync(dirname(outputPath), { recursive: true });
  options?.onProgress?.(`Generating speech with voice ${voice} (${lang})...`);
  try {
    const espeakLang = ESPEAK_LANG_OVERRIDES[lang] ?? lang;
    const stdout = execFileSync(
      python,
      [scriptPath, modelPath, voicesPath, text, voice, String(speed), outputPath, espeakLang],
      {
        encoding: "utf-8",
        timeout: 3e5,
        stdio: ["pipe", "pipe", "pipe"]
      }
    );
    if (!existsSync(outputPath)) {
      throw new Error("Synthesis completed but no output file was created");
    }
    const lines = stdout.trim().split("\n");
    const jsonLine = lines[lines.length - 1] ?? "";
    const result = JSON.parse(jsonLine);
    return {
      outputPath: result.outputPath,
      sampleRate: result.sampleRate,
      durationSeconds: result.durationSeconds,
      langApplied: result.langApplied
    };
  } catch (err) {
    if (err instanceof SyntaxError && existsSync(outputPath)) {
      throw new Error(
        "Speech was generated but metadata could not be read. Check the output file manually."
      );
    }
    let detail = "";
    if (err && typeof err === "object" && "stderr" in err) {
      const stderr = String(err.stderr).trim();
      if (stderr) detail = `
${stderr.slice(-500)}`;
    }
    throw new Error(`Speech synthesis failed${detail}`);
  }
}
export {
  synthesize
};
