/** Public motion discovery inside the existing native Templates page. */
import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ExternalLink, Film, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motionFacets, type MotionCard, type MotionFacet } from "./motion-catalog-types.ts";
import { motionCatalog, openMotion } from "./motion-client.ts";
import type { TemplateLibraryProps } from "./template-library-types.ts";

type Mode = "project" | "reference";
const facetNames = {
  zh: ["用途", "动效类型", "品牌", "行业", "创作模型", "颜色", "画幅", "时长"],
  en: ["Use case", "Motion style", "Brand", "Industry", "Model", "Color", "Aspect ratio", "Duration"],
};
const field = "h-8 min-w-0 w-full rounded-full border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring";
const pageSize = 24;
function facetLabel(value: string, zh: boolean) {
  return ({ landscape: "16:9", portrait: "9:16", square: "1:1", under10: zh ? "10 秒以内" : "Up to 10 sec",
    "10to30": zh ? "10–30 秒" : "10–30 sec", "30to60": zh ? "30–60 秒" : "30–60 sec",
    "60plus": zh ? "60 秒及以上" : "60 sec or more", monochrome: zh ? "黑白灰" : "Monochrome",
    red: zh ? "红色" : "Red", orange: zh ? "橙色" : "Orange", green: zh ? "绿色" : "Green",
    blue: zh ? "蓝色" : "Blue", purple: zh ? "紫色" : "Purple", multicolor: zh ? "多色" : "Multicolor",
  } as Record<string, string>)[value] ?? value;
}
type Props = Pick<TemplateLibraryProps, "language" | "createSession" | "openSession"> & {
  workspaceId?: TemplateLibraryProps["workspaces"][number]["workspaceId"];
};

export function MotionLibrary(props: Props) {
  const zh = props.language.startsWith("zh");
  const i18n = (cn: string, en: string) => zh ? cn : en;
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("");
  const [filters, setFilters] = useState<Partial<Record<MotionFacet, string>>>({});
  const [order, setOrder] = useState("recommended");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<MotionCard>();
  const [reload, setReload] = useState(0);
  const pendingSession = useRef<{ key: string; id: Awaited<ReturnType<Props["createSession"]>> } | null>(null);
  const list = useQuery({
    queryKey: ["motion-catalog", props.language, reload],
    queryFn: ({ signal }) => motionCatalog(props.language, reload > 0, signal),
    placeholderData: data => data, staleTime: 300_000, retry: false,
  });
  const all = list.data?.cards;
  const allowedFacets = useMemo(() => motionFacets.map(facet =>
    [...new Set((all ?? []).flatMap(item => item.facets[facet] ?? []))].sort((a, b) =>
      facetLabel(a, zh).localeCompare(facetLabel(b, zh), props.language))), [all, zh, props.language]);
  const matches = useMemo(() => {
    const token = query.trim().normalize("NFKC").toLowerCase();
    const result = (all ?? []).filter(item => (!kind || kind === item.kind) &&
      motionFacets.every(key => !filters[key] || item.facets[key]?.includes(filters[key]!)) &&
      (!token || [item.title, item.brand, item.id, ...Object.values(item.facets).flat()].some(v => v.normalize("NFKC").toLowerCase().includes(token))));
    if (order !== "recommended") result.sort((a, b) => (order === "title" ? 1 : -1) * a.title.localeCompare(b.title, props.language));
    return result;
  }, [all, kind, filters, query, order, props.language]);
  const pages = Math.max(1, Math.ceil(matches.length / pageSize)), current = Math.min(page, pages - 1);
  const action = useMutation({
    mutationFn: async ({ row, mode }: { row: MotionCard; mode: Mode }) => {
      const workspaceId = props.workspaceId;
      if (!workspaceId) throw Error(i18n("请先选择工作区", "Select a workspace first."));
      const key = workspaceId + ":" + row.id + ":" + mode;
      const sessionId = pendingSession.current?.key === key ? pendingSession.current.id : await props.createSession(workspaceId);
      pendingSession.current = { key, id: sessionId };
      await openMotion({ workspaceId, sessionId, id: row.id, language: props.language, mode });
      return sessionId;
    },
    onSuccess: id => {
      pendingSession.current = null;
      setSelected(undefined);
      props.openSession("video", id);
    },
  });
  const count = all?.length ?? 0;
  const projects = all?.filter(item => item.kind === "editable_project").length ?? 0;
  return <section data-testid="motion-library" className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <div className="min-w-0">
        <h2 className="text-base font-medium">{i18n("动效参考库", "Motion library")}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{i18n("来自 OpenMotion 公开目录。可下载工程与参考视频分开标记。", "OpenMotion’s public catalog. Downloadable projects and reference videos are marked separately.")}</p>
      </div>
      <Button size="sm" variant="outline" disabled={list.isFetching} onClick={() => setReload(n => n + 1)}>{i18n("刷新目录", "Refresh catalog")}</Button>
    </div>
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <label className="relative col-span-2 min-w-0">
        <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-2 size-4 text-muted-foreground" />
        <input className={field + " pl-9"} type="search" aria-label={i18n("搜索动效模板", "Search motion templates")}
          placeholder={i18n("名称、品牌或模板编号", "Title, brand or ID")} value={query}
          onChange={event => { setQuery(event.target.value); setPage(0); }} />
      </label>
      <select className={field} aria-label={i18n("可用形式", "Availability")} value={kind} onChange={event => { setKind(event.target.value); setPage(0); }}>
        <option value="">{i18n("全部形式", "All formats")}</option>
        <option value="editable_project">{i18n("可下载工程", "Downloadable project")}</option>
        <option value="reference_video">{i18n("参考视频", "Reference video")}</option>
      </select>
      <select className={field} aria-label={i18n("排序", "Sort")} value={order} onChange={event => { setOrder(event.target.value); setPage(0); }}>
        <option value="recommended">{i18n("目录顺序", "Catalog order")}</option>
        <option value="title">{i18n("名称升序", "Title A–Z")}</option>
        <option value="reverse">{i18n("名称降序", "Title Z–A")}</option>
      </select>
    </div>
    <details className="mt-2 rounded-lg border border-border px-3 py-2">
      <summary className="cursor-pointer text-sm">{i18n("更多筛选", "More filters")}</summary>
      <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {motionFacets.map((facet, n) => <label key={facet} className="flex min-w-0 flex-col gap-1 text-xs text-muted-foreground">
          {facetNames[zh ? "zh" : "en"][n]}<select className={field} value={filters[facet] ?? ""}
            onChange={event => { setFilters(prev => ({ ...prev, [facet]: event.target.value })); setPage(0); }}>
            <option value="">{i18n("全部", "All")}</option>
            {allowedFacets[n]?.map(value => <option key={value} value={value}>{facetLabel(value, zh)}</option>)}
          </select>
        </label>)}
      </div>
      <Button size="sm" variant="ghost" onClick={() => { setFilters({}); setKind(""); setQuery(""); setPage(0); }}>{i18n("清除筛选", "Clear filters")}</Button>
    </details>
    {list.isPending && <div role="status" aria-label={i18n("正在读取目录", "Reading the catalog")} className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, n) => <div key={n} className="aspect-video rounded-lg bg-muted motion-safe:animate-pulse" />)}
    </div>}
    {list.isError && <p role="alert" className="my-3 text-sm">{i18n("暂时无法读取公开目录；可以重试，内置模板不受影响", "The public catalog is unavailable. Retry or continue with built-in templates.")}</p>}
    {list.data?.stale && <p role="status" className="my-3 text-xs text-muted-foreground">{i18n("正在显示上次保存的目录", "Showing the last available catalog snapshot.")}</p>}
    {all && <>
      <p data-testid="motion-count" className="my-3 text-xs text-muted-foreground" aria-live="polite">
        {zh ? matches.length + " / " + count + " 项 · " + projects + " 个可下载工程" : matches.length + " of " + count + " entries · " + projects + " downloadable projects"}
      </p>
      {!matches.length && <p className="py-8 text-center text-sm text-muted-foreground">{i18n("没有符合条件的动效", "No matching motion templates.")}</p>}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {matches.slice(current * pageSize, (current + 1) * pageSize).map(row => <button
          type="button" key={row.id} data-testid="motion-catalog-card" onClick={() => { action.reset(); setSelected(row); }}
          className="min-w-0 rounded-lg border border-border text-left hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-ring">
          <span className="relative grid aspect-video place-items-center overflow-hidden rounded-t-lg bg-muted">
            <Film className="size-5 text-muted-foreground" aria-hidden="true" />
            {row.cover && <img src={row.cover} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"
              onError={event => { event.currentTarget.hidden = true; }} className="absolute inset-0 h-full w-full object-cover" />}
          </span>
          <span className="block px-2 py-2">
            <span className="line-clamp-2 break-words text-sm font-medium">{row.title}</span>
            <span className="mt-1 block truncate text-xs text-muted-foreground">{row.brand}{row.brand ? " · " : ""}
              {row.kind === "editable_project" ? i18n("工程", "Project") : i18n("参考", "Reference")}</span>
          </span>
        </button>)}
      </div>
      {pages > 1 && <nav className="mt-4 flex items-center justify-center gap-2" aria-label={i18n("目录分页", "Catalog pages")}>
        <Button variant="outline" size="sm" disabled={current === 0} onClick={() => setPage(current - 1)}>{i18n("上一页", "Previous")}</Button>
        <span className="text-xs tabular-nums">{current + 1} / {pages}</span>
        <Button variant="outline" size="sm" disabled={current === pages - 1} onClick={() => setPage(current + 1)}>{i18n("下一页", "Next")}</Button>
      </nav>}
    </>}
    <Dialog open={Boolean(selected)} onOpenChange={open => { if (!open && !action.isPending) setSelected(undefined); }}>
      {selected && <DialogContent className="max-h-[86dvh] max-w-[calc(100%-24px)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="break-words">{selected.title}</DialogTitle>
          <DialogDescription>{i18n("在新会话打开独立副本，不会覆盖现有工程。参考片用于测量和重新制作。", "An independent copy opens in a new conversation. A reference is measured and rebuilt, not copied into the final video.")}</DialogDescription>
        </DialogHeader>
        {selected.preview && <video src={selected.preview} poster={selected.cover} controls preload="none" playsInline className="max-h-[45dvh] w-full rounded-lg bg-black" />}
        <p className="text-xs text-muted-foreground">{motionFacets.flatMap(key => selected.facets[key] ?? []).map(value => facetLabel(value, zh)).join(" · ")}</p>
        {action.isError && <p role="alert" className="text-sm">{action.error.message}</p>}
        <div className="flex flex-wrap items-center gap-2">
          {selected.kind === "editable_project" && <Button size="sm" disabled={action.isPending || !props.workspaceId}
            onClick={() => action.mutate({ row: selected, mode: "project" })}>{i18n("在 Video 中打开工程", "Open project in Video")}</Button>}
          {selected.preview && <Button size="sm" variant="outline" disabled={action.isPending || !props.workspaceId}
            onClick={() => action.mutate({ row: selected, mode: "reference" })}>{i18n("用作复刻参考", "Start from this reference")}</Button>}
          <a href={selected.page} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline">
            {i18n("查看来源", "View source")}<ExternalLink aria-hidden="true" className="size-3" />
          </a>
          {action.isPending && <span role="status" className="inline-flex items-center gap-1 text-xs"><Loader2 aria-hidden="true" className="size-3 motion-safe:animate-spin" />{i18n("正在准备工程", "Preparing project")}</span>}
        </div>
      </DialogContent>}
    </Dialog>
  </section>;
}
