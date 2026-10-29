import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  downloadFile
} from "./chunk-WCJGTLPF.js";

// src/background-removal/manager.ts
import { existsSync, mkdirSync } from "fs";
import { homedir, platform, arch } from "os";
import { join } from "path";
var MODELS_DIR = join(homedir(), ".cache", "hyperframes", "background-removal", "models");
var DEFAULT_MODEL = "u2net_human_seg";
var MODEL_URLS = {
  u2net_human_seg: "https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net_human_seg.onnx"
};
var MODEL_MEMORY_MB = {
  u2net_human_seg: 1500
};
var DEVICES = ["auto", "cpu", "coreml", "cuda"];
function isDevice(value) {
  return typeof value === "string" && DEVICES.includes(value);
}
function selectProviders(device = "auto") {
  if (device === "cpu") return { providers: ["cpu"], label: "CPU" };
  const available = listAvailableProviders();
  const hasCoreML = available.includes("coreml");
  const hasCUDA = available.includes("cuda");
  if (device === "coreml") {
    if (!hasCoreML) {
      throw new Error(
        "CoreML execution provider not available. Install onnxruntime-node on Apple Silicon, or use --device cpu."
      );
    }
    return { providers: ["coreml", "cpu"], label: "CoreML" };
  }
  if (device === "cuda") {
    if (!hasCUDA) {
      throw new Error(
        "CUDA execution provider not available. Use --device cpu or install an onnxruntime-node build with CUDA support."
      );
    }
    return { providers: ["cuda", "cpu"], label: "CUDA" };
  }
  if (hasCoreML && platform() === "darwin" && arch() === "arm64") {
    return { providers: ["coreml", "cpu"], label: "CoreML" };
  }
  if (hasCUDA) return { providers: ["cuda", "cpu"], label: "CUDA" };
  return { providers: ["cpu"], label: "CPU" };
}
var _cachedProviders;
function listAvailableProviders() {
  if (_cachedProviders) return _cachedProviders;
  const out = ["cpu"];
  if (platform() === "darwin" && arch() === "arm64") out.push("coreml");
  if (process.env["HYPERFRAMES_CUDA"] === "1") out.push("cuda");
  _cachedProviders = out;
  return out;
}
function modelPath(model = DEFAULT_MODEL) {
  return join(MODELS_DIR, `${model}.onnx`);
}
async function ensureModel(model = DEFAULT_MODEL, options) {
  const dest = modelPath(model);
  if (existsSync(dest)) return dest;
  mkdirSync(MODELS_DIR, { recursive: true });
  options?.onProgress?.(`Downloading ${model} weights (~168 MB)...`);
  await downloadFile(MODEL_URLS[model], dest);
  if (!existsSync(dest)) {
    throw new Error(`Model download failed: ${model}`);
  }
  return dest;
}

export {
  MODELS_DIR,
  DEFAULT_MODEL,
  MODEL_MEMORY_MB,
  DEVICES,
  isDevice,
  selectProviders,
  listAvailableProviders,
  modelPath,
  ensureModel
};
