/** Public metadata only: project packages and video come from their attributed source. */
export const motionFacets = ["uses", "styles", "brands", "industries", "models", "colors", "ratio", "duration"] as const;
export type MotionFacet = (typeof motionFacets)[number];
export type MotionCard = {
  id: string; title: string; brand: string; page: string;
  kind: "editable_project" | "reference_video";
  cover?: string; preview?: string;
  facets: Partial<Record<MotionFacet, string[]>>;
};
export type MotionCatalog = { format: 1; fetchedAt: string; cards: MotionCard[]; stale?: boolean };
