import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  updateNoticesSuppressed
} from "./chunk-5FABXOBL.js";
import {
  hostAnswers
} from "./chunk-K4WIOZFP.js";
import {
  readConfig,
  readConfigFresh,
  writeConfig
} from "./chunk-2SBJMKLH.js";

// src/utils/skillsManifest.ts
import { execFile } from "child_process";
import { createHash } from "crypto";
import {
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync
} from "fs";
import { homedir } from "os";
import { isAbsolute, join, relative, resolve, sep } from "path";
import { promisify } from "util";
var execFileAsync = promisify(execFile);
var TEXT_EXT = /* @__PURE__ */ new Set([
  ".md",
  ".txt",
  ".mjs",
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".html",
  ".css",
  ".json",
  ".svg",
  ".csv",
  ".yml",
  ".yaml"
]);
var DEFAULT_REPO_SLUG = "heygen-com/hyperframes";
var MANIFEST_FILE = "skills-manifest.json";
var FETCH_TIMEOUT_MS = 4e3;
var ENTRY_SKILL = "hyperframes";
function isCoreSkill(name) {
  return name === ENTRY_SKILL || name.startsWith("hyperframes-") || name === "media-use";
}
var FALLBACK_CORE_SKILLS = [
  "hyperframes",
  "hyperframes-animation",
  "hyperframes-audio",
  "hyperframes-cli",
  "hyperframes-core",
  "hyperframes-creative",
  "hyperframes-keyframes",
  "hyperframes-registry",
  "hyperframes-studio",
  "media-use"
];
function listFilesSorted(dir) {
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      if (name === ".DS_Store") continue;
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk(p);
      else out.push(p);
    }
  };
  walk(dir);
  return out.sort();
}
function hashSkillBundle(skillDir) {
  const files = listFilesSorted(skillDir);
  const h = createHash("sha256");
  for (const f of files) {
    const rel = relative(skillDir, f).split(sep).join("/");
    h.update(rel);
    h.update("\0");
    const ext = rel.slice(rel.lastIndexOf("."));
    const buf = readFileSync(f);
    if (TEXT_EXT.has(ext)) h.update(buf.toString("utf8").replace(/\r\n/g, "\n"), "utf8");
    else h.update(buf);
    h.update("\0");
  }
  return { hash: h.digest("hex").slice(0, 16), files: files.length };
}
function buildManifest(skillsRoot, meta) {
  const names = readdirSync(skillsRoot).filter((n) => existsSync(join(skillsRoot, n, "SKILL.md"))).sort();
  const skills = {};
  for (const name of names) skills[name] = hashSkillBundle(join(skillsRoot, name));
  return { source: meta.source, skills };
}
function agentLabel(hostDir) {
  const name = hostDir.replace(/^\.+/, "");
  return name === "claude" ? "claude-code" : name || "unknown";
}
function agentFromDir(dir) {
  const parts = dir.split(sep).filter(Boolean);
  const i = parts.lastIndexOf("skills");
  return agentLabel(i > 0 ? parts[i - 1] : parts[parts.length - 1] ?? "");
}
function listSubdirs(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory() || e.isSymbolicLink()).map((e) => e.name);
  } catch {
    return [];
  }
}
function discoverSkillRoots(base, scope) {
  const candidates = [];
  const add = (hostBase, host) => {
    const dir = join(hostBase, host, "skills");
    if (existsSync(dir) && statSync(dir).isDirectory())
      candidates.push({ dir, agent: agentLabel(host), scope });
  };
  for (const host of listSubdirs(base)) add(base, host);
  const xdg = join(base, ".config");
  for (const host of listSubdirs(xdg)) add(xdg, host);
  return candidates.sort((a, b) => {
    if (a.agent !== b.agent) {
      if (a.agent === "claude-code") return -1;
      if (b.agent === "claude-code") return 1;
      return a.agent.localeCompare(b.agent);
    }
    return a.dir.localeCompare(b.dir);
  });
}
function scopeForDir(dir, home, cwd) {
  const norm = (p) => {
    const r = resolve(p);
    return r.endsWith(sep) ? r : r + sep;
  };
  const d = norm(dir);
  if (d.startsWith(norm(cwd))) return "project";
  if (d.startsWith(norm(home))) return "global";
  return "project";
}
function locateInstall(skillNames, opts = {}) {
  if (opts.dir) {
    return existsSync(opts.dir) ? {
      dir: opts.dir,
      agent: agentFromDir(opts.dir),
      scope: scopeForDir(opts.dir, opts.home ?? homedir(), opts.cwd ?? process.cwd())
    } : null;
  }
  const roots = [
    ...discoverSkillRoots(opts.home ?? homedir(), "global"),
    ...discoverSkillRoots(opts.cwd ?? process.cwd(), "project")
  ];
  for (const root of roots) {
    if (skillNames.some((n) => existsSync(join(root.dir, n, "SKILL.md")))) return root;
  }
  return null;
}
function presentSkills(skillNames, opts = {}) {
  const root = locateInstall([...skillNames], opts);
  if (!root) return [];
  return skillNames.filter((name) => existsSync(join(root.dir, name, "SKILL.md")));
}
function hashInstalled(root, skillNames) {
  const out = {};
  for (const name of skillNames) {
    const skillDir = join(root.dir, name);
    if (existsSync(join(skillDir, "SKILL.md"))) out[name] = hashSkillBundle(skillDir);
  }
  return out;
}
function diffSkills(installed, latest) {
  const skills = [];
  const summary = { current: 0, outdated: 0, missing: 0, coreMissing: 0 };
  for (const name of Object.keys(latest.skills).sort()) {
    const latestEntry = latest.skills[name];
    const installedEntry = installed[name];
    let status;
    if (!installedEntry) status = "missing";
    else if (installedEntry.hash === latestEntry.hash) status = "current";
    else status = "outdated";
    if (status === "current") summary.current++;
    else if (status === "outdated") summary.outdated++;
    else {
      summary.missing++;
      if (isCoreSkill(name)) summary.coreMissing++;
    }
    skills.push({
      name,
      status,
      installedHash: installedEntry?.hash,
      latestHash: latestEntry.hash
    });
  }
  return {
    // "Update available" means the install is stale, not merely partial:
    // anything installed-but-outdated, or a missing CORE skill (the entry
    // router + shared domain skills every workflow needs). A missing
    // on-demand skill is NOT an update — it installs when its workflow is
    // triggered (`hyperframes skills update <name>`). Counting it here is what
    // used to make `init` re-pull the full skill set onto machines that
    // deliberately installed a subset.
    updateAvailable: summary.outdated > 0 || summary.coreMissing > 0,
    summary,
    skills
  };
}
function repoSlug(s) {
  return (s ?? "").replace(/^git\+/, "").replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").toLowerCase();
}
function skillsAttributedToSource(lock, source) {
  const want = repoSlug(source);
  if (!want || !lock?.skills) return [];
  return Object.entries(lock.skills).filter(([, e]) => repoSlug(e.source) === want || repoSlug(e.sourceUrl) === want).map(([name]) => name);
}
var SKILLS_CLI_LOCK_PATHS_VERIFIED_AT = "vercel-labs/skills@v1.5.13";
function lockPathForScope(scope, opts) {
  if (scope === "project") return join(opts.cwd ?? process.cwd(), "skills-lock.json");
  const xdgStateHome = process.env.XDG_STATE_HOME;
  if (xdgStateHome) return join(xdgStateHome, "skills", ".skill-lock.json");
  return join(opts.home ?? homedir(), ".agents", ".skill-lock.json");
}
function readSkillLock(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}
function hyperframesSkillNames(opts) {
  const lockPath = lockPathForScope(opts.scope, { cwd: opts.cwd, home: opts.home });
  return skillsAttributedToSource(readSkillLock(lockPath), DEFAULT_REPO_SLUG);
}
var MANIFEST_COVERAGE_ROOT = "skills/";
function manifestCoversSkill(entry) {
  const path = entry?.skillPath;
  return typeof path === "string" && path.startsWith(MANIFEST_COVERAGE_ROOT);
}
function detectRemoved(root, latest, opts) {
  const lock = readSkillLock(lockPathForScope(root.scope, opts));
  const removed = skillsAttributedToSource(lock, latest.source).filter((name) => manifestCoversSkill(lock?.skills?.[name])).filter((name) => !(name in latest.skills)).sort().map((name) => ({ name, status: "removed" }));
  return { removed, lockMissing: lock === null };
}
function pruneOrphanedLockEntries(names, scope, opts = {}) {
  const path = lockPathForScope(scope, opts);
  const lock = readSkillLock(path);
  if (!lock?.skills) return [];
  const pruned = names.filter((name) => name in lock.skills);
  if (pruned.length === 0) return [];
  for (const name of pruned) delete lock.skills[name];
  const mode = statSync(path).mode & 511;
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, JSON.stringify(lock, null, 2), { mode });
  renameSync(tmp, path);
  return pruned;
}
function findRepoManifest(cwd = process.cwd()) {
  let dir = cwd;
  for (let i = 0; i < 16; i++) {
    const p = join(dir, MANIFEST_FILE);
    if (existsSync(p)) return p;
    const parent = join(dir, "..");
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}
function asSkillsManifest(data, sourceLabel) {
  const m = data;
  if (!m || typeof m !== "object" || typeof m.skills !== "object" || m.skills === null) {
    throw new Error(`Malformed skills manifest from ${sourceLabel}`);
  }
  return m;
}
async function fetchManifest(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Connection: "close" } });
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
    return asSkillsManifest(await res.json(), url);
  } finally {
    clearTimeout(timeout);
  }
}
async function remoteHeadSha(repoSlug2) {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["ls-remote", `https://github.com/${repoSlug2}.git`, "refs/heads/main"],
      {
        timeout: FETCH_TIMEOUT_MS,
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
        windowsHide: true
      }
    );
    const sha = stdout.split(/\s+/)[0]?.trim() ?? "";
    return /^[0-9a-f]{40}$/.test(sha) ? sha : null;
  } catch {
    return null;
  }
}
function resolveLocalManifest(source) {
  const direct = source.endsWith(".json") ? source : join(source, MANIFEST_FILE);
  if (existsSync(direct)) return JSON.parse(readFileSync(direct, "utf8"));
  const skillsRoot = source.endsWith("skills") ? source : join(source, "skills");
  if (existsSync(skillsRoot)) return buildManifest(skillsRoot, { source: skillsRoot });
  throw new Error(`No skills manifest found at: ${source}`);
}
async function fetchRemoteManifest(source) {
  if (source?.startsWith("http")) return fetchManifest(source);
  const repoSlug2 = source ?? DEFAULT_REPO_SLUG;
  const sha = await remoteHeadSha(repoSlug2);
  if (sha) {
    try {
      return await fetchManifest(
        `https://raw.githubusercontent.com/${repoSlug2}/${sha}/${MANIFEST_FILE}`
      );
    } catch {
    }
  }
  return fetchManifest(`https://raw.githubusercontent.com/${repoSlug2}/main/${MANIFEST_FILE}`);
}
async function resolveLatestManifest(source, cwd = process.cwd(), opts = {}) {
  if (source && (source.startsWith(".") || isAbsolute(source))) {
    return resolveLocalManifest(source);
  }
  if (!source && !opts.canonical) {
    const repoManifest = findRepoManifest(cwd);
    if (repoManifest) return JSON.parse(readFileSync(repoManifest, "utf8"));
  }
  return fetchRemoteManifest(source);
}
async function checkSkills(opts = {}) {
  const latest = await resolveLatestManifest(opts.source, opts.cwd, { canonical: opts.canonical });
  const skillNames = Object.keys(latest.skills);
  const root = locateInstall(skillNames, { dir: opts.dir, cwd: opts.cwd, home: opts.home });
  const installed = root ? hashInstalled(root, skillNames) : {};
  const diff = diffSkills(installed, latest);
  const removedResult = root ? detectRemoved(root, latest, { cwd: opts.cwd, home: opts.home }) : { removed: [], lockMissing: false };
  const { removed, lockMissing } = removedResult;
  return {
    location: root?.dir ?? null,
    agent: root?.agent ?? null,
    scope: root?.scope ?? null,
    // Removed skills also mean the install isn't reconciled with the manifest —
    // `skills update` now prunes them, so they count toward "update available".
    updateAvailable: diff.updateAvailable || removed.length > 0,
    summary: { ...diff.summary, removed: removed.length },
    skills: [...diff.skills, ...removed],
    lockMissing
  };
}

// src/utils/skillsUpdateCheck.ts
var CHECK_INTERVAL_MS = 24 * 60 * 60 * 1e3;
function getSkillsUpdateMeta() {
  const config = readConfig();
  return {
    updateAvailable: config.skillsUpdateAvailable ?? false,
    outdated: config.skillsOutdatedCount ?? 0,
    missing: config.skillsMissingCount ?? 0,
    removed: config.skillsRemovedCount ?? 0
  };
}
function cacheFresh(lastSkillsCheck, now) {
  if (!lastSkillsCheck) return false;
  return now - new Date(lastSkillsCheck).getTime() < CHECK_INTERVAL_MS;
}
async function refreshSkillsCache() {
  if (!await hostAnswers("github.com")) return;
  const result = await checkSkills({ canonical: true });
  if (result.location) {
    const config = readConfigFresh();
    config.lastSkillsCheck = (/* @__PURE__ */ new Date()).toISOString();
    config.skillsUpdateAvailable = result.updateAvailable;
    config.skillsOutdatedCount = result.summary.outdated;
    config.skillsMissingCount = result.summary.coreMissing;
    config.skillsRemovedCount = result.summary.removed;
    writeConfig(config);
  }
}
function invalidateSkillsCache() {
  try {
    const config = readConfigFresh();
    delete config.lastSkillsCheck;
    delete config.skillsUpdateAvailable;
    delete config.skillsOutdatedCount;
    delete config.skillsMissingCount;
    delete config.skillsRemovedCount;
    writeConfig(config);
  } catch {
  }
}
function skillsCheckDue() {
  if (process.env["HYPERFRAMES_SKIP_SKILLS"] === "1" || updateNoticesSuppressed()) return false;
  return !cacheFresh(readConfig().lastSkillsCheck, Date.now());
}
function skillsNoticeText(meta) {
  const total = meta.outdated + meta.missing + meta.removed;
  if (total < 1) return null;
  const noun = total === 1 ? "skill" : "skills";
  return `
  ${total} HyperFrames ${noun} out of date or missing.
  Run: npx hyperframes skills update

`;
}
function printSkillsUpdateNotice() {
  if (process.env["HYPERFRAMES_SKIP_SKILLS"] === "1" || updateNoticesSuppressed()) return;
  const text = skillsNoticeText(getSkillsUpdateMeta());
  if (text) process.stderr.write(text);
}

export {
  isCoreSkill,
  FALLBACK_CORE_SKILLS,
  presentSkills,
  SKILLS_CLI_LOCK_PATHS_VERIFIED_AT,
  hyperframesSkillNames,
  pruneOrphanedLockEntries,
  checkSkills,
  refreshSkillsCache,
  invalidateSkillsCache,
  skillsCheckDue,
  printSkillsUpdateNotice
};
