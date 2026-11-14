import test from "node:test";
import assert from "node:assert/strict";
import type { Context } from "@deepseek-ai/cordis";
import type { WebRoute } from "@deepseek-ai/dsh-host-webserver";
import { createServer, request } from "node:http";
import { mkdtemp, readFile, realpath, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  registerStudioRoute,
  requestObject,
  sendJson,
  writeStudioText,
} from "../packages/studio-core/src/http.ts";
import { ResourceProviders } from "../packages/studio-core/src/providers.ts";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function routeFixture(
  handler: WebRoute["handler"],
  stop: () => void,
  dispose: () => Promise<unknown>,
) {
  let route!: WebRoute;
  let unload!: () => Promise<void>;
  const context = {
    effect(effect: () => () => Promise<void>) {
      unload = effect();
    },
    webServer: {
      register(value: WebRoute) {
        route = value;
        return () => {};
      },
    },
  } as Context;
  registerStudioRoute(
    context,
    { kind: "prefix", path: "/", handler },
    dispose,
    stop,
  );
  const server = createServer((req, res) => {
    Promise.resolve(route.handler(req, res)).catch((error: Error) =>
      res.destroy(error),
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  return {
    origin: `http://127.0.0.1:${address.port}`,
    unload: () => unload(),
    async close() {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}

test(
  "unload retains dependencies until an admitted document write finishes",
  { timeout: 5000 },
  async () => {
    const root = await realpath(
      await mkdtemp(join(tmpdir(), "studio-unload-write-")),
    );
    const admitted = deferred(),
      finish = deferred(),
      stopped = deferred();
    let released = false;
    const route = await routeFixture(
      async (_req, res) => {
        admitted.resolve();
        await finish.promise;
        assert.equal(released, false);
        await writeStudioText({
          root,
          requested: "design/session/index.html",
          prefix: "design",
          studioTitle: "Design",
          content: "saved while unloading",
          maxBytes: 1024,
        });
        sendJson(res, 200, { ok: true });
      },
      () => stopped.resolve(),
      async () => {
        released = true;
      },
    );
    try {
      const response = fetch(route.origin);
      await admitted.promise;
      const unloaded = route.unload();
      await stopped.promise;
      assert.equal(released, false);
      finish.resolve();
      assert.equal((await response).status, 200);
      await unloaded;
      assert.equal(released, true);
      assert.equal(
        await readFile(join(root, "design/session/index.html"), "utf8"),
        "saved while unloading",
      );
      assert.equal((await fetch(route.origin)).status, 503);
    } finally {
      finish.resolve();
      await route.close();
      await rm(root, { recursive: true, force: true });
    }
  },
);

test(
  "unload cancels a stalled provider before awaiting its route",
  { timeout: 5000 },
  async () => {
    const requested = deferred();
    const provider = createServer(() => requested.resolve());
    await new Promise<void>((resolve) =>
      provider.listen(0, "127.0.0.1", resolve),
    );
    const address = provider.address();
    assert.ok(address && typeof address !== "string");
    const resources = new ResourceProviders(
      {
        componentApi: `http://127.0.0.1:${address.port}`,
        assetApi: "",
        timeoutMs: 120000,
        maxResourceBytes: 1024,
      },
      async () => undefined,
    );
    let completed = false;
    const route = await routeFixture(
      async (_req, res) => {
        try {
          await resources.search("business", "");
        } catch (error) {
          assert.equal((error as Error).name, "AbortError");
        }
        completed = true;
        sendJson(res, 503, { ok: false });
      },
      () => resources.stop(),
      async () => {
        assert.equal(completed, true);
        await resources.dispose();
      },
    );
    try {
      const response = fetch(route.origin);
      await requested.promise;
      await route.unload();
      assert.equal((await response).status, 503);
    } finally {
      await route.close();
      provider.closeAllConnections();
      await new Promise<void>((resolve) => provider.close(() => resolve()));
    }
  },
);

test(
  "unload interrupts an incomplete request body before draining",
  { timeout: 5000 },
  async () => {
    const admitted = deferred();
    let completed = false;
    const route = await routeFixture(
      async (req) => {
        admitted.resolve();
        try {
          await requestObject(req);
        } catch (error) {
          assert.ok(error instanceof Error);
        }
        completed = true;
      },
      () => {},
      async () => {
        assert.equal(completed, true);
      },
    );
    const upload = request(route.origin, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    upload.on("error", () => {});
    try {
      upload.write("{");
      await admitted.promise;
      await route.unload();
    } finally {
      upload.destroy();
      await route.close();
    }
  },
);
