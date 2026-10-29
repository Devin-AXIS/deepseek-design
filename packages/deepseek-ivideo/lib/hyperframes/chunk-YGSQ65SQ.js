import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  STUDIO_MANUAL_EDITS_PATH
} from "./chunk-H6T6FXDE.js";
import {
  realpath,
  resolveWithinProject
} from "./chunk-2Z55WR76.js";

// ../studio-server/src/helpers/studioMotionRenderScript.ts
var STUDIO_MOTION_PATH = ".hyperframes/studio-motion.json";
function hasStudioMotionEntries(manifestContent) {
  try {
    const parsed = JSON.parse(manifestContent);
    return Array.isArray(parsed.motions) && parsed.motions.length > 0;
  } catch {
    return false;
  }
}
function createStudioMotionRenderBodyScript(manifestContent, options = {}) {
  if (!manifestContent.trim() || !hasStudioMotionEntries(manifestContent)) return null;
  return `(${studioMotionRenderRuntime.toString()})(${JSON.stringify(manifestContent)}, ${JSON.stringify(options.activeCompositionPath ?? null)});`;
}
function studioMotionRenderRuntime(manifestContent, activeCompositionPath) {
  const STUDIO_MOTION_TIMELINE_ID = "studio-motion";
  const STUDIO_MOTION_ATTR = "data-hf-studio-motion";
  const ORIGINAL_TRANSFORM_ATTR = "data-hf-studio-motion-original-transform";
  const ORIGINAL_OPACITY_ATTR = "data-hf-studio-motion-original-opacity";
  const ORIGINAL_VISIBILITY_ATTR = "data-hf-studio-motion-original-visibility";
  const objectRecord = (value) => value && typeof value === "object" ? value : null;
  const finiteNumber = (value) => typeof value === "number" && Number.isFinite(value) ? value : null;
  const runtimeWindow = window;
  const parseMotionValues = (value) => {
    const record = objectRecord(value);
    if (!record) return null;
    const parsed = {};
    for (const key of ["x", "y", "scale", "rotation", "opacity", "autoAlpha"]) {
      const next = finiteNumber(record[key]);
      if (next != null) parsed[key] = next;
    }
    return Object.keys(parsed).length > 0 ? parsed : null;
  };
  const parseCustomEase = (value) => {
    const record = objectRecord(value);
    if (!record) return null;
    const id = typeof record.id === "string" ? record.id.trim() : "";
    const data = typeof record.data === "string" ? record.data.trim() : "";
    if (!id || !data) return null;
    return { id, data };
  };
  const parsedManifest = (() => {
    try {
      return objectRecord(JSON.parse(manifestContent));
    } catch {
      return null;
    }
  })();
  const manifestMotions = Array.isArray(parsedManifest?.motions) ? parsedManifest.motions : [];
  const sourceFileForElement = (element) => {
    let current = element;
    while (current) {
      const sourceFile = current.getAttribute("data-composition-file") ?? current.getAttribute("data-composition-src");
      if (sourceFile) return sourceFile;
      current = current.parentElement;
    }
    return activeCompositionPath ?? "index.html";
  };
  const elementMatchesSourceFile = (element, sourceFile) => sourceFileForElement(element) === sourceFile;
  const isHTMLElement = (element) => element instanceof HTMLElement;
  const querySelectorCandidates = (selector) => {
    const className = selector.match(/^\.([A-Za-z0-9_-]+)$/)?.[1];
    if (className) {
      return Array.from(document.getElementsByTagName("*")).filter(
        (element) => isHTMLElement(element) && element.classList.contains(className)
      );
    }
    if (/^[A-Za-z][A-Za-z0-9-]*$/.test(selector)) {
      return Array.from(document.getElementsByTagName(selector)).filter(isHTMLElement);
    }
    return Array.from(document.querySelectorAll(selector)).filter(isHTMLElement);
  };
  const resolveTarget = (targetRecord) => {
    const sourceFile = typeof targetRecord.sourceFile === "string" ? targetRecord.sourceFile : "";
    if (!sourceFile) return null;
    const id = typeof targetRecord.id === "string" ? targetRecord.id : "";
    if (id) {
      const byId = document.getElementById(id);
      if (isHTMLElement(byId) && elementMatchesSourceFile(byId, sourceFile)) return byId;
    }
    const selector = typeof targetRecord.selector === "string" ? targetRecord.selector : "";
    if (!selector) return null;
    try {
      const selectorIndex = Math.max(0, Math.floor(finiteNumber(targetRecord.selectorIndex) ?? 0));
      return querySelectorCandidates(selector).filter(
        (element) => elementMatchesSourceFile(element, sourceFile)
      )[selectorIndex] ?? null;
    } catch {
      return null;
    }
  };
  const restoreElement = (element) => {
    runtimeWindow.gsap?.set?.(element, { clearProps: "transform,opacity,visibility" });
    element.style.transform = element.getAttribute(ORIGINAL_TRANSFORM_ATTR) ?? "";
    element.style.opacity = element.getAttribute(ORIGINAL_OPACITY_ATTR) ?? "";
    element.style.visibility = element.getAttribute(ORIGINAL_VISIBILITY_ATTR) ?? "";
    element.removeAttribute(STUDIO_MOTION_ATTR);
    element.removeAttribute(ORIGINAL_TRANSFORM_ATTR);
    element.removeAttribute(ORIGINAL_OPACITY_ATTR);
    element.removeAttribute(ORIGINAL_VISIBILITY_ATTR);
  };
  const restoreStudioMotionElements = () => {
    for (const element of Array.from(document.querySelectorAll(`[${STUDIO_MOTION_ATTR}]`))) {
      if (isHTMLElement(element)) restoreElement(element);
    }
  };
  const readCurrentTime = () => {
    try {
      const playerTime = runtimeWindow.__player?.getTime?.();
      if (typeof playerTime === "number" && Number.isFinite(playerTime)) {
        return Math.max(0, playerTime);
      }
    } catch {
    }
    try {
      const timelineTime = runtimeWindow.__timeline?.time?.();
      if (typeof timelineTime === "number" && Number.isFinite(timelineTime)) {
        return Math.max(0, timelineTime);
      }
    } catch {
    }
    return 0;
  };
  const resolveEase = (motion) => {
    const fallback = typeof motion.ease === "string" && motion.ease.trim() ? motion.ease.trim() : "none";
    const customEase = parseCustomEase(motion.customEase);
    const customEasePlugin = runtimeWindow.CustomEase;
    if (!customEase || typeof customEasePlugin?.create !== "function") return fallback;
    try {
      runtimeWindow.gsap?.registerPlugin?.(customEasePlugin);
      customEasePlugin.create(customEase.id, customEase.data);
      return customEase.id;
    } catch {
      return fallback;
    }
  };
  const applyManifest = () => {
    runtimeWindow.__timelines = runtimeWindow.__timelines ?? {};
    runtimeWindow.__timelines[STUDIO_MOTION_TIMELINE_ID]?.kill?.();
    delete runtimeWindow.__timelines[STUDIO_MOTION_TIMELINE_ID];
    restoreStudioMotionElements();
    const gsap = runtimeWindow.gsap;
    if (!gsap?.timeline || manifestMotions.length === 0) return 0;
    const timeline = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
    let applied = 0;
    for (const motionValue of manifestMotions) {
      const motion = objectRecord(motionValue);
      if (!motion || motion.kind !== "gsap-motion") continue;
      const targetRecord = objectRecord(motion.target);
      if (!targetRecord) continue;
      const target = resolveTarget(targetRecord);
      if (!target || typeof timeline.fromTo !== "function") continue;
      const start = finiteNumber(motion.start);
      const duration = finiteNumber(motion.duration);
      if (start == null || duration == null || start < 0 || duration <= 0) continue;
      const from = parseMotionValues(motion.from);
      const to = parseMotionValues(motion.to);
      if (!from || !to) continue;
      if (!target.hasAttribute(STUDIO_MOTION_ATTR)) {
        target.setAttribute(ORIGINAL_TRANSFORM_ATTR, target.style.transform);
        target.setAttribute(ORIGINAL_OPACITY_ATTR, target.style.opacity);
        target.setAttribute(ORIGINAL_VISIBILITY_ATTR, target.style.visibility);
      }
      target.setAttribute(STUDIO_MOTION_ATTR, "true");
      timeline.fromTo(
        target,
        from,
        { ...to, duration, ease: resolveEase(motion), overwrite: "auto", immediateRender: false },
        start
      );
      applied += 1;
    }
    if (applied === 0) {
      timeline.kill?.();
      return 0;
    }
    runtimeWindow.__timelines[STUDIO_MOTION_TIMELINE_ID] = timeline;
    timeline.pause?.();
    const currentTime = readCurrentTime();
    if (typeof timeline.totalTime === "function") timeline.totalTime(currentTime, false);
    else timeline.time?.(currentTime);
    return applied;
  };
  runtimeWindow.__hfStudioMotionApply = applyManifest;
  applyManifest();
}

// ../studio-server/src/helpers/safePath.ts
import { basename, dirname, isAbsolute, join, relative, sep } from "path";
import { readdirSync } from "fs";
function resolveWithinProject2(base, relativePath) {
  const resolved = resolveWithinProject(base, relativePath);
  return resolved && !isPrivateProjectFile(base, resolved) ? resolved : null;
}
function realFilePath(filePath) {
  try {
    return realpath(filePath);
  } catch {
    const dir = dirname(filePath);
    return dir === filePath ? filePath : join(realFilePath(dir), basename(filePath));
  }
}
var STUDIO_FILES = /* @__PURE__ */ new Set([STUDIO_MOTION_PATH, STUDIO_MANUAL_EDITS_PATH]);
var STUDIO_FOLDERS = [".hyperframes/prepared-assets", ".hyperframes/requests"];
function isPrivateProjectPath(relPath) {
  const path = relPath.toLowerCase();
  return (path === ".hyperframes" || path.startsWith(".hyperframes/")) && !STUDIO_FILES.has(path) && !STUDIO_FOLDERS.some((folder) => path === folder || path.startsWith(`${folder}/`));
}
function isPrivateProjectFile(projectDir, filePath) {
  const rel = (from, to) => relative(from, to).split(sep).join("/");
  return [rel(projectDir, filePath), rel(realFilePath(projectDir), realFilePath(filePath))].some(
    isPrivateProjectPath
  );
}
function pinWithinProject(base, relativePath) {
  const checked = resolveWithinProject2(base, relativePath);
  if (!checked) return null;
  const inside = relative(realFilePath(base), realFilePath(checked));
  const escapes = inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside);
  return escapes ? null : join(base, inside);
}
var IGNORE_DIRS = /* @__PURE__ */ new Set([
  ".thumbnails",
  ".transcode-cache",
  ".waveform-cache",
  "node_modules",
  ".git"
]);
function shouldIgnoreDir(rel) {
  return rel === ".hyperframes/backup";
}
function isInHiddenOrVendorDir(relPath) {
  const segments = relPath.split("/");
  return segments.slice(0, -1).some((seg) => seg.startsWith(".") || seg === "node_modules");
}
var UNREADABLE_DIR_CODES = /* @__PURE__ */ new Set(["EACCES", "EPERM", "ENOENT", "ENOTDIR"]);
function walkDir(dir, prefix = "") {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    const code = err.code;
    if (!prefix || !code || !UNREADABLE_DIR_CODES.has(code)) throw err;
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (IGNORE_DIRS.has(entry.name) || shouldIgnoreDir(rel)) continue;
    if (entry.isDirectory()) {
      files.push(...walkDir(join(dir, entry.name), rel));
    } else {
      files.push(rel);
    }
  }
  return files;
}

export {
  STUDIO_MOTION_PATH,
  createStudioMotionRenderBodyScript,
  resolveWithinProject2 as resolveWithinProject,
  realFilePath,
  isPrivateProjectPath,
  isPrivateProjectFile,
  pinWithinProject,
  isInHiddenOrVendorDir,
  walkDir
};
