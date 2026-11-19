/** Installed-package regression for both Design conversation entry points. */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { chromium } from "playwright-core";
import { dismissStartup } from "./native-editor.mjs";

export async function verifyDesignConversation({ address, home, profile, cookie }) {
  const executablePath = process.env.STUDIO_BROWSER_EXECUTABLE || [
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find(existsSync);
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, locale: "en-US" });
  page.setDefaultTimeout(25000);
  const output = resolve(".runtime/browser-verification", profile, "design-conversation");
  await mkdir(output, { recursive: true });
  const results = [];
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const origin = new URL(address).origin;
  const bootstrap = await fetch(origin + "/ipollowork-design/bootstrap", { headers: { cookie } }).then(r => r.json());
  const api = async path => {
    const response = await fetch(origin + "/ipollowork-design/api" + path, {
      headers: { cookie, "x-ipollowork-design-token": bootstrap.token },
    });
    assert.equal(response.status, 200, await response.clone().text());
    return response.json();
  };
  const registry = async () => JSON.parse(await readFile(resolve(home, "storages/workspace.json"), "utf8")).tables.workspaces;
  const preview = page.locator("[data-studio-editor]:visible");
  try {
    await page.goto(address);
    await dismissStartup(page);
    await page.getByRole("button", { name: /^(New session|新会话)$/ }).last().click();
    const choose = page.getByRole("button", { name: /^(Choose workspace|选择工作区)$/ });
    if (await choose.isVisible()) {
      await choose.click();
      await page.getByRole("menuitem", { name: /^(Default workspace|默认工作区)/ }).click();
    }
    await dismissStartup(page);
    for (const kind of ["direct", "template"]) {
      const before = await registry();
      if (kind === "direct") {
        await page.getByRole("button", { name: "Design", exact: true }).click();
        const heading = page.getByRole("heading", { name: "Design", exact: true });
        await heading.locator("..").getByRole("button").first().click();
        // Click immediately: opening the composer must await the binding, even on a cold editor.
        await page.getByRole("button", { name: /^(Open in conversation|在对话中打开)$/ }).click();
      } else {
        await page.getByRole("button", { name: /^(Templates|模板)$/ }).click();
        const library = page.getByTestId("native-template-library");
        const title = "iPollo VI Enterprise Presentation · 38 Native Slides";
        await library.getByRole("textbox", { name: /^(Search…|搜索…)$/ }).fill(title);
        await library.getByTestId("template-library-item").filter({
          has: page.getByRole("heading", { name: title, exact: true }),
        }).getByRole("button", { name: /^(Use|Use template|使用|使用模板)$/ }).click();
        await library.waitFor({ state: "hidden" });
      }
      await preview.waitFor();
      const after = await registry();
      const oldIds = new Set(Object.values(before).flatMap(ws => ws.sessionIds));
      const owner = Object.entries(after).find(([, ws]) => kind === "direct"
        ? ws.sessionIds.length > 0 : ws.sessionIds.some(id => !oldIds.has(id)));
      assert.ok(owner, "the UI opened an owned workspace conversation");
      const [workspaceId, workspace] = owner;
      const sessionId = kind === "direct" ? workspace.sessionIds.at(-1) : workspace.sessionIds.find(id => !oldIds.has(id));
      const binding = await api("/document?" + new URLSearchParams({ sessionId }));
      assert.ok(binding?.entry, "the entry point bound HTML before the user can send a message");
      const path = binding.entry;
      const file = resolve(workspace.path, path);
      const html = await readFile(file, "utf8");
      const title = kind === "direct" ? "社区图书馆年度计划" : "社区图书馆可编辑幻灯片";
      const generated = kind === "direct"
        ? html.replace("<main></main>", `<main><h1>${title}</h1></main>`)
        : html.replace(">Basic Page</div>", `>${title}</div>`);
      assert.notEqual(generated, html, "the fixture replaces the selected document's content");
      const select = await fetch(origin + "/studio-ai-fixture/select", {
        method: "POST", headers: { cookie, "content-type": "application/json" },
        body: JSON.stringify({ sessionId, designPath: path, html: generated, tryOffice: true }),
      });
      assert.equal(select.status, 200, await select.text());
      await page.locator('[contenteditable="true"][role="textbox"]').fill(`做个 PPT，主题是${title}。`);
      await page.getByRole("button", { name: /^(Send message|发送消息)$/ }).click();
      await page.getByText("DESIGN_FIXTURE_COMPLETE", { exact: false }).waitFor();
      assert.equal(await readFile(file, "utf8"), generated);
      const captured = await fetch(origin + "/studio-ai-fixture", { headers: { cookie } }).then(r => r.json());
      const first = JSON.stringify(captured.requests[0]);
      assert.ok(first.includes("Active Design document:") && first.includes(path));
      assert.ok(first.includes("final deliverable must be editable HTML"));
      assert.ok(JSON.stringify(captured.requests).includes("Deliver the editable Design HTML:"), "native tool execution denied the attempted PowerPoint delivery");
      assert.equal(await page.locator("[data-presented-file]").filter({ hasText: "presentation.pptx" }).count(), 0);
      const card = page.locator("[data-presented-file]").filter({ has: page.getByRole("button", { name: new RegExp(basename(path).replaceAll(".", "\\.")) }) }).last();
      await card.waitFor();
      await page.getByRole("button", { name: /^(Collapse right sidebar|收起右侧边栏)$/ }).click();
      await preview.waitFor({ state: "hidden" });
      await card.getByRole("button", { name: new RegExp(basename(path).replaceAll(".", "\\.")) }).click();
      const text = () => page.frameLocator("[data-studio-editor] iframe:visible").getByText(title, { exact: true }).first();
      await text().waitFor();
      const edit = page.getByTestId("design-edit-toggle").filter({ visible: true });
      if (await edit.getAttribute("aria-pressed") !== "true") await edit.click();
      await text().dblclick();
      await text().fill(title + "｜第一期");
      await page.keyboard.press("Tab");
      const saving = page.waitForResponse(r => r.url().includes("/ipollowork-design/api/file") && r.request().method() === "POST");
      await page.getByRole("button", { name: /^(Save design|保存设计)$/ }).click();
      if (kind === "template")
        await page.getByRole("menuitem", { name: /^(Save design|保存设计)$/ }).click();
      const saved = await saving;
      assert.equal(saved.status(), 200);
      const persisted = await readFile(file, "utf8");
      assert.ok(persisted.includes(title + "｜第一期"));
      if (kind === "template") assert.equal(persisted.match(/data-ipw-slide=/g)?.length, 38);
      await page.screenshot({ path: resolve(output, kind + ".png") });
      for (const theme of ["light", "dark"]) {
        await page.evaluate(theme => document.body.toggleAttribute("data-ds-dark-theme", theme === "dark"), theme);
        await page.locator(`[data-studio-editor][data-theme="${theme}"]:visible`).waitFor();
        await page.setViewportSize({ width: 390, height: 844 });
        await page.screenshot({ path: resolve(output, `${kind}-${theme}-390.png`) });
        await page.setViewportSize({ width: 1280, height: 800 });
      }
      await page.evaluate(() => document.body.removeAttribute("data-ds-dark-theme"));
      results.push({ platform: process.platform, kind, htmlDelivered: true, officeDeliveryDenied: true, clickOpenedDesign: true, editSaved: true, workspaceId, path });
      console.log(`Installed Design ${kind} conversation: HTML delivered, PPTX denied, click and edit saved`);
    }
    assert.deepEqual(errors, []);
    await writeFile(resolve(output, "results.json"), JSON.stringify(results, null, 2) + "\n");
  } catch (error) {
    await page.screenshot({ path: resolve(output, "failure.png") });
    throw error;
  } finally { await browser.close(); }
}
