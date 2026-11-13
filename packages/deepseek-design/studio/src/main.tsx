import { useNativeTemplateSave } from "../../../studio-core/src/native-templates.tsx";
import { NativeMediaContinuation } from "../../../studio-core/src/native-media.tsx";
import { createStudioServiceClient } from "../../../studio-core/src/service-client.ts";
import {
  ResourceLibrary,
  insertResourceHtml,
} from "../../../studio-core/src/resource-library.tsx";
import * as React from "react";
import { NativeEditor } from "../../../studio-core/src/native-editor.tsx";
import type { PluginSurfaceProps } from "../../../studio-core/src/surface.tsx";

import { t } from "@/i18n";

import { DesignPanel } from "@/react-app/domains/session/design/public";
import {
  designStudioAskAiRequest,
  designStudioAskAiPrompt,
} from "../../../studio-core/src/original/design-studio/src/bridge";
import { deepSeekDesignStudioClient } from "./deepseek-client";
import "@/app/index.css";

export function Studio(props: PluginSurfaceProps) {
  const scope = props;
  const services = React.useMemo(
    () =>
      createStudioServiceClient("design", {
        workspaceId: props.workspaceId,
        sessionId: props.sessionId,
      }),
    [props.workspaceId, props.sessionId],
  );
  const client = React.useMemo(
    () => ({
      ...deepSeekDesignStudioClient,
      callStorage: services.callStorage,
    }),
    [services],
  );
  const templates = useNativeTemplateSave(props, services);
  return (
    <NativeEditor language={props.language} onOpenSettings={props.openSettings}>
      <main className="relative h-full min-h-0 overflow-hidden bg-background text-foreground">
        <DesignPanel
          onSaveAsTemplate={templates.open}
          sessionId={scope.sessionId}
          client={client}
          workspaceId={scope.workspaceId}
          mediaClient={services}
          workspaceRoot={props.workspaceRoot}
          expanded
          resourceLibrary={({
            filePath,
            source,
            slideIndex,
            tokens,
            insert,
          }) => (
            <ResourceLibrary
              kind="design"
              workspaceId={scope.workspaceId}
              sessionId={scope.sessionId}
              scopeKey={filePath + ":" + slideIndex}
              theme={{
                background: tokens["--ipw-color-bg"],
                text: tokens["--ipw-color-text"],
                accent: tokens["--ipw-color-primary"],
                font: tokens["--ipw-font-body"],
              }}
              onInsert={(html) =>
                insert(insertResourceHtml(source, html, slideIndex))
              }
            />
          )}
          features={{
            publish: true,
            templates: {
              title: t("design_templates.design_title"),
              description: t("design_templates.design_description"),
            },
          }}

          onAskAi={(context) =>
            props.askAi(
              designStudioAskAiPrompt(designStudioAskAiRequest(context)),
            )
          }
        />
        <NativeMediaContinuation scope={props} client={services} />
        {templates.dialog}
      </main>
    </NativeEditor>
  );
}
