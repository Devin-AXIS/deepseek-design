/** Freeze public metadata for offline browsing; do not package third-party media or code. */
import { mkdir, writeFile, rename } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { fetchMotionCatalog } from "../packages/deepseek-video/src/motion-market.ts";

const [zh, en] = await Promise.all([fetchMotionCatalog("zh", AbortSignal.timeout(30_000)), fetchMotionCatalog("en", AbortSignal.timeout(30_000))]);
const ids = new Set(zh.cards.map(card => card.id));
if (en.cards.length !== ids.size || en.cards.some(card => !ids.has(card.id)))
  throw Error("Published catalogs do not contain the same template IDs across languages.");
const root = resolve(".runtime/motion-catalog");
await mkdir(root, { recursive: true });
for (const [language, catalog] of [["zh", zh], ["en", en]] as const) {
  const dst = resolve(root, "motion-catalog-" + language + ".json");
  const temp = dst + "." + randomUUID() + ".tmp";
  await writeFile(temp, JSON.stringify(catalog) + "\n", { flag: "wx" });
  await rename(temp, dst);
}
console.log(JSON.stringify({
  catalog: zh.cards.length,
  downloadable: zh.cards.filter(card => card.kind === "editable_project").length,
  references: zh.cards.filter(card => card.kind === "reference_video").length,
}));
