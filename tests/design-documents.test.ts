import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  realpath,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:http";
import {
  DesignDocuments,
  registerDesignDocuments,
} from "../packages/studio-core/src/design-documents.ts";
import { Context } from "@deepseek-ai/cordis";
import {
  projectToolSchema,
  type ToolDefinition,
  type ToolRunContext,
} from "@deepseek-ai/dsh-tools";
import { DesignHistory } from "../packages/studio-core/src/design-history.ts";

async function fixture() {
  const root = await realpath(await mkdtemp(join(tmpdir(), "design-binding-")));
  const documents = new DesignDocuments();
  await mkdir(join(root, "site"));
  const html =
    '<!doctype html><html><head><link rel="stylesheet" href="design-tokens.css"></head><body><h1>Original</h1></body></html>';
  await writeFile(join(root, "site/home.html"), html);
  await writeFile(join(root, "site/design-tokens.css"), ":root{--accent:blue}");
  return {
    root,
    documents,
    html,
    async dispose() {
      await documents.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}

test("opening existing HTML keeps every original byte and persists only a binding", async () => {
  const f = await fixture();
  try {
    const bound = await f.documents.bind(f.root, "session", "site/home.html");
    assert.equal(bound.entry, "site/home.html");
    assert.equal(bound.tokens, "site/design-tokens.css");
    assert.equal(await readFile(join(f.root, bound.entry), "utf8"), f.html);
    assert.equal(
      await readFile(join(f.root, bound.tokens!), "utf8"),
      ":root{--accent:blue}",
    );
    const snapshot = await f.documents.snapshot(f.root, "session");
    assert.equal(snapshot?.state.entry, "site/home.html");
    assert.equal(snapshot?.manifest.designSystem.tokens, "design-tokens.css");
    await assert.rejects(readFile(join(f.root, "site/manifest.json")), {
      code: "ENOENT",
    });
    assert.equal(
      await f.documents.authorize(f.root, "session", "site/home.html", true),
      "site/home.html",
    );
    await assert.rejects(
      f.documents.authorize(f.root, "session", "unrelated.txt", true),
      { code: "DESIGN_PATH" },
    );
    await rm(join(f.root, "site/design-tokens.css"));
    await f.documents.refresh(f.root, "session");
    assert.equal(
      await f.documents.authorize(
        f.root,
        "session",
        "site/design-tokens.css",
        true,
      ),
      "site/design-tokens.css",
    );
    const restored = new DesignDocuments();
    try {
      assert.equal(
        (await restored.refresh(f.root, "session"))?.entry,
        bound.entry,
      );
    } finally {
      await restored.dispose();
    }
  } finally {
    await f.dispose();
  }
});

test("current context names the file and revision without copying HTML or token values", async () => {
  const f = await fixture();
  try {
    await f.documents.bind(f.root, "session", "site/home.html");
    const before = f.documents.context(f.root, "session");
    assert.ok(before.includes("site/home.html"));
    assert.ok(before.includes("site/design-tokens.css"));
    assert.ok(!before.includes("Original"));
    assert.ok(!before.includes("blue"));
    assert.ok(before.length < 250);
    await writeFile(
      join(f.root, "site/home.html"),
      "<h1>A completely different design is allowed</h1>",
    );
    await f.documents.refresh(f.root, "session");
    assert.notEqual(f.documents.context(f.root, "session"), before);
  } finally {
    await f.dispose();
  }
});

test("a bound external HTML file retains ordinary version recovery", async () => {
  const f = await fixture();
  const history = new DesignHistory(
    1024 * 1024,
    async (root, id) => (await f.documents.read(root, id))?.entry,
  );
  try {
    await f.documents.bind(f.root, "session", "site/home.html");
    await history.prepare(
      f.root,
      "session",
      { turn: 1, step: 1, messageIds: ["first"] },
      new AbortController().signal,
    );
    const version = (await history.read(f.root, "session")).versions[0]!;
    await writeFile(join(f.root, "site/home.html"), "<h1>New design</h1>");
    await history.select(f.root, "session", version.path);
    await history.prepare(
      f.root,
      "session",
      { turn: 2, step: 1, messageIds: ["second"] },
      new AbortController().signal,
    );
    assert.equal(
      await readFile(join(f.root, "site/home.html"), "utf8"),
      f.html,
    );
    assert.equal((await history.read(f.root, "session")).versions.length, 2);
  } finally {
    await history.dispose();
    await f.dispose();
  }
});

test("bindings refuse workspace escapes, symlinks and invalid records", async () => {
  const f = await fixture();
  const outside = await mkdtemp(join(tmpdir(), "outside-design-"));
  try {
    await writeFile(join(outside, "secret.html"), "outside");
    await symlink(join(outside, "secret.html"), join(f.root, "escape.html"));
    await assert.rejects(
      f.documents.bind(f.root, "session", "../outside.html"),
      { code: "DESIGN_PATH" },
    );
    await assert.rejects(
      f.documents.bind(f.root, "session", "escape.html"),
      /outside the workspace/,
    );
    await assert.rejects(
      f.documents.bind(f.root, "session", "site/design-tokens.css"),
      { code: "DESIGN_FILE" },
    );
    await mkdir(join(f.root, ".dsh-studio/design/bindings"), {
      recursive: true,
    });
    await writeFile(
      join(f.root, ".dsh-studio/design/bindings/broken.json"),
      '{"schemaVersion":99,"entry":"site/home.html"}',
    );
    await assert.rejects(f.documents.read(f.root, "broken"));
  } finally {
    await f.dispose();
    await rm(outside, { recursive: true, force: true });
  }
});

test("unload drains an admitted binding and ends its browser notifications", async () => {
  const f = await fixture();
  const server = createServer((_request, response) =>
    f.documents.stream(response),
  );
  await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const response = await fetch(`http://127.0.0.1:${address.port}`);
  const reader = response.body!.getReader();
  try {
    assert.match(
      new TextDecoder().decode((await reader.read()).value),
      /ready/,
    );
    await f.documents.bind(f.root, "session", "site/home.html", true);
    assert.match(
      new TextDecoder().decode((await reader.read()).value),
      /site\/home.html/,
    );
    const write = f.documents.bind(f.root, "session", "site/home.html");
    const closing = f.documents.dispose();
    await write;
    await closing;
    assert.equal((await reader.read()).done, true);
    await assert.rejects(f.documents.refresh(f.root, "session"), {
      code: "DESIGN_CLOSED",
    });
    assert.equal(f.documents.context(f.root, "session"), "");
    assert.equal(
      await readFile(join(f.root, "site/home.html"), "utf8"),
      f.html,
    );
  } finally {
    await reader.cancel();
    await new Promise<void>((done) => server.close(() => done()));
    await f.dispose();
  }
});

test("Design adds one bounded tool and reversible prompt contributions", async () => {
  const documents = new DesignDocuments();
  let tool: ToolDefinition | undefined;
  const contributions = new Set<string>();
  const cleanup: Array<() => void> = [];
  const context = new Context().extend({
    effect(effect: () => () => void) {
      const dispose = effect();
      cleanup.push(dispose);
      return dispose;
    },
    systemPrompt: {
      section(value: { name: string; text: string }) {
        assert.ok(value.text.length < 280);
        contributions.add(value.name);
        return () => {
          contributions.delete(value.name);
        };
      },
      context(value: { name: string }) {
        contributions.add(value.name);
        return () => {
          contributions.delete(value.name);
        };
      },
    },
    workspaceRegistry: { list: () => [] },
    tools: {
      register(value: ToolDefinition) {
        tool = value;
        return () => {
          tool = undefined;
        };
      },
    },
  });
  registerDesignDocuments(context, documents, async () => {
    throw Error("No project expected");
  });
  assert.ok(tool);
  const schema = projectToolSchema(tool, true);
  assert.deepEqual(
    schema,
    JSON.parse(
      await readFile(
        new URL("./design-open.expected.json", import.meta.url),
        "utf8",
      ),
    ),
  );
  assert.ok(JSON.stringify(schema).length < 900);
  await assert.rejects(
    tool.execute({ path: "" }, {
      signal: new AbortController().signal,
    } as ToolRunContext),
    { code: "DESIGN_ARGUMENTS" },
  );
  await assert.rejects(
    tool.execute({}, {
      signal: new AbortController().signal,
    } as ToolRunContext),
    { code: "DESIGN_CONTEXT" },
  );
  for (const dispose of cleanup.reverse()) dispose();
  assert.equal(contributions.size, 0);
  assert.equal(tool, undefined);
  await documents.dispose();
});

test("read-only bindings leave no metadata and files keep separate histories", async () => {
  const f = await fixture();
  const history = new DesignHistory(
    1024 * 1024,
    async (root, id) => (await f.documents.read(root, id))?.entry,
  );
  try {
    await f.documents.bind(f.root, "session", "site/home.html", false, false);
    await assert.rejects(
      readFile(join(f.root, ".dsh-studio/design/bindings/session.json")),
      { code: "ENOENT" },
    );
    await history.prepare(
      f.root,
      "session",
      { turn: 1, step: 1, messageIds: ["first"] },
      new AbortController().signal,
    );
    const original = (await history.read(f.root, "session")).versions[0]!;
    await history.select(f.root, "session", original.path);
    await writeFile(join(f.root, "site/second.html"), "<h1>Separate page</h1>");
    await f.documents.bind(f.root, "session", "site/second.html");
    assert.equal((await history.read(f.root, "session")).versions.length, 0);
    assert.equal(
      (await history.read(f.root, "session")).selectedPath,
      "current",
    );
    await assert.rejects(history.select(f.root, "session", original.path));
    await history.prepare(
      f.root,
      "session",
      { turn: 2, step: 1, messageIds: ["second"] },
      new AbortController().signal,
    );
    await f.documents.bind(f.root, "session", "site/home.html");
    assert.equal(
      (await history.read(f.root, "session")).versions[0]?.path,
      original.path,
    );
    assert.equal(
      await readFile(join(f.root, "site/home.html"), "utf8"),
      f.html,
    );
  } finally {
    await history.dispose();
    await f.dispose();
  }
});
