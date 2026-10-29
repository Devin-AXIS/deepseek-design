import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  setHostHandlesSigint
} from "./chunk-3NHZZLH3.js";
import {
  processAncestorSnapshot,
  processIdentity,
  processParentPid
} from "./chunk-LAOCA3MQ.js";
import {
  processIsAlive
} from "./chunk-LCSMOLGX.js";

// src/utils/renderCancellation.ts
var RENDER_CANCELLATION_SIGNALS = [
  "SIGINT",
  "SIGTERM",
  "SIGHUP"
];
function stoppedByCancelSignal(stop) {
  if (stop.code || stop.killed || stop.error) return false;
  return RENDER_CANCELLATION_SIGNALS.some((signal) => signal === stop.signal);
}
function captureAncestors(pid, lookupParentPid, lookupIdentity, isAlive) {
  const ancestors = [];
  const visited = /* @__PURE__ */ new Set([pid]);
  let current = pid;
  for (let depth = 0; depth < 64; depth++) {
    const parent = lookupParentPid(current);
    if (parent === null || parent <= 1 || visited.has(parent)) break;
    visited.add(parent);
    if (!isAlive(parent)) break;
    const identity = lookupIdentity(parent);
    if (identity === null) break;
    ancestors.push({ pid: parent, identity });
    current = parent;
  }
  return ancestors;
}
function captureRenderAncestors(options, platform, pid, lookupIdentity, isAlive) {
  if (options.detached ?? process.env.HYPERFRAMES_RENDER_DETACHED === "1") return [];
  if (platform !== "linux" && options.parentPid === void 0 && options.identity === void 0) {
    return (options.ancestorSnapshot ?? processAncestorSnapshot)(pid);
  }
  return captureAncestors(pid, options.parentPid ?? processParentPid, lookupIdentity, isAlive);
}
function installSignalHandlers(detached, signalTarget, abort) {
  const signalHandlers = /* @__PURE__ */ new Map();
  const handledSignals = detached ? RENDER_CANCELLATION_SIGNALS.filter((signal) => signal !== "SIGHUP") : RENDER_CANCELLATION_SIGNALS;
  for (const signal of handledSignals) {
    const handler = () => abort(`render_cancelled_by_${signal.toLowerCase()}`);
    signalHandlers.set(signal, handler);
    signalTarget.on(signal, handler);
  }
  return signalHandlers;
}
function createRenderCancellationScope(options = {}) {
  const controller = new AbortController();
  const signalTarget = options.signalTarget ?? process;
  const abort = (reason) => {
    if (!controller.signal.aborted) controller.abort(new Error(reason));
  };
  const detached = options.detached ?? process.env.HYPERFRAMES_RENDER_DETACHED === "1";
  const signalHandlers = installSignalHandlers(detached, signalTarget, abort);
  setHostHandlesSigint(true);
  const lookupIdentity = options.identity ?? processIdentity;
  const isAlive = options.isAlive ?? processIsAlive;
  const platform = options.platform ?? process.platform;
  const pid = options.pid ?? process.pid;
  const ancestors = captureRenderAncestors(options, platform, pid, lookupIdentity, isAlive);
  const checkAncestorLiveness = () => {
    for (const ancestor of ancestors) {
      if (!isAlive(ancestor.pid)) {
        abort("render_cancelled_parent_exited");
        return false;
      }
    }
    return true;
  };
  const checkAncestors = () => {
    if (!checkAncestorLiveness()) return;
    if (platform !== "linux") return;
    for (const ancestor of ancestors) {
      const currentIdentity = lookupIdentity(ancestor.pid);
      if (currentIdentity !== null && currentIdentity !== ancestor.identity) {
        abort("render_cancelled_parent_exited");
        return;
      }
    }
  };
  const defaultPollIntervalMs = ancestors.length > 0 && platform === "linux" ? 250 : 2e3;
  const watchdogTimer = setInterval(
    platform === "linux" ? checkAncestors : () => void checkAncestorLiveness(),
    options.parentPollIntervalMs ?? defaultPollIntervalMs
  );
  let disposed = false;
  return {
    signal: controller.signal,
    checkAncestors,
    dispose: () => {
      if (disposed) return;
      disposed = true;
      if (watchdogTimer !== void 0) clearInterval(watchdogTimer);
      for (const [signal, handler] of signalHandlers) signalTarget.off(signal, handler);
      setHostHandlesSigint(false);
    }
  };
}

export {
  stoppedByCancelSignal,
  createRenderCancellationScope
};
