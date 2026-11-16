/** Real installed DSH regression: lazy assets, editing, saving, history and Video. */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

/** Exercise the installed native packages through their actual browser and HTTP interfaces. */
export async function verifyNativeEditors({ address, home, profile, cookie }) {
  const executablePath =
    process.env.STUDIO_BROWSER_EXECUTABLE ||
    [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
    ].find(existsSync);
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
  });
  page.setDefaultTimeout(30_000);
  const errors = [],
    rendererRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/\/ipollowork-\w+\/assets\/renderer-/.test(request.url()))
      rendererRequests.push(request.url());
  });
  page.on("response", (response) => {
    if (
      response.request().method() === "POST" &&
      response.url().includes("/ipollowork-")
    )
      console.log(
        "Studio browser write",
        new URL(response.url()).pathname,
        response.status(),
      );
  });
  const output = resolve(".runtime", "browser-verification", profile);
  await mkdir(output, { recursive: true });
  try {
    await page.goto(address);
    await page.getByRole("button", { name: "Design", exact: true }).waitFor();
    await dismissStartup(page);
    assert.equal(
      rendererRequests.length,
      0,
      "Registration must not download an unopened editor",
    );
    await page
      .getByRole("button", { name: /^(New session|新会话)$/i })
      .last()
      .click();
    await dismissStartup(page);
    const chooseWorkspace = page.getByRole("button", {
      name: /^(Choose workspace|选择工作区)$/,
    });
    if (await chooseWorkspace.isVisible()) {
      await chooseWorkspace.click();
      await page
        .getByRole("menuitem", { name: /^(Default workspace|默认工作区)/ })
        .click();
    }
    await dismissStartup(page);
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await openProject(page, "Design");
    await page.locator("[data-studio-editor]:visible").waitFor();
    await page.locator('[data-studio-editor] iframe[data-preview-loaded="true"]').waitFor();
    console.log("Installed Design renderer mounted");
    if (process.env.STUDIO_HIDDEN_COMPONENTS_ONLY === "1") {
      await verifyHiddenResources(page);
      const collapse = page.getByRole("button", {name:"Collapse sidebar",exact:true});
      if (await collapse.isVisible()) await collapse.click();
      for (const width of [1280, 390]) {
        await page.setViewportSize({width, height:844});
        for (const theme of ["light", "dark"]) {
          await page.evaluate(theme => document.body.toggleAttribute("data-ds-dark-theme", theme === "dark"), theme);
          await page.locator(`[data-studio-editor][data-theme="${theme}"]`).waitFor();
          assert.equal(await page.getByRole("button", {name:"Components",exact:true}).count(), 0);
          await page.screenshot({path:resolve(output, `hidden-components-design-${theme}-${width}.png`)});
        }
      }
      await page.setViewportSize({width:1280,height:800});
      await page.getByRole("button", {name:"Video",exact:true}).click();
      await openProject(page, "Video");
      await page.getByTestId("video-panel").waitFor({timeout:60000});
      await page.getByText("Starting the local video service...", {exact:true}).waitFor({state:"hidden",timeout:60000});
      assert.equal(await page.locator("[data-resource-library]").count(), 0);
      assert.equal(await page.getByRole("button", {name:/^Components and assets/}).count(), 0);
      for (const width of [1280,390]) {
        await page.setViewportSize({width,height:844});
        for (const theme of ["light","dark"]) {
          await page.evaluate(theme => document.body.toggleAttribute("data-ds-dark-theme",theme==="dark"),theme);
          await page.screenshot({path:resolve(output,`hidden-components-video-${theme}-${width}.png`)});
        }
      }
      assert.deepEqual(errors,[]);
      console.log("Installed Design and Video hide unfinished components in both themes at 1280px and 390px");
      return {videoPreviewUrl:undefined};
    }

    assert.ok(
      rendererRequests.some((url) => url.includes("ipollowork-design")),
    );
    const registry = JSON.parse(
      await readFile(resolve(home, "storages/workspace.json"), "utf8"),
    );
    const [workspaceId, workspace] = Object.entries(
      registry.tables.workspaces,
    ).find(([, item]) => item.sessionIds.length > 0);
    const sessionId = workspace.sessionIds[0];
    const origin = new URL(address).origin;
    const grant = await fetch(origin + "/ipollowork-design/bootstrap", {
      headers: { cookie },
    }).then((response) => response.json());
    const headers = {
      cookie,
      "x-ipollowork-design-token": grant.token,
      "content-type": "application/json",
    };
    const query = new URLSearchParams({ workspaceId, sessionId });
    const api = async (path, body) => {
      const response = await fetch(origin + "/ipollowork-design/api" + path, {
        headers,
        method: body ? "POST" : "GET",
        body: body ? JSON.stringify(body) : undefined,
      });
      assert.equal(response.status, 200, await response.clone().text());
      return response.json();
    };
    let snapshot = await api("/session?" + query);
    const originalBlank = await readFile(
      resolve(workspace.path, snapshot.state.entry),
      "utf8",
    );
    assert.ok(originalBlank.includes("--ipw-color-bg"));
    const templates = await api(
      "/templates?" + new URLSearchParams({ workspaceId }),
    );
    const site = templates.find((item) => item.manifest.category === "site");
    await api("/template", {
      workspaceId,
      sessionId,
      templateId: site.manifest.id,
    });
    await page.reload();
    await dismissStartup(page);
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await openProject(page, "Design");
    await page
      .getByRole("combobox", { name: /^(Design version|设计版本)$/ })
      .waitFor();
    snapshot = await api("/session?" + query);
    const currentPath = snapshot.state.entry;
    const runId = randomUUID().slice(0, 8);
    const currentTitle = `Editable current version ${runId}`;
    const savedTitle = `Saved from the real editor ${runId}`;
    const html = (text) =>
      `<!doctype html><html><head><style>body{font:24px system-ui;padding:48px;background:white;color:#222}</style></head><body><h1>${text}</h1></body></html>`;
    await api("/file", {
      workspaceId,
      path: `design/.versions/${sessionId}/1-before-ai.html`,
      content: html("Saved first version"),
    });
    await api("/file", {
      workspaceId,
      path: currentPath,
      content: html(currentTitle),
    });
    const preview = page.frameLocator("[data-studio-editor] iframe:visible");
    await preview
      .getByRole("heading", { name: currentTitle, exact: true })
      .waitFor();
    const markupButton = page.getByTestId("design-markup-toggle");
    assert.equal(await page.getByTestId("design-mode-toggle").count(), 0);
    assert.equal(await page.getByTestId("design-template-market-button").count(), 0);
    await markupButton.click();
    const markup = page.getByTestId("design-markup");
    await markup.waitFor();
    assert.equal(await markup.locator('input:not([type=file]),textarea').count(), 1);
    const markupCanvas = await markup.locator("svg").first().boundingBox();
    assert.ok(markupCanvas);
    await page.mouse.move(markupCanvas.x + 20, markupCanvas.y + 25);
    await page.mouse.down();
    await page.mouse.move(markupCanvas.x + 140, markupCanvas.y + 100, { steps: 5 });
    await page.mouse.up();
    for (const width of [1280, 390]) {
      if (width === 390) await page.getByRole("button", {name: "Collapse sidebar", exact: true}).click();
      await page.setViewportSize({ width, height: 800 });
      for (const theme of ["light", "dark"]) {
        await page.evaluate(theme => document.body.toggleAttribute("data-ds-dark-theme", theme === "dark"), theme);
        await page.locator(`[data-studio-editor][data-theme="${theme}"]`).waitFor();
        await page.screenshot({ path: resolve(output, `design-markup-${theme}-${width}.png`) });
      }
    }
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.keyboard.press("Escape");
    await markup.waitFor({ state: "hidden" });
    if (process.env.STUDIO_SMOKE_MARKUP_ONLY === "1") await page.getByRole("button", { name: /^(Edit|编辑)$/ }).click();
    if (process.env.STUDIO_SMOKE_MARKUP_ONLY === "1") {
      const select = await fetch(origin + "/studio-ai-fixture/select", {
        method:"POST", headers:{cookie,"content-type":"application/json"}, body:JSON.stringify({sessionId}),
      });
      assert.equal(select.status,200);
      await preview.getByRole("heading").first().click();
      await page.getByRole("button", {name:/^(AI edit|AI 编辑)$/}).click();
      const selectionPrompt = page.getByTestId("design-selection-prompt");
      await selectionPrompt.getByRole("textbox").fill("Make this selected heading blue");
      await page.screenshot({path:resolve(output,"design-selection-prompt.png")});
      await selectionPrompt.getByRole("button",{name:/^(Send to AI|发送给 AI)$/}).click();
      await selectionPrompt.waitFor({state:"hidden"});
      await page.locator("[data-studio-editor]:visible").waitFor();
      await page.getByRole("button", {name:/^(Open in conversation|在对话中打开)$/}).filter({visible:true}).click();
      await page.getByRole("paragraph").filter({hasText:"VIDEO_AI_FIXTURE_ACCEPTED"}).first().waitFor();
      await page.getByRole("button", {name:"Design",exact:true}).click();
      await openProject(page,"Design");
      await page.locator('[data-studio-editor]:visible iframe[data-preview-loaded="true"]').waitFor();
      const beforeMarkup = (await api("/file?" + new URLSearchParams({workspaceId,path:currentPath}))).content;
      await page.getByTestId("design-markup-toggle").filter({visible:true}).click();
      const note = page.getByTestId("design-markup").filter({visible:true});
      await note.waitFor();
      const drawing = await note.locator("svg").first().boundingBox();
      assert.ok(drawing);
      await page.mouse.move(drawing.x+30,drawing.y+30);
      await page.mouse.down();
      await page.mouse.move(drawing.x+130,drawing.y+100);
      await page.mouse.up();
      await note.getByRole("textbox").fill("Make this marked title larger");
      await note.getByRole("button",{name:/^(Send to AI|发送给 AI)$/}).click();
      await note.waitFor({state:"hidden"});
      await page.locator("[data-studio-editor]:visible").waitFor();
      await page.getByRole("button", {name:/^(Open in conversation|在对话中打开)$/}).filter({visible:true}).click();
      await page.locator("[data-design-context-chip]").first().waitFor();
      await page.getByRole("paragraph").filter({hasText:"VIDEO_AI_FIXTURE_ACCEPTED"}).first().waitFor();
      await page.locator("[data-design-context-chip]").nth(1).waitFor();
      assert.equal(await page.locator("[data-design-context-chip]").count(),2);
      assert.ok((await page.locator("[data-design-context-chip]").allTextContents()).some(label => label.includes("H1")));
      await page.screenshot({path:resolve(output,"design-message-chips.png")});
      const observed = await fetch(origin+"/studio-ai-fixture",{headers:{cookie}}).then(response=>response.json());
      const contents = observed.requests.flat();
      assert.ok(JSON.stringify(contents).includes("Make this marked title larger"));
      assert.ok(JSON.stringify(contents).includes("Make this selected heading blue"));
      assert.ok(contents.some(message => Array.isArray(message.content) && message.content.some(part=>part.type==="image")));
      assert.equal((await api("/file?"+new URLSearchParams({workspaceId,path:currentPath}))).content,beforeMarkup);
      console.log("Marked screenshot and instruction reached the native model together");
      if(process.env.STUDIO_SMOKE_DOCUMENT_TEXT === "1") {
        const response=await api("/file?"+new URLSearchParams({workspaceId,path:currentPath}));
        await api("/file",{workspaceId,path:currentPath,baseUpdatedAt:response.updatedAt,content:'<!doctype html><meta name="ipw-document-type" content="document"><article><p class="eyebrow">DECORATION</p><h1>Document title</h1><p>Main body text</p></article>'});
        await page.reload();await dismissStartup(page);
        await page.getByRole("button",{name:"Design",exact:true}).click();await openProject(page,"Design");
        await page.getByRole("button",{name:"Text",exact:true}).click();
        const text=page.getByTestId("document-text-editor");await text.waitFor();
        assert.equal(await text.getByRole("textbox").count(),2);
        assert.equal(await text.getByRole("button").count(),0);
        const body = text.getByRole("textbox", {name:"Text p",exact:true});
        const longText = "Long document content should wrap and keep the full text. ".repeat(40);
        await body.fill(longText);
        await page.setViewportSize({width:390,height:800});
        await page.waitForFunction(()=>{const p=document.querySelector('[data-testid="document-text-editor"] textarea[data-kind="p"]');return p&&p.clientHeight>=p.scrollHeight-1;});
        assert.equal(await body.inputValue(),longText);
        await page.screenshot({path:resolve(output,"document-text-long-390.png")});
        await page.setViewportSize({width:1280,height:800});
        await body.fill("Main body text");
        await text.getByRole("textbox",{name:"Text h1",exact:true}).fill("Updated document title");
        await page.getByRole("button",{name:"Browse",exact:true}).click();
        await page.frameLocator('[data-studio-editor]:visible iframe').getByRole("heading",{name:"Updated document title"}).waitFor();
        await page.getByRole("button",{name:/^(Save design|保存设计)$/}).click();
        const saveMenu=page.getByRole("menuitem",{name:/^(Save design|保存设计)$/});
        await saveMenu.click();
        await page.getByText("Design saved to the workspace.",{exact:true}).waitFor();
        const stored=(await api("/file?"+new URLSearchParams({workspaceId,path:currentPath}))).content;
        assert.ok(stored.includes("Updated document title"));assert.ok(stored.includes('<p class="eyebrow">DECORATION</p>'));
        await page.screenshot({path:resolve(output,"document-text-preview.png")});
        console.log("Installed text mode edits main content and preserves decorative copy");
      }

      return {};
    }
    await page.getByRole("button", { name: /^(Edit|编辑)$/ }).click();
    const heading = preview.getByRole("heading", {
      name: currentTitle,
      exact: true,
    });
    await heading.dblclick();
    await heading.fill(savedTitle);
    await page.keyboard.press("Tab");
    await page
      .getByRole("button", { name: /^(Save design|保存设计)$/ })
      .click();
    const [savedResponse] = await Promise.all([
      page.waitForResponse(
        (response) =>
          response.url().includes("/ipollowork-design/api/file") &&
          response.request().method() === "POST",
      ),
      page.getByRole("menuitem", { name: /^(Save design|保存设计)$/ }).click(),
    ]);
    assert.equal(savedResponse.status(), 200, await savedResponse.text());
    console.log("Installed Design editor saved HTML");
    assert.ok(
      (
        await api(
          "/file?" + new URLSearchParams({ workspaceId, path: currentPath }),
        )
      ).content.includes(savedTitle),
    );
    const version = page.getByRole("combobox", {
      name: /^(Design version|设计版本)$/,
    });
    const savedHistoryPath = `design/.versions/${sessionId}/1-before-ai.html`;
    const savedHistory = await api("/history?" + query);
    const savedHistoryIndex = savedHistory.versions.findIndex(item => item.path === savedHistoryPath);
    assert.ok(savedHistoryIndex >= 0, "The explicitly saved history entry must be present");
    const savedHistoryLabel = `V${savedHistory.versions.length - savedHistoryIndex}`;
    await version.click();
    await page.getByRole("option", { name: savedHistoryLabel, exact: true }).click();
    await preview
      .getByRole("heading", { name: "Saved first version", exact: true })
      .waitFor();
    assert.equal(
      (await api("/history?" + query)).selectedPath,
      `design/.versions/${sessionId}/1-before-ai.html`,
    );
    await version.click();
    await page.getByRole("option").first().click();
    await preview
      .getByRole("heading", { name: savedTitle, exact: true })
      .waitFor();
    const appManifest = { ...snapshot.manifest, category: "app" };
    delete appManifest.layoutLibrary;
    await api("/file", {
      workspaceId,
      path: currentPath.replace(/[^/]+$/, "manifest.json"),
      content: JSON.stringify(appManifest),
    });
    await page.reload();
    await dismissStartup(page);
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await openProject(page, "Design");
    await page
      .frameLocator("[data-studio-editor] iframe:visible")
      .getByRole("heading", { name: savedTitle, exact: true })
      .waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    const narrowVersion = page.getByRole("combobox", {
      name: /^(Design version|设计版本)$/,
    });
    await narrowVersion.click();
    await page.getByRole("option", { name: "V1", exact: true }).waitFor();
    const bounds = await narrowVersion.boundingBox();
    assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= 390);
    await page.screenshot({ path: resolve(output, "design-history-390.png") });
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page
      .getByRole("button", { name: /^(Open in conversation|在对话中打开)$/ })
      .click();
    await dismissStartup(page);
    const composer = page.locator('[contenteditable="true"][role="textbox"]');
    const instruction = "请把选中的标题改得更简洁";
    await composer.fill(instruction);
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await openProject(page, "Design");
    await page.getByRole("button", { name: /^(Edit|编辑)$/ }).click();
    await page
      .frameLocator("[data-studio-editor] iframe:visible")
      .getByRole("heading", { name: savedTitle, exact: true })
      .click();
    await page.getByRole("button", { name: /^(AI edit|AI 编辑)$/ }).click();
    const inlinePrompt = page.getByTestId("design-selection-prompt");
    await inlinePrompt.waitFor();
    assert.ok((await inlinePrompt.innerText()).includes(savedTitle));
    await inlinePrompt.getByRole("textbox").fill("Shorten this heading");
    await page.screenshot({path:resolve(output,"design-selection-label.png")});
    await inlinePrompt.getByRole("button",{name:/^(Close|关闭)$/}).click();
    await page.getByRole("button", {name:/^(Open in conversation|在对话中打开)$/}).filter({visible:true}).click();
    assert.ok((await composer.innerText()).includes(instruction));
    await verifyDesignConnection({
      page,
      origin,
      cookie,
      workspace,
      workspaceId,
      sessionId,
      output,
      api,
      composer,
    });
    await verifyHiddenResources(page);
    await page.getByRole("button", { name: "Video", exact: true }).click();
    await openProject(page, "Video");
    const video = page.frameLocator("iframe[data-video-studio]");
    await video.getByRole("button", { name: /^(Play|播放)$/ }).waitFor();
    await page.screenshot({ path: resolve(output, "video-workbench.png") });
    assert.deepEqual(
      errors,
      [],
      "The installed editors must not produce browser errors",
    );
    console.log(
      "Installed native editors: lazy load, edit/save/reopen, website and app versions, selection label, narrow menu and Video passed",
    );
    const videoPreviewUrl = await page
      .locator("iframe[data-video-studio]")
      .getAttribute("src");
    assert.ok(
      videoPreviewUrl,
      "The loaded Video preview must expose its address",
    );
    assert.equal(await page.locator("[data-resource-library]").count(), 0);
    await verifyTemplateLibrary(page, output);
    assert.deepEqual(
      errors,
      [],
      "Template navigation must not produce browser errors",
    );
    return { videoPreviewUrl };
  } catch (error) {
    await writeFile(
      resolve(output, "failure.txt"),
      await page.locator("body").ariaSnapshot(),
    );
    await page
      .screenshot({ path: resolve(output, "failure.png") })
      .catch(() => {});
    throw error;
  } finally {
    await browser.close();
  }
}

async function verifyHiddenResources(page) {
  const editor = page.locator("[data-studio-editor]:visible").last();
  const edit = editor.getByRole("button", { name: "Edit", exact: true });
  if ((await edit.getAttribute("aria-pressed")) !== "true") await edit.click();
  const properties = editor.getByTestId("design-properties-button");
  if ((await properties.getAttribute("aria-pressed")) !== "true") await properties.click();
  assert.equal(await editor.getByRole("button", {name:"Components",exact:true}).count(),0);
  assert.equal(await editor.locator("[data-resource-library]").count(),0);
}

async function verifyDesignConnection({
  page,
  origin,
  cookie,
  workspace,
  workspaceId,
  sessionId,
  output,
  api,
  composer,
}) {
  const path = "external/landing.html";
  const original =
    "<!doctype html><html><body><h1>Untouched external page</h1></body></html>";
  const html =
    "<!doctype html><html><head><style>body{margin:0;background:#132b29;color:#f1e9d9;font:32px system-ui;padding:60px}h1{font-size:72px}</style></head><body><h1>A freely redesigned website</h1></body></html>";
  await mkdir(resolve(workspace.path, "external"), { recursive: true });
  await writeFile(resolve(workspace.path, path), original);
  const selected = await fetch(origin + "/studio-ai-fixture/select", {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({ sessionId, designPath: path, html }),
  });
  assert.equal(selected.status, 200);
  await composer.fill(
    "DESIGN_CONNECTION_TEST: completely redesign the workspace landing page with your own layout.",
  );
  await page.getByRole("button", { name: /^(Send message|发送消息)$/ }).click();
  await page.getByText("DESIGN_FIXTURE_COMPLETE", { exact: false }).waitFor();
  await page
    .frameLocator("[data-studio-editor] iframe:visible")
    .getByRole("heading", { name: "A freely redesigned website", exact: true })
    .waitFor();
  assert.equal(await readFile(resolve(workspace.path, path), "utf8"), html);
  const current = await api(
    "/session?" + new URLSearchParams({ workspaceId, sessionId }),
  );
  assert.equal(current.state.entry, path);
  const captured = await fetch(origin + "/studio-ai-fixture", {
    headers: { cookie },
  }).then((response) => response.json());
  const finalRequest = JSON.stringify(captured.requests.at(-1));
  assert.ok(finalRequest.includes("Design:"));
  assert.ok(finalRequest.includes(path));
  assert.ok(finalRequest.includes("Themes are optional"));
  await page.getByRole("button", { name: "Open design", exact: true }).click();
  await page
    .frameLocator("[data-studio-editor] iframe:visible")
    .getByRole("heading", { name: "A freely redesigned website", exact: true })
    .waitFor();
  await page.screenshot({ path: resolve(output, "design-ai-connected.png") });
  const changed = html.replace(
    "A freely redesigned website",
    "Live file update reached Design",
  );
  await writeFile(resolve(workspace.path, path), changed);
  await page
    .frameLocator("[data-studio-editor] iframe:visible")
    .getByRole("heading", {
      name: "Live file update reached Design",
      exact: true,
    })
    .waitFor();
  assert.equal(await readFile(resolve(workspace.path, path), "utf8"), changed);
  const actions = page
    .locator("[data-design-file-actions]")
    .and(page.locator('[data-design-path$="landing.html"]'))
    .last();
  await actions.waitFor();
  assert.equal(await actions.getByRole("button").count(), 2);
  assert.equal(
    await page
      .locator("[data-presented-file] [data-design-file-actions]")
      .count(),
    1,
  );
  assert.equal(
    await page
      .getByRole("button", { name: "Enable theme variables", exact: true })
      .count(),
    0,
  );
  const card = page.locator("[data-presented-file]").filter({ has: actions });
  const cardBounds = await card.boundingBox();
  const actionBounds = await actions.boundingBox();
  assert.ok(
    cardBounds &&
      actionBounds &&
      actionBounds.x >= cardBounds.x &&
      actionBounds.x + actionBounds.width <= cardBounds.x + cardBounds.width,
  );
  await page.screenshot({
    path: resolve(output, "design-file-actions-light.png"),
  });
  await card.screenshot({
    path: resolve(output, "design-file-actions-card.png"),
  });
  await setNativeTheme(page, "Dark");
  await page.screenshot({
    path: resolve(output, "design-file-actions-dark.png"),
  });
  await setNativeTheme(page, "Light");
  const preservedDraft = "Keep my existing editing request";
  await composer.fill(preservedDraft);
  await actions
    .getByRole("button", { name: "Continue editing", exact: true })
    .click();
  await page.locator("[data-composer-quote]").waitFor();
  assert.ok((await composer.innerText()).includes(preservedDraft));
  await page
    .locator("[data-composer-quote]")
    .getByRole("button", { name: /^(Remove quote|移除引用)$/ })
    .click();
  await actions
    .getByRole("button", { name: "New design", exact: true })
    .click();
  await page.locator("[data-composer-quote]").waitFor();
  const created = await api("/document?" + new URLSearchParams({ sessionId }));
  assert.notEqual(created.entry, path);
  assert.equal(await readFile(resolve(workspace.path, path), "utf8"), changed);
  const newHtml = await readFile(
    resolve(workspace.path, created.entry),
    "utf8",
  );
  assert.ok(newHtml.includes("<main></main>"));
  assert.ok(!newHtml.includes("Live file update"));
  await page
    .locator("[data-composer-quote]")
    .getByRole("button", { name: /^(Remove quote|移除引用)$/ })
    .click();
  console.log(
    "Native Design: neutral creation, AI writes, file links, live watching, file editing and independent new document passed",
  );
}

async function verifyTemplateLibrary(page, output) {
  const navigation = page.getByRole("button", { name: /^(Templates|模板)$/ });
  assert.equal(
    await navigation.count(),
    1,
    "Both bundles share one native Templates entry",
  );
  await navigation.click();
  const library = page.getByTestId("native-template-library");
  await library.waitFor();
  const design = library.locator(
    '[data-testid="template-library-item"][data-surface="design"]',
  );
  const video = library.locator(
    '[data-testid="template-library-item"][data-surface="video"]',
  );
  await design.first().waitFor();
  await video.first().waitFor();
  const firstCard = await design.first().boundingBox();
  const secondCard = await design.nth(1).boundingBox();
  assert.ok(
    firstCard &&
      secondCard &&
      firstCard.width < 350 &&
      secondCard.x > firstCard.x,
    "Desktop templates form a multi-column card grid",
  );
  const title = await design.first().getByRole("heading").innerText();
  const search = library.getByRole("textbox", { name: /^(Search…|搜索…)$/ });
  await search.fill("missing-template-no-match-96501");
  await library.getByText(/^(No templates found|没有找到模板)$/).waitFor();
  await search.fill(title);
  assert.equal(await library.getByTestId("template-library-item").count(), 1);
  await design
    .first()
    .getByRole("button", { name: /^(Add|收藏)/ })
    .first()
    .click();
  await search.fill("");
  await library.getByRole("tab", { name: /^(Mine|我的)$/ }).click();
  await library.getByRole("button", { name: /^(Favorite|收藏)$/ }).click();
  await library.getByRole("heading", { name: title, exact: true }).waitFor();
  await library.getByRole("tab", { name: /^(Built-in|内置)$/ }).click();
  await page.screenshot({ path: resolve(output, "templates-light.png") });
  await setNativeTheme(page, "Dark");
  await page.screenshot({ path: resolve(output, "templates-dark.png") });
  const collapse = page.getByRole("button", {
    name: /^(Collapse sidebar|收起侧边栏)$/,
  });
  if (await collapse.isVisible()) await collapse.click();
  await page.setViewportSize({ width: 390, height: 844 });
  const narrow = await library.boundingBox();
  assert.ok(
    narrow && narrow.x >= 0 && narrow.x + narrow.width <= 391,
    "Template page remains inside the narrow viewport",
  );
  await page.screenshot({ path: resolve(output, "templates-390.png") });
  assert.ok(
    await library.evaluate(
      (element) => element.scrollWidth <= element.clientWidth + 1,
    ),
    "Library fits a narrow viewport",
  );
  await page.setViewportSize({ width: 1280, height: 800 });
  await setNativeTheme(page, "Light");
  await design
    .first()
    .getByRole("button", { name: /^(Preview|预览)/ })
    .click();
  const preview = page.getByRole("dialog");
  await preview.getByRole("heading", { name: title, exact: true }).waitFor();
  await preview
    .getByRole("button", { name: /^(Use template|使用模板)$/ })
    .click();
  await page.locator("[data-studio-editor] iframe:visible").waitFor();
  assert.equal(
    await library.count(),
    0,
    "Using a template opens its native editor",
  );
  console.log(
    "Shared Templates: Design + Video, search, favorites, preview, new-session use, themes and 390px passed",
  );
}

async function setNativeTheme(page, theme) {
  if (process.env.STUDIO_SMOKE_SUITE) {
    await page.getByRole('button', { name: 'iPolloWork account', exact: true }).click();
    await page.getByRole('dialog', { name: 'Settings', exact: true }).getByRole('button', { name: 'General', exact: true }).click();
  } else {
    await page.getByRole("button", { name: "Account menu", exact: true }).click();
    await page.getByRole("menuitem", { name: "Settings", exact: true }).click();
  }
  const settings = page.getByRole("dialog", { name: "Settings", exact: true });
  await settings.getByRole("button", { name: theme, exact: true }).click();
  await page.waitForFunction(
    (value) => document.documentElement.style.colorScheme === value,
    theme.toLowerCase(),
  );
  await page.keyboard.press("Escape");
  await settings.waitFor({ state: "hidden" });
  await page.waitForFunction(() => {
    const card = document.querySelector("[data-presented-file]");
    if (!card) return true;
    const style = getComputedStyle(card);
    const target = document.createElement("span");
    target.style.backgroundColor = style
      .getPropertyValue("--dsw-alias-card-fill")
      .trim();
    return style.backgroundColor === target.style.backgroundColor;
  });
}

async function openProject(page, title) {
  await dismissStartup(page);
  const heading = page.getByRole("heading", { name: title, exact: true });
  await Promise.race([
    heading.waitFor({ state: "visible" }),
    page.locator("[data-studio-editor]:visible").waitFor({ state: "visible" }),
  ]);
  if (await heading.isVisible())
    await heading.locator("..").getByRole("button").first().click();
}

export async function dismissStartup(page) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const action = page
      .getByRole("button", { name: /^(Continue|继续|Close|关闭)$/ })
      .and(page.locator("button:enabled"))
      .filter({ visible: true })
      .last();
    try {
      await action.waitFor({ state: "visible", timeout: 2000 });
    } catch (error) {
      if (error.name !== "TimeoutError") throw error;
      return;
    }
    await action.click();
  }
  throw Error("Startup dialogs did not finish");
}
