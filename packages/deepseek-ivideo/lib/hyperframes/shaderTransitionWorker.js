import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  TRANSITIONS,
  crossfade
} from "./chunk-3GXQPCJC.js";
import "./chunk-M2WBOQ2Q.js";

// ../producer/src/services/shaderTransitionWorker.ts
import { parentPort } from "worker_threads";
if (!parentPort) {
  console.warn("[shaderTransitionWorker] no parentPort; module loaded on main thread");
} else {
  parentPort.on("message", (msg) => {
    const { shader, bufferA, bufferB, output, width, height, progress } = msg;
    const bufA = Buffer.from(bufferA);
    const bufB = Buffer.from(bufferB);
    const out = Buffer.from(output);
    try {
      const fn = TRANSITIONS[shader] ?? crossfade;
      fn(bufA, bufB, out, width, height, progress);
      const reply = {
        ok: true,
        bufferA,
        bufferB,
        output
      };
      parentPort.postMessage(reply, [bufferA, bufferB, output]);
    } catch (err) {
      const reply = {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        bufferA,
        bufferB,
        output
      };
      parentPort.postMessage(reply, [bufferA, bufferB, output]);
    }
  });
}
