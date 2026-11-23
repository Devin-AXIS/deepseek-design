/** Real installed DSH regression: lazy assets, editing, saving, history and Video. */
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { copyFile, mkdir, readFile, realpath, writeFile, utimes } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { promisify } from "node:util";
import { chromium } from "playwright-core";
import { videoProjectDirectory } from "../../packages/studio-core/src/original/types/src/hyperframes-project.ts";

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
  page.on("pageerror", (error) => errors.push(error.stack ?? error.message));
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
    if (process.env.STUDIO_SMOKE_VIDEO_WORKBENCH_ONLY === "1") {
      const videoPreviewUrl = await verifyVideoWorkbench(page, home, output, cookie);
      await verifyTemplateLibrary(page, output);
      assert.deepEqual(errors, []);
      return { videoPreviewUrl };
    }
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
    await api("/history?" + query); // Ensure the current manual-save baseline exists first.
    const savedHistoryPath = `design/.versions/${sessionId}/0-fixture.html`;
    await writeFile(resolve(workspace.path, savedHistoryPath), html("Saved first version"));
    await utimes(resolve(workspace.path, savedHistoryPath), new Date(1000), new Date(1000));
    const savedHistory = await api("/history?" + query);
    // This fixture writes the archive directly; reload to refresh the host file subscription.
    await page.reload();
    await dismissStartup(page);
    await page.getByRole("button", {name:"Design",exact:true}).click();
    await openProject(page,"Design");
    await preview.getByRole("heading",{name:savedTitle,exact:true}).waitFor();
    const displayedVersions = [...savedHistory.versions].sort((left, right) => right.path.localeCompare(left.path));
    const savedHistoryIndex = displayedVersions.findIndex(item=>item.path===savedHistoryPath);
    assert.ok(savedHistoryIndex >= 0);
    const historicalHeading = "Saved first version";
    const savedHistoryLabel = `V${displayedVersions.length-savedHistoryIndex}`;
    await version.click();
    await page.getByRole("option", { name: savedHistoryLabel, exact: true }).click();
    await preview.getByRole("heading", { name: historicalHeading, exact: true }).waitFor();
    assert.equal((await api("/history?" + query)).selectedPath, savedHistoryPath);
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
    assert.deepEqual(
      errors,
      [],
      "The installed editors must not produce browser errors",
    );
    console.log(
      "Installed Design: lazy load, edit/save/reopen, website and app versions, selection label and narrow menu passed",
    );
    const videoPreviewUrl = await verifyVideoWorkbench(page, home, output, cookie);
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

async function verifyVideoWorkbench(page, home, output, cookie) {
  await page.getByRole("button", { name: "Video", exact: true }).click();
  await openProject(page, "Video");
  const video = page.frameLocator("iframe[data-video-studio]");
  await video.getByRole("button", { name: /^(Play|播放)$/ }).waitFor();
  await page.screenshot({ path: resolve(output, "video-workbench.png") });
  const videoPreviewUrl = await page.locator("iframe[data-video-studio]").getAttribute("src");
  assert.ok(videoPreviewUrl, "The loaded Video preview must expose its address");
  await verifyVideoDuplication({ page, video, videoPreviewUrl, home, output, cookie });
  assert.equal(await page.locator("[data-resource-library]").count(), 0);
  return videoPreviewUrl;
}

async function verifyVideoDuplication({ page, video, videoPreviewUrl, home, output, cookie }) {
  const configResponse = await fetch(new URL("/__hyperframes_config", videoPreviewUrl));
  assert.ok(configResponse.ok);
  const config = await configResponse.json();
  const project = await realpath(config.projectDir);
  const projectFromHome = relative(await realpath(home), project);
  assert.ok(projectFromHome && !projectFromHome.startsWith(`..${sep}`));
  const source = resolve(project, "index.html");
  const verifyExport = process.env.STUDIO_SMOKE_VIDEO_EXPORT === "1";
  const run = promisify(execFile);
  if (verifyExport) {
    await mkdir(resolve(project, "assets"), { recursive: true });
    await run("ffmpeg", [
      "-nostdin", "-y", "-v", "error", "-f", "lavfi", "-i", "sine=frequency=523:duration=1.4",
      "-c:a", "pcm_s16le", resolve(project, "assets/test-tone.wav"),
    ]);
  }
  await copyFile(
    resolve("packages/studio-core/templates/video/ipollowork.hyperframes.course-journey/assets/gsap.min.js"),
    resolve(project, "gsap.min.js"),
  );
  await writeFile(source, `<!doctype html><html><head><meta charset="utf-8">
<style>body { margin: 0; } #main { background: #121e35; }
#fixture-card { position:absolute; inset: 42px auto auto 30px; padding: 10px 20px; background: #f8aa55; border-radius: 12px; font: 22px system-ui; }</style>
<script src="./gsap.min.js"></script></head><body>
<div id="main" data-composition-id="main" data-start="0" data-duration="3.5" data-width="640" data-height="360">
  <div id="fixture-card" data-timeline-clip-label="Fixture card" class="clip" data-start="0.5" data-duration="2.5" data-track-index="1">Editable motion</div>
  ${verifyExport ? '<audio id="test-tone" class="clip" src="assets/test-tone.wav" data-start="1" data-duration="1.4" data-track-index="3" data-volume="0.8"></audio>' : ""}
</div>
<script>
  const tl = gsap.timeline({paused: true});
  tl.fromTo("#fixture-card", {x:0}, {x:150, duration:0.75, ease:"power2.out"}, 0.5);
  window.__timelines = {main:tl};
</script></body></html>`);
  const original = video.locator('[data-clip="true"][data-el-id="index.html#fixture-card"]');
  await original.waitFor();
  await video.locator('[data-clip="true"][data-el-id^="index.html#fixture-card-"]')
    .first().waitFor({ state: "detached" });
  await original.click();
  const editActions = video.getByRole("button", { name: "Edit actions", exact: true });
  if (await editActions.isVisible()) await editActions.click();
  const duplicate = video.getByRole("button", { name: "Duplicate selected clips", exact: true });
  await duplicate.click();

  const waitForSource = async (matches) => {
    const deadline = Date.now() + 45_000;
    while (Date.now() < deadline) {
      const html = await readFile(source, "utf8");
      if (matches(html)) return html;
      await new Promise((done) => setTimeout(done, 100));
    }
    throw new Error("Video source did not reach the expected edit");
  };
  const hasDuplicate = (html) => html.includes('id="fixture-card-2"');
  const duplicated = await waitForSource(hasDuplicate);
  assert.match(duplicated, /#fixture-card-2\s*{/);
  assert.match(duplicated, /\.fromTo\("#fixture-card-2"[^\n]+, 3\)/);
  assert.match(duplicated, /data-composition-id="main"[^>]*data-duration="5\.5"/);
  const getEditAction = async (name) => {
    const action = video.getByRole("button", { name, exact: true });
    if (!(await action.isVisible())) await editActions.click();
    return action;
  };
  await (await getEditAction("Undo")).click();
  await waitForSource((html) => !hasDuplicate(html));
  await (await getEditAction("Redo")).click();
  await waitForSource(hasDuplicate);
  if (await editActions.getAttribute("aria-expanded") === "true") await editActions.click();
  const tabs = video.getByRole("group", { name: "Inspector panels" });
  await tabs.getByRole("button", { name: "Components", exact: true }).click();
  await video.getByTestId("component-catalog-toolbar").waitFor();
  await tabs.getByRole("button", { name: "Style", exact: true }).click();
  await page.getByTestId("video-style-tab-content").waitFor();
  await original.click();
  await tabs.getByRole("button", { name: "Animation", exact: true }).click();
  const animations = video.getByTestId("animation-templates-tab");
  await animations.getByLabel("Search animations", { exact: true }).fill("Fade In");
  const fade = animations.locator('[data-template-id="general-fade-in"]');
  await fade.getByRole("button", { name: "Apply Fade In", exact: true }).click();
  await fade.locator('[data-animation-action="edit"]').waitFor();
  const withEffect = await waitForSource((html) => html.includes("general-fade-in"));
  await fade.getByRole("button", { name: "Edit", exact: true }).click();
  await tabs.locator('button[aria-label="Layers"][aria-pressed="true"]').waitFor();
  await original.click();
  await (await getEditAction("Duplicate selected clips")).click();
  const withCopiedEffect = await waitForSource((html) => html.includes('id="fixture-card-3"'));
  assert.ok(withCopiedEffect.split("general-fade-in").length > withEffect.split("general-fade-in").length,
    "The copy must carry its own editable preset metadata");
  if (await editActions.getAttribute("aria-expanded") === "true") await editActions.click();
  const copiedEffect = video.getByTestId("semantic-motion-panel")
    .locator('[data-semantic-motion-id*="#fixture-card-3:"]');
  await copiedEffect.getByRole("button", { name: "Template parameters", exact: true }).click();
  const effectLine = (html, id) => html.split("\n").find((line) =>
    line.includes(`"motion:#${id}:general:general-fade-in"`));
  const previousEffect = effectLine(withCopiedEffect, "fixture-card-3");
  assert.ok(previousEffect);
  await copiedEffect.getByRole("slider", { name: /^(Duration|时长)$/ }).press("ArrowRight");
  const afterEffectEdit = await waitForSource((html) => {
    const savedEffect = effectLine(html, "fixture-card-3");
    return Boolean(savedEffect && savedEffect !== previousEffect);
  });
  assert.equal(effectLine(afterEffectEdit, "fixture-card"), effectLine(withCopiedEffect, "fixture-card"));
  const activePreview = video.getByTestId("preview-zoom-stage")
    .locator('div[style*="opacity: 1"] hyperframes-player');
  await activePreview.waitFor();
  await activePreview.getByLabel("Loading assets", { exact: true }).waitFor({ state: "hidden" });
  await video.getByRole("button", { name: "Play", exact: true }).click();
  const pause = video.getByRole("button", { name: "Pause", exact: true });
  await pause.waitFor();
  await pause.click();
  let exported;
  if (verifyExport) {
    await video.locator("header").getByRole("button", { name: "Export", exact: true }).click();
    const drawer = video.getByTestId("inspector-tab-content");
    await drawer.getByRole("combobox", { name: "Resolution", exact: true }).waitFor();
    const requested = page.waitForResponse((response) =>
      response.request().method() === "POST" && /\/api\/projects\/[^/]+\/render$/.test(new URL(response.url()).pathname));
    await drawer.getByRole("button", { name: "Export", exact: true }).click();
    const response = await requested;
    assert.ok(response.ok(), await response.text());
    const { jobId } = await response.json();
    assert.match(jobId, /^[a-zA-Z0-9_-]+$/);
    await drawer.getByRole("button", { name: /^Download .*\.mp4$/ }).and(
      drawer.locator("button:enabled"),
    ).waitFor({ timeout: 90_000 });
    exported = resolve(project, "renders", jobId + ".mp4");
    const { stdout } = await run("ffprobe", [
      "-v", "error", "-show_entries", "stream=codec_name,width,height:format=duration", "-of", "json", exported,
    ]);
    const metadata = JSON.parse(stdout);
    assert.ok(metadata.streams.some((stream) =>
      stream.codec_name === "h264" && stream.width === 1280 && stream.height === 720));
    assert.ok(metadata.streams.some((stream) => stream.codec_name === "aac"));
    assert.ok(Math.abs(Number(metadata.format.duration) - 5.5) < 0.15);
    const decoded = await run("ffmpeg", [
      "-hide_banner", "-xerror", "-i", exported,
      "-af", "silencedetect=noise=-45dB:duration=0.2", "-f", "null", "-",
    ]);
    const onset = Number(decoded.stderr.match(/silence_end: ([\d.]+)/)?.[1]);
    assert.ok(Math.abs(onset - 1) < 0.1, "The exported sound starts at its authored time");
    await video.getByTestId("export-panel-back").click();
    console.log("Video UI exported a fully decodable 720p MP4 with sound using the compatibility renderer");
  }
  for (const theme of ["Dark", "Light"]) {
    await setNativeTheme(page, theme);
    await video.locator(`html[data-ipollowork-theme="${theme.toLowerCase()}"]`).waitFor();
    await page.screenshot({ path: resolve(output, `video-duplicate-${theme.toLowerCase()}.png`) });
  }
  const sidebar = page.getByRole("button", { name: "Collapse sidebar", exact: true });
  const sidebarWasOpen = await sidebar.isVisible();
  if (sidebarWasOpen) await sidebar.click();
  await page.setViewportSize({ width: 390, height: 844 });
  await video.getByRole("button", { name: /^(Play|播放)$/ }).waitFor();
  await page.screenshot({ path: resolve(output, "video-duplicate-390.png") });
  await page.setViewportSize({ width: 1280, height: 800 });
  if (sidebarWasOpen) await page.getByRole("button", { name: "Open sidebar", exact: true }).click();
  if (exported) await verifyReferenceInConversation({ page, home, project, exported, cookie });
  console.log("Video duplicated editable motion and style, undid and redid it, opened components and theme, and applied an editable effect");
}

async function verifyReferenceInConversation({ page, home, project, exported, cookie }) {
  const registry = JSON.parse(await readFile(resolve(home, "storages/workspace.json"), "utf8"));
  const candidates = await Promise.all(Object.values(registry.tables.workspaces).map(async (workspace) => ({
    root: await realpath(workspace.path), sessionIds: workspace.sessionIds,
  })));
  const owner = candidates.flatMap(({ root, sessionIds }) =>
    sessionIds.map((sessionId) => ({ root, sessionId }))).find(({ root, sessionId }) =>
    resolve(root, videoProjectDirectory(sessionId)) === project);
  assert.ok(owner, "The reference project belongs to an installed DSH session");
  const asset = resolve(project, "assets/fixture-reference.mp4");
  await copyFile(exported, asset);
  const referencePath = relative(owner.root, asset).split(sep).join("/");
  const endpoint = new URL("/studio-ai-fixture", page.url()).href;
  const selected = await fetch(endpoint + "/select", {
    method: "POST",
    headers: { cookie, "content-type": "application/json" },
    body: JSON.stringify({ sessionId: owner.sessionId, referencePath }),
  });
  assert.equal(selected.status, 200, await selected.text());
  await page.getByRole("button", { name: "Open in conversation", exact: true }).click();
  await page.locator('[contenteditable="true"][role="textbox"]').fill("检查当前 Video 工程里的参考片和两个时点。");
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await page.getByText("VIDEO_REFERENCE_FIXTURE_COMPLETE", { exact: true }).waitFor();
  const captured = await fetch(endpoint, { headers: { cookie } }).then((response) => response.json());
  assert.ok(captured.toolSets.some((names) => names.includes("ipollowork_video_reference")));
  const transcript = JSON.stringify(captured.requests.at(-1));
  assert.ok(transcript.includes("Rebuild motion from evidence"));
  assert.ok(transcript.includes("0.9.84"));
  const files = transcript.match(/video\/[a-zA-Z0-9_-]+\/renders\/reference-[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\.png/g);
  assert.equal(new Set(files).size, 2, "The real Agent receives both saved frame paths");
  for (const path of new Set(files))
    assert.equal((await readFile(resolve(owner.root, path))).subarray(1, 4).toString(), "PNG");
  console.log("Installed DSH Agent discovered the Video Skill, measured its own render and saved two project-local frames");
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
  assert.equal(selected.status, 200, await selected.text());
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
  assert.ok(finalRequest.includes("replace sample copy and data"));
  assert.ok(finalRequest.includes("Call present with the final workspace file path"));
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
  await page.getByRole("button", { name: /^(Collapse right sidebar|收起右侧边栏)$/ }).click();
  await page.locator("[data-studio-editor]:visible").waitFor({ state: "hidden" });
  const backgroundTitle = "A finished design saved while the panel was closed";
  const backgroundHtml = changed.replace("Live file update reached Design", backgroundTitle);
  await writeFile(resolve(workspace.path, path), backgroundHtml);
  await card.getByRole("button", { name: /landing\.html/ }).click();
  await page
    .frameLocator("[data-studio-editor] iframe:visible")
    .getByRole("heading", { name: backgroundTitle, exact: true })
    .waitFor();
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
    .getByRole("button", { name: "Edit in Design", exact: true })
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
  assert.equal(await readFile(resolve(workspace.path, path), "utf8"), backgroundHtml);
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
  await search.fill("Course Journey");
  const course = video.filter({ has: page.getByRole("heading", { name: "Course Journey", exact: true }) });
  await course.getByRole("button", { name: /^(Preview|预览)/ }).click();
  await page.getByRole("dialog").getByRole("button", { name: /^(Use template|使用模板)$/ }).click();
  const videoFrame = page.locator("iframe[data-video-studio]:visible");
  await videoFrame.contentFrame().getByRole("button", { name: /^(Play|播放)$/ }).waitFor();
  const courseConfig = await fetch(
    new URL("/__hyperframes_config", await videoFrame.getAttribute("src")),
  ).then((response) => response.json());
  assert.match(await readFile(resolve(courseConfig.projectDir, "index.html"), "utf8"), /data-ipw-template="course-journey"/);
  assert.ok((await readFile(resolve(courseConfig.projectDir, "design-tokens.css"), "utf8")).trim());
  await navigation.click();
  await library.waitFor();
  await search.fill("");
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
    "Shared Templates: Design + Video, search, favorites, preview, new-session use, theme tokens and 390px passed",
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
