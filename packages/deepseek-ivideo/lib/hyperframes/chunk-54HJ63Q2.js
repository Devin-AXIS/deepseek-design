import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/telemetry/runId.ts
import { randomUUID } from "crypto";
var resolved = false;
var runId;
function getRunId() {
  if (!resolved) {
    const value = process.env["HYPERFRAMES_RUN_ID"]?.trim().slice(0, 128);
    runId = value ? value : void 0;
    resolved = true;
  }
  return runId;
}
var invocationId;
function getInvocationId() {
  invocationId ??= randomUUID();
  return invocationId;
}

export {
  getRunId,
  getInvocationId
};
