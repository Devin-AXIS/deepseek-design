/** Refresh only an explicitly expired Studio capability; preserve the running editor and its draft. */
import { z } from "zod";
type Kind = "design" | "video";
interface Connection {
  kind: Kind;
  apiRoot: string;
  bootstrapUrl: string;
  readToken: () => string;
  writeToken: (token: string) => void;
  fetcher?: (url: string, init?: RequestInit) => Promise<Response>;
}
const grant = z.object({ token: z.string().regex(/^[A-Za-z0-9_-]{43}$/) });
function waitForRefresh(
  refresh: Promise<void>,
  signal: AbortSignal | null | undefined,
): Promise<void> {
  if (!signal) return refresh;
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    void refresh
      .then(resolve, reject)
      .finally(() => signal.removeEventListener("abort", abort))
      .catch(() => undefined);
    if (signal.aborted) abort();
  });
}
/** Create one editor's authenticated transport; stale-capability retries happen before any API mutation. */
export function createStudioTransport(connection: Connection) {
  const fetcher = connection.fetcher ?? fetch,
    api = new URL(connection.apiRoot),
    bootstrap = new URL(connection.bootstrapUrl);
  let refreshing: Promise<void> | undefined;
  const tokenHeader = "x-ipollowork-" + connection.kind + "-token";
  async function refresh() {
    const response = await fetcher(bootstrap.href, {
      credentials: "same-origin",
      redirect: "error",
    });
    if (!response.ok)
      throw Error(
        "Studio authentication could not be refreshed. Restore the host connection and retry.",
      );
    connection.writeToken(grant.parse(await response.json()).token);
  }
  return {
    async request(input: string, init: RequestInit = {}): Promise<Response> {
      const url = new URL(input, api);
      if (
        url.protocol !== api.protocol ||
        url.host !== api.host ||
        (url.pathname !== api.pathname &&
          !url.pathname.startsWith(api.pathname + "/"))
      )
        throw Error("Studio request escaped its API.");
      init.signal?.throwIfAborted();
      const send = (token: string) => {
        const headers = new Headers(init.headers);
        headers.set(tokenHeader, token);
        return fetcher(url.href, {
          ...init,
          headers,
          credentials: "same-origin",
          redirect: "error",
        });
      };
      const previous = connection.readToken(),
        response = await send(previous);
      if (response.status !== 403) return response;
      const detail: unknown = await response
        .clone()
        .json()
        .catch((_notJson: unknown) => null);
      if (
        !detail ||
        typeof detail !== "object" ||
        !("code" in detail) ||
        detail.code !== "STUDIO_AUTH_STALE"
      )
        return response;
      init.signal?.throwIfAborted();
      if (connection.readToken() === previous) {
        refreshing ??= refresh().finally(() => {
          refreshing = undefined;
        });
        await waitForRefresh(refreshing, init.signal);
      }
      init.signal?.throwIfAborted();
      return send(connection.readToken());
    },
  };
}
const transports = new Map<Kind, ReturnType<typeof createStudioTransport>>();
/** Studio API path at the editor's current mount, including an optional reverse-proxy prefix. */
export function studioApiRoot(kind: Kind): string {
  return `/ipollowork-${kind}/api`;
}
/** Shared request adapter used by both original editor clients and the additional resource chooser. */
export function studioFetch(
  kind: Kind,
  input: string,
  init?: RequestInit,
): Promise<Response> {
  let transport = transports.get(kind);
  if (!transport) {
    const apiRoot = new URL(studioApiRoot(kind), window.location.href);
    let token = "";
    transport = createStudioTransport({
      kind,
      apiRoot: apiRoot.href,
      bootstrapUrl: new URL("../bootstrap", apiRoot.href + "/").href,
      readToken: () => token,
      writeToken: (value) => {
        token = value;
      },
    });
    transports.set(kind, transport);
  }
  return transport.request(input, init);
}
