/** Native video conversation view. */
import { createClient } from "../../studio-core/src/client.tsx";
import { NativeStudio } from "../../studio-core/src/native-mount.tsx";
const plugin = createClient("video", NativeStudio);
export const inject = plugin.inject;
export const apply = plugin.apply;
