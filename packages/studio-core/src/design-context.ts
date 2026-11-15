/** Logged Design context rendered as a compact reference by the native conversation slot. */
export function designContextText(label: string, context: string): string {
  return `[Design context: ${label.replace(/[\]\r\n]/g, " ")}]\n${context.replaceAll("[/Design context]", "[/Design context ]")}\n[/Design context]`;
}

/** Match only complete Design records; ordinary messages retain their original rendering. */
export function findDesignContext(text: string, from: number) {
  const pattern =
    /\[Design context: ([^\]\r\n]+)\]\n([\s\S]*?)\n\[\/Design context\]/g;
  pattern.lastIndex = from;
  const match = pattern.exec(text);
  return match
    ? {
        start: match.index,
        end: match.index + match[0].length,
        label: match[1],
        context: match[2],
      }
    : undefined;
}
