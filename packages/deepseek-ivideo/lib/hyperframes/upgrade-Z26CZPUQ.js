import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  ft,
  ge,
  q,
  ue,
  ye
} from "./chunk-WMQNIQDJ.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import {
  checkForUpdate,
  detectInstaller,
  installInvocation,
  isSafeVersion,
  rewritePinnedHyperframesText,
  rewriteProjectPinnedScripts,
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/upgrade.ts
import { execFileSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, renameSync, readdirSync } from "fs";
import { resolve } from "path";
var examples = [
  ["Check for updates interactively", "hyperframes upgrade"],
  ["Check for updates without prompting", "hyperframes upgrade --check"],
  ["Upgrade non-interactively", "hyperframes upgrade --yes"],
  ["Bump a project's pinned CLI scripts", "hyperframes upgrade --project"]
];
var upgrade_default = defineCommand({
  meta: { name: "upgrade", description: "Check for updates and show upgrade instructions" },
  args: {
    yes: { type: "boolean", alias: "y", description: "Show upgrade commands without prompting" },
    check: { type: "boolean", description: "Check for updates and exit (no prompt)" },
    json: { type: "boolean", description: "Output as JSON", default: false },
    project: {
      type: "string",
      description: "Bump this project's package.json hyperframes@<version> script pins to latest (default: current dir)"
    }
  },
  // fallow-ignore-next-line complexity
  async run({ args }) {
    const useJson = args.json === true;
    const checkOnly = args.check === true;
    if (args.project !== void 0) {
      const p = resolveProjectArgs(args.project, { check: checkOnly, json: useJson });
      const res = await upgradeProjectPins(resolve(p.dir), { json: p.json, check: p.check });
      if (p.json) {
        console.log(JSON.stringify(withMeta(res), null, 2));
        return;
      }
      printProjectPinResult(res, p.check);
      return;
    }
    if (useJson) {
      const result2 = await checkForUpdate(true);
      console.log(JSON.stringify(withMeta(result2), null, 2));
      return;
    }
    const autoYes = args.yes === true;
    ge(c.bold("hyperframes upgrade"));
    const s = ft();
    s.start("Checking for updates...");
    const result = await checkForUpdate(true);
    if (result.latest === result.current) {
      s.stop(c.success("Already up to date"));
      ye(`${c.success("\u25C7")}  ${c.bold("v" + VERSION)}`);
      return;
    }
    s.stop("Update available");
    console.log();
    console.log(`   ${c.dim("Current:")}  ${c.bold("v" + result.current)}`);
    console.log(`   ${c.dim("Latest:")}   ${c.bold(c.accent("v" + result.latest))}`);
    console.log();
    if (checkOnly) {
      ye(c.accent("Update available: v" + result.latest));
      return;
    }
    if (!autoYes && !await confirmUpgrade()) {
      ye(c.dim("Skipped."));
      return;
    }
    applyUpgrade(result, autoYes);
  }
});
async function confirmUpgrade() {
  const shouldUpgrade = await ue({ message: "Upgrade now?" });
  return !q(shouldUpgrade) && shouldUpgrade === true;
}
function applyUpgrade(result, autoYes) {
  if (!isSafeVersion(result.latest)) {
    ye(c.dim("Refusing to install: unexpected version string from npm registry."));
    setCommandExitCode(1);
    return;
  }
  const installer = detectInstaller();
  const invocation = installInvocation(installer.kind, result.latest);
  const displayCmd = installer.installCommand(result.latest);
  const npxFallback = `npx hyperframes@${result.latest}`;
  if (!invocation || !displayCmd) {
    printNpxFallback(installer.reason, npxFallback, autoYes);
    return;
  }
  if (!autoYes) {
    printManualCommands(displayCmd, npxFallback);
    return;
  }
  runDetectedInstall(invocation, displayCmd, result.latest);
}
function printNpxFallback(reason, npxFallback, autoYes) {
  console.log();
  if (autoYes) {
    console.log(
      `   ${c.dim("Couldn't detect a global install to upgrade")} ${c.dim("(" + reason + ")")}`
    );
  }
  console.log(`   ${c.accent(npxFallback)}`);
  console.log();
  ye(c.success("Run the command above to use the latest version."));
}
function printManualCommands(displayCmd, npxFallback) {
  console.log();
  console.log(`   ${c.accent(displayCmd)}`);
  console.log(`   ${c.dim("or")}`);
  console.log(`   ${c.accent(npxFallback)}`);
  console.log();
  ye(c.success("Run one of the commands above to upgrade."));
}
function resolveProjectArgs(project, opts) {
  if (typeof project !== "string" || project.length === 0) {
    return { dir: ".", check: opts.check, json: opts.json };
  }
  if (project.startsWith("-")) {
    return {
      dir: ".",
      check: opts.check || project === "--check",
      json: opts.json || project === "--json"
    };
  }
  return { dir: project, check: opts.check, json: opts.json };
}
async function upgradeProjectPins(dir, opts) {
  const pkgPath = resolve(dir, "package.json");
  if (!existsSync(pkgPath)) {
    return { changed: false, from: [], to: "", path: pkgPath };
  }
  const raw = JSON.parse(readFileSync(pkgPath, "utf-8"));
  const scripts = raw.scripts ?? {};
  const { latest } = await checkForUpdate(true);
  if (!isSafeVersion(latest)) return { changed: false, from: [], to: latest, path: pkgPath };
  const rewrite = rewriteProjectPinnedScripts(scripts, latest);
  const wrapperRewrites = readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(".sh")).map((entry) => {
    const path = resolve(dir, entry.name);
    return { path, rewrite: rewritePinnedHyperframesText(readFileSync(path, "utf-8"), latest) };
  });
  if (rewrite.changed && !opts.check) {
    raw.scripts = rewrite.scripts;
    const tmp = `${pkgPath}.tmp`;
    writeFileSync(tmp, `${JSON.stringify(raw, null, 2)}
`, "utf-8");
    renameSync(tmp, pkgPath);
  }
  if (!opts.check) {
    for (const wrapper of wrapperRewrites) {
      if (wrapper.rewrite.changed) writeFileSync(wrapper.path, wrapper.rewrite.text, "utf-8");
    }
  }
  const from = new Set(rewrite.fromVersions);
  for (const wrapper of wrapperRewrites) {
    for (const version of wrapper.rewrite.fromVersions) from.add(version);
  }
  return { changed: from.size > 0, from: [...from].sort(), to: latest, path: pkgPath };
}
function printProjectPinResult(res, checkOnly) {
  if (!existsSync(res.path)) {
    console.log(`   ${c.dim("No package.json found \u2014 nothing to upgrade.")}`);
    return;
  }
  if (!res.changed) {
    console.log(`   ${c.success("\u25C7")}  Project pins already on hyperframes@${res.to}`);
    return;
  }
  const verb = checkOnly ? "would bump" : "bumped";
  console.log(
    `   ${c.success("\u25C7")}  ${verb} project pins ${res.from.join(", ")} \u2192 ${c.accent(res.to)}`
  );
  if (checkOnly)
    console.log(`   ${c.dim("Run `npx hyperframes@latest upgrade --project` to apply.")}`);
}
function runDetectedInstall(invocation, displayCmd, version) {
  console.log();
  console.log(`   ${c.dim("Running:")} ${c.accent(displayCmd)}`);
  console.log();
  try {
    execFileSync(invocation.bin, invocation.args, { stdio: "inherit", shell: false });
    ye(c.success(`Upgraded to v${version}`));
  } catch {
    ye(c.dim("Install failed. Try running manually:"));
    console.log(`   ${c.accent(displayCmd)}`);
    setCommandExitCode(1);
  }
}
export {
  upgrade_default as default,
  examples,
  resolveProjectArgs,
  runDetectedInstall,
  upgradeProjectPins
};
