/** Optional suite capability; standalone installations keep native credential resolution. */
export interface BrowserLease {
  endpoint:string;
  headers:Record<string,string>;
  release():void;
}
export interface ServiceBinding {
  /** A cloud binding never falls back to launching a browser on the host. */
  browser?(signal?:AbortSignal):Promise<BrowserLease>;
  publicationStatus?():Promise<boolean>;
  publicationInfo?(workspaceId:string,entry:string):Promise<{url:string|null}>;
  publish?(input:{workspaceId:string;entry:string;files:{path:string;bytes:number;open():ReadableStream<Uint8Array>}[]}):Promise<{url:string}>;
  official(provider:string,hasOwnKey?:boolean):Promise<boolean>;
  fetch(input:string|URL|Request,init?:RequestInit):Promise<Response>;
}
export interface ServiceCenter { bind(signal?:AbortSignal):Promise<ServiceBinding> }
