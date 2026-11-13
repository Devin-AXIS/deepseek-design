import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "node:http";
import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  sendStudioError,
  serveStudioAsset,
} from "../packages/studio-core/src/http.ts";

test("packaged editor assets stream modules with immutable caching and reject invalid paths", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-assets-"));
  const directory = join(root, "assets");
  await mkdir(join(directory, "chunks"), { recursive: true });
  await writeFile(
    join(directory, "chunks/renderer.js"),
    "export const ready = true;",
  );
  await writeFile(join(root, "outside.js"), "outside");
  if (process.platform !== "win32")
    await symlink(join(root, "outside.js"), join(directory, "escape.js"));
  const server = createServer((request, response) => {
    void serveStudioAsset(
      request,
      response,
      new URL(request.url!, "http://localhost"),
      "/studio",
      directory,
    )
      .then((handled) => {
        if (!handled) response.writeHead(404).end();
      })
      .catch((error: unknown) => sendStudioError(response, error));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  try {
    const module = await fetch(origin + "/studio/assets/chunks/renderer.js");
    assert.equal(module.status, 200);
    assert.match(module.headers.get("content-type")!, /^text\/javascript/);
    assert.equal(
      module.headers.get("cache-control"),
      "private, max-age=31536000, immutable",
    );
    assert.equal(await module.text(), "export const ready = true;");
    for (const [path, status] of [
      ["missing.js", 404],
      ["%", 400],
      ["..%2foutside.js", 400],
      ["chunks", 404],
      ...(process.platform !== "win32" ? [["escape.js", 403]] : []),
    ] as const) {
      const response = await fetch(origin + "/studio/assets/" + path);
      assert.equal(response.status, status, String(path));
      await response.arrayBuffer();
    }
    const post = await fetch(origin + "/studio/assets/chunks/renderer.js", {
      method: "POST",
    });
    assert.equal(post.status, 405);
    await post.arrayBuffer();
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
    await rm(root, { recursive: true, force: true });
  }
});
