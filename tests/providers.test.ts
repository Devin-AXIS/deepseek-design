import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defaultTheme } from "../packages/studio-core/src/resource-model.ts";
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
        {
          name: "stage-chart",
          title: "Chart",
          description: "Numbers",
          subcategory: "charts",
        },
        { name: "stage-flow", title: "Flow", subcategory: "process" },
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
      (await provider.search("business", "flow")).map((x) => x.id),
      ["stage-flow"],
    );
    assert.deepEqual(
      (await provider.search("data", "")).map((x) => x.id),
      ["stage-chart"],
    );
    await assert.rejects(() => provider.search("library", "x"), {
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
test("asset requests use one catalog and insert the MIME type returned by the API", async () => {
  const server = createServer(async (req, res) => {
    assert.equal(req.headers.authorization, "Bearer shared-resource-key");
    res.setHeader("content-type", "application/json");
    if (req.url?.startsWith("/v1/entities?")) {
      res.end(
        JSON.stringify({
          items: [
            { id: "still", name: "Landscape" },
            { id: "moving", name: "Clouds" },
          ],
        }),
      );
    } else if (req.url === "/v1/resolve") {
      let body = "";
      for await (const chunk of req) body += chunk;
      const id = JSON.parse(body).needs[0].entityId;
      res.end(
        JSON.stringify({
          items: [
            {
              status: "resolved",
              selected: {
                masterId: id,
                objectId: id,
                mime: id === "moving" ? "video/mp4" : "image/svg+xml",
                delivery: { url: `/media/${id}` },
              },
            },
          ],
        }),
      );
    } else res.end(req.url?.endsWith("moving") ? "video-bytes" : "<svg/>");
  });
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const dir = await mkdtemp(join(tmpdir(), "studio-assets-"));
  const provider = new ResourceProviders(
    {
      componentApi: "",
      assetApi: `http://127.0.0.1:${address.port}`,
      timeoutMs: 1000,
      maxResourceBytes: 10000,
    },
    async () => "shared-resource-key",
  );
  try {
    const items = await provider.search("library", "clouds");
    assert.deepEqual(
      items.map((item) => item.kind),
      ["asset", "asset"],
    );
    const image = await provider.acquire(items[0]!, dir, defaultTheme);
    const video = await provider.acquire(items[1]!, dir, defaultTheme);
    assert.equal(image.kind, "image");
    assert.equal(video.kind, "video");
    assert.equal(await readFile(join(dir, video.file), "utf8"), "video-bytes");
  } finally {
    await provider.dispose();
    await new Promise<void>((done) => server.close(() => done()));
    await rm(dir, { recursive: true, force: true });
  }
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
  const request = provider.search("business", "");
  const failure = assert.rejects(request);
  await started;
  await provider.dispose();
  await failure;
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
});
