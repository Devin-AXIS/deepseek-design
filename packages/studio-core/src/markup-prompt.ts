/** Submit marked preview bytes through the retained native DSH session. */
import type { SessionFace } from "@deepseek-ai/dsh-api-session-controller/client";

/** Send the instruction and PNG together; a rejected native admission remains a visible failure. */
export async function sendMarkupPrompt(
  session: Pick<SessionFace, "prompt">,
  text: string,
  image: File,
): Promise<void> {
  const bytes = new Uint8Array(await image.arrayBuffer());
  const chunks: string[] = [];
  for (let offset = 0; offset < bytes.length; offset += 8192)
    chunks.push(String.fromCharCode(...bytes.subarray(offset, offset + 8192)));
  const result = await session.prompt(
    [
      { type: "text", text },
      {
        type: "image",
        mediaType: "image/png",
        data: btoa(chunks.join("")),
        name: image.name,
      },
    ],
    "queue",
  );
  if (!result.ok) throw new Error(result.error.message);
}
