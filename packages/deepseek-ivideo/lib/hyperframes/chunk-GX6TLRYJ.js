import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  replaceFileAtomically
} from "./chunk-6LTRBXKR.js";
import {
  realpath
} from "./chunk-2Z55WR76.js";

// src/utils/appHistory.ts
import { createHash } from "crypto";
import { lstatSync as lstatSync2, mkdirSync as mkdirSync2, readdirSync } from "fs";
import { homedir } from "os";
import { dirname, join as join2, relative, resolve, sep } from "path";

// src/utils/projectRecords.ts
import { closeSync, constants, fstatSync, lstatSync, mkdirSync, openSync, readSync } from "fs";
import { join } from "path";
var NO_FOLLOW = constants.O_NOFOLLOW ?? 0;
var NON_BLOCK = constants.O_NONBLOCK ?? 0;
function recordsDir(projectDir, create = false) {
  const dir = join(projectDir, ".hyperframes");
  try {
    return lstatSync(dir).isDirectory() ? dir : null;
  } catch {
    if (!create) return null;
    try {
      mkdirSync(dir);
      return dir;
    } catch {
      return null;
    }
  }
}
function readPlainFile(path, maxBytes) {
  let fd;
  try {
    fd = openSync(path, constants.O_RDONLY | NO_FOLLOW | NON_BLOCK);
  } catch {
    return "";
  }
  try {
    const stats = fstatSync(fd);
    const named = lstatSync(path);
    if (!stats.isFile() || !named.isFile() || named.ino !== stats.ino || named.dev !== stats.dev)
      return "";
    const length = Math.min(stats.size, maxBytes);
    const buffer = Buffer.alloc(length);
    readSync(fd, buffer, 0, length, stats.size - length);
    return buffer.toString("utf8");
  } catch {
    return "";
  } finally {
    closeSync(fd);
  }
}
function readRecord(projectDir, name, maxBytes) {
  const dir = recordsDir(projectDir);
  return dir ? readPlainFile(join(dir, name), maxBytes) : "";
}
function recordChangedAt(projectDir, name) {
  const dir = recordsDir(projectDir);
  try {
    const stats = dir ? lstatSync(join(dir, name)) : null;
    return stats?.isFile() ? stats.mtimeMs : 0;
  } catch {
    return 0;
  }
}
function replaceFile(path, data, mode) {
  try {
    replaceFileAtomically(path, data, mode);
    return true;
  } catch {
    return false;
  }
}
function writeRecord(projectDir, name, data) {
  const dir = recordsDir(projectDir, true);
  return dir !== null && replaceFile(join(dir, name), data, 384);
}

// src/utils/appHistory.ts
var APP_HISTORY = "app-history.jsonl";
var MAX_READ_BYTES = 1024 * 1024;
var MAX_FIELD_CHARS = 2e3;
var MAX_WALKED_FILES = 5e3;
var SKIPPED_DIRS = /* @__PURE__ */ new Set(["node_modules", "renders", "snapshots"]);
var text = (value) => typeof value === "string" ? value.slice(0, MAX_FIELD_CHARS) : "";
function toTurn(line) {
  let raw;
  try {
    raw = Object(JSON.parse(line));
  } catch {
    return null;
  }
  const at = text(raw.at);
  if (Number.isNaN(Date.parse(at))) return null;
  const files = Array.isArray(raw.files) ? raw.files.map(text).filter(Boolean) : [];
  return { at, engine: text(raw.engine), asked: text(raw.asked), did: text(raw.did), files };
}
function readAppTurns(dir) {
  return readRecord(dir, APP_HISTORY, MAX_READ_BYTES).split("\n").flatMap((line) => toTurn(line) ?? []);
}
var stamp = (value) => typeof value === "string" ? Date.parse(value) || 0 : 0;
function seenPath(dir) {
  let real;
  try {
    real = realpath(dir);
  } catch {
    real = resolve(dir);
  }
  const key = createHash("sha256").update(real).digest("hex").slice(0, 32);
  return join2(homedir(), ".hyperframes", "catch-up", `${key}.json`);
}
function readSeen(dir) {
  try {
    const seen = Object(JSON.parse(readPlainFile(seenPath(dir), 4096)));
    const at = stamp(seen.at);
    return { at, checked: stamp(seen.checked) || at };
  } catch {
    return { at: 0, checked: 0 };
  }
}
function markSeen(dir, seen) {
  const path = seenPath(dir);
  const at = (time) => new Date(time).toISOString();
  try {
    mkdirSync2(dirname(path), { recursive: true, mode: 448 });
  } catch {
    return false;
  }
  return replaceFile(path, JSON.stringify({ at: at(seen.at), checked: at(seen.checked) }), 384);
}
function unseenTurns(dir, since, now = Date.now()) {
  if (!since) return [];
  return readAppTurns(dir).filter(
    (turn) => Date.parse(turn.at) > since && Date.parse(turn.at) <= now
  );
}
function filesChangedSince(dir, since) {
  const changed = [];
  let walked = 0;
  const walk = (folder) => {
    let entries;
    try {
      entries = readdirSync(folder, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (walked++ > MAX_WALKED_FILES) return;
      if (entry.name.startsWith(".") || SKIPPED_DIRS.has(entry.name)) continue;
      const path = join2(folder, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile() && lstatSync2(path).mtimeMs > since)
        changed.push(relative(dir, path).split(sep).join("/"));
    }
  };
  walk(dir);
  return changed.sort();
}
function projectsNamed(cwd, args) {
  const candidates = [cwd, ...args.filter((arg) => !arg.startsWith("-"))].flatMap((arg) => {
    const path = resolve(cwd, arg);
    return [path, dirname(path)];
  });
  return [...new Set(candidates)];
}
function appHistoryNotice(cwd, args) {
  for (const dir of projectsNamed(cwd, args)) {
    const { at } = readSeen(dir);
    if (!at || recordChangedAt(dir, APP_HISTORY) <= at) continue;
    const count = unseenTurns(dir, at).length;
    if (count === 0) continue;
    const where = relative(cwd, dir);
    const turns = count === 1 ? "1 chat turn" : `${count} chat turns`;
    return `The HyperFrames desktop app has ${turns} on this project you haven't seen. Run \`npx hyperframes catch-up${where ? ` ${where}` : ""}\` before changing it.`;
  }
  return null;
}
var CATCH_UP_NOTE = "> **Back from the desktop app.** Once this project was opened in the HyperFrames desktop app, run `npx hyperframes catch-up` before your next change here: it lists what the person asked Framey in the app and which files changed since.";
var SCAFFOLD_TITLE = "# HyperFrames Composition Project";
var AFTER = "> alive through review, and stop it explicitly with `preview --stop` afterward.\n";
function addCatchUpNote(dir) {
  for (const name of ["CLAUDE.md", "AGENTS.md"]) {
    const path = join2(dir, name);
    try {
      const text2 = readPlainFile(path, MAX_READ_BYTES);
      if (!text2.startsWith(SCAFFOLD_TITLE) || text2.includes("hyperframes catch-up")) continue;
      const next = text2.includes(AFTER) ? text2.replace(AFTER, `${AFTER}
${CATCH_UP_NOTE}
`) : `${text2.trimEnd()}

${CATCH_UP_NOTE}
`;
      replaceFile(path, next, lstatSync2(path).mode & 511);
    } catch {
    }
  }
}

export {
  writeRecord,
  APP_HISTORY,
  readAppTurns,
  readSeen,
  markSeen,
  unseenTurns,
  filesChangedSince,
  appHistoryNotice,
  CATCH_UP_NOTE,
  addCatchUpNote
};
