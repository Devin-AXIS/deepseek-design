#!/usr/bin/env node
import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  registerRunningCli
} from "./chunk-NXMYHJAL.js";
import {
  isTextFile
} from "./chunk-K4WKGXRC.js";
import {
  isRenderSucceeded
} from "./chunk-L3YOGIPG.js";
import {
  defineCommand,
  runCommand
} from "./chunk-S3S4TGEH.js";
import {
  getRunId
} from "./chunk-54HJ63Q2.js";
import {
  CliResultSignal,
  CliRuntimeError,
  CliUsageError,
  consumeCommandResult,
  registerRootExitCodeSanitizer,
  registerRootExitRequester
} from "./chunk-PBN6GBJE.js";
import {
  isDevMode
} from "./chunk-ISN5GRYI.js";
import {
  VERSION
} from "./chunk-MUINFURL.js";
import "./chunk-M2WBOQ2Q.js";

// src/cli.ts
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

// src/utils/reject-extra-positionals.ts
var ACCEPTS_EXTRA_POSITIONALS = /* @__PURE__ */ new Set([
  "compare",
  "figma asset",
  "skills update",
  "timeline set"
]);
var JOINS_EXTRA_POSITIONALS = /* @__PURE__ */ new Set(["catalog", "tts"]);
var EXTRA_POSITIONAL_HINTS = {
  add: "Run add once per item, or pass a single tag to install every item tagged with it."
};
function wantsJson(value) {
  return value === true || typeof value === "string" && value !== "false" && value !== "0";
}
function declaredArgs(cmd) {
  const raw = cmd.args;
  return raw && typeof raw === "object" ? raw : {};
}
function usageLine(path, args) {
  const parts = ["hyperframes", path];
  let hasOptions = false;
  for (const [name, def] of Object.entries(args)) {
    if (def.type !== "positional") {
      hasOptions = true;
      continue;
    }
    const optional = def.required === false || def.default !== void 0;
    parts.push(optional ? `[${name.toUpperCase()}]` : `<${name.toUpperCase()}>`);
  }
  if (hasOptions) parts.push("[OPTIONS]");
  return parts.join(" ");
}
function resolveExtraPositionals(cmd, path, parsed) {
  if (ACCEPTS_EXTRA_POSITIONALS.has(path)) return;
  const args = declaredArgs(cmd);
  const positionals = Object.entries(args).filter(([, def]) => def.type === "positional");
  const given = (Array.isArray(parsed?._) ? parsed._ : []).map(String);
  const extra = given.slice(positionals.length);
  if (extra.length === 0) return;
  const last = positionals.at(-1)?.[0];
  const words = given.slice(positionals.length - 1);
  const ttsFile = path === "tts" && isTextFile(words[0]);
  if (parsed && last && JOINS_EXTRA_POSITIONALS.has(path) && !ttsFile) {
    parsed[last] = words.join(" ");
    return;
  }
  const plural = extra.length === 1 ? "" : "s";
  const message = `Unexpected extra argument${plural} for hyperframes ${path}: ${extra.join(", ")}
Usage: ${usageLine(path, args)}` + (EXTRA_POSITIONAL_HINTS[path] ? `
${EXTRA_POSITIONAL_HINTS[path]}` : "");
  if (wantsJson(parsed?.json)) console.log(JSON.stringify({ ok: false, error: message }));
  else console.error(message);
  throw new CliUsageError(
    `${extra.length} unexpected extra argument${plural} for hyperframes ${path}`,
    {
      presented: true
    }
  );
}

// src/utils/reject-unknown-flags.ts
var ALWAYS_KNOWN = /* @__PURE__ */ new Set(["help", "h", "version", "v", "json"]);
function nameVariants(name) {
  const kebab = name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
  const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return [name, kebab, camel];
}
function knownFlags(args) {
  const known = new Set(ALWAYS_KNOWN);
  for (const [name, def] of Object.entries(args ?? {})) {
    for (const v of nameVariants(name)) known.add(v);
    const alias = def?.alias;
    if (typeof alias === "string") known.add(alias);
    else if (Array.isArray(alias)) for (const a of alias) known.add(a);
  }
  return known;
}
function longFlagName(tok) {
  const name = tok.slice(2).split("=")[0] ?? "";
  return name.startsWith("no-") ? name.slice(3) : name;
}
function unknownFlagIn(tok, known) {
  if (tok === "-" || !tok.startsWith("-")) return null;
  if (tok.startsWith("--")) {
    const name = longFlagName(tok);
    return name && !known.has(name) ? `--${name}` : null;
  }
  for (const ch of tok.slice(1).split("=")[0] ?? "") {
    if (!known.has(ch)) return `-${ch}`;
  }
  return null;
}
function assertKnownFlags(cmd, rawArgs) {
  if (!Array.isArray(rawArgs)) return;
  const rawDef = cmd.args;
  const args = rawDef && typeof rawDef === "object" ? rawDef : void 0;
  const known = knownFlags(args);
  for (const tok of rawArgs) {
    if (tok === "--") break;
    const bad = unknownFlagIn(tok, known);
    if (bad) throw new Error(`Unknown flag: ${bad}`);
  }
}

// src/utils/command-failure-tracking.ts
function trackCommandFailures(load) {
  return () => load().then((cmd) => wrapCommand(cmd, commandName(cmd)));
}
function commandName(cmd) {
  const name = cmd.meta?.name;
  return typeof name === "string" ? name : "";
}
function wrapCommand(cmd, path) {
  const run = cmd.run;
  if (typeof run !== "function" && !cmd.subCommands) return cmd;
  const wrapped = { ...cmd };
  if (typeof run === "function") {
    wrapped.run = async (ctx) => {
      const rawArgs = ctx?.rawArgs ?? [];
      const firstPositional = rawArgs.find((tok) => tok && !tok.startsWith("-"));
      const delegatesToSub = cmd.subCommands != null && firstPositional != null && Object.prototype.hasOwnProperty.call(cmd.subCommands, firstPositional);
      if (!delegatesToSub) assertKnownFlags(cmd, rawArgs);
      if (!cmd.subCommands) resolveExtraPositionals(cmd, path, ctx?.args);
      return await run(ctx);
    };
  }
  if (cmd.subCommands) {
    const wrappedSubs = {};
    for (const [name, sub] of Object.entries(cmd.subCommands)) {
      wrappedSubs[name] = () => Promise.resolve(typeof sub === "function" ? sub() : sub).then(
        (c) => wrapCommand(c, `${path} ${name}`)
      );
    }
    wrapped.subCommands = wrappedSubs;
  }
  return wrapped;
}
async function reportCommandFailure(command2, err) {
  try {
    const { trackCommandFailure } = await import("./events-UDUTOFQD.js");
    trackCommandFailure(command2, err);
  } catch {
  }
}

// src/utils/commandUsageResolution.ts
async function loadSubcommand(command2, name) {
  const subcommands = command2.subCommands;
  const candidate = subcommands?.[name];
  if (!candidate) return void 0;
  return typeof candidate === "function" ? candidate() : candidate;
}
async function resolveCommandUsage(root, argv2) {
  let command2 = root;
  let parent;
  for (const argument of argv2) {
    if (argument.startsWith("-")) break;
    const child = await loadSubcommand(command2, argument);
    if (!child) break;
    parent = command2;
    command2 = child;
  }
  return { command: command2, parent };
}

// src/cli.ts
var commandFailed = false;
for (const stream of [process.stdout, process.stderr]) {
  stream.on("error", (err) => {
    if (err.code === "EPIPE") {
      handleStreamEpipe();
    }
  });
}
(() => {
  const here = dirname(fileURLToPath(import.meta.url));
  const shader = join(here, "shaderTransitionWorker.js");
  if (!process.env.HF_SHADER_WORKER_ENTRY && existsSync(shader)) {
    process.env.HF_SHADER_WORKER_ENTRY = shader;
  }
})();
var argv = process.argv.slice(2);
var commandArg = argv[0];
var rootVersionRequested = commandArg === "--version" || commandArg === "-V" || commandArg === void 0 && (argv.includes("--version") || argv.includes("-V"));
if (rootVersionRequested) {
  console.log(VERSION);
  process.exit(0);
}
var { applyDotEnv } = await import("./dotEnv-C7SW7PQG.js");
try {
  const { readFileSync } = await import("fs");
  const { resolve: resolve2 } = await import("path");
  const envPath = resolve2(process.cwd(), ".env");
  applyDotEnv(readFileSync(envPath, "utf-8"), process.env);
} catch {
}
registerRunningCli();
var isHelp = process.argv.includes("--help") || process.argv.includes("-h");
async function assertStudioWorkspaceBuilt() {
  if (!isDevMode()) return;
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
  const { checkStudioWorkspaceBuild, formatWorkspaceBuildProblems } = await import("./workspaceBuildCheck-TOLGAI4T.js");
  const problems = checkStudioWorkspaceBuild(repoRoot);
  if (problems.length === 0) return;
  console.error(formatWorkspaceBuildProblems(problems));
  throw new CliRuntimeError("Studio workspace build check failed", {
    exitCode: 1,
    presented: true
  });
}
var commandLoaders = {
  init: () => import("./init-JAIAFDOW.js").then((m) => m.default),
  add: () => import("./add-JO6ITEV7.js").then((m) => m.default),
  catalog: () => import("./catalog-IHPOOAVE.js").then((m) => m.default),
  "media-use": () => import("./media-use-4XXGABIL.js").then((m) => m.default),
  play: () => import("./play-DXABR3QW.js").then((m) => m.default),
  present: () => import("./present-SSPLZHLB.js").then((m) => m.default),
  preview: () => assertStudioWorkspaceBuilt().then(() => import("./preview-GJOXUSUI.js").then((m) => m.default)),
  publish: () => import("./publish-JWZLW3BK.js").then((m) => m.default),
  open: () => import("./open-M3HVJ6BA.js").then((m) => m.default),
  "catch-up": () => import("./catch-up-TJJUIOSX.js").then((m) => m.default),
  render: () => import("./render-NJMRXX2X.js").then((m) => m.default),
  lint: () => import("./lint-KQK4KHEA.js").then((m) => m.default),
  check: () => import("./check-HIWCG6YR.js").then((m) => m.default),
  beats: () => import("./beats-EXTISQC7.js").then((m) => m.default),
  "normalize-audio": () => import("./normalize-audio-FEY3PX3B.js").then((m) => m.default),
  inspect: () => import("./inspect-KRAZ7XOA.js").then((m) => m.default),
  keyframes: () => import("./keyframes-A5M7ZB2Y.js").then((m) => m.default),
  layout: () => import("./layout-BGDSEZ3J.js").then((m) => m.default),
  info: () => import("./info-YROKTWSI.js").then((m) => m.default),
  compositions: () => import("./compositions-YKZY4XLL.js").then((m) => m.default),
  timeline: () => import("./timeline-UYWKKGS3.js").then((m) => m.default),
  history: () => import("./history-UPJNI3ZV.js").then((m) => m.default),
  benchmark: () => import("./benchmark-TWEF4EN5.js").then((m) => m.default),
  browser: () => import("./browser-NEUNJKP7.js").then((m) => m.default),
  "remove-background": () => import("./remove-background-JEQ5Y4BJ.js").then((m) => m.default),
  transcribe: () => import("./transcribe-WT34LDQG.js").then((m) => m.default),
  usage: () => import("./usage-A5LJ7QOG.js").then((m) => m.default),
  models: () => import("./models-XYF3FBLH.js").then((m) => m.default),
  tts: () => import("./tts-OS74FKYQ.js").then((m) => m.default),
  docs: () => import("./docs-MPOM3PHH.js").then((m) => m.default),
  doctor: () => import("./doctor-FLPE4KXL.js").then((m) => m.default),
  clean: () => import("./clean-GZ3FJ465.js").then((m) => m.default),
  upgrade: () => import("./upgrade-Z26CZPUQ.js").then((m) => m.default),
  skills: () => import("./skills-UCWEB3UG.js").then((m) => m.default),
  telemetry: () => import("./telemetry-FOZL3YVO.js").then((m) => m.default),
  events: () => import("./events-UXOB7BCH.js").then((m) => m.default),
  validate: () => import("./validate-BJ3JZFF5.js").then((m) => m.default),
  snapshot: () => import("./snapshot-WN5CTKRQ.js").then((m) => m.default),
  "media-treatment": () => import("./media-treatment-M7BDDVH4.js").then((m) => m.mediaTreatmentCommand),
  "grade-compare": () => import("./grade-compare-BDCKL5TS.js").then((m) => m.default),
  compare: () => import("./compare-6ZVMZEJD.js").then((m) => m.default),
  capture: () => import("./capture-EXVGB6NM.js").then((m) => m.default),
  figma: () => import("./figma-T6RR4S4I.js").then((m) => m.default)
};
var subCommands = Object.fromEntries(
  Object.entries(commandLoaders).map(([name, load]) => [name, trackCommandFailures(load)])
);
var main = defineCommand({
  meta: {
    name: "hyperframes",
    version: VERSION,
    description: "Create and render HTML video compositions"
  },
  subCommands
});
var cliCommandArg = process.argv[2];
var command = cliCommandArg && cliCommandArg in subCommands ? cliCommandArg : "unknown";
var hasJsonFlag = process.argv.includes("--json");
var _flushSync;
var _trackCliError;
var _trackCommandResult;
var _printUpdateNotice;
var _printStalePinNotice;
var _printSkillsUpdateNotice;
var telemetryReady = Promise.resolve();
if (!isHelp && command !== "telemetry" && command !== "events" && command !== "usage" && command !== "unknown") {
  telemetryReady = import("./telemetry-MGSZFAXZ.js").then((mod) => {
    _flushSync = mod.flushSync;
    _trackCliError = mod.trackCliError;
    _trackCommandResult = mod.trackCommandResult;
    mod.showTelemetryNotice();
    mod.trackCommand(command, runId);
    if (mod.shouldTrack()) mod.incrementCommandCount();
  });
}
if (!isHelp && !hasJsonFlag && command !== "upgrade" && command !== "events" && command !== "telemetry" && command !== "skills" && command !== "usage") {
  import("./autoUpdate-2TSJTWOC.js").then((mod) => mod.reportCompletedUpdate()).catch(() => {
  });
  import("./updateCheck-MMIQBG3W.js").then(async (mod) => {
    _printUpdateNotice = mod.printUpdateNotice;
    _printStalePinNotice = mod.printStalePinNotice;
    const result = mod.cachedUpdateCheck();
    if (result.updateAvailable) {
      const auto = await import("./autoUpdate-2TSJTWOC.js").catch(() => null);
      auto?.scheduleBackgroundInstall(result.latest, result.current);
    }
  }).catch(() => {
  });
  import("./skillsUpdateCheck-SYTDWZKH.js").then((mod) => {
    _printSkillsUpdateNotice = mod.printSkillsUpdateNotice;
  }).catch(() => {
  });
  import("./backgroundChecks-XTSYYK23.js").then((mod) => mod.launchBackgroundChecks()).catch(() => {
  });
}
var _appHistoryNotice = null;
if (!isHelp && !["unknown", "catch-up", "events", "telemetry"].includes(command)) {
  import("./appHistory-NGTCCUYJ.js").then((mod) => {
    _appHistoryNotice = mod.appHistoryNotice(process.cwd(), process.argv.slice(3));
  }).catch(() => {
  });
}
var commandStart = Date.now();
var runId = getRunId();
var finalized = false;
async function finalizeCli(result) {
  if (finalized) return;
  finalized = true;
  const exitCode = isRenderSucceeded() ? 0 : result.exitCode;
  commandFailed ||= exitCode !== 0;
  await telemetryReady.catch(() => {
  });
  _trackCommandResult?.({
    command,
    success: exitCode === 0 && commandSucceededForTelemetry(),
    exitCode,
    durationMs: Date.now() - commandStart,
    runId
  });
  if (!hasJsonFlag) {
    _printUpdateNotice?.();
    _printStalePinNotice?.();
    _printSkillsUpdateNotice?.();
  }
  if (_appHistoryNotice) process.stderr.write(`\u25C7  ${_appHistoryNotice}
`);
  process.exitCode = exitCode;
}
registerRootExitRequester((exitCode) => {
  void finalizeCli({
    exitCode,
    kind: exitCode === 0 ? "success" : "runtime_error",
    presented: true
  }).finally(() => process.exit(exitCode));
});
registerRootExitCodeSanitizer(() => {
  if (process.exitCode !== void 0 && process.exitCode !== 0) {
    process.exitCode = 0;
  }
});
process.on(
  "exit",
  // fallow-ignore-next-line complexity
  (code) => {
    if (!finalized) {
      _trackCommandResult?.({
        command,
        success: code === 0 && commandSucceededForTelemetry(),
        exitCode: code,
        durationMs: Date.now() - commandStart,
        runId
      });
    }
    _flushSync?.();
  }
);
function emitCliErrorEvent(kind, error) {
  _trackCliError?.({
    error_name: error.name,
    error_message: error.message,
    stack_trace: error.stack,
    command,
    kind
  });
}
function reportPostRenderTerminationEvent(label, kind, error) {
  process.stderr.write(
    `  [hyperframes] Post-render ${label} (render already succeeded): ${error.message}
`
  );
  emitCliErrorEvent(kind, error);
}
function exitAfterPostRenderTermination(label, kind, error) {
  reportPostRenderTerminationEvent(label, kind, error);
  _flushSync?.();
  process.exit(0);
}
function handleStreamEpipe() {
  if (!isRenderSucceeded()) commandFailed = true;
  process.exit(0);
}
function commandSucceededForTelemetry() {
  return !commandFailed || isRenderSucceeded();
}
function exitAfterCliFailure(kind, error) {
  commandFailed = true;
  emitCliErrorEvent(kind, error);
  _flushSync?.();
  process.exit(1);
}
process.on("uncaughtException", (error) => {
  if (error.code === "EPIPE") {
    handleStreamEpipe();
  }
  if (isRenderSucceeded()) {
    exitAfterPostRenderTermination("uncaughtException", "uncaught_exception", error);
  }
  exitAfterCliFailure("uncaught_exception", error);
});
process.on("unhandledRejection", (reason) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  if (isRenderSucceeded()) {
    reportPostRenderTerminationEvent("unhandledRejection", "unhandled_rejection", error);
    return;
  }
  commandFailed = true;
  process.exitCode = 1;
  emitCliErrorEvent("unhandled_rejection", error);
});
async function showUsage(cmd, parent) {
  const { showUsage: impl } = await import("./help-UYY2UCOS.js");
  return impl(cmd, parent);
}
async function showRequestedUsage() {
  const requested = await resolveCommandUsage(main, argv);
  return showUsage(requested.command, requested.parent);
}
function commandResultForError(error) {
  if (error instanceof CliResultSignal) return error.result;
  if (error instanceof CliUsageError || error instanceof CliRuntimeError) return error.result;
  return { exitCode: 1, kind: "runtime_error" };
}
async function executeCli() {
  let result = { exitCode: 0, kind: "success" };
  try {
    if (isHelp) await showRequestedUsage();
    else await runCommand(main, { rawArgs: argv });
  } catch (error) {
    result = commandResultForError(error);
    if (!(error instanceof CliResultSignal)) {
      commandFailed = true;
      await reportCommandFailure(command, error);
      const typed = error instanceof CliUsageError || error instanceof CliRuntimeError;
      if (error instanceof CliUsageError && !error.result.presented) await showRequestedUsage();
      if (!typed || !error.result.presented) {
        console.error(error instanceof Error ? error.message : String(error));
      }
    }
  } finally {
    const pending = consumeCommandResult();
    if (pending.exitCode !== 0 || result.exitCode === 0) result = pending;
    await finalizeCli(result);
  }
}
await executeCli();
