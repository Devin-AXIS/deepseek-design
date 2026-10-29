import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";

// src/utils/compositionFps.ts
import { readFileSync } from "fs";
import { join } from "path";
function readCompositionFps(html) {
  let doc;
  try {
    doc = parseHTML(html).document;
  } catch {
    return null;
  }
  const explicitRoot = doc.querySelector('[data-composition-id][data-root="true"]');
  const root = explicitRoot ?? Array.from(doc.querySelectorAll("[data-composition-id]")).find(
    (el) => !el.parentElement?.closest("[data-composition-id]")
  ) ?? null;
  const raw = root?.getAttribute("data-fps")?.trim();
  return raw ? raw : null;
}

export {
  readCompositionFps
};
