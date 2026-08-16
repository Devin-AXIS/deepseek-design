"use strict";var HyperframesPlayer=(()=>{var K=Object.defineProperty;var Ge=Object.getOwnPropertyDescriptor;var qe=Object.getOwnPropertyNames;var Ye=Object.prototype.hasOwnProperty;var Xe=(i,e)=>{for(var t in e)K(i,t,{get:e[t],enumerable:!0})},Ze=(i,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of qe(e))!Ye.call(i,n)&&n!==t&&K(i,n,{get:()=>e[n],enumerable:!(r=Ge(e,n))||r.enumerable});return i};var Qe=i=>Ze(K({},"__esModule",{value:!0}),i);var kt={};Xe(kt,{HyperframesPlayer:()=>J,SPEED_PRESETS:()=>re,formatSpeed:()=>O,formatTime:()=>W});function ye(i){return i.hasRuntime||i.runtimeInjected?!1:!!(i.hasNestedCompositions||i.hasTimelines&&i.attempts>=5)}function D(i){return typeof i=="object"&&i!==null}function Ee(i){return D(i)&&typeof i.getDuration=="function"}function Se(i){return D(i)&&typeof i.duration=="function"&&typeof i.time=="function"&&typeof i.seek=="function"&&typeof i.play=="function"&&typeof i.pause=="function"}var Je="https://cdn.jsdelivr.net/npm/@hyperframes/core@0.7.60/dist/hyperframe.runtime.iife.js";function N(i){if(i===null)return null;let e=Number.parseInt(i,10);return Number.isFinite(e)&&e>0?e:null}function Ke(i){let e=i?.querySelector("[data-composition-id][data-width][data-height]")??i?.querySelector("[data-width][data-height]");if(!e)return null;let t=N(e.getAttribute("data-width")),r=N(e.getAttribute("data-height"));return t!==null&&r!==null?{width:t,height:r}:null}var $=class{constructor(e,t){this._iframe=e;this._callbacks=t}_iframe;_callbacks;_interval=null;_runtimeInjected=!1;get runtimeInjected(){return this._runtimeInjected}start(){this.stop(),this._runtimeInjected=!1;let e=0;this._interval=setInterval(()=>{e++;try{let t=this._iframe.contentWindow;if(!t)return;let r=!!(t.__hf||t.__player),n=!!(t.__timelines&&Object.keys(t.__timelines).length>0),o=!!this._iframe.contentDocument?.querySelector("[data-composition-src]");if(ye({hasRuntime:r,hasTimelines:n,hasNestedCompositions:o,runtimeInjected:this._runtimeInjected,attempts:e})){this._injectRuntime();return}if(this._runtimeInjected&&!r)return;let a=this._resolvePlaybackDurationAdapter(t);if(a&&a.getDuration()>0){this.stop();let l=Ke(this._iframe.contentDocument);this._callbacks.onReady({duration:a.getDuration(),adapter:a,compositionSize:l});return}}catch{}e>=40&&(this.stop(),this._callbacks.onError("Composition timeline not found after 8s"))},200)}stop(){this._interval!==null&&(clearInterval(this._interval),this._interval=null)}resolveDirectTimelineAdapter(){try{let e=this._iframe.contentWindow;return e?this._resolveDirectTimelineAdapterFromWindow(e):null}catch{return null}}resolveDirectTimelineAdapterFromWindow(e){return this._resolveDirectTimelineAdapterFromWindow(e)}hasRuntimeBridge(e){return Reflect.get(e,"__hf")!==void 0||D(Reflect.get(e,"__player"))}_injectRuntime(){this._runtimeInjected=!0;try{let e=this._iframe.contentDocument;if(!e)return;let t=e.createElement("script");t.src=Je,(e.head||e.documentElement).appendChild(t),this._callbacks.onRuntimeInjected?.()}catch{}}_resolveDirectTimelineAdapterFromWindow(e){if(this.hasRuntimeBridge(e))return null;let t=Reflect.get(e,"__timelines");if(!D(t))return null;let r=Object.keys(t);if(r.length===0)return null;let n=this._iframe.contentDocument?.querySelector("[data-composition-id]")?.getAttribute("data-composition-id"),o=n&&n in t?n:r[r.length-1],a=t[o];return Se(a)?a:null}_resolvePlaybackDurationAdapter(e){let t=Reflect.get(e,"__player");if(Ee(t))return{kind:"runtime",getDuration:()=>t.getDuration()};let r=this._resolveDirectTimelineAdapterFromWindow(e);return r?{kind:"direct-timeline",timeline:r,getDuration:()=>r.duration()}:null}};var Te=`
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
     media or controls) \u2014 let pointer events reach the iframe content. */
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

  /* \u2500\u2500 Theming via CSS custom properties \u2500\u2500
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
`,Ae='<svg width="24" height="24" viewBox="46 21 54 56" fill="currentColor"><path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z"/></svg>',we='<svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="2" width="4" height="14"/><rect x="11" y="2" width="4" height="14"/></svg>',ee='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',te='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',Ce='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" opacity="0.3"/><line x1="18" y1="7" x2="14" y2="17" stroke="currentColor" stroke-width="2"/></svg>';var re=[.25,.5,1,1.5,2,4];function O(i){return Number.isInteger(i)?`${i}x`:`${i}x`}function W(i){if(!Number.isFinite(i)||i<0)return"0:00";let e=Math.floor(i),t=Math.floor(e/60),r=e%60;return`${t}:${r.toString().padStart(2,"0")}`}function xe(i,e,t={}){let r=t.speedPresets??re,n=document.createElement("div");n.className="hfp-controls",n.addEventListener("click",s=>{s.stopPropagation()});let o=document.createElement("button");o.className="hfp-play-btn",o.type="button",o.innerHTML=`<span class="hfp-ico hfp-ico-play">${Ae}</span><span class="hfp-ico hfp-ico-pause">${we}</span>`,o.setAttribute("aria-label","Play");let a=document.createElement("div");a.className="hfp-scrubber";let l=document.createElement("div");l.className="hfp-progress",l.style.width="0%",a.appendChild(l);let u=document.createElement("span");u.className="hfp-time",u.textContent="0:00 / 0:00";let p=document.createElement("div");p.className="hfp-speed-wrap";let c=document.createElement("button");c.className="hfp-speed-btn",c.type="button",c.textContent="1x",c.setAttribute("aria-label","Playback speed");let v=document.createElement("div");v.className="hfp-speed-menu",v.setAttribute("role","menu");for(let s of r){let d=document.createElement("button");d.className="hfp-speed-option",d.type="button",d.setAttribute("role","menuitem"),d.dataset.speed=String(s),d.textContent=O(s),s===1&&d.classList.add("hfp-active"),v.appendChild(d)}p.appendChild(v),p.appendChild(c);let _=document.createElement("div");_.className="hfp-volume-wrap";let f=document.createElement("button");f.className="hfp-mute-btn",f.type="button",f.innerHTML=ee,f.setAttribute("aria-label","Mute");let g=document.createElement("div");g.className="hfp-volume-slider-wrap";let m=document.createElement("div");m.className="hfp-volume-slider",m.setAttribute("role","slider"),m.setAttribute("aria-label","Volume"),m.setAttribute("aria-valuemin","0"),m.setAttribute("aria-valuemax","100"),m.setAttribute("aria-valuenow","100"),m.tabIndex=0;let S=document.createElement("div");S.className="hfp-volume-fill",S.style.width="100%",m.appendChild(S),g.appendChild(m),_.appendChild(g),_.appendChild(f),t.audioLocked&&(_.style.display="none"),n.appendChild(o),n.appendChild(a),n.appendChild(u),n.appendChild(_),n.appendChild(p),i.appendChild(n);let F=!1,C=!1,A=1,I=null,H=r.indexOf(1);H===-1&&(H=0);let U=(s,d)=>s?Ce:d===0?te:d<.5?te:ee;o.addEventListener("click",s=>{s.stopPropagation(),F?e.onPause():e.onPlay()}),f.addEventListener("click",s=>{s.stopPropagation(),e.onMuteToggle()});let x=!1,V=s=>{let d=m.getBoundingClientRect(),b=Math.max(0,Math.min(1,(s-d.left)/d.width));A=b,S.style.width=`${b*100}%`,m.setAttribute("aria-valuenow",String(Math.round(b*100))),C&&b>0&&e.onMuteToggle(),f.innerHTML=U(C,b),e.onVolumeChange(b)};m.addEventListener("mousedown",s=>{s.stopPropagation(),x=!0,V(s.clientX)});let ae=s=>{x&&V(s.clientX)},se=()=>{x=!1};document.addEventListener("mousemove",ae),document.addEventListener("mouseup",se),m.addEventListener("touchstart",s=>{x=!0;let d=s.touches[0];d&&V(d.clientX)},{passive:!0});let le=s=>{if(x){let d=s.touches[0];d&&V(d.clientX)}},de=()=>{x=!1};document.addEventListener("touchmove",le,{passive:!0}),document.addEventListener("touchend",de);let ue=.05;m.addEventListener("keydown",s=>{let d=A;if(s.key==="ArrowRight"||s.key==="ArrowUp")d=Math.min(1,A+ue);else if(s.key==="ArrowLeft"||s.key==="ArrowDown")d=Math.max(0,A-ue);else return;s.preventDefault(),s.stopPropagation(),A=d,S.style.width=`${d*100}%`,m.setAttribute("aria-valuenow",String(Math.round(d*100))),C&&d>0&&e.onMuteToggle(),f.innerHTML=U(C,d),e.onVolumeChange(d)});let ce=s=>{for(let d of v.querySelectorAll(".hfp-speed-option"))d.classList.toggle("hfp-active",d.dataset.speed===String(s))};c.addEventListener("click",s=>{s.stopPropagation();let d=v.classList.toggle("hfp-open");c.setAttribute("aria-expanded",String(d))}),v.addEventListener("click",s=>{s.stopPropagation();let d=s.target.closest(".hfp-speed-option");if(!d)return;let b=parseFloat(d.dataset.speed);H=r.indexOf(b),c.textContent=O(b),ce(b),v.classList.remove("hfp-open"),c.setAttribute("aria-expanded","false"),e.onSpeedChange(b)});let pe=()=>{v.classList.remove("hfp-open"),c.setAttribute("aria-expanded","false")};document.addEventListener("click",pe);let z=s=>{let d=a.getBoundingClientRect(),b=Math.max(0,Math.min(1,(s-d.left)/d.width));e.onSeek(b)},T=!1;a.addEventListener("mousedown",s=>{s.stopPropagation(),T=!0,e.onScrubStart?.(),z(s.clientX)});let he=s=>{T&&z(s.clientX)},me=()=>{T&&(T=!1,e.onScrubEnd?.())};document.addEventListener("mousemove",he),document.addEventListener("mouseup",me),a.addEventListener("touchstart",s=>{T=!0,e.onScrubStart?.();let d=s.touches[0];d&&z(d.clientX)},{passive:!0});let fe=s=>{if(T){let d=s.touches[0];d&&z(d.clientX)}},be=()=>{T&&(T=!1,e.onScrubEnd?.())};document.addEventListener("touchmove",fe,{passive:!0}),document.addEventListener("touchend",be);let ve=()=>{I&&clearTimeout(I),I=setTimeout(()=>{F&&n.classList.add("hfp-hidden")},3e3)},j=i instanceof ShadowRoot?i.host:i,ge=()=>{n.classList.remove("hfp-hidden"),ve()},_e=()=>{F&&n.classList.add("hfp-hidden")};return j.addEventListener("mousemove",ge),j.addEventListener("mouseleave",_e),{updateTime(s,d){let b=d>0?Math.min(s,d):s,Be=d>0?b/d*100:0;l.style.width=`${Be}%`,u.textContent=`${W(b)} / ${W(d)}`},updatePlaying(s){F=s,o.classList.toggle("hfp-playing",s),o.setAttribute("aria-label",s?"Pause":"Play"),s?ve():n.classList.remove("hfp-hidden")},updateSpeed(s){let d=r.indexOf(s);d!==-1&&(H=d),c.textContent=O(s),ce(s)},updateMuted(s){C=s,f.innerHTML=U(s,A),f.setAttribute("aria-label",s?"Unmute":"Mute")},updateVolume(s){A=s,S.style.width=`${s*100}%`,m.setAttribute("aria-valuenow",String(Math.round(s*100))),f.innerHTML=U(C,s)},setVolumeControlsHidden(s){_.style.display=s?"none":""},show(){n.style.display=""},hide(){n.style.display="none"},destroy(){document.removeEventListener("mousemove",he),document.removeEventListener("mouseup",me),document.removeEventListener("touchmove",fe),document.removeEventListener("touchend",be),document.removeEventListener("mousemove",ae),document.removeEventListener("mouseup",se),document.removeEventListener("touchmove",le),document.removeEventListener("touchend",de),document.removeEventListener("click",pe),j.removeEventListener("mousemove",ge),j.removeEventListener("mouseleave",_e),I&&clearTimeout(I),n.remove()}}}function ke(i,e,t,r,n,o=!1){let a=r?r.split(",").map(Number).filter(p=>!isNaN(p)&&p>0):void 0,l={...a?{speedPresets:a}:{},audioLocked:o},u=xe(i,n,l);return u.updateMuted(e),u.updateVolume(t),u}function ie(i,e,t){return e?(t||(t=document.createElement("img"),t.className="hfp-poster",i.appendChild(t)),t.src=e,t):(t?.remove(),null)}function Me(i){return i.composedPath().some(e=>e instanceof HTMLElement&&e.classList.contains("hfp-controls"))}var B=null;function Le(i,e){if(typeof CSSStyleSheet<"u")try{B||(B=new CSSStyleSheet,B.replaceSync(e)),i.adoptedStyleSheets=[B];return}catch{}let t=document.createElement("style");t.textContent=e,i.appendChild(t)}function Pe(){let i=document.createElement("div");i.className="hfp-container";let e=document.createElement("iframe");return e.className="hfp-iframe",e.sandbox.add("allow-scripts","allow-same-origin"),e.allow="autoplay; fullscreen",e.referrerPolicy="no-referrer",e.title="HyperFrames Composition",i.appendChild(e),{container:i,iframe:e}}function Re(i,e,t,r){let n=i.offsetWidth,o=i.offsetHeight;if(n===0||o===0)return!1;let a=Math.min(n/t,o/r);return e.style.width=`${t}px`,e.style.height=`${r}px`,e.style.transform=`translate(-50%, -50%) scale(${a})`,!0}var G=class{constructor(e){this._callbacks=e}_callbacks;_raf=null;_lastUpdateMs=0;start(e,t,r,n){this.stop();let o=()=>{if(n()){this._raf=null;return}let a;try{a=e.time()}catch{this._raf=null;return}let l=r();l>0&&(a=Math.min(a,l));let u=l>0&&a>=l,p=performance.now();if((p-this._lastUpdateMs>100||u)&&(this._lastUpdateMs=p,this._callbacks.onTimeUpdate(a,l)),u){if(this._callbacks.getLoop()){this._callbacks.restart();return}try{e.pause()}catch{}this._callbacks.onPaused(),this._raf=null;return}this._raf=requestAnimationFrame(o)};this._raf=requestAnimationFrame(o)}stop(){this._raf!==null&&(cancelAnimationFrame(this._raf),this._raf=null)}get isRunning(){return this._raf!==null}};function Ie(i){let e=Array.from(i.querySelectorAll("[data-composition-id]"));if(e.length===0)return i.body?[i.body]:[];let t=[];for(let r of e)tt(r)||t.push(r);return et(i),t}function et(i){let e=i.body;if(!e||typeof console>"u"||typeof console.warn!="function")return;let t=e.querySelectorAll("audio[data-start], video[data-start]");if(t.length===0)return;let r=[];for(let n of t)n.closest("[data-composition-id]")||r.push(n);r.length!==0&&console.warn(`[hyperframes-player] selectMediaObserverTargets: composition hosts are present, but ${r.length} body-level timed media element(s) sit outside every [data-composition-id] subtree and will not be observed. Move them inside a composition host or the parent-frame proxy will never adopt them.`,r)}function tt(i){let e=i.parentElement;for(;e;){if(e.hasAttribute("data-composition-id"))return!0;e=e.parentElement}return!1}function q(i){let e=i.ownerDocument?.defaultView;return e&&i instanceof e.Element?!0:i instanceof Element}function E(i){if(!q(i)||i.tagName!=="AUDIO"&&i.tagName!=="VIDEO")return!1;let e=i.ownerDocument?.defaultView;return e&&i instanceof e.HTMLMediaElement?!0:i instanceof HTMLMediaElement}var h=Object.freeze({start:"data-start",duration:"data-duration",trackIndex:"data-track-index",derivedEnd:"data-end",legacyTrack:"data-layer"}),Wt=Object.freeze([h.start,h.duration,h.trackIndex]),Bt=Object.freeze([h.derivedEnd]),Gt=Object.freeze([h.derivedEnd,h.legacyTrack]);function k(i){if(i==null||i.trim()==="")return null;let e=Number(i);return Number.isFinite(e)?e:null}var Oe=/^[A-Za-z0-9_.:-]+$/;function Fe(i,e){let t=i.charCodeAt(e);return t>=48&&t<=57}function De(i,e){let t=e;for(;t>=0&&Fe(i,t);)t--;return t}function rt(i,e){let t=e;for(;t>=0&&(i[t]??"").trim()==="";)t--;return t}function it(i){let e=i.length-1;if(!Fe(i,e))return null;let t=De(i,e);return i[t]==="."&&(t=De(i,t-1)),t+1}function nt(i){let e=it(i);if(e==null)return null;let t=rt(i,e-1),r=i[t];if(r!=="+"&&r!=="-")return null;let n=i.slice(0,t).trim();if(!Oe.test(n))return null;let o=Number(i.slice(e));return Number.isFinite(o)?{refId:n,operator:r,magnitude:o}:null}function ot(i){let e=(i??"").trim();if(!e)return null;let t=k(e);if(t!=null)return{kind:"absolute",value:t};if(Oe.test(e))return{kind:"reference",refId:e,offset:0};let r=nt(e);return r?{kind:"reference",refId:r.refId,offset:r.operator==="-"?-r.magnitude:r.magnitude}:null}function y(i,e,t,r){i.push({code:e,attribute:t,value:r})}function at(i,e,t,r){if(e==null||e.trim()==="")return t.defaultStart===void 0?0:t.defaultStart;if(!i)return y(r,"invalid-start",h.start,e),null;if(i.kind==="absolute")return Math.max(0,i.value);let n=t.resolveReferenceEnd?.(i.refId);return n==null||!Number.isFinite(n)?(y(r,"unresolved-start-reference",h.start,e),null):Math.max(0,n+i.offset)}function st(i,e,t){y(t,"deprecated-end",h.derivedEnd,i);let r=k(i);r==null?y(t,"invalid-end",h.derivedEnd,i):e!=null&&r!==e&&y(t,"conflicting-end",h.derivedEnd,i)}function lt(i,e,t){let r=k(i);return r==null||r<0?(y(t,"invalid-duration",h.duration,i),{duration:null,end:null,durationSource:"invalid"}):{duration:r,end:e==null?null:e+r,durationSource:"duration"}}function dt(i,e,t){y(t,"deprecated-end",h.derivedEnd,i);let r=k(i);return r==null?(y(t,"invalid-end",h.derivedEnd,i),{duration:null,end:null,durationSource:"invalid"}):e==null?{duration:null,end:r,durationSource:"legacy-end"}:r<e?(y(t,"end-before-start",h.derivedEnd,i),{duration:null,end:null,durationSource:"invalid"}):{duration:r-e,end:r,durationSource:"legacy-end"}}function ut(i,e,t){let r=i.getAttribute(h.duration),n=i.getAttribute(h.derivedEnd);if(r==null)return n==null?{duration:null,end:null,durationSource:"missing"}:dt(n,e,t);let o=lt(r,e,t);return n!=null&&st(n,o.end,t),o}function Ne(i,e,t,r){let n=k(i);return n==null||!Number.isInteger(n)?(y(r,"invalid-track-index",e,i),{trackIndex:0,trackSource:"invalid"}):{trackIndex:n,trackSource:t}}function ct(i,e){let t=i.getAttribute(h.trackIndex),r=i.getAttribute(h.legacyTrack);if(t==null&&r==null)return{trackIndex:0,trackSource:"default"};if(t==null&&r!=null)return y(e,"deprecated-layer",h.legacyTrack,r),Ne(r,h.legacyTrack,"legacy-layer",e);let n=Ne(t??"",h.trackIndex,"track-index",e);if(r==null)return n;y(e,"deprecated-layer",h.legacyTrack,r);let o=k(r);return o!=null&&o!==n.trackIndex&&y(e,"conflicting-layer",h.legacyTrack,r),n}function M(i,e={}){let t=[],r=i.getAttribute(h.start),n=ot(r),o=at(n,r,e,t),a=ut(i,o,t),l=ct(i,t);return{startExpression:n,start:o,...a,...l,diagnostics:t}}var pt=.05,ht=2,Y=class{_entries=[];_mediaObserver;_playbackErrorPosted=!1;_audioOwner="runtime";_urlAudioEntry=null;_urlAudioSrc=null;_dispatchEvent;_getMuted;_getVolume;_getPlaybackRate;_getCurrentTime;_isPaused;constructor(e){this._dispatchEvent=e.dispatchEvent,this._getMuted=e.getMuted,this._getVolume=e.getVolume,this._getPlaybackRate=e.getPlaybackRate,this._getCurrentTime=e.getCurrentTime,this._isPaused=e.isPaused}get audioOwner(){return this._audioOwner}get entries(){return this._entries}resetForIframeLoad(){this._playbackErrorPosted=!1;let e=this._audioOwner==="parent";this._audioOwner="runtime",this.pauseAll(),this.teardownObserver(),e&&this._dispatchEvent(new CustomEvent("audioownershipchange",{detail:{owner:"runtime",reason:"iframe-reload"}}))}destroy(){this.teardownObserver();for(let e of this._entries)e.el.pause(),e.el.src="";this._entries=[],this._urlAudioEntry=null,this._urlAudioSrc=null,this._audioOwner="runtime",this._playbackErrorPosted=!1}updateMuted(e){for(let t of this._entries)t.el.muted=e}updateVolume(e){for(let t of this._entries)t.el.volume=e}updatePlaybackRate(e){for(let t of this._entries)t.el.playbackRate=e}_playEntry(e){e.el.src&&e.el.play().catch(t=>this._reportPlaybackError(t))}_playEntryIfActive(e){this._refreshEntryBounds(e);let t=this._getCurrentTime()-e.start;t<0||t>=e.duration||this._playEntry(e)}_refreshEntryBounds(e){if(!e.source?.isConnected)return;let t=M(e.source);e.start=t.start??0,e.duration=t.duration!=null&&t.duration>0?t.duration:Number.POSITIVE_INFINITY}_gateEntryPlayback(e,t){return t<0||t>=e.duration?(e.el.paused||e.el.pause(),e.driftSamples=0,!1):(this._audioOwner==="parent"&&!this._isPaused()&&e.el.paused&&this._playEntry(e),!0)}playAll(){for(let e of this._entries)this._playEntryIfActive(e)}pauseAll(){for(let e of this._entries)e.el.pause()}stopAdoptedMedia(){for(let e of this._entries)e.source&&e.el.pause()}seekAll(e){for(let t of this._entries){this._refreshEntryBounds(t);let r=e-t.start;r>=0&&r<t.duration&&(t.el.currentTime=r)}}scrubAll(e){for(let t of this._entries){this._refreshEntryBounds(t);let r=e-t.start;r>=0&&r<t.duration?(t.el.currentTime=r,this._playEntry(t)):t.el.paused||t.el.pause()}}mirrorTime(e,t){let r=t?.force===!0;for(let n of this._entries){this._refreshEntryBounds(n);let o=e-n.start;this._gateEntryPlayback(n,o)&&(Math.abs(n.el.currentTime-o)>pt?(n.driftSamples+=1,(r||n.driftSamples>=ht)&&(n.el.currentTime=o,n.driftSamples=0)):n.driftSamples=0)}}promoteToParentProxy(e,t){if(this._audioOwner==="parent")return;if(this._audioOwner="parent",e)for(let n of e.querySelectorAll("video, audio"))E(n)&&(n.muted=!0);let r=this._getCurrentTime();t?t(r,{force:!0}):this.mirrorTime(r,{force:!0}),this._isPaused()||this.playAll(),this._dispatchEvent(new CustomEvent("audioownershipchange",{detail:{owner:"parent",reason:"autoplay-blocked"}}))}setupFromIframe(e){let t=e.querySelectorAll("audio[data-start], video[data-start]");for(let r of t)E(r)&&this._adoptIframeMedia(r);this._observeDynamicMedia(e)}setupFromUrl(e){if(this._urlAudioSrc===e&&this._urlAudioEntry)return;this.teardownUrlAudio();let t=this._createEntry(e,"audio",0,1/0);this._urlAudioEntry=t,this._urlAudioSrc=t?e:null,t&&this._audioOwner==="parent"&&!this._isPaused()&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this.playAll())}teardownUrlAudio(){let e=this._urlAudioEntry;if(this._urlAudioEntry=null,this._urlAudioSrc=null,!e)return;e.el.pause(),e.el.src="";let t=this._entries.indexOf(e);t!==-1&&this._entries.splice(t,1)}teardownObserver(){this._mediaObserver?.disconnect(),this._mediaObserver=void 0}_reportPlaybackError(e){this._playbackErrorPosted||(this._playbackErrorPosted=!0,this._dispatchEvent(new CustomEvent("playbackerror",{detail:{source:"parent-proxy",error:e}})))}_createEntry(e,t,r,n,o){if(this._entries.some(p=>p.el.src===e))return null;let a=t==="video"?document.createElement("video"):new Audio;a.preload="auto",a.src=e,a.load(),a.muted=this._getMuted(),a.volume=this._getVolume();let l=this._getPlaybackRate();l!==1&&(a.playbackRate=l);let u={el:a,start:r,duration:n,driftSamples:0,source:o};return this._entries.push(u),u}_resolveIframeMediaSrc(e){let t=e.getAttribute("src")||e.querySelector("source")?.getAttribute("src");return t?new URL(t,e.ownerDocument.baseURI).href:null}_isSynchronizedVoiceover(e){if(!e.matches('audio[data-ipw-voiceover="true"], audio[id^="vo-"], audio[src*="/audio/voice/"], audio[src*="voiceover-"]'))return!0;let r=e.getAttribute("data-ipw-scene-id")?.trim()??"",n=e.getAttribute("data-ipw-scene-text")?.trim()??"",o=e.getAttribute("data-ipw-narration-text")?.trim()??"",a=M(e),l=r?e.ownerDocument.getElementById(r):null,u=l?M(l):null,p=Array.from(e.ownerDocument.querySelectorAll('audio[data-ipw-voiceover="true"], audio[id^="vo-"], audio[src*="/audio/voice/"], audio[src*="voiceover-"]')),c=p.indexOf(e),v=p.some((_,f)=>{if(_===e||f>c)return!1;let g=M(_);return g.start!=null&&g.duration!=null&&a.start!=null&&g.start<=a.start&&g.start+g.duration>a.start+.001});return!!(l?.matches(".scene, [data-scene]")&&n&&o===n&&a.start!=null&&a.duration!=null&&a.duration>0&&u?.start!=null&&Math.abs(a.start-u.start)<.001&&!v)}_adoptIframeMedia(e){if(e.preload==="metadata"||e.preload==="none")return;if(!this._isSynchronizedVoiceover(e)){e.muted=!0,e.pause();return}let t=this._resolveIframeMediaSrc(e);if(!t)return;let r=M(e),n=r.start??0,o=r.duration??Number.POSITIVE_INFINITY,a=e.tagName==="VIDEO"?"video":"audio",l=this._createEntry(t,a,n,o,e);l&&this._audioOwner==="parent"&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this._isPaused()||this._playEntryIfActive(l))}_detachIframeMedia(e){let t=this._resolveIframeMediaSrc(e);if(!t)return;let r=this._entries.findIndex(o=>o.el.src===t);if(r===-1)return;let n=this._entries[r];n.el.pause(),n.el.src="",this._entries.splice(r,1)}_observeDynamicMedia(e){if(this.teardownObserver(),typeof MutationObserver>"u"||!e.body)return;let t=new MutationObserver(o=>{for(let a of o){if(a.type==="attributes"&&a.attributeName==="preload"){let l=a.target;E(l)&&l.matches("audio[data-start], video[data-start]")&&l.preload==="auto"&&this._adoptIframeMedia(l);continue}for(let l of a.addedNodes){if(!q(l))continue;let u=[];E(l)&&l.matches("audio[data-start], video[data-start]")&&u.push(l);let p=l.querySelectorAll("audio[data-start], video[data-start]");for(let c of p)E(c)&&u.push(c);for(let c of u)this._adoptIframeMedia(c)}for(let l of a.removedNodes){if(!q(l))continue;let u=[];E(l)&&l.matches("audio[data-start], video[data-start]")&&u.push(l);let p=l.querySelectorAll("audio[data-start], video[data-start]");for(let c of p)E(c)&&u.push(c);for(let c of u)this._detachIframeMedia(c)}}}),r={childList:!0,subtree:!0,attributes:!0,attributeFilter:["preload"]},n=Ie(e);for(let o of n)t.observe(o,r);this._mediaObserver=t}};function He(i,e,t,r){let n=(i.frame??0)/e,o=t.duration>0?Math.min(n,t.duration):n,a=!t.paused,l=!i.isPlaying,u=t.duration>0&&o>=t.duration&&(a||i.isPlaying);if(u&&r.getLoop())return r.media.audioOwner==="parent"&&r.media.pauseAll(),r.seek(0),r.play(),{...t,currentTime:o,paused:!1};let p={...t,currentTime:o,paused:l};r.media.audioOwner==="parent"&&(a&&l?r.media.pauseAll():!a&&!l&&r.media.playAll(),r.media.mirrorTime(o));let c=performance.now(),v=l!==t.paused;return(c-t.lastUpdateMs>100||v)&&(p.lastUpdateMs=c,r.updateControlsTime(o,t.duration),r.updateControlsPlaying(!l),r.dispatchEvent(new CustomEvent("timeupdate",{detail:{currentTime:o}}))),u&&(r.media.audioOwner==="parent"&&r.media.pauseAll(),p.paused=!0,r.updateControlsPlaying(!1),r.dispatchEvent(new Event("ended"))),p}var mt=["seconds-time","rational-fps","seek-keep-playing","composition-manifest-v1"];function ft(i,e){let t=Math.abs(i),r=Math.abs(e);for(;r!==0;){let n=t%r;t=r,r=n}return t||1}function bt(i){let e=Number.isFinite(i)&&i>0?i:30,t=Number.isInteger(e)?1:1e6,r=Math.round(e*t),n=ft(r,t);return{numerator:r/n,denominator:t/n}}function vt(i){if(typeof i!="object"||i===null)return null;let e=i;return!Number.isFinite(e.numerator)||!Number.isFinite(e.denominator)||(e.numerator??0)<=0||(e.denominator??0)<=0?null:Number(e.numerator)/Number(e.denominator)}function Ue(i){return{protocolVersion:1,capabilities:mt,fps:bt(i)}}function gt(i){return Array.isArray(i)&&i.every(e=>typeof e=="string")}function Ve(i,e=30){if(typeof i!="object"||i===null)return{status:"legacy",fps:e};let t=i;if(t.protocolVersion===void 0)return{status:"legacy",fps:e};if(t.protocolVersion!==1)return{status:"unsupported",code:"unsupported_protocol_version",receivedVersion:t.protocolVersion};let r=vt(t.fps);return r===null||!gt(t.capabilities)?{status:"unsupported",code:"invalid_protocol_metadata",receivedVersion:t.protocolVersion}:{status:"supported",fps:r,metadata:t}}function _t(i){return Array.isArray(i)?i.filter(e=>typeof e=="object"&&e!==null&&typeof e.id=="string"&&typeof e.start=="number"&&typeof e.duration=="number"):[]}function ze(i,e,t){if(i.source!==e)return;let r=i.data;if(!r||r.source!=="hf-preview")return;let n=Ve(r);if(n.status==="unsupported"){t.dispatchEvent(new CustomEvent("runtimeprotocolerror",{detail:{code:n.code,receivedVersion:n.receivedVersion}}));return}if(t.setRuntimeFps?.(n.fps),r.type==="shader-transition-state"){let o=r.state&&typeof r.state=="object"?r.state:{};t.shaderLoader.update(o,t.getShaderLoadingMode()),t.dispatchEvent(new CustomEvent("shadertransitionstate",{detail:{compositionId:r.compositionId,state:o}}));return}if(r.type==="ready"){t.onRuntimeReady();return}if(r.type==="state"){t.setPlaybackState(He({frame:r.frame??0,isPlaying:!!r.isPlaying},n.fps,t.getPlaybackState(),t));return}if(r.type==="media-autoplay-blocked"){if(t.shouldPromoteMediaAutoplayFallback?.()===!1)return;let o=null;try{o=t.getIframeDoc()}catch{}t.media.promoteToParentProxy(o,(a,l)=>t.media.mirrorTime(a,l)),t.sendControl("set-media-output-muted",{muted:!0});return}if(r.type==="timeline"&&r.durationInFrames>0){let o=Number(r.durationSeconds),a=Number(r.durationInFrames),l=Number.isFinite(o)&&o>0?o:a/n.fps;if(Number.isFinite(l)&&l>0){let u=t.getPlaybackState();t.setPlaybackState({...u,duration:l}),t.updateControlsTime(u.currentTime,l),t.onRuntimeTimelineReady(l)}Number.isFinite(r.compositionWidth)&&r.compositionWidth>0&&Number.isFinite(r.compositionHeight)&&r.compositionHeight>0&&t.setCompositionSize(r.compositionWidth,r.compositionHeight),t.setScenes(_t(r.scenes));return}r.type==="stage-size"&&Number.isFinite(r.width)&&r.width>0&&Number.isFinite(r.height)&&r.height>0&&t.setCompositionSize(r.width,r.height)}var w="shader-capture-scale",L="shader-loading",yt="__hf_shader_capture_scale",Et="__hf_shader_loading",P=["Preparing scene transitions","Sampling outgoing scene motion","Sampling incoming scene motion","Caching transition frames","Finalizing transition preview"];function ne(i){if(i===null)return null;let e=Number(i);return!Number.isFinite(e)||e<=0?null:String(Math.min(1,Math.max(.25,e)))}function St(i){if(i===null||i.trim()==="")return"composition";let e=i.trim().toLowerCase();return e==="none"||e==="false"||e==="0"||e==="off"?"none":e==="player"||e==="true"||e==="1"||e==="on"?"player":"composition"}function je(i,e,t){t===null?i.delete(e):i.set(e,t)}function Tt(i,e,t){let r=i.indexOf("#"),n=r>=0?i.slice(0,r):i,o=r>=0?i.slice(r):"",a=n.indexOf("?"),l=a>=0?n.slice(0,a):n,u=a>=0?n.slice(a+1):"",p=new URLSearchParams(u);je(p,yt,e),je(p,Et,t==="composition"?null:t);let c=p.toString();return`${l}${c?`?${c}`:""}${o}`}function At(i,e,t){if(e===null&&t==="composition")return i;let r=[];e!==null&&r.push(`window.__HF_SHADER_CAPTURE_SCALE=${JSON.stringify(e)};`),t!=="composition"&&r.push(`window.__HF_SHADER_LOADING=${JSON.stringify(t)};`);let n=`<script data-hyperframes-player-shader-options>${r.join("")}</script>`;return/<head\b[^>]*>/i.test(i)?i.replace(/<head\b[^>]*>/i,o=>`${o}${n}`):/<html\b[^>]*>/i.test(i)?i.replace(/<html\b[^>]*>/i,o=>`${o}${n}`):`${n}${i}`}function R(i){return St(i.getAttribute(L))}function $e(i){return Number(ne(i.getAttribute(w))??"1")}function X(i,e){return Tt(e,ne(i.getAttribute(w)),R(i))}function Z(i,e){return At(e,ne(i.getAttribute(w)),R(i))}function We(){let i=document.createElement("div");i.className="hfp-shader-loader",i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.setAttribute("aria-label","Preparing scene transitions"),i.setAttribute("data-hyperframes-ignore",""),i.draggable=!1;let e=f=>{f.preventDefault(),f.stopPropagation()};for(let f of["selectstart","dragstart","pointerdown","mousedown","click","dblclick","contextmenu","touchstart"])i.addEventListener(f,e,{capture:!0});let t=document.createElement("div");t.className="hfp-shader-loader-panel",t.draggable=!1;let r=document.createElement("div");r.className="hfp-shader-loader-mark",r.draggable=!1,r.innerHTML=['<svg width="78" height="78" viewBox="0 0 100 100" fill="none" aria-hidden="true" draggable="false">','<path d="M10.1851 57.8021L33.1145 73.8313C36.2202 75.9978 41.5173 73.5433 42.4816 69.4984L51.7611 30.4271C52.7253 26.3822 48.5802 23.9277 44.4602 26.0942L13.917 42.1235C6.96677 45.7676 4.97564 54.1579 10.1851 57.8021Z" fill="url(#hfp-shader-loader-grad-left)"/>','<path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z" fill="url(#hfp-shader-loader-grad-right)"/>',"<defs>",'<linearGradient id="hfp-shader-loader-grad-left" x1="48.5676" y1="25" x2="44.7804" y2="71.9384" gradientUnits="userSpaceOnUse">','<stop stop-color="#06E3FA"/>','<stop offset="1" stop-color="#4FDB5E"/>',"</linearGradient>",'<linearGradient id="hfp-shader-loader-grad-right" x1="54.8282" y1="73.8392" x2="72.0989" y2="32.8932" gradientUnits="userSpaceOnUse">','<stop stop-color="#06E3FA"/>','<stop offset="1" stop-color="#4FDB5E"/>',"</linearGradient>","</defs>","</svg>"].join("");let n=document.createElement("div");n.className="hfp-shader-loader-title";let o=document.createElement("span");o.className="hfp-shader-loader-title-text",o.textContent=P[0]||"Preparing scene transitions",n.appendChild(o);let a=document.createElement("div");a.className="hfp-shader-loader-detail",a.textContent="Rendering animated scene samples for shader transitions.";let l=document.createElement("div");l.className="hfp-shader-loader-track",l.setAttribute("aria-hidden","true");let u=document.createElement("div");u.className="hfp-shader-loader-fill",l.appendChild(u);let p=document.createElement("div");p.className="hfp-shader-loader-progress";let c=f=>{let g=document.createElement("div");g.className="hfp-shader-loader-row";let m=document.createElement("span");m.className="hfp-shader-loader-label",m.textContent=f;let S=document.createElement("span");return S.className="hfp-shader-loader-value",g.appendChild(m),g.appendChild(S),p.appendChild(g),{row:g,label:m,value:S}},v=c("transition"),_=c("transition frame");return t.appendChild(r),t.appendChild(n),t.appendChild(a),t.appendChild(l),t.appendChild(p),i.appendChild(t),{root:i,fill:u,title:o,detail:a,transitionValue:v.value,frameLabel:_.label,frameValue:_.value,frameRow:_.row}}var wt=420,Q=class{_el;_hideTimeout=null;constructor(e){this._el=e}show(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._el.root.classList.remove("hfp-hiding"),this._el.root.classList.add("hfp-visible")}hide(){if(this._el.root.classList.contains("hfp-hiding")){this._hideTimeout||this._scheduleCleanup();return}this._el.root.classList.contains("hfp-visible")&&(this._el.root.classList.add("hfp-hiding"),this._el.root.classList.remove("hfp-visible"),this._scheduleCleanup())}reset(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null),this._el.root.classList.remove("hfp-visible","hfp-hiding"),this._el.fill.style.transform="scaleX(0)",this._el.transitionValue.textContent="",this._el.frameValue.textContent="",this._el.frameRow.style.visibility="hidden"}update(e,t){if(t!=="player"){this.reset();return}if(e.ready||!e.loading){this.hide();return}let r=typeof e.progress=="number"&&Number.isFinite(e.progress)?e.progress:0,n=typeof e.total=="number"&&Number.isFinite(e.total)?e.total:0,o=n>0?Math.min(1,Math.max(0,r/n)):0,a=Math.min(P.length-1,Math.floor(o*P.length));this._el.title.textContent=P[a]||"Preparing scene transitions",this._el.detail.textContent=e.phase==="cached"?"Loading cached transition frames before playback.":e.phase==="finalizing"?"Uploading transition textures for smooth playback.":"Rendering animated scene samples for shader transitions.",this._el.fill.style.transform=`scaleX(${o})`,this._el.transitionValue.textContent=e.currentTransition!==void 0&&e.transitionTotal!==void 0?`${e.currentTransition}/${e.transitionTotal}`:n>0?`${r}/${n}`:"";let l=e.transitionFrame!==void 0&&e.transitionFrames!==void 0?`${e.transitionFrame}/${e.transitionFrames}`:"";this._el.frameLabel.textContent=e.phase==="cached"?"cached transition frames":e.phase==="finalizing"?"finalizing transition frames":"rendering transition frames",this._el.frameValue.textContent=l,this._el.frameRow.style.visibility=l?"visible":"hidden",this._el.root.setAttribute("aria-valuenow",String(Math.round(o*100))),this.show()}get hideTimeout(){return this._hideTimeout}destroy(){this._hideTimeout&&(clearTimeout(this._hideTimeout),this._hideTimeout=null)}_scheduleCleanup(){this._hideTimeout&&clearTimeout(this._hideTimeout),this._hideTimeout=setTimeout(()=>{this._el.root.classList.remove("hfp-hiding"),this._hideTimeout=null},wt)}};var Ct=.1,xt=5;function oe(i){return!Number.isFinite(i)||i<=0?1:Math.max(Ct,Math.min(xt,i))}var J=class extends HTMLElement{static get observedAttributes(){return["src","srcdoc","width","height","controls","muted","audio-locked","volume","poster","playback-rate","audio-src",w,L]}shadow;container;iframe;posterEl=null;controlsApi=null;resizeObserver;shaderLoader;probe;_ready=!1;_currentTime=0;_duration=0;_paused=!0;_scrubbing=!1;_lastUpdateMs=0;_volume=1;_compositionWidth=1920;_compositionHeight=1080;_rescaleWarned=!1;_directTimelineAdapter=null;_directTimelineClock;_parentTickRaf=null;_media;_scenes=[];_runtimeFps=30;constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),Le(this.shadow,Te),{container:this.container,iframe:this.iframe}=Pe(),this.shadow.appendChild(this.container);let e=We();this.shadow.appendChild(e.root),this.shaderLoader=new Q(e),this._media=new Y({dispatchEvent:t=>this.dispatchEvent(t),getMuted:()=>this.muted,getVolume:()=>this._volume,getPlaybackRate:()=>this.playbackRate,getCurrentTime:()=>this._currentTime,isPaused:()=>this._paused}),this._directTimelineClock=new G({onTimeUpdate:(t,r)=>{this._currentTime=t,this.controlsApi?.updateTime(t,r),this.dispatchEvent(new CustomEvent("timeupdate",{detail:{currentTime:t}}))},getLoop:()=>this.loop,restart:()=>{this.seek(0),this.play()},onPaused:()=>{this._media.audioOwner==="parent"&&this._media.pauseAll(),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.dispatchEvent(new Event("ended"))},onEnded:()=>this.loop}),this.probe=new $(this.iframe,{onReady:t=>this._onProbeReady(t),onError:t=>this.dispatchEvent(new CustomEvent("error",{detail:{message:t}}))}),this.addEventListener("click",t=>{Me(t)||(this._paused?this.play():this.pause())}),this.resizeObserver=new ResizeObserver(()=>this._rescale()),this._onMessage=this._onMessage.bind(this),this._onIframeLoad=this._onIframeLoad.bind(this)}connectedCallback(){this.resizeObserver.observe(this),window.addEventListener("message",this._onMessage),this.iframe.addEventListener("load",this._onIframeLoad),this.hasAttribute("controls")&&this._setupControls(),this.hasAttribute("poster")&&(this.posterEl=ie(this.shadow,this.getAttribute("poster"),this.posterEl)),this.hasAttribute("audio-src")&&this._media.setupFromUrl(this.getAttribute("audio-src")),this.hasAttribute("srcdoc")&&(this.iframe.srcdoc=Z(this,this.getAttribute("srcdoc"))),this.hasAttribute("src")&&(this.iframe.src=X(this,this.getAttribute("src"))),!this.hasAttribute("audio-locked")&&this._isLockedHostEnvironment()&&this._applyAudioLock(!0)}disconnectedCallback(){this._sendControl("pause"),this._stopIframeMedia(),this.resizeObserver.disconnect(),window.removeEventListener("message",this._onMessage),this.iframe.removeEventListener("load",this._onIframeLoad),this.probe.stop(),this._directTimelineClock.stop(),this._stopParentTickClock(),this._directTimelineAdapter=null,this.shaderLoader.destroy(),this._media.destroy(),this.controlsApi?.destroy(),this.controlsApi=null,this._paused=!0,this._ready=!1}attributeChangedCallback(e,t,r){switch(e){case"src":r&&(this._ready=!1,this.iframe.src=X(this,r));break;case"srcdoc":this._ready=!1,r!==null?this.iframe.srcdoc=Z(this,r):this.iframe.removeAttribute("srcdoc");break;case"width":this._compositionWidth=N(r)??1920,this._rescale();break;case"height":this._compositionHeight=N(r)??1080,this._rescale();break;case"controls":r!==null?this._setupControls():(this.controlsApi?.destroy(),this.controlsApi=null);break;case"poster":this.posterEl=ie(this.shadow,r,this.posterEl);break;case"playback-rate":{let n=oe(parseFloat(r||"1"));this._media.updatePlaybackRate(n),this._sendControl("set-playback-rate",{playbackRate:n}),this._directTimelineAdapter?.timeScale?.(n),this.controlsApi?.updateSpeed(n),this.dispatchEvent(new Event("ratechange"));break}case"muted":this._handleMutedChange(r);break;case"audio-locked":this._applyAudioLock(r!==null);break;case"volume":{let n=Math.max(0,Math.min(1,parseFloat(r||"1")));this._volume=n,this._media.updateVolume(n),this._sendControl("set-volume",{volume:n}),this.controlsApi?.updateVolume(n),this.dispatchEvent(new Event("volumechange"));break}case"audio-src":r?this._media.setupFromUrl(r):this._media.teardownUrlAudio();break;case w:case L:this._reloadShaderOptions();break}}get iframeElement(){return this.iframe}get scenes(){return this._scenes}play(){this.posterEl?.remove(),this.posterEl=null,this._duration>0&&this._currentTime>=this._duration&&this.seek(0),this._paused=!1;let e=this._tryDirectTimelinePlay();e||(this._sendControl("play"),this._ready&&!this._directTimelineAdapter&&this._startParentTickClock()),this._media.audioOwner==="parent"&&this._media.playAll(),this.controlsApi?.updatePlaying(!0),this.dispatchEvent(new Event("play")),e&&this._directTimelineAdapter&&this._directTimelineClock.start(this._directTimelineAdapter,()=>this._currentTime,()=>this._duration,()=>this._paused)}pause(){this._tryDirectTimelinePause()||this._sendControl("pause"),this._directTimelineClock.stop(),this._stopParentTickClock(),this._media.audioOwner==="parent"&&this._media.pauseAll(),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.dispatchEvent(new Event("pause"))}stopMedia(){this._sendControl("stop-media"),this._stopIframeMedia(),this._media.stopAdoptedMedia()}seek(e){!this._trySyncSeek(e)&&!this._tryDirectTimelineSeek(e)&&this._sendControl("seek",{timeSeconds:e,frame:Math.round(e*this._runtimeFps)}),this._directTimelineClock.stop(),this._stopParentTickClock(),this._currentTime=e,this._media.audioOwner==="parent"&&(this._scrubbing?this._media.scrubAll(e):(this._media.pauseAll(),this._media.seekAll(e))),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.controlsApi?.updateTime(this._currentTime,this._duration)}setColorGrading(e,t){this._sendControl("set-color-grading",{target:e,grading:t})}clearColorGrading(e){this._sendControl("set-color-grading",{target:e,grading:null})}setColorGradingCompare(e,t){this._sendControl("set-color-grading-compare",{target:e,compare:t})}clearColorGradingCompare(e){this._sendControl("set-color-grading-compare",{target:e,compare:{enabled:!1}})}get currentTime(){return this._currentTime}set currentTime(e){this.seek(e)}get duration(){return this._duration}get paused(){return this._paused}get ready(){return this._ready}get playbackRate(){return oe(parseFloat(this.getAttribute("playback-rate")||"1"))}set playbackRate(e){this.setAttribute("playback-rate",String(oe(e)))}get shaderCaptureScale(){return $e(this)}set shaderCaptureScale(e){this.setAttribute(w,String(e))}get shaderLoading(){return R(this)}set shaderLoading(e){e==="composition"?this.removeAttribute(L):this.setAttribute(L,e)}get muted(){return this.hasAttribute("muted")}set muted(e){e?this.setAttribute("muted",""):this.removeAttribute("muted")}get audioLocked(){return this.hasAttribute("audio-locked")}set audioLocked(e){e?this.setAttribute("audio-locked",""):this.removeAttribute("audio-locked")}_isLockedHostEnvironment(){if(typeof navigator>"u")return!1;let e=navigator.userAgent||"";return/\bClaude\/\d/.test(e)&&/\bElectron\b/.test(e)}_isAudioLocked(){return this.hasAttribute("audio-locked")||this._isLockedHostEnvironment()}_isSlideshowPlayer(){return this.closest("hyperframes-slideshow")!==null}_handleMutedChange(e){if(e===null&&this._isAudioLocked()){this.setAttribute("muted","");return}this._media.updateMuted(e!==null),this._setIframeMediaMuted(e!==null),this._sendControl("set-muted",{muted:e!==null}),this.controlsApi?.updateMuted(e!==null),this.dispatchEvent(new Event("volumechange"))}_applyAudioLock(e){e&&(this.muted=!0),this.controlsApi?.setVolumeControlsHidden(e)}get volume(){return this._volume}set volume(e){this.setAttribute("volume",String(Math.max(0,Math.min(1,e))))}get loop(){return this.hasAttribute("loop")}set loop(e){e?this.setAttribute("loop",""):this.removeAttribute("loop")}_sendControl(e,t={}){try{this.iframe.contentWindow?.postMessage({...t,source:"hf-parent",type:"control",action:e,...Ue(this._runtimeFps)},"*")}catch{}}_getSameOriginIframeDocument(){try{return this.iframe.contentDocument}catch{return null}}_setIframeMediaMuted(e){let t=this._getSameOriginIframeDocument();if(t)for(let r of t.querySelectorAll("video, audio"))E(r)&&(r.muted=e||r.defaultMuted)}_stopIframeMedia(){let e=this._getSameOriginIframeDocument();if(e)for(let t of e.querySelectorAll("video, audio"))E(t)&&t.pause()}_replayBridgeState(){this._sendControl("set-muted",{muted:this.muted}),this._sendControl("set-volume",{volume:this._volume}),this._sendControl("set-playback-rate",{playbackRate:this.playbackRate}),this._sendControl("set-native-media-sync-disabled",{disabled:this._isSlideshowPlayer()}),this._sendControl("set-web-audio-media-disabled",{disabled:this._isSlideshowPlayer()})}_reloadShaderOptions(){if(R(this)!=="player"&&this.shaderLoader.reset(),this.hasAttribute("srcdoc")){this.iframe.srcdoc=Z(this,this.getAttribute("srcdoc")||"");return}this.hasAttribute("src")&&(this.iframe.src=X(this,this.getAttribute("src")||""))}_trySyncSeek(e){try{let r=this.iframe.contentWindow?.__player;return typeof r?.seek!="function"?!1:(r.seek.call(r,e),!0)}catch{return!1}}_withDirectTimeline(e){let t=this._directTimelineAdapter||this.probe.resolveDirectTimelineAdapter();if(!t)return!1;try{return e(t),this._directTimelineAdapter=t,!0}catch{return!1}}_tryDirectTimelineSeek(e){return this._withDirectTimeline(t=>{t.seek(e,!1),t.pause()})}_tryDirectTimelinePlay(){return this._withDirectTimeline(e=>{e.play()})}_tryDirectTimelinePause(){return this._withDirectTimeline(e=>{e.pause()})}_startParentTickClock(){this._stopParentTickClock();let e=()=>{if(this._paused){this._parentTickRaf=null;return}this._sendControl("tick"),this._parentTickRaf=requestAnimationFrame(e)};this._parentTickRaf=requestAnimationFrame(e)}_stopParentTickClock(){this._parentTickRaf!==null&&(cancelAnimationFrame(this._parentTickRaf),this._parentTickRaf=null)}_onMessage(e){ze(e,this.iframe.contentWindow,{getPlaybackState:()=>({currentTime:this._currentTime,duration:this._duration,paused:this._paused,lastUpdateMs:this._lastUpdateMs}),setPlaybackState:({currentTime:t,duration:r,paused:n,lastUpdateMs:o})=>{this._currentTime=t,this._duration=r,this._paused=n,this._lastUpdateMs=o},getShaderLoadingMode:()=>R(this),shaderLoader:this.shaderLoader,setCompositionSize:(t,r)=>{this._compositionWidth=t,this._compositionHeight=r,this._rescale()},sendControl:(t,r)=>this._sendControl(t,r),getIframeDoc:()=>this.iframe.contentDocument,onRuntimeReady:()=>this._replayBridgeState(),onRuntimeTimelineReady:t=>this._onRuntimeTimelineReady(t),setRuntimeFps:t=>{this._runtimeFps=t},shouldPromoteMediaAutoplayFallback:()=>!this._isSlideshowPlayer(),setScenes:t=>{this._scenes=t,this.dispatchEvent(new CustomEvent("scenes",{detail:{scenes:t}}))},updateControlsTime:(t,r)=>this.controlsApi?.updateTime(t,r),updateControlsPlaying:t=>this.controlsApi?.updatePlaying(t),dispatchEvent:t=>this.dispatchEvent(t),seek:t=>this.seek(t),play:()=>this.play(),getLoop:()=>this.loop,media:this._media})}_onRuntimeTimelineReady(e){if(this._ready)return;this.probe.stop(),this._duration=e,this._directTimelineAdapter=null,this._ready=!0,this.controlsApi?.updateTime(this._currentTime,e),this.dispatchEvent(new CustomEvent("ready",{detail:{duration:e}})),this._rescale();let t=this._getSameOriginIframeDocument();t&&this._media.setupFromIframe(t),this._replayBridgeState(),this._setIframeMediaMuted(this.muted),this.hasAttribute("autoplay")&&this.play()}_onProbeReady({duration:e,adapter:t,compositionSize:r}){this._duration=e,this._directTimelineAdapter=t.kind==="direct-timeline"?t.timeline:null,this._ready=!0,this.controlsApi?.updateTime(0,e),this.dispatchEvent(new CustomEvent("ready",{detail:{duration:e}})),r&&(this._compositionWidth=r.width,this._compositionHeight=r.height,this._rescale());try{let n=this.iframe.contentDocument;n&&this._media.setupFromIframe(n)}catch{}this._setIframeMediaMuted(this.muted),this.hasAttribute("autoplay")&&this.play()}_rescale(){!Re(this,this.iframe,this._compositionWidth,this._compositionHeight)&&this._ready&&!this._rescaleWarned&&(this._rescaleWarned=!0,console.warn("[hyperframes-player] rescale no-op after ready \u2014 zero-size player element",{src:this.getAttribute("src"),offsetWidth:this.offsetWidth,offsetHeight:this.offsetHeight,compositionWidth:this._compositionWidth,compositionHeight:this._compositionHeight}))}_onIframeLoad(){this._ready=!1,this._directTimelineAdapter=null,this._directTimelineClock.stop(),this._stopParentTickClock(),this.shaderLoader.reset(),this._media.resetForIframeLoad(),this.probe.start()}_setupControls(){this.controlsApi||(this.controlsApi=ke(this.shadow,this.muted,this._volume,this.getAttribute("speed-presets"),{onPlay:()=>this.play(),onPause:()=>this.pause(),onSeek:e=>this.seek(e*this._duration),onScrubStart:()=>{this._scrubbing=!0},onScrubEnd:()=>{this._scrubbing=!1,this.seek(this._currentTime)},onSpeedChange:e=>{this.playbackRate=e},onMuteToggle:()=>{this.muted=!this.muted},onVolumeChange:e=>{this.volume=e}},this._isAudioLocked()))}get _audioOwner(){return this._media.audioOwner}get _parentMedia(){return this._media.entries}_mirrorParentMediaTime(e,t){this._media.mirrorTime(e,t)}_promoteToParentProxy(){let e=null;try{e=this.iframe.contentDocument}catch{}this._media.promoteToParentProxy(e,(t,r)=>this._mirrorParentMediaTime(t,r)),this._sendControl("set-media-output-muted",{muted:!0})}_observeDynamicMedia(e){this._media.setupFromIframe(e)}};customElements.get("hyperframes-player")||customElements.define("hyperframes-player",J);return Qe(kt);})();
//# sourceMappingURL=hyperframes-player.global.js.map