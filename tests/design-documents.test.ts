import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  readFile,
  realpath,
  rm,
  writeFile,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Context } from "@deepseek-ai/cordis";
import {
  projectToolSchema,
  type ToolDefinition,
  type ToolRunContext,
} from "@deepseek-ai/dsh-tools";
import {
  DesignDocuments,
  registerDesignDocuments,
} from "../packages/studio-core/src/design-documents.ts";
async function fixture(
  changed?: (root: string, id: string, entry: string) => Promise<void>,
) {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "design-documents-")),
  );
  await mkdir(join(root, "site"));
  const html =
    '<html><head><link rel="stylesheet" href="design-tokens.css" data-ipw-design-tokens></head><body><h1>Original</h1></body></html>';
  await writeFile(join(root, "site/home.html"), html);
  await writeFile(
    join(root, "site/design-tokens.css"),
    ":root{--ipw-color-primary:blue}",
  );
  const documents = new DesignDocuments(changed);
  return {
    root,
    documents,
    html,
    async close() {
      await documents.dispose();
      await rm(root, { recursive: true, force: true });
    },
  };
}
test("opening preserves every original byte, supplies small context and persists a stable document identity", async () => {
  const f = await fixture();
  try {
    const doc = await f.documents.bind(f.root, "session", "site/home.html");
    assert.equal(await readFile(join(f.root, doc.entry), "utf8"), f.html);
    assert.equal(doc.tokens, "site/design-tokens.css");
    assert.ok(f.documents.context(f.root, "session").length < 250);
    assert.ok(!f.documents.context(f.root, "session").includes("Original"));
    const restored = new DesignDocuments();
    try {
      assert.equal(
        (await restored.read(f.root, "session"))?.documentId,
        doc.documentId,
      );
    } finally {
      await restored.dispose();
    }
    await assert.rejects(readFile(join(f.root, "site/manifest.json")), {
      code: "ENOENT",
    });
  } finally {
    await f.close();
  }
});
test("new starts with neutral HTML; fork keeps source bytes and gets its own theme file", async () => {
  const f = await fixture();
  try {
    await f.documents.bind(f.root, "session", "site/home.html");
    const fork = await f.documents.create(
      f.root,
      "session",
      join(f.root, "site/home.html"),
    );
    assert.notEqual(fork.entry, "site/home.html");
    assert.notEqual(fork.tokenFile, "site/design-tokens.css");
    assert.equal(
      await readFile(join(f.root, fork.tokenFile), "utf8"),
      ":root{--ipw-color-primary:blue}",
    );
    assert.equal(
      await readFile(join(f.root, "site/home.html"), "utf8"),
      f.html,
    );
    const fresh = await f.documents.create(f.root, "session");
    const html = await readFile(join(f.root, fresh.entry), "utf8");
    assert.match(html, /--ipw-color-bg/);
    assert.ok(!html.includes("Original"));
    assert.ok(html.length < 700);
    assert.equal(
      (await f.documents.snapshot(f.root, "session"))?.state.entry,
      fresh.entry,
    );
  } finally {
    await f.close();
  }
});
test("late activations cannot select an older tab and read-only opens write no metadata", async () => {
  const f = await fixture();
  try {
    await writeFile(join(f.root, "site/other.html"), "<h1>Other</h1>");
    await f.documents.bind(f.root, "ro", "site/home.html", false, false);
    await assert.rejects(
      readFile(join(f.root, ".dsh-studio/design/bindings/ro.json")),
      { code: "ENOENT" },
    );
    await f.documents.bind(f.root, "session", "site/other.html", false, true, {
      client: "test",
      sequence: 2,
    });
    await assert.rejects(
      f.documents.bind(f.root, "session", "site/home.html", false, true, {
        client: "test",
        sequence: 1,
      }),
      { code: "DESIGN_STALE_ACTIVATION" },
    );
    assert.equal(
      (await f.documents.read(f.root, "session"))?.entry,
      "site/other.html",
    );
  } finally {
    await f.close();
  }
});
test("native filesystem updates refresh context; removal is contained without an Agent pre-step hook", async () => {
  let observed!: () => void;
  const updated = new Promise<void>((resolve) => {
    observed = resolve;
  });
  let count = 0;
  const f = await fixture(async () => {
    if (++count > 1) observed();
  });
  try {
    await f.documents.bind(f.root, "session", "site/home.html");
    const before = f.documents.context(f.root, "session");
    await writeFile(join(f.root, "site/home.html"), "<h1>Changed on disk</h1>");
    await Promise.race([
      updated,
      new Promise((_, reject) =>
        setTimeout(() => reject(Error("File watcher did not publish")), 3000),
      ),
    ]);
    assert.notEqual(f.documents.context(f.root, "session"), before);
    await rm(join(f.root, "site/home.html"));
    await f.documents.refresh(f.root, "session");
    assert.match(f.documents.context(f.root, "session"), /missing/);
  } finally {
    await f.close();
  }
});
test("workspace escapes and malformed records cannot be opened", async () => {
  const f = await fixture();
  const outside = await mkdtemp(join(tmpdir(), "outside-"));
  try {
    await writeFile(join(outside, "secret.html"), "secret");
    await symlink(join(outside, "secret.html"), join(f.root, "escape.html"));
    await assert.rejects(f.documents.bind(f.root, "session", "escape.html"));
    await assert.rejects(f.documents.bind(f.root, "session", "../secret.html"));
  } finally {
    await f.close();
    await rm(outside, { recursive: true, force: true });
  }
});
test("the small model surface is reversible and does not register pre-step work", async () => {
  const documents = new DesignDocuments();
  let tool: ToolDefinition | undefined;
  const sections = new Set<string>(),
    events = new Map<string, Function>(),
    cleanup: Array<() => void> = [];
  const ctx = new Context().extend({
    effect(fn: () => () => void) {
      const off = fn();
      cleanup.push(off);
      return off;
    },
    on(name: string, fn: Function) {
      events.set(name, fn);
      return () => events.delete(name);
    },
    systemPrompt: {
      section(s: { name: string; text: string }) {
        assert.ok(s.text.length < 300);
        sections.add(s.name);
        return () => sections.delete(s.name);
      },
      context(s: { name: string }) {
        sections.add(s.name);
        return () => sections.delete(s.name);
      },
    },
    tools: {
      register(t: ToolDefinition) {
        tool = t;
        return () => {
          tool = undefined;
        };
      },
    },
    workspaceRegistry: { list: () => [] },
  });
  registerDesignDocuments(ctx, documents, async () => {});
  assert.ok(!events.has("agent/pre-step"));
  assert.ok(tool);
  assert.deepEqual(
    projectToolSchema(tool, true),
    JSON.parse(
      await readFile(
        new URL("./design-open.expected.json", import.meta.url),
        "utf8",
      ),
    ),
  );
  await assert.rejects(
    tool.execute({}, {
      signal: new AbortController().signal,
    } as ToolRunContext),
    { code: "DESIGN_CONTEXT" },
  );
  for (const off of cleanup.reverse()) off();
  assert.equal(tool, undefined);
  assert.equal(sections.size, 0);
  await documents.dispose();
});
test("disposal waits for admitted baseline capture, then withdraws context and watches", async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let entered!: () => void;
  const started = new Promise<void>((resolve) => {
    entered = resolve;
  });
  const f = await fixture(async () => {
    entered();
    await gate;
  });
  const bind = f.documents.bind(f.root, "session", "site/home.html");
  await started;
  let disposed = false;
  const close = f.documents.dispose().then(() => {
    disposed = true;
  });
  await Promise.resolve();
  assert.equal(disposed, false);
  release();
  await bind;
  await close;
  assert.equal(f.documents.context(f.root, "session"), "");
  await assert.rejects(f.documents.bind(f.root, "session", "site/home.html"), {
    code: "DESIGN_CLOSED",
  });
  await f.close();
});

test("a retained tab reads its own document without changing the active conversation file", async () => {
  const f = await fixture();
  try {
    await f.documents.bind(f.root, "session", "site/home.html");
    await writeFile(
      join(f.root, "site/second.html"),
      "<h1>Second document</h1>",
    );
    await f.documents.bind(f.root, "session", "site/second.html");
    const oldTab = await f.documents.snapshot(
      f.root,
      "session",
      "site/home.html",
    );
    assert.equal(oldTab?.state.entry, "site/home.html");
    assert.equal(
      (await f.documents.read(f.root, "session"))?.entry,
      "site/second.html",
    );
  } finally {
    await f.close();
  }
});

test("a delayed version selection cannot attach one file's snapshot to another file", async () => {
  const f = await fixture();
  try {
    await f.documents.bind(f.root, "session", "site/home.html");
    await writeFile(join(f.root, "site/second.html"), "<h1>Second</h1>");
    await f.documents.bind(f.root, "session", "site/second.html");
    await assert.rejects(
      f.documents.selectVersion(
        f.root,
        "session",
        "old-version.html",
        "site/home.html",
      ),
      { code: "DESIGN_STALE_ACTIVATION" },
    );
    assert.equal(
      (await f.documents.read(f.root, "session"))?.viewingVersion,
      undefined,
    );
  } finally {
    await f.close();
  }
});
