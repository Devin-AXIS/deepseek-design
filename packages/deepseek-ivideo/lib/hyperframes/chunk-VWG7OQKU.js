import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/ui/diagnostics.ts
var diag = {
  /** A user-facing notice or progress line (e.g. "Installing … skills…"). */
  notice(...args) {
    console.error(...args);
  },
  /** A warning the user should see but that isn't fatal. */
  warn(...args) {
    console.warn(...args);
  }
};

export {
  diag
};
