import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/ui/format.ts
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function formatDuration(ms) {
  const seconds = ms / 1e3;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds - minutes * 60;
  return `${minutes}m ${remaining.toFixed(1)}s`;
}
function formatRenderSummaryDetail(input) {
  const middle = input.isDirectory && !input.playlistDirectory ? input.frameCount != null ? `${input.frameCount} frames` : void 0 : input.outputDurationSeconds != null && input.outputDurationSeconds > 0 ? `${formatDuration(input.outputDurationSeconds * 1e3)} video` : void 0;
  const renderTime = `rendered in ${formatDuration(input.elapsedMs)}`;
  return [middle, renderTime].filter(Boolean).join(" \xB7 ");
}
var PIPELINE_STAGES = [
  ["compileMs", "compile"],
  ["videoExtractMs", "extract"],
  ["audioProcessMs", "audio"],
  ["browserProbeMs", "probe"],
  ["captureSetupMs", "setup"],
  ["captureFrameMs", "capture"],
  ["encodeMs", "encode"],
  ["assembleMs", "assemble"]
];
function resolvePrintedCaptureMode(sessionMode, observabilityCaptureMode) {
  if (sessionMode && sessionMode !== "unknown") return sessionMode;
  return observabilityCaptureMode;
}
function formatRenderPipelineDetail(input) {
  const parts = [];
  if (input.captureMode) parts.push(`${input.captureMode} capture`);
  if (input.browserGpuMode) parts.push(`${input.browserGpuMode} gpu`);
  for (const [key, stageLabel] of PIPELINE_STAGES) {
    const ms = input.stages[key];
    if (ms == null) continue;
    const label2 = key === "encodeMs" && input.streamingEncode ? "encode (during capture)" : stageLabel;
    parts.push(`${label2} ${formatDuration(ms)}`);
  }
  return parts.length > 0 ? parts.join(" \xB7 ") : void 0;
}
function formatScreenshotFallbackHint(input) {
  if (input.platform !== "linux" || input.requestedGpuMode !== "auto") return void 0;
  if (input.captureMode !== "screenshot" || input.browserGpuMode !== "software") return void 0;
  return "Screenshot capture (slower): BeginFrame did not run. Needs chrome-headless-shell and no --resolution upscale. Heavy compositions can stall on software GL.";
}
function label(name, value) {
  const pad = 14 - name.length;
  return `   ${c.dim(name)}${" ".repeat(Math.max(1, pad))}${c.bold(value)}`;
}
function errorBox(title, hint, suggestion) {
  console.error(`
${c.error("\u2717")}  ${c.bold(title)}`);
  if (hint) {
    const indented = hint.split("\n").map((line) => `   ${line}`).join("\n");
    console.error(`
${c.dim(indented)}`);
  }
  if (suggestion) console.error(`   ${c.accent(suggestion)}`);
  console.error();
}

export {
  formatBytes,
  formatDuration,
  formatRenderSummaryDetail,
  resolvePrintedCaptureMode,
  formatRenderPipelineDetail,
  formatScreenshotFallbackHint,
  label,
  errorBox
};
