/** Compact, replayable Design references using official conversation extension points. */
import type { Context } from "@deepseek-ai/cordis";
import type { UserTextNodeProps } from "@deepseek-ai/dsh-client-ui-conversation/client";
import { ReferenceChip } from "@deepseek-ai/dsh-client-ui-primitives";
import { findDesignContext } from "./design-context.ts";

declare module "@deepseek-ai/dsh-client-ui-conversation/client" {
  interface UserTextDataMap {
    "ipollo-design": { label: string; context: string };
  }
}

/** Register parsing and presentation together for the lifetime of Design. */
export function registerDesignContextChip(ctx: Context): void {
  ctx.effect(() =>
    ctx.uiConversation.userText.register({
      id: "ipollo-design",
      order: 5,
      match(text, from) {
        const result = findDesignContext(text, from);
        if (!result) return undefined;
        return {
          id: "ipollo-design",
          start: result.start,
          end: result.end,
          data: { label: result.label, context: result.context },
        };
      },
    }),
  );
  ctx.slots.inject("conversation.user.text.node", () =>
    ctx.slots.register(
      { name: "conversation.user.text.node", key: "ipollo-design" },
      DesignContextChip,
    ),
  );
}
function DesignContextChip({ node }: UserTextNodeProps<"ipollo-design">) {
  return (
    <span data-design-context-chip>
      <ReferenceChip
        appearance="file"
        label={node.data.label}
        title={node.data.context}
      />
    </span>
  );
}
