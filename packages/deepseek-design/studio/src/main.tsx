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
import {
  createDeepSeekDesignStudioClient,
  bindDesignDocument,
} from "./deepseek-client";
import "@/app/index.css";

export function Studio(props: PluginSurfaceProps) {
  const [bound, setBound] = React.useState<string>();
  const [bindError, setBindError] = React.useState("");
  React.useEffect(() => {
    if (!props.filePath || props.active === false) return;
    let active = true;
    void bindDesignDocument(props.workspaceId, props.sessionId, props.filePath)
      .then(() => {
        if (active) {
          setBound(props.filePath);
          setBindError("");
        }
      })
      .catch((error: unknown) => {
        if (active)
          setBindError(
            error instanceof Error
              ? error.message
              : t("design_templates.load_failed"),
          );
      });
    return () => {
      active = false;
    };
  }, [props.workspaceId, props.sessionId, props.filePath, props.active]);
  const relativeFile = props.filePath?.startsWith(props.workspaceRoot + "/")
    ? props.filePath.slice(props.workspaceRoot.length + 1)
    : props.filePath;
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
      ...createDeepSeekDesignStudioClient(props.sessionId),
      callStorage: services.callStorage,
      ...(props.watchFile
        ? {
            watchWorkspaceFile: (
              _workspaceId: string,
              path: string,
              changed: (state: "ready" | "changed" | "unavailable") => void,
            ) => props.watchFile!(path, changed),
          }
        : {}),
    }),
    [services, props.sessionId, props.watchFile],
  );
  const templates = useNativeTemplateSave(props, services);
  return (
    <NativeEditor language={props.language} onOpenSettings={props.openSettings}>
      {props.filePath && bound !== props.filePath ? (
        <p role={bindError ? "alert" : "status"} className="p-4 text-sm">
          {bindError || t("common.loading")}
        </p>
      ) : (
        <main className="relative h-full min-h-0 overflow-hidden bg-background text-foreground">
          <DesignPanel
            onSaveAsTemplate={
              props.filePath &&
              !relativeFile?.startsWith(`design/${props.sessionId}/`)
                ? undefined
                : templates.open
            }
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
              props.askAi({
                text: designStudioAskAiPrompt(
                  designStudioAskAiRequest(context),
                ),
                summary: {
                  label: context.target.label,
                  title: context.filePath,
                  detail: context.target.locator,
                  body: "",
                },
              })
            }
          />
          <NativeMediaContinuation scope={props} client={services} />
          {templates.dialog}
        </main>
      )}
    </NativeEditor>
  );
}
