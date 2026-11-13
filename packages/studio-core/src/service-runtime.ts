/** Per-operation runtime paths and cancellation; no plugin changes process-wide environment variables. */
import { AsyncLocalStorage } from "node:async_hooks";
const operation = new AsyncLocalStorage<{
  environment: NodeJS.ProcessEnv;
  signal?: AbortSignal;
}>();
export function serviceEnvironment(): NodeJS.ProcessEnv {
  return operation.getStore()?.environment ?? process.env;
}
export function serviceSignal(): AbortSignal | undefined {
  return operation.getStore()?.signal;
}
export function runStudioService<T>(
  environment: NodeJS.ProcessEnv,
  signal: AbortSignal | undefined,
  run: () => T,
): T {
  return operation.run({ environment, signal }, run);
}
