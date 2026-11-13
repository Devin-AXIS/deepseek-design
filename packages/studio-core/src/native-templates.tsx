/** Original save/export dialog and template validation, using the native plugin's service. */
import { useState } from "react";
import {
  TemplateSaveDialog,
  type TemplateSaveInput,
  type TemplateSaveMode,
} from "./original/app/src/react-app/domains/session/templates/template-save-dialog.tsx";
import type {
  TemplateManifestV1,
  TemplateValidationReport,
} from "./original/types/src/templates.ts";
import { toast } from "./original/app/src/components/ui/sonner.tsx";
import { t } from "./original/app/src/i18n/index.ts";
import type { PluginSurfaceProps } from "./surface.tsx";
import type { createStudioServiceClient } from "./service-client.ts";

/** Keep the original validation-before-save flow and .ipwp project package. */
export function useNativeTemplateSave(
  scope: PluginSurfaceProps,
  client: ReturnType<typeof createStudioServiceClient>,
) {
  const [open, setOpen] = useState(false),
    [template, setTemplate] = useState<TemplateManifestV1 | null>(null),
    [report, setReport] = useState<TemplateValidationReport | null>(null),
    [validating, setValidating] = useState(false),
    [savingMode, setSavingMode] = useState<TemplateSaveMode | null>(null);
  const validate = async () => {
    setValidating(true);
    try {
      const snapshot = await client.getTemplateSession(
        scope.workspaceId,
        scope.sessionId,
      );
      setTemplate(snapshot.manifest ?? null);
      const result = await client.validateTemplateFromSession(
        scope.workspaceId,
        scope.sessionId,
      );
      setReport(result);
      return result;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("template_authoring.needs_attention"),
      );
      return null;
    } finally {
      setValidating(false);
    }
  };
  const save = async (input: TemplateSaveInput) => {
    if (!template) return;
    setSavingMode(input.mode);
    try {
      const next = await validate();
      if (!next?.ready) return;
      const request = {
        sessionId: scope.sessionId,
        category: template.category,
        title: input.title,
        description: input.description,
      };
      if (input.mode === "export") {
        const file = await client.exportTemplateFromSession(
          scope.workspaceId,
          request,
        );
        if (!file.filename)
          throw new Error(t("template_market.export_filename_missing"));
        const url = URL.createObjectURL(
          new Blob([file.data], {
            type: file.contentType ?? "application/zip",
          }),
        );
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = file.filename;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else
        await client.saveTemplateFromSession(
          scope.workspaceId,
          request,
          "personal",
        );
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : t("template_authoring.needs_attention"),
      );
    } finally {
      setSavingMode(null);
    }
  };
  return {
    open: () => {
      setOpen(true);
      void validate();
    },
    dialog: (
      <TemplateSaveDialog
        open={open}
        template={template}
        report={report}
        validating={validating}
        savingMode={savingMode}
        onOpenChange={setOpen}
        onValidate={() => {
          void validate();
        }}
        onRepair={() => {
          setOpen(false);
          void scope.sendAi(
            `Fix the current template without changing its category or surface. Resolve these validation issues, update manifest.json and validate again: ${JSON.stringify(report?.issues ?? [])}`,
          );
        }}
        onSave={(input) => {
          void save(input);
        }}
      />
    ),
  };
}
