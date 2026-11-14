/** Workspace-owned HTML versions captured before native DSH user turns. */
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
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-agent";
import type {} from "@deepseek-ai/dsh-sandbox-policy";
import type {} from "@deepseek-ai/dsh-workspace";
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

/** One admitted user-message batch; retries retain these message identities. */
export interface HistoryAdmission {
  turn: number;
  step: number;
  messageIds: readonly string[];
}

/** Own version selections and drain admitted snapshots before plugin unload. */
export class DesignHistory {
  private closed = false;
  private readonly controller = new AbortController();
  private readonly selections = new Map<string, string>();
  private readonly selectionRevisions = new Map<string, number>();
  private readonly preparedBatches = new Map<string, Set<string>>();
  private readonly reads = new Map<string, Promise<HistoryState>>();
  private readonly queues = new Map<string, Promise<unknown>>();
  constructor(
    private readonly maxBytes: number,
    private readonly boundEntry?: (
      root: string,
      sessionId: string,
    ) => Promise<string | undefined>,
  ) {}

  private key(root: string, sessionId: string) {
    if (!sessionPattern.test(sessionId))
      throw new StudioError(
        "STUDIO_HISTORY_SESSION",
        "Invalid Design session.",
      );
    return `${root}\0${sessionId}`;
  }
  private queue<T>(key: string, action: () => Promise<T>): Promise<T> {
    if (this.closed)
      return Promise.reject(
        new StudioError("STUDIO_CLOSED", "Design history has been unloaded."),
      );
    const task = (this.queues.get(key) ?? Promise.resolve())
      .catch(() => undefined)
      .then(() => {
        this.controller.signal.throwIfAborted();
        return action();
      });
    this.queues.set(key, task);
    void task
      .finally(() => {
        if (this.queues.get(key) === task) this.queues.delete(key);
      })
      .catch(() => undefined);
    return task;
  }
  private async htmlProject(root: string, sessionId: string) {
    const bound = await this.boundEntry?.(root, sessionId);
    if (bound && !bound.startsWith(`design/${sessionId}/`)) return bound;
    const requested = `design/${sessionId}/manifest.json`;
    let path: string;
    try {
      path = await verifiedExistingPath(
        root,
        requested,
        `design/${sessionId}`,
        "Design",
      );
    } catch (error) {
      if (
        errorCode(error) === "ENOENT" ||
        (error instanceof Error && "status" in error && error.status === 404)
      )
        return undefined;
      throw error;
    }
    const manifest = templateManifestV1Schema.parse(
      JSON.parse(await readFile(path, "utf8")),
    );
    if (
      manifest.surface !== "design" ||
      (manifest.category !== "site" && manifest.category !== "app")
    )
      return undefined;
    return safeRelativePath(
      bound ?? `design/${sessionId}/${manifest.entry}`,
      `design/${sessionId}`,
      "Design",
    );
  }
  private async prefix(root: string, sessionId: string): Promise<string> {
    const entry = await this.boundEntry?.(root, sessionId);
    return entry && !entry.startsWith(`design/${sessionId}/`)
      ? `design/.versions/${sessionId}/documents/${createHash("sha256").update(entry).digest("hex")}`
      : `design/.versions/${sessionId}`;
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
      if (
        errorCode(error) === "ENOENT" ||
        (error instanceof Error && "status" in error && error.status === 404)
      )
        return [];
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
    return result.sort((a, b) => b.path.localeCompare(a.path));
  }
  private selectPath(key: string, path: string): void {
    if ((this.selections.get(key) ?? "current") === path) return;
    this.selections.set(key, path);
    this.selectionRevisions.set(
      key,
      (this.selectionRevisions.get(key) ?? 0) + 1,
    );
  }
  private async state(
    root: string,
    sessionId: string,
    key: string,
  ): Promise<HistoryState> {
    const prefix = await this.prefix(root, sessionId);
    const selectionKey = `${key}\0${prefix}`;
    const versions = (await this.htmlProject(root, sessionId))
      ? await this.entries(root, prefix)
      : [];
    return {
      versions,
      generation: versions[0]?.path ?? "",
      selectedPath: this.selections.get(selectionKey) ?? "current",
      selectionRevision: this.selectionRevisions.get(selectionKey) ?? 0,
    };
  }
  /** Coalesce concurrent readers; each later poll observes current filesystem metadata. */
  read(root: string, sessionId: string): Promise<HistoryState> {
    const key = this.key(root, sessionId);
    const pending = this.reads.get(key);
    if (pending && !this.closed) return pending;
    const task = this.queue(key, () => this.state(root, sessionId, key));
    this.reads.set(key, task);
    void task
      .finally(() => {
        if (this.reads.get(key) === task) this.reads.delete(key);
      })
      .catch(() => undefined);
    return task;
  }
  /** Reset an old selection after replacing the project's template. */
  resetSelection(root: string, sessionId: string): Promise<void> {
    const key = this.key(root, sessionId);
    return this.queue(key, async () => {
      this.selectPath(
        `${key}\0${await this.prefix(root, sessionId)}`,
        "current",
      );
    });
  }
  /** Select the HTML that the next admitted user turn should use as its starting point. */
  select(root: string, sessionId: string, path: string): Promise<HistoryState> {
    const key = this.key(root, sessionId);
    return this.queue(key, async () => {
      if (!(await this.htmlProject(root, sessionId)))
        throw new StudioError(
          "STUDIO_HISTORY_CATEGORY",
          "Version history is available for website and app designs.",
        );
      const prefix = await this.prefix(root, sessionId);
      if (path !== "current") {
        safeRelativePath(path, prefix, "Design history");
        if (!/\.html?$/i.test(path))
          throw new StudioError(
            "STUDIO_HISTORY_PATH",
            "Select an HTML version.",
          );
        await verifiedExistingPath(root, path, prefix, "Design history");
      }
      this.selectPath(`${key}\0${prefix}`, path);
      return this.state(root, sessionId, key);
    });
  }
  /** Capture HTML once per admitted user batch, including steering within a running turn. */
  prepare(
    root: string,
    sessionId: string,
    admission: HistoryAdmission,
    signal: AbortSignal,
  ): Promise<void> {
    const key = this.key(root, sessionId);
    const { turn, step, messageIds } = admission;
    if (messageIds.length === 0) return Promise.resolve();
    const batch = createHash("sha256")
      .update([...messageIds].sort().join("\0"))
      .digest("hex");
    return this.queue(key, async () => {
      const prefix = await this.prefix(root, sessionId);
      const selectionKey = `${key}\0${prefix}`;
      if (this.preparedBatches.get(selectionKey)?.has(batch)) return;
      const activeSignal = AbortSignal.any([signal, this.controller.signal]);
      activeSignal.throwIfAborted();
      const entry = await this.htmlProject(root, sessionId);
      if (!entry) return;
      const current = await readStudioText({
        root,
        requested: entry,
        prefix: entry,
        studioTitle: "Design",
        maxBytes: this.maxBytes,
      });
      const selected = this.selections.get(selectionKey) ?? "current";
      const restored =
        selected === "current"
          ? undefined
          : await readStudioText({
              root,
              requested: selected,
              prefix,
              studioTitle: "Design history",
              maxBytes: this.maxBytes,
            });
      const target = await verifiedWritePath(
        root,
        `${prefix}/turn-${String(turn).padStart(12, "0")}-step-${String(step).padStart(12, "0")}-${batch}-before-ai.html`,
        prefix,
        "Design history",
      );
      const temporary = `${dirname(target)}/.${basename(target)}.${randomUUID()}.tmp`;
      activeSignal.throwIfAborted();
      try {
        await writeFile(temporary, current.content, {
          flag: "wx",
          signal: activeSignal,
        });
        try {
          await link(temporary, target);
        } catch (error) {
          if (errorCode(error) !== "EEXIST") throw error;
        }
      } finally {
        await unlink(temporary).catch((error) => {
          if (errorCode(error) !== "ENOENT") throw error;
        });
      }
      activeSignal.throwIfAborted();
      if (restored)
        await writeStudioText({
          root,
          requested: entry,
          prefix: entry,
          studioTitle: "Design",
          maxBytes: this.maxBytes,
          content: restored.content,
          baseUpdatedAt: current.updatedAt,
        });
      this.selectPath(selectionKey, "current");
      let batches = this.preparedBatches.get(selectionKey);
      if (!batches)
        this.preparedBatches.set(selectionKey, (batches = new Set()));
      batches.add(batch);
    });
  }
  /** Stop accepting work and cancel pending snapshot preparation. */
  stop(): void {
    this.closed = true;
    this.controller.abort();
  }
  /** Await captured file operations before releasing selections. */
  async dispose(): Promise<void> {
    this.stop();
    await Promise.allSettled([...this.queues.values()]);
    this.selections.clear();
    this.selectionRevisions.clear();
    this.preparedBatches.clear();
    this.reads.clear();
  }
}

/** Register the native pre-step waterfall; unrelated and read-only sessions pass through. */
export function registerDesignHistory(
  ctx: Context,
  history: DesignHistory,
): void {
  ctx.on("agent/pre-step", async ({ agent, turn, step, signal }, next) => {
    const decision = await next();
    if (decision.kind !== "enter") return decision;
    const messageIds = decision.messages
      .filter((message) => message.source.kind === "user")
      .map((message) => message.id);
    if (messageIds.length === 0) return decision;
    const session = agent.session;
    const workspace = ctx.workspaceRegistry
      .list()
      .find((item) => item.sessionIds.includes(session.id));
    if (
      !workspace ||
      workspace.path !== session.header.cwd ||
      ctx.sandboxPolicy.resolve({ session }).mode === "read-only"
    )
      return decision;
    try {
      await history.prepare(
        workspace.path,
        session.id,
        { turn, step, messageIds },
        signal,
      );
    } catch (error) {
      signal.throwIfAborted();
      throw new StudioError(
        "STUDIO_HISTORY_FAILED",
        "Could not save the Design version. The AI update was stopped to protect the existing design.",
        500,
        { cause: error },
      );
    }
    return decision;
  });
}
