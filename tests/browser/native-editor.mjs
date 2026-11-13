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
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await openProject(page, "Design");
    await page.locator("[data-studio-editor]").waitFor();
    console.log("Installed Design renderer mounted");
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
    const snapshot = await api("/session?" + query);
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
    const preview = page.frameLocator("[data-studio-editor] iframe");
    await preview
      .getByRole("heading", { name: currentTitle, exact: true })
      .waitFor();
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
    await version.click();
    await page.getByRole("option", { name: "V1", exact: true }).click();
    await preview
      .getByRole("heading", { name: "Saved first version", exact: true })
      .waitFor();
    assert.equal(
      (await api("/history?" + query)).selectedPath,
      `design/.versions/${sessionId}/1-before-ai.html`,
    );
    await version.click();
    await page.getByRole("option", { name: "V2", exact: true }).click();
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
    await page.getByRole("button", { name: "Design", exact: true }).click();
    await openProject(page, "Design");
    await page
      .frameLocator("[data-studio-editor] iframe")
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
      .frameLocator("[data-studio-editor] iframe")
      .getByRole("heading", { name: savedTitle, exact: true })
      .click();
    await page.getByRole("button", { name: /^(AI edit|AI 编辑)$/ }).click();
    const selectionLabel = page.locator("[data-composer-quote]");
    await selectionLabel.waitFor();
    assert.ok((await selectionLabel.innerText()).includes(savedTitle));
    assert.ok((await composer.innerText()).includes(instruction));
    assert.ok(!(await composer.innerText()).includes("Read the current file"));
    await page.screenshot({
      path: resolve(output, "design-selection-label.png"),
    });
    await selectionLabel
      .getByRole("button", { name: /^(Remove quote|移除引用)$/ })
      .click();
    assert.equal(await selectionLabel.count(), 0);
    assert.ok((await composer.innerText()).includes(instruction));
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

async function openProject(page, title) {
  await dismissStartup(page);
  const heading = page.getByRole("heading", { name: title, exact: true });
  await Promise.race([
    heading.waitFor({ state: "visible" }),
    page.locator("[data-studio-editor]").waitFor({ state: "visible" }),
  ]);
  if (await heading.isVisible())
    await heading.locator("..").getByRole("button").first().click();
}

async function dismissStartup(page) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const action = page
      .getByRole("button", { name: /^(Continue|继续|Close|关闭)$/ })
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
