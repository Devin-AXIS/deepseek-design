import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/capture/captureFile.ts
import {
  mkdirSync,
  mkdtempSync,
  realpathSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync
} from "fs";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "path";

// src/capture/captureErrors.ts
var NavigationDeadlineError = class extends Error {
  constructor(cause, webglObserved) {
    super("capture navigation timed out");
    this.cause = cause;
    this.webglObserved = webglObserved;
    this.name = "NavigationDeadlineError";
  }
  cause;
  webglObserved;
};
var CaptureDirRefusedError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CaptureDirRefusedError";
  }
};

// src/capture/captureFile.ts
function publishCaptureFileSync(path, data, options) {
  const stagingDir = mkdtempSync(join(dirname(path), ".capture-"));
  try {
    const staged = join(stagingDir, basename(path));
    writeCaptureFileSync(staged, data, { ...options, flag: "wx" });
    renameSync(staged, path);
  } finally {
    rmSync(stagingDir, { recursive: true, force: true });
  }
}
function writeCaptureFileSync(path, data, options) {
  const normalized = typeof options === "string" ? { encoding: options } : options;
  if (normalized?.flag === void 0 || normalized.flag === "w") {
    return publishCaptureFileSync(path, data, normalized);
  }
  writeFileSync(path, data, { ...normalized, mode: 384 });
}
function hasCode(error, ...codes) {
  return error instanceof Error && "code" in error && typeof error.code === "string" && codes.includes(error.code);
}
function resolvedPath(path) {
  try {
    return realpathSync(path);
  } catch (error) {
    if (hasCode(error, "ENOENT", "ELOOP")) return void 0;
    throw error;
  }
}
function ensureCaptureDirSync(root, dir) {
  const rootPath = resolve(root);
  const target = resolve(dir);
  const rel = relative(rootPath, target);
  if (rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new CaptureDirRefusedError(
      `Refusing to create ${target}: it is outside the capture directory ${rootPath}`
    );
  }
  mkdirSync(rootPath, { recursive: true });
  let current = rootPath;
  let expected = realpathSync(rootPath);
  for (const segment of rel.split(sep).filter(Boolean)) {
    current = join(current, segment);
    expected = join(expected, segment);
    try {
      mkdirSync(current);
    } catch (error) {
      if (!hasCode(error, "EEXIST")) throw error;
    }
    if (resolvedPath(current) !== expected) {
      throw new CaptureDirRefusedError(
        `Refusing to write into ${current}: it resolves outside the capture directory ${rootPath}`
      );
    }
    if (!statSync(current).isDirectory()) {
      throw new CaptureDirRefusedError(`Refusing to write into ${current}: it is not a directory`);
    }
  }
  return target;
}

export {
  NavigationDeadlineError,
  CaptureDirRefusedError,
  writeCaptureFileSync,
  ensureCaptureDirSync
};
