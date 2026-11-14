/** Explicit publishing uses verified workspace files and the optional host service. */
import { createReadStream } from "node:fs";
import { realpath, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { Readable } from "node:stream";
import { z } from "zod";
import { safeAssetPath, inside } from "./http.ts";
import { StudioError } from "./errors.ts";
import type { ServiceBinding } from "./service-center.ts";

export async function publishWorkspaceFiles(
  binding: ServiceBinding,
  root: string,
  workspaceId: string,
  input: unknown,
  maxBytes: number,
) {
  if (!binding.publish)
    throw new StudioError(
      "STUDIO_PUBLISH_UNAVAILABLE",
      "The publishing service is unavailable.",
      503,
    );
  const value = z
    .object({
      entryPath: z.string(),
      sourcePaths: z.array(z.string()).min(1).max(100),
    })
    .strict()
    .parse(input);
  const entry = safeAssetPath(value.entryPath);
  const paths = [...new Set(value.sourcePaths.map(safeAssetPath))];
  if (!paths.includes(entry))
    throw new StudioError(
      "STUDIO_PUBLISH_ENTRY",
      "Select the entry page before publishing.",
    );
  const directory = await realpath(root);
  let total = 0;
  const files = [];
  for (const path of paths) {
    if (
      path.split("/").some((part) => part.startsWith(".")) ||
      !/\.(?:avif|css|gif|html?|ico|jpe?g|js|json|map|mjs|png|svg|webp|woff2?|ttf|otf|pdf|mp4|webm)$/i.test(
        path,
      )
    )
      throw new StudioError(
        "STUDIO_PUBLISH_FILE",
        "Only output documents and their assets can be published.",
      );
    const absolute = await realpath(resolve(directory, path));
    if (!inside(directory, absolute))
      throw new StudioError(
        "STUDIO_PUBLISH_PATH",
        "Published files must stay inside the workspace.",
        403,
      );
    const info = await stat(absolute);
    if (!info.isFile())
      throw new StudioError("STUDIO_PUBLISH_FILE", "Select a file to publish.");
    total += info.size;
    if (total > maxBytes)
      throw new StudioError(
        "STUDIO_PUBLISH_SIZE",
        "The selected publication exceeds the upload limit.",
        413,
      );
    files.push({
      path,
      bytes: info.size,
      open: () =>
        Readable.toWeb(
          createReadStream(absolute),
        ) as ReadableStream<Uint8Array>,
    });
  }
  const published = await binding.publish({ workspaceId, entry, files });
  return {
    ok: true,
    extensionId: "storage",
    action: "publish_workspace_files",
    result: {
      url: published.url,
      downloadUrl: published.url,
      files: files.length,
    },
  };
}
