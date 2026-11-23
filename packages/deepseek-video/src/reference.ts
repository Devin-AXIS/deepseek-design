import { copyFile, mkdir, mkdtemp, realpath, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, extname, join, relative, sep } from "node:path";
import type { Context } from "@deepseek-ai/cordis";
import { defineTool } from "@deepseek-ai/dsh-tools";
import { z } from "zod";
import { StudioError } from "../../studio-core/src/errors";
import { inside, verifiedExistingPath } from "../../studio-core/src/http";
import { videoWorkspaceOf, type VideoDocuments } from "./documents";
import { referenceOperations } from "./reference-operations";
import type { VideoRuntimeManager } from "./runtime";

const timeSchema = z.number().min(0).max(86_400);
const inputSchema = z.strictObject({
  operation: z.enum(referenceOperations),
  referencePath: z.string().min(1).max(4096),
  comparisonPath: z.string().min(1).max(4096).optional(),
  start: timeSchema.optional(),
  end: timeSchema.optional(),
  roi: z
    .tuple([
      z.int().min(0),
      z.int().min(0),
      z.int().positive(),
      z.int().positive(),
    ])
    .optional(),
  times: z.array(timeSchema).min(1).max(6).optional(),
});
const mediaExtensions = new Set([".mp4", ".mov", ".webm", ".mkv"]);
const framesSchema = z.object({
  frames: z
    .array(z.object({ t: z.number(), frame: z.int(), path: z.string() }))
    .min(1)
    .max(6),
});
const windowOperations = new Set(["cuts", "events", "curve"]);
type ReferenceInput = z.infer<typeof inputSchema>;
type MediaBinaries = { ffmpegPath: string; ffprobePath: string };
type Report = Record<string, z.infer<ReturnType<typeof z.json>>>;

function parseInput(args: unknown) {
  const parsed = inputSchema.safeParse(args);
  if (!parsed.success)
    invalid(
      "Provide an operation, project-relative video path and valid measurement parameters.",
    );
  const input = parsed.data;
  if (
    input.comparisonPath &&
    input.operation !== "curve" &&
    input.operation !== "frames"
  )
    invalid("Use comparisonPath with curve or frames.");
  if ((input.operation === "curve" || input.operation === "ink") && !input.roi)
    invalid("Choose a region [x, y, width, height] around the object or text.");
  if (input.operation === "frames" && !input.times)
    invalid("Provide one to six timestamps for frame inspection.");
  if (windowOperations.has(input.operation)) {
    const start = input.start ?? 0;
    if (
      input.end !== undefined &&
      (input.end <= start || input.end - start > 45)
    )
      invalid("Choose a positive measurement window of at most 45 seconds.");
  }
  return input;
}

function invalid(message: string): never {
  throw new StudioError("INVALID_ARGS", message, 400);
}

async function verifyVideo(
  root: string,
  directory: string,
  requested: string,
  prefix = directory,
) {
  if (!mediaExtensions.has(extname(requested).toLowerCase()))
    invalid("Use an MP4, MOV, WebM or MKV already in this video project.");
  const file = await verifiedExistingPath(root, requested, prefix, "iVideo");
  const allowed = await realpath(join(root, prefix));
  if (!inside(join(root, directory), allowed) || !inside(allowed, file))
    invalid("The video must belong to the current project.");
  const info = await stat(file);
  if (!info.isFile() || info.size === 0 || info.size > 512 * 1024 * 1024)
    invalid("Use a nonempty video of at most 512 MiB.");
  return file;
}

function measureArgs(
  input: ReferenceInput,
  file: string,
  scratch: string,
  comparison?: string,
) {
  const args = [input.operation, file, "--json"];
  if (
    input.roi &&
    ["events", "curve", "ink", "frames"].includes(input.operation)
  )
    args.push("--roi", input.roi.join(","));
  if (windowOperations.has(input.operation)) {
    const start = input.start ?? 0;
    args.push(
      "--start",
      String(start),
      "--end",
      String(input.end ?? start + 45),
    );
  }
  switch (input.operation) {
    case "events":
      args.push("--map", "--out", scratch);
      break;
    case "curve":
      if (comparison) args.push("--compare", comparison);
      break;
    case "look":
      args.push("--at", String(input.start ?? 0), "--grid", "8x6");
      break;
    case "ink":
      args.push("--at", String(input.start ?? 0));
      break;
    case "frames":
      args.push(
        "--at",
        input.times!.join(","),
        "--width",
        "640",
        "--out",
        scratch,
      );
      break;
  }
  return args;
}

function readReport(stdout: string): Report {
  try {
    return z.record(z.string(), z.json()).parse(JSON.parse(stdout));
  } catch {
    throw new StudioError(
      "VIDEO_REFERENCE_REPORT",
      "HyperFrames returned an invalid measurement. Try a shorter time window.",
      502,
    );
  }
}

async function collectFrames(
  report: Report,
  source: string,
  destination: string,
  prefix: string,
) {
  const frames = [];
  for (const frame of framesSchema.parse(report).frames) {
    const file = await realpath(frame.path);
    if (!inside(source, file) || extname(file) !== ".png")
      throw new StudioError(
        "VIDEO_REFERENCE_REPORT",
        "Invalid frame evidence from HyperFrames.",
        502,
      );
    const name = `${prefix}-${basename(file)}`;
    await copyFile(file, join(destination, name));
    frames.push({ time: frame.t, number: frame.frame, name });
  }
  return frames;
}

export function referenceTool(
  ctx: Context,
  documents: VideoDocuments,
  manager: VideoRuntimeManager,
  binaries: MediaBinaries,
) {
  return defineTool({
    name: "ipollowork_video_reference",
    description:
      "Measure the current video's local reference by cuts, visual and sound events, motion curve, RGB grid, text size or exact frames. Compare the measured move or frames against a render in the same project.",
    parameters: {
      operation: {
        type: "string",
        enum: referenceOperations,
        required: true,
        description: "probe, cuts, events, curve, look, ink or frames.",
      },
      referencePath: {
        type: "string",
        required: true,
        description:
          "Workspace-relative video under the current project's assets.",
      },
      comparisonPath: {
        type: "string",
        description:
          "Same-project video to compare at the same times with curve or frames.",
      },
      start: {
        type: "number",
        description:
          "Window start for cuts, events or curve. Timestamp for look or ink. Defaults to 0.",
      },
      end: {
        type: "number",
        description:
          "End of the measurement window for cuts, events or curve, at most 45 seconds after start.",
      },
      roi: {
        type: "array",
        items: { type: "number" },
        description:
          "Source-pixel region [x, y, width, height]. Required for curve and ink.",
      },
      times: {
        type: "array",
        items: { type: "number" },
        description: "One to six seconds to capture for frames.",
      },
    },
    output: {
      schema: { type: "object", additionalProperties: true },
      render: (_args, value) => [
        { type: "text", text: JSON.stringify(value, null, 2) },
      ],
    },
    timeoutMs: 120_000,
    async execute(args, exec) {
      const input = parseInput(args);
      const session = exec.agent?.session;
      const workspace = session && videoWorkspaceOf(ctx, session);
      if (!session || !workspace)
        throw new StudioError(
          "STUDIO_CONTEXT",
          "Open a workspace conversation before measuring a video.",
        );
      if (
        input.operation === "frames" &&
        ctx.sandboxPolicy.resolve({ session }).mode === "read-only"
      )
        throw new StudioError(
          "STUDIO_READ_ONLY",
          "Saving frame evidence requires workspace write access.",
          403,
        );
      return manager.withReference(exec.signal, async (signal) => {
        const root = await realpath(workspace.path);
        const project = documents.project(workspace.path, session.id);
        const reference = await verifyVideo(
          root,
          project,
          input.referencePath,
          `${project}/assets`,
        );
        const comparison =
          input.comparisonPath &&
          (await verifyVideo(root, project, input.comparisonPath));
        signal.throwIfAborted();
        const scratch = await mkdtemp(
          join(await realpath(tmpdir()), "ipw-video-reference-"),
        );
        try {
          const run = async (
            file: string,
            outputDirectory: string,
            other?: string,
          ) => {
            const result = await manager.measureReference(
              measureArgs(input, file, outputDirectory, other),
              scratch,
              signal,
              binaries,
            );
            signal.throwIfAborted();
            if (result.exitCode !== 0)
              throw new StudioError(
                "VIDEO_REFERENCE_FAILED",
                (result.stderr || result.stdout).trim().slice(-2000) ||
                  "HyperFrames could not measure this video.",
                422,
              );
            const report = readReport(result.stdout);
            if (report.ok !== true)
              throw new StudioError(
                "VIDEO_REFERENCE_FAILED",
                "HyperFrames did not complete this measurement.",
                422,
              );
            return report;
          };
          const report = await run(reference, scratch, comparison || undefined);
          const identity = {
            operation: input.operation,
            referencePath: input.referencePath,
            ...(input.comparisonPath && { comparisonPath: input.comparisonPath }),
          };
          if (input.operation !== "frames") {
            const summary = JSON.parse(
              JSON.stringify(report, (_key, value: unknown) => {
                if (value === reference) return input.referencePath;
                if (comparison && value === comparison)
                  return input.comparisonPath;
                if (
                  typeof value === "string" &&
                  value.startsWith(`${scratch}${sep}`)
                )
                  return undefined;
                return value;
              }),
            ) as Report;
            return { ...identity, report: summary };
          }
          const comparisonDirectory = join(scratch, "comparison");
          const comparisonReport = comparison
            ? await run(comparison, comparisonDirectory)
            : undefined;
          signal.throwIfAborted();
          const renderDirectory = join(root, project, "renders");
          await mkdir(renderDirectory, { recursive: true });
          const renderRoot = await realpath(renderDirectory);
          if (renderRoot !== renderDirectory)
            invalid(
              "Frame evidence requires this project's own renders directory.",
            );
          const destination = await mkdtemp(join(renderRoot, "reference-"));
          try {
            const referenceFrames = await collectFrames(
              report,
              scratch,
              destination,
              "reference",
            );
            const comparisonFrames = comparisonReport
              ? await collectFrames(
                  comparisonReport,
                  comparisonDirectory,
                  destination,
                  "comparison",
                )
              : [];
            signal.throwIfAborted();
            const path = (name: string) =>
              relative(root, join(destination, name)).split(sep).join("/");
            return {
              ...identity,
              referenceFrames: referenceFrames.map(({ name, ...frame }) => ({
                ...frame,
                path: path(name),
              })),
              comparisonFrames: comparisonFrames.map(({ name, ...frame }) => ({
                ...frame,
                path: path(name),
              })),
            };
          } catch (error) {
            await rm(destination, { force: true, recursive: true });
            throw error;
          }
        } finally {
          await rm(scratch, { force: true, recursive: true });
        }
      });
    },
  });
}
