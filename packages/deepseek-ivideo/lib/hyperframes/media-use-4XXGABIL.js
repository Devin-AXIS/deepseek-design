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
  finishCommand
} from "./chunk-PBN6GBJE.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/media-use.ts
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { existsSync } from "fs";
var MEDIA_USE_ARGS = {
  type: { type: "string" },
  intent: { type: "string" },
  entity: { type: "string" },
  project: { type: "string", alias: "p" },
  adopt: { type: "boolean" },
  candidates: { type: "boolean" },
  doctor: { type: "boolean" },
  stats: { type: "boolean" },
  days: { type: "string" },
  "dry-run": { type: "boolean" },
  reuse: { type: "string" },
  from: { type: "string" },
  params: { type: "string" },
  for: { type: "string" },
  analyze: { type: "boolean" },
  "local-only": { type: "boolean" },
  provider: { type: "string" },
  "avatar-id": { type: "string" },
  "voice-id": { type: "string" },
  json: { type: "boolean" },
  help: { type: "boolean", alias: "h" }
};
var MEDIA_USE_VERBS = [
  "resolve",
  "doctor",
  "stats",
  "adopt",
  "candidates",
  "reuse",
  "from",
  "params",
  "analyze"
];
function resolveMediaUseEnginePath(here, fileExists = existsSync) {
  const candidates = [
    join(here, "..", "media-use", "resolve.mjs"),
    join(here, "skills", "media-use", "scripts", "resolve.mjs")
  ];
  const engine = candidates.find((candidate) => fileExists(candidate));
  if (!engine) {
    throw new Error(
      "media-use engine is missing from this CLI build; reinstall the CLI or run from a source checkout"
    );
  }
  return engine;
}
function mediaUsePassthroughArgs(argv) {
  const commandIndex = argv.indexOf("media-use");
  return argv.slice(commandIndex + 2);
}
function mediaUseVerbFlags(verb) {
  return verb === "resolve" ? [] : [`--${verb}`];
}
function invokeEngine(verb) {
  const here = dirname(fileURLToPath(import.meta.url));
  const passed = mediaUsePassthroughArgs(process.argv);
  const flag = mediaUseVerbFlags(verb);
  const result = spawnSync(
    process.execPath,
    [resolveMediaUseEnginePath(here), ...flag, ...passed],
    {
      stdio: "inherit"
    }
  );
  if (result.error) throw result.error;
  finishCommand(result.status ?? 1);
}
function subcommand(name, invoke) {
  return defineCommand({
    meta: { name, description: `media-use ${name}` },
    args: MEDIA_USE_ARGS,
    run: () => invoke(name)
  });
}
function createMediaUseCommand(invoke = invokeEngine) {
  const subCommands = Object.fromEntries(
    MEDIA_USE_VERBS.map((name) => [name, () => subcommand(name, invoke)])
  );
  return defineCommand({
    meta: { name: "media-use", description: "Resolve and operate on project media" },
    subCommands,
    run: () => console.log("Run `hyperframes media-use <resolve|doctor|stats|...> --help`")
  });
}
var media_use_default = createMediaUseCommand();
export {
  MEDIA_USE_VERBS,
  createMediaUseCommand,
  media_use_default as default,
  mediaUsePassthroughArgs,
  mediaUseVerbFlags,
  resolveMediaUseEnginePath
};
