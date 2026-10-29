import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  addCatchUpNote,
  markSeen,
  readSeen,
  writeRecord
} from "./chunk-GX6TLRYJ.js";

// src/utils/desktopApp.ts
import { spawn, spawnSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { basename, isAbsolute, join, relative, win32 } from "path";
var DESKTOP_BUNDLE_IDS = ["dev.hyperframes.desktop", "dev.hyperframes.desktop.canary"];
var DESKTOP_APP_NAMES = ["HyperFrames.app", "HyperFrames Canary.app"];
var APP_NAMES = ["HyperFrames", "HyperFrames Canary"];
var STUDIO_PAGE = "https://hyperframes.dev/studio";
var DOWNLOADS = {
  darwin: `${STUDIO_PAGE}/download`,
  linux: `${STUDIO_PAGE}/download?os=linux`
};
var desktopDownloadUrl = (platform = process.platform) => DOWNLOADS[platform] ?? null;
var downloadHint = (url) => `Keep editing by chatting with Framey in the HyperFrames desktop app \u2192 ${url}`;
var HANDOFF_READY = process.platform === "darwin";
var AGENT_HANDOFF_FILE = join(".hyperframes", "agent-handoff.json");
function agentSession(env = process.env) {
  if (env.CLAUDE_CODE_SESSION_ID)
    return { engine: "claude", sessionId: env.CLAUDE_CODE_SESSION_ID };
  if (env.CODEX_THREAD_ID) return { engine: "codex", sessionId: env.CODEX_THREAD_ID };
  if (env.GROK_SESSION_ID) return { engine: "grok", sessionId: env.GROK_SESSION_ID };
  return null;
}
var openWithBundle = (bundleId, dir) => spawnSync("open", ["-b", bundleId, dir], { stdio: "ignore" }).status === 0;
function launchApp(executable, dir) {
  try {
    const child = spawn(executable, [dir], { detached: true, stdio: "ignore" });
    child.on("error", () => {
    });
    child.unref();
    return true;
  } catch {
    return false;
  }
}
var readText = (path) => {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
};
function launcherAppImage(text) {
  try {
    const launcher = JSON.parse(text ?? "null");
    return typeof launcher === "object" && launcher !== null && "appImage" in launcher && typeof launcher.appImage === "string" ? launcher.appImage : null;
  } catch {
    return null;
  }
}
function desktopApps({
  platform = process.platform,
  env = process.env,
  home = homedir(),
  exists = existsSync,
  read = readText
} = {}) {
  if (platform !== "win32" && platform !== "linux") return null;
  const config = env.XDG_CONFIG_HOME || join(home, ".config");
  const where = (name) => {
    if (platform === "win32")
      return env.LOCALAPPDATA ? win32.join(env.LOCALAPPDATA, "Programs", name, `${name}.exe`) : null;
    const appImage = launcherAppImage(read(join(config, name, "launcher.json")));
    return appImage && isAbsolute(appImage) ? appImage : null;
  };
  return APP_NAMES.flatMap((name, i) => {
    const executable = where(name);
    return executable && exists(executable) ? [{ executable, canary: i === 1 }] : [];
  });
}
function leaveHandoff(dir, session) {
  if (!session || !writeRecord(dir, "agent-handoff.json", JSON.stringify(session))) return null;
  const now = Date.now();
  if (!readSeen(dir).at && !markSeen(dir, { at: now, checked: now }))
    console.warn("\u25C7  Couldn't note the hand-off in ~/.hyperframes, so `catch-up` won't see it.");
  addCatchUpNote(dir);
  return session;
}
function openInDesktop(dir, {
  ready = HANDOFF_READY,
  platform = process.platform,
  open = openWithBundle,
  launch = launchApp,
  installed = () => desktopInstalled({ platform }),
  env = process.env,
  ...where
} = {}) {
  const notOpened = (reason) => ({
    opened: false,
    reason,
    downloadUrl: desktopDownloadUrl(platform) ?? STUDIO_PAGE
  });
  const opened = (canary) => ({
    opened: true,
    app: canary ? "HyperFrames Canary" : "the HyperFrames desktop app",
    handedOver: leaveHandoff(dir, agentSession(env))
  });
  if (!ready) return notOpened("handoff-unavailable");
  if (platform === "darwin") {
    const bundleId = DESKTOP_BUNDLE_IDS.find((id) => open(id, dir));
    if (!bundleId) return notOpened(installed() ? "open-failed" : "not-installed");
    return opened(bundleId.endsWith(".canary"));
  }
  const apps = desktopApps({ platform, env, ...where });
  if (!apps) return notOpened("unsupported-platform");
  if (!apps.length) return notOpened("not-installed");
  const app = apps.find(({ executable }) => launch(executable, dir));
  return app ? opened(app.canary) : notOpened("open-failed");
}
function openCommandFor(dir, cwd = process.cwd()) {
  const shown = relative(cwd, dir) || ".";
  return `hyperframes open ${/\s/.test(shown) ? JSON.stringify(shown) : shown}`;
}
var spotlightFinds = (bundleId) => spawnSync("mdfind", [`kMDItemCFBundleIdentifier == '${bundleId}'`], { encoding: "utf8" }).stdout?.split("\n").some((path) => path.endsWith(".app") && !basename(path).startsWith(".")) ?? false;
function desktopInstalled({
  spotlight = spotlightFinds,
  ...where
} = {}) {
  const { platform = process.platform, home = homedir(), exists = existsSync } = where;
  if (platform !== "darwin") return (desktopApps(where)?.length ?? 0) > 0;
  const folders = ["/Applications", join(home, "Applications")];
  if (folders.some((folder) => DESKTOP_APP_NAMES.some((name) => exists(join(folder, name)))))
    return true;
  return DESKTOP_BUNDLE_IDS.some(spotlight);
}
function desktopHint(dir, {
  env = process.env,
  ready = HANDOFF_READY,
  installed,
  platform = process.platform
} = {}) {
  if (env.HYPERFRAMES_DESKTOP_PROJECT) return null;
  if (ready && (installed ?? desktopInstalled({ platform, env })))
    return `Keep editing by chatting with Framey in the desktop app: ${openCommandFor(dir)}`;
  const url = desktopDownloadUrl(platform);
  return url ? downloadHint(url) : null;
}

export {
  downloadHint,
  openInDesktop,
  desktopHint
};
