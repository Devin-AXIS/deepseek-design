import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/errorMessage.ts
function normalizeErrorMessage(error) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    const msg = error.message;
    if (typeof msg === "string") return msg;
    try {
      return JSON.stringify(error);
    } catch {
      try {
        return `{${Object.keys(error).join(", ")}}`;
      } catch {
      }
    }
  }
  return String(error ?? "unknown error");
}

export {
  normalizeErrorMessage
};
