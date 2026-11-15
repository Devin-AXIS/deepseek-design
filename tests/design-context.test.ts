import test from "node:test";
import assert from "node:assert/strict";
import {
  designContextText,
  findDesignContext,
} from "../packages/studio-core/src/design-context.ts";

test("Design labels preserve complete model context and surrounding instructions", () => {
  const record = designContextText(
    "H1 · Title",
    "file: design/index.html\nlocator: #title",
  );
  const message = `Make this blue\n\n${record}\nMore instructions`;
  const match = findDesignContext(message, 0)!;
  assert.equal(match.label, "H1 · Title");
  assert.equal(match.context, "file: design/index.html\nlocator: #title");
  assert.equal(message.slice(match.start, match.end), record);
  assert.equal(findDesignContext(message, match.end), undefined);
});
test("incomplete records remain plain text and delimiters in content cannot truncate labels", () => {
  assert.equal(
    findDesignContext("[Design context: H1]\nincomplete", 0),
    undefined,
  );
  const record = designContextText("A]\nB", "before [/Design context] after");
  const match = findDesignContext(record, 0)!;
  assert.equal(match.label, "A  B");
  assert.equal(match.context, "before [/Design context ] after");
});
