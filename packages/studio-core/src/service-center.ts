/** Optional suite capability; standalone installations keep native credential resolution. */
export interface ServiceBinding {
  official(provider:string,hasOwnKey?:boolean):Promise<boolean>;
  fetch(input:string|URL|Request,init?:RequestInit):Promise<Response>;
}
export interface ServiceCenter { bind(signal?:AbortSignal):Promise<ServiceBinding> }
