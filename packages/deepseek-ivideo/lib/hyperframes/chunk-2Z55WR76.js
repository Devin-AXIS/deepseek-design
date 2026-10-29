import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../core/dist/safePath.js
import { resolve, sep, join, dirname, basename, relative, isAbsolute } from "path";
import { lstatSync, mkdirSync, realpathSync, statSync } from "fs";
function realpath(path) {
  try {
    return realpathSync.native(path);
  } catch (error) {
    if (error.code === "EISDIR")
      return realpathSync(path);
    throw error;
  }
}
function isMissingPath(path) {
  try {
    lstatSync(path);
    return false;
  } catch (error) {
    return Boolean(error && typeof error === "object" && "code" in error && (error.code === "ENOENT" || error.code === "ENOTDIR"));
  }
}
function isSafePath(base, resolved) {
  let baseReal;
  try {
    baseReal = realpath(resolve(base));
  } catch {
    return false;
  }
  const target = resolve(resolved);
  const trailing = [];
  let probe = target;
  for (; ; ) {
    let ancestorReal;
    try {
      ancestorReal = realpath(probe);
    } catch {
      if (!isMissingPath(probe))
        return false;
      const parent = dirname(probe);
      if (parent === probe)
        return false;
      trailing.push(basename(probe));
      probe = parent;
      continue;
    }
    const targetReal = trailing.length ? join(ancestorReal, ...[...trailing].reverse()) : ancestorReal;
    return targetReal === baseReal || targetReal.startsWith(baseReal + sep);
  }
}
function resolveWithinProject(base, relativePath) {
  const resolved = resolve(base, relativePath);
  return isSafePath(base, resolved) ? resolved : null;
}
var ProjectRootMissingError = class extends Error {
  root;
  constructor(root) {
    super(`Project folder not found: ${root}`);
    this.root = root;
    this.name = "ProjectRootMissingError";
  }
};
var isProjectRootMissing = (error) => error instanceof Error && error.name === "ProjectRootMissingError";
function folderGone(dir) {
  try {
    return !statSync(dir, { throwIfNoEntry: false });
  } catch {
    return false;
  }
}
function realProjectRoot(root) {
  try {
    return realpath(root);
  } catch (error) {
    if (folderGone(root))
      throw new ProjectRootMissingError(root);
    throw error;
  }
}
function mkdirWithinProject(root, dir) {
  if (folderGone(root))
    throw new ProjectRootMissingError(root);
  const inside = relative(resolve(root), resolve(dir));
  if (inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  let path = resolve(root);
  for (const part of inside.split(sep).filter(Boolean)) {
    path = join(path, part);
    try {
      mkdirSync(path);
    } catch (error) {
      const code = error.code;
      if (code === "ENOENT" && folderGone(root))
        throw new ProjectRootMissingError(root);
      if (code !== "EEXIST")
        throw error;
    }
  }
}

export {
  realpath,
  isSafePath,
  resolveWithinProject,
  isProjectRootMissing,
  folderGone,
  realProjectRoot,
  mkdirWithinProject
};
