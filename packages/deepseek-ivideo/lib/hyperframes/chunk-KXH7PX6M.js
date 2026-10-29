import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  resolveCaptureBrowserGpuMode
} from "./chunk-UITPTRCM.js";
import {
  requestCliExit
} from "./chunk-PBN6GBJE.js";

// src/browser/launch.ts
var browsers = /* @__PURE__ */ new Set();
var pending = /* @__PURE__ */ new Map();
var CLOSE_GRACE_MS = 1e3;
var listening = false;
var shutdown;
function stopForSignal(signal) {
  if (shutdown) return;
  shutdown = closeManagedBrowsers();
  void shutdown.then(
    () => requestCliExit(signal === "SIGINT" ? 130 : 143),
    (error) => {
      console.error("Browser shutdown failed:", error);
      requestCliExit(1);
    }
  );
}
function ownSignals() {
  if (listening) return;
  listening = true;
  process.on("SIGINT", () => stopForSignal("SIGINT"));
  process.on("SIGTERM", () => stopForSignal("SIGTERM"));
}
async function resolveManagedGpuMode(requestedMode, chromePath) {
  ownSignals();
  return resolveCaptureBrowserGpuMode(requestedMode, chromePath);
}
async function launchManagedBrowser(puppeteer, options) {
  if (shutdown) throw new Error("The CLI is stopping; no browser can start.");
  ownSignals();
  const abort = new AbortController();
  const signal = options.signal ? AbortSignal.any([options.signal, abort.signal]) : abort.signal;
  const launch = puppeteer.launch({
    ...options,
    signal,
    handleSIGINT: false,
    handleSIGTERM: false
  });
  pending.set(launch, abort);
  try {
    const browser = await launch;
    const child = browser.process();
    if (!child) throw new Error("A launched browser has no owned process.");
    browsers.add(browser);
    child.once("exit", () => browsers.delete(browser));
    return browser;
  } finally {
    pending.delete(launch);
  }
}
async function closeManagedBrowsers() {
  for (const abort of pending.values()) abort.abort();
  await Promise.allSettled(pending.keys());
  await Promise.all([...browsers].map(closeBrowser));
}
async function closeBrowser(browser) {
  const child = browser.process();
  if (!child) throw new Error("A managed browser lost its owned process.");
  if (child.exitCode !== null || child.signalCode !== null) return;
  const exited = new Promise((resolve) => child.once("exit", () => resolve()));
  let timer;
  const grace = new Promise((resolve) => {
    timer = setTimeout(resolve, CLOSE_GRACE_MS);
  });
  try {
    await Promise.race([
      browser.close().catch((error) => console.warn("Browser close failed:", error)),
      grace
    ]);
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
    await exited;
  } finally {
    clearTimeout(timer);
  }
}

export {
  resolveManagedGpuMode,
  launchManagedBrowser
};
