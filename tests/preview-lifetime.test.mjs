/** The packaged CLI must remain owned after it becomes ready, not detach a server. */
import test from "node:test";
import assert from "node:assert/strict";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import {
  VideoRuntimeManager,
  readHyperframesServerConfig,
} from "../packages/deepseek-video/lib/runtime.js";

test("disposing a ready packaged preview stops its actual server process", async () => {
  const root = await mkdtemp(join(tmpdir(), "studio-ready-preview-"));
  const sessionId = randomUUID();
  const manager = new VideoRuntimeManager();
  let serverPid;
  try {
    await cp(
      resolve(
        "packages/studio-core/templates/video/ipollowork.hyperframes.ai-assistant-launch",
      ),
      join(root, "video", sessionId),
      { recursive: true },
    );
    const session = await manager.start({
      workspaceRoot: root,
      sessionId,
      viewId: "test",
    });
    const running = await readHyperframesServerConfig(session.port);
    assert.ok(
      running?.pid,
      "The packaged preview must report its server process",
    );
    serverPid = running.pid;
    await manager.dispose();
    assert.equal(await readHyperframesServerConfig(session.port), null);
    assert.throws(() => process.kill(running.pid, 0), { code: "ESRCH" });
  } finally {
    await manager.dispose();
    if (serverPid) {
      try {
        process.kill(
          process.platform === "win32" ? serverPid : -serverPid,
          "SIGTERM",
        );
      } catch (error) {
        if (error.code !== "ESRCH") throw error;
      }
    }
    await rm(root, { recursive: true, force: true });
  }
});
