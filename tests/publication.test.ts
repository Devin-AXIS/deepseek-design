import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { publishWorkspaceFiles } from "../packages/studio-core/src/publication.ts";
import type { ServiceBinding } from "../packages/studio-core/src/service-center.ts";

test("publication sends selected files through the optional host service and rejects escaped paths", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-publication-"));
  const outside = await mkdtemp(join(tmpdir(), "studio-private-"));
  const received: { path: string; text: string }[] = [];
  const binding: ServiceBinding = {
    official: async () => false,
    fetch: async () => {
      throw new Error("No provider credentials should be requested");
    },
    publish: async (input) => {
      for (const file of input.files)
        received.push({
          path: file.path,
          text: await new Response(file.open()).text(),
        });
      return { url: "https://publish.example.test/p/test/design/entry.html" };
    },
  };
  try {
    await mkdir(join(root, "design"));
    await writeFile(join(root, "design/entry.html"), "<h1>Selected</h1>");
    await writeFile(join(root, "input.txt"), "PRIVATE_INPUT");
    const value = await publishWorkspaceFiles(
      binding,
      root,
      "workspace",
      { entryPath: "design/entry.html", sourcePaths: ["design/entry.html"] },
      1024,
    );
    assert.equal(value.result.files, 1);
    assert.deepEqual(received, [
      { path: "design/entry.html", text: "<h1>Selected</h1>" },
    ]);
    await assert.rejects(
      publishWorkspaceFiles(
        binding,
        root,
        "workspace",
        { entryPath: "../input.txt", sourcePaths: ["../input.txt"] },
        1024,
      ),
    );
    await assert.rejects(
      publishWorkspaceFiles(
        binding,
        root,
        "workspace",
        { entryPath: "design/entry.html", sourcePaths: ["design/entry.html"] },
        1,
      ),
    );
    await writeFile(join(outside, "secret.html"), "SECRET");
    await symlink(
      join(outside, "secret.html"),
      join(root, "design/secret.html"),
    );
    await assert.rejects(
      publishWorkspaceFiles(
        binding,
        root,
        "workspace",
        {
          entryPath: "design/secret.html",
          sourcePaths: ["design/secret.html"],
        },
        1024,
      ),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
    await rm(outside, { recursive: true, force: true });
  }
});
