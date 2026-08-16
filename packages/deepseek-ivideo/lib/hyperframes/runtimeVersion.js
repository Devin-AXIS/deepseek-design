import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/runtimeVersion.ts
var MINIMUM_NODE_MAJOR = 22;
function runtimeVersionError(version) {
  const major = Number.parseInt(version.split(".", 1)[0] ?? "", 10);
  if (Number.isFinite(major) && major >= MINIMUM_NODE_MAJOR) return null;
  return `HyperFrames requires Node.js >= ${MINIMUM_NODE_MAJOR} (current: ${version}). Switch Node versions and retry.`;
}
export {
  runtimeVersionError
};
