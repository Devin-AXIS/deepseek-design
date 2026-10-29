import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  downloadRender,
  runAssetImport
} from "./chunk-YNBMR4EX.js";
import {
  FigmaClientError,
  createFigmaClient,
  nodeToHtml,
  parseFigmaRef,
  readBindings,
  resolveBindings,
  withFigmaErrors
} from "./chunk-GD3F26GE.js";
import "./chunk-IHFUKJOR.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-PBN6GBJE.js";
import {
  slugify
} from "./chunk-VC76R6W2.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/figma/component.ts
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, relative } from "path";
function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
async function runComponentImport(refInput, deps) {
  const ref = parseFigmaRef(refInput);
  if (!ref.nodeId) throw new Error(`ref "${refInput}" has no node id`);
  const tree = await deps.client.nodeTree(ref);
  const bindings = resolveBindings(tree, readBindings(deps.projectDir));
  const mapped = nodeToHtml(tree, bindings, { rootName: deps.name });
  const name = slugify(deps.name ?? tree.name);
  const componentDir = join(deps.projectDir, "compositions", "components", name);
  if (existsSync(componentDir))
    console.warn(
      `component dir compositions/components/${name} already exists \u2014 overwriting (rename the figma frame for a separate import)`
    );
  mkdirSync(componentDir, { recursive: true });
  const { html, frozenAssets, failedRasterize } = await rasterizeFallback(
    mapped,
    ref.fileKey,
    componentDir,
    deps
  );
  const htmlFile = join(componentDir, `${name}.html`);
  writeFileSync(htmlFile, html + "\n");
  const registryItem = {
    name,
    type: "hyperframes:component",
    description: `Imported from figma ${ref.fileKey}/${ref.nodeId}`,
    files: [
      {
        path: `${name}.html`,
        target: `compositions/components/${name}/${name}.html`,
        type: "hyperframes:snippet"
      },
      // The paths the frozen files ACTUALLY landed at (image_NNN.svg), which
      // is also what the emitted HTML references — not the slug names.
      ...frozenAssets.map((p) => ({
        path: p.split("/").pop() ?? p,
        target: p.replaceAll("\\", "/"),
        type: "hyperframes:asset"
      }))
    ]
  };
  writeFileSync(
    join(componentDir, "registry-item.json"),
    JSON.stringify(registryItem, null, 2) + "\n"
  );
  return {
    name,
    htmlPath: relative(deps.projectDir, htmlFile),
    unresolved: bindings.unresolved,
    rasterized: mapped.rasterize,
    failedRasterize
  };
}
async function rasterizeFallback(mapped, fileKey, componentDir, deps) {
  let html = mapped.html;
  const frozenAssets = [];
  const failedRasterize = [];
  for (const req of mapped.rasterize) {
    const asset = await renderWithPngRetry(fileKey, req, deps);
    if (asset === null) {
      failedRasterize.push(req.nodeId);
      console.warn(
        `could not render node ${req.nodeId} ("${req.name}") as svg or png \u2014 leaving its placeholder without src`
      );
      continue;
    }
    frozenAssets.push(asset.record.path);
    const srcRel = relative(componentDir, join(deps.projectDir, asset.record.path)).replaceAll(
      "\\",
      "/"
    );
    const emittedId = escapeAttr(req.nodeId);
    html = html.replaceAll(
      `data-figma-rasterize="${emittedId}" `,
      `data-figma-rasterize="${emittedId}" src="${escapeAttr(srcRel)}" `
    );
  }
  return { html, frozenAssets, failedRasterize };
}
async function renderWithPngRetry(fileKey, req, deps) {
  for (const format of ["svg", "png"]) {
    try {
      return await runAssetImport(
        `${fileKey}:${req.nodeId}`,
        { format, description: req.name },
        { projectDir: deps.projectDir, client: deps.client, download: deps.download }
      );
    } catch (err) {
      if (!(err instanceof FigmaClientError) || err.code !== "RENDER_FAILED") throw err;
    }
  }
  return null;
}
var component_default = defineCommand({
  meta: { name: "component", description: "Import a figma frame as an editable HTML component" },
  args: {
    ref: { type: "positional", description: "figma URL or fileKey:nodeId", required: true },
    name: {
      type: "string",
      description: "component name override (variant frames often share a name and would collide)"
    },
    dir: { type: "string", description: "project directory", default: "." }
  },
  async run({ args }) {
    await withFigmaErrors("figma:component", async () => {
      const t0 = Date.now();
      const client = createFigmaClient({ token: process.env.FIGMA_TOKEN ?? "" });
      const result = await runComponentImport(args.ref, {
        projectDir: args.dir,
        client,
        download: downloadRender,
        name: args.name
      });
      console.log(`imported component "${result.name}" \u2192 ${result.htmlPath}`);
      if (result.rasterized.length > 0) {
        const ok = result.rasterized.length - result.failedRasterize.length;
        console.log(
          result.failedRasterize.length > 0 ? `rasterized ${ok}/${result.rasterized.length} node(s) via asset export \u2014 ${result.failedRasterize.length} skipped (unrenderable; placeholders have no src)` : `rasterized ${result.rasterized.length} node(s) via asset export`
        );
      }
      if (result.unresolved.length > 0) {
        console.log(
          `${result.unresolved.length} binding(s) reference tokens not yet imported \u2014 colors baked as literals (flagged data-figma-unresolved). Run \`hyperframes figma tokens\` on the source/library file, then re-import to link them.`
        );
      }
      const { trackFigmaImport } = await import("./telemetry-MGSZFAXZ.js");
      trackFigmaImport({
        phase: "component",
        unresolvedBindings: result.unresolved.length,
        rasterizedNodes: result.rasterized.length,
        rasterizeFailures: result.failedRasterize.length,
        durationMs: Date.now() - t0
      });
    });
  }
});
export {
  component_default as default,
  runComponentImport
};
