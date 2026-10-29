import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  buildNpxCommand
} from "./chunk-6BEFEWFB.js";
import {
  trackSkillsInstallSkipped
} from "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import {
  diag
} from "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  R
} from "./chunk-WMQNIQDJ.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  CliResultSignal,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-USDEMXXL.js";
import {
  FALLBACK_CORE_SKILLS,
  SKILLS_CLI_LOCK_PATHS_VERIFIED_AT,
  checkSkills,
  hyperframesSkillNames,
  invalidateSkillsCache,
  isCoreSkill,
  presentSkills,
  pruneOrphanedLockEntries
} from "./chunk-T54WZH5O.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/skills.ts
import { execFileSync, spawn } from "child_process";

// src/utils/skillsMirror.ts
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  unlinkSync
} from "fs";
import { homedir } from "os";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "path";

// src/utils/agentDirs.generated.ts
var AGENT_GLOBAL_DIRS = [
  { agent: "aider-desk", base: "home", sub: ".aider-desk/skills" },
  { agent: "amp", base: "configHome", sub: "agents/skills" },
  { agent: "antigravity", base: "home", sub: ".gemini/antigravity/skills" },
  { agent: "antigravity-cli", base: "home", sub: ".gemini/antigravity-cli/skills" },
  { agent: "astrbot", base: "home", sub: ".astrbot/data/skills" },
  { agent: "autohand-code", base: "autohandHome", sub: "skills" },
  { agent: "augment", base: "home", sub: ".augment/skills" },
  { agent: "bob", base: "home", sub: ".bob/skills" },
  { agent: "claude-code", base: "claudeHome", sub: "skills" },
  { agent: "openclaw", base: "home", sub: ".openclaw/skills" },
  { agent: "cline", base: "home", sub: ".agents/skills" },
  { agent: "codearts-agent", base: "home", sub: ".codeartsdoer/skills" },
  { agent: "codebuddy", base: "home", sub: ".codebuddy/skills" },
  { agent: "codemaker", base: "home", sub: ".codemaker/skills" },
  { agent: "codestudio", base: "home", sub: ".codestudio/skills" },
  { agent: "codex", base: "codexHome", sub: "skills" },
  { agent: "command-code", base: "home", sub: ".commandcode/skills" },
  { agent: "continue", base: "home", sub: ".continue/skills" },
  { agent: "cortex", base: "home", sub: ".snowflake/cortex/skills" },
  { agent: "crush", base: "home", sub: ".config/crush/skills" },
  { agent: "cursor", base: "home", sub: ".cursor/skills" },
  { agent: "deepagents", base: "home", sub: ".deepagents/agent/skills" },
  { agent: "devin", base: "configHome", sub: "devin/skills" },
  { agent: "dexto", base: "home", sub: ".agents/skills" },
  { agent: "droid", base: "home", sub: ".factory/skills" },
  { agent: "firebender", base: "home", sub: ".firebender/skills" },
  { agent: "forgecode", base: "home", sub: ".forge/skills" },
  { agent: "gemini-cli", base: "home", sub: ".gemini/skills" },
  { agent: "github-copilot", base: "home", sub: ".copilot/skills" },
  { agent: "goose", base: "configHome", sub: "goose/skills" },
  { agent: "hermes-agent", base: "hermesHome", sub: "skills" },
  { agent: "inference-sh", base: "home", sub: ".inferencesh/skills" },
  { agent: "jazz", base: "home", sub: ".jazz/skills" },
  { agent: "junie", base: "home", sub: ".junie/skills" },
  { agent: "iflow-cli", base: "home", sub: ".iflow/skills" },
  { agent: "kilo", base: "home", sub: ".kilocode/skills" },
  { agent: "kimi-code-cli", base: "home", sub: ".agents/skills" },
  { agent: "kiro-cli", base: "home", sub: ".kiro/skills" },
  { agent: "kode", base: "home", sub: ".kode/skills" },
  { agent: "lingma", base: "home", sub: ".lingma/skills" },
  { agent: "loaf", base: "home", sub: ".agents/skills" },
  { agent: "mcpjam", base: "home", sub: ".mcpjam/skills" },
  { agent: "mistral-vibe", base: "vibeHome", sub: "skills" },
  { agent: "moxby", base: "home", sub: ".moxby/skills" },
  { agent: "mux", base: "home", sub: ".mux/skills" },
  { agent: "opencode", base: "configHome", sub: "opencode/skills" },
  { agent: "openhands", base: "home", sub: ".openhands/skills" },
  { agent: "ona", base: "home", sub: ".ona/skills" },
  { agent: "pi", base: "home", sub: ".pi/agent/skills" },
  { agent: "qoder", base: "home", sub: ".qoder/skills" },
  { agent: "qoder-cn", base: "home", sub: ".qoder-cn/skills" },
  { agent: "qwen-code", base: "home", sub: ".qwen/skills" },
  { agent: "replit", base: "configHome", sub: "agents/skills" },
  { agent: "reasonix", base: "home", sub: ".reasonix/skills" },
  { agent: "rovodev", base: "home", sub: ".rovodev/skills" },
  { agent: "roo", base: "home", sub: ".roo/skills" },
  { agent: "tabnine-cli", base: "home", sub: ".tabnine/agent/skills" },
  { agent: "terramind", base: "home", sub: ".terramind/skills" },
  { agent: "tinycloud", base: "home", sub: ".tinycloud/skills" },
  { agent: "trae", base: "home", sub: ".trae/skills" },
  { agent: "trae-cn", base: "home", sub: ".trae-cn/skills" },
  { agent: "warp", base: "home", sub: ".agents/skills" },
  { agent: "windsurf", base: "home", sub: ".codeium/windsurf/skills" },
  { agent: "zed", base: "home", sub: ".agents/skills" },
  { agent: "zencoder", base: "home", sub: ".zencoder/skills" },
  { agent: "zenflow", base: "home", sub: ".zencoder/skills" },
  { agent: "neovate", base: "home", sub: ".neovate/skills" },
  { agent: "pochi", base: "home", sub: ".pochi/skills" },
  { agent: "adal", base: "home", sub: ".adal/skills" },
  { agent: "universal", base: "configHome", sub: "agents/skills" }
];

// src/utils/skillsMirror.ts
var UNIVERSAL_STORE_READERS = /* @__PURE__ */ new Set(["pi", "codex"]);
function canonicalCandidate(input) {
  let current = resolve(input);
  const missing = [];
  while (true) {
    try {
      lstatSync(current);
      break;
    } catch (error) {
      const code = error.code;
      if (code !== "ENOENT" && code !== "ENOTDIR") return null;
      const parent = dirname(current);
      if (parent === current) return null;
      missing.unshift(basename(current));
      current = parent;
    }
  }
  try {
    return resolve(realpathSync(current), ...missing);
  } catch {
    return null;
  }
}
function pathsOverlap(left, right) {
  const fromLeft = relative(left, right);
  const leftContainsRight = fromLeft === "" || fromLeft !== ".." && !fromLeft.startsWith(`..${sep}`) && !isAbsolute(fromLeft);
  if (leftContainsRight) return true;
  const fromRight = relative(right, left);
  return fromRight !== ".." && !fromRight.startsWith(`..${sep}`) && !isAbsolute(fromRight);
}
function sameExistingNode(left, right) {
  try {
    const leftStat = statSync(left);
    const rightStat = statSync(right);
    return leftStat.dev === rightStat.dev && leftStat.ino === rightStat.ino;
  } catch {
    return false;
  }
}
function targetSafety(target, protectedPaths) {
  const canonical = canonicalCandidate(target);
  if (!canonical) return "unresolvable_target";
  for (const protectedPath of protectedPaths) {
    if (pathsOverlap(canonical, protectedPath.canonical) || sameExistingNode(target, protectedPath.lexical)) {
      return "aliases_install_owned_store";
    }
  }
  return null;
}
function skillTargetSafety(sourceSkill, targetSkill, targetDirSafety) {
  const directoryReason = targetDirSafety();
  if (directoryReason) return directoryReason;
  try {
    if (lstatSync(targetSkill).isSymbolicLink()) return null;
  } catch (error) {
    if (error.code !== "ENOENT") return "unresolvable_target";
  }
  const sourceCanonical = canonicalCandidate(sourceSkill);
  const targetCanonical = canonicalCandidate(targetSkill);
  if (!sourceCanonical || !targetCanonical) return "unresolvable_target";
  if (pathsOverlap(sourceCanonical, targetCanonical) || sameExistingNode(sourceSkill, targetSkill)) {
    return "aliases_install_owned_store";
  }
  return null;
}
function resolveBases(home, env) {
  const xdg = env["XDG_CONFIG_HOME"]?.trim();
  return {
    home,
    configHome: xdg && isAbsolute(xdg) ? xdg : join(home, ".config"),
    codexHome: env["CODEX_HOME"]?.trim() || join(home, ".codex"),
    claudeHome: env["CLAUDE_CONFIG_DIR"]?.trim() || join(home, ".claude"),
    vibeHome: env["VIBE_HOME"]?.trim() || join(home, ".vibe"),
    hermesHome: env["HERMES_HOME"]?.trim() || join(home, ".hermes"),
    autohandHome: env["AUTOHAND_HOME"]?.trim() || join(home, ".autohand")
  };
}
function listSkillDirs(store) {
  return readdirSync(store, { withFileTypes: true }).filter(
    (e) => (e.isDirectory() || e.isSymbolicLink()) && existsSync(join(store, e.name, "SKILL.md"))
  ).map((e) => e.name);
}
function linkOrCopy(sourceSkill, targetSkill, platform, safety) {
  const unsafe = safety();
  if (unsafe) return unsafe;
  rmSync(targetSkill, { recursive: true, force: true });
  if (platform === "win32") {
    cpSync(sourceSkill, targetSkill, { recursive: true });
  } else {
    symlinkSync(relative(dirname(targetSkill), sourceSkill), targetSkill);
  }
  return null;
}
function mirrorInto(targetDir, source, skills, platform, safety) {
  const beforeCreate = safety();
  if (beforeCreate) return { mirrored: false, skipReason: beforeCreate };
  try {
    mkdirSync(targetDir, { recursive: true });
  } catch {
    return { mirrored: false };
  }
  const afterCreate = safety();
  if (afterCreate) return { mirrored: false, skipReason: afterCreate };
  for (const skill of skills) {
    try {
      const sourceSkill = join(source, skill);
      const targetSkill = join(targetDir, skill);
      const skipReason = linkOrCopy(
        sourceSkill,
        targetSkill,
        platform,
        () => skillTargetSafety(sourceSkill, targetSkill, safety)
      );
      if (skipReason) return { mirrored: false, skipReason };
    } catch {
    }
  }
  return { mirrored: true };
}
function removeMirrorLinks(targetDir, source, universalStore, skills, safety) {
  const unsafe = safety();
  if (unsafe) return unsafe;
  for (const skill of skills) {
    const targetSkill = join(targetDir, skill);
    try {
      if (!existsSync(join(universalStore, skill, "SKILL.md"))) continue;
      if (!lstatSync(targetSkill).isSymbolicLink()) continue;
      if (realpathSync(targetSkill) !== realpathSync(join(source, skill))) continue;
      unlinkSync(targetSkill);
    } catch {
    }
  }
  return null;
}
function mirrorGlobalSkills(opts) {
  const home = opts.home ?? homedir();
  const platform = opts.platform ?? process.platform;
  const bases = resolveBases(home, opts.env ?? process.env);
  const source = join(bases.claudeHome, "skills");
  const universalStore = join(home, ".agents", "skills");
  if (!existsSync(source)) return { source: null, mirrored: [], skipped: [] };
  const allowed = new Set(opts.skills);
  const skills = listSkillDirs(source).filter((name) => allowed.has(name));
  if (skills.length === 0) return { source, mirrored: [], skipped: [] };
  const protectedPaths = [source, universalStore].map((lexical) => ({
    lexical,
    canonical: canonicalCandidate(lexical)
  }));
  const resolvedProtectedPaths = protectedPaths.filter(
    (entry) => entry.canonical !== null
  );
  if (resolvedProtectedPaths.length !== protectedPaths.length) {
    return { source, mirrored: [], skipped: [] };
  }
  const mirrored = [];
  const skipped = [];
  for (const { agent, base, sub } of AGENT_GLOBAL_DIRS) {
    const targetDir = join(bases[base], ...sub.split("/").filter(Boolean));
    if (targetDir === source || targetDir === universalStore) continue;
    if (UNIVERSAL_STORE_READERS.has(agent)) {
      const skipReason = removeMirrorLinks(
        targetDir,
        source,
        universalStore,
        skills,
        () => targetSafety(targetDir, resolvedProtectedPaths)
      );
      if (skipReason) skipped.push({ agent, dir: targetDir, reason: skipReason });
      continue;
    }
    if (!existsSync(dirname(targetDir))) continue;
    const attempt = mirrorInto(
      targetDir,
      source,
      skills,
      platform,
      () => targetSafety(targetDir, resolvedProtectedPaths)
    );
    if (attempt.mirrored) mirrored.push({ agent, dir: targetDir });
    else if (attempt.skipReason)
      skipped.push({ agent, dir: targetDir, reason: attempt.skipReason });
  }
  return { source, mirrored, skipped };
}

// src/commands/skills.ts
var examples = [
  ["Install all HyperFrames skills", "hyperframes skills"],
  ["Check whether installed skills are up to date", "hyperframes skills check"],
  ["Check, machine-readable (for agents / CI)", "hyperframes skills check --json"],
  ["Update the core set + everything already installed", "hyperframes skills update"],
  ["Also install one workflow (on-demand install)", "hyperframes skills update pr-to-video"]
];
function hasNpx() {
  const npx = buildNpxCommand(["--version"]);
  try {
    execFileSync(npx.command, npx.args, { stdio: "ignore", timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
function hasGit() {
  try {
    execFileSync("git", ["--version"], { stdio: "ignore", timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
function spawnNpx(args, opts = {}) {
  const npx = buildNpxCommand(args);
  return new Promise((resolve2, reject) => {
    const child = spawn(npx.command, npx.args, {
      // Route the child's stdout to the parent's stderr (fd 2), keeping stdin
      // inherited. `skills update --json` runs this installer before printing its
      // JSON envelope on stdout; child progress chatter on stdout would corrupt it.
      // Diagnostics belong on stderr regardless of mode, so this is safe for the
      // interactive path too (the user still sees the output).
      stdio: ["inherit", 2, 2],
      // We install with --full-depth (a full `git clone` of the repo, the only
      // path that bypasses the laggy skills.sh blob — see GLOBAL_INSTALL_ARGS_TAIL),
      // which is heavier than the blob fetch, so allow more headroom.
      timeout: 3e5,
      cwd: opts.cwd,
      env: {
        ...process.env,
        // GH #316 — the upstream `skills` CLI shells out to `git clone`. When
        // Git's clone-hook protection is active (default in 2.45.1, reverted in
        // 2.45.2, still present on many corporate/CI setups), a globally
        // registered `git lfs install` post-checkout hook aborts the clone. The
        // args reaching this function are hardcoded (no user input), so opting
        // out is safe.
        GIT_CLONE_PROTECTION_ACTIVE: "0",
        // Skills are text; the repo's LFS objects are unrelated binary assets.
        // Skip the smudge so --full-depth doesn't drag down (or fail on) large
        // LFS blobs the install doesn't need.
        GIT_LFS_SKIP_SMUDGE: "1"
      }
    });
    child.on("close", (code, signal) => {
      if (code === 0) resolve2();
      else if (signal === "SIGINT" || code === 130)
        reject(new CliResultSignal({ exitCode: 0, kind: "success", presented: true }));
      else reject(new Error(`npx ${args.join(" ")} exited with code ${code}`));
    });
    child.on("error", reject);
  });
}
var GLOBAL_INSTALL_ARGS_TAIL = [
  "--global",
  "--agent",
  "claude-code",
  "universal",
  "--copy",
  "--full-depth",
  "--yes"
];
function skillSelectionArgs(selection) {
  const names = selection === "*" ? ["*"] : selection;
  return names.flatMap((name) => ["--skill", name]);
}
function runSkillsAdd(source, selection, opts = {}) {
  return spawnNpx(
    ["skills", "add", source, ...skillSelectionArgs(selection), ...GLOBAL_INSTALL_ARGS_TAIL],
    opts
  );
}
var PLAIN_SKILL_NAME = /^[a-z0-9][a-z0-9._-]*$/i;
function runSkillsRemove(names, opts) {
  const safe = names.filter((n) => PLAIN_SKILL_NAME.test(n));
  const rejected = names.filter((n) => !PLAIN_SKILL_NAME.test(n));
  if (rejected.length) {
    R.warn(c.warn(`Skipping unexpected skill name(s): ${rejected.join(", ")}`));
  }
  if (!safe.length) return Promise.resolve();
  return spawnNpx(["skills", "remove", ...safe, ...opts.global ? ["-g"] : [], "--yes"]);
}
var SOURCES = [{ name: "HyperFrames", url: "https://github.com/heygen-com/hyperframes" }];
function mirrorToInstalledAgents() {
  try {
    const names = hyperframesSkillNames({ scope: "global" });
    if (names.length === 0) return;
    const { mirrored, skipped } = mirrorGlobalSkills({ skills: names });
    const n = mirrored.length;
    if (n > 0) {
      diag.notice(
        c.dim(`Linked skills into ${n} other agent ${n === 1 ? "directory" : "directories"}.`)
      );
    }
    if (skipped.length > 0) {
      const agents = [...new Set(skipped.map((entry) => entry.agent))].join(", ");
      diag.warn(
        c.warn(
          `Skipped unsafe skill mirror target${skipped.length === 1 ? "" : "s"} for ${agents}; canonical skill stores were left unchanged.`
        )
      );
    }
  } catch {
  }
}
var SKILLS_TOOLING = [
  {
    has: hasNpx,
    error: "npx not found. Install Node.js and retry.",
    reason: "npx_missing",
    report: () => R.error(c.error("npx not found. Install Node.js and retry."))
  },
  {
    has: hasGit,
    error: "git not found. Install git and retry to add AI coding skills.",
    reason: "git_missing",
    // Skip cleanly rather than letting the upstream clone dump a noisy
    // multi-line `spawn git ENOENT` / "Installation failed" abort.
    report: () => console.log(c.dim("Skipping AI coding skills: git not available."))
  }
];
function skillsToolingReady(strict) {
  for (const tool of SKILLS_TOOLING) {
    if (tool.has()) continue;
    if (strict) throw new Error(tool.error);
    tool.report();
    trackSkillsInstallSkipped({ reason: tool.reason });
    return false;
  }
  return true;
}
function sanitizeSelection(selection) {
  if (selection === "*") return selection;
  const rejected = selection.filter((n) => !PLAIN_SKILL_NAME.test(n));
  if (rejected.length) {
    R.warn(c.warn(`Skipping unexpected skill name(s): ${rejected.join(", ")}`));
  }
  const safe = selection.filter((n) => PLAIN_SKILL_NAME.test(n));
  return safe.length > 0 ? safe : null;
}
async function installSkills(selection, opts = {}) {
  const safeSelection = sanitizeSelection(selection);
  if (safeSelection === null) return;
  if (!skillsToolingReady(opts.strict ?? false)) return;
  for (const source of SOURCES) {
    diag.notice();
    diag.notice(c.bold(`Installing ${source.name} skills...`));
    diag.notice();
    try {
      await runSkillsAdd(source.url, safeSelection, opts);
    } catch (err) {
      if (opts.strict) throw err instanceof Error ? err : new Error(String(err));
      diag.warn(c.dim(`${source.name} skills skipped`));
    }
  }
  mirrorToInstalledAgents();
}
async function updateSkills(opts = {}) {
  const requested = [...new Set(opts.requested ?? [])];
  const strict = opts.strict ?? false;
  let check = null;
  try {
    check = await checkSkills({ cwd: opts.cwd, canonical: true });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("Malformed skills manifest")) {
      R.warn(
        c.warn(
          "Canonical skills manifest was malformed \u2014 falling back to presence-only mode (an upstream/CDN issue, not your network)."
        )
      );
    }
    check = null;
  }
  if (!check) {
    if (opts.all) {
      R.warn(
        c.warn(
          "Can't resolve the published skill set (manifest unreachable) \u2014 installing the pinned core set only. Re-run `hyperframes skills` online for the full set."
        )
      );
    }
    return updateSkillsOffline(requested, { strict, cwd: opts.cwd });
  }
  const manifestSkills = check.skills.filter((s) => s.status !== "removed");
  const manifestNames = new Set(manifestSkills.map((s) => s.name));
  const unknown = requested.filter((name) => !manifestNames.has(name));
  if (unknown.length) {
    const message = `Unknown skill(s): ${unknown.join(", ")}. Available: ${[...manifestNames].sort().join(", ")}`;
    if (strict) throw new Error(message);
    R.warn(c.warn(message));
  }
  const targets = manifestSkills.filter(
    (s) => opts.all === true || requested.includes(s.name) || isCoreSkill(s.name) || opts.refreshInstalled === true && s.status !== "missing"
  );
  const toInstall = targets.filter((s) => s.status === "missing" || s.status === "outdated");
  const result = {
    targets: targets.map((s) => s.name),
    installed: toInstall.map((s) => s.name),
    current: targets.filter((s) => s.status === "current").map((s) => s.name),
    unknown,
    presenceOnly: false
  };
  if (toInstall.length > 0) {
    await installSkills(result.installed, { cwd: opts.cwd, strict });
    verifyInstalled(result.installed, { strict, cwd: opts.cwd });
  }
  invalidateSkillsCache();
  return result;
}
function verifyInstalled(names, opts) {
  const present = new Set(presentSkills(names, { cwd: opts.cwd }));
  const absent = names.filter((name) => !present.has(name));
  if (absent.length === 0) return;
  const message = `Skill(s) still missing after install: ${absent.join(", ")}`;
  if (opts.strict) throw new Error(message);
  R.warn(c.warn(message));
}
async function updateSkillsOffline(requested, opts) {
  if (requested.length === 0 && opts.strict) {
    throw new Error(
      "can't check skills freshness (GitHub manifest unreachable) \u2014 refusing to report success. Retry when online."
    );
  }
  const targets = [.../* @__PURE__ */ new Set([...requested, ...FALLBACK_CORE_SKILLS])];
  const present = new Set(presentSkills(targets, { cwd: opts.cwd }));
  const absent = targets.filter((name) => !present.has(name));
  console.log(
    c.dim(
      absent.length === 0 ? "Skills freshness check unavailable (offline?) \u2014 installed skills found, continuing without a refresh." : `Skills freshness check unavailable (offline?) \u2014 attempting a blind install of: ${absent.join(", ")}`
    )
  );
  if (absent.length > 0) {
    await installSkills(absent, { cwd: opts.cwd, strict: opts.strict });
    verifyInstalled(absent, opts);
  }
  return {
    targets,
    installed: absent,
    current: [...present],
    unknown: [],
    presenceOnly: true
  };
}
function printSkillSection(result, status, title, mark, color, filter = () => true) {
  const items = result.skills.filter((s) => s.status === status && filter(s));
  if (!items.length) return;
  console.log();
  console.log(`  ${color(title)}`);
  for (const s of items) console.log(`    ${color(`${mark} ${s.name}`)}`);
}
function renderCheck(result) {
  const { summary } = result;
  console.log();
  console.log(c.bold("hyperframes skills"));
  console.log();
  if (!result.location) {
    console.log(`  ${c.dim("No HyperFrames skills found in the usual locations.")}`);
    console.log(`  ${c.accent("Install: npx hyperframes skills")}`);
    console.log();
    return;
  }
  console.log(`  ${c.bold("Location")}  ${c.dim(result.location)} ${c.dim(`(${result.agent})`)}`);
  console.log();
  const onDemandMissing = summary.missing - summary.coreMissing;
  const parts = [c.success(`\u2713 ${summary.current} current`)];
  if (summary.outdated) parts.push(c.warn(`\u2191 ${summary.outdated} outdated`));
  if (summary.coreMissing) parts.push(c.warn(`\u25E6 ${summary.coreMissing} core not installed`));
  if (onDemandMissing) parts.push(c.dim(`\u25E6 ${onDemandMissing} available on demand`));
  if (summary.removed) parts.push(c.warn(`\u2717 ${summary.removed} removed upstream`));
  console.log(`  ${parts.join("   ")}`);
  printSkillSection(result, "outdated", "Outdated:", "\u2191", c.warn);
  printSkillSection(
    result,
    "missing",
    "Core not installed (skills update installs these):",
    "\u25E6",
    c.warn,
    (s) => isCoreSkill(s.name)
  );
  printSkillSection(
    result,
    "missing",
    "Available on demand (installed when their workflow first runs):",
    "\u25E6",
    c.dim,
    (s) => !isCoreSkill(s.name)
  );
  printSkillSection(
    result,
    "removed",
    "Removed upstream (renamed or dropped \u2014 no longer published):",
    "\u2717",
    c.warn
  );
  if (result.lockMissing) {
    console.log();
    console.log(
      `  ${c.warn(`! Skills lock not found \u2014 can't check for skills removed upstream.`)}`
    );
    console.log(
      `  ${c.dim(`  (lock paths verified against ${SKILLS_CLI_LOCK_PATHS_VERIFIED_AT})`)}`
    );
  }
  console.log();
  if (result.updateAvailable) {
    console.log(`  ${c.accent("Update: npx hyperframes skills update")}`);
  } else {
    console.log(`  ${c.success("\u25C7")}  ${c.success("Installed skills are up to date")}`);
  }
  console.log();
}
var checkCommand = defineCommand({
  meta: { name: "check", description: "Check whether installed skills are the latest version" },
  args: {
    json: { type: "boolean", description: "Output as JSON", default: false },
    dir: { type: "string", description: "Skills directory to check (default: auto-detect)" },
    source: {
      type: "string",
      description: "Where 'latest' comes from: local path, owner/repo, or URL"
    }
  },
  async run({ args }) {
    const result = await checkSkills({
      dir: args.dir,
      source: args.source
    });
    if (args.json) console.log(JSON.stringify(withMeta(result), null, 2));
    else renderCheck(result);
    invalidateSkillsCache();
    if (result.updateAvailable) setCommandExitCode(1);
  }
});
function requestedNamesFrom(positionals) {
  const names = positionals.map(String).filter((n) => n.length > 0);
  return {
    requested: names.filter((n) => PLAIN_SKILL_NAME.test(n)),
    rejected: names.filter((n) => !PLAIN_SKILL_NAME.test(n))
  };
}
function reportUpdate(result, requested, json) {
  if (json) {
    console.log(JSON.stringify(withMeta(result), null, 2));
    return;
  }
  if (result.installed.length > 0) {
    console.log(
      c.success(
        `Installed/updated ${result.installed.length} skill(s): ${result.installed.join(", ")}`
      )
    );
  } else if (result.presenceOnly) {
    console.log(c.warn("Freshness unknown (GitHub unreachable) \u2014 verified presence only."));
  } else {
    console.log(c.success("Installed skills are already up to date."));
  }
  if (requested.length) console.log(c.success(`\u25C7 Ready: ${requested.join(", ")}`));
}
function reportUpdateFailure(message, json) {
  if (json) {
    console.log(JSON.stringify(withMeta({ error: message }), null, 2));
    return;
  }
  R.error(c.error(message));
}
var updateCommand = defineCommand({
  meta: {
    name: "update",
    description: "Update the core set plus every installed HyperFrames skill to the latest, and remove any no longer published. Pass skill names to also install those (how workflow skills install on demand) \u2014 without names it never expands a partial install"
  },
  // Mirror `check`'s flags: the prune step runs the same removed-detection, so it
  // must respect the same overrides. Without these, `update`'s internal
  // checkSkills() fell back to defaults — pruning the auto-detected install
  // against the default manifest even when the user pointed `check` elsewhere.
  args: {
    json: { type: "boolean", description: "Output as JSON", default: false },
    dir: {
      type: "string",
      description: "Skills dir for removed-detection only \u2014 scopes the prune, not the install (default: auto-detect)"
    },
    source: {
      type: "string",
      description: "Where 'latest' comes from for removed-detection (local path, owner/repo, or URL) \u2014 does not change the install source"
    }
  },
  async run({ args }) {
    const dir = args.dir;
    const source = args.source;
    const { requested, rejected } = requestedNamesFrom(args._ ?? []);
    if (rejected.length) {
      reportUpdateFailure(`Invalid skill name(s): ${rejected.join(", ")}`, args.json === true);
      setCommandExitCode(1);
      return;
    }
    try {
      const result = await updateSkills({ requested, refreshInstalled: true, strict: true });
      reportUpdate(result, requested, args.json === true);
    } catch (err) {
      reportUpdateFailure(`Update failed: ${err.message}`, args.json === true);
      setCommandExitCode(1);
      return;
    }
    try {
      const { skills, scope } = await checkSkills({ dir, source, canonical: true });
      const removed = skills.filter((s) => s.status === "removed").map((s) => s.name);
      if (removed.length) {
        console.log();
        console.log(
          c.dim(`Removing ${removed.length} skill(s) no longer published: ${removed.join(", ")}`)
        );
        await runSkillsRemove(removed, { global: scope === "global" });
        const scopeForPrune = scope ?? "global";
        const stillOrphaned = pruneOrphanedLockEntries(removed, scopeForPrune);
        if (stillOrphaned.length) {
          console.log(
            c.dim(
              `Reconciled ${stillOrphaned.length} orphaned lock entr${stillOrphaned.length === 1 ? "y" : "ies"} with no on-disk bundle: ${stillOrphaned.join(", ")}`
            )
          );
        }
      }
    } catch (err) {
      R.warn(c.warn(`Skipped removed-skill cleanup: ${err.message}`));
    }
  }
});
var skills_default = defineCommand({
  meta: {
    name: "skills",
    description: "Install, check, and update HyperFrames skills for AI coding tools"
  },
  subCommands: {
    check: checkCommand,
    update: updateCommand
  },
  args: {},
  async run({ args }) {
    if (!args._?.[0]) {
      await updateSkills({ all: true });
      invalidateSkillsCache();
    }
  }
});
export {
  skills_default as default,
  examples,
  updateSkills
};
