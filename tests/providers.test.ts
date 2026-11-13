import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import {
  ResourceProviders,
  apiOrigin,
} from "../packages/studio-core/src/providers.ts";
test("component lookup uses the configured API with bounded filtering", async () => {
  const server = createServer((req, res) => {
    assert.equal(req.url, "/api/catalog");
    assert.equal(req.headers.authorization, "Bearer secret");
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify([
        { name: "stage-chart", title: "Chart", description: "Numbers" },
        { name: "stage-flow", title: "Flow" },
      ]),
    );
  });
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const provider = new ResourceProviders(
    {
      componentApi: `http://127.0.0.1:${address.port}`,
      assetApi: "",
      timeoutMs: 1000,
      maxResourceBytes: 10000,
    },
    async () => "secret",
  );
  try {
    assert.deepEqual(
      (await provider.search("component", "flow")).map((x) => x.id),
      ["stage-flow"],
    );
    await assert.rejects(() => provider.search("image", "x"), {
      code: "STUDIO_PROVIDER_MISSING",
    });
  } finally {
    await provider.dispose();
    await new Promise<void>((done) => server.close(() => done()));
  }
});
test("remote plaintext APIs and embedded credentials are refused", () => {
  assert.throws(() => apiOrigin("http://example.com"));
  assert.throws(() => apiOrigin("https://user:secret@example.com"));
  assert.equal(apiOrigin("https://example.com/"), "https://example.com");
});
test("disposal aborts and drains an unfinished resource body", async () => {
  let began!: () => void;
  const started = new Promise<void>((resolve) => (began = resolve));
  const server = createServer((_req, res) => {
    res.writeHead(200);
    res.write("[");
    began();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const provider = new ResourceProviders(
    {
      componentApi: `http://127.0.0.1:${address.port}`,
      assetApi: "",
      timeoutMs: 10000,
      maxResourceBytes: 10000,
    },
    async () => undefined,
  );
  const request = provider.search("component", "");
  const failure = assert.rejects(request);
  await started;
  await provider.dispose();
  await failure;
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
});
