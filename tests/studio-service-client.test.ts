import test from "node:test";
import assert from "node:assert/strict";
import {
  createStudioServiceClient,
  StudioServiceError,
} from "../packages/studio-core/src/service-client.ts";

test("native Studio clients use only their implemented, authenticated service routes", async (t) => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: URL; init: RequestInit }> = [];
  let reply = (_url: URL, _init: RequestInit): Response | Promise<Response> =>
    Response.json({});
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { location: { href: "https://studio.example/session" } },
  });
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(String(input));
    calls.push({ url, init });
    assert.equal(
      new Headers(init.headers).get("x-ipollowork-design-token"),
      "",
    );
    assert.equal(init.credentials, "same-origin");
    assert.equal(init.redirect, "error");
    return reply(url, init);
  };
  const client = createStudioServiceClient("design", {
    workspaceId: "workspace/a",
    sessionId: "session/a",
  });
  const file = {
    ok: true,
    path: "media/image.png",
    bytes: 3,
    updatedAt: 12,
    revision: "v2",
  };
  try {
    await t.test(
      "does not claim old account, desktop, or realtime voice services",
      () => {
        assert.equal("createVoiceRealtimeSession" in client, false);
        assert.equal("createSession" in client, false);
        assert.equal("listWorkspaces" in client, false);
        assert.equal("googleWorkspaceConnectStart" in client, false);
        assert.equal(Object.keys(client).length, 17);
      },
    );
    await t.test(
      "retains session scope for provider calls and surfaces invalid responses",
      async () => {
        reply = () =>
          Response.json({
            ok: true,
            extensionId: "media",
            action: "voice_list",
            result: { voices: [] },
          });
        await client.callMedia(
          "voice_list",
          {},
          { sessionId: "wrong", workspaceId: "wrong", custom: true },
        );
        const call = calls.at(-1)!;
        assert.equal(
          call.url.pathname,
          "/ipollowork-design/api/services/experimental/extensions/call",
        );
        assert.deepEqual(JSON.parse(String(call.init.body)), {
          extensionId: "media",
          action: "voice_list",
          args: {},
          context: {
            sessionId: "session/a",
            workspaceId: "workspace/a",
            custom: true,
          },
        });
        reply = () => Response.json({ ok: true });
        await assert.rejects(client.callStorage("status"));
        reply = () =>
          Response.json(
            {
              code: "PROVIDER_MISSING",
              message: "Configure a media provider.",
            },
            { status: 503 },
          );
        await assert.rejects(client.callStorage("status"), (error) => {
          assert.ok(error instanceof StudioServiceError);
          assert.equal(error.status, 503);
          assert.equal(error.code, "PROVIDER_MISSING");
          assert.equal(error.message, "Configure a media provider.");
          return true;
        });
      },
    );
    await t.test(
      "keeps revision checks on text and binary writes and uploads actual files",
      async () => {
        reply = () => Response.json(file);
        const payload = {
          path: "draft.html",
          content: "draft",
          baseUpdatedAt: 11,
          force: false,
        };
        assert.deepEqual(
          await client.writeWorkspaceFile("workspace/a", payload),
          file,
        );
        assert.deepEqual(JSON.parse(String(calls.at(-1)!.init.body)), payload);
        assert.equal(
          calls.at(-1)!.url.pathname,
          "/ipollowork-design/api/services/workspace/workspace%2Fa/files/content",
        );
        await client.writeWorkspaceBinaryFile("workspace/a", {
          path: "image.png",
          data: Uint8Array.of(0, 128, 255).buffer,
          baseUpdatedAt: 11,
        });
        assert.deepEqual(JSON.parse(String(calls.at(-1)!.init.body)), {
          path: "image.png",
          dataBase64: "AID/",
          baseUpdatedAt: 11,
        });
        const upload = new File(["image"], "image.png", { type: "image/png" });
        await client.uploadWorkspaceMedia(
          "workspace/a",
          "media/a b.png",
          upload,
        );
        const call = calls.at(-1)!;
        assert.equal(call.url.searchParams.get("path"), "media/a b.png");
        assert.ok(call.init.body instanceof FormData);
        assert.equal(call.init.body.get("file"), upload);
        assert.equal(new Headers(call.init.headers).has("content-type"), false);
      },
    );
    await t.test(
      "downloads binary bytes and preserves template package filenames",
      async () => {
        reply = () =>
          new Response(Uint8Array.of(0, 128, 255), {
            headers: {
              "content-type": "application/zip",
              "content-disposition":
                "attachment; filename*=UTF-8''%E4%BD%9C%E5%93%81.ipwp",
            },
          });
        const result = await client.exportTemplateFromSession("workspace/a", {
          sessionId: "session/a",
          category: "slides",
          title: "作品",
        });
        assert.deepEqual(
          new Uint8Array(result.data),
          Uint8Array.of(0, 128, 255),
        );
        assert.equal(result.filename, "作品.ipwp");
        assert.equal(result.contentType, "application/zip");
        assert.match(
          calls.at(-1)!.url.pathname,
          /\/templates\/from-session\/package$/,
        );
        await client.downloadWorkspaceFile("workspace/a", "media/image.png");
        assert.equal(
          calls.at(-1)!.url.searchParams.get("path"),
          "media/image.png",
        );
      },
    );
    await t.test(
      "supports the native template, package, artifact and cleanup endpoints",
      async () => {
        reply = () => Response.json({ items: [] });
        await client.listPluginPackages("workspace/a");
        assert.match(calls.at(-1)!.url.pathname, /\/plugin-packages$/);
        await client.getPluginPackageUiResource(
          "workspace/a",
          "media/studio",
          "workbench",
        );
        assert.match(
          calls.at(-1)!.url.pathname,
          /\/plugin-packages\/media%2Fstudio\/ui\/workbench$/,
        );
        await client.listSessionArtifacts("workspace/a", "session/a", 3);
        assert.equal(calls.at(-1)!.url.searchParams.get("cursor"), "3");
        await client.getTemplateSession("workspace/a", "session/a");
        assert.match(
          calls.at(-1)!.url.pathname,
          /\/template-sessions\/session%2Fa$/,
        );
        await client.validateTemplateFromSession("workspace/a", "session/a");
        assert.deepEqual(JSON.parse(String(calls.at(-1)!.init.body)), {
          sessionId: "session/a",
        });
        await client.saveTemplateFromSession(
          "workspace/a",
          { sessionId: "session/a", category: "slides", title: "Draft" },
          "personal",
        );
        assert.match(calls.at(-1)!.url.pathname, /\/templates\/from-session$/);
        reply = () => Response.json([{ ok: true, path: "temporary.wav" }]);
        assert.deepEqual(
          await client.deleteWorkspaceFiles("workspace/a", [
            { path: "temporary.wav" },
          ]),
          [{ ok: true, path: "temporary.wav" }],
        );
        assert.match(calls.at(-1)!.url.pathname, /\/files\/delete$/);
      },
    );
    await t.test(
      "aborted provider operations preserve the caller's cancellation",
      async () => {
        reply = (_url, init) =>
          new Promise((_resolve, reject) =>
            init.signal?.addEventListener(
              "abort",
              () => reject(init.signal?.reason),
              { once: true },
            ),
          );
        const abort = new AbortController();
        const request = client.callExtensionAction(
          { extensionId: "video-generation", action: "submit" },
          { signal: abort.signal },
        );
        const reason = new Error("Editor closed");
        abort.abort(reason);
        await assert.rejects(request, (error) => error === reason);
      },
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalWindow)
      Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
