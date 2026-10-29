import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../parsers/dist/ffBinaries.js
import { execFileSync } from "child_process";
import { accessSync, constants, existsSync } from "fs";
import { delimiter, join, resolve } from "path";
var FFMPEG_PATH_ENV = "HYPERFRAMES_FFMPEG_PATH";
var FFPROBE_PATH_ENV = "HYPERFRAMES_FFPROBE_PATH";
var ENV_BY_NAME = {
  ffmpeg: FFMPEG_PATH_ENV,
  ffprobe: FFPROBE_PATH_ENV
};
var pathLookupCache = /* @__PURE__ */ new Map();
function candidateFileName(candidate) {
  return candidate.split(/[\\/]/).at(-1)?.toLowerCase() ?? candidate.toLowerCase();
}
function chooseBestPathCandidate(name, candidates) {
  const normalized = candidates.map((candidate) => candidate.trim()).filter(Boolean);
  return normalized.find((candidate) => candidateFileName(candidate) === `${name}.exe`) ?? normalized.find((candidate) => candidateFileName(candidate) === name) ?? normalized.find((candidate) => !candidateFileName(candidate).match(/\.(cmd|bat)$/i)) ?? normalized[0];
}
function isExecutablePathCandidate(candidate) {
  if (process.platform === "win32") return existsSync(candidate);
  try {
    accessSync(candidate, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}
function scanPath(name) {
  const pathValue = process.env.PATH;
  const searchDirs = [
    ...process.platform === "win32" ? [process.cwd()] : [],
    ...pathValue ? pathValue.split(delimiter) : []
  ].filter(Boolean);
  if (searchDirs.length === 0) return void 0;
  const extensions = process.platform === "win32" ? [
    ".exe",
    ...new Set(
      (process.env.PATHEXT ?? ".COM;.EXE;.BAT;.CMD").split(";").map((ext) => ext.trim().toLowerCase()).filter(Boolean)
    ),
    ""
  ] : [""];
  const candidates = [];
  for (const dir of new Set(searchDirs)) {
    for (const ext of extensions) {
      const candidate = join(dir, `${name}${ext}`);
      if (isExecutablePathCandidate(candidate)) candidates.push(candidate);
    }
  }
  return chooseBestPathCandidate(name, candidates);
}
var COMMON_BIN_DIRS = process.platform === "win32" ? [] : ["/opt/homebrew/bin", "/usr/local/bin", "/usr/bin", "/bin", "/snap/bin"];
function findInCommonDirs(name) {
  for (const dir of COMMON_BIN_DIRS) {
    const candidate = `${dir}/${name}`;
    if (existsSync(candidate)) return candidate;
  }
  return void 0;
}
function findInProjectLocalBin(name) {
  const extension = process.platform === "win32" ? ".exe" : "";
  const candidate = resolve(".hyperframes", "bin", `${name}${extension}`);
  return existsSync(candidate) ? candidate : void 0;
}
function lookupOnSystem(name) {
  if (pathLookupCache.has(name)) return pathLookupCache.get(name);
  let found;
  if (process.platform === "win32") {
    found = scanPath(name);
  } else {
    try {
      const output = execFileSync("which", [name], {
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
        timeout: 5e3
      });
      const candidate = chooseBestPathCandidate(name, output.split(/\r?\n/));
      found = candidate && isExecutablePathCandidate(candidate) ? candidate : scanPath(name);
    } catch {
      found = scanPath(name);
    }
  }
  found ??= findInProjectLocalBin(name);
  found ??= findInCommonDirs(name);
  const resolved = found ? resolve(found) : void 0;
  pathLookupCache.set(name, resolved);
  return resolved;
}
function findFfBinary(name, options = {}) {
  const configured = process.env[ENV_BY_NAME[name]]?.trim();
  if (configured) {
    if (options.configuredMustExist && !existsSync(configured)) return void 0;
    return resolve(configured);
  }
  return lookupOnSystem(name);
}

export {
  FFMPEG_PATH_ENV,
  FFPROBE_PATH_ENV,
  findFfBinary
};
