import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { VideoRuntimeManager } from "../packages/deepseek-video/lib/runtime.js";
test("disposing while a preview starts drains startup and leaves no preview process", async () => {
  const root = await mkdtemp(join(tmpdir(), "dsh-original-video-"));
  const cli = join(root, "cli.mjs");
  const session = "lifecycle-" + Date.now();
  const project = join(root, "video", session);
  await mkdir(project, { recursive: true });
  await writeFile(
    join(project, "index.html"),
    "<html><body>existing project</body></html>",
  );
  await writeFile(
    cli,
    `import {writeFileSync} from 'node:fs';process.on('SIGTERM',()=>setTimeout(()=>process.exit(0),150));writeFileSync('started.pid',String(process.pid));setInterval(()=>{},1000);`,
  );
  const manager = new VideoRuntimeManager({
    cliPath: cli,
    startTimeoutMs: 5e3,
  });
  const starting = manager.start({
    workspaceRoot: root,
    sessionId: session,
    viewId: "test",
  });
  const rejected = assert.rejects(starting);
  const deadline = Date.now() + 1e4;
  while (true) {
    try {
      await readFile(join(project, "started.pid"));
      break;
    } catch {
      if (Date.now() > deadline) throw Error("Preview fixture did not start");
      await new Promise((r) => setTimeout(r, 10));
    }
  }
  await manager.dispose();
  await rejected;
  assert.equal(manager.activePreviewCount(), 0);
  await assert.rejects(
    manager.start({ workspaceRoot: root, sessionId: session }),
    { name: "AbortError" },
  );
  await manager.dispose();
  const pid = Number(await readFile(join(project, "started.pid"), "utf8"));
  assert.throws(() => process.kill(pid, 0));
  await rm(root, { recursive: true, force: true });
});
