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
import {
  formatBytes,
  label
} from "./chunk-IHFUKJOR.js";
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
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import {
  CANVAS_DIMENSIONS,
  parseHtml
} from "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/info.ts
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
var examples = [
  ["Show project metadata", "hyperframes info"],
  ["Output as JSON", "hyperframes info --json"]
];
function orientation(width, height) {
  if (width > height) return "landscape";
  if (height > width) return "portrait";
  return "square";
}
function durationFromHtml(html, fallback) {
  const match = html.match(/data-composition-id[^>]*data-duration=["']([\d.]+)["']/) || html.match(/data-duration=["']([\d.]+)["'][^>]*data-composition-id/);
  const value = match?.[1] ? parseFloat(match[1]) : NaN;
  return Number.isFinite(value) ? value : fallback;
}
function totalSize(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      total += totalSize(path);
    } else {
      total += statSync(path).size;
    }
  }
  return total;
}
var info_default = defineCommand({
  meta: { name: "info", description: "Print project metadata" },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  async run({ args }) {
    const project = resolveProject(args.dir);
    const html = readFileSync(project.indexPath, "utf-8");
    ensureDOMParser();
    const parsed = parseHtml(html);
    const tracks = new Set(parsed.elements.map((el) => el.zIndex));
    const maxEnd = parsed.elements.reduce(
      (max, el) => Math.max(max, el.startTime + el.duration),
      0
    );
    const widthMatch = html.match(/data-composition-id[^>]*data-width=["'](\d+)["']/) || html.match(/data-width=["'](\d+)["'][^>]*data-composition-id/);
    const heightMatch = html.match(/data-composition-id[^>]*data-height=["'](\d+)["']/) || html.match(/data-height=["'](\d+)["'][^>]*data-composition-id/);
    const fallback = CANVAS_DIMENSIONS[parsed.resolution];
    const width = widthMatch?.[1] ? parseInt(widthMatch[1], 10) : fallback.width;
    const height = heightMatch?.[1] ? parseInt(heightMatch[1], 10) : fallback.height;
    const resolution = `${width}x${height}`;
    const duration = durationFromHtml(html, maxEnd);
    const size = totalSize(project.dir);
    const typeCounts = {};
    for (const el of parsed.elements) {
      typeCounts[el.type] = (typeCounts[el.type] ?? 0) + 1;
    }
    const typeStr = Object.entries(typeCounts).map(([t, count]) => `${count} ${t}`).join(", ");
    if (args.json) {
      console.log(
        JSON.stringify(
          withMeta({
            name: project.name,
            resolution: orientation(width, height),
            width,
            height,
            duration,
            elements: parsed.elements.length,
            tracks: tracks.size,
            types: typeCounts,
            size
          }),
          null,
          2
        )
      );
      return;
    }
    console.log(`${c.success("\u25C7")}  ${c.accent(project.name)}`);
    console.log(label("Resolution", resolution));
    console.log(label("Duration", `${duration.toFixed(1)}s`));
    console.log(label("Elements", `${parsed.elements.length}${typeStr ? ` (${typeStr})` : ""}`));
    console.log(label("Tracks", `${tracks.size}`));
    console.log(label("Size", formatBytes(size)));
  }
});
export {
  info_default as default,
  durationFromHtml,
  examples,
  orientation
};
