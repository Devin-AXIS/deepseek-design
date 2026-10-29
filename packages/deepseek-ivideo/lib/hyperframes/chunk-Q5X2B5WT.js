import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/lintProject.ts
function hasDefinitiveEntryMismatch(result) {
  return result.results.some(
    (entry) => entry.result.findings.some(
      (finding) => finding.code === "blank_root_with_standalone_composition"
    )
  );
}
function definitiveEntryMismatchComposition(result) {
  for (const entry of result.results) {
    const finding = entry.result.findings.find(
      (candidate) => candidate.code === "blank_root_with_standalone_composition"
    );
    if (finding) return finding.suggestedComposition;
  }
  return void 0;
}

export {
  hasDefinitiveEntryMismatch,
  definitiveEntryMismatchComposition
};
