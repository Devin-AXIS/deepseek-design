import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);
import {
  realFilePath
} from "./chunk-YGSQ65SQ.js";
import {
  atomicTempPath,
  isAtomicTempPath,
  replaceFileAtomically
} from "./chunk-6LTRBXKR.js";
import {
  isSafePath,
  mkdirWithinProject
} from "./chunk-2Z55WR76.js";

// ../studio-server/src/helpers/projectSignature.ts
import { createHash } from "crypto";
import { lstatSync, readFileSync, readdirSync } from "fs";
import { extname, isAbsolute, relative, resolve, sep } from "path";
var SIGNATURE_TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx"
]);
var SIGNATURE_EXCLUDED_DIRS = /* @__PURE__ */ new Set([
  ".cache",
  ".git",
  ".hyperframes",
  ".next",
  ".thumbnails",
  ".transcode-cache",
  ".vite",
  ".waveform-cache",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "outputs",
  "renders"
]);
var MAX_SIGNATURE_TEXT_BYTES = 2e6;
var STUDIO_SIGNATURE_MANIFEST_PATHS = [
  ".hyperframes/studio-manual-edits.json",
  ".hyperframes/studio-motion.json"
];
function affectsProjectSignature(projectDir, changedPath) {
  const relativePath = relative(resolve(projectDir), resolve(changedPath));
  if (relativePath === "" || relativePath.startsWith("..") || isAbsolute(relativePath) || isAtomicTempPath(relativePath)) {
    return false;
  }
  const segments = relativePath.split(sep);
  if (STUDIO_SIGNATURE_MANIFEST_PATHS.includes(segments.join("/"))) return true;
  return !segments.some((segment) => SIGNATURE_EXCLUDED_DIRS.has(segment));
}
var projectSignatureCache = /* @__PURE__ */ new Map();
var COARSEST_FILE_TIME_TICK_MS = 2e3;
function isPathWithin(parentDir, childPath) {
  const childRelativePath = relative(parentDir, childPath);
  return childRelativePath === "" || !childRelativePath.startsWith("..") && !isAbsolute(childRelativePath);
}
function isTextContentEligible(file, size) {
  return SIGNATURE_TEXT_EXTENSIONS.has(extname(file).toLowerCase()) && size <= MAX_SIGNATURE_TEXT_BYTES;
}
var isSkippedEntry = (entry) => SIGNATURE_EXCLUDED_DIRS.has(entry) || isAtomicTempPath(entry);
function collectProjectSignatureFiles(projectDir, dir, files) {
  let entries;
  try {
    entries = readdirSync(dir).sort();
  } catch {
    return;
  }
  for (const entry of entries) {
    if (isSkippedEntry(entry)) continue;
    const file = resolve(dir, entry);
    if (!isPathWithin(projectDir, file)) continue;
    let stat2;
    try {
      stat2 = lstatSync(file);
    } catch {
      continue;
    }
    if (stat2.isSymbolicLink()) continue;
    if (stat2.isDirectory()) {
      collectProjectSignatureFiles(projectDir, file, files);
    } else if (stat2.isFile()) {
      files.push({
        file,
        mtimeMs: stat2.mtimeMs,
        ctimeMs: stat2.ctimeMs,
        size: stat2.size,
        textContentEligible: isTextContentEligible(file, stat2.size)
      });
    }
  }
}
function collectProjectSignatureManifestFiles(projectDir, files) {
  const seen = new Set(files.map((entry) => entry.file));
  for (const manifestPath of STUDIO_SIGNATURE_MANIFEST_PATHS) {
    const file = resolve(projectDir, manifestPath);
    if (seen.has(file) || !isPathWithin(projectDir, file)) continue;
    let stat2;
    try {
      stat2 = lstatSync(file);
    } catch {
      continue;
    }
    if (stat2.isSymbolicLink() || !stat2.isFile()) continue;
    files.push({
      file,
      mtimeMs: stat2.mtimeMs,
      ctimeMs: stat2.ctimeMs,
      size: stat2.size,
      textContentEligible: isTextContentEligible(file, stat2.size)
    });
    seen.add(file);
  }
}
function createProjectFingerprint(projectDir, files) {
  const hash = createHash("sha256");
  for (const entry of files) {
    hash.update(relative(projectDir, entry.file));
    hash.update("\0");
    hash.update(String(entry.size));
    hash.update("\0");
    hash.update(String(entry.mtimeMs));
    hash.update("\0");
    hash.update(String(entry.ctimeMs));
    hash.update("\0");
    hash.update(entry.textContentEligible ? "text" : "binary");
    hash.update("\0");
  }
  return hash.digest("hex").slice(0, 24);
}
function collectProjectFiles(normalizedProjectDir) {
  const collected = [];
  collectProjectSignatureFiles(normalizedProjectDir, normalizedProjectDir, collected);
  collectProjectSignatureManifestFiles(normalizedProjectDir, collected);
  return collected;
}
function listProjectFiles(projectDir) {
  const normalizedProjectDir = resolve(projectDir);
  return collectProjectFiles(normalizedProjectDir).map((entry) => ({
    path: relative(normalizedProjectDir, entry.file).split(sep).join("/"),
    size: entry.size,
    mtimeMs: entry.mtimeMs,
    ctimeMs: entry.ctimeMs
  }));
}
function resolveProjectSignature(adapter, projectDir) {
  return adapter.getProjectSignature?.(projectDir) ?? createProjectSignature(projectDir);
}
async function resolveProjectAndSignature(adapter, projectId) {
  const project = await adapter.resolveProject(projectId);
  if (!project) return null;
  return { project, signature: resolveProjectSignature(adapter, project.dir) };
}
function createProjectSignature(projectDir, excluding = /* @__PURE__ */ new Set()) {
  const normalizedProjectDir = resolve(projectDir);
  const signedAt = Date.now();
  const collected = collectProjectFiles(normalizedProjectDir);
  const files = collected.filter(
    (entry) => !excluding.has(relative(normalizedProjectDir, entry.file).split(sep).join("/"))
  );
  files.sort((a, b) => a.file.localeCompare(b.file));
  const fingerprint = createProjectFingerprint(normalizedProjectDir, files);
  const cacheKey = excluding.size ? `${normalizedProjectDir}\0${createHash("sha256").update([...excluding].sort().join("\0")).digest("hex")}` : normalizedProjectDir;
  const cached = projectSignatureCache.get(cacheKey);
  if (cached?.fingerprint === fingerprint) return cached.signature;
  const hash = createHash("sha256");
  for (const entry of files) {
    const relativePath = relative(normalizedProjectDir, entry.file);
    hash.update(relativePath);
    hash.update("\0");
    hash.update(String(entry.size));
    hash.update("\0");
    if (entry.textContentEligible) {
      try {
        hash.update(readFileSync(entry.file));
      } catch {
        hash.update(String(entry.mtimeMs));
      }
    } else {
      hash.update(String(entry.mtimeMs));
    }
    hash.update("\0");
  }
  const signature = hash.digest("hex").slice(0, 24);
  const settledATickBeforeSigning = files.every(
    (entry) => Math.max(entry.mtimeMs, entry.ctimeMs) < signedAt - COARSEST_FILE_TIME_TICK_MS
  );
  if (settledATickBeforeSigning) projectSignatureCache.set(cacheKey, { fingerprint, signature });
  return signature;
}

// ../studio-server/src/helpers/fileVersion.ts
import { createHash as createHash2, randomUUID } from "crypto";
var RECEIPT_TTL_MS = 1e4;
var MAX_RECEIPT_PATHS = 512;
var receipts = /* @__PURE__ */ new Map();
var overwriteListeners = /* @__PURE__ */ new Set();
function pruneReceipts(now) {
  for (const [path, entries] of receipts) {
    const active = entries.filter((entry) => now - entry.recordedAt < RECEIPT_TTL_MS);
    if (active.length > 0) receipts.set(path, active);
    else receipts.delete(path);
  }
  while (receipts.size > MAX_RECEIPT_PATHS) {
    const oldest = receipts.keys().next().value;
    if (oldest === void 0) break;
    receipts.delete(oldest);
  }
}
function fileContentVersion(content) {
  return hashVersion(createHash2("sha256").update(content).digest("hex"));
}
var DELETED_VERSION = '"deleted"';
function hashVersion(hex) {
  return `"sha256:${hex}"`;
}
function hashOfVersion(version) {
  return /^"sha256:([0-9a-f]{64})"$/.exec(version)?.[1];
}
function settledFileTag(stat2, now = Date.now()) {
  if (now - stat2.ctimeMs < 3e3) return null;
  return [stat2.ino, stat2.ctimeMs, stat2.size].map((n) => n.toString(36)).join("-");
}
function createWriteToken(requestToken) {
  const token = requestToken?.trim();
  return token && token.length <= 200 ? token : randomUUID();
}
function onFileOverwritten(listener) {
  overwriteListeners.add(listener);
  return () => overwriteListeners.delete(listener);
}
function recordFileWriteReceipt(filePath, {
  overwrote,
  path,
  version,
  writeToken
}) {
  const receipt = { path, version, writeToken };
  const absPath = realFilePath(filePath);
  if (overwrote !== void 0)
    for (const listener of overwriteListeners) listener(absPath, receipt.version, overwrote);
  const now = Date.now();
  for (const [path2, list] of receipts) {
    const live = list.filter((entry) => now - entry.recordedAt < RECEIPT_TTL_MS);
    if (live.length > 0) receipts.set(path2, live);
    else receipts.delete(path2);
  }
  const from = overwrote === void 0 ? void 0 : fileContentVersion(overwrote);
  receipts.set(absPath, [
    ...receipts.get(absPath) ?? [],
    { ...receipt, ...from && { from }, recordedAt: now }
  ]);
}
function clearFileWriteReceipt(filePath, version, writeToken) {
  const absPath = realFilePath(filePath);
  const current = (receipts.get(absPath) ?? []).filter(
    (entry) => entry.version !== version || entry.writeToken !== writeToken
  );
  if (current.length > 0) receipts.set(absPath, current);
  else receipts.delete(absPath);
}
function identifyFileWrite(filePath, expectedVersion) {
  const receipt = newestReceipt(realFilePath(filePath), expectedVersion);
  if (!receipt) return null;
  const { path, version, writeToken, from } = receipt;
  return { path, version, writeToken, ...from && { from } };
}
function newestReceipt(absPath, expectedVersion) {
  const now = Date.now();
  pruneReceipts(now);
  const current = (receipts.get(absPath) ?? []).filter(
    (entry) => now - entry.recordedAt < RECEIPT_TTL_MS
  );
  if (current.length > 0) receipts.set(absPath, current);
  else receipts.delete(absPath);
  let receipt;
  for (let i = current.length - 1; i >= 0 && !receipt; i -= 1) {
    if (current[i]?.version === expectedVersion) receipt = current[i];
  }
  return receipt;
}
var consumeFileWriteReceipt = identifyFileWrite;

// ../studio-server/src/history/historyId.ts
import { randomUUID as randomUUID2 } from "crypto";
import { existsSync, mkdirSync, readFileSync as readFileSync2, statSync, writeFileSync } from "fs";
import { basename, join, resolve as resolve2 } from "path";
var ID_PATH = join(".hyperframes", "history-id");
var ID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var isHistoryId = (name) => ID_SHAPE.test(name);
function readId(projectDir) {
  try {
    const id = readFileSync2(join(projectDir, ID_PATH), "utf-8").trim();
    return ID_SHAPE.test(id) ? id : null;
  } catch {
    return null;
  }
}
var sameFolder = (a, b) => a.ino === b.ino && a.birthtimeMs === b.birthtimeMs;
function isRecordedFolder(historyDir, folder) {
  const was = readRecord(historyDir);
  if (typeof was?.ino === "number")
    return sameFolder({ ino: was.ino, birthtimeMs: was.born ?? NaN }, folder);
  const unreadableSo0878KeptTheId = typeof was?.dir !== "string";
  if (unreadableSo0878KeptTheId) return true;
  return !isCopyOf0878Folder(was.dir, basename(historyDir), folder);
}
function readRecord(historyDir) {
  try {
    return JSON.parse(readFileSync2(join(historyDir, "project.json"), "utf-8"));
  } catch {
    return null;
  }
}
function isCopyOf0878Folder(recordedDir, id, folder) {
  let there;
  try {
    there = statSync(recordedDir, { throwIfNoEntry: false });
  } catch {
    return false;
  }
  return !!there && !sameFolder(there, folder) && readId(recordedDir) === id;
}
function projectHistoryId(projectDir, historyRoot) {
  const dir = resolve2(projectDir);
  const folder = statSync(dir);
  let id = readId(dir);
  if (!id && existsSync(join(dir, ID_PATH)))
    throw new HistoryIdError(
      `${join(dir, ID_PATH)} holds no history id this version can read; move it aside to start anew.`
    );
  if (!id || existsSync(join(historyRoot, id)) && !isRecordedFolder(join(historyRoot, id), folder)) {
    id = randomUUID2();
    mkdirWithinProject(dir, join(dir, ".hyperframes"));
    writeFileSync(join(dir, ID_PATH), `${id}
`);
  }
  recordProject(join(historyRoot, id), dir, folder);
  return id;
}
var HistoryIdError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "HistoryIdError";
  }
};
function recordProject(historyDir, dir, folder) {
  const record = { dir, ino: folder.ino, born: folder.birthtimeMs, dev: folder.dev };
  mkdirSync(historyDir, { recursive: true });
  replaceFileAtomically(join(historyDir, "project.json"), JSON.stringify(record), 420);
}

// ../studio-server/src/history/ownerLock.ts
import { randomUUID as randomUUID3 } from "crypto";
import { linkSync, mkdirSync as mkdirSync2, readFileSync as readFileSync3, rmSync, writeFileSync as writeFileSync2 } from "fs";
import { join as join2 } from "path";
var HistoryBusyError = class extends Error {
  constructor(pid) {
    super(`This project's history is open in another process (pid ${pid}).`);
    this.pid = pid;
    this.name = "HistoryBusyError";
  }
  pid;
};
function alive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}
function ownerOf(file) {
  try {
    const text = readFileSync3(file, "utf-8");
    return /^\d+$/.test(text) ? Number(text) : Number.NaN;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
function claim(file) {
  const draft = `${file}-${randomUUID3()}.tmp`;
  writeFileSync2(draft, String(process.pid));
  try {
    linkSync(draft, file);
    return true;
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
    return false;
  } finally {
    rmSync(draft, { force: true });
  }
}
function releaseOwn(file) {
  if (ownerOf(file) === process.pid) rmSync(file, { force: true });
}
function evictDeadOwner(file) {
  const evictor = `${file}.evict`;
  if (!claim(evictor)) {
    const holder = ownerOf(evictor);
    if (holder !== null && !alive(holder)) rmSync(evictor, { force: true });
    return false;
  }
  try {
    const pid = ownerOf(file);
    if (pid !== null && !alive(pid)) rmSync(file, { force: true });
    return true;
  } finally {
    releaseOwn(evictor);
  }
}
async function takeHistoryOwnership(home, waitMs) {
  const file = join2(home, "owner.pid");
  const deadline = Date.now() + waitMs;
  mkdirSync2(home, { recursive: true });
  for (; ; ) {
    if (claim(file)) {
      let held = true;
      return () => {
        if (held) releaseOwn(file);
        held = false;
      };
    }
    const pid = ownerOf(file);
    if (pid === null) continue;
    if (!alive(pid) && evictDeadOwner(file)) continue;
    if (Date.now() >= deadline) throw new HistoryBusyError(pid);
    await new Promise((settle) => setTimeout(settle, 50));
  }
}

// ../studio-server/src/history/pruneHistories.ts
import { randomUUID as randomUUID4 } from "crypto";
import { readdirSync as readdirSync2, readFileSync as readFileSync4, renameSync, statSync as statSync2, writeFileSync as writeFileSync3 } from "fs";
import { lstat, readdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join as join3 } from "path";
var DAY_MS = 24 * 60 * 60 * 1e3;
var KEEP_GONE_PROJECT_HISTORY_MS = 14 * DAY_MS;
var PRUNED_PREFIX = ".pruned-";
var LAST_PRUNE_FILE = ".last-prune";
function listProjectHistories(historyRoot) {
  return namesIn(historyRoot).filter(isHistoryId).flatMap((id) => {
    const home = join3(historyRoot, id);
    const projectDir = readRecord(home)?.dir;
    if (typeof projectDir !== "string" || readId(projectDir) !== id) return [];
    return [{ id, projectDir, lastUsedMs: lastUsed(home) }];
  });
}
function namesIn(historyRoot) {
  try {
    return readdirSync2(historyRoot);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
async function pruneGoneProjectHistories(historyRoot, options = {}) {
  return (await pruneWithin(historyRoot, options)).pruned;
}
async function pruneWithin(historyRoot, {
  now = Date.now(),
  dryRun = false,
  tempDir = tmpdir(),
  onError = (error) => console.warn("[history] could not prune a history:", error),
  budgetMs = Infinity,
  measure = true
}) {
  const started = performance.now();
  const names = namesIn(historyRoot);
  const pruned = [];
  for (const name of names) {
    if (performance.now() - started >= budgetMs) return { pruned, finished: false };
    try {
      const gone = await pruneEntry(historyRoot, name, { now, dryRun, tempDir, measure });
      if (gone) pruned.push(gone);
    } catch (error) {
      onError(error);
    }
  }
  return { pruned, finished: true };
}
async function pruneEntry(historyRoot, name, run) {
  if (name.startsWith(PRUNED_PREFIX)) {
    if (!run.dryRun) await rm(join3(historyRoot, name), { recursive: true, force: true });
    return null;
  }
  return isHistoryId(name) ? pruneOne(historyRoot, name, run) : null;
}
async function pruneOne(historyRoot, id, run) {
  const home = join3(historyRoot, id);
  if (abandonedProject(home, id, run.now, run.tempDir) === null) return null;
  const release = await takeUnlessBusy(home);
  if (!release) return null;
  let taken;
  try {
    taken = recheckAndMoveAway(historyRoot, id, run);
  } catch (error) {
    release();
    throw error;
  }
  if (!taken?.trash) release();
  if (!taken) return null;
  const bytes = await clearAway(taken.trash, home, run.measure);
  return { id, projectDir: taken.projectDir, bytes };
}
async function clearAway(trash, home, measure) {
  const bytes = measure ? await bytesIn(trash ?? home) : 0;
  if (trash) await rm(trash, { recursive: true, force: true });
  return bytes;
}
async function takeUnlessBusy(home) {
  try {
    return await takeHistoryOwnership(home, 0);
  } catch (error) {
    if (error instanceof HistoryBusyError) return null;
    throw error;
  }
}
function recheckAndMoveAway(historyRoot, id, { now, dryRun, tempDir }) {
  const home = join3(historyRoot, id);
  const projectDir = abandonedProject(home, id, now, tempDir);
  if (projectDir === null) return null;
  if (dryRun) return { projectDir, trash: null };
  const trash = join3(historyRoot, `${PRUNED_PREFIX}${id}-${randomUUID4()}`);
  renameSync(home, trash);
  return { projectDir, trash };
}
function abandonedProject(home, id, now, tempDir) {
  const record = readRecord(home);
  const dir = record?.dir;
  if (typeof dir !== "string") return null;
  if (now - lastUsed(home) < KEEP_GONE_PROJECT_HISTORY_MS && !isSafePath(tempDir, dir)) return null;
  return projectGone(dir, id, record?.dev, tempDir) ? dir : null;
}
function projectGone(dir, id, dev, tempDir) {
  if (!statSync2(join3(dir, ID_PATH), { throwIfNoEntry: false }))
    return diskStillHere(dir, dev, tempDir);
  const there = readId(dir);
  return there !== null && there !== id;
}
function diskStillHere(dir, dev, tempDir) {
  let at = dir;
  let stat2 = statSync2(at, { throwIfNoEntry: false });
  while (!stat2) {
    if (dirname(at) === at) return false;
    at = dirname(at);
    stat2 = statSync2(at, { throwIfNoEntry: false });
  }
  if (typeof dev === "number") return stat2.dev === dev;
  return at === dir || isSafePath(tempDir, at);
}
function lastUsed(home) {
  const mtime = (file) => statSync2(join3(home, file), { throwIfNoEntry: false })?.mtimeMs ?? 0;
  return Math.max(mtime("project.json"), mtime("log.jsonl"));
}
async function bytesIn(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join3(dir, entry.name);
    total += entry.isDirectory() ? await bytesIn(path) : (await lstat(path)).size;
  }
  return total;
}
function prunedWithinADay(stamp, now) {
  try {
    const last = Number(readFileSync4(stamp, "utf-8"));
    return last <= now && now - last < DAY_MS;
  } catch {
    return false;
  }
}
var pruning = /* @__PURE__ */ new Set();
function pruneGoneProjectHistoriesDaily(historyRoot, now, { onError, budgetMs } = {}) {
  const stamp = join3(historyRoot, LAST_PRUNE_FILE);
  if (pruning.has(historyRoot) || prunedWithinADay(stamp, now)) return;
  pruning.add(historyRoot);
  setImmediate(() => {
    pruneWithin(historyRoot, { now, onError, budgetMs, measure: false }).then(({ finished }) => finished && writeFileSync3(stamp, String(now))).catch((error) => onError?.(error)).finally(() => pruning.delete(historyRoot));
  });
}

// ../studio-server/src/history/historyLog.ts
import { closeSync, constants, mkdirSync as mkdirSync3, openSync, readFileSync as readFileSync5, writeSync } from "fs";
import { dirname as dirname2 } from "path";
var START = "start";
function parseRecord(line) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}
function readLog(file, onUnreadable) {
  let text;
  try {
    text = readFileSync5(file, "utf-8");
  } catch {
    return null;
  }
  const log = { baseline: /* @__PURE__ */ new Map(), entries: [], pins: /* @__PURE__ */ new Set() };
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    const record = line ? parseRecord(line) : null;
    if (record) applyRecord(log, record);
    else if (line && index < lines.length - 1) onUnreadable(index + 1);
  });
  return log;
}
function applyRecord(log, record) {
  if (record.type === "baseline") {
    log.baseline = new Map(Object.entries(record.files));
    log.keepsLedger = record.keepsLedger === true;
  } else if (record.type === "entry") log.entries.push(record.entry);
  else if (record.pinned) log.pins.add(record.id);
  else log.pins.delete(record.id);
}
function saveRecord(file, log, record) {
  let fd;
  try {
    fd = openSync(file, constants.O_WRONLY | constants.O_APPEND);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return writeLog(file, log);
  }
  try {
    writeSync(fd, `${JSON.stringify(record)}
`);
  } finally {
    closeSync(fd);
  }
}
function baselineRecord(log) {
  return {
    type: "baseline",
    files: Object.fromEntries(log.baseline),
    ...log.keepsLedger && { keepsLedger: true }
  };
}
function writeLog(file, log) {
  const records = [
    baselineRecord(log),
    ...log.entries.map((entry) => ({ type: "entry", entry })),
    ...[...log.pins].map((id) => ({ type: "pin", id, pinned: true }))
  ];
  mkdirSync3(dirname2(file), { recursive: true });
  replaceFileAtomically(file, records.map((r) => `${JSON.stringify(r)}
`).join(""), 420);
}
function applyEntry(manifest, entry, side) {
  for (const file of entry.files) {
    const hash = file[side];
    if (hash === null) manifest.delete(file.path);
    else manifest.set(file.path, hash);
  }
}
function manifestAt(log, point) {
  return point === START ? new Map(log.baseline) : manifestAround(log, point, "after");
}
function manifestAround(log, id, side) {
  const manifest = new Map(log.baseline);
  for (const entry of log.entries) {
    applyEntry(manifest, entry, entry.id === id ? side : "after");
    if (entry.id === id) return manifest;
  }
  return null;
}
function undoneIds(entries) {
  const undone = /* @__PURE__ */ new Set();
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const entry = entries[i];
    if (entry.undoes && !undone.has(entry.id)) undone.add(entry.undoes);
  }
  return undone;
}
function stepTarget(entries, direction, mine) {
  const undone = undoneIds(entries);
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const owns = ownerOf2(entries, byId, mine);
  const newestFirst = [...entries].reverse();
  if (direction === "back")
    return newestFirst.find((entry) => !entry.undoes && !undone.has(entry.id) && owns(entry));
  for (const entry of newestFirst) {
    if (!entry.undoes) {
      if (owns(entry)) return void 0;
      continue;
    }
    const target = byId.get(entry.undoes);
    if (mine(entry) && !undone.has(entry.id) && target && !target.undoes) return entry;
  }
  return void 0;
}
function ownerOf2(entries, byId, mine) {
  const redoneBy = /* @__PURE__ */ new Map();
  for (const entry of entries) {
    const target = entry.undoes ? byId.get(entry.undoes) : void 0;
    if (target?.undoes) redoneBy.set(target.undoes, entry);
  }
  return (entry) => mine(entry) || mine(redoneBy.get(entry.id) ?? entry);
}
function foldOldest(log) {
  const oldest = log.entries[0];
  if (!oldest || log.pins.has(oldest.id)) return false;
  applyEntry(log.baseline, oldest, "after");
  log.entries.shift();
  return true;
}
function referencedHashes(log, current) {
  const keep = /* @__PURE__ */ new Set([...log.baseline.values(), ...current.values()]);
  for (const entry of log.entries)
    for (const file of entry.files) {
      if (file.before) keep.add(file.before);
      if (file.after) keep.add(file.after);
    }
  return keep;
}

// ../studio-server/src/history/projectHistory.ts
import { randomUUID as randomUUID6, createHash as createHash4 } from "crypto";
import { mkdir as mkdir2, readdir as readdir3, rm as rm3, rmdir, writeFile } from "fs/promises";
import {
  existsSync as existsSync2,
  lstatSync as lstatSync2,
  statSync as statSync3,
  mkdirSync as mkdirSync4,
  readdirSync as readdirSync3,
  readFileSync as readFileSync6,
  realpathSync,
  rmSync as rmSync2
} from "fs";
import { homedir } from "os";
import { dirname as dirname4, isAbsolute as isAbsolute2, join as join5, relative as relative2, resolve as resolve3, sep as sep2 } from "path";

// ../studio-server/src/history/blobStore.ts
import { createHash as createHash3, randomUUID as randomUUID5 } from "crypto";
import { constants as constants2, createReadStream, renameSync as renameSync2 } from "fs";
import { copyFile, mkdir, readdir as readdir2, readFile, rename, rm as rm2, stat } from "fs/promises";
import { dirname as dirname3, join as join4 } from "path";
var BLOB_HASH = /^[0-9a-f]{64}$/;
async function hashFile(path) {
  const hash = createHash3("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}
async function cloneOrCopy(from, to, beforeReplace) {
  await mkdir(dirname3(to), { recursive: true });
  const temp = atomicTempPath(to);
  try {
    await copyFile(from, temp, constants2.COPYFILE_FICLONE);
    beforeReplace?.();
    renameSync2(temp, to);
  } catch (error) {
    await rm2(temp, { force: true });
    throw error;
  }
}
async function openBlobStore(dir) {
  const sizes = /* @__PURE__ */ new Map();
  await mkdir(dir, { recursive: true });
  for (const shard of await readdir2(dir))
    for (const hash of await readdir2(join4(dir, shard)).catch(() => []))
      sizes.set(hash, (await stat(join4(dir, shard, hash))).size);
  const pathOf = (hash) => {
    if (!BLOB_HASH.test(hash)) throw new Error("That is not a history blob.");
    return join4(dir, hash.slice(0, 2), hash);
  };
  let total = [...sizes.values()].reduce((sum, size) => sum + size, 0);
  return {
    async put(absPath) {
      const temp = join4(dir, `incoming-${randomUUID5()}`);
      await mkdir(dir, { recursive: true });
      await copyFile(absPath, temp, constants2.COPYFILE_FICLONE);
      const hash = await hashFile(temp);
      if (sizes.has(hash)) {
        await rm2(temp, { force: true });
        return hash;
      }
      await mkdir(dirname3(pathOf(hash)), { recursive: true });
      const size = (await stat(temp)).size;
      await rename(temp, pathOf(hash));
      sizes.set(hash, size);
      total += size;
      return hash;
    },
    has: (hash) => sizes.has(hash),
    read: async (hash) => readFile(pathOf(hash)),
    writeTo: async (hash, absPath, beforeReplace) => cloneOrCopy(pathOf(hash), absPath, beforeReplace),
    bytes: () => total,
    size: (hash) => sizes.get(hash) ?? 0,
    async prune(keep) {
      for (const [hash, size] of sizes) {
        if (keep.has(hash)) continue;
        await rm2(pathOf(hash), { force: true });
        sizes.delete(hash);
        total -= size;
      }
    }
  };
}

// ../studio-server/src/history/projectHistory.ts
var DEFAULT_HISTORY_ROOT = join5(homedir(), ".cache", "hyperframes", "history");
var MAX_WINDOW_IDLE_MS = 10 * 6e4;
var UNDO_MODES = ["just-this", "back-to-before", "keep-later-edits"];
var OUTSIDE = { kind: "outside", name: "Outside" };
var OUTSIDE_LABEL = "Changed outside the app";
var RACY_MS = 2e3;
var statKey = (file, sweptAt) => sweptAt - Math.max(file.mtimeMs, file.ctimeMs) < RACY_MS ? "" : `${file.size}:${file.mtimeMs}:${file.ctimeMs}`;
var MEDIA_LEDGER = ".media/manifest.jsonl";
var KEPT_HIDDEN_PATHS = /* @__PURE__ */ new Set([...STUDIO_SIGNATURE_MANIFEST_PATHS, MEDIA_LEDGER]);
function isHistoryPath(path) {
  if (KEPT_HIDDEN_PATHS.has(path)) return true;
  return !path.split("/").some((segment) => segment.startsWith("."));
}
function withoutHiddenPaths(log) {
  for (const path of log.baseline.keys()) if (!isHistoryPath(path)) log.baseline.delete(path);
  for (const entry of log.entries)
    entry.files = entry.files.filter((file) => isHistoryPath(file.path));
  return log;
}
var historyFiles = (dir) => listProjectFiles(dir).filter((file) => isHistoryPath(file.path));
var COPY_LATER_ABOVE_BYTES = 1024 ** 2;
var sameWho = (a, b) => a.kind === b.kind && a.name === b.name;
function splitAt(change, at, kept) {
  if (at === change.after) return [change, null];
  if (!at || at === change.before || !kept) return [null, change];
  return [
    { ...change, after: at },
    { ...change, before: at }
  ];
}
var isMissingFolder = (error) => ["ENOENT", "ENOTDIR"].includes(error.code ?? "");
async function removeEmptyFolders(dir) {
  let entries;
  try {
    entries = await readdir3(dir, { withFileTypes: true });
  } catch (error) {
    if (isMissingFolder(error)) return;
    throw error;
  }
  for (const entry of entries)
    if (entry.isDirectory()) await removeEmptyFolders(join5(dir, entry.name));
  await rmdir(dir);
}
function fileLeftIn(dir, at, deleted) {
  for (const entry of readdirSync3(dir, { withFileTypes: true })) {
    const path = `${at}/${entry.name}`;
    const left = entry.isDirectory() ? fileLeftIn(join5(dir, entry.name), path, deleted) : deleted.has(path) ? void 0 : path;
    if (left) return left;
  }
  return void 0;
}
function ignoresCase(dir) {
  const self = statSync3(join5(dir, ID_PATH), { throwIfNoEntry: false });
  const other = statSync3(join5(dir, ID_PATH.toUpperCase()), { throwIfNoEntry: false });
  return self !== void 0 && other?.ino === self.ino && other.dev === self.dev;
}
var blocks = (removed, added) => added.startsWith(`${removed}/`) || removed.startsWith(`${added}/`);
var MAX_TIMER_MS = 2 ** 31 - 1;
var takesWrite = (window, at) => window.idleMs === void 0 || at - (window.lastWriteAt ?? at) <= window.idleMs;
function chainBackFrom(byAfter, hash) {
  const chain = /* @__PURE__ */ new Map();
  let at = hash;
  let prior = byAfter?.get(at);
  while (prior !== void 0 && !chain.has(at)) {
    chain.set(at, prior);
    at = prior;
    prior = byAfter?.get(at);
  }
  return chain;
}
function addChange(group, path, before, after) {
  const earlier = group.changes.get(path);
  const from = earlier ? earlier.before : before;
  if (from === after) group.changes.delete(path);
  else group.changes.set(path, { path, before: from, after });
}
var Engine = class {
  constructor(options, projectId, blobs) {
    this.options = options;
    this.projectId = projectId;
    this.blobs = blobs;
    this.dir = resolve3(options.projectDir);
    this.home = join5(options.historyRoot, projectId);
    this.foldsCase = ignoresCase(this.dir);
    const folder = statSync3(this.dir, { throwIfNoEntry: false });
    if (!folder || readId(this.dir) !== projectId || !isRecordedFolder(this.home, folder))
      throw this.replaced();
    this.folder = { dev: folder.dev, ino: folder.ino, birthtimeMs: folder.birthtimeMs };
  }
  options;
  projectId;
  blobs;
  dir;
  foldsCase;
  folder;
  home;
  log = { baseline: /* @__PURE__ */ new Map(), entries: [], pins: /* @__PURE__ */ new Set() };
  tracked = /* @__PURE__ */ new Map();
  windows = [];
  outside = null;
  /** A coalescing claim, open until another key, its idle timer, an operation, a window, or another write. */
  claimed = null;
  adopting = /* @__PURE__ */ new Map();
  /** Per path and hash an API write left, the hash of the bytes it replaced, until walked or written past. */
  overwritten = /* @__PURE__ */ new Map();
  stopHearing;
  writeToken;
  quietTimer;
  maxTimer;
  notedTimer = null;
  listeners = /* @__PURE__ */ new Set();
  tail = Promise.resolve();
  closed = false;
  closing;
  /** A path as the project's disk compares names: folded where `A` and `a` are one name. */
  nameKey(path) {
    return this.foldsCase ? path.toLowerCase() : path;
  }
  get logFile() {
    return join5(this.home, "log.jsonl");
  }
  now() {
    return (this.options.now ?? Date.now)();
  }
  /** One operation at a time, in order: sweeps, windows and undos never interleave. */
  queue(task) {
    if (this.closed)
      return Promise.reject(new HistoryClosedError("This project's history is closed."));
    const run = this.tail.then(task);
    this.tail = run.catch(() => void 0);
    return run;
  }
  /** Another project if the folder or its id changed, or the id is gone: a recreated folder may reuse the inode. */
  whereFolder() {
    const now = statSync3(this.dir, { throwIfNoEntry: false });
    if (!now) return "gone";
    const same = now.dev === this.folder.dev && sameFolder(now, this.folder);
    return same && readId(this.dir) === this.projectId ? "here" : "replaced";
  }
  assertWritable() {
    const folder = this.whereFolder();
    if (folder === "gone") throw new Error(`The project folder is gone: ${this.dir}`);
    if (folder === "replaced") throw this.replaced();
  }
  persistLog(record) {
    if (record) saveRecord(this.logFile, this.log, record);
    else writeLog(this.logFile, this.log);
    if (!existsSync2(join5(this.home, "project.json")))
      recordProject(this.home, this.dir, this.folder);
  }
  replaced() {
    return new HistoryClosedError(`${this.dir} is now another project.`);
  }
  assertOpen() {
    if (this.closed) throw new HistoryClosedError("This project's history is closed.");
    if (this.whereFolder() === "replaced") throw this.replaced();
  }
  async start() {
    const log = readLog(
      this.logFile,
      (line) => this.options.onError?.(
        new Error(`History log line ${line} could not be read and was skipped.`)
      )
    );
    if (!log) return this.firstOpen();
    this.log = withoutHiddenPaths(log);
    if (!this.log.keepsLedger) await this.takeInUnnamedLedger();
    const cache = this.readStatCache();
    const last = this.log.entries.at(-1)?.id ?? START;
    for (const [path, hash] of manifestAt(this.log, last) ?? []) {
      const cached = cache.get(path);
      this.tracked.set(path, { hash, stat: cached?.hash === hash ? cached.stat : "" });
    }
    const left = this.readAdopting();
    const unadopted = (file) => left.has(file.path) && !this.tracked.has(file.path);
    this.adoptMediaInBackground(historyFiles(this.dir).filter(unadopted), this.now());
    this.reopenClosedWindow();
    await this.settleAll();
  }
  hearWrites() {
    const realDir = realFilePath(this.dir);
    this.stopHearing = onFileOverwritten((absPath, version, bytes) => {
      const after = hashOfVersion(version);
      if (!after || !affectsProjectSignature(realDir, absPath)) return;
      const replaced = hashOfVersion(fileContentVersion(bytes));
      if (!replaced || replaced === after) return;
      const path = relative2(realDir, absPath).split(sep2).join("/");
      if (!isHistoryPath(path)) return;
      this.overwritten.set(
        path,
        chainBackFrom(this.overwritten.get(path), replaced).set(after, replaced)
      );
      this.queue(async () => {
        if (!this.blobs.has(replaced)) await this.storeBytes(bytes);
      }).catch((error) => this.options.onError?.(error));
    });
  }
  async storeBytes(bytes) {
    const staged = join5(this.home, `overwrote-${randomUUID6()}`);
    await mkdir2(this.home, { recursive: true });
    await writeFile(staged, bytes);
    try {
      await this.blobs.put(staged);
    } finally {
      await rm3(staged, { force: true });
    }
  }
  /** Read at a state no API write left, with no write heard since `heard`: no walk passes it, so forget the rest. */
  forgetWritesBefore(path, hash, heard) {
    if (this.overwritten.get(path) === heard && !(hash && heard?.has(hash)))
      this.overwritten.delete(path);
  }
  reopenClosedWindow() {
    const closed = this.options.closedWindow;
    if (!closed || this.log.entries.some((entry) => entry.id === closed.id)) return;
    const { id, who, label, startedAt, lastWriteAt, idleMs } = closed;
    this.windows.push({ id, who, label, startedAt, lastWriteAt, idleMs, changes: /* @__PURE__ */ new Map() });
  }
  async takeInUnnamedLedger() {
    const named = (path) => this.log.entries.some((entry) => entry.files.some((file) => file.path === path));
    const listed = () => historyFiles(this.dir).some((file) => file.path === MEDIA_LEDGER);
    const hash = this.log.baseline.has(MEDIA_LEDGER) || named(MEDIA_LEDGER) || !listed() ? null : await this.storeIfPresent(MEDIA_LEDGER);
    if (hash !== null) this.log.baseline.set(MEDIA_LEDGER, hash);
    this.log.keepsLedger = true;
    this.persistLog();
  }
  async firstOpen() {
    const sweptAt = this.now();
    const files = historyFiles(this.dir);
    for (const file of files.filter((file2) => file2.size <= COPY_LATER_ABOVE_BYTES)) {
      const hash = await this.storeIfPresent(file.path);
      if (this.whereFolder() !== "here") throw this.replaced();
      if (hash !== null) this.tracked.set(file.path, { hash, stat: statKey(file, sweptAt) });
    }
    this.log.baseline = this.manifest();
    this.log.keepsLedger = true;
    this.persistLog();
    this.saveStatCache();
    this.adoptMediaInBackground(
      files.filter((file) => file.size > COPY_LATER_ABOVE_BYTES),
      sweptAt
    );
  }
  adoptMediaInBackground(files, sweptAt) {
    let copied = Promise.resolve();
    for (const file of files) {
      copied = copied.then(() => this.adopt(file, sweptAt));
      this.adopting.set(file.path, copied);
    }
    this.saveAdopting();
  }
  saveAdopting() {
    const file = join5(this.home, "adopting.json");
    if (!this.adopting.size) return rmSync2(file, { force: true });
    mkdirSync4(this.home, { recursive: true });
    replaceFileAtomically(file, JSON.stringify([...this.adopting.keys()]), 420);
  }
  async adopt(file, sweptAt) {
    try {
      if (this.whereFolder() !== "here") return;
      const stored = await this.storeIfPresent(file.path);
      await this.queue(async () => {
        await this.recordAdopted(file, sweptAt, stored);
        this.adopting.delete(file.path);
        this.saveAdopting();
      });
    } catch (error) {
      if (!(error instanceof HistoryClosedError)) this.options.onError?.(error);
    }
  }
  async recordAdopted(file, sweptAt, stored) {
    if (stored === null || this.whereFolder() !== "here") return;
    const hash = this.blobs.has(stored) ? stored : await this.storeIfPresent(file.path);
    if (hash === null) return;
    const change = { path: file.path, before: null, after: hash };
    const found = this.overwrittenBy(change, void 0, /* @__PURE__ */ new Set());
    const start = found && this.blobs.has(found) ? found : hash;
    this.tracked.set(file.path, { hash, stat: statKey(file, sweptAt) });
    this.log.baseline.set(file.path, start);
    if (start !== hash) addChange(this.outsideGroup(), file.path, start, hash);
    this.persistLog(baselineRecord(this.log));
    this.saveStatCache();
  }
  manifest() {
    return new Map([...this.tracked].map(([path, file]) => [path, file.hash]));
  }
  readStatCache() {
    try {
      const files = JSON.parse(readFileSync6(join5(this.home, "stat.json"), "utf-8"));
      return new Map(Object.entries(files));
    } catch {
      return /* @__PURE__ */ new Map();
    }
  }
  readAdopting() {
    try {
      return new Set(
        JSON.parse(readFileSync6(join5(this.home, "adopting.json"), "utf-8"))
      );
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }
  saveStatCache() {
    const files = JSON.stringify(Object.fromEntries(this.tracked));
    mkdirSync4(this.home, { recursive: true });
    replaceFileAtomically(join5(this.home, "stat.json"), files, 420);
  }
  /**
   * Takes in every write since the last sweep and files each change to its writer. ponytail: always the whole
   * project (a stat per file, a hash only when the stat moved); per-path sweeps if projects reach tens of thousands.
   */
  async sweep() {
    if (this.whereFolder() !== "here") return;
    const sweptAt = this.now();
    const changedAt = (file) => Math.min(sweptAt, Math.max(file.mtimeMs, file.ctimeMs));
    const seen = historyFiles(this.dir).filter((file) => !this.adopting.has(file.path));
    const heard = new Map(this.overwritten);
    const present = new Set(seen.map((file) => file.path));
    const removed = [...this.tracked.keys()].filter((path) => !present.has(path)).map((path) => {
      const standing = this.standingAt(path);
      return { at: standing ? changedAt(standing.stat) : sweptAt, path, file: null };
    });
    const appearedAt = (file) => Math.max(
      changedAt(file),
      ...removed.filter((gone) => blocks(this.nameKey(gone.path), this.nameKey(file.path))).map((gone) => gone.at)
    );
    const events = [
      ...removed,
      ...seen.map((file) => ({ at: appearedAt(file), path: file.path, file }))
    ].sort((a, b) => a.at - b.at);
    let changed = false;
    for (const { at, path, file } of events) {
      if (file) {
        changed = await this.observe(path, statKey(file, sweptAt), at) || changed;
        continue;
      }
      const known = this.tracked.get(path);
      this.tracked.delete(path);
      this.forgetWritesBefore(path, null, heard.get(path));
      await this.record(path, known.hash, null, at);
      changed = true;
    }
    if (changed) this.saveStatCache();
  }
  /** The file's hash once copied in; null when it was removed before the copy (the next sweep records that). */
  async storeIfPresent(path) {
    try {
      return await this.blobs.put(join5(this.dir, path));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async observe(path, stat2, at) {
    const known = this.tracked.get(path) ?? { hash: null, stat: null };
    if (stat2 && known.stat === stat2) return false;
    const heard = this.overwritten.get(path);
    const hash = await this.storeIfPresent(path);
    if (hash === null || this.whereFolder() !== "here") return false;
    this.tracked.set(path, { hash, stat: stat2 });
    this.forgetWritesBefore(path, hash, heard);
    if (known.hash !== hash) await this.record(path, known.hash, hash, at);
    return known.hash !== hash || known.stat !== stat2;
  }
  async record(path, before, after, at) {
    const endedBeforeThisWrite = this.windows.filter((open) => !takesWrite(open, at));
    if (endedBeforeThisWrite.length) await this.commitOutside();
    for (const window2 of endedBeforeThisWrite) await this.endWindow(window2);
    const window = this.windows.at(-1);
    if (window) this.touch(window, at);
    addChange(window ?? this.outsideGroup(), path, before, after);
  }
  /** ponytail: another's write between Studio's write and its sweep folds into Studio's entry (per-write tokens). */
  async claimNow(who, label, paths, { coalesceKey, idleMs, overwrote = {} }) {
    await this.sweep();
    const taken = await this.takeClaimed(who, paths, overwrote);
    if (!taken.length) return this.claimNothing(coalesceKey);
    const held = this.heldFor(coalesceKey, taken);
    if (!held) await this.commitClaim();
    await this.commitPending();
    const group = held ?? this.newGroup(who, label);
    for (const change of taken) addChange(group, change.path, change.before, change.after);
    if (coalesceKey) return this.holdClaim(group, coalesceKey, idleMs);
    const entry = await this.commit(group);
    return entry && { id: entry.id };
  }
  /** A claim that took nothing still ends a held claim under another key. */
  async claimNothing(coalesceKey) {
    if (coalesceKey !== this.claimed?.key) await this.commitClaim();
    return null;
  }
  /** Commits every other writer's pending changes, oldest first; open windows stay open. */
  async commitPending() {
    await this.commitOutside();
    for (const window of [...this.windows])
      if (window.changes.size) await this.commitCut(window, [...window.changes.keys()]);
  }
  pendingElsewhere() {
    return Boolean(this.outside?.changes.size) || this.windows.some((open) => open.changes.size > 0);
  }
  /** The held claim `taken` continues: same key, each file from its own last change, no held file changed since. */
  heldFor(key, taken) {
    const group = key && this.claimed?.key === key && !this.pendingElsewhere() ? this.claimed.group : null;
    const after = (path, before) => {
      const own = group?.changes.get(path);
      return own ? own.after : before;
    };
    const takenPaths = new Set(taken.map((change) => change.path));
    const untouched = (change) => takenPaths.has(change.path) || (this.tracked.get(change.path)?.hash ?? null) === change.after;
    return group && taken.every((change) => after(change.path, change.before) === change.before) && [...group.changes.values()].every(untouched) ? group : null;
  }
  logPath(path) {
    return relative2(this.dir, resolve3(this.dir, path)).split(sep2).join("/");
  }
  /** Takes `paths`' uncommitted changes from others, cut at what `who` overwrote. */
  async takeClaimed(who, paths, overwrote) {
    const wanted = new Set(paths.map((path) => this.logPath(path)));
    const at = new Map(
      Object.entries(overwrote).map(([path, version]) => [
        this.logPath(path),
        hashOfVersion(version)
      ])
    );
    const others = this.windows.filter((open) => !sameWho(open.who, who));
    const groups = this.outside ? [this.outside, ...others] : others;
    const hits = groups.flatMap(
      (group) => [...group.changes.values()].filter((change) => wanted.has(change.path)).map((change) => ({ group, change }))
    );
    const cuts = [];
    const walked = hits.map(() => /* @__PURE__ */ new Set());
    for (const [i, { change }] of hits.entries()) {
      const told = at.get(change.path);
      cuts.push(this.overwrittenBy(change, told, walked[i]) ?? told);
    }
    hits.forEach(({ change }, i) => this.forgetOverwritten(change.path, walked[i]));
    return hits.flatMap(({ group, change }, i) => this.cutOut(group, change, cuts[i]) ?? []);
  }
  /** Walks the server's writes back from `change.after` to the stored bytes they replaced. */
  overwrittenBy(change, told, seen) {
    let found;
    for (let hash = change.after; hash; ) {
      if (seen.has(hash)) return void 0;
      seen.add(hash);
      const replaced = this.overwritten.get(change.path)?.get(hash);
      if (replaced === void 0) break;
      found = hash = replaced;
      if (hash === change.before || hash === told) return hash;
    }
    return found;
  }
  forgetOverwritten(path, hashes) {
    const byAfter = this.overwritten.get(path);
    for (const hash of hashes) byAfter?.delete(hash);
    if (byAfter?.size === 0) this.overwritten.delete(path);
  }
  cutOut(group, change, cut) {
    const [kept, claimed] = splitAt(change, cut, cut !== void 0 && this.blobs.has(cut));
    group.changes.delete(change.path);
    if (kept) group.changes.set(kept.path, kept);
    return claimed;
  }
  /** Commits the window's cut `paths` as their own entry, other files staying: a window holds one change per file,
   * so the writer's next write to a cut file would otherwise span the claimer's edit. */
  async commitCut(window, paths) {
    const part = { ...this.newGroup(window.who, window.label), startedAt: window.startedAt };
    for (const path of paths) {
      part.changes.set(path, window.changes.get(path));
      window.changes.delete(path);
    }
    (window.parts ??= /* @__PURE__ */ new Set()).add(part.id);
    window.entry = await this.commit(part);
  }
  holdClaim(group, key, idleMs = this.options.quietMs ?? 2e3) {
    clearTimeout(this.claimed?.timer);
    const timer = Number.isFinite(idleMs) ? setTimeout(() => this.background(() => this.commitClaim()), idleMs) : void 0;
    timer?.unref?.();
    group.lastWriteAt = this.now();
    this.claimed = { group, key, timer };
    return group.changes.size ? { id: group.id } : null;
  }
  async commitClaim() {
    const held = this.claimed;
    this.claimed = null;
    if (!held) return;
    clearTimeout(held.timer);
    await this.commit(held.group);
  }
  outsideGroup() {
    const { quietMs = 2e3, maxGroupMs = 3e4 } = this.options;
    const closeIn = (ms) => {
      const timer = setTimeout(() => this.background(() => this.commitOutside()), ms);
      timer.unref?.();
      return timer;
    };
    if (!this.outside) {
      this.outside = this.newGroup(OUTSIDE, OUTSIDE_LABEL);
      this.maxTimer = closeIn(maxGroupMs);
    }
    clearTimeout(this.quietTimer);
    this.quietTimer = closeIn(quietMs);
    return this.outside;
  }
  newGroup(who, label) {
    return { id: randomUUID6(), who, label, startedAt: this.now(), changes: /* @__PURE__ */ new Map() };
  }
  async commitOutside() {
    if (this.outside?.changes.size) await this.commitClaim();
    clearTimeout(this.quietTimer);
    clearTimeout(this.maxTimer);
    const group = this.outside;
    this.outside = null;
    if (group) await this.commit(group);
  }
  async commit(group, extra = {}) {
    const undoesEmptied = this.log.entries.find((entry2) => entry2.id === extra.undoes)?.files.length === 0;
    if (!group.changes.size && !undoesEmptied) return null;
    const pending = this.pendingEntry(group);
    const endedAt = Math.max(pending.endedAt, this.log.entries.at(-1)?.endedAt ?? 0);
    const entry = { ...pending, endedAt, ...extra };
    this.log.entries.push(entry);
    try {
      this.persistLog({ type: "entry", entry });
    } catch (error) {
      this.log.entries.pop();
      throw error;
    }
    for (const listener of this.listeners) listener(entry);
    for (const change of group.changes.values()) {
      const walked = /* @__PURE__ */ new Set();
      this.overwrittenBy(change, void 0, walked);
      this.forgetOverwritten(change.path, walked);
    }
    await this.keepWithinBudget();
    return entry;
  }
  /** Stored bytes beyond what the current files need: a project larger than the budget still keeps its history. */
  historyBytes() {
    let current = 0;
    for (const hash of new Set([...this.tracked.values()].map((file) => file.hash)))
      current += this.blobs.size(hash);
    return this.blobs.bytes() - current;
  }
  async keepWithinBudget() {
    const budget = this.options.budgetBytes ?? 2 * 1024 ** 3;
    let folded = false;
    while (this.historyBytes() > budget) {
      await this.blobs.prune(
        /* @__PURE__ */ new Set([
          ...referencedHashes(this.log, this.manifest()),
          ...this.pendingHashes(),
          ...[...this.overwritten.values()].flatMap((byAfter) => [...byAfter.values()])
        ])
      );
      if (this.historyBytes() <= budget || !foldOldest(this.log)) break;
      folded = true;
    }
    if (folded) this.persistLog();
  }
  /** Hashes only pending changes point at yet, such as a claim's stored cut. */
  pendingHashes() {
    const changes = [...this.windows, this.outside, this.claimed?.group].flatMap((group) => [
      ...group?.changes.values() ?? []
    ]);
    return changes.flatMap((change) => [change.before, change.after]).filter((hash) => hash !== null);
  }
  /** Before an operation or a window: every write is filed and every pending change committed, in write order. */
  async settle() {
    await this.sweep();
    await this.commitClaim();
    await this.commitPending();
  }
  /** A watcher saw a write: one sweep per burst takes it in (a deleted folder is reported by its name alone). */
  noteChange(path) {
    const absolute = resolve3(this.dir, path);
    if (this.notedTimer || !affectsProjectSignature(this.dir, absolute)) return;
    if (!isHistoryPath(relative2(this.dir, absolute).split(sep2).join("/"))) return;
    this.notedTimer = setTimeout(() => {
      this.notedTimer = null;
      this.background(() => this.sweep());
    }, 20);
    this.notedTimer.unref?.();
  }
  background(task) {
    this.queue(task).catch((error) => {
      if (!(error instanceof HistoryClosedError)) this.options.onError?.(error);
    });
  }
  beginWindow(who, label, idleMs) {
    return this.queue(async () => {
      await this.settle();
      const window = { ...this.newGroup(who, label), idleMs };
      this.windows.push(window);
      this.touch(window, this.now());
      const close = () => this.queue(() => this.sweepAndEnd(window));
      return { id: window.id, startedAt: window.startedAt, close };
    });
  }
  /** A window with no write for its idleMs ends, so a close that never comes cannot hold every later write. */
  touch(window, at) {
    window.lastWriteAt = Math.max(window.lastWriteAt ?? at, at);
    this.endWhenIdle(window, window.idleMs);
  }
  endWhenIdle(window, delay) {
    clearTimeout(window.idleTimer);
    if (window.idleMs === void 0 || !Number.isFinite(window.idleMs) || delay === void 0)
      return;
    window.idleTimer = setTimeout(
      () => {
        const left = window.idleMs - (this.now() - (window.lastWriteAt ?? this.now()));
        if (left > 0) this.endWhenIdle(window, left);
        else this.background(() => this.sweepAndEnd(window));
      },
      Math.min(delay, MAX_TIMER_MS)
    );
    window.idleTimer.unref?.();
  }
  async sweepAndEnd(window) {
    await this.sweep();
    return this.endWindow(window);
  }
  /** Commits an open window once; ending it again returns the entry it became. */
  async endWindow(window) {
    if (!this.windows.includes(window)) return window.entry ?? null;
    clearTimeout(window.idleTimer);
    await this.commitClaim();
    this.windows = this.windows.filter((open) => open !== window);
    window.entry = await this.commit(window) ?? window.entry ?? null;
    return window.entry;
  }
  /** Every pending write, open window and outside group, committed: for flush and close. */
  async settleAll() {
    await this.sweep();
    await this.commitClaim();
    for (const window of [...this.windows]) await this.endWindow(window);
    await this.commitOutside();
  }
  /** What took a removed path's place, dating its removal: an entry at the path, or a file at a folder above it. */
  standingAt(path) {
    const parts = path.split("/");
    for (let depth = 1; depth <= parts.length; depth += 1) {
      const at = parts.slice(0, depth).join("/");
      const stat2 = lstatSync2(join5(this.dir, at), { throwIfNoEntry: false });
      if (!stat2) return void 0;
      if (at === path || !stat2.isDirectory()) return { at, stat: stat2 };
    }
    return void 0;
  }
  /** What a write of `path` would have to delete: a file or link at or above it, or a file in a folder at it. */
  inTheWay(path, deleted) {
    const standing = this.standingAt(path);
    if (!standing) return void 0;
    if (standing.stat.isSymbolicLink()) return standing.at;
    if (standing.at === path && !standing.stat.isDirectory()) return void 0;
    const real = realpathSync.native(join5(this.dir, standing.at));
    const at = relative2(realpathSync.native(this.dir), real).split(sep2).join("/");
    if (standing.at !== path) return deleted.has(at) ? void 0 : at;
    return fileLeftIn(real, at, deleted);
  }
  /** Writes `target` (path to hash, null deletes) as one entry of `who`'s. */
  async writeAs(who, label, target, extra) {
    this.assertWritable();
    const changes = [...target].filter(([path, hash]) => (this.tracked.get(path)?.hash ?? null) !== hash).sort(([, a], [, b]) => Number(a !== null) - Number(b !== null));
    const deleted = new Set(changes.filter(([, hash]) => hash === null).map(([path]) => path));
    const blocked = changes.filter(([, hash]) => hash !== null).map(([path]) => this.inTheWay(path, deleted)).find(Boolean);
    if (blocked) throw new Error(`${blocked} is in the way; move or delete it, then try again.`);
    const group = this.newGroup(who, label);
    this.windows.push(group);
    try {
      for (const [path, hash] of changes) await this.writeProjectFile(path, hash);
      await this.sweep();
    } finally {
      this.windows = this.windows.filter((open) => open !== group);
    }
    return this.commit(group, extra);
  }
  /** Writes one project file (null deletes it), first leaving the running operation's receipt for its echo. */
  async writeProjectFile(path, hash) {
    this.assertWritable();
    const absPath = join5(this.dir, path);
    const { writeToken } = this;
    if (writeToken) {
      const version = hash === null ? DELETED_VERSION : hashVersion(hash);
      recordFileWriteReceipt(absPath, { path, version, writeToken });
    }
    if (hash === null) {
      this.assertWritable();
      rmSync2(absPath, { force: true });
    } else {
      await removeEmptyFolders(absPath);
      await this.blobs.writeTo(hash, absPath, () => this.assertWritable());
    }
  }
  entry(id) {
    const entry = this.log.entries.find((candidate) => candidate.id === id);
    if (!entry) throw new Error("That change is no longer kept in this project's history.");
    return entry;
  }
  undoLabel(entry) {
    if (!entry.undoes) return `Undid: ${entry.label}`;
    const original = this.log.entries.find((candidate) => candidate.id === entry.undoes);
    return `Redid: ${original?.label ?? entry.label}`;
  }
  async undoNow(id, who, mode) {
    const entry = this.entry(id);
    const changed = this.movedOn(entry);
    if (changed.length && !mode) return { ok: false, conflict: this.conflict(entry, changed) };
    if (mode === "back-to-before") {
      const index = this.log.entries.indexOf(entry);
      const point = index > 0 ? this.log.entries[index - 1].id : START;
      return {
        ok: true,
        entry: await this.restoreNow(point, who, `Went back to before: ${entry.label}`)
      };
    }
    const target = new Map(
      entry.files.filter((file) => mode !== "keep-later-edits" || !changed.includes(file)).map((file) => [file.path, file.before])
    );
    return {
      ok: true,
      entry: await this.writeAs(who, this.undoLabel(entry), target, { undoes: id })
    };
  }
  movedOn(entry) {
    return entry.files.filter((file) => (this.tracked.get(file.path)?.hash ?? null) !== file.after);
  }
  next(direction, who) {
    const mine = (author) => sameWho(author, who) || sameWho(author, OUTSIDE);
    const pending = [...[...this.windows].reverse(), this.outside, this.claimed?.group].find(
      (group) => group?.changes.size && mine(group.who)
    );
    if (pending) return direction === "back" ? this.pendingEntry(pending) : void 0;
    const everyone = this.options.undoScope === "everyone";
    const ofOpenTurn = (entry) => this.windows.some((open) => open.parts?.has(entry.id));
    return stepTarget(
      this.log.entries,
      direction,
      (entry) => entry.files.length > 0 && (mine(entry.who) || everyone && !ofOpenTurn(entry))
    );
  }
  /** A pending group as the entry it becomes once committed (a window's part gets a fresh id). */
  pendingEntry(group) {
    const files = [...group.changes.values()].sort((a, b) => a.path.localeCompare(b.path));
    const { id, who, label, startedAt, lastWriteAt } = group;
    return { id, who, label, startedAt, endedAt: lastWriteAt ?? this.now(), files };
  }
  conflict(entry, changed) {
    const paths = new Set(changed.map((file) => file.path));
    const after = this.log.entries.slice(this.log.entries.indexOf(entry) + 1);
    const newer = after.filter((later) => later.files.some((file) => paths.has(file.path)));
    return { files: [...paths], newer: newer.map((later) => later.id) };
  }
  async restoreNow(point, who, label) {
    const files = manifestAt(this.log, point);
    if (!files) throw new Error("That point is no longer kept in this project's history.");
    const target = new Map(
      [...this.tracked.keys()].map((path) => [path, null])
    );
    for (const [path, hash] of files) target.set(path, hash);
    return this.writeAs(who, label, target, { restoredTo: point });
  }
  /** Settles, then runs `task` with its writes labelled `writeToken`. */
  operation(writeToken, task) {
    return this.queue(async () => {
      await this.settle();
      this.writeToken = writeToken;
      try {
        return await task();
      } finally {
        this.writeToken = void 0;
      }
    });
  }
  pointLabel(point) {
    return point === START ? "the start" : this.entry(point).label;
  }
  /** Adopt old snapshots without replaying writes into the live project. */
  async importLegacyStudio(undo, redo, who) {
    this.assertWritable();
    const originals = [...undo, ...[...redo].reverse()];
    if (!originals.length) return;
    if (originals.length > 200 || Buffer.byteLength(JSON.stringify(originals)) > 16 * 1024 * 1024)
      throw new Error("Legacy history exceeds the migration budget.");
    const ids = /* @__PURE__ */ new Set();
    const first = /* @__PURE__ */ new Map();
    const last = /* @__PURE__ */ new Map();
    const entries = [];
    const snapshots = /* @__PURE__ */ new Map();
    const hash = (content) => createHash4("sha256").update(content).digest("hex");
    for (const original of originals) {
      const id = "ipw-legacy:" + original.id;
      if (ids.has(id)) throw new Error("Duplicate legacy history entry.");
      ids.add(id);
      const files = [];
      for (const [file, content] of Object.entries(original.files)) {
        const normalized = this.logPath(file);
        if (normalized !== file || /[\\:\u0000]/.test(file) || file.startsWith("/") || file.split("/").some((segment) => !segment || segment === "." || segment === "..") || !isHistoryPath(file) || file === MEDIA_LEDGER)
          throw new Error("Legacy history contains an unsupported path.");
        const before = hash(content.before), after = hash(content.after);
        if (last.has(file) && last.get(file) !== before)
          throw new Error("Legacy history snapshots are not contiguous.");
        if (!first.has(file)) first.set(file, before);
        last.set(file, after);
        snapshots.set(before, content.before);
        snapshots.set(after, content.after);
        files.push({ path: file, before, after });
      }
      entries.push({
        id,
        who,
        label: original.label,
        startedAt: original.createdAt,
        endedAt: original.createdAt,
        files
      });
    }
    for (const original of redo) {
      const undoes = "ipw-legacy:" + original.id;
      const entry = entries.find((candidate) => candidate.id === undoes);
      const files = entry.files.map((file) => ({ path: file.path, before: file.after, after: file.before }));
      for (const file of files) {
        if (last.get(file.path) !== file.before) throw new Error("Legacy redo snapshots are not contiguous.");
        last.set(file.path, file.after);
      }
      entries.push({
        id: "ipw-legacy-undo:" + original.id,
        undoes,
        who,
        label: "Undo: " + entry.label,
        startedAt: entry.endedAt,
        endedAt: entry.endedAt,
        files
      });
    }
    const existing = new Set(this.log.entries.map((entry) => entry.id));
    if (entries.every((entry) => existing.has(entry.id))) return;
    if (entries.some((entry) => existing.has(entry.id))) throw new Error("Legacy history was partially imported.");
    for (const [file, after] of last) {
      if (this.log.baseline.get(file) !== after) throw new Error("Legacy history does not match the project's baseline.");
    }
    for (const [hash2, bytes] of snapshots) if (!this.blobs.has(hash2)) await this.storeBytes(bytes);
    const previous = this.log;
    const baseline = new Map(previous.baseline);
    for (const [file, before] of first) baseline.set(file, before);
    this.log = { ...previous, baseline, entries: [...entries, ...previous.entries] };
    try {
      this.persistLog();
    } catch (error) {
      this.log = previous;
      throw error;
    }
  }
  api() {
    return {
      projectId: this.projectId,
      importLegacyStudio: (undo, redo, who) => this.operation(void 0, () => this.importLegacyStudio(undo, redo, who)),
      beginWindow: (who, label, options = {}) => this.beginWindow(who, label, options.idleMs ?? this.options.maxGroupMs ?? 3e4),
      claim: async (who, label, paths, options = {}) => {
        await Promise.all(paths.map((path) => this.adopting.get(this.logPath(path))));
        return this.queue(() => this.claimNow(who, label, paths, options));
      },
      noteChange: (path) => {
        if (!this.closed) this.noteChange(path);
      },
      list: () => {
        this.assertOpen();
        const undone = undoneIds(this.log.entries);
        return this.log.entries.map((entry) => ({
          ...entry,
          pinned: this.log.pins.has(entry.id),
          undone: undone.has(entry.id)
        }));
      },
      step: (direction, who, { writeToken } = {}) => this.operation(writeToken, async () => {
        const target = this.next(direction, who);
        return target ? this.undoNow(target.id, who) : { ok: true, entry: null };
      }),
      undo: (id, { who, mode, writeToken }) => this.operation(writeToken, () => this.undoNow(id, who, mode)),
      restore: (point, who, { writeToken } = {}) => this.operation(
        writeToken,
        () => this.restoreNow(point, who, `Restored: ${this.pointLabel(point)}`)
      ),
      peek: (point) => {
        this.assertOpen();
        const files = manifestAt(this.log, point);
        return files && Object.fromEntries(files);
      },
      checkout: (entryId, side, emptyDir) => this.queue(async () => {
        this.entry(entryId);
        if (!existsSync2(this.dir)) throw new Error(`The project folder is gone: ${this.dir}`);
        const dest = resolve3(emptyDir);
        if (isWithin(this.dir, dest))
          throw new Error(`Checkout writes outside the project only: ${dest}`);
        if ((await readdir3(dest).catch(missingIsEmpty)).length > 0)
          throw new Error(`Checkout writes into an empty folder only: ${dest}`);
        const files = manifestAround(this.log, entryId, side);
        try {
          for (const [path, hash] of files) await this.blobs.writeTo(hash, join5(dest, path));
        } catch (error) {
          for (const name of await readdir3(dest).catch(() => []))
            await rm3(join5(dest, name), { recursive: true, force: true });
          throw error;
        }
      }),
      next: (direction, who) => {
        this.assertOpen();
        return this.next(direction, who);
      },
      readBlob: async (hash) => {
        this.assertOpen();
        return this.blobs.read(hash);
      },
      pin: (id, pinned) => {
        this.assertOpen();
        this.entry(id);
        if (pinned) this.log.pins.add(id);
        else this.log.pins.delete(id);
        this.persistLog({ type: "pin", id, pinned });
      },
      onEntry: (listener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      },
      flush: () => this.queue(() => this.settleAll()),
      replacedAtPath: () => this.whereFolder() === "replaced",
      close: () => this.closing ??= (async () => {
        await Promise.all(this.adopting.values());
        if (this.notedTimer) clearTimeout(this.notedTimer);
        this.stopHearing?.();
        const settled = this.queue(() => this.settleAll());
        this.closed = true;
        await settled;
      })()
    };
  }
};
function isWithin(dir, path) {
  let probe = resolve3(path);
  while (!existsSync2(probe) && dirname4(probe) !== probe) probe = dirname4(probe);
  const rel = relative2(realpathSync.native(dir), realpathSync.native(probe));
  return rel === "" || rel !== ".." && !rel.startsWith(`..${sep2}`) && !isAbsolute2(rel);
}
function missingIsEmpty(error) {
  if (error.code === "ENOENT") return [];
  throw error;
}
var HistoryClosedError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "HistoryClosedError";
  }
};
async function openProjectHistory(options) {
  if (!existsSync2(options.projectDir))
    throw new HistoryClosedError(`${options.projectDir} is gone or now another project.`);
  const projectId = projectHistoryId(options.projectDir, options.historyRoot);
  const release = await takeHistoryOwnership(
    join5(options.historyRoot, projectId),
    options.ownerWaitMs ?? 5e3
  );
  try {
    const blobs = await openBlobStore(join5(options.historyRoot, projectId, "blobs"));
    const engine = new Engine(options, projectId, blobs);
    await engine.queue(async () => {
      await engine.start();
      engine.hearWrites();
    });
    pruneGoneProjectHistoriesDaily(options.historyRoot, engine.now(), {
      onError: options.onError,
      budgetMs: options.pruneGoneProjectsBudgetMs
    });
    const api = engine.api();
    return {
      ...api,
      close: () => api.close().finally(release)
    };
  } catch (error) {
    release();
    throw error;
  }
}

// ../studio-server/src/history/historyCache.ts
function historyCache(open) {
  const histories = /* @__PURE__ */ new Map();
  const get = async (projectDir) => {
    let cached = histories.get(projectDir);
    if (!cached) histories.set(projectDir, cached = open(projectDir));
    const opened = await cached;
    if (!opened?.replacedAtPath()) return opened;
    const reopen = () => open(projectDir);
    if (histories.get(projectDir) === cached)
      histories.set(projectDir, opened.close().then(reopen, reopen));
    return get(projectDir);
  };
  return {
    get,
    /** The history if one was opened, without opening it. */
    peek: (projectDir) => histories.get(projectDir),
    forget: (projectDir) => histories.delete(projectDir),
    closeAll: () => Promise.all(
      [...histories.values()].map((opened) => opened.then((history) => history?.close()))
    )
  };
}

export {
  STUDIO_SIGNATURE_MANIFEST_PATHS,
  affectsProjectSignature,
  resolveProjectSignature,
  resolveProjectAndSignature,
  createProjectSignature,
  fileContentVersion,
  DELETED_VERSION,
  settledFileTag,
  createWriteToken,
  recordFileWriteReceipt,
  clearFileWriteReceipt,
  identifyFileWrite,
  consumeFileWriteReceipt,
  HistoryIdError,
  HistoryBusyError,
  listProjectHistories,
  pruneGoneProjectHistories,
  START,
  DEFAULT_HISTORY_ROOT,
  MAX_WINDOW_IDLE_MS,
  UNDO_MODES,
  HistoryClosedError,
  openProjectHistory,
  historyCache
};
