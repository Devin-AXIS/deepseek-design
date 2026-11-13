/** Syntax highlighting loads only when Markdown contains a code block. */
import { bundledLanguages } from "shiki/langs";
import { createBundledHighlighter, createSingletonShorthands, guessEmbeddedLanguages } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";
import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

const createHighlighter = createBundledHighlighter({
  langs: bundledLanguages,
  themes: { "github-light": () => import("@shikijs/themes/github-light") },
  engine: () => createOnigurumaEngine(import("shiki/wasm")),
});
const { codeToHtml } = createSingletonShorthands(createHighlighter, { guessEmbeddedLanguages });

/** Preserve every bundled language and existing annotations, using the editor's actual theme only. */
export function highlightCode(code: string, language: string, props: string[]): Promise<string> {
  const normalized = language.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  return codeToHtml(code, {
    lang: normalized in bundledLanguages ? normalized : "text",
    theme: "github-light",
    meta: { __raw: props.join(" ") },
    transformers: [
      transformerNotationDiff({ matchAlgorithm: "v3" }),
      transformerNotationHighlight({ matchAlgorithm: "v3" }),
      transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
      transformerNotationFocus({ matchAlgorithm: "v3" }),
      transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
    ],
  });
}
