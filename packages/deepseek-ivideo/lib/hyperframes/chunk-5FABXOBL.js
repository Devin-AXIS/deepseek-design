import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  hostAnswers
} from "./chunk-K4WIOZFP.js";
import {
  readConfig,
  readConfigFresh,
  writeConfig
} from "./chunk-2SBJMKLH.js";
import {
  isDevMode
} from "./chunk-ISN5GRYI.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";

// src/utils/updateCheck.ts
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { compareVersions } from "compare-versions";

// src/utils/installerDetection.ts
import { realpathSync } from "fs";
import { posix } from "path";
function resolveEntry() {
  const entry = process.argv[1];
  if (!entry) return null;
  try {
    return realpathSync(entry);
  } catch {
    return entry;
  }
}
function normalizePath(path) {
  return path.replaceAll("\\", "/");
}
function isWorkspaceLink(realEntry) {
  const normalized = normalizePath(realEntry);
  return normalized.includes("/packages/cli/");
}
function isEphemeralExec(realEntry) {
  const normalized = normalizePath(realEntry);
  return normalized.includes("/_npx/") || normalized.includes("/.npm/_npx/") || posix.basename(posix.dirname(normalized)).startsWith("bunx-");
}
function isHomebrewInstall(realEntry) {
  return normalizePath(realEntry).includes("/Cellar/hyperframes/");
}
function detectInstaller() {
  const realEntry = resolveEntry();
  if (!realEntry) {
    return {
      kind: "skip",
      installCommand: () => null,
      reason: "Could not resolve process entry path"
    };
  }
  const normalizedEntry = normalizePath(realEntry);
  if (isWorkspaceLink(realEntry)) {
    return {
      kind: "skip",
      installCommand: () => null,
      reason: "Running from a workspace link (monorepo dev)"
    };
  }
  if (isEphemeralExec(realEntry)) {
    return {
      kind: "skip",
      installCommand: () => null,
      reason: "Running via ephemeral exec (npx / bunx)"
    };
  }
  if (isHomebrewInstall(realEntry)) {
    return {
      kind: "brew",
      // Updating a brew formula isn't a straight `install`; the formula needs
      // to have been published. Defer to `brew upgrade` which is a no-op if
      // the tap hasn't caught up.
      installCommand: () => "brew upgrade hyperframes",
      reason: `Homebrew install detected at ${realEntry}`
    };
  }
  if (normalizedEntry.includes("/.bun/")) {
    return {
      kind: "bun",
      installCommand: (version) => `bun add -g hyperframes@${version}`,
      reason: `bun global install detected at ${realEntry}`
    };
  }
  if (normalizedEntry.includes("/pnpm/global/")) {
    return {
      kind: "pnpm",
      installCommand: (version) => `pnpm add -g hyperframes@${version}`,
      reason: `pnpm global install detected at ${realEntry}`
    };
  }
  if (normalizedEntry.includes("/lib/node_modules/hyperframes/") || normalizedEntry.includes("/npm/node_modules/hyperframes/")) {
    return {
      kind: "npm",
      installCommand: (version) => `npm install -g hyperframes@${version}`,
      reason: `npm global install detected at ${realEntry}`
    };
  }
  return {
    kind: "skip",
    installCommand: () => null,
    reason: `Unknown install layout at ${realEntry}`
  };
}
function installInvocation(kind, version) {
  switch (kind) {
    case "npm":
      return { bin: "npm", args: ["install", "-g", `hyperframes@${version}`] };
    case "bun":
      return { bin: "bun", args: ["add", "-g", `hyperframes@${version}`] };
    case "pnpm":
      return { bin: "pnpm", args: ["add", "-g", `hyperframes@${version}`] };
    case "brew":
      return { bin: "brew", args: ["upgrade", "hyperframes"] };
    case "skip":
      return null;
  }
}

// src/utils/safeVersion.ts
function isSafeVersion(v) {
  return /^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(v);
}

// src/utils/projectPin.ts
var HYPERFRAMES_PIN_RE = /\bhyperframes@([0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?)(?=\s|$)/g;
function rewritePinnedHyperframesText(text, targetVersion) {
  if (!isSafeVersion(targetVersion)) {
    return { changed: false, text, fromVersions: [] };
  }
  const fromVersions = /* @__PURE__ */ new Set();
  const next = text.replace(HYPERFRAMES_PIN_RE, (_full, version) => {
    if (version !== targetVersion) fromVersions.add(version);
    return `hyperframes@${targetVersion}`;
  });
  return {
    changed: fromVersions.size > 0,
    text: next,
    fromVersions: [...fromVersions].sort()
  };
}
function readPinnedHyperframesVersions(scripts) {
  const found = /* @__PURE__ */ new Set();
  for (const cmd of Object.values(scripts ?? {})) {
    for (const m of cmd.matchAll(HYPERFRAMES_PIN_RE)) if (m[1]) found.add(m[1]);
  }
  return [...found].sort();
}
function rewriteProjectPinnedScripts(scripts, targetVersion) {
  if (!isSafeVersion(targetVersion)) {
    return { changed: false, scripts: { ...scripts }, fromVersions: [] };
  }
  const fromVersions = /* @__PURE__ */ new Set();
  const next = {};
  for (const [name, cmd] of Object.entries(scripts ?? {})) {
    const rewrite = rewritePinnedHyperframesText(cmd, targetVersion);
    next[name] = rewrite.text;
    for (const version of rewrite.fromVersions) fromVersions.add(version);
  }
  return {
    changed: [...fromVersions].length > 0,
    scripts: next,
    fromVersions: [...fromVersions].sort()
  };
}

// src/utils/updateCheck.ts
var NPM_REGISTRY_URL = "https://registry.npmjs.org/hyperframes/latest";
var CHECK_INTERVAL_MS = 24 * 60 * 60 * 1e3;
var FETCH_TIMEOUT_MS = 3e3;
function isNewerSemver(a, b) {
  try {
    return compareVersions(a, b) > 0;
  } catch {
    return a !== b;
  }
}
async function checkForUpdate(force) {
  const config = readConfig();
  if (!force && !updateCheckDue(config)) return fallbackResult(config.latestVersion);
  try {
    if (!force && !await hostAnswers(new URL(NPM_REGISTRY_URL).hostname)) {
      return fallbackResult(config.latestVersion);
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let data;
    try {
      const res = await fetch(NPM_REGISTRY_URL, {
        signal: controller.signal,
        headers: { Connection: "close" }
      });
      if (!res.ok) return fallbackResult(config.latestVersion);
      data = await res.json();
    } finally {
      clearTimeout(timeout);
    }
    if (typeof data.version !== "string" || !isSafeVersion(data.version)) {
      return fallbackResult(config.latestVersion);
    }
    const latest = data.version;
    const freshConfig = readConfigFresh();
    freshConfig.lastUpdateCheck = (/* @__PURE__ */ new Date()).toISOString();
    freshConfig.latestVersion = latest;
    writeConfig(freshConfig);
    return { current: VERSION, latest, updateAvailable: isNewerSemver(latest, VERSION) };
  } catch {
    return fallbackResult(config.latestVersion);
  }
}
function updateCheckDue(config = readConfig()) {
  if (updateCheckDisabled()) return false;
  if (!config.lastUpdateCheck || !config.latestVersion || !isSafeVersion(config.latestVersion)) {
    return true;
  }
  const fresh = Date.now() - new Date(config.lastUpdateCheck).getTime() < CHECK_INTERVAL_MS;
  return !fresh;
}
function cachedUpdateCheck() {
  return fallbackResult(readConfig().latestVersion);
}
function fallbackResult(cachedLatest) {
  const safeCached = cachedLatest && isSafeVersion(cachedLatest) ? cachedLatest : void 0;
  return {
    current: VERSION,
    latest: safeCached ?? VERSION,
    updateAvailable: safeCached ? isNewerSemver(safeCached, VERSION) : false
  };
}
function getUpdateMeta() {
  const config = readConfig();
  return {
    version: VERSION,
    latestVersion: config.latestVersion,
    updateAvailable: config.latestVersion ? isNewerSemver(config.latestVersion, VERSION) : false
  };
}
function withMeta(data, options) {
  const meta = getUpdateMeta();
  if (options?.deprecated) meta.deprecated = true;
  return { ...data, _meta: meta };
}
function printDeprecationNotice(command) {
  process.stderr.write(
    `'hyperframes ${command}' is deprecated and will be removed in a future release. Use 'hyperframes check' instead.
`
  );
}
function updateCheckDisabled() {
  if (isDevMode()) return true;
  if (process.env["CI"] === "true" || process.env["CI"] === "1") return true;
  return process.env["HYPERFRAMES_NO_UPDATE_CHECK"] === "1";
}
function updateNoticesSuppressed() {
  return updateCheckDisabled() || !process.stderr.isTTY;
}
function printUpdateNotice() {
  if (updateNoticesSuppressed()) return;
  const meta = getUpdateMeta();
  if (!meta.updateAvailable || !meta.latestVersion) return;
  const safeLatest = isSafeVersion(meta.latestVersion);
  const managerCommand = safeLatest ? detectInstaller().installCommand(meta.latestVersion) : null;
  const command = managerCommand ?? "npx hyperframes@latest";
  process.stderr.write(
    `
  Update available: ${meta.version} \u2192 ${meta.latestVersion}
  Run: ${command}

`
  );
}
var STALE_PIN_THROTTLE_MS = 24 * 60 * 60 * 1e3;
function printStalePinNotice(cwd = process.cwd()) {
  if (updateCheckDisabled()) return;
  let scripts = {};
  try {
    const pkgPath = join(cwd, "package.json");
    if (!existsSync(pkgPath)) return;
    scripts = JSON.parse(readFileSync(pkgPath, "utf-8")).scripts ?? {};
  } catch {
    return;
  }
  const pins = readPinnedHyperframesVersions(scripts);
  const newerPins = pins.filter((v) => isNewerSemver(v, VERSION)).sort(compareVersions);
  if (newerPins.length > 0) {
    process.stderr.write(
      `
  This is hyperframes ${VERSION}, but this project pins hyperframes@${newerPins.join(", ")}.
  Run it through the project's npm scripts, or npx hyperframes@${newerPins.at(-1)}.

`
    );
    return;
  }
  const latest = getUpdateMeta().latestVersion;
  if (!latest || !isSafeVersion(latest)) return;
  const stale = pins.filter((v) => {
    try {
      return compareVersions(latest, v) > 0;
    } catch {
      return false;
    }
  });
  if (stale.length === 0) return;
  const last = readConfig().lastStalePinNoticeAt ?? 0;
  if (Date.now() - last < STALE_PIN_THROTTLE_MS) return;
  const config = readConfigFresh();
  config.lastStalePinNoticeAt = Date.now();
  writeConfig(config);
  process.stderr.write(
    `
  This project pins hyperframes@${stale.join(", ")} (latest ${latest}).
  Bump it: npx hyperframes@latest upgrade --project

`
  );
}

export {
  detectInstaller,
  installInvocation,
  isSafeVersion,
  rewritePinnedHyperframesText,
  rewriteProjectPinnedScripts,
  checkForUpdate,
  updateCheckDue,
  cachedUpdateCheck,
  getUpdateMeta,
  withMeta,
  printDeprecationNotice,
  updateCheckDisabled,
  updateNoticesSuppressed,
  printUpdateNotice,
  printStalePinNotice
};
