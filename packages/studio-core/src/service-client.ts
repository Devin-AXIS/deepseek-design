/** The original client methods target only this plugin's authenticated local services. */
import { createiPolloWorkServerClient } from "./original/app/src/app/lib/ipollowork-server.ts";
import { studioFetch } from "./studio-fetch.ts";
export function createStudioServiceClient(
  kind: "design" | "video",
  scope?: { workspaceId: string; sessionId: string },
) {
  const baseUrl = new URL(
    `/ipollowork-${kind}/api/services`,
    window.location.href,
  ).href;
  const original = createiPolloWorkServerClient({ baseUrl });
  const context = (value?: Record<string, unknown>) => ({ ...value, ...scope });
  return {
    ...original,
    callMedia: (
      action: Parameters<typeof original.callMedia>[0],
      args: Record<string, unknown>,
      input?: Record<string, unknown>,
    ) => original.callMedia(action, args, context(input)),
    callStorage: (
      action: Parameters<typeof original.callStorage>[0],
      args: Record<string, unknown> = {},
      input?: Record<string, unknown>,
    ) => original.callStorage(action, args, context(input)),
    callExtensionAction: (
      payload: Parameters<typeof original.callExtensionAction>[0],
      options?: Parameters<typeof original.callExtensionAction>[1],
    ) =>
      original.callExtensionAction(
        { ...payload, context: context(payload.context) },
        options,
      ),
    deleteWorkspaceFiles: async (
      workspaceId: string,
      files: Array<{ path: string; recursive?: boolean }>,
    ) => {
      const response = await studioFetch(
        kind,
        baseUrl + `/workspace/${encodeURIComponent(workspaceId)}/files/delete`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ files }),
        },
      );
      if (!response.ok)
        throw new Error("Could not remove the temporary media file.");
      const data: unknown = await response.json();
      return result.parse(data);
    },
  };
}
import { z } from "zod";
const result = z.array(
  z.object({ ok: z.boolean(), path: z.string(), code: z.string().optional() }),
);
