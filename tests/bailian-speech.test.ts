import test from "node:test";
import assert from "node:assert/strict";
import {
  bailianSpeechRequest,
  DEFAULT_HTTP_SPEECH_MODEL,
  speechAudioMp3,
} from "../packages/studio-core/src/bailian-speech.ts";

test("Bailian default speech uses the configured HTTP route and Qwen voice fields", () => {
  const request = bailianSpeechRequest(
    "https://dashscope.aliyuncs.com",
    DEFAULT_HTTP_SPEECH_MODEL,
    { text: "你好", rate: 1 },
  );
  assert.equal(
    request.url,
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
  );
  assert.deepEqual(request.body, {
    model: "qwen3-tts-flash",
    input: { text: "你好", voice: "Cherry", language_type: "Auto" },
  });
  assert.equal(request.streaming, false);
});
test("existing MP3 narration stays byte-identical", async () => {
  const audio = Buffer.from("ID3existing-audio");
  assert.equal(await speechAudioMp3(audio), audio);
});
