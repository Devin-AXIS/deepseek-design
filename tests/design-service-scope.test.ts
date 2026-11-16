import test from "node:test";
import assert from "node:assert/strict";
import { designServiceAllowed } from "../packages/studio-core/src/design-service-scope.ts";

test("Design retains image and publishing services and rejects video-only actions", () => {
  for (const [extension, action] of [["storage", "publish_workspace_files"], ["openai-image-generation", "generate"], ["media", "speech_synthesize"], ["media-studio", "image-status"]])
    assert.equal(designServiceAllowed(extension!, action!), true);
  for (const [extension, action] of [["video-generation", "start"], ["video-enhancement", "status"], ["media", "video_component_install"], ["media-studio", "video-status"], ["media", "digital_human_generate"]])
    assert.equal(designServiceAllowed(extension!, action!), false);
});
