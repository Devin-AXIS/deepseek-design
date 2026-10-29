import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/utils/npxCommand.ts
function buildCmdShimCommand(name, args, platform) {
  if (platform === "win32") {
    return { command: "cmd.exe", args: ["/d", "/s", "/c", `${name}.cmd`, ...args] };
  }
  return { command: name, args: [...args] };
}
function buildNpxCommand(args, platform = process.platform) {
  return buildCmdShimCommand("npx", args, platform);
}
function buildNpmCommand(args, platform = process.platform) {
  return buildCmdShimCommand("npm", args, platform);
}

export {
  buildNpxCommand,
  buildNpmCommand
};
