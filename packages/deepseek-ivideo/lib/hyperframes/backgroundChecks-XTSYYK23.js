import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  skillsCheckDue
} from "./chunk-T54WZH5O.js";
import {
  updateCheckDue
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import {
  readConfig,
  readConfigFresh,
  writeConfig
} from "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-M2WBOQ2Q.js";

// src/utils/backgroundChecks.ts
import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
var FAILED_CHECK_RETRY_MS = 60 * 60 * 1e3;
function attemptedRecently(stamp, now) {
  const age = stamp === void 0 ? NaN : now - new Date(stamp).getTime();
  return age >= 0 && age < FAILED_CHECK_RETRY_MS;
}
function launchBackgroundChecks() {
  const now = Date.now();
  const config = readConfig();
  const due = [];
  if (updateCheckDue() && !attemptedRecently(config.lastUpdateAttemptAt, now)) due.push("update");
  if (skillsCheckDue() && !attemptedRecently(config.lastSkillsAttemptAt, now)) due.push("skills");
  if (due.length === 0) return;
  const stamped = readConfigFresh();
  const at = new Date(now).toISOString();
  if (due.includes("update")) stamped.lastUpdateAttemptAt = at;
  if (due.includes("skills")) stamped.lastSkillsAttemptAt = at;
  writeConfig(stamped);
  const worker = join(dirname(fileURLToPath(import.meta.url)), "backgroundChecksWorker.js");
  try {
    const child = spawn(process.execPath, [worker, ...due], {
      detached: true,
      stdio: "ignore",
      windowsHide: true
    });
    child.on("error", () => {
    });
    child.unref();
  } catch {
  }
}
export {
  launchBackgroundChecks
};
