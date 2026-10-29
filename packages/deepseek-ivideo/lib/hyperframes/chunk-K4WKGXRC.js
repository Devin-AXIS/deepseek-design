import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/textFile.ts
import { existsSync } from "fs";
import { extname, resolve } from "path";
function isTextFile(input) {
  const path = resolve(input);
  return existsSync(path) && extname(path).toLowerCase() === ".txt";
}

export {
  isTextFile
};
