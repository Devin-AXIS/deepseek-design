import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, writeFile, rm, realpath } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Context } from "@deepseek-ai/cordis";
import type { ToolDefinition, ToolRunContext } from "@deepseek-ai/dsh-tools";
import {
  designTextSlots,
  designTextRevision,
  replaceDesignText,
  registerDesignTextEditing,
} from "../packages/studio-core/src/design-edit-text.ts";
import { DesignDocuments } from "../packages/studio-core/src/design-documents.ts";

test("required context carries bounded template source metadata only for its own entry", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "design-source-context-")));
  const docs = new DesignDocuments();
  try {
    const manifest = JSON.parse(await readFile(new URL("../packages/studio-core/templates/design/ipollowork.pptx-ipollo-vi-enterprise/manifest.json", import.meta.url), "utf8"));
    manifest.entry = "deck.html";
    await writeFile(join(root, "manifest.json"), JSON.stringify(manifest));
    await writeFile(join(root, "deck.html"), '<main data-ipw-template-kind="slides">Deck</main>');
    await writeFile(join(root, "other.html"), '<h1>Other</h1>');
    await docs.bind(root, "session", "deck.html");
    const context = docs.context(root, "session");
    assert.match(context, /templateSourceData/);
    assert.match(context, /preserving the selected node 139 slide order and exact geometry/);
    assert.ok(context.length < 5500);
    await docs.bind(root, "session", "other.html");
    assert.ok(!docs.context(root, "session").includes("templateSourceData"));
  } finally {
    await docs.dispose();
    await rm(root, { recursive: true, force: true });
  }
});

test("native 38-page PPT content changes preserve every byte outside the selected text nodes", async () => {
  const html = await readFile(
    new URL(
      "../packages/studio-core/templates/design/ipollowork.pptx-ipollo-vi-enterprise/entry.html",
      import.meta.url,
    ),
    "utf8",
  );
  const slots = designTextSlots(html);
  assert.ok(slots.length > 100);
  assert.equal(new Set(slots.map((s) => s.slide)).size, 38);
  const first = slots.find((s) => s.text === "Basic Page")!;
  assert.ok(first);
  const changed = replaceDesignText(html, designTextRevision(html), [
    { id: first.id, text: "产品介绍 & <草稿>" },
  ]);
  assert.equal(
    changed,
    html.slice(0, first.start) +
      "产品介绍 &amp; &lt;草稿&gt;" +
      html.slice(first.end),
  );
  assert.equal(changed.match(/data-ipw-slide=/g)?.length, 38);
  assert.equal(
    changed.match(/data-pptx-image/g)?.length,
    html.match(/data-pptx-image/g)?.length,
  );
  assert.throws(
    () =>
      replaceDesignText(changed, designTextRevision(html), [
        { id: first.id, text: "stale" },
      ]),
    { code: "DESIGN_STALE_TEXT" },
  );
});

test("text edits cannot execute markup or change rich formatting, scripts, controls or hidden content", () => {
  const html =
    '<style>body{color:red}</style><script>throw Error("never execute")</script><main><h1>A <em>B</em></h1><p hidden>private</p><button>Next</button><svg><text>vector</text></svg></main>';
  const slots = designTextSlots(html);
  assert.deepEqual(
    slots.map((s) => s.text),
    ["A ", "B"],
  );
  const changed = replaceDesignText(html, designTextRevision(html), [
    { id: slots[1]!.id, text: '<img src=x onerror="oops">' },
  ]);
  assert.ok(changed.includes('<em>&lt;img src=x onerror="oops"&gt;</em>'));
  assert.throws(
    () =>
      replaceDesignText(html, designTextRevision(html), [
        { id: slots[0]!.id, text: "x" },
        { id: slots[0]!.id, text: "y" },
      ]),
    { code: "DESIGN_TEXT_SLOT" },
  );
});

test("native tool enforces the host session, write policy, revision and paginated reads", async () => {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "design-text-tool-")),
  );
  const docs = new DesignDocuments();
  let tool!: ToolDefinition,
    readOnly = false;
  const cleanup: Array<() => void> = [];
  const ctx = new Context().extend({
    effect(fn: () => () => void) {
      const off = fn();
      cleanup.push(off);
      return off;
    },
    tools: {
      register(t: ToolDefinition) {
        tool = t;
        return () => {};
      },
    },
    workspaceRegistry: {
      list: () => [{ path: root, sessionIds: ["session"] }],
    },
    sandboxPolicy: {
      resolve: () => ({ mode: readOnly ? "read-only" : "workspace-write" }),
    },
  });
  const exec = {
    agent: { session: { id: "session", header: { cwd: root } } },
    signal: new AbortController().signal,
  } as ToolRunContext;
  try {
    await writeFile(
      join(root, "deck.html"),
      '<section data-ipw-slide="1"><h1>Title</h1><p>Body</p></section>',
    );
    await docs.bind(root, "session", "deck.html");
    registerDesignTextEditing(ctx, docs);
    const read = (await tool.execute({ limit: 1 }, exec)) as any;
    assert.equal(read.total, 2);
    assert.equal(read.nextOffset, 1);
    assert.equal(
      ((await tool.execute({ offset: 1, limit: 1 }, exec)) as any).slots[0]
        .text,
      "Body",
    );
    const change = {
      revision: read.revision,
      replacements: [{ id: read.slots[0].id, text: "New" }],
    };
    readOnly = true;
    await assert.rejects(tool.execute(change, exec), {
      code: "DESIGN_READ_ONLY",
    });
    readOnly = false;
    await tool.execute(change, exec);
    assert.match(
      await readFile(join(root, "deck.html"), "utf8"),
      /<h1>New<\/h1>/,
    );
    await assert.rejects(tool.execute(change, exec), {
      code: "DESIGN_STALE_TEXT",
    });
    await assert.rejects(
      tool.execute({}, {
        ...exec,
        agent: { session: { id: "foreign", header: { cwd: root } } },
      } as ToolRunContext),
      { code: "DESIGN_CONTEXT" },
    );
  } finally {
    for (const off of cleanup.reverse()) off();
    await docs.dispose();
    await rm(root, { recursive: true, force: true });
  }
});
