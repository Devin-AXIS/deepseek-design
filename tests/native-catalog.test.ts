import test from "node:test";
import assert from "node:assert/strict";
import { Context } from "@deepseek-ai/cordis";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { StudioServices } from "../packages/studio-core/src/services.ts";
import {
  createVideoJob,
  getVideoJob,
} from "../packages/studio-core/src/original/apps/server/src/extensions/video-jobs.ts";

test("reading a personal template catalog does not start a video worker", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-personal-catalog-"));
  const workspace = { id: "workspace", path: root, sessionIds: [] };
  const context = new Context().extend({
    tools: {
      register() {
        return () => {};
      },
    },
    workspaceRegistry: {
      get() {
        return workspace;
      },
    },
  });
  const services = new StudioServices(
    context,
    "design",
    {
      maxLocalMediaBytes: 1024,
      serviceCredentials: {},
      enhancementModelsPath: "",
      ffmpegPath: "",
      ffprobePath: "",
    },
    join(root, "plugin-without-bundled-resources"),
  );
  try {
    assert.deepEqual(await services.personalTemplates(workspace.id), []);
    await services.dispose();
    const db = new DatabaseSync(
      join(root, ".dsh-studio/design/runtime.sqlite"),
    );
    try {
      assert.equal(
        db
          .prepare("SELECT name FROM sqlite_master WHERE name = 'video_jobs'")
          .get(),
        undefined,
      );
    } finally {
      db.close();
    }
    await assert.rejects(readFile(join(root, ".dsh-studio/design/templates")), {
      code: "ENOENT",
    });
  } finally {
    await services.dispose();
    await rm(root, { recursive: true, force: true });
  }
});

test("opening a workspace still resumes its previously submitted video jobs", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-resume-video-"));
  const config = {
    configPath: join(root, ".dsh-studio/design/config.json"),
    workspaces: [],
    readOnly: false,
  };
  const workspace = { id: "workspace", path: root, sessionIds: [] };
  const context = new Context().extend({
    tools: {
      register() {
        return () => {};
      },
    },
    workspaceRegistry: {
      get() {
        return workspace;
      },
    },
  });
  const services = new StudioServices(
    context,
    "design",
    {
      maxLocalMediaBytes: 1024,
      serviceCredentials: {},
      enhancementModelsPath: "",
      ffmpegPath: "",
      ffprobePath: "",
    },
    join(root, "plugin-without-bundled-resources"),
  );
  try {
    await createVideoJob(config, {
      id: "interrupted-submit",
      workspaceId: workspace.id,
      sessionId: "session",
      model: "test",
      operation: "test",
      prompt: "test",
      fingerprint: "test",
      upstreamId: "",
      status: "submitting",
      path: "",
      message: "",
      createdAt: 0,
      updatedAt: 0,
      nextPoll: 0,
    });
    await services.personalTemplates(workspace.id);
    await services.dispose();
    assert.equal(
      (await getVideoJob(config, "interrupted-submit", workspace.id, "session"))
        .status,
      "uncertain",
    );
  } finally {
    await services.dispose();
    await rm(root, { recursive: true, force: true });
  }
});
