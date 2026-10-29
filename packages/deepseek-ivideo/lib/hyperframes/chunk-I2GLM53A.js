import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  readCompositionFps
} from "./chunk-P6P3EIWV.js";
import {
  errorBox
} from "./chunk-IHFUKJOR.js";
import {
  failUsage
} from "./chunk-PBN6GBJE.js";
import {
  parseFps
} from "./chunk-SIG2LUMK.js";

// src/utils/renderArgs.ts
import { readFileSync } from "fs";
import { resolve, sep } from "path";
var MIN_PAGE_NAVIGATION_TIMEOUT_MS = 1;
var MAX_PAGE_NAVIGATION_TIMEOUT_SECONDS = 86400;
function parseBrowserTimeoutMsArg(raw) {
  if (raw == null) return { ok: true, value: void 0 };
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    return { ok: false, error: { kind: "not-a-number", raw } };
  }
  if (parsed <= 0) {
    return { ok: false, error: { kind: "not-positive", raw } };
  }
  if (parsed > MAX_PAGE_NAVIGATION_TIMEOUT_SECONDS) {
    return { ok: false, error: { kind: "too-large", raw } };
  }
  const ms = Math.round(parsed * 1e3);
  if (ms < MIN_PAGE_NAVIGATION_TIMEOUT_MS) {
    return { ok: false, error: { kind: "too-small", raw } };
  }
  return { ok: true, value: ms };
}
function browserTimeoutErrorMessage(error) {
  const title = "Invalid browser-timeout";
  switch (error.kind) {
    case "not-a-number":
      return {
        title,
        message: `Got "${error.raw}", which is not a number. Pass a positive number of seconds (e.g. 180).`
      };
    case "not-positive":
      return {
        title,
        message: `Got "${error.raw}" seconds, which is not positive. Pass a positive number of seconds (e.g. 180).`
      };
    case "too-small":
      return {
        title,
        message: `Got "${error.raw}" seconds, which rounds to 0 ms. Puppeteer treats 0 as 'no timeout' \u2014 pass a value that rounds to at least 1 ms.`
      };
    case "too-large":
      return {
        title,
        message: `Got "${error.raw}" seconds, which exceeds the ${MAX_PAGE_NAVIGATION_TIMEOUT_SECONDS}s (24h) cap. Node's setTimeout overflows for larger values.`
      };
  }
}
function resolveBrowserTimeoutMsArg(raw) {
  const result = parseBrowserTimeoutMsArg(raw);
  if (!result.ok) {
    const { title, message, hint } = browserTimeoutErrorMessage(result.error);
    errorBox(title, message, hint);
    failUsage();
  }
  return result.value;
}
function resolveDiagnosticNavigationTimeoutMs(env = process.env, minimumTimeoutMs = 0) {
  const parsed = Number(env.PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS);
  const configured = Number.isFinite(parsed) && parsed > 0 ? parsed : 1e4;
  return Math.max(configured, minimumTimeoutMs);
}
function normalizeCompositionEntryArg(raw) {
  const trimmed = raw?.trim().replace(/^\.\//, "") || void 0;
  return !trimmed || trimmed === "." ? void 0 : trimmed;
}
function hasExplicitCompositionArg(raw) {
  return normalizeCompositionEntryArg(raw) !== void 0;
}
function parseCompositionEntryArg(raw, projectDir, stat) {
  const trimmed = normalizeCompositionEntryArg(raw);
  if (!trimmed) return { ok: true, value: void 0 };
  const absProjectDir = resolve(projectDir);
  const entryPath = resolve(absProjectDir, trimmed);
  if (entryPath !== absProjectDir && !entryPath.startsWith(absProjectDir + sep)) {
    return { ok: false, error: { kind: "outside-project", entryFile: trimmed } };
  }
  let entryStat;
  try {
    entryStat = stat(entryPath);
  } catch {
    return { ok: false, error: { kind: "not-found", entryFile: trimmed } };
  }
  if (!entryStat.isFile()) {
    return { ok: false, error: { kind: "not-a-file", entryFile: trimmed } };
  }
  return { ok: true, value: trimmed };
}
function compositionEntryErrorMessage(error) {
  switch (error.kind) {
    case "outside-project":
      return {
        title: "Invalid composition path",
        message: `Entry file must stay inside the project directory: ${error.entryFile}`
      };
    case "not-found":
      return {
        title: "Composition not found",
        message: `"${error.entryFile}" does not exist in the project directory.`,
        hint: "Pass a path to a .html file relative to the project root (e.g. compositions/intro.html)."
      };
    case "not-a-file":
      return {
        title: "Invalid composition path",
        message: `"${error.entryFile}" is a directory, not an .html file.`,
        hint: "Pass a path to a .html file (e.g. compositions/intro.html), or omit --composition to render index.html."
      };
  }
}
function resolveCompositionEntryArg(raw, projectDir, stat) {
  const result = parseCompositionEntryArg(raw, projectDir, stat);
  if (!result.ok) {
    const { title, message, hint } = compositionEntryErrorMessage(result.error);
    errorBox(title, message, hint);
    failUsage();
  }
  return result.value;
}
function resolveDefaultFpsArg(explicitFps, projectDir, indexPath, entryFile) {
  if (explicitFps != null) return explicitFps;
  try {
    const fpsSourcePath = entryFile ? resolve(projectDir, entryFile) : indexPath;
    const declared = readCompositionFps(readFileSync(fpsSourcePath, "utf8"));
    if (declared != null && parseFps(declared).ok) {
      return declared;
    }
  } catch {
  }
  return void 0;
}
function parseGifLoopArg(raw) {
  if (raw === void 0) return { ok: true, value: void 0 };
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { ok: false, message: "GIF loop count must not be empty." };
  }
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) {
    return {
      ok: false,
      message: `Got "${raw}". GIF loop count must be an integer between 0 and 65535.`
    };
  }
  return { ok: true, value: parsed };
}
var MAX_HLS_SEGMENT_SECONDS = 60;
function parseHlsSegmentSecondsArg(raw) {
  if (raw === void 0) return { ok: true, value: void 0 };
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { ok: false, message: "HLS segment length must not be empty." };
  }
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_HLS_SEGMENT_SECONDS) {
    return {
      ok: false,
      message: `Got "${raw}". HLS segment length must be a whole number of seconds between 1 and ${MAX_HLS_SEGMENT_SECONDS}.`
    };
  }
  return { ok: true, value: parsed };
}

// src/browser/windowsCrash.ts
var STATUS_STACK_BUFFER_OVERRUN_DEC = "3221225595";
var STATUS_STACK_BUFFER_OVERRUN_HEX = /0x[cC]0000409/;
var STATUS_STACK_BUFFER_OVERRUN_NAME = /STATUS_STACK_BUFFER_OVERRUN/i;
function isWindowsChromeCrashError(errorMessage) {
  if (!/Failed to launch the browser process/i.test(errorMessage)) return false;
  return errorMessage.includes(STATUS_STACK_BUFFER_OVERRUN_DEC) || STATUS_STACK_BUFFER_OVERRUN_HEX.test(errorMessage) || STATUS_STACK_BUFFER_OVERRUN_NAME.test(errorMessage);
}
function windowsChromeCrashRemediation(errorMessage) {
  if (process.platform !== "win32") return void 0;
  if (!isWindowsChromeCrashError(errorMessage)) return void 0;
  return [
    "chrome-headless-shell crashed at launch (Windows STATUS_STACK_BUFFER_OVERRUN, exit 0xC0000409 / 3221225595).",
    "The pinned Chromium build is not stable on this Windows host; point hyperframes at your installed Chrome instead:",
    "",
    '  set HYPERFRAMES_BROWSER_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"',
    "",
    "Then re-run your command. Any Chrome build works for the screenshot capture path; install a real chrome-headless-shell later if you need the perf-optimized BeginFrame path."
  ].join("\n");
}

export {
  resolveBrowserTimeoutMsArg,
  resolveDiagnosticNavigationTimeoutMs,
  hasExplicitCompositionArg,
  resolveCompositionEntryArg,
  resolveDefaultFpsArg,
  parseGifLoopArg,
  parseHlsSegmentSecondsArg,
  windowsChromeCrashRemediation
};
