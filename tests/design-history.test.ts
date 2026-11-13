import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  realpath,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DesignHistory } from "../packages/studio-core/src/design-history.ts";

async function fixture(category = "site") {
  const root = await realpath(await mkdtemp(join(tmpdir(), "design-history-")));
  const directory = join(root, "design/session");
  const manifest = JSON.parse(
    await readFile(
      "packages/studio-core/templates/design/ipollowork.site-orbit-data/manifest.json",
      "utf8",
    ),
  );
  manifest.category = category;
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "manifest.json"), JSON.stringify(manifest));
  const entry = join(directory, manifest.entry);
  await writeFile(entry, "<h1>First website</h1>");
  const history = new DesignHistory(1024 * 1024);
  return {
    root,
    entry,
    history,
    async dispose() {
      await history.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}
const signal = () => new AbortController().signal;
const admission = (turn: number, step = 1, id = `user-${turn}-${step}`) => ({
  turn,
  step,
  messageIds: [id],
});

test("each admitted user batch preserves the preceding HTML once, including retries", async () => {
  const f = await fixture();
  try {
    await Promise.all([
      f.history.prepare(f.root, "session", admission(1), signal()),
      f.history.prepare(f.root, "session", admission(1), signal()),
    ]);
    await writeFile(f.entry, "<h1>AI update</h1>");
    await f.history.prepare(f.root, "session", admission(1), signal());
    const state = await f.history.read(f.root, "session");
    assert.equal(state.versions.length, 1);
    assert.equal(
      await readFile(join(f.root, state.versions[0]!.path), "utf8"),
      "<h1>First website</h1>",
    );
    assert.equal(await readFile(f.entry, "utf8"), "<h1>AI update</h1>");
  } finally {
    await f.dispose();
  }
});

test("a historical starting point keeps the newer live version before restoring", async () => {
  const f = await fixture();
  try {
    await f.history.prepare(f.root, "session", admission(1), signal());
    const version = (await f.history.read(f.root, "session")).versions[0]!;
    await writeFile(f.entry, "<h1>Second website</h1>");
    await f.history.select(f.root, "session", version.path);
    await f.history.prepare(f.root, "session", admission(2), signal());
    const state = await f.history.read(f.root, "session");
    assert.equal(state.versions.length, 2);
    assert.equal(state.selectedPath, "current");
    assert.equal(await readFile(f.entry, "utf8"), "<h1>First website</h1>");
    assert.equal(
      await readFile(join(f.root, state.versions[0]!.path), "utf8"),
      "<h1>Second website</h1>",
    );
  } finally {
    await f.dispose();
  }
});

test("slides and conversations without a Design project create no versions", async () => {
  const f = await fixture("slides");
  try {
    await f.history.prepare(f.root, "session", admission(1), signal());
    await f.history.prepare(f.root, "another-session", admission(1), signal());
    assert.deepEqual((await f.history.read(f.root, "session")).versions, []);
    assert.deepEqual(await readdir(join(f.root, "design")), ["session"]);
  } finally {
    await f.dispose();
  }
});

test("version selection cannot cross projects or follow a workspace escape", async () => {
  const f = await fixture();
  const outside = await realpath(
    await mkdtemp(join(tmpdir(), "design-history-outside-")),
  );
  try {
    await assert.rejects(
      f.history.select(f.root, "session", "design/.versions/another/file.html"),
    );
    await mkdir(join(f.root, "design/.versions"));
    await symlink(
      outside,
      join(f.root, "design/.versions/session"),
      process.platform === "win32" ? "junction" : "dir",
    );
    await assert.rejects(
      f.history.prepare(f.root, "session", admission(1), signal()),
      /outside the workspace/,
    );
    assert.deepEqual(await readdir(outside), []);
    assert.equal(await readFile(f.entry, "utf8"), "<h1>First website</h1>");
  } finally {
    await f.dispose();
    await rm(outside, { recursive: true, force: true });
  }
});

test("cancelled or unloaded preparation cannot create a version", async () => {
  const f = await fixture();
  try {
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(
      f.history.prepare(f.root, "session", admission(1), controller.signal),
    );
    await f.history.dispose();
    await assert.rejects(
      f.history.prepare(f.root, "session", admission(2), signal()),
      /unloaded/,
    );
    assert.deepEqual(await readdir(join(f.root, "design")), ["session"]);
  } finally {
    await f.dispose();
  }
});

test("steering within one turn restores the chosen version and captures the newer HTML", async () => {
  const f = await fixture();
  try {
    await f.history.prepare(f.root, "session", admission(1), signal());
    const original = (await f.history.read(f.root, "session")).versions[0]!;
    await writeFile(f.entry, "<h1>In-progress AI update</h1>");
    const selected = await f.history.select(f.root, "session", original.path);
    assert.equal(selected.selectionRevision, 1);
    await f.history.prepare(
      f.root,
      "session",
      admission(1, 2, "steering-user-message"),
      signal(),
    );
    const state = await f.history.read(f.root, "session");
    assert.equal(state.versions.length, 2);
    assert.equal(state.selectedPath, "current");
    assert.equal(state.selectionRevision, 2);
    assert.equal(await readFile(f.entry, "utf8"), "<h1>First website</h1>");
    assert.equal(
      await readFile(join(f.root, state.versions[0]!.path), "utf8"),
      "<h1>In-progress AI update</h1>",
    );
    await writeFile(f.entry, "<h1>After steering</h1>");
    await f.history.prepare(
      f.root,
      "session",
      admission(1, 3, "steering-user-message"),
      signal(),
    );
    assert.equal((await f.history.read(f.root, "session")).versions.length, 2);
    assert.equal(await readFile(f.entry, "utf8"), "<h1>After steering</h1>");
  } finally {
    await f.dispose();
  }
});

test("legacy version files remain browsable and usable as a starting point", async () => {
  const f = await fixture();
  try {
    const directory = join(f.root, "design/.versions/session");
    await mkdir(directory, { recursive: true });
    const path = "design/.versions/session/turn-000000000001-before-ai.html";
    await writeFile(join(f.root, path), "<h1>Legacy website</h1>");
    const first = f.history.read(f.root, "session");
    assert.equal(first, f.history.read(f.root, "session"));
    assert.equal((await first).versions[0]!.path, path);
    await f.history.select(f.root, "session", path);
    await f.history.prepare(f.root, "session", admission(2), signal());
    assert.equal(await readFile(f.entry, "utf8"), "<h1>Legacy website</h1>");
    assert.equal((await f.history.read(f.root, "session")).versions.length, 2);
  } finally {
    await f.dispose();
  }
});

test("later history reads observe externally edited and removed versions", async () => {
  const f = await fixture();
  try {
    await f.history.prepare(f.root, "session", admission(1), signal());
    const before = await f.history.read(f.root, "session");
    const version = before.versions[0]!;
    await writeFile(
      join(f.root, version.path),
      "<h1>A longer externally edited version</h1>",
    );
    const after = await f.history.read(f.root, "session");
    assert.notEqual(after.versions[0]!.size, version.size);
    await rm(join(f.root, version.path));
    assert.deepEqual((await f.history.read(f.root, "session")).versions, []);
  } finally {
    await f.dispose();
  }
});
