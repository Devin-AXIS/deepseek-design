/** Credential-free configuration shared by Host services and native Client settings. */
export interface ResourceConfig {
  componentApi: string;
  assetApi: string;
  componentCredential: string;
  assetCredential: string;
  requestTimeoutMs: number;
  maxResourceBytes: number;
}
export interface ServiceConfig {
  maxLocalMediaBytes: number;
  serviceCredentials: Record<string, string>;
  enhancementModelsPath: string;
  ffmpegPath: string;
  ffprobePath: string;
}

import type { Volatile } from "@deepseek-ai/cordis";
/** DSH retains editable configuration as stable references. */
export type StudioHostConfig = {
  [K in keyof (ResourceConfig & ServiceConfig)]: K extends
    "requestTimeoutMs" | "maxResourceBytes" | "maxLocalMediaBytes"
    ? (ResourceConfig & ServiceConfig)[K]
    : Volatile<(ResourceConfig & ServiceConfig)[K]>;
};
/** Resolve each editable value when the owning operation reads it. */
export function resolveStudioConfig(
  config: StudioHostConfig,
): ResourceConfig & ServiceConfig {
  return {
    get componentApi() {
      return config.componentApi.get();
    },
    get assetApi() {
      return config.assetApi.get();
    },
    get componentCredential() {
      return config.componentCredential.get();
    },
    get assetCredential() {
      return config.assetCredential.get();
    },
    maxLocalMediaBytes: config.maxLocalMediaBytes,
    requestTimeoutMs: config.requestTimeoutMs,
    maxResourceBytes: config.maxResourceBytes,
    get serviceCredentials() {
      return { ...config.serviceCredentials.get() };
    },
    get enhancementModelsPath() {
      return config.enhancementModelsPath.get();
    },
    get ffmpegPath() {
      return config.ffmpegPath.get();
    },
    get ffprobePath() {
      return config.ffprobePath.get();
    },
  };
}
