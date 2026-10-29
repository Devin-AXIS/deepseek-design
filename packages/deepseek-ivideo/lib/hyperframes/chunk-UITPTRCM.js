import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/browser/gpuPolicy.ts
function resolveLocalBrowserGpuMode(browserGpuArg, envMode = process.env.PRODUCER_BROWSER_GPU_MODE) {
  if (browserGpuArg === true) return "hardware";
  if (browserGpuArg === false) return "software";
  if (envMode === "hardware" || envMode === "software" || envMode === "auto") return envMode;
  return "auto";
}
async function resolveCaptureBrowserGpuMode(requestedMode, chromePath) {
  const { resolveBrowserGpuMode } = await import("./src-2CXRYIST.js");
  return resolveBrowserGpuMode(requestedMode, { chromePath });
}

export {
  resolveLocalBrowserGpuMode,
  resolveCaptureBrowserGpuMode
};
