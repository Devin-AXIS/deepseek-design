/** Local model used only by disposable installed-browser checks. */
import { LlmAdapter } from "@deepseek-ai/dsh-llm";

export const name = "studio-ai-fixture";
export const inject = ["llm", "webServer", "connection", "agents"];

export function apply(ctx) {
  const requests = [];
  class FixtureAdapter extends LlmAdapter {
    async listModels(provider) {
      return [{ provider, id: "fixed", name: "Studio AI fixture" }];
    }
    async resolveModel(provider, model) {
      return { provider, id: model, name: "Studio AI fixture" };
    }
    async *stream(options) {
      requests.push(structuredClone(options.messages));
      const text = "VIDEO_AI_FIXTURE_ACCEPTED";
      yield { type: "block-start", index: 0, blockType: "text" };
      yield { type: "text-delta", index: 0, text };
      yield { type: "block-end", index: 0, block: { type: "text", text } };
      yield { type: "finish", reason: { kind: "stop" } };
    }
  }
  ctx.effect(() => ctx.llm.registerAdapter([name], new FixtureAdapter()));
  ctx.effect(() =>
    ctx.webServer.register({
      kind: "prefix",
      path: "/studio-ai-fixture",
      async handler(request, response) {
        const denied = ctx.connection.requestRejection({
          headers: request.headers,
        });
        if (denied !== undefined) {
          response.writeHead(denied);
          response.end();
          return;
        }
        if (request.method === "POST" && request.url.endsWith("/select")) {
          const chunks = [];
          for await (const chunk of request) chunks.push(Buffer.from(chunk));
          const { sessionId } = JSON.parse(Buffer.concat(chunks).toString());
          const agent =
            typeof sessionId === "string"
              ? ctx.agents.get(sessionId)
              : undefined;
          if (!agent) {
            response.writeHead(404);
            response.end();
            return;
          }
          agent.model.select({ provider: name, model: "fixed" });
        }
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ requests }));
      },
    }),
  );
}
