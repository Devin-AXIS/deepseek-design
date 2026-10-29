import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/capture/captureTimeout.ts
import { TimeoutError } from "puppeteer-core";
var PUPPETEER_DEFAULT_PROTOCOL_TIMEOUT_MS = 18e4;
var StageBudgetTimeoutError = class extends Error {
  budgetMs;
  constructor(label, budgetMs) {
    super(`stage budget exceeded while ${label} (${budgetMs}ms)`);
    this.name = "StageBudgetTimeoutError";
    this.budgetMs = budgetMs;
  }
};
function captureProtocolTimeoutMs(navTimeoutMs, postNavBudgetMs) {
  if (!Number.isFinite(navTimeoutMs) || !Number.isFinite(postNavBudgetMs)) {
    return PUPPETEER_DEFAULT_PROTOCOL_TIMEOUT_MS;
  }
  return Math.max(6e4, Math.max(0, navTimeoutMs), Math.max(0, postNavBudgetMs));
}
function errorMessage(err) {
  return err instanceof Error ? err.message : String(err);
}
function hasNavigationTimeoutMessage(msg) {
  return /navigation timeout/i.test(msg);
}
function hasProtocolEvaluateTimeoutMessage(msg) {
  return /Runtime\.evaluate timed out|protocolTimeout|protocol timeout/i.test(msg);
}
function isNavigationTimeoutError(err) {
  if (err instanceof TimeoutError) {
    return hasNavigationTimeoutMessage(err.message);
  }
  return typeof err === "string" && hasNavigationTimeoutMessage(err);
}
function isStageBudgetTimeoutError(err) {
  return err instanceof StageBudgetTimeoutError;
}
function isProtocolEvaluateTimeoutError(err) {
  if (err instanceof TimeoutError) {
    return !hasNavigationTimeoutMessage(err.message);
  }
  return hasProtocolEvaluateTimeoutMessage(errorMessage(err));
}
function isDegradableEvaluateTimeoutError(err) {
  return isStageBudgetTimeoutError(err) || isProtocolEvaluateTimeoutError(err);
}
async function withRemainingBudget(work, remainingMs, label) {
  if (!(remainingMs > 0)) {
    throw new StageBudgetTimeoutError(label, Math.max(0, remainingMs));
  }
  let timer;
  try {
    return await Promise.race([
      work,
      new Promise((_resolve, reject) => {
        timer = setTimeout(() => {
          reject(new StageBudgetTimeoutError(label, remainingMs));
        }, remainingMs);
      })
    ]);
  } finally {
    if (timer !== void 0) {
      clearTimeout(timer);
    }
  }
}
function formatCaptureFailureReason(errMsg) {
  if (hasProtocolEvaluateTimeoutMessage(errMsg) || /stage budget exceeded/i.test(errMsg)) {
    return `Page extraction timed out while running in-page script (${errMsg}). The page likely opened, but a later capture step hung.`;
  }
  if (hasNavigationTimeoutMessage(errMsg)) {
    return "Page navigation timed out \u2014 the site may be blocking headless browsers or requires authentication.";
  }
  if (/timeout|timed out/i.test(errMsg)) {
    return `Capture timed out: ${errMsg}`;
  }
  return `Capture failed: ${errMsg}`;
}

export {
  PUPPETEER_DEFAULT_PROTOCOL_TIMEOUT_MS,
  StageBudgetTimeoutError,
  captureProtocolTimeoutMs,
  isNavigationTimeoutError,
  isProtocolEvaluateTimeoutError,
  isDegradableEvaluateTimeoutError,
  withRemainingBudget,
  formatCaptureFailureReason
};
