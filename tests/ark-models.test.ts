import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { openAiImageGenerationStatus } from "../packages/studio-core/src/original/apps/server/src/extensions/openai-image-generation.ts";
import { validateVideoSubmission, videoModelDefinition, videoRequest } from "../packages/studio-core/src/original/apps/server/src/extensions/video-generation.ts";

test("Seedance versions retain distinct limits and use the same native Ark connection", async () => {
  const authorization = { read: async () => ({ ARK_API_KEY: "fixture" }) };
  const config = { configPath: "", workspaces: [], readOnly: false };
  for (const [model, upstream, duration] of [["seedance-2.0", "doubao-seedance-2-0-260128", "15"], ["seedance-2.5", "doubao-seedance-2-5-260628", "30"]]) {
    const args = validateVideoSubmission({ requestId: randomUUID(), model, operation: "text", prompt: "A quiet garden", resolution: "720p", ratio: "16:9", duration });
    const request = await videoRequest({ id: "fixture", name: "Fixture", path: "/tmp", workspaceType: "local" }, args, "fixture", config, authorization);
    assert.equal(request.url, "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks");
    assert("model" in request.body);
    assert.equal(request.body.model, upstream);
    assert.equal(videoModelDefinition(model).service, "volcengine-video");
  }
  assert.throws(() => validateVideoSubmission({ requestId: randomUUID(), model: "seedance-2.0", operation: "text", prompt: "Garden", resolution: "720p", ratio: "16:9", duration: "30" }));
});

test("Seedream 5.5 is selectable with supported sizes and retains the previous image model", async () => {
  const status = await openAiImageGenerationStatus({ read: async () => ({ ARK_API_KEY: "fixture" }) });
  const model = status.models.find(model => model.id === "volcengine/seedream-5.5");
  assert(model?.configured);
  assert.deepEqual(model.parameters.size?.values.slice(0, 3), ["1K", "1.5K", "2K"]);
  assert(status.models.some(model => model.id === "volcengine/seedream-5"));
});
