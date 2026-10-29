import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  detectWSL
} from "./chunk-AMKC3AXA.js";
import {
  runCancellableProcess
} from "./chunk-LCSMOLGX.js";
import {
  findFfBinary
} from "./chunk-PJ3HDUCY.js";

// src/browser/ffmpeg.ts
import { execFileSync as execFileSync2 } from "child_process";

// src/browser/linuxDeps.ts
import { execFileSync } from "child_process";
import { existsSync, readFileSync } from "fs";
var DISTRO_PACKAGES = {
  debian: [
    "libnss3",
    "libnspr4",
    "libatk1.0-0",
    "libatk-bridge2.0-0",
    "libcups2",
    "libdrm2",
    "libxkbcommon0",
    "libatspi2.0-0",
    "libxcomposite1",
    "libxdamage1",
    "libxfixes3",
    "libxrandr2",
    "libgbm1",
    "libpango-1.0-0",
    "libcairo2",
    "libasound2"
  ],
  fedora: [
    "nss",
    "nspr",
    "atk",
    "at-spi2-atk",
    "cups-libs",
    "libdrm",
    "libxkbcommon",
    "at-spi2-core",
    "libXcomposite",
    "libXdamage",
    "libXfixes",
    "libXrandr",
    "mesa-libgbm",
    "pango",
    "cairo",
    "alsa-lib"
  ],
  arch: [
    "nss",
    "nspr",
    "atk",
    "at-spi2-atk",
    "libcups",
    "libdrm",
    "libxkbcommon",
    "at-spi2-core",
    "libxcomposite",
    "libxdamage",
    "libxfixes",
    "libxrandr",
    "mesa",
    "pango",
    "cairo",
    "alsa-lib"
  ],
  alpine: [
    "nss",
    "nspr",
    "atk",
    "at-spi2-atk",
    "cups-libs",
    "libdrm",
    "libxkbcommon",
    "at-spi2-core",
    "libxcomposite",
    "libxdamage",
    "libxfixes",
    "libxrandr",
    "mesa-gbm",
    "pango",
    "cairo",
    "alsa-lib"
  ]
};
var INSTALL_PREFIX = {
  debian: "sudo apt-get update && sudo apt-get install -y",
  fedora: "sudo dnf install -y",
  arch: "sudo pacman -S --needed",
  alpine: "sudo apk add"
};
function distroFamilyFromOsRelease(id, idLike) {
  const haystack = `${id ?? ""} ${idLike ?? ""}`.toLowerCase();
  if (/\b(debian|ubuntu|linuxmint|pop|elementary|raspbian|kali)\b/.test(haystack)) return "debian";
  if (/\b(fedora|rhel|centos|rocky|almalinux|amzn|ol)\b/.test(haystack)) return "fedora";
  if (/\b(arch|manjaro|endeavouros|garuda)\b/.test(haystack)) return "arch";
  if (/\b(alpine)\b/.test(haystack)) return "alpine";
  return "unknown";
}
function parseOsRelease(contents) {
  const out = {};
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (value.length >= 2 && (value[0] === '"' || value[0] === "'") && value.at(-1) === value[0]) {
      value = value.slice(1, -1);
    }
    if (key) out[key] = value;
  }
  return out;
}
function detectLinuxDistro() {
  const isWsl = detectWSL();
  try {
    const contents = readFileSync("/etc/os-release", "utf-8");
    const parsed = parseOsRelease(contents);
    const family = distroFamilyFromOsRelease(parsed["ID"], parsed["ID_LIKE"]);
    return {
      family,
      ...parsed["ID"] ? { id: parsed["ID"] } : {},
      ...parsed["PRETTY_NAME"] ? { prettyName: parsed["PRETTY_NAME"] } : {},
      isWsl
    };
  } catch {
    return { family: "unknown", isWsl };
  }
}
function chromeDepsInstallCommand(family) {
  if (family === "unknown") {
    return "Install the Chrome headless dependencies for your distro (nss, atk, at-spi2, cups, libdrm, libxkbcommon, gbm, pango, cairo, alsa), then re-run.";
  }
  return `${INSTALL_PREFIX[family]} ${DISTRO_PACKAGES[family].join(" ")}`;
}
function ffmpegInstallCommand(family) {
  if (family === "unknown") {
    return "Install ffmpeg (which includes ffprobe) via your distro package manager, then re-run.";
  }
  return `${INSTALL_PREFIX[family]} ffmpeg`;
}
function distroLabel(distro) {
  if (distro.isWsl) return "WSL";
  return distro.prettyName ?? "Linux";
}
function parseLddMissingLibs(lddOutput) {
  const missing = [];
  for (const rawLine of lddOutput.split("\n")) {
    const line = rawLine.trim();
    if (!/=>\s*not found\b/.test(line)) continue;
    const soname = line.split("=>")[0]?.trim();
    if (soname) missing.push(soname);
  }
  return { ok: missing.length === 0, missing, probeUnavailable: false };
}
function isSharedLibLaunchError(message) {
  return /cannot open shared object file/i.test(message) || /error while loading shared libraries/i.test(message) || /lib[\w.+-]*\.so[\w.]*: cannot open/i.test(message);
}
function chromeLaunchRemediation(errorMessage) {
  const isLaunchFailure = /Failed to launch the browser process/i.test(errorMessage) || isSharedLibLaunchError(errorMessage);
  if (!isLaunchFailure) return void 0;
  if (process.platform !== "linux") return void 0;
  if (process.arch === "arm64") return void 0;
  const distro = detectLinuxDistro();
  const lines = [];
  lines.push(
    `Chrome could not launch on ${distroLabel(distro)} \u2014 this is almost always missing system libraries (e.g. libnss3).`
  );
  lines.push("Install the Chrome headless dependencies:");
  lines.push(`  ${chromeDepsInstallCommand(distro.family)}`);
  lines.push("Then verify with: npx hyperframes doctor");
  return lines.join("\n");
}

// src/browser/ffmpeg.ts
var H264EncoderUnavailableError = class extends Error {
  constructor() {
    super("This FFmpeg build has neither libx264 nor VideoToolbox H.264 encoding.");
    this.name = "H264EncoderUnavailableError";
  }
};
function resolveH264EncoderMode(ffmpegEncodersOutput, gpuRequested) {
  if (gpuRequested) return "gpu";
  if (/\blibx264\b/.test(ffmpegEncodersOutput)) return "software";
  if (/\bh264_videotoolbox\b/.test(ffmpegEncodersOutput)) return "gpu";
  throw new H264EncoderUnavailableError();
}
function detectH264EncoderMode(ffmpegPath, gpuRequested) {
  const encoders = execFileSync2(ffmpegPath, ["-hide_banner", "-encoders"], {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
    timeout: 5e3,
    windowsHide: true
  });
  return resolveH264EncoderMode(encoders, gpuRequested);
}
async function detectH264EncoderModeForRender(ffmpegPath, gpuRequested, signal) {
  const result = await runCancellableProcess(ffmpegPath, ["-hide_banner", "-encoders"], {
    signal,
    timeoutMs: 5e3
  });
  return resolveH264EncoderMode(result.stdout, gpuRequested);
}
function findFFmpeg() {
  return findFfBinary("ffmpeg", { configuredMustExist: true });
}
function findFFprobe() {
  return findFfBinary("ffprobe", { configuredMustExist: true });
}
var FFMPEG_DOWNLOAD_URL = "https://ffmpeg.org/download.html";
function getFFmpegInstallCommand() {
  switch (process.platform) {
    case "darwin":
      return "brew install ffmpeg";
    case "linux": {
      const distro = detectLinuxDistro();
      if (distro.family === "unknown") return void 0;
      return ffmpegInstallCommand(distro.family);
    }
    // winget ships with Windows 10 1809+ and Windows 11. Machines without it
    // still get the manual download route from the hint below.
    case "win32":
      return "winget install --id Gyan.FFmpeg -e";
    default:
      return void 0;
  }
}
function getFFmpegInstallHint() {
  const command = getFFmpegInstallCommand();
  if (command && process.platform === "win32") {
    return `${command}, or download the 64-bit build from ${FFMPEG_DOWNLOAD_URL}#build-windows and add its bin/ directory to PATH.`;
  }
  if (command) return command;
  if (process.platform === "linux") return ffmpegInstallCommand("unknown");
  return FFMPEG_DOWNLOAD_URL;
}

export {
  detectLinuxDistro,
  chromeDepsInstallCommand,
  distroLabel,
  parseLddMissingLibs,
  chromeLaunchRemediation,
  H264EncoderUnavailableError,
  resolveH264EncoderMode,
  detectH264EncoderMode,
  detectH264EncoderModeForRender,
  findFFmpeg,
  findFFprobe,
  getFFmpegInstallCommand,
  getFFmpegInstallHint
};
