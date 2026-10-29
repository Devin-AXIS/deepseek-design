import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  detectWSL
} from "./chunk-AMKC3AXA.js";
import {
  getSystemTotalMb
} from "./chunk-USDEMXXL.js";

// src/telemetry/system.ts
import { cpus, freemem, platform as platform2, release as release2 } from "os";
import { existsSync as existsSync2, readFileSync as readFileSync2, statfsSync } from "fs";
import { execSync } from "child_process";

// src/telemetry/agent_runtime.ts
import { existsSync, readFileSync, statSync } from "fs";
import { platform, release } from "os";
var VENDOR_RULES = [
  // IBM Bob Shell — both shell execution paths stamp BOBSHELL_CLI=1 onto the
  // child environment: childProcessFallback's spawn env and executeWithPty's
  // PTY env. Keep this ahead of other agents because Bob inherits the parent
  // environment, so a Bob session launched from Codex or Claude can carry both
  // vendors' markers; BOBSHELL_CLI identifies the immediate executor.
  // BOBSHELL_API_KEY is deliberately ignored: it is an authentication setting,
  // not proof that Bob launched the current process.
  // Source: IBM Bob Shell 1.0.6 bundle (lb.childProcessFallback / executeWithPty).
  {
    name: "bob",
    check: (env) => typeof env["BOBSHELL_CLI"] === "string"
  },
  // Anthropic Claude Code — sets CLAUDECODE=1 on every Bash/PowerShell tool
  // spawn (Shell.ts:321) and CLAUDE_CODE_ENTRYPOINT at startup, inherited by
  // every child (main.tsx:527). Both propagate to spawned subprocesses.
  // Source: confirmed by @magi from Claude Code internal source.
  {
    name: "claude_code",
    check: (env) => typeof env["CLAUDECODE"] === "string" || typeof env["CLAUDE_CODE_ENTRYPOINT"] === "string"
  },
  // OpenAI Codex (https://github.com/openai/codex).
  // - CODEX_THREAD_ID — set unconditionally on every spawned shell command
  //   (codex-rs/protocol/src/shell_environment.rs:6 constant, set by
  //   codex-rs/core/src/unified_exec/process_manager.rs:1010 and
  //   codex-rs/core/src/tools/runtimes/mod.rs:164).
  // - CODEX_CI — hardcoded in the UNIFIED_EXEC_ENV array, always set on
  //   every unified-exec child (process_manager.rs:70).
  // - CODEX_SANDBOX_NETWORK_DISABLED — set when network sandbox is active
  //   (codex-rs/core/src/sandboxing/mod.rs:135-138, default-on).
  // CODEX_HOME is deliberately NOT used — it's a config override read at
  // Codex startup, not propagated to spawned subprocesses.
  {
    name: "codex",
    check: (env) => typeof env["CODEX_THREAD_ID"] === "string" || typeof env["CODEX_CI"] === "string" || typeof env["CODEX_SANDBOX_NETWORK_DISABLED"] === "string"
  },
  // Cursor Agent marks its shell with CURSOR_AGENT; TERM_PROGRAM identifies
  // the IDE terminal only. Keep this after Claude/Codex for nested agents.
  // Source: https://docs.cursor.com/en/agent/terminal
  {
    name: "cursor",
    check: (env) => Boolean(env["CURSOR_AGENT"]) || env["TERM_PROGRAM"] === "cursor"
  },
  // Windsurf (Codeium) integrated terminal — exports TERM_PROGRAM=windsurf.
  // Attested across many independent detectors (nx
  // packages/nx/src/native/ide/detection.rs, adonisjs/application, ag-grid
  // git-hooks). Compared case-INsensitively (unlike the exact Cursor rule
  // above) because Windsurf sources disagree on casing ("windsurf" vs
  // "Windsurf"); Cursor's do not, so it stays exact. Like Cursor this marks the
  // editor's integrated terminal, not specifically that the Cascade agent is
  // driving; under WSL/remote it can also fall back to TERM_PROGRAM=vscode.
  {
    name: "windsurf",
    check: (env) => env["TERM_PROGRAM"]?.toLowerCase() === "windsurf"
  },
  // GitHub Copilot Coding Agent — runs inside GitHub Actions and the
  // workflow injects an additional marker to distinguish from generic CI.
  // Not yet verified from a public-source citation in this audit; the var
  // names below match GitHub Copilot Coding Agent documentation but
  // should be confirmed before relying on attribution.
  {
    name: "copilot_agent",
    check: (env) => env["GITHUB_ACTIONS"] === "true" && (typeof env["COPILOT_AGENT_ID"] === "string" || env["RUNNER_NAME"] === "Copilot")
  },
  // Replit — REPL_ID and REPLIT_USER are long-documented environment
  // variables exposed inside every Replit workspace.
  // Source: https://docs.replit.com/replit-workspace/configuring-the-environment
  {
    name: "replit",
    check: (env) => typeof env["REPL_ID"] === "string" || typeof env["REPLIT_USER"] === "string"
  },
  // Nous Research Hermes Agent — cli.py:50 unconditionally executes
  //   os.environ["HERMES_QUIET"] = "1"
  // at module load, so the marker propagates via os.environ to every
  // subprocess spawned by Hermes. Keying on existence (not the literal
  // "1") so we still match if Hermes ever changes the value.
  // Source: https://github.com/NousResearch/hermes-agent (cli.py:50)
  {
    name: "hermes",
    check: (env) => typeof env["HERMES_QUIET"] === "string"
  },
  // openclaw — multi-channel AI gateway. When openclaw spawns a CLI
  // subprocess it builds the child env with OPENCLAW_STATE_DIR /
  // OPENCLAW_CONFIG_PATH / OPENCLAW_DISABLE_AUTO_UPDATE set explicitly
  // (extensions/qa-matrix/src/runners/contract/scenario-runtime-cli.ts:344-351).
  // We key on OPENCLAW_STATE_DIR since it's a path scope-bound to openclaw.
  // Source: https://github.com/openclaw/openclaw
  {
    name: "openclaw",
    check: (env) => typeof env["OPENCLAW_STATE_DIR"] === "string" || typeof env["OPENCLAW_CONFIG_PATH"] === "string"
  },
  // Pi coding agent (https://pi.dev, https://github.com/earendil-works/pi).
  // packages/coding-agent/src/cli.ts:13 unconditionally executes
  //   process.env.PI_CODING_AGENT = "true";
  // at module entry, so every subprocess Pi spawns sees this marker.
  {
    name: "pi",
    check: (env) => typeof env["PI_CODING_AGENT"] === "string"
  },
  // Cline (cline/cline) VS Code extension — injects CLINE_ACTIVE=true into the
  // integrated terminal via vscode.TerminalOptions.env, which the terminal
  // exports to every shell command run in it
  // (apps/vscode/src/hosts/vscode/terminal/VscodeTerminalRegistry.ts:29).
  // Caveat: present only on the default "vscodeTerminal" exec path — the opt-in
  // backgroundExec/YOLO path spawns via child_process without the marker. Same
  // integrated-terminal-only scope as the Cursor/Windsurf rules above.
  // Source: https://github.com/cline/cline (VscodeTerminalRegistry.ts:29)
  {
    name: "cline",
    check: (env) => typeof env["CLINE_ACTIVE"] === "string"
  },
  // Google Gemini CLI (open-source @google/gemini-cli) — DISTINCT from the
  // Gemini managed-agent sandbox. (If a /.agents/ filesystem detector is
  // present in detectAgentRuntime() it runs ahead of this loop and wins for a
  // managed-agent sandbox, leaving this rule to match only the local CLI.)
  // The shell-execution service
  // sets GEMINI_CLI=1 on the child env of every shell command it spawns, so
  // downstream executables can tell they were launched by Gemini CLI
  // (packages/core/src/services/shellExecutionService.ts:56,486-487 — spread
  // onto baseEnv after sanitizeEnvironment, passed as env: to both the
  // child_process and node-pty spawn paths).
  // Caveat: under STRICT sanitization (when GITHUB_SHA is set / the GitHub
  // Action surface) GEMINI_CLI is not allow-listed and gets stripped — reliable
  // for the local CLI, not inside Gemini's GitHub Action runner.
  // Source: https://github.com/google-gemini/gemini-cli (shellExecutionService.ts:56,486-487)
  {
    name: "gemini_cli",
    check: (env) => typeof env["GEMINI_CLI"] === "string"
  },
  // Crush (charmbracelet/crush) — internal/shell/shell.go:43-48,98
  // unconditionally appends CRUSH=1 (plus generic AGENT=crush / AI_AGENT=crush)
  // to the env of every shell it spawns: both the interactive bash tool and the
  // hook runner. We key on CRUSH since AGENT/AI_AGENT are generic and collide.
  // Source: https://github.com/charmbracelet/crush (internal/shell/shell.go:43-48,98)
  {
    name: "crush",
    check: (env) => typeof env["CRUSH"] === "string"
  }
];
function detectSandboxRuntime() {
  if (platform() === "win32") return null;
  if (detectWSL()) return "wsl";
  if (isGVisor()) return "gvisor";
  if (isDocker()) return "docker";
  if (isFirecracker()) return "firecracker";
  if (isKVM()) return "kvm";
  return null;
}
function detectAgentRuntime() {
  if (isGeminiManagedAgent()) return "gemini_managed_agent";
  for (const rule of VENDOR_RULES) {
    if (rule.check(process.env)) return rule.name;
  }
  return null;
}
function detectExecutionHarnessHint() {
  return typeof process.env["HARBOR_AGENT"] === "string" ? "harbor" : null;
}
var SAFE_HINT = /^[a-z0-9_.-]{1,32}$/;
var CREDENTIAL_PREFIXES = [
  "sk-",
  "sk_",
  "pk-",
  "pplx-",
  "ghp_",
  "gho_",
  "ghu_",
  "ghs_",
  "ghr_",
  "github_pat_",
  "glpat-",
  "gsk_",
  "xox",
  "akia",
  "asia",
  "aiza",
  "ya29",
  "hf_",
  "r8_"
];
var LONG_ALNUM_RUN = /[a-z0-9]{16,}/;
function looksLikeCredential(v) {
  if (CREDENTIAL_PREFIXES.some((p) => v.startsWith(p))) return true;
  return LONG_ALNUM_RUN.test(v);
}
function sanitizeHint(value) {
  if (typeof value !== "string") return null;
  const v = value.trim().toLowerCase();
  if (!SAFE_HINT.test(v)) return null;
  if (looksLikeCredential(v)) return null;
  return v;
}
var HINT_KEY_PATTERN = /AGENT|ASSISTANT|COPILOT|CODEX|CLAUDE|LLM|_THREAD_ID$|_SESSION_ID$/;
function isDiscoveryHintKey(upperKey) {
  if (upperKey === "AGENT" || upperKey === "AI_AGENT") return false;
  if (upperKey.startsWith("SSH_") || upperKey.startsWith("GPG_")) return false;
  if (["NPM_CONFIG_USER_AGENT", "TERM_SESSION_ID", "XDG_SESSION_ID"].includes(upperKey))
    return false;
  return HINT_KEY_PATTERN.test(upperKey);
}
function discoveryHintPriority(key) {
  if (/_SERVICE_(HOST|PORT)(_|$)|_PORT(_\d+_(TCP|UDP)(_(ADDR|PORT|PROTO))?)?$/.test(key)) return 2;
  if (/^(HARBOR_AGENT|CURSOR_AGENT|ANTIGRAVITY_AGENT)$|_(SESSION_ID|THREAD_ID)$/.test(key))
    return 0;
  return 1;
}
function detectAgentHints() {
  const env = process.env;
  const agent_hint = sanitizeHint(env["AGENT"]) ?? sanitizeHint(env["AI_AGENT"]);
  const term_program = sanitizeHint(env["TERM_PROGRAM"]);
  const keys = /* @__PURE__ */ new Set();
  for (const key of Object.keys(env)) {
    if (key.length > 64) continue;
    const upper = key.toUpperCase();
    if (isDiscoveryHintKey(upper)) keys.add(upper);
  }
  const selected = [...keys].sort((a, b) => discoveryHintPriority(a) - discoveryHintPriority(b) || a.localeCompare(b)).slice(0, 16).sort();
  const agent_env_hints = selected.length ? selected.join(",") : null;
  return { agent_hint, term_program, agent_env_hints };
}
function isGVisor() {
  const kernel = release();
  if (kernel.includes("gvisor")) return true;
  if (platform() !== "linux") return false;
  try {
    const procVersion = readFileSync("/proc/version", "utf-8");
    return procVersion.includes("gVisor");
  } catch {
    return false;
  }
}
function isDocker() {
  if (existsSync("/.dockerenv")) return true;
  if (platform() !== "linux") return false;
  try {
    const cgroup = readFileSync("/proc/1/cgroup", "utf-8");
    return cgroup.includes("docker") || cgroup.includes("containerd");
  } catch {
    return false;
  }
}
function isFirecracker() {
  if (platform() !== "linux") return false;
  if (!existsSync("/dev/vsock")) return false;
  try {
    const sysVendor = readFileSync("/sys/class/dmi/id/sys_vendor", "utf-8").trim();
    if (sysVendor !== "Amazon EC2") return false;
    const productName = readFileSync("/sys/class/dmi/id/product_name", "utf-8").trim();
    return productName.toLowerCase().includes("firecracker");
  } catch {
    return false;
  }
}
function isKVM() {
  if (platform() !== "linux") return false;
  try {
    const sysVendor = readFileSync("/sys/class/dmi/id/sys_vendor", "utf-8").trim();
    return sysVendor === "QEMU" || sysVendor.includes("KVM");
  } catch {
    return false;
  }
}
function isGeminiManagedAgent() {
  if (platform() !== "linux") return false;
  try {
    if (!statSync("/.agents").isDirectory()) return false;
  } catch {
    return false;
  }
  return isGVisor();
}

// src/telemetry/system.ts
function bytesToMb(bytes) {
  return Math.trunc(bytes / (1024 * 1024));
}
var cached = null;
var CLIENT_TAG = /^[a-z0-9][a-z0-9._+-]{0,31}(\/[a-z0-9._+-]{1,32}){0,3}$/i;
function readClientTag() {
  const tag = process.env["HYPERFRAMES_CLIENT"]?.trim() ?? "";
  return CLIENT_TAG.test(tag) ? tag : null;
}
function getSystemMeta() {
  if (cached) return cached;
  const cpuInfo = cpus();
  const firstCpu = cpuInfo[0] ?? null;
  const agent_runtime = detectAgentRuntime();
  const hints = agent_runtime === null ? detectAgentHints() : { agent_hint: null, term_program: null, agent_env_hints: null };
  cached = {
    os_release: release2(),
    cpu_count: cpuInfo.length,
    cpu_model: firstCpu?.model?.trim() ?? null,
    cpu_speed: firstCpu?.speed ?? null,
    memory_total_mb: getSystemTotalMb(),
    is_docker: detectDocker(),
    is_ci: detectCI(),
    ci_name: getCIName(),
    is_wsl: detectWSL(),
    is_tty: Boolean(process.stdout?.isTTY),
    sandbox_runtime: detectSandboxRuntime(),
    agent_runtime,
    execution_harness_hint: detectExecutionHarnessHint(),
    agent_hint: hints.agent_hint,
    term_program: hints.term_program,
    agent_env_hints: hints.agent_env_hints,
    client: readClientTag()
  };
  return cached;
}
function detectDocker() {
  try {
    if (existsSync2("/.dockerenv")) return true;
    if (platform2() === "linux") {
      const cgroup = readFileSync2("/proc/1/cgroup", "utf-8");
      if (cgroup.includes("docker") || cgroup.includes("containerd")) return true;
    }
  } catch {
  }
  return false;
}
var CI_PROVIDERS = [
  { name: "github_actions", envVar: "GITHUB_ACTIONS", mode: "truthy" },
  { name: "gitlab_ci", envVar: "GITLAB_CI", mode: "truthy" },
  { name: "circleci", envVar: "CIRCLECI", mode: "truthy" },
  { name: "jenkins", envVar: "JENKINS_URL", mode: "presence" },
  { name: "buildkite", envVar: "BUILDKITE", mode: "truthy" },
  { name: "travis", envVar: "TRAVIS", mode: "truthy" },
  { name: null, envVar: "CONTINUOUS_INTEGRATION", mode: "truthy" },
  { name: null, envVar: "CI", mode: "truthy" }
];
function matchesProvider(p) {
  const v = process.env[p.envVar];
  if (p.mode === "presence") return v != null;
  return v === "true" || v === "1";
}
function detectCI() {
  return CI_PROVIDERS.some(matchesProvider);
}
function getCIName() {
  for (const provider of CI_PROVIDERS) {
    if (provider.name && matchesProvider(provider)) return provider.name;
  }
  return detectCI() ? "unknown" : null;
}
function getShmSizeMb() {
  if (platform2() !== "linux") return null;
  try {
    const stats = statfsSync("/dev/shm");
    return bytesToMb(stats.bsize * stats.blocks);
  } catch {
    return null;
  }
}
function getFreeDiskMb(path = ".") {
  try {
    const stats = statfsSync(path);
    return bytesToMb(stats.bsize * stats.bavail);
  } catch {
    return null;
  }
}
function parsePmsetPowerSource(raw) {
  const m = raw.match(/Now drawing from '([^']+)'/);
  if (!m) return null;
  return m[1] === "Battery Power";
}
function getPowerState() {
  if (platform2() !== "darwin") {
    return { on_battery: null, low_power_mode: null };
  }
  let on_battery = null;
  let low_power_mode = null;
  try {
    on_battery = parsePmsetPowerSource(
      execSync("pmset -g batt", { encoding: "utf-8", timeout: 2e3 })
    );
  } catch {
  }
  try {
    const raw = execSync("pmset -g", { encoding: "utf-8", timeout: 2e3 });
    const m = raw.match(/lowpowermode\s+(\d)/);
    if (m) low_power_mode = m[1] === "1";
  } catch {
  }
  return { on_battery, low_power_mode };
}
function getAvailableMemoryMb() {
  const fallback = bytesToMb(freemem());
  if (platform2() === "darwin") {
    try {
      const raw = execSync("vm_stat", { encoding: "utf-8", timeout: 5e3 });
      const pageSize = parseInt(raw.match(/page size of (\d+)/)?.[1] ?? "0", 10);
      if (!pageSize) return fallback;
      const pages = (key) => parseInt(raw.match(new RegExp(`${key}:\\s+(\\d+)`))?.[1] ?? "0", 10);
      const available = (pages("Pages free") + pages("Pages inactive") + pages("Pages purgeable") + pages("Pages speculative")) * pageSize;
      return available > 0 ? bytesToMb(available) : fallback;
    } catch {
      return fallback;
    }
  }
  if (platform2() === "linux") {
    try {
      const meminfo = readFileSync2("/proc/meminfo", "utf-8");
      const match = meminfo.match(/MemAvailable:\s+(\d+)\s+kB/);
      if (match) {
        return Math.trunc(parseInt(match[1], 10) / 1024);
      }
      return fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export {
  detectAgentRuntime,
  bytesToMb,
  getSystemMeta,
  getShmSizeMb,
  getFreeDiskMb,
  parsePmsetPowerSource,
  getPowerState,
  getAvailableMemoryMb
};
