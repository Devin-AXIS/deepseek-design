import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/runningCli.ts
import { mkdirSync, unlinkSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
var RUNNING_DIR = join(homedir(), ".hyperframes", "running");
var RUNNING_HEARTBEAT_MS = 3e4;
var RUNNING_STALE_MS = 10 * 6e4;
function registerRunningCli(dir = RUNNING_DIR, heartbeatMs = RUNNING_HEARTBEAT_MS) {
  try {
    mkdirSync(dir, { recursive: true, mode: 448 });
    const file = join(dir, String(process.pid));
    writeFileSync(file, "", { mode: 384 });
    const heartbeat = setInterval(() => {
      try {
        mkdirSync(dir, { recursive: true, mode: 448 });
        writeFileSync(file, String(Date.now()), { mode: 384 });
      } catch {
      }
    }, heartbeatMs);
    heartbeat.unref();
    process.on("exit", () => {
      clearInterval(heartbeat);
      try {
        unlinkSync(file);
      } catch {
      }
    });
  } catch {
  }
}

export {
  RUNNING_DIR,
  RUNNING_STALE_MS,
  registerRunningCli
};
