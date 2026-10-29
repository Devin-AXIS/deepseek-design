import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  resolveProject
} from "./chunk-E4KGNMPL.js";
import "./chunk-IHFUKJOR.js";
import {
  DEFAULT_HISTORY_ROOT,
  HistoryBusyError,
  HistoryIdError,
  MAX_WINDOW_IDLE_MS,
  START,
  openProjectHistory
} from "./chunk-7QNZFNEX.js";
import "./chunk-YGSQ65SQ.js";
import "./chunk-6LTRBXKR.js";
import {
  AmbiguousPreviewServerError,
  findPreviewServerForProject,
  studioApiUrl
} from "./chunk-DQBY7FRR.js";
import {
  trackHistoryAction
} from "./chunk-D3TRQ4GS.js";
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
import "./chunk-H6T6FXDE.js";
import "./chunk-2Z55WR76.js";
import "./chunk-USDEMXXL.js";
import {
  withMeta
} from "./chunk-5FABXOBL.js";
import "./chunk-K4WIOZFP.js";
import "./chunk-2SBJMKLH.js";
import "./chunk-ISN5GRYI.js";
import "./chunk-MUINFURL.js";
import "./chunk-KNU5COPB.js";
import "./chunk-ZTZA4UWZ.js";
import "./chunk-M2WBOQ2Q.js";

// src/commands/history.ts
import { spawnSync } from "child_process";
import { mkdirSync as mkdirSync2, mkdtempSync, rmSync as rmSync2, writeFileSync as writeFileSync2 } from "fs";
import { tmpdir } from "os";
import { dirname as dirname2, join as join2 } from "path";

// src/utils/historyOwner.ts
import { randomUUID } from "crypto";
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var historyDeps = {
  historyRoot: DEFAULT_HISTORY_ROOT,
  findServer: (projectDir) => findPreviewServerForProject(projectDir),
  /** A turn with no write for this long has ended, through a preview or not. */
  turnIdleMs: MAX_WINDOW_IDLE_MS,
  now: () => Date.now()
};
var Refusal = class extends Error {
};
var turnFile = (dir) => join(dir, ".hyperframes", "history-turn.json");
function readTurn(dir) {
  try {
    const turn = JSON.parse(readFileSync(turnFile(dir), "utf-8"));
    return typeof turn.lastWriteAt === "number" ? { ...turn, parts: turn.parts ?? [] } : null;
  } catch {
    return null;
  }
}
function writeTurn(dir, turn) {
  if (!turn) return rmSync(turnFile(dir), { force: true });
  mkdirSync(dirname(turnFile(dir)), { recursive: true });
  writeFileSync(turnFile(dir), JSON.stringify(turn));
}
var lastTurnsFile = (dir) => join(dir, ".hyperframes", "history-turns.json");
function readLastTurns(dir) {
  try {
    const turns = JSON.parse(readFileSync(lastTurnsFile(dir), "utf-8"));
    return turns && typeof turns === "object" ? turns : {};
  } catch {
    return {};
  }
}
function lastTurnParts(dir, name) {
  return readLastTurns(dir)[name] ?? null;
}
var samePart = (a, b) => a.who.kind === b.who.kind && a.who.name === b.who.name && a.label === b.label && a.startedAt === b.startedAt;
async function endTurn(owner, turn, dir) {
  const entry = await owner.end(turn.id);
  const cut = (await owner.list()).filter((other) => samePart(other, entry ?? turn));
  const own = entry ? [entry.id] : [];
  const parts = [.../* @__PURE__ */ new Set([...turn.parts, ...cut.map((part) => part.id), ...own])];
  const draft = `${lastTurnsFile(dir)}.${process.pid}.tmp`;
  mkdirSync(dirname(draft), { recursive: true });
  writeFileSync(draft, JSON.stringify({ ...readLastTurns(dir), [turn.who.name]: parts }));
  renameSync(draft, lastTurnsFile(dir));
  writeTurn(dir, null);
  return { entry, parts };
}
function previewOwner(route) {
  const call = async (path, body) => {
    const init = body && {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    };
    const response = await fetch(route(path), init);
    if (response.ok) return response;
    const error = await response.json().catch(() => null);
    throw new Refusal(error?.error ?? `The preview answered ${response.status}.`);
  };
  const json = async (path, body) => (await call(path, body)).json();
  const list = async () => (await json("")).entries;
  return {
    via: "preview",
    list,
    peek: async (point) => (await json(`/peek/${encodeURIComponent(point)}`)).files,
    blob: async (hash) => Buffer.from(await (await call(`/blob/${hash}`)).arrayBuffer()),
    undo: (id, who, mode) => json("/undo", { entryId: id, who, mode }),
    restore: (point, who) => json("/restore", { point, who }),
    pin: async (id, pinned) => void await json("/pin", { entryId: id, pinned }),
    begin: async (who, label) => {
      const opened = await json("/window", { who, label, idleMs: historyDeps.turnIdleMs });
      return { id: opened.windowId, startedAt: opened.startedAt ?? historyDeps.now() };
    },
    // A preview restarted since begin committed the window on its way down.
    end: (id) => json(`/window/${id}/close`, {}).then((closed) => closed.entry).catch(async () => (await list()).find((entry) => entry.id === id) ?? null),
    close: async () => {
    }
  };
}
async function directOwner(projectDir, turn) {
  const history = await openProjectHistory({
    projectDir,
    historyRoot: historyDeps.historyRoot,
    now: () => historyDeps.now(),
    pruneGoneProjectsBudgetMs: 1e3,
    // A turn begun through a preview that has since stopped is still the agent's, until its idle limit.
    ...turn && {
      closedWindow: {
        id: turn.id,
        who: turn.who,
        label: turn.label,
        startedAt: turn.startedAt,
        lastWriteAt: turn.lastWriteAt,
        idleMs: historyDeps.turnIdleMs
      }
    }
  });
  return {
    via: "direct",
    list: async () => history.list(),
    peek: async (point) => history.peek(point),
    blob: (hash) => history.readBlob(hash),
    undo: (id, who, mode) => history.undo(id, { who, ...mode && { mode } }),
    restore: (point, who) => history.restore(point, who),
    pin: async (id, pinned) => history.pin(id, pinned),
    // Opening filed every earlier write; the turn's own writes are filed to it when the next open passes it.
    begin: async () => ({ id: randomUUID(), startedAt: historyDeps.now() }),
    end: async (id) => history.list().find((entry) => entry.id === id) ?? null,
    close: () => history.close()
  };
}
async function connect(projectDir, turn) {
  const server = await historyDeps.findServer(projectDir);
  if (server) {
    const route = (path) => studioApiUrl(server, `history${path}`);
    const status = await fetch(route("")).then(
      (response) => response.status,
      () => 404
    );
    if (status !== 404) return previewOwner(route);
  }
  return directOwner(projectDir, turn);
}
async function withOwner(dir, task) {
  const { dir: projectDir } = resolveProject(dir);
  const turn = readTurn(projectDir);
  const owner = await connect(projectDir, turn);
  try {
    return await task(owner, turn, projectDir);
  } finally {
    const direct = owner.via === "direct" && turn;
    let kept;
    try {
      kept = direct ? (await owner.list()).find((entry) => entry.id === turn.id) : void 0;
    } finally {
      await owner.close();
    }
    if (direct && readTurn(projectDir)?.id === turn.id) {
      const lastWriteAt = kept ? kept.endedAt : turn.lastWriteAt;
      const parts = kept ? [...turn.parts, kept.id] : turn.parts;
      writeTurn(projectDir, { ...turn, via: "direct", id: randomUUID(), lastWriteAt, parts });
    }
  }
}

// src/commands/history.ts
var examples = [
  [
    "What changed since your last turn, and who changed it",
    "hyperframes history --since mine --who claude"
  ],
  [
    "Label your writes as one entry",
    "hyperframes history begin --who claude --label 'Bigger title'"
  ],
  ["Undo your newest entry after a failed check", "hyperframes history undo --who claude"]
];
var YOU = { kind: "person", name: "You" };
var withOwner2 = (action, dir, task) => withOwner(dir, (owner, turn, projectDir) => {
  trackHistoryAction({ action, via: owner.via });
  return task(owner, turn, projectDir);
});
var whoOf = (name) => name ? { kind: "agent", name } : YOU;
var short = (id) => id.slice(0, 8);
function lastIndex(items, match) {
  for (let index = items.length - 1; index >= 0; index -= 1) if (match(items[index])) return index;
  return -1;
}
function entryOf(entries, ref) {
  const found = entries.filter((entry) => entry.id.startsWith(ref));
  if (found.length === 1) return found[0];
  throw new Refusal(
    found.length ? `"${ref}" matches ${found.length} entries` : `No entry "${ref}" in this history`
  );
}
function timeOf(entries, ref) {
  if (!/^\d{4}-\d\d-\d\d(T.+)?$/.test(ref) || entries.some((entry) => entry.id.startsWith(ref)))
    return null;
  const time = Date.parse(ref.includes("T") ? ref : `${ref}T00:00`);
  const [year, month, date] = ref.slice(0, 10).split("-").map(Number);
  const day = new Date(Date.UTC(year, month - 1, date));
  if (Number.isNaN(time) || day.getUTCMonth() !== month - 1 || day.getUTCDate() !== date)
    throw new Refusal(`"${ref}" is not a date`);
  return time;
}
function pointOf(entries, ref) {
  if (ref === START) return ref;
  const time = timeOf(entries, ref);
  if (time === null) return entryOf(entries, ref).id;
  return entries[lastIndex(entries, (entry) => entry.endedAt <= time)]?.id ?? START;
}
function since(entries, ref, who) {
  if (ref === "mine")
    return entries.slice(lastIndex(entries, (entry) => entry.who.name === who.name) + 1);
  const time = timeOf(entries, ref);
  if (time !== null) return entries.filter((entry) => entry.endedAt > time);
  return entries.slice(entries.indexOf(entryOf(entries, ref)) + 1);
}
function ago(at) {
  const seconds = Math.max(0, Math.round((historyDeps.now() - at) / 1e3));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h ago`;
  return `${Math.round(seconds / 86400)}d ago`;
}
function line(entry) {
  const paths = entry.files.map((file) => file.path);
  const files = paths.slice(0, 2).join(", ") + (paths.length > 2 ? ` +${paths.length - 2}` : "");
  const flags = "undone" in entry ? `${entry.undone ? " [undone]" : ""}${entry.pinned ? " [pinned]" : ""}` : "";
  return `${short(entry.id)}  ${ago(entry.endedAt)}  ${entry.who.name}  ${entry.label}  (${files})${flags}`;
}
var publicEntry = (entry) => ({
  id: entry.id,
  who: entry.who,
  label: entry.label,
  startedAt: entry.startedAt,
  endedAt: entry.endedAt,
  files: entry.files.map((file) => file.path),
  undone: entry.undone ?? false,
  pinned: entry.pinned ?? false
});
var changeOf = (file) => file.before === null ? "added" : file.after === null ? "deleted" : "modified";
function print(json, data, text) {
  console.log(json ? JSON.stringify(withMeta(data), null, 2) : text);
}
async function textDiff(owner, entry) {
  const work = mkdtempSync(join2(tmpdir(), "hf-history-diff-"));
  try {
    const out = [];
    for (const file of entry.files) {
      const sides = await Promise.all(
        [file.before, file.after].map((hash) => hash ? owner.blob(hash) : Buffer.alloc(0))
      );
      if (sides.some((bytes) => bytes.subarray(0, 8e3).includes(0))) {
        out.push(`Binary ${file.path} changed`);
        continue;
      }
      const [a, b] = ["a", "b"].map((side, index) => {
        const path = join2(side, file.path);
        mkdirSync2(dirname2(join2(work, path)), { recursive: true });
        writeFileSync2(join2(work, path), sides[index]);
        return path;
      });
      const diff = spawnSync("git", ["diff", "--no-index", "--no-color", "--no-prefix", a, b], {
        cwd: work,
        encoding: "utf-8"
      });
      if (diff.error) throw new Refusal("--diff needs git on PATH");
      out.push(diff.stdout.trimEnd());
    }
    return out.join("\n");
  } finally {
    rmSync2(work, { recursive: true, force: true });
  }
}
function conflictText(entry, newer, files, again) {
  return [
    `${files.join(", ")} changed since "${entry.label}". Newer entries:`,
    ...newer.map((later) => `  ${line(later)}`),
    `Choose one:`,
    `  hyperframes history ${again} --just-this       put back only its files, over the newer edits to them`,
    `  hyperframes history ${again} --back-to-before  go back to before it, undoing the newer entries too`
  ].join("\n");
}
function turnTargets(entries, who, dir) {
  const inEffect = (entry) => !entry.undone && !entry.undoes;
  const parts = lastTurnParts(dir, who.name);
  const newest = entries[lastIndex(entries, (e) => e.who.name === who.name && inEffect(e))];
  const targets = parts ? entries.filter((entry) => parts.includes(entry.id) && inEffect(entry)).reverse() : newest ? [newest] : [];
  if (!targets.length)
    throw new Refusal(
      parts ? `${who.name}'s last turn has no change still in effect; undo an older entry by its id` : `${who.name} has no entry still in effect`
    );
  return targets;
}
async function undoWhole(owner, targets, who, mode) {
  const undid = [];
  for (const target of targets) {
    const result = await owner.undo(target.id, who, mode);
    if (!result.ok) {
      for (const done of undid.reverse()) await owner.undo(done.undo.id, who);
      return { undid: [], refused: { target, result } };
    }
    if (result.entry) undid.push({ target, undo: result.entry });
  }
  return { undid };
}
async function runUndo(args) {
  const mode = args.justThis ? "just-this" : args.backToBefore ? "back-to-before" : void 0;
  await withOwner2("undo", args.dir, async (owner, turn, projectDir) => {
    const who = whoOf(args.who);
    if (turn?.who.name === who.name) await endTurn(owner, turn, projectDir);
    const entries = await owner.list();
    const targets = args.ref ? [entryOf(entries, args.ref)] : turnTargets(entries, who, projectDir);
    const { undid, refused } = await undoWhole(owner, targets, who, mode);
    if (refused) {
      const { target, result } = refused;
      setCommandExitCode(2);
      const now = await owner.list();
      const newer = result.conflict.newer.map((id) => entryOf(now, id));
      const again = args.ref ? `undo ${short(target.id)}` : `undo --who ${who.name}`;
      return print(args.json, result, conflictText(target, newer, result.conflict.files, again));
    }
    print(
      args.json,
      {
        ok: true,
        entry: undid[0] ? publicEntry(undid[0].undo) : null,
        entries: undid.map((done) => publicEntry(done.undo))
      },
      undid.map((done) => `Undid ${short(done.target.id)}: ${line(done.undo)}`).join("\n") || "Nothing to undo."
    );
  });
}
function guarded(run) {
  return async (args) => {
    try {
      await run(args);
    } catch (error) {
      const refused = error instanceof Refusal || error instanceof AmbiguousPreviewServerError || error instanceof HistoryBusyError || error instanceof HistoryIdError;
      if (!refused) throw error;
      setCommandExitCode(2);
      const { message } = error;
      if (args.json) print(true, { ok: false, error: message }, message);
      else console.error(message);
    }
  };
}
var common = {
  dir: { type: "string", description: "Project directory (default: current)" },
  json: { type: "boolean", description: "Output as JSON", default: false }
};
var sub = (name, description, args, run) => defineCommand({
  meta: { name, description },
  args: { ...common, ...args },
  run: ({ args: parsed }) => guarded(run)(parsed)
});
var listEntries = async (args) => {
  if (args._?.[0]) return;
  await withOwner2("list", args.dir, async (owner) => {
    const all = await owner.list();
    const picked = args.since ? since(all, args.since, whoOf(args.who)) : all;
    const limit = Number(args.limit ?? 20);
    if (!Number.isInteger(limit) || limit < 1)
      throw new Refusal("--limit takes a whole number above 0");
    const shown = picked.slice(-limit).reverse();
    const more = picked.length - shown.length;
    const text = shown.map(line).join("\n") || "No changes recorded.";
    print(
      args.json,
      { entries: shown.map(publicEntry) },
      more ? `${text}
(${more} older; --limit)` : text
    );
  });
};
var history_default = defineCommand({
  meta: { name: "history", description: "List, undo and restore the project's recorded changes" },
  args: {
    ...common,
    since: { type: "string", description: "Only entries after an entry id, a time, or 'mine'" },
    who: { type: "string", description: "Your name, for --since mine" },
    limit: { type: "string", description: "Newest entries to show (default 20)" }
  },
  subCommands: {
    show: () => sub(
      "show",
      "One entry's files, before and after",
      { ref: { type: "positional", required: true }, diff: { type: "boolean", default: false } },
      (args) => withOwner2("show", args.dir, async (owner) => {
        const entry = entryOf(await owner.list(), args.ref);
        const changes = entry.files.map((file) => ({
          path: file.path,
          change: changeOf(file)
        }));
        const diff = args.diff ? await textDiff(owner, entry) : void 0;
        const marks = changes.map((file) => `  ${file.change[0].toUpperCase()} ${file.path}`);
        print(
          args.json,
          { entry: publicEntry(entry), changes, ...diff !== void 0 && { diff } },
          `${line(entry)}
${diff ?? marks.join("\n")}`
        );
      })
    ),
    undo: () => sub(
      "undo",
      "Undo an entry (default: your newest one still in effect)",
      {
        ref: { type: "positional", required: false },
        who: { type: "string", description: "Your name" },
        "just-this": { type: "boolean", default: false },
        "back-to-before": { type: "boolean", default: false }
      },
      runUndo
    ),
    restore: () => sub(
      "restore",
      "Make the files what they were right after an entry, a time, or 'start'",
      { ref: { type: "positional", required: true }, who: { type: "string" } },
      (args) => withOwner2("restore", args.dir, async (owner) => {
        const entry = await owner.restore(
          pointOf(await owner.list(), args.ref),
          whoOf(args.who)
        );
        print(
          args.json,
          { entry: entry && publicEntry(entry) },
          entry ? `Restored: ${line(entry)}` : "Already there."
        );
      })
    ),
    peek: () => sub(
      "peek",
      "The files at an entry, a time, or 'start' (read-only); with a path, that file",
      {
        ref: { type: "positional", required: true },
        path: { type: "positional", required: false }
      },
      (args) => withOwner2("peek", args.dir, async (owner) => {
        const files = await owner.peek(pointOf(await owner.list(), args.ref));
        if (!files) throw new Refusal("That point is no longer kept");
        if (!args.path) return print(args.json, { files }, Object.keys(files).join("\n"));
        const hash = files[args.path];
        if (!hash) throw new Refusal(`${args.path} did not exist then`);
        process.stdout.write(await owner.blob(hash));
      })
    ),
    pin: () => sub(
      "pin",
      "Keep an entry (and what it needs) when old history is trimmed",
      { ref: { type: "positional", required: true }, off: { type: "boolean", default: false } },
      (args) => withOwner2("pin", args.dir, async (owner) => {
        const entry = entryOf(await owner.list(), args.ref);
        await owner.pin(entry.id, !args.off);
        print(
          args.json,
          { id: entry.id, pinned: !args.off },
          `${args.off ? "Unpinned" : "Pinned"} ${short(entry.id)}`
        );
      })
    ),
    begin: () => sub(
      "begin",
      "Start a turn: your writes until `end` become one entry under your name",
      { who: { type: "string", required: true }, label: { type: "string", required: true } },
      (args) => withOwner2("begin", args.dir, async (owner, turn, projectDir) => {
        if (turn) await endTurn(owner, turn, projectDir);
        const who = whoOf(args.who);
        const { id, startedAt } = await owner.begin(who, args.label);
        writeTurn(projectDir, {
          via: owner.via,
          id,
          who,
          label: args.label,
          startedAt,
          lastWriteAt: startedAt,
          parts: []
        });
        print(args.json, { entryId: id }, short(id));
      })
    ),
    end: () => sub(
      "end",
      "End your turn and print its entry",
      {},
      (args) => withOwner2("end", args.dir, async (owner, turn, projectDir) => {
        if (!turn) throw new Refusal("No turn is open; start one with history begin");
        const { entry, parts } = await endTurn(owner, turn, projectDir);
        const earlier = parts.length - (entry ? 1 : 0);
        const text = entry ? line(entry) : earlier ? "Nothing changed since this turn's last command." : "Nothing changed in this turn.";
        print(
          args.json,
          { entry: entry && publicEntry(entry), parts },
          earlier ? `${text}
(+${earlier} earlier part${earlier > 1 ? "s" : ""})` : text
        );
      })
    )
  },
  run: ({ args }) => guarded(listEntries)(args)
});
export {
  history_default as default,
  examples
};
