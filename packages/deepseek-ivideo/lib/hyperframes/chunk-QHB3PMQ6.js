import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  serveStaticProjectHtml
} from "./chunk-UQR6E2MI.js";
import {
  AUDIT_SEEK_OPTIONS,
  installPageFunctionGuard,
  seekCompositionTimeline,
  waitForCompositionFonts,
  waitForRuntimeReady
} from "./chunk-RYA6RITK.js";
import {
  launchManagedBrowser,
  resolveManagedGpuMode
} from "./chunk-KXH7PX6M.js";
import {
  resolveDiagnosticNavigationTimeoutMs
} from "./chunk-I2GLM53A.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import {
  printDeprecationNotice,
  withMeta
} from "./chunk-5FABXOBL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/commands/layout.ts
import { existsSync as existsSync2, readFileSync as readFileSync2 } from "fs";
import { dirname, join as join2 } from "path";
import { fileURLToPath } from "url";

// src/utils/layoutAudit.ts
function buildLayoutSampleTimes({ duration, samples, at }) {
  if (at?.length) {
    return uniqueSortedTimes(
      at.filter(
        (time) => Number.isFinite(time) && time >= 0 && (duration <= 0 || time <= duration)
      )
    );
  }
  if (!Number.isFinite(duration) || duration <= 0 || samples <= 0) return [];
  const count = Math.max(1, Math.floor(samples));
  return Array.from({ length: count }, (_, index) => roundTime((index + 0.5) / count * duration));
}
function summarizeLayoutIssues(issues) {
  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;
  const infoCount = issues.filter((issue) => issue.severity === "info").length;
  return {
    ok: errorCount === 0,
    errorCount,
    warningCount,
    infoCount,
    issueCount: issues.length
  };
}
function formatLayoutIssue(issue) {
  const timeLabel = issue.occurrences && issue.occurrences > 1 ? `t=${formatNumber(issue.firstSeen ?? issue.time)}-${formatNumber(issue.lastSeen ?? issue.time)}s (${issue.occurrences} samples)` : `t=${formatNumber(issue.time)}s`;
  const parts = [
    timeLabel,
    issue.code,
    issue.selector,
    issue.containerSelector ? `inside ${issue.containerSelector}` : "",
    issue.overflow ? `overflowed ${formatOverflow(issue.overflow)}` : "",
    issue.text ? quoteText(issue.text) : ""
  ].filter(Boolean);
  const line = `${parts.join(" ")} \u2014 ${issue.message}`;
  return issue.fixHint ? `${line}
    Fix: ${issue.fixHint}` : line;
}
function dedupeLayoutIssues(issues) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const issue of issues) {
    const key = [
      issue.code,
      issue.severity,
      issue.time.toFixed(3),
      issue.selector,
      issue.containerSelector ?? "",
      issue.text ?? "",
      issue.overflow ? formatOverflow(issue.overflow) : "",
      framePositionKey(issue)
    ].join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(issue);
  }
  return result;
}
var CONTENT_OVERLAP_HELD_ERROR_MS = 500;
var HELD_ACROSS_SAMPLES_MIN_OCCURRENCES = 2;
var PERSISTENCE_TIERED_CODES = /* @__PURE__ */ new Set([
  "text_box_overflow",
  "clipped_text",
  "canvas_overflow",
  "container_overflow",
  "content_overlap",
  "text_occluded",
  "escaped_container",
  "panel_out_of_canvas",
  "canvas_content_at_edge",
  "connector_detached",
  "connector_orphan"
]);
var CONTIGUOUS_SAMPLE_GAP_MS = CONTENT_OVERLAP_HELD_ERROR_MS * 2;
var TEXT_AGNOSTIC_KEY_CODES = /* @__PURE__ */ new Set([
  "content_overlap",
  "text_occluded"
]);
function collapseStaticLayoutIssues(issues, totalSampleCount) {
  const groups = /* @__PURE__ */ new Map();
  for (const issue of issues) {
    const key = staticIssueKey(issue);
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, {
        issue,
        firstSeen: issue.time,
        lastSeen: issue.time,
        occurrences: 1,
        times: [issue.time]
      });
      continue;
    }
    existing.firstSeen = Math.min(existing.firstSeen, issue.time);
    existing.lastSeen = Math.max(existing.lastSeen, issue.time);
    existing.occurrences += 1;
    existing.times.push(issue.time);
  }
  const sampleCount = totalSampleCount ?? new Set(issues.map((issue) => issue.time)).size;
  const multiSampleRun = sampleCount > 1;
  return [...groups.values()].map(
    ({ issue, firstSeen, lastSeen, occurrences, times }) => applyPersistenceTier(
      {
        ...issue,
        time: firstSeen,
        firstSeen,
        lastSeen,
        occurrences,
        heldMs: longestContiguousRunMs(times)
      },
      multiSampleRun
    )
  );
}
function longestContiguousRunMs(times) {
  const sorted = [...new Set(times)].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted.at(-1);
  if (first === void 0 || last === void 0) return 0;
  let longest = 0;
  let runStart = first;
  let previous = first;
  for (const current of sorted) {
    if ((current - previous) * 1e3 > CONTIGUOUS_SAMPLE_GAP_MS) {
      longest = Math.max(longest, previous - runStart);
      runStart = current;
    }
    previous = current;
  }
  return Math.max(longest, last - runStart) * 1e3;
}
function applyPersistenceTier(issue, multiSampleRun) {
  if (!multiSampleRun) return issue;
  if (!PERSISTENCE_TIERED_CODES.has(issue.code)) return issue;
  const occurrences = issue.occurrences ?? 1;
  if (occurrences <= 1) {
    return { ...issue, severity: "info" };
  }
  if (issue.code === "content_overlap" && isContentOverlapHeldLongEnough(issue, occurrences)) {
    return { ...issue, severity: "error" };
  }
  if (issue.code === "canvas_overflow" && isCanvasBreachHeldLarge(issue, occurrences)) {
    return { ...issue, severity: "warning" };
  }
  return issue;
}
function isCanvasBreachHeldLarge(issue, occurrences) {
  if (occurrences < HELD_ACROSS_SAMPLES_MIN_OCCURRENCES || !issue.overflow || !issue.containerRect) {
    return false;
  }
  const breach = Math.max(
    ...Object.values(issue.overflow).filter((value) => typeof value === "number")
  );
  if (breach < Math.min(issue.containerRect.width, issue.containerRect.height) * 0.05) return false;
  const container = issue.containerRect;
  const overlapX = Math.min(issue.rect.right, container.right) - Math.max(issue.rect.left, container.left);
  const overlapY = Math.min(issue.rect.bottom, container.bottom) - Math.max(issue.rect.top, container.top);
  return overlapX > 0 && overlapY > 0;
}
function isContentOverlapHeldLongEnough(issue, occurrences) {
  if (occurrences < HELD_ACROSS_SAMPLES_MIN_OCCURRENCES) return false;
  const firstSeen = issue.firstSeen ?? issue.time;
  const lastSeen = issue.lastSeen ?? issue.time;
  const heldMs = issue.heldMs ?? (lastSeen - firstSeen) * 1e3;
  return heldMs >= CONTENT_OVERLAP_HELD_ERROR_MS;
}
function limitLayoutIssues(issues, maxIssues) {
  const limit = Math.max(1, Math.floor(maxIssues));
  const sortedIssues = [...issues].sort((a, b) => {
    const severityDelta = severityRank(a.severity) - severityRank(b.severity);
    if (severityDelta !== 0) return severityDelta;
    return a.time - b.time;
  });
  return {
    issues: sortedIssues.slice(0, limit),
    totalIssueCount: issues.length,
    truncated: issues.length > limit
  };
}
function severityRank(severity) {
  if (severity === "error") return 0;
  if (severity === "warning") return 1;
  return 2;
}
function staticIssueKey(issue) {
  return [
    issue.code,
    issue.severity,
    issue.selector,
    issue.containerSelector ?? "",
    TEXT_AGNOSTIC_KEY_CODES.has(issue.code) ? "" : issue.text ?? "",
    issue.overflow ? formatOverflow(issue.overflow) : "",
    framePositionKey(issue)
  ].join("|");
}
function framePositionKey(issue) {
  return issue.code === "frame_out_of_frame" || issue.code === "connector_detached" || issue.code === "connector_orphan" ? `${Math.round(issue.rect.left)},${Math.round(issue.rect.top)}` : "";
}
function uniqueSortedTimes(times) {
  const rounded = times.map(roundTime);
  return [...new Set(rounded)].sort((a, b) => a - b);
}
function buildTransitionSampleTimes({
  duration,
  boundaries,
  cap
}) {
  if (!Number.isFinite(duration) || duration <= 0) return { times: [], dropped: 0 };
  const inRange = uniqueSortedTimes(
    boundaries.filter((time) => Number.isFinite(time) && time >= 0 && time <= duration)
  );
  const withMidpoints = [...inRange];
  for (let i = 0; i < inRange.length - 1; i++) {
    const current = inRange[i];
    const next = inRange[i + 1];
    if (current === void 0 || next === void 0) continue;
    withMidpoints.push(roundTime((current + next) / 2));
  }
  const merged = uniqueSortedTimes(withMidpoints);
  if (cap === void 0 || merged.length <= Math.max(2, cap)) {
    return { times: merged, dropped: 0 };
  }
  const limit = Math.max(2, cap);
  const strided = [];
  for (let i = 0; i < limit; i++) {
    const pick = merged[Math.floor(i * (merged.length - 1) / (limit - 1))];
    if (pick !== void 0) strided.push(pick);
  }
  const times = uniqueSortedTimes(strided);
  return { times, dropped: merged.length - times.length };
}
function mergeSampleTimes(...lists) {
  return uniqueSortedTimes(lists.flat());
}
function formatOverflow(overflow) {
  return ["left", "right", "top", "bottom"].flatMap((side) => {
    const value = overflow[side];
    return value == null ? [] : `${side} ${formatNumber(value)}px`;
  }).join(", ");
}
function quoteText(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const truncated = normalized.length > 80 ? `${normalized.slice(0, 77)}...` : normalized;
  return `"${truncated}"`;
}
function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}
function roundTime(value) {
  return Math.round(value * 1e3) / 1e3;
}

// src/utils/motionAudit.ts
var APPEAR_OPACITY = 0.5;
var FRAME_TOLERANCE = 1;
var DEFAULT_MAX_STATIC_SEC = 2;
var ZERO_RECT = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
function ambiguousIssue(selector) {
  return {
    code: "motion_selector_ambiguous",
    severity: "error",
    time: 0,
    selector,
    message: `${selector} matches multiple elements \u2014 use a more specific selector so the assertion targets exactly one.`,
    rect: ZERO_RECT,
    fixHint: "Use #id or :nth-child() instead of a class selector when multiple elements share the same class."
  };
}
function round(value) {
  return Math.round(value * 100) / 100;
}
function everMatched(frames, selector) {
  return frames.some((frame) => frame.data[selector] != null);
}
function firstAppear(frames, selector) {
  for (const frame of frames) {
    const sample = frame.data[selector];
    if (sample && sample.visible && sample.opacity >= APPEAR_OPACITY) {
      return { time: frame.time, rect: sample.rect };
    }
  }
  return null;
}
function missingIssue(selector, time) {
  return {
    code: "motion_selector_missing",
    severity: "error",
    time,
    selector,
    message: `${selector} matched no element in any sampled frame \u2014 check the selector`,
    rect: ZERO_RECT,
    fixHint: "Verify the selector exists in the composition and is spelled correctly."
  };
}
function appearsBy(frames, selector, bySec) {
  if (!everMatched(frames, selector)) return [missingIssue(selector, 0)];
  const appear = firstAppear(frames, selector);
  if (appear && appear.time <= bySec) return [];
  return [
    {
      code: "motion_appears_late",
      severity: "error",
      time: appear ? appear.time : bySec,
      selector,
      message: appear ? `appears at ${round(appear.time)}s but should be visible by ${round(bySec)}s (check its entrance reveal fires under seek)` : `never reaches visible opacity but should be visible by ${round(bySec)}s (check its entrance reveal fires under seek)`,
      rect: appear ? appear.rect : ZERO_RECT,
      fixHint: "The renderer seeks a paused timeline; a forward-only reveal can be skipped. Ensure the entrance is applied at this time, not only played through."
    }
  ];
}
function before(frames, a, b) {
  const issues = [];
  if (!everMatched(frames, a)) issues.push(missingIssue(a, 0));
  if (!everMatched(frames, b)) issues.push(missingIssue(b, 0));
  if (issues.length > 0) return issues;
  const appearA = firstAppear(frames, a);
  const appearB = firstAppear(frames, b);
  const timeA = appearA ? appearA.time : Number.POSITIVE_INFINITY;
  const timeB = appearB ? appearB.time : Number.POSITIVE_INFINITY;
  if (timeA < timeB) return [];
  const label = (t) => Number.isFinite(t) ? `${round(t)}s` : "never";
  return [
    {
      code: "motion_out_of_order",
      severity: "error",
      time: Number.isFinite(timeA) ? timeA : 0,
      selector: a,
      message: `${a} should appear before ${b}, but ${a} appears at ${label(timeA)} and ${b} at ${label(timeB)} \u2014 reorder the entrances`,
      rect: appearA ? appearA.rect : ZERO_RECT,
      fixHint: `Make ${a}'s entrance land before ${b}'s on the timeline.`
    }
  ];
}
function isOffFrame(r, canvas) {
  return r.left < -FRAME_TOLERANCE || r.top < -FRAME_TOLERANCE || r.right > canvas.width + FRAME_TOLERANCE || r.bottom > canvas.height + FRAME_TOLERANCE;
}
function staysInFrame(frames, selector, canvas) {
  if (!everMatched(frames, selector)) return [missingIssue(selector, 0)];
  const appear = firstAppear(frames, selector);
  if (!appear) return [];
  for (const frame of frames) {
    const sample = frame.data[selector];
    if (frame.time < appear.time || !sample || !sample.visible) continue;
    if (!isOffFrame(sample.rect, canvas)) continue;
    const r = sample.rect;
    return [
      {
        code: "motion_off_frame",
        severity: "error",
        time: frame.time,
        selector,
        message: `${selector} drifts off the ${canvas.width}\xD7${canvas.height} canvas at ${round(frame.time)}s (box ${r.left},${r.top}\u2192${r.right},${r.bottom})`,
        rect: r,
        fixHint: "Clamp the element's motion so its box stays within the canvas for the whole shot."
      }
    ];
  }
  return [];
}
function keepsMoving(frames, within, maxStaticSec) {
  const scope = within ?? "*";
  if (within && frames.every((frame) => !frame.liveness[scope])) {
    return [missingIssue(within, 0)];
  }
  const issues = [];
  const first = frames[0];
  if (!first) return issues;
  let runStart = first.time;
  let runSig = first.liveness[scope] ?? "";
  const flush = (endTime) => {
    const span = endTime - runStart;
    if (span > maxStaticSec) {
      issues.push({
        code: "motion_frozen",
        severity: "error",
        time: runStart,
        selector: within ?? "composition",
        message: `nothing moves${within ? ` within ${within}` : ""} between ${round(runStart)}s and ${round(endTime)}s (${round(span)}s static) \u2014 should keep moving`,
        rect: ZERO_RECT,
        fixHint: "Add or extend motion so no shot freezes for this long, or shorten the static hold."
      });
    }
  };
  let lastTime = runStart;
  for (const frame of frames.slice(1)) {
    lastTime = frame.time;
    const sig = frame.liveness[scope] ?? "";
    if (sig !== runSig) {
      flush(frame.time);
      runStart = frame.time;
      runSig = sig;
    }
  }
  flush(lastTime);
  return issues;
}
function evaluateMotion(frames, assertions, canvas) {
  if (frames.length === 0) return [];
  return assertions.flatMap((assertion) => {
    switch (assertion.kind) {
      case "appearsBy":
        return appearsBy(frames, assertion.selector, assertion.bySec);
      case "before":
        return before(frames, assertion.a, assertion.b);
      case "staysInFrame":
        return staysInFrame(frames, assertion.selector, canvas);
      case "keepsMoving":
        return keepsMoving(
          frames,
          assertion.withinSelector,
          assertion.maxStaticSec ?? DEFAULT_MAX_STATIC_SEC
        );
    }
  });
}
function assertionTargets(assertion) {
  switch (assertion.kind) {
    case "appearsBy":
    case "staysInFrame":
      return { selectors: [assertion.selector], scopes: [] };
    case "before":
      return { selectors: [assertion.a, assertion.b], scopes: [] };
    case "keepsMoving":
      return { selectors: [], scopes: [assertion.withinSelector ?? "*"] };
    default: {
      const exhaustive = assertion;
      void exhaustive;
      return { selectors: [], scopes: [] };
    }
  }
}
function collectSamplingTargets(assertions) {
  const selectors = /* @__PURE__ */ new Set();
  const scopes = /* @__PURE__ */ new Set();
  for (const assertion of assertions) {
    const targets = assertionTargets(assertion);
    for (const selector of targets.selectors) selectors.add(selector);
    for (const scope of targets.scopes) scopes.add(scope);
  }
  return { selectors: [...selectors], livenessScopes: [...scopes] };
}

// src/utils/motionSpec.ts
import { existsSync, readFileSync, readdirSync } from "fs";
import { basename, join } from "path";
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isSelector(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function isPositive(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
var VALIDATORS = {
  appearsBy: (raw, at) => {
    if (!isSelector(raw.selector))
      return `${at} (appearsBy): "selector" must be a non-empty string`;
    if (typeof raw.bySec !== "number" || !Number.isFinite(raw.bySec) || raw.bySec < 0)
      return `${at} (appearsBy): "bySec" must be a number >= 0`;
    return { kind: "appearsBy", selector: raw.selector, bySec: raw.bySec };
  },
  before: (raw, at) => {
    if (!isSelector(raw.a)) return `${at} (before): "a" must be a non-empty string`;
    if (!isSelector(raw.b)) return `${at} (before): "b" must be a non-empty string`;
    return { kind: "before", a: raw.a, b: raw.b };
  },
  staysInFrame: (raw, at) => {
    if (!isSelector(raw.selector))
      return `${at} (staysInFrame): "selector" must be a non-empty string`;
    return { kind: "staysInFrame", selector: raw.selector };
  },
  keepsMoving: (raw, at) => {
    if (raw.withinSelector !== void 0 && !isSelector(raw.withinSelector))
      return `${at} (keepsMoving): "withinSelector" must be a non-empty string when present`;
    if (raw.withinSelector === "*")
      return `${at} (keepsMoving): "withinSelector" cannot be "*" \u2014 omit it for whole-composition liveness`;
    if (raw.maxStaticSec !== void 0 && !isPositive(raw.maxStaticSec))
      return `${at} (keepsMoving): "maxStaticSec" must be a number > 0 when present`;
    const assertion = { kind: "keepsMoving" };
    if (isSelector(raw.withinSelector)) assertion.withinSelector = raw.withinSelector;
    if (isPositive(raw.maxStaticSec)) assertion.maxStaticSec = raw.maxStaticSec;
    return assertion;
  }
};
function validateAssertion(raw, index) {
  const at = `assertions[${index}]`;
  if (!isObject(raw)) return `${at}: must be an object`;
  const validator = typeof raw.kind === "string" ? VALIDATORS[raw.kind] : void 0;
  if (!validator) return `${at}: unknown assertion kind ${JSON.stringify(raw.kind)}`;
  return validator(raw, at);
}
function parseMotionSpec(raw) {
  if (!isObject(raw)) return { ok: false, errors: ["spec must be a JSON object"] };
  if (raw.version !== void 0 && raw.version !== 1)
    return {
      ok: false,
      errors: [`spec version ${raw.version} is not supported \u2014 upgrade the hyperframes CLI`]
    };
  if (!Array.isArray(raw.assertions))
    return { ok: false, errors: ['spec must have an "assertions" array'] };
  if (raw.duration !== void 0 && (typeof raw.duration !== "number" || !Number.isFinite(raw.duration) || raw.duration <= 0))
    return { ok: false, errors: ['"duration" must be a positive number when present'] };
  const assertions = [];
  const errors = [];
  raw.assertions.forEach((entry, index) => {
    const result = validateAssertion(entry, index);
    if (typeof result === "string") errors.push(result);
    else assertions.push(result);
  });
  if (errors.length > 0) return { ok: false, errors };
  if (assertions.length === 0) return { ok: false, errors: ["spec has no assertions"] };
  const spec = { assertions };
  if (typeof raw.duration === "number") spec.duration = raw.duration;
  return { ok: true, spec };
}
function findMotionSpec(projectDir) {
  if (!existsSync(projectDir)) return null;
  const entries = readdirSync(projectDir);
  const sidecars = entries.filter((name) => name.endsWith(".motion.json")).sort();
  if (!sidecars[0]) return null;
  if (sidecars.length === 1) return join(projectDir, sidecars[0]);
  const htmlBases = new Set(
    entries.filter((name) => name.endsWith(".html")).map((name) => basename(name, ".html"))
  );
  const matched = sidecars.filter((name) => htmlBases.has(basename(name, ".motion.json")));
  if (matched.length > 1) {
    throw new Error(
      `ambiguous motion sidecars in ${projectDir}: ${matched.join(", ")} each match a composition \u2014 remove the sidecars you do not need, or use one composition per project`
    );
  }
  return join(projectDir, matched[0] ?? sidecars[0]);
}
function readMotionSpec(path) {
  let raw;
  try {
    raw = JSON.parse(readFileSync(path, "utf-8"));
  } catch (err) {
    return { ok: false, errors: [`could not read ${basename(path)}: ${err.message}`] };
  }
  return parseMotionSpec(raw);
}

// src/commands/layout.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var LAYOUT_SEEK_OPTIONS = AUDIT_SEEK_OPTIONS;
var INSPECT_SCHEMA_VERSION = 1;
var MOTION_FPS = 20;
var MOTION_MAX_SAMPLES = 300;
var examples = [
  ["Inspect visual layout across the current composition", "hyperframes layout"],
  ["Inspect a specific project", "hyperframes layout ./my-video"],
  ["Output agent-readable JSON", "hyperframes layout --json"],
  ["Use explicit hero-frame timestamps", "hyperframes layout --at 1.5,4.0,7.25"],
  [
    "Also sample at tween boundaries to catch transient overlaps",
    "hyperframes layout --at-transitions"
  ],
  [
    "Verify motion intent (add a *.motion.json sidecar next to the composition)",
    "hyperframes layout --json"
  ]
];
function buildMotionSampleTimes(duration) {
  if (!Number.isFinite(duration) || duration <= 0) return [];
  const count = Math.min(MOTION_MAX_SAMPLES, Math.max(2, Math.ceil(duration * MOTION_FPS) + 1));
  const step = duration / (count - 1);
  return Array.from({ length: count }, (_, index) => Math.round(index * step * 1e3) / 1e3);
}
async function getCompositionDuration(page) {
  return page.evaluate(() => {
    const win = window;
    if (typeof win.__hf?.duration === "number" && win.__hf.duration > 0) return win.__hf.duration;
    const playerDuration = win.__player?.duration;
    if (typeof playerDuration === "function") return playerDuration();
    if (typeof playerDuration === "number" && playerDuration > 0) return playerDuration;
    const root = document.querySelector("[data-composition-id][data-duration]");
    const attrDuration = root ? parseFloat(root.getAttribute("data-duration") ?? "0") : 0;
    if (attrDuration > 0) return attrDuration;
    const timelines = win.__timelines;
    if (timelines) {
      for (const timeline of Object.values(timelines)) {
        const duration = timeline.duration;
        if (typeof duration === "function") return duration();
        if (typeof duration === "number" && duration > 0) return duration;
      }
    }
    return 0;
  });
}
async function collectTweenBoundaries(page) {
  return page.evaluate(() => {
    const callOr = (fn, self, fallback) => typeof fn === "function" ? fn.call(self) : fallback;
    const toTimelineTime = (root, anim, localTime) => {
      let time = localTime;
      let node = anim;
      while (node && node !== root) {
        time = callOr(node.startTime, node, 0) + time / (callOr(node.timeScale, node, 1) || 1);
        node = node.parent;
      }
      return time;
    };
    const tweenBoundaries = (root, tween) => {
      if (typeof tween.duration !== "function") return [];
      const start = toTimelineTime(root, tween, 0);
      const end = toTimelineTime(root, tween, tween.duration());
      return [start, end].filter((time) => Number.isFinite(time));
    };
    const timelineBoundaries = (timeline) => {
      try {
        const tweens = timeline.getChildren?.(true, true, false) ?? [];
        return tweens.flatMap((tween) => tweenBoundaries(timeline, tween));
      } catch {
        return [];
      }
    };
    const win = window;
    return Object.values(win.__timelines ?? {}).flatMap(timelineBoundaries);
  });
}
async function bundleProjectHtml(projectDir) {
  const { bundleToSingleHtml } = await import("./compiler-NUVEDS7O.js");
  return bundleToSingleHtml(projectDir);
}
async function alignViewportToComposition(page, url) {
  const size = await page.evaluate(() => {
    const root = document.querySelector("[data-composition-id][data-width][data-height]");
    const width = root ? parseInt(root.getAttribute("data-width") ?? "", 10) : 0;
    const height = root ? parseInt(root.getAttribute("data-height") ?? "", 10) : 0;
    return {
      width: Number.isFinite(width) && width > 0 ? Math.min(width, 4096) : 1920,
      height: Number.isFinite(height) && height > 0 ? Math.min(height, 4096) : 1080
    };
  });
  await page.setViewport(size);
  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: resolveDiagnosticNavigationTimeoutMs()
  });
}
async function runLayoutAudit(projectDir, opts) {
  const { ensureBrowser } = await import("./manager-VQUQB7DK.js");
  const puppeteer = await import("puppeteer-core");
  const { buildChromeArgs } = await import("./src-2CXRYIST.js");
  const { assertWebGpuAdapterAvailable, compositionRequiresWebGpu, resolveLocalBrowserGpuMode } = await import("./gpuPolicy-ZEJUT7AR.js");
  const html = await bundleProjectHtml(projectDir);
  const server = await serveStaticProjectHtml(
    projectDir,
    html,
    "Failed to bind local layout audit server"
  );
  let chromeBrowser;
  try {
    const browser = await ensureBrowser();
    const requestedGpuMode = resolveLocalBrowserGpuMode();
    const resolvedGpuMode = await resolveManagedGpuMode(requestedGpuMode, browser.executablePath);
    const requiresWebGpu = compositionRequiresWebGpu(html);
    chromeBrowser = await launchManagedBrowser(puppeteer.default, {
      headless: true,
      executablePath: browser.executablePath,
      args: buildChromeArgs(
        { width: 1920, height: 1080, captureMode: "screenshot", requiresWebGpu },
        { browserGpuMode: resolvedGpuMode }
      )
    });
    const page = await chromeBrowser.newPage();
    await installPageFunctionGuard(page);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(server.url, {
      waitUntil: "domcontentloaded",
      timeout: resolveDiagnosticNavigationTimeoutMs()
    });
    await assertWebGpuAdapterAvailable(page, requiresWebGpu);
    await alignViewportToComposition(page, server.url);
    await waitForRuntimeReady(page, opts.timeout);
    await waitForCompositionFonts(page, 750);
    await new Promise((resolveSettle) => setTimeout(resolveSettle, 250));
    const duration = await getCompositionDuration(page);
    const baseSamples = buildLayoutSampleTimes({ duration, samples: opts.samples, at: opts.at });
    let transitionSamples = [];
    let transitionSamplesDropped = 0;
    if (opts.atTransitions) {
      const boundaries = await collectTweenBoundaries(page);
      const transitions = buildTransitionSampleTimes({
        duration,
        boundaries,
        cap: opts.maxTransitionSamples
      });
      transitionSamples = transitions.times;
      transitionSamplesDropped = transitions.dropped;
    }
    const samples = mergeSampleTimes(baseSamples, transitionSamples);
    const issues = await collectLayoutIssues(page, samples, opts.tolerance);
    let motionSamples = 0;
    if (opts.motion) {
      const motion = await runMotionPass(page, opts.motion, duration);
      issues.push(...motion.issues);
      motionSamples = motion.sampleCount;
    }
    return {
      duration,
      samples,
      transitionSamples,
      transitionSamplesDropped,
      rawIssues: dedupeLayoutIssues(issues),
      motionSamples
    };
  } finally {
    await chromeBrowser?.close().catch(() => {
    });
    await server.close();
  }
}
function loadBrowserScript(name) {
  const candidates = [join2(__dirname, name), join2(__dirname, "commands", name)];
  for (const candidate of candidates) {
    if (existsSync2(candidate)) return readFileSync2(candidate, "utf-8");
  }
  throw new Error(`Missing browser script ${name}`);
}
function loadLayoutAuditScript() {
  return loadBrowserScript("layout-audit.browser.js");
}
async function collectLayoutIssues(page, samples, tolerance) {
  if (samples.length === 0) return [];
  await page.addScriptTag({ content: loadLayoutAuditScript() });
  const issues = [];
  for (const time of samples) {
    await seekCompositionTimeline(page, time, LAYOUT_SEEK_OPTIONS);
    const sampleIssues = await page.evaluate(
      (auditOptions) => {
        const win = window;
        return win.__hyperframesLayoutAudit?.(auditOptions) ?? [];
      },
      { time, tolerance }
    );
    issues.push(...sampleIssues);
  }
  return issues;
}
async function findAmbiguousSelectors(page, selectors) {
  if (selectors.length === 0) return [];
  const multiMatch = await page.evaluate(
    (sels) => sels.filter((sel) => {
      try {
        return document.querySelectorAll(sel).length > 1;
      } catch {
        return false;
      }
    }),
    selectors
  );
  return multiMatch.map(ambiguousIssue);
}
async function collectMotionFrames(page, times, selectors, livenessScopes) {
  const frames = [];
  for (const time of times) {
    await seekCompositionTimeline(page, time, LAYOUT_SEEK_OPTIONS);
    const sample = await page.evaluate(
      (options) => {
        const win = window;
        return win.__hyperframesMotionSample?.(options) ?? { data: {}, liveness: {} };
      },
      { selectors, livenessScopes }
    );
    frames.push({ time, data: sample.data, liveness: sample.liveness });
  }
  return frames;
}
async function runMotionPass(page, spec, duration) {
  const times = buildMotionSampleTimes(spec.duration ?? duration);
  if (times.length === 0) return { issues: [], sampleCount: 0 };
  const { selectors, livenessScopes } = collectSamplingTargets(spec.assertions);
  const ambiguous = await findAmbiguousSelectors(page, selectors);
  if (ambiguous.length > 0) return { issues: ambiguous, sampleCount: 0 };
  const canvas = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }));
  await page.addScriptTag({ content: loadBrowserScript("motion-signature.browser.js") });
  await page.addScriptTag({ content: loadBrowserScript("motion-sample.browser.js") });
  const frames = await collectMotionFrames(page, times, selectors, livenessScopes);
  return { issues: evaluateMotion(frames, spec.assertions, canvas), sampleCount: frames.length };
}
function resolveMotionSpec(specPath, json) {
  const parsed = readMotionSpec(specPath);
  if (parsed.ok) return parsed.spec;
  const message = `Invalid motion spec ${specPath}: ${parsed.errors.join("; ")}`;
  if (json) {
    console.log(
      JSON.stringify(
        withMeta(
          {
            schemaVersion: INSPECT_SCHEMA_VERSION,
            ok: false,
            error: message,
            issues: [],
            errorCount: 0,
            warningCount: 0,
            infoCount: 0,
            issueCount: 0
          },
          { deprecated: true }
        ),
        null,
        2
      )
    );
  } else {
    console.error(`${c.error("\u2717")} ${message}`);
  }
  failCommand();
}
function parseAt(value) {
  if (!value) return void 0;
  const times = String(value).split(",").map((entry) => parseFloat(entry.trim())).filter((time) => Number.isFinite(time) && time >= 0);
  return times.length > 0 ? times : void 0;
}
function createInspectCommand(commandName) {
  return defineCommand({
    meta: {
      name: commandName,
      description: "Inspect rendered composition layout for text/container overflow, plus optional motion verification via a *.motion.json sidecar (deprecated, use check)"
    },
    args: {
      dir: { type: "positional", description: "Project directory", required: false },
      json: { type: "boolean", description: "Output agent-readable JSON", default: false },
      samples: {
        type: "string",
        description: "Number of midpoint samples across the duration (default: 9)",
        default: "9"
      },
      at: {
        type: "string",
        description: "Comma-separated timestamps in seconds (e.g., --at 1.5,4,7.25)"
      },
      "at-transitions": {
        type: "boolean",
        description: "Also sample at every tween start/end boundary (plus segment midpoints) to catch transient overlaps at transition seams",
        default: false
      },
      "max-transition-samples": {
        type: "string",
        description: "Optional cap on transition-derived samples; when it truncates, the omitted count is reported (default: unlimited)"
      },
      tolerance: {
        type: "string",
        description: "Allowed pixel overflow before reporting an issue (default: 2)",
        default: "2"
      },
      timeout: {
        type: "string",
        description: "Ms to wait for runtime to initialize (default: 5000)",
        default: "5000"
      },
      "max-issues": {
        type: "string",
        description: "Maximum issues to print or return after static collapse (default: 80)",
        default: "80"
      },
      "collapse-static": {
        type: "boolean",
        description: "Collapse repeated static issues across samples (default: true)",
        default: true
      },
      strict: {
        type: "boolean",
        description: "Exit non-zero on warnings too",
        default: false
      }
    },
    // Pre-existing command-run branching; U1 only swapped the seek internals.
    // fallow-ignore-next-line complexity
    async run({ args }) {
      printDeprecationNotice(commandName);
      const project = resolveProject(args.dir);
      const samples = Math.max(1, parseInt(args.samples, 10) || 9);
      const tolerance = Math.max(0, parseFloat(args.tolerance) || 2);
      const timeout = Math.max(500, parseInt(args.timeout, 10) || 5e3);
      const maxIssues = Math.max(1, parseInt(args["max-issues"], 10) || 80);
      const at = parseAt(args.at);
      const atTransitions = !!args["at-transitions"];
      const maxTransitionSamplesRaw = parseInt(args["max-transition-samples"], 10);
      const maxTransitionSamples = Number.isFinite(maxTransitionSamplesRaw) && maxTransitionSamplesRaw > 0 ? maxTransitionSamplesRaw : void 0;
      const strict = !!args.strict;
      const collapseStatic = args["collapse-static"] !== false;
      const motionSpecPath = findMotionSpec(project.dir);
      const motionSpec = motionSpecPath ? resolveMotionSpec(motionSpecPath, !!args.json) : void 0;
      if (!args.json) {
        const baseLabel = at ? `${at.length} explicit timestamp(s)` : `${samples} timeline samples`;
        const sampleLabel = atTransitions ? `${baseLabel} + transition boundaries` : baseLabel;
        const motionLabel = motionSpec ? ` + motion spec (${motionSpec.assertions.length} assertion(s))` : "";
        console.log(
          `${c.accent("\u25C6")}  Inspecting layout for ${c.accent(project.name)} (${sampleLabel}${motionLabel})`
        );
      }
      try {
        const result = await runLayoutAudit(project.dir, {
          samples,
          at,
          atTransitions,
          maxTransitionSamples,
          timeout,
          tolerance,
          motion: motionSpec
        });
        if (!args.json && result.transitionSamplesDropped > 0) {
          console.log(
            `${c.warn("\u26A0")}  ${result.transitionSamplesDropped} transition sample(s) omitted by --max-transition-samples; raise or drop it to sample every boundary`
          );
        }
        const allIssues = collapseStatic ? collapseStaticLayoutIssues(result.rawIssues, result.samples.length) : result.rawIssues;
        const limited = limitLayoutIssues(allIssues, maxIssues);
        const summary = summarizeLayoutIssues(allIssues);
        const ok = summary.errorCount === 0 && (!strict || summary.warningCount === 0);
        if (args.json) {
          console.log(
            JSON.stringify(
              withMeta(
                {
                  schemaVersion: INSPECT_SCHEMA_VERSION,
                  duration: result.duration,
                  samples: result.samples,
                  transitionSamples: atTransitions ? result.transitionSamples : void 0,
                  transitionSamplesDropped: atTransitions ? result.transitionSamplesDropped : void 0,
                  tolerance,
                  strict,
                  collapseStatic,
                  motionSpec: motionSpec ? motionSpecPath : void 0,
                  motionSamples: motionSpec ? result.motionSamples : void 0,
                  ...summary,
                  totalIssueCount: limited.totalIssueCount,
                  truncated: limited.truncated,
                  ok,
                  issues: limited.issues
                },
                { deprecated: true }
              ),
              null,
              2
            )
          );
          setCommandExitCode(ok ? 0 : 1);
          return;
        }
        if (result.samples.length === 0) {
          console.log();
          console.log(
            `${c.error("\u2717")} Could not determine composition duration \u2014 no layout samples run`
          );
          failCommand();
        }
        console.log();
        if (limited.issues.length === 0) {
          console.log(
            `${c.success("\u25C7")}  0 layout issues across ${result.samples.length} sample(s)`
          );
          return;
        }
        for (const issue of limited.issues) {
          const icon = issue.severity === "error" ? c.error("\u2717") : issue.severity === "warning" ? c.warn("\u26A0") : c.dim("\u2139");
          const formatted = formatLayoutIssue(issue).replace(/\n/g, "\n    ");
          console.log(`  ${icon} ${c.dim(formatted)}`);
        }
        console.log();
        const parts = [
          `${summary.errorCount} error(s)`,
          `${summary.warningCount} warning(s)`,
          `${summary.infoCount} info(s)`
        ];
        const suffix = limited.truncated ? c.dim(`, truncated at ${maxIssues} issue(s)`) : "";
        console.log(`${ok ? c.success("\u25C7") : c.error("\u25C7")}  ${parts.join(", ")}${suffix}`);
        setCommandExitCode(ok ? 0 : 1);
        return;
      } catch (err) {
        const message = normalizeErrorMessage(err);
        if (args.json) {
          console.log(
            JSON.stringify(
              withMeta(
                {
                  schemaVersion: INSPECT_SCHEMA_VERSION,
                  ok: false,
                  error: message,
                  issues: [],
                  errorCount: 0,
                  warningCount: 0,
                  infoCount: 0,
                  issueCount: 0
                },
                { deprecated: true }
              ),
              null,
              2
            )
          );
          failCommand();
        }
        console.error(`${c.error("\u2717")} Inspect failed: ${message}`);
        failCommand();
      }
    }
  });
}
var layout_default = createInspectCommand("layout");

export {
  buildLayoutSampleTimes,
  formatLayoutIssue,
  dedupeLayoutIssues,
  collapseStaticLayoutIssues,
  limitLayoutIssues,
  buildTransitionSampleTimes,
  mergeSampleTimes,
  ambiguousIssue,
  evaluateMotion,
  assertionTargets,
  collectSamplingTargets,
  findMotionSpec,
  readMotionSpec,
  examples,
  loadBrowserScript,
  parseAt,
  createInspectCommand,
  layout_default
};
