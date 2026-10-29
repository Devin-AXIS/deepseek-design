import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  identifyUser,
  trackAuthLoginCompleted,
  trackAuthLoginFailed,
  trackAuthLoginStarted,
  trackBrowserInstall,
  trackCliError,
  trackCommand,
  trackCommandResult,
  trackFigmaImport,
  trackInitTemplate,
  trackRenderComplete,
  trackRenderError
} from "./chunk-D3TRQ4GS.js";
import {
  flush,
  flushSync,
  shouldTrack,
  showTelemetryNotice,
  trackEvent
} from "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import {
  bytesToMb,
  getFreeDiskMb,
  getShmSizeMb,
  getSystemMeta
} from "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import "./chunk-54HJ63Q2.js";
import "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import "./chunk-K4WIOZFP.js";
import {
  CONFIG_PATH,
  incrementCommandCount,
  readConfig,
  writeConfig
} from "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";
export {
  CONFIG_PATH,
  bytesToMb,
  flush,
  flushSync,
  getFreeDiskMb,
  getShmSizeMb,
  getSystemMeta,
  identifyUser,
  incrementCommandCount,
  readConfig,
  shouldTrack,
  showTelemetryNotice,
  trackAuthLoginCompleted,
  trackAuthLoginFailed,
  trackAuthLoginStarted,
  trackBrowserInstall,
  trackCliError,
  trackCommand,
  trackCommandResult,
  trackEvent,
  trackFigmaImport,
  trackInitTemplate,
  trackRenderComplete,
  trackRenderError,
  writeConfig
};
