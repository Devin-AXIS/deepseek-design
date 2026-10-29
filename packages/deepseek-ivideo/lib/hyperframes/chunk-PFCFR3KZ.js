import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  DOMParser
} from "./chunk-GK4AIFIH.js";

// src/utils/dom.ts
function ensureDOMParser() {
  if (typeof globalThis.DOMParser === "undefined") {
    globalThis.DOMParser = DOMParser;
  }
}

export {
  ensureDOMParser
};
