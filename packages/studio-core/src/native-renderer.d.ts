declare module "@ipollo/native-renderer" {
  /** A locally bundled original renderer, injected by the plugin's build. */
  export function mountEditor(
    container: HTMLElement,
    props: import("./surface.tsx").PluginSurfaceProps,
  ): {
    update(props: import("./surface.tsx").PluginSurfaceProps): void;
    dispose(): void;
  };
}
