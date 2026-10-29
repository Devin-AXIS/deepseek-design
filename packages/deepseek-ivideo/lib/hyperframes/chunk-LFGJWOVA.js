import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/openBrowser.ts
import { spawn } from "child_process";
function parseRemoteDebuggingPort(value) {
  if (value === void 0 || value === "") return void 0;
  if (!/^\d+$/.test(value)) {
    throw new Error("--remote-debugging-port must be an integer between 1 and 65535");
  }
  const port = Number(value);
  if (port < 1 || port > 65535) {
    throw new Error("--remote-debugging-port must be an integer between 1 and 65535");
  }
  return port;
}
function validateRemoteDebuggingPortDeps(deps) {
  if (!deps.remoteDebuggingPort) return null;
  if (!deps.browserPath) return "--remote-debugging-port requires --browser-path";
  if (!deps.userDataDir) return "--remote-debugging-port requires --user-data-dir";
  return null;
}
function buildBrowserArgs(url, options) {
  const args = [];
  if (options.userDataDir) {
    args.push(`--user-data-dir=${options.userDataDir}`);
  }
  if (options.remoteDebuggingPort !== void 0 && options.userDataDir) {
    args.push(`--remote-debugging-port=${options.remoteDebuggingPort}`);
  }
  if (options.disableGpu) {
    args.push("--disable-gpu");
  }
  args.push(url);
  return args;
}
function openBrowser(url, options = {}) {
  if (options.browserPath) {
    const args = buildBrowserArgs(url, options);
    const child = spawn(options.browserPath, args, {
      detached: true,
      stdio: "ignore"
    });
    child.on("error", () => {
    });
    child.unref();
    return;
  }
  import("open").then((mod) => mod.default(url)).catch(() => {
  });
}

export {
  parseRemoteDebuggingPort,
  validateRemoteDebuggingPortDeps,
  openBrowser
};
