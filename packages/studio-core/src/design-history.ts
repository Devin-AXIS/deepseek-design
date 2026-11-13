/** Workspace-owned HTML versions captured before native DSH user turns. */
import { randomUUID } from "node:crypto";
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

/** Own version selections and drain admitted snapshots before plugin unload. */
export class DesignHistory {
  private closed = false;
  private readonly controller = new AbortController();
  private readonly selections = new Map<string, string>();
  private readonly preparedTurns = new Map<string, number>();
  private readonly queues = new Map<string, Promise<unknown>>();
  constructor(private readonly maxBytes: number) {}

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
  private async site(root: string, sessionId: string) {
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
    if (manifest.surface !== "design" || manifest.category !== "site")
      return undefined;
    return safeRelativePath(
      `design/${sessionId}/${manifest.entry}`,
      `design/${sessionId}`,
      "Design",
    );
  }
  private async entries(root: string, sessionId: string) {
    const prefix = `design/.versions/${sessionId}`;
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
  /** List saved HTML versions only for this website project. */
  read(root: string, sessionId: string): Promise<DesignStudioHistory> {
    const key = this.key(root, sessionId);
    return this.queue(key, async () => {
      const versions = (await this.site(root, sessionId))
        ? await this.entries(root, sessionId)
        : [];
      return {
        versions,
        generation: versions[0]?.path ?? "",
        selectedPath: this.selections.get(key) ?? "current",
      };
    });
  }
  /** Reset an old selection after replacing the project's template. */
  resetSelection(root: string, sessionId: string): Promise<void> {
    const key = this.key(root, sessionId);
    return this.queue(key, async () => {
      this.selections.delete(key);
    });
  }
  /** Select the HTML that the next admitted user turn should use as its starting point. */
  select(root: string, sessionId: string, path: string): Promise<void> {
    const key = this.key(root, sessionId);
    return this.queue(key, async () => {
      if (!(await this.site(root, sessionId)))
        throw new StudioError(
          "STUDIO_HISTORY_CATEGORY",
          "Version history is available for website designs.",
        );
      if (path !== "current") {
        safeRelativePath(
          path,
          `design/.versions/${sessionId}`,
          "Design history",
        );
        if (!/\.html?$/i.test(path))
          throw new StudioError(
            "STUDIO_HISTORY_PATH",
            "Select an HTML version.",
          );
        await verifiedExistingPath(
          root,
          path,
          `design/.versions/${sessionId}`,
          "Design history",
        );
      }
      this.selections.set(key, path);
    });
  }
  /** Capture the current HTML once per user turn, then restore a selected historical starting point. */
  prepare(
    root: string,
    sessionId: string,
    turn: number,
    signal: AbortSignal,
  ): Promise<void> {
    const key = this.key(root, sessionId);
    return this.queue(key, async () => {
      if (this.preparedTurns.get(key) === turn) return;
      const activeSignal = AbortSignal.any([signal, this.controller.signal]);
      activeSignal.throwIfAborted();
      const entry = await this.site(root, sessionId);
      if (!entry) return;
      const current = await readStudioText({
        root,
        requested: entry,
        prefix: `design/${sessionId}`,
        studioTitle: "Design",
        maxBytes: this.maxBytes,
      });
      const selected = this.selections.get(key) ?? "current";
      const restored =
        selected === "current"
          ? undefined
          : await readStudioText({
              root,
              requested: selected,
              prefix: `design/.versions/${sessionId}`,
              studioTitle: "Design history",
              maxBytes: this.maxBytes,
            });
      const target = await verifiedWritePath(
        root,
        `design/.versions/${sessionId}/turn-${String(turn).padStart(12, "0")}-before-ai.html`,
        `design/.versions/${sessionId}`,
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
          prefix: `design/${sessionId}`,
          studioTitle: "Design",
          maxBytes: this.maxBytes,
          content: restored.content,
          baseUpdatedAt: current.updatedAt,
        });
      this.selections.set(key, "current");
      this.preparedTurns.set(key, turn);
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
    this.preparedTurns.clear();
  }
}

/** Register the native pre-step waterfall; unrelated and read-only sessions pass through. */
export function registerDesignHistory(
  ctx: Context,
  history: DesignHistory,
): void {
  ctx.on("agent/pre-step", async ({ agent, messages, turn, signal }, next) => {
    const decision = await next();
    if (decision.kind !== "enter" || messages.length === 0) return decision;
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
      await history.prepare(workspace.path, session.id, turn, signal);
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
