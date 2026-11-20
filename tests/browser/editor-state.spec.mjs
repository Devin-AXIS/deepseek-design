/** Isolated real-component regressions; does not load or install a DSH profile. */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import { chromium } from "playwright-core";
const original = resolve("packages/studio-core/src/original");
const reviewCss = process.env.STUDIO_REVIEW_CSS ?? (() => {
  const manifest = JSON.parse(readFileSync("packages/deepseek-design/lib/studio/manifest.json", "utf8"));
  return resolve("packages/deepseek-design/lib/studio", manifest.stylesheet);
})();
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

for (const [name, source, fixedSlide] of [
  ["inline percentages in a scaled positioned parent", '<style>body{margin:0}.box{position:relative;margin:70px 100px;width:800px;height:450px;transform:scale(.75);transform-origin:0 0}</style><div class="box"><div id="target" style="position:absolute;left:25%;top:20%;width:20%;height:20%;background:#ddd">Move this</div></div>', false],
  ["stylesheet calc positions and content-box dimensions", '<style>body{margin:0}.box{position:relative;margin:70px 100px;width:800px;height:450px}#target{position:absolute;left:calc(20% + 17px);top:25%;width:20%;height:15%;padding:12px;border:3px solid;box-sizing:content-box;background:#ddd}</style><div class="box"><div id="target">Move this</div></div>', false],
  ["right and bottom anchoring", '<style>body{margin:0}.box{position:relative;margin:70px 100px;width:800px;height:450px}#target{position:absolute;right:15%;bottom:20%;padding:12px;border:3px solid;background:#ddd}</style><div class="box"><div id="target">Move this</div></div>', false],
  ["click jitter next to a snap guide", '<style>body{margin:0}.box{position:relative;margin:70px 100px;width:800px;height:450px}#target{position:absolute;left:396px;top:20%;width:120px;height:80px;background:#ddd}</style><div class="box"><div id="target">Move this</div></div>', false],
  ["fixed presentation stage zoom", '<style>body{margin:0}.slide{position:relative;width:100%;height:100%}#target{position:absolute;left:25%;top:20%;width:20%;height:20%;background:#ddd}</style><main class="deck"><section class="slide"><div id="target">Move this</div></section></main>', true],
]) test(`drag and resize preserve geometry for ${name}`, async () => {
  const page = await browser.newPage({viewport:{width:1280,height:900}});
  const near = (actual, expected, label) => assert.ok(Math.abs(actual - expected) < 1.2, `${label}: expected ${expected}, got ${actual}`);
  try {
    await page.goto(url + "/tests/browser/editor-state.html");
    await page.waitForFunction(() => window.editorFixture);
    await page.evaluate(({source,fixedSlide}) => {
      const frame = document.createElement("iframe");
      frame.id = "drag-runtime";
      frame.style.cssText = "position:absolute;left:0;top:0;width:1000px;height:700px;border:0";
      frame.srcdoc = window.editorFixture.preview(source, fixedSlide);
      document.body.append(frame);
    }, {source,fixedSlide});
    const frame = page.frameLocator("#drag-runtime");
    const target = frame.locator("#target");
    await target.waitFor();
    await page.waitForFunction(() => document.querySelector("#drag-runtime")?.contentDocument?.querySelector("#ipollowork-design-runtime-style"));
    if (fixedSlide) await page.waitForFunction(() => document.querySelector("#drag-runtime")?.contentDocument?.querySelector("#ipollowork-design-fixed-slide-runtime-style")?.textContent.includes("zoom:"));
    const before = await target.boundingBox();
    await target.click();
    const selected = await target.boundingBox();
    near(selected.x,before.x,"selection x"); near(selected.y,before.y,"selection y");
    await page.mouse.move(before.x+before.width/2,before.y+before.height/2);
    await page.mouse.down();
    await page.mouse.move(before.x+before.width/2+1,before.y+before.height/2+1);
    const jitter = await target.boundingBox();
    near(jitter.x,before.x,"click jitter x"); near(jitter.y,before.y,"click jitter y");
    await page.mouse.move(before.x+before.width/2+43,before.y+before.height/2+27,{steps:5});
    await page.mouse.up();
    const moved = await target.boundingBox();
    near(moved.x,before.x+43,"drag x"); near(moved.y,before.y+27,"drag y");
    near(moved.width,before.width,"drag width"); near(moved.height,before.height,"drag height");
    const handle = await frame.locator('#ipollowork-design-transform-overlay [data-handle="se"]').boundingBox();
    assert.ok(handle);
    await page.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);
    await page.mouse.down();
    await page.mouse.move(handle.x+handle.width/2+31,handle.y+handle.height/2+19,{steps:5});
    await page.mouse.up();
    const resized = await target.boundingBox();
    near(resized.x,moved.x,"resize x"); near(resized.y,moved.y,"resize y");
    near(resized.width,moved.width+31,"resize width"); near(resized.height,moved.height+19,"resize height");
    await mkdir(".runtime/drag-review",{recursive:true});
    await page.screenshot({path:resolve(".runtime/drag-review",name.replaceAll(" ","-")+".png")});
  } finally { await page.close(); }
});
test("split HTML loads its local CSS and JavaScript without persisting preview resources", async () => {
  const page = await browser.newPage();
  try {
    await page.goto(url + "/tests/browser/editor-state.html");
    await page.waitForFunction(() => window.editorFixture);
    const result = await page.evaluate(async () => window.editorFixture.hydrate(
      '<html><head><link rel="stylesheet" href="styles.css"></head><body><button id="action">Open</button><p id="status">waiting</p><script src="app.js"></script></body></html>',
      { 'site/styles.css': 'body{background:rgb(12, 70, 34)}', 'site/app.js': 'document.querySelector("#action").onclick=()=>document.querySelector("#status").textContent="ready";' },
    ));
    assert.match(result.saved, /href="styles.css"/);
    assert.match(result.saved, /src="app.js"/);
    assert.doesNotMatch(result.saved, /data-ipw-preview|rgb\(12|onclick=/);
    await page.evaluate(source => {
      const frame = document.createElement('iframe');
      frame.id = 'split-preview';
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.srcdoc = source;
      document.body.append(frame);
    }, result.source);
    const frame = page.frameLocator('#split-preview');
    await frame.getByRole('button', {name:'Open',exact:true}).click();
    await frame.getByText('ready',{exact:true}).waitFor();
    assert.equal(await frame.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor), 'rgb(12, 70, 34)');
  } finally { await page.close(); }
});
async function fixture({ failHtml = false, currentVersion, html, assets = {} } = {}) {
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
    ...(currentVersion === undefined ? {} : { currentVersion }),
  };
  const writes = [];
  const fileWrites = [];
  const currentPath = "design/session/index.html";
  const files = new Map([
    [
      currentPath,
      {
        content: html ?? "<!doctype html><html><body><h1>CURRENT</h1></body></html>",
        updatedAt: 1,
      },
    ],
  ]);
  for (const [path, content] of Object.entries(assets)) files.set(path, { content, updatedAt: 1 });
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

test("real Design editor keeps split-page styling and interactions in both themes and narrow view", async () => {
  const f = await fixture({
    html: '<!doctype html><html><head><link rel="stylesheet" href="styles.css"></head><body><h1>Wildlife</h1><button id="open">Details</button><p id="result">Waiting</p><script src="app.js"></script></body></html>',
    assets: {
      'design/session/styles.css': 'body{background:rgb(12,70,34);color:white;margin:0}h1{font-size:24px}',
      'design/session/app.js': 'document.querySelector("#open").onclick=()=>document.querySelector("#result").textContent="Details opened";',
    },
  });
  try {
    await f.page.evaluate(() => window.editorFixture.mount("a"));
    await f.page.frameLocator('#a iframe').getByRole('button', {name:'Details',exact:true}).waitFor();
    for (const width of [1440,390]) for (const theme of ['light','dark']) {
      await f.page.setViewportSize({width,height:900});
      await f.page.evaluate(theme=>document.body.toggleAttribute('data-ds-dark-theme',theme==='dark'),theme);
      await f.page.locator(`[data-studio-editor][data-theme="${theme}"]`).waitFor();
      const frame=f.page.frameLocator('#a iframe');
      assert.equal(await frame.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(12, 70, 34)');
      await frame.getByRole('button',{name:'Details',exact:true}).click();
      await frame.getByText('Details opened',{exact:true}).waitFor();
      await mkdir('.runtime/split-page-review',{recursive:true});
      await f.page.screenshot({path:`.runtime/split-page-review/${theme}-${width}.png`});
    }
  } finally {await f.page.close();}
});

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
    await f.page.locator('#a iframe[data-preview-loaded="true"]').waitFor();
    await f.page.waitForFunction(() => document.querySelector("#a iframe")?.contentDocument?.querySelector("h1")?.textContent === "CURRENT");
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
    // Insertion is asynchronous; save only after the preview contains the asset.
    await f.page.waitForFunction(() =>
      document.querySelector("#a iframe")?.contentDocument?.querySelector('video[data-ipw-preview-src="assets/demo.mp4"], video[src="assets/demo.mp4"]'),
    );
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


test("empty Design has no V1 and manual saves retain the current version number", async () => {
  const empty = await fixture({ currentVersion: 0 });
  try {
    await empty.page.evaluate(() => window.editorFixture.mount("a"));
    await empty.page.locator("#a iframe").waitFor();
    assert.equal(await empty.page.getByRole("combobox", { name: "Design version" }).count(), 0);
  } finally { await empty.page.close(); }
  const current = await fixture({ currentVersion: 1 });
  try {
    await current.page.addStyleTag({ path: reviewCss });
    await current.page.evaluate(() => window.editorFixture.mount("a"));
    const selector = current.page.getByRole("combobox", { name: "Design version" });
    await selector.waitFor();
    assert.match(await selector.innerText(), /V1/);
    await editHtml(current.page, "Manual edit");
    await current.page.getByRole("button", { name: "Save design", exact: true }).click();
    await current.page.waitForFunction(() => !document.querySelector('[data-testid="design-panel"] button[aria-label="Save design"]:enabled'));
    assert.match(await selector.innerText(), /V1/);
    await current.page.getByText("Design saved to the workspace.", { exact: true }).waitFor({ state: "hidden" });
    await mkdir(".runtime/version-review", { recursive: true });
    for (const width of [1440, 390]) {
      await current.page.setViewportSize({ width, height: 1000 });
      for (const theme of ["light", "dark"]) {
        await current.page.evaluate(theme => document.body.toggleAttribute("data-ds-dark-theme", theme === "dark"), theme);
        await current.page.locator(`[data-studio-editor][data-theme="${theme}"]`).waitFor();
        const box = await selector.boundingBox();
        assert.ok(box && box.x >= 0 && box.x + box.width <= width);
        await current.page.screenshot({ path: `.runtime/version-review/${theme}-${width}.png` });
      }
    }
  } finally { await current.page.close(); }
});


test("Design uses one edit toggle and local markup with undo, redo and images", async () => {
  const f = await fixture();
  const page = f.page;
  page.setDefaultTimeout(10000);
  try {
    await page.addStyleTag({ path: reviewCss });
    await page.evaluate(() => window.editorFixture.mount("a"));
    await page.locator("#a iframe[data-preview-loaded=true]").waitFor();
    assert.equal(await page.getByTestId("design-mode-toggle").count(), 0);
    assert.equal(await page.getByTestId("design-template-market-button").count(), 0);
    const edit = page.getByRole("button", { name: "Edit", exact: true });
    assert.equal(await edit.getAttribute("aria-pressed"), "false");
    await edit.click();
    assert.equal(await edit.getAttribute("aria-pressed"), "true");
    await edit.click();
    assert.equal(await edit.getAttribute("aria-pressed"), "false");
    await edit.click();
    await page.frameLocator("#a iframe").getByRole("heading", {name:"CURRENT", exact:true}).click();
    await page.getByRole("button", {name:"AI edit", exact:true}).click();
    const prompt = page.getByTestId("design-selection-prompt");
    await prompt.waitFor();
    assert.match(await prompt.innerText(), /H1 · CURRENT/);
    await prompt.getByRole("textbox").fill("Make this heading blue");
    let selectionRequests = [];
    await page.route("**/fixture/selection-prompt", route => {
      selectionRequests.push(route.request().postDataJSON());
      return selectionRequests.length === 1 ? route.fulfill({status:503,json:{message:"Selection unavailable"}}) : route.fulfill({json:{ok:true}});
    });
    await prompt.getByRole("button", {name:"Send to AI"}).click();
    await prompt.getByRole("alert").getByText("Selection unavailable").waitFor();
    assert.equal(await prompt.getByRole("textbox").inputValue(), "Make this heading blue");
    await page.keyboard.press("Escape");
    await prompt.waitFor({state:"hidden"});
    await page.getByRole("button", {name:"AI edit",exact:true}).click();
    assert.equal(await prompt.getByRole("textbox").inputValue(), "Make this heading blue");
    await page.setViewportSize({width:390,height:900});
    const promptBounds = await prompt.boundingBox();
    assert.ok(promptBounds && promptBounds.x >= 0 && promptBounds.x + promptBounds.width <=390);
    await prompt.getByRole("button", {name:"Send to AI"}).click();
    await prompt.waitFor({state:"hidden"});
    assert.equal(selectionRequests[1].instruction,"Make this heading blue");
    assert.equal(selectionRequests[1].context.target.tag,"h1");
    await page.setViewportSize({width:1440,height:1000});
    const writesBeforeMarkup = f.fileWrites.length;
    await page.getByTestId("design-markup-toggle").click();
    assert.equal(await edit.getAttribute("aria-pressed"), "false");
    const markup = page.getByTestId("design-markup");
    const canvas = markup.locator("svg").first();
    const box = await canvas.boundingBox();
    assert.ok(box);
    const draw = async (x, y, dx, dy) => {
      await page.mouse.move(box.x + box.width*x, box.y + box.height*y);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width*(x+dx), box.y + box.height*(y+dy), { steps: 6 });
      await page.mouse.up();
    };
    await draw(.12, .15, .24, .22);
    assert.equal(await canvas.locator('rect[data-mark]:not([data-corner])').count(), 1);
    await markup.getByRole("button", {name: "Pen", exact: true}).click();
    await draw(.5, .2, .12, .18);
    assert.equal(await canvas.locator("polyline").count(), 1);
    await markup.getByRole("button", {name: "Undo markup"}).click();
    assert.equal(await canvas.locator("polyline").count(), 0);
    await markup.getByRole("button", {name: "Redo markup"}).click();
    assert.equal(await canvas.locator("polyline").count(), 1);
    await markup.locator('input[type=file]').setInputFiles({name: "sample.png", mimeType: "image/png", buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEUlEQVR4nGP4z8DwH4QZYAwAR8oH+WdZbrcAAAAASUVORK5CYII=", "base64")});
    await canvas.locator("image").waitFor();
    await markup.getByRole("button", {name: "Close markup"}).click();
    await markup.waitFor({state:"hidden"});
    await page.getByTestId("design-markup-toggle").click();
    assert.equal(await canvas.locator("image").count(), 1);
    const image = canvas.locator("image");
    const beforeMove = await image.boundingBox();
    assert.ok(beforeMove);
    await page.mouse.move(beforeMove.x + beforeMove.width / 2, beforeMove.y + beforeMove.height / 2);
    await page.mouse.down();
    await page.mouse.move(beforeMove.x + beforeMove.width / 2 + 20, beforeMove.y + beforeMove.height / 2 + 10);
    await page.mouse.up();
    const afterMove = await image.boundingBox();
    assert.ok(afterMove && afterMove.x > beforeMove.x + 15);
    const handle = canvas.locator('[data-corner="ne"]').last();
    const corner = await handle.boundingBox();
    assert.ok(corner);
    await page.mouse.move(corner.x + corner.width / 2, corner.y + corner.height / 2);
    await page.mouse.down();
    await page.mouse.move(corner.x + corner.width / 2 + 15, corner.y + corner.height / 2 - 15);
    await page.mouse.up();
    const afterResize = await image.boundingBox();
    assert.ok(afterResize && afterResize.width > afterMove.width);
    assert.equal(await markup.locator('input:not([type=file]),textarea').count(), 1);
    await page.keyboard.press("Escape");
    await markup.waitFor({state:"hidden"});
    assert.equal(f.fileWrites.length, writesBeforeMarkup);
    await mkdir(".runtime/markup-review", { recursive:true });
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ["light", "dark"]) {
        await page.evaluate(theme => document.body.toggleAttribute("data-ds-dark-theme", theme === "dark"), theme);
        await page.locator(`[data-studio-editor][data-theme="${theme}"]`).waitFor();
        await page.getByTestId("design-markup-toggle").click();
        const toolbar = markup.getByRole("toolbar");
        const bounds = await toolbar.boundingBox();
        assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width);
        if (theme === "dark" && width === 390) {
          const ink = await toolbar.locator("button").first().evaluate(button => getComputedStyle(button.querySelector("svg")).color);
          assert.equal(ink, "rgb(237, 237, 237)");
        }
        await page.screenshot({path:`.runtime/markup-review/${theme}-${width}.png`});
        await page.keyboard.press("Escape");
      }
    }
    await page.getByTestId("design-markup-toggle").click();
    await markup.getByRole("textbox").fill("Make the marked title larger");
    let submissions = [];
    await page.route("**/fixture/markup", route => {
      submissions.push(route.request().postDataJSON());
      return submissions.length === 1
        ? route.fulfill({status:503,json:{message:"Try again"}})
        : route.fulfill({json:{ok:true}});
    });
    await markup.getByRole("button", {name:"Send to AI", exact:true}).click();
    await markup.getByRole("alert").getByText("Try again", {exact:true}).waitFor();
    assert.equal(await markup.getByRole("textbox").inputValue(), "Make the marked title larger");
    assert.equal(await canvas.locator("image").count(), 1);
    await markup.getByRole("button", {name:"Send to AI", exact:true}).click();
    await markup.waitFor({state:"hidden"});
    assert.equal(submissions.length,2);
    assert.equal(submissions[1].path,"design/session/index.html");
    assert.equal(submissions[1].instruction,"Make the marked title larger");
    assert.equal(submissions[1].type,"image/png");
    assert.ok(Buffer.from(submissions[1].image,"base64").length > 1000);
    await mkdir(".runtime/markup-review",{recursive:true});
    await import("node:fs/promises").then(fs => fs.writeFile(".runtime/markup-review/sent-preview.png",Buffer.from(submissions[1].image,"base64")));
    assert.equal(f.fileWrites.length,writesBeforeMarkup);
  } finally { await page.close(); }
});


test("text documents edit prose without formatting controls and preserve webpage styles", async()=>{
 const html='<!doctype html><meta name="ipw-document-type" content="document"><style>p{color:rgb(200,0,0)}</style><header><p class="eyebrow">ANNUAL REVIEW</p></header><article><h1>Report</h1><p class="intro">Original <strong>words</strong></p><p data-ipw-text="decoration">01 — CONTENT</p></article><footer><p>Company footer</p></footer>';
 const f=await fixture({html});const page=f.page;
 try {
  await page.addStyleTag({path:reviewCss});
  await page.evaluate(()=>window.editorFixture.mount("a"));
  await page.locator("#a iframe[data-preview-loaded=true]").waitFor();
  await page.getByRole("button",{name:"Text",exact:true}).click();
  const editor=page.getByTestId("document-text-editor");await editor.waitFor();
  assert.equal(await editor.getByRole("button").count(),0);
  assert.equal(await editor.getByRole("textbox").count(),2);
  assert.ok(Number(await editor.getByRole("textbox",{name:"Text h1",exact:true}).evaluate(el=>getComputedStyle(el).fontWeight))>=500);
  await editor.getByRole("textbox",{name:"Text p",exact:true}).fill("Updated words");
  await page.getByRole("button",{name:"Browse",exact:true}).click();
  await page.frameLocator("#a iframe").getByText("Updated words",{exact:true}).waitFor();
  await page.getByRole("button",{name:"Save design",exact:true}).click();
  await page.getByText("Design saved to the workspace.",{exact:true}).waitFor();
  assert.ok(f.fileWrites.at(-1).content.includes('<strong>words</strong>'));
  assert.ok(f.fileWrites.at(-1).content.includes('p{color:rgb(200,0,0)}'));
  for(const width of [1440,390]) {await page.setViewportSize({width,height:900});for(const theme of ["light","dark"]){await page.evaluate(theme=>document.body.toggleAttribute("data-ds-dark-theme",theme==="dark"),theme);await page.getByRole("button",{name:"Text",exact:true}).click();await editor.waitFor();await mkdir(".runtime/text-review",{recursive:true});await page.screenshot({path:`.runtime/text-review/${theme}-${width}.png`});await page.getByRole("button",{name:"Browse",exact:true}).click();}}
 } finally {await page.close();}
});

test("long document text grows on edits and narrower containers without overlapping later paragraphs", async () => {
  const title = "较长的文档标题，保留阅读字号并根据可用宽度自动换行。".repeat(4);
  const paragraph = "正文内容保持完整，增加文字后应该撑开当前段落，后面的文字顺着向下移动。".repeat(18);
  const f = await fixture({html:`<!doctype html><meta name="ipw-document-type" content="document"><article><h1>${title}</h1><p>Short paragraph</p><p>Following paragraph</p></article>`});
  const page=f.page;
  try {
    await page.addStyleTag({path:reviewCss});
    await page.evaluate(()=>window.editorFixture.mount("a"));
    await page.locator("#a iframe[data-preview-loaded=true]").waitFor();
    await page.getByRole("button",{name:"Text",exact:true}).click();
    const editor=page.getByTestId("document-text-editor");
    const heading=editor.getByRole("textbox",{name:"Text h1",exact:true});
    const body=editor.getByRole("textbox",{name:"Text p",exact:true}).first();
    const following=editor.getByRole("textbox",{name:"Text p",exact:true}).nth(1);
    await body.fill(paragraph);
    const wideHeight=await body.evaluate(el=>el.clientHeight);
    const checkFlow=async()=>{
      for(const input of [heading,body,following]) {
        const size=await input.evaluate(el=>({visible:el.clientHeight,needed:el.scrollHeight}));
        assert.ok(size.visible>=size.needed-1,JSON.stringify(size));
      }
      const first=await body.boundingBox(), second=await following.boundingBox();
      assert.ok(first && second && first.y+first.height<=second.y,"paragraphs must not overlap");
      assert.equal(await body.inputValue(),paragraph);
      assert.equal(await heading.evaluate(el=>getComputedStyle(el).fontSize),"30px");
      assert.equal(await body.evaluate(el=>getComputedStyle(el).fontSize),"16px");
    };
    await checkFlow();
    await page.setViewportSize({width:390,height:900});
    await page.waitForFunction(()=>{
      const body=document.querySelector('[aria-label="Text p"]');
      return body && body.clientHeight>=body.scrollHeight-1;
    },undefined,{timeout:2500});
    await checkFlow();
    assert.ok(await body.evaluate(el=>el.clientHeight)>wideHeight);
    await body.evaluate(el=>{el.style.fontSize="21px";document.fonts.dispatchEvent(new Event("loadingdone"));});
    const fontFit=await body.evaluate(el=>el.clientHeight>=el.scrollHeight-1);
    assert.ok(fontFit,"font metrics changes must recalculate paragraph height");
    await body.evaluate(el=>{el.style.removeProperty("font-size");document.fonts.dispatchEvent(new Event("loadingdone"));});
    await mkdir(".runtime/text-flow-review",{recursive:true});
    await page.screenshot({path:".runtime/text-flow-review/narrow.png"});
    await page.setViewportSize({width:1440,height:900});
    await page.waitForFunction(previous=>document.querySelector('[aria-label="Text p"]').clientHeight<=previous,wideHeight,{timeout:2500});
    await checkFlow();
    await body.fill("Short again");
    assert.ok(await body.evaluate(el=>el.clientHeight)<wideHeight);
    await page.getByRole("button",{name:"Browse",exact:true}).click();
    await page.frameLocator("#a iframe").getByText("Short again",{exact:true}).waitFor();
    const previewBody=page.frameLocator("#a iframe").locator("p").first();
    const previewNext=page.frameLocator("#a iframe").locator("p").nth(1);
    const a=await previewBody.boundingBox(),b=await previewNext.boundingBox();
    assert.ok(a&&b&&a.y+a.height<=b.y,"natural HTML flow must move later text down");
  } finally {await page.close();}
});
