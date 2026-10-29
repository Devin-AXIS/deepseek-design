import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  isDevMode
} from "./chunk-ISN5GRYI.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";

// src/telemetry/posthogKey.ts
var POSTHOG_API_KEY = "phc_zjjbX0PnWxERXrMHhkEJWj9A9BhGVLRReICgsfTMmpx";

// src/telemetry/policy.ts
var ENV_OPT_OUT_VALUES = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
function isEnvOptOutValue(value) {
  return value !== void 0 && ENV_OPT_OUT_VALUES.has(value.trim().toLowerCase());
}
function telemetryRuntimeOverride() {
  if (isEnvOptOutValue(process.env["HYPERFRAMES_NO_TELEMETRY"])) {
    return "HYPERFRAMES_NO_TELEMETRY";
  }
  if (isEnvOptOutValue(process.env["DO_NOT_TRACK"])) {
    return "DO_NOT_TRACK";
  }
  if (isDevMode()) {
    return "dev_mode";
  }
  if (!POSTHOG_API_KEY.startsWith("phc_")) {
    return "telemetry_disabled_build";
  }
  return null;
}
function effectiveTelemetryStatus(configEnabled) {
  const override = telemetryRuntimeOverride();
  if (override !== null) return { enabled: false, source: override };
  return { enabled: configEnabled, source: "config" };
}

// src/utils/attendedTerminal.ts
function envFlagEnabled(name) {
  const value = process.env[name]?.trim().toLowerCase();
  return Boolean(value && value !== "0" && value !== "false" && value !== "no");
}
function isAttendedTerminal() {
  return !envFlagEnabled("CI") && process.stdin.isTTY === true && process.stdout.isTTY === true;
}

// src/media-use/lib/config-lock.mjs
function withFileLock(lockPath, fs2, task) {
  const token = `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const started = Date.now();
  for (; ; ) {
    let fd;
    try {
      fd = fs2.openSync(lockPath, "wx");
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      let leftover = false;
      try {
        leftover = Date.now() - fs2.statSync(lockPath).mtimeMs > 5e3;
      } catch {
      }
      if (leftover || Date.now() - started > 1e4)
        throw Object.assign(
          new Error(
            `Settings are locked by another hyperframes process. If none is running, delete ${lockPath}`
          ),
          { code: "HF_SETTINGS_LOCKED" }
        );
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25);
      continue;
    }
    try {
      fs2.writeSync(fd, token);
    } catch (error) {
      fs2.rmSync(lockPath, { force: true });
      throw error;
    } finally {
      fs2.closeSync(fd);
    }
    break;
  }
  try {
    return task();
  } finally {
    try {
      fs2.rmSync(lockPath);
    } catch {
    }
  }
}

// src/telemetry/config.ts
import * as fs from "fs";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { randomUUID } from "crypto";
var CONFIG_DIR = join(homedir(), ".hyperframes");
var CONFIG_FILE = join(CONFIG_DIR, "config.json");
var STATE_FILE = join(CONFIG_DIR, "install-state.json");
var LEGACY_STATE_FILE = join(homedir(), ".local", "state", "hyperframes", "install-state.json");
function salvageInstallState(parsed) {
  const markerAt = typeof parsed.markerAt === "string" ? parsed.markerAt : void 0;
  const bucketSeed = parseNonEmptyString(parsed.bucketSeed);
  const fired = parsed.deParallelRouterTrialFired === true ? true : void 0;
  if (markerAt === void 0 && bucketSeed === void 0 && fired === void 0) return "corrupt";
  return {
    markerAt: markerAt ?? (/* @__PURE__ */ new Date()).toISOString(),
    deParallelRouterTrialFired: fired,
    bucketSeed
  };
}
function parseInstallState(file) {
  if (!existsSync(file)) return "absent";
  try {
    return salvageInstallState(JSON.parse(readFileSync(file, "utf-8")));
  } catch {
    return "corrupt";
  }
}
var seedBackfillWarned = false;
function warnSeedBackfillFailed(error) {
  if (seedBackfillWarned) return;
  seedBackfillWarned = true;
  if (telemetryRuntimeOverride() !== null) return;
  console.warn(
    `[hyperframes] Could not persist telemetry config${error ? `: ${error}` : ""}. Canary cohort assignment will not be stable across runs.`
  );
}
function backfillBucketSeed(config) {
  const recorded = readInstallState();
  config.bucketSeed = (isInstallState(recorded) ? recorded.bucketSeed : void 0) ?? randomUUID();
  const write = writeConfigWithResult(config);
  if (!write.ok) warnSeedBackfillFailed(write.error);
  return write;
}
var latchedFiredSeen = false;
function installStateLatchedFired() {
  if (latchedFiredSeen) return true;
  const state = readInstallState();
  latchedFiredSeen = isInstallState(state) && state.deParallelRouterTrialFired === true;
  return latchedFiredSeen;
}
function installStateSeed() {
  const state = readInstallState();
  return isInstallState(state) ? state.bucketSeed : void 0;
}
function isInstallState(value) {
  return typeof value !== "string";
}
function readInstallState() {
  const current = parseInstallState(STATE_FILE);
  if (isInstallState(current)) {
    removeLegacyStateFile();
    return current;
  }
  const legacy = parseInstallState(LEGACY_STATE_FILE);
  if (!isInstallState(legacy)) {
    if (legacy === "corrupt") removeLegacyStateFile();
    return current === "corrupt" || legacy === "corrupt" ? "corrupt" : "absent";
  }
  try {
    writeInstallState(legacy);
    removeLegacyStateFile();
  } catch {
  }
  return legacy;
}
function removeLegacyStateFile() {
  try {
    if (existsSync(LEGACY_STATE_FILE)) rmSync(LEGACY_STATE_FILE, { force: true });
  } catch {
  }
}
var stateMarkerSynced = false;
var stateFiredSynced = false;
function writeInstallState(next) {
  mkdirSync(CONFIG_DIR, { recursive: true, mode: 448 });
  const tmpFile = `${STATE_FILE}.${process.pid}.tmp`;
  writeFileSync(tmpFile, JSON.stringify(next, null, 2) + "\n", { mode: 384 });
  renameSync(tmpFile, STATE_FILE);
}
function sameInstallState(a, b) {
  return a.deParallelRouterTrialFired === b.deParallelRouterTrialFired && a.bucketSeed === b.bucketSeed;
}
function latchedFired(state, config) {
  return state?.deParallelRouterTrialFired === true || config.deParallelRouterTrialFired === true || void 0;
}
function nextInstallState(state, config) {
  const next = {
    markerAt: state?.markerAt ?? (/* @__PURE__ */ new Date()).toISOString(),
    deParallelRouterTrialFired: latchedFired(state, config),
    // Write-once: an existing seed always wins, so cohorts stay
    // anchored to the FIRST install in this config dir, not the latest one.
    bucketSeed: state?.bucketSeed ?? config.bucketSeed
  };
  if (state !== null && sameInstallState(state, next)) return null;
  return next;
}
function applyInstallState(config, wantFired) {
  const read = readInstallState();
  const state = isInstallState(read) ? read : null;
  const next = nextInstallState(state, config);
  if (next !== null) writeInstallState(next);
  stateMarkerSynced = true;
  stateFiredSynced = wantFired || state?.deParallelRouterTrialFired === true;
  if (wantFired) latchedFiredSeen = true;
}
function syncInstallState(config) {
  const wantFired = config.deParallelRouterTrialFired === true;
  if (stateMarkerSynced && !existsSync(STATE_FILE)) {
    stateMarkerSynced = false;
    stateFiredSynced = false;
  }
  if (stateMarkerSynced && (stateFiredSynced || !wantFired)) return true;
  try {
    applyInstallState(config, wantFired);
    return true;
  } catch {
    return false;
  }
}
function mintAndCacheConfig() {
  const config = mintConfig();
  const write = writeConfigWithResult(config);
  if (!write.ok) warnSeedBackfillFailed(write.error);
  classifyIdentity(
    config.anonymousId,
    write.ok ? "unknown" : "process_only",
    writeOutcomeOf(write)
  );
  cachedConfig = { ...config };
  return { ...config };
}
function mintConfig() {
  const read = readInstallState();
  const state = isInstallState(read) ? read : null;
  return {
    ...DEFAULT_CONFIG,
    anonymousId: randomUUID(),
    // A corrupt record still means this machine had an install — reporting it
    // as `false` would count a partial disk write as a brand-new machine and
    // understate recoverable churn, which is the one thing this field exists
    // to measure. `undefined` on configs minted before the field existed.
    predecessorFound: state !== null || read === "corrupt",
    stateFileCorrupt: read === "corrupt" ? true : void 0,
    // The rollover itself: a breaker tripped by a previous install on this
    // machine stays tripped for the new one, and the canary bucketing seed is
    // inherited so cohorts hold across a config.json re-mint.
    deParallelRouterTrialFired: state?.deParallelRouterTrialFired === true ? true : void 0,
    bucketSeed: state?.bucketSeed ?? randomUUID()
  };
}
var MAX_RECENT_RENDERS = 5;
function recordRecentRender(id, ok) {
  const config = readConfigFresh();
  const ring = [...config.recentRenders ?? [], { id, at: (/* @__PURE__ */ new Date()).toISOString(), ok }];
  config.recentRenders = ring.slice(-MAX_RECENT_RENDERS);
  writeConfig(config);
}
var DEFAULT_CONFIG = {
  telemetryEnabled: true,
  anonymousId: "",
  telemetryNoticeShown: false,
  commandCount: 0,
  renderSuccessCount: 0,
  lastFeedbackPromptAt: 0
};
var cachedConfig = null;
var identityClassification;
function classifyIdentity(anonymousId, persistence, writeOutcome) {
  if (identityClassification?.anonymousId === anonymousId) return;
  identityClassification = { anonymousId, persistence, writeOutcome };
}
function writeOutcomeOf(write) {
  if (!write.ok) return "failed";
  return write.mirrored === false ? "ok_unmirrored" : "ok";
}
function getIdentityPersistence() {
  const config = readConfig();
  return identityClassification?.anonymousId === config.anonymousId ? identityClassification.persistence : "unknown";
}
function getIdentityWriteOutcome() {
  const config = readConfig();
  return identityClassification?.anonymousId === config.anonymousId ? identityClassification.writeOutcome : void 0;
}
function parseNonEmptyString(value) {
  return typeof value === "string" && value.length > 0 ? value : void 0;
}
function parseRecentRenders(value) {
  if (!Array.isArray(value)) return void 0;
  return value.filter(
    (r) => typeof r === "object" && r !== null && typeof r.id === "string" && typeof r.at === "string" && typeof r.ok === "boolean"
  ).slice(-MAX_RECENT_RENDERS);
}
function passthroughFields(parsed) {
  return {
    lastUpdateCheck: parsed.lastUpdateCheck,
    latestVersion: parsed.latestVersion,
    lastStalePinNoticeAt: parsed.lastStalePinNoticeAt,
    lastUpdateAttemptAt: parsed.lastUpdateAttemptAt,
    lastSkillsAttemptAt: parsed.lastSkillsAttemptAt,
    pendingUpdate: parsed.pendingUpdate,
    completedUpdate: parsed.completedUpdate,
    lastSkillsCheck: parsed.lastSkillsCheck,
    skillsUpdateAvailable: parsed.skillsUpdateAvailable,
    skillsOutdatedCount: parsed.skillsOutdatedCount,
    skillsMissingCount: parsed.skillsMissingCount,
    skillsRemovedCount: parsed.skillsRemovedCount,
    localEmbeddingEnabled: consentFrom(parsed.localEmbeddingEnabled)
  };
}
function guardedFields(parsed) {
  return {
    // Explicit `=== true`/typeof-number checks rather than a truthy/nullish
    // read — a hand-edited or corrupted config could plausibly carry a
    // non-boolean/non-number JSON value (e.g. the STRING "false", which is
    // truthy in JS) for these two fields specifically, since they're read
    // with a bare truthy check at the call site (review finding).
    // `|| installStateLatchedFired()` — a latch recorded in install-state
    // wins over an untripped config.json, never the reverse.
    deParallelRouterTrialFired: parsed.deParallelRouterTrialFired === true || installStateLatchedFired() ? true : void 0,
    deParallelRouterTrialRenderCount: typeof parsed.deParallelRouterTrialRenderCount === "number" ? parsed.deParallelRouterTrialRenderCount : void 0,
    predecessorFound: typeof parsed.predecessorFound === "boolean" ? parsed.predecessorFound : void 0,
    stateFileCorrupt: parsed.stateFileCorrupt === true ? true : void 0,
    // Install-state wins, exactly as it does for the latch. Without this the
    // two stores could hold different seeds indefinitely: nextInstallState
    // is write-once (state's seed always survives), but the read took
    // config.json's blindly — so restoring or syncing only config.json left
    // the install bucketing on A while install-state kept B, and the next
    // re-mint silently flipped every cohort at once.
    bucketSeed: installStateSeed() ?? parseNonEmptyString(parsed.bucketSeed)
  };
}
function materializeConfig(parsed) {
  return {
    ...passthroughFields(parsed),
    telemetryEnabled: parsed.telemetryEnabled ?? DEFAULT_CONFIG.telemetryEnabled,
    anonymousId: parsed.anonymousId || randomUUID(),
    telemetryNoticeShown: parsed.telemetryNoticeShown ?? DEFAULT_CONFIG.telemetryNoticeShown,
    commandCount: parsed.commandCount ?? DEFAULT_CONFIG.commandCount,
    renderSuccessCount: parsed.renderSuccessCount ?? DEFAULT_CONFIG.renderSuccessCount,
    lastFeedbackPromptAt: parsed.lastFeedbackPromptAt ?? DEFAULT_CONFIG.lastFeedbackPromptAt,
    ...guardedFields(parsed),
    recentRenders: parseRecentRenders(parsed.recentRenders)
  };
}
function readConfig() {
  if (cachedConfig) return { ...cachedConfig };
  if (!existsSync(CONFIG_FILE)) return mintAndCacheConfig();
  try {
    const raw = readFileSync(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    const config = materializeConfig(parsed);
    const idFromDisk = parseNonEmptyString(parsed.anonymousId) !== void 0;
    if (config.bucketSeed === void 0) {
      const write = backfillBucketSeed(config);
      if (idFromDisk) classifyIdentity(config.anonymousId, "durable");
      else
        classifyIdentity(
          config.anonymousId,
          write.ok ? "unknown" : "process_only",
          writeOutcomeOf(write)
        );
      cachedConfig = config;
      return { ...config };
    }
    classifyIdentity(config.anonymousId, idFromDisk ? "durable" : "process_only");
    cachedConfig = config;
    return { ...config };
  } catch {
    const config = { ...mintConfig(), telemetryEnabled: false, localEmbeddingEnabled: false };
    const write = writeConfigWithResult(config);
    classifyIdentity(
      config.anonymousId,
      write.ok ? "unknown" : "process_only",
      writeOutcomeOf(write)
    );
    return config;
  }
}
function readConfigFresh() {
  cachedConfig = null;
  return readConfig();
}
function writeConfig(config) {
  return writeConfigWithResult(config).ok;
}
function writeConfigWithResult(config) {
  try {
    return withConfigLock(
      () => persistConfig({ ...config, localEmbeddingEnabled: localModelConsentOnDisk() })
    );
  } catch (error) {
    warnSettingsLockedOnce(error);
    return { ok: false, error: normalizeErrorMessage(error) };
  }
}
var warnedSettingsLocked = false;
function warnSettingsLockedOnce(error) {
  if (warnedSettingsLocked || error?.code !== "HF_SETTINGS_LOCKED")
    return;
  warnedSettingsLocked = true;
  if (!isAttendedTerminal() || process.argv.some((arg) => arg === "--json" || arg.startsWith("--json=")))
    return;
  console.error(`${error.message} (see \`hyperframes doctor\`).`);
}
function updateLocalModelConsent(decide) {
  try {
    return withConfigLock(() => {
      const onDisk = localModelConsentOnDisk();
      const next = decide(onDisk);
      if (next === onDisk) {
        if (cachedConfig) cachedConfig.localEmbeddingEnabled = onDisk;
        return next;
      }
      const written = persistConfig({ ...readConfigFresh(), localEmbeddingEnabled: next });
      return written.ok ? next : localModelConsentOnDisk();
    });
  } catch (error) {
    warnSettingsLockedOnce(error);
    return localModelConsentOnDisk();
  }
}
function consentFrom(value) {
  return value === void 0 ? void 0 : value === true;
}
function localModelConsentOnDisk() {
  try {
    return consentFrom(JSON.parse(readFileSync(CONFIG_FILE, "utf-8")).localEmbeddingEnabled);
  } catch (error) {
    return error.code === "ENOENT" ? void 0 : false;
  }
}
var holdingConfigLock = false;
function withConfigLock(task) {
  if (holdingConfigLock) return task();
  mkdirSync(CONFIG_DIR, { recursive: true, mode: 448 });
  return withFileLock(`${CONFIG_FILE}.lock`, fs, () => {
    holdingConfigLock = true;
    try {
      return task();
    } finally {
      holdingConfigLock = false;
    }
  });
}
function persistConfig(config) {
  try {
    mkdirSync(CONFIG_DIR, { recursive: true, mode: 448 });
    const tmpFile = `${CONFIG_FILE}.${process.pid}.tmp`;
    writeFileSync(tmpFile, JSON.stringify(config, null, 2) + "\n", { mode: 384 });
    renameSync(tmpFile, CONFIG_FILE);
    cachedConfig = { ...config };
    const mirrored = syncInstallState(config);
    return mirrored ? { ok: true } : { ok: true, mirrored: false };
  } catch (error) {
    return { ok: false, error: normalizeErrorMessage(error) };
  }
}
function incrementCommandCount() {
  const config = readConfig();
  config.commandCount++;
  writeConfig(config);
  return config.commandCount;
}
var CONFIG_PATH = CONFIG_FILE;
var STATE_PATH = STATE_FILE;

export {
  POSTHOG_API_KEY,
  telemetryRuntimeOverride,
  effectiveTelemetryStatus,
  isAttendedTerminal,
  withFileLock,
  recordRecentRender,
  getIdentityPersistence,
  getIdentityWriteOutcome,
  readConfig,
  readConfigFresh,
  writeConfig,
  writeConfigWithResult,
  updateLocalModelConsent,
  incrementCommandCount,
  CONFIG_PATH,
  STATE_PATH
};
