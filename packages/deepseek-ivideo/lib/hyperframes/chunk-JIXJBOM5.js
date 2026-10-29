import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  ensureCaptureDirSync,
  writeCaptureFileSync
} from "./chunk-MRF4AMKD.js";
import {
  createCaptureDownloadBudget,
  readBoundedResponse
} from "./chunk-AWDFDFI3.js";
import {
  isBlockedNetworkHost
} from "./chunk-3NHZZLH3.js";
import {
  DOMParser,
  parseHTML
} from "./chunk-GK4AIFIH.js";

// src/capture/userAgent.ts
var CAPTURE_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// src/capture/assetDownloader.ts
import { join, extname } from "path";
import { createHash as createHash2 } from "crypto";

// src/capture/faviconRanker.ts
var APPLE_TOUCH_DEFAULT_PX = 180;
function parseSizes(sizes) {
  if (!sizes) return 0;
  let max = 0;
  for (const token of sizes.trim().split(/\s+/)) {
    const m = /^(\d+)x(\d+)$/i.exec(token);
    if (!m) continue;
    max = Math.max(max, Number(m[1]), Number(m[2]));
  }
  return max;
}
function pathnameOf(href) {
  try {
    return new URL(href).pathname.toLowerCase();
  } catch {
    return href.split(/[#?]/)[0].toLowerCase();
  }
}
function isSvg(c) {
  return c.type?.toLowerCase() === "image/svg+xml" || pathnameOf(c.href).endsWith(".svg");
}
function isMaskIcon(c) {
  return c.rel.toLowerCase().split(/\s+/).includes("mask-icon");
}
function isIco(c) {
  const t = c.type?.toLowerCase();
  return t === "image/x-icon" || t === "image/vnd.microsoft.icon" || pathnameOf(c.href).endsWith(".ico");
}
function declaredSize(c) {
  const parsed = parseSizes(c.sizes);
  if (parsed > 0) return parsed;
  return c.rel.toLowerCase().split(/\s+/).some((t) => t.startsWith("apple-touch-icon")) ? APPLE_TOUCH_DEFAULT_PX : 0;
}
function tierOf(c) {
  if (isMaskIcon(c)) return 3;
  if (isSvg(c)) return 0;
  return isIco(c) ? 2 : 1;
}
function rankIconCandidates(candidates) {
  return candidates.filter((c) => !!c.href).map((c, i) => ({ c, i, tier: tierOf(c), size: declaredSize(c) })).sort((a, b) => a.tier - b.tier || b.size - a.size || a.i - b.i).map((e) => e.c);
}

// src/capture/iconClassifier.ts
import sharp from "sharp";
var NON_PAINTING = /* @__PURE__ */ new Set(["defs", "clippath", "mask", "style", "title", "desc", "metadata"]);
var PAINTING = /* @__PURE__ */ new Set(["rect", "circle", "ellipse", "path", "polygon", "image", "use"]);
function firstPaintedElement(root) {
  for (const child of Array.from(root.children)) {
    const tag = child.tagName.toLowerCase();
    if (NON_PAINTING.has(tag)) continue;
    if (tag === "g" || tag === "svg") {
      const nested = firstPaintedElement(child);
      if (nested) return nested;
      continue;
    }
    if (PAINTING.has(tag)) return child;
  }
  return null;
}
function num(el, attr) {
  const raw = el.getAttribute(attr);
  if (raw === null) return null;
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : null;
}
function positiveBox(w, h) {
  return w !== null && h !== null && w > 0 && h > 0 ? { w, h } : null;
}
function canvasFromViewBox(viewBox) {
  if (!viewBox) return null;
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || !parts.every(Number.isFinite)) return null;
  return positiveBox(parts[2], parts[3]);
}
function canvasOf(svg) {
  return canvasFromViewBox(svg.getAttribute("viewBox")) ?? positiveBox(num(svg, "width"), num(svg, "height"));
}
var FULL_BLEED_RATIO = 0.95;
function classifySvgIcon(source) {
  const { document } = parseHTML(`<!doctype html><body>${source}</body>`);
  const svg = document.querySelector("svg");
  if (!svg) return { shape: "unknown", reason: "no <svg> root found" };
  const canvas = canvasOf(svg);
  if (!canvas) return { shape: "unknown", reason: "no viewBox or width/height to measure against" };
  const first = firstPaintedElement(svg);
  if (!first) return { shape: "unknown", reason: "no painted element found" };
  const tag = first.tagName.toLowerCase();
  if (tag === "rect") {
    const w = num(first, "width");
    const h = num(first, "height");
    if (w !== null && h !== null && w >= canvas.w * FULL_BLEED_RATIO && h >= canvas.h * FULL_BLEED_RATIO) {
      const rounded = num(first, "rx");
      return {
        shape: "badge",
        reason: `first painted element is a full-bleed ${rounded ? "rounded " : ""}rect (${w}x${h} of ${canvas.w}x${canvas.h})`
      };
    }
  }
  if (tag === "circle") {
    const r = num(first, "r");
    if (r !== null && r * 2 >= Math.min(canvas.w, canvas.h) * FULL_BLEED_RATIO) {
      return {
        shape: "badge",
        reason: `first painted element is a full-bleed circle (r=${r} of ${canvas.w}x${canvas.h})`
      };
    }
  }
  return { shape: "bare-mark", reason: `first painted element is <${tag}> with margins` };
}
var OPAQUE_ALPHA = 250;
var BACKDROP_EDGE_HITS = 3;
var SAMPLE_EDGE = 32;
async function classifyRasterIcon(buffer) {
  let data;
  let channels;
  try {
    const raw = await sharp(buffer).resize(SAMPLE_EDGE, SAMPLE_EDGE, { fit: "fill" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    data = raw.data;
    channels = raw.info.channels;
  } catch {
    return { shape: "unknown", reason: "image format could not be decoded for inspection" };
  }
  const last = SAMPLE_EDGE - 1;
  const mid = SAMPLE_EDGE >> 1;
  const alphaAt = (x, y) => data[(y * SAMPLE_EDGE + x) * channels + 3] ?? 0;
  const edgeMidpoints = [alphaAt(mid, 0), alphaAt(mid, last), alphaAt(0, mid), alphaAt(last, mid)];
  const opaqueEdges = edgeMidpoints.filter((a) => a >= OPAQUE_ALPHA).length;
  return opaqueEdges >= BACKDROP_EDGE_HITS ? {
    shape: "badge",
    reason: `${opaqueEdges} of 4 edge midpoints are opaque, so the drawing carries a backdrop`
  } : {
    shape: "bare-mark",
    reason: `${opaqueEdges} of 4 edge midpoints are opaque, so the drawing has transparent margins`
  };
}
async function classifyIcon(buffer, ext) {
  return ext.toLowerCase() === ".svg" ? classifySvgIcon(buffer.toString("utf-8")) : classifyRasterIcon(buffer);
}

// src/capture/captureFontValidation.ts
import { createHash } from "crypto";
import { create } from "fontkit";
var MAX_FONT_BYTES = 75 * 1024 * 1024;
function fontContainerExtension(bytes) {
  if (bytes.length < 12 || bytes.length > MAX_FONT_BYTES) return null;
  const signature = bytes.toString("ascii", 0, 4);
  let extension;
  if (signature === "wOFF" || signature === "wOF2") {
    return woffExtension(bytes, signature);
  } else if (signature === "OTTO") {
    extension = ".otf";
  } else if (bytes.readUInt32BE(0) === 65536 || signature === "true") {
    extension = ".ttf";
  } else {
    return null;
  }
  return extension;
}
function woffExtension(bytes, signature) {
  const headerSize = signature === "wOFF" ? 44 : 48;
  if (bytes.length < headerSize || bytes.readUInt32BE(8) !== bytes.length) return null;
  const expandedSize = bytes.readUInt32BE(16);
  if (expandedSize < 12 || expandedSize > MAX_FONT_BYTES) return null;
  return signature === "wOFF" ? ".woff" : ".woff2";
}
function captureFontExtension(bytes) {
  const extension = fontContainerExtension(bytes);
  if (!extension) return null;
  try {
    const font = create(bytes);
    if (!("numGlyphs" in font) || font.numGlyphs <= 0 || font.numGlyphs > 65535) return null;
    if (!Number.isFinite(font.unitsPerEm) || font.unitsPerEm <= 0) return null;
    if (!Array.isArray(font.characterSet)) return null;
    return extension;
  } catch {
    return null;
  }
}
function preferredFontFilename(url, extension) {
  const basename = new URL(url).pathname.split("/").pop() ?? "";
  const dot = basename.lastIndexOf(".");
  const stem = dot > 0 ? basename.slice(0, dot) : basename;
  if (/^[a-zA-Z0-9_-][a-zA-Z0-9_.-]{0,119}$/.test(stem) && !/[. ]$/.test(stem) && !/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(stem)) {
    return `${stem}${extension}`;
  }
  return `font-${createHash("sha256").update(url).digest("hex").slice(0, 16)}${extension}`;
}
function captureFontFilename(url, extension, used = /* @__PURE__ */ new Set()) {
  const preferred = preferredFontFilename(url, extension);
  const stem = preferred.slice(0, -extension.length);
  let name = preferred;
  for (let n = 2; used.has(name.toLowerCase()); n++) name = `${stem}-${n}${extension}`;
  used.add(name.toLowerCase());
  return name;
}

// src/capture/captureImageValidation.ts
import sharp2 from "sharp";
import { parse, walk } from "css-tree";
var SVG_ELEMENTS = new Set(
  "svg g defs title desc metadata path rect circle ellipse line polyline polygon text tspan textPath use symbol image clipPath mask pattern marker linearGradient radialGradient stop filter feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence style".toLowerCase().split(" ")
);
function localImageReference(value, embedded) {
  const ref = value.trim();
  if (ref.startsWith("#")) return true;
  if (!/^data:image\/(?:png|jpeg|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(ref)) return false;
  embedded.add(ref);
  return true;
}
function passiveCss(source, context, embedded) {
  if (source.includes("\\")) return false;
  let safe = true;
  try {
    walk(parse(source, { context, parseCustomProperty: true }), (node) => {
      if (node.type === "Raw") safe = false;
      if (node.type === "Function" && ["image", "image-set", "-webkit-image-set", "src", "paint"].includes(
        node.name.toLowerCase()
      ))
        safe = false;
      if (node.type === "Url" && !localImageReference(node.value, embedded)) safe = false;
      if (node.type === "Atrule" && !["media", "supports", "keyframes"].includes(node.name.toLowerCase()))
        safe = false;
    });
    return safe;
  } catch {
    return false;
  }
}
function passiveSvg(bytes, embedded) {
  const source = bytes.toString("utf8");
  if (/<!DOCTYPE|<!ENTITY|<\?xml-stylesheet/i.test(source)) return false;
  const document = new DOMParser().parseFromString(source, "image/svg+xml");
  const root = document.documentElement;
  if (root?.localName !== "svg") return false;
  const elements = [root, ...Array.from(root.querySelectorAll("*"))];
  if (elements.length > 1e4) return false;
  return elements.every((element) => {
    if (!SVG_ELEMENTS.has(element.localName.toLowerCase())) return false;
    if (element.localName === "style" && !passiveCss(element.textContent ?? "", "stylesheet", embedded))
      return false;
    return element.getAttributeNames().every(
      (attribute) => passiveSvgAttribute(
        attribute.toLowerCase(),
        element.getAttribute(attribute) ?? "",
        embedded
      )
    );
  });
}
function passiveSvgAttribute(name, value, embedded) {
  if (name.startsWith("on") || name === "xml:base") return false;
  if (["href", "xlink:href", "src"].includes(name)) return localImageReference(value, embedded);
  if (name === "style") return passiveCss(value, "declarationList", embedded);
  return !/url\s*\(|\\/i.test(value) || passiveCss(value, "value", embedded);
}
async function validIco(bytes) {
  if (bytes.length < 22 || bytes.readUInt32LE(0) !== 65536) return false;
  const count = bytes.readUInt16LE(4);
  if (count === 0 || count > 256 || 6 + count * 16 > bytes.length) return false;
  for (let i = 0; i < count; i++) {
    const size = bytes.readUInt32LE(6 + i * 16 + 8);
    const offset = bytes.readUInt32LE(6 + i * 16 + 12);
    if (!validIconEntry(size, offset, 6 + count * 16, bytes.length)) return false;
    if (!await validIconImage(bytes.subarray(offset, offset + size))) return false;
  }
  return true;
}
function validIconEntry(size, offset, directoryEnd, length) {
  return size >= 40 && offset >= directoryEnd && size <= length - offset;
}
async function validIconImage(bytes) {
  const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (!png) return validIconBitmap(bytes);
  try {
    await sharp2(bytes, { limitInputPixels: 65536 }).resize(1, 1).raw().toBuffer();
    return true;
  } catch {
    return false;
  }
}
function validIconBitmap(bytes) {
  const dibSize = bytes.readUInt32LE(0);
  if (![40, 108, 124].includes(dibSize) || bytes.length < dibSize) return false;
  const width = bytes.readInt32LE(4);
  const height = bytes.readInt32LE(8);
  const bits = bytes.readUInt16LE(14);
  if (!validIconDimensions(width, height)) return false;
  if (bytes.readUInt16LE(12) !== 1 || ![1, 4, 8, 16, 24, 32].includes(bits)) return false;
  if (bytes.readUInt32LE(16) !== 0) return false;
  const pixels = Math.ceil(width * bits / 32) * 4 * (height / 2);
  const palette = bits <= 8 ? 4 * (1 << bits) : 0;
  return dibSize + palette + pixels <= bytes.length;
}
function validIconDimensions(width, height) {
  return width > 0 && width <= 256 && height > 0 && height <= 512 && height % 2 === 0;
}
async function captureImageExtension(bytes) {
  if (await validIco(bytes)) return ".ico";
  try {
    const embedded = /* @__PURE__ */ new Set();
    if (/^\s*</.test(bytes.toString("utf8", 0, 256)) && !passiveSvg(bytes, embedded)) return null;
    const image = sharp2(bytes, { limitInputPixels: 4e7 });
    const metadata = await image.metadata();
    if (metadata.format === "svg") {
      if (!passiveSvg(bytes, embedded) || !await validEmbeddedImages(embedded)) return null;
      return ".svg";
    }
    const extensions = {
      jpeg: ".jpg",
      png: ".png",
      webp: ".webp",
      gif: ".gif",
      avif: ".avif",
      heif: metadata.compression === "av1" ? ".avif" : ".heic",
      tiff: ".tiff"
    };
    const extension = metadata.format && extensions[metadata.format];
    if (!extension) return null;
    await image.resize(1, 1).raw().toBuffer();
    return extension;
  } catch {
    return null;
  }
}
async function validEmbeddedImages(references) {
  let remainingBytes = 10 * 1024 * 1024;
  let remainingPixels = 4e7;
  for (const reference of references) {
    const comma = reference.indexOf(",");
    const type = reference.slice(11, reference.indexOf(";")).toLowerCase();
    const encoded = reference.slice(comma + 1).replace(/\s/g, "");
    if (encoded.length > Math.ceil(remainingBytes / 3) * 4) return false;
    const bytes = Buffer.from(encoded, "base64");
    remainingBytes -= bytes.length;
    if (remainingBytes < 0) return false;
    const image = sharp2(bytes, { limitInputPixels: remainingPixels });
    const metadata = await image.metadata();
    if (metadata.format !== type || !metadata.width || !metadata.height) return false;
    const pixels = metadata.width * metadata.height * (metadata.pages ?? 1);
    remainingPixels -= pixels;
    if (remainingPixels < 0) return false;
    await image.resize(1, 1).raw().toBuffer();
  }
  return true;
}

// src/capture/assetDownloader.ts
function noDrops() {
  return { "size-floor": 0, "budget-exhausted": 0, "cap-reached": 0, unavailable: 0 };
}
function mergeDrops(a, b) {
  const total = noDrops();
  for (const reason of Object.keys(total)) {
    total[reason] = a[reason] + b[reason];
  }
  return total;
}
function totalDrops(drops) {
  return Object.values(drops).reduce((sum, n) => sum + n, 0);
}
function svgContentHashSlug(svgSource, isLogo) {
  const hash = createHash2("sha1").update(svgSource).digest("hex").slice(0, 8);
  return isLogo ? `logo-${hash}` : `svg-${hash}`;
}
function toStandaloneSvg(outerHTML) {
  const open = outerHTML.match(/<svg\b[^>]*>/i);
  if (!open) return outerHTML;
  const original = open[0];
  let tag = original;
  const add = [];
  if (!/\sxmlns\s*=/i.test(tag)) add.push('xmlns="http://www.w3.org/2000/svg"');
  if (/\sxlink:[a-z-]+\s*=/i.test(outerHTML) && !/\sxmlns:xlink\s*=/i.test(tag)) {
    add.push('xmlns:xlink="http://www.w3.org/1999/xlink"');
  }
  if (!add.length) return outerHTML;
  tag = tag.replace(/^<svg\b/i, `<svg ${add.join(" ")}`);
  return outerHTML.replace(original, tag);
}
function emptyIconManifest() {
  return { schema: "hyperframes.capture.icons.v1", headline: null, icons: [] };
}
var MAX_ICONS = 8;
var SHAPE_PREFERENCE = { "bare-mark": 0, unknown: 1, badge: 1 };
function iconFileStem(icon) {
  const slug = `${icon.rel} ${icon.sizes ?? "unsized"}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return `icon-${slug || "unknown"}`;
}
function headlineReason(chosen, all) {
  const badges = all.filter((i) => i.shape === "badge").length;
  if (chosen.shape === "bare-mark") {
    return badges > 0 ? `bare mark preferred over ${badges} badge(s)` : "the only candidate is a bare mark";
  }
  const bare = all.filter((i) => i.shape === "bare-mark").length;
  if (bare > 0) return `best-ranked bare mark was unavailable; used a ${chosen.shape}`;
  return `no bare-mark candidate among ${all.length} icon(s); used the best-ranked ${chosen.shape}`;
}
function uniqueStem(icon, used) {
  const base = iconFileStem(icon);
  let stem = base;
  for (let n = 2; used.has(stem); n++) stem = `${base}-${n}`;
  used.add(stem);
  return stem;
}
async function fetchAndInspectIcon(icon, rank, stem, outputDir, timeoutMs, byteBudget) {
  const buffer = await fetchBuffer(icon.href, timeoutMs, 2 * 1024 * 1024, byteBudget);
  if (!buffer) return null;
  const ext = await captureImageExtension(buffer);
  if (!ext) return null;
  const file = `assets/${stem}${ext}`;
  writeCaptureFileSync(join(outputDir, file), buffer);
  const verdict = await classifyIcon(buffer, ext);
  return {
    buffer,
    record: {
      file,
      url: icon.href,
      rel: icon.rel,
      sizes: icon.sizes ?? null,
      type: icon.type ?? null,
      rank,
      shape: verdict.shape,
      shapeReason: verdict.reason
    }
  };
}
function promoteHeadline(manifest, bytesByFile, outputDir) {
  const chosen = [...manifest.icons].sort(
    (a, b) => SHAPE_PREFERENCE[a.shape] - SHAPE_PREFERENCE[b.shape] || a.rank - b.rank
  )[0];
  if (!chosen) return null;
  const file = `assets/favicon${extname(chosen.file)}`;
  writeCaptureFileSync(join(outputDir, file), bytesByFile.get(chosen.file));
  manifest.headline = {
    file,
    source: chosen.file,
    rank: chosen.rank,
    shape: chosen.shape,
    reason: headlineReason(chosen, manifest.icons)
  };
  return { url: chosen.url, localPath: file, type: "favicon" };
}
async function downloadDeclaredIcons(faviconLinks, outputDir, drops, options) {
  const ranked = rankIconCandidates(faviconLinks);
  const attempted = ranked.slice(0, MAX_ICONS);
  drops["cap-reached"] += ranked.length - attempted.length;
  const assets = [];
  const manifest = emptyIconManifest();
  const bytesByFile = /* @__PURE__ */ new Map();
  const usedStems = /* @__PURE__ */ new Set();
  for (const [rank, icon] of attempted.entries()) {
    const remainingMs = options.remainingMs?.() ?? 1e4;
    if (remainingMs <= 0) {
      drops["budget-exhausted"] += attempted.length - rank;
      break;
    }
    try {
      const stem = uniqueStem(icon, usedStems);
      const got = await fetchAndInspectIcon(
        icon,
        rank,
        stem,
        outputDir,
        Math.min(1e4, remainingMs),
        options.byteBudget
      );
      if (!got) {
        drops.unavailable++;
        continue;
      }
      bytesByFile.set(got.record.file, got.buffer);
      manifest.icons.push(got.record);
      assets.push({ url: icon.href, localPath: got.record.file, type: "favicon" });
    } catch {
      drops.unavailable++;
    }
  }
  try {
    const headline = promoteHeadline(manifest, bytesByFile, outputDir);
    if (headline) assets.push(headline);
  } catch {
    drops.unavailable++;
  }
  return { assets, manifest };
}
async function downloadAssets(tokens, outputDir, catalogedAssets, faviconLinks, options = {}) {
  options = { ...options, byteBudget: options.byteBudget ?? createCaptureDownloadBudget() };
  const assetsDir = join(outputDir, "assets");
  ensureCaptureDirSync(outputDir, assetsDir);
  const assets = [];
  const drops = noDrops();
  const downloadedUrls = /* @__PURE__ */ new Set();
  let icons = emptyIconManifest();
  ensureCaptureDirSync(outputDir, join(outputDir, "assets", "svgs"));
  const usedSvgNames = /* @__PURE__ */ new Set();
  const MAX_INLINE_SVGS = 30;
  drops["cap-reached"] += Math.max(0, tokens.svgs.length - MAX_INLINE_SVGS);
  for (let i = 0; i < tokens.svgs.length && i < MAX_INLINE_SVGS; i++) {
    const svg = tokens.svgs[i];
    if (!svg.outerHTML || svg.outerHTML.length < 50) {
      drops["size-floor"]++;
      continue;
    }
    const svgFile = toStandaloneSvg(svg.outerHTML);
    const slug = svgContentHashSlug(svgFile, !!svg.isLogo);
    let finalSlug = slug;
    let suffix = 2;
    while (usedSvgNames.has(finalSlug)) {
      finalSlug = `${slug}-${suffix}`;
      suffix++;
    }
    usedSvgNames.add(finalSlug);
    const name = `${finalSlug}.svg`;
    const localPath = `assets/svgs/${name}`;
    try {
      writeCaptureFileSync(join(outputDir, localPath), svgFile, "utf-8");
      assets.push({ url: "", localPath, type: "svg" });
    } catch {
      drops.unavailable++;
    }
  }
  const iconPass = await downloadDeclaredIcons(faviconLinks || [], outputDir, drops, options);
  assets.push(...iconPass.assets);
  icons = iconPass.manifest;
  const imageUrls = [];
  if (catalogedAssets && catalogedAssets.length > 0) {
    for (const a of catalogedAssets) {
      if (a.type !== "Image" && a.type !== "Background") continue;
      if (!a.url.startsWith("http")) continue;
      if (a.url.includes("pixel") || a.url.includes("beacon") || a.url.includes("analytics"))
        continue;
      if (a.url.includes("/favicon")) continue;
      const hasGoodContext = a.contexts.some(
        (c) => c === "img[src]" || c === "img[srcset]" || c === "video[poster]" || c === "source[srcset]" || c === "data-src" || c === "css url()"
      );
      if (!hasGoodContext) continue;
      const isPoster = a.contexts.includes("video[poster]");
      imageUrls.push({ url: a.url, isPoster });
    }
  }
  const toDownload = [];
  for (const { url, isPoster } of imageUrls) {
    const normalized = normalizeUrl(url);
    if (downloadedUrls.has(normalized)) continue;
    downloadedUrls.add(normalized);
    const catalog = catalogedAssets?.find((a) => normalizeUrl(a.url) === normalized);
    toDownload.push({ url, isPoster, normalized, catalog });
  }
  const BATCH_SIZE = 5;
  let imgIdx = 0;
  const usedNames = /* @__PURE__ */ new Set();
  for (let i = 0; i < toDownload.length; i += BATCH_SIZE) {
    const remainingMs = options.remainingMs?.() ?? 1e4;
    if (remainingMs <= 0) {
      drops["budget-exhausted"] += toDownload.length - i;
      break;
    }
    const batch = toDownload.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async ({ url, isPoster, catalog }) => {
        const parsedUrl = new URL(url);
        const buffer = await fetchBuffer(
          url,
          Math.min(1e4, remainingMs),
          20 * 1024 * 1024,
          options.byteBudget
        );
        if (!buffer) {
          drops.unavailable++;
          return null;
        }
        const ext = await captureImageExtension(buffer);
        if (!ext) {
          drops.unavailable++;
          return null;
        }
        const isSvg2 = ext === ".svg";
        const minSize = isSvg2 ? 200 : 1e4;
        if (buffer.length < minSize) {
          drops["size-floor"]++;
          return null;
        }
        return { url, isPoster, parsedUrl, ext, buffer, catalog };
      })
    );
    for (const result of results) {
      if (result.status === "rejected") {
        drops.unavailable++;
        continue;
      }
      if (!result.value) continue;
      const { url, isPoster, parsedUrl, ext, buffer, catalog } = result.value;
      try {
        let slug;
        if (ext === ".svg") {
          const c = catalog;
          const brandRe = /logo|brand|wordmark/i;
          const isLogo = !!(c?.inBanner || c?.inHomeLink || c?.matchesTitleBrand || c?.contexts?.some((s) => brandRe.test(s)) || c?.description && brandRe.test(c.description) || c?.nearestHeading && brandRe.test(c.nearestHeading) || c?.sectionClasses && brandRe.test(c.sectionClasses));
          slug = svgContentHashSlug(buffer, isLogo);
        } else {
          slug = deriveAssetName(parsedUrl, catalog, isPoster, imgIdx, usedNames);
        }
        const name = `${slug}${ext}`;
        usedNames.add(slug);
        const localPath = `assets/${name}`;
        writeCaptureFileSync(join(outputDir, localPath), buffer);
        assets.push({ url, localPath, type: "image" });
        imgIdx++;
      } catch {
        drops.unavailable++;
      }
    }
  }
  if (tokens.ogImage && !downloadedUrls.has(normalizeUrl(tokens.ogImage))) {
    const remainingMs = options.remainingMs?.() ?? 1e4;
    try {
      if (remainingMs <= 0) {
        drops["budget-exhausted"]++;
      } else {
        const buffer = await fetchBuffer(
          tokens.ogImage,
          Math.min(1e4, remainingMs),
          20 * 1024 * 1024,
          options.byteBudget
        );
        const ext = buffer && await captureImageExtension(buffer);
        if (!buffer || !ext) {
          drops.unavailable++;
        } else if (buffer.length <= 5e3) {
          drops["size-floor"]++;
        } else {
          const localPath = `assets/og-image${ext}`;
          writeCaptureFileSync(join(outputDir, localPath), buffer);
          assets.push({ url: tokens.ogImage, localPath, type: "image" });
        }
      }
    } catch {
      drops.unavailable++;
    }
  }
  return { assets, drops, icons };
}
function normalizeUrl(u) {
  try {
    const parsed = new URL(u);
    if (parsed.pathname.includes("_next/image") && parsed.searchParams.has("url")) {
      return decodeURIComponent(parsed.searchParams.get("url"));
    }
    parsed.searchParams.delete("w");
    parsed.searchParams.delete("q");
    parsed.searchParams.delete("dpr");
    return parsed.toString();
  } catch {
    return u;
  }
}
async function downloadAndRewriteFonts(css, outputDir, options = {}) {
  options = { ...options, byteBudget: options.byteBudget ?? createCaptureDownloadBudget() };
  const assetsDir = join(outputDir, "assets", "fonts");
  ensureCaptureDirSync(outputDir, assetsDir);
  const drops = noDrops();
  const fontUrlRegex = /url\(['"]?(https?:\/\/[^'")\s]+\.(?:woff2?|ttf|otf)[^'")\s]*?)['"]?\)/g;
  const fontUrls = /* @__PURE__ */ new Set();
  let match;
  while ((match = fontUrlRegex.exec(css)) !== null) {
    if (match[1]) fontUrls.add(match[1]);
  }
  if (fontUrls.size === 0) return { css, drops };
  const MAX_FONTS_PER_FAMILY = 6;
  const MAX_TOTAL_FONTS = 30;
  const familyCounts = /* @__PURE__ */ new Map();
  const getFamilyForUrl = (url) => {
    const idx = css.indexOf(url);
    if (idx === -1) return "_unknown";
    const blockStart = css.lastIndexOf("@font-face", idx);
    if (blockStart === -1) return "_unknown";
    const blockSlice = css.slice(blockStart, idx);
    const familyMatch = blockSlice.match(/font-family\s*:\s*['"]?([^'";}\n]+)/i);
    return familyMatch?.[1] ? familyMatch[1].trim().toLowerCase() : "_unknown";
  };
  const sortedUrls = Array.from(fontUrls).sort((a, b) => {
    const aLatin = /latin|[A-Za-z0-9]{10,}\.woff/.test(a) ? 0 : 1;
    const bLatin = /latin|[A-Za-z0-9]{10,}\.woff/.test(b) ? 0 : 1;
    return aLatin - bLatin;
  });
  const usedFontNames = /* @__PURE__ */ new Set();
  let rewritten = css;
  let count = 0;
  for (const [index, fontUrl] of sortedUrls.entries()) {
    const remainingMs = options.remainingMs?.() ?? 1e4;
    if (remainingMs <= 0) {
      drops["budget-exhausted"] += sortedUrls.length - index;
      break;
    }
    if (count >= MAX_TOTAL_FONTS) {
      drops["cap-reached"] += sortedUrls.length - index;
      break;
    }
    const family = getFamilyForUrl(fontUrl);
    const familyCount = familyCounts.get(family) || 0;
    if (familyCount >= MAX_FONTS_PER_FAMILY) {
      drops["cap-reached"]++;
      continue;
    }
    familyCounts.set(family, familyCount + 1);
    count++;
    try {
      const buffer = await fetchBuffer(
        fontUrl,
        Math.min(1e4, remainingMs),
        10 * 1024 * 1024,
        options.byteBudget
      );
      const extension = buffer && captureFontExtension(buffer);
      if (buffer && extension) {
        const filename = captureFontFilename(fontUrl, extension, usedFontNames);
        const localPath = join(assetsDir, filename);
        const relativePath = `assets/fonts/${filename}`;
        writeCaptureFileSync(localPath, buffer);
        rewritten = rewritten.split(fontUrl).join(relativePath);
      } else {
        drops.unavailable++;
      }
    } catch {
      drops.unavailable++;
    }
  }
  return { css: rewritten, drops };
}
function isPrivateUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return true;
    return isBlockedNetworkHost(u.hostname);
  } catch {
    return true;
  }
}
var MAX_FETCH_REDIRECTS = 5;
async function safeFetch(url, init) {
  let current = url;
  for (let hop = 0; hop <= MAX_FETCH_REDIRECTS; hop++) {
    if (isPrivateUrl(current)) return null;
    const res = await fetch(current, { ...init, redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) return res;
      try {
        current = new URL(loc, current).toString();
      } catch {
        return null;
      }
      continue;
    }
    return res;
  }
  return null;
}
async function fetchBuffer(url, timeoutMs, maxBytes, budget = createCaptureDownloadBudget()) {
  if (budget.remainingBytes <= 0) return null;
  try {
    const res = await safeFetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { "User-Agent": CAPTURE_USER_AGENT }
    });
    if (!res || !res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("text/xml") || ct.includes("text/html") || ct.includes("application/xml")) {
      return null;
    }
    return await readBoundedResponse(res, maxBytes, budget);
  } catch {
    return null;
  }
}
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}
function deriveAssetName(parsedUrl, catalog, isPoster, idx, usedNames) {
  const candidates = [];
  if (catalog?.description) {
    const desc = catalog.description.replace(/[^a-zA-Z0-9 -]/g, "").trim();
    if (desc.length > 3 && desc.length < 80) candidates.push(desc);
  }
  if (catalog?.nearestHeading) {
    const heading = catalog.nearestHeading.replace(/[^a-zA-Z0-9 -]/g, "").trim();
    if (heading.length > 3 && heading.length < 60) candidates.push(heading);
  }
  const rawName = parsedUrl.pathname.split("/").pop()?.replace(/\.[^.]+$/, "") || "";
  const isMeaningful = rawName.length > 2 && rawName.length < 50 && !/^[a-f0-9]{8,}$/i.test(rawName) && !/^\d+$/.test(rawName) && !rawName.includes("_next") && !rawName.includes("?");
  if (isMeaningful) candidates.push(rawName);
  if (catalog?.sectionClasses) {
    const classes = catalog.sectionClasses.split(/\s+/).filter((c) => c.length > 3 && c.length < 30 && !/^(w-|h-|p-|m-|flex|grid|block)/.test(c)).slice(0, 2).join("-");
    if (classes.length > 3) candidates.push(classes);
  }
  const prefix = isPoster ? "poster" : catalog?.aboveFold ? "hero" : "image";
  let slug = "";
  for (const c of candidates) {
    slug = slugify(c);
    if (slug.length > 3 && !usedNames.has(slug)) break;
  }
  if (!slug || slug.length <= 3 || usedNames.has(slug)) {
    slug = `${prefix}-${idx}`;
  }
  let final = slug;
  let suffix = 2;
  while (usedNames.has(final)) {
    final = `${slug}-${suffix}`;
    suffix++;
  }
  return final;
}

export {
  CAPTURE_USER_AGENT,
  noDrops,
  mergeDrops,
  totalDrops,
  downloadAssets,
  downloadAndRewriteFonts,
  isPrivateUrl,
  safeFetch
};
