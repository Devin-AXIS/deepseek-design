import test from "node:test";
import assert from "node:assert/strict";
import { createStudioTransport } from "../packages/studio-core/src/studio-fetch.ts";
const old = "a".repeat(43),
  next = "b".repeat(43),
  apiRoot = "http://localhost/ipollowork-design/api",
  bootstrapUrl = "http://localhost/ipollowork-design/bootstrap";
const stale = () =>
  Response.json({ code: "STUDIO_AUTH_STALE" }, { status: 403 });
test("stale capability refresh preserves a POST and executes its mutation once", async () => {
  let token = old,
    mutations = 0;
  const calls: string[] = [];
  const client = createStudioTransport({
    kind: "design",
    apiRoot,
    bootstrapUrl,
    readToken: () => token,
    writeToken: (value) => {
      token = value;
    },
    fetcher: async (url, init) => {
      calls.push(url);
      if (url === bootstrapUrl) return Response.json({ token: next });
      assert.equal(init?.method, "POST");
      assert.equal(init.body, "unchanged draft");
      if (new Headers(init.headers).get("x-ipollowork-design-token") === old)
        return stale();
      mutations++;
      return Response.json({ ok: true });
    },
  });
  assert.equal(
    (
      await client.request(apiRoot + "/file", {
        method: "POST",
        body: "unchanged draft",
      })
    ).status,
    200,
  );
  assert.equal(mutations, 1);
  assert.equal(calls.length, 3);
  assert.equal(token, next);
});
test("permission failures are not retried or treated as stale credentials", async () => {
  let calls = 0;
  const client = createStudioTransport({
    kind: "design",
    apiRoot,
    bootstrapUrl,
    readToken: () => old,
    writeToken: () => assert.fail("no refresh"),
    fetcher: async () => {
      calls++;
      return Response.json({ code: "STUDIO_HTTP_403" }, { status: 403 });
    },
  });
  assert.equal((await client.request(apiRoot + "/file")).status, 403);
  assert.equal(calls, 1);
  await assert.rejects(client.request("https://other.example/api/file"));
  assert.equal(calls, 1);
});
test("parallel stale requests share one refresh and cancellation releases only that caller", async () => {
  let token = old,
    refreshes = 0;
  let release!: (value: Response) => void, began!: () => void;
  const started = new Promise<void>((resolve) => {
      began = resolve;
    }),
    pending = new Promise<Response>((resolve) => {
      release = resolve;
    });
  const client = createStudioTransport({
    kind: "design",
    apiRoot,
    bootstrapUrl,
    readToken: () => token,
    writeToken: (value) => {
      token = value;
    },
    fetcher: async (url, init) => {
      if (url === bootstrapUrl) {
        refreshes++;
        began();
        return pending;
      }
      return new Headers(init?.headers).get("x-ipollowork-design-token") === old
        ? stale()
        : Response.json({ ok: true });
    },
  });
  const abort = new AbortController(),
    reason = Error("cancelled chooser");
  const first = client.request(apiRoot + "/file", { signal: abort.signal }),
    second = client.request(apiRoot + "/files");
  const rejection = assert.rejects(first, (error) => error === reason);
  await started;
  abort.abort(reason);
  await rejection;
  release(Response.json({ token: next }));
  assert.equal((await second).status, 200);
  assert.equal(refreshes, 1);
});
