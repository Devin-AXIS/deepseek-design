import { studioFetch, studioApiRoot } from "./studio-fetch.ts";
/** API catalog chooser added to the original Studio toolbar. */
import { useEffect, useRef, useState } from "react";
import { Blocks, Loader2 } from "lucide-react";
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
import { defaultTheme, type ResourceTheme } from "./resource-model.ts";
const dictionary = {
  zh: {
    title: "组件与素材",
    components: "组件",
    images: "图片",
    videos: "视频",
    search: "搜索",
    placeholder: "搜索接口中的资源",
    use: "使用",
    empty: "没有匹配的资源",
    hint: "选择资源类型后搜索。",
    missing: "资源接口尚未配置，请联系管理员。",
    style: "资源风格",
    failed: "资源请求失败",
    close: "关闭",
  },
  en: {
    title: "Components and media",
    components: "Components",
    images: "Images",
    videos: "Videos",
    search: "Search",
    placeholder: "Search configured resource APIs",
    use: "Use",
    empty: "No matching resources",
    hint: "Choose a resource type, then search.",
    missing: "The resource API is not configured. Contact your administrator.",
    style: "Resource style",
    failed: "Resource request failed",
    close: "Close",
  },
};
const itemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  kind: z.enum(["component", "image", "video"]),
});
type Item = z.infer<typeof itemSchema>;
interface Props {
  kind: "design" | "video";
  workspaceId: string;
  sessionId: string;
  scopeKey: string;
  theme?: Partial<ResourceTheme>;
  onInsert: (html: string) => void | Promise<void>;
}
/** Add one catalog result while preserving the original document and design tokens. */
export function ResourceLibrary(props: Props) {
  const t = currentLocale().startsWith("zh") ? dictionary.zh : dictionary.en;
  const [open, setOpen] = useState(false),
    [kind, setKind] = useState<Item["kind"]>("component"),
    [query, setQuery] = useState(""),
    [items, setItems] = useState<Item[]>([]),
    [searched, setSearched] = useState(false),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [style, setStyle] = useState("keynote");
  const operation = useRef<AbortController | undefined>(undefined);
  const latest = useRef(props);
  latest.current = props;
  useEffect(() => () => operation.current?.abort(), [props.scopeKey]);
  async function request(path: string, body?: unknown) {
    operation.current?.abort();
    const controller = new AbortController();
    operation.current = controller;
    const route = studioApiRoot(props.kind);
    const response = await studioFetch(
      props.kind,
      route + "/resources" + path,
      {
        signal: controller.signal,
        method: body ? "POST" : "GET",
        headers: {
          ...(body ? { "content-type": "application/json" } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      },
    );
    const value: unknown = await response.json();
    if (!response.ok)
      throw Error(
        value &&
          typeof value === "object" &&
          "code" in value &&
          value.code === "STUDIO_PROVIDER_MISSING"
          ? t.missing
          : value && typeof value === "object" && "message" in value
            ? String(value.message)
            : t.failed,
      );
    controller.signal.throwIfAborted();
    return value;
  }
  async function load() {
    setSearched(true);
    setBusy(true);
    setError("");
    try {
      setItems(
        z
          .array(itemSchema)
          .parse(await request("?" + new URLSearchParams({ kind, q: query }))),
      );
    } catch (error) {
      if (!operation.current?.signal.aborted)
        setError(error instanceof Error ? error.message : t.failed);
    } finally {
      setBusy(false);
    }
  }
  async function insert(item: Item) {
    setBusy(true);
    setError("");
    try {
      const result = z.object({ html: z.string() }).parse(
        await request("", {
          workspaceId: props.workspaceId,
          sessionId: props.sessionId,
          item,
          theme: {
            ...defaultTheme,
            ...Object.fromEntries(
              Object.entries(props.theme ?? {}).filter(
                ([, value]) => value !== undefined,
              ),
            ),
            style,
          },
        }),
      );
      await latest.current.onInsert(result.html);
      setOpen(false);
    } catch (error) {
      if (!operation.current?.signal.aborted)
        setError(error instanceof Error ? error.message : t.failed);
    } finally {
      setBusy(false);
    }
  }
  return (
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
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) operation.current?.abort();
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
          </DialogHeader>
          <form
            className="flex flex-wrap gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void load();
            }}
          >
            <select
              disabled={busy}
              aria-label={t.title}
              value={kind}
              onChange={(event) => {
                setKind(itemSchema.shape.kind.parse(event.target.value));
                setItems([]);
                setSearched(false);
                setError("");
              }}
            >
              <option value="component">{t.components}</option>
              <option value="image">{t.images}</option>
              <option value="video">{t.videos}</option>
            </select>
            <Input
              className="min-w-0 flex-1"
              aria-label={t.placeholder}
              placeholder={t.placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button disabled={busy} type="submit">
              {busy ? <Loader2 className="size-4 animate-spin" /> : t.search}
            </Button>
            <label className="flex w-full items-center gap-3 text-sm">
              {t.style}
              <Input
                value={style}
                onChange={(event) => setStyle(event.target.value)}
              />
            </label>
          </form>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <div className="grid max-h-96 gap-2 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg bg-muted p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Button disabled={busy} onClick={() => void insert(item)}>
                  {t.use}
                </Button>
              </div>
            ))}
            {!items.length && !busy && !error && (
              <p className="text-sm text-muted-foreground">
                {searched ? t.empty : t.hint}
              </p>
            )}
          </div>
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
  const target = slides[slide] ?? document.body;
  target.insertAdjacentHTML("beforeend", html);
  return "<!doctype html>\n" + document.documentElement.outerHTML;
}
