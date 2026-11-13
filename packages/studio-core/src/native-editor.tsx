/** Original UI providers use DSH theme, locale and application actions. */
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./original/app/src/components/ui/tooltip.tsx";
import { Toaster } from "./original/app/src/components/ui/sonner.tsx";
import { StudioPortalContainer } from "./original/ui/src/react/portal-container.tsx";
import { getResolvedThemeMode, subscribeToTheme } from "./native-theme.ts";
import {
  currentLocale,
  setLocale,
  languageFromLocale,
} from "./original/app/src/i18n/index.ts";

/** Keep editor styles and overlay tokens local; overlays escape the sidebar's clipping at body level. */
export function NativeEditor({
  language,
  children,
  onOpenSettings,
}: {
  language: string;
  children: ReactNode;
  onOpenSettings: () => void;
}) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getResolvedThemeMode,
    getResolvedThemeMode,
  );
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => () => queryClient.clear(), [queryClient]);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const element = document.createElement("div");
    element.className = "ipw-studio-native";
    element.dataset.studioOverlay = "true";
    element.style.display = "contents";
    document.body.append(element);
    setPortal(element);
    return () => element.remove();
  }, []);
  useEffect(() => {
    if (portal) {
      portal.dataset.theme = theme;
      portal.classList.toggle("dark", theme === "dark");
    }
  }, [portal, theme]);
  useEffect(() => {
    const locale = languageFromLocale(language) ?? "en";
    if (currentLocale() !== locale) setLocale(locale);
  }, [language]);
  return (
    <div
      className={
        theme === "dark" ? "ipw-studio-native dark" : "ipw-studio-native"
      }
      data-theme={theme}
      data-studio-editor
      style={{ height: "100%", minHeight: 0, overflow: "hidden" }}
    >
      <QueryClientProvider client={queryClient}>
        <StudioPortalContainer.Provider value={portal}>
          <MemoryRouter>
            <SettingsNavigation onOpenSettings={onOpenSettings} />
            <TooltipProvider>
              {portal && children}
              <Toaster />
            </TooltipProvider>
          </MemoryRouter>
        </StudioPortalContainer.Provider>
      </QueryClientProvider>
    </div>
  );
}

/** Original settings links open the native plugin settings instead of an Apollo Work application route. */
function SettingsNavigation({
  onOpenSettings,
}: {
  onOpenSettings: () => void;
}) {
  const location = useLocation(),
    navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== "/") {
      onOpenSettings();
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate, onOpenSettings]);
  return null;
}
