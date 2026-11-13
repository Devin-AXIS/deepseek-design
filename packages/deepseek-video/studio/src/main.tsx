import { createStudioServiceClient } from "../../../studio-core/src/service-client.ts";
const templateClient = createStudioServiceClient("video");
import { useNativeTemplateSave } from "../../../studio-core/src/native-templates.tsx";
import { videoStudioSelectionPrompt } from "../../../studio-core/src/original/video-studio/src/bridge";
import {
  ResourceLibrary,
  insertResourceHtml,
} from "../../../studio-core/src/resource-library.tsx";
import * as React from "react";
import { NativeEditor } from "../../../studio-core/src/native-editor.tsx";
import type { PluginSurfaceProps } from "../../../studio-core/src/surface.tsx";

import { VideoPanel } from "@/react-app/domains/session/video/public";
import { videoProjectDirectory } from "@ipollowork/video-studio";
import { createDeepSeekVideoStudioHost } from "./api";
import "@/app/index.css";

export function Studio(props: PluginSurfaceProps) {
  const templates = useNativeTemplateSave(props, templateClient);
  const [title, setTitle] = React.useState("Video");
  const [viewId] = React.useState(() => crypto.randomUUID());
  const scope = React.useMemo(
    () => ({
      workspaceId: props.workspaceId,
      sessionId: props.sessionId,
      viewId,
    }),
    [props.workspaceId, props.sessionId, viewId],
  );
  const host = React.useMemo(
    () => createDeepSeekVideoStudioHost(scope),
    [scope],
  );
  const projectDirectory = videoProjectDirectory(scope.sessionId);
  return (
    <NativeEditor language={props.language} onOpenSettings={props.openSettings}>
      <main className="h-full min-h-0 overflow-hidden bg-background text-foreground">
        <VideoPanel
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
                `Edit only the existing video at video/${request.videoSessionId}/index.html. Do not create or apply another template.`,
                `Generate narration for the entire video using the current scene content and these project-default settings: ${JSON.stringify(request.settings)}.`,
                "Read STORYBOARD.md. Frame-level voice_id and voice_model override project defaults; keep speaker role separate from voice identity. For auto, select a compatible voice and pass an explicit voice/model override.",
                "Use ipollowork_video_action with extensionId media and action speech_synthesize_workspace_batch. Read its schema using describe before calling. Preserve existing audio until every replacement succeeds, then apply returned audioElementHtml, voice metadata and synchronized timing together.",
                "Preserve visuals, background music and unrelated edits. Verify the saved audio with existing media actions and return the actual source path.",
              ].join("\n"),
            )
          }
          onGenerateVideo={() =>
            props.sendAi(
              `Read video/${scope.sessionId}/STORYBOARD.md and use ipollowork_video_action to complete the approved storyboard, narration, composition, validation and MP4 export. Preserve the original project.`,
            )
          }
          onRegenerateFromStoryboard={async () => {
            await props.sendAi(
              `Regenerate video/${scope.sessionId} from its saved STORYBOARD.md using ipollowork_video_action. Preserve the approved script and selected resources.`,
            );
          }}
          resourceLibrary={
            <ResourceLibrary
              kind="video"
              workspaceId={scope.workspaceId}
              sessionId={scope.sessionId}
              scopeKey={projectDirectory}
              onInsert={async (html) => {
                const path = projectDirectory + "/index.html";
                const file = await host.client.readWorkspaceFile(
                  scope.workspaceId,
                  path,
                );
                await host.client.writeWorkspaceFile(scope.workspaceId, {
                  path,
                  content: insertResourceHtml(file.content, html),
                  baseUpdatedAt: file.updatedAt,
                });
              }}
            />
          }
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
            else props.askAi(prompt);
          }}
        />
        {templates.dialog}
      </main>
    </NativeEditor>
  );
}
