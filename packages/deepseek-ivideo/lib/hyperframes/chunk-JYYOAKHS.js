import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  downloadFile
} from "./chunk-WCJGTLPF.js";

// src/tts/manager.ts
import { existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";
var CACHE_DIR = join(homedir(), ".cache", "hyperframes", "tts");
var MODELS_DIR = join(CACHE_DIR, "models");
var VOICES_DIR = join(CACHE_DIR, "voices");
var DEFAULT_MODEL = "kokoro-v1.0";
var MODEL_URLS = {
  "kokoro-v1.0": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx"
};
var VOICES_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin";
var SUPPORTED_LANGS = [
  "en-us",
  "en-gb",
  "es",
  "fr-fr",
  "hi",
  "it",
  "pt-br",
  "ja",
  "zh"
];
var VOICE_PREFIX_LANG = {
  a: "en-us",
  // American English
  b: "en-gb",
  // British English
  e: "es",
  // Spanish
  f: "fr-fr",
  // French
  h: "hi",
  // Hindi
  i: "it",
  // Italian
  j: "ja",
  // Japanese
  p: "pt-br",
  // Brazilian Portuguese
  z: "zh"
  // Mandarin
};
function inferLangFromVoiceId(voiceId) {
  const first = voiceId.charAt(0).toLowerCase();
  return VOICE_PREFIX_LANG[first] ?? "en-us";
}
function isSupportedLang(value) {
  return SUPPORTED_LANGS.includes(value);
}
var BUNDLED_VOICES = [
  { id: "af_heart", label: "Heart", language: "en-US", gender: "female" },
  { id: "af_nova", label: "Nova", language: "en-US", gender: "female" },
  { id: "af_sky", label: "Sky", language: "en-US", gender: "female" },
  { id: "am_adam", label: "Adam", language: "en-US", gender: "male" },
  { id: "am_michael", label: "Michael", language: "en-US", gender: "male" },
  { id: "bf_emma", label: "Emma", language: "en-GB", gender: "female" },
  { id: "bf_isabella", label: "Isabella", language: "en-GB", gender: "female" },
  { id: "bm_george", label: "George", language: "en-GB", gender: "male" },
  { id: "ef_dora", label: "Dora", language: "es", gender: "female" },
  { id: "ff_siwis", label: "Siwis", language: "fr-FR", gender: "female" },
  { id: "jf_alpha", label: "Alpha", language: "ja", gender: "female" },
  { id: "zf_xiaobei", label: "Xiaobei", language: "zh", gender: "female" }
];
var DEFAULT_VOICE = "af_heart";
async function ensureModel(model = DEFAULT_MODEL, options) {
  const modelPath = join(MODELS_DIR, `${model}.onnx`);
  if (existsSync(modelPath)) return modelPath;
  const url = MODEL_URLS[model];
  if (!url) {
    throw new Error(
      `Unknown TTS model: ${model}. Available: ${Object.keys(MODEL_URLS).join(", ")}`
    );
  }
  mkdirSync(MODELS_DIR, { recursive: true });
  options?.onProgress?.(`Downloading TTS model ${model} (~311 MB)...`);
  await downloadFile(url, modelPath);
  if (!existsSync(modelPath)) {
    throw new Error(`Model download failed: ${model}`);
  }
  return modelPath;
}
async function ensureVoices(options) {
  const voicesPath = join(VOICES_DIR, "voices-v1.0.bin");
  if (existsSync(voicesPath)) return voicesPath;
  mkdirSync(VOICES_DIR, { recursive: true });
  options?.onProgress?.("Downloading voice data (~27 MB)...");
  await downloadFile(VOICES_URL, voicesPath);
  if (!existsSync(voicesPath)) {
    throw new Error("Voice data download failed");
  }
  return voicesPath;
}

export {
  SUPPORTED_LANGS,
  inferLangFromVoiceId,
  isSupportedLang,
  BUNDLED_VOICES,
  DEFAULT_VOICE,
  ensureModel,
  ensureVoices
};
