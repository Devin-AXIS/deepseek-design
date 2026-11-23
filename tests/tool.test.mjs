import { mkdir, mkdtemp, readdir, readFile, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { execFile, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { projectToolSchema } from "@deepseek-ai/dsh-tools";
/** Built-plugin tool checks cover wire input and missing session context without model calls. */
import test from "node:test";
import assert from "node:assert/strict";
import { apply, Config } from "../packages/deepseek-video/lib/index.js";
function fixture(root, mode = "workspace-write") {
  const cleanup = [],
    tools = [],
    skills = new Map();
  const ctx = {
    inject() {},
    get() {
      return { readRecord: async () => undefined };
    },
    effect(effect) {
      cleanup.push(effect());
    },
    systemPrompt: { section() { return () => {}; }, context() { return () => {}; } },
    skills: { register(skill) {
      skills.set(skill.name, skill.content);
      return () => skills.delete(skill.name);
    } },
    workspaceRegistry: { list: () => root ? [{ path: root, sessionIds: ["video-fixture"] }] : [] },
    sandboxPolicy: { resolve: () => ({ mode }) },
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
    skills,
    reference: tools.find((tool) => tool.name === "ipollowork_video_reference"),
    tool: tools.find((tool) => tool.name === "ipollowork_video_validate"),
    actionTool: tools.find((tool) => tool.name === "ipollowork_video_action"),
    async dispose() {
      while (cleanup.length) await cleanup.pop()?.();
    },
  };
}

test("the bundled reference workflow is withdrawn with Video", async () => {
  const f = fixture();
  assert.match(f.skills.get("ipollowork-video"), /ipollowork_video_reference/);
  await assert.rejects(
    f.reference.execute({ operation: "probe", referencePath: "clip.mp4" }, { signal: new AbortController().signal }),
    { code: "STUDIO_CONTEXT" },
  );
  await f.dispose();
  assert.equal(f.skills.size, 0);
});

test("the reference tool rejects writes in read-only sessions and files from sibling projects", async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "ivideo-reference-access-")));
  const writable = fixture(root);
  const readOnly = fixture(root, "read-only");
  const project = "video/video-fixture";
  const execute = { agent: { session: { id: "video-fixture", header: { cwd: root } } }, signal: new AbortController().signal };
  try {
    await mkdir(join(root, project, "assets"), { recursive: true });
    await mkdir(join(root, "video/other"), { recursive: true });
    await writeFile(join(root, "video/other/test.mp4"), "private neighbour");
    await assert.rejects(readOnly.reference.execute({
      operation: "frames", referencePath: `${project}/assets/test.mp4`, times: [0.2],
    }, execute), { code: "STUDIO_READ_ONLY" });
    await assert.rejects(writable.reference.execute({
      operation: "probe", referencePath: "video/other/test.mp4",
    }, execute));
    if (process.platform !== "win32") {
      await symlink(join(root, "video/other/test.mp4"), join(root, project, "assets/test.mp4"));
      await assert.rejects(writable.reference.execute({
        operation: "probe", referencePath: `${project}/assets/test.mp4`,
      }, execute), { code: "INVALID_ARGS" });
    }
  } finally {
    await Promise.all([writable.dispose(), readOnly.dispose()]);
    await rm(root, { recursive: true, force: true });
  }
});

const withFfmpeg = ["ffmpeg", "ffprobe"].every((name) =>
  spawnSync(name, ["-version"], { stdio: "ignore", windowsHide: true }).status === 0);
test("the installed HyperFrames measures motion and saves paired frames of the real video", {
  timeout: 60_000,
  skip: withFfmpeg ? false : "FFmpeg and FFprobe are needed for media integration",
}, async () => {
  const root = await realpath(await mkdtemp(join(tmpdir(), "ivideo-reference-")));
  const f = fixture(root);
  const project = "video/video-fixture";
  const referencePath = `${project}/assets/参考片.mp4`;
  const comparisonPath = `${project}/renders/实际导出.mp4`;
  const execute = { agent: { session: { id: "video-fixture", header: { cwd: root } } }, signal: new AbortController().signal };
  try {
    await mkdir(join(root, project, "assets"), { recursive: true });
    await mkdir(join(root, project, "renders"), { recursive: true });
    const ffmpeg = promisify(execFile);
    await ffmpeg("ffmpeg", ["-v", "error", "-f", "lavfi", "-i", "color=0x182540:s=320x180:r=24:d=3",
      "-f", "lavfi", "-i", "color=0xf0a040:s=40x30:r=24:d=3",
      "-f", "lavfi", "-i", "sine=frequency=320:duration=3",
      "-filter_complex", "[0:v][1:v]overlay=x='20+min(max(t-0.4,0),1.2)*174':y=60[v]",
      "-map", "[v]", "-map", "2:a", "-c:v", "libx264", "-c:a", "aac", "-pix_fmt", "yuv420p", "-shortest",
      join(root, referencePath)]);
    await ffmpeg("ffmpeg", ["-v", "error", "-i", join(root, referencePath), "-c", "copy", join(root, comparisonPath)]);
    const probe = await f.reference.execute({ operation: "probe", referencePath }, execute);
    assert.equal(probe.report._meta.version, "0.9.84");
    assert.equal(probe.report.width, 320);
    assert.equal(probe.report.audio, true);
    assert.equal(probe.report.video, referencePath);
    const cuts = await f.reference.execute({ operation: "cuts", referencePath, start: 0, end: 2.5 }, execute);
    assert.equal(cuts.report.ok, true);
    const look = await f.reference.execute({ operation: "look", referencePath, start: 0.9 }, execute);
    assert.equal(look.report.colors.length, 6);
    const ink = await f.reference.execute({ operation: "ink", referencePath, start: 0.9, roi: [10, 53, 280, 45] }, execute);
    assert.equal(ink.report.ok, true);
    const events = await f.reference.execute({ operation: "events", referencePath, start: 0, end: 2.5 }, execute);
    assert.equal(events.report.ok, true);
    assert.ok(!JSON.stringify(events).includes("ipw-video-reference-"));
    const curve = await f.reference.execute({ operation: "curve", referencePath, comparisonPath, start: 0, end: 2.5, roi: [10, 53, 280, 45] }, execute);
    assert.ok(curve.report.reference.length > 0);
    assert.deepEqual(curve.report.reference, curve.report.yours);
    const frames = await f.reference.execute({ operation: "frames", referencePath, comparisonPath, times: [0.25, 0.9, 1.8] }, execute);
    assert.equal(frames.referenceFrames.length, 3);
    assert.deepEqual(frames.referenceFrames.map(({ time }) => time), frames.comparisonFrames.map(({ time }) => time));
    const pair = await Promise.all([frames.referenceFrames[1], frames.comparisonFrames[1]]
      .map(({ path }) => readFile(join(root, path))));
    assert.deepEqual(pair[0], pair[1]);
    assert.equal(pair[0].subarray(1, 4).toString(), "PNG");
    const renders = join(root, project, "renders");
    const beforeUnload = await readdir(renders);
    const interrupted = assert.rejects(
      f.reference.execute({ operation: "frames", referencePath, times: [0.5] }, execute),
      { name: "AbortError" },
    );
    await f.dispose();
    await interrupted;
    assert.deepEqual(await readdir(renders), beforeUnload);
  } finally {
    await f.dispose();
    await rm(root, { recursive: true, force: true });
  }
});
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
