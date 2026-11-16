/** Design uses image, document and publishing services; video work belongs to Video Studio. */
export function designServiceAllowed(extensionId: string, action: string): boolean {
  if (extensionId === "video-generation" || extensionId === "video-enhancement") return false;
  return !action.startsWith("video_") && !action.startsWith("video-") && action !== "digital_human_generate";
}
