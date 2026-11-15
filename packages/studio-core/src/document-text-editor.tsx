/** Distraction-free text editing; all visual design remains in the HTML preview. */
import * as React from "react";
import { t } from "@/i18n";
import {
  documentTextBlocks,
  updateDocumentText,
  type DocumentTextBlock,
} from "./document-text.ts";
import styles from "./document-text-editor.module.css";

function Block({
  block,
  onChange,
  readOnly,
}: {
  block: DocumentTextBlock;
  onChange: (value: string) => void;
  readOnly: boolean;
}) {
  return (
    <textarea
      className={styles.block}
      data-kind={block.tag}
      aria-label={`${t("design.document.text")} ${block.tag}`}
      value={block.text}
      readOnly={readOnly}
      rows={1}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
export function DocumentTextEditor({
  source,
  onChange,
  readOnly,
}: {
  source: string;
  onChange: (source: string) => void;
  readOnly: boolean;
}) {
  const editorRef = React.useRef<HTMLElement>(null);
  const fitText = React.useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const scrollTop = editor.scrollTop;
    for (const input of editor.querySelectorAll("textarea")) {
      input.style.height = "auto";
      input.style.height = `${input.scrollHeight + input.offsetHeight - input.clientHeight}px`;
    }
    editor.scrollTop = scrollTop;
  }, []);
  React.useLayoutEffect(fitText, [source, fitText]);
  React.useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    let width = editor.clientWidth;
    const observer = new ResizeObserver(() => {
      if (editor.clientWidth === width) return;
      width = editor.clientWidth;
      fitText();
    });
    observer.observe(editor);
    document.fonts.addEventListener("loadingdone", fitText);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fitText);
    };
  }, [fitText]);
  const content = documentTextBlocks(source);
  return (
    <section
      ref={editorRef}
      className={styles.editor}
      aria-label={t("design.document.text")}
      data-testid="document-text-editor"
    >
      <div className={styles.page}>
        {content.length ? (
          content.map((block, index) => (
            <Block
              key={index}
              block={block}
              readOnly={readOnly}
              onChange={(value) =>
                onChange(updateDocumentText(source, block.id, value))
              }
            />
          ))
        ) : (
          <p>{t("design.document.empty")}</p>
        )}
      </div>
    </section>
  );
}
