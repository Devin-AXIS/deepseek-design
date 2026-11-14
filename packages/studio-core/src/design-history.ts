/** File-scoped HTML versions; preview selection never restores a file implicitly. */
import { parse, type DefaultTreeAdapterTypes } from "parse5";
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

/** Empty scaffolding has no user-visible Design version. */
export function hasDesignContent(html: string): boolean {
  const visit = (node: DefaultTreeAdapterTypes.Node, inBody = false): boolean => {
    if (node.nodeName === "#text") return inBody && "value" in node && node.value.trim().length > 0;
    const tag = "tagName" in node ? node.tagName : "";
    if (["script", "style", "template", "noscript", "head"].includes(tag)) return false;
    const body = inBody || tag === "body";
    if (body && ["img", "svg", "canvas", "video", "audio", "iframe", "input", "textarea"].includes(tag)) return true;
    if (body && "attrs" in node && node.attrs.some(attr => ["class", "style"].includes(attr.name) && attr.value.trim())) return true;
    return "childNodes" in node && node.childNodes.some(child => visit(child, body));
  };
  return visit(parse(html));
}

const sessionPattern = /^[A-Za-z0-9_-]{1,128}$/;
type HistoryState = DesignStudioHistory & { selectionRevision: number };

/** Snapshots and selections belong to a file, including when several files share a directory. */
export class DesignHistory {
  private closed = false;
  private readonly queues = new Map<string, Promise<unknown>>();
  private readonly selections = new Map<string, string>();
  private readonly revisions = new Map<string, number>();
  private readonly aiSessions = new Map<string, Set<string>>();
  private readonly contentPresence = new Map<string, { revision: string; meaningful: boolean }>();
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
      const revision = `${info.mtimeMs}-${info.size}`;
      let presence = this.contentPresence.get(`${root}\0${path}`);
      if (presence?.revision !== revision) {
        presence = { revision, meaningful: hasDesignContent(await readFile(await verifiedExistingPath(root, path, prefix, "Design history"), "utf8")) };
        this.contentPresence.set(`${root}\0${path}`, presence);
      }
      if (!presence.meaningful) continue;
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
        currentVersion: 0,
      };
    return this.queue(target.key, async () => {
      const versions = await this.entries(root, target.prefix);
      let current = "";
      try { current = (await readStudioText({ root, requested: target.entry, prefix: target.entry, studioTitle: "Design", maxBytes: this.maxBytes })).content; }
      catch (error) { if (!missing(error)) throw error; }
      const latest = versions[0];
      const latestContent = latest ? (await readStudioText({ root, requested: latest.path, prefix: target.prefix, studioTitle: "Design history", maxBytes: this.maxBytes })).content : undefined;
      const matches = latestContent === current;
      const selected = this.selections.get(target.selectionKey) ?? "current";
      return {
        versions: matches ? versions.slice(1) : versions,
        generation: latest ? `${latest.path}:${latest.revision}` : "",
        selectedPath: matches && selected === latest?.path ? "current" : selected,
        selectionRevision: this.revisions.get(target.selectionKey) ?? 0,
        currentVersion: versions.length + (hasDesignContent(current) && !matches ? 1 : 0),
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
  /** Mark an active AI turn without reading or changing the document. */
  beginAi(root: string, sessionId: string, entry?: string): void {
    this.aiSessions.set(`${root}\0${sessionId}`, new Set(entry ? [entry] : []));
  }
  /** Watchers refresh manual saves without creating versions during AI generation. */
  async observe(root: string, sessionId: string, entry: string): Promise<void> {
    const session = this.aiSessions.get(`${root}\0${sessionId}`);
    if (session) { session.add(entry); return; }
    if ([...this.aiSessions.entries()].some(([key, paths]) => key.startsWith(`${root}\0`) && paths.has(entry))) return;
    await this.synchronize(root, sessionId, entry);
  }
  /** Finalize changed AI content once per document when a turn ends or is cancelled. */
  async finishAi(root: string, sessionId: string, entry?: string): Promise<void> {
    const key = `${root}\0${sessionId}`;
    const paths = this.aiSessions.get(key);
    if (!paths) return;
    if (entry) paths.add(entry);
    try { for (const path of paths) await this.capture(root, sessionId, path); }
    finally { if (this.aiSessions.get(key) === paths) this.aiSessions.delete(key); }
  }
  /** Preserve pending AI content before an explicit manual write. */
  async prepareManualWrite(root: string, sessionId: string, entry: string): Promise<void> {
    if (this.aiSessions.has(`${root}\0${sessionId}`)) await this.capture(root, sessionId, entry);
    else await this.synchronize(root, sessionId, entry);
  }
  /** Capture an AI result once; unchanged or empty HTML creates no version. */
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
    if (!hasDesignContent(current.content)) return;
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
  /** Save manual edits into the latest version without adding a version. */
  async synchronize(root: string, sessionId: string, entry?: string): Promise<void> {
    const target = await this.target(root, sessionId, entry);
    if (!target) return;
    await this.queue(target.key, async () => {
      const current = await readStudioText({ root, requested: target.entry, prefix: target.entry, studioTitle: "Design", maxBytes: this.maxBytes });
      if (!hasDesignContent(current.content)) return;
      const latest = (await this.entries(root, target.prefix))[0];
      if (!latest) return this.captureTarget(root, target);
      const previous = await readStudioText({ root, requested: latest.path, prefix: target.prefix, studioTitle: "Design history", maxBytes: this.maxBytes });
      if (previous.content !== current.content) await writeStudioText({ root, requested: latest.path, prefix: target.prefix, studioTitle: "Design history", maxBytes: this.maxBytes, content: current.content, baseUpdatedAt: previous.updatedAt });
    });
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
    this.contentPresence.clear();
    this.aiSessions.clear();
  }
}
function missing(error: unknown) {
  return (
    errorCode(error) === "ENOENT" ||
    (error instanceof Error && "status" in error && error.status === 404)
  );
}
