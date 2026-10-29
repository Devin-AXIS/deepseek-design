import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  runRenderSetupWorker
} from "./chunk-LCSMOLGX.js";
import {
  chromeMajorCeiling,
  exceedsChromeCeiling
} from "./chunk-TWWSYAKJ.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";

// src/browser/manager.ts
import { execSync, spawnSync } from "child_process";
import { randomUUID } from "crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync
} from "fs";
import { homedir } from "os";
import { basename, dirname, join, relative } from "path";
async function loadPuppeteerBrowsers() {
  try {
    return await import("@puppeteer/browsers");
  } catch (err) {
    const cause = normalizeErrorMessage(err);
    throw new Error(
      `Failed to load @puppeteer/browsers: ${cause}
Fix: run \`npm install\` or \`bun install\` to restore missing packages, then retry.`
    );
  }
}
var CHROME_VERSION = "152.0.7977.30";
var MACOS_12_CHROME_VERSION = "150.0.7871.124";
function managedChromeVersion() {
  return chromeMajorCeiling() === void 0 ? CHROME_VERSION : MACOS_12_CHROME_VERSION;
}
var CACHE_ROOT_DIR = join(homedir(), ".cache", "hyperframes");
var CACHE_DIR = join(homedir(), ".cache", "hyperframes", "chrome");
var PUPPETEER_CACHE_DIR = join(homedir(), ".cache", "puppeteer", "chrome-headless-shell");
var INSTALL_LOCK_DIR = join(CACHE_ROOT_DIR, ".chrome.install.lock");
var INSTALL_RECLAIM_LOCK_DIR = join(CACHE_ROOT_DIR, ".chrome.install.reclaim.lock");
var INSTALL_LOCK_OWNER_FILE = join(INSTALL_LOCK_DIR, "owner");
var INSTALL_LOCK_OWNER_ENV = "HYPERFRAMES_BROWSER_LOCK_OWNER";
var ownedInstallLockToken;
var INSTALL_LOCK_TIMINGS = {
  staleMs: 12e4,
  pollMs: 200,
  heartbeatMs: 15e3,
  waitNoticeMs: 1e4
};
function isErrno(err, code) {
  return err.code === code;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function tryAcquireDirLock(lockDir) {
  try {
    mkdirSync(lockDir, { recursive: false });
    return true;
  } catch (err) {
    if (!isErrno(err, "EEXIST")) throw err;
    return false;
  }
}
function isDirLockStale(lockDir, timeoutMs) {
  try {
    return Date.now() - statSync(lockDir).mtimeMs > timeoutMs;
  } catch (err) {
    if (isErrno(err, "ENOENT")) return false;
    throw err;
  }
}
function reclaimStaleInstallLock(timeoutMs) {
  if (!tryAcquireDirLock(INSTALL_RECLAIM_LOCK_DIR)) return;
  try {
    const mtimeMs = statSync(INSTALL_LOCK_DIR).mtimeMs;
    if (Date.now() - mtimeMs > timeoutMs) {
      rmSync(INSTALL_LOCK_DIR, { recursive: true, force: true });
    }
  } catch (err) {
    if (!isErrno(err, "ENOENT")) throw err;
  } finally {
    rmSync(INSTALL_RECLAIM_LOCK_DIR, { recursive: true, force: true });
  }
}
function reclaimAbandonedReclaimLock(timeoutMs) {
  try {
    if (isDirLockStale(INSTALL_RECLAIM_LOCK_DIR, timeoutMs)) {
      rmSync(INSTALL_RECLAIM_LOCK_DIR, { recursive: true, force: true });
    }
  } catch (err) {
    if (!isErrno(err, "ENOENT")) throw err;
  }
}
function touchInstallLock() {
  try {
    const now = /* @__PURE__ */ new Date();
    utimesSync(INSTALL_LOCK_DIR, now, now);
  } catch {
  }
}
async function withInstallLock(fn, timings = INSTALL_LOCK_TIMINGS) {
  if (!existsSync(CACHE_ROOT_DIR)) mkdirSync(CACHE_ROOT_DIR, { recursive: true });
  let deadline = Date.now() + timings.staleMs;
  const waitStart = Date.now();
  let lastNoticeMs = 0;
  for (; ; ) {
    if (existsSync(INSTALL_RECLAIM_LOCK_DIR)) {
      reclaimAbandonedReclaimLock(timings.staleMs);
      await sleep(timings.pollMs);
      continue;
    }
    if (tryAcquireDirLock(INSTALL_LOCK_DIR)) {
      ownedInstallLockToken = process.env[INSTALL_LOCK_OWNER_ENV] ?? randomUUID();
      try {
        writeFileSync(INSTALL_LOCK_OWNER_FILE, ownedInstallLockToken);
      } catch (error) {
        ownedInstallLockToken = void 0;
        rmSync(INSTALL_LOCK_DIR, { recursive: true, force: true });
        throw error;
      }
      rmSync(INSTALL_RECLAIM_LOCK_DIR, { recursive: true, force: true });
      break;
    }
    const waitedMs = Date.now() - waitStart;
    if (waitedMs - lastNoticeMs >= timings.waitNoticeMs) {
      lastNoticeMs = waitedMs;
      console.warn(
        `[browser] Waiting for another hyperframes process to finish installing chrome-headless-shell (${Math.round(waitedMs / 1e3)}s elapsed)...`
      );
    }
    if (isDirLockStale(INSTALL_LOCK_DIR, timings.staleMs) || Date.now() > deadline) {
      reclaimStaleInstallLock(timings.staleMs);
      deadline = Date.now() + timings.staleMs;
      continue;
    }
    await sleep(timings.pollMs);
  }
  const heartbeat = setInterval(touchInstallLock, timings.heartbeatMs);
  if (typeof heartbeat.unref === "function") heartbeat.unref();
  try {
    return await fn();
  } finally {
    clearInterval(heartbeat);
    releaseOwnedBrowserInstallLock();
  }
}
function releaseOwnedBrowserInstallLock() {
  if (!ownedInstallLockToken) return;
  releaseBrowserInstallLock(ownedInstallLockToken);
}
function releaseBrowserInstallLock(ownerToken) {
  if (ownedInstallLockToken === ownerToken) ownedInstallLockToken = void 0;
  try {
    if (readFileSync(INSTALL_LOCK_OWNER_FILE, "utf8") !== ownerToken) return;
  } catch {
    return;
  }
  rmSync(INSTALL_LOCK_DIR, { recursive: true, force: true });
}
var SYSTEM_CHROME_PATHS = process.platform === "darwin" ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"] : process.platform === "win32" ? [
  join(
    process.env["ProgramW6432"] ?? process.env["PROGRAMFILES"] ?? "C:\\Program Files",
    "Google",
    "Chrome",
    "Application",
    "chrome.exe"
  ),
  join(
    process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)",
    "Google",
    "Chrome",
    "Application",
    "chrome.exe"
  ),
  ...process.env["LOCALAPPDATA"] ? [join(process.env["LOCALAPPDATA"], "Google", "Chrome", "Application", "chrome.exe")] : [],
  ...[
    process.env["ProgramW6432"] ?? process.env["PROGRAMFILES"] ?? "C:\\Program Files",
    process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)",
    process.env["LOCALAPPDATA"]
  ].filter((root) => Boolean(root)).map((root) => join(root, "Microsoft", "Edge", "Application", "msedge.exe"))
] : [
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser"
];
function whichBinary(name) {
  try {
    const cmd = process.platform === "win32" ? `where ${name}` : `which ${name}`;
    const output = execSync(cmd, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      timeout: 5e3,
      windowsHide: true
    });
    const first = output.split(/\r?\n/).map((s) => s.trim()).find(Boolean);
    return first || void 0;
  } catch {
    return void 0;
  }
}
function findFromEnv() {
  const envPath = process.env["HYPERFRAMES_BROWSER_PATH"] ?? process.env["PRODUCER_HEADLESS_SHELL_PATH"];
  if (envPath && existsSync(envPath)) {
    return { executablePath: envPath, source: "env" };
  }
  return void 0;
}
async function findFromHyperframesCache() {
  if (!existsSync(CACHE_DIR)) return {};
  const { Browser, detectBrowserPlatform, getInstalledBrowsers } = await loadPuppeteerBrowsers();
  let installed;
  try {
    installed = await getInstalledBrowsers({ cacheDir: CACHE_DIR });
  } catch (err) {
    const code = err?.code;
    const suffix = code ? ` (${code})` : "";
    console.warn(
      `[hyperframes] Browser cache read failed${suffix}: ${normalizeErrorMessage(err)}. Falling back to system Chrome or a fresh download.`
    );
    installed = [];
  }
  const hostPlatform = detectBrowserPlatform();
  const match = installed.find(
    (b) => b.browser === Browser.CHROMEHEADLESSSHELL && b.buildId === managedChromeVersion() && b.platform === hostPlatform
  );
  if (match && existsSync(match.executablePath)) {
    return { result: { executablePath: match.executablePath, source: "cache" } };
  }
  if (match) {
    return { staleHyperframesCachePath: match.executablePath };
  }
  return {};
}
async function findFromCache() {
  const fromPuppeteer = findFromPuppeteerCache();
  if (fromPuppeteer) {
    return { result: fromPuppeteer };
  }
  return findFromHyperframesCache();
}
function parseVersionSegments(versionDir) {
  const dashIdx = versionDir.indexOf("-");
  const versionPart = dashIdx >= 0 ? versionDir.slice(dashIdx + 1) : versionDir;
  const segments = versionPart.split(".");
  const parsed = [];
  for (const seg of segments) {
    const n = parseInt(seg, 10);
    if (!Number.isFinite(n)) {
      break;
    }
    parsed.push(n);
  }
  return parsed.length > 0 ? parsed : void 0;
}
function compareVersionDirsDescending(a, b) {
  const pa = parseVersionSegments(a);
  const pb = parseVersionSegments(b);
  if (!pa && !pb) return 0;
  if (!pa) return 1;
  if (!pb) return -1;
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i += 1) {
    const av = pa[i] ?? 0;
    const bv = pb[i] ?? 0;
    if (av !== bv) return bv - av;
  }
  return 0;
}
var CACHED_HEADLESS_SHELL_EXECUTABLES = {
  "darwin/arm64": ["chrome-headless-shell-mac-arm64", "chrome-headless-shell"],
  "darwin/x64": ["chrome-headless-shell-mac-x64", "chrome-headless-shell"],
  "linux/x64": ["chrome-headless-shell-linux64", "chrome-headless-shell"],
  "win32/ia32": ["chrome-headless-shell-win32", "chrome-headless-shell.exe"],
  "win32/x64": ["chrome-headless-shell-win64", "chrome-headless-shell.exe"]
};
function cachedHeadlessShellExecutable(hostPlatform = process.platform, hostArch = process.arch) {
  return CACHED_HEADLESS_SHELL_EXECUTABLES[`${hostPlatform}/${hostArch}`];
}
function findFromPuppeteerCache() {
  if (!existsSync(PUPPETEER_CACHE_DIR)) return void 0;
  const executable = cachedHeadlessShellExecutable();
  if (!executable) return void 0;
  let versions;
  try {
    versions = [...readdirSync(PUPPETEER_CACHE_DIR)].sort(compareVersionDirsDescending);
  } catch {
    return void 0;
  }
  const ceiling = chromeMajorCeiling();
  for (const version of versions) {
    if (exceedsChromeCeiling(version, ceiling)) continue;
    const binary = join(PUPPETEER_CACHE_DIR, version, ...executable);
    if (existsSync(binary)) {
      return { executablePath: binary, source: "cache" };
    }
  }
  return void 0;
}
function isHeadlessShellBinary(executablePath) {
  const name = basename(executablePath).toLowerCase();
  return name === "chrome-headless-shell" || name === "chrome-headless-shell.exe";
}
var _warnedSystemFallback = false;
function warnSystemFallbackOnce(executablePath) {
  if (_warnedSystemFallback) return;
  if (process.platform !== "linux") return;
  if (isHeadlessShellBinary(executablePath)) return;
  _warnedSystemFallback = true;
  console.warn(
    `[hyperframes] Using system Chrome at ${executablePath}; HeadlessExperimental.beginFrame is unavailable in regular Chrome builds, so the perf-optimized capture path falls back to screenshot mode. Install chrome-headless-shell for the optimized path:
  npx @puppeteer/browsers install chrome-headless-shell
(Or set HYPERFRAMES_BROWSER_PATH to point at an existing chrome-headless-shell binary.)`
  );
}
function _resetSystemFallbackWarnForTests() {
  _warnedSystemFallback = false;
}
function findSystemBrowser() {
  for (const p of SYSTEM_CHROME_PATHS) {
    if (existsSync(p)) {
      return { executablePath: p, source: "system" };
    }
  }
  const binaryNames = process.platform === "win32" ? ["chrome", "msedge", "chromium"] : ["google-chrome", "chromium"];
  const fromWhich = binaryNames.map(whichBinary).find(Boolean);
  if (fromWhich) {
    return { executablePath: fromWhich, source: "system" };
  }
  return void 0;
}
async function findBrowser() {
  const fromEnv = findFromEnv();
  if (fromEnv) return fromEnv;
  const fromCache = await findFromCache();
  if (fromCache.result) return fromCache.result;
  if (fromCache.staleHyperframesCachePath) {
    console.warn(
      `[browser] Cached binary missing at ${fromCache.staleHyperframesCachePath} \u2014 re-downloading...`
    );
    try {
      return await withInstallLock(() => downloadBrowser());
    } catch (err) {
      const cause = normalizeErrorMessage(err);
      throw new Error(
        `Cached Chrome binary was missing at ${fromCache.staleHyperframesCachePath}, and re-download failed: ${cause}
Run \`hyperframes browser ensure --force\` to re-download.`
      );
    }
  }
  const fromSystem = findSystemBrowser();
  if (fromSystem) {
    warnSystemFallbackOnce(fromSystem.executablePath);
  }
  return fromSystem;
}
async function ensureLinuxArmBrowser(options) {
  void options;
  const existing = await findBrowser();
  if (existing) return existing;
  const hasApt = existsSync("/usr/bin/apt-get");
  if (hasApt) {
    console.error(
      "\n\u{1F50D} Linux ARM64 detected \u2014 Chrome Headless Shell is not available for this platform."
    );
    console.error("\u{1F4E6} Auto-installing system Chromium via apt-get (this only happens once)...\n");
    const result = spawnSync("apt-get", ["install", "-y", "chromium-browser"], {
      stdio: "inherit",
      timeout: 12e4
    });
    if (result.status === 0) {
      const afterInstall = await findBrowser();
      if (afterInstall) {
        console.error(`
\u2705 Chromium installed at ${afterInstall.executablePath}
`);
        return afterInstall;
      }
    } else {
      console.error("\n\u26A0\uFE0F  apt-get exited with errors. Trying anyway...\n");
      const afterAttempt = await findBrowser();
      if (afterAttempt) return afterAttempt;
    }
  }
  throw new Error(
    `Chrome Headless Shell is not available for Linux ARM64 (DGX Spark, GB10, Jetson).

Install Chromium manually and point hyperframes to it:

  sudo apt-get install -y chromium-browser
  export HYPERFRAMES_BROWSER_PATH=$(which chromium-browser)

Then re-run your command. The HYPERFRAMES_BROWSER_PATH env var persists for the session.`
  );
}
async function ensureBrowser(options) {
  if (options?.signal) return ensureBrowserInOwnedProcess(options);
  return ensureBrowserInCurrentProcess(options);
}
async function ensureBrowserInCurrentProcess(options) {
  const fromEnv = findFromEnv();
  if (fromEnv) return fromEnv;
  if (!options?.force) {
    const fromCache = await (options?.preferManagedChrome ? findFromHyperframesCache() : findFromCache());
    if (fromCache.result) return fromCache.result;
    if (fromCache.staleHyperframesCachePath) {
      console.warn(
        `[browser] Cached binary missing at ${fromCache.staleHyperframesCachePath} \u2014 re-downloading...`
      );
      return withInstallLock(() => downloadBrowser(options));
    }
    if (!options?.preferManagedChrome) {
      const fromSystem = findSystemBrowser();
      if (fromSystem) {
        warnSystemFallbackOnce(fromSystem.executablePath);
        return fromSystem;
      }
    }
  }
  return withInstallLock(async () => {
    if (!options?.force) {
      const afterLock = await (options?.preferManagedChrome ? findFromHyperframesCache() : findFromCache());
      if (afterLock.result) return afterLock.result;
    }
    return downloadBrowser(options);
  });
}
async function ensureBrowserInOwnedProcess(options) {
  const signal = options.signal;
  signal?.throwIfAborted();
  const lockOwner = randomUUID();
  try {
    return await runRenderSetupWorker(
      "browser",
      {
        force: options.force,
        preferManagedChrome: options.preferManagedChrome
      },
      {
        signal,
        maxBufferBytes: 4 * 1024 * 1024,
        env: { [INSTALL_LOCK_OWNER_ENV]: lockOwner }
      }
    );
  } finally {
    releaseBrowserInstallLock(lockOwner);
  }
}
function isCorruptArchiveError(err) {
  const msg = normalizeErrorMessage(err).toLowerCase();
  return msg.includes("end of central directory") || msg.includes("end-of-central-directory") || msg.includes("invalid or corrupt") || msg.includes("corrupt zip") || msg.includes("not a zip") || msg.includes("unexpected end of") || msg.includes("corrupted");
}
async function installWithCorruptArchiveRecovery(runInstall, clearCache, onRecover) {
  try {
    return await runInstall();
  } catch (err) {
    if (!isCorruptArchiveError(err)) throw err;
    onRecover?.(err);
    clearCache();
    return await runInstall();
  }
}
function browserPathHintForPlatform() {
  if (process.platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
  if (process.platform === "win32") {
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  }
  return "/usr/bin/google-chrome";
}
function wrapDownloadFailureWithBrowserPathHint(cause) {
  const original = normalizeErrorMessage(cause);
  const example = browserPathHintForPlatform();
  const message = `Failed to download chrome-headless-shell ${managedChromeVersion()}: ${original}

Point hyperframes at an already-installed Chrome/Chromium instead:

  export HYPERFRAMES_BROWSER_PATH="${example}"

Then re-run your command. Any Chrome build works for the screenshot capture path; install a real chrome-headless-shell later if you need the perf-optimized BeginFrame path. Alternatively, run inside the hyperframes Docker image which ships a compatible headless-shell.`;
  return new Error(message, { cause: cause instanceof Error ? cause : void 0 });
}
async function downloadBrowser(options) {
  if (isLinuxArm()) {
    return ensureLinuxArmBrowser(options);
  }
  const { Browser, detectBrowserPlatform, install } = await loadPuppeteerBrowsers();
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error(`Unsupported platform: ${process.platform} ${process.arch}`);
  }
  removeInstallLeftovers();
  const stagingDir = join(CACHE_ROOT_DIR, `${STAGING_PREFIX}${randomUUID()}`);
  const clearStaging = () => rmSync(stagingDir, { recursive: true, force: true });
  const runInstall = () => install({
    cacheDir: stagingDir,
    browser: Browser.CHROMEHEADLESSSHELL,
    buildId: managedChromeVersion(),
    platform,
    downloadProgressCallback: options?.onProgress
  });
  try {
    const staged = await installWithCorruptArchiveRecovery(
      runInstall,
      clearStaging,
      (err) => console.warn(
        `[hyperframes] Downloaded browser archive was corrupt (${normalizeErrorMessage(err)}); re-downloading.`
      )
    );
    return { executablePath: moveStagedInstallIntoCache(stagingDir, staged), source: "download" };
  } catch (err) {
    throw wrapDownloadFailureWithBrowserPathHint(err);
  } finally {
    clearStaging();
  }
}
function moveStagedInstallIntoCache(stagingDir, staged) {
  const target = join(CACHE_DIR, relative(stagingDir, staged.path));
  const aside = join(CACHE_ROOT_DIR, `${REPLACED_PREFIX}${randomUUID()}`);
  mkdirSync(dirname(target), { recursive: true });
  let replaced = false;
  try {
    renameSync(target, aside);
    replaced = true;
  } catch (err) {
    if (!isErrno(err, "ENOENT")) throw err;
  }
  try {
    renameSync(staged.path, target);
  } catch (err) {
    if (replaced) renameSync(aside, target);
    throw err;
  }
  if (replaced) rmSync(aside, { recursive: true, force: true });
  return join(target, relative(staged.path, staged.executablePath));
}
var STAGING_PREFIX = ".chrome-staging-";
var REPLACED_PREFIX = ".chrome-replaced-";
function removeInstallLeftovers() {
  let names;
  try {
    names = readdirSync(CACHE_ROOT_DIR);
  } catch (err) {
    if (isErrno(err, "ENOENT")) return false;
    throw err;
  }
  const leftovers = names.filter(
    (name) => name.startsWith(STAGING_PREFIX) || name.startsWith(REPLACED_PREFIX)
  );
  for (const name of leftovers)
    rmSync(join(CACHE_ROOT_DIR, name), { recursive: true, force: true });
  return leftovers.length > 0;
}
function clearBrowser() {
  const removedLeftovers = removeInstallLeftovers();
  if (!existsSync(CACHE_DIR)) return removedLeftovers;
  rmSync(CACHE_DIR, { recursive: true, force: true });
  return true;
}
function isLinuxArm() {
  return process.platform === "linux" && process.arch === "arm64";
}

export {
  managedChromeVersion,
  CACHE_DIR,
  withInstallLock,
  releaseOwnedBrowserInstallLock,
  _resetSystemFallbackWarnForTests,
  findSystemBrowser,
  findBrowser,
  ensureBrowser,
  isCorruptArchiveError,
  installWithCorruptArchiveRecovery,
  clearBrowser,
  isLinuxArm
};
