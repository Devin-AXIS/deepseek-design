/** Adapt downloaded Stage composition documents without loading the Stage application. */
import { parse, serialize, type DefaultTreeAdapterTypes } from "parse5";
import type { Resource, ResourceTheme } from "./resource-model.ts";
import { escapeHtml } from "./resource-model.ts";

type Node = DefaultTreeAdapterTypes.Node;
function find(
  node: Node,
  tag: string,
): DefaultTreeAdapterTypes.Element | undefined {
  if ("tagName" in node && node.tagName === tag) return node;
  if ("childNodes" in node)
    for (const child of node.childNodes) {
      const match = find(child, tag);
      if (match) return match;
    }
  return undefined;
}
const safeJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
export function componentHtml(
  source: string,
  resource: Resource,
  theme: ResourceTheme,
  runtime: string,
): string {
  const document = parse(source),
    template = find(document, "template"),
    body = find(document, "body"),
    head = find(document, "head");
  const content =
    template && "content" in template
      ? serialize(template.content as DefaultTreeAdapterTypes.DocumentFragment)
      : body
        ? serialize(body)
        : source;
  const width = resource.width ?? 1920,
    height = resource.height ?? 1080;
  const colors = {
    bg: theme.background,
    fg: theme.text,
    fg2: theme.muted,
    muted: theme.muted,
    surface: theme.surface,
    border: theme.muted,
    accent: theme.accent,
    on: "#ffffff",
  };
  const variables = {
    ...resource.variables,
    skin: theme.style,
    backgroundColor: theme.background,
    textColor: theme.text,
    accentColor: theme.accent,
  };
  const setup = `addEventListener('error',e=>{const p=document.createElement('pre');p.setAttribute('role','alert');p.style.cssText='position:fixed;inset:0;background:#fff;color:#b42318;white-space:pre-wrap;padding:24px;z-index:999999';p.textContent='Component: '+e.message;document.body.append(p)});window.gsap=DeepSeekComponentRuntime.gsap;window.__hyperframes={getVariables:()=>(${safeJson(variables)}),parseVisualComponentData:DeepSeekComponentRuntime.parseVisualComponentData,onVariablesChange:()=>()=>{}};`;
  const bridge = `(()=>{const root=document.getElementById('studio-component');function fit(){root.style.transform='scale('+Math.min(innerWidth/${width},innerHeight/${height})+')'}fit();addEventListener('resize',fit);function seek(t){Object.values(window.__timelines||{}).forEach(x=>{x.pause?.();x.seek?.(t)});document.getAnimations().forEach(x=>{x.pause();x.currentTime=t*1000})}window.__studioSeek=seek;window.__studioPoster=()=>seek(.85*Math.max(0,...Object.values(window.__timelines||{}).map(x=>typeof x.duration==='function'?x.duration():0)));window.__studioPoster();addEventListener('message',e=>{if(e.source===parent&&e.data?.type==='studio-seek')seek(e.data.time)})})()`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data: https:; media-src data: https:; style-src 'unsafe-inline' https:; font-src data: https:; script-src 'unsafe-inline'; connect-src 'none'"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:${theme.background};color:${theme.text}}#studio-component{width:${width}px;height:${height}px;position:absolute;transform-origin:0 0;--ipw-color-bg:${theme.background};--ipw-color-text:${theme.text};--ipw-color-primary:${theme.accent};font-family:${escapeHtml(theme.font)}}#studio-component>[data-composition-id]{width:100%;height:100%}</style>${head ? serialize(head) : ""}<script>${runtime}</script><script>${setup}</script></head><body><main id="studio-component" data-composition-id="${escapeHtml(resource.id)}" data-theme-colors="${escapeHtml(JSON.stringify(colors))}">${content}</main><script>${bridge}</script></body></html>`;
}
