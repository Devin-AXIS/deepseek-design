import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  FigmaClientError,
  MAX_FREEZE_BYTES,
  appendRecord,
  buildAssetSnippet,
  createFigmaClient,
  exceedsFreezeCap,
  findAllByFigmaNode,
  freezeBytes,
  nextId,
  parseFigmaRef,
  regenerateIndex,
  sanitizeSvg,
  typeDirPath,
  updateRecord,
  withFigmaErrors
} from "./chunk-GD3F26GE.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";

// src/commands/figma/asset.ts
import { existsSync } from "fs";
import { join, relative } from "path";

// src/commands/figma/download.ts
async function downloadRender(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`figma render download failed: HTTP ${res.status}`);
  const declared = Number(res.headers.get("content-length") ?? 0);
  if (exceedsFreezeCap(declared))
    throw new Error(
      `figma render download failed: content-length ${declared} exceeds ${MAX_FREEZE_BYTES} cap`
    );
  return new Uint8Array(await res.arrayBuffer());
}

// src/commands/figma/asset.ts
function gatherAssetRefs(positionals) {
  return positionals.flatMap((r) => /^https?:/i.test(r.trim()) ? [r] : r.split(",")).map((r) => r.trim()).filter((r) => r.length > 0);
}
function requireNodeRef(refInput) {
  const ref = parseFigmaRef(refInput);
  if (!ref.nodeId)
    throw new Error(
      `ref "${refInput}" has no node id \u2014 share a link with ?node-id=\u2026 or use fileKey:nodeId`
    );
  return { fileKey: ref.fileKey, nodeId: ref.nodeId };
}
function reuseExisting(fileKey, nodeId, opts, version, deps, description, entity) {
  const existing = findAllByFigmaNode(deps.projectDir, fileKey, nodeId).find(
    (r) => r.provenance.format === opts.format && (r.provenance.scale ?? 1) === (opts.scale ?? 1) && r.provenance.version === version && existsSync(join(deps.projectDir, r.path))
  );
  if (!existing) return null;
  let record = existing;
  if (description !== void 0 && description !== existing.description || entity !== void 0 && entity !== existing.entity) {
    record = {
      ...existing,
      ...description !== void 0 && { description },
      ...entity !== void 0 && { entity }
    };
    updateRecord(deps.projectDir, record);
  }
  return { record, snippet: buildAssetSnippet(record), reused: true };
}
async function freezeAndRecord(fileKey, nodeId, url, ext, opts, version, deps, description, entity) {
  let bytes = await deps.download(url);
  if (ext === "svg") {
    const b0 = bytes[0];
    if (b0 !== 60 && b0 !== 63 && b0 !== 239)
      throw new Error("figma render returned non-SVG bytes for an svg export \u2014 retry the import");
    bytes = new TextEncoder().encode(sanitizeSvg(new TextDecoder().decode(bytes)));
  }
  const id = nextId(deps.projectDir, "image");
  const destAbs = join(typeDirPath(deps.projectDir, "image"), `${id}.${ext}`);
  freezeBytes(bytes, destAbs);
  const record = {
    id,
    type: "image",
    path: relative(deps.projectDir, destAbs),
    source: `figma:${fileKey}/${nodeId}`,
    ...description !== void 0 && { description },
    ...entity !== void 0 && { entity },
    provenance: {
      source: "figma",
      fileKey,
      nodeId,
      version,
      format: opts.format,
      scale: opts.scale
    }
  };
  appendRecord(deps.projectDir, record);
  return { record, snippet: buildAssetSnippet(record), reused: false };
}
async function runAssetImport(refInput, opts, deps) {
  const [result] = await runAssetImportMany([refInput], opts, deps);
  if (!result) throw new Error(`figma asset import produced no result for "${refInput}"`);
  return result;
}
async function runAssetImportMany(refInputs, opts, deps) {
  if (refInputs.length === 0) return [];
  const refs = refInputs.map(requireNodeRef);
  const fileKey = refs[0].fileKey;
  const mixed = refs.find((r) => r.fileKey !== fileKey);
  if (mixed)
    throw new Error(
      `all refs in one import must share a fileKey (batch is per-file) \u2014 got ${fileKey} and ${mixed.fileKey}; run separate commands per file`
    );
  const { version } = await deps.client.fileVersion(fileKey);
  const description = normalizeMeta(opts.description);
  const entity = normalizeMeta(opts.entity);
  const slots = refs.map(
    (r) => reuseExisting(fileKey, r.nodeId, opts, version, deps, description, entity)
  );
  const missIndexes = slots.flatMap((s, i) => s === null ? [i] : []);
  try {
    if (missIndexes.length > 0) {
      const missNodeIds = missIndexes.map((i) => refs[i].nodeId);
      const rendered = await deps.client.renderNodes(fileKey, missNodeIds, opts);
      const byNode = new Map(rendered.map((r) => [r.nodeId, r]));
      for (const i of missIndexes) {
        const nodeId = refs[i].nodeId;
        const r = byNode.get(nodeId);
        if (!r || r.url === null)
          throw new FigmaClientError(
            "RENDER_FAILED",
            `figma could not render node ${nodeId} as ${opts.format}`,
            void 0,
            "images"
          );
        slots[i] = await freezeAndRecord(
          fileKey,
          nodeId,
          r.url,
          r.ext,
          opts,
          version,
          deps,
          description,
          entity
        );
      }
    }
  } finally {
    safeRegenerateIndex(deps.projectDir);
  }
  return slots.map((s, i) => {
    if (!s) throw new Error(`figma asset import produced no result for "${refInputs[i]}"`);
    return s;
  });
}
function normalizeMeta(value) {
  if (value === void 0) return void 0;
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned.length > 0 ? cleaned : void 0;
}
function safeRegenerateIndex(projectDir) {
  try {
    regenerateIndex(projectDir);
  } catch (err) {
    console.warn(`index.md regeneration failed: ${err instanceof Error ? err.message : err}`);
  }
}
var FORMATS = ["png", "svg", "jpg", "pdf"];
function parseFormat(raw) {
  for (const f of FORMATS) if (f === raw) return f;
  throw new Error(`unsupported format "${raw}" \u2014 use one of ${FORMATS.join(", ")}`);
}
var asset_default = defineCommand({
  meta: { name: "asset", description: "Import one or more figma nodes as frozen local assets" },
  args: {
    ref: {
      type: "positional",
      description: "figma URL, fileKey:nodeId, or fileKey (pass several, or comma-separate ids, to batch)",
      required: true
    },
    format: { type: "string", description: "png | svg | jpg | pdf", default: "svg" },
    scale: { type: "string", description: "export scale (e.g. 2)" },
    description: {
      type: "string",
      description: "what this asset is (index.md + <img alt>); e.g. the layer's purpose"
    },
    entity: {
      type: "string",
      description: 'entity name for media-use cache lookups (e.g. "Acme logo")'
    },
    dir: { type: "string", description: "project directory", default: "." }
  },
  async run({ args }) {
    await withFigmaErrors("figma:asset", async () => {
      const t0 = Date.now();
      const token = process.env.FIGMA_TOKEN ?? "";
      const client = createFigmaClient({ token });
      const positionals = (Array.isArray(args._) && args._.length > 0 ? args._ : [args.ref]).map(String);
      const refs = gatherAssetRefs(positionals);
      const results = await runAssetImportMany(
        refs,
        {
          format: parseFormat(args.format),
          scale: args.scale !== void 0 ? Number(args.scale) : void 0,
          description: args.description,
          entity: args.entity
        },
        { projectDir: args.dir, client, download: downloadRender }
      );
      for (const result of results) {
        const verb = result.reused ? "reused" : "imported";
        console.log(`${verb} ${result.record.id} \u2192 ${result.record.path}`);
        console.log(result.snippet.html);
      }
      if (results.length > 1) {
        const rendered = results.filter((r) => !r.reused).length;
        console.log(
          rendered > 0 ? `(${results.length} nodes, ${rendered} rendered in 1 figma request)` : `(${results.length} nodes, all reused from cache \u2014 no figma request)`
        );
      }
      const { trackFigmaImport } = await import("./telemetry-MGSZFAXZ.js");
      trackFigmaImport({
        phase: "asset",
        reused: results.every((r) => r.reused),
        durationMs: Date.now() - t0
      });
    });
  }
});

export {
  downloadRender,
  gatherAssetRefs,
  runAssetImport,
  runAssetImportMany,
  asset_default
};
