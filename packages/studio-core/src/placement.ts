/** Native plugin placements are saved by DSH in the owning plugin's profile configuration. */
import z from "@deepseek-ai/schemastery";

/** Shared settings for plugins that expose a content surface. */
export interface SurfacePlacement {
  rightSidebar: boolean;
  leftNavigation: boolean;
}

/** Both entrypoints are available initially; neither creates a conversation tab. */
export const placementFields = {
  rightSidebar: z.boolean().default(true).volatile(),
  leftNavigation: z.boolean().default(true).volatile(),
};
