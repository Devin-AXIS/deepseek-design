import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/pathArgs.ts
import { isAbsolute, relative, resolve } from "path";
function readOptionalString(value) {
  if (typeof value !== "string") return void 0;
  const trimmed = value.trim();
  return trimmed ? trimmed : void 0;
}
function resolveFromBase(baseDir, input) {
  return isAbsolute(input) ? input : resolve(baseDir, input);
}
function displayPathFromBase(baseDir, filePath) {
  const rel = relative(baseDir, filePath);
  if (rel && !rel.startsWith("..") && !isAbsolute(rel)) return rel;
  return filePath;
}
function displayPathFromInput(baseDir, input) {
  return isAbsolute(input) ? displayPathFromBase(baseDir, input) : input;
}

export {
  readOptionalString,
  resolveFromBase,
  displayPathFromBase,
  displayPathFromInput
};
