import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
import { checksum, readMotionArchive } from "../packages/deepseek-video/src/motion-archive.ts";
import { motionVideoExtension, publicMotionAddress, publicMotionUrl } from "../packages/deepseek-video/src/motion-link.ts";
import { fetchMotionCatalog, motionAsset, parseMotionMarket, parseMotionZipLink, readMotionBytes } from "../packages/deepseek-video/src/motion-market.ts";

const cdn = "https://r.open-design.ai/files/" + "a".repeat(64);
const card = (id: string, kind = "editable_project") =>
  '<article data-template-card data-template-id="' + id + '" data-resource-kind="' + kind + '" ' +
  'data-facets=\'{"uses":["Product launch"],"ratio":["landscape"],"colors":["blue","blue"]}\'>' +
  '<a class="tm-card-link" href="/zh/templates/' + id + '/"><div class="tm-card-art">' +
  '<img src="' + cdn + '"><video data-src="' + cdn + '"></video></div></a>' +
  '<h3>Sample studio video</h3><small class="tm-card-brand">Studio</small></article>';

test("complete market records retain public identities, media, filters and independent availability", async () => {
  const [first, second] = parseMotionMarket(card("sample-project") + card("sample-reference", "reference_video"));
  assert.equal(first?.title, "Sample studio video");
  assert.equal(first?.brand, "Studio");
  assert.equal(first?.page, "https://open-design.ai/zh/templates/sample-project/");
  assert.equal(first?.preview, cdn);
  assert.deepEqual(first?.facets.colors, ["blue"]);
  assert.equal(second?.kind, "reference_video");
  assert.throws(() => parseMotionMarket(card("one-a") + card("one-a")), /duplicate/);
  assert.throws(() => parseMotionMarket(card("one-a").replace("/zh/templates/one-a/", "https://outside.test/")), /page/);
  await assert.rejects(fetchMotionCatalog("zh", AbortSignal.timeout(1000), async () => new Response(card("one-a"))), /incomplete/);
});
test("download uses a bounded stream and the publisher's project link", async () => {
  assert.equal(motionAsset(cdn)?.href, cdn);
  assert.equal(motionAsset(cdn + "?version=1"), undefined);
  assert.equal(parseMotionZipLink('<a href="' + cdn + '">下载 OpenMotion 工程 ↗</a>')?.href, cdn);
  assert.equal(parseMotionZipLink('<a href="' + cdn + '">Download MOTION.md</a>'), undefined);
  assert.equal((await readMotionBytes(new URL(cdn), 2, AbortSignal.timeout(1000), async () => new Response("ok"))).toString(), "ok");
  await assert.rejects(readMotionBytes(new URL(cdn), 2, AbortSignal.timeout(1000), async () => new Response("too large")), /too large/);
});
type Writer = { addFile(name: string, data: Buffer): void; toBuffer(): Buffer };
const Zip = createRequire(import.meta.url)("adm-zip") as new () => Writer;
const index = Buffer.from('<div data-composition-id="main" data-width="960" data-height="540"></div>');
function zip(files: Record<string, Buffer>) {
  const archive = new Zip();
  for (const [path, bytes] of Object.entries(files)) archive.addFile(path, bytes);
  return archive.toBuffer();
}
test("portable ZIP and versioned OpenMotion archive import native files with their integrity checks", () => {
  assert.deepEqual(readMotionArchive(zip({ "film/index.html": index, "film/LICENSE": Buffer.from("credit") })).get("index.html"), index);
  const root = "projects/film";
  const manifest = (sha256: string) => Buffer.from(JSON.stringify({
    format: "openmotion.project-archive", version: 1,
    projects: [{ root, files: [{ path: "index.html", bytes: index.length, sha256 }] }],
  }));
  const bundle = { "openmotion-projects.json": manifest(checksum(index)), [root + "/index.html"]: index };
  assert.deepEqual(readMotionArchive(zip(bundle)).get("index.html"), index);
  assert.throws(() => readMotionArchive(zip({ ...bundle, "openmotion-projects.json": manifest("0".repeat(64)) })), /integrity/);
  assert.throws(() => readMotionArchive(zip({ "index.html": index, "hyperframes.json": Buffer.from('{"assetsDir":"../external"}') })), /outside/);
  assert.throws(() => readMotionArchive(zip({ "index.html": Buffer.from("<p>Not a composition</p>") })), /composition/);
});
test("references only use public HTTPS and supported media containers", () => {
  assert.equal(publicMotionUrl("https://example.com/video.mp4?token=sample#t=1").href, "https://example.com/video.mp4?token=sample");
  for (const path of ["http://example.com", "https://localhost", "https://127.0.0.1", "https://name.internal", "https://example.com:8080", "https://u:p@example.com"])
    assert.throws(() => publicMotionUrl(path), /public HTTPS/);
  assert.equal(publicMotionAddress("10.0.0.2"), false);
  assert.equal(publicMotionAddress("169.254.169.254"), false);
  assert.equal(publicMotionAddress("93.184.215.14"), true);
  assert.equal(motionVideoExtension(Buffer.from("....ftypisom")), ".mp4");
  assert.throws(() => motionVideoExtension(Buffer.from("<html>")), /must be/);
});
