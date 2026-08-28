import{r as e}from"./compositionContract-BPQvpTBx.js";import{Gt as t,Kt as n}from"./index-BAHXeCE5.js";function r(e){return e.hasRuntime||e.runtimeInjected?!1:!!(e.hasNestedCompositions||e.hasTimelines&&e.attempts>=5)}function i(e){return typeof e==`object`&&!!e}function a(e){return i(e)&&typeof e.getDuration==`function`}function o(e){return i(e)&&typeof e.duration==`function`&&typeof e.time==`function`&&typeof e.seek==`function`&&typeof e.play==`function`&&typeof e.pause==`function`}function s(e){if(!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(e))throw Error(`Invalid HyperFrames runtime version: ${e}`);return`https://cdn.jsdelivr.net/npm/@hyperframes/core@${e}/dist/hyperframe.runtime.iife.js`}var c=typeof __HYPERFRAMES_RUNTIME_CDN_URL__==`string`?__HYPERFRAMES_RUNTIME_CDN_URL__:s(`0.0.0-dev`);function l(e){if(e===null)return null;let t=Number.parseInt(e,10);return Number.isFinite(t)&&t>0?t:null}function u(e){let t=e?.querySelector(`[data-composition-id][data-width][data-height]`)??e?.querySelector(`[data-width][data-height]`);if(!t)return null;let n=l(t.getAttribute(`data-width`)),r=l(t.getAttribute(`data-height`));return n!==null&&r!==null?{width:n,height:r}:null}var d=class{_iframe;_callbacks;_interval=null;_runtimeInjected=!1;constructor(e,t){this._iframe=e,this._callbacks=t}get runtimeInjected(){return this._runtimeInjected}start(){this.stop(),this._runtimeInjected=!1;let e=0;this._interval=setInterval(()=>{e++;try{let t=this._iframe.contentWindow;if(!t)return;let n=!!(t.__hf||t.__player);if(r({hasRuntime:n,hasTimelines:!!(t.__timelines&&Object.keys(t.__timelines).length>0),hasNestedCompositions:!!this._iframe.contentDocument?.querySelector(`[data-composition-src]`),runtimeInjected:this._runtimeInjected,attempts:e})){this._injectRuntime();return}if(this._runtimeInjected&&!n)return;let i=this._resolvePlaybackDurationAdapter(t);if(i&&i.getDuration()>0){this.stop();let e=u(this._iframe.contentDocument);this._callbacks.onReady({duration:i.getDuration(),adapter:i,compositionSize:e});return}}catch{}e>=40&&(this.stop(),this._callbacks.onError(`Composition timeline not found after 8s`))},200)}stop(){this._interval!==null&&(clearInterval(this._interval),this._interval=null)}resolveDirectTimelineAdapter(){try{let e=this._iframe.contentWindow;return e?this._resolveDirectTimelineAdapterFromWindow(e):null}catch{return null}}resolveDirectTimelineAdapterFromWindow(e){return this._resolveDirectTimelineAdapterFromWindow(e)}hasRuntimeBridge(e){return Reflect.get(e,`__hf`)!==void 0||i(Reflect.get(e,`__player`))}_injectRuntime(){this._runtimeInjected=!0;try{let e=this._iframe.contentDocument;if(!e)return;let t=e.createElement(`script`);t.src=c,(e.head||e.documentElement).appendChild(t),this._callbacks.onRuntimeInjected?.()}catch{}}_resolveDirectTimelineAdapterFromWindow(e){if(this.hasRuntimeBridge(e))return null;let t=Reflect.get(e,`__timelines`);if(!i(t))return null;let n=Object.keys(t);if(n.length===0)return null;let r=this._iframe.contentDocument?.querySelector(`[data-composition-id]`)?.getAttribute(`data-composition-id`),a=t[r&&r in t?r:n[n.length-1]];return o(a)?a:null}_resolvePlaybackDurationAdapter(e){let t=Reflect.get(e,`__player`);if(a(t))return{kind:`runtime`,getDuration:()=>t.getDuration()};let n=this._resolveDirectTimelineAdapterFromWindow(e);return n?{kind:`direct-timeline`,timeline:n,getDuration:()=>n.duration()}:null}},f=`
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
`,p=`<svg width="24" height="24" viewBox="46 21 54 56" fill="currentColor"><path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z"/></svg>`,m=`<svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="2" width="4" height="14"/><rect x="11" y="2" width="4" height="14"/></svg>`,h=`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/><path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,g=`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`,ee=`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" opacity="0.3"/><line x1="18" y1="7" x2="14" y2="17" stroke="currentColor" stroke-width="2"/></svg>`,_=[.25,.5,1,1.5,2,4];function v(e){return`${e}x`}function y(e){if(!Number.isFinite(e)||e<0)return`0:00`;let t=Math.floor(e);return`${Math.floor(t/60)}:${(t%60).toString().padStart(2,`0`)}`}function b(e,t,n={}){let r=n.speedPresets??_,i=document.createElement(`div`);i.className=`hfp-controls`,i.addEventListener(`click`,e=>{e.stopPropagation()});let a=document.createElement(`button`);a.className=`hfp-play-btn`,a.type=`button`,a.innerHTML=`<span class="hfp-ico hfp-ico-play">${p}</span><span class="hfp-ico hfp-ico-pause">${m}</span>`,a.setAttribute(`aria-label`,`Play`);let o=document.createElement(`div`);o.className=`hfp-scrubber`;let s=document.createElement(`div`);s.className=`hfp-progress`,s.style.width=`0%`,o.appendChild(s);let c=document.createElement(`span`);c.className=`hfp-time`,c.textContent=`0:00 / 0:00`;let l=document.createElement(`div`);l.className=`hfp-speed-wrap`;let u=document.createElement(`button`);u.className=`hfp-speed-btn`,u.type=`button`,u.textContent=`1x`,u.setAttribute(`aria-label`,`Playback speed`);let d=document.createElement(`div`);d.className=`hfp-speed-menu`,d.setAttribute(`role`,`menu`);for(let e of r){let t=document.createElement(`button`);t.className=`hfp-speed-option`,t.type=`button`,t.setAttribute(`role`,`menuitem`),t.dataset.speed=String(e),t.textContent=v(e),e===1&&t.classList.add(`hfp-active`),d.appendChild(t)}l.appendChild(d),l.appendChild(u);let f=document.createElement(`div`);f.className=`hfp-volume-wrap`;let b=document.createElement(`button`);b.className=`hfp-mute-btn`,b.type=`button`,b.innerHTML=h,b.setAttribute(`aria-label`,`Mute`);let x=document.createElement(`div`);x.className=`hfp-volume-slider-wrap`;let S=document.createElement(`div`);S.className=`hfp-volume-slider`,S.setAttribute(`role`,`slider`),S.setAttribute(`aria-label`,`Volume`),S.setAttribute(`aria-valuemin`,`0`),S.setAttribute(`aria-valuemax`,`100`),S.setAttribute(`aria-valuenow`,`100`),S.tabIndex=0;let C=document.createElement(`div`);C.className=`hfp-volume-fill`,C.style.width=`100%`,S.appendChild(C),x.appendChild(S),f.appendChild(x),f.appendChild(b),n.audioLocked&&(f.style.display=`none`),i.appendChild(a),i.appendChild(o),i.appendChild(c),i.appendChild(f),i.appendChild(l),e.appendChild(i);let w=!1,T=!1,E=1,D=null,O=r.indexOf(1);O===-1&&(O=0);let k=(e,t)=>e?ee:t===0||t<.5?g:h;a.addEventListener(`click`,e=>{e.stopPropagation(),w?t.onPause():t.onPlay()}),b.addEventListener(`click`,e=>{e.stopPropagation(),t.onMuteToggle()});let A=!1,j=e=>{let n=S.getBoundingClientRect(),r=Math.max(0,Math.min(1,(e-n.left)/n.width));E=r,C.style.width=`${r*100}%`,S.setAttribute(`aria-valuenow`,String(Math.round(r*100))),T&&r>0&&t.onMuteToggle(),b.innerHTML=k(T,r),t.onVolumeChange(r)};S.addEventListener(`mousedown`,e=>{e.stopPropagation(),A=!0,j(e.clientX)});let M=e=>{A&&j(e.clientX)},N=()=>{A=!1};document.addEventListener(`mousemove`,M),document.addEventListener(`mouseup`,N),S.addEventListener(`touchstart`,e=>{A=!0;let t=e.touches[0];t&&j(t.clientX)},{passive:!0});let P=e=>{if(A){let t=e.touches[0];t&&j(t.clientX)}},F=()=>{A=!1};document.addEventListener(`touchmove`,P,{passive:!0}),document.addEventListener(`touchend`,F);let I=.05;S.addEventListener(`keydown`,e=>{let n=E;if(e.key===`ArrowRight`||e.key===`ArrowUp`)n=Math.min(1,E+I);else if(e.key===`ArrowLeft`||e.key===`ArrowDown`)n=Math.max(0,E-I);else return;e.preventDefault(),e.stopPropagation(),E=n,C.style.width=`${n*100}%`,S.setAttribute(`aria-valuenow`,String(Math.round(n*100))),T&&n>0&&t.onMuteToggle(),b.innerHTML=k(T,n),t.onVolumeChange(n)});let L=e=>{for(let t of d.querySelectorAll(`.hfp-speed-option`))t.classList.toggle(`hfp-active`,t.dataset.speed===String(e))};u.addEventListener(`click`,e=>{e.stopPropagation();let t=d.classList.toggle(`hfp-open`);u.setAttribute(`aria-expanded`,String(t))}),d.addEventListener(`click`,e=>{e.stopPropagation();let n=e.target.closest(`.hfp-speed-option`);if(!n)return;let i=parseFloat(n.dataset.speed);O=r.indexOf(i),u.textContent=v(i),L(i),d.classList.remove(`hfp-open`),u.setAttribute(`aria-expanded`,`false`),t.onSpeedChange(i)});let R=()=>{d.classList.remove(`hfp-open`),u.setAttribute(`aria-expanded`,`false`)};document.addEventListener(`click`,R);let z=e=>{let n=o.getBoundingClientRect(),r=Math.max(0,Math.min(1,(e-n.left)/n.width));t.onSeek(r)},B=!1;o.addEventListener(`mousedown`,e=>{e.stopPropagation(),B=!0,t.onScrubStart?.(),z(e.clientX)});let V=e=>{B&&z(e.clientX)},H=()=>{B&&(B=!1,t.onScrubEnd?.())};document.addEventListener(`mousemove`,V),document.addEventListener(`mouseup`,H),o.addEventListener(`touchstart`,e=>{B=!0,t.onScrubStart?.();let n=e.touches[0];n&&z(n.clientX)},{passive:!0});let U=e=>{if(B){let t=e.touches[0];t&&z(t.clientX)}},W=()=>{B&&(B=!1,t.onScrubEnd?.())};document.addEventListener(`touchmove`,U,{passive:!0}),document.addEventListener(`touchend`,W);let G=()=>{D&&clearTimeout(D),D=setTimeout(()=>{w&&i.classList.add(`hfp-hidden`)},3e3)},K=e instanceof ShadowRoot?e.host:e,q=()=>{i.classList.remove(`hfp-hidden`),G()},J=()=>{w&&i.classList.add(`hfp-hidden`)};return K.addEventListener(`mousemove`,q),K.addEventListener(`mouseleave`,J),{updateTime(e,t){let n=t>0?Math.min(e,t):e,r=t>0?n/t*100:0;s.style.width=`${r}%`,c.textContent=`${y(n)} / ${y(t)}`},updatePlaying(e){w=e,a.classList.toggle(`hfp-playing`,e),a.setAttribute(`aria-label`,e?`Pause`:`Play`),e?G():i.classList.remove(`hfp-hidden`)},updateSpeed(e){let t=r.indexOf(e);t!==-1&&(O=t),u.textContent=v(e),L(e)},updateMuted(e){T=e,b.innerHTML=k(e,E),b.setAttribute(`aria-label`,e?`Unmute`:`Mute`)},updateVolume(e){E=e,C.style.width=`${e*100}%`,S.setAttribute(`aria-valuenow`,String(Math.round(e*100))),b.innerHTML=k(T,e)},setVolumeControlsHidden(e){f.style.display=e?`none`:``},show(){i.style.display=``},hide(){i.style.display=`none`},destroy(){document.removeEventListener(`mousemove`,V),document.removeEventListener(`mouseup`,H),document.removeEventListener(`touchmove`,U),document.removeEventListener(`touchend`,W),document.removeEventListener(`mousemove`,M),document.removeEventListener(`mouseup`,N),document.removeEventListener(`touchmove`,P),document.removeEventListener(`touchend`,F),document.removeEventListener(`click`,R),K.removeEventListener(`mousemove`,q),K.removeEventListener(`mouseleave`,J),D&&clearTimeout(D),i.remove()}}}function x(e,t,n,r,i,a=!1){let o=r?r.split(`,`).map(Number).filter(e=>!isNaN(e)&&e>0):void 0,s=b(e,i,{...o?{speedPresets:o}:{},audioLocked:a});return s.updateMuted(t),s.updateVolume(n),s}function S(e,t,n){return t?(n||(n=document.createElement(`img`),n.className=`hfp-poster`,e.appendChild(n)),n.src=t,n):(n?.remove(),null)}function C(e){return e.composedPath().some(e=>e instanceof HTMLElement&&e.classList.contains(`hfp-controls`))}var w=null;function T(e,t){if(typeof CSSStyleSheet<`u`)try{w||(w=new CSSStyleSheet,w.replaceSync(t)),e.adoptedStyleSheets=[w];return}catch{}let n=document.createElement(`style`);n.textContent=t,e.appendChild(n)}function E(){let e=document.createElement(`div`);e.className=`hfp-container`;let t=document.createElement(`iframe`);return t.className=`hfp-iframe`,t.sandbox.add(`allow-scripts`,`allow-same-origin`),t.allow=`autoplay; fullscreen`,t.referrerPolicy=`no-referrer`,t.title=`HyperFrames Composition`,e.appendChild(t),{container:e,iframe:t}}function D(e,t,n,r){let i=e.offsetWidth,a=e.offsetHeight;if(i===0||a===0)return!1;let o=Math.min(i/n,a/r);return t.style.width=`${n}px`,t.style.height=`${r}px`,t.style.transform=`translate(-50%, -50%) scale(${o})`,!0}var O=100,k=class{_callbacks;_raf=null;_lastUpdateMs=0;constructor(e){this._callbacks=e}start(e,t,n,r){this.stop();let i=()=>{if(r()){this._raf=null;return}let t;try{t=e.time()}catch{this._raf=null;return}let a=n();a>0&&(t=Math.min(t,a));let o=a>0&&t>=a,s=performance.now();if((s-this._lastUpdateMs>O||o)&&(this._lastUpdateMs=s,this._callbacks.onTimeUpdate(t,a)),o){if(this._callbacks.getLoop()){this._callbacks.restart();return}try{e.pause()}catch{}this._callbacks.onPaused(),this._raf=null;return}this._raf=requestAnimationFrame(i)};this._raf=requestAnimationFrame(i)}stop(){this._raf!==null&&(cancelAnimationFrame(this._raf),this._raf=null)}get isRunning(){return this._raf!==null}};function A(e){let t=Array.from(e.querySelectorAll(`[data-composition-id]`));if(t.length===0)return e.body?[e.body]:[];let n=[];for(let e of t)M(e)||n.push(e);return j(e),n}function j(e){let t=e.body;if(!t||typeof console>`u`||typeof console.warn!=`function`)return;let n=t.querySelectorAll(`audio[data-start], video[data-start]`);if(n.length===0)return;let r=[];for(let e of n)e.closest(`[data-composition-id]`)||r.push(e);r.length!==0&&console.warn(`[hyperframes-player] selectMediaObserverTargets: composition hosts are present, but ${r.length} body-level timed media element(s) sit outside every [data-composition-id] subtree and will not be observed. Move them inside a composition host or the parent-frame proxy will never adopt them.`,r)}function M(e){let t=e.parentElement;for(;t;){if(t.hasAttribute(`data-composition-id`))return!0;t=t.parentElement}return!1}function N(e){let t=e.ownerDocument?.defaultView;return t&&e instanceof t.Element?!0:e instanceof Element}function P(e){if(!N(e)||e.tagName!==`AUDIO`&&e.tagName!==`VIDEO`)return!1;let t=e.ownerDocument?.defaultView;return t&&e instanceof t.HTMLMediaElement?!0:e instanceof HTMLMediaElement}var F=.05,I=2,L=class{_entries=[];_mediaObserver;_playbackErrorPosted=!1;_audioOwner=`runtime`;_urlAudioEntry=null;_urlAudioSrc=null;_dispatchEvent;_getMuted;_getVolume;_getPlaybackRate;_getCurrentTime;_isPaused;constructor(e){this._dispatchEvent=e.dispatchEvent,this._getMuted=e.getMuted,this._getVolume=e.getVolume,this._getPlaybackRate=e.getPlaybackRate,this._getCurrentTime=e.getCurrentTime,this._isPaused=e.isPaused}get audioOwner(){return this._audioOwner}get entries(){return this._entries}resetForIframeLoad(){this._playbackErrorPosted=!1;let e=this._audioOwner===`parent`;this._audioOwner=`runtime`,this.pauseAll(),this.teardownObserver(),e&&this._dispatchEvent(new CustomEvent(`audioownershipchange`,{detail:{owner:`runtime`,reason:`iframe-reload`}}))}destroy(){this.teardownObserver();for(let e of this._entries)e.el.pause(),e.el.src=``;this._entries=[],this._urlAudioEntry=null,this._urlAudioSrc=null,this._audioOwner=`runtime`,this._playbackErrorPosted=!1}updateMuted(e){for(let t of this._entries)t.el.muted=e}updateVolume(e){for(let t of this._entries)t.el.volume=e}updatePlaybackRate(e){for(let t of this._entries)t.el.playbackRate=e}_playEntry(e){e.el.src&&e.el.play().catch(e=>this._reportPlaybackError(e))}_playEntryIfActive(e){this._refreshEntryBounds(e);let t=this._getCurrentTime()-e.start;t<0||t>=e.duration||this._playEntry(e)}_refreshEntryBounds(t){if(!t.source?.isConnected)return;let n=e(t.source);t.start=n.start??0,t.duration=n.duration!=null&&n.duration>0?n.duration:1/0}_gateEntryPlayback(e,t){return t<0||t>=e.duration?(e.el.paused||e.el.pause(),e.driftSamples=0,!1):(this._audioOwner===`parent`&&!this._isPaused()&&e.el.paused&&this._playEntry(e),!0)}playAll(){for(let e of this._entries)this._playEntryIfActive(e)}pauseAll(){for(let e of this._entries)e.el.pause()}stopAdoptedMedia(){for(let e of this._entries)e.source&&e.el.pause()}seekAll(e){for(let t of this._entries){this._refreshEntryBounds(t);let n=e-t.start;n>=0&&n<t.duration&&(t.el.currentTime=n)}}scrubAll(e){for(let t of this._entries){this._refreshEntryBounds(t);let n=e-t.start;n>=0&&n<t.duration?(t.el.currentTime=n,this._playEntry(t)):t.el.paused||t.el.pause()}}mirrorTime(e,t){let n=t?.force===!0;for(let t of this._entries){this._refreshEntryBounds(t);let r=e-t.start;this._gateEntryPlayback(t,r)&&(Math.abs(t.el.currentTime-r)>F?(t.driftSamples+=1,(n||t.driftSamples>=I)&&(t.el.currentTime=r,t.driftSamples=0)):t.driftSamples=0)}}promoteToParentProxy(e,t){if(this._audioOwner===`parent`)return;if(this._audioOwner=`parent`,e)for(let t of e.querySelectorAll(`video, audio`))P(t)&&(t.muted=!0);let n=this._getCurrentTime();t?t(n,{force:!0}):this.mirrorTime(n,{force:!0}),this._isPaused()||this.playAll(),this._dispatchEvent(new CustomEvent(`audioownershipchange`,{detail:{owner:`parent`,reason:`autoplay-blocked`}}))}setupFromIframe(e){let t=e.querySelectorAll(`audio[data-start], video[data-start]`);for(let e of t)P(e)&&this._adoptIframeMedia(e);this._observeDynamicMedia(e)}setupFromUrl(e){if(this._urlAudioSrc===e&&this._urlAudioEntry)return;this.teardownUrlAudio();let t=this._createEntry(e,`audio`,0,1/0);this._urlAudioEntry=t,this._urlAudioSrc=t?e:null,t&&this._audioOwner===`parent`&&!this._isPaused()&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this.playAll())}teardownUrlAudio(){let e=this._urlAudioEntry;if(this._urlAudioEntry=null,this._urlAudioSrc=null,!e)return;e.el.pause(),e.el.src=``;let t=this._entries.indexOf(e);t!==-1&&this._entries.splice(t,1)}teardownObserver(){this._mediaObserver?.disconnect(),this._mediaObserver=void 0}_reportPlaybackError(e){this._playbackErrorPosted||(this._playbackErrorPosted=!0,this._dispatchEvent(new CustomEvent(`playbackerror`,{detail:{source:`parent-proxy`,error:e}})))}_createEntry(e,t,n,r,i){if(this._entries.some(t=>t.el.src===e))return null;let a=t===`video`?document.createElement(`video`):new Audio;a.preload=`auto`,a.src=e,a.load(),a.muted=this._getMuted(),a.volume=this._getVolume();let o=this._getPlaybackRate();o!==1&&(a.playbackRate=o);let s={el:a,start:n,duration:r,driftSamples:0,source:i};return this._entries.push(s),s}_resolveIframeMediaSrc(e){let t=e.getAttribute(`src`)||e.querySelector(`source`)?.getAttribute(`src`);return t?new URL(t,e.ownerDocument.baseURI).href:null}_isSynchronizedVoiceover(t){if(!t.matches(`audio[data-ipw-voiceover="true"], audio[id^="vo-"], audio[src*="/audio/voice/"], audio[src*="voiceover-"]`))return!0;let n=t.getAttribute(`data-ipw-scene-id`)?.trim()??``,r=t.getAttribute(`data-ipw-scene-text`)?.trim()??``,i=t.getAttribute(`data-ipw-narration-text`)?.trim()??``,a=e(t),o=n?t.ownerDocument.getElementById(n):null,s=o?e(o):null,c=Array.from(t.ownerDocument.querySelectorAll(`audio[data-ipw-voiceover="true"], audio[id^="vo-"], audio[src*="/audio/voice/"], audio[src*="voiceover-"]`)),l=c.indexOf(t),u=c.some((n,r)=>{if(n===t||r>l)return!1;let i=e(n);return i.start!=null&&i.duration!=null&&a.start!=null&&i.start<=a.start&&i.start+i.duration>a.start+.001});return!!(o?.matches(`.scene, [data-scene]`)&&r&&i===r&&a.start!=null&&a.duration!=null&&a.duration>0&&s?.start!=null&&Math.abs(a.start-s.start)<.001&&!u)}_adoptIframeMedia(t){if(t.preload===`metadata`||t.preload===`none`)return;if(!this._isSynchronizedVoiceover(t)){t.muted=!0,t.pause();return}let n=this._resolveIframeMediaSrc(t);if(!n)return;let r=e(t),i=r.start??0,a=r.duration??1/0,o=t.tagName===`VIDEO`?`video`:`audio`,s=this._createEntry(n,o,i,a,t);s&&this._audioOwner===`parent`&&(this.mirrorTime(this._getCurrentTime(),{force:!0}),this._isPaused()||this._playEntryIfActive(s))}_detachIframeMedia(e){let t=this._resolveIframeMediaSrc(e);if(!t)return;let n=this._entries.findIndex(e=>e.el.src===t);if(n===-1)return;let r=this._entries[n];r.el.pause(),r.el.src=``,this._entries.splice(n,1)}_observeDynamicMedia(e){if(this.teardownObserver(),typeof MutationObserver>`u`||!e.body)return;let t=new MutationObserver(e=>{for(let t of e){if(t.type===`attributes`&&t.attributeName===`preload`){let e=t.target;P(e)&&e.matches(`audio[data-start], video[data-start]`)&&e.preload===`auto`&&this._adoptIframeMedia(e);continue}for(let e of t.addedNodes){if(!N(e))continue;let t=[];P(e)&&e.matches(`audio[data-start], video[data-start]`)&&t.push(e);let n=e.querySelectorAll(`audio[data-start], video[data-start]`);for(let e of n)P(e)&&t.push(e);for(let e of t)this._adoptIframeMedia(e)}for(let e of t.removedNodes){if(!N(e))continue;let t=[];P(e)&&e.matches(`audio[data-start], video[data-start]`)&&t.push(e);let n=e.querySelectorAll(`audio[data-start], video[data-start]`);for(let e of n)P(e)&&t.push(e);for(let e of t)this._detachIframeMedia(e)}}}),n={childList:!0,subtree:!0,attributes:!0,attributeFilter:[`preload`]},r=A(e);for(let e of r)t.observe(e,n);this._mediaObserver=t}},R=100;function z(e,t,n,r){let i=(e.frame??0)/t,a=n.duration>0?Math.min(i,n.duration):i,o=!n.paused,s=!e.isPlaying,c=n.duration>0&&a>=n.duration&&(o||e.isPlaying);if(c&&r.getLoop())return r.media.audioOwner===`parent`&&r.media.pauseAll(),r.seek(0),r.play(),{...n,currentTime:a,paused:!1};let l={...n,currentTime:a,paused:s};r.media.audioOwner===`parent`&&(o&&s?r.media.pauseAll():!o&&!s&&r.media.playAll(),r.media.mirrorTime(a));let u=performance.now(),d=s!==n.paused;return(u-n.lastUpdateMs>R||d)&&(l.lastUpdateMs=u,r.updateControlsTime(a,n.duration),r.updateControlsPlaying(!s),r.dispatchEvent(new CustomEvent(`timeupdate`,{detail:{currentTime:a}}))),c&&(r.media.audioOwner===`parent`&&r.media.pauseAll(),l.paused=!0,r.updateControlsPlaying(!1),r.dispatchEvent(new Event(`ended`))),l}function B(e){return Array.isArray(e)?e.filter(e=>typeof e==`object`&&!!e&&typeof e.id==`string`&&typeof e.start==`number`&&typeof e.duration==`number`):[]}function V(e,n,r){if(e.source!==n)return;let i=e.data;if(!i||i.source!==`hf-preview`)return;let a=t(i);if(a.status===`unsupported`){r.dispatchEvent(new CustomEvent(`runtimeprotocolerror`,{detail:{code:a.code,receivedVersion:a.receivedVersion}}));return}if(r.setRuntimeFps?.(a.fps),i.type===`shader-transition-state`){let e=i.state&&typeof i.state==`object`?i.state:{};r.shaderLoader.update(e,r.getShaderLoadingMode()),r.dispatchEvent(new CustomEvent(`shadertransitionstate`,{detail:{compositionId:i.compositionId,state:e}}));return}if(i.type===`ready`){r.onRuntimeReady();return}if(i.type===`state`){r.setPlaybackState(z({frame:i.frame??0,isPlaying:!!i.isPlaying},a.fps,r.getPlaybackState(),r));return}if(i.type===`media-autoplay-blocked`){if(r.shouldPromoteMediaAutoplayFallback?.()===!1)return;let e=null;try{e=r.getIframeDoc()}catch{}r.media.promoteToParentProxy(e,(e,t)=>r.media.mirrorTime(e,t)),r.sendControl(`set-media-output-muted`,{muted:!0});return}if(i.type===`timeline`&&i.durationInFrames>0){let e=Number(i.durationSeconds),t=Number(i.durationInFrames),n=Number.isFinite(e)&&e>0?e:t/a.fps;if(Number.isFinite(n)&&n>0){let e=r.getPlaybackState();r.setPlaybackState({...e,duration:n}),r.updateControlsTime(e.currentTime,n),r.onRuntimeTimelineReady(n)}Number.isFinite(i.compositionWidth)&&i.compositionWidth>0&&Number.isFinite(i.compositionHeight)&&i.compositionHeight>0&&r.setCompositionSize(i.compositionWidth,i.compositionHeight),r.setScenes(B(i.scenes));return}i.type===`stage-size`&&Number.isFinite(i.width)&&i.width>0&&Number.isFinite(i.height)&&i.height>0&&r.setCompositionSize(i.width,i.height)}var H=`shader-capture-scale`,U=`shader-loading`,W=`__hf_shader_capture_scale`,G=`__hf_shader_loading`,K=[`Preparing scene transitions`,`Sampling outgoing scene motion`,`Sampling incoming scene motion`,`Caching transition frames`,`Finalizing transition preview`];function q(e){if(e===null)return null;let t=Number(e);return!Number.isFinite(t)||t<=0?null:String(Math.min(1,Math.max(.25,t)))}function J(e){if(e===null||e.trim()===``)return`composition`;let t=e.trim().toLowerCase();return t===`none`||t===`false`||t===`0`||t===`off`?`none`:t===`player`||t===`true`||t===`1`||t===`on`?`player`:`composition`}function Y(e,t,n){n===null?e.delete(t):e.set(t,n)}function te(e,t,n){let r=e.indexOf(`#`),i=r>=0?e.slice(0,r):e,a=r>=0?e.slice(r):``,o=i.indexOf(`?`),s=o>=0?i.slice(0,o):i,c=o>=0?i.slice(o+1):``,l=new URLSearchParams(c);Y(l,W,t),Y(l,G,n===`composition`?null:n);let u=l.toString();return`${s}${u?`?${u}`:``}${a}`}function ne(e,t,n){if(t===null&&n===`composition`)return e;let r=[];t!==null&&r.push(`window.__HF_SHADER_CAPTURE_SCALE=${JSON.stringify(t)};`),n!==`composition`&&r.push(`window.__HF_SHADER_LOADING=${JSON.stringify(n)};`);let i=`<script data-hyperframes-player-shader-options>${r.join(``)}<\/script>`;return/<head\b[^>]*>/i.test(e)?e.replace(/<head\b[^>]*>/i,e=>`${e}${i}`):/<html\b[^>]*>/i.test(e)?e.replace(/<html\b[^>]*>/i,e=>`${e}${i}`):`${i}${e}`}function X(e){return J(e.getAttribute(U))}function re(e){return Number(q(e.getAttribute(`shader-capture-scale`))??`1`)}function Z(e,t){return te(t,q(e.getAttribute(H)),X(e))}function Q(e,t){return ne(t,q(e.getAttribute(H)),X(e))}function ie(){let e=document.createElement(`div`);e.className=`hfp-shader-loader`,e.setAttribute(`role`,`status`),e.setAttribute(`aria-live`,`polite`),e.setAttribute(`aria-label`,`Preparing scene transitions`),e.setAttribute(`data-hyperframes-ignore`,``),e.draggable=!1;let t=e=>{e.preventDefault(),e.stopPropagation()};for(let n of[`selectstart`,`dragstart`,`pointerdown`,`mousedown`,`click`,`dblclick`,`contextmenu`,`touchstart`])e.addEventListener(n,t,{capture:!0});let n=document.createElement(`div`);n.className=`hfp-shader-loader-panel`,n.draggable=!1;let r=document.createElement(`div`);r.className=`hfp-shader-loader-mark`,r.draggable=!1,r.innerHTML=[`<svg width="78" height="78" viewBox="0 0 100 100" fill="none" aria-hidden="true" draggable="false">`,`<path d="M10.1851 57.8021L33.1145 73.8313C36.2202 75.9978 41.5173 73.5433 42.4816 69.4984L51.7611 30.4271C52.7253 26.3822 48.5802 23.9277 44.4602 26.0942L13.917 42.1235C6.96677 45.7676 4.97564 54.1579 10.1851 57.8021Z" fill="url(#hfp-shader-loader-grad-left)"/>`,`<path d="M87.5129 57.5141L56.9696 73.5433C52.8371 75.7098 48.7046 73.2553 49.6688 69.2104L58.9483 30.1391C59.9125 26.0942 65.2097 23.6397 68.3154 25.8062L91.2447 41.8354C96.4668 45.4796 94.4631 53.8699 87.5129 57.5141Z" fill="url(#hfp-shader-loader-grad-right)"/>`,`<defs>`,`<linearGradient id="hfp-shader-loader-grad-left" x1="48.5676" y1="25" x2="44.7804" y2="71.9384" gradientUnits="userSpaceOnUse">`,`<stop stop-color="#06E3FA"/>`,`<stop offset="1" stop-color="#4FDB5E"/>`,`</linearGradient>`,`<linearGradient id="hfp-shader-loader-grad-right" x1="54.8282" y1="73.8392" x2="72.0989" y2="32.8932" gradientUnits="userSpaceOnUse">`,`<stop stop-color="#06E3FA"/>`,`<stop offset="1" stop-color="#4FDB5E"/>`,`</linearGradient>`,`</defs>`,`</svg>`].join(``);let i=document.createElement(`div`);i.className=`hfp-shader-loader-title`;let a=document.createElement(`span`);a.className=`hfp-shader-loader-title-text`,a.textContent=K[0]||`Preparing scene transitions`,i.appendChild(a);let o=document.createElement(`div`);o.className=`hfp-shader-loader-detail`,o.textContent=`Rendering animated scene samples for shader transitions.`;let s=document.createElement(`div`);s.className=`hfp-shader-loader-track`,s.setAttribute(`aria-hidden`,`true`);let c=document.createElement(`div`);c.className=`hfp-shader-loader-fill`,s.appendChild(c);let l=document.createElement(`div`);l.className=`hfp-shader-loader-progress`;let u=e=>{let t=document.createElement(`div`);t.className=`hfp-shader-loader-row`;let n=document.createElement(`span`);n.className=`hfp-shader-loader-label`,n.textContent=e;let r=document.createElement(`span`);return r.className=`hfp-shader-loader-value`,t.appendChild(n),t.appendChild(r),l.appendChild(t),{row:t,label:n,value:r}},d=u(`transition`),f=u(`transition frame`);return n.appendChild(r),n.appendChild(i),n.appendChild(o),n.appendChild(s),n.appendChild(l),e.appendChild(n),{root:e,fill:c,title:a,detail:o,transitionValue:d.value,frameLabel:f.label,frameValue:f.value,frameRow:f.row}}var ae=420,oe=class{_el;_hideTimeout=null;constructor(e){this._el=e}show(){this._hideTimeout&&=(clearTimeout(this._hideTimeout),null),this._el.root.classList.remove(`hfp-hiding`),this._el.root.classList.add(`hfp-visible`)}hide(){if(this._el.root.classList.contains(`hfp-hiding`)){this._hideTimeout||this._scheduleCleanup();return}this._el.root.classList.contains(`hfp-visible`)&&(this._el.root.classList.add(`hfp-hiding`),this._el.root.classList.remove(`hfp-visible`),this._scheduleCleanup())}reset(){this._hideTimeout&&=(clearTimeout(this._hideTimeout),null),this._el.root.classList.remove(`hfp-visible`,`hfp-hiding`),this._el.fill.style.transform=`scaleX(0)`,this._el.transitionValue.textContent=``,this._el.frameValue.textContent=``,this._el.frameRow.style.visibility=`hidden`}update(e,t){if(t!==`player`){this.reset();return}if(e.ready||!e.loading){this.hide();return}let n=typeof e.progress==`number`&&Number.isFinite(e.progress)?e.progress:0,r=typeof e.total==`number`&&Number.isFinite(e.total)?e.total:0,i=r>0?Math.min(1,Math.max(0,n/r)):0,a=Math.min(K.length-1,Math.floor(i*K.length));this._el.title.textContent=K[a]||`Preparing scene transitions`,this._el.detail.textContent=e.phase===`cached`?`Loading cached transition frames before playback.`:e.phase===`finalizing`?`Uploading transition textures for smooth playback.`:`Rendering animated scene samples for shader transitions.`,this._el.fill.style.transform=`scaleX(${i})`,this._el.transitionValue.textContent=e.currentTransition!==void 0&&e.transitionTotal!==void 0?`${e.currentTransition}/${e.transitionTotal}`:r>0?`${n}/${r}`:``;let o=e.transitionFrame!==void 0&&e.transitionFrames!==void 0?`${e.transitionFrame}/${e.transitionFrames}`:``;this._el.frameLabel.textContent=e.phase===`cached`?`cached transition frames`:e.phase===`finalizing`?`finalizing transition frames`:`rendering transition frames`,this._el.frameValue.textContent=o,this._el.frameRow.style.visibility=o?`visible`:`hidden`,this._el.root.setAttribute(`aria-valuenow`,String(Math.round(i*100))),this.show()}get hideTimeout(){return this._hideTimeout}destroy(){this._hideTimeout&&=(clearTimeout(this._hideTimeout),null)}_scheduleCleanup(){this._hideTimeout&&clearTimeout(this._hideTimeout),this._hideTimeout=setTimeout(()=>{this._el.root.classList.remove(`hfp-hiding`),this._hideTimeout=null},ae)}},se=.1,ce=5;function $(e){return!Number.isFinite(e)||e<=0?1:Math.max(se,Math.min(ce,e))}var le=class extends HTMLElement{static get observedAttributes(){return[`src`,`srcdoc`,`width`,`height`,`controls`,`muted`,`audio-locked`,`volume`,`poster`,`playback-rate`,`audio-src`,H,U]}shadow;container;iframe;posterEl=null;controlsApi=null;resizeObserver;shaderLoader;probe;_ready=!1;_currentTime=0;_duration=0;_paused=!0;_scrubbing=!1;_lastUpdateMs=0;_volume=1;_compositionWidth=1920;_compositionHeight=1080;_rescaleWarned=!1;_directTimelineAdapter=null;_directTimelineClock;_parentTickRaf=null;_media;_scenes=[];_runtimeFps=30;constructor(){super(),this.shadow=this.attachShadow({mode:`open`}),T(this.shadow,f),{container:this.container,iframe:this.iframe}=E(),this.shadow.appendChild(this.container);let e=ie();this.shadow.appendChild(e.root),this.shaderLoader=new oe(e),this._media=new L({dispatchEvent:e=>this.dispatchEvent(e),getMuted:()=>this.muted,getVolume:()=>this._volume,getPlaybackRate:()=>this.playbackRate,getCurrentTime:()=>this._currentTime,isPaused:()=>this._paused}),this._directTimelineClock=new k({onTimeUpdate:(e,t)=>{this._currentTime=e,this.controlsApi?.updateTime(e,t),this.dispatchEvent(new CustomEvent(`timeupdate`,{detail:{currentTime:e}}))},getLoop:()=>this.loop,restart:()=>{this.seek(0),this.play()},onPaused:()=>{this._media.audioOwner===`parent`&&this._media.pauseAll(),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.dispatchEvent(new Event(`ended`))},onEnded:()=>this.loop}),this.probe=new d(this.iframe,{onReady:e=>this._onProbeReady(e),onError:e=>this.dispatchEvent(new CustomEvent(`error`,{detail:{message:e}}))}),this.addEventListener(`click`,e=>{C(e)||(this._paused?this.play():this.pause())}),this.resizeObserver=new ResizeObserver(()=>this._rescale()),this._onMessage=this._onMessage.bind(this),this._onIframeLoad=this._onIframeLoad.bind(this)}connectedCallback(){this.resizeObserver.observe(this),window.addEventListener(`message`,this._onMessage),this.iframe.addEventListener(`load`,this._onIframeLoad),this.hasAttribute(`controls`)&&this._setupControls(),this.hasAttribute(`poster`)&&(this.posterEl=S(this.shadow,this.getAttribute(`poster`),this.posterEl)),this.hasAttribute(`audio-src`)&&this._media.setupFromUrl(this.getAttribute(`audio-src`)),this.hasAttribute(`srcdoc`)&&(this.iframe.srcdoc=Q(this,this.getAttribute(`srcdoc`))),this.hasAttribute(`src`)&&(this.iframe.src=Z(this,this.getAttribute(`src`))),!this.hasAttribute(`audio-locked`)&&this._isLockedHostEnvironment()&&this._applyAudioLock(!0)}disconnectedCallback(){this._sendControl(`pause`),this._stopIframeMedia(),this.resizeObserver.disconnect(),window.removeEventListener(`message`,this._onMessage),this.iframe.removeEventListener(`load`,this._onIframeLoad),this.probe.stop(),this._directTimelineClock.stop(),this._stopParentTickClock(),this._directTimelineAdapter=null,this.shaderLoader.destroy(),this._media.destroy(),this.controlsApi?.destroy(),this.controlsApi=null,this._paused=!0,this._ready=!1}attributeChangedCallback(e,t,n){switch(e){case`src`:n&&(this._ready=!1,this.iframe.src=Z(this,n));break;case`srcdoc`:this._ready=!1,n===null?this.iframe.removeAttribute(`srcdoc`):this.iframe.srcdoc=Q(this,n);break;case`width`:this._compositionWidth=l(n)??1920,this._rescale();break;case`height`:this._compositionHeight=l(n)??1080,this._rescale();break;case`controls`:n===null?(this.controlsApi?.destroy(),this.controlsApi=null):this._setupControls();break;case`poster`:this.posterEl=S(this.shadow,n,this.posterEl);break;case`playback-rate`:{let e=$(parseFloat(n||`1`));this._media.updatePlaybackRate(e),this._sendControl(`set-playback-rate`,{playbackRate:e}),this._directTimelineAdapter?.timeScale?.(e),this.controlsApi?.updateSpeed(e),this.dispatchEvent(new Event(`ratechange`));break}case`muted`:this._handleMutedChange(n);break;case`audio-locked`:this._applyAudioLock(n!==null);break;case`volume`:{let e=Math.max(0,Math.min(1,parseFloat(n||`1`)));this._volume=e,this._media.updateVolume(e),this._sendControl(`set-volume`,{volume:e}),this.controlsApi?.updateVolume(e),this.dispatchEvent(new Event(`volumechange`));break}case`audio-src`:n?this._media.setupFromUrl(n):this._media.teardownUrlAudio();break;case H:case U:this._reloadShaderOptions()}}get iframeElement(){return this.iframe}get scenes(){return this._scenes}play(){this.posterEl?.remove(),this.posterEl=null,this._duration>0&&this._currentTime>=this._duration&&this.seek(0),this._paused=!1;let e=this._tryDirectTimelinePlay();e||(this._sendControl(`play`),this._ready&&!this._directTimelineAdapter&&this._startParentTickClock()),this._media.audioOwner===`parent`&&this._media.playAll(),this.controlsApi?.updatePlaying(!0),this.dispatchEvent(new Event(`play`)),e&&this._directTimelineAdapter&&this._directTimelineClock.start(this._directTimelineAdapter,()=>this._currentTime,()=>this._duration,()=>this._paused)}pause(){this._tryDirectTimelinePause()||this._sendControl(`pause`),this._directTimelineClock.stop(),this._stopParentTickClock(),this._media.audioOwner===`parent`&&this._media.pauseAll(),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.dispatchEvent(new Event(`pause`))}stopMedia(){this._sendControl(`stop-media`),this._stopIframeMedia(),this._media.stopAdoptedMedia()}seek(e){!this._trySyncSeek(e)&&!this._tryDirectTimelineSeek(e)&&this._sendControl(`seek`,{timeSeconds:e,frame:Math.round(e*this._runtimeFps)}),this._directTimelineClock.stop(),this._stopParentTickClock(),this._currentTime=e,this._media.audioOwner===`parent`&&(this._scrubbing?this._media.scrubAll(e):(this._media.pauseAll(),this._media.seekAll(e))),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.controlsApi?.updateTime(this._currentTime,this._duration)}setColorGrading(e,t){this._sendControl(`set-color-grading`,{target:e,grading:t})}clearColorGrading(e){this._sendControl(`set-color-grading`,{target:e,grading:null})}setColorGradingCompare(e,t){this._sendControl(`set-color-grading-compare`,{target:e,compare:t})}clearColorGradingCompare(e){this._sendControl(`set-color-grading-compare`,{target:e,compare:{enabled:!1}})}get currentTime(){return this._currentTime}set currentTime(e){this.seek(e)}get duration(){return this._duration}get paused(){return this._paused}get ready(){return this._ready}get playbackRate(){return $(parseFloat(this.getAttribute(`playback-rate`)||`1`))}set playbackRate(e){this.setAttribute(`playback-rate`,String($(e)))}get shaderCaptureScale(){return re(this)}set shaderCaptureScale(e){this.setAttribute(H,String(e))}get shaderLoading(){return X(this)}set shaderLoading(e){e===`composition`?this.removeAttribute(U):this.setAttribute(U,e)}get muted(){return this.hasAttribute(`muted`)}set muted(e){e?this.setAttribute(`muted`,``):this.removeAttribute(`muted`)}get audioLocked(){return this.hasAttribute(`audio-locked`)}set audioLocked(e){e?this.setAttribute(`audio-locked`,``):this.removeAttribute(`audio-locked`)}_isLockedHostEnvironment(){if(typeof navigator>`u`)return!1;let e=navigator.userAgent||``;return/\bClaude\/\d/.test(e)&&/\bElectron\b/.test(e)}_isAudioLocked(){return this.hasAttribute(`audio-locked`)||this._isLockedHostEnvironment()}_isSlideshowPlayer(){return this.closest(`hyperframes-slideshow`)!==null}_handleMutedChange(e){if(e===null&&this._isAudioLocked()){this.setAttribute(`muted`,``);return}this._media.updateMuted(e!==null),this._setIframeMediaMuted(e!==null),this._sendControl(`set-muted`,{muted:e!==null}),this.controlsApi?.updateMuted(e!==null),this.dispatchEvent(new Event(`volumechange`))}_applyAudioLock(e){e&&(this.muted=!0),this.controlsApi?.setVolumeControlsHidden(e)}get volume(){return this._volume}set volume(e){this.setAttribute(`volume`,String(Math.max(0,Math.min(1,e))))}get loop(){return this.hasAttribute(`loop`)}set loop(e){e?this.setAttribute(`loop`,``):this.removeAttribute(`loop`)}_sendControl(e,t={}){try{this.iframe.contentWindow?.postMessage({...t,source:`hf-parent`,type:`control`,action:e,...n(this._runtimeFps)},`*`)}catch{}}_getSameOriginIframeDocument(){try{return this.iframe.contentDocument}catch{return null}}_setIframeMediaMuted(e){let t=this._getSameOriginIframeDocument();if(t)for(let n of t.querySelectorAll(`video, audio`))P(n)&&(n.muted=e||n.defaultMuted)}_stopIframeMedia(){let e=this._getSameOriginIframeDocument();if(e)for(let t of e.querySelectorAll(`video, audio`))P(t)&&t.pause()}_replayBridgeState(){this._sendControl(`set-muted`,{muted:this.muted}),this._sendControl(`set-volume`,{volume:this._volume}),this._sendControl(`set-playback-rate`,{playbackRate:this.playbackRate}),this._sendControl(`set-native-media-sync-disabled`,{disabled:this._isSlideshowPlayer()}),this._sendControl(`set-web-audio-media-disabled`,{disabled:this._isSlideshowPlayer()})}_reloadShaderOptions(){if(X(this)!==`player`&&this.shaderLoader.reset(),this.hasAttribute(`srcdoc`)){this.iframe.srcdoc=Q(this,this.getAttribute(`srcdoc`)||``);return}this.hasAttribute(`src`)&&(this.iframe.src=Z(this,this.getAttribute(`src`)||``))}_trySyncSeek(e){try{let t=this.iframe.contentWindow?.__player;return typeof t?.seek==`function`&&(t.seek.call(t,e),!0)}catch{return!1}}_withDirectTimeline(e){let t=this._directTimelineAdapter||this.probe.resolveDirectTimelineAdapter();if(!t)return!1;try{return e(t),this._directTimelineAdapter=t,!0}catch{return!1}}_tryDirectTimelineSeek(e){return this._withDirectTimeline(t=>{t.seek(e,!1),t.pause()})}_tryDirectTimelinePlay(){return this._withDirectTimeline(e=>void e.play())}_tryDirectTimelinePause(){return this._withDirectTimeline(e=>void e.pause())}_startParentTickClock(){this._stopParentTickClock();let e=()=>{if(this._paused){this._parentTickRaf=null;return}this._sendControl(`tick`),this._parentTickRaf=requestAnimationFrame(e)};this._parentTickRaf=requestAnimationFrame(e)}_stopParentTickClock(){this._parentTickRaf!==null&&(cancelAnimationFrame(this._parentTickRaf),this._parentTickRaf=null)}_onMessage(e){V(e,this.iframe.contentWindow,{getPlaybackState:()=>({currentTime:this._currentTime,duration:this._duration,paused:this._paused,lastUpdateMs:this._lastUpdateMs}),setPlaybackState:({currentTime:e,duration:t,paused:n,lastUpdateMs:r})=>{this._currentTime=e,this._duration=t,this._paused=n,this._lastUpdateMs=r},getShaderLoadingMode:()=>X(this),shaderLoader:this.shaderLoader,setCompositionSize:(e,t)=>{this._compositionWidth=e,this._compositionHeight=t,this._rescale()},sendControl:(e,t)=>this._sendControl(e,t),getIframeDoc:()=>this.iframe.contentDocument,onRuntimeReady:()=>this._replayBridgeState(),onRuntimeTimelineReady:e=>this._onRuntimeTimelineReady(e),setRuntimeFps:e=>{this._runtimeFps=e},shouldPromoteMediaAutoplayFallback:()=>!this._isSlideshowPlayer(),setScenes:e=>{this._scenes=e,this.dispatchEvent(new CustomEvent(`scenes`,{detail:{scenes:e}}))},updateControlsTime:(e,t)=>this.controlsApi?.updateTime(e,t),updateControlsPlaying:e=>this.controlsApi?.updatePlaying(e),dispatchEvent:e=>this.dispatchEvent(e),seek:e=>this.seek(e),play:()=>this.play(),getLoop:()=>this.loop,media:this._media})}_onRuntimeTimelineReady(e){if(this._ready)return;this.probe.stop(),this._duration=e,this._directTimelineAdapter=null,this._ready=!0,this.controlsApi?.updateTime(this._currentTime,e),this.dispatchEvent(new CustomEvent(`ready`,{detail:{duration:e}})),this._rescale();let t=this._getSameOriginIframeDocument();t&&this._media.setupFromIframe(t),this._replayBridgeState(),this._setIframeMediaMuted(this.muted),this.hasAttribute(`autoplay`)&&this.play()}_onProbeReady({duration:e,adapter:t,compositionSize:n}){this._duration=e,this._directTimelineAdapter=t.kind===`direct-timeline`?t.timeline:null,this._ready=!0,this.controlsApi?.updateTime(0,e),this.dispatchEvent(new CustomEvent(`ready`,{detail:{duration:e}})),n&&(this._compositionWidth=n.width,this._compositionHeight=n.height,this._rescale());try{let e=this.iframe.contentDocument;e&&this._media.setupFromIframe(e)}catch{}this._setIframeMediaMuted(this.muted),this.hasAttribute(`autoplay`)&&this.play()}_rescale(){!D(this,this.iframe,this._compositionWidth,this._compositionHeight)&&this._ready&&!this._rescaleWarned&&(this._rescaleWarned=!0,console.warn(`[hyperframes-player] rescale no-op after ready — zero-size player element`,{src:this.getAttribute(`src`),offsetWidth:this.offsetWidth,offsetHeight:this.offsetHeight,compositionWidth:this._compositionWidth,compositionHeight:this._compositionHeight}))}_onIframeLoad(){this._ready=!1,this._directTimelineAdapter=null,this._directTimelineClock.stop(),this._stopParentTickClock(),this.shaderLoader.reset(),this._media.resetForIframeLoad(),this.probe.start()}_setupControls(){this.controlsApi||=x(this.shadow,this.muted,this._volume,this.getAttribute(`speed-presets`),{onPlay:()=>this.play(),onPause:()=>this.pause(),onSeek:e=>this.seek(e*this._duration),onScrubStart:()=>{this._scrubbing=!0},onScrubEnd:()=>{this._scrubbing=!1,this.seek(this._currentTime)},onSpeedChange:e=>void(this.playbackRate=e),onMuteToggle:()=>void(this.muted=!this.muted),onVolumeChange:e=>void(this.volume=e)},this._isAudioLocked())}get _audioOwner(){return this._media.audioOwner}get _parentMedia(){return this._media.entries}_mirrorParentMediaTime(e,t){this._media.mirrorTime(e,t)}_promoteToParentProxy(){let e=null;try{e=this.iframe.contentDocument}catch{}this._media.promoteToParentProxy(e,(e,t)=>this._mirrorParentMediaTime(e,t)),this._sendControl(`set-media-output-muted`,{muted:!0})}_observeDynamicMedia(e){this._media.setupFromIframe(e)}};customElements.get(`hyperframes-player`)||customElements.define(`hyperframes-player`,le);