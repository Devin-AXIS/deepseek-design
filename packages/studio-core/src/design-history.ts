/** File-scoped HTML history. Ordinary Agent turns never read or restore Design files. */
import { createHash, randomUUID } from "node:crypto";
import {
  link,
  readFile,
  readdir,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { basename, dirname } from "node:path";
import { templateManifestV1Schema } from "./original/types/src/templates.ts";
import { StudioError } from "./errors.ts";
import {
  errorCode,
  readStudioText,
  safeRelativePath,
  verifiedExistingPath,
  verifiedWritePath,
  writeStudioText,
} from "./http.ts";
import type { DesignStudioHistory } from "./original/design-studio/src/host.ts";

const sessionPattern = /^[A-Za-z0-9_-]{1,128}$/;
type HistoryState = DesignStudioHistory & { selectionRevision: number };

/** Snapshots and selections belong to a file, including when several files share a directory. */
export class DesignHistory {
  private closed = false;
  private readonly queues = new Map<string, Promise<unknown>>();
  private readonly selections = new Map<string, string>();
  private readonly revisions = new Map<string, number>();
  constructor(
    private readonly maxBytes: number,
    private readonly boundEntry?: (
      root: string,
      sessionId: string,
    ) => Promise<string | undefined>,
  ) {}

  private async target(root: string, sessionId: string, requested?: string) {
    if (!sessionPattern.test(sessionId))
      throw new StudioError(
        "STUDIO_HISTORY_SESSION",
        "Invalid Design session.",
      );
    let entry = requested ?? (await this.boundEntry?.(root, sessionId));
    const managed = entry?.match(/^design\/([^/]+)\/[^/]+\.html?$/i);
    const owner = managed?.[1] ?? sessionId;
    let canonical: string | undefined;
    try {
      const path = await verifiedExistingPath(
        root,
        `design/${owner}/manifest.json`,
        `design/${owner}`,
        "Design",
      );
      const manifest = templateManifestV1Schema.parse(
        JSON.parse(await readFile(path, "utf8")),
      );
      if (manifest.surface === "design" && manifest.category !== "slides")
        canonical = `design/${owner}/${manifest.entry}`;
      else if (!entry || entry === `design/${owner}/${manifest.entry}`)
        return undefined;
    } catch (error) {
      if (!missing(error)) throw error;
    }
    entry ??= canonical;
    if (!entry) return undefined;
    const prefix =
      entry === canonical
        ? `design/.versions/${owner}`
        : `design/.versions/documents/${createHash("sha256").update(entry).digest("hex")}`;
    return {
      entry,
      prefix,
      key: `${root}\0${entry}`,
      selectionKey: `${root}\0${sessionId}\0${entry}`,
    };
  }
  private queue<T>(key: string, operation: () => Promise<T>): Promise<T> {
    if (this.closed)
      return Promise.reject(
        new StudioError("STUDIO_CLOSED", "Design history has been unloaded."),
      );
    const task = (this.queues.get(key) ?? Promise.resolve())
      .catch(() => undefined)
      .then(operation);
    this.queues.set(key, task);
    void task
      .finally(() => {
        if (this.queues.get(key) === task) this.queues.delete(key);
      })
      .catch(() => undefined);
    return task;
  }
  private async entries(root: string, prefix: string) {
    let directory: string;
    try {
      directory = await verifiedExistingPath(
        root,
        prefix,
        prefix,
        "Design history",
      );
    } catch (error) {
      if (missing(error)) return [];
      throw error;
    }
    const result: DesignStudioHistory["versions"] = [];
    for (const item of await readdir(directory, { withFileTypes: true })) {
      if (!item.isFile() || !/\.html?$/i.test(item.name)) continue;
      const path = `${prefix}/${item.name}`;
      const info = await stat(
        await verifiedExistingPath(root, path, prefix, "Design history"),
      );
      result.push({
        path,
        kind: "file",
        size: info.size,
        mtimeMs: info.mtimeMs,
        revision: `${info.mtimeMs}-${info.size}`,
      });
    }
    return result.sort(
      (a, b) => b.mtimeMs - a.mtimeMs || b.path.localeCompare(a.path),
    );
  }
  private selectPath(key: string, path: string) {
    if ((this.selections.get(key) ?? "current") === path) return;
    this.selections.set(key, path);
    this.revisions.set(key, (this.revisions.get(key) ?? 0) + 1);
  }
  /** Read a file's history; selection only changes the preview until resume is requested. */
  async read(
    root: string,
    sessionId: string,
    entry?: string,
  ): Promise<HistoryState> {
    const target = await this.target(root, sessionId, entry);
    if (!target)
      return {
        versions: [],
        generation: "",
        selectedPath: "current",
        selectionRevision: 0,
      };
    return this.queue(target.key, async () => {
      const versions = await this.entries(root, target.prefix);
      return {
        versions,
        generation: versions[0]?.path ?? "",
        selectedPath: this.selections.get(target.selectionKey) ?? "current",
        selectionRevision: this.revisions.get(target.selectionKey) ?? 0,
      };
    });
  }
  /** Remove a preview selection without touching document bytes. */
  async resetSelection(
    root: string,
    sessionId: string,
    entry?: string,
  ): Promise<void> {
    const target = await this.target(root, sessionId, entry);
    if (target)
      await this.queue(target.key, async () => {
        this.selectPath(target.selectionKey, "current");
      });
  }
  /** Select a snapshot for preview, rejecting snapshots from another document. */
  async select(
    root: string,
    sessionId: string,
    path: string,
    entry?: string,
  ): Promise<HistoryState> {
    const target = await this.target(root, sessionId, entry);
    if (!target)
      throw new StudioError(
        "STUDIO_HISTORY_CATEGORY",
        "Version history is available for HTML designs.",
      );
    await this.queue(target.key, async () => {
      if (path !== "current") {
        safeRelativePath(path, target.prefix, "Design history");
        if (dirname(path) !== target.prefix || !/\.html?$/i.test(path))
          throw new StudioError(
            "STUDIO_HISTORY_PATH",
            "Select a version of this document.",
          );
        await verifiedExistingPath(root, path, target.prefix, "Design history");
      }
      this.selectPath(target.selectionKey, path);
    });
    return this.read(root, sessionId, target.entry);
  }
  /** Capture only changed HTML. File watchers and explicit Design writes call this, never Agent turns. */
  async capture(
    root: string,
    sessionId: string,
    entry?: string,
  ): Promise<void> {
    const target = await this.target(root, sessionId, entry);
    if (target)
      await this.queue(target.key, () => this.captureTarget(root, target));
  }
  private async captureTarget(
    root: string,
    target: { entry: string; prefix: string },
  ) {
    const current = await readStudioText({
      root,
      requested: target.entry,
      prefix: target.entry,
      studioTitle: "Design",
      maxBytes: this.maxBytes,
    });
    const entries = await this.entries(root, target.prefix);
    if (entries[0]) {
      const latest = await readStudioText({
        root,
        requested: entries[0].path,
        prefix: target.prefix,
        studioTitle: "Design history",
        maxBytes: this.maxBytes,
      });
      if (latest.content === current.content) return;
    }
    const hash = createHash("sha256")
      .update(current.content)
      .digest("hex")
      .slice(0, 16);
    const path = `${target.prefix}/version-${String(Date.now()).padStart(16, "0")}-${randomUUID().slice(0, 8)}-${hash}.html`;
    const file = await verifiedWritePath(
      root,
      path,
      target.prefix,
      "Design history",
    );
    const temporary = `${dirname(file)}/.${basename(file)}.tmp`;
    try {
      await writeFile(temporary, current.content, { flag: "wx" });
      await link(temporary, file);
    } finally {
      await unlink(temporary).catch((error) => {
        if (errorCode(error) !== "ENOENT") throw error;
      });
    }
  }
  /** Explicitly resume a previewed version after preserving the latest current document. */
  async resume(root: string, sessionId: string, entry?: string): Promise<void> {
    const target = await this.target(root, sessionId, entry);
    if (!target) return;
    await this.queue(target.key, async () => {
      const selected = this.selections.get(target.selectionKey) ?? "current";
      if (selected === "current") return;
      await this.captureTarget(root, target);
      const current = await readStudioText({
        root,
        requested: target.entry,
        prefix: target.entry,
        studioTitle: "Design",
        maxBytes: this.maxBytes,
      });
      const source = await readStudioText({
        root,
        requested: selected,
        prefix: target.prefix,
        studioTitle: "Design history",
        maxBytes: this.maxBytes,
      });
      await writeStudioText({
        root,
        requested: target.entry,
        prefix: target.entry,
        studioTitle: "Design",
        maxBytes: this.maxBytes,
        content: source.content,
        baseUpdatedAt: current.updatedAt,
      });
      this.selectPath(target.selectionKey, "current");
    });
  }
  /** Stop new work, then drain admitted captures before releasing selections. */
  stop() {
    this.closed = true;
  }
  async dispose() {
    this.stop();
    await Promise.allSettled(this.queues.values());
    this.selections.clear();
    this.revisions.clear();
  }
}
function missing(error: unknown) {
  return (
    errorCode(error) === "ENOENT" ||
    (error instanceof Error && "status" in error && error.status === 404)
  );
}
