var Ye=Object.defineProperty;var Xe=(r,t,e)=>t in r?Ye(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var p=(r,t,e)=>Xe(r,typeof t!="symbol"?t+"":t,e);import{o as Ke,r as Ze,q as Qe,v as Je,x as et,y as tt,z as it,A as rt,C as nt,D as st,E as Te,F as ot,G as at,H as dt}from"./index-CBEtsL5v.js";import"./react-Du6dxUab.js";import"./vendor--base-ui-react-C5Hn0-3T.js";import"./vendor-lucide-react-SZJIz_Zt.js";import"./vendor-zod-B_k1Z5XQ.js";function ut(){return globalThis}function lt(r,t){var n;if(typeof window>"u")return;const e=ut(),i=(n=e.__hf)==null?void 0:n.onSwallowed;if(i)try{i({label:r,error:t})}catch{}(e.__hfDebug||e.__HYPERFRAMES_DEBUG)&&console.debug(`[hyperframes] ${r} swallowed:`,t)}const ht="http://www.w3.org/1999/xhtml";function ct(r){return r!=null&&r.nodeType===1}function pt(r){return ct(r)&&r.namespaceURI===ht}function ue(r,t){return pt(r)&&r.localName===t}function mt(r){return ue(r,"video")}function ft(r){return ue(r,"audio")}function se(r){return mt(r)||ft(r)}function _t(r){return ue(r,"img")}function gt(r){return r.hasRuntime||r.runtimeInjected?!1:!!(r.hasNestedCompositions||r.hasTimelines&&r.attempts>=5)}function G(r){return typeof r=="object"&&r!==null}function yt(r){return G(r)&&typeof r.getDuration=="function"}function bt(r){return G(r)&&typeof r.duration=="function"&&typeof r.time=="function"&&typeof r.seek=="function"&&typeof r.play=="function"&&typeof r.pause=="function"}function vt(r){if(!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(r))throw new Error(`Invalid HyperFrames runtime version: ${r}`);return`https://cdn.jsdelivr.net/npm/@hyperframes/core@${r}/dist/hyperframe.runtime.iife.js`}const q=typeof __HYPERFRAMES_RUNTIME_CDN_URL__=="string"?__HYPERFRAMES_RUNTIME_CDN_URL__:vt("0.0.0-dev");function Y(r){if(r===null)return null;const t=Number.parseInt(r,10);return Number.isFinite(t)&&t>0?t:null}function At(r){const t=(r==null?void 0:r.querySelector("[data-composition-id][data-width][data-height]"))??(r==null?void 0:r.querySelector("[data-width][data-height]"));if(!t)return null;const e=Y(t.getAttribute("data-width")),i=Y(t.getAttribute("data-height"));return e!==null&&i!==null?{width:e,height:i}:null}class wt{constructor(t,e){p(this,"_interval",null);p(this,"_runtimeInjected",!1);this._iframe=t,this._callbacks=e}get runtimeInjected(){return this._runtimeInjected}start(){this.stop(),this._runtimeInjected=!1;let t=0;this._interval=setInterval(()=>{var e;t++;try{const i=this._iframe.contentWindow;if(!i)return;const n=!!(i.__hf||i.__player),s=!!(i.__timelines&&Object.keys(i.__timelines).length>0),o=!!((e=this._iframe.contentDocument)!=null&&e.querySelector("[data-composition-src]"));if(gt({hasRuntime:n,hasTimelines:s,hasNestedCompositions:o,runtimeInjected:this._runtimeInjected,attempts:t})){this._injectRuntime();return}if(this._runtimeInjected&&!n)return;const a=this._resolvePlaybackDurationAdapter(i);if(a&&a.getDuration()>0){this.stop();const h=At(this._iframe.contentDocument);this._callbacks.onReady({duration:a.getDuration(),adapter:a,compositionSize:h});return}}catch{}t>=40&&(this.stop(),this._callbacks.onError("Composition timeline not found after 8s"))},200)}stop(){this._interval!==null&&(clearInterval(this._interval),this._interval=null)}resolveDirectTimelineAdapter(){try{const t=this._iframe.contentWindow;return t?this._resolveDirectTimelineAdapterFromWindow(t):null}catch{return null}}resolveDirectTimelineAdapterFromWindow(t){return this._resolveDirectTimelineAdapterFromWindow(t)}hasRuntimeBridge(t){return Reflect.get(t,"__hf")!==void 0||G(Reflect.get(t,"__player"))}_injectRuntime(){var t,e;this._runtimeInjected=!0;try{const i=this._iframe.contentDocument;if(!i)return;const n=i.createElement("script");n.src=q,(i.head||i.documentElement).appendChild(n),(e=(t=this._callbacks).onRuntimeInjected)==null||e.call(t)}catch{}}_resolveDirectTimelineAdapterFromWindow(t){var a,h;if(this.hasRuntimeBridge(t))return null;const e=Reflect.get(t,"__timelines");if(!G(e))return null;const i=Object.keys(e);if(i.length===0)return null;const n=(h=(a=this._iframe.contentDocument)==null?void 0:a.querySelector("[data-composition-id]"))==null?void 0:h.getAttribute("data-composition-id"),s=n&&n in e?n:i[i.length-1],o=e[s];return bt(o)?o:null}_resolvePlaybackDurationAdapter(t){const e=Reflect.get(t,"__player");if(yt(e))return{kind:"runtime",getDuration:()=>e.getDuration()};const i=this._resolveDirectTimelineAdapterFromWindow(t);return i?{kind:"direct-timeline",timeline:i,getDuration:()=>i.duration()}:null}}const Et=`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    background: #000;
    contain: layout style;
  }

  .hfp-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }


  .hfp-iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    border: none;
    pointer-events: none;
  }

  /* Opt-in: an interactive composition (e.g. a live slideshow/app with playable
     media or controls) — let pointer events reach the iframe content. */
  :host([interactive]) .hfp-container,
  :host([interactive]) .hfp-iframe {
    pointer-events: auto;
  }

  .hfp-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  .hfp-poster {
    position: absolute;
    inset: 0;
    object-fit: contain;
    z-index: 1;
    pointer-events: none;
  }

  .hfp-shader-loader {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: grid;
    place-items: center;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    background: #030504;
    color: #f4f7fb;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
    transition: opacity 420ms ease-out, visibility 420ms ease-out;
  }

  .hfp-shader-loader.hfp-visible,
  .hfp-shader-loader.hfp-hiding {
    visibility: visible;
  }

  .hfp-shader-loader.hfp-visible {
    opacity: 1;
    pointer-events: auto;
  }

  .hfp-shader-loader.hfp-hiding {
    opacity: 0;
    pointer-events: none;
  }

  .hfp-shader-loader-panel {
    display: grid;
    grid-template-rows: 86px 40px 26px 12px 44px;
    justify-items: center;
    align-items: center;
    gap: 8px;
    width: min(620px, 82%);
    text-align: center;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .hfp-shader-loader-mark {
    width: 86px;
    height: 86px;
    display: grid;
    place-items: center;
    overflow: visible;
  }

  .hfp-shader-loader-mark svg {
    display: block;
    overflow: visible;
    filter: drop-shadow(0 0 5px rgba(79, 219, 94, 0.16));
    pointer-events: none;
  }

  .hfp-shader-loader-title {
    width: 100%;
    height: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 26px;
    line-height: 40px;
    font-weight: 700;
    letter-spacing: 0;
  }

  .hfp-shader-loader-title-text {
    color: transparent;
    background: linear-gradient(
      90deg,
      rgba(244, 247, 251, 0.84) 0%,
      #ffffff 42%,
      #80efe4 52%,
      #ffffff 62%,
      rgba(244, 247, 251, 0.84) 100%
    );
    background-size: 220% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    animation: hfp-shader-loader-sheen 1.9s linear infinite;
  }

  .hfp-shader-loader:not(.hfp-visible):not(.hfp-hiding) .hfp-shader-loader-title-text {
    animation-play-state: paused;
  }

  .hfp-shader-loader-detail {
    width: 100%;
    height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(244, 247, 251, 0.62);
    font-size: 15px;
    line-height: 26px;
    font-weight: 500;
  }

  .hfp-shader-loader-track {
    width: min(360px, 100%);
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
  }

  .hfp-shader-loader-fill {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #06e3fa, #4fdb5e);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 160ms ease;
  }

  .hfp-shader-loader-progress {
    width: min(420px, 100%);
    height: 44px;
    display: grid;
    grid-template-rows: repeat(2, 22px);
    color: rgba(244, 247, 251, 0.48);
    font: 600 13px/22px "IBM Plex Mono", "SF Mono", "Fira Code", "Courier New", monospace;
    font-variant-numeric: tabular-nums;
  }

  .hfp-shader-loader-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 74px;
    align-items: center;
    column-gap: 20px;
    width: 100%;
    white-space: nowrap;
  }

  .hfp-shader-loader-label {
    min-width: 0;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
  }

  .hfp-shader-loader-value {
    text-align: right;
  }

  @keyframes hfp-shader-loader-sheen {
    from {
      background-position: 140% 0;
    }
    to {
      background-position: -140% 0;
    }
  }

  /* ── Theming via CSS custom properties ──
   *
   * Override from outside the shadow DOM:
   *   hyperframes-player {
   *     --hfp-controls-bg: linear-gradient(transparent, rgba(0,0,0,0.9));
   *     --hfp-accent: #ff6b6b;
   *     --hfp-font: "Inter", sans-serif;
   *   }
   */

  .hfp-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: var(--hfp-controls-gap, 12px);
    padding: var(--hfp-controls-padding, 8px 16px);
    background: var(--hfp-controls-bg, linear-gradient(transparent, rgba(0, 0, 0, 0.7)));
    color: var(--hfp-color, #fff);
    font-family: var(--hfp-font, system-ui, -apple-system, sans-serif);
    font-size: var(--hfp-font-size, 13px);
    z-index: 10;
    pointer-events: auto;
    opacity: 1;
    transition: opacity 0.3s ease;
    user-select: none;
  }

  .hfp-controls.hfp-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .hfp-play-btn {
    position: relative;
    background: none;
    border: none;
    color: var(--hfp-color, #fff);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    z-index: 10;
  }

  .hfp-play-btn:hover {
    opacity: 0.8;
  }

  /* Stacked play/pause glyphs that crossfade-morph on toggle (rotate + scale). */
  .hfp-play-btn .hfp-ico {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 200ms ease,
      transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hfp-play-btn .hfp-ico-play {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
  .hfp-play-btn .hfp-ico-pause {
    opacity: 0;
    transform: rotate(-90deg) scale(0.4);
  }
  .hfp-play-btn.hfp-playing .hfp-ico-play {
    opacity: 0;
    transform: rotate(90deg) scale(0.4);
  }
  .hfp-play-btn.hfp-playing .hfp-ico-pause {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
  @media (prefers-reduced-motion: reduce) {
    .hfp-play-btn .hfp-ico {
      transition-duration: 0ms;
      transform: none;
    }
  }

  .hfp-play-btn svg,
  .hfp-play-btn svg * {
    pointer-events: none;
  }

  .hfp-scrubber {
    flex: 1;
    min-width: 0;
    height: var(--hfp-scrubber-height, 4px);
    background: var(--hfp-scrubber-bg, rgba(255, 255, 255, 0.3));
    border-radius: var(--hfp-scrubber-radius, 2px);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .hfp-scrubber:hover {
    height: var(--hfp-scrubber-height-hover, 6px);
  }

  .hfp-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--hfp-accent, #fff);
    pointer-events: none;
  }

  .hfp-time {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    opacity: 0.9;
  }

  .hfp-speed-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .hfp-speed-btn {
    background: var(--hfp-speed-btn-bg, rgba(255, 255, 255, 0.15));
    border: none;
    border-radius: var(--hfp-speed-btn-radius, 4px);
    color: var(--hfp-color, #fff);
    cursor: pointer;
    font-family: var(--hfp-font, system-ui, -apple-system, sans-serif);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    padding: 4px 8px;
    min-width: 40px;
    text-align: center;
    transition: background 0.15s ease;
  }

  .hfp-speed-btn:hover {
    background: var(--hfp-speed-btn-bg-hover, rgba(255, 255, 255, 0.3));
  }

  .hfp-speed-menu {
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    background: var(--hfp-menu-bg, rgba(20, 20, 20, 0.95));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--hfp-menu-border, rgba(255, 255, 255, 0.1));
    border-radius: var(--hfp-menu-radius, 8px);
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 80px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
    box-shadow: var(--hfp-menu-shadow, 0 8px 24px rgba(0, 0, 0, 0.4));
  }

  .hfp-speed-menu.hfp-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .hfp-speed-option {
    background: none;
    border: none;
    border-radius: 4px;
    color: var(--hfp-menu-color, rgba(255, 255, 255, 0.7));
    cursor: pointer;
    font-family: var(--hfp-font, system-ui, -apple-system, sans-serif);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    padding: 6px 12px;
    text-align: left;
    transition: background 0.1s ease, color 0.1s ease;
    white-space: nowrap;
  }

  .hfp-speed-option:hover {
    background: var(--hfp-menu-hover-bg, rgba(255, 255, 255, 0.1));
    color: var(--hfp-color, #fff);
  }

  .hfp-speed-option.hfp-active {
    color: var(--hfp-accent, #fff);
    font-weight: 600;
  }

  .hfp-volume-wrap {
    position: relative;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0;
  }

  .hfp-mute-btn {
    background: none;
    border: none;
    color: var(--hfp-color, #fff);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .hfp-mute-btn:hover {
    opacity: 0.8;
  }

  .hfp-mute-btn svg,
  .hfp-mute-btn svg * {
    pointer-events: none;
  }

  .hfp-volume-slider-wrap {
    width: 0;
    overflow: hidden;
    transition: width 0.2s ease;
    display: flex;
    align-items: center;
  }

  .hfp-volume-wrap:hover .hfp-volume-slider-wrap {
    width: 64px;
  }

  .hfp-volume-slider {
    width: 56px;
    height: var(--hfp-scrubber-height, 4px);
    background: var(--hfp-scrubber-bg, rgba(255, 255, 255, 0.3));
    border-radius: var(--hfp-scrubber-radius, 2px);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 4px;
    margin-right: 4px;
  }

  .hfp-volume-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--hfp-accent, #fff);
    pointer-events: none;
  }
`,St='<svg width="24" height="24" viewBox="46 21 54 56" fill="currentColor"><path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z"/></svg>',Rt='<svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="2" width="4" height="14"/><rect x="11" y="2" width="4" height="14"/></svg>',Ce='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',Me='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',Tt='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" opacity="0.3"/><line x1="18" y1="7" x2="14" y2="17" stroke="currentColor" stroke-width="2"/></svg>',Ct=[.25,.5,1,1.5,2,4];function Z(r){return Number.isInteger(r)?`${r}x`:`${r}x`}function Pe(r){if(!Number.isFinite(r)||r<0)return"0:00";const t=Math.floor(r),e=Math.floor(t/60),i=t%60;return`${e}:${i.toString().padStart(2,"0")}`}function Mt(r,t,e={}){const i=e.speedPresets??Ct,n=document.createElement("div");n.className="hfp-controls",n.addEventListener("click",l=>{l.stopPropagation()});const s=document.createElement("button");s.className="hfp-play-btn",s.type="button",s.innerHTML=`<span class="hfp-ico hfp-ico-play">${St}</span><span class="hfp-ico hfp-ico-pause">${Rt}</span>`,s.setAttribute("aria-label","Play");const o=document.createElement("div");o.className="hfp-scrubber";const a=document.createElement("div");a.className="hfp-progress",a.style.width="0%",o.appendChild(a);const h=document.createElement("span");h.className="hfp-time",h.textContent="0:00 / 0:00";const c=document.createElement("div");c.className="hfp-speed-wrap";const u=document.createElement("button");u.className="hfp-speed-btn",u.type="button",u.textContent="1x",u.setAttribute("aria-label","Playback speed");const b=document.createElement("div");b.className="hfp-speed-menu",b.setAttribute("role","menu");for(const l of i){const f=document.createElement("button");f.className="hfp-speed-option",f.type="button",f.setAttribute("role","menuitem"),f.dataset.speed=String(l),f.textContent=Z(l),l===1&&f.classList.add("hfp-active"),b.appendChild(f)}c.appendChild(b),c.appendChild(u);const g=document.createElement("div");g.className="hfp-volume-wrap";const d=document.createElement("button");d.className="hfp-mute-btn",d.type="button",d.innerHTML=Ce,d.setAttribute("aria-label","Mute");const _=document.createElement("div");_.className="hfp-volume-slider-wrap";const m=document.createElement("div");m.className="hfp-volume-slider",m.setAttribute("role","slider"),m.setAttribute("aria-label","Volume"),m.setAttribute("aria-valuemin","0"),m.setAttribute("aria-valuemax","100"),m.setAttribute("aria-valuenow","100"),m.tabIndex=0;const y=document.createElement("div");y.className="hfp-volume-fill",y.style.width="100%",m.appendChild(y),_.appendChild(m),g.appendChild(_),g.appendChild(d),e.audioLocked&&(g.style.display="none"),n.appendChild(s),n.appendChild(o),n.appendChild(h),n.appendChild(g),n.appendChild(c),r.appendChild(n);let w=!1,v=!1,A=1,C=null;i.indexOf(1);const S=(l,f)=>l?Tt:f===0||f<.5?Me:Ce;s.addEventListener("click",l=>{l.stopPropagation(),w?t.onPause():t.onPlay()}),d.addEventListener("click",l=>{l.stopPropagation(),t.onMuteToggle()});let R=!1;const D=l=>{const f=m.getBoundingClientRect(),E=Math.max(0,Math.min(1,(l-f.left)/f.width));A=E,y.style.width=`${E*100}%`,m.setAttribute("aria-valuenow",String(Math.round(E*100))),v&&E>0&&t.onMuteToggle(),d.innerHTML=S(v,E),t.onVolumeChange(E)};m.addEventListener("mousedown",l=>{l.stopPropagation(),R=!0,D(l.clientX)});const I=l=>{R&&D(l.clientX)},pe=()=>{R=!1};document.addEventListener("mousemove",I),document.addEventListener("mouseup",pe),m.addEventListener("touchstart",l=>{R=!0;const f=l.touches[0];f&&D(f.clientX)},{passive:!0});const me=l=>{if(R){const f=l.touches[0];f&&D(f.clientX)}},fe=()=>{R=!1};document.addEventListener("touchmove",me,{passive:!0}),document.addEventListener("touchend",fe);const _e=.05;m.addEventListener("keydown",l=>{let f=A;if(l.key==="ArrowRight"||l.key==="ArrowUp")f=Math.min(1,A+_e);else if(l.key==="ArrowLeft"||l.key==="ArrowDown")f=Math.max(0,A-_e);else return;l.preventDefault(),l.stopPropagation(),A=f,y.style.width=`${f*100}%`,m.setAttribute("aria-valuenow",String(Math.round(f*100))),v&&f>0&&t.onMuteToggle(),d.innerHTML=S(v,f),t.onVolumeChange(f)});const ge=l=>{for(const f of b.querySelectorAll(".hfp-speed-option"))f.classList.toggle("hfp-active",f.dataset.speed===String(l))};u.addEventListener("click",l=>{l.stopPropagation();const f=b.classList.toggle("hfp-open");u.setAttribute("aria-expanded",String(f))}),b.addEventListener("click",l=>{l.stopPropagation();const f=l.target.closest(".hfp-speed-option");if(!f)return;const E=parseFloat(f.dataset.speed);i.indexOf(E),u.textContent=Z(E),ge(E),b.classList.remove("hfp-open"),u.setAttribute("aria-expanded","false"),t.onSpeedChange(E)});const ye=()=>{b.classList.remove("hfp-open"),u.setAttribute("aria-expanded","false")};document.addEventListener("click",ye);const U=l=>{const f=o.getBoundingClientRect(),E=Math.max(0,Math.min(1,(l-f.left)/f.width));t.onSeek(E)};let M=!1;o.addEventListener("mousedown",l=>{var f;l.stopPropagation(),M=!0,(f=t.onScrubStart)==null||f.call(t),U(l.clientX)});const be=l=>{M&&U(l.clientX)},ve=()=>{var l;M&&(M=!1,(l=t.onScrubEnd)==null||l.call(t))};document.addEventListener("mousemove",be),document.addEventListener("mouseup",ve),o.addEventListener("touchstart",l=>{var E;M=!0,(E=t.onScrubStart)==null||E.call(t);const f=l.touches[0];f&&U(f.clientX)},{passive:!0});const Ae=l=>{if(M){const f=l.touches[0];f&&U(f.clientX)}},we=()=>{var l;M&&(M=!1,(l=t.onScrubEnd)==null||l.call(t))};document.addEventListener("touchmove",Ae,{passive:!0}),document.addEventListener("touchend",we);const Ee=()=>{C&&clearTimeout(C),C=setTimeout(()=>{w&&n.classList.add("hfp-hidden")},3e3)},W=r instanceof ShadowRoot?r.host:r,Se=()=>{n.classList.remove("hfp-hidden"),Ee()},Re=()=>{w&&n.classList.add("hfp-hidden")};return W.addEventListener("mousemove",Se),W.addEventListener("mouseleave",Re),{updateTime(l,f){const E=f>0?Math.min(l,f):l,Ge=f>0?E/f*100:0;a.style.width=`${Ge}%`,h.textContent=`${Pe(E)} / ${Pe(f)}`},updatePlaying(l){w=l,s.classList.toggle("hfp-playing",l),s.setAttribute("aria-label",l?"Pause":"Play"),l?Ee():n.classList.remove("hfp-hidden")},updateSpeed(l){i.indexOf(l),u.textContent=Z(l),ge(l)},updateMuted(l){v=l,d.innerHTML=S(l,A),d.setAttribute("aria-label",l?"Unmute":"Mute")},updateVolume(l){A=l,y.style.width=`${l*100}%`,m.setAttribute("aria-valuenow",String(Math.round(l*100))),d.innerHTML=S(v,l)},setVolumeControlsHidden(l){g.style.display=l?"none":""},show(){n.style.display=""},hide(){n.style.display="none"},destroy(){document.removeEventListener("mousemove",be),document.removeEventListener("mouseup",ve),document.removeEventListener("touchmove",Ae),document.removeEventListener("touchend",we),document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",pe),document.removeEventListener("touchmove",me),document.removeEventListener("touchend",fe),document.removeEventListener("click",ye),W.removeEventListener("mousemove",Se),W.removeEventListener("mouseleave",Re),C&&clearTimeout(C),n.remove()}}}function Pt(r,t,e,i,n,s=!1){const o=i?i.split(",").map(Number).filter(c=>!isNaN(c)&&c>0):void 0,a={...o?{speedPresets:o}:{},audioLocked:s},h=Mt(r,n,a);return h.updateMuted(t),h.updateVolume(e),h}function De(r,t,e){return t?(e||(e=document.createElement("img"),e.className="hfp-poster",r.appendChild(e)),e.src=t,e):(e==null||e.remove(),null)}function Dt(r){return r.composedPath().some(t=>t instanceof HTMLElement&&t.classList.contains("hfp-controls"))}let $=null;function Lt(r,t){if(typeof CSSStyleSheet<"u")try{$||($=new CSSStyleSheet,$.replaceSync(t)),r.adoptedStyleSheets=[$];return}catch{}const e=document.createElement("style");e.textContent=t,r.appendChild(e)}function It(){const r=document.createElement("div");r.className="hfp-container";const t=document.createElement("iframe");return t.className="hfp-iframe",t.sandbox.add("allow-scripts","allow-same-origin"),t.allow="autoplay; fullscreen",t.referrerPolicy="no-referrer",t.title="HyperFrames Composition",r.appendChild(t),{container:r,iframe:t}}function xt(r,t,e,i){const n=r.offsetWidth,s=r.offsetHeight;if(n===0||s===0)return!1;const o=Math.min(n/e,s/i);return t.style.width=`${e}px`,t.style.height=`${i}px`,t.style.transform=`translate(-50%, -50%) scale(${o})`,!0}const kt=100,Ot=.001;function Ft(r,t,e){if(e.end<=0)return!1;const i=e.shown<e.end&&t>0?t+Ot:0;return r+i>=e.end}class Nt{constructor(t){p(this,"_raf",null);p(this,"_lastUpdateMs",0);p(this,"_tick",null);this._callbacks=t}start(t,e,i,n,s){this.stop();let o=null,a=0,h=0;const c=()=>{if(n()){this._raf=null;return}let u;try{u=t.time()}catch{this._raf=null;return}const b=i(),g=s();g.end>0&&(u=Math.min(u,g.end));const d=o===null?0:u-o;d!==0&&(h=Math.min(d,a),a=d),o=u;const _=Ft(u,h,g);_&&(u=g.shown);const m=performance.now();if((m-this._lastUpdateMs>kt||_)&&(this._lastUpdateMs=m,this._callbacks.onTimeUpdate(u,b)),_){if(this._callbacks.getLoop()){this._callbacks.restart();return}try{t.pause(),g.shown<g.end&&t.seek(g.shown,!1)}catch{}this._callbacks.onPaused(),this._raf=null;return}this._raf=requestAnimationFrame(c)};this._tick=c,this._raf=requestAnimationFrame(c)}poll(){this._raf===null||!this._tick||(cancelAnimationFrame(this._raf),this._tick())}stop(){this._raf!==null&&(cancelAnimationFrame(this._raf),this._raf=null)}get isRunning(){return this._raf!==null}}function Vt(r){const t=Array.from(r.querySelectorAll("[data-composition-id]"));if(t.length===0)return r.body?[r.body]:[];const e=[];for(const i of t)Ut(i)||e.push(i);return Ht(r),e}function Ht(r){const t=r.body;if(!t||typeof console>"u"||typeof console.warn!="function")return;const e=t.querySelectorAll("audio[data-start], video[data-start]");if(e.length===0)return;const i=[];for(const n of e)n.closest("[data-composition-id]")||i.push(n);i.length!==0&&console.warn(`[hyperframes-player] selectMediaObserverTargets: composition hosts are present, but ${i.length} body-level timed media element(s) sit outside every [data-composition-id] subtree and will not be observed. Move them inside a composition host or the parent-frame proxy will never adopt them.`,i)}function Ut(r){let t=r.parentElement;for(;t;){if(t.hasAttribute("data-composition-id"))return!0;t=t.parentElement}return!1}const Wt="data-hf-authored-duration",$t="data-hf-authored-end";function x(r){if(r==null||typeof r=="string"&&r.trim()==="")return null;const t=typeof r=="number"?r:Number(r);return Number.isFinite(t)?t:null}function Le(r){const t=x(r.start);if(t==null)return null;const e=Math.max(0,t),i=x(r.duration),n=x(r.authoredDuration),s=i!=null&&i>0?i:n!=null&&n>0?n:null;if(s!=null)return{start:e,duration:s,end:e+s};const o=x(r.end),a=x(r.authoredEnd),h=o!=null&&o>e?o:a!=null&&a>e?a:null;return{start:e,duration:h==null?null:h-e,end:h}}function X(r){return Ke(r)}function zt(r){return rt(t=>r.getAttribute(t),se(r)?r.defaultPlaybackRate:1)}function jt(r){return tt(r.getAttribute("data-automation"),zt(r))}function qt(r){return it(t=>r.getAttribute(t))}function Bt(r,t){return Yt(t,qt(r),jt(r))}function Gt(r,t=0){return!_t(r)||!r.hasAttribute("data-start")&&!r.hasAttribute("data-track-index")?null:Ze({authoredDurationSeconds:Qe(e=>r.getAttribute(e),t)}).seconds}function Yt(r,t,e){return typeof e=="number"?Je(r,t,e):Number.isFinite(r)?et(e,Math.max(0,r-t)):null}const Xt="data-hf-media-start-basis";function We(r){return(r==null?void 0:r.trim().toLowerCase())==="global"?"global":"local"}function Kt(r){return We(r.basis)==="global"?r.authoredStart:r.hostStart+r.authoredStart}function Zt(r){return $e(r)?Kt({authoredStart:r.authoredStart,hostStart:r.hostStart,basis:r.basis}):r.ordinaryStart()}function Qt(r){return $e(r)&&We(r.basis)==="global"}function $e(r){return!r.hasAutoStart&&r.authoredStart!=null&&r.hostStart>0}function le(r){if(!r.hasAttribute("data-composition-id")&&!r.hasAttribute("data-composition-src")&&!r.hasAttribute("data-composition-file"))return 1;const t=X(r.getAttribute("data-playback-rate"));return t!=null&&t>0?t:1}function Ie(r){return r.hasAttribute("data-source-duration")?Math.max(0,X(r.getAttribute("data-playback-start"))??0):0}function Jt(r){let t=r;for(;t;){if(t.hasAttribute("data-source-duration")&&le(t)>0&&(t.hasAttribute("data-composition-id")||t.hasAttribute("data-composition-src")||t.hasAttribute("data-composition-file")))return!0;t=V(t)}return!1}function V(r){var t;return((t=r.parentElement)==null?void 0:t.closest("[data-composition-id]:not([data-hf-inner-root])"))??null}function P(r){let t=1,e=V(r);for(;e;)t*=le(e),e=V(e);return t}function ei(r){const t=r.timelineRegistry??{},e=r.documentRef??document,i=new WeakMap,n=new WeakMap,s=new Set,o=d=>{const _=e.getElementById(d);return _||(e.querySelector(`[data-composition-id="${CSS.escape(d)}"]`)??null)},a=d=>{const _=n.get(d);if(_!==void 0)return _;let m=null;const y=Le({start:0,duration:d.getAttribute("data-duration"),authoredDuration:d.getAttribute("data-hf-authored-duration")});if((y==null?void 0:y.duration)!=null&&y.duration>0&&(m=y.duration/P(d)),m==null||m<=0){const w=c(d,0),v=Le({start:w,end:d.getAttribute("data-end"),authoredEnd:d.getAttribute("data-hf-authored-end")});if((v==null?void 0:v.duration)!=null&&v.duration>0)if(Jt(d)){const A=V(d),C=A?c(A,0):0,S=A?Ie(A):0,R=X(d.getAttribute("data-end")??d.getAttribute("data-hf-authored-end"));R!=null&&(m=C+(R-S)/P(d)-w)}else m=v.duration}if((m==null||m<=0)&&se(d)&&(m=Bt(d,d.duration),m!=null&&(m/=P(d))),(m==null||m<=0)&&(m=Gt(d)),m==null||m<=0){const w=d.getAttribute("data-composition-id");if(w){const v=t[w]??null;if(v&&typeof v.duration=="function")try{const A=Number(v.duration());Number.isFinite(A)&&A>0&&(m=A/(le(d)*P(d)))}catch(A){lt("runtime.startResolver.site1",A)}}}return m!=null&&Number.isFinite(m)&&m>0?(n.set(d,m),m):(n.set(d,null),null)},h=(d,_)=>{var y;if(d.hasAttribute("data-composition-id")){const w=(y=d.parentElement)==null?void 0:y.closest("[data-composition-id]:not([data-hf-inner-root])");return w?c(w,_):0}const m=d.closest("[data-composition-id]");return m?c(m,_):0},c=(d,_)=>{const m=i.get(d);if(m!==void 0)return m??_;if(s.has(d))return _;s.add(d);try{const y=nt(d.getAttribute("data-start"));if(!y){if(d.hasAttribute("data-composition-id")){const S=d.parentElement;if(S&&(S.hasAttribute("data-composition-src")||S.hasAttribute("data-composition-id")||S.hasAttribute("data-composition-file"))){const R=c(S,_);return i.set(d,R),R}}return i.set(d,_),_}if(y.kind==="absolute"){const S=Math.max(0,y.value),R=V(d),D=R?Ie(R):0,I=Math.max(0,h(d,_)+(S-D)/P(d));return i.set(d,I),I}const w=o(y.refId);if(!w)return i.set(d,_),_;const v=c(w,0),A=a(w);if(A==null||A<=0){const S=Math.max(0,v+y.offset/P(d));return i.set(d,S),S}const C=Math.max(0,v+A+y.offset/P(d));return i.set(d,C),C}finally{s.delete(d)}},u=d=>{const _=d.closest("[data-composition-id]");return{authoredStart:X(d.getAttribute("data-start")),hostStart:_?c(_,0):0,hasAutoStart:d.hasAttribute("data-hf-auto-start"),basis:d.getAttribute(Xt)}};return{resolveStartForElement:(d,_=0)=>c(d,Math.max(0,_)),resolveDurationForElement:d=>a(d),resolveMediaStartForElement:d=>{const _=u(d);return Zt({..._,ordinaryStart:()=>c(d,_.hostStart)})},resolveHostStartForElement:d=>h(d,0),isRootGlobalMediaStartForElement:d=>se(d)&&Qt(u(d))}}const ti=r=>4*Number.EPSILON*Math.max(1,Math.abs(r));function ze(r,t){return!Number.isFinite(r)||!Number.isFinite(t)?r===t:Math.abs(r-t)<=ti(Math.max(Math.abs(r),Math.abs(t)))}const je=(r,t)=>r>=t||ze(r,t),qe=(r,t,e)=>je(r,t)&&r<e&&!ze(r,e),ii=1e-6,ri=(r,t,e,i)=>qe(r,t,e)||je(r,t)&&i>0&&e>=i-ii;function ni(r,t){const e=r.tagName.toLowerCase();if(e==="script"||e==="style"||e==="link"||e==="meta")return!1;const n=e==="video"||e==="audio"?t.resolver.resolveMediaStartForElement(r):t.resolver.resolveStartForElement(r,0);let s=t.resolver.resolveDurationForElement(r);const o=r.getAttribute("data-composition-id");if(o){const c=t.timelineRegistry[o],u=c&&typeof c.duration=="function"?Number(c.duration()):null;!(r.hasAttribute("data-duration")||r.hasAttribute("data-end")||r.hasAttribute(Wt)||r.hasAttribute($t))&&(s==null||s<=0)&&u!=null&&Number.isFinite(u)&&u>0&&(s=u)}const a=s!=null&&s>0?n+s:Number.POSITIVE_INFINITY,h={start:n,end:a};return ri(t.currentTime,h.start,h.end,t.compositionDuration)}const H="first-frame",si=3;function oe(r){var e;const t=(e=r.ownerDocument)==null?void 0:e.defaultView;return t&&r instanceof t.Element?!0:r instanceof Element}function T(r){var e;if(!oe(r)||r.tagName!=="AUDIO"&&r.tagName!=="VIDEO")return!1;const t=(e=r.ownerDocument)==null?void 0:e.defaultView;return t&&r instanceof t.HTMLMediaElement?!0:r instanceof HTMLMediaElement}function oi(r){return r.hasAttribute("data-start")||r.hasAttribute("data-track-index")}function ai(r,t,e,i){let n=r;for(;n;){if(oi(n)&&!ni(n,{currentTime:i,compositionDuration:Number.POSITIVE_INFINITY,timelineRegistry:e,resolver:t}))return!1;n=n.parentElement}return!0}function xe(r,t,e,i,n){return t==="all"?!0:ai(r,e,i,n)}function ae(r,{scope:t="all",currentTime:e=0}={}){var c;const i=r.defaultView,n=ei({documentRef:r,timelineRegistry:i==null?void 0:i.__timelines}),s=r.querySelector(`meta[name="${st}"]`)!==null,o=Array.from(r.querySelectorAll("video, audio")).filter(T).filter(u=>xe(u,s&&u.preload!=="auto"?H:t,n,(i==null?void 0:i.__timelines)??{},e)).filter(u=>u.readyState<si),a=Array.from(r.querySelectorAll("img")).filter(u=>{var b;return xe(u,((b=u.getAttribute("loading"))==null?void 0:b.toLowerCase())==="lazy"?H:t,n,(i==null?void 0:i.__timelines)??{},e)}).filter(u=>!u.complete),h=((c=r.fonts)==null?void 0:c.status)==="loading";return{pendingMedia:o,pendingImages:a,fontsLoading:h}}function di(r,{pendingMedia:t,pendingImages:e,fontsLoading:i},n){const s=t.map(h=>new Promise(c=>{if(h.error){c();return}const u=()=>{h.removeEventListener("canplay",u),h.removeEventListener("error",u),n.removeEventListener("abort",u),c()};h.addEventListener("canplay",u),h.addEventListener("error",u),n.addEventListener("abort",u,{once:!0})})),o=e.map(h=>h.decode?h.decode().catch(()=>{}):Promise.resolve()),a=i&&r.fonts?r.fonts.ready.then(()=>{}):Promise.resolve();return Promise.all([...s,...o,a]).then(()=>{})}function ui(r,t,{scope:e="all",currentTime:i=0}={}){const n=ae(r,{scope:e,currentTime:i});return n.pendingMedia.length===0&&n.pendingImages.length===0&&!n.fontsLoading?null:di(r,n,t)}const li=50;function hi(r,t){const e=r.defaultView;return!e||e.__renderReady||!e.__hf?null:new Promise(i=>{let n;const s=()=>{n!==void 0&&clearTimeout(n),t.removeEventListener("abort",s),i()};if(t.aborted){s();return}t.addEventListener("abort",s,{once:!0});const o=()=>{if(e.__renderReady){s();return}n=setTimeout(o,li)};o()})}const ci=50,pi=1.5,mi=2,fi=1500;function Q(r,t){return new Promise(e=>{if(t.aborted){e(-1);return}let i=0;const n=()=>{var s;(s=r.cancelAnimationFrame)==null||s.call(r,i),e(-1)};t.addEventListener("abort",n,{once:!0}),i=r.requestAnimationFrame(s=>{t.removeEventListener("abort",n),e(s)})})}function _i(r,t){const e=r.defaultView;return e?(async()=>{const i=await Q(e,t);if(t.aborted)return;let n=await Q(e,t),s=n-i,o=0;for(;!t.aborted&&o<mi;){if(n-i>=fi)return;const a=await Q(e,t);if(t.aborted)return;const h=a-n;s=Math.min(s,h),o=h<ci||h<=s*pi?o+1:0,n=a}})():null}const gi=8e3;function yi(r,t,e={}){const i=e.inputs??[(c,u)=>ui(c,u,{scope:e.scope,currentTime:e.currentTime}),hi,_i],n=new AbortController,s=i.map(c=>c(r,n.signal)).filter(c=>c!==null);if(s.length===0){t({timedOut:!1});return}const o=e.timeoutMs??gi;let a;const h=new Promise(c=>{a=setTimeout(()=>c("timed-out"),o)});Promise.race([Promise.all(s).then(()=>"done"),h]).then(c=>{clearTimeout(a),n.abort(),t({timedOut:c==="timed-out"})})}function bi(r,t,e={}){yi(r,t,{...e,scope:H})}const vi=.05,Ai=2;class wi{constructor(t){p(this,"_entries",[]);p(this,"_mediaObserver");p(this,"_playbackErrorPosted",!1);p(this,"_audioOwner","runtime");p(this,"_urlAudioEntry",null);p(this,"_urlAudioSrc",null);p(this,"_dispatchEvent");p(this,"_getMuted");p(this,"_getVolume");p(this,"_getPlaybackRate");p(this,"_getCurrentTime");p(this,"_isPaused");this._dispatchEvent=t.dispatchEvent,this._getMuted=t.getMuted,this._getVolume=t.getVolume,this._getPlaybackRate=t.getPlaybackRate,this._getCurrentTime=t.getCurrentTime,this._isPaused=t.isPaused}get audioOwner(){return this._audioOwner}get entries(){return this._entries}resetForIframeLoad(){this._playbackErrorPosted=!1;const t=this._audioOwner==="parent";this._audioOwner="runtime",this.pauseAll();for(const e of this._entries)e!==this._urlAudioEntry&&(e.el.src="");this._entries=this._urlAudioEntry?[this._urlAudioEntry]:[],this._urlAudioSrc&&!this._urlAudioEntry&&(this._urlAudioEntry=this._createEntry(this._urlAudioSrc,"audio",0,1/0)),this.teardownObserver(),t&&this._dispatchEvent(new CustomEvent("audioownershipchange",{detail:{owner:"runtime",reason:"iframe-reload"}}))}destroy(){this.teardownObserver();for(const t of this._entries)t.el.pause(),t.el.src="";this._entries=[],this._urlAudioEntry=null,this._urlAudioSrc=null,this._audioOwner="runtime",this._playbackErrorPosted=!1}updateMuted(t){for(const e of this._entries)e.el.muted=t}updateVolume(t){for(const e of this._entries)e.el.volume=t}updatePlaybackRate(t){for(const e of this._entries)e.el.playbackRate=t}_playEntry(t){t.el.src&&t.el.play().catch(e=>this._reportPlaybackError(e))}_playEntryIfActive(t){this._refreshEntryBounds(t),this._inWindow(t,this._getCurrentTime())&&this._playEntry(t)}_refreshEntryBounds(t){var i;if(!((i=t.source)!=null&&i.isConnected))return;const e=Te(t.source);t.start=e.start??0,t.duration=e.duration!=null&&e.duration>0?e.duration:Number.POSITIVE_INFINITY}_inWindow(t,e){return qe(e,t.start,t.start+t.duration)}_gateEntryPlayback(t,e){return this._inWindow(t,e)?(this._audioOwner==="parent"&&!this._isPaused()&&t.el.paused&&this._playEntry(t),!0):(t.el.paused||t.el.pause(),t.driftSamples=0,!1)}playAll(){for(const t of this._entries)this._playEntryIfActive(t)}pauseAll(){for(const t of this._entries)t.el.pause()}stopAdoptedMedia(){for(const t of this._entries)t.source&&t.el.pause()}seekAll(t){for(const e of this._entries)this._refreshEntryBounds(e),this._inWindow(e,t)&&(e.el.currentTime=t-e.start)}scrubAll(t){for(const e of this._entries)this._refreshEntryBounds(e),this._inWindow(e,t)?(e.el.currentTime=t-e.start,this._playEntry(e)):e.el.paused||e.el.pause()}mirrorTime(t,e){const i=(e==null?void 0:e.force)===!0;for(const n of this._entries){if(this._refreshEntryBounds(n),!this._gateEntryPlayback(n,t))continue;const s=t-n.start;Math.abs(n.el.currentTime-s)>vi?(n.driftSamples+=1,(i||n.driftSamples>=Ai)&&(n.el.currentTime=s,n.driftSamples=0)):n.driftSamples=0}}promoteToParentProxy(t,e){if(this._audioOwner==="parent")return;if(this._audioOwner="parent",t)for(const n of t.querySelectorAll("video, audio"))T(n)&&(n.muted=!0);for(const n of[...this._entries])this._repointToSource(n);const i=this._getCurrentTime();e?e(i,{force:!0}):this.mirrorTime(i,{force:!0}),this._isPaused()||this.playAll(),this._dispatchEvent(new CustomEvent("audioownershipchange",{detail:{owner:"parent",reason:"autoplay-blocked"}}))}setupFromIframe(t){const e=t.querySelectorAll("audio[data-start], video[data-start]");for(const i of e)T(i)&&this._adoptIframeMedia(i);this._observeDynamicMedia(t)}setupFromUrl(t){if(this._urlAudioSrc===t&&this._urlAudioEntry)return;this.teardownUrlAudio();const e=this._createEntry(t,"audio",0,1/0);this._urlAudioEntry=e,this._urlAudioSrc=t,e&&this._audioOwner==="parent"&&!this._isPaused()&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this.playAll())}teardownUrlAudio(){const t=this._urlAudioEntry;if(this._urlAudioEntry=null,this._urlAudioSrc=null,!t)return;t.el.pause(),t.el.src="";const e=this._entries.indexOf(t);e!==-1&&this._entries.splice(e,1)}teardownObserver(){var t;(t=this._mediaObserver)==null||t.disconnect(),this._mediaObserver=void 0}_reportPlaybackError(t){this._playbackErrorPosted||(this._playbackErrorPosted=!0,this._dispatchEvent(new CustomEvent("playbackerror",{detail:{source:"parent-proxy",error:t}})))}_createEntry(t,e,i,n,s){if(this._urlTaken(t))return null;const o=e==="video"?document.createElement("video"):new Audio;o.preload="auto",o.src=t,o.load(),o.muted=this._getMuted(),o.volume=this._getVolume();const a=this._getPlaybackRate();a!==1&&(o.playbackRate=a);const h={el:o,start:i,duration:n,driftSamples:0,source:s};return this._entries.push(h),h}_resolveIframeMediaSrc(t){var i;const e=t.getAttribute("src")||((i=t.querySelector("source"))==null?void 0:i.getAttribute("src"));return e?new URL(e,t.ownerDocument.baseURI).href:null}_adoptIframeMedia(t){if(t.preload==="metadata"||t.preload==="none")return;const e=this._resolveIframeMediaSrc(t);if(!e)return;const i=Te(t),n=i.start??0,s=i.duration??Number.POSITIVE_INFINITY,o=t.tagName==="VIDEO"?"video":"audio",a=this._createEntry(e,o,n,s,t);a&&this._audioOwner==="parent"&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this._isPaused()||this._playEntryIfActive(a))}_followIframeMediaSrc(t){const e=this._entries.find(i=>i.source===t);if(!e)return this._adoptIframeMedia(t);this._audioOwner!=="parent"||!this._repointToSource(e)||(this.mirrorTime(this._getCurrentTime(),{force:!0}),this._isPaused()||this._playEntryIfActive(e))}_urlTaken(t,e){return this._entries.some(i=>i===e||i.source&&!i.source.isConnected?!1:(i.source&&this._resolveIframeMediaSrc(i.source)||i.el.src)===t)}_repointToSource(t){const e=t.source?this._resolveIframeMediaSrc(t.source):null;return!e||t.el.src===e?!1:this._urlTaken(e,t)?(this._removeEntry(t),!1):(t.el.src=e,t.el.load(),!0)}_detachIframeMedia(t){const e=this._entries.find(i=>i.source===t);e&&this._removeEntry(e)}_removeEntry(t){t.el.pause(),t.el.src="",this._entries.splice(this._entries.indexOf(t),1)}_observeDynamicMedia(t){if(this.teardownObserver(),typeof MutationObserver>"u"||!t.body)return;const e=new MutationObserver(s=>{for(const o of s){if(o.type==="attributes"&&o.attributeName==="src"){const a=o.target;T(a)&&a.matches("audio[data-start], video[data-start]")&&this._followIframeMediaSrc(a);continue}if(o.type==="attributes"&&o.attributeName==="preload"){const a=o.target;T(a)&&a.matches("audio[data-start], video[data-start]")&&(a.preload==="auto"?this._adoptIframeMedia(a):this._detachIframeMedia(a));continue}for(const a of o.addedNodes){if(!oe(a))continue;const h=[];T(a)&&a.matches("audio[data-start], video[data-start]")&&h.push(a);const c=a.querySelectorAll("audio[data-start], video[data-start]");for(const u of c)T(u)&&h.push(u);for(const u of h)this._adoptIframeMedia(u)}for(const a of o.removedNodes){if(!oe(a))continue;const h=[];T(a)&&a.matches("audio[data-start], video[data-start]")&&h.push(a);const c=a.querySelectorAll("audio[data-start], video[data-start]");for(const u of c)T(u)&&h.push(u);for(const u of h)this._detachIframeMedia(u)}}}),i={childList:!0,subtree:!0,attributes:!0,attributeFilter:["preload","src"]},n=Vt(t);for(const s of n)e.observe(s,i);this._mediaObserver=e}}function ke(r,t,e){if(r===null&&t===null)return{range:null,clamped:!1};const i=r??0,n=t!==null&&e>0&&t>e,s=n?e:t,o=s??(e>0?e:1/0);return!(i>=0)||!(o>i)?{range:null,clamped:!0}:{range:{start:i,end:s},clamped:n}}function he(r,t,e){const i=r.end??t;return i<t?ot(r.start,i,e):i}function Oe(r,t,e,i){return r<t.start||r>=he(t,e,i)}const Ei=100;function Si(r,t){return typeof r.currentTime=="number"&&Number.isFinite(r.currentTime)?r.currentTime:(r.frame??0)/t}function Be(r,t,e){return e<=0?!1:r.ended===!0?!0:r.ended===!1&&!r.isPlaying?!1:t>=e}function Ri(r,t,e,i,n,s){const{duration:o}=e;if(!n){const a=Be(r,t,o);return{start:0,shownAtEnd:o,atEnd:a,stopRuntime:!1,entering:!1}}if(r.ownsRange){const a=i&&r.ended===!0&&!r.isPlaying;return{start:n.start,shownAtEnd:t,atEnd:a,stopRuntime:!1,entering:!1}}return Ti(r,t,e,i,n,s)}function Ti(r,t,e,i,n,s){const o=n.end??e.duration,a=e.enteringRange===!0&&(t<n.start||t>=o);return{start:n.start,shownAtEnd:he(n,e.duration,s),atEnd:i&&!a&&Be(r,t,o),stopRuntime:r.isPlaying,entering:a}}function Ci(r,t,e,i){var v;const n=Si(r,t),s=!e.paused,o=s||r.isPlaying,a=(v=i.getPlayRange)==null?void 0:v.call(i),h=Ri(r,n,e,o,a,t),{atEnd:c,start:u}=h,b=e.duration>0?Math.min(n,e.duration):n,g=c?h.shownAtEnd:b,d=!r.isPlaying,_=c&&o;if(_&&i.getLoop())return i.media.audioOwner==="parent"&&i.media.pauseAll(),i.seek(u),i.play(),{...e,currentTime:u,paused:!1,enteringRange:!0};const m={...e,currentTime:g,paused:d,enteringRange:h.entering};i.media.audioOwner==="parent"&&(s&&d?i.media.pauseAll():!s&&!d&&i.media.playAll(),i.media.mirrorTime(g));const y=performance.now(),w=d!==e.paused;return(y-e.lastUpdateMs>Ei||w)&&(m.lastUpdateMs=y,i.updateControlsTime(g,e.duration),i.updateControlsPlaying(!d),i.dispatchEvent(new CustomEvent("timeupdate",{detail:{currentTime:g}}))),_&&(h.stopRuntime&&i.seek(g),i.media.audioOwner==="parent"&&i.media.pauseAll(),m.paused=!0,i.updateControlsPlaying(!1),i.dispatchEvent(new Event("ended"))),m}function Mi(r){return Array.isArray(r)?r.filter(t=>typeof t=="object"&&t!==null&&typeof t.id=="string"&&typeof t.start=="number"&&typeof t.duration=="number"):[]}function Pi(r,t,e){var o,a,h,c,u,b;if(r.source!==t)return;const i=r.data;if(!i||i.source!=="hf-preview")return;const n=at(i);if(n.status==="unsupported"){e.dispatchEvent(new CustomEvent("runtimeprotocolerror",{detail:{code:n.code,receivedVersion:n.receivedVersion}}));return}(o=e.setRuntimeFps)==null||o.call(e,n.fps);const s=n.status==="supported"&&n.metadata.capabilities.includes("play-range");if((a=e.setRuntimeOwnsPlayRange)==null||a.call(e,s),i.type==="shader-transition-state"){const g=i.state&&typeof i.state=="object"?i.state:{};e.shaderLoader.update(g,e.getShaderLoadingMode()),e.dispatchEvent(new CustomEvent("shadertransitionstate",{detail:{compositionId:i.compositionId,state:g}}));return}if(i.type==="ready"){e.onRuntimeReady();return}if(i.type==="assets-ready"){(h=e.onRuntimeAssetsReady)==null||h.call(e,i.timedOut===!0);return}if(i.type==="runtime-data-error"){(c=e.onRuntimeDataError)==null||c.call(e,i.channel,i.requestId,i.message);return}if(i.type==="runtime-data-applied"){(u=e.onRuntimeDataApplied)==null||u.call(e,i.channel,i.requestId);return}if(i.type==="state"){e.setPlaybackState(Ci({frame:i.frame??0,currentTime:i.currentTime,ended:typeof i.ended=="boolean"?i.ended:void 0,isPlaying:!!i.isPlaying,ownsRange:s},n.fps,e.getPlaybackState(),e));return}if(i.type==="media-autoplay-blocked"){if(((b=e.shouldPromoteMediaAutoplayFallback)==null?void 0:b.call(e))===!1)return;let g=null;try{g=e.getIframeDoc()}catch{}e.media.promoteToParentProxy(g,(d,_)=>e.media.mirrorTime(d,_)),e.sendControl("set-media-output-muted",{muted:!0});return}if(i.type==="timeline"&&i.durationInFrames>0){const g=Number(i.durationSeconds),d=Number(i.durationInFrames),_=Number.isFinite(g)&&g>0?g:d/n.fps;if(Number.isFinite(i.compositionWidth)&&i.compositionWidth>0&&Number.isFinite(i.compositionHeight)&&i.compositionHeight>0&&e.setCompositionSize(i.compositionWidth,i.compositionHeight),Number.isFinite(_)&&_>0){const m=e.getPlaybackState();e.setPlaybackState({...m,duration:_}),e.updateControlsTime(m.currentTime,_),e.onRuntimeTimelineReady(_,typeof i.assetsReady=="boolean"?i.assetsReady:void 0)}e.setScenes(Mi(i.scenes));return}i.type==="stage-size"&&Number.isFinite(i.width)&&i.width>0&&Number.isFinite(i.height)&&i.height>0&&e.setCompositionSize(i.width,i.height)}function Di(r,t){return r.includes(t)?!0:/hyperframe\.runtime\.iife\.js|__hyperframes\s*=/.test(r)}const Li=new Set([">"," ","	",`
`,"\r","\f"]);function J(r,t){const e=r.toLowerCase(),i=`<${t}`;let n=0;for(;n<e.length;){const s=e.indexOf(i,n);if(s<0)return null;const o=e[s+i.length];if(Li.has(o)){const a=e.indexOf(">",s+i.length);return a<0?null:{index:s,end:a+1}}n=s+i.length}return null}function Ii(r,t){if(!r||Di(r,t))return r;const e=`<script src="${t}"><\/script>`,i=J(r,"head");if(i)return r.slice(0,i.end)+e+r.slice(i.end);const n=J(r,"body");if(n)return r.slice(0,n.index)+e+r.slice(n.index);const s=J(r,"html");return s?r.slice(0,s.end)+e+r.slice(s.end):e+r}const L="shader-capture-scale",N="shader-loading",de="runtime-src",Fe="__hf_shader_capture_scale",Ne="__hf_shader_loading",B=["Preparing scene transitions","Sampling outgoing scene motion","Sampling incoming scene motion","Caching transition frames","Finalizing transition preview"];function ce(r){if(r===null)return null;const t=Number(r);return!Number.isFinite(t)||t<=0?null:String(Math.min(1,Math.max(.25,t)))}function xi(r){if(r===null||r.trim()==="")return"composition";const t=r.trim().toLowerCase();return t==="none"||t==="false"||t==="0"||t==="off"?"none":t==="player"||t==="true"||t==="1"||t==="on"?"player":"composition"}function Ve(r,t){return r.filter(e=>e!==""&&e.split("=")[0]!==t)}function ki(r,t,e){const i=r.indexOf("#"),n=i>=0?r.slice(0,i):r,s=i>=0?r.slice(i):"",o=n.indexOf("?"),a=o>=0?n.slice(0,o):n,h=o>=0?n.slice(o+1):"";let c=Ve(h.split("&"),Fe);c=Ve(c,Ne),t!==null&&c.push(`${Fe}=${encodeURIComponent(t)}`),e!=="composition"&&c.push(`${Ne}=${encodeURIComponent(e)}`);const u=c.join("&");return`${a}${u?`?${u}`:""}${s}`}function Oi(r,t,e){if(t===null&&e==="composition")return r;const i=[];t!==null&&i.push(`window.__HF_SHADER_CAPTURE_SCALE=${JSON.stringify(t)};`),e!=="composition"&&i.push(`window.__HF_SHADER_LOADING=${JSON.stringify(e)};`);const n=`<script data-hyperframes-player-shader-options>${i.join("")}<\/script>`;return/<head\b[^>]*>/i.test(r)?r.replace(/<head\b[^>]*>/i,s=>`${s}${n}`):/<html\b[^>]*>/i.test(r)?r.replace(/<html\b[^>]*>/i,s=>`${s}${n}`):`${n}${r}`}function K(r){return xi(r.getAttribute(N))}function Fi(r){return Number(ce(r.getAttribute(L))??"1")}function Ni(r,t){return ki(t,ce(r.getAttribute(L)),K(r))}function z(r,t){return Ii(Oi(t,ce(r.getAttribute(L)),K(r)),Vi(r))}function Vi(r){var e;const t=(e=r.getAttribute(de))==null?void 0:e.trim();if(!t)return q;try{const i=new URL(t,document.baseURI),n=i.protocol==="http:"||i.protocol==="https:",s=i.hostname==="127.0.0.1"||i.hostname==="localhost"||i.hostname==="[::1]";return n&&(s||i.origin===location.origin)?i.href:q}catch{return q}}function Hi(){const r=document.createElement("div");r.className="hfp-shader-loader",r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-label","Preparing scene transitions"),r.setAttribute("data-hyperframes-ignore",""),r.draggable=!1;const t=d=>{d.preventDefault(),d.stopPropagation()};for(const d of["selectstart","dragstart","pointerdown","mousedown","click","dblclick","contextmenu","touchstart"])r.addEventListener(d,t,{capture:!0});const e=document.createElement("div");e.className="hfp-shader-loader-panel",e.draggable=!1;const i=document.createElement("div");i.className="hfp-shader-loader-mark",i.draggable=!1,i.innerHTML=['<svg width="78" height="78" viewBox="0 0 100 100" fill="none" aria-hidden="true" draggable="false">','<path d="M10.1851 57.8021L33.1145 73.8313C36.2202 75.9978 41.5173 73.5433 42.4816 69.4984L51.7611 30.4271C52.7253 26.3822 48.5802 23.9277 44.4602 26.0942L13.917 42.1235C6.96677 45.7676 4.97564 54.1579 10.1851 57.8021Z" fill="url(#hfp-shader-loader-grad-left)"/>','<path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z" fill="url(#hfp-shader-loader-grad-right)"/>',"<defs>",'<linearGradient id="hfp-shader-loader-grad-left" x1="48.5676" y1="25" x2="44.7804" y2="71.9384" gradientUnits="userSpaceOnUse">','<stop stop-color="#06E3FA"/>','<stop offset="1" stop-color="#4FDB5E"/>',"</linearGradient>",'<linearGradient id="hfp-shader-loader-grad-right" x1="54.8282" y1="73.8392" x2="72.0989" y2="32.8932" gradientUnits="userSpaceOnUse">','<stop stop-color="#06E3FA"/>','<stop offset="1" stop-color="#4FDB5E"/>',"</linearGradient>","</defs>","</svg>"].join("");const n=document.createElement("div");n.className="hfp-shader-loader-title";const s=document.createElement("span");s.className="hfp-shader-loader-title-text",s.textContent=B[0],n.appendChild(s);const o=document.createElement("div");o.className="hfp-shader-loader-detail",o.textContent="Rendering animated scene samples for shader transitions.";const a=document.createElement("div");a.className="hfp-shader-loader-track",a.setAttribute("aria-hidden","true");const h=document.createElement("div");h.className="hfp-shader-loader-fill",a.appendChild(h);const c=document.createElement("div");c.className="hfp-shader-loader-progress";const u=d=>{const _=document.createElement("div");_.className="hfp-shader-loader-row";const m=document.createElement("span");m.className="hfp-shader-loader-label",m.textContent=d;const y=document.createElement("span");return y.className="hfp-shader-loader-value",_.appendChild(m),_.appendChild(y),c.appendChild(_),{row:_,label:m,value:y}},b=u("transition"),g=u("transition frame");return e.appendChild(i),e.appendChild(n),e.appendChild(o),e.appendChild(a),e.appendChild(c),r.appendChild(e),{root:r,fill:h,title:s,detail:o,transitionValue:b.value,transitionRow:b.row,frameLabel:g.label,frameValue:g.value,frameRow:g.row}}const Ui=420;function j(r,t,e){t.textContent=e,r.style.visibility=e?"visible":"hidden"}class Wi{constructor(t){p(this,"_el");p(this,"_hideTimeout",null);p(this,"_hiddenCallbacks",[]);p(this,"_drawingAssets",!1);this._el=t}show(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._el.root.classList.remove("hfp-hiding"),this._el.root.classList.add("hfp-visible")}hide(){if(this._el.root.classList.contains("hfp-hiding")){this._hideTimeout||this._scheduleCleanup();return}this._el.root.classList.contains("hfp-visible")&&(this._el.root.classList.add("hfp-hiding"),this._el.root.classList.remove("hfp-visible"),this._scheduleCleanup())}whenHidden(t){const e=this._el.root.classList;e.contains("hfp-visible")||e.contains("hfp-hiding")?this._hiddenCallbacks.push(t):t()}_flushHidden(){const t=this._hiddenCallbacks;this._hiddenCallbacks=[];for(const e of t)e()}reset(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._el.root.classList.remove("hfp-visible","hfp-hiding"),this._drawingAssets=!1,this._flushHidden(),this._el.fill.style.transform="scaleX(0)",j(this._el.transitionRow,this._el.transitionValue,""),j(this._el.frameRow,this._el.frameValue,"")}update(t,e){const i=e==="player"&&t.loading&&!t.ready;if(this._drawingAssets&&!i)return;if(e!=="player"){this.reset();return}if(t.ready||!t.loading){this.hide();return}this._el.root.setAttribute("aria-label","Preparing scene transitions"),this._drawingAssets=!1;const n=typeof t.progress=="number"&&Number.isFinite(t.progress)?t.progress:0,s=typeof t.total=="number"&&Number.isFinite(t.total)?t.total:0,o=s>0?Math.min(1,Math.max(0,n/s)):0,a=Math.min(B.length-1,Math.floor(o*B.length));this._el.title.textContent=B[a]||"Preparing scene transitions",this._el.detail.textContent=t.phase==="cached"?"Loading cached transition frames before playback.":t.phase==="finalizing"?"Uploading transition textures for smooth playback.":"Rendering animated scene samples for shader transitions.",this._el.fill.style.transform=`scaleX(${o})`;const h=t.currentTransition!==void 0&&t.transitionTotal!==void 0?`${t.currentTransition}/${t.transitionTotal}`:s>0?`${n}/${s}`:"",c=t.transitionFrame!==void 0&&t.transitionFrames!==void 0?`${t.transitionFrame}/${t.transitionFrames}`:"";this._el.frameLabel.textContent=t.phase==="cached"?"cached transition frames":t.phase==="finalizing"?"finalizing transition frames":"rendering transition frames",j(this._el.transitionRow,this._el.transitionValue,h),j(this._el.frameRow,this._el.frameValue,c),this._el.root.setAttribute("aria-valuenow",String(Math.round(o*100))),this.show()}showAssetsLoading(){this.reset(),this._el.title.textContent="Loading assets",this._el.detail.textContent="Waiting for images, video and fonts to finish loading.",this._el.root.setAttribute("aria-label","Loading assets"),this._drawingAssets=!0,this.show()}hideAssetsLoading(){this._drawingAssets&&this.hide()}get hideTimeout(){return this._hideTimeout}destroy(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._hiddenCallbacks=[]}_scheduleCleanup(){this._hideTimeout&&clearTimeout(this._hideTimeout),this._hideTimeout=setTimeout(()=>{this._el.root.classList.remove("hfp-hiding"),this._hideTimeout=null,this._flushHidden()},Ui)}}function $i(r){return(r==null?void 0:r.trim().toLowerCase().startsWith("video/"))??!1}function zi(r){const t=document.createElement("video");t.className="hfp-video",t.playsInline=!0,t.preload="metadata";const e=new AbortController,{signal:i}=e;return t.addEventListener("loadedmetadata",()=>r.onMetadata(t),{signal:i}),t.addEventListener("durationchange",()=>r.onDurationChange(t),{signal:i}),t.addEventListener("resize",()=>r.onResize(t),{signal:i}),t.addEventListener("play",()=>r.onPlay(t),{signal:i}),t.addEventListener("pause",()=>r.onPause(t),{signal:i}),t.addEventListener("timeupdate",()=>r.onTimeUpdate(),{signal:i}),t.addEventListener("error",()=>{var s,o;return r.onError(((s=t.error)==null?void 0:s.message)||"Video failed to load",((o=t.error)==null?void 0:o.code)??null)},{signal:i}),{video:t,adapter:{duration:()=>t.duration,time:()=>t.currentTime,seek:s=>{t.currentTime=s},play:()=>t.play().catch(s=>{i.aborted||r.onPlayRejected(s)}),pause:()=>t.pause(),timeScale:s=>{t.defaultPlaybackRate=s,t.playbackRate=s}},destroy:()=>{e.abort(),t.pause(),t.removeAttribute("src"),t.load(),t.remove()}}}const ji=.1,qi=5,ee="sandbox-origin",He=1e4,te=8e3,ie="assets-loading",k="assets-loading-ui",re="low-power-idle",Ue="disable-click-to-play",O="range-start",F="range-end",Bi=150;function ne(r){return!Number.isFinite(r)||r<=0?1:Math.max(ji,Math.min(qi,r))}class Gi extends HTMLElement{constructor(){super();p(this,"shadow");p(this,"container");p(this,"iframe");p(this,"posterEl",null);p(this,"controlsApi",null);p(this,"resizeObserver");p(this,"shaderLoader");p(this,"probe");p(this,"_ready",!1);p(this,"_readyDocument",null);p(this,"_connected",!1);p(this,"_assetsReady",!1);p(this,"_painted",!1);p(this,"_pendingPlay",!1);p(this,"_assetsGeneration",0);p(this,"_assetsLoadingShowTimer",null);p(this,"_currentTime",0);p(this,"_duration",0);p(this,"_paused",!0);p(this,"_scrubbing",!1);p(this,"_lastUpdateMs",0);p(this,"_volume",1);p(this,"_compositionWidth",1920);p(this,"_compositionHeight",1080);p(this,"_rescaleWarned",!1);p(this,"_directTimelineAdapter",null);p(this,"_directTimelineClock");p(this,"_parentTickRaf",null);p(this,"_media");p(this,"_scenes",[]);p(this,"_runtimeFps",30);p(this,"_runtimeBridgeReady",!1);p(this,"_runtimeAssetsReadyGeneration",-1);p(this,"_runtimeData",new Map);p(this,"_runtimeDataRequestId",0);p(this,"_pendingRuntimeData",new Map);p(this,"_afterUpdate",null);p(this,"_videoSource",null);p(this,"_runtimeOwnsPlayRange",!1);p(this,"_enteringRange",!1);p(this,"_rangeClampReported","");this.shadow=this.attachShadow({mode:"open"}),Lt(this.shadow,Et),{container:this.container,iframe:this.iframe}=It(),this.shadow.appendChild(this.container);const e=Hi();this.shadow.appendChild(e.root),this.shaderLoader=new Wi(e),this._media=new wi({dispatchEvent:i=>this._emit(i),getMuted:()=>this.muted,getVolume:()=>this._volume,getPlaybackRate:()=>this.playbackRate,getCurrentTime:()=>this._currentTime,isPaused:()=>this._paused}),this._directTimelineClock=new Nt({onTimeUpdate:(i,n)=>{var s;this._currentTime=i,(s=this.controlsApi)==null||s.updateTime(i,n),this._emit(new CustomEvent("timeupdate",{detail:{currentTime:i}}))},getLoop:()=>this.loop,restart:()=>{var i;this.seek(((i=this._playRange())==null?void 0:i.start)??0),this.play()},onPaused:()=>{var i;this._media.audioOwner==="parent"&&this._media.pauseAll(),this._paused=!0,(i=this.controlsApi)==null||i.updatePlaying(!1),this._emit(new Event("ended"))},onEnded:()=>this.loop}),this.probe=new wt(this.iframe,{onReady:i=>this._onProbeReady(i),onError:i=>this._emit(new CustomEvent("error",{detail:{message:i}}))}),this.addEventListener("click",i=>{this.disableClickToPlay||Dt(i)||(this._paused?this.play():this.pause())}),this.resizeObserver=new ResizeObserver(()=>this._rescale()),this._onMessage=this._onMessage.bind(this),this._onIframeLoad=this._onIframeLoad.bind(this),this.iframe.addEventListener("load",this._onIframeLoad)}static get observedAttributes(){return["src","srcdoc","width","height","controls","muted","audio-locked","volume","poster","playback-rate","audio-src","type",ee,de,L,N,k,re,O,F]}connectedCallback(){this._connected=!0,this._applySandboxOriginPolicy(),this.resizeObserver.observe(this),window.addEventListener("message",this._onMessage),this.hasAttribute("controls")&&this._setupControls(),this.hasAttribute("poster")&&(this.posterEl=De(this.shadow,this.getAttribute("poster"),this.posterEl)),this.hasAttribute("audio-src")&&this._media.setupFromUrl(this.getAttribute("audio-src")),this.hasAttribute("srcdoc")&&(this.iframe.srcdoc=z(this,this.getAttribute("srcdoc"))),this.hasAttribute("src")&&this._loadSrc(this.getAttribute("src")),!this.hasAttribute("audio-locked")&&this._isLockedHostEnvironment()&&this._applyAudioLock(!0)}disconnectedCallback(){var e;this._connected=!1,this._teardownVideo(),this._sendControl("pause"),this._stopIframeMedia(),this.resizeObserver.disconnect(),window.removeEventListener("message",this._onMessage),this.probe.stop(),this._directTimelineClock.stop(),this._stopParentTickClock(),this._directTimelineAdapter=null,this.shaderLoader.destroy(),this._media.destroy(),(e=this.controlsApi)==null||e.destroy(),this.controlsApi=null,this._paused=!0,this._pendingPlay=!1,this._abandonComposition("Player disconnected before runtime data was applied")}attributeChangedCallback(e,i,n){var s,o,a,h,c;switch(e){case"src":if(!this.isConnected)break;n&&this._navigateSrc(n);break;case"type":{const u=this.getAttribute("src");if(!this.isConnected||u===null||!!this._videoSource===this._wantsVideo())break;this._navigateSrc(u);break}case"srcdoc":if(!this.isConnected)break;if(this._pendingPlay=!1,this._abandonComposition("Composition navigated before runtime data was applied"),n!==null)this._pauseForVideoSwitch(),this._teardownVideo(),this.iframe.srcdoc=z(this,n);else{this.iframe.removeAttribute("srcdoc");const u=this.getAttribute("src");u!==null&&this._wantsVideo()&&this._navigateSrc(u)}break;case ee:this._applySandboxOriginPolicy(this.isConnected&&i!==n);break;case"width":this._setCompositionSize(Y(n)??1920,this._compositionHeight);break;case"height":this._setCompositionSize(this._compositionWidth,Y(n)??1080);break;case"controls":n!==null?this._setupControls():((s=this.controlsApi)==null||s.destroy(),this.controlsApi=null);break;case"poster":this.posterEl=De(this.shadow,n,this.posterEl);break;case"playback-rate":{const u=ne(parseFloat(n||"1"));this._media.updatePlaybackRate(u),this._sendControl("set-playback-rate",{playbackRate:u}),(a=(o=this._directTimelineAdapter)==null?void 0:o.timeScale)==null||a.call(o,u),(h=this.controlsApi)==null||h.updateSpeed(u),this._emit(new Event("ratechange"));break}case"muted":this._handleMutedChange(n);break;case"audio-locked":this._applyAudioLock(n!==null);break;case"volume":{const u=Math.max(0,Math.min(1,parseFloat(n||"1")));this._volume=u,this._syncVideoAudio(),this._media.updateVolume(u),this._sendControl("set-volume",{volume:u}),(c=this.controlsApi)==null||c.updateVolume(u),this._emit(new Event("volumechange"));break}case"audio-src":n?this._media.setupFromUrl(n):this._media.teardownUrlAudio();break;case k:n==="none"&&this.shaderLoader.hideAssetsLoading();break;case re:this._sendControl("set-idle-heartbeat",{slow:n!==null});break;case O:case F:this._applyPlayRange(!0);break;case L:case N:case de:if(!this.isConnected)break;this._reloadShaderOptions();break}}_applySandboxOriginPolicy(e=!1){this.hasAttribute(ee)?this.iframe.sandbox.remove("allow-same-origin"):this.iframe.sandbox.add("allow-same-origin"),e&&this._reloadForSandboxOriginPolicy()}_reloadForSandboxOriginPolicy(){if(this._videoSource)return;this._abandonComposition("Sandbox policy changed before runtime data was applied");const e=this.getAttribute("srcdoc");if(e!==null){this.iframe.srcdoc=z(this,e);return}const i=this.getAttribute("src");i===null?this.iframe.src="about:blank":this._loadSrc(i)}get iframeElement(){return this.iframe}get scenes(){return this._scenes}play(){this._play(!0)}_play(e){var o,a;if(this._ready&&!this._assetsReady){this._pendingPlay=!0;return}this._pendingPlay=!1,(o=this.posterEl)==null||o.remove(),this.posterEl=null;const i=this._ready?this._playRange():null;i?Oe(this._currentTime,i,this._duration,this._runtimeFps)&&(this.seek(i.start),this._enteringRange=!0):this._duration>0&&this._currentTime>=this._duration&&this.seek(0),this._paused=!1;const n=this._tryDirectTimelinePlay();let s=!1;n||(this._sendControl("play"),this._ready&&!this._directTimelineAdapter?this._startParentTickClock():this._ready||(this._pendingPlay=!0,s=!0)),this._media.audioOwner==="parent"&&this._media.playAll(),(a=this.controlsApi)==null||a.updatePlaying(!0),!s&&e&&this._emit(new Event("play")),n&&this._directTimelineAdapter&&this._directTimelineClock.start(this._directTimelineAdapter,()=>this._currentTime,()=>this._duration,()=>this._paused,()=>this._clockStop())}pause(){var e;this._pendingPlay=!1,this._tryDirectTimelinePause()?this._showPausedVideoTime():this._sendControl("pause"),this._directTimelineClock.stop(),this._stopParentTickClock(),this._media.audioOwner==="parent"&&this._media.pauseAll(),this._paused=!0,(e=this.controlsApi)==null||e.updatePlaying(!1),this._emit(new Event("pause"))}stopMedia(){this._sendControl("stop-media"),this._stopIframeMedia(),this._media.stopAdoptedMedia()}seek(e){var i,n;this._pendingPlay=!1,!this._trySyncSeek(e)&&!this._tryDirectTimelineSeek(e)&&this._sendControl("seek",{timeSeconds:e,frame:Math.round(e*this._runtimeFps)}),this._directTimelineClock.stop(),this._stopParentTickClock(),this._currentTime=e,this._media.audioOwner==="parent"&&(this._scrubbing?this._media.scrubAll(e):(this._media.pauseAll(),this._media.seekAll(e))),this._paused=!0,(i=this.controlsApi)==null||i.updatePlaying(!1),(n=this.controlsApi)==null||n.updateTime(this._currentTime,this._duration)}setColorGrading(e,i){this._sendControl("set-color-grading",{target:e,grading:i})}clearColorGrading(e){this._sendControl("set-color-grading",{target:e,grading:null})}setColorGradingCompare(e,i){this._sendControl("set-color-grading-compare",{target:e,compare:i})}clearColorGradingCompare(e){this._sendControl("set-color-grading-compare",{target:e,compare:{enabled:!1}})}setRuntimeData(e,i){if(!/^[a-z][a-z0-9-]{0,63}$/.test(e))throw new Error(`Invalid HyperFrames runtime-data channel: ${e}`);if(typeof structuredClone!="function")throw new Error("HyperFrames runtime data requires structuredClone support; refusing an unverified payload");const n=structuredClone(i);this._runtimeData.set(e,n),this._deliverRuntimeData(e,n)}clearRuntimeData(e){if(!/^[a-z][a-z0-9-]{0,63}$/.test(e))throw new Error(`Invalid HyperFrames runtime-data channel: ${e}`);this._runtimeData.delete(e),this._deliverRuntimeDataClear(e)}get currentTime(){return this._currentTime}set currentTime(e){this.seek(e)}get duration(){return this._duration}get compositionWidth(){return this._compositionWidth}get compositionHeight(){return this._compositionHeight}get paused(){return this._paused}get ready(){return this._ready}get assetsReady(){return this._assetsReady}get painted(){return this._painted}get playbackRate(){return ne(parseFloat(this.getAttribute("playback-rate")||"1"))}set playbackRate(e){this.setAttribute("playback-rate",String(ne(e)))}get shaderCaptureScale(){return Fi(this)}set shaderCaptureScale(e){this.setAttribute(L,String(e))}get shaderLoading(){return K(this)}set shaderLoading(e){e==="composition"?this.removeAttribute(N):this.setAttribute(N,e)}get assetsLoadingUi(){return this.getAttribute(k)==="none"?"none":"player"}set assetsLoadingUi(e){e==="none"?this.setAttribute(k,"none"):this.removeAttribute(k)}get muted(){return this.hasAttribute("muted")}set muted(e){e?this.setAttribute("muted",""):this.removeAttribute("muted")}get audioLocked(){return this.hasAttribute("audio-locked")}set audioLocked(e){e?this.setAttribute("audio-locked",""):this.removeAttribute("audio-locked")}_isLockedHostEnvironment(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return/\bClaude\/\d/.test(e)&&/\bElectron\b/.test(e)}_isAudioLocked(){return this.hasAttribute("audio-locked")||this._isLockedHostEnvironment()}_isSlideshowPlayer(){return this.closest("hyperframes-slideshow")!==null}_handleMutedChange(e){var i;if(e===null&&this._isAudioLocked()){this.setAttribute("muted","");return}this._media.updateMuted(e!==null),this._syncVideoAudio(),this._setIframeMediaMuted(e!==null),this._sendControl("set-muted",{muted:e!==null}),(i=this.controlsApi)==null||i.updateMuted(e!==null),this._emit(new Event("volumechange"))}_applyAudioLock(e){var i;e&&(this.muted=!0),(i=this.controlsApi)==null||i.setVolumeControlsHidden(e)}get volume(){return this._volume}set volume(e){this.setAttribute("volume",String(Math.max(0,Math.min(1,e))))}get disableClickToPlay(){return this.hasAttribute(Ue)}set disableClickToPlay(e){this.toggleAttribute(Ue,e)}get loop(){return this.hasAttribute("loop")}set loop(e){e?this.setAttribute("loop",""):this.removeAttribute("loop")}get rangeStart(){return this._readSeconds(O)}set rangeStart(e){this._writeSeconds(O,e)}get rangeEnd(){return this._readSeconds(F)}set rangeEnd(e){this._writeSeconds(F,e)}_readSeconds(e){const i=this.getAttribute(e);return i===null?null:Number(i)}_writeSeconds(e,i){i==null?this.removeAttribute(e):this.setAttribute(e,String(i))}_hasPlayRange(){return this.hasAttribute(O)||this.hasAttribute(F)}_playRange(){return ke(this.rangeStart,this.rangeEnd,this._duration).range}_sendPlayRange(e){const i=(e==null?void 0:e.end)??null;this._sendControl("set-play-range",{startSeconds:(e==null?void 0:e.start)??null,endSeconds:i})}_applyPlayRange(e){const{range:i,clamped:n}=ke(this.rangeStart,this.rangeEnd,this._duration);this._sendPlayRange(i),this._ready&&(this._reportRangeClamp(i,n),i&&e&&!this._pendingPlay&&this._moveIntoPlayRange(i))}_reportRangeClamp(e,i){const n=i?`${this.rangeStart},${this.rangeEnd},${this._duration}`:"";if(n===this._rangeClampReported||(this._rangeClampReported=n,!i))return;const s={rangeStart:(e==null?void 0:e.start)??null,rangeEnd:(e==null?void 0:e.end)??null};this._emit(new CustomEvent("rangeclamped",{detail:{...s,duration:this._duration}}))}_moveIntoPlayRange(e){Oe(this._currentTime,e,this._duration,this._runtimeFps)&&(this._paused?this.seek(e.start):this._jumpWhilePlaying(e.start))}_jumpWhilePlaying(e){this._directTimelineAdapter?(this._directTimelineAdapter.seek(e,!1),this._currentTime=e):this._runtimeOwnsPlayRange||(this.seek(e),this._enteringRange=!0,this._play(!1))}_clockStop(){const e=this._playRange(),i=(e==null?void 0:e.end)??this._duration;if(!e)return{end:i,shown:i};const n=he(e,this._duration,this._runtimeFps);return{end:i,shown:n<i?(n+i)/2:n}}_sendControl(e,i={}){try{const n=this.iframe.contentWindow;return n?(n.postMessage({...i,source:"hf-parent",type:"control",action:e,...dt(this._runtimeFps)},"*"),!0):((e==="set-runtime-data"||e==="clear-runtime-data")&&this._rejectRuntimeDataDelivery(i.channel,i.requestId,"Composition iframe is unavailable"),!1)}catch(n){return(e==="set-runtime-data"||e==="clear-runtime-data")&&this._rejectRuntimeDataDelivery(i.channel,i.requestId,n instanceof Error?n.message:String(n)),!1}}_deliverRuntimeData(e,i){if(!this.isConnected||!this._runtimeBridgeReady)return;const n=this._beginRuntimeDataDelivery(e);this._trySetRuntimeDataDirect(e,i,n)||this._sendControl("set-runtime-data",{channel:e,payload:i,requestId:n})}_deliverRuntimeDataClear(e){if(!this.isConnected||!this._runtimeBridgeReady)return;const i=this._beginRuntimeDataDelivery(e);this._tryClearRuntimeDataDirect(e,i)||this._sendControl("clear-runtime-data",{channel:e,requestId:i})}_trySetRuntimeDataDirect(e,i,n){var s;try{const o=(s=this.iframe.contentWindow)==null?void 0:s.__hyperframes;return typeof(o==null?void 0:o.setRuntimeData)!="function"?!1:(o.setRuntimeData(e,i,n),!0)}catch{return!1}}_tryClearRuntimeDataDirect(e,i){var n;try{const s=(n=this.iframe.contentWindow)==null?void 0:n.__hyperframes;return typeof(s==null?void 0:s.clearRuntimeData)!="function"?!1:(s.clearRuntimeData(e,i),!0)}catch{return!1}}_replayRuntimeData(){for(const[e,i]of this._runtimeData)this._deliverRuntimeData(e,i)}_beginRuntimeDataDelivery(e){const i=this._pendingRuntimeData.get(e);i&&window.clearTimeout(i.timeoutId),this._runtimeDataRequestId+=1;const n=this._runtimeDataRequestId,s=window.setTimeout(()=>{this._rejectRuntimeDataDelivery(e,n,`Runtime data delivery timed out after ${He}ms`)},He);return this._pendingRuntimeData.set(e,{requestId:n,timeoutId:s}),n}_resolveRuntimeDataDelivery(e,i){const n=this._takeRuntimeDataDelivery(e,i);n&&this._emit(new CustomEvent("runtimedataapplied",{detail:{channel:e,requestId:n.requestId}}))}_rejectRuntimeDataDelivery(e,i,n){const s=this._takeRuntimeDataDelivery(e,i);s&&this._emit(new CustomEvent("runtimedataerror",{detail:{channel:e,requestId:s.requestId,message:typeof n=="string"?n:String(n)}}))}_takeRuntimeDataDelivery(e,i){if(typeof e!="string"||typeof i!="number"||!Number.isSafeInteger(i))return null;const n=this._pendingRuntimeData.get(e);return!n||n.requestId!==i?null:(window.clearTimeout(n.timeoutId),this._pendingRuntimeData.delete(e),n)}_rejectAllRuntimeDataDeliveries(e){for(const[i,n]of[...this._pendingRuntimeData])this._rejectRuntimeDataDelivery(i,n.requestId,e)}_getSameOriginIframeDocument(){try{return this.iframe.contentDocument}catch{return null}}_setIframeMediaMuted(e){const i=this._getSameOriginIframeDocument();if(i)for(const n of i.querySelectorAll("video, audio"))T(n)&&(n.muted=e||n.defaultMuted)}_stopIframeMedia(){const e=this._getSameOriginIframeDocument();if(e)for(const i of e.querySelectorAll("video, audio"))T(i)&&i.pause()}_replayBridgeState(){this._sendControl("set-muted",{muted:this.muted}),this._sendControl("set-volume",{volume:this._volume}),this._sendControl("set-playback-rate",{playbackRate:this.playbackRate}),this._sendControl("set-native-media-sync-disabled",{disabled:this._isSlideshowPlayer()}),this._sendControl("set-web-audio-media-disabled",{disabled:this._isSlideshowPlayer()}),this._sendControl("set-idle-heartbeat",{slow:this.hasAttribute(re)})}_reloadShaderOptions(){if(!this._videoSource){if(this._abandonComposition("Shader options changed before runtime data was applied"),this.hasAttribute("srcdoc")){this.iframe.srcdoc=z(this,this.getAttribute("srcdoc")||"");return}this.hasAttribute("src")&&this._loadSrc(this.getAttribute("src")||"")}}_navigateSrc(e){this._pendingPlay=!1,this._pauseForVideoSwitch(),this._abandonComposition("Composition navigated before runtime data was applied"),this._loadSrc(e)}_wantsVideo(){return $i(this.getAttribute("type"))&&!this.hasAttribute("srcdoc")}_pauseForVideoSwitch(){var e;!this._videoSource&&!this._wantsVideo()||(this._paused=!0,(e=this.controlsApi)==null||e.updatePlaying(!1))}_loadSrc(e){if(this._wantsVideo()){this._loadVideo(e);return}this._teardownVideo(),this.iframe.src=Ni(this,e)}_loadVideo(e){var s,o;this._videoSource||(this._videoSource=zi({onMetadata:a=>this._applyThenEmit(()=>this._onVideoReady(a)),onDurationChange:a=>this._applyTimelineDuration(a.duration),onResize:a=>this._applyVideoSize(a),onPlay:a=>{!a.paused&&this._paused&&this.play()},onPause:a=>{a.paused&&!a.ended&&!this._paused&&this.pause()},onTimeUpdate:()=>{document.hidden&&this._playRange()&&this._directTimelineClock.poll()},onError:(a,h)=>{this._paused||this.pause(),this._emit(new CustomEvent("error",{detail:{message:a,code:h}}))},onPlayRejected:a=>this._onVideoPlayRejected(a)}),this.container.appendChild(this._videoSource.video),this.iframe.hidden=!0,this.iframe.src="about:blank"),this.probe.stop();const{video:i,adapter:n}=this._videoSource;this._directTimelineAdapter=n,this._currentTime=0,this._duration=0,(s=this.controlsApi)==null||s.updateTime(0,0),this._syncVideoAudio(),(o=n.timeScale)==null||o.call(n,this.playbackRate),i.src=e}_teardownVideo(){this._videoSource&&(this._videoSource.destroy(),this._videoSource=null,this.iframe.hidden=!1)}_syncVideoAudio(){this._videoSource&&(this._videoSource.video.muted=this.muted,this._videoSource.video.volume=this._volume)}_onVideoReady(e){this._applyTimelineDuration(e.duration),this._applyVideoSize(e),this._ready=!0,this._dispatchReady(),this._waitForAssetsReady(null),this._afterEvents(()=>{this.hasAttribute("autoplay")&&this._paused&&this.play()})}_applyTimelineDuration(e){var i;!Number.isFinite(e)||e<=0||(this._setDuration(e),(i=this.controlsApi)==null||i.updateTime(this._currentTime,e))}_applyVideoSize(e){e.videoWidth>0&&e.videoHeight>0&&this._setCompositionSize(e.videoWidth,e.videoHeight)}_onVideoPlayRejected(e){e instanceof DOMException&&e.name==="NotAllowedError"&&(this._paused||this.pause(),this._emit(new CustomEvent("playbackerror",{detail:{source:"video",error:e}})))}_trySyncSeek(e){if(this._videoSource)return!1;try{const i=this.iframe.contentWindow,n=i==null?void 0:i.__player;return typeof(n==null?void 0:n.seek)!="function"?!1:(n.seek.call(n,e),!0)}catch{return!1}}_withDirectTimeline(e){const i=this._videoSource?null:this.probe.resolveDirectTimelineAdapter(),n=i||this._directTimelineAdapter;if(!n)return!1;try{return e(n),i&&i!==this._directTimelineAdapter&&this._applyTimelineDuration(i.duration()),this._directTimelineAdapter=n,!0}catch{return!1}}_tryDirectTimelineSeek(e){return this._withDirectTimeline(i=>{i.seek(e,!1),i.pause()})}_tryDirectTimelinePlay(){return this._withDirectTimeline(e=>void e.play())}_tryDirectTimelinePause(){return this._withDirectTimeline(e=>void e.pause())}_showPausedVideoTime(){var e;this._videoSource&&(this._currentTime=this._videoSource.video.currentTime,(e=this.controlsApi)==null||e.updateTime(this._currentTime,this._duration),this._emit(new CustomEvent("timeupdate",{detail:{currentTime:this._currentTime}})))}_startParentTickClock(){this._stopParentTickClock();const e=()=>{if(this._paused){this._parentTickRaf=null;return}this._sendControl("tick"),this._parentTickRaf=requestAnimationFrame(e)};this._parentTickRaf=requestAnimationFrame(e)}_stopParentTickClock(){this._parentTickRaf!==null&&(cancelAnimationFrame(this._parentTickRaf),this._parentTickRaf=null)}_onMessage(e){this._videoSource||this._applyThenEmit(()=>this._handleRuntimeMessage(e))}_handleRuntimeMessage(e){Pi(e,this.iframe.contentWindow,{getPlaybackState:()=>({currentTime:this._currentTime,duration:this._duration,paused:this._paused,lastUpdateMs:this._lastUpdateMs,enteringRange:this._enteringRange}),setPlaybackState:({currentTime:i,duration:n,paused:s,lastUpdateMs:o,enteringRange:a})=>{this._enteringRange=a===!0,this._currentTime=i,this._setDuration(n),this._paused=s,this._lastUpdateMs=o},getShaderLoadingMode:()=>K(this),shaderLoader:this.shaderLoader,setCompositionSize:(i,n)=>this._setCompositionSize(i,n),sendControl:(i,n)=>this._sendControl(i,n),getIframeDoc:()=>this.iframe.contentDocument,onRuntimeReady:()=>{this._runtimeBridgeReady=!0,this._replayBridgeState(),this._hasPlayRange()&&this._sendPlayRange(this._playRange()),this._replayRuntimeData()},onRuntimeAssetsReady:()=>{this._runtimeAssetsReadyGeneration===this._assetsGeneration&&this._settleAssetsReady(this._assetsGeneration)},onRuntimeDataApplied:(i,n)=>this._resolveRuntimeDataDelivery(i,n),onRuntimeDataError:(i,n,s)=>this._rejectRuntimeDataDelivery(i,n,s),onRuntimeTimelineReady:(i,n)=>this._onRuntimeTimelineReady(i,n),setRuntimeFps:i=>{this._runtimeFps=i},setRuntimeOwnsPlayRange:i=>{this._runtimeOwnsPlayRange=i},shouldPromoteMediaAutoplayFallback:()=>!this._isSlideshowPlayer(),setScenes:i=>{this._scenes=i,this._emit(new CustomEvent("scenes",{detail:{scenes:i}}))},updateControlsTime:(i,n)=>{var s;return(s=this.controlsApi)==null?void 0:s.updateTime(i,n)},updateControlsPlaying:i=>{var n;return(n=this.controlsApi)==null?void 0:n.updatePlaying(i)},dispatchEvent:i=>this._emit(i),seek:i=>this.seek(i),play:()=>this.play(),getLoop:()=>this.loop,getPlayRange:()=>this._playRange(),media:this._media})}_onRuntimeTimelineReady(e,i){var s;if(this._ready)return;this.probe.stop(),this._setDuration(e),this._directTimelineAdapter=null,this._ready=!0,(s=this.controlsApi)==null||s.updateTime(this._currentTime,e),this._dispatchReady();const n=this._getSameOriginIframeDocument();n&&this._media.setupFromIframe(n),this._replayBridgeState(),this._setIframeMediaMuted(this.muted),this._waitForAssetsReady(n,i),this._playWhenWanted()}_onProbeReady(e){this._applyThenEmit(()=>this._applyProbeResult(e))}_applyProbeResult({duration:e,adapter:i,compositionSize:n}){var o;this._setDuration(e),this._directTimelineAdapter=i.kind==="direct-timeline"?i.timeline:null,n&&this._setCompositionSize(n.width,n.height),this._ready=!0,(o=this.controlsApi)==null||o.updateTime(0,e),this._dispatchReady();const s=this._getSameOriginIframeDocument();s&&this._media.setupFromIframe(s),this._setIframeMediaMuted(this.muted),this._waitForAssetsReady(s),this._playWhenWanted()}_waitForAssetsReady(e,i){this._clearAssetsLoadingShowTimer(),this._assetsReady=!1,this._painted=!1;const n=++this._assetsGeneration;if(!e){i===!1?(this._runtimeAssetsReadyGeneration=n,this._startAssetsLoadingOverlayTimer(n),setTimeout(()=>this._settleAssetsReady(n),te)):this._settleAssetsReady(n);return}bi(e,({timedOut:s})=>{n===this._assetsGeneration&&(s&&this._warnStuckAssets(e),this._settleAssetsReady(n))},{timeoutMs:te,currentTime:this._currentTime}),this._assetsReady||this._startAssetsLoadingOverlayTimer(n)}_startAssetsLoadingOverlayTimer(e){this._assetsLoadingShowTimer=setTimeout(()=>{this._assetsLoadingShowTimer=null,!(e!==this._assetsGeneration||this._assetsReady)&&(this.setAttribute(ie,""),this.assetsLoadingUi!=="none"&&this.shaderLoader.showAssetsLoading())},Bi)}_hasPendingFirstFrameAssets(e){const{pendingMedia:i,pendingImages:n,fontsLoading:s}=ae(e,{scope:H,currentTime:this._currentTime});return i.length>0||n.length>0||s}_warnStuckAssets(e){const{pendingMedia:i,pendingImages:n,fontsLoading:s}=ae(e,{scope:H,currentTime:this._currentTime}),o=e.defaultView;console.warn(`[hyperframes-player] assets-loading timed out after ${te}ms — playing anyway`,{stuckMedia:i.map(a=>a.currentSrc||a.getAttribute("src")||`<${a.tagName.toLowerCase()}>`),stuckImages:n.map(a=>a.currentSrc||a.getAttribute("src")||"<img>"),fontsLoading:s,computeReady:(o==null?void 0:o.__renderReady)===!0,documentHidden:e.hidden===!0})}_settleAssetsReady(e){e!==this._assetsGeneration||this._assetsReady||(this._clearAssetsLoadingShowTimer(),this._assetsReady=!0,this.removeAttribute(ie),this.shaderLoader.hideAssetsLoading(),this._emit(new Event("assetsready")),this.shaderLoader.whenHidden(()=>{e===this._assetsGeneration&&(this._painted=!0,this._emit(new Event("painted")))}),this._afterEvents(()=>{this._pendingPlay&&this.play()}))}_abandonComposition(e){this._ready=!1,this._readyDocument=null,this._invalidateAssetsWait(),this._releaseDocument(),this._runtimeBridgeReady=!1,this._rejectAllRuntimeDataDeliveries(e)}_releaseDocument(){this._runtimeOwnsPlayRange=!1,this._enteringRange=!1,this._directTimelineAdapter=null,this._directTimelineClock.stop(),this._stopParentTickClock(),this.shaderLoader.reset(),this._media.resetForIframeLoad()}_invalidateAssetsWait(){this._clearAssetsLoadingShowTimer(),this._assetsReady=!1,this._painted=!1,this._assetsGeneration++,this.removeAttribute(ie),this.shaderLoader.hide()}_clearAssetsLoadingShowTimer(){this._assetsLoadingShowTimer!==null&&(clearTimeout(this._assetsLoadingShowTimer),this._assetsLoadingShowTimer=null)}_dispatchReady(){this._readyDocument=this._getSameOriginIframeDocument();const e={duration:this._duration,compositionWidth:this._compositionWidth,compositionHeight:this._compositionHeight};this._emit(new CustomEvent("ready",{detail:e})),this._rescale(),this._rangeClampReported="",this._hasPlayRange()&&this._applyPlayRange(!0)}_setDuration(e){e!==this._duration&&(this._duration=e,this._ready&&(this._emit(new CustomEvent("durationchange",{detail:{duration:e}})),this._hasPlayRange()&&this._applyPlayRange(!1)))}_setCompositionSize(e,i){const n=e!==this._compositionWidth||i!==this._compositionHeight;if(this._compositionWidth=e,this._compositionHeight=i,this._rescale(),!n)return;const s={compositionWidth:e,compositionHeight:i};this._emit(new CustomEvent("resize",{detail:s}))}_applyThenEmit(e){if(this._afterUpdate){e();return}const i=[];this._afterUpdate=i;const n=[],s=o=>{try{o()}catch(a){n.push(a)}};s(e);for(const o of i)s(o);if(this._afterUpdate=null,n.length>0)throw n[0]}_afterEvents(e){this._afterUpdate?this._afterUpdate.push(e):e()}_playWhenWanted(){this._afterEvents(()=>{(this.hasAttribute("autoplay")||this._pendingPlay)&&this.play()})}_emit(e){this._afterEvents(()=>this.dispatchEvent(e))}_rescale(){!xt(this,this.iframe,this._compositionWidth,this._compositionHeight)&&this._ready&&!this._rescaleWarned&&(this._rescaleWarned=!0,console.warn("[hyperframes-player] rescale no-op after ready — zero-size player element",{src:this.getAttribute("src"),offsetWidth:this.offsetWidth,offsetHeight:this.offsetHeight,compositionWidth:this._compositionWidth,compositionHeight:this._compositionHeight}))}_onIframeLoad(){if(!this._connected||this._videoSource)return;const e=this._getSameOriginIframeDocument();if(this._ready&&e===this._readyDocument){e&&this._hasPendingFirstFrameAssets(e)&&this._waitForAssetsReady(e);return}this._ready=!1,this._invalidateAssetsWait(),this._releaseDocument(),this.probe.start()}_setupControls(){this.controlsApi||(this.controlsApi=Pt(this.shadow,this.muted,this._volume,this.getAttribute("speed-presets"),{onPlay:()=>this.play(),onPause:()=>this.pause(),onSeek:e=>this.seek(e*this._duration),onScrubStart:()=>{this._scrubbing=!0},onScrubEnd:()=>{this._scrubbing=!1,this.seek(this._currentTime)},onSpeedChange:e=>void(this.playbackRate=e),onMuteToggle:()=>void(this.muted=!this.muted),onVolumeChange:e=>void(this.volume=e)},this._isAudioLocked()))}get _audioOwner(){return this._media.audioOwner}get _parentMedia(){return this._media.entries}_mirrorParentMediaTime(e,i){this._media.mirrorTime(e,i)}_promoteToParentProxy(){let e=null;try{e=this.iframe.contentDocument}catch{}this._media.promoteToParentProxy(e,(i,n)=>this._mirrorParentMediaTime(i,n)),this._sendControl("set-media-output-muted",{muted:!0})}_observeDynamicMedia(e){this._media.setupFromIframe(e)}}customElements.get("hyperframes-player")||customElements.define("hyperframes-player",Gi);export{Gi as HyperframesPlayer,Ct as SPEED_PRESETS,Z as formatSpeed,Pe as formatTime};
