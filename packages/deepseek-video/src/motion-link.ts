/** Download an explicitly provided public video URL without using the user's session. */
import { lookup } from "node:dns/promises";
import { request } from "node:https";
import { BlockList, isIP } from "node:net";
import type { IncomingMessage } from "node:http";
import { parse, type DefaultTreeAdapterTypes as Html } from "parse5";
import { maxMotionDownload } from "./motion-archive.ts";

const denied = new BlockList();
for (const [host, bits] of [
  ["0.0.0.0",8],["10.0.0.0",8],["100.64.0.0",10],["127.0.0.0",8],["169.254.0.0",16],
  ["172.16.0.0",12],["192.0.0.0",24],["192.0.2.0",24],["192.88.99.0",24],["192.168.0.0",16],
  ["198.18.0.0",15],["198.51.100.0",24],["203.0.113.0",24],["224.0.0.0",3],
] as const) denied.addSubnet(host, bits);

export function publicMotionUrl(input: string, base?: URL) {
  const url = new URL(input, base);
  if (input.length > 4096 || url.protocol !== "https:" || url.username || url.password || url.port || isIP(url.hostname) ||
      !/^(?:[a-z0-9-]+\.)+[a-z]{2,63}$/i.test(url.hostname) || /\.(?:local|internal|arpa|test|localhost|home|lan|invalid)$/i.test(url.hostname))
    throw Error("Use a public HTTPS video link.");
  url.hash = "";
  return url;
}
export const publicMotionAddress = (ip: string) => isIP(ip) === 4 && !denied.check(ip);

function advertisedVideo(html: string, base: URL): URL | undefined {
  const candidates = ["og:video:secure_url", "og:video:url", "og:video"];
  const data = new Map<string, string>();
  const walk = (node: Html.Node) => {
    if ("tagName" in node && node.tagName === "meta") {
      const get = (name: string) => node.attrs.find(item => item.name === name)?.value;
      const key = get("property") || get("name"), value = get("content");
      if (key && value && candidates.includes(key)) data.set(key, value);
    }
    if ("childNodes" in node) node.childNodes.forEach(walk);
  };
  walk(parse(html));
  for (const key of candidates) {
    const value = data.get(key);
    if (value) {
      try { return publicMotionUrl(value, base); } catch { /* Try the next declared video link. */ }
    }
  }
}

async function download(url: URL, signal: AbortSignal): Promise<IncomingMessage> {
  signal.throwIfAborted();
  const addresses = await lookup(url.hostname, { family: 4, all: true });
  signal.throwIfAborted();
  const first = addresses[0];
  if (!first || addresses.some(item => !publicMotionAddress(item.address))) throw Error("The source does not resolve to a public address.");
  return new Promise((resolve, reject) => {
    const req = request({
      hostname: first.address, servername: url.hostname, port: 443, method: "GET", agent: false,
      path: url.pathname + url.search, signal,
      headers: { host: url.hostname, accept: "video/*,text/html;q=0.8,application/octet-stream;q=0.6" },
    }, resolve);
    req.once("error", reject);
    req.end();
  });
}
async function consume(response: IncomingMessage, limit: number) {
  if (Number(response.headers["content-length"]) > limit) { response.destroy(); throw Error("The reference is too large."); }
  const data: Buffer[] = [];
  let size = 0;
  for await (const value of response) {
    const bytes = Buffer.isBuffer(value) ? value : Buffer.from(value);
    size += bytes.length;
    if (size > limit) { response.destroy(); throw Error("The reference is too large."); }
    data.push(bytes);
  }
  return Buffer.concat(data, size);
}
export function motionVideoExtension(bytes: Buffer) {
  if (bytes.subarray(4, 8).toString("ascii") === "ftyp") return bytes.subarray(8, 12).toString("ascii") === "qt  " ? ".mov" : ".mp4";
  if (bytes.subarray(0, 4).toString("hex") === "1a45dfa3") return bytes.subarray(0, 1024).includes("webm") ? ".webm" : ".mkv";
  throw Error("The reference must be MP4, MOV, WebM or MKV.");
}
export async function fetchMotionLink(input: string, signal: AbortSignal) {
  const source = publicMotionUrl(input);
  let url = source, followedPage = false;
  for (let step = 0; step < 5; step++) {
    const response = await download(url, signal);
    const code = response.statusCode ?? 500;
    if ([301, 302, 303, 307, 308].includes(code) && response.headers.location) {
      response.destroy(); url = publicMotionUrl(response.headers.location, url); continue;
    }
    if (code !== 200) { response.destroy(); throw Error("The video is not publicly downloadable."); }
    const kind = response.headers["content-type"]?.split(";")[0]?.trim().toLowerCase() ?? "";
    if (kind === "text/html" && !followedPage) {
      const video = advertisedVideo((await consume(response, 2 * 1024 * 1024)).toString("utf8"), url);
      if (!video) throw Error("No public downloadable video was advertised.");
      followedPage = true; url = video; continue;
    }
    if (!kind.startsWith("video/") && !["", "application/octet-stream", "binary/octet-stream"].includes(kind)) {
      response.destroy(); throw Error("This link does not point to a downloadable video.");
    }
    const bytes = await consume(response, maxMotionDownload);
    return { bytes, extension: motionVideoExtension(bytes), source: source.origin + source.pathname };
  }
  throw Error("The video link redirected too many times.");
}
