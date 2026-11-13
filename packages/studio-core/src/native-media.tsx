/** Preserve the original Design-to-media edit continuation inside the native plugin mount. */
import { useQueryClient } from "@tanstack/react-query";
import { usePanelTabStore } from "./original/app/src/react-app/domains/session/panel/panel-tab-store.ts";
import { MediaWorkbench } from "./original/app/src/react-app/plugin-ui/media-workbench.tsx";
import {
  replaceDesignMedia,
  relativeDesignMediaPath,
} from "./original/app/src/react-app/domains/session/design/design-media.ts";
import { t } from "./original/app/src/i18n/index.ts";
import type { PluginSurfaceProps } from "./surface.tsx";
import type { createStudioServiceClient } from "./service-client.ts";

/** Use the original workbench, frozen selection, revision check and result application. */
export function NativeMediaContinuation({
  scope,
  client,
}: {
  scope: PluginSurfaceProps;
  client: ReturnType<typeof createStudioServiceClient>;
}) {
  const edit = usePanelTabStore((state) =>
    state.mediaEdits.find(
      (item) =>
        item.workspaceId === scope.workspaceId &&
        item.sessionId === scope.sessionId &&
        item.active &&
        !item.replaced,
    ),
  );
  const query = useQueryClient();
  if (!edit) return null;
  return (
    <div className="absolute inset-0 z-40 bg-background">
      <MediaWorkbench
        source={edit.source}
        client={client}
        workspaceId={scope.workspaceId}
        workspaceRoot={scope.workspaceRoot}
        sessionId={scope.sessionId}
        resultPath={edit.resultPath}
        replaced={edit.replaced}
        returnLabel={t("media.workbench.back_design")}
        onResult={(path) => {
          usePanelTabStore
            .getState()
            .completeMediaEdit(
              scope.workspaceId,
              scope.sessionId,
              edit.source.requestId,
              path,
            );
        }}
        onClose={() =>
          usePanelTabStore.getState().closeMediaEdit(edit.source.requestId)
        }
        onApply={async (save) => {
          if (edit.replaced) throw new Error(t("media.workbench.changed"));
          const file = await client.readWorkspaceFile(
            scope.workspaceId,
            edit.page,
          );
          const content = replaceDesignMedia(
            file.content,
            edit.locator,
            edit.original,
            edit.media,
            relativeDesignMediaPath(edit.page, save.path),
          );
          await client.writeWorkspaceFile(scope.workspaceId, {
            path: edit.page,
            content,
            baseUpdatedAt: file.updatedAt,
          });
          usePanelTabStore
            .getState()
            .closeMediaEdit(edit.source.requestId, true);
          await query.invalidateQueries({
            queryKey: ["design-html", scope.workspaceId, edit.page],
          });
        }}
      />
    </div>
  );
}
