/** Preserve the captured original editor implementation outside explicitly listed adapters. */
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const source = JSON.parse(await readFile("docs/source-map.json", "utf8"));
const adaptations = new Map(
  source.adaptations.map((entry) => [entry.path, entry.sha256]),
);
for (const entry of source.files) {
  const actual = createHash("sha256")
    .update(await readFile(entry.path))
    .digest("hex");
  if (actual !== (adaptations.get(entry.path) ?? entry.sha256))
    throw Error(
      "Original source changed without an extraction record: " + entry.path,
    );
}
console.log(
  `Verified ${source.files.length} captured source files; ${adaptations.size} explicit editor/build adapters`,
);
