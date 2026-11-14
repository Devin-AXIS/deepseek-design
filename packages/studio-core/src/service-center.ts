/** Optional suite capability; standalone installations keep native credential resolution. */
export interface ServiceBinding {
  publicationStatus?():Promise<boolean>;
  publish?(input:{workspaceId:string;entry:string;files:{path:string;bytes:number;open():ReadableStream<Uint8Array>}[]}):Promise<{url:string}>;
  official(provider:string,hasOwnKey?:boolean):Promise<boolean>;
  fetch(input:string|URL|Request,init?:RequestInit):Promise<Response>;
}
export interface ServiceCenter { bind(signal?:AbortSignal):Promise<ServiceBinding> }
