import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import "./chunk-Q5X2B5WT.js";
import {
  ensureBrowser,
  releaseOwnedBrowserInstallLock
} from "./chunk-GOPKWMQZ.js";
import {
  killOrphanedProcesses
} from "./chunk-LAOCA3MQ.js";
import "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import {
  lintProject
} from "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-KNU5COPB.js";
import "./chunk-M2WBOQ2Q.js";

// src/renderSetupWorker.ts
import { constants, setPriority } from "os";

// src/renderSetupWorkerLifecycle.ts
var RENDER_SETUP_SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"];
function installRenderSetupSignalHandlers(signalTarget, releaseLock, resendSignal, handleHangup = true) {
  const handlers = /* @__PURE__ */ new Map();
  const handledSignals = handleHangup ? RENDER_SETUP_SIGNALS : RENDER_SETUP_SIGNALS.filter((signal) => signal !== "SIGHUP");
  for (const signal of handledSignals) {
    const handler = () => {
      releaseLock();
      signalTarget.off(signal, handler);
      resendSignal(signal);
    };
    handlers.set(signal, handler);
    signalTarget.on(signal, handler);
  }
  return () => {
    for (const [signal, handler] of handlers) signalTarget.off(signal, handler);
  };
}

// src/renderSetupWorker.ts
var RESULT_PREFIX = "HYPERFRAMES_RENDER_SETUP_RESULT:";
var mode = process.argv[2];
var input = JSON.parse(process.env.HYPERFRAMES_RENDER_SETUP_INPUT ?? "{}");
var disposeSignalHandlers = installRenderSetupSignalHandlers(
  process,
  releaseOwnedBrowserInstallLock,
  (signal) => process.kill(process.pid, signal),
  process.env.HYPERFRAMES_RENDER_DETACHED !== "1"
);
var result;
if (mode === "browser") {
  result = await ensureBrowser(input);
} else if (mode === "lint") {
  setPriority(constants.priority.PRIORITY_LOW);
  result = await lintProject(
    input.projectDir,
    input.entryFile,
    input.host ? { host: input.host } : void 0
  );
} else if (mode === "orphan-cleanup") {
  const killed = killOrphanedProcesses();
  result = killed;
  if (killed > 0) await new Promise((resolve) => setTimeout(resolve, 600));
} else {
  throw new Error(`Unknown render setup mode: ${mode}`);
}
disposeSignalHandlers();
process.stdout.write(RESULT_PREFIX + JSON.stringify(result) + "\n");
