import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  realpath
} from "./chunk-2Z55WR76.js";

// ../core/dist/atomicFile.js
import * as fs from "fs";
import { randomBytes } from "crypto";
import { basename, dirname, isAbsolute, join, resolve, sep } from "path";
var NO_HARD_LINKS = /* @__PURE__ */ new Set(["EPERM", "ENOTSUP", "EOPNOTSUPP", "EXDEV", "EISDIR"]);
var BUSY_RENAME = /* @__PURE__ */ new Set(["EPERM", "EBUSY", "EACCES"]);
var RENAME_RETRY_DELAYS_MS = [10, 20, 30, 40];
var MAX_LINK_HOPS = 40;
var TEMP_NAME_TRIES = 3;
var TEMP_SUFFIX = /\.hf[0-9a-f]{6}\.tmp$/;
function atomicTempPath(filePath) {
  return `${filePath}.hf${randomBytes(3).toString("hex")}.tmp`;
}
function isAtomicTempPath(path) {
  return TEMP_SUFFIX.test(path);
}
function replaceFileAtomically(filePath, content, mode, operations = fs) {
  publishSibling(filePath, content, mode, operations, (tempPath) => renameWithRetry(operations, tempPath, filePath));
}
function createFileAtomically(filePath, content, operations = fs) {
  publishSibling(filePath, content, void 0, operations, (tempPath) => {
    try {
      operations.linkSync(tempPath, filePath);
    } catch (error) {
      if (!NO_HARD_LINKS.has(errorCode(error)))
        throw error;
      createDirectly(filePath, content, operations);
    }
    try {
      operations.unlinkSync(tempPath);
    } catch (error) {
      console.warn(`[hyperframes] created ${filePath} but could not remove ${tempPath}: ${error}`);
    }
  });
}
function createDirectly(filePath, content, operations) {
  const fd = operations.openSync(filePath, "wx");
  let open = true;
  try {
    operations.writeFileSync(fd, content);
    open = false;
    operations.closeSync(fd);
  } catch (error) {
    try {
      if (open)
        operations.closeSync(fd);
    } catch {
    }
    try {
      operations.unlinkSync(filePath);
    } catch {
    }
    throw error;
  }
}
function resolveWritePath(filePath) {
  let path = resolve(filePath);
  for (let hop = 0; hop < MAX_LINK_HOPS; hop++) {
    try {
      return realpath(path);
    } catch (error) {
      if (errorCode(error) !== "ENOENT")
        throw error;
    }
    const parent = realpath(dirname(path));
    const leaf = join(parent, basename(path));
    if (!fs.lstatSync(leaf, { throwIfNoEntry: false })?.isSymbolicLink())
      return leaf;
    const target = fs.readlinkSync(leaf);
    path = isAbsolute(target) ? target : `${parent}${sep}${target}`;
  }
  throw Object.assign(new Error(`ELOOP: too many symbolic links, '${filePath}'`), {
    code: "ELOOP"
  });
}
function publishSibling(filePath, content, mode, operations, publish) {
  const tempPath = writeTempSibling(filePath, content, mode, operations);
  try {
    if (mode !== void 0)
      operations.chmodSync(tempPath, mode);
    publish(tempPath);
  } catch (error) {
    try {
      operations.unlinkSync(tempPath);
    } catch {
    }
    throw error;
  }
}
function writeTempSibling(filePath, content, mode, operations) {
  for (let attempt = 1; ; attempt++) {
    const tempPath = atomicTempPath(filePath);
    try {
      operations.writeFileSync(tempPath, content, { encoding: "utf-8", mode, flag: "wx" });
      return tempPath;
    } catch (error) {
      if (errorCode(error) === "EEXIST") {
        if (attempt < TEMP_NAME_TRIES)
          continue;
        throw error;
      }
      try {
        operations.unlinkSync(tempPath);
      } catch {
      }
      throw error;
    }
  }
}
function renameWithRetry(operations, from, to) {
  for (let attempt = 0; ; attempt++) {
    try {
      operations.renameSync(from, to);
      return;
    } catch (error) {
      const delay = RENAME_RETRY_DELAYS_MS[attempt];
      if (delay === void 0 || !BUSY_RENAME.has(errorCode(error)))
        throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
    }
  }
}
function errorCode(error) {
  return String(error?.code);
}

export {
  atomicTempPath,
  isAtomicTempPath,
  replaceFileAtomically,
  createFileAtomically,
  resolveWritePath
};
