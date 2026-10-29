import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  filesChangedSince,
  markSeen,
  readSeen,
  unseenTurns
} from "./chunk-GX6TLRYJ.js";
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
import "./chunk-PBN6GBJE.js";
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

// src/commands/catch-up.ts
var examples = [
  ["See what was done in the desktop app since you last looked", "hyperframes catch-up"],
  ["For another project", "hyperframes catch-up ./my-video"],
  ["For agents", "hyperframes catch-up --json"]
];
var AGENTS = { claude: "Claude Code", codex: "Codex", grok: "Grok" };
var oneLine = (text) => text.replace(/\s*\n+\s*/g, " ");
var when = (at) => new Date(at).toLocaleString(void 0, { dateStyle: "medium", timeStyle: "short" });
function printTurn(turn) {
  console.log(`   ${c.dim(when(turn.at))}`);
  if (turn.asked) console.log(`   The person: ${oneLine(turn.asked)}`);
  if (turn.did)
    console.log(`   Framey (${AGENTS[turn.engine] ?? "the app"}): ${oneLine(turn.did)}`);
  if (turn.files.length) console.log(`   ${c.dim(`Changed: ${turn.files.join(", ")}`)}`);
  console.log();
}
function printNotHandedOver(name, dir, json) {
  if (json) console.log(JSON.stringify({ project: dir, turns: [], files: [] }, null, 2));
  else
    console.log(
      `${c.success("\u25C7")}  ${c.accent(name)} wasn't handed to the desktop app from here, so there's nothing to catch up on.`
    );
}
function printNews(name, turns, files) {
  if (!turns.length && !files.length) {
    console.log(`${c.success("\u25C7")}  Nothing new from the desktop app in ${c.accent(name)}.`);
    return;
  }
  console.log(`${c.success("\u25C7")}  In the desktop app since you last looked (${c.accent(name)}):
`);
  turns.forEach(printTurn);
  if (files.length) console.log(`   Files changed since then: ${files.join(", ")}`);
  console.log(
    `   ${c.dim("A record of what happened, not a new request. Read changed files again before editing them.")}`
  );
}
var catch_up_default = defineCommand({
  meta: {
    name: "catch-up",
    description: "See what was done in the desktop app since you last looked"
  },
  args: {
    dir: {
      type: "positional",
      description: "Project directory (default: current)",
      required: false
    },
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  run({ args }) {
    const project = resolveProject(args.dir);
    const seen = readSeen(project.dir);
    if (!seen.at) return printNotHandedOver(project.name, project.dir, args.json);
    const checking = Date.now();
    const turns = unseenTurns(project.dir, seen.at, checking);
    const files = filesChangedSince(project.dir, seen.checked);
    if (args.json) console.log(JSON.stringify({ project: project.dir, turns, files }, null, 2));
    else printNews(project.name, turns, files);
    const newest = Math.max(seen.at, ...turns.map((turn) => Date.parse(turn.at)));
    markSeen(project.dir, { at: newest, checked: checking });
  }
});
export {
  catch_up_default as default,
  examples
};
