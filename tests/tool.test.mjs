import { readFile } from "node:fs/promises";
import { projectToolSchema } from "@deepseek-ai/dsh-tools";
/** Built-plugin tool checks cover wire input and missing session context without model calls. */
import test from "node:test";
import assert from "node:assert/strict";
import { apply, Config } from "../packages/deepseek-video/lib/index.js";
function fixture() {
  const cleanup = [],
    tools = [];
  const ctx = {
    inject() {},
    get() {
      return { readRecord: async () => undefined };
    },
    effect(effect) {
      cleanup.push(effect());
    },
    systemPrompt: { section() { return () => {}; }, context() { return () => {}; } },
    webServer: {
      register() {
        return () => {};
      },
    },
    tools: {
      register(tool) {
        tools.push(tool);
        return () => {};
      },
    },
  };
  apply(
    ctx,
    Config({
      componentApi: "",
      assetApi: "",
      componentCredential: "",
      assetCredential: "",
      requestTimeoutMs: 20000,
      maxResourceBytes: 50000000,
    }),
  );
  return {
    tool: tools.find((tool) => tool.name === "ipollowork_video_validate"),
    actionTool: tools.find((tool) => tool.name === "ipollowork_video_action"),
    async dispose() {
      for (const dispose of cleanup.reverse()) await dispose?.();
    },
  };
}
test("the video checker refuses requests without a workspace session", async () => {
  const f = fixture();
  try {
    await assert.rejects(
      f.tool.execute({}, { signal: new AbortController().signal }),
      { code: "STUDIO_CONTEXT" },
    );
  } finally {
    await f.dispose();
  }
});
test("model-supplied workspace and session identities are rejected", async () => {
  const f = fixture();
  try {
    await assert.rejects(
      f.tool.execute(
        { workspaceId: "other-workspace", sessionId: "other-session" },
        { signal: new AbortController().signal },
      ),
      { code: "INVALID_ARGS" },
    );
  } finally {
    await f.dispose();
  }
});

test("the model-facing video tool matches its recorded definition", async () => {
  const f = fixture();
  try {
    const expected = JSON.parse(
      await readFile(
        new URL("./video-tool.expected.json", import.meta.url),
        "utf8",
      ),
    );
    assert.deepEqual(projectToolSchema(f.tool, true), expected);
  } finally {
    await f.dispose();
  }
});

test("native service discovery has a bounded recorded model definition", async () => {
  const f = fixture();
  try {
    const expected = JSON.parse(
      await readFile(
        new URL("./action-tool.expected.json", import.meta.url),
        "utf8",
      ),
    );
    assert.deepEqual(projectToolSchema(f.actionTool, true), expected);
  } finally {
    await f.dispose();
  }
});
