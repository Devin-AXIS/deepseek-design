/** Resolve native DSH credential references without exposing values to editor code. */
import type { Context } from "@deepseek-ai/cordis";
import {
  credentialRef,
  parseCredentialKey,
  type CredentialRecord,
} from "@deepseek-ai/dsh-credentials";
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
