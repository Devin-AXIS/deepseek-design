import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import type { Mode, PathLike, StatOptions } from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  readStudioText,
  writeStudioText,
} from "../packages/studio-core/src/http.ts";

async function fixture() {
  const root = await fs.realpath(
    await fs.mkdtemp(join(tmpdir(), "studio-file-revision-")),
  );
  const requested = "design/session/index.html";
  const path = join(root, requested);
  await fs.mkdir(join(root, "design/session"), { recursive: true });
  return {
    root,
    path,
    input: {
      root,
      requested,
      prefix: "design",
      studioTitle: "Design",
      maxBytes: 1024,
    },
  };
}

test("an atomic replacement cannot mix old metadata with new content", async (t) => {
  const f = await fixture();
  const originalOpen = fs.open,
    originalStat = fs.stat;
  try {
    await fs.writeFile(f.path, "old document");
    await fs.utimes(
      f.path,
      new Date(1_700_000_000_000),
      new Date(1_700_000_000_000),
    );
    const before = await fs.stat(f.path);
    let replaced = false;
    const replace = async () => {
      if (replaced) return;
      replaced = true;
      const next = join(f.root, "next.html");
      await fs.writeFile(next, "new document");
      await fs.utimes(
        next,
        new Date(1_700_000_001_000),
        new Date(1_700_000_001_000),
      );
      await fs.rename(next, f.path);
    };
    t.mock.method(fs, "stat", async (path: PathLike, options?: StatOptions) => {
      const info = await originalStat(path, options);
      if (path === f.path) await replace();
      return info;
    });
    t.mock.method(
      fs,
      "open",
      async (path: PathLike, flags: string | number, mode?: Mode) => {
        const file = await originalOpen(path, flags, mode);
        if (path === f.path && flags === "r") {
          const stat = file.stat.bind(file);
          t.mock.method(file, "stat", async (options?: StatOptions) => {
            const info = await stat(options);
            await replace();
            return info;
          });
        }
        return file;
      },
    );
    syncBuiltinESMExports();
    const result = await readStudioText(f.input);
    assert.equal(replaced, true);
    assert.equal(result.content, "old document");
    assert.equal(result.updatedAt, before.mtimeMs);
    assert.equal(result.bytes, Buffer.byteLength(result.content));
    assert.equal(await fs.readFile(f.path, "utf8"), "new document");
  } finally {
    t.mock.restoreAll();
    syncBuiltinESMExports();
    await fs.rm(f.root, { recursive: true, force: true });
  }
});

test("a published replacement already has its final monotonic revision", async (t) => {
  const f = await fixture();
  const originalRename = fs.rename;
  try {
    await fs.writeFile(f.path, "old document");
    const future = new Date(Date.now() + 60_000);
    await fs.utimes(f.path, future, future);
    const before = await readStudioText(f.input);
    let observed: Awaited<ReturnType<typeof readStudioText>> | undefined;
    t.mock.method(fs, "rename", async (source: PathLike, target: PathLike) => {
      await originalRename(source, target);
      if (target === f.path) observed = await readStudioText(f.input);
    });
    syncBuiltinESMExports();
    const saved = await writeStudioText({
      ...f.input,
      content: "new document",
      baseUpdatedAt: before.updatedAt,
    });
    assert.ok(observed);
    assert.equal(observed.content, "new document");
    assert.equal(observed.updatedAt, saved.updatedAt);
    assert.equal(observed.bytes, saved.bytes);
    assert.ok(saved.updatedAt > before.updatedAt);
    assert.deepEqual(await readStudioText(f.input), observed);
  } finally {
    t.mock.restoreAll();
    syncBuiltinESMExports();
    await fs.rm(f.root, { recursive: true, force: true });
  }
});

test("a file removed immediately before opening still reports not found", async (t) => {
  const f = await fixture();
  const originalOpen = fs.open;
  try {
    await fs.writeFile(f.path, "document");
    t.mock.method(
      fs,
      "open",
      async (path: PathLike, flags: string | number, mode?: Mode) => {
        if (path === f.path && flags === "r") await fs.unlink(f.path);
        return originalOpen(path, flags, mode);
      },
    );
    syncBuiltinESMExports();
    await assert.rejects(readStudioText(f.input), { status: 404 });
  } finally {
    t.mock.restoreAll();
    syncBuiltinESMExports();
    await fs.rm(f.root, { recursive: true, force: true });
  }
});
