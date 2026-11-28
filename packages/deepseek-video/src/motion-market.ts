/** Use the public market's complete catalog, not the differently versioned SDK sample feed. */
import { parse, type DefaultTreeAdapterTypes as Html } from "parse5";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { motionFacets, type MotionCard, type MotionCatalog } from "../../studio-core/src/motion-catalog-types.ts";

export const marketOrigin = "https://open-design.ai";
const assetOrigin = "https://r.open-design.ai";
const assetPath = /^\/files\/[a-f0-9]{64}$/;
const marketPath = /^\/(?:zh\/)?templates\/[a-z0-9][a-z0-9-]{0,199}\/$/;
const idPattern = /^[a-z0-9][a-z0-9-]{1,100}$/;

function elements(node: Html.Node): Html.Element[] {
  const result: Html.Element[] = [];
  const walk = (value: Html.Node): void => {
    if ("tagName" in value) result.push(value);
    if ("childNodes" in value) value.childNodes.forEach(walk);
  };
  walk(node);
  return result;
}
const attr = (node: Html.Element, name: string) => node.attrs.find(item => item.name === name)?.value;
const cls = (node: Html.Element, name: string) => attr(node, "class")?.split(/\s+/).includes(name);
function textOf(node: Html.Node): string {
  if ("value" in node) return node.value;
  return "childNodes" in node ? node.childNodes.map(textOf).join("") : "";
}

export function motionPage(value: string) {
  const url = new URL(value, marketOrigin);
  if (url.origin !== marketOrigin || url.username || url.password ||
      url.search || url.hash || !marketPath.test(url.pathname))
    throw Error("The template page is invalid.");
  return url;
}

export function motionAsset(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.origin === assetOrigin && !url.username && !url.password &&
        !url.search && !url.hash && assetPath.test(url.pathname)) return url;
  } catch { /* Invalid links are not transported or fetched. */ }
  return undefined;
}

export function parseMotionMarket(html: string): MotionCard[] {
  const seen = new Set<string>();
  const rows: MotionCard[] = [];
  for (const item of elements(parse(html))) {
    if (item.tagName !== "article" || attr(item, "data-template-card") === undefined) continue;
    const id = attr(item, "data-template-id"), kind = attr(item, "data-resource-kind");
    if (!id || !idPattern.test(id) || seen.has(id) ||
        (kind !== "editable_project" && kind !== "reference_video")) throw Error("Invalid or duplicate motion entry.");
    const children = elements(item);
    const cover = children.find(node => cls(node, "tm-card-art"));
    const art = cover ? elements(cover) : [];
    const image = art.find(node => node.tagName === "img");
    const video = art.find(node => node.tagName === "video");
    const heading = children.find(node => node.tagName === "h3");
    const link = children.find(node => node.tagName === "a" && cls(node, "tm-card-link"));
    const brand = children.find(node => cls(node, "tm-card-brand"));
    const title = (heading && textOf(heading).trim()) || attr(item, "data-name");
    if (!link || !title || title.length > 500) throw Error("An entry lacks a title or source.");
    const data: unknown = JSON.parse(attr(item, "data-facets") ?? "{}");
    if (!data || typeof data !== "object" || Array.isArray(data)) throw Error("Invalid motion filters.");
    const facets: MotionCard["facets"] = {};
    for (const key of motionFacets) {
      const values: unknown = Reflect.get(data, key);
      if (Array.isArray(values)) facets[key] = [...new Set(values.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0 && value.length <= 160,
      ))].slice(0, 30);
    }
    seen.add(id);
    rows.push({
      id, kind, title, brand: (brand && textOf(brand).trim().slice(0, 140)) ?? "",
      page: motionPage(attr(link, "href") ?? "").href, facets,
      cover: motionAsset(image && attr(image, "src"))?.href,
      preview: motionAsset(video && (attr(video, "data-src") || attr(video, "src")))?.href,
    });
  }
  if (!rows.length || rows.length > 2500) throw Error("The public motion catalog is unavailable.");
  return rows;
}

export function parseMotionZipLink(html: string) {
  for (const link of elements(parse(html))) {
    if (link.tagName !== "a" ||
        !/^(?:下载\s*OpenMotion\s*工程|Download\s+(?:the\s+)?OpenMotion\s+project)(?:\s*[↗↑])?$/i.test(textOf(link).replace(/\s+/g, " ").trim())) continue;
    const url = motionAsset(attr(link, "href"));
    if (url) return url;
  }
  return undefined;
}

export async function readMotionBytes(url: URL, limit: number, signal: AbortSignal, fetcher: typeof fetch = fetch) {
  const result = await fetcher(url, { redirect: "error", signal });
  if (!result.ok || !result.body) throw Error("The published motion resource could not be read.");
  if (Number(result.headers.get("content-length")) > limit) {
    await result.body.cancel();
    throw Error("The published motion resource is too large.");
  }
  const reader = result.body.getReader();
  const chunks: Buffer[] = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > limit) throw Error("The published motion resource is too large.");
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks, length);
  } catch (problem) {
    await reader.cancel(problem).catch(() => undefined);
    throw problem;
  } finally { reader.releaseLock(); }
}

export async function fetchMotionCatalog(locale: "zh" | "en", signal: AbortSignal, fetcher: typeof fetch = fetch): Promise<MotionCatalog> {
  const url = new URL(locale === "zh" ? "/zh/templates/" : "/templates/", marketOrigin);
  const cards = parseMotionMarket((await readMotionBytes(url, 12 * 1024 * 1024, signal, fetcher)).toString("utf8"));
  if (cards.length < 200) throw Error("The public motion catalog is incomplete.");
  return { format: 1, fetchedAt: new Date().toISOString(), cards };
}

export class MotionMarket {
  private readonly entries = new Map<string, { expires: number; value: MotionCatalog }>();
  private readonly requests = new Map<string, Promise<MotionCatalog>>();
  constructor(private readonly libraryRoot: string) {}

  list(language: string, force: boolean, signal: AbortSignal) {
    const locale = language.startsWith("zh") ? "zh" : "en";
    const previous = this.entries.get(locale);
    if (!force && previous && previous.expires > Date.now()) return Promise.resolve(previous.value);
    const pending = this.requests.get(locale);
    if (pending) return pending;
    const updated = (async () => {
      let fallback = previous?.value;
      if (!fallback) {
        try {
          const file = join(this.libraryRoot, "motion-catalog-" + locale + ".json");
          const cached = JSON.parse(await readFile(file, "utf8")) as MotionCatalog;
          if (cached.format === 1 && Array.isArray(cached.cards) && cached.cards.length >= 200) fallback = cached;
        } catch { /* First use can read the upstream source without a packaged snapshot. */ }
      }
      try {
        const current = await fetchMotionCatalog(locale, signal);
        if (fallback && current.cards.length < fallback.cards.length * .85)
          throw Error("The public source returned an incomplete catalog.");
        this.entries.set(locale, { value: current, expires: Date.now() + 600_000 });
        return current;
      } catch {
        if (!fallback) throw Error("The public motion catalog is unavailable. Built-in and personal templates still work.");
        const value: MotionCatalog = { ...fallback, stale: true };
        this.entries.set(locale, { value, expires: Date.now() + 30_000 });
        return value;
      }
    })().finally(() => this.requests.delete(locale));
    this.requests.set(locale, updated);
    return updated;
  }
}
