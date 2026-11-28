/** Create independent Studio projects and reference evidence under the active workspace. */
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, realpath, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { StudioError } from "../../studio-core/src/errors.ts";
import { verifiedWritePath } from "../../studio-core/src/http.ts";
import type { MotionCard } from "../../studio-core/src/motion-catalog-types.ts";
import type { VideoDocuments } from "./documents.ts";
import type { VideoRuntimeManager } from "./runtime.ts";
import { checksum, maxMotionDownload, readMotionArchive } from "./motion-archive.ts";
import { fetchMotionLink, motionVideoExtension } from "./motion-link.ts";
import { MotionMarket, motionAsset, motionPage, parseMotionZipLink, readMotionBytes } from "./motion-market.ts";

const fail = (code: string, message: string, status = 422) => new StudioError("VIDEO_MOTION_" + code, message, status);
const workspacePath = (root: string, path: string) => relative(root, path).split(sep).join("/");
const referenceBrief = (path: string, source: string) => [
  "# MOTION.md — Reference brief", "",
  "Status: reference prepared; not yet reconstructed.",
  "Reference file: " + path, "Source: " + source, "",
  "Measure cuts, motion, audio events, typography and colors using ipollowork_video_reference. Record timings, transitions, and editable layers here. Use the user's brand assets, not the reference media as a final layer. Render a new MP4, compare matching frames and verify playback and audio.",
  "",
].join("\n");

async function verifiedDownload(url: URL, signal: AbortSignal) {
  const bytes = await readMotionBytes(url, maxMotionDownload, signal);
  if (checksum(bytes) !== url.pathname.split("/").at(-1)) throw fail("INTEGRITY", "The published download failed integrity verification.");
  return bytes;
}
function starter(card: MotionCard) {
  const ratio = card.facets.ratio?.[0];
  const [w, h] = ratio === "portrait" ? [1080, 1920] : ratio === "square" ? [1080, 1080] : [1920, 1080];
  return Buffer.from('<!doctype html><html><head><meta charset="UTF-8"><title>Motion Reference</title>' +
    '<style>body{margin:0;background:#171a20;color:#fff}#main{display:grid;place-items:center;font:500 48px system-ui;' +
    'width:' + w + 'px;height:' + h + 'px}</style></head>' +
    '<body><div id="main" data-composition-id="main" data-start="0" data-width="' + w + '" data-height="' + h +
    '" data-duration="5"><div id="label" class="clip" data-start="0" data-duration="5" data-track-index="1">Motion reference</div>' +
    '</div></body></html>\n');
}
type Scope = { root: string; sessionId: string };
export class MotionProjects {
  readonly market: MotionMarket;
  private readonly active = new Set<string>();
  constructor(root: string, private readonly manager: VideoRuntimeManager, private readonly docs: VideoDocuments) {
    this.market = new MotionMarket(root);
  }
  list(language: string, force = false) {
    return this.manager.withReference(AbortSignal.timeout(14_000), signal => this.market.list(language, force, signal));
  }
  private async run<T>(input: Scope, operation: (root: string, signal: AbortSignal) => Promise<T>) {
    const root = await realpath(input.root), key = root + ":" + input.sessionId;
    if (this.active.size >= 2 || this.active.has(key)) throw fail("BUSY", "Wait for the current motion import to finish.", 409);
    this.active.add(key);
    try { return await this.manager.withReference(AbortSignal.timeout(150_000), signal => operation(root, signal)); }
    finally { this.active.delete(key); }
  }
  create(input: Scope & { id: string; mode: "project" | "reference"; language: string }) {
    return this.run(input, async (root, signal) => {
      const card = (await this.list(input.language)).cards.find(row => row.id === input.id);
      if (!card) throw fail("NOT_FOUND", "The motion item is no longer published. Refresh the catalog.", 404);
      const expected = "video/" + input.sessionId;
      if (this.docs.project(root, input.sessionId) !== expected ||
          await stat(join(root, expected, "index.html")).then(() => true, err => {
            if (err?.code === "ENOENT") return false;
            throw err;
          })) throw fail("NEW_SESSION", "Import into a new conversation to preserve the current video.", 409);
      let files: Map<string, Buffer>;
      try {
        if (input.mode === "project") {
          if (card.kind !== "editable_project") throw fail("REFERENCE_ONLY", "This entry is a reference, not an editable project.");
          const detail = (await readMotionBytes(motionPage(card.page), 12 * 1024 * 1024, signal)).toString("utf8");
          const zip = parseMotionZipLink(detail);
          if (!zip) throw fail("MISSING_ZIP", "The publisher does not link an editable ZIP for this item.", 404);
          files = readMotionArchive(await verifiedDownload(zip, signal));
        } else {
          const video = motionAsset(card.preview);
          if (!video) throw fail("MISSING_VIDEO", "The publisher has no downloadable video preview.", 404);
          const bytes = await verifiedDownload(video, signal);
          const reference = "assets/reference" + motionVideoExtension(bytes);
          files = new Map([["index.html", starter(card)], [reference, bytes], ["assets/MOTION.md", Buffer.from(referenceBrief(reference, card.page))]]);
        }
      } catch (error) {
        if (error instanceof StudioError) throw error;
        throw fail("DOWNLOAD", "Unable to read the published project or preview. Open the source or upload a local reference.");
      }
      const parent = dirname(await verifiedWritePath(root, "video/.motion-parent", "video", "Video"));
      const scratch = await mkdtemp(join(parent, ".motion-import-"));
      const destination = join(parent, "motion-" + randomUUID());
      let moved = false, bound = false;
      try {
        for (const [file, bytes] of files) {
          signal.throwIfAborted();
          const target = join(scratch, file);
          await mkdir(dirname(target), { recursive: true });
          await writeFile(target, bytes, { flag: "wx", mode: 0o600 });
        }
        const result = await this.manager.validate({ workspaceRoot: root, sessionId: input.sessionId, projectDirectory: workspacePath(root, scratch), signal });
        if (!result.ok) throw fail("COMPATIBILITY", "This composition does not pass the current Video renderer's validation; existing projects are unchanged.");
        signal.throwIfAborted();
        await rename(scratch, destination);
        moved = true;
        const project = workspacePath(root, destination);
        await this.docs.bind(root, input.sessionId, project);
        bound = true;
        return { project, entry: project + "/index.html" };
      } finally {
        await rm(scratch, { recursive: true, force: true });
        if (moved && !bound) await rm(destination, { recursive: true, force: true });
      }
    });
  }
  reference(input: Scope & { url: string }) {
    return this.run(input, async (root, signal) => {
      let media: Awaited<ReturnType<typeof fetchMotionLink>>;
      try { media = await fetchMotionLink(input.url, signal); }
      catch { throw fail("PUBLIC_LINK", "Could not read a public video from this link. Upload an authorized local video instead."); }
      const project = this.docs.project(root, input.sessionId);
      const prefix = project + "/assets/references/" + randomUUID();
      const referencePath = prefix + "/source" + media.extension, motionPath = prefix + "/MOTION.md";
      const absolute = await verifiedWritePath(root, referencePath, project, "Video");
      const note = await verifiedWritePath(root, motionPath, project, "Video");
      try {
        signal.throwIfAborted();
        await writeFile(absolute, media.bytes, { flag: "wx", mode: 0o600 });
        signal.throwIfAborted();
        await writeFile(note, referenceBrief(referencePath, media.source), { flag: "wx", mode: 0o600 });
        return { project, referencePath, motionPath };
      } catch (problem) {
        await rm(absolute, { force: true });
        await rm(note, { force: true });
        throw problem;
      }
    });
  }
}
