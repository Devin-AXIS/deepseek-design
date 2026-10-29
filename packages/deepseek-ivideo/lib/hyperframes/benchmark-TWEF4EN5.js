import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  loadProducer
} from "./chunk-AM7M3H6I.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import {
  errorBox,
  formatBytes,
  formatDuration
} from "./chunk-IHFUKJOR.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  ft
} from "./chunk-WMQNIQDJ.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import {
  fpsToFfmpegArg
} from "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/benchmark.ts
import { existsSync, statSync } from "fs";
import { resolve, join } from "path";
var examples = [
  ["Run benchmarks with default settings (3 runs)", "hyperframes benchmark"],
  ["Run 5 iterations per config", "hyperframes benchmark --runs 5"],
  ["Output results as JSON", "hyperframes benchmark --json"]
];
var FPS_30 = { num: 30, den: 1 };
var FPS_60 = { num: 60, den: 1 };
var DEFAULT_CONFIGS = [
  { label: "30fps \xB7 draft \xB7 2w", fps: FPS_30, quality: "draft", workers: 2 },
  { label: "30fps \xB7 standard \xB7 2w", fps: FPS_30, quality: "standard", workers: 2 },
  { label: "30fps \xB7 high \xB7 2w", fps: FPS_30, quality: "high", workers: 2 },
  { label: "30fps \xB7 standard \xB7 4w", fps: FPS_30, quality: "standard", workers: 4 },
  { label: "60fps \xB7 standard \xB7 4w", fps: FPS_60, quality: "standard", workers: 4 }
];
var benchmark_default = defineCommand({
  meta: {
    name: "benchmark",
    description: "Render with preset fps/quality/worker configs and compare speed and file size"
  },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    runs: { type: "string", description: "Number of runs per config", default: "3" },
    json: { type: "boolean", description: "Output results as JSON", default: false }
  },
  async run({ args }) {
    const project = resolveProject(args.dir);
    const runsPerConfig = parseInt(args.runs ?? "3", 10);
    if (isNaN(runsPerConfig) || runsPerConfig < 1 || runsPerConfig > 20) {
      errorBox("Invalid runs", `Got "${args.runs ?? "3"}". Must be between 1 and 20.`);
      failCommand();
    }
    const jsonOutput = args.json ?? false;
    const benchDir = resolve("renders", ".benchmark");
    let producer = null;
    try {
      producer = await loadProducer();
    } catch {
      if (jsonOutput) {
        console.log(
          JSON.stringify({ error: "Producer module not available. Is the project built?" })
        );
      } else {
        errorBox(
          "Producer module not available",
          "The rendering pipeline could not be loaded.",
          "Ensure @hyperframes/producer is built and linked."
        );
      }
      failCommand();
    }
    if (!jsonOutput) {
      console.log("");
      console.log(
        c.accent("\u25C6") + "  Benchmarking " + c.accent(project.name) + c.dim(` (${runsPerConfig} runs each)`)
      );
      console.log("");
    }
    const results = [];
    for (const config of DEFAULT_CONFIGS) {
      const runs = [];
      let failures = 0;
      const s = !jsonOutput ? ft() : void 0;
      s?.start(`Benchmarking ${config.label}...`);
      for (let i = 0; i < runsPerConfig; i++) {
        s?.message(`${config.label} \u2014 run ${i + 1}/${runsPerConfig}`);
        const outputPath = join(
          benchDir,
          `${config.label.replace(/[^a-zA-Z0-9]/g, "_")}_run${i}.mp4`
        );
        try {
          const startTime = Date.now();
          const job = producer.createRenderJob({
            fps: config.fps,
            quality: config.quality,
            workers: config.workers
          });
          await producer.executeRenderJob(job, project.dir, outputPath);
          const elapsedMs = Date.now() - startTime;
          let fileSize = null;
          if (existsSync(outputPath)) {
            const stat = statSync(outputPath);
            fileSize = stat.size;
          }
          runs.push({ elapsedMs, fileSize });
        } catch {
          failures++;
        }
      }
      s?.stop(`${config.label} \u2014 ${runs.length} runs${failures > 0 ? `, ${failures} failed` : ""}`);
      const successfulRuns = runs.filter((r) => r.elapsedMs > 0);
      const avgTime = successfulRuns.length > 0 ? successfulRuns.reduce((sum, r) => sum + r.elapsedMs, 0) / successfulRuns.length : null;
      const sizesWithValues = runs.map((r) => r.fileSize).filter((s2) => s2 != null);
      const avgSize = sizesWithValues.length > 0 ? sizesWithValues.reduce((sum, s2) => sum + s2, 0) / sizesWithValues.length : null;
      results.push({ config, runs, failures, avgTime, avgSize });
    }
    if (jsonOutput) {
      console.log(
        JSON.stringify(
          withMeta({
            results: results.map((r) => ({
              config: r.config.label,
              // Emit fps in the on-the-wire form so the JSON payload is
              // round-trippable through `parseFps` (e.g. "30000/1001" stays
              // exact; integer fps stays integer).
              fps: fpsToFfmpegArg(r.config.fps),
              quality: r.config.quality,
              workers: r.config.workers,
              avgTimeMs: r.avgTime,
              avgSizeBytes: r.avgSize,
              failures: r.failures,
              runs: r.runs
            }))
          }),
          null,
          2
        )
      );
      return;
    }
    const configColWidth = 26;
    const timeColWidth = 10;
    const sizeColWidth = 10;
    const header = "   " + c.bold("Config".padEnd(configColWidth)) + c.bold("Time".padEnd(timeColWidth)) + c.bold("Size".padEnd(sizeColWidth));
    const separator = "   " + c.dim("\u2500".repeat(configColWidth + timeColWidth + sizeColWidth));
    console.log(header);
    console.log(separator);
    for (const result of results) {
      const timeStr = result.avgTime != null ? formatDuration(result.avgTime) : c.dim("failed");
      const sizeStr = result.avgSize != null ? formatBytes(result.avgSize) : c.dim("n/a");
      const failStr = result.failures > 0 ? c.warn(` (${result.failures} failed)`) : "";
      console.log(
        "   " + result.config.label.padEnd(configColWidth) + timeStr.padEnd(timeColWidth) + sizeStr.padEnd(sizeColWidth) + failStr
      );
    }
    const successfulResults = results.filter((r) => r.avgTime != null);
    if (successfulResults.length > 0) {
      let fastest = successfulResults[0];
      for (const r of successfulResults) {
        if (fastest == null || r.avgTime == null) continue;
        if (fastest.avgTime == null || r.avgTime < fastest.avgTime) {
          fastest = r;
        }
      }
      if (fastest?.avgTime != null) {
        console.log("");
        console.log(
          c.success("\u25C7") + "  Fastest: " + c.accent(fastest.config.label) + c.dim(` (${formatDuration(fastest.avgTime)})`)
        );
      }
    } else {
      console.log("");
      console.log(
        c.error("\u2717") + "  All configurations failed. Ensure the rendering pipeline is set up."
      );
    }
    console.log("");
  }
});
export {
  benchmark_default as default,
  examples
};
