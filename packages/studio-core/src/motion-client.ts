/** Authenticated Video API calls from native Studio surfaces. */
import type { MotionCatalog } from "./motion-catalog-types.ts";
import { studioFetch } from "./studio-fetch.ts";

export type MotionReference = { project: string; referencePath: string; motionPath: string };
async function motionRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const reply = await studioFetch("video", "/ipollowork-video/api/" + path, options);
  if (!reply.ok) {
    const error: unknown = await reply.json().catch(() => undefined);
    const message = error && typeof error === "object" ? Reflect.get(error, "message") : undefined;
    throw Error(typeof message === "string" ? message : "Could not complete the Video request.");
  }
  return reply.json();
}
function send(body: unknown, signal?: AbortSignal): RequestInit {
  return { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal };
}
export const motionCatalog = (language: string, refresh: boolean, signal?: AbortSignal) =>
  motionRequest<MotionCatalog>("motion-catalog?" + new URLSearchParams({ language, refresh: refresh ? "1" : "0" }), { signal });
export const openMotion = (body: { workspaceId: string; sessionId: string; id: string; language: string; mode: "project" | "reference" }) =>
  motionRequest<{ project: string; entry: string }>("motion-project", send(body));
export const importMotionReference = (workspaceId: string, sessionId: string, url: string, signal?: AbortSignal) =>
  motionRequest<MotionReference>("motion-reference", send({ workspaceId, sessionId, url }, signal));
