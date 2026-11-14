/** API resources add content to original HTML projects; they do not introduce a new document format. */
import { z } from "zod";
export const resourceThemeSchema = z.object({
  background: z.string(),
  surface: z.string(),
  text: z.string(),
  muted: z.string(),
  accent: z.string(),
  font: z.string(),
  style: z.string().max(100),
});
export type ResourceTheme = z.infer<typeof resourceThemeSchema>;
export interface Resource {
  id: string;
  kind: "component" | "image" | "video" | "audio";
  title: string;
  file: string;
  sourceId: string;
  version: string;
  mime: string;
  sha256: string;
  variables: Record<string, string | number | boolean>;
  width?: number;
  height?: number;
}
export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  kind: "component" | "asset";
}
/** Components are browsed by purpose; media format is resolved by the asset API. */
export type ResourceCategory = "data" | "business" | "library";
export const defaultTheme: ResourceTheme = {
  background: "#ffffff",
  surface: "#ffffff",
  text: "#171717",
  muted: "#737373",
  accent: "#5b50e6",
  font: "Arial, sans-serif",
  style: "keynote",
};
/** Encode content for an HTML attribute without replacement-string interpolation. */
export function escapeHtml(text: string): string {
  return text.replace(
    /[&<>"']/g,
    (x) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        x
      ]!,
  );
}
