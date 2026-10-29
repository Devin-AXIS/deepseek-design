import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  parseCaptureDeadline
} from "./chunk-UYEZTK4U.js";
import {
  diag
} from "./chunk-VWG7OQKU.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/capture.ts
import { resolve } from "path";
var CAPTURE_PHASE_PREFIX = "HYPERFRAMES_CAPTURE_PHASE ";
function emitCapturePhase(event) {
  diag.notice(`${CAPTURE_PHASE_PREFIX}${JSON.stringify(event)}`);
}
function parseCaptureBudget(raw) {
  if (raw === void 0) return void 0;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    console.error("--capture-budget must be a positive integer in milliseconds.");
    failCommand();
  }
  return parsed;
}
var examples = [
  ["Capture a website into ./capture/", "hyperframes capture https://stripe.com"],
  ["Capture to a different directory", "hyperframes capture https://linear.app -o linear-video"],
  ["JSON output for AI agents", "hyperframes capture https://example.com --json"],
  [
    "Pull a video from the captured manifest by index",
    "hyperframes capture --video ./linear-video --index 0"
  ],
  [
    "List videos referenced in the captured manifest",
    "hyperframes capture --video ./linear-video --list"
  ]
];
var capture_default = defineCommand({
  meta: {
    name: "capture",
    description: "Capture a website as editable HyperFrames components"
  },
  args: {
    url: {
      type: "positional",
      description: "Website URL to capture (omit when using --video)",
      required: false
    },
    output: {
      type: "string",
      description: "Output directory name (default: ./capture, then ./capture-2/, ./capture-3/, \u2026)",
      alias: "o"
    },
    "skip-assets": {
      type: "boolean",
      description: "Skip downloading assets (images, SVGs)",
      default: false
    },
    "skip-vision": {
      type: "boolean",
      description: "Skip optional AI image captioning",
      default: false
    },
    "max-screenshots": {
      type: "string",
      description: "Maximum screenshots to capture (default: 24)"
    },
    timeout: {
      type: "string",
      description: "Page load timeout in ms (default: 120000)"
    },
    "capture-budget": {
      type: "string",
      description: "Cooperative post-navigation budget in ms (default: 120000), separate from page-load --timeout; not a hard wall-clock timeout and cannot interrupt already-started native/core work"
    },
    json: {
      type: "boolean",
      description: "Output JSON (for AI agents / programmatic use)",
      default: false
    },
    video: {
      type: "string",
      description: "Switch to video-download mode: path to a captured project directory whose video-manifest.json should be read. Pair with --index, --video-url, or --list."
    },
    index: {
      type: "string",
      description: "(--video mode) Manifest entry index to download (0-based)"
    },
    "video-url": {
      type: "string",
      description: "(--video mode) Exact video URL to download (must match a manifest entry)"
    },
    list: {
      type: "boolean",
      description: "(--video mode) List manifest entries and exit",
      default: false
    }
  },
  // fallow-ignore-next-line complexity
  async run({ args }) {
    if (args.video) {
      const { runVideoMode } = await import("./video-IZ4WM36T.js");
      await runVideoMode({
        project: args.video,
        index: args.index ?? null,
        url: args["video-url"] ?? null,
        list: args.list
      });
      return;
    }
    const url = args.url;
    if (!url) {
      console.error(
        "Missing URL. Pass a website URL, or use --video <project> for video download."
      );
      failCommand();
    }
    try {
      new URL(url);
    } catch {
      console.error(`Invalid URL: ${url}`);
      failCommand();
    }
    const captureBudgetMs = parseCaptureBudget(args["capture-budget"]);
    const isDefaultOutput = !args.output;
    let outputName = args.output ?? "capture";
    let outputDir = resolve(outputName);
    if (isDefaultOutput) {
      const { existsSync } = await import("fs");
      let n = 2;
      while (existsSync(outputDir) && n < 100) {
        outputName = `capture-${n}`;
        outputDir = resolve(outputName);
        n++;
      }
      if (existsSync(outputDir)) {
        console.error(`./capture-{2..99} are all taken. Pass -o <name> to pick a directory.`);
        failCommand();
      }
    }
    const isJson = args.json;
    if (!isJson) {
      const { c } = await import("./colors-HKWSZCGK.js");
      console.log();
      console.log(c.dim("\u25C6") + "  Capturing " + c.bold(url));
      if (isDefaultOutput && outputName !== "capture") {
        console.log(`  ${c.dim(`(./capture/ exists; writing to ./${outputName}/)`)}`);
      }
      console.log();
    }
    const { captureWebsite } = await import("./capture-5MAUWMQS.js");
    try {
      const result = await captureWebsite(
        {
          url,
          outputDir,
          skipAssets: args["skip-assets"],
          skipVision: args["skip-vision"],
          maxScreenshots: args["max-screenshots"] ? parseInt(args["max-screenshots"]) : void 0,
          timeout: args.timeout ? parseInt(args.timeout) : void 0,
          postNavigationBudgetMs: captureBudgetMs,
          captureDeadlineMs: parseCaptureDeadline(process.env.HYPERFRAMES_CAPTURE_DEADLINE_MS),
          json: isJson,
          onPhase: emitCapturePhase
        },
        isJson ? void 0 : (stage, detail) => {
          const stages = {
            browser: "  Launching browser...",
            navigate: "  Loading page...",
            extract: "  Extracting HTML & CSS...",
            tokens: "  Extracting design tokens...",
            screenshots: "  Capturing screenshots...",
            assets: "  Downloading assets...",
            style: "  Generating visual style...",
            done: "  Done"
          };
          const label = stages[stage] || `  ${stage}`;
          console.log(detail ? `${label} ${detail}` : label);
        }
      );
      if (isJson) {
        console.log(
          JSON.stringify(
            {
              ok: result.ok,
              projectDir: result.projectDir,
              url: result.url,
              // Reported beside `ok`, because they answer different questions: a capture of an
              // error page is `ok: true` with a status the caller has to see to know it.
              httpStatus: result.httpStatus,
              title: result.title,
              screenshots: result.screenshots.length,
              assets: result.assets.length,
              dropped: result.dropped,
              detectedSections: result.tokens.sections.length,
              fonts: result.tokens.fonts.map((f) => f.family),
              fontsDetailed: result.tokens.fonts,
              animations: result.animationCatalog?.summary,
              warnings: result.warnings,
              lastPhase: result.lastPhase
            },
            null,
            2
          )
        );
      } else {
        const { c } = await import("./colors-HKWSZCGK.js");
        console.log();
        console.log(c.success("\u25C7") + `  Captured ${c.bold(result.title)} \u2192 ${c.dim(outputDir)}`);
        console.log();
        console.log(`  ${c.dim("Screenshots:")} ${result.screenshots.length}`);
        console.log(`  ${c.dim("Assets:")} ${result.assets.length}`);
        const droppedTotal = Object.values(result.dropped).reduce((sum, n) => sum + n, 0);
        if (droppedTotal > 0) {
          const breakdown = Object.entries(result.dropped).filter(function(entry) {
            return entry[1] > 0;
          }).map(function(entry) {
            return entry[1] + " " + entry[0];
          }).join(", ");
          console.log(`  ${c.dim("Dropped:")} ${droppedTotal} (${breakdown})`);
        }
        console.log(`  ${c.dim("Sections:")} ${result.tokens.sections.length}`);
        console.log(
          `  ${c.dim("Fonts:")} ${result.tokens.fonts.map(function(f) {
            return f.family + " (" + (f.variable && f.weightRange ? f.weightRange[0] + "-" + f.weightRange[1] + " variable" : f.weights.join(",")) + ")";
          }).join(", ")}`
        );
        if (result.warnings.length > 0) {
          console.log();
          for (const w of result.warnings) {
            console.log(`  ${c.warn("\u26A0")} ${w}`);
          }
        }
        console.log();
      }
    } catch (err) {
      const errMsg = normalizeErrorMessage(err);
      try {
        const { mkdirSync } = await import("fs");
        const { formatCaptureFailureReason } = await import("./captureTimeout-PA4FYWT5.js");
        const { writeCaptureFileSync } = await import("./captureFile-LYOJOUIE.js");
        mkdirSync(outputDir, { recursive: true });
        const reason = formatCaptureFailureReason(errMsg);
        writeCaptureFileSync(
          `${outputDir}/BLOCKED.md`,
          `# Capture Failed

${reason}

URL: ${url}

## What to try

- Re-run with a longer timeout: \`--timeout 60000\`
- The site may block headless browsers (anti-bot protection)
- Try capturing a different page on the same domain
`,
          "utf-8"
        );
      } catch {
      }
      if (isJson) {
        console.log(JSON.stringify({ ok: false, error: errMsg }));
      } else {
        console.error(`
  \u2717 Capture failed: ${errMsg}
`);
      }
      failCommand();
    }
  }
});
export {
  capture_default as default,
  examples
};
