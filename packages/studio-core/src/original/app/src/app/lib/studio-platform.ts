/** Browser operations available inside a native DSH Studio surface. */
export {
  getResolvedThemeMode,
  subscribeToTheme,
} from "../../../../../native-theme.ts";

const platform = {
  openLink(url: string) {
    if (/^(mailto|tel):/i.test(url.trim())) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  },
};

/** Studio links use the host browser and do not require the old application provider. */
export function useStudioPlatform() {
  return platform;
}

/** Select a local image using the browser's user-authorized file picker. */
export function pickStudioImage(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";
    input.hidden = true;
    document.body.append(input);
    const finish = (value: string | null) => {
      input.remove();
      resolve(value);
    };
    input.addEventListener("cancel", () => finish(null), { once: true });
    input.addEventListener(
      "change",
      () => {
        const file = input.files?.[0];
        if (!file) {
          finish(null);
          return;
        }
        const reader = new FileReader();
        reader.onload = () =>
          finish(typeof reader.result === "string" ? reader.result : null);
        reader.onerror = () => {
          input.remove();
          reject(
            reader.error ?? new Error("Could not read the selected image."),
          );
        };
        reader.readAsDataURL(file);
      },
      { once: true },
    );
    input.click();
  });
}

/** Read installed font family names when the browser grants local-font access. */
export async function listStudioFontFamilies(): Promise<string[]> {
  const browser = window as Window & {
    queryLocalFonts?: () => Promise<ReadonlyArray<{ family: string }>>;
  };
  if (!browser.queryLocalFonts) return [];
  const fonts = await browser.queryLocalFonts();
  return [...new Set(fonts.map((font) => font.family).filter(Boolean))].sort();
}
