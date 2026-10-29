import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  downloadFile
} from "./chunk-WCJGTLPF.js";
import {
  findFFmpeg
} from "./chunk-TVCRUG2S.js";

// src/whisper/manager.ts
import { execFileSync } from "child_process";
import { existsSync, mkdirSync, rmSync } from "fs";
import { homedir, platform } from "os";
import { join } from "path";
var MODELS_DIR = join(homedir(), ".cache", "hyperframes", "whisper", "models");
var DEFAULT_MODEL = "small.en";
var WhisperUnavailableError = class extends Error {
  code = "WHISPER_UNAVAILABLE";
  constructor(message) {
    super(message);
    this.name = "WhisperUnavailableError";
  }
};
function isWhisperUnavailable(err) {
  if (err instanceof WhisperUnavailableError) return true;
  return err instanceof Error && "code" in err && err.code === "WHISPER_UNAVAILABLE";
}
function getModelUrl(model) {
  return `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-${model}.bin`;
}
function whichBinary(name) {
  try {
    const cmd = process.platform === "win32" ? "where" : "which";
    const output = execFileSync(cmd, [name], {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 5e3
    });
    const first = output.split(/\r?\n/).map((s) => s.trim()).find(Boolean);
    return first || void 0;
  } catch {
    return void 0;
  }
}
function findFromEnv() {
  const envPath = process.env["HYPERFRAMES_WHISPER_PATH"];
  if (envPath && existsSync(envPath)) {
    return { executablePath: envPath, source: "env" };
  }
  return void 0;
}
function findFromSystem() {
  const path = whichBinary("whisper-cli");
  if (path) return { executablePath: path, source: "system" };
  if (platform() === "darwin") {
    for (const p of ["/opt/homebrew/bin/whisper-cli", "/usr/local/bin/whisper-cli"]) {
      if (existsSync(p)) return { executablePath: p, source: "system" };
    }
  }
  return void 0;
}
var BUILD_DIR = join(homedir(), ".cache", "hyperframes", "whisper", "whisper.cpp");
var WHISPER_REPO = "https://github.com/ggml-org/whisper.cpp.git";
function findBuiltBinary() {
  for (const p of [
    join(BUILD_DIR, "build", "bin", "whisper-cli"),
    join(BUILD_DIR, "build", "whisper-cli")
  ]) {
    if (existsSync(p)) return { executablePath: p, source: "build" };
  }
  return void 0;
}
function buildFromSource(onProgress) {
  if (existsSync(BUILD_DIR) && !findBuiltBinary()) {
    rmSync(BUILD_DIR, { recursive: true, force: true });
  }
  if (!existsSync(BUILD_DIR)) {
    onProgress?.("Downloading whisper.cpp...");
    mkdirSync(join(homedir(), ".cache", "hyperframes", "whisper"), {
      recursive: true
    });
    execFileSync("git", ["clone", "--depth", "1", WHISPER_REPO, BUILD_DIR], {
      stdio: "ignore",
      timeout: 6e4,
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" }
    });
  }
  onProgress?.("Building whisper.cpp (this may take a minute)...");
  try {
    execFileSync("cmake", ["-B", "build"], {
      cwd: BUILD_DIR,
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 12e4
    });
    execFileSync("cmake", ["--build", "build", "--config", "Release", "-j"], {
      cwd: BUILD_DIR,
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 3e5
    });
  } catch (err) {
    let detail = "";
    if (err && typeof err === "object" && "stderr" in err) {
      const stderr = String(err.stderr).trim();
      if (stderr) detail = `
${stderr.slice(-500)}`;
    }
    rmSync(BUILD_DIR, { recursive: true, force: true });
    throw new Error(
      `whisper-cpp build failed. Ensure cmake and a C compiler are installed.${detail}`
    );
  }
  const result = findBuiltBinary();
  if (!result) throw new Error("Build completed but whisper-cli not found");
  return result;
}
function findWhisper() {
  return findFromEnv() ?? findFromSystem() ?? findBuiltBinary();
}
function getInstallInstructions() {
  if (platform() === "darwin") {
    return "brew install whisper-cpp";
  }
  if (platform() === "linux") {
    return "Build from source: https://github.com/ggml-org/whisper.cpp#building (requires cmake and a C compiler)";
  }
  if (platform() === "win32") {
    return "Build with cmake: https://github.com/ggml-org/whisper.cpp#building";
  }
  return "See https://github.com/ggml-org/whisper.cpp#building";
}
function hasBrew() {
  return whichBinary("brew") !== void 0;
}
function hasGit() {
  return whichBinary("git") !== void 0;
}
function hasCmake() {
  return whichBinary("cmake") !== void 0;
}
async function ensureWhisper(options) {
  const existing = findWhisper();
  if (existing) return existing;
  if (options?.installRuntime === false) {
    throw new WhisperUnavailableError(
      "whisper-cpp not found; runtime installation is disabled by --no-runtime-install."
    );
  }
  if (platform() === "darwin" && hasBrew()) {
    options?.onProgress?.("Installing whisper-cpp via Homebrew...");
    try {
      execFileSync("brew", ["install", "whisper-cpp"], {
        stdio: "ignore",
        timeout: 3e5
      });
      const installed = findFromSystem();
      if (installed) return { ...installed, source: "brew" };
    } catch {
    }
  }
  if (hasGit() && hasCmake()) {
    try {
      return buildFromSource(options?.onProgress);
    } catch {
    }
  }
  throw new WhisperUnavailableError(`whisper-cpp not found. Install: ${getInstallInstructions()}`);
}
async function ensureModel(model = DEFAULT_MODEL, options) {
  const modelPath = join(MODELS_DIR, `ggml-${model}.bin`);
  if (existsSync(modelPath)) return modelPath;
  mkdirSync(MODELS_DIR, { recursive: true });
  options?.onProgress?.(`Downloading model ${model}...`);
  await downloadFile(getModelUrl(model), modelPath, { onProgress: options?.onDownloadProgress });
  if (!existsSync(modelPath)) {
    throw new Error(`Model download failed: ${model}`);
  }
  return modelPath;
}
function hasFFmpeg() {
  return findFFmpeg() !== void 0;
}

export {
  MODELS_DIR,
  DEFAULT_MODEL,
  WhisperUnavailableError,
  isWhisperUnavailable,
  findWhisper,
  getInstallInstructions,
  ensureWhisper,
  ensureModel,
  hasFFmpeg
};
