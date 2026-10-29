import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../engine/src/services/chromeHostCeiling.ts
import { release } from "os";
var MACOS_12_LAST_CHROME_MAJOR = 150;
function chromeMajorCeiling(hostPlatform = process.platform, hostRelease = release()) {
  if (hostPlatform !== "darwin") return void 0;
  return Number.parseInt(hostRelease, 10) < 22 ? MACOS_12_LAST_CHROME_MAJOR : void 0;
}
function exceedsChromeCeiling(versionName, ceiling) {
  if (ceiling === void 0) return false;
  const major = Number.parseInt(versionName.slice(versionName.indexOf("-") + 1), 10);
  return major > ceiling;
}

export {
  chromeMajorCeiling,
  exceedsChromeCeiling
};
