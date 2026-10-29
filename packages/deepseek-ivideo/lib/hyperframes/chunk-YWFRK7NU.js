import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  getFreeDiskMb
} from "./chunk-GQJZORQP.js";
import {
  chromeDepsInstallCommand,
  detectLinuxDistro,
  distroLabel,
  getFFmpegInstallHint,
  parseLddMissingLibs
} from "./chunk-TVCRUG2S.js";
import {
  ensureBrowser,
  findBrowser
} from "./chunk-GOPKWMQZ.js";
import {
  runCancellableProcess
} from "./chunk-LCSMOLGX.js";
import {
  FFMPEG_PATH_ENV,
  FFPROBE_PATH_ENV,
  findFfBinary
} from "./chunk-PJ3HDUCY.js";

// src/browser/preflight.ts
import { existsSync } from "fs";
import { platform } from "os";

// src/browser/installFacts.ts
var BUILD_IN_PATH = /[\\/]chrome(?:-headless-shell)?[\\/][a-z0-9_]+-(\d+\.\d+\.\d+\.\d+)[\\/]/i;
function driveOf(path) {
  if (path.startsWith("\\\\") || path.startsWith("//")) return "unc";
  const letter = /^([A-Za-z]):[\\/]/.exec(path)?.[1];
  if (!letter) return "posix";
  return letter.toUpperCase() === "C" ? "windows_c" : "windows_other";
}
function lengthBucket(length) {
  if (length < 120) return "under_120";
  if (length < 200) return "120_to_199";
  return length < 260 ? "200_to_259" : "260_plus";
}
function describeBrowserInstall(executablePath) {
  const build = BUILD_IN_PATH.exec(executablePath)?.[1];
  return {
    ...build ? { build } : {},
    pathAscii: new RegExp("^\\p{ASCII}*$", "u").test(executablePath),
    pathLength: lengthBucket(executablePath.length),
    drive: driveOf(executablePath)
  };
}

// src/browser/preflight.ts
function parseToolVersion(raw) {
  const m = raw.match(/(ffmpeg|ffprobe)\s+version\s+([\d][\d.\-\w]*)/i);
  return m ? `${m[1]} ${m[2]}` : raw.trim();
}
function extractMajorVersion(raw) {
  const m = raw.match(/\b(\d+)\.\d+/);
  return m?.[1] ? Number(m[1]) : void 0;
}
function configuredMissingDetail(envName) {
  const configured = process.env[envName]?.trim();
  if (!configured || existsSync(configured)) return void 0;
  return `Configured path does not exist: ${envName}="${configured}"`;
}
async function readToolVersion(binaryPath, signal) {
  try {
    const output = (await runCancellableProcess(binaryPath, ["-version"], {
      signal,
      timeoutMs: 5e3
    })).stdout;
    const raw = output.split("\n")[0] ?? "";
    const version = parseToolVersion(raw);
    return {
      ok: true,
      detail: version ? `${version} at ${binaryPath}` : binaryPath,
      majorVersion: extractMajorVersion(raw)
    };
  } catch (error) {
    if (signal?.aborted) signal.throwIfAborted();
    const status = typeof error === "object" && error !== null && "status" in error ? error.status : void 0;
    const exitDetail = typeof status === "number" ? ` (exit code ${status})` : "";
    return {
      ok: false,
      detail: `Failed to run "${binaryPath}" -version${exitDetail}.`
    };
  }
}
async function checkFFmpeg(signal) {
  const missingConfigured = configuredMissingDetail(FFMPEG_PATH_ENV);
  if (missingConfigured) {
    return {
      name: "FFmpeg",
      ok: false,
      level: "error",
      title: "FFmpeg not found",
      detail: missingConfigured,
      hint: getFFmpegInstallHint()
    };
  }
  const path = findFfBinary("ffmpeg", { configuredMustExist: true });
  if (path) {
    const version = await readToolVersion(path, signal);
    if (!version.ok) {
      return {
        name: "FFmpeg",
        ok: false,
        level: "error",
        title: "FFmpeg cannot start",
        detail: version.detail,
        hint: process.platform === "win32" ? "Install a working 64-bit FFmpeg build with all required runtime DLLs." : getFFmpegInstallHint(),
        path
      };
    }
    return {
      name: "FFmpeg",
      ok: true,
      level: "ok",
      detail: version.detail,
      path,
      versionMajor: version.majorVersion
    };
  }
  return {
    name: "FFmpeg",
    ok: false,
    level: "error",
    title: "FFmpeg not found",
    // Second sentence dropped: "the render cannot proceed" is already said by
    // the error this accompanies, and in Studio by the disabled Export button.
    detail: "FFmpeg is required to encode video.",
    hint: getFFmpegInstallHint()
  };
}
async function checkFFprobe(signal) {
  const missingConfigured = configuredMissingDetail(FFPROBE_PATH_ENV);
  if (missingConfigured) {
    return {
      name: "FFprobe",
      ok: false,
      level: "error",
      title: "FFprobe not found",
      detail: missingConfigured,
      hint: getFFmpegInstallHint()
    };
  }
  const path = findFfBinary("ffprobe", { configuredMustExist: true });
  if (path) {
    const version = await readToolVersion(path, signal);
    return { name: "FFprobe", ok: true, level: "ok", detail: version.detail, path };
  }
  return {
    name: "FFprobe",
    ok: false,
    level: "error",
    title: "FFprobe not found",
    detail: "FFprobe is required to probe media assets. It ships with FFmpeg but was not found on PATH.",
    hint: getFFmpegInstallHint()
  };
}
async function chromeSharedLibOutcome(executablePath, found, signal) {
  if (process.platform !== "linux") return found;
  let probe;
  if (!existsSync(executablePath)) {
    probe = { ok: true, missing: [], probeUnavailable: true };
  } else {
    try {
      const result = await runCancellableProcess("ldd", [executablePath], {
        signal,
        timeoutMs: 5e3
      });
      probe = parseLddMissingLibs(result.stdout);
    } catch (error) {
      if (signal?.aborted) signal.throwIfAborted();
      const stdout = typeof error === "object" && error !== null && "stdout" in error ? String(error.stdout ?? "") : "";
      const killed = typeof error === "object" && error !== null && "killed" in error && error.killed === true;
      probe = stdout && !killed ? parseLddMissingLibs(stdout) : { ok: true, missing: [], probeUnavailable: true };
    }
  }
  if (probe.probeUnavailable || probe.ok) return found;
  const distro = detectLinuxDistro();
  return {
    name: "Chrome",
    ok: false,
    level: "error",
    title: "Chrome cannot launch (missing system libraries)",
    detail: `Chrome at ${executablePath} is missing shared libraries on ${distroLabel(distro)}: ${probe.missing.join(", ")}`,
    hint: chromeDepsInstallCommand(distro.family),
    path: executablePath
  };
}
function chromeLaunchFailureDetails(error) {
  if (typeof error !== "object" || error === null) return "";
  const status = "status" in error ? error.status : void 0;
  const signal = "signal" in error ? error.signal : void 0;
  const code = "code" in error ? error.code : void 0;
  return [
    typeof status === "number" ? `exit code ${status}` : "",
    typeof signal === "string" ? `signal ${signal}` : "",
    typeof code === "string" ? code : ""
  ].filter(Boolean).join(", ");
}
async function chromeLaunchOutcome(executablePath, found, signal) {
  const libraries = await chromeSharedLibOutcome(executablePath, found, signal);
  if (!libraries.ok) return libraries;
  try {
    const { stdout } = await runCancellableProcess(executablePath, ["--version"], {
      signal,
      timeoutMs: 5e3,
      maxBufferBytes: 64 * 1024
    });
    return { ...found, versionMajor: extractMajorVersion(stdout) };
  } catch (error) {
    if (signal?.aborted) signal.throwIfAborted();
    const details = chromeLaunchFailureDetails(error);
    return {
      name: "Chrome",
      ok: false,
      level: "error",
      title: "Chrome cannot start",
      detail: `Failed to run "${executablePath}" --version${details ? ` (${details})` : ""}.`,
      hint: "Select a working Chrome/Chromium binary for this OS and architecture with HYPERFRAMES_BROWSER_PATH, or reinstall with: npx hyperframes browser ensure --force",
      path: executablePath
    };
  }
}
async function checkChrome(browserPath, signal) {
  if (browserPath) {
    if (existsSync(browserPath)) {
      return chromeLaunchOutcome(
        browserPath,
        {
          name: "Chrome",
          ok: true,
          level: "ok",
          detail: `explicit: ${browserPath}`,
          path: browserPath
        },
        signal
      );
    }
    return {
      name: "Chrome",
      ok: false,
      level: "error",
      title: "Chrome not found",
      detail: `Chrome binary not found at "${browserPath}".`,
      hint: "Run: npx hyperframes browser ensure"
    };
  }
  let info;
  try {
    info = signal ? await ensureBrowser({ preferManagedChrome: true, signal }) : await findBrowser();
  } catch {
    if (signal?.aborted) signal.throwIfAborted();
    info = void 0;
  }
  if (info) {
    return chromeLaunchOutcome(
      info.executablePath,
      {
        name: "Chrome",
        ok: true,
        level: "ok",
        detail: `${info.source}: ${info.executablePath}`,
        path: info.executablePath
      },
      signal
    );
  }
  return {
    name: "Chrome",
    ok: false,
    level: "error",
    title: "Chrome not found",
    detail: "Chrome Headless Shell is required for local rendering.",
    hint: "Run: npx hyperframes browser ensure"
  };
}
function checkDisk(path = ".", freeDiskMb = getFreeDiskMb) {
  const freeMb = freeDiskMb(path);
  if (freeMb === null) {
    return { name: "Disk", ok: true, level: "ok", detail: "Unable to check" };
  }
  const freeGb = (freeMb / 1024).toFixed(1);
  if (freeMb < 1024) {
    return {
      name: "Disk",
      ok: false,
      level: "error",
      title: "Low disk space",
      detail: `${freeGb} GB free at ${path}`,
      hint: "Renders produce large temp files. Free disk space before rendering."
    };
  }
  return { name: "Disk", ok: true, level: "ok", detail: `${freeGb} GB free at ${path}` };
}
function checkWindowsUncPath(projectDir = process.cwd()) {
  if (platform() !== "win32") return void 0;
  if (!projectDir.startsWith("\\\\")) return void 0;
  return {
    name: "Windows path",
    ok: true,
    level: "warn",
    detail: `UNC path: ${projectDir}`,
    hint: "Chrome may fail to launch from a network share. Use a local drive if render startup fails."
  };
}
async function runEnvironmentChecks(options = {}) {
  const outcomes = [];
  const ffmpeg = await checkFFmpeg(options.signal);
  outcomes.push(ffmpeg);
  const ffprobe = await checkFFprobe(options.signal);
  outcomes.push(ffprobe);
  let browser;
  let browserVersionMajor;
  if (options.includeBrowser) {
    const chrome = await checkChrome(options.browserPath, options.signal);
    outcomes.push(chrome);
    if (chrome.ok && chrome.path) {
      browser = {
        executablePath: chrome.path,
        source: options.browserPath ? "env" : "cache"
      };
    }
    browserVersionMajor = chrome.versionMajor;
  }
  if (options.includeDisk) {
    const diskPaths = [...new Set(options.diskPaths ?? [options.projectDir ?? "."])];
    outcomes.push(...diskPaths.map((path) => checkDisk(path)));
  }
  if (options.includeWindowsUnc) {
    const unc = checkWindowsUncPath(options.projectDir);
    if (unc) outcomes.push(unc);
  }
  return {
    outcomes,
    ...ffmpeg.ok && ffmpeg.path ? { ffmpegPath: ffmpeg.path } : {},
    ...ffprobe.path ? { ffprobePath: ffprobe.path } : {},
    ...browser ? { browser, browserInstall: describeBrowserInstall(browser.executablePath) } : {},
    ...ffmpeg.versionMajor != null ? { ffmpegVersionMajor: ffmpeg.versionMajor } : {},
    ...browserVersionMajor != null ? { browserVersionMajor } : {}
  };
}

export {
  parseToolVersion,
  runEnvironmentChecks
};
