import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  __commonJS,
  __toESM
} from "./chunk-M2WBOQ2Q.js";

// ../../node_modules/.bun/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "../../node_modules/.bun/sisteransi@1.0.5/node_modules/sisteransi/src/index.js"(exports, module) {
    "use strict";
    var ESC2 = "\x1B";
    var CSI2 = `${ESC2}[`;
    var beep = "\x07";
    var cursor = {
      to(x2, y) {
        if (!y) return `${CSI2}${x2 + 1}G`;
        return `${CSI2}${y + 1};${x2 + 1}H`;
      },
      move(x2, y) {
        let ret = "";
        if (x2 < 0) ret += `${CSI2}${-x2}D`;
        else if (x2 > 0) ret += `${CSI2}${x2}C`;
        if (y < 0) ret += `${CSI2}${-y}A`;
        else if (y > 0) ret += `${CSI2}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI2}${count}A`,
      down: (count = 1) => `${CSI2}${count}B`,
      forward: (count = 1) => `${CSI2}${count}C`,
      backward: (count = 1) => `${CSI2}${count}D`,
      nextLine: (count = 1) => `${CSI2}E`.repeat(count),
      prevLine: (count = 1) => `${CSI2}F`.repeat(count),
      left: `${CSI2}G`,
      hide: `${CSI2}?25l`,
      show: `${CSI2}?25h`,
      save: `${ESC2}7`,
      restore: `${ESC2}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI2}S`.repeat(count),
      down: (count = 1) => `${CSI2}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI2}2J`,
      up: (count = 1) => `${CSI2}1J`.repeat(count),
      down: (count = 1) => `${CSI2}J`.repeat(count),
      line: `${CSI2}2K`,
      lineEnd: `${CSI2}K`,
      lineStart: `${CSI2}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module.exports = { cursor, scroll, erase, beep };
  }
});

// ../../node_modules/.bun/@clack+core@1.3.0/node_modules/@clack/core/dist/index.mjs
import { styleText as v } from "util";
import { stdout as S, stdin as D } from "process";
import * as b from "readline";
import E from "readline";

// ../../node_modules/.bun/fast-string-truncated-width@3.0.3/node_modules/fast-string-truncated-width/dist/utils.js
var getCodePointsLength = /* @__PURE__ */ (() => {
  const SURROGATE_PAIR_RE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  return (input) => {
    let surrogatePairsNr = 0;
    SURROGATE_PAIR_RE.lastIndex = 0;
    while (SURROGATE_PAIR_RE.test(input)) {
      surrogatePairsNr += 1;
    }
    return input.length - surrogatePairsNr;
  };
})();
var isFullWidth = (x2) => {
  return x2 === 12288 || x2 >= 65281 && x2 <= 65376 || x2 >= 65504 && x2 <= 65510;
};
var isWideNotCJKTNotEmoji = (x2) => {
  return x2 === 8987 || x2 === 9001 || x2 >= 12272 && x2 <= 12287 || x2 >= 12289 && x2 <= 12350 || x2 >= 12441 && x2 <= 12543 || x2 >= 12549 && x2 <= 12591 || x2 >= 12593 && x2 <= 12686 || x2 >= 12688 && x2 <= 12771 || x2 >= 12783 && x2 <= 12830 || x2 >= 12832 && x2 <= 12871 || x2 >= 12880 && x2 <= 19903 || x2 >= 65040 && x2 <= 65049 || x2 >= 65072 && x2 <= 65106 || x2 >= 65108 && x2 <= 65126 || x2 >= 65128 && x2 <= 65131 || x2 >= 127488 && x2 <= 127490 || x2 >= 127504 && x2 <= 127547 || x2 >= 127552 && x2 <= 127560 || x2 >= 131072 && x2 <= 196605 || x2 >= 196608 && x2 <= 262141;
};

// ../../node_modules/.bun/fast-string-truncated-width@3.0.3/node_modules/fast-string-truncated-width/dist/index.js
var ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y;
var CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var CJKT_WIDE_RE = /(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu;
var TAB_RE = /\t{1,1000}/y;
var EMOJI_RE = new RegExp("[\\u{1F1E6}-\\u{1F1FF}]{2}|\\u{1F3F4}[\\u{E0061}-\\u{E007A}]{2}[\\u{E0030}-\\u{E0039}\\u{E0061}-\\u{E007A}]{1,3}\\u{E007F}|(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation})(?:\\u200D(?:\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|\\p{Emoji_Presentation}|\\p{Emoji}\\uFE0F\\u20E3?))*", "yu");
var LATIN_RE = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var MODIFIER_RE = new RegExp("\\p{M}+", "gu");
var NO_TRUNCATION = { limit: Infinity, ellipsis: "" };
var getStringTruncatedWidth = (input, truncationOptions = {}, widthOptions = {}) => {
  const LIMIT = truncationOptions.limit ?? Infinity;
  const ELLIPSIS = truncationOptions.ellipsis ?? "";
  const ELLIPSIS_WIDTH = truncationOptions?.ellipsisWidth ?? (ELLIPSIS ? getStringTruncatedWidth(ELLIPSIS, NO_TRUNCATION, widthOptions).width : 0);
  const ANSI_WIDTH = 0;
  const CONTROL_WIDTH = widthOptions.controlWidth ?? 0;
  const TAB_WIDTH = widthOptions.tabWidth ?? 8;
  const EMOJI_WIDTH = widthOptions.emojiWidth ?? 2;
  const FULL_WIDTH_WIDTH = 2;
  const REGULAR_WIDTH = widthOptions.regularWidth ?? 1;
  const WIDE_WIDTH = widthOptions.wideWidth ?? FULL_WIDTH_WIDTH;
  const PARSE_BLOCKS = [
    [LATIN_RE, REGULAR_WIDTH],
    [ANSI_RE, ANSI_WIDTH],
    [CONTROL_RE, CONTROL_WIDTH],
    [TAB_RE, TAB_WIDTH],
    [EMOJI_RE, EMOJI_WIDTH],
    [CJKT_WIDE_RE, WIDE_WIDTH]
  ];
  let indexPrev = 0;
  let index = 0;
  let length = input.length;
  let lengthExtra = 0;
  let truncationEnabled = false;
  let truncationIndex = length;
  let truncationLimit = Math.max(0, LIMIT - ELLIPSIS_WIDTH);
  let unmatchedStart = 0;
  let unmatchedEnd = 0;
  let width = 0;
  let widthExtra = 0;
  outer: while (true) {
    if (unmatchedEnd > unmatchedStart || index >= length && index > indexPrev) {
      const unmatched = input.slice(unmatchedStart, unmatchedEnd) || input.slice(indexPrev, index);
      lengthExtra = 0;
      for (const char of unmatched.replaceAll(MODIFIER_RE, "")) {
        const codePoint = char.codePointAt(0) || 0;
        if (isFullWidth(codePoint)) {
          widthExtra = FULL_WIDTH_WIDTH;
        } else if (isWideNotCJKTNotEmoji(codePoint)) {
          widthExtra = WIDE_WIDTH;
        } else {
          widthExtra = REGULAR_WIDTH;
        }
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, Math.max(unmatchedStart, indexPrev) + lengthExtra);
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break outer;
        }
        lengthExtra += char.length;
        width += widthExtra;
      }
      unmatchedStart = unmatchedEnd = 0;
    }
    if (index >= length) {
      break outer;
    }
    for (let i = 0, l = PARSE_BLOCKS.length; i < l; i++) {
      const [BLOCK_RE, BLOCK_WIDTH] = PARSE_BLOCKS[i];
      BLOCK_RE.lastIndex = index;
      if (BLOCK_RE.test(input)) {
        lengthExtra = BLOCK_RE === CJKT_WIDE_RE ? getCodePointsLength(input.slice(index, BLOCK_RE.lastIndex)) : BLOCK_RE === EMOJI_RE ? 1 : BLOCK_RE.lastIndex - index;
        widthExtra = lengthExtra * BLOCK_WIDTH;
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / BLOCK_WIDTH));
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break outer;
        }
        width += widthExtra;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = BLOCK_RE.lastIndex;
        continue outer;
      }
    }
    index += 1;
  }
  return {
    width: truncationEnabled ? truncationLimit : width,
    index: truncationEnabled ? truncationIndex : length,
    truncated: truncationEnabled,
    ellipsed: truncationEnabled && LIMIT >= ELLIPSIS_WIDTH
  };
};
var dist_default = getStringTruncatedWidth;

// ../../node_modules/.bun/fast-string-width@3.0.2/node_modules/fast-string-width/dist/index.js
var NO_TRUNCATION2 = {
  limit: Infinity,
  ellipsis: "",
  ellipsisWidth: 0
};
var fastStringWidth = (input, options = {}) => {
  return dist_default(input, NO_TRUNCATION2, options).width;
};
var dist_default2 = fastStringWidth;

// ../../node_modules/.bun/fast-wrap-ansi@0.2.0/node_modules/fast-wrap-ansi/lib/main.js
var ESC = "\x1B";
var CSI = "\x9B";
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var GROUP_REGEX = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`, "y");
var getClosingCode = (openingCode) => {
  if (openingCode >= 30 && openingCode <= 37)
    return 39;
  if (openingCode >= 90 && openingCode <= 97)
    return 39;
  if (openingCode >= 40 && openingCode <= 47)
    return 49;
  if (openingCode >= 100 && openingCode <= 107)
    return 49;
  if (openingCode === 1 || openingCode === 2)
    return 22;
  if (openingCode === 3)
    return 23;
  if (openingCode === 4)
    return 24;
  if (openingCode === 7)
    return 27;
  if (openingCode === 8)
    return 28;
  if (openingCode === 9)
    return 29;
  if (openingCode === 0)
    return 0;
  return void 0;
};
var wrapAnsiCode = (code) => `${ESC}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESC}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wrapWord = (rows, word, columns) => {
  const characters = word[Symbol.iterator]();
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let lastRow = rows.at(-1);
  let visible = lastRow === void 0 ? 0 : dist_default2(lastRow);
  let currentCharacter = characters.next();
  let nextCharacter = characters.next();
  let rawCharacterIndex = 0;
  while (!currentCharacter.done) {
    const character = currentCharacter.value;
    const characterLength = dist_default2(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (character === ESC || character === CSI) {
      isInsideEscape = true;
      isInsideLinkEscape = word.startsWith(ANSI_ESCAPE_LINK, rawCharacterIndex + 1);
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
    } else {
      visible += characterLength;
      if (visible === columns && !nextCharacter.done) {
        rows.push("");
        visible = 0;
      }
    }
    currentCharacter = nextCharacter;
    nextCharacter = characters.next();
    rawCharacterIndex += character.length;
  }
  lastRow = rows.at(-1);
  if (!visible && lastRow !== void 0 && lastRow.length && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last) {
    if (dist_default2(words[last - 1])) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
};
var exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const words = string.split(" ");
  let rows = [""];
  let rowLength = 0;
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    if (options.trim !== false) {
      const row = rows.at(-1) ?? "";
      const trimmed = row.trimStart();
      if (row.length !== trimmed.length) {
        rows[rows.length - 1] = trimmed;
        rowLength = dist_default2(trimmed);
      }
    }
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    const wordLength = dist_default2(word);
    if (options.hard && wordLength > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((wordLength - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      rowLength = dist_default2(rows.at(-1) ?? "");
      continue;
    }
    if (rowLength + wordLength > columns && rowLength && wordLength) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        rowLength = dist_default2(rows.at(-1) ?? "");
        continue;
      }
      rows.push("");
      rowLength = 0;
    }
    if (rowLength + wordLength > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      rowLength = dist_default2(rows.at(-1) ?? "");
      continue;
    }
    rows[rows.length - 1] += word;
    rowLength += wordLength;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join("\n");
  let inSurrogate = false;
  for (let i = 0; i < preString.length; i++) {
    const character = preString[i];
    returnValue += character;
    if (!inSurrogate) {
      inSurrogate = character >= "\uD800" && character <= "\uDBFF";
      if (inSurrogate) {
        continue;
      }
    } else {
      inSurrogate = false;
    }
    if (character === ESC || character === CSI) {
      GROUP_REGEX.lastIndex = i + 1;
      const groupsResult = GROUP_REGEX.exec(preString);
      const groups = groupsResult?.groups;
      if (groups?.code !== void 0) {
        const code = Number.parseFloat(groups.code);
        escapeCode = code === END_CODE ? void 0 : code;
      } else if (groups?.uri !== void 0) {
        escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
      }
    }
    if (preString[i + 1] === "\n") {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      const closingCode = escapeCode ? getClosingCode(escapeCode) : void 0;
      if (escapeCode && closingCode) {
        returnValue += wrapAnsiCode(closingCode);
      }
    } else if (character === "\n") {
      if (escapeCode && getClosingCode(escapeCode)) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
  }
  return returnValue;
};
var CRLF_OR_LF = /\r?\n/;
function wrapAnsi(string, columns, options) {
  return String(string).normalize().split(CRLF_OR_LF).map((line) => exec(line, columns, options)).join("\n");
}

// ../../node_modules/.bun/@clack+core@1.3.0/node_modules/@clack/core/dist/index.mjs
var import_sisteransi = __toESM(require_src(), 1);
import { ReadStream as O } from "tty";
function d(r, t, s) {
  if (!s.some((o) => !o.disabled)) return r;
  const e2 = r + t, i = Math.max(s.length - 1, 0), n = e2 < 0 ? i : e2 > i ? 0 : e2;
  return s[n].disabled ? d(n, t < 0 ? -1 : 1, s) : n;
}
function I(r, t, s, e2) {
  const i = e2.split(`
`);
  let n = 0, o = r;
  for (const a of i) {
    if (o <= a.length) break;
    o -= a.length + 1, n++;
  }
  for (n = Math.max(0, Math.min(i.length - 1, n + s)), o = Math.min(o, i[n].length) + t; o < 0 && n > 0; ) n--, o += i[n].length + 1;
  for (; o > i[n].length && n < i.length - 1; ) o -= i[n].length + 1, n++;
  o = Math.max(0, Math.min(i[n].length, o));
  let u = 0;
  for (let a = 0; a < n; a++) u += i[a].length + 1;
  return u + o;
}
var G = ["up", "down", "left", "right", "space", "enter", "cancel"];
var K = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var h = { actions: new Set(G), aliases: /* @__PURE__ */ new Map([["k", "up"], ["j", "down"], ["h", "left"], ["l", "right"], ["", "cancel"], ["escape", "cancel"]]), messages: { cancel: "Canceled", error: "Something went wrong" }, withGuide: true, date: { monthNames: [...K], messages: { required: "Please enter a valid date", invalidMonth: "There are only 12 months in a year", invalidDay: (r, t) => `There are only ${r} days in ${t}`, afterMin: (r) => `Date must be on or after ${r.toISOString().slice(0, 10)}`, beforeMax: (r) => `Date must be on or before ${r.toISOString().slice(0, 10)}` } } };
function j(r) {
  if (r.aliases !== void 0) {
    const t = r.aliases;
    for (const s in t) {
      if (!Object.hasOwn(t, s)) continue;
      const e2 = t[s];
      h.actions.has(e2) && (h.aliases.has(s) || h.aliases.set(s, e2));
    }
  }
  if (r.messages !== void 0) {
    const t = r.messages;
    t.cancel !== void 0 && (h.messages.cancel = t.cancel), t.error !== void 0 && (h.messages.error = t.error);
  }
  if (r.withGuide !== void 0 && (h.withGuide = r.withGuide !== false), r.date !== void 0) {
    const t = r.date;
    t.monthNames !== void 0 && (h.date.monthNames = [...t.monthNames]), t.messages !== void 0 && (t.messages.required !== void 0 && (h.date.messages.required = t.messages.required), t.messages.invalidMonth !== void 0 && (h.date.messages.invalidMonth = t.messages.invalidMonth), t.messages.invalidDay !== void 0 && (h.date.messages.invalidDay = t.messages.invalidDay), t.messages.afterMin !== void 0 && (h.date.messages.afterMin = t.messages.afterMin), t.messages.beforeMax !== void 0 && (h.date.messages.beforeMax = t.messages.beforeMax));
  }
}
function C(r, t) {
  if (typeof r == "string") return h.aliases.get(r) === t;
  for (const s of r) if (s !== void 0 && C(s, t)) return true;
  return false;
}
function z(r, t) {
  if (r === t) return;
  const s = r.split(`
`), e2 = t.split(`
`), i = Math.max(s.length, e2.length), n = [];
  for (let o = 0; o < i; o++) s[o] !== e2[o] && n.push(o);
  return { lines: n, numLinesBefore: s.length, numLinesAfter: e2.length, numLines: i };
}
var Y = globalThis.process.platform.startsWith("win");
var k = /* @__PURE__ */ Symbol("clack:cancel");
function q(r) {
  return r === k;
}
function w(r, t) {
  const s = r;
  s.isTTY && s.setRawMode(t);
}
function R({ input: r = D, output: t = S, overwrite: s = true, hideCursor: e2 = true } = {}) {
  const i = b.createInterface({ input: r, output: t, prompt: "", tabSize: 1 });
  b.emitKeypressEvents(r, i), r instanceof O && r.isTTY && r.setRawMode(true);
  const n = (o, { name: u, sequence: a }) => {
    const l = String(o);
    if (C([l, u, a], "cancel")) {
      e2 && t.write(import_sisteransi.cursor.show), process.exit(0);
      return;
    }
    if (!s) return;
    const f = u === "return" ? 0 : -1, y = u === "return" ? -1 : 0;
    b.moveCursor(t, f, y, () => {
      b.clearLine(t, 1, () => {
        r.once("keypress", n);
      });
    });
  };
  return e2 && t.write(import_sisteransi.cursor.hide), r.once("keypress", n), () => {
    r.off("keypress", n), e2 && t.write(import_sisteransi.cursor.show), r instanceof O && r.isTTY && !Y && r.setRawMode(false), i.terminal = false, i.close();
  };
}
var A = (r) => "columns" in r && typeof r.columns == "number" ? r.columns : 80;
var L = (r) => "rows" in r && typeof r.rows == "number" ? r.rows : 20;
function W(r, t, s, e2 = s, i) {
  const n = A(r ?? S);
  return wrapAnsi(t, n - s.length, { hard: true, trim: false }).split(`
`).map((o, u) => {
    const a = i ? i(o, u) : o;
    return `${u === 0 ? e2 : s}${a}`;
  }).join(`
`);
}
var p = class {
  input;
  output;
  _abortSignal;
  rl;
  opts;
  _render;
  _track = false;
  _prevFrame = "";
  _subscribers = /* @__PURE__ */ new Map();
  _cursor = 0;
  state = "initial";
  error = "";
  value;
  userInput = "";
  constructor(t, s = true) {
    const { input: e2 = D, output: i = S, render: n, signal: o, ...u } = t;
    this.opts = u, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = n.bind(this), this._track = s, this._abortSignal = o, this.input = e2, this.output = i;
  }
  unsubscribe() {
    this._subscribers.clear();
  }
  setSubscriber(t, s) {
    const e2 = this._subscribers.get(t) ?? [];
    e2.push(s), this._subscribers.set(t, e2);
  }
  on(t, s) {
    this.setSubscriber(t, { cb: s });
  }
  once(t, s) {
    this.setSubscriber(t, { cb: s, once: true });
  }
  emit(t, ...s) {
    const e2 = this._subscribers.get(t) ?? [], i = [];
    for (const n of e2) n.cb(...s), n.once && i.push(() => e2.splice(e2.indexOf(n), 1));
    for (const n of i) n();
  }
  prompt() {
    return new Promise((t) => {
      if (this._abortSignal) {
        if (this._abortSignal.aborted) return this.state = "cancel", this.close(), t(k);
        this._abortSignal.addEventListener("abort", () => {
          this.state = "cancel", this.close();
        }, { once: true });
      }
      this.rl = E.createInterface({ input: this.input, tabSize: 2, prompt: "", escapeCodeTimeout: 50, terminal: true }), this.rl.prompt(), this.opts.initialUserInput !== void 0 && this._setUserInput(this.opts.initialUserInput, true), this.input.on("keypress", this.onKeypress), w(this.input, true), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), w(this.input, false), t(this.value);
      }), this.once("cancel", () => {
        this.output.write(import_sisteransi.cursor.show), this.output.off("resize", this.render), w(this.input, false), t(k);
      });
    });
  }
  _isActionKey(t, s) {
    return t === "	";
  }
  _shouldSubmit(t, s) {
    return true;
  }
  _setValue(t) {
    this.value = t, this.emit("value", this.value);
  }
  _setUserInput(t, s) {
    this.userInput = t ?? "", this.emit("userInput", this.userInput), s && this._track && this.rl && (this.rl.write(this.userInput), this._cursor = this.rl.cursor);
  }
  _clearUserInput() {
    this.rl?.write(null, { ctrl: true, name: "u" }), this._setUserInput("");
  }
  onKeypress(t, s) {
    if (this._track && s.name !== "return" && (s.name && this._isActionKey(t, s) && this.rl?.write(null, { ctrl: true, name: "h" }), this._cursor = this.rl?.cursor ?? 0, this._setUserInput(this.rl?.line)), this.state === "error" && (this.state = "active"), s?.name && (!this._track && h.aliases.has(s.name) && this.emit("cursor", h.aliases.get(s.name)), h.actions.has(s.name) && this.emit("cursor", s.name)), t && (t.toLowerCase() === "y" || t.toLowerCase() === "n") && this.emit("confirm", t.toLowerCase() === "y"), this.emit("key", t?.toLowerCase(), s), s?.name === "return" && this._shouldSubmit(t, s)) {
      if (this.opts.validate) {
        const e2 = this.opts.validate(this.value);
        e2 && (this.error = e2 instanceof Error ? e2.message : e2, this.state = "error", this.rl?.write(this.userInput));
      }
      this.state !== "error" && (this.state = "submit");
    }
    C([t, s?.name, s?.sequence], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
  }
  close() {
    this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), w(this.input, false), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
  }
  restoreCursor() {
    const t = wrapAnsi(this._prevFrame, process.stdout.columns, { hard: true, trim: false }).split(`
`).length - 1;
    this.output.write(import_sisteransi.cursor.move(-999, t * -1));
  }
  render() {
    const t = wrapAnsi(this._render(this) ?? "", process.stdout.columns, { hard: true, trim: false });
    if (t !== this._prevFrame) {
      if (this.state === "initial") this.output.write(import_sisteransi.cursor.hide);
      else {
        const s = z(this._prevFrame, t), e2 = L(this.output);
        if (this.restoreCursor(), s) {
          const i = Math.max(0, s.numLinesAfter - e2), n = Math.max(0, s.numLinesBefore - e2);
          let o = s.lines.find((u) => u >= i);
          if (o === void 0) {
            this._prevFrame = t;
            return;
          }
          if (s.lines.length === 1) {
            this.output.write(import_sisteransi.cursor.move(0, o - n)), this.output.write(import_sisteransi.erase.lines(1));
            const u = t.split(`
`);
            this.output.write(u[o]), this._prevFrame = t, this.output.write(import_sisteransi.cursor.move(0, u.length - o - 1));
            return;
          } else if (s.lines.length > 1) {
            if (i < n) o = i;
            else {
              const a = o - n;
              a > 0 && this.output.write(import_sisteransi.cursor.move(0, a));
            }
            this.output.write(import_sisteransi.erase.down());
            const u = t.split(`
`).slice(o);
            this.output.write(u.join(`
`)), this._prevFrame = t;
            return;
          }
        }
        this.output.write(import_sisteransi.erase.down());
      }
      this.output.write(t), this.state === "initial" && (this.state = "active"), this._prevFrame = t;
    }
  }
};
function B(r, t) {
  if (r === void 0 || t.length === 0) return 0;
  const s = t.findIndex((e2) => e2.value === r);
  return s !== -1 ? s : 0;
}
function J(r, t) {
  return (t.label ?? String(t.value)).toLowerCase().includes(r.toLowerCase());
}
function H(r, t) {
  if (t) return r ? t : t[0];
}
var Q = class extends p {
  filteredOptions;
  multiple;
  isNavigating = false;
  selectedValues = [];
  focusedValue;
  #s = 0;
  #r = "";
  #t;
  #n;
  #u;
  get cursor() {
    return this.#s;
  }
  get userInputWithCursor() {
    if (!this.userInput) return v(["inverse", "hidden"], "_");
    if (this._cursor >= this.userInput.length) return `${this.userInput}\u2588`;
    const t = this.userInput.slice(0, this._cursor), [s, ...e2] = this.userInput.slice(this._cursor);
    return `${t}${v("inverse", s)}${e2.join("")}`;
  }
  get options() {
    return typeof this.#n == "function" ? this.#n() : this.#n;
  }
  constructor(t) {
    super(t), this.#n = t.options, this.#u = t.placeholder;
    const s = this.options;
    this.filteredOptions = [...s], this.multiple = t.multiple === true, this.#t = typeof t.options == "function" ? t.filter : t.filter ?? J;
    let e2;
    if (t.initialValue && Array.isArray(t.initialValue) ? this.multiple ? e2 = t.initialValue : e2 = t.initialValue.slice(0, 1) : !this.multiple && this.options.length > 0 && (e2 = [this.options[0].value]), e2) for (const i of e2) {
      const n = s.findIndex((o) => o.value === i);
      n !== -1 && (this.toggleSelected(i), this.#s = n);
    }
    this.focusedValue = this.options[this.#s]?.value, this.on("key", (i, n) => this.#e(i, n)), this.on("userInput", (i) => this.#i(i));
  }
  _isActionKey(t, s) {
    return t === "	" || this.multiple && this.isNavigating && s.name === "space" && t !== void 0 && t !== "";
  }
  #e(t, s) {
    const e2 = s.name === "up", i = s.name === "down", n = s.name === "return", o = this.userInput === "" || this.userInput === "	", u = this.#u, a = this.options, l = u !== void 0 && u !== "" && a.some((f) => !f.disabled && (this.#t ? this.#t(u, f) : true));
    if (s.name === "tab" && o && l) {
      this.userInput === "	" && this._clearUserInput(), this._setUserInput(u, true), this.isNavigating = false;
      return;
    }
    e2 || i ? (this.#s = d(this.#s, e2 ? -1 : 1, this.filteredOptions), this.focusedValue = this.filteredOptions[this.#s]?.value, this.multiple || (this.selectedValues = [this.focusedValue]), this.isNavigating = true) : n ? this.value = H(this.multiple, this.selectedValues) : this.multiple ? this.focusedValue !== void 0 && (s.name === "tab" || this.isNavigating && s.name === "space") ? this.toggleSelected(this.focusedValue) : this.isNavigating = false : (this.focusedValue && (this.selectedValues = [this.focusedValue]), this.isNavigating = false);
  }
  deselectAll() {
    this.selectedValues = [];
  }
  toggleSelected(t) {
    this.filteredOptions.length !== 0 && (this.multiple ? this.selectedValues.includes(t) ? this.selectedValues = this.selectedValues.filter((s) => s !== t) : this.selectedValues = [...this.selectedValues, t] : this.selectedValues = [t]);
  }
  #i(t) {
    if (t !== this.#r) {
      this.#r = t;
      const s = this.options;
      t && this.#t ? this.filteredOptions = s.filter((n) => this.#t?.(t, n)) : this.filteredOptions = [...s];
      const e2 = B(this.focusedValue, this.filteredOptions);
      this.#s = d(e2, 0, this.filteredOptions);
      const i = this.filteredOptions[this.#s];
      i && !i.disabled ? this.focusedValue = i.value : this.focusedValue = void 0, this.multiple || (this.focusedValue !== void 0 ? this.toggleSelected(this.focusedValue) : this.deselectAll());
    }
  }
};
var X = class extends p {
  get cursor() {
    return this.value ? 0 : 1;
  }
  get _value() {
    return this.cursor === 0;
  }
  constructor(t) {
    super(t, false), this.value = !!t.initialValue, this.on("userInput", () => {
      this.value = this._value;
    }), this.on("confirm", (s) => {
      this.output.write(import_sisteransi.cursor.move(0, -1)), this.value = s, this.state = "submit", this.close();
    }), this.on("cursor", () => {
      this.value = !this.value;
    });
  }
};
var Z = { Y: { type: "year", len: 4 }, M: { type: "month", len: 2 }, D: { type: "day", len: 2 } };
function P(r) {
  return [...r].map((t) => Z[t]);
}
function tt(r) {
  const t = new Intl.DateTimeFormat(r, { year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(2e3, 0, 15)), s = [];
  let e2 = "/";
  for (const i of t) i.type === "literal" ? e2 = i.value.trim() || i.value : (i.type === "year" || i.type === "month" || i.type === "day") && s.push({ type: i.type, len: i.type === "year" ? 4 : 2 });
  return { segments: s, separator: e2 };
}
function U(r) {
  return Number.parseInt((r || "0").replace(/_/g, "0"), 10) || 0;
}
function x(r) {
  return { year: U(r.year), month: U(r.month), day: U(r.day) };
}
function $(r, t) {
  return new Date(r || 2001, t || 1, 0).getDate();
}
function F(r) {
  const { year: t, month: s, day: e2 } = x(r);
  if (!t || t < 0 || t > 9999 || !s || s < 1 || s > 12 || !e2 || e2 < 1) return;
  const i = new Date(Date.UTC(t, s - 1, e2));
  if (!(i.getUTCFullYear() !== t || i.getUTCMonth() !== s - 1 || i.getUTCDate() !== e2)) return { year: t, month: s, day: e2 };
}
function N(r) {
  const t = F(r);
  return t ? new Date(Date.UTC(t.year, t.month - 1, t.day)) : void 0;
}
function st(r, t, s, e2) {
  const i = s ? { year: s.getUTCFullYear(), month: s.getUTCMonth() + 1, day: s.getUTCDate() } : null, n = e2 ? { year: e2.getUTCFullYear(), month: e2.getUTCMonth() + 1, day: e2.getUTCDate() } : null;
  return r === "year" ? { min: i?.year ?? 1, max: n?.year ?? 9999 } : r === "month" ? { min: i && t.year === i.year ? i.month : 1, max: n && t.year === n.year ? n.month : 12 } : { min: i && t.year === i.year && t.month === i.month ? i.day : 1, max: n && t.year === n.year && t.month === n.month ? n.day : $(t.year, t.month) };
}
var et = class extends p {
  #s;
  #r;
  #t;
  #n;
  #u;
  #e = { segmentIndex: 0, positionInSegment: 0 };
  #i = true;
  #o = null;
  inlineError = "";
  get segmentCursor() {
    return { ...this.#e };
  }
  get segmentValues() {
    return { ...this.#t };
  }
  get segments() {
    return this.#s;
  }
  get separator() {
    return this.#r;
  }
  get formattedValue() {
    return this.#c(this.#t);
  }
  #c(t) {
    return this.#s.map((s) => t[s.type]).join(this.#r);
  }
  #a() {
    this._setUserInput(this.#c(this.#t)), this._setValue(N(this.#t) ?? void 0);
  }
  constructor(t) {
    const s = t.format ? { segments: P(t.format), separator: t.separator ?? "/" } : tt(t.locale), e2 = t.separator ?? s.separator, i = t.format ? P(t.format) : s.segments, n = t.initialValue ?? t.defaultValue, o = n ? { year: String(n.getUTCFullYear()).padStart(4, "0"), month: String(n.getUTCMonth() + 1).padStart(2, "0"), day: String(n.getUTCDate()).padStart(2, "0") } : { year: "____", month: "__", day: "__" }, u = i.map((a) => o[a.type]).join(e2);
    super({ ...t, initialUserInput: u }, false), this.#s = i, this.#r = e2, this.#t = o, this.#n = t.minDate, this.#u = t.maxDate, this.#a(), this.on("cursor", (a) => this.#d(a)), this.on("key", (a, l) => this.#f(a, l)), this.on("finalize", () => this.#g(t));
  }
  #h() {
    const t = Math.max(0, Math.min(this.#e.segmentIndex, this.#s.length - 1)), s = this.#s[t];
    if (s) return this.#e.positionInSegment = Math.max(0, Math.min(this.#e.positionInSegment, s.len - 1)), { segment: s, index: t };
  }
  #l(t) {
    this.inlineError = "", this.#o = null;
    const s = this.#h();
    s && (this.#e.segmentIndex = Math.max(0, Math.min(this.#s.length - 1, s.index + t)), this.#e.positionInSegment = 0, this.#i = true);
  }
  #p(t) {
    const s = this.#h();
    if (!s) return;
    const { segment: e2 } = s, i = this.#t[e2.type], n = !i || i.replace(/_/g, "") === "", o = Number.parseInt((i || "0").replace(/_/g, "0"), 10) || 0, u = st(e2.type, x(this.#t), this.#n, this.#u);
    let a;
    n ? a = t === 1 ? u.min : u.max : a = Math.max(Math.min(u.max, o + t), u.min), this.#t = { ...this.#t, [e2.type]: a.toString().padStart(e2.len, "0") }, this.#i = true, this.#o = null, this.#a();
  }
  #d(t) {
    if (t) switch (t) {
      case "right":
        return this.#l(1);
      case "left":
        return this.#l(-1);
      case "up":
        return this.#p(1);
      case "down":
        return this.#p(-1);
    }
  }
  #f(t, s) {
    if (s?.name === "backspace" || s?.sequence === "\x7F" || s?.sequence === "\b" || t === "\x7F" || t === "\b") {
      this.inlineError = "";
      const e2 = this.#h();
      if (!e2) return;
      if (!this.#t[e2.segment.type].replace(/_/g, "")) {
        this.#l(-1);
        return;
      }
      this.#t[e2.segment.type] = "_".repeat(e2.segment.len), this.#i = true, this.#e.positionInSegment = 0, this.#a();
      return;
    }
    if (s?.name === "tab") {
      this.inlineError = "";
      const e2 = this.#h();
      if (!e2) return;
      const i = s.shift ? -1 : 1, n = e2.index + i;
      n >= 0 && n < this.#s.length && (this.#e.segmentIndex = n, this.#e.positionInSegment = 0, this.#i = true);
      return;
    }
    if (t && /^[0-9]$/.test(t)) {
      const e2 = this.#h();
      if (!e2) return;
      const { segment: i } = e2, n = !this.#t[i.type].replace(/_/g, "");
      if (this.#i && this.#o !== null && !n) {
        const m = this.#o + t, g = { ...this.#t, [i.type]: m }, _ = this.#m(g, i);
        if (_) {
          this.inlineError = _, this.#o = null, this.#i = false;
          return;
        }
        this.inlineError = "", this.#t[i.type] = m, this.#o = null, this.#i = false, this.#a(), e2.index < this.#s.length - 1 && (this.#e.segmentIndex = e2.index + 1, this.#e.positionInSegment = 0, this.#i = true);
        return;
      }
      this.#i && !n && (this.#t[i.type] = "_".repeat(i.len), this.#e.positionInSegment = 0), this.#i = false, this.#o = null;
      const o = this.#t[i.type], u = o.indexOf("_"), a = u >= 0 ? u : Math.min(this.#e.positionInSegment, i.len - 1);
      if (a < 0 || a >= i.len) return;
      let l = o.slice(0, a) + t + o.slice(a + 1), f = false;
      if (a === 0 && o === "__" && (i.type === "month" || i.type === "day")) {
        const m = Number.parseInt(t, 10);
        l = `0${t}`, f = m <= (i.type === "month" ? 1 : 2);
      }
      if (i.type === "year" && (l = (o.replace(/_/g, "") + t).padStart(i.len, "_")), !l.includes("_")) {
        const m = { ...this.#t, [i.type]: l }, g = this.#m(m, i);
        if (g) {
          this.inlineError = g;
          return;
        }
      }
      this.inlineError = "", this.#t[i.type] = l;
      const y = l.includes("_") ? void 0 : F(this.#t);
      if (y) {
        const { year: m, month: g } = y, _ = $(m, g);
        this.#t = { year: String(Math.max(0, Math.min(9999, m))).padStart(4, "0"), month: String(Math.max(1, Math.min(12, g))).padStart(2, "0"), day: String(Math.max(1, Math.min(_, y.day))).padStart(2, "0") };
      }
      this.#a();
      const T = l.indexOf("_");
      f ? (this.#i = true, this.#o = t) : T >= 0 ? this.#e.positionInSegment = T : u >= 0 && e2.index < this.#s.length - 1 ? (this.#e.segmentIndex = e2.index + 1, this.#e.positionInSegment = 0, this.#i = true) : this.#e.positionInSegment = Math.min(a + 1, i.len - 1);
    }
  }
  #m(t, s) {
    const { month: e2, day: i } = x(t);
    if (s.type === "month" && (e2 < 0 || e2 > 12)) return h.date.messages.invalidMonth;
    if (s.type === "day" && (i < 0 || i > 31)) return h.date.messages.invalidDay(31, "any month");
  }
  #g(t) {
    const { year: s, month: e2, day: i } = x(this.#t);
    if (s && e2 && i) {
      const n = $(s, e2);
      this.#t = { ...this.#t, day: String(Math.min(i, n)).padStart(2, "0") };
    }
    this.value = N(this.#t) ?? t.defaultValue ?? void 0;
  }
};
var it = class extends p {
  options;
  cursor = 0;
  #s;
  getGroupItems(t) {
    return this.options.filter((s) => s.group === t);
  }
  isGroupSelected(t) {
    const s = this.getGroupItems(t), e2 = this.value;
    return e2 === void 0 ? false : s.every((i) => e2.includes(i.value));
  }
  toggleValue() {
    const t = this.options[this.cursor];
    if (this.value === void 0 && (this.value = []), t.group === true) {
      const s = t.value, e2 = this.getGroupItems(s);
      this.isGroupSelected(s) ? this.value = this.value.filter((i) => e2.findIndex((n) => n.value === i) === -1) : this.value = [...this.value, ...e2.map((i) => i.value)], this.value = Array.from(new Set(this.value));
    } else {
      const s = this.value.includes(t.value);
      this.value = s ? this.value.filter((e2) => e2 !== t.value) : [...this.value, t.value];
    }
  }
  constructor(t) {
    super(t, false);
    const { options: s } = t;
    this.#s = t.selectableGroups !== false, this.options = Object.entries(s).flatMap(([e2, i]) => [{ value: e2, group: true, label: e2 }, ...i.map((n) => ({ ...n, group: e2 }))]), this.value = [...t.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: e2 }) => e2 === t.cursorAt), this.#s ? 0 : 1), this.on("cursor", (e2) => {
      switch (e2) {
        case "left":
        case "up": {
          this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
          const i = this.options[this.cursor]?.group === true;
          !this.#s && i && (this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
          break;
        }
        case "down":
        case "right": {
          this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
          const i = this.options[this.cursor]?.group === true;
          !this.#s && i && (this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
          break;
        }
        case "space":
          this.toggleValue();
          break;
      }
    });
  }
};
var rt = class extends p {
  #s = false;
  #r;
  focused = "editor";
  get userInputWithCursor() {
    if (this.state === "submit") return this.userInput;
    const t = this.userInput;
    if (this.cursor >= t.length) return `${t}\u2588`;
    const s = t.slice(0, this.cursor), e2 = t[this.cursor], i = t.slice(this.cursor + 1);
    return e2 === `
` ? `${s}\u2588
${i}` : `${s}${v("inverse", e2)}${i}`;
  }
  get cursor() {
    return this._cursor;
  }
  #t(t) {
    if (this.userInput.length === 0) {
      this._setUserInput(t);
      return;
    }
    this._setUserInput(this.userInput.slice(0, this.cursor) + t + this.userInput.slice(this.cursor));
  }
  #n(t) {
    const s = this.value ?? "";
    switch (t) {
      case "up":
        this._cursor = I(this._cursor, 0, -1, s);
        return;
      case "down":
        this._cursor = I(this._cursor, 0, 1, s);
        return;
      case "left":
        this._cursor = I(this._cursor, -1, 0, s);
        return;
      case "right":
        this._cursor = I(this._cursor, 1, 0, s);
        return;
    }
  }
  _shouldSubmit(t, s) {
    if (this.#r) return this.focused === "submit" ? true : (this.#t(`
`), this._cursor++, false);
    const e2 = this.#s;
    return this.#s = true, e2 ? (this.userInput[this.cursor - 1] === `
` && (this._setUserInput(this.userInput.slice(0, this.cursor - 1) + this.userInput.slice(this.cursor)), this._cursor--), true) : (this.#t(`
`), this._cursor++, false);
  }
  constructor(t) {
    super(t, false), this.#r = t.showSubmit ?? false, this.on("key", (s, e2) => {
      if (e2?.name && h.actions.has(e2.name)) {
        this.#n(e2.name);
        return;
      }
      if (s === "	" && this.#r) {
        this.focused = this.focused === "editor" ? "submit" : "editor";
        return;
      }
      if (e2?.name !== "return") {
        if (this.#s = false, e2?.name === "backspace" && this.cursor > 0) {
          this._setUserInput(this.userInput.slice(0, this.cursor - 1) + this.userInput.slice(this.cursor)), this._cursor--;
          return;
        }
        if (e2?.name === "delete" && this.cursor < this.userInput.length) {
          this._setUserInput(this.userInput.slice(0, this.cursor) + this.userInput.slice(this.cursor + 1));
          return;
        }
        s && (this.#r && this.focused === "submit" && (this.focused = "editor"), this.#t(s ?? ""), this._cursor++);
      }
    }), this.on("userInput", (s) => {
      this._setValue(s);
    }), this.on("finalize", () => {
      this.value || (this.value = t.defaultValue), this.value === void 0 && (this.value = "");
    });
  }
};
var nt = class extends p {
  options;
  cursor = 0;
  get _value() {
    return this.options[this.cursor].value;
  }
  get _enabledOptions() {
    return this.options.filter((t) => t.disabled !== true);
  }
  toggleAll() {
    const t = this._enabledOptions, s = this.value !== void 0 && this.value.length === t.length;
    this.value = s ? [] : t.map((e2) => e2.value);
  }
  toggleInvert() {
    const t = this.value;
    if (!t) return;
    const s = this._enabledOptions.filter((e2) => !t.includes(e2.value));
    this.value = s.map((e2) => e2.value);
  }
  toggleValue() {
    this.value === void 0 && (this.value = []);
    const t = this.value.includes(this._value);
    this.value = t ? this.value.filter((s) => s !== this._value) : [...this.value, this._value];
  }
  constructor(t) {
    super(t, false), this.options = t.options, this.value = [...t.initialValues ?? []];
    const s = Math.max(this.options.findIndex(({ value: e2 }) => e2 === t.cursorAt), 0);
    this.cursor = this.options[s].disabled ? d(s, 1, this.options) : s, this.on("key", (e2) => {
      e2 === "a" && this.toggleAll(), e2 === "i" && this.toggleInvert();
    }), this.on("cursor", (e2) => {
      switch (e2) {
        case "left":
        case "up":
          this.cursor = d(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = d(this.cursor, 1, this.options);
          break;
        case "space":
          this.toggleValue();
          break;
      }
    });
  }
};
var ot = class extends p {
  _mask = "\u2022";
  get cursor() {
    return this._cursor;
  }
  get masked() {
    return this.userInput.replaceAll(/./g, this._mask);
  }
  get userInputWithCursor() {
    if (this.state === "submit" || this.state === "cancel") return this.masked;
    const t = this.userInput;
    if (this.cursor >= t.length) return `${this.masked}${v(["inverse", "hidden"], "_")}`;
    const s = this.masked, e2 = s.slice(0, this.cursor), i = s.slice(this.cursor);
    return `${e2}${v("inverse", i[0])}${i.slice(1)}`;
  }
  clear() {
    this._clearUserInput();
  }
  constructor({ mask: t, ...s }) {
    super(s), this._mask = t ?? "\u2022", this.on("userInput", (e2) => {
      this._setValue(e2);
    });
  }
};
var ut = class extends p {
  options;
  cursor = 0;
  get _selectedValue() {
    return this.options[this.cursor];
  }
  changeValue() {
    this.value = this._selectedValue.value;
  }
  constructor(t) {
    super(t, false), this.options = t.options;
    const s = this.options.findIndex(({ value: i }) => i === t.initialValue), e2 = s === -1 ? 0 : s;
    this.cursor = this.options[e2].disabled ? d(e2, 1, this.options) : e2, this.changeValue(), this.on("cursor", (i) => {
      switch (i) {
        case "left":
        case "up":
          this.cursor = d(this.cursor, -1, this.options);
          break;
        case "down":
        case "right":
          this.cursor = d(this.cursor, 1, this.options);
          break;
      }
      this.changeValue();
    });
  }
};
var at = class extends p {
  options;
  cursor = 0;
  constructor(t) {
    super(t, false), this.options = t.options;
    const s = t.caseSensitive === true, e2 = this.options.map(({ value: [i] }) => s ? i : i?.toLowerCase());
    this.cursor = Math.max(e2.indexOf(t.initialValue), 0), this.on("key", (i, n) => {
      if (!i) return;
      const o = s && n.shift ? i.toUpperCase() : i;
      if (!e2.includes(o)) return;
      const u = this.options.find(({ value: [a] }) => s ? a === o : a?.toLowerCase() === i);
      u && (this.value = u.value, this.state = "submit", this.emit("submit"));
    });
  }
};
var ht = class extends p {
  get userInputWithCursor() {
    if (this.state === "submit") return this.userInput;
    const t = this.userInput;
    if (this.cursor >= t.length) return `${this.userInput}\u2588`;
    const s = t.slice(0, this.cursor), [e2, ...i] = t.slice(this.cursor);
    return `${s}${v("inverse", e2)}${i.join("")}`;
  }
  get cursor() {
    return this._cursor;
  }
  constructor(t) {
    super({ ...t, initialUserInput: t.initialUserInput ?? t.initialValue }), this.on("userInput", (s) => {
      this._setValue(s);
    }), this.on("finalize", () => {
      this.value || (this.value = t.defaultValue), this.value === void 0 && (this.value = "");
    });
  }
};

// ../../node_modules/.bun/@clack+prompts@1.3.0/node_modules/@clack/prompts/dist/index.mjs
import { styleText as e, stripVTControlCharacters as nt2 } from "util";
import j2 from "process";
var import_sisteransi2 = __toESM(require_src(), 1);
import { existsSync as zt, lstatSync as wt, readdirSync as Qt } from "fs";
import { dirname as bt, join as Zt } from "path";
function te() {
  return j2.platform !== "win32" ? j2.env.TERM !== "linux" : !!j2.env.CI || !!j2.env.WT_SESSION || !!j2.env.TERMINUS_SUBLIME || j2.env.ConEmuTask === "{cmd::Cmder}" || j2.env.TERM_PROGRAM === "Terminus-Sublime" || j2.env.TERM_PROGRAM === "vscode" || j2.env.TERM === "xterm-256color" || j2.env.TERM === "alacritty" || j2.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
var tt2 = te();
var at2 = () => process.env.CI === "true";
var Tt = (t) => t.isTTY === true;
var w2 = (t, r) => tt2 ? t : r;
var _t = w2("\u25C6", "*");
var ot2 = w2("\u25A0", "x");
var ut2 = w2("\u25B2", "x");
var F2 = w2("\u25C7", "o");
var lt = w2("\u250C", "T");
var $2 = w2("\u2502", "|");
var E2 = w2("\u2514", "\u2014");
var It = w2("\u2510", "T");
var Et = w2("\u2518", "\u2014");
var z2 = w2("\u25CF", ">");
var H2 = w2("\u25CB", " ");
var et2 = w2("\u25FB", "[\u2022]");
var U2 = w2("\u25FC", "[+]");
var J2 = w2("\u25FB", "[ ]");
var Gt = w2("\u25AA", "\u2022");
var st2 = w2("\u2500", "-");
var ct = w2("\u256E", "+");
var xt = w2("\u251C", "+");
var $t = w2("\u256F", "+");
var dt = w2("\u2570", "+");
var Ot = w2("\u256D", "+");
var ht2 = w2("\u25CF", "\u2022");
var pt = w2("\u25C6", "*");
var mt = w2("\u25B2", "!");
var gt = w2("\u25A0", "x");
var M = (t) => {
  switch (t) {
    case "initial":
    case "active":
      return e("cyan", _t);
    case "cancel":
      return e("red", ot2);
    case "error":
      return e("yellow", ut2);
    case "submit":
      return e("green", F2);
  }
};
var yt = (t) => {
  switch (t) {
    case "initial":
    case "active":
      return e("cyan", $2);
    case "cancel":
      return e("red", $2);
    case "error":
      return e("yellow", $2);
    case "submit":
      return e("green", $2);
  }
};
var ee = (t, r, s, i, u) => {
  let n = r, o = 0;
  for (let c2 = s; c2 < i; c2++) {
    const a = t[c2];
    if (n = n - a.length, o++, n <= u) break;
  }
  return { lineCount: n, removals: o };
};
var Y2 = ({ cursor: t, options: r, style: s, output: i = process.stdout, maxItems: u = Number.POSITIVE_INFINITY, columnPadding: n = 0, rowPadding: o = 4 }) => {
  const c2 = A(i) - n, a = L(i), l = e("dim", "..."), d2 = Math.max(a - o, 0), y = Math.max(Math.min(u, d2), 5);
  let p2 = 0;
  t >= y - 3 && (p2 = Math.max(Math.min(t - y + 3, r.length - y), 0));
  let m = y < r.length && p2 > 0, g = y < r.length && p2 + y < r.length;
  const S2 = Math.min(p2 + y, r.length), h2 = [];
  let f = 0;
  m && f++, g && f++;
  const v2 = p2 + (m ? 1 : 0), T = S2 - (g ? 1 : 0);
  for (let b2 = v2; b2 < T; b2++) {
    const G2 = wrapAnsi(s(r[b2], b2 === t), c2, { hard: true, trim: false }).split(`
`);
    h2.push(G2), f += G2.length;
  }
  if (f > d2) {
    let b2 = 0, G2 = 0, x2 = f;
    const A2 = t - v2, P2 = (N2, D2) => ee(h2, x2, N2, D2, d2);
    m ? ({ lineCount: x2, removals: b2 } = P2(0, A2), x2 > d2 && ({ lineCount: x2, removals: G2 } = P2(A2 + 1, h2.length))) : ({ lineCount: x2, removals: G2 } = P2(A2 + 1, h2.length), x2 > d2 && ({ lineCount: x2, removals: b2 } = P2(0, A2))), b2 > 0 && (m = true, h2.splice(0, b2)), G2 > 0 && (g = true, h2.splice(h2.length - G2, G2));
  }
  const C2 = [];
  m && C2.push(l);
  for (const b2 of h2) for (const G2 of b2) C2.push(G2);
  return g && C2.push(l), C2;
};
function Mt(t) {
  return t.label ?? String(t.value ?? "");
}
function Rt(t, r) {
  if (!t) return true;
  const s = (r.label ?? String(r.value ?? "")).toLowerCase(), i = (r.hint ?? "").toLowerCase(), u = String(r.value).toLowerCase(), n = t.toLowerCase();
  return s.includes(n) || i.includes(n) || u.includes(n);
}
function se(t, r) {
  const s = [];
  for (const i of r) t.includes(i.value) && s.push(i);
  return s;
}
var At = (t) => new Q({ options: t.options, initialValue: t.initialValue ? [t.initialValue] : void 0, initialUserInput: t.initialUserInput, placeholder: t.placeholder, filter: t.filter ?? ((r, s) => Rt(r, s)), signal: t.signal, input: t.input, output: t.output, validate: t.validate, render() {
  const r = t.withGuide ?? h.withGuide, s = r ? [`${e("gray", $2)}`, `${M(this.state)}  ${t.message}`] : [`${M(this.state)}  ${t.message}`], i = this.userInput, u = this.options, n = t.placeholder, o = i === "" && n !== void 0, c2 = (a, l) => {
    const d2 = Mt(a), y = a.hint && a.value === this.focusedValue ? e("dim", ` (${a.hint})`) : "";
    switch (l) {
      case "active":
        return `${e("green", z2)} ${d2}${y}`;
      case "inactive":
        return `${e("dim", H2)} ${e("dim", d2)}`;
      case "disabled":
        return `${e("gray", H2)} ${e(["strikethrough", "gray"], d2)}`;
    }
  };
  switch (this.state) {
    case "submit": {
      const a = se(this.selectedValues, u), l = a.length > 0 ? `  ${e("dim", a.map(Mt).join(", "))}` : "", d2 = r ? e("gray", $2) : "";
      return `${s.join(`
`)}
${d2}${l}`;
    }
    case "cancel": {
      const a = i ? `  ${e(["strikethrough", "dim"], i)}` : "", l = r ? e("gray", $2) : "";
      return `${s.join(`
`)}
${l}${a}`;
    }
    default: {
      const a = this.state === "error" ? "yellow" : "cyan", l = r ? `${e(a, $2)}  ` : "", d2 = r ? e(a, E2) : "";
      let y = "";
      if (this.isNavigating || o) {
        const v2 = o ? n : i;
        y = v2 !== "" ? ` ${e("dim", v2)}` : "";
      } else y = ` ${this.userInputWithCursor}`;
      const p2 = this.filteredOptions.length !== u.length ? e("dim", ` (${this.filteredOptions.length} match${this.filteredOptions.length === 1 ? "" : "es"})`) : "", m = this.filteredOptions.length === 0 && i ? [`${l}${e("yellow", "No matches found")}`] : [], g = this.state === "error" ? [`${l}${e("yellow", this.error)}`] : [];
      r && s.push(`${l.trimEnd()}`), s.push(`${l}${e("dim", "Search:")}${y}${p2}`, ...m, ...g);
      const S2 = [`${e("dim", "\u2191/\u2193")} to select`, `${e("dim", "Enter:")} confirm`, `${e("dim", "Type:")} to search`], h2 = [`${l}${S2.join(" \u2022 ")}`, d2], f = this.filteredOptions.length === 0 ? [] : Y2({ cursor: this.cursor, options: this.filteredOptions, columnPadding: r ? 3 : 0, rowPadding: s.length + h2.length, style: (v2, T) => c2(v2, v2.disabled ? "disabled" : T ? "active" : "inactive"), maxItems: t.maxItems, output: t.output });
      return [...s, ...f.map((v2) => `${l}${v2}`), ...h2].join(`
`);
    }
  }
} }).prompt();
var ie = (t) => {
  const r = (i, u, n, o) => {
    const c2 = n.includes(i.value), a = i.label ?? String(i.value ?? ""), l = i.hint && o !== void 0 && i.value === o ? e("dim", ` (${i.hint})`) : "", d2 = c2 ? e("green", U2) : e("dim", J2);
    return i.disabled ? `${e("gray", J2)} ${e(["strikethrough", "gray"], a)}` : u ? `${d2} ${a}${l}` : `${d2} ${e("dim", a)}`;
  }, s = new Q({ options: t.options, multiple: true, placeholder: t.placeholder, filter: t.filter ?? ((i, u) => Rt(i, u)), validate: () => {
    if (t.required && s.selectedValues.length === 0) return "Please select at least one item";
  }, initialValue: t.initialValues, signal: t.signal, input: t.input, output: t.output, render() {
    const i = t.withGuide ?? h.withGuide, u = `${i ? `${e("gray", $2)}
` : ""}${M(this.state)}  ${t.message}
`, n = this.userInput, o = t.placeholder, c2 = n === "" && o !== void 0, a = this.isNavigating || c2 ? e("dim", c2 ? o : n) : this.userInputWithCursor, l = this.options, d2 = this.filteredOptions.length !== l.length ? e("dim", ` (${this.filteredOptions.length} match${this.filteredOptions.length === 1 ? "" : "es"})`) : "";
    switch (this.state) {
      case "submit":
        return `${u}${i ? `${e("gray", $2)}  ` : ""}${e("dim", `${this.selectedValues.length} items selected`)}`;
      case "cancel":
        return `${u}${i ? `${e("gray", $2)}  ` : ""}${e(["strikethrough", "dim"], n)}`;
      default: {
        const y = this.state === "error" ? "yellow" : "cyan", p2 = i ? `${e(y, $2)}  ` : "", m = i ? e(y, E2) : "", g = [`${e("dim", "\u2191/\u2193")} to navigate`, `${e("dim", this.isNavigating ? "Space/Tab:" : "Tab:")} select`, `${e("dim", "Enter:")} confirm`, `${e("dim", "Type:")} to search`], S2 = this.filteredOptions.length === 0 && n ? [`${p2}${e("yellow", "No matches found")}`] : [], h2 = this.state === "error" ? [`${p2}${e("yellow", this.error)}`] : [], f = [...`${u}${i ? e(y, $2) : ""}`.split(`
`), `${p2}${e("dim", "Search:")} ${a}${d2}`, ...S2, ...h2], v2 = [`${p2}${g.join(" \u2022 ")}`, m], T = Y2({ cursor: this.cursor, options: this.filteredOptions, style: (C2, b2) => r(C2, b2, this.selectedValues, this.focusedValue), maxItems: t.maxItems, output: t.output, rowPadding: f.length + v2.length });
        return [...f, ...T.map((C2) => `${p2}${C2}`), ...v2].join(`
`);
      }
    }
  } });
  return s.prompt();
};
var re = [Ot, ct, dt, $t];
var ne = [lt, It, E2, Et];
function Pt(t, r, s, i) {
  let u = s, n = s;
  return i === "center" ? u = Math.floor((r - t) / 2) : i === "right" && (u = r - t - s), n = r - u - t, [u, n];
}
var ae = (t) => t;
var oe = (t = "", r = "", s) => {
  const i = s?.output ?? process.stdout, u = A(i), n = 2, o = s?.titlePadding ?? 1, c2 = s?.contentPadding ?? 2, a = s?.width === void 0 || s.width === "auto" ? 1 : Math.min(1, s.width), l = s?.withGuide ?? h.withGuide ? `${$2} ` : "", d2 = s?.formatBorder ?? ae, y = (s?.rounded ? re : ne).map(d2), p2 = d2(st2), m = d2($2), g = dist_default2(l), S2 = dist_default2(r), h2 = u - g;
  let f = Math.floor(u * a) - g;
  if (s?.width === "auto") {
    const P2 = t.split(`
`);
    let N2 = S2 + o * 2;
    for (const rt2 of P2) {
      const W2 = dist_default2(rt2) + c2 * 2;
      W2 > N2 && (N2 = W2);
    }
    const D2 = N2 + n;
    D2 < f && (f = D2);
  }
  f % 2 !== 0 && (f < h2 ? f++ : f--);
  const v2 = f - n, T = v2 - o * 2, C2 = S2 > T ? `${r.slice(0, T - 3)}...` : r, [b2, G2] = Pt(dist_default2(C2), v2, o, s?.titleAlign), x2 = wrapAnsi(t, v2 - c2 * 2, { hard: true, trim: false });
  i.write(`${l}${y[0]}${p2.repeat(b2)}${C2}${p2.repeat(G2)}${y[1]}
`);
  const A2 = x2.split(`
`);
  for (const P2 of A2) {
    const [N2, D2] = Pt(dist_default2(P2), v2, c2, s?.contentAlign);
    i.write(`${l}${m}${" ".repeat(N2)}${P2}${" ".repeat(D2)}${m}
`);
  }
  i.write(`${l}${y[2]}${p2.repeat(v2)}${y[3]}
`);
};
var ue = (t) => {
  const r = t.active ?? "Yes", s = t.inactive ?? "No";
  return new X({ active: r, inactive: s, signal: t.signal, input: t.input, output: t.output, initialValue: t.initialValue ?? true, render() {
    const i = t.withGuide ?? h.withGuide, u = `${M(this.state)}  `, n = i ? `${e("gray", $2)}  ` : "", o = W(t.output, t.message, n, u), c2 = `${i ? `${e("gray", $2)}
` : ""}${o}
`, a = this.value ? r : s;
    switch (this.state) {
      case "submit": {
        const l = i ? `${e("gray", $2)}  ` : "";
        return `${c2}${l}${e("dim", a)}`;
      }
      case "cancel": {
        const l = i ? `${e("gray", $2)}  ` : "";
        return `${c2}${l}${e(["strikethrough", "dim"], a)}${i ? `
${e("gray", $2)}` : ""}`;
      }
      default: {
        const l = i ? `${e("cyan", $2)}  ` : "", d2 = i ? e("cyan", E2) : "";
        return `${c2}${l}${this.value ? `${e("green", z2)} ${r}` : `${e("dim", H2)} ${e("dim", r)}`}${t.vertical ? i ? `
${e("cyan", $2)}  ` : `
` : ` ${e("dim", "/")} `}${this.value ? `${e("dim", H2)} ${e("dim", s)}` : `${e("green", z2)} ${s}`}
${d2}
`;
      }
    }
  } }).prompt();
};
var le = (t) => {
  const r = t.validate;
  return new et({ ...t, validate(s) {
    if (s === void 0) return t.defaultValue !== void 0 ? void 0 : r ? r(s) : h.date.messages.required;
    const i = (u) => u.toISOString().slice(0, 10);
    if (t.minDate && i(s) < i(t.minDate)) return h.date.messages.afterMin(t.minDate);
    if (t.maxDate && i(s) > i(t.maxDate)) return h.date.messages.beforeMax(t.maxDate);
    if (r) return r(s);
  }, render() {
    const s = (t?.withGuide ?? h.withGuide) !== false, i = `${`${s ? `${e("gray", $2)}
` : ""}${M(this.state)}  `}${t.message}
`, u = this.state !== "initial" ? this.state : "active", n = ce(this, u), o = this.value instanceof Date ? this.formattedValue : "";
    switch (this.state) {
      case "error": {
        const c2 = this.error ? `  ${e("yellow", this.error)}` : "", a = s ? `${e("yellow", $2)}  ` : "", l = s ? e("yellow", E2) : "";
        return `${i.trim()}
${a}${n}
${l}${c2}
`;
      }
      case "submit": {
        const c2 = o ? `  ${e("dim", o)}` : "", a = s ? e("gray", $2) : "";
        return `${i}${a}${c2}`;
      }
      case "cancel": {
        const c2 = o ? `  ${e(["strikethrough", "dim"], o)}` : "", a = s ? e("gray", $2) : "";
        return `${i}${a}${c2}${o.trim() ? `
${a}` : ""}`;
      }
      default: {
        const c2 = s ? `${e("cyan", $2)}  ` : "", a = s ? e("cyan", E2) : "", l = s ? `${e("cyan", $2)}  ` : "", d2 = this.inlineError ? `
${l}${e("yellow", this.inlineError)}` : "";
        return `${i}${c2}${n}${d2}
${a}
`;
      }
    }
  } }).prompt();
};
function ce(t, r) {
  const s = t.segmentValues, i = t.segmentCursor;
  if (r === "submit" || r === "cancel") return t.formattedValue;
  const u = e("gray", t.separator);
  return t.segments.map((n, o) => {
    const c2 = o === i.segmentIndex && !["submit", "cancel"].includes(r), a = de[n.type];
    return $e(s[n.type], { isActive: c2, label: a });
  }).join(u);
}
function $e(t, r) {
  const s = !t || t.replace(/_/g, "") === "";
  return r.isActive ? e("inverse", s ? r.label : t.replace(/_/g, " ")) : s ? e("dim", r.label) : t.replace(/_/g, e("dim", " "));
}
var de = { year: "yyyy", month: "mm", day: "dd" };
var he = async (t, r) => {
  const s = {}, i = Object.keys(t);
  for (const u of i) {
    const n = t[u], o = await n({ results: s })?.catch((c2) => {
      throw c2;
    });
    if (typeof r?.onCancel == "function" && q(o)) {
      s[u] = "canceled", r.onCancel({ results: s });
      continue;
    }
    s[u] = o;
  }
  return s;
};
var pe = (t) => {
  const { selectableGroups: r = true, groupSpacing: s = 0 } = t, i = (n, o, c2 = []) => {
    const a = n.label ?? String(n.value), l = typeof n.group == "string", d2 = l && (c2[c2.indexOf(n) + 1] ?? { group: true }), y = l && d2 && d2.group === true, p2 = l ? r ? `${y ? E2 : $2} ` : "  " : "";
    let m = "";
    if (s > 0 && !l) {
      const S2 = `
${e("cyan", $2)}`;
      m = `${S2.repeat(s - 1)}${S2}  `;
    }
    if (o === "active") return `${m}${e("dim", p2)}${e("cyan", et2)} ${a}${n.hint ? ` ${e("dim", `(${n.hint})`)}` : ""}`;
    if (o === "group-active") return `${m}${p2}${e("cyan", et2)} ${e("dim", a)}`;
    if (o === "group-active-selected") return `${m}${p2}${e("green", U2)} ${e("dim", a)}`;
    if (o === "selected") {
      const S2 = l || r ? e("green", U2) : "";
      return `${m}${e("dim", p2)}${S2} ${e("dim", a)}${n.hint ? ` ${e("dim", `(${n.hint})`)}` : ""}`;
    }
    if (o === "cancelled") return `${e(["strikethrough", "dim"], a)}`;
    if (o === "active-selected") return `${m}${e("dim", p2)}${e("green", U2)} ${a}${n.hint ? ` ${e("dim", `(${n.hint})`)}` : ""}`;
    if (o === "submitted") return `${e("dim", a)}`;
    const g = l || r ? e("dim", J2) : "";
    return `${m}${e("dim", p2)}${g} ${e("dim", a)}`;
  }, u = t.required ?? true;
  return new it({ options: t.options, signal: t.signal, input: t.input, output: t.output, initialValues: t.initialValues, required: u, cursorAt: t.cursorAt, selectableGroups: r, validate(n) {
    if (u && (n === void 0 || n.length === 0)) return `Please select at least one option.
${e("reset", e("dim", `Press ${e(["gray", "bgWhite", "inverse"], " space ")} to select, ${e("gray", e(["bgWhite", "inverse"], " enter "))} to submit`))}`;
  }, render() {
    const n = t.withGuide ?? h.withGuide, o = `${n ? `${e("gray", $2)}
` : ""}${M(this.state)}  ${t.message}
`, c2 = this.value ?? [];
    switch (this.state) {
      case "submit": {
        const a = this.options.filter(({ value: d2 }) => c2.includes(d2)).map((d2) => i(d2, "submitted")), l = a.length === 0 ? "" : `  ${a.join(e("dim", ", "))}`;
        return `${o}${n ? e("gray", $2) : ""}${l}`;
      }
      case "cancel": {
        const a = this.options.filter(({ value: l }) => c2.includes(l)).map((l) => i(l, "cancelled")).join(e("dim", ", "));
        return `${o}${n ? `${e("gray", $2)}  ` : ""}${a.trim() ? `${a}${n ? `
${e("gray", $2)}` : ""}` : ""}`;
      }
      case "error": {
        const a = this.error.split(`
`).map((l, d2) => d2 === 0 ? `${n ? `${e("yellow", E2)}  ` : ""}${e("yellow", l)}` : `   ${l}`).join(`
`);
        return `${o}${n ? `${e("yellow", $2)}  ` : ""}${this.options.map((l, d2, y) => {
          const p2 = c2.includes(l.value) || l.group === true && this.isGroupSelected(`${l.value}`), m = d2 === this.cursor;
          return !m && typeof l.group == "string" && this.options[this.cursor].value === l.group ? i(l, p2 ? "group-active-selected" : "group-active", y) : m && p2 ? i(l, "active-selected", y) : p2 ? i(l, "selected", y) : i(l, m ? "active" : "inactive", y);
        }).join(`
${n ? `${e("yellow", $2)}  ` : ""}`)}
${a}
`;
      }
      default: {
        const a = this.options.map((d2, y, p2) => {
          const m = c2.includes(d2.value) || d2.group === true && this.isGroupSelected(`${d2.value}`), g = y === this.cursor, S2 = !g && typeof d2.group == "string" && this.options[this.cursor].value === d2.group;
          let h2 = "";
          return S2 ? h2 = i(d2, m ? "group-active-selected" : "group-active", p2) : g && m ? h2 = i(d2, "active-selected", p2) : m ? h2 = i(d2, "selected", p2) : h2 = i(d2, g ? "active" : "inactive", p2), `${y !== 0 && !h2.startsWith(`
`) ? "  " : ""}${h2}`;
        }).join(`
${n ? e("cyan", $2) : ""}`), l = a.startsWith(`
`) ? "" : "  ";
        return `${o}${n ? e("cyan", $2) : ""}${l}${a}
${n ? e("cyan", E2) : ""}
`;
      }
    }
  } }).prompt();
};
var R2 = { message: (t = [], { symbol: r = e("gray", $2), secondarySymbol: s = e("gray", $2), output: i = process.stdout, spacing: u = 1, withGuide: n } = {}) => {
  const o = [], c2 = n ?? h.withGuide, a = c2 ? s : "", l = c2 ? `${r}  ` : "", d2 = c2 ? `${s}  ` : "";
  for (let p2 = 0; p2 < u; p2++) o.push(a);
  const y = Array.isArray(t) ? t : t.split(`
`);
  if (y.length > 0) {
    const [p2, ...m] = y;
    p2.length > 0 ? o.push(`${l}${p2}`) : o.push(c2 ? r : "");
    for (const g of m) g.length > 0 ? o.push(`${d2}${g}`) : o.push(c2 ? s : "");
  }
  i.write(`${o.join(`
`)}
`);
}, info: (t, r) => {
  R2.message(t, { ...r, symbol: e("blue", ht2) });
}, success: (t, r) => {
  R2.message(t, { ...r, symbol: e("green", pt) });
}, step: (t, r) => {
  R2.message(t, { ...r, symbol: e("green", F2) });
}, warn: (t, r) => {
  R2.message(t, { ...r, symbol: e("yellow", mt) });
}, warning: (t, r) => {
  R2.warn(t, r);
}, error: (t, r) => {
  R2.message(t, { ...r, symbol: e("red", gt) });
} };
var me = (t = "", r) => {
  const s = r?.output ?? process.stdout, i = r?.withGuide ?? h.withGuide ? `${e("gray", E2)}  ` : "";
  s.write(`${i}${e("red", t)}

`);
};
var ge = (t = "", r) => {
  const s = r?.output ?? process.stdout, i = r?.withGuide ?? h.withGuide ? `${e("gray", lt)}  ` : "";
  s.write(`${i}${t}
`);
};
var ye = (t = "", r) => {
  const s = r?.output ?? process.stdout, i = r?.withGuide ?? h.withGuide ? `${e("gray", $2)}
${e("gray", E2)}  ` : "";
  s.write(`${i}${t}

`);
};
var fe = (t) => new rt({ validate: t.validate, placeholder: t.placeholder, defaultValue: t.defaultValue, initialValue: t.initialValue, showSubmit: t.showSubmit, output: t.output, signal: t.signal, input: t.input, render() {
  const r = t?.withGuide ?? h.withGuide, s = `${`${r ? `${e("gray", $2)}
` : ""}${M(this.state)}  `}${t.message}
`, i = t.placeholder ? e("inverse", t.placeholder[0]) + e("dim", t.placeholder.slice(1)) : e(["inverse", "hidden"], "_"), u = this.userInput ? this.userInputWithCursor : i, n = this.value ?? "", o = t.showSubmit ? `
  ${e(this.focused === "submit" ? "cyan" : "dim", "[ submit ]")}` : "";
  switch (this.state) {
    case "error": {
      const c2 = `${e("yellow", $2)}  `, a = r ? W(t.output, u, c2, void 0) : u, l = e("yellow", E2);
      return `${s}${a}
${l}  ${e("yellow", this.error)}${o}
`;
    }
    case "submit": {
      const c2 = `${e("gray", $2)}  `, a = r ? W(t.output, n, c2, void 0, (l) => e("dim", l)) : n ? e("dim", n) : "";
      return `${s}${a}`;
    }
    case "cancel": {
      const c2 = `${e("gray", $2)}  `, a = r ? W(t.output, n, c2, void 0, (l) => e(["strikethrough", "dim"], l)) : n ? e(["strikethrough", "dim"], n) : "";
      return `${s}${a}`;
    }
    default: {
      const c2 = r ? `${e("cyan", $2)}  ` : "", a = r ? e("cyan", E2) : "", l = r ? W(t.output, u, c2) : u;
      return `${s}${l}
${a}${o}
`;
    }
  }
} }).prompt();
var Q2 = (t, r) => t.split(`
`).map((s) => r(s)).join(`
`);
var ve = (t) => {
  const r = (i, u) => {
    const n = i.label ?? String(i.value);
    return u === "disabled" ? `${e("gray", J2)} ${Q2(n, (o) => e(["strikethrough", "gray"], o))}${i.hint ? ` ${e("dim", `(${i.hint ?? "disabled"})`)}` : ""}` : u === "active" ? `${e("cyan", et2)} ${n}${i.hint ? ` ${e("dim", `(${i.hint})`)}` : ""}` : u === "selected" ? `${e("green", U2)} ${Q2(n, (o) => e("dim", o))}${i.hint ? ` ${e("dim", `(${i.hint})`)}` : ""}` : u === "cancelled" ? `${Q2(n, (o) => e(["strikethrough", "dim"], o))}` : u === "active-selected" ? `${e("green", U2)} ${n}${i.hint ? ` ${e("dim", `(${i.hint})`)}` : ""}` : u === "submitted" ? `${Q2(n, (o) => e("dim", o))}` : `${e("dim", J2)} ${Q2(n, (o) => e("dim", o))}`;
  }, s = t.required ?? true;
  return new nt({ options: t.options, signal: t.signal, input: t.input, output: t.output, initialValues: t.initialValues, required: s, cursorAt: t.cursorAt, validate(i) {
    if (s && (i === void 0 || i.length === 0)) return `Please select at least one option.
${e("reset", e("dim", `Press ${e(["gray", "bgWhite", "inverse"], " space ")} to select, ${e("gray", e("bgWhite", e("inverse", " enter ")))} to submit`))}`;
  }, render() {
    const i = t.withGuide ?? h.withGuide, u = W(t.output, t.message, i ? `${yt(this.state)}  ` : "", `${M(this.state)}  `), n = `${i ? `${e("gray", $2)}
` : ""}${u}
`, o = this.value ?? [], c2 = (a, l) => {
      if (a.disabled) return r(a, "disabled");
      const d2 = o.includes(a.value);
      return l && d2 ? r(a, "active-selected") : d2 ? r(a, "selected") : r(a, l ? "active" : "inactive");
    };
    switch (this.state) {
      case "submit": {
        const a = this.options.filter(({ value: d2 }) => o.includes(d2)).map((d2) => r(d2, "submitted")).join(e("dim", ", ")) || e("dim", "none"), l = W(t.output, a, i ? `${e("gray", $2)}  ` : "");
        return `${n}${l}`;
      }
      case "cancel": {
        const a = this.options.filter(({ value: d2 }) => o.includes(d2)).map((d2) => r(d2, "cancelled")).join(e("dim", ", "));
        if (a.trim() === "") return `${n}${e("gray", $2)}`;
        const l = W(t.output, a, i ? `${e("gray", $2)}  ` : "");
        return `${n}${l}${i ? `
${e("gray", $2)}` : ""}`;
      }
      case "error": {
        const a = i ? `${e("yellow", $2)}  ` : "", l = this.error.split(`
`).map((p2, m) => m === 0 ? `${i ? `${e("yellow", E2)}  ` : ""}${e("yellow", p2)}` : `   ${p2}`).join(`
`), d2 = n.split(`
`).length, y = l.split(`
`).length + 1;
        return `${n}${a}${Y2({ output: t.output, options: this.options, cursor: this.cursor, maxItems: t.maxItems, columnPadding: a.length, rowPadding: d2 + y, style: c2 }).join(`
${a}`)}
${l}
`;
      }
      default: {
        const a = i ? `${e("cyan", $2)}  ` : "", l = n.split(`
`).length, d2 = i ? 2 : 1;
        return `${n}${a}${Y2({ output: t.output, options: this.options, cursor: this.cursor, maxItems: t.maxItems, columnPadding: a.length, rowPadding: l + d2, style: c2 }).join(`
${a}`)}
${i ? e("cyan", E2) : ""}
`;
      }
    }
  } }).prompt();
};
var we = (t) => e("dim", t);
var be = (t, r, s) => {
  const i = { hard: true, trim: false }, u = wrapAnsi(t, r, i).split(`
`), n = u.reduce((a, l) => Math.max(dist_default2(l), a), 0), o = u.map(s).reduce((a, l) => Math.max(dist_default2(l), a), 0), c2 = r - (o - n);
  return wrapAnsi(t, c2, i);
};
var Se = (t = "", r = "", s) => {
  const i = s?.output ?? j2.stdout, u = s?.withGuide ?? h.withGuide, n = s?.format ?? we, o = ["", ...be(t, A(i) - 6, n).split(`
`).map(n), ""], c2 = dist_default2(r), a = Math.max(o.reduce((p2, m) => {
    const g = dist_default2(m);
    return g > p2 ? g : p2;
  }, 0), c2) + 2, l = o.map((p2) => `${e("gray", $2)}  ${p2}${" ".repeat(a - dist_default2(p2))}${e("gray", $2)}`).join(`
`), d2 = u ? `${e("gray", $2)}
` : "", y = u ? xt : dt;
  i.write(`${d2}${e("green", F2)}  ${e("reset", r)} ${e("gray", st2.repeat(Math.max(a - c2 - 1, 1)) + ct)}
${l}
${e("gray", y + st2.repeat(a + 2) + $t)}
`);
};
var Ce = (t) => new ot({ validate: t.validate, mask: t.mask ?? Gt, signal: t.signal, input: t.input, output: t.output, render() {
  const r = t.withGuide ?? h.withGuide, s = `${r ? `${e("gray", $2)}
` : ""}${M(this.state)}  ${t.message}
`, i = this.userInputWithCursor, u = this.masked;
  switch (this.state) {
    case "error": {
      const n = r ? `${e("yellow", $2)}  ` : "", o = r ? `${e("yellow", E2)}  ` : "", c2 = u ?? "";
      return t.clearOnError && this.clear(), `${s.trim()}
${n}${c2}
${o}${e("yellow", this.error)}
`;
    }
    case "submit": {
      const n = r ? `${e("gray", $2)}  ` : "", o = u ? e("dim", u) : "";
      return `${s}${n}${o}`;
    }
    case "cancel": {
      const n = r ? `${e("gray", $2)}  ` : "", o = u ? e(["strikethrough", "dim"], u) : "";
      return `${s}${n}${o}${u && r ? `
${e("gray", $2)}` : ""}`;
    }
    default: {
      const n = r ? `${e("cyan", $2)}  ` : "", o = r ? e("cyan", E2) : "";
      return `${s}${n}${i}
${o}
`;
    }
  }
} }).prompt();
var Te = (t) => {
  const r = t.validate;
  return At({ ...t, initialUserInput: t.initialValue ?? t.root ?? process.cwd(), maxItems: 5, validate(s) {
    if (!Array.isArray(s)) {
      if (!s) return "Please select a path";
      if (r) return r(s);
    }
  }, options() {
    const s = this.userInput;
    if (s === "") return [];
    try {
      let i;
      zt(s) ? wt(s).isDirectory() && (!t.directory || s.endsWith("/")) ? i = s : i = bt(s) : i = bt(s);
      const u = s.length > 1 && s.endsWith("/") ? s.slice(0, -1) : s;
      return Qt(i).map((n) => {
        const o = Zt(i, n), c2 = wt(o);
        return { name: n, path: o, isDirectory: c2.isDirectory() };
      }).filter(({ path: n, isDirectory: o }) => n.startsWith(u) && (o || !t.directory)).map((n) => ({ value: n.path }));
    } catch {
      return [];
    }
  } });
};
var _e = (t) => e("magenta", t);
var ft = ({ indicator: t = "dots", onCancel: r, output: s = process.stdout, cancelMessage: i, errorMessage: u, frames: n = tt2 ? ["\u25D2", "\u25D0", "\u25D3", "\u25D1"] : ["\u2022", "o", "O", "0"], delay: o = tt2 ? 80 : 120, signal: c2, ...a } = {}) => {
  const l = at2();
  let d2, y, p2 = false, m = false, g = "", S2, h2 = performance.now();
  const f = A(s), v2 = a?.styleFrame ?? _e, T = (I2) => {
    const V2 = I2 > 1 ? u ?? h.messages.error : i ?? h.messages.cancel;
    m = I2 === 1, p2 && (W2(V2, I2), m && typeof r == "function" && r());
  }, C2 = () => T(2), b2 = () => T(1), G2 = () => {
    process.on("uncaughtExceptionMonitor", C2), process.on("unhandledRejection", C2), process.on("SIGINT", b2), process.on("SIGTERM", b2), process.on("exit", T), c2 && c2.addEventListener("abort", b2);
  }, x2 = () => {
    process.removeListener("uncaughtExceptionMonitor", C2), process.removeListener("unhandledRejection", C2), process.removeListener("SIGINT", b2), process.removeListener("SIGTERM", b2), process.removeListener("exit", T), c2 && c2.removeEventListener("abort", b2);
  }, A2 = () => {
    if (S2 === void 0) return;
    l && s.write(`
`);
    const I2 = wrapAnsi(S2, f, { hard: true, trim: false }).split(`
`);
    I2.length > 1 && s.write(import_sisteransi2.cursor.up(I2.length - 1)), s.write(import_sisteransi2.cursor.to(0)), s.write(import_sisteransi2.erase.down());
  }, P2 = (I2) => I2.replace(/\.+$/, ""), N2 = (I2) => {
    const V2 = (performance.now() - I2) / 1e3, B2 = Math.floor(V2 / 60), L2 = Math.floor(V2 % 60);
    return B2 > 0 ? `[${B2}m ${L2}s]` : `[${L2}s]`;
  }, D2 = a.withGuide ?? h.withGuide, rt2 = (I2 = "") => {
    p2 = true, d2 = R({ output: s }), g = P2(I2), h2 = performance.now(), D2 && s.write(`${e("gray", $2)}
`);
    let V2 = 0, B2 = 0;
    G2(), y = setInterval(() => {
      if (l && g === S2) return;
      A2(), S2 = g;
      const L2 = v2(n[V2]);
      let Z2;
      if (l) Z2 = `${L2}  ${g}...`;
      else if (t === "timer") Z2 = `${L2}  ${g} ${N2(h2)}`;
      else {
        const kt = ".".repeat(Math.floor(B2)).slice(0, 3);
        Z2 = `${L2}  ${g}${kt}`;
      }
      const Nt = wrapAnsi(Z2, f, { hard: true, trim: false });
      s.write(Nt), V2 = V2 + 1 < n.length ? V2 + 1 : 0, B2 = B2 < 4 ? B2 + 0.125 : 0;
    }, o);
  }, W2 = (I2 = "", V2 = 0, B2 = false) => {
    if (!p2) return;
    p2 = false, clearInterval(y), A2();
    const L2 = V2 === 0 ? e("green", F2) : V2 === 1 ? e("red", ot2) : e("red", ut2);
    g = I2 ?? g, B2 || (t === "timer" ? s.write(`${L2}  ${g} ${N2(h2)}
`) : s.write(`${L2}  ${g}
`)), x2(), d2();
  };
  return { start: rt2, stop: (I2 = "") => W2(I2, 0), message: (I2 = "") => {
    g = P2(I2 ?? g);
  }, cancel: (I2 = "") => W2(I2, 1), error: (I2 = "") => W2(I2, 2), clear: () => W2("", 0, true), get isCancelled() {
    return m;
  } };
};
var Vt = { light: w2("\u2500", "-"), heavy: w2("\u2501", "="), block: w2("\u2588", "#") };
function Ie({ style: t = "heavy", max: r = 100, size: s = 40, ...i } = {}) {
  const u = ft(i);
  let n = 0, o = "";
  const c2 = Math.max(1, r), a = Math.max(1, s), l = (m) => {
    switch (m) {
      case "initial":
      case "active":
        return (g) => e("magenta", g);
      case "error":
      case "cancel":
        return (g) => e("red", g);
      case "submit":
        return (g) => e("green", g);
      default:
        return (g) => e("magenta", g);
    }
  }, d2 = (m, g) => {
    const S2 = Math.floor(n / c2 * a);
    return `${l(m)(Vt[t].repeat(S2))}${e("dim", Vt[t].repeat(a - S2))} ${g}`;
  }, y = (m = "") => {
    o = m, u.start(d2("initial", m));
  }, p2 = (m = 1, g) => {
    n = Math.min(c2, m + n), u.message(d2("active", g ?? o)), o = g ?? o;
  };
  return { start: y, stop: u.stop, cancel: u.cancel, error: u.error, clear: u.clear, advance: p2, isCancelled: u.isCancelled, message: (m) => p2(0, m) };
}
var it2 = (t, r) => t.includes(`
`) ? t.split(`
`).map((s) => r(s)).join(`
`) : r(t);
var Ee = (t) => {
  const r = (s, i) => {
    const u = s.label ?? String(s.value);
    switch (i) {
      case "disabled":
        return `${e("gray", H2)} ${it2(u, (n) => e("gray", n))}${s.hint ? ` ${e("dim", `(${s.hint ?? "disabled"})`)}` : ""}`;
      case "selected":
        return `${it2(u, (n) => e("dim", n))}`;
      case "active":
        return `${e("green", z2)} ${u}${s.hint ? ` ${e("dim", `(${s.hint})`)}` : ""}`;
      case "cancelled":
        return `${it2(u, (n) => e(["strikethrough", "dim"], n))}`;
      default:
        return `${e("dim", H2)} ${it2(u, (n) => e("dim", n))}`;
    }
  };
  return new ut({ options: t.options, signal: t.signal, input: t.input, output: t.output, initialValue: t.initialValue, render() {
    const s = t.withGuide ?? h.withGuide, i = `${M(this.state)}  `, u = `${yt(this.state)}  `, n = W(t.output, t.message, u, i), o = `${s ? `${e("gray", $2)}
` : ""}${n}
`;
    switch (this.state) {
      case "submit": {
        const c2 = s ? `${e("gray", $2)}  ` : "", a = W(t.output, r(this.options[this.cursor], "selected"), c2);
        return `${o}${a}`;
      }
      case "cancel": {
        const c2 = s ? `${e("gray", $2)}  ` : "", a = W(t.output, r(this.options[this.cursor], "cancelled"), c2);
        return `${o}${a}${s ? `
${e("gray", $2)}` : ""}`;
      }
      default: {
        const c2 = s ? `${e("cyan", $2)}  ` : "", a = s ? e("cyan", E2) : "", l = o.split(`
`).length, d2 = s ? 2 : 1;
        return `${o}${c2}${Y2({ output: t.output, cursor: this.cursor, options: this.options, maxItems: t.maxItems, columnPadding: c2.length, rowPadding: l + d2, style: (y, p2) => r(y, y.disabled ? "disabled" : p2 ? "active" : "inactive") }).join(`
${c2}`)}
${a}
`;
      }
    }
  } }).prompt();
};
var Ge = (t) => {
  const r = (s, i = "inactive") => {
    const u = s.label ?? String(s.value);
    return i === "selected" ? `${e("dim", u)}` : i === "cancelled" ? `${e(["strikethrough", "dim"], u)}` : i === "active" ? `${e(["bgCyan", "gray"], ` ${s.value} `)} ${u}${s.hint ? ` ${e("dim", `(${s.hint})`)}` : ""}` : `${e(["gray", "bgWhite", "inverse"], ` ${s.value} `)} ${u}${s.hint ? ` ${e("dim", `(${s.hint})`)}` : ""}`;
  };
  return new at({ options: t.options, signal: t.signal, input: t.input, output: t.output, initialValue: t.initialValue, caseSensitive: t.caseSensitive, render() {
    const s = t.withGuide ?? h.withGuide, i = `${s ? `${e("gray", $2)}
` : ""}${M(this.state)}  ${t.message}
`;
    switch (this.state) {
      case "submit": {
        const u = s ? `${e("gray", $2)}  ` : "", n = this.options.find((c2) => c2.value === this.value) ?? t.options[0], o = W(t.output, r(n, "selected"), u);
        return `${i}${o}`;
      }
      case "cancel": {
        const u = s ? `${e("gray", $2)}  ` : "", n = W(t.output, r(this.options[0], "cancelled"), u);
        return `${i}${n}${s ? `
${e("gray", $2)}` : ""}`;
      }
      default: {
        const u = s ? `${e("cyan", $2)}  ` : "", n = s ? e("cyan", E2) : "", o = this.options.map((c2, a) => W(t.output, r(c2, a === this.cursor ? "active" : "inactive"), u)).join(`
`);
        return `${i}${o}
${n}
`;
      }
    }
  } }).prompt();
};
var jt = `${e("gray", $2)}  `;
var K2 = { message: async (t, { symbol: r = e("gray", $2) } = {}) => {
  process.stdout.write(`${e("gray", $2)}
${r}  `);
  let s = 3;
  for await (let i of t) {
    i = i.replace(/\n/g, `
${jt}`), i.includes(`
`) && (s = 3 + nt2(i.slice(i.lastIndexOf(`
`))).length);
    const u = nt2(i).length;
    s + u < process.stdout.columns ? (s += u, process.stdout.write(i)) : (process.stdout.write(`
${jt}${i.trimStart()}`), s = 3 + nt2(i.trimStart()).length);
  }
  process.stdout.write(`
`);
}, info: (t) => K2.message(t, { symbol: e("blue", ht2) }), success: (t) => K2.message(t, { symbol: e("green", pt) }), step: (t) => K2.message(t, { symbol: e("green", F2) }), warn: (t) => K2.message(t, { symbol: e("yellow", mt) }), warning: (t) => K2.warn(t), error: (t) => K2.message(t, { symbol: e("red", gt) }) };
var xe = async (t, r) => {
  for (const s of t) {
    if (s.enabled === false) continue;
    const i = ft(r);
    i.start(s.title);
    const u = await s.task(i.message);
    i.stop(u || s.title);
  }
};
var Oe = (t) => t.replace(/\x1b\[(?:\d+;)*\d*[ABCDEFGHfJKSTsu]|\x1b\[(s|u)/g, "");
var Me = (t) => {
  const r = t.output ?? process.stdout, s = A(r), i = e("gray", $2), u = t.spacing ?? 1, n = 3, o = t.retainLog === true, c2 = !at2() && Tt(r);
  r.write(`${i}
`), r.write(`${e("green", F2)}  ${t.title}
`);
  for (let h2 = 0; h2 < u; h2++) r.write(`${i}
`);
  const a = [{ value: "", full: "" }];
  let l = false;
  const d2 = (h2) => {
    if (a.length === 0) return;
    let f = 0;
    h2 && (f += u + 2);
    for (const v2 of a) {
      const { value: T, result: C2 } = v2;
      let b2 = C2?.message ?? T;
      if (b2.length === 0) continue;
      C2 === void 0 && v2.header !== void 0 && v2.header !== "" && (b2 += `
${v2.header}`);
      const G2 = b2.split(`
`).reduce((x2, A2) => A2 === "" ? x2 + 1 : x2 + Math.ceil((A2.length + n) / s), 0);
      f += G2;
    }
    f > 0 && (f += 1, r.write(import_sisteransi2.erase.lines(f)));
  }, y = (h2, f, v2) => {
    const T = v2 ? `${h2.full}
${h2.value}` : h2.value;
    h2.header !== void 0 && h2.header !== "" && R2.message(h2.header.split(`
`).map((C2) => e("bold", C2)), { output: r, secondarySymbol: i, symbol: i, spacing: 0 }), R2.message(T.split(`
`).map((C2) => e("dim", C2)), { output: r, secondarySymbol: i, symbol: i, spacing: f ?? u });
  }, p2 = () => {
    for (const h2 of a) {
      const { header: f, value: v2, full: T } = h2;
      (f === void 0 || f.length === 0) && v2.length === 0 || y(h2, void 0, o === true && T.length > 0);
    }
  }, m = (h2, f, v2) => {
    if (d2(false), (v2?.raw !== true || !l) && h2.value !== "" && (h2.value += `
`), h2.value += Oe(f), l = v2?.raw === true, t.limit !== void 0) {
      const T = h2.value.split(`
`), C2 = T.length - t.limit;
      if (C2 > 0) {
        const b2 = T.splice(0, C2);
        o && (h2.full += (h2.full === "" ? "" : `
`) + b2.join(`
`));
      }
      h2.value = T.join(`
`);
    }
    c2 && g();
  }, g = () => {
    for (const h2 of a) h2.result ? h2.result.status === "error" ? R2.error(h2.result.message, { output: r, secondarySymbol: i, spacing: 0 }) : R2.success(h2.result.message, { output: r, secondarySymbol: i, spacing: 0 }) : h2.value !== "" && y(h2, 0);
  }, S2 = (h2, f) => {
    d2(false), h2.result = f, c2 && g();
  };
  return { message(h2, f) {
    m(a[0], h2, f);
  }, group(h2) {
    const f = { header: h2, value: "", full: "" };
    return a.push(f), { message(v2, T) {
      m(f, v2, T);
    }, error(v2) {
      S2(f, { status: "error", message: v2 });
    }, success(v2) {
      S2(f, { status: "success", message: v2 });
    } };
  }, error(h2, f) {
    d2(true), R2.error(h2, { output: r, secondarySymbol: i, spacing: 1 }), f?.showLog !== false && p2(), a.splice(1, a.length - 1), a[0].value = "", a[0].full = "";
  }, success(h2, f) {
    d2(true), R2.success(h2, { output: r, secondarySymbol: i, spacing: 1 }), f?.showLog === true && p2(), a.splice(1, a.length - 1), a[0].value = "", a[0].full = "";
  } };
};
var Re = (t) => new ht({ validate: t.validate, placeholder: t.placeholder, defaultValue: t.defaultValue, initialValue: t.initialValue, output: t.output, signal: t.signal, input: t.input, render() {
  const r = t?.withGuide ?? h.withGuide, s = `${`${r ? `${e("gray", $2)}
` : ""}${M(this.state)}  `}${t.message}
`, i = t.placeholder ? e("inverse", t.placeholder[0]) + e("dim", t.placeholder.slice(1)) : e(["inverse", "hidden"], "_"), u = this.userInput ? this.userInputWithCursor : i, n = this.value ?? "";
  switch (this.state) {
    case "error": {
      const o = this.error ? `  ${e("yellow", this.error)}` : "", c2 = r ? `${e("yellow", $2)}  ` : "", a = r ? e("yellow", E2) : "";
      return `${s.trim()}
${c2}${u}
${a}${o}
`;
    }
    case "submit": {
      const o = n ? `  ${e("dim", n)}` : "", c2 = r ? e("gray", $2) : "";
      return `${s}${c2}${o}`;
    }
    case "cancel": {
      const o = n ? `  ${e(["strikethrough", "dim"], n)}` : "", c2 = r ? e("gray", $2) : "";
      return `${s}${c2}${o}${n.trim() ? `
${c2}` : ""}`;
    }
    default: {
      const o = r ? `${e("cyan", $2)}  ` : "", c2 = r ? e("cyan", E2) : "";
      return `${s}${o}${u}
${c2}
`;
    }
  }
} }).prompt();

export {
  h,
  j,
  q,
  tt2 as tt,
  at2 as at,
  Tt,
  w2 as w,
  _t,
  ot2 as ot,
  ut2 as ut,
  F2 as F,
  lt,
  $2 as $,
  E2 as E,
  It,
  Et,
  z2 as z,
  H2 as H,
  et2 as et,
  U2 as U,
  J2 as J,
  Gt,
  st2 as st,
  ct,
  xt,
  $t,
  dt,
  Ot,
  ht2 as ht,
  pt,
  mt,
  gt,
  M,
  yt,
  Y2 as Y,
  At,
  ie,
  oe,
  ue,
  le,
  he,
  pe,
  R2 as R,
  me,
  ge,
  ye,
  fe,
  ve,
  Se,
  Ce,
  Te,
  ft,
  Ie,
  Ee,
  Ge,
  K2 as K,
  xe,
  Me,
  Re
};
