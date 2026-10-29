import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  require_dist
} from "./chunk-CGTUSO6Y.js";
import {
  cleanAssetUrl,
  collectSubCompositionSrcs,
  isRemoteOrInlineUrl,
  isUnresolvedAssetPlaceholder,
  isWithinProjectRoot,
  maskNonScannableRanges,
  readProjectFile,
  resolveExistingLocalAsset,
  resolveLocalAssetCandidates,
  resolveProjectRelativeSrc
} from "./chunk-JFKL3WAE.js";
import {
  COMPOSITION_VARIABLE_TYPES,
  FONT_ALIAS_KEYS,
  HTML_BODY_CSS_HEIGHT_FIRST_RE,
  HTML_BODY_CSS_WIDTH_FIRST_RE,
  VIEWPORT_META_SIZE_RE,
  extractMediaSrcMutations,
  isSafeMediaUrl,
  resolveAliasDisplayName
} from "./chunk-ZCT2RZ33.js";
import {
  COMPOSITION_ATTRIBUTES,
  checkSubCompositionUsability,
  parseNumeric,
  readAuthoredDurationSeconds,
  readClipTiming,
  readDataDurationSeconds,
  resolveMediaDuration,
  rewriteAssetPath,
  validateColorGradingContract
} from "./chunk-TQFG7HTI.js";
import {
  isSceneLikeCompositionId,
  parseSlideshowManifest,
  resolveSlideshow
} from "./chunk-PMRBLBUP.js";
import {
  Parser,
  parseHTML
} from "./chunk-GK4AIFIH.js";
import {
  parse,
  simple
} from "./chunk-KRDUCZRT.js";
import {
  findFfBinary
} from "./chunk-PJ3HDUCY.js";
import {
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// ../lint/dist/index.js
var import_postcss_selector_parser = __toESM(require_dist(), 1);
import postcss from "postcss";

// ../parsers/dist/compositionDuration.js
var TIMING_TOLERANCE_SECONDS = 0.05;
var isPositiveFinite = (value) => value !== null && Number.isFinite(value) && value > 0;
function resolveCompositionDuration(input) {
  const pendingClips = input.clipEndsSeconds.filter((end) => end === null).length;
  if (isPositiveFinite(input.authoredDurationSeconds)) {
    return { seconds: input.authoredDurationSeconds, source: "authored", pendingClips };
  }
  const known = input.clipEndsSeconds.filter(isPositiveFinite);
  if (known.length > 0) {
    return { seconds: Math.max(...known), source: "derived", pendingClips };
  }
  return {
    seconds: null,
    source: "unresolved",
    pendingClips,
    reason: pendingClips > 0 ? "every clip's length is still pending" : "no authored duration and no clip with a length"
  };
}

// ../lint/dist/index.js
import postcss2 from "postcss";
import postcss3 from "postcss";

// ../parsers/dist/topLevelElements.js
var NON_RENDERED_TAGS = /* @__PURE__ */ new Set(["script", "style", "template", "noscript", "link", "meta"]);
var MEDIA_TAGS = /* @__PURE__ */ new Set(["video", "audio", "img"]);
var TRACK_KINDS = ["video", "audio", "captions", "graphics"];
function isSubCompositionHost(node) {
  return node.attrs["data-composition-src"] !== void 0 || node.attrs["data-composition-id"] !== void 0;
}
function isTimedElement(node) {
  const { attrs } = node;
  return attrs["data-start"] !== void 0 || attrs["data-track-index"] !== void 0 && attrs["data-duration"] !== void 0 || MEDIA_TAGS.has(node.tag.toLowerCase());
}
function topLevelElements(root) {
  const rows = [];
  const visit = (node) => {
    if (NON_RENDERED_TAGS.has(node.tag.toLowerCase())) return;
    if (isSubCompositionHost(node) || isTimedElement(node)) rows.push(node);
    else node.children.forEach(visit);
  };
  root.children.forEach(visit);
  return rows;
}
function trackKindOf(node) {
  const explicit = node.attrs["data-track-kind"]?.trim().toLowerCase();
  if (explicit && TRACK_KINDS.includes(explicit))
    return { kind: explicit, source: "attribute" };
  const tag = node.tag.toLowerCase();
  if (tag === "video" || tag === "audio") return { kind: tag, source: "tag" };
  if (isSubCompositionHost(node)) {
    const legacy = node.attrs["data-composition-id"] === "captions" || /(?:^|\s)caption[-_]/.test(node.attrs.class ?? "");
    return legacy ? { kind: "captions", source: "legacy-captions" } : { kind: "graphics", source: "sub-composition" };
  }
  return { kind: "graphics", source: "tag" };
}

// ../lint/dist/index.js
import { createHash } from "crypto";
import { existsSync as existsSync2, readFileSync, readdirSync } from "fs";
import { dirname, extname, join as join2, relative, resolve } from "path";
import { execFile } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
var COMPOSITION_ID_IN_CSS_PATTERN = /\[data-composition-id=["']([^"']+)["']\]/g;
var TIMELINE_REGISTRY_INIT_PATTERN = /window\.__timelines\s*=\s*window\.__timelines\s*\|\|\s*\{\}|window\.__timelines\s*=\s*\{\}|window\.__timelines\s*\?\?=\s*\{\}/i;
var TIMELINE_REGISTRY_OBJECT_LITERAL_PATTERN = /window\.__timelines\s*=\s*\{\s*(?:["'][^"']+["']|[A-Za-z_$][\w$]*)\s*:/i;
var TIMELINE_REGISTRY_ASSIGN_PATTERN = /window\.__timelines(?:\[[^\]]+\]|\.[A-Za-z_$][\w$]*)\s*=/i;
var WINDOW_TIMELINE_ASSIGN_PATTERN = /window\.__timelines(?:\[\s*(?:["']([^"']+)["']|[A-Za-z_$][\w$.]*)\s*\]|\.\s*([A-Za-z_$][\w$]*))\s*=\s*([A-Za-z_$][\w$]*)/i;
var INVALID_SCRIPT_CLOSE_PATTERN = /<script[^>]*>[\s\S]*?<\s*\/\s*script(?!>)/i;
var TIMELINE_REGISTRY_KEY_PATTERN = /window\.__timelines(?:\[\s*["']([^"']+)["']\s*\]|\.\s*([A-Za-z_$][\w$]*))\s*(?:\?\?|\|\||&&)?=/g;
var TIMELINE_REGISTRY_OBJECT_OPEN_PATTERN = /window\.__timelines\s*=\s*\{/i;
var TIMELINE_REGISTRY_OBJECT_ENTRY_PATTERN = /(?:["']([^"']+)["']|([A-Za-z_$][\w$]*))\s*:\s*[A-Za-z_$][\w$]*/g;
function parseHtmlStructure(source) {
  const tags = [];
  const blocks = { script: [], style: [] };
  const openTagsByName = /* @__PURE__ */ new Map();
  const openBlocks = [];
  let explicitOpenTag = null;
  const parser = new Parser(
    {
      onopentagname(name) {
        let tokenStart = parser.endIndex - 1;
        while (tokenStart >= parser.startIndex && !/[\t\n\f\r />]/.test(source.charAt(tokenStart))) {
          tokenStart -= 1;
        }
        const index = source.indexOf("<", tokenStart + 1);
        explicitOpenTag = index >= 0 && index < parser.endIndex && source.slice(index + 1, parser.endIndex).toLowerCase() === name ? { index, nameEnd: parser.endIndex } : null;
      },
      onopentag(name, _attrs, isImplied) {
        const origin = !isImplied ? explicitOpenTag : null;
        const index = origin?.index ?? parser.startIndex;
        explicitOpenTag = null;
        const raw = source.slice(index, parser.endIndex + 1);
        const rawAttrs = origin ? source.slice(origin.nameEnd, parser.endIndex) : raw.slice(name.length + 1, -1);
        const attrs = rawAttrs.replace(/\s*\/$/, "");
        const tag = { raw, name, attrs, index };
        tags.push(tag);
        const sameNameStack = openTagsByName.get(name) ?? [];
        sameNameStack.push(tag);
        openTagsByName.set(name, sameNameStack);
        if (name === "script" || name === "style") {
          openBlocks.push({ name, attrs, contentStart: parser.endIndex + 1, index });
        }
      },
      onclosetag(name) {
        const tag = openTagsByName.get(name)?.pop();
        if (tag) {
          tag.closeIndex = parser.startIndex;
          tag.endIndex = parser.endIndex + 1;
        }
        if (name !== "script" && name !== "style") return;
        const block = openBlocks.pop();
        if (!block || block.name !== name) return;
        blocks[name].push({
          attrs: block.attrs,
          content: source.slice(block.contentStart, parser.startIndex),
          contentStart: block.contentStart,
          raw: source.slice(block.index, parser.endIndex + 1),
          index: block.index
        });
      }
    },
    { decodeEntities: false, lowerCaseAttributeNames: false, lowerCaseTags: true }
  );
  parser.end(source);
  return { tags, scripts: blocks.script, styles: blocks.style };
}
function findHtmlTag(tags) {
  return tags.find((tag) => tag.name === "html") ?? null;
}
function findRootTag(source, parsedTags) {
  const tags = parsedTags ?? parseHtmlStructure(source).tags;
  const bodyTag = tags.find((tag) => tag.name === "body");
  if (bodyTag && (readDecodedAttr(bodyTag.raw, "data-composition-id") || readAttr(bodyTag.raw, "data-width") || readAttr(bodyTag.raw, "data-height"))) {
    return bodyTag;
  }
  const bodyStart = bodyTag ? bodyTag.index + bodyTag.raw.length : 0;
  const bodyEnd = bodyTag?.closeIndex ?? source.length;
  const bodyTags = tags.filter((tag) => tag.index >= bodyStart && tag.index < bodyEnd);
  let skipBefore = -1;
  for (const tag of bodyTags) {
    if (tag.index < skipBefore) continue;
    if (["script", "style", "meta", "link", "title"].includes(tag.name)) continue;
    if (tag.name === "svg" && !readDecodedAttr(tag.raw, "data-composition-id") && !readAttr(tag.raw, "data-width") && !readAttr(tag.raw, "data-height")) {
      skipBefore = tag.endIndex ?? Infinity;
      continue;
    }
    return tag;
  }
  return null;
}
function hasUnquotedLessThan(attrs) {
  let quote = null;
  for (const ch of attrs) {
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === "<") {
      return true;
    }
  }
  return false;
}
function readAttr(tagSource, attr) {
  if (!tagSource) return null;
  const escaped = attr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tagSource.match(new RegExp(`(?<![\\w-])${escaped}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match?.[1] || null;
}
function hasAttrName(tagSource, attr) {
  return readDecodedAttr(tagSource, attr) !== null;
}
function isAudibleVideoTag(tagSource) {
  if (hasAttrName(tagSource, "muted")) return false;
  if (!hasAttrName(tagSource, "data-has-audio")) return true;
  const declared = readAttr(tagSource, "data-has-audio");
  return declared === "true";
}
function mediaTimeWindow(tagSource) {
  const start = Number(readAttr(tagSource, "data-start"));
  const duration = Number(readAttr(tagSource, "data-duration"));
  if (!readAttr(tagSource, "data-start") || !readAttr(tagSource, "data-duration")) return null;
  if (!Number.isFinite(start) || !Number.isFinite(duration)) return null;
  return { start, end: start + duration };
}
function mediaWindowsOverlap(a, b) {
  if (!a || !b) return true;
  return a.start < b.end && b.start < a.end;
}
function readDecodedAttr(tagSource, attr) {
  if (!tagSource) return null;
  let value = null;
  const parser = new Parser(
    {
      onattribute(name, decodedValue) {
        if (value === null && name.toLowerCase() === attr.toLowerCase()) value = decodedValue;
      }
    },
    { decodeEntities: true, lowerCaseAttributeNames: false, lowerCaseTags: true }
  );
  parser.end(tagSource);
  return value;
}
function readJsonAttr(tagSource, attr) {
  return readDecodedAttr(tagSource, attr);
}
function collectCompositionIds(tags) {
  const ids = /* @__PURE__ */ new Set();
  for (const tag of tags) {
    const compId = readDecodedAttr(tag.raw, "data-composition-id");
    if (compId) ids.add(compId);
  }
  return ids;
}
function extractCompositionIdsFromCss(css) {
  const ids = /* @__PURE__ */ new Set();
  let match;
  const pattern = new RegExp(
    COMPOSITION_ID_IN_CSS_PATTERN.source,
    COMPOSITION_ID_IN_CSS_PATTERN.flags
  );
  while ((match = pattern.exec(css)) !== null) {
    if (match[1]) ids.add(match[1]);
  }
  return [...ids];
}
function extractTimelineRegistryKeys(source) {
  const keys = /* @__PURE__ */ new Set();
  let match;
  const pattern = new RegExp(
    TIMELINE_REGISTRY_KEY_PATTERN.source,
    TIMELINE_REGISTRY_KEY_PATTERN.flags
  );
  while ((match = pattern.exec(source)) !== null) {
    const key = match[1] ?? match[2];
    if (key) keys.add(key);
  }
  for (const entry of readTimelineRegistryTopLevelKeys(source)) keys.add(entry);
  return [...keys];
}
function findMatchingBrace(source, bodyStart) {
  let depth = 1;
  for (let i = bodyStart; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}" && (depth -= 1) === 0) return i;
  }
  return source.length;
}
function blankNestedBraceGroups(body) {
  let out = "";
  let depth = 0;
  for (const ch of body) {
    if (ch === "{") depth += 1;
    else if (ch === "}") depth = Math.max(0, depth - 1);
    else if (depth === 0) {
      out += ch;
      continue;
    }
    out += " ";
  }
  return out;
}
function readTimelineRegistryTopLevelKeys(source) {
  const open = TIMELINE_REGISTRY_OBJECT_OPEN_PATTERN.exec(source);
  if (!open) return [];
  const bodyStart = open.index + open[0].length;
  const body = source.slice(bodyStart, findMatchingBrace(source, bodyStart));
  const flattened = blankNestedBraceGroups(body);
  const keys = [];
  const entryPattern = new RegExp(
    TIMELINE_REGISTRY_OBJECT_ENTRY_PATTERN.source,
    TIMELINE_REGISTRY_OBJECT_ENTRY_PATTERN.flags
  );
  let entry;
  while ((entry = entryPattern.exec(flattened)) !== null) {
    const key = entry[1] ?? entry[2];
    if (key) keys.push(key);
  }
  return keys;
}
function getInlineScriptSyntaxError(source) {
  if (!source.trim()) return null;
  try {
    parse(source, {
      ecmaVersion: "latest",
      sourceType: "script",
      allowReturnOutsideFunction: true
    });
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : String(error),
      offset: error instanceof SyntaxError && "pos" in error && typeof error.pos === "number" ? error.pos : void 0
    };
  }
}
function stripStringLiterals(source) {
  return source.replace(
    /(['"])(?:\\.|(?!\1)[^\\\n])*\1?/g,
    (literal) => literal[0] + " ".repeat(Math.max(0, literal.length - 1))
  );
}
function scanJsComments(source) {
  let out = "";
  let i = 0;
  let quote = null;
  let escaped = false;
  let inRegex = false;
  let inRegexClass = false;
  let regexMisread = false;
  const ctx = new CodeContext();
  const emitCode = (ch) => {
    out += ch;
    ctx.push(ch);
  };
  const emitOpaque = (ch) => {
    out += ch;
    ctx.push(" ");
  };
  while (i < source.length) {
    const ch = source[i] ?? "";
    const next = source[i + 1] ?? "";
    if (inRegex) {
      out += ch;
      if (escaped) {
        escaped = false;
        if (ch === "\n" || ch === "\r") {
          inRegex = false;
          inRegexClass = false;
          regexMisread = true;
        }
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === "[") {
        inRegexClass = true;
      } else if (ch === "]") {
        inRegexClass = false;
      } else if (ch === "/" && !inRegexClass) {
        inRegex = false;
        ctx.push(ch);
      } else if (ch === "\n" || ch === "\r") {
        inRegex = false;
        inRegexClass = false;
        regexMisread = true;
      }
      i += 1;
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        emitOpaque(ch);
      } else if (ch === "\\") {
        escaped = true;
        emitOpaque(ch);
      } else if (ch === quote) {
        quote = null;
        emitCode(ch);
      } else {
        emitOpaque(ch);
      }
      i += 1;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === "`") {
      quote = ch;
      emitCode(ch);
      i += 1;
      continue;
    }
    if (ch === "/" && next === "/") {
      out += "  ";
      ctx.push(" ");
      ctx.push(" ");
      i += 2;
      while (i < source.length && source[i] !== "\n" && source[i] !== "\r") {
        out += " ";
        ctx.push(" ");
        i += 1;
      }
      continue;
    }
    if (ch === "/" && next === "*") {
      out += "  ";
      ctx.push(" ");
      ctx.push(" ");
      i += 2;
      while (i < source.length) {
        const blockCh = source[i] ?? "";
        const blockNext = source[i + 1] ?? "";
        if (blockCh === "*" && blockNext === "/") {
          out += "  ";
          ctx.push(" ");
          ctx.push(" ");
          i += 2;
          break;
        }
        const kept = blockCh === "\n" || blockCh === "\r" ? blockCh : " ";
        out += kept;
        ctx.push(kept);
        i += 1;
      }
      continue;
    }
    if (ch === "/" && ctx.startsRegexLiteral()) {
      inRegex = true;
      emitCode(ch);
      i += 1;
      continue;
    }
    emitCode(ch);
    i += 1;
  }
  return { out, balanced: quote === null && !inRegex && !regexMisread };
}
function stripJsComments(source) {
  return scanJsComments(source).out;
}
function stripJsCode(source) {
  const { out, balanced } = scanJsComments(source);
  return balanced ? stripJsStringLiterals(out) : source;
}
var REGEX_ALLOWED_BEFORE = new Set("=(,:[!&|?{};+-*%^~<>");
var REGEX_ALLOWED_KEYWORDS = /* @__PURE__ */ new Set([
  "return",
  "typeof",
  "instanceof",
  "in",
  "of",
  "new",
  "delete",
  "void",
  "case",
  "do",
  "else",
  "yield",
  "await"
]);
var WORD_CHAR = /[A-Za-z0-9_$]/;
var CodeContext = class {
  last = "";
  prev = "";
  word = "";
  wordEnded = false;
  wordAfterDot = false;
  push(ch) {
    if (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
      this.wordEnded = true;
      return;
    }
    if (WORD_CHAR.test(ch)) {
      if (this.wordEnded || this.word === "") this.wordAfterDot = this.last === ".";
      this.word = this.wordEnded ? ch : this.word + ch;
    } else {
      this.word = "";
      this.wordAfterDot = false;
    }
    this.wordEnded = false;
    this.prev = this.last;
    this.last = ch;
  }
  startsRegexLiteral() {
    if (this.last === "") return true;
    if (WORD_CHAR.test(this.last))
      return !this.wordAfterDot && REGEX_ALLOWED_KEYWORDS.has(this.word);
    if ((this.last === "+" || this.last === "-") && this.prev === this.last) return false;
    return REGEX_ALLOWED_BEFORE.has(this.last);
  }
};
function stripJsStringLiterals(source) {
  let out = "";
  let i = 0;
  const templateBraces = [];
  const ctx = new CodeContext();
  let quote = null;
  let escaped = false;
  let inRegex = false;
  let inRegexClass = false;
  let regexMisread = false;
  const blank = (ch) => ch === "\n" || ch === "\r" ? ch : " ";
  const emit = (text) => {
    out += text;
    for (const ch of text) ctx.push(ch);
  };
  while (i < source.length) {
    const ch = source[i] ?? "";
    const next = source[i + 1] ?? "";
    if (inRegex) {
      if (escaped) {
        escaped = false;
        if (ch === "\n" || ch === "\r") {
          inRegex = false;
          inRegexClass = false;
          regexMisread = true;
        }
        emit(blank(ch));
      } else if (ch === "\\") {
        escaped = true;
        emit(" ");
      } else if (ch === "[") {
        inRegexClass = true;
        emit(" ");
      } else if (ch === "]") {
        inRegexClass = false;
        emit(" ");
      } else if (ch === "/" && !inRegexClass) {
        inRegex = false;
        emit(ch);
      } else if (ch === "\n" || ch === "\r") {
        inRegex = false;
        inRegexClass = false;
        escaped = false;
        regexMisread = true;
        emit(ch);
      } else {
        emit(" ");
      }
      i += 1;
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        emit(blank(ch));
      } else if (ch === "\\") {
        escaped = true;
        emit(" ");
      } else if (ch === quote) {
        quote = null;
        emit(ch);
      } else if (ch === "`" || quote !== "`" || ch !== "$" || next !== "{") {
        emit(blank(ch));
      } else {
        templateBraces.push(0);
        quote = null;
        emit("${");
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === "`") {
      quote = ch;
      emit(ch);
      i += 1;
      continue;
    }
    if (ch === "/" && next !== "/" && next !== "*" && ctx.startsRegexLiteral()) {
      inRegex = true;
      emit(ch);
      i += 1;
      continue;
    }
    if (templateBraces.length > 0) {
      const depth = templateBraces[templateBraces.length - 1] ?? 0;
      if (ch === "{") templateBraces[templateBraces.length - 1] = depth + 1;
      else if (ch === "}") {
        if (depth === 0) {
          templateBraces.pop();
          quote = "`";
          emit(ch);
          i += 1;
          continue;
        }
        templateBraces[templateBraces.length - 1] = depth - 1;
      }
    }
    emit(ch);
    i += 1;
  }
  if (quote !== null || templateBraces.length > 0 || inRegex || regexMisread) return source;
  return out;
}
function stripCssComments(source) {
  let out = "";
  let i = 0;
  let quote = null;
  while (i < source.length) {
    const ch = source[i] ?? "";
    if (quote) {
      out += ch;
      if (ch === "\\") {
        out += source[i + 1] ?? "";
        i += 2;
        continue;
      }
      if (ch === quote) quote = null;
      i += 1;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      out += ch;
      i += 1;
      continue;
    }
    if (ch === "/" && source[i + 1] === "*") {
      const end = source.indexOf("*/", i + 2);
      const stop = end === -1 ? source.length : end + 2;
      for (let j = i; j < stop; j += 1) {
        const c = source[j] ?? "";
        out += c === "\n" || c === "\r" ? c : " ";
      }
      i = stop;
      continue;
    }
    out += ch;
    i += 1;
  }
  return out;
}
function stripHtmlCommentsOnce(source, removed) {
  let out = "";
  let i = 0;
  for (; ; ) {
    const start = source.indexOf("<!--", i);
    if (start < 0) return out + source.slice(i);
    const end = source.indexOf("-->", start + 4);
    if (end < 0) return out + source.slice(i);
    out += source.slice(i, start);
    removed?.(start, end + 3);
    i = end + 3;
  }
}
function stripHtmlComments(source, pass) {
  let out = source;
  for (let prev = ""; prev !== out; ) {
    prev = out;
    const ranges = [];
    out = stripHtmlCommentsOnce(out, pass ? (start, end) => ranges.push([start, end]) : void 0);
    if (ranges.length) pass?.(ranges);
  }
  return out;
}
function extractScriptTextsAndSrcs(scripts) {
  const texts = scripts.filter((s) => !/\bsrc\s*=/.test(s.attrs)).map((s) => s.content);
  const srcs = scripts.map((s) => readAttr(`<script ${s.attrs}>`, "src") || "").filter(Boolean);
  return { texts, srcs };
}
function isMediaTag(tagName) {
  return tagName === "video" || tagName === "audio" || tagName === "img";
}
function hasCaptionStyles(styles) {
  return styles.some((s) => /\.caption[-_]?(?:group|word)/i.test(s.content));
}
function truncateSnippet(value, maxLength = 220) {
  const normalized2 = value.replace(/\s+/g, " ").trim();
  if (!normalized2) return void 0;
  if (normalized2.length <= maxLength) return normalized2;
  return `${normalized2.slice(0, maxLength - 3)}...`;
}
function mediaSrcTagRe(tagAlternation) {
  return new RegExp(`<(${tagAlternation})\\b[^>]*\\ssrc\\s*=\\s*["']([^"']+)["'][^>]*>`, "gi");
}
function normalized(source) {
  const chars = [];
  const offsets = [];
  let lastWasSpace = false;
  for (let i = 0; i < source.length; i++) {
    const isSpace = /\s/.test(source[i]);
    if (isSpace && lastWasSpace) continue;
    chars.push(isSpace ? " " : source[i]);
    offsets.push(i);
    lastWasSpace = isSpace;
  }
  return { text: chars.join(""), offsets };
}
function createSourceLocator(source) {
  const tags = parseHtmlStructure(source).tags;
  const searchable = source.split("");
  const parser = new Parser({
    oncomment() {
      searchable.fill("\0", parser.startIndex, parser.endIndex + 1);
    }
  });
  parser.write(source);
  parser.end();
  const normalizedSource = normalized(searchable.join(""));
  const at = (offset) => {
    const before = source.slice(0, offset);
    return {
      line: before.split(/\r\n|\r|\n/).length,
      column: offset - Math.max(before.lastIndexOf("\n"), before.lastIndexOf("\r"))
    };
  };
  return (finding) => {
    if (finding.line !== void 0) return { line: finding.line, column: finding.column };
    if (finding.snippet) {
      const offset = snippetOffset(normalizedSource, finding.snippet);
      return offset === void 0 ? {} : at(offset);
    }
    const id = finding.elementId ?? /^#([\w-]+)$/.exec(finding.selector ?? "")?.[1];
    if (!id) return {};
    const matches = tags.filter((tag) => readDecodedAttr(tag.raw, "id") === id);
    return matches.length === 1 ? at(matches[0].index) : {};
  };
}
function snippetOffset(source, snippet) {
  const needle = snippet.replace(/\s+/g, " ").trim().replace(/\.\.\.$/, "");
  if (!needle) return void 0;
  const index = source.text.indexOf(needle);
  if (index < 0 || source.text.indexOf(needle, index + 1) >= 0) return void 0;
  return source.offsets[index];
}
function mappedHtmlSource(original) {
  let offsets;
  const source = stripHtmlComments(original, (ranges) => {
    const previous = offsets;
    const length = (previous?.length ?? original.length + 1) - ranges.reduce((n, [a, b]) => n + b - a, 0);
    offsets = new Uint32Array(length);
    let target = 0;
    let start = 0;
    const spans = [
      ...ranges,
      [previous ? previous.length : original.length + 1, 0]
    ];
    for (const [a, b] of spans) {
      for (let i = start; i < a; i++) offsets[target++] = previous ? previous[i] : i;
      start = b;
    }
  });
  return { source, originalOffset: (index) => offsets ? offsets[index] : index };
}
function sourcePosition(source, offset, file) {
  if (!Number.isInteger(offset) || offset < 0 || offset > source.length) return {};
  const before = source.slice(0, offset);
  return {
    ...file ? { file } : {},
    line: before.split(/\r\n|\r|\n/).length,
    column: offset - Math.max(before.lastIndexOf("\n"), before.lastIndexOf("\r"))
  };
}
function buildLintContext(html, options = {}) {
  const rawSource = html || "";
  const mapped = mappedHtmlSource(rawSource);
  let source = mapped.source;
  let sourceStart = 0;
  const initialStructure = parseHtmlStructure(source);
  const templateTags = initialStructure.tags.filter(
    (tag) => tag.name === "template" && tag.closeIndex != null
  );
  let sourceWithoutTemplates = source;
  for (const template2 of [...templateTags].reverse()) {
    const end = template2.endIndex ?? template2.index;
    sourceWithoutTemplates = sourceWithoutTemplates.slice(0, template2.index) + " ".repeat(end - template2.index) + sourceWithoutTemplates.slice(end);
  }
  const template = templateTags[0];
  let structure = initialStructure;
  if (template && !findRootTag(sourceWithoutTemplates)) {
    sourceStart = template.index + template.raw.length;
    source = source.slice(sourceStart, template.closeIndex);
    structure = parseHtmlStructure(source);
  }
  const tags = structure.tags;
  const styles = [
    ...structure.styles,
    ...(options.externalStyles ?? []).map((style) => ({
      attrs: `href="${style.href}"`,
      content: style.content,
      raw: style.content,
      index: -1,
      file: style.file ?? style.href
    }))
  ];
  const scripts = structure.scripts;
  const compositionIds = collectCompositionIds(tags);
  const rootTag = findRootTag(source, tags);
  const rootCompositionId = readDecodedAttr(rootTag?.raw || "", "data-composition-id");
  const locate = (block, offset) => {
    if (offset === void 0 || offset < 0 || offset > block.content.length) return {};
    if (block.index === -1) return sourcePosition(block.content, offset, block.file);
    if (block.contentStart === void 0) return {};
    const originalOffset = mapped.originalOffset(sourceStart + block.contentStart + offset);
    return originalOffset === void 0 ? {} : sourcePosition(rawSource, originalOffset, options.filePath);
  };
  return {
    locate,
    source,
    rawSource,
    tags,
    styles,
    scripts,
    compositionIds,
    rootTag,
    rootCompositionId,
    options
  };
}
function repeatedDescendantId(selector) {
  let repeated = null;
  const requiredPseudoIds = (pseudo) => {
    if (![":is", ":where"].includes(pseudo.value.toLowerCase()) || pseudo.nodes.length === 0) {
      return /* @__PURE__ */ new Set();
    }
    const optionIdSets = [];
    for (const option of pseudo.nodes) {
      if (option.nodes.some((node) => node.type === "combinator")) return /* @__PURE__ */ new Set();
      const optionIds = new Set(
        option.nodes.filter((node) => node.type === "id").map((node) => node.value)
      );
      optionIdSets.push(optionIds);
    }
    const [firstOptionIds, ...remainingOptionIds] = optionIdSets;
    return new Set(
      [...firstOptionIds ?? []].filter(
        (id) => remainingOptionIds.every((optionIds) => optionIds.has(id))
      )
    );
  };
  try {
    (0, import_postcss_selector_parser.default)((root) => {
      root.each((selectorNode) => {
        const firstCompoundById = /* @__PURE__ */ new Map();
        let compound = 0;
        selectorNode.each((node) => {
          if (repeated) return;
          if (node.type === "combinator") {
            compound += 1;
            return;
          }
          const requiredIds = node.type === "id" ? [node.value] : node.type === "pseudo" ? [...requiredPseudoIds(node)] : [];
          for (const id of requiredIds) {
            const firstCompound = firstCompoundById.get(id);
            if (firstCompound !== void 0 && firstCompound !== compound) {
              repeated = id;
              return;
            }
            firstCompoundById.set(id, compound);
          }
        });
      });
    }).processSync(selector);
  } catch {
    return null;
  }
  return repeated;
}
function addUnescapedDigitIds(selector, ids) {
  try {
    (0, import_postcss_selector_parser.default)((root) => {
      root.walkIds((node) => {
        if (/^#\d/.test(node.toString().trim())) ids.add(node.value);
      });
    }).processSync(selector);
  } catch {
  }
}
var SELECTOR_CALL_PATTERN = /(?:\.(?:querySelector(?:All)?|closest|matches|to|from|fromTo|set|toArray)\s*\(|(?<![\w$-])(?:trigger|endTrigger|pin|scrollTrigger|scroller|pinnedContainer|pinSpacer)["']?\s*:)\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
function digitIdsTargetedBySelectors(styles, scripts) {
  const ids = /* @__PURE__ */ new Set();
  for (const style of styles) {
    try {
      postcss.parse(style.content).walkRules((rule) => {
        for (const selector of rule.selectors) addUnescapedDigitIds(selector, ids);
      });
    } catch {
    }
  }
  for (const script of scripts) {
    for (const match of stripJsComments(script.content).matchAll(SELECTOR_CALL_PATTERN)) {
      addUnescapedDigitIds(match[2] ?? "", ids);
    }
  }
  return ids;
}
function resolvedRuleSelectors(rule) {
  let ancestor = rule.parent;
  while (ancestor && ancestor.type !== "rule") ancestor = ancestor.parent;
  if (!ancestor || ancestor.type !== "rule") return rule.selectors;
  const parentSelectors = resolvedRuleSelectors(ancestor);
  return parentSelectors.flatMap(
    (parentSelector) => rule.selectors.map((childSelector) => {
      const nestingToken = /(^|[\s>+~,(])&/g;
      if (nestingToken.test(childSelector)) {
        return childSelector.replace(
          nestingToken,
          (_, separator) => separator + parentSelector
        );
      }
      return `${parentSelector} ${childSelector}`;
    })
  );
}
function rightmostCompoundNodes(selectorNode) {
  const subject = [];
  selectorNode.each((node) => {
    if (node.type === "combinator") subject.length = 0;
    else subject.push(node);
  });
  return subject;
}
function selectorAliasesRuntimeHiddenStyle(selector) {
  let unsafe = false;
  try {
    (0, import_postcss_selector_parser.default)((root) => {
      root.each((selectorNode) => {
        const subject = rightmostCompoundNodes(selectorNode);
        const hostScoped = subject.some(
          (node) => node.type === "attribute" && ["data-composition-src", "data-composition-file"].includes(
            node.attribute.toLowerCase()
          )
        );
        if (hostScoped) return;
        if (subject.some((node) => {
          if (node.type !== "attribute" || node.attribute.toLowerCase() !== "style") return false;
          if (node.operator !== "*=" || !node.value) return false;
          const needle = node.insensitive ? node.value.toLowerCase() : node.value;
          if (!needle.includes("visibility") && !needle.includes("hidden")) return false;
          return "visibility: hidden !important;".includes(needle);
        })) {
          unsafe = true;
        }
      });
    }).processSync(selector);
  } catch {
    return false;
  }
  return unsafe;
}
var POSITION_PROPERTIES = /* @__PURE__ */ new Set(["left", "top", "right", "bottom", "inset"]);
function weakIdOf(node) {
  if (node.type === "attribute" && node.attribute.toLowerCase() === "id") {
    return node.operator === "=" && node.value ? node.value : null;
  }
  if (node.type !== "pseudo" || node.value.toLowerCase() !== ":where") return null;
  const inner = node.nodes.flatMap((option) => option.nodes).find((n) => n.type === "id");
  return inner ? inner.value : null;
}
function reducedSpecificityId(selector) {
  let matched = null;
  try {
    (0, import_postcss_selector_parser.default)((root) => {
      root.each((selectorNode) => {
        const subject = rightmostCompoundNodes(selectorNode);
        if (subject.some((node) => node.type === "id")) return;
        for (const node of subject) matched = weakIdOf(node) ?? matched;
      });
    }).processSync(selector);
  } catch {
    return null;
  }
  return matched;
}
function cssIdSelector(id) {
  return `#${id.replace(
    /[^a-zA-Z0-9_-]|^-?\d/g,
    (match) => Array.from(match, (char) => `\\${char.codePointAt(0)?.toString(16)} `).join("")
  )}`;
}
function reducedSpecificityIdFindings(rule, reported) {
  const positionProps = rule.nodes.flatMap(
    (node) => node.type === "decl" && !node.important && POSITION_PROPERTIES.has(node.prop.toLowerCase()) ? [node.prop] : []
  );
  if (positionProps.length === 0) return [];
  const findings = [];
  for (const selector of resolvedRuleSelectors(rule)) {
    const id = reported.has(selector) ? null : reducedSpecificityId(selector);
    if (id === null) continue;
    reported.add(selector);
    findings.push({
      code: "id_override_reduced_specificity",
      severity: "warning",
      message: `Selector "${selector}" sets ${positionProps.join("/")} through [id=...] or :where(#id), which has class-level or zero specificity, so a compound class rule (e.g. ".parent .row") on the same element can silently win over this override.`,
      selector,
      fixHint: `Use \`${cssIdSelector(id)}\` instead; id specificity beats any selector built only from classes.`,
      snippet: truncateSnippet(rule.toString())
    });
  }
  return findings;
}
function ruleForcesOpacityZero(rule) {
  let forcesOpacityZero = false;
  rule.walkDecls(/^opacity$/i, (declaration) => {
    if (Number(declaration.value.trim()) === 0) forcesOpacityZero = true;
  });
  return forcesOpacityZero;
}
var CSS_TRANSITION_PROPERTY_PATTERN = /^(?:-webkit-)?transition(?:-[a-z][a-z-]*)?$/i;
var TRANSITION_NONE_PROPERTIES = /* @__PURE__ */ new Set(["transition", "transition-property"]);
var TRANSITION_TIME_PROPERTIES = /* @__PURE__ */ new Set([
  "transition",
  "transition-duration",
  "transition-delay"
]);
function hasNonZeroTime(value) {
  const times = value.match(/[+-]?(?:\d*\.)?\d+m?s\b/g) ?? [];
  return value.includes("var(") || times.some((time) => Number.parseFloat(time) !== 0);
}
function isSeekUnsafeTransition(declaration) {
  const property = declaration.prop.trim().toLowerCase();
  if (!CSS_TRANSITION_PROPERTY_PATTERN.test(property)) return false;
  const name = property.replace(/^-webkit-/, "");
  const value = declaration.value.trim().toLowerCase();
  if (value === "none" && TRANSITION_NONE_PROPERTIES.has(name)) return false;
  return !TRANSITION_TIME_PROPERTIES.has(name) || hasNonZeroTime(value);
}
function cssTransitionFinding(declaration, details) {
  return {
    code: "css_transition_used",
    severity: "warning",
    message: `CSS declaration \`${declaration.prop}: ${declaration.value}\` runs on the browser clock and cannot be seeked deterministically across render workers.`,
    fixHint: "Keep the class or attribute swap for state; put the visual change on the paused GSAP timeline.",
    ...details
  };
}
function isStudioTimelineElement(tag) {
  if (["script", "style", "link", "meta", "template", "noscript"].includes(tag.name)) {
    return false;
  }
  return Boolean(
    readAttr(tag.raw, "data-start") || readAttr(tag.raw, "data-track-index") || readAttr(tag.raw, "data-track") || readAttr(tag.raw, "data-composition-src") || readAttr(tag.raw, "data-composition-file")
  );
}
function describeStudioElement(tag) {
  const parts = [`<${tag.name}`];
  const className = readAttr(tag.raw, "class");
  const compositionId = readDecodedAttr(tag.raw, "data-composition-id");
  const dataStart = readAttr(tag.raw, "data-start");
  const dataTrack = readAttr(tag.raw, "data-track-index") ?? readAttr(tag.raw, "data-track");
  if (className) {
    const primaryClass = className.split(/\s+/).map((value) => value.trim()).find((value) => value && value !== "clip");
    if (primaryClass) parts.push(` class="${primaryClass}"`);
  }
  if (compositionId) parts.push(` data-composition-id="${compositionId}"`);
  if (dataStart) parts.push(` data-start="${dataStart}"`);
  if (dataTrack) parts.push(` data-track-index="${dataTrack}"`);
  parts.push(">");
  return parts.join("");
}
var VISIBLE_MARKUP_COMMENT_PATTERN = /\/\*[\s\S]*?\*\//g;
var VISIBLE_MARKUP_COMMENT_PROTECTED_BLOCK_PATTERN = /<(style|script|template|title|noscript|pre|code|textarea|text)\b[^>]*>[\s\S]*?<\/\1(?:\s[^>]*)?>/gi;
function findProtectedVisibleMarkupRanges(source) {
  const ranges = [];
  for (const match of source.matchAll(VISIBLE_MARKUP_COMMENT_PROTECTED_BLOCK_PATTERN)) {
    ranges.push({ start: match.index, end: match.index + match[0].length });
  }
  return ranges;
}
function isInsideSourceRange(index, ranges) {
  return ranges.some((range) => range.start <= index && index < range.end);
}
function isInsideHtmlTag(source, index) {
  let inTag = false;
  let quote = null;
  for (let i = 0; i < index; i++) {
    const char = source[i];
    if (!inTag) {
      if (char === "<") inTag = true;
      continue;
    }
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
    } else if (char === ">") {
      inTag = false;
    }
  }
  return inTag;
}
function findVisibleMarkupCommentLeak(source) {
  const protectedRanges = findProtectedVisibleMarkupRanges(source);
  for (const match of source.matchAll(VISIBLE_MARKUP_COMMENT_PATTERN)) {
    if (isInsideHtmlTag(source, match.index)) continue;
    if (isInsideSourceRange(match.index, protectedRanges)) continue;
    return match[0];
  }
  return null;
}
function readHtmlBodyCssSize(source) {
  const widthFirst = source.match(HTML_BODY_CSS_WIDTH_FIRST_RE);
  if (widthFirst) {
    const [, , width = "", , height = ""] = widthFirst;
    return { width, height };
  }
  const heightFirst = source.match(HTML_BODY_CSS_HEIGHT_FIRST_RE);
  if (heightFirst) {
    const [, , height = "", , width = ""] = heightFirst;
    return { width, height };
  }
  return null;
}
function readViewportMetaSize(source) {
  const match = source.match(VIEWPORT_META_SIZE_RE);
  if (!match) return null;
  const [, , width = "", , height = ""] = match;
  return { width, height };
}
function describeSizeMismatch(label, size, dataWidth, dataHeight) {
  if (!size || size.width === dataWidth && size.height === dataHeight) return null;
  return `${label} is ${size.width}x${size.height}`;
}
function describeRootDimensionsDrift(source, dataWidth, dataHeight) {
  const bodyCssMismatch = describeSizeMismatch(
    "html/body CSS",
    readHtmlBodyCssSize(source),
    dataWidth,
    dataHeight
  );
  const viewportMismatch = describeSizeMismatch(
    "the viewport meta",
    readViewportMetaSize(source),
    dataWidth,
    dataHeight
  );
  if (!bodyCssMismatch && !viewportMismatch) return null;
  const declared = `Root composition declares data-width="${dataWidth}" data-height="${dataHeight}"`;
  if (!bodyCssMismatch) {
    return {
      message: `${declared}, but ${viewportMismatch}. The viewport meta has no effect on capture \u2014 the renderer sizes the viewport from the root's own data-width/data-height \u2014 so this is stale metadata, not a clipping risk.`,
      fixHint: "update the meta viewport to match, or scaffold with `hyperframes init --resolution portrait`"
    };
  }
  const mismatches = viewportMismatch ? `${bodyCssMismatch} and ${viewportMismatch}` : bodyCssMismatch;
  return {
    message: `${declared}, but ${mismatches}. The scaffolded body clips the composition at its old size.`,
    fixHint: "update html/body CSS and the meta viewport to match, or scaffold with `hyperframes init --resolution portrait`"
  };
}
var coreRules = [
  // id_requires_css_escape
  ({ tags, styles, scripts }) => {
    const findings = [];
    let targeted;
    for (const tag of tags) {
      const id = readAttr(tag.raw, "id");
      if (!id || !/^\d/.test(id)) continue;
      targeted ??= digitIdsTargetedBySelectors(styles, scripts);
      const used = targeted.has(id);
      findings.push({
        code: "id_requires_css_escape",
        severity: used ? "error" : "warning",
        message: used ? `id="${id}" starts with a digit, and the selector \`#${id}\` used in this composition is invalid: querySelector and GSAP throw a SyntaxError, and CSS drops the rule.` : `id="${id}" starts with a digit, so the common selector \`#${id}\` throws a SyntaxError in querySelector().`,
        elementId: id,
        fixHint: "Rename the id to start with a letter (recommended), or build selectors with `#${CSS.escape(id)}` at runtime.",
        snippet: truncateSnippet(tag.raw)
      });
    }
    return findings;
  },
  // root_missing_composition_id + root_missing_dimensions
  // fallow-ignore-next-line complexity
  ({ rootTag }) => {
    const findings = [];
    if (!rootTag || !readDecodedAttr(rootTag.raw, "data-composition-id")) {
      findings.push({
        code: "root_missing_composition_id",
        severity: "error",
        message: "Root composition is missing `data-composition-id`.",
        elementId: rootTag ? readAttr(rootTag.raw, "id") || void 0 : void 0,
        fixHint: "Add a stable `data-composition-id` to the entry composition wrapper.",
        snippet: truncateSnippet(rootTag?.raw || "")
      });
    }
    if (!rootTag || !readAttr(rootTag.raw, "data-width") || !readAttr(rootTag.raw, "data-height")) {
      findings.push({
        code: "root_missing_dimensions",
        severity: "error",
        message: "Root composition is missing `data-width` or `data-height`.",
        elementId: rootTag ? readAttr(rootTag.raw, "id") || void 0 : void 0,
        fixHint: "Set numeric `data-width` and `data-height` on the entry composition root.",
        snippet: truncateSnippet(rootTag?.raw || "")
      });
    }
    return findings;
  },
  // root_dimensions_mismatch
  //
  // Render size and the runtime's forced #root size both read the root's own
  // data-width/data-height, so they stay correct. But editing only those two
  // attributes — rather than scaffolding with `hyperframes init --resolution`,
  // which rewrites the scaffold's other copies of the resolution too — leaves
  // the `html, body` CSS and the `<meta viewport>` at the old value, and a
  // stale body with `overflow: hidden` visually clips the correctly-sized
  // root. `hyperframes check`'s layout audits can't see it: they measure
  // against the root's own (already-correct) rect, not the body's.
  //
  // Sub-compositions are exempt: loadCompositions (packages/core/src/
  // runtime/compositionLoader.ts) mounts only the matched <template>/<body>
  // subtree, so a sub-comp's own <html>/<head>/<meta viewport> never reach
  // the rendering document, even when it's a full standalone document.
  ({ rootTag, source, options }) => {
    if (!rootTag || options.isSubComposition) return [];
    const dataWidth = readAttr(rootTag.raw, "data-width");
    const dataHeight = readAttr(rootTag.raw, "data-height");
    if (!dataWidth || !dataHeight) return [];
    const drift = describeRootDimensionsDrift(source, dataWidth, dataHeight);
    if (!drift) return [];
    return [
      {
        code: "root_dimensions_mismatch",
        severity: "warning",
        message: drift.message,
        elementId: readAttr(rootTag.raw, "id") || void 0,
        fixHint: drift.fixHint,
        snippet: truncateSnippet(rootTag.raw)
      }
    ];
  },
  // unbalanced_style_tags
  ({ source }) => {
    let opens = 0;
    let closes = 0;
    let firstTag = "";
    for (const match of source.matchAll(
      /<script\b[\s\S]*?<\/script[^>]*>|<style\b|<\/style\s*>/gi
    )) {
      const token = match[0].toLowerCase();
      if (token.startsWith("<script")) continue;
      if (token.startsWith("</style")) closes += 1;
      else opens += 1;
      if (!firstTag) firstTag = match[0];
    }
    if (opens === closes) return [];
    return [
      {
        code: "unbalanced_style_tags",
        severity: "error",
        message: opens > closes ? "A <style> block is never closed, so following markup is parsed as CSS and disappears from the frame." : "An extra </style> closes the stylesheet early, so trailing CSS renders as visible on-screen text.",
        fixHint: "Keep <style> and </style> paired. One extra closer dumps CSS into the body.",
        snippet: truncateSnippet(firstTag || "<style>")
      }
    ];
  },
  // visible_markup_comment
  ({ source }) => {
    const snippet = findVisibleMarkupCommentLeak(source);
    if (!snippet) return [];
    return [
      {
        code: "visible_markup_comment",
        severity: "error",
        message: "CSS/JS block comment syntax (`/* ... */`) appears in visible HTML markup. HTML only treats `<!-- ... -->` as comments, so this renders as on-screen text.",
        fixHint: "Remove the text or convert it to a real HTML comment (`<!-- ... -->`). Keep CSS comments inside `<style>` and JS comments inside `<script>`.",
        snippet: truncateSnippet(snippet)
      }
    ];
  },
  // missing_timeline_registry
  // fallow-ignore-next-line complexity
  ({ source, rawSource, rootTag, options }) => {
    if (options.isSubComposition || rawSource.trimStart().toLowerCase().startsWith("<template")) {
      return [];
    }
    if (/(?:^|\s)data-no-timeline(?=[\s=/]|$)/i.test(rootTag?.attrs || "")) return [];
    const findings = [];
    if (!TIMELINE_REGISTRY_INIT_PATTERN.test(source) && !TIMELINE_REGISTRY_ASSIGN_PATTERN.test(source) && !TIMELINE_REGISTRY_OBJECT_LITERAL_PATTERN.test(source)) {
      findings.push({
        code: "missing_timeline_registry",
        severity: "error",
        message: "Missing `window.__timelines` registration.",
        fixHint: "Register each composition timeline on `window.__timelines[compositionId]`."
      });
    }
    return findings;
  },
  // timeline_id_mismatch
  ({ source, compositionIds }) => {
    const findings = [];
    const htmlCompIds = new Set(compositionIds);
    const timelineRegKeys = /* @__PURE__ */ new Set();
    for (const key of extractTimelineRegistryKeys(source)) {
      timelineRegKeys.add(key);
    }
    for (const key of timelineRegKeys) {
      if (!htmlCompIds.has(key)) {
        findings.push({
          code: "timeline_id_mismatch",
          severity: "error",
          message: `Timeline registered as "${key}" but no element has data-composition-id="${key}". The runtime cannot auto-nest this timeline.`,
          fixHint: `Change window.__timelines["${key}"] to match the data-composition-id attribute, or vice versa.`
        });
      }
    }
    return findings;
  },
  // css_transition_used
  ({ styles, tags }) => {
    const findings = [];
    for (const style of styles) {
      if (!/transition/i.test(style.content)) continue;
      let root;
      try {
        root = postcss.parse(style.content);
      } catch {
        continue;
      }
      root.walkDecls((declaration) => {
        if (!isSeekUnsafeTransition(declaration)) return;
        const selector = declaration.parent?.type === "rule" ? declaration.parent.selector : void 0;
        findings.push(
          cssTransitionFinding(declaration, {
            selector,
            snippet: truncateSnippet(declaration.toString())
          })
        );
      });
    }
    for (const tag of tags) {
      const inlineStyle = readDecodedAttr(tag.raw, "style");
      if (!inlineStyle || !/transition/i.test(inlineStyle)) continue;
      let root;
      try {
        root = postcss.parse(inlineStyle);
      } catch {
        continue;
      }
      root.walkDecls((declaration) => {
        if (!isSeekUnsafeTransition(declaration)) return;
        findings.push(
          cssTransitionFinding(declaration, {
            elementId: readDecodedAttr(tag.raw, "id") || void 0,
            snippet: truncateSnippet(tag.raw)
          })
        );
      });
    }
    return findings;
  },
  // CSS selector safety
  ({ styles, locate }) => {
    const findings = [];
    const reportedRepeatedIds = /* @__PURE__ */ new Set();
    const reportedHiddenStyleSelectors = /* @__PURE__ */ new Set();
    const reportedReducedIdSelectors = /* @__PURE__ */ new Set();
    for (const style of styles) {
      let root;
      try {
        root = postcss.parse(style.content);
      } catch (error) {
        findings.push({
          ...locate(
            style,
            error instanceof postcss.CssSyntaxError ? cssErrorOffset(style.content, error) : void 0
          ),
          code: "css_parse_error",
          severity: "error",
          message: `CSS parse error: ${error instanceof Error ? error.message : "unknown"}`
        });
        continue;
      }
      root.walkRules((rule) => {
        const forcesOpacityZero = ruleForcesOpacityZero(rule);
        findings.push(...reducedSpecificityIdFindings(rule, reportedReducedIdSelectors));
        for (const selector of resolvedRuleSelectors(rule)) {
          const repeatedId = repeatedDescendantId(selector);
          if (repeatedId && !reportedRepeatedIds.has(repeatedId)) {
            reportedRepeatedIds.add(repeatedId);
            findings.push({
              code: "repeated_id_descendant_selector",
              severity: "error",
              message: `Selector "${selector}" requires #${repeatedId} to be nested inside another #${repeatedId}. IDs must be unique, so this selector cannot match a valid composition.`,
              selector,
              fixHint: `Remove the duplicate ancestor: change \`#${repeatedId} #${repeatedId}\` to \`#${repeatedId}\`.`
            });
          }
          if (!forcesOpacityZero || reportedHiddenStyleSelectors.has(selector) || !selectorAliasesRuntimeHiddenStyle(selector)) {
            continue;
          }
          reportedHiddenStyleSelectors.add(selector);
          findings.push({
            code: "runtime_hidden_style_opacity",
            severity: "error",
            message: `Selector "${selector}" observes HyperFrames' runtime-owned hidden style and forces opacity to zero. The renderer hides each native video before copying its computed opacity to the visible replacement frame, so this rule makes both transparent.`,
            selector,
            fixHint: 'Restrict the guard to sub-composition hosts, for example `[data-composition-src][style*="visibility: hidden"]` and `[data-composition-file][style*="visibility: hidden"]`. Do not derive arbitrary element or media opacity from runtime-owned inline visibility.',
            snippet: truncateSnippet(rule.toString())
          });
        }
      });
    }
    return findings;
  },
  // unclosed_tag_swallowed_element
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      if (!hasUnquotedLessThan(tag.attrs)) continue;
      findings.push({
        code: "unclosed_tag_swallowed_element",
        severity: "error",
        message: `<${tag.name}> is missing its closing \`>\` before the next \`<\` \u2014 the following element is swallowed as bogus attribute text and never becomes a real node.`,
        fixHint: "Close the previous tag's `>` before opening the next element.",
        snippet: truncateSnippet(tag.raw)
      });
    }
    return findings;
  },
  // invalid_inline_script_syntax (malformed close tag)
  ({ source }) => {
    if (!INVALID_SCRIPT_CLOSE_PATTERN.test(source)) return [];
    return [
      {
        code: "invalid_inline_script_syntax",
        severity: "error",
        message: "Detected malformed inline `<script>` closing syntax.",
        fixHint: "Close inline scripts with a valid `</script>` tag."
      }
    ];
  },
  // invalid_inline_script_syntax (JS parse error)
  ({ scripts, locate }) => {
    const findings = [];
    for (const script of scripts) {
      const attrs = script.attrs || "";
      if (/\bsrc\s*=/.test(attrs) || /\btype\s*=\s*["'](?:application\/json|application\/hyperframes-slideshow\+json|importmap|module)["']/.test(
        attrs
      ))
        continue;
      const syntaxError = getInlineScriptSyntaxError(script.content);
      if (!syntaxError) continue;
      findings.push({
        ...locate(script, syntaxError.offset),
        code: "invalid_inline_script_syntax",
        severity: "error",
        message: `Inline script has invalid syntax: ${syntaxError.message}`,
        fixHint: "Fix the inline script syntax before render verification.",
        snippet: truncateSnippet(script.content)
      });
    }
    return findings;
  },
  // host_missing_composition_id
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      const src = readAttr(tag.raw, "data-composition-src");
      if (!src) continue;
      if (readDecodedAttr(tag.raw, "data-composition-id")) continue;
      findings.push({
        code: "host_missing_composition_id",
        severity: "error",
        message: `Composition host for "${src}" is missing \`data-composition-id\`.`,
        elementId: readAttr(tag.raw, "id") || void 0,
        fixHint: "Set `data-composition-id` on every `data-composition-src` host element.",
        snippet: truncateSnippet(tag.raw)
      });
    }
    return findings;
  },
  // scoped_css_missing_wrapper
  ({ styles, compositionIds }) => {
    const findings = [];
    const scopedCssCompositionIds = /* @__PURE__ */ new Set();
    for (const style of styles) {
      for (const compId of extractCompositionIdsFromCss(style.content)) {
        scopedCssCompositionIds.add(compId);
      }
    }
    for (const compId of scopedCssCompositionIds) {
      if (compositionIds.has(compId)) continue;
      findings.push({
        code: "scoped_css_missing_wrapper",
        severity: "warning",
        message: `Scoped CSS targets composition "${compId}" but no matching wrapper exists in this HTML.`,
        selector: `[data-composition-id="${compId}"]`,
        fixHint: "Preserve the matching composition wrapper or align the CSS scope to an existing wrapper."
      });
    }
    return findings;
  },
  // studio_missing_editable_id
  ({ tags, rootTag }) => {
    const findings = [];
    for (const tag of tags) {
      if (rootTag && tag.index === rootTag.index) continue;
      if (!isStudioTimelineElement(tag)) continue;
      if (readAttr(tag.raw, "id")) continue;
      const descriptor = describeStudioElement(tag);
      findings.push({
        code: "studio_missing_editable_id",
        severity: "warning",
        message: `${descriptor} has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.`,
        selector: readDecodedAttr(tag.raw, "data-composition-id") ? `[data-composition-id="${readDecodedAttr(tag.raw, "data-composition-id")}"]` : void 0,
        fixHint: 'Add a stable, human-readable id such as id="hero-title" or id="scene-1-card" to every timeline-visible element you want agents or Studio to edit.',
        snippet: truncateSnippet(tag.raw)
      });
    }
    return findings;
  },
  // non_deterministic_code
  ({ scripts, locate }) => {
    const findings = [];
    const patterns = [
      {
        pattern: /Math\.random\s*\(/,
        label: "Math.random()",
        hint: "Use a seeded PRNG (e.g. a simple mulberry32) so renders are deterministic across frames."
      },
      {
        pattern: /Date\.now\s*\(/,
        label: "Date.now()",
        hint: "Remove time-dependent code. Use GSAP timeline position instead of wall-clock time."
      },
      {
        // Zero-arg only. `new Date(<fixed timestamp>)` is fully deterministic and is how
        // a composition labels a fixed date on an axis or card; the hint ("remove
        // time-dependent code") cannot be applied to it without deleting the label.
        pattern: /new\s+Date\s*\(\s*\)/,
        label: "new Date()",
        hint: "Remove time-dependent code. Use GSAP timeline position instead of wall-clock time."
      },
      {
        pattern: /performance\.now\s*\(/,
        label: "performance.now()",
        hint: "Remove time-dependent code. Use GSAP timeline position instead of wall-clock time."
      },
      {
        pattern: /crypto\.getRandomValues\s*\(/,
        label: "crypto.getRandomValues()",
        hint: "Use a seeded PRNG (e.g. a simple mulberry32) so renders are deterministic across frames."
      },
      {
        pattern: /gsap\.utils\.random\s*\(/,
        label: "gsap.utils.random()",
        hint: "Each render worker initializes independently, so random values diverge across chunks. Use a seeded PRNG or fixed values."
      },
      {
        // GSAP string form: "random(...)" / "+=random(...)" — re-rolls at tween init.
        // `scansStrings` because here the string IS the executed value: GSAP parses it.
        // Every other pattern above matches executable code, so a match inside a string
        // literal is inert text and must not be reported.
        pattern: /["'`](?:[+-]=)?random\(\s*[-\d[]/,
        scansStrings: true,
        label: '"random(...)" tween value',
        hint: "GSAP random string values re-roll at tween init and each render worker initializes independently. Use fixed values or precompute with a seeded PRNG."
      }
    ];
    for (const script of scripts) {
      const withoutComments = stripJsComments(script.content);
      const executable = stripStringLiterals(withoutComments);
      for (const { pattern, label, hint, scansStrings } of patterns) {
        const match = pattern.exec(scansStrings ? withoutComments : executable);
        if (match) {
          findings.push({
            ...locate(script, match.index),
            code: "non_deterministic_code",
            severity: "error",
            message: `Script contains \`${label}\` which produces non-deterministic output. Renders may differ between frames or runs.`,
            fixHint: hint,
            snippet: truncateSnippet(script.content)
          });
        }
      }
    }
    return findings;
  }
];
function cssErrorOffset(source, error) {
  if (error.input && "offset" in error.input && typeof error.input.offset === "number")
    return error.input.offset;
  const { line, column } = error;
  if (line === void 0 || column === void 0) return void 0;
  let offset = 0;
  let currentLine = 1;
  for (const match of source.matchAll(/\n/g)) {
    if (currentLine >= line) break;
    offset = match.index + 1;
    currentLine++;
  }
  return currentLine === line ? offset + column - 1 : void 0;
}
var SYNC_TOLERANCE_S = 1e-3;
var LINKED_TIMING_FIELDS = [
  { field: "start", attrs: ["data-start"], fallback: 0 },
  { field: "duration", attrs: ["data-duration"], fallback: 0 },
  { field: "media-start", attrs: ["data-playback-start", "data-media-start"], fallback: 0 },
  { field: "playback-rate", attrs: ["data-playback-rate"], fallback: 1 }
];
function readTimingField(tag, attrs, fallback) {
  for (const attr of attrs) {
    const raw = readAttr(tag.raw, attr);
    if (raw === null || raw.trim() === "") continue;
    const value = Number(raw);
    if (Number.isFinite(value)) return value;
  }
  return fallback;
}
function driftingFields(members) {
  return LINKED_TIMING_FIELDS.filter(({ attrs, fallback }) => {
    const values = members.map((tag) => readTimingField(tag, attrs, fallback));
    const first = values[0] ?? fallback;
    return values.some((value) => Math.abs(value - first) > SYNC_TOLERANCE_S);
  }).map(({ field }) => field);
}
function compositionScopeOf(tag, compositions) {
  let scope = -1;
  for (const composition of compositions) {
    const end = composition.endIndex ?? composition.closeIndex ?? Number.POSITIVE_INFINITY;
    const encloses = composition.index < tag.index && tag.index < end;
    if (composition !== tag && encloses && composition.index > scope) scope = composition.index;
  }
  return scope;
}
function groupByLink(tags) {
  const compositions = tags.filter(
    (tag) => ["data-composition-id", "data-composition-file"].some(
      (name) => readAttr(tag.raw, name) !== null
    )
  );
  const groups = /* @__PURE__ */ new Map();
  for (const tag of tags) {
    const link = readAttr(tag.raw, "data-link");
    if (!link) continue;
    const key = `${compositionScopeOf(tag, compositions)}\0${link}`;
    const group = groups.get(key) ?? { link, members: [] };
    group.members.push(tag);
    groups.set(key, group);
  }
  return groups;
}
var memberLabel = (tag) => {
  const id = readAttr(tag.raw, "id");
  return id ? `#${id}` : `<${tag.name}>`;
};
function findLinkedClipFindings(ctx) {
  const findings = [];
  for (const { link, members } of groupByLink(ctx.tags).values()) {
    const first = members[0];
    if (!first) continue;
    const elementId = readAttr(first.raw, "id") || void 0;
    if (members.length === 1) {
      findings.push({
        code: "linked_clip_orphan",
        severity: "warning",
        message: `${memberLabel(first)} is the only clip with data-link="${link}"; its linked partner is gone.`,
        elementId,
        fixHint: `Remove data-link="${link}" from ${memberLabel(first)}, or restore the partner clip.`,
        snippet: truncateSnippet(first.raw)
      });
      continue;
    }
    const drift = driftingFields(members);
    if (drift.length === 0) continue;
    findings.push({
      code: "linked_clips_out_of_sync",
      severity: "warning",
      message: `Linked clips ${members.map(memberLabel).join(", ")} (data-link="${link}") differ in ${drift.join(", ")}.`,
      elementId,
      fixHint: "Linked clips are edited as one: give every member the same data-start, data-duration, data-media-start and data-playback-rate, or remove data-link from all of them to unlink.",
      snippet: truncateSnippet(first.raw)
    });
  }
  return findings;
}
function tweensVolumeInSameCall(script, id) {
  const selector = new RegExp(`#${escapeRegExp(id)}(?![\\w-])`, "g");
  for (let hit = selector.exec(script); hit; hit = selector.exec(script)) {
    let depth = 0;
    const limit = Math.min(script.length, hit.index + 2e3);
    for (let i = hit.index; i < limit; i += 1) {
      const ch = script[i];
      if (ch === "(") depth += 1;
      else if (ch === ")") {
        if (depth === 0) break;
        depth -= 1;
      } else if (ch === ";" && depth === 0) break;
      else if (ch === "v" && /^volume\s*:/.test(script.slice(i))) return true;
    }
  }
  return false;
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var IMAGE_SRC_EXT = /* @__PURE__ */ new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "heic",
  "heif",
  "tiff",
  "ico"
]);
var VIDEO_SRC_EXT = /* @__PURE__ */ new Set([
  "mp4",
  "mov",
  "avi",
  "webm",
  "mkv",
  "flv",
  "wmv",
  "m4v",
  "mpg",
  "mpeg"
]);
var AUDIO_SRC_EXT = /* @__PURE__ */ new Set(["mp3", "wav", "aac", "flac", "opus", "aiff", "wma"]);
var SRC_KIND_NOUN = {
  image: "an image",
  video: "a video",
  audio: "an audio file"
};
function srcKind(src) {
  const stripped = src.trim();
  if (!stripped) return null;
  const lower = stripped.toLowerCase();
  if (lower.startsWith("data:")) {
    const mime = /^data:([^;,]+)/i.exec(stripped)?.[1]?.toLowerCase();
    if (!mime) return null;
    if (mime.startsWith("image/")) return "image";
    if (mime.startsWith("video/")) return "video";
    if (mime.startsWith("audio/")) return "audio";
    return null;
  }
  if (lower.startsWith("blob:")) return null;
  let pathname = stripped;
  try {
    if (/^https?:/i.test(stripped)) {
      pathname = decodeURIComponent(new URL(stripped).pathname);
    } else {
      pathname = stripped.split("?")[0]?.split("#")[0] ?? stripped;
    }
  } catch {
    pathname = stripped.split("?")[0]?.split("#")[0] ?? stripped;
  }
  const base = pathname.split("/").pop() ?? "";
  const dot = base.lastIndexOf(".");
  if (dot < 0) return null;
  const ext = base.slice(dot + 1).toLowerCase();
  if (IMAGE_SRC_EXT.has(ext)) return "image";
  if (VIDEO_SRC_EXT.has(ext)) return "video";
  if (AUDIO_SRC_EXT.has(ext)) return "audio";
  return null;
}
function findMediaSrcKindMismatchFindings(ctx) {
  const findings = [];
  for (const tag of ctx.tags) {
    if (tag.name !== "video" && tag.name !== "img") continue;
    const src = readAttr(tag.raw, "src");
    if (!src) continue;
    const kind = srcKind(src);
    if (kind === null) continue;
    const expected = tag.name === "video" ? "video" : "image";
    if (kind === expected) continue;
    const elementId = readAttr(tag.raw, "id") || void 0;
    findings.push({
      code: "media_src_kind_mismatch",
      severity: "error",
      message: `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> src is ${SRC_KIND_NOUN[kind]}, not ${SRC_KIND_NOUN[expected]}. The producer fail-closes when the tag and file kind disagree.`,
      elementId,
      fixHint: tag.name === "video" ? "Use <img> for a still, <audio> for sound, or point <video> at a video URL (mp4/webm/mov/\u2026)." : "Use <video> for a video URL, <audio> for sound, or point <img> at a still (png/jpg/webp/\u2026).",
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
function findNestedMediaStartBasisFindings(ctx) {
  if (!ctx.options.isSubComposition) return [];
  const findings = [];
  for (const tag of ctx.tags) {
    if (tag.name !== "video" && tag.name !== "audio") continue;
    const rawStart = readAttr(tag.raw, "data-start");
    const start = rawStart == null || rawStart.trim() === "" ? NaN : Number(rawStart);
    if (!Number.isFinite(start) || start <= 0) continue;
    const basis = readAttr(tag.raw, "data-hf-media-start-basis");
    if (basis === "local" || basis === "global") continue;
    const elementId = readAttr(tag.raw, "id") || void 0;
    findings.push({
      code: "nested_media_start_basis_ambiguous",
      severity: "warning",
      message: `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> has data-start="${rawStart}" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.`,
      elementId,
      fixHint: `Keep data-start="${rawStart}" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis="global"; otherwise convert it to local time by subtracting the host start.`,
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
function mediaHasResolvableSrc(tag, tags) {
  if (readAttr(tag.raw, "src")) return true;
  const end = tag.closeIndex ?? tag.endIndex;
  if (end == null) return false;
  return tags.some(
    (child) => child.name === "source" && child.index > tag.index && child.index < end && Boolean(readAttr(child.raw, "src"))
  );
}
function classNamesFromAttr(classAttr) {
  if (!classAttr) return [];
  return classAttr.split(/\s+/).filter(Boolean);
}
function selectorTargetsManagedMedia(selector, mediaIndex) {
  const normalized2 = selector.trim();
  if (!normalized2) return false;
  if (mediaIndex.hasVideo && /\bvideo\b/i.test(normalized2)) return true;
  if (mediaIndex.hasAudio && /\baudio\b/i.test(normalized2)) return true;
  for (const mediaId of mediaIndex.ids) {
    const escapedId = escapeRegExp(mediaId);
    if (new RegExp(`#${escapedId}(?![\\w-])`).test(normalized2) || normalized2.includes(`[id="${mediaId}"]`) || normalized2.includes(`[id='${mediaId}']`)) {
      return true;
    }
  }
  for (const className of mediaIndex.classes) {
    if (new RegExp(`\\.${escapeRegExp(className)}(?![\\w-])`).test(normalized2)) {
      return true;
    }
  }
  return false;
}
function findImperativeMediaControlFindings(ctx) {
  const findings = [];
  const mediaTags = ctx.tags.filter((tag) => tag.name === "video" || tag.name === "audio");
  const mediaIndex = {
    ids: new Set(
      mediaTags.map((tag) => readAttr(tag.raw, "id")).filter((id) => Boolean(id))
    ),
    classes: new Set(mediaTags.flatMap((tag) => classNamesFromAttr(readAttr(tag.raw, "class")))),
    hasVideo: mediaTags.some((tag) => tag.name === "video"),
    hasAudio: mediaTags.some((tag) => tag.name === "audio")
  };
  if (mediaTags.length === 0 || ctx.scripts.length === 0) return findings;
  for (const script of ctx.scripts) {
    const mediaVars = /* @__PURE__ */ new Map();
    const assignmentPatterns = [
      {
        pattern: /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:document|window\.document)\.getElementById\(\s*["']([^"']+)["']\s*\)/g,
        variableIndex: 1,
        targetIndex: 2
      },
      {
        pattern: /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:document|window\.document)\.querySelector\(\s*(["'])([\s\S]*?)\2\s*\)/g,
        variableIndex: 1,
        targetIndex: 3
      }
    ];
    for (const { pattern, variableIndex, targetIndex } of assignmentPatterns) {
      let match;
      while ((match = pattern.exec(script.content)) !== null) {
        const variableName = match[variableIndex];
        const target = match[targetIndex];
        if (!variableName || !target) continue;
        if (mediaIndex.ids.has(target) || selectorTargetsManagedMedia(target, mediaIndex)) {
          mediaVars.set(variableName, mediaIndex.ids.has(target) ? target : void 0);
        }
      }
    }
    const directIdPatterns = [
      {
        pattern: /\b(?:document|window\.document)\.getElementById\(\s*["']([^"']+)["']\s*\)\.play\s*\(/g,
        kind: "play()",
        targetIndex: 1
      },
      {
        pattern: /\b(?:document|window\.document)\.getElementById\(\s*["']([^"']+)["']\s*\)\.pause\s*\(/g,
        kind: "pause()",
        targetIndex: 1
      },
      {
        pattern: /\b(?:document|window\.document)\.getElementById\(\s*["']([^"']+)["']\s*\)\.currentTime\s*=/g,
        kind: "currentTime",
        targetIndex: 1
      },
      {
        pattern: /\b(?:document|window\.document)\.getElementById\(\s*["']([^"']+)["']\s*\)\.muted\s*=/g,
        kind: "muted assignment",
        targetIndex: 1
      },
      {
        pattern: /\b(?:document|window\.document)\.querySelector\(\s*(["'])([\s\S]*?)\1\s*\)\.play\s*\(/g,
        kind: "play()",
        targetIndex: 2
      },
      {
        pattern: /\b(?:document|window\.document)\.querySelector\(\s*(["'])([\s\S]*?)\1\s*\)\.pause\s*\(/g,
        kind: "pause()",
        targetIndex: 2
      },
      {
        pattern: /\b(?:document|window\.document)\.querySelector\(\s*(["'])([\s\S]*?)\1\s*\)\.currentTime\s*=/g,
        kind: "currentTime",
        targetIndex: 2
      },
      {
        pattern: /\b(?:document|window\.document)\.querySelector\(\s*(["'])([\s\S]*?)\1\s*\)\.muted\s*=/g,
        kind: "muted assignment",
        targetIndex: 2
      }
    ];
    for (const { pattern, kind, targetIndex } of directIdPatterns) {
      let match;
      while ((match = pattern.exec(script.content)) !== null) {
        const target = match[targetIndex];
        if (!target) continue;
        const elementId = mediaIndex.ids.has(target) ? target : selectorTargetsManagedMedia(target, mediaIndex) ? void 0 : null;
        if (elementId === null) continue;
        findings.push({
          code: "imperative_media_control",
          severity: "error",
          message: `Inline <script> imperatively controls managed media via ${kind}. HyperFrames must own media play/pause/seek to keep preview, timeline, and renders deterministic.`,
          elementId: elementId || void 0,
          fixHint: "Remove imperative media play/pause/currentTime/muted control. Express timing with data-start/data-duration and media offsets like data-media-start or data-playback-start instead.",
          snippet: truncateSnippet(match[0])
        });
      }
    }
    for (const [variableName, elementId] of mediaVars) {
      const escapedVar = escapeRegExp(variableName);
      const variablePatterns = [
        { pattern: new RegExp(`\\b${escapedVar}\\.play\\s*\\(`, "g"), kind: "play()" },
        { pattern: new RegExp(`\\b${escapedVar}\\.pause\\s*\\(`, "g"), kind: "pause()" },
        { pattern: new RegExp(`\\b${escapedVar}\\.currentTime\\s*=`, "g"), kind: "currentTime" },
        {
          pattern: new RegExp(`\\b${escapedVar}\\.muted\\s*=`, "g"),
          kind: "muted assignment"
        }
      ];
      for (const { pattern, kind } of variablePatterns) {
        let match;
        while ((match = pattern.exec(script.content)) !== null) {
          findings.push({
            code: "imperative_media_control",
            severity: "error",
            message: `Inline <script> imperatively controls managed media via ${kind}. HyperFrames must own media play/pause/seek to keep preview, timeline, and renders deterministic.`,
            elementId,
            fixHint: "Remove imperative media play/pause/currentTime/muted control. Express timing with data-start/data-duration and media offsets like data-media-start or data-playback-start instead.",
            snippet: truncateSnippet(match[0])
          });
        }
      }
    }
  }
  return findings;
}
function findRuntimeMediaSrcMutationFindings(ctx) {
  const { document } = parseHTML(ctx.source);
  const findings = [];
  for (const script of ctx.scripts) {
    for (const mutation of extractMediaSrcMutations(script.content)) {
      let targets;
      try {
        const id = /^#[A-Za-z_][\w-]*$/.test(mutation.selector) ? mutation.selector.slice(1) : null;
        const idTarget = id ? document.getElementById(id) : null;
        targets = id ? idTarget ? [idTarget] : [] : [...document.querySelectorAll(mutation.selector)];
      } catch {
        continue;
      }
      const mediaTargets = targets.map((element) => {
        const name = element.tagName.toLowerCase();
        if (name === "video" || name === "audio") return element;
        return name === "source" ? element.closest("video, audio") : null;
      }).filter((element) => element !== null);
      if (mediaTargets.length === 0) continue;
      findings.push({
        code: "media_runtime_src_mutation",
        severity: "warning",
        message: `Inline script mutates the source of existing managed media via ${mutation.operation === "src_assignment" ? ".src assignment" : "setAttribute('src', ...)"}. Browser probing can reconcile synchronous writes, but external or delayed writes can still diverge between preview and extraction.`,
        elementId: mediaTargets[0]?.getAttribute("id") || void 0,
        selector: mutation.selector,
        fixHint: "Author the final static src, or bind data-var-src to a declared image/string variable so the selected source is applied before media discovery and extraction.",
        snippet: truncateSnippet(mutation.raw)
      });
    }
  }
  return findings;
}
var mediaRules = [
  findNestedMediaStartBasisFindings,
  findSpeedRampOnNonMediaFindings,
  // duplicate_media_id + duplicate_media_discovery_risk
  ({ tags }) => {
    const findings = [];
    const mediaById = /* @__PURE__ */ new Map();
    const mediaFingerprintCounts = /* @__PURE__ */ new Map();
    for (const tag of tags) {
      if (!isMediaTag(tag.name)) continue;
      const elementId = readAttr(tag.raw, "id");
      if (elementId) {
        const existing = mediaById.get(elementId) || [];
        existing.push(tag);
        mediaById.set(elementId, existing);
      }
      const fingerprint = [
        tag.name,
        readAttr(tag.raw, "src") || "",
        readAttr(tag.raw, "data-start") || "",
        readAttr(tag.raw, "data-duration") || ""
      ].join("|");
      mediaFingerprintCounts.set(fingerprint, (mediaFingerprintCounts.get(fingerprint) || 0) + 1);
    }
    for (const [elementId, mediaTags] of mediaById) {
      if (mediaTags.length < 2) continue;
      findings.push({
        code: "duplicate_media_id",
        severity: "error",
        message: `Media id "${elementId}" is defined multiple times.`,
        elementId,
        fixHint: "Give each media element a unique id so preview and producer discover the same media graph.",
        snippet: truncateSnippet(mediaTags[0]?.raw || "")
      });
    }
    for (const [fingerprint, count] of mediaFingerprintCounts) {
      if (count < 2) continue;
      const [tagName, src, dataStart, dataDuration] = fingerprint.split("|");
      findings.push({
        code: "duplicate_media_discovery_risk",
        severity: "warning",
        message: `Detected ${count} matching ${tagName} entries with the same source/start/duration.`,
        fixHint: "Avoid duplicated media nodes that can be discovered twice during compilation.",
        snippet: truncateSnippet(
          `${tagName} src=${src} data-start=${dataStart} data-duration=${dataDuration}`
        )
      });
    }
    return findings;
  },
  // color_grading_* — grading is a structured media-only contract. Unknown
  // keys are ignored by the runtime, so catch them before an agent can report
  // controls that never actually rendered.
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      const raw = readDecodedAttr(tag.raw, "data-color-grading");
      if (raw === null) continue;
      const elementId = readAttr(tag.raw, "id") || void 0;
      const report = (code, message, fixHint) => {
        findings.push({
          code,
          severity: "error",
          message,
          elementId,
          fixHint,
          snippet: truncateSnippet(tag.raw)
        });
      };
      if (tag.name !== "video" && tag.name !== "img") {
        report(
          "color_grading_non_media",
          `data-color-grading on <${tag.name}> has no effect. The shader runtime only grades real <video> and <img> elements.`,
          "Move the grading attribute to the real <video> or <img> media element. Do not attach it to a wrapper or CSS background."
        );
        continue;
      }
      const trimmed = raw.trim();
      if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) continue;
      let parsed;
      try {
        parsed = JSON.parse(trimmed);
      } catch {
        report(
          "color_grading_invalid_json",
          "data-color-grading contains malformed JSON and will not render.",
          'Use valid JSON, for example {"preset":"skin-soft","intensity":0.6,"adjust":{"highlights":-0.08}}.'
        );
        continue;
      }
      for (const issue of validateColorGradingContract(parsed)) {
        report(
          "color_grading_invalid_structure",
          `data-color-grading ${issue.path} ${issue.message}.`,
          issue.hint ?? "Use the documented media-treatment contract and correct or remove the invalid value."
        );
      }
    }
    return findings;
  },
  // video_missing_muted
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      if (tag.name !== "video") continue;
      const hasMuted = hasAttrName(tag.raw, "muted");
      const hasDeclaredAudio = readAttr(tag.raw, "data-has-audio") === "true";
      const declaresAudioState = hasAttrName(tag.raw, "data-has-audio");
      if (!hasMuted && !declaresAudioState && readAttr(tag.raw, "data-start")) {
        const elementId = readAttr(tag.raw, "id") || void 0;
        findings.push({
          code: "video_missing_muted",
          severity: "error",
          message: `<video${elementId ? ` id="${elementId}"` : ""}> has data-start but declares neither muted nor data-has-audio. If the file has sound, add data-has-audio="true" (the sound stays on this clip). If it is silent, add muted.`,
          elementId,
          fixHint: 'Add data-has-audio="true" when the file has sound (recommended \u2014 keeps picture and sound on one clip), or add `muted` for silent footage.',
          snippet: truncateSnippet(tag.raw)
        });
      }
      if (hasMuted && hasDeclaredAudio) {
        const elementId = readAttr(tag.raw, "id") || void 0;
        findings.push({
          code: "video_muted_with_declared_audio",
          severity: "error",
          message: `<video${elementId ? ` id="${elementId}"` : ""}> declares data-has-audio="true" but also has muted. Studio preview will silence the video audio.`,
          elementId,
          fixHint: 'Remove the `muted` attribute if this video should be audible, or remove data-has-audio="true" and use data-volume="0" for silent visual video.',
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  },
  // video_nested_in_timed_element
  ({ source, tags }) => {
    const findings = [];
    const voidElements = /* @__PURE__ */ new Set([
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "source",
      "track",
      "wbr"
    ]);
    const timedTagPositions = [];
    for (const tag of tags) {
      if (tag.name === "video" || tag.name === "audio") continue;
      if (voidElements.has(tag.name)) continue;
      if (readDecodedAttr(tag.raw, "data-composition-id")) continue;
      if (readAttr(tag.raw, "data-start")) {
        timedTagPositions.push({
          name: tag.name,
          start: tag.index,
          id: readAttr(tag.raw, "id") || void 0
        });
      }
    }
    for (const tag of tags) {
      if (tag.name !== "video") continue;
      if (!readAttr(tag.raw, "data-start")) continue;
      for (const parent of timedTagPositions) {
        if (parent.start < tag.index) {
          const parentClosePattern = new RegExp(`</${parent.name}>`, "gi");
          const between = source.substring(parent.start, tag.index);
          if (!parentClosePattern.test(between)) {
            findings.push({
              code: "video_nested_in_timed_element",
              severity: "error",
              message: `<video> with data-start is nested inside <${parent.name}${parent.id ? ` id="${parent.id}"` : ""}> which also has data-start. The frame extractor resolves the video's start from its own data-start without the wrapper's offset, while visibility uses the wrapper's window, so the two disagree: the clip shows the wrong source frames and then disappears partway through its slot.`,
              elementId: readAttr(tag.raw, "id") || void 0,
              fixHint: "Time the wrapper OR the video, never both: remove data-start from the wrapper (use it as a non-timed visual container), or move the <video> up to be a direct child of the stage.",
              snippet: truncateSnippet(tag.raw)
            });
            break;
          }
        }
      }
    }
    return findings;
  },
  // self_closing_media_tag
  ({ source }) => {
    const findings = [];
    const selfClosingMediaRe = /<(audio|video)\b[^>]*\/>/gi;
    let scMatch;
    while ((scMatch = selfClosingMediaRe.exec(source)) !== null) {
      const tagName = scMatch[1] || "audio";
      const elementId = readAttr(scMatch[0], "id") || void 0;
      findings.push({
        code: "self_closing_media_tag",
        severity: "error",
        message: `Self-closing <${tagName}/> is invalid HTML. The browser will leave the tag open, swallowing all subsequent elements as invisible fallback content. This makes compositions INVISIBLE.`,
        elementId,
        fixHint: `Change <${tagName} .../> to <${tagName} ...></${tagName}> \u2014 media elements MUST have explicit closing tags.`,
        snippet: truncateSnippet(scMatch[0])
      });
    }
    return findings;
  },
  // media_src_kind_mismatch
  findMediaSrcKindMismatchFindings,
  // placeholder_media_url
  ({ tags }) => {
    const findings = [];
    const PLACEHOLDER_DOMAINS = /\b(placehold\.co|placeholder\.com|placekitten\.com|picsum\.photos|example\.com|via\.placeholder\.com|dummyimage\.com)\b/i;
    for (const tag of tags) {
      if (!isMediaTag(tag.name)) continue;
      const src = readAttr(tag.raw, "src");
      if (!src) continue;
      if (PLACEHOLDER_DOMAINS.test(src)) {
        const elementId = readAttr(tag.raw, "id") || void 0;
        findings.push({
          code: "placeholder_media_url",
          severity: "error",
          message: `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> uses a placeholder URL that will 404 at render time: ${src.slice(0, 80)}`,
          elementId,
          fixHint: "Replace with a real media URL. Placeholder domains will 404 at render time.",
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  },
  // base64_media_prohibited
  ({ source }) => {
    const findings = [];
    const base64MediaRe = /src\s*=\s*["'](data:(?:audio|video)\/[^;]+;base64,([A-Za-z0-9+/=]{20,}))["']/gi;
    let b64Match;
    while ((b64Match = base64MediaRe.exec(source)) !== null) {
      const sample = (b64Match[2] || "").slice(0, 200);
      const uniqueChars = new Set(sample.replace(/[A-Za-z0-9+/=]/g, (c) => c)).size;
      const dataSize = Math.round((b64Match[2] || "").length * 3 / 4);
      const isSuspicious = uniqueChars < 15 || dataSize > 1e3 && dataSize < 5e4;
      findings.push({
        code: "base64_media_prohibited",
        severity: "error",
        message: `Inline base64 audio/video detected (${(dataSize / 1024).toFixed(0)} KB)${isSuspicious ? " \u2014 likely fabricated data" : ""}. Base64 media is prohibited \u2014 it bloats file size and breaks rendering.`,
        fixHint: "Use a relative path (assets/music.mp3) or HTTPS URL for the audio/video src. Never embed media as base64.",
        snippet: truncateSnippet((b64Match[1] ?? "").slice(0, 80) + "...")
      });
    }
    return findings;
  },
  // media_missing_data_start + media_missing_id + media_missing_src + media_preload_none
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      if (tag.name !== "video" && tag.name !== "audio") continue;
      const hasDataStart = readAttr(tag.raw, "data-start");
      const hasId = readAttr(tag.raw, "id");
      const hasSrc = mediaHasResolvableSrc(tag, tags);
      if (hasSrc && !hasDataStart) {
        findings.push({
          code: "media_missing_data_start",
          severity: "error",
          message: `<${tag.name}${hasId ? ` id="${hasId}"` : ""}> has src but no data-start. HyperFrames cannot own playback for untimed media, so preview and render behavior can diverge.`,
          elementId: hasId || void 0,
          fixHint: `Add data-start="0" (or the intended start time) and data-duration if the clip should stop before the source ends.`,
          snippet: truncateSnippet(tag.raw)
        });
      }
      if (hasDataStart && !hasId) {
        findings.push({
          code: "media_missing_id",
          severity: "error",
          message: `<${tag.name}> has data-start but no id attribute. The renderer requires id to discover media elements \u2014 this ${tag.name === "audio" ? "audio will be SILENT" : "video will be FROZEN"} in renders.`,
          fixHint: `Add a unique id attribute: <${tag.name} id="my-${tag.name}" ...>`,
          snippet: truncateSnippet(tag.raw)
        });
      }
      if (hasDataStart && hasId && !hasSrc) {
        const varSrc = readAttr(tag.raw, "data-var-src");
        if (varSrc) {
          findings.push({
            code: "media_variable_src_no_fallback",
            severity: "warning",
            message: `<${tag.name} id="${hasId}"> relies on data-var-src="${varSrc}" with no fallback src. Renders without a "${varSrc}" value cannot load this media, and audio extraction reads the authored src.`,
            elementId: hasId,
            fixHint: `Add a fallback src the composition can render with when the variable is not provided.`,
            snippet: truncateSnippet(tag.raw)
          });
        } else {
          findings.push({
            code: "media_missing_src",
            severity: "error",
            message: `<${tag.name} id="${hasId}"> has data-start but no src (on the element or a <source> child). The renderer cannot load this media.`,
            elementId: hasId,
            fixHint: `Add src on the <${tag.name}> element, or a <source src="..."> child.`,
            snippet: truncateSnippet(tag.raw)
          });
        }
      }
      if (readAttr(tag.raw, "preload") === "none") {
        findings.push({
          code: "media_preload_none",
          severity: "warning",
          message: `<${tag.name}${hasId ? ` id="${hasId}"` : ""}> has preload="none" which prevents the renderer from loading this media. The compiler strips it for renders, but preview may also have issues.`,
          elementId: hasId || void 0,
          fixHint: `Remove preload="none" or change to preload="auto". The framework manages media loading.`,
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  },
  // media_crossorigin_breaks_preview — `crossorigin` on <video>/<audio> forces a
  // CORS-checked fetch. The server-side renderer downloads media directly (no CORS),
  // so it always works there; but Studio preview runs in the browser, where a media
  // host that omits Access-Control-Allow-Origin silently fails the load — the media
  // shows BLANK/black in preview while renders look fine, hiding the bug. Plain
  // displayed media never needs crossorigin; it's only required to read pixels/samples
  // back (canvas/WebGL texture, WebAudio createMediaElementSource) AND only when the
  // host is known CORS-enabled.
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      if (tag.name !== "video" && tag.name !== "audio") continue;
      if (!hasAttrName(tag.raw, "crossorigin")) continue;
      const elementId = readAttr(tag.raw, "id") || void 0;
      findings.push({
        code: "media_crossorigin_breaks_preview",
        severity: "error",
        message: `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> has crossorigin, which forces a CORS-checked fetch. If the media host omits Access-Control-Allow-Origin, the load silently fails in Studio preview (media shows BLANK/black) while server-side renders still work \u2014 hiding the bug.`,
        elementId,
        fixHint: "Remove the crossorigin attribute unless you read the media back via canvas/WebGL/WebAudio AND the host is known to send CORS headers. Plain displayed media never needs it.",
        snippet: truncateSnippet(tag.raw)
      });
    }
    return findings;
  },
  // video_audio_double_source — catches audible <video> paired with a separate
  // <audio> pointing to the same file, which causes double playback at runtime
  ({ tags }) => {
    const findings = [];
    const videos = [];
    const audios = [];
    for (const tag of tags) {
      if (!readAttr(tag.raw, "data-start")) continue;
      const src = readAttr(tag.raw, "src");
      if (!src) continue;
      const source = { id: readAttr(tag.raw, "id") || void 0, raw: tag.raw };
      if (tag.name === "video") {
        if (isAudibleVideoTag(tag.raw)) videos.push([src, source]);
      } else if (tag.name === "audio") {
        audios.push([src, source]);
      }
    }
    for (const [src, audioInfo] of audios) {
      const match = videos.find(
        ([videoSrc, video]) => videoSrc === src && mediaWindowsOverlap(mediaTimeWindow(video.raw), mediaTimeWindow(audioInfo.raw))
      );
      if (!match) continue;
      const videoInfo = match[1];
      findings.push({
        code: "video_audio_double_source",
        severity: "error",
        message: `<audio${audioInfo.id ? ` id="${audioInfo.id}"` : ""}> and <video${videoInfo.id ? ` id="${videoInfo.id}"` : ""}> both point to the same source at the same time. The unmuted video already provides audio \u2014 the duplicate <audio> will cause double playback and echo.`,
        elementId: audioInfo.id,
        fixHint: "Remove the <audio> element and let the video carry its own sound (recommended), or mute the video (add `muted`) and keep the separate <audio> when picture and sound must be cut independently.",
        snippet: truncateSnippet(audioInfo.raw)
      });
    }
    return findings;
  },
  // imperative_media_control
  findImperativeMediaControlFindings,
  findRuntimeMediaSrcMutationFindings,
  // audio_volume_double_automation
  findVolumeDoubleAutomationFindings,
  // audio_volume_tween_overrides_gain
  findVolumeTweenOverridesGainFindings,
  // audio_carve_ungrouped_sources
  findCarveUngroupedSourcesFindings,
  // audio_group_no_members
  findAudioGroupNoMembersFindings,
  // audio_group_timing_attrs
  findAudioGroupTimingAttrFindings,
  // audio_group_carve_attr
  findAudioGroupCarveAttrFindings,
  findLinkedClipFindings
];
function findVolumeTweenOverridesGainFindings(ctx) {
  const boosted = ctx.tags.filter((tag) => isMediaTag(tag.name)).map((tag) => ({ tag, volume: Number(readAttr(tag.raw, "data-volume") ?? "1") })).filter((entry) => Number.isFinite(entry.volume) && entry.volume !== 1).filter((entry) => !readDecodedAttr(entry.tag.raw, "data-automation")).map((entry) => ({ ...entry, id: readAttr(entry.tag.raw, "id") })).filter((entry) => Boolean(entry.id));
  if (boosted.length === 0) return [];
  const script = ctx.scripts.map((block) => stripJsComments(block.content)).join("\n");
  const findings = [];
  for (const { tag, id, volume } of boosted) {
    if (!tweensVolumeInSameCall(script, id)) continue;
    const db = volume > 0 ? `${(20 * Math.log10(volume)).toFixed(1)} dB` : "silence";
    findings.push({
      code: "audio_volume_tween_overrides_gain",
      severity: "warning",
      message: `#${id} has data-volume="${volume}" (${db}) and a GSAP tween on \`volume\`. Tween values are absolute \u2014 they REPLACE this gain rather than scale it \u2014 so wherever the tween names a value the clip plays at that value, not at ${db}.`,
      elementId: id,
      fixHint: "Write the tween's targets in the same absolute gain (e.g. `volume: 1.95`, not `volume: 1`), or reset data-volume to 1 and let the tween carry the level on its own.",
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
function findVolumeDoubleAutomationFindings(ctx) {
  const automated = ctx.tags.filter((tag) => isMediaTag(tag.name)).map((tag) => ({ tag, automation: readDecodedAttr(tag.raw, "data-automation") })).filter((entry) => entry.automation && /"target"\s*:\s*"volume"/.test(entry.automation)).map((entry) => ({ ...entry, id: readAttr(entry.tag.raw, "id") })).filter((entry) => Boolean(entry.id));
  if (automated.length === 0) return [];
  const script = ctx.scripts.map((block) => stripJsComments(block.content)).join("\n");
  const findings = [];
  for (const { tag, id } of automated) {
    const tweened = tweensVolumeInSameCall(script, id);
    if (!tweened) continue;
    findings.push({
      code: "audio_volume_double_automation",
      severity: "warning",
      message: `#${id} has both a volume automation lane and a GSAP tween on \`volume\`. The lane wins \u2014 the tween is ignored in preview and in the render.`,
      elementId: id,
      fixHint: "Keep one of them: delete the volume lane to go back to tweening, or drop the tween and shape the level in the automation lane.",
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
function findSpeedRampOnNonMediaFindings(ctx) {
  return ctx.tags.filter((tag) => tag.name !== "video" && tag.name !== "audio").filter(
    (tag) => /"target"\s*:\s*"rate"/.test(readDecodedAttr(tag.raw, "data-automation") ?? "")
  ).map((tag) => ({
    code: "speed_ramp_on_non_media",
    severity: "warning",
    message: `<${tag.name}> has a speed-ramp lane, but only <video> and <audio> clips can be retimed. The lane does nothing here.`,
    elementId: readAttr(tag.raw, "id") || void 0,
    fixHint: "Move the rate lane onto the <video> or <audio> clip, or retime an animation with a GSAP timeline instead.",
    snippet: truncateSnippet(tag.raw)
  }));
}
function findCarveUngroupedSourcesFindings(ctx) {
  const groupIds = new Set(
    ctx.tags.filter((tag) => tag.name === "hf-audio-group").map((tag) => readAttr(tag.raw, "id"))
  );
  const findings = [];
  for (const tag of ctx.tags) {
    const raw = readDecodedAttr(tag.raw, "data-fx-carve");
    if (raw === null) continue;
    const trimmed = raw.trim();
    if (!trimmed.startsWith("{")) continue;
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      continue;
    }
    const sources = parsed.sources;
    if (!Array.isArray(sources)) continue;
    const clipIds = sources.filter(
      (id) => typeof id === "string" && !groupIds.has(id)
    );
    if (clipIds.length < 2) continue;
    const elementId = readAttr(tag.raw, "id") || void 0;
    findings.push({
      code: "audio_carve_ungrouped_sources",
      severity: "warning",
      message: `${elementId ? `#${elementId}'s` : "This"} carve names ${clipIds.length} voice clips directly (${clipIds.join(", ")}) instead of a group.`,
      elementId,
      fixHint: "Group the voice clips and carve against the group \u2014 a hand-rolled clip list silently rots when a clip is added.",
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
var AUDIO_GROUP_TIMING_ATTRS = ["data-start", "data-duration", "data-track-index"];
function findAudioGroupNoMembersFindings(ctx) {
  const memberGroupIds = new Set(
    ctx.tags.filter((tag) => tag.name === "audio" || tag.name === "video" && isAudibleVideoTag(tag.raw)).map((tag) => readAttr(tag.raw, "data-audio-group")).filter((id) => Boolean(id))
  );
  if (memberGroupIds.size === 0) return [];
  const mayHaveCrossFileMembers = ctx.tags.some(
    (tag) => Boolean(readAttr(tag.raw, "data-composition-src"))
  );
  const declaredGroupIds = new Set(
    ctx.tags.filter((tag) => tag.name === "hf-audio-group").map((tag) => readAttr(tag.raw, "id")).filter((id) => Boolean(id))
  );
  const unmatchedMemberGroupIds = [...memberGroupIds].filter((id) => !declaredGroupIds.has(id));
  const findings = [];
  for (const tag of ctx.tags) {
    if (tag.name !== "hf-audio-group") continue;
    const elementId = readAttr(tag.raw, "id");
    if (!elementId) continue;
    if (memberGroupIds.has(elementId)) continue;
    if (mayHaveCrossFileMembers) continue;
    const nearby = unmatchedMemberGroupIds.filter((id) => id !== elementId);
    const suffix = nearby.length > 0 ? ` Clips in this file name ${nearby.map((id) => `"${id}"`).join(", ")} instead.` : "";
    findings.push({
      code: "audio_group_no_members",
      severity: "error",
      message: `#${elementId} is an audio group no clip belongs to, so its fader, effect chain and automation are dropped.${suffix}`,
      elementId,
      fixHint: `Add \`data-audio-group="${elementId}"\` to the clips this bus is for, or delete the bus.`,
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
function findAudioGroupTimingAttrFindings(ctx) {
  const findings = [];
  for (const tag of ctx.tags) {
    if (tag.name !== "hf-audio-group") continue;
    const present = AUDIO_GROUP_TIMING_ATTRS.filter((attr) => hasAttrName(tag.raw, attr));
    if (present.length === 0) continue;
    const elementId = readAttr(tag.raw, "id") || void 0;
    findings.push({
      code: "audio_group_timing_attrs",
      severity: "warning",
      message: `${elementId ? `#${elementId}` : "This audio group"} carries ${present.map((attr) => `\`${attr}\``).join(", ")}, which a bus has no use for \u2014 its members carry the timing and its automation clock is composition time.`,
      elementId,
      fixHint: `Remove ${present.map((attr) => `\`${attr}\``).join(", ")} from the group element.`,
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
function findAudioGroupCarveAttrFindings(ctx) {
  const findings = [];
  for (const tag of ctx.tags) {
    if (tag.name !== "hf-audio-group") continue;
    if (!hasAttrName(tag.raw, "data-fx-carve")) continue;
    const elementId = readAttr(tag.raw, "id") || void 0;
    findings.push({
      code: "audio_group_carve_attr",
      severity: "warning",
      message: `${elementId ? `#${elementId}` : "This audio group"} carries \`data-fx-carve\`, which belongs on the clip being carved \u2014 a bus has no audio of its own to level-match against, and a carve here stacks with any its members already have.`,
      elementId,
      fixHint: "Remove `data-fx-carve` and the `fromCarve` nodes it wrote into this bus's `data-fx-chain`, and carve the bed clip instead.",
      snippet: truncateSnippet(tag.raw)
    });
  }
  return findings;
}
var callIndexes = /* @__PURE__ */ new WeakMap();
function callsFor(script) {
  const cached = callIndexes.get(script);
  if (cached) return cached;
  const calls = [];
  try {
    const ast = parse(script.content, {
      ecmaVersion: "latest",
      sourceType: "script",
      allowReturnOutsideFunction: true
    });
    simple(ast, {
      CallExpression: (node) => {
        calls.push(node);
      }
    });
  } catch {
  }
  calls.sort((a, b) => a.start - b.start);
  callIndexes.set(script, calls);
  return calls;
}
function gsapCallOffset(script, method) {
  return callsFor(script).find(
    ({ callee }) => callee.type === "MemberExpression" && !callee.computed && callee.object.type === "Identifier" && callee.object.name === "gsap" && callee.property.type === "Identifier" && callee.property.name === method
  )?.start;
}
function containingCallOffset(script, tokenOffset) {
  let start;
  for (const call of callsFor(script)) {
    if (call.start > tokenOffset) break;
    if (call.end > tokenOffset) start = call.start;
  }
  return start;
}
var INSPECTION_VIEWPORT_CAP = 4096;
var MAX_COMPOSITION_LINES = 300;
var MAX_TIMED_ELEMENTS_PER_TRACK = 3;
var TRACK_DENSITY_EXEMPT_TAGS = /* @__PURE__ */ new Set(["audio", "script", "style", "video"]);
var CAPTION_CUE_TOKEN = /^(?:caption(?:[-_](?:group|word|line|block|cue|text))?|subtitle(?:[-_](?:group|line|cue|text))?|cg-.+)$/i;
var HEAVY_OVERLAY_ELEMENT_COUNT_WARN = 25;
var HEAVY_OVERLAY_EXEMPT_TAGS = /* @__PURE__ */ new Set([
  "audio",
  "body",
  "br",
  "defs",
  "head",
  "hr",
  "html",
  "link",
  "meta",
  "script",
  "source",
  "style",
  "template",
  "title",
  "use",
  "video"
]);
var HEAVY_OVERLAY_CSS_PATTERN = /(?:filter\s*:[^;}]*\bblur\s*\()|(?:clip-path\s*:(?!\s*(?:none|inherit|initial|unset)\b)\s*[^;}]+)|(?:radial-gradient\s*\()/i;
var INLINE_STYLE_DISPLAY_NONE_PATTERN = /(?:^|;)\s*display\s*:\s*none\b/i;
var COMPUTED_TIMELINE_REGISTRATION_PATTERN = /window\.__timelines\s*\[(?!\s*["'])(?:[^\r\n[\]]|\[[^\r\n\]]*\])+\]\s*(?:\?\?|\|\||&&)?=/;
function readTagTiming(rawTag) {
  return readClipTiming({ getAttribute: (name) => readAttr(rawTag, name) });
}
function countPhysicalLines(source) {
  if (source.length === 0) return 0;
  const normalized2 = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const withoutFinalNewline = normalized2.endsWith("\n") ? normalized2.slice(0, -1) : normalized2;
  return withoutFinalNewline.split("\n").length;
}
function countStructuralLines(source) {
  return countPhysicalLines(source.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "<style></style>"));
}
function isCaptionCue(tag) {
  const classTokens = (readAttr(tag.raw, "class") || "").split(/\s+/).filter(Boolean);
  const id = readAttr(tag.raw, "id");
  return classTokens.some((token) => CAPTION_CUE_TOKEN.test(token)) || Boolean(id && CAPTION_CUE_TOKEN.test(id));
}
function isRegistrySourceFile(filePath) {
  if (!filePath) return false;
  const normalized2 = filePath.replace(/\\/g, "/");
  return /(?:^|\/)registry\/blocks\/([^/]+)\/\1\.html$/i.test(normalized2);
}
function isRegistryInstalledFile(rawSource) {
  return /^\s*<!--\s*hyperframes-registry-item:[^>]*-->/i.test(rawSource.slice(0, 512));
}
function isCompositionRootOrMount(rawTag) {
  return Boolean(
    readDecodedAttr(rawTag, "data-composition-id") || readAttr(rawTag, "data-composition-src")
  );
}
function extractCssUrlReferences(css) {
  const out = [];
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const urlPattern = /\burl\(\s*(["']?)([^)"']+)\1\s*\)/g;
  let m;
  while ((m = urlPattern.exec(noComments)) !== null) {
    const raw = (m[2] ?? "").trim();
    if (raw) out.push(raw);
  }
  return out;
}
function extractCssSelectors(css) {
  const out = [];
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const ruleHeader = /([^{}]+)\{/g;
  let m;
  while ((m = ruleHeader.exec(noComments)) !== null) {
    const header = (m[1] ?? "").trim();
    if (!header || header.startsWith("@")) continue;
    for (const sel of header.split(",")) {
      const s = sel.trim();
      if (s) out.push(s);
    }
  }
  return out;
}
function leftmostCompoundClasses(selector) {
  const leftmost = selector.trim().split(/[\s>+~]+/)[0] ?? "";
  return (leftmost.match(/\.([\w-]+)/g) ?? []).map((c) => c.slice(1));
}
function leftmostCompoundId(selector) {
  const leftmost = selector.trim().split(/[\s>+~]+/)[0] ?? "";
  return leftmost.match(/#([\w-]+)/)?.[1] ?? null;
}
function collectHeavyOverlayHooks(styles) {
  const classes = /* @__PURE__ */ new Set();
  const ids = /* @__PURE__ */ new Set();
  for (const style of styles) {
    const noComments = style.content.replace(/\/\*[\s\S]*?\*\//g, "");
    const ruleWithBody = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleWithBody.exec(noComments)) !== null) {
      const header = (m[1] ?? "").trim();
      const body = m[2] ?? "";
      if (!header || header.startsWith("@")) continue;
      if (!HEAVY_OVERLAY_CSS_PATTERN.test(body)) continue;
      for (const sel of header.split(",")) {
        const trimmed = sel.trim();
        if (!trimmed) continue;
        for (const cls of leftmostCompoundClasses(trimmed)) classes.add(cls);
        const idToken = leftmostCompoundId(trimmed);
        if (idToken) ids.add(idToken);
      }
    }
  }
  return { classes, ids };
}
function rootClassStyledSelectors(styles, rootClasses) {
  const offenders = [];
  for (const style of styles) {
    for (const selector of extractCssSelectors(style.content)) {
      const hitsRoot = leftmostCompoundClasses(selector).some((c) => rootClasses.includes(c));
      if (hitsRoot && !offenders.includes(selector)) offenders.push(selector);
    }
  }
  return offenders;
}
var ZOOM_DECLARATION = /(?<![\w-])zoom\s*:\s*([^;}]+)/gi;
function isIdentityZoom(rawValue) {
  const value = rawValue.trim().replace(/!\s*important\s*$/i, "").trim().toLowerCase();
  return value === "" || value === "normal" || value === "unset" || value === "initial" || value === "revert" || value === "1" || value === "1.0" || value === "100%";
}
function firstRescalingZoom(css) {
  ZOOM_DECLARATION.lastIndex = 0;
  let match;
  while ((match = ZOOM_DECLARATION.exec(css)) !== null) {
    const value = (match[1] ?? "").trim();
    if (!isIdentityZoom(value)) return value.replace(/!\s*important\s*$/i, "").trim();
  }
  return null;
}
function targetsCanvasRoot(selector, rootId, rootClasses) {
  const leftmost = selector.trim().split(/[\s>+~]+/)[0] ?? "";
  const bare = leftmost.toLowerCase();
  if (bare === "html" || bare === "body" || bare === ":root" || bare === "*") return true;
  if (rootId && leftmostCompoundId(selector) === rootId) return true;
  return leftmostCompoundClasses(selector).some((cls) => rootClasses.includes(cls));
}
function inlineCanvasZoomHits(rootTag, tags) {
  const hits = [];
  const htmlTag = findHtmlTag(tags);
  const bodyTag = tags.find((tag) => tag.name.toLowerCase() === "body");
  for (const [label, tag] of [
    ["the root element's inline style", rootTag],
    ["<html>'s inline style", htmlTag],
    ["<body>'s inline style", bodyTag]
  ]) {
    if (!tag) continue;
    const inline = readAttr(tag.raw, "style");
    const value = inline ? firstRescalingZoom(inline) : null;
    if (value) hits.push({ where: label, value, snippet: truncateSnippet(tag.raw) });
  }
  return hits;
}
function firstCanvasSelector(header, rootId, rootClasses) {
  for (const selector of header.split(",")) {
    const trimmed = selector.trim();
    if (trimmed && targetsCanvasRoot(trimmed, rootId, rootClasses)) return trimmed;
  }
  return null;
}
function canvasZoomInRule(header, body, rootId, rootClasses) {
  const trimmedHeader = header.trim();
  if (!trimmedHeader || trimmedHeader.startsWith("@")) return null;
  const value = firstRescalingZoom(body);
  if (!value) return null;
  const selector = firstCanvasSelector(trimmedHeader, rootId, rootClasses);
  if (!selector) return null;
  return {
    where: `\`${selector}\``,
    value,
    snippet: truncateSnippet(`${selector} { zoom: ${value} }`)
  };
}
function stylesheetCanvasZoomHits(styles, rootId, rootClasses) {
  const hits = [];
  for (const style of styles) {
    const ruleWithBody = /([^{}]+)\{([^{}]*)\}/g;
    let match;
    while ((match = ruleWithBody.exec(stripCssComments(style.content))) !== null) {
      const hit = canvasZoomInRule(match[1] ?? "", match[2] ?? "", rootId, rootClasses);
      if (hit) hits.push(hit);
    }
  }
  return hits;
}
function canvasZoomHits(rootTag, tags, styles, rootId, rootClasses) {
  return [
    ...inlineCanvasZoomHits(rootTag, tags),
    ...stylesheetCanvasZoomHits(styles, rootId, rootClasses)
  ];
}
function collectDeclaredVariableIds(htmlTagRaw) {
  const declared = /* @__PURE__ */ new Set();
  const raw = readJsonAttr(htmlTagRaw, "data-composition-variables");
  if (!raw) return declared;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(parsed)) return declared;
  for (const entry of parsed) {
    const id = entry?.id;
    if (typeof id === "string") declared.add(id);
  }
  return declared;
}
function variablesDeclarationFindings(tag, tags) {
  const raw = readJsonAttr(tag.raw, "data-composition-variables");
  if (!raw) return [];
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    const reason = err instanceof Error ? err.message : "unknown";
    return [
      {
        code: "invalid_composition_variables_declaration",
        severity: "error",
        message: `data-composition-variables is not valid JSON (${reason}).`,
        fixHint: `Provide a JSON array of variable declarations: data-composition-variables='[{"id":"title","type":"string","label":"Title","default":"Hello"}]'.`,
        snippet: truncateSnippet(tag.raw)
      }
    ];
  }
  if (!Array.isArray(parsed)) {
    return [
      {
        code: "invalid_composition_variables_declaration",
        severity: "error",
        message: "data-composition-variables must be a JSON array of variable declarations.",
        fixHint: `Wrap declarations in [] and give each an id, type, label, and default: '[{"id":"title","type":"string","label":"Title","default":"Hello"}]'.`,
        snippet: truncateSnippet(tag.raw)
      }
    ];
  }
  const findings = [];
  const knownTypes = new Set(COMPOSITION_VARIABLE_TYPES);
  const varSrcIds = /* @__PURE__ */ new Set();
  for (const other of tags) {
    const bound = readAttr(other.raw, "data-var-src");
    if (bound) varSrcIds.add(bound);
  }
  for (let i = 0; i < parsed.length; i += 1) {
    const entry = parsed[i];
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      findings.push({
        code: "invalid_composition_variables_declaration",
        severity: "error",
        message: `data-composition-variables entry [${i}] must be an object with id, type, label, and default.`,
        snippet: truncateSnippet(tag.raw)
      });
      continue;
    }
    const e = entry;
    const missing = [];
    if (typeof e.id !== "string") missing.push("id");
    if (typeof e.type !== "string" || !knownTypes.has(e.type)) missing.push("type");
    if (typeof e.label !== "string") missing.push("label");
    if (!("default" in e)) missing.push("default");
    if (missing.length > 0) {
      findings.push({
        code: "invalid_composition_variables_declaration",
        severity: "error",
        message: `data-composition-variables entry [${i}] is missing or has invalid: ${missing.join(", ")}. Type must be one of string, number, color, boolean, enum, font, image.`,
        snippet: truncateSnippet(tag.raw)
      });
      continue;
    }
    const id = String(e.id);
    if ((e.type === "image" || varSrcIds.has(id)) && typeof e.default === "string" && e.default.length > 0 && !isSafeMediaUrl(e.default)) {
      findings.push({
        code: "unloadable_media_variable_default",
        severity: "error",
        message: `Variable "${id}" defaults to a URL the runtime will refuse to load, so any element bound to it renders its authored fallback src instead and the render still exits 0.`,
        fixHint: `Media URLs must be relative, http(s), blob:, or a data:image/* URI. Copy the file into the project and reference it relatively (e.g. "assets/bg.png") rather than by absolute path.`,
        snippet: truncateSnippet(tag.raw)
      });
    }
  }
  return findings;
}
function collectAllDeclaredVariableIds(tags) {
  const all = /* @__PURE__ */ new Set();
  for (const tag of tags) {
    if (!readAttr(tag.raw, "data-composition-variables")) continue;
    const ids = collectDeclaredVariableIds(tag.raw);
    if (ids === null) return null;
    for (const id of ids) all.add(id);
  }
  return all;
}
function declaredIdsForBindingCheck(tags) {
  const declared = collectAllDeclaredVariableIds(tags);
  if (declared === null) return null;
  if (declared.size === 0 && !findHtmlTag(tags)) return null;
  return declared;
}
function isInsideInertTemplate(tag, tags) {
  return tags.some(
    (candidate) => candidate.name === "template" && candidate.closeIndex != null && tag.index > candidate.index && tag.index < candidate.closeIndex
  );
}
var NEGATIVE_Z_INDEX = /(?<![\w-])z-index\s*:\s*-(?!0(?:\s*[;}]|\s*$))([\d.]+)/g;
function cssOwnerSelector(content, matchIndex) {
  const blockStart = content.lastIndexOf("{", matchIndex);
  if (blockStart === -1) return void 0;
  const previousBlockEnd = content.lastIndexOf("}", blockStart);
  const lines = content.slice(previousBlockEnd + 1, blockStart).trim().split("\n");
  return lines[lines.length - 1]?.trim() || void 0;
}
function elementSelector(tag) {
  const elementId = readAttr(tag.raw, "id");
  return elementId ? `#${elementId}` : void 0;
}
function negativeZIndexFinding(match, selector) {
  const level = match[1] ?? "";
  return {
    code: "negative_z_index",
    severity: "warning",
    ...selector ? { selector } : {},
    message: `\`z-index: -${level}\` paints the element behind its nearest stacking context's own content. With no stacking-context ancestor that context is the composition root itself, so an opaque background there hides it entirely: in the DOM, laid out, and absent from the picture. A transparent root leaves it visible. Siblings at \`z-index: 0\` or above are unaffected.`,
    fixHint: "Give the element's parent a stacking context - `isolation: isolate` is the cheapest, and `transform`, `filter`, `opacity` below 1, `contain: paint` and `will-change` all work too. The negative-z child then paints above that parent's background and renders normally. Or express paint order through DOM order - an earlier sibling paints behind a later one - and raise the elements that should sit in front rather than lowering this one.",
    snippet: truncateSnippet(match[0])
  };
}
function hasComputedTimelineRegistration(scripts) {
  return scripts.some(
    (script) => COMPUTED_TIMELINE_REGISTRATION_PATTERN.test(stripJsCode(script.content))
  );
}
function mountsSource(tag) {
  return Boolean(
    readAttr(tag.raw, "data-composition-src") || readAttr(tag.raw, "data-composition-file")
  );
}
function missingTimelineFinding(tag, compositionId, isRoot) {
  return {
    code: "missing_data_no_timeline",
    severity: "warning",
    message: isRoot ? "This composition has no `window.__timelines` registration but is missing `data-no-timeline`. The producer polls for timeline registration for up to 45 seconds before timing out, adding 45 s to every render." : `Composition host "${compositionId}" has neither a matching \`window.__timelines\` registration nor \`data-no-timeline\`. The producer waits up to 45 seconds for every \`data-composition-id\` before rendering.`,
    elementId: readAttr(tag.raw, "id") || void 0,
    fixHint: isRoot ? 'Add `data-no-timeline` to the root element to skip the poll: `<div data-composition-id="..." data-no-timeline ...>`.' : "If this is a static section, use a plain `id` instead of `data-composition-id`, or add `data-no-timeline`. Otherwise, register its timeline or mount it with `data-composition-src`.",
    snippet: truncateSnippet(tag.raw)
  };
}
var compositionRules = [
  // duplicate_composition_id catches meta-tag/root collisions that create duplicate composition entries.
  ({ tags }) => {
    const tagsByCompositionId = /* @__PURE__ */ new Map();
    for (const tag of tags) {
      if (isInsideInertTemplate(tag, tags)) continue;
      if (readAttr(tag.raw, "data-composition-src")) continue;
      const compositionId = readDecodedAttr(tag.raw, "data-composition-id");
      if (!compositionId || compositionId.trim().length === 0) continue;
      const matchingTags = tagsByCompositionId.get(compositionId) ?? [];
      matchingTags.push(tag.raw);
      tagsByCompositionId.set(compositionId, matchingTags);
    }
    const findings = [];
    for (const [compositionId, matchingTags] of tagsByCompositionId) {
      if (matchingTags.length < 2) continue;
      findings.push({
        code: "duplicate_composition_id",
        severity: "error",
        message: `Composition id "${compositionId}" is used by ${matchingTags.length} elements. Each data-composition-id value must be unique within a composition file.`,
        fixHint: "Keep data-composition-id on exactly one element, the composition root. Remove it from metadata or duplicate hosts, especially a <meta> tag carrying the same data-composition-id as the root <div>, which causes a silent duplicate-id collision.",
        snippet: truncateSnippet(matchingTags[0] ?? "")
      });
    }
    return findings;
  },
  // invalid_parent_traversal_in_asset_path — catches `../` traversal in src,
  // href, inline-style url(), and <style> url() asset references on
  // compositions. Sub-compositions live under compositions/ but are served
  // with the project root as their base URL, so any `../`-traversing path
  // climbs above the project root and 404s in Studio preview. Renders
  // tolerate it because the server-side bundler rewrites `../foo` against
  // each sub-composition's source path; the runtime now mirrors that fallback
  // (see rewriteSubCompositionAssetPaths in runtime/compositionLoader.ts), but
  // the authoring-time signal is still wrong — flag it at lint time so the
  // baked path is plain root-relative and matches what the bundler emits.
  //
  // Mirrors the runtime fallback's surface: `[src]` / `[href]` attribute
  // values, `[style]` inline url(), and `<style>` block url() references.
  // Skips absolute URLs (http(s)://, //, data:, /-prefixed root-relative),
  // hash anchors, and plain relative paths (`assets/x.mp4`) — only `../`
  // traversal is flagged. Subsumes the older `../capture/`-specific rule.
  // fallow-ignore-next-line complexity
  ({ tags, styles, rawSource, options }) => {
    if (isRegistrySourceFile(options.filePath) || isRegistryInstalledFile(rawSource)) return [];
    const offenders = [];
    const collect = (value) => {
      if (!value) return;
      const trimmed = value.trim();
      if (!trimmed.startsWith("../") && trimmed !== "..") return;
      offenders.push(trimmed);
    };
    for (const tag of tags) {
      collect(readAttr(tag.raw, "src"));
      collect(readAttr(tag.raw, "href"));
      const styleAttr = readJsonAttr(tag.raw, "style");
      if (styleAttr) {
        for (const url of extractCssUrlReferences(styleAttr)) collect(url);
      }
    }
    for (const style of styles) {
      for (const url of extractCssUrlReferences(style.content)) collect(url);
    }
    if (offenders.length === 0) return [];
    const prefixCounts = /* @__PURE__ */ new Map();
    for (const path of offenders) {
      const prefix = path.match(/^(?:\.\.\/)+[^/]+\//)?.[0] ?? path;
      prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);
    }
    const prefixSummary = Array.from(prefixCounts.entries()).sort(([, a], [, b]) => b - a).map(([prefix, count]) => count > 1 ? `${prefix} (${count})` : prefix).join(", ");
    return [
      {
        code: "invalid_parent_traversal_in_asset_path",
        severity: "error",
        message: `Found ${offenders.length} asset path(s) traversing above the project root with "../" (${prefixSummary}). Renders rewrite this against each sub-composition's source path, but Studio preview and other live consumers resolve against the project root and 404.`,
        fixHint: 'Use plain root-relative paths (e.g. "assets/...", "capture/...", "fonts/...") \u2014 compositions are served with the project root as their base URL, so paths must be root-relative, not relative to the compositions/ directory.'
      }
    ];
  },
  // composition_file_too_large
  ({ rawSource, options }) => {
    if (isRegistrySourceFile(options.filePath) || isRegistryInstalledFile(rawSource)) return [];
    const lineCount = countStructuralLines(rawSource);
    if (lineCount <= MAX_COMPOSITION_LINES) return [];
    const splitTarget = options.isSubComposition ? "Split this sub-composition further into smaller .html files" : "Split coherent scenes or layers into separate .html files under compositions/";
    return [
      {
        code: "composition_file_too_large",
        severity: "warning",
        message: `This HTML composition file has ${lineCount} lines. Smaller sub-compositions are easier to read, iterate on, and diff.`,
        fixHint: `${splitTarget}, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently.`
      }
    ];
  },
  // timeline_track_too_dense
  // fallow-ignore-next-line complexity
  ({ tags, options }) => {
    const trackCounts = /* @__PURE__ */ new Map();
    for (const tag of tags) {
      if (TRACK_DENSITY_EXEMPT_TAGS.has(tag.name)) continue;
      if (isCaptionCue(tag)) continue;
      if (isCompositionRootOrMount(tag.raw)) continue;
      if (!readAttr(tag.raw, "data-start")) continue;
      const track = readAttr(tag.raw, COMPOSITION_ATTRIBUTES.trackIndex);
      if (!track) continue;
      trackCounts.set(track, (trackCounts.get(track) ?? 0) + 1);
    }
    const findings = [];
    for (const [track, count] of trackCounts) {
      if (count <= MAX_TIMED_ELEMENTS_PER_TRACK) continue;
      const splitTarget = options.isSubComposition ? "Move coherent scene groups into smaller .html files" : "Move coherent scene groups into separate .html files under compositions/";
      findings.push({
        code: "timeline_track_too_dense",
        severity: "warning",
        message: `Track ${track} has ${count} timed elements in this HTML file. Smaller sub-compositions keep timelines easier to read, iterate on, and diff.`,
        fixHint: `${splitTarget} and mount them from the parent with data-composition-src so the timeline stays easier to inspect, revise, and validate.`
      });
    }
    return findings;
  },
  // deprecated_data_layer + deprecated_data_end
  // fallow-ignore-next-line complexity
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      const timing = readTagTiming(tag.raw);
      if (timing.diagnostics.some(({ code }) => code === "deprecated-layer")) {
        const elementId = readAttr(tag.raw, "id") || void 0;
        findings.push({
          code: "deprecated_data_layer",
          severity: "error",
          message: `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> uses data-layer instead of data-track-index.`,
          elementId,
          fixHint: "Replace data-layer with data-track-index, which is the canonical name Studio and the linter read. Neither name is read by the render.",
          snippet: truncateSnippet(tag.raw)
        });
      }
      if (timing.diagnostics.some(({ code }) => code === "deprecated-end")) {
        const elementId = readAttr(tag.raw, "id") || void 0;
        const conflicting = timing.diagnostics.some(({ code }) => code === "conflicting-end");
        const message = conflicting ? `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> has data-end that disagrees with data-duration. Remove the stale data-end; the compiler regenerates it from data-duration.` : `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> uses data-end without data-duration. Use data-duration in source HTML.`;
        findings.push({
          code: "deprecated_data_end",
          severity: "error",
          message,
          elementId,
          fixHint: "Replace data-end with data-duration. The compiler generates data-end from data-duration automatically.",
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  },
  // split_data_attribute_selector
  ({ scripts, styles }) => {
    const findings = [];
    const splitDataAttrSelectorPattern = /\[data-composition-id=(["'])([^"'\]]+)\1\s+(data-[\w:-]+)=(["'])([^"'\]]*)\4\]/g;
    const scan = (content) => {
      splitDataAttrSelectorPattern.lastIndex = 0;
      let match;
      while ((match = splitDataAttrSelectorPattern.exec(content)) !== null) {
        const compId = match[2] ?? "";
        const attrName = match[3] ?? "";
        const attrValue = match[5] ?? "";
        findings.push({
          code: "split_data_attribute_selector",
          severity: "error",
          message: `Selector "${match[0]}" combines two attributes inside one CSS attribute selector. Browsers reject it, so GSAP timelines or querySelector calls will fail before registering.`,
          selector: match[0],
          fixHint: `Use separate attribute selectors: [data-composition-id="${compId}"][${attrName}="${attrValue}"].`,
          snippet: truncateSnippet(match[0])
        });
      }
    };
    for (const style of styles) scan(stripCssComments(style.content));
    for (const script of scripts) scan(stripJsComments(script.content));
    return findings;
  },
  // template_literal_selector
  ({ scripts }) => {
    const findings = [];
    for (const script of scripts) {
      const templateLiteralSelectorPattern = /(?:querySelector|querySelectorAll)\s*\(\s*`[^`]*\$\{[^}]+\}[^`]*`\s*\)/g;
      const scanned = stripJsCode(script.content);
      let tlMatch;
      while ((tlMatch = templateLiteralSelectorPattern.exec(scanned)) !== null) {
        findings.push({
          code: "template_literal_selector",
          severity: "error",
          message: "querySelector uses a template literal variable (e.g. `${compId}`). The HTML bundler's CSS parser crashes on these. Use a hardcoded string instead.",
          fixHint: "Replace the template literal variable with a hardcoded string. The bundler's CSS parser cannot handle interpolated variables in script content.",
          snippet: truncateSnippet(
            script.content.slice(tlMatch.index, tlMatch.index + tlMatch[0].length)
          )
        });
      }
    }
    return findings;
  },
  // timed_element_missing_clip_class
  // fallow-ignore-next-line complexity
  ({ tags }) => {
    const findings = [];
    const skipTags = /* @__PURE__ */ new Set(["audio", "img", "video", "script", "style", "template"]);
    for (const tag of tags) {
      if (skipTags.has(tag.name)) continue;
      if (readDecodedAttr(tag.raw, "data-composition-id")) continue;
      if (readAttr(tag.raw, "data-composition-src")) continue;
      const hasStart = readAttr(tag.raw, "data-start") !== null;
      const hasDuration = readAttr(tag.raw, "data-duration") !== null;
      if (!hasStart && !hasDuration) continue;
      const classAttr = readAttr(tag.raw, "class") || "";
      const hasClip = classAttr.split(/\s+/).includes("clip");
      if (hasClip) continue;
      const elementId = readAttr(tag.raw, "id") || void 0;
      findings.push({
        code: "timed_element_missing_clip_class",
        // Not an error: the runtime drives timed visibility off the `data-start`
        // ATTRIBUTE, not this class — `syncTimedElementVisibility` walks
        // `querySelectorAll("[data-start]")` and toggles `style.visibility`
        // regardless of class (pinned by the runtime's own init test, which
        // uses a bare `<div data-start data-duration>` with no `class="clip"`).
        // The class is an authoring convention the tooling reads, so a missing
        // one is worth flagging but does not break the render.
        severity: "warning",
        message: `<${tag.name}${elementId ? ` id="${elementId}"` : ""}> has timing attributes but no class="clip". The runtime still hides it outside its time range, but Studio and the GSAP clip-ownership rules use .clip to recognise a clip, so leaving it off makes the element harder to edit and to lint.`,
        elementId,
        fixHint: 'Add class="clip" to the element so Studio and the linter can recognise it as a clip.',
        snippet: truncateSnippet(tag.raw)
      });
    }
    return findings;
  },
  // standalone_composition_wrapped_in_template
  ({ rawSource, options }) => {
    const findings = [];
    if (options.isSubComposition) return findings;
    const trimmed = rawSource.trimStart().toLowerCase();
    if (trimmed.startsWith("<template")) {
      findings.push({
        code: "standalone_composition_wrapped_in_template",
        severity: "error",
        message: "Root index.html is wrapped in a <template> tag. Only sub-compositions loaded via data-composition-src should use <template> wrappers. The runtime cannot play a standalone composition inside a template.",
        fixHint: "Remove the <template> wrapper. Use <!DOCTYPE html><html>...<div data-composition-id>...</div>...</html> instead."
      });
    }
    return findings;
  },
  // root_composition_missing_html_wrapper
  ({ rawSource, rootTag, options }) => {
    const findings = [];
    if (options.isSubComposition) return findings;
    const trimmed = rawSource.trimStart().toLowerCase();
    if (trimmed.startsWith("<template")) return findings;
    const hasDoctype = trimmed.startsWith("<!doctype") || trimmed.startsWith("<html");
    const hasComposition = rawSource.includes("data-composition-id");
    if (hasComposition && !hasDoctype) {
      findings.push({
        code: "root_composition_missing_html_wrapper",
        severity: "error",
        message: "Composition starts with a bare element instead of a proper HTML document. An index.html that contains data-composition-id but no <!DOCTYPE html>, <html>, or <body> is a fragment \u2014 browsers quirks-mode it, the preview server cannot load it, and the bundler will fail to inject runtime scripts.",
        fixHint: 'Wrap the composition in <!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>...</body></html>.',
        snippet: rootTag ? truncateSnippet(rootTag.raw) : void 0
      });
    }
    return findings;
  },
  // missing_data_no_timeline
  // The producer polls window.__timelines[id] for every composition id in the
  // rendered document. A timeline-free root or bare nested composition host
  // therefore spends the full 45-second readiness budget unless it explicitly
  // opts out with data-no-timeline.
  ({ rootTag, rootCompositionId, tags, scripts, rawSource, options }) => {
    if (!rootCompositionId || !rootTag) return [];
    if (/<script\b[^>]*\bsrc\s*=/i.test(rawSource)) return [];
    if (hasComputedTimelineRegistration(scripts)) return [];
    const registeredIds = new Set(
      scripts.flatMap((script) => extractTimelineRegistryKeys(stripJsComments(script.content)))
    );
    return tags.flatMap((tag) => {
      const compositionId = readDecodedAttr(tag.raw, "data-composition-id");
      if (!compositionId || registeredIds.has(compositionId)) return [];
      const isRoot = tag.index === rootTag.index;
      if (isRoot ? options.isSubComposition : isInsideInertTemplate(tag, tags)) return [];
      if (readDecodedAttr(tag.raw, "data-no-timeline") !== null || mountsSource(tag)) return [];
      return [missingTimelineFinding(tag, compositionId, isRoot)];
    });
  },
  // negative_z_index
  // An element at a negative z-index is silently absent from both `snapshot`
  // and `render`, while siblings differing only in the sign of z-index render
  // exactly (heygen-com/hyperframes#4366). lint, validate and render all exit 0
  // and report nothing, so the first suspicion falls on the author's own CSS.
  // NOT A RENDERER DEFECT -- ORDINARY CSS PAINTING ORDER, measured at 0.8.72.
  // The element is PAINTED; it is simply painted beneath something opaque. Remove
  // every opaque background above it and the same `z-index: -1` band renders at
  // full coverage, identically to the same band with `z-index` deleted. A negative-z
  // descendant paints at step 2 of its nearest stacking context -- above that
  // context root's own background, but below the context's positioned in-flow
  // content -- so a `position: relative` composition root with an opaque background
  // paints over it. That is the shape #4366 reports; nothing is dropped and the
  // renderer has no say in it.
  //
  // Kept as a warning because authors hit it and nothing explains why: the element
  // is in the DOM, laid out, and invisible. The message therefore names the CAUSE
  // and the remedy rather than implying the tool failed.
  //
  // THE CONDITION IS LOAD-BEARING AND THE MESSAGE STATES IT. The element is only
  // dropped when its nearest ancestor stacking context is the composition root,
  // which is the shape #4366 reports. Give any ancestor a stacking context and it
  // renders correctly: measured at 0.8.72 on ONE frame carrying the same
  // `z-index: -1` band under six triggers -- isolation:isolate, transform,
  // opacity below 1, filter, contain:paint, will-change -- all six PRESENT at full
  // coverage, against the no-stacking-context control ABSENT at zero coverage.
  // That is ordinary CSS painting order: a negative-z child paints above its
  // stacking context root's own background, so only the root case is hidden.
  //
  // This rule matches CSS TEXT and does not resolve the cascade, so it cannot know
  // whether an ancestor forms a stacking context and fires on both shapes. That is
  // why the message is CONDITIONAL rather than an assertion of absence: an
  // unconditional "silently dropped" is false for every isolated case, and a lint
  // message that overclaims is how authors learn to disregard the rule.
  ({ tags, styles }) => {
    const findings = [];
    for (const style of styles) {
      const content = stripCssComments(style.content);
      NEGATIVE_Z_INDEX.lastIndex = 0;
      let match;
      while ((match = NEGATIVE_Z_INDEX.exec(content)) !== null) {
        findings.push(negativeZIndexFinding(match, cssOwnerSelector(content, match.index)));
      }
    }
    for (const tag of tags) {
      const inline = readAttr(tag.raw, "style");
      if (!inline) continue;
      NEGATIVE_Z_INDEX.lastIndex = 0;
      const match = NEGATIVE_Z_INDEX.exec(inline);
      if (match) findings.push(negativeZIndexFinding(match, elementSelector(tag)));
    }
    return findings;
  },
  // requestanimationframe_in_composition
  ({ scripts, rawSource, options }) => {
    if (isRegistrySourceFile(options.filePath) || isRegistryInstalledFile(rawSource)) return [];
    const findings = [];
    for (const script of scripts) {
      const stripped = stripJsCode(script.content);
      if (/requestAnimationFrame\s*\(/.test(stripped)) {
        findings.push({
          code: "requestanimationframe_in_composition",
          severity: "error",
          message: "`requestAnimationFrame` runs on wall-clock time, not the GSAP timeline. It will not sync with frame capture and may cause flickering or missed frames during rendering.",
          fixHint: "Use GSAP tweens or onUpdate callbacks instead of requestAnimationFrame for animation logic.",
          snippet: truncateSnippet(script.content)
        });
      }
    }
    return findings;
  },
  // invalid_variable_values_json
  // Host elements (`[data-composition-src]`) carry per-instance values via
  // `data-variable-values`. The runtime swallows JSON errors silently and
  // falls back to declared defaults, which masks typos. This rule surfaces
  // the parse failure so authors notice before render time.
  // fallow-ignore-next-line complexity
  ({ tags }) => {
    const findings = [];
    for (const tag of tags) {
      const raw = readJsonAttr(tag.raw, "data-variable-values");
      if (!raw) continue;
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        const reason = err instanceof Error ? err.message : "unknown";
        findings.push({
          code: "invalid_variable_values_json",
          severity: "error",
          message: `data-variable-values is not valid JSON (${reason}).`,
          fixHint: `Wrap the attribute value in single quotes and the JSON keys/values in double quotes, e.g. data-variable-values='{"title":"Hello"}'.`,
          elementId: readAttr(tag.raw, "id") || void 0,
          snippet: truncateSnippet(tag.raw)
        });
        continue;
      }
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        findings.push({
          code: "invalid_variable_values_json",
          severity: "error",
          message: 'data-variable-values must be a JSON object keyed by variable id (e.g. {"title":"Hello"}).',
          fixHint: "Replace the value with a JSON object whose keys are variable ids declared in the sub-composition's data-composition-variables.",
          elementId: readAttr(tag.raw, "id") || void 0,
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  },
  // unknown_variable_binding
  // data-var-src / data-var-text bind an element to a declared variable id;
  // the runtime silently keeps the authored fallback when the id resolves to
  // nothing, so a typo'd binding is invisible until a customer's override
  // does nothing. Skipped for fragment files (no <html>): their values come
  // from a host's data-variable-values, which this file can't see.
  ({ tags }) => {
    const declared = declaredIdsForBindingCheck(tags);
    if (!declared) return [];
    const findings = [];
    for (const tag of tags) {
      for (const attr of ["data-var-src", "data-var-text"]) {
        const id = readAttr(tag.raw, attr)?.trim();
        if (!id || declared.has(id)) continue;
        findings.push({
          code: "unknown_variable_binding",
          severity: "warning",
          message: `<${tag.name}> binds ${attr}="${id}" but no variable "${id}" is declared in data-composition-variables \u2014 the binding will silently keep the authored fallback.`,
          fixHint: `Declare the variable on the composition root (<html>, or the [data-composition-id] root element for a template/fragment comp): data-composition-variables='[{"id":"${id}","type":"${attr === "data-var-src" ? "image" : "string"}","label":"${id}","default":"..."}]', or fix the binding id.`,
          elementId: readAttr(tag.raw, "id") || void 0,
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  },
  // invalid_composition_variables_declaration
  // The runtime parses `data-composition-variables` and silently returns []
  // on any structural problem. Surface JSON / shape failures so authors
  // catch them at lint time rather than wondering why their `getVariables()`
  // defaults aren't applied.
  // Checked on every element that declares: <html>, or the composition root.
  ({ tags }) => tags.filter((tag) => readJsonAttr(tag.raw, "data-composition-variables")).flatMap((tag) => variablesDeclarationFindings(tag, tags)),
  // html_dir_attribute_breaks_render — valid non-LTR dir values on
  // <html> renders correctly in preview/snapshot but produces a fully
  // blank/black video from render, with no other lint/validate/inspect
  // check catching it (output file size, far smaller than expected, is the
  // only tell). Confirmed independently by two separate reports, both
  // diagnosing the same exact trigger and the same fix: drop dir from
  // <html>, keep lang, and scope `direction: rtl` to individual
  // text-containing elements via CSS instead (text still bidi-shapes
  // correctly). Advisory-only — this does not attempt to fix the render
  // pipeline's own root cause (suspected to be a capture step that clips a
  // fixed top-left-origin screenshot region, which RTL layout can shift the
  // actual content away from), only surfaces the already-confirmed footgun
  // before someone hits it blind.
  ({ tags }) => {
    const htmlTag = findHtmlTag(tags);
    if (!htmlTag) return [];
    const dir = readAttr(htmlTag.raw, "dir");
    if (!dir) return [];
    const normalizedDir = dir.toLowerCase();
    if (normalizedDir !== "rtl" && normalizedDir !== "auto") return [];
    const scopedDirection = normalizedDir === "auto" ? 'dir="auto"' : `direction: ${normalizedDir}`;
    return [
      {
        code: "html_dir_attribute_breaks_render",
        severity: "error",
        message: `<html dir="${dir}"> renders correctly in preview/snapshot but produces a fully blank/black video from render \u2014 a confirmed, silent failure.`,
        fixHint: `Remove dir="${dir}" from <html>. Keep lang, and scope ${scopedDirection} to individual text-containing elements instead \u2014 text still shapes correctly via the browser's own bidi algorithm.`,
        snippet: truncateSnippet(htmlTag.raw)
      }
    ];
  },
  // subcomposition_blanks_before_host
  // Warns when a full-bleed sub-composition slot ends before the host composition
  // does, leaving the slot blank for the remainder (issue #1540). Scoped narrowly to
  // the high-signal shape — a sole/dominant external mount starting at ~0 — so it
  // stays silent on intentional short clips (an intro followed by other clips that
  // carry the timeline forward).
  // fallow-ignore-next-line complexity
  ({ tags, rootTag }) => {
    if (!rootTag) return [];
    const rootDuration = Number(readAttr(rootTag.raw, "data-duration"));
    if (!Number.isFinite(rootDuration) || rootDuration <= 0) return [];
    const EPSILON = 0.5;
    const START_TOLERANCE = 0.5;
    const round3 = (n) => Math.round(n * 1e3) / 1e3;
    const timed = tags.filter((tag) => tag.index !== rootTag.index && readAttr(tag.raw, "data-start") !== null).map((tag) => {
      const start = Number(readAttr(tag.raw, "data-start")) || 0;
      const dur = Number(readAttr(tag.raw, "data-duration"));
      const end = Number.isFinite(dur) && dur > 0 ? start + dur : Infinity;
      return { tag, start, end };
    });
    const tailCovered = (exceptIndex) => timed.some((t) => t.tag.index !== exceptIndex && t.end >= rootDuration - EPSILON);
    const findings = [];
    for (const t of timed) {
      if (readAttr(t.tag.raw, "data-composition-src") === null) continue;
      if (t.start > START_TOLERANCE) continue;
      if (!Number.isFinite(t.end)) continue;
      if (t.end >= rootDuration - EPSILON) continue;
      if (tailCovered(t.tag.index)) continue;
      const elementId = readAttr(t.tag.raw, "id") || void 0;
      const gap = round3(rootDuration - t.end);
      findings.push({
        code: "subcomposition_blanks_before_host",
        severity: "warning",
        message: `<${t.tag.name}${elementId ? ` id="${elementId}"` : ""}> sub-composition ends at ${round3(t.end)}s but the composition runs to ${round3(rootDuration)}s \u2014 its slot will be blank for ~${gap}s.`,
        elementId,
        fixHint: `data-duration is the slot's visible window. Set this sub-composition's data-duration to ${round3(rootDuration - t.start)} to fill the host window, or add another clip to cover the remaining ~${gap}s.`,
        snippet: truncateSnippet(t.tag.raw)
      });
    }
    return findings;
  },
  // subcomposition_root_styled_by_class
  // A sub-composition's <style> is scoped at render time to
  // `[data-composition-id="<id>"] <selector>` so scenes inlined into one document
  // can't leak styles into each other. A rule whose LEFTMOST selector is the ROOT
  // element's own class (e.g. `.frame { ... }` on the same element that carries
  // data-composition-id) therefore becomes a DESCENDANT selector that can never
  // match the SCOPED element itself. NOTE on the symptom: since #1886 the producer
  // preserves the authored root as a `data-hf-inner-root` wrapper INSIDE the scoped
  // element (regression fixture packages/producer/tests/sub-comp-class-selector),
  // so the class still matches as a descendant and the scene no longer renders
  // unstyled. This rule is now a consistency constraint, not a render-bug guard:
  // `#root` is the shape the registry blocks model and the one the scoper
  // special-cases. Style the root via `#root`
  // (the scoper special-cases the root id) and descendants via plain selectors,
  // like the registry blocks — the runtime already scopes each scene by id, so a
  // class namespace on the root is redundant.
  ({ rootTag, rootCompositionId, styles, options }) => {
    if (!options.isSubComposition) return [];
    if (isRegistrySourceFile(options.filePath)) return [];
    if (!rootTag || !rootCompositionId) return [];
    const rootClasses = (readAttr(rootTag.raw, "class") || "").split(/\s+/).filter(Boolean);
    if (rootClasses.length === 0) return [];
    const offenders = rootClassStyledSelectors(styles, rootClasses);
    if (offenders.length === 0) return [];
    const example = offenders.slice(0, 3).join(", ");
    return [
      {
        code: "subcomposition_root_styled_by_class",
        severity: "error",
        message: `Root element has class="${rootClasses.join(" ")}" and is styled by ${offenders.length} rule(s) keyed off that class (e.g. ${example}). At render, every sub-composition rule is scoped to [data-composition-id="${rootCompositionId}"] <selector>, so a selector whose leftmost part is the ROOT's own class becomes a descendant selector that cannot match the scoped element itself. Since #1886 the producer preserves the authored root as an inner wrapper, so this no longer renders the scene unstyled, but #root is the shape the scoper special-cases and the registry blocks model. Use it so preview, render, and Studio agree.`,
        selector: example,
        fixHint: `Give the root id="root" and style it with \`#root { ... }\` plus plain descendant selectors (\`.kicker\`, \`#hero\`) \u2014 the runtime already scopes each sub-composition by data-composition-id, so a class namespace on the root is redundant.`,
        snippet: truncateSnippet(rootTag.raw)
      }
    ];
  },
  // root_composition_missing_duration_source
  //
  // The render engine (packages/engine/src/services/frameCapture.ts) needs a
  // positive window.__hf.duration to know how many frames to capture. GSAP
  // timelines set this automatically. Non-GSAP runtimes (CSS, WAAPI, Lottie)
  // are now auto-inferred by the runtime too (see
  // packages/core/src/runtime/init.ts resolveAdapterDurationFloorSeconds and
  // the adapters' getInferredDurationSeconds) — so data-duration is optional
  // wherever the runtime can work it out on its own.
  //
  // This rule fires for cases where the total render length is not reliably
  // determinable without an explicit data-duration:
  //   - No GSAP timeline AND no data-duration AND no non-GSAP animation
  //     signal at all (nothing for any adapter to discover — render fails).
  //   - Three.js used with no data-duration (no discoverable AnimationClip
  //     duration in this codebase's adapter — see adapters/three.ts).
  //   - Any infinite CSS animation-iteration-count with no data-duration,
  //     EVEN when a finite CSS animation is present alongside it. An unbounded
  //     animation makes the intended total length ambiguous — the runtime will
  //     infer a finite sibling's length if one exists, but that's a fallback,
  //     not a declaration of intent, so we still require data-duration here.
  //     (This is intentionally stricter than the runtime's own inference.)
  // Purely finite CSS/WAAPI animations and Lottie are excluded — the runtime
  // infers those unambiguously, so requiring data-duration there would be a
  // false positive against the runtime's own auto-inference. Note lint is
  // advisory by default (see shouldBlockRender) — it only blocks render under
  // --strict/--strict-all — so a strict flag here nudges toward an explicit,
  // guaranteed-correct value without failing renders that would succeed.
  // fallow-ignore-next-line complexity
  ({ rootTag, scripts, styles, tags, options }) => {
    if (options.isSubComposition) return [];
    if (!rootTag) return [];
    if (readDecodedAttr(rootTag.raw, "data-composition-id") === null) return [];
    if (readAttr(rootTag.raw, "data-duration") !== null) return [];
    const allScriptTexts = scripts.map((s) => stripJsComments(s.content));
    const hasGsapTimeline = allScriptTexts.some((t) => /gsap\.timeline\s*\(/.test(t));
    const hasRegisteredTimeline = allScriptTexts.some(
      (t) => WINDOW_TIMELINE_ASSIGN_PATTERN.test(t)
    );
    if (hasGsapTimeline && hasRegisteredTimeline) return [];
    const allCss = styles.map((s) => s.content).join("\n");
    const allInlineStyles = tags.map((t) => readAttr(t.raw, "style") || "").join("\n");
    const combinedCss = `${allCss}
${allInlineStyles}`.replace(/\/\*[\s\S]*?\*\//g, "");
    const usesLottie = tags.some((t) => readAttr(t.raw, "data-lottie-src") !== null) || allScriptTexts.some((t) => /lottie\.(loadAnimation)\b|__hfLottie\b/.test(t));
    const usesThree = allScriptTexts.some((t) => /\bTHREE\./.test(t));
    const usesWaapi = allScriptTexts.some((t) => /\.animate\s*\(\s*[[{$A-Za-z_]/.test(t));
    const hasCssAnimationName = /\banimation(?:-name)?\s*:/.test(combinedCss);
    const hasInfiniteCssAnimation = /\banimation(?:-iteration-count)?\s*:[^;{}]*(?<![\w-])infinite(?![\w-])/.test(combinedCss);
    const hasAnyNonGsapSignal = usesLottie || usesThree || usesWaapi || hasCssAnimationName;
    if (!hasAnyNonGsapSignal) {
      const derived = deriveDurationFromClips(tags, rootTag);
      if (derived.source === "derived") {
        return [
          {
            code: "root_composition_duration_derived",
            severity: "warning",
            message: `Root composition has no data-duration and no GSAP timeline, so its length is taken from its clips: at least ${derived.seconds}s` + (derived.pendingClips > 0 ? `, and ${derived.pendingClips} clip(s) whose length is only known at runtime` : "") + ".",
            fixHint: 'Add data-duration="<seconds>" to the root element to set the length yourself.',
            snippet: truncateSnippet(rootTag.raw)
          }
        ];
      }
      return [
        {
          code: "root_composition_missing_duration_source",
          severity: "error",
          message: 'Root composition has no data-duration, no GSAP timeline, and no CSS/WAAPI/Lottie/Three.js animation for the runtime to infer a duration from. The render engine cannot determine how long to capture and will fail with "Composition has zero duration".',
          fixHint: 'Add data-duration="<seconds>" to the root element, or add a paused GSAP timeline registered on window.__timelines.',
          snippet: truncateSnippet(rootTag.raw)
        }
      ];
    }
    if (usesThree) {
      return [
        {
          code: "root_composition_missing_duration_source",
          severity: "error",
          message: `Root composition uses Three.js with no data-duration. The runtime cannot discover a Three.js scene's duration automatically (no AnimationClip/AnimationMixer inspection) \u2014 render will fail with "Composition has zero duration".`,
          fixHint: 'Add data-duration="<seconds>" to the root element.',
          snippet: truncateSnippet(rootTag.raw)
        }
      ];
    }
    if (hasInfiniteCssAnimation && !usesLottie && !usesWaapi) {
      return [
        {
          code: "root_composition_missing_duration_source",
          severity: "error",
          message: 'Root composition uses a CSS animation with animation-iteration-count: infinite and no data-duration, so the intended total length is ambiguous. If a finite animation is also present the runtime infers that length; with no finite source the render fails with "Composition has zero duration". Declare the intended length explicitly.',
          fixHint: 'Add data-duration="<seconds>" to the root element with the intended total length.',
          snippet: truncateSnippet(rootTag.raw)
        }
      ];
    }
    return [];
  },
  // composition_heavy_overlay_count_high
  // Field signal ts=1784040753 (#hyperframes-cli-feedback): a composition
  // with ~40 heavy overlay DOM elements — `filter:blur`, oversized
  // `radial-gradient`, and `clip-path` animations — captures solid-black for
  // the first ~half of the render, recovering near the end. Reproduces
  // identically via drawElement AND forced --no-browser-gpu screenshot
  // capture AND `snapshot`, so the offender is the capture layer itself, not
  // encoder/mux. Independent of duration (padding the timeline grows the bad
  // zone proportionally, doesn't shift it). Reporter's workaround was to
  // split into per-transition mini compositions + FFmpeg concat.
  //
  // Presence alone matters: opacity:0 and visibility:hidden overlays still
  // contribute to the capture-layer regression, so they're counted-in. The
  // only escape hatch is `display: none` — an element removed from the render
  // tree can't feed the compositor. Warn at 25, well below the observed
  // 40-element repro, to give authors lead time before hitting the bug.
  // fallow-ignore-next-line complexity
  ({ tags, styles, rawSource, options }) => {
    if (isRegistrySourceFile(options.filePath) || isRegistryInstalledFile(rawSource)) return [];
    const { classes: heavyClassTokens, ids: heavyIds } = collectHeavyOverlayHooks(styles);
    let heavyCount = 0;
    for (const tag of tags) {
      if (HEAVY_OVERLAY_EXEMPT_TAGS.has(tag.name)) continue;
      if (isCompositionRootOrMount(tag.raw)) continue;
      const styleAttr = readJsonAttr(tag.raw, "style") ?? "";
      if (styleAttr && INLINE_STYLE_DISPLAY_NONE_PATTERN.test(styleAttr)) continue;
      let heavy = false;
      if (styleAttr && HEAVY_OVERLAY_CSS_PATTERN.test(styleAttr)) heavy = true;
      if (!heavy && (heavyClassTokens.size > 0 || heavyIds.size > 0)) {
        const classList = (readAttr(tag.raw, "class") || "").split(/\s+/).filter(Boolean);
        if (classList.some((cls) => heavyClassTokens.has(cls))) heavy = true;
        if (!heavy) {
          const idValue = readAttr(tag.raw, "id");
          if (idValue && heavyIds.has(idValue)) heavy = true;
        }
      }
      if (heavy) heavyCount += 1;
    }
    if (heavyCount < HEAVY_OVERLAY_ELEMENT_COUNT_WARN) return [];
    const splitTarget = options.isSubComposition ? "Split this sub-composition further into per-transition mini-compositions" : "Split coherent scenes / transitions into separate .html files under compositions/";
    return [
      {
        code: "composition_heavy_overlay_count_high",
        severity: "warning",
        message: `This composition has ${heavyCount} elements carrying "heavy overlay" CSS (filter:blur, radial-gradient, or clip-path). Field signal: a composition with ~40 such elements \u2014 including opacity:0 / visibility:hidden ones \u2014 captures solid-black for the first ~half of the render, recovering near the end. Reproduces identically via drawElement, forced screenshot capture, and snapshot, so the capture layer itself is the offender (not encoder/mux). Independent of duration. Presence alone matters; only display:none elements are excluded here.`,
        fixHint: `${splitTarget} and concat the pieces (FFmpeg or the runtime's slideshow) so each capture only sees a small subset of heavy overlays at once. Even hidden overlays (opacity:0 / visibility:hidden) contribute \u2014 either remove truly unused ones from the source or scope them into their own per-transition sub-composition. If an overlay is genuinely inert for the whole clip, use display:none so it never enters the render tree. Field ref ts=1784040753 (#hyperframes-cli-feedback).`
      }
    ];
  },
  // root_zoom_rescales_a_fixed_canvas
  //
  // The capture frame is sized from the root's data-width/data-height, which are
  // LAYOUT pixels. CSS `zoom` on the canvas itself (the root, or html/body above
  // it) rescales the painted content inside that frame without changing the frame,
  // so the two disagree and the author gets neither of the two things they might
  // have meant.
  //
  // Measured at 0.8.71 on an 800x400 composition holding two 100x100 boxes at
  // left:100 and left:600, rendered to a PNG sequence and the boxes located by
  // colour:
  //
  //   root zoom:0.5  canvas stays 800x400; boxes paint at (50,25) and (300,25),
  //                  each 50x50 -- the composition occupies the top-left quarter
  //                  and the rest of every frame is dead space.
  //   root zoom:2    canvas stays 800x400; the left:100 box paints at (200,100)
  //                  at 200x200, and the left:600 box renders ZERO PIXELS --
  //                  scaled to x=1200, outside a frame that is still 800 wide.
  //
  // The second case is the one worth an error: content that is inside the declared
  // composition silently does not exist in the output, with nothing else in lint,
  // check or the render log naming it.
  //
  // Deliberately NOT flagged: `zoom` on a descendant. Measured in the same run --
  // a child at left:100 with zoom:2 paints at (200,100) at 200x200, which is
  // exactly what CSS `zoom` specifies. It is honoured, not ignored, so a rule that
  // fired on every `zoom` would be flagging correct authoring.
  ({ rootTag, tags, styles }) => {
    if (!rootTag) return [];
    const rootId = readAttr(rootTag.raw, "id");
    const rootClasses = (readAttr(rootTag.raw, "class") || "").split(/\s+/).filter(Boolean);
    const hits = canvasZoomHits(rootTag, tags, styles, rootId, rootClasses);
    const hit = hits[0];
    if (!hit) return [];
    const enlarging = !hit.value.startsWith("-") && parseFloat(hit.value) > (hit.value.includes("%") ? 100 : 1);
    return [
      {
        code: "root_zoom_rescales_a_fixed_canvas",
        severity: "error",
        message: `\`zoom: ${hit.value}\` on ${hit.where} rescales the painted composition inside a frame that does not rescale with it. The capture frame is sized from the root's data-width/data-height in LAYOUT pixels, and \`zoom\` changes only what is painted inside it, so ` + (enlarging ? `content past the frame's edge renders zero pixels \u2014 it is inside the declared composition and absent from the output, with nothing else reporting it.` : `the composition paints into part of the frame and the remainder of every output frame is dead space.`),
        fixHint: `Author the composition at its real size \u2014 set data-width/data-height (and the root's width/height) to the dimensions you want \u2014 and drop the canvas-level \`zoom\`. To scale the OUTPUT without changing layout, pass \`--output-resolution\` to render, which supersamples. \`zoom\` on descendants is fine and is not flagged: it is honoured exactly as specified.`,
        snippet: hit.snippet
      }
    ];
  },
  // composition_exceeds_inspection_viewport_cap
  //
  // packages/cli/src/utils/compositionViewport.ts caps a parsed data-width /
  // data-height at MAX_VIEWPORT_DIMENSION (4096) with a plain Math.min and no
  // warning. captureCompositionFrame resolves its viewport through that helper,
  // and check, validate, snapshot, compare and layout all capture through it;
  // layout and motionShot carry their own independent Math.min(..., 4096).
  //
  // `render` does NOT go through it, and that asymmetry is the whole finding.
  // Measured at 0.8.71 on a 5000x400 composition with 100x100 boxes at left:100
  // and left:4500:
  //
  //   render    -> 5000x400 output, both boxes present.
  //   snapshot  -> 4096x400 frame, the left:4500 box ABSENT.
  //
  // So the video is correct and the tools an author would reach for to check it
  // silently cannot see the last 904 px. The failure direction is the awkward
  // one: `check` comes back clean on a region it never rendered, and someone
  // debugging a missing element through `snapshot` chases a difference that
  // exists only in the instrument.
  //
  // A warning, not an error: the deliverable is fine, and a composition wider
  // than 4096 can be entirely deliberate.
  ({ rootTag }) => {
    if (!rootTag) return [];
    const over = [];
    for (const attr of ["data-width", "data-height"]) {
      const raw = readAttr(rootTag.raw, attr);
      if (!raw) continue;
      const value = Number.parseInt(raw, 10);
      if (Number.isFinite(value) && value > INSPECTION_VIEWPORT_CAP) {
        over.push(`${attr}=${value}`);
      }
    }
    if (over.length === 0) return [];
    return [
      {
        code: "composition_exceeds_inspection_viewport_cap",
        severity: "warning",
        message: `${over.join(" and ")} exceeds the ${INSPECTION_VIEWPORT_CAP}px viewport cap that check, validate, snapshot, compare and layout clamp to. render is unaffected and produces the full size, so the video is correct \u2014 but every inspection command captures a ${INSPECTION_VIEWPORT_CAP}px-wide frame, and anything beyond that is missing from what they report. Measured at 0.8.71: a 5000x400 composition renders 5000x400 with all content, while snapshot returns 4096x400 with the element at left:4500 absent.`,
        fixHint: `Keep the authored size if the output needs it, and verify the region past ${INSPECTION_VIEWPORT_CAP}px from a render rather than from check/snapshot/compare \u2014 a clean inspection result does not cover it. If the large canvas is only there to gain resolution, author at the layout size and pass \`--output-resolution\` to render instead, which supersamples without changing layout.`,
        snippet: truncateSnippet(rootTag.raw)
      }
    ];
  }
];
var CLIP_MEDIA_TAGS = /* @__PURE__ */ new Set(["img", "video", "audio"]);
function deriveDurationFromClips(tags, rootTag) {
  const clipEnds = [];
  for (const tag of tags) {
    if (tag === rootTag) continue;
    const startRaw = readAttr(tag.raw, "data-start");
    if (startRaw === null) continue;
    const start = Number(startRaw);
    if (!Number.isFinite(start)) {
      clipEnds.push(null);
      continue;
    }
    const getAttr = (name) => readAttr(tag.raw, name);
    const authored = readAuthoredDurationSeconds(getAttr, start);
    if (CLIP_MEDIA_TAGS.has(tag.name)) {
      const { seconds } = resolveMediaDuration({
        tag: tag.name,
        authoredDurationSeconds: authored,
        sourceDurationSeconds: null,
        mediaStartSeconds: 0,
        playbackRate: 1
      });
      clipEnds.push(seconds === null ? null : start + seconds);
    } else if (authored !== null && authored > 0) {
      clipEnds.push(start + authored);
    }
  }
  return resolveCompositionDuration({ authoredDurationSeconds: null, clipEndsSeconds: clipEnds });
}
async function loadParseGsapScript() {
  const mod = await import("./gsapParserAcorn-O4Z43OYN.js");
  return mod.parseGsapScriptAcorn;
}
async function loadGsapScriptMotionPathFirstUseIndex() {
  const mod = await import("./gsapParserAcorn-O4Z43OYN.js");
  return mod.gsapScriptMotionPathFirstUseIndex;
}
var SCENE_BOUNDARY_EPSILON_SECONDS = 0.05;
var UNRESOLVED_TARGET = "__unresolved__";
function targetHasNoStableIdentity(selector, identity) {
  if (identity) return false;
  return selector === UNRESOLVED_TARGET || selector === "dwell/hold" || selector.startsWith("proxy \u2192 ");
}
function unwrapRaw(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return void 0;
  const code = value.startsWith("__raw:") ? value.slice(6) : value;
  return code.replace(/^\s*["']|["']\s*$/g, "");
}
function extrasNumber(value) {
  const unwrapped = unwrapRaw(value);
  const numeric = typeof unwrapped === "number" ? unwrapped : Number(unwrapped);
  return Number.isFinite(numeric) ? numeric : 0;
}
function synthesizeWindowRaw(timelineVar, anim) {
  const entries = Object.entries(anim.properties).map(([k, v]) => {
    if (typeof v === "string" && v.startsWith("__raw:")) return `${k}: ${v.slice(6)}`;
    return `${k}: ${typeof v === "string" ? JSON.stringify(v) : v}`;
  });
  if (anim.duration !== void 0) entries.push(`duration: ${anim.duration}`);
  if (anim.ease) entries.push(`ease: ${JSON.stringify(anim.ease)}`);
  const pos = typeof anim.position === "number" ? anim.position : JSON.stringify(anim.position);
  return `${timelineVar}.${anim.method}("${anim.targetSelector}", { ${entries.join(", ")} }, ${pos})`;
}
var gsapWindowsCache = /* @__PURE__ */ new Map();
async function cachedExtractGsapWindows(scriptContent) {
  const cached = gsapWindowsCache.get(scriptContent);
  if (cached) return cached;
  const windows = await extractGsapWindows(scriptContent);
  gsapWindowsCache.set(scriptContent, windows);
  return windows;
}
async function extractGsapWindows(script) {
  if (!/gsap\.timeline/.test(script)) return [];
  const parseGsapScript = await loadParseGsapScript();
  const parsed = parseGsapScript(script);
  if (parsed.animations.length === 0) return [];
  const windows = [];
  for (const animation of parsed.animations) {
    const start = animation.resolvedStart ?? (typeof animation.position === "number" ? animation.position : null);
    if (start === null) continue;
    const repeat = extrasNumber(animation.extras?.repeat);
    const infiniteRepeat = repeat < 0;
    const cycleCount = infiniteRepeat ? 1 : repeat > 0 ? repeat + 1 : 1;
    const effectiveDuration = animation.method === "set" ? 0 : (animation.duration ?? 0) * cycleCount;
    const immediateRender = unwrapRaw(animation.extras?.immediateRender);
    windows.push({
      targetSelector: animation.targetSelector,
      targetIdentity: animation.targetIdentity,
      position: start,
      end: infiniteRepeat && animation.method !== "set" ? Number.POSITIVE_INFINITY : start + effectiveDuration,
      properties: Object.keys(animation.properties),
      propertyValues: animation.properties,
      fromPropertyValues: animation.fromProperties,
      overwriteAuto: unwrapRaw(animation.extras?.overwrite) === "auto",
      immediateRender: immediateRender === "true" ? true : immediateRender === "false" ? false : void 0,
      method: animation.method,
      global: animation.global,
      raw: synthesizeWindowRaw(parsed.timelineVar, animation)
    });
  }
  return windows;
}
function numberValue(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim()) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }
  return null;
}
function stringValue(value) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return null;
}
function zeroValue(value) {
  if (typeof value === "number") return value === 0;
  if (typeof value !== "string") return false;
  return Number(value.trim()) === 0;
}
function isGsapColorProperty(property) {
  const normalized2 = property.toLowerCase();
  return !normalized2.startsWith("--") && (normalized2.endsWith("color") || normalized2 === "fill" || normalized2 === "stroke");
}
function collectStaticCssVariableDefinitions(tags, styles) {
  const definitions = /* @__PURE__ */ new Set();
  const sources = [
    ...styles.map((style) => style.content),
    ...tags.map((tag) => readDecodedAttr(tag.raw, "style") ?? "")
  ];
  const definitionPattern = /(?:^|[;{])\s*(--[A-Za-z0-9_-]+)\s*:/gm;
  for (const source of sources) {
    const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, " ");
    for (const match of withoutComments.matchAll(definitionPattern)) {
      if (match[1]) definitions.add(match[1]);
    }
  }
  for (const id of collectAllDeclaredVariableIds(tags) ?? []) definitions.add(`--${id}`);
  return definitions;
}
function cssVariableReferencesWithoutFallback(value) {
  const text = unwrapRaw(value);
  if (typeof text !== "string") return [];
  const variables = [];
  for (const match of text.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*(,)?/g)) {
    if (match[1] && !match[2]) variables.push(match[1]);
  }
  return variables;
}
function isHiddenGsapState(values) {
  const visibility = stringValue(values.visibility)?.toLowerCase();
  const display = stringValue(values.display)?.toLowerCase();
  return zeroValue(values.opacity) || zeroValue(values.autoAlpha) || visibility === "hidden" || display === "none";
}
function hiddenSetTargetSelectors(target, aliases) {
  const parts = target.startsWith("[") && target.endsWith("]") ? target.slice(1, -1).split(",") : [target];
  return parts.flatMap((part) => {
    const trimmed = part.trim();
    const resolved = /^(["'`])([^"'`]+)\1$/.exec(trimmed)?.[2] ?? aliases.get(trimmed);
    return resolved === void 0 ? [] : resolved.split(",");
  }).map((selector) => selector.trim()).filter((selector) => selector.length > 0);
}
function extractStandaloneHiddenSelectors(script) {
  const selectors = /* @__PURE__ */ new Set();
  const source = stripJsComments(script);
  const functionRanges = collectFunctionBodyRanges(source);
  const aliases = /* @__PURE__ */ new Map();
  for (const match2 of source.matchAll(
    /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(["'`])([^"'`]+)\2\s*;/g
  )) {
    aliases.set(match2[1] ?? "", match2[3] ?? "");
  }
  const pattern = /gsap\.set\s*\(\s*(\[[^[\]]*\]|"[^"]*"|'[^']*'|`[^`]*`|[^,()[\]]+?)\s*,\s*\{([\s\S]*?)\}\s*\)/g;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    if (indexInsideNonIifeRange(match.index, source, functionRanges)) continue;
    const targets = hiddenSetTargetSelectors((match[1] ?? "").trim(), aliases);
    if (targets.length === 0) continue;
    const body = match[2] ?? "";
    if (/(?:opacity|autoAlpha)\s*:\s*0(?:\.0+)?\s*(?:,|$)/.test(body)) {
      for (const selector of targets) selectors.add(selector);
    }
  }
  return selectors;
}
function oneValue(values, keys) {
  for (const key of keys) {
    const value = values[key];
    if (value !== void 0) return value;
  }
  return void 0;
}
function isVisibleGsapState(values) {
  const opacity = oneValue(values, ["opacity", "autoAlpha"]);
  if (typeof opacity === "number") return opacity > 0;
  if (typeof opacity === "string" && opacity.trim()) {
    const numeric = Number(opacity);
    if (Number.isFinite(numeric)) return numeric > 0;
  }
  const visibility = stringValue(values.visibility)?.toLowerCase();
  if (visibility === "visible" || visibility === "inherit") return true;
  const display = stringValue(values.display)?.toLowerCase();
  if (display && display !== "none") return true;
  return false;
}
function makesOverlayVisible(win) {
  if (win.method === "from" && isHiddenGsapState(win.propertyValues)) return true;
  return isVisibleGsapState(win.propertyValues);
}
function findTagEnd(source, tag) {
  const escapedTagName = tag.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<\\/?${escapedTagName}\\b[^>]*>`, "gi");
  pattern.lastIndex = tag.index;
  let depth = 0;
  let match;
  while ((match = pattern.exec(source)) !== null) {
    const raw = match[0];
    const isClosing = /^<\s*\//.test(raw);
    const isSelfClosing = /\/\s*>$/.test(raw);
    if (!isClosing && !isSelfClosing) depth += 1;
    if (isClosing) depth -= 1;
    if (depth === 0) return pattern.lastIndex;
  }
  return source.length;
}
function getClipTagClasses(tag) {
  const classAttr = readAttr(tag.raw, "class") || "";
  const classes = classAttr.split(/\s+/).filter(Boolean);
  return classes.includes("clip") ? { classAttr, classes } : null;
}
function readStyleProperty(style, property) {
  const escapedProperty = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = style.match(new RegExp(`(?:^|;)\\s*${escapedProperty}\\s*:\\s*([^;]+)`, "i"));
  return match?.[1]?.trim() || null;
}
function cssZero(value) {
  if (!value) return false;
  return /^0(?:\.0+)?(?:px|%|vw|vh|rem|em)?$/i.test(value.trim());
}
function styleHasHiddenInitialState(style) {
  const opacity = readStyleProperty(style, "opacity");
  if (opacity && Number(opacity) === 0) return true;
  if (readStyleProperty(style, "visibility")?.toLowerCase() === "hidden") return true;
  if (readStyleProperty(style, "display")?.toLowerCase() === "none") return true;
  return false;
}
function styleHasOpaqueBackground(style) {
  const background = readStyleProperty(style, "background") || readStyleProperty(style, "background-color");
  if (!background) return false;
  const normalized2 = background.toLowerCase().replace(/\s+/g, "");
  if (normalized2 === "transparent" || normalized2 === "none") return false;
  if (/rgba?\([^)]*,0(?:\.0+)?\)$/.test(normalized2)) return false;
  if (/hsla?\([^)]*,0(?:\.0+)?\)$/.test(normalized2)) return false;
  return true;
}
function styleLooksFullFrameOverlay(style) {
  const position = readStyleProperty(style, "position")?.toLowerCase();
  if (position !== "fixed" && position !== "absolute") return false;
  const coversFrame = cssZero(readStyleProperty(style, "inset")) || cssZero(readStyleProperty(style, "top")) && cssZero(readStyleProperty(style, "right")) && cssZero(readStyleProperty(style, "bottom")) && cssZero(readStyleProperty(style, "left"));
  return coversFrame && styleHasOpaqueBackground(style);
}
function collectSimpleStyleRules(styles) {
  const rules = /* @__PURE__ */ new Map();
  for (const style of styles) {
    for (const [, selectorList, body] of style.content.matchAll(/([^{}]+)\{([^}]+)\}/g)) {
      if (!selectorList || !body) continue;
      for (const selector of selectorList.split(",")) {
        const token = selector.trim();
        if (!/^[#.][A-Za-z0-9_-]+$/.test(token)) continue;
        rules.set(token, `${rules.get(token) || ""};${body}`);
      }
    }
  }
  return rules;
}
function tagSimpleSelectors(tag) {
  const selectors = [];
  const id = readAttr(tag.raw, "id");
  if (id) selectors.push(`#${id}`);
  const classes = readAttr(tag.raw, "class")?.split(/\s+/).filter(Boolean) ?? [];
  for (const className of classes) selectors.push(`.${className}`);
  return selectors;
}
function combinedTagStyle(tag, styleRules) {
  const styles = [readAttr(tag.raw, "style") || ""];
  for (const selector of tagSimpleSelectors(tag)) {
    const ruleStyle = styleRules.get(selector);
    if (ruleStyle) styles.push(ruleStyle);
  }
  return styles.filter(Boolean).join(";");
}
function cssTransformToGsapProps(cssTransform) {
  const parts = [];
  const translateMatch = cssTransform.match(
    /translate\(\s*(-?[\d.]+)(%|px)?\s*,\s*(-?[\d.]+)(%|px)?\s*\)/
  );
  if (translateMatch) {
    const [, xVal, xUnit, yVal, yUnit] = translateMatch;
    if (xUnit === "%") parts.push(`xPercent: ${xVal}`);
    else parts.push(`x: ${xVal}`);
    if (yUnit === "%") parts.push(`yPercent: ${yVal}`);
    else parts.push(`y: ${yVal}`);
  }
  const txMatch = cssTransform.match(/translateX\(\s*(-?[\d.]+)(%|px)?\s*\)/);
  if (txMatch) {
    const [, val, unit] = txMatch;
    parts.push(unit === "%" ? `xPercent: ${val}` : `x: ${val}`);
  }
  const tyMatch = cssTransform.match(/translateY\(\s*(-?[\d.]+)(%|px)?\s*\)/);
  if (tyMatch) {
    const [, val, unit] = tyMatch;
    parts.push(unit === "%" ? `yPercent: ${val}` : `y: ${val}`);
  }
  const scaleMatch = cssTransform.match(/scale\(\s*([\d.]+)\s*\)/);
  if (scaleMatch) {
    parts.push(`scale: ${scaleMatch[1]}`);
  }
  return parts.length > 0 ? parts.join(", ") : null;
}
var CONFLICTING_TRANSLATE_PROPS = ["x", "y", "xPercent", "yPercent"];
var CONFLICTING_SCALE_PROPS = ["scale", "scaleX", "scaleY"];
function targetedSelectorTokens(selector) {
  const tokens = /* @__PURE__ */ new Set();
  for (const group of selector.split(",")) {
    const compounds = group.trim().split(/[\s>+~]+/).filter(Boolean);
    const last = compounds[compounds.length - 1];
    if (!last) continue;
    const simple2 = last.match(/[#.][A-Za-z0-9_-]+/g);
    if (simple2) for (const token of simple2) tokens.add(token);
  }
  return tokens;
}
function matchCssTransform(gsapSelector, cssMap) {
  if (cssMap.size === 0) return void 0;
  const direct = cssMap.get(gsapSelector);
  if (direct) return direct;
  const tokens = targetedSelectorTokens(gsapSelector);
  for (const [cssSelector, value] of cssMap) {
    if (tokens.has(cssSelector)) return value;
  }
  return void 0;
}
function extractStandaloneGsapTransformCalls(script) {
  const calls = [];
  const pattern = /gsap\.(set|to|from|fromTo)\s*\(\s*(["'])([^"']+)\2\s*,\s*\{([^{}]*)\}/g;
  let match;
  while ((match = pattern.exec(script)) !== null) {
    const method = match[1] ?? "set";
    const selector = match[3] ?? "";
    const propsBody = match[4] ?? "";
    const properties = [...propsBody.matchAll(/([A-Za-z_$][\w$]*)\s*:/g)].map((m) => m[1] ?? "");
    calls.push({ method, selector, properties, raw: truncateSnippet(match[0]) ?? match[0] });
  }
  return calls;
}
function scanScriptsForRegexMatches(scripts, pattern, options) {
  const hits = [];
  for (const script of scripts) {
    const content = options.stripComments ? stripJsComments(script.content) : script.content;
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(content)) !== null) {
      const contextStart = Math.max(0, match.index - options.contextBefore);
      const contextEnd = Math.min(
        content.length,
        match.index + match[0].length + options.contextAfter
      );
      hits.push({ match, snippet: content.slice(contextStart, contextEnd), script });
    }
  }
  return hits;
}
var RELATIVE_TWEEN_VALUE = /^[+-]=/;
function isRelativeTweenValue(value) {
  return typeof value === "string" && RELATIVE_TWEEN_VALUE.test(value.trim());
}
var TRANSFORM_SENSITIVE_READ = /\.getBoundingClientRect\s*\(|\bgetComputedStyle\s*\(|\bgsap\.getProperty\s*\(/;
var TRANSFORM_INVARIANT_READ = /\.(?:getTotalLength|getBBox)\s*\(|\.(?:offsetWidth|offsetHeight|clientWidth|clientHeight)\b/;
var CALLBACK_MEASUREMENT_PATTERN = /\.(?:getBoundingClientRect|getTotalLength|getBBox)\s*\(|\bgetComputedStyle\s*\(|\.(?:offsetWidth|offsetHeight|clientWidth|clientHeight)\b/;
function indexTagsByToken(tags) {
  const tagsByToken = /* @__PURE__ */ new Map();
  const addToken = (token, tag) => {
    const list = tagsByToken.get(token);
    if (list) list.push(tag);
    else tagsByToken.set(token, [tag]);
  };
  for (const tag of tags) {
    const id = readAttr(tag.raw, "id");
    if (id) addToken(`#${id}`, tag);
    for (const cls of readAttr(tag.raw, "class")?.split(/\s+/).filter(Boolean) ?? [])
      addToken(`.${cls}`, tag);
  }
  return tagsByToken;
}
function resolveSelectorTagIndexes(selector, tagsByToken) {
  const indexes = /* @__PURE__ */ new Set();
  for (const token of targetedSelectorTokens(selector)) {
    for (const tag of tagsByToken.get(token) ?? []) indexes.add(tag.index);
  }
  return indexes;
}
function selectorResolvesFaithfully(selector) {
  return selector.split(",").every((group) => {
    const token = group.trim();
    if (!token || token.includes("[")) return false;
    return !/[\s>+~]/.test(token);
  });
}
function targetsShareElement(a, b, tagsByToken) {
  if (!targetHasNoStableIdentity(a.selector, a.identity) && !targetHasNoStableIdentity(b.selector, b.identity) && (a.identity ?? a.selector) === (b.identity ?? b.selector)) {
    return true;
  }
  if (!selectorResolvesFaithfully(a.selector) || !selectorResolvesFaithfully(b.selector)) {
    return false;
  }
  const aTags = resolveSelectorTagIndexes(a.selector, tagsByToken);
  if (aTags.size === 0) return false;
  const bTags = resolveSelectorTagIndexes(b.selector, tagsByToken);
  for (const index of bTags) if (aTags.has(index)) return true;
  return false;
}
function matchBalanced(source, openIndex, open, close) {
  let depth = 0;
  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return source.slice(openIndex, i + 1);
    }
  }
  return null;
}
function enclosingObjectLiteral(source, index) {
  let depth = 0;
  for (let i = index; i >= 0; i--) {
    const ch = source[i];
    if (ch === "}") depth++;
    else if (ch === "{") {
      if (depth === 0) return matchBalanced(source, i, "{", "}");
      depth--;
    }
  }
  return null;
}
function objectLiteralHasTopLevelRelativeValue(objectLiteral) {
  let depth = 0;
  let inString = null;
  for (let i = 0; i < objectLiteral.length; i++) {
    const ch = objectLiteral[i] ?? "";
    const prev = objectLiteral[i - 1] ?? "";
    if (inString) {
      if (ch === inString && prev !== "\\") inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      if (depth === 1 && /^[+-]=/.test(objectLiteral.slice(i + 1))) return true;
      continue;
    }
    if (ch === "{" || ch === "(" || ch === "[") depth++;
    else if (ch === "}" || ch === ")" || ch === "]") depth--;
  }
  return false;
}
function isInsideGsapTweenVars(source, index, timelineVars) {
  let depth = 0;
  for (let i = index; i >= 0; i--) {
    const ch = source[i];
    if (ch === "}") depth++;
    else if (ch === "{") {
      if (depth === 0) {
        const before = source.slice(Math.max(0, i - 240), i).replace(/\s+/g, " ");
        const receivers = ["gsap", ...timelineVars].map(escapeRegExp2).join("|");
        return new RegExp(`(?:${receivers})\\.(?:set|to|from|fromTo|timeline)\\b[\\s\\S]*$`).test(
          before
        );
      }
      depth--;
    }
  }
  return false;
}
function sliceExpression(source, start) {
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    const ch = source[i] ?? "";
    if ("({[".includes(ch)) depth++;
    else if (")}]".includes(ch)) {
      if (depth === 0) return source.slice(start, i);
      depth--;
    } else if (ch === "," && depth === 0) return source.slice(start, i);
  }
  return source.slice(start);
}
function normalizeFirstParam(raw) {
  let param = raw.trim().replace(/=.*$/, "").trim();
  param = param.replace(/\s*:\s*[\w$|<>,\s[\].]+$/, "").trim();
  if (!param || /^[[{]/.test(param)) return null;
  if (!/^[A-Za-z_$][\w$]*$/.test(param)) return null;
  return param;
}
function parseFunctionValueSource(code) {
  const src = code.trim();
  const match = src.match(/^(?:async\s+)?function\s*[\w$]*\s*\(([^)]*)\)/) ?? src.match(/^(?:async\s*)?\(([^)]*)\)\s*=>/) ?? src.match(/^(?:async\s*)?([A-Za-z_$][\w$]*)\s*=>/);
  if (!match) return null;
  const firstParam = normalizeFirstParam((match[1] ?? "").split(",")[0] ?? "");
  return { firstParam, body: src.slice(match[0].length) };
}
function escapeRegExp2(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var NUMBER_METHODS = /* @__PURE__ */ new Set([
  "toFixed",
  "toString",
  "toPrecision",
  "toExponential",
  "toLocaleString",
  "valueOf"
]);
function firstParamMemberAccessHazard(fn) {
  if (!fn.firstParam) return null;
  const pattern = new RegExp(
    `\\b${escapeRegExp2(fn.firstParam)}\\s*\\.\\s*([A-Za-z_$][\\w$]*)`,
    "g"
  );
  let match;
  while ((match = pattern.exec(fn.body)) !== null) {
    const member = match[1] ?? "";
    const after = fn.body.slice(match.index + match[0].length);
    const isCall = /^\s*\(/.test(after);
    if (isCall && NUMBER_METHODS.has(member)) continue;
    return member;
  }
  return null;
}
function collectTimelineVarNames(source) {
  return [...source.matchAll(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*gsap\.timeline\b/g)].map((m) => m[1] ?? "").filter(Boolean);
}
function collectNamedFunctionBodies(source) {
  const bodies = /* @__PURE__ */ new Map();
  const declPattern = /(?:^|[^.\w$])function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  let match;
  while ((match = declPattern.exec(source)) !== null) {
    const braceIndex = source.indexOf("{", declPattern.lastIndex);
    if (braceIndex < 0) continue;
    const body = matchBalanced(source, braceIndex, "{", "}");
    if (body) bodies.set(match[1] ?? "", body);
  }
  const assignPattern = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function\b[^{]*|\([^)]*\)\s*=>\s*|[A-Za-z_$][\w$]*\s*=>\s*)/g;
  while ((match = assignPattern.exec(source)) !== null) {
    const bodyStart = assignPattern.lastIndex;
    const body = source[bodyStart] === "{" ? matchBalanced(source, bodyStart, "{", "}") : sliceExpression(source, bodyStart);
    if (body) bodies.set(match[1] ?? "", body);
  }
  return bodies;
}
function collectMeasuringFunctionNames(bodies) {
  const measuring = /* @__PURE__ */ new Set();
  for (const [name, body] of bodies) {
    if (CALLBACK_MEASUREMENT_PATTERN.test(body)) measuring.add(name);
  }
  for (let pass = 0; pass < 3; pass++) {
    let grew = false;
    for (const [name, body] of bodies) {
      if (measuring.has(name)) continue;
      for (const measured of measuring) {
        if (new RegExp(`\\b${escapeRegExp2(measured)}\\s*\\(`).test(body)) {
          measuring.add(name);
          grew = true;
          break;
        }
      }
    }
    if (!grew) break;
  }
  return measuring;
}
function expressionReachesMeasurement(expression, measuring) {
  if (CALLBACK_MEASUREMENT_PATTERN.test(expression)) return true;
  for (const name of measuring) {
    if (new RegExp(`\\b${escapeRegExp2(name)}\\b`).test(expression)) return true;
  }
  return false;
}
function resolveScriptElementTokens(source, tags) {
  const documentIds = tags.map((tag) => readAttr(tag.raw, "id")).filter((id) => id !== null);
  const tokensByVar = /* @__PURE__ */ new Map();
  const add = (name, token) => {
    const tokens = tokensByVar.get(name) ?? /* @__PURE__ */ new Set();
    tokens.add(token);
    tokensByVar.set(name, tokens);
  };
  for (const match of source.matchAll(
    /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*document\.getElementById\(\s*(["'])([^"'`]+)\2/g
  )) {
    add(match[1] ?? "", `#${match[3] ?? ""}`);
  }
  for (const match of source.matchAll(
    /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*document\.getElementById\(\s*`([^`]*)`/g
  )) {
    const template = match[2] ?? "";
    const staticParts = template.split(/\$\{[^}]*\}/);
    if (staticParts.every((part) => part === "")) continue;
    const idPattern = new RegExp(`^${staticParts.map(escapeRegExp2).join(".*")}$`);
    for (const id of documentIds) {
      if (idPattern.test(id)) add(match[1] ?? "", `#${id}`);
    }
  }
  for (const match of source.matchAll(
    /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*document\.querySelector\(\s*(["'])([^"'`]+)\2/g
  )) {
    for (const token of targetedSelectorTokens(match[3] ?? "")) add(match[1] ?? "", token);
  }
  for (const match of source.matchAll(
    /\b([A-Za-z_$][\w$]*)\.setAttribute\(\s*(["'])class\2\s*,\s*(["'])([^"'`]*)\3/g
  )) {
    for (const cls of (match[4] ?? "").split(/\s+/).filter(Boolean)) add(match[1] ?? "", `.${cls}`);
  }
  for (const match of source.matchAll(/\b([A-Za-z_$][\w$]*)\.className\s*=\s*(["'])([^"'`]*)\2/g)) {
    for (const cls of (match[3] ?? "").split(/\s+/).filter(Boolean)) add(match[1] ?? "", `.${cls}`);
  }
  return tokensByVar;
}
function elementLevelTokens(tokens, tagsByToken) {
  const expanded = new Set(tokens);
  for (const token of [...expanded]) {
    for (const tag of tagsByToken.get(token) ?? []) {
      for (const own of tagSimpleSelectors(tag)) expanded.add(own);
    }
  }
  return expanded;
}
function isMultiComponentDasharray(value) {
  const normalized2 = value.replace(/!important\s*$/i, "").trim();
  if (!normalized2 || /^none$/i.test(normalized2)) return false;
  return normalized2.split(/[\s,]+/).filter(Boolean).length >= 2;
}
function gsapDasharrayValueLooksMultiComponent(valueSource) {
  const literal = valueSource.trim().match(/^(["'`])([\s\S]*)\1$/)?.[2];
  if (literal === void 0) return false;
  return isMultiComponentDasharray(literal.replace(/\$\{[^}]*\}/g, "0"));
}
function collectFunctionBodyRanges(source) {
  const ranges = [];
  const openerPatterns = [/\bfunction\b[^{;()]*\([^)]*\)\s*\{/g, /=>\s*\{/g];
  for (const pattern of openerPatterns) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const braceIndex = match.index + match[0].length - 1;
      const body = matchBalanced(source, braceIndex, "{", "}");
      if (body) ranges.push({ start: braceIndex, end: braceIndex + body.length });
    }
  }
  return ranges;
}
function indexInsideAnyRange(index, ranges) {
  return ranges.some((range) => index > range.start && index < range.end);
}
function isIifeBody(source, range) {
  let j = range.end;
  while (j < source.length && /\s/.test(source[j])) j++;
  if (source[j] !== ")") return false;
  j++;
  while (j < source.length && /\s/.test(source[j])) j++;
  return source[j] === "(" || source.startsWith(".call", j) || source.startsWith(".apply", j);
}
function indexInsideNonIifeRange(index, source, ranges) {
  return ranges.some(
    (range) => index > range.start && index < range.end && !isIifeBody(source, range)
  );
}
function collectCssOpacityZeroSelectors(styles, tags) {
  const selectors = /* @__PURE__ */ new Set();
  const opacityExactlyZero = /opacity\s*:\s*0(?:\.0+)?\s*(?:;|$)/;
  for (const style of styles) {
    for (const [, selector, body] of style.content.matchAll(
      /([#.][a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g
    )) {
      if (body && opacityExactlyZero.test(body)) {
        selectors.add((selector ?? "").trim());
      }
    }
  }
  for (const tag of tags) {
    const inlineStyle = readAttr(tag.raw, "style");
    if (!inlineStyle || !opacityExactlyZero.test(inlineStyle)) continue;
    const id = readAttr(tag.raw, "id");
    if (id) selectors.add(`#${id}`);
    for (const cls of readAttr(tag.raw, "class")?.split(/\s+/).filter(Boolean) ?? []) {
      selectors.add(`.${cls}`);
    }
  }
  return selectors;
}
var gsapRules = [
  // gsap_undefined_css_variable
  async ({ tags, styles, scripts }) => {
    const definedVariables = collectStaticCssVariableDefinitions(tags, styles);
    const findings = [];
    const reported = /* @__PURE__ */ new Set();
    for (const script of scripts) {
      for (const win of await cachedExtractGsapWindows(script.content)) {
        for (const values of [win.fromPropertyValues, win.propertyValues]) {
          for (const [property, value] of Object.entries(values ?? {})) {
            if (!isGsapColorProperty(property)) continue;
            for (const variable of cssVariableReferencesWithoutFallback(value)) {
              if (definedVariables.has(variable)) continue;
              const key = `${win.targetSelector}|${property}|${variable}`;
              if (reported.has(key)) continue;
              reported.add(key);
              findings.push({
                code: "gsap_undefined_css_variable",
                severity: "warning",
                message: `GSAP ${property} on "${win.targetSelector}" uses ${variable}, but no static CSS or composition-variable declaration defines it. The computed color may become invalid or transparent.`,
                selector: win.targetSelector,
                fixHint: `Define ${variable} in applicable CSS, declare "${variable.slice(2)}" in data-composition-variables, or add a var() fallback such as var(${variable}, #fff).`,
                snippet: truncateSnippet(win.raw)
              });
            }
          }
        }
      }
    }
    return findings;
  },
  // overlapping_gsap_tweens + gsap_animates_clip_element
  // fallow-ignore-next-line complexity
  async ({ tags, scripts, styles }) => {
    const findings = [];
    const authoredHiddenSelectors = new Set(
      scripts.flatMap((script) => [...extractStandaloneHiddenSelectors(script.content)])
    );
    const clipIds = /* @__PURE__ */ new Map();
    const clipClasses = /* @__PURE__ */ new Map();
    for (const tag of tags) {
      const clipTag = getClipTagClasses(tag);
      if (!clipTag) continue;
      const id = readAttr(tag.raw, "id");
      const info = {
        tag: tag.name,
        id: id || "",
        classes: clipTag.classAttr
      };
      if (id) clipIds.set(`#${id}`, info);
      for (const cls of clipTag.classes) {
        if (cls !== "clip") clipClasses.set(`.${cls}`, info);
      }
    }
    const styleRules = collectSimpleStyleRules(styles);
    const reportedVisibleOverlayKeys = /* @__PURE__ */ new Set();
    for (const script of scripts) {
      const gsapWindows = await cachedExtractGsapWindows(script.content);
      for (let i = 0; i < gsapWindows.length; i++) {
        const left = gsapWindows[i];
        if (!left) continue;
        if (left.end <= left.position) continue;
        if (targetHasNoStableIdentity(left.targetSelector, left.targetIdentity)) continue;
        for (let j = i + 1; j < gsapWindows.length; j++) {
          const right = gsapWindows[j];
          if (!right) continue;
          if (right.end <= right.position) continue;
          const leftIdentity = left.targetIdentity ?? left.targetSelector;
          const rightIdentity = right.targetIdentity ?? right.targetSelector;
          if (leftIdentity !== rightIdentity) continue;
          const overlapStart = Math.max(left.position, right.position);
          const overlapEnd = Math.min(left.end, right.end);
          if (overlapEnd <= overlapStart) continue;
          if (left.overwriteAuto || right.overwriteAuto) continue;
          const sharedProperties = left.properties.filter(
            (prop) => right.properties.includes(prop)
          );
          if (sharedProperties.length === 0) continue;
          findings.push({
            code: "overlapping_gsap_tweens",
            severity: "warning",
            message: `GSAP tweens overlap on "${left.targetSelector}" for ${sharedProperties.join(", ")} between ${overlapStart.toFixed(2)}s and ${overlapEnd.toFixed(2)}s.`,
            selector: left.targetSelector,
            fixHint: 'Shorten the earlier tween, move the later tween, or add `overwrite: "auto"`.',
            snippet: truncateSnippet(`${left.raw}
${right.raw}`)
          });
        }
      }
      const fromToWindowsBySelector = /* @__PURE__ */ new Map();
      for (const win of gsapWindows) {
        if (win.method !== "fromTo" || win.immediateRender === false) continue;
        if (win.targetSelector === UNRESOLVED_TARGET) continue;
        const windows = fromToWindowsBySelector.get(win.targetSelector) ?? [];
        windows.push(win);
        fromToWindowsBySelector.set(win.targetSelector, windows);
      }
      const repeatedFromToGroups = [...fromToWindowsBySelector.values()].filter(
        (windows) => windows.length >= 2
      );
      for (const fromToWindows of repeatedFromToGroups) {
        const firstFromTo = fromToWindows[0];
        if (!firstFromTo) continue;
        const selector = firstFromTo.targetSelector;
        const firstFromToIndex = gsapWindows.indexOf(firstFromTo);
        const firstFromToPosition = Math.min(...fromToWindows.map((win) => win.position));
        const hasTimelineBaseline = gsapWindows.slice(0, firstFromToIndex).some(
          (candidate) => candidate.method === "set" && !candidate.global && candidate.targetSelector === selector && candidate.position <= firstFromToPosition
        );
        if (hasTimelineBaseline) continue;
        findings.push({
          code: "gsap_repeated_fromto_without_baseline",
          severity: "warning",
          message: `${fromToWindows.length} tl.fromTo() calls target "${selector}" with no stable baseline. The last-authored fromTo "from" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.`,
          selector,
          fixHint: `Add \`immediateRender: false\` to every fromTo except the earliest-positioned one (at ${firstFromToPosition}s), so pre-first-tween seeks keep its "from" values. A hiding \`tl.set(..., 0)\` baseline trips gsap_timeline_set_initial_hide, and a \`gsap.set\` authored before the fromTo calls is overwritten by them.`,
          snippet: truncateSnippet(fromToWindows.map((win) => win.raw).join("\n"))
        });
      }
      for (const tag of tags) {
        const selectors = tagSimpleSelectors(tag);
        if (selectors.length === 0) continue;
        const overlayKey = readAttr(tag.raw, "id") || String(tag.index);
        if (reportedVisibleOverlayKeys.has(overlayKey)) continue;
        const authoredStyle = combinedTagStyle(tag, styleRules);
        if (!authoredStyle || !styleLooksFullFrameOverlay(authoredStyle)) continue;
        if (styleHasHiddenInitialState(authoredStyle)) continue;
        const visibilityWindows = gsapWindows.filter((win) => {
          const tokens = targetedSelectorTokens(win.targetSelector);
          if (!selectors.some((selector2) => tokens.has(selector2))) return false;
          return win.properties.some(
            (prop) => ["opacity", "autoAlpha", "visibility", "display"].includes(prop)
          );
        }).sort((a, b) => a.position - b.position);
        const startsHiddenAtZero = visibilityWindows.some(
          (win) => win.position <= SCENE_BOUNDARY_EPSILON_SECONDS && (isHiddenGsapState(win.propertyValues) || win.fromPropertyValues !== void 0 && isHiddenGsapState(win.fromPropertyValues))
        );
        if (startsHiddenAtZero) continue;
        if (selectors.some((selector2) => authoredHiddenSelectors.has(selector2))) continue;
        const firstVisible = visibilityWindows.find((win) => makesOverlayVisible(win));
        if (!firstVisible) continue;
        const selector = selectors.find(
          (candidate) => targetedSelectorTokens(firstVisible.targetSelector).has(candidate)
        ) || selectors[0] || tag.name;
        const laterHidden = visibilityWindows.some(
          (win) => win !== firstVisible && win.method !== "from" && win.position >= firstVisible.position && isHiddenGsapState(win.propertyValues)
        );
        if (!laterHidden) continue;
        reportedVisibleOverlayKeys.add(overlayKey);
        findings.push({
          code: "gsap_fullscreen_overlay_starts_visible",
          severity: "error",
          message: `Full-frame overlay "${selector}" starts visible before its first GSAP opacity tween at ${firstVisible.position.toFixed(2)}s. It will cover earlier render frames, often as a blank/white video.`,
          selector,
          elementId: readAttr(tag.raw, "id") || void 0,
          // gsap_timeline_set_initial_hide warns on `tl.set(..., 0)` initial hides
          // (a zero-duration set at 0 does not render at exactly t=0), so this hint
          // must not recommend that pattern — advise authored CSS or an immediate
          // gsap.set() instead, keeping the two rules' advice consistent.
          fixHint: `Add \`opacity: 0\` to "${selector}" in CSS/inline styles, or add an immediate \`gsap.set("${selector}", { opacity: 0 })\` (outside the timeline) before the reveal tween.`,
          snippet: truncateSnippet(firstVisible.raw)
        });
      }
      for (const win of gsapWindows) {
        const sel = win.targetSelector;
        const clipInfo = clipIds.get(sel) || clipClasses.get(sel);
        if (!clipInfo) continue;
        const conflictingProps = win.properties.filter(
          (p) => p === "visibility" || p === "display" || p === "autoAlpha"
        );
        if (conflictingProps.length === 0) continue;
        const elDesc = `<${clipInfo.tag}${clipInfo.id ? ` id="${clipInfo.id}"` : ""} class="${clipInfo.classes}">`;
        findings.push({
          code: "gsap_animates_clip_element",
          severity: "error",
          message: `GSAP animation sets ${conflictingProps.join(", ")} on a clip element. Selector "${sel}" resolves to element ${elDesc}. The framework manages clip visibility, and autoAlpha writes visibility as well as opacity \u2014 do not animate these properties on clip elements.`,
          selector: sel,
          elementId: clipInfo.id || void 0,
          fixHint: "Remove the visibility/display/autoAlpha tween, or move the content into a child <div> and target that instead.",
          snippet: truncateSnippet(win.raw)
        });
      }
    }
    return findings;
  },
  // gsap_css_transform_conflict
  // fallow-ignore-next-line complexity
  async ({ styles, scripts, tags }) => {
    const findings = [];
    const cssTranslateSelectors = /* @__PURE__ */ new Map();
    const cssScaleSelectors = /* @__PURE__ */ new Map();
    for (const style of styles) {
      for (const [, selector, body] of style.content.matchAll(
        /([#.][a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g
      )) {
        const tMatch = body?.match(/transform\s*:\s*([^;]+)/);
        if (!tMatch || !tMatch[1]) continue;
        const transformVal = tMatch[1].trim();
        if (/translate/i.test(transformVal))
          cssTranslateSelectors.set((selector ?? "").trim(), transformVal);
        if (/scale/i.test(transformVal))
          cssScaleSelectors.set((selector ?? "").trim(), transformVal);
      }
    }
    for (const tag of tags) {
      const inlineStyle = readAttr(tag.raw, "style");
      if (!inlineStyle) continue;
      const tMatch = inlineStyle.match(/transform\s*:\s*([^;]+)/);
      if (!tMatch || !tMatch[1]) continue;
      const transformVal = tMatch[1].trim();
      const id = readAttr(tag.raw, "id");
      const classes = readAttr(tag.raw, "class")?.split(/\s+/).filter(Boolean) ?? [];
      const selectors = [];
      if (id) selectors.push(`#${id}`);
      for (const cls of classes) selectors.push(`.${cls}`);
      if (selectors.length === 0) continue;
      for (const sel of selectors) {
        if (/translate/i.test(transformVal) && !cssTranslateSelectors.has(sel))
          cssTranslateSelectors.set(sel, transformVal);
        if (/scale/i.test(transformVal) && !cssScaleSelectors.has(sel))
          cssScaleSelectors.set(sel, transformVal);
      }
    }
    if (cssTranslateSelectors.size === 0 && cssScaleSelectors.size === 0) return findings;
    for (const script of scripts) {
      if (!/gsap\.timeline/.test(script.content)) continue;
      const windows = await cachedExtractGsapWindows(script.content);
      const calls = [
        ...windows.map((win) => ({
          method: win.method,
          selector: win.targetSelector,
          properties: win.properties,
          raw: win.raw
        })),
        ...extractStandaloneGsapTransformCalls(stripJsComments(script.content))
      ];
      const conflicts = /* @__PURE__ */ new Map();
      for (const call of calls) {
        if (call.method === "fromTo" || call.method === "from") continue;
        const sel = call.selector;
        const translateProps = call.properties.filter(
          (p) => CONFLICTING_TRANSLATE_PROPS.includes(p)
        );
        const scaleProps = call.properties.filter((p) => CONFLICTING_SCALE_PROPS.includes(p));
        const cssFromTranslate = translateProps.length > 0 ? matchCssTransform(sel, cssTranslateSelectors) : void 0;
        const cssFromScale = scaleProps.length > 0 ? matchCssTransform(sel, cssScaleSelectors) : void 0;
        if (!cssFromTranslate && !cssFromScale) continue;
        const existing = conflicts.get(sel) ?? {
          cssTransform: [...new Set([cssFromTranslate, cssFromScale].filter(Boolean))].join(" "),
          props: /* @__PURE__ */ new Set(),
          raw: call.raw
        };
        for (const p of [...translateProps, ...scaleProps]) existing.props.add(p);
        conflicts.set(sel, existing);
      }
      for (const [sel, { cssTransform, props, raw }] of conflicts) {
        const propList = [...props].join("/");
        const gsapEquivalent = cssTransformToGsapProps(cssTransform);
        const fixHint = gsapEquivalent ? `Remove \`transform: ${cssTransform}\` from CSS and replace with GSAP properties: ${gsapEquivalent}. Example: tl.fromTo('${sel}', { ${gsapEquivalent} }, { ${gsapEquivalent}, ...yourAnimation }). tl.fromTo is exempt from this rule.` : `Remove the transform from CSS and use tl.fromTo('${sel}', { xPercent: -50, x: -1000 }, { xPercent: -50, x: 0 }) so GSAP owns the full transform state. tl.fromTo is exempt from this rule.`;
        findings.push({
          code: "gsap_css_transform_conflict",
          severity: "error",
          message: `"${sel}" has CSS \`transform: ${cssTransform}\` and a GSAP tween animates ${propList}. GSAP will overwrite the full CSS transform, discarding any translateX(-50%) centering or CSS scale value.`,
          selector: sel,
          fixHint,
          snippet: truncateSnippet(raw)
        });
      }
    }
    return findings;
  },
  // missing_gsap_script
  ({ scripts, rawSource, options }) => {
    const allScriptTexts = scripts.filter((s) => !/\bsrc\s*=/.test(s.attrs)).map((s) => s.content);
    const allScriptSrcs = scripts.map((s) => readAttr(`<script ${s.attrs}>`, "src") || "").filter(Boolean);
    const canInheritGsapFromHost = options.isSubComposition || rawSource.trimStart().toLowerCase().startsWith("<template");
    const usesGsap = allScriptTexts.some(
      (t) => /gsap\.(to|from|fromTo|timeline|set|registerPlugin)\b/.test(t)
    );
    const hasGsapScript = allScriptSrcs.some((src) => /gsap/i.test(src));
    const hasInlineGsap = allScriptTexts.some(
      (t) => /\/\*\s*inlined:.*gsap/i.test(t) || /\b_gsScope\b/.test(t) || /\bGreenSock\b/.test(t) || /\bgsap\.(config|defaults|version)\b/.test(t) || t.length > 5e3 && /\bgsap\b/i.test(t)
    );
    if (!usesGsap || hasGsapScript || hasInlineGsap || canInheritGsapFromHost) return [];
    return [
      {
        code: "missing_gsap_script",
        severity: "error",
        message: "Composition uses GSAP but no GSAP script is loaded. The animation will not run.",
        fixHint: 'Add <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script> before your animation script.'
      }
    ];
  },
  // missing_gsap_plugin
  async ({ scripts, rawSource, options }) => {
    const canInheritPluginFromHost = options.isSubComposition || rawSource.trimStart().toLowerCase().startsWith("<template");
    if (canInheritPluginFromHost) return [];
    const gsapScriptMotionPathFirstUseIndex = await loadGsapScriptMotionPathFirstUseIndex();
    const motionPathUseIndices = scripts.map(
      (script) => gsapScriptMotionPathFirstUseIndex(script.content)
    );
    const firstMotionPathScriptIndex = motionPathUseIndices.findIndex((index) => index !== null);
    const firstMotionPathUseIndex = motionPathUseIndices[firstMotionPathScriptIndex] ?? null;
    const firstUseScript = scripts[firstMotionPathScriptIndex];
    const executionMode = (attrs) => {
      const tag = `<script ${attrs}>`;
      const isModule = (readDecodedAttr(tag, "type") ?? "").toLowerCase() === "module";
      const hasSrc = readDecodedAttr(tag, "src") !== null;
      const hasAsync = readDecodedAttr(tag, "async") !== null;
      const hasDefer = readDecodedAttr(tag, "defer") !== null;
      if ((isModule || hasSrc) && hasAsync) return "async";
      if (isModule) return "module";
      if (hasSrc && hasDefer) return "defer";
      return "blocking";
    };
    const firstUseMode = firstUseScript ? executionMode(firstUseScript.attrs) : "blocking";
    const hasMotionPathPlugin = scripts.slice(0, firstMotionPathScriptIndex + 1).some((script, candidateIndex) => {
      const candidateMode = executionMode(script.attrs);
      const sameScript = candidateIndex === firstMotionPathScriptIndex;
      const candidateIsPostParse = candidateMode === "defer" || candidateMode === "module";
      const firstUseIsPostParse = firstUseMode === "defer" || firstUseMode === "module";
      const executesBeforeFirstUse = sameScript || candidateMode === "blocking" || candidateIsPostParse && firstUseIsPostParse;
      if (!executesBeforeFirstUse || !sameScript && candidateMode === "async") return false;
      const src = readAttr(`<script ${script.attrs}>`, "src") ?? "";
      const uncommented = stripJsComments(script.content);
      const hasStaticImport = /\bimport\s+(?:[\s\S]*?\sfrom\s*)?["'][^"']*\bMotionPathPlugin\b[^"']*["']/.test(
        uncommented
      ) || /\bimport\s+(?:[\w$]+\s*,\s*)?\{[^}]*\bMotionPathPlugin\b[^}]*\}\s+from\s*["'][^"']+["']/.test(
        uncommented
      ) || /\bimport\s+MotionPathPlugin\s+from\s*["'][^"']+["']/.test(uncommented);
      const inlinedMarkerIndex = script.content.search(/\/\*\s*inlined:.*MotionPathPlugin/i);
      const definitionIndex = uncommented.search(
        /\b(?:const|let|var|class|function)\s+MotionPathPlugin\b/
      );
      if (sameScript) {
        if (hasStaticImport) return true;
        if (firstMotionPathUseIndex === null) return false;
        return inlinedMarkerIndex >= 0 && inlinedMarkerIndex < firstMotionPathUseIndex || definitionIndex >= 0 && definitionIndex < firstMotionPathUseIndex;
      }
      return /MotionPathPlugin/i.test(src) || hasStaticImport || inlinedMarkerIndex >= 0 || definitionIndex >= 0;
    });
    if (firstMotionPathScriptIndex < 0 || hasMotionPathPlugin) return [];
    return [
      {
        code: "missing_gsap_plugin",
        severity: "error",
        message: "A GSAP tween uses motionPath, but MotionPathPlugin is not loaded. Core GSAP ignores this plugin-specific property, so the intended motion will not render.",
        fixHint: "Load MotionPathPlugin before the animation script and register it with gsap.registerPlugin(MotionPathPlugin), or replace motionPath with core GSAP x/y tweens."
      }
    ];
  },
  // audio_reactive_single_tween_per_group
  // fallow-ignore-next-line complexity
  ({ scripts, styles }) => {
    const findings = [];
    if (!hasCaptionStyles(styles)) return findings;
    for (const script of scripts) {
      const content = script.content;
      const hasAudioData = /AUDIO|audio[-_]?data|bands\[/.test(content);
      if (!hasAudioData) continue;
      const hasCaptionLoop = /forEach/.test(content) && /caption|group|cg-/.test(content);
      if (!hasCaptionLoop) continue;
      const hasInnerSamplingLoop = /for\s*\(\s*var\s+\w+\s*=\s*group\.start/.test(content) || /for\s*\(\s*var\s+at\s*=/.test(content) || /while\s*\(\s*\w+\s*<\s*group\.end/.test(content);
      if (!hasInnerSamplingLoop) {
        const hasPeakTween = /peak(?:Bass|Treble|Energy)/.test(content) && /group\.start/.test(content);
        if (hasPeakTween) {
          findings.push({
            code: "audio_reactive_single_tween_per_group",
            severity: "warning",
            message: "Audio-reactive captions use a single tween per group based on peak values. This sets one static value at group.start \u2014 not perceptible as audio reactivity.",
            fixHint: "Sample audio data at 100-200ms intervals throughout each group's lifetime (for loop from group.start to group.end) and create a tween at each sample point for visible pulsing."
          });
        }
      }
    }
    return findings;
  },
  // gsap_infinite_repeat
  ({ scripts, rootTag, locate }) => {
    const findings = [];
    const declaredDuration = Number.parseFloat(
      rootTag ? readAttr(rootTag.raw, "data-duration") ?? "" : ""
    );
    const hasFiniteCompositionWindow = Number.isFinite(declaredDuration) && declaredDuration > 0;
    const pattern = /repeat\s*:\s*-1(?!\d)/g;
    for (const { snippet, match, script } of scanScriptsForRegexMatches(scripts, pattern, {
      stripComments: true,
      contextBefore: 60,
      contextAfter: 60
    })) {
      findings.push({
        ...locate(script, containingCallOffset(script, match.index)),
        code: "gsap_infinite_repeat",
        severity: hasFiniteCompositionWindow ? "warning" : "error",
        message: hasFiniteCompositionWindow ? `GSAP tween uses \`repeat: -1\` (infinite), but the composition declares a finite ${declaredDuration}s window. HyperFrames clips deterministic seeking and export to that explicit duration.` : "GSAP tween uses `repeat: -1` (infinite) without a finite composition `data-duration`. The timeline can report an unbounded duration and make render planning fail.",
        fixHint: hasFiniteCompositionWindow ? "Keep the explicit finite composition `data-duration`. Use a finite repeat count only when the loop itself must end before the composition does." : "Add a finite composition `data-duration`, or replace `repeat: -1` with `repeat: Math.max(0, Math.floor(totalDuration / singleCycleDuration) - 1)`.",
        snippet: truncateSnippet(snippet)
      });
    }
    return findings;
  },
  // gsap_repeat_ceil_overshoot
  ({ scripts, locate }) => {
    const findings = [];
    const pattern = /repeat\s*:\s*Math\.ceil\s*\([^)]+\)\s*-\s*1/g;
    for (const { snippet, match, script } of scanScriptsForRegexMatches(scripts, pattern, {
      stripComments: false,
      contextBefore: 40,
      contextAfter: 40
    })) {
      findings.push({
        ...locate(script, containingCallOffset(script, match.index)),
        code: "gsap_repeat_ceil_overshoot",
        severity: "warning",
        message: "GSAP repeat calculation uses `Math.ceil` which can overshoot the composition duration. For example, Math.ceil(10.5 / 2) - 1 = 5 repeats \u2192 6 cycles \xD7 2s = 12s, exceeding 10.5s.",
        fixHint: "Use `Math.floor` instead of `Math.ceil` to ensure the animation fits within the duration: `repeat: Math.max(0, Math.floor(totalDuration / cycleDuration) - 1)`. Math.floor(10.5 / 2) - 1 = 4 repeats \u2192 5 cycles \xD7 2s = 10s \u2713",
        snippet: truncateSnippet(snippet)
      });
    }
    return findings;
  },
  // gsap_repeat_floor_unclamped
  ({ scripts, locate }) => {
    const findings = [];
    const pattern = /repeat\s*:\s*Math\.floor\s*\([^)]+\)\s*-\s*1/g;
    for (const { snippet, match, script } of scanScriptsForRegexMatches(scripts, pattern, {
      stripComments: false,
      contextBefore: 40,
      contextAfter: 40
    })) {
      findings.push({
        ...locate(script, containingCallOffset(script, match.index)),
        code: "gsap_repeat_floor_unclamped",
        severity: "warning",
        message: "GSAP repeat calculation can evaluate to -1 when the composition is shorter than one cycle, which GSAP interprets as an infinite repeat.",
        fixHint: "Clamp the finite repeat count at zero: `repeat: Math.max(0, Math.floor(totalDuration / cycleDuration) - 1)`.",
        snippet: truncateSnippet(snippet)
      });
    }
    return findings;
  },
  // gsap_timeline_not_registered
  ({ scripts, rawSource, options, locate }) => {
    const findings = [];
    const canInheritFromHost = options.isSubComposition || rawSource.trimStart().toLowerCase().startsWith("<template");
    for (const script of scripts) {
      const content = script.content;
      if (!/gsap\.timeline/.test(content)) continue;
      const hasRegistration = WINDOW_TIMELINE_ASSIGN_PATTERN.test(content) || TIMELINE_REGISTRY_OBJECT_LITERAL_PATTERN.test(content);
      if (hasRegistration || canInheritFromHost) continue;
      findings.push({
        ...locate(script, gsapCallOffset(script, "timeline")),
        code: "gsap_timeline_not_registered",
        severity: "error",
        message: "GSAP timeline is created but never registered in window.__timelines. The runtime discovers timelines from this registry \u2014 without registration, animations will not play during preview or render.",
        fixHint: 'Add `window.__timelines = window.__timelines || {};` and `window.__timelines["root"] = tl;` after creating the timeline (use the composition\'s data-composition-id as the key).'
      });
    }
    return findings;
  },
  // gsap_timeline_registered_before_async_build — registering window.__timelines[id]
  // BEFORE the timeline is built inside document.fonts.ready (or any async callback)
  // leaves an EMPTY timeline registered. The runtime's sub-composition readiness gate
  // treats "key present" as "ready" and nests the child ONCE, while still empty — so the
  // animation never renders when this composition is mounted as a sub-composition.
  // Register only AFTER the build completes (the documented async-setup contract).
  ({ scripts }) => {
    const findings = [];
    for (const script of scripts) {
      const content = stripJsComments(script.content);
      const regIdx = content.search(/window\s*\.\s*__timelines\s*\[/);
      if (regIdx < 0) continue;
      const fontsReadyIdx = content.search(/document\s*\.\s*fonts\s*\.\s*ready/);
      if (fontsReadyIdx < 0) continue;
      if (regIdx >= fontsReadyIdx) continue;
      const tail = content.slice(fontsReadyIdx);
      if (!/\.(?:to|from|fromTo)\s*\(|buildEffect\s*\(/.test(tail)) continue;
      findings.push({
        code: "gsap_timeline_registered_before_async_build",
        severity: "error",
        message: 'window.__timelines is assigned BEFORE the timeline is built inside document.fonts.ready. An empty timeline registered early gets nested empty when this composition is used as a sub-composition (the readiness gate treats "key present" as "ready" and never re-nests), so the animation renders blank.',
        fixHint: "Move the `window.__timelines[id] = tl;` assignment to the END of the document.fonts.ready callback, after the tweens are added. Optionally call window.__hfForceTimelineRebind() right after, to re-nest the populated timeline."
      });
    }
    return findings;
  },
  // CSS/GSAP-hidden reveal safety. A fromTo() whose from-vars make an element
  // visible but whose destination omits opacity works during sequential seeks,
  // yet cold render workers restore the authored hidden state and encode it
  // permanently invisible.
  // fallow-ignore-next-line complexity
  async ({ styles, scripts, tags }) => {
    const findings = [];
    const cssOpacityZeroSelectors = collectCssOpacityZeroSelectors(styles, tags);
    for (const script of scripts) {
      if (!/gsap\.timeline/.test(script.content)) continue;
      const windows = await cachedExtractGsapWindows(script.content);
      const hiddenSelectors = /* @__PURE__ */ new Set([
        ...cssOpacityZeroSelectors,
        ...extractStandaloneHiddenSelectors(script.content)
      ]);
      for (const win of windows) {
        const sel = win.targetSelector;
        const cssKey = sel.startsWith("#") || sel.startsWith(".") ? sel : `#${sel}`;
        if (!hiddenSelectors.has(cssKey)) continue;
        if (win.method === "fromTo" && win.fromPropertyValues && isVisibleGsapState(win.fromPropertyValues) && !win.properties.some((property) => property === "opacity" || property === "autoAlpha")) {
          findings.push({
            code: "gsap_cold_seek_hidden_fromto_missing_reveal",
            severity: "error",
            message: `"${sel}" starts hidden, but its gsap.fromTo() makes it visible only in the from-vars and omits opacity/autoAlpha from the destination. Cold render workers restore the hidden authored state, so the encoded element can stay invisible even when sequential snapshots look correct.`,
            selector: sel,
            fixHint: `Add \`opacity: 1\` (or \`autoAlpha: 1\`) to the destination vars for "${sel}" so every seek path establishes the visible end state explicitly.`,
            snippet: truncateSnippet(win.raw)
          });
          continue;
        }
        if (win.method !== "from") continue;
        if (!win.properties.includes("opacity")) continue;
        if (win.propertyValues["opacity"] !== 0) continue;
        findings.push({
          code: "gsap_from_opacity_noop",
          severity: "error",
          message: `"${sel}" has CSS \`opacity: 0\` and a gsap.${win.method}() that also sets opacity to 0. gsap.from() animates FROM the specified value TO the current CSS value \u2014 since CSS is already 0, the element animates from 0\u21920 and never becomes visible.`,
          selector: sel,
          fixHint: `Remove \`opacity: 0\` from the CSS/inline style on "${sel}". Let gsap.from({opacity: 0}) handle the initial hidden state \u2014 it will animate FROM 0 TO the CSS value (1 by default).`,
          snippet: truncateSnippet(win.raw)
        });
      }
    }
    return findings;
  },
  // gsap_non_transform_motion — animating layout props (left/top/right/bottom/margin*)
  // or using roundProps snaps motion to integer device pixels. On the seek-by-frame
  // capture engine this looks smooth at high per-frame deltas (fast tweens) but visibly
  // stutters at low deltas (slow tweens / ease-out tails): sub-pixel movement rounds to
  // the same pixel for several frames, then jumps a whole pixel. Transforms (x/y/scale)
  // interpolate sub-pixel and stay smooth.
  //
  // EXEMPTION: elements rasterized via the html-in-canvas API — those under a
  // `<canvas layoutsubtree>` ancestor (e.g. the liquid-glass blocks) — are NOT laid out
  // by the browser compositor. The canvas lib reads getComputedStyle().left/top (a
  // sub-pixel value) and draws the element to a bitmap, so animating a layout prop on
  // them does not integer-snap and does not stutter. We resolve each tween's target to
  // its element(s) and skip the finding only when EVERY target is html-in-canvas; a
  // grouped tween that also touches a plain-DOM element (which does stutter) still fires.
  //
  // No suppression by design: there is intentionally no per-line/per-file opt-out (unlike
  // eslint-disable). The stance is fix-the-motion, not silence-the-rule — a plain-DOM
  // layout-prop animation always has a faithful transform equivalent (per-glyph x for
  // spacing, scale for size, x/y for position). An author who has consciously accepted a
  // stutter still has no flag to flip; that is deliberate, not a missing feature.
  async ({ scripts, tags, source }) => {
    const findings = [];
    const layoutSubtreeRanges = tags.filter((t) => t.name.toLowerCase() === "canvas" && /\blayoutsubtree\b/i.test(t.raw)).map((t) => ({ start: t.index, end: findTagEnd(source, t) }));
    const isHtmlInCanvas = (tag) => layoutSubtreeRanges.some((r) => tag.index > r.start && tag.index < r.end);
    const tagsByToken = indexTagsByToken(tags);
    const allTargetsHtmlInCanvas = (selector) => {
      if (layoutSubtreeRanges.length === 0) return false;
      const matched = [...targetedSelectorTokens(selector)].flatMap(
        (token) => tagsByToken.get(token) ?? []
      );
      return matched.length > 0 && matched.every(isHtmlInCanvas);
    };
    const LAYOUT_FIX = {
      left: ["x"],
      right: ["x"],
      top: ["y"],
      bottom: ["y"],
      margin: ["x", "y"],
      marginLeft: ["x"],
      marginRight: ["x"],
      marginTop: ["y"],
      marginBottom: ["y"]
    };
    const REFLOW_PROPS = ["letterSpacing", "wordSpacing", "fontSize"];
    const parseGsapScript = await loadParseGsapScript();
    for (const script of scripts) {
      if (!/gsap\.timeline/.test(script.content)) continue;
      const parsed = parseGsapScript(script.content);
      const calls = [
        ...parsed.animations.map((anim) => ({
          method: anim.method,
          selector: anim.targetSelector,
          // Union the from-vars: a fromTo() can animate a layout/reflow prop that appears
          // only in its first ("from") object, which is just as stutter-prone as the to-vars.
          properties: [
            .../* @__PURE__ */ new Set([
              ...Object.keys(anim.properties),
              ...Object.keys(anim.fromProperties ?? {})
            ])
          ],
          raw: synthesizeWindowRaw(parsed.timelineVar, anim)
        })),
        ...extractStandaloneGsapTransformCalls(stripJsComments(script.content))
      ];
      for (const call of calls) {
        if (call.method === "set") continue;
        let layoutProps = call.properties.filter((p) => Object.hasOwn(LAYOUT_FIX, p));
        const reflowProps = call.properties.filter((p) => REFLOW_PROPS.includes(p));
        const usesRoundProps = call.properties.includes("roundProps");
        if (layoutProps.length > 0 && allTargetsHtmlInCanvas(call.selector)) layoutProps = [];
        if (layoutProps.length === 0 && reflowProps.length === 0 && !usesRoundProps) continue;
        const flagged = [...layoutProps, ...reflowProps, ...usesRoundProps ? ["roundProps"] : []];
        const message = `GSAP tween on "${call.selector}" uses motion that snaps to integer device pixels: ${flagged.join(", ")}. Layout and text-reflow properties snap during browser layout; roundProps rounds the tween value. Slow motion or an ease-out tail then stutters under the seek-by-frame capture engine \u2014 animate transforms (x/y/scale/opacity) instead.`;
        const fixes = [];
        if (layoutProps.length > 0) {
          const tokens = [...new Set(layoutProps.flatMap((p) => LAYOUT_FIX[p] ?? []))];
          fixes.push(
            `replace ${layoutProps.join("/")} with the transform equivalent (${tokens.join(", ")}) \u2014 e.g. tl.fromTo("${call.selector}", { x: -1300 }, { x: 0, ...yourAnimation })`
          );
        }
        if (reflowProps.length > 0) {
          const sizing = reflowProps.filter((p) => p === "fontSize");
          const spacing = reflowProps.filter((p) => p !== "fontSize");
          const parts = [];
          if (sizing.length > 0) {
            parts.push(`replace ${sizing.join("/")} with scale (same visual, no reflow)`);
          }
          if (spacing.length > 0) {
            parts.push(
              `for ${spacing.join("/")}, split the text into per-character elements and animate each glyph's x (the spread) \u2014 uniform scale is NOT equivalent \u2014 or hold the final value statically`
            );
          }
          fixes.push(
            `do not animate ${reflowProps.join("/")} (they reflow text and snap glyph positions): ` + parts.join("; ")
          );
        }
        if (usesRoundProps) fixes.push("remove roundProps");
        const fixHint = `${fixes.join("; ")}. Transforms interpolate sub-pixel and stay smooth at any speed.`;
        findings.push({
          code: "gsap_non_transform_motion",
          severity: "error",
          message,
          selector: call.selector,
          fixHint,
          snippet: truncateSnippet(call.raw)
        });
      }
    }
    return findings;
  },
  // gsap_relative_value_second_writer — a relative tween value ("+=..."/"-=...") on a
  // property that another writer is still ACTIVE on when the relative tween starts.
  // The relative tween captures its base at tween INIT, which happens on first render:
  // the sequential path inits it mid-flight of the other writer, a cold render worker
  // landing later inits it with the other writer's end state — the same frame then
  // renders at two different positions (a visible snap at chunk boundaries).
  // GSAP renders children in start-time order within a single seek pass, so a writer
  // that completes strictly BEFORE the relative tween's start yields identical bases
  // on every seek path and is never flagged. Single-writer relative values are
  // seek-stable. from()/fromTo() resolve their values at build (immediateRender), so
  // they are exempt. The position PARAMETER ("+=0.5") is not a tween value — the
  // parser keeps it out of properties — so it can never be flagged here.
  async ({ scripts, tags }) => {
    const findings = [];
    const tagsByToken = indexTagsByToken(tags);
    for (const script of scripts) {
      if (!/gsap\.timeline/.test(script.content)) continue;
      const windows = await cachedExtractGsapWindows(script.content);
      for (const win of windows) {
        if (win.method === "from" || win.method === "fromTo") continue;
        if (win.overwriteAuto) continue;
        if (targetHasNoStableIdentity(win.targetSelector, win.targetIdentity)) continue;
        const relativeProps = Object.entries(win.propertyValues).filter(([, value]) => isRelativeTweenValue(value)).map(([prop]) => prop);
        if (relativeProps.length === 0) continue;
        const target = { selector: win.targetSelector, identity: win.targetIdentity };
        for (const other of windows) {
          if (other === win) continue;
          if (other.position > win.position || other.end <= win.position) continue;
          const sharedProps = relativeProps.filter((prop) => other.properties.includes(prop));
          if (sharedProps.length === 0) continue;
          if (!targetsShareElement(
            target,
            { selector: other.targetSelector, identity: other.targetIdentity },
            tagsByToken
          )) {
            continue;
          }
          const values = sharedProps.map((prop) => `${prop}: "${win.propertyValues[prop]}"`).join(", ");
          const overlapEnd = Math.min(win.end, other.end);
          const formatTime = (t) => Number.isFinite(t) ? `${t.toFixed(2)}s` : "\u221E";
          findings.push({
            code: "gsap_relative_value_second_writer",
            severity: "error",
            message: `Relative value(s) ${values} on "${win.targetSelector}" start while another writer for the same propert${sharedProps.length > 1 ? "ies" : "y"} is active between ${formatTime(win.position)} and ${formatTime(overlapEnd)}. Relative tweens capture their base at tween init: the sequential path inits mid-flight of the other writer, a cold render worker landing later inits with its end state \u2014 the same frame renders at two different positions (snap at chunk boundaries).`,
            selector: win.targetSelector,
            fixHint: `Use absolute values for ${sharedProps.join(", ")}, or a fromTo() with explicit endpoints, so every seek path resolves the same state. Single-writer relative values are safe; the conflict is the second writer.`,
            snippet: truncateSnippet(`${win.raw}
${other.raw}`)
          });
        }
      }
    }
    return findings;
  },
  // gsap_repeat_refresh_relative_value — repeatRefresh re-resolves the tween's values
  // on every repeat iteration, so a relative value ACCUMULATES per cycle. A cold render
  // worker seeking non-linearly into iteration N skips the accumulation a sequential
  // playhead performed, so workers disagree on where the element is.
  ({ scripts }) => {
    const findings = [];
    for (const script of scripts) {
      const source = stripJsComments(script.content);
      const pattern = /repeatRefresh\s*:\s*true\b/g;
      let match;
      while ((match = pattern.exec(source)) !== null) {
        const objectLiteral = enclosingObjectLiteral(source, match.index);
        if (!objectLiteral || !objectLiteralHasTopLevelRelativeValue(objectLiteral)) continue;
        findings.push({
          code: "gsap_repeat_refresh_relative_value",
          severity: "error",
          message: '`repeatRefresh: true` combined with a relative value ("+="/"-=") accumulates per repeat iteration. A cold render worker seeking non-linearly into iteration N never performed the earlier iterations\' accumulation, so its rendered position diverges from the sequential path.',
          fixHint: "Remove `repeatRefresh: true`, or replace the relative value with absolute endpoints (e.g. a fromTo()) so each iteration resolves to the same state on every seek path.",
          snippet: truncateSnippet(objectLiteral)
        });
      }
    }
    return findings;
  },
  // gsap_function_value_hazard — function-valued tween vars re-run at tween INIT,
  // which is seek-order-dependent. A value reading transform-SENSITIVE geometry
  // (getBoundingClientRect/getComputedStyle/gsap.getProperty) captures whatever state
  // the worker's own seek order produced — error. Transform-INVARIANT layout reads
  // (offsetWidth, getTotalLength, ...) are deterministic across cold render workers
  // unless the measured layout itself animates — warning. GSAP function values receive
  // (index, target, targets) — index is a NUMBER, so a method call on the first
  // parameter (assuming it is the element) throws at init — error. Pure-index
  // arithmetic, gsap.utils.wrap/distribute, and closures over constants are statically
  // opaque or safe and are never flagged.
  //
  // Uses the raw parser output instead of the windows machinery: windows drop tweens
  // with string positions ("+=0.5", labels), and position is irrelevant to whether a
  // VALUE is hazardous.
  async ({ scripts }) => {
    const findings = [];
    const parseGsapScript = await loadParseGsapScript();
    for (const script of scripts) {
      if (!/gsap\.timeline/.test(script.content)) continue;
      const parsed = parseGsapScript(script.content);
      for (const anim of parsed.animations) {
        const raw = synthesizeWindowRaw(parsed.timelineVar, anim);
        const entries = [
          ...Object.entries(anim.properties),
          ...Object.entries(anim.fromProperties ?? {})
        ];
        for (const [prop, value] of entries) {
          if (typeof value !== "string" || !value.startsWith("__raw:")) continue;
          const fn = parseFunctionValueSource(value.slice(6));
          if (!fn) continue;
          const readsSensitive = TRANSFORM_SENSITIVE_READ.test(fn.body);
          const readsInvariant = TRANSFORM_INVARIANT_READ.test(fn.body);
          const badMember = firstParamMemberAccessHazard(fn);
          if (!readsSensitive && !readsInvariant && !badMember) continue;
          const reason = readsSensitive ? "reads transform-sensitive geometry, so its result depends on the worker's own seek order" : badMember ? `accesses .${badMember} on its first parameter \u2014 GSAP function values receive (index, target, targets), so the first parameter is a NUMBER and this throws at tween init` : "measures layout at tween init, which is deterministic across cold render workers only while the measured layout never animates";
          findings.push({
            code: "gsap_function_value_hazard",
            severity: readsSensitive || badMember ? "error" : "warning",
            message: `Function-valued tween var for ${prop} on "${anim.targetSelector}" ${reason}. Each render worker initializes tweens independently.`,
            selector: anim.targetSelector,
            fixHint: badMember ? "Use the SECOND parameter for the element: (index, target) => ... \u2014 or index arithmetic like (i) => i * 20." : "Compute the value once at build time (before the timeline is registered) and pass a constant, or derive it from fixed composition coordinates.",
            snippet: truncateSnippet(raw)
          });
        }
      }
    }
    return findings;
  },
  // gsap_callback_dom_measurement — DOM measurement reachable from timeline callbacks
  // (tl.add(fn) / tl.call(fn) / eventCallback / onStart-style vars). The capture path
  // seeks with suppressEvents=false (core/src/adapters/gsap.ts), so callbacks re-fire
  // on EVERY seek, including rewinds — and a cold render worker executes them against
  // whatever DOM state its own non-linear seek order produced. Geometry measured
  // inside a callback is therefore seek-order-dependent, and anything measured before
  // the callback ran (e.g. a build-time getTotalLength() on a path whose `d` the
  // callback assigns) is stale or zero. Warning, not error: gsap.getProperty-style
  // derived-output callbacks were excluded, but the remaining reads can still be
  // legitimate when the measured layout is static.
  ({ scripts }) => {
    const findings = [];
    for (const script of scripts) {
      const source = stripJsComments(script.content);
      if (!/gsap\.timeline/.test(source)) continue;
      const bodies = collectNamedFunctionBodies(source);
      const measuring = collectMeasuringFunctionNames(bodies);
      const callbackExpressionHazard = (expression) => {
        const trimmed = expression.trim();
        const inline = parseFunctionValueSource(trimmed);
        if (inline) return expressionReachesMeasurement(inline.body, measuring);
        if (/^[A-Za-z_$][\w$]*$/.test(trimmed)) return measuring.has(trimmed);
        return false;
      };
      const report = (site, snippet) => {
        findings.push({
          code: "gsap_callback_dom_measurement",
          severity: "warning",
          message: "Timeline callback reaches DOM measurement (getBoundingClientRect/getTotalLength/getComputedStyle/...). The renderer seeks with suppressEvents=false, so callbacks re-fire on every seek \u2014 and a cold render worker runs them against whatever DOM state its own non-linear seek order produced. Measured geometry is seek-order-dependent, and values measured at build time (before the callback ran) are stale or zero.",
          selector: truncateSnippet(site, 120),
          fixHint: "Do all measurement and DOM setup synchronously at build time, before registering the timeline \u2014 or derive geometry from fixed composition coordinates instead of measuring.",
          snippet: truncateSnippet(snippet)
        });
      };
      const timelineVars = collectTimelineVarNames(source);
      for (const timelineVar of timelineVars) {
        const callPattern = new RegExp(
          `\\b${escapeRegExp2(timelineVar)}\\.(?:add|call)\\s*\\(`,
          "g"
        );
        let match2;
        while ((match2 = callPattern.exec(source)) !== null) {
          const parenIndex = match2.index + match2[0].length - 1;
          const argsWithParens = matchBalanced(source, parenIndex, "(", ")");
          if (!argsWithParens) continue;
          const firstArg = sliceExpression(argsWithParens.slice(1, -1), 0);
          const site = match2[0] + firstArg + ", ...)";
          if (callbackExpressionHazard(firstArg)) report(site, site);
        }
        const eventCallbackPattern = new RegExp(
          `\\b${escapeRegExp2(timelineVar)}\\.eventCallback\\s*\\(\\s*["']on[A-Za-z]+["']\\s*,`,
          "g"
        );
        while ((match2 = eventCallbackPattern.exec(source)) !== null) {
          const expression = sliceExpression(source, eventCallbackPattern.lastIndex);
          const site = match2[0] + expression + ")";
          if (callbackExpressionHazard(expression)) report(site, site);
        }
      }
      const varsCallbackPattern = /\bon(?:Start|Update|Complete|Repeat|ReverseComplete|Interrupt|Overwrite)\s*:\s*/g;
      let match;
      while ((match = varsCallbackPattern.exec(source)) !== null) {
        if (!isInsideGsapTweenVars(source, match.index, timelineVars)) continue;
        const expression = sliceExpression(source, varsCallbackPattern.lastIndex);
        const site = match[0] + expression;
        if (callbackExpressionHazard(expression)) report(site, site);
      }
    }
    return findings;
  },
  // gsap_timeline_return_used_as_tween — `tl.to()` returns the TIMELINE, not the tween it just
  // created. `gsap.to()` returns a Tween, so the two read identically and behave nothing alike.
  // Capturing the timeline's return and later treating it as an individual animation aims a
  // tween-scoped call at the whole composition: `.kill()` on it interrupts the master timeline
  // and detaches it from its parent, which stops a parent-driven seek dead while leaving an
  // explicit `tl.progress()` still working -- so a render of the packaged defaults looks fine
  // and only live playback breaks. A rebuild that collected these to discard them also leaves
  // every previous keyframe in place and stacks the new ones on top.
  ({ scripts }) => {
    const findings = [];
    for (const script of scripts) {
      const source = stripJsComments(script.content);
      const timelineVars = collectTimelineVarNames(source);
      if (timelineVars.length === 0) continue;
      const receivers = timelineVars.map(escapeRegExp2).join("|");
      const pattern = new RegExp(
        String.raw`(?:\.push\s*\(\s*|(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*)(?:${receivers})\s*\.\s*(to|from|fromTo|set|call|add)\s*\(`,
        "g"
      );
      let match;
      while ((match = pattern.exec(source)) !== null) {
        const boundName = match[1];
        const method = match[2];
        if (boundName) {
          const treatedAsTween = new RegExp(
            String.raw`\b${escapeRegExp2(boundName)}\s*\.\s*(?:kill|revert|invalidate|pause|resume|restart|seek|progress|timeScale)\s*\(`
          );
          if (!treatedAsTween.test(source)) continue;
        }
        const contextStart = Math.max(0, match.index - 40);
        findings.push({
          code: "gsap_timeline_return_used_as_tween",
          severity: "error",
          message: `\`${match[0].includes(".push") ? "push" : boundName}\` captures the return of \`.${method}()\` on timeline \`${timelineVars[0]}\`, but a timeline's \`.to()\`/\`.from()\`/\`.set()\` returns THE TIMELINE ITSELF, not the tween it created. Every captured value is the same master timeline, so a tween-scoped call on it \u2014 \`.kill()\` above all \u2014 hits the whole composition: it interrupts the timeline and detaches it from its parent, which freezes a parent-driven seek while an explicit \`tl.progress()\` keeps working. Only \`gsap.to()\` returns a tween.`,
          fixHint: "To build a group of keyframes you can later discard, put them in a nested timeline: `const nested = gsap.timeline(); nested.to(...); tl.add(nested, 0);` \u2014 then `nested.kill()` replaces exactly those keyframes and cannot reach `tl`. Children keep their absolute times when the nest is added at 0. To hold a single real tween, create it with `gsap.to(...)` and place it with `tl.add(tween, at)`.",
          snippet: truncateSnippet(source.slice(contextStart, match.index + match[0].length + 60))
        });
      }
    }
    return findings;
  },
  // gsap_group_selector_keyframes
  ({ scripts }) => {
    const findings = [];
    const pattern = /\.(?:to|from|fromTo)\(\s*["']([^"']+,\s*[^"']+)["']\s*,\s*\{[^}]*keyframes/g;
    for (const { match, snippet } of scanScriptsForRegexMatches(scripts, pattern, {
      stripComments: true,
      contextBefore: 20,
      contextAfter: 40
    })) {
      const selector = match[1];
      const count = selector.split(",").length;
      findings.push({
        code: "gsap_group_selector_keyframes",
        severity: "warning",
        message: `GSAP tween targets ${count} elements with shared keyframes ("${truncateSnippet(selector, 60)}"). Editing one element's keyframes in Studio will affect all ${count} elements. Split into individual tweens for per-element keyframe control.`,
        fixHint: `Replace the group selector with individual tl.to() calls per element, each with their own keyframes object.`,
        snippet: truncateSnippet(snippet)
      });
    }
    return findings;
  },
  // svg_drawon_css_dasharray_conflict — GSAP sets/tweens strokeDasharray on an element
  // whose CSS declares a MULTI-component stroke-dasharray (e.g. `10 10`). GSAP merges
  // dash lists per component, so `strokeDasharray: 641.4` over CSS `10 10` computes to
  // "641.4px, 10px" — the gap stays 10px and the hide-then-draw-on trick silently
  // fails: the line is visible the whole scene. A static two-component GSAP value is
  // the explicit fix form and is not flagged.
  // fallow-ignore-next-line complexity
  ({ scripts, styles, tags }) => {
    const findings = [];
    const tagsByToken = indexTagsByToken(tags);
    const multiDashTokens = /* @__PURE__ */ new Set();
    for (const style of styles) {
      for (const [, selectorList, body] of style.content.matchAll(/([^{}]+)\{([^}]+)\}/g)) {
        if (!selectorList || !body) continue;
        const value = readStyleProperty(body, "stroke-dasharray");
        if (!value || !isMultiComponentDasharray(value)) continue;
        for (const group of selectorList.split(",")) {
          const trimmed = group.trim();
          if (!trimmed || /[\s>+~]/.test(trimmed)) continue;
          for (const token of targetedSelectorTokens(trimmed)) multiDashTokens.add(token);
        }
      }
    }
    for (const tag of tags) {
      const inlineValue = readStyleProperty(readAttr(tag.raw, "style") ?? "", "stroke-dasharray");
      if (!inlineValue || !isMultiComponentDasharray(inlineValue)) continue;
      for (const token of tagSimpleSelectors(tag)) multiDashTokens.add(token);
    }
    if (multiDashTokens.size === 0) return findings;
    for (const script of scripts) {
      const source = stripJsComments(script.content);
      const varTokens = resolveScriptElementTokens(source, tags);
      const reported = /* @__PURE__ */ new Set();
      const writerPattern = /\b[\w$]+\.(set|to|fromTo)\s*\(\s*(?:(["'])([^"'`]+)\2|([A-Za-z_$][\w$]*))\s*,\s*\{/g;
      let match;
      while ((match = writerPattern.exec(source)) !== null) {
        const method = match[1] ?? "";
        const braceIndex = match.index + match[0].length - 1;
        const firstVars = matchBalanced(source, braceIndex, "{", "}");
        if (!firstVars) continue;
        const varsObjects = [firstVars];
        if (method === "fromTo") {
          const afterFirst = source.slice(braceIndex + firstVars.length);
          const secondOpen = /^\s*,\s*\{/.exec(afterFirst);
          if (secondOpen) {
            const secondBrace = braceIndex + firstVars.length + secondOpen[0].length - 1;
            const secondVars = matchBalanced(source, secondBrace, "{", "}");
            if (secondVars) varsObjects.push(secondVars);
          }
        }
        const quotedSelector = match[3];
        const targetTokens = quotedSelector ? targetedSelectorTokens(quotedSelector) : varTokens.get(match[4] ?? "") ?? /* @__PURE__ */ new Set();
        if (targetTokens.size === 0) continue;
        const expanded = elementLevelTokens(targetTokens, tagsByToken);
        for (const varsObject of varsObjects) {
          const propMatch = varsObject.match(/\bstrokeDasharray\s*:\s*/) ?? varsObject.match(/["']stroke-dasharray["']\s*:\s*/);
          if (!propMatch || propMatch.index === void 0) continue;
          const valueSource = sliceExpression(varsObject, propMatch.index + propMatch[0].length);
          if (gsapDasharrayValueLooksMultiComponent(valueSource)) continue;
          const conflictToken = [...expanded].find((token) => multiDashTokens.has(token));
          if (!conflictToken) continue;
          const targetLabel = quotedSelector ?? match[4] ?? "";
          if (reported.has(targetLabel + conflictToken)) continue;
          reported.add(targetLabel + conflictToken);
          findings.push({
            code: "svg_drawon_css_dasharray_conflict",
            severity: "error",
            message: `GSAP writes strokeDasharray on "${targetLabel}", but its CSS ("${conflictToken}") declares a multi-component stroke-dasharray. GSAP merges dash lists per component, so the CSS gap survives (e.g. "641.4px, 10px") \u2014 the draw-on hide only hides one gap's worth and the line stays visible the whole scene.`,
            selector: quotedSelector ?? void 0,
            fixHint: `Remove the CSS stroke-dasharray from "${conflictToken}" (decorative dashes belong on a separate element), or set the full two-component value in GSAP: strokeDasharray: "\${len} \${len}".`,
            snippet: truncateSnippet(match[0] + firstVars.slice(1))
          });
        }
      }
    }
    return findings;
  },
  // gsap_timeline_set_initial_hide — a zero-duration tl.set(...) at position 0 inside
  // the paused timeline does NOT render while the playhead sits exactly at 0 (verified
  // against this repo's GSAP: tl.time(0) leaves the target untouched; only a seek past
  // 0 applies it). Frame 0 therefore shows the UN-hidden state, then the element pops
  // hidden on frame 1 — and only for the worker that renders frame 0. Targets already
  // hidden by authored CSS/inline styles or by a standalone gsap.set are exempt: the
  // tl.set is then a defensive re-assertion and frame 0 is hidden anyway.
  //
  // Only sets that precede every tween in source order qualify: the parser resolves a
  // mutated position variable (`var t = 0; ...; tl.set(sel, vars, t)`) to its INITIAL
  // binding, so late hard-kills can masquerade as position-0 sets. Genuine
  // initial-state hides are authored before the timeline's tweens.
  async ({ scripts, styles, tags }) => {
    const findings = [];
    const cssHiddenSelectors = collectCssOpacityZeroSelectors(styles, tags);
    const tagsByToken = indexTagsByToken(tags);
    for (const script of scripts) {
      if (!/gsap\.timeline/.test(script.content)) continue;
      const windows = await cachedExtractGsapWindows(script.content);
      const alreadyHidden = /* @__PURE__ */ new Set([
        ...cssHiddenSelectors,
        ...extractStandaloneHiddenSelectors(script.content)
      ]);
      const isInstantHold = (win) => win.method === "set" || (win.method === "to" || win.method === "fromTo") && win.end === win.position;
      const firstTweenIndex = windows.findIndex((win) => !isInstantHold(win));
      const initialHolds = firstTweenIndex < 0 ? windows : windows.slice(0, firstTweenIndex);
      for (const win of initialHolds) {
        if (!isInstantHold(win) || win.position !== 0) continue;
        if (win.global || win.immediateRender === true) continue;
        if (targetHasNoStableIdentity(win.targetSelector, win.targetIdentity)) continue;
        const targetTokens = [...targetedSelectorTokens(win.targetSelector)];
        const hiddenByToken = targetTokens.length > 0 && targetTokens.every((token) => alreadyHidden.has(token));
        const resolvedTags = targetTokens.flatMap((token) => tagsByToken.get(token) ?? []);
        const hiddenByElement = resolvedTags.length > 0 && resolvedTags.every(
          (tag) => tagSimpleSelectors(tag).some((token) => alreadyHidden.has(token))
        );
        if (hiddenByToken || hiddenByElement) continue;
        const offset = win.propertyValues["strokeDashoffset"];
        const hidesByOffset = numberValue(offset) !== null && !zeroValue(offset);
        const hides = isHiddenGsapState(win.propertyValues) || zeroValue(win.propertyValues["scale"]) || hidesByOffset;
        if (!hides) continue;
        findings.push({
          code: "gsap_timeline_set_initial_hide",
          severity: "warning",
          message: `Initial hidden state for "${win.targetSelector}" is set via tl.set(...) at position 0 inside the paused timeline. A zero-duration set at 0 does not render while the playhead sits exactly at 0, so frame 0 shows the un-hidden state.`,
          selector: win.targetSelector,
          fixHint: "Use gsap.set(...) (immediate, outside the timeline) for initial states, or author the hidden state directly in CSS/attributes.",
          snippet: truncateSnippet(win.raw)
        });
      }
    }
    return findings;
  },
  // svg_measure_before_path_d — getTotalLength() on a <path> that has no static `d`
  // attribute in the HTML. In Chrome getTotalLength() on a d-less path returns 0,
  // silently killing dash animations (offset 0 == length 0 == nothing to draw). If a
  // d assignment exists but only inside a function body, execution order is statically
  // undecidable — WARNING; if NO d assignment exists anywhere — ERROR. Element
  // identity is resolved conservatively (literal / template getElementById,
  // querySelector); createElementNS-built paths and unresolved variables are skipped.
  // fallow-ignore-next-line complexity
  ({ scripts, styles, tags }) => {
    const findings = [];
    const tagsByToken = indexTagsByToken(tags);
    const cssProvidesD = styles.some((style) => /\bd\s*:\s*path\(/.test(style.content));
    for (const script of scripts) {
      const source = stripJsComments(script.content);
      const varTokens = resolveScriptElementTokens(source, tags);
      const functionRanges = collectFunctionBodyRanges(source);
      const createdVars = new Set(
        [...source.matchAll(/([A-Za-z_$][\w$]*)\s*=\s*document\.createElementNS\(/g)].map(
          (m) => m[1] ?? ""
        )
      );
      const dAssignments = [
        ...[...source.matchAll(/\b([A-Za-z_$][\w$]*)\.setAttribute\(\s*["']d["']\s*,/g)].map(
          (m) => ({ varName: m[1] ?? "", index: m.index ?? 0 })
        ),
        ...[
          ...source.matchAll(
            /\.(?:set|to|fromTo)\s*\(\s*([A-Za-z_$][\w$]*)\s*,\s*\{[^{}]*\battr\s*:\s*\{[^{}]*\bd\s*:/g
          )
        ].map((m) => ({ varName: m[1] ?? "", index: m.index ?? 0 }))
      ];
      const reported = /* @__PURE__ */ new Set();
      const measurePattern = /\b([A-Za-z_$][\w$]*)\.getTotalLength\s*\(/g;
      let match;
      while ((match = measurePattern.exec(source)) !== null) {
        const varName = match[1] ?? "";
        if (createdVars.has(varName)) continue;
        const tokens = varTokens.get(varName);
        if (!tokens || tokens.size === 0) continue;
        const resolvedTags = [...tokens].flatMap((token) => tagsByToken.get(token) ?? []);
        const dLessPaths = resolvedTags.filter(
          (tag) => tag.name.toLowerCase() === "path" && readAttr(tag.raw, "d") === null
        );
        if (dLessPaths.length === 0 || dLessPaths.length !== resolvedTags.length) continue;
        if (cssProvidesD) continue;
        const measureIndex = match.index;
        const assignedBeforeInScope = dAssignments.some(
          (assign) => assign.varName === varName && assign.index < measureIndex && (!indexInsideAnyRange(assign.index, functionRanges) || functionRanges.some(
            (range) => assign.index > range.start && assign.index < range.end && measureIndex > range.start && measureIndex < range.end
          ))
        );
        if (assignedBeforeInScope) continue;
        const sameVarAssignmentExists = dAssignments.some((a) => a.varName === varName);
        const tokenLabel = [...tokens].join(", ");
        if (reported.has(tokenLabel)) continue;
        reported.add(tokenLabel);
        findings.push({
          code: "svg_measure_before_path_d",
          severity: sameVarAssignmentExists ? "warning" : "error",
          message: sameVarAssignmentExists ? `getTotalLength() is called on "${tokenLabel}", whose \`d\` is only assigned inside a function body \u2014 if the measure runs before that function (e.g. the function is a timeline callback), the length is 0 and the dash animation is dead.` : `getTotalLength() is called on "${tokenLabel}", but the path has no static \`d\` attribute and no d assignment exists anywhere \u2014 getTotalLength() returns 0 in Chrome, silently killing dash animations.`,
          selector: tokenLabel,
          fixHint: "Assign the path's `d` synchronously at build time (top level, before measuring), or author a static d attribute in the HTML.",
          snippet: truncateSnippet(match[0] + ")")
        });
      }
    }
    return findings;
  }
];
var captionRules = [
  // caption_exit_missing_hard_kill
  ({ scripts, styles, options, rootCompositionId }) => {
    const findings = [];
    const isCaptionComposition = Boolean(options.filePath && /caption/i.test(options.filePath)) || rootCompositionId === "captions" || styles.some((s) => /\.caption[-_]?(?:group|word|line|block)\b|\.cg-/.test(s.content));
    if (!isCaptionComposition) return findings;
    for (const script of scripts) {
      const content = script.content;
      const hasExitTween = /\.to\s*\([^,]+,\s*\{[^}]*opacity\s*:\s*0/.test(content);
      const hasHardKill = /\.set\s*\([^,]+,\s*\{[^}]*(?:visibility\s*:\s*["']hidden["']|opacity\s*:\s*0)/.test(
        content
      );
      const hasCaptionLoop = /forEach|\.forEach\s*\(/.test(content) && /karaoke|caption[-_]?(?:group|word|line|block)|cg-/.test(content);
      if (hasCaptionLoop && hasExitTween && !hasHardKill) {
        findings.push({
          code: "caption_exit_missing_hard_kill",
          severity: "error",
          message: "Caption exit animations (tl.to with opacity: 0) detected without a hard tl.set kill. Exit tweens can fail when karaoke word-level tweens conflict, leaving captions stuck on screen.",
          fixHint: 'Add `tl.set(groupEl, { opacity: 0, visibility: "hidden" }, group.end)` after every exit tl.to animation as a deterministic kill.'
        });
      }
    }
    return findings;
  },
  // caption_text_overflow_risk
  ({ styles }) => {
    const findings = [];
    for (const style of styles) {
      const captionBlocks = style.content.matchAll(
        /(\.caption[-_]?(?:group|container|text|line|word)|#caption[-_]?container)\s*\{([^}]+)\}/gi
      );
      for (const [, selector, body] of captionBlocks) {
        if (!body) continue;
        const hasNowrap = /white-space\s*:\s*nowrap/i.test(body);
        const hasMaxWidth = /max-width/i.test(body);
        if (hasNowrap && !hasMaxWidth) {
          findings.push({
            code: "caption_text_overflow_risk",
            severity: "warning",
            selector: (selector ?? "").trim(),
            message: `Caption selector "${(selector ?? "").trim()}" has white-space: nowrap but no max-width. Long phrases will clip off-screen.`,
            fixHint: (
              // Deliberately does NOT say `overflow: hidden`: caption words are scaled
              // above 1.0x, and clipping them is exactly what caption_overflow_clips_scaled_words
              // errors on. Recommending it here made this warning's own fix produce an error.
              "Add max-width: 1600px (landscape) or max-width: 900px (portrait). Keep overflow visible so scaled emphasis words are not clipped."
            )
          });
        }
      }
    }
    return findings;
  },
  // caption_transcript_not_inline
  // fallow-ignore-next-line complexity
  ({ scripts, styles, options }) => {
    const findings = [];
    const isCaptionFile = options.filePath && /caption/i.test(options.filePath) || styles.some((s) => /\.caption[-_]?(?:group|word)/i.test(s.content));
    if (!isCaptionFile) return findings;
    const allScript = scripts.map((s) => s.content).join("\n");
    const hasInlineTranscript = /(?:const|let|var)\s+(?:TRANSCRIPT|script)\s*=\s*\[/.test(
      allScript
    );
    const hasFetchTranscript = /fetch\s*\(\s*["'][^"']*transcript/i.test(allScript);
    if (!hasInlineTranscript && hasFetchTranscript) {
      findings.push({
        code: "caption_transcript_not_inline",
        severity: "error",
        message: "Captions composition loads transcript via fetch(). The studio caption editor requires an inline `var TRANSCRIPT = [...]` array to detect and edit captions.",
        fixHint: 'Embed the transcript as `var TRANSCRIPT = [{ "text": "...", "start": 0, "end": 1 }, ...]` with JSON-quoted property keys. See the captions skill for details.'
      });
    }
    return findings;
  },
  // caption_container_relative_position
  ({ styles }) => {
    const findings = [];
    for (const style of styles) {
      const captionBlocks = style.content.matchAll(
        /(\.caption[-_]?(?:group|container|text|line)|#caption[-_]?container)\s*\{([^}]+)\}/gi
      );
      for (const [, selector, body] of captionBlocks) {
        if (!body) continue;
        if (/position\s*:\s*relative/i.test(body)) {
          findings.push({
            code: "caption_container_relative_position",
            severity: "error",
            selector: (selector ?? "").trim(),
            message: `Caption selector "${(selector ?? "").trim()}" uses position: relative which causes overflow and breaks caption stacking.`,
            fixHint: "Use position: absolute for all caption elements."
          });
        }
      }
    }
    return findings;
  },
  // caption_overflow_clips_scaled_words
  ({ styles, scripts }) => {
    const findings = [];
    const hasScaledWords = scripts.some(
      (s) => /scale\s*:\s*1\.[2-9]/.test(s.content) && /caption|word|cg-/.test(s.content)
    );
    if (!hasScaledWords) return findings;
    for (const style of styles) {
      const captionBlocks = style.content.matchAll(
        /(\.caption[-_]?(?:group|container)|#caption[-_]?(?:layer|container))\s*\{([^}]+)\}/gi
      );
      for (const [, selector, body] of captionBlocks) {
        if (!body) continue;
        if (/overflow\s*:\s*hidden/i.test(body)) {
          findings.push({
            code: "caption_overflow_clips_scaled_words",
            severity: "error",
            selector: (selector ?? "").trim(),
            message: `"${(selector ?? "").trim()}" has overflow: hidden but GSAP scales caption words above 1.0x. Scaled emphasis words and their glow effects will be clipped.`,
            fixHint: "Use overflow: visible on caption containers. Rely on fitTextFontSize with reduced maxWidth to prevent overflow instead."
          });
        }
      }
    }
    return findings;
  },
  // caption_textshadow_on_group_container
  ({ scripts, styles }) => {
    const findings = [];
    const isCaptionFile = styles.some((s) => /\.caption[-_]?(?:group|word)/i.test(s.content));
    if (!isCaptionFile) return findings;
    for (const script of scripts) {
      const groupShadowPattern = /\.to\s*\(\s*(?:div|groupEl|el|captionEl|document\.getElementById\s*\(\s*["']cg-)\s*[^,]*,\s*\{[^}]*textShadow/g;
      const selectorShadowPattern = /\.to\s*\(\s*["'](?:#cg-\d+|\.caption[-_]?group)["']\s*,\s*\{[^}]*textShadow/g;
      if (groupShadowPattern.test(script.content) || selectorShadowPattern.test(script.content)) {
        findings.push({
          code: "caption_textshadow_on_group_container",
          severity: "warning",
          message: "textShadow is tweened on a caption group container. When children have semi-transparent color (e.g., inactive karaoke words at rgba opacity), the glow renders as a visible rectangle behind the entire group.",
          fixHint: "Apply textShadow to individual active word elements instead of the group container. Use scale on the group for bass-reactive pulsing."
        });
      }
    }
    return findings;
  },
  // caption_fittext_scale_mismatch
  // fallow-ignore-next-line complexity
  ({ scripts }) => {
    const findings = [];
    for (const script of scripts) {
      const content = script.content;
      const fitTextMatch = content.match(/fitTextFontSize\s*\([^)]*maxWidth\s*:\s*(\d+)/);
      if (!fitTextMatch) continue;
      const maxWidth = parseInt(fitTextMatch[1] ?? "0", 10);
      if (!maxWidth) continue;
      const scaleMatches = [...content.matchAll(/scale\s*:\s*(1\.\d+)/g)];
      const captionContext = /caption|word|cg-|karaoke/i.test(content);
      if (!captionContext || scaleMatches.length === 0) continue;
      let maxScale = 1;
      for (const m of scaleMatches) {
        const val = parseFloat(m[1] ?? "1");
        if (val > maxScale) maxScale = val;
      }
      const effectiveWidth = maxWidth * maxScale;
      if (effectiveWidth > 1760) {
        findings.push({
          code: "caption_fittext_scale_mismatch",
          severity: "warning",
          message: `fitTextFontSize uses maxWidth: ${maxWidth}px but emphasis words scale up to ${maxScale}x. Effective width ${Math.round(effectiveWidth)}px may overflow the composition (1920px minus margins).`,
          fixHint: `Reduce maxWidth to ${Math.floor(1700 / maxScale)}px to leave headroom for scaled emphasis words.`
        });
      }
    }
    return findings;
  }
];
var adapterRules = [
  // missing_lottie_script
  ({ tags, scripts }) => {
    const { texts, srcs } = extractScriptTextsAndSrcs(scripts);
    const hasLottieAttr = tags.some((t) => readAttr(t.raw, "data-lottie-src") !== null);
    const usesLottieApi = texts.some(
      (t) => /lottie\.(loadAnimation|setSpeed|play|stop|destroy)\b/.test(t)
    );
    const hasLottieScript = srcs.some((src) => /lottie/i.test(src));
    if (!(hasLottieAttr || usesLottieApi) || hasLottieScript) return [];
    return [
      {
        code: "missing_lottie_script",
        severity: "error",
        message: "Composition uses Lottie but no Lottie script is loaded. The animation will not render.",
        fixHint: 'Add <script src="https://cdn.jsdelivr.net/npm/lottie-web@5/build/player/lottie.min.js"></script> before your Lottie code.'
      }
    ];
  },
  // missing_three_script
  ({ scripts }) => {
    const { texts, srcs } = extractScriptTextsAndSrcs(scripts);
    const usesThree = texts.some((t) => /\bTHREE\./.test(t));
    const hasThreeScript = srcs.some((src) => /three/i.test(src));
    const hasThreeImportMap = texts.some(
      (t) => /["']three["']/.test(t) && /importmap/.test(scripts.find((s) => s.content === t)?.attrs || "")
    );
    const hasThreeModuleImport = texts.some(
      (t) => /\b(?:import|from)\s*[^;\n]*['"][^'"]*three[^'"]*['"]/i.test(t)
    );
    if (!usesThree || hasThreeScript || hasThreeImportMap || hasThreeModuleImport) return [];
    return [
      {
        code: "missing_three_script",
        severity: "error",
        message: "Composition uses Three.js but no Three.js script is loaded. The 3D scene will not render.",
        fixHint: 'Add <script src="https://cdn.jsdelivr.net/npm/three@0.160/build/three.min.js"></script> before your Three.js code.'
      }
    ];
  }
];
var TEXTURE_BASE_CLASS = "hf-texture-text";
var TEXTURE_CLASS_PREFIX = "hf-texture-";
function classNames(tag) {
  return (readAttr(tag.raw, "class") ?? "").split(/\s+/).filter(Boolean);
}
function isTextureMaterialClass(className) {
  return className.startsWith(TEXTURE_CLASS_PREFIX) && className !== TEXTURE_BASE_CLASS;
}
function hasInlineMaskImage(tag) {
  const style = readAttr(tag.raw, "style") ?? "";
  return /\b(?:-webkit-)?mask-image\s*:/i.test(style);
}
function hasInlineDropShadow(tag) {
  const style = readAttr(tag.raw, "style") ?? "";
  return /\bfilter\s*:\s*[^;]*\bdrop-shadow\s*\(/i.test(style);
}
function classNamesInSelector(selector) {
  const classes = /* @__PURE__ */ new Set();
  const pattern = /\.([A-Za-z_][\w-]*)/g;
  let match;
  while ((match = pattern.exec(selector)) !== null) {
    const className = match[1];
    if (!className) continue;
    classes.add(className);
  }
  return [...classes];
}
function textureClassesInSelector(selector) {
  return classNamesInSelector(selector).filter(isTextureMaterialClass);
}
function simpleSelectorMatchesTag(selector, tag, tagClasses) {
  const trimmed = selector.trim();
  const simpleSelectorPattern = /^(?:[A-Za-z][\w-]*)?(?:\.[A-Za-z_][\w-]*)+$/;
  if (!simpleSelectorPattern.test(trimmed)) return false;
  const typeMatch = /^([A-Za-z][\w-]*)/.exec(trimmed);
  if (typeMatch && typeMatch[1].toLowerCase() !== tag.name) return false;
  const selectorClasses = classNamesInSelector(trimmed);
  return selectorClasses.length > 0 && selectorClasses.every((className) => tagClasses.includes(className));
}
function collectTextureCss(styles) {
  const definedTextureClasses = /* @__PURE__ */ new Set();
  const dropShadowRules = [];
  const roots = [];
  for (const style of styles) {
    let root;
    try {
      root = postcss2.parse(style.content);
    } catch {
      continue;
    }
    roots.push(root);
    root.walkRules((rule) => {
      const selectors = rule.selectors ?? [];
      let hasMaskImage = false;
      for (const node of rule.nodes ?? []) {
        if (node.type !== "decl") continue;
        const prop = node.prop.toLowerCase();
        if (prop === "mask-image" || prop === "-webkit-mask-image") hasMaskImage = true;
      }
      if (hasMaskImage) {
        for (const selector of selectors) {
          for (const className of textureClassesInSelector(selector)) {
            definedTextureClasses.add(className);
          }
        }
      }
    });
  }
  for (const root of roots) {
    root.walkRules((rule) => {
      const selectors = rule.selectors ?? [];
      let hasDropShadow = false;
      for (const node of rule.nodes ?? []) {
        if (node.type !== "decl") continue;
        if (node.prop.toLowerCase() === "filter" && /\bdrop-shadow\s*\(/i.test(node.value)) {
          hasDropShadow = true;
        }
      }
      if (hasDropShadow) {
        for (const selector of selectors) {
          const targetsBaseClass = /\.hf-texture-text\b/.test(selector);
          const targetsDefinedTextureClass = textureClassesInSelector(selector).some(
            (className) => definedTextureClasses.has(className)
          );
          dropShadowRules.push({
            selector,
            directlyTargetsTexture: targetsBaseClass || targetsDefinedTextureClass
          });
        }
      }
    });
  }
  return { definedTextureClasses, dropShadowRules };
}
var textureRules = [
  ({ tags, styles }) => {
    const findings = [];
    const { definedTextureClasses, dropShadowRules } = collectTextureCss(styles);
    for (const { selector, directlyTargetsTexture } of dropShadowRules) {
      if (!directlyTargetsTexture) continue;
      findings.push({
        code: "texture_drop_shadow_on_text",
        severity: "warning",
        message: "Drop shadow is applied directly to textured text.",
        selector,
        fixHint: "Wrap the textured text and apply `filter: drop-shadow(...)` to the wrapper, not the `hf-texture-text` element."
      });
    }
    for (const tag of tags) {
      if (tag.name === "style" || tag.name === "script") continue;
      const classes = classNames(tag);
      if (classes.length === 0) continue;
      const hasBaseClass = classes.includes(TEXTURE_BASE_CLASS);
      const textureClasses = classes.filter(isTextureMaterialClass);
      if (textureClasses.length > 0 && !hasBaseClass) {
        findings.push({
          code: "texture_class_missing_base",
          severity: "warning",
          message: `Texture material class \`${textureClasses[0]}\` is used without \`${TEXTURE_BASE_CLASS}\`.`,
          elementId: readAttr(tag.raw, "id") || void 0,
          fixHint: `Add \`${TEXTURE_BASE_CLASS}\` alongside the material class, for example \`class="${TEXTURE_BASE_CLASS} ${textureClasses[0]}"\`.`,
          snippet: truncateSnippet(tag.raw)
        });
      }
      if (hasBaseClass && textureClasses.length === 0 && !hasInlineMaskImage(tag)) {
        findings.push({
          code: "texture_text_missing_mask",
          severity: "warning",
          message: `\`${TEXTURE_BASE_CLASS}\` is used without a texture material class or custom mask image.`,
          elementId: readAttr(tag.raw, "id") || void 0,
          fixHint: "Add a material class such as `hf-texture-lava`, or set `mask-image` and `-webkit-mask-image` on the element.",
          snippet: truncateSnippet(tag.raw)
        });
      }
      for (const textureClass of textureClasses) {
        if (definedTextureClasses.has(textureClass)) continue;
        findings.push({
          code: "texture_class_unknown",
          severity: "error",
          message: `Texture material class \`${textureClass}\` is not defined by local CSS.`,
          elementId: readAttr(tag.raw, "id") || void 0,
          fixHint: "Paste the Texture Mask Text component `<style>...</style>` block into the composition, or fix the texture class typo.",
          snippet: truncateSnippet(tag.raw)
        });
      }
      if (hasBaseClass) {
        for (const rule of dropShadowRules) {
          if (rule.directlyTargetsTexture) continue;
          if (!simpleSelectorMatchesTag(rule.selector, tag, classes)) continue;
          findings.push({
            code: "texture_drop_shadow_on_text",
            severity: "warning",
            message: "Drop shadow is applied directly to textured text.",
            selector: rule.selector,
            elementId: readAttr(tag.raw, "id") || void 0,
            fixHint: "Wrap the textured text and apply `filter: drop-shadow(...)` to the wrapper, not the `hf-texture-text` element.",
            snippet: truncateSnippet(tag.raw)
          });
        }
      }
      if (hasBaseClass && hasInlineDropShadow(tag)) {
        findings.push({
          code: "texture_drop_shadow_on_text",
          severity: "warning",
          message: "Drop shadow is applied directly to textured text.",
          elementId: readAttr(tag.raw, "id") || void 0,
          fixHint: "Wrap the textured text and apply `filter: drop-shadow(...)` to the wrapper, not the `hf-texture-text` element.",
          snippet: truncateSnippet(tag.raw)
        });
      }
    }
    return findings;
  }
];
var GENERIC_FAMILIES = /* @__PURE__ */ new Set([
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui",
  "ui-serif",
  "ui-sans-serif",
  "ui-monospace",
  "ui-rounded",
  "math",
  "emoji",
  "fangsong",
  // Vendor-prefixed system-font keywords. Like `system-ui`, the engine resolves
  // these to the OS UI font — they are never installable files and must not be
  // flagged as a missing @font-face, even when a generic fallback follows them
  // (e.g. `-apple-system, system-ui, sans-serif`).
  "-apple-system",
  "blinkmacsystemfont",
  "inherit",
  "initial",
  "unset",
  "revert"
]);
function stripCssComments2(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function extractFontFaceFamilies(styles) {
  const families = /* @__PURE__ */ new Set();
  const fontFaceRe = /@font-face\s*\{[^}]*\}/gi;
  const familyRe = /font-family\s*:\s*(['"]?)([^;'"]+)\1/i;
  for (const style of styles) {
    const content = stripCssComments2(style.content);
    let match;
    while ((match = fontFaceRe.exec(content)) !== null) {
      const familyMatch = match[0].match(familyRe);
      if (familyMatch?.[2]) {
        families.add(familyMatch[2].trim().toLowerCase());
      }
    }
  }
  return families;
}
function normalizeUsedFontName(part) {
  const name = part.trim().replace(/\s*!important\s*$/i, "").replace(/^['"]|['"]$/g, "").trim().toLowerCase();
  if (!name || name.includes("(") || name.includes(")")) return null;
  return name;
}
function extractUsedFontFamilies(styles) {
  const used = [];
  const seen = /* @__PURE__ */ new Set();
  const propRe = /font-family\s*:\s*([^;}{]+)/gi;
  for (const style of styles) {
    const withoutFontFace = stripCssComments2(style.content).replace(/@font-face\s*\{[^}]*\}/gi, "");
    let match;
    while ((match = propRe.exec(withoutFontFace)) !== null) {
      for (const part of match[1].split(",")) {
        const name = normalizeUsedFontName(part);
        if (name && !GENERIC_FAMILIES.has(name) && !seen.has(name)) {
          seen.add(name);
          used.push(name);
        }
      }
    }
  }
  return used;
}
function collectAliasedFonts(used, declared) {
  const aliased = [];
  for (const name of used) {
    if (declared.has(name)) continue;
    const displayName = resolveAliasDisplayName(name);
    if (!displayName) continue;
    if (displayName.toLowerCase() === name) continue;
    aliased.push(`'${name}' \u2192 ${displayName}`);
  }
  return aliased;
}
function normalizeFontFamily(name) {
  const decoded = name.replace(/\+/g, " ").trim();
  if (!decoded) return null;
  try {
    return decodeURIComponent(decoded).trim().toLowerCase() || null;
  } catch {
    return decoded.toLowerCase();
  }
}
function extractGoogleFontFamiliesFromUrl(rawUrl) {
  const url = rawUrl.replace(/&amp;/gi, "&");
  let parsed;
  try {
    parsed = new URL(url, "https://fonts.googleapis.com");
  } catch {
    return [];
  }
  if (parsed.hostname.toLowerCase() !== "fonts.googleapis.com") return [];
  const families = [];
  for (const value of parsed.searchParams.getAll("family")) {
    for (const familySpec of value.split("|")) {
      const family = normalizeFontFamily(familySpec.split(":")[0] || "");
      if (family) families.push(family);
    }
  }
  return families;
}
function collectGoogleFontFamilies(source, styles) {
  const families = /* @__PURE__ */ new Set();
  const addUrl = (url) => {
    for (const family of extractGoogleFontFamiliesFromUrl(url)) families.add(family);
  };
  const linkHrefRe = /<link\b[^>]*\bhref\s*=\s*(?:(["'])([^"']*fonts\.googleapis\.com[^"']*)\1|([^\s>]*fonts\.googleapis\.com[^\s>]*))[^>]*>/gi;
  for (const match of source.matchAll(linkHrefRe)) {
    const href = match[2] || match[3];
    if (href) addUrl(href);
  }
  const importUrlRe = /@import\s+(?:url\(\s*)?(["']?)([^"')\s]*fonts\.googleapis\.com[^"')\s]*)\1\s*\)?/gi;
  for (const style of styles) {
    for (const match of style.content.matchAll(importUrlRe)) {
      if (match[2]) addUrl(match[2]);
    }
  }
  return families;
}
var fontRules = [
  // system_font_will_alias — only for distributed / Lambda renders, where
  // system-font capture is disabled and the alias substitution does NOT happen,
  // so the font silently falls back to whatever the OS provides. Under a local
  // render the substitution is the renderer working as designed, not a defect,
  // so there is nothing for the author to act on.
  ({ styles, options }) => {
    if (!options.distributed) return [];
    const declared = extractFontFaceFamilies(styles);
    const used = extractUsedFontFamilies(styles);
    const aliased = collectAliasedFonts(used, declared);
    if (aliased.length === 0) return [];
    return [
      {
        code: "system_font_will_alias",
        severity: "warning",
        message: `Font ${aliased.length === 1 ? "family" : "families"} will be substituted at render time: ${aliased.join(", ")}. In distributed/Lambda rendering system-font capture is disabled \u2014 these fonts will fall back to OS defaults. Embed explicit @font-face declarations instead.`
      }
    ];
  },
  // font_family_without_font_face
  ({ styles, source, rawSource, options, locate }) => {
    if (isRegistrySourceFile(options.filePath) || isRegistryInstalledFile(rawSource)) return [];
    const findings = [];
    const declared = extractFontFaceFamilies(styles);
    const used = extractUsedFontFamilies(styles);
    const googleFonts = collectGoogleFontFamilies(source, styles);
    const undeclared = used.filter(
      (name) => !declared.has(name) && !FONT_ALIAS_KEYS.has(name) && !googleFonts.has(name.replace(/\+/g, " "))
    );
    if (undeclared.length === 0) return findings;
    findings.push({
      ...uniqueFontLocation(styles, undeclared, locate),
      code: "font_family_without_font_face",
      severity: "error",
      message: `Font ${undeclared.length === 1 ? "family" : "families"} used without @font-face declaration: ${undeclared.join(", ")}. These are not in the auto-resolved font list, so the renderer cannot supply them automatically. Text will fall back to a generic font, producing incorrect typography in the video.`,
      fixHint: "Add @font-face { font-family: '...'; src: url('capture/assets/fonts/...woff2'); } for each font family, pointing to the captured .woff2 files. For an OS-bundled system font (e.g. Hiragino Sans, Microsoft YaHei) that has no downloadable file, use src: local('Exact Font Name') instead \u2014 the declaration alone satisfies this check without needing a font file."
    });
    return findings;
  }
];
function uniqueFontLocation(styles, families, locate) {
  const locations = [];
  for (const style of styles) {
    try {
      postcss3.parse(style.content).walkDecls(/^font-family$/i, (decl) => {
        let parent = decl.parent;
        while (parent) {
          if (parent.type === "atrule" && parent.name.toLowerCase() === "font-face") return;
          parent = parent.parent;
        }
        if (!decl.value.split(",").some((part) => families.includes(normalizeUsedFontName(part) ?? "")))
          return;
        locations.push(locate(style, decl.source?.start?.offset));
      });
    } catch {
      return {};
    }
  }
  return locations.length === 1 ? locations[0] : {};
}
function parseTiming(raw) {
  const startStr = readAttr(raw, "data-start");
  if (startStr === null) return null;
  const start = Number(startStr);
  if (!Number.isFinite(start)) return null;
  const durationStr = readAttr(raw, "data-duration");
  if (durationStr !== null) {
    const duration = Number(durationStr);
    if (Number.isFinite(duration)) return { start, duration };
  }
  const endStr = readAttr(raw, "data-end") ?? readAttr(raw, "data-hf-authored-end");
  if (endStr !== null) {
    const end = Number(endStr);
    if (Number.isFinite(end) && end > start) return { start, duration: end - start };
  }
  return null;
}
function collectCompositionIdScenes(ctx, seen, out) {
  for (const tag of ctx.tags) {
    const compositionId = readDecodedAttr(tag.raw, "data-composition-id");
    if (!compositionId || !isSceneLikeCompositionId(compositionId) || seen.has(compositionId))
      continue;
    const timing = parseTiming(tag.raw);
    if (!timing || timing.duration <= 0) continue;
    seen.add(compositionId);
    out.push({ id: compositionId, ...timing });
  }
}
function extractScenesFromClips(ctx) {
  const seen = /* @__PURE__ */ new Set();
  const scenes = [];
  collectCompositionIdScenes(ctx, seen, scenes);
  return scenes;
}
var slideshowRules = [
  (ctx) => {
    const findings = [];
    let manifest;
    try {
      manifest = parseSlideshowManifest(ctx.source);
    } catch (e) {
      findings.push({
        code: "slideshow_invalid",
        severity: "error",
        message: `Slideshow island contains invalid JSON or structure: ${e instanceof Error ? e.message : String(e)}`,
        fixHint: 'Ensure the <script type="application/hyperframes-slideshow+json"> block contains valid JSON matching the SlideshowManifest schema.'
      });
      return findings;
    }
    if (!manifest) return findings;
    const scenes = extractScenesFromClips(ctx);
    const { errors } = resolveSlideshow(manifest, scenes);
    for (const error of errors) {
      findings.push({
        code: "slideshow_unresolved_ref",
        severity: "error",
        message: `Slideshow manifest error: ${error}`,
        fixHint: "Ensure every sceneId in the slideshow island matches the data-composition-id of a scene element in the composition, or provide explicit startTime/endTime."
      });
    }
    return findings;
  }
];
var INLINE_TEXT_TAGS = /* @__PURE__ */ new Set([
  "br",
  "wbr",
  "b",
  "i",
  "u",
  "s",
  "em",
  "strong",
  "small",
  "sub",
  "sup",
  "mark",
  "span",
  "a",
  "code",
  "abbr"
]);
var OPAQUE_TAGS = /* @__PURE__ */ new Set([
  "svg",
  "canvas",
  "picture",
  "video",
  "audio",
  "select",
  "textarea",
  "iframe",
  "object"
]);
var NON_LAYOUT_TAGS = /* @__PURE__ */ new Set(["style", "script", "template", "noscript"]);
var MEDIA_TAGS2 = /* @__PURE__ */ new Set(["video", "audio", "img"]);
var NODE_ATTRS = [
  "id",
  "class",
  "data-start",
  "data-duration",
  "data-end",
  "data-track",
  "data-track-index",
  "data-track-kind",
  "data-composition-id",
  "data-composition-src"
];
function toNode(open) {
  const attrs = {};
  for (const name of NODE_ATTRS) attrs[name] = readDecodedAttr(open.raw, name) ?? void 0;
  return { tag: open.name, attrs, children: [], open };
}
function enclosing(stack, root, index) {
  let top = stack.at(-1);
  while (top && stack.length > 1 && index >= top.end) {
    stack.pop();
    top = stack.at(-1);
  }
  return top?.node ?? root;
}
function buildTree(ctx) {
  const { rootTag } = ctx;
  const rootEnd = rootTag?.closeIndex;
  if (!rootTag || rootEnd == null) return null;
  const root = toNode(rootTag);
  const stack = [{ node: root, end: rootEnd }];
  for (const tag of ctx.tags.filter((t) => t.index > rootTag.index && t.index < rootEnd)) {
    const node = toNode(tag);
    enclosing(stack, root, tag.index).children.push(node);
    if (tag.closeIndex != null) stack.push({ node, end: tag.closeIndex });
  }
  return root;
}
function hasNestedStructure(node) {
  if (OPAQUE_TAGS.has(node.tag)) return null;
  for (const child of node.children) {
    if (NON_LAYOUT_TAGS.has(child.tag)) continue;
    if (!INLINE_TEXT_TAGS.has(child.tag)) return child;
    const deeper = hasNestedStructure(child);
    if (deeper) return deeper;
  }
  return null;
}
var describe = (node) => `<${node.tag}${node.attrs.id ? ` id="${node.attrs.id}"` : ""}>`;
function nestedStructureFindings(rows, severity) {
  return rows.flatMap((row) => {
    const nested = isSubCompositionHost(row) ? null : hasNestedStructure(row);
    if (!nested) return [];
    return [
      {
        code: "nested_structure_needs_subcomposition",
        severity,
        message: `${describe(row)} is a timeline element that contains nested ${describe(nested)}. The timeline shows one row per top-level element, and the root composition is built only from sub-compositions.`,
        elementId: row.attrs.id,
        fixHint: `Move ${describe(row)} and its contents into a sub-composition file and mount it with data-composition-src.`
      }
    ];
  });
}
function missingDurationFindings(rows, severity) {
  return rows.filter(
    (row) => !MEDIA_TAGS2.has(row.tag) && row.attrs["data-duration"] === void 0 && row.attrs["data-end"] === void 0 && !isSubCompositionHost(row)
  ).map((row) => ({
    code: "timeline_element_missing_timing",
    severity,
    message: `${describe(row)} is a timeline element without data-duration, so the timeline cannot draw where it ends.`,
    elementId: row.attrs.id,
    fixHint: `Add data-duration (in seconds) to ${describe(row)}.`
  }));
}
function captionFindings(rows, severity) {
  const captionRows = rows.filter((row) => trackKindOf(row).kind === "captions");
  const findings = captionRows.filter((row) => trackKindOf(row).source === "legacy-captions").map((row) => ({
    code: "caption_track_kind_missing",
    severity,
    message: `${describe(row)} looks like captions but is not marked as such, so the timeline cannot group it on the caption track.`,
    elementId: row.attrs.id,
    fixHint: `Add data-track-kind="captions" to ${describe(row)}.`
  }));
  const lanes = new Set(
    captionRows.flatMap((row) => row.attrs["data-track-index"] ?? row.attrs["data-track"] ?? [])
  );
  if (lanes.size > 1) {
    findings.push({
      code: "multiple_caption_tracks",
      severity,
      message: `Captions are spread across ${lanes.size} timeline tracks. Keep all captions on one track.`,
      fixHint: "Give every caption element the same data-track-index."
    });
  }
  return findings;
}
var hundredths = (seconds) => Math.round(seconds * 100) / 100;
function clipsPastRootFindings(root, rows) {
  if (root.attrs["data-composition-id"] === void 0) return [];
  const rootDuration = readDataDurationSeconds((name) => root.attrs[name]);
  if (rootDuration === null) return [];
  const limit = hundredths(rootDuration);
  return rows.flatMap((row) => {
    const { start, end } = readClipTiming({ getAttribute: (name) => row.attrs[name] ?? null });
    if (start === null || end === null || end <= rootDuration + TIMING_TOLERANCE_SECONDS) return [];
    return [
      {
        code: "clip_ends_past_root_duration",
        severity: "warning",
        message: `${describe(row)} runs from ${hundredths(start)}s to ${hundredths(end)}s, past the root composition's data-duration of ${limit}s, so it is cut off in previews, posters and renders.`,
        elementId: row.attrs.id,
        fixHint: `Extend the root data-duration to ${hundredths(end)}, or make ${describe(row)} end at or before ${limit}s.`,
        snippet: truncateSnippet(row.open.raw)
      }
    ];
  });
}
var structureRules = [
  (ctx) => {
    if (ctx.options.isSubComposition) return [];
    const root = buildTree(ctx);
    if (!root) return [];
    const severity = ctx.options.host === "studio" ? "error" : "warning";
    const rows = topLevelElements(root);
    return [
      ...nestedStructureFindings(rows, severity),
      ...missingDurationFindings(rows, severity),
      ...captionFindings(rows, severity),
      ...clipsPastRootFindings(root, rows)
    ];
  }
];
var RULE_GROUPS = [
  { group: "core", rules: coreRules },
  { group: "media", rules: mediaRules },
  { group: "gsap", rules: gsapRules },
  { group: "captions", rules: captionRules },
  { group: "composition", rules: compositionRules },
  { group: "adapters", rules: adapterRules },
  { group: "textures", rules: textureRules },
  { group: "fonts", rules: fontRules },
  { group: "slideshow", rules: slideshowRules },
  { group: "structure", rules: structureRules }
];
var LINT_RULE_COUNT = RULE_GROUPS.reduce((n, g) => n + g.rules.length, 0);
var LINT_RULE_GROUP_COUNTS = Object.fromEntries(
  RULE_GROUPS.map(({ group, rules }) => [group, rules.length])
);
function dedupeKeyFor(finding) {
  return [
    finding.code,
    finding.severity,
    finding.selector || "",
    finding.elementId || "",
    finding.message
  ].join("|");
}
async function runRules(ctx, filePath) {
  const findings = [];
  const seen = /* @__PURE__ */ new Set();
  const groupMs = {};
  let slowestRule = "";
  let slowestRuleMs = 0;
  for (const { group, rules } of RULE_GROUPS) {
    for (let index = 0; index < rules.length; index++) {
      const ruleStartedAt = performance.now();
      const produced = await Promise.resolve(rules[index](ctx));
      const ruleMs = performance.now() - ruleStartedAt;
      groupMs[group] = (groupMs[group] ?? 0) + ruleMs;
      if (ruleMs > slowestRuleMs) {
        slowestRuleMs = ruleMs;
        slowestRule = `${group}#${index}`;
      }
      collectFindings(produced, seen, filePath, findings);
    }
  }
  return { findings, timings: { groupMs, slowestRule, slowestRuleMs } };
}
function collectFindings(produced, seen, filePath, into) {
  for (const finding of produced) {
    const dedupeKey = dedupeKeyFor(finding);
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    into.push(filePath ? { ...finding, file: finding.file ?? filePath } : finding);
  }
}
async function lintHyperframeHtml(html, options = {}) {
  const startedAt = performance.now();
  const ctx = buildLintContext(html, options);
  const { findings: rawFindings, timings } = await runRules(ctx, options.filePath);
  const locate = createSourceLocator(html);
  const findings = rawFindings.map((finding) => {
    if (finding.line !== void 0 || finding.code === "invalid_inline_script_syntax" || finding.code === "non_deterministic_code" || [
      "gsap_infinite_repeat",
      "gsap_repeat_ceil_overshoot",
      "gsap_repeat_floor_unclamped"
    ].includes(finding.code))
      return finding;
    if (finding.snippet && options.externalStyles?.some(
      (style) => style.content.replace(/\s+/g, " ").includes(finding.snippet.replace(/\.\.\.$/, ""))
    ))
      return finding;
    return { ...finding, ...locate(finding) };
  });
  const errorCount = findings.filter((f) => f.severity === "error").length;
  const warningCount = findings.filter((f) => f.severity === "warning").length;
  const infoCount = findings.filter((f) => f.severity === "info").length;
  return {
    ok: errorCount === 0,
    errorCount,
    warningCount,
    infoCount,
    findings,
    timings: { totalMs: performance.now() - startedAt, ...timings }
  };
}
function extractMediaUrls(html) {
  const results = [];
  for (const { name: tagName, raw } of parseHtmlStructure(html).tags) {
    if (!/^(?:video|audio|img|source)$/.test(tagName)) continue;
    const src = readAttr(raw, "src");
    if (!src) continue;
    if (/^https?:\/\//i.test(src)) {
      results.push({
        url: src,
        tagName,
        elementId: readAttr(raw, "id") || void 0,
        snippet: truncateSnippet(raw) ?? ""
      });
    }
  }
  return results;
}
async function lintMediaUrls(html, options = {}) {
  const urls = extractMediaUrls(html);
  if (urls.length === 0) return [];
  const timeout = options.timeoutMs ?? 8e3;
  const findings = [];
  const seen = /* @__PURE__ */ new Set();
  const unique = urls.filter((u) => {
    if (seen.has(u.url)) return false;
    seen.add(u.url);
    return true;
  });
  const checks = unique.map(async ({ url, tagName, elementId, snippet }) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      const resp = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
        redirect: "follow"
      });
      clearTimeout(timer);
      if (!resp.ok) {
        findings.push({
          code: "inaccessible_media_url",
          severity: "error",
          message: `<${tagName}${elementId ? ` id="${elementId}"` : ""}> references a URL that returned HTTP ${resp.status}: ${url.slice(0, 100)}`,
          elementId,
          fixHint: "This URL is not accessible. Replace with a valid, reachable media URL.",
          snippet
        });
      }
    } catch (err) {
      const reason = err instanceof Error ? err.name : "unknown";
      findings.push({
        code: "inaccessible_media_url",
        severity: "error",
        message: `<${tagName}${elementId ? ` id="${elementId}"` : ""}> references an unreachable URL (${reason}): ${url.slice(0, 100)}`,
        elementId,
        fixHint: "This URL is not accessible. Replace with a valid, reachable media URL.",
        snippet
      });
    }
  });
  await Promise.all(checks);
  return findings;
}
function shouldBlockRender(strictErrors, strictAll, totalErrors, totalWarnings) {
  return strictErrors && totalErrors > 0 || strictAll && (totalErrors > 0 || totalWarnings > 0);
}
var PROBE_TIMEOUT_MS = 4e3;
var PROBE_CONCURRENCY = 8;
function execFileAsync(file, args) {
  return new Promise((resolvePromise, reject) => {
    execFile(file, args, { timeout: PROBE_TIMEOUT_MS, windowsHide: true }, (error, stdout) => {
      if (error) reject(error);
      else resolvePromise(stdout.toString());
    });
  });
}
async function mapWithProbeConcurrency(entries, probe) {
  const results = new Array(entries.length);
  let nextIndex = 0;
  const workerCount = Math.min(PROBE_CONCURRENCY, entries.length);
  const runWorker = async () => {
    for (; ; ) {
      const index = nextIndex++;
      if (index >= entries.length) return;
      const entry = entries[index];
      if (entry !== void 0) results[index] = await probe(entry);
    }
  };
  await Promise.all(Array.from({ length: workerCount }, runWorker));
  return results;
}
function resolveLocalVideoReference(projectDir, rawSrc, compSrcPath) {
  if (isUnresolvedAssetPlaceholder(rawSrc)) return null;
  const src = cleanAssetUrl(rawSrc);
  if (!src || isRemoteOrInlineUrl(src)) return null;
  const rootRelative = compSrcPath ? rewriteAssetPath(compSrcPath, src, (path) => existsSync(join(projectDir, path))) : src;
  const asset = resolveExistingLocalAsset(projectDir, rootRelative);
  return asset ? { resolved: asset.resolved, src } : null;
}
function hasHevcStream(json) {
  if (typeof json !== "object" || json === null) return false;
  const streams = Reflect.get(json, "streams");
  if (!Array.isArray(streams)) return false;
  return streams.some((stream) => {
    if (typeof stream !== "object" || stream === null) return false;
    return Reflect.get(stream, "codec_name") === "hevc";
  });
}
async function probeIsHevc(ffprobePath, filePath) {
  try {
    const stdout = await execFileAsync(ffprobePath, [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=codec_name",
      "-of",
      "json",
      "--",
      filePath
    ]);
    return hasHevcStream(JSON.parse(stdout));
  } catch {
    return false;
  }
}
function collectLocalVideoCandidates(projectDir, htmlSources) {
  const candidates = /* @__PURE__ */ new Map();
  const videoSrcRe = mediaSrcTagRe("video");
  for (const { html, compSrcPath } of htmlSources) {
    const scannable = maskNonScannableRanges(html);
    const re = new RegExp(videoSrcRe.source, videoSrcRe.flags);
    let match;
    while ((match = re.exec(scannable)) !== null) {
      const rawSrc = match[2] ?? "";
      const reference = resolveLocalVideoReference(projectDir, rawSrc, compSrcPath);
      if (!reference || candidates.has(reference.resolved)) continue;
      candidates.set(reference.resolved, reference.src);
    }
  }
  return candidates;
}
function collectVideoElements(html) {
  const { document } = parseHTML(html);
  const roots = [document];
  const videos = [];
  for (let index = 0; index < roots.length; index++) {
    const root = roots[index];
    if (!root) continue;
    videos.push(...root.querySelectorAll("video"));
    for (const template of root.querySelectorAll("template")) {
      roots.push(template.content);
    }
  }
  return videos;
}
function readPositiveNumber(raw) {
  const value = parseNumeric(raw);
  return value !== null && value > 0 ? value : null;
}
function readNonNegativeNumber(raw) {
  const value = parseNumeric(raw);
  return value !== null && value >= 0 ? value : null;
}
function readFiniteVideoSlot(video, file) {
  if (video.hasAttribute("loop")) return null;
  if (video.hasAttribute("data-var-src")) return null;
  if (video.hasAttribute("data-playback-start")) return null;
  if (readPositiveNumber(video.getAttribute("data-duration")) === null) return null;
  const mediaStart = readNonNegativeNumber(video.getAttribute("data-media-start"));
  if (mediaStart === null) return null;
  return {
    rawSrc: video.getAttribute("src") ?? "",
    file,
    ...video.id ? { elementId: video.id } : {},
    mediaStart
  };
}
function collectLocalFiniteVideoSlots(projectDir, htmlSources) {
  const slotsByPath = /* @__PURE__ */ new Map();
  for (const { html, compSrcPath } of htmlSources) {
    for (const video of collectVideoElements(html)) {
      const slot = readFiniteVideoSlot(video, compSrcPath ?? "index.html");
      if (!slot) continue;
      const reference = resolveLocalVideoReference(projectDir, slot.rawSrc, compSrcPath);
      if (!reference) continue;
      const slots = slotsByPath.get(reference.resolved) ?? [];
      slots.push({
        src: reference.src,
        file: slot.file,
        ...slot.elementId ? { elementId: slot.elementId } : {},
        mediaStart: slot.mediaStart
      });
      slotsByPath.set(reference.resolved, slots);
    }
  }
  return slotsByPath;
}
function parsePositiveDuration(value) {
  const duration = typeof value === "number" || typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(duration) && duration > 0 ? duration : null;
}
function readPlayableVideoDuration(stdout) {
  try {
    const metadata = JSON.parse(stdout);
    if (typeof metadata !== "object" || metadata === null) return null;
    const streams = Reflect.get(metadata, "streams");
    const stream = Array.isArray(streams) ? streams.find((candidate) => typeof candidate === "object" && candidate !== null) : null;
    const streamDuration = stream ? parsePositiveDuration(Reflect.get(stream, "duration")) : null;
    if (streamDuration !== null) return streamDuration;
    const format = Reflect.get(metadata, "format");
    return typeof format === "object" && format !== null ? parsePositiveDuration(Reflect.get(format, "duration")) : null;
  } catch {
    return null;
  }
}
async function probePlayableVideoDuration(ffprobePath, filePath) {
  try {
    return readPlayableVideoDuration(
      await execFileAsync(ffprobePath, [
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=duration:format=duration",
        "-of",
        "json",
        "--",
        filePath
      ])
    );
  } catch {
    return null;
  }
}
async function lintVideoMediaStartPastEof(projectDir, htmlSources) {
  const slotsByPath = collectLocalFiniteVideoSlots(projectDir, htmlSources);
  if (slotsByPath.size === 0) return [];
  const ffprobePath = findFfBinary("ffprobe", { configuredMustExist: true });
  if (!ffprobePath) return [];
  const entries = [...slotsByPath.entries()];
  const durations = await mapWithProbeConcurrency(
    entries,
    (entry) => probePlayableVideoDuration(ffprobePath, entry[0])
  );
  const findings = [];
  for (const [index, [, slots]] of entries.entries()) {
    const sourceDuration = durations[index];
    if (sourceDuration == null) continue;
    for (const slot of slots) {
      if (slot.mediaStart < sourceDuration) continue;
      findings.push({
        code: "video_media_start_at_or_past_eof",
        severity: "warning",
        message: `Video "${slot.src}" starts at ${slot.mediaStart}s, at or past its ${sourceDuration}s playable source duration. The video will hold its final frame for the explicit slot.`,
        file: slot.file,
        ...slot.elementId ? { elementId: slot.elementId } : {},
        fixHint: `Trim data-media-start below ${sourceDuration}s if this final-frame hold is unintended.`
      });
    }
  }
  return findings;
}
async function lintHevcPreviewCodec(candidates) {
  if (candidates.size === 0) return [];
  const ffprobePath = findFfBinary("ffprobe", { configuredMustExist: true });
  if (!ffprobePath) return [];
  const entries = [...candidates.entries()];
  const isHevc = await mapWithProbeConcurrency(
    entries,
    (entry) => probeIsHevc(ffprobePath, entry[0])
  );
  const hevcSrcs = entries.filter((_, i) => isHevc[i]).map(([, src]) => src);
  if (hevcSrcs.length === 0) return [];
  const unique = [...new Set(hevcSrcs)];
  return [
    {
      code: "hevc_preview_codec",
      severity: "info",
      message: `Video file(s) use the HEVC/H.265 codec: ${unique.join(", ")}. The render pipeline pre-decodes video with FFmpeg and never uses the browser's video decoder, so these render correctly. Live preview/player playback automatically uses a cached H.264 proxy when the browser cannot decode HEVC. If playback still fails, verify ffmpeg/ffprobe are installed and auto-proxying is enabled.`,
      fixHint: unique.length === 1 ? `If "${unique[0]}" fails to play in preview, run hyperframes doctor and confirm media.autoProxy is not false.` : "If these files fail to play in preview, run hyperframes doctor and confirm media.autoProxy is not false."
    }
  ];
}
function parseSubCompHtml(html) {
  return parseHTML(html).document;
}
var sourceFile = (projectDir, compSrcPath) => resolve(projectDir, compSrcPath ?? "index.html");
function querySelectorAllIncludingTemplates(root, selector) {
  const matches = [...root.querySelectorAll(selector)];
  for (const template of root.querySelectorAll("template")) {
    const content = template.content;
    if (content) matches.push(...querySelectorAllIncludingTemplates(content, selector));
  }
  return matches;
}
function contentDigest(html) {
  return createHash("sha256").update(html).digest("hex").slice(0, 16);
}
var AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([".mp3", ".wav", ".aac", ".ogg", ".m4a", ".flac", ".opus"]);
var MASK_IMAGE_URL_RE = /\b(?:-webkit-)?mask-image\s*:\s*[^;{}]*url\(\s*(?:"([^"]+)"|'([^']+)'|([^"')\s]+))\s*\)/gi;
function isLocalStylesheetHref(href) {
  return !!href && !/^(https?:|data:|blob:|\/\/)/i.test(href);
}
function collectLocalStylesheets(projectDir, document, compSrcPath) {
  const styles = [];
  for (const link of querySelectorAllIncludingTemplates(document, "link")) {
    const rel = link.getAttribute("rel") ?? "";
    if (!rel.split(/\s+/).some((part) => part.toLowerCase() === "stylesheet")) continue;
    const href = link.getAttribute("href") ?? "";
    if (!isLocalStylesheetHref(href)) continue;
    const rootRelative = compSrcPath ? join2(dirname(compSrcPath), href) : href;
    const stylesheet = resolveExistingLocalAsset(projectDir, rootRelative);
    if (!stylesheet) continue;
    styles.push({
      href,
      content: readFileSync(stylesheet.resolved, "utf-8"),
      rootRelativePath: stylesheet.rootRelativePath
    });
  }
  return styles;
}
function collectExternalStyles(projectDir, html, compSrcPath) {
  const styles = [];
  const { document } = parseHTML(html);
  for (const { href, content, rootRelativePath } of collectLocalStylesheets(
    projectDir,
    document,
    compSrcPath
  )) {
    styles.push({ href, content, file: join2(projectDir, rootRelativePath) });
  }
  return styles;
}
function collectCssSources(projectDir, html, compSrcPath) {
  const sources = [];
  const { document } = parseHTML(html);
  for (const style of querySelectorAllIncludingTemplates(document, "style")) {
    sources.push({ content: style.textContent ?? "" });
  }
  for (const { content, rootRelativePath } of collectLocalStylesheets(
    projectDir,
    document,
    compSrcPath
  )) {
    sources.push({ content, rootRelativePath });
  }
  for (const element of querySelectorAllIncludingTemplates(document, "[style]")) {
    const style = element.getAttribute("style");
    if (!style) continue;
    sources.push({ content: style });
  }
  return sources;
}
function resolveCssAssetCandidates(projectDir, url, htmlCompSrcPath, cssRootRelativePath) {
  if (url.startsWith("/")) return resolveLocalAssetCandidates(projectDir, url);
  if (cssRootRelativePath) {
    return resolveLocalAssetCandidates(projectDir, join2(dirname(cssRootRelativePath), url));
  }
  if (htmlCompSrcPath) {
    return resolveLocalAssetCandidates(
      projectDir,
      rewriteAssetPath(htmlCompSrcPath, url, (path) => existsSync2(join2(projectDir, path)))
    );
  }
  return resolveLocalAssetCandidates(projectDir, url);
}
async function lintProject(projectDir, entryFile, hostOptions = {}) {
  const indexPath = entryFile ? resolve(entryFile) : resolve(projectDir, "index.html");
  if (entryFile && !isWithinProjectRoot(projectDir, indexPath)) {
    throw new Error(`Explicit lint entry is outside the project directory: ${entryFile}`);
  }
  const rootFile = relative(resolve(projectDir), indexPath).replace(/\\/g, "/") || "index.html";
  const rootCompSrcPath = rootFile === "index.html" ? void 0 : rootFile;
  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfos = 0;
  const rootHtml = readFileSync(indexPath, "utf-8");
  const rootResult = await lintHyperframeHtml(rootHtml, {
    ...hostOptions,
    filePath: indexPath,
    externalStyles: collectExternalStyles(projectDir, rootHtml, rootCompSrcPath)
  });
  results.push({ file: rootFile, result: rootResult, contentHash: contentDigest(rootHtml) });
  totalErrors += rootResult.errorCount;
  totalWarnings += rootResult.warningCount;
  totalInfos += rootResult.infoCount;
  const allHtmlSources = [{ html: rootHtml, compSrcPath: rootCompSrcPath }];
  const compositionsDir = resolve(projectDir, "compositions");
  if (!entryFile && existsSync2(compositionsDir)) {
    const collectHtmlFiles = (dir, rel) => {
      const out = [];
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const relPath = rel ? `${rel}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          if (!rel && entry.name === "components") continue;
          out.push(...collectHtmlFiles(join2(dir, entry.name), relPath));
        } else if (entry.isFile() && entry.name.endsWith(".html") && !entry.name.startsWith("._")) {
          out.push(relPath);
        }
      }
      return out;
    };
    const files = collectHtmlFiles(compositionsDir, "").sort();
    for (const file of files) {
      const filePath = join2(compositionsDir, file);
      const html = readFileSync(filePath, "utf-8");
      const compSrcPath = `compositions/${file}`;
      allHtmlSources.push({ html, compSrcPath });
      if (isSnippetFragment(html)) continue;
      const result = await lintHyperframeHtml(html, {
        ...hostOptions,
        filePath,
        isSubComposition: true,
        externalStyles: collectExternalStyles(projectDir, html, compSrcPath)
      });
      results.push({
        file: `compositions/${file}`,
        result,
        contentHash: contentDigest(html)
      });
      totalErrors += result.errorCount;
      totalWarnings += result.warningCount;
      totalInfos += result.infoCount;
    }
  }
  const projectFindings = [
    ...lintProjectAudioFiles(projectDir, allHtmlSources),
    ...lintAudioSrcNotFound(projectDir, allHtmlSources),
    ...lintMissingLocalAsset(projectDir, allHtmlSources),
    ...lintTextureMaskAssetNotFound(projectDir, allHtmlSources),
    ...!entryFile ? lintMultipleRootCompositions(projectDir) : [],
    ...!entryFile ? lintBlankRootWithStandaloneComposition(rootHtml, allHtmlSources) : [],
    ...lintDuplicateAudioTracks(allHtmlSources),
    ...lintMissingOrEmptySubComposition(projectDir, rootHtml),
    ...await lintVideoMediaStartPastEof(projectDir, allHtmlSources),
    ...await lintHevcPreviewCodec(collectLocalVideoCandidates(projectDir, allHtmlSources))
  ];
  for (const finding of projectFindings) {
    const ownFile = finding.file && resolve(projectDir, finding.file);
    const owner = results.find((entry) => resolve(projectDir, entry.file) === ownFile)?.result ?? rootResult;
    owner.findings.push(finding);
    if (finding.severity === "error") {
      owner.errorCount++;
      owner.ok = false;
      totalErrors++;
    } else if (finding.severity === "warning") {
      owner.warningCount++;
      totalWarnings++;
    } else {
      owner.infoCount++;
      totalInfos++;
    }
  }
  return { results, totalErrors, totalWarnings, totalInfos };
}
function lintBlankRootWithStandaloneComposition(rootHtml, htmlSources) {
  const { document: rootDocument } = parseHTML(rootHtml);
  const root = rootDocument.querySelector("body [data-composition-id]");
  if (!root || root.querySelector("*:not(script):not(style):not(link):not(meta):not(template)")) {
    return [];
  }
  const standaloneCandidates = [];
  for (const source of htmlSources) {
    if (!source.compSrcPath) continue;
    const { document } = parseHTML(source.html);
    const composition = document.querySelector("body [data-composition-id]");
    if (!composition) continue;
    const authoredTimedContent = Array.from(
      composition.querySelectorAll(
        ".clip, [data-start], [data-end], video, audio, img, svg, canvas"
      )
    ).some((element) => !element.hasAttribute("data-composition-src"));
    if (authoredTimedContent) standaloneCandidates.push(source.compSrcPath);
  }
  if (standaloneCandidates.length === 0) return [];
  return [
    {
      code: "blank_root_with_standalone_composition",
      severity: "error",
      message: `The default index.html composition has no renderable content, but ${standaloneCandidates.join(", ")} contains a standalone timed composition. Default check, snapshot, preview, render, and publish commands open index.html, so they will capture or publish only its background.`,
      fixHint: `Move the authored composition into index.html, or mount it from index.html with data-composition-src and the sub-composition <template> contract. If the separate file is intentional, render it explicitly with --composition ${standaloneCandidates[0]}.`,
      suggestedComposition: standaloneCandidates[0]
    }
  ];
}
function lintProjectAudioFiles(projectDir, htmlSources) {
  const findings = [];
  let audioFiles;
  try {
    audioFiles = readdirSync(projectDir).filter(
      (f) => AUDIO_EXTENSIONS.has(extname(f).toLowerCase())
    );
  } catch {
    return findings;
  }
  if (audioFiles.length === 0) return findings;
  const hasAudioElement = htmlSources.some(({ html }) => /<audio\b/i.test(html));
  const hasAudibleVideo = htmlSources.some(
    ({ html }) => (html.match(/<video\b[^>]*>/gi) ?? []).some(isAudibleVideoTag)
  );
  if (!hasAudioElement && !hasAudibleVideo) {
    findings.push({
      code: "audio_file_without_element",
      severity: "warning",
      message: `Found audio file(s) in project (${audioFiles.join(", ")}) but no <audio> element in any composition. The rendered video will be silent.`,
      fixHint: 'Add an <audio id="my-audio" src="' + audioFiles[0] + '" data-start="0" data-duration="__DURATION__" data-track-index="0" data-volume="1"></audio> element inside the composition root. Replace __DURATION__ with the audio length in seconds.'
    });
  }
  return findings;
}
function lintAudioSrcNotFound(projectDir, htmlSources) {
  const findings = [];
  const audioSrcRe = mediaSrcTagRe("audio");
  const missingByFile = /* @__PURE__ */ new Map();
  for (const { html, compSrcPath } of htmlSources) {
    let match;
    while ((match = audioSrcRe.exec(html)) !== null) {
      const src = match[2];
      if (/^(https?:|data:|blob:)/i.test(src)) continue;
      if (isUnresolvedAssetPlaceholder(src)) continue;
      const rootRelative = compSrcPath ? rewriteAssetPath(compSrcPath, src, (path) => existsSync2(join2(projectDir, path))) : src;
      if (!existsSync2(resolveProjectRelativeSrc(rootRelative, projectDir))) {
        const file = sourceFile(projectDir, compSrcPath);
        missingByFile.set(file, (missingByFile.get(file) ?? /* @__PURE__ */ new Set()).add(src));
      }
    }
  }
  for (const [file, srcs] of missingByFile) {
    const unique = [...srcs];
    findings.push({
      code: "audio_src_not_found",
      severity: "error",
      file,
      message: `<audio> element references file(s) not found in the project: ${unique.join(", ")}. The rendered video will be silent.`,
      fixHint: unique.length === 1 ? `Add the file "${unique[0]}" to the project directory, or update the src attribute to point to an existing file.` : `Add the missing files to the project directory, or update the src attributes to point to existing files.`
    });
  }
  return findings;
}
function lintMissingLocalAsset(projectDir, htmlSources) {
  const findings = [];
  const localAssetSrcRe = mediaSrcTagRe("video|img|source");
  const missingByTag = /* @__PURE__ */ new Map();
  for (const { html, compSrcPath } of htmlSources) {
    const scannable = maskNonScannableRanges(html);
    const re = new RegExp(localAssetSrcRe.source, localAssetSrcRe.flags);
    let match;
    while ((match = re.exec(scannable)) !== null) {
      const tagName = (match[1] ?? "").toLowerCase();
      const rawSrc = match[2] ?? "";
      if (isUnresolvedAssetPlaceholder(rawSrc)) continue;
      const src = cleanAssetUrl(rawSrc);
      if (!src) continue;
      if (isRemoteOrInlineUrl(src)) continue;
      const rootRelative = compSrcPath ? rewriteAssetPath(compSrcPath, src, (path) => existsSync2(join2(projectDir, path))) : src;
      const resolvedAsset = resolveExistingLocalAsset(projectDir, rootRelative);
      if (resolvedAsset) continue;
      const resolvedKey = resolve(projectDir, rootRelative);
      const file = sourceFile(projectDir, compSrcPath);
      const bucketKey = `${file}\0${tagName}`;
      let bucket = missingByTag.get(bucketKey);
      if (!bucket) {
        bucket = { file, tagName, byResolved: /* @__PURE__ */ new Map() };
        missingByTag.set(bucketKey, bucket);
      }
      if (!bucket.byResolved.has(resolvedKey)) bucket.byResolved.set(resolvedKey, src);
    }
  }
  for (const { file, tagName, byResolved } of missingByTag.values()) {
    const unique = [...byResolved.values()];
    findings.push({
      code: "missing_local_asset",
      severity: "error",
      file,
      message: `<${tagName}> element references local file(s) not found in the project: ${unique.join(", ")}. The renderer will silently skip these and produce a video with missing visuals.`,
      fixHint: unique.length === 1 ? `Add "${unique[0]}" to the project directory, or update the src attribute to point to an existing file. Common cause: captured asset filenames are unreliable (heygen-logo.svg often contains Google, nvidia-logo.svg may contain Autodesk, etc.). Open the contact sheets and verify the file actually exists at this path before referencing it.` : "Add the missing files to the project directory, or update the src attributes to point to existing files. Captured asset filenames are unreliable \u2014 verify against capture/contact-sheets/ and capture/extracted/asset-descriptions.md."
    });
  }
  return findings;
}
function lintTextureMaskAssetNotFound(projectDir, htmlSources) {
  const missingByFile = /* @__PURE__ */ new Map();
  for (const { html, compSrcPath } of htmlSources) {
    const file = sourceFile(projectDir, compSrcPath);
    for (const cssSource of collectCssSources(projectDir, html, compSrcPath)) {
      let match;
      const pattern = new RegExp(MASK_IMAGE_URL_RE.source, MASK_IMAGE_URL_RE.flags);
      while ((match = pattern.exec(cssSource.content)) !== null) {
        const rawUrl = match[1] ?? match[2] ?? match[3] ?? "";
        if (isUnresolvedAssetPlaceholder(rawUrl)) continue;
        const url = cleanAssetUrl(rawUrl);
        if (!url || isRemoteOrInlineUrl(url)) continue;
        const candidates = resolveCssAssetCandidates(
          projectDir,
          url,
          compSrcPath,
          cssSource.rootRelativePath
        );
        if (candidates.some(existsSync2)) continue;
        missingByFile.set(file, (missingByFile.get(file) ?? /* @__PURE__ */ new Set()).add(url));
      }
    }
  }
  return [...missingByFile].map(([file, found]) => {
    const urls = [...found];
    return {
      code: "texture_mask_asset_not_found",
      severity: "error",
      file,
      message: `CSS mask-image references file(s) not found in the project: ${urls.join(", ")}.`,
      fixHint: urls.length === 1 ? `Add "${urls[0]}" to the project, or update the mask-image URL to point to an existing texture mask.` : "Add the missing texture mask files to the project, or update the mask-image URLs to point to existing files."
    };
  });
}
function lintMultipleRootCompositions(projectDir) {
  const findings = [];
  try {
    const rootHtmlFiles = readdirSync(projectDir).filter(
      (file) => file.endsWith(".html") && !file.startsWith("._")
    );
    const rootCompositions = [];
    for (const file of rootHtmlFiles) {
      if (file === "caption-skin.html") continue;
      const content = readFileSync(join2(projectDir, file), "utf-8");
      if (/data-composition-id/i.test(content)) {
        rootCompositions.push(file);
      }
    }
    if (rootCompositions.length > 1) {
      findings.push({
        code: "multiple_root_compositions",
        severity: "error",
        message: `Multiple root-level HTML files with data-composition-id: ${rootCompositions.join(", ")}. The runtime may discover both as entry points, causing duplicate audio playback.`,
        fixHint: "A project should have exactly one root index.html with data-composition-id. Remove or rename extra files."
      });
    }
  } catch {
  }
  return findings;
}
function lintDuplicateAudioTracks(htmlSources) {
  const findings = [];
  function extractAttr(tag, name) {
    const re = new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "i");
    const m = tag.match(re);
    return m?.[1] ?? null;
  }
  const tracks = [];
  const seen = /* @__PURE__ */ new Set();
  for (const { html } of htmlSources) {
    const soundTagRe = /<(?:audio|video)\b[^>]*>/gi;
    let match;
    while ((match = soundTagRe.exec(html)) !== null) {
      const tag = match[0];
      if (/^<video/i.test(tag) && !isAudibleVideoTag(tag)) continue;
      const trackStr = extractAttr(tag, "data-track-index");
      const startStr = extractAttr(tag, "data-start");
      const durStr = extractAttr(tag, "data-duration");
      const src = extractAttr(tag, "src") ?? "unknown";
      if (!trackStr || !startStr) continue;
      const trackIndex = parseInt(trackStr, 10);
      const start = parseFloat(startStr);
      const duration = durStr ? parseFloat(durStr) : Infinity;
      const key = `${src}:${start}:${duration}:${trackIndex}`;
      if (seen.has(key)) continue;
      seen.add(key);
      tracks.push({ trackIndex, start, end: start + duration, src });
    }
  }
  for (let i = 0; i < tracks.length; i++) {
    for (let j = i + 1; j < tracks.length; j++) {
      const a = tracks[i];
      const b = tracks[j];
      if (a.trackIndex !== b.trackIndex) continue;
      if (a.start < b.end && b.start < a.end) {
        findings.push({
          code: "duplicate_audio_track",
          severity: "warning",
          message: `Multiple audible <audio>/<video> elements on track ${a.trackIndex} overlap (${a.src} at ${a.start}-${Number.isFinite(a.end) ? a.end.toFixed(1) : "end"}s, ${b.src} at ${b.start}-${Number.isFinite(b.end) ? b.end.toFixed(1) : "end"}s). This causes layered audio playback.`,
          fixHint: "Use non-overlapping time windows or different track indices."
        });
      }
    }
  }
  return findings;
}
function lintMissingOrEmptySubComposition(projectDir, rootHtml) {
  const checked = /* @__PURE__ */ new Map();
  const visited = /* @__PURE__ */ new Set();
  const walk = (html) => {
    for (const srcPath of collectSubCompositionSrcs(html)) {
      const filePath = resolve(projectDir, srcPath);
      if (visited.has(filePath)) continue;
      visited.add(filePath);
      const read = readProjectFile(filePath);
      if (read.kind === "missing") {
        if (!checked.has(srcPath)) {
          checked.set(srcPath, { srcPath, problem: "the file does not exist" });
        }
        continue;
      }
      if (read.kind === "folder") {
        if (!checked.has(srcPath)) {
          checked.set(srcPath, {
            srcPath,
            problem: "it is a folder, not an HTML file",
            folder: true
          });
        }
        continue;
      }
      const fileHtml = read.text;
      const validity = checkSubCompositionUsability(fileHtml, parseSubCompHtml);
      if (!validity.ok) {
        if (!checked.has(srcPath)) {
          checked.set(srcPath, {
            srcPath,
            problem: validity.detail ?? "the file is empty or could not be parsed"
          });
        }
        continue;
      }
      walk(fileHtml);
    }
  };
  walk(rootHtml);
  const findings = [];
  for (const { srcPath, problem, folder } of checked.values()) {
    findings.push({
      code: "missing_or_empty_sub_composition",
      severity: "error",
      message: `data-composition-src references "${srcPath}", but ${problem}.`,
      fixHint: folder ? `Point data-composition-src at the HTML file inside the folder, such as "${srcPath}/index.html".` : `Fix this before rendering \u2014 the render pre-flight rejects unusable sub-compositions. Write valid HTML into "${srcPath}" \u2014 it needs a <template> or <body> containing an element with data-composition-id, data-width, and data-height. Preview/studio still tolerates and skips the scene while you author it. If a scene-authoring step is still running, wait for it to finish before referencing the file, or re-run the step that generates it.`
    });
  }
  return findings;
}
function isSnippetFragment(html) {
  const firstTag = html.match(/<[a-zA-Z][^>]*>/);
  if (!firstTag) return false;
  return /\bdata-hf-snippet\b/.test(firstTag[0]);
}

export {
  LINT_RULE_COUNT,
  LINT_RULE_GROUP_COUNTS,
  lintHyperframeHtml,
  lintMediaUrls,
  shouldBlockRender,
  lintProject
};
