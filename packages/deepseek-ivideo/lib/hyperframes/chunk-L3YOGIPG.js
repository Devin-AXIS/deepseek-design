import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  sanitizeSuccessfulExitCode
} from "./chunk-PBN6GBJE.js";

// src/utils/render-success-state.ts
var renderSucceeded = false;
function markRenderSucceeded() {
  renderSucceeded = true;
}
function isRenderSucceeded() {
  return renderSucceeded;
}
var defaultErrorSink = (message) => {
  process.stderr.write(`${message}
`);
};
function runPostRenderStep(label, fn, sink = defaultErrorSink) {
  try {
    fn();
  } catch (err) {
    reportPostRenderStepFailure(label, err, sink);
  }
}
async function runPostRenderStepAsync(label, fn, sink = defaultErrorSink) {
  try {
    await fn();
  } catch (err) {
    reportPostRenderStepFailure(label, err, sink);
  }
}
function reportPostRenderStepFailure(label, err, sink) {
  const message = err instanceof Error ? err.message : String(err);
  sink(`  [hyperframes] Post-render step '${label}' failed (render already succeeded): ${message}`);
  sanitizeSuccessfulExitCode();
}

export {
  markRenderSucceeded,
  isRenderSucceeded,
  runPostRenderStep,
  runPostRenderStepAsync
};
