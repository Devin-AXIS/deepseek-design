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
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/docs.ts
import { readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
var examples = [
  ["List all available topics", "hyperframes docs"],
  ["Read about data attributes", "hyperframes docs data-attributes"],
  ["Read about rendering", "hyperframes docs rendering"],
  ["Read about GSAP integration", "hyperframes docs gsap"]
];
var TOPICS = {
  "data-attributes": {
    file: "data-attributes.md",
    description: "Timing, media, and composition attributes"
  },
  examples: {
    file: "examples.md",
    description: "Built-in project examples for init"
  },
  rendering: {
    file: "rendering.md",
    description: "Render compositions to MP4 (local & Docker)"
  },
  gsap: {
    file: "gsap.md",
    description: "GSAP animation setup and usage"
  },
  troubleshooting: {
    file: "troubleshooting.md",
    description: "Common issues and fixes"
  },
  compositions: {
    file: "compositions.md",
    description: "Composition structure, nesting, and variables"
  }
};
function docsDir() {
  const thisFile = fileURLToPath(import.meta.url);
  const dir = dirname(thisFile);
  const devPath = resolve(dir, "..", "docs");
  const builtPath = resolve(dir, "docs");
  return existsSync(devPath) ? devPath : builtPath;
}
function formatInlineCode(line) {
  return line.replace(/`([^`]+)`/g, (_match, code) => c.accent(code));
}
function renderMarkdown(content) {
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      continue;
    }
    if (line.startsWith("# ")) {
      console.log(c.bold(line.slice(2)));
      continue;
    }
    if (line.startsWith("## ")) {
      console.log(c.bold(c.dim(line.slice(3))));
      continue;
    }
    if (line.startsWith("- ")) {
      const rest = formatInlineCode(line.slice(2));
      console.log(`${c.dim("  \u2022")} ${rest}`);
      continue;
    }
    console.log(formatInlineCode(line));
  }
}
var TOPIC_NAMES = Object.keys(TOPICS).join(", ");
var docs_default = defineCommand({
  meta: { name: "docs", description: "View inline documentation in the terminal" },
  args: {
    topic: {
      type: "positional",
      description: `Topic: ${TOPIC_NAMES}. Omit to list all.`,
      required: false
    }
  },
  async run({ args }) {
    const topic = args.topic;
    if (topic === void 0 || topic === "") {
      console.log(c.bold("Available topics:"));
      console.log();
      for (const [name, entry2] of Object.entries(TOPICS)) {
        console.log(`  ${c.accent(name.padEnd(20))} ${c.dim(entry2.description)}`);
      }
      console.log();
      console.log(c.dim(`Run ${c.accent("hyperframes docs <topic>")} to view a topic.`));
      return;
    }
    const entry = TOPICS[topic];
    if (entry === void 0) {
      console.error(c.error(`Unknown topic: ${topic}`));
      console.error();
      console.error("Available topics:");
      for (const name of Object.keys(TOPICS)) {
        console.error(`  ${c.accent(name)}`);
      }
      failCommand();
    }
    const filePath = join(docsDir(), entry.file);
    if (!existsSync(filePath)) {
      console.error(c.error(`Doc file not found: ${filePath}`));
      failCommand();
    }
    const content = readFileSync(filePath, "utf-8");
    console.log();
    renderMarkdown(content);
  }
});
export {
  docs_default as default,
  examples
};
