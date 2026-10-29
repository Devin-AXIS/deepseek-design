import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  openBrowser,
  parseRemoteDebuggingPort,
  validateRemoteDebuggingPortDeps
} from "./chunk-LFGJWOVA.js";
import {
  formatLintStartupMessage
} from "./chunk-6CSYCFQV.js";
import {
  desktopHint
} from "./chunk-VBEGG5QH.js";
import {
  resolveProject,
  resolveProjectOrThrow
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  resolveAutoProxy
} from "./chunk-OV3IB6LQ.js";
import "./chunk-HSSSGRT3.js";
import "./chunk-4YYJOFKS.js";
import "./chunk-HVW7ABXD.js";
import {
  buildNpxCommand
} from "./chunk-6BEFEWFB.js";
import "./chunk-GX6TLRYJ.js";
import "./chunk-6LTRBXKR.js";
import {
  MAX_PORT_SCAN,
  PreviewServerPortMismatchError,
  activeServerOnPort,
  findPortAndServe,
  killActiveServers,
  scanActiveServers
} from "./chunk-DQBY7FRR.js";
import {
  resolveLocalBrowserGpuMode
} from "./chunk-UITPTRCM.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import {
  R,
  ft,
  ge
} from "./chunk-WMQNIQDJ.js";
import "./chunk-JMNDOZF2.js";
import "./chunk-AWDFDFI3.js";
import "./chunk-3PWCGB42.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  requestCliExit,
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-3NHZZLH3.js";
import "./chunk-7QZSGMGW.js";
import "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import "./chunk-SIG2LUMK.js";
import "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import {
  isProcessDescendant,
  killOrphanedProcesses,
  killProcessTree,
  processIdentity
} from "./chunk-LAOCA3MQ.js";
import {
  runRenderSetupWorker,
  terminateProcessTree
} from "./chunk-LCSMOLGX.js";
import "./chunk-TWWSYAKJ.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import {
  isDevMode
} from "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import {
  normalizeErrorMessage
} from "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import {
  c
} from "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/preview.ts
import { spawn } from "child_process";
import { existsSync as existsSync2, lstatSync, mkdirSync as mkdirSync2, readlinkSync, symlinkSync, unlinkSync } from "fs";
import { resolve as resolve2, dirname as dirname2, basename, join as join2 } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

// src/utils/studioProxyEnv.ts
function studioProxyEnv(autoProxy, baseEnv = process.env, preview) {
  return {
    ...baseEnv,
    HYPERFRAMES_AUTO_PROXY: autoProxy ? "true" : "false",
    ...preview ? {
      HYPERFRAMES_PREVIEW_PROJECT_DIR: preview.projectDir,
      HYPERFRAMES_PREVIEW_PROJECT_NAME: preview.projectName,
      ...preview.browserGpuMode ? { HYPERFRAMES_PREVIEW_BROWSER_GPU_MODE: preview.browserGpuMode } : {}
    } : {}
  };
}

// src/commands/previewLifecycle.ts
import { spawn as nodeSpawn } from "child_process";
import { createHash } from "crypto";
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync
} from "fs";
import { homedir } from "os";
import { dirname, join, resolve } from "path";
var PreviewPortUnavailableError = class extends Error {
  requestedPort;
  boundPort;
  constructor(requestedPort, boundPort) {
    super(
      `Port ${requestedPort} is already in use; the background preview would have started on port ${boundPort} instead. Free port ${requestedPort}, pick another --port, or omit --port to accept the next free port.`
    );
    this.name = "PreviewPortUnavailableError";
    this.requestedPort = requestedPort;
    this.boundPort = boundPort;
  }
};
function defaultStateHome() {
  return process.env.XDG_STATE_HOME || join(homedir(), ".local", "state");
}
function normalized(path) {
  const resolved = resolve(path).replace(/\\/g, "/");
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}
function sessionDirectory(stateHome = defaultStateHome()) {
  return join(stateHome, "hyperframes", "previews");
}
function previewSessionPath(projectDir, stateHome = defaultStateHome()) {
  const key = createHash("sha256").update(normalized(projectDir)).digest("hex").slice(0, 16);
  return join(sessionDirectory(stateHome), `${key}.json`);
}
function previewLogPath(projectDir, stateHome = defaultStateHome()) {
  return previewSessionPath(projectDir, stateHome).replace(/\.json$/, ".log");
}
function writePreviewSession(session, stateHome = defaultStateHome()) {
  const path = previewSessionPath(session.projectDir, stateHome);
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.tmp`;
  try {
    writeFileSync(temporary, `${JSON.stringify(session, null, 2)}
`, { mode: 384 });
    renameSync(temporary, path);
  } finally {
    rmSync(temporary, { force: true });
  }
}
function readPreviewSession(projectDir, stateHome = defaultStateHome()) {
  const path = previewSessionPath(projectDir, stateHome);
  if (!existsSync(path)) return null;
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    if (!Number.isInteger(parsed.pid) || parsed.pid <= 0 || normalized(parsed.projectDir) !== normalized(projectDir)) {
      throw new Error("invalid preview session");
    }
    return parsed;
  } catch {
    rmSync(path, { force: true });
    return null;
  }
}
function hasValidPreviewProcess(session) {
  return Number.isInteger(session.pid) && session.pid > 0;
}
function hasValidPreviewEndpoint(session) {
  return Number.isInteger(session.port) && session.port > 0 && session.port <= 65535;
}
function matchesPreviewSessionFile(session, path, stateHome) {
  return typeof session.projectDir === "string" && typeof session.logPath === "string" && previewSessionPath(session.projectDir, stateHome) === path;
}
function readPreviewSessionFile(path, stateHome) {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    if (!hasValidPreviewProcess(parsed) || !hasValidPreviewEndpoint(parsed) || !matchesPreviewSessionFile(parsed, path, stateHome)) {
      throw new Error("invalid preview session");
    }
    return parsed;
  } catch {
    rmSync(path, { force: true });
    return null;
  }
}
function removePreviewSession(projectDir, stateHome = defaultStateHome()) {
  rmSync(previewSessionPath(projectDir, stateHome), { force: true });
}
function matchingServer(servers, projectDir, browserGpuMode) {
  return policyMatchingServers(servers, projectDir, browserGpuMode)[0] ?? null;
}
function policyMatchingServers(servers, projectDir, browserGpuMode) {
  return sameProjectServers(servers, projectDir).filter(
    (server) => browserGpuMode === void 0 || server.browserGpuMode === browserGpuMode
  );
}
function matchingServerAtPort(servers, projectDir, port) {
  return matchingServer(
    servers.filter((server) => server.port === port),
    projectDir
  );
}
function sameProjectServers(servers, projectDir) {
  const project = normalized(projectDir);
  return servers.filter((server) => normalized(server.projectDir) === project);
}
function sameProjectPorts(servers, projectDir) {
  return new Set(sameProjectServers(servers, projectDir).map((server) => server.port));
}
async function stopProcess(pid) {
  await terminateProcessTree(pid);
}
var delay = (ms) => new Promise((done) => setTimeout(done, ms));
function spawnDetachedPreview(projectDir, stateHome, dependencies) {
  const logPath = previewLogPath(projectDir, stateHome);
  mkdirSync(dirname(logPath), { recursive: true });
  const logFd = openSync(logPath, "a", 384);
  const spawn2 = dependencies.spawn ?? nodeSpawn;
  let child;
  try {
    child = spawn2(
      dependencies.execPath ?? process.execPath,
      buildBackgroundPreviewArgs(dependencies.argv ?? process.argv.slice(1)),
      {
        detached: true,
        stdio: ["ignore", logFd, logFd],
        env: process.env
      }
    );
  } finally {
    closeSync(logFd);
  }
  if (!child.pid) throw new Error("background preview child did not report a PID");
  child.unref();
  return {
    pid: child.pid,
    wrapperIdentity: (dependencies.identity ?? processIdentity)(child.pid) ?? void 0,
    logPath
  };
}
function startedServer(servers, projectDir, preLaunchPorts, launchedPid, dependencies) {
  const isDescendant = dependencies.isDescendant ?? isProcessDescendant;
  const ours = (server) => {
    const pid = Number(server.pid);
    return pid === launchedPid || isDescendant(pid, launchedPid);
  };
  const candidates = servers.filter((server) => !preLaunchPorts.has(server.port) && ours(server));
  return matchingServer(candidates, projectDir, dependencies.browserGpuMode);
}
function buildBackgroundPreviewArgs(argv) {
  const filtered = argv.filter(
    (arg) => arg !== "--background" && !arg.startsWith("--background=") && arg !== "--foreground" && !arg.startsWith("--foreground=") && arg !== "--open" && arg !== "--no-open" && arg !== "--force-new" && arg !== "--json"
  );
  return [...filtered, "--foreground", "--no-open", "--force-new"];
}
async function readBackgroundPreviewStatus(projectDir, startPort, dependencies = {}) {
  const scan = dependencies.scan ?? scanActiveServers;
  const stateHome = dependencies.stateHome ?? defaultStateHome();
  const saved = readPreviewSession(projectDir, stateHome);
  const server = matchingServer(await scan(saved?.port ?? startPort), projectDir);
  if (server) {
    const pid = Number(server.pid ?? saved?.pid);
    if (Number.isInteger(pid) && pid > 0) {
      return {
        pid,
        port: server.port,
        projectDir: resolve(projectDir),
        logPath: saved?.logPath ?? previewLogPath(projectDir, stateHome)
      };
    }
  }
  if (saved && wrapperProcessIsAlive(saved, dependencies)) return null;
  removePreviewSession(projectDir, stateHome);
  return null;
}
function processIsSignalable(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === "EPERM";
  }
}
function wrapperProcessIsAlive(saved, dependencies) {
  if (!saved.wrapperIdentity) return false;
  const signalable = dependencies.isSignalable ?? processIsSignalable;
  if (!signalable(saved.pid)) return false;
  const identity = (dependencies.identity ?? processIdentity)(saved.pid);
  if (identity === null) return true;
  return identity === saved.wrapperIdentity;
}
async function listBackgroundPreviewStatuses(dependencies = {}) {
  const stateHome = dependencies.stateHome ?? defaultStateHome();
  const directory = sessionDirectory(stateHome);
  let files;
  try {
    files = readdirSync(directory).filter((name) => name.endsWith(".json")).map((name) => join(directory, name));
  } catch {
    return [];
  }
  const saved = files.map((path) => readPreviewSessionFile(path, stateHome)).filter((session) => session !== null);
  const statuses = await Promise.all(
    saved.map(
      (session) => readBackgroundPreviewStatus(session.projectDir, session.port, {
        ...dependencies,
        stateHome
      })
    )
  );
  return statuses.filter((status) => status !== null);
}
function readyPreviewSession(server, pid, wrapperIdentity, projectDir, logPath, dependencies) {
  const identity = wrapperIdentity ?? (dependencies.identity ?? processIdentity)(pid) ?? void 0;
  const liveServerPid = Number(server.pid);
  return {
    session: {
      pid,
      wrapperIdentity: identity,
      port: server.port,
      projectDir: resolve(projectDir),
      logPath
    },
    publicPid: Number.isInteger(liveServerPid) && liveServerPid > 0 ? liveServerPid : pid
  };
}
function ownedStopTargetPid(saved, liveServerPid, dependencies) {
  if (!saved?.wrapperIdentity) return liveServerPid;
  const identity = dependencies.identity ?? processIdentity;
  if (identity(saved.pid) !== saved.wrapperIdentity) return liveServerPid;
  if (saved.pid === liveServerPid) return saved.pid;
  const isDescendant = dependencies.isDescendant ?? isProcessDescendant;
  return isDescendant(liveServerPid, saved.pid) ? saved.pid : liveServerPid;
}
async function stopOwnedPreviewBeforeReplacement(owned, projectDir, dependencies) {
  if (!owned) return;
  await stopBackgroundPreview(projectDir, owned.port, dependencies);
}
function savedOwnedPreview(servers, saved, projectDir) {
  if (!saved) return null;
  const savedPortServers = servers.filter((server) => server.port === saved.port);
  return matchingServer(savedPortServers, projectDir);
}
async function readPreviewLifecycleState(projectDir, startPort, dependencies) {
  const scan = dependencies.scan ?? scanActiveServers;
  const stateHome = dependencies.stateHome ?? defaultStateHome();
  const saved = readPreviewSession(projectDir, stateHome);
  const scanStart = saved?.port ?? startPort;
  const scanned = await scan(scanStart);
  return { scan, stateHome, saved, scanStart, scanned };
}
function unmetPreferredPort(port, preferredPort) {
  return preferredPort !== void 0 && port !== preferredPort ? preferredPort : void 0;
}
function reuseExistingPreview(reusableExisting, candidates, dependencies) {
  if (!reusableExisting || dependencies.forceNew) return null;
  const unmet = unmetPreferredPort(reusableExisting.port, dependencies.preferredPort);
  if (unmet !== void 0) {
    throw new PreviewServerPortMismatchError(
      unmet,
      candidates,
      ` To start one on port ${unmet} instead, add --force-new or run --stop first.`
    );
  }
  return {
    type: "reused",
    port: reusableExisting.port,
    pid: reusableExisting.pid ? Number(reusableExisting.pid) : null,
    logPath: null
  };
}
async function addPreferredPortServer(scanned, scanStart, dependencies) {
  const preferred = dependencies.preferredPort;
  if (preferred === void 0) return;
  if (preferred >= scanStart && preferred < scanStart + MAX_PORT_SCAN) return;
  const server = await (dependencies.probe ?? activeServerOnPort)(preferred);
  if (server) scanned.push(server);
}
async function startBackgroundPreview(projectDir, startPort, dependencies = {}) {
  const { scan, stateHome, saved, scanStart, scanned } = await readPreviewLifecycleState(
    projectDir,
    startPort,
    dependencies
  );
  await addPreferredPortServer(scanned, scanStart, dependencies);
  const candidates = policyMatchingServers(scanned, projectDir, dependencies.browserGpuMode);
  const onPreferredPort = candidates.find((server2) => server2.port === dependencies.preferredPort) ?? null;
  const requestedExisting = candidates[0] ?? null;
  const ownedExisting = savedOwnedPreview(scanned, saved, projectDir);
  const reusableOwned = ownedExisting ? matchingServer([ownedExisting], projectDir, dependencies.browserGpuMode) : null;
  const reusableExisting = onPreferredPort ?? reusableOwned ?? (ownedExisting ? null : requestedExisting);
  const reused = reuseExistingPreview(reusableExisting, candidates, dependencies);
  if (reused) return reused;
  await stopOwnedPreviewBeforeReplacement(ownedExisting, projectDir, dependencies);
  const preLaunchPorts = sameProjectPorts(await scan(startPort), projectDir);
  const { pid, wrapperIdentity, logPath } = spawnDetachedPreview(
    projectDir,
    stateHome,
    dependencies
  );
  const kill = dependencies.kill ?? stopProcess;
  const server = await awaitStartedServer(projectDir, startPort, preLaunchPorts, pid, dependencies);
  if (!server) {
    await kill(pid);
    throw new Error(`background preview did not become ready; see ${logPath}`);
  }
  const unmet = unmetPreferredPort(server.port, dependencies.preferredPort);
  if (unmet !== void 0) {
    await kill(pid);
    if (!await awaitServerGone(projectDir, startPort, server.port, dependencies)) {
      throw new Error(
        `background preview on port ${server.port} did not stop after failing to bind port ${unmet}; see ${logPath}`
      );
    }
    throw new PreviewPortUnavailableError(unmet, server.port);
  }
  const ready = readyPreviewSession(
    server,
    pid,
    wrapperIdentity,
    projectDir,
    logPath,
    dependencies
  );
  writePreviewSession(ready.session, stateHome);
  return {
    type: "started",
    ...ready.session,
    pid: ready.publicPid
  };
}
async function awaitStartedServer(projectDir, startPort, preLaunchPorts, launchedPid, dependencies) {
  const scan = dependencies.scan ?? scanActiveServers;
  const sleep = dependencies.sleep ?? delay;
  for (let attempt = 0; attempt < 50; attempt++) {
    const server = startedServer(
      await scan(startPort),
      projectDir,
      preLaunchPorts,
      launchedPid,
      dependencies
    );
    if (server) return server;
    await sleep(200);
  }
  return null;
}
async function stopBackgroundPreview(projectDir, startPort, dependencies = {}) {
  const { stateHome, saved, scanStart, scanned } = await readPreviewLifecycleState(
    projectDir,
    startPort,
    dependencies
  );
  const server = saved ? matchingServerAtPort(scanned, projectDir, saved.port) : matchingServer(scanned, projectDir);
  if (!server) {
    removePreviewSession(projectDir, stateHome);
    return false;
  }
  const pid = Number(server.pid);
  if (!Number.isInteger(pid) || pid <= 0) {
    throw new Error(`preview ownership could not be proven for ${resolve(projectDir)}`);
  }
  const kill = dependencies.kill ?? stopProcess;
  await kill(ownedStopTargetPid(saved, pid, dependencies));
  if (!await awaitServerGone(projectDir, scanStart, server.port, dependencies)) {
    throw new Error(`background preview did not stop for ${resolve(projectDir)}`);
  }
  removePreviewSession(projectDir, stateHome);
  return true;
}
async function awaitServerGone(projectDir, scanStart, port, dependencies) {
  const scan = dependencies.scan ?? scanActiveServers;
  const sleep = dependencies.sleep ?? delay;
  for (let attempt = 0; attempt < 25; attempt++) {
    if (!matchingServerAtPort(await scan(scanStart), projectDir, port)) return true;
    await sleep(100);
  }
  return false;
}

// src/commands/previewLifecycleOutput.ts
function lifecyclePayload(operation, result) {
  return { schemaVersion: 1, operation, ok: true, result };
}
function lifecycleFailurePayload(operation, code, message) {
  return { schemaVersion: 1, operation, ok: false, error: { code, message } };
}
function writeLifecycleJson(payload) {
  console.log(JSON.stringify(payload));
}

// src/commands/preview.ts
var examples = [
  ["Preview the current project", "hyperframes preview"],
  ["Print the current Studio selection as JSON", "hyperframes preview --selection --json"],
  ["Print current Studio context as JSON", "hyperframes preview --context --json"],
  ["Preview a specific project directory", "hyperframes preview ./my-video"],
  ["Use a custom port", "hyperframes preview --port 8080"],
  ["Force a new server even if one is already running", "hyperframes preview --force-new"],
  ["Keep preview running after this command exits", "hyperframes preview --background"],
  ["Force an attached preview in a non-interactive shell", "hyperframes preview --foreground"],
  ["Show the background preview for this project", "hyperframes preview --status"],
  ["Stop the background preview for this project", "hyperframes preview --stop"],
  ["Start without opening the browser", "hyperframes preview --no-open"],
  ["Open with a specific browser", "hyperframes preview --browser-path /usr/bin/chromium"],
  [
    "Open with CDP enabled (requires browser path + isolated profile)",
    "hyperframes preview --browser-path /usr/bin/chromium --user-data-dir /tmp/hf-profile --remote-debugging-port 9222"
  ],
  ["List all active preview servers", "hyperframes preview --list"],
  ["Kill all active preview servers", "hyperframes preview --kill-all"],
  [
    "Disable auto-proxying of browser-hostile video codecs (HEVC, ProRes, AV1)",
    "hyperframes preview --no-proxy"
  ],
  [
    "Show full lint findings on startup instead of the summary line",
    "hyperframes preview --lint-verbose"
  ]
];
var STUDIO_CHILD_SHUTDOWN_SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"];
var DEFAULT_CONTEXT_FIELDS = ["server", "selection", "lint", "capabilities"];
var PREVIEW_PORT_MISMATCH_CODE = "preview-port-mismatch";
function backgroundStartFailureCode(error) {
  if (error instanceof PreviewServerPortMismatchError) return PREVIEW_PORT_MISMATCH_CODE;
  if (error instanceof PreviewPortUnavailableError) return "preview-port-unavailable";
  return "preview-start-failed";
}
var preview_default = defineCommand({
  meta: {
    name: "preview",
    description: "Start the studio for previewing compositions"
  },
  args: {
    dir: {
      type: "positional",
      description: "Project directory",
      required: false
    },
    port: {
      type: "string",
      description: "Port to run the preview server on",
      default: "3002"
    },
    "force-new": {
      type: "boolean",
      description: "Start a new server even if one is already running for this project",
      default: false
    },
    background: {
      type: "boolean",
      description: "Start a preview that remains running after the command exits",
      default: false
    },
    foreground: {
      type: "boolean",
      description: "Keep preview attached even when the shell is non-interactive",
      default: false
    },
    status: {
      type: "boolean",
      description: "Show the background preview for this project and exit",
      default: false
    },
    stop: {
      type: "boolean",
      description: "Stop the background preview for this project and exit",
      default: false
    },
    list: {
      type: "boolean",
      description: "List all active preview servers and exit",
      default: false
    },
    "kill-all": {
      type: "boolean",
      description: "Kill all active preview servers and exit",
      default: false
    },
    "lint-verbose": {
      type: "boolean",
      description: "Show full lint findings on startup (default: a one-line summary)",
      default: false
    },
    open: {
      type: "boolean",
      default: true,
      description: "Open browser automatically"
    },
    selection: {
      type: "boolean",
      description: "Print the current element selected in a running Studio preview and exit",
      default: false
    },
    json: {
      type: "boolean",
      description: "Output selection, context, or managed lifecycle state as JSON",
      default: false
    },
    context: {
      type: "boolean",
      description: "Print the current agent-readable context from a running Studio preview and exit",
      default: false
    },
    "context-fields": {
      type: "string",
      description: "Comma-separated context fields to include: server,selection,lint,capabilities (only with --context)"
    },
    "context-detail": {
      type: "string",
      description: "Context payload detail: compact or full (only with --context)",
      default: "compact"
    },
    "browser-path": {
      type: "string",
      description: "Path to the browser executable to open"
    },
    "user-data-dir": {
      type: "string",
      description: "Chromium-compatible user data directory (requires --browser-path)"
    },
    "remote-debugging-port": {
      type: "string",
      description: "Chromium remote debugging port (requires --browser-path and --user-data-dir)"
    },
    "browser-no-gpu": {
      type: "boolean",
      default: false,
      description: "Launch the opened browser with --disable-gpu (requires --browser-path). For hosts where hardware acceleration crashes the graphics driver (e.g. NVIDIA Xid resets); with the system default browser use --no-open instead."
    },
    "browser-gpu": {
      type: "boolean",
      description: "Use hardware GPU for Studio thumbnails and frame capture; pass --no-browser-gpu for deterministic SwiftShader (default: auto-detect)",
      default: void 0
    },
    proxy: {
      type: "boolean",
      description: "Auto-transcode browser-hostile video codecs (HEVC, ProRes, AV1) to a cached authoring proxy for preview (default: on; overrides hyperframes.json's media.autoProxy)",
      negativeDescription: "Disable auto-proxying of browser-hostile video codecs"
    }
  },
  async run({ args }) {
    const launchModeError = previewLaunchModeError({
      background: Boolean(args.background),
      foreground: Boolean(args.foreground),
      forceNew: Boolean(args["force-new"]),
      status: Boolean(args.status),
      stop: Boolean(args.stop),
      list: Boolean(args.list),
      killAll: Boolean(args["kill-all"])
    });
    if (launchModeError) {
      if (args.json) {
        writeLifecycleJson(
          lifecycleFailurePayload(
            args.status ? "status" : args.stop ? "stop" : args.list ? "list" : args["kill-all"] ? "kill-all" : "start",
            "conflicting-lifecycle-flags",
            launchModeError
          )
        );
      } else {
        R.error(launchModeError);
      }
      setCommandExitCode(1);
      return;
    }
    const portError = previewPortError(args.port);
    if (portError) {
      reportPreviewFailure(
        Boolean(args.json),
        args.status ? "status" : args.stop ? "stop" : args.list ? "list" : args["kill-all"] ? "kill-all" : "start",
        "preview-validation-failed",
        portError
      );
      return;
    }
    const browserGpuMode = resolveLocalBrowserGpuMode(args["browser-gpu"]);
    if (args["browser-gpu"] === true) process.env.PRODUCER_BROWSER_GPU_MODE = "hardware";
    if (args["browser-gpu"] === false) process.env.PRODUCER_BROWSER_GPU_MODE = "software";
    const startPort = parseInt(args.port ?? "3002", 10);
    const explicitPort = hasExplicitPreviewPort(process.argv) ? startPort : void 0;
    if (args.status || args.stop) {
      try {
        const project2 = args.json ? resolveProjectOrThrow(args.dir) : resolveProject(args.dir);
        if (args.stop) {
          const stopped = await stopBackgroundPreview(project2.dir, startPort);
          if (args.json) {
            writeLifecycleJson(
              lifecyclePayload(
                "stop",
                stopped ? { state: "stopped", projectDir: project2.dir } : { state: "not-running", projectDir: project2.dir }
              )
            );
          } else {
            console.log(
              stopped ? `
  ${c.success("Stopped background preview")} ${c.dim(project2.dir)}
` : `
  ${c.dim("No background preview is running for")} ${project2.dir}
`
            );
          }
          return;
        }
        const status = await readBackgroundPreviewStatus(project2.dir, startPort);
        if (!status) {
          if (args.json) {
            writeLifecycleJson(
              lifecyclePayload("status", {
                state: "not-running",
                projectDir: project2.dir
              })
            );
          } else {
            console.log(`
  ${c.dim("No background preview is running for")} ${project2.dir}
`);
          }
          return;
        }
        if (args.json) {
          writeLifecycleJson(
            lifecyclePayload(
              "status",
              previewLifecycleSession({
                state: "running",
                mode: "background",
                projectName: project2.name,
                projectDir: project2.dir,
                port: status.port,
                pid: status.pid,
                logPath: status.logPath
              })
            )
          );
          return;
        }
        printStudioSummary(project2.name, previewBaseUrl(status.port), project2.dir, {
          details: [`Background preview running (PID ${status.pid}).`, `Log: ${status.logPath}`]
        });
        return;
      } catch (error) {
        reportPreviewFailure(
          Boolean(args.json),
          args.stop ? "stop" : "status",
          args.stop ? "preview-stop-failed" : "preview-status-failed",
          normalizeErrorMessage(error)
        );
        return;
      }
    }
    if (args.list) {
      await handlePreviewList(startPort, Boolean(args.json));
      return;
    }
    if (args["kill-all"]) {
      await handlePreviewKillAll(startPort, Boolean(args.json));
      return;
    }
    if (args.context) {
      const project2 = resolveProject(args.dir);
      return printCurrentContext(project2.dir, startPort, {
        json: Boolean(args.json),
        fields: args["context-fields"],
        detail: args["context-detail"],
        preferredPort: explicitPort
      });
    }
    if (args.selection) {
      const project2 = resolveProject(args.dir);
      return printCurrentSelection(project2.dir, startPort, Boolean(args.json), explicitPort);
    }
    const rawArg = args.dir;
    const isImplicitCwd = !rawArg || rawArg === "." || rawArg === "./";
    let project;
    try {
      project = args.json ? resolveProjectOrThrow(rawArg) : resolveProject(rawArg);
    } catch (error) {
      reportPreviewFailure(
        Boolean(args.json),
        "start",
        "preview-start-failed",
        normalizeErrorMessage(error)
      );
      return;
    }
    const dir = project.dir;
    const projectName = isImplicitCwd ? basename(process.env.PWD ?? dir) : project.name;
    if (args["user-data-dir"] && !args["browser-path"]) {
      reportPreviewFailure(
        Boolean(args.json),
        "start",
        "preview-validation-failed",
        "--user-data-dir requires --browser-path"
      );
      return;
    }
    const depsError = validateRemoteDebuggingPortDeps({
      browserPath: args["browser-path"],
      userDataDir: args["user-data-dir"],
      remoteDebuggingPort: args["remote-debugging-port"]
    });
    if (depsError) {
      reportPreviewFailure(Boolean(args.json), "start", "preview-validation-failed", depsError);
      return;
    }
    const noOpen = !args.open;
    const browserPath = args["browser-path"];
    const browserNoGpu = !!args["browser-no-gpu"];
    if (browserNoGpu && !browserPath) {
      reportPreviewFailure(
        Boolean(args.json),
        "start",
        "preview-validation-failed",
        "--browser-no-gpu requires --browser-path (the system default browser cannot receive Chromium flags \u2014 use --no-open on GPU-unstable hosts)"
      );
      return;
    }
    const userDataDir = args["user-data-dir"];
    let remoteDebuggingPort;
    try {
      remoteDebuggingPort = parseRemoteDebuggingPort(
        args["remote-debugging-port"]
      );
    } catch (err) {
      reportPreviewFailure(
        Boolean(args.json),
        "start",
        "preview-validation-failed",
        err.message
      );
      return;
    }
    const autoProxy = resolveAutoProxy(dir, args.proxy);
    const orphansKilled = killOrphanedProcesses();
    if (orphansKilled > 0 && !args.json) {
      console.log(
        `  ${c.dim(`Cleaned up ${orphansKilled} orphaned process${orphansKilled === 1 ? "" : "es"} from a previous session.`)}`
      );
    }
    const startupLint = args.json ? null : printStartupLint(dir, Boolean(args["lint-verbose"]));
    const launchMode = previewLaunchMode({
      background: Boolean(args.background),
      foreground: Boolean(args.foreground),
      interactive: Boolean(process.stdin.isTTY && process.stdout.isTTY),
      devMode: isDevMode(),
      localStudio: hasLocalStudio(dir)
    });
    if (launchMode === "background") {
      let background;
      try {
        background = await startBackgroundPreview(dir, startPort, {
          forceNew: Boolean(args["force-new"]),
          // A bare launch promises same-project reuse, regardless of the mode
          // the existing managed server resolved earlier. Only an explicit
          // --browser-gpu/--no-browser-gpu request authorizes replacement.
          browserGpuMode: args["browser-gpu"] === void 0 ? void 0 : browserGpuMode,
          preferredPort: explicitPort
        });
      } catch (error) {
        const message = normalizeErrorMessage(error);
        if (args.json) {
          writeLifecycleJson(
            lifecycleFailurePayload("start", backgroundStartFailureCode(error), message)
          );
        } else {
          R.error(message);
        }
        setCommandExitCode(1);
        return;
      }
      const url = `http://localhost:${background.port}`;
      if (args.json) {
        writeLifecycleJson(
          lifecyclePayload(
            "start",
            previewLifecycleSession({
              state: background.type,
              mode: "background",
              projectName,
              projectDir: dir,
              port: background.port,
              pid: background.pid,
              ...background.logPath ? { logPath: background.logPath } : {}
            })
          )
        );
      } else {
        ge(c.bold("hyperframes preview"));
        printStudioSummary(projectName, url, dir, {
          details: [
            background.type === "reused" ? "Reusing the background server already running for this project." : `Running in the background. Log: ${background.logPath}`,
            "Changes reload automatically in the studio."
          ],
          footer: `Stop with: hyperframes preview ${JSON.stringify(dir)} --stop`
        });
      }
      openStudioBrowser(url, projectName, {
        noOpen,
        browserPath,
        userDataDir,
        remoteDebuggingPort,
        browserNoGpu
      });
      await startupLint;
      return;
    }
    if (launchMode === "dev") {
      return runDevMode(dir, {
        projectName,
        noOpen,
        browserPath,
        userDataDir,
        remoteDebuggingPort,
        browserNoGpu,
        autoProxy,
        browserGpuMode,
        port: startPort,
        json: Boolean(args.json)
      });
    }
    if (launchMode === "local") {
      return runLocalStudioMode(dir, {
        projectName,
        noOpen,
        browserPath,
        userDataDir,
        remoteDebuggingPort,
        browserNoGpu,
        autoProxy,
        browserGpuMode,
        port: startPort,
        json: Boolean(args.json)
      });
    }
    const forceNew = !!args["force-new"];
    return runEmbeddedMode(dir, startPort, {
      projectName,
      forceNew,
      autoProxy,
      noOpen,
      browserPath,
      userDataDir,
      remoteDebuggingPort,
      browserNoGpu,
      browserGpuMode,
      json: Boolean(args.json)
    });
  }
});
async function printStartupLint(dir, verbose) {
  try {
    const lintResult = await runRenderSetupWorker(
      "lint",
      { projectDir: dir },
      { maxBufferBytes: 8 * 1024 * 1024 }
    );
    if (lintResult.totalErrors === 0 && lintResult.totalWarnings === 0) return;
    console.log();
    for (const line of formatLintStartupMessage(
      lintResult,
      verbose ? { kind: "verbose" } : { kind: "summary", pointer: "studio" }
    ))
      console.log(line);
    console.log();
  } catch (error) {
    R.warn(`Lint did not finish: ${normalizeErrorMessage(error)}`);
  }
}
function previewLaunchMode(options) {
  if (options.background) return "background";
  if (!options.foreground && !options.interactive) return "background";
  if (options.devMode) return "dev";
  return options.localStudio ? "local" : "embedded";
}
function previewLaunchModeError(options) {
  if (options.background && options.foreground) {
    return "--background and --foreground cannot be used together";
  }
  const actionCount = [options.status, options.stop, options.list, options.killAll].filter(
    Boolean
  ).length;
  if (actionCount > 1) {
    return "Only one of --status, --stop, --list, or --kill-all can be used at a time";
  }
  if (actionCount > 0 && (options.background || options.foreground || options.forceNew)) {
    return "Preview launch overrides cannot be combined with lifecycle actions";
  }
  return null;
}
function previewPortError(port) {
  const value = port ?? "3002";
  if (!/^\d+$/.test(value)) return "--port must be an integer between 1 and 65535";
  const parsed = Number(value);
  return parsed >= 1 && parsed <= 65535 ? null : "--port must be an integer between 1 and 65535";
}
function publicPreviewPid(serverPid, fallbackPid) {
  const parsed = Number(serverPid);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallbackPid;
}
function reportPreviewFailure(json, operation, code, message) {
  if (json) writeLifecycleJson(lifecycleFailurePayload(operation, code, message));
  else R.error(message);
  setCommandExitCode(1);
}
async function handlePreviewList(startPort, json, dependencies = {}) {
  try {
    const [scannedServers, managedSessions] = await Promise.all([
      (dependencies.scan ?? scanActiveServers)(startPort),
      (dependencies.listManaged ?? listBackgroundPreviewStatuses)()
    ]);
    const managedKeys = new Set(
      managedSessions.map((session) => `${resolve2(session.projectDir)}\0${session.port}`)
    );
    const servers = [
      ...managedSessions.map((session) => ({
        port: session.port,
        host: "127.0.0.1",
        projectName: basename(session.projectDir),
        projectDir: session.projectDir,
        version: "managed",
        pid: String(session.pid)
      })),
      ...scannedServers.filter(
        (server) => !managedKeys.has(`${resolve2(server.projectDir)}\0${server.port}`)
      )
    ];
    if (json) {
      writeLifecycleJson(
        lifecyclePayload("list", {
          state: "listed",
          sessions: servers.map(
            (server) => previewLifecycleSession({
              state: "running",
              mode: server.version === "managed" ? "background" : "unknown",
              projectName: server.projectName,
              projectDir: server.projectDir,
              port: server.port,
              pid: server.pid ? Number(server.pid) : null,
              host: server.host
            })
          )
        })
      );
      return;
    }
    if (servers.length === 0) {
      console.log("\n  No active preview servers found.\n");
      return;
    }
    console.log(`
  ${c.bold("Active preview servers:")}
`);
    for (const server of servers) {
      const pid = server.pid ? c.dim(` (PID ${server.pid})`) : "";
      console.log(
        `  ${c.accent(`Port ${server.port}`)}  ${server.projectName}  ${c.dim(server.projectDir)}${pid}`
      );
    }
    console.log(`
  ${servers.length} server${servers.length === 1 ? "" : "s"} running.
`);
  } catch (error) {
    reportPreviewFailure(json, "list", "preview-list-failed", normalizeErrorMessage(error));
  }
}
async function handlePreviewKillAll(startPort, json, dependencies = {}) {
  try {
    const managedSessions = await (dependencies.listManaged ?? listBackgroundPreviewStatuses)();
    let killed = 0;
    const failures = [];
    for (const session of managedSessions) {
      try {
        if (await (dependencies.stopManaged ?? stopBackgroundPreview)(
          session.projectDir,
          session.port
        )) {
          killed++;
        }
      } catch (error) {
        failures.push(`${session.projectDir}: ${normalizeErrorMessage(error)}`);
      }
    }
    const swept = await (dependencies.killScanned ?? killActiveServers)(startPort);
    killed += swept.killed;
    const unverified = swept.unverified;
    if (json) {
      writeLifecycleJson(
        lifecyclePayload("kill-all", {
          state: "killed-all",
          stopped: killed,
          ...failures.length > 0 ? { failed: failures } : {},
          ...unverified.length > 0 ? { unverifiedPorts: unverified } : {}
        })
      );
    } else if (failures.length > 0 || unverified.length > 0) {
      console.log(`
  Killed ${killed} preview server${killed === 1 ? "" : "s"}.`);
      for (const failure of failures) R.warn(`Could not stop ${failure}`);
      if (unverified.length > 0) {
        const plural = unverified.length === 1 ? "" : "s";
        R.warn(
          `Left ${unverified.length} server${plural} alone (port${plural} ${unverified.join(", ")}): the OS could not confirm which process owns the socket, and the server's own claim is not proof. Install lsof, or stop it with its own preview --stop.`
        );
      }
      console.log();
    } else if (killed === 0) {
      console.log("\n  No active preview servers to kill.\n");
    } else {
      console.log(`
  Killed ${killed} preview server${killed === 1 ? "" : "s"}.
`);
    }
  } catch (error) {
    reportPreviewFailure(json, "kill-all", "preview-kill-all-failed", normalizeErrorMessage(error));
  }
}
function previewViteArgs(port) {
  return ["--host", "127.0.0.1", ...port === void 0 ? [] : ["--port", String(port)]];
}
function previewBaseUrl(port, host = "127.0.0.1") {
  return `http://${host}:${port}`;
}
function absolutePreviewUrl(port, path, host = "127.0.0.1") {
  if (/^https?:\/\//.test(path)) return path;
  return `${previewBaseUrl(port, host)}${path.startsWith("/") ? path : `/${path}`}`;
}
function hasExplicitPreviewPort(argv) {
  return argv.some((arg) => arg === "--port" || arg.startsWith("--port="));
}
function printSelectionFailure(code, message, json) {
  if (json) {
    console.log(JSON.stringify({ ok: false, error: { code, message } }, null, 2));
  } else {
    R.error(message);
  }
  setCommandExitCode(1);
}
function previewServerPayload(server) {
  return {
    port: server.port,
    projectName: server.projectName,
    projectDir: server.projectDir,
    url: previewBaseUrl(server.port, server.host)
  };
}
function parseContextFields(value) {
  if (value === void 0) return DEFAULT_CONTEXT_FIELDS;
  if (!value.trim()) throw new Error("--context-fields cannot be empty");
  const allowed = new Set(DEFAULT_CONTEXT_FIELDS);
  const fields = value.split(",").map((field) => field.trim()).filter(Boolean);
  const invalid = fields.filter((field) => !allowed.has(field));
  if (invalid.length > 0) {
    throw new Error(
      `Unknown context field${invalid.length === 1 ? "" : "s"}: ${invalid.join(", ")}`
    );
  }
  return [...new Set(fields)];
}
function contextIncludes(fields, field) {
  return fields.includes(field);
}
function addContextError(payload, field, error) {
  payload.errors = {
    ...payload.errors ?? {},
    [field]: error
  };
}
async function printCurrentSelection(projectDir, startPort, json, preferredPort) {
  const {
    AmbiguousPreviewServerError,
    PreviewServerPortMismatchError: PreviewServerPortMismatchError2,
    fetchStudioSelection,
    findPreviewServerForProject
  } = await import("./studioSelectionClient-IUUPKUHZ.js");
  let server;
  try {
    server = await findPreviewServerForProject(
      projectDir,
      startPort,
      void 0,
      void 0,
      preferredPort === void 0 ? void 0 : { preferredPort }
    );
  } catch (err) {
    if (err instanceof AmbiguousPreviewServerError) {
      printSelectionFailure("ambiguous-preview-server", err.message, json);
      return;
    }
    if (err instanceof PreviewServerPortMismatchError2) {
      printSelectionFailure(PREVIEW_PORT_MISMATCH_CODE, err.message, json);
      return;
    }
    throw err;
  }
  if (!server) {
    printSelectionFailure(
      "preview-not-running",
      "No running Studio preview found for this project. Start one with: npx hyperframes preview",
      json
    );
    return;
  }
  let response;
  try {
    response = await fetchStudioSelection(server);
  } catch (err) {
    printSelectionFailure("selection-unavailable", normalizeErrorMessage(err), json);
    return;
  }
  if (!response.selection) {
    printSelectionFailure(
      "no-selection",
      "Studio is running, but no element is selected. Select an element in Studio and rerun this command.",
      json
    );
    return;
  }
  const selection = {
    ...response.selection,
    thumbnailUrl: absolutePreviewUrl(server.port, response.selection.thumbnailUrl, server.host)
  };
  if (json) {
    console.log(
      JSON.stringify(
        {
          ok: true,
          server: previewServerPayload(server),
          selection,
          updatedAt: response.updatedAt
        },
        null,
        2
      )
    );
    return;
  }
  console.log(`${c.success("\u25C7")}  ${c.accent(selection.label)} selected in Studio`);
  console.log(`  ${c.dim("Source")}    ${selection.sourceFile}`);
  console.log(
    `  ${c.dim("Target")}    ${selection.target.hfId ?? selection.target.id ?? selection.target.selector ?? "(none)"}`
  );
  console.log(`  ${c.dim("Time")}      ${selection.currentTime.toFixed(3)}s`);
  console.log(`  ${c.dim("Thumbnail")} ${selection.thumbnailUrl}`);
  console.log();
  console.log(c.dim("Use --json for the full agent-readable selection payload."));
}
function countLintFindings(findings) {
  return {
    errors: findings.filter((finding) => finding.severity === "error").length,
    warnings: findings.filter((finding) => finding.severity === "warning").length
  };
}
async function printCurrentContext(projectDir, startPort, options) {
  let fields;
  try {
    fields = parseContextFields(options.fields);
  } catch (err) {
    printSelectionFailure("invalid-context-fields", normalizeErrorMessage(err), options.json);
    return;
  }
  const fullDetail = options.detail === "full";
  if (options.detail !== void 0 && !["compact", "full"].includes(options.detail)) {
    printSelectionFailure(
      "invalid-context-detail",
      "--context-detail must be compact or full",
      options.json
    );
    return;
  }
  const {
    AmbiguousPreviewServerError,
    PreviewServerPortMismatchError: PreviewServerPortMismatchError2,
    fetchStudioLint,
    fetchStudioSelection,
    findPreviewServerForProject
  } = await import("./studioSelectionClient-IUUPKUHZ.js");
  let server;
  try {
    server = await findPreviewServerForProject(
      projectDir,
      startPort,
      void 0,
      void 0,
      options.preferredPort === void 0 ? void 0 : { preferredPort: options.preferredPort }
    );
  } catch (err) {
    if (err instanceof AmbiguousPreviewServerError) {
      printSelectionFailure("ambiguous-preview-server", err.message, options.json);
      return;
    }
    if (err instanceof PreviewServerPortMismatchError2) {
      printSelectionFailure(PREVIEW_PORT_MISMATCH_CODE, err.message, options.json);
      return;
    }
    throw err;
  }
  if (!server) {
    printSelectionFailure(
      "preview-not-running",
      "No running Studio preview found for this project. Start one with: npx hyperframes preview",
      options.json
    );
    return;
  }
  const wantsSelection = contextIncludes(fields, "selection");
  const wantsLint = contextIncludes(fields, "lint");
  const [selectionResult, lintResult] = await Promise.allSettled([
    wantsSelection ? fetchStudioSelection(server) : Promise.resolve(null),
    wantsLint ? fetchStudioLint(server) : Promise.resolve(null)
  ]);
  const selection = selectionResult.status === "fulfilled" && selectionResult.value?.selection ? {
    ok: true,
    value: fullDetail ? {
      ...selectionResult.value.selection,
      thumbnailUrl: absolutePreviewUrl(
        server.port,
        selectionResult.value.selection.thumbnailUrl
      )
    } : compactSelectionPayload({
      ...selectionResult.value.selection,
      thumbnailUrl: absolutePreviewUrl(
        server.port,
        selectionResult.value.selection.thumbnailUrl
      )
    }),
    updatedAt: selectionResult.value.updatedAt
  } : {
    ok: false,
    error: selectionResult.status === "rejected" ? {
      code: "selection-unavailable",
      message: normalizeErrorMessage(selectionResult.reason)
    } : {
      code: "no-selection",
      message: "Studio is running, but no element is selected."
    }
  };
  const lint = lintResult.status === "fulfilled" && lintResult.value ? {
    ok: true,
    summary: countLintFindings(lintResult.value.findings),
    findings: lintResult.value.findings
  } : {
    ok: false,
    error: lintResult.status === "rejected" ? {
      code: "lint-unavailable",
      message: normalizeErrorMessage(lintResult.reason)
    } : {
      code: "lint-not-requested",
      message: "Lint was not requested."
    }
  };
  const payload = { ok: true };
  if (contextIncludes(fields, "server")) payload.server = previewServerPayload(server);
  if (contextIncludes(fields, "selection")) {
    payload.selection = selection.ok ? selection.value : null;
    payload.selectionUpdatedAt = selection.ok ? selection.updatedAt : null;
    if (!selection.ok) addContextError(payload, "selection", selection.error);
  }
  if (contextIncludes(fields, "lint")) payload.lint = lint;
  if (contextIncludes(fields, "capabilities")) {
    payload.capabilities = {
      selection: true,
      lint: true,
      frame: false,
      visibleElements: false,
      lastAction: false
    };
  }
  if (options.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  console.log(`${c.success("\u25C7")}  Studio context`);
  if (contextIncludes(fields, "server")) {
    console.log(`  ${c.dim("Project")}   ${server.projectName}`);
    console.log(`  ${c.dim("Studio")}    ${previewBaseUrl(server.port, server.host)}`);
  }
  if (contextIncludes(fields, "selection")) {
    if (selection.ok) {
      console.log(`  ${c.dim("Selection")} ${selection.value.label}`);
    } else {
      console.log(`  ${c.dim("Selection")} ${selection.error.message}`);
    }
  }
  if (contextIncludes(fields, "lint")) {
    if (lint.ok) {
      console.log(
        `  ${c.dim("Lint")}      ${lint.summary.errors} error(s), ${lint.summary.warnings} warning(s)`
      );
    } else {
      console.log(`  ${c.dim("Lint")}      ${lint.error.message}`);
    }
  }
  console.log();
  console.log(c.dim("Use --json for the full agent-readable context payload."));
}
function compactSelectionPayload(selection) {
  return {
    schemaVersion: selection.schemaVersion,
    projectId: selection.projectId,
    compositionPath: selection.compositionPath,
    sourceFile: selection.sourceFile,
    currentTime: selection.currentTime,
    target: selection.target,
    label: selection.label,
    tagName: selection.tagName,
    boundingBox: selection.boundingBox,
    textContent: selection.textContent,
    thumbnailUrl: selection.thumbnailUrl
  };
}
function studioDeepLink(url, projectName) {
  return `${url}/#project/${encodeURIComponent(projectName)}`;
}
function studioSummaryUrls(projectName, serverUrl) {
  return {
    serverUrl,
    studioUrl: studioDeepLink(serverUrl, projectName)
  };
}
function prebuildPreview(fetchApp, serverUrl, projectName) {
  const previewUrl = `${serverUrl}/api/projects/${encodeURIComponent(projectName)}/preview`;
  return Promise.resolve().then(() => fetchApp(new Request(previewUrl))).catch(() => void 0);
}
function foregroundPreviewReadyPayload(projectName, serverUrl, projectDir, pid) {
  const port = Number(new URL(serverUrl).port);
  return lifecyclePayload(
    "start",
    previewLifecycleSession({
      state: "started",
      mode: "foreground",
      projectName,
      projectDir,
      port,
      pid
    })
  );
}
function previewLifecycleSession(options) {
  const host = options.host ?? "127.0.0.1";
  const serverUrl = previewBaseUrl(options.port, host);
  return {
    state: options.state,
    mode: options.mode,
    projectName: options.projectName,
    projectDir: options.projectDir,
    host,
    port: options.port,
    pid: options.pid,
    serverUrl,
    studioUrl: studioDeepLink(serverUrl, options.projectName),
    ready: true,
    ...options.logPath ? { logPath: options.logPath } : {}
  };
}
function openStudioBrowser(url, projectName, options) {
  if (options?.noOpen) return;
  openBrowser(studioDeepLink(url, projectName), {
    browserPath: options?.browserPath,
    userDataDir: options?.userDataDir,
    remoteDebuggingPort: options?.remoteDebuggingPort,
    disableGpu: options?.browserNoGpu
  });
}
function printStudioSummary(projectName, serverUrl, projectDir, opts = {}) {
  const urls = studioSummaryUrls(projectName, serverUrl);
  console.log();
  console.log(`  ${c.dim("Project")}   ${c.accent(projectName)}`);
  console.log(`  ${c.dim("Studio")}    ${c.accent(urls.studioUrl)}`);
  console.log(`  ${c.dim("Server")}    ${c.accent(urls.serverUrl)}`);
  const hint = desktopHint(projectDir);
  if (hint) console.log(`  ${c.dim("Desktop")}   ${hint}`);
  console.log();
  for (const detail of opts.details ?? []) {
    console.log(`  ${c.dim(detail)}`);
  }
  if (opts.details?.length && opts.footer) console.log();
  if (opts.footer) console.log(`  ${c.dim(opts.footer)}`);
  console.log();
}
function linkProjectIntoStudioData(dir, projectsDir, projectName) {
  const symlinkPath = join2(projectsDir, projectName);
  mkdirSync2(projectsDir, { recursive: true });
  let createdSymlink = false;
  if (dir !== symlinkPath) {
    if (existsSync2(symlinkPath)) {
      try {
        const stat = lstatSync(symlinkPath);
        if (stat.isSymbolicLink() && resolve2(readlinkSync(symlinkPath)) !== resolve2(dir)) {
          unlinkSync(symlinkPath);
        }
      } catch {
      }
    }
    if (!existsSync2(symlinkPath)) {
      symlinkSync(dir, symlinkPath, process.platform === "win32" ? "junction" : "dir");
      createdSymlink = true;
    }
  }
  return { symlinkPath, createdSymlink };
}
function removeSymlinkOnExit(createdSymlink, symlinkPath) {
  if (!createdSymlink) return;
  process.on("exit", () => {
    try {
      if (existsSync2(symlinkPath)) unlinkSync(symlinkPath);
    } catch {
    }
  });
}
function waitForStudioChildClose(child, signalTarget = process) {
  const shutdown = () => {
    if (child.pid) killProcessTree(child.pid);
  };
  for (const signal of STUDIO_CHILD_SHUTDOWN_SIGNALS) signalTarget.once(signal, shutdown);
  const closed = child.exitCode !== null || child.signalCode !== null ? Promise.resolve() : new Promise((resolveClose) => {
    child.once("exit", () => resolveClose());
  });
  return closed.finally(() => {
    for (const signal of STUDIO_CHILD_SHUTDOWN_SIGNALS) signalTarget.off(signal, shutdown);
  });
}
function attachStudioReadyHandler(child, spinner, projectName, projectDir, options) {
  let detected = false;
  async function handleOutput(data) {
    const url = studioReadyUrl(data.toString());
    if (!url || detected) return;
    detected = true;
    if (options?.json) {
      const port = Number(new URL(url).port);
      const server = await activeServerOnPort(port);
      writeLifecycleJson(
        foregroundPreviewReadyPayload(
          projectName,
          url,
          projectDir,
          publicPreviewPid(server?.pid, child.pid ?? null)
        )
      );
    } else {
      spinner.stop(c.success("Studio running"));
      printStudioSummary(projectName, url, projectDir, {
        footer: "Press Ctrl+C to stop"
      });
    }
    openStudioBrowser(url, projectName, options);
    child.stdout.removeListener("data", handleOutput);
    child.stderr.removeListener("data", handleOutput);
  }
  child.stdout.on("data", (data) => void handleOutput(data));
  child.stderr.on("data", (data) => void handleOutput(data));
  child.on("error", (err) => {
    if (options?.json) {
      reportPreviewFailure(true, "start", "preview-start-failed", err.message);
    } else {
      spinner.stop(c.error("Failed to start studio"));
      console.error(c.dim(err.message));
    }
  });
}
function studioReadyUrl(output) {
  const localLine = output.split(/\r?\n/).find((line) => line.includes("Local:"));
  return localLine?.match(/https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):\d+/)?.[0] ?? null;
}
function reportPreviewShutdown(json) {
  if (json) return;
  console.log();
  console.log(`  ${c.dim("Shutting down studio...")}`);
}
async function runDevMode(dir, options) {
  const thisFile = fileURLToPath(import.meta.url);
  const repoRoot = resolve2(dirname2(thisFile), "..", "..", "..", "..");
  const projectsDir = join2(repoRoot, "packages", "studio", "data", "projects");
  const pName = options?.projectName ?? basename(dir);
  const { symlinkPath, createdSymlink } = linkProjectIntoStudioData(dir, projectsDir, pName);
  if (!options?.json) ge(c.bold("hyperframes preview"));
  const s = ft();
  if (!options?.json) s.start("Starting studio...");
  const studioPkgDir = join2(repoRoot, "packages", "studio");
  const child = spawn("bun", ["run", "dev", "--", ...previewViteArgs(options?.port)], {
    cwd: studioPkgDir,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
    env: studioProxyEnv(options?.autoProxy ?? true, process.env, {
      projectDir: dir,
      projectName: pName,
      browserGpuMode: options?.browserGpuMode
    })
  });
  attachStudioReadyHandler(child, s, pName, dir, options);
  removeSymlinkOnExit(createdSymlink, symlinkPath);
  return waitForStudioChildClose(child);
}
function hasLocalStudio(dir) {
  try {
    const req = createRequire(join2(dir, "package.json"));
    const studioPkgPath = dirname2(req.resolve("@hyperframes/studio/package.json"));
    return existsSync2(join2(studioPkgPath, "vite.config.ts"));
  } catch {
    return false;
  }
}
async function runLocalStudioMode(dir, options) {
  const req = createRequire(join2(dir, "package.json"));
  const studioPkgPath = dirname2(req.resolve("@hyperframes/studio/package.json"));
  const pName = options?.projectName ?? basename(dir);
  const projectsDir = join2(studioPkgPath, "data", "projects");
  const { symlinkPath, createdSymlink } = linkProjectIntoStudioData(dir, projectsDir, pName);
  if (!options?.json) ge(c.bold("hyperframes preview") + c.dim(" (local studio)"));
  const s = ft();
  if (!options?.json) s.start("Starting studio...");
  const viteCommand = buildNpxCommand(["vite", ...previewViteArgs(options?.port)]);
  const child = spawn(viteCommand.command, viteCommand.args, {
    cwd: studioPkgPath,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
    env: studioProxyEnv(options?.autoProxy ?? true, process.env, {
      projectDir: dir,
      projectName: pName,
      browserGpuMode: options?.browserGpuMode
    })
  });
  attachStudioReadyHandler(child, s, pName, dir, options);
  removeSymlinkOnExit(createdSymlink, symlinkPath);
  return waitForStudioChildClose(child);
}
async function runEmbeddedMode(dir, startPort, options) {
  const { createStudioServer, loadPreviewServerBuildSignature, resolveStudioBundle } = await import("./studioServer-LSLPBZ7L.js");
  const pName = options?.projectName ?? basename(dir);
  const studioBundle = resolveStudioBundle();
  if (!options?.json) ge(c.bold("hyperframes preview"));
  const s = ft();
  if (!options?.json) s.start("Starting studio...");
  if (!studioBundle.available) {
    if (options?.json) {
      reportPreviewFailure(true, "start", "preview-start-failed", "Studio build missing");
    } else {
      s.stop(c.error("Studio build missing"));
      console.error();
      console.error(`  ${c.dim("Could not find")} ${c.accent("index.html")} ${c.dim("in:")}`);
      for (const checkedPath of studioBundle.checkedPaths) {
        console.error(`  ${c.dim("-")} ${checkedPath}`);
      }
      console.error();
      console.error(`  ${c.dim("Rebuild the CLI package with")} ${c.accent("bun run build")}`);
      console.error();
    }
    setCommandExitCode(1);
    return;
  }
  const serverBuildSignature = await loadPreviewServerBuildSignature();
  const {
    app,
    watcher,
    shutdown: shutdownStudio
  } = createStudioServer({
    projectDir: dir,
    projectName: pName,
    autoProxy: options?.autoProxy,
    browserGpuMode: options?.browserGpuMode
  });
  let result;
  try {
    result = await findPortAndServe(
      app.fetch,
      startPort,
      dir,
      !!options?.forceNew,
      serverBuildSignature,
      void 0,
      options?.browserGpuMode
    );
  } catch (err) {
    watcher.close();
    reportPreviewFailure(
      Boolean(options?.json),
      "start",
      "preview-start-failed",
      err.message
    );
    return;
  }
  if (result.type === "already-running") {
    watcher.close();
    const url2 = `http://localhost:${result.port}`;
    if (options?.json) {
      const server = await activeServerOnPort(result.port);
      writeLifecycleJson(
        lifecyclePayload(
          "start",
          previewLifecycleSession({
            state: "reused",
            mode: "foreground",
            projectName: pName,
            projectDir: dir,
            port: result.port,
            pid: publicPreviewPid(server?.pid, null)
          })
        )
      );
    } else {
      s.stop(c.success("Already running"));
      printStudioSummary(pName, url2, dir, {
        details: ["Reusing existing server. Use --force-new to start a fresh instance."]
      });
    }
    openStudioBrowser(url2, pName, options);
    return;
  }
  const url = `http://localhost:${result.port}`;
  if (options?.json) {
    writeLifecycleJson(foregroundPreviewReadyPayload(pName, url, dir, process.pid));
  } else {
    s.stop(c.success("Studio running"));
    console.log();
    if (result.port !== startPort) {
      console.log(`  ${c.warn(`Port ${startPort} is in use, using ${result.port} instead`)}`);
      console.log();
    }
    printStudioSummary(pName, url, dir, {
      details: [
        "Edit with your AI agent \u2014 it has HyperFrames skills installed.",
        "Changes reload automatically in the studio."
      ],
      footer: "Press Ctrl+C to stop"
    });
  }
  openStudioBrowser(url, pName, options);
  void prebuildPreview(app.fetch, url, pName);
  let rl;
  if (process.platform === "win32") {
    const readline = await import("readline");
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.on("SIGINT", () => {
      process.emit("SIGINT", "SIGINT");
    });
  }
  return new Promise((resolveRun) => {
    let shuttingDown = false;
    const shutdown = () => {
      if (shuttingDown) return;
      shuttingDown = true;
      rl?.close();
      reportPreviewShutdown(Boolean(options?.json));
      setTimeout(() => requestCliExit(0), 3e3).unref();
      shutdownStudio().catch(() => {
      }).finally(() => {
        watcher.close();
        result.server.close(() => resolveRun());
      });
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    import("./src-2CXRYIST.js").then(({ killTrackedProcesses }) => {
      process.once("exit", () => {
        if (!shuttingDown) killTrackedProcesses();
      });
    }).catch(() => {
    });
  });
}
export {
  backgroundStartFailureCode,
  preview_default as default,
  examples,
  foregroundPreviewReadyPayload,
  handlePreviewKillAll,
  handlePreviewList,
  prebuildPreview,
  previewLaunchMode,
  previewLaunchModeError,
  previewPortError,
  previewViteArgs,
  publicPreviewPid,
  reportPreviewShutdown,
  runDevMode,
  runLocalStudioMode,
  studioDeepLink,
  studioReadyUrl,
  studioSummaryUrls,
  waitForStudioChildClose
};
