import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import "./chunk-M2WBOQ2Q.js";

// src/whisper/normalize.ts
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { extname, join } from "path";
function detectFormat(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext === ".srt") return "srt";
  if (ext === ".vtt") return "vtt";
  if (ext === ".json") return detectJsonFormat(JSON.parse(readFileSync(filePath, "utf-8")));
  throw new Error(`Unsupported transcript file extension: ${ext}. Use .json, .srt, or .vtt`);
}
function detectJsonFormat(raw) {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw;
    if (obj.transcription && Array.isArray(obj.transcription)) return "whisper-cpp";
    if (obj.words && Array.isArray(obj.words)) return "openai";
  }
  if (Array.isArray(raw) && raw.slice(0, 1).every((w) => w?.text !== void 0 && w?.start !== void 0)) {
    return "words-json";
  }
  throw new Error(
    "Unrecognized JSON transcript format. Expected whisper.cpp (transcription[].tokens), OpenAI API (words[]), or normalized ([{text, start, end}])."
  );
}
function mergeFragments(words) {
  for (let i = 0; i < words.length - 1; i++) {
    const curr = words[i];
    const next = words[i + 1];
    if (!curr || !next) continue;
    const isSingleLetterFragment = curr.text.length === 1 && /^[A-Z]$/.test(curr.text) && !/^[IAO]$/.test(curr.text) && /^[a-z]/.test(next.text);
    const shouldMerge = isSingleLetterFragment || /[a-z]$/.test(curr.text) && /^in'$/i.test(next.text);
    if (shouldMerge) {
      curr.text += next.text;
      curr.end = next.end;
      words.splice(i + 1, 1);
      i--;
    }
  }
}
function interpolateZeroDuration(words) {
  for (let i = 0; i < words.length; i++) {
    const wi = words[i];
    if (!wi || wi.start < wi.end) continue;
    let j = i;
    while (j < words.length) {
      const wj = words[j];
      if (!wj || wj.start < wj.end) break;
      j++;
    }
    const clusterLen = j - i;
    const prev = i > 0 ? words[i - 1] : void 0;
    const prevEnd = prev ? prev.end : wi.start;
    const nextWord = j < words.length ? words[j] : void 0;
    const nextStart = nextWord ? nextWord.start : prevEnd + clusterLen * 0.3;
    const span = nextStart - prevEnd;
    const perWord = span / clusterLen;
    for (let k = i; k < j; k++) {
      const wk = words[k];
      if (!wk) continue;
      wk.start = round3(prevEnd + (k - i) * perWord);
      wk.end = round3(prevEnd + (k - i + 1) * perWord);
    }
    i = j - 1;
  }
}
function parseWhisperCpp(data) {
  const words = [];
  const transcription = data.transcription;
  for (const seg of transcription ?? []) {
    for (const token of seg.tokens ?? []) {
      const rawText = token.text ?? "";
      const text = rawText.trim();
      if (!text || text.startsWith("[_") || text.startsWith("[BLANK")) continue;
      const lastWord = words[words.length - 1];
      const shouldMerge = lastWord && (!rawText.startsWith(" ") || /^[.,!?;:'")\]}>…–—¡¿-]+$/.test(text) || /^'(t|m|s|ve|re|ll|d)$/i.test(text));
      if (shouldMerge) {
        lastWord.text += text;
        lastWord.end = round3((token.offsets?.to ?? 0) / 1e3);
        continue;
      }
      words.push({
        text,
        start: round3((token.offsets?.from ?? 0) / 1e3),
        end: round3((token.offsets?.to ?? 0) / 1e3)
      });
    }
  }
  mergeFragments(words);
  interpolateZeroDuration(words);
  return words;
}
function parseOpenAI(data) {
  const words = data.words ?? [];
  return words.map((w) => ({
    text: (w.word ?? w.text ?? "").trim(),
    start: round3(w.start ?? 0),
    end: round3(w.end ?? 0)
  })).filter((w) => w.text.length > 0);
}
function parseSrt(content) {
  const blocks = content.trim().split(/\n\n+/);
  const words = [];
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;
    const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
    if (!startStr || !endStr) continue;
    const text = lines.slice(lines.indexOf(timeLine) + 1).join(" ").replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    words.push({
      text,
      start: parseSrtTimestamp(startStr),
      end: parseSrtTimestamp(endStr)
    });
  }
  return words;
}
function parseVtt(content) {
  const body = content.replace(/^WEBVTT[^\n]*\n/, "").replace(/^[A-Z-]+:.*\n/gm, "");
  const blocks = body.trim().split(/\n\n+/);
  const words = [];
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const timeLine = lines.find((l) => l.includes("-->"));
    if (!timeLine) continue;
    const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
    if (!startStr || !endStr) continue;
    const text = lines.slice(lines.indexOf(timeLine) + 1).join(" ").replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    words.push({
      text,
      start: parseVttTimestamp(startStr),
      end: parseVttTimestamp(endStr)
    });
  }
  return words;
}
function parseSrtTimestamp(ts) {
  const m = ts.match(/(\d+):(\d+):(\d+)[,.](\d+)/);
  if (!m) return 0;
  return parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseInt(m[3], 10) + parseInt(m[4].padEnd(3, "0"), 10) / 1e3;
}
function parseVttTimestamp(ts) {
  const parts = ts.split(":");
  if (parts.length === 3) return parseSrtTimestamp(ts);
  if (parts.length === 2) {
    const [min, secMs] = parts;
    const [sec, ms] = (secMs ?? "0.0").split(".");
    return parseInt(min, 10) * 60 + parseInt(sec, 10) + parseInt((ms ?? "0").padEnd(3, "0"), 10) / 1e3;
  }
  return 0;
}
function formatSrtTimestamp(seconds) {
  const { hours, minutes, wholeSeconds, milliseconds } = timestampParts(seconds);
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(wholeSeconds)},${pad3(milliseconds)}`;
}
function formatVttTimestamp(seconds) {
  const { hours, minutes, wholeSeconds, milliseconds } = timestampParts(seconds);
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(wholeSeconds)}.${pad3(milliseconds)}`;
}
function round3(n) {
  return Math.round(n * 1e3) / 1e3;
}
function timestampParts(seconds) {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;
  const totalMs = Math.max(0, Math.round(safeSeconds * 1e3));
  const milliseconds = totalMs % 1e3;
  const totalSeconds = (totalMs - milliseconds) / 1e3;
  const wholeSeconds = totalSeconds % 60;
  const totalMinutes = (totalSeconds - wholeSeconds) / 60;
  const minutes = totalMinutes % 60;
  const hours = (totalMinutes - minutes) / 60;
  return { hours, minutes, wholeSeconds, milliseconds };
}
function pad2(n) {
  return n.toString().padStart(2, "0");
}
function pad3(n) {
  return n.toString().padStart(3, "0");
}
function endsSentence(text) {
  return /[.!?][)"'\]}]*$/.test(text);
}
function pushCue(cues, cue) {
  if (!cue) return;
  const text = cue.text.trim();
  if (!text) return;
  cues.push({ text, start: round3(cue.start), end: round3(cue.end) });
}
function breaksCue(current, word, text, maxChars, maxGap) {
  const nextLength = current.text.length + 1 + text.length;
  const gap = word.start - current.end;
  return nextLength > maxChars || gap > maxGap;
}
function entriesToCues(words) {
  const cues = [];
  for (const word of words) {
    pushCue(cues, { text: word.text, start: word.start, end: word.end });
  }
  return cues;
}
var CJK_CHAR = /[　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/;
var SPACELESS_SCRIPT_CHAR = /[฀-๿຀-໿က-႟ក-៿　-〿぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯]/;
var SPACELESS_PHRASE_MIN_CHARS = 4;
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length === 0) return 0;
  if (sorted.length % 2 === 1) return sorted[mid] ?? 0;
  return ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
}
function inferPreGrouped(words) {
  if (words.some((w) => /\s/.test(w.text.trim()))) return true;
  const spaceless = words.filter((w) => SPACELESS_SCRIPT_CHAR.test(w.text));
  if (spaceless.length === 0) return false;
  return median(spaceless.map((w) => w.text.trim().length)) >= SPACELESS_PHRASE_MIN_CHARS;
}
function joinTokens(left, right) {
  const a = left.at(-1) ?? "";
  const b = right[0] ?? "";
  const sep = CJK_CHAR.test(a) || CJK_CHAR.test(b) ? "" : " ";
  return `${left}${sep}${right}`;
}
function wordsToCues(words, opts = {}) {
  const preGrouped = opts.preGrouped ?? inferPreGrouped(words);
  if (preGrouped) return entriesToCues(words);
  const maxChars = opts.maxChars ?? 42;
  const maxGap = opts.maxGap ?? 0.8;
  const cues = [];
  let current;
  const flush = () => {
    pushCue(cues, current);
    current = void 0;
  };
  for (const word of words) {
    const text = word.text.trim();
    if (!text) continue;
    if (current && !breaksCue(current, word, text, maxChars, maxGap)) {
      current.text = joinTokens(current.text, text);
      current.end = word.end;
    } else {
      flush();
      current = { text, start: word.start, end: word.end };
    }
    if (endsSentence(text)) flush();
  }
  flush();
  return cues;
}
function formatSrt(words, opts) {
  const cues = wordsToCues(words, opts);
  if (cues.length === 0) return "";
  return cues.map(
    (cue, i) => `${i + 1}
${formatSrtTimestamp(cue.start)} --> ${formatSrtTimestamp(cue.end)}
${cue.text}`
  ).join("\n\n") + "\n";
}
function formatVtt(words, opts) {
  const cues = wordsToCues(words, opts);
  if (cues.length === 0) return "WEBVTT\n\n";
  return "WEBVTT\n\n" + cues.map(
    (cue) => `${formatVttTimestamp(cue.start)} --> ${formatVttTimestamp(cue.end)}
${cue.text}`
  ).join("\n\n") + "\n";
}
function loadTranscript(filePath) {
  const ext = extname(filePath).toLowerCase();
  const content = readFileSync(filePath, "utf-8");
  if (ext === ".srt") {
    const words2 = parseSrt(content).map((w, i) => ({ ...w, id: w.id ?? `w${i}` }));
    return { words: words2, format: "srt" };
  }
  if (ext === ".vtt") {
    const words2 = parseVtt(content).map((w, i) => ({ ...w, id: w.id ?? `w${i}` }));
    return { words: words2, format: "vtt" };
  }
  const parsed = JSON.parse(content);
  const format = detectJsonFormat(parsed);
  const words = (format === "whisper-cpp" ? parseWhisperCpp(parsed) : format === "openai" ? parseOpenAI(parsed) : parsed.map((w) => ({
    id: w.id,
    text: w.text.trim(),
    start: round3(w.start),
    end: round3(w.end)
  }))).map((w, i) => ({ ...w, id: w.id || `w${i}` }));
  return { words, format };
}
function patchCaptionHtml(dir, words) {
  if (words.length === 0) return;
  const wordsJson = JSON.stringify(words, null, 2).replace(/\n/g, "\n          ");
  let htmlFiles;
  try {
    htmlFiles = readdirSync(dir, { withFileTypes: true, recursive: true }).filter((e) => e.isFile() && e.name.endsWith(".html")).map((e) => join(e.parentPath, e.name));
  } catch {
    return;
  }
  for (const file of htmlFiles) {
    let content = readFileSync(file, "utf-8");
    const scriptBlocks = content.match(/<script>[\s\S]*?<\/script>/g) ?? [];
    let scriptMatch = null;
    let transcriptMatch = null;
    for (const block of scriptBlocks) {
      scriptMatch = scriptMatch ?? block.match(/const script = \[[\s\S]*?\];/);
      transcriptMatch = transcriptMatch ?? block.match(/const TRANSCRIPT = \[[\s\S]*?\];/);
    }
    const match = scriptMatch ?? transcriptMatch;
    if (match) {
      const varName = scriptMatch ? "script" : "TRANSCRIPT";
      content = content.replace(match[0], `const ${varName} = ${wordsJson};`);
      writeFileSync(file, content, "utf-8");
    }
  }
}
export {
  detectFormat,
  formatSrt,
  formatVtt,
  loadTranscript,
  patchCaptionHtml,
  wordsToCues
};
