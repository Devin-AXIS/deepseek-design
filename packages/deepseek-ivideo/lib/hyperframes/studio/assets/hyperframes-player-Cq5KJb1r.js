var ce=Object.defineProperty;var pe=(r,t,e)=>t in r?ce(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var c=(r,t,e)=>pe(r,typeof t!="symbol"?t+"":t,e);import{D as L,E as me,F as fe}from"./index-uzZrEyTJ.js";function _e(r){return r.hasRuntime||r.runtimeInjected?!1:!!(r.hasNestedCompositions||r.hasTimelines&&r.attempts>=5)}function H(r){return typeof r=="object"&&r!==null}function ge(r){return H(r)&&typeof r.getDuration=="function"}function ye(r){return H(r)&&typeof r.duration=="function"&&typeof r.time=="function"&&typeof r.seek=="function"&&typeof r.play=="function"&&typeof r.pause=="function"}function ve(r){if(!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(r))throw new Error(`Invalid HyperFrames runtime version: ${r}`);return`https://cdn.jsdelivr.net/npm/@hyperframes/core@${r}/dist/hyperframe.runtime.iife.js`}const be=typeof __HYPERFRAMES_RUNTIME_CDN_URL__=="string"?__HYPERFRAMES_RUNTIME_CDN_URL__:ve("0.0.0-dev");function V(r){if(r===null)return null;const t=Number.parseInt(r,10);return Number.isFinite(t)&&t>0?t:null}function we(r){const t=(r==null?void 0:r.querySelector("[data-composition-id][data-width][data-height]"))??(r==null?void 0:r.querySelector("[data-width][data-height]"));if(!t)return null;const e=V(t.getAttribute("data-width")),i=V(t.getAttribute("data-height"));return e!==null&&i!==null?{width:e,height:i}:null}class Ae{constructor(t,e){c(this,"_interval",null);c(this,"_runtimeInjected",!1);this._iframe=t,this._callbacks=e}get runtimeInjected(){return this._runtimeInjected}start(){this.stop(),this._runtimeInjected=!1;let t=0;this._interval=setInterval(()=>{var e;t++;try{const i=this._iframe.contentWindow;if(!i)return;const s=!!(i.__hf||i.__player),a=!!(i.__timelines&&Object.keys(i.__timelines).length>0),d=!!((e=this._iframe.contentDocument)!=null&&e.querySelector("[data-composition-src]"));if(_e({hasRuntime:s,hasTimelines:a,hasNestedCompositions:d,runtimeInjected:this._runtimeInjected,attempts:t})){this._injectRuntime();return}if(this._runtimeInjected&&!s)return;const n=this._resolvePlaybackDurationAdapter(i);if(n&&n.getDuration()>0){this.stop();const h=we(this._iframe.contentDocument);this._callbacks.onReady({duration:n.getDuration(),adapter:n,compositionSize:h});return}}catch{}t>=40&&(this.stop(),this._callbacks.onError("Composition timeline not found after 8s"))},200)}stop(){this._interval!==null&&(clearInterval(this._interval),this._interval=null)}resolveDirectTimelineAdapter(){try{const t=this._iframe.contentWindow;return t?this._resolveDirectTimelineAdapterFromWindow(t):null}catch{return null}}resolveDirectTimelineAdapterFromWindow(t){return this._resolveDirectTimelineAdapterFromWindow(t)}hasRuntimeBridge(t){return Reflect.get(t,"__hf")!==void 0||H(Reflect.get(t,"__player"))}_injectRuntime(){var t,e;this._runtimeInjected=!0;try{const i=this._iframe.contentDocument;if(!i)return;const s=i.createElement("script");s.src=be,(i.head||i.documentElement).appendChild(s),(e=(t=this._callbacks).onRuntimeInjected)==null||e.call(t)}catch{}}_resolveDirectTimelineAdapterFromWindow(t){var n,h;if(this.hasRuntimeBridge(t))return null;const e=Reflect.get(t,"__timelines");if(!H(e))return null;const i=Object.keys(e);if(i.length===0)return null;const s=(h=(n=this._iframe.contentDocument)==null?void 0:n.querySelector("[data-composition-id]"))==null?void 0:h.getAttribute("data-composition-id"),a=s&&s in e?s:i[i.length-1],d=e[a];return ye(d)?d:null}_resolvePlaybackDurationAdapter(t){const e=Reflect.get(t,"__player");if(ge(e))return{kind:"runtime",getDuration:()=>e.getDuration()};const i=this._resolveDirectTimelineAdapterFromWindow(t);return i?{kind:"direct-timeline",timeline:i,getDuration:()=>i.duration()}:null}}const Ee=`
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
`,Ce='<svg width="24" height="24" viewBox="46 21 54 56" fill="currentColor"><path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z"/></svg>',Te='<svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="2" width="4" height="14"/><rect x="11" y="2" width="4" height="14"/></svg>',oe='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',ae='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',Se='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" opacity="0.3"/><line x1="18" y1="7" x2="14" y2="17" stroke="currentColor" stroke-width="2"/></svg>',xe=[.25,.5,1,1.5,2,4];function U(r){return Number.isInteger(r)?`${r}x`:`${r}x`}function de(r){if(!Number.isFinite(r)||r<0)return"0:00";const t=Math.floor(r),e=Math.floor(t/60),i=t%60;return`${e}:${i.toString().padStart(2,"0")}`}function Me(r,t,e={}){const i=e.speedPresets??xe,s=document.createElement("div");s.className="hfp-controls",s.addEventListener("click",o=>{o.stopPropagation()});const a=document.createElement("button");a.className="hfp-play-btn",a.type="button",a.innerHTML=`<span class="hfp-ico hfp-ico-play">${Ce}</span><span class="hfp-ico hfp-ico-pause">${Te}</span>`,a.setAttribute("aria-label","Play");const d=document.createElement("div");d.className="hfp-scrubber";const n=document.createElement("div");n.className="hfp-progress",n.style.width="0%",d.appendChild(n);const h=document.createElement("span");h.className="hfp-time",h.textContent="0:00 / 0:00";const p=document.createElement("div");p.className="hfp-speed-wrap";const u=document.createElement("button");u.className="hfp-speed-btn",u.type="button",u.textContent="1x",u.setAttribute("aria-label","Playback speed");const g=document.createElement("div");g.className="hfp-speed-menu",g.setAttribute("role","menu");for(const o of i){const l=document.createElement("button");l.className="hfp-speed-option",l.type="button",l.setAttribute("role","menuitem"),l.dataset.speed=String(o),l.textContent=U(o),o===1&&l.classList.add("hfp-active"),g.appendChild(l)}p.appendChild(g),p.appendChild(u);const y=document.createElement("div");y.className="hfp-volume-wrap";const f=document.createElement("button");f.className="hfp-mute-btn",f.type="button",f.innerHTML=oe,f.setAttribute("aria-label","Mute");const v=document.createElement("div");v.className="hfp-volume-slider-wrap";const m=document.createElement("div");m.className="hfp-volume-slider",m.setAttribute("role","slider"),m.setAttribute("aria-label","Volume"),m.setAttribute("aria-valuemin","0"),m.setAttribute("aria-valuemax","100"),m.setAttribute("aria-valuenow","100"),m.tabIndex=0;const b=document.createElement("div");b.className="hfp-volume-fill",b.style.width="100%",m.appendChild(b),v.appendChild(m),y.appendChild(v),y.appendChild(f),e.audioLocked&&(y.style.display="none"),s.appendChild(a),s.appendChild(d),s.appendChild(h),s.appendChild(y),s.appendChild(p),r.appendChild(s);let w=!1,T=!1,C=1,M=null;i.indexOf(1);const R=(o,l)=>o?Se:l===0||l<.5?ae:oe;a.addEventListener("click",o=>{o.stopPropagation(),w?t.onPause():t.onPlay()}),f.addEventListener("click",o=>{o.stopPropagation(),t.onMuteToggle()});let S=!1;const I=o=>{const l=m.getBoundingClientRect(),_=Math.max(0,Math.min(1,(o-l.left)/l.width));C=_,b.style.width=`${_*100}%`,m.setAttribute("aria-valuenow",String(Math.round(_*100))),T&&_>0&&t.onMuteToggle(),f.innerHTML=R(T,_),t.onVolumeChange(_)};m.addEventListener("mousedown",o=>{o.stopPropagation(),S=!0,I(o.clientX)});const q=o=>{S&&I(o.clientX)},G=()=>{S=!1};document.addEventListener("mousemove",q),document.addEventListener("mouseup",G),m.addEventListener("touchstart",o=>{S=!0;const l=o.touches[0];l&&I(l.clientX)},{passive:!0});const X=o=>{if(S){const l=o.touches[0];l&&I(l.clientX)}},Y=()=>{S=!1};document.addEventListener("touchmove",X,{passive:!0}),document.addEventListener("touchend",Y);const Z=.05;m.addEventListener("keydown",o=>{let l=C;if(o.key==="ArrowRight"||o.key==="ArrowUp")l=Math.min(1,C+Z);else if(o.key==="ArrowLeft"||o.key==="ArrowDown")l=Math.max(0,C-Z);else return;o.preventDefault(),o.stopPropagation(),C=l,b.style.width=`${l*100}%`,m.setAttribute("aria-valuenow",String(Math.round(l*100))),T&&l>0&&t.onMuteToggle(),f.innerHTML=R(T,l),t.onVolumeChange(l)});const Q=o=>{for(const l of g.querySelectorAll(".hfp-speed-option"))l.classList.toggle("hfp-active",l.dataset.speed===String(o))};u.addEventListener("click",o=>{o.stopPropagation();const l=g.classList.toggle("hfp-open");u.setAttribute("aria-expanded",String(l))}),g.addEventListener("click",o=>{o.stopPropagation();const l=o.target.closest(".hfp-speed-option");if(!l)return;const _=parseFloat(l.dataset.speed);i.indexOf(_),u.textContent=U(_),Q(_),g.classList.remove("hfp-open"),u.setAttribute("aria-expanded","false"),t.onSpeedChange(_)});const J=()=>{g.classList.remove("hfp-open"),u.setAttribute("aria-expanded","false")};document.addEventListener("click",J);const O=o=>{const l=d.getBoundingClientRect(),_=Math.max(0,Math.min(1,(o-l.left)/l.width));t.onSeek(_)};let E=!1;d.addEventListener("mousedown",o=>{var l;o.stopPropagation(),E=!0,(l=t.onScrubStart)==null||l.call(t),O(o.clientX)});const K=o=>{E&&O(o.clientX)},ee=()=>{var o;E&&(E=!1,(o=t.onScrubEnd)==null||o.call(t))};document.addEventListener("mousemove",K),document.addEventListener("mouseup",ee),d.addEventListener("touchstart",o=>{var _;E=!0,(_=t.onScrubStart)==null||_.call(t);const l=o.touches[0];l&&O(l.clientX)},{passive:!0});const te=o=>{if(E){const l=o.touches[0];l&&O(l.clientX)}},ie=()=>{var o;E&&(E=!1,(o=t.onScrubEnd)==null||o.call(t))};document.addEventListener("touchmove",te,{passive:!0}),document.addEventListener("touchend",ie);const re=()=>{M&&clearTimeout(M),M=setTimeout(()=>{w&&s.classList.add("hfp-hidden")},3e3)},D=r instanceof ShadowRoot?r.host:r,se=()=>{s.classList.remove("hfp-hidden"),re()},ne=()=>{w&&s.classList.add("hfp-hidden")};return D.addEventListener("mousemove",se),D.addEventListener("mouseleave",ne),{updateTime(o,l){const _=l>0?Math.min(o,l):o,ue=l>0?_/l*100:0;n.style.width=`${ue}%`,h.textContent=`${de(_)} / ${de(l)}`},updatePlaying(o){w=o,a.classList.toggle("hfp-playing",o),a.setAttribute("aria-label",o?"Pause":"Play"),o?re():s.classList.remove("hfp-hidden")},updateSpeed(o){i.indexOf(o),u.textContent=U(o),Q(o)},updateMuted(o){T=o,f.innerHTML=R(o,C),f.setAttribute("aria-label",o?"Unmute":"Mute")},updateVolume(o){C=o,b.style.width=`${o*100}%`,m.setAttribute("aria-valuenow",String(Math.round(o*100))),f.innerHTML=R(T,o)},setVolumeControlsHidden(o){y.style.display=o?"none":""},show(){s.style.display=""},hide(){s.style.display="none"},destroy(){document.removeEventListener("mousemove",K),document.removeEventListener("mouseup",ee),document.removeEventListener("touchmove",te),document.removeEventListener("touchend",ie),document.removeEventListener("mousemove",q),document.removeEventListener("mouseup",G),document.removeEventListener("touchmove",X),document.removeEventListener("touchend",Y),document.removeEventListener("click",J),D.removeEventListener("mousemove",se),D.removeEventListener("mouseleave",ne),M&&clearTimeout(M),s.remove()}}}function Le(r,t,e,i,s,a=!1){const d=i?i.split(",").map(Number).filter(p=>!isNaN(p)&&p>0):void 0,n={...d?{speedPresets:d}:{},audioLocked:a},h=Me(r,s,n);return h.updateMuted(t),h.updateVolume(e),h}function le(r,t,e){return t?(e||(e=document.createElement("img"),e.className="hfp-poster",r.appendChild(e)),e.src=t,e):(e==null||e.remove(),null)}function ke(r){return r.composedPath().some(t=>t instanceof HTMLElement&&t.classList.contains("hfp-controls"))}let N=null;function Pe(r,t){if(typeof CSSStyleSheet<"u")try{N||(N=new CSSStyleSheet,N.replaceSync(t)),r.adoptedStyleSheets=[N];return}catch{}const e=document.createElement("style");e.textContent=t,r.appendChild(e)}function Re(){const r=document.createElement("div");r.className="hfp-container";const t=document.createElement("iframe");return t.className="hfp-iframe",t.sandbox.add("allow-scripts","allow-same-origin"),t.allow="autoplay; fullscreen",t.referrerPolicy="no-referrer",t.title="HyperFrames Composition",r.appendChild(t),{container:r,iframe:t}}function Ie(r,t,e,i){const s=r.offsetWidth,a=r.offsetHeight;if(s===0||a===0)return!1;const d=Math.min(s/e,a/i);return t.style.width=`${e}px`,t.style.height=`${i}px`,t.style.transform=`translate(-50%, -50%) scale(${d})`,!0}const Oe=100;class De{constructor(t){c(this,"_raf",null);c(this,"_lastUpdateMs",0);this._callbacks=t}start(t,e,i,s){this.stop();const a=()=>{if(s()){this._raf=null;return}let d;try{d=t.time()}catch{this._raf=null;return}const n=i();n>0&&(d=Math.min(d,n));const h=n>0&&d>=n,p=performance.now();if((p-this._lastUpdateMs>Oe||h)&&(this._lastUpdateMs=p,this._callbacks.onTimeUpdate(d,n)),h){if(this._callbacks.getLoop()){this._callbacks.restart();return}try{t.pause()}catch{}this._callbacks.onPaused(),this._raf=null;return}this._raf=requestAnimationFrame(a)};this._raf=requestAnimationFrame(a)}stop(){this._raf!==null&&(cancelAnimationFrame(this._raf),this._raf=null)}get isRunning(){return this._raf!==null}}function Ne(r){const t=Array.from(r.querySelectorAll("[data-composition-id]"));if(t.length===0)return r.body?[r.body]:[];const e=[];for(const i of t)He(i)||e.push(i);return Fe(r),e}function Fe(r){const t=r.body;if(!t||typeof console>"u"||typeof console.warn!="function")return;const e=t.querySelectorAll("audio[data-start], video[data-start]");if(e.length===0)return;const i=[];for(const s of e)s.closest("[data-composition-id]")||i.push(s);i.length!==0&&console.warn(`[hyperframes-player] selectMediaObserverTargets: composition hosts are present, but ${i.length} body-level timed media element(s) sit outside every [data-composition-id] subtree and will not be observed. Move them inside a composition host or the parent-frame proxy will never adopt them.`,i)}function He(r){let t=r.parentElement;for(;t;){if(t.hasAttribute("data-composition-id"))return!0;t=t.parentElement}return!1}function j(r){var e;const t=(e=r.ownerDocument)==null?void 0:e.defaultView;return t&&r instanceof t.Element?!0:r instanceof Element}function A(r){var e;if(!j(r)||r.tagName!=="AUDIO"&&r.tagName!=="VIDEO")return!1;const t=(e=r.ownerDocument)==null?void 0:e.defaultView;return t&&r instanceof t.HTMLMediaElement?!0:r instanceof HTMLMediaElement}const Ve=.05,Ue=2;class ze{constructor(t){c(this,"_entries",[]);c(this,"_mediaObserver");c(this,"_playbackErrorPosted",!1);c(this,"_audioOwner","runtime");c(this,"_urlAudioEntry",null);c(this,"_urlAudioSrc",null);c(this,"_dispatchEvent");c(this,"_getMuted");c(this,"_getVolume");c(this,"_getPlaybackRate");c(this,"_getCurrentTime");c(this,"_isPaused");this._dispatchEvent=t.dispatchEvent,this._getMuted=t.getMuted,this._getVolume=t.getVolume,this._getPlaybackRate=t.getPlaybackRate,this._getCurrentTime=t.getCurrentTime,this._isPaused=t.isPaused}get audioOwner(){return this._audioOwner}get entries(){return this._entries}resetForIframeLoad(){this._playbackErrorPosted=!1;const t=this._audioOwner==="parent";this._audioOwner="runtime",this.pauseAll(),this.teardownObserver(),t&&this._dispatchEvent(new CustomEvent("audioownershipchange",{detail:{owner:"runtime",reason:"iframe-reload"}}))}destroy(){this.teardownObserver();for(const t of this._entries)t.el.pause(),t.el.src="";this._entries=[],this._urlAudioEntry=null,this._urlAudioSrc=null,this._audioOwner="runtime",this._playbackErrorPosted=!1}updateMuted(t){for(const e of this._entries)e.el.muted=t}updateVolume(t){for(const e of this._entries)e.el.volume=t}updatePlaybackRate(t){for(const e of this._entries)e.el.playbackRate=t}_playEntry(t){t.el.src&&t.el.play().catch(e=>this._reportPlaybackError(e))}_playEntryIfActive(t){this._refreshEntryBounds(t);const e=this._getCurrentTime()-t.start;e<0||e>=t.duration||this._playEntry(t)}_refreshEntryBounds(t){var i;if(!((i=t.source)!=null&&i.isConnected))return;const e=L(t.source);t.start=e.start??0,t.duration=e.duration!=null&&e.duration>0?e.duration:Number.POSITIVE_INFINITY}_gateEntryPlayback(t,e){return e<0||e>=t.duration?(t.el.paused||t.el.pause(),t.driftSamples=0,!1):(this._audioOwner==="parent"&&!this._isPaused()&&t.el.paused&&this._playEntry(t),!0)}playAll(){for(const t of this._entries)this._playEntryIfActive(t)}pauseAll(){for(const t of this._entries)t.el.pause()}stopAdoptedMedia(){for(const t of this._entries)t.source&&t.el.pause()}seekAll(t){for(const e of this._entries){this._refreshEntryBounds(e);const i=t-e.start;i>=0&&i<e.duration&&(e.el.currentTime=i)}}scrubAll(t){for(const e of this._entries){this._refreshEntryBounds(e);const i=t-e.start;i>=0&&i<e.duration?(e.el.currentTime=i,this._playEntry(e)):e.el.paused||e.el.pause()}}mirrorTime(t,e){const i=(e==null?void 0:e.force)===!0;for(const s of this._entries){this._refreshEntryBounds(s);const a=t-s.start;this._gateEntryPlayback(s,a)&&(Math.abs(s.el.currentTime-a)>Ve?(s.driftSamples+=1,(i||s.driftSamples>=Ue)&&(s.el.currentTime=a,s.driftSamples=0)):s.driftSamples=0)}}promoteToParentProxy(t,e){if(this._audioOwner==="parent")return;if(this._audioOwner="parent",t)for(const s of t.querySelectorAll("video, audio"))A(s)&&(s.muted=!0);const i=this._getCurrentTime();e?e(i,{force:!0}):this.mirrorTime(i,{force:!0}),this._isPaused()||this.playAll(),this._dispatchEvent(new CustomEvent("audioownershipchange",{detail:{owner:"parent",reason:"autoplay-blocked"}}))}setupFromIframe(t){const e=t.querySelectorAll("audio[data-start], video[data-start]");for(const i of e)A(i)&&this._adoptIframeMedia(i);this._observeDynamicMedia(t)}setupFromUrl(t){if(this._urlAudioSrc===t&&this._urlAudioEntry)return;this.teardownUrlAudio();const e=this._createEntry(t,"audio",0,1/0);this._urlAudioEntry=e,this._urlAudioSrc=e?t:null,e&&this._audioOwner==="parent"&&!this._isPaused()&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this.playAll())}teardownUrlAudio(){const t=this._urlAudioEntry;if(this._urlAudioEntry=null,this._urlAudioSrc=null,!t)return;t.el.pause(),t.el.src="";const e=this._entries.indexOf(t);e!==-1&&this._entries.splice(e,1)}teardownObserver(){var t;(t=this._mediaObserver)==null||t.disconnect(),this._mediaObserver=void 0}_reportPlaybackError(t){this._playbackErrorPosted||(this._playbackErrorPosted=!0,this._dispatchEvent(new CustomEvent("playbackerror",{detail:{source:"parent-proxy",error:t}})))}_createEntry(t,e,i,s,a){if(this._entries.some(p=>p.el.src===t))return null;const d=e==="video"?document.createElement("video"):new Audio;d.preload="auto",d.src=t,d.load(),d.muted=this._getMuted(),d.volume=this._getVolume();const n=this._getPlaybackRate();n!==1&&(d.playbackRate=n);const h={el:d,start:i,duration:s,driftSamples:0,source:a};return this._entries.push(h),h}_resolveIframeMediaSrc(t){var i;const e=t.getAttribute("src")||((i=t.querySelector("source"))==null?void 0:i.getAttribute("src"));return e?new URL(e,t.ownerDocument.baseURI).href:null}_isSynchronizedVoiceover(t){var y,f,v;if(!t.matches('audio[data-ipw-voiceover="true"], audio[id^="vo-"], audio[src*="/audio/voice/"], audio[src*="voiceover-"]'))return!0;const i=((y=t.getAttribute("data-ipw-scene-id"))==null?void 0:y.trim())??"",s=((f=t.getAttribute("data-ipw-scene-text"))==null?void 0:f.trim())??"",a=((v=t.getAttribute("data-ipw-narration-text"))==null?void 0:v.trim())??"",d=L(t),n=i?t.ownerDocument.getElementById(i):null,h=n?L(n):null,p=Array.from(t.ownerDocument.querySelectorAll('audio[data-ipw-voiceover="true"], audio[id^="vo-"], audio[src*="/audio/voice/"], audio[src*="voiceover-"]')),u=p.indexOf(t),g=p.some((m,b)=>{if(m===t||b>u)return!1;const w=L(m);return w.start!=null&&w.duration!=null&&d.start!=null&&w.start<=d.start&&w.start+w.duration>d.start+.001});return!!(n!=null&&n.matches(".scene, [data-scene]")&&s&&a===s&&d.start!=null&&d.duration!=null&&d.duration>0&&(h==null?void 0:h.start)!=null&&Math.abs(d.start-h.start)<.001&&!g)}_adoptIframeMedia(t){if(t.preload==="metadata"||t.preload==="none")return;if(!this._isSynchronizedVoiceover(t)){t.muted=!0,t.pause();return}const e=this._resolveIframeMediaSrc(t);if(!e)return;const i=L(t),s=i.start??0,a=i.duration??Number.POSITIVE_INFINITY,d=t.tagName==="VIDEO"?"video":"audio",n=this._createEntry(e,d,s,a,t);n&&this._audioOwner==="parent"&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this._isPaused()||this._playEntryIfActive(n))}_detachIframeMedia(t){const e=this._resolveIframeMediaSrc(t);if(!e)return;const i=this._entries.findIndex(a=>a.el.src===e);if(i===-1)return;const s=this._entries[i];s.el.pause(),s.el.src="",this._entries.splice(i,1)}_observeDynamicMedia(t){if(this.teardownObserver(),typeof MutationObserver>"u"||!t.body)return;const e=new MutationObserver(a=>{for(const d of a){if(d.type==="attributes"&&d.attributeName==="preload"){const n=d.target;A(n)&&n.matches("audio[data-start], video[data-start]")&&n.preload==="auto"&&this._adoptIframeMedia(n);continue}for(const n of d.addedNodes){if(!j(n))continue;const h=[];A(n)&&n.matches("audio[data-start], video[data-start]")&&h.push(n);const p=n.querySelectorAll("audio[data-start], video[data-start]");for(const u of p)A(u)&&h.push(u);for(const u of h)this._adoptIframeMedia(u)}for(const n of d.removedNodes){if(!j(n))continue;const h=[];A(n)&&n.matches("audio[data-start], video[data-start]")&&h.push(n);const p=n.querySelectorAll("audio[data-start], video[data-start]");for(const u of p)A(u)&&h.push(u);for(const u of h)this._detachIframeMedia(u)}}}),i={childList:!0,subtree:!0,attributes:!0,attributeFilter:["preload"]},s=Ne(t);for(const a of s)e.observe(a,i);this._mediaObserver=e}}const $e=100;function Be(r,t,e,i){const s=(r.frame??0)/t,a=e.duration>0?Math.min(s,e.duration):s,d=!e.paused,n=!r.isPlaying,h=e.duration>0&&a>=e.duration&&(d||r.isPlaying);if(h&&i.getLoop())return i.media.audioOwner==="parent"&&i.media.pauseAll(),i.seek(0),i.play(),{...e,currentTime:a,paused:!1};const p={...e,currentTime:a,paused:n};i.media.audioOwner==="parent"&&(d&&n?i.media.pauseAll():!d&&!n&&i.media.playAll(),i.media.mirrorTime(a));const u=performance.now(),g=n!==e.paused;return(u-e.lastUpdateMs>$e||g)&&(p.lastUpdateMs=u,i.updateControlsTime(a,e.duration),i.updateControlsPlaying(!n),i.dispatchEvent(new CustomEvent("timeupdate",{detail:{currentTime:a}}))),h&&(i.media.audioOwner==="parent"&&i.media.pauseAll(),p.paused=!0,i.updateControlsPlaying(!1),i.dispatchEvent(new Event("ended"))),p}function je(r){return Array.isArray(r)?r.filter(t=>typeof t=="object"&&t!==null&&typeof t.id=="string"&&typeof t.start=="number"&&typeof t.duration=="number"):[]}function We(r,t,e){var a,d;if(r.source!==t)return;const i=r.data;if(!i||i.source!=="hf-preview")return;const s=me(i);if(s.status==="unsupported"){e.dispatchEvent(new CustomEvent("runtimeprotocolerror",{detail:{code:s.code,receivedVersion:s.receivedVersion}}));return}if((a=e.setRuntimeFps)==null||a.call(e,s.fps),i.type==="shader-transition-state"){const n=i.state&&typeof i.state=="object"?i.state:{};e.shaderLoader.update(n,e.getShaderLoadingMode()),e.dispatchEvent(new CustomEvent("shadertransitionstate",{detail:{compositionId:i.compositionId,state:n}}));return}if(i.type==="ready"){e.onRuntimeReady();return}if(i.type==="state"){e.setPlaybackState(Be({frame:i.frame??0,isPlaying:!!i.isPlaying},s.fps,e.getPlaybackState(),e));return}if(i.type==="media-autoplay-blocked"){if(((d=e.shouldPromoteMediaAutoplayFallback)==null?void 0:d.call(e))===!1)return;let n=null;try{n=e.getIframeDoc()}catch{}e.media.promoteToParentProxy(n,(h,p)=>e.media.mirrorTime(h,p)),e.sendControl("set-media-output-muted",{muted:!0});return}if(i.type==="timeline"&&i.durationInFrames>0){const n=Number(i.durationSeconds),h=Number(i.durationInFrames),p=Number.isFinite(n)&&n>0?n:h/s.fps;if(Number.isFinite(p)&&p>0){const u=e.getPlaybackState();e.setPlaybackState({...u,duration:p}),e.updateControlsTime(u.currentTime,p),e.onRuntimeTimelineReady(p)}Number.isFinite(i.compositionWidth)&&i.compositionWidth>0&&Number.isFinite(i.compositionHeight)&&i.compositionHeight>0&&e.setCompositionSize(i.compositionWidth,i.compositionHeight),e.setScenes(je(i.scenes));return}i.type==="stage-size"&&Number.isFinite(i.width)&&i.width>0&&Number.isFinite(i.height)&&i.height>0&&e.setCompositionSize(i.width,i.height)}const x="shader-capture-scale",k="shader-loading",qe="__hf_shader_capture_scale",Ge="__hf_shader_loading",F=["Preparing scene transitions","Sampling outgoing scene motion","Sampling incoming scene motion","Caching transition frames","Finalizing transition preview"];function W(r){if(r===null)return null;const t=Number(r);return!Number.isFinite(t)||t<=0?null:String(Math.min(1,Math.max(.25,t)))}function Xe(r){if(r===null||r.trim()==="")return"composition";const t=r.trim().toLowerCase();return t==="none"||t==="false"||t==="0"||t==="off"?"none":t==="player"||t==="true"||t==="1"||t==="on"?"player":"composition"}function he(r,t,e){e===null?r.delete(t):r.set(t,e)}function Ye(r,t,e){const i=r.indexOf("#"),s=i>=0?r.slice(0,i):r,a=i>=0?r.slice(i):"",d=s.indexOf("?"),n=d>=0?s.slice(0,d):s,h=d>=0?s.slice(d+1):"",p=new URLSearchParams(h);he(p,qe,t),he(p,Ge,e==="composition"?null:e);const u=p.toString();return`${n}${u?`?${u}`:""}${a}`}function Ze(r,t,e){if(t===null&&e==="composition")return r;const i=[];t!==null&&i.push(`window.__HF_SHADER_CAPTURE_SCALE=${JSON.stringify(t)};`),e!=="composition"&&i.push(`window.__HF_SHADER_LOADING=${JSON.stringify(e)};`);const s=`<script data-hyperframes-player-shader-options>${i.join("")}<\/script>`;return/<head\b[^>]*>/i.test(r)?r.replace(/<head\b[^>]*>/i,a=>`${a}${s}`):/<html\b[^>]*>/i.test(r)?r.replace(/<html\b[^>]*>/i,a=>`${a}${s}`):`${s}${r}`}function P(r){return Xe(r.getAttribute(k))}function Qe(r){return Number(W(r.getAttribute(x))??"1")}function z(r,t){return Ye(t,W(r.getAttribute(x)),P(r))}function $(r,t){return Ze(t,W(r.getAttribute(x)),P(r))}function Je(){const r=document.createElement("div");r.className="hfp-shader-loader",r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),r.setAttribute("aria-label","Preparing scene transitions"),r.setAttribute("data-hyperframes-ignore",""),r.draggable=!1;const t=f=>{f.preventDefault(),f.stopPropagation()};for(const f of["selectstart","dragstart","pointerdown","mousedown","click","dblclick","contextmenu","touchstart"])r.addEventListener(f,t,{capture:!0});const e=document.createElement("div");e.className="hfp-shader-loader-panel",e.draggable=!1;const i=document.createElement("div");i.className="hfp-shader-loader-mark",i.draggable=!1,i.innerHTML=['<svg width="78" height="78" viewBox="0 0 100 100" fill="none" aria-hidden="true" draggable="false">','<path d="M10.1851 57.8021L33.1145 73.8313C36.2202 75.9978 41.5173 73.5433 42.4816 69.4984L51.7611 30.4271C52.7253 26.3822 48.5802 23.9277 44.4602 26.0942L13.917 42.1235C6.96677 45.7676 4.97564 54.1579 10.1851 57.8021Z" fill="url(#hfp-shader-loader-grad-left)"/>','<path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z" fill="url(#hfp-shader-loader-grad-right)"/>',"<defs>",'<linearGradient id="hfp-shader-loader-grad-left" x1="48.5676" y1="25" x2="44.7804" y2="71.9384" gradientUnits="userSpaceOnUse">','<stop stop-color="#06E3FA"/>','<stop offset="1" stop-color="#4FDB5E"/>',"</linearGradient>",'<linearGradient id="hfp-shader-loader-grad-right" x1="54.8282" y1="73.8392" x2="72.0989" y2="32.8932" gradientUnits="userSpaceOnUse">','<stop stop-color="#06E3FA"/>','<stop offset="1" stop-color="#4FDB5E"/>',"</linearGradient>","</defs>","</svg>"].join("");const s=document.createElement("div");s.className="hfp-shader-loader-title";const a=document.createElement("span");a.className="hfp-shader-loader-title-text",a.textContent=F[0],s.appendChild(a);const d=document.createElement("div");d.className="hfp-shader-loader-detail",d.textContent="Rendering animated scene samples for shader transitions.";const n=document.createElement("div");n.className="hfp-shader-loader-track",n.setAttribute("aria-hidden","true");const h=document.createElement("div");h.className="hfp-shader-loader-fill",n.appendChild(h);const p=document.createElement("div");p.className="hfp-shader-loader-progress";const u=f=>{const v=document.createElement("div");v.className="hfp-shader-loader-row";const m=document.createElement("span");m.className="hfp-shader-loader-label",m.textContent=f;const b=document.createElement("span");return b.className="hfp-shader-loader-value",v.appendChild(m),v.appendChild(b),p.appendChild(v),{row:v,label:m,value:b}},g=u("transition"),y=u("transition frame");return e.appendChild(i),e.appendChild(s),e.appendChild(d),e.appendChild(n),e.appendChild(p),r.appendChild(e),{root:r,fill:h,title:a,detail:d,transitionValue:g.value,frameLabel:y.label,frameValue:y.value,frameRow:y.row}}const Ke=420;class et{constructor(t){c(this,"_el");c(this,"_hideTimeout",null);this._el=t}show(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._el.root.classList.remove("hfp-hiding"),this._el.root.classList.add("hfp-visible")}hide(){if(this._el.root.classList.contains("hfp-hiding")){this._hideTimeout||this._scheduleCleanup();return}this._el.root.classList.contains("hfp-visible")&&(this._el.root.classList.add("hfp-hiding"),this._el.root.classList.remove("hfp-visible"),this._scheduleCleanup())}reset(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._el.root.classList.remove("hfp-visible","hfp-hiding"),this._el.fill.style.transform="scaleX(0)",this._el.transitionValue.textContent="",this._el.frameValue.textContent="",this._el.frameRow.style.visibility="hidden"}update(t,e){if(e!=="player"){this.reset();return}if(t.ready||!t.loading){this.hide();return}const i=typeof t.progress=="number"&&Number.isFinite(t.progress)?t.progress:0,s=typeof t.total=="number"&&Number.isFinite(t.total)?t.total:0,a=s>0?Math.min(1,Math.max(0,i/s)):0,d=Math.min(F.length-1,Math.floor(a*F.length));this._el.title.textContent=F[d]||"Preparing scene transitions",this._el.detail.textContent=t.phase==="cached"?"Loading cached transition frames before playback.":t.phase==="finalizing"?"Uploading transition textures for smooth playback.":"Rendering animated scene samples for shader transitions.",this._el.fill.style.transform=`scaleX(${a})`,this._el.transitionValue.textContent=t.currentTransition!==void 0&&t.transitionTotal!==void 0?`${t.currentTransition}/${t.transitionTotal}`:s>0?`${i}/${s}`:"";const n=t.transitionFrame!==void 0&&t.transitionFrames!==void 0?`${t.transitionFrame}/${t.transitionFrames}`:"";this._el.frameLabel.textContent=t.phase==="cached"?"cached transition frames":t.phase==="finalizing"?"finalizing transition frames":"rendering transition frames",this._el.frameValue.textContent=n,this._el.frameRow.style.visibility=n?"visible":"hidden",this._el.root.setAttribute("aria-valuenow",String(Math.round(a*100))),this.show()}get hideTimeout(){return this._hideTimeout}destroy(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null)}_scheduleCleanup(){this._hideTimeout&&clearTimeout(this._hideTimeout),this._hideTimeout=setTimeout(()=>{this._el.root.classList.remove("hfp-hiding"),this._hideTimeout=null},Ke)}}const tt=.1,it=5;function B(r){return!Number.isFinite(r)||r<=0?1:Math.max(tt,Math.min(it,r))}class rt extends HTMLElement{constructor(){super();c(this,"shadow");c(this,"container");c(this,"iframe");c(this,"posterEl",null);c(this,"controlsApi",null);c(this,"resizeObserver");c(this,"shaderLoader");c(this,"probe");c(this,"_ready",!1);c(this,"_currentTime",0);c(this,"_duration",0);c(this,"_paused",!0);c(this,"_scrubbing",!1);c(this,"_lastUpdateMs",0);c(this,"_volume",1);c(this,"_compositionWidth",1920);c(this,"_compositionHeight",1080);c(this,"_rescaleWarned",!1);c(this,"_directTimelineAdapter",null);c(this,"_directTimelineClock");c(this,"_parentTickRaf",null);c(this,"_media");c(this,"_scenes",[]);c(this,"_runtimeFps",30);this.shadow=this.attachShadow({mode:"open"}),Pe(this.shadow,Ee),{container:this.container,iframe:this.iframe}=Re(),this.shadow.appendChild(this.container);const e=Je();this.shadow.appendChild(e.root),this.shaderLoader=new et(e),this._media=new ze({dispatchEvent:i=>this.dispatchEvent(i),getMuted:()=>this.muted,getVolume:()=>this._volume,getPlaybackRate:()=>this.playbackRate,getCurrentTime:()=>this._currentTime,isPaused:()=>this._paused}),this._directTimelineClock=new De({onTimeUpdate:(i,s)=>{var a;this._currentTime=i,(a=this.controlsApi)==null||a.updateTime(i,s),this.dispatchEvent(new CustomEvent("timeupdate",{detail:{currentTime:i}}))},getLoop:()=>this.loop,restart:()=>{this.seek(0),this.play()},onPaused:()=>{var i;this._media.audioOwner==="parent"&&this._media.pauseAll(),this._paused=!0,(i=this.controlsApi)==null||i.updatePlaying(!1),this.dispatchEvent(new Event("ended"))},onEnded:()=>this.loop}),this.probe=new Ae(this.iframe,{onReady:i=>this._onProbeReady(i),onError:i=>this.dispatchEvent(new CustomEvent("error",{detail:{message:i}}))}),this.addEventListener("click",i=>{ke(i)||(this._paused?this.play():this.pause())}),this.resizeObserver=new ResizeObserver(()=>this._rescale()),this._onMessage=this._onMessage.bind(this),this._onIframeLoad=this._onIframeLoad.bind(this)}static get observedAttributes(){return["src","srcdoc","width","height","controls","muted","audio-locked","volume","poster","playback-rate","audio-src",x,k]}connectedCallback(){this.resizeObserver.observe(this),window.addEventListener("message",this._onMessage),this.iframe.addEventListener("load",this._onIframeLoad),this.hasAttribute("controls")&&this._setupControls(),this.hasAttribute("poster")&&(this.posterEl=le(this.shadow,this.getAttribute("poster"),this.posterEl)),this.hasAttribute("audio-src")&&this._media.setupFromUrl(this.getAttribute("audio-src")),this.hasAttribute("srcdoc")&&(this.iframe.srcdoc=$(this,this.getAttribute("srcdoc"))),this.hasAttribute("src")&&(this.iframe.src=z(this,this.getAttribute("src"))),!this.hasAttribute("audio-locked")&&this._isLockedHostEnvironment()&&this._applyAudioLock(!0)}disconnectedCallback(){var e;this._sendControl("pause"),this._stopIframeMedia(),this.resizeObserver.disconnect(),window.removeEventListener("message",this._onMessage),this.iframe.removeEventListener("load",this._onIframeLoad),this.probe.stop(),this._directTimelineClock.stop(),this._stopParentTickClock(),this._directTimelineAdapter=null,this.shaderLoader.destroy(),this._media.destroy(),(e=this.controlsApi)==null||e.destroy(),this.controlsApi=null,this._paused=!0,this._ready=!1}attributeChangedCallback(e,i,s){var a,d,n,h,p;switch(e){case"src":s&&(this._ready=!1,this.iframe.src=z(this,s));break;case"srcdoc":this._ready=!1,s!==null?this.iframe.srcdoc=$(this,s):this.iframe.removeAttribute("srcdoc");break;case"width":this._compositionWidth=V(s)??1920,this._rescale();break;case"height":this._compositionHeight=V(s)??1080,this._rescale();break;case"controls":s!==null?this._setupControls():((a=this.controlsApi)==null||a.destroy(),this.controlsApi=null);break;case"poster":this.posterEl=le(this.shadow,s,this.posterEl);break;case"playback-rate":{const u=B(parseFloat(s||"1"));this._media.updatePlaybackRate(u),this._sendControl("set-playback-rate",{playbackRate:u}),(n=(d=this._directTimelineAdapter)==null?void 0:d.timeScale)==null||n.call(d,u),(h=this.controlsApi)==null||h.updateSpeed(u),this.dispatchEvent(new Event("ratechange"));break}case"muted":this._handleMutedChange(s);break;case"audio-locked":this._applyAudioLock(s!==null);break;case"volume":{const u=Math.max(0,Math.min(1,parseFloat(s||"1")));this._volume=u,this._media.updateVolume(u),this._sendControl("set-volume",{volume:u}),(p=this.controlsApi)==null||p.updateVolume(u),this.dispatchEvent(new Event("volumechange"));break}case"audio-src":s?this._media.setupFromUrl(s):this._media.teardownUrlAudio();break;case x:case k:this._reloadShaderOptions();break}}get iframeElement(){return this.iframe}get scenes(){return this._scenes}play(){var i,s;(i=this.posterEl)==null||i.remove(),this.posterEl=null,this._duration>0&&this._currentTime>=this._duration&&this.seek(0),this._paused=!1;const e=this._tryDirectTimelinePlay();e||(this._sendControl("play"),this._ready&&!this._directTimelineAdapter&&this._startParentTickClock()),this._media.audioOwner==="parent"&&this._media.playAll(),(s=this.controlsApi)==null||s.updatePlaying(!0),this.dispatchEvent(new Event("play")),e&&this._directTimelineAdapter&&this._directTimelineClock.start(this._directTimelineAdapter,()=>this._currentTime,()=>this._duration,()=>this._paused)}pause(){var e;this._tryDirectTimelinePause()||this._sendControl("pause"),this._directTimelineClock.stop(),this._stopParentTickClock(),this._media.audioOwner==="parent"&&this._media.pauseAll(),this._paused=!0,(e=this.controlsApi)==null||e.updatePlaying(!1),this.dispatchEvent(new Event("pause"))}stopMedia(){this._sendControl("stop-media"),this._stopIframeMedia(),this._media.stopAdoptedMedia()}seek(e){var i,s;!this._trySyncSeek(e)&&!this._tryDirectTimelineSeek(e)&&this._sendControl("seek",{timeSeconds:e,frame:Math.round(e*this._runtimeFps)}),this._directTimelineClock.stop(),this._stopParentTickClock(),this._currentTime=e,this._media.audioOwner==="parent"&&(this._scrubbing?this._media.scrubAll(e):(this._media.pauseAll(),this._media.seekAll(e))),this._paused=!0,(i=this.controlsApi)==null||i.updatePlaying(!1),(s=this.controlsApi)==null||s.updateTime(this._currentTime,this._duration)}setColorGrading(e,i){this._sendControl("set-color-grading",{target:e,grading:i})}clearColorGrading(e){this._sendControl("set-color-grading",{target:e,grading:null})}setColorGradingCompare(e,i){this._sendControl("set-color-grading-compare",{target:e,compare:i})}clearColorGradingCompare(e){this._sendControl("set-color-grading-compare",{target:e,compare:{enabled:!1}})}get currentTime(){return this._currentTime}set currentTime(e){this.seek(e)}get duration(){return this._duration}get paused(){return this._paused}get ready(){return this._ready}get playbackRate(){return B(parseFloat(this.getAttribute("playback-rate")||"1"))}set playbackRate(e){this.setAttribute("playback-rate",String(B(e)))}get shaderCaptureScale(){return Qe(this)}set shaderCaptureScale(e){this.setAttribute(x,String(e))}get shaderLoading(){return P(this)}set shaderLoading(e){e==="composition"?this.removeAttribute(k):this.setAttribute(k,e)}get muted(){return this.hasAttribute("muted")}set muted(e){e?this.setAttribute("muted",""):this.removeAttribute("muted")}get audioLocked(){return this.hasAttribute("audio-locked")}set audioLocked(e){e?this.setAttribute("audio-locked",""):this.removeAttribute("audio-locked")}_isLockedHostEnvironment(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"";return/\bClaude\/\d/.test(e)&&/\bElectron\b/.test(e)}_isAudioLocked(){return this.hasAttribute("audio-locked")||this._isLockedHostEnvironment()}_isSlideshowPlayer(){return this.closest("hyperframes-slideshow")!==null}_handleMutedChange(e){var i;if(e===null&&this._isAudioLocked()){this.setAttribute("muted","");return}this._media.updateMuted(e!==null),this._setIframeMediaMuted(e!==null),this._sendControl("set-muted",{muted:e!==null}),(i=this.controlsApi)==null||i.updateMuted(e!==null),this.dispatchEvent(new Event("volumechange"))}_applyAudioLock(e){var i;e&&(this.muted=!0),(i=this.controlsApi)==null||i.setVolumeControlsHidden(e)}get volume(){return this._volume}set volume(e){this.setAttribute("volume",String(Math.max(0,Math.min(1,e))))}get loop(){return this.hasAttribute("loop")}set loop(e){e?this.setAttribute("loop",""):this.removeAttribute("loop")}_sendControl(e,i={}){var s;try{(s=this.iframe.contentWindow)==null||s.postMessage({...i,source:"hf-parent",type:"control",action:e,...fe(this._runtimeFps)},"*")}catch{}}_getSameOriginIframeDocument(){try{return this.iframe.contentDocument}catch{return null}}_setIframeMediaMuted(e){const i=this._getSameOriginIframeDocument();if(i)for(const s of i.querySelectorAll("video, audio"))A(s)&&(s.muted=e||s.defaultMuted)}_stopIframeMedia(){const e=this._getSameOriginIframeDocument();if(e)for(const i of e.querySelectorAll("video, audio"))A(i)&&i.pause()}_replayBridgeState(){this._sendControl("set-muted",{muted:this.muted}),this._sendControl("set-volume",{volume:this._volume}),this._sendControl("set-playback-rate",{playbackRate:this.playbackRate}),this._sendControl("set-native-media-sync-disabled",{disabled:this._isSlideshowPlayer()}),this._sendControl("set-web-audio-media-disabled",{disabled:this._isSlideshowPlayer()})}_reloadShaderOptions(){if(P(this)!=="player"&&this.shaderLoader.reset(),this.hasAttribute("srcdoc")){this.iframe.srcdoc=$(this,this.getAttribute("srcdoc")||"");return}this.hasAttribute("src")&&(this.iframe.src=z(this,this.getAttribute("src")||""))}_trySyncSeek(e){try{const i=this.iframe.contentWindow,s=i==null?void 0:i.__player;return typeof(s==null?void 0:s.seek)!="function"?!1:(s.seek.call(s,e),!0)}catch{return!1}}_withDirectTimeline(e){const i=this._directTimelineAdapter||this.probe.resolveDirectTimelineAdapter();if(!i)return!1;try{return e(i),this._directTimelineAdapter=i,!0}catch{return!1}}_tryDirectTimelineSeek(e){return this._withDirectTimeline(i=>{i.seek(e,!1),i.pause()})}_tryDirectTimelinePlay(){return this._withDirectTimeline(e=>void e.play())}_tryDirectTimelinePause(){return this._withDirectTimeline(e=>void e.pause())}_startParentTickClock(){this._stopParentTickClock();const e=()=>{if(this._paused){this._parentTickRaf=null;return}this._sendControl("tick"),this._parentTickRaf=requestAnimationFrame(e)};this._parentTickRaf=requestAnimationFrame(e)}_stopParentTickClock(){this._parentTickRaf!==null&&(cancelAnimationFrame(this._parentTickRaf),this._parentTickRaf=null)}_onMessage(e){We(e,this.iframe.contentWindow,{getPlaybackState:()=>({currentTime:this._currentTime,duration:this._duration,paused:this._paused,lastUpdateMs:this._lastUpdateMs}),setPlaybackState:({currentTime:i,duration:s,paused:a,lastUpdateMs:d})=>{this._currentTime=i,this._duration=s,this._paused=a,this._lastUpdateMs=d},getShaderLoadingMode:()=>P(this),shaderLoader:this.shaderLoader,setCompositionSize:(i,s)=>{this._compositionWidth=i,this._compositionHeight=s,this._rescale()},sendControl:(i,s)=>this._sendControl(i,s),getIframeDoc:()=>this.iframe.contentDocument,onRuntimeReady:()=>this._replayBridgeState(),onRuntimeTimelineReady:i=>this._onRuntimeTimelineReady(i),setRuntimeFps:i=>{this._runtimeFps=i},shouldPromoteMediaAutoplayFallback:()=>!this._isSlideshowPlayer(),setScenes:i=>{this._scenes=i,this.dispatchEvent(new CustomEvent("scenes",{detail:{scenes:i}}))},updateControlsTime:(i,s)=>{var a;return(a=this.controlsApi)==null?void 0:a.updateTime(i,s)},updateControlsPlaying:i=>{var s;return(s=this.controlsApi)==null?void 0:s.updatePlaying(i)},dispatchEvent:i=>this.dispatchEvent(i),seek:i=>this.seek(i),play:()=>this.play(),getLoop:()=>this.loop,media:this._media})}_onRuntimeTimelineReady(e){var s;if(this._ready)return;this.probe.stop(),this._duration=e,this._directTimelineAdapter=null,this._ready=!0,(s=this.controlsApi)==null||s.updateTime(this._currentTime,e),this.dispatchEvent(new CustomEvent("ready",{detail:{duration:e}})),this._rescale();const i=this._getSameOriginIframeDocument();i&&this._media.setupFromIframe(i),this._replayBridgeState(),this._setIframeMediaMuted(this.muted),this.hasAttribute("autoplay")&&this.play()}_onProbeReady({duration:e,adapter:i,compositionSize:s}){var a;this._duration=e,this._directTimelineAdapter=i.kind==="direct-timeline"?i.timeline:null,this._ready=!0,(a=this.controlsApi)==null||a.updateTime(0,e),this.dispatchEvent(new CustomEvent("ready",{detail:{duration:e}})),s&&(this._compositionWidth=s.width,this._compositionHeight=s.height,this._rescale());try{const d=this.iframe.contentDocument;d&&this._media.setupFromIframe(d)}catch{}this._setIframeMediaMuted(this.muted),this.hasAttribute("autoplay")&&this.play()}_rescale(){!Ie(this,this.iframe,this._compositionWidth,this._compositionHeight)&&this._ready&&!this._rescaleWarned&&(this._rescaleWarned=!0,console.warn("[hyperframes-player] rescale no-op after ready — zero-size player element",{src:this.getAttribute("src"),offsetWidth:this.offsetWidth,offsetHeight:this.offsetHeight,compositionWidth:this._compositionWidth,compositionHeight:this._compositionHeight}))}_onIframeLoad(){this._ready=!1,this._directTimelineAdapter=null,this._directTimelineClock.stop(),this._stopParentTickClock(),this.shaderLoader.reset(),this._media.resetForIframeLoad(),this.probe.start()}_setupControls(){this.controlsApi||(this.controlsApi=Le(this.shadow,this.muted,this._volume,this.getAttribute("speed-presets"),{onPlay:()=>this.play(),onPause:()=>this.pause(),onSeek:e=>this.seek(e*this._duration),onScrubStart:()=>{this._scrubbing=!0},onScrubEnd:()=>{this._scrubbing=!1,this.seek(this._currentTime)},onSpeedChange:e=>void(this.playbackRate=e),onMuteToggle:()=>void(this.muted=!this.muted),onVolumeChange:e=>void(this.volume=e)},this._isAudioLocked()))}get _audioOwner(){return this._media.audioOwner}get _parentMedia(){return this._media.entries}_mirrorParentMediaTime(e,i){this._media.mirrorTime(e,i)}_promoteToParentProxy(){let e=null;try{e=this.iframe.contentDocument}catch{}this._media.promoteToParentProxy(e,(i,s)=>this._mirrorParentMediaTime(i,s)),this._sendControl("set-media-output-muted",{muted:!0})}_observeDynamicMedia(e){this._media.setupFromIframe(e)}}customElements.get("hyperframes-player")||customElements.define("hyperframes-player",rt);export{rt as HyperframesPlayer,xe as SPEED_PRESETS,U as formatSpeed,de as formatTime};
