import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/utils/lintFormat.ts
function formatLintFindings({ results, totalErrors, totalWarnings, totalInfos }, options = {}) {
  const {
    showElementId = true,
    showSummary = false,
    errorsFirst = false,
    verbose = false
  } = options;
  const lines = [];
  const multiFile = results.length > 1;
  for (const { file, result } of results) {
    if (result.findings.length === 0) continue;
    const format = (finding) => {
      if (!verbose && finding.severity === "info") return;
      const prefix = finding.severity === "error" ? c.error("\u2717") : finding.severity === "warning" ? c.warn("\u26A0") : c.dim("\u2139");
      const fileLabel = findingFileLabel(file, finding, multiFile);
      const loc = showElementId && finding.elementId ? ` ${c.accent(`[${finding.elementId}]`)}` : "";
      lines.push(`  ${prefix} ${fileLabel}${c.bold(finding.code)}${loc}: ${finding.message}`);
      if (finding.fixHint) lines.push(`    ${c.dim(`Fix: ${finding.fixHint}`)}`);
    };
    if (errorsFirst) {
      for (const f of result.findings) if (f.severity === "error") format(f);
      for (const f of result.findings) if (f.severity === "warning") format(f);
      if (verbose) {
        for (const f of result.findings) if (f.severity === "info") format(f);
      }
    } else {
      for (const f of result.findings) format(f);
    }
  }
  if (showSummary) {
    const icon = totalErrors > 0 ? c.error("\u25C7") : c.success("\u25C7");
    lines.push("");
    lines.push(`${icon}  ${formatLintCounts(totalErrors, totalWarnings, totalInfos, verbose)}`);
  }
  return lines;
}
function formatLintCounts(totalErrors, totalWarnings, totalInfos, verbose) {
  const parts = [`${totalErrors} error(s)`, `${totalWarnings} warning(s)`];
  if (verbose && totalInfos > 0) parts.push(`${totalInfos} info(s)`);
  return parts.join(", ");
}
function formatLintStartupMessage(lintResult, mode) {
  if (mode.kind === "verbose") return formatLintFindings(lintResult, mode.options);
  const counts = formatLintCounts(lintResult.totalErrors, lintResult.totalWarnings, 0, false);
  const hint = mode.pointer === "studio" ? "see the Lint badge in Studio, or run `hyperframes lint` for full output" : "run with --lint-verbose for full output";
  return [`  Lint: ${counts} \u2014 ${hint}.`];
}
function findingFileLabel(file, finding, multiFile) {
  if (finding.line === void 0) return multiFile ? c.dim(`[${file}] `) : "";
  const column = finding.column === void 0 ? "" : `:${finding.column}`;
  return c.dim(`[${finding.file ?? file}:${finding.line}${column}] `);
}

export {
  formatLintFindings,
  formatLintStartupMessage
};
