/** Read a single portable OpenMotion/HyperFrames archive without extracting arbitrary files. */
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { z } from "zod";

type Entry = { entryName: string; isDirectory: boolean; attr: number;
  header: { size: number; flags: number; method: number }; getData(): Buffer; };
const Zip = createRequire(import.meta.url)("adm-zip") as new (input: Buffer) => { getEntries(): Entry[] };
export const maxMotionDownload = 160 * 1024 * 1024;
const maxExpanded = 400 * 1024 * 1024;
const manifestName = "openmotion-projects.json";
export const checksum = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

function safe(path: string): boolean {
  return path.length <= 512 && !/[\x00-\x1f\\:*?"<>|]/.test(path) &&
    path.split("/").every(p => p && p !== "." && p !== ".." && !/[. ]$/.test(p) &&
      !/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(p));
}
function supported(path: string): boolean {
  if (path === ".hyperframes/studio-manual-edits.json" || path === ".hyperframes/studio-motion.json") return true;
  if (path.split("/").some(p => p.startsWith(".") || /^(?:node_modules|renders|dist|output|__macosx)$/i.test(p))) return false;
  return /\.(?:html?|css|m?js|wasm|json|xml|csv|txt|md|svg|png|jpe?g|webp|gif|avif|ico|mp4|mov|webm|mkv|ogg|opus|wav|mp3|m4a|aac|flac|woff2?|ttf|otf|vtt|srt|glb|gltf|bin)$/i.test(path) ||
    /^(?:license|licence|notice|copying)(?:\.[a-z0-9-]+)?$/i.test(path.split("/").at(-1) ?? "");
}
const manifestSchema = z.object({
  format: z.literal("openmotion.project-archive"), version: z.literal(1),
  projects: z.tuple([z.object({
    root: z.string(), files: z.array(z.object({
      path: z.string(), bytes: z.number().int().min(0).max(maxExpanded), sha256: z.string().regex(/^[a-f0-9]{64}$/),
    })).min(1).max(5000),
  })]),
});

function confineConfig(value: unknown): void {
  if (typeof value === "string" &&
      (/^(?:[\\/]|[a-z]:|file:)|(?:^|[\\/])\.\.(?:[\\/]|$)/i.test(value) || value.includes("\0")))
    throw Error("The project configuration points outside the project.");
  if (value && typeof value === "object") Object.values(value).forEach(confineConfig);
}

export function readMotionArchive(input: Buffer) {
  if (!input.length || input.length > maxMotionDownload) throw Error("The project ZIP is too large.");
  const source = new Zip(input).getEntries();
  if (source.length > 5000) throw Error("The project ZIP contains too many files.");
  const entries = new Map<string, Entry>(), normalized = new Set<string>();
  let expanded = 0;
  for (const entry of source) {
    const name = entry.entryName.replace(/\/$/, ""), mode = (entry.attr >>> 16) & 0o170000;
    if (!safe(name) || ![0, 0o100000, 0o040000].includes(mode)) throw Error("Unsafe ZIP file name or type.");
    if (entry.isDirectory || name.startsWith("__MACOSX/") || name.endsWith(".DS_Store")) continue;
    if (entry.header.flags & 1 || ![0, 8].includes(entry.header.method)) throw Error("Unsupported ZIP file encoding.");
    const key = name.normalize("NFKC").toLowerCase();
    if (normalized.has(key)) throw Error("Duplicate ZIP file name.");
    if (!Number.isSafeInteger(entry.header.size) || entry.header.size < 0) throw Error("Invalid ZIP entry size.");
    normalized.add(key);
    expanded += entry.header.size;
    if (expanded > maxExpanded) throw Error("The expanded project ZIP is too large.");
    entries.set(name, entry);
  }
  const inflate = (entry: Entry) => {
    const bytes = entry.getData();
    if (bytes.length !== entry.header.size) throw Error("Invalid ZIP file size.");
    return bytes;
  };
  const manifests = [...entries].filter(([name]) => name === manifestName ||
    (name.endsWith("/" + manifestName) && name.split("/").length === 2));
  const result = new Map<string, Buffer>();
  if (manifests.length === 1) {
    const [name, file] = manifests[0]!;
    if (file.header.size > 2 * 1024 * 1024) throw Error("Invalid ZIP manifest size.");
    const { projects: [project] } = manifestSchema.parse(JSON.parse(inflate(file).toString("utf8")));
    if (!safe(project.root) || entries.size !== project.files.length + 1) throw Error("The ZIP does not match its manifest.");
    const prefix = name.slice(0, -manifestName.length) + project.root + "/";
    for (const item of project.files) {
      const entry = entries.get(prefix + item.path);
      if (!entry || !safe(item.path) || !supported(item.path) || result.has(item.path) || item.bytes !== entry.header.size)
        throw Error("The ZIP does not match its manifest.");
      const bytes = inflate(entry);
      if (checksum(bytes) !== item.sha256) throw Error("Project file integrity check failed.");
      result.set(item.path, bytes);
    }
  } else {
    if (manifests.length) throw Error("Multiple ZIP manifests.");
    const roots = [...entries.keys()].filter(path => path.endsWith("/index.html") && path.split("/").length === 2);
    const entry = entries.has("index.html") ? "index.html" : roots.length === 1 ? roots[0] : undefined;
    if (!entry) throw Error("The ZIP must contain one portable HyperFrames project.");
    const prefix = entry.slice(0, -"index.html".length);
    for (const [name, file] of entries) {
      const relative = name.slice(prefix.length);
      if (name.startsWith(prefix) && supported(relative)) result.set(relative, inflate(file));
    }
  }
  for (const [path, bytes] of result) {
    const parents = path.split("/");
    while (parents.length > 1) { parents.pop(); if (result.has(parents.join("/"))) throw Error("ZIP file/folder collision."); }
    if (/^(?:hyperframes|meta|project)\.json$/.test(path) || path.startsWith(".hyperframes/")) {
      if (bytes.length > 2 * 1024 * 1024) throw Error("The project configuration is too large.");
      confineConfig(JSON.parse(bytes.toString("utf8")));
    }
  }
  const index = result.get("index.html");
  if (!index || index.length > 4 * 1024 * 1024 || !/\bdata-composition-id\s*=/i.test(index.toString("utf8")))
    throw Error("No editable HyperFrames composition in the ZIP.");
  return result;
}
