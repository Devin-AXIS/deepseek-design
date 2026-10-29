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
  failCommand
} from "./chunk-PBN6GBJE.js";
import {
  cssVariableName,
  slugify
} from "./chunk-VC76R6W2.js";
import {
  DOMParser
} from "./chunk-GK4AIFIH.js";

// ../core/dist/figma/client.js
var FigmaClientError = class extends Error {
  code;
  status;
  /** Low-cardinality REST call label (e.g. "images", "files_nodes") for
   *  telemetry attribution — never the raw fileKey/nodeId path. */
  endpoint;
  constructor(code, message, status, endpoint) {
    super(message);
    this.name = "FigmaClientError";
    this.code = code;
    this.status = status;
    this.endpoint = endpoint;
  }
};
var SCOPE_HINTS = {
  fileContent: "File content: Read-only",
  fileMetadata: "File metadata: Read-only",
  libraryContent: "Library content: Read-only (library_content:read)"
};
var MAX_RETRY_WAIT_MS = 6e4;
function retryAfterMs(res) {
  const raw = res.headers.get("retry-after");
  if (raw === null)
    return null;
  const secs = Number(raw);
  if (Number.isFinite(secs))
    return Math.min(MAX_RETRY_WAIT_MS, Math.max(0, secs * 1e3));
  const date = Date.parse(raw);
  if (Number.isNaN(date))
    return null;
  return Math.min(MAX_RETRY_WAIT_MS, Math.max(0, date - Date.now()));
}
async function readFigmaErrorMessage(res) {
  let text;
  try {
    text = await res.text();
  } catch {
    return null;
  }
  try {
    const body = JSON.parse(text);
    if (isRecord(body)) {
      if (typeof body.err === "string")
        return body.err;
      if (typeof body.message === "string")
        return body.message;
    }
  } catch {
  }
  return text.trim() === "" ? null : text.trim();
}
function requireNodeId(ref) {
  if (!ref.nodeId)
    throw new Error(`figma ref ${ref.fileKey} has no nodeId`);
  return ref.nodeId;
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function optionalString(value) {
  return typeof value === "string" ? value : void 0;
}
function toVariablePayload(payload) {
  if (!isRecord(payload) || typeof payload.name !== "string")
    return null;
  return {
    name: payload.name,
    key: optionalString(payload.key),
    resolvedType: optionalString(payload.resolvedType),
    valuesByMode: isRecord(payload.valuesByMode) ? payload.valuesByMode : void 0,
    variableCollectionId: optionalString(payload.variableCollectionId)
  };
}
function createFigmaClient(options) {
  const token = options.token.trim();
  if (token === "") {
    throw new FigmaClientError("NO_TOKEN", [
      "FIGMA_TOKEN is missing. One-time setup:",
      "  1. figma.com/settings \u2192 Security \u2192 Personal access tokens \u2192 Generate new token",
      "  2. Scopes (read-only is all this integration ever needs \u2014 it never writes to figma):",
      "       File content: Read-only   \xB7   File metadata: Read-only",
      "       Library content: Read-only  (needed for the `tokens` published-styles fallback)",
      "       Variables: Read-only      (optional \u2014 brand variables, requires figma Enterprise;",
      "                                  without it `tokens` falls back to published styles)",
      '  3. export FIGMA_TOKEN="figd_\u2026"  \u2014 add it to your shell profile or the project .env',
      "     so future sessions skip this step",
      "Then re-run this command."
    ].join("\n"));
  }
  const doFetch = options.fetch ?? ((url, init) => fetch(url, init));
  const base = options.baseUrl ?? "https://api.figma.com";
  const sleep = options.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  const maxRetries = options.maxRetries ?? 3;
  function forbiddenError(body, opts) {
    if (body && /invalid token/i.test(body))
      return new FigmaClientError("BAD_TOKEN", "figma rejected the token (403 Invalid token) \u2014 it is invalid, expired, or revoked. Re-mint at figma.com/settings \u2192 Security, then update FIGMA_TOKEN.", 403, opts.endpoint);
    if (opts.enterpriseGated)
      return new FigmaClientError("REQUIRES_ENTERPRISE", "figma variables require an Enterprise plan (403) \u2014 fall back to styles", 403, opts.endpoint);
    if (body && /scope/i.test(body))
      return new FigmaClientError("FORBIDDEN", `figma denied access (403): ${body} \u2014 add the named scope at figma.com/settings \u2192 Security \u2192 Personal access tokens.`, 403, opts.endpoint);
    const scopeLine = opts.scopeHint ? `This endpoint needs the "${opts.scopeHint}" scope \u2014 add it at figma.com/settings \u2192 Security \u2192 Personal access tokens.` : "The token is missing a read scope, or your account can't view this file. Check File content: Read-only + File metadata: Read-only at figma.com/settings \u2192 Security.";
    return new FigmaClientError("FORBIDDEN", `figma denied access (403). ${scopeLine} Also confirm the file is visible to your account.`, 403, opts.endpoint);
  }
  async function throwForStatus(res, path, opts) {
    if (res.ok)
      return;
    if (res.status === 401)
      throw new FigmaClientError("BAD_TOKEN", "figma rejected the token (401) \u2014 it is expired or revoked. Re-mint at figma.com/settings \u2192 Security, then update FIGMA_TOKEN.", 401, opts.endpoint);
    if (res.status === 403)
      throw forbiddenError(await readFigmaErrorMessage(res), opts);
    if (res.status === 429)
      throw new FigmaClientError("RATE_LIMITED", `figma rate limit hit (429) and still limited after ${maxRetries} retries \u2014 wait a minute and re-run, or import fewer nodes per call.`, 429, opts.endpoint);
    throw new FigmaClientError("HTTP_ERROR", `figma request failed: HTTP ${res.status} ${path}`, res.status, opts.endpoint);
  }
  async function get(path, opts) {
    let res;
    for (let attempt = 0; ; attempt += 1) {
      res = await doFetch(`${base}${path}`, { headers: { "X-Figma-Token": token } });
      if (res.status !== 429 || attempt >= maxRetries)
        break;
      const wait = retryAfterMs(res) ?? 1e3 * 2 ** attempt;
      await sleep(wait);
    }
    await throwForStatus(res, path, opts);
    return res.json();
  }
  return {
    async renderNode(ref, opts) {
      const nodeId = requireNodeId(ref);
      const [result] = await this.renderNodes(ref.fileKey, [nodeId], opts);
      if (!result || result.url === null)
        throw new FigmaClientError("RENDER_FAILED", `figma could not render node ${nodeId} as ${opts.format}`, void 0, "images");
      return { url: result.url, ext: opts.format };
    },
    async renderNodes(fileKey, nodeIds, opts) {
      if (nodeIds.length === 0)
        return [];
      const params = new URLSearchParams({ ids: nodeIds.join(","), format: opts.format });
      if (opts.scale !== void 0)
        params.set("scale", String(opts.scale));
      const body = await get(`/v1/images/${fileKey}?${params}`, {
        scopeHint: SCOPE_HINTS.fileContent,
        endpoint: "images"
      });
      const images = isRecord(body) && isRecord(body.images) ? body.images : {};
      return nodeIds.map((nodeId) => {
        const url = images[nodeId];
        return {
          nodeId,
          url: typeof url === "string" && url !== "" ? url : null,
          ext: opts.format
        };
      });
    },
    async imageFills(fileKey) {
      const body = await get(`/v1/files/${fileKey}/images`, {
        scopeHint: SCOPE_HINTS.fileContent,
        endpoint: "files_images"
      });
      const meta = isRecord(body) && isRecord(body.meta) ? body.meta : {};
      const images = isRecord(meta.images) ? meta.images : {};
      const out = /* @__PURE__ */ new Map();
      for (const [ref, url] of Object.entries(images)) {
        if (typeof url === "string")
          out.set(ref, url);
      }
      return out;
    },
    async variables(fileKey) {
      const body = await get(`/v1/files/${fileKey}/variables/local`, {
        enterpriseGated: true,
        endpoint: "variables_local"
      });
      const meta = isRecord(body) && isRecord(body.meta) ? body.meta : {};
      const variables = isRecord(meta.variables) ? meta.variables : {};
      const collections = isRecord(meta.variableCollections) ? meta.variableCollections : {};
      const typed = {};
      for (const [id, payload] of Object.entries(variables)) {
        const v = toVariablePayload(payload);
        if (v)
          typed[id] = v;
      }
      return { variables: typed, variableCollections: collections };
    },
    async styles(fileKey) {
      const body = await get(`/v1/files/${fileKey}/styles`, {
        scopeHint: SCOPE_HINTS.libraryContent,
        endpoint: "styles"
      });
      const meta = isRecord(body) && isRecord(body.meta) ? body.meta : {};
      const styles = Array.isArray(meta.styles) ? meta.styles : [];
      return styles.filter((s) => isRecord(s) && typeof s.key === "string" && typeof s.name === "string" && typeof s.style_type === "string");
    },
    async nodeTree(ref) {
      const nodeId = requireNodeId(ref);
      const params = new URLSearchParams({ ids: nodeId, geometry: "paths" });
      const body = await get(`/v1/files/${ref.fileKey}/nodes?${params}`, {
        scopeHint: SCOPE_HINTS.fileContent,
        endpoint: "files_nodes"
      });
      const nodes = isRecord(body) && isRecord(body.nodes) ? body.nodes : {};
      const entry = nodes[nodeId];
      const doc = isRecord(entry) ? entry.document : void 0;
      if (!isRecord(doc) || typeof doc.id !== "string" || typeof doc.name !== "string" || typeof doc.type !== "string")
        throw new FigmaClientError("NODE_NOT_FOUND", `node ${nodeId} not found in ${ref.fileKey}`, void 0, "files_nodes");
      return { ...doc, id: doc.id, name: doc.name, type: doc.type };
    },
    async fileVersion(fileKey) {
      const body = await get(`/v1/files/${fileKey}?depth=1`, {
        scopeHint: SCOPE_HINTS.fileMetadata,
        endpoint: "file_meta"
      });
      const version = isRecord(body) && typeof body.version === "string" ? body.version : "";
      const lastModified = isRecord(body) && typeof body.lastModified === "string" ? body.lastModified : "";
      return { version, lastModified };
    }
  };
}

// ../core/dist/figma/parseFigmaRef.js
var FILE_KEY_RE = /\/(?:design|file|proto)\/([A-Za-z0-9]+)/;
function normalizeNodeId(raw) {
  return raw.replaceAll("-", ":");
}
function parseFigmaRef(input) {
  const trimmed = input.trim();
  if (trimmed.length === 0)
    throw new Error("parseFigmaRef: empty input");
  if (!trimmed.includes("/")) {
    const colon = trimmed.indexOf(":");
    if (colon === -1)
      return { fileKey: trimmed };
    const fileKey2 = trimmed.slice(0, colon);
    const node = trimmed.slice(colon + 1);
    if (fileKey2.length === 0)
      throw new Error(`parseFigmaRef: invalid ref "${input}"`);
    return node.length > 0 ? { fileKey: fileKey2, nodeId: normalizeNodeId(node) } : { fileKey: fileKey2 };
  }
  const keyMatch = trimmed.match(FILE_KEY_RE);
  const fileKey = keyMatch?.[1];
  if (fileKey === void 0)
    throw new Error(`parseFigmaRef: no fileKey in "${input}"`);
  const q = trimmed.indexOf("?");
  if (q !== -1) {
    const raw = new URLSearchParams(trimmed.slice(q + 1)).get("node-id");
    if (raw !== null && raw.length > 0)
      return { fileKey, nodeId: normalizeNodeId(raw) };
  }
  return { fileKey };
}

// ../core/dist/figma/freeze.js
import { copyFileSync, mkdirSync, rmSync, statSync, writeFileSync } from "fs";
import { dirname } from "path";
var MAX_FREEZE_BYTES = 256 * 1024 * 1024;
function exceedsFreezeCap(byteLength) {
  return byteLength > MAX_FREEZE_BYTES;
}
function freezeBytes(bytes, destPath) {
  if (bytes.length === 0)
    throw new Error("freeze failed: empty bytes");
  if (exceedsFreezeCap(bytes.length))
    throw new Error(`freeze failed: ${bytes.length} bytes exceeds ${MAX_FREEZE_BYTES} cap`);
  mkdirSync(dirname(destPath), { recursive: true });
  try {
    writeFileSync(destPath, bytes, { flag: "wx" });
  } catch (err) {
    if (err.code !== "EEXIST")
      throw err;
    rmSync(destPath);
    writeFileSync(destPath, bytes, { flag: "wx" });
  }
  return bytes.length;
}

// ../core/dist/figma/manifest.js
import { appendFileSync, existsSync as existsSync2, mkdirSync as mkdirSync2, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "fs";
import { join } from "path";

// ../core/dist/figma/jsonl.js
import { existsSync, readFileSync } from "fs";
function readJsonlValues(path) {
  if (!existsSync(path))
    return [];
  const out = [];
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0)
      continue;
    try {
      out.push(JSON.parse(trimmed));
    } catch {
      console.warn(`skipping malformed jsonl line in ${path}: ${trimmed.slice(0, 40)}\u2026`);
    }
  }
  return out;
}

// ../core/dist/figma/manifest.js
var MANIFEST_FILE = "manifest.jsonl";
var TYPE_DIRS = {
  image: "images",
  video: "video"
};
function mediaDir(projectDir) {
  return join(projectDir, ".media");
}
function manifestPath(projectDir) {
  return join(mediaDir(projectDir), MANIFEST_FILE);
}
function typeDirPath(projectDir, type) {
  return join(mediaDir(projectDir), TYPE_DIRS[type]);
}
function isFigmaManifestRecord(value) {
  if (typeof value !== "object" || value === null)
    return false;
  if (!("id" in value) || !("type" in value) || !("path" in value) || !("source" in value))
    return false;
  if (typeof value.id !== "string" || value.type !== "image" && value.type !== "video" || typeof value.path !== "string")
    return false;
  if (typeof value.source !== "string")
    return false;
  if (!("provenance" in value))
    return false;
  const provenance = value.provenance;
  if (typeof provenance !== "object" || provenance === null)
    return false;
  if (!("source" in provenance) || !("fileKey" in provenance) || !("nodeId" in provenance))
    return false;
  return provenance.source === "figma" && typeof provenance.fileKey === "string" && typeof provenance.nodeId === "string";
}
function readManifest(projectDir) {
  return readJsonlValues(manifestPath(projectDir)).filter(isFigmaManifestRecord);
}
function appendRecord(projectDir, record) {
  mkdirSync2(typeDirPath(projectDir, record.type), { recursive: true });
  appendFileSync(manifestPath(projectDir), JSON.stringify(record) + "\n");
}
function findAllByFigmaNode(projectDir, fileKey, nodeId) {
  return readManifest(projectDir).filter((r) => r.provenance.source === "figma" && r.provenance.fileKey === fileKey && r.provenance.nodeId === nodeId);
}
function updateRecord(projectDir, record) {
  const p = manifestPath(projectDir);
  const lines = readFileSync2(p, "utf8").split(/\r?\n/);
  const out = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.length === 0)
      return line;
    try {
      const parsed = JSON.parse(trimmed);
      if (isFigmaManifestRecord(parsed) && parsed.id === record.id)
        return JSON.stringify(record);
    } catch {
    }
    return line;
  });
  writeFileSync2(p, out.join("\n"));
}
function nextId(projectDir, type) {
  const re = new RegExp(`^${type}_(\\d+)$`);
  let max = 0;
  const p = manifestPath(projectDir);
  if (!existsSync2(p))
    return `${type}_001`;
  for (const line of readFileSync2(p, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0)
      continue;
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      continue;
    }
    if (typeof parsed !== "object" || parsed === null || !("id" in parsed) || typeof parsed.id !== "string")
      continue;
    const m = parsed.id.match(re);
    const n = m?.[1];
    if (n !== void 0)
      max = Math.max(max, Number.parseInt(n, 10));
  }
  return `${type}_${String(max + 1).padStart(3, "0")}`;
}

// ../core/dist/figma/mediaIndex.js
import { mkdirSync as mkdirSync3, writeFileSync as writeFileSync3 } from "fs";
import { dirname as dirname2, join as join2 } from "path";
function isRow(value) {
  return typeof value === "object" && value !== null;
}
function indexPath(projectDir) {
  return join2(mediaDir(projectDir), "index.md");
}
function pad(str, len2) {
  return String(str ?? "").padEnd(len2);
}
function formatDur(r) {
  if (r.duration == null)
    return "\u2014";
  return `${String(r.duration)}s`;
}
function formatDims(r) {
  if (r.width && r.height)
    return `${String(r.width)}\xD7${String(r.height)}`;
  if (r.type === "icon" && r.transparent)
    return "svg";
  return "\u2014";
}
function len(value) {
  return String(value ?? "").length;
}
function generateIndexContent(records) {
  const count = records.length;
  const header = `# .media \xB7 ${count} asset${count === 1 ? "" : "s"}
`;
  if (count === 0)
    return header;
  const cols = { id: 4, type: 5, dur: 4, dims: 5, path: 5 };
  for (const r of records) {
    cols.id = Math.max(cols.id, len(r.id));
    cols.type = Math.max(cols.type, len(r.type));
    cols.dur = Math.max(cols.dur, formatDur(r).length);
    cols.dims = Math.max(cols.dims, formatDims(r).length);
    cols.path = Math.max(cols.path, len(r.path));
  }
  const heading = pad("id", cols.id + 2) + pad("type", cols.type + 2) + pad("dur", cols.dur + 2) + pad("dims", cols.dims + 2) + pad("path", cols.path + 2) + "description";
  const lines = [header, heading];
  for (const r of records) {
    lines.push(pad(r.id, cols.id + 2) + pad(r.type, cols.type + 2) + pad(formatDur(r), cols.dur + 2) + pad(formatDims(r), cols.dims + 2) + pad(r.path, cols.path + 2) + String(r.description ?? ""));
  }
  return lines.join("\n") + "\n";
}
function regenerateIndex(projectDir) {
  const rows = readJsonlValues(manifestPath(projectDir)).filter(isRow);
  const last = new Map(rows.map((row, index) => [row.path, index]));
  const records = rows.filter((row, index) => !row.path || last.get(row.path) === index);
  const content = generateIndexContent(records);
  const p = indexPath(projectDir);
  mkdirSync3(dirname2(p), { recursive: true });
  writeFileSync3(p, content);
  return content;
}

// ../core/dist/figma/assetSnippet.js
function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function buildAssetSnippet(record) {
  const alt = escapeAttr(record.description ?? record.id);
  const src = escapeAttr(record.path);
  const w = record.width !== void 0 ? ` width="${record.width}"` : "";
  const h = record.height !== void 0 ? ` height="${record.height}"` : "";
  const html = `<img src="${src}" alt="${alt}"${w}${h} data-figma-id="${escapeAttr(record.provenance.nodeId)}" />`;
  return { path: record.path, html };
}

// ../core/dist/figma/sanitizeSvg.js
var SAFE_ELEMENTS = /* @__PURE__ */ new Set([
  "svg",
  "g",
  "defs",
  "symbol",
  "use",
  "image",
  "a",
  "switch",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "path",
  "text",
  "tspan",
  "textPath",
  "linearGradient",
  "radialGradient",
  "stop",
  "pattern",
  "mask",
  "clipPath",
  "marker",
  "filter",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "title",
  "desc",
  "metadata",
  "style"
]);
var SAFE_ATTRIBUTES = /* @__PURE__ */ new Set([
  "id",
  "class",
  "style",
  "transform",
  "viewBox",
  "width",
  "height",
  "x",
  "y",
  "x1",
  "y1",
  "x2",
  "y2",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "fx",
  "fy",
  "points",
  "d",
  "offset",
  "enable-background",
  "gradientUnits",
  "gradientTransform",
  "spreadMethod",
  "patternUnits",
  "patternContentUnits",
  "patternTransform",
  "maskUnits",
  "maskContentUnits",
  "clipPathUnits",
  "clip-rule",
  "filterUnits",
  "primitiveUnits",
  "preserveAspectRatio",
  "space",
  "lang",
  "role",
  "focusable",
  "tabindex",
  "version",
  "baseProfile",
  "fill",
  "fill-opacity",
  "fill-rule",
  "stroke",
  "stroke-width",
  "stroke-opacity",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-dasharray",
  "stroke-dashoffset",
  "opacity",
  "color",
  "stop-color",
  "stop-opacity",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-anchor",
  "dominant-baseline",
  "alignment-baseline",
  "letter-spacing",
  "word-spacing",
  "text-decoration",
  "clip-path",
  "mask",
  "filter",
  "marker-start",
  "marker-mid",
  "marker-end",
  "marker",
  "cursor",
  "pointer-events",
  "visibility",
  "display",
  "overflow",
  "vector-effect",
  "paint-order",
  "color-interpolation",
  "color-interpolation-filters",
  "isolation",
  "mix-blend-mode",
  "startOffset",
  "method",
  "spacing",
  "side",
  "textLength",
  "lengthAdjust",
  "in",
  "in2",
  "result",
  "mode",
  "type",
  "values",
  "dx",
  "dy",
  "stdDeviation",
  "edgeMode",
  "k1",
  "k2",
  "k3",
  "k4",
  "operator",
  "radius",
  "scale",
  "xChannelSelector",
  "yChannelSelector",
  "baseFrequency",
  "numOctaves",
  "seed",
  "stitchTiles",
  "tableValues",
  "slope",
  "intercept",
  "amplitude",
  "exponent",
  "order",
  "divisor",
  "bias",
  "targetX",
  "targetY",
  "kernelMatrix",
  "preserveAlpha",
  "kernelUnitLength",
  "surfaceScale",
  "diffuseConstant",
  "specularConstant",
  "specularExponent",
  "lighting-color",
  "flood-color",
  "flood-opacity",
  "azimuth",
  "elevation",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "limitingConeAngle"
]);
function localName(name) {
  const i = name.lastIndexOf(":");
  return i === -1 ? name : name.slice(i + 1);
}
function isAllowedHref(value, tagLocalName) {
  const v = value.trim();
  if (v.startsWith("#"))
    return true;
  return /^data:image\//i.test(v) && tagLocalName.toLowerCase() !== "a";
}
var SAFE_CSS_FUNCTIONS = /* @__PURE__ */ new Set([
  "",
  "url",
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "color",
  "color-mix",
  "var",
  "calc",
  "min",
  "max",
  "clamp",
  "matrix",
  "matrix3d",
  "translate",
  "translatex",
  "translatey",
  "translatez",
  "translate3d",
  "scale",
  "scalex",
  "scaley",
  "scalez",
  "scale3d",
  "rotate",
  "rotatex",
  "rotatey",
  "rotatez",
  "rotate3d",
  "skew",
  "skewx",
  "skewy",
  "perspective",
  "cubic-bezier",
  "steps",
  "blur",
  "brightness",
  "contrast",
  "drop-shadow",
  "grayscale",
  "hue-rotate",
  "invert",
  "opacity",
  "saturate",
  "sepia"
]);
function decodeCssEscape(hex, char) {
  if (hex === void 0)
    return char ?? "";
  const cp = parseInt(hex, 16);
  const invalid = cp === 0 || cp > 1114111 || cp >= 55296 && cp <= 57343;
  return invalid ? "\uFFFD" : String.fromCodePoint(cp);
}
function canonicalCss(text) {
  return text.replace(/\\([0-9a-f]{1,6})[ \t\n\r\f]?|\\([\s\S])/gi, (_, hex, char) => decodeCssEscape(hex, char)).toLowerCase();
}
function isCssNameChar(c) {
  return c !== void 0 && /[-\w]/.test(c);
}
function functionNameBefore(css, paren) {
  let start = paren;
  while (isCssNameChar(css[start - 1]))
    start--;
  return css.slice(start, paren);
}
function everyFunctionIsSafe(css) {
  for (let at = css.indexOf("("); at !== -1; at = css.indexOf("(", at + 1)) {
    if (!SAFE_CSS_FUNCTIONS.has(functionNameBefore(css, at)))
      return false;
  }
  return true;
}
function isLocalUrlValue(raw) {
  const value = raw.trim().replace(/^['"]/, "");
  return value.startsWith("#") && !value.includes("(");
}
function everyUrlIsLocalFragment(css) {
  for (let at = css.indexOf("url("); at !== -1; ) {
    const close = css.indexOf(")", at + 4);
    if (close === -1 || !isLocalUrlValue(css.slice(at + 4, close)))
      return false;
    at = css.indexOf("url(", close + 1);
  }
  return true;
}
function isSafeCss(text) {
  const css = canonicalCss(text);
  return !css.includes("@import") && everyFunctionIsSafe(css) && everyUrlIsLocalFragment(css);
}
function isXmlnsAttribute(name) {
  return name === "xmlns" || name.startsWith("xmlns:");
}
function isKnownAttribute(local) {
  return SAFE_ATTRIBUTES.has(local) || local.startsWith("aria-") || local.startsWith("data-");
}
function isSafeAttribute(tagLocalName, name, value) {
  if (isXmlnsAttribute(name))
    return true;
  const local = localName(name);
  if (local === "href")
    return isAllowedHref(value, tagLocalName);
  return isKnownAttribute(local) && isSafeCss(value);
}
function sanitizeSvg(svg) {
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  const root = doc.documentElement;
  if (!root)
    return "";
  for (const el of [...doc.querySelectorAll("*")]) {
    if (!el.isConnected)
      continue;
    if (!SAFE_ELEMENTS.has(el.tagName)) {
      el.remove();
      continue;
    }
    if (el.tagName === "style" && !isSafeCss(el.textContent)) {
      el.remove();
      continue;
    }
    for (const attr of [...el.attributes]) {
      if (!isSafeAttribute(el.tagName, attr.name, attr.value))
        el.removeAttribute(attr.name);
    }
  }
  return root.isConnected ? root.outerHTML : "";
}

// ../core/dist/figma/bindings.js
import { appendFileSync as appendFileSync2, mkdirSync as mkdirSync4, writeFileSync as writeFileSync4 } from "fs";
import { join as join3 } from "path";
var BINDINGS_FILE = "figma-bindings.jsonl";
function bindingsPath(projectDir) {
  return join3(mediaDir(projectDir), BINDINGS_FILE);
}
function isRecord2(value) {
  return typeof value === "object" && value !== null;
}
function isBindingRecord(value) {
  return isRecord2(value) && value.kind === "binding" && typeof value.figmaId === "string" && typeof value.sourceFileKey === "string" && typeof value.compositionVariableId === "string" && typeof value.version === "string";
}
function readLines(projectDir) {
  return readJsonlValues(bindingsPath(projectDir));
}
function readBindings(projectDir) {
  return readLines(projectDir).filter(isBindingRecord);
}
function upsertBindings(projectDir, records) {
  const incoming = new Set(records.map((r) => r.figmaId));
  const survivors = readLines(projectDir).filter((line) => !(isBindingRecord(line) && incoming.has(line.figmaId)));
  mkdirSync4(mediaDir(projectDir), { recursive: true });
  const lines = [...survivors, ...records].map((r) => JSON.stringify(r)).join("\n");
  writeFileSync4(bindingsPath(projectDir), lines.length > 0 ? lines + "\n" : "");
}

// ../core/dist/figma/nodeDocument.js
function isRecord3(value) {
  return typeof value === "object" && value !== null;
}
function asNodeDocument(value) {
  if (isRecord3(value) && typeof value.id === "string" && typeof value.name === "string" && typeof value.type === "string") {
    return { ...value, id: value.id, name: value.name, type: value.type };
  }
  return null;
}
function childDocuments(node) {
  if (!Array.isArray(node.children))
    return [];
  const out = [];
  for (const child of node.children) {
    const doc = asNodeDocument(child);
    if (doc)
      out.push(doc);
  }
  return out;
}

// ../core/dist/figma/resolveBindings.js
function isRecord4(value) {
  return typeof value === "object" && value !== null;
}
function aliasId(value) {
  if (isRecord4(value) && value.type === "VARIABLE_ALIAS" && typeof value.id === "string")
    return value.id;
  return null;
}
function boundVariableSites(node, out) {
  const bound = node.boundVariables;
  if (!isRecord4(bound))
    return;
  for (const [property, value] of Object.entries(bound)) {
    const candidates = Array.isArray(value) ? value : [value];
    for (const item of candidates) {
      const id = aliasId(item);
      if (id)
        out.push({ nodeId: node.id, property, figmaId: id });
    }
  }
}
function styleSites(node, out) {
  const styles = node.styles;
  if (!isRecord4(styles))
    return;
  for (const [slot, styleId] of Object.entries(styles)) {
    if (typeof styleId === "string" && styleId.length > 0)
      out.push({ nodeId: node.id, property: `style:${slot}`, figmaId: styleId });
  }
}
function collectSites(node, out) {
  boundVariableSites(node, out);
  styleSites(node, out);
  for (const child of childDocuments(node))
    collectSites(child, out);
}
function findInIndex(index, figmaId) {
  for (const b of index) {
    if (b.figmaId === figmaId)
      return b;
    if (b.aliasChain?.includes(figmaId))
      return b;
    if (b.key !== void 0 && b.key === figmaId)
      return b;
  }
  return null;
}
function resolveBindings(node, index) {
  const sites = [];
  collectSites(node, sites);
  const resolved = [];
  const unresolved = [];
  for (const site of sites) {
    const match = findInIndex(index, site.figmaId);
    if (match)
      resolved.push({ ...site, compositionVariableId: match.compositionVariableId });
    else
      unresolved.push(site);
  }
  return { resolved, unresolved };
}

// ../core/dist/figma/color.js
function isRecord5(value) {
  return typeof value === "object" && value !== null;
}
function toHexByte(channel) {
  return Math.round(channel * 255).toString(16).padStart(2, "0").toUpperCase();
}
function figmaColorToCss(value, extraOpacity = 1) {
  if (!isRecord5(value))
    return null;
  const { r, g, b, a } = value;
  if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number")
    return null;
  const alpha = (typeof a === "number" ? a : 1) * extraOpacity;
  if (alpha >= 1)
    return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
  const c = (n) => Math.round(n * 255);
  return `rgba(${c(r)}, ${c(g)}, ${c(b)}, ${Number(alpha.toFixed(4))})`;
}

// ../core/dist/figma/nodeToHtml.js
var RASTERIZE_TYPES = /* @__PURE__ */ new Set([
  "VECTOR",
  "BOOLEAN_OPERATION",
  "STAR",
  "LINE",
  "POLYGON",
  "REGULAR_POLYGON"
]);
function isRecord6(value) {
  return typeof value === "object" && value !== null;
}
function boxOf(node) {
  const b = node.absoluteBoundingBox;
  if (isRecord6(b) && typeof b.x === "number" && typeof b.y === "number" && typeof b.width === "number" && typeof b.height === "number")
    return { x: b.x, y: b.y, width: b.width, height: b.height };
  return null;
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function round(n) {
  return Math.round(n * 100) / 100;
}
function firstVisibleFill(node) {
  const fills = node.fills;
  if (!Array.isArray(fills))
    return null;
  for (const fill of fills) {
    if (isRecord6(fill) && fill.visible !== false)
      return fill;
  }
  return null;
}
function gradientCss(fill) {
  const stops = fill.gradientStops;
  if (!Array.isArray(stops))
    return null;
  const parts = [];
  for (const stop of stops) {
    if (!isRecord6(stop) || typeof stop.position !== "number")
      return null;
    const color = figmaColorToCss(stop.color);
    if (color === null)
      return null;
    parts.push(`${color} ${round(stop.position * 100)}%`);
  }
  if (parts.length === 0)
    return null;
  return `linear-gradient(180deg, ${parts.join(", ")})`;
}
function fillCss(node) {
  const fill = firstVisibleFill(node);
  if (fill === null)
    return null;
  if (fill.type === "SOLID")
    return figmaColorToCss(fill.color);
  if (fill.type === "GRADIENT_LINEAR")
    return gradientCss(fill);
  return null;
}
function hasImageFill(node) {
  return firstVisibleFill(node)?.type === "IMAGE";
}
function dropShadowCss(effect) {
  if (!isRecord6(effect.offset))
    return null;
  const color = figmaColorToCss(effect.color);
  const { x, y } = effect.offset;
  if (color === null || typeof x !== "number" || typeof y !== "number")
    return null;
  const radius = typeof effect.radius === "number" ? effect.radius : 0;
  return `box-shadow: ${round(x)}px ${round(y)}px ${round(radius)}px ${color}`;
}
function effectCss(effect) {
  if (!isRecord6(effect) || effect.visible === false)
    return null;
  if (effect.type === "DROP_SHADOW")
    return dropShadowCss(effect);
  if (effect.type === "LAYER_BLUR" && typeof effect.radius === "number")
    return `filter: blur(${round(effect.radius)}px)`;
  return null;
}
function effectsCss(node, styles) {
  const effects = node.effects;
  if (!Array.isArray(effects))
    return;
  for (const effect of effects) {
    const css = effectCss(effect);
    if (css !== null)
      styles.push(css);
  }
}
function textCss(node, styles) {
  const s = node.style;
  if (!isRecord6(s))
    return;
  if (typeof s.fontFamily === "string")
    styles.push(`font-family: '${s.fontFamily.replace(/['"\\;]/g, "")}'`);
  if (typeof s.fontWeight === "number")
    styles.push(`font-weight: ${s.fontWeight}`);
  if (typeof s.fontSize === "number")
    styles.push(`font-size: ${round(s.fontSize)}px`);
  if (typeof s.lineHeightPx === "number")
    styles.push(`line-height: ${round(s.lineHeightPx)}px`);
  if (typeof s.letterSpacing === "number" && s.letterSpacing !== 0)
    styles.push(`letter-spacing: ${round(s.letterSpacing)}px`);
  if (isVerticallyTrimmed(node, s.lineHeightPx)) {
    styles.push("text-box-trim: trim-both", "text-box-edge: cap alphabetic");
  }
}
function isVerticallyTrimmed(node, lineHeightPx) {
  if (typeof lineHeightPx !== "number")
    return false;
  const box = boxOf(node);
  if (box === null || box.height >= lineHeightPx - 1)
    return false;
  return typeof node.characters === "string" && !node.characters.includes("\n");
}
function uniqueSlug(ctx, name) {
  const raw = slugify(name);
  const base = /^[0-9]/.test(raw) ? `n${raw}` : raw;
  let slug = base;
  let n = 2;
  while (ctx.usedSlugs.has(slug))
    slug = `${base}-${n++}`;
  ctx.usedSlugs.add(slug);
  return slug;
}
function backgroundValue(node, ctx) {
  const literal = fillCss(node);
  if (literal === null)
    return null;
  const resolved = ctx.bindings.resolved.find((r) => r.nodeId === node.id && r.property === "fills");
  if (resolved)
    return `var(${cssVariableName(resolved.compositionVariableId)}, ${literal})`;
  return literal;
}
function unresolvedAttr(node, ctx) {
  const props = ctx.bindings.unresolved.filter((u) => u.nodeId === node.id).map((u) => u.property);
  if (props.length === 0)
    return "";
  return ` data-figma-unresolved="${escapeHtml(props.join(" "))}"`;
}
function geometryCss(node, parentBox, isRoot) {
  const box = boxOf(node);
  const styles = [];
  if (!box)
    return styles;
  if (isRoot) {
    styles.push("position: relative", `width: ${round(box.width)}px`, `height: ${round(box.height)}px`);
  } else {
    styles.push("position: absolute", `left: ${round(box.x - parentBox.x)}px`, `top: ${round(box.y - parentBox.y)}px`, `width: ${round(box.width)}px`, `height: ${round(box.height)}px`);
  }
  return styles;
}
function cornerAndClipCss(node, styles) {
  if (node.type === "ELLIPSE") {
    styles.push("border-radius: 50%");
  } else if (typeof node.cornerRadius === "number" && node.cornerRadius > 0) {
    styles.push(`border-radius: ${round(node.cornerRadius)}px`);
  }
  if (node.clipsContent === true)
    styles.push("overflow: hidden");
}
function opacityCss(node, styles) {
  if (typeof node.opacity === "number" && node.opacity < 1)
    styles.push(`opacity: ${round(node.opacity)}`);
}
function decorationCss(node, ctx, rasterized) {
  const styles = [];
  if (!rasterized) {
    const bg = backgroundValue(node, ctx);
    if (node.type === "TEXT") {
      if (bg !== null)
        styles.push(`color: ${bg}`);
      textCss(node, styles);
    } else if (bg !== null) {
      styles.push(bg.includes("gradient(") ? `background: ${bg}` : `background-color: ${bg}`);
    }
    cornerAndClipCss(node, styles);
  }
  opacityCss(node, styles);
  effectsCss(node, styles);
  return styles;
}
var MAX_DEPTH = 500;
function renderChildren(node, ctx, depth, parentBox) {
  const childHtml = [];
  for (const child of childDocuments(node)) {
    const rendered = renderNodeHtml(child, ctx, false, depth + 1, parentBox);
    if (rendered.length > 0)
      childHtml.push(rendered);
  }
  return childHtml.length > 0 ? `
${childHtml.join("\n")}
` : "";
}
function renderNodeHtml(node, ctx, isRoot, depth = 0, parentBox = ctx.origin) {
  if (node.visible === false || depth > MAX_DEPTH)
    return "";
  const slug = uniqueSlug(ctx, node.name);
  const rasterized = RASTERIZE_TYPES.has(node.type) || hasImageFill(node);
  const style = escapeHtml([...geometryCss(node, parentBox, isRoot), ...decorationCss(node, ctx, rasterized)].join("; "));
  const snippetAttr = isRoot ? ' data-hf-snippet=""' : "";
  const idAttrs = `id="${slug}"${snippetAttr} data-figma-id="${escapeHtml(node.id)}"${unresolvedAttr(node, ctx)}`;
  if (rasterized) {
    ctx.rasterize.push({ nodeId: node.id, name: node.name, slug });
    return `<img ${idAttrs} data-figma-rasterize="${escapeHtml(node.id)}" alt="${escapeHtml(node.name)}" style="${style}" />`;
  }
  if (node.type === "TEXT") {
    const text = typeof node.characters === "string" ? escapeHtml(node.characters) : "";
    return `<div ${idAttrs} style="${style}">${text}</div>`;
  }
  return `<div ${idAttrs} style="${style}">${renderChildren(node, ctx, depth, boxOf(node) ?? parentBox)}</div>`;
}
function nodeToHtml(root, bindings, opts = {}) {
  const origin = boxOf(root) ?? { x: 0, y: 0, width: 0, height: 0 };
  const ctx = { origin, bindings, rasterize: [], usedSlugs: /* @__PURE__ */ new Set() };
  const rootForRender = opts.rootName !== void 0 ? { ...root, name: opts.rootName } : root;
  const html = renderNodeHtml(rootForRender, ctx, true);
  return { html, rasterize: ctx.rasterize };
}

// ../core/dist/figma/tokensToVariables.js
var TYPE_MAP = {
  COLOR: "color",
  FLOAT: "number",
  STRING: "string",
  BOOLEAN: "boolean"
};
function isRecord7(value) {
  return typeof value === "object" && value !== null;
}
function baseModeValue(payload, collections) {
  const modes = payload.valuesByMode ?? {};
  const collection = collections[payload.variableCollectionId ?? ""];
  if (isRecord7(collection) && typeof collection.defaultModeId === "string") {
    const preferred = modes[collection.defaultModeId];
    if (preferred !== void 0)
      return preferred;
  }
  for (const value of Object.values(modes))
    return value;
  return void 0;
}
function collectionName(payload, collections) {
  const collection = collections[payload.variableCollectionId ?? ""];
  return isRecord7(collection) && typeof collection.name === "string" ? collection.name : null;
}
function resolveValue(start, vars) {
  const chain = [];
  const seen = /* @__PURE__ */ new Set();
  let currentId = start;
  while (!seen.has(currentId)) {
    chain.push(currentId);
    seen.add(currentId);
    const payload = vars.variables[currentId];
    if (!payload)
      return null;
    const value = baseModeValue(payload, vars.variableCollections);
    if (isRecord7(value) && value.type === "VARIABLE_ALIAS" && typeof value.id === "string") {
      currentId = value.id;
      continue;
    }
    return { value, chain };
  }
  return null;
}
function toEntryValue(resolvedType, raw) {
  if (resolvedType === "COLOR")
    return figmaColorToCss(raw);
  if (resolvedType === "FLOAT")
    return typeof raw === "number" ? raw : null;
  if (resolvedType === "BOOLEAN")
    return typeof raw === "boolean" ? raw : null;
  if (resolvedType === "STRING")
    return typeof raw === "string" ? raw : null;
  return null;
}
function tokensToVariables(vars, source) {
  const entries = [];
  const bindings = [];
  const sidecarTokens = [];
  for (const [figmaId, payload] of Object.entries(vars.variables)) {
    const entryType = TYPE_MAP[payload.resolvedType ?? ""];
    const resolved = resolveValue(figmaId, vars);
    const value = resolved ? toEntryValue(payload.resolvedType, resolved.value) : null;
    const collection = collectionName(payload, vars.variableCollections);
    const compositionVariableId = collection ? `figma:${collection}/${payload.name}` : `figma:${payload.name}`;
    sidecarTokens.push({
      name: payload.name,
      type: entryType ?? payload.resolvedType ?? "unknown",
      figmaId,
      key: payload.key,
      value
    });
    if (!entryType || value === null || !resolved)
      continue;
    entries.push({
      id: compositionVariableId,
      type: entryType,
      label: payload.name,
      default: value
    });
    bindings.push({
      kind: "binding",
      figmaId,
      key: payload.key,
      sourceFileKey: source.fileKey,
      aliasChain: resolved.chain.length > 1 ? resolved.chain : void 0,
      compositionVariableId,
      version: source.version
    });
  }
  return { entries, bindings, sidecar: { source, tokens: sidecarTokens } };
}

// src/commands/figma/cliError.ts
async function withFigmaErrors(command, fn) {
  try {
    await fn();
  } catch (err) {
    if (err instanceof Error) {
      try {
        const { trackCommandFailure } = await import("./events-UDUTOFQD.js");
        trackCommandFailure(
          command,
          err,
          err instanceof FigmaClientError ? { error_name: err.code, endpoint: err.endpoint } : {}
        );
      } catch {
      }
      const [title = "figma command failed", ...rest] = err.message.split("\n");
      errorBox(title, rest.length > 0 ? rest.join("\n") : void 0);
      failCommand(1, err);
    }
    throw err;
  }
}

export {
  FigmaClientError,
  createFigmaClient,
  parseFigmaRef,
  MAX_FREEZE_BYTES,
  exceedsFreezeCap,
  freezeBytes,
  typeDirPath,
  appendRecord,
  findAllByFigmaNode,
  updateRecord,
  nextId,
  regenerateIndex,
  buildAssetSnippet,
  sanitizeSvg,
  readBindings,
  upsertBindings,
  resolveBindings,
  nodeToHtml,
  tokensToVariables,
  withFigmaErrors
};
