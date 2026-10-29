import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  renderUsage
} from "./chunk-S3S4TGEH.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/help.ts
var GROUPS = [
  {
    title: "Getting Started",
    commands: [
      ["init", "Scaffold a new composition project"],
      ["add", "Install a block or component from the registry"],
      ["capture", "Capture a website for video production"],
      ["catalog", "Browse and install blocks and components"],
      ["preview", "Start the studio for previewing compositions"],
      ["present", "Open a slideshow deck in presenter mode (with audience sync)"],
      ["publish", "Upload a project to a stable URL (private by default)"],
      ["render", "Render a composition to MP4 or WebM"],
      ["open", "Open a project in the HyperFrames desktop app"],
      ["catch-up", "See what was done in the desktop app since you last looked"]
    ]
  },
  {
    title: "Project",
    commands: [
      ["lint", "Validate a composition for common mistakes"],
      ["check", "Run lint, runtime validation, and layout inspection as one gate"],
      [
        "validate",
        "Runtime-validate a composition in headless Chrome (JS errors, missing assets, contrast)"
      ],
      ["beats", "Detect beats in the music track and write beats/<audio>.json"],
      ["inspect", "Inspect rendered visual layout across the timeline"],
      ["keyframes", "Inspect keyframes and render onion-shot diagnostics"],
      ["snapshot", "Capture key frames as PNG screenshots for visual verification"],
      [
        "media-treatment",
        "Discover, apply, or clear deterministic media treatments on one media element"
      ],
      [
        "normalize-audio",
        "Match one authored audio clip's loudness to another using integrated LUFS"
      ],
      [
        "grade-compare",
        "Render candidate color grades onto a reference frame as one labeled comparison PNG"
      ],
      ["compare", "Render composition variants into one labeled comparison sheet"],
      ["info", "Print project metadata"],
      ["compositions", "List all compositions in a project"],
      ["timeline", "Print the project's tracks and clips"],
      ["history", "List, undo and restore the project's recorded changes"],
      ["docs", "View inline documentation in the terminal"]
    ]
  },
  {
    title: "Tooling",
    commands: [
      [
        "benchmark",
        "Render with preset fps/quality/worker configs and compare speed and file size"
      ],
      ["browser", "Manage the Chrome browser used for rendering"],
      ["doctor", "Check system dependencies and environment"],
      ["clean", "Find and remove what HyperFrames left on disk"],
      ["upgrade", "Check for updates and show upgrade instructions"]
    ]
  },
  {
    title: "AI & Integrations",
    commands: [
      ["skills", "Install HyperFrames and GSAP skills for AI coding tools"],
      [
        "transcribe",
        "Transcribe audio/video to word-level timestamps, or import an existing transcript"
      ],
      ["models", "Download on-device models (models install parakeet)"],
      ["tts", "Generate speech audio from text using a local AI model (Kokoro-82M)"],
      ["remove-background", "Remove background from a video or image to produce transparent media"]
    ]
  },
  {
    title: "Account",
    commands: [["auth", "Sign in to HeyGen and manage credentials"]]
  },
  {
    title: "Settings",
    commands: [["telemetry", "Manage anonymous usage telemetry"]]
  }
];
var ROOT_EXAMPLES = [
  ["Create a new project", "hyperframes init my-video"],
  ["Start the live preview studio", "hyperframes preview"],
  ["Render to MP4", "hyperframes render -o out.mp4"],
  ["Transparent WebM overlay", "hyperframes render --format webm -o out.webm"],
  ["Validate your composition", "hyperframes lint"],
  ["Inspect visual layout", "hyperframes inspect"],
  ["Check system dependencies", "hyperframes doctor"]
];
async function loadExamples(name, parentName) {
  if (parentName && parentName !== "hyperframes") {
    const examples = await tryLoadExamples(`./commands/${parentName}/${name}.js`);
    if (examples) return examples;
  }
  return await tryLoadExamples(`./commands/${name}.js`);
}
async function tryLoadExamples(modulePath) {
  try {
    const mod = await import(modulePath);
    return mod.examples;
  } catch (err) {
    if (err.code === "ERR_MODULE_NOT_FOUND") return void 0;
    throw err;
  }
}
var STATIC_EXAMPLES = {
  skills: [["Install all skills to all supported AI tools", "hyperframes skills"]]
};
function renderRootHelp() {
  const NAME_COL = 19;
  const CMD_COL = 46;
  const lines = [];
  lines.push(
    `${c.bold("hyperframes")} ${c.dim(`v${VERSION}`)} \u2014 Create and render HTML video compositions`
  );
  lines.push("");
  lines.push(`${c.bold("Usage:")}  hyperframes ${c.cyan("<command>")} [options]`);
  lines.push("");
  for (const group of GROUPS) {
    lines.push(c.bold(`${group.title}:`));
    for (const [name, desc] of group.commands) {
      lines.push(`  ${c.cyan(name.padEnd(NAME_COL))}${desc}`);
    }
    lines.push("");
  }
  lines.push(c.bold("Examples:"));
  for (const [comment, command] of ROOT_EXAMPLES) {
    lines.push(`  ${c.dim("$")} ${command.padEnd(CMD_COL)} ${c.dim(comment)}`);
  }
  lines.push("");
  lines.push(`Run ${c.cyan("hyperframes <command> --help")} for more information about a command.`);
  return lines.join("\n");
}
function formatExamples(examples) {
  const lines = [];
  lines.push(c.bold("Examples:"));
  for (const [comment, command] of examples) {
    lines.push(`  ${c.gray(`# ${comment}`)}`);
    lines.push(`  ${command}`);
    lines.push("");
  }
  return lines.join("\n");
}
async function showUsage(cmd, parent) {
  if (!parent) {
    console.log(renderRootHelp() + "\n");
    return;
  }
  const meta = await (typeof cmd.meta === "function" ? cmd.meta() : cmd.meta);
  const usage = await renderUsage(cmd, parent);
  console.log(usage + "\n");
  const name = meta?.name;
  if (name) {
    const parentMeta = await (typeof parent.meta === "function" ? parent.meta() : parent.meta);
    const parentName = parentMeta?.name;
    const examples = STATIC_EXAMPLES[name] ?? await loadExamples(name, parentName);
    if (examples) {
      console.log(formatExamples(examples) + "\n");
    }
  }
}
export {
  showUsage
};
