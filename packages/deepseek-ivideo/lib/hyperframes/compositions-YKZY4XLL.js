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
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import "./chunk-PBN6GBJE.js";
import {
  resolveReferencedStart
} from "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-TWWSYAKJ.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import {
  readProjectFile
} from "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/compositions.ts
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
var examples = [
  ["List compositions in the current project", "hyperframes compositions"],
  ["Output as JSON", "hyperframes compositions --json"]
];
var NON_RENDERED_TAGS = /* @__PURE__ */ new Set(["script", "style", "link", "meta", "template"]);
function countRenderableDescendants(root) {
  return Array.from(root.querySelectorAll("*")).filter(
    (el) => !NON_RENDERED_TAGS.has(el.tagName.toLowerCase())
  ).length;
}
function estimateDurationFromScripts(root) {
  let duration = 0;
  for (const script of Array.from(root.querySelectorAll("script"))) {
    const content = script.textContent ?? "";
    const durationPattern = /\bduration\s*:\s*(\d+(?:\.\d+)?)/g;
    let match;
    while ((match = durationPattern.exec(content)) !== null) {
      const value = Number.parseFloat(match[1] ?? "");
      if (Number.isFinite(value) && value > duration) {
        duration = value;
      }
    }
  }
  return duration;
}
function parseCompositions(html, baseDir) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const compositionDivs = doc.querySelectorAll("[data-composition-id]");
  const compositions = [];
  const startCache = /* @__PURE__ */ new Map();
  const visiting = /* @__PURE__ */ new Set();
  compositionDivs.forEach((div) => {
    const id = div.getAttribute("data-composition-id") ?? "unknown";
    const width = parseInt(div.getAttribute("data-width") ?? "1920", 10);
    const height = parseInt(div.getAttribute("data-height") ?? "1080", 10);
    const compositionSrc = div.getAttribute("data-composition-src");
    if (compositionSrc) {
      const subPath = resolve(baseDir, compositionSrc);
      const sub = readProjectFile(subPath);
      if (sub.kind === "file") {
        const subInfo = parseSubComposition(sub.text, id, width, height);
        compositions.push({ ...subInfo, source: compositionSrc });
        return;
      }
    }
    const timedChildren = div.querySelectorAll("[data-start]");
    let maxEnd = 0;
    let elementCount = 0;
    timedChildren.forEach((el) => {
      elementCount++;
      const start = resolveReferencedStart(doc, el, startCache, visiting);
      const endAttr = el.getAttribute("data-end");
      const durationAttr = el.getAttribute("data-duration");
      let end;
      if (endAttr) {
        end = parseFloat(endAttr);
      } else if (durationAttr) {
        end = start + parseFloat(durationAttr);
      } else {
        end = start + 5;
      }
      if (end > maxEnd) {
        maxEnd = end;
      }
    });
    compositions.push({
      id,
      duration: maxEnd,
      width,
      height,
      elementCount
    });
  });
  return compositions;
}
function parseSubComposition(html, fallbackId, fallbackWidth, fallbackHeight) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const template = doc.querySelector("template");
  const searchDocument = template?.content ?? doc;
  const compDiv = searchDocument.querySelector("[data-composition-id]");
  const id = compDiv?.getAttribute("data-composition-id") ?? fallbackId;
  const width = parseInt(compDiv?.getAttribute("data-width") ?? String(fallbackWidth), 10);
  const height = parseInt(compDiv?.getAttribute("data-height") ?? String(fallbackHeight), 10);
  const searchRoot = compDiv ?? searchDocument;
  const timedChildren = searchRoot.querySelectorAll("[data-start], .clip, .caption-group");
  let elementCount = timedChildren.length;
  if (elementCount === 0 && compDiv) {
    elementCount = countRenderableDescendants(compDiv);
  }
  let duration = 0;
  const durationAttr = compDiv?.getAttribute("data-duration");
  if (durationAttr && !durationAttr.startsWith("__")) {
    duration = parseFloat(durationAttr) || 0;
  }
  if (compDiv) {
    const timedEls = compDiv.querySelectorAll("[data-start]");
    const startCache = /* @__PURE__ */ new Map();
    const visiting = /* @__PURE__ */ new Set();
    timedEls.forEach((el) => {
      elementCount = Math.max(elementCount, timedEls.length);
      const start = resolveReferencedStart(doc, el, startCache, visiting);
      const endAttr = el.getAttribute("data-end");
      const durAttr = el.getAttribute("data-duration");
      let end;
      if (endAttr) {
        end = parseFloat(endAttr);
      } else if (durAttr) {
        end = start + parseFloat(durAttr);
      } else {
        end = start + 5;
      }
      if (end > duration) {
        duration = end;
      }
    });
  }
  if (duration <= 0) {
    duration = estimateDurationFromScripts(searchRoot);
  }
  return { id, duration, width, height, elementCount };
}
var compositions_default = defineCommand({
  meta: { name: "compositions", description: "List all compositions in a project" },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  async run({ args }) {
    const project = resolveProject(args.dir);
    const html = readFileSync(project.indexPath, "utf-8");
    ensureDOMParser();
    const compositions = parseCompositions(html, dirname(project.indexPath));
    if (args.json) {
      console.log(JSON.stringify(withMeta({ compositions }), null, 2));
      return;
    }
    if (compositions.length === 0) {
      console.log(`${c.success("\u25C7")}  ${c.accent(project.name)} \u2014 no compositions found`);
      return;
    }
    const compositionLabel = compositions.length === 1 ? "1 composition" : `${compositions.length} compositions`;
    console.log(
      `${c.success("\u25C7")}  ${c.accent(project.name)} ${c.dim("\u2014")} ${c.dim(compositionLabel)}`
    );
    console.log();
    const maxIdLen = compositions.reduce((max, comp) => Math.max(max, comp.id.length), 0);
    for (const comp of compositions) {
      const id = c.accent(comp.id.padEnd(maxIdLen));
      const duration = c.bold(`${comp.duration.toFixed(1)}s`);
      const resolution = c.dim(`${comp.width}\xD7${comp.height}`);
      const elements = c.dim(
        `${comp.elementCount} ${comp.elementCount === 1 ? "element" : "elements"}`
      );
      const source = comp.source ? c.dim(` \u2190 ${comp.source}`) : "";
      console.log(`   ${id}   ${duration}   ${resolution}   ${elements}${source}`);
    }
  }
});
export {
  compositions_default as default,
  examples,
  parseCompositions,
  parseSubComposition
};
