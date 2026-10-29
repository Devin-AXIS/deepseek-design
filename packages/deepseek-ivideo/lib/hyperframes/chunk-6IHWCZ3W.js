import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/whisper/progress.ts
var DESKTOP_MAX_LINE_BYTES = 16e3;
function emitWords(onEvent, model, words, through) {
  const empty = Buffer.byteLength(JSON.stringify({ type: "words", model, words: [], through })) + 1;
  let chunk = [];
  let bytes = empty;
  for (const word of words) {
    const size = Buffer.byteLength(JSON.stringify(word)) + 1;
    if (chunk.length > 0 && bytes + size > DESKTOP_MAX_LINE_BYTES) {
      onEvent({ type: "words", model, words: chunk, through: chunk.at(-1).end });
      chunk = [];
      bytes = empty;
    }
    chunk.push(word);
    bytes += size;
  }
  onEvent({ type: "words", model, words: chunk, through });
}
function createProgressWriter(stream) {
  let blocked = false;
  const pending = [];
  const write = (event) => {
    if (blocked) {
      const previous = pending.at(-1);
      if (event.type === "progress" && event.phase === "download" && previous?.type === "progress" && previous.phase === "download" && previous.model === event.model) {
        pending[pending.length - 1] = event;
      } else {
        pending.push(event);
      }
      return;
    }
    blocked = !stream.write(`${JSON.stringify(event)}
`);
    if (blocked) {
      stream.once("drain", () => {
        blocked = false;
        while (!blocked && pending.length > 0) write(pending.shift());
      });
    }
  };
  return write;
}

export {
  emitWords,
  createProgressWriter
};
