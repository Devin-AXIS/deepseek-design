/** Confine plugin-owned files to real project directories without following links. */
import { lstat, mkdir, realpath, writeFile, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { StudioError } from "./errors.ts";

export async function projectDirectory(
  root: string,
  segments: readonly string[],
): Promise<string> {
  let directory = await realpath(root);
  for (const segment of segments) {
    if (!/^[\w.-]+$/.test(segment) || segment === "." || segment === "..")
      throw new StudioError("STUDIO_PATH", "Invalid project path", 403);
    directory = join(directory, segment);
    await mkdir(directory, { recursive: true });
    if ((await lstat(directory)).isSymbolicLink())
      throw new StudioError(
        "STUDIO_PATH",
        "Project directories cannot be symbolic links",
        403,
      );
  }
  return directory;
}

export async function projectFile(root: string, path: string): Promise<string> {
  const file = await realpath(join(root, path));
  const part = relative(await realpath(root), file);
  if (
    part === ".." ||
    part.startsWith(".." + sep) ||
    (await lstat(join(root, path))).isSymbolicLink()
  )
    throw new StudioError(
      "STUDIO_PATH",
      "Project file escapes its directory",
      403,
    );
  return file;
}

export async function writeResource(
  directory: string,
  name: string,
  bytes: Uint8Array,
): Promise<void> {
  const resources = await projectDirectory(directory, ["resources"]);
  await writeFile(join(resources, name), bytes, { flag: "wx" }).catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code !== "EEXIST") throw error;
      return readFile(join(resources, name)).then((existing) => {
        if (!existing.equals(Buffer.from(bytes)))
          throw new StudioError(
            "STUDIO_RESOURCE_CONFLICT",
            "A cached resource was modified; restore or remove it before importing again.",
            409,
          );
      });
    },
  );
}
