/** Bailian HTTP speech request selection and conversion to the editor's MP3 format. */
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { serviceEnvironment, serviceSignal } from "./service-runtime.ts";

export const DEFAULT_HTTP_SPEECH_MODEL = "qwen3-tts-flash";
const execute = promisify(execFile);

/** Match the protocol to the explicitly selected model; do not send CosyVoice fields to Qwen. */
export function bailianSpeechRequest(
  baseUrl: string,
  model: string,
  input: Record<string, unknown>,
) {
  const qwen = model.startsWith("qwen") && model.includes("tts");
  return {
    url:
      baseUrl.replace(/\/+$/, "") +
      (qwen
        ? "/api/v1/services/aigc/multimodal-generation/generation"
        : "/api/v1/services/audio/tts/SpeechSynthesizer"),
    body: qwen
      ? {
          model,
          input: {
            text: input.text,
            voice: input.voice || "Cherry",
            language_type: "Auto",
          },
        }
      : { model, input, parameters: { word_timestamp_enabled: true } },
    streaming: !qwen,
  };
}

/** Qwen downloads are WAV; retain the existing editor's MP3 storage and timing code. */
export async function speechAudioMp3(
  bytes: Buffer,
  signal?: AbortSignal,
): Promise<Buffer> {
  if (bytes.toString("ascii", 0, 4) !== "RIFF") return bytes;
  const directory = await mkdtemp(join(tmpdir(), "ipollo-speech-"));
  try {
    const source = join(directory, "speech.wav"),
      target = join(directory, "speech.mp3");
    await writeFile(source, bytes);
    const lifetime = serviceSignal();
    await execute(
      serviceEnvironment().HYPERFRAMES_FFMPEG_PATH?.trim() || "ffmpeg",
      [
        "-nostdin",
        "-v",
        "error",
        "-i",
        source,
        "-codec:a",
        "libmp3lame",
        "-q:a",
        "2",
        target,
      ],
      {
        signal:
          signal && lifetime
            ? AbortSignal.any([signal, lifetime])
            : (signal ?? lifetime),
        timeout: 60000,
        maxBuffer: 1024 * 1024,
        windowsHide: true,
      },
    );
    return await readFile(target);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
