import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  RUNNING_DIR,
  RUNNING_STALE_MS
} from "./chunk-NXMYHJAL.js";
import {
  detectInstaller,
  installInvocation,
  updateCheckDisabled
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import {
  readConfig,
  withFileLock,
  writeConfig
} from "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-M2WBOQ2Q.js";

// src/utils/autoUpdate.ts
import { spawn } from "child_process";
import { appendFileSync, mkdirSync, openSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { compareVersions } from "compare-versions";
var CONFIG_DIR = join(homedir(), ".hyperframes");
var LOG_FILE = join(CONFIG_DIR, "auto-update.log");
var PENDING_TIMEOUT_MS = 10 * 60 * 1e3;
var INSTALL_MAX_WAIT_MS = 60 * 60 * 1e3;
var INSTALL_POLL_MS = 2e3;
function isAutoInstallDisabled() {
  return updateCheckDisabled() || process.env["HYPERFRAMES_NO_AUTO_INSTALL"] === "1";
}
function majorOf(version) {
  const match = /^(\d+)\./.exec(version);
  return match?.[1] ? Number.parseInt(match[1], 10) : Number.NaN;
}
function log(line) {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true, mode: 448 });
    appendFileSync(LOG_FILE, `${(/* @__PURE__ */ new Date()).toISOString()} ${line}
`, { mode: 384 });
  } catch {
  }
}
function installerScript(o) {
  return `
    const { execFile } = require("node:child_process");
    const fs = require("node:fs");
    const { join } = require("node:path");
    const { readFileSync, renameSync, writeFileSync } = fs;
    const CFG = ${JSON.stringify(o.configFile)};
    const TMP = \`\${CFG}.tmp\`;
    const INSTALL_LOCK = \`\${CFG}.install-lock\`;
    const RUNNING = ${JSON.stringify(o.runningDir)};
    const VERSION = ${JSON.stringify(o.version)};
    const BIN = ${JSON.stringify(o.bin)};
    const ARGS = ${JSON.stringify(o.args)};
    const withFileLock = ${withFileLock.toString()};
    const withLock = (task) => { try { withFileLock(\`\${CFG}.lock\`, fs, task); } catch (e) {} };
    const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === "EPERM"; } };
    // Stale = no heartbeat for staleMs on this process's own clock, which stops while the machine sleeps.
    const seen = new Map();
    const mono = () => Number(process.hrtime.bigint() / 1000000n);
    const observe = (file) => {
      let mtime;
      try { mtime = fs.statSync(file).mtimeMs; } catch (e) { return "stale"; }
      const prev = seen.get(file);
      if (prev && prev.mtime === mtime) return mono() - prev.at >= ${o.staleMs} ? "stale" : "quiet";
      seen.set(file, { mtime, at: mono() });
      return prev ? "beating" : "quiet";
    };
    const touch = (file) => { try { const now = new Date(); fs.utimesSync(file, now, now); } catch (e) {} };
    const running = () => {
      let names = [];
      try { names = fs.readdirSync(RUNNING); } catch (e) {}
      return names.filter((name) => {
        const pid = Number(name);
        const file = join(RUNNING, name);
        if (Number.isInteger(pid) && pid > 0 && alive(pid) && observe(file) !== "stale") return true;
        try { fs.unlinkSync(file); } catch (e) {}
        return false;
      });
    };
    let lockBeat;
    const ownsLock = () => { try { return Number(readFileSync(INSTALL_LOCK, "utf-8")) === process.pid; } catch (e) { return false; } };
    // Under the settings lock, so two installers launched together cannot both take it over.
    const tryLock = () => {
      let result = "stuck";
      withLock(() => {
        let owner = NaN;
        try { owner = Number(readFileSync(INSTALL_LOCK, "utf-8")); } catch (e) {}
        const state = Number.isInteger(owner) && owner > 0 && alive(owner) ? observe(INSTALL_LOCK) : "stale";
        if (state !== "stale") { result = state; return; }
        writeFileSync(INSTALL_LOCK, String(process.pid));
        result = "taken";
      });
      return result;
    };
    const releaseInstallLock = () => {
      clearInterval(lockBeat);
      if (ownsLock()) { try { fs.unlinkSync(INSTALL_LOCK); } catch (e) {} }
    };
    const install = () => execFile(BIN, ARGS, { windowsHide: true, maxBuffer: 4 * 1024 * 1024 }, (err, _stdout, stderr) => {
      withLock(() => {
        let cfg = {};
        try { cfg = JSON.parse(readFileSync(CFG, "utf-8")); } catch (e) { if (e.code !== "ENOENT") return; }
        cfg.completedUpdate = {
          version: VERSION,
          ok: !err,
          finishedAt: new Date().toISOString(),
          ...(err ? { error: String(stderr || err.message || "install failed").slice(-400) } : {}),
        };
        delete cfg.pendingUpdate;
        try {
          writeFileSync(TMP, JSON.stringify(cfg, null, 2) + "\\n", { mode: 0o600 });
          renameSync(TMP, CFG);
        } catch (e) {}
      });
      releaseInstallLock();
    });
    const started = Date.now();
    let lastPoll = Date.now();
    const waitThenInstall = () => {
      if (!ownsLock()) return releaseInstallLock();
      // A long gap between polls means the machine slept: watch every file afresh.
      if (Date.now() - lastPoll > ${o.pollMs} * 5) seen.clear();
      lastPoll = Date.now();
      if (running().length === 0) return install();
      if (Date.now() - started > ${o.maxWaitMs}) {
        console.log(\`[wait] gave up on \${VERSION}: a hyperframes process is still running\`);
        return releaseInstallLock();
      }
      setTimeout(waitThenInstall, ${o.pollMs});
    };
    const acquire = () => {
      const result = tryLock();
      if (result === "taken") {
        lockBeat = setInterval(() => ownsLock() && touch(INSTALL_LOCK), ${o.pollMs});
        return waitThenInstall();
      }
      if (result === "quiet") return setTimeout(acquire, ${o.pollMs});
      console.log(result === "beating"
        ? \`[wait] another installer is already waiting; leaving \${VERSION} to it\`
        : \`[wait] settings lock busy; \${VERSION} left for the next run\`);
    };
    acquire();
  `;
}
function launchDetachedInstall(invocation, displayCommand, version) {
  mkdirSync(CONFIG_DIR, { recursive: true, mode: 448 });
  const configFile = join(CONFIG_DIR, "config.json");
  const nodeScript = installerScript({
    configFile,
    version,
    bin: invocation.bin,
    args: invocation.args,
    runningDir: RUNNING_DIR,
    pollMs: INSTALL_POLL_MS,
    maxWaitMs: INSTALL_MAX_WAIT_MS,
    staleMs: RUNNING_STALE_MS
  });
  const out = openSync(LOG_FILE, "a", 384);
  const child = spawn(process.execPath, ["-e", nodeScript], {
    detached: true,
    stdio: ["ignore", out, out],
    windowsHide: true,
    env: { ...process.env, HYPERFRAMES_NO_UPDATE_CHECK: "1", HYPERFRAMES_NO_AUTO_INSTALL: "1" }
  });
  child.unref();
  log(`[launch] pid=${child.pid ?? "?"} cmd=${displayCommand} version=${version}`);
}
function isSilentUpgrade(latestVersion, currentVersion) {
  if (!latestVersion || !currentVersion) return false;
  let cmp;
  try {
    cmp = compareVersions(latestVersion, currentVersion);
  } catch {
    return false;
  }
  if (cmp <= 0) return false;
  const latestMajor = majorOf(latestVersion);
  const currentMajor = majorOf(currentVersion);
  if (Number.isFinite(latestMajor) && Number.isFinite(currentMajor) && latestMajor > currentMajor) {
    log(`[skip] major-bump ${currentVersion} -> ${latestVersion}`);
    return false;
  }
  return true;
}
function scheduleBackgroundInstall(latestVersion, currentVersion) {
  if (isAutoInstallDisabled()) return false;
  if (!isSilentUpgrade(latestVersion, currentVersion)) return false;
  const installer = detectInstaller();
  if (installer.kind === "skip") {
    log(`[skip] ${installer.reason}`);
    return false;
  }
  const installCommand = installer.installCommand(latestVersion);
  const invocation = installInvocation(installer.kind, latestVersion);
  if (!installCommand || !invocation) return false;
  const config = readConfig();
  if (config.pendingUpdate) {
    const startedAt = Date.parse(config.pendingUpdate.startedAt);
    const age = Number.isFinite(startedAt) ? Date.now() - startedAt : Number.POSITIVE_INFINITY;
    if (age < PENDING_TIMEOUT_MS && config.pendingUpdate.version === latestVersion) {
      return false;
    }
  }
  if (config.completedUpdate && config.completedUpdate.version === latestVersion) {
    return false;
  }
  config.pendingUpdate = {
    version: latestVersion,
    command: installCommand,
    startedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (!writeConfig(config)) return false;
  try {
    launchDetachedInstall(invocation, installCommand, latestVersion);
    return true;
  } catch (err) {
    log(`[error] spawn failed: ${String(err)}`);
    const rollback = readConfig();
    delete rollback.pendingUpdate;
    writeConfig(rollback);
    return false;
  }
}
function reportCompletedUpdate() {
  if (process.env["HYPERFRAMES_NO_UPDATE_CHECK"] === "1") return;
  const config = readConfig();
  const done = config.completedUpdate;
  if (!done) return;
  if (done.ok) {
    delete config.completedUpdate;
    writeConfig(config);
  } else if (!done.reported) {
    config.completedUpdate = { ...done, reported: true };
    writeConfig(config);
  } else {
    return;
  }
  if (!process.stderr.isTTY) return;
  if (done.ok) {
    process.stderr.write(`  hyperframes auto-updated to v${done.version}

`);
  } else if (!done.reported) {
    process.stderr.write(
      `  hyperframes auto-update to v${done.version} failed. Run \`hyperframes upgrade\` to retry.

`
    );
  }
}
export {
  installerScript,
  reportCompletedUpdate,
  scheduleBackgroundInstall
};
