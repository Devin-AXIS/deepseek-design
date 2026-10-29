import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  errorBox
} from "./chunk-IHFUKJOR.js";
import {
  trackCommandFailure
} from "./chunk-D3TRQ4GS.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";

// src/utils/project.ts
import { existsSync, statSync } from "fs";
import { resolve, basename } from "path";
var InvalidProjectError = class extends Error {
  title;
  hint;
  suggestion;
  constructor(title, hint, suggestion) {
    super(title);
    this.name = "InvalidProjectError";
    this.title = title;
    this.hint = hint;
    this.suggestion = suggestion;
  }
};
function resolveProjectOrThrow(dirArg, options = {}) {
  const trimmed = dirArg?.trim();
  if (trimmed === "#") {
    throw new InvalidProjectError(
      "Invalid project directory: #",
      "# is a URL fragment, not a project path.",
      "Run hyperframes preview . from your project directory."
    );
  }
  const dir = resolve(dirArg ?? ".");
  const name = basename(dir);
  const indexPath = resolve(dir, "index.html");
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    throw new InvalidProjectError("Not a directory: " + dir);
  }
  if (options.requireIndex !== false && !existsSync(indexPath)) {
    throw new InvalidProjectError(
      "No composition found in " + dir,
      "No index.html file found.",
      "Run npx hyperframes init to create a new composition."
    );
  }
  return { dir, name, indexPath };
}
function resolveProject(dirArg, options = {}) {
  try {
    return resolveProjectOrThrow(dirArg, options);
  } catch (err) {
    if (err instanceof InvalidProjectError) {
      trackCommandFailure(process.argv[2] ?? "unknown", err);
      errorBox(err.title, err.hint, err.suggestion);
      failCommand(1, err);
    }
    throw err;
  }
}

export {
  resolveProjectOrThrow,
  resolveProject
};
