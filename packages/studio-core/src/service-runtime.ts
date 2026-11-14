/** Per-operation runtime paths and cancellation; no plugin changes process-wide environment variables. */
import type {ServiceBinding} from "./service-center.ts";
import { AsyncLocalStorage } from "node:async_hooks";
const operation = new AsyncLocalStorage<{
  environment: NodeJS.ProcessEnv;
  services?:ServiceBinding;
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
  services?:ServiceBinding,
): T {
  return operation.run({ environment, signal, services: services ?? operation.getStore()?.services }, run);
}

/** Route only provider calls selected by the host service center. */
export function serviceRequest(input:string|URL|Request,init?:RequestInit):Promise<Response>{
  return operation.getStore()?.services?.fetch(input,init) ?? fetch(input,init);
}
export async function officialService(provider:string,hasOwnKey=false):Promise<boolean>{return await operation.getStore()?.services?.official(provider,hasOwnKey)??false;}
