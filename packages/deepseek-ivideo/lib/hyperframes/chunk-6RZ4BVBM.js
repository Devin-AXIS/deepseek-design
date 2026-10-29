import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  ensureDOMParser
} from "./chunk-PFCFR3KZ.js";
import {
  errorBox
} from "./chunk-IHFUKJOR.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import {
  formatVariableValidationIssue,
  validateVariables
} from "./chunk-SIG2LUMK.js";
import {
  extractCompositionMetadata
} from "./chunk-AR25A7XZ.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/utils/variables.ts
import { readFileSync } from "fs";
import { resolve } from "path";
function parseVariablesArg(inline, filePath, readFile = (p) => readFileSync(resolve(p), "utf8")) {
  if (inline != null && filePath != null) {
    return { ok: false, error: { kind: "conflict" } };
  }
  let raw;
  let source;
  if (inline != null) {
    raw = inline;
    source = "inline";
  } else if (filePath != null) {
    try {
      raw = readFile(filePath);
      source = "file";
    } catch (error) {
      return {
        ok: false,
        error: {
          kind: "read-error",
          path: filePath,
          cause: error instanceof Error ? error.message : String(error)
        }
      };
    }
  }
  if (raw == null) return { ok: true, value: void 0 };
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return {
      ok: false,
      error: {
        kind: "parse-error",
        source: source ?? "inline",
        cause: error instanceof Error ? error.message : String(error)
      }
    };
  }
  if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: { kind: "shape-error" } };
  }
  return { ok: true, value: parsed };
}
function variablesErrorMessage(error) {
  switch (error.kind) {
    case "conflict":
      return {
        title: "Conflicting variables flags",
        message: "Use either --variables or --variables-file, not both."
      };
    case "read-error":
      return {
        title: "Could not read --variables-file",
        message: `${error.path}: ${error.cause}`
      };
    case "parse-error":
      return {
        title: error.source === "file" ? "Invalid JSON in --variables-file" : "Invalid JSON in --variables",
        message: error.cause
      };
    case "shape-error":
      return {
        title: "Invalid variables payload",
        message: 'Variables must be a JSON object (e.g. {"title":"Hello"}).'
      };
  }
}
function resolveVariablesArg(inline, filePath) {
  const result = parseVariablesArg(inline, filePath);
  if (!result.ok) {
    const { title, message } = variablesErrorMessage(result.error);
    errorBox(title, message);
    failCommand();
  }
  return result.value;
}
function validateVariablesAgainstProject(indexPath, values) {
  const schema = loadProjectVariableSchema(indexPath);
  return validateVariablesAgainstSchema(values, schema);
}
function loadProjectVariableSchema(indexPath) {
  let html;
  try {
    html = readFileSync(indexPath, "utf8");
  } catch {
    return [];
  }
  ensureDOMParser();
  return extractCompositionMetadata(html).variables;
}
function validateVariablesAgainstSchema(values, schema) {
  if (schema.length === 0) return [];
  return validateVariables(values, schema);
}
function reportVariableIssues(issues, options) {
  if (issues.length === 0) return;
  const { strict, quiet } = options;
  if (!quiet) {
    console.log("");
    console.log(
      c.warn(
        `Variable ${issues.length === 1 ? "issue" : "issues"} (${issues.length}) \u2014 values may not render as expected:`
      )
    );
    for (const issue of issues) {
      console.log("  " + c.dim(formatVariableValidationIssue(issue)));
    }
    console.log("");
  }
  if (strict) {
    errorBox(
      "Variable validation failed",
      "Aborting render due to variable issues (--strict-variables mode)."
    );
    failCommand();
  }
}

export {
  resolveVariablesArg,
  validateVariablesAgainstProject,
  loadProjectVariableSchema,
  validateVariablesAgainstSchema,
  reportVariableIssues
};
