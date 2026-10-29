import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  require_lib,
  require_main
} from "./chunk-DUNOLIES.js";
import {
  ancestor,
  full,
  parse,
  simple
} from "./chunk-KRDUCZRT.js";
import {
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// ../parsers/dist/index.js
var recast = __toESM(require_main(), 1);
var import_parser = __toESM(require_lib(), 1);

// ../../node_modules/.bun/@jridgewell+sourcemap-codec@1.5.5/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
function encodeInteger(builder, num, relative) {
  let delta = num - relative;
  delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
  do {
    let clamped = delta & 31;
    delta >>>= 5;
    if (delta > 0) clamped |= 32;
    builder.write(intToChar[clamped]);
  } while (delta > 0);
  return num;
}
var bufLength = 1024 * 16;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i = 0; i < buf.length; i++) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }
};
var StringWriter = class {
  constructor() {
    this.pos = 0;
    this.out = "";
    this.buffer = new Uint8Array(bufLength);
  }
  write(v) {
    const { buffer } = this;
    buffer[this.pos++] = v;
    if (this.pos === bufLength) {
      this.out += td.decode(buffer);
      this.pos = 0;
    }
  }
  flush() {
    const { buffer, out, pos } = this;
    return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
  }
};
function encode(decoded) {
  const writer = new StringWriter();
  let sourcesIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let namesIndex = 0;
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) writer.write(semicolon);
    if (line.length === 0) continue;
    let genColumn = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (j > 0) writer.write(comma);
      genColumn = encodeInteger(writer, segment[0], genColumn);
      if (segment.length === 1) continue;
      sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
      sourceLine = encodeInteger(writer, segment[2], sourceLine);
      sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
      if (segment.length === 4) continue;
      namesIndex = encodeInteger(writer, segment[4], namesIndex);
    }
  }
  return writer.flush();
}

// ../../node_modules/.bun/magic-string@0.30.21/node_modules/magic-string/dist/magic-string.es.mjs
var BitSet = class _BitSet {
  constructor(arg) {
    this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
  }
  add(n2) {
    this.bits[n2 >> 5] |= 1 << (n2 & 31);
  }
  has(n2) {
    return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
  }
};
var Chunk = class _Chunk {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.original = content;
    this.intro = "";
    this.outro = "";
    this.content = content;
    this.storeName = false;
    this.edited = false;
    {
      this.previous = null;
      this.next = null;
    }
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    const chunk = new _Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.next;
    }
  }
  eachPrevious(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.previous;
    }
  }
  edit(content, storeName, contentOnly) {
    this.content = content;
    if (!contentOnly) {
      this.intro = "";
      this.outro = "";
    }
    this.storeName = storeName;
    this.edited = true;
    return this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  reset() {
    this.intro = "";
    this.outro = "";
    if (this.edited) {
      this.content = this.original;
      this.storeName = false;
      this.edited = false;
    }
  }
  split(index) {
    const sliceIndex = index - this.start;
    const originalBefore = this.original.slice(0, sliceIndex);
    const originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    const newChunk = new _Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = "";
    this.end = index;
    if (this.edited) {
      newChunk.edit("", false);
      this.content = "";
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next) newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length) return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit("", void 0, true);
        if (this.edited) {
          this.edit(trimmed, this.storeName, true);
        }
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length) return true;
    }
  }
  trimStart(rx) {
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length) return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        const newChunk = this.split(this.end - trimmed.length);
        if (this.edited) {
          newChunk.edit(trimmed, this.storeName, true);
        }
        this.edit("", void 0, true);
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length) return true;
    }
  }
};
function getBtoa() {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
var btoa = /* @__PURE__ */ getBtoa();
var SourceMap = class {
  constructor(properties) {
    this.version = 3;
    this.file = properties.file;
    this.sources = properties.sources;
    this.sourcesContent = properties.sourcesContent;
    this.names = properties.names;
    this.mappings = encode(properties.mappings);
    if (typeof properties.x_google_ignoreList !== "undefined") {
      this.x_google_ignoreList = properties.x_google_ignoreList;
    }
    if (typeof properties.debugId !== "undefined") {
      this.debugId = properties.debugId;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
};
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--) fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject(thing) {
  return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m = i + j >> 1;
      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i = m + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
}
var wordRegex = /\w/;
var Mappings = class {
  constructor(hires) {
    this.hires = hires;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      const contentLengthMinusOne = content.length - 1;
      let contentLineEnd = content.indexOf("\n", 0);
      let previousContentLineEnd = -1;
      while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
        const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment2.push(nameIndex);
        }
        this.rawSegments.push(segment2);
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        previousContentLineEnd = contentLineEnd;
        contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
      }
      const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      if (nameIndex >= 0) {
        segment.push(nameIndex);
      }
      this.rawSegments.push(segment);
      this.advance(content.slice(previousContentLineEnd + 1));
    } else if (this.pending) {
      this.rawSegments.push(this.pending);
      this.advance(content);
    }
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start;
    let first = true;
    let charInHiresBoundary = false;
    while (originalCharIndex < chunk.end) {
      if (original[originalCharIndex] === "\n") {
        loc.line += 1;
        loc.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        first = true;
        charInHiresBoundary = false;
      } else {
        if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
          const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          if (this.hires === "boundary") {
            if (wordRegex.test(original[originalCharIndex])) {
              if (!charInHiresBoundary) {
                this.rawSegments.push(segment);
                charInHiresBoundary = true;
              }
            } else {
              this.rawSegments.push(segment);
              charInHiresBoundary = false;
            }
          } else {
            this.rawSegments.push(segment);
          }
        }
        loc.column += 1;
        this.generatedCodeColumn += 1;
        first = false;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str) return;
    const lines = str.split("\n");
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
};
var n = "\n";
var warned = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};
var MagicString = class _MagicString {
  constructor(string, options = {}) {
    const chunk = new Chunk(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: true, value: string },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: chunk },
      lastChunk: { writable: true, value: chunk },
      lastSearchedChunk: { writable: true, value: chunk },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: options.filename },
      indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: true, value: new BitSet() },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: void 0 },
      ignoreList: { writable: true, value: options.ignoreList },
      offset: { writable: true, value: options.offset || 0 }
    });
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content !== "string") throw new TypeError("outro content must be a string");
    this.outro += content;
    return this;
  }
  appendLeft(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.appendLeft(content);
    } else {
      this.intro += content;
    }
    return this;
  }
  appendRight(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.appendRight(content);
    } else {
      this.outro += content;
    }
    return this;
  }
  clone() {
    const cloned = new _MagicString(this.original, { filename: this.filename, offset: this.offset });
    let originalChunk = this.firstChunk;
    let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      const nextOriginalChunk = originalChunk.next;
      const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
    }
    cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
    cloned.intro = this.intro;
    cloned.outro = this.outro;
    return cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    const sourceIndex = 0;
    const names = Object.keys(this.storedNames);
    const mappings = new Mappings(options.hires);
    const locate = getLocator(this.original);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.firstChunk.eachNext((chunk) => {
      const loc = locate(chunk.start);
      if (chunk.intro.length) mappings.advance(chunk.intro);
      if (chunk.edited) {
        mappings.addEdit(
          sourceIndex,
          chunk.content,
          loc,
          chunk.storeName ? names.indexOf(chunk.original) : -1
        );
      } else {
        mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
      }
      if (chunk.outro.length) mappings.advance(chunk.outro);
    });
    if (this.outro) {
      mappings.advance(this.outro);
    }
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: [
        options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
      ],
      sourcesContent: options.includeContent ? [this.original] : void 0,
      names,
      mappings: mappings.raw,
      x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    if (this.indentStr === void 0) {
      this.indentStr = guessIndent(this.original);
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "	" : this.indentStr;
  }
  indent(indentStr, options) {
    const pattern = /^[^\r\n]/gm;
    if (isObject(indentStr)) {
      options = indentStr;
      indentStr = void 0;
    }
    if (indentStr === void 0) {
      this._ensureindentStr();
      indentStr = this.indentStr || "	";
    }
    if (indentStr === "") return this;
    options = options || {};
    const isExcluded = {};
    if (options.exclude) {
      const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
      exclusions.forEach((exclusion) => {
        for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    let shouldIndentNextCharacter = options.indentStart !== false;
    const replacer = (match) => {
      if (shouldIndentNextCharacter) return `${indentStr}${match}`;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0;
    let chunk = this.firstChunk;
    while (chunk) {
      const end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            const char = this.original[charIndex];
            if (char === "\n") {
              shouldIndentNextCharacter = true;
            } else if (char !== "\r" && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prependRight(indentStr);
              } else {
                this._splitChunk(chunk, charIndex);
                chunk = chunk.next;
                chunk.prependRight(indentStr);
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(index, content) {
    if (!warned.insertLeft) {
      console.warn(
        "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
      );
      warned.insertLeft = true;
    }
    return this.appendLeft(index, content);
  }
  insertRight(index, content) {
    if (!warned.insertRight) {
      console.warn(
        "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
      );
      warned.insertRight = true;
    }
    return this.prependRight(index, content);
  }
  move(start, end, index) {
    start = start + this.offset;
    end = end + this.offset;
    index = index + this.offset;
    if (index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
    this._split(start);
    this._split(end);
    this._split(index);
    const first = this.byStart[start];
    const last = this.byEnd[end];
    const oldLeft = first.previous;
    const oldRight = last.next;
    const newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk) return this;
    const newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft) oldLeft.next = oldRight;
    if (oldRight) oldRight.previous = oldLeft;
    if (newLeft) newLeft.next = first;
    if (newRight) newRight.previous = last;
    if (!first.previous) this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight || null;
    if (!newLeft) this.firstChunk = first;
    if (!newRight) this.lastChunk = last;
    return this;
  }
  overwrite(start, end, content, options) {
    options = options || {};
    return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    start = start + this.offset;
    end = end + this.offset;
    if (typeof content !== "string") throw new TypeError("replacement content must be a string");
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    if (end > this.original.length) throw new Error("end is out of bounds");
    if (start === end)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(start);
    this._split(end);
    if (options === true) {
      if (!warned.storeName) {
        console.warn(
          "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
        );
        warned.storeName = true;
      }
      options = { storeName: true };
    }
    const storeName = options !== void 0 ? options.storeName : false;
    const overwrite = options !== void 0 ? options.overwrite : false;
    if (storeName) {
      const original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: true,
        value: true,
        enumerable: true
      });
    }
    const first = this.byStart[start];
    const last = this.byEnd[end];
    if (first) {
      let chunk = first;
      while (chunk !== last) {
        if (chunk.next !== this.byStart[chunk.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        chunk = chunk.next;
        chunk.edit("", false);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      const newChunk = new Chunk(start, end, "").edit(content, storeName);
      last.next = newChunk;
      newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content !== "string") throw new TypeError("outro content must be a string");
    this.intro = content + this.intro;
    return this;
  }
  prependLeft(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.prependLeft(content);
    } else {
      this.intro = content + this.intro;
    }
    return this;
  }
  prependRight(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.prependRight(content);
    } else {
      this.outro = content + this.outro;
    }
    return this;
  }
  remove(start, end) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
    if (start > end) throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.intro = "";
      chunk.outro = "";
      chunk.edit("");
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  reset(start, end) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
    if (start > end) throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.reset();
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  lastChar() {
    if (this.outro.length) return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length) return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    if (this.intro.length) return this.intro[this.intro.length - 1];
    return "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n);
    if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro;
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        lineIndex = chunk.outro.lastIndexOf(n);
        if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        lineIndex = chunk.content.lastIndexOf(n);
        if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        lineIndex = chunk.intro.lastIndexOf(n);
        if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    lineIndex = this.intro.lastIndexOf(n);
    if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
    return this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length - this.offset) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    let result = "";
    let chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    const startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      const containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      const sliceStart = startChunk === chunk ? start - chunk.start : 0;
      const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  }
  // TODO deprecate this? not really very useful
  snip(start, end) {
    const clone = this.clone();
    clone.remove(0, start);
    clone.remove(end, clone.original.length);
    return clone;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index]) return;
    let chunk = this.lastSearchedChunk;
    let previousChunk = chunk;
    const searchForward = index > chunk.end;
    while (chunk) {
      if (chunk.contains(index)) return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
      if (chunk === previousChunk) return;
      previousChunk = chunk;
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      const loc = getLocator(this.original)(index);
      throw new Error(
        `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
      );
    }
    const newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk) this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    return true;
  }
  toString() {
    let str = this.intro;
    let chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do {
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return false;
    } while (chunk = chunk.next);
    return true;
  }
  length() {
    let chunk = this.firstChunk;
    let length = 0;
    do {
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    } while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length) return true;
    let chunk = this.lastChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimEnd(rx);
      if (chunk.end !== end) {
        if (this.lastChunk === chunk) {
          this.lastChunk = chunk.next;
        }
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted) return true;
      chunk = chunk.previous;
    } while (chunk);
    return false;
  }
  trimEnd(charType) {
    this.trimEndAborted(charType);
    return this;
  }
  trimStartAborted(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length) return true;
    let chunk = this.firstChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        if (chunk === this.lastChunk) this.lastChunk = chunk.next;
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted) return true;
      chunk = chunk.next;
    } while (chunk);
    return false;
  }
  trimStart(charType) {
    this.trimStartAborted(charType);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      if (typeof replacement === "string") {
        return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
          if (i === "$") return "$";
          if (i === "&") return match[0];
          const num = +i;
          if (num < match.length) return match[+i];
          return `$${i}`;
        });
      } else {
        return replacement(...match, match.index, str, match.groups);
      }
    }
    function matchAll(re, str) {
      let match;
      const matches = [];
      while (match = re.exec(str)) {
        matches.push(match);
      }
      return matches;
    }
    if (searchValue.global) {
      const matches = matchAll(searchValue, this.original);
      matches.forEach((match) => {
        if (match.index != null) {
          const replacement2 = getReplacement(match, this.original);
          if (replacement2 !== match[0]) {
            this.overwrite(match.index, match.index + match[0].length, replacement2);
          }
        }
      });
    } else {
      const match = this.original.match(searchValue);
      if (match && match.index != null) {
        const replacement2 = getReplacement(match, this.original);
        if (replacement2 !== match[0]) {
          this.overwrite(match.index, match.index + match[0].length, replacement2);
        }
      }
    }
    return this;
  }
  _replaceString(string, replacement) {
    const { original } = this;
    const index = original.indexOf(string);
    if (index !== -1) {
      if (typeof replacement === "function") {
        replacement = replacement(string, index, original);
      }
      if (string !== replacement) {
        this.overwrite(index, index + string.length, replacement);
      }
    }
    return this;
  }
  replace(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceString(searchValue, replacement);
    }
    return this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    const { original } = this;
    const stringLength = string.length;
    for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
      const previous = original.slice(index, index + stringLength);
      let _replacement = replacement;
      if (typeof replacement === "function") {
        _replacement = replacement(previous, index, original);
      }
      if (previous !== _replacement) this.overwrite(index, index + stringLength, _replacement);
    }
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceAllString(searchValue, replacement);
    }
    if (!searchValue.global) {
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    }
    return this._replaceRegexp(searchValue, replacement);
  }
};

// ../parsers/dist/index.js
var CANVAS_DIMENSIONS = {
  landscape: { width: 1920, height: 1080 },
  portrait: { width: 1080, height: 1920 },
  "landscape-4k": { width: 3840, height: 2160 },
  "portrait-4k": { width: 2160, height: 3840 },
  square: { width: 1080, height: 1080 },
  "square-4k": { width: 2160, height: 2160 }
};
var VALID_CANVAS_RESOLUTIONS = Object.keys(
  CANVAS_DIMENSIONS
);
var RESOLUTION_ALIASES = {
  "1080p": "landscape",
  hd: "landscape",
  "1080p-portrait": "portrait",
  "portrait-1080p": "portrait",
  "4k": "landscape-4k",
  uhd: "landscape-4k",
  "4k-portrait": "portrait-4k",
  "1080p-square": "square",
  "square-1080p": "square",
  "4k-square": "square-4k"
};
var ASPECT_AGNOSTIC_RESOLUTION_ALIASES = /* @__PURE__ */ new Set([
  "1080p",
  "hd",
  "4k",
  "uhd"
]);
function normalizeResolutionFlag(input) {
  if (!input) return void 0;
  const lowered = input.toLowerCase();
  if (VALID_CANVAS_RESOLUTIONS.includes(lowered)) {
    return lowered;
  }
  return RESOLUTION_ALIASES[lowered];
}
function isAspectAgnosticResolutionAlias(input) {
  if (!input) return false;
  return ASPECT_AGNOSTIC_RESOLUTION_ALIASES.has(input.toLowerCase());
}
function resolveResolutionFlagPair(input) {
  return {
    outputResolution: normalizeResolutionFlag(input),
    outputResolutionAspectAgnostic: isAspectAgnosticResolutionAlias(input)
  };
}
var COMPOSITION_VARIABLE_TYPES = [
  "string",
  "number",
  "color",
  "boolean",
  "enum",
  "font",
  "image"
];
function isTextElement(el) {
  return el.type === "text";
}
function isMediaElement(el) {
  return el.type === "video" || el.type === "image" || el.type === "audio";
}
function isCompositionElement(el) {
  return el.type === "composition";
}
var TIMELINE_COLORS = {
  video: "#ec4899",
  image: "#3b82f6",
  text: "#06b6d4",
  audio: "#10b981",
  composition: "#f97316"
};
var DEFAULT_DURATIONS = {
  video: 5,
  image: 5,
  text: 2,
  audio: 5,
  composition: 5
};
function getDefaultStageZoom(resolution) {
  const { width, height } = CANVAS_DIMENSIONS[resolution];
  return {
    scale: 1,
    focusX: width / 2,
    focusY: height / 2
  };
}
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
function classifyTweenPropertyGroup(properties) {
  const groups = /* @__PURE__ */ new Set();
  for (const key of Object.keys(properties)) {
    if (key === "transformOrigin" || key === "_auto" || key === "data") continue;
    const g = classifyPropertyGroup(key);
    groups.add(g);
  }
  if (groups.size === 1) return groups.values().next().value;
  return void 0;
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
function serializeGsapAnimations(animations, timelineVar = "tl", options) {
  const sorted = [...animations].sort((a, b) => {
    const aNum = a.resolvedStart ?? (typeof a.position === "number" ? a.position : Number.MAX_SAFE_INTEGER);
    const bNum = b.resolvedStart ?? (typeof b.position === "number" ? b.position : Number.MAX_SAFE_INTEGER);
    return aNum - bNum;
  });
  const lines = sorted.map((anim) => {
    const selector = JSON.stringify(anim.targetSelector);
    const props = { ...anim.properties };
    if (anim.duration !== void 0) props.duration = anim.duration;
    if (anim.ease) props.ease = anim.ease;
    let propsStr = serializeObject(props);
    if (anim.extras && Object.keys(anim.extras).length > 0) {
      const extrasStr = serializeExtras(anim.extras);
      if (Object.keys(props).length === 0) {
        propsStr = `{ ${extrasStr} }`;
      } else {
        propsStr = propsStr.slice(0, -2) + `, ${extrasStr} }`;
      }
    }
    const posStr = JSON.stringify(anim.position);
    switch (anim.method) {
      case "set":
        return anim.global ? `    gsap.set(${selector}, ${propsStr});` : `    ${timelineVar}.set(${selector}, ${propsStr}, ${posStr});`;
      case "to":
        return `    ${timelineVar}.to(${selector}, ${propsStr}, ${posStr});`;
      case "from":
        return `    ${timelineVar}.from(${selector}, ${propsStr}, ${posStr});`;
      case "fromTo": {
        const fromStr = serializeObject(anim.fromProperties || {});
        return `    ${timelineVar}.fromTo(${selector}, ${fromStr}, ${propsStr}, ${posStr});`;
      }
    }
  });
  let mediaSync = "";
  if (options?.includeMediaSync) {
    mediaSync = `
    ${timelineVar}.eventCallback("onUpdate", function() {
      const time = ${timelineVar}.time();
      document.querySelectorAll("video[data-start], audio[data-start]").forEach(function(media) {
        const start = parseFloat(media.dataset.start);
        const end = parseFloat(media.dataset.end) || Infinity;
        const mediaTime = time - start;
        if (time >= start && time < end) {
          if (Math.abs(media.currentTime - mediaTime) > 0.1) {
            media.currentTime = mediaTime;
          }
          if (media.paused && !${timelineVar}.paused()) {
            media.play().catch(function() {});
          }
        } else if (!media.paused) {
          media.pause();
        }
      });
    });`;
  }
  const preamble = options?.preamble || `const ${timelineVar} = gsap.timeline({ paused: true });`;
  const postamble = options?.postamble ? `
    ${options.postamble}` : "";
  return `
    ${preamble}
${lines.join("\n")}${mediaSync}${postamble}
  `;
}
function serializeValue(value) {
  if (typeof value === "string" && value.startsWith("__raw:")) {
    return value.slice(6);
  }
  if (typeof value === "string") return JSON.stringify(value);
  return String(value);
}
function plainPercentKey(percentage) {
  const text = Math.abs(percentage) < 1e-6 ? percentage.toFixed(20).replace(/\.?0+$/, "") : String(percentage);
  return `${text}%`;
}
function safeJsKey(key) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}
function serializeObject(obj) {
  const entries = Object.entries(obj).map(([key, value]) => {
    return `${safeJsKey(key)}: ${serializeValue(value)}`;
  });
  return `{ ${entries.join(", ")} }`;
}
function serializeExtras(extras) {
  return Object.entries(extras).map(([key, value]) => {
    return `${safeJsKey(key)}: ${serializeValue(value)}`;
  }).join(", ");
}
function getAnimationsForElementId(animations, elementId) {
  const selector = `#${elementId}`;
  return animations.filter((a) => a.targetSelector === selector);
}
var FORBIDDEN_GSAP_PATTERNS = [
  { pattern: /\.call\s*\(/, message: "call() method not allowed" },
  { pattern: /\.add\s*\(/, message: "add() method not allowed" },
  { pattern: /\.addPause\s*\(/, message: "addPause() method not allowed" },
  { pattern: /gsap\.registerEffect\s*\(/, message: "registerEffect() not allowed" },
  { pattern: /ScrollTrigger/, message: "ScrollTrigger not allowed" },
  { pattern: /onComplete\s*:/, message: "onComplete callback not allowed" },
  { pattern: /onUpdate\s*:/, message: "onUpdate callback not allowed" },
  { pattern: /onStart\s*:/, message: "onStart callback not allowed" },
  { pattern: /onRepeat\s*:/, message: "onRepeat callback not allowed" },
  { pattern: /onReverseComplete\s*:/, message: "onReverseComplete callback not allowed" },
  { pattern: /repeat\s*:\s*-1/, message: "Infinite repeat (repeat: -1) not allowed" },
  { pattern: /Math\.random\s*\(/, message: "Random values (Math.random) not allowed" },
  { pattern: /Date\.now\s*\(/, message: "Date-dependent values (Date.now) not allowed" },
  { pattern: /new\s+Date\s*\(/, message: "Date constructor not allowed" },
  { pattern: /setTimeout\s*\(/, message: "setTimeout not allowed" },
  { pattern: /setInterval\s*\(/, message: "setInterval not allowed" },
  { pattern: /requestAnimationFrame\s*\(/, message: "requestAnimationFrame not allowed" }
];
function validateCompositionGsap(script) {
  const errors = [];
  const warnings = [];
  for (const { pattern, message } of FORBIDDEN_GSAP_PATTERNS) {
    if (pattern.test(script)) errors.push(message);
  }
  if (/yoyo\s*:\s*true/.test(script)) {
    warnings.push("yoyo animations may behave unexpectedly when scrubbing");
  }
  if (/stagger\s*:/.test(script)) {
    warnings.push("stagger animations may not serialize correctly");
  }
  return { valid: errors.length === 0, errors, warnings };
}
function keyframesToGsapAnimations(elementId, keyframes, elementStartTime, base) {
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);
  const animations = [];
  const baseX = base?.x ?? 0;
  const baseY = base?.y ?? 0;
  const baseScale = base?.scale ?? 1;
  sorted.forEach((kf, i) => {
    const absoluteTime = elementStartTime + kf.time;
    const isFirst = i === 0;
    const prevKf = i > 0 ? sorted[i - 1] : null;
    const duration = prevKf ? kf.time - prevKf.time : void 0;
    const position = prevKf ? elementStartTime + prevKf.time : absoluteTime;
    const properties = {};
    for (const [key, value] of Object.entries(kf.properties)) {
      if (typeof value !== "number") continue;
      if (key === "x") properties.x = baseX + value;
      else if (key === "y") properties.y = baseY + value;
      else if (key === "scale") properties.scale = baseScale * value;
      else properties[key] = value;
    }
    animations.push({
      id: `${elementId}-kf-${kf.id}`,
      targetSelector: `#${elementId}`,
      method: isFirst ? "set" : "to",
      position,
      properties,
      duration: isFirst ? void 0 : duration,
      ease: kf.ease
    });
  });
  return animations;
}
function gsapAnimationsToKeyframes(animations, elementStartTime, options) {
  const validMethods = ["set", "to", "from", "fromTo"];
  const baseX = options?.baseX ?? 0;
  const baseY = options?.baseY ?? 0;
  const baseScale = options?.baseScale ?? 1;
  const clampTimeToZero = options?.clampTimeToZero ?? true;
  const skipBaseSet = options?.skipBaseSet ?? false;
  const baseTimeEpsilon = 1e-3;
  const baseValueEpsilon = 1e-5;
  return animations.filter(
    (a) => validMethods.includes(a.method) && typeof a.position === "number"
  ).map((a) => {
    const relativeTimeRaw = a.position - elementStartTime;
    const time = clampTimeToZero ? Math.max(0, relativeTimeRaw) : relativeTimeRaw;
    const properties = {};
    for (const [key, value] of Object.entries(a.properties)) {
      if (typeof value !== "number") continue;
      if (key === "x") properties.x = value - baseX;
      else if (key === "y") properties.y = value - baseY;
      else if (key === "scale") {
        properties.scale = baseScale !== 0 ? value / baseScale : value;
      } else {
        properties[key] = value;
      }
    }
    if (skipBaseSet && a.method === "set" && time < baseTimeEpsilon && Object.values(properties).every(
      (v) => typeof v === "number" && Math.abs(v) < baseValueEpsilon
    )) {
      return null;
    }
    return {
      id: a.id.replace(/^.*-kf-/, ""),
      time,
      properties,
      ease: a.ease
    };
  }).filter((kf) => kf !== null);
}
var roundPercentage = (percentage) => Math.round(percentage * 10) / 10;
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
var SKIP_KEYS = /* @__PURE__ */ new Set([
  "type",
  "start",
  "end",
  "loc",
  "range",
  "__hfProvenance",
  "__hfOrder",
  "__hfSiteStart"
]);
var FUNCTION_TYPES = /* @__PURE__ */ new Set([
  "ArrowFunctionExpression",
  "FunctionExpression",
  "FunctionDeclaration"
]);
var GSAP_METHODS = /* @__PURE__ */ new Set(["set", "to", "from", "fromTo"]);
var MAX_DEPTH = 8;
var MAX_ITERS = 512;
function isFunctionNode(node) {
  return !!node && FUNCTION_TYPES.has(node.type);
}
function isNode(x) {
  return !!x && typeof x === "object" && typeof x.type === "string";
}
function transformChildren(node, fn) {
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key) || isNonValueIdentifierSlot(node, key)) continue;
    const child = node[key];
    if (Array.isArray(child)) {
      for (let i = 0; i < child.length; i++) child[i] = fn(child[i]);
    } else {
      node[key] = fn(child);
    }
  }
}
function cloneNode(node) {
  return structuredClone(node);
}
function collectPatternNames(pattern, out) {
  if (pattern?.type === "Identifier") out.add(pattern.name);
  else if (pattern?.type === "AssignmentPattern") collectPatternNames(pattern.left, out);
  else if (pattern?.type === "RestElement") collectPatternNames(pattern.argument, out);
}
function boundPatterns(node) {
  if (isFunctionNode(node)) return node.params ?? [];
  if (node.type === "VariableDeclarator") return [node.id];
  if (node.type === "CatchClause") return [node.param];
  if (node.type === "AssignmentExpression" && node.left?.type === "Identifier") return [node.left];
  return [];
}
function collectBoundNames(root) {
  const names = /* @__PURE__ */ new Set();
  const visit = (node) => {
    if (!isNode(node)) return node;
    for (const pattern of boundPatterns(node)) collectPatternNames(pattern, names);
    transformChildren(node, visit);
    return node;
  };
  visit(root);
  return names;
}
function isNonValueIdentifierSlot(node, key) {
  if (node.computed) return false;
  return node.type === "MemberExpression" && key === "property" || node.type === "Property" && key === "key";
}
function substituteParams(node, bindings) {
  const shadowed = collectBoundNames(node);
  let effective = bindings;
  if (shadowed.size > 0) {
    effective = new Map(bindings);
    for (const name of shadowed) effective.delete(name);
  }
  if (effective.size === 0) return node;
  return replace(node, effective);
}
function replace(node, bindings) {
  if (!isNode(node)) return node;
  if (node.type === "Identifier" && bindings.has(node.name)) {
    return cloneNode(bindings.get(node.name));
  }
  transformChildren(node, (child) => replace(child, bindings));
  return node;
}
function tagProvenance(node, provenance) {
  if (node && typeof node === "object") node.__hfProvenance = provenance;
  return node;
}
function readProvenance(node) {
  return node?.__hfProvenance;
}
function numericLiteral(value) {
  return { type: "Literal", value, raw: String(value) };
}
function walkNodes(node, fn) {
  if (!isNode(node)) return;
  fn(node);
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key)) continue;
    const child = node[key];
    if (Array.isArray(child)) for (const c of child) walkNodes(c, fn);
    else walkNodes(child, fn);
  }
}
function timelineRootName(call) {
  let obj = call.callee?.object;
  while (obj?.type === "CallExpression") obj = obj.callee?.object;
  return obj?.type === "Identifier" ? obj.name : null;
}
function isTimelineRooted(call, timelineVar) {
  if (timelineRootName(call) !== timelineVar) return false;
  return call.callee?.property?.type === "Identifier" && GSAP_METHODS.has(call.callee.property.name);
}
function isAddLabelCall(call, timelineVar) {
  return timelineRootName(call) === timelineVar && call.callee?.property?.name === "addLabel";
}
function containsTimelineCall(node, timelineVar) {
  let found = false;
  walkNodes(node, (n2) => {
    if (n2.type === "CallExpression" && isTimelineRooted(n2, timelineVar)) found = true;
  });
  return found;
}
function rangeOf(node) {
  return typeof node.start === "number" && typeof node.end === "number" ? [node.start, node.end] : void 0;
}
var SAFE_DEFAULT_NODES = /* @__PURE__ */ new Set([
  "ArrayExpression",
  "BinaryExpression",
  "ChainExpression",
  "ConditionalExpression",
  "Identifier",
  "Literal",
  "LogicalExpression",
  "MemberExpression",
  "ObjectExpression",
  "Property",
  "SpreadElement",
  "TemplateElement",
  "TemplateLiteral",
  "UnaryExpression"
]);
function isSafeDefaultExpression(node, earlierParams) {
  let safe = true;
  const visit = (current, parent, key) => {
    if (!isNode(current) || !safe) return;
    if (!SAFE_DEFAULT_NODES.has(current.type)) {
      safe = false;
      return;
    }
    if (current.type === "UnaryExpression" && current.operator === "delete") {
      safe = false;
      return;
    }
    if (current.type === "Identifier") {
      const nonValue = parent && key ? isNonValueIdentifierSlot(parent, key) : false;
      if (!nonValue && current.name !== "undefined" && !earlierParams.has(current.name)) {
        safe = false;
      }
      return;
    }
    for (const childKey of Object.keys(current)) {
      if (SKIP_KEYS.has(childKey)) continue;
      const child = current[childKey];
      if (Array.isArray(child)) {
        for (const item of child) visit(item, current, childKey);
      } else {
        visit(child, current, childKey);
      }
    }
  };
  visit(node);
  return safe;
}
var SUPPORTED_PARAMS_CACHE = /* @__PURE__ */ new WeakMap();
function supportedParam(param, earlier) {
  if (param.type === "Identifier") return { name: param.name };
  if (param.type !== "AssignmentPattern" || param.left?.type !== "Identifier") return null;
  if (!isSafeDefaultExpression(param.right, earlier)) return null;
  return { name: param.left.name, defaultExpression: param.right };
}
function supportedParams(fn) {
  if (SUPPORTED_PARAMS_CACHE.has(fn)) return SUPPORTED_PARAMS_CACHE.get(fn) ?? null;
  const params = [];
  const earlier = /* @__PURE__ */ new Set();
  for (const param of fn.params ?? []) {
    const parsed = supportedParam(param, earlier);
    if (!parsed) {
      SUPPORTED_PARAMS_CACHE.set(fn, null);
      return null;
    }
    params.push(parsed);
    earlier.add(parsed.name);
  }
  SUPPORTED_PARAMS_CACHE.set(fn, params);
  return params;
}
function isShapeEligible(fn) {
  return isFunctionNode(fn) && fn.body?.type === "BlockStatement" && supportedParams(fn) !== null;
}
function callsAny(node, names) {
  let hit = false;
  walkNodes(node, (n2) => {
    if (n2.type === "CallExpression" && n2.callee?.type === "Identifier" && names.has(n2.callee.name)) {
      hit = true;
    }
  });
  return hit;
}
function varDeclHelper(stmt) {
  if (stmt.declarations?.length !== 1) return null;
  const d = stmt.declarations[0];
  return d.id?.type === "Identifier" && isShapeEligible(d.init) ? [d.id.name, d.init] : null;
}
function helperFromStatement(stmt) {
  if (stmt.type === "FunctionDeclaration") {
    return stmt.id && isShapeEligible(stmt) ? [stmt.id.name, stmt] : null;
  }
  if (stmt.type === "VariableDeclaration") return varDeclHelper(stmt);
  return null;
}
function gatherHelperCandidates(program) {
  const candidates = /* @__PURE__ */ new Map();
  for (const stmt of program.body ?? []) {
    const helper = helperFromStatement(stmt);
    if (helper) candidates.set(helper[0], helper[1]);
  }
  return candidates;
}
function timelineBuildingNames(candidates, timelineVar) {
  const building = /* @__PURE__ */ new Set();
  for (const [name, fn] of candidates) {
    if (containsTimelineCall(fn.body, timelineVar)) building.add(name);
  }
  for (let changed = true; changed; ) {
    changed = false;
    for (const [name, fn] of candidates) {
      if (!building.has(name) && callsAny(fn.body, building)) {
        building.add(name);
        changed = true;
      }
    }
  }
  return building;
}
function bump(counts, key) {
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
function undefinedIdentifier() {
  return { type: "Identifier", name: "undefined" };
}
function isExplicitUndefined(node) {
  return node?.type === "Identifier" && node.name === "undefined" || node?.type === "UnaryExpression" && node.operator === "void" && node.argument?.type === "Literal" && node.argument.value === 0;
}
function resolveHelperBindings(call, params) {
  if (call.arguments?.some((arg) => arg?.type === "SpreadElement")) return null;
  const bindings = /* @__PURE__ */ new Map();
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const arg = call.arguments?.[i];
    if (arg && !isExplicitUndefined(arg)) {
      bindings.set(param.name, arg);
    } else if (param.defaultExpression) {
      bindings.set(param.name, substituteParams(cloneNode(param.defaultExpression), bindings));
    } else {
      bindings.set(param.name, undefinedIdentifier());
    }
  }
  return bindings;
}
function statementHelperCall(node, names) {
  if (node.type !== "ExpressionStatement") return void 0;
  const expression = node.expression;
  if (expression?.type !== "CallExpression" || expression.callee?.type !== "Identifier") {
    return void 0;
  }
  return names.has(expression.callee.name) ? expression : void 0;
}
function safelyDroppable(program, candidates) {
  const names = new Set(candidates.keys());
  const totalIds = /* @__PURE__ */ new Map();
  const stmtCalls = /* @__PURE__ */ new Map();
  const unbindable = /* @__PURE__ */ new Set();
  walkNodes(program, (n2) => {
    if (n2.type === "Identifier" && names.has(n2.name)) bump(totalIds, n2.name);
    const call = statementHelperCall(n2, names);
    if (!call) return;
    bump(stmtCalls, call.callee.name);
    const fn = candidates.get(call.callee.name);
    const params = fn && supportedParams(fn);
    if (!params || !resolveHelperBindings(call, params)) unbindable.add(call.callee.name);
  });
  const safe = /* @__PURE__ */ new Map();
  for (const [name, fn] of candidates) {
    if (!unbindable.has(name) && (totalIds.get(name) ?? 0) === 1 + (stmtCalls.get(name) ?? 0)) {
      safe.set(name, fn);
    }
  }
  return safe;
}
function collectInlinableHelpers(program, timelineVar) {
  const candidates = gatherHelperCandidates(program);
  if (candidates.size === 0) return candidates;
  const building = timelineBuildingNames(candidates, timelineVar);
  for (const name of [...candidates.keys()]) if (!building.has(name)) candidates.delete(name);
  if (candidates.size === 0) return candidates;
  return safelyDroppable(program, candidates);
}
function isHelperDecl(stmt, helpers) {
  if (stmt.type === "FunctionDeclaration") return !!stmt.id && helpers.get(stmt.id.name) === stmt;
  if (stmt.type === "VariableDeclaration" && stmt.declarations?.length === 1) {
    const d = stmt.declarations[0];
    return d.id?.type === "Identifier" && helpers.get(d.id.name) === d.init;
  }
  return false;
}
function bodyStatements(node) {
  if (node?.type === "BlockStatement") return node.body ?? [];
  return node ? [{ type: "ExpressionStatement", expression: node }] : [];
}
function tagTimelineCalls(stmts, prov, ctx) {
  for (const stmt of stmts) {
    const calls = [];
    walkNodes(stmt, (n2) => {
      if (n2.type === "CallExpression" && (isTimelineRooted(n2, ctx.timelineVar) || isAddLabelCall(n2, ctx.timelineVar)))
        calls.push(n2);
    });
    calls.sort((a, b) => a.callee.property.start - b.callee.property.start);
    for (const n2 of calls) {
      tagProvenance(n2, { ...prov });
      n2.__hfOrder = ctx.order.n++;
      n2.__hfSiteStart = ctx.rootStart;
    }
  }
}
function expandBody(bodyStmts, bindings, prov, ctx) {
  const block = substituteParams(cloneNode({ type: "BlockStatement", body: bodyStmts }), bindings);
  tagProvenance(block, prov);
  tagTimelineCalls(block.body, prov, ctx);
  block.body = expandStatements(block.body, { ...ctx, depth: ctx.depth + 1 });
  return [block];
}
function inlineHelper(call, ctx) {
  const fn = ctx.helpers.get(call.callee.name);
  if (!fn) return null;
  const params = supportedParams(fn);
  if (!params) return null;
  const bindings = resolveHelperBindings(call, params);
  if (!bindings) return null;
  const prov = {
    kind: "helper",
    fn: call.callee.name,
    callSite: ++ctx.site.n,
    sourceRange: rangeOf(call)
  };
  return expandBody(fn.body.body, bindings, prov, ctx);
}
function assignStep(update, resolve) {
  if (update.operator === "+=") return asNum(resolve(update.right));
  if (update.operator === "-=") {
    const s = asNum(resolve(update.right));
    return s === void 0 ? void 0 : -s;
  }
  if (update.operator === "=" && update.right?.type === "BinaryExpression") {
    return asNum(resolve(update.right.right));
  }
  return void 0;
}
function updatedVarName(update) {
  if (update?.type === "UpdateExpression") return update.argument?.name ?? null;
  if (update?.type === "AssignmentExpression") return update.left?.name ?? null;
  return null;
}
function loopStep(update, varName, resolve) {
  if (updatedVarName(update) !== varName) return void 0;
  if (update.type === "UpdateExpression") return update.operator === "++" ? 1 : -1;
  return assignStep(update, resolve);
}
function asNum(v) {
  return typeof v === "number" && Number.isFinite(v) ? v : void 0;
}
function loopSatisfied(op, x, end) {
  if (op === "<") return x < end;
  if (op === "<=") return x <= end;
  if (op === ">") return x > end;
  if (op === ">=") return x >= end;
  return false;
}
function forInitVar(init) {
  if (init?.type !== "VariableDeclaration" || init.declarations?.length !== 1) return null;
  const d = init.declarations[0];
  return d.id?.type === "Identifier" ? { name: d.id.name, initExpr: d.init } : null;
}
function parseForHeader(stmt, resolve) {
  const iv = forInitVar(stmt.init);
  const test = stmt.test;
  if (!iv || test?.type !== "BinaryExpression" || test.left?.name !== iv.name) return null;
  const start = asNum(resolve(iv.initExpr));
  const end = asNum(resolve(test.right));
  const step = loopStep(stmt.update, iv.name, resolve);
  if (start === void 0 || end === void 0 || !step) return null;
  return { v: iv.name, start, end, op: test.operator, step };
}
function unrollFor(stmt, ctx) {
  const h = parseForHeader(stmt, ctx.resolve);
  if (!h) return null;
  const body = bodyStatements(stmt.body);
  const out = [];
  const site = ++ctx.site.n;
  let iteration = 0;
  for (let x = h.start; loopSatisfied(h.op, x, h.end); x += h.step) {
    if (iteration >= MAX_ITERS) return null;
    const prov = {
      kind: "loop",
      callSite: site,
      iteration,
      sourceRange: rangeOf(stmt)
    };
    out.push(...expandBody(body, /* @__PURE__ */ new Map([[h.v, numericLiteral(x)]]), prov, ctx));
    iteration++;
  }
  return out;
}
function forOfVarName(left) {
  if (left?.type === "VariableDeclaration") {
    const id = left.declarations?.[0]?.id;
    return id?.type === "Identifier" ? id.name : null;
  }
  return left?.type === "Identifier" ? left.name : null;
}
function unrollOverArray(elements, body, elName, idxName, range, ctx) {
  const out = [];
  const site = ++ctx.site.n;
  elements.forEach((el, i) => {
    if (!el) return;
    const bindings = /* @__PURE__ */ new Map();
    if (elName) bindings.set(elName, el);
    if (idxName) bindings.set(idxName, numericLiteral(i));
    const prov = { kind: "loop", callSite: site, iteration: i, sourceRange: range };
    out.push(...expandBody(body, bindings, prov, ctx));
  });
  return out;
}
function unrollForOf(stmt, ctx) {
  if (stmt.right?.type !== "ArrayExpression") return null;
  const elName = forOfVarName(stmt.left);
  if (!elName) return null;
  return unrollOverArray(
    stmt.right.elements ?? [],
    bodyStatements(stmt.body),
    elName,
    null,
    rangeOf(stmt),
    ctx
  );
}
function callbackParamNames(cb) {
  const names = [];
  for (const p of [cb.params?.[0], cb.params?.[1]]) {
    if (!p) names.push(null);
    else if (p.type !== "Identifier") return null;
    else names.push(p.name);
  }
  return { el: names[0], idx: names[1] };
}
function isForEachCall(callee) {
  return callee?.type === "MemberExpression" && callee.property?.name === "forEach" && callee.object?.type === "ArrayExpression";
}
function forEachTarget(call) {
  if (!isForEachCall(call.callee)) return null;
  const cb = call.arguments?.[0];
  return isFunctionNode(cb) ? { elements: call.callee.object.elements ?? [], cb } : null;
}
function unrollForEach(call, ctx) {
  const target = forEachTarget(call);
  if (!target) return null;
  const params = callbackParamNames(target.cb);
  if (!params) return null;
  return unrollOverArray(
    target.elements,
    bodyStatements(target.cb.body),
    params.el,
    params.idx,
    rangeOf(call),
    ctx
  );
}
function expandCall(call, ctx) {
  if (call.callee?.type === "Identifier" && ctx.helpers.has(call.callee.name)) {
    return inlineHelper(call, ctx);
  }
  return unrollForEach(call, ctx);
}
function expandStatement(stmt, ctx) {
  if (ctx.depth >= MAX_DEPTH) return null;
  if (stmt.type === "ForStatement") return unrollFor(stmt, ctx);
  if (stmt.type === "ForOfStatement") return unrollForOf(stmt, ctx);
  if (stmt.type === "ExpressionStatement" && stmt.expression?.type === "CallExpression") {
    return expandCall(stmt.expression, ctx);
  }
  return null;
}
function expandStatements(stmts, ctx) {
  const out = [];
  for (const stmt of stmts) {
    const expanded = expandStatement(stmt, ctx);
    if (expanded) out.push(...expanded);
    else out.push(stmt);
  }
  return out;
}
function inlineComputedTimelines(ast, timelineVar, resolve) {
  const helpers = collectInlinableHelpers(ast, timelineVar);
  const ctx = {
    helpers,
    timelineVar,
    resolve,
    depth: 0,
    site: { n: 0 },
    order: { n: 0 },
    rootStart: 0
  };
  const body = (ast.body ?? []).filter((stmt) => !isHelperDecl(stmt, helpers));
  ast.body = body.flatMap((stmt) => {
    ctx.rootStart = stmt.start;
    return expandStatements([stmt], ctx);
  });
}
var GSAP_METHODS2 = /* @__PURE__ */ new Set(["set", "to", "from", "fromTo"]);
var QUERY_METHODS = /* @__PURE__ */ new Set(["querySelector", "querySelectorAll"]);
var ITERATION_METHODS = /* @__PURE__ */ new Set(["forEach", "map"]);
var SCOPE_NODE_TYPES = /* @__PURE__ */ new Set([
  "Program",
  "BlockStatement",
  "FunctionDeclaration",
  "FunctionExpression",
  "ArrowFunctionExpression"
]);
function parseProgram(script) {
  try {
    return parse(script, {
      ecmaVersion: "latest",
      sourceType: "script",
      locations: true
    });
  } catch {
    return parse(script, {
      ecmaVersion: "latest",
      sourceType: "module",
      locations: true
    });
  }
}
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
function isFunctionNode2(node) {
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
        if (collectionSelector && param?.type === "Identifier" && isFunctionNode2(fn)) {
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
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
      if (callee?.type === "MemberExpression" && callee.property?.type === "Identifier" && (isTimelineRootedCall(node, ref) || isGlobalSet) && GSAP_METHODS2.has(callee.property.name)) {
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
  const timing = getObjectArrayKeyframeTiming(raw.map((entry) => entry.duration));
  if (!timing) return void 0;
  const keyframes = raw.map((entry, index) => ({
    percentage: timing.percentages[index],
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
function staggerAmount(raw) {
  if (typeof raw === "number") return raw;
  if (typeof raw !== "string") return void 0;
  const src = raw.startsWith("__raw:") ? raw.slice(6) : raw;
  const m = /(?:each\s*:\s*)?(-?\d+(?:\.\d+)?)/.exec(src);
  if (!m) return void 0;
  const n2 = Number.parseFloat(m[1]);
  return Number.isFinite(n2) ? n2 : void 0;
}
function restValue(prop) {
  return prop === "opacity" || prop.startsWith("scale") ? 1 : 0;
}
function staggeredKeyframes(anim, each) {
  const vars = { ...anim.properties };
  let from;
  let to;
  if (anim.method === "fromTo") {
    from = { ...anim.fromProperties ?? {} };
    to = vars;
  } else if (anim.method === "from") {
    from = vars;
    to = {};
    for (const k of Object.keys(vars)) to[k] = restValue(k);
  } else {
    from = { ...anim.fromProperties ?? {} };
    for (const k of Object.keys(vars)) if (from[k] === void 0) from[k] = restValue(k);
    to = vars;
  }
  return [
    { percentage: 0, properties: { ...from, stagger: each } },
    { percentage: 100, properties: { ...to, stagger: each } }
  ];
}
function annotateStaggeredCollections(anims) {
  for (const anim of anims) {
    if (anim.keyframes || anim.arcPath) continue;
    const each = staggerAmount(anim.extras?.stagger);
    if (each === void 0) continue;
    anim.keyframes = { format: "percentage", keyframes: staggeredKeyframes(anim, each) };
  }
}
function resolvePositionString(pos, cursor, prevStart) {
  const trimmed = pos.trim();
  if (trimmed === "") return cursor;
  if (trimmed.startsWith("+=")) {
    const n22 = Number.parseFloat(trimmed.slice(2));
    return Number.isFinite(n22) ? cursor + n22 : null;
  }
  if (trimmed.startsWith("-=")) {
    const n22 = Number.parseFloat(trimmed.slice(2));
    return Number.isFinite(n22) ? cursor - n22 : null;
  }
  if (trimmed === "<") return prevStart;
  if (trimmed === ">") return cursor;
  if (trimmed.startsWith("<")) {
    const n22 = Number.parseFloat(trimmed.slice(1));
    return Number.isFinite(n22) ? prevStart + n22 : null;
  }
  if (trimmed.startsWith(">")) {
    const n22 = Number.parseFloat(trimmed.slice(1));
    return Number.isFinite(n22) ? cursor + n22 : null;
  }
  const n2 = Number.parseFloat(trimmed);
  return Number.isFinite(n2) ? n2 : null;
}
function collectGsapSetStates(ast, scope, bindings, source) {
  const states = /* @__PURE__ */ new Map();
  ancestor(ast, {
    // fallow-ignore-next-line complexity
    CallExpression(node, _, ancestors) {
      const callee = node.callee;
      if (callee?.type !== "MemberExpression" || callee.object?.name !== "gsap" || callee.property?.name !== "set")
        return;
      const selector = resolveTargetSelector(node.arguments?.[0], ancestors, scope, bindings);
      if (!selector) return;
      const rec = objectExpressionToRecord(node.arguments?.[1], scope, source);
      const props = states.get(selector) ?? {};
      for (const [k, v] of Object.entries(rec)) {
        if (typeof v === "number" || typeof v === "string") props[k] = v;
      }
      states.set(selector, props);
    }
  });
  return states;
}
function mergeProps(target, props) {
  for (const [k, v] of Object.entries(props)) target[k] = v;
  return target;
}
function seedFromPreState(anim, cur) {
  const from = { ...anim.fromProperties ?? {} };
  let seeded = false;
  for (const prop of Object.keys(anim.properties)) {
    if (from[prop] === void 0 && cur[prop] !== void 0) {
      from[prop] = cur[prop];
      seeded = true;
    }
  }
  if (seeded) anim.fromProperties = from;
}
function seedSetStates(anims, initial) {
  const state = /* @__PURE__ */ new Map();
  for (const [sel, props] of initial) state.set(sel, { ...props });
  for (const anim of anims) {
    const sel = anim.targetSelector;
    if (anim.method === "set") {
      state.set(sel, mergeProps(state.get(sel) ?? {}, anim.properties));
      continue;
    }
    const cur = state.get(sel);
    if (anim.method === "to" && cur) seedFromPreState(anim, cur);
    state.set(sel, mergeProps(state.get(sel) ?? {}, anim.properties));
  }
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
    const n2 = Number.parseFloat(m[3]);
    if (Number.isFinite(n2)) return m[2] === "+" ? base + n2 : base - n2;
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
var PARSE_MEMO_ENTRIES = 4;
var parseMemo = /* @__PURE__ */ new Map();
function parseGsapScriptAcorn(script) {
  const parsed = parseMemo.get(script) ?? parseGsapScriptAcornUncached(script);
  parseMemo.delete(script);
  parseMemo.set(script, parsed);
  if (parseMemo.size > PARSE_MEMO_ENTRIES) parseMemo.delete(parseMemo.keys().next().value);
  return structuredClone(parsed);
}
function parseGsapScriptAcornUncached(script) {
  try {
    const ast = parseProgram(script);
    const scope = collectScopeBindings(ast);
    const detection = findTimelineVar(ast, scope);
    const ref = detection.ref ?? { kind: "identifier", name: "tl" };
    const timelineVar = timelineRootSource(ref, script);
    if (ref.kind === "identifier") {
      try {
        inlineComputedTimelines(ast, timelineVar, (node) => resolveNode(node, scope));
      } catch {
      }
    }
    const identifierBindings = collectIdentifierBindingIndex(ast);
    const targetBindings = collectTargetBindings(ast, scope, identifierBindings);
    const calls = findAllTweenCalls(ast, ref, scope, targetBindings);
    sortBySourcePosition(calls);
    const rawAnims = calls.map(
      (call) => tweenCallToAnimation(call, scope, script, identifierBindings)
    );
    applyTimelineDefaults(rawAnims, detection.defaults);
    seedSetStates(rawAnims, collectGsapSetStates(ast, scope, targetBindings, script));
    const labelDefs = collectAddLabelDefs(ast, ref, scope, calls);
    resolveTimelinePositions(rawAnims, labelDefs);
    annotateStaggeredCollections(rawAnims);
    const animations = assignStableIds(rawAnims);
    const declPattern = ref.kind === "identifier" ? `(?:const|let|var)\\s+${timelineVar}\\s*=\\s*gsap\\.timeline\\s*\\([^)]*\\)\\s*;?` : `${escapeRegExp(timelineVar)}\\s*=\\s*gsap\\.timeline\\s*\\([^)]*\\)\\s*;?`;
    const timelineMatch = script.match(new RegExp(`^[\\s\\S]*?${declPattern}`));
    const fallbackPreamble = ref.kind === "identifier" ? `const ${timelineVar} = gsap.timeline({ paused: true });` : `${timelineVar} = gsap.timeline({ paused: true });`;
    const preamble = timelineMatch?.[0] ?? fallbackPreamble;
    const lastCallIdx = script.lastIndexOf(`${timelineVar}.`);
    let postamble = "";
    if (lastCallIdx !== -1) {
      const afterLast = script.slice(lastCallIdx);
      const endOfCall = afterLast.indexOf(";");
      if (endOfCall !== -1) {
        postamble = script.slice(lastCallIdx + endOfCall + 1).trim();
      }
    }
    const result = { animations, timelineVar, preamble, postamble };
    if (detection.timelineCount > 1) result.multipleTimelines = true;
    if (detection.timelineCount > 0 && detection.ref === null)
      result.unsupportedTimelinePattern = true;
    return result;
  } catch {
    return { animations: [], timelineVar: "tl", preamble: "", postamble: "" };
  }
}
var DEFAULT_TYPEOF = {
  string: "string",
  number: "number",
  color: "string",
  boolean: "boolean",
  enum: "string",
  font: "string",
  image: "string"
};
function isRecord(v) {
  return typeof v === "object" && v !== null;
}
function isVariableType(t) {
  return typeof t === "string" && t in DEFAULT_TYPEOF;
}
function isCompositionVariable(v) {
  if (!isRecord(v)) return false;
  if (typeof v.id !== "string" || typeof v.label !== "string") return false;
  if (!isVariableType(v.type)) return false;
  if (typeof v.default !== DEFAULT_TYPEOF[v.type]) return false;
  if (v.type === "enum" && !Array.isArray(v.options)) return false;
  return true;
}
function parseCompositionVariables(htmlEl) {
  const variablesAttr = htmlEl.getAttribute("data-composition-variables");
  if (!variablesAttr) {
    return [];
  }
  try {
    const parsed = JSON.parse(variablesAttr);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isCompositionVariable);
  } catch {
    return [];
  }
}
var EXCLUDED_TAGS = /* @__PURE__ */ new Set([
  "script",
  "style",
  "template",
  "meta",
  "link",
  "noscript",
  "base"
]);
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function toHfId(hash) {
  const s = (hash >>> 0).toString(36);
  const four = s.length >= 4 ? s.slice(-4) : s.padStart(4, "0");
  return `hf-${four}`;
}
function ownText(el) {
  let text = "";
  el.childNodes.forEach((n2) => {
    if (n2.nodeType === 3) text += n2.nodeValue ?? "";
  });
  return text.trim();
}
function getContractAttribute(el, name) {
  return Array.from(el.attributes).find((attr) => attr.name.toLowerCase() === name)?.value ?? null;
}
function contentKey(el) {
  const attrs = Array.from(el.attributes).filter((a) => !a.name.toLowerCase().startsWith("data-hf-")).map((a) => `${a.name.toLowerCase()}\0${a.value}`).sort().join("");
  return `${el.tagName.toLowerCase()}|${attrs}|${ownText(el)}`;
}
function mintHfId(el, assigned) {
  const key = contentKey(el);
  let id = toHfId(fnv1a(key));
  let dup = 0;
  while (assigned.has(id)) {
    dup += 1;
    if (dup > 1e4) {
      id = `hf-${(fnv1a(key) >>> 0).toString(36)}-${dup}`;
      break;
    }
    id = toHfId(fnv1a(`${key}#${dup}`));
  }
  assigned.add(id);
  return id;
}
function getChildElements(parent) {
  const directChildren = Array.from(parent.children);
  if (directChildren.length || parent.tagName.toLowerCase() !== "template") return directChildren;
  const content = parent.content;
  if (content?.children.length) return Array.from(content.children);
  return directChildren;
}
function isCompositionTemplate(el) {
  if (el.tagName.toLowerCase() !== "template") return false;
  if (getContractAttribute(el, "data-composition-id") !== null) return true;
  for (const child of getChildElements(el)) {
    if (getContractAttribute(child, "data-composition-id") !== null) return true;
  }
  return false;
}
function walkCompositionDescendants(root, visit) {
  const rootElement = root.nodeType === 9 ? root.documentElement : root;
  if (!rootElement) return;
  const walk = (parent) => {
    for (const child of getChildElements(parent)) {
      const isTemplate = child.tagName.toLowerCase() === "template";
      if (isTemplate && !isCompositionTemplate(child)) continue;
      visit(child);
      walk(child);
    }
  };
  walk(rootElement);
}
function assignHfIds(body) {
  const assigned = /* @__PURE__ */ new Set();
  walkCompositionDescendants(body, (el) => {
    const existing = getContractAttribute(el, "data-hf-id");
    if (existing) assigned.add(existing);
  });
  walkCompositionDescendants(body, (el) => {
    if (EXCLUDED_TAGS.has(el.tagName.toLowerCase())) return;
    if (getContractAttribute(el, "data-hf-id")) return;
    el.setAttribute("data-hf-id", mintHfId(el, assigned));
  });
}
function queryByAttr(root, attr, value, tag) {
  const selector = tag ? `${tag}[${attr}]` : `[${attr}]`;
  for (const el of root.querySelectorAll(selector)) {
    if (el.getAttribute(attr) === value) return el;
  }
  return null;
}
function findEnclosingExpressionStatement(ancestors) {
  for (let i = ancestors.length - 2; i >= 0; i--) {
    if (ancestors[i]?.type === "ExpressionStatement") return ancestors[i];
  }
  return null;
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
var COMPOSITION_ATTRIBUTES = Object.freeze({
  start: "data-start",
  duration: "data-duration",
  trackIndex: "data-track-index",
  derivedEnd: "data-end",
  legacyTrack: "data-layer"
});
var CANONICAL_AUTHORED_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.start,
  COMPOSITION_ATTRIBUTES.duration,
  COMPOSITION_ATTRIBUTES.trackIndex
]);
var DERIVED_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.derivedEnd
]);
var LEGACY_TIMING_ATTRIBUTES = Object.freeze([
  COMPOSITION_ATTRIBUTES.derivedEnd,
  COMPOSITION_ATTRIBUTES.legacyTrack
]);
var ClipTimingWriteError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "ClipTimingWriteError";
    this.code = code;
  }
};
function parseNumeric(value) {
  if (value == null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
var REFERENCE_ID_PATTERN = /^[A-Za-z0-9_.:-]+$/;
function isAsciiDigitAt(value, index) {
  const code = value.charCodeAt(index);
  return code >= 48 && code <= 57;
}
function skipDigitsLeft(value, start) {
  let cursor = start;
  while (cursor >= 0 && isAsciiDigitAt(value, cursor)) cursor--;
  return cursor;
}
function skipWhitespaceLeft(value, start) {
  let cursor = start;
  while (cursor >= 0 && (value[cursor] ?? "").trim() === "") cursor--;
  return cursor;
}
function findMagnitudeStart(value) {
  const last = value.length - 1;
  if (!isAsciiDigitAt(value, last)) return null;
  let cursor = skipDigitsLeft(value, last);
  if (value[cursor] === ".") cursor = skipDigitsLeft(value, cursor - 1);
  return cursor + 1;
}
function parseReferenceOffset(value) {
  const magnitudeStart = findMagnitudeStart(value);
  if (magnitudeStart == null) return null;
  const operatorIndex = skipWhitespaceLeft(value, magnitudeStart - 1);
  const operator = value[operatorIndex];
  if (operator !== "+" && operator !== "-") return null;
  const refId = value.slice(0, operatorIndex).trim();
  if (!REFERENCE_ID_PATTERN.test(refId)) return null;
  const magnitude = Number(value.slice(magnitudeStart));
  if (!Number.isFinite(magnitude)) return null;
  return { refId, operator, magnitude };
}
function parseStartExpression(raw) {
  const normalized = (raw ?? "").trim();
  if (!normalized) return null;
  const absolute = parseNumeric(normalized);
  if (absolute != null) return { kind: "absolute", value: absolute };
  if (REFERENCE_ID_PATTERN.test(normalized)) {
    return { kind: "reference", refId: normalized, offset: 0 };
  }
  const reference = parseReferenceOffset(normalized);
  if (!reference) return null;
  return {
    kind: "reference",
    refId: reference.refId,
    offset: reference.operator === "-" ? -reference.magnitude : reference.magnitude
  };
}
function pushDiagnostic(diagnostics, code, attribute, value) {
  diagnostics.push({ code, attribute, value });
}
function resolveStart(expression, rawStart, options, diagnostics) {
  if (rawStart == null || rawStart.trim() === "") {
    return options.defaultStart === void 0 ? 0 : options.defaultStart;
  }
  if (!expression) {
    pushDiagnostic(diagnostics, "invalid-start", COMPOSITION_ATTRIBUTES.start, rawStart);
    return null;
  }
  if (expression.kind === "absolute") return Math.max(0, expression.value);
  const referencedEnd = options.resolveReferenceEnd?.(expression.refId);
  if (referencedEnd == null || !Number.isFinite(referencedEnd)) {
    pushDiagnostic(
      diagnostics,
      "unresolved-start-reference",
      COMPOSITION_ATTRIBUTES.start,
      rawStart
    );
    return null;
  }
  return Math.max(0, referencedEnd + expression.offset);
}
var DERIVED_END_EQUALITY_EPSILON_SECONDS = 1e-9;
function derivedEndsAreConsistent(parsedEnd, canonicalEnd) {
  return Math.abs(parsedEnd - canonicalEnd) <= DERIVED_END_EQUALITY_EPSILON_SECONDS;
}
function diagnoseDerivedEnd(rawEnd, canonicalEnd, diagnostics) {
  const parsedEnd = parseNumeric(rawEnd);
  if (parsedEnd == null) {
    pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    pushDiagnostic(diagnostics, "invalid-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return;
  }
  if (canonicalEnd == null) {
    pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return;
  }
  if (derivedEndsAreConsistent(parsedEnd, canonicalEnd)) {
    return;
  }
  pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
  pushDiagnostic(diagnostics, "conflicting-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
}
function readCanonicalDuration(rawDuration, start, diagnostics) {
  const duration = parseNumeric(rawDuration);
  if (duration == null || duration < 0) {
    pushDiagnostic(diagnostics, "invalid-duration", COMPOSITION_ATTRIBUTES.duration, rawDuration);
    return { duration: null, end: null, durationSource: "invalid" };
  }
  return {
    duration,
    end: start == null ? null : start + duration,
    durationSource: "duration"
  };
}
function readLegacyEnd(rawEnd, start, diagnostics) {
  pushDiagnostic(diagnostics, "deprecated-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
  const end = parseNumeric(rawEnd);
  if (end == null) {
    pushDiagnostic(diagnostics, "invalid-end", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return { duration: null, end: null, durationSource: "invalid" };
  }
  if (start == null) return { duration: null, end, durationSource: "legacy-end" };
  if (end < start) {
    pushDiagnostic(diagnostics, "end-before-start", COMPOSITION_ATTRIBUTES.derivedEnd, rawEnd);
    return { duration: null, end: null, durationSource: "invalid" };
  }
  return { duration: end - start, end, durationSource: "legacy-end" };
}
function readDuration(attributes, start, diagnostics) {
  const rawDuration = attributes.getAttribute(COMPOSITION_ATTRIBUTES.duration);
  const rawEnd = attributes.getAttribute(COMPOSITION_ATTRIBUTES.derivedEnd);
  if (rawDuration == null) {
    return rawEnd == null ? { duration: null, end: null, durationSource: "missing" } : readLegacyEnd(rawEnd, start, diagnostics);
  }
  const canonical = readCanonicalDuration(rawDuration, start, diagnostics);
  if (rawEnd != null) diagnoseDerivedEnd(rawEnd, canonical.end, diagnostics);
  return canonical;
}
function readTrackValue(rawValue, attribute, source, diagnostics) {
  const trackIndex = parseNumeric(rawValue);
  if (trackIndex == null || !Number.isInteger(trackIndex)) {
    pushDiagnostic(diagnostics, "invalid-track-index", attribute, rawValue);
    return { trackIndex: 0, trackSource: "invalid" };
  }
  return { trackIndex, trackSource: source };
}
function readTrack(attributes, diagnostics) {
  const rawTrack = attributes.getAttribute(COMPOSITION_ATTRIBUTES.trackIndex);
  const rawLayer = attributes.getAttribute(COMPOSITION_ATTRIBUTES.legacyTrack);
  if (rawTrack == null && rawLayer == null) return { trackIndex: 0, trackSource: "default" };
  if (rawTrack == null && rawLayer != null) {
    pushDiagnostic(diagnostics, "deprecated-layer", COMPOSITION_ATTRIBUTES.legacyTrack, rawLayer);
    return readTrackValue(
      rawLayer,
      COMPOSITION_ATTRIBUTES.legacyTrack,
      "legacy-layer",
      diagnostics
    );
  }
  const canonical = readTrackValue(
    rawTrack ?? "",
    COMPOSITION_ATTRIBUTES.trackIndex,
    "track-index",
    diagnostics
  );
  if (rawLayer == null) return canonical;
  pushDiagnostic(diagnostics, "deprecated-layer", COMPOSITION_ATTRIBUTES.legacyTrack, rawLayer);
  const parsedLayer = parseNumeric(rawLayer);
  if (parsedLayer != null && parsedLayer !== canonical.trackIndex) {
    pushDiagnostic(diagnostics, "conflicting-layer", COMPOSITION_ATTRIBUTES.legacyTrack, rawLayer);
  }
  return canonical;
}
function readClipTiming(attributes, options = {}) {
  const diagnostics = [];
  const rawStart = attributes.getAttribute(COMPOSITION_ATTRIBUTES.start);
  const startExpression = parseStartExpression(rawStart);
  const start = resolveStart(startExpression, rawStart, options, diagnostics);
  const duration = readDuration(attributes, start, diagnostics);
  const track = readTrack(attributes, diagnostics);
  return { startExpression, start, ...duration, ...track, diagnostics };
}
function serializeStartNumber(start) {
  if (!Number.isFinite(start)) {
    throw new ClipTimingWriteError("invalid-start", "start must be finite");
  }
  return String(start);
}
function serializeStartReference(start) {
  if (start.kind === "absolute") return serializeStartNumber(start.value);
  if (!start.refId || !Number.isFinite(start.offset)) {
    throw new ClipTimingWriteError(
      "invalid-start",
      "reference start must have an id and finite offset"
    );
  }
  if (start.offset === 0) return start.refId;
  return `${start.refId} ${start.offset < 0 ? "-" : "+"} ${Math.abs(start.offset)}`;
}
function serializeStart(start) {
  if (typeof start === "number") return serializeStartNumber(start);
  if (typeof start === "object" && start != null) return serializeStartReference(start);
  if (typeof start === "string" && parseStartExpression(start)) return start.trim();
  throw new ClipTimingWriteError("invalid-start", `invalid start expression: ${start ?? ""}`);
}
function writeDuration(attributes, duration, current) {
  if (duration === null) {
    attributes.removeAttribute(COMPOSITION_ATTRIBUTES.duration);
    return;
  }
  if (duration === void 0) {
    if (attributes.getAttribute(COMPOSITION_ATTRIBUTES.duration) == null && current.duration != null) {
      attributes.setAttribute(COMPOSITION_ATTRIBUTES.duration, String(current.duration));
    }
    return;
  }
  if (!Number.isFinite(duration) || duration < 0) {
    throw new ClipTimingWriteError(
      "invalid-duration",
      "duration must be a finite, non-negative number"
    );
  }
  attributes.setAttribute(COMPOSITION_ATTRIBUTES.duration, String(duration));
}
function writeTrack(attributes, trackIndex, current) {
  if (trackIndex === null) {
    attributes.removeAttribute(COMPOSITION_ATTRIBUTES.trackIndex);
    return;
  }
  if (trackIndex === void 0) {
    if (attributes.getAttribute(COMPOSITION_ATTRIBUTES.trackIndex) == null && current.trackSource === "legacy-layer") {
      attributes.setAttribute(COMPOSITION_ATTRIBUTES.trackIndex, String(current.trackIndex));
    }
    return;
  }
  if (!Number.isFinite(trackIndex) || !Number.isInteger(trackIndex)) {
    throw new ClipTimingWriteError("invalid-track-index", "trackIndex must be a finite integer");
  }
  attributes.setAttribute(COMPOSITION_ATTRIBUTES.trackIndex, String(trackIndex));
}
function writeClipTiming(attributes, update) {
  const current = readClipTiming(attributes);
  if (update.start !== void 0) {
    attributes.setAttribute(COMPOSITION_ATTRIBUTES.start, serializeStart(update.start));
  }
  writeDuration(attributes, update.duration, current);
  writeTrack(attributes, update.trackIndex, current);
  const preserveUnresolvedLegacyEnd = update.duration === void 0 && attributes.getAttribute(COMPOSITION_ATTRIBUTES.duration) == null && attributes.getAttribute(COMPOSITION_ATTRIBUTES.derivedEnd) != null && current.duration == null;
  if (!preserveUnresolvedLegacyEnd) {
    attributes.removeAttribute(COMPOSITION_ATTRIBUTES.derivedEnd);
  }
  attributes.removeAttribute(COMPOSITION_ATTRIBUTES.legacyTrack);
  return readClipTiming(attributes);
}
var MEDIA_TYPES = /* @__PURE__ */ new Set(["video", "image", "audio"]);
var CompositionHtmlParseError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CompositionHtmlParseError";
  }
};
function getElementType(el) {
  const tag = el.tagName.toLowerCase();
  if (tag === "video") return "video";
  if (tag === "img") return "image";
  if (tag === "audio") return "audio";
  const dataType = el.getAttribute("data-type");
  if (dataType === "composition") return "composition";
  if (dataType === "text") return "text";
  if (tag === "div" || tag === "p" || tag === "h1" || tag === "h2" || tag === "h3" || tag === "span") {
    return "text";
  }
  return null;
}
function getElementName(el) {
  const dataName = el.getAttribute("data-name");
  if (dataName) return dataName;
  const type = getElementType(el);
  if (type === "text") {
    const text = el.textContent?.trim().slice(0, 30) || "Text";
    return text.length === 30 ? text + "..." : text;
  }
  const src = el.getAttribute("src");
  if (src) {
    const filename = src.split("/").pop() || src;
    return filename.split("?")[0] ?? filename;
  }
  return el.id || el.className?.toString().split(" ")[0] || "Element";
}
function getZIndex(el) {
  const timing = readClipTiming(el);
  if (timing.trackSource !== "default" && timing.trackSource !== "invalid") {
    return timing.trackIndex;
  }
  const style = el.style?.zIndex;
  if (style) return parseInt(style, 10) || 0;
  return 0;
}
function parseResolutionFromCss(doc, cssText) {
  const stage = doc.getElementById("stage") || doc.querySelector("#stage");
  if (stage) {
    const inlineStyle = stage.style;
    if (inlineStyle?.width && inlineStyle?.height) {
      const w = parseInt(inlineStyle.width, 10);
      const h = parseInt(inlineStyle.height, 10);
      if (w && h) {
        return resolveResolutionFromDimensions(w, h);
      }
    }
  }
  if (cssText) {
    const stageMatch = cssText.match(
      /#stage\s*\{[^}]*width:\s*(\d+)px[^}]*height:\s*(\d+)px[^}]*\}/
    );
    if (stageMatch) {
      const w = parseInt(stageMatch[1] ?? "", 10);
      const h = parseInt(stageMatch[2] ?? "", 10);
      return resolveResolutionFromDimensions(w, h);
    }
    const stageMatchReverse = cssText.match(
      /#stage\s*\{[^}]*height:\s*(\d+)px[^}]*width:\s*(\d+)px[^}]*\}/
    );
    if (stageMatchReverse) {
      const h = parseInt(stageMatchReverse[1] ?? "", 10);
      const w = parseInt(stageMatchReverse[2] ?? "", 10);
      return resolveResolutionFromDimensions(w, h);
    }
  }
  return "portrait";
}
function parseResolutionFromHtml(doc) {
  const htmlEl = doc.documentElement;
  if (!htmlEl) return null;
  const resolutionAttr = htmlEl.getAttribute("data-resolution");
  if (resolutionAttr === "landscape" || resolutionAttr === "portrait" || resolutionAttr === "landscape-4k" || resolutionAttr === "portrait-4k" || resolutionAttr === "square" || resolutionAttr === "square-4k") {
    return resolutionAttr;
  }
  const widthAttr = htmlEl.getAttribute("data-composition-width");
  const heightAttr = htmlEl.getAttribute("data-composition-height");
  if (widthAttr && heightAttr) {
    const width = parseInt(widthAttr, 10);
    const height = parseInt(heightAttr, 10);
    if (width && height) {
      return resolveResolutionFromDimensions(width, height);
    }
  }
  return null;
}
var UHD_SQUARE_MIN = 2160;
var UHD_RECT_MIN = 3840;
function resolveResolutionFromDimensions(width, height) {
  const longSide = Math.max(width, height);
  if (width === height) {
    return longSide >= UHD_SQUARE_MIN ? "square-4k" : "square";
  }
  const isLandscape = width > height;
  const isUhd = longSide >= UHD_RECT_MIN;
  if (isLandscape) return isUhd ? "landscape-4k" : "landscape";
  return isUhd ? "portrait-4k" : "portrait";
}
function parseHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const elements = [];
  const keyframes = {};
  let idCounter = 0;
  const htmlEl = doc.documentElement;
  if (!htmlEl) {
    throw new CompositionHtmlParseError("parseHtml: input HTML is empty or could not be parsed");
  }
  if (doc.body) assignHfIds(doc.body);
  const customStylesAttr = htmlEl.getAttribute("data-custom-styles");
  let customStyles = null;
  if (customStylesAttr) {
    try {
      customStyles = JSON.parse(customStylesAttr);
    } catch {
      customStyles = customStylesAttr;
    }
  }
  const timedElements = Array.from(doc.querySelectorAll("[data-start]"));
  const timedById = /* @__PURE__ */ new Map();
  for (const element of timedElements) {
    for (const id of [element.id, element.getAttribute("data-hf-id")]) {
      if (id) timedById.set(id, element);
    }
  }
  const resolveEnd = (refId, visiting) => {
    if (visiting.has(refId)) return null;
    const referenced = timedById.get(refId);
    if (!referenced) return null;
    const next = new Set(visiting);
    next.add(refId);
    return readClipTiming(referenced, {
      resolveReferenceEnd: (nestedId) => resolveEnd(nestedId, next)
    }).end;
  };
  timedElements.forEach((el) => {
    const type = getElementType(el);
    if (!type) return;
    const ownId = el.id || el.getAttribute("data-hf-id");
    const timing = readClipTiming(el, {
      resolveReferenceEnd: (refId) => resolveEnd(refId, new Set(ownId ? [ownId] : []))
    });
    const start = timing.start ?? 0;
    const duration = timing.duration ?? 5;
    const id = el.getAttribute("data-hf-id") || el.id || `element-${++idCounter}`;
    const name = getElementName(el);
    const zIndex = getZIndex(el);
    const keyframesAttr = el.getAttribute("data-keyframes");
    if (keyframesAttr) {
      try {
        const parsedKeyframes = JSON.parse(keyframesAttr);
        if (Array.isArray(parsedKeyframes) && parsedKeyframes.length > 0) {
          keyframes[id] = parsedKeyframes;
        }
      } catch {
      }
    }
    const xAttr = el.getAttribute("data-x");
    const yAttr = el.getAttribute("data-y");
    const scaleAttr = el.getAttribute("data-scale");
    const opacityAttr = el.getAttribute("data-opacity");
    const x = xAttr ? parseFloat(xAttr) : void 0;
    const y = yAttr ? parseFloat(yAttr) : void 0;
    const scale = scaleAttr ? parseFloat(scaleAttr) : void 0;
    const opacity = opacityAttr ? parseFloat(opacityAttr) : void 0;
    if (type === "text") {
      const textEl = el.firstElementChild;
      const content = textEl?.textContent ?? name;
      const color = el.getAttribute("data-color") || void 0;
      const fontSizeAttr = el.getAttribute("data-font-size");
      const fontSize = fontSizeAttr ? parseInt(fontSizeAttr, 10) : void 0;
      const fontWeightAttr = el.getAttribute("data-font-weight");
      const fontWeight = fontWeightAttr ? parseInt(fontWeightAttr, 10) : void 0;
      const fontFamily = el.getAttribute("data-font-family") || void 0;
      const textShadowAttr = el.getAttribute("data-text-shadow");
      const textShadow = textShadowAttr === "false" ? false : void 0;
      const textOutlineAttr = el.getAttribute("data-text-outline");
      const textOutline = textOutlineAttr === "true" ? true : void 0;
      const textOutlineColor = el.getAttribute("data-text-outline-color") || void 0;
      const textOutlineWidthAttr = el.getAttribute("data-text-outline-width");
      const textOutlineWidth = textOutlineWidthAttr ? parseInt(textOutlineWidthAttr, 10) : void 0;
      const textHighlightAttr = el.getAttribute("data-text-highlight");
      const textHighlight = textHighlightAttr === "true" ? true : void 0;
      const textHighlightColor = el.getAttribute("data-text-highlight-color") || void 0;
      const textHighlightPaddingAttr = el.getAttribute("data-text-highlight-padding");
      const textHighlightPadding = textHighlightPaddingAttr ? parseInt(textHighlightPaddingAttr, 10) : void 0;
      const textHighlightRadiusAttr = el.getAttribute("data-text-highlight-radius");
      const textHighlightRadius = textHighlightRadiusAttr ? parseInt(textHighlightRadiusAttr, 10) : void 0;
      const textElement = {
        id,
        type: "text",
        name,
        content,
        startTime: start,
        duration,
        zIndex,
        x,
        y,
        scale,
        opacity,
        color,
        fontSize,
        fontWeight,
        fontFamily,
        textShadow,
        textOutline,
        textOutlineColor,
        textOutlineWidth,
        textHighlight,
        textHighlightColor,
        textHighlightPadding,
        textHighlightRadius
      };
      elements.push(textElement);
    } else if (type === "composition") {
      const iframe = el.querySelector("iframe");
      const src = iframe?.getAttribute("src") || el.getAttribute("src") || "";
      const compositionId = el.getAttribute("data-composition-id") || "";
      const sourceDurationAttr = el.getAttribute("data-source-duration");
      const sourceDuration = sourceDurationAttr ? parseFloat(sourceDurationAttr) : void 0;
      const sourceWidthAttr = el.getAttribute("data-source-width");
      const sourceWidth = sourceWidthAttr ? parseInt(sourceWidthAttr, 10) : void 0;
      const sourceHeightAttr = el.getAttribute("data-source-height");
      const sourceHeight = sourceHeightAttr ? parseInt(sourceHeightAttr, 10) : void 0;
      const variableValuesAttr = el.getAttribute("data-variable-values");
      let variableValues;
      if (variableValuesAttr) {
        try {
          variableValues = JSON.parse(variableValuesAttr);
        } catch {
        }
      }
      const compositionElement = {
        id,
        type: "composition",
        name,
        src,
        compositionId,
        startTime: start,
        duration,
        zIndex,
        x,
        y,
        scale,
        opacity,
        sourceDuration,
        sourceWidth,
        sourceHeight,
        variableValues
      };
      elements.push(compositionElement);
    } else {
      if (!MEDIA_TYPES.has(type)) return;
      const src = el.getAttribute("src") || "";
      const mediaStartTimeAttr = el.getAttribute("data-media-start");
      const mediaStartTime = mediaStartTimeAttr ? parseFloat(mediaStartTimeAttr) : void 0;
      const sourceDurationAttr = el.getAttribute("data-source-duration");
      const sourceDuration = sourceDurationAttr ? parseFloat(sourceDurationAttr) : void 0;
      const isArollAttr = el.getAttribute("data-aroll");
      const isAroll = isArollAttr === "true" ? true : void 0;
      const volumeAttr = el.getAttribute("data-volume");
      const volume = volumeAttr ? parseFloat(volumeAttr) : void 0;
      const hasAudioAttr = el.getAttribute("data-has-audio");
      const hasAudio = hasAudioAttr === "true" ? true : void 0;
      const mediaElement = {
        id,
        type,
        name,
        src,
        startTime: start,
        duration,
        zIndex,
        x,
        y,
        scale,
        opacity,
        mediaStartTime,
        sourceDuration,
        isAroll,
        volume,
        hasAudio
      };
      elements.push(mediaElement);
    }
  });
  const scriptTags = findScriptElementsDeep(doc);
  let gsapScript = null;
  for (const script of scriptTags) {
    const src = script.getAttribute("src");
    if (src && src.includes("gsap")) continue;
    const content = script.textContent?.trim();
    if (content && (content.includes("gsap") || content.includes("timeline"))) {
      gsapScript = content;
      break;
    }
  }
  for (const element of elements) {
    const elementKeyframes = keyframes[element.id];
    if (!elementKeyframes || elementKeyframes.length === 0) continue;
    const baseX = element.x ?? 0;
    const baseY = element.y ?? 0;
    const baseScale = element.type === "video" || element.type === "image" || element.type === "composition" ? element.scale ?? 1 : 1;
    keyframes[element.id] = normalizeKeyframes(elementKeyframes, baseX, baseY, baseScale);
  }
  const styleTags = doc.querySelectorAll("style");
  const allStyles = Array.from(styleTags).map((s) => s.textContent?.trim()).filter(Boolean).join("\n\n") || null;
  const customStyleTags = Array.from(styleTags).filter(
    (s) => s.getAttribute("data-hf-custom") === "true"
  );
  const customStylesFromTags = customStyleTags.map((s) => s.textContent?.trim()).filter(Boolean).join("\n\n") || null;
  const styles = customStyles ?? customStylesFromTags ?? null;
  const resolution = parseResolutionFromHtml(doc) ?? parseResolutionFromCss(doc, allStyles);
  const stageZoomKeyframes = parseStageZoomKeyframes(doc);
  return {
    elements,
    gsapScript,
    styles,
    resolution,
    keyframes,
    stageZoomKeyframes
  };
}
function parseStageZoomKeyframes(doc) {
  const zoomContainer = doc.getElementById("stage-zoom-container");
  if (!zoomContainer) {
    return [];
  }
  const zoomKeyframesAttr = zoomContainer.getAttribute("data-zoom-keyframes");
  if (!zoomKeyframesAttr) {
    return [];
  }
  try {
    const parsed = JSON.parse(zoomKeyframesAttr);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (kf) => typeof kf === "object" && kf !== null && typeof kf.id === "string" && typeof kf.time === "number" && typeof kf.zoom === "object" && kf.zoom !== null && typeof kf.zoom.scale === "number" && typeof kf.zoom.focusX === "number" && typeof kf.zoom.focusY === "number"
      );
    }
  } catch {
  }
  return [];
}
function normalizeKeyframes(keyframes, baseX, baseY, baseScale) {
  const timeEpsilon = 1e-3;
  const valueEpsilon = 1e-5;
  const hasBaseCheck = (value, base) => value !== void 0 && Math.abs(value - base) <= valueEpsilon && Math.abs(base) > valueEpsilon;
  const timeZeroKeyframes = keyframes.filter((kf) => Math.abs(kf.time) <= timeEpsilon);
  const treatAsAbsolute = timeZeroKeyframes.some((kf) => {
    const props = kf.properties || {};
    if (hasBaseCheck(props.x, baseX) || hasBaseCheck(props.y, baseY) || baseScale !== 1 && hasBaseCheck(props.scale, baseScale)) {
      return true;
    }
    return false;
  });
  return keyframes.map((kf) => {
    const normalizedProps = {};
    for (const [key, value] of Object.entries(kf.properties || {})) {
      if (typeof value !== "number") continue;
      if (treatAsAbsolute && key === "x") {
        normalizedProps.x = value - baseX;
      } else if (treatAsAbsolute && key === "y") {
        normalizedProps.y = value - baseY;
      } else if (treatAsAbsolute && key === "scale") {
        normalizedProps.scale = baseScale !== 0 ? value / baseScale : value;
      } else {
        normalizedProps[key] = value;
      }
    }
    return {
      ...kf,
      time: Math.max(0, kf.time),
      properties: normalizedProps
    };
  });
}
function updateElementInHtml(html, elementId, updates) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const el = doc.getElementById(elementId) || queryByAttr(doc, "data-name", elementId);
  if (!el) return html;
  if (updates.startTime !== void 0 || updates.duration !== void 0 || updates.zIndex !== void 0) {
    writeClipTiming(el, {
      start: updates.startTime,
      duration: updates.duration,
      trackIndex: updates.zIndex
    });
  }
  if (updates.name !== void 0) {
    el.setAttribute("data-name", updates.name);
  }
  if ("src" in updates && updates.src !== void 0) {
    el.setAttribute("src", updates.src);
  }
  if ("content" in updates && updates.content !== void 0) {
    const textEl = el.firstElementChild;
    if (textEl) {
      textEl.textContent = updates.content;
    }
  }
  if ("color" in updates && updates.color !== void 0) {
    el.setAttribute("data-color", updates.color);
  }
  if ("fontSize" in updates && updates.fontSize !== void 0) {
    el.setAttribute("data-font-size", String(updates.fontSize));
  }
  if ("textShadow" in updates) {
    if (updates.textShadow === false) {
      el.setAttribute("data-text-shadow", "false");
    } else {
      el.removeAttribute("data-text-shadow");
    }
  }
  if ("volume" in updates) {
    if (updates.volume !== void 0 && updates.volume !== 1) {
      el.setAttribute("data-volume", String(updates.volume));
    } else {
      el.removeAttribute("data-volume");
    }
  }
  if (el.tagName.toLowerCase() === "video" && "hasAudio" in updates) {
    if (updates.hasAudio === true) {
      el.setAttribute("data-has-audio", "true");
      el.removeAttribute("muted");
    } else if (updates.hasAudio === false) {
      el.removeAttribute("data-has-audio");
      el.setAttribute("muted", "");
    }
  }
  if (!doc.documentElement) {
    throw new CompositionHtmlParseError(
      "updateElementInHtml: input HTML is empty or could not be parsed"
    );
  }
  return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
}
function addElementToHtml(html, element) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  if (!doc.documentElement) {
    throw new CompositionHtmlParseError(
      "addElementToHtml: input HTML is empty or could not be parsed"
    );
  }
  const container = doc.querySelector("#stage-zoom-container") || doc.querySelector(".container") || doc.querySelector("#stage") || doc.body;
  if (!container) {
    throw new CompositionHtmlParseError("addElementToHtml: input HTML has no <body>");
  }
  const id = element.id || `element-${Date.now()}`;
  let newEl;
  function applyMediaAttrs(el, mediaEl) {
    if (mediaEl.src) el.setAttribute("src", mediaEl.src);
    if (mediaEl.volume !== void 0 && mediaEl.volume !== 1) {
      el.setAttribute("data-volume", String(mediaEl.volume));
    }
  }
  switch (element.type) {
    case "video": {
      const mediaEl = element;
      newEl = doc.createElement("video");
      newEl.setAttribute("playsinline", "");
      applyMediaAttrs(newEl, mediaEl);
      if (mediaEl.hasAudio) newEl.setAttribute("data-has-audio", "true");
      else newEl.setAttribute("muted", "");
      break;
    }
    case "image": {
      const mediaEl = element;
      newEl = doc.createElement("img");
      if (mediaEl.src) newEl.setAttribute("src", mediaEl.src);
      newEl.setAttribute("alt", element.name);
      break;
    }
    case "audio": {
      const mediaEl = element;
      newEl = doc.createElement("audio");
      applyMediaAttrs(newEl, mediaEl);
      break;
    }
    case "text":
    default: {
      const textEl = element;
      newEl = doc.createElement("div");
      const textContent = doc.createElement("div");
      textContent.textContent = textEl.content || element.name;
      newEl.appendChild(textContent);
      if (textEl.color) {
        newEl.setAttribute("data-color", textEl.color);
      }
      if (textEl.fontSize) {
        newEl.setAttribute("data-font-size", String(textEl.fontSize));
      }
      break;
    }
  }
  newEl.id = id;
  writeClipTiming(newEl, {
    start: element.startTime,
    duration: element.duration,
    trackIndex: element.zIndex
  });
  newEl.setAttribute("data-name", element.name);
  container.appendChild(newEl);
  return {
    html: "<!DOCTYPE html>\n" + doc.documentElement.outerHTML,
    id
  };
}
function elementSelectors(element) {
  const selectors = [];
  const id = element.getAttribute("id");
  const hfId = element.getAttribute("data-hf-id");
  if (id) selectors.push(`#${id}`);
  if (hfId) selectors.push(`[data-hf-id="${hfId}"]`, `[data-hf-id='${hfId}']`);
  return selectors;
}
function removeElementWithGsapCascade(doc, element) {
  const removedSelectors = new Set(elementSelectors(element));
  walkCompositionDescendants(element, (child) => {
    for (const selector of elementSelectors(child)) removedSelectors.add(selector);
  });
  element.remove();
  walkCompositionDescendants(doc, (survivor) => {
    for (const selector of elementSelectors(survivor)) removedSelectors.delete(selector);
  });
  if (removedSelectors.size === 0) return;
  for (const script of findScriptElementsDeep(doc)) {
    let current = script.textContent ?? "";
    if (!current.includes("gsap") && !current.includes("ScrollTrigger")) continue;
    for (; ; ) {
      const parsed = parseGsapScriptAcornForWrite(current);
      const match = parsed?.located.find(
        (located) => removedSelectors.has(located.animation.targetSelector)
      );
      if (!match) break;
      const updated = removeAnimationFromScript(current, match.id);
      if (updated === current) break;
      current = updated;
    }
    if (current !== script.textContent) script.textContent = current;
  }
}
function removeElementFromHtml(html, elementId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  if (!doc.documentElement) {
    throw new CompositionHtmlParseError(
      "removeElementFromHtml: input HTML is empty or could not be parsed"
    );
  }
  const element = doc.getElementById(elementId);
  if (element) removeElementWithGsapCascade(doc, element);
  return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
}
function extractCompositionMetadata(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const htmlEl = doc.documentElement;
  if (!htmlEl) {
    throw new CompositionHtmlParseError(
      "extractCompositionMetadata: input HTML is empty or could not be parsed"
    );
  }
  const compositionId = htmlEl.getAttribute("data-composition-id");
  const durationStr = htmlEl.getAttribute("data-composition-duration");
  const compositionDuration = durationStr ? parseFloat(durationStr) : null;
  const root = (doc.querySelector("template")?.content ?? doc).querySelector(
    "[data-composition-id]"
  );
  const variables = [
    ...new Map(
      [
        ...parseCompositionVariables(htmlEl),
        ...root && root !== htmlEl ? parseCompositionVariables(root) : []
      ].map((v) => [v.id, v])
    ).values()
  ];
  return {
    compositionId,
    compositionDuration: compositionDuration && isFinite(compositionDuration) ? compositionDuration : null,
    variables
  };
}
function validateCompositionHtml(html) {
  const errors = [];
  const warnings = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const htmlEl = doc.documentElement;
  if (!htmlEl) {
    return {
      valid: false,
      errors: ["Composition HTML is empty or could not be parsed"],
      warnings: []
    };
  }
  const compositionId = htmlEl.getAttribute("data-composition-id");
  if (!compositionId) {
    errors.push("Missing data-composition-id attribute on <html> element");
  }
  const durationStr = htmlEl.getAttribute("data-composition-duration");
  if (!durationStr) {
    errors.push("Missing data-composition-duration attribute on <html> element");
  } else {
    const duration = parseFloat(durationStr);
    if (!isFinite(duration) || duration <= 0) {
      errors.push("data-composition-duration must be a positive finite number");
    }
  }
  const stage = doc.getElementById("stage");
  if (!stage) {
    errors.push("Missing #stage element");
  }
  if (/\son\w+\s*=/i.test(html)) {
    errors.push("Inline event handlers (onclick, onload, etc.) not allowed");
  }
  if (/javascript\s*:/i.test(html)) {
    errors.push("javascript: URLs not allowed");
  }
  const scripts = findScriptElementsDeep(doc);
  if (scripts.length > 2) {
    warnings.push("Multiple script tags detected - only GSAP CDN and main script expected");
  }
  for (const gsapScript of extractGsapScripts(doc)) {
    const gsapValidation = validateCompositionGsap(gsapScript);
    errors.push(...gsapValidation.errors);
    warnings.push(...gsapValidation.warnings);
  }
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
function findScriptElementsDeep(doc) {
  const scripts = [];
  walkCompositionDescendants(doc, (el) => {
    if (el.tagName.toLowerCase() === "script") scripts.push(el);
  });
  return scripts;
}
function extractGsapScripts(doc) {
  const scripts = findScriptElementsDeep(doc);
  const gsapScripts = [];
  for (const script of scripts) {
    const content = script.textContent || "";
    if (content.includes("gsap.timeline") || content.includes(".set(") || content.includes(".to(")) {
      gsapScripts.push(content);
    }
  }
  return gsapScripts;
}
var OK = { ok: true };
function suggestMatchingPreset(compositionWidth, compositionHeight, chosen) {
  const aspectMatches = VALID_CANVAS_RESOLUTIONS.filter((preset) => {
    const { width, height } = CANVAS_DIMENSIONS[preset];
    return width * compositionHeight === height * compositionWidth;
  });
  if (aspectMatches.length === 0) return void 0;
  const chosenIs4k = chosen.endsWith("-4k");
  const sameTier = aspectMatches.find((preset) => preset.endsWith("-4k") === chosenIs4k);
  return sameTier ?? aspectMatches[0];
}
function describeOrientation(width, height) {
  if (width > height) return "landscape";
  if (width < height) return "portrait";
  return "square";
}
function buildAspectMismatch(compositionWidth, compositionHeight, outputResolution, target) {
  const suggestedResolution = suggestMatchingPreset(
    compositionWidth,
    compositionHeight,
    outputResolution
  );
  const suggestion = suggestedResolution ? ` The composition is ${describeOrientation(compositionWidth, compositionHeight)} \u2014 use --resolution ${suggestedResolution} instead.` : ` Pick a preset whose orientation matches, or omit --resolution to render at the composition's native dimensions.`;
  return {
    ok: false,
    kind: "aspect-mismatch",
    suggestedResolution,
    message: `outputResolution ${outputResolution} (${target.width}\xD7${target.height}) does not match the aspect ratio of the composition (${compositionWidth}\xD7${compositionHeight}).` + suggestion
  };
}
function checkOutputResolutionCompatibility(input) {
  const { compositionWidth, compositionHeight, outputResolution } = input;
  if (!outputResolution) return OK;
  if (input.hdrRequested) {
    return {
      ok: false,
      kind: "hdr-incompatible",
      message: `outputResolution cannot be combined with hdrMode='force-hdr'. HDR rendering composites at composition dimensions and does not yet support supersampling. Pick one or render in two passes.`
    };
  }
  const target = CANVAS_DIMENSIONS[outputResolution];
  if (target.width * compositionHeight !== target.height * compositionWidth) {
    return buildAspectMismatch(compositionWidth, compositionHeight, outputResolution, target);
  }
  const widthRatio = target.width / compositionWidth;
  if (widthRatio < 1) {
    return {
      ok: false,
      kind: "downsampling",
      message: `outputResolution ${outputResolution} (${target.width}\xD7${target.height}) is smaller than the composition (${compositionWidth}\xD7${compositionHeight}). Downsampling via --resolution is not supported.`
    };
  }
  if (!Number.isInteger(widthRatio)) {
    return {
      ok: false,
      kind: "non-integer-scale",
      message: `outputResolution ${outputResolution} requires a non-integer device scale factor (${widthRatio}\xD7) to upsample from ${compositionWidth}\xD7${compositionHeight}. Pick a preset that's an integer multiple, or rescale the composition.`
    };
  }
  return OK;
}
function propEntries(props) {
  return Object.entries(props).map(([k, v]) => `${safeJsKey(k)}: ${serializeValue(v)}`);
}
function motionPathEntry(anim) {
  const waypoints = (anim.keyframes?.keyframes ?? []).filter((k) => typeof k.properties.x === "number" && typeof k.properties.y === "number").map((k) => `{ x: ${serializeValue(k.properties.x)}, y: ${serializeValue(k.properties.y)} }`);
  const curviness = anim.arcPath?.segments[0]?.curviness ?? 1;
  const autoRotate = anim.arcPath?.autoRotate;
  const extra = autoRotate ? `, autoRotate: ${serializeValue(autoRotate)}` : "";
  return `motionPath: { path: [${waypoints.join(", ")}], curviness: ${curviness}${extra} }`;
}
function keyframesEntry(anim) {
  const kfs = (anim.keyframes?.keyframes ?? []).map((k) => {
    const body = propEntries(k.properties);
    if (k.ease) body.push(`ease: ${serializeValue(k.ease)}`);
    return `${JSON.stringify(plainPercentKey(k.percentage))}: { ${body.join(", ")} }`;
  });
  if (anim.keyframes?.easeEach) kfs.push(`easeEach: ${serializeValue(anim.keyframes.easeEach)}`);
  return `keyframes: { ${kfs.join(", ")} }`;
}
function buildVarsParts(anim) {
  const parts = [];
  if (anim.arcPath?.enabled) parts.push(motionPathEntry(anim));
  else if (anim.keyframes) parts.push(keyframesEntry(anim));
  parts.push(...propEntries(anim.properties));
  if (anim.method !== "set" && anim.duration !== void 0) {
    parts.push(`duration: ${serializeValue(anim.duration)}`);
  }
  if (anim.ease) parts.push(`ease: ${serializeValue(anim.ease)}`);
  for (const [k, v] of Object.entries(anim.extras ?? {})) {
    parts.push(`${safeJsKey(k)}: ${serializeValue(v)}`);
  }
  return parts;
}
function serializeTweenStatement(timelineVar, anim) {
  const obj = `{ ${buildVarsParts(anim).join(", ")} }`;
  const pos = serializeValue(
    anim.resolvedStart ?? (typeof anim.position === "number" ? anim.position : 0)
  );
  const sel = serializeValue(anim.targetSelector);
  if (anim.method === "fromTo") {
    const from = `{ ${propEntries(anim.fromProperties ?? {}).join(", ")} }`;
    return `${timelineVar}.fromTo(${sel}, ${from}, ${obj}, ${pos});`;
  }
  return `${timelineVar}.${anim.method}(${sel}, ${obj}, ${pos});`;
}
function isComputed(anim) {
  return anim.provenance?.kind === "helper" || anim.provenance?.kind === "loop";
}
function topLevelStatements(script) {
  return parse(script, { ecmaVersion: "latest", sourceType: "script" }).body ?? [];
}
function enclosingTopLevel(statements, start, end) {
  for (const stmt of statements) {
    if (stmt.start <= start && stmt.end >= end) return stmt;
  }
  return null;
}
function declaresFunction(stmt) {
  if (stmt.type === "FunctionDeclaration") return true;
  return stmt.type === "VariableDeclaration" && (stmt.declarations ?? []).some((d) => isFunctionNode(d.init));
}
function declaredNames(stmt) {
  if (stmt.type === "FunctionDeclaration") return stmt.id?.name ? [stmt.id.name] : [];
  if (stmt.type !== "VariableDeclaration") return [];
  return (stmt.declarations ?? []).flatMap((d) => d.id?.name ? [d.id.name] : []);
}
function mentionsIdentifier(text, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{ID_Continue}$])${escaped}(?![\\p{ID_Continue}$])`, "u").test(text);
}
function unreferencedHelperDecls(statements, script, unrolled, helperNames) {
  let live = statements.filter((stmt) => !unrolled.has(stmt));
  const dead = [];
  for (let changed = true; changed; ) {
    changed = false;
    for (const decl of live) {
      const names = declaredNames(decl);
      if (names.length === 0 || !names.every((n2) => helperNames.has(n2))) continue;
      const others = live.filter((s) => s !== decl).map((s) => script.slice(s.start, s.end));
      if (names.some((n2) => others.some((text) => mentionsIdentifier(text, n2)))) continue;
      dead.push(decl);
      live = live.filter((s) => s !== decl);
      changed = true;
    }
  }
  return dead;
}
var EFFECT_NODES = /* @__PURE__ */ new Set([
  "CallExpression",
  "NewExpression",
  "UpdateExpression",
  "AssignmentExpression"
]);
function containsEffect(node) {
  let hit = false;
  full(node, (n2) => {
    if (EFFECT_NODES.has(n2.type)) hit = true;
  });
  return hit;
}
function isPureTweenChain(expr, timelineVar) {
  let node = expr;
  while (node?.type === "CallExpression") {
    if (!isTimelineRooted(node, timelineVar) || node.arguments.some(containsEffect)) return false;
    node = node.callee?.object;
  }
  return node?.type === "Identifier";
}
var blockStatements = (block) => block?.type === "BlockStatement" ? block.body : block ? [block] : [];
function forEachBody(call) {
  const callback = call.callee?.property?.name === "forEach" ? call.arguments[0] : null;
  return callback?.body ? blockStatements(callback.body) : null;
}
function calledBody(call, helpers) {
  if (call?.type !== "CallExpression") return null;
  if (call.callee?.type !== "Identifier") return forEachBody(call);
  return helpers.get(call.callee.name) ?? null;
}
function bodyOf(stmt, helpers) {
  if (stmt.type === "ExpressionStatement") return calledBody(stmt.expression, helpers);
  return stmt.body ? blockStatements(stmt.body) : null;
}
function onlyAddsTweens(stmts, ctx, seen = /* @__PURE__ */ new Set()) {
  if (seen.has(stmts)) return false;
  seen.add(stmts);
  return stmts.every((stmt) => {
    if (stmt.type === "VariableDeclaration") return !containsEffect(stmt);
    if (stmt.type === "ExpressionStatement" && isPureTweenChain(stmt.expression, ctx.timelineVar)) {
      return true;
    }
    const nested = bodyOf(stmt, ctx.helpers);
    return nested !== null && onlyAddsTweens(nested, ctx, seen);
  });
}
function declaredFunctions(stmt) {
  if (stmt.type === "FunctionDeclaration") {
    return stmt.id?.name ? [[stmt.id.name, blockStatements(stmt.body)]] : [];
  }
  if (stmt.type !== "VariableDeclaration") return [];
  return stmt.declarations.filter((d) => d.id?.name && isFunctionNode(d.init)).map((d) => [d.id.name, blockStatements(d.init.body)]);
}
var collectHelperBodies = (statements) => new Map(statements.flatMap(declaredFunctions));
function dropStatementsUnsafeToUnroll(byStatement, ctx) {
  for (const [stmt, anims] of byStatement) {
    const unknownTiming = anims.some(
      (a) => a.durationUnresolved || a.resolvedStart === void 0 || a.hasUnresolvedSelector || a.hasUnresolvedKeyframes
    );
    const bodyStmts = unknownTiming ? null : bodyOf(stmt, ctx.helpers);
    if (bodyStmts === null || !onlyAddsTweens(bodyStmts, ctx)) byStatement.delete(stmt);
  }
}
function groupByTopLevelStatement(computed, statements) {
  const byStatement = /* @__PURE__ */ new Map();
  const helperNames = /* @__PURE__ */ new Set();
  for (const anim of computed) {
    const [s, e] = anim.provenance.sourceRange;
    const stmt = enclosingTopLevel(statements, s, e);
    if (stmt && declaresFunction(stmt)) return null;
    if (!stmt) continue;
    if (anim.provenance?.fn) helperNames.add(anim.provenance.fn);
    const list = byStatement.get(stmt) ?? [];
    list.push(anim);
    byStatement.set(stmt, list);
  }
  return { byStatement, helperNames };
}
function unrollComputedTimeline(script) {
  const parsed = parseGsapScriptAcorn(script);
  const computed = parsed.animations.filter((a) => isComputed(a) && a.provenance?.sourceRange);
  if (computed.length === 0) return script;
  const statements = topLevelStatements(script);
  const grouped = groupByTopLevelStatement(computed, statements);
  if (!grouped) return script;
  const { byStatement, helperNames } = grouped;
  dropStatementsUnsafeToUnroll(byStatement, {
    timelineVar: parsed.timelineVar,
    helpers: collectHelperBodies(statements)
  });
  if (byStatement.size === 0) return script;
  const ms = new MagicString(script);
  for (const [stmt, anims] of byStatement) {
    const literals = anims.map((a) => serializeTweenStatement(parsed.timelineVar, a)).join("\n");
    ms.overwrite(stmt.start, stmt.end, literals);
  }
  for (const decl of unreferencedHelperDecls(
    statements,
    script,
    new Set(byStatement.keys()),
    helperNames
  )) {
    ms.remove(decl.start, decl.end);
  }
  return ms.toString();
}
var HTML_BODY_CSS_WIDTH_FIRST_RE = /(html\s*,\s*body\s*\{[^}]*?width:\s*)(\d+)px([^}]*?height:\s*)(\d+)px/i;
var HTML_BODY_CSS_HEIGHT_FIRST_RE = /(html\s*,\s*body\s*\{[^}]*?height:\s*)(\d+)px([^}]*?width:\s*)(\d+)px/i;
var VIEWPORT_META_SIZE_RE = /(<meta[^>]*name=["']viewport["'][^>]*content=["']width=)(\d+)(,\s*height=)(\d+)/i;
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
function decodeUrlPathVariants(path) {
  const variants = [path];
  try {
    const decoded = decodeURIComponent(path);
    if (decoded !== path) variants.unshift(decoded);
  } catch {
  }
  return variants;
}
function parseProgram2(script) {
  try {
    return parse(script, { ecmaVersion: "latest", sourceType: "script" });
  } catch {
    return parse(script, { ecmaVersion: "latest", sourceType: "module" });
  }
}
function literalString(node) {
  if (node?.type === "Literal" && typeof node.value === "string") return node.value;
  if (node?.type === "TemplateLiteral" && node.expressions?.length === 0) {
    return node.quasis?.[0]?.value?.cooked;
  }
  return void 0;
}
function memberName(node) {
  if (node?.type !== "MemberExpression") return void 0;
  if (!node.computed && node.property?.type === "Identifier") return node.property.name;
  return literalString(node.property);
}
function lookupSelector(node, bindings) {
  if (node?.type === "Identifier") return bindings.get(node.name);
  if (node?.type !== "CallExpression" || node.callee?.type !== "MemberExpression") {
    return void 0;
  }
  const method = memberName(node.callee);
  if (method !== "getElementById" && method !== "querySelector") return void 0;
  const value = literalString(node.arguments?.[0]);
  if (!value) return void 0;
  return method === "getElementById" ? `#${value}` : value;
}
function extractMediaSrcMutations(script) {
  try {
    const ast = parseProgram2(script);
    const bindings = /* @__PURE__ */ new Map();
    simple(ast, {
      VariableDeclarator(node) {
        if (node.id?.type !== "Identifier") return;
        const selector = lookupSelector(node.init, bindings);
        if (selector) bindings.set(node.id.name, selector);
      }
    });
    const mutations = [];
    simple(ast, {
      AssignmentExpression(node) {
        if (node.operator !== "=" || memberName(node.left) !== "src") return;
        const selector = lookupSelector(node.left.object, bindings);
        if (!selector) return;
        mutations.push({
          selector,
          operation: "src_assignment",
          raw: script.slice(node.start, node.end)
        });
      },
      CallExpression(node) {
        if (memberName(node.callee) !== "setAttribute") return;
        if (literalString(node.arguments?.[0])?.toLowerCase() !== "src") return;
        const selector = lookupSelector(node.callee.object, bindings);
        if (!selector) return;
        mutations.push({
          selector,
          operation: "set_attribute",
          raw: script.slice(node.start, node.end)
        });
      }
    });
    return mutations;
  } catch {
    return [];
  }
}
var FONT_ALIAS_MAP = {
  // ── Canonical bundled fonts (self-referencing) ────────────────────────
  inter: "inter",
  montserrat: "montserrat",
  outfit: "outfit",
  nunito: "nunito",
  oswald: "oswald",
  "league gothic": "league-gothic",
  "archivo black": "archivo-black",
  "space mono": "space-mono",
  "ibm plex mono": "ibm-plex-mono",
  "jetbrains mono": "jetbrains-mono",
  "eb garamond": "eb-garamond",
  "playfair display": "playfair-display",
  "source code pro": "source-code-pro",
  "noto sans jp": "noto-sans-jp",
  roboto: "roboto",
  "open sans": "open-sans",
  lato: "lato",
  poppins: "poppins",
  // ── Common aliases → nearest canonical ────────────────────────────────
  "helvetica neue": "inter",
  helvetica: "inter",
  arial: "inter",
  "helvetica bold": "inter",
  futura: "montserrat",
  "din alternate": "montserrat",
  "arial black": "montserrat",
  "bebas neue": "league-gothic",
  "courier new": "jetbrains-mono",
  courier: "jetbrains-mono",
  garamond: "eb-garamond",
  "noto sans japanese": "noto-sans-jp",
  "segoe ui": "roboto",
  // ── macOS sans-serif system fonts → inter ─────────────────────────────
  "sf pro": "inter",
  "sf pro display": "inter",
  "sf pro text": "inter",
  "sf pro rounded": "inter",
  avenir: "inter",
  "avenir next": "inter",
  "lucida grande": "inter",
  geneva: "inter",
  optima: "inter",
  // ── Windows sans-serif system fonts → inter ───────────────────────────
  verdana: "inter",
  tahoma: "inter",
  "trebuchet ms": "inter",
  calibri: "inter",
  candara: "inter",
  corbel: "inter",
  "lucida sans": "inter",
  "lucida sans unicode": "inter",
  // ── Linux sans-serif system fonts → inter ─────────────────────────────
  "noto sans": "inter",
  "dejavu sans": "inter",
  "liberation sans": "inter",
  // ── Monospace system fonts → jetbrains-mono ───────────────────────────
  "sf mono": "jetbrains-mono",
  menlo: "jetbrains-mono",
  monaco: "jetbrains-mono",
  consolas: "jetbrains-mono",
  "lucida console": "jetbrains-mono",
  "lucida sans typewriter": "jetbrains-mono",
  "andale mono": "jetbrains-mono",
  "dejavu sans mono": "jetbrains-mono",
  "liberation mono": "jetbrains-mono",
  // ── Serif system fonts → eb-garamond ──────────────────────────────────
  georgia: "eb-garamond",
  palatino: "eb-garamond",
  "palatino linotype": "eb-garamond",
  "book antiqua": "eb-garamond",
  cambria: "eb-garamond",
  times: "eb-garamond",
  "times new roman": "eb-garamond",
  "dejavu serif": "eb-garamond",
  "liberation serif": "eb-garamond"
};
var FONT_ALIAS_KEYS = new Set(Object.keys(FONT_ALIAS_MAP));
var CANONICAL_FONT_DISPLAY_NAMES = {
  inter: "Inter",
  montserrat: "Montserrat",
  outfit: "Outfit",
  nunito: "Nunito",
  oswald: "Oswald",
  "league-gothic": "League Gothic",
  "archivo-black": "Archivo Black",
  "space-mono": "Space Mono",
  "ibm-plex-mono": "IBM Plex Mono",
  "jetbrains-mono": "JetBrains Mono",
  "eb-garamond": "EB Garamond",
  "playfair-display": "Playfair Display",
  "source-code-pro": "Source Code Pro",
  "noto-sans-jp": "Noto Sans JP",
  roboto: "Roboto",
  "open-sans": "Open Sans",
  lato: "Lato",
  poppins: "Poppins"
};
function resolveAliasDisplayName(alias) {
  const slug = FONT_ALIAS_MAP[alias.toLowerCase()];
  if (!slug) return void 0;
  return CANONICAL_FONT_DISPLAY_NAMES[slug];
}

export {
  MagicString,
  CANVAS_DIMENSIONS,
  VALID_CANVAS_RESOLUTIONS,
  normalizeResolutionFlag,
  isAspectAgnosticResolutionAlias,
  resolveResolutionFlagPair,
  COMPOSITION_VARIABLE_TYPES,
  isTextElement,
  isMediaElement,
  isCompositionElement,
  TIMELINE_COLORS,
  DEFAULT_DURATIONS,
  getDefaultStageZoom,
  serializeGsapAnimations,
  getAnimationsForElementId,
  validateCompositionGsap,
  keyframesToGsapAnimations,
  gsapAnimationsToKeyframes,
  parseHtml,
  updateElementInHtml,
  addElementToHtml,
  removeElementWithGsapCascade,
  removeElementFromHtml,
  extractCompositionMetadata,
  validateCompositionHtml,
  suggestMatchingPreset,
  checkOutputResolutionCompatibility,
  unrollComputedTimeline,
  HTML_BODY_CSS_WIDTH_FIRST_RE,
  HTML_BODY_CSS_HEIGHT_FIRST_RE,
  VIEWPORT_META_SIZE_RE,
  topLevelElements,
  trackKindOf,
  decodeUrlPathVariants,
  extractMediaSrcMutations,
  FONT_ALIAS_MAP,
  FONT_ALIAS_KEYS,
  resolveAliasDisplayName
};
