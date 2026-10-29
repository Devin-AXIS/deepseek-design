import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  MAX_AUDIO_GAIN_DB,
  formatAudioGain,
  isAudibleVideoElement
} from "./chunk-KKH3A7YS.js";
import {
  findFfBinary
} from "./chunk-PJ3HDUCY.js";

// ../studio-server/src/helpers/loudness.ts
import { execFile } from "child_process";
import { isAbsolute, relative, resolve } from "path";
import { promisify } from "util";
var execFileAsync = promisify(execFile);
var FFMPEG_TIMEOUT_MS = 12e4;
function authoredNumber(raw, fallback, attribute, id, strictlyPositive = false) {
  if (raw === void 0) return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || (strictlyPositive ? value <= 0 : value < 0)) {
    throw new Error(`Audio #${id} has an invalid ${attribute}: ${raw}`);
  }
  return value;
}
function attributeFromMatch(match, absoluteOffset) {
  if (match.index === void 0) return null;
  const name = match[1]?.toLowerCase();
  const value = matchedAttributeValue(match);
  if (!name || value === void 0) return null;
  const whole = match[0];
  const localValueStart = attributeValueStart(whole);
  const valueStart = absoluteOffset + match.index + localValueStart;
  return [name, { value, valueStart, valueEnd: valueStart + value.length }];
}
function matchedAttributeValue(match) {
  return match[2] ?? match[3] ?? match[4];
}
function attributeValueStart(attribute) {
  let cursor = attribute.indexOf("=") + 1;
  while (/\s/.test(attribute[cursor] ?? "")) cursor += 1;
  const quote = attribute[cursor];
  return quote === '"' || quote === "'" ? cursor + 1 : cursor;
}
function attributesInTag(html, from, to) {
  const tag = html.slice(from, to);
  const nameEnd = tag.search(/\s|\/?\s*>/);
  const attributes = /* @__PURE__ */ new Map();
  if (nameEnd < 0) return attributes;
  const pattern = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  for (const match of tag.slice(nameEnd).matchAll(pattern)) {
    const attribute = attributeFromMatch(match, from + nameEnd);
    if (attribute) attributes.set(...attribute);
  }
  return attributes;
}
function startTagEnd(html, start) {
  let quote = "";
  let end = start + 1;
  for (; end < html.length; end += 1) {
    const char = html[end];
    if (quote) {
      if (char === quote) quote = "";
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === ">") {
      return end + 1;
    }
  }
  throw new Error("Unterminated HTML start tag");
}
function commentEnd(html, start) {
  const end = html.indexOf("-->", start + 4);
  if (end < 0) throw new Error("Unterminated HTML comment");
  return end + 3;
}
var isSpaceAt = (html, index) => /\s/.test(html.charAt(index));
var isWordAt = (html, index) => /\w/.test(html.charAt(index));
function skipSpaces(html, index) {
  let cursor = index;
  while (cursor < html.length && isSpaceAt(html, cursor)) cursor++;
  return cursor;
}
function parsedStartTag(html, start) {
  let cursor = skipSpaces(html, start + 1);
  const closing = html.charAt(cursor) === "/";
  if (closing) cursor = skipSpaces(html, cursor + 1);
  const nameStart = cursor;
  if (!/[a-z]/i.test(html.charAt(cursor))) return null;
  while (/[a-z\d:-]/i.test(html.charAt(cursor + 1))) cursor++;
  let nameEnd = cursor + 1;
  while (nameEnd > nameStart && isWordAt(html, nameEnd - 1) === isWordAt(html, nameEnd)) nameEnd--;
  if (nameEnd === nameStart) return null;
  return {
    start,
    end: startTagEnd(html, start),
    closing,
    name: html.slice(nameStart, nameEnd).toLowerCase()
  };
}
function rawTextElementEnd(html, lower, tag) {
  if (tag.closing || tag.name !== "script" && tag.name !== "style") return null;
  const closeStart = lower.indexOf(`</${tag.name}`, tag.end);
  if (closeStart < 0) throw new Error(`Unterminated <${tag.name}> element`);
  return startTagEnd(html, closeStart);
}
function scanMarkup(html, lower, start) {
  if (html.startsWith("<!--", start)) {
    return { cursor: commentEnd(html, start), mediaRange: null };
  }
  const tag = parsedStartTag(html, start);
  if (!tag) {
    const marker = html[start + 1];
    const cursor = marker === "!" || marker === "?" ? startTagEnd(html, start) : start + 1;
    return { cursor, mediaRange: null };
  }
  const rawTextEnd = rawTextElementEnd(html, lower, tag);
  if (rawTextEnd !== null) return { cursor: rawTextEnd, mediaRange: null };
  return { cursor: tag.end, mediaRange: mediaRangeOf(tag) };
}
function mediaRangeOf(tag) {
  if (tag.closing) return null;
  if (tag.name === "audio" || tag.name === "video") {
    return { start: tag.start, end: tag.end, name: tag.name };
  }
  return null;
}
function mediaTagRanges(html) {
  const lower = html.toLowerCase();
  const ranges = [];
  let cursor = 0;
  while (cursor < html.length) {
    const start = html.indexOf("<", cursor);
    if (start < 0) break;
    const scanned = scanMarkup(html, lower, start);
    if (scanned.mediaRange) ranges.push(scanned.mediaRange);
    cursor = scanned.cursor;
  }
  return ranges;
}
function trimmedAttribute(attributes, name) {
  return attributes.get(name)?.value.trim() ?? "";
}
function authoredDuration(attributes, id) {
  const raw = attributes.get("data-duration")?.value;
  if (raw !== void 0) return authoredNumber(raw, 0, "data-duration", id, true);
  const rawEnd = attributes.get("data-end")?.value;
  if (rawEnd === void 0) return null;
  const end = authoredNumber(rawEnd, 0, "data-end", id, true);
  const start = authoredNumber(attributes.get("data-start")?.value, 0, "data-start", id);
  return end > start ? end - start : null;
}
function requiredAudioIdentity(attributes) {
  const id = trimmedAttribute(attributes, "id");
  const src = trimmedAttribute(attributes, "src");
  if (!id) throw new Error("Every normalized <audio> element needs an id");
  if (!src) throw new Error(`Audio #${id} has no src`);
  return { id, src };
}
function hasBareAttribute(html, range, name) {
  const unquoted = html.slice(range.start, range.end).replace(/"[^"]*"|'[^']*'/g, '""');
  return new RegExp(`\\s${name}(?=[\\s/>=])`, "i").test(unquoted);
}
function isAudibleVideoTag(html, range, attributes) {
  return isAudibleVideoElement({
    tagName: "video",
    hasAttribute: (name) => attributes.has(name) || hasBareAttribute(html, range, name),
    getAttribute: (name) => attributes.get(name)?.value ?? null
  });
}
function inScopeVideo(html, range, attributes) {
  return isAudibleVideoTag(html, range, attributes) && trimmedAttribute(attributes, "id") !== "" && trimmedAttribute(attributes, "src") !== "";
}
function mediaTagFromRange(html, range) {
  const attributes = attributesInTag(html, range.start, range.end);
  if (range.name === "video" && !inScopeVideo(html, range, attributes)) return null;
  const { id, src } = requiredAudioIdentity(attributes);
  const volumeAttribute = attributes.get("data-volume") ?? null;
  return {
    tag: range.name,
    id,
    src,
    volume: authoredNumber(volumeAttribute?.value, 1, "data-volume", id),
    mediaStart: authoredNumber(
      attributes.get("data-media-start")?.value,
      0,
      "data-media-start",
      id
    ),
    duration: authoredDuration(attributes, id),
    playbackRate: authoredNumber(
      attributes.get("data-playback-rate")?.value,
      1,
      "data-playback-rate",
      id,
      true
    ),
    start: range.start,
    end: range.end,
    volumeAttribute
  };
}
function audioTags(html) {
  const seen = /* @__PURE__ */ new Set();
  const tags = [];
  for (const range of mediaTagRanges(html)) {
    const tag = mediaTagFromRange(html, range);
    if (!tag) continue;
    if (seen.has(tag.id)) throw new Error(`Duplicate audio id "${tag.id}"`);
    seen.add(tag.id);
    tags.push(tag);
  }
  return tags;
}
function resolveLocalAudioPath(projectDir, src) {
  const withoutSuffix = src.split(/[?#]/, 1)[0] ?? "";
  let decoded = "";
  try {
    decoded = decodeURIComponent(withoutSuffix);
  } catch {
    throw new Error(`Audio source must be a local project file: ${src}`);
  }
  if (!decoded || isAbsolute(decoded) || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(decoded)) {
    throw new Error(`Audio source must be a local project file: ${src}`);
  }
  const root = resolve(projectDir);
  const file = resolve(root, decoded);
  const rel = relative(root, file);
  if (!rel || rel === ".." || rel.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)) {
    throw new Error(`Audio source must be a local project file: ${src}`);
  }
  return file;
}
function parseEbur128Summary(stderr) {
  const summaryAt = stderr.lastIndexOf("Summary:");
  const summary = summaryAt >= 0 ? stderr.slice(summaryAt) : "";
  const integrated = summary.match(/\bI:\s*(-?\d+(?:\.\d+)?)\s+LUFS\b/);
  const peak = summary.match(/\bPeak:\s*(-?\d+(?:\.\d+)?)\s+dBFS\b/);
  const integratedLufs = Number(integrated?.[1]);
  const truePeakDbfs = Number(peak?.[1]);
  if (!Number.isFinite(integratedLufs)) {
    throw new Error("FFmpeg did not report integrated loudness for this audio stream");
  }
  if (!Number.isFinite(truePeakDbfs)) {
    throw new Error("FFmpeg did not report true peak for this audio stream");
  }
  return { integratedLufs, truePeakDbfs };
}
function gainDb(volume) {
  return volume > 0 ? 20 * Math.log10(volume) : Number.NEGATIVE_INFINITY;
}
function audioNormalizationPlan(referenceTrack, targetTrack) {
  if (!(referenceTrack.volume > 0) || !(targetTrack.volume > 0)) {
    throw new Error("Muted audio cannot be used for loudness matching");
  }
  const referenceLufs = referenceTrack.integratedLufs + gainDb(referenceTrack.volume);
  const targetLufs = targetTrack.integratedLufs + gainDb(targetTrack.volume);
  const wantedGainDb = referenceLufs - targetTrack.integratedLufs;
  if (wantedGainDb > MAX_AUDIO_GAIN_DB + 1e-9) {
    throw new Error(
      `Matching #${targetTrack.id} needs ${wantedGainDb.toFixed(1)} dB, beyond the +${MAX_AUDIO_GAIN_DB} dB authoring ceiling. A gap this large belongs in the source file, not the mixer \u2014 mixer gain raises the noise floor with the signal. Normalize ${targetTrack.id}'s asset offline (e.g. ffmpeg loudnorm), or lower #${referenceTrack.id} instead.`
    );
  }
  const volume = 10 ** (wantedGainDb / 20);
  const projectedTruePeakDbfs = targetTrack.truePeakDbfs + wantedGainDb;
  if (projectedTruePeakDbfs > 0) {
    throw new Error(
      `Matching #${targetTrack.id} would clip at +${projectedTruePeakDbfs.toFixed(1)} dBFS; limit or preprocess the source first`
    );
  }
  return {
    referenceId: referenceTrack.id,
    targetId: targetTrack.id,
    referenceLufs,
    targetLufs,
    previousVolume: targetTrack.volume,
    volume,
    gainDb: wantedGainDb,
    changeDb: wantedGainDb - gainDb(targetTrack.volume),
    projectedLufs: targetTrack.integratedLufs + wantedGainDb,
    projectedTruePeakDbfs
  };
}
function updateAudioVolume(html, id, volume) {
  const tag = audioTags(html).find((candidate) => candidate.id === id);
  if (!tag) throw new Error(`Audio #${id} was not found`);
  const value = formatAudioGain(volume);
  if (tag.volumeAttribute) {
    return html.slice(0, tag.volumeAttribute.valueStart) + value + html.slice(tag.volumeAttribute.valueEnd);
  }
  let insertion = tag.end - 1;
  let tail = insertion - 1;
  while (tail >= tag.start && /\s/.test(html[tail] ?? "")) tail -= 1;
  if (html[tail] === "/") {
    insertion = tail;
    while (insertion > tag.start && /\s/.test(html[insertion - 1] ?? "")) insertion -= 1;
  } else {
    while (insertion > tag.start && /\s/.test(html[insertion - 1] ?? "")) insertion -= 1;
  }
  return html.slice(0, insertion) + ` data-volume="${value}"` + html.slice(insertion);
}
function loudnessMeasureArgs(file, tag) {
  const args = ["-hide_banner", "-nostats"];
  if (tag.mediaStart > 0) args.push("-ss", String(tag.mediaStart));
  const sourceSpan = tag.duration === null ? null : tag.duration * (tag.playbackRate ?? 1);
  if (sourceSpan !== null && sourceSpan > 0) args.push("-t", String(sourceSpan));
  args.push("-i", file, "-map", "0:a:0", "-vn", "-af", "ebur128=peak=true", "-f", "null", "-");
  return args;
}
async function measureAudio(ffmpegPath, file, tag) {
  const result = await execFileAsync(ffmpegPath, loudnessMeasureArgs(file, tag), {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
    timeout: FFMPEG_TIMEOUT_MS,
    windowsHide: true
  });
  return parseEbur128Summary(result.stderr);
}
function requiredFfmpeg() {
  const ffmpegPath = findFfBinary("ffmpeg", { configuredMustExist: true });
  if (!ffmpegPath) throw new Error("FFmpeg is required to measure integrated loudness");
  return ffmpegPath;
}
var DEFAULT_TARGET_LUFS = -16;
var NORMALIZE_TRUE_PEAK_CEILING_DBFS = -1.5;
var SILENCE_LUFS = -70;
function absoluteLoudnessPlan(track, targetLufs = DEFAULT_TARGET_LUFS) {
  if (track.integratedLufs <= SILENCE_LUFS) {
    throw new Error(`#${track.id} is silent in the played window; there is nothing to normalize`);
  }
  const wantedGainDb = targetLufs - track.integratedLufs;
  const peakRoomDb = NORMALIZE_TRUE_PEAK_CEILING_DBFS - track.truePeakDbfs;
  const limits = [
    [null, wantedGainDb],
    ["gain-ceiling", MAX_AUDIO_GAIN_DB],
    ["true-peak", peakRoomDb]
  ];
  const [limitedBy, appliedGainDb] = limits.reduce(
    (lowest, candidate) => candidate[1] < lowest[1] - 1e-9 ? candidate : lowest
  );
  const previousGainDb = track.volume > 0 ? gainDb(track.volume) : 0;
  return {
    targetId: track.id,
    targetLufs,
    sourceLufs: track.integratedLufs,
    previousVolume: track.volume,
    volume: 10 ** (appliedGainDb / 20),
    gainDb: appliedGainDb,
    changeDb: appliedGainDb - previousGainDb,
    projectedLufs: track.integratedLufs + appliedGainDb,
    projectedTruePeakDbfs: track.truePeakDbfs + appliedGainDb,
    limitedBy
  };
}

export {
  audioTags,
  resolveLocalAudioPath,
  parseEbur128Summary,
  audioNormalizationPlan,
  updateAudioVolume,
  loudnessMeasureArgs,
  measureAudio,
  requiredFfmpeg,
  DEFAULT_TARGET_LUFS,
  absoluteLoudnessPlan
};
