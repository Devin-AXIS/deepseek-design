/** A real generation after uninstall must use the original Agent without Design contributions. */
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { chromium } from "playwright-core";
import { dismissStartup } from "./native-editor.mjs";
export async function verifyDesignAbsent({ address, cookie }) {
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
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto(address);
    await dismissStartup(page);
    assert.equal(
      await page.getByRole("button", { name: "Design", exact: true }).count(),
      0,
    );
    await page
      .getByRole("button", { name: /^(New session|新会话|新建会话)$/ })
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
    if (
      !(await page
        .getByRole("button", { name: /Studio AI fixture/ })
        .isVisible())
    ) {
      await page
        .getByRole("button", {
          name: /^(Choose model|Select model|Please select a model|请选择模型)$/,
        })
        .click();
      await page
        .getByRole("menuitemradio", { name: "Studio AI fixture" })
        .click();
    }
    await page
      .locator('[contenteditable="true"][role="textbox"]')
      .fill("A plain request after Design was removed.");
    await page
      .getByRole("button", { name: /^(Send message|发送消息)$/ })
      .click();
    await page
      .getByRole("paragraph")
      .filter({ hasText: /^VIDEO_AI_FIXTURE_ACCEPTED$/ })
      .waitFor();
    const origin = new URL(address).origin;
    const captured = await fetch(origin + "/studio-ai-fixture", {
      headers: { cookie },
    }).then((response) => response.json());
    assert.ok(captured.requests.length > 0);
    assert.ok(
      JSON.stringify(captured.requests).includes(
        "A plain request after Design was removed.",
      ),
    );
    assert.ok(
      !JSON.stringify(captured.requests).includes(
        "For webpages and slides prefer design_open",
      ),
    );
    assert.ok(
      captured.toolSets.every((names) => !names.includes("design_open")),
    );
    console.log(
      "Uninstalled Design: native Agent generation completed without Design rules or tools",
    );
  } catch (error) {
    await writeFile(
      resolve(".runtime/design-absent-failure.txt"),
      (await page.locator("body").ariaSnapshot()) +
        "\n" +
        JSON.stringify(errors),
    );
    await page.screenshot({
      path: resolve(".runtime/design-absent-failure.png"),
    });
    throw error;
  } finally {
    await browser.close();
  }
}
