/** Host-provided overlay container; absent providers retain the original document-body behavior. */
import { createContext, useContext } from "react";
export const StudioPortalContainer = createContext<HTMLElement | null>(null);
/** Resolve the containing host's overlay root for all shared UI primitives. */
export function useStudioPortal() { return useContext(StudioPortalContainer) ?? undefined; }
