import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  FigmaClientError,
  createFigmaClient,
  parseFigmaRef,
  tokensToVariables,
  upsertBindings,
  withFigmaErrors
} from "./chunk-GD3F26GE.js";
import "./chunk-IHFUKJOR.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-PBN6GBJE.js";
import "./chunk-VC76R6W2.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/figma/tokens.ts
import { writeFileSync } from "fs";
import { join } from "path";
async function runTokensImport(refInput, deps) {
  const { fileKey } = parseFigmaRef(refInput);
  const { version } = await deps.client.fileVersion(fileKey);
  const sidecarPath = join(deps.projectDir, "figma-tokens.json");
  let vars = null;
  try {
    vars = await deps.client.variables(fileKey);
  } catch (err) {
    if (!(err instanceof FigmaClientError) || err.code !== "REQUIRES_ENTERPRISE") throw err;
  }
  if (vars !== null) {
    const out = tokensToVariables(vars, { fileKey, version });
    upsertBindings(deps.projectDir, out.bindings);
    writeFileSync(sidecarPath, JSON.stringify(out.sidecar, null, 2) + "\n");
    return { mode: "variables", entries: out.entries, sidecarPath };
  }
  const styles = await deps.client.styles(fileKey);
  const sidecar = {
    source: { fileKey, version },
    tokens: styles.map((s) => ({
      name: s.name,
      type: `style:${s.style_type}`,
      figmaId: s.node_id ?? s.key,
      key: s.key,
      value: null
    }))
  };
  writeFileSync(sidecarPath, JSON.stringify(sidecar, null, 2) + "\n");
  return { mode: "styles", entries: [], sidecarPath, styleCount: styles.length };
}
var tokens_default = defineCommand({
  meta: { name: "tokens", description: "Import figma variables/styles as brand tokens" },
  args: {
    ref: { type: "positional", description: "figma fileKey or URL", required: true },
    dir: { type: "string", description: "project directory", default: "." }
  },
  async run({ args }) {
    await withFigmaErrors("figma:tokens", async () => {
      const t0 = Date.now();
      const client = createFigmaClient({ token: process.env.FIGMA_TOKEN ?? "" });
      const result = await runTokensImport(args.ref, { projectDir: args.dir, client });
      if (result.mode === "styles") {
        console.log(
          (result.styleCount ?? 0) > 0 ? `variables are Enterprise-gated on this plan \u2014 recorded ${result.styleCount} published style(s) instead (style values resolve at component-import time)` : "variables are Enterprise-gated on this plan, and this file has no published library styles to fall back to \u2014 nothing recorded. Publish the file's styles to a team library, or read variables via the Figma MCP connector's get_variable_defs instead (works on any plan, rate-limited)."
        );
      }
      console.log(`wrote ${result.sidecarPath} (${result.mode})`);
      if (result.entries.length > 0) {
        console.log("add to data-composition-variables:");
        console.log(JSON.stringify(result.entries, null, 2));
      }
      const { trackFigmaImport } = await import("./telemetry-MGSZFAXZ.js");
      trackFigmaImport({
        phase: "tokens",
        tokensMode: result.mode,
        entryCount: result.entries.length,
        durationMs: Date.now() - t0
      });
    });
  }
});
export {
  tokens_default as default,
  runTokensImport
};
