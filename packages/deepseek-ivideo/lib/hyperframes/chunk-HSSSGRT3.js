import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  DEFAULT_REGISTRY_URL,
  fetchItemFile,
  publishRegistryFile,
  registryTargetPath,
  validRegistryItem
} from "./chunk-JMNDOZF2.js";
import {
  realProjectRoot
} from "./chunk-SIG2LUMK.js";
import {
  isCompositionVariable
} from "./chunk-ZCT2RZ33.js";

// ../core/dist/runtime/validateVariables.js
function validateVariables(values, declarations) {
  const decls = /* @__PURE__ */ new Map();
  for (const decl of declarations)
    decls.set(decl.id, decl);
  const issues = [];
  for (const [id, value] of Object.entries(values)) {
    const decl = decls.get(id);
    if (!decl) {
      issues.push({ kind: "undeclared", variableId: id });
      continue;
    }
    const mismatch = checkType(value, decl);
    if (mismatch)
      issues.push(mismatch);
  }
  return issues;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function checkType(value, decl) {
  switch (decl.type) {
    case "string":
    case "color":
      if (typeof value !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: decl.type,
          actual: jsTypeOf(value)
        };
      }
      return null;
    case "number":
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "number",
          actual: jsTypeOf(value)
        };
      }
      return null;
    case "boolean":
      if (typeof value !== "boolean") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "boolean",
          actual: jsTypeOf(value)
        };
      }
      return null;
    case "enum": {
      if (typeof value !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "enum (string)",
          actual: jsTypeOf(value)
        };
      }
      const allowed = decl.options.map((o) => o.value);
      if (!allowed.includes(value)) {
        return { kind: "enum-out-of-range", variableId: decl.id, allowed, actual: value };
      }
      return null;
    }
    case "font": {
      if (typeof value === "string")
        return null;
      if (!isPlainObject(value)) {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "font (object {name, source} or string)",
          actual: jsTypeOf(value)
        };
      }
      if (typeof value.name !== "string" || typeof value.source !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "font object {name: string, source: string}",
          actual: "object missing string name/source"
        };
      }
      return null;
    }
    case "image": {
      if (typeof value === "string")
        return null;
      if (!isPlainObject(value)) {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "image (object {url} or string)",
          actual: jsTypeOf(value)
        };
      }
      if (typeof value.url !== "string") {
        return {
          kind: "type-mismatch",
          variableId: decl.id,
          expected: "image object {url: string}",
          actual: "object missing string url"
        };
      }
      return null;
    }
  }
}
function jsTypeOf(value) {
  if (value === null)
    return "null";
  if (Array.isArray(value))
    return "array";
  return typeof value;
}

// src/registry/variableDefaults.ts
var InvalidVariableValuesError = class extends Error {
  constructor(invalid) {
    super(`--vars refused: ${invalid.map(({ id, reason }) => `${id}: ${reason}`).join("; ")}`);
    this.invalid = invalid;
    this.name = "InvalidVariableValuesError";
  }
  invalid;
};
var ATTR = "data-composition-variables";
function findDeclaration(source) {
  const at = source.indexOf(`${ATTR}=`);
  if (at === -1) return null;
  const quote = source[at + ATTR.length + 1];
  if (quote !== "'" && quote !== '"') return null;
  const start = at + ATTR.length + 2;
  const end = source.indexOf(quote, start);
  if (end === -1) return null;
  return { start, end, raw: source.slice(start, end) };
}
function decode(raw) {
  return raw.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}
function encode(json, quote) {
  return quote === "'" ? json.replace(/'/g, "&#39;") : json.replace(/"/g, "&quot;");
}
function rejectNumber(decl, value) {
  if (decl.type !== "number") return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "not a number";
  if (decl.min !== void 0 && n < decl.min) return `below min ${decl.min}`;
  if (decl.max !== void 0 && n > decl.max) return `above max ${decl.max}`;
  return null;
}
function reject(decl, value) {
  if (decl.type === "number") return rejectNumber(decl, value);
  const [issue] = validateVariables({ [decl.id]: value }, [decl]);
  if (!issue) return null;
  if (issue.kind === "enum-out-of-range") return `not one of ${issue.allowed.join(", ")}`;
  if (issue.kind === "type-mismatch") return `expected ${issue.expected}, got ${issue.actual}`;
  return null;
}
function applyVariableDefaults(source, values) {
  const ids = Object.keys(values);
  if (ids.length === 0) return { html: source, applied: [], unknown: [], invalid: [] };
  const found = findDeclaration(source);
  if (!found) return { html: source, applied: [], unknown: ids, invalid: [] };
  let parsed;
  try {
    parsed = JSON.parse(decode(found.raw));
  } catch {
    return { html: source, applied: [], unknown: ids, invalid: [] };
  }
  if (!Array.isArray(parsed)) return { html: source, applied: [], unknown: ids, invalid: [] };
  const declared = parsed.filter(isCompositionVariable);
  if (declared.length !== parsed.length) {
    return { html: source, applied: [], unknown: ids, invalid: [] };
  }
  const applied = [];
  const invalid = [];
  const byId = new Map(declared.map((decl) => [decl.id, decl]));
  const updated = /* @__PURE__ */ new Map();
  for (const [id, value] of Object.entries(values)) {
    const decl = byId.get(id);
    if (!decl) continue;
    const reason = reject(decl, value);
    if (reason) {
      invalid.push({ id, reason });
      continue;
    }
    updated.set(id, decl.type === "number" ? Number(value) : value);
    applied.push(id);
  }
  const unknown = ids.filter((id) => !byId.has(id));
  if (applied.length === 0) return { html: source, applied, unknown, invalid };
  const quote = source[found.start - 1];
  const body = declared.map((decl) => {
    const next = updated.has(decl.id) ? { ...decl, default: updated.get(decl.id) } : decl;
    return `    ${JSON.stringify(next)}`;
  }).join(",\n");
  const rewritten = encode(`[
${body}
  ]`, quote);
  const html = source.slice(0, found.start) + rewritten + source.slice(found.end);
  return { html, applied, unknown, invalid };
}

// src/registry/installer.ts
import { createHash } from "crypto";
import { existsSync, readFileSync } from "fs";
import { resolve, relative, isAbsolute } from "path";
var INSTALL_RECORD = "hyperframes.lock.json";
function digest(contents) {
  return createHash("sha256").update(contents).digest("hex");
}
function readInstallRecord(destDir) {
  const path = registryTargetPath(destDir, INSTALL_RECORD);
  if (!existsSync(path)) return {};
  try {
    const parsed = JSON.parse(readFileSync(path, "utf-8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const record = {};
    for (const [target, hash] of Object.entries(parsed)) {
      if (typeof hash === "string") record[target] = hash;
    }
    return record;
  } catch {
    return {};
  }
}
function writeInstallRecord(destDir, record) {
  const sorted = Object.fromEntries(Object.entries(record).sort(([a], [b]) => a.localeCompare(b)));
  publishRegistryFile(destDir, INSTALL_RECORD, `${JSON.stringify(sorted, null, 2)}
`);
}
function recordRewrittenInstall(destDir, written) {
  if (written.length === 0) return;
  const root = realProjectRoot(destDir);
  const record = readInstallRecord(root);
  const rewritten = new Set(written);
  for (const target of Object.keys(record)) {
    let path;
    try {
      path = registryTargetPath(root, target);
    } catch {
      continue;
    }
    if (rewritten.has(path)) record[target] = digest(readFileSync(path));
  }
  writeInstallRecord(root, record);
}
function hasLocalEdits(record, target, onDisk) {
  const installed = record[target];
  if (!installed) return true;
  return installed !== digest(onDisk);
}
function keptByProject(record, destPath, target, force) {
  return !force && existsSync(destPath) && hasLocalEdits(record, target, readFileSync(destPath));
}
function assertSafeTarget(destDir, target) {
  if (isAbsolute(target)) {
    throw new Error(`Unsafe target "${target}": absolute paths are not allowed.`);
  }
  if (/(^|[/\\])\.\.([/\\]|$)/.test(target)) {
    throw new Error(`Unsafe target "${target}": path segments may not contain "..".`);
  }
  if (/^[A-Za-z]:[/\\]/.test(target)) {
    throw new Error(`Unsafe target "${target}": Windows drive letters are not allowed.`);
  }
  const resolved = resolve(destDir, target);
  const rel = relative(resolve(destDir), resolved);
  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`Unsafe target "${target}": resolves outside destDir ${destDir}.`);
  }
}
function isInstalledComponentSnippet(item, file) {
  return item.type === "hyperframes:component" && file.target.toLowerCase().endsWith(".html");
}
function isInstalledRegistryBlockComposition(item, file) {
  return item.type === "hyperframes:block" && file.type === "hyperframes:composition" && file.target.toLowerCase().endsWith(".html");
}
function addRegistryItemMarker(source, item) {
  if (/^\s*<!--\s*hyperframes-registry-item:[^>]*-->/i.test(source.slice(0, 512))) {
    return source;
  }
  return `<!-- hyperframes-registry-item: ${item.name} -->
${source}`;
}
function bakeVariables(item, file, bytes, values) {
  const component = isInstalledComponentSnippet(item, file);
  if (!values || !(component || isInstalledRegistryBlockComposition(item, file))) {
    return { bytes, vars: null };
  }
  const vars = applyVariableDefaults(bytes.toString("utf8"), values);
  const rewrite = component && vars.applied.length > 0;
  return { bytes: rewrite ? Buffer.from(vars.html) : bytes, vars };
}
async function prepareOneFile(item, file, destDir, baseUrl, record, options, budget) {
  const destPath = registryTargetPath(destDir, file.target);
  if (keptByProject(record, destPath, file.target, options.force)) {
    return { destPath, target: file.target, preserved: true, hash: null, vars: null, bytes: null };
  }
  let bytes = await fetchItemFile(item, file, baseUrl, budget);
  if (isInstalledRegistryBlockComposition(item, file)) {
    bytes = Buffer.from(addRegistryItemMarker(bytes.toString("utf8"), item));
  }
  const baked = bakeVariables(item, file, bytes, options.variableValues);
  bytes = baked.bytes;
  const vars = baked.vars;
  return {
    destPath,
    target: file.target,
    preserved: false,
    hash: digest(bytes),
    vars,
    bytes
  };
}
async function installItem(item, options) {
  return publishItem(await prepareItem(item, options));
}
async function prepareItem(item, options) {
  if (!validRegistryItem(item, item.name, item.type)) throw new Error("Invalid registry item");
  const baseUrl = options.baseUrl ?? DEFAULT_REGISTRY_URL;
  const destDir = resolve(options.destDir);
  for (const file of item.files) {
    assertSafeTarget(destDir, file.target);
  }
  const root = realProjectRoot(destDir);
  validatePhysicalTargets(root, item.files);
  const record = readInstallRecord(root);
  const budget = { remainingBytes: 512 * 1024 * 1024 };
  const outcomes = await installFileBatches(
    item.files,
    (file) => prepareOneFile(item, file, root, baseUrl, record, options, budget)
  );
  const invalid = outcomes.flatMap((o) => o.vars?.invalid ?? []);
  if (invalid.length > 0) throw new InvalidVariableValuesError(invalid);
  return { root, outcomes, force: options.force ?? false };
}
function publishItem({ root, outcomes: prepared, force }) {
  const record = readInstallRecord(root);
  const outcomes = prepared.map(
    (o) => o.bytes && keptByProject(record, o.destPath, o.target, force) ? { ...o, preserved: true, hash: null, vars: null, bytes: null } : o
  );
  for (const outcome of outcomes) {
    if (outcome.bytes) publishRegistryFile(root, outcome.target, outcome.bytes);
  }
  const written = outcomes.filter((o) => !o.preserved).map((o) => o.destPath);
  const preserved = outcomes.filter((o) => o.preserved).map((o) => o.destPath);
  if (written.length > 0) {
    for (const outcome of outcomes) {
      if (outcome.hash) record[outcome.target] = outcome.hash;
    }
    writeInstallRecord(root, record);
  }
  const vars = outcomes.map((o) => o.vars).filter((v) => v !== null);
  return {
    written,
    preserved,
    variablesApplied: vars.flatMap((v) => v.applied),
    // An id nothing declared is only genuinely unknown once every file has had
    // a chance at it, so intersect rather than union.
    variablesUnknown: vars.length ? vars.reduce(
      (acc, v) => acc.filter((id) => v.unknown.includes(id)),
      vars[0].unknown
    ) : []
  };
}
function validatePhysicalTargets(root, files) {
  const targets = /* @__PURE__ */ new Set();
  const aliasKey = (path) => process.platform === "win32" || process.platform === "darwin" ? path.normalize("NFC").toLowerCase() : path;
  const recordKey = aliasKey(registryTargetPath(root, INSTALL_RECORD));
  for (const file of files) {
    const path = registryTargetPath(root, file.target);
    const key = aliasKey(path);
    if (targets.has(key) || key === recordKey)
      throw new Error("Unsafe target: duplicate or reserved install record");
    targets.add(key);
  }
}
async function installFileBatches(files, prepare) {
  const outcomes = [];
  for (let at = 0; at < files.length; at += 4) {
    const batch = await Promise.allSettled(files.slice(at, at + 4).map(prepare));
    for (const result of batch) {
      if (result.status === "rejected") throw result.reason;
      outcomes.push(result.value);
    }
  }
  return outcomes;
}

export {
  InvalidVariableValuesError,
  recordRewrittenInstall,
  installItem,
  prepareItem,
  publishItem
};
