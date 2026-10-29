import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  MEDIA_LINK_ATTR,
  dedupeClonedCompositionId,
  findTargetElement,
  isHTMLElement,
  nextUniqueId,
  parseSourceDocument,
  patchElementInHtml,
  probeElementInSource,
  probeElementsInSource,
  relinkSplitHalves,
  relinkSplitHalvesInHtml,
  removeElementFromHtml,
  removeElementsFromHtml,
  splitElementInHtml,
  unwrapElementsFromHtml,
  wrapElementsInHtml
} from "./chunk-R2DYALSM.js";
import {
  MAX_WINDOW_IDLE_MS,
  STUDIO_SIGNATURE_MANIFEST_PATHS,
  UNDO_MODES,
  clearFileWriteReceipt,
  createProjectSignature,
  createWriteToken,
  fileContentVersion,
  recordFileWriteReceipt,
  resolveProjectAndSignature,
  resolveProjectSignature,
  settledFileTag
} from "./chunk-7QNZFNEX.js";
import {
  DEFAULT_TARGET_LUFS,
  absoluteLoudnessPlan,
  measureAudio,
  requiredFfmpeg,
  resolveLocalAudioPath
} from "./chunk-FWHMCXES.js";
import {
  PROXY_PARAMS_VERSION,
  PROXY_PENDING_RETRY_AFTER_SECONDS,
  PROXY_VARIANT_CONFIG,
  ProxyCapacityError,
  ProxyTranscodeError,
  ProxyWaitTimeoutError,
  createMediaCodecProbeCache,
  decideMediaProxyEligibility,
  isProxyVariantRequest,
  probeAssetCodec,
  probeMediaMetadata,
  proxyActivityMark,
  proxyVariantFor,
  recordProxyPrewarm,
  recordProxyRequest,
  resolveProxy,
  resolveProxyVariantRequest,
  scanProjectMediaCodecMap,
  shouldPrewarmProxy,
  waitForProxy
} from "./chunk-PVPXIJ5Z.js";
import {
  STUDIO_MOTION_PATH,
  createStudioMotionRenderBodyScript,
  isInHiddenOrVendorDir,
  isPrivateProjectFile,
  isPrivateProjectPath,
  pinWithinProject,
  realFilePath,
  resolveWithinProject,
  walkDir
} from "./chunk-YGSQ65SQ.js";
import {
  atomicTempPath,
  createFileAtomically,
  replaceFileAtomically
} from "./chunk-6LTRBXKR.js";
import {
  findTimelineScript,
  parseGsapScriptAcorn
} from "./chunk-OLJM7Q7L.js";
import {
  gsapCdnDist,
  motionPathPluginUrl
} from "./chunk-MX7ESQNX.js";
import {
  STUDIO_MANUAL_EDITS_PATH
} from "./chunk-H6T6FXDE.js";
import {
  SYSTEM_FONT_SIZE_LIMIT,
  collectFontFileEntries,
  fontDirectories,
  getSystemProfilerFamilies,
  locateSystemFont
} from "./chunk-TJSTGSAW.js";
import {
  AFTER_FONTS_SCRIPT_TYPE,
  RUNTIME_BOOTSTRAP_ATTR,
  addScenePartsManifest,
  deferScriptsUntilFonts,
  findStartTags,
  hasCompositionOutsideTemplates,
  injectTagsAtHeadStart,
  insertBeforeCloseTag,
  insertRuntimeTag,
  isFullHtmlDocument,
  resolveRateSpec,
  sourceTimeAt,
  stripEmbeddedRuntimeScripts
} from "./chunk-7QZSGMGW.js";
import {
  ensureHfIds
} from "./chunk-A4KQZXZI.js";
import {
  folderGone,
  isProjectRootMissing,
  isSafePath,
  mkdirWithinProject,
  realpath
} from "./chunk-2Z55WR76.js";
import {
  ProjectRootMissingError,
  formatRenderOutputTimestamp,
  parseFps,
  structuredMotionSelector
} from "./chunk-SIG2LUMK.js";
import {
  MagicString,
  VALID_CANVAS_RESOLUTIONS,
  resolveResolutionFlagPair,
  unrollComputedTimeline
} from "./chunk-AR25A7XZ.js";
import {
  isWithinProjectRoot,
  readProjectFile
} from "./chunk-JFKL3WAE.js";
import {
  readMediaOffsetSeconds,
  rewriteAssetPaths,
  rewriteCssAssetUrls,
  rewriteInlineStyleAssetUrls
} from "./chunk-TQFG7HTI.js";
import {
  parseHTML
} from "./chunk-GK4AIFIH.js";
import {
  ancestor,
  full,
  parse,
  simple
} from "./chunk-KRDUCZRT.js";
import {
  FFPROBE_PATH_ENV,
  findFfBinary
} from "./chunk-PJ3HDUCY.js";

// ../studio-server/src/helpers/hfIdPersist.ts
import { createHash } from "crypto";
import { closeSync, constants, fstatSync, openSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var isCompositionSource = (html) => /data-composition-id\s*=/.test(html);
var STAMP_RECORD = join(".hyperframes", "hf-ids-stamped.json");
var contentHash = (text3) => createHash("sha1").update(text3).digest("base64url");
function stampProjectHfIds(projectDir) {
  const recordPath = join(projectDir, STAMP_RECORD);
  let last = {};
  try {
    last = JSON.parse(readFileSync(recordPath, "utf-8"));
  } catch {
  }
  const next = {};
  for (const file of walkDir(projectDir)) {
    if (!file.endsWith(".html") || isInHiddenOrVendorDir(file)) continue;
    const absPath = join(projectDir, file);
    let html;
    try {
      html = readFileSync(absPath, "utf-8");
    } catch {
      continue;
    }
    let hash = contentHash(html);
    if (last[file] !== hash && isCompositionSource(html)) {
      const stamped = stampFileHfIds(absPath);
      if (stamped === null) continue;
      hash = contentHash(stamped);
    }
    next[file] = hash;
  }
  try {
    mkdirWithinProject(projectDir, dirname(recordPath));
    writeFileSync(recordPath, JSON.stringify(next));
  } catch {
  }
}
function openNoFollow(filePath, flags) {
  const noFollow = constants.O_NOFOLLOW ?? 0;
  try {
    return openSync(filePath, flags | noFollow);
  } catch {
    return null;
  }
}
function isUnchanged(filePath, expected) {
  const fd = openNoFollow(filePath, constants.O_RDONLY);
  if (fd === null) return false;
  try {
    return readFileSync(fd, "utf-8") === expected;
  } finally {
    closeSync(fd);
  }
}
function stampFileHfIds(filePath) {
  let fd = openNoFollow(filePath, constants.O_RDWR);
  let writable = true;
  if (fd === null) {
    fd = openNoFollow(filePath, constants.O_RDONLY);
    writable = false;
  }
  if (fd === null) return null;
  try {
    if (!fstatSync(fd).isFile()) return null;
    const html = readFileSync(fd, "utf-8");
    const normalized = ensureHfIds(html);
    const idsBefore = (html.match(/\bdata-hf-id=/g) ?? []).length;
    const idsAfter = (normalized.match(/\bdata-hf-id=/g) ?? []).length;
    if (writable && idsAfter > idsBefore) {
      const mode = fstatSync(fd).mode;
      closeSync(fd);
      fd = null;
      if (isUnchanged(filePath, html)) replaceFileAtomically(filePath, normalized, mode);
    }
    return normalized;
  } catch (err) {
    console.warn("[hyperframes] stampFileHfIds: failed to stamp ids:", err);
    return null;
  } finally {
    if (fd !== null) closeSync(fd);
  }
}

// ../studio-server/src/helpers/mime.ts
var MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".m4v": "video/mp4",
  ".mov": "video/quicktime",
  ".mkv": "video/x-matroska",
  ".mxf": "video/mxf",
  ".mts": "video/mp2t",
  ".m2ts": "video/mp2t",
  ".ts": "video/mp2t",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".flac": "audio/flac",
  ".opus": "audio/ogg",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".cube": "text/plain; charset=utf-8"
};
function getMimeType(path) {
  const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}
function isAudioFile(name) {
  return (getMimeType(name) ?? "").startsWith("audio/");
}

// ../studio-server/src/helpers/subComposition.ts
import { existsSync, readFileSync as readFileSync2 } from "fs";
import { join as join2 } from "path";
function rewriteRelativePaths(root, compPath, projectDir) {
  const assetExists = (path) => existsSync(join2(projectDir, path));
  rewriteAssetPaths(
    root.querySelectorAll("[src], [href]"),
    compPath,
    (el, attr) => el.getAttribute(attr),
    (el, attr, value) => el.setAttribute(attr, value),
    assetExists
  );
  rewriteInlineStyleAssetUrls(
    root.querySelectorAll("[style]"),
    compPath,
    (el) => el.getAttribute("style"),
    (el, value) => el.setAttribute("style", value),
    assetExists
  );
  for (const styleEl of root.querySelectorAll("style")) {
    styleEl.textContent = rewriteCssAssetUrls(styleEl.textContent || "", compPath, assetExists);
  }
}
function escapeLeadingDigitIdent(id) {
  return `\\${id.charCodeAt(0).toString(16)} ${id.slice(1)}`;
}
var REGEXP_SPECIALS = /[.*+?^${}()|[\]\\]/g;
function fixDigitLeadingIdSelectors(root) {
  const digitIds = /* @__PURE__ */ new Set();
  for (const el of root.querySelectorAll("[id]")) {
    const id = el.getAttribute("id");
    if (id && /^\d/.test(id)) digitIds.add(id);
  }
  if (digitIds.size === 0) return;
  for (const styleEl of root.querySelectorAll("style")) {
    let css = styleEl.textContent || "";
    for (const id of digitIds) {
      const pattern = new RegExp(`#${id.replace(REGEXP_SPECIALS, "\\$&")}(?![\\w-])`, "g");
      css = css.replace(pattern, `#${escapeLeadingDigitIdent(id)}`);
    }
    styleEl.textContent = css;
  }
}
function extractFullDocumentParts(rawHtml, compPath, projectDir) {
  const { document: doc } = parseHTML(rawHtml);
  const rewriteTargets = [doc.head, doc.body].filter(Boolean);
  for (const target of rewriteTargets) {
    rewriteRelativePaths(target, compPath, projectDir);
  }
  fixDigitLeadingIdSelectors(doc);
  const headContent = doc.head?.innerHTML ?? "";
  const bodyContent = doc.body?.innerHTML ?? "";
  const htmlEl = doc.documentElement;
  const htmlAttrs = extractElementAttrs(htmlEl);
  const bodyAttrs = doc.body ? extractElementAttrs(doc.body) : "";
  return { headContent, bodyContent, htmlAttrs, bodyAttrs };
}
function extractTemplateInnerHtml(rawComp) {
  const { document: doc } = parseHTML(rawComp);
  const template = doc.querySelector("template");
  return template ? template.innerHTML : null;
}
function escapeAttrValue(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
function extractElementAttrs(el) {
  const parts = [];
  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i];
    if (attr.value === "") {
      parts.push(attr.name);
    } else {
      parts.push(`${attr.name}="${escapeAttrValue(attr.value)}"`);
    }
  }
  return parts.join(" ");
}
var NON_RENDERED_TAGS = /* @__PURE__ */ new Set(["SCRIPT", "STYLE", "LINK", "META", "TEMPLATE", "NOSCRIPT"]);
function promoteTemplateCompositionId(rawComp, body) {
  let templateCompositionId;
  for (const tag of rawComp.matchAll(/<template\b[^>]*/gi)) {
    const id = /\bdata-composition-id\s*=\s*["']([^"']+)["']/i.exec(tag[0] ?? "")?.[1];
    if (id) {
      templateCompositionId = id;
      break;
    }
  }
  if (!templateCompositionId) return;
  if (body.querySelector("[data-composition-id]")) return;
  const root = Array.from(body.children).find((el) => !NON_RENDERED_TAGS.has(el.tagName));
  root?.setAttribute("data-composition-id", templateCompositionId);
}
function tagRootCompositionFile(bodyHtml, compPath) {
  const match = bodyHtml.match(/<[a-zA-Z][^>]*\bdata-composition-id=/);
  if (match?.index == null) return bodyHtml;
  const tagEnd = bodyHtml.indexOf(">", match.index);
  if (tagEnd === -1) return bodyHtml;
  if (bodyHtml.slice(match.index, tagEnd).includes("data-composition-file")) return bodyHtml;
  return bodyHtml.slice(0, tagEnd) + ` data-composition-file="${compPath}"` + bodyHtml.slice(tagEnd);
}
function rootHeadContent(rootHtml) {
  return rootHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
}
function buildSubCompositionHtml(projectDir, compPath, runtimeUrl, baseHref, rawOverride) {
  const compFile = join2(projectDir, compPath);
  if (!existsSync(compFile)) return null;
  const rawComp = rawOverride ?? readFileSync2(compFile, "utf-8");
  let compHeadContent = "";
  let rewrittenContent;
  let htmlAttrs = "";
  let bodyAttrs = "";
  const templateInner = extractTemplateInnerHtml(rawComp);
  if (templateInner != null) {
    const { document: contentDoc } = parseHTML(
      `<!DOCTYPE html><html><head></head><body>${templateInner}</body></html>`
    );
    rewriteRelativePaths(contentDoc, compPath, projectDir);
    fixDigitLeadingIdSelectors(contentDoc);
    promoteTemplateCompositionId(rawComp, contentDoc.body);
    rewrittenContent = contentDoc.body.innerHTML || templateInner;
  } else if (isFullHtmlDocument(rawComp)) {
    const parts = extractFullDocumentParts(rawComp, compPath, projectDir);
    compHeadContent = parts.headContent;
    rewrittenContent = parts.bodyContent;
    htmlAttrs = parts.htmlAttrs;
    bodyAttrs = parts.bodyAttrs;
  } else {
    const { document: contentDoc } = parseHTML(
      `<!DOCTYPE html><html><head></head><body>${rawComp}</body></html>`
    );
    rewriteRelativePaths(contentDoc, compPath, projectDir);
    fixDigitLeadingIdSelectors(contentDoc);
    rewrittenContent = contentDoc.body.innerHTML || rawComp;
  }
  rewrittenContent = stripEmbeddedRuntimeScripts(rewrittenContent);
  const { document: scriptsDoc } = parseHTML(
    `<!DOCTYPE html><html><head></head><body>${rewrittenContent}</body></html>`
  );
  deferScriptsUntilFonts(scriptsDoc);
  rewrittenContent = scriptsDoc.body.innerHTML;
  rewrittenContent = tagRootCompositionFile(rewrittenContent, compPath);
  const indexPath = join2(projectDir, "index.html");
  let headContent = "";
  if (existsSync(indexPath)) headContent = rootHeadContent(readFileSync2(indexPath, "utf-8"));
  if (baseHref && !hasBaseElement(headContent)) {
    headContent = `<base href="${baseHref}">
${headContent}`;
  }
  if (compHeadContent) headContent += `
${compHeadContent}`;
  headContent = stripEmbeddedRuntimeScripts(headContent);
  headContent += `
<script ${RUNTIME_BOOTSTRAP_ATTR}="1" src="${runtimeUrl}"></script>`;
  if (!headContent.includes("gsap")) {
    headContent += `
<script src="${gsapCdnDist()}gsap.min.js"></script>`;
  }
  const htmlOpen = htmlAttrs ? `<html ${htmlAttrs}>` : "<html>";
  const bodyOpen = bodyAttrs ? `<body ${bodyAttrs}>` : "<body>";
  return `<!DOCTYPE html>
${htmlOpen}
<head>
${headContent}
</head>
${bodyOpen}
<script>window.__timelines=window.__timelines||{};</script>
${rewrittenContent}
</body>
</html>`;
}
function hasBaseElement(html) {
  return parseHTML(html).document.querySelector("base") !== null;
}

// ../studio-server/src/helpers/compositionInputs.ts
import { readFileSync as readFileSync3 } from "fs";
import { createHash as createHash2 } from "crypto";

// ../studio-server/src/helpers/compositionInsertion.ts
import { existsSync as existsSync2 } from "fs";
import { randomUUID } from "crypto";
import { dirname as dirname2, relative, resolve, sep } from "path";
var CompositionInsertionError = class extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
  status;
};
function descendants(root, selector) {
  const found = Array.from(root.querySelectorAll(selector));
  for (const template of root.querySelectorAll("template")) {
    found.push(...descendants(template, selector));
  }
  return [...new Set(found)];
}
function compositionRoot(source) {
  const document2 = parseHTML(source).document;
  const root = descendants(document2, "[data-composition-id]")[0];
  if (!root) throw new CompositionInsertionError("Composition source has no root", 400);
  return { document: document2, root };
}
function positiveAttribute(root, ...names) {
  for (const name of names) {
    const value = Number.parseFloat(root.getAttribute(name) ?? "");
    if (Number.isFinite(value) && value > 0) return value;
  }
  throw new CompositionInsertionError(`Composition source has no valid ${names[0]}`, 400);
}
function canonicalProjectPath(projectDir, candidate) {
  if (!candidate) {
    if (folderGone(projectDir)) throw new ProjectRootMissingError(projectDir);
    throw new CompositionInsertionError("Composition source escapes the project", 400);
  }
  if (!existsSync2(candidate)) {
    throw new CompositionInsertionError("Composition source was not found", 404);
  }
  const canonical = realpath(candidate);
  if (!isSafePath(realpath(projectDir), canonical)) {
    throw new CompositionInsertionError("Composition source escapes the project", 400);
  }
  return canonical;
}
function readCompositionSource(file) {
  const read = readProjectFile(file);
  if (read.kind === "folder") {
    throw new CompositionInsertionError("Composition source is a folder, not an HTML file", 400);
  }
  if (read.kind === "missing") {
    throw new CompositionInsertionError("Composition source was not found", 404);
  }
  return read.text;
}
function validateSourcePath(sourcePath) {
  if (!sourcePath.trim() || sourcePath.includes("\0") || /^[a-z]+:/i.test(sourcePath)) {
    throw new CompositionInsertionError("Invalid composition source path", 400);
  }
}
function canonicalProjectFile(projectDir, sourcePath) {
  validateSourcePath(sourcePath);
  return canonicalProjectPath(projectDir, resolveWithinProject(projectDir, sourcePath));
}
function canonicalDependency(projectDir, ownerAbs, sourcePath) {
  validateSourcePath(sourcePath);
  return canonicalProjectPath(
    projectDir,
    resolveWithinProject(projectDir, relative(projectDir, resolve(dirname2(ownerAbs), sourcePath)))
  );
}
function validateDependencyGraph(projectDir, targetAbs, sourceAbs) {
  const visited = /* @__PURE__ */ new Set();
  const visiting = /* @__PURE__ */ new Set();
  const visit = (file) => {
    if (file === targetAbs) {
      throw new CompositionInsertionError("Composition insertion would create a cycle", 400);
    }
    if (visiting.has(file)) {
      throw new CompositionInsertionError("Composition dependency cycle detected", 400);
    }
    if (visited.has(file)) return;
    visiting.add(file);
    const source = readCompositionSource(file);
    const { document: document2 } = compositionRoot(source);
    for (const host of descendants(document2, "[data-composition-src]")) {
      const dependency = host.getAttribute("data-composition-src");
      if (dependency) {
        visit(canonicalDependency(projectDir, file, dependency));
      }
    }
    visiting.delete(file);
    visited.add(file);
  };
  visit(sourceAbs);
}
function numberAttribute(element, name, fallback = 0) {
  const value = Number.parseFloat(element.getAttribute(name) ?? "");
  return Number.isFinite(value) ? value : fallback;
}
function rangesOverlap(start, duration, other) {
  const otherStart = numberAttribute(other, "data-start");
  const otherDuration = numberAttribute(other, "data-duration");
  return start < otherStart + otherDuration && otherStart < start + duration;
}
function resolveTrack(root, desiredTrack, start, duration) {
  const clips = descendants(root, "[data-start][data-duration]").filter(
    (element) => element !== root && element.parentElement?.closest("[data-composition-id]") === root
  );
  const tracks = [...new Set(clips.map((clip) => numberAttribute(clip, "data-track-index")))].sort(
    (a, b) => a - b
  );
  const isFree = (track) => !clips.some(
    (clip) => numberAttribute(clip, "data-track-index") === track && rangesOverlap(start, duration, clip)
  );
  if (isFree(desiredTrack)) return desiredTrack;
  const row = tracks.indexOf(desiredTrack);
  for (let index = row - 1; index >= 0; index--) {
    const track = tracks[index];
    if (track !== void 0 && isFree(track)) return track;
  }
  for (let index = Math.max(0, row + 1); index < tracks.length; index++) {
    const track = tracks[index];
    if (track !== void 0 && isFree(track)) return track;
  }
  return Math.max(desiredTrack, ...tracks, -1) + 1;
}
function uniqueHostId(root, base) {
  const ids = /* @__PURE__ */ new Set([
    ...descendants(root, "[id]").map((element) => element.id),
    ...descendants(root, "[data-composition-id]").flatMap((element) => {
      const id = element.getAttribute("data-composition-id");
      return id ? [id] : [];
    })
  ]);
  if (!ids.has(base)) return base;
  let suffix = 2;
  while (ids.has(`${base}_${suffix}`)) suffix += 1;
  return `${base}_${suffix}`;
}
function relativeSourcePath(targetAbs, sourceAbs) {
  return relative(dirname2(targetAbs), sourceAbs).split(sep).join("/");
}
function insertCompositionIntoSource(input) {
  const targetAbs = canonicalProjectFile(input.projectDir, input.targetPath);
  const sourceAbs = canonicalProjectFile(input.projectDir, input.sourcePath);
  validateDependencyGraph(input.projectDir, targetAbs, sourceAbs);
  const source = readCompositionSource(sourceAbs);
  const sourceComposition = compositionRoot(source).root;
  const duration = positiveAttribute(
    sourceComposition,
    "data-composition-duration",
    "data-duration"
  );
  const width2 = positiveAttribute(sourceComposition, "data-width");
  const height = positiveAttribute(sourceComposition, "data-height");
  const { document: document2, root } = compositionRoot(input.parentSource);
  const parentDuration = positiveAttribute(root, "data-duration", "data-composition-duration");
  const base = (sourceComposition.getAttribute("data-composition-id") ?? "composition").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "composition";
  const hostId = uniqueHostId(root, base);
  const track = resolveTrack(
    root,
    Math.max(0, Math.round(input.desiredTrack)),
    input.start,
    duration
  );
  const zIndex = Math.max(
    0,
    ...descendants(root, "[style]").map((element) => {
      const match = /(?:^|;)\s*z-index\s*:\s*(-?\d+)/i.exec(element.getAttribute("style") ?? "");
      return match?.[1] ? Number.parseInt(match[1], 10) : 0;
    })
  ) + 1;
  const host = document2.createElement("div");
  host.id = hostId;
  host.className = "clip";
  host.setAttribute("data-hf-id", `hf-${randomUUID()}`);
  host.setAttribute("data-composition-id", hostId);
  host.setAttribute("data-composition-src", relativeSourcePath(targetAbs, sourceAbs));
  host.setAttribute("data-start", String(Math.round(input.start * 100) / 100));
  host.setAttribute("data-duration", String(duration));
  host.setAttribute("data-playback-start", "0");
  host.setAttribute("data-track-index", String(track));
  host.setAttribute("data-width", String(width2));
  host.setAttribute("data-height", String(height));
  host.setAttribute(
    "style",
    `position: absolute; left: 0px; top: 0px; width: ${width2}px; height: ${height}px; z-index: ${zIndex}`
  );
  root.appendChild(host);
  if (input.start + duration > parentDuration) {
    const name = root.hasAttribute("data-duration") ? "data-duration" : "data-composition-duration";
    root.setAttribute(name, String(Math.round((input.start + duration) * 100) / 100));
  }
  return { html: document2.toString(), hostId, track, duration };
}

// ../studio-server/src/helpers/compositionInputs.ts
var ROOT_COMPOSITION = "index.html";
var COMPOSITION_SRC = /\bdata-composition-src\s*=\s*(["'])(.*?)\1/g;
function projectReader(projectDir) {
  const sources = /* @__PURE__ */ new Map();
  return (compPath) => {
    if (!sources.has(compPath)) {
      const file = resolveWithinProject(projectDir, compPath);
      let source = null;
      try {
        source = file ? readFileSync3(file, "utf-8") : null;
      } catch {
      }
      sources.set(compPath, source);
    }
    return sources.get(compPath) ?? null;
  };
}
function normalizeSource(src) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith("//")) return null;
  const path = src.split(/[?#]/)[0]?.replace(/^\.?\//, "") ?? "";
  return path || null;
}
function closureOf(read, compPath) {
  const closure = /* @__PURE__ */ new Set();
  const visit = (path) => {
    if (closure.has(path)) return;
    closure.add(path);
    for (const match of (read(path) ?? "").matchAll(COMPOSITION_SRC)) {
      const mounted = normalizeSource(match[2] ?? "");
      if (mounted) visit(mounted);
    }
  };
  visit(compPath);
  return closure;
}
function lengthIsTimeline(projectDir, compPath) {
  const read = projectReader(projectDir);
  const documents = /* @__PURE__ */ new Map();
  const elements = (path, selector) => {
    let document2 = documents.get(path);
    if (!document2) documents.set(path, document2 = parseHTML(read(path) ?? "").document);
    return descendants(document2, selector);
  };
  const comp = normalizeSource(compPath) ?? compPath;
  const unsized = (path) => {
    const [root] = elements(path, "[data-composition-id]");
    return Boolean(root && !root.hasAttribute("data-duration"));
  };
  if (unsized(ROOT_COMPOSITION)) return true;
  const hosts = [...closureOf(read, ROOT_COMPOSITION)].flatMap(
    (path) => elements(path, "[data-composition-src]").filter(
      (host) => normalizeSource(host.getAttribute("data-composition-src") ?? "") === comp
    )
  );
  if (comp === ROOT_COMPOSITION || hosts.length === 0) return unsized(comp);
  return hosts.some(
    (host) => !host.hasAttribute("data-duration") && !host.hasAttribute("data-end")
  );
}
var inputSignatures = /* @__PURE__ */ new Map();
var rootMemos = /* @__PURE__ */ new Map();
var sha1 = (text3) => createHash2("sha1").update(text3).digest("hex");
function rootHashes(read) {
  const source = read(ROOT_COMPOSITION) ?? "";
  return { root: sha1(source), head: sha1(rootHeadContent(source)) };
}
function compositionInputSignature(projectDir, compPath, projectSignature) {
  const key = `${projectDir}\0${compPath}`;
  const known = inputSignatures.get(key);
  if (known?.projectSignature === projectSignature) return known.inputSignature;
  const read = projectReader(projectDir);
  const comp = normalizeSource(compPath) ?? compPath;
  const inputs = closureOf(read, comp).add(ROOT_COMPOSITION);
  const excluded = new Set(
    [...closureOf(read, ROOT_COMPOSITION)].filter((path) => !inputs.has(path))
  );
  let inputSignature;
  if (comp === ROOT_COMPOSITION) {
    inputSignature = createProjectSignature(projectDir, excluded);
  } else {
    const hashes = rootHashes(read);
    if (!rootMemos.has(projectDir)) rootMemos.set(projectDir, { ...hashes, affected: null });
    inputSignature = `${createProjectSignature(projectDir, excluded.add(ROOT_COMPOSITION))}:${hashes.head}`;
  }
  inputSignatures.set(key, { projectSignature, inputSignature });
  return inputSignature;
}
function compositionsAffectedBy(projectDir, changedPath) {
  const changed = changedPath.replace(/\\/g, "/");
  const read = projectReader(projectDir);
  if (changed === ROOT_COMPOSITION) {
    const now = rootHashes(read);
    const memo = rootMemos.get(projectDir);
    if (memo?.root === now.root) return memo.affected;
    const affected = memo?.head === now.head ? [ROOT_COMPOSITION] : null;
    rootMemos.set(projectDir, { ...now, affected });
    return affected;
  }
  const mounted = closureOf(read, ROOT_COMPOSITION);
  if (!mounted.has(changed)) return null;
  return [...mounted].filter((path) => closureOf(read, path).has(changed));
}

// ../studio-server/src/helpers/applyFileMutations.ts
import { readFileSync as readFileSync5, statSync } from "fs";

// ../studio-server/src/helpers/backupJournal.ts
import { readdirSync, readFileSync as readFileSync4, unlinkSync, writeFileSync as writeFileSync2 } from "fs";
import { Buffer as Buffer2 } from "buffer";
import { join as join3, relative as relative2 } from "path";
var DEFAULT_KEEP_PER_FILE = 10;
function backupKeyForPath(path) {
  return Buffer2.from(path, "utf-8").toString("base64url");
}
function timestampPrefix() {
  return (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
}
function backupPathForResponse(projectDir, backupPath) {
  if (!backupPath) return null;
  const rel = relative2(projectDir, backupPath);
  if (!rel || rel.startsWith("..")) return null;
  return rel.split("\\").join("/");
}
function snapshotBeforeWrite(projectDir, absPath, options = {}) {
  if (!isSafePath(projectDir, absPath)) return { backupPath: null };
  try {
    let content;
    try {
      content = readFileSync4(absPath);
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && (error.code === "ENOENT" || error.code === "EISDIR")) {
        return { backupPath: null };
      }
      throw error;
    }
    const relativePath = relative2(projectDir, absPath);
    const backupDir = join3(projectDir, ".hyperframes", "backup");
    mkdirWithinProject(projectDir, backupDir);
    const backupKey = backupKeyForPath(relativePath);
    const backupPath = nextBackupPath(backupDir, backupKey);
    writeFileSync2(backupPath, content);
    pruneBackups(backupDir, backupKey, options.keepPerFile ?? DEFAULT_KEEP_PER_FILE);
    return { backupPath };
  } catch (error) {
    if (isProjectRootMissing(error)) throw error;
    return { backupPath: null, error: error instanceof Error ? error.message : String(error) };
  }
}
function nextBackupPath(backupDir, backupKey) {
  const base = `${timestampPrefix()}-${backupKey}`;
  let candidate = join3(backupDir, base);
  let counter = 2;
  while (true) {
    try {
      readFileSync4(candidate);
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        return candidate;
      }
      throw error;
    }
    candidate = join3(backupDir, `${base}-${counter}`);
    counter += 1;
  }
}
function pruneBackups(backupDir, backupKey, keepPerFile) {
  const keep = Math.max(1, Math.floor(keepPerFile));
  const suffix = `-${backupKey}`;
  const numberedSuffix = new RegExp(`-${backupKey}-\\d+$`);
  const matches = readdirSync(backupDir).filter((name) => name.endsWith(suffix) || numberedSuffix.test(name)).map((name) => join3(backupDir, name)).sort((a, b) => {
    return b.localeCompare(a);
  });
  for (const file of matches.slice(keep)) {
    try {
      unlinkSync(file);
    } catch {
    }
  }
}

// ../studio-server/src/helpers/applyFileMutations.ts
function applyFileMutations(projectDir, mutations, requestToken, writeFile = (path, content) => replaceFileAtomically(path, content, statSync(path).mode)) {
  const prepared = mutations.map((mutation) => ({
    ...mutation,
    before: mutation.before ?? readFileSync5(mutation.absPath, "utf-8")
  }));
  const results = [];
  const attempted = [];
  for (const mutation of prepared)
    assertExpectedVersion(mutation, readFileSync5(mutation.absPath, "utf-8"));
  try {
    for (const mutation of prepared) {
      results.push(applyOneMutation(projectDir, mutation, requestToken, writeFile, attempted));
    }
    return results;
  } catch (error) {
    const rollbackErrors = [];
    for (const mutation of attempted.reverse()) {
      try {
        if (!mutation.written || readFileSync5(mutation.absPath, "utf-8") === mutation.after)
          writeFile(mutation.absPath, mutation.before, "utf-8");
        clearFileWriteReceipt(mutation.absPath, mutation.version, mutation.writeToken);
      } catch (rollbackError) {
        rollbackErrors.push(rollbackError);
      }
    }
    if (rollbackErrors.length > 0) {
      throw new AggregateError(
        [error, ...rollbackErrors],
        "File mutation failed and rollback did not complete"
      );
    }
    throw error;
  }
}
function applyOneMutation(projectDir, mutation, requestToken, writeFile, attempted) {
  const current = readFileSync5(mutation.absPath, "utf-8");
  assertExpectedVersion(mutation, current);
  if (mutation.after === mutation.before) {
    return {
      ...mutation,
      before: current,
      changed: false,
      backupPath: null,
      version: fileContentVersion(mutation.before),
      writeToken: null
    };
  }
  const backup = snapshotBeforeWrite(projectDir, mutation.absPath);
  if (backup.error) throw new Error(`backup failed: ${backup.error}`);
  assertExpectedVersion(mutation, readFileSync5(mutation.absPath, "utf-8"));
  const before = current;
  const version = fileContentVersion(mutation.after);
  const writeToken = createWriteToken(requestToken);
  const attempt = { ...mutation, before, version, writeToken, written: false };
  attempted.push(attempt);
  writeFile(mutation.absPath, mutation.after, "utf-8");
  attempt.written = true;
  recordFileWriteReceipt(mutation.absPath, {
    path: mutation.sourceFile,
    version,
    writeToken,
    overwrote: before
  });
  return {
    ...mutation,
    before,
    changed: true,
    backupPath: backupPathForResponse(projectDir, backup.backupPath),
    version,
    writeToken
  };
}
var FileChangedError = class extends Error {
  constructor(sourceFile) {
    super("file changed since the timeline was read");
    this.sourceFile = sourceFile;
  }
  sourceFile;
};
function assertExpectedVersion(mutation, current) {
  const stale = mutation.expectedVersion === void 0 ? current !== mutation.before : fileContentVersion(current) !== mutation.expectedVersion;
  if (stale) throw new FileChangedError(mutation.sourceFile);
}

// ../studio-server/src/helpers/requestSubPath.ts
function requestSubPath(url, route) {
  const routeSegments = route.split("/");
  const segments = new URL(url).pathname.split("/");
  const start = segments.indexOf(routeSegments[0] ?? "");
  return decodeURIComponent(segments.slice(start + routeSegments.length).join("/"));
}

// ../studio-server/src/routes/files.ts
import { bodyLimit } from "hono/body-limit";
import {
  closeSync as closeSync2,
  existsSync as existsSync4,
  lstatSync as lstatSync2,
  openSync as openSync2,
  readFileSync as readFileSync6,
  readlinkSync,
  unlinkSync as unlinkSync2,
  rmSync as rmSync3,
  statSync as statSync3,
  fstatSync as fstatSync2,
  renameSync as renameSync2,
  readdirSync as readdirSync2,
  realpathSync
} from "fs";
import { resolve as resolve2, dirname as dirname4, join as join6 } from "path";

// ../studio-server/src/helpers/waveform.ts
import { spawn } from "child_process";
import {
  existsSync as existsSync3,
  writeFileSync as writeFileSync3,
  mkdirSync,
  lstatSync,
  mkdtempSync,
  renameSync,
  rmSync,
  statSync as statSync2
} from "fs";
import { dirname as dirname3, join as join4 } from "path";
var SAMPLE_RATE = 4e3;
var PEAK_COUNT = 4e3;
var WAVEFORM_CACHE_VERSION = "v2";
function buildWaveformCacheKey(assetPath, fingerprint) {
  const name = assetPath.replace(/[/\\]/g, "_");
  if (!fingerprint) return `${WAVEFORM_CACHE_VERSION}_${name}.json`;
  const stamp = `${fingerprint.size}-${Math.round(fingerprint.mtimeMs)}`;
  return `${WAVEFORM_CACHE_VERSION}_${name}_${stamp}.json`;
}
function computePeaks(floats, count) {
  const step = floats.length / count;
  const peaks = [];
  for (let i = 0; i < count; i++) {
    const start = Math.floor(i * step);
    const end = Math.min(Math.floor((i + 1) * step), floats.length);
    let max = 0;
    for (let j = start; j < end; j++) {
      const abs = Math.abs(floats[j] ?? 0);
      if (abs > max) max = abs;
    }
    peaks.push(max);
  }
  const maxPeak = Math.max(...peaks, 1e-3);
  return peaks.map((p) => p / maxPeak);
}
function decodeAudioPeaks(audioPath) {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(
      findFfBinary("ffmpeg") ?? "ffmpeg",
      [
        "-i",
        audioPath,
        "-af",
        "atrim=start_sample=1152",
        "-f",
        "f32le",
        "-ac",
        "1",
        "-ar",
        String(SAMPLE_RATE),
        "-vn",
        "pipe:1"
      ],
      { stdio: ["ignore", "pipe", "ignore"], windowsHide: true }
    );
    const chunks = [];
    proc.stdout?.on("data", (chunk) => chunks.push(chunk));
    proc.on("close", (code) => {
      if (code !== 0 && chunks.length === 0) {
        reject(new Error(`ffmpeg exited with code ${code}`));
        return;
      }
      const buf = Buffer.concat(chunks);
      const numSamples = Math.floor(buf.length / 4);
      if (numSamples === 0) {
        reject(new Error("ffmpeg produced no audio samples"));
        return;
      }
      const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + numSamples * 4);
      resolvePromise(computePeaks(new Float32Array(ab), PEAK_COUNT));
    });
    proc.on("error", reject);
  });
}
async function generateWaveformCache(projectDir, assetPath) {
  const audioPath = join4(projectDir, assetPath);
  if (!existsSync3(audioPath)) return;
  const stats = statSync2(audioPath);
  const cacheDir = join4(projectDir, ".waveform-cache");
  const cachePath = join4(cacheDir, buildWaveformCacheKey(assetPath, stats));
  if (isWaveformCacheDirectory(cacheDir) && existsSync3(cachePath)) return;
  const peaks = await decodeAudioPeaks(audioPath);
  writeWaveformCache(cachePath, peaks);
}
function isWaveformCacheDirectory(cacheDir) {
  return lstatSync(cacheDir, { throwIfNoEntry: false })?.isDirectory() ?? false;
}
function writeWaveformCache(cachePath, peaks) {
  const cacheDir = dirname3(cachePath);
  try {
    mkdirSync(cacheDir, { mode: 448 });
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "EEXIST")) throw error;
  }
  if (!isWaveformCacheDirectory(cacheDir)) {
    throw new Error("Waveform cache must be a directory, not a symlink");
  }
  const stagingDir = mkdtempSync(join4(cacheDir, ".waveform-"));
  try {
    const stagingPath = join4(stagingDir, "peaks.json");
    writeFileSync3(stagingPath, JSON.stringify(peaks), { flag: "wx" });
    renameSync(stagingPath, cachePath);
  } finally {
    try {
      rmSync(stagingDir, { recursive: true, force: true });
    } catch {
    }
  }
}

// ../studio-server/src/helpers/mediaValidation.ts
import { spawnSync } from "child_process";
import { mkdtempSync as mkdtempSync2, rmSync as rmSync2, writeFileSync as writeFileSync4 } from "fs";
import { tmpdir } from "os";
import { basename, join as join5 } from "path";
var VIDEO_EXT = /\.(mp4|webm|mov|mkv|avi|m4v|mxf|mts|m2ts|ts)$/i;
var AUDIO_EXT = /\.(mp3|wav|ogg|m4a|aac|flac)$/i;
var defaultRunner = spawnSync;
var FFPROBE_MISSING = "not checked: ffprobe was not found. Install FFmpeg or set HYPERFRAMES_FFPROBE_PATH.";
function validateUploadedMedia(filePath, runner = defaultRunner) {
  const isVideo = VIDEO_EXT.test(filePath);
  const isAudio = AUDIO_EXT.test(filePath);
  if (!isVideo && !isAudio) {
    return { ok: true };
  }
  const ffprobe = findFfBinary("ffprobe") ?? (runner === defaultRunner ? void 0 : "ffprobe");
  if (!ffprobe) return { ok: true, unchecked: FFPROBE_MISSING };
  const result = runner(
    ffprobe,
    ["-v", "error", "-show_entries", "stream=codec_type", "-of", "json", "--", filePath],
    { windowsHide: true }
  );
  if (result.error && process.env[FFPROBE_PATH_ENV]?.trim()) {
    return {
      ok: false,
      reason: `${FFPROBE_PATH_ENV} names "${ffprobe}", which cannot run: fix it or unset it`
    };
  }
  if (result.error?.code === "ENOENT") {
    return { ok: true, unchecked: FFPROBE_MISSING };
  }
  if (result.status !== 0) {
    return { ok: false, reason: "ffprobe failed to read the media file" };
  }
  return checkStreams(String(result.stdout || "{}"), isVideo, isAudio);
}
function checkStreams(stdout, isVideo, isAudio) {
  try {
    const parsed = JSON.parse(stdout);
    const streams = parsed.streams ?? [];
    const hasVideo = streams.some((stream) => stream.codec_type === "video");
    const hasAudio = streams.some((stream) => stream.codec_type === "audio");
    if (isVideo && !hasVideo) {
      return { ok: false, reason: "no supported video stream found" };
    }
    if (isAudio && !hasAudio) {
      return { ok: false, reason: "no supported audio stream found" };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "ffprobe returned unreadable media metadata" };
  }
}
function validateUploadedMediaBuffer(fileName, buffer, runner = defaultRunner) {
  const tempDir = mkdtempSync2(join5(tmpdir(), "hyperframes-upload-"));
  const tempPath = join5(tempDir, basename(fileName));
  try {
    writeFileSync4(tempPath, buffer);
    return validateUploadedMedia(tempPath, runner);
  } finally {
    rmSync2(tempDir, { recursive: true, force: true });
  }
}

// ../studio-server/src/helpers/projectDirMissing.ts
var PROJECT_DIR_MISSING = { error: "not found", why: "project_dir_missing" };
var projectDirMissing = (c) => c.json(PROJECT_DIR_MISSING, 404);
function replaceWithProjectDirMissing(c, hostHeaders) {
  hostHeaders.delete("content-type");
  c.res = void 0;
  c.res = Response.json(PROJECT_DIR_MISSING, { status: 404, headers: hostHeaders });
}

// ../studio-server/src/helpers/finiteMutation.ts
function findUnsafeMutationValues(value, path = "body", options = {}) {
  if (value === null) {
    return options.allowNullPath?.(path) ? [] : [{ path, reason: "null" }];
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? [] : [{ path, reason: "non-finite-number" }];
  }
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap(
      (item, index) => findUnsafeMutationValues(item, `${path}[${index}]`, options)
    );
  }
  return Object.entries(value).flatMap(
    ([key, item]) => findUnsafeMutationValues(item, `${path}.${key}`, options)
  );
}
var DOM_PATCH_NULL_VALUE_PATH = /^body\.operations\[\d+\]\.value$/;
function findUnsafeDomPatchValues(value) {
  return findUnsafeMutationValues(value, "body", {
    allowNullPath: (path) => DOM_PATCH_NULL_VALUE_PATH.test(path)
  });
}

// ../parsers/dist/gsapConstants.js
var PROPERTY_GROUPS = {
  position: /* @__PURE__ */ new Set(["x", "y", "xPercent", "yPercent"]),
  scale: /* @__PURE__ */ new Set(["scale", "scaleX", "scaleY"]),
  size: /* @__PURE__ */ new Set(["width", "height"]),
  rotation: /* @__PURE__ */ new Set(["rotation", "skewX", "skewY"]),
  visual: /* @__PURE__ */ new Set(["opacity", "autoAlpha"]),
  other: /* @__PURE__ */ new Set()
};
var PROP_TO_GROUP = /* @__PURE__ */ new Map();
for (const [group, props] of Object.entries(PROPERTY_GROUPS)) {
  for (const p of props) PROP_TO_GROUP.set(p, group);
}
function classifyPropertyGroup(prop) {
  return PROP_TO_GROUP.get(prop) ?? "other";
}

// ../parsers/dist/gsapWriterAcorn.js
var GSAP_DEFAULT_DURATION = 0.5;
var BUILTIN_VAR_KEYS = /* @__PURE__ */ new Set(["duration", "ease", "delay"]);
var DROPPED_VAR_KEYS = /* @__PURE__ */ new Set([
  "onComplete",
  "onStart",
  "onUpdate",
  "onRepeat"
]);
var EXTRAS_KEYS = /* @__PURE__ */ new Set([
  "data",
  "stagger",
  "yoyo",
  "repeat",
  "repeatDelay",
  "snap",
  "overwrite",
  "immediateRender"
]);
function isTweenConfigKey(key) {
  return BUILTIN_VAR_KEYS.has(key) || DROPPED_VAR_KEYS.has(key) || EXTRAS_KEYS.has(key);
}
var PROPERTY_GROUPS2 = {
  position: /* @__PURE__ */ new Set(["x", "y", "xPercent", "yPercent"]),
  scale: /* @__PURE__ */ new Set(["scale", "scaleX", "scaleY"]),
  size: /* @__PURE__ */ new Set(["width", "height"]),
  rotation: /* @__PURE__ */ new Set(["rotation", "skewX", "skewY"]),
  visual: /* @__PURE__ */ new Set(["opacity", "autoAlpha"]),
  other: /* @__PURE__ */ new Set()
};
var PROP_TO_GROUP2 = /* @__PURE__ */ new Map();
for (const [group, props] of Object.entries(PROPERTY_GROUPS2)) {
  for (const p of props) PROP_TO_GROUP2.set(p, group);
}
function writesProperty(animation, property) {
  return property in animation.properties || !!animation.fromProperties && property in animation.fromProperties || !!animation.keyframes?.keyframes.some((k) => property in k.properties);
}
function isXYPositionWrite(a) {
  return a.propertyGroup === "position" && (writesProperty(a, "x") || writesProperty(a, "y"));
}
function classifyPropertyGroup2(prop) {
  return PROP_TO_GROUP2.get(prop) ?? "other";
}
function classifyTweenPropertyGroup(properties) {
  const groups = /* @__PURE__ */ new Set();
  for (const key of Object.keys(properties)) {
    if (key === "transformOrigin" || key === "_auto" || key === "data") continue;
    const g = classifyPropertyGroup2(key);
    groups.add(g);
  }
  if (groups.size === 1) return groups.values().next().value;
  return void 0;
}
function knownStart(animation) {
  if (animation.resolvedStart !== void 0) return animation.resolvedStart;
  return typeof animation.position === "number" ? animation.position : void 0;
}
var tweenSignature = (a) => JSON.stringify([a.targetSelector, a.method, a.position, a.duration, a.properties, a.keyframes]);
function holdScope(before, previous) {
  const kept = new Set(previous?.map(tweenSignature));
  const held = /* @__PURE__ */ new Map();
  for (const a of before.filter((b) => b.method === "set" && (b.properties?.data === "hf-hold" || b.extras?.data === '__raw:"hf-hold"'))) {
    const props = held.get(a.targetSelector) ?? /* @__PURE__ */ new Map();
    for (const [property, value] of Object.entries(a.properties)) props.set(property, value);
    held.set(a.targetSelector, props);
  }
  return {
    touched: (a) => previous === null || !kept.has(tweenSignature(a)),
    held: (selector) => held.get(selector) ?? /* @__PURE__ */ new Map()
  };
}
function keyframeHoldForAnimation(animation, animations, scope) {
  if (!animation.keyframes) return null;
  const start = knownStart(animation);
  const lone = animation.keyframes.keyframes.length === 1;
  if (start === void 0 || !(start > 1e-3) && !lone) return null;
  const atStart = animation.keyframes.keyframes.find((keyframe) => keyframe.percentage === 0);
  if (!atStart) return null;
  const earlier = animations.filter((other) => {
    const otherStart = knownStart(other);
    return other !== animation && !other.global && other.targetSelector === animation.targetSelector && otherStart !== void 0 && otherStart < start - 1e-3;
  });
  const touched = scope.touched(animation);
  const pinned = scope.held(animation.targetSelector);
  const kept = (property, value) => touched ? pinned.has(property) : pinned.get(property) === value;
  const startsLate = start > 1e-3;
  const pins = (group, property, value) => (group === "position" || group === "size") && ((lone || group === "position" && startsLate) && touched || kept(property, value));
  const hold = {};
  for (const [property, value] of Object.entries(atStart.properties)) {
    if (!pins(classifyPropertyGroup2(property), property, value) || typeof value !== "number")
      continue;
    if (earlier.some((other) => writesProperty(other, property))) continue;
    hold[property] = value;
  }
  return Object.keys(hold).length > 0 ? hold : null;
}
function authorsKeyframes(anim) {
  return anim.keyframes !== void 0 || anim.hasUnresolvedKeyframes === true;
}
function mergePercentageKeyframes(keyframes) {
  const byPercentage = /* @__PURE__ */ new Map();
  for (const keyframe of keyframes) {
    const existing = byPercentage.get(keyframe.percentage);
    if (!existing) {
      byPercentage.set(keyframe.percentage, {
        ...keyframe,
        properties: { ...keyframe.properties }
      });
      continue;
    }
    existing.properties = { ...existing.properties, ...keyframe.properties };
    if (keyframe.ease !== void 0) existing.ease = keyframe.ease;
    if (keyframe.auto !== void 0) existing.auto = keyframe.auto;
  }
  return [...byPercentage.values()].sort((a, b) => a.percentage - b.percentage);
}
function buildArcPath(coords, curviness, autoRotate, isCubic) {
  const first = coords[0];
  if (coords.length < 2 || !first) return void 0;
  const segments = [];
  let waypoints;
  if (isCubic && coords.length >= 4) {
    waypoints = [first];
    for (let i = 1; i + 2 < coords.length; i += 3) {
      const cp1 = coords[i];
      const cp2 = coords[i + 1];
      const anchor = coords[i + 2];
      if (!cp1 || !cp2 || !anchor) continue;
      waypoints.push(anchor);
      segments.push({ curviness, cp1, cp2 });
    }
  } else {
    waypoints = coords;
    for (let i = 0; i < waypoints.length - 1; i++) segments.push({ curviness });
  }
  return { arcPath: { enabled: true, autoRotate, segments }, waypoints };
}
function plainPercentKey(percentage) {
  const text3 = Math.abs(percentage) < 1e-6 ? percentage.toFixed(20).replace(/\.?0+$/, "") : String(percentage);
  return `${text3}%`;
}
var CSS_IDENTITY = {
  opacity: 1,
  autoAlpha: 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};
function cssIdentityValue(prop) {
  return CSS_IDENTITY[prop] ?? 0;
}
function buildIdentityMap(props) {
  const identity = {};
  for (const [key, val] of Object.entries(props)) {
    if (val != null) identity[key] = typeof val === "number" ? cssIdentityValue(key) : val;
  }
  return identity;
}
function resolveConversionProps(anim, resolvedFromValues) {
  if (anim.method === "set") {
    return { fromProps: { ...anim.properties }, toProps: { ...anim.properties } };
  }
  if (anim.method === "to") {
    const identity = buildIdentityMap(anim.properties);
    const fromProps = resolvedFromValues ? { ...identity, ...resolvedFromValues } : identity;
    return { fromProps, toProps: { ...anim.properties } };
  }
  if (anim.method === "from") {
    const identity = buildIdentityMap(anim.properties);
    const toProps2 = resolvedFromValues ? { ...identity, ...resolvedFromValues } : identity;
    return { fromProps: { ...anim.properties }, toProps: toProps2 };
  }
  const toProps = resolvedFromValues ? { ...anim.properties, ...resolvedFromValues } : { ...anim.properties };
  return { fromProps: { ...anim.fromProperties ?? {} }, toProps };
}
function numericXY(props) {
  const vx = props.x;
  const vy = props.y;
  return typeof vx === "number" && typeof vy === "number" ? { x: vx, y: vy } : null;
}
function extractArcWaypoints(anim) {
  const keyframeWps = (anim.keyframes?.keyframes ?? []).map((kf) => numericXY(kf.properties)).filter((pt) => pt !== null);
  if (keyframeWps.length >= 2) return keyframeWps;
  const propX = anim.properties.x;
  const propY = anim.properties.y;
  if (typeof propX !== "number" && typeof propY !== "number") return keyframeWps;
  const destX = typeof propX === "number" ? propX : 0;
  const destY = typeof propY === "number" ? propY : 0;
  return [
    { x: 0, y: 0 },
    { x: destX, y: destY }
  ];
}
function autoRotateSuffix(autoRotate) {
  if (autoRotate === true) return ", autoRotate: true";
  if (typeof autoRotate === "number") return `, autoRotate: ${autoRotate}`;
  return "";
}
function cubicControlPoints(seg2, wp, nextWp) {
  if (seg2.cp1 && seg2.cp2) {
    return [`{x: ${seg2.cp1.x}, y: ${seg2.cp1.y}}`, `{x: ${seg2.cp2.x}, y: ${seg2.cp2.y}}`];
  }
  const dx = nextWp.x - wp.x;
  const dy = nextWp.y - wp.y;
  const c = seg2.curviness ?? 1;
  return [
    `{x: ${wp.x + dx * 0.33}, y: ${wp.y + dy * 0.33 - c * Math.abs(dx) * 0.25}}`,
    `{x: ${wp.x + dx * 0.66}, y: ${wp.y + dy * 0.66 - c * Math.abs(dx) * 0.25}}`
  ];
}
function buildCubicPathEntries(waypoints, segments) {
  const first = waypoints[0];
  if (!first) return [];
  const entries = [`{x: ${first.x}, y: ${first.y}}`];
  for (let i = 0; i < segments.length; i++) {
    const seg2 = segments[i];
    const wp = waypoints[i];
    const nextWp = waypoints[i + 1];
    if (!seg2 || !wp || !nextWp) continue;
    entries.push(...cubicControlPoints(seg2, wp, nextWp));
    entries.push(`{x: ${nextWp.x}, y: ${nextWp.y}}`);
  }
  return entries;
}
function buildMotionPathObjectCode(config) {
  const { waypoints, segments, autoRotate } = config;
  const arSuffix = autoRotateSuffix(autoRotate);
  const hasExplicitCp = segments.some((s) => s.cp1 && s.cp2);
  const curvinessVaries = segments.some(
    (s) => (s.curviness ?? 1) !== (segments[0]?.curviness ?? 1)
  );
  if ((hasExplicitCp || curvinessVaries) && waypoints.length >= 2) {
    const pathStr = buildCubicPathEntries(waypoints, segments).join(", ");
    return `{ path: [${pathStr}], type: "cubic"${arSuffix} }`;
  }
  const pathEntries = waypoints.map((wp) => `{x: ${wp.x}, y: ${wp.y}}`);
  const curviness = segments[0]?.curviness ?? 1;
  const curvPart = curviness !== 1 ? `, curviness: ${curviness}` : "";
  return `{ path: [${pathEntries.join(", ")}]${curvPart}${arSuffix} }`;
}
function readProvenance(node) {
  return node?.__hfProvenance;
}
var roundPercentage = (percentage) => Math.round(percentage * 10) / 10;
var OBJECT_ARRAY_PERCENTAGE_TOLERANCE = 2;
function getObjectArrayKeyframeTiming(durations) {
  const steps = durations.map((duration) => duration ?? GSAP_DEFAULT_DURATION);
  if (!steps.every(
    (duration) => typeof duration === "number" && Number.isFinite(duration) && duration > 0
  )) {
    return null;
  }
  const totalDuration = steps.reduce((sum, duration) => sum + duration, 0);
  let cumulative = 0;
  return {
    percentages: steps.map((duration) => {
      cumulative += duration;
      return roundPercentage(cumulative / totalDuration * 100);
    }),
    totalDuration
  };
}
function getCompatibleObjectArrayKeyframeTiming(durations, outerDuration) {
  const timing2 = getObjectArrayKeyframeTiming(durations);
  if (!timing2) return null;
  const stepsAuthorDuration = durations.some((duration) => duration !== void 0);
  if (!stepsAuthorDuration || outerDuration === void 0) return timing2;
  if (typeof outerDuration === "number" && Math.abs(outerDuration - timing2.totalDuration) <= Number.EPSILON) {
    return timing2;
  }
  return null;
}
function findObjectArrayKeyframeIndex(durations, percentage, options) {
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) return null;
  const timing2 = getObjectArrayKeyframeTiming(durations);
  if (!timing2) return null;
  const { percentages } = timing2;
  let match = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < percentages.length; index++) {
    const distance = Math.abs(percentages[index] - percentage);
    if (distance < bestDistance) {
      match = index;
      bestDistance = distance;
    }
  }
  const tolerance = options?.tolerance ?? OBJECT_ARRAY_PERCENTAGE_TOLERANCE;
  return bestDistance <= tolerance || options?.fallbackToNearest ? match : null;
}
var GSAP_METHODS = /* @__PURE__ */ new Set(["set", "to", "from", "fromTo"]);
var QUERY_METHODS = /* @__PURE__ */ new Set(["querySelector", "querySelectorAll"]);
var ITERATION_METHODS = /* @__PURE__ */ new Set(["forEach", "map"]);
var SCOPE_NODE_TYPES = /* @__PURE__ */ new Set([
  "Program",
  "BlockStatement",
  "FunctionDeclaration",
  "FunctionExpression",
  "ArrowFunctionExpression"
]);
var CONST_NODES = /* @__PURE__ */ Symbol("hf.constNodes");
function constNodesOf(scope) {
  return scope[CONST_NODES];
}
var MATH_FNS = /* @__PURE__ */ new Set(["min", "max", "round", "floor", "ceil", "abs", "sqrt", "sign", "trunc"]);
var MATH_CONSTS = { PI: Math.PI, E: Math.E, SQRT2: Math.SQRT2 };
function resolveMemberNode(node, scope) {
  if (node.object?.type === "Identifier" && node.object.name === "Math") {
    const key = node.property?.name;
    return typeof key === "string" ? MATH_CONSTS[key] : void 0;
  }
  const objNode = resolveConstNode(node.object, scope);
  if (!objNode) return void 0;
  let valueNode;
  if (node.computed) {
    const idx = resolveNode(node.property, scope);
    if (objNode.type === "ArrayExpression" && typeof idx === "number") {
      valueNode = objNode.elements?.[idx];
    } else if (objNode.type === "ObjectExpression" && (typeof idx === "string" || typeof idx === "number")) {
      valueNode = findPropertyNode(objNode, String(idx));
    }
  } else if (objNode.type === "ObjectExpression") {
    valueNode = findPropertyNode(objNode, node.property?.name ?? node.property?.value);
  }
  return valueNode ? resolveNode(valueNode, scope) : void 0;
}
function resolveConstMember(objNode, node, scope) {
  if (!node.computed) {
    return objNode.type === "ObjectExpression" ? findPropertyNode(objNode, node.property?.name ?? node.property?.value) : void 0;
  }
  const idx = resolveNode(node.property, scope);
  if (objNode.type === "ArrayExpression" && typeof idx === "number") return objNode.elements?.[idx];
  if (objNode.type === "ObjectExpression") return findPropertyNode(objNode, String(idx));
  return void 0;
}
function resolveConstNode(node, scope) {
  if (!node) return void 0;
  if (node.type === "ArrayExpression" || node.type === "ObjectExpression") return node;
  if (node.type === "Identifier") return constNodesOf(scope)?.get(node.name);
  if (node.type !== "MemberExpression") return void 0;
  const objNode = resolveConstNode(node.object, scope);
  return objNode ? resolveConstMember(objNode, node, scope) : void 0;
}
function resolveNode(node, scope) {
  if (!node) return void 0;
  if (node.type === "NumericLiteral" || node.type === "Literal" && typeof node.value === "number")
    return node.value;
  if (node.type === "StringLiteral" || node.type === "Literal" && typeof node.value === "string")
    return node.value;
  if (node.type === "BooleanLiteral" || node.type === "Literal" && typeof node.value === "boolean")
    return node.value;
  if (node.type === "UnaryExpression" && node.operator === "-" && node.argument) {
    const val = resolveNode(node.argument, scope);
    return typeof val === "number" ? -val : void 0;
  }
  if (node.type === "BinaryExpression") {
    const left = resolveNode(node.left, scope);
    const right = resolveNode(node.right, scope);
    if (typeof left === "number" && typeof right === "number") {
      switch (node.operator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return right !== 0 ? left / right : void 0;
      }
    }
    if (typeof left === "string" && node.operator === "+") return left + String(right ?? "");
    if (typeof right === "string" && node.operator === "+") return String(left ?? "") + right;
  }
  if (node.type === "Identifier" && scope.has(node.name)) {
    return scope.get(node.name);
  }
  if (node.type === "TemplateLiteral" && node.expressions?.length === 0) {
    return node.quasis?.[0]?.value?.cooked ?? void 0;
  }
  if (node.type === "MemberExpression") {
    return resolveMemberNode(node, scope);
  }
  if (node.type === "CallExpression" && node.callee?.type === "MemberExpression" && node.callee.object?.type === "Identifier" && node.callee.object.name === "Math" && MATH_FNS.has(node.callee.property?.name)) {
    const args = (node.arguments ?? []).map((a) => resolveNode(a, scope));
    if (args.every((a) => typeof a === "number")) {
      return Math[node.callee.property.name](...args);
    }
  }
  return void 0;
}
function extractLiteralValue(node, scope) {
  return resolveNode(node, scope);
}
function selectorFromQueryCall(node, scope) {
  if (node?.type !== "CallExpression") return null;
  const callee = node.callee;
  if (callee?.type !== "MemberExpression" || callee.property?.type !== "Identifier") return null;
  const method = callee.property.name;
  const argValue = resolveNode(node.arguments?.[0], scope);
  if (typeof argValue !== "string" || argValue.length === 0) return null;
  if (QUERY_METHODS.has(method) || method === "toArray") return argValue;
  if (method === "getElementById") return `#${argValue}`;
  return null;
}
function enclosingScopeNodeFromAncestors(ancestors, includeBlocks = true) {
  for (let i = ancestors.length - 2; i >= 0; i--) {
    const node = ancestors[i];
    if (node && SCOPE_NODE_TYPES.has(node.type) && (includeBlocks || node.type !== "BlockStatement")) {
      return node;
    }
  }
  return null;
}
function scopeChainFromAncestors(ancestors) {
  const chain = [];
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const node = ancestors[i];
    if (node && SCOPE_NODE_TYPES.has(node.type)) chain.push(node);
  }
  return chain;
}
function nearestExpandedScopeFromAncestors(ancestors) {
  for (let index = ancestors.length - 2; index >= 0; index--) {
    const candidate = ancestors[index];
    if (candidate?.type === "BlockStatement" && readProvenance(candidate)) return candidate;
  }
  return void 0;
}
function findVisibleIdentifierDeclaration(name, ancestors, index, usageStart = Number.POSITIVE_INFINITY) {
  const declarations = index.declarationsByName.get(name) ?? [];
  const expandedScopeNode = nearestExpandedScopeFromAncestors(ancestors);
  for (const scopeNode of scopeChainFromAncestors(ancestors)) {
    const candidates = declarations.filter(
      (declaration) => declaration.scopeNode === scopeNode && (!declaration.expandedScopeNode || declaration.expandedScopeNode === expandedScopeNode) && (declaration.kind === "var" || declaration.kind === "param" || declaration.node.start < usageStart)
    ).sort((left, right) => right.node.start - left.node.start);
    if (candidates[0]) return candidates[0];
  }
  return void 0;
}
function collectIdentifierBindingIndex(ast) {
  const declarationsByName = /* @__PURE__ */ new Map();
  const reassignedDeclarations = /* @__PURE__ */ new Set();
  ancestor(ast, {
    VariableDeclarator(node, _, ancestors) {
      const name = node.id?.name;
      if (!name) return;
      const declaration = ancestors.at(-2);
      const kind = declaration?.kind;
      if (!kind) return;
      const includeBlocks = declaration?.type !== "VariableDeclaration" || kind !== "var";
      const scopeNode = enclosingScopeNodeFromAncestors(ancestors, includeBlocks);
      const expandedScopeNode = nearestExpandedScopeFromAncestors(ancestors);
      const entries = declarationsByName.get(name) ?? [];
      entries.push({ node, scopeNode, expandedScopeNode, name, kind });
      declarationsByName.set(name, entries);
    },
    FunctionDeclaration: indexFunctionParameters,
    FunctionExpression: indexFunctionParameters,
    ArrowFunctionExpression: indexFunctionParameters
  });
  const index = { declarationsByName, reassignedDeclarations };
  ancestor(ast, {
    AssignmentExpression(node, _, ancestors) {
      const name = node.left?.type === "Identifier" ? node.left.name : void 0;
      if (!name) return;
      const declaration = findVisibleIdentifierDeclaration(name, ancestors, index, node.start);
      if (declaration) reassignedDeclarations.add(declaration.node);
    }
  });
  return index;
  function indexFunctionParameters(node) {
    for (const parameter of node.params ?? []) {
      if (parameter?.type !== "Identifier") continue;
      const entries = declarationsByName.get(parameter.name) ?? [];
      entries.push({ node: parameter, scopeNode: node, name: parameter.name, kind: "param" });
      declarationsByName.set(parameter.name, entries);
    }
  }
}
function addBinding(bindings, scopeNode, name, selector) {
  let scoped = bindings.get(scopeNode);
  if (!scoped) {
    scoped = /* @__PURE__ */ new Map();
    bindings.set(scopeNode, scoped);
  }
  if (!scoped.has(name)) scoped.set(name, selector);
}
function lookupBindingFromAncestors(name, ancestors, bindings) {
  for (const scopeNode of scopeChainFromAncestors(ancestors)) {
    const selector = bindings.get(scopeNode)?.get(name);
    if (selector !== void 0) return selector;
  }
  return bindings.get(null)?.get(name) ?? null;
}
function isFunctionNode(node) {
  return node?.type === "ArrowFunctionExpression" || node?.type === "FunctionExpression" || node?.type === "FunctionDeclaration";
}
function resolveCollectionSelector(node, ancestors, scope, bindings) {
  if (node?.type === "Identifier")
    return lookupBindingFromAncestors(node.name, ancestors, bindings);
  if (node?.type === "CallExpression") return selectorFromQueryCall(node, scope);
  return null;
}
function collectScopeBindings(ast) {
  const bindings = /* @__PURE__ */ new Map();
  const ambiguousBindings = /* @__PURE__ */ new Set();
  const constNodes = /* @__PURE__ */ new Map();
  Object.defineProperty(bindings, CONST_NODES, { value: constNodes, enumerable: false });
  simple(ast, {
    VariableDeclarator(node) {
      const name = node.id?.name;
      const init = node.init;
      if (!name || !init) return;
      if (init.type === "ArrayExpression" || init.type === "ObjectExpression") {
        constNodes.set(name, init);
        return;
      }
      const val = resolveNode(init, bindings);
      if (val === void 0 || ambiguousBindings.has(name)) return;
      const existing = bindings.get(name);
      if (existing !== void 0 && existing !== val) {
        bindings.delete(name);
        ambiguousBindings.add(name);
      } else if (existing === void 0) {
        bindings.set(name, val);
      }
    }
  });
  return bindings;
}
function collectTargetBindings(ast, scope, identifierBindings) {
  const bindings = /* @__PURE__ */ new Map();
  ancestor(ast, {
    VariableDeclarator(node, _, ancestors) {
      const name = node.id?.name;
      const selector = selectorFromQueryCall(node.init, scope);
      if (name && selector !== null) {
        const declaration = ancestors.at(-2);
        const includeBlocks = declaration?.type !== "VariableDeclaration" || declaration.kind !== "var";
        addBinding(
          bindings,
          enclosingScopeNodeFromAncestors(ancestors, includeBlocks),
          name,
          selector
        );
      }
    },
    AssignmentExpression(node, _, ancestors) {
      const left = node.left;
      const selector = selectorFromQueryCall(node.right, scope);
      if (left?.type === "Identifier" && selector !== null) {
        const declaration = findVisibleIdentifierDeclaration(
          left.name,
          ancestors,
          identifierBindings,
          node.start
        );
        addBinding(
          bindings,
          declaration?.scopeNode ?? nearestExpandedScopeFromAncestors(ancestors) ?? enclosingScopeNodeFromAncestors(ancestors),
          left.name,
          selector
        );
      }
    }
  });
  ancestor(ast, {
    // fallow-ignore-next-line complexity
    CallExpression(node, _, ancestors) {
      const callee = node.callee;
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && ITERATION_METHODS.has(callee.property.name)) {
        const collectionSelector = resolveCollectionSelector(
          callee.object,
          ancestors,
          scope,
          bindings
        );
        const fn = node.arguments?.[0];
        const param = fn?.params?.[0];
        if (collectionSelector && param?.type === "Identifier" && isFunctionNode(fn)) {
          addBinding(bindings, fn, param.name, collectionSelector);
        }
      }
    }
  });
  const COLLECTION_ALIAS_METHODS = /* @__PURE__ */ new Set(["slice", "filter", "concat", "reverse"]);
  ancestor(ast, {
    // fallow-ignore-next-line complexity
    VariableDeclarator(node, _, ancestors) {
      const name = node.id?.name;
      const init = node.init;
      if (!name || !init) return;
      let sourceVar;
      if (init.type === "MemberExpression" && init.object?.type === "Identifier") {
        sourceVar = init.object.name;
      } else if (init.type === "CallExpression" && init.callee?.type === "MemberExpression" && init.callee.object?.type === "Identifier" && init.callee.property?.type === "Identifier" && COLLECTION_ALIAS_METHODS.has(init.callee.property.name)) {
        sourceVar = init.callee.object.name;
      }
      if (!sourceVar) return;
      const selector = lookupBindingFromAncestors(sourceVar, ancestors, bindings);
      if (selector)
        addBinding(bindings, enclosingScopeNodeFromAncestors(ancestors), name, selector);
    }
  });
  return bindings;
}
function resolveTargetSelector(node, ancestors, scope, bindings) {
  if (!node) return null;
  if (node.type === "StringLiteral" || node.type === "Literal") {
    return typeof node.value === "string" ? node.value : null;
  }
  if (node.type === "Identifier") {
    return lookupBindingFromAncestors(node.name, ancestors, bindings);
  }
  if (node.type === "CallExpression") {
    return selectorFromQueryCall(node, scope);
  }
  if (node.type === "ArrayExpression") {
    const parts = node.elements.map((el) => resolveTargetSelector(el, ancestors, scope, bindings)).filter((s) => typeof s === "string" && s.length > 0);
    return parts.length > 0 ? parts.join(", ") : null;
  }
  if (node.type === "MemberExpression" && node.object?.type === "Identifier") {
    return lookupBindingFromAncestors(node.object.name, ancestors, bindings);
  }
  return null;
}
function hasUnresolvedArrayPart(node, ancestors, scope, bindings) {
  return node?.type === "ArrayExpression" && node.elements.some(
    (el) => !resolveTargetSelector(el, ancestors, scope, bindings) || hasUnresolvedArrayPart(el, ancestors, scope, bindings)
  );
}
function describeProxyTarget(targetNode, varsNode, scope) {
  const objNode = targetNode?.type === "ObjectExpression" ? targetNode : targetNode?.type === "Identifier" ? resolveConstNode(targetNode, scope) : void 0;
  if (objNode?.type !== "ObjectExpression") return null;
  const onUpdate = findPropertyNode(varsNode, "onUpdate");
  const driven = onUpdate ? drivenDomChannel(onUpdate) : void 0;
  if (driven) return `proxy \u2192 ${driven}`;
  return "dwell/hold";
}
function isStyleAssignmentTarget(left) {
  return left?.type === "MemberExpression" && left.object?.type === "MemberExpression" && left.object.property?.name === "style" && !!left.property?.name;
}
function drivenDomChannel(fnNode) {
  let found;
  simple(fnNode, {
    CallExpression(node) {
      if (node.callee?.type === "MemberExpression" && node.callee.property?.name === "setAttribute" && typeof node.arguments?.[0]?.value === "string") {
        found ??= node.arguments[0].value;
      }
    },
    AssignmentExpression(node) {
      const left = node.left;
      if (isStyleAssignmentTarget(left)) found ??= `style.${left.property.name}`;
    }
  });
  return found;
}
function isObjectProperty(prop) {
  return prop?.type === "ObjectProperty" || prop?.type === "Property";
}
function propKeyName(prop) {
  return prop?.key?.name ?? prop?.key?.value;
}
function findPropertyNode(varsArgNode, key) {
  if (varsArgNode?.type !== "ObjectExpression") return void 0;
  for (const prop of varsArgNode.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    if (propKeyName(prop) === key) return prop.value;
  }
  return void 0;
}
function extractRawPropertySource(varsArgNode, key, source) {
  const node = findPropertyNode(varsArgNode, key);
  return node ? source.slice(node.start, node.end) : void 0;
}
function objectExpressionToRecord(node, scope, source) {
  const result = {};
  if (node?.type !== "ObjectExpression") return result;
  for (const prop of node.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    const key = prop.key?.name ?? prop.key?.value;
    if (!key) continue;
    const resolved = resolveNode(prop.value, scope);
    if (resolved !== void 0) {
      result[key] = resolved;
    } else {
      result[key] = `__raw:${source.slice(prop.value.start, prop.value.end)}`;
    }
  }
  return result;
}
function isGsapTimelineCall(node) {
  return node?.type === "CallExpression" && node.callee?.type === "MemberExpression" && node.callee.object?.name === "gsap" && node.callee.property?.name === "timeline";
}
function hasUnknownDuration(varsNode, scope) {
  if (!varsNode) return false;
  if (varsNode.type !== "ObjectExpression") return true;
  const props = varsNode.properties ?? [];
  if (props.some((p) => p.type === "SpreadElement")) return true;
  const prop = props.find((p) => isObjectProperty(p) && propKeyName(p) === "duration");
  return prop !== void 0 && typeof resolveNode(prop.value, scope) !== "number";
}
function staticMemberKey(node) {
  if (!node || node.type !== "MemberExpression") return null;
  if (node.computed) {
    const p = node.property;
    if (p?.type === "Literal" && typeof p.value === "string") return p.value;
    return null;
  }
  return node.property?.type === "Identifier" ? node.property.name : null;
}
function isStaticMemberRef(node) {
  return node?.type === "MemberExpression" && staticMemberKey(node) !== null;
}
function sameMemberAccess(a, b) {
  if (a?.type !== "MemberExpression" || b?.type !== "MemberExpression") return false;
  if (staticMemberKey(a) !== staticMemberKey(b) || staticMemberKey(a) === null) return false;
  const ao = a.object;
  const bo = b.object;
  if (ao?.type === "Identifier" && bo?.type === "Identifier") return ao.name === bo.name;
  if (ao?.type === "MemberExpression" && bo?.type === "MemberExpression")
    return sameMemberAccess(ao, bo);
  return false;
}
function timelineRootSource(ref, script) {
  return ref.kind === "identifier" ? ref.name : script.slice(ref.node.start, ref.node.end);
}
function extractTimelineDefaults(callNode, scope) {
  const arg = callNode.arguments?.[0];
  if (!arg || arg.type !== "ObjectExpression") return void 0;
  const defaultsProp = arg.properties?.find(
    (p) => isObjectProperty(p) && propKeyName(p) === "defaults"
  );
  if (!defaultsProp?.value || defaultsProp.value.type !== "ObjectExpression") return void 0;
  const result = {};
  for (const prop of defaultsProp.value.properties ?? []) {
    if (!isObjectProperty(prop)) continue;
    const key = propKeyName(prop);
    const val = resolveNode(prop.value, scope);
    if (key === "ease" && typeof val === "string") result.ease = val;
    if (key === "duration") {
      if (typeof val === "number") result.duration = val;
      else result.durationUnresolved = true;
    }
  }
  return Object.keys(result).length > 0 ? result : void 0;
}
function findTimelineVar(ast, scope) {
  let timelineVar = null;
  let ref = null;
  let timelineCount = 0;
  let defaults;
  const emptyScope = scope ?? /* @__PURE__ */ new Map();
  simple(ast, {
    VariableDeclarator(node) {
      if (isGsapTimelineCall(node.init)) {
        timelineCount += 1;
        if (!ref && node.id?.type === "Identifier") {
          timelineVar = node.id.name;
          ref = { kind: "identifier", name: node.id.name };
          defaults = extractTimelineDefaults(node.init, emptyScope);
        }
      }
    },
    AssignmentExpression(node) {
      if (isGsapTimelineCall(node.right)) {
        timelineCount += 1;
        if (!ref) {
          const left = node.left;
          if (left?.type === "Identifier") {
            timelineVar = left.name;
            ref = { kind: "identifier", name: left.name };
            defaults = extractTimelineDefaults(node.right, emptyScope);
          } else if (isStaticMemberRef(left)) {
            ref = { kind: "member", node: left };
            defaults = extractTimelineDefaults(node.right, emptyScope);
          }
        }
      }
    }
  });
  return { timelineVar, ref, timelineCount, defaults };
}
function isTimelineRootedCall(callNode, ref) {
  let obj = callNode.callee?.object;
  while (obj?.type === "CallExpression") {
    obj = obj.callee?.object;
  }
  if (ref.kind === "identifier") return obj?.type === "Identifier" && obj.name === ref.name;
  return sameMemberAccess(obj, ref.node);
}
function findAllTweenCalls(ast, ref, scope, targetBindings) {
  const results = [];
  function visit(node, ancestors) {
    if (!node || typeof node !== "object") return;
    const nodeAncestors = [...ancestors, node];
    if (node.type === "CallExpression") {
      const callee = node.callee;
      const gsapSetArg = node.arguments?.[0];
      const isGlobalSet = callee?.type === "MemberExpression" && callee.object?.type === "Identifier" && callee.object.name === "gsap" && callee.property?.type === "Identifier" && callee.property.name === "set" && (gsapSetArg?.type === "StringLiteral" || gsapSetArg?.type === "Literal" && typeof gsapSetArg.value === "string");
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && (isTimelineRootedCall(node, ref) || isGlobalSet) && GSAP_METHODS.has(callee.property.name)) {
        const method = callee.property.name;
        const args = node.arguments;
        const selectorValue = args.length >= 1 ? resolveTargetSelector(args[0], nodeAncestors, scope, targetBindings) ?? "__unresolved__" : "__unresolved__";
        const partial = hasUnresolvedArrayPart(args[0], nodeAncestors, scope, targetBindings) ? { selectorPartial: true } : {};
        if (method === "fromTo" && args.length >= 3) {
          results.push({
            node,
            ancestors: nodeAncestors,
            method: "fromTo",
            selector: selectorValue,
            ...partial,
            fromArg: args[1],
            varsArg: args[2],
            positionArg: args[3]
          });
        } else if (method !== "fromTo" && args.length >= 2) {
          results.push({
            node,
            ancestors: nodeAncestors,
            method,
            selector: selectorValue,
            ...partial,
            varsArg: args[1],
            positionArg: args[2],
            ...isGlobalSet ? { global: true } : {}
          });
        }
      }
    }
    for (const key of Object.keys(node)) {
      if (key === "type" || key === "start" || key === "end" || key === "loc") continue;
      const child = node[key];
      if (Array.isArray(child)) {
        for (const item of child) {
          if (item && typeof item === "object" && item.type) visit(item, nodeAncestors);
        }
      } else if (child && typeof child === "object" && child.type) {
        visit(child, nodeAncestors);
      }
    }
  }
  visit(ast, []);
  return results;
}
var PERCENTAGE_KEY_RE = /^(\d+(?:\.\d+)?)%$/;
function tryResolveStringProp(propValue, scope, source) {
  const val = resolveNode(propValue, scope);
  if (typeof val === "string") return val;
  return source === void 0 ? void 0 : `__raw:${source.slice(propValue.start, propValue.end)}`;
}
function parsePercentageKeyframes(node, scope, source) {
  const keyframes = [];
  let ease;
  let easeEach;
  for (const prop of node.properties ?? []) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.value ?? prop.key?.name;
    if (typeof key !== "string") continue;
    const pctMatch = PERCENTAGE_KEY_RE.exec(key);
    if (pctMatch) {
      if (!isPlainStep(prop.value)) return void 0;
      const percentage = Number.parseFloat(pctMatch[1] ?? "0");
      const record = objectExpressionToRecord(prop.value, scope, source);
      const properties = {};
      let kfEase;
      for (const [k, v] of Object.entries(record)) {
        if (k === "ease" && typeof v === "string") {
          kfEase = v;
        } else if (k === "duration") {
          continue;
        } else if (typeof v === "number" || typeof v === "string") {
          properties[k] = v;
        }
      }
      keyframes.push({ percentage, properties, ...kfEase ? { ease: kfEase } : {} });
    } else if (key === "ease") {
      ease = tryResolveStringProp(prop.value, scope, source) ?? ease;
    } else if (key === "easeEach") {
      easeEach = tryResolveStringProp(prop.value, scope, source) ?? easeEach;
    } else {
      return void 0;
    }
  }
  keyframes.sort((a, b) => a.percentage - b.percentage);
  return {
    format: "percentage",
    keyframes,
    ...ease ? { ease } : {},
    ...easeEach ? { easeEach } : {}
  };
}
function computeKeyframesTotalDuration(varsNode, scope, source) {
  const kfNode = (varsNode.properties ?? []).find(
    (p) => (p.key?.name ?? p.key?.value) === "keyframes"
  )?.value;
  if (!kfNode || kfNode.type !== "ArrayExpression") return void 0;
  const durations = [];
  for (const el of kfNode.elements ?? []) {
    if (!el || el.type !== "ObjectExpression") continue;
    const r = objectExpressionToRecord(el, scope, source);
    durations.push(r.duration);
  }
  return getObjectArrayKeyframeTiming(durations)?.totalDuration;
}
function staticKeyName(prop) {
  if (prop.type !== "ObjectProperty" && prop.type !== "Property") return void 0;
  if (prop.method || prop.kind && prop.kind !== "init") return void 0;
  const key = prop.computed ? prop.key?.type === "Literal" && prop.key.value : prop.key?.name ?? prop.key?.value;
  return typeof key === "string" ? key : void 0;
}
var isPlainObject = (node) => node?.type === "ObjectExpression" && (node.properties ?? []).every((p) => staticKeyName(p) !== void 0);
var isPlainStep = (node) => node?.type === "Literal" || isPlainObject(node);
function parseObjectArrayKeyframes(node, scope, source) {
  const elements = node.elements ?? [];
  const raw = [];
  for (const el of elements) {
    if (!isPlainObject(el)) return void 0;
    const record = objectExpressionToRecord(el, scope, source);
    const properties = {};
    let duration;
    let ease;
    for (const [k, v] of Object.entries(record)) {
      if (k === "duration") {
        duration = v;
      } else if (k === "ease" && typeof v === "string") {
        ease = v;
      } else if (typeof v === "number" || typeof v === "string") {
        properties[k] = v;
      } else {
        return void 0;
      }
    }
    raw.push({ properties, duration, ease });
  }
  const timing2 = getObjectArrayKeyframeTiming(raw.map((entry) => entry.duration));
  if (!timing2) return void 0;
  const keyframes = raw.map((entry, index) => ({
    percentage: timing2.percentages[index],
    properties: entry.properties,
    ...entry.ease ? { ease: entry.ease } : {}
  }));
  return { format: "object-array", keyframes };
}
function parseSimpleArrayKeyframes(node, scope) {
  const arrayProps = /* @__PURE__ */ new Map();
  let ease;
  let easeEach;
  for (const prop of node.properties ?? []) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.name ?? prop.key?.value;
    if (typeof key !== "string") continue;
    if (prop.value?.type === "ArrayExpression") {
      const values = [];
      for (const el of prop.value.elements ?? []) {
        const val = resolveNode(el, scope);
        if (typeof val !== "number" && typeof val !== "string") return void 0;
        values.push(val);
      }
      if (values.length > 0) arrayProps.set(key, values);
    } else if (key === "ease") {
      ease = tryResolveStringProp(prop.value, scope) ?? ease;
    } else if (key === "easeEach") {
      easeEach = tryResolveStringProp(prop.value, scope) ?? easeEach;
    }
  }
  const maxLen = Math.max(...[...arrayProps.values()].map((a) => a.length), 0);
  const keyframes = [];
  for (let i = 0; i < maxLen; i++) {
    const percentage = maxLen > 1 ? Math.round(i / (maxLen - 1) * 100) : 0;
    const properties = {};
    for (const [key, values] of arrayProps) {
      if (i < values.length) properties[key] = values[i];
    }
    keyframes.push({ percentage, properties });
  }
  return {
    format: "simple-array",
    keyframes,
    ...ease ? { ease } : {},
    ...easeEach ? { easeEach } : {}
  };
}
function parseKeyframesNode(node, scope, source) {
  if (!node) return void 0;
  if (node.type === "ArrayExpression") {
    return parseObjectArrayKeyframes(node, scope, source);
  }
  if (node.type !== "ObjectExpression") return void 0;
  const props = node.properties ?? [];
  if (!props.every((p) => staticKeyName(p) !== void 0)) return void 0;
  let hasPercentageKey = false;
  let hasArrayValue = false;
  for (const prop of props) {
    if (prop.type !== "ObjectProperty" && prop.type !== "Property") continue;
    const key = prop.key?.value ?? prop.key?.name;
    if (typeof key === "string" && PERCENTAGE_KEY_RE.test(key)) {
      hasPercentageKey = true;
      break;
    }
    if (prop.value?.type === "ArrayExpression") {
      hasArrayValue = true;
    }
  }
  if (hasPercentageKey) return parsePercentageKeyframes(node, scope, source);
  if (hasArrayValue) return parseSimpleArrayKeyframes(node, scope);
  return void 0;
}
function parseMotionPathNode(node, scope, source) {
  if (!node) return void 0;
  let pathNode;
  let autoRotate = false;
  let curviness = 1;
  let isCubic = false;
  if (node.type === "ObjectExpression") {
    for (const prop of node.properties ?? []) {
      if (!isObjectProperty(prop)) continue;
      const key = propKeyName(prop);
      if (key === "path") pathNode = prop.value;
      else if (key === "autoRotate") {
        const val = resolveNode(prop.value, scope);
        autoRotate = typeof val === "number" ? val : val === true;
      } else if (key === "curviness") {
        const val = resolveNode(prop.value, scope);
        if (typeof val === "number") curviness = val;
      } else if (key === "type") {
        const val = resolveNode(prop.value, scope);
        if (val === "cubic") isCubic = true;
      }
    }
  } else if (node.type === "ArrayExpression") {
    pathNode = node;
  }
  if (!pathNode || pathNode.type !== "ArrayExpression") return void 0;
  const elements = pathNode.elements ?? [];
  const coords = [];
  for (const elem of elements) {
    if (!elem || elem.type !== "ObjectExpression") continue;
    const rec = objectExpressionToRecord(elem, scope, source);
    const x = typeof rec.x === "number" ? rec.x : void 0;
    const y = typeof rec.y === "number" ? rec.y : void 0;
    if (x !== void 0 && y !== void 0) coords.push({ x, y });
  }
  return buildArcPath(coords, curviness, autoRotate, isCubic);
}
function tweenCallToAnimation(call, scope, source, identifierBindings) {
  const provenance = readProvenance(call.node);
  const vars = objectExpressionToRecord(call.varsArg, scope, source);
  const properties = {};
  const extras = {};
  let keyframesData;
  let hasUnresolvedKeyframes = false;
  let motionPathResult;
  for (const [key, val] of Object.entries(vars)) {
    if (BUILTIN_VAR_KEYS.has(key)) continue;
    if (DROPPED_VAR_KEYS.has(key)) continue;
    if (key === "keyframes") {
      const kfNode = findPropertyNode(call.varsArg, "keyframes");
      keyframesData = parseKeyframesNode(kfNode, scope, source);
      if (!keyframesData && kfNode) hasUnresolvedKeyframes = true;
      continue;
    }
    if (key === "motionPath") {
      const mpNode = findPropertyNode(call.varsArg, "motionPath");
      motionPathResult = parseMotionPathNode(mpNode, scope, source);
      continue;
    }
    if (key === "easeEach") continue;
    if (EXTRAS_KEYS.has(key)) {
      const rawSource = extractRawPropertySource(call.varsArg, key, source);
      if (rawSource !== void 0) {
        extras[key] = `__raw:${rawSource}`;
      } else if (val !== void 0) {
        extras[key] = val;
      }
      continue;
    }
    if (typeof val === "number" || typeof val === "string") {
      properties[key] = val;
    }
  }
  if (motionPathResult) {
    const { waypoints } = motionPathResult;
    if (!keyframesData) {
      const kf = waypoints.map((wp, i) => ({
        percentage: waypoints.length > 1 ? Math.round(i / (waypoints.length - 1) * 100) : 0,
        properties: { x: wp.x, y: wp.y }
      }));
      keyframesData = { format: "percentage", keyframes: kf, fromMotionPath: true };
    } else {
      const kfs = keyframesData.keyframes;
      if (kfs.length === waypoints.length) {
        for (let i = 0; i < kfs.length; i++) {
          const kf = kfs[i];
          const wp = waypoints[i];
          if (kf && wp) {
            kf.properties.x = wp.x;
            kf.properties.y = wp.y;
          }
        }
      }
    }
  }
  let fromProperties;
  if (call.method === "fromTo" && call.fromArg) {
    fromProperties = {};
    const fromVars = objectExpressionToRecord(call.fromArg, scope, source);
    for (const [key, val] of Object.entries(fromVars)) {
      if (typeof val === "number" || typeof val === "string") {
        fromProperties[key] = val;
      }
    }
  }
  const hasPositionArg = !!call.positionArg;
  const posVal = hasPositionArg ? extractLiteralValue(call.positionArg, scope) : 0;
  const position = typeof posVal === "number" ? posVal : typeof posVal === "string" ? posVal : hasPositionArg ? `__raw:${source.slice(call.positionArg.start, call.positionArg.end)}` : 0;
  let duration = typeof vars.duration === "number" ? vars.duration : void 0;
  const ease = typeof vars.ease === "string" ? vars.ease : void 0;
  const durationUnresolved = call.method !== "set" && duration === void 0 && hasUnknownDuration(call.varsArg, scope);
  if (duration === void 0 && keyframesData && !durationUnresolved) {
    duration = computeKeyframesTotalDuration(call.varsArg, scope, source);
  }
  let selector = call.selector;
  let targetIdentity;
  if (selector === "__unresolved__") {
    const targetNode = call.node.arguments?.[0];
    const proxyLabel = describeProxyTarget(targetNode, call.varsArg, scope);
    if (proxyLabel) {
      selector = proxyLabel;
      if (targetNode?.type === "Identifier") {
        const declaration = findVisibleIdentifierDeclaration(
          targetNode.name,
          call.ancestors,
          identifierBindings,
          call.node.start
        );
        if (declaration?.node.init?.type === "ObjectExpression" && !identifierBindings.reassignedDeclarations.has(declaration.node)) {
          const declarationProvenance = readProvenance(declaration.scopeNode) ?? readProvenance(declaration.expandedScopeNode);
          const instanceIdentity = declarationProvenance && (declarationProvenance.kind === "helper" || declarationProvenance.kind === "loop") ? `:${declarationProvenance.kind}:${declarationProvenance.callSite ?? ""}:${declarationProvenance.iteration ?? ""}` : "";
          targetIdentity = `proxy:${targetNode.name}@${declaration.node.start}${instanceIdentity}`;
        }
      }
    }
  }
  const anim = {
    targetSelector: selector,
    method: call.method,
    position,
    properties,
    fromProperties,
    duration,
    ease
  };
  if (targetIdentity) anim.targetIdentity = targetIdentity;
  if (!hasPositionArg) anim.implicitPosition = true;
  let group = classifyTweenPropertyGroup(properties);
  if (!group && keyframesData) {
    const kfProps = {};
    for (const kf of keyframesData.keyframes) {
      for (const k of Object.keys(kf.properties)) kfProps[k] = true;
    }
    group = classifyTweenPropertyGroup(kfProps);
  }
  if (group) anim.propertyGroup = group;
  if (call.global) anim.global = true;
  if (Object.keys(extras).length > 0) anim.extras = extras;
  if (keyframesData) anim.keyframes = keyframesData;
  if (motionPathResult) anim.arcPath = motionPathResult.arcPath;
  if (hasUnresolvedKeyframes) anim.hasUnresolvedKeyframes = true;
  if (durationUnresolved) anim.durationUnresolved = true;
  if (selector === "__unresolved__") anim.hasUnresolvedSelector = true;
  if (call.selectorPartial) anim.hasPartialSelector = true;
  if (provenance) anim.provenance = provenance;
  return anim;
}
function resolvePositionString(pos, cursor, prevStart) {
  const trimmed = pos.trim();
  if (trimmed === "") return cursor;
  if (trimmed.startsWith("+=")) {
    const n2 = Number.parseFloat(trimmed.slice(2));
    return Number.isFinite(n2) ? cursor + n2 : null;
  }
  if (trimmed.startsWith("-=")) {
    const n2 = Number.parseFloat(trimmed.slice(2));
    return Number.isFinite(n2) ? cursor - n2 : null;
  }
  if (trimmed === "<") return prevStart;
  if (trimmed === ">") return cursor;
  if (trimmed.startsWith("<")) {
    const n2 = Number.parseFloat(trimmed.slice(1));
    return Number.isFinite(n2) ? prevStart + n2 : null;
  }
  if (trimmed.startsWith(">")) {
    const n2 = Number.parseFloat(trimmed.slice(1));
    return Number.isFinite(n2) ? cursor + n2 : null;
  }
  const n = Number.parseFloat(trimmed);
  return Number.isFinite(n) ? n : null;
}
function applyTimelineDefaults(anims, defaults) {
  if (!defaults) return;
  for (const anim of anims) {
    if (anim.method === "set") continue;
    if (anim.duration === void 0 && !anim.durationUnresolved) {
      if (defaults.duration !== void 0) anim.duration = defaults.duration;
      else if (defaults.durationUnresolved) anim.durationUnresolved = true;
    }
    if (anim.ease === void 0 && defaults.ease !== void 0 && (!anim.keyframes || anim.keyframes.fromMotionPath)) {
      anim.ease = defaults.ease;
    }
  }
}
function resolveLabelPosition(pos, labels, cursor) {
  const m = /^([A-Za-z_$][\w$]*)\s*(?:([+-])=\s*([\d.]+))?$/.exec(pos.trim());
  if (!m) return null;
  const name = m[1];
  let base = labels.get(name);
  if (base === void 0) {
    base = cursor;
    labels.set(name, base);
  }
  if (m[2] && m[3]) {
    const n = Number.parseFloat(m[3]);
    if (Number.isFinite(n)) return m[2] === "+" ? base + n : base - n;
  }
  return base;
}
function resolveAnimStart(anim, cursor, prevStart, labels) {
  if (anim.implicitPosition) return cursor;
  if (typeof anim.position === "number") return anim.position;
  if (typeof anim.position === "string") {
    return resolveLabelPosition(anim.position, labels, cursor) ?? resolvePositionString(anim.position, cursor, prevStart);
  }
  return cursor;
}
function resolveTimelinePositions(anims, labelDefs = []) {
  let cursor = 0;
  let prevStart = 0;
  let cursorKnown = true;
  const labels = /* @__PURE__ */ new Map();
  let labelIdx = 0;
  const sortedLabels = [...labelDefs].sort((a, b) => a.order - b.order);
  const defineLabel = (def) => {
    let value;
    if (typeof def.position === "number") value = def.position;
    else if (!cursorKnown) return;
    else if (typeof def.position === "string") {
      value = resolveLabelPosition(def.position, labels, cursor) ?? cursor;
    } else value = cursor;
    labels.set(def.name, Math.max(0, value));
  };
  anims.forEach((anim, i) => {
    while (labelIdx < sortedLabels.length && sortedLabels[labelIdx].order <= i) {
      defineLabel(sortedLabels[labelIdx]);
      labelIdx++;
    }
    if (anim.method === "set" && anim.global) {
      anim.resolvedStart = 0;
      return;
    }
    const duration = anim.method === "set" ? 0 : anim.duration ?? GSAP_DEFAULT_DURATION;
    const readsCursor = anim.implicitPosition || typeof anim.position !== "number";
    const start = cursorKnown || !readsCursor ? resolveAnimStart(anim, cursor, prevStart, labels) : null;
    if (start == null || anim.durationUnresolved) cursorKnown = false;
    if (start != null) {
      anim.resolvedStart = Math.max(0, start);
      prevStart = anim.resolvedStart;
      cursor = Math.max(cursor, anim.resolvedStart + duration);
    }
  });
  while (labelIdx < sortedLabels.length) defineLabel(sortedLabels[labelIdx++]);
}
function collectAddLabelDefs(ast, ref, scope, sortedCalls) {
  const callKeys = sortedCalls.map((c) => ({
    site: callSiteStart(c),
    order: c.node.__hfOrder
  }));
  const comesAfter = (site, order, labelSite, labelOrder) => {
    if (site === void 0) return false;
    if (site !== labelSite) return site > labelSite;
    return (order ?? -Infinity) > (labelOrder ?? -Infinity);
  };
  const defs = [];
  simple(ast, {
    // fallow-ignore-next-line complexity
    CallExpression(node) {
      const callee = node.callee;
      const objMatches = ref.kind === "identifier" ? callee.object?.type === "Identifier" && callee.object.name === ref.name : sameMemberAccess(callee.object, ref.node);
      if (callee?.type !== "MemberExpression" || !objMatches || callee.property?.name !== "addLabel")
        return;
      const nameNode = node.arguments?.[0];
      const name = typeof nameNode?.value === "string" ? nameNode.value : void 0;
      if (!name) return;
      const posVal = resolveNode(node.arguments?.[1], scope);
      const position = typeof posVal === "number" || typeof posVal === "string" ? posVal : void 0;
      const labelStart = node.__hfSiteStart ?? callee.property?.start;
      const labelOrder = node.__hfOrder;
      let order = sortedCalls.length;
      if (labelStart !== void 0) {
        order = callKeys.findIndex((k) => comesAfter(k.site, k.order, labelStart, labelOrder));
        if (order === -1) order = sortedCalls.length;
      }
      defs.push({ name, position, order });
    }
  });
  return defs;
}
function compareByLoc(a, b) {
  const aLoc = a.node.callee?.property?.loc?.start;
  const bLoc = b.node.callee?.property?.loc?.start;
  if (!aLoc || !bLoc) return 0;
  return aLoc.line - bLoc.line || aLoc.column - bLoc.column;
}
function callSiteStart(call) {
  return call.node.__hfSiteStart ?? call.node.callee?.property?.start;
}
function compareCallOrder(a, b) {
  const aSite = callSiteStart(a);
  const bSite = callSiteStart(b);
  if (aSite !== void 0 && bSite !== void 0 && aSite !== bSite) return aSite - bSite;
  const ao = a.node.__hfOrder;
  const bo = b.node.__hfOrder;
  if (ao !== void 0 && bo !== void 0) return ao - bo;
  return compareByLoc(a, b);
}
function sortBySourcePosition(calls) {
  calls.sort(compareCallOrder);
}
function assignStableIds(anims) {
  const counts = /* @__PURE__ */ new Map();
  return anims.map((anim) => {
    const posKey = typeof anim.position === "number" ? String(Math.round(anim.position * 1e3)) : String(anim.position);
    const groupSuffix = anim.propertyGroup ? `-${anim.propertyGroup}` : "";
    const base = `${anim.targetSelector}-${anim.method}-${posKey}${groupSuffix}`;
    const count = (counts.get(base) ?? 0) + 1;
    counts.set(base, count);
    const id = count === 1 ? base : `${base}-${count}`;
    return { ...anim, id };
  });
}
function parseGsapScriptAcornForWrite(script) {
  try {
    const ast = parse(script, {
      ecmaVersion: "latest",
      sourceType: "script",
      locations: true
    });
    const scope = collectScopeBindings(ast);
    const identifierBindings = collectIdentifierBindingIndex(ast);
    const targetBindings = collectTargetBindings(ast, scope, identifierBindings);
    const detection = findTimelineVar(ast, scope);
    const ref = detection.ref ?? { kind: "identifier", name: "tl" };
    const timelineVar = timelineRootSource(ref, script);
    const calls = findAllTweenCalls(ast, ref, scope, targetBindings);
    sortBySourcePosition(calls);
    const rawAnims = calls.map(
      (call) => tweenCallToAnimation(call, scope, script, identifierBindings)
    );
    applyTimelineDefaults(rawAnims, detection.defaults);
    resolveTimelinePositions(rawAnims, collectAddLabelDefs(ast, ref, scope, calls));
    const animations = assignStableIds(rawAnims);
    const located = calls.map((call, i) => ({
      id: animations[i].id,
      call,
      animation: animations[i]
    }));
    return { ast, timelineVar, hasTimeline: detection.ref !== null, located };
  } catch {
    return null;
  }
}
function clipTweenMatcher(clipSelectors, root, queries = /* @__PURE__ */ new Map()) {
  const own = typeof clipSelectors === "string" ? [clipSelectors] : clipSelectors;
  if (!root)
    return ({ targetSelector, hasPartialSelector }) => !hasPartialSelector && own.includes(targetSelector);
  const queryAll = (selector) => {
    if (ID_SELECTOR.test(selector)) {
      if (!queries.has(ALL_IDS)) indexIds(root, queries);
      return queries.get(selector) ?? [];
    }
    let found = queries.get(selector);
    if (!found) queries.set(selector, found = queryRoot(root, selector));
    return found;
  };
  const clips = own.flatMap((selector) => queryAll(selector));
  return ({ targetSelector, hasPartialSelector }) => {
    if (hasPartialSelector) return false;
    if (own.includes(targetSelector)) return true;
    if (clips.length === 0) return false;
    const targets = queryAll(targetSelector);
    return targets.length > 0 && targets.every((target) => {
      const owner = target.closest("[data-start]");
      return clips.includes(target) || owner !== null && clips.includes(owner);
    });
  };
}
function clipQueryRoot(script) {
  return script.closest("template") ?? script.ownerDocument;
}
function hasExplicitTime(animation) {
  return typeof animation.position === "number" && !animation.implicitPosition;
}
var ID_SELECTOR = /^#-?[A-Za-z_][\w-]*$/;
var ALL_IDS = "[id]";
function indexIds(root, queries) {
  const all = queryRoot(root, ALL_IDS);
  queries.set(ALL_IDS, all);
  for (const el of all) {
    const key = `#${el.id}`;
    if (!ID_SELECTOR.test(key)) continue;
    const list = queries.get(key);
    if (list) list.push(el);
    else queries.set(key, [el]);
  }
}
function queryRoot(root, selector) {
  try {
    return Array.from(root.querySelectorAll(selector));
  } catch {
    return [];
  }
}
function valueToCode(value) {
  if (typeof value === "string" && value.startsWith("__raw:")) return value.slice(6);
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return Number.isNaN(value) ? "0" : String(value);
  if (typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}
function safeKey(key) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}
function buildTweenStatementCode(timelineVar, anim) {
  const selector = JSON.stringify(anim.targetSelector);
  const props = { ...anim.properties };
  if (anim.method !== "set" && anim.duration !== void 0) props.duration = anim.duration;
  if (anim.ease) props.ease = anim.ease;
  const entries = Object.entries(props).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`);
  const emitted = new Set(Object.keys(props));
  if (anim.extras) {
    for (const [k, v] of Object.entries(anim.extras)) {
      if (emitted.has(k)) continue;
      emitted.add(k);
      entries.push(`${safeKey(k)}: ${valueToCode(v)}`);
    }
  }
  const objCode = `{ ${entries.join(", ")} }`;
  const posCode = valueToCode(
    typeof anim.position === "number" ? anim.position : anim.position ?? 0
  );
  if (anim.method === "fromTo") {
    const fromEntries = Object.entries(anim.fromProperties ?? {}).map(
      ([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`
    );
    return `${timelineVar}.fromTo(${selector}, { ${fromEntries.join(", ")} }, ${objCode}, ${posCode});`;
  }
  if (anim.method === "set" && anim.global) {
    return `gsap.set(${selector}, ${objCode});`;
  }
  return `${timelineVar}.${anim.method}(${selector}, ${objCode}, ${posCode});`;
}
function isObjectProperty2(prop) {
  return prop?.type === "ObjectProperty" || prop?.type === "Property";
}
function propKeyName2(prop) {
  return prop?.key?.name ?? prop?.key?.value;
}
function findPropertyNode2(varsArgNode, key) {
  if (varsArgNode?.type !== "ObjectExpression") return void 0;
  for (const prop of varsArgNode.properties ?? []) {
    if (!isObjectProperty2(prop)) continue;
    if (propKeyName2(prop) === key) return prop;
  }
  return void 0;
}
function keyframesObjectNode(varsNode) {
  const kfProp = findPropertyNode2(varsNode, "keyframes");
  return kfProp?.value?.type === "ObjectExpression" ? kfProp.value : null;
}
function findEnclosingExpressionStatement(ancestors) {
  for (let i = ancestors.length - 2; i >= 0; i--) {
    if (ancestors[i]?.type === "ExpressionStatement") return ancestors[i];
  }
  return null;
}
function findTimelineDeclarationStatement(ast, timelineVar) {
  let found = null;
  simple(ast, {
    // fallow-ignore-next-line complexity
    VariableDeclaration(node) {
      if (found) return;
      for (const decl of node.declarations ?? []) {
        if (decl.id?.name === timelineVar && decl.init?.type === "CallExpression" && decl.init.callee?.type === "MemberExpression" && decl.init.callee.object?.name === "gsap" && decl.init.callee.property?.name === "timeline") {
          found = node;
        }
      }
    }
  });
  return found;
}
function removeProp(ms, propNode, editableProps) {
  const idx = editableProps.indexOf(propNode);
  if (idx === -1) return;
  if (editableProps.length === 1) {
    ms.remove(propNode.start, propNode.end);
  } else if (idx === 0) {
    ms.remove(editableProps[0].start, editableProps[1].start);
  } else {
    ms.remove(editableProps[idx - 1].end, propNode.end);
  }
}
function buildVarsObjectCode(record) {
  const entries = Object.entries(record).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`);
  return entries.length > 0 ? `{ ${entries.join(", ")} }` : "{}";
}
function overwriteVarsArg(ms, call, objCode) {
  if (!call.varsArg) return;
  ms.overwrite(call.varsArg.start, call.varsArg.end, objCode);
}
function upsertProp(ms, objNode, key, value) {
  if (objNode?.type !== "ObjectExpression") return;
  const existing = findPropertyNode2(objNode, key);
  if (existing) {
    ms.overwrite(existing.value.start, existing.value.end, valueToCode(value));
  } else {
    const sep5 = objNode.properties.length > 0 ? ", " : "";
    ms.appendLeft(objNode.end - 1, `${sep5}${safeKey(key)}: ${valueToCode(value)}`);
  }
}
function isEditableVarKey(key) {
  return !isTweenConfigKey(key);
}
function preservedEntries(objNode, source, drop, overrides) {
  const entries = [];
  const keys = /* @__PURE__ */ new Set();
  for (const prop of objNode.properties ?? []) {
    if (!isObjectProperty2(prop)) continue;
    const key = propKeyName2(prop);
    if (typeof key !== "string" || drop(key)) continue;
    keys.add(key);
    const code = key in overrides ? valueToCode(overrides[key]) : source.slice(prop.value.start, prop.value.end);
    entries.push(`${safeKey(key)}: ${code}`);
  }
  return { entries, keys };
}
function reconcileEditableProps(ms, objNode, source, newProps, nonEditableOverrides) {
  if (objNode?.type !== "ObjectExpression") return;
  const overrides = nonEditableOverrides ?? {};
  const { entries, keys } = preservedEntries(objNode, source, isEditableVarKey, overrides);
  for (const [key, value] of Object.entries(overrides)) {
    if (!keys.has(key)) {
      keys.add(key);
      entries.push(`${safeKey(key)}: ${valueToCode(value)}`);
    }
  }
  for (const [key, value] of Object.entries(newProps)) {
    if (!keys.has(key)) entries.push(`${safeKey(key)}: ${valueToCode(value)}`);
  }
  ms.overwrite(objNode.start, objNode.end, `{ ${entries.join(", ")} }`);
}
function findInsertionPoint(parsed) {
  const tlDecl = findTimelineDeclarationStatement(parsed.ast, parsed.timelineVar);
  const lastLocated = parsed.located[parsed.located.length - 1];
  if (lastLocated) {
    const lastCall = lastLocated.call;
    const exprStmt = findEnclosingExpressionStatement(lastCall.ancestors);
    const lastCallEnd = exprStmt?.end ?? lastCall.node.end;
    return Math.max(lastCallEnd, tlDecl?.end ?? 0);
  }
  if (!parsed.hasTimeline) return null;
  return tlDecl?.end ?? parsed.ast.end;
}
function findGlobalSetInsertionPoint(parsed, script) {
  const tlDecl = findTimelineDeclarationStatement(parsed.ast, parsed.timelineVar);
  if (!tlDecl) return null;
  return script.lastIndexOf("\n", tlDecl.start) + 1;
}
function updateAnimationInScript(script, animationId, updates) {
  if (!Object.keys(updates).length) return script;
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target || updates.properties && target.animation.hasUnresolvedKeyframes) return script;
  const ms = new MagicString(script);
  const { call } = target;
  if (updates.properties) {
    const overrides = {};
    if (updates.duration !== void 0) overrides.duration = updates.duration;
    if (updates.ease !== void 0) overrides.ease = updates.ease;
    if (updates.extras) Object.assign(overrides, updates.extras);
    reconcileEditableProps(ms, call.varsArg, script, updates.properties, overrides);
  } else {
    if (updates.duration !== void 0) {
      upsertProp(ms, call.varsArg, "duration", updates.duration);
    }
    const easeValue = updates.easeEach ?? updates.ease;
    if (easeValue !== void 0) {
      const kfNode = keyframesObjectNode(call.varsArg);
      if (kfNode) {
        upsertProp(ms, kfNode, "easeEach", easeValue);
        if (updates.resetKeyframeEases) {
          for (const kfEntry of kfNode.properties ?? []) {
            if (!isObjectProperty2(kfEntry)) continue;
            const val = kfEntry.value;
            if (val?.type !== "ObjectExpression") continue;
            const easeNode = findPropertyNode2(val, "ease");
            if (easeNode) removeProp(ms, easeNode, val.properties);
          }
        }
      } else {
        upsertProp(ms, call.varsArg, "ease", easeValue);
      }
    }
    if (updates.extras) {
      for (const [key, value] of Object.entries(updates.extras)) {
        upsertProp(ms, call.varsArg, key, value);
      }
    }
  }
  if (updates.fromProperties && call.method === "fromTo" && call.fromArg) {
    reconcileEditableProps(ms, call.fromArg, script, updates.fromProperties);
  }
  if (updates.position !== void 0) {
    overwritePosition(ms, call, updates.position);
  }
  if (target.animation.method === "set" && target.animation.global) {
    const globalSetPoint = findGlobalSetInsertionPoint(parsed, script);
    const exprStmt = findEnclosingExpressionStatement(call.ancestors);
    if (globalSetPoint !== null && exprStmt && exprStmt.start > globalSetPoint) {
      const lineStart = script.lastIndexOf("\n", exprStmt.start) + 1;
      const moveStart = /^\s*$/.test(script.slice(lineStart, exprStmt.start)) ? lineStart : exprStmt.start;
      const moveEnd = exprStmt.end < script.length && script[exprStmt.end] === "\n" ? exprStmt.end + 1 : exprStmt.end;
      ms.move(moveStart, moveEnd, globalSetPoint);
    }
  }
  return ms.toString();
}
function isolateAnimationsForTargetInScript(script, targetSelector, selectedSelector, remainderSelector) {
  if (!targetSelector || !selectedSelector || !remainderSelector) return script;
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const matches = parsed.located.filter(
    ({ animation }) => animation.targetSelector === targetSelector
  );
  if (matches.length === 0) return script;
  const ms = new MagicString(script);
  const appendedByStatement = /* @__PURE__ */ new Map();
  for (const { call } of matches) {
    const args = call.node.arguments;
    const targetArg = args[0];
    if (!targetArg) continue;
    ms.overwrite(targetArg.start, targetArg.end, JSON.stringify(remainderSelector));
    const clonedArgs = [
      JSON.stringify(selectedSelector),
      ...args.slice(1).map((arg) => script.slice(arg.start, arg.end))
    ].join(", ");
    const owner = call.global ? "gsap" : parsed.timelineVar;
    const clonedCall = `${owner}.${call.method}(${clonedArgs});`;
    const statement = findEnclosingExpressionStatement(call.ancestors);
    if (!statement) continue;
    const clones = appendedByStatement.get(statement) ?? [];
    clones.push(clonedCall);
    appendedByStatement.set(statement, clones);
  }
  for (const [statement, clones] of appendedByStatement) {
    ms.appendRight(statement.end, `
${clones.join("\n")}`);
  }
  return ms.toString();
}
function overwritePosition(ms, call, position) {
  if (call.positionArg) {
    ms.overwrite(call.positionArg.start, call.positionArg.end, valueToCode(position));
  } else {
    const last = call.node.arguments.at(-1);
    ms.appendLeft(last ? last.end : call.node.end - 1, `, ${valueToCode(position)}`);
  }
}
var isLiveRetime = (r) => r.kind === "shift" || r.oldDuration > 0 && r.newDuration > 0;
function applyRetime(animation, retime) {
  if (retime.kind === "shift") {
    if (!hasExplicitTime(animation)) return { position: false, duration: false };
    animation.position = shiftedPosition(animation.position, retime.delta);
    return { position: true, duration: false };
  }
  const touched = { position: false, duration: false };
  if (!isLiveRetime(retime) || typeof animation.position !== "number") return touched;
  const ratio = retime.newDuration / retime.oldDuration;
  if (hasExplicitTime(animation)) {
    const scaled2 = retime.newStart + (animation.position - retime.oldStart) * ratio;
    animation.position = Math.max(0, Math.round(scaled2 * 1e3) / 1e3);
    touched.position = true;
  }
  if (typeof animation.duration === "number" && animation.duration > 0) {
    animation.duration = Math.max(1e-3, Math.round(animation.duration * ratio * 1e3) / 1e3);
    touched.duration = true;
  }
  return touched;
}
function retimeClipTweensInScript(script, retimes, root) {
  const changed = retimes.map(() => false);
  const parsed = retimes.some(isLiveRetime) ? parseGsapScriptAcornForWrite(script) : null;
  if (!parsed) return { script, changed };
  const queries = /* @__PURE__ */ new Map();
  const matchers = retimes.map((r) => clipTweenMatcher(r.targetSelector, root, queries));
  const ms = new MagicString(script);
  let wrote = false;
  for (const entry of parsed.located) {
    const animation = { ...entry.animation };
    let position = false;
    let duration = false;
    retimes.forEach((retime, i) => {
      if (!matchers[i](animation)) return;
      const before = [animation.position, animation.duration];
      const touched = applyRetime(animation, retime);
      position ||= touched.position;
      duration ||= touched.duration;
      if (before[0] !== animation.position || before[1] !== animation.duration) changed[i] = true;
    });
    if (position) overwritePosition(ms, entry.call, animation.position);
    if (duration) upsertProp(ms, entry.call.varsArg, "duration", animation.duration);
    wrote ||= position || duration;
  }
  return { script: wrote ? ms.toString() : script, changed };
}
function inBlock(call, statement) {
  return Array.isArray(call.ancestors[call.ancestors.indexOf(statement) - 1]?.body);
}
function shiftedPosition(position, delta) {
  return Math.max(0, Math.round((position + delta) * 1e3) / 1e3);
}
function addAnimationToScript(script, animation) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return { script, id: "" };
  const ms = new MagicString(script);
  const statementCode = buildTweenStatementCode(parsed.timelineVar, animation);
  const globalSetPoint = animation.method === "set" && animation.global ? findGlobalSetInsertionPoint(parsed, script) : null;
  if (globalSetPoint !== null) {
    ms.appendLeft(globalSetPoint, statementCode + "\n");
  } else {
    const insertionPoint = findInsertionPoint(parsed);
    if (insertionPoint === null) return { script, id: "" };
    ms.appendLeft(insertionPoint, "\n" + statementCode);
  }
  const result = ms.toString();
  const reParsed = parseGsapScriptAcornForWrite(result);
  const oldIdCounts = /* @__PURE__ */ new Map();
  for (const entry of parsed.located) {
    oldIdCounts.set(entry.id, (oldIdCounts.get(entry.id) ?? 0) + 1);
  }
  let newId = "";
  for (const entry of reParsed?.located ?? []) {
    const remaining = oldIdCounts.get(entry.id) ?? 0;
    if (remaining === 0) {
      newId = entry.id;
      break;
    }
    oldIdCounts.set(entry.id, remaining - 1);
  }
  return { script: result, id: newId };
}
function removeCallFromMagicString(ms, call, script) {
  const N = call.node;
  const exprStmt = findEnclosingExpressionStatement(call.ancestors);
  if (N.callee?.object?.type !== "CallExpression" && exprStmt?.expression === N) {
    const end = exprStmt.end < script.length && script[exprStmt.end] === "\n" ? exprStmt.end + 1 : exprStmt.end;
    ms.remove(exprStmt.start, end);
  } else {
    ms.remove(N.callee.object.end, N.end);
  }
}
function removeAnimationFromScript(script, animationId) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const ms = new MagicString(script);
  removeCallFromMagicString(ms, target.call, script);
  return ms.toString();
}
function dedupePositionWritesInScript(script, selector, keepId) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const posWrites = parsed.located.filter(
    (l) => l.animation.targetSelector === selector && isXYPositionWrite(l.animation)
  );
  if (posWrites.length <= 1) return script;
  const keeper = posWrites.find((l) => l.id === keepId) ?? posWrites[posWrites.length - 1];
  const ms = new MagicString(script);
  for (const l of posWrites) {
    if (l === keeper) continue;
    removeCallFromMagicString(ms, l.call, script);
  }
  return ms.toString();
}
var CSS_IDENTITY2 = {
  opacity: 1,
  autoAlpha: 1,
  scale: 1,
  scaleX: 1,
  scaleY: 1
};
function cssIdentityValue2(prop) {
  return CSS_IDENTITY2[prop] ?? 0;
}
var NON_EDITABLE_VAR_KEYS = /* @__PURE__ */ new Set([
  "data",
  "duration",
  "delay",
  "onComplete",
  "onStart",
  "onUpdate",
  "onRepeat",
  "stagger",
  "yoyo",
  "repeat",
  "repeatDelay",
  "snap",
  "overwrite",
  "immediateRender"
]);
function identityProps(properties) {
  const identity = {};
  for (const [k, v] of Object.entries(properties)) {
    if (v != null) identity[k] = typeof v === "number" ? cssIdentityValue2(k) : v;
  }
  return identity;
}
function conversionEndpoints(animation) {
  if (animation.method === "from") {
    return { fromProps: { ...animation.properties }, toProps: identityProps(animation.properties) };
  }
  if (animation.method === "fromTo") {
    return {
      fromProps: { ...animation.fromProperties ?? {} },
      toProps: { ...animation.properties }
    };
  }
  return { fromProps: identityProps(animation.properties), toProps: { ...animation.properties } };
}
function preservedVarsEntries(varsNode, source) {
  const entries = [];
  if (varsNode?.type !== "ObjectExpression") return entries;
  for (const prop of varsNode.properties ?? []) {
    if (!isObjectProperty2(prop)) continue;
    const key = propKeyName2(prop);
    if (typeof key !== "string" || !NON_EDITABLE_VAR_KEYS.has(key)) continue;
    entries.push(`${safeKey(key)}: ${source.slice(prop.value.start, prop.value.end)}`);
  }
  return entries;
}
function buildConvertedVarsCode(animation, varsNode, source) {
  const { fromProps, toProps } = conversionEndpoints(animation);
  const easeEach = animation.ease;
  const easeEachEntry = easeEach ? `, easeEach: ${valueToCode(easeEach)}` : "";
  const kfCode = `{ "0%": ${recordToCode(fromProps)}, "100%": ${recordToCode(toProps)}${easeEachEntry} }`;
  const entries = [`keyframes: ${kfCode}`, ...preservedVarsEntries(varsNode, source)];
  if (easeEach) entries.push(`ease: "none"`);
  return `{ ${entries.join(", ")} }`;
}
function convertMethodToTo(ms, animation, call, varsNode) {
  if (animation.method !== "from" && animation.method !== "fromTo") return;
  const calleeProp = call.node.callee?.property;
  if (calleeProp) ms.overwrite(calleeProp.start, calleeProp.end, "to");
  if (animation.method === "fromTo" && call.fromArg) ms.remove(call.fromArg.start, varsNode.start);
}
function convertFlatTweenToKeyframes(script, target) {
  const animation = target.animation;
  if (animation.keyframes || animation.method === "set") return script;
  const call = target.call;
  const varsNode = call.varsArg;
  if (varsNode?.type !== "ObjectExpression") return script;
  const ms = new MagicString(script);
  ms.overwrite(varsNode.start, varsNode.end, buildConvertedVarsCode(animation, varsNode, script));
  convertMethodToTo(ms, animation, call, varsNode);
  return ms.toString();
}
var PERCENTAGE_KEY_RE2 = /^(\d+(?:\.\d+)?)%$/;
var PCT_TOLERANCE = 2;
var MOVE_NOOP_EPSILON_PCT = 0.05;
function percentageFromKey(key) {
  const m = PERCENTAGE_KEY_RE2.exec(key);
  return m ? Number.parseFloat(m[1] ?? "0") : Number.NaN;
}
function recordToCode(record) {
  const entries = Object.entries(record).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`);
  return `{ ${entries.join(", ")} }`;
}
function percentagePropsOf(kfNode) {
  return (kfNode.properties ?? []).filter((p) => {
    if (!isObjectProperty2(p)) return false;
    const key = propKeyName2(p);
    return typeof key === "string" && PERCENTAGE_KEY_RE2.test(key);
  });
}
var LITERAL_NODE_TYPES = /* @__PURE__ */ new Set(["Literal", "NumericLiteral", "StringLiteral"]);
function readValueNode(v, source) {
  if (LITERAL_NODE_TYPES.has(v?.type) && (typeof v.value === "number" || typeof v.value === "string")) {
    return v.value;
  }
  if (v?.type === "UnaryExpression" && v.operator === "-" && typeof v.argument?.value === "number") {
    return -v.argument.value;
  }
  return `__raw:${source.slice(v.start, v.end)}`;
}
function valueNodeToRecord(valueNode, source) {
  const record = {};
  if (valueNode?.type !== "ObjectExpression") return record;
  for (const prop of valueNode.properties ?? []) {
    if (!isObjectProperty2(prop)) continue;
    const key = propKeyName2(prop);
    if (typeof key !== "string") continue;
    record[key] = readValueNode(prop.value, source);
  }
  return record;
}
function recordHasAuto(record) {
  return "_auto" in record;
}
function autoEndpointOverwrites(kfNode, source, percentage, properties) {
  const result = /* @__PURE__ */ new Map();
  if (percentage <= 0 || percentage >= 100) return result;
  const pctProps = percentagePropsOf(kfNode);
  const allPcts = pctProps.map((p) => percentageFromKey(propKeyName2(p) ?? "")).filter((n) => !Number.isNaN(n) && n !== percentage).sort((a, b) => a - b);
  const leftNeighbor = allPcts.filter((p) => p < percentage).pop();
  const rightNeighbor = allPcts.find((p) => p > percentage);
  for (const endPct of [0, 100]) {
    const isNeighbor = endPct === 0 ? leftNeighbor === 0 : rightNeighbor === 100;
    if (!isNeighbor) continue;
    const endProp = pctProps.find((p) => percentageFromKey(propKeyName2(p) ?? "") === endPct);
    if (!endProp) continue;
    const rec = valueNodeToRecord(endProp.value, source);
    if (!recordHasAuto(rec)) continue;
    result.set(endProp, { ...properties, _auto: 1 });
  }
  return result;
}
function findKfPropByPct(kfNode, percentage) {
  const props = kfNode.properties ?? [];
  let best = null;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (!isObjectProperty2(prop)) continue;
    const key = propKeyName2(prop);
    if (typeof key !== "string") continue;
    const dist = Math.abs(percentageFromKey(key) - percentage);
    if (dist <= PCT_TOLERANCE && dist < bestDist) {
      best = { prop, idx: i };
      bestDist = dist;
    }
  }
  return best;
}
function updateMotionPathPosition(script, target, percentage, properties) {
  const waypoints = extractArcWaypoints(target.animation);
  if (waypoints.length < 2) return void 0;
  const pointIndex = Math.max(
    0,
    Math.min(waypoints.length - 1, Math.round(percentage / 100 * (waypoints.length - 1)))
  );
  const current = waypoints[pointIndex];
  if (!current) return void 0;
  const x = properties.x ?? current.x;
  const y = properties.y ?? current.y;
  if (typeof x !== "number" || typeof y !== "number") return void 0;
  return updateMotionPathPointInScript(script, target.id, pointIndex, { x, y });
}
function updateTweenEase(script, animationId, ease) {
  const reparsed = parseGsapScriptAcornForWrite(script);
  const target = reparsed?.located.find((entry) => entry.id === animationId);
  if (!target) return void 0;
  const ms = new MagicString(script);
  upsertProp(ms, target.call.varsArg, "ease", ease);
  return ms.toString();
}
function updateMotionPathKeyframe(script, target, percentage, properties, ease) {
  if (!target.animation.arcPath?.enabled || !findPropertyNode2(target.call.varsArg, "motionPath")) {
    return void 0;
  }
  const propertyKeys = Object.keys(properties);
  if (propertyKeys.some((key) => key !== "x" && key !== "y")) return void 0;
  const next = propertyKeys.length === 0 ? script : updateMotionPathPosition(script, target, percentage, properties);
  if (next === void 0 || ease === void 0) return next;
  return updateTweenEase(next, target.id, ease);
}
function updateObjectKeyframe(script, prop, properties, ease) {
  const ms = new MagicString(script);
  if (prop.value?.type === "ObjectExpression") {
    for (const [key, value] of Object.entries(properties)) {
      upsertProp(ms, prop.value, key, value);
    }
    if (ease !== void 0) upsertProp(ms, prop.value, "ease", ease);
  } else {
    const record = { ...properties };
    if (ease) record.ease = ease;
    ms.overwrite(prop.value.start, prop.value.end, recordToCode(record));
  }
  return ms.toString();
}
function updateKeyframeInScript(script, animationId, percentage, properties, ease) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target || target.animation.hasUnresolvedKeyframes) return script;
  const kfPropNode = findPropertyNode2(target.call.varsArg, "keyframes");
  if (!kfPropNode) {
    return updateMotionPathKeyframe(script, target, percentage, properties, ease) ?? script;
  }
  if (kfPropNode.value?.type === "ArrayExpression") {
    return updateArrayKeyframeByPct(script, kfPropNode.value, percentage, properties, ease);
  }
  if (kfPropNode.value?.type !== "ObjectExpression") return script;
  const match = findKfPropByPct(kfPropNode.value, percentage);
  if (!match) return script;
  return updateObjectKeyframe(script, match.prop, properties, ease);
}
function updateArrayKeyframeByPct(script, arrayNode, percentage, properties, ease) {
  const elements = (arrayNode.elements ?? []).filter(
    (el2) => !!el2 && el2.type === "ObjectExpression"
  );
  if (elements.length === 0) return script;
  const records = elements.map((element) => valueNodeToRecord(element, script));
  const idx = findObjectArrayKeyframeIndex(
    records.map((record) => record.duration),
    percentage,
    { fallbackToNearest: true }
  );
  if (idx === null) return script;
  const el = elements[idx];
  if (!el) return script;
  const merged = {
    ...records[idx],
    ...properties
  };
  if (ease) merged.ease = ease;
  const ms = new MagicString(script);
  ms.overwrite(el.start, el.end, recordToCode(merged));
  return ms.toString();
}
function buildTargetRecord(existing, source, properties, ease) {
  if (!existing || existing.prop.value?.type !== "ObjectExpression") {
    const record = { ...properties };
    if (ease) record.ease = ease;
    return record;
  }
  const existingRecord = valueNodeToRecord(existing.prop.value, source);
  const existingEase = typeof existingRecord.ease === "string" ? existingRecord.ease : void 0;
  const merged = { ...existingRecord };
  for (const [k, v] of Object.entries(properties)) merged[k] = v;
  const finalEase = ease ?? existingEase;
  if (finalEase) merged.ease = finalEase;
  else delete merged.ease;
  return merged;
}
function backfilledSiblingRecord(valueNode, source, newPropKeys, backfillDefaults) {
  if (valueNode?.type !== "ObjectExpression") return null;
  const record = valueNodeToRecord(valueNode, source);
  let changed = false;
  for (const pk of newPropKeys) {
    const defaultVal = backfillDefaults[pk];
    if (pk in record || defaultVal == null) continue;
    record[pk] = defaultVal;
    changed = true;
  }
  return changed ? record : null;
}
function locateWithKeyframes(script, animationId) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return null;
  const convertedId = animationId.replace(/-from-|-fromTo-/, "-to-");
  const target = parsed.located.find((l) => l.id === animationId) ?? parsed.located.find((l) => l.id === convertedId);
  if (!target || target.animation.hasUnresolvedKeyframes) return null;
  const kfPropNode = findPropertyNode2(target.call.varsArg, "keyframes");
  if (!kfPropNode || kfPropNode.value?.type !== "ObjectExpression") return null;
  return { script, parsed, target, kfNode: kfPropNode.value };
}
function convertArrayKeyframesToObject(script, target) {
  const kfPropNode = findPropertyNode2(target.call.varsArg, "keyframes");
  if (!kfPropNode || kfPropNode.value?.type !== "ArrayExpression") return script;
  const els = (kfPropNode.value.elements ?? []).filter(
    (el) => !!el && el.type === "ObjectExpression"
  );
  if (els.length === 0) return script;
  const records = els.map((element) => valueNodeToRecord(element, script));
  const outerDuration = valueNodeToRecord(target.call.varsArg, script).duration;
  const timing2 = getCompatibleObjectArrayKeyframeTiming(
    records.map((record) => record.duration),
    outerDuration
  );
  if (!timing2) return script;
  const entries = els.map((el, i) => {
    const { duration: _duration, ...record } = records[i];
    return `${JSON.stringify(plainPercentKey(timing2.percentages[i]))}: ${recordToCode(record)}`;
  });
  const ms = new MagicString(script);
  ms.overwrite(
    kfPropNode.value.start,
    kfPropNode.value.end,
    `{ ${entries.join(", ")}, easeEach: "none" }`
  );
  if (findPropertyNode2(target.call.varsArg, "duration") === void 0) {
    upsertProp(ms, target.call.varsArg, "duration", timing2.totalDuration);
  }
  return ms.toString();
}
function ensureKeyframesNode(script, animationId) {
  const direct = locateWithKeyframes(script, animationId);
  if (direct) return direct;
  const parsed = parseGsapScriptAcornForWrite(script);
  const target = parsed?.located.find((l) => l.id === animationId);
  if (!target || target.animation.hasUnresolvedKeyframes) return null;
  const kfProp = findPropertyNode2(target.call.varsArg, "keyframes");
  if (kfProp?.value?.type === "ArrayExpression") {
    const normalized = convertArrayKeyframesToObject(script, target);
    if (normalized !== script) return locateWithKeyframes(normalized, animationId);
    return null;
  }
  const converted = convertFlatTweenToKeyframes(script, target);
  if (converted === script) return null;
  return locateWithKeyframes(converted, animationId);
}
function collectBackfillOverwrites(kfNode, src, properties, backfillDefaults, skip) {
  const result = /* @__PURE__ */ new Map();
  if (!backfillDefaults) return result;
  const newPropKeys = Object.keys(properties);
  for (const prop of percentagePropsOf(kfNode)) {
    if (prop === skip.existingProp || skip.endpoints.has(prop)) continue;
    const rec = backfilledSiblingRecord(prop.value, src, newPropKeys, backfillDefaults);
    if (rec) result.set(prop, rec);
  }
  return result;
}
function addKeyframeToScript(script, animationId, percentage, properties, ease, backfillDefaults) {
  const located = ensureKeyframesNode(script, animationId);
  if (!located) return script;
  const { script: src, kfNode } = located;
  const existing = findKfPropByPct(kfNode, percentage);
  const targetRecord = buildTargetRecord(existing, src, properties, ease);
  const endpointOverwrites = existing ? /* @__PURE__ */ new Map() : autoEndpointOverwrites(kfNode, src, percentage, properties);
  const backfillOverwrites = collectBackfillOverwrites(kfNode, src, properties, backfillDefaults, {
    existingProp: existing?.prop,
    endpoints: endpointOverwrites
  });
  const ms = new MagicString(src);
  if (existing) {
    if (existing.prop.value?.type === "ObjectExpression") {
      for (const [k, v] of Object.entries(properties)) {
        upsertProp(ms, existing.prop.value, k, v);
      }
      if (ease !== void 0) upsertProp(ms, existing.prop.value, "ease", ease);
    } else {
      ms.overwrite(existing.prop.value.start, existing.prop.value.end, recordToCode(targetRecord));
    }
  } else {
    insertNewKeyframe(
      ms,
      kfNode,
      percentage,
      plainPercentKey(percentage),
      recordToCode(targetRecord)
    );
  }
  for (const [prop, rec] of [...endpointOverwrites, ...backfillOverwrites]) {
    ms.overwrite(prop.value.start, prop.value.end, recordToCode(rec));
  }
  return ms.toString();
}
function insertNewKeyframe(ms, kfNode, percentage, pctKey, valueCode) {
  const allProps = (kfNode.properties ?? []).filter((p) => isObjectProperty2(p));
  let insertBeforeProp = null;
  for (const prop of allProps) {
    const key = propKeyName2(prop);
    if (typeof key === "string" && percentageFromKey(key) > percentage) {
      insertBeforeProp = prop;
      break;
    }
  }
  if (insertBeforeProp) {
    ms.appendLeft(insertBeforeProp.start, `${JSON.stringify(pctKey)}: ${valueCode}, `);
  } else {
    const sep5 = allProps.length > 0 ? ", " : "";
    ms.appendLeft(kfNode.end - 1, `${sep5}${JSON.stringify(pctKey)}: ${valueCode}`);
  }
}
function collapseKeyframesToFlat(ms, varsNode, source, remainingRecord) {
  if (varsNode?.type !== "ObjectExpression") return;
  const dropKeyframeKeys = (key) => key === "keyframes" || key === "easeEach";
  const { entries } = preservedEntries(varsNode, source, dropKeyframeKeys, {});
  for (const [k, v] of Object.entries(remainingRecord)) {
    if (k !== "ease") entries.push(`${safeKey(k)}: ${valueToCode(v)}`);
  }
  ms.overwrite(varsNode.start, varsNode.end, `{ ${entries.join(", ")} }`);
}
function removeArrayKeyframe(ms, varsArg, arrNode, script, percentage) {
  const elements = (arrNode.elements ?? []).filter(
    (e) => !!e && e.type === "ObjectExpression"
  );
  if (elements.length === 0) return false;
  const records = elements.map((element) => valueNodeToRecord(element, script));
  const matchIdx = findObjectArrayKeyframeIndex(
    records.map((record) => record.duration),
    percentage
  );
  if (matchIdx === null) return false;
  const remaining = elements.filter((_, i) => i !== matchIdx);
  if (remaining.length < 2) {
    const sole = remaining[0];
    const record = sole ? valueNodeToRecord(sole, script) : {};
    collapseKeyframesToFlat(ms, varsArg, script, record);
    return true;
  }
  removeProp(ms, elements[matchIdx], elements);
  return true;
}
function removeKeyframeFromScript(script, animationId, percentage) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target || target.animation.hasUnresolvedKeyframes) return script;
  const kfPropNode = findPropertyNode2(target.call.varsArg, "keyframes");
  if (!kfPropNode) return script;
  if (kfPropNode.value?.type === "ArrayExpression") {
    const ms2 = new MagicString(script);
    return removeArrayKeyframe(ms2, target.call.varsArg, kfPropNode.value, script, percentage) ? ms2.toString() : script;
  }
  if (kfPropNode.value?.type !== "ObjectExpression") return script;
  const kfNode = kfPropNode.value;
  const match = findKfPropByPct(kfNode, percentage);
  if (!match) return script;
  const ms = new MagicString(script);
  const remaining = percentagePropsOf(kfNode).filter((p) => p !== match.prop);
  if (remaining.length < 2) {
    const sole = remaining[0];
    const record = sole ? valueNodeToRecord(sole.value, script) : {};
    collapseKeyframesToFlat(ms, target.call.varsArg, script, record);
    return ms.toString();
  }
  const allProps = (kfNode.properties ?? []).filter((p) => isObjectProperty2(p));
  removeProp(ms, match.prop, allProps);
  return ms.toString();
}
function moveKeyframeInScript(script, animationId, fromPercentage, toPercentage) {
  const located = ensureKeyframesNode(script, animationId);
  if (!located) return script;
  const { script: src, kfNode } = located;
  const match = findKfPropByPct(kfNode, fromPercentage);
  if (!match) return src;
  if (Math.abs(fromPercentage - toPercentage) < MOVE_NOOP_EPSILON_PCT) return src;
  const dest = findKfPropByPct(kfNode, toPercentage);
  if (dest && dest.prop !== match.prop) return script;
  const entries = [];
  for (const prop of percentagePropsOf(kfNode)) {
    if (prop === match.prop) continue;
    const pct = percentageFromKey(propKeyName2(prop) ?? "");
    if (Number.isNaN(pct)) continue;
    entries.push({ pct, record: valueNodeToRecord(prop.value, src) });
  }
  entries.push({ pct: toPercentage, record: valueNodeToRecord(match.prop.value, src) });
  entries.sort((a, b) => a.pct - b.pct);
  const pctProps = new Set(percentagePropsOf(kfNode));
  const kept = (kfNode.properties ?? []).filter((p) => !pctProps.has(p)).map((p) => src.slice(p.start, p.end));
  const body = [
    ...entries.map((e) => `${JSON.stringify(plainPercentKey(e.pct))}: ${recordToCode(e.record)}`),
    ...kept
  ].join(", ");
  const ms = new MagicString(src);
  ms.overwrite(kfNode.start, kfNode.end, `{ ${body} }`);
  return ms.toString();
}
function editPropertyKeyframeInScript(script, animationId, property, percentage, edit) {
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100 || edit.toPercentage !== void 0 && (!Number.isFinite(edit.toPercentage) || edit.toPercentage < 0 || edit.toPercentage > 100) || typeof edit.value === "number" && !Number.isFinite(edit.value)) throw new Error("Keyframe time and value must be finite and inside the animation");
  const parsed = parseGsapScriptAcornForWrite(script);
  const target = parsed?.located.find((entry) => entry.id === animationId);
  if (!parsed || !target) throw new Error("Animation is no longer available");
  const animation = target.animation;
  const statement = findEnclosingExpressionStatement(target.call.ancestors);
  const kfNode = keyframesObjectNode(target.call.varsArg);
  if (animation.hasUnresolvedKeyframes || animation.hasUnresolvedSelector || animation.provenance && animation.provenance.kind !== "literal" || animation.arcPath?.enabled || !["to", "from", "fromTo"].includes(target.call.method) || statement?.expression !== target.call.node || !inBlock(target.call, statement) || typeof animation.position !== "number") {
    throw new Error("This computed or nested animation is read-only for property keyframes");
  }
  if (!animation.keyframes) {
    if (Object.values(animation.properties).some((value) => typeof value !== "number") || Object.values(animation.fromProperties ?? {}).some((value) => typeof value !== "number") || animation.method !== "fromTo" && !edit.resolvedFromValues)
      throw new Error("The flat animation endpoint must be captured before property editing");
    const index = parsed.located.indexOf(target);
    const converted = convertToKeyframesFromScript(script, animationId, edit.resolvedFromValues);
    const next = parseGsapScriptAcornForWrite(converted)?.located[index];
    if (!next?.animation.keyframes) throw new Error("Unable to convert the animation safely");
    return editPropertyKeyframeInScript(converted, next.id, property, percentage, edit);
  }
  if (!kfNode || animation.keyframes.format !== "percentage" || target.call.method !== "to")
    throw new Error("This animation is read-only for property keyframes");
  const propertyChannels = (value) => new Set([...collectPropertyKeys(value)].filter((key) => key !== "_auto"));
  const channels = propertyChannels(animation);
  if (!channels.has(property) || isTweenConfigKey(property)) throw new Error("Unknown animated property");
  if (edit.action !== "add" && !animation.keyframes?.keyframes.some((frame2) => property in frame2.properties && Math.abs(frame2.percentage - percentage) <= 1e-3))
    throw new Error("This property keyframe is no longer available");
  if (edit.action === "add" && animation.keyframes?.keyframes.some((frame2) => property in frame2.properties && Math.abs(frame2.percentage - percentage) <= 1e-3)) return script;
  let source = script;
  let channelId = animationId;
  if (channels.size > 1) {
    const makeVars = (selected) => {
      const entries2 = target.call.varsArg.properties.map((node) => {
        const key = propKeyName2(node);
        if (key !== "keyframes") {
          if (key && channels.has(key) && key === property !== selected) return null;
          if (key?.startsWith("on")) throw new Error("Animations with callbacks are read-only for property keyframes");
          return script.slice(node.start, node.end);
        }
        const frames = kfNode.properties.map((frame2) => {
          if (Number.isNaN(percentageFromKey(propKeyName2(frame2) ?? ""))) return script.slice(frame2.start, frame2.end);
          const values = frame2.value.properties.filter((value) => {
            const name = propKeyName2(value);
            return name === "ease" || name === "_auto" || name === property === selected;
          });
          if (!values.some((value) => !["ease", "_auto"].includes(propKeyName2(value) ?? ""))) return null;
          return `${script.slice(frame2.key.start, frame2.key.end)}: { ${values.map((value) => script.slice(value.start, value.end)).join(", ")} }`;
        }).filter((value) => value !== null);
        return `keyframes: { ${frames.join(", ")} }`;
      }).filter((value) => value !== null);
      return `{ ${entries2.join(", ")} }`;
    };
    const args = target.call.node.arguments.map((arg) => script.slice(arg.start, arg.end));
    const varsIndex = target.call.node.arguments.indexOf(target.call.varsArg);
    args[varsIndex] = makeVars(true);
    const ms2 = new MagicString(script);
    const remainingVars = makeVars(false);
    const receiver = script.slice(target.call.node.callee.object.start, target.call.node.callee.object.end);
    ms2.overwrite(target.call.varsArg.start, target.call.varsArg.end, remainingVars);
    ms2.appendRight(statement.end, `
${receiver}.to(${args.join(", ")});`);
    const insertedStart = statement.end + remainingVars.length - (target.call.varsArg.end - target.call.varsArg.start) + 1;
    source = ms2.toString();
    const isolated = parseGsapScriptAcornForWrite(source)?.located.find((entry) => entry.call.node.start === insertedStart && entry.animation.targetSelector === animation.targetSelector && entry.animation.position === animation.position && propertyChannels(entry.animation).size === 1 && propertyChannels(entry.animation).has(property));
    if (!isolated) throw new Error("Unable to isolate the property without changing the animation");
    channelId = isolated.id;
  }
  if (edit.action === "remove") return removeKeyframeFromScript(source, channelId, percentage);
  if (edit.action === "move") {
    const toPercentage = edit.toPercentage ?? percentage;
    if (Math.abs(toPercentage - percentage) <= 1e-3) return script;
    const located2 = parseGsapScriptAcornForWrite(source)?.located.find((entry) => entry.id === channelId);
    const keyframes2 = located2 && keyframesObjectNode(located2.call.varsArg);
    if (!keyframes2) throw new Error("Unable to find property keyframes");
    const nodes = percentagePropsOf(keyframes2);
    const moving = nodes.find((node) => Math.abs(percentageFromKey(propKeyName2(node) ?? "") - percentage) <= 1e-3);
    if (!moving) throw new Error("This property keyframe is no longer available");
    if (nodes.some((node) => node !== moving && Math.abs(percentageFromKey(propKeyName2(node) ?? "") - toPercentage) <= 1e-3))
      throw new Error("A keyframe for this property already exists at that time");
    const entries2 = nodes.map((node) => ({
      pct: node === moving ? toPercentage : percentageFromKey(propKeyName2(node) ?? ""),
      value: source.slice(node.value.start, node.value.end)
    })).sort((a, b) => a.pct - b.pct);
    const percentageNodes2 = new Set(nodes);
    const config2 = keyframes2.properties.filter((node) => !percentageNodes2.has(node)).map((node) => source.slice(node.start, node.end));
    const ms2 = new MagicString(source);
    ms2.overwrite(keyframes2.start, keyframes2.end, `{ ${[
      ...entries2.map((entry) => `${JSON.stringify(plainPercentKey(entry.pct))}: ${entry.value}`),
      ...config2
    ].join(", ")} }`);
    return ms2.toString();
  }
  if (edit.action === "ease") return updateKeyframeInScript(source, channelId, percentage, {}, edit.ease);
  if (edit.value === void 0) throw new Error("A keyframe value is required");
  if (edit.action === "update") return updateKeyframeInScript(source, channelId, percentage, { [property]: edit.value });
  const located = parseGsapScriptAcornForWrite(source)?.located.find((entry) => entry.id === channelId);
  const keyframes = located && keyframesObjectNode(located.call.varsArg);
  if (!keyframes) throw new Error("Unable to find property keyframes");
  const entries = percentagePropsOf(keyframes).map((node) => ({
    pct: percentageFromKey(propKeyName2(node) ?? ""),
    code: source.slice(node.start, node.end)
  }));
  entries.push({ pct: percentage, code: `${JSON.stringify(plainPercentKey(percentage))}: ${recordToCode({ [property]: edit.value })}` });
  entries.sort((a, b) => a.pct - b.pct);
  const percentageNodes = new Set(percentagePropsOf(keyframes));
  const config = keyframes.properties.filter((node) => !percentageNodes.has(node)).map((node) => source.slice(node.start, node.end));
  const ms = new MagicString(source);
  ms.overwrite(keyframes.start, keyframes.end, `{ ${[...entries.map((entry) => entry.code), ...config].join(", ")} }`);
  return ms.toString();
}
function resizeKeyframedTweenInScript(script, animationId, newPosition, newDuration, pctRemap) {
  const located = ensureKeyframesNode(script, animationId);
  if (!located) return script;
  const { script: src, target, kfNode } = located;
  const edits = [];
  const seen = /* @__PURE__ */ new Set();
  for (const { from, to } of pctRemap) {
    const match = findKfPropByPct(kfNode, from);
    if (!match || seen.has(match.prop.key)) continue;
    seen.add(match.prop.key);
    edits.push({ keyNode: match.prop.key, to });
  }
  const ms = new MagicString(src);
  for (const { keyNode, to } of edits) {
    ms.overwrite(keyNode.start, keyNode.end, JSON.stringify(plainPercentKey(to)));
  }
  overwritePosition(ms, target.call, newPosition);
  upsertProp(ms, target.call.varsArg, "duration", newDuration);
  return ms.toString();
}
function removeAllKeyframesFromScript(script, animationId) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const kfs = target.animation.keyframes?.keyframes;
  if (!kfs || kfs.length === 0) return script;
  const sorted = [...kfs].sort((a, b) => a.percentage - b.percentage);
  const collapse = target.call.method === "from" ? sorted[0] : sorted[sorted.length - 1];
  if (!collapse) return script;
  const ms = new MagicString(script);
  overwriteVarsArg(
    ms,
    target.call,
    buildVarsObjectCode(buildCollapsedFlatVars(target.animation, collapse))
  );
  if (target.animation.propertyGroup === "position") {
    for (const l of parsed.located) {
      if (l === target) continue;
      if (l.animation.targetSelector === target.animation.targetSelector && l.animation.propertyGroup === "position") {
        removeCallFromMagicString(ms, l.call, script);
      }
    }
  }
  return ms.toString();
}
function buildCollapsedFlatVars(animation, collapse) {
  const flat = { ...animation.properties };
  for (const [k, v] of Object.entries(collapse.properties)) {
    if (k !== "ease") flat[k] = v;
  }
  for (const [k, v] of Object.entries(animation.extras ?? {})) {
    if (typeof v === "number" || typeof v === "string") flat[k] = v;
  }
  flat.duration = 0;
  flat.immediateRender = true;
  return flat;
}
function buildKeyframesVarsCode(animation, fromProps, toProps, varsNode, source, setDuration) {
  const fromEntries = Object.entries(fromProps).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`);
  const toEntries = Object.entries(toProps).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`);
  const easeEntry = animation.ease ? `, easeEach: ${valueToCode(animation.ease)}` : "";
  const kfCode = `{ "0%": { ${fromEntries.join(", ")} }, "100%": { ${toEntries.join(", ")} }${easeEntry} }`;
  let preserved = preservedVarsEntries(varsNode, source);
  if (setDuration !== void 0) {
    preserved = preserved.filter((e) => !/^\s*(immediateRender|data|duration)\s*:/.test(e));
  }
  const parts = [`keyframes: ${kfCode}`, ...preserved];
  if (setDuration !== void 0) parts.push(`duration: ${Math.max(1e-3, setDuration)}`);
  if (animation.ease) parts.push(`ease: "none"`);
  return `{ ${parts.join(", ")} }`;
}
function convertToKeyframesFromScript(script, animationId, resolvedFromValues, setDuration = 1) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const { animation, call } = target;
  if (authorsKeyframes(animation)) return script;
  const isSet = call.method === "set";
  const { fromProps, toProps } = resolveConversionProps(animation, resolvedFromValues);
  const ms = new MagicString(script);
  if (isSet && animation.global) {
    const calleeObj = call.node.callee.object;
    if (calleeObj?.type === "Identifier") {
      ms.overwrite(calleeObj.start, calleeObj.end, parsed.timelineVar);
    }
    const args = call.node.arguments;
    if (args.length > 0 && args.length < 3) {
      ms.appendLeft(args[args.length - 1].end, ", 0");
    }
  }
  if (call.method === "from" || call.method === "fromTo" || isSet) {
    ms.overwrite(call.node.callee.property.start, call.node.callee.property.end, "to");
  }
  if (call.method === "fromTo" && call.fromArg) {
    ms.remove(call.fromArg.start, call.varsArg.start);
  }
  overwriteVarsArg(
    ms,
    call,
    buildKeyframesVarsCode(
      animation,
      fromProps,
      toProps,
      call.varsArg,
      script,
      isSet ? setDuration : void 0
    )
  );
  return ms.toString();
}
function buildKeyframeObjectCode(keyframes, easeEach) {
  const entries = mergePercentageKeyframes(keyframes).map((kf) => {
    const props = Object.entries(kf.properties).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`);
    if (kf.ease) props.push(`ease: ${valueToCode(kf.ease)}`);
    if (kf.auto) props.push(`_auto: 1`);
    return `${JSON.stringify(plainPercentKey(kf.percentage))}: { ${props.join(", ")} }`;
  });
  if (easeEach) entries.push(`easeEach: ${valueToCode(easeEach)}`);
  return `{ ${entries.join(", ")} }`;
}
function materializeKeyframesFromScript(script, animationId, keyframes, easeEach, resolvedSelector) {
  if (keyframes.length === 0) return script;
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const { call } = target;
  const sorted = [...keyframes].sort((a, b) => a.percentage - b.percentage);
  const kfObjCode = buildKeyframeObjectCode(sorted, easeEach);
  const ms = new MagicString(script);
  if (resolvedSelector) {
    const selectorArg = call.node.arguments[0];
    if (selectorArg)
      ms.overwrite(selectorArg.start, selectorArg.end, JSON.stringify(resolvedSelector));
  }
  const kfProp = findPropertyNode2(call.varsArg, "keyframes");
  if (kfProp) {
    ms.overwrite(kfProp.value.start, kfProp.value.end, kfObjCode);
  } else if (call.varsArg?.type === "ObjectExpression") {
    const vars = call.varsArg;
    if (vars.properties.length > 0) {
      ms.prependLeft(vars.properties[0].start, `keyframes: ${kfObjCode}, `);
    } else {
      ms.appendLeft(vars.end - 1, `keyframes: ${kfObjCode}`);
    }
  }
  const eachProp = findPropertyNode2(call.varsArg, "easeEach");
  if (eachProp) {
    const allProps = (call.varsArg.properties ?? []).filter((p) => isObjectProperty2(p));
    removeProp(ms, eachProp, allProps);
  }
  return ms.toString();
}
function replaceTweenWithKeyframesInScript(script, animationId, edit) {
  const parsed = parseGsapScriptAcornForWrite(script);
  const target = parsed?.located.find((l) => l.id === animationId);
  const call = target?.call;
  if (!target || call?.varsArg?.type !== "ObjectExpression") return null;
  const { animation } = target;
  if (animation.method !== "to" && animation.method !== "from" && animation.method !== "fromTo")
    return null;
  const ms = new MagicString(script);
  const start = animation.resolvedStart ?? animation.position;
  const moved = typeof start !== "number" || Math.abs(start - edit.position) > 5e-4;
  const kept = preservedVarsEntries(call.varsArg, script).filter(
    (e) => !/^\s*duration\s*:/.test(e) && !(moved && /^\s*delay\s*:/.test(e))
  );
  const sorted = [...edit.keyframes].sort((a, b) => a.percentage - b.percentage);
  const parts = [`keyframes: ${buildKeyframeObjectCode(sorted, edit.easeEach)}`, ...kept];
  parts.push(`duration: ${valueToCode(edit.duration)}`);
  if (edit.ease) parts.push(`ease: ${valueToCode(edit.ease)}`);
  if (animation.hasUnresolvedSelector || animation.targetSelector !== edit.targetSelector) {
    const selectorArg = call.node.arguments[0];
    ms.overwrite(selectorArg.start, selectorArg.end, JSON.stringify(edit.targetSelector));
  }
  convertMethodToTo(ms, animation, call, call.varsArg);
  overwriteVarsArg(ms, call, `{ ${parts.join(", ")} }`);
  if (moved) overwritePosition(ms, call, edit.position);
  return ms.toString();
}
function addAnimationWithKeyframesToScript(script, targetSelector, position, duration, keyframes, ease, easeEach, extras) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return { script, id: "" };
  const insertionPoint = findInsertionPoint(parsed);
  if (insertionPoint === null) return { script, id: "" };
  const sorted = [...keyframes].sort((a, b) => a.percentage - b.percentage);
  const kfObjCode = buildKeyframeObjectCode(sorted, easeEach);
  const varParts = [`keyframes: ${kfObjCode}`, `duration: ${valueToCode(duration)}`];
  if (ease) varParts.push(`ease: ${valueToCode(ease)}`);
  for (const [key, value] of Object.entries(extras ?? {})) {
    varParts.push(`${safeKey(key)}: ${valueToCode(value)}`);
  }
  const stmtCode = `${parsed.timelineVar}.to(${JSON.stringify(targetSelector)}, { ${varParts.join(", ")} }, ${valueToCode(position)});`;
  const ms = new MagicString(script);
  ms.appendLeft(insertionPoint, "\n" + stmtCode);
  const result = ms.toString();
  const reParsed = parseGsapScriptAcornForWrite(result);
  const newId = reParsed?.located[reParsed.located.length - 1]?.id ?? "";
  return { script: result, id: newId };
}
function collectPropertyKeys(anim) {
  const keys = /* @__PURE__ */ new Set();
  if (anim.keyframes) {
    for (const kf of anim.keyframes.keyframes) {
      for (const k of Object.keys(kf.properties)) keys.add(k);
    }
  } else {
    for (const k of Object.keys(anim.properties)) keys.add(k);
  }
  return keys;
}
function partitionPropertyGroups(keys) {
  const groups = /* @__PURE__ */ new Map();
  for (const key of keys) {
    if (key === "transformOrigin") continue;
    const group = classifyPropertyGroup2(key);
    let arr = groups.get(group);
    if (!arr) {
      arr = [];
      groups.set(group, arr);
    }
    arr.push(key);
  }
  return groups;
}
function assignTransformOrigin(groupProps) {
  let largestGroup;
  let largestCount = 0;
  for (const [group, props] of groupProps) {
    if (props.length > largestCount) {
      largestCount = props.length;
      largestGroup = group;
    }
  }
  const largest = largestGroup ? groupProps.get(largestGroup) : void 0;
  if (largest) largest.push("transformOrigin");
}
function filterGroupKeyframes(kfs, propSet) {
  const result = [];
  for (const kf of kfs) {
    const filtered = {};
    for (const [k, v] of Object.entries(kf.properties)) {
      if (propSet.has(k)) filtered[k] = v;
    }
    if (Object.keys(filtered).length > 0) {
      result.push({
        percentage: kf.percentage,
        properties: filtered,
        ...kf.ease ? { ease: kf.ease } : {}
      });
    }
  }
  return result;
}
function filterGroupProperties(properties, propSet) {
  const result = {};
  for (const [k, v] of Object.entries(properties)) {
    if (propSet.has(k)) result[k] = v;
  }
  return result;
}
function addGroupAnimToScript(script, anim, propSet) {
  if (anim.keyframes) {
    const groupKeyframes = filterGroupKeyframes(anim.keyframes.keyframes, propSet);
    if (groupKeyframes.length === 0) return { script, id: "" };
    const pos = typeof anim.position === "number" ? anim.position : 0;
    return addAnimationWithKeyframesToScript(
      script,
      anim.targetSelector,
      pos,
      anim.duration ?? 0.5,
      groupKeyframes,
      anim.keyframes.ease ?? anim.ease,
      anim.keyframes.easeEach
    );
  }
  const groupProperties = filterGroupProperties(anim.properties, propSet);
  if (Object.keys(groupProperties).length === 0) return { script, id: "" };
  const fromProperties = anim.method === "fromTo" && anim.fromProperties ? filterGroupProperties(anim.fromProperties, propSet) : void 0;
  return addAnimationToScript(script, {
    targetSelector: anim.targetSelector,
    method: anim.method,
    position: anim.position,
    duration: anim.duration,
    ease: anim.ease,
    properties: groupProperties,
    fromProperties,
    extras: anim.extras
  });
}
function splitIntoPropertyGroupsFromScript(script, animationId) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return { script, ids: [animationId] };
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return { script, ids: [animationId] };
  const { animation } = target;
  if (animation.hasUnresolvedKeyframes) return { script, ids: [animationId] };
  const allPropKeys = collectPropertyKeys(animation);
  const groupProps = partitionPropertyGroups(allPropKeys);
  if (groupProps.size <= 1) return { script, ids: [animationId] };
  if (allPropKeys.has("transformOrigin")) assignTransformOrigin(groupProps);
  let result = removeAnimationFromScript(script, animationId);
  for (const [, props] of groupProps) {
    const { script: next, id } = addGroupAnimToScript(result, animation, new Set(props));
    if (id) result = next;
  }
  const reParsed = parseGsapScriptAcornForWrite(result);
  const newIds = (reParsed?.located ?? []).filter((l) => l.animation.targetSelector === animation.targetSelector).map((l) => l.id);
  return { script: result, ids: newIds };
}
function removePropsByKey(ms, objNode, keys) {
  if (objNode?.type !== "ObjectExpression") return;
  const allProps = (objNode.properties ?? []).filter(isObjectProperty2);
  const marked = allProps.map((p) => keys.has(propKeyName2(p) ?? ""));
  let i = 0;
  while (i < allProps.length) {
    if (!marked[i]) {
      i++;
      continue;
    }
    const blockStart = i;
    while (i < allProps.length && marked[i]) i++;
    ms.remove(...blockRemoveRange(allProps, blockStart, i));
  }
}
function blockRemoveRange(allProps, blockStart, blockEnd) {
  if (blockStart === 0 && blockEnd === allProps.length)
    return [allProps[0].start, allProps[allProps.length - 1].end];
  if (blockStart === 0) return [allProps[0].start, allProps[blockEnd].start];
  return [allProps[blockStart - 1].end, allProps[blockEnd - 1].end];
}
function readLastWaypointXY(mpVal) {
  if (mpVal?.type !== "ObjectExpression") return { x: null, y: null };
  const pathProp = findPropertyNode2(mpVal, "path");
  if (pathProp?.value?.type !== "ArrayExpression") return { x: null, y: null };
  const elems = pathProp.value.elements ?? [];
  const last = elems[elems.length - 1];
  if (last?.type !== "ObjectExpression") return { x: null, y: null };
  return {
    x: readNumericLiteralNode(findPropertyNode2(last, "x")?.value),
    y: readNumericLiteralNode(findPropertyNode2(last, "y")?.value)
  };
}
function readNumericLiteralNode(v) {
  if (LITERAL_NODE_TYPES.has(v?.type) && typeof v.value === "number") return v.value;
  if (v?.type === "UnaryExpression" && v.operator === "-" && typeof v.argument?.value === "number") {
    return -v.argument.value;
  }
  return null;
}
function disableArcPath(ms, call) {
  const mpProp = findPropertyNode2(call.varsArg, "motionPath");
  if (!mpProp) return false;
  const { x, y } = readLastWaypointXY(mpProp.value);
  if (x === null && y === null) {
    const allProps = (call.varsArg.properties ?? []).filter(isObjectProperty2);
    removeProp(ms, mpProp, allProps);
    return true;
  }
  const parts = [];
  if (x !== null) parts.push(`x: ${x}`);
  if (y !== null) parts.push(`y: ${y}`);
  ms.overwrite(mpProp.start, mpProp.end, parts.join(", "));
  return true;
}
function stripXYFromKeyframes(ms, kfPropNode) {
  if (kfPropNode?.value?.type !== "ObjectExpression") return;
  const xyKeys = /* @__PURE__ */ new Set(["x", "y"]);
  for (const pctProp of (kfPropNode.value.properties ?? []).filter(isObjectProperty2)) {
    const k = propKeyName2(pctProp);
    if (typeof k === "string" && k.endsWith("%") && pctProp.value?.type === "ObjectExpression") {
      removePropsByKey(ms, pctProp.value, xyKeys);
    }
  }
}
function enableArcPath(ms, call, animation, config) {
  const waypoints = extractArcWaypoints(animation);
  if (waypoints.length < 2) return false;
  const segments = config.segments.length === waypoints.length - 1 ? config.segments : Array.from({ length: waypoints.length - 1 }, () => ({ curviness: 1 }));
  const motionPathCode = buildMotionPathObjectCode({
    waypoints,
    segments,
    autoRotate: config.autoRotate
  });
  const vars = call.varsArg;
  if (vars?.type !== "ObjectExpression") return false;
  const editable = (vars.properties ?? []).filter(isObjectProperty2);
  const survivesRemoval = editable.some((p) => {
    const k = propKeyName2(p);
    return k !== "x" && k !== "y";
  });
  const sep5 = survivesRemoval ? ", " : "";
  ms.appendRight(vars.start + 1, ` motionPath: ${motionPathCode}${sep5}`);
  stripXYFromKeyframes(ms, findPropertyNode2(call.varsArg, "keyframes"));
  removePropsByKey(ms, call.varsArg, /* @__PURE__ */ new Set(["x", "y"]));
  return true;
}
function setArcPathInScript(script, animationId, config) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const ms = new MagicString(script);
  const handled = config.enabled ? enableArcPath(ms, target.call, target.animation, config) : disableArcPath(ms, target.call);
  return handled ? ms.toString() : script;
}
function updateArcSegmentInScript(script, animationId, segmentIndex, update) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const { call, animation } = target;
  if (!animation.arcPath?.enabled) return script;
  const segments = [...animation.arcPath.segments];
  const existingSeg = segments[segmentIndex];
  if (segmentIndex < 0 || segmentIndex >= segments.length || !existingSeg) return script;
  segments[segmentIndex] = { ...existingSeg, ...update };
  const waypoints = extractArcWaypoints(animation);
  if (waypoints.length < 2) return script;
  const motionPathCode = buildMotionPathObjectCode({
    waypoints,
    segments,
    autoRotate: animation.arcPath.autoRotate
  });
  const mpProp = findPropertyNode2(call.varsArg, "motionPath");
  if (!mpProp) return script;
  const ms = new MagicString(script);
  ms.overwrite(mpProp.value.start, mpProp.value.end, motionPathCode);
  return ms.toString();
}
function hasCubicSegments(segments) {
  return segments.some((segment) => segment.cp1 != null || segment.cp2 != null);
}
function writeMotionPathValue(script, target, waypoints, segments, autoRotate) {
  const motionPath = findPropertyNode2(target.call.varsArg, "motionPath");
  if (!motionPath) return script;
  const code = buildMotionPathObjectCode({ waypoints, segments, autoRotate });
  const ms = new MagicString(script);
  ms.overwrite(motionPath.value.start, motionPath.value.end, code);
  return ms.toString();
}
function updateMotionPathPointInScript(script, animationId, pointIndex, point) {
  const parsed = parseGsapScriptAcornForWrite(script);
  const target = parsed?.located.find((entry) => entry.id === animationId);
  if (!target?.animation.arcPath?.enabled) return script;
  const waypoints = extractArcWaypoints(target.animation);
  if (waypoints.length < 2 || pointIndex < 0 || pointIndex >= waypoints.length) return script;
  const next = waypoints.map((waypoint, index) => index === pointIndex ? { ...point } : waypoint);
  return writeMotionPathValue(
    script,
    target,
    next,
    target.animation.arcPath.segments,
    target.animation.arcPath.autoRotate
  );
}
function addMotionPathPointInScript(script, animationId, index, point) {
  const parsed = parseGsapScriptAcornForWrite(script);
  const target = parsed?.located.find((entry) => entry.id === animationId);
  const arc = target?.animation.arcPath;
  if (!target || !arc?.enabled || hasCubicSegments(arc.segments)) return script;
  const waypoints = extractArcWaypoints(target.animation);
  if (index < 1 || index > waypoints.length - 1) return script;
  const segments = [...arc.segments];
  waypoints.splice(index, 0, { ...point });
  segments.splice(index - 1, 0, { curviness: segments[index - 1]?.curviness ?? 1 });
  return writeMotionPathValue(script, target, waypoints, segments, arc.autoRotate);
}
function removeMotionPathPointInScript(script, animationId, index) {
  const parsed = parseGsapScriptAcornForWrite(script);
  const target = parsed?.located.find((entry) => entry.id === animationId);
  const arc = target?.animation.arcPath;
  if (!target || !arc?.enabled || hasCubicSegments(arc.segments)) return script;
  const waypoints = extractArcWaypoints(target.animation);
  if (waypoints.length <= 2 || index < 0 || index >= waypoints.length) return script;
  const segments = [...arc.segments];
  waypoints.splice(index, 1);
  segments.splice(Math.min(index, segments.length - 1), 1);
  return writeMotionPathValue(script, target, waypoints, segments, arc.autoRotate);
}
function addMotionPathToScript(script, targetSelector, position, duration, point, ease = "power1.inOut") {
  const motionPath = buildMotionPathObjectCode({
    waypoints: [{ x: 0, y: 0 }, { ...point }],
    segments: [{ curviness: 1 }],
    autoRotate: false
  });
  const result = addAnimationToScript(script, {
    targetSelector,
    method: "to",
    position,
    duration,
    ease,
    properties: { motionPath: `__raw:${motionPath}` }
  });
  return { script: result.script, id: result.id || null };
}
function removeArcPathFromScript(script, animationId) {
  return setArcPathInScript(script, animationId, {
    enabled: false,
    autoRotate: false,
    segments: []
  });
}
function updateAnimationSelectorInScript(script, animationId, newSelector) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const selectorArg = target.call.node.arguments?.[0];
  if (!selectorArg) return script;
  const ms = new MagicString(script);
  ms.overwrite(selectorArg.start, selectorArg.end, JSON.stringify(newSelector));
  return ms.toString();
}
function insertInheritedStateSetInScript(script, selector, position, properties) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const props = Object.entries(properties).map(([k, v]) => `${safeKey(k)}: ${valueToCode(v)}`).join(", ");
  const code = `${parsed.timelineVar}.set(${JSON.stringify(selector)}, { ${props} }, ${position});`;
  const ms = new MagicString(script);
  const tlDecl = findTimelineDeclarationStatement(parsed.ast, parsed.timelineVar);
  const firstLocated = parsed.located[0];
  if (tlDecl) {
    const ownLineEnd = script[tlDecl.end] === "\n" ? "" : "\n";
    ms.appendLeft(tlDecl.end, "\n" + code + ownLineEnd);
  } else if (firstLocated) {
    const firstCall = firstLocated.call;
    const exprStmt = findEnclosingExpressionStatement(firstCall.ancestors);
    const insertAt = exprStmt?.start ?? firstCall.node.start;
    ms.prependLeft(insertAt, code + "\n");
  } else {
    ms.append("\n" + code);
  }
  return ms.toString();
}
var STUDIO_HOLD_MARKER = "hf-hold";
function isStudioHoldSet(animation) {
  const data = animation.extras?.data ?? animation.properties.data;
  return animation.method === "set" && (data === STUDIO_HOLD_MARKER || data === `__raw:${JSON.stringify(STUDIO_HOLD_MARKER)}`);
}
function removeStudioHoldSets(script, parsed) {
  const staleHolds = parsed.located.filter((entry) => isStudioHoldSet(entry.animation));
  if (staleHolds.length === 0) return script;
  const ms = new MagicString(script);
  for (const hold of staleHolds) removeCallFromMagicString(ms, hold.call, script);
  return ms.toString();
}
function syncPositionHoldsBeforeKeyframes(script, previous) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const tweensOf = (text3) => parseGsapScriptAcornForWrite(text3)?.located.map((entry) => entry.animation) ?? null;
  const scope = holdScope(
    parsed.located.map((entry) => entry.animation),
    previous === void 0 ? null : tweensOf(previous)
  );
  let result = removeStudioHoldSets(script, parsed);
  const current = parseGsapScriptAcornForWrite(result);
  if (!current) return result;
  const animations = current.located.map((entry) => entry.animation);
  for (const animation of animations) {
    const position = keyframeHoldForAnimation(animation, animations, scope);
    if (!position) continue;
    result = insertInheritedStateSetInScript(result, animation.targetSelector, 0, {
      ...position,
      data: STUDIO_HOLD_MARKER
    });
  }
  return result;
}
var roundPct = (pct) => Math.round(pct * 1e3) / 1e3;
var LINEAR_RUN = /* @__PURE__ */ new Set(["none", "linear"]);
var PLACED_BY_TIMELINE = /\.(?:add|addLabel|addPause|call|repeat|yoyo|duration|timeScale)\s*\(|\b(?:repeat|yoyo)\s*:/;
function linearPercentageKeys(animation) {
  const data = animation.keyframes;
  if (data?.format !== "percentage" || data.fromMotionPath || animation.arcPath) return null;
  if (animation.durationUnresolved || !LINEAR_RUN.has(animation.ease || "none")) return null;
  return data.keyframes;
}
var loops = (animation) => Boolean(animation.extras?.repeat || animation.extras?.yoyo);
function trimmableKeyframes(animation) {
  const keyframes = loops(animation) ? null : linearPercentageKeys(animation);
  const { duration, position } = animation;
  if (!keyframes || typeof position !== "number" || typeof duration !== "number") return null;
  return duration > 0 ? { keyframes, duration, position } : null;
}
function trailingSpanTrim(animation) {
  const tween = trimmableKeyframes(animation);
  if (!tween) return null;
  const last = Math.max(...tween.keyframes.map((keyframe) => keyframe.percentage));
  if (tween.keyframes.length < 2 || !(last > 0) || last >= 99.999) return null;
  return {
    position: tween.position,
    duration: Math.round(tween.duration * last * 10) / 1e3,
    pctRemap: tween.keyframes.map(({ percentage: from }) => ({
      from,
      to: roundPct(from / last * 100)
    }))
  };
}
function trimTrailingKeyframeSpans(previous, script) {
  if (script === previous) return script;
  const located = parseGsapScriptAcornForWrite(script)?.located ?? [];
  const placedAfter = ({ animation: a }) => !a.global && (a.implicitPosition || typeof a.position !== "number");
  if (PLACED_BY_TIMELINE.test(script) || located.some(placedAfter)) return script;
  const trims = located.flatMap((entry) => {
    const trim = trailingSpanTrim(entry.animation);
    return trim ? [{ entry, trim }] : [];
  });
  if (!trims.length) return script;
  const source = (text3, { call }) => `${call.method}${text3.slice(call.node.arguments[0]?.start, call.node.end)}`;
  const previousTweens = parseGsapScriptAcornForWrite(previous)?.located ?? [];
  const untouched = new Set(previousTweens.map((entry) => source(previous, entry)));
  let result = script;
  for (const { entry, trim } of trims) {
    if (untouched.has(source(script, entry))) continue;
    result = resizeKeyframedTweenInScript(
      result,
      entry.id,
      trim.position,
      trim.duration,
      trim.pctRemap
    );
  }
  return result;
}
function computeForwardBaselines(matching, splitTime) {
  const before = [];
  const acc = {};
  for (const anim of matching) {
    before.push({ ...acc });
    const pos = typeof anim.position === "number" ? anim.position : 0;
    const dur = anim.duration ?? 0;
    const animEnd = pos + dur;
    if (authorsKeyframes(anim)) {
      const kfs = anim.keyframes?.keyframes ?? [];
      if (pos >= splitTime) {
      } else if (animEnd > splitTime) {
        for (const kf of kfs) {
          const kfTime = pos + kf.percentage / 100 * dur;
          if (kfTime <= splitTime) {
            for (const [k, v] of Object.entries(kf.properties)) acc[k] = v;
          }
        }
      } else {
        const lastKf = kfs[kfs.length - 1];
        if (lastKf) {
          for (const [k, v] of Object.entries(lastKf.properties)) acc[k] = v;
        }
      }
      continue;
    }
    if (animEnd <= splitTime) {
      for (const [k, v] of Object.entries(anim.properties)) acc[k] = v;
      continue;
    }
    if (pos >= splitTime) continue;
    const progress = dur > 0 ? (splitTime - pos) / dur : 0;
    const fromSource = anim.fromProperties ?? acc;
    for (const [k, v] of Object.entries(anim.properties)) {
      if (typeof v !== "number") {
        acc[k] = v;
        continue;
      }
      const fromVal = typeof fromSource[k] === "number" ? fromSource[k] : 0;
      acc[k] = fromVal + (v - fromVal) * progress;
    }
  }
  return { before, final: { ...acc } };
}
function buildSpanningSplit(result, anim, pos, dur, fromSource, ctx) {
  const progress = dur > 0 ? (ctx.splitTime - pos) / dur : 0;
  const midProps = {};
  for (const [k, v] of Object.entries(anim.properties)) {
    if (typeof v !== "number") {
      midProps[k] = v;
      continue;
    }
    const fromVal = typeof fromSource[k] === "number" ? fromSource[k] : 0;
    midProps[k] = fromVal + (v - fromVal) * progress;
  }
  const trimmed = updateAnimationInScript(result, anim.id, {
    duration: ctx.splitTime - pos,
    properties: midProps
  });
  return addAnimationToScript(trimmed, {
    targetSelector: ctx.newSelector,
    method: "fromTo",
    position: ctx.newElementStart,
    duration: pos + dur - ctx.splitTime,
    properties: { ...anim.properties },
    fromProperties: { ...midProps },
    ease: anim.ease,
    extras: anim.extras
  }).script;
}
function applyKeyframedTweenSplit(result, anim, pos, animEnd, ctx, skippedSelectors) {
  if (pos >= ctx.splitTime)
    return updateAnimationSelectorInScript(result, anim.id, ctx.newSelector);
  if (animEnd > ctx.splitTime) {
    skippedSelectors.push(`${ctx.originalSelector} (keyframes spanning split)`);
  } else if (anim.hasUnresolvedKeyframes) {
    skippedSelectors.push(`${ctx.originalSelector} (unreadable keyframes before split)`);
  }
  return result;
}
function applyTweenSplit(result, anim, baselineBefore, ctx, skippedSelectors) {
  const pos = typeof anim.position === "number" ? anim.position : 0;
  const dur = anim.duration ?? 0;
  const animEnd = pos + dur;
  if (authorsKeyframes(anim)) {
    return applyKeyframedTweenSplit(result, anim, pos, animEnd, ctx, skippedSelectors);
  }
  if (animEnd <= ctx.splitTime) return result;
  if (pos >= ctx.splitTime)
    return updateAnimationSelectorInScript(result, anim.id, ctx.newSelector);
  const fromSource = anim.fromProperties ?? baselineBefore;
  return buildSpanningSplit(result, anim, pos, dur, fromSource, ctx);
}
function splitAnimationsInScript(script, opts) {
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return { script, skippedSelectors: [] };
  const originalSelector = `#${opts.originalId}`;
  const newSelector = `#${opts.newId}`;
  const animations = parsed.located.map((l) => l.animation);
  const skippedSelectors = [];
  for (const a of animations) {
    if (a.targetSelector !== originalSelector && a.targetSelector.includes(opts.originalId)) {
      skippedSelectors.push(a.targetSelector);
    }
  }
  const matching = animations.filter((a) => a.targetSelector === originalSelector);
  if (matching.length === 0) return { script, skippedSelectors };
  let result = script;
  const newElementStart = opts.splitTime;
  const { before: baselineBefore, final: finalInheritedProps } = computeForwardBaselines(
    matching,
    opts.splitTime
  );
  const ctx = { splitTime: opts.splitTime, originalSelector, newSelector, newElementStart };
  for (let i = matching.length - 1; i >= 0; i--) {
    const anim = matching[i];
    if (!anim) continue;
    result = applyTweenSplit(result, anim, baselineBefore[i] ?? {}, ctx, skippedSelectors);
  }
  if (Object.keys(finalInheritedProps).length > 0) {
    result = insertInheritedStateSetInScript(
      result,
      newSelector,
      newElementStart,
      finalInheritedProps
    );
  }
  return { script: result, skippedSelectors };
}
function isLoopNode(node) {
  const t = node?.type;
  return t === "ForStatement" || t === "ForInStatement" || t === "ForOfStatement" || t === "WhileStatement";
}
function isForEachStatement(node) {
  return node?.type === "ExpressionStatement" && node.expression?.type === "CallExpression" && node.expression.callee?.property?.name === "forEach";
}
function findEnclosingLoopNode(ancestors) {
  for (let i = ancestors.length - 2; i >= 0; i--) {
    const node = ancestors[i];
    if (isLoopNode(node) || isForEachStatement(node)) return node;
  }
  return null;
}
function loopBodyStatements(loopNode) {
  let body;
  if (loopNode?.type === "ExpressionStatement") {
    const cb = loopNode.expression?.arguments?.[0];
    body = cb?.body;
  } else {
    body = loopNode?.body;
  }
  if (body?.type !== "BlockStatement") return null;
  return (body.body ?? []).filter((s) => s?.type === "ExpressionStatement");
}
function loopIndexVarName(loopNode) {
  if (loopNode?.type === "ForStatement") {
    const decl = loopNode.init?.declarations?.[0];
    return typeof decl?.id?.name === "string" ? decl.id.name : null;
  }
  return null;
}
function isIndexBindingPosition(node, parent) {
  if (parent?.type === "MemberExpression") return parent.property === node && !parent.computed;
  if (parent?.type === "Property" || parent?.type === "ObjectProperty") {
    return parent.key === node && !parent.computed;
  }
  return false;
}
function substituteLoopIndex(stmt, indexVar, idx, script) {
  const base = stmt.start;
  const src = script.slice(base, stmt.end);
  const ranges = [];
  ancestor(stmt, {
    Identifier(node, _state, ancestors) {
      if (node.name !== indexVar) return;
      if (isIndexBindingPosition(node, ancestors[ancestors.length - 2])) return;
      ranges.push([node.start - base, node.end - base]);
    }
  });
  if (ranges.length === 0) return src;
  ranges.sort((a, b) => b[0] - a[0]);
  let out = src;
  for (const [s, e] of ranges) out = out.slice(0, s) + String(idx) + out.slice(e);
  return out;
}
function buildUnrollReplacement(timelineVar, animation, elements) {
  const duration = typeof animation.duration === "number" ? animation.duration : 8;
  const ease = typeof animation.ease === "string" ? animation.ease : "none";
  const pos = animation.position ?? 0;
  const posCode = typeof pos === "number" ? String(pos) : JSON.stringify(pos);
  const calls = elements.map((el) => {
    const sorted = [...el.keyframes].sort((a, b) => a.percentage - b.percentage);
    const kfCode = buildKeyframeObjectCode(sorted, el.easeEach);
    return `${timelineVar}.to(${JSON.stringify(el.selector)}, { keyframes: ${kfCode}, duration: ${duration}, ease: ${valueToCode(ease)} }, ${posCode});`;
  });
  return calls.join("\n  ");
}
function buildUnrollCallForElement(timelineVar, animation, el) {
  const duration = typeof animation.duration === "number" ? animation.duration : 8;
  const ease = typeof animation.ease === "string" ? animation.ease : "none";
  const pos = animation.position ?? 0;
  const posCode = typeof pos === "number" ? String(pos) : JSON.stringify(pos);
  const sorted = [...el.keyframes].sort((a, b) => a.percentage - b.percentage);
  const kfCode = buildKeyframeObjectCode(sorted, el.easeEach);
  return `${timelineVar}.to(${JSON.stringify(el.selector)}, { keyframes: ${kfCode}, duration: ${duration}, ease: ${valueToCode(ease)} }, ${posCode});`;
}
var REFUSE_UNROLL = /* @__PURE__ */ Symbol("refuse-unroll");
function loopBodyRawStatements(loopNode) {
  const body = loopNode?.type === "ExpressionStatement" ? loopNode.expression?.arguments?.[0]?.body : loopNode?.body;
  return body?.type === "BlockStatement" ? body.body ?? [] : [];
}
function rebindsIndex(node, indexVar) {
  if (node.type === "VariableDeclarator") return node.id?.name === indexVar;
  if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration" || node.type === "ArrowFunctionExpression") {
    return (node.params ?? []).some((p) => p?.name === indexVar);
  }
  return false;
}
function isShorthandIndexUse(node, indexVar) {
  return (node.type === "Property" || node.type === "ObjectProperty") && node.shorthand === true && propKeyName2(node) === indexVar;
}
function hasUnsafeLoopIndexUse(stmt, indexVar) {
  let unsafe = false;
  full(stmt, (node) => {
    if (!unsafe && (isShorthandIndexUse(node, indexVar) || rebindsIndex(node, indexVar))) {
      unsafe = true;
    }
  });
  return unsafe;
}
function unrollSiblingStrategy(loopNode, targetStmt, stmts, indexVar) {
  const siblings = stmts.filter((s) => s !== targetStmt);
  const hasUnmodeledSibling = loopBodyRawStatements(loopNode).some(
    (s) => s !== targetStmt && !stmts.includes(s)
  );
  if (siblings.length === 0 && !hasUnmodeledSibling) return "blanket";
  if (hasUnmodeledSibling || !indexVar) return "refuse";
  return siblings.some((s) => hasUnsafeLoopIndexUse(s, indexVar)) ? "refuse" : "preserve";
}
function emitUnrolledLines(stmts, targetStmt, elements, timelineVar, animation, indexVar, script) {
  const lines = [];
  for (let idx = 0; idx < elements.length; idx++) {
    const el = elements[idx];
    if (!el) continue;
    for (const stmt of stmts) {
      lines.push(
        stmt === targetStmt ? buildUnrollCallForElement(timelineVar, animation, el) : substituteLoopIndex(stmt, indexVar, idx, script)
      );
    }
  }
  return lines.join("\n  ");
}
function buildLoopUnrollPreserving(script, timelineVar, animation, elements, loopNode, targetStmt) {
  const stmts = loopBodyStatements(loopNode);
  if (!stmts || !stmts.includes(targetStmt)) return null;
  const indexVar = loopIndexVarName(loopNode);
  const strategy = unrollSiblingStrategy(loopNode, targetStmt, stmts, indexVar);
  if (strategy === "blanket") return null;
  if (strategy === "refuse" || !indexVar) return REFUSE_UNROLL;
  return emitUnrolledLines(stmts, targetStmt, elements, timelineVar, animation, indexVar, script);
}
function unrollDynamicAnimations(script, animationId, elements) {
  if (elements.length === 0) return script;
  const parsed = parseGsapScriptAcornForWrite(script);
  if (!parsed) return script;
  const target = parsed.located.find((l) => l.id === animationId);
  if (!target) return script;
  const ms = new MagicString(script);
  const loopNode = findEnclosingLoopNode(target.call.ancestors);
  if (loopNode) {
    const targetStmt = findEnclosingExpressionStatement(target.call.ancestors);
    const preserving = targetStmt ? buildLoopUnrollPreserving(
      script,
      parsed.timelineVar,
      target.animation,
      elements,
      loopNode,
      targetStmt
    ) : null;
    if (preserving === REFUSE_UNROLL) return script;
    const replacement = preserving ?? buildUnrollReplacement(parsed.timelineVar, target.animation, elements);
    ms.overwrite(loopNode.start, loopNode.end, replacement);
  } else {
    const stmt = findEnclosingExpressionStatement(target.call.ancestors);
    if (!stmt) return script;
    const replacement = buildUnrollReplacement(parsed.timelineVar, target.animation, elements);
    ms.overwrite(stmt.start, stmt.end, replacement);
  }
  return ms.toString();
}

// ../studio-server/src/helpers/studioFontFace.ts
var FONT_STYLE_RE = /<style\b[^>]*data-hf-studio-fonts=(["'])true\1[^>]*>([\s\S]*?)<\/style>/i;
var ONE_FONT_FACE_RULE = /^@font-face \{(?:[^{}<"'\\]|"(?:[^"\\<\n\r\f]|\\[^<\n\r\f])*"|'(?:[^'\\<\n\r\f]|\\[^<\n\r\f])*')*\}$/;
function isStudioFontFaceCss(css) {
  return typeof css === "string" && ONE_FONT_FACE_RULE.test(css);
}
function ensureStudioFontFaceCss(html, css) {
  if (html.includes(css)) return html;
  const block = FONT_STYLE_RE.exec(html);
  if (block) {
    const next = `${(block[2] ?? "").trim()}
${css}`.trim();
    return html.replace(block[0], () => `<style data-hf-studio-fonts="true">
${next}
</style>`);
  }
  const styleTag = `<style data-hf-studio-fonts="true">
${css}
</style>`;
  if (/<\/head>/i.test(html)) return html.replace(/<\/head>/i, () => `  ${styleTag}
  </head>`);
  return `${styleTag}
${html}`;
}

// ../core/dist/migratedCaptionRecipesA.js
function finite(parameters, id, fallback) {
  const value = Number(parameters[id] ?? fallback);
  return Number.isFinite(value) ? value : fallback;
}
function bounded(parameters, id, fallback, min, max) {
  return Math.min(max, Math.max(min, finite(parameters, id, fallback)));
}
function speed(parameters) {
  return bounded(parameters, "speed", 1, 0.1, 10);
}
function split(parameters, fallback = "word") {
  const value = parameters.unit;
  return value === "whole" || value === "word" || value === "character" ? value : fallback;
}
function color(parameters, id, fallback, themeToken) {
  if (parameters.colorSource === "theme" && themeToken)
    return `var(${themeToken}, ${fallback})`;
  return String(parameters[id] ?? fallback);
}
function seed(parameters, fallback) {
  const value = parameters.seed;
  return typeof value === "string" || typeof value === "number" ? value : fallback;
}
function hiddenInset(direction) {
  if (direction === "down")
    return "inset(0% 0% 100% 0%)";
  if (direction === "left")
    return "inset(0% 100% 0% 0%)";
  if (direction === "right")
    return "inset(0% 0% 0% 100%)";
  return "inset(100% 0% 0% 0%)";
}
function resolveMatrixDecodeStructuredRecipe(parameters = {}) {
  const tick = 0.1 / speed(parameters);
  const stagger2 = bounded(parameters, "stagger", 0.1, 0, 10);
  const density = bounded(parameters, "density", 1, 0, 2);
  const blur = bounded(parameters, "blur", 0, 0, 32);
  const effectColor3 = color(parameters, "color", "#00FF41", "--ipw-color-accent");
  const stateStyle = {
    color: effectColor3,
    filter: `blur(${blur}px) contrast(${1 + 0.5 * density})`,
    letterSpacing: `${0.04 * density}em`
  };
  return {
    version: 1,
    id: "caption-matrix-decode.word-decode",
    presetId: "text.enter.matrix-decode",
    split: split(parameters),
    seed: seed(parameters, "caption-matrix-decode"),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-matrix-word" },
      { role: "clone-primary", perUnit: true, className: "ipw-matrix-scramble-0" },
      { role: "clone-accent", perUnit: true, className: "ipw-matrix-scramble-1" },
      { role: "text", perUnit: true, className: "ipw-matrix-real" }
    ],
    tracks: [
      {
        role: "clone-primary",
        position: 0,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, visibility: "visible", ...stateStyle } }
        ]
      },
      {
        role: "clone-primary",
        position: tick,
        duration: 0,
        stagger: stagger2,
        keyframes: [{ percentage: 0, properties: { opacity: 0, visibility: "hidden" } }]
      },
      {
        role: "clone-accent",
        position: tick,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, visibility: "visible", ...stateStyle } }
        ]
      },
      {
        role: "clone-accent",
        position: tick * 2,
        duration: 0,
        stagger: stagger2,
        keyframes: [{ percentage: 0, properties: { opacity: 0, visibility: "hidden" } }]
      },
      {
        role: "text",
        position: 0,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 0, visibility: "hidden", color: effectColor3 } }
        ]
      },
      {
        role: "text",
        position: tick * 2,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, visibility: "visible", color: effectColor3 } }
        ]
      },
      {
        role: "unit",
        position: 0,
        duration: tick,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 0 } },
          { percentage: 100, properties: { opacity: 1 } }
        ]
      }
    ]
  };
}
function gradientGeometry(direction) {
  if (direction === "left")
    return { angle: 270, start: "55% 0", end: "100% 0" };
  if (direction === "up")
    return { angle: 0, start: "0 55%", end: "0 100%" };
  if (direction === "down")
    return { angle: 180, start: "0 45%", end: "0 0%" };
  return { angle: 90, start: "45% 0", end: "0% 0" };
}
function resolveGradientFillStructuredRecipe(parameters = {}) {
  const motionSpeed = speed(parameters);
  const duration = bounded(parameters, "wordDuration", 0.3, 0.05, 10) / motionSpeed;
  const settleDuration = 0.15 / motionSpeed;
  const stagger2 = bounded(parameters, "stagger", 0.1, 0, 10);
  const intensity = bounded(parameters, "intensity", 1, 0.2, 2);
  const primary = color(parameters, "color", "#fe9f1b", "--ipw-color-accent");
  const accent = color(parameters, "accentColor", "#fd56cb", "--ipw-color-primary");
  const geometry = gradientGeometry(String(parameters.direction ?? "right"));
  const backgroundImage = `linear-gradient(${geometry.angle}deg, ${primary} 0%, #f76e49 10%, #ff2063 20%, ${accent} 30%, #ef7aff 40%, ${primary} 50%, white 50.5%, white 100%)`;
  const peakScale = 1 + 0.04 * intensity;
  const totalDuration = duration + settleDuration;
  const sweepPercentage = duration / totalDuration * 100;
  const paint = {
    color: "transparent",
    backgroundImage,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "350% 100%"
  };
  return {
    version: 1,
    id: "caption-gradient-fill.word-sweep",
    presetId: "text.emphasis.gradient-fill",
    split: split(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-gradient-word" },
      { role: "text", perUnit: true, className: "ipw-gradient-word-text" }
    ],
    tracks: [
      {
        role: "text",
        position: 0,
        duration: totalDuration,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            ease: "none",
            properties: { ...paint, backgroundPosition: geometry.start, scale: 1 }
          },
          {
            percentage: sweepPercentage,
            ease: "none",
            properties: { ...paint, backgroundPosition: geometry.end, scale: peakScale }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { ...paint, backgroundPosition: geometry.end, scale: 1 }
          }
        ]
      }
    ]
  };
}
function resolveClipWipeStructuredRecipe(parameters = {}) {
  const motionSpeed = speed(parameters);
  const revealDuration = 0.3 / motionSpeed;
  const accentDelay = 0.1 / motionSpeed;
  const accentDuration = 0.05 / motionSpeed;
  const dimDuration = 0.2 / motionSpeed;
  const holdDuration = bounded(parameters, "holdDuration", 0.5, 0, 10);
  const stagger2 = bounded(parameters, "stagger", 0.04, 0, 10);
  const direction = String(parameters.direction ?? "right");
  const accentColor = color(parameters, "color", "#FFD700", "--ipw-color-accent");
  return {
    version: 1,
    id: "caption-clip-wipe.word-reveal",
    presetId: "text.enter.clip-wipe",
    split: split(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-clip-word" },
      { role: "text", perUnit: true, className: "ipw-clip-word-text" }
    ],
    tracks: [
      {
        role: "text",
        position: 0,
        duration: revealDuration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { clipPath: hiddenInset(direction), opacity: 1 } },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
          }
        ]
      },
      {
        role: "text",
        position: accentDelay,
        duration: accentDuration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: "inherit", opacity: 1 } },
          { percentage: 100, properties: { color: accentColor, opacity: 1 } }
        ]
      },
      {
        role: "text",
        position: holdDuration,
        duration: dimDuration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: accentColor, opacity: 1 } },
          { percentage: 100, ease: "power2.out", properties: { color: "inherit", opacity: 1 } }
        ]
      }
    ]
  };
}
function resolveWeightShiftStructuredRecipe(parameters = {}) {
  const motionSpeed = speed(parameters);
  const intensity = bounded(parameters, "intensity", 1, 0.2, 2);
  const minWeight = bounded(parameters, "minWeight", 300, 100, 900);
  const maxWeight = bounded(parameters, "maxWeight", 700, 100, 900);
  const stagger2 = bounded(parameters, "stagger", 0.08, 0, 10);
  const switchPoint = bounded(parameters, "switchPoint", 0.35, 0, 10);
  return {
    version: 1,
    id: "caption-weight-shift.word-handoff",
    presetId: "text.emphasis.weight-shift",
    split: split(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-weight-word" },
      { role: "text", perUnit: true, className: "ipw-weight-word-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: 0.1 / motionSpeed,
        stagger: stagger2 * 0.5,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, scale: 1 - 0.15 * intensity } },
          { percentage: 100, ease: "power3.out", properties: { opacity: 1, scale: 1 } }
        ]
      },
      {
        role: "text",
        position: switchPoint,
        duration: 0.1 / motionSpeed,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { fontWeight: minWeight } },
          { percentage: 100, ease: "power2.out", properties: { fontWeight: maxWeight } }
        ]
      }
    ]
  };
}
function directionOffset(direction, distance) {
  if (direction === "left")
    return { x: -distance, y: 0 };
  if (direction === "right")
    return { x: distance, y: 0 };
  if (direction === "down")
    return { x: 0, y: distance };
  return { x: 0, y: -distance };
}
function resolveEditorialEmphasisStructuredRecipe(parameters = {}) {
  const motionSpeed = speed(parameters);
  const intensity = bounded(parameters, "intensity", 1, 0.2, 2);
  const stagger2 = bounded(parameters, "stagger", 0.075, 0, 10);
  const blur = bounded(parameters, "blur", 7, 0, 32);
  const emphasisWeight = bounded(parameters, "emphasisWeight", 800, 100, 900);
  const accent = color(parameters, "color", "#20BBC0", "--ipw-color-accent");
  const distance = bounded(parameters, "distance", 28, 0, 180) * intensity;
  const offset = directionOffset(String(parameters.direction ?? "up"), distance);
  return {
    version: 1,
    id: "caption-editorial-emphasis.word-focus",
    presetId: "text.enter.editorial-emphasis",
    split: split(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-editorial-emphasis-word" },
      { role: "text", perUnit: true, className: "ipw-editorial-emphasis-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: 0.56 / motionSpeed,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              scale: Math.max(0.55, 0.82 - 0.08 * intensity),
              filter: `blur(${blur}px)`,
              transformOrigin: "50% 100%"
            }
          },
          {
            percentage: 68,
            ease: "power3.out",
            properties: {
              opacity: 1,
              x: -offset.x * 0.08,
              y: -offset.y * 0.08,
              scale: 1 + 0.065 * intensity,
              filter: "blur(0px)",
              transformOrigin: "50% 100%"
            }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transformOrigin: "50% 100%"
            }
          }
        ]
      },
      {
        role: "text",
        position: 0.18 / motionSpeed,
        duration: 0.38 / motionSpeed,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: "inherit", fontWeight: "inherit" } },
          {
            percentage: 46,
            ease: "power2.out",
            properties: { color: accent, fontWeight: emphasisWeight }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { color: "inherit", fontWeight: "inherit" }
          }
        ]
      }
    ]
  };
}
function resolveKaraokeFlowStructuredRecipe(parameters = {}) {
  const motionSpeed = speed(parameters);
  const intensity = bounded(parameters, "intensity", 1, 0.2, 2);
  const stagger2 = bounded(parameters, "stagger", 0.12, 0, 10);
  const roundness = bounded(parameters, "roundness", 10, 0, 40);
  const lift = bounded(parameters, "lift", 7, 0, 40) * intensity;
  const accent = color(parameters, "color", "#20BBC0", "--ipw-color-accent");
  const onAccent = color(parameters, "onAccentColor", "#FFFFFF", "--ipw-color-on-accent");
  const muted = color(parameters, "inactiveColor", "rgba(120, 126, 138, 0.72)", "--ipw-color-text-muted");
  const duration = 0.54 / motionSpeed;
  return {
    version: 1,
    id: "caption-pill-karaoke.word-handoff",
    presetId: "text.emphasis.karaoke-flow",
    split: split(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-karaoke-flow-word" },
      { role: "background", perUnit: true, className: "ipw-karaoke-flow-pill" },
      { role: "text", perUnit: true, className: "ipw-karaoke-flow-text" }
    ],
    tracks: [
      {
        role: "background",
        position: 0,
        duration,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 0,
              scaleX: 0.45,
              scaleY: 0.76,
              backgroundColor: accent,
              borderRadius: `${roundness}px`,
              transformOrigin: "50% 50%"
            }
          },
          {
            percentage: 28,
            ease: "back.out(1.7)",
            properties: {
              opacity: 1,
              scaleX: 1.08,
              scaleY: 1,
              backgroundColor: accent,
              borderRadius: `${roundness}px`
            }
          },
          {
            percentage: 64,
            ease: "power2.out",
            properties: { opacity: 1, scaleX: 1, scaleY: 1 }
          },
          {
            percentage: 100,
            ease: "power2.in",
            properties: { opacity: 0, scaleX: 1.05, scaleY: 0.94 }
          }
        ]
      },
      {
        role: "unit",
        position: 0,
        duration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, y: 0, scale: 1 } },
          {
            percentage: 34,
            ease: "power3.out",
            properties: { opacity: 1, y: -lift, scale: 1 + 0.055 * intensity }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { opacity: 1, y: 0, scale: 1 }
          }
        ]
      },
      {
        role: "text",
        position: 0,
        duration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: muted, textShadow: "none" } },
          {
            percentage: 26,
            ease: "power2.out",
            properties: { color: onAccent, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }
          },
          {
            percentage: 72,
            properties: { color: onAccent, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { color: "inherit", textShadow: "none" }
          }
        ]
      }
    ]
  };
}

// ../core/dist/migratedCaptionRecipesB.js
function finiteNumber(parameters, key, fallback, minimum = 0) {
  const value = Number(parameters[key] ?? fallback);
  return Number.isFinite(value) ? Math.max(minimum, value) : fallback;
}
function effectColor(parameters, key, token, fallback) {
  return parameters.colorSource === "theme" ? `var(${token}, ${fallback})` : String(parameters[key] ?? fallback);
}
function roundTime(value) {
  return Math.round(value * 1e12) / 1e12;
}
function scaled(value, speed3) {
  return speed3 === 1 ? value : roundTime(value / speed3);
}
function glowShadow(color2, glow) {
  return `0 0 ${10 * glow}px ${color2}, 0 0 ${35 * glow}px ${color2}, 0 0 ${90 * glow}px ${color2}`;
}
function accentShadow(color2, glow, outerColor) {
  const outer = outerColor ?? color2;
  return [
    "0 8px 16px rgba(0,0,0,0.8)",
    "0 16px 40px rgba(0,0,0,0.6)",
    `0 0 ${4 * glow}px ${color2}`,
    `0 0 ${10 * glow}px ${color2}`,
    `0 0 ${20 * glow}px ${color2}`,
    `0 0 ${40 * glow}px ${outer}`
  ].join(", ");
}
function resolveNeonGlowStructuredRecipe(parameters = {}) {
  const speed3 = finiteNumber(parameters, "speed", 1, 0.01);
  const stagger2 = finiteNumber(parameters, "stagger", 0.09);
  const glow = finiteNumber(parameters, "glow", 1);
  const primary = effectColor(parameters, "color", "--ipw-color-accent", "#00FFF0");
  const accent = effectColor(parameters, "accentColor", "--ipw-color-primary", "#FF0099");
  const quiet = String(parameters.quietColor ?? "rgba(0,255,240,0.14)");
  return {
    version: 1,
    id: "caption-neon-glow.word-timing",
    presetId: "text.emphasis.neon-glow",
    split: "word",
    layers: [
      { role: "unit", perUnit: true, className: "ipw-neon-glow-word" },
      { role: "text", perUnit: true, className: "ipw-neon-glow-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: scaled(0.05, speed3),
        stagger: 0,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, visibility: "visible" } },
          { percentage: 100, ease: "steps(1)", properties: { opacity: 1, visibility: "visible" } }
        ]
      },
      {
        role: "unit",
        position: scaled(0.05, speed3),
        duration: scaled(0.14, speed3),
        stagger: 0,
        keyframes: [
          { percentage: 0, properties: { x: -8 } },
          { percentage: 100, ease: "power3.out", properties: { x: 0 } }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: scaled(0.34, speed3),
        stagger: scaled(stagger2, speed3),
        keyframes: [
          { percentage: 0, properties: { color: quiet, textShadow: "none" } },
          {
            percentage: 58,
            ease: "power2.out",
            properties: { color: accent, textShadow: glowShadow(accent, glow * 0.8) }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: {
              color: primary,
              textShadow: glowShadow(primary, Math.max(0.25, glow * 0.45))
            }
          }
        ]
      }
    ]
  };
}
function resolveNeonAccentStructuredRecipe(parameters = {}) {
  const speed3 = finiteNumber(parameters, "speed", 1, 0.01);
  const intensity = finiteNumber(parameters, "intensity", 1);
  const glow = finiteNumber(parameters, "glow", 1);
  const stagger2 = scaled(finiteNumber(parameters, "stagger", 0.08), speed3);
  const primary = effectColor(parameters, "primaryColor", "--ipw-color-on-accent", "#FFFFFF");
  const green = effectColor(parameters, "color", "--ipw-color-accent", "#53FF01");
  const red = effectColor(parameters, "accentColor", "--ipw-color-primary", "#FF0002");
  const yellow = String(parameters.tertiaryColor ?? "#FCFF00");
  const direction = parameters.direction === "right" || parameters.direction === "down" ? 1 : -1;
  const wiggleDistance = finiteNumber(parameters, "distance", 14) * intensity * direction;
  const halfCycle = scaled(2 / 1.3 / 2, speed3);
  return {
    version: 1,
    id: "caption-neon-accent.group-wiggle",
    presetId: "text.emphasis.neon-accent",
    split: "word",
    layers: [
      { role: "unit", perUnit: true, className: "ipw-neon-accent-word" },
      { role: "text", perUnit: true, className: "ipw-neon-accent-text" },
      { role: "clone-primary", perUnit: true, className: "ipw-neon-accent-primary" },
      { role: "clone-accent", perUnit: true, className: "ipw-neon-accent-secondary" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: scaled(7 / 30, speed3),
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: { opacity: 1, scale: Math.max(0.1, 1 - 0.35 * intensity), x: 0, y: 0 }
          },
          { percentage: 100, ease: "power3.out", properties: { opacity: 1, scale: 1, x: 0, y: 0 } }
        ]
      },
      {
        role: "unit",
        position: 0,
        duration: halfCycle,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { x: 0, y: 0 } },
          {
            percentage: 100,
            ease: "sine.inOut",
            properties: { x: wiggleDistance, y: wiggleDistance }
          }
        ]
      },
      {
        role: "unit",
        position: halfCycle,
        duration: halfCycle,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { x: wiggleDistance, y: wiggleDistance } },
          { percentage: 100, ease: "sine.inOut", properties: { x: 0, y: 0 } }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: { color: primary, textShadow: accentShadow(primary, glow) }
          }
        ]
      },
      {
        role: "clone-primary",
        position: 0,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: {
              color: green,
              opacity: 0.34,
              scale: 1.2,
              textShadow: accentShadow(green, glow)
            }
          }
        ]
      },
      {
        role: "clone-accent",
        position: 0,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: {
              color: red,
              opacity: 0.3,
              scale: 1.2,
              textShadow: accentShadow(red, glow, yellow)
            }
          }
        ]
      }
    ]
  };
}
function resolveGlitchRgbStructuredRecipe(parameters = {}) {
  const speed3 = finiteNumber(parameters, "speed", 1, 0.01);
  const intensity = finiteNumber(parameters, "intensity", 1);
  const density = finiteNumber(parameters, "density", 1);
  const stagger2 = finiteNumber(parameters, "stagger", 0.04);
  const red = effectColor(parameters, "color", "--ipw-color-accent", "#ff003c");
  const cyan = effectColor(parameters, "accentColor", "--ipw-color-primary", "#00e5ff");
  const scanlineOpacity = Math.min(1, finiteNumber(parameters, "scanlineOpacity", 0.55));
  const wordStagger = scaled(stagger2, speed3);
  const travel = -12 * density * intensity;
  const channelOffset = 8.5 * density;
  const aftershockTravel = -5 * density * intensity;
  const baseShadow = "0 5px 18px rgba(0,0,0,0.52)";
  return {
    version: 1,
    id: "caption-glitch-rgb.word-snap",
    presetId: "text.emphasis.rgb-glitch",
    split: "word",
    layers: [
      { role: "background", perUnit: false, className: "ipw-glitch-overlay" },
      { role: "texture", perUnit: false, className: "ipw-glitch-scanlines" },
      { role: "unit", perUnit: true, className: "ipw-glitch-word" },
      { role: "text", perUnit: true, className: "ipw-glitch-text" },
      { role: "clone-primary", perUnit: true, className: "ipw-glitch-red-channel" },
      { role: "clone-accent", perUnit: true, className: "ipw-glitch-cyan-channel" }
    ],
    tracks: [
      {
        role: "background",
        position: 0,
        duration: 0,
        stagger: 0,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 1,
              backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.16) 54%, rgba(0, 0, 0, 0.5) 100%)"
            }
          }
        ]
      },
      {
        role: "texture",
        position: 0,
        duration: 0,
        stagger: 0,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: scanlineOpacity,
              backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0, 0, 0, 0.16) 3px, rgba(0, 0, 0, 0.16) 4px)"
            }
          }
        ]
      },
      {
        role: "unit",
        position: 0,
        duration: scaled(0.12, speed3),
        stagger: 0,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, visibility: "visible" } },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { opacity: 1, visibility: "visible" }
          }
        ]
      },
      {
        role: "unit",
        position: 0,
        duration: scaled(0.084, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { x: 0, textShadow: baseShadow } },
          {
            percentage: 100,
            ease: "none",
            properties: {
              x: travel,
              textShadow: `${channelOffset}px 0 ${red}, -${channelOffset}px 0 ${cyan}, ${baseShadow}`
            }
          }
        ]
      },
      {
        role: "unit",
        position: scaled(0.084, speed3),
        duration: scaled(0.156, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { x: travel } },
          { percentage: 100, ease: "power3.out", properties: { x: 0, textShadow: baseShadow } }
        ]
      },
      {
        role: "unit",
        position: scaled(0.32, speed3),
        duration: scaled(0.045, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { x: 0, textShadow: baseShadow } },
          {
            percentage: 100,
            ease: "none",
            properties: {
              x: aftershockTravel,
              textShadow: `${channelOffset * 0.6}px 0 ${red}, -${channelOffset * 0.6}px 0 ${cyan}, ${baseShadow}`
            }
          }
        ]
      },
      {
        role: "unit",
        position: scaled(0.365, speed3),
        duration: scaled(0.075, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { x: aftershockTravel } },
          { percentage: 100, ease: "power3.out", properties: { x: 0, textShadow: baseShadow } }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: 0,
        stagger: 0,
        keyframes: [{ percentage: 0, properties: { color: "inherit", textShadow: baseShadow } }]
      },
      {
        role: "clone-primary",
        position: 0,
        duration: scaled(0.084, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { color: red, opacity: 0, x: 0 } },
          {
            percentage: 100,
            ease: "none",
            properties: { color: red, opacity: 0.8, x: channelOffset }
          }
        ]
      },
      {
        role: "clone-primary",
        position: scaled(0.084, speed3),
        duration: scaled(0.156, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { color: red, opacity: 0.8, x: channelOffset } },
          { percentage: 100, ease: "power3.out", properties: { color: red, opacity: 0, x: 0 } }
        ]
      },
      {
        role: "clone-accent",
        position: 0,
        duration: scaled(0.084, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { color: cyan, opacity: 0, x: 0 } },
          {
            percentage: 100,
            ease: "none",
            properties: { color: cyan, opacity: 0.8, x: -channelOffset }
          }
        ]
      },
      {
        role: "clone-accent",
        position: scaled(0.084, speed3),
        duration: scaled(0.156, speed3),
        stagger: wordStagger,
        keyframes: [
          { percentage: 0, properties: { color: cyan, opacity: 0.8, x: -channelOffset } },
          { percentage: 100, ease: "power3.out", properties: { color: cyan, opacity: 0, x: 0 } }
        ]
      }
    ]
  };
}
function resolveBlendDifferenceStructuredRecipe(parameters = {}) {
  const speed3 = finiteNumber(parameters, "speed", 1, 0.01);
  const stagger2 = scaled(finiteNumber(parameters, "stagger", 0.08), speed3);
  const duration = scaled(0.18, speed3);
  const requestedMode = String(parameters.blendMode ?? "difference");
  const blendMode = requestedMode === "exclusion" || requestedMode === "screen" ? requestedMode : "difference";
  const color2 = effectColor(parameters, "color", "--ipw-color-on-accent", "#FFFFFF");
  return {
    version: 1,
    id: "caption-blend-difference.persistent",
    presetId: "text.emphasis.blend-difference",
    split: "word",
    layers: [
      { role: "unit", perUnit: true, className: "ipw-blend-difference-scope" },
      { role: "text", perUnit: true, className: "ipw-blend-difference-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 0.45, mixBlendMode: blendMode } },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { opacity: 1, mixBlendMode: blendMode }
          }
        ]
      },
      {
        role: "text",
        position: 0,
        duration,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: "rgba(255,255,255,0.35)" } },
          { percentage: 100, ease: "power2.out", properties: { color: color2 } }
        ]
      }
    ]
  };
}
function textSplit(parameters) {
  const unit = parameters.unit;
  return unit === "whole" || unit === "character" || unit === "word" ? unit : "word";
}
function directionalOffset(direction, distance) {
  if (direction === "left")
    return { x: -distance, y: 0 };
  if (direction === "right")
    return { x: distance, y: 0 };
  if (direction === "down")
    return { x: 0, y: distance };
  return { x: 0, y: -distance };
}
function resolveCameraTrackStructuredRecipe(parameters = {}) {
  const speed3 = finiteNumber(parameters, "speed", 1, 0.01);
  const intensity = finiteNumber(parameters, "intensity", 1, 0.2);
  const distance = finiteNumber(parameters, "distance", 54) * intensity;
  const blur = finiteNumber(parameters, "blur", 12);
  const stagger2 = scaled(finiteNumber(parameters, "stagger", 0.075), speed3);
  const offset = directionalOffset(parameters.direction, distance);
  return {
    version: 1,
    id: "caption-camera-track.depth-resolve",
    presetId: "text.enter.camera-track",
    split: textSplit(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-camera-track-word" },
      { role: "text", perUnit: true, className: "ipw-camera-track-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: scaled(0.68, speed3),
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 0.12,
              x: offset.x,
              y: offset.y,
              scale: Math.max(0.48, 0.7 - intensity * 0.08),
              rotationY: offset.x === 0 ? 0 : -Math.sign(offset.x) * 16 * intensity,
              rotationX: offset.y === 0 ? 0 : Math.sign(offset.y) * 10 * intensity,
              filter: `blur(${blur}px)`,
              transformOrigin: "50% 50%"
            }
          },
          {
            percentage: 72,
            ease: "power3.out",
            properties: {
              opacity: 1,
              x: -offset.x * 0.055,
              y: -offset.y * 0.055,
              scale: 1.035,
              rotationX: 0,
              rotationY: 0,
              filter: "blur(0px)"
            }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              filter: "blur(0px)"
            }
          }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: scaled(0.68, speed3),
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: "inherit", letterSpacing: "0.08em" } },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { color: "inherit", letterSpacing: "inherit" }
          }
        ]
      }
    ]
  };
}
function resolveVisualLayersStructuredRecipe(parameters = {}) {
  const speed3 = finiteNumber(parameters, "speed", 1, 0.01);
  const intensity = finiteNumber(parameters, "intensity", 1, 0.2);
  const distance = finiteNumber(parameters, "distance", 18) * intensity;
  const blur = finiteNumber(parameters, "blur", 4);
  const stagger2 = scaled(finiteNumber(parameters, "stagger", 0.055), speed3);
  const primary = effectColor(parameters, "color", "--ipw-color-primary", "#5B6CFF");
  const accent = effectColor(parameters, "accentColor", "--ipw-color-accent", "#20BBC0");
  return {
    version: 1,
    id: "caption-visual-layers.color-converge",
    presetId: "text.enter.visual-layers",
    split: textSplit(parameters),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-visual-layers-word" },
      { role: "clone-primary", perUnit: true, className: "ipw-visual-layers-primary" },
      { role: "clone-accent", perUnit: true, className: "ipw-visual-layers-accent" },
      { role: "text", perUnit: true, className: "ipw-visual-layers-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: scaled(0.58, speed3),
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 0, scale: 0.9 } },
          { percentage: 55, ease: "power3.out", properties: { opacity: 1, scale: 1.045 } },
          { percentage: 100, ease: "power2.out", properties: { opacity: 1, scale: 1 } }
        ]
      },
      {
        role: "clone-primary",
        position: 0,
        duration: scaled(0.58, speed3),
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: { color: primary, opacity: 0.68, x: -distance, y: distance * 0.28, filter: `blur(${blur}px)` }
          },
          {
            percentage: 58,
            ease: "power3.out",
            properties: { color: primary, opacity: 0.42, x: -2, y: 0, filter: "blur(0px)" }
          },
          { percentage: 100, ease: "power2.out", properties: { opacity: 0, x: 0, y: 0, filter: "blur(0px)" } }
        ]
      },
      {
        role: "clone-accent",
        position: 0,
        duration: scaled(0.58, speed3),
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: { color: accent, opacity: 0.68, x: distance, y: -distance * 0.28, filter: `blur(${blur}px)` }
          },
          {
            percentage: 58,
            ease: "power3.out",
            properties: { color: accent, opacity: 0.42, x: 2, y: 0, filter: "blur(0px)" }
          },
          { percentage: 100, ease: "power2.out", properties: { opacity: 0, x: 0, y: 0, filter: "blur(0px)" } }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: scaled(0.58, speed3),
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { color: "inherit", opacity: 0.38 } },
          { percentage: 100, ease: "power2.out", properties: { color: "inherit", opacity: 1 } }
        ]
      }
    ]
  };
}

// ../core/dist/migratedCaptionRecipesC.js
function finiteNumber2(parameters, id, fallback, min = 0, max = 60) {
  const candidate = Number(parameters[id] ?? fallback);
  const value = Number.isFinite(candidate) ? candidate : fallback;
  return Math.min(max, Math.max(min, value));
}
function speed2(parameters) {
  return finiteNumber2(parameters, "speed", 1, 0.05, 20);
}
function stagger(parameters, fallback) {
  return finiteNumber2(parameters, "stagger", fallback, 0, 10);
}
function split2(parameters, fallback) {
  const value = String(parameters.unit ?? fallback);
  return value === "whole" || value === "character" || value === "word" ? value : fallback;
}
function effectColor2(parameters, fallback) {
  return parameters.colorSource === "theme" ? `var(--ipw-color-accent, ${fallback})` : String(parameters.color ?? fallback);
}
function texturePositions(direction) {
  if (direction === "left")
    return ["100% 50%", "0% 50%"];
  if (direction === "up")
    return ["50% 100%", "50% 0%"];
  if (direction === "down")
    return ["50% 0%", "50% 100%"];
  return ["0% 50%", "100% 50%"];
}
function resolveTextureFillStructuredRecipe(parameters = {}) {
  const rate = speed2(parameters);
  const spacing = stagger(parameters, 0.04);
  const [startPosition, endPosition] = texturePositions(String(parameters.direction ?? "right"));
  const density = finiteNumber2(parameters, "density", 1, 0.2, 2);
  const intensity = finiteNumber2(parameters, "intensity", 1, 0.2, 2);
  const baseColor = effectColor2(parameters, "#FFD0A0");
  const textureSize = Math.max(8, Math.round(30 / density));
  const texture = [
    `repeating-linear-gradient(125deg, rgba(255,255,255,0.42) 0 1px, transparent 1px ${textureSize}px)`,
    `radial-gradient(circle at 25% 30%, rgba(255,255,255,0.42) 0 1px, transparent 1.5px)`,
    `linear-gradient(110deg, ${baseColor}, var(--ipw-color-primary, #FF6B35) 48%, ${baseColor})`
  ].join(", ");
  return {
    version: 1,
    id: "caption-texture.word-mask-sweep",
    presetId: "text.emphasis.texture-fill",
    split: split2(parameters, "word"),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-texture-word" },
      { role: "text", perUnit: true, className: "ipw-texture-word-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: 0.18 / rate,
        stagger: spacing,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 1,
              scale: 0.88,
              filter: "drop-shadow(0 4px 24px rgba(255, 100, 20, 0.55))"
            }
          },
          {
            percentage: 100,
            ease: "power3.out",
            properties: {
              opacity: 1,
              scale: 1,
              filter: "drop-shadow(0 4px 24px rgba(255, 100, 20, 0.55))"
            }
          }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: 0.4 / rate,
        stagger: spacing,
        keyframes: [
          {
            percentage: 0,
            properties: {
              color: baseColor,
              backgroundImage: texture,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: `${textureSize}px ${textureSize}px, ${textureSize * 2}px ${textureSize * 2}px, 220% 220%`,
              backgroundPosition: startPosition,
              filter: `contrast(${(1 + 0.2 * density).toFixed(2)}) brightness(1)`,
              letterSpacing: "0.04em"
            }
          },
          {
            percentage: 100,
            ease: "sine.inOut",
            properties: {
              color: baseColor,
              backgroundImage: texture,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: `${textureSize}px ${textureSize}px, ${textureSize * 2}px ${textureSize * 2}px, 220% 220%`,
              backgroundPosition: endPosition,
              filter: `contrast(${(1 + 0.2 * density).toFixed(2)}) brightness(${(1 + 0.08 * intensity).toFixed(2)})`,
              letterSpacing: "0.04em"
            }
          }
        ]
      }
    ]
  };
}
function kineticEntrance(parameters) {
  const intensity = finiteNumber2(parameters, "intensity", 1, 0.2, 2);
  const requestedDistance = finiteNumber2(parameters, "distance", 120, 0, 180);
  const verticalDistance = requestedDistance * intensity;
  const horizontalDistance = verticalDistance * 2.5;
  switch (String(parameters.direction ?? "right")) {
    case "up":
      return {
        from: { x: 0, y: -verticalDistance, scale: 1, opacity: 0 },
        duration: 0.22,
        ease: "power4.out"
      };
    case "left":
      return {
        from: { x: -horizontalDistance, y: 0, scale: 1, opacity: 0 },
        duration: 0.2,
        ease: "expo.out"
      };
    case "down":
      return {
        from: { x: 0, y: 0, scale: Math.max(0.2, 1 - 0.45 * intensity), opacity: 0 },
        duration: 0.24,
        ease: "power4.out"
      };
    default:
      return {
        from: { x: horizontalDistance, y: 0, scale: 1, opacity: 0 },
        duration: 0.2,
        ease: "expo.out"
      };
  }
}
function resolveKineticSlamStructuredRecipe(parameters = {}) {
  const rate = speed2(parameters);
  const entrance = kineticEntrance(parameters);
  const entranceDuration = entrance.duration / rate;
  const spacing = stagger(parameters, 0.04);
  return {
    version: 1,
    id: "caption-kinetic-slam.word-impact",
    presetId: "text.emphasis.kinetic-slam",
    split: split2(parameters, "word"),
    layers: [
      { role: "unit", perUnit: true, className: "ipw-kinetic-word" },
      { role: "text", perUnit: true, className: "ipw-kinetic-word-text" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: entranceDuration,
        stagger: spacing,
        keyframes: [
          { percentage: 0, properties: { ...entrance.from, visibility: "visible" } },
          {
            percentage: 100,
            ease: entrance.ease,
            properties: { x: 0, y: 0, scale: 1, opacity: 1, visibility: "visible" }
          }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: entranceDuration,
        stagger: spacing,
        keyframes: [
          { percentage: 0, properties: { color: "inherit", letterSpacing: "0.04em" } },
          { percentage: 100, properties: { color: "inherit", letterSpacing: "inherit" } }
        ]
      }
    ]
  };
}
function resolveEmojiPopStructuredRecipe(parameters = {}) {
  const rate = speed2(parameters);
  const spacing = stagger(parameters, 0.03);
  const entryDuration = 4 / 30 / rate;
  const exitDuration = 3 / 30 / rate;
  const intensity = finiteNumber2(parameters, "intensity", 1, 0.2, 2);
  const entryScale = Math.max(0.4, 1 - 0.2 * intensity);
  return {
    version: 1,
    id: "caption-emoji-pop.group-squash",
    presetId: "text.emphasis.emoji-pop",
    split: "word",
    layers: [
      { role: "unit", perUnit: true, className: "ipw-emoji-pop-group" },
      { role: "text", perUnit: true, className: "ipw-emoji-pop-word" },
      { role: "clone-accent", perUnit: true, className: "ipw-emoji-pop-accent" }
    ],
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: entryDuration,
        stagger: spacing,
        keyframes: [
          {
            percentage: 0,
            properties: { opacity: 1, scaleX: entryScale, scaleY: 1, transformOrigin: "50% 50%" }
          },
          {
            percentage: 100,
            ease: "power3.out",
            properties: { opacity: 1, scaleX: 1, scaleY: 1, transformOrigin: "50% 50%" }
          }
        ]
      },
      {
        role: "unit",
        position: entryDuration,
        duration: exitDuration,
        stagger: spacing,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, scaleX: 1, scaleY: 1 } },
          { percentage: 100, ease: "power2.in", properties: { opacity: 1, scaleX: 1, scaleY: 1 } }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: entryDuration + exitDuration,
        stagger: spacing,
        keyframes: [
          {
            percentage: 0,
            properties: {
              color: "inherit",
              textShadow: "0 4px 8px rgba(0,0,0,0.7), 0 0 2px #B2F7FF, 0 0 8px rgba(178,247,255,0.6)",
              letterSpacing: "0em"
            }
          },
          {
            percentage: 100,
            properties: {
              color: "inherit",
              textShadow: "none",
              letterSpacing: "0em"
            }
          }
        ]
      },
      {
        role: "clone-accent",
        position: 0,
        duration: entryDuration + exitDuration,
        stagger: spacing,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 0,
              color: "#FF76FF",
              textShadow: "0 0 2px #FF0002, 0 0 8px #B2F7FF",
              mixBlendMode: "screen",
              y: -0.7
            }
          },
          {
            percentage: 35,
            ease: "power3.out",
            properties: {
              opacity: 0.35,
              color: "#FF76FF",
              textShadow: "0 0 2px #FF0002, 0 0 8px #B2F7FF",
              mixBlendMode: "screen",
              y: -0.7
            }
          },
          {
            percentage: 100,
            ease: "power2.in",
            properties: {
              opacity: 0,
              color: "#FF76FF",
              textShadow: "0 0 2px #FF0002, 0 0 8px #B2F7FF",
              mixBlendMode: "screen",
              y: -0.7
            }
          }
        ]
      }
    ]
  };
}
function resolveParticleBurstStructuredRecipe(parameters = {}) {
  const rate = speed2(parameters);
  const density = finiteNumber2(parameters, "density", 1, 0, 2);
  const intensity = finiteNumber2(parameters, "intensity", 1, 0.2, 2);
  const wordSpacing = stagger(parameters, 0.06);
  const particleCount = Math.min(96, Math.max(0, Math.round(10 * density)));
  const burstDistance = 320 * intensity;
  const keywordColor = effectColor2(parameters, "#FFD700");
  const particlePalette = "radial-gradient(circle, #FFD700 0 18%, #FF6B35 19% 30%, #FF3C78 31% 42%, #9B5DE5 43% 54%, #00BBF9 55% 66%, #00F5D4 67% 78%, #FFFFFF 79% 89%, #F15BB5 90% 100%)";
  const burstPercentage = 0.12 / 0.57 * 100;
  return {
    version: 1,
    id: "caption-particle-burst.radial-word-burst",
    presetId: "text.emphasis.particle-burst",
    split: "word",
    seed: "caption-particle-burst",
    layers: [
      { role: "unit", perUnit: true, className: "ipw-particle-burst-word" },
      { role: "text", perUnit: true, className: "ipw-particle-burst-text" },
      { role: "particle-container", perUnit: true, className: "ipw-particle-burst-particles" },
      { role: "particle", perUnit: true, className: "ipw-particle-burst-particle" }
    ],
    particles: {
      count: particleCount,
      x: [-burstDistance, burstDistance],
      y: [-burstDistance, burstDistance],
      size: [4, 12],
      delay: [0, 0]
    },
    tracks: [
      {
        role: "unit",
        position: 0,
        duration: 0.2 / rate,
        stagger: wordSpacing,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, scale: 0.92, visibility: "visible" } },
          {
            percentage: 100,
            ease: "back.out(1.5)",
            properties: { opacity: 1, scale: 1, visibility: "visible" }
          }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: 0.08 / rate,
        stagger: wordSpacing,
        keyframes: [
          { percentage: 0, properties: { color: "rgba(255,255,255,0.45)", scale: 1 } },
          { percentage: 100, properties: { color: keywordColor, scale: 1 + 0.12 * intensity } }
        ]
      },
      {
        role: "text",
        position: 0.08 / rate,
        duration: 0.1 / rate,
        stagger: wordSpacing,
        keyframes: [
          { percentage: 0, properties: { color: keywordColor, scale: 1 + 0.12 * intensity } },
          { percentage: 100, properties: { color: keywordColor, scale: 1 } }
        ]
      },
      {
        role: "particle",
        position: 0,
        duration: 0.57 / rate,
        stagger: 0.018 / rate,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0.5,
              borderRadius: "50%",
              backgroundImage: particlePalette
            }
          },
          {
            percentage: burstPercentage,
            ease: "power3.out",
            properties: {
              opacity: 1,
              x: "var(--ipw-motion-particle-x)",
              y: "var(--ipw-motion-particle-y)",
              scale: 1,
              borderRadius: "50%",
              backgroundImage: particlePalette
            }
          },
          {
            percentage: 100,
            ease: "power1.in",
            properties: {
              opacity: 0,
              x: "var(--ipw-motion-particle-x)",
              y: "var(--ipw-motion-particle-y)",
              scale: 1,
              borderRadius: "50%",
              backgroundImage: particlePalette
            }
          }
        ]
      },
      {
        role: "particle",
        position: 0.7 / rate,
        duration: 0,
        stagger: 0,
        keyframes: [{ percentage: 0, properties: { opacity: 0, x: 0, y: 0, scale: 0.5 } }]
      }
    ]
  };
}

// ../core/dist/motionPresetCatalog.js
var EASE_OPTIONS = [
  { value: "power2.out", label: "\u67D4\u548C" },
  { value: "power3.out", label: "\u987A\u6ED1" },
  { value: "power3.inOut", label: "\u987A\u6ED1\u8FDB\u51FA" },
  { value: "power4.inOut", label: "\u5FEB\u901F\u8FDB\u51FA" },
  { value: "expo.inOut", label: "\u955C\u5934\u805A\u7126" },
  { value: "back.out(1.7)", label: "\u5F39\u6027" },
  { value: "sine.inOut", label: "\u81EA\u7136" },
  { value: "none", label: "\u5300\u901F" }
];
var DIRECTION_OPTIONS = [
  { value: "up", label: "\u5411\u4E0A" },
  { value: "down", label: "\u5411\u4E0B" },
  { value: "left", label: "\u5411\u5DE6" },
  { value: "right", label: "\u5411\u53F3" }
];
var UNIT_OPTIONS = [
  { value: "whole", label: "\u6574\u6BB5" },
  { value: "word", label: "\u6309\u8BCD" },
  { value: "character", label: "\u6309\u5B57" }
];
var MOTION_COMMON_PARAMETERS = [
  { id: "ease", label: "\u901F\u5EA6\u66F2\u7EBF", kind: "select", options: EASE_OPTIONS }
];
var MOTION_COLOR_SOURCE_PARAMETER = {
  id: "colorSource",
  label: "\u989C\u8272\u6765\u6E90",
  kind: "select",
  options: [
    { value: "theme", label: "\u8DDF\u968F\u4E3B\u9898" },
    { value: "custom", label: "\u81EA\u5B9A\u4E49" }
  ]
};
var MOTION_INTENSITY_PARAMETER = {
  id: "intensity",
  label: "\u5F3A\u5EA6",
  kind: "number",
  min: 0.2,
  max: 2,
  step: 0.1
};
var MOTION_GLOW_PARAMETER = {
  id: "glow",
  label: "\u8F89\u5149",
  kind: "number",
  min: 0,
  max: 2,
  step: 0.1
};
var MOTION_BLUR_PARAMETER = {
  id: "blur",
  label: "\u6A21\u7CCA",
  kind: "number",
  min: 0,
  max: 32,
  step: 1,
  unit: "px"
};
var MOTION_DENSITY_PARAMETER = {
  id: "density",
  label: "\u5BC6\u5EA6",
  kind: "number",
  min: 0,
  max: 2,
  step: 0.1
};
var MOTION_DISTANCE_PARAMETER = {
  id: "distance",
  label: "\u79FB\u52A8\u8DDD\u79BB",
  kind: "number",
  min: 0,
  max: 180,
  step: 2,
  unit: "px"
};
var MOTION_SPEED_PARAMETER = {
  id: "speed",
  label: "Animation speed",
  kind: "number",
  min: 0.5,
  max: 2,
  step: 0.1,
  unit: "x"
};
var MOTION_READABILITY_PARAMETER = {
  id: "preserveReadable",
  label: "\u4FDD\u6301\u53EF\u8BFB",
  kind: "select",
  options: [
    { value: "true", label: "\u5F00\u542F" },
    { value: "false", label: "\u5173\u95ED" }
  ]
};
var MOTION_DIRECTION_PARAMETER = {
  id: "direction",
  label: "\u65B9\u5411",
  kind: "select",
  options: DIRECTION_OPTIONS
};
var MOTION_TEXT_PARAMETERS = [
  { id: "unit", label: "\u6587\u5B57\u65B9\u5F0F", kind: "select", options: UNIT_OPTIONS },
  { id: "stagger", label: "\u5B57\u8BCD\u95F4\u9694", kind: "number", min: 0, max: 0.3, step: 0.01, unit: "s" }
];
function finiteParameter(parameters, id, fallback) {
  const value = Number(parameters[id] ?? fallback);
  return Number.isFinite(value) ? value : fallback;
}
function highlightTransformOrigin(direction) {
  if (direction === "left")
    return "100% 50%";
  if (direction === "up")
    return "50% 100%";
  if (direction === "down")
    return "50% 0%";
  return "0% 50%";
}
function highlightColor(parameters) {
  const color2 = parameters.colorSource === "theme" ? "var(--ipw-color-accent, #ff1745)" : String(parameters.color ?? "#ff1745");
  return color2.toLowerCase();
}
function createHighlightSweepStructuredRecipe(parameters = {}) {
  const direction = String(parameters.direction ?? "right");
  const split3 = String(parameters.unit ?? "word");
  const stagger2 = finiteParameter(parameters, "stagger", 0.05);
  const speed3 = finiteParameter(parameters, "speed", 1);
  const intensity = finiteParameter(parameters, "intensity", 1);
  const roundness = finiteParameter(parameters, "roundness", 10);
  const color2 = highlightColor(parameters);
  const defaultRed = color2 === "#ff1745";
  const endColor = defaultRed ? "#df1238" : `color-mix(in srgb, ${color2} 87%, #000000)`;
  const shadowAlpha = Math.min(0.8, 0.32 * intensity).toFixed(2);
  const shadow = defaultRed ? `0 12px 30px rgba(229, 20, 58, ${shadowAlpha})` : `0 12px 30px color-mix(in srgb, ${color2} ${Math.round(Number(shadowAlpha) * 100)}%, transparent)`;
  const transformOrigin = highlightTransformOrigin(direction);
  const horizontal = direction === "left" || direction === "right";
  const scaleProperty = horizontal ? "scaleX" : "scaleY";
  const hiddenScale = { [scaleProperty]: 0 };
  const visibleScale = { [scaleProperty]: 1 };
  const exitScale = { [scaleProperty]: 1.02 };
  return {
    version: 1,
    id: "caption-highlight.word-sweep",
    presetId: "text.emphasis.highlight-sweep",
    split: split3,
    layers: [
      { role: "unit", perUnit: true, className: "ipw-highlight-word" },
      { role: "background", perUnit: true, className: "ipw-highlight-word-bg" },
      { role: "text", perUnit: true, className: "ipw-highlight-word-text" }
    ],
    tracks: [
      {
        role: "background",
        position: 0,
        duration: 0.15 / speed3,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: {
              opacity: 0,
              ...hiddenScale,
              transformOrigin,
              backgroundImage: `linear-gradient(135deg, ${color2} 0%, ${endColor} 100%)`,
              borderRadius: `${roundness}px`,
              boxShadow: shadow
            }
          },
          {
            percentage: 100,
            ease: "power2.out",
            properties: { opacity: 1, ...visibleScale, transformOrigin }
          }
        ]
      },
      {
        role: "background",
        position: 0.23 / speed3,
        duration: 0.1 / speed3,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { opacity: 1, ...visibleScale, transformOrigin } },
          {
            percentage: 100,
            ease: "power2.in",
            properties: { opacity: 0, ...exitScale, transformOrigin }
          }
        ]
      },
      {
        role: "background",
        position: 0.33 / speed3,
        duration: 0,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: { opacity: 0, ...hiddenScale, transformOrigin }
          }
        ]
      },
      {
        role: "unit",
        position: 0,
        duration: 0.24 / speed3,
        stagger: stagger2,
        keyframes: [
          { percentage: 0, properties: { filter: "brightness(1)" } },
          {
            percentage: 33,
            ease: "power2.out",
            properties: { filter: `brightness(${(1 + 0.05 * intensity).toFixed(2)})` }
          },
          { percentage: 100, ease: "power2.out", properties: { filter: "brightness(1)" } }
        ]
      },
      {
        role: "text",
        position: 0,
        duration: 0.33 / speed3,
        stagger: stagger2,
        keyframes: [
          {
            percentage: 0,
            properties: { color: "inherit", textShadow: "none" }
          },
          {
            percentage: 38,
            properties: { color: "#ffffff", textShadow: "0 6px 18px rgba(0, 0, 0, 0.45)" }
          },
          {
            percentage: 70,
            properties: { color: "#ffffff", textShadow: "0 6px 18px rgba(0, 0, 0, 0.45)" }
          },
          {
            percentage: 100,
            properties: { color: "inherit", textShadow: "none" }
          }
        ]
      }
    ]
  };
}
function resolveStructuredTextRecipe(preset, parameters) {
  if (preset.id === "text.emphasis.highlight-sweep")
    return createHighlightSweepStructuredRecipe(parameters);
  if (preset.id === "text.enter.editorial-emphasis")
    return resolveEditorialEmphasisStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.karaoke-flow")
    return resolveKaraokeFlowStructuredRecipe(parameters);
  if (preset.id === "text.enter.camera-track")
    return resolveCameraTrackStructuredRecipe(parameters);
  if (preset.id === "text.enter.visual-layers")
    return resolveVisualLayersStructuredRecipe(parameters);
  if (preset.id === "text.enter.matrix-decode")
    return resolveMatrixDecodeStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.gradient-fill")
    return resolveGradientFillStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.neon-glow")
    return resolveNeonGlowStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.neon-accent")
    return resolveNeonAccentStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.rgb-glitch")
    return resolveGlitchRgbStructuredRecipe(parameters);
  if (preset.id === "text.enter.clip-wipe")
    return resolveClipWipeStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.blend-difference")
    return resolveBlendDifferenceStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.weight-shift")
    return resolveWeightShiftStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.texture-fill")
    return resolveTextureFillStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.kinetic-slam")
    return resolveKineticSlamStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.emoji-pop")
    return resolveEmojiPopStructuredRecipe(parameters);
  if (preset.id === "text.emphasis.particle-burst")
    return resolveParticleBurstStructuredRecipe(parameters);
  return preset.structuredText;
}
function textPreset(seed2) {
  return {
    id: seed2.id,
    version: 1,
    label: seed2.label,
    phase: seed2.phase,
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      ...seed2.intensity ? [MOTION_INTENSITY_PARAMETER] : [],
      ...seed2.direction ? [MOTION_DIRECTION_PARAMETER] : [],
      ...MOTION_TEXT_PARAMETERS,
      ...seed2.color ? [
        MOTION_COLOR_SOURCE_PARAMETER,
        { id: "color", label: "\u6548\u679C\u989C\u8272", kind: "color" }
      ] : []
    ],
    defaults: {
      ease: seed2.phase === "emphasis" ? "sine.inOut" : "power2.out",
      ...seed2.intensity ? { intensity: 1 } : {},
      unit: "whole",
      stagger: 0.04,
      ...seed2.direction ? { direction: seed2.phase === "exit" ? "up" : "up" } : {},
      ...seed2.color ? { colorSource: "custom", color: "#7c3aed" } : {},
      ...seed2.defaults
    },
    ...seed2.structuredText ? { structuredText: seed2.structuredText } : {},
    semantics: seed2.semantics
  };
}
function migratedTextPreset(seed2) {
  return {
    ...textPreset(seed2),
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      ...seed2.direction ? [MOTION_DIRECTION_PARAMETER] : [],
      ...MOTION_TEXT_PARAMETERS,
      ...seed2.color ? [
        MOTION_COLOR_SOURCE_PARAMETER,
        { id: "color", label: "\u6548\u679C\u989C\u8272", kind: "color" }
      ] : [],
      ...seed2.extraParameters ?? [],
      ...seed2.defaults?.speed !== void 0 && !(seed2.extraParameters ?? []).some((parameter) => parameter.id === "speed") ? [MOTION_SPEED_PARAMETER] : []
    ],
    defaults: {
      ease: seed2.phase === "emphasis" ? "sine.inOut" : "power3.out",
      intensity: 1,
      unit: "word",
      stagger: 0.04,
      ...seed2.direction ? { direction: "right" } : {},
      ...seed2.color ? { colorSource: "theme", color: "#20BBC0" } : {},
      ...seed2.defaults
    },
    ...seed2.structuredText ? { structuredText: seed2.structuredText } : {}
  };
}
function elementPreset(seed2) {
  return {
    id: seed2.id,
    version: 1,
    label: seed2.label,
    phase: seed2.phase,
    targetKinds: ["element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      ...seed2.intensity ? [MOTION_INTENSITY_PARAMETER] : [],
      ...seed2.direction ? [MOTION_DIRECTION_PARAMETER] : []
    ],
    defaults: {
      ease: seed2.phase === "emphasis" ? "sine.inOut" : "power2.out",
      ...seed2.intensity ? { intensity: 1 } : {},
      ...seed2.direction ? { direction: "up" } : {},
      ...seed2.defaults
    },
    semantics: seed2.semantics
  };
}
var TEXT_MOTION_PRESETS = [
  textPreset({
    id: "text.enter.fade",
    label: "\u6DE1\u5165",
    phase: "enter",
    semantics: {
      intents: ["\u51FA\u73B0", "\u6DE1\u5165"],
      tones: ["\u514B\u5236", "\u901A\u7528"],
      preferredFor: ["\u6B63\u6587", "\u8BF4\u660E\u6587\u5B57"],
      avoidFor: ["\u5F3A\u51B2\u51FB\u6807\u9898"]
    }
  }),
  textPreset({
    id: "text.enter.rise",
    label: "\u6D6E\u5165",
    phase: "enter",
    intensity: true,
    direction: true,
    semantics: {
      intents: ["\u8FDB\u5165", "\u4E0A\u6D6E"],
      tones: ["\u73B0\u4EE3", "\u514B\u5236"],
      preferredFor: ["\u4E3B\u6807\u9898", "\u7AE0\u8282\u6807\u9898"],
      avoidFor: ["\u5BC6\u96C6\u5B57\u5E55"]
    }
  }),
  textPreset({
    id: "text.enter.pop",
    label: "\u5F39\u5165",
    phase: "enter",
    intensity: true,
    defaults: { ease: "back.out(1.7)", intensity: 0.8 },
    semantics: {
      intents: ["\u5F39\u51FA", "\u5438\u5F15\u6CE8\u610F"],
      tones: ["\u6D3B\u6CFC", "\u53CB\u597D"],
      preferredFor: ["\u77ED\u6807\u9898", "\u6570\u5B57"],
      avoidFor: ["\u4E25\u8083\u957F\u6587"]
    }
  }),
  textPreset({
    id: "text.enter.zoom",
    label: "\u7F29\u653E\u8FDB\u5165",
    phase: "enter",
    intensity: true,
    semantics: {
      intents: ["\u653E\u5927\u8FDB\u5165", "\u805A\u7126"],
      tones: ["\u76F4\u63A5", "\u73B0\u4EE3"],
      preferredFor: ["\u6807\u9898", "\u5173\u952E\u6570\u636E"],
      avoidFor: ["\u957F\u6BB5\u843D"]
    }
  }),
  textPreset({
    id: "text.enter.flip",
    label: "\u7FFB\u8F6C\u8FDB\u5165",
    phase: "enter",
    intensity: true,
    direction: true,
    semantics: {
      intents: ["\u7FFB\u8F6C", "\u63ED\u793A"],
      tones: ["\u52A8\u611F", "\u79D1\u6280"],
      preferredFor: ["\u77ED\u6807\u9898", "\u6807\u7B7E"],
      avoidFor: ["\u6B63\u6587"]
    }
  }),
  textPreset({
    id: "text.enter.wipe",
    label: "\u64E6\u9664\u8FDB\u5165",
    phase: "enter",
    direction: true,
    semantics: {
      intents: ["\u64E6\u5165", "\u63ED\u5E55"],
      tones: ["\u5229\u843D", "\u7F16\u8F91\u611F"],
      preferredFor: ["\u6807\u9898", "\u5B57\u5E55"],
      avoidFor: ["\u8D85\u957F\u6587\u672C"]
    }
  }),
  textPreset({
    id: "text.enter.typewriter",
    label: "\u9010\u5B57\u51FA\u73B0",
    phase: "enter",
    intensity: true,
    defaults: { unit: "character", stagger: 0.05, ease: "none" },
    semantics: {
      intents: ["\u6253\u5B57", "\u9010\u5B57\u663E\u793A"],
      tones: ["\u53D9\u4E8B", "\u6570\u5B57\u5316"],
      preferredFor: ["\u77ED\u53E5", "\u5BF9\u8BDD", "\u4EE3\u7801"],
      avoidFor: ["\u5927\u6BB5\u6B63\u6587"]
    }
  }),
  textPreset({
    id: "text.enter.decode",
    label: "\u5B57\u7B26\u89E3\u7801",
    phase: "enter",
    intensity: true,
    defaults: { unit: "character", stagger: 0.03 },
    semantics: {
      intents: ["\u89E3\u7801", "\u79D1\u6280\u63ED\u793A"],
      tones: ["\u79D1\u6280", "\u795E\u79D8"],
      preferredFor: ["\u79D1\u6280\u6807\u9898", "\u7F16\u53F7"],
      avoidFor: ["\u6B63\u5F0F\u6B63\u6587"]
    }
  }),
  textPreset({
    id: "text.emphasis.pulse",
    label: "\u8109\u51B2",
    phase: "emphasis",
    intensity: true,
    semantics: {
      intents: ["\u5F3A\u8C03", "\u547C\u5438"],
      tones: ["\u514B\u5236", "\u67D4\u548C"],
      preferredFor: ["\u5173\u952E\u8BCD", "\u6570\u5B57"],
      avoidFor: ["\u8FDE\u7EED\u5FAA\u73AF"]
    }
  }),
  textPreset({
    id: "text.emphasis.bounce",
    label: "\u5F39\u8DF3",
    phase: "emphasis",
    intensity: true,
    defaults: { ease: "power2.out" },
    semantics: {
      intents: ["\u5F39\u8DF3", "\u63D0\u9192"],
      tones: ["\u6D3B\u6CFC", "\u8F7B\u5FEB"],
      preferredFor: ["\u77ED\u8BCD", "CTA"],
      avoidFor: ["\u4E25\u8083\u6B63\u6587"]
    }
  }),
  textPreset({
    id: "text.emphasis.wobble",
    label: "\u6447\u6446",
    phase: "emphasis",
    intensity: true,
    semantics: {
      intents: ["\u6447\u6446", "\u63D0\u793A"],
      tones: ["\u8F7B\u677E", "\u4FCF\u76AE"],
      preferredFor: ["\u56FE\u5F62\u5316\u6587\u5B57", "\u77ED\u6807\u9898"],
      avoidFor: ["\u5927\u6BB5\u6587\u5B57"]
    }
  }),
  textPreset({
    id: "text.emphasis.shake",
    label: "\u8F7B\u5FAE\u6296\u52A8",
    phase: "emphasis",
    intensity: true,
    semantics: {
      intents: ["\u6296\u52A8", "\u8B66\u793A"],
      tones: ["\u7D27\u5F20", "\u9192\u76EE"],
      preferredFor: ["\u8B66\u544A", "\u5173\u952E\u53D8\u5316"],
      avoidFor: ["\u8212\u7F13\u5185\u5BB9"]
    }
  }),
  textPreset({
    id: "text.emphasis.highlight",
    label: "\u9AD8\u4EAE\u626B\u5149",
    phase: "emphasis",
    intensity: true,
    color: true,
    semantics: {
      intents: ["\u9AD8\u4EAE", "\u626B\u5149"],
      tones: ["\u7CBE\u81F4", "\u9AD8\u7EA7"],
      preferredFor: ["\u5173\u952E\u8BCD", "\u54C1\u724C\u6807\u9898"],
      avoidFor: ["\u5C0F\u5B57\u53F7\u6B63\u6587"]
    }
  }),
  textPreset({
    id: "text.emphasis.glitch",
    label: "\u6545\u969C\u95EA\u70C1",
    phase: "emphasis",
    intensity: true,
    color: true,
    semantics: {
      intents: ["\u6545\u969C", "\u79D1\u6280\u5F3A\u8C03"],
      tones: ["\u79D1\u6280", "\u5F3A\u70C8"],
      preferredFor: ["\u79D1\u6280\u6807\u9898", "\u8F6C\u6298"],
      avoidFor: ["\u7A33\u91CD\u54C1\u724C"]
    }
  }),
  textPreset({
    id: "text.exit.fade",
    label: "\u6DE1\u51FA",
    phase: "exit",
    semantics: {
      intents: ["\u6D88\u5931", "\u6DE1\u51FA"],
      tones: ["\u514B\u5236", "\u901A\u7528"],
      preferredFor: ["\u6B63\u6587", "\u8BF4\u660E\u6587\u5B57"],
      avoidFor: ["\u5F3A\u51B2\u51FB\u6536\u5C3E"]
    }
  }),
  textPreset({
    id: "text.exit.drift",
    label: "\u98D8\u51FA",
    phase: "exit",
    intensity: true,
    direction: true,
    semantics: {
      intents: ["\u79BB\u5F00", "\u98D8\u51FA"],
      tones: ["\u81EA\u7136", "\u8F7B\u76C8"],
      preferredFor: ["\u6807\u9898", "\u5B57\u5E55"],
      avoidFor: ["\u7D27\u51D1\u5207\u6362"]
    }
  }),
  textPreset({
    id: "text.exit.shrink",
    label: "\u7F29\u5C0F\u9000\u51FA",
    phase: "exit",
    intensity: true,
    semantics: {
      intents: ["\u7F29\u5C0F", "\u6536\u675F"],
      tones: ["\u76F4\u63A5", "\u73B0\u4EE3"],
      preferredFor: ["\u6807\u9898", "\u5173\u952E\u6570\u636E"],
      avoidFor: ["\u957F\u6BB5\u843D"]
    }
  }),
  textPreset({
    id: "text.exit.flip",
    label: "\u7FFB\u8F6C\u9000\u51FA",
    phase: "exit",
    intensity: true,
    direction: true,
    semantics: {
      intents: ["\u7FFB\u8F6C\u79BB\u5F00"],
      tones: ["\u52A8\u611F", "\u79D1\u6280"],
      preferredFor: ["\u77ED\u6807\u9898", "\u6807\u7B7E"],
      avoidFor: ["\u6B63\u6587"]
    }
  }),
  textPreset({
    id: "text.exit.wipe",
    label: "\u64E6\u9664\u9000\u51FA",
    phase: "exit",
    direction: true,
    semantics: {
      intents: ["\u64E6\u9664", "\u6536\u5E55"],
      tones: ["\u5229\u843D", "\u7F16\u8F91\u611F"],
      preferredFor: ["\u6807\u9898", "\u5B57\u5E55"],
      avoidFor: ["\u8D85\u957F\u6587\u672C"]
    }
  }),
  textPreset({
    id: "text.exit.blur",
    label: "\u6A21\u7CCA\u6D88\u5931",
    phase: "exit",
    intensity: true,
    semantics: {
      intents: ["\u6A21\u7CCA", "\u6D88\u6563"],
      tones: ["\u67D4\u548C", "\u7535\u5F71\u611F"],
      preferredFor: ["\u6807\u9898", "\u60C5\u7EEA\u6587\u5B57"],
      avoidFor: ["\u5C0F\u5B57\u53F7\u8BF4\u660E"]
    }
  })
];
var MIGRATED_CAPTION_TEXT_PRESETS = [
  migratedTextPreset({
    id: "text.enter.editorial-emphasis",
    label: "\u7F16\u8F91\u91CD\u70B9",
    phase: "enter",
    direction: true,
    color: true,
    defaults: {
      unit: "word",
      stagger: 0.075,
      direction: "up",
      colorSource: "theme",
      color: "#20BBC0",
      blur: 7,
      distance: 28,
      emphasisWeight: 800,
      speed: 1
    },
    extraParameters: [
      MOTION_BLUR_PARAMETER,
      MOTION_DISTANCE_PARAMETER,
      {
        id: "emphasisWeight",
        label: "\u5F3A\u8C03\u5B57\u91CD",
        kind: "number",
        min: 100,
        max: 900,
        step: 50
      },
      MOTION_SPEED_PARAMETER
    ],
    structuredText: resolveEditorialEmphasisStructuredRecipe(),
    semantics: {
      intents: ["\u7F16\u8F91\u91CD\u70B9", "\u9010\u8BCD\u5F3A\u8C03", "\u6807\u9898\u663E\u73B0"],
      tones: ["\u7F16\u8F91\u611F", "\u9AD8\u7EA7", "\u6E05\u6670"],
      preferredFor: ["\u6807\u9898", "\u5173\u952E\u53E5", "\u54C1\u724C\u4E3B\u5F20"],
      avoidFor: ["\u8D85\u957F\u6B63\u6587", "\u6781\u5C0F\u5B57\u53F7"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.karaoke-flow",
    label: "\u79FB\u52A8\u5361\u62C9 OK",
    phase: "emphasis",
    color: true,
    defaults: {
      unit: "word",
      stagger: 0.12,
      colorSource: "theme",
      color: "#20BBC0",
      roundness: 10,
      lift: 7,
      speed: 1
    },
    extraParameters: [
      { id: "roundness", label: "\u5706\u89D2", kind: "number", min: 0, max: 40, step: 1, unit: "px" },
      { id: "lift", label: "\u62AC\u5347\u8DDD\u79BB", kind: "number", min: 0, max: 40, step: 1, unit: "px" },
      MOTION_SPEED_PARAMETER
    ],
    structuredText: resolveKaraokeFlowStructuredRecipe(),
    semantics: {
      intents: ["\u5361\u62C9 OK", "\u9010\u8BCD\u8DDF\u968F", "\u5B57\u5E55\u5F3A\u8C03"],
      tones: ["\u6E05\u6670", "\u8282\u594F", "\u73B0\u4EE3"],
      preferredFor: ["\u5B57\u5E55", "\u65C1\u767D\u91CD\u70B9", "\u77ED\u53E5"],
      avoidFor: ["\u5355\u5B57\u6807\u9898", "\u8D85\u957F\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.enter.camera-track",
    label: "\u955C\u5934\u8DDF\u968F",
    phase: "enter",
    direction: true,
    defaults: {
      unit: "word",
      stagger: 0.075,
      direction: "up",
      distance: 54,
      blur: 12,
      speed: 1
    },
    extraParameters: [MOTION_DISTANCE_PARAMETER, MOTION_BLUR_PARAMETER, MOTION_SPEED_PARAMETER],
    structuredText: resolveCameraTrackStructuredRecipe(),
    semantics: {
      intents: ["\u955C\u5934\u8DDF\u968F", "\u62C9\u7126", "\u666F\u6DF1\u663E\u73B0"],
      tones: ["\u7535\u5F71\u611F", "\u6C89\u6D78", "\u7CBE\u81F4"],
      preferredFor: ["\u6807\u9898", "\u7AE0\u8282\u6587\u5B57", "\u77ED\u5B57\u5E55"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.enter.visual-layers",
    label: "\u89C6\u89C9\u5C42\u53E0",
    phase: "enter",
    color: true,
    defaults: {
      unit: "word",
      stagger: 0.055,
      colorSource: "theme",
      color: "#5B6CFF",
      accentColor: "#20BBC0",
      distance: 18,
      blur: 4,
      speed: 1
    },
    extraParameters: [
      { id: "accentColor", label: "\u5F3A\u8C03\u8272", kind: "color" },
      MOTION_DISTANCE_PARAMETER,
      MOTION_BLUR_PARAMETER,
      MOTION_SPEED_PARAMETER
    ],
    structuredText: resolveVisualLayersStructuredRecipe(),
    semantics: {
      intents: ["\u89C6\u89C9\u5C42\u53E0", "\u989C\u8272\u5206\u5C42", "\u805A\u5408\u663E\u73B0"],
      tones: ["\u8BBE\u8BA1\u611F", "\u54C1\u724C\u611F", "\u73B0\u4EE3"],
      preferredFor: ["\u6807\u9898", "\u54C1\u724C\u8BCD", "\u7AE0\u8282\u6587\u5B57"],
      avoidFor: ["\u5C0F\u5B57\u53F7\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.highlight-sweep",
    label: "\u9AD8\u4EAE\u626B\u8FC7",
    phase: "emphasis",
    direction: true,
    color: true,
    defaults: {
      unit: "word",
      stagger: 0.05,
      colorSource: "custom",
      color: "#FF1745",
      roundness: 10,
      speed: 1
    },
    extraParameters: [
      { id: "roundness", label: "\u5706\u89D2", kind: "number", min: 0, max: 24, step: 1, unit: "px" },
      MOTION_SPEED_PARAMETER
    ],
    structuredText: createHighlightSweepStructuredRecipe(),
    semantics: {
      intents: ["\u9AD8\u4EAE", "\u626B\u8FC7", "\u5173\u952E\u8BCD\u5F3A\u5316"],
      tones: ["\u6E05\u6670", "\u7F16\u8F91\u611F"],
      preferredFor: ["\u5173\u952E\u8BCD", "\u6807\u9898", "\u5B57\u5E55\u6587\u5B57"],
      avoidFor: ["\u5F88\u5C0F\u7684\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.enter.matrix-decode",
    label: "\u77E9\u9635\u89E3\u7801",
    phase: "enter",
    color: true,
    defaults: { unit: "word", stagger: 0.1, color: "#00FF41", density: 1, blur: 0, speed: 1 },
    extraParameters: [MOTION_DENSITY_PARAMETER, MOTION_BLUR_PARAMETER, MOTION_SPEED_PARAMETER],
    structuredText: resolveMatrixDecodeStructuredRecipe(),
    semantics: {
      intents: ["\u89E3\u7801", "\u79D1\u6280\u663E\u73B0", "\u5B57\u7B26\u6270\u52A8"],
      tones: ["\u79D1\u6280", "\u5229\u843D"],
      preferredFor: ["\u79D1\u6280\u6807\u9898", "\u7F16\u53F7", "\u77ED\u53E5"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.gradient-fill",
    label: "\u6E10\u53D8\u586B\u5145",
    phase: "emphasis",
    direction: true,
    color: true,
    intensity: true,
    defaults: { unit: "word", stagger: 0.1, color: "#FE9F1B", accentColor: "#FD56CB", speed: 1 },
    extraParameters: [{ id: "accentColor", label: "\u5F3A\u8C03\u8272", kind: "color" }],
    structuredText: resolveGradientFillStructuredRecipe(),
    semantics: {
      intents: ["\u6E10\u53D8", "\u586B\u5145", "\u6D41\u52A8"],
      tones: ["\u660E\u4EAE", "\u54C1\u724C\u611F"],
      preferredFor: ["\u6807\u9898", "\u5173\u952E\u8BCD"],
      avoidFor: ["\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.neon-glow",
    label: "\u9713\u8679\u8F89\u5149",
    phase: "emphasis",
    color: true,
    defaults: { unit: "word", stagger: 0.3, color: "#00FFF0", glow: 1, speed: 1 },
    extraParameters: [MOTION_GLOW_PARAMETER],
    structuredText: resolveNeonGlowStructuredRecipe(),
    semantics: {
      intents: ["\u9713\u8679", "\u53D1\u5149", "\u5F3A\u8C03"],
      tones: ["\u79D1\u6280", "\u591C\u666F"],
      preferredFor: ["\u6807\u9898", "\u54C1\u724C\u8BCD"],
      avoidFor: ["\u957F\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.neon-accent",
    label: "\u9713\u8679\u5F3A\u8C03",
    phase: "emphasis",
    color: true,
    defaults: { unit: "word", stagger: 0.04, color: "#53FF01", glow: 1, speed: 1 },
    extraParameters: [MOTION_GLOW_PARAMETER],
    structuredText: resolveNeonAccentStructuredRecipe(),
    semantics: {
      intents: ["\u9713\u8679", "\u5F3A\u8C03\u8272", "\u8F7B\u5FAE\u6F02\u79FB"],
      tones: ["\u6D3B\u8DC3", "\u79D1\u6280"],
      preferredFor: ["\u77ED\u6807\u9898", "\u5173\u952E\u8BCD"],
      avoidFor: ["\u6B63\u5F0F\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.rgb-glitch",
    label: "RGB \u6545\u969C",
    phase: "emphasis",
    color: true,
    defaults: {
      unit: "word",
      stagger: 0.04,
      color: "#FF003C",
      preserveReadable: "true",
      blur: 0,
      density: 1,
      speed: 1
    },
    extraParameters: [
      MOTION_BLUR_PARAMETER,
      MOTION_DENSITY_PARAMETER,
      MOTION_READABILITY_PARAMETER
    ],
    structuredText: resolveGlitchRgbStructuredRecipe(),
    semantics: {
      intents: ["\u6545\u969C", "RGB", "\u6270\u52A8"],
      tones: ["\u5F3A\u70C8", "\u79D1\u6280"],
      preferredFor: ["\u79D1\u6280\u6807\u9898", "\u8F6C\u6298\u8BCD"],
      avoidFor: ["\u7A33\u91CD\u54C1\u724C", "\u957F\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.enter.clip-wipe",
    label: "\u88C1\u5207\u63ED\u5E55",
    phase: "enter",
    direction: true,
    color: true,
    defaults: { unit: "word", stagger: 0.04, color: "#FFD700", speed: 1 },
    structuredText: resolveClipWipeStructuredRecipe(),
    semantics: {
      intents: ["\u88C1\u5207", "\u63ED\u5E55", "\u65B9\u5411\u8FDB\u5165"],
      tones: ["\u5229\u843D", "\u7F16\u8F91\u611F"],
      preferredFor: ["\u6807\u9898", "\u77ED\u53E5", "\u5B57\u5E55\u6587\u5B57"],
      avoidFor: ["\u8D85\u957F\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.blend-difference",
    label: "\u5DEE\u503C\u53CD\u8272",
    phase: "emphasis",
    color: true,
    defaults: {
      unit: "word",
      stagger: 0.08,
      color: "#FFFFFF",
      preserveReadable: "true",
      blur: 0,
      speed: 1
    },
    extraParameters: [MOTION_BLUR_PARAMETER, MOTION_READABILITY_PARAMETER],
    structuredText: resolveBlendDifferenceStructuredRecipe(),
    semantics: {
      intents: ["\u53CD\u8272", "\u6DF7\u5408", "\u5F3A\u8C03"],
      tones: ["\u5B9E\u9A8C", "\u7F16\u8F91\u611F"],
      preferredFor: ["\u6807\u9898", "\u6D77\u62A5\u6587\u5B57"],
      avoidFor: ["\u5C0F\u5B57\u53F7\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.weight-shift",
    label: "\u5B57\u91CD\u5207\u6362",
    phase: "emphasis",
    defaults: { unit: "word", stagger: 0.08, minWeight: 300, maxWeight: 700, speed: 1 },
    structuredText: resolveWeightShiftStructuredRecipe(),
    extraParameters: [
      { id: "minWeight", label: "\u8D77\u59CB\u5B57\u91CD", kind: "number", min: 100, max: 900, step: 50 },
      { id: "maxWeight", label: "\u5F3A\u8C03\u5B57\u91CD", kind: "number", min: 100, max: 900, step: 50 }
    ],
    semantics: {
      intents: ["\u5B57\u91CD", "\u5F3A\u8C03", "\u6392\u7248"],
      tones: ["\u514B\u5236", "\u9AD8\u7EA7"],
      preferredFor: ["\u6807\u9898", "\u5173\u952E\u8BCD"],
      avoidFor: ["\u4E0D\u652F\u6301\u53EF\u53D8\u5B57\u91CD\u7684\u5B57\u4F53"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.texture-fill",
    label: "\u7EB9\u7406\u586B\u5145",
    phase: "emphasis",
    direction: true,
    color: true,
    defaults: { unit: "word", stagger: 0.04, color: "#FFD0A0", density: 1, speed: 1 },
    extraParameters: [MOTION_DENSITY_PARAMETER],
    structuredText: resolveTextureFillStructuredRecipe(),
    semantics: {
      intents: ["\u7EB9\u7406", "\u906E\u7F69", "\u586B\u5145"],
      tones: ["\u8BBE\u8BA1\u611F", "\u6D77\u62A5"],
      preferredFor: ["\u5927\u6807\u9898", "\u54C1\u724C\u8BCD"],
      avoidFor: ["\u5C0F\u5B57\u53F7\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.kinetic-slam",
    label: "\u52A8\u611F\u51B2\u51FB",
    phase: "emphasis",
    direction: true,
    defaults: { unit: "word", stagger: 0.04, preserveReadable: "true", distance: 120, speed: 1 },
    extraParameters: [MOTION_DISTANCE_PARAMETER, MOTION_READABILITY_PARAMETER],
    structuredText: resolveKineticSlamStructuredRecipe(),
    semantics: {
      intents: ["\u51B2\u51FB", "\u52A8\u611F", "\u5F3A\u8C03"],
      tones: ["\u5F3A\u70C8", "\u8282\u594F"],
      preferredFor: ["\u77ED\u6807\u9898", "\u5173\u952E\u8BCD"],
      avoidFor: ["\u957F\u6B63\u6587"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.emoji-pop",
    label: "Emoji \u5F39\u51FA",
    phase: "emphasis",
    defaults: { unit: "word", stagger: 0.04, speed: 1 },
    structuredText: resolveEmojiPopStructuredRecipe(),
    semantics: {
      intents: ["emoji", "\u5F39\u51FA", "\u8F7B\u677E"],
      tones: ["playful", "\u793E\u4EA4"],
      preferredFor: ["\u793E\u5A92\u6587\u5B57", "\u8F7B\u677E\u6807\u9898"],
      avoidFor: ["\u6B63\u5F0F\u62A5\u544A"]
    }
  }),
  migratedTextPreset({
    id: "text.emphasis.particle-burst",
    label: "\u7C92\u5B50\u7206\u53D1",
    phase: "emphasis",
    color: true,
    defaults: { unit: "word", stagger: 0.018, color: "#FFD700", density: 1, speed: 1 },
    extraParameters: [MOTION_DENSITY_PARAMETER],
    structuredText: resolveParticleBurstStructuredRecipe(),
    semantics: {
      intents: ["\u7C92\u5B50", "\u7206\u53D1", "\u5173\u952E\u8BCD\u5F3A\u5316"],
      tones: ["\u6D3B\u8DC3", "\u5E86\u795D"],
      preferredFor: ["\u5173\u952E\u8BCD", "\u6570\u5B57", "\u77ED\u6807\u9898"],
      avoidFor: ["\u957F\u6B63\u6587"]
    }
  })
];
var ELEMENT_MOTION_PRESETS = [
  elementPreset({
    id: "element.enter.fade",
    label: "\u6DE1\u5165",
    phase: "enter",
    semantics: {
      intents: ["\u51FA\u73B0", "\u6DE1\u5165"],
      tones: ["\u514B\u5236", "\u901A\u7528"],
      preferredFor: ["\u56FE\u7247", "\u56FE\u6807", "\u5361\u7247", "\u5F62\u72B6"],
      avoidFor: ["\u9700\u8981\u5F3A\u65B9\u5411\u611F\u7684\u8FDB\u5165"]
    }
  }),
  elementPreset({
    id: "element.enter.slide",
    label: "\u6ED1\u5165",
    phase: "enter",
    intensity: true,
    direction: true,
    semantics: {
      intents: ["\u8FDB\u5165", "\u6ED1\u5165", "\u79FB\u52A8\u51FA\u73B0"],
      tones: ["\u6E05\u6670", "\u73B0\u4EE3"],
      preferredFor: ["\u5361\u7247", "\u56FE\u7247", "\u6D41\u7A0B\u8282\u70B9"],
      avoidFor: ["\u5168\u5C4F\u80CC\u666F"]
    }
  }),
  elementPreset({
    id: "element.enter.scale",
    label: "\u7F29\u653E\u8FDB\u5165",
    phase: "enter",
    intensity: true,
    semantics: {
      intents: ["\u653E\u5927\u51FA\u73B0", "\u805A\u7126"],
      tones: ["\u76F4\u63A5", "\u7A33\u91CD"],
      preferredFor: ["\u56FE\u6807", "\u5173\u952E\u56FE\u7247", "\u6570\u636E\u5361\u7247"],
      avoidFor: ["\u5927\u9762\u79EF\u5BB9\u5668"]
    }
  }),
  elementPreset({
    id: "element.emphasis.lift",
    label: "\u6D6E\u8D77",
    phase: "emphasis",
    intensity: true,
    semantics: {
      intents: ["\u5F3A\u8C03", "\u6D6E\u8D77", "\u805A\u7126"],
      tones: ["\u514B\u5236", "\u7CBE\u81F4"],
      preferredFor: ["\u5361\u7247", "\u6309\u94AE", "\u5173\u952E\u56FE\u6807"],
      avoidFor: ["\u5168\u5C4F\u80CC\u666F"]
    }
  }),
  elementPreset({
    id: "element.emphasis.pulse",
    label: "\u547C\u5438",
    phase: "emphasis",
    intensity: true,
    semantics: {
      intents: ["\u5F3A\u8C03", "\u547C\u5438", "\u63D0\u9192"],
      tones: ["\u67D4\u548C", "\u6301\u7EED\u5173\u6CE8"],
      preferredFor: ["\u56FE\u6807", "\u72B6\u6001\u70B9", "CTA"],
      avoidFor: ["\u5927\u9762\u79EF\u56FE\u7247"]
    }
  }),
  elementPreset({
    id: "element.emphasis.tilt",
    label: "\u8F7B\u6446",
    phase: "emphasis",
    intensity: true,
    semantics: {
      intents: ["\u8F7B\u6446", "\u63D0\u793A", "\u6D3B\u8DC3"],
      tones: ["\u8F7B\u5DE7", "\u53CB\u597D"],
      preferredFor: ["\u56FE\u6807", "\u8D34\u7EB8", "\u5C0F\u578B\u5F62\u72B6"],
      avoidFor: ["\u4E25\u8083\u6570\u636E\u5361\u7247", "\u5927\u9762\u79EF\u5BB9\u5668"]
    }
  }),
  elementPreset({
    id: "element.exit.fade",
    label: "\u6DE1\u51FA",
    phase: "exit",
    semantics: {
      intents: ["\u6D88\u5931", "\u6DE1\u51FA"],
      tones: ["\u514B\u5236", "\u901A\u7528"],
      preferredFor: ["\u56FE\u7247", "\u56FE\u6807", "\u5361\u7247", "\u5F62\u72B6"],
      avoidFor: ["\u9700\u8981\u5F3A\u65B9\u5411\u611F\u7684\u79BB\u5F00"]
    }
  }),
  elementPreset({
    id: "element.exit.slide",
    label: "\u6ED1\u51FA",
    phase: "exit",
    intensity: true,
    direction: true,
    semantics: {
      intents: ["\u79BB\u5F00", "\u6ED1\u51FA", "\u79FB\u52A8\u6D88\u5931"],
      tones: ["\u6E05\u6670", "\u73B0\u4EE3"],
      preferredFor: ["\u5361\u7247", "\u56FE\u7247", "\u6D41\u7A0B\u8282\u70B9"],
      avoidFor: ["\u5168\u5C4F\u80CC\u666F"]
    }
  }),
  elementPreset({
    id: "element.exit.scale",
    label: "\u7F29\u5C0F\u9000\u51FA",
    phase: "exit",
    intensity: true,
    semantics: {
      intents: ["\u7F29\u5C0F", "\u6536\u675F", "\u9000\u51FA"],
      tones: ["\u76F4\u63A5", "\u7A33\u91CD"],
      preferredFor: ["\u56FE\u6807", "\u5173\u952E\u56FE\u7247", "\u6570\u636E\u5361\u7247"],
      avoidFor: ["\u5927\u9762\u79EF\u5BB9\u5668"]
    }
  })
];
var REACT_BITS_TEXT_PRESETS = [
  {
    id: "text.enter.blur-reveal",
    version: 1,
    label: "\u96FE\u5316\u663E\u73B0",
    phase: "enter",
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      MOTION_DIRECTION_PARAMETER,
      ...MOTION_TEXT_PARAMETERS,
      { id: "blur", label: "\u6A21\u7CCA\u534A\u5F84", kind: "number", min: 0, max: 32, step: 1, unit: "px" }
    ],
    defaults: {
      ease: "power3.out",
      intensity: 1,
      direction: "up",
      unit: "word",
      stagger: 0.08,
      blur: 14
    },
    semantics: {
      intents: ["\u96FE\u5316", "\u5206\u8BCD\u663E\u73B0", "\u6587\u5B57\u8FDB\u5165"],
      tones: ["\u67D4\u548C", "\u7535\u5F71\u611F"],
      preferredFor: ["\u6807\u9898", "\u77ED\u53E5", "\u7AE0\u8282\u6587\u5B57"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587"]
    }
  },
  {
    id: "text.enter.mask-sweep",
    version: 1,
    label: "\u5206\u8BCD\u63ED\u5E55",
    phase: "enter",
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      MOTION_DIRECTION_PARAMETER,
      ...MOTION_TEXT_PARAMETERS
    ],
    defaults: {
      ease: "power3.out",
      intensity: 1,
      direction: "up",
      unit: "word",
      stagger: 0.06
    },
    semantics: {
      intents: ["\u5206\u8BCD", "\u906E\u7F69\u63ED\u793A", "\u6587\u5B57\u8FDB\u5165"],
      tones: ["\u73B0\u4EE3", "\u7F16\u8F91\u611F"],
      preferredFor: ["\u4E3B\u6807\u9898", "\u5B57\u5E55", "\u5173\u952E\u8BCD"],
      avoidFor: ["\u5BC6\u96C6\u5C0F\u5B57"]
    }
  },
  {
    id: "text.emphasis.prism-glow",
    version: 1,
    label: "\u68F1\u5F69\u6D41\u5149",
    phase: "emphasis",
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      ...MOTION_TEXT_PARAMETERS,
      MOTION_COLOR_SOURCE_PARAMETER,
      { id: "color", label: "\u6D41\u5149\u989C\u8272", kind: "color" }
    ],
    defaults: {
      ease: "sine.inOut",
      intensity: 1,
      unit: "whole",
      stagger: 0.04,
      colorSource: "custom",
      color: "#20BBC0"
    },
    semantics: {
      intents: ["\u6D41\u5149", "\u6587\u5B57\u5F3A\u8C03", "\u9AD8\u4EAE"],
      tones: ["\u79D1\u6280", "\u7CBE\u81F4"],
      preferredFor: ["\u54C1\u724C\u6807\u9898", "\u5173\u952E\u8BCD", "\u6570\u636E"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587"]
    }
  },
  {
    id: "text.enter.fold-reveal",
    version: 1,
    label: "\u6298\u53E0\u6587\u5B57",
    phase: "enter",
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      MOTION_DIRECTION_PARAMETER,
      ...MOTION_TEXT_PARAMETERS,
      {
        id: "perspective",
        label: "\u900F\u89C6\u8DDD\u79BB",
        kind: "number",
        min: 300,
        max: 1400,
        step: 50,
        unit: "px"
      }
    ],
    defaults: {
      ease: "power3.out",
      intensity: 1,
      direction: "up",
      unit: "character",
      stagger: 0.045,
      perspective: 700
    },
    semantics: {
      intents: ["\u6298\u53E0", "\u5206\u5B57\u63ED\u793A", "\u7ACB\u4F53\u6587\u5B57"],
      tones: ["\u7F16\u8F91\u611F", "\u7ACB\u4F53"],
      preferredFor: ["\u4E3B\u6807\u9898", "\u77ED\u53E5", "\u7AE0\u8282\u6587\u5B57"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587", "\u5C0F\u5B57\u53F7\u8BF4\u660E"]
    }
  },
  {
    id: "text.emphasis.shiny-sweep",
    version: 1,
    label: "\u4E3B\u9898\u6D41\u5149",
    phase: "emphasis",
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      MOTION_DIRECTION_PARAMETER,
      ...MOTION_TEXT_PARAMETERS,
      MOTION_COLOR_SOURCE_PARAMETER,
      { id: "color", label: "\u6D41\u5149\u989C\u8272", kind: "color" },
      { id: "glow", label: "\u8F89\u5149", kind: "number", min: 0, max: 2, step: 0.1 }
    ],
    defaults: {
      ease: "sine.inOut",
      intensity: 1,
      direction: "right",
      unit: "whole",
      stagger: 0.04,
      colorSource: "custom",
      color: "#FFFFFF",
      glow: 1
    },
    semantics: {
      intents: ["\u6D41\u5149", "\u9AD8\u5149\u626B\u8FC7", "\u6587\u5B57\u5F3A\u8C03"],
      tones: ["\u7CBE\u81F4", "\u54C1\u724C\u611F"],
      preferredFor: ["\u54C1\u724C\u6807\u9898", "\u5173\u952E\u8BCD", "\u5173\u952E\u6570\u636E"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587"]
    }
  },
  {
    id: "text.emphasis.true-focus",
    version: 1,
    label: "\u9010\u8BCD\u805A\u7126",
    phase: "emphasis",
    targetKinds: ["text"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      ...MOTION_TEXT_PARAMETERS,
      { id: "blur", label: "\u5931\u7126\u534A\u5F84", kind: "number", min: 0, max: 18, step: 1, unit: "px" },
      { id: "focusScale", label: "\u805A\u7126\u7F29\u653E", kind: "number", min: 1, max: 1.25, step: 0.01 }
    ],
    defaults: {
      ease: "sine.inOut",
      intensity: 1,
      unit: "word",
      stagger: 0.08,
      blur: 5,
      focusScale: 1.06
    },
    semantics: {
      intents: ["\u805A\u7126", "\u9010\u8BCD\u5F3A\u8C03", "\u666F\u6DF1"],
      tones: ["\u514B\u5236", "\u53D9\u4E8B"],
      preferredFor: ["\u77ED\u53E5", "\u5B57\u5E55", "\u5173\u952E\u8868\u8FBE"],
      avoidFor: ["\u5355\u5B57\u6807\u9898", "\u5BC6\u96C6\u5C0F\u5B57"]
    }
  }
];
var REACT_BITS_GENERAL_PRESETS = [
  {
    id: "motion.enter.content-reveal",
    version: 1,
    label: "\u5185\u5BB9\u663E\u73B0",
    phase: "enter",
    targetKinds: ["text", "element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      { id: "distance", label: "\u79FB\u52A8\u8DDD\u79BB", kind: "number", min: 0, max: 180, step: 2, unit: "px" },
      { id: "initialOpacity", label: "\u521D\u59CB\u900F\u660E\u5EA6", kind: "number", min: 0, max: 1, step: 0.05 },
      { id: "initialScale", label: "\u521D\u59CB\u7F29\u653E", kind: "number", min: 0.5, max: 1.2, step: 0.05 }
    ],
    defaults: {
      ease: "power3.out",
      direction: "up",
      distance: 56,
      initialOpacity: 0,
      initialScale: 0.92
    },
    semantics: {
      intents: ["\u5185\u5BB9\u8FDB\u5165", "\u6ED1\u52A8\u663E\u73B0", "\u901A\u7528\u52A8\u753B"],
      tones: ["\u73B0\u4EE3", "\u514B\u5236"],
      preferredFor: ["\u6587\u5B57", "\u56FE\u7247", "\u5361\u7247", "\u56FE\u5F62"],
      avoidFor: ["\u5168\u5C4F\u80CC\u666F"]
    }
  },
  {
    id: "motion.emphasis.soft-float",
    version: 1,
    label: "\u67D4\u548C\u6F02\u6D6E",
    phase: "emphasis",
    targetKinds: ["text", "element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER,
      { id: "distance", label: "\u6F02\u6D6E\u8DDD\u79BB", kind: "number", min: 2, max: 48, step: 1, unit: "px" }
    ],
    defaults: {
      ease: "sine.inOut",
      direction: "up",
      intensity: 1,
      distance: 12
    },
    semantics: {
      intents: ["\u6F02\u6D6E", "\u547C\u5438", "\u901A\u7528\u5F3A\u8C03"],
      tones: ["\u67D4\u548C", "\u8F7B\u76C8"],
      preferredFor: ["\u56FE\u6807", "\u6807\u9898", "\u5361\u7247", "\u88C5\u9970\u56FE\u5F62"],
      avoidFor: ["\u5BC6\u96C6\u6B63\u6587"]
    }
  },
  {
    id: "motion.emphasis.focus-tilt",
    version: 1,
    label: "\u666F\u6DF1\u503E\u659C",
    phase: "emphasis",
    targetKinds: ["text", "element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER
    ],
    defaults: { ease: "sine.inOut", direction: "right", intensity: 1 },
    semantics: {
      intents: ["\u503E\u659C", "\u805A\u7126", "\u901A\u7528\u5F3A\u8C03"],
      tones: ["\u7ACB\u4F53", "\u79D1\u6280"],
      preferredFor: ["\u5361\u7247", "\u56FE\u7247", "\u77ED\u6807\u9898"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587"]
    }
  },
  {
    id: "motion.enter.gradual-focus",
    version: 1,
    label: "\u6E10\u8FDB\u805A\u7126",
    phase: "enter",
    targetKinds: ["text", "element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER,
      { id: "distance", label: "\u79FB\u52A8\u8DDD\u79BB", kind: "number", min: 0, max: 120, step: 2, unit: "px" },
      { id: "blur", label: "\u6A21\u7CCA\u5F3A\u5EA6", kind: "number", min: 0, max: 32, step: 1, unit: "px" }
    ],
    defaults: {
      ease: "power3.out",
      direction: "up",
      intensity: 1,
      distance: 28,
      blur: 18
    },
    semantics: {
      intents: ["\u6E10\u8FDB\u6A21\u7CCA", "\u805A\u7126\u8FDB\u5165", "\u5185\u5BB9\u663E\u73B0"],
      tones: ["\u67D4\u548C", "\u7535\u5F71\u611F"],
      preferredFor: ["\u6587\u5B57", "\u56FE\u7247", "\u5361\u7247", "\u56FE\u5F62"],
      avoidFor: ["\u9700\u8981\u5FEB\u901F\u54CD\u5E94\u7684\u63D0\u793A"]
    }
  },
  {
    id: "motion.enter.scan-reveal",
    version: 1,
    label: "\u626B\u63CF\u63ED\u5E55",
    phase: "enter",
    targetKinds: ["text", "element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER,
      { id: "blur", label: "\u626B\u63CF\u67D4\u5316", kind: "number", min: 0, max: 16, step: 1, unit: "px" },
      { id: "contrast", label: "\u626B\u63CF\u5BF9\u6BD4", kind: "number", min: 0.8, max: 2, step: 0.05 }
    ],
    defaults: {
      ease: "power3.out",
      direction: "right",
      intensity: 1,
      blur: 6,
      contrast: 1.25
    },
    semantics: {
      intents: ["\u626B\u63CF", "\u906E\u7F69\u63ED\u793A", "\u6570\u5B57\u5316\u8FDB\u5165"],
      tones: ["\u79D1\u6280", "\u5229\u843D"],
      preferredFor: ["\u6807\u9898", "\u56FE\u7247", "\u4FE1\u606F\u5361\u7247", "\u56FE\u5F62"],
      avoidFor: ["\u67D4\u548C\u60C5\u7EEA\u5185\u5BB9"]
    }
  },
  {
    id: "motion.emphasis.magnetic-snap",
    version: 1,
    label: "\u78C1\u5438\u56DE\u5F39",
    phase: "emphasis",
    targetKinds: ["text", "element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER,
      { id: "distance", label: "\u5438\u9644\u8DDD\u79BB", kind: "number", min: 4, max: 64, step: 2, unit: "px" },
      { id: "overshoot", label: "\u56DE\u5F39\u5E45\u5EA6", kind: "number", min: 0, max: 1, step: 0.05 }
    ],
    defaults: {
      ease: "none",
      direction: "right",
      intensity: 1,
      distance: 22,
      overshoot: 0.35
    },
    semantics: {
      intents: ["\u78C1\u5438", "\u56DE\u5F39", "\u805A\u7126\u5F3A\u8C03"],
      tones: ["\u7075\u654F", "\u73B0\u4EE3"],
      preferredFor: ["\u6309\u94AE", "\u56FE\u6807", "\u5361\u7247", "\u77ED\u6807\u9898"],
      avoidFor: ["\u957F\u6BB5\u6B63\u6587", "\u5168\u5C4F\u80CC\u666F"]
    }
  }
];
var BACKGROUND_PARAMETER_SCHEMA = [
  ...MOTION_COMMON_PARAMETERS,
  MOTION_COLOR_SOURCE_PARAMETER,
  { id: "color1", label: "\u6697\u90E8\u989C\u8272", kind: "color" },
  { id: "color2", label: "\u4E2D\u95F4\u8272", kind: "color" },
  { id: "color3", label: "\u9AD8\u5149\u989C\u8272", kind: "color" },
  { id: "brightness", label: "\u4EAE\u5EA6", kind: "number", min: 0.6, max: 1.8, step: 0.05 },
  { id: "glow", label: "\u8F89\u5149", kind: "number", min: 0, max: 2, step: 0.1 },
  { id: "swirl", label: "\u6D41\u52A8\u5E45\u5EA6", kind: "number", min: -1.5, max: 1.5, step: 0.1 }
];
function backgroundPreset(id, label, defaults, intents) {
  return {
    id,
    version: 1,
    label,
    phase: "emphasis",
    targetKinds: ["element"],
    parameterSchema: BACKGROUND_PARAMETER_SCHEMA,
    defaults: { ease: "sine.inOut", colorSource: "custom", ...defaults },
    semantics: {
      intents,
      tones: ["\u6C1B\u56F4", "\u52A8\u6001\u80CC\u666F"],
      preferredFor: ["\u80CC\u666F\u5C42", "\u8272\u5757", "\u5168\u5C4F\u5BB9\u5668"],
      avoidFor: ["\u6587\u5B57", "\u5C0F\u56FE\u6807"]
    }
  };
}
var REACT_BITS_BACKGROUND_PRESETS = [
  backgroundPreset("background.emphasis.molten-flow", "\u7194\u5149\u6D41\u52A8", {
    color1: "#1B1640",
    color2: "#6D4AFF",
    color3: "#F3B8FF",
    brightness: 1.1,
    glow: 1.2,
    swirl: 0.8
  }, ["\u7194\u878D\u91D1\u5C5E", "\u6DB2\u6001\u6D41\u5149", "\u80CC\u666F\u5FAA\u73AF"]),
  backgroundPreset("background.emphasis.aurora-breathe", "\u6781\u5149\u547C\u5438", {
    color1: "#071A2B",
    color2: "#20BBC0",
    color3: "#9AF0D5",
    brightness: 1.05,
    glow: 0.9,
    swirl: 0.45
  }, ["\u6781\u5149", "\u547C\u5438", "\u6E10\u53D8\u80CC\u666F"]),
  backgroundPreset("background.emphasis.prism-shift", "\u68F1\u955C\u53D8\u8272", {
    color1: "#111827",
    color2: "#F97316",
    color3: "#FDE68A",
    brightness: 1.15,
    glow: 1.4,
    swirl: -0.6
  }, ["\u68F1\u955C", "\u8272\u5F69\u8FC1\u79FB", "\u80CC\u666F\u5F3A\u8C03"]),
  backgroundPreset("background.emphasis.light-rays", "\u4E3B\u9898\u5149\u675F", {
    color1: "#0B1020",
    color2: "#2563EB",
    color3: "#FFFFFF",
    brightness: 1.05,
    glow: 1.25,
    swirl: 0.35
  }, ["\u5149\u675F", "\u660E\u6697\u8109\u51B2", "\u4E3B\u9898\u6C1B\u56F4"]),
  backgroundPreset("background.emphasis.grid-scan", "\u7F51\u683C\u626B\u63CF", {
    color1: "#08111C",
    color2: "#0F766E",
    color3: "#5EEAD4",
    brightness: 1,
    glow: 0.75,
    swirl: 0.9
  }, ["\u626B\u63CF", "\u6570\u5B57\u7F51\u683C", "\u6280\u672F\u80CC\u666F"]),
  backgroundPreset("background.emphasis.iridescent-flow", "\u8679\u5F69\u6D41\u52A8", {
    color1: "#17122F",
    color2: "#7C3AED",
    color3: "#22D3EE",
    brightness: 1.08,
    glow: 1.15,
    swirl: -0.5
  }, ["\u8679\u5F69", "\u8272\u76F8\u6D41\u52A8", "\u6C1B\u56F4\u80CC\u666F"])
];
var REACT_BITS_BOX_PRESETS = [
  {
    id: "element.enter.bounce-card",
    version: 1,
    label: "\u5F39\u6027\u5361\u7247",
    phase: "enter",
    targetKinds: ["element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER,
      { id: "rotation", label: "\u5165\u573A\u503E\u89D2", kind: "number", min: 0, max: 24, step: 1, unit: "\xB0" }
    ],
    defaults: { ease: "none", direction: "up", intensity: 1, rotation: 8 },
    semantics: {
      intents: ["\u5F39\u6027\u5165\u573A", "\u5361\u7247\u843D\u4F4D", "\u56DE\u5F39"],
      tones: ["\u6D3B\u6CFC", "\u53CB\u597D"],
      preferredFor: ["\u5361\u7247", "\u56FE\u7247", "\u6309\u94AE", "\u56FE\u5F62"],
      avoidFor: ["\u5168\u5C4F\u80CC\u666F", "\u4E25\u8083\u6570\u636E\u8868"]
    }
  },
  {
    id: "element.emphasis.spotlight-card",
    version: 1,
    label: "\u805A\u5149\u5361\u7247",
    phase: "emphasis",
    targetKinds: ["element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_INTENSITY_PARAMETER,
      MOTION_COLOR_SOURCE_PARAMETER,
      { id: "color", label: "\u805A\u5149\u989C\u8272", kind: "color" },
      { id: "glow", label: "\u805A\u5149\u5F3A\u5EA6", kind: "number", min: 0, max: 2, step: 0.1 }
    ],
    defaults: {
      ease: "sine.inOut",
      intensity: 1,
      colorSource: "custom",
      color: "#FFFFFF",
      glow: 1
    },
    semantics: {
      intents: ["\u805A\u5149", "\u5361\u7247\u5F3A\u8C03", "\u5C42\u7EA7\u63D0\u5347"],
      tones: ["\u7CBE\u81F4", "\u514B\u5236"],
      preferredFor: ["\u5361\u7247", "\u56FE\u7247", "\u6309\u94AE", "\u5173\u952E\u56FE\u5F62"],
      avoidFor: ["\u5168\u5C4F\u80CC\u666F", "\u5927\u6BB5\u6B63\u6587"]
    }
  },
  {
    id: "element.emphasis.glare-sweep",
    version: 1,
    label: "\u9AD8\u5149\u63A0\u8FC7",
    phase: "emphasis",
    targetKinds: ["element"],
    parameterSchema: [
      ...MOTION_COMMON_PARAMETERS,
      MOTION_DIRECTION_PARAMETER,
      MOTION_INTENSITY_PARAMETER,
      MOTION_COLOR_SOURCE_PARAMETER,
      { id: "color", label: "\u9AD8\u5149\u989C\u8272", kind: "color" },
      { id: "glow", label: "\u9AD8\u5149\u5F3A\u5EA6", kind: "number", min: 0, max: 2, step: 0.1 }
    ],
    defaults: {
      ease: "sine.inOut",
      direction: "right",
      intensity: 1,
      colorSource: "custom",
      color: "#FFFFFF",
      glow: 0.8
    },
    semantics: {
      intents: ["\u9AD8\u5149", "\u63A0\u8FC7", "\u6750\u8D28\u5F3A\u8C03"],
      tones: ["\u7CBE\u81F4", "\u73B0\u4EE3"],
      preferredFor: ["\u5361\u7247", "\u56FE\u7247", "\u6309\u94AE", "\u5F62\u72B6"],
      avoidFor: ["\u6241\u5E73\u6B63\u6587", "\u900F\u660E\u5BB9\u5668"]
    }
  }
];
var CAMERA_FOCUS_PARAMETERS = [
  { id: "focusX", label: "\u7126\u70B9 X", kind: "number", min: 0, max: 100, step: 1, unit: "%" },
  { id: "focusY", label: "\u7126\u70B9 Y", kind: "number", min: 0, max: 100, step: 1, unit: "%" },
  { id: "zoom", label: "\u8FD1\u666F\u500D\u7387", kind: "number", min: 1, max: 3, step: 0.05, unit: "x" }
];
var CAMERA_EASE_PARAMETER = {
  id: "ease",
  label: "\u901F\u5EA6\u66F2\u7EBF",
  kind: "select",
  options: EASE_OPTIONS.filter((option) => !option.value.startsWith("back."))
};
var CAMERA_MOTION_PRESETS = [
  ...["push-in", "pull-back"].map((move) => ({
    id: `camera.${move}`,
    version: 1,
    label: move === "push-in" ? "\u7126\u70B9\u63A8\u8FDB" : "\u62C9\u8FDC\u63ED\u793A",
    phase: "emphasis",
    targetKinds: ["element"],
    parameterSchema: [CAMERA_EASE_PARAMETER, ...CAMERA_FOCUS_PARAMETERS],
    defaults: { ease: "power3.inOut", focusX: 65, focusY: 50, zoom: 1.8 },
    semantics: {
      intents: ["\u8FD0\u955C", "camera", "zoom", move === "push-in" ? "\u63A8\u8FDB\u7EC6\u8282" : "\u62C9\u8FDC\u5168\u666F"],
      tones: ["\u7535\u5F71\u611F", "\u514B\u5236"],
      preferredFor: ["\u88C1\u5207\u89C6\u53E3\u5185\u7684\u7B49\u5C3A\u5BF8\u753B\u9762\u5BB9\u5668", "\u622A\u56FE", "\u5730\u56FE"],
      avoidFor: ["\u5B57\u5E55", "\u5355\u4E2A\u5C0F\u63A7\u4EF6", "\u6CA1\u6709\u88C1\u5207\u89C6\u53E3\u7684\u753B\u9762"]
    }
  })),
  {
    id: "camera.focus-travel",
    version: 1,
    label: "\u7126\u70B9\u5DE1\u6E38",
    phase: "emphasis",
    targetKinds: ["element"],
    parameterSchema: [
      CAMERA_EASE_PARAMETER,
      ...CAMERA_FOCUS_PARAMETERS,
      { id: "fromX", label: "\u8D77\u70B9 X", kind: "number", min: 0, max: 100, step: 1, unit: "%" },
      { id: "fromY", label: "\u8D77\u70B9 Y", kind: "number", min: 0, max: 100, step: 1, unit: "%" }
    ],
    defaults: { ease: "power3.inOut", fromX: 30, fromY: 40, focusX: 70, focusY: 60, zoom: 1.8 },
    semantics: {
      intents: ["\u8FD0\u955C", "camera", "pan", "\u7126\u70B9\u8F6C\u79FB", "\u754C\u9762\u5DE1\u6E38"],
      tones: ["\u8FDE\u7EED", "\u7535\u5F71\u611F"],
      preferredFor: ["\u88C1\u5207\u89C6\u53E3\u5185\u7684\u7B49\u5C3A\u5BF8\u753B\u9762\u5BB9\u5668", "\u622A\u56FE", "\u6570\u636E\u770B\u677F"],
      avoidFor: ["\u5B57\u5E55", "\u65E0\u5173\u8054\u5185\u5BB9"]
    }
  },
  {
    id: "camera.oblique-glide",
    version: 1,
    label: "\u7A7A\u95F4\u63A0\u8FC7",
    phase: "emphasis",
    targetKinds: ["element"],
    parameterSchema: [
      CAMERA_EASE_PARAMETER,
      MOTION_DIRECTION_PARAMETER,
      { id: "angle", label: "\u503E\u659C\u89D2\u5EA6", kind: "number", min: 0, max: 35, step: 1, unit: "\xB0" },
      { id: "travel", label: "\u6A2A\u79FB\u5E45\u5EA6", kind: "number", min: 0, max: 20, step: 1, unit: "%" }
    ],
    defaults: { ease: "power3.inOut", direction: "right", angle: 22, travel: 8 },
    semantics: {
      intents: ["\u8FD0\u955C", "camera", "\u7A7A\u95F4", "\u659C\u89D2\u63A0\u8FC7", "perspective"],
      tones: ["\u7ACB\u4F53", "\u7535\u5F71\u611F"],
      preferredFor: ["\u5E26\u7559\u767D\u7684\u754C\u9762\u821E\u53F0", "\u8BBE\u5907\u7EC4\u5408", "\u4EA7\u54C1\u753B\u9762"],
      avoidFor: ["\u6EE1\u5C4F\u51FA\u8840\u80CC\u666F", "\u5BC6\u96C6\u5C0F\u5B57", "\u5B57\u5E55"]
    }
  }
];
var TRANSITION_MOTION_PRESETS = [
  {
    id: "transition.depth-push",
    version: 1,
    label: "\u666F\u6DF1\u63A8\u8FDB",
    phase: "enter",
    targetKinds: ["element"],
    parameterSchema: [...MOTION_COMMON_PARAMETERS, MOTION_INTENSITY_PARAMETER],
    defaults: { ease: "power3.inOut", intensity: 1 },
    semantics: { intents: ["\u666F\u6DF1\u63A8\u8FDB", "\u7126\u70B9\u5207\u6362", "\u8FDB\u5165\u7EC6\u8282"], tones: ["\u7535\u5F71\u611F", "\u514B\u5236"], preferredFor: ["\u573A\u666F\u5BB9\u5668", "\u5168\u5C4F\u5A92\u4F53", "\u7A7A\u95F4\u5C42\u7EA7"], avoidFor: ["\u5C0F\u5B57\u53F7\u6B63\u6587", "\u9891\u7E41\u8FDE\u7EED\u5207\u6362"] }
  },
  {
    id: "transition.diagonal-slice",
    version: 1,
    label: "\u659C\u5207\u8F6C\u573A",
    phase: "enter",
    targetKinds: ["element"],
    parameterSchema: [...MOTION_COMMON_PARAMETERS, MOTION_INTENSITY_PARAMETER],
    defaults: { ease: "power4.inOut", intensity: 1 },
    semantics: { intents: ["\u659C\u5207", "\u7AE0\u8282\u5207\u6362", "\u5FEB\u901F\u63A8\u8FDB"], tones: ["\u52A8\u611F", "\u73B0\u4EE3"], preferredFor: ["\u573A\u666F\u5BB9\u5668", "\u5168\u5C4F\u5A92\u4F53", "\u7AE0\u8282\u53D8\u5316"], avoidFor: ["\u5B89\u9759\u8BBF\u8C08", "\u5F31\u53D8\u5316\u8FDE\u7EED\u955C\u5934"] }
  },
  {
    id: "transition.lens-focus",
    version: 1,
    label: "\u955C\u5934\u805A\u7126",
    phase: "enter",
    targetKinds: ["element"],
    parameterSchema: [...MOTION_COMMON_PARAMETERS, MOTION_INTENSITY_PARAMETER],
    defaults: { ease: "expo.inOut", intensity: 1 },
    semantics: { intents: ["\u955C\u5934\u805A\u7126", "\u63ED\u793A", "\u4ECE\u73AF\u5883\u8FDB\u5165\u4E3B\u4F53"], tones: ["\u7535\u5F71\u611F", "\u67D4\u548C"], preferredFor: ["\u573A\u666F\u5BB9\u5668", "\u56FE\u7247", "\u5173\u952E\u4E3B\u4F53"], avoidFor: ["\u9AD8\u9891\u6570\u636E\u5207\u6362", "\u5C0F\u578B\u63A7\u4EF6"] }
  },
  {
    id: "transition.split-wipe",
    version: 1,
    label: "\u5206\u5C4F\u64E6\u9664",
    phase: "enter",
    targetKinds: ["element"],
    parameterSchema: [...MOTION_COMMON_PARAMETERS, MOTION_INTENSITY_PARAMETER],
    defaults: { ease: "power3.inOut", intensity: 1 },
    semantics: { intents: ["\u5206\u5C4F\u64E6\u9664", "\u5BF9\u6BD4\u5207\u6362", "\u65B9\u5411\u63A8\u8FDB"], tones: ["\u73B0\u4EE3", "\u514B\u5236"], preferredFor: ["\u573A\u666F\u5BB9\u5668", "\u5BF9\u6BD4\u753B\u9762", "\u4F4D\u7F6E\u53D8\u5316"], avoidFor: ["\u8FDE\u7EED\u5BF9\u767D", "\u7EC6\u5C0F\u6587\u5B57"] }
  }
];
var MOTION_PRESETS = [
  ...TEXT_MOTION_PRESETS,
  ...MIGRATED_CAPTION_TEXT_PRESETS,
  ...ELEMENT_MOTION_PRESETS,
  ...REACT_BITS_TEXT_PRESETS,
  ...REACT_BITS_GENERAL_PRESETS,
  ...REACT_BITS_BACKGROUND_PRESETS,
  ...REACT_BITS_BOX_PRESETS,
  ...CAMERA_MOTION_PRESETS,
  ...TRANSITION_MOTION_PRESETS
];

// ../parsers/dist/springEase.js
function sampleSpringEase(mass, stiffness, damping, progress) {
  if (![mass, stiffness, damping].every((value) => Number.isFinite(value) && value > 0) || !Number.isFinite(progress)) {
    throw new RangeError("Spring values must be finite, with positive mass, stiffness and damping");
  }
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const decayRate = zeta < 1 ? zeta * w0 : zeta * w0 - w0 * Math.sqrt(zeta * zeta - 1);
  const settleDuration = Math.min((zeta < 1 ? 5 : 4) / Math.max(decayRate, 0.01), 10);
  const simT = progress * Math.max(settleDuration, 1);
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * w0 * simT) * (Math.cos(wd * simT) + zeta * w0 / wd * Math.sin(wd * simT));
  }
  if (zeta === 1) return 1 - (1 + w0 * simT) * Math.exp(-w0 * simT);
  const s1 = -w0 * (zeta - Math.sqrt(zeta * zeta - 1));
  const s2 = -w0 * (zeta + Math.sqrt(zeta * zeta - 1));
  return 1 + (s1 * Math.exp(s2 * simT) - s2 * Math.exp(s1 * simT)) / (s2 - s1);
}

// ../core/dist/motionPresetKeyframes.js
function directionOffset2(direction, amount) {
  if (direction === "down")
    return { x: 0, y: -amount };
  if (direction === "left")
    return { x: amount, y: 0 };
  if (direction === "right")
    return { x: -amount, y: 0 };
  return { x: 0, y: amount };
}
function wipeInset(direction, hidden) {
  if (!hidden)
    return "inset(0% 0% 0% 0%)";
  if (direction === "down")
    return "inset(0% 0% 100% 0%)";
  if (direction === "left")
    return "inset(0% 100% 0% 0%)";
  if (direction === "right")
    return "inset(0% 0% 0% 100%)";
  return "inset(100% 0% 0% 0%)";
}
function frame(percentage, properties, ease) {
  return { percentage, properties, ...ease ? { ease } : {} };
}
function motionColor(params, parameterId, themeToken, fallback) {
  if (params.colorSource === "theme")
    return `var(${themeToken}, ${fallback})`;
  return String(params[parameterId] ?? fallback);
}
function readableEnabled(params) {
  return params.preserveReadable !== "false";
}
function secondColor(params, fallback) {
  if (params.colorSource === "theme")
    return "var(--ipw-color-primary, #20BBC0)";
  return String(params.accentColor ?? fallback);
}
function buildPresetKeyframes(presetId, params) {
  const intensity = Number(params.intensity ?? 1);
  const direction = String(params.direction ?? "up");
  const offset = directionOffset2(direction, 42 * intensity);
  const color2 = motionColor(params, "color", "--ipw-color-accent", "#7c3aed");
  if (presetId === "camera.push-in" || presetId === "camera.pull-back" || presetId === "camera.focus-travel") {
    const zoom = Number(params.zoom);
    const pose = (x, y, scale) => {
      const margin = 50 / scale;
      const bounded2 = (value) => Math.max(margin, Math.min(100 - margin, value));
      return {
        xPercent: (50 - bounded2(x)) * scale,
        yPercent: (50 - bounded2(y)) * scale,
        scale,
        transformOrigin: "50% 50%"
      };
    };
    const near = pose(Number(params.focusX), Number(params.focusY), zoom);
    const wide = pose(50, 50, 1);
    const start = presetId === "camera.pull-back" ? near : presetId === "camera.focus-travel" ? pose(Number(params.fromX), Number(params.fromY), zoom) : wide;
    return [frame(0, start), frame(100, presetId === "camera.pull-back" ? wide : near)];
  }
  switch (presetId) {
    case "camera.oblique-glide": {
      const sign = direction === "left" || direction === "up" ? -1 : 1;
      const horizontal = direction === "left" || direction === "right";
      const angle = Number(params.angle) * sign;
      const travel = Number(params.travel) * sign;
      const pose = (progress) => ({
        xPercent: horizontal ? progress * travel : 0,
        yPercent: horizontal ? 0 : progress * travel,
        rotationY: horizontal ? -progress * angle : 0,
        rotationX: horizontal ? 6 * Math.abs(progress) : progress * angle,
        scale: 1 - Math.abs(progress) * 0.08,
        transformOrigin: "50% 50%",
        transformPerspective: 1600
      });
      return [frame(0, pose(-1)), frame(65, pose(0.4)), frame(100, pose(0))];
    }
    case "transition.depth-push":
      return [
        frame(0, { opacity: 0, scale: Math.max(0.58, 0.78 - intensity * 0.04), filter: `blur(${18 * intensity}px)` }),
        frame(64, { opacity: 1, scale: 1.025, filter: "blur(0px)" }),
        frame(100, { opacity: 1, scale: 1, filter: "blur(0px)" })
      ];
    case "transition.diagonal-slice":
      return [
        frame(0, { opacity: 0, xPercent: 24 * intensity, clipPath: "polygon(100% 0, 100% 0, 76% 100%, 76% 100%)" }),
        frame(76, { opacity: 1, xPercent: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }),
        frame(100, { opacity: 1, xPercent: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" })
      ];
    case "transition.lens-focus":
      return [
        frame(0, { opacity: 0, scale: 1 + 0.12 * intensity, filter: `blur(${20 * intensity}px)`, clipPath: "circle(0% at 50% 50%)" }),
        frame(72, { opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "circle(74% at 50% 50%)" }),
        frame(100, { opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "circle(100% at 50% 50%)" })
      ];
    case "transition.split-wipe":
      return [
        frame(0, { opacity: 0, xPercent: 28 * intensity, clipPath: "inset(0 0 0 100%)" }),
        frame(52, { opacity: 1, xPercent: 0, clipPath: "inset(0 0 0 0%)" }),
        frame(100, { opacity: 1, xPercent: 0, clipPath: "inset(0 0 0 0%)" })
      ];
    case "text.enter.fade":
      return [frame(0, { opacity: 0 }), frame(100, { opacity: 1 })];
    case "text.enter.rise":
      return [
        frame(0, { opacity: 0, x: offset.x, y: offset.y }),
        frame(100, { opacity: 1, x: 0, y: 0 })
      ];
    case "text.enter.pop":
      return [
        frame(0, { opacity: 0, scale: Math.max(0.1, 0.55 - intensity * 0.08) }),
        frame(70, { opacity: 1, scale: 1.08 + intensity * 0.04 }),
        frame(100, { opacity: 1, scale: 1 })
      ];
    case "text.enter.zoom":
      return [
        frame(0, { opacity: 0, scale: Math.max(0.2, 1 - intensity * 0.35) }),
        frame(100, { opacity: 1, scale: 1 })
      ];
    case "text.enter.flip":
      return [
        frame(0, {
          opacity: 0,
          rotationY: direction === "left" || direction === "down" ? -80 * intensity : 80 * intensity,
          transformPerspective: 600
        }),
        frame(100, { opacity: 1, rotationY: 0, transformPerspective: 600 })
      ];
    case "text.enter.wipe":
      return [
        frame(0, { opacity: 1, clipPath: wipeInset(direction, true) }),
        frame(100, { opacity: 1, clipPath: wipeInset(direction, false) })
      ];
    case "text.enter.typewriter":
      return [frame(0, { opacity: 0, y: 4 * intensity }), frame(100, { opacity: 1, y: 0 })];
    case "text.enter.decode":
      return [
        frame(0, { opacity: 0, x: -5 * intensity, filter: `blur(${Math.round(5 * intensity)}px)` }),
        frame(55, { opacity: 0.75, x: 3 * intensity, filter: "blur(1px)" }),
        frame(100, { opacity: 1, x: 0, filter: "blur(0px)" })
      ];
    case "text.enter.blur-reveal": {
      const blur = Number(params.blur ?? 14);
      return [
        frame(0, {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          filter: `blur(${blur}px) saturate(0.72)`,
          letterSpacing: `${0.08 * intensity}em`
        }),
        frame(58, {
          opacity: 0.82,
          x: offset.x * 0.12,
          y: offset.y * 0.12,
          filter: `blur(${Math.max(1, blur * 0.16)}px) saturate(0.94)`,
          letterSpacing: `${0.015 * intensity}em`
        }),
        frame(100, {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px) saturate(1)",
          letterSpacing: "0em"
        })
      ];
    }
    case "text.enter.mask-sweep":
      return [
        frame(0, {
          opacity: 0,
          x: offset.x * 0.35,
          y: offset.y * 0.35,
          clipPath: wipeInset(direction, true),
          filter: `blur(${Math.round(3 * intensity)}px)`
        }),
        frame(100, {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: wipeInset(direction, false),
          filter: "blur(0px)"
        })
      ];
    case "text.enter.fold-reveal": {
      const perspective = Number(params.perspective ?? 700);
      const horizontal = direction === "left" || direction === "right";
      const sign = direction === "left" || direction === "up" ? -1 : 1;
      return [
        frame(0, {
          opacity: 0,
          rotationX: horizontal ? 0 : 86 * sign * intensity,
          rotationY: horizontal ? 86 * sign * intensity : 0,
          transformPerspective: perspective,
          filter: `brightness(${Math.max(0.45, 1 - 0.3 * intensity)})`
        }),
        frame(72, {
          opacity: 1,
          rotationX: horizontal ? 0 : -5 * sign * intensity,
          rotationY: horizontal ? -5 * sign * intensity : 0,
          transformPerspective: perspective,
          filter: "brightness(1.08)"
        }),
        frame(100, {
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          transformPerspective: perspective,
          filter: "brightness(1)"
        })
      ];
    }
    case "motion.enter.content-reveal": {
      const distance = Number(params.distance ?? 56);
      const contentOffset = directionOffset2(direction, distance);
      return [
        frame(0, {
          opacity: Number(params.initialOpacity ?? 0),
          scale: Number(params.initialScale ?? 0.92),
          x: contentOffset.x,
          y: contentOffset.y,
          filter: "blur(5px)"
        }),
        frame(100, { opacity: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)" })
      ];
    }
    case "motion.enter.gradual-focus": {
      const distance = Number(params.distance ?? 28) * intensity;
      const blur = Number(params.blur ?? 18) * intensity;
      const focusOffset = directionOffset2(direction, distance);
      return [
        frame(0, {
          opacity: 0,
          x: focusOffset.x,
          y: focusOffset.y,
          scale: Math.max(0.72, 1 - 0.08 * intensity),
          filter: `blur(${blur}px) brightness(0.86)`
        }),
        frame(64, {
          opacity: 0.86,
          x: focusOffset.x * 0.1,
          y: focusOffset.y * 0.1,
          scale: 1.015,
          filter: `blur(${Math.max(1, blur * 0.12)}px) brightness(1.04)`
        }),
        frame(100, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px) brightness(1)" })
      ];
    }
    case "motion.enter.scan-reveal": {
      const blur = Number(params.blur ?? 6) * intensity;
      const contrast = Number(params.contrast ?? 1.25);
      return [
        frame(0, {
          opacity: 0,
          clipPath: wipeInset(direction, true),
          filter: `blur(${blur}px) contrast(${contrast + 0.35}) brightness(1.35)`
        }),
        frame(72, {
          opacity: 1,
          clipPath: wipeInset(direction, false),
          filter: `blur(${Math.max(0.5, blur * 0.12)}px) contrast(${contrast}) brightness(1.08)`
        }),
        frame(100, {
          opacity: 1,
          clipPath: wipeInset(direction, false),
          filter: "blur(0px) contrast(1) brightness(1)"
        })
      ];
    }
    case "element.enter.bounce-card": {
      const rotation = Number(params.rotation ?? 8) * intensity;
      const enterOffset = directionOffset2(direction, 34 * intensity);
      const sign = direction === "left" || direction === "up" ? -1 : 1;
      const initialScale = Math.max(0.55, 0.78 - 0.06 * intensity);
      return Array.from({ length: 33 }, (_, index) => {
        const t = index / 32, remaining = 1 - sampleSpringEase(1, 180, 12, t);
        if (index === 32)
          return frame(100, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 }, "none");
        return frame(t * 100, {
          opacity: Math.min(1, t * 5),
          x: enterOffset.x * remaining,
          y: enterOffset.y * remaining,
          scale: 1 - (1 - initialScale) * remaining,
          rotation: rotation * sign * remaining
        }, "none");
      });
    }
    case "element.enter.fade":
      return [frame(0, { opacity: 0 }), frame(100, { opacity: 1 })];
    case "element.enter.slide":
      return [
        frame(0, { opacity: 0, x: offset.x, y: offset.y }),
        frame(100, { opacity: 1, x: 0, y: 0 })
      ];
    case "element.enter.scale":
      return [
        frame(0, { opacity: 0, scale: Math.max(0.4, 1 - 0.18 * intensity) }),
        frame(100, { opacity: 1, scale: 1 })
      ];
    case "text.emphasis.pulse":
      return [
        frame(0, { scale: 1 }),
        frame(50, { scale: 1 + 0.08 * intensity }),
        frame(100, { scale: 1 })
      ];
    case "text.emphasis.bounce":
      return [
        frame(0, { y: 0 }),
        frame(35, { y: -18 * intensity }),
        frame(65, { y: 5 * intensity }),
        frame(100, { y: 0 })
      ];
    case "text.emphasis.wobble":
      return [
        frame(0, { rotation: 0 }),
        frame(25, { rotation: -5 * intensity }),
        frame(55, { rotation: 4 * intensity }),
        frame(80, { rotation: -2 * intensity }),
        frame(100, { rotation: 0 })
      ];
    case "text.emphasis.shake":
      return [
        frame(0, { x: 0 }),
        frame(20, { x: -5 * intensity }),
        frame(40, { x: 5 * intensity }),
        frame(60, { x: -3 * intensity }),
        frame(80, { x: 3 * intensity }),
        frame(100, { x: 0 })
      ];
    case "text.emphasis.highlight":
      return [
        frame(0, { textShadow: "0 0 0 transparent", filter: "brightness(1)" }),
        frame(50, {
          textShadow: `0 0 ${Math.round(14 * intensity)}px ${color2}`,
          filter: `brightness(${1 + 0.25 * intensity})`
        }),
        frame(100, { textShadow: "0 0 0 transparent", filter: "brightness(1)" })
      ];
    case "text.emphasis.glitch":
      return [
        frame(0, { x: 0, skewX: 0, textShadow: "0 0 0 transparent" }),
        frame(20, {
          x: -6 * intensity,
          skewX: -4 * intensity,
          textShadow: `${3 * intensity}px 0 ${color2}`
        }),
        frame(42, {
          x: 5 * intensity,
          skewX: 3 * intensity,
          textShadow: `${-3 * intensity}px 0 #22d3ee`
        }),
        frame(65, { x: -2 * intensity, skewX: 0, textShadow: `${2 * intensity}px 0 ${color2}` }),
        frame(100, { x: 0, skewX: 0, textShadow: "0 0 0 transparent" })
      ];
    case "text.emphasis.highlight-sweep":
      return [frame(0, { opacity: 1 }), frame(100, { opacity: 1 })];
    case "text.enter.editorial-emphasis": {
      const offset2 = directionOffset2(direction, 28 * intensity);
      return [
        frame(0, {
          opacity: 0,
          x: offset2.x,
          y: offset2.y,
          scale: 0.74,
          filter: `blur(${Number(params.blur ?? 7)}px)`
        }),
        frame(68, { opacity: 1, x: -offset2.x * 0.08, y: -offset2.y * 0.08, scale: 1.065, filter: "blur(0px)" }),
        frame(100, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" })
      ];
    }
    case "text.emphasis.karaoke-flow":
      return [
        frame(0, { opacity: 1, y: 0, scale: 1, color: "currentColor" }),
        frame(34, { opacity: 1, y: -Number(params.lift ?? 7) * intensity, scale: 1.055, color: color2 }),
        frame(100, { opacity: 1, y: 0, scale: 1, color: "currentColor" })
      ];
    case "text.enter.camera-track": {
      const offset2 = directionOffset2(direction, Number(params.distance ?? 54) * intensity);
      return [
        frame(0, {
          opacity: 0.12,
          x: offset2.x,
          y: offset2.y,
          scale: 0.62,
          filter: `blur(${Number(params.blur ?? 12)}px)`
        }),
        frame(72, { opacity: 1, x: -offset2.x * 0.055, y: -offset2.y * 0.055, scale: 1.035, filter: "blur(0px)" }),
        frame(100, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" })
      ];
    }
    case "text.enter.visual-layers":
      return [
        frame(0, { opacity: 0, scale: 0.9, textShadow: `${-Number(params.distance ?? 18)}px 5px ${color2}, ${Number(params.distance ?? 18)}px -5px ${secondColor(params, "#20BBC0")}` }),
        frame(58, { opacity: 1, scale: 1.045, textShadow: `-2px 0 ${color2}, 2px 0 ${secondColor(params, "#20BBC0")}` }),
        frame(100, { opacity: 1, scale: 1, textShadow: "0 0 0 transparent" })
      ];
    case "text.enter.matrix-decode": {
      const density = Number(params.density ?? 1);
      const blur = Number(params.blur ?? 5);
      return [
        frame(0, {
          opacity: 0,
          color: color2,
          x: -10 * intensity * density,
          filter: `blur(${Math.max(2, blur)}px) contrast(${1 + 0.5 * density})`,
          letterSpacing: `${0.12 * density}em`,
          textShadow: `0 0 ${Math.round(12 * density)}px ${color2}`
        }),
        frame(28, {
          opacity: 0.44,
          color: "#baffd5",
          x: 5 * intensity,
          filter: `blur(${Math.max(1, blur * 0.55)}px) contrast(${1 + 0.65 * density})`,
          letterSpacing: `${0.16 * density}em`,
          textShadow: `0 0 ${Math.round(18 * density)}px ${color2}`
        }),
        frame(58, {
          opacity: 0.9,
          color: color2,
          x: 2 * intensity,
          filter: `blur(${Math.max(0.5, blur * 0.14)}px) contrast(${1 + 0.25 * density})`,
          letterSpacing: `${0.04 * density}em`,
          textShadow: `0 0 ${Math.round(10 * density)}px ${color2}`
        }),
        frame(100, {
          opacity: 1,
          color: "currentColor",
          x: 0,
          filter: "blur(0px) contrast(1)",
          letterSpacing: "0em",
          textShadow: "0 0 0 transparent"
        })
      ];
    }
    case "text.emphasis.gradient-fill": {
      const accent = secondColor(params, "#FF4FD8");
      const angle = direction === "left" ? 270 : direction === "up" ? 0 : direction === "down" ? 180 : 90;
      const startPosition = direction === "left" ? "100% 50%" : direction === "up" ? "50% 100%" : "0% 50%";
      const endPosition = direction === "left" ? "0% 50%" : direction === "up" ? "50% 0%" : direction === "down" ? "50% 100%" : "100% 50%";
      const gradient = `linear-gradient(${angle}deg, ${color2} 0%, ${accent} 50%, ${color2} 100%)`;
      return [
        frame(0, {
          color: "transparent",
          backgroundImage: gradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "220% 220%",
          backgroundPosition: startPosition,
          filter: "brightness(0.9) saturate(1)",
          scale: 0.86,
          y: 18 * intensity
        }),
        frame(48, {
          color: "transparent",
          backgroundImage: gradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "220% 220%",
          backgroundPosition: endPosition,
          filter: `brightness(${1 + 0.28 * intensity}) saturate(${1 + 0.35 * intensity})`,
          scale: 1.12,
          y: -4 * intensity
        }),
        frame(100, {
          color: "transparent",
          backgroundImage: gradient,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "220% 220%",
          backgroundPosition: startPosition,
          filter: "brightness(1) saturate(1)",
          scale: 1,
          y: 0
        })
      ];
    }
    case "text.emphasis.neon-glow":
    case "text.emphasis.neon-accent": {
      const glow = Number(params.glow ?? 1);
      const drift = presetId === "text.emphasis.neon-accent" ? 6 * intensity : 0;
      const accent = presetId === "text.emphasis.neon-accent" ? secondColor(params, "#00fff0") : "#ff4fd8";
      return [
        frame(0, { x: 0, color: "currentColor", textShadow: "0 0 0 transparent" }),
        frame(36, {
          x: drift,
          color: color2,
          textShadow: `0 0 ${Math.round(10 * glow)}px ${color2}, 0 0 ${Math.round(28 * glow)}px ${color2}, ${Math.round(3 * intensity)}px 0 ${accent}`,
          filter: `brightness(${1 + 0.38 * glow}) saturate(${1 + 0.35 * glow})`
        }),
        frame(64, {
          x: -drift * 0.5,
          color: accent,
          textShadow: `0 0 ${Math.round(12 * glow)}px ${accent}, 0 0 ${Math.round(34 * glow)}px ${color2}, ${-Math.round(3 * intensity)}px 0 ${color2}`,
          filter: `brightness(${1 + 0.28 * glow}) saturate(${1 + 0.45 * glow})`
        }),
        frame(100, {
          x: 0,
          color: "currentColor",
          textShadow: `0 0 ${Math.round(6 * glow)}px ${color2}`,
          filter: "brightness(1)"
        })
      ];
    }
    case "text.emphasis.rgb-glitch": {
      const density = Number(params.density ?? 1);
      const blur = Number(params.blur ?? 0);
      const readable = readableEnabled(params);
      return [
        frame(0, { opacity: 1, x: 0, skewX: 0, filter: "blur(0px)", textShadow: "0 0 0 transparent" }),
        frame(12, {
          opacity: readable ? 1 : 0.72,
          x: 10 * intensity * density,
          skewX: 7 * intensity,
          filter: `blur(${Math.max(0.5, blur * 0.34)}px) contrast(1.25)`,
          textShadow: `${-7 * density}px 0 #ff1745, ${7 * density}px 0 #00fff0, 0 3px rgba(255,255,255,0.45)`
        }),
        frame(25, {
          opacity: readable ? 1 : 0.78,
          x: -12 * intensity * density,
          skewX: -8 * intensity,
          filter: `blur(${blur * 0.2}px) contrast(1.4)`,
          textShadow: `${8 * density}px 0 ${color2}, ${-8 * density}px 0 #22d3ee`
        }),
        frame(46, {
          opacity: 1,
          x: 7 * intensity * density,
          skewX: 5 * intensity,
          filter: `blur(${blur * 0.1}px) contrast(1.18)`,
          textShadow: `${-5 * density}px 0 ${color2}, ${5 * density}px 0 #22d3ee`
        }),
        frame(64, {
          opacity: 1,
          x: -3 * intensity * density,
          skewX: -2 * intensity,
          filter: "blur(0px) contrast(1)",
          textShadow: `${2 * density}px 0 #ff1745, ${-2 * density}px 0 #00fff0`
        }),
        frame(100, { opacity: 1, x: 0, skewX: 0, filter: "blur(0px)", textShadow: "0 0 0 transparent" })
      ];
    }
    case "text.enter.clip-wipe": {
      const wipeOffset = directionOffset2(direction, 18 * intensity);
      const wipeBlur = Math.max(0.5, 1 + 1.2 * intensity);
      return [
        frame(0, {
          opacity: 0,
          x: -wipeOffset.x,
          y: -wipeOffset.y,
          clipPath: wipeInset(direction, true),
          filter: `blur(${wipeBlur}px)`
        }),
        frame(38, {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: wipeInset(direction, false),
          filter: "blur(0px)"
        }),
        frame(100, { opacity: 1, x: 0, y: 0, clipPath: wipeInset(direction, false), filter: "blur(0px)" })
      ];
    }
    case "text.emphasis.blend-difference": {
      const blur = Number(params.blur ?? 0);
      return [
        frame(0, { opacity: 1, mixBlendMode: "normal", filter: "invert(0) blur(0px)" }),
        frame(45, {
          opacity: readableEnabled(params) ? 1 : 0.86,
          mixBlendMode: "difference",
          filter: `invert(${0.65 * intensity}) blur(${blur * 0.1}px)`
        }),
        frame(100, { opacity: 1, mixBlendMode: "normal", filter: "invert(0) blur(0px)" })
      ];
    }
    case "text.emphasis.weight-shift": {
      const minWeight = Number(params.minWeight ?? 400);
      const maxWeight = Number(params.maxWeight ?? 800);
      return [
        frame(0, { fontWeight: minWeight, scale: 1 }),
        frame(48, { fontWeight: maxWeight, scale: 1 + 0.025 * intensity }),
        frame(100, { fontWeight: minWeight, scale: 1 })
      ];
    }
    case "text.emphasis.texture-fill": {
      const density = Number(params.density ?? 1);
      const angle = direction === "left" ? 270 : direction === "up" ? 0 : direction === "down" ? 180 : 90;
      const textureSize = Math.max(6, Math.round(28 / Math.max(0.2, density)));
      const texturePosition = direction === "left" ? "100% 50%" : direction === "up" ? "50% 100%" : direction === "down" ? "50% 0%" : "0% 50%";
      const textureEndPosition = direction === "left" ? "0% 50%" : direction === "up" ? "50% 0%" : direction === "down" ? "50% 100%" : "100% 50%";
      const texture = `repeating-linear-gradient(${angle}deg, rgba(255, 255, 255, 0.48) 0 1px, transparent 1px ${textureSize}px), radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.38) 0 1px, transparent 1px), linear-gradient(${angle}deg, ${color2}, ${secondColor(params, "#20BBC0")})`;
      return [
        frame(0, {
          color: "transparent",
          backgroundImage: texture,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: `${textureSize}px ${textureSize}px, ${textureSize * 2}px ${textureSize * 2}px, 180% 180%`,
          backgroundPosition: texturePosition,
          filter: "contrast(1) brightness(1)",
          letterSpacing: "0em"
        }),
        frame(52, {
          color: "transparent",
          backgroundImage: texture,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: `${textureSize}px ${textureSize}px, ${textureSize * 2}px ${textureSize * 2}px, 180% 180%`,
          backgroundPosition: textureEndPosition,
          filter: `contrast(${1 + 0.45 * density}) brightness(${1 + 0.18 * intensity})`,
          letterSpacing: `${0.02 * density}em`
        }),
        frame(100, {
          color: "transparent",
          backgroundImage: texture,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: `${textureSize}px ${textureSize}px, ${textureSize * 2}px ${textureSize * 2}px, 180% 180%`,
          backgroundPosition: texturePosition,
          filter: "contrast(1) brightness(1)",
          letterSpacing: "0em"
        })
      ];
    }
    case "text.emphasis.kinetic-slam": {
      const distance = Number(params.distance ?? 56);
      const slamOffset = directionOffset2(direction, distance * intensity);
      const readable = readableEnabled(params);
      const launchOpacity = readable ? 0.86 : 0.38;
      const launchBlur = readable ? 5 : Math.max(9, 7 * intensity);
      const impactScale = readable ? 1.2 + 0.05 * intensity : 1.28 + 0.1 * intensity;
      const settleDistance = readable ? 0.14 : 0.26;
      return [
        frame(0, { opacity: launchOpacity, x: -slamOffset.x, y: -slamOffset.y, scale: 0.78, filter: `blur(${launchBlur}px)` }),
        frame(34, { opacity: readable ? 1 : 0.88, x: 0, y: 0, scale: impactScale, filter: readable ? "blur(0px)" : "blur(1px)" }),
        frame(48, { opacity: 1, x: -slamOffset.x * 0.07, y: -slamOffset.y * 0.07, scale: 0.94, filter: "blur(0px)" }),
        frame(72, { opacity: readable ? 1 : 0.94, x: slamOffset.x * settleDistance, y: slamOffset.y * settleDistance, scale: readable ? 1.03 : 0.97, filter: "blur(0px)" }),
        frame(100, { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" })
      ];
    }
    case "text.emphasis.emoji-pop":
      return [
        frame(0, { scale: 1, rotation: 0 }),
        frame(36, { scale: 1 + 0.18 * intensity, rotation: -6 * intensity }),
        frame(68, { scale: 0.98, rotation: 3 * intensity }),
        frame(100, { scale: 1, rotation: 0 })
      ];
    case "text.emphasis.particle-burst": {
      const density = Number(params.density ?? 1);
      return [
        frame(0, { scale: 1, textShadow: "0 0 0 transparent", filter: "brightness(1)" }),
        frame(44, {
          scale: 1 + 0.08 * intensity,
          textShadow: `0 -${Math.round(10 * density)}px ${color2}, ${Math.round(8 * density)}px ${Math.round(6 * density)}px ${color2}, -${Math.round(8 * density)}px ${Math.round(6 * density)}px ${color2}`,
          filter: `brightness(${1 + 0.22 * intensity})`
        }),
        frame(100, { scale: 1, textShadow: "0 0 0 transparent", filter: "brightness(1)" })
      ];
    }
    case "text.emphasis.prism-glow":
      return [
        frame(0, { color: color2, filter: "brightness(1) saturate(1)", letterSpacing: "0em" }),
        frame(48, {
          color: color2,
          filter: `brightness(${1 + 0.32 * intensity}) saturate(${1 + 0.55 * intensity})`,
          letterSpacing: `${0.035 * intensity}em`
        }),
        frame(100, { color: color2, filter: "brightness(1) saturate(1)", letterSpacing: "0em" })
      ];
    case "text.emphasis.shiny-sweep": {
      const glow = Number(params.glow ?? 1);
      const horizontalSign = direction === "left" ? -1 : 1;
      return [
        frame(0, {
          color: "currentColor",
          x: 0,
          filter: "brightness(1) saturate(1)",
          textShadow: "0 0 0 transparent"
        }),
        frame(45, {
          color: color2,
          x: -2 * horizontalSign * intensity,
          filter: `brightness(${1 + 0.4 * glow}) saturate(${1 + 0.35 * glow})`,
          textShadow: `0 0 ${Math.round(12 * glow)}px ${color2}`
        }),
        frame(62, {
          color: color2,
          x: 2 * horizontalSign * intensity,
          filter: `brightness(${1 + 0.24 * glow}) saturate(${1 + 0.2 * glow})`,
          textShadow: `0 0 ${Math.round(7 * glow)}px ${color2}`
        }),
        frame(100, {
          color: "currentColor",
          x: 0,
          filter: "brightness(1) saturate(1)",
          textShadow: "0 0 0 transparent"
        })
      ];
    }
    case "text.emphasis.true-focus": {
      const blur = Number(params.blur ?? 5) * intensity;
      const focusScale = Number(params.focusScale ?? 1.06);
      return [
        frame(0, { opacity: 0.68, scale: 1, filter: `blur(${blur}px) brightness(0.86)` }),
        frame(45, {
          opacity: 1,
          scale: focusScale,
          filter: "blur(0px) brightness(1.12)"
        }),
        frame(72, { opacity: 0.86, scale: 1.01, filter: `blur(${blur * 0.24}px) brightness(1)` }),
        frame(100, { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" })
      ];
    }
    case "motion.emphasis.soft-float": {
      const distance = Number(params.distance ?? 12) * intensity;
      const floatOffset = directionOffset2(direction, distance);
      return [
        frame(0, { x: 0, y: 0, rotation: 0, scale: 1 }),
        frame(50, {
          x: -floatOffset.x,
          y: -floatOffset.y,
          rotation: 1.2 * intensity,
          scale: 1 + 0.018 * intensity
        }),
        frame(100, { x: 0, y: 0, rotation: 0, scale: 1 })
      ];
    }
    case "motion.emphasis.focus-tilt": {
      const horizontal = direction === "left" || direction === "right";
      const sign = direction === "left" || direction === "up" ? -1 : 1;
      return [
        frame(0, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          transformPerspective: 800
        }),
        frame(48, {
          rotationX: horizontal ? -3 * intensity : sign * 7 * intensity,
          rotationY: horizontal ? sign * 7 * intensity : 3 * intensity,
          scale: 1 + 0.025 * intensity,
          transformPerspective: 800
        }),
        frame(100, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          transformPerspective: 800
        })
      ];
    }
    case "motion.emphasis.magnetic-snap": {
      const distance = Number(params.distance ?? 22) * intensity;
      const overshoot = Number(params.overshoot ?? 0.35);
      const pullOffset = directionOffset2(direction, distance);
      const log = Math.log(Math.max(1e-4, Math.min(0.95, overshoot)));
      const ratio = overshoot === 0 ? 1 : -log / Math.sqrt(Math.PI ** 2 + log ** 2);
      const damping = 2 * ratio * Math.sqrt(180);
      return [
        frame(0, { x: 0, y: 0, scale: 1 }),
        frame(26, { x: -pullOffset.x, y: -pullOffset.y, scale: 1 + 0.035 * intensity }, "power2.in"),
        ...Array.from({ length: 32 }, (_, index) => {
          const t = (index + 1) / 32, remaining = 1 - sampleSpringEase(1, 180, damping, t);
          if (index === 31)
            return frame(100, { x: 0, y: 0, scale: 1 }, "none");
          return frame(26 + t * 74, {
            x: -pullOffset.x * remaining,
            y: -pullOffset.y * remaining,
            scale: 1 + 0.035 * intensity * remaining
          }, "none");
        })
      ];
    }
    case "background.emphasis.molten-flow":
    case "background.emphasis.aurora-breathe":
    case "background.emphasis.prism-shift": {
      const color1 = motionColor(params, "color1", "--ipw-color-bg", "#1B1640");
      const color22 = motionColor(params, "color2", "--ipw-color-primary", "#6D4AFF");
      const color3 = motionColor(params, "color3", "--ipw-color-accent", "#F3B8FF");
      const brightness = Number(params.brightness ?? 1.1);
      const glow = Number(params.glow ?? 1);
      const swirl = Number(params.swirl ?? 0.6);
      return [
        frame(0, {
          backgroundColor: color1,
          filter: `brightness(${brightness}) saturate(${1 + glow * 0.18})`,
          rotation: 0,
          scale: 1
        }),
        frame(32, {
          backgroundColor: color22,
          filter: `brightness(${brightness + glow * 0.16}) saturate(${1 + glow * 0.42})`,
          rotation: 1.8 * swirl,
          scale: 1 + 0.012 * glow
        }),
        frame(68, {
          backgroundColor: color3,
          filter: `brightness(${brightness + glow * 0.08}) saturate(${1 + glow * 0.28})`,
          rotation: -1.2 * swirl,
          scale: 1 + 0.02 * glow
        }),
        frame(100, {
          backgroundColor: color1,
          filter: `brightness(${brightness}) saturate(${1 + glow * 0.18})`,
          rotation: 0,
          scale: 1
        })
      ];
    }
    case "background.emphasis.light-rays": {
      const color1 = motionColor(params, "color1", "--ipw-color-bg", "#0B1020");
      const color22 = motionColor(params, "color2", "--ipw-color-primary", "#2563EB");
      const color3 = motionColor(params, "color3", "--ipw-color-accent", "#FFFFFF");
      const brightness = Number(params.brightness ?? 1.05);
      const glow = Number(params.glow ?? 1.25);
      const swirl = Number(params.swirl ?? 0.35);
      return [
        frame(0, {
          backgroundColor: color1,
          scale: 1,
          rotation: -0.8 * swirl,
          filter: `brightness(${brightness}) saturate(1) drop-shadow(0 0 0 transparent)`
        }),
        frame(46, {
          backgroundColor: color22,
          scale: 1 + 0.025 * glow,
          rotation: 1.4 * swirl,
          filter: `brightness(${brightness + 0.25 * glow}) saturate(${1 + 0.35 * glow}) drop-shadow(0 0 ${Math.round(18 * glow)}px ${color3})`
        }),
        frame(72, {
          backgroundColor: color3,
          scale: 1 + 0.012 * glow,
          rotation: -0.6 * swirl,
          filter: `brightness(${brightness + 0.12 * glow}) saturate(${1 + 0.18 * glow}) drop-shadow(0 0 ${Math.round(9 * glow)}px ${color22})`
        }),
        frame(100, {
          backgroundColor: color1,
          scale: 1,
          rotation: 0,
          filter: `brightness(${brightness}) saturate(1) drop-shadow(0 0 0 transparent)`
        })
      ];
    }
    case "background.emphasis.grid-scan": {
      const color1 = motionColor(params, "color1", "--ipw-color-bg", "#08111C");
      const color22 = motionColor(params, "color2", "--ipw-color-primary", "#0F766E");
      const color3 = motionColor(params, "color3", "--ipw-color-accent", "#5EEAD4");
      const brightness = Number(params.brightness ?? 1);
      const glow = Number(params.glow ?? 0.75);
      const swirl = Number(params.swirl ?? 0.9);
      return [
        frame(0, {
          backgroundColor: color1,
          x: -5 * swirl,
          scale: 1.02,
          filter: `brightness(${brightness}) contrast(1) saturate(1)`
        }),
        frame(26, {
          backgroundColor: color22,
          x: 4 * swirl,
          scale: 1.035,
          filter: `brightness(${brightness + 0.18 * glow}) contrast(${1 + 0.32 * glow}) saturate(${1 + 0.22 * glow})`
        }),
        frame(54, {
          backgroundColor: color3,
          x: -2 * swirl,
          scale: 1.025,
          filter: `brightness(${brightness + 0.3 * glow}) contrast(${1 + 0.48 * glow}) saturate(${1 + 0.38 * glow})`
        }),
        frame(78, {
          backgroundColor: color22,
          x: 3 * swirl,
          scale: 1.03,
          filter: `brightness(${brightness + 0.12 * glow}) contrast(${1 + 0.18 * glow}) saturate(${1 + 0.16 * glow})`
        }),
        frame(100, {
          backgroundColor: color1,
          x: 0,
          scale: 1,
          filter: `brightness(${brightness}) contrast(1) saturate(1)`
        })
      ];
    }
    case "background.emphasis.iridescent-flow": {
      const color1 = motionColor(params, "color1", "--ipw-color-bg", "#17122F");
      const color22 = motionColor(params, "color2", "--ipw-color-primary", "#7C3AED");
      const color3 = motionColor(params, "color3", "--ipw-color-accent", "#22D3EE");
      const brightness = Number(params.brightness ?? 1.08);
      const glow = Number(params.glow ?? 1.15);
      const swirl = Number(params.swirl ?? -0.5);
      return [
        frame(0, {
          backgroundColor: color1,
          rotation: 0,
          scale: 1,
          filter: `brightness(${brightness}) saturate(${1 + 0.2 * glow}) hue-rotate(0deg)`
        }),
        frame(33, {
          backgroundColor: color22,
          rotation: 1.4 * swirl,
          scale: 1 + 0.018 * glow,
          filter: `brightness(${brightness + 0.12 * glow}) saturate(${1 + 0.5 * glow}) hue-rotate(68deg)`
        }),
        frame(67, {
          backgroundColor: color3,
          rotation: -1.1 * swirl,
          scale: 1 + 0.026 * glow,
          filter: `brightness(${brightness + 0.18 * glow}) saturate(${1 + 0.62 * glow}) hue-rotate(132deg)`
        }),
        frame(100, {
          backgroundColor: color1,
          rotation: 0,
          scale: 1,
          filter: `brightness(${brightness}) saturate(${1 + 0.2 * glow}) hue-rotate(0deg)`
        })
      ];
    }
    case "element.emphasis.lift":
      return [
        frame(0, { y: 0, scale: 1 }),
        frame(50, { y: -12 * intensity, scale: 1 + 0.025 * intensity }),
        frame(100, { y: 0, scale: 1 })
      ];
    case "element.emphasis.pulse":
      return [
        frame(0, { scale: 1 }),
        frame(50, { scale: 1 + 0.05 * intensity }),
        frame(100, { scale: 1 })
      ];
    case "element.emphasis.tilt":
      return [
        frame(0, { rotation: 0 }),
        frame(30, { rotation: -3 * intensity }),
        frame(65, { rotation: 3 * intensity }),
        frame(100, { rotation: 0 })
      ];
    case "element.emphasis.spotlight-card": {
      const glow = Number(params.glow ?? 1);
      return [
        frame(0, { scale: 1, filter: "brightness(1) drop-shadow(0 0 0 transparent)" }),
        frame(50, {
          scale: 1 + 0.035 * intensity,
          filter: `brightness(${1 + 0.22 * intensity}) drop-shadow(0 0 ${Math.round(18 * glow)}px ${color2})`
        }),
        frame(100, { scale: 1, filter: "brightness(1) drop-shadow(0 0 0 transparent)" })
      ];
    }
    case "element.emphasis.glare-sweep": {
      const glow = Number(params.glow ?? 0.8);
      const sign = direction === "left" ? -1 : 1;
      return [
        frame(0, {
          x: 0,
          skewX: 0,
          scale: 1,
          filter: "brightness(1) drop-shadow(0 0 0 transparent)"
        }),
        frame(42, {
          x: -3 * sign * intensity,
          skewX: 1.5 * sign * intensity,
          scale: 1.018,
          filter: `brightness(${1 + 0.38 * intensity}) drop-shadow(${4 * sign}px 0 ${Math.round(13 * glow)}px ${color2})`
        }),
        frame(66, {
          x: 3 * sign * intensity,
          skewX: -1 * sign * intensity,
          scale: 1.01,
          filter: `brightness(${1 + 0.2 * intensity}) drop-shadow(${-3 * sign}px 0 ${Math.round(7 * glow)}px ${color2})`
        }),
        frame(100, {
          x: 0,
          skewX: 0,
          scale: 1,
          filter: "brightness(1) drop-shadow(0 0 0 transparent)"
        })
      ];
    }
    case "text.exit.fade":
      return [frame(0, { opacity: 1 }), frame(100, { opacity: 0 })];
    case "text.exit.drift":
      return [
        frame(0, { opacity: 1, x: 0, y: 0 }),
        frame(100, { opacity: 0, x: -offset.x, y: -offset.y })
      ];
    case "text.exit.shrink":
      return [
        frame(0, { opacity: 1, scale: 1 }),
        frame(100, { opacity: 0, scale: Math.max(0.1, 1 - intensity * 0.45) })
      ];
    case "text.exit.flip":
      return [
        frame(0, { opacity: 1, rotationY: 0, transformPerspective: 600 }),
        frame(100, {
          opacity: 0,
          rotationY: direction === "left" || direction === "down" ? 80 * intensity : -80 * intensity,
          transformPerspective: 600
        })
      ];
    case "text.exit.wipe":
      return [
        frame(0, { opacity: 1, clipPath: wipeInset(direction, false) }),
        frame(100, { opacity: 1, clipPath: wipeInset(direction, true) })
      ];
    case "text.exit.blur":
      return [
        frame(0, { opacity: 1, filter: "blur(0px)" }),
        frame(100, { opacity: 0, filter: `blur(${Math.round(10 * intensity)}px)` })
      ];
    case "element.exit.fade":
      return [frame(0, { opacity: 1 }), frame(100, { opacity: 0 })];
    case "element.exit.slide":
      return [
        frame(0, { opacity: 1, x: 0, y: 0 }),
        frame(100, { opacity: 0, x: -offset.x, y: -offset.y })
      ];
    case "element.exit.scale":
      return [
        frame(0, { opacity: 1, scale: 1 }),
        frame(100, { opacity: 0, scale: Math.max(0.4, 1 - 0.22 * intensity) })
      ];
    default:
      return [];
  }
}

// ../core/dist/structuredTextMotion.js
var STRUCTURED_TEXT_ROLES = /* @__PURE__ */ new Set([
  "unit",
  "text",
  "background",
  "clone-primary",
  "clone-accent",
  "mask",
  "texture",
  "particle-container",
  "particle"
]);
var STRUCTURED_MOTION_PROPERTIES = /* @__PURE__ */ new Set([
  "opacity",
  "x",
  "y",
  "scale",
  "scaleX",
  "scaleY",
  "rotation",
  "rotationX",
  "rotationY",
  "skewX",
  "skewY",
  "color",
  "backgroundColor",
  "backgroundImage",
  "backgroundClip",
  "backgroundPosition",
  "backgroundSize",
  "borderRadius",
  "boxShadow",
  "clipPath",
  "filter",
  "fontWeight",
  "letterSpacing",
  "mixBlendMode",
  "textShadow",
  "transformOrigin",
  "visibility",
  "WebkitBackgroundClip",
  "WebkitTextFillColor"
]);
var MAX_LAYERS = 16;
var MAX_TRACKS = 32;
var MAX_KEYFRAMES_PER_TRACK = 16;
var MAX_PARTICLES = 96;
var MAX_TEXT_UNITS = 512;
var MAX_ASSETS = 8;
var MAX_ASSET_PATH_LENGTH = 256;
var MAX_EASE_LENGTH = 96;
var GSAP_EASE_PATTERN = /^(?:none|linear|(?:power[0-4]|sine|expo|circ|back|elastic|bounce|steps)(?:\.(?:in|out|inOut))?)(?:\(-?(?:\d+(?:\.\d+)?|\.\d+)(?:\s*,\s*-?(?:\d+(?:\.\d+)?|\.\d+))*\))?$/;
function segmentStructuredText(text3, split3) {
  return segmentStructuredTextFallback(text3, split3);
}
function segmentStructuredTextFallback(text3, split3) {
  if (split3 === "whole")
    return text3 ? [text3] : [];
  const Segmenter = Intl.Segmenter;
  if (!Segmenter) {
    throw new Error("Structured text motion requires Intl.Segmenter support");
  }
  const segments = Array.from(new Segmenter("und", { granularity: split3 === "word" ? "word" : "grapheme" }).segment(text3));
  return split3 === "word" ? segments.filter((segment) => segment.isWordLike).map((segment) => segment.segment) : segments.map((segment) => segment.segment);
}
function structuredTextSeed(value) {
  const input = String(value);
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
function createStructuredTextRng(seed2) {
  let state = structuredTextSeed(seed2);
  return () => {
    state += 1831565813;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}
function assertFinite(value, label, max = 60) {
  if (!Number.isFinite(value) || value < 0 || value > max) {
    throw new Error(`${label} must be a finite number between 0 and ${max}`);
  }
}
function validateRole(role, path) {
  if (!STRUCTURED_TEXT_ROLES.has(role)) {
    throw new Error(`${path} has an unsupported structured text role: ${role}`);
  }
}
function validateKeyframes(keyframes, path) {
  if (!Array.isArray(keyframes) || keyframes.length === 0 || keyframes.length > MAX_KEYFRAMES_PER_TRACK) {
    throw new Error(`${path} must contain between 1 and ${MAX_KEYFRAMES_PER_TRACK} keyframes`);
  }
  for (const [index, keyframe] of keyframes.entries()) {
    assertFinite(keyframe.percentage, `${path}[${index}].percentage`, 100);
    for (const [property, value] of Object.entries(keyframe.properties)) {
      if (!STRUCTURED_MOTION_PROPERTIES.has(property)) {
        throw new Error(`${path}[${index}] has an unsupported property: ${property}`);
      }
      if (typeof value !== "number" && typeof value !== "string") {
        throw new Error(`${path}[${index}].${property} must be a finite number or string value`);
      }
      if (typeof value === "number" && !Number.isFinite(value)) {
        throw new Error(`${path}[${index}].${property} must be finite`);
      }
    }
    if (keyframe.ease !== void 0 && (typeof keyframe.ease !== "string" || keyframe.ease.length === 0 || keyframe.ease.length > MAX_EASE_LENGTH || !GSAP_EASE_PATTERN.test(keyframe.ease))) {
      throw new Error(`${path}[${index}].ease must use a safe GSAP ease string`);
    }
  }
}
function validateRange(range, path) {
  if (range.length !== 2 || !Number.isFinite(range[0]) || !Number.isFinite(range[1])) {
    throw new Error(`${path} must contain two finite numbers`);
  }
}
function copyValidatedAssets(assets) {
  if (assets === void 0)
    return void 0;
  if (!Array.isArray(assets) || assets.length > MAX_ASSETS) {
    throw new Error(`Structured text assets must contain at most ${MAX_ASSETS} registry-relative paths`);
  }
  return assets.map((asset, index) => {
    if (typeof asset !== "string" || asset.length === 0 || asset.length > MAX_ASSET_PATH_LENGTH || !asset.startsWith("registry/") || asset.startsWith("/") || asset.startsWith("\\") || asset.startsWith("//") || asset.startsWith("\\\\") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(asset) || !/^[A-Za-z0-9._/-]+$/.test(asset) || asset.split("/").some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
      throw new Error(`assets[${index}] must be a safe registry-relative path`);
    }
    return asset;
  });
}
function validateStructuredTextRecipe(recipe) {
  if (recipe.version !== 1)
    throw new Error("Structured text recipe version must be 1");
  if (!recipe.id.trim() || !recipe.presetId.trim())
    throw new Error("Structured text recipe ids are required");
  if (!["whole", "word", "character"].includes(recipe.split)) {
    throw new Error(`Unsupported structured text split: ${recipe.split}`);
  }
  if (!Array.isArray(recipe.layers) || recipe.layers.length === 0 || recipe.layers.length > MAX_LAYERS) {
    throw new Error(`Structured text recipes support between 1 and ${MAX_LAYERS} layers`);
  }
  recipe.layers.forEach((layer, index) => {
    validateRole(layer.role, `layers[${index}]`);
    if (typeof layer.perUnit !== "boolean" || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(layer.className)) {
      throw new Error(`layers[${index}] must use a boolean perUnit and safe className`);
    }
  });
  if (!Array.isArray(recipe.tracks) || recipe.tracks.length === 0 || recipe.tracks.length > MAX_TRACKS) {
    throw new Error(`Structured text recipes support between 1 and ${MAX_TRACKS} tracks`);
  }
  recipe.tracks.forEach((track, index) => {
    validateRole(track.role, `tracks[${index}]`);
    assertFinite(track.position, `tracks[${index}].position`);
    assertFinite(track.duration, `tracks[${index}].duration`);
    assertFinite(track.stagger, `tracks[${index}].stagger`, 10);
    validateKeyframes(track.keyframes, `tracks[${index}].keyframes`);
  });
  if (recipe.particles) {
    if (!Number.isInteger(recipe.particles.count) || recipe.particles.count < 0 || recipe.particles.count > MAX_PARTICLES) {
      throw new Error(`Structured text particle count must be an integer between 0 and ${MAX_PARTICLES}`);
    }
    validateRange(recipe.particles.x, "particles.x");
    validateRange(recipe.particles.y, "particles.y");
    validateRange(recipe.particles.size, "particles.size");
    validateRange(recipe.particles.delay, "particles.delay");
  }
  copyValidatedAssets(recipe.assets);
}
function randomInRange(random, range) {
  return range[0] + (range[1] - range[0]) * random();
}
function roundTime2(value) {
  return Math.round(value * 1e12) / 1e12;
}
function recipeTrackTargetCount(recipe, track, unitCount) {
  if (track.role === "particle")
    return recipe.particles?.count ?? 0;
  const layer = recipe.layers.find((candidate) => candidate.role === track.role);
  return layer?.perUnit ? unitCount : 1;
}
function naturalTrackEnd(recipe, track, unitCount) {
  const targetCount = recipeTrackTargetCount(recipe, track, unitCount);
  return track.position + track.duration + track.stagger * Math.max(0, targetCount - 1);
}
function structuredTimingScale(recipe, unitCount, duration) {
  const naturalDuration = Math.max(...recipe.tracks.map((track) => naturalTrackEnd(recipe, track, unitCount)), 0);
  if (naturalDuration <= 0)
    return 1;
  return duration / naturalDuration;
}
function compileStructuredTextMotion(instance, text3, recipe) {
  if (!recipe)
    return void 0;
  validateStructuredTextRecipe(recipe);
  if (recipe.presetId !== instance.presetId) {
    throw new Error(`Structured text recipe ${recipe.id} does not match ${instance.presetId}`);
  }
  const units = segmentStructuredText(text3, recipe.split);
  if (units.length > MAX_TEXT_UNITS) {
    throw new Error(`Structured text recipes support at most ${MAX_TEXT_UNITS} text units`);
  }
  const seed2 = structuredTextSeed(recipe.seed ?? `${instance.id}:${recipe.id}:${text3}`);
  const random = createStructuredTextRng(seed2);
  const assets = copyValidatedAssets(recipe.assets);
  const particleSpec = recipe.particles;
  const actionDuration = instance.loop ? instance.duration * 0.8 : instance.duration;
  const timingScale = structuredTimingScale(recipe, units.length, actionDuration);
  const particles = particleSpec && units.length > 0 ? Array.from({ length: particleSpec.count }, (_, index) => ({
    unitIndex: units.length ? index % units.length : 0,
    x: randomInRange(random, particleSpec.x),
    y: randomInRange(random, particleSpec.y),
    size: randomInRange(random, particleSpec.size),
    delay: randomInRange(random, particleSpec.delay)
  })) : void 0;
  return {
    version: 1,
    recipeId: recipe.id,
    split: recipe.split,
    units: units.map((sourceText, index) => ({ index, sourceText })),
    layers: recipe.layers.map((layer) => ({ ...layer })),
    tracks: recipe.tracks.map((track) => ({
      ...track,
      position: roundTime2(track.position * timingScale),
      duration: roundTime2(track.duration * timingScale),
      stagger: roundTime2(track.stagger * timingScale),
      keyframes: track.keyframes.map((keyframe) => ({
        ...keyframe,
        properties: { ...keyframe.properties }
      }))
    })),
    ...particles ? { particles } : {},
    ...assets ? { assets } : {},
    seed: seed2
  };
}
function isStructuredTextPreset(preset) {
  return preset.structuredText !== void 0;
}
function structuredMotionSelector2(baseSelector, role) {
  validateRole(role, "role");
  return `${baseSelector} [data-ipw-motion-role="${role}"]`;
}

// ../core/dist/structuredTextDom.js
var STRUCTURE_ATTRIBUTE = "data-ipw-motion-structure";
var SOURCE_ATTRIBUTE = "data-ipw-motion-source";
var ROLE_ATTRIBUTE = "data-ipw-motion-role";
var PRESENTATION_ATTRIBUTE = "data-ipw-motion-presentation";
var STRUCTURED_TEXT_STYLE_ID = "ipw-structured-text-motion-styles";
var STRUCTURED_TEXT_STYLES = `
[data-ipw-motion-role="clone-primary"]::before,
[data-ipw-motion-role="clone-accent"]::before {
  content: attr(data-ipw-motion-clone-text);
}
`;
function encodeSourceText(sourceText) {
  return JSON.stringify(sourceText);
}
function readSourceText(target) {
  const encoded = target.getAttribute(SOURCE_ATTRIBUTE);
  if (encoded === null)
    return void 0;
  try {
    const source = JSON.parse(encoded);
    return typeof source === "string" ? source : void 0;
  } catch {
    return void 0;
  }
}
function addText(pieces, value) {
  if (!value)
    return;
  const previous = pieces.at(-1);
  if (previous?.kind === "text") {
    previous.value += value;
    return;
  }
  pieces.push({ kind: "text", value });
}
function addUnit(pieces, value, unitIndex) {
  if (value)
    pieces.push({ kind: "unit", value, unitIndex });
}
function splitInterveningText(pieces, value, prefix) {
  for (const part of value.split(/(\s+)/u)) {
    if (!part)
      continue;
    if (/^\s+$/u.test(part)) {
      addText(pieces, part);
      continue;
    }
    const previous = pieces.at(-1);
    if (previous?.kind === "unit") {
      previous.value += part;
    } else {
      prefix.value += part;
    }
  }
}
function buildWordPieces(sourceText, compiled) {
  const pieces = [];
  const prefix = { value: "" };
  let cursor = 0;
  for (const unit of compiled.units) {
    const index = sourceText.indexOf(unit.sourceText, cursor);
    if (index < 0)
      return [{ kind: "unit", value: sourceText, unitIndex: 0 }];
    splitInterveningText(pieces, sourceText.slice(cursor, index), prefix);
    addUnit(pieces, prefix.value + unit.sourceText, unit.index);
    prefix.value = "";
    cursor = index + unit.sourceText.length;
  }
  splitInterveningText(pieces, sourceText.slice(cursor), prefix);
  if (prefix.value)
    addText(pieces, prefix.value);
  return pieces;
}
function buildCharacterPieces(sourceText, compiled) {
  const pieces = [];
  let cursor = 0;
  for (const unit of compiled.units) {
    const index = sourceText.indexOf(unit.sourceText, cursor);
    if (index < 0)
      return [{ kind: "unit", value: sourceText, unitIndex: 0 }];
    addText(pieces, sourceText.slice(cursor, index));
    if (/^\s+$/u.test(unit.sourceText)) {
      addText(pieces, unit.sourceText);
    } else {
      addUnit(pieces, unit.sourceText, unit.index);
    }
    cursor = index + unit.sourceText.length;
  }
  addText(pieces, sourceText.slice(cursor));
  return pieces;
}
function buildContentPieces(sourceText, compiled) {
  if (compiled.split === "whole") {
    return sourceText ? [{ kind: "unit", value: sourceText, unitIndex: compiled.units[0]?.index ?? 0 }] : [];
  }
  return compiled.split === "word" ? buildWordPieces(sourceText, compiled) : buildCharacterPieces(sourceText, compiled);
}
function createLayer(document2, layer) {
  const element = document2.createElement("span");
  element.className = layer.className;
  element.setAttribute(ROLE_ATTRIBUTE, layer.role);
  return element;
}
function ensureStructuredTextStyles(document2) {
  if (document2.getElementById(STRUCTURED_TEXT_STYLE_ID))
    return;
  const style = document2.createElement("style");
  style.id = STRUCTURED_TEXT_STYLE_ID;
  style.textContent = STRUCTURED_TEXT_STYLES;
  document2.head?.append(style);
}
function applyMotionTextPresentation(target) {
  const document2 = target.ownerDocument;
  if (!document2)
    return;
  ensureStructuredTextStyles(document2);
  target.setAttribute(PRESENTATION_ATTRIBUTE, "text-v1");
}
function removeMotionTextPresentation(target) {
  target.removeAttribute(PRESENTATION_ATTRIBUTE);
}
function applyUnitStyles(unit) {
  unit.style.display = "inline-block";
  unit.style.position = "relative";
  unit.style.isolation = "isolate";
  unit.style.whiteSpace = "pre";
  unit.style.verticalAlign = "baseline";
  unit.style.transformOrigin = "50% 50%";
}
function applyLayerStyles(layer, role) {
  if (role === "background") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "0";
    layer.style.pointerEvents = "none";
    layer.style.transformOrigin = "left center";
  } else if (role === "text") {
    layer.style.display = "inline-block";
    layer.style.position = "relative";
    layer.style.zIndex = "1";
    layer.style.font = "inherit";
    layer.style.fontWeight = "inherit";
    layer.style.lineHeight = "inherit";
    layer.style.letterSpacing = "inherit";
    layer.style.color = "inherit";
    layer.style.whiteSpace = "pre";
    layer.style.setProperty("-webkit-text-stroke", "inherit");
  } else if (role === "clone-primary" || role === "clone-accent") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "2";
    layer.style.pointerEvents = "none";
    layer.style.userSelect = "none";
    layer.style.font = "inherit";
    layer.style.fontWeight = "inherit";
    layer.style.lineHeight = "inherit";
    layer.style.letterSpacing = "inherit";
    layer.style.color = "inherit";
    layer.style.whiteSpace = "pre";
    layer.style.setProperty("-webkit-text-stroke", "inherit");
  } else if (role === "particle-container") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "3";
    layer.style.overflow = "visible";
    layer.style.pointerEvents = "none";
  } else if (role === "texture" || role === "mask") {
    layer.style.position = "absolute";
    layer.style.inset = "0";
    layer.style.zIndex = "0";
    layer.style.pointerEvents = "none";
  }
}
function createUnit(document2, value, layers, split3, recipeId) {
  const unitLayer = layers.find((layer) => layer.role === "unit");
  const unit = createLayer(document2, unitLayer ?? {
    role: "unit",
    perUnit: true,
    className: "ipw-motion-unit"
  });
  if (split3 === "word")
    unit.setAttribute("data-ipw-motion-word", "");
  if (split3 === "character")
    unit.setAttribute("data-ipw-motion-char", "");
  applyUnitStyles(unit);
  if (recipeId === "caption-highlight.word-sweep") {
    unit.style.padding = "0.075em 0.15em 0.1em";
    unit.style.lineHeight = "1";
  }
  let hasTextLayer = false;
  for (const layer of layers) {
    if (!layer.perUnit || layer.role === "unit" || layer.role === "particle")
      continue;
    const child = createLayer(document2, layer);
    applyLayerStyles(child, layer.role);
    if (layer.role === "text" && !hasTextLayer) {
      child.textContent = value;
      hasTextLayer = true;
    } else if (layer.role === "clone-primary" || layer.role === "clone-accent") {
      child.dataset.ipwMotionCloneText = value;
      child.setAttribute("aria-hidden", "true");
    } else {
      child.setAttribute("aria-hidden", "true");
    }
    unit.append(child);
  }
  if (!hasTextLayer) {
    const text3 = createLayer(document2, {
      role: "text",
      perUnit: true,
      className: "ipw-motion-text"
    });
    text3.textContent = value;
    applyLayerStyles(text3, "text");
    unit.append(text3);
  }
  return unit;
}
function appendParticles(compiled, unitByIndex) {
  if (!compiled.particles)
    return;
  const particleLayer = compiled.layers.find((layer) => layer.role === "particle");
  for (const particle of compiled.particles) {
    if (!Number.isInteger(particle.unitIndex) || !Number.isFinite(particle.x) || !Number.isFinite(particle.y) || !Number.isFinite(particle.size) || !Number.isFinite(particle.delay))
      continue;
    const unit = unitByIndex.get(particle.unitIndex);
    if (!unit)
      continue;
    const container = Array.from(unit.children).find((child) => child.getAttribute(ROLE_ATTRIBUTE) === "particle-container") ?? unit;
    const element = createLayer(unit.ownerDocument, particleLayer ?? {
      role: "particle",
      perUnit: true,
      className: "ipw-motion-particle"
    });
    const size = Math.max(0, particle.size);
    const delay = Math.max(0, particle.delay);
    element.setAttribute("aria-hidden", "true");
    element.dataset.ipwMotionParticleX = String(particle.x);
    element.dataset.ipwMotionParticleY = String(particle.y);
    element.dataset.ipwMotionParticleSize = String(size);
    element.dataset.ipwMotionParticleDelay = String(delay);
    element.style.position = "absolute";
    element.style.pointerEvents = "none";
    element.style.left = "50%";
    element.style.top = "50%";
    element.style.setProperty("--ipw-motion-particle-x", `${particle.x}px`);
    element.style.setProperty("--ipw-motion-particle-y", `${particle.y}px`);
    element.style.setProperty("--ipw-motion-particle-size", `${size}px`);
    element.style.setProperty("--ipw-motion-particle-delay", `${delay}s`);
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.animationDelay = `${delay}s`;
    container.append(element);
  }
}
function appendGlobalDecorativeLayers(target, layers) {
  const document2 = target.ownerDocument;
  if (!document2)
    return;
  for (const layer of layers) {
    if (layer.perUnit || layer.role === "unit" || layer.role === "text")
      continue;
    const decorative = createLayer(document2, layer);
    decorative.setAttribute("aria-hidden", "true");
    applyLayerStyles(decorative, layer.role);
    target.append(decorative);
  }
}
function snapshotStructuredText(target) {
  return {
    attributes: Array.from(target.attributes, ({ name, value }) => ({ name, value })),
    childNodes: Array.from(target.childNodes)
  };
}
function restoreStructuredText(target, snapshot) {
  for (const attribute of Array.from(target.attributes))
    target.removeAttribute(attribute.name);
  for (const attribute of snapshot.attributes)
    target.setAttribute(attribute.name, attribute.value);
  target.replaceChildren(...snapshot.childNodes);
}
function unwrapStructuredText(target) {
  const sourceText = readSourceText(target) ?? target.textContent ?? "";
  const document2 = target.ownerDocument;
  if (!document2)
    return;
  target.replaceChildren(document2.createTextNode(sourceText));
  target.removeAttribute(STRUCTURE_ATTRIBUTE);
  target.removeAttribute(SOURCE_ATTRIBUTE);
  removeMotionTextPresentation(target);
}
function materializeStructuredText(target, compiled, sourceText) {
  const document2 = target.ownerDocument;
  if (!document2)
    return;
  const source = readSourceText(target) ?? sourceText ?? target.textContent ?? "";
  if (target.hasAttribute(STRUCTURE_ATTRIBUTE) || target.hasAttribute(SOURCE_ATTRIBUTE)) {
    unwrapStructuredText(target);
  }
  applyMotionTextPresentation(target);
  const fragment = document2.createDocumentFragment();
  const unitByIndex = /* @__PURE__ */ new Map();
  for (const piece of buildContentPieces(source, compiled)) {
    if (piece.kind === "text") {
      fragment.append(document2.createTextNode(piece.value));
    } else {
      const unit = createUnit(document2, piece.value, compiled.layers, compiled.split, compiled.recipeId);
      unitByIndex.set(piece.unitIndex, unit);
      fragment.append(unit);
    }
  }
  target.replaceChildren(fragment);
  appendParticles(compiled, unitByIndex);
  appendGlobalDecorativeLayers(target, compiled.layers);
  target.setAttribute(STRUCTURE_ATTRIBUTE, "v1");
  target.setAttribute(SOURCE_ATTRIBUTE, encodeSourceText(source));
}

// ../core/dist/motionPresets.js
var MOTION_DATA_PREFIX = "ipw-motion:v1:";
var PRESETS_BY_ID = new Map(MOTION_PRESETS.map((preset) => [preset.id, preset]));
var MIGRATED_CAPTION_DURATIONS = {
  "text.enter.editorial-emphasis": 1.55,
  "text.emphasis.karaoke-flow": 2.1,
  "text.enter.camera-track": 1.7,
  "text.enter.visual-layers": 1.55,
  "text.emphasis.highlight-sweep": 1.45,
  "text.enter.matrix-decode": 1.8,
  "text.emphasis.gradient-fill": 1.5,
  "text.emphasis.neon-glow": 2,
  "text.emphasis.neon-accent": 1.7,
  "text.emphasis.rgb-glitch": 1.8,
  "text.enter.clip-wipe": 1.6,
  "text.emphasis.weight-shift": 1.4,
  "text.emphasis.texture-fill": 1.5,
  "text.emphasis.kinetic-slam": 1.35,
  "text.emphasis.emoji-pop": 1.35,
  "text.emphasis.particle-burst": 2
};
var MOTION_SEARCH_ALIASES = {
  modern: ["\u73B0\u4EE3"],
  restrained: ["\u514B\u5236"],
  playful: ["\u6D3B\u6CFC", "\u4FCF\u76AE"],
  technology: ["\u79D1\u6280"],
  cinematic: ["\u7535\u5F71\u611F"],
  gentle: ["\u67D4\u548C"],
  energetic: ["\u52A8\u611F"],
  warning: ["\u8B66\u793A", "\u8B66\u544A"],
  emphasis: ["\u5F3A\u8C03"],
  title: ["\u6807\u9898"],
  reveal: ["\u51FA\u73B0", "\u8FDB\u5165", "\u63ED\u793A"],
  enter: ["\u8FDB\u5165", "\u51FA\u73B0"],
  exit: ["\u9000\u51FA", "\u79BB\u5F00", "\u6D88\u5931"],
  fade: ["\u6DE1\u5165", "\u6DE1\u51FA"],
  typewriter: ["\u6253\u5B57", "\u9010\u5B57"],
  decode: ["\u89E3\u7801"],
  highlight: ["\u9AD8\u4EAE", "\u626B\u5149"],
  glitch: ["\u6545\u969C"]
};
function getMotionPreset(presetId) {
  return PRESETS_BY_ID.get(presetId);
}
function listMotionPresets(filters) {
  const searchTerms = (value) => {
    const normalized = value?.trim().toLowerCase();
    if (!normalized)
      return [];
    const tokens = normalized.split(/\s+/).filter(Boolean);
    return Array.from(/* @__PURE__ */ new Set([
      normalized,
      ...tokens,
      ...tokens.flatMap((token) => MOTION_SEARCH_ALIASES[token] ?? [])
    ]));
  };
  const intentTerms = searchTerms(filters?.intent);
  const toneTerms = searchTerms(filters?.tone);
  return MOTION_PRESETS.filter((preset) => {
    if (filters?.targetKind && !preset.targetKinds.includes(filters.targetKind))
      return false;
    if (filters?.phase && preset.phase !== filters.phase)
      return false;
    const intentValues = [
      preset.id,
      preset.label,
      ...preset.semantics.intents,
      ...preset.semantics.preferredFor
    ].map((item) => item.toLowerCase());
    const toneValues = preset.semantics.tones.map((item) => item.toLowerCase());
    if (intentTerms.length > 0 && !intentTerms.some((term) => intentValues.some((value) => value.includes(term))))
      return false;
    if (toneTerms.length > 0 && !toneTerms.some((term) => toneValues.some((value) => value.includes(term))))
      return false;
    return true;
  });
}
function finiteNumber3(value) {
  if (typeof value === "number" && Number.isFinite(value))
    return value;
  if (typeof value !== "string" || !value.trim())
    return void 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function validateMotionParameters(preset, input = {}) {
  const issues = [];
  const parameters = { ...preset.defaults };
  const schema2 = new Map(preset.parameterSchema.map((parameter) => [parameter.id, parameter]));
  for (const key of Object.keys(input)) {
    if (!schema2.has(key))
      issues.push({
        path: `parameters.${key}`,
        code: "unknown_parameter",
        message: `Unknown parameter: ${key}`
      });
  }
  for (const parameter of preset.parameterSchema) {
    const supplied = input[parameter.id];
    if (supplied === void 0)
      continue;
    if (parameter.kind === "number") {
      const value = finiteNumber3(supplied);
      if (value === void 0) {
        issues.push({
          path: `parameters.${parameter.id}`,
          code: "invalid_number",
          message: `${parameter.label} must be a finite number`
        });
        continue;
      }
      if (parameter.min !== void 0 && value < parameter.min || parameter.max !== void 0 && value > parameter.max) {
        issues.push({
          path: `parameters.${parameter.id}`,
          code: "out_of_range",
          message: `${parameter.label} is outside the supported range`
        });
        continue;
      }
      parameters[parameter.id] = value;
      continue;
    }
    if (typeof supplied !== "string") {
      issues.push({
        path: `parameters.${parameter.id}`,
        code: "invalid_string",
        message: `${parameter.label} must be a string`
      });
      continue;
    }
    if (parameter.kind === "select" && !parameter.options?.some((option) => option.value === supplied)) {
      issues.push({
        path: `parameters.${parameter.id}`,
        code: "invalid_option",
        message: `${parameter.label} is not supported`
      });
      continue;
    }
    if (parameter.kind === "color" && !/^#[0-9a-f]{6}$/i.test(supplied)) {
      issues.push({
        path: `parameters.${parameter.id}`,
        code: "invalid_color",
        message: `${parameter.label} must use #RRGGBB`
      });
      continue;
    }
    parameters[parameter.id] = supplied;
  }
  return { valid: issues.length === 0, issues, parameters };
}
function encodeMotionData(instance) {
  return `${MOTION_DATA_PREFIX}${JSON.stringify(instance)}`;
}
function readExtraString(value) {
  if (typeof value !== "string")
    return null;
  if (!value.startsWith("__raw:"))
    return value;
  const raw = value.slice(6);
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}
function hasManualMotionKeyframes(animation) {
  const data = readExtraString(animation.extras?.data);
  return data === "hf-manual-keyframes" || animation.keyframes?.keyframes.some((frame2) => readExtraString(frame2.properties.data) === "hf-manual-keyframe" || "origin" in frame2 && frame2.origin === "manual") === true;
}
function readMotionInstanceFromExtras(extras) {
  const data = readExtraString(extras?.data);
  if (!data?.startsWith(MOTION_DATA_PREFIX))
    return null;
  try {
    const value = JSON.parse(data.slice(MOTION_DATA_PREFIX.length));
    if (!value || typeof value !== "object")
      return null;
    const preset = getMotionPreset(value.presetId);
    if (!preset || !value.target?.selector)
      return null;
    if (value.templateId !== void 0 && typeof value.templateId !== "string")
      return null;
    if (preset.phase !== value.phase || !preset.targetKinds.includes(value.targetKind))
      return null;
    if (!Number.isFinite(value.start) || value.start < 0)
      return null;
    if (!Number.isFinite(value.duration) || value.duration <= 0)
      return null;
    const validated = validateMotionParameters(preset, value.parameters);
    if (!validated.valid)
      return null;
    const loop = value.loop === true;
    const repeat = loop && Number.isFinite(value.repeat) && value.repeat >= 0 ? Math.floor(value.repeat) : loop ? 1 : 0;
    const end = Number.isFinite(value.end) && Number(value.end) > value.start ? Number(value.end) : value.start + value.duration * (repeat + 1);
    const applicationKind = value.applicationKind === "general" || value.applicationKind === "box" || value.applicationKind === "text" ? value.applicationKind : preset.id.startsWith("text.") ? "text" : "general";
    return { ...value, applicationKind, end, loop, repeat, parameters: validated.parameters };
  } catch {
    return null;
  }
}
function compileMotionInstance(instance, text3 = "") {
  const preset = getMotionPreset(instance.presetId);
  if (!preset)
    throw new Error(`Unknown motion preset: ${instance.presetId}`);
  if (preset.phase !== instance.phase)
    throw new Error(`Preset ${preset.id} does not support phase ${instance.phase}`);
  if (!preset.targetKinds.includes(instance.targetKind))
    throw new Error(`Preset ${preset.id} does not support ${instance.targetKind}`);
  if (!Number.isFinite(instance.start) || instance.start < 0)
    throw new Error("Motion start must be a finite non-negative number");
  if (!Number.isFinite(instance.duration) || instance.duration <= 0)
    throw new Error("Motion duration must be a finite positive number");
  const validated = validateMotionParameters(preset, instance.parameters);
  if (!validated.valid)
    throw new Error(validated.issues.map((issue) => issue.message).join("; "));
  const unit = String(validated.parameters.unit ?? "whole");
  const targetSelector = unit === "character" ? `${instance.target.selector} [data-ipw-motion-char]` : unit === "word" ? `${instance.target.selector} > [data-ipw-motion-word]` : instance.target.selector;
  const stagger2 = unit === "whole" ? 0 : Number(validated.parameters.stagger ?? 0);
  const compiled = {
    targetSelector,
    position: instance.start,
    duration: instance.duration,
    keyframes: buildPresetKeyframes(preset.id, validated.parameters),
    ease: String(validated.parameters.ease ?? "power2.out"),
    extras: {
      // GSAP preserves `id` on the runtime Animation (including its keyframe
      // wrapper), giving Studio a stable, direct replacement handle.
      id: instance.id,
      data: encodeMotionData({ ...instance, parameters: validated.parameters }),
      ...["element.enter.bounce-card", "motion.emphasis.magnetic-snap"].includes(preset.id) ? { immediateRender: true } : {},
      ...instance.loop && instance.repeat > 0 ? { repeat: instance.repeat } : {},
      ...stagger2 > 0 ? { stagger: stagger2 } : {}
    }
  };
  if (isStructuredTextPreset(preset)) {
    compiled.structured = compileStructuredTextMotion({ ...instance, parameters: validated.parameters }, text3, resolveStructuredTextRecipe(preset, validated.parameters));
  }
  return compiled;
}
function defaultMotionDuration(preset) {
  if (preset.id.startsWith("camera."))
    return 3;
  if (preset.id.startsWith("transition."))
    return 0.9;
  const migratedCaptionDuration = MIGRATED_CAPTION_DURATIONS[preset.id];
  if (migratedCaptionDuration !== void 0)
    return migratedCaptionDuration;
  if (preset.id.startsWith("background."))
    return 3.2;
  if (preset.id === "text.enter.fold-reveal")
    return 0.9;
  if (preset.id === "motion.enter.gradual-focus")
    return 0.85;
  if (preset.id === "motion.enter.scan-reveal")
    return 0.75;
  if (preset.id === "element.enter.bounce-card")
    return 0.9;
  if (preset.id === "motion.emphasis.soft-float")
    return 1.6;
  if (preset.id === "motion.emphasis.focus-tilt")
    return 1.1;
  if (preset.id === "motion.emphasis.magnetic-snap")
    return 0.9;
  if (preset.id === "text.emphasis.prism-glow")
    return 1.4;
  if (preset.id === "text.emphasis.shiny-sweep")
    return 1.4;
  if (preset.id === "text.emphasis.true-focus")
    return 1.2;
  if (preset.id === "element.emphasis.spotlight-card")
    return 1.1;
  if (preset.id === "element.emphasis.glare-sweep")
    return 1.1;
  if (preset.phase === "emphasis")
    return 0.8;
  if (preset.id === "text.enter.typewriter" || preset.id === "text.enter.decode")
    return 1.2;
  return 0.65;
}
function createMotionInstance(input) {
  const preset = getMotionPreset(input.presetId);
  if (!preset)
    throw new Error(`Unknown motion preset: ${input.presetId}`);
  const validated = validateMotionParameters(preset, input.parameters);
  if (!validated.valid)
    throw new Error(validated.issues.map((issue) => issue.message).join("; "));
  const loop = input.loop === true;
  const repeat = loop && Number.isFinite(input.repeat) && Number(input.repeat) >= 0 ? Math.floor(Number(input.repeat)) : loop ? 1 : 0;
  const duration = input.duration ?? defaultMotionDuration(preset);
  const end = input.end ?? input.start + duration * (repeat + 1);
  if (!Number.isFinite(end) || end <= input.start) {
    throw new Error("Motion end must be later than motion start");
  }
  const applicationKind = input.applicationKind ?? (preset.id.startsWith("text.") ? "text" : "general");
  const templateId = input.templateId?.trim() || void 0;
  return {
    id: templateId ? `motion:${input.target.selector}:${applicationKind}:${templateId}` : `motion:${input.target.selector}:${preset.phase}`,
    presetId: preset.id,
    ...templateId ? { templateId } : {},
    target: input.target,
    targetKind: input.targetKind,
    applicationKind,
    phase: preset.phase,
    start: input.start,
    end,
    duration,
    loop,
    repeat,
    parameters: validated.parameters
  };
}
function structuredTrackTargetCount(structured, role) {
  if (role === "particle")
    return structured.particles?.length ?? 0;
  const layer = structured.layers.find((candidate) => candidate.role === role);
  return layer?.perUnit ? structured.units.length : 1;
}
function readAuthoredMotionPositionBase(animations, targetSelector) {
  const base = { x: 0, y: 0 };
  for (const animation of animations) {
    if (animation.targetSelector !== targetSelector || animation.method !== "set" || !animation.global || animation.extras?.data === "hf-hold") {
      continue;
    }
    const x = animation.properties.x ?? animation.properties.translateX;
    const y = animation.properties.y ?? animation.properties.translateY;
    if (typeof x === "number")
      base.x = x;
    if (typeof y === "number")
      base.y = y;
  }
  return base;
}
function rebaseCompiledMotionKeyframes(keyframes, base) {
  return keyframes.map((keyframe) => {
    const properties = { ...keyframe.properties };
    for (const property of ["x", "translateX"]) {
      if (typeof properties[property] === "number")
        properties[property] += base.x;
    }
    for (const property of ["y", "translateY"]) {
      if (typeof properties[property] === "number")
        properties[property] += base.y;
    }
    return { ...keyframe, properties };
  });
}
function motionSourceMatchesPreset(animations, sourceText, authoredPositionBase = { x: 0, y: 0 }) {
  const groups = /* @__PURE__ */ new Map();
  for (const animation of animations) {
    const instance = readMotionInstanceFromExtras(animation.extras);
    if (!instance)
      continue;
    const entry = { animation, instance };
    if (hasManualMotionKeyframes(entry.animation))
      return false;
    const group = groups.get(entry.instance.id) ?? [];
    group.push(entry);
    groups.set(entry.instance.id, group);
  }
  for (const group of groups.values()) {
    const instance = group[0]?.instance;
    if (!instance)
      continue;
    let expectedSource = "const tl = gsap.timeline({ paused: true });";
    const compiled = compileMotionInstance(instance, sourceText);
    if (compiled.structured) {
      for (const [trackIndex, track] of compiled.structured.tracks.entries()) {
        const targetCount = structuredTrackTargetCount(compiled.structured, track.role);
        const staggerSpan = track.stagger * Math.max(0, targetCount - 1);
        expectedSource = addAnimationWithKeyframesToScript(expectedSource, structuredMotionSelector2(instance.target.selector, track.role), compiled.position + track.position, track.duration, track.keyframes, void 0, void 0, {
          ...compiled.extras,
          id: `${instance.id}:${trackIndex}:${track.role}`,
          ...instance.loop && instance.repeat > 0 ? {
            repeatDelay: Number(Math.max(0, instance.duration - track.duration - staggerSpan).toFixed(12))
          } : {},
          stagger: track.stagger
        }).script;
      }
    } else {
      expectedSource = addAnimationWithKeyframesToScript(expectedSource, compiled.targetSelector, compiled.position, compiled.duration, compiled.targetSelector === instance.target.selector ? rebaseCompiledMotionKeyframes(compiled.keyframes, authoredPositionBase) : compiled.keyframes, compiled.ease, void 0, compiled.extras).script;
    }
    const expected = parseGsapScriptAcorn(expectedSource).animations.filter((animation) => readMotionInstanceFromExtras(animation.extras)?.id === instance.id);
    if (expected.length !== group.length)
      return false;
    const shape = (animation) => JSON.stringify({
      selector: animation.targetSelector,
      method: animation.method,
      position: animation.resolvedStart ?? animation.position,
      duration: animation.duration,
      ease: animation.ease,
      keyframes: animation.keyframes,
      properties: Object.entries(animation.properties).filter(([key]) => key !== "id" && key !== "data").sort(([first], [second]) => first.localeCompare(second)),
      arcPath: animation.arcPath,
      extras: Object.entries(animation.extras ?? {}).filter(([key]) => key !== "data" && key !== "id").sort(([first], [second]) => first.localeCompare(second))
    });
    const expectedShapes = expected.map(shape).sort();
    if (group.map((entry) => shape(entry.animation)).sort().some((value, index) => value !== expectedShapes[index]))
      return false;
  }
  return true;
}

// ../studio-server/src/routes/gsapMutationCapabilities.ts
var differential = (family) => ({
  family,
  acorn: "supported",
  recast: "supported",
  parity: "differential"
});
var behavioral = (family) => ({
  family,
  acorn: "supported",
  recast: "supported",
  parity: "behavioral"
});
var GSAP_MUTATION_CAPABILITIES = {
  "update-property": differential("animation"),
  "update-properties": differential("animation"),
  "update-from-property": differential("animation"),
  "update-meta": differential("animation"),
  add: differential("animation"),
  delete: differential("animation"),
  "add-property": differential("animation"),
  "add-from-property": differential("animation"),
  "remove-property": differential("animation"),
  "remove-from-property": differential("animation"),
  "add-keyframe": differential("keyframe"),
  "remove-keyframe": differential("keyframe"),
  "move-keyframe": behavioral("keyframe"),
  "edit-property-keyframe": behavioral("keyframe"),
  "resize-keyframed-tween": behavioral("keyframe"),
  "update-keyframe": differential("keyframe"),
  "convert-to-keyframes": behavioral("keyframe"),
  "remove-all-keyframes": behavioral("keyframe"),
  "materialize-keyframes": behavioral("keyframe"),
  "set-arc-path": behavioral("motion_path"),
  "update-arc-segment": behavioral("motion_path"),
  "update-motion-path-point": differential("motion_path"),
  "add-motion-path-point": differential("motion_path"),
  "remove-motion-path-point": differential("motion_path"),
  "add-motion-path": differential("motion_path"),
  "remove-arc-path": behavioral("motion_path"),
  "add-with-keyframes": behavioral("keyframe"),
  "replace-with-keyframes": behavioral("keyframe"),
  "split-animations": behavioral("structure"),
  "split-into-property-groups": behavioral("structure"),
  "delete-all-for-selector": behavioral("structure"),
  "consolidate-position-writes": behavioral("structure"),
  "unroll-timeline": behavioral("structure"),
  "shift-positions": behavioral("timing"),
  "shift-positions-batch": behavioral("timing"),
  "scale-positions": behavioral("timing"),
  "mutate-motion": behavioral("animation"),
  "isolate-selector-target": behavioral("structure"),
  "offset-position-paths": behavioral("motion_path")
};
var GSAP_WRITER_MIGRATION = Object.freeze({
  flag: "HYPERFRAMES_GSAP_WRITER",
  owner: "studio-foundations",
  deadline: "2026-09-30",
  graduationCriteria: "Acorn is the default writer. Recast is retained one watch window as HYPERFRAMES_GSAP_WRITER=recast, then deleted (spec 2026-09-17 \xA75)."
});
function resolveGsapWriter(env) {
  const configured = env.HYPERFRAMES_GSAP_WRITER ?? "acorn";
  if (configured === "recast" || configured === "acorn") return configured;
  throw new Error(`Invalid ${GSAP_WRITER_MIGRATION.flag}=${configured}; expected recast or acorn`);
}

// ../studio-server/src/routes/files.ts
async function loadGsapParser() {
  return import("./gsapParser-PZ7WVDKW.js");
}
function isDanglingSymlinkInProject(projectDir, lexicalPath) {
  if (!isSafePath(projectDir, dirname4(lexicalPath))) return false;
  let stats;
  try {
    stats = lstatSync2(lexicalPath);
  } catch {
    return false;
  }
  if (!stats.isSymbolicLink()) return false;
  const target = resolve2(dirname4(lexicalPath), readlinkSync(lexicalPath));
  if (!isSafePath(projectDir, target)) return false;
  try {
    statSync3(lexicalPath);
    return false;
  } catch {
    return true;
  }
}
async function resolveProjectPath(c, adapter, route, opts) {
  const id = c.req.param("id");
  const project = await adapter.resolveProject(id);
  if (!project) {
    return { error: c.json({ error: "not found" }, 404) };
  }
  if (folderGone(project.dir)) {
    return { error: projectDirMissing(c) };
  }
  const filePath = requestSubPath(c.req.url, `projects/:id/${route}`);
  if (filePath.includes("\0")) {
    return { error: c.json({ error: "forbidden", why: "nul" }, 403) };
  }
  const absPath = (opts?.pin ? pinWithinProject : resolveWithinProject)(project.dir, filePath);
  if (!absPath) {
    if (isDanglingSymlinkInProject(project.dir, resolve2(project.dir, filePath))) {
      return { error: c.json({ error: "not found", why: "dangling_symlink" }, 404) };
    }
    return { error: c.json({ error: "forbidden", why: "outside_project" }, 403) };
  }
  if (opts?.mustExist && !existsSync4(absPath)) {
    return { error: c.json({ error: "not found" }, 404) };
  }
  return { project, filePath, absPath };
}
function resolveProjectFile(c, adapter, opts) {
  return resolveProjectPath(c, adapter, "files", opts);
}
function resolveFileMutationContext(c, adapter, operation) {
  return resolveProjectPath(c, adapter, `file-mutations/${operation}`, { pin: true });
}
function isOptionalInteger(value) {
  return value === void 0 || Number.isInteger(value);
}
function isAtomicCutTarget(value) {
  if (!value || typeof value !== "object") return false;
  const target = value;
  return !!target.target && typeof target.target === "object" && Number.isFinite(target.splitTime) && Number.isFinite(target.elementStart) && Number.isFinite(target.elementDuration) && Number(target.elementDuration) > 0 && isOptionalInteger(target.track);
}
function isAtomicCutFileRequest(value) {
  if (!value || typeof value !== "object") return false;
  const file = value;
  return typeof file.path === "string" && file.path.length > 0 && typeof file.expectedVersion === "string" && Array.isArray(file.targets) && file.targets.length > 0 && file.targets.every(isAtomicCutTarget);
}
var atomicCutTail = Promise.resolve();
function serializeAtomicCut(task) {
  const next = atomicCutTail.then(task, task);
  atomicCutTail = next.then(
    () => void 0,
    () => void 0
  );
  return next;
}
function isElementPatchRequest(value) {
  if (typeof value !== "object" || value === null) return false;
  if (!("target" in value) || typeof value.target !== "object" || value.target === null) {
    return false;
  }
  return "operations" in value && Array.isArray(value.operations) && value.operations.length > 0;
}
function isElementPatchBatchRequest(value) {
  return typeof value === "object" && value !== null && "sourceFile" in value && typeof value.sourceFile === "string" && value.sourceFile.length > 0 && "patches" in value && Array.isArray(value.patches) && value.patches.length > 0 && value.patches.every(isElementPatchRequest);
}
function findUnsafeElementPatchBatchValues(batches) {
  return batches.flatMap(
    (batch) => batch.patches.flatMap((patch) => findUnsafeDomPatchValues(patch))
  );
}
function foldElementPatches(originalContent, patches) {
  let content = originalContent;
  const matched = [];
  for (const patch of patches) {
    const result = patchElementInHtml(content, patch.target, patch.operations);
    content = result.html;
    matched.push(result.matched);
  }
  return { content, matched };
}
var PATCH_CONFLICT_ATTEMPTS = 3;
var ID_ATTRIBUTE = /[\s"'/]id\s*=\s*(?=(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))/gi;
function projectHtmlIds(projectDir) {
  const ids = /* @__PURE__ */ new Set();
  for (const rel of walkDir(projectDir)) {
    if (!rel.endsWith(".html") || isInHiddenOrVendorDir(rel)) continue;
    let html;
    try {
      html = readFileSync6(join6(projectDir, rel), "utf-8");
    } catch {
      continue;
    }
    for (const m of html.matchAll(ID_ATTRIBUTE)) ids.add(m[1] ?? m[2] ?? m[3] ?? "");
  }
  return ids;
}
function commitElementPatchBatches(projectDir, batches, writeFile = (path, content) => replaceFileAtomically(path, content, statSync3(path).mode), requestToken) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return foldAndCommitElementPatchBatches(projectDir, batches, writeFile, requestToken);
    } catch (error) {
      if (!(error instanceof FileChangedError)) throw error;
      if (attempt === PATCH_CONFLICT_ATTEMPTS)
        return { error: "conflict", sourceFile: error.sourceFile };
    }
  }
}
function foldAndCommitElementPatchBatches(projectDir, batches, writeFile, requestToken) {
  const resolvedPaths = /* @__PURE__ */ new Set();
  const prepared = [];
  for (const batch of batches) {
    const absPath = pinWithinProject(projectDir, batch.sourceFile);
    if (!absPath) return { error: "forbidden", sourceFile: batch.sourceFile };
    if (resolvedPaths.has(absPath)) return { error: "duplicate", sourceFile: batch.sourceFile };
    resolvedPaths.add(absPath);
    let before;
    try {
      before = readFileSync6(absPath, "utf-8");
    } catch {
      return { error: "not-found", sourceFile: batch.sourceFile };
    }
    const folded = foldElementPatches(before, batch.patches);
    prepared.push({
      sourceFile: batch.sourceFile,
      absPath,
      before,
      matched: folded.matched,
      after: folded.content
    });
  }
  const durable = prepared.every((file) => file.matched.every(Boolean));
  if (!durable) {
    return {
      durable: false,
      files: prepared.map((file) => ({
        sourceFile: file.sourceFile,
        changed: false,
        matched: file.matched,
        before: file.before,
        after: file.before
      }))
    };
  }
  const applied = applyFileMutations(
    projectDir,
    prepared.map(({ sourceFile, absPath, before, after }) => ({
      sourceFile,
      absPath,
      before,
      after
    })),
    requestToken,
    writeFile
  );
  const files = applied.map((file, index) => ({
    sourceFile: file.sourceFile,
    changed: file.changed,
    matched: prepared[index]?.matched ?? [],
    before: file.before,
    after: file.after,
    backupPath: file.backupPath ?? void 0
  }));
  return { durable: true, files };
}
function commitElementPatchBatchesWithReceipts(c, projectDir, batches) {
  return commitElementPatchBatches(
    projectDir,
    batches,
    void 0,
    c.req.header("X-Hyperframes-Write-Token")
  );
}
function writeFileWithReceipt(c, filePath, absPath, html) {
  const overwrote = readFileSync6(absPath);
  replaceFileAtomically(absPath, html, statSync3(absPath).mode);
  const version = fileContentVersion(html);
  const writeToken = createWriteToken(c.req.header("X-Hyperframes-Write-Token"));
  recordFileWriteReceipt(absPath, { path: filePath, version, writeToken, overwrote });
  return { version, writeToken };
}
function writeMutationResult(c, projectDir, filePath, absPath, html, original) {
  const backup = snapshotBeforeWrite(projectDir, absPath);
  if (backup.error) return c.json({ error: `backup failed: ${backup.error}` }, 500);
  if (readFileSync6(absPath, "utf-8") !== original) {
    return c.json({ error: "file changed", conflict: true, path: filePath }, 409);
  }
  const { version } = writeFileWithReceipt(c, filePath, absPath, html);
  return { backupPath: backupPathForResponse(projectDir, backup.backupPath), version };
}
function writeIfChanged(c, projectDir, filePath, absPath, original, next) {
  const version = fileContentVersion(next);
  c.header("ETag", version);
  if (next === original) {
    return c.json({ ok: true, changed: false, content: original, path: filePath, version });
  }
  const mutationResult = writeMutationResult(c, projectDir, filePath, absPath, next, original);
  if (mutationResult instanceof Response) return mutationResult;
  const { backupPath } = mutationResult;
  return c.json({
    ok: true,
    changed: true,
    content: next,
    path: filePath,
    version,
    backupPath
  });
}
function rejectUnsafeMutationValues(c, unsafeFields) {
  return c.json(
    {
      error: "mutation contains unsafe values",
      fields: unsafeFields.map((field) => field.path),
      unsafeValues: unsafeFields
    },
    400
  );
}
function elementPatchBatchCommitErrorResponse(c, error, sourceFile) {
  if (error === "conflict")
    return c.json({ error: "file changed", conflict: true, sourceFile }, 409);
  if (error === "not-found") return c.json({ error, sourceFile }, 404);
  if (error === "forbidden") return c.json({ error, sourceFile }, 403);
  return c.json({ error: "duplicate source file", sourceFile }, 400);
}
async function parseMutationBody(c) {
  const body = await c.req.json().catch(() => null);
  if (!body?.target) {
    return { error: c.json({ error: "target required" }, 400) };
  }
  return { target: body.target, body };
}
function ensureDir(projectDir, filePath) {
  mkdirWithinProject(projectDir, dirname4(filePath));
}
function generateCopyPath(projectDir, originalPath) {
  const ext = originalPath.includes(".") ? "." + originalPath.split(".").pop() : "";
  const base = ext ? originalPath.slice(0, -ext.length) : originalPath;
  const copyMatch = base.match(/ \(copy(?: (\d+))?\)$/);
  const cleanBase = copyMatch ? base.slice(0, -copyMatch[0].length) : base;
  let num = copyMatch ? copyMatch[1] ? parseInt(copyMatch[1]) + 1 : 2 : 1;
  let candidate = num === 1 ? `${cleanBase} (copy)${ext}` : `${cleanBase} (copy ${num})${ext}`;
  while (existsSync4(resolve2(projectDir, candidate))) {
    num++;
    candidate = `${cleanBase} (copy ${num})${ext}`;
  }
  return candidate;
}
function walkFiles(dir, filter) {
  const results = [];
  for (const entry of readableEntries(dir)) {
    const full2 = join6(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".thumbnails" || entry.name === "renders" || entry.name === ".transcode-cache")
        continue;
      results.push(...walkFiles(full2, filter));
    } else if (filter(entry.name)) {
      results.push(full2);
    }
  }
  return results;
}
var SKIPPED_ENTRY = /* @__PURE__ */ new Set(["EACCES", "EPERM", "ENOENT"]);
function skippable(error) {
  return error instanceof Error && SKIPPED_ENTRY.has(error.code ?? "");
}
function readableEntries(dir) {
  try {
    return readdirSync2(dir, { withFileTypes: true });
  } catch (error) {
    if (skippable(error)) return [];
    throw error;
  }
}
function readableText(file) {
  try {
    return readFileSync6(file, "utf-8");
  } catch (error) {
    if (skippable(error)) return null;
    throw error;
  }
}
var escapeRegExp = (text3) => text3.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var SEPARATOR = String.raw`\\{0,2}[\\/]`;
var REFERENCE_START = String.raw`(?<![\w./\\+-])`;
var FILE_END = String.raw`(?![\w-]|\.\w)`;
function referencePattern(oldPath, isDirectory) {
  const name = oldPath.split("/").map(escapeRegExp).join(SEPARATOR);
  const end = isDirectory ? `(?=${SEPARATOR})` : FILE_END;
  return new RegExp(
    String.raw`${REFERENCE_START}(?<lead>(?:\.{1,2}${SEPARATOR}|${SEPARATOR}){0,4})${name}${end}`,
    "g"
  );
}
function referenceRewriter(oldPath, newPath, isDirectory, existing = []) {
  const pattern = referencePattern(oldPath, isDirectory);
  const around = /* @__PURE__ */ new Map();
  const afterLengths = /* @__PURE__ */ new Set();
  let window2 = 0;
  for (const path of existing) {
    if (path.length <= oldPath.length) continue;
    for (const start of occurrences(path, oldPath)) {
      const [before, after] = [path.slice(0, start), path.slice(start + oldPath.length)];
      const befores = around.get(after) ?? around.set(after, /* @__PURE__ */ new Map()).get(after);
      (befores.get(before.length) ?? befores.set(before.length, /* @__PURE__ */ new Set()).get(before.length)).add(
        before
      );
      afterLengths.add(after.length);
      window2 = Math.max(window2, path.length * 3);
    }
  }
  const normalized = (text3) => text3.replace(/\\{0,2}[\\/]/g, "/");
  return (text3) => text3.replace(pattern, (...args) => {
    const [match, offset] = [args[0], args.at(-3)];
    const { lead } = args.at(-1);
    const at = offset + lead.length;
    const head = normalized(text3.slice(Math.max(0, at - window2), at));
    const tail = normalized(text3.slice(offset + match.length, offset + match.length + window2));
    const inLonger = [...afterLengths].some((after) => {
      const befores = tail.length >= after && around.get(tail.slice(0, after));
      return befores && [...befores].some(
        ([length, set2]) => head.length >= length && set2.has(head.slice(head.length - length))
      );
    });
    return inLonger ? match : `${lead}${newPath}`;
  });
}
function occurrences(text3, part) {
  const at = [];
  for (let i = text3.indexOf(part); i >= 0; i = text3.indexOf(part, i + 1)) at.push(i);
  return at;
}
function projectPaths(root, dir = root, prefix = "", ancestors = /* @__PURE__ */ new Set()) {
  return readableEntries(dir).flatMap((entry) => {
    const [path, full2] = [`${prefix}${entry.name}`, join6(dir, entry.name)];
    const real = entry.name === "node_modules" ? null : directoryReal(entry, full2);
    if (real === null || ancestors.has(real) || !isSafePath(root, full2)) return [path];
    return [path, ...projectPaths(root, full2, `${path}/`, /* @__PURE__ */ new Set([...ancestors, real]))];
  });
}
function directoryReal(entry, full2) {
  try {
    return entry.isDirectory() || entry.isSymbolicLink() && statSync3(full2).isDirectory() ? realpathSync(full2) : null;
  } catch {
    return null;
  }
}
function updateReferences(projectDir, oldPath, newPath, isDirectory) {
  const textFiles = walkFiles(
    projectDir,
    (name) => /\.(html|css|js|jsx|ts|tsx|json|mjs|cjs|md|mdx)$/i.test(name)
  );
  const rewrite = referenceRewriter(oldPath, newPath, isDirectory, projectPaths(projectDir));
  let updatedCount = 0;
  for (const file of textFiles) {
    if (!isSafePath(projectDir, file) || isPrivateProjectFile(projectDir, file)) continue;
    const content = readableText(file);
    if (content === null) continue;
    const updated = rewrite(content);
    if (updated !== content) {
      replaceFileAtomically(file, updated, statSync3(file).mode);
      updatedCount++;
    }
  }
  return updatedCount;
}
function extractGsapScriptBlock(html) {
  const { document: document2 } = parseHTML(ensureHfIds(html));
  const scripts = [
    ...document2.querySelectorAll("script:not([src])"),
    ...Array.from(document2.querySelectorAll("template")).flatMap(
      (tmpl) => Array.from(tmpl.querySelectorAll("script:not([src])"))
    )
  ];
  const script = findTimelineScript(scripts);
  if (!script) return null;
  return {
    scriptText: script.textContent || "",
    document: document2,
    root: clipQueryRoot(script),
    replaceScript(newText) {
      script.textContent = newText;
      return document2.toString();
    }
  };
}
function stripGsapAnimationsForSelectors(html, selectors) {
  const block = extractGsapScriptBlock(html);
  if (!block) return html;
  const targetSelectors = new Set(selectors);
  if (targetSelectors.size === 0) return html;
  const parsed = parseGsapScriptAcorn(block.scriptText);
  const matching = parsed.animations.filter((a) => targetSelectors.has(a.targetSelector));
  if (matching.length === 0) return html;
  let script = block.scriptText;
  for (const anim of [...matching].reverse()) {
    script = removeAnimationFromScript(script, anim.id);
  }
  return block.replaceScript(script);
}
function stripGsapAnimationsForSelector(html, selector) {
  return stripGsapAnimationsForSelectors(html, [selector]);
}
function bakeGroupTransformIntoMembers(html, groupId, members, groupCenter) {
  const block = extractGsapScriptBlock(html);
  if (!block) return html;
  const parsed = parseGsapScriptAcorn(block.scriptText);
  const groupSel = `#${groupId}`;
  const groupSets = parsed.animations.filter(
    (a) => a.targetSelector === groupSel && a.method === "set"
  );
  if (groupSets.length === 0) return html;
  const gt = {};
  for (const s of groupSets) {
    for (const [k, v] of Object.entries(s.properties)) if (typeof v === "number") gt[k] = v;
  }
  const gx = gt.x ?? 0;
  const gy = gt.y ?? 0;
  const gz = gt.z ?? 0;
  const grot = gt.rotation ?? 0;
  const gscale = gt.scale ?? 1;
  const isScaleAxis = (k) => k === "scale" || k === "scaleX" || k === "scaleY";
  const groupIsIdentity = Object.entries(gt).every(
    ([k, v]) => isScaleAxis(k) ? v === 1 : v === 0
  );
  if (groupIsIdentity) return html;
  const rad = grot * Math.PI / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const round32 = (n) => Math.round(n * 1e3) / 1e3;
  let script = block.scriptText;
  for (const m of members) {
    const memberSel = `#${m.id}`;
    const sets = parsed.animations.filter(
      (a) => a.targetSelector === memberSel && a.method === "set"
    );
    const mProps = {};
    for (const s of sets) Object.assign(mProps, s.properties);
    const mx = typeof mProps.x === "number" ? mProps.x : 0;
    const my = typeof mProps.y === "number" ? mProps.y : 0;
    const dx = m.cx + mx - groupCenter.cx;
    const dy = m.cy + my - groupCenter.cy;
    const visX = groupCenter.cx + gscale * (cos * dx - sin * dy) + gx;
    const visY = groupCenter.cy + gscale * (sin * dx + cos * dy) + gy;
    const newProps = {
      ...mProps,
      x: round32(visX - m.cx),
      y: round32(visY - m.cy)
    };
    if (gz !== 0) newProps.z = (typeof mProps.z === "number" ? mProps.z : 0) + gz;
    if (grot !== 0) {
      newProps.rotation = round32(
        (typeof mProps.rotation === "number" ? mProps.rotation : 0) + grot
      );
    }
    if (gscale !== 1) {
      newProps.scale = round32((typeof mProps.scale === "number" ? mProps.scale : 1) * gscale);
    }
    const pivoted = /* @__PURE__ */ new Set(["x", "y", "z", "rotation", "scale"]);
    for (const [k, v] of Object.entries(gt)) {
      if (pivoted.has(k) || typeof v !== "number") continue;
      if (k === "scaleX" || k === "scaleY") {
        if (v !== 1) newProps[k] = round32((typeof mProps[k] === "number" ? mProps[k] : 1) * v);
      } else if (k === "transformPerspective") {
        if (typeof mProps[k] !== "number") newProps[k] = v;
      } else if (v !== 0) {
        newProps[k] = round32((typeof mProps[k] === "number" ? mProps[k] : 0) + v);
      }
    }
    for (const s of [...sets].reverse()) {
      script = removeAnimationFromScript(script, s.id);
    }
    script = addAnimationToScript(script, {
      targetSelector: memberSel,
      method: "set",
      position: 0,
      properties: newProps,
      global: true
    }).script;
  }
  return block.replaceScript(script);
}
function stripStudioEditsFromTarget(document2, selector) {
  if (!selector) return 0;
  let stripped = 0;
  try {
    for (const el of document2.querySelectorAll(selector)) {
      if (!isHTMLElement(el)) continue;
      const htmlEl = el;
      let touched = false;
      if (el.getAttribute("data-hf-studio-path-offset")) {
        const originalTranslate = el.getAttribute("data-hf-studio-original-inline-translate");
        htmlEl.style.removeProperty("--hf-studio-offset-x");
        htmlEl.style.removeProperty("--hf-studio-offset-y");
        if (originalTranslate) {
          htmlEl.style.setProperty("translate", originalTranslate);
        } else {
          htmlEl.style.removeProperty("translate");
        }
        el.removeAttribute("data-hf-studio-path-offset");
        el.removeAttribute("data-hf-studio-original-translate");
        el.removeAttribute("data-hf-studio-original-inline-translate");
        touched = true;
      }
      if (el.getAttribute("data-hf-studio-rotation")) {
        const originalRotate = el.getAttribute("data-hf-studio-original-inline-rotate");
        const originalOrigin = el.getAttribute("data-hf-studio-original-rotation-transform-origin");
        htmlEl.style.removeProperty("--hf-studio-rotation");
        if (originalRotate) {
          htmlEl.style.setProperty("rotate", originalRotate);
        } else {
          htmlEl.style.removeProperty("rotate");
        }
        if (originalOrigin) {
          htmlEl.style.setProperty("transform-origin", originalOrigin);
        } else {
          htmlEl.style.removeProperty("transform-origin");
        }
        el.removeAttribute("data-hf-studio-rotation");
        el.removeAttribute("data-hf-studio-rotation-draft");
        el.removeAttribute("data-hf-studio-original-rotate");
        el.removeAttribute("data-hf-studio-original-inline-rotate");
        el.removeAttribute("data-hf-studio-original-rotation-transform-origin");
        touched = true;
      }
      if (touched) stripped++;
    }
  } catch {
  }
  return stripped;
}
function keyframesWritePosition(keyframes) {
  return keyframes.some(
    (kf) => Object.keys(kf.properties).some((k) => classifyPropertyGroup(k) === "position")
  );
}
function keyframesWriteRotation(keyframes) {
  return keyframes.some(
    (kf) => Object.keys(kf.properties).some((k) => classifyPropertyGroup(k) === "rotation")
  );
}
function lastKeyframeOpacity(kfs) {
  if (!kfs) return void 0;
  for (let i = kfs.keyframes.length - 1; i >= 0; i--) {
    if ("opacity" in kfs.keyframes[i].properties) return kfs.keyframes[i].properties.opacity;
  }
  return void 0;
}
function resolveFinalOpacity(anim) {
  if (anim.method === "from") return null;
  const raw = anim.keyframes ? lastKeyframeOpacity(anim.keyframes) : anim.properties.opacity;
  if (raw == null) return null;
  if (typeof raw === "string" && /^[+\-*]=/.test(raw)) return null;
  const num = Number(raw);
  return Number.isFinite(num) && num !== 0 ? num : null;
}
function bakeVisibilityOnDelete(document2, anim) {
  const opacity = resolveFinalOpacity(anim);
  if (opacity === null) return;
  try {
    for (const el of document2.querySelectorAll(anim.targetSelector)) {
      if (isHTMLElement(el)) el.style.setProperty("opacity", String(opacity));
    }
  } catch {
  }
}
var MOTION_PRESET_IDS = new Set(MOTION_PRESETS.map((preset) => preset.id));
function motionUnit(parameters) {
  const unit = parameters.unit;
  return unit === "word" || unit === "character" ? unit : "whole";
}
function segmentText(value, granularity) {
  const Segmenter = Intl.Segmenter;
  if (!Segmenter) return Array.from(value);
  return Array.from(
    new Segmenter(void 0, { granularity }).segment(value),
    (part) => part.segment
  );
}
function unwrapMotionText(target) {
  if (target.getAttribute("data-ipw-motion-split") !== "v1") return;
  const text3 = readMotionSourceText(target);
  target.replaceChildren(target.ownerDocument.createTextNode(text3));
  target.removeAttribute("data-ipw-motion-split");
  target.removeAttribute("data-ipw-motion-source");
}
function readMotionSourceText(target) {
  const encoded = target.getAttribute("data-ipw-motion-source");
  if (encoded !== null) {
    try {
      const source = JSON.parse(encoded);
      if (typeof source === "string") return source;
    } catch {
    }
  }
  return target.textContent ?? "";
}
function ensureMotionTextParts(target, includeCharacters) {
  const text3 = readMotionSourceText(target);
  unwrapMotionText(target);
  const document2 = target.ownerDocument;
  const fragment = document2.createDocumentFragment();
  let characterCount = 0;
  for (const word of segmentText(text3, "word")) {
    if (/^\s+$/u.test(word)) {
      fragment.append(document2.createTextNode(word));
      continue;
    }
    const wordSpan = document2.createElement("span");
    wordSpan.setAttribute("data-ipw-motion-word", "");
    wordSpan.setAttribute(
      "style",
      "display:inline-block;white-space:pre;font:inherit;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;-webkit-text-stroke:inherit"
    );
    if (includeCharacters) {
      for (const character of segmentText(word, "grapheme")) {
        const characterSpan = document2.createElement("span");
        characterSpan.setAttribute("data-ipw-motion-char", "");
        characterSpan.setAttribute("style", "display:inline-block");
        characterSpan.textContent = character;
        wordSpan.append(characterSpan);
        characterCount += 1;
      }
    } else {
      wordSpan.textContent = word;
    }
    fragment.append(wordSpan);
  }
  target.replaceChildren(fragment);
  target.setAttribute("data-ipw-motion-split", "v1");
  target.setAttribute("data-ipw-motion-source", JSON.stringify(text3));
  return characterCount;
}
function ensureStructuredCharacterParts(target) {
  let characterCount = 0;
  for (const textLayer of Array.from(target.querySelectorAll('[data-ipw-motion-role="text"]'))) {
    const document2 = textLayer.ownerDocument;
    const fragment = document2.createDocumentFragment();
    for (const character of segmentText(textLayer.textContent ?? "", "grapheme")) {
      const characterSpan = document2.createElement("span");
      characterSpan.setAttribute("data-ipw-motion-char", "");
      characterSpan.setAttribute("style", "display:inline-block");
      characterSpan.textContent = character;
      fragment.append(characterSpan);
      characterCount += 1;
    }
    textLayer.replaceChildren(fragment);
  }
  return characterCount;
}
function resolveSingleMotionTarget(document2, selector) {
  try {
    const matches = document2.querySelectorAll(selector);
    if (matches.length !== 1) {
      return {
        error: `Motion target must resolve to exactly one element; received ${matches.length}`
      };
    }
    return { target: matches[0] };
  } catch {
    return { error: "Motion target selector is invalid" };
  }
}
function isLeafTextMotionTarget(target) {
  for (const child of Array.from(target.children)) {
    if (!child.hasAttribute("data-ipw-motion-word")) return false;
  }
  return (target.textContent ?? "").trim().length > 0;
}
function motionInstanceTargetsElement(document2, target, instance) {
  const hfId = target.getAttribute("data-hf-id");
  if (hfId && instance.target.hfId === hfId) return true;
  const elementId = target.getAttribute("id");
  if (elementId && instance.target.elementId === elementId) return true;
  const resolved = resolveSingleMotionTarget(document2, instance.target.selector);
  return "target" in resolved && resolved.target === target;
}
function readOwnerTiming(target) {
  const owner = target.closest(
    ".clip, [data-start][data-duration], [data-composition-id][data-duration]"
  );
  const start = Number.parseFloat(owner?.getAttribute("data-start") ?? "0");
  const duration = Number.parseFloat(owner?.getAttribute("data-duration") ?? "1");
  return {
    start: Number.isFinite(start) && start >= 0 ? start : 0,
    duration: Number.isFinite(duration) && duration > 0 ? duration : 1,
    constrained: owner !== null && Number.isFinite(duration) && duration > 0 && owner.hasAttribute("data-duration")
  };
}
function defaultMotionStart(phase, owner, duration) {
  if (phase === "enter") return owner.start;
  if (phase === "exit") return Math.max(owner.start, owner.start + owner.duration - duration);
  return owner.start;
}
function resolveMotionTiming(phase, owner, requestedDuration, requestedStart) {
  const duration = owner.constrained ? Math.min(Math.max(0.1, requestedDuration), owner.duration) : Math.max(0.1, requestedDuration);
  const latestStart = owner.start + owner.duration - duration;
  const fallback = defaultMotionStart(phase, owner, duration);
  const start = requestedStart !== void 0 && Number.isFinite(requestedStart) && (!owner.constrained || requestedStart >= owner.start && requestedStart <= latestStart) ? requestedStart : fallback;
  return { start, duration };
}
function resolveMotionPlayback(owner, timing2, loop, requestedEnd) {
  const ownerEnd = owner.start + owner.duration;
  const defaultEnd = loop && owner.constrained ? ownerEnd : timing2.start + timing2.duration;
  const end = requestedEnd !== void 0 && Number.isFinite(requestedEnd) && requestedEnd > timing2.start && (!owner.constrained || requestedEnd <= ownerEnd) ? requestedEnd : defaultEnd;
  if (!loop) {
    return {
      duration: Math.round((end - timing2.start) * 1e3) / 1e3,
      end: Math.round(end * 1e3) / 1e3,
      repeat: 0
    };
  }
  const windowDuration = end - timing2.start;
  const cycleCount = Math.max(1, Math.round(windowDuration / timing2.duration));
  return {
    duration: Math.round(windowDuration / cycleCount * 1e3) / 1e3,
    end: Math.round(end * 1e3) / 1e3,
    repeat: cycleCount - 1
  };
}
function updateMotionReferenceAttribute(target, script) {
  const existing = (target.getAttribute("data-ipw-animation-reference") ?? "").split(/[\s,]+/).map((value) => value.trim()).filter((value) => value && !MOTION_PRESET_IDS.has(value));
  const semantic2 = parseGsapScriptAcorn(script).animations.map((animation) => readMotionInstanceFromExtras(animation.extras)).filter(
    (instance) => instance !== null && motionInstanceTargetsElement(target.ownerDocument, target, instance)
  ).map((instance) => instance.presetId);
  const values = Array.from(/* @__PURE__ */ new Set([...existing, ...semantic2]));
  if (values.length > 0) target.setAttribute("data-ipw-animation-reference", values.join(","));
  else target.removeAttribute("data-ipw-animation-reference");
}
function mergeStructuredTextLayers(structures) {
  const newest = structures.at(-1);
  const layers = [...newest.layers];
  const layerKeys = new Set(layers.map((layer) => `${layer.role}:${layer.perUnit}`));
  for (const structured of structures) {
    for (const layer of structured.layers) {
      const key = `${layer.role}:${layer.perUnit}`;
      if (layerKeys.has(key)) continue;
      layerKeys.add(key);
      layers.push(layer);
    }
  }
  const particleSource = [...structures].reverse().find((structured) => structured.particles);
  const assets = Array.from(new Set(structures.flatMap((structured) => structured.assets ?? [])));
  return {
    ...newest,
    layers,
    ...particleSource?.particles ? { particles: particleSource.particles } : {},
    ...assets.length > 0 ? { assets } : {}
  };
}
function materializeStructuredMotionText(target, structured, sourceText) {
  materializeStructuredText(target, structured, sourceText);
  target.setAttribute("data-ipw-motion-presentation", "text-v1");
  for (const layer of target.querySelectorAll(
    '[data-ipw-motion-role="text"], [data-ipw-motion-role="clone-primary"], [data-ipw-motion-role="clone-accent"]'
  )) {
    layer.style.fontWeight = "inherit";
    layer.style.lineHeight = "inherit";
    layer.style.letterSpacing = "inherit";
    layer.style.color = "inherit";
    layer.style.setProperty("-webkit-text-stroke", "inherit");
  }
}
function resolveMotionApplicationKind(requested, presetId) {
  if (requested === "general" || requested === "box" || requested === "text") return requested;
  return presetId.startsWith("text.") ? "text" : "general";
}
function shouldReplaceMotion(current, incomingKind, incomingPresetId, incomingTemplateId, incomingPhase) {
  if (incomingKind === "text" || current.applicationKind === "text") return true;
  if (incomingKind === "box") return current.applicationKind === "box";
  if (current.applicationKind !== "general") return false;
  if (incomingTemplateId && current.templateId) return incomingTemplateId === current.templateId;
  return current.presetId === incomingPresetId && current.phase === incomingPhase;
}
function executeMotionMutation(body, block, respond) {
  const resolved = resolveSingleMotionTarget(block.document, body.targetSelector);
  if ("error" in resolved) return respond({ error: resolved.error }, 400);
  const { target } = resolved;
  if (body.targetKind === "text" && !isLeafTextMotionTarget(target)) {
    return respond({ error: "Text motion requires one leaf text element" }, 400);
  }
  const parsed = parseGsapScriptAcorn(block.scriptText);
  const authoredPositionBase = readAuthoredMotionPositionBase(parsed.animations, body.targetSelector);
  const targetMotions = parsed.animations.flatMap((animation) => {
    const instance = readMotionInstanceFromExtras(animation.extras);
    return instance && motionInstanceTargetsElement(block.document, target, instance) ? [{ animation, instance }] : [];
  });
  const existing = targetMotions.filter(
    (entry) => entry.instance.phase === body.phase && (!body.applicationKind || entry.instance.applicationKind === body.applicationKind) && (!body.templateId || entry.instance.templateId === body.templateId)
  );
  let script = block.scriptText;
  if (body.operation === "upsert") {
    const preset = body.presetId ? getMotionPreset(body.presetId) : void 0;
    if (!preset) return respond({ error: "A valid presetId is required" }, 400);
    if (preset.phase !== body.phase || !preset.targetKinds.includes(body.targetKind)) {
      return respond({ error: "The preset does not support this target or phase" }, 400);
    }
    const applicationKind = resolveMotionApplicationKind(body.applicationKind, preset.id);
    const replaced = targetMotions.filter(
      ({ instance: instance2 }) => shouldReplaceMotion(instance2, applicationKind, preset.id, body.templateId, body.phase)
    );
    if (!motionSourceMatchesPreset(replaced.map((entry) => entry.animation), readMotionSourceText(target), authoredPositionBase)) {
      return respond({
        error: "\u8FD9\u4E2A\u52A8\u753B\u5DF2\u6709\u624B\u52A8\u5173\u952E\u5E27\u6216\u65F6\u5E8F\u8C03\u6574\uFF0C\u4FEE\u6539\u6A21\u677F\u53C2\u6570\u4F1A\u8986\u76D6\u8FD9\u4E9B\u7F16\u8F91\uFF0C\u5DF2\u4FDD\u7559\u539F\u52A8\u753B\u3002\u8BF7\u5728\u5C5E\u6027\u9762\u677F\u6216\u65F6\u95F4\u8F74\u4E2D\u7EE7\u7EED\u7F16\u8F91\u3002",
        code: "manual-motion-preserved"
      }, 409);
    }
    for (const entry of [...replaced].reverse()) {
      script = removeAnimationFromScript(script, entry.animation.id);
    }
    const prior = replaced.find((entry) => entry.instance.presetId === preset.id);
    const priorParameters = prior?.instance.presetId === preset.id ? prior.instance.parameters : Object.fromEntries(
      Object.entries(prior?.instance.parameters ?? {}).filter(
        ([key]) => preset.parameterSchema.some((parameter) => parameter.id === key)
      )
    );
    const owner = readOwnerTiming(target);
    const timing2 = resolveMotionTiming(
      preset.phase,
      owner,
      body.duration ?? prior?.instance.duration ?? defaultMotionDuration(preset),
      body.start ?? prior?.animation.resolvedStart
    );
    const parameters = { ...priorParameters, ...body.parameters };
    const loop = body.loop ?? prior?.instance.loop ?? false;
    const requestedEnd = body.end ?? (body.duration === void 0 || loop ? prior?.instance.end : void 0);
    const playback = resolveMotionPlayback(owner, timing2, loop, requestedEnd);
    let instance;
    try {
      instance = createMotionInstance({
        presetId: preset.id,
        templateId: body.templateId,
        target: {
          selector: body.targetSelector,
          ...body.elementId ? { elementId: body.elementId } : {},
          ...body.hfId ? { hfId: body.hfId } : {}
        },
        targetKind: body.targetKind,
        applicationKind,
        start: timing2.start,
        end: playback.end,
        duration: playback.duration,
        loop,
        repeat: playback.repeat,
        parameters
      });
    } catch (error) {
      return respond(
        { error: error instanceof Error ? error.message : "Invalid motion parameters" },
        400
      );
    }
    const sourceText2 = readMotionSourceText(target);
    const compiled = compileMotionInstance(instance, sourceText2);
    if (compiled.structured) {
      const targetSnapshot = snapshotStructuredText(target);
      unwrapMotionText(target);
      materializeStructuredMotionText(target, compiled.structured, sourceText2);
      for (const [trackIndex, track] of compiled.structured.tracks.entries()) {
        const targetCount = structuredTrackTargetCount(compiled.structured, track.role);
        const staggerSpan = track.stagger * Math.max(0, targetCount - 1);
        const added = addAnimationWithKeyframesToScript(
          script,
          structuredMotionSelector(body.targetSelector, track.role),
          compiled.position + track.position,
          track.duration,
          track.keyframes,
          void 0,
          void 0,
          {
            ...compiled.extras,
            id: `${instance.id}:${trackIndex}:${track.role}`,
            ...instance.loop && instance.repeat > 0 ? {
              // Repeat intervals are measured from each tween's own start,
              // so the track position cancels out. Subtracting it made
              // later tracks restart early and drift out of sync.
              repeatDelay: Number(
                Math.max(0, instance.duration - track.duration - staggerSpan).toFixed(12)
              )
            } : {},
            // Structured tracks own their stagger. Writing zero explicitly is
            // important because compiled.extras may contain the preset-level
            // stagger, which would otherwise leak into zero-stagger tracks.
            stagger: track.stagger
          }
        );
        if (!added.id) {
          restoreStructuredText(target, targetSnapshot);
          return respond({ error: "Could not add motion to the GSAP timeline" }, 400);
        }
        script = added.script;
      }
    } else {
      const keyframes = compiled.targetSelector === body.targetSelector ? rebaseCompiledMotionKeyframes(compiled.keyframes, authoredPositionBase) : compiled.keyframes;
      const added = addAnimationWithKeyframesToScript(
        script,
        compiled.targetSelector,
        compiled.position,
        compiled.duration,
        keyframes,
        compiled.ease,
        void 0,
        compiled.extras
      );
      if (!added.id) return respond({ error: "Could not add motion to the GSAP timeline" }, 400);
      script = added.script;
    }
  } else {
    for (const entry of [...existing].reverse()) {
      script = removeAnimationFromScript(script, entry.animation.id);
    }
  }
  const remainingInstances = parseGsapScriptAcorn(script).animations.map((animation) => readMotionInstanceFromExtras(animation.extras)).filter(
    (instance) => instance !== null && motionInstanceTargetsElement(block.document, target, instance)
  );
  const sourceText = readMotionSourceText(target);
  const remainingStructured = remainingInstances.flatMap((instance) => {
    try {
      const structured = compileMotionInstance(instance, sourceText).structured;
      return structured ? [structured] : [];
    } catch {
      return [];
    }
  });
  if (remainingStructured.length > 0) {
    materializeStructuredMotionText(
      target,
      mergeStructuredTextLayers(remainingStructured),
      sourceText
    );
    if (remainingInstances.some((instance) => motionUnit(instance.parameters) === "character")) {
      ensureStructuredCharacterParts(target);
    }
  } else {
    if (target.hasAttribute("data-ipw-motion-structure")) {
      unwrapStructuredText(target);
      target.removeAttribute("data-ipw-motion-presentation");
    }
    if (remainingInstances.some((instance) => motionUnit(instance.parameters) !== "whole")) {
      ensureMotionTextParts(
        target,
        remainingInstances.some((instance) => motionUnit(instance.parameters) === "character")
      );
    } else {
      unwrapMotionText(target);
    }
  }
  if (remainingInstances.length > 0) {
    target.setAttribute("data-ipw-motion-selector", body.targetSelector);
  } else {
    target.removeAttribute("data-ipw-motion-selector");
  }
  updateMotionReferenceAttribute(target, script);
  return script;
}
function replaceInPlaceUnlessSetOrUnknown(scriptText, body) {
  const edit = { ...body, easeEach: resolveReplacementEaseEach(scriptText, body) };
  const inPlace = replaceTweenWithKeyframesInScript(scriptText, body.animationId, edit);
  if (inPlace !== null) return inPlace;
  const script = removeAnimationFromScript(scriptText, body.animationId);
  return addAnimationWithKeyframesToScript(
    script,
    body.targetSelector,
    body.position,
    body.duration,
    body.keyframes,
    body.ease,
    edit.easeEach
  ).script;
}
function resolveReplacementEaseEach(scriptText, request) {
  if (request.easeEach !== void 0) return request.easeEach;
  const original = parseGsapScriptAcorn(scriptText).animations.find(
    (animation) => animation.id === request.animationId
  );
  if (!original?.arcPath?.enabled) return void 0;
  return original?.keyframes?.easeEach ?? original?.ease;
}
var HOLD_SYNC_MUTATION_TYPES = /* @__PURE__ */ new Set([
  "mutate-motion",
  "isolate-selector-target",
  "add-keyframe",
  "update-keyframe",
  "remove-keyframe",
  "move-keyframe",
  "edit-property-keyframe",
  "resize-keyframed-tween",
  "remove-all-keyframes",
  "add-with-keyframes",
  "replace-with-keyframes",
  "offset-position-paths",
  "convert-to-keyframes",
  "materialize-keyframes",
  "update-motion-path-point",
  "add-motion-path-point",
  "remove-motion-path-point",
  // Authors a fresh motionPath tween whose parsed first keyframe is (0,0); if it lands
  // at position > 0 the element snaps home at t=0 without a pre-tween hold-`set`.
  "add-motion-path",
  // Can move a tween's `position` (start) across the t=0 boundary, which flips whether a
  // keyframed position tween needs a hold (started at 0 → moved later, or vice versa).
  "update-meta",
  // Time-shift / time-scale tweens, which can move a keyframed position tween's start
  // across t=0, flipping hold need; stale holds are not repositioned by these ops.
  "shift-positions",
  "shift-positions-batch",
  "scale-positions",
  // Retargets keyframed position tweens to a cloned element's selector; the old hold is
  // keyed to the prior selector, so holds must be rebuilt for the new target.
  "split-animations",
  "delete",
  "delete-all-for-selector"
]);
async function executeGsapMutation(body, block, respond, writer) {
  if (body.type === "mutate-motion") {
    return executeMotionMutation(body, block, respond);
  }
  if (body.type === "offset-position-paths") {
    const parser = await loadGsapParser();
    return parser.offsetPositionPathsInScript(
      block.scriptText,
      body.targetSelector,
      body.deltaX,
      body.deltaY,
      body.ownedSelectors
    );
  }
  if (body.type === "isolate-selector-target") {
    return isolateAnimationsForTargetInScript(
      block.scriptText,
      body.targetSelector,
      body.selectedSelector,
      body.remainderSelector
    );
  }
  if (writer === "recast") {
    return executeGsapMutationRecast(body, block, respond);
  }
  return executeGsapMutationAcorn(body, block, respond);
}
function validateGsapMutationRequest(c, body) {
  if (!body || typeof body !== "object" || !("type" in body) || !body.type) {
    return c.json({ error: "mutation type required" }, 400);
  }
  if (containsRawGsapExpression(body)) {
    return c.json({ error: "raw JavaScript expressions are not accepted" }, 400);
  }
  const unsafeFields = findUnsafeMutationValues(body);
  if (unsafeFields.length > 0) return rejectUnsafeMutationValues(c, unsafeFields);
  if (body.type === "shift-positions-batch" && (!("shifts" in body) || !Array.isArray(body.shifts))) {
    return c.json({ error: "shift-positions-batch requires a `shifts` array" }, 400);
  }
  return null;
}
function containsRawGsapExpression(value) {
  if (typeof value === "string") return value.startsWith("__raw:");
  if (Array.isArray(value)) return value.some(containsRawGsapExpression);
  if (!value || typeof value !== "object") return false;
  return Object.values(value).some(containsRawGsapExpression);
}
async function prepareGsapMutationScript(c, res, firstMutation) {
  const beforeHtml = readFileSync6(res.absPath, "utf-8");
  let html = beforeHtml;
  let block = extractGsapScriptBlock(html);
  if (!block && (firstMutation.type === "add" || firstMutation.type === "add-with-keyframes" || firstMutation.type === "mutate-motion")) {
    const compId = html.match(/data-composition-id="([^"]+)"/)?.[1] ?? "main";
    const { GSAP_CDN } = await import("./src-S2KSXXAR.js");
    const bootstrap = [
      `<script src="${GSAP_CDN}"></script>`,
      "<script>",
      "window.__timelines = window.__timelines || {};",
      "const tl = gsap.timeline({ paused: true });",
      `window.__timelines["${compId}"] = tl;`,
      "</script>"
    ].join("\n");
    const [first, second] = hasCompositionOutsideTemplates(html) ? ["body", "template"] : ["template", "body"];
    html = insertBeforeCloseTag(html, first, `${bootstrap}
`) ?? insertBeforeCloseTag(html, second, `${bootstrap}
`) ?? `${html}
${bootstrap}`;
    block = extractGsapScriptBlock(html);
  }
  if (!block && (firstMutation.type === "shift-positions" || firstMutation.type === "scale-positions" || firstMutation.type === "shift-positions-batch")) {
    return c.json({
      ok: true,
      changed: false,
      mutated: false,
      parsed: { animations: [], timelineVar: "tl", preamble: "", postamble: "" },
      before: html,
      after: html,
      scriptText: "",
      path: res.filePath,
      backupPath: null
    });
  }
  if (!block) return c.json({ error: "no GSAP script found in file" }, 400);
  return { html, beforeHtml, block };
}
function retimeRuns(mutations) {
  const runs = /* @__PURE__ */ new Map();
  let start = -1;
  mutations.forEach((mutation, index) => {
    const retime = clipRetimeOf(mutation);
    if (!retime) return void (start = -1);
    if (start < 0) runs.set(start = index, []);
    runs.get(start).push(retime);
  });
  return runs;
}
function clipRetimeOf(mutation) {
  if (mutation.type === "shift-positions") {
    const { targetSelector: targetSelector2, delta } = mutation;
    return targetSelector2 && Number.isFinite(delta) && delta !== 0 ? { kind: "shift", targetSelector: targetSelector2, delta } : "no-op";
  }
  if (mutation.type !== "scale-positions") return null;
  const { targetSelector, oldStart, oldDuration, newStart, newDuration } = mutation;
  const finite2 = [oldStart, oldDuration, newStart, newDuration].every(Number.isFinite);
  if (!targetSelector || !finite2 || oldDuration <= 0 || newDuration <= 0) return "no-op";
  if (oldStart === newStart && oldDuration === newDuration) return "no-op";
  return { kind: "scale", targetSelector, oldStart, oldDuration, newStart, newDuration };
}
function retimeRun(script, run, root) {
  const live = run.filter((slot) => slot !== "no-op");
  const retimed = retimeClipTweensInScript(script, live, root);
  const synced = syncPositionHoldsBeforeKeyframes(retimed.script, script);
  let next = 0;
  const changed = run.map((slot) => slot !== "no-op" && retimed.changed[next++]);
  if (synced !== retimed.script) changed[changed.length - 1] = true;
  return { script: synced, changed: synced === script ? changed.map(() => false) : changed };
}
async function applyGsapMutations(c, res, mutations) {
  const firstMutation = mutations[0];
  if (!firstMutation) return c.json({ error: "mutations array required" }, 400);
  const prepared = await prepareGsapMutationScript(c, res, firstMutation);
  if (prepared instanceof Response) return prepared;
  const { html, beforeHtml, block } = prepared;
  let lengthIsAuthored;
  const initialScript = block.scriptText;
  const skippedSelectors = /* @__PURE__ */ new Set();
  const respond = (data, status) => status ? c.json(data, status) : c.json(data);
  let writer;
  try {
    writer = resolveGsapWriter({
      HYPERFRAMES_GSAP_WRITER: process.env["HYPERFRAMES_GSAP_WRITER"]
    });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 400);
  }
  const mutationChanges = [];
  const retimes = writer === "acorn" ? retimeRuns(mutations) : /* @__PURE__ */ new Map();
  for (let index = 0; index < mutations.length; index++) {
    const run = retimes.get(index);
    if (run) {
      const retimed = retimeRun(block.scriptText, run, block.root);
      mutationChanges.push(...retimed.changed);
      block.scriptText = retimed.script;
      index += run.length - 1;
      continue;
    }
    const mutation = mutations[index];
    const previousScript = block.scriptText;
    const result = await executeGsapMutation(mutation, block, respond, writer);
    if (result instanceof Response) return result;
    let newScript = typeof result === "string" ? result : result.script;
    if (typeof result !== "string") {
      for (const selector of result.skippedSelectors) skippedSelectors.add(selector);
    }
    if (HOLD_SYNC_MUTATION_TYPES.has(mutation.type)) {
      lengthIsAuthored ??= !lengthIsTimeline(res.project.dir, res.filePath);
      if (lengthIsAuthored) newScript = trimTrailingKeyframeSpans(previousScript, newScript);
      newScript = writer === "acorn" ? syncPositionHoldsBeforeKeyframes(newScript, previousScript) : (await loadGsapParser()).syncPositionHoldsBeforeKeyframes(newScript, previousScript);
    }
    mutationChanges.push(newScript !== previousScript);
    block.scriptText = newScript;
  }
  const changed = block.scriptText !== initialScript;
  const newHtml = changed ? block.replaceScript(block.scriptText) : html;
  let backupPath = null;
  if (readFileSync6(res.absPath, "utf-8") !== beforeHtml) {
    return c.json({ error: "file changed during GSAP mutation", conflict: true }, 409);
  }
  if (changed) {
    const mutationResult = writeMutationResult(
      c,
      res.project.dir,
      res.filePath,
      res.absPath,
      newHtml,
      beforeHtml
    );
    if (mutationResult instanceof Response) return mutationResult;
    backupPath = mutationResult.backupPath;
  }
  const responsePayload = {
    ok: true,
    changed,
    mutated: changed,
    mutationChanges,
    parsed: parseGsapScriptAcorn(block.scriptText),
    before: beforeHtml,
    after: newHtml,
    scriptText: block.scriptText,
    path: res.filePath,
    version: fileContentVersion(newHtml),
    backupPath
  };
  if (skippedSelectors.size > 0) responsePayload.skippedSelectors = [...skippedSelectors];
  c.header("ETag", responsePayload.version);
  return c.json(responsePayload);
}
function executeGsapMutationAcorn(body, block, respond) {
  function requireAnimation(scriptText, animationId) {
    const parsed = parseGsapScriptAcorn(scriptText);
    const anim = parsed.animations.find((a) => a.id === animationId);
    if (!anim) return { err: respond({ error: "animation not found" }, 404) };
    return { anim };
  }
  function requireFromToAnimation(scriptText, animationId) {
    const result = requireAnimation(scriptText, animationId);
    if ("err" in result) return result;
    if (result.anim.method !== "fromTo")
      return { err: respond({ error: "animation is not a fromTo" }, 400) };
    return result;
  }
  switch (body.type) {
    case "update-property":
    case "add-property": {
      const r = requireAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const val = body.type === "update-property" ? body.value : body.defaultValue;
      return updateAnimationInScript(block.scriptText, body.animationId, {
        properties: { ...r.anim.properties, [body.property]: val }
      });
    }
    case "update-properties": {
      const r = requireAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      return updateAnimationInScript(block.scriptText, body.animationId, {
        properties: { ...r.anim.properties, ...body.properties }
      });
    }
    case "update-from-property":
    case "add-from-property": {
      const r = requireFromToAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const val = body.type === "update-from-property" ? body.value : body.defaultValue;
      return updateAnimationInScript(block.scriptText, body.animationId, {
        fromProperties: { ...r.anim.fromProperties ?? {}, [body.property]: val }
      });
    }
    case "update-meta": {
      return updateAnimationInScript(block.scriptText, body.animationId, body.updates);
    }
    case "add": {
      if (body.fromProperties && body.method !== "fromTo") {
        return respond({ error: "fromProperties is only valid for method=fromTo" }, 400);
      }
      if (Object.keys(body.properties).some((key) => {
        const group = classifyPropertyGroup(key);
        return group === "position" || group === "rotation";
      })) {
        stripStudioEditsFromTarget(block.document, body.targetSelector);
      }
      const result = addAnimationToScript(block.scriptText, {
        targetSelector: body.targetSelector,
        method: body.method,
        position: body.position,
        duration: body.duration,
        ease: body.ease,
        properties: body.properties,
        fromProperties: body.fromProperties,
        ...body.global ? { global: true } : {}
      });
      return result.script;
    }
    case "delete": {
      const delTarget = requireAnimation(block.scriptText, body.animationId);
      if (!("err" in delTarget) && body.stripStudioEdits) {
        stripStudioEditsFromTarget(block.document, delTarget.anim.targetSelector);
        bakeVisibilityOnDelete(block.document, delTarget.anim);
      }
      return removeAnimationFromScript(block.scriptText, body.animationId);
    }
    case "delete-all-for-selector": {
      const parsed = parseGsapScriptAcorn(block.scriptText);
      const matching = parsed.animations.filter((a) => a.targetSelector === body.targetSelector);
      if (matching.length === 0) return block.scriptText;
      stripStudioEditsFromTarget(block.document, body.targetSelector);
      let script = block.scriptText;
      for (const anim of matching.reverse()) {
        script = removeAnimationFromScript(script, anim.id);
      }
      return script;
    }
    case "consolidate-position-writes": {
      if (!body.targetSelector) return block.scriptText;
      return dedupePositionWritesInScript(
        block.scriptText,
        body.targetSelector,
        body.keepAnimationId
      );
    }
    case "remove-property": {
      const r = requireAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const filtered = { ...r.anim.properties };
      delete filtered[body.property];
      return updateAnimationInScript(block.scriptText, body.animationId, {
        properties: filtered
      });
    }
    case "remove-from-property": {
      const r = requireFromToAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const filtered = { ...r.anim.fromProperties ?? {} };
      delete filtered[body.property];
      return updateAnimationInScript(block.scriptText, body.animationId, {
        fromProperties: filtered
      });
    }
    case "add-keyframe": {
      return addKeyframeToScript(
        block.scriptText,
        body.animationId,
        body.percentage,
        body.properties,
        body.ease,
        body.backfillDefaults
      );
    }
    case "remove-keyframe": {
      return removeKeyframeFromScript(block.scriptText, body.animationId, body.percentage);
    }
    case "edit-property-keyframe": {
      return editPropertyKeyframeInScript(block.scriptText, body.animationId, body.property, body.percentage, body.edit);
    }
    case "move-keyframe": {
      return moveKeyframeInScript(
        block.scriptText,
        body.animationId,
        body.fromPercentage,
        body.toPercentage
      );
    }
    case "resize-keyframed-tween": {
      return resizeKeyframedTweenInScript(
        block.scriptText,
        body.animationId,
        body.position,
        body.duration,
        body.pctRemap
      );
    }
    case "update-keyframe": {
      return updateKeyframeInScript(
        block.scriptText,
        body.animationId,
        body.percentage,
        body.properties,
        body.ease
      );
    }
    case "convert-to-keyframes": {
      return convertToKeyframesFromScript(
        block.scriptText,
        body.animationId,
        body.resolvedFromValues,
        body.duration
      );
    }
    case "remove-all-keyframes": {
      const preCollapse = requireAnimation(block.scriptText, body.animationId);
      if (!("err" in preCollapse)) {
        bakeVisibilityOnDelete(block.document, preCollapse.anim);
      }
      return removeAllKeyframesFromScript(block.scriptText, body.animationId);
    }
    case "materialize-keyframes": {
      if (body.allElements && body.allElements.length > 0) {
        return unrollDynamicAnimations(block.scriptText, body.animationId, body.allElements);
      }
      return materializeKeyframesFromScript(
        block.scriptText,
        body.animationId,
        body.keyframes,
        body.easeEach,
        body.resolvedSelector
      );
    }
    case "set-arc-path": {
      return setArcPathInScript(block.scriptText, body.animationId, {
        enabled: body.enabled,
        autoRotate: body.autoRotate ?? false,
        segments: body.segments ?? []
      });
    }
    case "update-arc-segment": {
      return updateArcSegmentInScript(block.scriptText, body.animationId, body.segmentIndex, {
        ...body.curviness !== void 0 ? { curviness: body.curviness } : {},
        ...body.cp1 ? { cp1: body.cp1 } : {},
        ...body.cp2 ? { cp2: body.cp2 } : {}
      });
    }
    case "update-motion-path-point": {
      return updateMotionPathPointInScript(block.scriptText, body.animationId, body.pointIndex, {
        x: body.x,
        y: body.y
      });
    }
    case "add-motion-path-point": {
      return addMotionPathPointInScript(block.scriptText, body.animationId, body.index, {
        x: body.x,
        y: body.y
      });
    }
    case "remove-motion-path-point": {
      return removeMotionPathPointInScript(block.scriptText, body.animationId, body.index);
    }
    case "add-motion-path": {
      return addMotionPathToScript(
        block.scriptText,
        body.targetSelector,
        body.position,
        body.duration,
        { x: body.x, y: body.y },
        body.ease
      ).script;
    }
    case "remove-arc-path": {
      return removeArcPathFromScript(block.scriptText, body.animationId);
    }
    case "add-with-keyframes": {
      if (keyframesWritePosition(body.keyframes) || keyframesWriteRotation(body.keyframes)) {
        stripStudioEditsFromTarget(block.document, body.targetSelector);
      }
      const result = addAnimationWithKeyframesToScript(
        block.scriptText,
        body.targetSelector,
        body.position,
        body.duration,
        body.keyframes,
        body.ease,
        body.easeEach,
        body.origin === "manual" ? { data: "hf-manual-keyframes" } : void 0
      );
      return result.script;
    }
    case "replace-with-keyframes": {
      if (keyframesWritePosition(body.keyframes) || keyframesWriteRotation(body.keyframes)) {
        stripStudioEditsFromTarget(block.document, body.targetSelector);
      }
      return replaceInPlaceUnlessSetOrUnknown(block.scriptText, body);
    }
    case "split-animations": {
      if (typeof body.originalId !== "string" || !body.originalId || typeof body.newId !== "string" || !body.newId || typeof body.splitTime !== "number" || !Number.isFinite(body.splitTime) || typeof body.elementStart !== "number" || !Number.isFinite(body.elementStart) || typeof body.elementDuration !== "number" || !Number.isFinite(body.elementDuration) || body.elementDuration <= 0) {
        return respond(
          {
            error: "split-animations requires originalId, newId (non-empty strings), splitTime, elementStart (finite numbers), and elementDuration (positive number)"
          },
          400
        );
      }
      return splitAnimationsInScript(block.scriptText, {
        originalId: body.originalId,
        newId: body.newId,
        splitTime: body.splitTime,
        elementStart: body.elementStart,
        elementDuration: body.elementDuration
      });
    }
    case "split-into-property-groups": {
      const result = splitIntoPropertyGroupsFromScript(block.scriptText, body.animationId);
      return result.script;
    }
    case "unroll-timeline": {
      return unrollComputedTimeline(block.scriptText);
    }
    case "shift-positions-batch": {
      const shifts = body.shifts.filter((s) => s.targetSelector && Number.isFinite(s.delta) && s.delta !== 0).map((s) => ({ kind: "shift", targetSelector: s.targetSelector, delta: s.delta }));
      return retimeClipTweensInScript(block.scriptText, shifts, block.root).script;
    }
    case "shift-positions":
    case "scale-positions": {
      const retime = clipRetimeOf(body);
      return retime && retime !== "no-op" ? retimeClipTweensInScript(block.scriptText, [retime], block.root).script : block.scriptText;
    }
    default:
      return respond({ error: `unknown mutation type: ${body.type}` }, 400);
  }
}
async function executeGsapMutationRecast(body, block, respond) {
  const parser = await loadGsapParser();
  const {
    updateAnimationInScript: updateAnimationInScript2,
    addAnimationToScript: addAnimationToScript2,
    removeAnimationFromScript: removeAnimationFromScript2,
    addKeyframeToScript: addKeyframeToScript2,
    removeKeyframeFromScript: removeKeyframeFromScript2,
    moveKeyframeInScript: moveKeyframeInScript2,
    resizeKeyframedTweenInScript: resizeKeyframedTweenInScript2,
    updateKeyframeInScript: updateKeyframeInScript2,
    convertToKeyframesInScript,
    removeAllKeyframesFromScript: removeAllKeyframesFromScript2,
    materializeKeyframesInScript,
    unrollDynamicAnimations: unrollDynamicAnimations2,
    setArcPathInScript: setArcPathInScript2,
    updateArcSegmentInScript: updateArcSegmentInScript2,
    updateMotionPathPointInScript: updateMotionPathPointInScript2,
    addMotionPathPointInScript: addMotionPathPointInScript2,
    removeMotionPathPointInScript: removeMotionPathPointInScript2,
    addMotionPathToScript: addMotionPathToScript2,
    removeArcPathFromScript: removeArcPathFromScript2,
    addAnimationWithKeyframesToScript: addAnimationWithKeyframesToScript2,
    splitAnimationsInScript: splitAnimationsInScript2,
    splitIntoPropertyGroups,
    dedupePositionWritesInScript: dedupePositionWritesInScript2
  } = parser;
  function requireAnimation(scriptText, animationId) {
    const parsed = parseGsapScriptAcorn(scriptText);
    const anim = parsed.animations.find((a) => a.id === animationId);
    if (!anim) return { err: respond({ error: "animation not found" }, 404) };
    return { anim };
  }
  function requireFromToAnimation(scriptText, animationId) {
    const result = requireAnimation(scriptText, animationId);
    if ("err" in result) return result;
    if (result.anim.method !== "fromTo")
      return { err: respond({ error: "animation is not a fromTo" }, 400) };
    return result;
  }
  switch (body.type) {
    case "update-property":
    case "add-property": {
      const r = requireAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const val = body.type === "update-property" ? body.value : body.defaultValue;
      return updateAnimationInScript2(block.scriptText, body.animationId, {
        properties: { ...r.anim.properties, [body.property]: val }
      });
    }
    case "update-properties": {
      const r = requireAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      return updateAnimationInScript2(block.scriptText, body.animationId, {
        properties: { ...r.anim.properties, ...body.properties }
      });
    }
    case "update-from-property":
    case "add-from-property": {
      const r = requireFromToAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const val = body.type === "update-from-property" ? body.value : body.defaultValue;
      return updateAnimationInScript2(block.scriptText, body.animationId, {
        fromProperties: { ...r.anim.fromProperties ?? {}, [body.property]: val }
      });
    }
    case "update-meta": {
      return updateAnimationInScript2(block.scriptText, body.animationId, body.updates);
    }
    case "add": {
      if (body.fromProperties && body.method !== "fromTo") {
        return respond({ error: "fromProperties is only valid for method=fromTo" }, 400);
      }
      if (Object.keys(body.properties).some((k) => {
        const group = classifyPropertyGroup(k);
        return group === "position" || group === "rotation";
      })) {
        stripStudioEditsFromTarget(block.document, body.targetSelector);
      }
      const result = addAnimationToScript2(block.scriptText, {
        targetSelector: body.targetSelector,
        method: body.method,
        position: body.position,
        duration: body.duration,
        ease: body.ease,
        properties: body.properties,
        fromProperties: body.fromProperties,
        ...body.global ? { global: true } : {}
      });
      return result.script;
    }
    case "delete": {
      const delTarget = requireAnimation(block.scriptText, body.animationId);
      if (!("err" in delTarget) && body.stripStudioEdits) {
        stripStudioEditsFromTarget(block.document, delTarget.anim.targetSelector);
        bakeVisibilityOnDelete(block.document, delTarget.anim);
      }
      return removeAnimationFromScript2(block.scriptText, body.animationId);
    }
    case "delete-all-for-selector": {
      const parsed = parseGsapScriptAcorn(block.scriptText);
      const matching = parsed.animations.filter((a) => a.targetSelector === body.targetSelector);
      if (matching.length === 0) return block.scriptText;
      stripStudioEditsFromTarget(block.document, body.targetSelector);
      let script = block.scriptText;
      for (const anim of matching.reverse()) {
        script = removeAnimationFromScript2(script, anim.id);
      }
      return script;
    }
    case "consolidate-position-writes": {
      if (!body.targetSelector) return block.scriptText;
      return dedupePositionWritesInScript2(
        block.scriptText,
        body.targetSelector,
        body.keepAnimationId
      );
    }
    case "remove-property": {
      const r = requireAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const filtered = { ...r.anim.properties };
      delete filtered[body.property];
      return updateAnimationInScript2(block.scriptText, body.animationId, {
        properties: filtered
      });
    }
    case "remove-from-property": {
      const r = requireFromToAnimation(block.scriptText, body.animationId);
      if ("err" in r) return r.err;
      const filtered = { ...r.anim.fromProperties ?? {} };
      delete filtered[body.property];
      return updateAnimationInScript2(block.scriptText, body.animationId, {
        fromProperties: filtered
      });
    }
    case "add-keyframe": {
      return addKeyframeToScript2(
        block.scriptText,
        body.animationId,
        body.percentage,
        body.properties,
        body.ease,
        body.backfillDefaults
      );
    }
    case "remove-keyframe": {
      return removeKeyframeFromScript2(block.scriptText, body.animationId, body.percentage);
    }
    case "edit-property-keyframe": {
      return editPropertyKeyframeInScript(block.scriptText, body.animationId, body.property, body.percentage, body.edit);
    }
    case "move-keyframe": {
      return moveKeyframeInScript2(
        block.scriptText,
        body.animationId,
        body.fromPercentage,
        body.toPercentage
      );
    }
    case "resize-keyframed-tween": {
      return resizeKeyframedTweenInScript2(
        block.scriptText,
        body.animationId,
        body.position,
        body.duration,
        body.pctRemap
      );
    }
    case "update-keyframe": {
      return updateKeyframeInScript2(
        block.scriptText,
        body.animationId,
        body.percentage,
        body.properties,
        body.ease
      );
    }
    case "convert-to-keyframes": {
      return convertToKeyframesInScript(
        block.scriptText,
        body.animationId,
        body.resolvedFromValues,
        body.duration
      );
    }
    case "remove-all-keyframes": {
      const preCollapse = requireAnimation(block.scriptText, body.animationId);
      if (!("err" in preCollapse)) {
        bakeVisibilityOnDelete(block.document, preCollapse.anim);
      }
      return removeAllKeyframesFromScript2(block.scriptText, body.animationId);
    }
    case "materialize-keyframes": {
      if (body.allElements && body.allElements.length > 0) {
        return unrollDynamicAnimations2(block.scriptText, body.animationId, body.allElements);
      }
      return materializeKeyframesInScript(
        block.scriptText,
        body.animationId,
        body.keyframes,
        body.easeEach,
        body.resolvedSelector
      );
    }
    case "set-arc-path": {
      return setArcPathInScript2(block.scriptText, body.animationId, {
        enabled: body.enabled,
        autoRotate: body.autoRotate ?? false,
        segments: body.segments ?? []
      });
    }
    case "update-arc-segment": {
      return updateArcSegmentInScript2(block.scriptText, body.animationId, body.segmentIndex, {
        ...body.curviness !== void 0 ? { curviness: body.curviness } : {},
        ...body.cp1 ? { cp1: body.cp1 } : {},
        ...body.cp2 ? { cp2: body.cp2 } : {}
      });
    }
    case "update-motion-path-point": {
      return updateMotionPathPointInScript2(block.scriptText, body.animationId, body.pointIndex, {
        x: body.x,
        y: body.y
      });
    }
    case "add-motion-path-point": {
      return addMotionPathPointInScript2(block.scriptText, body.animationId, body.index, {
        x: body.x,
        y: body.y
      });
    }
    case "remove-motion-path-point": {
      return removeMotionPathPointInScript2(block.scriptText, body.animationId, body.index);
    }
    case "add-motion-path": {
      const result = addMotionPathToScript2(
        block.scriptText,
        body.targetSelector,
        body.position,
        body.duration,
        { x: body.x, y: body.y },
        body.ease
      );
      return result.script;
    }
    case "remove-arc-path": {
      return removeArcPathFromScript2(block.scriptText, body.animationId);
    }
    case "add-with-keyframes": {
      if (keyframesWritePosition(body.keyframes) || keyframesWriteRotation(body.keyframes)) {
        stripStudioEditsFromTarget(block.document, body.targetSelector);
      }
      const result = addAnimationWithKeyframesToScript2(
        block.scriptText,
        body.targetSelector,
        body.position,
        body.duration,
        body.keyframes,
        body.ease,
        body.easeEach,
        body.origin === "manual" ? { data: "hf-manual-keyframes" } : void 0
      );
      return result.script;
    }
    case "replace-with-keyframes": {
      if (keyframesWritePosition(body.keyframes) || keyframesWriteRotation(body.keyframes)) {
        stripStudioEditsFromTarget(block.document, body.targetSelector);
      }
      return replaceInPlaceUnlessSetOrUnknown(block.scriptText, body);
    }
    case "split-animations": {
      if (typeof body.originalId !== "string" || !body.originalId || typeof body.newId !== "string" || !body.newId || typeof body.splitTime !== "number" || !Number.isFinite(body.splitTime) || typeof body.elementStart !== "number" || !Number.isFinite(body.elementStart) || typeof body.elementDuration !== "number" || !Number.isFinite(body.elementDuration) || body.elementDuration <= 0) {
        return respond(
          {
            error: "split-animations requires originalId, newId (non-empty strings), splitTime, elementStart (finite numbers), and elementDuration (positive number)"
          },
          400
        );
      }
      return splitAnimationsInScript2(block.scriptText, {
        originalId: body.originalId,
        newId: body.newId,
        splitTime: body.splitTime,
        elementStart: body.elementStart,
        elementDuration: body.elementDuration
      });
    }
    case "split-into-property-groups": {
      const result = splitIntoPropertyGroups(block.scriptText, body.animationId);
      return result.script;
    }
    case "unroll-timeline": {
      return unrollComputedTimeline(block.scriptText);
    }
    case "shift-positions": {
      const { targetSelector, delta } = body;
      if (!targetSelector || !Number.isFinite(delta) || delta === 0) return block.scriptText;
      const { shiftPositionsInScript } = parser;
      return shiftPositionsInScript(block.scriptText, targetSelector, delta, block.root);
    }
    case "shift-positions-batch": {
      const { shiftPositionsInScript } = parser;
      let script = block.scriptText;
      for (const s of body.shifts) {
        if (!s.targetSelector || !Number.isFinite(s.delta) || s.delta === 0) continue;
        script = shiftPositionsInScript(script, s.targetSelector, s.delta, block.root);
      }
      return script;
    }
    case "scale-positions": {
      const { targetSelector, oldStart, oldDuration, newStart, newDuration } = body;
      if (!targetSelector || !Number.isFinite(oldStart) || !Number.isFinite(oldDuration) || !Number.isFinite(newStart) || !Number.isFinite(newDuration) || oldDuration <= 0 || newDuration <= 0)
        return block.scriptText;
      if (oldStart === newStart && oldDuration === newDuration) return block.scriptText;
      const { scalePositionsInScript } = parser;
      return scalePositionsInScript(
        block.scriptText,
        targetSelector,
        oldStart,
        oldDuration,
        newStart,
        newDuration,
        block.root
      );
    }
    default:
      return respond({ error: `unknown mutation type: ${body.type}` }, 400);
  }
}
async function foldAtomicCutFile(c, file, absPath, before, writer) {
  let after = before;
  let splitCount = 0;
  const skippedSelectors = /* @__PURE__ */ new Set();
  const rightHalfIds = [];
  const respond = (data, status) => status ? c.json(data, status) : c.json(data);
  const orderedTargets = file.targets.map((cut, index) => ({ cut, index })).sort((left, right) => {
    const locatorKey = (entry) => !entry.target.id && !entry.target.hfId && entry.target.selector ? entry.target.selector : null;
    const leftKey = locatorKey(left.cut);
    const rightKey = locatorKey(right.cut);
    if (leftKey && rightKey) {
      return leftKey.localeCompare(rightKey) || (right.cut.target.selectorIndex ?? 0) - (left.cut.target.selectorIndex ?? 0);
    }
    if (leftKey) return -1;
    if (rightKey) return 1;
    return left.index - right.index;
  }).map(({ cut }) => cut);
  for (const cut of orderedTargets) {
    const baseId = cut.originalId || cut.target.id || "clip";
    const split3 = splitElementInHtml(after, cut.target, cut.splitTime, `${baseId}-split`, {
      start: cut.elementStart,
      duration: cut.elementDuration,
      playbackStart: cut.playbackStart,
      playbackRate: cut.playbackRate,
      stampPlaybackStart: cut.isComposition,
      track: cut.track
    });
    if (!split3.matched || !split3.newId) {
      return c.json(
        { error: `Cut target was not found or was outside its authored bounds in ${file.path}` },
        400
      );
    }
    after = split3.html;
    splitCount++;
    rightHalfIds.push(split3.newId);
    if (!cut.originalId) continue;
    const block = extractGsapScriptBlock(after);
    if (!block) continue;
    const result = await executeGsapMutation(
      {
        type: "split-animations",
        originalId: cut.originalId,
        newId: split3.newId,
        splitTime: cut.splitTime,
        elementStart: cut.elementStart,
        elementDuration: cut.elementDuration
      },
      block,
      respond,
      writer
    );
    if (result instanceof Response) return result;
    let script = typeof result === "string" ? result : result.script;
    if (typeof result !== "string") {
      for (const selector of result.skippedSelectors) skippedSelectors.add(selector);
    }
    if (script !== block.scriptText) {
      script = writer === "acorn" ? syncPositionHoldsBeforeKeyframes(script, block.scriptText) : (await loadGsapParser()).syncPositionHoldsBeforeKeyframes(script, block.scriptText);
      after = block.replaceScript(script);
    }
  }
  after = relinkSplitHalvesInHtml(after, rightHalfIds);
  return {
    path: file.path,
    absPath,
    before,
    after,
    splitCount,
    skippedSelectors: [...skippedSelectors]
  };
}
var MAX_UPLOAD_BYTES = 500 * 1024 * 1024;
async function processUploadedFiles(formData, targetDir, projectDir) {
  const uploaded = [];
  const skipped = [];
  const invalid = [];
  const unchecked = [];
  const entries = formData.entries();
  const subDir = targetDir === projectDir ? "" : targetDir.slice(projectDir.length + 1);
  for (const [, value] of entries) {
    if (typeof value === "string") continue;
    const name = value.name.split("/").pop()?.split("\\").pop() ?? "";
    if (!name || name.includes("\0") || name.includes("..")) continue;
    if (value.size > MAX_UPLOAD_BYTES) {
      skipped.push(name);
      continue;
    }
    const destPath = resolve2(targetDir, name);
    if (!isSafePath(projectDir, destPath)) continue;
    let finalPath = destPath;
    let finalName = name;
    const dotIdx = name.indexOf(".", name.startsWith(".") ? 1 : 0);
    const ext = dotIdx > 0 ? name.slice(dotIdx) : "";
    const base = dotIdx > 0 ? name.slice(0, dotIdx) : name;
    const MAX_COPY_INDEX = 1e4;
    let n = 1;
    if (existsSync4(finalPath)) {
      n = 2;
      while (n < MAX_COPY_INDEX && existsSync4(resolve2(targetDir, `${base} (${n})${ext}`))) n++;
      if (n >= MAX_COPY_INDEX) {
        skipped.push(name);
        continue;
      }
      finalName = `${base} (${n})${ext}`;
      finalPath = resolve2(targetDir, finalName);
    }
    if (!isSafePath(projectDir, finalPath) || isPrivateProjectFile(projectDir, finalPath)) continue;
    const buffer = Buffer.from(await value.arrayBuffer());
    const validation = validateUploadedMediaBuffer(finalName, buffer);
    if (!validation.ok) {
      invalid.push({ name: finalName, reason: validation.reason });
      continue;
    }
    let written = false;
    while (n < MAX_COPY_INDEX && isSafePath(projectDir, finalPath)) {
      try {
        createFileAtomically(finalPath, buffer);
        written = true;
        break;
      } catch (error) {
        if (!(error instanceof Error) || !("code" in error) || error.code !== "EEXIST") {
          throw error;
        }
        n++;
        finalName = `${base} (${n})${ext}`;
        finalPath = resolve2(targetDir, finalName);
      }
    }
    if (!written) {
      if (n >= MAX_COPY_INDEX) skipped.push(name);
      continue;
    }
    const relativePath = subDir ? join6(subDir, finalName) : finalName;
    uploaded.push(relativePath);
    if (validation.unchecked) unchecked.push({ name: finalName, reason: validation.unchecked });
    if (isAudioFile(finalName)) {
      generateWaveformCache(projectDir, relativePath).catch(() => {
      });
    }
  }
  return { uploaded, skipped, invalid, unchecked };
}
var MAX_TEXT_READ_BYTES = 32 * 1024 * 1024;
var GIT_BINARY_SNIFF_BYTES = 8e3;
function registerFileRoutes(api, adapter) {
  api.get("/projects/:id/files/*", async (c) => {
    const res = await resolveProjectFile(c, adapter);
    if ("error" in res) return res.error;
    let fd;
    try {
      fd = openSync2(res.absPath, "r");
    } catch {
      if (c.req.query("optional") === "1") {
        return c.json({ filename: res.filePath, content: "", missing: true });
      }
      return c.json({ error: "not found" }, 404);
    }
    try {
      const stat2 = fstatSync2(fd);
      if (!stat2.isFile()) {
        return c.json({ error: "not found", why: "not_a_file" }, 404);
      }
      if (stat2.size > MAX_TEXT_READ_BYTES) {
        return c.json({ error: "too large to read as text", why: "too_large" }, 413);
      }
      const content = readFileSync6(fd);
      const version = fileContentVersion(content);
      c.header("ETag", version);
      if (content.subarray(0, GIT_BINARY_SNIFF_BYTES).includes(0)) {
        return c.json({ error: "not a text file", why: "binary", version }, 415);
      }
      return c.json({
        filename: res.filePath,
        content: content.toString("utf-8"),
        version,
        missing: false
      });
    } finally {
      closeSync2(fd);
    }
  });
  api.put("/projects/:id/files/*", async (c) => {
    const res = await resolveProjectFile(c, adapter, { pin: true });
    if ("error" in res) return res.error;
    const body = Buffer.from(await c.req.arrayBuffer());
    const expectedVersion = c.req.header("If-Match")?.trim() ?? null;
    const createOnly = c.req.header("If-None-Match")?.trim() === "*";
    if (expectedVersion === null && !createOnly) {
      let currentContent = null;
      try {
        currentContent = readFileSync6(res.absPath);
      } catch (error) {
        if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
          throw error;
        }
      }
      return c.json(
        {
          error: "precondition required",
          path: res.filePath,
          currentVersion: currentContent === null ? null : fileContentVersion(currentContent),
          currentContent: currentContent?.toString("utf-8") ?? null
        },
        428
      );
    }
    let backup = { backupPath: null };
    let overwrote;
    if (createOnly) {
      ensureDir(res.project.dir, res.absPath);
      try {
        createFileAtomically(res.absPath, body);
      } catch (error) {
        if (!error || typeof error !== "object" || !("code" in error) || error.code !== "EEXIST") {
          throw error;
        }
        const currentContent = readFileSync6(res.absPath);
        return c.json(
          {
            error: "file conflict",
            path: res.filePath,
            currentVersion: fileContentVersion(currentContent),
            currentContent: currentContent.toString("utf-8")
          },
          409
        );
      }
    } else {
      let fd;
      try {
        fd = openSync2(res.absPath, "r+");
      } catch (error) {
        if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
          throw error;
        }
        return c.json(
          {
            error: "file conflict",
            path: res.filePath,
            currentVersion: null,
            currentContent: null
          },
          409
        );
      }
      try {
        const currentContent = readFileSync6(fd);
        overwrote = currentContent;
        const currentVersion = fileContentVersion(currentContent);
        if (expectedVersion !== currentVersion) {
          return c.json(
            {
              error: "file conflict",
              path: res.filePath,
              currentVersion,
              currentContent: currentContent.toString("utf-8")
            },
            409
          );
        }
        backup = snapshotBeforeWrite(res.project.dir, res.absPath);
        if (backup.error) return c.json({ error: `backup failed: ${backup.error}` }, 500);
        const mode = fstatSync2(fd).mode;
        closeSync2(fd);
        fd = null;
        replaceFileAtomically(res.absPath, body, mode);
      } finally {
        if (fd !== null) closeSync2(fd);
      }
    }
    const version = fileContentVersion(body);
    const writeToken = createWriteToken(c.req.header("X-Hyperframes-Write-Token"));
    recordFileWriteReceipt(res.absPath, { path: res.filePath, version, writeToken, overwrote });
    c.header("ETag", version);
    return c.json({
      ok: true,
      path: res.filePath,
      version,
      writeToken,
      backupPath: backupPathForResponse(res.project.dir, backup.backupPath)
    });
  });
  api.post("/projects/:id/files/*", async (c) => {
    const res = await resolveProjectFile(c, adapter);
    if ("error" in res) return res.error;
    ensureDir(res.project.dir, res.absPath);
    const body = Buffer.from(await c.req.arrayBuffer());
    try {
      createFileAtomically(res.absPath, body);
    } catch (error) {
      if (!error || typeof error !== "object" || !("code" in error) || error.code !== "EEXIST") {
        throw error;
      }
      return c.json({ error: "already exists" }, 409);
    }
    return c.json({ ok: true, path: res.filePath }, 201);
  });
  api.delete("/projects/:id/files/*", async (c) => {
    const res = await resolveProjectFile(c, adapter, { mustExist: true });
    if ("error" in res) return res.error;
    const stat2 = statSync3(res.absPath);
    const backup = snapshotBeforeWrite(res.project.dir, res.absPath);
    if (backup.error) return c.json({ error: `backup failed: ${backup.error}` }, 500);
    if (stat2.isDirectory()) {
      rmSync3(res.absPath, { recursive: true });
    } else {
      unlinkSync2(res.absPath);
    }
    return c.json({
      ok: true,
      backupPath: backupPathForResponse(res.project.dir, backup.backupPath)
    });
  });
  api.post("/projects/:id/file-mutations/insert-composition/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "insert-composition");
    if ("error" in ctx) return ctx.error;
    const body = await c.req.json().catch(() => null);
    if (!body || typeof body.sourcePath !== "string" || typeof body.start !== "number" || !Number.isFinite(body.start) || body.start < 0 || typeof body.track !== "number" || !Number.isFinite(body.track) || typeof body.expectedVersion !== "string") {
      return c.json({ error: "sourcePath, finite placement, and expectedVersion required" }, 400);
    }
    let before;
    try {
      before = readFileSync6(ctx.absPath, "utf-8");
    } catch (error) {
      if (!error || typeof error !== "object" || !("code" in error) || error.code !== "ENOENT") {
        throw error;
      }
      return c.json({ error: "not found" }, 404);
    }
    const currentVersion = fileContentVersion(before);
    if (body.expectedVersion !== currentVersion) {
      return c.json({ error: "file conflict", currentVersion, currentContent: before }, 409);
    }
    let insertion;
    try {
      insertion = insertCompositionIntoSource({
        projectDir: ctx.project.dir,
        targetPath: ctx.filePath,
        sourcePath: body.sourcePath,
        parentSource: before,
        start: body.start,
        desiredTrack: body.track
      });
    } catch (error) {
      if (error instanceof CompositionInsertionError) {
        return c.json({ error: error.message }, error.status);
      }
      throw error;
    }
    const backup = snapshotBeforeWrite(ctx.project.dir, ctx.absPath);
    if (backup.error) return c.json({ error: `backup failed: ${backup.error}` }, 500);
    const current = readFileSync6(ctx.absPath, "utf-8");
    if (current !== before) {
      const currentVersion2 = fileContentVersion(current);
      return c.json({ error: "file conflict", currentVersion: currentVersion2, currentContent: current }, 409);
    }
    const { version, writeToken } = writeFileWithReceipt(
      c,
      ctx.filePath,
      ctx.absPath,
      insertion.html
    );
    c.header("ETag", version);
    return c.json({
      ok: true,
      path: ctx.filePath,
      hostId: insertion.hostId,
      track: insertion.track,
      duration: insertion.duration,
      before,
      after: insertion.html,
      version,
      writeToken,
      backupPath: backupPathForResponse(ctx.project.dir, backup.backupPath)
    });
  });
  api.post("/projects/:id/file-mutations/remove-element/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "remove-element");
    if ("error" in ctx) return ctx.error;
    if (!existsSync4(ctx.absPath)) {
      return c.json({ error: "not found" }, 404);
    }
    const parsed = await parseMutationBody(c);
    if ("error" in parsed) return parsed.error;
    const originalContent = readFileSync6(ctx.absPath, "utf-8");
    const cleanedContent = removeElementFromHtml(originalContent, parsed.target);
    if (cleanedContent === originalContent) {
      return c.json({ error: "element not found in source file" }, 404);
    }
    return writeIfChanged(
      c,
      ctx.project.dir,
      ctx.filePath,
      ctx.absPath,
      originalContent,
      cleanedContent
    );
  });
  api.post("/projects/:id/file-mutations/remove-elements/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "remove-elements");
    if ("error" in ctx) return ctx.error;
    if (!existsSync4(ctx.absPath)) {
      return c.json({ error: "not found" }, 404);
    }
    const body = await c.req.json().catch(() => null);
    const targets = body?.targets;
    if (!Array.isArray(targets) || targets.length === 0) {
      return c.json({ error: "targets required" }, 400);
    }
    const originalContent = readFileSync6(ctx.absPath, "utf-8");
    return writeIfChanged(
      c,
      ctx.project.dir,
      ctx.filePath,
      ctx.absPath,
      originalContent,
      removeElementsFromHtml(originalContent, targets)
    );
  });
  api.post("/projects/:id/file-mutations/split-batch", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!Array.isArray(body?.files) || body.files.length === 0 || !body.files.every(isAtomicCutFileRequest)) {
      return c.json({ error: "files with path, expectedVersion, and cut targets required" }, 400);
    }
    const files = body.files;
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    let writer;
    try {
      writer = resolveGsapWriter({
        HYPERFRAMES_GSAP_WRITER: process.env["HYPERFRAMES_GSAP_WRITER"]
      });
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : String(error) }, 400);
    }
    return serializeAtomicCut(async () => {
      const seen = /* @__PURE__ */ new Set();
      const prepared = [];
      for (const file of files) {
        const absPath = pinWithinProject(project.dir, file.path);
        if (!absPath) return c.json({ error: `forbidden path: ${file.path}` }, 403);
        if (seen.has(absPath)) return c.json({ error: `duplicate path: ${file.path}` }, 400);
        seen.add(absPath);
        let before;
        try {
          before = readFileSync6(absPath, "utf-8");
        } catch {
          return c.json({ error: `not found: ${file.path}` }, 404);
        }
        const currentVersion = fileContentVersion(before);
        if (currentVersion !== file.expectedVersion) {
          return c.json(
            {
              error: `file conflict: ${file.path}`,
              path: file.path,
              currentVersion,
              currentContent: before
            },
            409
          );
        }
        let folded;
        try {
          folded = await foldAtomicCutFile(c, file, absPath, before, writer);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Cut transform failed";
          return c.json({ error: message }, 400);
        }
        if (folded instanceof Response) return folded;
        prepared.push(folded);
      }
      for (const file of prepared) {
        const current = readFileSync6(file.absPath, "utf-8");
        if (current !== file.before) {
          return c.json(
            {
              error: `file conflict: ${file.path}`,
              path: file.path,
              currentVersion: fileContentVersion(current),
              currentContent: current
            },
            409
          );
        }
      }
      const backups = /* @__PURE__ */ new Map();
      for (const file of prepared) {
        const backup = snapshotBeforeWrite(project.dir, file.absPath);
        if (backup.error) {
          return c.json(
            { error: `Failed to create backup for ${file.path}: ${backup.error}` },
            500
          );
        }
        backups.set(file.path, backupPathForResponse(project.dir, backup.backupPath));
      }
      const writeToken = createWriteToken(
        typeof body.transactionToken === "string" ? body.transactionToken : c.req.header("X-Hyperframes-Write-Token")
      );
      const written = [];
      try {
        for (const file of prepared) {
          replaceFileAtomically(file.absPath, file.after, statSync3(file.absPath).mode);
          written.push(file);
          recordFileWriteReceipt(file.absPath, {
            path: file.path,
            version: fileContentVersion(file.after),
            writeToken,
            overwrote: file.before
          });
        }
      } catch (error) {
        const conflicts = [];
        for (const file of written.reverse()) {
          try {
            const current = readFileSync6(file.absPath, "utf-8");
            if (current !== file.after) {
              conflicts.push(file.path);
              continue;
            }
            replaceFileAtomically(file.absPath, file.before, statSync3(file.absPath).mode);
            recordFileWriteReceipt(file.absPath, {
              path: file.path,
              version: fileContentVersion(file.before),
              writeToken
            });
          } catch {
            conflicts.push(file.path);
          }
        }
        return c.json(
          {
            error: error instanceof Error ? error.message : "Cut write failed",
            outcome: conflicts.length ? "aborted-with-conflicts" : "aborted-restored",
            conflicts
          },
          conflicts.length ? 409 : 500
        );
      }
      const result = prepared.map((file) => ({
        path: file.path,
        before: file.before,
        after: file.after,
        version: fileContentVersion(file.after),
        writeToken,
        backupPath: backups.get(file.path) ?? null,
        splitCount: file.splitCount,
        skippedSelectors: file.skippedSelectors
      }));
      return c.json({ ok: true, outcome: "committed", files: result });
    });
  });
  api.post("/projects/:id/file-mutations/split-element/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "split-element");
    if ("error" in ctx) return ctx.error;
    const parsed = await parseMutationBody(c);
    if ("error" in parsed) return parsed.error;
    if (typeof parsed.body.splitTime !== "number" || !parsed.body.newId) {
      return c.json({ error: "target, splitTime, and newId required" }, 400);
    }
    const fallbackTiming = typeof parsed.body.elementStart === "number" && typeof parsed.body.elementDuration === "number" ? { start: parsed.body.elementStart, duration: parsed.body.elementDuration } : void 0;
    let originalContent;
    try {
      originalContent = readFileSync6(ctx.absPath, "utf-8");
    } catch {
      return c.json({ error: "not found" }, 404);
    }
    const result = splitElementInHtml(
      originalContent,
      parsed.target,
      parsed.body.splitTime,
      parsed.body.newId,
      fallbackTiming
    );
    if (!result.matched) {
      const version2 = fileContentVersion(originalContent);
      c.header("ETag", version2);
      return c.json({
        ok: false,
        changed: false,
        content: originalContent,
        path: ctx.filePath,
        version: version2
      });
    }
    const mutationResult = writeMutationResult(
      c,
      ctx.project.dir,
      ctx.filePath,
      ctx.absPath,
      result.html,
      originalContent
    );
    if (mutationResult instanceof Response) return mutationResult;
    const { version, backupPath } = mutationResult;
    c.header("ETag", version);
    return c.json({
      ok: true,
      changed: true,
      content: result.html,
      newId: result.newId,
      path: ctx.filePath,
      version,
      backupPath
    });
  });
  api.post("/projects/:id/file-mutations/patch-element/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "patch-element");
    if ("error" in ctx) return ctx.error;
    const parsed = await parseMutationBody(c);
    if ("error" in parsed) return parsed.error;
    if (!Array.isArray(parsed.body.operations) || parsed.body.operations.length === 0) {
      return c.json({ error: "target and operations required" }, 400);
    }
    const { fontFaceCss } = parsed.body;
    if (fontFaceCss !== void 0 && !isStudioFontFaceCss(fontFaceCss)) {
      return c.json({ error: "fontFaceCss must be one @font-face rule" }, 400);
    }
    const unsafeFields = findUnsafeDomPatchValues(parsed.body);
    if (unsafeFields.length > 0) {
      return rejectUnsafeMutationValues(c, unsafeFields);
    }
    for (let attempt = 1; ; attempt += 1) {
      let originalContent;
      try {
        originalContent = readFileSync6(ctx.absPath, "utf-8");
      } catch {
        return c.json({ error: "not found" }, 404);
      }
      const takenIds = parsed.body.operations.some((op) => op.type === "ensure-id") ? projectHtmlIds(ctx.project.dir) : void 0;
      const element = patchElementInHtml(
        originalContent,
        parsed.target,
        parsed.body.operations,
        takenIds
      );
      const { matched } = element;
      const patched = matched && isStudioFontFaceCss(fontFaceCss) ? ensureStudioFontFaceCss(element.html, fontFaceCss) : element.html;
      if (patched === originalContent) {
        const version2 = fileContentVersion(originalContent);
        c.header("ETag", version2);
        return c.json({
          ok: true,
          changed: false,
          matched,
          elementId: element.elementId,
          content: originalContent,
          path: ctx.filePath,
          version: version2
        });
      }
      const mutationResult = writeMutationResult(
        c,
        ctx.project.dir,
        ctx.filePath,
        ctx.absPath,
        patched,
        originalContent
      );
      if (mutationResult instanceof Response) {
        if (mutationResult.status === 409 && attempt < PATCH_CONFLICT_ATTEMPTS) continue;
        return mutationResult;
      }
      const { backupPath, version } = mutationResult;
      c.header("ETag", version);
      return c.json({
        ok: true,
        changed: true,
        matched,
        elementId: element.elementId,
        content: patched,
        path: ctx.filePath,
        version,
        backupPath
      });
    }
  });
  api.post("/projects/:id/file-mutations/patch-element-batches", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const body = await c.req.json().catch(() => null);
    if (typeof body !== "object" || body === null || !("batches" in body) || !Array.isArray(body.batches) || body.batches.length === 0 || !body.batches.every(isElementPatchBatchRequest)) {
      return c.json({ error: "batches with sourceFile and patches required" }, 400);
    }
    const unsafeFields = findUnsafeElementPatchBatchValues(body.batches);
    if (unsafeFields.length > 0) return rejectUnsafeMutationValues(c, unsafeFields);
    const result = commitElementPatchBatchesWithReceipts(c, project.dir, body.batches);
    if ("error" in result) {
      return elementPatchBatchCommitErrorResponse(c, result.error, result.sourceFile);
    }
    return c.json(result);
  });
  api.post("/projects/:id/file-mutations/patch-elements-batch/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "patch-elements-batch");
    if ("error" in ctx) return ctx.error;
    const body = await c.req.json().catch(() => null);
    if (!body || !Array.isArray(body.patches) || body.patches.length === 0 || !body.patches.every(isElementPatchRequest)) {
      return c.json({ error: "patches with target and operations required" }, 400);
    }
    const batch = { sourceFile: ctx.filePath, patches: body.patches };
    const unsafeFields = findUnsafeElementPatchBatchValues([batch]);
    if (unsafeFields.length > 0) {
      return rejectUnsafeMutationValues(c, unsafeFields);
    }
    const result = commitElementPatchBatchesWithReceipts(c, ctx.project.dir, [batch]);
    if ("error" in result) {
      return elementPatchBatchCommitErrorResponse(c, result.error, result.sourceFile);
    }
    const file = result.files[0];
    if (!file) return c.json({ error: "empty element patch result" }, 500);
    return c.json({
      ok: true,
      changed: file.changed,
      matched: file.matched,
      content: file.after,
      path: file.sourceFile,
      backupPath: file.backupPath
    });
  });
  api.post("/projects/:id/file-mutations/wrap-elements/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "wrap-elements");
    if ("error" in ctx) return ctx.error;
    const body = await c.req.json().catch(() => null);
    if (!Array.isArray(body?.targets) || body.targets.length === 0 || !body.groupId) {
      return c.json({ error: "targets and groupId required" }, 400);
    }
    const bbox = body.bbox ?? {};
    const bboxNums = [bbox.left, bbox.top, bbox.width, bbox.height];
    const rebases = body.rebases ?? [];
    const allNumeric = bboxNums.every((n) => typeof n === "number" && Number.isFinite(n)) && rebases.every(
      (r) => typeof r?.left === "number" && Number.isFinite(r.left) && typeof r?.top === "number" && Number.isFinite(r.top) && isOptionalInteger(r?.track)
    );
    if (!allNumeric) {
      return c.json({ error: "bbox and rebase coordinates must be finite numbers" }, 400);
    }
    let originalContent;
    try {
      originalContent = readFileSync6(ctx.absPath, "utf-8");
    } catch {
      return c.json({ error: "not found" }, 404);
    }
    const result = wrapElementsInHtml(
      originalContent,
      body.targets,
      body.groupId,
      { left: bbox.left, top: bbox.top, width: bbox.width, height: bbox.height },
      rebases
    );
    if (!result.matched) {
      return c.json(
        {
          ok: false,
          changed: false,
          content: originalContent,
          path: ctx.filePath,
          error: result.error
        },
        result.error === "grouped elements must share a single parent" ? 422 : 400
      );
    }
    const mutationResult = writeMutationResult(
      c,
      ctx.project.dir,
      ctx.filePath,
      ctx.absPath,
      result.html,
      originalContent
    );
    if (mutationResult instanceof Response) return mutationResult;
    const { backupPath } = mutationResult;
    return c.json({
      ok: true,
      changed: true,
      groupId: result.groupId,
      content: result.html,
      path: ctx.filePath,
      backupPath
    });
  });
  api.post("/projects/:id/file-mutations/unwrap-elements/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "unwrap-elements");
    if ("error" in ctx) return ctx.error;
    const parsed = await parseMutationBody(c);
    if ("error" in parsed) return parsed.error;
    const rawChildTracks = parsed.body.childTracks ?? [];
    if (!rawChildTracks.every((entry) => isOptionalInteger(entry?.track))) {
      return c.json({ error: "childTracks track must be a finite integer" }, 400);
    }
    const childTracks = rawChildTracks.filter(
      (entry) => Boolean(entry?.target)
    ).map((entry) => ({ target: entry.target, track: entry.track }));
    let originalContent;
    try {
      originalContent = readFileSync6(ctx.absPath, "utf-8");
    } catch {
      return c.json({ error: "not found" }, 404);
    }
    const result = unwrapElementsFromHtml(originalContent, parsed.target, childTracks);
    if (!result.unwrapped) {
      return c.json({ ok: false, changed: false, content: originalContent, path: ctx.filePath });
    }
    let cleaned = result.html;
    if (result.unwrappedGroupId && result.members && result.groupCenter) {
      cleaned = bakeGroupTransformIntoMembers(
        cleaned,
        result.unwrappedGroupId,
        result.members,
        result.groupCenter
      );
    }
    if (result.unwrappedGroupId) {
      cleaned = stripGsapAnimationsForSelector(cleaned, `#${result.unwrappedGroupId}`);
    }
    return writeIfChanged(c, ctx.project.dir, ctx.filePath, ctx.absPath, originalContent, cleaned);
  });
  api.post("/projects/:id/file-mutations/probe-element/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "probe-element");
    if ("error" in ctx) return ctx.error;
    const parsed = await parseMutationBody(c);
    if ("error" in parsed) return parsed.error;
    let content;
    try {
      content = readFileSync6(ctx.absPath, "utf-8");
    } catch {
      return c.json({ exists: false });
    }
    const exists = probeElementInSource(content, parsed.target);
    return c.json({ exists });
  });
  api.post("/projects/:id/file-mutations/probe-elements/*", async (c) => {
    const ctx = await resolveFileMutationContext(c, adapter, "probe-elements");
    if ("error" in ctx) return ctx.error;
    const body = await c.req.json().catch(() => null);
    if (!Array.isArray(body?.targets)) return c.json({ error: "targets required" }, 400);
    let content;
    try {
      content = readFileSync6(ctx.absPath, "utf-8");
    } catch {
      return c.json({ exists: body.targets.map(() => false) });
    }
    return c.json({ exists: probeElementsInSource(content, body.targets) });
  });
  api.patch("/projects/:id/files/*", async (c) => {
    const res = await resolveProjectFile(c, adapter, { mustExist: true });
    if ("error" in res) return res.error;
    const body = await c.req.json();
    if (!body.newPath || body.newPath.includes("\0")) {
      return c.json({ error: "newPath required" }, 400);
    }
    const newAbs = resolveWithinProject(res.project.dir, body.newPath);
    if (!newAbs) {
      return c.json({ error: "forbidden" }, 403);
    }
    if (existsSync4(newAbs)) {
      return c.json({ error: "already exists" }, 409);
    }
    const isDirectory = statSync3(res.absPath, { throwIfNoEntry: false })?.isDirectory() ?? false;
    ensureDir(res.project.dir, newAbs);
    renameSync2(res.absPath, newAbs);
    const updatedFiles = updateReferences(res.project.dir, res.filePath, body.newPath, isDirectory);
    return c.json({ ok: true, path: body.newPath, updatedReferences: updatedFiles });
  });
  api.post("/projects/:id/duplicate-file", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const body = await c.req.json();
    if (!body.path || body.path.includes("\0")) {
      return c.json({ error: "path required" }, 400);
    }
    const srcAbs = resolveWithinProject(project.dir, body.path);
    if (!srcAbs || !existsSync4(srcAbs)) {
      return c.json({ error: "not found" }, 404);
    }
    const copyPath = generateCopyPath(project.dir, body.path);
    const destAbs = resolveWithinProject(project.dir, copyPath);
    if (!destAbs) {
      return c.json({ error: "forbidden" }, 403);
    }
    ensureDir(project.dir, destAbs);
    try {
      createFileAtomically(destAbs, readFileSync6(srcAbs));
    } catch (error) {
      if (!error || typeof error !== "object" || !("code" in error) || error.code !== "EEXIST") {
        throw error;
      }
      return c.json({ error: "already exists" }, 409);
    }
    return c.json({ ok: true, path: copyPath }, 201);
  });
  api.post(
    "/projects/:id/upload",
    bodyLimit({
      maxSize: MAX_UPLOAD_BYTES,
      onError: (c) => c.json({ error: "payload too large" }, 413)
    }),
    async (c) => {
      const project = await adapter.resolveProject(c.req.param("id"));
      if (!project) return c.json({ error: "not found" }, 404);
      if (folderGone(project.dir)) return projectDirMissing(c);
      const subDir = c.req.query("dir") ?? "";
      const targetDir = subDir ? resolveWithinProject(project.dir, subDir) : project.dir;
      if (!targetDir) return c.json({ error: "forbidden" }, 403);
      const formData = await c.req.formData();
      mkdirWithinProject(project.dir, targetDir);
      const result = await processUploadedFiles(formData, targetDir, project.dir);
      if (folderGone(project.dir)) return projectDirMissing(c);
      return c.json(
        {
          ok: true,
          files: result.uploaded,
          skipped: result.skipped,
          invalid: result.invalid,
          unchecked: result.unchecked
        },
        201
      );
    }
  );
  api.get("/projects/:id/motion-presets", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const targetKind = c.req.query("targetKind");
    const phase = c.req.query("phase");
    const intent = c.req.query("intent");
    const tone = c.req.query("tone");
    if (targetKind && targetKind !== "text" && targetKind !== "element") {
      return c.json({ error: "targetKind must be text or element" }, 400);
    }
    if (phase && phase !== "enter" && phase !== "emphasis" && phase !== "exit") {
      return c.json({ error: "phase must be enter, emphasis, or exit" }, 400);
    }
    const presets = listMotionPresets({
      ...targetKind ? { targetKind } : {},
      ...phase ? { phase } : {},
      ...intent ? { intent } : {},
      ...tone ? { tone } : {}
    });
    return c.json({ presets });
  });
  api.get("/projects/:id/gsap-animations/*", async (c) => {
    const res = await resolveProjectPath(c, adapter, "gsap-animations", {
      mustExist: true
    });
    if ("error" in res) return res.error;
    const html = readFileSync6(res.absPath, "utf-8");
    const etag = `${fileContentVersion(html).slice(0, -1)}:gsap-animations:v1"`;
    const headers = { ETag: etag, "Cache-Control": "no-cache" };
    if (c.req.header("If-None-Match") === etag) return new Response(null, { status: 304, headers });
    const block = extractGsapScriptBlock(html);
    if (!block) {
      return c.json(
        { animations: [], timelineVar: "tl", preamble: "", postamble: "" },
        200,
        headers
      );
    }
    return c.json(parseGsapScriptAcorn(block.scriptText), 200, headers);
  });
  api.get("/projects/:id/gsap-mutation-capabilities", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    return c.json({ atomicOwnershipPairs: true });
  });
  api.post("/projects/:id/gsap-mutations/*", async (c) => {
    const res = await resolveProjectPath(c, adapter, "gsap-mutations", {
      mustExist: true,
      pin: true
    });
    if ("error" in res) return res.error;
    const body = await c.req.json().catch(() => null);
    if (!body) return c.json({ error: "mutation type required" }, 400);
    const error = validateGsapMutationRequest(c, body);
    if (error) return error;
    return applyGsapMutations(c, res, [body]);
  });
  api.post("/projects/:id/gsap-mutations-batch/*", async (c) => {
    const res = await resolveProjectPath(c, adapter, "gsap-mutations-batch", {
      mustExist: true,
      pin: true
    });
    if ("error" in res) return res.error;
    const body = await c.req.json().catch(() => null);
    if (!body || !Array.isArray(body.mutations) || body.mutations.length === 0) {
      return c.json({ error: "mutations array required" }, 400);
    }
    for (const mutation of body.mutations) {
      const error = validateGsapMutationRequest(c, mutation);
      if (error) return error;
    }
    return applyGsapMutations(c, res, body.mutations);
  });
  api.post("/projects/:id/gsap-mutation-rollback/*", async (c) => {
    const res = await resolveProjectPath(c, adapter, "gsap-mutation-rollback", {
      mustExist: true,
      pin: true
    });
    if ("error" in res) return res.error;
    const body = await c.req.json().catch(() => null);
    if (!body || typeof body.expected !== "string" || typeof body.restore !== "string") {
      return c.json({ error: "expected and restore contents required" }, 400);
    }
    const current = readFileSync6(res.absPath, "utf-8");
    if (current !== body.expected) {
      return c.json({ ok: true, restored: false, conflict: true });
    }
    replaceFileAtomically(res.absPath, body.restore, statSync3(res.absPath).mode);
    return c.json({ ok: true, restored: true, conflict: false });
  });
}

// ../studio-server/src/helpers/previewReads.ts
import { readlinkSync as readlinkSync2 } from "fs";
import { dirname as dirname5, join as join7, parse as parse2, relative as relative3, resolve as resolve3 } from "path";
var ALWAYS_AFFECTS = ["hyperframes.json", ...STUDIO_SIGNATURE_MANIFEST_PATHS];
var MAX_PREVIEW_PATH_LENGTH = 4096;
var SHOW_ELEMENT = 1;
var REFERENCE = /\b(?:src|href|poster|data-composition-src)\s*=\s*(?:"([^"\n]*)"|'([^'\n]*)')|url\(\s*(?:"([^"\n]*)"|'([^'\n]*)'|([^"'\s)]+))/gi;
var REFERENCE_ATTRIBUTE = /\b(?:src|href|poster|data-composition-src)$/i;
var isElement = (node) => node.nodeType === 1;
var pathKey = process.platform === "darwin" || process.platform === "win32" ? (path) => resolve3(path).toLowerCase() : (path) => resolve3(path);
var readsByProject = /* @__PURE__ */ new Map();
var builtProjects = /* @__PURE__ */ new Set();
var projectKey = (projectDir) => pathKey(realFilePath(resolve3(projectDir)));
var inRealProject = (projectDir, path) => join7(realFilePath(resolve3(projectDir)), relative3(resolve3(projectDir), resolve3(projectDir, path)));
var readLink = (path) => {
  try {
    return readlinkSync2(path);
  } catch {
    return null;
  }
};
function linksOnTheWay(path) {
  const passed = [];
  let at = parse2(path).root;
  let rest = path.slice(at.length).split(/[\\/]+/);
  for (let hops = 0; rest.length > 0; ) {
    const part = rest.shift();
    if (!part || part === ".") continue;
    if (part === "..") {
      at = dirname5(at);
      continue;
    }
    const next = join7(at, part);
    if (next.length > MAX_PREVIEW_PATH_LENGTH) return passed;
    const target = hops < 40 ? readLink(next) : null;
    if (target === null) {
      at = next;
      continue;
    }
    hops++;
    passed.push(next);
    const root = parse2(target).root;
    if (root) at = root;
    rest = [...target.slice(root.length).split(/[\\/]+/), ...rest];
  }
  passed.push(at);
  return passed;
}
function recordPreviewRead(projectDir, filePath) {
  if (filePath.length > MAX_PREVIEW_PATH_LENGTH) return;
  const key = projectKey(projectDir);
  let reads = readsByProject.get(key);
  if (!reads) readsByProject.set(key, reads = /* @__PURE__ */ new Set());
  const read = inRealProject(projectDir, filePath);
  if (read.length > MAX_PREVIEW_PATH_LENGTH) return;
  for (const found of [read, ...linksOnTheWay(read)]) {
    for (let path = pathKey(found); !reads.has(path); path = dirname5(path)) reads.add(path);
  }
}
function recordPreviewReferences(projectDir, html) {
  const named = /* @__PURE__ */ new Set();
  const add = (reference) => {
    const url = reference.trim();
    if (!url || /^(?:[a-z][a-z0-9+.-]*:|[/#])/i.test(url)) return;
    const path = url.split(/[?#]/)[0] ?? "";
    let decoded = path;
    try {
      decoded = decodeURIComponent(path);
    } catch {
    }
    if (decoded && decoded.length <= MAX_PREVIEW_PATH_LENGTH) named.add(decoded);
  };
  const scan = (text3) => {
    for (const match of text3.matchAll(REFERENCE)) {
      add(match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? "");
    }
  };
  const scanElement = (element) => {
    for (const attribute of element.attributes) {
      if (REFERENCE_ATTRIBUTE.test(attribute.name)) add(attribute.value);
    }
    const style = element.getAttribute("style");
    if (style) scan(style);
    if (element.localName === "style" || element.localName === "script") {
      scan(element.textContent ?? "");
    }
  };
  const { document: document2 } = parseHTML(html);
  for (const root of document2.children) {
    scanElement(root);
    const elements = document2.createTreeWalker(root, SHOW_ELEMENT);
    for (let node = elements.nextNode(); node; node = elements.nextNode()) {
      if (isElement(node)) scanElement(node);
    }
  }
  for (const path of named) recordPreviewRead(projectDir, path);
}
function recordPreviewBuilt(projectDir) {
  for (const path of ALWAYS_AFFECTS) recordPreviewRead(projectDir, path);
  builtProjects.add(projectKey(projectDir));
}
function affectsPreview(projectDir, changedPath) {
  const key = projectKey(projectDir);
  if (!builtProjects.has(key)) return true;
  return readsByProject.get(key)?.has(pathKey(inRealProject(projectDir, changedPath))) ?? false;
}

// ../studio-server/src/helpers/mediaProxyPreview.ts
import { resolve as resolve4 } from "path";
function isAutoProxyEnabled(adapter) {
  return adapter.autoProxy !== false;
}
function resolvePreviewMediaCodecProbeCache(adapter) {
  return adapter.mediaCodecProbeCache ?? createMediaCodecProbeCache();
}
function proxyEtagSalt(raw) {
  if (raw === void 0) return "";
  return `:proxy:${raw}:${PROXY_PARAMS_VERSION}`;
}
async function injectMediaCodecMapIntoHtml(html, projectDir, htmlSources, probeCache) {
  let map;
  try {
    map = await scanProjectMediaCodecMap(
      projectDir,
      htmlSources,
      probeCache ? { cache: probeCache } : {}
    );
  } catch {
    return html;
  }
  if (Object.keys(map).length === 0) return html;
  for (const [rootRelativePathname, facts] of Object.entries(map)) {
    if (!shouldPrewarmProxy(facts)) continue;
    recordProxyPrewarm();
    resolveProxy(
      projectDir,
      resolve4(projectDir, rootRelativePathname.replace(/^\/+/, "")),
      proxyVariantFor(facts)
    ).catch(() => {
    });
  }
  const json = JSON.stringify(map).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  const tag = `<script data-hf-media-codec-map>window.__HF_MEDIA_CODEC_MAP__=${json};</script>`;
  return insertBeforeCloseTag(html, "head", `${tag}
`) ?? `${tag}
${html}`;
}
async function injectMediaCodecMap(html, adapter, projectDir, compSrcPath, probeCache) {
  if (!isAutoProxyEnabled(adapter)) return html;
  return injectMediaCodecMapIntoHtml(html, projectDir, [{ html, compSrcPath }], probeCache);
}

// ../studio-server/src/routes/preview.ts
import { createReadStream, existsSync as existsSync5, readFileSync as readFileSync7, statSync as statSync4 } from "fs";
import { Readable } from "stream";
import { extname, join as join8, relative as relative4, resolve as resolve5, sep as sep2 } from "path";
import { createHash as createHash3 } from "crypto";

// ../core/dist/studioPreviewMark.js
var STUDIO_PREVIEW_MARK_META = "hyperframes-studio-preview";
var STUDIO_PREVIEW_LAZY_ATTR = "data-hf-preview-lazy";
var STUDIO_PREVIEW_ERRORS = "__hfPreviewErrors";

// ../studio-server/src/helpers/variablesPayload.ts
var VARIABLES_PAYLOAD_ERROR = "variables must be a JSON object of {variableId: value}";
function isVariablesPayload(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ../studio-server/src/helpers/previewVariables.ts
function injectPreviewVariables(html, values) {
  const json = JSON.stringify(values).replace(/</g, "\\u003c");
  const tag = `<script data-hf-preview-variables>window.__hfVariables=${json};</script>`;
  for (const pattern of [/<head/i, /<html/i, /^\s*<!doctype/i]) {
    const match = pattern.exec(html);
    if (match) {
      const end = html.indexOf(">", match.index + match[0].length);
      if (end < 0) continue;
      const at = end + 1;
      return html.slice(0, at) + tag + html.slice(at);
    }
  }
  return tag + html;
}

// ../studio-server/src/helpers/lazyPreviewImages.ts
function startsAfterZero(el) {
  for (let node = el; node; node = node.parentElement) {
    if (Number(node.getAttribute("data-start")) > 0) return true;
  }
  return false;
}
var hasLoading = (img) => Array.from(img.attributes).some((attr) => attr.name.toLowerCase() === "loading");
function lazyPreviewImages(html) {
  if (!/<!doctype|<html[\s>]/i.test(html)) return html;
  const images = [...parseHTML(html).document.querySelectorAll("img")];
  const tags = findStartTags(html, "img");
  if (tags.length !== images.length) return html;
  const parts = [];
  let from = 0;
  images.forEach((img, i) => {
    if (hasLoading(img) || !startsAfterZero(img)) return;
    const at = (tags[i] ?? 0) + 4;
    parts.push(html.slice(from, at), ` loading="lazy" ${STUDIO_PREVIEW_LAZY_ATTR}`);
    from = at;
  });
  parts.push(html.slice(from));
  return parts.join("");
}

// ../studio-server/src/routes/preview.ts
var PROJECT_SIGNATURE_META = "hyperframes-project-signature";
var GSAP_CDN_SCRIPT = `<script src="${gsapCdnDist()}gsap.min.js"></script>`;
var GSAP_CUSTOM_EASE_CDN_SCRIPT = `<script src="${gsapCdnDist()}CustomEase.min.js"></script>`;
var GSAP_MOTION_PATH_CDN_SCRIPT = `<script src="${motionPathPluginUrl()}"></script>`;
function injectProjectSignature(html, signature) {
  const tag = `<meta name="${PROJECT_SIGNATURE_META}" content="${signature}">`;
  if (html.includes(`name="${PROJECT_SIGNATURE_META}"`)) {
    return html.replace(
      new RegExp(`<meta\\s+name=["']${PROJECT_SIGNATURE_META}["'][^>]*>`, "i"),
      tag
    );
  }
  return insertBeforeCloseTag(html, "head", `${tag}
`) ?? `${tag}
${html}`;
}
function readStudioMotionManifestContent(projectDir) {
  const manifestPath = join8(projectDir, STUDIO_MOTION_PATH);
  if (!existsSync5(manifestPath)) return "";
  try {
    return readFileSync7(manifestPath, "utf-8");
  } catch {
    return "";
  }
}
function parseStudioMotionManifestContent(content) {
  try {
    const parsed = JSON.parse(content);
    const motions = Array.isArray(parsed.motions) ? parsed.motions : [];
    return {
      hasMotion: motions.length > 0,
      hasCustomEase: motions.some((motion) => Boolean(motion?.customEase))
    };
  } catch {
    return { hasMotion: false, hasCustomEase: false };
  }
}
function withPreviewRuntime(html, runtimeUrl) {
  const tag = `<script ${RUNTIME_BOOTSTRAP_ATTR}="1" src="${runtimeUrl}"></script>`;
  return insertRuntimeTag(stripEmbeddedRuntimeScripts(html), tag);
}
function injectScriptTagIntoHead(html, scriptTag) {
  return insertBeforeCloseTag(html, "head", `${scriptTag}
`) ?? `${scriptTag}
${html}`;
}
function htmlHasGsap(html) {
  const outsideTemplates = html.replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "");
  return /<script\b[^>]*src=["'][^"']*gsap/i.test(outsideTemplates) || /\/\*\s*inlined:.*gsap/i.test(outsideTemplates) || /\b(GreenSock|_gsScope)\b/.test(outsideTemplates) || /\bgsap\.(config|defaults|registerPlugin|version)\b/.test(outsideTemplates);
}
function htmlHasCustomEase(html) {
  return /<script\b[^>]*src=["'][^"']*CustomEase/i.test(html) || /\bwindow\.CustomEase\b/.test(html) || /\bCustomEase\s*=\s*/.test(html);
}
function htmlUsesMotionPath(html) {
  return /motionPath\s*[:{]/.test(html);
}
function htmlHasMotionPathPlugin(html) {
  return /<script\b[^>]*src=["'][^"']*MotionPathPlugin/i.test(html) || /\bwindow\.MotionPathPlugin\b/.test(html) || /\bMotionPathPlugin\s*=\s*/.test(html);
}
function injectMotionPathPluginIfNeeded(html) {
  if (!htmlUsesMotionPath(html) || htmlHasMotionPathPlugin(html)) return html;
  const gsap = findGsapCoreScript(html);
  if (gsap) {
    const version = gsap.src.match(/gsap@([\d.]+)/)?.[1];
    const ordering = `${gsap.type ? ` type="${gsap.type}"` : ""}${gsap.defer ? " defer" : ""}`;
    const pluginTag = `<script${ordering} src="${motionPathPluginUrl(version)}"></script>`;
    return html.slice(0, gsap.end) + "\n" + pluginTag + html.slice(gsap.end);
  }
  return injectScriptTagIntoHead(html, GSAP_MOTION_PATH_CDN_SCRIPT);
}
function isGsapCoreUrl(src) {
  const base = "http://localhost/";
  return URL.canParse(src, base) && /\/gsap(\.min)?\.js$/i.test(new URL(src, base).pathname);
}
function findGsapCoreScript(html) {
  const scripts = [...parseHTML(html).document.querySelectorAll("script")];
  const starts = findStartTags(html, "script");
  if (starts.length !== scripts.length) return null;
  const at = scripts.findIndex(
    (script) => isGsapCoreUrl(lowerCaseAttributes(script).get("src") ?? "")
  );
  if (at === -1) return null;
  const attributes = lowerCaseAttributes(scripts[at]);
  const end = scriptCloseEnd(html, starts[at]);
  if (end === 0) return null;
  return {
    src: attributes.get("src"),
    type: attributes.get("type") ?? null,
    defer: attributes.has("defer"),
    end
  };
}
function lowerCaseAttributes(el) {
  return new Map([...el.attributes].map((a) => [a.name.toLowerCase(), a.value]));
}
function scriptCloseEnd(html, start) {
  const close = /<\/script/gi;
  close.lastIndex = start;
  const closeAt = close.exec(html)?.index;
  return closeAt === void 0 ? 0 : html.indexOf(">", closeAt) + 1;
}
function injectStudioMotionDependencies(html, manifestContent) {
  const manifest = parseStudioMotionManifestContent(manifestContent);
  if (!manifest.hasMotion) return html;
  let next = html;
  if (!htmlHasGsap(next)) next = injectScriptTagIntoHead(next, GSAP_CDN_SCRIPT);
  if (manifest.hasCustomEase && !htmlHasCustomEase(next)) {
    next = injectScriptTagIntoHead(next, GSAP_CUSTOM_EASE_CDN_SCRIPT);
  }
  return next;
}
function injectStudioMotionScript(html, projectDir, activeCompositionPath) {
  const manifestContent = readStudioMotionManifestContent(projectDir);
  const script = createStudioMotionRenderBodyScript(manifestContent, {
    activeCompositionPath
  });
  if (!script) return html;
  const withDependencies = injectStudioMotionDependencies(html, manifestContent);
  const tag = `<script type="${AFTER_FONTS_SCRIPT_TYPE}">${script.replace(/<\/script/gi, "<\\/script")}</script>`;
  return insertBeforeCloseTag(withDependencies, "body", tag) ?? `${withDependencies}${tag}`;
}
var GSAP_FALLBACK_ATTR = "data-hf-gsap-fallback";
var GSAP_CDN_FALLBACK_SCRIPT = `<script ${GSAP_FALLBACK_ATTR}>
(function(){
  var cdnBase="${gsapCdnDist()}";
  var loaded={};
  function loadFallback(file){
    if(loaded[file])return loaded[file];
    return loaded[file]=new Promise(function(ok,fail){
      var s=document.createElement("script");
      s.src=cdnBase+file;s.hfGsapFallback=true;s.onload=ok;s.onerror=fail;
      document.head.appendChild(s);
    });
  }
  document.addEventListener("error",function(e){
    var t=e.target;
    if(!t||t.tagName!=="SCRIPT"||!t.src||t.hfGsapFallback)return;
    var m=t.src.match(/gsap[^/]*\\/dist\\/(.+\\.js)/);
    if(m)loadFallback(m[1]).catch(function(){
      reportError(new Error("GSAP could not load from "+t.src+" or "+cdnBase+m[1]+", so this preview's animations will not play."));
    });
  },true);
})();
</script>`;
function injectGsapCdnFallback(html) {
  if (html.includes(GSAP_FALLBACK_ATTR)) return html;
  if (html.includes("<head>")) return html.replace("<head>", "<head>" + GSAP_CDN_FALLBACK_SCRIPT);
  return GSAP_CDN_FALLBACK_SCRIPT + html;
}
function parsePreviewVariablesParam(raw) {
  if (raw === void 0 || raw === "") return { ok: true, values: null };
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "variables must be valid JSON" };
  }
  if (!isVariablesPayload(parsed)) {
    return { ok: false, error: VARIABLES_PAYLOAD_ERROR };
  }
  return { ok: true, values: parsed };
}
function variablesEtagSalt(raw) {
  if (!raw) return "";
  return `:vars:${createHash3("sha1").update(raw).digest("hex").slice(0, 12)}`;
}
function previewVariablesFromRequest(rawVariables) {
  const parse3 = parsePreviewVariablesParam(rawVariables);
  if (!parse3.ok) return { error: parse3.error };
  return { raw: rawVariables, values: parse3.values };
}
var PREVIEW_CAPTURE_PARAM = "hf-capture";
var EARLY_ERRORS_SCRIPT = `<script>(function(){var seen=window.${STUDIO_PREVIEW_ERRORS}=[];
addEventListener("error",function(e){seen.push(e.message||String(e))});})();</script>`;
function injectStudioPreviewAugmentations(html, adapter, projectDir, activeCompositionPath, capture) {
  const marked = capture ? html : injectTagsAtHeadStart(
    lazyPreviewImages(html),
    `<meta name="${STUDIO_PREVIEW_MARK_META}">${EARLY_ERRORS_SCRIPT}`
  );
  return injectStudioMotionScript(
    injectMotionPathPluginIfNeeded(
      injectGsapCdnFallback(
        injectProjectSignature(marked, resolveProjectSignature(adapter, projectDir))
      )
    ),
    projectDir,
    activeCompositionPath
  );
}
async function transformPreviewHtml(html, adapter, project, activeCompositionPath) {
  if (!adapter.transformPreviewHtml) return html;
  try {
    return await adapter.transformPreviewHtml({
      html,
      project,
      activeCompositionPath
    });
  } catch (err) {
    console.warn("[Studio] preview transform failed, using original HTML:", err);
    return html;
  }
}
function resolveProjectMainHtml(projectDir, projectId) {
  const indexPath = join8(projectDir, "index.html");
  const blockHtmlPath = join8(projectDir, `${projectId}.html`);
  recordPreviewRead(projectDir, indexPath);
  recordPreviewRead(projectDir, blockHtmlPath);
  if (existsSync5(indexPath)) {
    return {
      html: readFileSync7(indexPath, "utf-8"),
      compositionPath: "index.html"
    };
  }
  if (existsSync5(blockHtmlPath)) {
    return {
      html: readFileSync7(blockHtmlPath, "utf-8"),
      compositionPath: `${projectId}.html`
    };
  }
  return null;
}
var PREVIEW_BUNDLE_OPTIONS = {
  runtime: "placeholder",
  inlineAssets: false,
  staticGuard: false,
  sceneParts: true
};
var previewBaseHref = (projectId) => `/api/projects/${encodeURIComponent(projectId)}/preview/`;
var withPreviewBase = (html, projectId) => hasBaseElement(html) ? html : injectTagsAtHeadStart(html, `<base href="${previewBaseHref(projectId)}">`);
function registerPreviewRoutes(api, adapter) {
  const previewCacheHeaders = (etag) => ({
    "Cache-Control": "private, no-cache",
    ETag: etag
  });
  const mediaCodecProbeCache = resolvePreviewMediaCodecProbeCache(adapter);
  const builtPreviews = /* @__PURE__ */ new Map();
  const rememberPreview = (key, html) => {
    builtPreviews.delete(key);
    builtPreviews.set(key, html);
    if (builtPreviews.size > 4) builtPreviews.delete(builtPreviews.keys().next().value);
  };
  const previewBuilds = /* @__PURE__ */ new Map();
  async function buildPreview(project, previewVariables, builtKey, capture, signature) {
    const diskMain = resolveProjectMainHtml(project.dir, project.id);
    const bundledHtmlSources = /* @__PURE__ */ new Set([diskMain?.compositionPath ?? "index.html"]);
    try {
      let bundled = await adapter.bundle(project.dir, {
        stampHfIds: true,
        onRead: (filePath) => {
          recordPreviewRead(project.dir, filePath);
          if (extname(filePath).toLowerCase() === ".html") {
            bundledHtmlSources.add(relative4(project.dir, resolve5(project.dir, filePath)).split(sep2).join("/"));
          }
        }
      });
      let mainCompositionPath = "index.html";
      if (!bundled) {
        if (!diskMain) return null;
        bundled = ensureHfIds(diskMain.html);
        mainCompositionPath = diskMain.compositionPath;
      }
      bundled = withPreviewRuntime(bundled, adapter.runtimeUrl);
      recordPreviewReferences(project.dir, bundled);
      recordPreviewBuilt(project.dir);
      bundled = withPreviewBase(bundled, project.id);
      bundled = injectStudioPreviewAugmentations(
        ensureHfIds(await transformPreviewHtml(bundled, adapter, project, mainCompositionPath)),
        adapter,
        project.dir,
        mainCompositionPath,
        capture
      );
      if (previewVariables) bundled = injectPreviewVariables(bundled, previewVariables);
      bundled = await injectMediaCodecMap(
        bundled,
        adapter,
        project.dir,
        mainCompositionPath,
        mediaCodecProbeCache
      );
      bundled = injectTagsAtHeadStart(
        bundled,
        `<meta name="hyperframes-shader-cache-signature" content="${createProjectSignature(project.dir, bundledHtmlSources)}">`
      );
      bundled = addScenePartsManifest(bundled, [`meta[name="${PROJECT_SIGNATURE_META}"]`]);
      if (createProjectSignature(project.dir) === signature) {
        rememberPreview(builtKey, bundled);
        if (!capture) adapter.previewDocuments?.write(builtKey, bundled);
      }
      return bundled;
    } catch {
      const fallback = resolveProjectMainHtml(project.dir, project.id);
      if (fallback) {
        const fallbackHtml = withPreviewBase(
          withPreviewRuntime(ensureHfIds(fallback.html), adapter.runtimeUrl),
          project.id
        );
        let fallbackAugmented = injectStudioPreviewAugmentations(
          await transformPreviewHtml(fallbackHtml, adapter, project, fallback.compositionPath),
          adapter,
          project.dir,
          fallback.compositionPath,
          capture
        );
        if (previewVariables) {
          fallbackAugmented = injectPreviewVariables(fallbackAugmented, previewVariables);
        }
        fallbackAugmented = await injectMediaCodecMap(
          fallbackAugmented,
          adapter,
          project.dir,
          fallback.compositionPath,
          mediaCodecProbeCache
        );
        return fallbackAugmented;
      }
      return null;
    }
  }
  api.get("/projects/:id/preview", async (c) => {
    const resolved = await resolveProjectAndSignature(adapter, c.req.param("id"));
    if (!resolved) return c.json({ error: "not found" }, 404);
    const { project, signature } = resolved;
    const vars = previewVariablesFromRequest(c.req.query("variables"));
    if (vars.error !== void 0) return c.json({ error: vars.error }, 400);
    const previewVariables = vars.values;
    const capture = c.req.query(PREVIEW_CAPTURE_PARAM) !== void 0;
    const etag = `"preview:${signature}${variablesEtagSalt(vars.raw)}${capture ? ":capture" : ""}"`;
    const ifNoneMatch = c.req.header("If-None-Match");
    if (ifNoneMatch === etag) {
      return new Response(null, {
        status: 304,
        headers: previewCacheHeaders(etag)
      });
    }
    const builtKey = `${project.id}
${etag}`;
    const cached = builtPreviews.get(builtKey) ?? adapter.previewDocuments?.read(builtKey);
    if (cached) {
      rememberPreview(builtKey, cached);
      return c.html(cached, 200, previewCacheHeaders(etag));
    }
    let pending = previewBuilds.get(builtKey);
    if (!pending) {
      pending = buildPreview(project, previewVariables, builtKey, capture, signature).finally(
        () => previewBuilds.delete(builtKey)
      );
      previewBuilds.set(builtKey, pending);
    }
    const html = await pending;
    if (!html) return c.text("not found", 404);
    return c.html(html, 200, previewCacheHeaders(etag));
  });
  function pinSubCompHfIds(compFile, compPath) {
    if (!/\.html?$/i.test(compPath)) return void 0;
    try {
      return ensureHfIds(readFileSync7(compFile, "utf-8"));
    } catch {
      return null;
    }
  }
  api.get("/projects/:id/preview/comp/*", async (c) => {
    const resolved = await resolveProjectAndSignature(adapter, c.req.param("id"));
    if (!resolved) return c.json({ error: "not found" }, 404);
    const { project, signature } = resolved;
    const vars = previewVariablesFromRequest(c.req.query("variables"));
    if (vars.error !== void 0) return c.json({ error: vars.error }, 400);
    const previewVariables = vars.values;
    const compPath = requestSubPath(c.req.url, "projects/:id/preview/comp");
    const compFile = resolveWithinProject(project.dir, compPath);
    if (compFile) recordPreviewRead(project.dir, compFile);
    recordPreviewRead(project.dir, "index.html");
    if (!compFile || !existsSync5(compFile) || !statSync4(compFile).isFile()) {
      return c.text("not found", 404);
    }
    const compPathHash = createHash3("sha1").update(compPath).digest("hex");
    const capture = c.req.query(PREVIEW_CAPTURE_PARAM) !== void 0;
    const etag = `"comp:v2:${compPathHash}:${signature}${variablesEtagSalt(vars.raw)}${capture ? ":capture" : ""}"`;
    const ifNoneMatch = c.req.header("If-None-Match");
    if (ifNoneMatch === etag) {
      return new Response(null, {
        status: 304,
        headers: previewCacheHeaders(etag)
      });
    }
    const stamped = pinSubCompHfIds(compFile, compPath);
    if (stamped === null) return c.text("not found", 404);
    const baseHref = previewBaseHref(project.id);
    let html = buildSubCompositionHtml(
      project.dir,
      compPath,
      adapter.runtimeUrl,
      baseHref,
      stamped
    );
    if (!html) return c.text("not found", 404);
    recordPreviewReferences(project.dir, html);
    html = ensureHfIds(await transformPreviewHtml(html, adapter, project, compPath));
    html = injectStudioPreviewAugmentations(html, adapter, project.dir, compPath, capture);
    if (previewVariables) html = injectPreviewVariables(html, previewVariables);
    html = await injectMediaCodecMap(html, adapter, project.dir, compPath, mediaCodecProbeCache);
    return c.html(html, 200, previewCacheHeaders(etag));
  });
  api.get("/projects/:id/preview/*", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const subPath = requestSubPath(c.req.url, "projects/:id/preview");
    const candidate = resolve5(project.dir, subPath);
    const file = isWithinProjectRoot(project.dir, candidate) ? candidate : null;
    if (!file || isPrivateProjectFile(project.dir, file)) {
      return c.text("not found", 404);
    }
    recordPreviewRead(project.dir, file);
    const stat2 = existsSync5(file) ? statSync4(file) : null;
    if (!stat2?.isFile()) {
      return c.text("not found", 404);
    }
    const contentType = getMimeType(subPath);
    const isText = /\.(html|css|js|json|svg|txt|md|cube)$/i.test(subPath);
    const proxyParam = c.req.query("hf-proxy");
    let proxyVariant;
    if (proxyParam !== void 0) {
      if (!isProxyVariantRequest(proxyParam) || !contentType.startsWith("video/") || !isAutoProxyEnabled(adapter)) {
        return c.text("not found", 404);
      }
      const facts = await probeAssetCodec(file, void 0, mediaCodecProbeCache);
      const eligibility = decideMediaProxyEligibility(facts);
      if (!eligibility.eligible) {
        return c.text(`media proxy unavailable: ${eligibility.reason}`, 422);
      }
      if (!facts) return c.text("media proxy unavailable: unknown_codec", 422);
      proxyVariant = resolveProxyVariantRequest(proxyParam, facts) ?? void 0;
      if (!proxyVariant) {
        return c.text("media proxy variant does not match asset", 422);
      }
    }
    const tag = settledFileTag(stat2);
    const etag = tag && `"${tag}${proxyEtagSalt(proxyVariant)}"`;
    const cacheHeaders = isText ? { "Cache-Control": "no-store" } : { "Cache-Control": "private, no-cache", ...etag && { ETag: etag } };
    if (!isText && etag) {
      const ifNoneMatch = c.req.header("If-None-Match");
      if (ifNoneMatch === etag) {
        return new Response(null, { status: 304, headers: cacheHeaders });
      }
    }
    let servedPath = file;
    let servedContentType = contentType;
    if (proxyVariant !== void 0) {
      try {
        servedPath = await waitForProxy(resolveProxy(project.dir, file, proxyVariant), 0);
      } catch (err) {
        if (err instanceof ProxyWaitTimeoutError) {
          return c.text("media proxy is being made", 202, {
            "Retry-After": String(PROXY_PENDING_RETRY_AFTER_SECONDS),
            "Cache-Control": "no-store"
          });
        }
        if (err instanceof ProxyCapacityError) {
          return c.text(err.message, 503, { "Retry-After": "5" });
        }
        if (isProjectRootMissing(err)) throw err;
        const message = err instanceof ProxyTranscodeError ? err.message : "proxy transcode failed";
        return c.text(message, 502);
      }
      recordProxyRequest();
      servedContentType = PROXY_VARIANT_CONFIG[proxyVariant].contentType;
    }
    const textBuffer = isText ? Buffer.from(readFileSync7(file, "utf-8"), "utf-8") : null;
    const totalSize = textBuffer ? textBuffer.length : statSync4(servedPath).size;
    const bodyFor = (start, end) => textBuffer ? new Uint8Array(textBuffer.subarray(start, end + 1)) : (
      // Node's web stream type and the DOM one do not overlap for tsc on
      // every platform's lib set; the double cast is the documented bridge.
      Readable.toWeb(
        createReadStream(servedPath, { start, end })
      )
    );
    const rangeHeader = c.req.header("Range");
    const match = rangeHeader ? /bytes=(\d+)-(\d*)/.exec(rangeHeader) : null;
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : totalSize - 1;
      const safeEnd = Math.min(end, totalSize - 1);
      if (start > safeEnd) {
        return new Response(null, {
          status: 416,
          headers: { ...cacheHeaders, "Content-Range": `bytes */${totalSize}` }
        });
      }
      return new Response(bodyFor(start, safeEnd), {
        status: 206,
        headers: {
          ...cacheHeaders,
          "Content-Type": servedContentType,
          "Content-Range": `bytes ${start}-${safeEnd}/${totalSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(safeEnd - start + 1)
        }
      });
    }
    return new Response(totalSize > 0 ? bodyFor(0, totalSize - 1) : null, {
      headers: {
        ...cacheHeaders,
        "Content-Type": servedContentType,
        "Accept-Ranges": "bytes",
        "Content-Length": String(totalSize)
      }
    });
  });
}

// ../core/dist/registry/gsapRuntime.js
var GSAP_RUNTIME_PATTERN = /\bgsap\.(?:timeline|to|from|fromTo|set)\b|\/gsap@[\d.]+/i;
var GSAP_PLUGIN_PATTERNS = [
  ["ScrollTrigger", /\bScrollTrigger\b/],
  ["ScrollSmoother", /\bScrollSmoother\b/],
  ["ScrollToPlugin", /\bScrollToPlugin\b/],
  ["SplitText", /\bSplitText\b/],
  ["ScrambleTextPlugin", /\bScrambleTextPlugin\b/],
  ["TextPlugin", /\bTextPlugin\b/],
  ["DrawSVGPlugin", /\bDrawSVGPlugin\b/],
  ["MorphSVGPlugin", /\bMorphSVGPlugin\b/],
  ["MotionPathPlugin", /\bMotionPathPlugin\b/],
  ["MotionPathHelper", /\bMotionPathHelper\b/],
  ["Flip", /\bgsap\.registerPlugin\([^)]*\bFlip\b/],
  ["Draggable", /\bDraggable\b/],
  ["InertiaPlugin", /\bInertiaPlugin\b/],
  ["Observer", /\bObserver\b/],
  ["Physics2DPlugin", /\bPhysics2DPlugin\b/],
  ["PhysicsPropsPlugin", /\bPhysicsPropsPlugin\b/],
  ["GSDevTools", /\bGSDevTools\b/],
  ["EaselPlugin", /\bEaselPlugin\b/],
  ["PixiPlugin", /\bPixiPlugin\b/],
  ["RoughEase", /\bRoughEase\b/],
  ["ExpoScaleEase", /\bExpoScaleEase\b/],
  ["SlowMo", /\bSlowMo\b/],
  ["CustomEase", /\bCustomEase\b/],
  ["CustomBounce", /\bCustomBounce\b/],
  ["CustomWiggle", /\bCustomWiggle\b/]
];
function resolveGsapRegistryItemEngine(item, runtimeSources) {
  if (item.engine)
    return item.engine;
  const runtime = runtimeSources.join("\n");
  if (!GSAP_RUNTIME_PATTERN.test(runtime))
    return void 0;
  const version = runtime.match(/\/gsap@(?<version>\d+(?:\.\d+){1,2})/i)?.groups?.version;
  const plugins = GSAP_PLUGIN_PATTERNS.filter(([, pattern]) => pattern.test(runtime)).map(([name]) => name);
  return {
    name: "gsap",
    ...version ? { version } : {},
    seekable: /\bhf-seek\b|timeline\s*\(\s*\{\s*paused:\s*true/i.test(runtime),
    ...plugins.length ? { plugins } : {}
  };
}

// ../core/dist/registry/componentContent.js
function isComponentContentModel(v) {
  if (!object(v) || typeof v.type !== "string" || typeof v.title !== "string" || typeof v.duration !== "number" || !Number.isFinite(v.duration) || v.duration <= 0 || typeof v.kind !== "string" || !object(v.rows) || !object(v.defaults) || !object(v.lookDefaults) || !Array.isArray(v.vars))
    return false;
  const r = v.rows;
  const field = (f) => object(f) && typeof f.id === "string" && /^[A-Za-z][A-Za-z0-9_-]*$/.test(f.id) && (f.field === void 0 || typeof f.field === "string" && f.field.split(".").every((k) => !["__proto__", "prototype", "constructor"].includes(k)));
  return typeof r.variable === "string" && typeof r.label === "string" && typeof r.min === "number" && typeof r.max === "number" && Number.isInteger(r.min) && Number.isInteger(r.max) && r.min >= 1 && r.max >= r.min && r.max <= 48 && Array.isArray(r.columns) && r.columns.length <= 128 && r.columns.every(field) && v.vars.length <= 128 && v.vars.every(field) && Object.values(v.defaults).every((x) => typeof x === "string" || typeof x === "boolean" || typeof x === "number" && Number.isFinite(x)) && (typeof r.field === "string" || Array.isArray(r.keys) && r.keys.every((k) => typeof k === "string"));
}
var ALIAS = { hl: "highlighted", sub: "subtitle", desc: "description" };
var COPY = { eyebrow: "copyEyebrow", title: "copyTitle", subtitle: "copySubtitle", note: "copyNote" };
var ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,31}$/;
var LAYOUTS = ["full", "card", "poster"];
var SKINS = ["keynote", "cinematic", "dot", "editorial"];
var CAMERAS = ["auto", "steady", "overhead", "dimension", "focus"];
var isIndex = (s) => /^\d+$/.test(s);
var seg = (s) => ALIAS[s] ?? s;
var pathOf = (f) => /\.\d+\.\d+$/.test(f.field ?? "") ? [f.id] : (f.field ?? f.id).split(".").map(seg);
var object = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
var width = (s) => Array.from(s).reduce((n, ch) => n + ((ch.codePointAt(0) ?? 0) > 11904 ? 1 : 0.55), 0);
var pointer = (path) => "/" + path.map((s) => s.replaceAll("~", "~0").replaceAll("/", "~1")).join("/");
var get = (v, path) => path.reduce((x, k) => Array.isArray(x) ? x[Number(k)] : object(x) ? x[k] : void 0, v);
function set(root, path, value) {
  let node = root;
  for (let i = 0; i < path.length; i++) {
    const k = path[i];
    if (k === void 0)
      return;
    if (i === path.length - 1) {
      Reflect.set(node, k, value);
      return;
    }
    let child = Reflect.get(node, k);
    if (!object(child) && !Array.isArray(child)) {
      child = isIndex(path[i + 1] ?? "") ? [] : {};
      Reflect.set(node, k, child);
    }
    if (object(child) || Array.isArray(child))
      node = child;
  }
}
function merge(base, patch) {
  if (!object(patch))
    return patch;
  const out = object(base) ? { ...base } : {};
  for (const [k, v] of Object.entries(patch))
    out[k] = merge(out[k], v);
  return out;
}
function parseComponentTextList(value, separators) {
  if (value.trimStart().startsWith("[")) {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || !parsed.every((s) => typeof s === "string")) {
      throw Error("List must be a JSON array of texts");
    }
    return parsed;
  }
  return Array.from(value, (ch) => separators.includes(ch) ? "\n" : ch).join("").split("\n").map((s) => s.trim()).filter(Boolean);
}
function rowsOf(model, values) {
  const raw = JSON.parse(String(values[model.rows.variable] ?? ""));
  if (!object(raw) || raw.version !== 1 || raw.kind !== model.kind || !Array.isArray(raw.rows) || !raw.rows.every(object)) {
    throw Error("Data document does not match this component");
  }
  return raw.rows;
}
function columnsOf(model) {
  return model.rows.columns.map((c) => ({ c, path: (c.field ?? c.id).includes(".") ? (c.field ?? c.id).split(".").map(seg) : [seg((c.field ?? c.id) === "id" ? "id" : c.id)] }));
}
function decode(f, raw) {
  if (f.bool)
    return raw === "yes" || raw === true;
  if (f.json)
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  if (f.list)
    return parseComponentTextList(String(raw), f.list.separators);
  if (f.type === "number")
    return typeof raw === "number" ? raw : Number(raw);
  if (f.level && /^[012]$/.test(String(raw)))
    return Number(raw);
  return raw;
}
function compact(v) {
  if (Array.isArray(v))
    return v.filter((x) => x !== void 0 && !(object(x) && Object.values(x).every((y) => typeof y === "boolean"))).map(compact);
  return object(v) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, compact(x)])) : v;
}
function toJSON(model, overrides) {
  const values = { ...model.defaults, ...overrides }, content = {};
  const rows = rowsOf(model, values), cols = columnsOf(model);
  const items = rows.map((row) => {
    const item = { id: row.id };
    for (const { c, path } of cols) {
      const raw = row[c.id];
      if (raw !== void 0 && raw !== "")
        set(item, path, decode(c, raw));
    }
    return compact(item);
  });
  if (model.rows.keys)
    model.rows.keys.forEach((key, i) => set(content, key.split(".").map(seg), items[i]));
  else
    set(content, (model.rows.field ?? model.rows.variable).split(".").map(seg), items);
  for (const f of model.vars) {
    if (Object.values(COPY).includes(f.id))
      continue;
    const raw = values[f.id];
    if (raw !== void 0 && (raw !== "" || f.bool))
      set(content, pathOf(f), decode(f, raw));
  }
  const result = { content };
  const copy = Object.fromEntries(Object.entries(COPY).filter(([, id]) => values[id] !== void 0 && values[id] !== model.copyDefaults?.[id]).map(([k, id]) => [k, values[id]]));
  if (Object.keys(copy).length)
    result.copy = copy;
  const cues = JSON.parse(String(values.motionCueTimes ?? "{}"));
  if (!object(cues))
    throw Error("Timing must be an object");
  const timing2 = Object.fromEntries(Object.entries(cues).map(([k, t]) => {
    const step = /^step-(\d+)$/.exec(k);
    return [step ? String(rows[Number(step[1]) - 1]?.id ?? k) : k, t];
  }));
  if (Object.keys(timing2).length)
    result.timing = timing2;
  const look = Object.fromEntries(["layout", "skin", "camera"].filter((k) => values[k] !== void 0 && values[k] !== model.lookDefaults[k]).map((k) => [k, values[k]]));
  if (Object.keys(look).length)
    result.look = look;
  return result;
}
var objectSchema = () => ({ type: "object", additionalProperties: false, properties: {} });
function fieldSchema(model, f) {
  const description = f.labelZh ?? f.label ?? f.id;
  const text3 = {
    type: "string",
    description,
    ...f.budget ? { widthBudget: f.budget } : {},
    ...f.maxLength ? { maxLength: f.maxLength } : {}
  };
  if (f.bool)
    return { type: "boolean", description };
  if (f.json)
    return { ...f.jsonSchema, description: f.description ?? description };
  if (f.type === "number")
    return {
      type: f.integer ? "integer" : "number",
      description,
      ...f.min !== void 0 ? { minimum: f.min } : {},
      ...f.max !== void 0 ? { maximum: f.max } : {}
    };
  if (f.list)
    return { type: "array", maxItems: f.list.maxItems, items: { ...text3, minLength: 1, maxLength: f.list.itemMaxLength } };
  if (f.level)
    return { oneOf: [{ enum: [0, 1, 2] }, text3], description };
  if (f.icon)
    return { ...text3, enum: model.icons };
  if (f.options)
    return { ...text3, enum: f.options.map((o) => o.value) };
  return text3;
}
function place(root, path, leaf, required = false) {
  let node = root;
  for (let i = 0; i < path.length; i++) {
    const k = path[i];
    if (k === void 0 || isIndex(k))
      continue;
    node.properties ??= {};
    if (i === path.length - 1) {
      const previous = node.properties[k];
      node.properties[k] = previous && previous.type === "string" && leaf.type === "string" ? {
        ...leaf,
        widthBudget: Math.max(previous.widthBudget ?? 0, leaf.widthBudget ?? 0) || void 0,
        maxLength: Math.max(previous.maxLength ?? 0, leaf.maxLength ?? 0) || void 0
      } : leaf;
      if (required)
        node.required = [.../* @__PURE__ */ new Set([...node.required ?? [], k])];
      return;
    }
    const next = path[i + 1];
    if (next !== void 0 && isIndex(next)) {
      const arr = node.properties[k] ??= { type: "array", minItems: 0, maxItems: 0, items: objectSchema() };
      arr.maxItems = Math.max(arr.maxItems ?? 0, Number(next) + 1);
      if (i + 2 === path.length) {
        arr.items = leaf;
        arr.minItems = arr.maxItems;
        return;
      }
      node = arr.items ??= objectSchema();
    } else
      node = node.properties[k] ??= objectSchema();
  }
}
function schema(model) {
  const item = objectSchema();
  place(item, ["id"], { type: "string", pattern: ID.source }, true);
  for (const { c, path } of columnsOf(model))
    place(item, path, fieldSchema(model, c), c.required);
  const children = (node) => {
    for (const child of Object.values(node.properties ?? {})) {
      if (child.type === "array" && child.items?.properties) {
        const label = ["label", "title"].find((k) => child.items?.properties?.[k]);
        if (label)
          child.items.required = [.../* @__PURE__ */ new Set([...child.items.required ?? [], label])];
        if (model.type === "architecture" && child.items.properties?.id) {
          child.items.properties.id = { type: "string", pattern: ID.source };
          child.items.required = [.../* @__PURE__ */ new Set([...child.items.required ?? [], "id"])];
        }
        child.minItems = model.type === "architecture" || model.type === "orbit" || model.rows.keys ? 1 : 0;
        children(child.items);
      } else
        children(child);
    }
  };
  children(item);
  if (model.type === "radial" && item.properties?.children)
    item.properties.children.minItems = 2;
  const content = objectSchema();
  if (model.rows.keys)
    model.rows.keys.forEach((k) => place(content, k.split(".").map(seg), item));
  else
    place(content, (model.rows.field ?? model.rows.variable).split(".").map(seg), { type: "array", minItems: model.rows.min, maxItems: model.rows.max, items: item });
  for (const f of model.vars)
    if (!Object.values(COPY).includes(f.id))
      place(content, pathOf(f), fieldSchema(model, f), f.required);
  if (model.type === "disc" && content.properties?.groups) {
    const notItems = model.vars.find((f) => f.id === "notItems");
    content.properties.groups = { type: "array", minItems: 2, maxItems: 2, prefixItems: [
      { ...objectSchema(), properties: { title: { type: "string" }, segments: notItems ? fieldSchema(model, notItems) : { type: "array", items: { type: "string" }, maxItems: 3 } } },
      { ...objectSchema(), properties: { title: { type: "string" }, segments: { type: "array", minItems: model.rows.min, maxItems: model.rows.max, items: item } } }
    ] };
  }
  const fixed = (node) => {
    for (const child of Object.values(node.properties ?? {})) {
      if (child.type === "array" && child.items?.properties && (child.maxItems ?? 0) > 0) {
        child.minItems = child.maxItems;
        fixed(child.items);
      } else if (child.properties)
        fixed(child);
    }
  };
  const scalarRoots = new Set(model.vars.filter((f) => !f.json && !f.list && !Object.values(COPY).includes(f.id)).map((f) => pathOf(f)[0]));
  const rowRoot = model.rows.keys ? null : (model.rows.field ?? model.rows.variable).split(".")[0];
  for (const k of scalarRoots)
    if (k && k !== rowRoot && !model.rows.keys?.includes(k)) {
      const node = content.properties?.[k];
      if (node?.type === "array" && node.items?.properties) {
        node.minItems = node.maxItems;
        fixed(node.items);
      } else if (node)
        fixed(node);
    }
  const copy = objectSchema();
  for (const [k, limit] of Object.entries({ eyebrow: 12, title: 14, subtitle: 60, note: 40 }))
    place(copy, [k], { type: "string", widthBudget: limit });
  return {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: `${model.title} (${model.type})`,
    ...objectSchema(),
    properties: {
      content,
      copy,
      timing: { type: "object", additionalProperties: { type: "number", minimum: 0 } },
      look: { ...objectSchema(), properties: { layout: { enum: LAYOUTS }, skin: { enum: SKINS }, camera: { enum: model.focus ? CAMERAS : CAMERAS.filter((c) => c !== "focus") } } }
    }
  };
}
function validate(s, v, path, errors) {
  const err = (code, message, expected) => errors.push({ path: pointer(path), code, message, actual: v, expected });
  if (s.oneOf) {
    if (!s.oneOf.some((choice) => {
      const e = [];
      validate(choice, v, path, e);
      return !e.length;
    }))
      err("invalid_value", "Use a supported value");
    return;
  }
  if (s.enum && !s.enum.includes(typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? v : ""))
    err("invalid_value", `Use one of: ${s.enum.join(", ")}`, s.enum);
  if (s.type === "object") {
    if (!object(v)) {
      err("not_object", "Use an object");
      return;
    }
    for (const k of s.required ?? [])
      if (v[k] === void 0 || v[k] === "")
        errors.push({ path: pointer([...path, k]), code: "required", message: `${k} is required` });
    for (const [k, x] of Object.entries(v)) {
      const child = s.properties && Object.hasOwn(s.properties, k) ? s.properties[k] : void 0;
      if (child)
        validate(child, x, [...path, k], errors);
      else if (s.additionalProperties === false)
        errors.push({ path: pointer([...path, k]), code: "unknown_field", message: `Unknown field ${k}; use ${Object.keys(s.properties ?? {}).join(", ")}` });
      else if (object(s.additionalProperties))
        validate(s.additionalProperties, x, [...path, k], errors);
    }
  } else if (s.type === "array") {
    if (!Array.isArray(v)) {
      err("not_array", "Use an array");
      return;
    }
    if (v.length < (s.minItems ?? 0) || v.length > (s.maxItems ?? Infinity))
      err("item_count", `This layout holds ${s.minItems ?? 0}\u2013${s.maxItems ?? "\u221E"} items; shorten or split into another scene`, { min: s.minItems, max: s.maxItems });
    v.forEach((x, i) => {
      const child = s.prefixItems?.[i] ?? s.items;
      if (child)
        validate(child, x, [...path, String(i)], errors);
    });
  } else if (s.type === "string") {
    if (typeof v !== "string") {
      err("not_text", "Use text");
      return;
    }
    if (s.minLength && !v.trim())
      err("required", "Text must not be empty");
    if (s.maxLength !== void 0 && Array.from(v).length > s.maxLength || s.widthBudget !== void 0 && width(v) > s.widthBudget)
      err("too_long", `Shorten text to fit this layout (width \u2264 ${s.widthBudget ?? s.maxLength}; English letters use about half a unit)`, { max: s.widthBudget ?? s.maxLength });
    if (s.pattern && !new RegExp(s.pattern).test(v))
      err("invalid_id", "Use a short ASCII id (letters, numbers, - or _)");
  } else if (s.type === "number" || s.type === "integer") {
    if (typeof v !== "number" || !Number.isFinite(v)) {
      err("not_number", "Use a finite number");
      return;
    }
    if (s.type === "integer" && !Number.isInteger(v))
      err("not_integer", "Use an integer");
    if (v < (s.minimum ?? -Infinity) || v > (s.maximum ?? Infinity))
      err("out_of_range", `Use a value between ${s.minimum ?? "\u2212\u221E"} and ${s.maximum ?? "\u221E"}`);
  } else if (s.type === "boolean" && typeof v !== "boolean")
    err("not_boolean", "Use true or false");
}
function contentRows(model, content) {
  const raw = model.rows.keys ? model.rows.keys.map((k) => get(content, k.split(".").map(seg))) : get(content, (model.rows.field ?? model.rows.variable).split(".").map(seg));
  return Array.isArray(raw) ? raw.filter(object) : [];
}
function semantic(model, content, errors) {
  const rows = contentRows(model, content), root = model.rows.keys ? [] : (model.rows.field ?? model.rows.variable).split(".").map(seg);
  const issue = (path, code, message) => errors.push({ path: pointer(["content", ...path]), code, message });
  const ids = rows.map((r) => r.id), seen = /* @__PURE__ */ new Set();
  rows.forEach((r, i) => {
    if (seen.has(r.id))
      issue([...root, String(i), "id"], "duplicate_id", "Item ids must be unique");
    seen.add(r.id);
  });
  const links = (key, allowed, max, min = 0, self = false, ordered = false, dag = false) => {
    const raw = get(content, [key]);
    if (!Array.isArray(raw))
      return;
    if (raw.length < min || raw.length > max)
      issue([key], "item_count", `${key} holds ${min}\u2013${max} relations`);
    const pairs = /* @__PURE__ */ new Set(), adjacency = /* @__PURE__ */ new Map();
    raw.forEach((l, i) => {
      if (!object(l))
        return;
      for (const end of ["from", "to"])
        if (!allowed.includes(l[end]))
          issue([key, String(i), end], "unknown_reference", `No item with id ${String(l[end])}; use ${allowed.join(", ")}`);
      if (!self && l.from === l.to)
        issue([key, String(i)], "self_relation", "A relation must connect two different items");
      const pair = `${String(l.from)}>${String(l.to)}`;
      if (pairs.has(pair))
        issue([key, String(i)], "duplicate_relation", "Each direction of a pair may appear once");
      pairs.add(pair);
      if (ordered && allowed.indexOf(l.from) >= allowed.indexOf(l.to))
        issue([key, String(i)], "backward_relation", "Connect an earlier layer to a later layer");
      adjacency.set(l.from, [...adjacency.get(l.from) ?? [], l.to]);
    });
    if (dag) {
      const visiting = /* @__PURE__ */ new Set(), visited = /* @__PURE__ */ new Set();
      const cyclic = (id) => {
        if (visiting.has(id))
          return true;
        if (visited.has(id))
          return false;
        visiting.add(id);
        if ((adjacency.get(id) ?? []).some(cyclic))
          return true;
        visiting.delete(id);
        visited.add(id);
        return false;
      };
      if (allowed.some(cyclic))
        issue([key], "cycle", "Pipeline dependencies must not contain a cycle");
    }
  };
  if (model.type === "state") {
    if (!ids.includes(get(content, ["initial"])))
      issue(["initial"], "unknown_reference", "Initial must name an existing state id");
    links("transitions", ids, 10, 1, true);
  }
  if (model.type === "swimlane") {
    const occupied = /* @__PURE__ */ new Set();
    rows.forEach((r, i) => {
      const slot = `${String(r.lane)}@${String(r.col)}`;
      if (occupied.has(slot))
        issue([...root, String(i), "col"], "occupied_slot", "One step per lane and column");
      occupied.add(slot);
    });
    links("links", ids, 8);
  }
  if (model.type === "pipeline")
    links("links", ids, 10, 1, false, false, true);
  if (model.type === "architecture") {
    const nodes = rows.flatMap((r) => Array.isArray(r.nodes) ? r.nodes.filter(object) : []), nodeIds = nodes.map((n) => n.id);
    if (new Set(nodeIds).size !== nodeIds.length)
      issue([...root], "duplicate_id", "Architecture node ids must be globally unique");
    links("links", nodeIds, 12);
    const layerOf = (id) => rows.findIndex((r) => Array.isArray(r.nodes) && r.nodes.some((n) => object(n) && n.id === id));
    const raw = get(content, ["links"]);
    if (Array.isArray(raw))
      raw.forEach((l, i) => {
        if (object(l) && layerOf(l.from) > layerOf(l.to))
          issue(["links", String(i)], "backward_relation", "Architecture links must run within a layer or to a later layer");
      });
  }
  if (model.type === "roadmap")
    rows.forEach((r, i) => {
      if (typeof r.end === "number" && typeof r.start === "number" && r.end <= r.start)
        issue([...root, String(i), "end"], "invalid_interval", "End must be after start; omit end for a milestone");
    });
  if (model.type === "loops")
    rows.forEach((r, i) => {
      if (Number(r.from) >= Number(r.to))
        issue([...root, String(i), "to"], "invalid_interval", "End stage must follow the start stage (0\u20135)");
    });
  if (model.type === "timeline" && rows.filter((r) => r.current === true).length > 1)
    issue(root, "multiple_current", "Mark at most one milestone as current");
  if (model.type === "valley")
    rows.forEach((r, i) => {
      if (i && Number(r.x) <= Number(rows[i - 1]?.x))
        issue([...root, String(i), "x"], "out_of_order", "x must strictly increase in reading order");
    });
  if (model.type === "scurve") {
    rows.forEach((r, i) => {
      if (r.curve === 2 && get(content, ["second"]) === false)
        issue([...root, String(i), "curve"], "hidden_curve", "Enable second before assigning a phase to curve 2");
    });
  }
}
function timing(model, input, rows, values, errors) {
  if (!object(input))
    return;
  const ids = rows.map((r) => r.id), factor = { restrained: 1.15, balanced: 1, energetic: 0.85 }[String(values.motionStyle)] ?? 1;
  const beat = 1.4 * factor, times = rows.map((_, i) => 0.6 + 1.4 * i), anchors = [];
  const error = (id, message) => errors.push({ path: pointer(["timing", id]), code: "timing", message });
  for (const [k, t] of Object.entries(input)) {
    if (k === "resolve") {
      if (!model.resolve)
        error(k, "This component has no conclusion");
      continue;
    }
    const i = ids.indexOf(k);
    if (i < 0) {
      error(k, `No item with id ${k}`);
      continue;
    }
    if (typeof t === "number") {
      times[i] = t;
      anchors.push(i);
    }
  }
  anchors.sort((a, b) => a - b);
  if (anchors.length)
    for (let i = 0; i < times.length; i++) {
      if (anchors.includes(i))
        continue;
      const prev = anchors.filter((k) => k < i).at(-1), next = anchors.find((k) => k > i);
      if (prev === void 0 && next !== void 0)
        times[i] = Math.min(times[i] ?? 0, (times[next] ?? 0) - (next - i) * beat);
      else if (prev !== void 0 && next === void 0)
        times[i] = (times[prev] ?? 0) + (i - prev) * beat;
      else if (prev !== void 0 && next !== void 0)
        times[i] = (times[prev] ?? 0) + ((times[next] ?? 0) - (times[prev] ?? 0)) * (i - prev) / (next - prev);
    }
  times.forEach((t, i) => {
    if (t < 0 || t + beat > model.duration - 1 + 1e-3 || i && t < (times[i - 1] ?? 0) + beat - 1e-3)
      error(String(ids[i]), `Keep rows in order, ${beat.toFixed(2)}s per row, and 1s of full view before ${model.duration}s`);
  });
  const resolve10 = input.resolve;
  if (typeof resolve10 === "number" && (resolve10 < (times.at(-1) ?? 0) + 0.7 || resolve10 > model.duration - 1.6))
    error("resolve", "Conclusion must follow the final row and leave 1s for reading");
}
function fromJSON(model, input, current = model.defaults) {
  const errors = [], warnings = [], values = { ...model.defaults, ...current };
  if (!object(input))
    return { values: current, errors: [{ path: "", code: "not_object", message: "Submit { content?, copy?, timing?, look? }" }], warnings };
  const pending = [{ value: input, path: [] }];
  let visited = 0;
  while (pending.length) {
    const entry = pending.pop();
    if (!entry)
      break;
    if (++visited > 2048 || entry.path.length > 12)
      return { values: current, errors: [{ path: pointer(entry.path), code: "too_complex", message: "Shorten this object or split into scenes" }], warnings };
    if (object(entry.value) || Array.isArray(entry.value))
      for (const [k, value] of Object.entries(entry.value)) {
        if (["__proto__", "constructor", "prototype"].includes(k))
          errors.push({ path: pointer([...entry.path, k]), code: "unknown_field", message: `Unknown field ${k}` });
        pending.push({ value, path: [...entry.path, k] });
      }
  }
  if (errors.length)
    return { values: current, errors, warnings };
  let base;
  try {
    base = toJSON(model, values);
  } catch (e) {
    return { values: current, errors: [{ path: "", code: "invalid_current", message: e instanceof Error ? e.message : "Invalid current data" }], warnings };
  }
  const merged = merge(base, input);
  if (object(merged) && Object.hasOwn(input, "timing"))
    merged.timing = input.timing;
  validate(schema(model), merged, [], errors);
  if (!object(merged))
    return { values: current, errors, warnings };
  semantic(model, merged.content, errors);
  const rows = contentRows(model, merged.content);
  timing(model, merged.timing ?? {}, rows, values, errors);
  if (errors.length)
    return { values: current, errors, warnings };
  const cols = columnsOf(model), stored = rows.map((item, i) => {
    const row = { id: item.id ?? `item-${i + 1}` };
    for (const { c, path } of cols) {
      const v = get(item, path);
      if (v === void 0)
        continue;
      row[c.id] = c.bool ? v ? "yes" : "no" : c.list ? JSON.stringify(v) : c.level && typeof v === "number" ? String(v) : v;
    }
    return row;
  });
  values[model.rows.variable] = JSON.stringify({ version: 1, kind: model.kind, rows: stored });
  for (const f of model.vars) {
    if (Object.values(COPY).includes(f.id))
      continue;
    const v = get(merged.content, pathOf(f));
    if (v === void 0) {
      if (!f.required)
        values[f.id] = "";
      continue;
    }
    if (f.json || f.list)
      values[f.id] = JSON.stringify(v);
    else if (f.bool)
      values[f.id] = v === true;
    else if (typeof v === "string" || typeof v === "number" || typeof v === "boolean")
      values[f.id] = v;
  }
  if (object(merged.copy)) {
    for (const [k, id] of Object.entries(COPY))
      if (typeof merged.copy[k] === "string")
        values[id] = merged.copy[k];
  }
  if (object(merged.look)) {
    for (const [k, v] of Object.entries(merged.look))
      if (typeof v === "string")
        values[k] = v;
  }
  values.motionCueTimes = JSON.stringify(merged.timing ?? {});
  return { values, errors, warnings };
}
function guide(model) {
  const r = model.rows;
  return [
    `${model.title} (${model.type})\uFF1A${model.desc ?? ""}`,
    `\u4E3B\u5217\u8868 ${r.keys ? r.keys.join(" / ") : r.field}\uFF1A${r.min}\uFF5E${r.max} \u4E2A\uFF1B\u6570\u7EC4\u987A\u5E8F\u5C31\u662F\u8BB2\u89E3\u987A\u5E8F\u3002`,
    "\u8BFB\u53D6\u5F53\u524D JSON \u548C revision\uFF1B\u53EA\u63D0\u4EA4\u8981\u6539\u7684\u5B57\u6BB5\uFF0C\u672A\u63D0\u4EA4\u5B57\u6BB5\u4FDD\u6301\u539F\u6837\uFF0C\u6570\u7EC4\u6574\u4F53\u66FF\u6362\u3002\u6BCF\u9879\u4FDD\u7559\u7A33\u5B9A\u82F1\u6587 id\u3002",
    `timing \u4F7F\u7528\u6761\u76EE id \u2192 \u79D2\uFF1B\u6BCF\u62CD\u81F3\u5C11 1.4s\uFF0C\u573A\u666F ${model.duration}s\uFF0C\u672B\u5C3E\u4FDD\u7559 1s\u3002${model.resolve ? "resolve \u662F\u7ED3\u8BBA\u65F6\u95F4\u3002" : "\u6B64\u56FE\u6CA1\u6709 resolve\u3002"}`,
    model.rules,
    "\u9075\u5B88 schema \u7684\u6570\u91CF\u3001\u5C42\u7EA7\u3001\u5F15\u7528\u548C\u6587\u5B57\u5BBD\u5EA6\uFF1B\u9519\u8BEF\u4F1A\u8FD4\u56DE\u51C6\u786E\u8DEF\u5F84\uFF0C\u4E0D\u88C1\u5207\u5185\u5BB9\u3002\u4E0D\u8981\u4F20\u989C\u8272\u3001\u50CF\u7D20\u6216\u52A8\u753B\u811A\u672C\u3002"
  ].filter(Boolean).join("\n");
}

// ../core/dist/registry/types.js
var VISUAL_COMPONENT_CATEGORIES = [
  "maps",
  "media",
  "business"
];
function resolveVisualComponentCategory(value) {
  if (typeof value !== "string")
    return null;
  const canonical = VISUAL_COMPONENT_CATEGORIES.find((category) => category === value);
  if (canonical)
    return canonical;
  switch (value) {
    case "interface":
      return "media";
    case "product":
      return "business";
    default:
      return null;
  }
}

// ../studio-server/src/helpers/registryPreview.ts
import { existsSync as existsSync6, readFileSync as readFileSync8, statSync as statSync5 } from "fs";
import { isAbsolute, join as join9, relative as relative5, resolve as resolve6 } from "path";
function resolveRegistryItem(registryRoot, itemName) {
  for (const subdir of ["blocks", "components"]) {
    const collectionRoot = resolve6(registryRoot, subdir);
    const itemRoot = resolve6(collectionRoot, itemName);
    const relativeItemPath = relative5(collectionRoot, itemRoot);
    if (!relativeItemPath || relativeItemPath.startsWith("..") || isAbsolute(relativeItemPath)) {
      continue;
    }
    const manifestPath = join9(itemRoot, "registry-item.json");
    if (!existsSync6(manifestPath)) continue;
    try {
      const item = JSON.parse(readFileSync8(manifestPath, "utf-8"));
      if (item.name === itemName && item.type !== "hyperframes:example") return { item, itemRoot };
    } catch {
      return null;
    }
  }
  return null;
}
function resolveItemFile(itemRoot, relativeFilePath) {
  const sourcePath = resolve6(itemRoot, relativeFilePath);
  const relativePath = relative5(itemRoot, sourcePath);
  if (!relativePath || relativePath.startsWith("..") || isAbsolute(relativePath)) return null;
  return existsSync6(sourcePath) && statSync5(sourcePath).isFile() ? sourcePath : null;
}
function previewMetric(html, name, fallback) {
  const match = new RegExp(`data-${name}=["']([0-9]+(?:\\.[0-9]+)?)["']`, "i").exec(html);
  const value = match ? Number(match[1]) : fallback;
  return Number.isFinite(value) && value > 0 ? value : fallback;
}
function previewFocusFor(item) {
  if (item.type === "hyperframes:component" && item.librarySection === "caption-animation") {
    return { x: 0.5, y: 0.78, zoom: 2.35 };
  }
  return void 0;
}
function loadRegistryPreviewFromRoot(registryRoot, blockName) {
  const resolved = resolveRegistryItem(registryRoot, blockName);
  if (!resolved) return null;
  const compositionPath = resolved.item.type === "hyperframes:block" ? resolved.item.files.find(
    (file) => file.type === "hyperframes:composition" && /\.html?$/i.test(file.path)
  )?.path : "demo.html";
  if (!compositionPath) return null;
  const sourcePath = resolveItemFile(resolved.itemRoot, compositionPath);
  if (!sourcePath) return null;
  const html = readFileSync8(sourcePath, "utf-8");
  const focus = previewFocusFor(resolved.item);
  return resolved.item.type === "hyperframes:block" ? { html, duration: resolved.item.duration, dimensions: resolved.item.dimensions } : {
    html,
    duration: previewMetric(html, "duration", 6),
    dimensions: {
      width: previewMetric(html, "width", 1920),
      height: previewMetric(html, "height", 1080)
    },
    ...focus ? { focus } : {}
  };
}
function loadRegistryPreviewAssetFromRoot(registryRoot, blockName, assetPath) {
  const resolved = resolveRegistryItem(registryRoot, blockName);
  if (!resolved) return null;
  const sourcePath = resolveItemFile(resolved.itemRoot, assetPath);
  if (!sourcePath) return null;
  return {
    body: new Uint8Array(readFileSync8(sourcePath)),
    contentType: getMimeType(sourcePath)
  };
}

// ../studio-server/src/createStudioApi.ts
import { Hono } from "hono";

// ../studio-server/src/routes/projects.ts
import { readFile } from "fs/promises";
import { join as join10 } from "path";
async function filterCompositionFiles(projectDir, files) {
  const htmlFiles = files.filter((f) => f.endsWith(".html") && !isInHiddenOrVendorDir(f));
  const checks = await Promise.all(
    htmlFiles.map(async (f) => {
      try {
        const content = await readFile(join10(projectDir, f), "utf-8");
        return isCompositionSource(content);
      } catch {
        return false;
      }
    })
  );
  return htmlFiles.filter((_, i) => checks[i]);
}
function registerProjectRoutes(api, adapter) {
  api.get("/projects", async (c) => {
    const projects = await adapter.listProjects();
    return c.json({ projects });
  });
  api.get("/resolve-session/:sessionId", async (c) => {
    if (!adapter.resolveSession) {
      return c.json({ error: "not available" }, 404);
    }
    const { sessionId } = c.req.param();
    const result = await adapter.resolveSession(sessionId);
    if (!result) return c.json({ error: "Session not found" }, 404);
    return c.json(result);
  });
  api.get("/projects/:id/signature", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    return c.json({ signature: resolveProjectSignature(adapter, project.dir) });
  });
  api.get("/projects/:id", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const files = walkDir(project.dir).filter((file) => !isPrivateProjectPath(file));
    const compositions = await filterCompositionFiles(project.dir, files);
    return c.json({ id: project.id, dir: project.dir, title: project.title, files, compositions });
  });
}

// ../studio-server/src/routes/lint.ts
import { readFileSync as readFileSync9 } from "fs";
import { join as join11 } from "path";
async function collectProjectFindings(adapter, projectDir) {
  const findings = [];
  const coveredFiles = /* @__PURE__ */ new Set();
  if (!adapter.lintProject) return { findings, coveredFiles };
  const result = await adapter.lintProject(projectDir);
  for (const entry of result.results) {
    coveredFiles.add(entry.file);
    for (const finding of entry.result.findings) {
      findings.push({ ...finding, file: entry.file });
    }
  }
  return { findings, coveredFiles };
}
async function lintUncoveredHtml(adapter, projectDir, htmlFiles, coveredFiles) {
  const findings = [];
  for (const file of htmlFiles) {
    if (coveredFiles.has(file)) continue;
    const content = readFileSync9(join11(projectDir, file), "utf-8");
    const result = await adapter.lint(content, { filePath: file, isSubComposition: true });
    for (const finding of result?.findings ?? []) {
      findings.push({ ...finding, file });
    }
  }
  return findings;
}
function registerLintRoutes(api, adapter) {
  api.get("/projects/:id/lint", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    try {
      const htmlFiles = walkDir(project.dir).filter(
        (f) => f.endsWith(".html") && !isInHiddenOrVendorDir(f)
      );
      const projectLint = await collectProjectFindings(adapter, project.dir);
      const extraFindings = await lintUncoveredHtml(
        adapter,
        project.dir,
        htmlFiles,
        projectLint.coveredFiles
      );
      return c.json({ findings: [...projectLint.findings, ...extraFindings] });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return c.json({ error: `Lint failed: ${msg}` }, 500);
    }
  });
}

// ../studio-server/src/routes/render.ts
import { streamSSE } from "hono/streaming";
import { existsSync as existsSync7, lstatSync as lstatSync3, readFileSync as readFileSync10, unlinkSync as unlinkSync3, readdirSync as readdirSync3, statSync as statSync6 } from "fs";
import { join as join12 } from "path";
var VALID_RESOLUTIONS = new Set(VALID_CANVAS_RESOLUTIONS);
function contentDispositionHeader(disposition, filename) {
  const fallback = filename.replace(/[^\x20-\x7e]|["\\]/g, "_");
  const encoded = encodeURIComponent(filename).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
  return `${disposition}; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}
function registerRenderRoutes(api, adapter) {
  const renderJobs = /* @__PURE__ */ new Map();
  const TTL_MS = 3e5;
  const CLEANUP_INTERVAL_MS = 6e4;
  const MAX_RENDER_JOBS = 256;
  let cleanupTimer = null;
  const cleanupFinishedJobs = () => {
    const now = Date.now();
    for (const [key, job] of renderJobs) {
      if (job.status !== "rendering" && now - job.createdAt > TTL_MS) {
        renderJobs.delete(key);
      }
    }
    const finishedOldestFirst = Array.from(renderJobs.entries()).filter(([, job]) => job.status !== "rendering").sort(([, left], [, right]) => left.createdAt - right.createdAt);
    while (renderJobs.size >= MAX_RENDER_JOBS && finishedOldestFirst.length > 0) {
      const oldest = finishedOldestFirst.shift();
      if (oldest) renderJobs.delete(oldest[0]);
    }
    if (renderJobs.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  };
  const ensureCleanupTimer = () => {
    if (cleanupTimer) return;
    cleanupTimer = setInterval(cleanupFinishedJobs, CLEANUP_INTERVAL_MS);
    if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
      cleanupTimer.unref();
    }
  };
  api.post("/projects/:id/render", async (c) => {
    cleanupFinishedJobs();
    if (renderJobs.size >= MAX_RENDER_JOBS) {
      return c.json({ error: "too many active render jobs" }, 429);
    }
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const body = await c.req.json().catch(() => ({}));
    const VALID_FORMATS = /* @__PURE__ */ new Set(["mp4", "webm", "mov"]);
    const FORMAT_EXT = { mp4: ".mp4", webm: ".webm", mov: ".mov" };
    const format = VALID_FORMATS.has(body.format ?? "") ? body.format : "mp4";
    const fpsParse = body.fps === void 0 ? null : parseFps(body.fps);
    const fps = fpsParse && fpsParse.ok ? fpsParse.value : { num: 30, den: 1 };
    const quality = ["draft", "standard", "high"].includes(body.quality ?? "") ? body.quality : "standard";
    const { outputResolution, outputResolutionAspectAgnostic } = resolveResolutionFlagPair(typeof body.resolution === "string" ? body.resolution : void 0);
    if (body.motionBlur !== void 0 && typeof body.motionBlur !== "boolean") {
      return c.json({ error: "motionBlur must be a boolean" }, 400);
    }
    const parseSize = (size) => typeof size?.width === "number" && typeof size?.height === "number" && Number.isInteger(size.width) && Number.isInteger(size.height) && size.width > 0 && size.height > 0 ? { width: size.width, height: size.height } : void 0;
    const outputSize = parseSize(body.outputSize);
    const captureSize = parseSize(body.captureSize);
    let composition;
    if (typeof body.composition === "string" && body.composition.length > 0) {
      if (!resolveWithinProject(project.dir, body.composition)) {
        if (folderGone(project.dir)) return projectDirMissing(c);
        return c.json({ error: "composition path must be within the project directory" }, 400);
      }
      composition = body.composition;
    }
    let variables;
    if (body.variables !== void 0) {
      if (!isVariablesPayload(body.variables)) {
        return c.json({ error: VARIABLES_PAYLOAD_ERROR }, 400);
      }
      variables = body.variables;
    }
    const now = /* @__PURE__ */ new Date();
    const jobId = `${project.id}_${formatRenderOutputTimestamp(now)}`;
    const rendersDir = adapter.rendersDir(project);
    mkdirWithinProject(project.dir, rendersDir);
    const ext = FORMAT_EXT[format] ?? ".mp4";
    const outputPath = join12(rendersDir, `${jobId}${ext}`);
    const jobState = adapter.startRender({
      project,
      outputPath,
      format,
      fps,
      quality,
      jobId,
      outputResolution,
      outputResolutionAspectAgnostic,
      motionBlur: body.motionBlur,
      outputSize,
      captureSize,
      composition,
      variables,
      distinctId: typeof body.telemetryDistinctId === "string" ? body.telemetryDistinctId : void 0,
      telemetryOptOut: body.telemetryOptOut === true
    });
    jobState.createdAt = Date.now();
    renderJobs.set(jobId, jobState);
    ensureCleanupTimer();
    return c.json({ jobId, status: "rendering" });
  });
  api.get("/render/:jobId/progress", (c) => {
    const { jobId } = c.req.param();
    const job = renderJobs.get(jobId);
    if (!job) return c.json({ error: "not found" }, 404);
    return streamSSE(c, async (stream) => {
      while (true) {
        const current = renderJobs.get(jobId);
        if (!current) break;
        await stream.writeSSE({
          event: "progress",
          data: JSON.stringify({
            progress: current.progress,
            status: current.status,
            stage: current.stage,
            error: current.error,
            ...current.status === "complete" && current.audioLoweredDb !== void 0 ? { audioLoweredDb: current.audioLoweredDb } : {}
          })
        });
        if (current.status !== "rendering") break;
        await stream.sleep(500);
      }
    });
  });
  api.post("/render/:jobId/cancel", (c) => {
    const { jobId } = c.req.param();
    const job = renderJobs.get(jobId);
    if (!job) return c.json({ error: "not found" }, 404);
    if (job.status === "rendering") {
      job.status = "cancelled";
      job.cancel?.();
    }
    return c.json({ status: job.status });
  });
  const RENDER_MIME = {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime"
  };
  const RENDER_EXTENSIONS = Object.keys(RENDER_MIME);
  const isPlainFile = (path) => {
    try {
      return lstatSync3(path).isFile();
    } catch {
      return false;
    }
  };
  function renderContentType(filePath) {
    const ext = RENDER_EXTENSIONS.find((e) => filePath.endsWith(e));
    return (ext && RENDER_MIME[ext]) ?? "video/mp4";
  }
  api.get("/render/:jobId/view", (c) => {
    const { jobId } = c.req.param();
    const job = renderJobs.get(jobId);
    if (!job?.outputPath || !isPlainFile(job.outputPath)) {
      return c.json({ error: "not found" }, 404);
    }
    const contentType = renderContentType(job.outputPath);
    const filename = job.outputPath.split("/").pop() ?? `render.mp4`;
    const content = readFileSync10(job.outputPath);
    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDispositionHeader("inline", filename),
        "Accept-Ranges": "bytes",
        "Content-Length": String(content.length)
      }
    });
  });
  api.get("/render/:jobId/download", (c) => {
    const { jobId } = c.req.param();
    const job = renderJobs.get(jobId);
    if (!job?.outputPath || !isPlainFile(job.outputPath)) {
      return c.json({ error: "not found" }, 404);
    }
    const contentType = renderContentType(job.outputPath);
    const filename = job.outputPath.split("/").pop() ?? `render.mp4`;
    const content = readFileSync10(job.outputPath);
    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDispositionHeader("attachment", filename)
      }
    });
  });
  api.delete("/render/:jobId", (c) => {
    const { jobId } = c.req.param();
    for (const [, state] of renderJobs) {
      if (state.id === jobId && state.outputPath) {
        const dir = state.outputPath.replace(/\/[^/]+$/, "");
        for (const ext of [".mp4", ".webm", ".mov", ".meta.json"]) {
          const fp = join12(dir, `${jobId}${ext}`);
          if (existsSync7(fp)) unlinkSync3(fp);
        }
        break;
      }
    }
    renderJobs.delete(jobId);
    return c.json({ deleted: true });
  });
  api.get("/projects/:id/renders/file/*", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const filename = c.req.path.split("/renders/file/")[1];
    if (!filename) return c.json({ error: "missing filename" }, 400);
    const rendersDir = adapter.rendersDir(project);
    const fp = resolveWithinProject(rendersDir, filename);
    if (!fp || isPrivateProjectFile(project.dir, fp)) return c.json({ error: "forbidden" }, 403);
    if (!existsSync7(fp)) return c.json({ error: "not found" }, 404);
    const contentType = renderContentType(fp);
    const content = readFileSync10(fp);
    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": contentDispositionHeader("inline", filename),
        "Accept-Ranges": "bytes",
        "Content-Length": String(content.length)
      }
    });
  });
  api.get("/projects/:id/renders", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const rendersDir = adapter.rendersDir(project);
    if (!existsSync7(rendersDir)) return c.json({ renders: [] });
    const files = readdirSync3(rendersDir).filter((f) => f.endsWith(".mp4") || f.endsWith(".webm") || f.endsWith(".mov")).flatMap((f) => {
      const fp = resolveWithinProject(rendersDir, f);
      return fp && !isPrivateProjectFile(project.dir, fp) ? [{ f, fp }] : [];
    }).map(({ f, fp }) => {
      const stat2 = statSync6(fp);
      const rid = f.replace(/\.(mp4|webm|mov)$/, "");
      const metaPath = join12(rendersDir, `${rid}.meta.json`);
      let status = "complete";
      let durationMs;
      let audioLoweredDb;
      if (existsSync7(metaPath)) {
        try {
          const meta = JSON.parse(readFileSync10(metaPath, "utf-8"));
          if (meta.status === "failed" && !existsSync7(fp)) status = "failed";
          if (meta.durationMs) durationMs = meta.durationMs;
          if (typeof meta.audioLoweredDb === "number") audioLoweredDb = meta.audioLoweredDb;
        } catch {
        }
      }
      return {
        id: rid,
        filename: f,
        path: fp,
        size: stat2.size,
        createdAt: stat2.mtimeMs,
        status,
        durationMs,
        ...audioLoweredDb !== void 0 ? { audioLoweredDb } : {}
      };
    }).sort((a, b) => b.createdAt - a.createdAt);
    for (const file of files.slice(0, MAX_RENDER_JOBS - 1)) {
      if (!renderJobs.has(file.id)) {
        renderJobs.set(file.id, {
          id: file.id,
          status: file.status,
          progress: 100,
          outputPath: file.path,
          createdAt: file.createdAt
        });
      }
    }
    return c.json({ renders: files.map(({ path: _path, ...render }) => render) });
  });
}

// ../studio-server/src/routes/imageThumbnail.ts
import { HTTPException } from "hono/http-exception";
import { open, stat } from "fs/promises";
import { createHash as createHash4 } from "crypto";

// ../studio-server/src/routes/thumbnailGenerationCoordinator.ts
var ThumbnailGenerationCoordinator = class {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    if (!Number.isInteger(concurrency) || concurrency < 1) {
      throw new RangeError("Thumbnail concurrency must be a positive integer");
    }
  }
  concurrency;
  entries = /* @__PURE__ */ new Map();
  queue = [];
  activeEntries = /* @__PURE__ */ new Set();
  active = 0;
  acquire(key, signal, work) {
    if (signal.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
    let entry = this.entries.get(key);
    if (!entry) {
      let resolve10;
      let reject;
      const promise = new Promise((resolvePromise, rejectPromise) => {
        resolve10 = resolvePromise;
        reject = rejectPromise;
      });
      entry = {
        key,
        controller: new AbortController(),
        leases: 0,
        state: "queued",
        work,
        promise,
        resolve: resolve10,
        reject
      };
      this.entries.set(key, entry);
      this.queue.push(entry);
    }
    entry.leases++;
    this.pump();
    return this.lease(entry, signal);
  }
  protectedKeys() {
    return /* @__PURE__ */ new Set([...this.entries.keys(), ...[...this.activeEntries].map((entry) => entry.key)]);
  }
  lease(entry, signal) {
    return new Promise((resolve10, reject) => {
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        signal.removeEventListener("abort", onAbort);
        entry.leases--;
        if (entry.leases > 0 || !this.entries.has(entry.key)) return;
        entry.controller.abort();
        if (this.entries.get(entry.key) === entry) this.entries.delete(entry.key);
        if (entry.state === "queued") {
          const index = this.queue.indexOf(entry);
          if (index >= 0) this.queue.splice(index, 1);
          entry.reject(new DOMException("Aborted", "AbortError"));
        }
      };
      const onAbort = () => {
        release();
        reject(new DOMException("Aborted", "AbortError"));
      };
      signal.addEventListener("abort", onAbort, { once: true });
      entry.promise.then(
        (value) => {
          release();
          resolve10(value);
        },
        (reason) => {
          release();
          reject(reason);
        }
      );
    });
  }
  pump() {
    while (this.active < this.concurrency) {
      const entry = this.queue.shift();
      if (!entry) return;
      if (entry.leases === 0) continue;
      entry.state = "active";
      this.activeEntries.add(entry);
      this.active++;
      void this.run(entry);
    }
  }
  async run(entry) {
    try {
      entry.resolve(await entry.work(entry.controller.signal));
    } catch (error) {
      entry.reject(error);
    } finally {
      this.active--;
      this.activeEntries.delete(entry);
      if (this.entries.get(entry.key) === entry) this.entries.delete(entry.key);
      this.pump();
    }
  }
};
var thumbnailGenerationCoordinator = new ThumbnailGenerationCoordinator(1);

// ../studio-server/src/routes/imageThumbnail.ts
var MAX_SOURCE_BYTES = 64 * 1024 * 1024;
var MAX_CACHE_BYTES = 8 * 1024 * 1024;
var sharpLoad;
function loadSharp() {
  sharpLoad ??= import("sharp").then(
    (module) => module.default,
    (error) => {
      console.warn("[Studio] JPEG thumbnails are off: sharp could not load:", error);
      throw error;
    }
  );
  return sharpLoad;
}
async function generateThumbnail(path, signal) {
  const sharp = await loadSharp();
  const file = await open(path, "r");
  try {
    const info = await file.stat();
    if (!info.isFile() || info.size > MAX_SOURCE_BYTES) throw new Error("Unsupported image");
    const source = Buffer.alloc(info.size);
    let offset = 0;
    while (offset < source.length) {
      signal.throwIfAborted();
      const { bytesRead } = await file.read(source, offset, source.length - offset, offset);
      if (!bytesRead) break;
      offset += bytesRead;
    }
    if (source[0] !== 255 || source[1] !== 216) throw new Error("Unsupported image");
    const image = sharp(source.subarray(0, offset), { limitInputPixels: 4e7 });
    if ((await image.metadata()).format !== "jpeg") throw new Error("Unsupported image");
    signal.throwIfAborted();
    const result = await image.rotate().resize(240, 135, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();
    signal.throwIfAborted();
    return result;
  } finally {
    await file.close();
  }
}
async function resolveSource(adapter, id, url) {
  const project = await adapter.resolveProject(id);
  if (!project) throw new HTTPException(404);
  let relative7;
  try {
    relative7 = requestSubPath(url, "projects/:id/image-thumbnail");
  } catch {
    throw new HTTPException(400);
  }
  if (!/\.jpe?g$/i.test(relative7)) throw new HTTPException(415);
  const path = pinWithinProject(project.dir, relative7);
  if (!path) throw new HTTPException(404);
  const info = await stat(path).catch(() => {
    throw new HTTPException(404);
  });
  if (!info.isFile()) throw new HTTPException(404);
  if (info.size > MAX_SOURCE_BYTES) throw new HTTPException(413);
  return { path, info };
}
function registerImageThumbnailRoutes(api, adapter) {
  const coordinator = new ThumbnailGenerationCoordinator(2);
  const cache = /* @__PURE__ */ new Map();
  let cacheBytes = 0;
  const remember = (key, image) => {
    cacheBytes -= cache.get(key)?.byteLength ?? 0;
    cache.delete(key);
    cache.set(key, image);
    cacheBytes += image.byteLength;
    while (cacheBytes > MAX_CACHE_BYTES || cache.size > 128) {
      const oldest = cache.keys().next().value;
      if (oldest === void 0) break;
      cacheBytes -= cache.get(oldest)?.byteLength ?? 0;
      cache.delete(oldest);
    }
  };
  api.get("/projects/:id/image-thumbnail/*", async (c) => {
    try {
      const { path, info } = await resolveSource(adapter, c.req.param("id"), c.req.url);
      const key = createHash4("sha256").update(JSON.stringify([path, info.dev, info.ino, info.size, info.mtimeMs, info.ctimeMs])).digest("hex");
      const etag = `"${key}"`;
      c.header("ETag", etag);
      c.header("Cache-Control", "private, no-cache");
      c.header("X-Content-Type-Options", "nosniff");
      if (c.req.header("If-None-Match") === etag) return c.body(null, 304);
      let result = cache.get(key);
      if (result) remember(key, result);
      else {
        if (coordinator.protectedKeys().size >= 32) return c.text("thumbnail queue full", 429);
        result = await coordinator.acquire(key, c.req.raw.signal, async (signal) => {
          const image = await generateThumbnail(path, signal);
          remember(key, image);
          return image;
        }) ?? void 0;
      }
      if (!result) return c.text("image unavailable", 422);
      c.header("Content-Type", "image/jpeg");
      return c.body(new Uint8Array(result));
    } catch (error) {
      if (error instanceof HTTPException) return error.getResponse();
      return c.text("image unavailable", 422);
    }
  });
}

// ../studio-server/src/routes/thumbnail.ts
import {
  closeSync as closeSync3,
  fstatSync as fstatSync3,
  openSync as openSync3,
  readFileSync as readFileSync11,
  readdirSync as readdirSync4,
  renameSync as renameSync3,
  rmSync as rmSync4,
  statSync as statSync7,
  unlinkSync as unlinkSync4,
  writeFileSync as writeFileSync5
} from "fs";
import { join as join13 } from "path";
import { createHash as createHash5, randomUUID as randomUUID2 } from "crypto";
var THUMBNAIL_CACHE_VERSION = "v5";
var THUMBNAIL_MAX_OUTPUT_WIDTH = 240;
var THUMBNAIL_MAX_OUTPUT_HEIGHT = 135;
var THUMBNAIL_CACHE_MAX_BYTES = 512 * 1024 * 1024;
var THUMBNAIL_CACHE_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1e3;
var prunedCacheDirs = /* @__PURE__ */ new Set();
function pruneThumbnailCache(cacheDir, protectedPaths, now = Date.now()) {
  let entries;
  try {
    entries = readdirSync4(cacheDir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  const files = entries.flatMap((entry) => {
    if (!entry.isFile()) return [];
    const path = join13(cacheDir, entry.name);
    try {
      const stats = statSync7(path);
      return [{ path, bytes: stats.size, mtimeMs: stats.mtimeMs }];
    } catch {
      return [];
    }
  });
  const retained = [];
  for (const file of files) {
    if (!protectedPaths.has(file.path) && now - file.mtimeMs > THUMBNAIL_CACHE_MAX_AGE_MS) {
      rmSync4(file.path, { force: true });
    } else {
      retained.push(file);
    }
  }
  let bytes = retained.reduce((total, file) => total + file.bytes, 0);
  for (const file of retained.sort((left, right) => left.mtimeMs - right.mtimeMs)) {
    if (bytes <= THUMBNAIL_CACHE_MAX_BYTES) break;
    if (protectedPaths.has(file.path)) continue;
    try {
      unlinkSync4(file.path);
      bytes -= file.bytes;
    } catch {
    }
  }
}
function writeThumbnailAtomically(path, buffer) {
  const temporaryPath = `${path}.${process.pid}.${randomUUID2()}.tmp`;
  try {
    writeFileSync5(temporaryPath, buffer, { flag: "wx" });
    renameSync3(temporaryPath, path);
  } finally {
    rmSync4(temporaryPath, { force: true });
  }
}
function readFileOnce(file) {
  let fd;
  try {
    fd = openSync3(file, "r");
  } catch (err) {
    const code = err.code;
    if (code === "ENOENT") return "missing";
    if (code === "ENOTDIR") return "not-a-file";
    throw err;
  }
  try {
    const stat2 = fstatSync3(fd);
    if (!stat2.isFile()) return "not-a-file";
    return { data: readFileSync11(fd), mtimeMs: stat2.mtimeMs };
  } finally {
    closeSync3(fd);
  }
}
function manifestKey(file) {
  const manifest = readFileOnce(file);
  if (typeof manifest === "string") return { key: "", mtimeMs: -Infinity };
  const hash = createHash5("sha1").update(manifest.data).digest("hex").slice(0, 16);
  return { key: `_${hash}`, mtimeMs: Math.round(manifest.mtimeMs) };
}
function registerThumbnailRoutes(api, adapter) {
  api.get("/projects/:id/thumbnail/*", async (c) => {
    if (!adapter.generateThumbnail) {
      return c.json({ error: "Thumbnails not available" }, 501);
    }
    const resolved = await resolveProjectAndSignature(adapter, c.req.param("id"));
    if (!resolved) return c.json({ error: "not found" }, 404);
    const { project, signature: projectSignature } = resolved;
    let compPath = requestSubPath(c.req.url, "projects/:id/thumbnail");
    if (compPath && !compPath.includes(".")) compPath += ".html";
    const htmlFile = resolveWithinProject(project.dir, compPath);
    const source = htmlFile ? readFileOnce(htmlFile) : "not-a-file";
    if (source === "not-a-file") return c.json({ error: "not found" }, 404);
    const inputSignature = compositionInputSignature(project.dir, compPath, projectSignature);
    const url = new URL(c.req.url, `http://${c.req.header("host") || "localhost"}`);
    const runtimeReview = url.searchParams.get("review") === "runtime";
    if (runtimeReview && compPath !== "index.html") return c.json({ error: "Runtime review requires the project entry" }, 400);
    const rawSeekTime = url.searchParams.get("t");
    const parsedSeekTime = rawSeekTime == null ? Number.NaN : parseFloat(rawSeekTime);
    const seekTime = Number.isFinite(parsedSeekTime) ? parsedSeekTime : 0.5;
    const vpWidth = parseInt(url.searchParams.get("w") || "0") || 0;
    const vpHeight = parseInt(url.searchParams.get("h") || "0") || 0;
    const selector = url.searchParams.get("selector") || void 0;
    const format = url.searchParams.get("format") === "png" ? "png" : "jpeg";
    const contentType = format === "png" ? "image/png" : "image/jpeg";
    const requestedOutput = url.searchParams.get("output");
    const outputMode = requestedOutput === "source" || requestedOutput !== "preview" && format === "png" ? "source" : "preview";
    const rawSelectorIndex = Number.parseInt(url.searchParams.get("selectorIndex") || "0", 10);
    const selectorIndex = Number.isFinite(rawSelectorIndex) && rawSelectorIndex > 0 ? rawSelectorIndex : void 0;
    const urlVersion = url.searchParams.get("v") || "";
    let compW = vpWidth || 1920;
    let compH = vpHeight || 1080;
    let sourceMtime = 0;
    let sourceKey = "";
    if (source !== "missing") {
      const html = source.data.toString("utf-8");
      sourceKey = `_${createHash5("sha1").update(html).digest("hex").slice(0, 16)}`;
      sourceMtime = Math.round(source.mtimeMs);
      if (!vpWidth) {
        const wMatch = html.match(/data-width=["'](\d+)["']/);
        const hMatch = html.match(/data-height=["'](\d+)["']/);
        if (wMatch?.[1]) compW = parseInt(wMatch[1]);
        if (hMatch?.[1]) compH = parseInt(hMatch[1]);
      }
    }
    const manualEdits = manifestKey(join13(project.dir, STUDIO_MANUAL_EDITS_PATH));
    const motion = manifestKey(join13(project.dir, STUDIO_MOTION_PATH));
    sourceMtime = Math.max(sourceMtime, manualEdits.mtimeMs, motion.mtimeMs);
    const projectUrl = `http://${c.req.header("host")}/api/projects/${encodeURIComponent(project.id)}`;
    const previewPath = compPath === "index.html" ? `${projectUrl}/preview` : `${projectUrl}/preview/comp/${compPath.split("/").map(encodeURIComponent).join("/")}`;
    const previewUrl = `${previewPath}?${PREVIEW_CAPTURE_PARAM}=1`;
    if (runtimeReview) {
      const review = await adapter.generateThumbnail({
        project,
        compPath,
        seekTime,
        width: compW,
        height: compH,
        outputWidth: compW,
        outputHeight: compH,
        previewUrl,
        runtimeReview: true,
        signal: c.req.raw.signal
      });
      if (!review || Buffer.isBuffer(review)) return c.json({ error: "Runtime review unavailable" }, 503);
      return c.json(review, 200, { "Cache-Control": "no-store" });
    }
    const cacheDir = join13(project.dir, ".thumbnails");
    const selectorKey = selector ? `_${createHash5("sha1").update(selector).digest("hex").slice(0, 16)}_${selectorIndex ?? 0}` : "";
    const urlVersionKey = urlVersion ? `_${urlVersion.replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 32)}` : "";
    const inputSignatureKey = `_${createHash5("sha1").update(inputSignature).digest("hex").slice(0, 16)}`;
    const outputScale = outputMode === "source" ? 1 : Math.min(1, THUMBNAIL_MAX_OUTPUT_WIDTH / compW, THUMBNAIL_MAX_OUTPUT_HEIGHT / compH);
    const outputWidth = Math.max(1, Math.round(compW * outputScale));
    const outputHeight = Math.max(1, Math.round(compH * outputScale));
    const cacheKey = `${THUMBNAIL_CACHE_VERSION}${urlVersionKey}${inputSignatureKey}${manualEdits.key}${motion.key}${sourceKey}_${format}_${outputMode}_${compPath.replace(/\//g, "_")}_${compW}x${compH}_${outputWidth}x${outputHeight}_${sourceMtime}_${seekTime.toFixed(2)}${selectorKey}.${format === "png" ? "png" : "jpg"}`;
    const cachePath = join13(cacheDir, cacheKey);
    if (!prunedCacheDirs.has(cacheDir)) {
      prunedCacheDirs.add(cacheDir);
      pruneThumbnailCache(
        cacheDir,
        /* @__PURE__ */ new Set([...thumbnailGenerationCoordinator.protectedKeys(), cachePath])
      );
    }
    const cached = readFileOnce(cachePath);
    if (typeof cached === "object") {
      return new Response(new Uint8Array(cached.data), {
        headers: { "Content-Type": contentType, "Cache-Control": "no-cache" }
      });
    }
    if (url.searchParams.get("cached") === "1")
      return c.body(null, 204, { "Cache-Control": "no-cache" });
    try {
      const buffer = await thumbnailGenerationCoordinator.acquire(
        cachePath,
        c.req.raw.signal,
        async (signal) => {
          const previewCopiesAtStart = proxyActivityMark(project.dir);
          const generated = await adapter.generateThumbnail({
            project,
            compPath,
            seekTime,
            width: compW,
            height: compH,
            outputWidth,
            outputHeight,
            previewUrl,
            selector,
            format,
            selectorIndex,
            signal
          });
          if (!generated || !Buffer.isBuffer(generated)) return null;
          const previewCopiesAtEnd = proxyActivityMark(project.dir);
          const afterGeneration = await resolveProjectAndSignature(adapter, project.id);
          const inputsUnchanged = (signature) => compositionInputSignature(project.dir, compPath, signature) === inputSignature;
          if (previewCopiesAtStart === null || previewCopiesAtEnd !== previewCopiesAtStart || afterGeneration?.project.dir !== project.dir || !inputsUnchanged(afterGeneration.signature) || !inputsUnchanged(createProjectSignature(project.dir))) {
            return generated;
          }
          mkdirWithinProject(project.dir, cacheDir);
          writeThumbnailAtomically(cachePath, generated);
          return generated;
        }
      );
      if (!buffer) {
        return c.json(
          { error: "Thumbnail generation failed \u2014 Chrome browser may not be available" },
          500
        );
      }
      pruneThumbnailCache(cacheDir, thumbnailGenerationCoordinator.protectedKeys());
      return new Response(new Uint8Array(buffer), {
        headers: { "Content-Type": contentType, "Cache-Control": "no-cache" }
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return new Response(null, { status: 499 });
      }
      if (isProjectRootMissing(err)) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      return c.json({ error: `Thumbnail generation failed: ${msg}` }, 500);
    }
  });
}

// ../studio-server/src/routes/waveform.ts
import { existsSync as existsSync8, readFileSync as readFileSync12, statSync as statSync8 } from "fs";
import { join as join14, resolve as resolve7 } from "path";
function registerWaveformRoutes(api, adapter) {
  api.get("/projects/:id/waveform/*", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const assetPath = requestSubPath(c.req.url, "projects/:id/waveform");
    const audioPath = resolve7(project.dir, assetPath);
    if (!isWithinProjectRoot(project.dir, audioPath)) {
      return c.json({ error: "file not found" }, 404);
    }
    const stats = statSync8(audioPath, { throwIfNoEntry: false });
    if (!stats) return c.json({ error: "file not found" }, 404);
    const cacheDir = join14(project.dir, ".waveform-cache");
    const cachePath = join14(cacheDir, buildWaveformCacheKey(assetPath, stats));
    try {
      if (isWaveformCacheDirectory(cacheDir) && existsSync8(cachePath)) {
        const peaks2 = JSON.parse(readFileSync12(cachePath, "utf-8"));
        return c.json({ peaks: peaks2 });
      }
    } catch {
    }
    let peaks;
    try {
      peaks = await decodeAudioPeaks(audioPath);
    } catch {
      return c.json({ error: "failed to decode audio" }, 500);
    }
    try {
      writeWaveformCache(cachePath, peaks);
    } catch {
    }
    return c.json({ peaks });
  });
}

// ../studio-server/src/routes/freezeFrame.ts
import { execFile } from "child_process";
import { readFileSync as readFileSync13, rmSync as rmSync5, statSync as statSync9 } from "fs";
import { basename as basename2, dirname as dirname6, join as join15, relative as relative6, sep as sep3 } from "path";

// ../studio-server/src/helpers/freezeFrame.ts
import { createHash as createHash6, randomBytes } from "crypto";
var FREEZE_HOLD_SECONDS = 2;
var EPSILON = 1e-3;
var round3 = (value) => Math.round(value * 1e3) / 1e3;
function numberAttr(el, name) {
  const raw = el.getAttribute(name);
  if (raw === null || raw.trim() === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
function trackOf(el) {
  return numberAttr(el, "data-track-index") ?? numberAttr(el, "data-layer") ?? 0;
}
function freezeFrameMediaTime(input) {
  const rate = resolveRateSpec(input.automation, input.playbackRate);
  return input.mediaStart + sourceTimeAt(rate, Math.max(0, input.playhead - input.clipStart));
}
function freezeExtractArgs(src, mediaTime, output) {
  return [
    "-y",
    "-ss",
    String(round3(mediaTime)),
    "-i",
    src,
    "-frames:v",
    "1",
    "-c:v",
    "png",
    "-f",
    "image2",
    "-update",
    "1",
    output
  ];
}
var randomStillToken = () => randomBytes(4).toString("hex");
function freezeStillFileName(clipId, playhead, token = randomStillToken()) {
  const stem = clipId.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 48) || "clip";
  const idHash = createHash6("sha256").update(clipId).digest("hex").slice(0, 10);
  return `${stem}-${idHash}-${Math.round(playhead * 1e3)}-${token}.png`;
}
function readFreezeSource(html, target, playhead) {
  const { document: document2 } = parseSourceDocument(html);
  const el = findTargetElement(document2, target);
  if (!el || el.tagName.toLowerCase() !== "video") return null;
  const src = el.getAttribute("src");
  const start = numberAttr(el, "data-start");
  const duration = numberAttr(el, "data-duration");
  if (!src || start === null || duration === null) return null;
  if (playhead <= start + EPSILON || playhead >= start + duration - EPSILON) return null;
  return {
    id: el.getAttribute("id") || "clip",
    src,
    mediaTime: freezeFrameMediaTime({
      clipStart: start,
      playhead,
      mediaStart: readMediaOffsetSeconds((name) => el.getAttribute(name)),
      playbackRate: numberAttr(el, "data-playback-rate") ?? 1,
      automation: el.getAttribute("data-automation")
    })
  };
}
function targetOf(el) {
  const hfId = el.getAttribute("data-hf-id");
  return { ...hfId ? { hfId } : {}, id: el.getAttribute("id") };
}
function spans(el, time) {
  const start = numberAttr(el, "data-start");
  const duration = numberAttr(el, "data-duration");
  if (start === null || duration === null) return false;
  return time > start + EPSILON && time < start + duration - EPSILON;
}
function shiftTracks(document2, tracks, from, by) {
  for (const el of document2.querySelectorAll("[data-start]")) {
    if (el.hasAttribute("data-composition-id") || !tracks.has(trackOf(el))) continue;
    const start = numberAttr(el, "data-start");
    if (start === null || start < from - EPSILON) continue;
    el.setAttribute("data-start", String(round3(start + by)));
  }
}
function growRootToFit(document2) {
  const root = document2.querySelector("[data-composition-id]");
  const rootDuration = root ? numberAttr(root, "data-duration") : null;
  if (!root || rootDuration === null) return;
  let end = rootDuration;
  for (const el of root.querySelectorAll("[data-start][data-duration]")) {
    const start = numberAttr(el, "data-start");
    const duration = numberAttr(el, "data-duration");
    if (start !== null && duration !== null) end = Math.max(end, start + duration);
  }
  if (end > rootDuration + EPSILON) root.setAttribute("data-duration", String(round3(end)));
}
var COPIED_PICTURE_ATTRS = ["class", "style", "data-color-grading"];
function buildStill(document2, video, input) {
  const img = document2.createElement("img");
  img.setAttribute("id", input.id);
  for (const name of COPIED_PICTURE_ATTRS) {
    const value = video.getAttribute(name);
    if (value !== null) img.setAttribute(name, value);
  }
  if (!img.classList.contains("clip")) img.classList.add("clip");
  img.setAttribute("src", input.imageSrc);
  img.setAttribute("alt", "");
  img.setAttribute("data-start", String(round3(input.playhead)));
  img.setAttribute("data-duration", String(input.holdSeconds));
  img.setAttribute("data-track-index", String(trackOf(video)));
  img.setAttribute("data-timeline-label", "Freeze");
  return img;
}
function linkedPartners(document2, video) {
  const link = video.getAttribute(MEDIA_LINK_ATTR);
  if (!link) return [];
  return Array.from(document2.querySelectorAll(`[${MEDIA_LINK_ATTR}]`)).filter(
    (el) => el !== video && el.getAttribute(MEDIA_LINK_ATTR) === link
  );
}
function splitAll(html, elements, time) {
  const rightHalfIds = [];
  let next = html;
  for (const el of elements) {
    const split3 = splitElementInHtml(
      next,
      targetOf(el),
      time,
      `${el.getAttribute("id") || "clip"}-split`,
      {
        start: numberAttr(el, "data-start") ?? 0,
        duration: numberAttr(el, "data-duration") ?? 0,
        track: trackOf(el)
      }
    );
    if (!split3.matched || !split3.newId) return null;
    next = split3.html;
    rightHalfIds.push(split3.newId);
  }
  return { html: next, rightHalfIds };
}
function applyFreezeFrameToHtml(html, input) {
  const hold = input.holdSeconds ?? FREEZE_HOLD_SECONDS;
  const { document: before } = parseSourceDocument(html);
  const video = findTargetElement(before, input.target);
  if (!video || !isHTMLElement(video) || !spans(video, input.playhead)) return null;
  const partners = linkedPartners(before, video);
  const tracks = /* @__PURE__ */ new Set([trackOf(video), ...partners.map(trackOf)]);
  const cut = splitAll(
    html,
    [video, ...partners.filter((el) => spans(el, input.playhead))],
    input.playhead
  );
  if (!cut) return null;
  const { document: document2, wrappedFragment } = parseSourceDocument(cut.html);
  relinkSplitHalves(document2, cut.rightHalfIds);
  shiftTracks(document2, tracks, input.playhead, hold);
  const leftHalf = findTargetElement(document2, input.target);
  if (!leftHalf?.parentElement) return null;
  const freezeId = nextUniqueId(document2, `${video.getAttribute("id") || "clip"}-freeze`);
  const still = buildStill(document2, leftHalf, {
    id: freezeId,
    imageSrc: input.imageSrc,
    playhead: input.playhead,
    holdSeconds: hold
  });
  leftHalf.parentElement.insertBefore(still, leftHalf.nextSibling);
  growRootToFit(document2);
  return {
    html: ensureHfIds(wrappedFragment ? document2.body.innerHTML || "" : document2.toString()),
    freezeId
  };
}

// ../studio-server/src/routes/freezeFrame.ts
var EXTRACT_TIMEOUT_MS = 3e4;
var ffmpegExtractor = (args) => {
  const ffmpeg = findFfBinary("ffmpeg", { configuredMustExist: true });
  if (!ffmpeg) return Promise.resolve({ ok: false, error: "ffmpeg not found" });
  return new Promise((resolvePromise) => {
    execFile(
      ffmpeg,
      args,
      { timeout: EXTRACT_TIMEOUT_MS, windowsHide: true },
      (error, _o, stderr) => resolvePromise(
        error ? { ok: false, error: String(stderr || error.message) } : { ok: true }
      )
    );
  });
};
function isFreezeFrameRequest(value) {
  if (typeof value !== "object" || value === null) return false;
  const body = value;
  return typeof body.path === "string" && body.path.length > 0 && typeof body.expectedVersion === "string" && typeof body.target === "object" && body.target !== null && typeof body.playhead === "number" && Number.isFinite(body.playhead);
}
var FREEZE_DIR = ["assets", "freeze"];
function readExpected(absPath, expectedVersion) {
  let content;
  try {
    content = readFileSync13(absPath, "utf-8");
  } catch {
    return { error: "not found", status: 404 };
  }
  return fileContentVersion(content) === expectedVersion ? { content } : { error: "file conflict", status: 409 };
}
function readFrame(path) {
  try {
    return readFileSync13(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
function publishStill(path, frame2) {
  try {
    createFileAtomically(path, frame2);
    return true;
  } catch (error) {
    if (error.code === "EEXIST") return false;
    throw error;
  }
}
async function extractThenPublishWhole(extract, mediaPath, mediaTime, imagePath) {
  const unseenByHistory = atomicTempPath(imagePath);
  try {
    const extracted = await extract(freezeExtractArgs(mediaPath, mediaTime, unseenByHistory));
    const frame2 = extracted.ok ? readFrame(unseenByHistory) : null;
    if (!frame2?.length) {
      const reason = extracted.ok ? "no frame at this time" : extracted.error ?? "ffmpeg failed";
      return { error: `Could not extract the frame: ${reason}`, status: 500 };
    }
    if (publishStill(imagePath, frame2)) return null;
    return { error: `freeze still already exists: ${basename2(imagePath)}`, status: 409 };
  } finally {
    rmSync5(unseenByHistory, { force: true });
  }
}
async function extractStill(projectDir, absPath, source, playhead, tools) {
  const fileDir = dirname6(absPath);
  const mediaPath = pinWithinProject(projectDir, relative6(projectDir, join15(fileDir, source.src)));
  if (!mediaPath) return { error: `forbidden media path: ${source.src}`, status: 403 };
  const freezeDir = join15(projectDir, ...FREEZE_DIR);
  const fileName = freezeStillFileName(source.id, playhead, tools.stillToken());
  mkdirWithinProject(projectDir, freezeDir);
  const imagePath = pinWithinProject(projectDir, join15(...FREEZE_DIR, fileName));
  if (!imagePath || dirname6(imagePath) !== freezeDir) {
    return { error: `forbidden freeze path: ${fileName}`, status: 403 };
  }
  const failed = await extractThenPublishWhole(
    tools.extract,
    mediaPath,
    source.mediaTime,
    imagePath
  );
  if (failed) return failed;
  const depth = relative6(projectDir, fileDir).split(sep3).filter(Boolean).length;
  const stillPath = `${FREEZE_DIR.join("/")}/${fileName}`;
  return { imageSrc: `${"../".repeat(depth)}${stillPath}`, stillPath, imagePath };
}
function writeFolded(projectDir, absPath, path, before, after, options) {
  if (readFileSync13(absPath, "utf-8") !== before) {
    return { error: `file conflict: ${path}`, status: 409 };
  }
  const backup = snapshotBeforeWrite(projectDir, absPath);
  if (backup.error) return { error: `Failed to create backup: ${backup.error}`, status: 500 };
  const writeToken = createWriteToken(options.token);
  replaceFileAtomically(absPath, after, statSync9(absPath).mode);
  const version = fileContentVersion(after);
  recordFileWriteReceipt(absPath, { path, version, writeToken, overwrote: before });
  return { version, writeToken, backupPath: backupPathForResponse(projectDir, backup.backupPath) };
}
function registerFreezeFrameRoutes(api, adapter, extract = ffmpegExtractor, stillToken = randomStillToken) {
  api.post("/projects/:id/file-mutations/freeze-frame", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!isFreezeFrameRequest(body)) {
      return c.json({ error: "path, expectedVersion, target and playhead required" }, 400);
    }
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const absPath = pinWithinProject(project.dir, body.path);
    if (!absPath) return c.json({ error: `forbidden path: ${body.path}` }, 403);
    const read = readExpected(absPath, body.expectedVersion);
    if ("error" in read) return c.json({ error: `${read.error}: ${body.path}` }, read.status);
    const before = read.content;
    const source = readFreezeSource(before, body.target, body.playhead);
    if (!source) return c.json({ error: "Move the playhead inside a video clip to freeze" }, 400);
    const still = await extractStill(project.dir, absPath, source, body.playhead, {
      extract,
      stillToken
    });
    if ("error" in still) return c.json({ error: still.error }, still.status);
    const { imageSrc, stillPath, imagePath } = still;
    const folded = applyFreezeFrameToHtml(before, {
      target: body.target,
      playhead: body.playhead,
      imageSrc
    });
    const failAndRemoveStill = (error, status) => {
      rmSync5(imagePath, { force: true });
      return c.json({ error }, status);
    };
    if (!folded) return failAndRemoveStill("Freeze target was not found in the file", 400);
    const written = writeFolded(project.dir, absPath, body.path, before, folded.html, {
      token: body.transactionToken ?? c.req.header("X-Hyperframes-Write-Token")
    });
    if ("error" in written) return failAndRemoveStill(written.error, written.status);
    const { version, writeToken, backupPath } = written;
    return c.json({
      ok: true,
      path: body.path,
      before,
      after: folded.html,
      version,
      writeToken,
      backupPath,
      freezeId: folded.freezeId,
      imageSrc,
      stillPath
    });
  });
}

// ../studio-server/src/routes/loudness.ts
import { existsSync as existsSync9 } from "fs";
var defaultMeasure = (file, window2) => measureAudio(requiredFfmpeg(), file, window2);
var InvalidField = class extends Error {
};
function numberField(body, name, fallback, valid) {
  const raw = body[name];
  if (raw === void 0 || raw === null) return fallback;
  if (typeof raw === "number" && Number.isFinite(raw) && valid(raw)) return raw;
  throw new InvalidField(`${name} is out of range`);
}
function readNormalizeRequest(body) {
  const src = typeof body.src === "string" ? body.src.trim() : "";
  if (!src) throw new InvalidField("src is required");
  const duration = numberField(body, "duration", 0, (v) => v > 0);
  return {
    id: typeof body.id === "string" && body.id ? body.id : src,
    src,
    window: {
      mediaStart: numberField(body, "mediaStart", 0, (v) => v >= 0),
      duration: duration > 0 ? duration : null,
      playbackRate: numberField(body, "playbackRate", 1, (v) => v > 0)
    },
    volume: numberField(body, "volume", 1, (v) => v >= 0),
    targetLufs: numberField(body, "targetLufs", DEFAULT_TARGET_LUFS, (v) => v < 0)
  };
}
function parseNormalizeRequest(body) {
  try {
    return readNormalizeRequest(body);
  } catch (error) {
    if (error instanceof InvalidField) return error.message;
    throw error;
  }
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function registerLoudnessRoutes(api, adapter, measure = defaultMeasure) {
  api.post("/projects/:id/loudness/normalize", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const body = await c.req.json().catch(() => null);
    if (!isRecord(body)) return c.json({ error: "invalid body" }, 400);
    const request = parseNormalizeRequest(body);
    if (typeof request === "string") return c.json({ error: request }, 400);
    let file;
    try {
      file = resolveLocalAudioPath(project.dir, request.src);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : String(error) }, 400);
    }
    if (!existsSync9(file)) return c.json({ error: "file not found" }, 404);
    try {
      const measurement = await measure(file, request.window);
      const plan = absoluteLoudnessPlan(
        { id: request.id, volume: request.volume, ...measurement },
        request.targetLufs
      );
      return c.json({ plan });
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : String(error) }, 422);
    }
  });
}

// ../studio-server/src/routes/peaks.ts
import { existsSync as existsSync10, readFileSync as readFileSync14, statSync as statSync10 } from "fs";
import { join as join16, resolve as resolve8 } from "path";

// ../studio-server/src/helpers/peakMap.ts
import { execFile as execFile2, spawn as spawn2 } from "child_process";
import { promisify } from "util";
var PEAK_BIN_SECONDS = 0.05;
var PEAK_SAMPLE_RATE = 48e3;
var execFileAsync = promisify(execFile2);
var PEAK_MAP_CACHE_VERSION = "peaks-v2";
function createPeakAccumulator(sampleRate = PEAK_SAMPLE_RATE, binSeconds = PEAK_BIN_SECONDS, channels = 2) {
  return {
    bins: [],
    frame: 0,
    carry: Buffer.alloc(0),
    framesPerBin: Math.max(1, Math.round(sampleRate * binSeconds)),
    channels: Math.max(1, channels)
  };
}
function framePeak(data, offset, channels) {
  let peak = 0;
  for (let ch = 0; ch < channels; ch++) {
    peak = Math.max(peak, Math.abs(data.readFloatLE(offset + ch * 4)));
  }
  return peak;
}
function accumulatePeaks(acc, chunk) {
  const data = acc.carry.length > 0 ? Buffer.concat([acc.carry, chunk]) : chunk;
  const frameBytes = 4 * acc.channels;
  const whole = data.length - data.length % frameBytes;
  for (let offset = 0; offset < whole; offset += frameBytes) {
    const peak = framePeak(data, offset, acc.channels);
    const bin = Math.floor(acc.frame / acc.framesPerBin);
    if (acc.bins.length <= bin) acc.bins.push(0);
    if (peak > (acc.bins[bin] ?? 0)) acc.bins[bin] = peak;
    acc.frame += 1;
  }
  acc.carry = Buffer.from(data.subarray(whole));
}
function finishPeaks(acc) {
  return acc.bins.map((peak) => Number(peak.toFixed(4)));
}
async function probeChannels(mediaPath) {
  const { stdout } = await execFileAsync(
    findFfBinary("ffprobe") ?? "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "a:0",
      "-show_entries",
      "stream=channels",
      "-of",
      "csv=p=0",
      "--",
      mediaPath
    ],
    { encoding: "utf8", timeout: 3e4, windowsHide: true }
  );
  const channels = Number.parseInt(stdout.trim(), 10);
  if (!Number.isFinite(channels) || channels < 1) throw new Error("no audio stream");
  return channels;
}
async function decodePeakMap(mediaPath) {
  const channels = await probeChannels(mediaPath);
  return new Promise((resolvePromise, reject) => {
    const proc = spawn2(
      findFfBinary("ffmpeg") ?? "ffmpeg",
      [
        "-v",
        "error",
        "-i",
        mediaPath,
        "-map",
        "0:a:0",
        "-vn",
        "-ar",
        String(PEAK_SAMPLE_RATE),
        "-f",
        "f32le",
        "pipe:1"
      ],
      { stdio: ["ignore", "pipe", "ignore"], windowsHide: true }
    );
    const acc = createPeakAccumulator(PEAK_SAMPLE_RATE, PEAK_BIN_SECONDS, channels);
    proc.stdout?.on("data", (chunk) => accumulatePeaks(acc, chunk));
    proc.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`ffmpeg failed decoding audio (exit ${code})`));
        return;
      }
      if (acc.frame === 0) {
        reject(new Error("ffmpeg produced no audio samples"));
        return;
      }
      resolvePromise(finishPeaks(acc));
    });
    proc.on("error", reject);
  });
}
function buildPeakMapCacheKey(assetPath, fingerprint) {
  const name = assetPath.replace(/[/\\]/g, "_");
  return `${PEAK_MAP_CACHE_VERSION}_${name}_${fingerprint.size}-${Math.round(fingerprint.mtimeMs)}.json`;
}

// ../studio-server/src/routes/peaks.ts
var decodesInFlight = /* @__PURE__ */ new Map();
function decodeOnce(cachePath, mediaPath, decode2) {
  const pending = decodesInFlight.get(cachePath);
  if (pending) return pending;
  const started = decode2(mediaPath).finally(() => decodesInFlight.delete(cachePath));
  decodesInFlight.set(cachePath, started);
  return started;
}
function readCachedBins(cacheDir, cachePath) {
  try {
    if (!isWaveformCacheDirectory(cacheDir) || !existsSync10(cachePath)) return null;
    const parsed = JSON.parse(readFileSync14(cachePath, "utf-8"));
    return Array.isArray(parsed) && parsed.every((n) => typeof n === "number") ? parsed : null;
  } catch {
    return null;
  }
}
function registerPeakRoutes(api, adapter, decode2 = decodePeakMap) {
  api.get("/projects/:id/peaks/*", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const assetPath = requestSubPath(c.req.url, "projects/:id/peaks");
    const mediaPath = resolve8(project.dir, assetPath);
    if (!isWithinProjectRoot(project.dir, mediaPath))
      return c.json({ error: "file not found" }, 404);
    const stats = statSync10(mediaPath, { throwIfNoEntry: false });
    if (!stats?.isFile()) return c.json({ error: "file not found" }, 404);
    const cacheDir = join16(project.dir, ".waveform-cache");
    const cachePath = join16(cacheDir, buildPeakMapCacheKey(assetPath, stats));
    const cached = readCachedBins(cacheDir, cachePath);
    if (cached) return c.json({ binSeconds: PEAK_BIN_SECONDS, bins: cached });
    let bins;
    try {
      bins = await decodeOnce(cachePath, mediaPath, decode2);
    } catch {
      return c.json({ error: "failed to decode audio" }, 500);
    }
    try {
      writeWaveformCache(cachePath, bins);
    } catch {
    }
    return c.json({ binSeconds: PEAK_BIN_SECONDS, bins });
  });
}

// ../studio-server/src/routes/fonts.ts
import { closeSync as closeSync4, constants as constants2, fstatSync as fstatSync4, openSync as openSync4, readSync } from "fs";
var MAX_FONT_RESULTS = 2e3;
var GOOGLE_FONTS_METADATA_URL = "https://fonts.google.com/metadata/fonts";
var GOOGLE_FONTS_FETCH_TIMEOUT_MS = 3e3;
var cachedFonts = null;
var cachedGoogleFonts = null;
var GOOGLE_FONT_FALLBACKS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Poppins",
  "Lato",
  "Oswald",
  "Raleway",
  "Nunito",
  "Playfair Display",
  "Merriweather",
  "Source Sans 3",
  "Source Serif 4",
  "Source Code Pro",
  "DM Sans",
  "Space Grotesk",
  "Space Mono",
  "Bebas Neue",
  "Outfit",
  "JetBrains Mono"
];
function isRecord2(value) {
  return typeof value === "object" && value !== null;
}
function collectFontsFromDir(dir) {
  return collectFontFileEntries(dir).map((e) => e.family);
}
function listInstalledFontFamilies() {
  if (cachedFonts) return cachedFonts;
  const families = /* @__PURE__ */ new Set();
  for (const family of getSystemProfilerFamilies()) {
    families.add(family);
    if (families.size >= MAX_FONT_RESULTS) break;
  }
  for (const dir of fontDirectories()) {
    for (const family of collectFontsFromDir(dir)) {
      families.add(family);
      if (families.size >= MAX_FONT_RESULTS) break;
    }
    if (families.size >= MAX_FONT_RESULTS) break;
  }
  cachedFonts = Array.from(families).sort((a, b) => a.localeCompare(b));
  return cachedFonts;
}
function parseGoogleFontMetadata(value) {
  if (!isRecord2(value) || !Array.isArray(value.familyMetadataList)) return [];
  const families = [];
  for (const entry of value.familyMetadataList) {
    if (!isRecord2(entry) || typeof entry.family !== "string") continue;
    families.push(entry.family);
  }
  return families;
}
function stripGoogleJsonGuard(raw) {
  const prefix = ")]}'";
  if (!raw.startsWith(prefix)) return raw;
  let index = prefix.length;
  while (index < raw.length && (raw[index] === " " || raw[index] === "\n" || raw[index] === "\r" || raw[index] === "	" || raw[index] === "\f")) {
    index += 1;
  }
  return raw.slice(index);
}
async function listGoogleFontFamilies() {
  if (cachedGoogleFonts) return cachedGoogleFonts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GOOGLE_FONTS_FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(GOOGLE_FONTS_METADATA_URL, { signal: controller.signal });
    if (!response.ok) {
      cachedGoogleFonts = GOOGLE_FONT_FALLBACKS;
      return cachedGoogleFonts;
    }
    const raw = await response.text();
    const jsonText = stripGoogleJsonGuard(raw);
    const families = parseGoogleFontMetadata(JSON.parse(jsonText));
    cachedGoogleFonts = families.length > 0 ? families : GOOGLE_FONT_FALLBACKS;
  } catch {
    cachedGoogleFonts = GOOGLE_FONT_FALLBACKS;
  } finally {
    clearTimeout(timer);
  }
  return cachedGoogleFonts;
}
function registerFontRoutes(api) {
  api.get("/fonts", (c) => c.json({ fonts: listInstalledFontFamilies() }));
  api.get("/fonts/google", async (c) => c.json({ fonts: await listGoogleFontFamilies() }));
  api.get("/fonts/file", (c) => {
    const family = c.req.query("family");
    if (!family) return c.json({ error: "family parameter required" }, 400);
    const located = locateSystemFont(family);
    if (!located) return c.json({ error: "font not found" }, 404);
    let fd;
    try {
      fd = openSync4(located.path, constants2.O_RDONLY | constants2.O_NOFOLLOW);
    } catch {
      return c.json({ error: "font file not accessible" }, 404);
    }
    try {
      const stat2 = fstatSync4(fd);
      if (stat2.size > SYSTEM_FONT_SIZE_LIMIT) {
        return c.json({ error: "font file too large" }, 413);
      }
      const buffer = Buffer.alloc(stat2.size);
      readSync(fd, buffer, 0, stat2.size, 0);
      const mimeType = located.format === "otf" ? "font/otf" : located.format === "woff2" ? "font/woff2" : located.format === "woff" ? "font/woff" : located.format === "ttc" ? "font/collection" : "font/ttf";
      const fileName = `${family.replace(/[^a-zA-Z0-9 -]/g, "")}.${located.format}`;
      return new Response(buffer, {
        headers: {
          "Content-Type": mimeType,
          "Content-Disposition": `attachment; filename="${fileName}"`
        }
      });
    } catch {
      return c.json({ error: "failed to read font file" }, 500);
    } finally {
      closeSync4(fd);
    }
  });
}

// ../studio-server/src/routes/registry.ts
import { bodyLimit as bodyLimit2 } from "hono/body-limit";
import { readFileSync as readFileSync16, writeFileSync as writeFileSync7 } from "fs";

// ../studio-server/src/helpers/componentLibrary.ts
import { createHash as createHash7 } from "crypto";
import { existsSync as existsSync11, lstatSync as lstatSync4, mkdirSync as mkdirSync2, mkdtempSync as mkdtempSync3, readFileSync as readFileSync15, readdirSync as readdirSync5, renameSync as renameSync4, rmSync as rmSync6, writeFileSync as writeFileSync6 } from "fs";
import { homedir } from "os";
import { dirname as dirname7, join as join17, resolve as resolve9, sep as sep4 } from "path";
function componentLibraryRoot() {
  return resolve9(process.env.HYPERFRAMES_COMPONENT_LIBRARY || join17(homedir(), ".hyperframes", "component-library"));
}
var COMPONENT_PACK_MAX_BYTES = 16 * 1024 * 1024;
var NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function object2(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function fail(message) {
  throw new Error(message);
}
function text(value) {
  return typeof value === "string" && value.length > 0;
}
function positive(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
function safeComponentPath(root, path) {
  if (!path || path.includes("\\") || !/^[a-zA-Z0-9._/-]+$/.test(path) || path.split("/").some((part) => !part || part === "." || part === "..")) fail(`Unsafe component path: ${path}`);
  const target = resolve9(root, path);
  if (!target.startsWith(resolve9(root) + sep4)) fail(`Unsafe component path: ${path}`);
  let parent = target;
  while (parent.startsWith(resolve9(root) + sep4)) {
    if (existsSync11(parent) && lstatSync4(parent).isSymbolicLink()) fail(`Symbolic links are not allowed: ${path}`);
    parent = dirname7(parent);
  }
  return target;
}
function isVariable(value) {
  if (!object2(value) || !text(value.id) || !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value.id) || !text(value.label)) return false;
  if (value.description !== void 0 && typeof value.description !== "string") return false;
  if (value.maxLength !== void 0 && (!Number.isInteger(value.maxLength) || Number(value.maxLength) < 1)) return false;
  if (value.update !== void 0 && !["live", "rebuild", "reload"].includes(String(value.update))) return false;
  if (value.type === "number") return typeof value.default === "number" && Number.isFinite(value.default) && [value.min, value.max, value.step].every((n) => n === void 0 || typeof n === "number" && Number.isFinite(n));
  if (value.type === "boolean") return typeof value.default === "boolean";
  if (typeof value.default !== "string") return false;
  if (value.type === "enum") return Array.isArray(value.options) && value.options.length > 0 && value.options.length <= 128 && value.options.every((option) => object2(option) && text(option.value) && text(option.label)) && value.options.some((option) => object2(option) && option.value === value.default);
  return ["string", "color", "image", "font"].includes(String(value.type));
}
function isManifest(value) {
  if (!object2(value) || value.type !== "hyperframes:block" || !text(value.name) || !NAME.test(value.name) || value.name.length > 80 || !text(value.title) || !text(value.description)) return false;
  if (!object2(value.dimensions) || !positive(value.dimensions.width) || !positive(value.dimensions.height) || value.dimensions.width > 8192 || value.dimensions.height > 8192 || !positive(value.duration) || value.duration > 600) return false;
  if (value.preview !== void 0 && (!object2(value.preview) || [value.preview.poster, value.preview.video].some((item) => item !== void 0 && typeof item !== "string"))) return false;
  if (value.params !== void 0) return false;
  const visual = value.visualComponent;
  if (!object2(visual) || visual.version !== 1 || visual.themeMode !== "inherit" || !resolveVisualComponentCategory(visual.category) || !Array.isArray(visual.surfaces) || !visual.surfaces.includes("video")) return false;
  if (visual.ai !== void 0 && (!object2(visual.ai) || !Array.isArray(visual.ai.slots) || !visual.ai.slots.every(text) || visual.ai.model !== void 0 && !isComponentContentModel(visual.ai.model))) return false;
  if (visual.data !== void 0) {
    const data = visual.data;
    if (!object2(data) || data.version !== 1 || !text(data.rowId) || !["replace", "override"].includes(String(data.mode)) || [data.minRows, data.maxRows].some((n) => n !== void 0 && (!Number.isInteger(n) || Number(n) < 0 || Number(n) > 1e3)) || typeof data.minRows === "number" && typeof data.maxRows === "number" && data.minRows > data.maxRows || !["category-value", "region-value", "point-value", "route-value", "series-value"].includes(String(data.kind)) || !object2(data.binding) || !text(data.binding.variable) || !["json", "key-value-list", "route-value-list", "label-detail-list"].includes(String(data.binding.encoding)) || !Array.isArray(data.columns) || !data.columns.length || !data.columns.every((column) => object2(column) && text(column.id) && text(column.label) && (column.labelZh === void 0 || typeof column.labelZh === "string") && (column.format === void 0 || column.format === "image") && (column.integer === void 0 || typeof column.integer === "boolean" && column.type === "number") && [column.min, column.max].every((bound) => bound === void 0 || typeof bound === "number" && Number.isFinite(bound)) && (column.type === "number" || column.min === void 0 && column.max === void 0) && !(typeof column.min === "number" && typeof column.max === "number" && column.min > column.max) && (column.maxLength === void 0 || Number.isInteger(column.maxLength) && Number(column.maxLength) > 0) && (column.list === void 0 || object2(column.list) && Number.isInteger(column.list.maxItems) && Number(column.list.maxItems) > 0 && Number.isInteger(column.list.itemMaxLength) && Number(column.list.itemMaxLength) > 0 && text(column.list.separators)) && ["string", "number"].includes(String(column.type)) && ["id", "label", "value", "source", "target"].includes(String(column.role)) && (column.options === void 0 || Array.isArray(column.options) && column.options.every((option) => object2(option) && text(option.value) && text(option.label))))) return false;
  }
  if (!Array.isArray(value.files) || !value.files.length || value.files.length > 64 || !value.files.every((file) => object2(file) && text(file.path) && text(file.target) && ["hyperframes:composition", "hyperframes:asset", "hyperframes:style", "hyperframes:timeline"].includes(String(file.type)))) return false;
  if (value.registryDependencies !== void 0 && (!Array.isArray(value.registryDependencies) || value.registryDependencies.length)) return false;
  if (value.tags !== void 0 && (!Array.isArray(value.tags) || !value.tags.every(text))) return false;
  return value.variables === void 0 || Array.isArray(value.variables) && value.variables.every(isVariable) && new Set(value.variables.map((variable) => variable.id)).size === value.variables.length;
}
function parseComponentPack(raw) {
  if (!object2(raw) || raw.format !== "hyperframes:components" || raw.version !== 1 || !Array.isArray(raw.items) || raw.items.length < 1 || raw.items.length > 32) fail("Choose a HyperFrames component pack (.hfcomponent.json), not a standalone HTML page.");
  const names = /* @__PURE__ */ new Set();
  const items = raw.items.map((entry) => {
    if (!object2(entry) || !isManifest(entry.manifest) || !object2(entry.files)) fail("Invalid component manifest, variables or theme contract.");
    const manifest = entry.manifest;
    if (names.has(manifest.name)) fail(`Duplicate component: ${manifest.name}`);
    names.add(manifest.name);
    const files = {};
    const targets = /* @__PURE__ */ new Set();
    for (const file of manifest.files) {
      safeComponentPath("/component", file.path);
      safeComponentPath("/project", file.target);
      if (!file.target.startsWith(`compositions/${manifest.name}/`) || targets.has(file.target)) fail(`Component files must have unique targets inside compositions/${manifest.name}/`);
      targets.add(file.target);
      const content = entry.files[file.path];
      if (typeof content !== "string" || !/\.(?:html|js|mjs|css|svg|json|txt)$/i.test(file.path)) fail(`Missing or unsupported component file: ${file.path}`);
      files[file.path] = content;
    }
    if (Object.keys(entry.files).length !== manifest.files.length) fail("Unlisted or duplicate component files.");
    const primary = manifest.files.find((file) => file.type === "hyperframes:composition" && file.path.endsWith(".html"));
    if (!primary || !files[primary.path]?.includes(`data-composition-id="${manifest.name}"`)) fail("Component HTML must declare its native composition id.");
    return { manifest, files };
  });
  const pack = { format: "hyperframes:components", version: 1, items };
  if (Buffer.byteLength(JSON.stringify(pack)) > COMPONENT_PACK_MAX_BYTES) fail("Component pack exceeds 16 MB.");
  return pack;
}
function listLibraryComponents(root = componentLibraryRoot()) {
  if (!existsSync11(root)) return [];
  const items = [];
  for (const pack of readdirSync5(root, { withFileTypes: true })) {
    if (!pack.isDirectory() || !/^[a-f0-9]{64}$/.test(pack.name)) continue;
    const registryRoot = join17(root, pack.name);
    const blocks = join17(registryRoot, "blocks");
    if (!existsSync11(blocks) || lstatSync4(blocks).isSymbolicLink()) continue;
    for (const entry of readdirSync5(blocks, { withFileTypes: true })) {
      if (!entry.isDirectory() || !NAME.test(entry.name)) continue;
      try {
        const path = safeComponentPath(blocks, `${entry.name}/registry-item.json`);
        const manifest = JSON.parse(readFileSync15(path, "utf8"));
        if (isManifest(manifest) && manifest.name === entry.name) items.push({ manifest, registryRoot });
      } catch {
      }
    }
  }
  return items;
}
function importComponentPack(pack, builtInNames, root = componentLibraryRoot()) {
  const payload = JSON.stringify(pack);
  const hash = createHash7("sha256").update(payload).digest("hex");
  const destination = join17(root, hash);
  const collisions = /* @__PURE__ */ new Set([...builtInNames, ...listLibraryComponents(root).filter((item) => item.registryRoot !== destination).map((item) => item.manifest.name)]);
  for (const { manifest } of pack.items) if (collisions.has(manifest.name)) fail(`Component already exists: ${manifest.name}. Rename the imported component; existing videos are preserved.`);
  if (existsSync11(destination)) return pack.items.map((item) => item.manifest);
  mkdirSync2(root, { recursive: true });
  if (lstatSync4(root).isSymbolicLink()) fail("Component library must not be a symbolic link.");
  const staging = mkdtempSync3(join17(root, ".import-"));
  try {
    for (const { manifest, files } of pack.items) {
      const itemRoot = join17(staging, "blocks", manifest.name);
      mkdirSync2(itemRoot, { recursive: true });
      for (const [path, content] of Object.entries(files)) {
        const target = safeComponentPath(itemRoot, path);
        mkdirSync2(dirname7(target), { recursive: true });
        writeFileSync6(target, content, { flag: "wx" });
      }
      writeFileSync6(join17(itemRoot, "registry-item.json"), JSON.stringify(manifest), { flag: "wx" });
    }
    renameSync4(staging, destination);
  } finally {
    rmSync6(staging, { recursive: true, force: true });
  }
  return pack.items.map((item) => item.manifest);
}
function installLibraryComponent(component, projectDir) {
  const itemRoot = join17(component.registryRoot, "blocks", component.manifest.name);
  const files = component.manifest.files.map((file) => ({
    target: safeComponentPath(projectDir, file.target),
    content: readFileSync15(safeComponentPath(itemRoot, file.path), "utf8")
  }));
  for (const file of files) if (file.target.endsWith(".html") && existsSync11(file.target) && !readFileSync15(file.target, "utf8").includes(`data-composition-id="${component.manifest.name}"`)) fail("This project already has a different file at the component path. It was preserved.");
  for (const file of files) if (!existsSync11(file.target)) {
    mkdirSync2(dirname7(file.target), { recursive: true });
    writeFileSync6(file.target, file.content, { flag: "wx" });
  }
  return files.map((file) => file.target.slice(resolve9(projectDir).length + 1).split(sep4).join("/"));
}

// ../studio-server/src/routes/registry.ts
function finitePreviewNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
function promoteStandaloneRegistryTemplate(html) {
  const opening = /<template\b[^>]*>/i.exec(html);
  if (!opening || opening.index == null) return html;
  const contentStart = opening.index + opening[0].length;
  const closingIndex = html.indexOf("</template>", contentStart);
  if (closingIndex < 0) return html;
  const outsideTemplate = `${html.slice(0, opening.index)}${html.slice(closingIndex + 11)}`;
  if (/\bdata-composition-id\s*=/i.test(outsideTemplate)) return html;
  return `${html.slice(0, opening.index)}${html.slice(contentStart, closingIndex)}${html.slice(
    closingIndex + 11
  )}`;
}
function loadGsapForRegistryPreview(html) {
  const usesGsap = /\b(?:window\.)?gsap\.(?:timeline|to|from|fromTo|set|registerPlugin)\b/.test(html);
  const hasGsap = /<script\b[^>]*\bsrc=["'][^"']*gsap[^"']*\.js/i.test(html) || /\b(?:GreenSock|_gsScope)\b/.test(html);
  if (!usesGsap || hasGsap) return html;
  const script = '<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>';
  return /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `${script}</head>`) : `${script}${html}`;
}
function loadHyperframesRuntimeForRegistryPreview(html, runtimeUrl) {
  if (!runtimeUrl || !/\bwindow\.__hyperframes\b/.test(html) || /<script\b[^>]*\bsrc=["'][^"']*(?:hyperframe\.runtime|\/api\/runtime\.js)/i.test(html)) return html;
  const script = `<script src="${runtimeUrl}"></script>`;
  return /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `${script}</head>`) : `${script}${html}`;
}
function buildRegistryPreviewHtml(html, { assetBaseUrl, autoplay, duration, focus, runtimeUrl, seekTime, width: width2, height }) {
  const safeDuration = Math.max(0.1, duration);
  const safeSeekTime = Math.max(0, Math.min(seekTime, safeDuration));
  const safeFocus = focus && Number.isFinite(focus.x) && Number.isFinite(focus.y) && Number.isFinite(focus.zoom) && focus.zoom > 0 ? {
    x: Math.max(0, Math.min(1, focus.x)),
    y: Math.max(0, Math.min(1, focus.y)),
    zoom: Math.max(1, Math.min(4, focus.zoom))
  } : null;
  const previewScript = `<script data-hf-registry-preview>
(() => {
  const autoplay = ${JSON.stringify(autoplay)};
  const duration = ${JSON.stringify(safeDuration)};
  const seekTime = ${JSON.stringify(safeSeekTime)};
  const sourceWidth = ${JSON.stringify(Math.max(1, width2))};
  const sourceHeight = ${JSON.stringify(Math.max(1, height))};
  const previewFocus = ${JSON.stringify(safeFocus)};
  let animationFrame = 0;

  const fitComposition = () => {
    const baseScale = Math.min(window.innerWidth / sourceWidth, window.innerHeight / sourceHeight);
    const scale = previewFocus ? baseScale * previewFocus.zoom : baseScale;
    const focusX = sourceWidth * (previewFocus ? previewFocus.x : 0.5);
    const focusY = sourceHeight * (previewFocus ? previewFocus.y : 0.5);
    const offsetX = previewFocus
      ? window.innerWidth / 2 - focusX * scale
      : (window.innerWidth - sourceWidth * scale) / 2;
    const offsetY = previewFocus
      ? window.innerHeight / 2 - focusY * scale
      : (window.innerHeight - sourceHeight * scale) / 2;
    document.documentElement.style.width = "100%";
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.width = sourceWidth + "px";
    document.body.style.height = sourceHeight + "px";
    document.body.style.margin = "0";
    document.body.style.transformOrigin = "top left";
    document.body.style.transform =
      "translate(" + offsetX + "px, " + offsetY + "px) scale(" + scale + ")";
  };

  const seek = (time) => {
    window.dispatchEvent(new CustomEvent("hf-seek", { detail: { time } }));
    for (const timeline of Object.values(window.__timelines || {})) {
      if (timeline && typeof timeline.seek === "function") timeline.seek(time);
    }
  };

  const start = () => {
    fitComposition();
    if (!autoplay) {
      seek(seekTime);
      return;
    }
    const timelineDurations = Object.values(window.__timelines || {})
      .map((timeline) => {
        if (timeline && typeof timeline.totalDuration === "function") {
          return timeline.totalDuration();
        }
        return timeline && typeof timeline.duration === "function" ? timeline.duration() : 0;
      })
      .filter((value) => Number.isFinite(value) && value > 0);
    const motionDuration = timelineDurations.length ? Math.max(...timelineDurations) : duration;
    const previewDuration = Math.min(duration, Math.max(1.25, motionDuration + 0.45));
    const startedAt = performance.now();
    const tick = (now) => {
      seek(((now - startedAt) / 1000) % previewDuration);
      animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
  };

  window.addEventListener("resize", fitComposition);
  window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame), { once: true });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else start();
})();
</script>`;
  const baseTag = `<base href="${assetBaseUrl}">`;
  const previewHtml = loadHyperframesRuntimeForRegistryPreview(
    loadGsapForRegistryPreview(promoteStandaloneRegistryTemplate(html)),
    runtimeUrl
  );
  const htmlWithBase = /<head(?:\s[^>]*)?>/i.test(previewHtml) ? previewHtml.replace(/<head(?:\s[^>]*)?>/i, (head) => `${head}${baseTag}`) : `${baseTag}${previewHtml}`;
  return /<\/body>/i.test(htmlWithBase) ? htmlWithBase.replace(/<\/body>/i, `${previewScript}</body>`) : `${htmlWithBase}${previewScript}`;
}
function registerRegistryRoutes(api, adapter) {
  api.use("/projects/:id/components/:elementId", bodyLimit2({ maxSize: 64 * 1024 }));
  for (const method of ["GET", "PATCH"]) api.on(method, "/projects/:id/components/:elementId", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const sourceFile = c.req.query("sourceFile") ?? "index.html";
    const path = resolveWithinProject(project.dir, sourceFile);
    if (!path || !/\.html?$/i.test(sourceFile)) return c.json({ error: "Invalid composition path" }, 400);
    let source;
    try {
      source = readFileSync16(path, "utf8");
    } catch {
      return c.json({ error: "not found" }, 404);
    }
    const { document: document2 } = parseHTML(source), elementId = c.req.param("elementId");
    const matches = [...document2.querySelectorAll("[id]")].filter((node) => node.id === elementId);
    const host = matches[0];
    if (!host || matches.length !== 1) return c.json({ error: "Select one unique installed component id" }, 404);
    const compositionSrc = host.getAttribute("data-composition-src");
    const installedPath = compositionSrc && resolveWithinProject(project.dir, compositionSrc);
    if (!installedPath) return c.json({ error: "Invalid installed component path" }, 400);
    let model;
    try {
      const installed = parseHTML(readFileSync16(installedPath, "utf8")).document;
      const content = installed.querySelector("template")?.content ?? installed;
      const embedded = JSON.parse(content.querySelector("[data-component-content-model]")?.getAttribute("data-component-content-model") ?? "null");
      if (!isComponentContentModel(embedded)) return c.json({ error: "This installed component has no structured content contract; install its current template to use JSON editing" }, 422);
      const defaults2 = { ...embedded.defaults };
      const declaration = JSON.parse(installed.querySelector("[data-composition-variables]")?.getAttribute("data-composition-variables") ?? "[]");
      if (Array.isArray(declaration)) for (const variable of declaration) {
        if (variable && typeof variable === "object" && "id" in variable && "default" in variable && typeof variable.id === "string" && (typeof variable.default === "string" || typeof variable.default === "boolean" || typeof variable.default === "number" && Number.isFinite(variable.default))) defaults2[variable.id] = variable.default;
      }
      model = { ...embedded, defaults: defaults2, duration: Number(host.getAttribute("data-source-duration") ?? embedded.duration) };
    } catch {
      return c.json({ error: "Installed component declarations are invalid" }, 422);
    }
    const defaults = model.defaults;
    let raw;
    try {
      raw = JSON.parse(host.getAttribute("data-variable-values") ?? "{}");
    } catch {
      return c.json({ error: "Invalid current variables" }, 422);
    }
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return c.json({ error: "Invalid current variables" }, 422);
    const current = { ...defaults };
    for (const [id, value] of Object.entries(raw)) if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") current[id] = value;
    const revision = fileContentVersion(source);
    if (method === "GET") {
      try {
        return c.json({ elementId, sourceFile, componentId: model.type, revision, data: toJSON(model, current), schema: schema(model), guide: guide(model), example: toJSON(model, defaults) });
      } catch (error) {
        return c.json({ error: error instanceof Error ? error.message : "Invalid current data" }, 422);
      }
    }
    const body = await c.req.json().catch(() => null);
    if (!body || typeof body !== "object" || !("revision" in body) || !("data" in body) || typeof body.revision !== "string") return c.json({ error: "Pass the revision from read and one data object" }, 400);
    if (body.revision !== revision) return c.json({ error: "Component changed; read current data before retrying", revision }, 409);
    const result = fromJSON(model, body.data, current);
    if (result.errors.length) return c.json({ error: "Invalid component data", issues: result.errors }, 422);
    if (!adapter.generateThumbnail) return c.json({ error: "Component layout validation is unavailable" }, 503);
    const preview = new URL(`/api/projects/${encodeURIComponent(project.id)}/preview${sourceFile === "index.html" ? "" : `/comp/${sourceFile.split("/").map(encodeURIComponent).join("/")}`}`, c.req.url);
    let review;
    try {
      review = await adapter.generateThumbnail({
        project,
        compPath: sourceFile,
        seekTime: 0,
        width: 1920,
        height: 1080,
        outputWidth: 1920,
        outputHeight: 1080,
        signal: c.req.raw.signal,
        previewUrl: preview.href,
        componentVariables: { elementId, values: result.values }
      });
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : "Layout validation failed" }, 422);
    }
    if (!review || Buffer.isBuffer(review)) return c.json({ error: "Component layout validation is unavailable" }, 503);
    if (!review.valid) return c.json({ error: "Component layout does not fit", issues: review.issues }, 422);
    if (fileContentVersion(readFileSync16(path, "utf8")) !== revision) return c.json({ error: "Component changed during validation; read before retrying" }, 409);
    const overrides = Object.fromEntries(Object.entries(result.values).filter(([id, value]) => value !== defaults[id]));
    const patched = patchElementInHtml(source, { id: elementId }, [{ type: "attribute", property: "variable-values", value: Object.keys(overrides).length ? JSON.stringify(overrides) : null }]).html;
    if (patched === source) return c.json({ ok: true, changed: false, revision, data: toJSON(model, result.values) });
    const backup = snapshotBeforeWrite(project.dir, path);
    if (backup.error) return c.json({ error: backup.error }, 500);
    writeFileSync7(path, patched, "utf8");
    const nextRevision = fileContentVersion(patched);
    recordFileWriteReceipt(path, { path: sourceFile, version: nextRevision, writeToken: createWriteToken() });
    adapter.invalidateProjectSignature?.(project.dir);
    return c.json({
      ok: true,
      changed: true,
      revision: nextRevision,
      data: toJSON(model, result.values),
      backupPath: backupPathForResponse(project.dir, backup.backupPath)
    });
  });
  api.use("/registry/import", bodyLimit2({ maxSize: COMPONENT_PACK_MAX_BYTES }));
  api.post("/registry/import", async (c) => {
    const origin = c.req.header("Origin");
    if (origin && origin !== new URL(c.req.url).origin) return c.json({ error: "Cross-origin component import is not allowed" }, 403);
    if (!c.req.header("Content-Type")?.startsWith("application/json")) return c.json({ error: "JSON component pack required" }, 415);
    try {
      const body = await c.req.json();
      if (!body || typeof body !== "object") throw new Error("Invalid component pack request");
      const pack = parseComponentPack(Reflect.get(body, "package"));
      if (Reflect.get(body, "confirmed") !== true) return c.json({ items: pack.items.map((item) => ({ name: item.manifest.name, title: item.manifest.title })) });
      const builtIns = await adapter.listRegistryCatalog?.() ?? [];
      const items = importComponentPack(pack, builtIns.map((item) => item.name));
      return c.json({ items });
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : "Unable to import component pack" }, 400);
    }
  });
  api.get("/registry/blocks", async (c) => {
    if (!adapter.listRegistryCatalog) {
      return c.json({ error: "Registry not available" }, 501);
    }
    const items = await adapter.listRegistryCatalog();
    const names = new Set(items.map((item) => item.name));
    return c.json([...items, ...listLibraryComponents().filter((item) => !names.has(item.manifest.name)).map((item) => item.manifest)]);
  });
  api.get("/registry/blocks/:name/preview", async (c) => {
    if (!adapter.loadRegistryPreview) {
      return c.text("Registry preview not available", 501);
    }
    const name = c.req.param("name");
    const imported = listLibraryComponents().find((item) => item.manifest.name === name);
    const preview = await adapter.loadRegistryPreview({ blockName: name }) ?? (imported ? loadRegistryPreviewFromRoot(imported.registryRoot, name) : null);
    if (!preview) return c.text("Registry block not found", 404);
    const duration = Math.max(0.1, preview.duration);
    const seekTime = finitePreviewNumber(c.req.query("time"), duration / 2);
    const autoplay = c.req.query("autoplay") === "1";
    return c.html(
      buildRegistryPreviewHtml(
        c.req.query("overlay") === "1" ? `${preview.html}<style>html,body{background:transparent!important}</style>` : preview.html,
        {
          assetBaseUrl: `/api/registry/blocks/${encodeURIComponent(c.req.param("name"))}/assets/`,
          autoplay,
          duration,
          seekTime,
          focus: preview.focus,
          runtimeUrl: adapter.runtimeUrl,
          width: preview.dimensions.width,
          height: preview.dimensions.height
        }
      ),
      200,
      {
        "Cache-Control": "private, max-age=300",
        "Content-Security-Policy": "default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; img-src 'self' https: data: blob:; media-src 'self' https: data: blob:"
      }
    );
  });
  api.get("/registry/blocks/:name/assets/*", async (c) => {
    if (!adapter.loadRegistryPreviewAsset) {
      return c.text("Registry preview assets not available", 501);
    }
    const assetMarker = "/assets/";
    const assetMarkerIndex = c.req.path.indexOf(assetMarker);
    const assetPath = decodeURIComponent(
      assetMarkerIndex >= 0 ? c.req.path.slice(assetMarkerIndex + assetMarker.length) : ""
    );
    const imported = listLibraryComponents().find((item) => item.manifest.name === c.req.param("name"));
    const asset = await adapter.loadRegistryPreviewAsset({
      blockName: c.req.param("name"),
      assetPath
    }) ?? (imported ? loadRegistryPreviewAssetFromRoot(imported.registryRoot, c.req.param("name"), assetPath) : null);
    if (!asset) return c.text("Registry asset not found", 404);
    const responseBody = Uint8Array.from(asset.body).buffer;
    return new Response(responseBody, {
      headers: {
        "Cache-Control": "private, max-age=3600",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": asset.contentType,
        "Content-Length": String(asset.body.byteLength)
      }
    });
  });
  api.post("/projects/:id/registry/install", async (c) => {
    if (!adapter.installRegistryBlock) {
      return c.json({ error: "Registry install not available" }, 501);
    }
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "Project not found" }, 404);
    const body = await c.req.json().catch(() => null);
    if (!body?.blockName) {
      return c.json({ error: "blockName is required" }, 400);
    }
    try {
      const imported = listLibraryComponents().find((item) => item.manifest.name === body.blockName);
      if (imported) return c.json({ written: installLibraryComponent(imported, project.dir), block: imported.manifest });
      const result = await adapter.installRegistryBlock({ project, blockName: body.blockName });
      return c.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Install failed";
      return c.json({ error: message }, 500);
    }
  });
}

// ../studio-server/src/routes/selection.ts
function isRecord3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
function isStringRecord(value) {
  return isRecord3(value) && Object.values(value).every((v) => typeof v === "string");
}
function hasString(value, key) {
  return typeof value[key] === "string";
}
function hasRequiredStrings(value, keys) {
  return keys.every((key) => hasString(value, key));
}
function hasOptionalString(value, key) {
  return value[key] === void 0 || typeof value[key] === "string";
}
function hasOptionalNullableString(value, key) {
  return value[key] == null || typeof value[key] === "string";
}
function hasOptionalNumber(value, key) {
  return value[key] === void 0 || isFiniteNumber(value[key]);
}
function isBoundingBox(value) {
  return isRecord3(value) && ["x", "y", "width", "height"].every((key) => isFiniteNumber(value[key]));
}
function isTarget(value) {
  if (!isRecord3(value)) return false;
  return hasOptionalNullableString(value, "id") && hasOptionalString(value, "hfId") && hasOptionalString(value, "selector") && hasOptionalNumber(value, "selectorIndex");
}
function isTextField(value) {
  return isRecord3(value) && hasRequiredStrings(value, ["key", "label", "value", "tagName"]) && ["self", "child", "text-node"].includes(value.source);
}
function isTextFields(value) {
  return Array.isArray(value) && value.every(isTextField);
}
function isSelectionSnapshot(value) {
  if (!isRecord3(value)) return false;
  const checks = [
    value.schemaVersion === 1 && hasRequiredStrings(value, [
      "projectId",
      "compositionPath",
      "sourceFile",
      "label",
      "tagName",
      "thumbnailUrl"
    ]),
    isFiniteNumber(value.currentTime),
    isTarget(value.target),
    isBoundingBox(value.boundingBox),
    value.textContent === null || typeof value.textContent === "string",
    isStringRecord(value.dataAttributes),
    isStringRecord(value.inlineStyles),
    isStringRecord(value.computedStyles),
    isTextFields(value.textFields),
    isRecord3(value.capabilities)
  ];
  return checks.every(Boolean);
}
function registerSelectionRoutes(api, adapter) {
  const selections = /* @__PURE__ */ new Map();
  const maxSelections = 256;
  api.get("/projects/:id/selection", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const stored = selections.get(project.id);
    return c.json({
      selection: stored?.selection ?? null,
      updatedAt: stored?.updatedAt ?? null
    });
  });
  api.put("/projects/:id/selection", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: "invalid json" }, 400);
    }
    if (!isRecord3(body) || !("selection" in body)) {
      return c.json({ error: "missing selection" }, 400);
    }
    if (body.selection === null) {
      selections.delete(project.id);
      return c.json({ ok: true, selection: null, updatedAt: null });
    }
    if (!isSelectionSnapshot(body.selection)) {
      return c.json({ error: "invalid selection" }, 400);
    }
    const selection = { ...body.selection, projectId: project.id };
    const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    selections.delete(project.id);
    selections.set(project.id, { selection, updatedAt });
    while (selections.size > maxSelections) {
      const oldest = selections.keys().next().value;
      if (oldest === void 0) break;
      selections.delete(oldest);
    }
    return c.json({ ok: true, selection, updatedAt });
  });
}

// ../studio-server/src/routes/storyboard.ts
import { existsSync as existsSync12, readFileSync as readFileSync17, statSync as statSync11 } from "fs";

// ../core/dist/storyboard/types.js
var STORYBOARD_FILENAME = "STORYBOARD.md";
var SCRIPT_FILENAME = "SCRIPT.md";
var FRAME_STATUSES = [
  "outline",
  "built",
  "animated"
];
var DEFAULT_FRAME_STATUS = "outline";

// ../core/dist/storyboard/parseStoryboard.js
function parseStoryboard(source) {
  const warnings = [];
  const { globals, bodyStartLine, body } = parseFrontmatter(source, warnings);
  const frames = parseFrames(body, bodyStartLine, warnings);
  return { globals, frames, warnings };
}
var FRAME_HEADING_RE = /^(#{2,3})[ \t]+(?:frame|beat|scene)\b/i;
var FRAME_TITLE_SEP_RE = /^[\s.:—-]+/;
var HEADING_LEVEL_RE = /^(#{1,6})\s+/;
var META_RE = /^\s*[-*]\s+([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/;
var LEADING_INT_RE = /^(\d+)/;
var DURATION_NUM_RE = /(\d+(?:\.\d+)?)/;
var TRANSITION_KEYS = /* @__PURE__ */ new Set([
  "transition_in",
  "transitionin",
  "transition"
]);
var SCENE_KEYS = /* @__PURE__ */ new Set(["scene", "description", "summary", "caption"]);
var VOICEOVER_ALIASES = [
  "voiceover",
  "vo",
  "voice_over",
  "narration"
];
var VOICEOVER_KEYS = new Set(VOICEOVER_ALIASES);
var SPEAKER_ALIASES = [
  "speaker",
  "character",
  "voice_role",
  "voice_character"
];
var SPEAKER_KEYS = new Set(SPEAKER_ALIASES);
function emptyGlobals() {
  return { extra: {} };
}
function isFrameStatus(value) {
  return FRAME_STATUSES.includes(value);
}
function findFrontmatterRange(lines, warnings) {
  let start = 0;
  while (start < lines.length && (lines[start] ?? "").trim() === "")
    start++;
  if ((lines[start] ?? "").trim() !== "---")
    return null;
  for (let i = start + 1; i < lines.length; i++) {
    if ((lines[i] ?? "").trim() === "---")
      return { start, end: i };
  }
  warnings.push({
    message: "Frontmatter opening '---' has no closing '---'; treating whole file as body.",
    line: start + 1
  });
  return null;
}
function parseFrontmatterEntries(lines, start, end, warnings) {
  const globals = emptyGlobals();
  for (let i = start + 1; i < end; i++) {
    const raw = lines[i] ?? "";
    if (raw.trim() === "")
      continue;
    const colon = raw.indexOf(":");
    if (colon === -1) {
      warnings.push({
        message: `Ignored non key:value frontmatter line: "${raw.trim()}"`,
        line: i + 1
      });
      continue;
    }
    const key = raw.slice(0, colon).trim().toLowerCase();
    assignGlobal(globals, key, stripQuotes(raw.slice(colon + 1).trim()));
  }
  return globals;
}
function parseFrontmatter(source, warnings) {
  const lines = source.split(/\r?\n/);
  const range = findFrontmatterRange(lines, warnings);
  if (!range)
    return { globals: emptyGlobals(), bodyStartLine: 1, body: source };
  const globals = parseFrontmatterEntries(lines, range.start, range.end, warnings);
  const body = lines.slice(range.end + 1).join("\n");
  return { globals, bodyStartLine: range.end + 2, body };
}
function assignGlobal(globals, key, value) {
  switch (key) {
    case "format":
      globals.format = value;
      break;
    case "message":
      globals.message = value;
      break;
    case "arc":
      globals.arc = value;
      break;
    case "audience":
      globals.audience = value;
      break;
    case "theme":
      globals.theme = value;
      break;
    case "visual_style":
    case "visualstyle":
      globals.visualStyle = value;
      break;
    case "music_prompt":
    case "musicprompt":
      globals.musicPrompt = value;
      break;
    case "music_asset":
    case "musicasset":
      globals.musicAsset = value;
      break;
    case "template":
      globals.template = value;
      break;
    case "align_to_template":
    case "aligntotemplate":
      globals.alignToTemplate = value.toLowerCase() === "true";
      break;
    default:
      globals.extra[key] = value;
  }
}
function openFrameSection(line, headingLine) {
  const match = FRAME_HEADING_RE.exec(line);
  if (!match)
    return null;
  const headingText = line.slice(match[0].length).replace(FRAME_TITLE_SEP_RE, "").trim();
  return {
    headingText,
    headingLine,
    level: (match[1] ?? "##").length,
    lines: []
  };
}
function endsFrameSection(line, current) {
  if (!current)
    return false;
  const heading = HEADING_LEVEL_RE.exec(line);
  return heading !== null && (heading[1] ?? "").length <= current.level;
}
function parseFrames(body, bodyStartLine, warnings) {
  const lines = body.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";
    const opened = openFrameSection(line, bodyStartLine + i);
    if (opened) {
      sections.push(opened);
      current = opened;
    } else if (endsFrameSection(line, current)) {
      current = null;
    } else if (current) {
      current.lines.push(line);
    }
  }
  return sections.map((section, idx) => buildFrame(section, idx + 1, warnings));
}
function buildFrame(section, index, warnings) {
  const frame2 = {
    index,
    status: DEFAULT_FRAME_STATUS,
    narrative: "",
    extra: {}
  };
  const { number, title } = parseHeading(section.headingText);
  if (number !== void 0)
    frame2.number = number;
  if (title)
    frame2.title = title;
  const narrativeLines = [];
  for (const line of section.lines) {
    const meta = META_RE.exec(line);
    if (meta) {
      applyMeta(frame2, (meta[1] ?? "").toLowerCase(), (meta[2] ?? "").trim(), section.headingLine, warnings);
    } else {
      if (/^\s*(?:scene|duration|voiceover|camera|asset_source|status)\s*:/.test(line)) {
        warnings.push({
          message: "Write each script field on a separate '- key: value' line; this paragraph is not editable field metadata.",
          line: section.headingLine
        });
      }
      narrativeLines.push(line);
    }
  }
  frame2.narrative = narrativeLines.join("\n").trim();
  return frame2;
}
function parseHeading(text3) {
  if (!text3)
    return {};
  const intMatch = LEADING_INT_RE.exec(text3);
  if (!intMatch)
    return { title: text3 };
  const number = Number.parseInt(intMatch[1] ?? "", 10);
  const rest = text3.slice((intMatch[0] ?? "").length).replace(/^[\s.:—-]+/, "").trim();
  return { number, title: rest || void 0 };
}
var META_SETTERS = new Map([
  ["duration", applyDuration],
  ["status", applyStatus],
  ["poster", applyPoster],
  [
    "camera",
    (frame2, value) => {
      frame2.camera = stripQuotes(value);
    }
  ],
  [
    "asset_source",
    (frame2, value) => {
      frame2.assetSource = stripQuotes(value);
    }
  ],
  [
    "asset_brief",
    (frame2, value) => {
      frame2.assetBrief = stripQuotes(value);
    }
  ],
  ["asset_kind", (frame2, value) => {
    frame2.assetKind = stripQuotes(value);
  }],
  ["asset_origin", (frame2, value) => {
    frame2.assetOrigin = stripQuotes(value);
  }],
  [
    "asset_reference",
    (frame2, value) => {
      frame2.assetReference = stripQuotes(value);
    }
  ],
  [
    "music",
    (frame2, value) => {
      frame2.music = stripQuotes(value);
    }
  ],
  [
    "sound_effects",
    (frame2, value) => {
      frame2.soundEffects = stripQuotes(value);
    }
  ],
  [
    "sound_effect_reference",
    (frame2, value) => {
      frame2.soundEffectReference = stripQuotes(value);
    }
  ],
  ...keyedSetters(SPEAKER_KEYS, (frame2, value) => {
    frame2.speaker = stripQuotes(value);
  }),
  ["voice_id", (frame2, value) => {
    frame2.voiceId = stripQuotes(value);
  }],
  ["voice_model", (frame2, value) => {
    frame2.voiceModel = stripQuotes(value);
  }],
  ["voice_name", (frame2, value) => {
    frame2.voiceName = stripQuotes(value);
  }],
  ["recipe", (frame2, value) => {
    frame2.extra.recipe = stripQuotes(value);
  }],
  ["recipe_intent", (frame2, value) => {
    frame2.extra.recipe_intent = stripQuotes(value);
  }],
  ["scene_id", (frame2, value) => {
    frame2.extra.scene_id = stripQuotes(value);
  }],
  ["custom_reason", (frame2, value) => {
    frame2.extra.custom_reason = stripQuotes(value);
  }],
  [
    "src",
    (frame2, value) => {
      frame2.src = value;
    }
  ],
  ...keyedSetters(TRANSITION_KEYS, (frame2, value) => {
    frame2.transitionIn = stripQuotes(value);
  }),
  ...keyedSetters(SCENE_KEYS, (frame2, value) => {
    frame2.scene = stripQuotes(value);
  }),
  ...keyedSetters(VOICEOVER_KEYS, (frame2, value) => {
    frame2.voiceover = stripQuotes(value);
  })
]);
function keyedSetters(keys, setter) {
  return [...keys].map((key) => [key, setter]);
}
function applyMeta(frame2, key, value, headingLine, warnings) {
  const setter = META_SETTERS.get(key);
  if (setter)
    setter(frame2, value, headingLine, warnings);
  else
    frame2.extra[key] = value;
}
function applyPoster(frame2, value) {
  const num = DURATION_NUM_RE.exec(value);
  if (num)
    frame2.poster = Number.parseFloat(num[1] ?? "");
}
function applyDuration(frame2, value, headingLine, warnings) {
  frame2.duration = value;
  const num = DURATION_NUM_RE.exec(value);
  if (num) {
    frame2.durationSeconds = Number.parseFloat(num[1] ?? "");
    return;
  }
  warnings.push({
    message: `Frame ${frame2.index}: could not parse duration "${value}".`,
    line: headingLine,
    frameIndex: frame2.index
  });
}
function applyStatus(frame2, value, headingLine, warnings) {
  const normalized = value.toLowerCase();
  if (isFrameStatus(normalized)) {
    frame2.status = normalized;
    return;
  }
  frame2.extra.status = value;
  warnings.push({
    message: `Frame ${frame2.index}: unknown status "${value}"; defaulting to "${DEFAULT_FRAME_STATUS}".`,
    line: headingLine,
    frameIndex: frame2.index
  });
}
function stripQuotes(value) {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if (first === '"' && last === '"' || first === "'" && last === "'") {
      return value.slice(1, -1);
    }
  }
  return value;
}

// ../studio-server/src/routes/storyboard.ts
function resolveFrames(projectDir, frames) {
  const entry = resolveWithinProject(projectDir, "index.html");
  let hosts = [];
  try {
    if (entry && statSync11(entry).isFile() && statSync11(entry).size <= 2 * 1024 * 1024) {
      hosts = Array.from(parseHTML(readFileSync17(entry, "utf8")).document.querySelectorAll("[data-ipw-scene]"));
    }
  } catch {
  }
  const sourceComponents = /* @__PURE__ */ new Map();
  return frames.map((frame2) => {
    let srcExists = false;
    if (frame2.src) {
      const abs = resolveWithinProject(projectDir, frame2.src);
      srcExists = abs ? existsSync12(abs) : false;
    }
    const componentId = frame2.extra.recipe?.trim().replace(/^component:/, "") || frame2.camera?.match(/^component:([a-z0-9-]+)(?:#[a-z0-9-]+)?(?:\s*\|.*)?$/)?.[1];
    if (!componentId || !/^[a-z0-9-]+$/.test(componentId)) return { ...frame2, srcExists };
    const sceneId = frame2.extra.scene_id?.trim();
    const matching = hosts.filter((host2) => sceneId ? host2.getAttribute("id") === sceneId : Boolean(frame2.src) && host2.getAttribute("data-composition-src") === frame2.src);
    if (matching.length !== 1) return { ...frame2, srcExists };
    const host = matching[0];
    const source = host.getAttribute("data-composition-src");
    if (!source || host.getAttribute("data-ipw-registry-component") !== componentId || host.getAttribute("data-ipw-timing-owner") !== "host") return { ...frame2, srcExists };
    if (!sourceComponents.has(source)) {
      let sourceComponent = null;
      try {
        const abs = resolveWithinProject(projectDir, source);
        if (abs && statSync11(abs).isFile() && statSync11(abs).size <= 2 * 1024 * 1024) {
          const document2 = parseHTML(readFileSync17(abs, "utf8")).document;
          if (document2.querySelector('script[data-ipw-motion-recipe="1"]')) {
            sourceComponent = document2.querySelector("[data-composition-id]")?.getAttribute("data-composition-id") ?? null;
          }
        }
      } catch {
      }
      sourceComponents.set(source, sourceComponent);
    }
    return {
      ...frame2,
      srcExists,
      ...sourceComponents.get(source) === componentId ? { recipeMount: { componentId, source } } : {}
    };
  });
}
function readScript(projectDir) {
  const abs = resolveWithinProject(projectDir, SCRIPT_FILENAME);
  if (abs && existsSync12(abs)) {
    try {
      return { exists: true, path: SCRIPT_FILENAME, content: readFileSync17(abs, "utf-8") };
    } catch {
    }
  }
  return { exists: false, path: SCRIPT_FILENAME, content: "" };
}
function registerStoryboardRoutes(api, adapter) {
  api.get("/projects/:id/storyboard", async (c) => {
    const resolved = await resolveProjectAndSignature(adapter, c.req.param("id"));
    if (!resolved) return c.json({ error: "not found" }, 404);
    const { project, signature } = resolved;
    const abs = resolveWithinProject(project.dir, STORYBOARD_FILENAME);
    if (!abs || !existsSync12(abs)) {
      return c.json({
        exists: false,
        path: STORYBOARD_FILENAME,
        source: null,
        globals: { extra: {} },
        frames: [],
        warnings: [],
        script: readScript(project.dir),
        signature
      });
    }
    let source;
    try {
      source = readFileSync17(abs, "utf-8");
    } catch {
      return c.json({ error: "failed to read storyboard" }, 500);
    }
    const manifest = parseStoryboard(source);
    return c.json({
      exists: true,
      path: STORYBOARD_FILENAME,
      source,
      globals: manifest.globals,
      frames: resolveFrames(project.dir, manifest.frames),
      warnings: manifest.warnings,
      script: readScript(project.dir),
      signature
    });
  });
}

// ../studio-server/src/routes/media.ts
import { streamSSE as streamSSE2 } from "hono/streaming";
import { existsSync as existsSync13 } from "fs";
import { basename as basename3, dirname as dirname8, extname as extname2, join as join18, posix } from "path";
var VIDEO_EXTENSIONS = /* @__PURE__ */ new Set([
  ".mp4",
  ".mov",
  ".webm",
  ".mkv",
  ".avi",
  ".m4v",
  ".mxf",
  ".mts",
  ".m2ts",
  ".ts"
]);
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp"]);
var VIDEO_OUTPUT_EXTENSIONS = /* @__PURE__ */ new Set([".webm", ".mov"]);
var QUALITIES = /* @__PURE__ */ new Set(["fast", "balanced", "best"]);
var DEVICES = /* @__PURE__ */ new Set(["auto", "cpu", "coreml", "cuda"]);
function isVideoPath(path) {
  return VIDEO_EXTENSIONS.has(extname2(path).toLowerCase());
}
function isImagePath(path) {
  return IMAGE_EXTENSIONS.has(extname2(path).toLowerCase());
}
function normalizeProjectAssetPath(path) {
  return path.trim().replace(/^[.]\//, "").replace(/[?#].*$/, "");
}
function containsNullByte(path) {
  return path.includes("\0");
}
function slugFileBase(path) {
  const name = basename3(path, extname2(path)).replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return name || "media";
}
function uniqueAssetPath(projectDir, assetPath, taken) {
  const ext = extname2(assetPath);
  const withoutExt = assetPath.slice(0, -ext.length);
  let candidate = assetPath;
  for (let index = 2; taken.has(candidate) || existsSync13(join18(projectDir, candidate)); index++) {
    candidate = `${withoutExt}-${index}${ext}`;
  }
  return candidate;
}
function defaultOutputPath(projectDir, inputPath, taken) {
  const ext = isImagePath(inputPath) ? ".png" : ".webm";
  return uniqueAssetPath(
    projectDir,
    `assets/cutouts/${slugFileBase(inputPath)}-cutout${ext}`,
    taken
  );
}
function defaultPlatePath(projectDir, inputPath, taken) {
  return uniqueAssetPath(projectDir, `assets/cutouts/${slugFileBase(inputPath)}-plate.webm`, taken);
}
function outputsInFlight(mediaJobs) {
  const running = [...mediaJobs.values()].filter((job) => job.status === "processing");
  return new Set(
    running.flatMap((job) => [job.outputAssetPath, job.backgroundOutputAssetPath ?? ""])
  );
}
function makeJobId(projectId, mediaJobs) {
  const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const safeProject = projectId.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  const base = `${safeProject || "project"}_remove-bg_${stamp}`;
  if (!mediaJobs.has(base)) return base;
  for (let index = 2; ; index++) {
    const candidate = `${base}-${index}`;
    if (!mediaJobs.has(candidate)) return candidate;
  }
}
function normalizeQuality(value) {
  return QUALITIES.has(value ?? "") ? value : "balanced";
}
function normalizeDevice(value) {
  return DEVICES.has(value ?? "") ? value : "auto";
}
function registerMediaRoutes(api, adapter, options = {}) {
  const mediaJobs = /* @__PURE__ */ new Map();
  const TTL_MS = 3e5;
  const CLEANUP_INTERVAL_MS = 6e4;
  const MAX_MEDIA_JOBS = 256;
  let cleanupTimer = null;
  const readMediaMetadata = options.probeMediaMetadata ?? probeMediaMetadata;
  function cleanupFinishedJobs() {
    const now = Date.now();
    for (const [id, job] of mediaJobs) {
      if ((job.status === "complete" || job.status === "failed") && now - job.createdAt > TTL_MS) {
        mediaJobs.delete(id);
      }
    }
    const finishedOldestFirst = Array.from(mediaJobs.entries()).filter(([, job]) => job.status === "complete" || job.status === "failed").sort(([, left], [, right]) => left.createdAt - right.createdAt);
    while (mediaJobs.size >= MAX_MEDIA_JOBS && finishedOldestFirst.length > 0) {
      const oldest = finishedOldestFirst.shift();
      if (oldest) mediaJobs.delete(oldest[0]);
    }
    if (mediaJobs.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }
  function ensureCleanupTimer() {
    if (cleanupTimer) return;
    cleanupTimer = setInterval(cleanupFinishedJobs, CLEANUP_INTERVAL_MS);
    if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) cleanupTimer.unref();
  }
  api.get("/projects/:id/media/metadata", async (c) => {
    const project = await adapter.resolveProject(c.req.param("id"));
    if (!project) return c.json({ error: "not found" }, 404);
    const assetPath = normalizeProjectAssetPath(c.req.query("path") ?? "");
    if (!assetPath) return c.json({ error: "path required" }, 400);
    if (containsNullByte(assetPath)) return c.json({ error: "forbidden" }, 403);
    if (/^(?:https?:|data:|blob:)/i.test(assetPath)) {
      return c.json({ error: "media metadata requires a project-local asset" }, 400);
    }
    const filePath = resolveWithinProject(project.dir, assetPath);
    if (!filePath) return c.json({ error: "forbidden" }, 403);
    if (!existsSync13(filePath)) return c.json({ error: "media not found" }, 404);
    return c.json({ path: assetPath, metadata: await readMediaMetadata(filePath) });
  });
  api.post(
    "/projects/:id/media/remove-background",
    // fallow-ignore-next-line complexity
    async (c) => {
      cleanupFinishedJobs();
      if (mediaJobs.size >= MAX_MEDIA_JOBS) {
        return c.json({ error: "too many active media jobs" }, 429);
      }
      if (!adapter.startBackgroundRemoval) {
        return c.json({ error: "background removal is not available in this Studio server" }, 501);
      }
      const project = await adapter.resolveProject(c.req.param("id"));
      if (!project) return c.json({ error: "not found" }, 404);
      const body = await c.req.json().catch(() => ({}));
      const inputAssetPath = body.inputPath ? normalizeProjectAssetPath(body.inputPath) : "";
      if (!inputAssetPath) return c.json({ error: "inputPath required" }, 400);
      if (containsNullByte(inputAssetPath)) return c.json({ error: "forbidden" }, 403);
      if (/^(?:https?:|data:|blob:)/i.test(inputAssetPath)) {
        return c.json({ error: "background removal requires a project-local media asset" }, 400);
      }
      const inputPath = resolveWithinProject(project.dir, inputAssetPath);
      if (!inputPath) return c.json({ error: "forbidden" }, 403);
      if (!existsSync13(inputPath)) return c.json({ error: "input media not found" }, 404);
      const inputIsVideo = isVideoPath(inputAssetPath);
      const inputIsImage = isImagePath(inputAssetPath);
      if (!inputIsVideo && !inputIsImage) {
        return c.json({ error: "background removal supports video or image assets only" }, 400);
      }
      const requestedOutput = body.outputPath ? posix.normalize(normalizeProjectAssetPath(body.outputPath)) : "";
      if (requestedOutput && containsNullByte(requestedOutput)) {
        return c.json({ error: "forbidden" }, 403);
      }
      if (requestedOutput && !resolveWithinProject(project.dir, requestedOutput)) {
        return c.json({ error: "forbidden" }, 403);
      }
      let foregroundPath;
      if (body.foregroundPath) {
        if (!inputIsVideo || body.createBackgroundPlate) {
          return c.json({ error: "foreground reuse requires a video without a background plate" }, 400);
        }
        const foregroundAssetPath = normalizeProjectAssetPath(body.foregroundPath);
        if (/^(?:https?:|data:|blob:)/i.test(foregroundAssetPath)) {
          return c.json({ error: "foreground requires a project-local video" }, 400);
        }
        if (containsNullByte(foregroundAssetPath)) return c.json({ error: "forbidden" }, 403);
        foregroundPath = resolveWithinProject(project.dir, foregroundAssetPath) ?? void 0;
        if (!foregroundPath) return c.json({ error: "forbidden" }, 403);
        if (!isVideoPath(foregroundPath)) return c.json({ error: "foreground must be a video" }, 400);
        if (!existsSync13(foregroundPath)) return c.json({ error: "foreground not found" }, 404);
      }
      const requestKey = JSON.stringify([
        project.dir,
        inputPath,
        requestedOutput,
        foregroundPath,
        body.createBackgroundPlate === true,
        normalizeQuality(body.quality),
        normalizeDevice(body.device)
      ]);
      const existing = [...mediaJobs.values()].find(
        (job) => job.status === "processing" && job.requestKey === requestKey
      );
      if (existing) return c.json({
        jobId: existing.id,
        status: existing.status,
        outputPath: existing.outputAssetPath,
        backgroundOutputPath: existing.backgroundOutputAssetPath
      });
      const taken = outputsInFlight(mediaJobs);
      const outputAssetPath = requestedOutput ? uniqueAssetPath(project.dir, requestedOutput, taken) : defaultOutputPath(project.dir, inputAssetPath, taken);
      const outputPath = pinWithinProject(project.dir, outputAssetPath);
      if (!outputPath) return c.json({ error: "forbidden" }, 403);
      if (inputIsVideo && !VIDEO_OUTPUT_EXTENSIONS.has(extname2(outputAssetPath).toLowerCase())) {
        return c.json({ error: "video background removal output must be .webm or .mov" }, 400);
      }
      if (inputIsImage && extname2(outputAssetPath).toLowerCase() !== ".png") {
        return c.json({ error: "image background removal output must be .png" }, 400);
      }
      let backgroundOutputAssetPath;
      let backgroundOutputPath;
      if (body.createBackgroundPlate) {
        if (!inputIsVideo) {
          return c.json({ error: "background plates are only supported for video inputs" }, 400);
        }
        taken.add(outputAssetPath);
        backgroundOutputAssetPath = defaultPlatePath(project.dir, inputAssetPath, taken);
        backgroundOutputPath = pinWithinProject(project.dir, backgroundOutputAssetPath) ?? void 0;
        if (!backgroundOutputPath) {
          return c.json({ error: "forbidden" }, 403);
        }
      }
      mkdirWithinProject(project.dir, dirname8(outputPath));
      if (backgroundOutputPath) mkdirWithinProject(project.dir, dirname8(backgroundOutputPath));
      const jobId = makeJobId(project.id, mediaJobs);
      const state = adapter.startBackgroundRemoval({
        project,
        inputPath,
        inputAssetPath,
        outputPath,
        outputAssetPath,
        foregroundPath,
        backgroundOutputPath,
        backgroundOutputAssetPath,
        quality: normalizeQuality(body.quality),
        device: normalizeDevice(body.device),
        jobId
      });
      state.createdAt = Date.now();
      state.requestKey = requestKey;
      mediaJobs.set(jobId, state);
      ensureCleanupTimer();
      return c.json({
        jobId,
        status: state.status,
        outputPath: outputAssetPath,
        backgroundOutputPath: backgroundOutputAssetPath
      });
    }
  );
  api.get("/media-jobs/:jobId/progress", (c) => {
    cleanupFinishedJobs();
    const { jobId } = c.req.param();
    const job = mediaJobs.get(jobId);
    if (!job) return c.json({ error: "not found" }, 404);
    return streamSSE2(c, async (stream) => {
      while (true) {
        const current = mediaJobs.get(jobId);
        if (!current) break;
        await stream.writeSSE({
          event: "progress",
          data: JSON.stringify({
            id: current.id,
            status: current.status,
            progress: current.progress,
            stage: current.stage,
            outputPath: current.outputAssetPath,
            backgroundOutputPath: current.backgroundOutputAssetPath,
            error: current.error,
            provider: current.provider,
            framesProcessed: current.framesProcessed,
            durationSeconds: current.durationSeconds,
            avgMsPerFrame: current.avgMsPerFrame
          })
        });
        if (current.status === "complete" || current.status === "failed") break;
        await stream.sleep(500);
      }
    });
  });
}

// ../studio-server/src/routes/globalAssets.ts
import { existsSync as existsSync14, readFileSync as readFileSync18 } from "fs";
import { homedir as homedir2 } from "os";
import { join as join19 } from "path";
function readGlobalAssets(home = homedir2()) {
  const manifestPath = join19(home, ".media", "manifest.jsonl");
  if (!existsSync14(manifestPath)) return [];
  const out = [];
  for (const line of readFileSync18(manifestPath, "utf8").split("\n")) {
    if (!line.trim()) continue;
    try {
      const rec = JSON.parse(line);
      if (rec && rec.reusable) out.push(rec);
    } catch {
    }
  }
  return out;
}
function toPublicAsset(r) {
  return { id: r.id, type: r.type, description: r.description, sha: r.sha, entity: r.entity };
}
function registerGlobalAssetRoutes(api) {
  api.get("/assets/global", (c) => c.json({ assets: readGlobalAssets().map(toPublicAsset) }));
}

// ../studio-server/src/routes/history.ts
var YOU = { kind: "person", name: "You" };
async function historyOf(adapter, c) {
  const project = await adapter.resolveProject(c.req.param("id") ?? "");
  return project ? await adapter.history?.(project) ?? null : null;
}
async function bodyOf(c) {
  const body = await c.req.json().catch(() => null);
  return body && typeof body === "object" ? body : {};
}
var text2 = (value) => typeof value === "string" && value ? value : null;
function writing(c) {
  const header = c.req.header("X-Hyperframes-Write-Token");
  return header ? { writeToken: createWriteToken(header) } : {};
}
function whoOf(body) {
  const who = body.who;
  const name = text2(who?.name);
  return who?.kind === "agent" && name ? { kind: "agent", name } : YOU;
}
function idleOf(body) {
  const idleMs = body.idleMs;
  return typeof idleMs === "number" && idleMs > 0 ? Math.min(idleMs, MAX_WINDOW_IDLE_MS) : void 0;
}
function versionsOf(value) {
  if (!value || typeof value !== "object") return void 0;
  const pairs = Object.entries(value).filter(
    (pair) => typeof pair[1] === "string"
  );
  return pairs.length ? Object.fromEntries(pairs) : void 0;
}
function nextStep(history, direction) {
  const target = history.next(direction, YOU);
  if (!target) return null;
  const paths = target.files.map((file) => file.path);
  return { id: target.id, label: target.label, endedAt: target.endedAt, paths };
}
async function withHistory(adapter, c, task) {
  const history = await historyOf(adapter, c);
  if (!history) return c.json({ error: "This project has no history here." }, 404);
  try {
    return c.json(await task(history, await bodyOf(c)) ?? null);
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : String(error) }, 409);
  }
}
function legacyEntries(value) {
  if (!Array.isArray(value) || value.length > 100) throw new Error("Invalid legacy history stack.");
  return value.map((entry) => {
    if (!entry || typeof entry !== "object") throw new Error("Invalid legacy history entry.");
    const record = entry;
    if (typeof record.id !== "string" || !record.id || record.id.length > 160 || typeof record.label !== "string" || record.label.length > 1e3 || typeof record.createdAt !== "number" || !Number.isFinite(record.createdAt) || !record.files || typeof record.files !== "object" || Array.isArray(record.files))
      throw new Error("Invalid legacy history entry.");
    const files = /* @__PURE__ */ Object.create(null);
    const pairs = Object.entries(record.files);
    if (!pairs.length || pairs.length > 100) throw new Error("Invalid legacy history files.");
    for (const [path, snapshot] of pairs) {
      const file = snapshot;
      if (!file || typeof file.before !== "string" || typeof file.after !== "string") throw new Error("Invalid legacy snapshot.");
      files[path] = { before: file.before, after: file.after };
    }
    return { id: record.id, label: record.label, createdAt: record.createdAt, files };
  });
}
function registerHistoryRoutes(api, adapter) {
  const windows = /* @__PURE__ */ new Map();
  const base = "/projects/:id/history";
  api.post(base + "/import-legacy-studio", (c) => withHistory(adapter, c, async (history, body) => {
    if (!history.importLegacyStudio) throw new Error("Legacy history migration is unavailable.");
    await history.importLegacyStudio(legacyEntries(body.undo), legacyEntries(body.redo), YOU);
    return { ok: true };
  }));
  api.get(
    base,
    (c) => withHistory(adapter, c, (history) => {
      const entries = history.list();
      return { entries, back: nextStep(history, "back"), forward: nextStep(history, "forward") };
    })
  );
  api.post(
    `${base}/step`,
    (c) => withHistory(
      adapter,
      c,
      (history, body) => history.step(body.direction === "forward" ? "forward" : "back", YOU, writing(c))
    )
  );
  api.post(
    `${base}/undo`,
    (c) => withHistory(adapter, c, (history, body) => {
      const mode = UNDO_MODES.find((known) => known === body.mode);
      return history.undo(text2(body.entryId) ?? "", { who: whoOf(body), mode, ...writing(c) });
    })
  );
  api.post(
    `${base}/restore`,
    (c) => withHistory(
      adapter,
      c,
      (history, body) => history.restore(text2(body.point) ?? "", whoOf(body), writing(c))
    )
  );
  api.get(
    `${base}/peek/:point`,
    (c) => withHistory(adapter, c, (history) => ({ files: history.peek(c.req.param("point")) }))
  );
  api.post(
    `${base}/pin`,
    (c) => withHistory(adapter, c, (history, body) => {
      history.pin(text2(body.entryId) ?? "", body.pinned === true);
      return { ok: true };
    })
  );
  api.get(`${base}/blob/:hash`, async (c) => {
    const history = await historyOf(adapter, c);
    const hash = c.req.param("hash") ?? "";
    const missing = () => c.json({ error: "That file is not kept in this project's history." }, 404);
    if (!history || !/^[0-9a-f]{64}$/.test(hash)) return missing();
    const bytes = await history.readBlob(hash).catch(() => null);
    return bytes ? c.body(new Uint8Array(bytes)) : missing();
  });
  api.post(
    `${base}/claim`,
    (c) => withHistory(adapter, c, async (history, body) => {
      const paths = Array.isArray(body.paths) ? body.paths.filter((path) => text2(path)) : [];
      const coalesceKey = text2(body.coalesceKey) ?? void 0;
      const overwrote = versionsOf(body.overwrote);
      const claimed = await history.claim(YOU, text2(body.label) ?? "Edited in Studio", paths, {
        ...coalesceKey && { coalesceKey, idleMs: idleOf(body) ?? Infinity },
        ...overwrote && { overwrote }
      });
      return { claimed };
    })
  );
  api.post(
    `${base}/window`,
    (c) => withHistory(adapter, c, async (history, body) => {
      const idleMs = idleOf(body);
      const window2 = await history.beginWindow(
        whoOf(body),
        text2(body.label) ?? "Edited in Studio",
        idleMs ? { idleMs } : void 0
      );
      windows.set(window2.id, { history, window: window2 });
      return { windowId: window2.id, startedAt: window2.startedAt };
    })
  );
  api.post(
    `${base}/window/:windowId/close`,
    (c) => withHistory(adapter, c, async (history) => {
      const id = c.req.param("windowId") ?? "";
      const held = windows.get(id);
      if (held?.history !== history) throw new Error("That window is not open in this project.");
      windows.delete(id);
      return { entry: await held.window.close() };
    })
  );
}

// ../studio-server/src/createStudioApi.ts
function createStudioApi(adapter) {
  const api = new Hono();
  api.use(async function answerProjectDirMissingAfterErrorHandlers(c, next) {
    const hostHeaders = new Headers(c.res.headers);
    await next();
    if (isProjectRootMissing(c.error)) replaceWithProjectDirMissing(c, hostHeaders);
  });
  api.use("/projects/:id/*", async function answerProjectDirMissingForVanishedFolder(c, next) {
    const hostHeaders = new Headers(c.res.headers);
    const dirBeforeRoute = await Promise.resolve().then(() => adapter.resolveProject(c.req.param("id"))).then(
      (project) => project?.dir,
      () => void 0
    );
    await next();
    if (c.res.status >= 403 && dirBeforeRoute && folderGone(dirBeforeRoute))
      replaceWithProjectDirMissing(c, hostHeaders);
  });
  api.use("/projects/:id/*", async function forgetSignatureAfterWrite(c, next) {
    await next();
    if (c.req.method === "GET" || c.req.method === "HEAD") return;
    const project = await Promise.resolve().then(() => adapter.resolveProject(c.req.param("id"))).catch(() => null);
    if (project) adapter.invalidateProjectSignature?.(project.dir);
  });
  api.use("/projects/:id/*", async function openHistorySoNoWriteBecomesItsBaseline(c, next) {
    if (c.req.method !== "GET" && c.req.method !== "HEAD" && adapter.history) {
      await Promise.resolve().then(() => adapter.resolveProject(c.req.param("id"))).then((project) => project && adapter.history?.(project)).catch(() => null);
    }
    await next();
  });
  registerProjectRoutes(api, adapter);
  registerFileRoutes(api, adapter);
  registerPreviewRoutes(api, adapter);
  registerLintRoutes(api, adapter);
  registerRenderRoutes(api, adapter);
  registerThumbnailRoutes(api, adapter);
  registerImageThumbnailRoutes(api, adapter);
  registerSelectionRoutes(api, adapter);
  registerStoryboardRoutes(api, adapter);
  registerMediaRoutes(api, adapter);
  registerWaveformRoutes(api, adapter);
  registerFreezeFrameRoutes(api, adapter);
  registerLoudnessRoutes(api, adapter);
  registerPeakRoutes(api, adapter);
  registerFontRoutes(api);
  registerRegistryRoutes(api, adapter);
  registerGlobalAssetRoutes(api);
  registerHistoryRoutes(api, adapter);
  return api;
}

// ../core/dist/clipFacts.js
var byStart = (a, b) => a.start - b.start || a.trackIndex - b.trackIndex;
var instantTolerance = (time) => 4 * Number.EPSILON * Math.max(1, Math.abs(time));
function sameInstant(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b))
    return a === b;
  return Math.abs(a - b) <= instantTolerance(Math.max(Math.abs(a), Math.abs(b)));
}
var isBefore = (a, b) => a < b && !sameInstant(a, b);
function spansShareTime(aStart, aEnd, bStart, bEnd) {
  return isBefore(Math.max(aStart, bStart), Math.min(aEnd, bEnd));
}
var isInsideSpan = (time, start, end) => isBefore(start, time) && isBefore(time, end);

// ../studio-server/src/helpers/duplicateElement.ts
function duplicateElementInHtml(source, target, newId, at) {
  const { document: document2, wrappedFragment } = parseSourceDocument(source);
  const element = findTargetElement(document2, target);
  if (!element || !element.parentElement) return { html: source, matched: false, newId: null };
  const duration = numericAttribute(element, "data-duration");
  const track = numericAttribute(element, "data-track-index") ?? 0;
  if (duration === null || numericAttribute(element, "data-start") === null) {
    return { html: source, matched: false, newId: null };
  }
  const uniqueId = nextUniqueId(document2, newId);
  rippleElements(document2, element, at, duration, track);
  const clone = element.cloneNode(true);
  if (!isHTMLElement(clone)) return { html: source, matched: false, newId: null };
  clone.setAttribute("id", uniqueId);
  dedupeClonedCompositionId(document2, clone);
  stripStableIds(clone);
  clone.setAttribute("data-start", String(at));
  element.parentElement.insertBefore(clone, element.nextSibling);
  const html = wrappedFragment ? document2.body.innerHTML || "" : document2.toString();
  return { html: ensureHfIds(html), matched: true, newId: uniqueId };
}
function rippleElements(document2, element, at, duration, track) {
  for (const candidate of Array.from(document2.querySelectorAll("[data-start][data-duration]"))) {
    if (candidate === element || candidate.getAttribute("data-track-index") !== String(track)) {
      continue;
    }
    const start = numericAttribute(candidate, "data-start");
    if (start === null) continue;
    const metInsertionPoint = sameInstant(start, at);
    if (start < at && !metInsertionPoint) continue;
    candidate.setAttribute("data-start", String((metInsertionPoint ? at : start) + duration));
  }
}
function stripStableIds(element) {
  element.removeAttribute("data-hf-id");
  for (const child of Array.from(element.querySelectorAll("[data-hf-id]"))) {
    child.removeAttribute("data-hf-id");
  }
}
function numericAttribute(element, name) {
  const value = Number(element.getAttribute(name));
  return Number.isFinite(value) ? value : null;
}

// ../studio-server/src/helpers/previewDocumentStore.ts
import { createHash as createHash8 } from "crypto";
import { readFileSync as readFileSync19, readdirSync as readdirSync6, rmSync as rmSync7 } from "fs";
import { join as join20 } from "path";
function createPreviewDocumentStore(projectDir, salt) {
  const dir = join20(projectDir, ".hyperframes", "preview");
  const fileFor = (key) => join20(dir, `${createHash8("sha256").update(`${salt}
${key}`).digest("hex").slice(0, 32)}.html`);
  return {
    read(key) {
      try {
        return readFileSync19(fileFor(key), "utf-8");
      } catch {
        return null;
      }
    },
    write(key, html) {
      try {
        mkdirWithinProject(projectDir, dir);
        const file = fileFor(key);
        replaceFileAtomically(file, html, 420);
        for (const name of readdirSync6(dir)) {
          if (join20(dir, name) !== file) rmSync7(join20(dir, name), { force: true });
        }
      } catch {
      }
    }
  };
}

// ../studio-server/src/helpers/screenshotClip.ts
async function reviewComponentVariables(input) {
  const issues = [];
  try {
    const ready = await Promise.race([document.fonts.ready.then(() => true), new Promise((resolve10) => setTimeout(() => resolve10(false), 5e3))]);
    if (!ready) throw Error("Actual project fonts are not ready");
    const host = document.getElementById(input.elementId);
    const root = host?.querySelector("[data-hf-live-variables]") ?? host;
    const runtime = Reflect.get(window, "__hyperframes");
    if (!root || !runtime || typeof runtime.updateVariables !== "function" || !runtime.updateVariables(root, input.values)) throw Error("The component preview cannot validate these values");
    const candidateFonts = await Promise.race([document.fonts.ready.then(() => true), new Promise((resolve10) => setTimeout(() => resolve10(false), 5e3))]);
    if (!candidateFonts) throw Error("The candidate component fonts are not ready");
    if (!runtime.updateVariables(root, input.values)) throw Error("The component preview cannot validate these values with the actual fonts");
  } catch (error) {
    issues.push({ sceneId: input.elementId, code: "component-layout", time: 0, detail: error instanceof Error ? error.message : "Component validation failed" });
  }
  return {
    valid: !issues.length,
    scope: "runtime-timing-and-layout-not-semantic-approval",
    sampledFrameCount: 1,
    issues,
    carrierReview: { scope: "tracked-dom-not-semantic-continuity-approval", boundaries: [] },
    deterministicSeek: { checkedSceneCount: 0, valid: true }
  };
}
async function reviewVideoRuntime() {
  const fontsReady = await Promise.race([document.fonts.ready.then(() => true), new Promise((resolve10) => setTimeout(() => resolve10(false), 2e3))]);
  const issues = [];
  const add = (sceneId, code, time, detail) => {
    if (!issues.some((issue) => issue.sceneId === sceneId && issue.code === code && issue.detail === detail)) issues.push({ sceneId, code, time, detail });
  };
  if (!fontsReady) add("root", "fonts-not-ready", 0, "Actual fonts did not load within the review limit");
  const invoke = (owner, name, args = []) => {
    if (!owner || typeof owner !== "object") return void 0;
    const fn = Reflect.get(owner, name);
    return typeof fn === "function" ? Reflect.apply(fn, owner, args) : void 0;
  };
  const timelines = Reflect.get(window, "__timelines");
  const registered = timelines && typeof timelines === "object" ? Object.values(timelines) : [];
  const real = (timeline) => timeline && typeof timeline === "object" && Reflect.get(timeline, "__hfReal") || timeline;
  const entries = registered.map((timeline) => {
    const children = invoke(timeline, "getChildren", [true, true, false]);
    const nested = invoke(timeline, "getChildren", [true, false, true]);
    return { timeline, tweens: Array.isArray(children) ? children : [], nested: Array.isArray(nested) ? nested : [] };
  });
  const roots = entries.filter((entry) => !entries.some((other) => real(other.timeline) !== real(entry.timeline) && other.nested.includes(real(entry.timeline))));
  const clocks = /* @__PURE__ */ new Map();
  for (const root of roots) for (const tween of root.tweens) clocks.set(tween, root.timeline);
  const tweens = [...clocks.keys()].filter((tween) => tween !== null && typeof tween === "object");
  const tweenTime = (tween, time) => {
    const clock = real(clocks.get(tween));
    let node = tween, localTime = time;
    for (let depth = 0; depth < 64 && node && typeof node === "object"; depth++) {
      if (real(node) === clock) return localTime;
      const offset = invoke(node, "startTime"), scale = invoke(node, "timeScale");
      if (typeof offset !== "number" || !Number.isFinite(offset) || typeof scale !== "number" || !Number.isFinite(scale) || scale === 0) break;
      localTime = offset + localTime / Math.abs(scale);
      node = Reflect.get(node, "parent");
    }
    const value = invoke(tween, "globalTime", [time]);
    const origin = invoke(clock, "globalTime", [0]), unitEnd = invoke(clock, "globalTime", [1]);
    return typeof value === "number" && typeof origin === "number" && typeof unitEnd === "number" && Number.isFinite(origin) && Number.isFinite(unitEnd) && unitEnd !== origin ? (value - origin) / (unitEnd - origin) : value;
  };
  const seek = async (time) => {
    const player = Reflect.get(window, "__player");
    if (player && typeof player.seek === "function") invoke(player, "seek", [time]);
    else for (const root of roots) invoke(root.timeline, "pause", [time]);
    await new Promise((resolve10) => {
      const timeout = setTimeout(resolve10, 50);
      requestAnimationFrame(() => {
        clearTimeout(timeout);
        resolve10();
      });
    });
  };
  const scenes = Array.from(document.querySelectorAll(".scene.clip, [data-ipw-scene]"));
  if (!registered.length || !scenes.length || scenes.length > 48) add("root", "runtime-review-unavailable", 0, "Require registered timeline and 1\u201348 scenes");
  let sampledFrameCount = 0;
  let checkedSceneCount = 0;
  const visible = (element) => {
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.1) return false;
    }
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  const carriers = Array.from(document.querySelectorAll("[data-ipw-carrier], .vc-carrier")).slice(0, 160);
  const carrierSnapshot = () => carriers.map((element, index) => {
    const rect = element.getBoundingClientRect();
    return { index, visible: visible(element) && rect.right > 0 && rect.bottom > 0 && rect.left < window.innerWidth && rect.top < window.innerHeight, x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: rect.width, height: rect.height };
  });
  const geometry = (scene) => JSON.stringify([...scene.querySelectorAll("h1,h2,p,img,[data-ipw-carrier],.vc-carrier"), ...carriers].slice(0, 160).map((element) => {
    const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform === "none" ? void 0 : style.transform);
    return { visible: visible(element), text: element.textContent, rect: [rect.x, rect.y, rect.width, rect.height].map((value) => Math.round(value * 100) / 100), opacity: style.opacity, transform: Array.from(matrix.toFloat64Array()).map((value) => Math.round(value * 1e4) / 1e4), clip: style.clipPath, filter: style.filter };
  }));
  const windows = [];
  for (const scene of scenes.slice(0, 48)) {
    const start = Number(scene.getAttribute("data-start"));
    const duration = Number(scene.getAttribute("data-duration") ?? scene.getAttribute("data-hf-authored-duration"));
    const id = scene.id || "unnamed-scene";
    if (!Number.isFinite(start) || !Number.isFinite(duration) || duration <= 0) {
      add(id, "invalid-runtime-window", 0, "Missing finite scene timing");
      continue;
    }
    let beats;
    try {
      beats = JSON.parse(scene.getAttribute("data-ipw-beats") || "[]");
    } catch {
      add(id, "invalid-runtime-beats", start, "Malformed beat map");
    }
    const events = Array.isArray(beats) ? beats.slice(0, 12) : [];
    const decorativeChecks = [];
    for (const beat of events) {
      const from = start + Number(beat?.motion?.end) - 3, to = start + Number(beat?.motion?.end);
      if (beat?.intent !== "Develop" || !beat?.animation?.startsWith("custom:") || !Number.isFinite(Number(beat?.motion?.start)) || Number(beat.motion.end) - Number(beat.motion.start) < 4 || !Number.isFinite(from) || to > start + duration) continue;
      const active = tweens.filter((tween) => {
        const targets2 = invoke(tween, "targets"), begin = tweenTime(tween, 0);
        const length = invoke(tween, "totalDuration"), end = typeof length === "number" ? tweenTime(tween, length) : void 0;
        const vars = Reflect.get(tween, "vars");
        return (Array.isArray(targets2) && targets2.some((target) => target instanceof Element && (scene.contains(target) || target.contains(scene))) || vars && typeof vars.onUpdate === "function") && typeof begin === "number" && typeof end === "number" && begin < to && (length === 0 ? begin >= from : end > from);
      });
      const controls = /* @__PURE__ */ new Set(["duration", "delay", "ease", "data", "id", "parent", "startAt", "immediateRender", "overwrite", "lazy", "runBackwards", "stagger"]);
      const decorative = active.length > 0 && active.every((tween) => {
        const vars = Reflect.get(tween, "vars");
        if (!vars || typeof vars !== "object") return false;
        const keys = Object.keys(vars).filter((key) => !controls.has(key));
        return keys.length > 0 && keys.every((key) => ["letterSpacing", "scale", "scaleX", "scaleY"].includes(key));
      });
      if (!decorative) continue;
      const targets = [...new Set(active.flatMap((tween) => {
        const values = invoke(tween, "targets");
        return Array.isArray(values) ? values.filter((value) => value instanceof Element && (scene.contains(value) || value.contains(scene))) : [];
      }))];
      if (targets.length > 160) continue;
      const snapshot = () => targets.map((target) => {
        const style = getComputedStyle(target), matrix = new DOMMatrixReadOnly(style.transform === "none" ? void 0 : style.transform);
        return { spacing: Number.parseFloat(style.letterSpacing) || 0, x: Math.hypot(matrix.m11, matrix.m12, matrix.m13), y: Math.hypot(matrix.m21, matrix.m22, matrix.m23) };
      });
      decorativeChecks.push({ from: start + Math.min(Number(beat.motion.end), Number(beat.motion.start) + 1 / 30), to: start + Math.min(duration - 1 / 30, Number(beat.motion.end)), time: from, snapshot });
    }
    for (const beat of events) {
      if (!beat || typeof beat !== "object" || typeof beat.animation !== "string" || !beat.animation.startsWith("custom:") && !beat.animation.startsWith("component:")) continue;
      const targets = [];
      for (const selector of Array.isArray(beat.targets) ? beat.targets : []) {
        if (typeof selector !== "string") continue;
        try {
          targets.push(...scene.querySelectorAll(selector));
        } catch {
        }
      }
      const matches = tweens.filter((tween) => {
        if (!tween || typeof tween !== "object" || beat.animation.startsWith("custom:") && Reflect.get(tween, "data") !== beat.animation) return false;
        const actualTargets = invoke(tween, "targets");
        return Array.isArray(actualTargets) && actualTargets.some((target) => target instanceof Element && targets.some((element) => element === target || element.contains(target)));
      });
      const expected = start + Number(beat.motion?.start);
      if (!matches.length) add(id, "semantic-event-not-executed", expected, beat.animation);
      else if (beat.animation.startsWith("custom:")) {
        const expectedEnd = start + Number(beat.motion?.end), tolerance = 1 / 30 + 1e-3;
        const windows2 = matches.flatMap((tween) => {
          const from = tweenTime(tween, 0), length = invoke(tween, "totalDuration");
          const to = typeof length === "number" ? tweenTime(tween, length) : void 0;
          return typeof from === "number" && Number.isFinite(from) && typeof to === "number" && Number.isFinite(to) && to > expected && from < expectedEnd ? [{ from, to }] : [];
        });
        if (!windows2.length || Math.abs(Math.min(...windows2.map((window2) => window2.from)) - expected) > tolerance) add(id, "executed-event-time-mismatch", expected, beat.animation);
        else if (Math.abs(Math.max(...windows2.map((window2) => window2.to)) - expectedEnd) > tolerance) add(id, "executed-event-end-mismatch", expectedEnd, `${beat.animation}: declared end ${expectedEnd}, executed end ${Math.max(...windows2.map((window2) => window2.to))}`);
      } else if (!matches.some((tween) => {
        const actual = tweenTime(tween, 0);
        return typeof actual === "number" && (Math.abs(actual - expected) <= 1 / 30 + 1e-3 || beat.animation.startsWith("component:") && Math.abs(actual + start - expected) <= 1 / 30 + 1e-3);
      })) add(id, "executed-event-time-mismatch", expected, beat.animation);
    }
    const eventTimes = events.flatMap((beat) => {
      if (!beat || typeof beat !== "object") return [];
      const from = Number(beat.motion?.start), to = Number(beat.motion?.end);
      return Number.isFinite(from) && Number.isFinite(to) && from >= 0 && to > from && to <= duration ? [start + Math.min(to, from + 1 / 30), start + (from + to) / 2, start + Math.min(duration - 1 / 30, to)] : [];
    });
    const transition = Number(scene.getAttribute("data-ipw-transition-duration"));
    const transitionTimes = transition > 0 && transition <= duration ? [start + 1 / 30, start + transition / 2, start + Math.min(duration - 1 / 30, transition + 1 / 30)] : [];
    const samples = [.../* @__PURE__ */ new Set([...[0.15, 0.5, 0.85].map((fraction) => start + duration * fraction), ...eventTimes, ...transitionTimes])];
    const states = [];
    const reviewWindow = { scene, id, start, duration, boundaries: events.slice(1).map((beat) => start + Number(beat?.motion?.start)).filter((time) => Number.isFinite(time) && time > start && time < start + duration), states };
    windows.push(reviewWindow);
    let firstGeometry = "";
    for (const time of samples) {
      await seek(time);
      sampledFrameCount++;
      if (carriers.length) states.push({ time, carriers: carrierSnapshot() });
      if (time === samples[0]) firstGeometry = geometry(scene);
      for (const check of decorativeChecks) {
        if (time === check.from) check.before = check.snapshot();
        if (time === check.to) check.after = check.snapshot();
      }
      const elements = [...scene.querySelectorAll("img, h1, h2, h3, p, [data-ipw-caption], [data-ipw-connector-from]"), ...document.querySelectorAll("[data-composition-id] > .brand-lockup img, [data-composition-id] > [data-ipw-caption]")].slice(0, 160).filter(visible);
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (element instanceof HTMLImageElement && (!element.complete || !element.naturalWidth)) add(id, "broken-visible-media", time, (element.getAttribute("src") || "image").slice(0, 160));
        if (rect.left < -1 || rect.top < -1 || rect.right > window.innerWidth + 1 || rect.bottom > window.innerHeight + 1) add(id, "content-outside-stage", time, element.id || String(element.className) || element.tagName);
      }
      const captions = elements.filter((element) => element.matches("[data-ipw-caption], .narration-copy"));
      const bodies = Array.from(scene.querySelectorAll("[data-ipw-content], [class$='-stage'], [class$='-grid'], [class$='-workspace'], .vc-root")).filter(visible);
      for (const caption of captions) for (const body of bodies) {
        if (body.contains(caption)) continue;
        const a = caption.getBoundingClientRect(), b = body.getBoundingClientRect();
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2) add(id, "caption-content-overlap", time, `${caption.id || caption.className} / ${body.id || body.className}`);
      }
      for (const connector of elements.filter((element) => element.hasAttribute("data-ipw-connector-from"))) {
        const from = scene.querySelector(connector.getAttribute("data-ipw-connector-from") || ":not(*)");
        const to = scene.querySelector(connector.getAttribute("data-ipw-connector-to") || ":not(*)");
        if (!from || !to) add(id, "connector-endpoint-missing", time, connector.id || "connector");
        else {
          const line = connector.getBoundingClientRect(), a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
          const gap = (rect) => Math.hypot(Math.max(rect.left - line.right, line.left - rect.right, 0), Math.max(rect.top - line.bottom, line.top - rect.bottom, 0));
          if (gap(a) > 16 || gap(b) > 16) add(id, "connector-detached", time, connector.id || "connector");
        }
      }
    }
    await seek(samples[0]);
    sampledFrameCount++;
    checkedSceneCount++;
    if (geometry(scene) !== firstGeometry) add(id, "reverse-seek-state-mismatch", samples[0], "Direct and reverse seeking produce different visible text or geometry.");
    for (const check of decorativeChecks) {
      const after = check.after;
      if (after && check.before?.every((value, index) => Math.abs(value.spacing - after[index].spacing) <= 3 && Math.abs(value.x - after[index].x) <= 0.03 && Math.abs(value.y - after[index].y) <= 0.03)) {
        add(id, "long-develop-only-decorative", check.time, "The last 3 seconds contain only small tracking/scale changes. Advance visible content, focus or state, or shorten the action and declare a reading hold.");
      }
    }
  }
  const boundaries = [];
  const ordered = windows.sort((a, b) => a.start - b.start);
  for (const [index, window2] of ordered.entries()) {
    const previous = ordered[index - 1];
    const times = [...window2.boundaries, ...previous ? [window2.start] : []];
    const states = [...window2.states, ...previous?.states ?? []].sort((a, b) => a.time - b.time).filter((state, i, list) => i === 0 || state.time !== list[i - 1].time);
    for (const time of [...new Set(times)]) {
      const before = states.filter((state) => state.time < time), after = states.filter((state) => state.time >= time);
      const a = before.at(-1), b = after[0];
      const required = window2.scene.getAttribute("data-ipw-continuity") === "required";
      if (!a || !b) {
        if (required) add(window2.id, "carrier-boundary-not-sampled", time, "The declared continuous boundary needs samples on both sides.");
        continue;
      }
      const shared = a.carriers.filter((value) => value.visible && b.carriers[value.index]?.visible);
      const distance = shared.map((value) => Math.hypot(value.x - b.carriers[value.index].x, value.y - b.carriers[value.index].y));
      const scale = shared.map((value) => Math.max(value.width / b.carriers[value.index].width, b.carriers[value.index].width / value.width, value.height / b.carriers[value.index].height, b.carriers[value.index].height / value.height));
      const prior = before.at(-2), next = after[1];
      const velocities = prior && next ? shared.filter((value) => prior.carriers[value.index]?.visible && next.carriers[value.index]?.visible).map((value) => {
        const p = prior.carriers[value.index], n = next.carriers[value.index], end = b.carriers[value.index];
        return Math.hypot((value.x - p.x) / (a.time - prior.time) - (n.x - end.x) / (next.time - b.time), (value.y - p.y) / (a.time - prior.time) - (n.y - end.y) / (next.time - b.time));
      }) : [];
      boundaries.push({
        sceneId: window2.id,
        time,
        required,
        sharedVisibleCarriers: shared.length,
        sampleGap: b.time - a.time,
        displacementPx: distance.length ? Math.max(...distance) : null,
        scaleRatio: scale.length ? Math.max(...scale) : null,
        velocityChangePxPerSecond: velocities.length ? Math.max(...velocities) : null
      });
      if (required && !shared.length) add(window2.id, "declared-carrier-discontinuity", time, "No identical visible DOM carrier survives the declared continuous boundary; matching names do not count as identity.");
    }
  }
  return {
    valid: issues.length === 0,
    scope: "runtime-timing-and-layout-not-semantic-approval",
    sampledFrameCount,
    issues,
    carrierReview: { scope: "tracked-dom-not-semantic-continuity-approval", boundaries },
    deterministicSeek: { checkedSceneCount, valid: !issues.some((issue) => issue.code === "reverse-seek-state-mismatch") }
  };
}
function getElementScreenshotClip(selector, selectorIndex) {
  let matches;
  try {
    matches = Array.from(document.querySelectorAll(selector)).filter(
      (el2) => el2 instanceof HTMLElement
    );
  } catch {
    return void 0;
  }
  const safeIndex = Math.max(0, Math.min(matches.length - 1, Math.floor(selectorIndex ?? 0)));
  const el = matches[safeIndex] ?? null;
  if (!(el instanceof HTMLElement)) return void 0;
  const page = window;
  const faded = page.__hfThumbnailFaded ??= [];
  for (let node = el; node.parentElement; node = node.parentElement) {
    for (const sibling of Array.from(node.parentElement.children)) {
      const style = sibling.style;
      if (sibling === node || !style) continue;
      faded.push([style, style.getPropertyValue("opacity"), style.getPropertyPriority("opacity")]);
      style.setProperty("opacity", "0", "important");
    }
  }
  const rect = el.getBoundingClientRect();
  if (rect.width < 4 || rect.height < 4) return void 0;
  const pad = 8;
  const x = Math.max(0, rect.left - pad);
  const y = Math.max(0, rect.top - pad);
  const maxWidth = window.innerWidth - x;
  const maxHeight = window.innerHeight - y;
  return {
    x,
    y,
    width: Math.max(1, Math.min(rect.width + pad * 2, maxWidth)),
    height: Math.max(1, Math.min(rect.height + pad * 2, maxHeight))
  };
}
function clearElementScreenshotIsolation() {
  const page = window;
  for (const [style, value, priority] of (page.__hfThumbnailFaded ?? []).reverse()) {
    if (value) style.setProperty("opacity", value, priority);
    else style.removeProperty("opacity");
  }
  page.__hfThumbnailFaded = [];
}

// ../studio-server/src/helpers/thumbnailOutput.ts
function thumbnailDeviceScaleFactor({
  width: width2,
  height,
  outputWidth,
  outputHeight
}) {
  const dimensions = [width2, height, outputWidth, outputHeight];
  if (dimensions.some((value) => !Number.isFinite(value) || value <= 0)) {
    throw new RangeError("Thumbnail dimensions must be positive finite numbers");
  }
  return Math.min(1, outputWidth / width2, outputHeight / height);
}

// ../studio-server/src/helpers/backgroundRemovalJob.ts
function createBackgroundRemovalJob(opts, render) {
  const state = {
    id: opts.jobId,
    status: "processing",
    progress: 0,
    stage: "Preparing background removal",
    inputAssetPath: opts.inputAssetPath,
    outputAssetPath: opts.outputAssetPath,
    outputPath: opts.outputPath,
    ...opts.backgroundOutputPath ? { backgroundOutputPath: opts.backgroundOutputPath } : {},
    ...opts.backgroundOutputAssetPath ? { backgroundOutputAssetPath: opts.backgroundOutputAssetPath } : {}
  };
  void (async () => {
    try {
      const result = await render({
        inputPath: opts.inputPath,
        outputPath: opts.outputPath,
        foregroundPath: opts.foregroundPath,
        backgroundOutputPath: opts.backgroundOutputPath,
        device: opts.device,
        quality: opts.quality,
        onProgress: (event) => updateBackgroundRemovalProgress(state, event)
      });
      state.status = "complete";
      state.progress = 100;
      state.stage = "Complete";
      state.provider = result.provider;
      state.framesProcessed = result.framesProcessed;
      state.durationSeconds = result.durationSeconds;
      state.avgMsPerFrame = result.avgMsPerFrame;
    } catch (err) {
      state.status = "failed";
      state.error = err instanceof Error ? err.message : String(err);
      state.stage = "Failed";
    }
  })();
  return state;
}
function updateBackgroundRemovalProgress(state, event) {
  if (event.kind === "info") {
    state.stage = event.message;
    return;
  }
  if (event.kind === "metadata") {
    state.stage = `Source ${event.width}\xD7${event.height}`;
    state.progress = 2;
    return;
  }
  state.progress = event.total ? Math.min(99, Math.floor(event.index / event.total * 100)) : 0;
  state.stage = event.total ? `Removing background ${event.index}/${event.total}` : `Removing background frame ${event.index}`;
  state.framesProcessed = event.index;
  state.avgMsPerFrame = event.avgMsPerFrame;
}

export {
  stampProjectHfIds,
  MIME_TYPES,
  getMimeType,
  buildSubCompositionHtml,
  compositionsAffectedBy,
  applyFileMutations,
  requestSubPath,
  MAX_UPLOAD_BYTES,
  affectsPreview,
  injectMediaCodecMapIntoHtml,
  PREVIEW_BUNDLE_OPTIONS,
  resolveGsapRegistryItemEngine,
  loadRegistryPreviewFromRoot,
  loadRegistryPreviewAssetFromRoot,
  createStudioApi,
  byStart,
  sameInstant,
  spansShareTime,
  isInsideSpan,
  duplicateElementInHtml,
  createPreviewDocumentStore,
  reviewComponentVariables,
  reviewVideoRuntime,
  getElementScreenshotClip,
  clearElementScreenshotIsolation,
  thumbnailDeviceScaleFactor,
  createBackgroundRemovalJob
};
