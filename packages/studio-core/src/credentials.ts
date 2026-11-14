/** Resolve native DSH credential references without exposing values to editor code. */
import type { Context } from "@deepseek-ai/cordis";
import {
  credentialRef,
  parseCredentialKey,
  type CredentialRecord,
} from "@deepseek-ai/dsh-credentials";
import { z } from "zod";
import type { ServiceConfig } from "./config-types.ts";
import {
  studioConnections,
  type StudioConnectionDefinition,
} from "./connection-definitions.ts";
import type { ConnectionStatus } from "./connection-protocol.ts";
import { StudioHttpError } from "./http.ts";

/** Shared native references remain available when either editor is removed. */
export function studioConnectionRef(id: string) {
  return credentialRef(
    id === "resources"
      ? "IPOLLO_RESOURCES_API_KEY"
      : "IPOLLO_STUDIO_" + id.replaceAll("-", "_").toUpperCase(),
  );
}
/** Resolve the managed values before a released profile's credential reference. */
export async function readServiceCredential(
  ctx: Context,
  id: string,
  reference?: string,
): Promise<CredentialRecord | undefined> {
  const managed = await ctx.credentials.resolve(studioConnectionRef(id));
  if (managed) {
    let value: unknown;
    try {
      value = JSON.parse(managed.value);
    } catch {
      throw new StudioHttpError(
        503,
        "The stored service credential is invalid.",
      );
    }
    const parsed = z.record(z.string(), z.string()).safeParse(value);
    if (!parsed.success)
      throw new StudioHttpError(
        503,
        "The stored service credential is invalid.",
      );
    return { kind: "grant", payload: parsed.data };
  }
  return reference ? readStudioCredential(ctx, reference) : undefined;
}
async function connectionValues(
  ctx: Context,
  definition: StudioConnectionDefinition,
  config: Partial<ServiceConfig>,
): Promise<Record<string, string>> {
  if (definition.id === "resources") {
    const value = await ctx.credentials.resolve(
      studioConnectionRef("resources"),
    );
    return value ? { token: value.value } : {};
  }
  const record = await readServiceCredential(
    ctx,
    definition.id,
    config.serviceCredentials?.[definition.id],
  );
  if (!record) return {};
  if (record.kind === "grant")
    return z.record(z.string(), z.string()).parse(record.payload);
  return {
    ...record.env,
    ...(record.key ? { [definition.fields[0]!.id]: record.key } : {}),
  };
}
/** Read presence and write capability without returning stored field values. */
export async function describeStudioConnection(
  ctx: Context,
  id: string,
  config: Partial<ServiceConfig>,
): Promise<ConnectionStatus> {
  const definition = studioConnections.find((item) => item.id === id);
  if (!definition)
    throw new StudioHttpError(404, "Unknown service connection.");
  const values = await connectionValues(ctx, definition, config);
  return {
    configured: definition.fields
      .filter((field) => field.required)
      .every((field) => Boolean(values[field.id])),
    writable: (await ctx.credentials.describe(studioConnectionRef(id)))
      .writable,
    fields: Object.fromEntries(
      definition.fields.map((field) => [field.id, Boolean(values[field.id])]),
    ),
  };
}
/** Validate and save one complete service group atomically through DSH credentials. */
export async function saveStudioConnection(
  ctx: Context,
  id: string,
  raw: unknown,
  config: Partial<ServiceConfig>,
): Promise<ConnectionStatus> {
  const definition = studioConnections.find((item) => item.id === id);
  if (!definition)
    throw new StudioHttpError(404, "Unknown service connection.");
  const patch = z.record(z.string(), z.string().max(8192)).parse(raw);
  if (
    Object.keys(patch).some(
      (key) => !definition.fields.some((field) => field.id === key),
    ) ||
    Object.values(patch).some((value) => /[\r\n]/.test(value))
  )
    throw new StudioHttpError(400, "Check the service fields.");
  if (!(await ctx.credentials.describe(studioConnectionRef(id))).writable)
    throw new StudioHttpError(403, "This credential is read-only.");
  const current = await connectionValues(ctx, definition, config);
  const values = {
    ...current,
    ...Object.fromEntries(
      Object.entries(patch)
        .filter(([, value]) => value.trim())
        .map(([key, value]) => [key, value.trim()]),
    ),
  };
  if (definition.fields.some((field) => field.required && !values[field.id]))
    throw new StudioHttpError(400, "Complete the required service fields.");
  await ctx.credentials.set(
    studioConnectionRef(id),
    id === "resources" ? values.token! : JSON.stringify(values),
  );
  return describeStudioConnection(ctx, id, config);
}
export function validateStudioCredential(reference: string): void {
  if (reference.includes("/")) parseCredentialKey(reference);
  else credentialRef(reference);
}
export async function readStudioCredential(
  ctx: Context,
  reference: string,
): Promise<CredentialRecord | undefined> {
  if (reference.includes("/"))
    return ctx.credentials.readRecord(parseCredentialKey(reference));
  const value = await ctx.credentials.resolve(credentialRef(reference));
  return value ? { kind: "api-key", key: value.value } : undefined;
}
