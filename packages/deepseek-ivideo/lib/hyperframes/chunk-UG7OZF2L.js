import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  diag
} from "./chunk-VWG7OQKU.js";
import {
  getSystemMeta
} from "./chunk-GQJZORQP.js";
import {
  getInvocationId
} from "./chunk-54HJ63Q2.js";
import {
  hostAnswers
} from "./chunk-K4WIOZFP.js";
import {
  POSTHOG_API_KEY,
  getIdentityPersistence,
  getIdentityWriteOutcome,
  readConfig,
  telemetryRuntimeOverride,
  writeConfig
} from "./chunk-2SBJMKLH.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/telemetry/transport.ts
import { spawn } from "child_process";
import { randomUUID } from "crypto";
var POSTHOG_HOST = "https://us.i.posthog.com";
var FLUSH_TIMEOUT_MS = 5e3;
var eventQueue = [];
function enqueue(event, properties, distinctId) {
  eventQueue.push({
    uuid: randomUUID(),
    event,
    distinctId,
    properties,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}
function buildPayload(events) {
  if (events.length === 0) return null;
  const config = readConfig();
  const batch = events.map((e) => ({
    uuid: e.uuid,
    event: e.event,
    properties: { ...e.properties, $ip: null },
    distinct_id: e.distinctId ?? config.anonymousId,
    timestamp: e.timestamp
  }));
  return JSON.stringify({ api_key: POSTHOG_API_KEY, batch });
}
var inFlight;
async function flush() {
  const run = inFlight ? inFlight.then((sent) => sent ? sendQueued() : false, sendQueued) : sendQueued();
  const current = run.finally(() => {
    if (inFlight === current) inFlight = void 0;
  });
  inFlight = current;
  await current;
}
async function sendQueued() {
  const snapshot = eventQueue.slice();
  const payload = buildPayload(snapshot);
  if (payload == null) return true;
  if (!await hostAnswers(new URL(POSTHOG_HOST).hostname)) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FLUSH_TIMEOUT_MS);
  try {
    const res = await fetch(`${POSTHOG_HOST}/batch/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Connection: "close" },
      body: payload,
      signal: controller.signal
    });
    await res.body?.cancel();
    const sent = new Set(snapshot);
    eventQueue = eventQueue.filter((e) => !sent.has(e));
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
function flushSync() {
  const payload = buildPayload(eventQueue);
  if (payload == null) return;
  eventQueue = [];
  try {
    const child = spawn(
      process.execPath,
      [
        "-e",
        `fetch(${JSON.stringify(`${POSTHOG_HOST}/batch/`)},{method:"POST",headers:{"Content-Type":"application/json"},body:${JSON.stringify(payload)},signal:AbortSignal.timeout(${FLUSH_TIMEOUT_MS})}).catch(()=>{})`
      ],
      { detached: true, stdio: "ignore", windowsHide: true }
    );
    child.unref();
  } catch {
  }
}

// ../core/dist/canary.js
function fnv1a32(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)) >>> 0;
  }
  return hash >>> 0;
}
function canaryBucket(feature, unitId) {
  return fnv1a32(`${feature}:${unitId}`) % 100;
}
function evaluateCanary(input) {
  if (input.override === true)
    return { enabled: true, reason: "forced_on" };
  if (input.override === false)
    return { enabled: false, reason: "forced_off" };
  const pct = Math.max(0, Math.min(100, Math.trunc(input.percentage)));
  if (pct <= 0)
    return { enabled: false, reason: "out_of_cohort" };
  if (pct >= 100)
    return { enabled: true, reason: "in_cohort" };
  if (input.exclude)
    return { enabled: false, reason: "excluded" };
  const unitId = input.unitId?.trim();
  if (!unitId)
    return { enabled: false, reason: "no_unit_id" };
  const bucket = canaryBucket(input.feature, unitId);
  return bucket < pct ? { enabled: true, reason: "in_cohort", bucket } : { enabled: false, reason: "out_of_cohort", bucket };
}
function parseCanaryOverride(raw) {
  const v = raw?.trim().toLowerCase();
  if (v === void 0 || v === "")
    return void 0;
  if (v === "1" || v === "true" || v === "on" || v === "yes")
    return true;
  if (v === "0" || v === "false" || v === "off" || v === "no")
    return false;
  return void 0;
}
var CANARY_FEATURE_PREFIX = "$feature/canary-";
function canaryFeatureKey(name) {
  return `${CANARY_FEATURE_PREFIX}${name}`;
}
function canaryReasonKey(name) {
  return `canary_reason_${name.replace(/[^A-Za-z0-9]+/g, "_")}`;
}
function canaryFeatureProperties(entries) {
  const props = {};
  for (const entry of entries) {
    props[canaryFeatureKey(entry.name)] = entry.enabled ? "true" : "false";
    if (entry.reason !== void 0)
      props[canaryReasonKey(entry.name)] = entry.reason;
  }
  return props;
}

// ../core/dist/canaryRegistry.js
var CANARIES = [
  // ── Calibration ──────────────────────────────────────────────────────────
  // Two INERT canaries that gate nothing. They exist to validate the rollout
  // mechanism against real traffic before anything real depends on it, and
  // they answer questions the synthetic tests cannot:
  //
  //   1. Does a requested percentage land on target in the wild? The unit
  //      tests use generated UUIDs and weight every install equally; real
  //      render volume is heavily skewed toward a few heavy installs, so the
  //      render-weighted share could differ from the install-weighted one.
  //   2. How fast does CUMULATIVE exposure drift above the target? Install
  //      ids churn (measured: 24.7x more distinct ids over 30 days than in
  //      any single day), so the set of installs enrolled AT SOME POINT grows
  //      even though the instantaneous share stays flat. That drift is the
  //      real limit on a canary's blast-radius guarantee.
  //   3. Are two canaries actually independent on real ids, not just on
  //      generated ones? Overlap should be ~p1*p2, not ~min(p1,p2).
  //
  // Two different percentages so the answer is a line, not a point.
  // Delete both once the calibration window is read.
  {
    name: "calibration-10",
    percentage: 10,
    description: "Inert. Validates rollout accuracy and cumulative-exposure drift at 10%.",
    owner: "vance",
    sunsetAfter: "2026-09-15"
  },
  {
    name: "calibration-50",
    percentage: 50,
    description: "Inert. Second calibration point, and an independence check against calibration-10.",
    owner: "vance",
    sunsetAfter: "2026-09-15"
  }
];
function findCanary(name) {
  return CANARIES.find((c2) => c2.name === name);
}
function canaryEnvVar(name) {
  return `HF_CANARY_${name.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`;
}

// src/telemetry/canary.ts
function telemetryActive() {
  if (telemetryRuntimeOverride() !== null) return false;
  return readConfig().telemetryEnabled;
}
var decisions = /* @__PURE__ */ new Map();
var decisionsTelemetryPosture;
function decideCanary(name) {
  const definition = findCanary(name);
  if (!definition) return { enabled: false, reason: "out_of_cohort" };
  const override = parseCanaryOverride(process.env[canaryEnvVar(definition.name)]);
  if (override === void 0 && !telemetryActive()) {
    return { enabled: false, reason: "telemetry_opt_out" };
  }
  const config = readConfig();
  return evaluateCanary({
    feature: definition.name,
    // The bucket seed, NOT the anonymousId: the seed is inherited across
    // config.json re-mints via the install-state file, so cohorts hold when
    // the telemetry id re-rolls. Both files live in ~/.hyperframes, so
    // deleting that directory clears the cohort too — intentional. Fallback
    // covers only a failed backfill write on a legacy config.
    unitId: config.bucketSeed ?? config.anonymousId,
    percentage: definition.percentage,
    override,
    // CI installs regenerate their config per run, so their ids are
    // ephemeral — they would hop cohorts between runs, adding noise to the
    // rollout signal while saying nothing about real users. An explicit
    // override still gets through, which is how you test a canary in CI.
    exclude: getSystemMeta().is_ci
  });
}
function resolveCanary(name) {
  const posture = telemetryActive();
  if (decisionsTelemetryPosture !== posture) {
    decisions.clear();
    decisionsTelemetryPosture = posture;
  }
  const cached = decisions.get(name);
  if (cached) return cached;
  const decision = decideCanary(name);
  decisions.set(name, decision);
  return decision;
}
function canaryDecisionsForStudio() {
  const out = {};
  for (const canary of CANARIES) {
    const { enabled, reason } = resolveCanary(canary.name);
    out[canary.name] = {
      enabled,
      // Provenance, not decoration. Studio has its own telemetry opt-out that
      // the CLI cannot see, and it must be able to refuse ordinary cohort
      // enrolment while still honouring a deliberate `HF_CANARY_*` override.
      // A bare boolean cannot express that difference, so Studio would have
      // had to either ignore its own opt-out or drop the override.
      forced: reason === "forced_on" || reason === "forced_off"
    };
  }
  return out;
}
function canaryEventProperties() {
  return canaryFeatureProperties(
    CANARIES.map((c2) => {
      const { enabled, reason } = resolveCanary(c2.name);
      return { name: c2.name, enabled, reason };
    })
  );
}

// src/telemetry/client.ts
var telemetryEnabled = null;
function shouldTrack() {
  if (telemetryEnabled !== null) return telemetryEnabled;
  if (telemetryRuntimeOverride() !== null) {
    telemetryEnabled = false;
    return false;
  }
  const config = readConfig();
  telemetryEnabled = config.telemetryEnabled;
  return telemetryEnabled;
}
function trackEvent(event, properties = {}, distinctId) {
  if (!shouldTrack()) return;
  const sys = getSystemMeta();
  enqueue(
    event,
    {
      ...properties,
      cli_version: VERSION,
      os: process.platform,
      arch: process.arch,
      node_version: process.version,
      os_release: sys.os_release,
      cpu_count: sys.cpu_count,
      cpu_model: sys.cpu_model ?? void 0,
      cpu_speed: sys.cpu_speed ?? void 0,
      memory_total_mb: sys.memory_total_mb,
      is_docker: sys.is_docker,
      is_ci: sys.is_ci,
      ci_name: sys.ci_name ?? void 0,
      is_wsl: sys.is_wsl,
      is_tty: sys.is_tty,
      sandbox_runtime: sys.sandbox_runtime ?? void 0,
      agent_runtime: sys.agent_runtime ?? void 0,
      execution_harness_hint: sys.execution_harness_hint ?? void 0,
      // New-agent discovery signals — populated only when agent_runtime is null.
      agent_hint: sys.agent_hint ?? void 0,
      term_program: sys.term_program ?? void 0,
      // Did this install's mint find a previous install's state marker?
      // The fleet-wide rate of `true` IS the recoverable-churn fraction —
      // the share of "new" ids that are really a config re-mint on a machine
      // we already knew. Absent (not false) when the config predates the
      // marker. Resolved after the shouldTrack guard.
      install_predecessor_found: readConfig().predecessorFound,
      // Splits the `true` share above: a machine we knew but whose record we
      // could not read. Without it a partial disk write is indistinguishable
      // from a genuinely fresh install. Absent in the normal case.
      install_state_file_corrupt: readConfig().stateFileCorrupt,
      // Whether this process's anonymousId can be trusted to survive to the
      // next run: `durable` (loaded from a preexisting config), `unknown`
      // (minted+persisted this run — an ephemeral HOME is indistinguishable
      // from a genuine first run), `process_only` (not persisted). Install-
      // grain metrics must also consider environment and repeated-day use:
      // a short-lived container can persist its id between two CLI processes.
      identity_persistence: getIdentityPersistence(),
      // Outcome of the identity-establishing config write; absent when that
      // path did not write (including a durable id loaded from disk).
      config_write_outcome: getIdentityWriteOutcome(),
      // Groups one invocation's events even when the install identity is
      // untrustworthy. Always present, unlike the orchestrator-set run_id.
      invocation_id: getInvocationId(),
      // Canary assignments as `$feature/canary-<name>` — PostHog's native flag
      // property shape, so breakdowns and experiment analysis work on a canary
      // with nothing configured server-side. On EVERY event, not just renders:
      // a staged rollout is only as good as the ability to split any metric by
      // cohort. Resolved after the shouldTrack guard, so opted-out installs
      // never pay for it. See telemetry/canary.ts.
      ...canaryEventProperties(),
      agent_env_hints: sys.agent_env_hints ?? void 0,
      client: sys.client ?? void 0
    },
    distinctId
  );
}
function showTelemetryNotice() {
  if (!shouldTrack()) return false;
  const config = readConfig();
  if (config.telemetryNoticeShown) return false;
  config.telemetryNoticeShown = true;
  writeConfig(config);
  diag.notice();
  diag.notice(`  ${c.dim("Hyperframes collects anonymous usage data to improve the tool.")}`);
  diag.notice(`  ${c.dim("File paths and composition content are never collected.")}`);
  diag.notice(
    `  ${c.dim("If you sign in to HeyGen, your account (email, or username) is linked to your usage.")}`
  );
  diag.notice();
  diag.notice(`  ${c.dim("Disable anytime:")} ${c.accent("hyperframes telemetry disable")}`);
  diag.notice();
  return true;
}

export {
  canaryDecisionsForStudio,
  flush,
  flushSync,
  shouldTrack,
  trackEvent,
  showTelemetryNotice
};
