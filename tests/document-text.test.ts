import test from "node:test";
import assert from "node:assert/strict";
import {
  documentTextBlocks,
  isTextDocument,
  updateDocumentText,
} from "../packages/studio-core/src/document-text.ts";
test("document prose editing preserves markup, styles and script bytes", () => {
  const html =
    '<!doctype html><article style="color:red"><h1>标题</h1><p class="body">Hello <strong>world</strong> &amp; team</p><script>secret()</script></article>';
  assert.equal(isTextDocument(html), true);
  const blocks = documentTextBlocks(html);
  assert.equal(blocks.length, 2);
  const updated = updateDocumentText(
    html,
    blocks[1]!.id,
    "Hello bright world & team",
  );
  assert.equal(
    updated,
    '<!doctype html><article style="color:red"><h1>标题</h1><p class="body">Hello bright <strong>world</strong> &amp; team</p><script>secret()</script></article>',
  );
  assert.equal(
    documentTextBlocks(
      updateDocumentText(
        updated,
        documentTextBlocks(updated)[1]!.id,
        "<changed>",
      ),
    )[1]!.text,
    "<changed>",
  );
});
test("explicit document marker and article semantics distinguish prose from ordinary websites", () => {
  assert.equal(
    isTextDocument(
      '<meta name="ipw-document-type" content="document"><p>Text</p>',
    ),
    true,
  );
  assert.equal(
    isTextDocument(
      "<nav>Menu</nav><main><h1>Product</h1><button>Buy</button></main>",
    ),
    false,
  );
  assert.deepEqual(
    documentTextBlocks("<nav><p>Menu</p></nav><p>Body</p>").map((b) => b.text),
    ["Body"],
  );
});

test("cleared blocks remain editable and never lose their position", () => {
  const source = "<article><h1>Title</h1><p>Body</p></article>";
  const empty = updateDocumentText(
    source,
    documentTextBlocks(source)[0]!.id,
    "",
  );
  assert.equal(documentTextBlocks(empty).length, 2);
  assert.equal(
    updateDocumentText(empty, documentTextBlocks(empty)[0]!.id, "New"),
    "<article><h1>New</h1><p>Body</p></article>",
  );
});

test("the writing view includes main headings and paragraphs and leaves auxiliary copy intact", () => {
  const html =
    '<header><p class="eyebrow">REPORT 2026</p><h1>Main title</h1></header><article><p>Core <span data-ipw-text="decoration">★</span>content</p><p class="badge">NEW</p><p data-ipw-text="decoration">READ TIME</p><p class="caption" data-ipw-text="content">Important caption</p></article><footer><p>Company footer</p></footer>';
  const prose = documentTextBlocks(html);
  assert.deepEqual(
    prose.map((block) => block.text),
    ["Main title", "Core content", "Important caption"],
  );
  const updated = updateDocumentText(html, prose[1]!.id, "Updated content");
  assert.ok(updated.includes('<span data-ipw-text="decoration">★</span>'));
  assert.ok(updated.includes('<p class="eyebrow">REPORT 2026</p>'));
  assert.ok(updated.includes("<footer><p>Company footer</p></footer>"));
});
