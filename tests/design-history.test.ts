import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  realpath,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DesignHistory, hasDesignContent } from "../packages/studio-core/src/design-history.ts";
async function fixture() {
  const root = await realpath(await mkdtemp(join(tmpdir(), "design-history-")));
  await mkdir(join(root, "design/session"), { recursive: true });
  const manifest = JSON.parse(
    await readFile(
      "packages/studio-core/templates/design/ipollowork.site-orbit-data/manifest.json",
      "utf8",
    ),
  );
  await writeFile(
    join(root, "design/session/manifest.json"),
    JSON.stringify(manifest),
  );
  const a = `design/session/${manifest.entry}`,
    b = "design/session/second.html";
  await writeFile(join(root, a), "<h1>First</h1>");
  await writeFile(join(root, b), "<h1>Second</h1>");
  const history = new DesignHistory(1048576);
  return {
    root,
    a,
    b,
    history,
    async close() {
      await history.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}
test("changed files get deduplicated snapshots; browsing a version never modifies the live file", async () => {
  const f = await fixture();
  try {
    await Promise.all([
      f.history.capture(f.root, "session", f.a),
      f.history.capture(f.root, "session", f.a),
    ]);
    assert.equal((await f.history.read(f.root, "session", f.a)).currentVersion, 1);
    assert.equal((await f.history.read(f.root, "session", f.a)).versions.length, 0);
    await writeFile(join(f.root, f.a), "<h1>Changed</h1>");
    await f.history.capture(f.root, "session", f.a);
    const first = (await f.history.read(f.root, "session", f.a)).versions[0]!;
    await f.history.select(f.root, "session", first.path, f.a);
    assert.equal(await readFile(join(f.root, f.a), "utf8"), "<h1>Changed</h1>");
    await f.history.resume(f.root, "session", f.a);
    assert.equal(await readFile(join(f.root, f.a), "utf8"), "<h1>First</h1>");
    assert.equal(
      (await f.history.read(f.root, "session", f.a)).versions.length,
      2,
    );
  } finally {
    await f.close();
  }
});
test("two HTML files in the same managed directory never share versions or selections", async () => {
  const f = await fixture();
  try {
    await f.history.capture(f.root, "session", f.a);
    await writeFile(join(f.root, f.a), "<h1>Next</h1>");
    await f.history.capture(f.root, "session", f.a);
    const version = (await f.history.read(f.root, "session", f.a)).versions[0]!;
    await f.history.select(f.root, "session", version.path, f.a);
    assert.equal(
      (await f.history.read(f.root, "session", f.b)).versions.length,
      0,
    );
    assert.equal(
      (await f.history.read(f.root, "session", f.b)).selectedPath,
      "current",
    );
    await assert.rejects(
      f.history.select(f.root, "session", version.path, f.b),
    );
    await f.history.capture(f.root, "session", f.b);
    await f.history.resume(f.root, "session", f.b);
    assert.equal(await readFile(join(f.root, f.b), "utf8"), "<h1>Second</h1>");
  } finally {
    await f.close();
  }
});
test("old version files stay readable and an explicit resume preserves newer content", async () => {
  const f = await fixture();
  try {
    const prefix = "design/.versions/session";
    await mkdir(join(f.root, prefix), { recursive: true });
    const old = prefix + "/legacy.html";
    await writeFile(join(f.root, old), "<h1>Legacy</h1>");
    await f.history.select(f.root, "session", old, f.a);
    await f.history.resume(f.root, "session", f.a);
    assert.equal(await readFile(join(f.root, f.a), "utf8"), "<h1>Legacy</h1>");
    const versions = (await f.history.read(f.root, "session", f.a)).versions;
    assert.ok(
      (
        await Promise.all(
          versions.map((v) => readFile(join(f.root, v.path), "utf8")),
        )
      ).includes("<h1>First</h1>"),
    );
  } finally {
    await f.close();
  }
});
test("closed history rejects new work and documents survive disposal", async () => {
  const f = await fixture();
  await f.history.dispose();
  await assert.rejects(f.history.capture(f.root, "session", f.a), {
    code: "STUDIO_CLOSED",
  });
  assert.equal(await readFile(join(f.root, f.a), "utf8"), "<h1>First</h1>");
  await f.close();
});

test("two conversations share file revisions but keep independent preview selections", async () => {
  const f = await fixture();
  try {
    await f.history.capture(f.root, "session", f.a);
    await writeFile(join(f.root, f.a), "<h1>Next</h1>");
    await f.history.capture(f.root, "session", f.a);
    const version = (await f.history.read(f.root, "session", f.a)).versions[0]!;
    await f.history.select(f.root, "session", version.path, f.a);
    assert.equal(
      (await f.history.read(f.root, "other", f.a)).selectedPath,
      "current",
    );
    assert.equal(
      (await f.history.read(f.root, "other", f.a)).versions[0]?.path,
      version.path,
    );
  } finally {
    await f.close();
  }
});


test("empty scaffolds have no version, manual edits retain V1 and one AI turn creates V2", async () => {
  const f = await fixture();
  try {
    const blank = '<!doctype html><html><head><title>Design</title><style>body{color:red}</style></head><body><main><!-- empty --></main></body></html>';
    assert.equal(hasDesignContent(blank), false);
    await writeFile(join(f.root, f.a), blank);
    await f.history.observe(f.root, "session", f.a);
    assert.equal((await f.history.read(f.root, "session", f.a)).currentVersion, 0);
    f.history.beginAi(f.root, "session");
    await writeFile(join(f.root, f.a), '<h1>First content</h1>');
    await f.history.observe(f.root, "session", f.a);
    await f.history.finishAi(f.root, "session", f.a);
    assert.equal((await f.history.read(f.root, "session", f.a)).currentVersion, 1);
    await f.history.prepareManualWrite(f.root, "session", f.a);
    await writeFile(join(f.root, f.a), '<h1>Manually edited</h1>');
    await f.history.synchronize(f.root, "session", f.a);
    let state = await f.history.read(f.root, "session", f.a);
    assert.equal(state.currentVersion, 1);
    assert.equal(state.versions.length, 0);
    f.history.beginAi(f.root, "session");
    await writeFile(join(f.root, f.a), '<h1>AI draft</h1>');
    await f.history.observe(f.root, "session", f.a);
    await writeFile(join(f.root, f.a), '<h1>AI final</h1>');
    await f.history.observe(f.root, "session", f.a);
    await f.history.finishAi(f.root, "session", f.a);
    state = await f.history.read(f.root, "session", f.a);
    assert.equal(state.currentVersion, 2);
    assert.equal(state.versions.length, 1);
    assert.equal(await readFile(join(f.root, state.versions[0]!.path), 'utf8'), '<h1>Manually edited</h1>');
    f.history.beginAi(f.root, "session");
    await f.history.finishAi(f.root, "session", f.a);
    assert.equal((await f.history.read(f.root, "session", f.a)).currentVersion, 2);
  } finally { await f.close(); }
});

test("legacy blank snapshots are hidden without deleting their files", async () => {
  const f = await fixture();
  try {
    const blank = 'design/.versions/session/blank.html';
    await mkdir(join(f.root, 'design/.versions/session'), { recursive: true });
    await writeFile(join(f.root, blank), '<html><body><main></main></body></html>');
    await f.history.synchronize(f.root, 'session', f.a);
    assert.equal((await f.history.read(f.root, 'session', f.a)).currentVersion, 1);
    assert.equal(await readFile(join(f.root, blank), 'utf8'), '<html><body><main></main></body></html>');
  } finally { await f.close(); }
});
