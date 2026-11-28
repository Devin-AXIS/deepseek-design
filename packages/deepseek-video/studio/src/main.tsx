import { createStudioServiceClient } from "../../../studio-core/src/service-client.ts";
const templateClient = createStudioServiceClient("video");
import { useNativeTemplateSave } from "../../../studio-core/src/native-templates.tsx";
import { videoStudioSelectionPrompt } from "../../../studio-core/src/original/video-studio/src/bridge";
import * as React from "react";
import { NativeEditor } from "../../../studio-core/src/native-editor.tsx";
import type { PluginSurfaceProps } from "../../../studio-core/src/surface.tsx";

import { VideoPanel } from "@/react-app/domains/session/video/public";
import { createDeepSeekVideoStudioHost, resolveVideoProject } from "./api";
import { Button } from "@/components/ui/button";
import { MotionReferenceControl } from "./motion-reference.tsx";
import "@/app/index.css";

export function Studio(props: PluginSurfaceProps) {
  const templates = useNativeTemplateSave(props, templateClient);
  const [title, setTitle] = React.useState("Video");
  const [viewId] = React.useState(() => crypto.randomUUID());
  const [attempt, setAttempt] = React.useState(0);
  const key = JSON.stringify([props.workspaceId, props.sessionId, props.filePath]);
  const [binding, setBinding] = React.useState<{ key: string; project?: string; failed?: boolean }>();
  const projectDirectory = binding?.key === key ? binding.project : undefined;
  const failed = binding?.key === key && binding.failed;
  const zh = props.language.startsWith("zh");
  React.useEffect(() => {
    if (props.active === false) return;
    let mounted = true;
    void resolveVideoProject(
      { workspaceId: props.workspaceId, sessionId: props.sessionId }, props.filePath,
    ).then(
      value => { if (mounted) setBinding({ key, project: value.project }); },
      () => { if (mounted) setBinding({ key, failed: true }); },
    );
    return () => { mounted = false; };
  }, [props.workspaceId, props.sessionId, props.filePath, props.active, key, attempt]);
  const scope = React.useMemo(
    () => ({
      workspaceId: props.workspaceId,
      sessionId: props.sessionId,
      viewId,
      projectDirectory,
    }),
    [props.workspaceId, props.sessionId, viewId, projectDirectory],
  );
  const host = React.useMemo(
    () => createDeepSeekVideoStudioHost(scope),
    [scope],
  );
  return (
    <NativeEditor language={props.language} onOpenSettings={props.openSettings}>
      <main className="flex h-full min-h-0 flex-col overflow-hidden bg-background text-foreground">
        <header data-testid="video-workspace-toolbar" className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border px-3 py-1.5">
          <span className="mr-auto text-sm font-medium">{zh ? "视频工作台" : "Video workspace"}</span>
          {props.openTemplates && <Button size="sm" variant="ghost" onClick={props.openTemplates}>{zh ? "视频模板库" : "Video templates"}</Button>}
          {projectDirectory && <MotionReferenceControl key={key} project={projectDirectory} surface={props} client={host.client} />}
        </header>
        {failed && <div role="alert" className="flex flex-wrap items-center gap-2 px-3 py-2 text-sm">
          <span>{zh ? "未能打开工程，现有文件未改动" : "Could not open the project. Existing files were not changed."}</span>
          <Button size="sm" variant="outline" onClick={() => { setBinding(undefined); setAttempt(n => n + 1); }}>{zh ? "重试" : "Retry"}</Button>
        </div>}
        {!projectDirectory && !failed && <div className="m-3 min-h-0 flex-1 rounded-lg bg-muted" aria-busy="true" />}
        {projectDirectory && <div className="min-h-0 flex-1">
        <VideoPanel
          key={projectDirectory}
          projectDirectory={projectDirectory}
          onSaveAsTemplate={templates.open}
          title={title}
          onVideoTitleChange={setTitle}
          sessionId={scope.sessionId}
          workspaceRoot={props.workspaceRoot}
          client={host.client}
          workspaceId={scope.workspaceId}
          runtime={host.runtime}
          expanded
          onRequestVoiceover={(request) =>
            props.sendAi(
              [
                `Edit only the existing video at ${projectDirectory}/index.html. Do not create or apply another template.`,
                `Generate narration for the entire video using the current scene content and these project-default settings: ${JSON.stringify(request.settings)}.`,
                "Read STORYBOARD.md. Frame-level voice_id and voice_model override project defaults; keep speaker role separate from voice identity. For auto, select a compatible voice and pass an explicit voice/model override.",
                "Use ipollowork_video_action with extensionId media and action speech_synthesize_workspace_batch. Read its schema using describe before calling. Preserve existing audio until every replacement succeeds, then apply returned audioElementHtml, voice metadata and synchronized timing together.",
                "Preserve visuals, background music and unrelated edits. Verify the saved audio with existing media actions and return the actual source path.",
              ].join("\n"),
            )
          }
          onGenerateVideo={() =>
            props.sendAi(
              `Read ${projectDirectory}/STORYBOARD.md and use ipollowork_video_action to complete the approved storyboard, narration, composition, validation and MP4 export. Preserve the original project.`,
            )
          }
          onRegenerateFromStoryboard={async () => {
            await props.sendAi(
              `Regenerate ${projectDirectory} from its saved STORYBOARD.md using ipollowork_video_action. Preserve the approved script and selected resources.`,
            );
          }}
          features={{
            voice: true,
            designSystem: true,
            templates: {
              title: "Video 模板",
              description:
                "选择一个可编辑的视频起点，当前项目会安全替换并保留失败回滚。",
            },
          }}

          onAskAi={async (context, instruction) => {
            const prompt = videoStudioSelectionPrompt(projectDirectory, {
              file: context.filePath.startsWith(projectDirectory + "/")
                ? context.filePath.slice(projectDirectory.length + 1)
                : "index.html",
              locator: context.target.locator,
              tag: context.target.tag,
              text: context.target.text,
              src: context.target.src,
              alt: context.target.alt,
              styles: context.target.styles,
            });
            if (instruction)
              await props.sendAi(
                prompt +
                  "\n" +
                  instruction.replaceAll(
                    "ipollowork_extension_call",
                    "ipollowork_video_action",
                  ),
              );
            else
              props.askAi({
                text: prompt,
                summary: {
                  label: context.target.label,
                  title: context.filePath,
                  detail: context.target.locator,
                  body: "",
                },
              });
          }}
        />
        </div>}
        {templates.dialog}
      </main>
    </NativeEditor>
  );
}
