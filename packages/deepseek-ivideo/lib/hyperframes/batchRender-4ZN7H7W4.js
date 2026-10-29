import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  loadProjectVariableSchema,
  reportVariableIssues,
  validateVariablesAgainstSchema
} from "./chunk-6RZ4BVBM.js";
import "./chunk-PFCFR3KZ.js";
import {
  errorBox
} from "./chunk-IHFUKJOR.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/batchRender.ts
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve, sep } from "path";
var BatchRenderInputError = class extends Error {
  title;
  hint;
  constructor(title, message, hint) {
    super(message);
    this.name = "BatchRenderInputError";
    this.title = title;
    this.hint = hint;
  }
};
var PLACEHOLDER_RE = /\{([A-Za-z0-9_.-]+)\}/g;
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function parseJson(raw, source) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new BatchRenderInputError("Invalid JSON in --batch", `${source}: ${normalizeErrorMessage(error)}`);
  }
}
function parseBatchRows(raw, source) {
  const parsed = parseJson(raw, source);
  const rows = Array.isArray(parsed) ? parsed : isRecord(parsed) ? parsed.rows : void 0;
  if (!Array.isArray(rows)) {
    throw new BatchRenderInputError(
      "Invalid batch payload",
      '--batch must be a JSON array of objects, or an object with a "rows" array.'
    );
  }
  if (rows.length === 0) {
    throw new BatchRenderInputError("Empty batch", `${source} contains zero rows.`);
  }
  return rows.map((row, index) => {
    if (!isRecord(row)) {
      throw new BatchRenderInputError(
        "Invalid batch row",
        `Row ${index} must be a JSON object of variable values.`
      );
    }
    return row;
  });
}
function placeholderValue(row, key, index) {
  if (key === "index") return String(index);
  if (!Object.hasOwn(row, key)) {
    throw new BatchRenderInputError(
      "Invalid output template",
      `Missing value for placeholder {${key}} in row ${index}.`
    );
  }
  const value = row[key];
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  throw new BatchRenderInputError(
    "Invalid output template",
    `Placeholder {${key}} in row ${index} must resolve to a string, number, or boolean.`
  );
}
function resolveOutputTemplate(template, row, index) {
  return template.replace(
    PLACEHOLDER_RE,
    (_match, key) => placeholderValue(row, key, index)
  );
}
function isSameOrChildPath(path, parent) {
  return path === parent || path.startsWith(parent.endsWith(sep) ? parent : parent + sep);
}
function commonOutputDirectory(outputPaths) {
  const firstPath = outputPaths[0];
  if (!firstPath) return resolve("renders");
  let common = dirname(firstPath);
  for (const outputPath of outputPaths.slice(1)) {
    const dir = dirname(outputPath);
    while (!isSameOrChildPath(dir, common)) {
      const parent = dirname(common);
      if (parent === common) return common;
      common = parent;
    }
  }
  return common;
}
function checkOutputCollisions(rows, manifestPath) {
  const seen = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const previous = seen.get(row.outputPath);
    if (previous !== void 0) {
      throw new BatchRenderInputError(
        "Batch output collision",
        `Rows ${previous} and ${row.index} both resolve to ${row.outputPath}.`,
        "Use placeholders such as {index} or a unique row key in --output."
      );
    }
    if (row.outputPath === manifestPath) {
      throw new BatchRenderInputError(
        "Batch output collision",
        `Row ${row.index} resolves to the manifest path: ${manifestPath}.`
      );
    }
    seen.set(row.outputPath, row.index);
  }
}
function validateBatchVariables(rows, indexPath, strictVariables, quiet, json) {
  const schema = loadProjectVariableSchema(indexPath);
  let issueCount = 0;
  const strictRows = [];
  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    if (!row || Object.keys(row).length === 0) continue;
    const rowIssueCount = reportBatchVariableIssues(row, index, schema, quiet, json);
    if (rowIssueCount === 0) continue;
    issueCount += rowIssueCount;
    if (strictVariables) strictRows.push(index);
  }
  if (strictRows.length > 0) {
    throw new BatchRenderInputError(
      "Variable validation failed",
      `Aborting batch due to variable issues in row ${strictRows.join(", ")} (--strict-variables mode).`
    );
  }
  return issueCount;
}
function reportBatchVariableIssues(row, index, schema, quiet, json) {
  const issues = validateVariablesAgainstSchema(row, schema);
  if (issues.length === 0) return 0;
  if (!quiet && !json) {
    console.log("");
    console.log(c.dim(`Batch row ${index}:`));
  }
  reportVariableIssues(issues, { strict: false, quiet: quiet || json });
  return issues.length;
}
function prepareBatchRender(options) {
  const batchPath = resolve(options.batchPath);
  const read = options.readFile ?? ((path) => readFileSync(path, "utf8"));
  let raw;
  try {
    raw = read(batchPath);
  } catch (error) {
    throw new BatchRenderInputError(
      "Could not read --batch",
      `${batchPath}: ${normalizeErrorMessage(error)}`
    );
  }
  const variableRows = parseBatchRows(raw, batchPath);
  const rows = variableRows.map((variables, index) => ({
    index,
    variables,
    outputPath: resolve(resolveOutputTemplate(options.outputTemplate, variables, index))
  }));
  const manifestPath = join(
    commonOutputDirectory(rows.map((row) => row.outputPath)),
    "manifest.json"
  );
  checkOutputCollisions(rows, manifestPath);
  const variableIssueCount = validateBatchVariables(
    variableRows,
    options.indexPath,
    options.strictVariables,
    options.quiet,
    options.json
  );
  return {
    batchPath,
    manifestPath,
    variableIssueCount,
    rows
  };
}
function makeInitialManifest(prepared) {
  return {
    version: 1,
    batchPath: prepared.batchPath,
    manifestPath: prepared.manifestPath,
    total: prepared.rows.length,
    completed: 0,
    failed: 0,
    skipped: 0,
    rows: prepared.rows.map((row) => ({
      index: row.index,
      outputPath: row.outputPath,
      status: "pending",
      durationMs: null,
      renderTimeMs: null,
      error: null,
      startedAt: null,
      completedAt: null,
      variables: row.variables
    }))
  };
}
function summarizeManifest(manifest) {
  manifest.completed = manifest.rows.filter((row) => row.status === "completed").length;
  manifest.failed = manifest.rows.filter((row) => row.status === "failed").length;
  manifest.skipped = manifest.rows.filter((row) => row.status === "skipped").length;
}
function writeManifest(manifest) {
  summarizeManifest(manifest);
  mkdirSync(dirname(manifest.manifestPath), { recursive: true });
  writeFileSync(manifest.manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}
async function renderBatchRow(row, manifest, options) {
  const manifestRow = manifest.rows[row.index];
  if (!manifestRow) {
    throw new Error(`Batch manifest is missing row ${row.index}`);
  }
  manifestRow.status = "running";
  manifestRow.startedAt = (/* @__PURE__ */ new Date()).toISOString();
  writeManifest(manifest);
  if (!options.quiet && !options.json) {
    console.log(c.dim(`Batch row ${row.index}: ${row.outputPath}`));
  }
  try {
    mkdirSync(dirname(row.outputPath), { recursive: true });
    const result = await options.renderOne(row);
    manifestRow.status = "completed";
    manifestRow.durationMs = result.durationMs ?? null;
    manifestRow.renderTimeMs = result.renderTimeMs;
    manifestRow.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    writeManifest(manifest);
    return true;
  } catch (error) {
    manifestRow.status = "failed";
    manifestRow.error = normalizeErrorMessage(error);
    manifestRow.completedAt = (/* @__PURE__ */ new Date()).toISOString();
    writeManifest(manifest);
    if (!options.quiet && !options.json) {
      console.log(c.error(`  Row ${row.index} failed: ${manifestRow.error}`));
    }
    return false;
  }
}
function markUnstartedRowsSkipped(manifest) {
  for (const row of manifest.rows) {
    if (row.status !== "pending") continue;
    row.status = "skipped";
    row.error = "Skipped after --batch-fail-fast.";
    row.completedAt = (/* @__PURE__ */ new Date()).toISOString();
  }
}
async function runBatchRender(options) {
  if (options.concurrency < 1) {
    throw new BatchRenderInputError(
      "Invalid batch-concurrency",
      `Got "${options.concurrency}". Must be a positive integer.`
    );
  }
  const manifest = makeInitialManifest(options.prepared);
  writeManifest(manifest);
  if (!options.quiet && !options.json) {
    console.log("");
    console.log(
      c.accent("\u25C6") + `  Batch rendering ${options.prepared.rows.length} rows` + c.dim(` \u2192 ${options.prepared.manifestPath}`)
    );
    console.log(c.dim(`   batch concurrency: ${options.concurrency}`));
    console.log("");
  }
  let cursor = 0;
  let stopLaunching = false;
  const workerCount = Math.min(options.concurrency, options.prepared.rows.length);
  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (!stopLaunching) {
        const row = options.prepared.rows[cursor];
        if (!row) return;
        cursor++;
        const ok = await renderBatchRow(row, manifest, options);
        if (!ok && options.failFast) {
          stopLaunching = true;
        }
      }
    })
  );
  if (stopLaunching) markUnstartedRowsSkipped(manifest);
  writeManifest(manifest);
  if (options.json) {
    console.log(
      JSON.stringify({
        type: "batch-complete",
        manifestPath: manifest.manifestPath,
        total: manifest.total,
        completed: manifest.completed,
        failed: manifest.failed,
        skipped: manifest.skipped,
        rows: manifest.rows
      })
    );
  }
  if (!options.quiet && !options.json) {
    console.log("");
    console.log(
      manifest.failed > 0 ? c.warn(
        `Batch complete: ${manifest.completed} completed, ${manifest.failed} failed, ${manifest.skipped} skipped.`
      ) : c.success(`Batch complete: ${manifest.completed} completed.`)
    );
    console.log(c.dim(`Manifest: ${manifest.manifestPath}`));
  }
  return manifest;
}
function exitBatchRenderInputError(error) {
  if (error instanceof BatchRenderInputError) {
    errorBox(error.title, error.message, error.hint);
    failCommand();
  }
  throw error;
}
export {
  BatchRenderInputError,
  exitBatchRenderInputError,
  parseBatchRows,
  prepareBatchRender,
  resolveOutputTemplate,
  runBatchRender
};
