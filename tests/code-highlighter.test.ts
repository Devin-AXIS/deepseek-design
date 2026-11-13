import test from "node:test";
import assert from "node:assert/strict";
import { highlightCode } from "../packages/studio-core/src/original/app/src/react-app/domains/session/surface/code-highlighter.ts";

test("deferred code highlighting retains common, uncommon and unknown languages", async () => {
  for (const [language, code] of [
    ["typescript", "const value: number = 1;"],
    ["abap", "WRITE 'hello'."],
    ["unknown-language", "<literal>"],
  ]) {
    const html = await highlightCode(code!, language!, []);
    assert.match(html, /class="shiki github-light"/);
    assert.ok(html.includes("<span"));
    if (language === "unknown-language")
      assert.match(html, /(?:&#x3C;|&lt;)literal(?:>|&gt;)/);
  }
});
test("deferred highlighting preserves diff annotations", async () => {
  const html = await highlightCode(
    "const previous = 1; // [!code --]\nconst current = 2; // [!code ++]",
    "typescript",
    [],
  );
  assert.match(html, /diff remove/);
  assert.match(html, /diff add/);
});
