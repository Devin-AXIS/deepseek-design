import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";

// ../parsers/dist/hfIds.js
var EXCLUDED_TAGS = /* @__PURE__ */ new Set([
  "script",
  "style",
  "template",
  "meta",
  "link",
  "noscript",
  "base"
]);
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function toHfId(hash) {
  const s = (hash >>> 0).toString(36);
  const four = s.length >= 4 ? s.slice(-4) : s.padStart(4, "0");
  return `hf-${four}`;
}
function ownText(el) {
  let text = "";
  el.childNodes.forEach((n) => {
    if (n.nodeType === 3) text += n.nodeValue ?? "";
  });
  return text.trim();
}
function getContractAttribute(el, name) {
  return Array.from(el.attributes).find((attr) => attr.name.toLowerCase() === name)?.value ?? null;
}
function contentKey(el) {
  const attrs = Array.from(el.attributes).filter((a) => !a.name.toLowerCase().startsWith("data-hf-")).map((a) => `${a.name.toLowerCase()}\0${a.value}`).sort().join("");
  return `${el.tagName.toLowerCase()}|${attrs}|${ownText(el)}`;
}
function mintHfId(el, assigned) {
  const key = contentKey(el);
  let id = toHfId(fnv1a(key));
  let dup = 0;
  while (assigned.has(id)) {
    dup += 1;
    if (dup > 1e4) {
      id = `hf-${(fnv1a(key) >>> 0).toString(36)}-${dup}`;
      break;
    }
    id = toHfId(fnv1a(`${key}#${dup}`));
  }
  assigned.add(id);
  return id;
}
function getChildElements(parent) {
  const directChildren = Array.from(parent.children);
  if (directChildren.length || parent.tagName.toLowerCase() !== "template") return directChildren;
  const content = parent.content;
  if (content?.children.length) return Array.from(content.children);
  return directChildren;
}
function isCompositionTemplate(el) {
  if (el.tagName.toLowerCase() !== "template") return false;
  if (getContractAttribute(el, "data-composition-id") !== null) return true;
  for (const child of getChildElements(el)) {
    if (getContractAttribute(child, "data-composition-id") !== null) return true;
  }
  return false;
}
function walkCompositionDescendants(root, visit) {
  const rootElement = root.nodeType === 9 ? root.documentElement : root;
  if (!rootElement) return;
  const walk = (parent) => {
    for (const child of getChildElements(parent)) {
      const isTemplate = child.tagName.toLowerCase() === "template";
      if (isTemplate && !isCompositionTemplate(child)) continue;
      visit(child);
      walk(child);
    }
  };
  walk(rootElement);
}
function assignHfIds(body) {
  const assigned = /* @__PURE__ */ new Set();
  walkCompositionDescendants(body, (el) => {
    const existing = getContractAttribute(el, "data-hf-id");
    if (existing) assigned.add(existing);
  });
  walkCompositionDescendants(body, (el) => {
    if (EXCLUDED_TAGS.has(el.tagName.toLowerCase())) return;
    if (getContractAttribute(el, "data-hf-id")) return;
    el.setAttribute("data-hf-id", mintHfId(el, assigned));
  });
}
function ensureHfIds(html) {
  const wrapped = !/<!doctype|<html[\s>]/i.test(html);
  const { document } = wrapped ? parseHTML(`<!DOCTYPE html><html><head></head><body>${html}</body></html>`) : parseHTML(html);
  if (!document.body) return html;
  assignHfIds(document.body);
  return wrapped ? document.body.innerHTML || "" : document.toString();
}

export {
  EXCLUDED_TAGS,
  mintHfId,
  walkCompositionDescendants,
  ensureHfIds
};
