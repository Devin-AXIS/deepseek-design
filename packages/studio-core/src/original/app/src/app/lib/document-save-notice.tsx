/** Keep failed theme drafts visible and let users retry or explicitly reload them. */
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { t } from "@/i18n";
import type { QueuedDocumentSave } from "./queued-document-save";

export function DocumentSaveNotice({
  save,
  onReload,
}: {
  save: QueuedDocumentSave;
  onReload?: () => void;
}) {
  const state = useSyncExternalStore(
    save.subscribe,
    save.getSnapshot,
    save.getSnapshot,
  );
  if (!state.error) return null;
  const retry = async () => {
    try {
      await save.flush();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("design.save.failed"),
      );
    }
  };
  const reload = async () => {
    if (!window.confirm(t("design.save.discard_draft"))) return;
    try {
      await save.reload();
      onReload?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("design.save.failed"),
      );
    }
  };
  return (
    <div
      role="alert"
      className="relative z-50 flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-background p-2 text-xs text-destructive"
    >
      <span className="min-w-0 flex-1">{state.error.message}</span>
      <Button
        size="sm"
        variant="outline"
        disabled={state.saving}
        onClick={() => void retry()}
      >
        {t("common.retry")}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={state.saving}
        onClick={() => void reload()}
      >
        {t("design.save.reload")}
      </Button>
    </div>
  );
}
