import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  describeRejectedPythonOverride,
  hasPythonModules
} from "./chunk-5ETJX6WM.js";
import {
  runEnvironmentChecks
} from "./chunk-YWFRK7NU.js";
import {
  OPTIONAL_PACKAGES,
  installedOptionalPackageVersion
} from "./chunk-3DKN5WKL.js";
import {
  getAvailableMemoryMb,
  getFreeDiskMb,
  getShmSizeMb,
  getSystemMeta
} from "./chunk-GQJZORQP.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  resolveExtractCacheDir
} from "./chunk-3NHZZLH3.js";
import {
  getUpdateMeta,
  withMeta
} from "./chunk-5FABXOBL.js";
import {
  CONFIG_PATH,
  withFileLock
} from "./chunk-2SBJMKLH.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/commands/doctor.ts
import { execFileSync, execSync } from "child_process";
import * as fs from "fs";
import { existsSync } from "fs";
import { platform } from "os";
import { dirname } from "path";

// src/audio/providers.ts
var KOKORO_MODULES = ["kokoro_onnx", "soundfile"];
var MUSICGEN_MODULES = ["transformers", "torch", "soundfile", "numpy"];
var KOKORO_PIP = "pip install kokoro-onnx soundfile";
var MUSICGEN_PIP = "pip install transformers torch soundfile numpy";

// src/commands/doctor.ts
var examples = [
  ["Check system dependencies", "hyperframes doctor"],
  ["Output as JSON for CI / agents", "hyperframes doctor --json"]
];
function checkDocker() {
  try {
    const version = execSync("docker --version", { encoding: "utf-8", timeout: 5e3 }).trim();
    return { ok: true, detail: version };
  } catch {
    return {
      ok: false,
      detail: "Not found",
      hint: "https://docs.docker.com/get-docker/"
    };
  }
}
function checkDockerRunning() {
  try {
    execSync("docker info", { stdio: "pipe", timeout: 5e3 });
    return { ok: true, detail: "Running" };
  } catch {
    return {
      ok: false,
      detail: "Not running",
      hint: "Start Docker Desktop or run: sudo systemctl start docker"
    };
  }
}
function checkVersion() {
  const meta = getUpdateMeta();
  if (meta.updateAvailable && meta.latestVersion) {
    return {
      ok: false,
      detail: `${VERSION} \u2192 ${meta.latestVersion} available`,
      hint: "Run: hyperframes upgrade"
    };
  }
  return { ok: true, detail: `${VERSION} (latest)` };
}
function checkNode() {
  return { ok: true, detail: `${process.version} (${process.platform} ${process.arch})` };
}
function checkCPU() {
  const sys = getSystemMeta();
  const model = sys.cpu_model ?? "Unknown";
  const speedStr = sys.cpu_speed ? ` @ ${sys.cpu_speed}MHz` : "";
  return { ok: true, detail: `${sys.cpu_count} cores \xB7 ${model}${speedStr}` };
}
function checkMemory() {
  const sys = getSystemMeta();
  const availMb = getAvailableMemoryMb();
  const totalGb = (sys.memory_total_mb / 1024).toFixed(1);
  const availGb = (availMb / 1024).toFixed(1);
  if (availMb < 2048) {
    return {
      ok: false,
      detail: `${totalGb} GB total \xB7 ${availGb} GB available`,
      hint: "Low memory \u2014 renders may fail. Close other apps or increase RAM."
    };
  }
  return { ok: true, detail: `${totalGb} GB total \xB7 ${availGb} GB available` };
}
function checkShm() {
  const shmMb = getShmSizeMb();
  if (shmMb === null) {
    return { ok: true, detail: "N/A (non-Linux)" };
  }
  if (shmMb < 256) {
    return {
      ok: false,
      detail: `${shmMb} MB`,
      hint: "Chrome needs \u2265256 MB. Use: docker run --shm-size=512m"
    };
  }
  return { ok: true, detail: `${shmMb} MB` };
}
function checkDisk() {
  const freeMb = getFreeDiskMb(".");
  if (freeMb === null) {
    return { ok: true, detail: "Unable to check" };
  }
  const freeGb = (freeMb / 1024).toFixed(1);
  if (freeMb < 1024) {
    return {
      ok: false,
      detail: `${freeGb} GB free`,
      hint: "Low disk space \u2014 renders produce large temp files."
    };
  }
  return { ok: true, detail: `${freeGb} GB free` };
}
function checkFramesCache(env = process.env, freeDiskMb = getFreeDiskMb, fileExists = existsSync) {
  const resolution = resolveExtractCacheDir(env);
  if (resolution.disabled) {
    return {
      ok: true,
      detail: `Disabled (${resolution.rawValue}) \u2014 frames extract into per-render workDir`
    };
  }
  const dir = resolution.dir;
  const probePath = firstExistingAncestor(dir, fileExists) ?? dir;
  const freeMb = freeDiskMb(probePath);
  if (freeMb === null) {
    return {
      ok: true,
      detail: `${dir} (free space unknown; ${sourceLabel(resolution.source)})`
    };
  }
  const freeGb = (freeMb / 1024).toFixed(1);
  const suffix = `${freeGb} GB free at ${probePath} \xB7 ${sourceLabel(resolution.source)}`;
  if (freeMb < 2048) {
    return {
      ok: false,
      detail: `${dir} \xB7 ${suffix}`,
      hint: "Low free space at the extract cache location \u2014 long renders can exhaust the drive. Relocate via HYPERFRAMES_EXTRACT_CACHE_DIR=<path> or `hyperframes render --frames-cache-dir <path>`."
    };
  }
  return { ok: true, detail: `${dir} \xB7 ${suffix}` };
}
function firstExistingAncestor(path, fileExists) {
  let current = path;
  for (let i = 0; i < 64; i += 1) {
    if (fileExists(current)) return current;
    const parent = dirname(current);
    if (parent === current) return null;
    current = parent;
  }
  return null;
}
function sourceLabel(source) {
  return source === "env" ? "HYPERFRAMES_EXTRACT_CACHE_DIR" : "default";
}
function commandExists(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore", timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
function checkArchiveExtractor(hostPlatform = platform(), exists = commandExists) {
  if (hostPlatform === "win32") {
    return { ok: true, detail: "Built into Windows" };
  }
  if (exists("unzip")) {
    return { ok: true, detail: "unzip" };
  }
  return {
    ok: false,
    detail: "Not found",
    hint: "Install unzip so HyperFrames can extract its managed Chrome download."
  };
}
function checkSettingsLock(lockPath = `${CONFIG_PATH}.lock`) {
  if (!existsSync(lockPath)) return { ok: true, detail: "Not locked" };
  try {
    withFileLock(lockPath, fs, () => void 0);
    return { ok: true, detail: "Not locked" };
  } catch (error) {
    return { ok: false, detail: "Locked", hint: normalizeErrorMessage(error) };
  }
}
function checkEnvironment() {
  const sys = getSystemMeta();
  const parts = [];
  if (sys.is_docker) parts.push("Docker");
  if (sys.is_wsl) parts.push("WSL");
  if (sys.is_ci) parts.push(`CI (${sys.ci_name ?? "detected"})`);
  if (!sys.is_tty) parts.push("non-TTY");
  if (parts.length === 0) {
    return { ok: true, detail: "Native terminal" };
  }
  return { ok: true, detail: parts.join(" \xB7 ") };
}
async function checkWhisper() {
  const { findWhisper, getInstallInstructions } = await import("./manager-DXB7JDHU.js");
  const result = findWhisper();
  if (result) {
    return { ok: true, detail: result.executablePath };
  }
  return {
    ok: false,
    detail: "Not found (optional \u2014 needed for transcription)",
    hint: getInstallInstructions()
  };
}
function notInstalledDetail(base) {
  const overrideRejection = describeRejectedPythonOverride();
  return overrideRejection ? `${base}. ${overrideRejection}` : base;
}
function checkLocalVoice() {
  if (hasPythonModules(KOKORO_MODULES)) return { ok: true, detail: "Kokoro deps installed" };
  return {
    ok: false,
    detail: notInstalledDetail("Not installed (optional \u2014 local voice fallback)"),
    hint: KOKORO_PIP
  };
}
function checkLocalMusic() {
  if (hasPythonModules(MUSICGEN_MODULES)) return { ok: true, detail: "MusicGen deps installed" };
  return {
    ok: false,
    detail: notInstalledDetail("Not installed (optional \u2014 local music fallback)"),
    hint: MUSICGEN_PIP
  };
}
function checkOptionalPackage(name, cacheDir, cliUrl) {
  const version = installedOptionalPackageVersion(name, cacheDir, cliUrl);
  return {
    ok: true,
    detail: version ? `${version} installed` : "Not installed (installs on first use)"
  };
}
function redactHome(s) {
  const home = process.env["HOME"] || process.env["USERPROFILE"];
  if (!home) return s;
  return s.split(home).join("$HOME");
}
function redactOutcome(o) {
  return {
    name: o.name,
    ok: o.ok,
    detail: redactHome(o.detail),
    ...o.hint ? { hint: redactHome(o.hint) } : {}
  };
}
function buildDoctorReport(outcomes, options = {}) {
  const checks = options.redact ? outcomes.map(redactOutcome) : outcomes;
  return withMeta({
    ok: checks.every((o) => o.ok),
    platform: process.platform,
    arch: process.arch,
    checks
  });
}
var doctor_default = defineCommand({
  meta: { name: "doctor", description: "Check system dependencies and environment" },
  args: {
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  async run({ args }) {
    const environment = await runEnvironmentChecks({ includeBrowser: true });
    const checks = [
      { name: "Version", run: checkVersion },
      { name: "Node.js", run: checkNode },
      { name: "CPU", run: checkCPU },
      { name: "Memory", run: checkMemory },
      { name: "Disk", run: checkDisk },
      { name: "Frames cache", run: () => checkFramesCache() },
      { name: "Archive extractor", run: checkArchiveExtractor },
      { name: "Settings lock", run: () => checkSettingsLock() }
    ];
    if (platform() === "linux") {
      checks.push({ name: "/dev/shm", run: checkShm });
    }
    checks.push({ name: "Environment", run: checkEnvironment });
    checks.push({ name: "whisper-cpp", run: checkWhisper });
    checks.push({ name: "TTS (Kokoro)", run: checkLocalVoice });
    checks.push({ name: "BGM (MusicGen)", run: checkLocalMusic });
    for (const name of Object.keys(OPTIONAL_PACKAGES)) {
      checks.push({ name, run: () => checkOptionalPackage(name) });
    }
    const outcomes = [];
    for (const check of checks) {
      const result = await check.run();
      outcomes.push({
        name: check.name,
        ok: result.ok,
        detail: result.detail,
        ...result.hint ? { hint: result.hint } : {}
      });
    }
    for (const result of environment.outcomes) {
      outcomes.push({
        name: result.name,
        ok: result.ok,
        detail: result.detail,
        ...result.hint ? { hint: result.hint } : {}
      });
    }
    for (const check of [
      { name: "Docker", run: checkDocker },
      { name: "Docker running", run: checkDockerRunning }
    ]) {
      const result = await check.run();
      outcomes.push({
        name: check.name,
        ok: result.ok,
        detail: result.detail,
        ...result.hint ? { hint: result.hint } : {}
      });
    }
    const allOk = outcomes.every((o) => o.ok);
    if (args.json) {
      console.log(JSON.stringify(buildDoctorReport(outcomes, { redact: true }), null, 2));
      return;
    }
    console.log();
    console.log(c.bold("hyperframes doctor"));
    console.log();
    for (const outcome of outcomes) {
      const icon = outcome.ok ? c.success("\u2713") : c.error("\u2717");
      const name = outcome.name.padEnd(16);
      console.log(
        `  ${icon} ${c.bold(name)} ${outcome.ok ? c.dim(outcome.detail) : c.error(outcome.detail)}`
      );
      if (!outcome.ok && outcome.hint) {
        console.log(`  ${" ".repeat(19)}${c.accent(outcome.hint)}`);
      }
    }
    console.log();
    if (allOk) {
      console.log(`  ${c.success("\u25C7")}  ${c.success("All checks passed")}`);
    } else {
      console.log(`  ${c.warn("\u25C7")}  ${c.warn("Some checks failed \u2014 see hints above")}`);
    }
    console.log();
  }
});

export {
  examples,
  checkFramesCache,
  checkArchiveExtractor,
  checkSettingsLock,
  checkOptionalPackage,
  redactHome,
  buildDoctorReport,
  doctor_default
};
