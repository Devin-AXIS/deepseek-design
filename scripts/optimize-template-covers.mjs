/** Recompress PNG streams without changing pixels, metadata or asset paths. */
import { createHash, randomUUID } from "node:crypto";
import { readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { crc32, deflateSync, inflateSync } from "node:zlib";
import sharp from "sharp";

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

function recompress(source) {
  if (!source.subarray(0, 8).equals(signature))
    throw Error("Invalid PNG signature");
  const chunks = [];
  const data = [];
  for (let offset = 8; offset < source.length;) {
    const size = source.readUInt32BE(offset);
    if (offset + size + 12 > source.length) throw Error("Truncated PNG chunk");
    const chunk = source.subarray(offset, offset + size + 12);
    const type = chunk.toString("ascii", 4, 8);
    if (type === "acTL")
      throw Error("Animated covers require a separate optimizer");
    chunks.push({ type, chunk });
    if (type === "IDAT") data.push(chunk.subarray(8, -4));
    offset += chunk.length;
  }
  if (!data.length) throw Error("PNG has no image data");
  const pixels = inflateSync(Buffer.concat(data));
  const compressed = deflateSync(pixels, { level: 9 });
  if (!inflateSync(compressed).equals(pixels))
    throw Error("PNG scanlines changed");
  const idat = Buffer.alloc(compressed.length + 12);
  idat.writeUInt32BE(compressed.length);
  idat.write("IDAT", 4, "ascii");
  compressed.copy(idat, 8);
  idat.writeUInt32BE(crc32(idat.subarray(4, -4)), idat.length - 4);
  let inserted = false;
  return Buffer.concat([
    signature,
    ...chunks.flatMap(({ type, chunk }) => {
      if (type !== "IDAT") return [chunk];
      if (inserted) return [];
      inserted = true;
      return [idat];
    }),
  ]);
}

async function covers(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await covers(path)));
    else if (entry.isFile() && entry.name === "cover.png") files.push(path);
  }
  return files.sort();
}

/** Optimize source template covers after verifying identical decoded RGBA pixels.
 * @param {string} directory Template source directory.
 * @returns {Promise<object>} Sizes and file/pixel hashes for every changed cover.
 */
export async function optimizeTemplateCovers(directory) {
  const changes = [];
  let beforeBytes = 0;
  let afterBytes = 0;
  for (const path of await covers(directory)) {
    const source = await readFile(path);
    const optimized = recompress(source);
    beforeBytes += source.length;
    afterBytes += Math.min(source.length, optimized.length);
    if (optimized.length >= source.length) continue;
    const [before, after] = await Promise.all([
      sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
      sharp(optimized)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true }),
    ]);
    if (
      JSON.stringify(before.info) !== JSON.stringify(after.info) ||
      !before.data.equals(after.data)
    )
      throw Error("Decoded PNG pixels changed: " + path);
    const temporary = join(dirname(path), "." + randomUUID() + ".png.tmp");
    try {
      await writeFile(temporary, optimized);
      await rename(temporary, path);
    } finally {
      await rm(temporary, { force: true });
    }
    changes.push({
      path,
      before: source.length,
      after: optimized.length,
      sourceSha256: digest(source),
      optimizedSha256: digest(optimized),
      pixelSha256: digest(before.data),
      width: before.info.width,
      height: before.info.height,
    });
  }
  return {
    beforeBytes,
    afterBytes,
    savedBytes: beforeBytes - afterBytes,
    changes,
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const directory = fileURLToPath(
    new URL("../packages/studio-core/templates/", import.meta.url),
  );
  console.log(JSON.stringify(await optimizeTemplateCovers(directory), null, 2));
}
