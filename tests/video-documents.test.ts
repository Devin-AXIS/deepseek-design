import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Context } from "@deepseek-ai/cordis";
import {
  projectToolSchema,
  type ToolDefinition,
  type ToolRunContext,
} from "@deepseek-ai/dsh-tools";
import {
  registerVideoDocuments,
  VideoDocuments,
} from "../packages/deepseek-video/src/documents.ts";
import { videoFile } from "../packages/studio-core/src/video-connection.ts";

test("video_open uses the conversation project, preserves its content and unloads its model contributions", async () => {
  const root = await mkdtemp(join(tmpdir(), "video-documents-"));
  const cleanups: Array<() => void> = [];
  const sections = new Set<string>();
  let tool: ToolDefinition | undefined;
  let opens = 0;
  const documents = new VideoDocuments();
  const ctx = new Context().extend({
    effect(effect: () => () => void) {
      const off = effect();
      cleanups.push(off);
      return off;
    },
    systemPrompt: {
      section(value: { name: string; text: string }) {
        assert.ok(value.text.length < 400);
        sections.add(value.name);
        return () => sections.delete(value.name);
      },
      context(value: { name: string }) {
        sections.add(value.name);
        return () => sections.delete(value.name);
      },
    },
    tools: {
      register(value: ToolDefinition) {
        tool = value;
        return () => {
          tool = undefined;
        };
      },
    },
    workspaceRegistry: {
      list: () => [{ path: root, sessionIds: ["session"] }],
    },
    sandboxPolicy: { resolve: () => ({ mode: "workspace-write" }) },
  });
  const input = {
    agent: { session: { id: "session", header: { cwd: root } } },
    signal: new AbortController().signal,
  } as ToolRunContext;
  try {
    registerVideoDocuments(ctx, documents, async (workspace, id) => {
      assert.equal(workspace, root);
      assert.equal(id, "session");
      if (++opens === 1) {
        await mkdir(join(root, "video/session"), { recursive: true });
        await writeFile(
          join(root, "video/session/index.html"),
          "existing content",
        );
      }
    });
    assert.ok(tool);
    assert.deepEqual(
      projectToolSchema(tool, true),
      JSON.parse(
        await readFile(
          new URL("./video-open.expected.json", import.meta.url),
          "utf8",
        ),
      ),
    );
    assert.deepEqual(await tool.execute({}, input), {
      project: "video/session",
      entry: "video/session/index.html",
      storyboard: "video/session/STORYBOARD.md",
    });
    await tool.execute({}, input);
    assert.equal(
      await readFile(join(root, "video/session/index.html"), "utf8"),
      "existing content",
    );
    await assert.rejects(tool.execute({ workspaceId: "other" }, input), {
      code: "INVALID_ARGS",
    });
    await assert.rejects(
      tool.execute({}, { signal: input.signal } as ToolRunContext),
      { code: "STUDIO_CONTEXT" },
    );
    const aborted = new AbortController();
    aborted.abort();
    await assert.rejects(
      tool.execute({}, { ...input, signal: aborted.signal }),
      { name: "AbortError" },
    );
  } finally {
    for (const off of cleanups.reverse()) off();
    await documents.dispose();
    await rm(root, { recursive: true, force: true });
  }
  assert.equal(tool, undefined);
  assert.equal(sections.size, 0);
  assert.throws(() => documents.notify("session"), { code: "STUDIO_CLOSED" });
});

test("native video file opening leaves websites and exported movies with their existing viewers", () => {
  assert.equal(
    videoFile("dsh-resource://file/session/a/video/a/index.html")?.path,
    "video/a/index.html",
  );
  for (const address of [
    "dsh-resource://file/session/a/site/index.html",
    "dsh-resource://file/session/a/video/a/movie.mp4",
    "https://example.com/video/a/index.html",
  ])
    assert.equal(videoFile(address), undefined);
});

test("existing video binding survives reload without changing its files and rejects escaping paths", async () => {
  const root = await mkdtemp(join(tmpdir(), "video-binding-"));
  const documents = new VideoDocuments();
  try {
    await mkdir(join(root, "videos/promo"), { recursive: true });
    await writeFile(
      join(root, "videos/promo/index.html"),
      "original creative output",
    );
    await documents.bind(root, "conversation", "videos/promo/index.html");
    assert.equal(
      new VideoDocuments().project(root, "conversation"),
      "videos/promo",
    );
    assert.equal(
      await readFile(join(root, "videos/promo/index.html"), "utf8"),
      "original creative output",
    );
    await assert.rejects(documents.bind(root, "conversation", "../outside"));
    assert.equal(documents.project(root, "conversation"), "videos/promo");
  } finally {
    await documents.dispose();
    await rm(root, { recursive: true, force: true });
  }
});
