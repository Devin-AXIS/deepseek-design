/** Exercise the actual slot bundle without relying on a browser-provided React global. */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { renderToStaticMarkup } from "react-dom/server";
import { buildDshShell } from "../scripts/studio-build.mjs";
const require = createRequire(import.meta.url);

for (const kind of ["design", "video"]) {
  test(`${kind} compiled native navigation renders without a global React`, async () => {
    const bundle = await buildDshShell(kind);
    const module = { exports: {} };
    runInNewContext(bundle.outputFiles[0].text, {
      module,
      exports: module.exports,
      AbortController,
      crypto: { randomUUID: () => "client-build-fixture" },
      fetch: async () => ({ ok: false }),
      require: (name) =>
        name === "@ipollo/native-renderer"
          ? {
              rendererUrl: "/test/renderer.js",
              stylesheetUrl: "/test/style.css",
            }
          : require(name),
    });
    const entries = [],
      effects = [];
    const form = {
      getSnapshot: () => ({
        status: "ready",
        value: { leftNavigation: true, rightSidebar: true },
      }),
      subscribe: () => () => {},
    };
    module.exports.apply({
      logger: { warn: () => {} },
      on: () => () => {},
      configForms: { get: () => form },
      locale: {
        getSnapshot: () => ({ active: "en" }),
        subscribe: () => () => {},
      },
      sidebarRight: { mounted: { subscribe: () => () => {}, getSnapshot: () => undefined } },
      sidebarRightTabs: { register: () => () => {} },
      slots: {
        inject: (_name, effect) => effect(),
        register: (info, component) => {
          entries.push({ info, component });
          return () => {};
        },
      },
      effect: (effect) => effects.push(effect()),
    });
    try {
      const entry = entries.find(
        ({ info }) => info.name === "sidebar.panellist",
      );
      assert.ok(entry, "native navigation was registered");
      assert.match(renderToStaticMarkup(entry.component()), /<svg/);
      const library = entries.find(
        ({ info }) =>
          info.name === "sidebar.panellist" && info.id === "ipollo-templates",
      );
      assert.equal(library?.info.priority, kind === "design" ? 0 : 1);
      assert.equal(library?.info.label(), "Templates");
      assert.ok(
        entries.some(
          ({ info }) => info.name === "main" && info.key === "ipollo-templates",
        ),
      );
    } finally {
      for (const dispose of effects.reverse()) dispose?.();
    }
  });
}

test("the independently rebuilt video workbench retains its shared chunk policy", async () => {
  const { workspaceUiChunk, WORKSPACE_CHUNK_LIMIT_KB } =
    await import("../packages/studio-core/src/original/ui/build-plugin-runtime.mjs");
  assert.equal(workspaceUiChunk("/node_modules/react/index.js"), "react");
  assert.ok(WORKSPACE_CHUNK_LIMIT_KB > 0);
});
