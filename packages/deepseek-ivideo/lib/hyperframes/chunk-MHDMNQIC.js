import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../core/dist/runtime/getVariables.js
var warnedUnknownEnumValues = /* @__PURE__ */ new Set();
function readDeclarations(el) {
  const raw = el?.getAttribute("data-composition-variables");
  if (!raw)
    return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed))
    return [];
  return parsed.filter((entry) => !!entry && typeof entry === "object");
}
function compositionLabel(declarer, compositionId) {
  return compositionId?.trim() || declarer.getAttribute("data-composition-id")?.trim() || declarer.querySelector("[data-composition-id]")?.getAttribute("data-composition-id")?.trim() || "composition";
}
function declaredOptions(entry) {
  if (!Array.isArray(entry.options))
    return [];
  return entry.options.map((option) => option && typeof option === "object" ? option.value : option).filter((v) => typeof v === "string" || typeof v === "number");
}
function unknownEnumValue(entry, resolved) {
  if (typeof entry.id !== "string")
    return null;
  const value = resolved[entry.id];
  if (value === void 0 || value === null)
    return null;
  if ("default" in entry && String(value) === String(entry.default))
    return null;
  const allowed = declaredOptions(entry);
  if (allowed.length === 0 || allowed.some((v) => String(v) === String(value)))
    return null;
  return { id: entry.id, value, allowed };
}
function warnUnknownEnumValues(declarer, resolved, compositionId) {
  if (!declarer)
    return;
  const entries = readDeclarations(declarer);
  if (entries.length === 0)
    return;
  const move = compositionLabel(declarer, compositionId);
  for (const entry of entries) {
    const found = unknownEnumValue(entry, resolved);
    if (!found)
      continue;
    const key = `${move}|${found.id}|${String(found.value)}`;
    if (warnedUnknownEnumValues.has(key))
      continue;
    warnedUnknownEnumValues.add(key);
    const fallback = "default" in entry ? JSON.stringify(entry.default) : "the composition default";
    console.warn(`[hyperframes] runtime_unknown_enum_value: ${move} variable "${found.id}" got ${JSON.stringify(found.value)}, which is not a declared option (${found.allowed.join(", ")}). Rendering ${fallback} instead.`);
  }
}
function readDeclaredDefaults(root) {
  const out = {};
  for (const entry of readDeclarations(root)) {
    if (typeof entry.id !== "string" || !("default" in entry))
      continue;
    out[entry.id] = entry.default;
  }
  return out;
}
function parseHostVariableValues(host) {
  const raw = host.getAttribute("data-variable-values");
  if (!raw)
    return {};
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
    return {};
  return parsed;
}

export {
  warnUnknownEnumValues,
  readDeclaredDefaults,
  parseHostVariableValues
};
