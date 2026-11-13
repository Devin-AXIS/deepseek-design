/** Authorization values are provided by the native DSH credential adapter. */
import type { HeygenSubscriptionStatus } from "@ipollowork/types/video-generation";
export const AUTHORIZATION_SERVICE_IDS = [
  "openai-images",
  "fal-images",
  "aliyun-bailian",
  "volcengine-video",
  "runninghub-video",
  "heygen-video",
  "aliyun-oss",
  "wasabi",
  "storage-routing",
] as const;

export type AuthorizationServiceId = (typeof AUTHORIZATION_SERVICE_IDS)[number];

export type AuthorizationAccess = {
  read(serviceId: AuthorizationServiceId): Promise<Readonly<Record<string,string>>>;
  openAiBrowserSession?(): Promise<{accessToken:string;accountId?:string}|null>;
  heygenSubscription?(): Promise<HeygenSubscriptionStatus & {sessionId?:string}>;
};
