import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  RegistryCompatibilityError,
  gateRegistryItemsCompatibility
} from "./chunk-DQNOPYAG.js";
import {
  DEFAULT_PROJECT_CONFIG,
  createProjectConfig,
  loadProjectConfig,
  projectConfigPath,
  recordProjectRegistryItems
} from "./chunk-OV3IB6LQ.js";
import {
  InvalidVariableValuesError,
  prepareItem,
  publishItem
} from "./chunk-HSSSGRT3.js";
import {
  trackRegistryItemAdded
} from "./chunk-D3TRQ4GS.js";
import {
  DEFAULT_REGISTRY_URL,
  resolveItemWithDependencies,
  resolveItemsByTag
} from "./chunk-JMNDOZF2.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import {
  failCommand
} from "./chunk-PBN6GBJE.js";
import {
  ITEM_TYPE_DIRS,
  isProjectRootMissing,
  realpath
} from "./chunk-SIG2LUMK.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";

// src/commands/add.ts
import { existsSync, readFileSync } from "fs";
import { resolve, relative } from "path";

// src/utils/clipboard.ts
import { spawnSync } from "child_process";
import { platform } from "os";
function detectProvider() {
  const os = platform();
  if (os === "darwin") {
    return { cmd: "pbcopy", args: [] };
  }
  if (os === "win32") {
    return { cmd: "clip.exe", args: [] };
  }
  const candidates = [
    { cmd: "clip.exe", args: [] },
    { cmd: "wl-copy", args: [] },
    { cmd: "xclip", args: ["-selection", "clipboard"] },
    { cmd: "xsel", args: ["--clipboard", "--input"] }
  ];
  const cmd = process.platform === "win32" ? "where" : "which";
  for (const p of candidates) {
    const result = spawnSync(cmd, [p.cmd], { stdio: "ignore" });
    if (result.status === 0) return p;
  }
  return void 0;
}
var cachedProvider = null;
function copyToClipboard(text) {
  if (cachedProvider === null) cachedProvider = detectProvider();
  const provider = cachedProvider;
  if (!provider) return false;
  try {
    const res = spawnSync(provider.cmd, provider.args, {
      input: text,
      encoding: "utf-8"
    });
    return res.status === 0;
  } catch {
    return false;
  }
}

// src/commands/add.ts
var examples = [
  ["Add a block to the current project", "hyperframes add claude-code-window"],
  ["Add a component effect", "hyperframes add shader-wipe"],
  ["Add all HTML-in-Canvas blocks", "hyperframes add html-in-canvas"],
  ["Add all caption blocks", "hyperframes add captions"],
  ["Target a specific project directory", "hyperframes add shader-wipe --dir ./my-video"],
  ["Skip the clipboard copy (CI/headless)", "hyperframes add shader-wipe --no-clipboard"]
];
function remapTarget(item, originalTarget, paths) {
  if (item.type === "hyperframes:block") {
    const blocksDir = paths.blocks.replace(/\/+$/, "");
    return originalTarget.replace(/^compositions\//, `${blocksDir}/`);
  }
  if (item.type === "hyperframes:component") {
    const componentsDir = paths.components.replace(/\/+$/, "");
    return originalTarget.replace(/^compositions\/components\//, `${componentsDir}/`);
  }
  return originalTarget;
}
function variableValuesAttribute(values) {
  if (!values || Object.keys(values).length === 0) return "";
  const json = JSON.stringify(values).replace(/'/g, "&#39;");
  return ` data-variable-values='${json}'`;
}
function primaryInstalledTarget(item) {
  const primary = item.files.find((f) => f.type === "hyperframes:snippet") ?? item.files.find((f) => f.type === "hyperframes:composition") ?? item.files[0];
  return primary?.target ?? "";
}
function compositionRootId(html) {
  const { document } = parseHTML(html);
  const content = document.querySelector("template")?.content ?? document;
  return content.querySelector("[data-composition-id]")?.getAttribute("data-composition-id") ?? void 0;
}
function installedRootId(file) {
  return existsSync(file) ? compositionRootId(readFileSync(file, "utf-8")) : void 0;
}
function buildSnippet(item, relativeTarget, values = null, compositionId) {
  if (item.type === "hyperframes:block") {
    const dims = "dimensions" in item && item.dimensions ? ` data-width="${item.dimensions.width}" data-height="${item.dimensions.height}"` : "";
    const vars = variableValuesAttribute(values);
    const id = compositionId ? ` data-composition-id="${compositionId.replace(/"/g, "&quot;")}"` : "";
    return `<div${id} data-composition-src="${relativeTarget}" data-duration="${item.duration}"${dims}${vars}></div>`;
  }
  if (item.type === "hyperframes:component") {
    return `<!-- paste from ${relativeTarget} into your composition -->`;
  }
  return "";
}
function tagAddJson(tag, results) {
  return {
    ok: true,
    tag,
    installed: results.map((r) => r.name),
    warnings: results.flatMap((r) => r.warnings.map((w) => `${r.name}: ${w}`))
  };
}
function parseVariableValues(raw) {
  if (raw === void 0) return null;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new AddError("--vars must be a JSON object of variable values", "invalid-vars");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new AddError("--vars must be a JSON object of variable values", "invalid-vars");
  }
  return parsed;
}
var AddError = class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "AddError";
  }
  code;
};
function assertCompatibleOrThrow(items, cliVersion) {
  try {
    return gateRegistryItemsCompatibility(items, cliVersion);
  } catch (err) {
    if (err instanceof RegistryCompatibilityError) {
      throw new AddError(err.message, "incompatible-cli");
    }
    throw err;
  }
}
async function installAll(installPlan, destDir, baseUrl, force, requestedName, variableValues) {
  const written = [];
  const preserved = [];
  let variablesApplied = [];
  let variablesUnknown = [];
  try {
    const prepared = [];
    for (const planItem of installPlan) {
      prepared.push(
        await prepareItem(planItem, {
          destDir,
          baseUrl,
          force,
          // Only the item the user named. A dependency dragged in behind it never
          // declared these variables and must not be rewritten by them.
          variableValues: planItem.name === requestedName ? variableValues : null
        })
      );
    }
    for (const [i, planItem] of installPlan.entries()) {
      const result = publishItem(prepared[i]);
      written.push(...result.written);
      preserved.push(...result.preserved);
      if (planItem.name === requestedName) {
        variablesApplied = result.variablesApplied;
        variablesUnknown = result.variablesUnknown;
      }
    }
  } catch (err) {
    if (isProjectRootMissing(err)) throw err;
    if (err instanceof InvalidVariableValuesError) throw new AddError(err.message, "invalid-vars");
    throw new AddError(describeInstallFailure(err, baseUrl), "install-failed");
  }
  return { written, preserved, variablesApplied, variablesUnknown };
}
function describeInstallFailure(err, registry) {
  const message = err instanceof Error ? err.message : String(err);
  const cause = err instanceof Error && err.cause instanceof Error ? err.cause.message : "";
  const transport = /fetch failed|ENOTFOUND|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|socket hang up|aborted/i;
  if (!transport.test(`${message} ${cause}`)) return `Install failed: ${message}`;
  const custom = registry && !registry.startsWith(DEFAULT_REGISTRY_URL) ? `
  This project's hyperframes.json sets registry to ${registry}, so that is the host being contacted, not the public registry. If it is down or private, that is the failure.` : "";
  return `Install failed: could not download the item's files.
  ${message}
  Item files are not cached, so every install fetches them. This is usually the registry host or the network rather than a bad command.` + custom + "\n  Retry, or set HTTPS_PROXY if you are behind a proxy.";
}
async function runAdd(opts) {
  return (await addToProject(opts)).result;
}
async function addToProject(opts) {
  const projectDir = resolve(opts.projectDir);
  let config = loadProjectConfig(projectDir);
  const hasConfig = existsSync(projectConfigPath(projectDir));
  if (!hasConfig && existsSync(resolve(projectDir, "index.html"))) {
    createProjectConfig(projectDir, DEFAULT_PROJECT_CONFIG);
    config = DEFAULT_PROJECT_CONFIG;
  }
  let resolved;
  try {
    resolved = await resolveItemWithDependencies(opts.name, { baseUrl: config.registry });
  } catch (err) {
    throw new AddError(err instanceof Error ? err.message : String(err), "unknown-item");
  }
  const item = resolved[resolved.length - 1];
  if (item.type === "hyperframes:example") {
    throw new AddError(
      `"${item.name}" is an example \u2014 use \`hyperframes init <dir> --example ${item.name}\` instead.`,
      "example-type"
    );
  }
  const warnings = assertCompatibleOrThrow(resolved, opts.cliVersion);
  const installPlan = resolved.map((resolvedItem) => ({
    ...resolvedItem,
    files: resolvedItem.files.map((f) => ({
      ...f,
      target: remapTarget(resolvedItem, f.target, config.paths)
    }))
  }));
  const variableValues = parseVariableValues(opts.vars);
  const { written, preserved, variablesApplied, variablesUnknown } = await installAll(
    installPlan,
    projectDir,
    config.registry,
    opts.force ?? false,
    item.name,
    variableValues
  );
  for (const planItem of installPlan) {
    trackRegistryItemAdded({
      item: planItem.name,
      itemType: planItem.type,
      requested: planItem.name === item.name,
      source: opts.source ?? "cli"
    });
  }
  recordProjectRegistryItems(
    projectDir,
    installPlan.map((planItem) => ({
      name: planItem.name,
      type: planItem.type,
      target: primaryInstalledTarget(planItem)
    }))
  );
  const itemForInstall = installPlan[installPlan.length - 1];
  const snippetTargetRel = primaryInstalledTarget(itemForInstall);
  const compositionId = installedRootId(resolve(projectDir, snippetTargetRel));
  if (item.type === "hyperframes:block" && !compositionId) {
    warnings.push(
      `${snippetTargetRel} declares no data-composition-id, so the snippet has none; give its root one and put the same id on the snippet`
    );
  }
  const snippet = buildSnippet(item, snippetTargetRel, variableValues, compositionId);
  const clipboardCopied = !opts.skipClipboard && snippet ? copyToClipboard(snippet) : false;
  if (variablesUnknown.length > 0) {
    warnings.push(`--vars ignored (not declared by ${item.name}): ${variablesUnknown.join(", ")}`);
  }
  const result = {
    ok: true,
    name: item.name,
    type: item.type,
    typeDir: ITEM_TYPE_DIRS[item.type],
    written,
    preserved,
    installed: installPlan.map((planItem) => planItem.name),
    snippet,
    clipboardCopied,
    variablesApplied,
    warnings
  };
  return { result, item: itemForInstall };
}
var add_default = defineCommand({
  meta: {
    name: "add",
    description: "Install a block or component from the registry into this project"
  },
  args: {
    name: {
      type: "positional",
      description: "Registry item name or tag. Single items install directly (e.g. shader-wipe). If the name matches a tag instead, all blocks with that tag are installed (e.g. html-in-canvas, captions).",
      required: true
    },
    dir: {
      type: "string",
      description: "Project directory (defaults to the current working directory)"
    },
    clipboard: {
      // Declared as the positive `clipboard` (default on) so citty's built-in
      // `--no-<name>` negation handles `--no-clipboard`. Declaring the arg
      // literally as `"no-clipboard"` made citty parse `--no-clipboard` as the
      // negation of a (nonexistent) `clipboard` arg, so assertKnownFlags threw
      // "Unknown flag: --clipboard" even though --help advertised it.
      type: "boolean",
      default: true,
      description: "Copy the include snippet to the clipboard (use --no-clipboard to skip)"
    },
    json: {
      type: "boolean",
      description: "Print a machine-readable summary (written files + snippet) to stdout"
    },
    vars: {
      type: "string",
      description: "JSON of variable values to bake into the printed snippet, as copied from a catalog page"
    },
    force: {
      type: "boolean",
      description: "Overwrite files you have edited since installing them (they are kept by default)"
    }
  },
  // `run` is 28 cyclomatic and predates this change, which touches only
  // `runAdd`. Fallow scores it as new because the file changed. Splitting the
  // tag-fallback branch out would fix it honestly and is worth doing, but not
  // inside a telemetry change.
  // fallow-ignore-next-line complexity
  async run({ args }) {
    const projectDir = resolve(args.dir ?? process.cwd());
    const json = args.json === true;
    const skipClipboard = args.clipboard === false;
    const hasConfigBefore = existsSync(projectConfigPath(projectDir));
    try {
      const result = await runAdd({
        name: args.name,
        projectDir,
        skipClipboard,
        force: args.force,
        vars: args.vars
      });
      const wroteConfig = !hasConfigBefore && existsSync(projectConfigPath(projectDir));
      if (json) {
        console.log(JSON.stringify(result));
        return;
      }
      if (wroteConfig) {
        console.log(c.dim(`Wrote default ${projectConfigPath(projectDir)}`));
      }
      for (const warning of result.warnings) {
        console.warn(c.warn(`Warning: ${warning}`));
      }
      console.log("");
      console.log(`${c.success("\u2713")} Added ${c.accent(result.name)} (${result.type})`);
      const root = realpath(projectDir);
      for (const file of result.preserved) {
        console.log(
          `  ${c.warn("kept")} ${relative(root, file) || file} \u2014 you have edited this; --force to overwrite`
        );
      }
      for (const file of result.written) {
        console.log(`  ${c.dim(relative(root, file))}`);
      }
      if (result.variablesApplied.length > 0) {
        console.log(`  ${c.dim(`variables applied: ${result.variablesApplied.join(", ")}`)}`);
      }
      if (result.snippet) {
        console.log("");
        console.log(c.dim("Include snippet:"));
        console.log(`  ${result.snippet}`);
        console.log("");
        console.log(
          result.clipboardCopied ? c.dim("Copied to clipboard \u2014 paste into your host composition.") : c.dim("Paste the snippet above into your host composition.")
        );
      }
    } catch (singleErr) {
      if (!(singleErr instanceof AddError) || singleErr.code !== "unknown-item") {
        const msg = singleErr instanceof Error ? singleErr.message : String(singleErr);
        if (json) console.log(JSON.stringify({ ok: false, error: msg }));
        else console.error(c.error(msg));
        failCommand();
      }
      let config = loadProjectConfig(projectDir);
      if (!existsSync(projectConfigPath(projectDir)) && existsSync(resolve(projectDir, "index.html"))) {
        createProjectConfig(projectDir, DEFAULT_PROJECT_CONFIG);
        config = DEFAULT_PROJECT_CONFIG;
      }
      let items;
      try {
        items = await resolveItemsByTag(args.name, { baseUrl: config.registry, skipCache: true });
      } catch {
        items = [];
      }
      if (items.length === 0) {
        const msg = singleErr instanceof Error ? singleErr.message : String(singleErr);
        if (json) console.log(JSON.stringify({ ok: false, error: msg }));
        else console.error(c.error(msg));
        failCommand();
      }
      if (!json) {
        console.log("");
        console.log(
          `${c.accent("\u25C6")} Installing ${c.accent(String(items.length))} blocks tagged ${c.accent(args.name)}`
        );
      }
      const results = [];
      for (const item of items) {
        try {
          const result = await runAdd({
            name: item.name,
            projectDir,
            skipClipboard: true,
            force: args.force,
            vars: args.vars
          });
          results.push(result);
          for (const warning of result.warnings) {
            if (!json) console.log(`  ${c.warn("Warning:")} ${warning}`);
          }
          if (!json) console.log(`  ${c.success("\u2713")} ${result.name}`);
        } catch (err) {
          const reason = err instanceof Error ? err.message : String(err);
          if (!json) console.log(`  ${c.error("\u2717")} ${item.name} (skipped: ${reason})`);
        }
      }
      if (json) {
        console.log(JSON.stringify(tagAddJson(args.name, results)));
      } else {
        console.log("");
        console.log(`${c.success("\u2713")} Installed ${results.length}/${items.length} blocks`);
      }
    }
  }
});

export {
  examples,
  remapTarget,
  primaryInstalledTarget,
  compositionRootId,
  buildSnippet,
  tagAddJson,
  parseVariableValues,
  AddError,
  describeInstallFailure,
  runAdd,
  addToProject,
  add_default
};
