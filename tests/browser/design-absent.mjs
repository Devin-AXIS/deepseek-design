/** A real generation after uninstall must use the original Agent without Design contributions. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { chromium } from "playwright-core";
import { dismissStartup } from "./native-editor.mjs";
export async function verifyDesignAbsent({ address, cookie, home }) {
  const executablePath =
    process.env.STUDIO_BROWSER_EXECUTABLE ||
    [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
    ].find(existsSync);
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
  });
  try {
    const before = JSON.parse(
      await readFile(resolve(home, "storages/workspace.json"), "utf8"),
    );
    const previous = new Set(
      Object.values(before.tables.workspaces).flatMap(
        (item) => item.sessionIds,
      ),
    );
    await page.goto(address);
    await dismissStartup(page);
    assert.equal(
      await page.getByRole("button", { name: "Design", exact: true }).count(),
      0,
    );
    await page
      .getByRole("button", { name: /^(New session|新会话)$/ })
      .last()
      .click();
    await dismissStartup(page);
    const chooser = page.getByRole("button", {
      name: /^(Choose workspace|选择工作区)$/,
    });
    if (await chooser.isVisible()) {
      await chooser.click();
      await page
        .getByRole("menuitem", { name: /^(Default workspace|默认工作区)/ })
        .click();
    }
    const origin = new URL(address).origin;
    let sessionId;
    for (let i = 0; i < 60; i++) {
      const current = JSON.parse(
        await readFile(resolve(home, "storages/workspace.json"), "utf8"),
      );
      sessionId = Object.values(current.tables.workspaces)
        .flatMap((item) => item.sessionIds)
        .find((id) => !previous.has(id));
      if (sessionId) {
        const selected = await fetch(origin + "/studio-ai-fixture/select", {
          method: "POST",
          headers: { cookie, "content-type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (selected.ok) break;
      }
      await new Promise((done) => setTimeout(done, 100));
    }
    assert.ok(sessionId, "The native session must be created after removal");
    await page
      .locator('[contenteditable="true"][role="textbox"]')
      .fill("A plain request after Design was removed.");
    await page
      .getByRole("button", { name: /^(Send message|发送消息)$/ })
      .click();
    await page
      .getByText("VIDEO_AI_FIXTURE_ACCEPTED", { exact: false })
      .waitFor();
    const captured = await fetch(origin + "/studio-ai-fixture", {
      headers: { cookie },
    }).then((response) => response.json());
    assert.ok(captured.requests.length > 0);
    assert.ok(
      !JSON.stringify(captured.requests).includes(
        "For webpages prefer design_open",
      ),
    );
    assert.ok(
      captured.toolSets.every((names) => !names.includes("design_open")),
    );
    console.log(
      "Uninstalled Design: native Agent generation completed without Design rules or tools",
    );
  } finally {
    await browser.close();
  }
}
