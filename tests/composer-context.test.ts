import test from "node:test";
import assert from "node:assert/strict";
import { Context, Service } from "@deepseek-ai/cordis";
import {
  applyStudioPrompt,
  sendStudioPrompt,
} from "../packages/studio-core/src/surface.tsx";
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

async function scopedConversationFixture(
  send: (scope: Context, text: string) => Promise<void>,
) {
  const root = new Context();
  class Conversation extends Service {
    constructor(ctx: Context) {
      super(ctx, "conversation");
    }
    send(text: string) {
      return send(this.ctx, text);
    }
  }
  await root.plugin(Conversation);
  const owner = await root.plugin(function sessionControllerScope() {});
  return {
    root,
    scope: owner.ctx.extend({ studioSessionId: "video-session" }),
  };
}

test("Video AI sends from a retained session scope and waits for native admission", async () => {
  let accept!: () => void;
  const admission = new Promise<void>((resolve) => {
    accept = resolve;
  });
  const received: Array<{ session: unknown; text: string }> = [];
  const { root, scope } = await scopedConversationFixture(async (ctx, text) => {
    received.push({ session: Reflect.get(ctx, "studioSessionId"), text });
    await admission;
  });
  try {
    assert.throws(() => scope.conversation, /without inject/);
    let settled = false;
    const pending = sendStudioPrompt(scope, "Generate the current video").then(
      () => {
        settled = true;
      },
    );
    await Promise.resolve();
    assert.deepEqual(received, [
      { session: "video-session", text: "Generate the current video" },
    ]);
    assert.equal(settled, false);
    accept();
    await pending;
    assert.equal(settled, true);
  } finally {
    accept();
    await root.fiber.dispose();
  }
});

test("Video AI forwards native submission failures to its caller", async () => {
  const failure = new Error("Native admission failed");
  const { root, scope } = await scopedConversationFixture(async () => {
    throw failure;
  });
  try {
    await assert.rejects(
      sendStudioPrompt(scope, "Generate narration"),
      (error) => error === failure,
    );
  } finally {
    await root.fiber.dispose();
  }
});

test("Video AI reports an unavailable conversation service", async () => {
  const root = new Context();
  const owner = await root.plugin(function sessionControllerScope() {});
  try {
    await assert.rejects(
      sendStudioPrompt(owner.ctx, "Generate the current video"),
      /conversation service is unavailable/,
    );
  } finally {
    await root.fiber.dispose();
  }
});
