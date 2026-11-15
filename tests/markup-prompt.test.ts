import test from "node:test";
import assert from "node:assert/strict";
import { sendMarkupPrompt } from "../packages/studio-core/src/markup-prompt.ts";

test("markup submits text and PNG bytes together to the native session", async () => {
  const image = new File([new Uint8Array([137, 80, 78, 71])], "marked.png", {
    type: "image/png",
  });
  await sendMarkupPrompt(
    {
      prompt: async (content, mode) => {
        assert.equal(mode, "queue");
        assert.deepEqual(content, [
          { type: "text", text: "Enlarge the marked title" },
          {
            type: "image",
            mediaType: "image/png",
            name: "marked.png",
            data: "iVBORw==",
          },
        ]);
        return { ok: true, value: { accepted: true } };
      },
    },
    "Enlarge the marked title",
    image,
  );
});

test("native rejection leaves markup submission failed", async () => {
  await assert.rejects(sendMarkupPrompt({prompt: async () => { throw new Error("Model unavailable"); }}, "Change the heading", new File(["png"],"marked.png",{type:"image/png"})), /Model unavailable/);
});
