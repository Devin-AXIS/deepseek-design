import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  parse,
  simple
} from "./chunk-KRDUCZRT.js";

// ../parsers/dist/composition.js
var CANVAS_DIMENSIONS = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  "landscape-4k": { width: 3840, height: 2160 },
  "portrait-4k": { width: 2160, height: 3840 },
  square: { width: 1080, height: 1080 },
  "square-4k": { width: 2160, height: 2160 }
};
var VALID_CANVAS_RESOLUTIONS = Object.keys(
  CANVAS_DIMENSIONS
);
var COMPOSITION_VARIABLE_TYPES = [
  "string",
  "number",
  "color",
  "boolean",
  "enum",
  "font",
  "image"
];
var FONT_ALIAS_MAP = {
  // ── Canonical bundled fonts (self-referencing) ────────────────────────
  inter: "inter",
  montserrat: "montserrat",
  outfit: "outfit",
  nunito: "nunito",
  oswald: "oswald",
  "league gothic": "league-gothic",
  "archivo black": "archivo-black",
  "space mono": "space-mono",
  "ibm plex mono": "ibm-plex-mono",
  "jetbrains mono": "jetbrains-mono",
  "eb garamond": "eb-garamond",
  "playfair display": "playfair-display",
  "source code pro": "source-code-pro",
  "noto sans jp": "noto-sans-jp",
  roboto: "roboto",
  "open sans": "open-sans",
  lato: "lato",
  poppins: "poppins",
  // ── Common aliases → nearest canonical ────────────────────────────────
  "helvetica neue": "inter",
  helvetica: "inter",
  arial: "inter",
  "helvetica bold": "inter",
  futura: "montserrat",
  "din alternate": "montserrat",
  "arial black": "montserrat",
  "bebas neue": "league-gothic",
  "courier new": "jetbrains-mono",
  courier: "jetbrains-mono",
  garamond: "eb-garamond",
  "noto sans japanese": "noto-sans-jp",
  "segoe ui": "roboto",
  // ── macOS sans-serif system fonts → inter ─────────────────────────────
  "sf pro": "inter",
  "sf pro display": "inter",
  "sf pro text": "inter",
  "sf pro rounded": "inter",
  avenir: "inter",
  "avenir next": "inter",
  "lucida grande": "inter",
  geneva: "inter",
  optima: "inter",
  // ── Windows sans-serif system fonts → inter ───────────────────────────
  verdana: "inter",
  tahoma: "inter",
  "trebuchet ms": "inter",
  calibri: "inter",
  candara: "inter",
  corbel: "inter",
  "lucida sans": "inter",
  "lucida sans unicode": "inter",
  // ── Linux sans-serif system fonts → inter ─────────────────────────────
  "noto sans": "inter",
  "dejavu sans": "inter",
  "liberation sans": "inter",
  // ── Monospace system fonts → jetbrains-mono ───────────────────────────
  "sf mono": "jetbrains-mono",
  menlo: "jetbrains-mono",
  monaco: "jetbrains-mono",
  consolas: "jetbrains-mono",
  "lucida console": "jetbrains-mono",
  "lucida sans typewriter": "jetbrains-mono",
  "andale mono": "jetbrains-mono",
  "dejavu sans mono": "jetbrains-mono",
  "liberation mono": "jetbrains-mono",
  // ── Serif system fonts → eb-garamond ──────────────────────────────────
  georgia: "eb-garamond",
  palatino: "eb-garamond",
  "palatino linotype": "eb-garamond",
  "book antiqua": "eb-garamond",
  cambria: "eb-garamond",
  times: "eb-garamond",
  "times new roman": "eb-garamond",
  "dejavu serif": "eb-garamond",
  "liberation serif": "eb-garamond"
};
var FONT_ALIAS_KEYS = new Set(Object.keys(FONT_ALIAS_MAP));
var CANONICAL_FONT_DISPLAY_NAMES = {
  inter: "Inter",
  montserrat: "Montserrat",
  outfit: "Outfit",
  nunito: "Nunito",
  oswald: "Oswald",
  "league-gothic": "League Gothic",
  "archivo-black": "Archivo Black",
  "space-mono": "Space Mono",
  "ibm-plex-mono": "IBM Plex Mono",
  "jetbrains-mono": "JetBrains Mono",
  "eb-garamond": "EB Garamond",
  "playfair-display": "Playfair Display",
  "source-code-pro": "Source Code Pro",
  "noto-sans-jp": "Noto Sans JP",
  roboto: "Roboto",
  "open-sans": "Open Sans",
  lato: "Lato",
  poppins: "Poppins"
};
function resolveAliasDisplayName(alias) {
  const slug = FONT_ALIAS_MAP[alias.toLowerCase()];
  if (!slug) return void 0;
  return CANONICAL_FONT_DISPLAY_NAMES[slug];
}
var DEFAULT_TYPEOF = {
  string: "string",
  number: "number",
  color: "string",
  boolean: "boolean",
  enum: "string",
  font: "string",
  image: "string"
};
function isScalarVariableValue(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function isRecord(v) {
  return typeof v === "object" && v !== null;
}
function isVariableType(t) {
  return typeof t === "string" && t in DEFAULT_TYPEOF;
}
function isCompositionVariable(v) {
  if (!isRecord(v)) return false;
  if (typeof v.id !== "string" || typeof v.label !== "string") return false;
  if (!isVariableType(v.type)) return false;
  if (typeof v.default !== DEFAULT_TYPEOF[v.type]) return false;
  if (v.type === "enum" && !Array.isArray(v.options)) return false;
  return true;
}
function parseCompositionVariables(htmlEl) {
  const variablesAttr = htmlEl.getAttribute("data-composition-variables");
  if (!variablesAttr) {
    return [];
  }
  try {
    const parsed = JSON.parse(variablesAttr);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isCompositionVariable);
  } catch {
    return [];
  }
}
function isSafeMediaUrl(url) {
  const normalized = url.replace(/[\u0000-\u0020]/g, "");
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(normalized);
  if (!scheme) return true;
  const proto = scheme[1]?.toLowerCase();
  if (!proto) return false;
  if (proto === "https" || proto === "http" || proto === "blob") return true;
  if (proto === "data") return /^data:image\//i.test(normalized);
  return false;
}
function textBindingPath(binding) {
  const parts = binding.startsWith("/") ? binding.slice(1).split("/").map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~")) : [binding];
  if (parts.some((part) => !part || ["__proto__", "prototype", "constructor"].includes(part))) {
    throw new Error("Invalid text variable binding");
  }
  return parts;
}
function bindingParent(binding, values) {
  const [id, ...path] = textBindingPath(binding);
  if (!id || !Object.hasOwn(values, id)) return null;
  if (!path.length) return { id, parent: values, key: id, data: void 0 };
  const encoded = values[id];
  if (typeof encoded !== "string") return null;
  const data = JSON.parse(encoded);
  let parent = data;
  for (const key2 of path.slice(0, -1)) {
    if (parent === null || typeof parent !== "object" || !Object.hasOwn(parent, key2)) return null;
    parent = parent[key2];
  }
  const key = path.at(-1);
  if (parent === null || typeof parent !== "object" || !Object.hasOwn(parent, key)) return null;
  return { id, parent, key, data };
}
function updateTextVariableBinding(binding, values, text) {
  const target = bindingParent(binding, values);
  if (!target) return null;
  const previous = target.parent[target.key];
  if (!isScalarVariableValue(previous)) return null;
  let value = text;
  if (typeof previous === "number") {
    if (!text.trim() || !Number.isFinite(Number(text))) throw new Error("\u6570\u503C\u5FC5\u987B\u662F\u6709\u6548\u6570\u5B57");
    value = Number(text);
  } else if (typeof previous === "boolean") {
    if (text !== "true" && text !== "false") throw new Error("\u5E03\u5C14\u503C\u5FC5\u987B\u4E3A true \u6216 false");
    value = text === "true";
  }
  if (target.data !== void 0) {
    target.parent[target.key] = value;
    value = JSON.stringify(target.data);
  }
  return { id: target.id, value };
}
var COMPOSITION_ATTRIBUTES = Object.freeze({
  start: "data-start",
  duration: "data-duration",
  trackIndex: "data-track-index",
  derivedEnd: "data-end",
  legacyTrack: "data-layer"
});
var CANONICAL_AUTHORED_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.start,
  COMPOSITION_ATTRIBUTES.duration,
  COMPOSITION_ATTRIBUTES.trackIndex
]);
var DERIVED_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.derivedEnd
]);
var LEGACY_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.derivedEnd,
  COMPOSITION_ATTRIBUTES.legacyTrack
]);
var HTML_BODY_CSS_WIDTH_FIRST_RE = /(html\s*,\s*body\s*\{[^}]*?width:\s*)(\d+)px([^}]*?height:\s*)(\d+)px/i;
var HTML_BODY_CSS_HEIGHT_FIRST_RE = /(html\s*,\s*body\s*\{[^}]*?height:\s*)(\d+)px([^}]*?width:\s*)(\d+)px/i;
var VIEWPORT_META_SIZE_RE = /(<meta[^>]*name=["']viewport["'][^>]*content=["']width=)(\d+)(,\s*height=)(\d+)/i;
function parseProgram(script) {
  try {
    return parse(script, { ecmaVersion: "latest", sourceType: "script" });
  } catch {
    return parse(script, { ecmaVersion: "latest", sourceType: "module" });
  }
}
function literalString(node) {
  if (node?.type === "Literal" && typeof node.value === "string") return node.value;
  if (node?.type === "TemplateLiteral" && node.expressions?.length === 0) {
    return node.quasis?.[0]?.value?.cooked;
  }
  return void 0;
}
function memberName(node) {
  if (node?.type !== "MemberExpression") return void 0;
  if (!node.computed && node.property?.type === "Identifier") return node.property.name;
  return literalString(node.property);
}
function lookupSelector(node, bindings) {
  if (node?.type === "Identifier") return bindings.get(node.name);
  if (node?.type !== "CallExpression" || node.callee?.type !== "MemberExpression") {
    return void 0;
  }
  const method = memberName(node.callee);
  if (method !== "getElementById" && method !== "querySelector") return void 0;
  const value = literalString(node.arguments?.[0]);
  if (!value) return void 0;
  return method === "getElementById" ? `#${value}` : value;
}
function extractMediaSrcMutations(script) {
  try {
    const ast = parseProgram(script);
    const bindings = /* @__PURE__ */ new Map();
    simple(ast, {
      VariableDeclarator(node) {
        if (node.id?.type !== "Identifier") return;
        const selector = lookupSelector(node.init, bindings);
        if (selector) bindings.set(node.id.name, selector);
      }
    });
    const mutations = [];
    simple(ast, {
      AssignmentExpression(node) {
        if (node.operator !== "=" || memberName(node.left) !== "src") return;
        const selector = lookupSelector(node.left.object, bindings);
        if (!selector) return;
        mutations.push({
          selector,
          operation: "src_assignment",
          raw: script.slice(node.start, node.end)
        });
      },
      CallExpression(node) {
        if (memberName(node.callee) !== "setAttribute") return;
        if (literalString(node.arguments?.[0])?.toLowerCase() !== "src") return;
        const selector = lookupSelector(node.callee.object, bindings);
        if (!selector) return;
        mutations.push({
          selector,
          operation: "set_attribute",
          raw: script.slice(node.start, node.end)
        });
      }
    });
    return mutations;
  } catch {
    return [];
  }
}

export {
  COMPOSITION_VARIABLE_TYPES,
  FONT_ALIAS_KEYS,
  resolveAliasDisplayName,
  isCompositionVariable,
  parseCompositionVariables,
  isSafeMediaUrl,
  updateTextVariableBinding,
  HTML_BODY_CSS_WIDTH_FIRST_RE,
  HTML_BODY_CSS_HEIGHT_FIRST_RE,
  VIEWPORT_META_SIZE_RE,
  extractMediaSrcMutations
};
