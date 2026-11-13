import { createHash, randomBytes, randomUUID } from "node:crypto";

import * as oauth from "oauth4webapi";
import { tokenValues } from "./authorization-protocol.js";
import { authorizationConsumerId, authorizationVault } from "./authorization-runtime.js";
import { ApiError } from "./errors.js";
import type { ServerConfig } from "./types.js";
import type { ProviderFetch } from "./provider-fetch.js";

const CLIENT_METHOD_ID = "oauth-client";
const CLIENT_FINGERPRINT = "mcp-oauth-client-v1";
const TOKEN_METHOD_ID = "oauth-token";
const TOKEN_FINGERPRINT = "mcp-oauth-token-v1";
const ACCOUNT_ID = "default";
const FLOW_TTL_MS = 10 * 60_000;
const tokenRefreshes = new Map<string, Promise<Record<string, string>>>();

type McpOAuthClientValues = {
  connectionId: string;
  resourceUrl: string;
  capability: string;
  clientId?: string;
  clientSecret?: string;
  scope?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function canonicalResourceUrl(value: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new ApiError(400, "mcp_oauth_resource_invalid", "MCP resource URL is invalid");
  }
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["127.0.0.1", "localhost", "::1"].includes(url.hostname))) {
    throw new ApiError(400, "mcp_oauth_resource_invalid", "MCP OAuth requires HTTPS, except for local loopback servers");
  }
  url.hash = "";
  return url.toString();
}

function connectionId(resourceUrl: string): string {
  return `mcp:${createHash("sha256").update(resourceUrl).digest("base64url")}`;
}

function consumerId(id: string): string {
  return authorizationConsumerId("mcp", id);
}

function oauthConfig(config: Record<string, unknown>): Record<string, unknown> {
  return isRecord(config.oauth) ? config.oauth : {};
}

function customFetch(fetcher: ProviderFetch) {
  return {
    [oauth.customFetch]: (url: string, init: RequestInit) => fetcher(url, init),
  };
}

function clientAuthentication(client: oauth.Client): oauth.ClientAuth {
  const secret = stringValue(client.client_secret);
  if (!secret) return oauth.None();
  return client.token_endpoint_auth_method === "client_secret_basic"
    ? oauth.ClientSecretBasic(secret)
    : oauth.ClientSecretPost(secret);
}

async function readClientValues(config: ServerConfig, resourceUrl: string): Promise<McpOAuthClientValues | null> {
  const values = await (await authorizationVault(config)).readCredentialForAccount({
    connectionId: connectionId(resourceUrl),
    accountId: ACCOUNT_ID,
    methodId: CLIENT_METHOD_ID,
    methodFingerprint: CLIENT_FINGERPRINT,
  });
  if (!values?.resourceUrl || !values.capability) return null;
  return {
    connectionId: connectionId(resourceUrl),
    resourceUrl: values.resourceUrl,
    capability: values.capability,
    ...(values.clientId ? { clientId: values.clientId } : {}),
    ...(values.clientSecret ? { clientSecret: values.clientSecret } : {}),
    ...(values.scope ? { scope: values.scope } : {}),
  };
}

async function saveClientValues(config: ServerConfig, source: Record<string, unknown>): Promise<McpOAuthClientValues> {
  const sourceUrl = canonicalResourceUrl(stringValue(source.url));
  const existing = await readClientValues(config, sourceUrl);
  const declared = oauthConfig(source);
  const values: McpOAuthClientValues = {
    connectionId: connectionId(sourceUrl),
    resourceUrl: sourceUrl,
    capability: existing?.capability ?? randomBytes(32).toString("base64url"),
    ...(stringValue(declared.clientId) ? { clientId: stringValue(declared.clientId) } : existing?.clientId ? { clientId: existing.clientId } : {}),
    ...(stringValue(declared.clientSecret) ? { clientSecret: stringValue(declared.clientSecret) } : existing?.clientSecret ? { clientSecret: existing.clientSecret } : {}),
    ...(stringValue(declared.scope) ? { scope: stringValue(declared.scope) } : existing?.scope ? { scope: existing.scope } : {}),
  };
  const id = values.connectionId;
  const vault = await authorizationVault(config);
  await vault.saveCredential({
    connectionId: id,
    accountId: ACCOUNT_ID,
    methodId: CLIENT_METHOD_ID,
    methodFingerprint: CLIENT_FINGERPRINT,
    values,
    secretFields: ["capability", ...(values.clientSecret ? ["clientSecret"] : [])],
  });
  await vault.setActiveAccount({
    consumerId: consumerId(id),
    connectionId: id,
    methodId: CLIENT_METHOD_ID,
    methodFingerprint: CLIENT_FINGERPRINT,
    accountId: ACCOUNT_ID,
  });
  const reusableToken = await vault.readCredentialForAccount({
    connectionId: id,
    accountId: ACCOUNT_ID,
    methodId: TOKEN_METHOD_ID,
    methodFingerprint: TOKEN_FINGERPRINT,
  });
  if (reusableToken?.accessToken) {
    await vault.setActiveAccount({
      consumerId: consumerId(id),
      connectionId: id,
      methodId: TOKEN_METHOD_ID,
      methodFingerprint: TOKEN_FINGERPRINT,
      accountId: ACCOUNT_ID,
    });
  }
  return values;
}

async function resourceMetadata(resourceUrl: URL, fetcher: ProviderFetch): Promise<oauth.ResourceServer> {
  try {
    const response = await oauth.resourceDiscoveryRequest(resourceUrl, customFetch(fetcher));
    return await oauth.processResourceDiscoveryResponse(resourceUrl, response);
  } catch {
    const challenge = await fetcher(resourceUrl, {
      method: "POST",
      headers: { accept: "application/json, text/event-stream", "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: "ipollowork-oauth-discovery", method: "initialize", params: {} }),
      redirect: "manual",
    });
    const header = challenge.headers.get("www-authenticate") ?? "";
    const metadataUrl = /resource_metadata="([^"]+)"/i.exec(header)?.[1];
    if (!metadataUrl) throw new ApiError(400, "mcp_oauth_metadata_missing", "MCP server did not publish OAuth protected-resource metadata");
    const response = await fetcher(metadataUrl, { headers: { accept: "application/json" }, redirect: "error" });
    return await oauth.processResourceDiscoveryResponse(resourceUrl, response);
  }
}

async function authorizationServerMetadata(issuer: URL, fetcher: ProviderFetch): Promise<oauth.AuthorizationServer> {
  try {
    const response = await oauth.discoveryRequest(issuer, { algorithm: "oauth2", ...customFetch(fetcher) });
    return await oauth.processDiscoveryResponse(issuer, response);
  } catch {
    const response = await oauth.discoveryRequest(issuer, { algorithm: "oidc", ...customFetch(fetcher) });
    return oauth.processDiscoveryResponse(issuer, response);
  }
}

async function authorizationServerForResource(resourceUrl: string, fetcher: ProviderFetch) {
  const resource = await resourceMetadata(new URL(resourceUrl), fetcher);
  const issuer = resource.authorization_servers?.[0];
  if (!issuer) throw new ApiError(400, "mcp_oauth_server_missing", "MCP server did not publish an OAuth authorization server");
  return { resource, authorizationServer: await authorizationServerMetadata(new URL(issuer), fetcher) };
}

async function resolveClient(input: {
  metadata: oauth.AuthorizationServer;
  values: McpOAuthClientValues;
  callbackUrl: string;
  fetcher: ProviderFetch;
}): Promise<oauth.Client> {
  if (input.values.clientId) {
    return {
      client_id: input.values.clientId,
      ...(input.values.clientSecret ? { client_secret: input.values.clientSecret, token_endpoint_auth_method: "client_secret_post" } : { token_endpoint_auth_method: "none" }),
    };
  }
  if (!input.metadata.registration_endpoint) {
    throw new ApiError(400, "mcp_oauth_client_registration_required", "This MCP server requires a client ID. Add it in Advanced OAuth settings.");
  }
  const response = await oauth.dynamicClientRegistrationRequest(input.metadata, {
    client_name: "iPolloWork",
    redirect_uris: [input.callbackUrl],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    token_endpoint_auth_method: "none",
  }, customFetch(input.fetcher));
  return oauth.processDynamicClientRegistrationResponse(response);
}

/** Host-owned media services use the same OAuth vault without exposing the MCP's tools to engines. */
export async function startMcpServiceAuthorization(input: {
  config: ServerConfig; resourceUrl: string; callbackUrl: string; fetcher?: ProviderFetch;
}) {
  const values = await saveClientValues(input.config, { url: input.resourceUrl });
  return startAuthorizationFlow({ ...input, workspaceId: "", name: "", service: true }, values);
}

async function startAuthorizationFlow(input: {
  config: ServerConfig; workspaceId: string; name: string; callbackUrl: string; fetcher?: ProviderFetch; service?: boolean;
}, values: McpOAuthClientValues) {
  const fetcher = input.fetcher ?? fetch;
  const resourceUrl = new URL(values.resourceUrl);
  const { resource, authorizationServer } = await authorizationServerForResource(resourceUrl.toString(), fetcher);
  if (!authorizationServer.authorization_endpoint || !authorizationServer.token_endpoint) {
    throw new ApiError(400, "mcp_oauth_server_invalid", "MCP authorization server metadata is incomplete");
  }
  const client = await resolveClient({ metadata: authorizationServer, values, callbackUrl: input.callbackUrl, fetcher });
  const state = oauth.generateRandomState();
  const verifier = oauth.generateRandomCodeVerifier();
  const challenge = await oauth.calculatePKCECodeChallenge(verifier);
  const authorizationUrl = new URL(authorizationServer.authorization_endpoint);
  authorizationUrl.searchParams.set("client_id", client.client_id);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("redirect_uri", input.callbackUrl);
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("code_challenge", challenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");
  authorizationUrl.searchParams.set("resource", values.resourceUrl);
  const scope = values.scope || resource.scopes_supported?.join(" ") || "";
  if (scope) authorizationUrl.searchParams.set("scope", scope);
  const expiresAt = Date.now() + FLOW_TTL_MS;
  await (await authorizationVault(input.config)).savePendingFlow({
    consumerId: consumerId(values.connectionId),
    connectionId: values.connectionId,
    accountId: ACCOUNT_ID,
    methodId: TOKEN_METHOD_ID,
    flowId: randomUUID(),
    state,
    privateData: {
      workspaceId: input.workspaceId,
      name: input.name,
      callbackUrl: input.callbackUrl,
      verifier,
      resourceUrl: values.resourceUrl,
      authorizationServer: JSON.stringify(authorizationServer),
      client: JSON.stringify(client),
      ...(input.service ? { expectedClientCapability: values.capability } : {}),
    },
    expiresAt,
  });
  return { authorizationUrl: authorizationUrl.toString(), expiresAt };
}

async function activeTokenForClient(config: ServerConfig, clientValues: McpOAuthClientValues, fetcher: ProviderFetch): Promise<Record<string, string>> {
  const id = clientValues.connectionId;
  const vault = await authorizationVault(config);
  const active = await vault.readActiveCredential({
    consumerId: consumerId(id),
    connectionId: id,
    methodId: TOKEN_METHOD_ID,
    methodFingerprint: TOKEN_FINGERPRINT,
  });
  if (!active?.values.accessToken) throw new ApiError(401, "mcp_authorization_required", "MCP authorization is required");
  const expiresAt = Number(active.values.expiresAt);
  if (Number.isFinite(expiresAt) && expiresAt <= Date.now() && !active.values.refreshToken) {
    throw new ApiError(401, "mcp_authorization_required", "MCP authorization has expired; sign in again");
  }
  if (!Number.isFinite(expiresAt) || expiresAt > Date.now() + 60_000 || !active.values.refreshToken) return active.values;
  const refreshKey = `${id}\0${active.accountId}`;
  const running = tokenRefreshes.get(refreshKey);
  if (running) return running;
  const refresh = (async () => {
    const authorizationServer = active.values.authorizationServer
      ? JSON.parse(active.values.authorizationServer) as oauth.AuthorizationServer
      : (await authorizationServerForResource(clientValues.resourceUrl, fetcher)).authorizationServer;
    const client = active.values.client ? JSON.parse(active.values.client) as oauth.Client : null;
    if (!client?.client_id) throw new ApiError(401, "mcp_authorization_required", "MCP authorization must be renewed");
    const response = await oauth.refreshTokenGrantRequest(
      authorizationServer,
      client,
      clientAuthentication(client),
      active.values.refreshToken,
      { additionalParameters: { resource: clientValues.resourceUrl }, ...customFetch(fetcher) },
    );
    const token = await oauth.processRefreshTokenResponse(authorizationServer, client, response);
    const refreshed = { ...active.values, ...tokenValues(token), authorizationServer: JSON.stringify(authorizationServer) };
    const current = await vault.readActiveCredential({ consumerId: consumerId(id), connectionId: id, methodId: TOKEN_METHOD_ID, methodFingerprint: TOKEN_FINGERPRINT });
    if (!current || current.values.accessToken !== active.values.accessToken) {
      throw new ApiError(401, "mcp_authorization_required", "MCP authorization changed during refresh; sign in again");
    }
    await vault.saveCredential({
      connectionId: id,
      accountId: active.accountId,
      methodId: TOKEN_METHOD_ID,
      methodFingerprint: TOKEN_FINGERPRINT,
      values: refreshed,
      secretFields: Object.keys(refreshed),
    });
    return refreshed;
  })();
  tokenRefreshes.set(refreshKey, refresh);
  try {
    return await refresh;
  } finally {
    tokenRefreshes.delete(refreshKey);
  }
}

export async function mcpServiceAuthorizationStatus(config: ServerConfig, resourceUrl: string) {
  const id = connectionId(canonicalResourceUrl(resourceUrl));
  const token = await (await authorizationVault(config)).readActiveCredential({ consumerId: consumerId(id), connectionId: id, methodId: TOKEN_METHOD_ID, methodFingerprint: TOKEN_FINGERPRINT });
  const expiresAt = Number(token?.values.expiresAt);
  const connected = Boolean(token?.values.accessToken && (!Number.isFinite(expiresAt) || expiresAt > Date.now() || token.values.refreshToken));
  return { connected, sessionId: connected ? token?.values.sessionId : undefined };
}

export async function revokeMcpServiceAuthorization(config: ServerConfig, resourceUrl: string): Promise<void> {
  const id = connectionId(canonicalResourceUrl(resourceUrl));
  const vault = await authorizationVault(config);
  await vault.deleteConsumer(consumerId(id));
  await vault.revokeCredential({ connectionId: id, accountId: ACCOUNT_ID, methodId: TOKEN_METHOD_ID });
  await vault.revokeCredential({ connectionId: id, accountId: ACCOUNT_ID, methodId: CLIENT_METHOD_ID });
}

export async function fetchMcpService(config: ServerConfig, resourceUrl: string, init: RequestInit, fetcher: ProviderFetch, expectedSessionId?: string, transportUrl = resourceUrl): Promise<Response> {
  const client = await readClientValues(config, canonicalResourceUrl(resourceUrl));
  if (!client) throw new ApiError(401, "mcp_authorization_required", "请先登录 HeyGen 订阅账户。");
  const resource = new URL(client.resourceUrl);
  const target = new URL(canonicalResourceUrl(transportUrl));
  // Some servers publish an OAuth resource without '/', but require it for HTTP transport.
  // Permit only that fixed path spelling difference; never follow redirects with credentials.
  if (target.origin !== resource.origin || target.pathname.replace(/\/$/, "") !== resource.pathname.replace(/\/$/, "") || target.search !== resource.search) {
    throw new ApiError(400, "mcp_transport_url_invalid", "MCP transport must match its authorized resource");
  }
  const token = await activeTokenForClient(config, client, fetcher);
  if (expectedSessionId && token.sessionId !== expectedSessionId) throw new ApiError(401, "mcp_authorization_changed", "此任务的 HeyGen 授权已更换，请使用提交任务时的账户恢复查询。");
  const headers = new Headers(init.headers);
  headers.delete("x-api-key");
  headers.set("authorization", `Bearer ${token.accessToken}`);
  const response = await fetcher(target, { ...init, headers, redirect: "error" });
  if (response.status === 401) {
    const vault = await authorizationVault(config);
    const current = await vault.readActiveCredential({ consumerId: consumerId(client.connectionId), connectionId: client.connectionId, methodId: TOKEN_METHOD_ID, methodFingerprint: TOKEN_FINGERPRINT });
    if (current?.values.accessToken === token.accessToken) await vault.revokeCredential({ connectionId: client.connectionId, accountId: ACCOUNT_ID, methodId: TOKEN_METHOD_ID });
  }
  return response;
}
