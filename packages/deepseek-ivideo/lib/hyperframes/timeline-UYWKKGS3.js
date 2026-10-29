import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  readCompositionFps
} from "./chunk-P6P3EIWV.js";
import {
  ensureDOMParser
} from "./chunk-PFCFR3KZ.js";
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  applyFileMutations,
  byStart,
  duplicateElementInHtml,
  isInsideSpan,
  sameInstant,
  spansShareTime
} from "./chunk-BZIGYBUM.js";
import {
  findSyncPartner,
  patchElementInHtml,
  readLinkTiming,
  removeElementFromHtml,
  splitElementInHtml,
  syncOffsetFrames
} from "./chunk-R2DYALSM.js";
import {
  fileContentVersion
} from "./chunk-7QNZFNEX.js";
import "./chunk-FWHMCXES.js";
import "./chunk-PVPXIJ5Z.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-6LTRBXKR.js";
import "./chunk-OLJM7Q7L.js";
import "./chunk-D3TRQ4GS.js";
import "./chunk-UG7OZF2L.js";
import "./chunk-VWG7OQKU.js";
import "./chunk-GQJZORQP.js";
import "./chunk-AMKC3AXA.js";
import {
  defineCommand
} from "./chunk-S3S4TGEH.js";
import "./chunk-54HJ63Q2.js";
import {
  setCommandExitCode
} from "./chunk-PBN6GBJE.js";
import "./chunk-MX7ESQNX.js";
import "./chunk-H6T6FXDE.js";
import "./chunk-TJSTGSAW.js";
import {
  HF_AUDIO_GROUP_ATTR,
  extractAudioMetadata,
  extractMediaMetadata,
  resolveMediaStartSeconds,
  resolveReferencedDuration,
  resolveReferencedStart
} from "./chunk-3NHZZLH3.js";
import {
  HF_AUDIO_AUTOMATION_ATTR,
  HF_AUDIO_FX_ATTR,
  parseAudioFxChain,
  parseAutomation,
  resolveAutomation
} from "./chunk-7QZSGMGW.js";
import {
  ensureHfIds
} from "./chunk-A4KQZXZI.js";
import "./chunk-KKH3A7YS.js";
import "./chunk-MHDMNQIC.js";
import "./chunk-VC76R6W2.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import {
  fpsToNumber,
  parseFpsWithDefault
} from "./chunk-SIG2LUMK.js";
import {
  topLevelElements,
  trackKindOf
} from "./chunk-AR25A7XZ.js";
import "./chunk-DUNOLIES.js";
import "./chunk-TWWSYAKJ.js";
import "./chunk-LPWBWBT2.js";
import "./chunk-CGTUSO6Y.js";
import "./chunk-JFKL3WAE.js";
import "./chunk-ZCT2RZ33.js";
import {
  parseNumeric,
  readMediaOffsetSeconds,
  readPlaybackRate,
  resolveMediaDuration
} from "./chunk-TQFG7HTI.js";
import "./chunk-PMRBLBUP.js";
import "./chunk-GK4AIFIH.js";
import "./chunk-KRDUCZRT.js";
import "./chunk-PJ3HDUCY.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-3GXQPCJC.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/timeline/describeProject.ts
import { readFileSync, realpathSync, statSync } from "fs";
import { basename, dirname, isAbsolute, relative, resolve, sep } from "path";
var TRACK_ORDER = ["video", "graphics", "captions", "audio"];
function toNode(el) {
  const attrs = {};
  for (const { name, value } of Array.from(el.attributes)) attrs[name] = value;
  return { tag: el.tagName, attrs, children: Array.from(el.children).map(toNode), el };
}
function safeChain(raw) {
  try {
    return parseAudioFxChain(raw);
  } catch {
    return void 0;
  }
}
function readLanes(el) {
  const raw = el.getAttribute(HF_AUDIO_AUTOMATION_ATTR);
  if (!raw) return { lanes: [], laneError: null };
  try {
    const fx = el.getAttribute(HF_AUDIO_FX_ATTR);
    const chain = fx ? safeChain(fx) : void 0;
    const lanes = resolveAutomation(parseAutomation(raw), chain).lanes.map((lane) => ({
      target: lane.target,
      points: lane.points.map(({ t, v }) => ({ t, v }))
    }));
    return { lanes, laneError: null };
  } catch (err) {
    return { lanes: [], laneError: err instanceof Error ? err.message : String(err) };
  }
}
var measureWithFfprobe = async (file, tag) => (tag === "audio" ? await extractAudioMetadata(file) : await extractMediaMetadata(file)).durationSeconds;
var MEDIA_TAG = /^(video|audio|img)$/;
var PROBE_CONCURRENCY = 4;
function createProbeGate(max) {
  let active = 0;
  const waiting = [];
  return async function withProbeSlot(fn) {
    if (active >= max) await new Promise((wake) => waiting.push(wake));
    else active += 1;
    try {
      return await fn();
    } finally {
      const next = waiting.shift();
      if (next) next();
      else active -= 1;
    }
  };
}
async function probeSource(scope, el, tag) {
  const src = el.getAttribute("src");
  if (!src) return { ok: false, reason: "no src attribute" };
  if (/^https?:\/\//i.test(src)) return { ok: false, reason: "remote source not probed" };
  const file = realFileInside(scope.projectDir, resolve(scope.dir, src));
  if (!file) return { ok: false, reason: "source file not found" };
  return scope.withProbeSlot(async () => {
    try {
      return { ok: true, seconds: await scope.measure(file, tag) };
    } catch (err) {
      return { ok: false, reason: err instanceof Error ? err.message : String(err) };
    }
  });
}
function resolveContainerDuration(authored, children) {
  if (authored !== null)
    return { duration: authored, durationSource: "authored", pendingReason: null };
  if (children.length === 0) return { duration: 0, durationSource: null, pendingReason: null };
  const inner = children.reduce((max, c) => Math.max(max, c.end), 0);
  return { duration: inner, durationSource: "inner", pendingReason: null };
}
async function resolveMediaRowDuration(scope, el, tag, authored) {
  const getAttr = (name) => el.getAttribute(name);
  const input = {
    tag,
    authoredDurationSeconds: authored,
    mediaStartSeconds: readMediaOffsetSeconds(getAttr),
    playbackRate: readPlaybackRate(getAttr)
  };
  const unprobed = resolveMediaDuration({ ...input, sourceDurationSeconds: null });
  if (unprobed.source !== "pending") {
    return {
      duration: unprobed.seconds ?? 0,
      durationSource: unprobed.source,
      pendingReason: null
    };
  }
  const probe = await probeSource(scope, el, tag);
  const measured = probe.ok && probe.seconds > 0 ? probe.seconds : null;
  const result = resolveMediaDuration({ ...input, sourceDurationSeconds: measured });
  return {
    duration: result.seconds ?? 0,
    durationSource: result.source,
    pendingReason: result.source === "pending" ? pendingReason(probe, result.reason) : null
  };
}
function pendingReason(probe, resolverReason) {
  if (!probe.ok) return probe.reason;
  return probe.seconds > 0 ? resolverReason ?? "source duration unavailable" : "source reports no duration";
}
var roundMs = (v) => Math.round(v * 1e3) / 1e3;
function mainTimelineStart(scope, el, start) {
  const ordinaryStart = () => scope.origin + start;
  if (!/^(video|audio)$/i.test(el.tagName)) return ordinaryStart();
  return resolveMediaStartSeconds({
    authoredStart: parseNumeric(el.getAttribute("data-start")),
    hostStart: scope.origin,
    hasAutoStart: el.hasAttribute("data-hf-auto-start"),
    basis: el.getAttribute("data-hf-media-start-basis"),
    ordinaryStart
  });
}
async function resolveRowTiming(scope, node, depth) {
  const { el } = node;
  const start = resolveReferencedStart(scope.doc, el, scope.startCache, /* @__PURE__ */ new Set());
  const authored = resolveReferencedDuration(scope.doc, el, scope.startCache, /* @__PURE__ */ new Set());
  const host = el.getAttribute("data-composition-src");
  const absStart = mainTimelineStart(scope, el, start);
  const children = host && depth === 0 ? await readSubComposition(host, scope, absStart) : [];
  const kind = el.tagName.toLowerCase();
  const duration = MEDIA_TAG.test(kind) ? await resolveMediaRowDuration(scope, el, kind, authored) : resolveContainerDuration(authored, children);
  return { start, authored, absStart, children, duration };
}
function describeRowFields(scope, node, timing) {
  const { el } = node;
  const kind = el.tagName.toLowerCase();
  const host = el.getAttribute("data-composition-src");
  const rate = parseNumeric(el.getAttribute("data-playback-rate"));
  return {
    id: el.id || el.getAttribute("data-composition-id") || kind,
    label: null,
    kind,
    trackKind: trackKindOf(node).kind,
    start: timing.start,
    duration: timing.duration.duration,
    end: timing.start + timing.duration.duration,
    absStart: roundMs(timing.absStart),
    absEnd: roundMs(timing.absStart + timing.duration.duration),
    file: scope.file,
    trackIndex: parseNumeric(el.getAttribute("data-track-index")) ?? 0,
    src: el.getAttribute("src") ?? host,
    sourceFile: host,
    volume: parseNumeric(el.getAttribute("data-volume")),
    ...readLanes(el),
    playbackRate: rate === 1 ? null : rate,
    audioGroup: el.getAttribute(HF_AUDIO_GROUP_ATTR),
    role: null,
    durationAuthored: timing.authored !== null,
    durationSource: timing.duration.durationSource,
    pendingReason: timing.duration.pendingReason,
    children: timing.children,
    ref: "",
    warnings: [],
    elementId: el.id || null,
    hfId: el.getAttribute("data-hf-id"),
    syncOffsetFrames: syncOffsetOf(el, scope.fps)
  };
}
function syncOffsetOf(el, fps) {
  const partner = findSyncPartner(el);
  return partner ? syncOffsetFrames(readLinkTiming(el), readLinkTiming(partner), fps) : null;
}
async function describeRow(scope, node, depth) {
  return describeRowFields(scope, node, await resolveRowTiming(scope, node, depth));
}
async function readSubComposition(src, parent, origin) {
  const authored = resolve(parent.dir, src);
  const file = realFileInside(parent.projectDir, authored);
  if (!file) return [];
  const relativeFile = relative(parent.projectDir, authored).split(sep).join("/");
  const source = parent.sourceOverrides.get(relativeFile) ?? readFileSync(file, "utf-8");
  const doc = new DOMParser().parseFromString(source, "text/html");
  const template = doc.querySelector("template");
  const root = (template?.content ?? doc).querySelector("[data-composition-id]");
  if (!root) return [];
  const scope = {
    doc,
    dir: dirname(file),
    startCache: /* @__PURE__ */ new Map(),
    projectDir: parent.projectDir,
    origin,
    file: relative(parent.projectDir, authored).split(sep).join("/"),
    withProbeSlot: parent.withProbeSlot,
    measure: parent.measure,
    sourceOverrides: parent.sourceOverrides,
    fps: parent.fps
  };
  const rows = await Promise.all(
    topLevelElements(toNode(root)).map((node) => describeRow(scope, node, 1))
  );
  return rows.sort(byStart);
}
function realFileInside(projectDir, path) {
  try {
    const real = realpathSync(path);
    const inside = relative(realpathSync(projectDir), real);
    if (inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside)) return null;
    return statSync(real).isFile() ? real : null;
  } catch {
    return null;
  }
}
function flatten(top) {
  const entries = [
    ...top.map((clip) => ({ clip, host: null })),
    ...top.flatMap((host) => host.children.map((clip) => ({ clip, host })))
  ];
  const byKind = TRACK_ORDER.map((kind) => ({
    kind,
    entries: entries.filter((e) => e.clip.trackKind === kind).sort((a, b) => a.clip.absStart - b.clip.absStart)
  })).filter((t) => t.entries.length > 0);
  const pointers = new Map(
    byKind.flatMap((t) => t.entries.map((e, index) => [e.clip, { kind: t.kind, index }]))
  );
  const at = (clip) => pointers.get(clip);
  const fileIds = /* @__PURE__ */ new Map();
  for (const { entries: entries2 } of byKind) {
    for (const { clip } of entries2) {
      if (!clip.elementId) continue;
      const ids = fileIds.get(clip.file) ?? /* @__PURE__ */ new Map();
      ids.set(clip.elementId, (ids.get(clip.elementId) ?? 0) + 1);
      fileIds.set(clip.file, ids);
    }
  }
  return byKind.map(({ kind, entries: kindEntries }) => ({
    kind,
    rows: kindEntries.map(({ clip, host }, index) => {
      const uniqueId = clip.elementId && fileIds.get(clip.file)?.get(clip.elementId) === 1;
      const ref = uniqueId ? `#${clip.elementId}` : clip.hfId ? `hf:${clip.hfId}` : `${kind}/${index}`;
      const warnings = uniqueId || clip.hfId ? [] : [
        'row has no stable name; add id="<name>" to the element in this file, then retry with #<name>'
      ];
      return {
        ...clip,
        index,
        ref,
        warnings,
        nested: host !== null,
        host: host && host.id,
        hostRow: host && at(host),
        children: clip.children.map(at)
      };
    })
  }));
}
function projectFps(source) {
  const parsed = parseFpsWithDefault(readCompositionFps(source) ?? void 0);
  return fpsToNumber(parsed.ok ? parsed.value : { num: 30, den: 1 });
}
async function describeProject(indexPath, measure = measureWithFfprobe, sourceOverrides = /* @__PURE__ */ new Map()) {
  const projectDir = dirname(indexPath);
  const source = sourceOverrides.get(basename(indexPath)) ?? readFileSync(indexPath, "utf-8");
  const doc = new DOMParser().parseFromString(source, "text/html");
  const root = doc.querySelector("[data-composition-id]") ?? doc.body;
  const dir = projectDir;
  const scope = {
    doc,
    dir,
    startCache: /* @__PURE__ */ new Map(),
    projectDir: dir,
    origin: 0,
    file: basename(indexPath),
    withProbeSlot: createProbeGate(PROBE_CONCURRENCY),
    measure,
    sourceOverrides,
    fps: projectFps(source)
  };
  const rows = (await Promise.all(topLevelElements(toNode(root)).map((node) => describeRow(scope, node, 0)))).sort(byStart);
  const declared = parseNumeric(root.getAttribute("data-duration"));
  return {
    duration: declared ?? rows.reduce((max, r) => Math.max(max, r.end), 0),
    tracks: flatten(rows)
  };
}

// src/timeline/formatTimeline.ts
var BAR_WIDTH = 40;
var n = (v) => String(Math.round(v * 1e3) / 1e3);
function bar(row, total) {
  if (total <= 0) return " ".repeat(BAR_WIDTH);
  const known = row.durationAuthored || row.duration > 0;
  const from = Math.min(BAR_WIDTH - 1, Math.floor(row.absStart / total * BAR_WIDTH));
  const to = known ? row.absEnd / total * BAR_WIDTH : BAR_WIDTH;
  const width = Math.max(1, Math.min(BAR_WIDTH, Math.ceil(to)) - from);
  const fill = known ? "\u2588" : "\u2591";
  return " ".repeat(from) + fill.repeat(width) + " ".repeat(BAR_WIDTH - from - width);
}
function durationNote(row) {
  switch (row.durationSource) {
    case "media":
    case "default":
      return `duration=${row.durationSource}`;
    case "inner":
      return "duration=inferred";
    case "pending":
      return `pending: ${row.pendingReason}`;
    case "authored":
    case null:
      return false;
  }
}
function syncNote(frames) {
  if (!frames) return false;
  return `out-of-sync=${frames > 0 ? "+" : ""}${frames}f`;
}
function details(row) {
  const lanes = row.lanes.map(
    (l) => `${l.target}[${l.points.map((p) => `${n(p.t)}:${n(p.v)}`).join(" ")}]`
  );
  return [
    row.src && `src=${row.src}`,
    row.volume !== null && `vol=${row.volume}`,
    row.playbackRate !== null && `rate=${n(row.playbackRate)}`,
    row.audioGroup && `group=${row.audioGroup}`,
    syncNote(row.syncOffsetFrames),
    durationNote(row),
    row.sourceFile && !row.children.length && "children=unread",
    row.laneError && `lanes unreadable: ${row.laneError}`,
    ...lanes
  ].filter(Boolean).join(" ");
}
var span = (a, b) => `${n(a)}-${n(b)}s`;
function line(row, total) {
  const times = row.host ? `${span(row.absStart, row.absEnd)} (local ${span(row.start, row.end)}) nested in ${row.host} ${row.file}` : span(row.start, row.end);
  return `  |${bar(row, total)}| ${row.ref} ${row.id} ${times} ${details(row)}`.trimEnd();
}
function header({ kind, rows }) {
  const nested = rows.filter((r) => r.nested).length;
  const split = nested ? `: ${rows.length - nested} top-level, ${nested} nested` : "";
  return `${kind} (${rows.length}${split})`;
}
function formatTimeline(timeline) {
  const out = [`timeline ${n(timeline.duration)}s`];
  for (const track of timeline.tracks) {
    out.push("", header(track));
    for (const row of track.rows) out.push(line(row, timeline.duration));
  }
  return out.join("\n");
}

// src/timeline/a2Commands.ts
import { readFileSync as readFileSync3 } from "fs";
import { join } from "path";

// src/timeline/resolveRef.ts
function targetFor(row) {
  if (row.ref.startsWith("#")) return { id: row.ref.slice(1) };
  if (row.ref.startsWith("hf:")) return { hfId: row.ref.slice(3) };
  return row.id && row.id !== row.kind ? { id: row.id } : null;
}
function resolveRef(timeline, ref) {
  const rows = timeline.tracks.flatMap((track) => track.rows);
  const matches = ref.startsWith("#") ? rows.filter((row2) => row2.ref === ref || row2.id === ref.slice(1)) : ref.startsWith("hf:") ? rows.filter((row2) => row2.ref === ref) : (() => {
    const match = /^(video|graphics|captions|audio)\/(\d+)$/.exec(ref);
    if (!match) return [];
    const row2 = timeline.tracks.find((track) => track.kind === match[1])?.rows.find((candidate) => candidate.index === Number(match[2]));
    return row2 ? [row2] : [];
  })();
  if (matches.length !== 1) {
    return {
      ok: false,
      reason: matches.length === 0 ? `${ref} was not found` : `${ref} matches ${matches.length} rows`,
      fix: 'add id="<name>" to the element in its source file, then retry with #<name>'
    };
  }
  const row = matches[0];
  const target = targetFor(row);
  if (!target) {
    return {
      ok: false,
      reason: `${ref} has no stable element id in ${row.file}`,
      fix: `add id="<name>" to the element in ${row.file}, then retry with #<name>`
    };
  }
  return { ok: true, row, target };
}

// src/timeline/timeExpr.ts
function parseTimeExpression(expression, context) {
  const raw = expression.trim();
  if (raw === "end") return { ok: true, seconds: context.duration };
  const frames = /^(-?\d+(?:\.\d+)?)f$/.exec(raw);
  if (frames) return { ok: true, seconds: Number(frames[1]) / context.fps };
  const absolute = /^\d+(?:\.\d+)?$/.test(raw);
  const relative2 = /^[+-]\d+(?:\.\d+)?$/.test(raw);
  if (absolute) return { ok: true, seconds: Number(raw) };
  if (relative2) return { ok: true, seconds: context.row.start + Number(raw) };
  const anchor = /^(after|before|start-of|end-of):(.+)$/.exec(raw);
  if (!anchor) return { ok: false, reason: `invalid time expression: ${expression}` };
  const row = context.resolveAnchor(anchor[2]);
  if (!row) return { ok: false, reason: `anchor ref not found: ${anchor[2]}` };
  switch (anchor[1]) {
    case "after":
    case "end-of":
      return { ok: true, seconds: row.end };
    case "before":
    case "start-of":
      return { ok: true, seconds: row.start };
  }
  return { ok: false, reason: `invalid time anchor: ${anchor[1]}` };
}

// src/timeline/a2Shared.ts
import { readFileSync as readFileSync2 } from "fs";

// src/timeline/a2Mutations.ts
function parseSetAssignments(values) {
  const assignments = [];
  for (const value of values) {
    const match = /^(volume|rate|track)=(.+)$/.exec(value);
    if (!match) {
      return {
        ok: false,
        reason: `unsupported set assignment ${value}`,
        fix: "use volume=<number>, rate=<number>, or track=<number>"
      };
    }
    const fieldValue = match[1];
    if (!fieldValue) {
      return {
        ok: false,
        reason: `unsupported set assignment ${value}`,
        fix: "use volume=<number>, rate=<number>, or track=<number>"
      };
    }
    const field = parseSetField(fieldValue);
    const number = Number(match[2]);
    if (!Number.isFinite(number) || field === "track" && !Number.isInteger(number)) {
      return {
        ok: false,
        reason: `${field} must be a valid ${field === "track" ? "integer" : "number"}`,
        fix: `pass ${field}=<number>`
      };
    }
    if (field === "rate" && number <= 0) {
      return { ok: false, reason: "rate must be positive", fix: "pass rate=<positive number>" };
    }
    assignments.push({ field, value: String(number) });
  }
  return { ok: true, assignments };
}
function parseSetField(value) {
  switch (value) {
    case "volume":
    case "rate":
    case "track":
      return value;
  }
  throw new Error(`unsupported set field ${value}`);
}

// src/timeline/a2Shared.ts
var allRows = (timeline) => timeline.tracks.flatMap((track) => track.rows);
function refusal(reason, fix, json) {
  setCommandExitCode(2);
  const payload = { ok: false, reason, fix };
  console.error(json ? JSON.stringify(payload, null, 2) : `${reason}; ${fix}.`);
}
var isFileChanged = (error) => error instanceof Error && error.message === "file changed since the timeline was read";
function refuse(kind, detail, json) {
  refusal(`${kind}: ${detail.reason}`, detail.fix, json);
}
function publicReceipt(receipt) {
  return {
    file: receipt.sourceFile,
    version: receipt.version,
    writeToken: receipt.writeToken,
    changed: receipt.changed,
    backupPath: receipt.backupPath
  };
}
function fpsFor(indexPath) {
  const parsed = parseFpsWithDefault(
    readCompositionFps(readFileSync2(indexPath, "utf-8")) ?? void 0
  );
  return fpsToNumber(parsed.ok ? parsed.value : { num: 30, den: 1 });
}
function declaredFps(source) {
  const raw = readCompositionFps(source);
  if (raw === null) return null;
  const parsed = parseFpsWithDefault(raw);
  return parsed.ok ? fpsToNumber(parsed.value) : null;
}
function splitBaseId(row) {
  return row.ref.startsWith("hf:") ? row.ref.slice(3) : row.id;
}
function nextFreeSplitId(source, base) {
  const document = new DOMParser().parseFromString(source, "text/html");
  const existing = new Set(Array.from(document.querySelectorAll("[id]"), (element) => element.id));
  const match = /^(.*)-(\d+)$/.exec(base);
  const prefix = match && existing.has(match[1]) ? match[1] : base;
  let suffix = 2;
  while (existing.has(`${prefix}-${suffix}`)) suffix += 1;
  return `${prefix}-${suffix}`;
}
function parseMutationTime(context, expression, fix) {
  const value = context.parseTime(expression);
  if (!value.ok) return { ok: false, reason: value.reason, fix };
  if (value.seconds < 0 || value.seconds > context.duration) {
    return {
      ok: false,
      reason: `time ${value.seconds} is outside the composition duration`,
      fix: "pass a time between 0 and the composition duration"
    };
  }
  return { ok: true, seconds: value.seconds };
}
function diff(before, after) {
  if (before === after) return "";
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  let prefix = 0;
  while (prefix < beforeLines.length && prefix < afterLines.length && beforeLines[prefix] === afterLines[prefix]) {
    prefix += 1;
  }
  let suffix = 0;
  while (suffix < beforeLines.length - prefix && suffix < afterLines.length - prefix && beforeLines[beforeLines.length - suffix - 1] === afterLines[afterLines.length - suffix - 1]) {
    suffix += 1;
  }
  const changedBefore = beforeLines.slice(prefix, beforeLines.length - suffix);
  const changedAfter = afterLines.slice(prefix, afterLines.length - suffix);
  const lines = [
    "--- before",
    "+++ after",
    ...changedBefore.map((line2) => `-${line2}`),
    ...changedAfter.map((line2) => `+${line2}`)
  ];
  const output = lines.join("\n");
  return output.length <= 8e3 ? output : `${output.slice(0, 7997)}...`;
}
function overlap(row, timeline, start, end) {
  return allRows(timeline).find(
    (candidate) => candidate !== row && candidate.file === row.file && candidate.trackIndex === row.trackIndex && spansShareTime(start, end, candidate.start, candidate.end)
  );
}
function moveMutation(context, args) {
  const expression = typeof args.time === "string" ? args.time : "";
  const time = parseMutationTime(context, expression, "pass a valid time expression");
  if (!time.ok) return time;
  const end = time.seconds + context.row.duration;
  if (end > context.duration) {
    return {
      ok: false,
      reason: `move would end at ${end}, beyond composition duration ${context.duration}`,
      fix: `choose a start at or before the latest valid start ${context.duration - context.row.duration}`
    };
  }
  const patched = patchElementInHtml(context.before, context.resolved.target, [
    { type: "html-attribute", property: "data-start", value: String(time.seconds) }
  ]);
  if (!patched.matched) {
    return { ok: false, reason: `${context.ref} was not found`, fix: "choose an existing clip" };
  }
  return {
    ok: true,
    after: patched.html,
    nextStart: time.seconds,
    nextDuration: context.row.duration
  };
}
function splitMutation(context, args) {
  const expression = typeof args.time === "string" ? args.time : "";
  const time = parseMutationTime(context, expression, "pass a valid time expression");
  if (!time.ok) return time;
  const split = splitElementInHtml(
    context.before,
    context.resolved.target,
    time.seconds,
    nextFreeSplitId(context.before, splitBaseId(context.row)),
    {
      start: context.row.start,
      duration: context.row.duration,
      track: context.row.trackIndex
    }
  );
  if (!split.matched || !split.newId) {
    return {
      ok: false,
      reason: `${context.ref} cannot be split at ${time.seconds}`,
      fix: "choose a time inside the clip"
    };
  }
  return {
    ok: true,
    after: split.html,
    nextStart: context.row.start,
    nextDuration: context.row.duration
  };
}
function trimMutation(context, args) {
  const bounds = trimBounds(context, args);
  if (!bounds.ok) return bounds;
  const patched = patchElementInHtml(context.before, context.resolved.target, [
    { type: "html-attribute", property: "data-start", value: String(bounds.nextStart) },
    { type: "html-attribute", property: "data-duration", value: String(bounds.nextDuration) }
  ]);
  if (!patched.matched) {
    return { ok: false, reason: `${context.ref} was not found`, fix: "choose an existing clip" };
  }
  return {
    ok: true,
    after: patched.html,
    nextStart: bounds.nextStart,
    nextDuration: bounds.nextDuration
  };
}
function trimBounds(context, args) {
  const input = trimInput(args);
  if (!input.ok) return input;
  const start = trimStart(context, input.start);
  if (!start.ok) return start;
  return finishTrim(
    context,
    start.seconds,
    trimEnd(context, input.end),
    trimDuration(context, input.duration)
  );
}
function trimInput(args) {
  const input = {
    start: typeof args.start === "string" ? args.start : void 0,
    end: typeof args.end === "string" ? args.end : void 0,
    duration: typeof args.duration === "string" ? args.duration : void 0
  };
  if (input.start || input.end || input.duration) return { ok: true, ...input };
  return {
    ok: false,
    reason: "trim requires --start, --end, or --duration",
    fix: "pass one trim option"
  };
}
var leavesNoLength = (start, duration) => duration <= 0 || sameInstant(start, start + duration);
function finishTrim(context, nextStart, end, duration) {
  if (end && !end.ok) return end;
  if (duration && !duration.ok) return duration;
  const nextDuration = duration?.seconds ?? (end ? durationUntil(nextStart, end.seconds) : context.row.duration);
  if (leavesNoLength(nextStart, nextDuration)) {
    return {
      ok: false,
      reason: "trim duration must be positive",
      fix: "choose a later end or positive duration"
    };
  }
  return { ok: true, nextStart, nextDuration };
}
function trimStart(context, expression) {
  if (!expression) return { ok: true, seconds: context.row.start };
  return parseMutationTime(context, expression, "pass a valid time expression");
}
function durationUntil(start, end) {
  let duration = end - start;
  while (duration > 0 && start + duration > end) duration = nextSmaller(duration);
  return duration;
}
var float = new DataView(new ArrayBuffer(8));
function nextSmaller(positive) {
  float.setFloat64(0, positive);
  float.setBigUint64(0, float.getBigUint64(0) - 1n);
  return float.getFloat64(0);
}
function trimEnd(context, expression) {
  if (!expression) return void 0;
  return parseMutationTime(context, expression, "pass a valid time expression");
}
function trimDuration(context, expression) {
  if (!expression) return void 0;
  return parseMutationTime(context, expression, "pass a valid duration");
}
function deleteMutation(context) {
  return {
    ok: true,
    after: removeElementFromHtml(context.before, context.resolved.target),
    nextStart: context.row.start,
    nextDuration: context.row.duration
  };
}
function setOperation(assignment) {
  const property = assignment.field === "volume" ? "data-volume" : assignment.field === "rate" ? "data-playback-rate" : "data-track-index";
  return { type: "html-attribute", property, value: assignment.value };
}
function setMutation(context, args) {
  const positionalAssignments = positional(args).slice(1).filter((value) => typeof value === "string");
  const namedAssignments = ["volume", "rate", "track"].flatMap((field) => {
    const value = args[field];
    return typeof value === "string" ? [`${field}=${value}`] : [];
  });
  const assignments = parseSetAssignments([...positionalAssignments, ...namedAssignments]);
  if (!assignments.ok) return assignments;
  const patched = patchElementInHtml(
    context.before,
    context.resolved.target,
    assignments.assignments.map(setOperation)
  );
  if (!patched.matched) {
    return { ok: false, reason: `${context.ref} was not found`, fix: "choose an existing clip" };
  }
  return {
    ok: true,
    after: patched.html,
    nextStart: context.row.start,
    nextDuration: context.row.duration
  };
}
function duplicateMutation(context, args) {
  const expression = typeof args.at === "string" ? args.at : String(context.row.end);
  const time = parseMutationTime(context, expression, "pass a valid insertion time");
  if (!time.ok) return time;
  const duplicate = duplicateElementInHtml(
    context.before,
    context.resolved.target,
    `${splitBaseId(context.row)}-copy`,
    time.seconds
  );
  if (!duplicate.matched) {
    return { ok: false, reason: `${context.ref} was not found`, fix: "choose an existing clip" };
  }
  return {
    ok: true,
    after: duplicate.html,
    nextStart: time.seconds,
    nextDuration: context.row.duration
  };
}
function decideMutation(verb, context, args) {
  switch (verb) {
    case "move":
      return moveMutation(context, args);
    case "trim":
      return trimMutation(context, args);
    case "split":
      return splitMutation(context, args);
    case "delete":
      return deleteMutation(context);
    case "set":
      return setMutation(context, args);
    case "duplicate":
      return duplicateMutation(context, args);
  }
}
function rowAt(timeline, pointer) {
  const track = timeline.tracks.find((candidate) => candidate.kind === pointer.kind);
  if (!track) throw new Error(`missing track ${pointer.kind}`);
  const row = track.rows[pointer.index];
  if (!row) throw new Error(`missing row ${pointer.kind}/${pointer.index}`);
  return row;
}
function positional(args) {
  return Array.isArray(args._) ? args._.filter((value) => typeof value === "string") : [];
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function mutationConflict(verb, overwrite, row, timeline, nextStart, nextDuration) {
  if (verb === "duplicate") {
    const conflict2 = allRows(timeline).find(
      (candidate) => candidate.file === row.file && candidate.trackIndex === row.trackIndex && isInsideSpan(nextStart, candidate.start, candidate.end)
    );
    if (!conflict2) return null;
    return {
      reason: `duplicate insertion at ${nextStart} falls inside ${conflict2.ref}`,
      fix: "choose a clip boundary or split the spanning clip first"
    };
  }
  if (verb !== "move" && verb !== "trim" || overwrite) return null;
  const conflict = overlap(row, timeline, nextStart, nextStart + nextDuration);
  if (!conflict) return null;
  return {
    reason: `${row.ref} would overlap ${conflict.ref} at ${nextStart}-${nextStart + nextDuration}`,
    fix: "pass --overwrite or move the named neighbour"
  };
}

// src/timeline/a2Commands.ts
async function runIds(args) {
  const project = resolveProject(typeof args.dir === "string" ? args.dir : void 0);
  const json = args.json === true;
  ensureDOMParser();
  const beforeTimeline = await describeProject(project.indexPath);
  const files = [.../* @__PURE__ */ new Set(["index.html", ...allRows(beforeTimeline).map((row) => row.file)])];
  const inputs = files.flatMap((file) => {
    const before = readFileSync3(join(project.dir, file), "utf-8");
    const after = ensureHfIds(before);
    return after === before ? [] : [
      {
        sourceFile: file,
        absPath: join(project.dir, file),
        before,
        after,
        expectedVersion: fileContentVersion(before)
      }
    ];
  });
  let receipts = [];
  try {
    if (inputs.length > 0) receipts = applyFileMutations(project.dir, inputs);
  } catch (error) {
    if (isFileChanged(error))
      return refusal(error.message, "re-run hyperframes timeline ids", json);
    throw error;
  }
  const afterTimeline = await describeProject(project.indexPath);
  const result = {
    ok: true,
    receipt: receipts.map((receipt) => publicReceipt(receipt)),
    file: files,
    before: allRows(beforeTimeline),
    after: allRows(afterTimeline),
    diff: "",
    warnings: []
  };
  if (json) console.log(JSON.stringify(withMeta(result), null, 2));
  else console.log(`ids: stamped ${receipts.length} file${receipts.length === 1 ? "" : "s"}`);
}
var PLAN_VERBS = /* @__PURE__ */ new Set(["move", "trim", "split", "delete", "set", "duplicate"]);
function preparePlanEdit(edit, timeline, sourceByFile) {
  if (!isRecord(edit) || typeof edit.verb !== "string" || typeof edit.ref !== "string") {
    return {
      ok: false,
      reason: "each edit needs a verb and ref",
      fix: "pass {verb, ref, ...} objects"
    };
  }
  if (!PLAN_VERBS.has(edit.verb)) {
    return {
      ok: false,
      reason: `unsupported edit verb ${edit.verb}`,
      fix: "use move, trim, split, delete, set, or duplicate"
    };
  }
  const resolved = resolveRef(timeline, edit.ref);
  if (!resolved.ok) return resolved;
  const before = sourceByFile.get(resolved.row.file);
  return before === void 0 ? { ok: false, reason: `${resolved.row.file} was not found`, fix: "choose an existing clip" } : { ok: true, edit, row: resolved.row, before, resolved };
}
function applyPlanEdit(edit, timeline, project, sourceByFile) {
  const prepared = preparePlanEdit(edit, timeline, sourceByFile);
  if (!prepared.ok) return prepared;
  const { edit: planEdit, row, before, resolved } = prepared;
  const verb = planEdit.verb;
  const context = {
    ref: planEdit.ref,
    row,
    before,
    resolved,
    parseTime: (expression) => parseTimeExpression(expression, {
      row,
      duration: timeline.duration,
      fps: fpsFor(project.indexPath),
      resolveAnchor: (anchorRef) => {
        const anchor = resolveRef(timeline, anchorRef);
        return anchor.ok ? anchor.row : void 0;
      }
    }),
    duration: row.nested && row.hostRow ? rowAt(timeline, row.hostRow).duration : timeline.duration
  };
  const decision = decideMutation(verb, context, { ...planEdit, _: [planEdit.ref] });
  if (!decision.ok) return { ok: false, reason: decision.reason, fix: decision.fix };
  const conflict = mutationConflict(
    verb,
    planEdit.overwrite === true,
    row,
    timeline,
    decision.nextStart,
    decision.nextDuration
  );
  if (conflict) return { ok: false, reason: conflict.reason, fix: conflict.fix };
  return { ok: true, file: row.file, after: decision.after };
}
function readEditPlan(file) {
  const raw = file === "-" ? readFileSync3(0, "utf-8") : readFileSync3(file, "utf-8");
  try {
    const edits = JSON.parse(raw);
    return Array.isArray(edits) ? { ok: true, edits } : { ok: false, reason: "edit plan must be a JSON array", fix: "pass a JSON array of edits" };
  } catch {
    return { ok: false, reason: "edit plan is not valid JSON", fix: "pass a JSON array of edits" };
  }
}
function readPlanSources(timeline, project) {
  const sourceByFile = /* @__PURE__ */ new Map();
  const beforeByFile = /* @__PURE__ */ new Map();
  for (const fileName of new Set(allRows(timeline).map((row) => row.file))) {
    const source = readFileSync3(join(project.dir, fileName), "utf-8");
    sourceByFile.set(fileName, source);
    beforeByFile.set(fileName, source);
  }
  return { sourceByFile, beforeByFile };
}
async function applyPlanEdits(edits, timeline, project, sourceByFile) {
  for (const edit of edits) {
    const result = applyPlanEdit(edit, timeline, project, sourceByFile);
    if (!result.ok) return result;
    sourceByFile.set(result.file, result.after);
    timeline = await describeProject(project.indexPath, void 0, sourceByFile);
  }
  return { ok: true };
}
async function runApply(args) {
  const project = resolveProject(typeof args.dir === "string" ? args.dir : void 0);
  const json = args.json === true;
  const plan = args.plan === true;
  const file = typeof args.file === "string" ? args.file : positional(args)[1];
  if (!file)
    return refuse(
      "timeline apply",
      { reason: "an edit plan is required", fix: "pass an edits.json path or -" },
      json
    );
  const planInput = readEditPlan(file);
  if (!planInput.ok) return refuse("timeline apply", planInput, json);
  ensureDOMParser();
  const timeline = await describeProject(project.indexPath);
  const { sourceByFile, beforeByFile } = readPlanSources(timeline, project);
  const editsResult = await applyPlanEdits(planInput.edits, timeline, project, sourceByFile);
  if (!editsResult.ok) return refuse("timeline apply", editsResult, json);
  const inputs = [...sourceByFile].flatMap(([fileName, after]) => {
    const before = beforeByFile.get(fileName);
    return after === before ? [] : [
      {
        sourceFile: fileName,
        absPath: join(project.dir, fileName),
        before,
        after,
        expectedVersion: fileContentVersion(before)
      }
    ];
  });
  const afterTimeline = await describeProject(project.indexPath, void 0, sourceByFile);
  const result = {
    ok: true,
    planned: plan,
    receipt: null,
    file: inputs.map((input) => input.sourceFile),
    before: allRows(timeline),
    after: allRows(afterTimeline),
    diff: inputs.map((input) => diff(input.before, input.after)).filter(Boolean).join("\n"),
    warnings: []
  };
  if (!plan) {
    const receipts = inputs.length > 0 ? applyFileMutations(project.dir, inputs) : [];
    result.receipt = receipts.map((receipt) => publicReceipt(receipt));
  }
  if (json) console.log(JSON.stringify(withMeta(result), null, 2));
  else
    console.log(
      `${plan ? "planned" : "applied"} ${inputs.length} file${inputs.length === 1 ? "" : "s"}`
    );
}
async function runUndo(args) {
  const project = resolveProject(typeof args.dir === "string" ? args.dir : void 0);
  const json = args.json === true;
  const input = typeof args.receipt === "string" ? args.receipt : positional(args)[1];
  if (!input)
    return refuse(
      "timeline undo",
      { reason: "an undo receipt is required", fix: "pass the receipt JSON or its file" },
      json
    );
  let raw;
  try {
    raw = readFileSync3(input, "utf-8");
  } catch {
    raw = input;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return refuse(
      "timeline undo",
      { reason: "undo receipt is not valid JSON", fix: "pass the applied JSON receipt" },
      json
    );
  }
  const value = isRecord(parsed) && isRecord(parsed.receipt) ? parsed.receipt : parsed;
  if (!isRecord(value) || typeof value.file !== "string" || typeof value.version !== "string" || typeof value.backupPath !== "string") {
    return refuse(
      "timeline undo",
      {
        reason: "undo receipt is missing file, version, or backupPath",
        fix: "pass an applied timeline receipt"
      },
      json
    );
  }
  const backup = join(project.dir, value.backupPath);
  const target = join(project.dir, value.file);
  const before = readFileSync3(target, "utf-8");
  const after = readFileSync3(backup, "utf-8");
  const receipts = applyFileMutations(project.dir, [
    { sourceFile: value.file, absPath: target, before, after, expectedVersion: value.version }
  ]);
  const result = {
    ok: true,
    receipt: receipts.map((receipt) => publicReceipt(receipt)),
    file: value.file
  };
  if (json) console.log(JSON.stringify(withMeta(result), null, 2));
  else console.log(`undid ${value.file}`);
}

// src/timeline/a2MutationCommand.ts
import { readFileSync as readFileSync4 } from "fs";
import { join as join2 } from "path";
async function runMutation(verb, args) {
  const setup = await prepareMutation(args);
  if (!setup.ok) return refusal(setup.reason, setup.fix, setup.json);
  const decision = decideMutation(verb, setup.context, args);
  if (!decision.ok) return refusal(decision.reason, decision.fix, setup.json);
  await finishMutation(setup, verb, decision);
}
async function prepareMutation(args) {
  const project = resolveProject(typeof args.dir === "string" ? args.dir : void 0);
  const ref = typeof args.ref === "string" ? args.ref : "";
  const json = args.json === true;
  const plan = args.plan === true;
  const overwrite = args.overwrite === true;
  const snap = args.snap === true;
  ensureDOMParser();
  const indexSource = readFileSync4(project.indexPath, "utf-8");
  const initialTimeline = await describeProject(
    project.indexPath,
    void 0,
    /* @__PURE__ */ new Map([["index.html", indexSource]])
  );
  const projectFps2 = declaredFps(indexSource);
  if (snap && projectFps2 === null) {
    return {
      ok: false,
      reason: "project fps is unknown",
      fix: "set data-fps on the project, then rerun with --snap",
      json
    };
  }
  const initialResolved = resolveRef(initialTimeline, ref);
  if (!initialResolved.ok)
    return { ok: false, reason: initialResolved.reason, fix: initialResolved.fix, json };
  const initialRow = initialResolved.row;
  const filePath = join2(project.dir, initialRow.file);
  const before = readFileSync4(filePath, "utf-8");
  const expectedVersion = fileContentVersion(before);
  const sources = /* @__PURE__ */ new Map([
    ["index.html", indexSource],
    [initialRow.file, before]
  ]);
  const timeline = await describeProject(project.indexPath, void 0, sources);
  const resolved = resolveRef(timeline, ref);
  if (!resolved.ok) return { ok: false, reason: resolved.reason, fix: resolved.fix, json };
  const row = resolved.row;
  const anchor = (anchorRef) => {
    const found = resolveRef(timeline, anchorRef);
    return found.ok ? found.row : void 0;
  };
  const parseTime = (expression) => {
    const parsed = parseTimeExpression(expression, {
      row,
      duration: timeline.duration,
      fps: fpsFor(project.indexPath),
      resolveAnchor: anchor
    });
    if (!parsed.ok || !snap) return parsed;
    return { ok: true, seconds: Math.round(parsed.seconds * projectFps2) / projectFps2 };
  };
  return {
    ok: true,
    project,
    ref,
    json,
    plan,
    overwrite,
    timeline,
    indexSource,
    row,
    resolved,
    filePath,
    before,
    expectedVersion,
    context: {
      ref,
      row,
      before,
      resolved,
      parseTime,
      // Nested rows use the visible host clip duration as their composition bound.
      duration: row.nested && row.hostRow ? rowAt(timeline, row.hostRow).duration : timeline.duration
    }
  };
}
async function finishMutation(setup, verb, decision) {
  const { after, nextStart, nextDuration } = decision;
  const { ref, row, timeline, json, overwrite, project, before } = setup;
  const refusalMessage = mutationRefusal(verb, after, before, ref);
  if (refusalMessage) return refusal(refusalMessage.reason, refusalMessage.fix, json);
  const conflict = mutationConflict(verb, overwrite, row, timeline, nextStart, nextDuration);
  if (conflict) return refusal(conflict.reason, conflict.fix, json);
  const describeSource = (source) => describeProject(
    project.indexPath,
    void 0,
    /* @__PURE__ */ new Map([
      ["index.html", setup.indexSource],
      [row.file, source]
    ])
  );
  const describedBefore = await describeSource(before);
  const result = mutationResult(row, describedBefore, setup.plan);
  if (setup.plan) return printPlan(result, json, timeline, describeSource, after, before);
  return applyAndPrint({
    setup,
    verb,
    json,
    row,
    nextStart,
    nextDuration,
    after,
    before,
    result,
    describeSource
  });
}
async function applyAndPrint(args) {
  const receipt = applyMutation(args.setup, args.after);
  if (receipt && "error" in receipt)
    return refusal(receipt.error, "re-run hyperframes timeline", args.json);
  if (!receipt && args.after !== args.before) {
    return refusal("mutation produced no receipt", "re-run hyperframes timeline", args.json);
  }
  args.result.after = rowsForFile(await args.describeSource(args.after), args.row.file);
  args.result.receipt = receipt ? publicReceipt(receipt) : null;
  if (args.json) {
    console.log(JSON.stringify(withMeta(args.result), null, 2));
    return;
  }
  console.log(
    `${args.verb} ${args.row.ref}: ${args.row.start}-${args.row.end}s -> ${args.nextStart}-${args.nextStart + args.nextDuration}s
receipt: ${receipt?.version ?? "unchanged"}`
  );
}
function rowsForFile(timeline, file) {
  return allRows(timeline).filter((candidate) => candidate.file === file);
}
function mutationResult(row, before, planned) {
  return {
    ok: true,
    receipt: null,
    file: row.file,
    before: rowsForFile(before, row.file),
    after: [],
    warnings: row.warnings,
    planned
  };
}
async function printPlan(result, json, timeline, describeSource, after, before) {
  const plannedTimeline = await describeSource(after);
  result.after = rowsForFile(plannedTimeline, result.file);
  if (json) console.log(JSON.stringify(withMeta(result), null, 2));
  else
    console.log(
      `${formatTimeline(timeline)}

planned:
${formatTimeline(plannedTimeline)}

diff:
${diff(before, after)}`
    );
}
function applyMutation(setup, after) {
  try {
    return applyFileMutations(setup.project.dir, [
      {
        sourceFile: setup.row.file,
        absPath: setup.filePath,
        before: setup.before,
        after,
        expectedVersion: setup.expectedVersion
      }
    ])[0];
  } catch (error) {
    if (isFileChanged(error)) return { error: error.message };
    throw error;
  }
}
function mutationRefusal(verb, after, before, ref) {
  if (verb !== "delete" || after !== before) return null;
  return { reason: `${ref} was not found`, fix: "choose an existing clip" };
}

// src/commands/timeline.ts
var examples = [
  ["Show every track and clip of the project in the current directory", "hyperframes timeline"],
  ["Move a clip without writing", "hyperframes timeline move '#hero' +2 --plan"],
  ["Delete a clip and return a receipt", "hyperframes timeline delete '#hero' --json"]
];
function mutationCommand(verb) {
  return defineCommand({
    meta: { name: verb, description: `${verb} a timeline clip` },
    args: {
      ref: { type: "positional", required: true },
      time: { type: "positional", required: verb === "move" || verb === "split" },
      at: { type: "string" },
      dir: { type: "string" },
      start: { type: "string" },
      end: { type: "string" },
      duration: { type: "string" },
      plan: { type: "boolean", default: false },
      json: { type: "boolean", default: false },
      overwrite: { type: "boolean", default: false },
      snap: { type: "boolean", default: false }
    },
    async run({ args }) {
      await runMutation(verb, args);
    }
  });
}
var timeline_default = defineCommand({
  meta: { name: "timeline", description: "Print and edit the project's tracks and clips" },
  args: {
    dir: { type: "positional", description: "Project directory", required: false },
    json: { type: "boolean", description: "Output as JSON", default: false }
  },
  subCommands: {
    move: () => mutationCommand("move"),
    trim: () => mutationCommand("trim"),
    split: () => mutationCommand("split"),
    delete: () => mutationCommand("delete"),
    set: () => mutationCommand("set"),
    duplicate: () => mutationCommand("duplicate"),
    ids: () => defineCommand({
      meta: { name: "ids", description: "Stamp stable ids on timeline clips" },
      args: { dir: { type: "string" }, json: { type: "boolean", default: false } },
      async run({ args }) {
        await runIds(args);
      }
    }),
    apply: () => defineCommand({
      meta: { name: "apply", description: "Apply an atomic timeline edit plan" },
      args: {
        file: { type: "positional", required: true },
        dir: { type: "string" },
        json: { type: "boolean", default: false },
        plan: { type: "boolean", default: false }
      },
      async run({ args }) {
        await runApply(args);
      }
    }),
    undo: () => defineCommand({
      meta: { name: "undo", description: "Restore a timeline mutation receipt" },
      args: {
        receipt: { type: "positional", required: true },
        dir: { type: "string" },
        json: { type: "boolean", default: false }
      },
      async run({ args }) {
        await runUndo(args);
      }
    })
  },
  async run({ args }) {
    if (args._?.[0]) return;
    const project = resolveProject(args.dir);
    ensureDOMParser();
    const timeline = await describeProject(project.indexPath);
    console.log(
      args.json ? JSON.stringify(withMeta({ timeline }), null, 2) : formatTimeline(timeline)
    );
  }
});
export {
  timeline_default as default,
  examples
};
