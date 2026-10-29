import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../core/dist/audibleVideo.js
var AUDIBLE_VIDEO_QUALIFIER = ':not([muted]):is(:not([data-has-audio]),[data-has-audio="true"])';
var AUDIBLE_MEDIA_SELECTOR = `audio[data-start], video[data-start]${AUDIBLE_VIDEO_QUALIFIER}`;
function isAudibleVideoElement(el) {
  if (el.tagName.toLowerCase() !== "video" || el.hasAttribute("muted"))
    return false;
  const declared = el.getAttribute("data-has-audio");
  return declared === null || declared === "true";
}

// ../core/dist/audioGain.js
var MAX_AUDIO_GAIN_DB = 12;
function audioDbToGain(db) {
  return 10 ** (db / 20);
}
var MAX_AUDIO_GAIN = audioDbToGain(MAX_AUDIO_GAIN_DB);
function clampAudioGain(value) {
  if (!Number.isFinite(value))
    return 1;
  return Math.max(0, Math.min(MAX_AUDIO_GAIN, value));
}
function formatAudioGain(gain) {
  return clampAudioGain(gain).toFixed(6).replace(/\.?0+$/, "");
}

export {
  AUDIBLE_VIDEO_QUALIFIER,
  isAudibleVideoElement,
  MAX_AUDIO_GAIN_DB,
  MAX_AUDIO_GAIN,
  clampAudioGain,
  formatAudioGain
};
