import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// ../parsers/dist/assetResolution.js
import { closeSync, constants, existsSync, fstatSync, openSync, readFileSync } from "fs";
import { isAbsolute, join, posix, relative, resolve, sep } from "path";
function decodeUrlPathVariants(path) {
  const variants = [path];
  try {
    const decoded = decodeURIComponent(path);
    if (decoded !== path) variants.unshift(decoded);
  } catch {
  }
  return variants;
}
function isRemoteOrInlineUrl(url) {
  return /^(https?:|data:|blob:|\/\/|#)/i.test(url);
}
function hasUnresolvedTemplatingToken(url) {
  return /<<[^<>]+>>|\{\{[^{}]+\}\}|\$\{[^{}]+\}/.test(url);
}
function isUnresolvedAssetPlaceholder(rawSrc) {
  return /^__[A-Z_]+__$/.test(rawSrc.trim()) || hasUnresolvedTemplatingToken(rawSrc);
}
var COMPOSITION_SRC_ATTR = /\bdata-composition-src\s*=\s*["']([^"']+)["']/i;
function collectSubCompositionSrcs(html) {
  const scannable = maskNonScannableRanges(html);
  const srcs = [];
  const seen = /* @__PURE__ */ new Set();
  let cursor = 0;
  while (cursor < scannable.length) {
    const open = scannable.indexOf("<", cursor);
    if (open === -1) break;
    const close = scannable.indexOf(">", open + 1);
    if (close === -1) break;
    cursor = close + 1;
    const match = COMPOSITION_SRC_ATTR.exec(scannable.slice(open, cursor));
    if (!match) continue;
    const src = (match[1] ?? "").trim();
    if (!src || seen.has(src)) continue;
    if (isUnresolvedAssetPlaceholder(src)) continue;
    if (isRemoteOrInlineUrl(src)) continue;
    seen.add(src);
    srcs.push(src);
  }
  return srcs;
}
function cleanAssetUrl(url) {
  return url.trim().split(/[?#]/, 1)[0] ?? "";
}
function isWithinProjectRoot(projectDir, candidate, pathModule = { resolve, relative, isAbsolute }) {
  const projectRoot = pathModule.resolve(projectDir);
  const relativePath = pathModule.relative(projectRoot, candidate);
  return relativePath === "" || !relativePath.startsWith("..") && !pathModule.isAbsolute(relativePath);
}
function addCandidate(candidates, candidate) {
  if (!candidates.includes(candidate)) candidates.push(candidate);
}
function resolveLocalAssetCandidates(projectDir, url) {
  const cleanUrl = cleanAssetUrl(url);
  const projectRoot = resolve(projectDir);
  const candidates = [];
  for (const variant of decodeUrlPathVariants(cleanUrl)) {
    const projectRelative = variant.startsWith("/") ? variant.slice(1) : variant;
    const resolved = resolve(projectRoot, projectRelative);
    if (isWithinProjectRoot(projectRoot, resolved)) {
      addCandidate(candidates, resolved);
      continue;
    }
    const normalized = posix.normalize(projectRelative.replace(/\\/g, "/"));
    const clamped = normalized.replace(/^(\.\.\/)+/, "");
    if (clamped && !clamped.startsWith("..")) {
      addCandidate(candidates, resolve(projectRoot, clamped));
    }
  }
  return candidates;
}
function resolveExistingLocalAsset(projectDir, url) {
  const projectRoot = resolve(projectDir);
  const resolved = resolveLocalAssetCandidates(projectRoot, url).find(existsSync);
  if (!resolved) return null;
  return { resolved, rootRelativePath: relative(projectRoot, resolved) };
}
function reanchoredCandidates(variant, baseDir, compiledDir) {
  const baseAbs = resolve(baseDir);
  const joinedAbs = resolve(join(baseDir, variant));
  if (joinedAbs === baseAbs || joinedAbs.startsWith(baseAbs + sep)) return [];
  const stripped = posix.normalize(variant.replace(/\\/g, "/")).replace(/^(\.\.\/)+/, "");
  if (!stripped || stripped === variant || stripped.startsWith("..")) return [];
  return compiledDir ? [join(compiledDir, stripped), join(baseDir, stripped)] : [join(baseDir, stripped)];
}
function resolveProjectRelativeSrc(src, baseDir, compiledDir) {
  const cleanSrc = cleanAssetUrl(src);
  if (isAbsolute(cleanSrc) && existsSync(cleanSrc)) return cleanSrc;
  const candidates = /* @__PURE__ */ new Set();
  for (const variant of decodeUrlPathVariants(cleanSrc)) {
    for (const candidate of reanchoredCandidates(variant, baseDir, compiledDir)) {
      candidates.add(candidate);
    }
    if (compiledDir) candidates.add(join(compiledDir, variant));
    candidates.add(join(baseDir, variant));
  }
  return [...candidates].find(existsSync) ?? join(baseDir, cleanSrc);
}
function maskRange(src, pattern) {
  return src.replace(pattern, (m) => " ".repeat(m.length));
}
function maskHtmlComments(src) {
  const chunks = [];
  let cursor = 0;
  while (true) {
    const start = src.indexOf("<!--", cursor);
    if (start === -1) break;
    const end = src.indexOf("-->", start + 4);
    if (end === -1) break;
    const afterComment = end + 3;
    chunks.push(src.slice(cursor, start), " ".repeat(afterComment - start));
    cursor = afterComment;
  }
  return chunks.length === 0 ? src : chunks.join("") + src.slice(cursor);
}
function maskNonScannableRanges(html) {
  let out = maskHtmlComments(html);
  out = maskRange(out, /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
  out = maskRange(out, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi);
  return out;
}
function readProjectFile(path) {
  let fd;
  try {
    fd = openSync(path, constants.O_RDONLY | (constants.O_NONBLOCK ?? 0), 384);
  } catch (error) {
    const code = error.code ?? "";
    if (["EISDIR", "ENXIO"].includes(code)) return { kind: "folder" };
    if (["ENOENT", "ENOTDIR", "ELOOP", "ENAMETOOLONG"].includes(code)) return { kind: "missing" };
    throw error;
  }
  try {
    if (!fstatSync(fd).isFile()) return { kind: "folder" };
    return { kind: "file", text: readFileSync(fd, "utf-8") };
  } finally {
    closeSync(fd);
  }
}

export {
  isRemoteOrInlineUrl,
  isUnresolvedAssetPlaceholder,
  collectSubCompositionSrcs,
  cleanAssetUrl,
  isWithinProjectRoot,
  resolveLocalAssetCandidates,
  resolveExistingLocalAsset,
  resolveProjectRelativeSrc,
  maskNonScannableRanges,
  readProjectFile
};
