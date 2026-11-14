/** Built host regressions exercise original service implementations behind native authentication. */
import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  realpath,
  rm,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { apply, Config } from "../packages/deepseek-design/lib/index.js";

async function fixture(mode = "workspace-write") {
  const root = await realpath(
    await mkdtemp(join(tmpdir(), "native-studio-services-")),
  );
  const cleanup = [],
    tools = [];
  let route;
  const events = new Map();
  const workspace = {
    id: "workspace-fixture",
    path: root,
    sessionIds: ["session-fixture"],
  };
  const credentials = {
    readRecord: async () => undefined,
    resolve: async () => undefined,
  };
  const ctx = {
    on(name, listener) {
      const previous = events.get(name);
      events.set(
        name,
        previous
          ? (payload, next) => previous(payload, () => listener(payload, next))
          : listener,
      );
      return () => events.delete(name);
    },
    get(name) {
      if (name === "credentials") return credentials;
      if (name === "connection")
        return {
          admit: ({ headers }) =>
            headers.authorization === "Bearer native-fixture"
              ? { peer: { principal: { kind: "owner" } } }
              : { rejection: 401 },
        };
      throw Error(name);
    },
    credentials,
    logger: { warn: () => {} },
    systemPrompt: {
      section: () => () => {},
      context: () => () => {},
    },
    sandboxPolicy: { resolve: () => ({ mode, workspaceRoot: root }) },
    workspaceRegistry: {
      get: (id) => (id === workspace.id ? workspace : undefined),
      list: () => [workspace],
    },
    effect(effect) {
      cleanup.push(effect());
    },
    tools: {
      register(tool) {
        tools.push(tool);
        return () => {};
      },
    },
    webServer: {
      register(value) {
        route = value;
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
      serviceCredentials: {},
      enhancementModelsPath: "",
      ffmpegPath: "",
      ffprobePath: "",
    }),
  );
  const server = createServer((req, res) => {
    void route.handler(req, res);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const headers = { authorization: "Bearer native-fixture" };
  const bootstrap = await fetch(origin + "/ipollowork-design/bootstrap", {
    headers,
  });
  assert.equal(bootstrap.status, 200);
  headers["x-ipollowork-design-token"] = (await bootstrap.json()).token;
  return {
    root,
    origin,
    headers,
    tools,
    async beforeTurn(turn, options = {}) {
      const messages = options.messages ?? [
        {
          id: `user-${turn}-${options.step ?? 1}`,
          source: { kind: "user" },
          content: [{ type: "text", text: "Update the website" }],
        },
      ];
      if (!events.has("agent/pre-step"))
        return options.reject
          ? { kind: "reject" }
          : { kind: "enter", messages };
      return events.get("agent/pre-step")(
        {
          agent: { session: { id: "session-fixture", header: { cwd: root } } },
          messages,
          turn,
          step: options.step ?? 1,
          signal: new AbortController().signal,
        },
        async () =>
          options.reject ? { kind: "reject" } : { kind: "enter", messages },
      );
    },
    async call(extensionId, action, args = {}) {
      return fetch(
        origin + "/ipollowork-design/api/services/experimental/extensions/call",
        {
          method: "POST",
          headers: { ...headers, "content-type": "application/json" },
          body: JSON.stringify({
            extensionId,
            action,
            args,
            context: {
              workspaceId: workspace.id,
              sessionId: "session-fixture",
            },
          }),
        },
      );
    },
    async dispose() {
      for (const dispose of cleanup.reverse()) await dispose?.();
      await new Promise((resolve) => server.close(resolve));
      await rm(root, { recursive: true, force: true });
    },
  };
}

test("opening an external HTML through the model preserves its first version", async () => {
  const f = await fixture();
  try {
    const original = "<h1>Before the first AI edit</h1>";
    await writeFile(join(f.root, "landing.html"), original);
    const tool = f.tools.find((item) => item.name === "design_open");
    const current = await tool.execute(
      { path: "landing.html" },
      {
        callId: "open-external",
        signal: new AbortController().signal,
        agent: { session: { id: "session-fixture", header: { cwd: f.root } } },
      },
    );
    assert.equal(current.entry, "landing.html");
    const response = await fetch(
      f.origin +
        "/ipollowork-design/api/history?workspaceId=workspace-fixture&sessionId=session-fixture",
      { headers: f.headers },
    );
    const history = await response.json();
    assert.equal(history.versions.length, 1);
    assert.equal(
      await readFile(join(f.root, history.versions[0].path), "utf8"),
      original,
    );
    assert.equal(
      await readFile(join(f.root, "landing.html"), "utf8"),
      original,
    );
  } finally {
    await f.dispose();
  }
});

test("read-only Design opening never writes metadata or a baseline", async () => {
  const f = await fixture("read-only");
  try {
    await writeFile(join(f.root, "landing.html"), "<h1>Read only</h1>");
    const tool = f.tools.find((item) => item.name === "design_open");
    const exec = {
      callId: "read-only-open",
      signal: new AbortController().signal,
      agent: { session: { id: "session-fixture", header: { cwd: f.root } } },
    };
    assert.equal(
      (await tool.execute({ path: "landing.html" }, exec)).entry,
      "landing.html",
    );
    await assert.rejects(
      readFile(
        join(f.root, ".dsh-studio/design/bindings/session-fixture.json"),
      ),
      { code: "ENOENT" },
    );
  } finally {
    await f.dispose();
  }
});

test("original publishing, voice, generation and media component services respond through the native plugin", async () => {
  const f = await fixture();
  try {
    for (const [service, action] of [
      ["storage", "status"],
      ["media", "status"],
      ["video-generation", "status"],
      ["openai-image-generation", "status"],
      ["media-studio", "image-status"],
    ]) {
      const response = await f.call(service, action);
      const body = await response.json();
      assert.equal(response.status, 200, service + ": " + JSON.stringify(body));
      assert.equal(body.ok, true, service);
    }
    const denied = await fetch(
      f.origin +
        "/ipollowork-design/api/services/workspace/workspace-fixture/plugin-packages",
    );
    assert.equal(denied.status, 401);
    const response = await fetch(
      f.origin +
        "/ipollowork-design/api/services/workspace/workspace-fixture/plugin-packages",
      { headers: f.headers },
    );
    assert.equal(response.status, 200);
    const { items } = await response.json();
    assert.equal(items[0].pluginId, "media-studio");
    for (const resource of items[0].manifest.resources.filter(
      (item) => item.type === "ui",
    )) {
      const page = await fetch(
        f.origin +
          "/ipollowork-design/api/services/workspace/workspace-fixture/plugin-packages/media-studio/ui/" +
          resource.id,
        { headers: f.headers },
      );
      assert.equal(page.status, 200);
      assert.ok((await page.json()).html.includes("<"));
    }
    assert.equal(
      (
        await fetch(f.origin + "/ipollowork-design/studio/", {
          headers: f.headers,
        })
      ).status,
      404,
    );
  } finally {
    await f.dispose();
  }
});

test("native media uploads preserve bytes and refuse workspace escapes", async () => {
  const f = await fixture();
  try {
    const bytes = Buffer.from([137, 80, 78, 71, 0, 1, 255]);
    const upload = await fetch(
      f.origin +
        "/ipollowork-design/api/services/workspace/workspace-fixture/files/raw",
      {
        method: "POST",
        headers: { ...f.headers, "content-type": "application/json" },
        body: JSON.stringify({
          path: "design/session-fixture/assets/test.png",
          dataBase64: bytes.toString("base64"),
        }),
      },
    );
    assert.equal(upload.status, 200);
    assert.deepEqual(
      await readFile(join(f.root, "design/session-fixture/assets/test.png")),
      bytes,
    );
    const invalid = await fetch(
      f.origin +
        "/ipollowork-design/api/services/workspace/workspace-fixture/files/content?path=" +
        encodeURIComponent("design/../../outside.txt"),
      { headers: f.headers },
    );
    assert.equal(invalid.status, 400);
  } finally {
    await f.dispose();
  }
});

test("native model actions discover schemas and bind execution to the current workspace session", async () => {
  const f = await fixture();
  try {
    const tool = f.tools.find(
      (item) => item.name === "ipollowork_design_action",
    );
    assert.ok(tool);
    const context = { signal: new AbortController().signal };
    const { result: actions } = await tool.execute(
      { extensionId: "media", action: "list" },
      context,
    );
    assert.ok(
      actions.some(
        (item) => item.action === "speech_synthesize_workspace_batch",
      ),
    );
    const { result: description } = await tool.execute(
      {
        extensionId: "media-studio",
        action: "describe",
        args: { name: "edit-image" },
      },
      context,
    );
    assert.ok(description.inputSchema);
    await assert.rejects(
      tool.execute({ extensionId: "storage", action: "status" }, context),
      { code: "STUDIO_CONTEXT" },
    );
    const active = {
      ...context,
      agent: { session: { id: "session-fixture", header: { cwd: f.root } } },
    };
    await assert.rejects(
      tool.execute(
        {
          extensionId: "storage",
          action: "status",
          args: { workspaceId: "other" },
        },
        active,
      ),
      { code: "STUDIO_CONTEXT" },
    );
    const { result } = await tool.execute(
      { extensionId: "storage", action: "status" },
      active,
    );
    assert.equal(result.ok, true);
  } finally {
    await f.dispose();
  }
});

test("native model actions honor read-only access and canonical workspace paths", async () => {
  const f = await fixture("read-only"),
    other = await realpath(await mkdtemp(join(tmpdir(), "studio-outside-")));
  try {
    const tool = f.tools.find(
      (item) => item.name === "ipollowork_design_action",
    );
    const active = {
      signal: new AbortController().signal,
      agent: { session: { id: "session-fixture", header: { cwd: f.root } } },
    };
    assert.equal(
      (await tool.execute({ extensionId: "storage", action: "status" }, active))
        .result.ok,
      true,
    );
    await assert.rejects(
      tool.execute(
        { extensionId: "media", action: "speech_synthesize_workspace_batch" },
        active,
      ),
      { code: "STUDIO_READ_ONLY" },
    );
    await symlink(other, join(f.root, "escape"), "dir");
    await assert.rejects(
      tool.execute(
        {
          extensionId: "storage",
          action: "status",
          args: { sourcePath: "escape/secret.png" },
        },
        active,
      ),
      { code: "STUDIO_PATH_DENIED" },
    );
    await assert.rejects(
      tool.execute(
        {
          extensionId: "storage",
          action: "status",
          args: { sourcePath: "../secret.png" },
        },
        active,
      ),
      { code: "STUDIO_PATH_DENIED" },
    );
  } finally {
    await f.dispose();
    await rm(other, { recursive: true, force: true });
  }
});

test("original template projects save, export and reapply through native services", async () => {
  const f = await fixture();
  const api = async (path, body) => {
    const response = await fetch(f.origin + "/ipollowork-design/api" + path, {
      method: body ? "POST" : "GET",
      headers: { ...f.headers, "content-type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    assert.equal(
      response.status,
      200,
      path + ": " + (response.status === 200 ? "" : await response.text()),
    );
    return response;
  };
  try {
    const query = "?workspaceId=workspace-fixture&sessionId=session-fixture";
    const snapshot = await (await api("/session" + query)).json();
    assert.equal(snapshot.manifest.surface, "design");
    const catalog = await (
      await api("/templates?workspaceId=workspace-fixture")
    ).json();
    const stock = catalog.find((item) => item.manifest.category === "site");
    assert.ok(stock);
    await api("/template", {
      workspaceId: "workspace-fixture",
      sessionId: "session-fixture",
      templateId: stock.manifest.id,
    });
    const service =
      "/services/workspace/workspace-fixture/templates/from-session";
    const validation = await (
      await api(service + "/validate", { sessionId: "session-fixture" })
    ).json();
    assert.equal(validation.ready, true, JSON.stringify(validation));
    const body = {
      sessionId: "session-fixture",
      category: "site",
      title: "Native template roundtrip",
    };
    const saved = await (await api(service, body)).json();
    assert.ok(saved.item);
    const exported = await api(service + "/package", body);
    assert.match(exported.headers.get("content-disposition"), /\.ipwp/);
    const bytes = Buffer.from(await exported.arrayBuffer());
    assert.equal(bytes.subarray(0, 2).toString(), "PK");
    const next = await (
      await api("/templates?workspaceId=workspace-fixture")
    ).json();
    const personal = next.find(
      (item) => item.manifest.title === "Native template roundtrip",
    );
    assert.ok(
      personal,
      JSON.stringify(next.map((item) => item.manifest.title)),
    );
    await api("/template", {
      workspaceId: "workspace-fixture",
      sessionId: "session-fixture",
      templateId: personal.manifest.id,
    });
    assert.equal(
      (await (await api("/session" + query)).json()).manifest.title,
      "Native template roundtrip",
    );
  } finally {
    await f.dispose();
  }
});

test("adopting an existing original HTML project preserves its bytes and selected entry", async () => {
  const f = await fixture();
  try {
    const path = join(f.root, "design/session-fixture/index.html"),
      content =
        "<!doctype html><html><body><h1>Existing native project</h1></body></html>";
    await mkdir(join(f.root, "design/session-fixture"), { recursive: true });
    await writeFile(path, content);
    const response = await fetch(
      f.origin +
        "/ipollowork-design/api/session?workspaceId=workspace-fixture&sessionId=session-fixture",
      { headers: f.headers },
    );
    assert.equal(response.status, 200);
    const snapshot = await response.json();
    assert.equal(snapshot.manifest.entry, "index.html");
    assert.equal(await readFile(path, "utf8"), content);
  } finally {
    await f.dispose();
  }
});

test("ordinary Agent turns remain independent from Design files; history resumes only on an explicit action", async () => {
  const f = await fixture();
  const api = async (path, body) => {
    const response = await fetch(f.origin + "/ipollowork-design/api" + path, {
      method: body ? "POST" : "GET",
      headers: { ...f.headers, "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    assert.equal(response.status, 200, await response.clone().text());
    return response.json();
  };
  try {
    const query = "?workspaceId=workspace-fixture&sessionId=session-fixture";
    const snapshot = await api("/session" + query);
    const original = await readFile(join(f.root, snapshot.state.entry), "utf8");
    const version = (await api("/history" + query)).versions[0];
    await api("/file", {
      workspaceId: "workspace-fixture",
      sessionId: "session-fixture",
      path: snapshot.state.entry,
      content: "<h1>Later edit</h1>",
    });
    await api("/history/selection", {
      workspaceId: "workspace-fixture",
      sessionId: "session-fixture",
      path: version.path,
    });
    assert.equal((await f.beforeTurn(1)).kind, "enter");
    assert.equal(
      await readFile(join(f.root, snapshot.state.entry), "utf8"),
      "<h1>Later edit</h1>",
    );
    await api("/document", {
      sessionId: "session-fixture",
      path: snapshot.state.entry,
      mode: "resume",
    });
    assert.equal(
      await readFile(join(f.root, snapshot.state.entry), "utf8"),
      original,
    );
    const created = await api("/document", {
      sessionId: "session-fixture",
      path: snapshot.state.entry,
      mode: "new",
    });
    assert.notEqual(created.entry, snapshot.state.entry);
    assert.ok(
      (await readFile(join(f.root, created.entry), "utf8")).includes(
        "<main></main>",
      ),
    );
    assert.equal(
      await readFile(join(f.root, snapshot.state.entry), "utf8"),
      original,
    );
    await rm(join(f.root, snapshot.state.entry));
    assert.equal((await f.beforeTurn(2)).kind, "enter");
  } finally {
    await f.dispose();
  }
});
