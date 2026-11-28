/** Reference preparation does not replace the existing editable composition. */
import { useEffect, useRef, useState } from "react";
import { FileVideo, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { StudioServiceClient } from "@/app/lib/studio-client";
import type { VideoStudioClient } from "@ipollowork/video-studio";
import type { PluginSurfaceProps } from "../../../studio-core/src/surface.tsx";
import { importMotionReference, type MotionReference } from "../../../studio-core/src/motion-client.ts";

export function MotionReferenceControl({ project, surface, client }: { project: string; surface: PluginSurfaceProps; client: VideoStudioClient }) {
  const zh = surface.language.startsWith("zh");
  const tr = (cn: string, en: string) => zh ? cn : en;
  const { workspaceId, sessionId } = surface;
  const [open, setOpen] = useState(false), [link, setLink] = useState("");
  const [reference, setReference] = useState<MotionReference>(), [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  const active = useRef<AbortController | null>(null), fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    let mounted = true;
    const note = project + "/assets/MOTION.md";
    void client.readWorkspaceFile(workspaceId, note).then(file => {
      const media = /^Reference file: (assets\/reference\.(?:mp4|mov|webm|mkv))$/m.exec(file.content)?.[1];
      if (media && mounted) setReference(current => current ?? { project, motionPath: note, referencePath: project + "/" + media });
    }).catch(() => undefined);
    return () => { mounted = false; };
  }, [client, project, workspaceId]);

  async function run(operation: (signal: AbortSignal) => Promise<MotionReference>) {
    if (active.current) return;
    const control = new AbortController();
    active.current = control;
    setProblem("");
    setBusy(true);
    try {
      const result = await operation(control.signal);
      if (!control.signal.aborted) setReference(result);
    } catch (error) {
      if (!control.signal.aborted) setProblem(error instanceof Error ? error.message : tr("未能导入参考片", "Could not import the reference."));
    } finally {
      if (active.current === control) active.current = null;
      if (!control.signal.aborted) setBusy(false);
    }
  }

  async function upload(file: File, signal: AbortSignal) {
    const extension = /\.(mp4|mov|webm|mkv)$/i.exec(file.name)?.[0]?.toLowerCase();
    if (!extension || file.size === 0 || file.size > 160 * 1024 * 1024)
      throw Error(tr("请选择 160 MB 以内的 MP4、MOV、WebM 或 MKV", "Choose an MP4, MOV, WebM or MKV under 160 MiB."));
    const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (String.fromCharCode(...bytes.slice(4, 8)) !== "ftyp" && bytes.slice(0, 4).join(",") !== "26,69,223,163")
      throw Error(tr("该文件不是受支持的视频", "This file is not a supported video."));
    const media = client as VideoStudioClient & Pick<StudioServiceClient, "uploadWorkspaceMedia" | "deleteWorkspaceFiles">;
    if (typeof media.uploadWorkspaceMedia !== "function") throw Error(tr("本机媒体服务未就绪", "The Video media service is not available."));
    const path = project + "/assets/references/" + crypto.randomUUID();
    const referencePath = path + "/source" + extension, motionPath = path + "/MOTION.md";
    signal.throwIfAborted();
    await media.uploadWorkspaceMedia(workspaceId, referencePath, file);
    try {
      signal.throwIfAborted();
      await client.writeWorkspaceFile(workspaceId, { path: motionPath, createOnly: true,
        content: "# MOTION.md — Reference brief\n\nStatus: prepared, not yet reconstructed.\nReference file: " + referencePath +
          "\n\nMeasure shots, motion, color and sound, then rebuild with the user's own editable assets. Keep the source video out of the final composition.\n",
      });
    } catch (error) {
      if (typeof media.deleteWorkspaceFiles === "function") await media.deleteWorkspaceFiles(workspaceId, [{ path: referencePath }]).catch(() => undefined);
      throw error;
    }
    return { project, referencePath, motionPath };
  }

  function quote() {
    if (!reference) return;
    const request = tr("参考这段视频的节奏、镜头和转场，使用我的素材制作可编辑视频。", "Use the timing, shots and transitions from this video to create an editable video with my assets.");
    surface.askAi({
      text: [
        request, "Project: " + project + "/index.html", "Reference: " + reference.referencePath, "Brief: " + reference.motionPath,
        "Read ipollowork-video and the brief. Measure cuts, motion, typography, color and audio with ipollowork_video_reference. Rebuild with separate editable layers and without including the source movie in the composition. Validate the HTML, export an MP4 and compare matching times before claiming success."
      ].join("\n"),
      summary: { label: tr("视频参考", "Video reference"), title: "MOTION.md", detail: reference.motionPath, body: request },
    });
    setOpen(false);
  }

  return <>
    <Button size="sm" variant="outline" data-testid="video-motion-reference" onClick={() => setOpen(true)}>
      <Link2 className="size-3.5" aria-hidden="true" />{reference ? tr("继续参考制片", "Continue from reference") : tr("参考复刻", "Rebuild from reference")}
    </Button>
    <Dialog open={open} onOpenChange={value => { if (!busy || value) setOpen(value); }}>
      <DialogContent className="max-h-[85dvh] max-w-[calc(100%-24px)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{tr("用参考片制作", "Create from a reference")}</DialogTitle>
          <DialogDescription>{tr("导入可下载的公开链接或本地参考片。此操作不会覆盖现有工程。", "Import a public downloadable link or a local video. This does not replace the existing project.")}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-wrap gap-2" onSubmit={event => {
          event.preventDefault(); const url = link.trim();
          if (url) void run(signal => importMotionReference(workspaceId, sessionId, url, signal));
        }}>
          <input type="url" aria-label={tr("公开视频链接", "Public video URL")} placeholder="https://…" value={link} disabled={busy}
            maxLength={4096} onChange={event => setLink(event.target.value)}
            className="h-8 min-w-0 flex-1 basis-40 rounded-full border border-border bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring" />
          <Button type="submit" size="sm" disabled={busy || !link.trim()}>{tr("导入链接", "Import link")}</Button>
        </form>
        <input type="file" hidden accept=".mp4,.mov,.webm,.mkv" ref={fileInput} onChange={event => {
          const file = event.currentTarget.files?.[0];
          event.currentTarget.value = "";
          if (file) void run(signal => upload(file, signal));
        }} />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" disabled={busy} onClick={() => fileInput.current?.click()}>
            <FileVideo className="size-4" aria-hidden="true" />{tr("上传参考片", "Upload reference")}
          </Button>
          {reference && <Button size="sm" disabled={busy} onClick={quote}>{tr("带到对话中制作", "Use in conversation")}</Button>}
        </div>
        {busy && <p role="status" className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />{tr("正在准备参考片", "Preparing reference")}
        </p>}
        {problem && <p role="alert" className="text-sm">{problem}</p>}
        {reference && <p className="break-all text-xs text-muted-foreground" data-testid="video-reference-path">{reference.referencePath}</p>}
      </DialogContent>
    </Dialog>
  </>;
}
