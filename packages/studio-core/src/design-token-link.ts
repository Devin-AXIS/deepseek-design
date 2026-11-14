/** Read a local theme stylesheet reference without executing or rewriting HTML. */
function attributeValue(tag: string, name: string) {
  const match = new RegExp(
    `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  ).exec(tag);
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

function safeLocalPath(path: string) {
  if (
    !path ||
    path.startsWith("/") ||
    /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)
  )
    return "";
  const pathname = path.split(/[?#]/, 1)[0] ?? "";
  if (pathname.split("/").includes("..")) return "";
  return path.replace(/^\.\//, "");
}

export function linkedDesignTokenPath(source: string | undefined): string {
  for (const tag of source?.match(/<link\b[^>]*>/gi) ?? []) {
    const href = attributeValue(tag, "href")?.trim();
    if (!href) continue;
    const rel = attributeValue(tag, "rel");
    const isTokenLink =
      /\bdata-ipw-design-tokens\b/i.test(tag) ||
      (rel
        ?.split(/\s+/)
        .some((value) => value.toLowerCase() === "stylesheet") &&
        /(?:^|\/)design-tokens?\.css(?:[?#].*)?$/i.test(href));
    if (!isTokenLink) continue;
    const path = safeLocalPath(href);
    if (path) return path;
  }
  return "";
}
