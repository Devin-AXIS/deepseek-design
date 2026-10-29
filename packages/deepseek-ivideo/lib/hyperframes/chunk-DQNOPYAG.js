import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  VERSION
} from "./chunk-MUINFURL.js";

// src/registry/compatibility.ts
import { compareVersions } from "compare-versions";
var DEV_VERSION = "0.0.0-dev";
function checkRegistryItemCompatibility(item, currentCliVersion = VERSION) {
  const warnings = [];
  if (item.deprecated) {
    warnings.push(`Registry item "${item.name}" is deprecated: ${item.deprecated}`);
  }
  const minCliVersion = item.minCliVersion?.trim();
  if (!minCliVersion || currentCliVersion === DEV_VERSION) {
    return { warnings };
  }
  try {
    if (compareVersions(currentCliVersion, minCliVersion) >= 0) {
      return { warnings };
    }
  } catch {
    return {
      warnings,
      error: `Registry item "${item.name}" declares invalid minCliVersion "${minCliVersion}".`
    };
  }
  return {
    warnings,
    error: `Registry item "${item.name}" requires hyperframes >= ${minCliVersion} (current: ${currentCliVersion}). Run \`npx hyperframes@latest add ${item.name}\` or upgrade your installed hyperframes CLI.`
  };
}
var RegistryCompatibilityError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "RegistryCompatibilityError";
  }
};
function gateRegistryItemsCompatibility(items, currentCliVersion = VERSION) {
  const warnings = [];
  for (const item of items) {
    const result = checkRegistryItemCompatibility(item, currentCliVersion);
    if (result.error) {
      throw new RegistryCompatibilityError(result.error);
    }
    warnings.push(...result.warnings);
  }
  return warnings;
}

export {
  RegistryCompatibilityError,
  gateRegistryItemsCompatibility
};
