import { createRequire as __hf_createRequire } from "node:module";
import { fileURLToPath as __hf_fileURLToPath } from "node:url";
import { dirname as __hf_dirname } from "node:path";
var require = __hf_createRequire(import.meta.url);
var __filename = __hf_fileURLToPath(import.meta.url);
var __dirname = __hf_dirname(__filename);

// src/whisper/wav.ts
import { readFileSync } from "fs";
function findWavChunk(buf, want) {
  if (buf.length < 12) return null;
  let pos = 12;
  while (pos + 8 <= buf.length) {
    const id = buf.toString("ascii", pos, pos + 4);
    const size = buf.readUInt32LE(pos + 4);
    if (id === want) return { offset: pos + 8, size: Math.min(size, buf.length - pos - 8) };
    pos += 8 + size;
    if (size % 2 !== 0) pos++;
  }
  return null;
}
var PCM = 1;
var EXTENSIBLE = 65534;
function readWav(path) {
  const buf = readFileSync(path);
  const riff = buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WAVE";
  const fmt = riff ? findWavChunk(buf, "fmt ") : null;
  const data = fmt && findWavChunk(buf, "data");
  const format = fmt && buf.readUInt16LE(fmt.offset);
  if (!fmt || !data || format !== PCM && format !== EXTENSIBLE || buf.readUInt16LE(fmt.offset + 2) !== 1 || buf.readUInt16LE(fmt.offset + 14) !== 16) {
    throw new Error(`${path} is not a 16-bit mono PCM WAV`);
  }
  const samples = new Float32Array(data.size >> 1);
  for (let i = 0; i < samples.length; i++)
    samples[i] = buf.readInt16LE(data.offset + 2 * i) / 32768;
  return { samples, sampleRate: buf.readUInt32LE(fmt.offset + 4) };
}

export {
  findWavChunk,
  readWav
};
