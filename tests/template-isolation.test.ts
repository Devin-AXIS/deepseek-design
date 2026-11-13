import test from "node:test";
import assert from "node:assert/strict";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { runStudioService } from "../packages/studio-core/src/service-runtime.ts";
import {
  disposeTemplateStore,
  installBundledTemplate,
  listTemplates,
  resolveBundledTemplatesRoot,
} from "../packages/studio-core/src/original/apps/server/src/templates.ts";
import type { ServerConfig } from "../packages/studio-core/src/original/apps/server/src/types.ts";

function config(root: string): ServerConfig {
  return {
    configPath: join(root, "config.json"),
    workspaces: [],
    readOnly: true,
  };
}

test("each native plugin reads the catalog from its own bundled root", async () => {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "studio-catalogs-")),
  );
  const first = config(join(root, "first-state")),
    second = config(join(root, "second-state"));
  try {
    const source = resolve(
      "packages/studio-core/templates/design/ipollowork.html-anything.web-proto-soft",
    );
    const roots = [join(root, "first-bundle"), join(root, "second-bundle")];
    for (const [index, catalogRoot] of roots.entries()) {
      const directory = join(
        catalogRoot,
        "ipollowork.html-anything.web-proto-soft",
      );
      await cp(source, directory, { recursive: true });
      const manifest = JSON.parse(
        await readFile(join(directory, "manifest.json"), "utf8"),
      );
      manifest.title = `Plugin catalog ${index}`;
      await writeFile(
        join(directory, "manifest.json"),
        JSON.stringify(manifest),
      );
    }
    const load = (state: ServerConfig, path: string) =>
      runStudioService(
        { IPOLLOWORK_BUNDLED_TEMPLATES_DIR: path },
        undefined,
        () => listTemplates(state, "workspace"),
      );
    assert.equal(
      (await load(first, roots[0]!))[0]?.manifest.title,
      "Plugin catalog 0",
    );
    assert.equal(
      (await load(second, roots[1]!))[0]?.manifest.title,
      "Plugin catalog 1",
    );
  } finally {
    await Promise.all([
      disposeTemplateStore(first),
      disposeTemplateStore(second),
    ]);
    await rm(root, { recursive: true, force: true });
  }
});

test("a missing native template bundle never falls back to an old desktop app", async () => {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "studio-bundle-missing-")),
  );
  const descriptor = Object.getOwnPropertyDescriptor(process, "resourcesPath");
  try {
    await mkdir(join(root, "server/dist/bundled-templates"), {
      recursive: true,
    });
    Object.defineProperty(process, "resourcesPath", {
      configurable: true,
      value: root,
    });
    assert.throws(
      () =>
        runStudioService(
          { IPOLLOWORK_BUNDLED_TEMPLATES_DIR: join(root, "missing") },
          undefined,
          resolveBundledTemplatesRoot,
        ),
      { code: "bundled_templates_missing" },
    );
    assert.throws(
      () => runStudioService({}, undefined, resolveBundledTemplatesRoot),
      { code: "bundled_templates_missing" },
    );
  } finally {
    if (descriptor) Object.defineProperty(process, "resourcesPath", descriptor);
    else Reflect.deleteProperty(process, "resourcesPath");
    await rm(root, { recursive: true, force: true });
  }
});

test("native package versions do not admit a newer legacy template API", async () => {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "studio-template-version-")),
  );
  const state = config(join(root, "state"));
  try {
    const id = "ipollowork.html-anything.web-proto-soft";
    const directory = join(root, "templates", id);
    await cp(resolve("packages/studio-core/templates/design", id), directory, {
      recursive: true,
    });
    const manifest = JSON.parse(
      await readFile(join(directory, "manifest.json"), "utf8"),
    );
    manifest.minimumAppVersion = "0.51.0";
    await writeFile(join(directory, "manifest.json"), JSON.stringify(manifest));
    await assert.rejects(
      runStudioService(
        { IPOLLOWORK_BUNDLED_TEMPLATES_DIR: join(root, "templates") },
        undefined,
        () => installBundledTemplate(state, "workspace", id),
      ),
      { code: "template_requires_newer_app" },
    );
  } finally {
    await disposeTemplateStore(state);
    await rm(root, { recursive: true, force: true });
  }
});
