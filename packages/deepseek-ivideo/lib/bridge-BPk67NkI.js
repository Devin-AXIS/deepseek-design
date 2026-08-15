//#region ../../../packages/video-studio/src/bridge.ts
const VIDEO_STUDIO_HOST_CHANNEL = "ipollowork-video-studio-host-v1";
function isRecord(value) {
	return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function optionalString(value) {
	return typeof value === "string" && value.trim() ? value.trim() : "";
}
function normalizedStyles(value) {
	if (!isRecord(value)) return {};
	const styles = {};
	for (const [name, style] of Object.entries(value).slice(0, 80)) if (name.length <= 100 && typeof style === "string" && style.trim()) styles[name] = style.trim().slice(0, 240);
	return styles;
}
function attributeSelector(name, value) {
	return `[${name}="${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"]`;
}
function normalizeProjectFile(value) {
	const normalized = (optionalString(value) || "index.html").replace(/\\/g, "/");
	if (normalized.startsWith("/") || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(normalized) || normalized.includes("\0") || normalized.includes("?") || normalized.includes("#")) return null;
	const segments = normalized.split("/");
	if (segments.some((segment) => segment === "..")) return null;
	return segments.filter((segment) => segment && segment !== ".").join("/") || null;
}
function resolveVideoAiSelectionTarget(value) {
	if (!isRecord(value)) return null;
	const file = normalizeProjectFile(value.file);
	if (!file) return null;
	const hfId = optionalString(value.hfId);
	const id = optionalString(value.id);
	const selector = optionalString(value.selector);
	const locator = hfId ? attributeSelector("data-hf-id", hfId) : id ? attributeSelector("id", id) : selector;
	return locator ? {
		file,
		locator
	} : null;
}
function parseHyperframesAskAiMessage(value) {
	if (!isRecord(value) || value.type !== "ipollowork:hyperframes:ask-ai-selection") return null;
	const target = resolveVideoAiSelectionTarget(value.target);
	if (!target) return null;
	return {
		...target,
		tag: optionalString(value.tag).toLowerCase() || "element",
		text: optionalString(value.text).slice(0, 2e3),
		src: optionalString(value.src).slice(0, 1e3),
		alt: optionalString(value.alt).slice(0, 1e3),
		styles: normalizedStyles(value.styles)
	};
}
/** Converts HyperFrames' server-owned selection snapshot into the host bridge contract. */
function parseHyperframesSelectionSnapshot(value) {
	if (!isRecord(value) || !isRecord(value.target)) return null;
	const target = resolveVideoAiSelectionTarget({
		file: value.sourceFile || value.compositionPath,
		hfId: value.target.hfId,
		id: value.target.id,
		selector: value.target.selector
	});
	if (!target) return null;
	const attributes = isRecord(value.dataAttributes) ? value.dataAttributes : {};
	return {
		...target,
		tag: optionalString(value.tagName).toLowerCase() || "element",
		text: optionalString(value.textContent).slice(0, 2e3),
		src: optionalString(attributes.src).slice(0, 1e3),
		alt: optionalString(attributes.alt).slice(0, 1e3),
		styles: {
			...normalizedStyles(value.computedStyles),
			...normalizedStyles(value.inlineStyles)
		}
	};
}
function isVideoStudioHostMessage(value) {
	if (!isRecord(value) || value.channel !== "ipollowork-video-studio-host-v1") return false;
	if (value.type === "ask-video-ai") return true;
	return value.type === "ask-ai-selection" && parseVideoStudioSelection(value.selection) !== null;
}
function parseVideoStudioSelection(value) {
	if (!isRecord(value)) return null;
	const file = normalizeProjectFile(value.file);
	const locator = optionalString(value.locator);
	const styles = isRecord(value.styles) ? value.styles : null;
	if (!file || !locator || !styles) return null;
	if (!Object.values(styles).every((entry) => typeof entry === "string")) return null;
	return {
		file,
		locator,
		tag: optionalString(value.tag).toLowerCase() || "element",
		text: optionalString(value.text).slice(0, 2e3),
		src: optionalString(value.src).slice(0, 1e3),
		alt: optionalString(value.alt).slice(0, 1e3),
		styles: Object.fromEntries(Object.entries(styles).map(([name, style]) => [name, String(style).slice(0, 240)]))
	};
}
function videoStudioDocumentPrompt(projectDirectory) {
	return [
		"Help me improve the current iPolloWork HyperFrames video.",
		`Project: ${projectDirectory}`,
		`Read ${projectDirectory}/index.html, design-tokens.css, manifest.json, and brief.json when present before editing.`,
		"Preserve the composition id, scene timing, editable hierarchy, and unrelated user edits.",
		"After editing, call ipollowork_video_validate for this workspace and session, fix every reported error, then stop.",
		"My requested change:"
	].join("\n");
}
function videoStudioSelectionPrompt(projectDirectory, selection) {
	const details = [
		selection.text ? `Text: ${selection.text.slice(0, 240)}` : "",
		selection.alt ? `Alt: ${selection.alt.slice(0, 240)}` : "",
		selection.src ? `Source: ${selection.src.slice(0, 240)}` : "",
		Object.keys(selection.styles).length ? `Computed styles: ${JSON.stringify(selection.styles)}` : ""
	].filter(Boolean);
	return [
		"Help me edit the selected element in iPolloWork iVideo.",
		`File: ${projectDirectory}/${selection.file}`,
		`Element: <${selection.tag}>`,
		`CSS locator: ${selection.locator}`,
		...details,
		"Read the current file before editing. Change only this element unless I explicitly request a wider redesign.",
		"Preserve the composition timing, data-hf-id values, unrelated elements, and linked design tokens.",
		"After editing, call ipollowork_video_validate for this workspace and session.",
		"My requested change:"
	].join("\n");
}
//#endregion
export { resolveVideoAiSelectionTarget as a, parseHyperframesSelectionSnapshot as i, isVideoStudioHostMessage as n, videoStudioDocumentPrompt as o, parseHyperframesAskAiMessage as r, videoStudioSelectionPrompt as s, VIDEO_STUDIO_HOST_CHANNEL as t };
