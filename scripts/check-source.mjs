/** Validate the recorded source and explicit native adaptations, including new files. */
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const source = JSON.parse(await readFile("docs/source-map.json", "utf8"));
const expected = new Map(
  source.files.map((entry) => [entry.path, entry.sha256]),
);
for (const entry of source.adaptations) expected.set(entry.path, entry.sha256);
for (const [path, hash] of expected) {
  const actual = createHash("sha256")
    .update(await readFile(path))
    .digest("hex");
  if (actual !== hash)
    throw Error("Source changed without an extraction record: " + path);
}
const root = "packages/studio-core/src/original";
for (const path of await readdir(root, {
  recursive: true,
  withFileTypes: true,
})) {
  if (!path.isFile()) continue;
  const file = `${path.parentPath}/${path.name}`.replaceAll("\\", "/");
  if (!expected.has(file)) throw Error("Unrecorded extracted source: " + file);
}
console.log(
  `Verified ${source.files.length} retained source files; ${source.adaptations.length} explicit native adaptations`,
);
