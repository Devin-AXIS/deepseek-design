/** Shared, purpose-based component and asset browser for both native editors. */
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Blocks, Loader2, Search } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { currentLocale } from "@/i18n";
import {
  defaultTheme,
  type ResourceCategory,
  type ResourceTheme,
} from "./resource-model.ts";
import { studioFetch, studioApiRoot } from "./studio-fetch.ts";

const dictionary = {
  zh: {
    title: "组件",
    data: "数据",
    business: "商业组件",
    library: "图库素材",
    search: "搜索",
    placeholder: "按需求查找组件或素材",
    use: "使用",
    empty: "没有匹配的资源",
    missing: "资源接口尚未配置，请先在插件设置中连接服务",
    style: "表现风格",
    failed: "资源请求失败",
    settings: "打开插件设置",
  },
  en: {
    title: "Components",
    data: "Data",
    business: "Business",
    library: "Asset library",
    search: "Search",
    placeholder: "Describe the component or asset you need",
    use: "Use",
    empty: "No matching resources",
    missing: "Connect the resource service in plugin settings first.",
    style: "Presentation style",
    failed: "Resource request failed",
    settings: "Open plugin settings",
  },
};
const categories = ["data", "business", "library"] as const;
const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  kind: z.enum(["component", "asset"]),
});
type Item = z.infer<typeof itemSchema>;
interface Props {
  kind: "design" | "video";
  workspaceId: string;
  sessionId: string;
  scopeKey: string;
  embedded?: boolean;
  theme?: Partial<ResourceTheme>;
  onInsert: (html: string) => void | Promise<void>;
  onOpenSettings?: () => void;
}

/** Search one resource family; only insertion resolves and downloads its actual media. */
export function ResourceLibrary(props: Props) {
  const t = currentLocale().startsWith("zh") ? dictionary.zh : dictionary.en;
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<ResourceCategory>("data");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState<string>();
  const [style, setStyle] = useState(defaultTheme.style);
  const operation = useRef<AbortController | undefined>(undefined);
  const latest = useRef(props);
  latest.current = props;
  const active = props.embedded || open;
  const panelId = useId();

  const request = useCallback(
    async (controller: AbortController, path: string, body?: unknown) => {
      const response = await studioFetch(
        props.kind,
        studioApiRoot(props.kind) + "/resources" + path,
        {
          signal: controller.signal,
          method: body ? "POST" : "GET",
          headers: body ? { "content-type": "application/json" } : {},
          ...(body ? { body: JSON.stringify(body) } : {}),
        },
      );
      const value: unknown = await response.json();
      controller.signal.throwIfAborted();
      if (!response.ok) {
        const unconfigured = Boolean(
          value &&
          typeof value === "object" &&
          "code" in value &&
          value.code === "STUDIO_PROVIDER_MISSING",
        );
        setMissing(unconfigured);
        throw Error(unconfigured ? t.missing : t.failed);
      }
      return value;
    },
    [props.kind, t],
  );

  const load = useCallback(
    async (selected: ResourceCategory, search: string) => {
      operation.current?.abort();
      const controller = new AbortController();
      operation.current = controller;
      setBusy("search");
      setError("");
      setMissing(false);
      setItems([]);
      try {
        const value = await request(
          controller,
          "?" + new URLSearchParams({ category: selected, q: search }),
        );
        setItems(z.array(itemSchema).parse(value));
      } catch (reason) {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : t.failed);
      } finally {
        if (!controller.signal.aborted && operation.current === controller)
          setBusy(undefined);
      }
    },
    [request, t],
  );

  useEffect(() => {
    if (!active) return;
    setQuery("");
    void load(category, "");
    return () => operation.current?.abort();
  }, [active, category, props.scopeKey, load]);

  async function insert(item: Item) {
    operation.current?.abort();
    const controller = new AbortController();
    operation.current = controller;
    const owner = props;
    setBusy(item.id);
    setError("");
    setMissing(false);
    try {
      const result = z.object({ html: z.string() }).parse(
        await request(controller, "", {
          workspaceId: owner.workspaceId,
          sessionId: owner.sessionId,
          item,
          theme: {
            ...defaultTheme,
            ...Object.fromEntries(
              Object.entries(owner.theme ?? {}).filter(
                ([, value]) => value !== undefined,
              ),
            ),
            style,
          },
        }),
      );
      const current = latest.current;
      if (current.scopeKey !== owner.scopeKey) return;
      await current.onInsert(result.html);
      if (!owner.embedded) setOpen(false);
    } catch (reason) {
      if (!controller.signal.aborted)
        setError(reason instanceof Error ? reason.message : t.failed);
    } finally {
      if (!controller.signal.aborted && operation.current === controller)
        setBusy(undefined);
    }
  }

  const content = (
    <div className="flex min-w-0 flex-col gap-3" data-resource-library>
      <div
        className="flex gap-1 rounded-lg bg-muted/60 p-1"
        role="tablist"
        aria-label={t.title}
      >
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={category === value}
            aria-controls={panelId}
            disabled={busy !== undefined && busy !== "search"}
            onClick={() => setCategory(value)}
            className={`min-w-0 flex-1 rounded-md px-1 py-2 text-xs font-medium transition-colors ${category === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {t[value]}
          </button>
        ))}
      </div>
      <form
        className="flex min-w-0 gap-1.5"
        onSubmit={(event) => {
          event.preventDefault();
          void load(category, query);
        }}
      >
        <Input
          className="h-8 min-w-0 flex-1 text-xs"
          aria-label={t.placeholder}
          placeholder={t.placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button
          size="icon-sm"
          type="submit"
          disabled={busy !== undefined}
          aria-label={t.search}
          title={t.search}
        >
          {busy === "search" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
        </Button>
      </form>
      <div
        id={panelId}
        role="tabpanel"
        className="grid min-w-0 gap-2"
        aria-busy={busy === "search"}
      >
        {error ? (
          <div className="space-y-2 text-xs text-muted-foreground">
            <p role="alert">{error}</p>
            {missing && props.onOpenSettings ? (
              <Button
                size="sm"
                variant="outline"
                onClick={props.onOpenSettings}
              >
                {t.settings}
              </Button>
            ) : null}
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex min-w-0 items-center gap-2 rounded-lg bg-muted/50 p-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">{item.title}</p>
                {item.description ? (
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
              </div>
              <Button
                size="sm"
                variant="ghost"
                disabled={busy !== undefined}
                onClick={() => void insert(item)}
              >
                {busy === item.id ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  t.use
                )}
              </Button>
            </div>
          ))
        )}
        {!items.length && !busy && !error ? (
          <p className="py-4 text-center text-xs text-muted-foreground">
            {t.empty}
          </p>
        ) : null}
      </div>
      <details className="text-xs text-muted-foreground">
        <summary className="cursor-pointer">{t.style}</summary>
        <Input
          className="mt-2 h-8 text-xs"
          aria-label={t.style}
          value={style}
          onChange={(event) => setStyle(event.target.value)}
        />
      </details>
    </div>
  );

  return props.embedded ? (
    content
  ) : (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={t.title}
        title={t.title}
        onClick={() => setOpen(true)}
      >
        <Blocks className="size-4" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[65vh] overflow-y-auto">{content}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Insert into the current slide when available, otherwise into the HTML body. */
export function insertResourceHtml(
  source: string,
  html: string,
  slide = 0,
): string {
  const document = new DOMParser().parseFromString(source, "text/html");
  const slides = document.querySelectorAll("[data-ipw-slide],.slide");
  (slides[slide] ?? document.body).insertAdjacentHTML("beforeend", html);
  return "<!doctype html>\n" + document.documentElement.outerHTML;
}
