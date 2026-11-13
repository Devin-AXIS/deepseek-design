import test from "node:test";
import assert from "node:assert/strict";
import { componentHtml } from "../packages/studio-core/src/component.ts";
import { defaultTheme } from "../packages/studio-core/src/resource-model.ts";
test("Stage templates become isolated executable documents with project style and parameters", () => {
  const html = componentHtml(
    "<html><body><template><h1>Content</h1><script>window.loaded=true</script></template></body></html>",
    {
      id: "r_chart",
      title: "Chart",
      kind: "component",
      file: "resources/r_chart.html",
      mime: "text/html",
      sourceId: "chart",
      version: "1",
      sha256: "a".repeat(64),
      variables: { heading: "</script>unsafe" },
    },
    { ...defaultTheme, style: "sketch" },
    "/* bundled runtime */",
  );
  assert.ok(html.includes("<h1>Content</h1>"));
  assert.ok(!html.includes("<template>"));
  assert.ok(html.includes('"skin":"sketch"'));
  assert.ok(html.includes("\\u003c/script>unsafe"));
  assert.ok(html.includes('data-composition-id="r_chart"'));
});
