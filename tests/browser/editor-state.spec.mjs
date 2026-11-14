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
    server: { host: "127.0.0.1", port: 0, hmr: false, watch: null },
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
  const fileWrites = [];
  const currentPath = "design/session/index.html";
  const files = new Map([
    [
      currentPath,
      {
        content: "<!doctype html><html><body><h1>CURRENT</h1></body></html>",
        updatedAt: 1,
      },
    ],
  ]);
  let holdNextHistory = false,
    heldHistory;
  let holdNextHtml = false,
    heldHtml;
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
    if (request.method() === "POST" && u.pathname.endsWith("/file")) {
      const input = request.postDataJSON(),
        previous = files.get(input.path);
      const ok = previous?.updatedAt === input.baseUpdatedAt;
      fileWrites.push({ ...input, ok });
      if (!ok)
        return route.fulfill({
          status: 409,
          json: {
            message:
              "Design changed since it was loaded. Reload before saving.",
          },
        });
      const next = {
        content: input.content,
        updatedAt: previous.updatedAt + 1,
      };
      files.set(input.path, next);
      return route.fulfill({
        json: {
          ok: true,
          path: input.path,
          bytes: input.content.length,
          updatedAt: next.updatedAt,
        },
      });
    }
    const path = u.searchParams.get("path");
    if (failHtml && path?.endsWith(".html"))
      return route.fulfill({
        status: 503,
        json: { message: "HTML read unavailable" },
      });
    if (path === currentPath && holdNextHtml) {
      holdNextHtml = false;
      const captured = { ...files.get(path) };
      heldHtml = (latest = false) =>
        route.fulfill({
          json: { path, bytes: 100, ...(latest ? files.get(path) : captured) },
        });
      return;
    }
    return route.fulfill({
      json: {
        path,
        content:
          files.get(path)?.content ??
          (path?.endsWith(".css")
            ? ":root{}"
            : `<!doctype html><html><body><h1>${path === version ? "HISTORICAL" : "CURRENT"}</h1></body></html>`),
        bytes: 100,
        updatedAt: files.get(path)?.updatedAt ?? 1,
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
    fileWrites,
    currentFile: () => files.get(currentPath),
    externalChange: (content) =>
      files.set(currentPath, {
        content,
        updatedAt: files.get(currentPath).updatedAt + 1,
      }),
    holdHtmlRead: () => {
      holdNextHtml = true;
    },
    hasHeldHtmlRead: () => Boolean(heldHtml),
    releaseHtmlRead: (latest) => heldHtml?.(latest),
  };
}

async function editHtml(page, text) {
  const frame = await (
    await page.locator("#a iframe").elementHandle()
  ).contentFrame();
  await frame.evaluate((text) => {
    const runtime = document.querySelector(
      "#ipollowork-design-navigation-runtime",
    ).textContent;
    const frameRevision = JSON.parse(
      runtime.match(/,\s*("(?:[^"\\]|\\.)*")\);\s*$/)[1],
    );
    document.querySelector("h1").textContent = text;
    parent.postMessage(
      {
        channel: "ipollowork-design-html-v1",
        frameRevision,
        type: "document-draft",
        html: `<!doctype html><html><body><h1>${text}</h1></body></html>`,
      },
      "*",
    );
  }, text);
  await page
    .getByRole("button", { name: "Save design", exact: true })
    .waitFor();
}

test("components follow Element and Theme and search assets without a media-type choice", async () => {
  const f = await fixture();
  const searches = [];
  await f.page.route("**/ipollowork-design/api/resources*", (route) => {
    const request = route.request();
    if (request.method() === "POST") {
      assert.equal(request.postDataJSON().item.kind, "asset");
      return route.fulfill({
        json: { html: '<video src="assets/demo.mp4" controls></video>' },
      });
    }
    const params = new URL(request.url()).searchParams;
    searches.push({ category: params.get("category"), query: params.get("q") });
    const asset = params.get("category") === "library";
    return route.fulfill({
      json: [
        {
          id: asset ? "library-demo" : "chart-demo",
          kind: asset ? "asset" : "component",
          title: asset ? "Launch footage" : "Revenue chart",
          description: "",
        },
      ],
    });
  });
  try {
    await f.page.evaluate(() => window.editorFixture.mount("a"));
    await f.page.getByRole("button", { name: "Edit", exact: true }).click();
    await f.page.getByTestId("design-properties-button").click();
    const components = f.page.getByRole("button", {
      name: "Components",
      exact: true,
    });
    const header = components.locator("..");
    assert.deepEqual(await header.locator("button").allTextContents(), [
      "Element",
      "Theme",
      "Components",
    ]);
    await components.click();
    const library = f.page.locator("[data-resource-library]");
    assert.deepEqual(await library.getByRole("tab").allTextContents(), [
      "Data",
      "Business",
      "Asset library",
    ]);
    await library.getByText("Revenue chart", { exact: true }).waitFor();
    await library.getByRole("tab", { name: "Business", exact: true }).click();
    await f.page.waitForFunction(
      () =>
        document
          .querySelector('[data-resource-library] [role="tabpanel"]')
          .getAttribute("aria-busy") === "false",
    );
    await library
      .getByRole("tab", { name: "Asset library", exact: true })
      .click();
    await library.getByText("Launch footage", { exact: true }).waitFor();
    await library
      .getByRole("textbox", {
        name: "Describe the component or asset you need",
      })
      .fill("launch");
    await library.getByRole("button", { name: "Search", exact: true }).click();
    await f.page.waitForFunction(
      () =>
        document
          .querySelector('[data-resource-library] [role="tabpanel"]')
          .getAttribute("aria-busy") === "false",
    );
    assert.equal(
      await library.getByRole("tab", { name: /Images|Videos/ }).count(),
      0,
    );
    await library.getByRole("button", { name: "Use", exact: true }).click();
    const saved = f.page.waitForResponse(
      (response) =>
        response.url().endsWith("/fixture/file") &&
        response.request().method() === "POST",
    );
    await f.page
      .getByRole("button", { name: "Save design", exact: true })
      .click();
    assert.equal((await saved).status(), 200);
    await f.page.waitForFunction(() =>
      document
        .querySelector("#a iframe")
        ?.contentDocument?.querySelector("video"),
    );
    assert.ok(f.currentFile().content.includes("<h1>CURRENT</h1>"));
    assert.ok(f.currentFile().content.includes('src="assets/demo.mp4"'));
    assert.deepEqual(
      searches.map((search) => search.category),
      ["data", "business", "library", "library"],
    );
    assert.equal(searches.at(-1).query, "launch");
  } finally {
    await f.page.close();
  }
});

async function mountAndHoldRead(f) {
  await f.page.evaluate(() => window.editorFixture.mount("a"));
  await f.page.waitForFunction(() =>
    document
      .querySelector("#a iframe")
      ?.contentDocument?.querySelector("#ipollowork-design-navigation-runtime"),
  );
  f.holdHtmlRead();
  for (let attempt = 0; !f.hasHeldHtmlRead() && attempt < 40; attempt++)
    await f.page.waitForTimeout(100);
  assert.equal(f.hasHeldHtmlRead(), true);
}

test("an external update cannot lend its revision to an older local draft", async () => {
  const f = await fixture();
  try {
    await mountAndHoldRead(f);
    await editHtml(f.page, "MY LOCAL DRAFT");
    f.externalChange("EXTERNAL UPDATE");
    await f.releaseHtmlRead(true);
    await f.page.waitForTimeout(100);
    const response = f.page.waitForResponse(
      (response) =>
        response.url().endsWith("/fixture/file") &&
        response.request().method() === "POST",
    );
    await f.page
      .getByRole("button", { name: "Save design", exact: true })
      .click();
    assert.equal((await response).status(), 409);
    assert.equal(f.fileWrites[0].baseUpdatedAt, 1);
    assert.equal(f.currentFile().content, "EXTERNAL UPDATE");
  } finally {
    await f.page.close();
  }
});

test("a late old GET cannot roll back the base of two consecutive saves", async () => {
  const f = await fixture();
  try {
    await mountAndHoldRead(f);
    await editHtml(f.page, "FIRST SAVE");
    const save = async () => {
      const response = f.page.waitForResponse(
        (response) =>
          response.url().endsWith("/fixture/file") &&
          response.request().method() === "POST",
      );
      await f.page
        .getByRole("button", { name: "Save design", exact: true })
        .click();
      assert.equal((await response).status(), 200);
    };
    await save();
    await f.releaseHtmlRead();
    await f.page.waitForTimeout(100);
    await editHtml(f.page, "SECOND SAVE");
    await save();
    assert.deepEqual(
      f.fileWrites.map((write) => write.baseUpdatedAt),
      [1, 2],
    );
    assert.match(f.currentFile().content, /SECOND SAVE/);
  } finally {
    await f.page.close();
  }
});
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

test("optional theme sheets change variables without overriding custom layout or fonts", async () => {
  const page = await browser.newPage();
  try {
    await page.goto(url + "/tests/browser/editor-state.html");
    const result = await page.evaluate(async () => {
      const themes =
        await import("/packages/studio-core/src/original/app/src/react-app/domains/session/design/design-system-registry.ts");
      const css = themes.buildTemplateTokenCss(
        themes.DESIGN_SYSTEM_THEMES[0],
        "variables",
      );
      const sample = document.createElement("div");
      sample.style.cssText =
        "font-family:fantasy;padding:37px;letter-spacing:3px;color:var(--ipw-color-primary,rgb(1,2,3))";
      sample.textContent = "A custom design";
      document.body.append(sample);
      const before = getComputedStyle(sample).color;
      const style = document.createElement("style");
      style.textContent = css;
      document.head.append(style);
      const computed = getComputedStyle(sample);
      return {
        css,
        before,
        after: computed.color,
        font: computed.fontFamily,
        padding: computed.padding,
        spacing: computed.letterSpacing,
      };
    });
    assert.ok(!result.css.includes("!important"));
    assert.ok(!/(?:^|\n)\s*(?:html|body)\b/.test(result.css));
    assert.notEqual(result.before, result.after);
    assert.equal(result.font, "fantasy");
    assert.equal(result.padding, "37px");
    assert.equal(result.spacing, "3px");
  } finally {
    await page.close();
  }
});
