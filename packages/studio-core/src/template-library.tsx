/** Original iPolloWork template browsing controls adapted to a native DSH page. */
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Search, Star } from "lucide-react";
import {
  matchesTemplateFilters,
  type TemplateCatalogItem,
  type TemplateCategory,
  type TemplateStyle,
  type TemplateTopicFilter,
} from "./original/types/src/templates.ts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TemplateCatalogFilters } from "@/components/template-catalog-filters";
import { t, translationKey } from "@/i18n";
import { NativeEditor } from "./native-editor.tsx";
import {
  applyLibraryTemplate,
  libraryTemplateCover,
  listLibraryTemplates,
} from "./template-library-client.ts";
import type { TemplateLibraryProps } from "./template-library-types.ts";
import { TemplateCover } from "./template-preview.tsx";

type Collection = "builtin" | "all" | "favorites" | "mine";
const categories: TemplateCategory[] = [
  "site",
  "video",
  "slides",
  "app",
  "poster",
  "cards",
  "report",
  "article",
  "other",
];
const favoritesKey = "ipollo.dsh.template-favorites.v1";
function readFavorites(): Set<string> {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(favoritesKey) ?? "[]",
    );
    return new Set(
      Array.isArray(value)
        ? value.filter((id): id is string => typeof id === "string")
        : [],
    );
  } catch {
    return new Set();
  }
}

/** Provide the original theme, locale, query cache and overlay placement for the shared page. */
export function TemplateLibrary(props: TemplateLibraryProps) {
  return (
    <NativeEditor language={props.language} onOpenSettings={props.openSettings}>
      <Library {...props} />
    </NativeEditor>
  );
}

function Library(props: TemplateLibraryProps) {
  const [selectedWorkspace, setWorkspace] = useState("");
  const workspace =
    props.workspaces.find((item) => item.workspaceId === selectedWorkspace) ??
    props.workspaces[0];
  const workspaceId = workspace?.workspaceId;
  const [collection, setCollection] = useState<Collection>("builtin");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [style, setStyle] = useState<TemplateStyle | "all">("all");
  const [topic, setTopic] = useState<TemplateTopicFilter>("all");
  const [favorites, setFavorites] = useState(readFavorites);
  const [preview, setPreview] = useState<TemplateCatalogItem | null>(null);
  const [favoriteError, setFavoriteError] = useState(false);
  const catalog = useQuery({
    queryKey: ["native-template-library", workspaceId, ...props.kinds],
    enabled: Boolean(workspaceId) && props.kinds.length > 0,
    queryFn: async ({ signal }) => {
      if (!workspaceId) throw new Error("Workspace unavailable");
      const results = await Promise.allSettled(
        props.kinds.map((kind) =>
          listLibraryTemplates(kind, workspaceId, signal),
        ),
      );
      const items: TemplateCatalogItem[] = [];
      const failures: string[] = [];
      results.forEach((result, index) => {
        if (result.status === "fulfilled") items.push(...result.value);
        else
          failures.push(props.kinds[index] === "design" ? "Design" : "Video");
      });
      return { items, failures };
    },
  });
  const items = catalog.data?.items ?? [];
  const visible = useMemo(
    () =>
      items.filter((item) => {
        if (
          !matchesTemplateFilters(item.manifest, {
            category,
            style,
            topic,
            query,
          })
        )
          return false;
        if (collection === "builtin") return item.sourceType !== "local";
        if (collection === "favorites") return favorites.has(item.manifest.id);
        if (collection === "mine") return item.sourceType === "local";
        return item.sourceType === "local" || favorites.has(item.manifest.id);
      }),
    [items, category, style, topic, query, collection, favorites],
  );
  const getCover = useCallback(
    (item: TemplateCatalogItem) => {
      if (!workspaceId)
        return Promise.reject(new Error("Workspace unavailable"));
      return libraryTemplateCover(
        item.manifest.surface,
        workspaceId,
        item.manifest.id,
      );
    },
    [workspaceId],
  );
  const useTemplate = useMutation({
    mutationFn: async (item: TemplateCatalogItem) => {
      if (!workspaceId) throw new Error("Workspace unavailable");
      const sessionId = await props.createSession(workspaceId);
      await applyLibraryTemplate(
        item.manifest.surface,
        workspaceId,
        sessionId,
        item.manifest.id,
      );
      return { kind: item.manifest.surface, sessionId };
    },
  });
  const apply = (item: TemplateCatalogItem) =>
    useTemplate.mutate(item, {
      onSuccess: ({ kind, sessionId }) => props.openSession(kind, sessionId),
    });
  const toggleFavorite = (id: string) => {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    try {
      localStorage.setItem(favoritesKey, JSON.stringify([...next]));
      setFavorites(next);
      setFavoriteError(false);
    } catch {
      setFavoriteError(true);
    }
  };
  const zh = props.language.startsWith("zh");
  const problem = useTemplate.isError
    ? t("design_templates.apply_failed")
    : favoriteError
      ? zh
        ? "收藏未能保存，请重试"
        : "Could not save favorites. Try again."
      : catalog.isError || catalog.data?.failures.length
        ? t("design_templates.load_failed")
        : null;
  return (
    <main
      className="flex h-full min-h-0 flex-col bg-background text-foreground"
      data-testid="native-template-library"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 pb-3">
        <h1 className="text-lg font-medium">{t("template_market.title")}</h1>
        {props.workspaces.length > 1 && (
          <select
            className="max-w-56 rounded-lg bg-muted px-3 py-2 text-sm"
            aria-label={zh ? "工作区" : "Workspace"}
            value={workspaceId}
            disabled={useTemplate.isPending}
            onChange={(event) => {
              setWorkspace(event.target.value);
              setPreview(null);
            }}
          >
            {props.workspaces.map((item) => (
              <option key={item.workspaceId} value={item.workspaceId}>
                {item.title}
              </option>
            ))}
          </select>
        )}
      </header>
      <div className="flex shrink-0 flex-col gap-3 px-6 pb-4">
        <Tabs
          value={collection === "builtin" ? "builtin" : "my"}
          onValueChange={(value) =>
            setCollection(value === "builtin" ? "builtin" : "all")
          }
        >
          <TabsList aria-label={t("template_market.title")}>
            <TabsTrigger value="my">{t("template_market.my_tab")}</TabsTrigger>
            <TabsTrigger value="builtin">
              {t("template_market.source_builtin")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <InputGroup>
          <InputGroupAddon>
            <Search aria-hidden="true" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t("template_market.search_placeholder")}
            placeholder={t("template_market.search_placeholder")}
          />
        </InputGroup>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto pb-1"
            aria-label={t("template_market.category")}
          >
            {collection !== "builtin" ? (
              (["all", "favorites", "mine"] as const).map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={collection === value ? "secondary" : "ghost"}
                  aria-pressed={collection === value}
                  onClick={() => setCollection(value)}
                >
                  {t(translationKey("template_market.my_", value))}
                </Button>
              ))
            ) : (
              <>
                <Button
                  size="sm"
                  variant={category === "all" ? "secondary" : "ghost"}
                  aria-pressed={category === "all"}
                  onClick={() => setCategory("all")}
                >
                  {t("template_market.all_types")}
                </Button>
                {categories
                  .filter((value) =>
                    items.some((item) => item.manifest.category === value),
                  )
                  .map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={category === value ? "secondary" : "ghost"}
                      aria-pressed={category === value}
                      onClick={() => setCategory(value)}
                    >
                      {t(translationKey("template_market.category.", value))}
                    </Button>
                  ))}
              </>
            )}
          </div>
          <TemplateCatalogFilters
            templates={items}
            category={category}
            style={style}
            topic={topic}
            onStyleChange={setStyle}
            onTopicChange={setTopic}
          />
        </div>
        {problem && (
          <div role="alert" className="flex items-center gap-3 text-sm">
            <span>{problem}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                useTemplate.reset();
                setFavoriteError(false);
                void catalog.refetch();
              }}
            >
              {t("template_market.retry")}
            </Button>
          </div>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
        {!workspace ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {zh
              ? "先在左侧添加一个工作区，即可浏览和使用模板"
              : "Add a workspace in the sidebar to browse and use templates."}
          </p>
        ) : catalog.isLoading ? (
          <div className="grid h-full place-items-center">
            <Loader2 className="size-5 animate-spin" />
          </div>
        ) : visible.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm">
              {t(
                collection === "builtin"
                  ? "template_market.no_match_title"
                  : "template_market.my_empty_title",
              )}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t("template_market.no_match_desc")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(230px,100%),1fr))] gap-4">
            {visible.map((item) => (
              <article
                key={item.manifest.id}
                data-testid="template-library-item"
                data-surface={item.manifest.surface}
                className="min-w-0 overflow-hidden rounded-lg bg-muted/50 pb-3"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <TemplateCover template={item} load={getCover} />
                  <button
                    className="absolute inset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    onClick={() => setPreview(item)}
                    aria-label={t("template_market.preview_aria", {
                      title: item.manifest.title,
                    })}
                  />
                </div>
                <div className="px-3 pt-3">
                  <h2
                    className="truncate text-sm font-medium"
                    title={item.manifest.title}
                  >
                    {item.manifest.title}
                  </h2>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-pressed={favorites.has(item.manifest.id)}
                      aria-label={t(
                        favorites.has(item.manifest.id)
                          ? "template_market.remove_favorite"
                          : "template_market.add_favorite",
                        { title: item.manifest.title },
                      )}
                      onClick={() => toggleFavorite(item.manifest.id)}
                    >
                      <Star
                        className={
                          favorites.has(item.manifest.id)
                            ? "size-3.5 fill-current"
                            : "size-3.5"
                        }
                      />
                      {t("template_market.favorite")}
                    </Button>
                    <Button
                      size="sm"
                      disabled={useTemplate.isPending}
                      onClick={() => apply(item)}
                    >
                      {useTemplate.isPending &&
                        useTemplate.variables === item && (
                          <Loader2 className="size-3 animate-spin" />
                        )}
                      {t("template_market.use")}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Dialog
        open={preview !== null}
        onOpenChange={(open) => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          {preview && (
            <>
              <div className="aspect-[16/10] max-h-[55dvh] bg-muted">
                <TemplateCover template={preview} load={getCover} />
              </div>
              <DialogHeader className="px-6">
                <DialogTitle>{preview.manifest.title}</DialogTitle>
                <DialogDescription>
                  {preview.manifest.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-5">
                <p className="text-xs text-muted-foreground">
                  {preview.manifest.source.name} /{" "}
                  {preview.manifest.source.license}
                </p>
                <Button
                  disabled={useTemplate.isPending}
                  onClick={() => apply(preview)}
                >
                  {useTemplate.isPending && (
                    <Loader2 className="size-3 animate-spin" />
                  )}
                  {t("template_market.use_template")}
                </Button>
              </div>
              {useTemplate.isError && (
                <p role="alert" className="px-6 pb-5 text-sm">
                  {t("design_templates.apply_failed")}
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
