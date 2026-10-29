import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../core/dist/gsapCdn.js
var GSAP_CDN_VERSION = "3.15.0";
function gsapCdnDist(gsapVersion) {
  const version = gsapVersion && /^\d+(\.\d+)*$/.test(gsapVersion) ? gsapVersion : GSAP_CDN_VERSION;
  return `https://cdn.jsdelivr.net/npm/gsap@${version}/dist/`;
}
function motionPathPluginUrl(gsapVersion) {
  return `${gsapCdnDist(gsapVersion)}MotionPathPlugin.min.js`;
}

export {
  gsapCdnDist,
  motionPathPluginUrl
};
