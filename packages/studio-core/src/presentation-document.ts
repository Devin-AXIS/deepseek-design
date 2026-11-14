/** Identify slide documents from HTML structure without executing document scripts. */
import { parse, type DefaultTreeAdapterMap } from "parse5";

/** Explicit slides or sibling pages in a presentation stage use the shared deck controls. */
export function isPresentationDocument(source: string): boolean {
  const document = parse(source);
  let explicit = false;
  const groups = new Map<DefaultTreeAdapterMap["parentNode"], number>();
  const visit = (
    node: DefaultTreeAdapterMap["node"],
    inStage = false,
    inSlide = false,
  ) => {
    if (!("tagName" in node)) {
      if ("childNodes" in node)
        node.childNodes.forEach((child) => visit(child, inStage, inSlide));
      return;
    }
    const attributes = new Map(
      node.attrs.map((attribute) => [attribute.name, attribute.value]),
    );
    const classes = (attributes.get("class") ?? "").split(/\s+/);
    const marked =
      attributes.has("data-ipw-slide") ||
      attributes.get("data-ipw-template-kind") === "slides";
    explicit ||= marked;
    const stage =
      inStage ||
      /^(?:stage|deck|slides|presentation)$/.test(attributes.get("id") ?? "") ||
      classes.some((value) => /^(?:stage|deck|presentation)$/.test(value));
    const slide =
      classes.some((value) => value === "slide" || value === "slide-frame") ||
      attributes.has("data-ipw-slide");
    if (
      slide &&
      !inSlide &&
      node.parentNode &&
      (stage ||
        ("tagName" in node.parentNode && node.parentNode.tagName === "body"))
    )
      groups.set(node.parentNode, (groups.get(node.parentNode) ?? 0) + 1);
    node.childNodes.forEach((child) => visit(child, stage, inSlide || slide));
  };
  visit(document);
  return explicit || [...groups.values()].some((count) => count > 1);
}
