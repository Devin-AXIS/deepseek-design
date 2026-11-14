/** Native Video open notifications and canonical project-file association. */
import type { Context } from "@deepseek-ai/cordis";
import type { SessionId } from "@deepseek-ai/dsh-session/types";
import {
  parseFileAddress,
  sessionFileAddress,
} from "@deepseek-ai/dsh-util-workspace-path";
import { subscribeStudioNotifications } from "./studio-notifications.ts";

export function videoFile(
  address: string,
  openedVideoFiles?: ReadonlySet<string>,
) {
  const file = parseFileAddress(address);
  return file?.scope === "session" &&
    (/^videos?\/[^/]+\/index\.html?$/i.test(file.path) ||
      openedVideoFiles?.has(address))
    ? file
    : undefined;
}

export function registerVideoConnection(ctx: Context): {
  file: (address: string) => ReturnType<typeof videoFile>;
} {
  const openedVideoFiles = new Set<string>();
  ctx.effect(() => () => {
    openedVideoFiles.clear();
  });
  let requested: { sessionId: SessionId; entry: string } | undefined;
  const open = () => {
    if (
      !requested ||
      ctx.sidebarRight.mounted.getSnapshot() !== requested.sessionId
    )
      return;
    if (
      ctx.configForms
        .get<{ rightSidebar: boolean }>("deepseek-video")
        .getSnapshot().value?.rightSidebar === false
    )
      ctx.emit("ipollo/studio-open", "video", requested.sessionId);
    else
      ctx.sidebarRight.openResource(
        sessionFileAddress(requested.sessionId, requested.entry),
        { kind: "deepseek-video" },
      );
    requested = undefined;
  };
  ctx.effect(() => ctx.sidebarRight.mounted.subscribe(open));
  subscribeStudioNotifications(ctx, "video", (value) => {
    if (
      !value ||
      typeof value !== "object" ||
      !("sessionId" in value) ||
      typeof value.sessionId !== "string" ||
      !("entry" in value) ||
      typeof value.entry !== "string"
    )
      return;
    openedVideoFiles.add(
      sessionFileAddress(value.sessionId as SessionId, value.entry),
    );
    requested = { sessionId: value.sessionId as SessionId, entry: value.entry };
    open();
  });
  return { file: (address) => videoFile(address, openedVideoFiles) };
}
