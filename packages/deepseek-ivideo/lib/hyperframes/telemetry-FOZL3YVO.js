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
  failCommand
} from "./chunk-PBN6GBJE.js";
import {
  CONFIG_PATH,
  STATE_PATH,
  effectiveTelemetryStatus,
  readConfigFresh,
  writeConfigWithResult
} from "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/telemetry.ts
var examples = [
  ["Check current telemetry status", "hyperframes telemetry status"],
  ["Disable telemetry", "hyperframes telemetry disable"],
  ["Enable telemetry", "hyperframes telemetry enable"]
];
function describeOverride(source) {
  switch (source) {
    case "HYPERFRAMES_NO_TELEMETRY":
    case "DO_NOT_TRACK":
      return `${source} is set`;
    case "dev_mode":
      return "this is a development build";
    case "telemetry_disabled_build":
      return "this build has no telemetry key";
  }
}
function setTelemetryEnabled(enabled) {
  const config = readConfigFresh();
  config.telemetryEnabled = enabled;
  const result = writeConfigWithResult(config);
  if (!result.ok) {
    console.error(
      `
  ${c.error("\u2717")}  Could not persist telemetry preference to ${c.accent(CONFIG_PATH)}
  ${c.dim("Reason:")} ${result.error}
`
    );
    failCommand();
  }
  const effective = effectiveTelemetryStatus(enabled);
  const preference = enabled ? c.success("enabled") : c.bold("disabled");
  const noun = enabled && !effective.enabled ? "Telemetry preference" : "Telemetry";
  console.log(`
  ${c.success("\u2713")}  ${noun} ${preference}`);
  if (effective.source !== "config") {
    console.log(
      `  ${c.dim("Note:")} Telemetry remains disabled because ${describeOverride(effective.source)}.`
    );
  }
  console.log();
}
function runStatus() {
  const config = readConfigFresh();
  const effective = effectiveTelemetryStatus(config.telemetryEnabled);
  const status = effective.enabled ? c.success("enabled") : c.dim("disabled");
  console.log();
  console.log(`  ${c.dim("Status:")}     ${status}`);
  console.log(`  ${c.dim("Source:")}     ${effective.source}`);
  console.log(`  ${c.dim("Config:")}     ${c.accent(CONFIG_PATH)}`);
  console.log(`  ${c.dim("State:")}      ${c.accent(STATE_PATH)}`);
  console.log(`  ${c.dim("Tracked commands:")} ${c.bold(String(config.commandCount))}`);
  console.log();
  console.log(`  ${c.dim("Disable:")}    ${c.accent("hyperframes telemetry disable")}`);
  console.log(
    `  ${c.dim("Env var:")}    ${c.accent("HYPERFRAMES_NO_TELEMETRY=1")} ${c.dim("or")} ${c.accent("DO_NOT_TRACK=1")}`
  );
  console.log();
}
var telemetry_default = defineCommand({
  meta: { name: "telemetry", description: "Manage anonymous usage telemetry" },
  args: {
    subcommand: {
      type: "positional",
      description: "Subcommand: enable, disable, status",
      required: false
    }
  },
  async run({ args }) {
    const subcommand = args.subcommand;
    if (!subcommand || subcommand === "") {
      console.log(`
${c.bold("hyperframes telemetry")} ${c.dim("<subcommand>")}

Manage anonymous usage data collection.

${c.bold("SUBCOMMANDS:")}
  ${c.accent("status")}    ${c.dim("Show current telemetry status")}
  ${c.accent("enable")}    ${c.dim("Enable anonymous telemetry")}
  ${c.accent("disable")}   ${c.dim("Disable anonymous telemetry")}

${c.bold("WHAT WE COLLECT:")}
  ${c.dim("\u2022")} Command names (init, render, preview, etc.)
  ${c.dim("\u2022")} Render performance (duration, fps, quality)
  ${c.dim("\u2022")} Template choices
  ${c.dim("\u2022")} OS, architecture, Node.js version, CLI version

${c.bold("WHAT WE DON'T COLLECT:")}
  ${c.dim("\u2022")} File paths, project names, or video content
  ${c.dim("\u2022")} IP addresses (discarded by our analytics provider)
  ${c.dim("\u2022")} Any personally identifiable information

${c.dim("You can also set")} ${c.accent("HYPERFRAMES_NO_TELEMETRY=1")} ${c.dim("or")} ${c.accent("DO_NOT_TRACK=1")} ${c.dim("to disable.")}
`);
      return;
    }
    switch (subcommand) {
      case "enable":
        return setTelemetryEnabled(true);
      case "disable":
        return setTelemetryEnabled(false);
      case "status":
        return runStatus();
      default:
        console.error(
          `${c.error("Unknown subcommand:")} ${subcommand}

Run ${c.accent("hyperframes telemetry --help")} for usage.`
        );
        failCommand();
    }
  }
});
export {
  telemetry_default as default,
  examples
};
