import { writeStudioText } from "../packages/studio-core/src/http.ts";
import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  writeFile,
  rm,
  realpath,
  unlink,
  readFile,
} from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { writeResource } from "../packages/studio-core/src/files.ts";

test("a stale save refuses to recreate a file deleted after it was loaded", async () => {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "studio-deleted-file-")),
  );
  const input = {
    root,
    requested: "design/session/index.html",
    prefix: "design",
    studioTitle: "Design",
    maxBytes: 1024,
  };
  try {
    const saved = await writeStudioText({ ...input, content: "original" });
    await unlink(join(root, input.requested));
    await assert.rejects(
      writeStudioText({
        ...input,
        content: "stale",
        baseUpdatedAt: saved.updatedAt,
      }),
      { status: 409 },
    );
    await assert.rejects(readFile(join(root, input.requested)), {
      code: "ENOENT",
    });
    await writeStudioText({
      ...input,
      content: "explicit replacement",
      baseUpdatedAt: saved.updatedAt,
      force: true,
    });
    assert.equal(
      await readFile(join(root, input.requested), "utf8"),
      "explicit replacement",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("concurrent create-only saves preserve the first complete file", async () => {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "studio-create-only-")),
  );
  const input = {
    root,
    requested: "design/session/tokens.json",
    prefix: "design",
    studioTitle: "Design",
    maxBytes: 1024,
    createOnly: true,
  };
  try {
    const results = await Promise.allSettled([
      writeStudioText({ ...input, content: "first" }),
      writeStudioText({ ...input, content: "second" }),
    ]);
    assert.equal(
      results.filter((result) => result.status === "fulfilled").length,
      1,
    );
    const failure = results.find((result) => result.status === "rejected");
    assert.equal(failure?.status === "rejected" && failure.reason.status, 409);
    const accepted = ["first", "second"][results.findIndex((result) => result.status === "fulfilled")];
    assert.equal(await readFile(join(root, input.requested), "utf8"), accepted);
    await assert.rejects(
      writeStudioText({ ...input, content: "forced", force: true }),
      { status: 409 },
    );
    assert.equal(await readFile(join(root, input.requested), "utf8"), accepted);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reimporting the same API resource preserves its verified bytes", async () => {
  const directory = await mkdtemp(join(tmpdir(), "studio-resource-"));
  try {
    await writeResource(directory, "r_asset.png", Buffer.from("original"));
    await writeResource(directory, "r_asset.png", Buffer.from("original"));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("a changed cached resource is reported instead of being treated as verified", async () => {
  const directory = await mkdtemp(join(tmpdir(), "studio-resource-"));
  try {
    await writeResource(directory, "r_asset.png", Buffer.from("original"));
    await writeFile(join(directory, "resources/r_asset.png"), "changed");
    await assert.rejects(
      writeResource(directory, "r_asset.png", Buffer.from("original")),
      { code: "STUDIO_RESOURCE_CONFLICT", status: 409 },
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("concurrent saves with the same loaded revision allow one writer", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "studio-writers-")));
  try {
    const input = {
      root,
      requested: "design/session/index.html",
      prefix: "design",
      studioTitle: "Design",
      content: "original",
      maxBytes: 1000,
    };
    const loaded = await writeStudioText(input);
    const results = await Promise.allSettled(
      ["first", "second"].map((content) =>
        writeStudioText({ ...input, content, baseUpdatedAt: loaded.updatedAt }),
      ),
    );
    assert.equal(
      results.filter((item) => item.status === "fulfilled").length,
      1,
    );
    const rejected = results.find((item) => item.status === "rejected");
    assert.ok(rejected?.status === "rejected");
    assert.equal(rejected.reason.status, 409);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
