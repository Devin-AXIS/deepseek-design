/** Read DSH's resolved theme without changing its DOM, saved preferences or native shell. */
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedThemeMode = "light" | "dark";
export const getResolvedThemeMode = (): ResolvedThemeMode =>
  document.body.hasAttribute("data-ds-dark-theme") ? "dark" : "light";
export const getInitialThemeMode = getResolvedThemeMode;
export function subscribeToTheme(listener: () => void) {
  const observer = new MutationObserver(listener);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-ds-dark-theme"],
  });
  return () => observer.disconnect();
}
