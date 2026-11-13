import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import {
  ensureCachedRuntime,
  sourceFingerprint,
} from "../scripts/runtime-cache.mjs";
import { RUNTIME_GENERATED_SOURCES } from "../scripts/runtime-build.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "studio-runtime-cache-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = join(root, "source");
  const directory = join(root, "dist");
  const stamp = join(root, "stamp.json");
  await mkdir(source);
  await writeFile(join(source, "entry.ts"), "export const version = 1;");
  let builds = 0;
  const options = {
    inputs: [source],
    environment: { bun: "test", platform: "test" },
    directory,
    requiredFiles: ["cli.js", "studio/index.html"],
    stamp,
    async build() {
      builds++;
      await mkdir(join(directory, "studio"), { recursive: true });
      await writeFile(join(directory, "cli.js"), "console.log('runtime');");
      await writeFile(
        join(directory, "studio/index.html"),
        "<main>Studio</main>",
      );
    },
  };
  return { root, source, options, builds: () => builds };
}

test("unchanged inputs and outputs reuse the completed runtime", async (t) => {
  const f = await fixture(t);
  assert.equal(await ensureCachedRuntime(f.options), true);
  assert.equal(await ensureCachedRuntime(f.options), false);
  assert.equal(f.builds(), 1);
});

test("source additions, changes, removals and tool versions invalidate the runtime", async (t) => {
  const f = await fixture(t);
  await ensureCachedRuntime(f.options);
  const added = join(f.source, "new-module.ts");
  await writeFile(added, "export const value = 1;");
  assert.equal(await ensureCachedRuntime(f.options), true);
  await writeFile(added, "export const value = 2;");
  assert.equal(await ensureCachedRuntime(f.options), true);
  await rm(added);
  assert.equal(await ensureCachedRuntime(f.options), true);
  assert.equal(
    await ensureCachedRuntime({
      ...f.options,
      environment: { bun: "new", platform: "test" },
    }),
    true,
  );
  assert.equal(f.builds(), 5);
});

test("missing or modified output files cannot reuse an existing stamp", async (t) => {
  const f = await fixture(t);
  await ensureCachedRuntime(f.options);
  await rm(join(f.options.directory, "studio/index.html"));
  assert.equal(await ensureCachedRuntime(f.options), true);
  await writeFile(join(f.options.directory, "cli.js"), "stale runtime");
  assert.equal(await ensureCachedRuntime(f.options), true);
  await writeFile(
    join(f.options.directory, "unexpected-chunk.js"),
    "stale chunk",
  );
  assert.equal(await ensureCachedRuntime(f.options), true);
});

test("a failed or incomplete rebuild leaves no valid cache stamp", async (t) => {
  const f = await fixture(t);
  await ensureCachedRuntime(f.options);
  await assert.rejects(
    ensureCachedRuntime({
      ...f.options,
      force: true,
      build: async () => {
        throw Error("build failed");
      },
    }),
    /build failed/,
  );
  await assert.rejects(readFile(f.options.stamp), { code: "ENOENT" });
  await rm(f.options.directory, { recursive: true });
  await assert.rejects(
    ensureCachedRuntime({ ...f.options, build: async () => {} }),
    /required runtime files/,
  );
  assert.equal(await ensureCachedRuntime(f.options), true);
});

test("generated dist and installed dependencies do not become source inputs", async (t) => {
  const f = await fixture(t);
  const before = await sourceFingerprint([f.source], f.options.environment);
  await mkdir(join(f.source, "dist"));
  await writeFile(join(f.source, "dist/generated.js"), "generated");
  await mkdir(join(f.source, "node_modules"));
  await writeFile(join(f.source, "node_modules/installed.js"), "dependency");
  assert.equal(
    await sourceFingerprint([f.source], f.options.environment),
    before,
  );
});

test("source changes during compilation cannot stamp an inconsistent runtime", async (t) => {
  const f = await fixture(t);
  await assert.rejects(
    ensureCachedRuntime({
      ...f.options,
      async build() {
        await f.options.build();
        await writeFile(join(f.source, "entry.ts"), "changed while building");
      },
    }),
    /inputs changed during compilation/,
  );
  await assert.rejects(readFile(f.options.stamp), { code: "ENOENT" });
  assert.equal(await ensureCachedRuntime(f.options), true);
});

test("owned generated modules can change during compilation without invalidating source", async (t) => {
  const f = await fixture(t);
  const generated = RUNTIME_GENERATED_SOURCES.map((path) =>
    join(f.source, path),
  );
  const generator = join(f.source, "packages/core/scripts/build-runtime.ts");
  const stub = join(f.source, "packages/core/stubs/runtime.ts");
  for (const path of [generator, stub]) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, "original source");
  }
  const options = {
    ...f.options,
    excludedInputs: generated,
    async build() {
      await f.options.build();
      for (const path of generated) {
        await mkdir(dirname(path), { recursive: true });
        await writeFile(path, "generated inline output");
      }
    },
  };
  assert.equal(await ensureCachedRuntime(options), true);
  assert.equal(await ensureCachedRuntime(options), false);
  await writeFile(generated[0], "another generated form");
  assert.equal(await ensureCachedRuntime(options), false);
  for (const path of [generator, stub]) {
    await writeFile(path, "updated source");
    assert.equal(await ensureCachedRuntime(options), true);
  }
  await writeFile(
    join(dirname(generated[0]), "handwritten-module.ts"),
    "source beside generated output",
  );
  assert.equal(await ensureCachedRuntime(options), true);
});
