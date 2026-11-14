/** Native file association and live open requests; no document content is copied into the UI bridge. */
import type { Context } from "@deepseek-ai/cordis";
import type {} from "@deepseek-ai/dsh-client-resources/client";
import type { WorkspaceFileStat } from "@deepseek-ai/dsh-api-workspace-files/types";
import {
  parseFileAddress,
  sessionFileAddress,
} from "@deepseek-ai/dsh-util-workspace-path";

/** Recognize only session-scoped HTML resources; ordinary documents keep their native viewers. */
export function designFile(address: string) {
  const file = parseFileAddress(address);
  return file?.scope === "session" &&
    /\.html?$/i.test(file.path) &&
    !/(?:^|\/)video\//.test(file.path)
    ? file
    : undefined;
}

/** Share DSH's existing file resource watcher; release it with the editor view. */
export function watchDesignFile(
  ctx: Context,
  sessionId: string,
  path: string,
  changed: (state: "ready" | "changed" | "unavailable") => void,
): () => void {
  const source = ctx.resources.source(sessionFileAddress(sessionId, path));
  let previous: string | undefined;
  const sync = () => {
    const snapshot = source.getSnapshot();
    if (snapshot.status === "failed") {
      changed("unavailable");
      return;
    }
    if (snapshot.status !== "live") return;
    const value = snapshot.value as WorkspaceFileStat | undefined;
    if (!value) {
      changed("unavailable");
      return;
    }
    changed("ready");
    if (previous !== undefined && previous !== value.version)
      changed("changed");
    previous = value.version;
  };
  const off = source.subscribe(sync);
  sync();
  return off;
}

/** Follow authenticated plugin notifications while installed; teardown drains the active response reader. */
export function registerDesignConnection(ctx: Context): void {
  let controller: AbortController | undefined;
  const pending = new Set<Promise<void>>();
  let closed = false;
  function connect() {
    if (closed) return;
    controller?.abort();
    const active = new AbortController();
    controller = active;
    const run = async () => {
      const grant = await fetch("/ipollowork-design/bootstrap", {
        credentials: "same-origin",
        signal: active.signal,
      });
      if (!grant.ok) throw new Error("Design connection is unavailable.");
      const value: unknown = await grant.json();
      if (
        !value ||
        typeof value !== "object" ||
        !("token" in value) ||
        typeof value.token !== "string"
      )
        throw new Error("Invalid Design connection response.");
      const response = await fetch("/ipollowork-design/api/events", {
        headers: { "x-ipollowork-design-token": value.token },
        credentials: "same-origin",
        signal: active.signal,
      });
      if (!response.ok || !response.body)
        throw new Error("Design notifications are unavailable.");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      try {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) break;
          buffer += decoder.decode(chunk.value, { stream: true });
          if (buffer.length > 65536)
            throw new Error("Invalid Design notification.");
          let end: number;
          while ((end = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, end);
            buffer = buffer.slice(end + 1);
            if (!line) continue;
            const event: unknown = JSON.parse(line);
            if (
              !event ||
              typeof event !== "object" ||
              !("sessionId" in event) ||
              !("entry" in event) ||
              typeof event.sessionId !== "string" ||
              typeof event.entry !== "string"
            )
              continue;
            if (
              !active.signal.aborted &&
              ctx.sidebarRight.mounted.getSnapshot() === event.sessionId
            )
              if (
                ctx.configForms
                  .get<{ rightSidebar: boolean }>("deepseek-design")
                  .getSnapshot().value?.rightSidebar === false
              )
                ctx.emit(
                  "ipollo/studio-open",
                  "design",
                  event.sessionId as import("@deepseek-ai/dsh-session/types").SessionId,
                );
              else
                ctx.sidebarRight.openResource(
                  sessionFileAddress(event.sessionId, event.entry),
                );
          }
        }
      } finally {
        await reader.cancel().catch(() => undefined);
        reader.releaseLock();
      }
    };
    const task = run().catch((error: unknown) => {
      if (!active.signal.aborted)
        ctx.logger.warn(
          "Design connection: %s",
          error instanceof Error ? error.message : String(error),
        );
    });
    pending.add(task);
    void task.finally(() => pending.delete(task));
  }
  ctx.on("connection/reset", connect);
  ctx.effect(() => {
    connect();
    return async () => {
      closed = true;
      controller?.abort();
      await Promise.allSettled([...pending]);
    };
  });
}
