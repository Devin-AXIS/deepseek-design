import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  runRenderSetupWorker,
  terminateProcessTree
} from "./chunk-LCSMOLGX.js";

// src/utils/orphanCleanup.ts
import { execFileSync } from "child_process";
import { readFileSync } from "fs";
function killOrphanedProcesses() {
  if (process.platform === "win32") return 0;
  return killOrphansMatching([
    "chrome-headless-shell",
    "chrome_headless_shell",
    "puppeteer_dev_chrome_profile"
  ]);
}
async function killOrphanedProcessesForRender(signal) {
  return runRenderSetupWorker("orphan-cleanup", {}, { signal, timeoutMs: 15e3 });
}
function killProcessTree(pid, signal = "SIGTERM") {
  void terminateProcessTree(pid, { signal }).catch(() => void 0);
}
function processIdentity(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return null;
  try {
    if (process.platform === "win32") {
      const created = execFileSync(
        "powershell.exe",
        [
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          `$p = Get-CimInstance Win32_Process -Filter 'ProcessId = ${pid}' -ErrorAction SilentlyContinue; if ($p) { $p.CreationDate.ToFileTimeUtc() }`
        ],
        {
          encoding: "utf8",
          timeout: 2e3,
          stdio: ["pipe", "pipe", "ignore"],
          windowsHide: true
        }
      ).trim();
      return created ? `windows:${created}` : null;
    }
    if (process.platform === "linux") {
      const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
      const fields = stat.slice(stat.lastIndexOf(") ") + 2).trim().split(/\s+/);
      const startTicks = fields[19];
      return startTicks ? `linux:${startTicks}` : null;
    }
    const started = execFileSync("ps", ["-o", "lstart=", "-p", String(pid)], {
      encoding: "utf8",
      timeout: 2e3
    }).trim();
    return started ? `posix:${started}` : null;
  } catch {
    return null;
  }
}
function recordsToAncestors(pid, records) {
  const byPid = new Map(records.map((record) => [record.pid, record]));
  const ancestors = [];
  const visited = /* @__PURE__ */ new Set([pid]);
  let current = pid;
  for (let depth = 0; depth < 64; depth++) {
    const parent = byPid.get(current)?.parentPid;
    if (parent === void 0 || parent <= 1 || visited.has(parent)) break;
    visited.add(parent);
    const ancestor = byPid.get(parent);
    if (!ancestor) break;
    ancestors.push({ pid: ancestor.pid, identity: ancestor.identity });
    current = parent;
  }
  return ancestors;
}
function processAncestorSnapshot(pid) {
  if (!Number.isInteger(pid) || pid <= 0 || process.platform === "linux") return [];
  try {
    if (process.platform === "win32") {
      const output2 = execFileSync(
        "powershell.exe",
        [
          "-NoProfile",
          "-NonInteractive",
          "-Command",
          'Get-CimInstance Win32_Process | ForEach-Object { "$($_.ProcessId) $($_.ParentProcessId) $($_.CreationDate.ToFileTimeUtc())" }'
        ],
        { encoding: "utf8", timeout: 2e3, stdio: ["pipe", "pipe", "ignore"], windowsHide: true }
      );
      const records2 = output2.split(/\r?\n/).map((line) => line.trim().split(/\s+/)).map(([processId, parentProcessId, creationDate]) => ({
        pid: Number(processId),
        parentPid: Number(parentProcessId),
        identity: creationDate ? `windows:${creationDate}` : ""
      })).filter(
        (record) => Number.isInteger(record.pid) && record.pid > 0 && Number.isInteger(record.parentPid) && record.parentPid > 0 && record.identity !== ""
      );
      return recordsToAncestors(pid, records2);
    }
    const output = execFileSync("ps", ["-axo", "pid=,ppid=,lstart="], {
      encoding: "utf8",
      timeout: 2e3
    });
    const records = output.split(/\r?\n/).map((line) => line.match(/^\s*(\d+)\s+(\d+)\s+(.+)$/)).filter((match) => match !== null).map(([, processId, parentProcessId, started]) => ({
      pid: Number(processId),
      parentPid: Number(parentProcessId),
      identity: `posix:${started?.trim() ?? ""}`
    }));
    return recordsToAncestors(pid, records);
  } catch {
    return [];
  }
}
function processParentPid(pid) {
  try {
    const output = process.platform === "win32" ? execFileSync(
      "powershell.exe",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `$p = Get-CimInstance Win32_Process -Filter 'ProcessId = ${pid}' -ErrorAction SilentlyContinue; if ($p) { $p.ParentProcessId }`
      ],
      {
        encoding: "utf8",
        timeout: 2e3,
        stdio: ["pipe", "pipe", "ignore"],
        windowsHide: true
      }
    ) : execFileSync("ps", ["-o", "ppid=", "-p", String(pid)], {
      encoding: "utf8",
      timeout: 2e3
    });
    const parentPid = Number(output.trim());
    return Number.isInteger(parentPid) && parentPid > 0 ? parentPid : null;
  } catch {
    return null;
  }
}
function isProcessDescendant(childPid, ancestorPid, parentPid = processParentPid) {
  if (childPid <= 0 || ancestorPid <= 0 || childPid === ancestorPid) return false;
  const visited = /* @__PURE__ */ new Set();
  let current = childPid;
  for (let depth = 0; depth < 64; depth++) {
    if (visited.has(current)) return false;
    visited.add(current);
    const parent = parentPid(current);
    if (parent === ancestorPid) return true;
    if (parent === null || parent <= 1) return false;
    current = parent;
  }
  return false;
}
function killOrphansMatching(markers) {
  const uid = process.getuid?.();
  const owner = uid === void 0 ? ["-A"] : ["-U", String(uid)];
  let table;
  try {
    table = execFileSync("ps", [...owner, "-ww", "-o", "pid=,ppid=,args="], {
      encoding: "utf-8",
      timeout: 3e3
    });
  } catch {
    return 0;
  }
  let killed = 0;
  for (const line of table.split("\n")) {
    const match = line.match(/^\s*(\d+)\s+(\d+)\s+(.*)$/);
    if (!match || match[2] !== "1") continue;
    if (!markers.some((marker) => match[3].includes(marker))) continue;
    killProcessTree(Number(match[1]));
    killed++;
  }
  return killed;
}

export {
  killOrphanedProcesses,
  killOrphanedProcessesForRender,
  killProcessTree,
  processIdentity,
  processAncestorSnapshot,
  processParentPid,
  isProcessDescendant
};
