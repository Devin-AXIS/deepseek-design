/** Exercise the actual slot bundle without relying on a browser-provided React global. */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { renderToStaticMarkup } from "react-dom/server";
import { buildDshShell, buildNativeClient } from "../scripts/studio-build.mjs";
const require = createRequire(import.meta.url);

for (const kind of ["design", "video"]) {
  test(`${kind} compiled native navigation renders without a global React`, async () => {
    const bundle = await buildDshShell(kind);
    const module = { exports: {} };
    const styles = [];
    const hostRequire = (name) => {
      if (name === "@ipollo/native-renderer")
        return {
          rendererUrl: "/test/renderer.js",
          stylesheetUrl: "/test/style.css",
        };
      if (name === "@deepseek-ai/dsh-client-ui-primitives") {
        const unused = () => {
          throw Error("Navigation does not mount credential dialogs");
        };
        return { Button: unused, Modal: unused };
      }
      return require(name);
    };
    runInNewContext(
      buildNativeClient(
        `deepseek-i${kind}`,
        {},
        bundle.outputFiles.find((file) => file.path.endsWith(".js")).text,
        bundle.outputFiles.find((file) => file.path.endsWith(".css")).text,
      ),
      {
        window: {
          __ModuleLoader__: {
            load: ({ factory }) => {
              module.exports = factory(hostRequire);
            },
          },
        },
        document: {
          createElement: () => ({
            textContent: "",
            remove() {
              this.removed = true;
            },
          }),
          head: { append: (style) => styles.push(style) },
        },
        AbortController,
        crypto: { randomUUID: () => "client-build-fixture" },
        fetch: async () => ({ ok: false }),
        require: hostRequire,
      },
    );
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
      inject: (services) => {
        assert.equal(services.join(), "ipolloConnections");
        return () => {};
      },
      on: () => () => {},
      configForms: { get: () => form },
      locale: {
        getSnapshot: () => ({ active: "en" }),
        subscribe: () => () => {},
      },
      sidebarRight: {
        mounted: { subscribe: () => () => {}, getSnapshot: () => undefined },
      },
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
      assert.equal(styles.length, 1);
      assert.match(styles[0].textContent, /design_actions_controls/);
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
      assert.equal(styles[0].removed, true);
    }
  });
}

test("the independently rebuilt video workbench retains its shared chunk policy", async () => {
  const { workspaceUiChunk, WORKSPACE_CHUNK_LIMIT_KB } =
    await import("../packages/studio-core/src/original/ui/build-plugin-runtime.mjs");
  assert.equal(workspaceUiChunk("/node_modules/react/index.js"), "react");
  assert.ok(WORKSPACE_CHUNK_LIMIT_KB > 0);
});
