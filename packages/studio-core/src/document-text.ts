/** Read and change document text without rewriting layout, attributes or styles. */
import { parse, type DefaultTreeAdapterMap } from "parse5";

type Node = DefaultTreeAdapterMap["node"];
type Text = { start: number; end: number; value: string };
export type DocumentTextBlock = {
  id: string;
  tag: string;
  text: string;
  parts: Text[];
};
const blocks = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "td",
  "th",
  "blockquote",
  "pre",
]);
const excluded = new Set([
  "script",
  "style",
  "template",
  "noscript",
  "nav",
  "button",
  "select",
  "textarea",
  "footer",
  "aside",
  "figcaption",
]);

/** Explicit model-authored document markers take precedence over structural article detection. */
export function isTextDocument(source: string): boolean {
  const doc = parse(source);
  let article = false,
    marked = false;
  const visit = (node: Node) => {
    if ("tagName" in node) {
      const a = new Map(node.attrs.map((a) => [a.name, a.value]));
      marked ||=
        a.get("data-ipw-document-type") === "document" ||
        (node.tagName === "meta" &&
          a.get("name") === "ipw-document-type" &&
          a.get("content") === "document");
      article ||= node.tagName === "article" || a.get("role") === "document";
    }
    if ("childNodes" in node) node.childNodes.forEach(visit);
  };
  visit(doc);
  return marked || article;
}

/** Semantic auxiliary copy is preserved in HTML but omitted from the writing view. */
function isAuxiliary(node: Node): boolean {
  if (!("tagName" in node)) return false;
  const attributes = new Map(
    node.attrs.map((attribute) => [attribute.name, attribute.value]),
  );
  if (attributes.get("data-ipw-text") === "content") return false;
  return (
    excluded.has(node.tagName) ||
    attributes.get("data-ipw-text") === "decoration" ||
    attributes.has("hidden") ||
    attributes.get("aria-hidden") === "true" ||
    /^(navigation|banner|contentinfo|complementary)$/.test(
      attributes.get("role") ?? "",
    ) ||
    (attributes.get("class") ?? "")
      .split(/\s+/)
      .some((name) =>
        /^(?:eyebrow|kicker|badge|label|tag|caption|byline|metadata|page-number|decoration|decorative)(?:$|[-_])/.test(
          name,
        ),
      )
  );
}

/** Ordered prose blocks with source offsets; scripts and interactive controls are omitted. */
export function documentTextBlocks(source: string): DocumentTextBlock[] {
  const doc = parse(source, { sourceCodeLocationInfo: true });
  const result: DocumentTextBlock[] = [];
  const collect = (node: Node, parts: Text[]) => {
    if (isAuxiliary(node)) return;
    if (
      node.nodeName === "#text" &&
      "value" in node &&
      node.sourceCodeLocation
    ) {
      parts.push({
        start: node.sourceCodeLocation.startOffset,
        end: node.sourceCodeLocation.endOffset,
        value: node.value,
      });
    } else if ("childNodes" in node)
      node.childNodes.forEach((n) => collect(n, parts));
  };
  const visit = (node: Node) => {
    if ("tagName" in node) {
      if (isAuxiliary(node)) return;
      if (blocks.has(node.tagName)) {
        if (
          "childNodes" in node &&
          node.childNodes.some((n) => "tagName" in n && blocks.has(n.tagName))
        ) {
          node.childNodes.forEach(visit);
          return;
        }
        const parts: Text[] = [];
        collect(node, parts);
        if (
          !parts.length &&
          node.sourceCodeLocation &&
          "endTag" in node.sourceCodeLocation &&
          node.sourceCodeLocation.endTag
        ) {
          const start = node.sourceCodeLocation.endTag.startOffset;
          parts.push({ start, end: start, value: "" });
        }
        const text = parts.map((p) => p.value).join("");
        if (parts.length)
          result.push({
            id: String(node.sourceCodeLocation?.startOffset),
            tag: node.tagName,
            text,
            parts,
          });
        return;
      }
    }
    if ("childNodes" in node) node.childNodes.forEach(visit);
  };
  visit(doc);
  return result;
}
const escapeText = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
/** Patch the smallest changed text interval, preserving all original HTML tags and styling. */
export function updateDocumentText(
  source: string,
  id: string,
  next: string,
): string {
  const block = documentTextBlocks(source).find((b) => b.id === id);
  if (!block || block.text === next) return source;
  let prefix = 0;
  while (
    prefix < block.text.length &&
    prefix < next.length &&
    block.text[prefix] === next[prefix]
  )
    prefix++;
  let suffix = 0;
  while (
    suffix < block.text.length - prefix &&
    suffix < next.length - prefix &&
    block.text[block.text.length - 1 - suffix] ===
      next[next.length - 1 - suffix]
  )
    suffix++;
  const end = block.text.length - suffix;
  const insert = next.slice(prefix, next.length - suffix);
  let offset = 0,
    inserted = false;
  const patches: { start: number; end: number; value: string }[] = [];
  for (const part of block.parts) {
    const a = offset,
      b = offset + part.value.length;
    offset = b;
    if (b < prefix || a > end) continue;
    if (a === end && inserted) continue;
    const left = Math.max(0, prefix - a),
      right = Math.min(part.value.length, end - a);
    if (left > part.value.length || right < 0) continue;
    const value =
      part.value.slice(0, left) +
      (inserted ? "" : insert) +
      part.value.slice(Math.max(left, right));
    inserted = true;
    patches.push({
      start: part.start,
      end: part.end,
      value: escapeText(value),
    });
  }
  for (const patch of patches.reverse())
    source =
      source.slice(0, patch.start) + patch.value + source.slice(patch.end);
  return source;
}
