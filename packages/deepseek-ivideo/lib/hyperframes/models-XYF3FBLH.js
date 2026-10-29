import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  formatBytes
} from "./chunk-IHFUKJOR.js";
import {
  createRenderCancellationScope
} from "./chunk-QPIYSFE4.js";
import {
  ft
} from "./chunk-WMQNIQDJ.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-LAOCA3MQ.js";
import "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  PARAKEET_MODEL_LABEL
} from "./chunk-KDPYVTEU.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/models.ts
var examples = [
  [
    "Download the Parakeet speech model that transcribe uses",
    "hyperframes models install parakeet"
  ]
];
function fail(message, json) {
  if (json) console.log(JSON.stringify({ ok: false, error: message }));
  else console.error(c.error(message));
  failCommand();
}
function reportCancel(json) {
  const message = "Parakeet install cancelled; nothing partial was kept.";
  if (json) console.log(JSON.stringify({ ok: false, error: message }));
  else console.error(c.warn(message));
  setCommandExitCode(130);
}
function downloadProgress(spin) {
  let lastPct = -1;
  return (done, total) => {
    const pct = Math.floor(done / total * 100);
    if (pct <= lastPct) return;
    lastPct = pct;
    spin?.message(
      `Downloading Parakeet TDT 0.6B v3 \u2014 ${c.progress(pct + "%")} ${c.dim("(" + formatBytes(done) + " / " + formatBytes(total) + ")")}`
    );
  };
}
async function installMissing(sherpa, spin, signal) {
  const runtime = await sherpa.installSherpaRuntime({ signal });
  spin?.message("Verifying the Parakeet model...");
  const modelFetched = await sherpa.ensureParakeetModel({
    signal,
    onBytes: downloadProgress(spin)
  });
  return { changed: runtime.installed || modelFetched, runtimePath: runtime.runtimePath };
}
var wasCancelled = (err, signal, sherpa) => signal.aborted || err instanceof sherpa.DecodeCancelled;
async function installParakeet(json) {
  const sherpa = await import("./sherpa-LCYCZKZD.js");
  const unsupported = sherpa.sherpaUnsupportedReason();
  if (unsupported) fail(unsupported, json);
  const spin = json ? null : ft({ output: process.stderr });
  const cancellation = createRenderCancellationScope();
  spin?.start("Checking the sherpa-onnx runtime (installing it from npm if it does not load)...");
  try {
    const { changed, runtimePath } = await installMissing(sherpa, spin, cancellation.signal);
    spin?.stop(c.success(changed ? "Parakeet installed" : "Parakeet is already installed"));
    if (json) {
      const { SHERPA_RUNTIME_DIR: runtimeDir, PARAKEET_MODEL_DIR: modelDir } = sherpa;
      console.log(
        JSON.stringify({
          ok: true,
          model: PARAKEET_MODEL_LABEL,
          changed,
          runtimeDir,
          runtimePath,
          modelDir
        })
      );
    }
  } catch (err) {
    const cancelled = wasCancelled(err, cancellation.signal, sherpa);
    spin?.stop(
      cancelled ? c.warn("Parakeet install cancelled") : c.error("Parakeet install failed")
    );
    if (cancelled) return reportCancel(json);
    fail(err instanceof Error ? err.message : String(err), json);
  } finally {
    cancellation.dispose();
  }
}
var models_default = defineCommand({
  meta: { name: "models", description: "Download on-device models (models install parakeet)" },
  args: {
    action: { type: "positional", description: "install", required: true },
    name: { type: "positional", description: "Model to install: parakeet", required: true },
    json: { type: "boolean", description: "Print one JSON result, no progress", default: false }
  },
  async run({ args }) {
    if (args.action !== "install" || args.name !== "parakeet") {
      fail(
        `Unknown: models ${args.action} ${args.name}. Try: hyperframes models install parakeet`,
        args.json
      );
    }
    return installParakeet(args.json);
  }
});
export {
  models_default as default,
  examples
};
