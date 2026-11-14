import test from "node:test";
import assert from "node:assert/strict";
import { Context } from "@deepseek-ai/cordis";
import { registerVideoConnection } from "../packages/studio-core/src/video-connection.ts";

test("video notifications wait for their conversation, reopen the editor, and drain on unload", async () => {
  const original = globalThis.fetch;
  const cleanups: Array<() => void | Promise<void>> = [];
  const opened: string[] = [];
  const warnings: string[] = [];
  let mounted: string | undefined;
  let changed = () => {};
  let received!: () => void;
  let receivedEvent = new Promise<void>((resolve) => {
    received = resolve;
  });
  let stream!: ReadableStreamDefaultController<Uint8Array>;
  let ready!: () => void;
  const connected = new Promise<void>((resolve) => {
    ready = resolve;
  });
  globalThis.fetch = (async (input, init) => {
    if (String(input).endsWith("bootstrap"))
      return Response.json({ token: "fixture" });
    assert.equal(String(input), "/ipollowork-video/api/events");
    return new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          stream = controller;
          init?.signal?.addEventListener(
            "abort",
            () => controller.error(init.signal?.reason),
            { once: true },
          );
          ready();
        },
      }),
    );
  }) as typeof fetch;
  const ctx = new Context().extend({
    effect(effect: () => () => void | Promise<void>) {
      const off = effect();
      cleanups.push(off);
      return off;
    },
    on() {
      return () => {};
    },
    logger: {
      warn(_kind: string, _format: string, error: string) {
        warnings.push(error);
        received();
      },
    },
    configForms: {
      get: () => ({ getSnapshot: () => ({ value: { rightSidebar: true } }) }),
    },
    sidebarRight: {
      mounted: {
        getSnapshot: () => {
          received();
          return mounted;
        },
        subscribe(fn: () => void) {
          changed = fn;
          return () => {
            changed = () => {};
          };
        },
      },
      openResource: (id: string) => opened.push(id),
    },
  });
  const connection = registerVideoConnection(ctx);
  try {
    await connected;
    const message = new TextEncoder().encode(
      '{"sessionId":"session","entry":"custom/project/index.html"}\n',
    );
    stream.enqueue(message);
    await receivedEvent;
    assert.deepEqual(warnings, []);
    assert.deepEqual(opened, []);
    assert.equal(
      connection.file(
        "dsh-resource://file/session/session/custom/project/index.html",
      )?.path,
      "custom/project/index.html",
    );
    mounted = "session";
    changed();
    assert.deepEqual(opened, [
      "dsh-resource://file/session/session/custom/project/index.html",
    ]);
    receivedEvent = new Promise<void>((resolve) => {
      received = resolve;
    });
    stream.enqueue(message);
    await receivedEvent;
    assert.deepEqual(opened, [
      "dsh-resource://file/session/session/custom/project/index.html",
      "dsh-resource://file/session/session/custom/project/index.html",
    ]);
  } finally {
    await Promise.all(cleanups.reverse().map((off) => off()));
    globalThis.fetch = original;
    assert.equal(
      connection.file(
        "dsh-resource://file/session/session/custom/project/index.html",
      ),
      undefined,
    );
  }
});
