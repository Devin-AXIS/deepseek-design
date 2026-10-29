import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  buildNpmCommand
} from "./chunk-6BEFEWFB.js";

// src/utils/optionalPackages.ts
import { spawn } from "child_process";
import { randomUUID } from "crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync
} from "fs";
import { createRequire } from "module";
import { homedir } from "os";
import { basename, dirname, join, sep } from "path";
var OPTIONAL_PACKAGES = {
  "onnxruntime-node": "1.21.1",
  "@google/genai": "1.52.0"
};
var PINNED_PACKAGES = {
  ...OPTIONAL_PACKAGES,
  "sherpa-onnx-node": "1.13.8"
};
var CACHE_DIR = join(homedir(), ".cache", "hyperframes", "optional");
function optionalPackageDir(name, cacheDir = CACHE_DIR) {
  return join(cacheDir, `${name.replace("/", "__")}@${OPTIONAL_PACKAGES[name]}`);
}
function installedOptionalPackageVersion(name, cacheDir = CACHE_DIR, cliUrl = import.meta.url) {
  if (pinnedPackageBesideCli(name, cliUrl)?.resolution === "entry") return OPTIONAL_PACKAGES[name];
  const dir = optionalPackageDir(name, cacheDir);
  if (!isInstalled(dir, name)) return null;
  return JSON.parse(readFileSync(manifestPath(dir, name), "utf-8")).version;
}
function loadInstalledOptionalPackage(name, deps = defaultDeps) {
  const found = deps.loadBesideCli(name) ?? deps.loadInstalled(optionalPackageDir(name, deps.cacheDir), name);
  return found;
}
async function loadOptionalPackage(name, feature, deps = defaultDeps) {
  const present = loadInstalledOptionalPackage(name, deps);
  if (present !== null) return present;
  const dir = optionalPackageDir(name, deps.cacheDir);
  const version = OPTIONAL_PACKAGES[name];
  deps.log(`installing ${name} for ${feature}, once`);
  try {
    await deps.install(dir, name, version);
  } catch (err) {
    const output = err.message.trim();
    const advice = NETWORK_FAILURE.test(output) ? "Check your network connection, then retry" : "Retry";
    throw new Error(
      `${feature} needs ${name}, and installing it failed (${output.split("\n")[0]}). ${advice}, or install it yourself: npm install ${name}@${version} --prefix "${dir}"`
    );
  }
  const loaded = deps.loadInstalled(dir, name);
  if (loaded === null) {
    throw new Error(`${name}@${version} installed into ${dir} but could not be loaded.`);
  }
  return loaded;
}
var NETWORK_FAILURE = /ENOTFOUND|ETIMEDOUT|EAI_AGAIN|ECONNRESET|ECONNREFUSED|network/i;
function manifestPath(dir, name) {
  return join(dir, "node_modules", name, "package.json");
}
function isInstalled(dir, name) {
  return existsSync(manifestPath(dir, name));
}
function installedPackagePath(dir, name) {
  if (!isInstalled(dir, name)) return null;
  return createRequire(join(dir, "package.json")).resolve(name);
}
function loadInstalled(dir, name) {
  const entry = installedPackagePath(dir, name);
  return entry === null ? null : createRequire(join(dir, "package.json"))(entry);
}
function pinnedPackageBesideCli(name, cliUrl = import.meta.url) {
  const req = createRequire(cliUrl);
  try {
    let entry;
    try {
      entry = realpathSync(req.resolve(name));
    } catch {
      const copy2 = (req.resolve.paths(name) ?? []).map((dir) => join(dir, name)).find((dir) => existsSync(join(dir, "package.json")));
      return copy2 && hasPinnedVersion(copy2, name) ? { resolution: "package", path: realpathSync(copy2) } : null;
    }
    const copy = (req.resolve.paths(name) ?? []).map((dir) => join(dir, name)).find((dir) => existsSync(dir) && entry.startsWith(realpathSync(dir) + sep));
    if (!copy) return null;
    return hasPinnedVersion(copy, name) ? { resolution: "entry", path: entry } : null;
  } catch {
    return null;
  }
}
function hasPinnedVersion(copy, name) {
  const manifest = readFileSync(join(copy, "package.json"), "utf-8");
  return JSON.parse(manifest).version === PINNED_PACKAGES[name];
}
function loadBesideCli(name, cliUrl = import.meta.url) {
  const copy = pinnedPackageBesideCli(name, cliUrl);
  return copy?.resolution === "entry" ? createRequire(cliUrl)(copy.path) : null;
}
function runNpm(args, signal) {
  const npm = buildNpmCommand(args);
  const child = spawn(npm.command, npm.args, { stdio: ["ignore", "pipe", "pipe"], signal });
  return new Promise((resolve, reject) => {
    let output = "";
    child.stdout.on("data", (chunk) => output += chunk);
    child.stderr.on("data", (chunk) => output += chunk);
    child.on("error", reject);
    child.on(
      "close",
      (code) => code === 0 ? resolve() : reject(new Error(output || `npm exited with code ${code}`))
    );
  });
}
function isProcessAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (err) {
    return err.code !== "ESRCH";
  }
}
var STAGING_PID_TRUSTED_FOR_MS = 6 * 60 * 60 * 1e3;
function sweepStaleStaging(dir) {
  const prefix = `${basename(dir)}.tmp-`;
  const parent = dirname(dir);
  if (!existsSync(parent)) return;
  for (const entry of readdirSync(parent)) {
    if (!entry.startsWith(prefix)) continue;
    const pid = /^(\d+)(?:-|$)/.exec(entry.slice(prefix.length))?.[1];
    if (pid === void 0) continue;
    const stale = join(parent, entry);
    const age = Date.now() - (statSync(stale, { throwIfNoEntry: false })?.mtimeMs ?? Date.now());
    if (isProcessAlive(Number(pid)) && age < STAGING_PID_TRUSTED_FOR_MS) continue;
    try {
      rmSync(stale, { recursive: true, force: true });
    } catch (err) {
      console.error(`could not remove stale install dir ${stale}: ${err.message}`);
    }
  }
}
async function install(dir, name, version, run = runNpm) {
  sweepStaleStaging(dir);
  const staging = `${dir}.tmp-${process.pid}-${randomUUID().slice(0, 8)}`;
  mkdirSync(staging, { recursive: true });
  writeFileSync(join(staging, "package.json"), "{}");
  try {
    await run([
      "install",
      `${name}@${version}`,
      "--prefix",
      staging,
      "--no-audit",
      "--no-fund",
      "--loglevel=error",
      // A first-use install is interactive, not a CI resolve: fail fast and name the
      // manual command instead of sitting through npm's default multi-minute backoff.
      "--fetch-retries=0",
      "--fetch-timeout=20000"
    ]);
    if (isInstalled(dir, name)) return;
    rmSync(dir, { recursive: true, force: true });
    renameSync(staging, dir);
  } catch (err) {
    if (!isInstalled(dir, name)) throw err;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}
var defaultDeps = {
  cacheDir: CACHE_DIR,
  loadBesideCli: (name) => loadBesideCli(name),
  loadInstalled,
  install,
  log: (line) => console.error(line)
};

export {
  OPTIONAL_PACKAGES,
  PINNED_PACKAGES,
  CACHE_DIR,
  installedOptionalPackageVersion,
  loadInstalledOptionalPackage,
  loadOptionalPackage,
  isInstalled,
  installedPackagePath,
  pinnedPackageBesideCli,
  runNpm,
  sweepStaleStaging,
  install
};
