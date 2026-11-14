/** DSH owns the mount; the original editor and its stylesheet load only when opened. */
import { useEffect, useRef, useState } from "react";
import { rendererUrl, stylesheetUrl } from "@ipollo/native-renderer";
import type { PluginSurfaceProps } from "./surface.tsx";
import type { TemplateLibraryProps } from "./template-library-types.ts";

type EditorModule = {
  mountEditor(
    container: HTMLElement,
    props: PluginSurfaceProps,
  ): {
    update(props: PluginSurfaceProps): void;
    dispose(): void;
  };
  mountTemplateLibrary(
    container: HTMLElement,
    props: TemplateLibraryProps,
  ): {
    update(props: TemplateLibraryProps): void;
    dispose(): void;
  };
};

type NativeContentProps =
  | { surface: "editor"; value: PluginSurfaceProps }
  | { surface: "templates"; value: TemplateLibraryProps };

/** Load a link within the component lifetime and release its listeners after settlement. */
function stylesheet(link: HTMLLinkElement, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const loaded = () => {
      clean();
      resolve();
    };
    const failed = () => {
      clean();
      reject(new Error("Could not load the editor stylesheet."));
    };
    const aborted = () => {
      clean();
      reject(signal.reason);
    };
    const clean = () => {
      link.removeEventListener("load", loaded);
      link.removeEventListener("error", failed);
      signal.removeEventListener("abort", aborted);
    };
    link.addEventListener("load", loaded, { once: true });
    link.addEventListener("error", failed, { once: true });
    signal.addEventListener("abort", aborted, { once: true });
    if (signal.aborted) aborted();
  });
}

/** Mount the original editor after its assets load; unmount always cancels admission and drains its renderer. */
export function NativeStudio(props: PluginSurfaceProps) {
  return <NativeContent surface="editor" value={props} />;
}

/** Load the shared library through the same scoped renderer assets as its owning editor. */
export function NativeTemplateLibrary(props: TemplateLibraryProps) {
  return <NativeContent surface="templates" value={props} />;
}

function NativeContent(props: NativeContentProps) {
  const container = useRef<HTMLDivElement>(null);
  const renderer = useRef<
    { update(props: NativeContentProps): void; dispose(): void } | undefined
  >(undefined);
  const latest = useRef(props);
  latest.current = props;
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylesheetUrl;
    setStatus("loading");
    const styles = stylesheet(link, controller.signal);
    document.head.append(link);
    void Promise.all([
      styles,
      import(/* @vite-ignore */ rendererUrl) as Promise<EditorModule>,
    ])
      .then(([, module]) => {
        if (controller.signal.aborted || !container.current) return;
        const current = latest.current;
        if (current.surface === "editor") {
          const mounted = module.mountEditor(container.current, current.value);
          renderer.current = {
            dispose: mounted.dispose,
            update: (next) => {
              if (next.surface === "editor") mounted.update(next.value);
            },
          };
        } else {
          const mounted = module.mountTemplateLibrary(
            container.current,
            current.value,
          );
          renderer.current = {
            dispose: mounted.dispose,
            update: (next) => {
              if (next.surface === "templates") mounted.update(next.value);
            },
          };
        }
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setMessage(
          error instanceof Error
            ? error.message
            : "Editor assets are unavailable.",
        );
        setStatus("error");
      });
    return () => {
      controller.abort();
      renderer.current?.dispose();
      renderer.current = undefined;
      link.remove();
    };
  }, [attempt, props.surface]);
  useEffect(() => renderer.current?.update(props), [props]);
  const zh = props.value.language.startsWith("zh");
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
      }}
    >
      <div
        ref={container}
        data-studio-mount
        style={{
          width: "100%",
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
        }}
      />
      {status !== "ready" && (
        <div
          role={status === "error" ? "alert" : "status"}
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeContent: "center",
            gap: 12,
            padding: 24,
            textAlign: "center",
          }}
        >
          <p>
            {status === "loading"
              ? zh
                ? "正在加载编辑器…"
                : "Loading editor…"
              : zh
                ? "编辑器未能加载"
                : "Could not load the editor"}
          </p>
          {status === "error" && (
            <>
              <p style={{ fontSize: 12 }}>{message}</p>
              <button
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
              >
                {zh ? "重试" : "Retry"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
