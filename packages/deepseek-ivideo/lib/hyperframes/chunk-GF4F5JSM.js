import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  trackLintReport,
  trackLintRuleStreak
} from "./chunk-D3TRQ4GS.js";
import {
  shouldTrack
} from "./chunk-UG7OZF2L.js";
import {
  LINT_RULE_COUNT,
  LINT_RULE_GROUP_COUNTS
} from "./chunk-LPWBWBT2.js";

// src/telemetry/lintStreaks.ts
import { createHash } from "crypto";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
var STATE_FILE = join(homedir(), ".hyperframes", "lint-streaks.json");
var UNRESOLVED_REPORT_AT = 3;
var ENTRY_TTL_MS = 14 * 24 * 60 * 60 * 1e3;
var MAX_TRACKED_FILES = 500;
function emptyState() {
  return { version: 1, files: {} };
}
function readState() {
  try {
    const parsed = JSON.parse(readFileSync(STATE_FILE, "utf-8"));
    if (typeof parsed === "object" && parsed !== null && parsed.version === 1 && typeof parsed.files === "object") {
      return parsed;
    }
  } catch {
  }
  return emptyState();
}
function writeState(state, now) {
  const entries = Object.entries(state.files).filter(([, entry]) => now - entry.updatedAt < ENTRY_TTL_MS).sort(([, a], [, b]) => b.updatedAt - a.updatedAt).slice(0, MAX_TRACKED_FILES);
  try {
    mkdirSync(join(homedir(), ".hyperframes"), { recursive: true });
    writeFileSync(
      STATE_FILE,
      JSON.stringify({ version: 1, files: Object.fromEntries(entries) }),
      "utf-8"
    );
  } catch {
  }
}
function fileKey(projectDir, file) {
  return createHash("sha256").update(`${projectDir}\0${file}`).digest("hex").slice(0, 16);
}
function recordLintRun(projectDir, results, now = Date.now()) {
  if (!shouldTrack()) return [];
  const state = readState();
  const events = [];
  for (const { file, contentHash, findings } of results) {
    const key = fileKey(projectDir, file);
    const previous = state.files[key];
    const severityByCode = firstSeverityPerCode(findings);
    const codes = !previous || previous.contentHash === contentHash ? carryForward(previous, severityByCode) : foldEdit(previous, severityByCode, events);
    state.files[key] = { contentHash, codes, updatedAt: now };
  }
  writeState(state, now);
  return events;
}
function firstSeverityPerCode(findings) {
  const severityByCode = /* @__PURE__ */ new Map();
  for (const finding of findings) {
    if (!severityByCode.has(finding.code)) severityByCode.set(finding.code, finding.severity);
  }
  return severityByCode;
}
function carryForward(previous, severityByCode) {
  const codes = {};
  for (const [code, severity] of severityByCode) {
    codes[code] = previous?.codes[code] ?? { edits: 0, reported: false, severity };
  }
  return codes;
}
function foldEdit(previous, severityByCode, events) {
  const codes = {};
  for (const [code, severity] of severityByCode) {
    const prior = previous.codes[code];
    if (!prior) {
      codes[code] = { edits: 0, reported: false, severity };
      continue;
    }
    const edits = prior.edits + 1;
    const shouldReport = !prior.reported && edits >= UNRESOLVED_REPORT_AT;
    if (shouldReport) events.push({ code, severity, edits, cleared: false });
    codes[code] = { edits, reported: prior.reported || shouldReport, severity };
  }
  for (const [code, prior] of Object.entries(previous.codes)) {
    if (severityByCode.has(code)) continue;
    events.push({ code, severity: prior.severity, edits: prior.edits + 1, cleared: true });
  }
  return codes;
}

// src/telemetry/lintRun.ts
function trackLintRun(projectDir, lintResult, options) {
  try {
    const runIdField = options.runId !== void 0 ? { runId: options.runId } : {};
    trackLintReport({
      command: options.command,
      durationMs: options.durationMs,
      filesScanned: lintResult.results.length,
      errorCount: lintResult.totalErrors,
      warningCount: lintResult.totalWarnings,
      infoCount: lintResult.totalInfos,
      ruleCount: LINT_RULE_COUNT,
      ruleGroupCounts: LINT_RULE_GROUP_COUNTS,
      ...summarize(lintResult),
      ...runIdField
    });
    const streaks = recordLintRun(
      projectDir,
      lintResult.results.map(({ file, contentHash, result }) => ({
        file,
        contentHash,
        findings: result.findings
      }))
    );
    for (const streak of streaks) {
      trackLintRuleStreak({ ...streak, command: options.command, ...runIdField });
    }
  } catch {
  }
}
function summarize(lintResult) {
  const codeCounts = {};
  const ruleGroupMs = {};
  let slowestRule = "";
  let slowestRuleMs = 0;
  for (const { result } of lintResult.results) {
    for (const finding of result.findings) {
      codeCounts[finding.code] = (codeCounts[finding.code] ?? 0) + 1;
    }
    const timings = result.timings;
    if (!timings) continue;
    for (const [group, ms] of Object.entries(timings.groupMs)) {
      ruleGroupMs[group] = (ruleGroupMs[group] ?? 0) + ms;
    }
    if (timings.slowestRuleMs > slowestRuleMs) {
      slowestRuleMs = timings.slowestRuleMs;
      slowestRule = timings.slowestRule;
    }
  }
  for (const group of Object.keys(ruleGroupMs)) {
    ruleGroupMs[group] = Math.round(ruleGroupMs[group]);
  }
  return { codeCounts, ruleGroupMs, slowestRule, slowestRuleMs };
}

export {
  trackLintRun
};
