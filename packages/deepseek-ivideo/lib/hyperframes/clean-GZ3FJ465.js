import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  redactHome
} from "./chunk-CWSBMTYS.js";
import "./chunk-5ETJX6WM.js";
import "./chunk-YWFRK7NU.js";
import {
  loadProducer
} from "./chunk-AM7M3H6I.js";
import {
  formatBytes
} from "./chunk-IHFUKJOR.js";
import "./chunk-3DKN5WKL.js";
import "./chunk-BZIGYBUM.js";
import "./chunk-R2DYALSM.js";
import {
  DEFAULT_HISTORY_ROOT,
  listProjectHistories,
  pruneGoneProjectHistories
} from "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import {
  CACHE_DIR_NAME,
  cleanupProxyCache
} from "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-6BEFEWFB.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-OLJM7Q7L.js";
import "./chunk-GQJZORQP.js";
import "./chunk-TVCRUG2S.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
import {
  EXTRACT_CACHE_MIN_AGE_MS,
  directorySizeBytes,
  gcExtractionCache,
  resolveExtractCacheDir
} from "./chunk-3NHZZLH3.js";
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
import "./chunk-GOPKWMQZ.js";
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
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/clean.ts
import { existsSync, readFileSync, realpathSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";
var examples = [
  ["See what HyperFrames left on disk, remove nothing", "hyperframes clean --dry-run"],
  ["Remove it", "hyperframes clean"],
  ["Also remove snapshot folders", "hyperframes clean --snapshots"],
  ["For agents", "hyperframes clean --json"]
];
var OWNERLESS_IDLE_MS = 6 * 60 * 60 * 1e3;
var PROXY_IDLE_MS = 60 * 60 * 1e3;
function recordError(sweep, error) {
  sweep.result.errors.push(error instanceof Error ? error.message : String(error));
}
async function attempt(sweep, step) {
  try {
    await step();
  } catch (error) {
    recordError(sweep, error);
  }
}
function isProject(dir) {
  try {
    return readFileSync(join(dir, "index.html"), "utf-8").includes("data-composition-id");
  } catch {
    return false;
  }
}
function realDir(dir) {
  try {
    return realpathSync(dir);
  } catch {
    return resolve(dir);
  }
}
function knownProjectDirs(sweep, historyRoot) {
  try {
    return listProjectHistories(historyRoot).map((record) => record.projectDir);
  } catch (error) {
    recordError(sweep, error);
    return [];
  }
}
function drop(sweep, what, path) {
  const bytes = directorySizeBytes(path);
  try {
    if (!sweep.dryRun)
      rmSync(path, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    sweep.result.removed.push({ what, path, bytes });
  } catch (error) {
    recordError(sweep, error);
  }
}
function sweepProxies(sweep, project) {
  const proxies = join(project, CACHE_DIR_NAME);
  const swept = cleanupProxyCache(proxies, {
    maxBytes: Number.POSITIVE_INFINITY,
    maxIdleMs: PROXY_IDLE_MS,
    minSweepIntervalMs: 0,
    dryRun: sweep.dryRun
  });
  if (swept.removed.length === 0) return;
  sweep.result.removed.push({
    what: "Video proxies",
    path: proxies,
    bytes: swept.bytesBefore - swept.bytesAfter
  });
}
function sweepSnapshots(sweep, project, remove) {
  const snapshots = join(project, "snapshots");
  if (!existsSync(snapshots)) return;
  if (remove) drop(sweep, "Snapshots", snapshots);
  else
    sweep.result.alsoReclaimable.push({
      what: "Snapshots",
      path: snapshots,
      bytes: directorySizeBytes(snapshots)
    });
}
async function sweepHistories(sweep, historyRoot, tempDir) {
  const pruned = await pruneGoneProjectHistories(historyRoot, {
    dryRun: sweep.dryRun,
    onError: (error) => recordError(sweep, error),
    tempDir
  });
  for (const history of pruned) {
    sweep.result.removed.push({
      what: "Project history",
      path: join(historyRoot, history.id),
      bytes: history.bytes
    });
  }
}
function sweepExtractCache(sweep) {
  const extractCache = resolveExtractCacheDir().dir;
  if (!extractCache) return;
  const swept = gcExtractionCache(extractCache, {
    maxBytes: 0,
    minAgeMs: EXTRACT_CACHE_MIN_AGE_MS,
    dryRun: sweep.dryRun
  });
  if (swept.evictedEntries + swept.agedPartialsRemoved === 0) return;
  sweep.result.removed.push({
    what: "Extracted video frames",
    path: extractCache,
    bytes: swept.evictedBytes
  });
}
async function cleanLeftovers(options) {
  const historyRoot = options.historyRoot ?? DEFAULT_HISTORY_ROOT;
  const tempDir = options.tempDir ?? tmpdir();
  const { RENDER_JOB_DIR, listAbandonedRenderDirs, resolveRenderDebugDir } = await loadProducer();
  const sweep = {
    dryRun: options.dryRun,
    result: { removed: [], alsoReclaimable: [], errors: [] }
  };
  const dropAbandoned = (what, parent, names) => {
    for (const dir of listAbandonedRenderDirs(parent, {
      ownerlessIdleMs: OWNERLESS_IDLE_MS,
      names
    }))
      drop(sweep, what, dir);
  };
  const projects = new Set(
    [options.projectDir, ...knownProjectDirs(sweep, historyRoot)].map(realDir)
  );
  const renderParents = /* @__PURE__ */ new Set([
    ...[...projects].flatMap((project) => [project, join(project, "renders")]),
    realDir(tempDir)
  ]);
  for (const parent of renderParents) dropAbandoned("Render leftovers", parent);
  dropAbandoned("Debug renders", options.debugDir ?? resolveRenderDebugDir(), RENDER_JOB_DIR);
  for (const project of projects) {
    if (!isProject(project)) continue;
    await attempt(sweep, () => sweepProxies(sweep, project));
    sweepSnapshots(sweep, project, options.snapshots);
  }
  await attempt(sweep, () => sweepHistories(sweep, historyRoot, tempDir));
  await attempt(sweep, () => sweepExtractCache(sweep));
  return sweep.result;
}
function printTable(rows) {
  const whatWidth = Math.max(...rows.map((row) => row.what.length));
  for (const row of rows) {
    console.log(
      `  ${row.what.padEnd(whatWidth)}  ${formatBytes(row.bytes).padStart(9)}  ${c.dim(row.path)}`
    );
  }
}
var total = (rows) => rows.reduce((sum, row) => sum + row.bytes, 0);
var redactPaths = (rows) => rows.map((row) => ({ ...row, path: redactHome(row.path) }));
var clean_default = defineCommand({
  meta: { name: "clean", description: "Find and remove what HyperFrames left on disk" },
  args: {
    dir: {
      type: "positional",
      description: "Project directory (default: current); its subfolders are not searched",
      required: false
    },
    "dry-run": {
      type: "boolean",
      description: "List what would be removed, remove nothing",
      default: false
    },
    snapshots: { type: "boolean", description: "Also remove snapshots/ folders", default: false },
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  async run({ args }) {
    const dryRun = args["dry-run"];
    const result = await cleanLeftovers({
      projectDir: args.dir ?? process.cwd(),
      dryRun,
      snapshots: args.snapshots
    });
    if (result.errors.length > 0) setCommandExitCode(1);
    if (args.json) {
      const report = withMeta({
        dryRun,
        removed: redactPaths(result.removed),
        alsoReclaimable: redactPaths(result.alsoReclaimable),
        errors: result.errors.map(redactHome),
        totalBytes: total(result.removed)
      });
      console.log(JSON.stringify(report, null, 2));
      return;
    }
    if (result.removed.length === 0) {
      console.log(`${c.success("\u25C7")}  Nothing to clean`);
    } else {
      console.log(
        `${c.success("\u25C7")}  ${dryRun ? "Would remove" : "Removed"} ${formatBytes(total(result.removed))}`
      );
      printTable(result.removed);
    }
    if (result.alsoReclaimable.length > 0) {
      console.log(
        `
   Also reclaimable with --snapshots: ${formatBytes(total(result.alsoReclaimable))}`
      );
      printTable(result.alsoReclaimable);
    }
    for (const error of result.errors) console.log(c.warn(`  ${error}`));
  }
});
export {
  cleanLeftovers,
  clean_default as default,
  examples
};
