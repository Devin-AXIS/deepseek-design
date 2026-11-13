import test from "node:test";
import assert from "node:assert/strict";
import { createServer, type RequestListener } from "node:http";
import { runStudioService } from "../packages/studio-core/src/service-runtime.ts";
import {
  providerFetch,
  providerOAuthFetch,
} from "../packages/studio-core/src/original/apps/server/src/provider-fetch.ts";

async function serverFixture(handler: RequestListener) {
  const server = createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  return {
    url: `http://127.0.0.1:${address.port}`,
    async close() {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}

test(
  "native provider cancellation preserves its owning operation reason",
  { timeout: 5000 },
  async () => {
    let started!: () => void;
    const admitted = new Promise<void>((resolve) => {
      started = resolve;
    });
    const server = await serverFixture(() => started());
    const lifetime = new AbortController(),
      reason = new DOMException("Plugin unloaded", "AbortError");
    try {
      const task = runStudioService({}, lifetime.signal, () =>
        providerFetch(server.url),
      );
      const rejected = assert.rejects(task, (error) => error === reason);
      await admitted;
      lifetime.abort(reason);
      await rejected;
    } finally {
      await server.close();
    }
  },
);

test("native provider errors remain structured while OAuth retains its challenge", async () => {
  let calls = 0;
  const server = await serverFixture((_req, res) => {
    calls += 1;
    res.writeHead(401, {
      "content-type": "application/json",
      "www-authenticate": "Bearer resource_metadata=example",
    });
    res.end(JSON.stringify({ error: { message: "Invalid API key" } }));
  });
  try {
    await assert.rejects(providerFetch(server.url), {
      status: 401,
      code: "provider_auth_failed",
    });
    const response = await providerOAuthFetch(server.url);
    assert.equal(response.status, 401);
    assert.equal(
      response.headers.get("www-authenticate"),
      "Bearer resource_metadata=example",
    );
    await response.arrayBuffer();
    assert.equal(calls, 2);
  } finally {
    await server.close();
  }
});
