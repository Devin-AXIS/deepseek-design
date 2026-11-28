/** Native video conversation view. */
import { createClient } from "../../studio-core/src/client.tsx";
import { NativeStudio } from "../../studio-core/src/native-mount.tsx";
import type { PluginSurfaceProps } from "../../studio-core/src/surface.tsx";
const plugin = createClient("video", (props: PluginSurfaceProps) => <NativeStudio {...props} videoShell />);
export const inject = plugin.inject;
export const apply = plugin.apply;
