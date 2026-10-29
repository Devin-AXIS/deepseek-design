import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/figma.ts
var examples = [
  [
    "Import a frame as a frozen SVG asset",
    "hyperframes figma asset 'https://www.figma.com/design/KEY/T?node-id=1-2'"
  ],
  ["Import as PNG at 2x", "hyperframes figma asset KEY:1-2 --format png --scale 2"],
  ["Pull brand tokens into the composition", "hyperframes figma tokens KEY"],
  ["Import a frame as an editable HTML component", "hyperframes figma component KEY:10-20"]
];
var HELP = `
${c.bold("hyperframes figma")} ${c.dim("<subcommand> [args]")}

Import figma content over the REST API. Requires ${c.accent("FIGMA_TOKEN")}.

${c.bold("SUBCOMMANDS:")}
  ${c.accent("asset")}      ${c.dim("Render a node (png/svg/jpg/pdf), freeze under .media/, print a snippet.")}
  ${c.accent("tokens")}     ${c.dim("Import variables/styles as composition brand variables.")}
  ${c.accent("component")}  ${c.dim("Import a frame as an editable HTML component (brand-linked colors).")}

${c.bold("FIRST-TIME SETUP:")}
  1. ${c.dim("Mint a token:")} figma.com/settings \u2192 Security \u2192 Personal access tokens
  2. ${c.dim("Scopes (read-only only \u2014 this integration never writes to figma):")}
       File content: Read-only \xB7 File metadata: Read-only
       Variables: Read-only ${c.dim("(optional \u2014 Enterprise-only brand variables)")}
  3. ${c.accent('export FIGMA_TOKEN="figd_\u2026"')} ${c.dim("\u2014 persist in your shell profile or project .env")}

${c.bold("WHAT TO EXPECT:")}
  ${c.dim("Every import freezes files locally under .media/ and records figma provenance \u2014")}
  ${c.dim("renders never touch figma. Re-running a command re-imports only what changed.")}

${c.dim("Motion and shader import are agent-only (figma exposes no REST endpoint for")}
${c.dim("either) \u2014 use the /figma skill in a Claude session for those.")}
`;
var figma_default = defineCommand({
  meta: { name: "figma", description: "Import figma assets, tokens, and components (REST)" },
  subCommands: {
    asset: () => import("./asset-GXCU6NES.js").then((m) => m.default),
    tokens: () => import("./tokens-2PEBSGOX.js").then((m) => m.default),
    component: () => import("./component-GTDSASUR.js").then((m) => m.default)
  },
  async run({ args }) {
    if (!args._?.[0]) console.log(HELP);
  }
});
export {
  figma_default as default,
  examples
};
