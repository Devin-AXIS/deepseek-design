import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  downloadHint,
  openInDesktop
} from "./chunk-VBEGG5QH.js";
import {
  resolveProject,
  resolveProjectOrThrow
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import "./chunk-GX6TLRYJ.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/open.ts
var examples = [
  ["Open this project in the HyperFrames desktop app", "hyperframes open"],
  ["Open another project", "hyperframes open ./my-video"],
  ["For agents", "hyperframes open --json"]
];
var WHY_NOT = {
  "handoff-unavailable": null,
  "unsupported-platform": "Opening a project from the CLI works on macOS, Windows and Linux only.",
  "not-installed": "The HyperFrames desktop app isn't installed on this computer.",
  "open-failed": "The HyperFrames desktop app couldn't be started."
};
function printResult(project, result) {
  if (result.opened) {
    console.log(`${c.success("\u25C7")}  Opening ${c.accent(project.name)} in ${result.app}`);
    if (result.handedOver) {
      const agent = { claude: "Claude Code", codex: "Codex", grok: "Grok" }[result.handedOver.engine];
      console.log(`   ${c.dim(`Its chat picks up this ${agent} conversation.`)}`);
      console.log(
        `   ${c.dim(`When the person is back here, run ${c.accent("npx hyperframes catch-up")} to see what they did in the app.`)}`
      );
    }
    return;
  }
  const why = WHY_NOT[result.reason];
  if (!why) return console.log(`${c.warn("\u25C7")}  ${downloadHint(result.downloadUrl)}`);
  console.log(`${c.warn("\u25C7")}  ${why}`);
  console.log(`   Download it: ${c.accent(result.downloadUrl)}`);
}
function projectForJson(dir) {
  try {
    return resolveProjectOrThrow(dir);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: { code: "invalid-project", message } }));
    setCommandExitCode(1);
    return null;
  }
}
var open_default = defineCommand({
  meta: { name: "open", description: "Open a project in the HyperFrames desktop app" },
  args: {
    dir: {
      type: "positional",
      description: "Project directory (default: current)",
      required: false
    },
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  run({ args }) {
    const project = args.json ? projectForJson(args.dir) : resolveProject(args.dir);
    if (!project) return;
    const result = openInDesktop(project.dir);
    if (!result.opened) setCommandExitCode(1);
    const catchUp = result.opened && result.handedOver ? { catchUp: "npx hyperframes catch-up" } : {};
    if (args.json)
      console.log(JSON.stringify({ project: project.dir, ...result, ...catchUp }, null, 2));
    else printResult(project, result);
  }
});
export {
  open_default as default,
  examples
};
