import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/commandResult.ts
var SUCCESS_RESULT = { exitCode: 0, kind: "success" };
var pendingResult = SUCCESS_RESULT;
var rootExitRequester;
var rootExitCodeSanitizer;
var CliUsageError = class extends Error {
  result;
  constructor(message = "Invalid command usage", options = {}) {
    super(message);
    this.name = "CliUsageError";
    this.result = {
      exitCode: options.exitCode ?? 1,
      kind: "usage_error",
      presented: options.presented
    };
  }
};
var CliRuntimeError = class extends Error {
  result;
  constructor(message = "Command failed", options = {}) {
    super(message, options.cause === void 0 ? void 0 : { cause: options.cause });
    this.name = "CliRuntimeError";
    this.result = {
      exitCode: options.exitCode ?? 1,
      kind: "runtime_error",
      presented: options.presented
    };
  }
};
var CliResultSignal = class extends Error {
  result;
  constructor(result) {
    super(`CLI result ${result.exitCode}`);
    this.name = "CliResultSignal";
    this.result = result;
  }
};
function failCommand(exitCode = 1, cause) {
  throw new CliRuntimeError("Command failed", { exitCode, presented: true, cause });
}
function failUsage(exitCode = 1) {
  throw new CliUsageError("Invalid command usage", { exitCode, presented: true });
}
function finishCommand(exitCode = 0) {
  throw new CliResultSignal({
    exitCode,
    kind: exitCode === 0 ? "success" : "runtime_error",
    presented: true
  });
}
function setCommandResult(result) {
  if (pendingResult.exitCode !== 0 && result.exitCode === 0) return;
  pendingResult = result;
}
function setCommandExitCode(exitCode) {
  setCommandResult({
    exitCode,
    kind: exitCode === 0 ? "success" : "runtime_error",
    presented: true
  });
}
function consumeCommandResult() {
  const result = pendingResult;
  pendingResult = SUCCESS_RESULT;
  return result;
}
function registerRootExitRequester(requester) {
  rootExitRequester = requester;
}
function registerRootExitCodeSanitizer(sanitizer) {
  rootExitCodeSanitizer = sanitizer;
}
function sanitizeSuccessfulExitCode() {
  rootExitCodeSanitizer?.();
}
function requestCliExit(exitCode = 0) {
  if (!rootExitRequester) {
    setCommandResult({
      exitCode,
      kind: exitCode === 0 ? "success" : "runtime_error",
      presented: true
    });
    return;
  }
  rootExitRequester(exitCode);
}

export {
  CliUsageError,
  CliRuntimeError,
  CliResultSignal,
  failCommand,
  failUsage,
  finishCommand,
  setCommandExitCode,
  consumeCommandResult,
  registerRootExitRequester,
  registerRootExitCodeSanitizer,
  sanitizeSuccessfulExitCode,
  requestCliExit
};
