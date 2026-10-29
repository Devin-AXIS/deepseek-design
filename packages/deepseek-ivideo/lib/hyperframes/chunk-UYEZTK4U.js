import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/capture/captureWatchdog.ts
async function runWithWatchdog(work, deadline) {
  const observedWork = work.then(
    (result) => ({ kind: "complete", result }),
    (error) => ({ kind: "error", error })
  );
  return await Promise.race([
    observedWork,
    deadline.then(() => ({ kind: "deadline" }))
  ]);
}
function createCaptureWatchdog(deadlineMs) {
  let browser;
  let didExpire = false;
  let timer;
  let resolveDeadline = () => {
  };
  const promise = new Promise((resolve) => {
    resolveDeadline = resolve;
  });
  if (deadlineMs !== void 0) {
    timer = setTimeout(() => {
      didExpire = true;
      resolveDeadline();
      void browser?.close().catch(() => void 0);
    }, deadlineMs);
  }
  return {
    expired: () => didExpire,
    promise,
    registerBrowser: (nextBrowser) => {
      browser = nextBrowser;
      if (didExpire) void browser.close().catch(() => void 0);
    },
    unregisterBrowser: (closedBrowser) => {
      if (browser === closedBrowser) browser = void 0;
    },
    dispose: () => {
      if (timer !== void 0) clearTimeout(timer);
    }
  };
}
function parseCaptureDeadline(raw) {
  if (raw === void 0 || raw === "") return void 0;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) return void 0;
  return parsed;
}

export {
  runWithWatchdog,
  createCaptureWatchdog,
  parseCaptureDeadline
};
