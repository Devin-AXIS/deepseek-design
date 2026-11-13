/** DSH's renderer owns this mount; the original editor retains its pinned React runtime. */
import { useEffect, useRef } from "react";
import { mountEditor } from "@ipollo/native-renderer";
import type { PluginSurfaceProps } from "./surface.tsx";

/** Mount the original components in the host document and drain their renderer on slot removal. */
export function NativeStudio(props: PluginSurfaceProps) {
  const container = useRef<HTMLDivElement>(null);
  const renderer = useRef<ReturnType<typeof mountEditor> | undefined>(
    undefined,
  );
  const latest = useRef(props);
  latest.current = props;
  useEffect(() => {
    if (!container.current) return;
    const active = mountEditor(container.current, latest.current);
    renderer.current = active;
    return () => {
      renderer.current = undefined;
      active.dispose();
    };
  }, []);
  useEffect(() => renderer.current?.update(props), [props]);
  return (
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
  );
}
