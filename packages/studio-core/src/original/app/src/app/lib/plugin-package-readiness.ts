import type { PluginEngineCompatibility } from "@ipollowork/types/plugins";

export function activePluginEngineCompatibility(item: {
  activeEngineId?: string;
  engineCompatibility?: readonly PluginEngineCompatibility[];
}): PluginEngineCompatibility | undefined {
  if (!item.activeEngineId) return undefined;
  return item.engineCompatibility?.find((entry) => entry.engineId === item.activeEngineId);
}
