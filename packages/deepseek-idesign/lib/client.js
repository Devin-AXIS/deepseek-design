window.__ModuleLoader__.load({
	id: "deepseek-idesign",
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
		function isDesignStudioHostMessage(value) {
			if (!value || typeof value !== "object") return false;
			if (Reflect.get(value, "channel") !== "ipollowork-design-studio-host-v1") return false;
			if (Reflect.get(value, "type") !== "ask-ai") return false;
			const request = Reflect.get(value, "request");
			if (!request || typeof request !== "object") return false;
			const target = Reflect.get(request, "target");
			return typeof Reflect.get(request, "id") === "string" && typeof Reflect.get(request, "sessionId") === "string" && typeof Reflect.get(request, "workspaceId") === "string" && typeof Reflect.get(request, "filePath") === "string" && Boolean(target) && typeof target === "object" && typeof Reflect.get(target, "locator") === "string" && typeof Reflect.get(target, "label") === "string";
		}
		function designStudioAskAiPrompt(request) {
			const target = request.target;
			const summary = [
				target.text ? `Text: ${target.text.slice(0, 240)}` : "",
				target.alt ? `Alt: ${target.alt.slice(0, 240)}` : "",
				target.src ? `Source: ${target.src.slice(0, 240)}` : ""
			].filter(Boolean);
			return [
				"Help me edit the selected element in iPolloWork Design Studio.",
				`File: ${request.filePath}`,
				`Element: ${target.label}`,
				`CSS locator: ${target.locator}`,
				...summary,
				"Read the current file before editing. Change only this element unless I explicitly request a wider redesign, preserve unrelated structure and styles, and keep the linked design-tokens.css theme contract.",
				"My requested change:"
			].join("\n");
		}
		//#endregion
		//#region src/client.tsx
		const inject = ["slots"];
		function createDeepSeekDesignStudioClient(options) {
			function StudioView({ sessionId, useWorkspaces, inputActions }) {
				const iframeRef = react.useRef(null);
				const workspace = useWorkspaces((state) => state.items.find((item) => item.sessionIds.includes(sessionId)));
				react.useEffect(() => {
					const receive = (event) => {
						if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
						if (!isDesignStudioHostMessage(event.data)) return;
						inputActions.setDraft(designStudioAskAiPrompt(event.data.request));
					};
					window.addEventListener("message", receive);
					return () => window.removeEventListener("message", receive);
				}, [inputActions]);
				if (!workspace) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					style: emptyStyle,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [options.studioTitle, " needs a workspace"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "Open this conversation from a registered DeepSeek Harness workspace." })]
				});
				const query = new URLSearchParams({
					workspaceId: String(workspace.workspaceId),
					sessionId: String(sessionId)
				});
				const projectId = `${String(sessionId)}${options.projectSuffix ?? ""}`;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
					style: shellStyle,
					"aria-label": `iPolloWork ${options.studioTitle}`,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						style: headerStyle,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							style: eyebrowStyle,
							children: "iPolloWork"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
							style: titleStyle,
							children: options.studioTitle
						})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							style: buttonStyle,
							onClick: () => inputActions.setDraft([
								`Help me improve the current ${options.studioTitle} document.`,
								`Project: design/${projectId}`,
								"Read manifest.json, then read its entry file and linked design-tokens.css before editing.",
								"Preserve the existing structure unless I request a redesign.",
								"My requested change:"
							].join("\n")),
							children: "Ask AI"
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("iframe", {
						ref: iframeRef,
						title: `iPolloWork ${options.studioTitle}`,
						src: `${options.routeRoot}/studio/?${query.toString()}`,
						style: frameStyle,
						sandbox: "allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
					})]
				});
			}
			return function apply(ctx) {
				ctx.slots.inject("conversation.view", () => ctx.slots.register({
					name: "conversation.view",
					id: options.viewId,
					order: 20,
					label: options.label
				}, StudioView));
			};
		}
		const apply = createDeepSeekDesignStudioClient({
			routeRoot: "/ipollowork-design",
			viewId: "ipollowork-design-studio",
			label: "Design",
			studioTitle: "DeepSeek iDesign"
		});
		const shellStyle = {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "100%",
			minHeight: 0,
			background: "var(--color-background, #f6f7f9)"
		};
		const headerStyle = {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 16,
			minHeight: 62,
			padding: "10px 16px",
			borderBottom: "1px solid color-mix(in srgb, currentColor 12%, transparent)"
		};
		const eyebrowStyle = {
			color: "#70757f",
			fontSize: 10,
			fontWeight: 700,
			letterSpacing: "0.12em",
			textTransform: "uppercase"
		};
		const titleStyle = {
			fontSize: 14,
			lineHeight: 1.3
		};
		const buttonStyle = {
			border: "1px solid color-mix(in srgb, currentColor 14%, transparent)",
			borderRadius: 10,
			padding: "8px 13px",
			color: "inherit",
			background: "color-mix(in srgb, currentColor 6%, transparent)",
			font: "inherit",
			fontSize: 12,
			fontWeight: 650,
			cursor: "pointer"
		};
		const frameStyle = {
			flex: 1,
			width: "100%",
			minHeight: 0,
			border: 0,
			background: "#f6f7f9"
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
		exports.createDeepSeekDesignStudioClient = createDeepSeekDesignStudioClient;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map