import test from "node:test";
import assert from "node:assert/strict";
import { Context } from "@deepseek-ai/cordis";
import {
  designFile,
  watchDesignFile,
} from "../packages/studio-core/src/design-connection.ts";

test("HTML association preserves native file addressing and leaves Video and other files alone", () => {
  assert.equal(
    designFile("dsh-resource://file/session/a/folder/my%20page.html")?.path,
    "folder/my page.html",
  );
  assert.equal(
    designFile("dsh-resource://file/session/a/video/session-a/index.html"),
    undefined,
  );
  assert.equal(
    designFile("dsh-resource://file/session/a/report.pdf"),
    undefined,
  );
  assert.equal(
    designFile("dsh-resource://file/absolute/tmp/a.html"),
    undefined,
  );
});

test("file revisions trigger one invalidation and releasing a view unsubscribes", () => {
  const events: string[] = [];
  let status = "live",
    version = "r1";
  let listener: (() => void) | undefined;
  const context = new Context().extend({
    resources: {
      source(address: string) {
        assert.equal(address, "dsh-resource://file/session/a/page.html");
        return {
          getSnapshot: () => ({
            status,
            value: { version, absolutePath: "/work/page.html" },
          }),
          subscribe(next: () => void) {
            listener = next;
            return () => {
              listener = undefined;
            };
          },
        };
      },
    },
  });
  const off = watchDesignFile(context, "a", "page.html", (event) =>
    events.push(event),
  );
  listener?.();
  assert.equal(events.filter((value) => value === "changed").length, 0);
  version = "r2";
  listener?.();
  assert.equal(events.filter((value) => value === "changed").length, 1);
  status = "failed";
  listener?.();
  assert.equal(events.at(-1), "unavailable");
  off();
  assert.equal(listener, undefined);
});

test("unloading drains an in-flight activation and cannot open a stale Design pane", async () => {
  const { registerDesignConnection } =
    await import("../packages/studio-core/src/design-connection.ts");
  const previous = globalThis.fetch;
  const effects: Array<() => void | Promise<void>> = [];
  const opened: string[] = [];
  let finish!: (value: object) => void;
  let begun!: () => void;
  const started = new Promise<void>((resolve) => {
    begun = resolve;
  });
  const payload = new Promise<object>((resolve) => {
    finish = resolve;
  });
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    if (url.endsWith("bootstrap")) return Response.json({ token: "fixture" });
    if (url.endsWith("events")) return new Response(null, { status: 503 });
    begun();
    return { ok: true, json: () => payload } as Response;
  }) as typeof fetch;
  try {
    const context = new Context().extend({
      effect(effect: () => () => void | Promise<void>) {
        const off = effect();
        effects.push(off);
        return off;
      },
      logger: { warn() {} },
      on() {
        return () => {};
      },
      sidebarRight: {
        mounted: { getSnapshot: () => "session", subscribe: () => () => {} },
        openResource: (path: string) => opened.push(path),
      },
      uiWorkspace: { openSession: (id: string) => opened.push(id) },
    });
    const connection = registerDesignConnection(context);
    const request = connection.activate(
      "session" as import("@deepseek-ai/dsh-session/types").SessionId,
      "page.html",
    );
    await started;
    const rejected = assert.rejects(request, { name: "AbortError" });
    let closed = false;
    const closing = Promise.all(effects.map((off) => off())).then(() => {
      closed = true;
    });
    await Promise.resolve();
    assert.equal(closed, false);
    finish({
      schemaVersion: 2,
      documentId: "fixture",
      entry: "page.html",
      tokenFile: "page.tokens.css",
    });
    await rejected;
    await closing;
    assert.deepEqual(opened, []);
  } finally {
    globalThis.fetch = previous;
  }
});
