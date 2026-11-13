/** Share the Host's version selection between native editor mounts in this document. */
import type { DesignStudioHistory } from "@ipollowork/design-studio";
export const DESIGN_HISTORY_CHANGED = "deepseek:design-history-changed";
export type DesignHistoryChange = {
  workspaceId: string;
  sessionId: string;
  history: DesignStudioHistory;
};

/** An earlier request must never undo a newer acknowledged selection. */
export function acceptDesignHistory(
  current: DesignStudioHistory | undefined,
  next: DesignStudioHistory,
) {
  return !current || next.selectionRevision >= current.selectionRevision
    ? next
    : current;
}

export function publishDesignHistory(change: DesignHistoryChange) {
  window.dispatchEvent(
    new CustomEvent<DesignHistoryChange>(DESIGN_HISTORY_CHANGED, {
      detail: change,
    }),
  );
}
