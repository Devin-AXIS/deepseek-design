/** Isolated real-component regressions; does not load or install a DSH profile. */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { chromium } from "playwright-core";
const original = resolve("packages/studio-core/src/original");
let server, browser, url;
test.before(async () => {
  server = await createServer({
    configFile: false,
    plugins: [
      react(),
      {
        name: "unused-media-runtime",
        resolveId: (id) =>
          id === "virtual:ipollowork-plugin-ui-runtime"
            ? "\0fixture-media"
            : undefined,
        load: (id) =>
          id === "\0fixture-media" ? "export default ''" : undefined,
      },
    ],
    optimizeDeps: { entries: ["tests/browser/editor-state.html"] },
    server: { host: "127.0.0.1", port: 0 },
    resolve: {
      alias: [
        { find: "@", replacement: resolve(original, "app/src") },
        {
          find: "@ipollowork/types",
          replacement: resolve(original, "types/src"),
        },
        {
          find: "@ipollowork/design-studio",
          replacement: resolve(original, "design-studio/src"),
        },
        {
          find: "@ipollowork/video-studio",
          replacement: resolve(original, "video-studio/src"),
        },
        {
          find: "@ipollowork/ui/menu-styles",
          replacement: resolve(original, "ui/src/common/menu-styles.ts"),
        },
        {
          find: "@ipollowork/ui",
          replacement: resolve(original, "ui/src/react"),
        },
      ],
    },
  });
  await server.listen();
  url = `http://127.0.0.1:${server.httpServer.address().port}`;
  const executablePath =
    process.env.STUDIO_BROWSER_EXECUTABLE ??
    process.env.CHROME_PATH ??
    [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
    ].find(existsSync);
  browser = await chromium.launch({
    ...(executablePath ? { executablePath } : {}),
    headless: true,
  });
});
test.after(async () => {
  await browser?.close();
  await server?.close();
});
async function fixture({ failHtml = false } = {}) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const manifest = JSON.parse(
    await readFile(
      "packages/studio-core/templates/design/ipollowork.site-orbit-data/manifest.json",
      "utf8",
    ),
  );
  const version = "design/.versions/session/turn-000000000001-before-ai.html";
  const state = {
    versions: [
      { path: version, kind: "file", size: 20, mtimeMs: 1, revision: "1" },
    ],
    generation: version,
    selectedPath: "current",
    selectionRevision: 0,
  };
  const writes = [];
  let holdNextHistory = false,
    heldHistory;
  await page.route("**/fixture/**", async (route) => {
    const request = route.request(),
      u = new URL(request.url());
    if (u.pathname.endsWith("/session"))
      return route.fulfill({
        json: {
          sessionId: "session",
          surface: "design",
          authoring: false,
          manifest,
          state: {
            schemaVersion: 1,
            entry: "design/session/index.html",
            briefPath: "design/session/brief.json",
            template: {
              id: manifest.id,
              version: manifest.version,
              sourceType: "bundled",
            },
            createdAt: 1,
          },
        },
      });
    if (u.pathname.endsWith("/history")) {
      if (holdNextHistory) {
        holdNextHistory = false;
        const captured = structuredClone(state);
        heldHistory = () => route.fulfill({ json: captured });
        return;
      }
      return route.fulfill({ json: state });
    }
    if (u.pathname.endsWith("/selection")) {
      state.selectedPath = request.postDataJSON().path;
      state.selectionRevision++;
      return route.fulfill({ json: state });
    }
    if (u.pathname.endsWith("/tokens")) {
      if (request.method() === "POST") {
        writes.push(request.postDataJSON());
        return route.fulfill({ json: { updatedAt: 2 } });
      }
      return route.fulfill({
        json: { content: "original tokens", updatedAt: 1 },
      });
    }
    const path = u.searchParams.get("path");
    if (failHtml && path?.endsWith(".html"))
      return route.fulfill({
        status: 503,
        json: { message: "HTML read unavailable" },
      });
    return route.fulfill({
      json: {
        path,
        content: path?.endsWith(".css")
          ? ":root{}"
          : `<!doctype html><html><body><h1>${path === version ? "HISTORICAL" : "CURRENT"}</h1></body></html>`,
        bytes: 100,
        updatedAt: 1,
      },
    });
  });
  await page.goto(`${url}/tests/browser/editor-state.html`);
  await page.waitForFunction(() => window.editorFixture);
  return {
    page,
    state,
    writes,
    version,
    holdHistory: () => {
      holdNextHistory = true;
    },
    hasHeldHistory: () => Boolean(heldHistory),
    releaseHistory: () => heldHistory?.(),
  };
}
test("two mounted editors follow acknowledged selections and retain an unsaved draft", async () => {
  const { page, state, version, holdHistory, hasHeldHistory, releaseHistory } =
    await fixture();
  try {
    await page.evaluate(() => {
      window.editorFixture.mount("a");
      window.editorFixture.mount("b");
    });
    const combos = page.getByRole("combobox", { name: "Design version" });
    await combos.nth(1).waitFor();
    await page.waitForFunction(() =>
      document
        .querySelector("#a iframe")
        ?.contentDocument?.querySelector(
          "#ipollowork-design-navigation-runtime",
        ),
    );
    const frame = await (
      await page.locator("#a iframe").elementHandle()
    ).contentFrame();
    await frame.evaluate(() => {
      const runtime = document.querySelector(
        "#ipollowork-design-navigation-runtime",
      ).textContent;
      const frameRevision = JSON.parse(
        runtime.match(/,\s*("(?:[^"\\]|\\.)*")\);\s*$/)[1],
      );
      parent.postMessage(
        {
          channel: "ipollowork-design-html-v1",
          frameRevision,
          type: "document-draft",
          html: "<!doctype html><html><body><h1>MY UNSAVED DRAFT</h1></body></html>",
        },
        "*",
      );
    });
    await page.waitForTimeout(50);
    holdHistory();
    for (let attempt = 0; !hasHeldHistory() && attempt < 40; attempt++)
      await page.waitForTimeout(100);
    assert.equal(hasHeldHistory(), true);
    await combos.nth(1).click();
    await page.getByRole("option", { name: "V1", exact: true }).click();
    await page.waitForFunction(() =>
      [...document.querySelectorAll('[aria-label="Design version"]')].every(
        (node) => node.textContent.includes("V1"),
      ),
    );
    assert.equal(state.selectedPath, version);
    await releaseHistory();
    await page.waitForTimeout(100);
    assert.ok(
      (await combos.allTextContents()).every((text) => text.includes("V1")),
      "a delayed old poll must not undo the acknowledged selection",
    );
    await combos.nth(1).click();
    await page.getByRole("option", { name: "V2", exact: true }).click();
    await page.waitForFunction(() =>
      [...document.querySelectorAll('[aria-label="Design version"]')].every(
        (node) => node.textContent.includes("V2"),
      ),
    );
    assert.equal(state.selectedPath, "current");
    await page.waitForFunction(() =>
      document.querySelector("#a iframe")?.srcdoc.includes("MY UNSAVED DRAFT"),
    );
  } finally {
    await page.close();
  }
});
test("the initial HTML failure displays its error and a retry action", async () => {
  const { page } = await fixture({ failHtml: true });
  try {
    await page.evaluate(() => window.editorFixture.mount("a"));
    await page
      .getByRole("alert")
      .filter({ hasText: "HTML read unavailable" })
      .waitFor({ timeout: 15000 });
    assert.equal(
      await page.getByRole("button", { name: "Retry", exact: true }).count(),
      1,
    );
  } finally {
    await page.close();
  }
});
test("unmount flushes a pending debounced token edit with its original revision", async () => {
  const { page, writes } = await fixture();
  try {
    await page.evaluate(() => window.editorFixture.mountSaver("a"));
    await page.waitForFunction(
      () => window.editorFixture.changeTokens.name !== "changeTokens",
    );
    await page.evaluate(() => {
      window.editorFixture.changeTokens("latest tokens");
      window.editorFixture.unmount("a");
    });
    await page.waitForTimeout(100);
    assert.deepEqual(writes, [{ content: "latest tokens", baseUpdatedAt: 1 }]);
  } finally {
    await page.close();
  }
});
