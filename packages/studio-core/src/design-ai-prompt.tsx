/** Small in-place prompt shared by selected-element and markup editing. */
import * as React from "react";
import { Send, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n";
import styles from "./design-markup.module.css";

export function DesignAiPrompt({
  value,
  onChange,
  onSubmit,
  pending,
  disabled = false,
  autoFocus = false,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  pending: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <form
      className={styles.prompt}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Input
        autoFocus={autoFocus}
        aria-label={t("design.markup.instruction")}
        placeholder={t("design.markup.instruction")}
        value={value}
        disabled={pending}
        onChange={(event) => onChange(event.target.value)}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon-sm"
        className={styles.tool}
        aria-label={t("design.markup.send")}
        title={t("design.markup.send")}
        disabled={pending || disabled || !value.trim()}
      >
        {pending ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
    </form>
  );
}

/** Freeze the chosen element while collecting its instruction, including in full-screen mode. */
export function DesignSelectionPrompt({
  label,
  value,
  onChange,
  onSubmit,
  onClose,
  pending,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  pending: boolean;
  error: string;
}) {
  const ref = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        !pending &&
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      )
        onClose();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) { event.stopPropagation(); onClose(); }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape, true);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape, true);
    };
  }, [onClose, pending]);
  return (
    <section
      ref={ref}
      className={styles.selectionPrompt}
      role="dialog"
      aria-label={t("design.selection.prompt")}
      data-testid="design-selection-prompt"
    >
      <div className={styles.promptHeading}>
        <span className={styles.contextChip} title={label}>
          {label}
        </span>
        <Button
          variant="ghost"
          className={styles.tool}
          size="icon-sm"
          aria-label={t("common.close")}
          disabled={pending}
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
      <DesignAiPrompt
        autoFocus
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        pending={pending}
      />
      {error ? (
        <p role="alert" className={styles.promptError}>
          {error}
        </p>
      ) : null}
    </section>
  );
}
