/** Authenticated, disposable notifications shared by native Studio views. */
import type { Context } from "@deepseek-ai/cordis";

export function subscribeStudioNotifications(
  ctx: Context,
  kind: "design" | "video",
  receive: (value: unknown) => void,
): void {
  let controller: AbortController | undefined;
  let closed = false;
  const pending = new Set<Promise<void>>();
  const connect = () => {
    if (closed) return;
    controller?.abort();
    const active = new AbortController();
    controller = active;
    const run = async () => {
      const bootstrap = await fetch(`/ipollowork-${kind}/bootstrap`, {
        credentials: "same-origin",
        signal: active.signal,
      });
      const value: unknown = await bootstrap.json();
      if (
        !bootstrap.ok ||
        !value ||
        typeof value !== "object" ||
        !("token" in value) ||
        typeof value.token !== "string"
      )
        throw Error("Studio connection is unavailable.");
      const response = await fetch(`/ipollowork-${kind}/api/events`, {
        credentials: "same-origin",
        signal: active.signal,
        headers: { [`x-ipollowork-${kind}-token`]: value.token },
      });
      if (!response.ok || !response.body)
        throw Error("Studio notifications are unavailable.");
      const reader = response.body.getReader(),
        decoder = new TextDecoder();
      let buffer = "";
      try {
        for (;;) {
          const chunk = await reader.read();
          if (chunk.done) break;
          buffer += decoder.decode(chunk.value, { stream: true });
          if (buffer.length > 65536)
            throw Error("Invalid Studio notification.");
          let end: number;
          while ((end = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, end);
            buffer = buffer.slice(end + 1);
            if (line && !active.signal.aborted) receive(JSON.parse(line));
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
          "%s notifications: %s",
          kind,
          error instanceof Error ? error.message : String(error),
        );
    });
    pending.add(task);
    void task.finally(() => pending.delete(task));
  };
  ctx.on("connection/reset", connect);
  ctx.effect(() => {
    connect();
    return async () => {
      closed = true;
      controller?.abort();
      await Promise.allSettled(pending);
    };
  });
}
