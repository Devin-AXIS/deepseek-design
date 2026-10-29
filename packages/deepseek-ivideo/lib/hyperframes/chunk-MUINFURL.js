import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/version.ts
var VERSION = true ? "0.8.140" : "0.0.0-dev";
var PRODUCER_VERSION = true ? "0.8.140" : "0.0.0-dev";

export {
  VERSION,
  PRODUCER_VERSION
};
