/** Lazy cover images shared by template cards and their enlarged preview. */
import { useEffect, useRef, useState } from "react";
import type { TemplateCatalogItem } from "./original/types/src/templates.ts";
import { TemplateIcon } from "@/components/template-icon";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n";

export function TemplateCover({
  template,
  load,
}: {
  template: TemplateCatalogItem;
  load: (
    template: TemplateCatalogItem,
  ) => Promise<{ data: ArrayBuffer; contentType: string | null }>;
}) {
  const target = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [source, setSource] = useState("");
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!target.current || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "480px" },
    );
    observer.observe(target.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let active = true,
      objectUrl = "";
    setSource("");
    setFailed(false);
    void load(template)
      .then((cover) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(
          new Blob([cover.data], { type: cover.contentType ?? "image/png" }),
        );
        setSource(objectUrl);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [load, template, visible, attempt]);
  return (
    <div ref={target} className="grid h-full w-full place-items-center">
      {failed ? (
        <Button
          size="sm"
          variant="ghost"
          className="relative z-10"
          onClick={(event) => {
            event.stopPropagation();
            setAttempt((value) => value + 1);
          }}
        >
          {t("template_market.retry_cover")}
        </Button>
      ) : source ? (
        <img
          src={source}
          alt={t("template_market.cover_alt", {
            title: template.manifest.title,
          })}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <TemplateIcon className="size-7 text-muted-foreground" />
      )}
    </div>
  );
}
