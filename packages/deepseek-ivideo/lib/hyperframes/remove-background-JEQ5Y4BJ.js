import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  DEFAULT_QUALITY,
  QUALITIES,
  isQuality
} from "./chunk-PLQNUQVT.js";
import "./chunk-3DKN5WKL.js";
import {
  DEVICES,
  isDevice
} from "./chunk-2NCHQUPX.js";
import "./chunk-6BEFEWFB.js";
import "./chunk-WCJGTLPF.js";
import {
  ft
} from "./chunk-WMQNIQDJ.js";
import "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand
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
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/remove-background.ts
import { resolve } from "path";
import { existsSync } from "fs";
var examples = [
  [
    "Remove background from a video, output transparent VP9 WebM (default)",
    "hyperframes remove-background avatar.mp4 -o transparent.webm"
  ],
  [
    "Output ProRes 4444 .mov for editing round-trip",
    "hyperframes remove-background avatar.mp4 -o transparent.mov"
  ],
  [
    "Remove background from a single image, output transparent PNG",
    "hyperframes remove-background portrait.jpg -o cutout.png"
  ],
  [
    "Separate the layers \u2014 emit both the cutout and an inverse-alpha background plate (subject region transparent)",
    "hyperframes remove-background avatar.mp4 -o subject.webm --background-output plate.webm"
  ],
  [
    "Force CPU (skip CoreML/CUDA)",
    "hyperframes remove-background avatar.mp4 -o transparent.webm --device cpu"
  ],
  [
    "Smaller file at the cost of color match (text-behind-subject won't blend as cleanly)",
    "hyperframes remove-background avatar.mp4 -o transparent.webm --quality fast"
  ],
  [
    "Visually-lossless WebM (master / re-encode source)",
    "hyperframes remove-background avatar.mp4 -o transparent.webm --quality best"
  ],
  ["Show detected providers without rendering", "hyperframes remove-background --info"]
];
var remove_background_default = defineCommand({
  meta: {
    name: "remove-background",
    description: "Remove background from a video or image using a local AI model \u2014 outputs transparent WebM, ProRes 4444, or PNG"
  },
  args: {
    input: {
      type: "positional",
      description: "Source video (.mp4/.mov/.webm/.mkv) or image (.jpg/.png/.webp)",
      required: false
    },
    output: {
      type: "string",
      description: "Output path. Format inferred from extension: .webm (default), .mov, .png",
      alias: "o"
    },
    "background-output": {
      type: "string",
      description: "Optional second output path for the inverse-alpha background plate (subject region transparent, original surroundings opaque). Hole-cut, not inpainted \u2014 composite something underneath to fill the hole. Must be .webm or .mov; not allowed for image inputs.",
      alias: "b"
    },
    device: {
      type: "string",
      description: `Execution provider: ${DEVICES.join(", ")}`,
      default: "auto"
    },
    quality: {
      type: "string",
      description: `Encoder quality preset for .webm output: ${QUALITIES.join(", ")} (default: ${DEFAULT_QUALITY}). Higher quality = closer color match when overlaying on the source mp4, larger file. Ignored for .mov / .png.`,
      default: DEFAULT_QUALITY
    },
    info: {
      type: "boolean",
      description: "Print detected execution providers and exit (no render)",
      default: false
    },
    json: {
      type: "boolean",
      description: "Output result as JSON",
      default: false
    }
  },
  async run({ args }) {
    if (args.info) {
      return showInfo(args.json);
    }
    if (!args.input) {
      console.error(
        c.error(
          "Input file is required. Run `hyperframes remove-background --info` for providers."
        )
      );
      failCommand();
    }
    if (!args.output) {
      console.error(c.error("--output (-o) is required. Use a .webm, .mov, or .png path."));
      failCommand();
    }
    if (!isDevice(args.device)) {
      console.error(
        c.error(`Invalid --device '${String(args.device)}'. Use: ${DEVICES.join(", ")}.`)
      );
      failCommand();
    }
    if (!isQuality(args.quality)) {
      console.error(
        c.error(`Invalid --quality '${String(args.quality)}'. Use: ${QUALITIES.join(", ")}.`)
      );
      failCommand();
    }
    const inputPath = resolve(args.input);
    const outputPath = resolve(args.output);
    const backgroundOutputArg = args["background-output"];
    const backgroundOutputPath = backgroundOutputArg ? resolve(backgroundOutputArg) : void 0;
    const { render } = await import("./pipeline-CDFHTKYZ.js");
    const spin = args.json ? null : ft();
    spin?.start("Preparing background-removal pipeline...");
    try {
      const result = await render({
        inputPath,
        outputPath,
        backgroundOutputPath,
        device: args.device,
        quality: args.quality,
        onProgress: (event) => {
          if (event.kind === "info") {
            spin?.message(event.message);
          } else if (event.kind === "metadata") {
            const dims = `${event.width}\xD7${event.height}`;
            const frames = event.frameCount ? ` \xB7 ${event.frameCount} frames` : "";
            spin?.message(`Source ${dims} @ ${event.fps.toFixed(0)}fps${frames}`);
          } else if (event.kind === "frame") {
            const pct = event.total ? ` (${Math.floor(100 * event.index / event.total)}%)` : "";
            spin?.message(
              `Frame ${event.index}${event.total ? `/${event.total}` : ""}${pct} \u2014 ${Math.round(event.avgMsPerFrame)}ms/frame avg`
            );
          }
        }
      });
      if (args.json) {
        console.log(
          JSON.stringify({
            ok: true,
            outputPath: result.outputPath,
            ...result.backgroundOutputPath ? { backgroundOutputPath: result.backgroundOutputPath } : {},
            framesProcessed: result.framesProcessed,
            durationSeconds: Number(result.durationSeconds.toFixed(2)),
            avgMsPerFrame: Number(result.avgMsPerFrame.toFixed(1)),
            provider: result.provider,
            format: result.format
          })
        );
      } else {
        const fpsThroughput = result.durationSeconds ? (result.framesProcessed / result.durationSeconds).toFixed(1) : "n/a";
        const outputs = result.backgroundOutputPath ? `${c.accent(result.outputPath)} + ${c.accent(result.backgroundOutputPath)}` : c.accent(result.outputPath);
        spin?.stop(
          c.success(
            `Removed background from ${c.accent(String(result.framesProcessed))} frames in ${result.durationSeconds.toFixed(1)}s (${fpsThroughput} fps, ${c.accent(result.provider)}) \u2192 ${outputs}`
          )
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (args.json) {
        console.log(JSON.stringify({ ok: false, error: message }));
      } else {
        spin?.stop(c.error(`Background removal failed: ${message}`));
      }
      failCommand(1, err);
    }
  }
});
async function showInfo(json) {
  const { selectProviders, listAvailableProviders, DEFAULT_MODEL, MODEL_MEMORY_MB, modelPath } = await import("./manager-524RPYO7.js");
  const providers = listAvailableProviders();
  const auto = selectProviders("auto");
  const cached = existsSync(modelPath());
  if (json) {
    console.log(
      JSON.stringify({
        defaultModel: DEFAULT_MODEL,
        modelCached: cached,
        modelPath: modelPath(),
        peakMemoryMb: MODEL_MEMORY_MB[DEFAULT_MODEL],
        availableProviders: providers,
        autoProvider: auto.label
      })
    );
    return;
  }
  console.log(c.bold("hyperframes remove-background \u2014 system info"));
  console.log("");
  console.log(`  ${c.dim("Default model:")}     ${c.accent(DEFAULT_MODEL)}`);
  console.log(`  ${c.dim("Peak memory:")}       ~${MODEL_MEMORY_MB[DEFAULT_MODEL]} MB`);
  console.log(
    `  ${c.dim("Weights cached:")}    ${cached ? c.success("yes") : c.dim("no (will download on first run)")}`
  );
  console.log(`  ${c.dim("Cache path:")}        ${modelPath()}`);
  console.log("");
  console.log(`  ${c.dim("Available providers:")} ${providers.join(", ")}`);
  console.log(`  ${c.dim("Auto-selected:")}      ${c.accent(auto.label)}`);
}
export {
  remove_background_default as default,
  examples
};
