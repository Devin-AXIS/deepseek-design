/** Native file association and live open requests; no document content is copied into the UI bridge. */
import type { DesignDocument } from "./design-types.ts";
import type { SessionId } from "@deepseek-ai/dsh-session/types";
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

export interface DesignConnection {
  activate(
    sessionId: SessionId,
    path: string,
    options?: { mode?: "open" | "resume" | "fork"; reveal?: boolean },
  ): Promise<DesignDocument>;
}
/** Follow authenticated plugin notifications; one owner serializes document activations and releases all requests. */
export function registerDesignConnection(ctx: Context): DesignConnection {
  let controller: AbortController | undefined;
  const pending = new Set<Promise<unknown>>();
  const lifetime = new AbortController();
  const client = crypto.randomUUID();
  let sequence = 0;
  let grant: Promise<string> | undefined;
  let toOpen: { sessionId: SessionId; path: string } | undefined;
  function openReady() {
    if (
      closed ||
      !toOpen ||
      ctx.sidebarRight.mounted.getSnapshot() !== toOpen.sessionId
    )
      return;
    const next = toOpen;
    toOpen = undefined;
    if (
      ctx.configForms
        .get<{ rightSidebar: boolean }>("deepseek-design")
        .getSnapshot().value?.rightSidebar === false
    )
      ctx.emit("ipollo/studio-open", "design", next.sessionId);
    else
      ctx.sidebarRight.openResource(
        sessionFileAddress(next.sessionId, next.path),
      );
  }
  const token = () =>
    (grant ??= fetch("/ipollowork-design/bootstrap", {
      credentials: "same-origin",
      signal: lifetime.signal,
    })
      .then(async (response) => {
        const value: unknown = await response.json();
        if (
          !response.ok ||
          !value ||
          typeof value !== "object" ||
          !("token" in value) ||
          typeof value.token !== "string"
        )
          throw Error("Design connection is unavailable.");
        return value.token;
      })
      .catch((error) => {
        grant = undefined;
        throw error;
      }));
  let closed = false;
  function connect() {
    if (closed) return;
    controller?.abort();
    const active = new AbortController();
    controller = active;
    const run = async () => {
      const accessToken = await token();
      const response = await fetch("/ipollowork-design/api/events", {
        headers: { "x-ipollowork-design-token": accessToken },
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
            ) {
              toOpen = {
                sessionId: event.sessionId as SessionId,
                path: event.entry,
              };
              openReady();
            }
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
  ctx.on("connection/reset", () => {
    grant = undefined;
    connect();
  });
  ctx.effect(() => ctx.sidebarRight.mounted.subscribe(openReady));
  ctx.effect(() => {
    connect();
    return async () => {
      closed = true;
      controller?.abort();
      lifetime.abort();
      await Promise.allSettled([...pending]);
    };
  });
  return {
    async activate(sessionId, path, options = {}) {
      if (closed) throw Error("Design has been disabled.");
      const activation = { client, sequence: ++sequence };
      const run = async () => {
        const response = await fetch("/ipollowork-design/api/document", {
          method: "POST",
          credentials: "same-origin",
          signal: lifetime.signal,
          headers: {
            "content-type": "application/json",
            "x-ipollowork-design-token": await token(),
          },
          body: JSON.stringify({
            sessionId,
            path,
            activation,
            mode: options.mode ?? "open",
          }),
        });
        const value: unknown = await response.json();
        lifetime.signal.throwIfAborted();
        if (activation.sequence !== sequence)
          throw new DOMException(
            "A newer Design action was selected.",
            "AbortError",
          );
        if (!response.ok)
          throw Error(
            value && typeof value === "object" && "message" in value
              ? String(value.message)
              : "Could not open the Design document.",
          );
        if (
          !value ||
          typeof value !== "object" ||
          !("entry" in value) ||
          typeof value.entry !== "string" ||
          !("documentId" in value) ||
          typeof value.documentId !== "string" ||
          !("tokenFile" in value) ||
          typeof value.tokenFile !== "string"
        )
          throw Error("Invalid Design document response.");
        const document: DesignDocument = {
          schemaVersion: 2,
          documentId: value.documentId,
          entry: value.entry,
          tokenFile: value.tokenFile,
          ...("revision" in value && typeof value.revision === "string"
            ? { revision: value.revision }
            : {}),
        };
        if (options.reveal !== false) {
          toOpen = { sessionId, path: document.entry };
          ctx.uiWorkspace.openSession(sessionId);
          openReady();
        }
        return document;
      };
      const task = run();
      pending.add(task);
      try {
        return await task;
      } finally {
        pending.delete(task);
      }
    },
  };
}
