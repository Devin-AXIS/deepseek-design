import test from "node:test";
import assert from "node:assert/strict";
import { applyStudioPrompt } from "../packages/studio-core/src/surface.tsx";
import {
  designStudioAskAiPrompt,
  designStudioAskAiRequest,
} from "../packages/studio-core/src/original/design-studio/src/bridge.ts";

const context = {
  id: "selection-1",
  sessionId: "session-1",
  workspaceId: "workspace-1",
  filePath: "design/session-1/entry.html",
  baseUpdatedAt: 1,
  beforeHtml: "<html>whole document must not enter the prompt</html>",
  target: {
    tag: "H1",
    label: "H1 · 让每一天，都从容呼吸。",
    locator: "main > h1",
    text: "让每一天，都从容呼吸。",
    src: "",
    alt: "",
    styles: {},
  },
};

test("selected Design context becomes a native label without replacing user text", () => {
  let draft = "请把标题缩短";
  const quotes: Array<{ text: string; summary: object | undefined }> = [];
  const prompt = designStudioAskAiPrompt(designStudioAskAiRequest(context));
  const summary = {
    label: context.target.label,
    title: context.filePath,
    detail: context.target.locator,
    body: "",
  };
  assert.equal(
    applyStudioPrompt(
      {
        setDraft: (value) => {
          draft = value;
        },
        insertQuote: (text, display) => {
          quotes.push({ text, summary: display });
          return true;
        },
        focus: () => {},
      },
      { text: prompt, summary },
    ),
    true,
  );
  assert.equal(draft, "请把标题缩短");
  assert.deepEqual(quotes, [{ text: prompt, summary }]);
  assert.ok(prompt.includes(context.filePath));
  assert.ok(prompt.includes(context.target.locator));
  assert.ok(prompt.includes("Read the current file"));
  assert.ok(!prompt.includes(context.beforeHtml));
  assert.ok(!prompt.includes("iPolloWork"));
});

test("a locked composer refuses a label without clearing its draft", () => {
  let replaced = false;
  assert.equal(
    applyStudioPrompt(
      {
        setDraft: () => {
          replaced = true;
        },
        insertQuote: () => false,
        focus: () => {},
      },
      {
        text: "context",
        summary: { label: "H1", title: "entry.html", body: "" },
      },
    ),
    false,
  );
  assert.equal(replaced, false);
});

test("plain Video prompts retain their existing draft behavior", () => {
  let draft = "",
    focused = false;
  assert.equal(
    applyStudioPrompt(
      {
        setDraft: (value) => {
          draft = value;
        },
        insertQuote: () => {
          throw Error("Unexpected structured context");
        },
        focus: () => {
          focused = true;
        },
      },
      "Video instruction",
    ),
    true,
  );
  assert.equal(draft, "Video instruction");
  assert.equal(focused, true);
});
