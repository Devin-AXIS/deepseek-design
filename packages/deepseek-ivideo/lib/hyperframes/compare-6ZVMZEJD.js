import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  createContactSheet
} from "./chunk-E6RPWJVC.js";
import "./chunk-MRF4AMKD.js";
import {
  displayPathFromInput,
  readOptionalString,
  resolveFromBase
} from "./chunk-ZKDMAOFU.js";
import {
  serveStaticProjectHtml
} from "./chunk-UQR6E2MI.js";
import {
  openSettledCompositionPage,
  seekCompositionTimeline
} from "./chunk-RYA6RITK.js";
import "./chunk-KXH7PX6M.js";
import "./chunk-I2GLM53A.js";
import "./chunk-P6P3EIWV.js";
import "./chunk-PFF75FSN.js";
import "./chunk-PFCFR3KZ.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-XUHOIDKG.js";
import "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-UITPTRCM.js";
import "./chunk-OLJM7Q7L.js";
import {
  trackCompareSheet
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
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
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/compare.ts
import { cpSync, existsSync, mkdirSync, mkdtempSync, renameSync, rmSync, statSync } from "fs";
import { tmpdir } from "os";
import { basename, dirname, extname, join } from "path";
var MAX_COMPARE_VARIANTS = 16;
var MAX_COLUMNS = 4;
var DEFAULT_RENDER_READY_TIMEOUT_MS = 5e3;
var examples = [
  [
    "Compare two agent-authored composition variants",
    "hyperframes compare ./variants/a ./variants/b --out compare.png"
  ],
  [
    "Compare three variants at a specific timeline time",
    "hyperframes compare ./a ./b ./c --at 2.5 --labels classic,bold,quiet --json"
  ]
];
function defaultLabelForPath(input) {
  const name = basename(input);
  return extname(name).toLowerCase() === ".html" ? basename(name, extname(name)) : name;
}
function parsePathArgs(args) {
  return (args._ ?? []).filter((value) => typeof value === "string").map((value) => value.trim()).filter(Boolean);
}
function parseLabels(value, pathCount) {
  const raw = readOptionalString(value);
  if (!raw) return void 0;
  const labels = raw.split(",").map((part) => part.trim());
  if (labels.some((label) => label.length === 0)) {
    throw new Error("--labels entries must be non-empty");
  }
  if (labels.length !== pathCount) {
    throw new Error(`--labels count (${labels.length}) must match path count (${pathCount})`);
  }
  return labels;
}
function parseAtSeconds(value) {
  const raw = readOptionalString(value);
  if (!raw) return 0;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error("--at must be a non-negative number of seconds");
  }
  return parsed;
}
function parseColumns(value) {
  const raw = readOptionalString(value);
  if (!raw) return void 0;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error("--cols must be a positive integer");
  }
  return parsed;
}
function defaultCompareCols(cellCount) {
  return Math.max(1, Math.min(MAX_COLUMNS, Math.ceil(Math.sqrt(cellCount))));
}
function parseCompareArgs(args, cwd = process.cwd()) {
  const paths = parsePathArgs(args);
  if (paths.length < 2) {
    throw new Error("need 2+ paths to compare");
  }
  const labels = parseLabels(args.labels, paths.length);
  const variants = paths.map((input, index) => ({
    label: labels?.[index] ?? defaultLabelForPath(input),
    inputPath: resolveFromBase(cwd, input),
    displayPath: displayPathFromInput(cwd, input)
  }));
  return {
    variants,
    outPath: resolveFromBase(cwd, readOptionalString(args.out) ?? "compare.png"),
    atSeconds: parseAtSeconds(args.at),
    cols: parseColumns(args.cols),
    json: args.json === true,
    timeoutMs: Number.parseInt(readOptionalString(args.timeout) ?? "", 10) || DEFAULT_RENDER_READY_TIMEOUT_MS
  };
}
function capCompareVariants(variants) {
  const total = variants.length;
  if (total <= MAX_COMPARE_VARIANTS) {
    return { variants: [...variants], truncated: false, total };
  }
  console.error(
    c.warn(
      `Warning: ${total} compare variants exceed the ${MAX_COMPARE_VARIANTS}-variant cap \u2014 rendering the first ${MAX_COMPARE_VARIANTS} of ${total}; re-run with fewer variants or split into multiple runs.`
    )
  );
  return {
    variants: variants.slice(0, MAX_COMPARE_VARIANTS),
    truncated: true,
    total
  };
}
function buildCompareSuccessPayload(sheet, variants, capResult) {
  const payload = {
    ok: true,
    sheet,
    variants: variants.map((variant) => ({
      label: variant.label,
      path: variant.displayPath
    })),
    rendered: variants.length
  };
  if (capResult.truncated) {
    payload.truncated = true;
    payload.total = capResult.total;
  }
  return payload;
}
function inputError(variant) {
  return new Error(
    `Variant "${variant.label}" is not a composition input (${variant.displayPath}): expected a directory containing index.html or a .html file`
  );
}
function stageHtmlVariant(variant) {
  const stagedDir = mkdtempSync(join(tmpdir(), "hf-compare-variant-"));
  try {
    cpSync(dirname(variant.inputPath), stagedDir, {
      recursive: true,
      filter: (src) => {
        const base = basename(src);
        return base !== "node_modules" && base !== ".git";
      }
    });
    const sourceName = basename(variant.inputPath);
    if (sourceName !== "index.html") {
      renameSync(join(stagedDir, sourceName), join(stagedDir, "index.html"));
    }
    return {
      ...variant,
      projectDir: stagedDir,
      stagedDir
    };
  } catch (err) {
    rmSync(stagedDir, { recursive: true, force: true });
    throw err;
  }
}
function prepareCompareVariantProjects(variants) {
  const prepared = [];
  try {
    for (const variant of variants) {
      if (!existsSync(variant.inputPath)) {
        throw inputError(variant);
      }
      const stat = statSync(variant.inputPath);
      if (stat.isDirectory() && existsSync(join(variant.inputPath, "index.html"))) {
        prepared.push({
          ...variant,
          projectDir: variant.inputPath
        });
        continue;
      }
      if (stat.isFile() && extname(variant.inputPath).toLowerCase() === ".html") {
        prepared.push(stageHtmlVariant(variant));
        continue;
      }
      throw inputError(variant);
    }
    return prepared;
  } catch (err) {
    for (const variant of prepared) {
      if (variant.stagedDir) {
        rmSync(variant.stagedDir, { recursive: true, force: true });
      }
    }
    throw err;
  }
}
function cleanupPreparedCompareVariants(variants) {
  for (const variant of variants) {
    if (variant.stagedDir) {
      rmSync(variant.stagedDir, { recursive: true, force: true });
    }
  }
}
async function renderCompareVariant(variant, opts) {
  try {
    const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
    const html = await bundleToSingleHtml(variant.projectDir);
    const server = await serveStaticProjectHtml(variant.projectDir, html);
    try {
      const {
        browser: chromeBrowser,
        page,
        renderReadyTimedOut
      } = await openSettledCompositionPage(html, server.url, {
        renderReadyTimeoutMs: opts.timeoutMs,
        renderReadyWarningSuffix: `comparison variant "${variant.label}" may be inaccurate`
      });
      try {
        if (opts.atSeconds > 0) {
          await seekCompositionTimeline(page, opts.atSeconds);
        }
        await page.screenshot({ path: opts.framePath, type: "png" });
        return { framePath: opts.framePath, renderReadyTimedOut };
      } finally {
        await chromeBrowser.close();
      }
    } finally {
      await server.close();
    }
  } catch (err) {
    throw new Error(
      `Render failed for variant "${variant.label}" (${variant.displayPath}): ${normalizeErrorMessage(err)}`
    );
  }
}
async function renderCompareSheet(parsed) {
  const capResult = capCompareVariants(parsed.variants);
  const variants = capResult.variants;
  const prepared = prepareCompareVariantProjects(variants);
  const frameDir = mkdtempSync(join(tmpdir(), "hf-compare-frames-"));
  const framePaths = [];
  try {
    let renderReadyTimedOut = false;
    for (let i = 0; i < prepared.length; i++) {
      const variant = prepared[i];
      const framePath = join(frameDir, `variant-${String(i + 1).padStart(2, "0")}.png`);
      const rendered = await renderCompareVariant(variant, {
        atSeconds: parsed.atSeconds,
        framePath,
        timeoutMs: parsed.timeoutMs
      });
      framePaths.push(rendered.framePath);
      renderReadyTimedOut = renderReadyTimedOut || rendered.renderReadyTimedOut;
    }
    mkdirSync(dirname(parsed.outPath), { recursive: true });
    await createContactSheet(framePaths, parsed.outPath, {
      cols: parsed.cols ?? defaultCompareCols(framePaths.length),
      maxImages: framePaths.length,
      labelMode: "custom",
      labels: variants.map((variant) => variant.label)
    });
    trackCompareSheet({
      command: "compare",
      cells: variants.length,
      truncated: capResult.truncated,
      total: capResult.total,
      renderReadyTimedOut
    });
    return buildCompareSuccessPayload(parsed.outPath, variants, capResult);
  } finally {
    cleanupPreparedCompareVariants(prepared);
    rmSync(frameDir, { recursive: true, force: true });
  }
}
function printJson(payload) {
  console.log(JSON.stringify(withMeta(payload), null, 2));
}
var compare_default = defineCommand({
  meta: {
    name: "compare",
    description: "Render independent composition variants into one labeled comparison sheet"
  },
  args: {
    path: {
      type: "positional",
      description: "Composition project directory or .html file (pass 2+ paths)",
      required: false
    },
    at: {
      type: "string",
      description: "Timeline time in seconds to seek before screenshotting each variant"
    },
    labels: {
      type: "string",
      description: "Comma-separated labels matching the variant path count"
    },
    out: {
      type: "string",
      description: "Output comparison sheet path (default: ./compare.png)"
    },
    cols: {
      type: "string",
      description: "Grid columns (default: sqrt heuristic, capped at 4)"
    },
    timeout: {
      type: "string",
      description: "Render-ready timeout in ms per variant (default: 5000)"
    },
    json: {
      type: "boolean",
      description: "Output result as JSON",
      default: false
    }
  },
  async run({ args }) {
    const jsonRequested = args.json === true;
    try {
      const parsed = parseCompareArgs(args);
      if (!parsed.json) {
        console.log(
          `${c.accent("\u25C6")}  Rendering ${Math.min(parsed.variants.length, MAX_COMPARE_VARIANTS)} of ${parsed.variants.length} composition variants`
        );
      }
      const payload = await renderCompareSheet(parsed);
      if (parsed.json) {
        printJson(payload);
      } else {
        console.log(`
${c.success("\u25C7")}  Comparison sheet saved to ${payload.sheet}`);
      }
    } catch (err) {
      const message = normalizeErrorMessage(err);
      if (jsonRequested) {
        printJson({ ok: false, error: message });
      } else {
        console.error(`
${c.error("\u2717")} Compare failed: ${message}`);
      }
      failCommand();
    }
  }
});
export {
  buildCompareSuccessPayload,
  capCompareVariants,
  compare_default as default,
  examples,
  parseCompareArgs,
  prepareCompareVariantProjects
};
