window.__ModuleLoader__.load({
	id: "deepseek-ivideo",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let react_jsx_runtime = require("react/jsx-runtime");
		function isRecord(value) {
			return Boolean(value) && typeof value === "object" && !Array.isArray(value);
		}
		function optionalString(value) {
			return typeof value === "string" && value.trim() ? value.trim() : "";
		}
		function normalizeProjectFile(value) {
			const normalized = (optionalString(value) || "index.html").replace(/\\/g, "/");
			if (normalized.startsWith("/") || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(normalized) || normalized.includes("\0") || normalized.includes("?") || normalized.includes("#")) return null;
			const segments = normalized.split("/");
			if (segments.some((segment) => segment === "..")) return null;
			return segments.filter((segment) => segment && segment !== ".").join("/") || null;
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
		//#region ../../../packages/types/src/hyperframes-project.ts
		function videoProjectId(sessionId) {
			return sessionId.replace(/[^a-zA-Z0-9_-]/g, "_");
		}
		function videoProjectDirectory(sessionId) {
			return `video/${videoProjectId(sessionId)}`;
		}
		//#endregion
		//#region src/client.tsx
		const inject = ["slots"];
		function VideoView({ sessionId, useWorkspaces, inputActions }) {
			const iframeRef = react.useRef(null);
			const viewIdRef = react.useRef(`video-view-${crypto.randomUUID()}`);
			const workspace = useWorkspaces((state) => state.items.find((item) => item.sessionIds.includes(sessionId)));
			const projectDirectory = videoProjectDirectory(String(sessionId));
			react.useEffect(() => {
				const receive = (event) => {
					if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
					if (!isVideoStudioHostMessage(event.data)) return;
					inputActions.setDraft(event.data.type === "ask-video-ai" ? videoStudioDocumentPrompt(projectDirectory) : videoStudioSelectionPrompt(projectDirectory, event.data.selection));
				};
				window.addEventListener("message", receive);
				return () => window.removeEventListener("message", receive);
			}, [inputActions, projectDirectory]);
			if (!workspace) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: emptyStyle,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "iVideo needs a workspace" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Open this conversation from a registered DeepSeek Harness workspace." })]
			});
			const query = new URLSearchParams({
				workspaceId: String(workspace.workspaceId),
				sessionId: String(sessionId),
				viewId: viewIdRef.current
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("section", {
				style: shellStyle,
				"aria-label": "iVideo by iPolloWork",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("iframe", {
					ref: iframeRef,
					title: "iVideo by iPolloWork",
					src: `/ipollowork-video/studio/?${query.toString()}`,
					style: frameStyle,
					sandbox: "allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
				})
			});
		}
		function apply(ctx) {
			ctx.slots.inject("conversation.view", () => ctx.slots.register({
				name: "conversation.view",
				id: "ipollowork-video-studio",
				order: 22,
				label: "Video"
			}, VideoView));
		}
		const shellStyle = {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			minHeight: 0,
			background: "#0b0d12"
		};
		const frameStyle = {
			flex: 1,
			width: "100%",
			minHeight: 0,
			border: 0,
			background: "#0b0d12"
		};
		const emptyStyle = {
			display: "grid",
			placeContent: "center",
			gap: 8,
			height: "100%",
			padding: 32,
			color: "#70757f",
			textAlign: "center"
		};
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map