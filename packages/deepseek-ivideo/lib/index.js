import { S as templateManifestV1Schema, _ as stringField, a as streamTemplateCover, b as workspaceRoot, c as withOperationLock, d as handleStudioStatic, f as readStudioText, g as sendJson, i as loadBundledTemplates, l as StudioHttpError, m as requireStudioToken, o as templateById, p as requestObject, r as applyBundledTemplate, s as templateCatalog, t as VideoRuntimeManager, u as field, x as writeStudioText } from "./runtime-jK3NizbO.js";
import { a as videoProjectDirectory, o as videoProjectId } from "./project-hsq23dNb.js";
import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineTool } from "@deepseek-ai/dsh-tools";
//#region src/index.ts
const ROUTE_ROOT = "/ipollowork-video";
const STUDIO_TITLE = "iVideo";
const TOKEN_HEADER = "x-ipollowork-video-token";
const TOKEN_PLACEHOLDER = "__IPOLLOWORK_VIDEO_STUDIO_TOKEN_VALUE__";
const SESSION_ID = /^[A-Za-z0-9_-]{1,128}$/;
const MAX_TEXT_BYTES = 4 * 1024 * 1024;
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function sessionId(value) {
	if (!SESSION_ID.test(value)) throw new StudioHttpError(400, "Invalid iVideo session id.");
	return value;
}
function allowsVideoTemplate(manifest) {
	return manifest.surface === "video" && manifest.category === "video";
}
function bundledTemplates(runtime) {
	runtime.templatesPromise ??= loadBundledTemplates(runtime.templatesRoot, allowsVideoTemplate).catch((error) => {
		runtime.templatesPromise = null;
		throw error;
	});
	return runtime.templatesPromise;
}
async function session(runtime, root, rawSessionId, viewId) {
	return runtime.manager.start({
		workspaceRoot: root,
		sessionId: sessionId(rawSessionId),
		viewId
	});
}
async function applyTemplate(input) {
	const id = sessionId(input.sessionId);
	const template = templateById(await bundledTemplates(input.runtime), input.templateId);
	const operationKey = `${input.workspaceRoot}:${videoProjectId(id)}`;
	return withOperationLock(input.runtime.switches, operationKey, async () => {
		const projectsRoot = dirname((await input.runtime.manager.start({
			workspaceRoot: input.workspaceRoot,
			sessionId: id
		})).projectPath);
		await input.runtime.manager.stop({
			workspaceRoot: input.workspaceRoot,
			sessionId: id
		});
		try {
			return await applyBundledTemplate({
				operations: input.runtime.operations,
				operationKey,
				template,
				projectsRoot,
				projectId: videoProjectId(id),
				prepareStaged: async (directory) => {
					await writeFile(resolve(directory, "brief.json"), `${JSON.stringify({
						title: template.manifest.title,
						templateId: template.manifest.id,
						createdBy: "deepseek-harness"
					}, null, 2)}\n`, "utf8");
				},
				validateInstalled: async () => {
					if (!allowsVideoTemplate(templateManifestV1Schema.parse(JSON.parse(await readFile(resolve(projectsRoot, videoProjectId(id), "manifest.json"), "utf8"))))) throw new StudioHttpError(409, "The installed template is not an iVideo template.");
					return input.runtime.manager.start({
						workspaceRoot: input.workspaceRoot,
						sessionId: id,
						viewId: input.viewId
					});
				}
			});
		} catch (error) {
			await input.runtime.manager.start({
				workspaceRoot: input.workspaceRoot,
				sessionId: id,
				viewId: input.viewId
			}).catch(() => void 0);
			throw error;
		}
	});
}
async function handleApi(runtime, ctx, req, res, url) {
	requireStudioToken(req, TOKEN_HEADER, runtime.token, STUDIO_TITLE);
	const action = url.pathname.slice(`${ROUTE_ROOT}/api`.length);
	if (req.method === "GET" && action === "/session") {
		const workspaceId = url.searchParams.get("workspaceId")?.trim();
		const rawSessionId = url.searchParams.get("sessionId")?.trim();
		if (!workspaceId || !rawSessionId) throw new StudioHttpError(400, "Missing workspaceId or sessionId.");
		sendJson(res, 200, await session(runtime, workspaceRoot(ctx, workspaceId), rawSessionId, url.searchParams.get("viewId")?.trim()));
		return;
	}
	if (req.method === "GET" && action === "/file") {
		const workspaceId = url.searchParams.get("workspaceId")?.trim();
		const rawSessionId = url.searchParams.get("sessionId")?.trim();
		const path = url.searchParams.get("path")?.trim();
		if (!workspaceId || !rawSessionId || !path) throw new StudioHttpError(400, "Missing workspaceId, sessionId, or path.");
		const id = sessionId(rawSessionId);
		sendJson(res, 200, await readStudioText({
			root: workspaceRoot(ctx, workspaceId),
			requested: path,
			prefix: videoProjectDirectory(id),
			studioTitle: STUDIO_TITLE,
			maxBytes: MAX_TEXT_BYTES
		}));
		return;
	}
	if (req.method === "POST" && action === "/file") {
		const body = await requestObject(req);
		const bodyWorkspaceId = stringField(field(body, "workspaceId"), "workspaceId");
		const id = sessionId(stringField(field(body, "sessionId"), "sessionId"));
		const content = field(body, "content");
		if (typeof content !== "string") throw new StudioHttpError(400, "Missing content.");
		sendJson(res, 200, await writeStudioText({
			root: workspaceRoot(ctx, bodyWorkspaceId),
			requested: stringField(field(body, "path"), "path"),
			prefix: videoProjectDirectory(id),
			studioTitle: STUDIO_TITLE,
			content,
			maxBytes: MAX_TEXT_BYTES,
			baseUpdatedAt: typeof field(body, "baseUpdatedAt") === "number" ? Number(field(body, "baseUpdatedAt")) : void 0,
			force: field(body, "force") === true
		}));
		return;
	}
	if (req.method === "GET" && action === "/templates") {
		const workspaceId = url.searchParams.get("workspaceId")?.trim();
		if (!workspaceId) throw new StudioHttpError(400, "Missing workspaceId.");
		workspaceRoot(ctx, workspaceId);
		sendJson(res, 200, templateCatalog(await bundledTemplates(runtime)));
		return;
	}
	if (req.method === "GET" && action === "/template-cover") {
		const workspaceId = url.searchParams.get("workspaceId")?.trim();
		const templateId = url.searchParams.get("templateId")?.trim();
		if (!workspaceId || !templateId) throw new StudioHttpError(400, "Missing workspaceId or templateId.");
		workspaceRoot(ctx, workspaceId);
		await streamTemplateCover(res, templateById(await bundledTemplates(runtime), templateId));
		return;
	}
	if (req.method === "POST" && action === "/template") {
		const body = await requestObject(req);
		sendJson(res, 200, await applyTemplate({
			runtime,
			workspaceRoot: workspaceRoot(ctx, stringField(field(body, "workspaceId"), "workspaceId")),
			sessionId: stringField(field(body, "sessionId"), "sessionId"),
			templateId: stringField(field(body, "templateId"), "templateId"),
			viewId: typeof field(body, "viewId") === "string" ? String(field(body, "viewId")).trim() : void 0
		}));
		return;
	}
	if (req.method === "POST" && action === "/release") {
		const body = await requestObject(req);
		const bodyWorkspaceId = stringField(field(body, "workspaceId"), "workspaceId");
		await runtime.manager.release({
			workspaceRoot: workspaceRoot(ctx, bodyWorkspaceId),
			sessionId: sessionId(stringField(field(body, "sessionId"), "sessionId")),
			viewId: stringField(field(body, "viewId"), "viewId")
		});
		sendJson(res, 200, { ok: true });
		return;
	}
	throw new StudioHttpError(404, "Unknown iVideo API route.");
}
function validationTool(runtime, ctx) {
	return defineTool({
		name: "ipollowork_video_validate",
		description: "Validate the editable HyperFrames video belonging to one DeepSeek Harness workspace and conversation session.",
		parameters: {
			workspaceId: {
				type: "string",
				required: true,
				description: "DeepSeek Harness workspace id."
			},
			sessionId: {
				type: "string",
				required: true,
				description: "Conversation session id owning video/<sessionId>."
			}
		},
		output: {
			schema: {
				type: "object",
				additionalProperties: true
			},
			render: (_args, value) => [{
				type: "text",
				text: JSON.stringify(value, null, 2)
			}]
		},
		timeoutMs: 12e4,
		async execute(args, exec) {
			const root = workspaceRoot(ctx, args.workspaceId);
			const result = await runtime.manager.validate({
				workspaceRoot: root,
				sessionId: sessionId(args.sessionId),
				signal: exec.signal
			});
			return {
				ok: result.ok,
				exitCode: result.exitCode,
				report: result.report,
				output: result.output,
				project: videoProjectDirectory(args.sessionId)
			};
		}
	});
}
const runtime = {
	token: randomBytes(32).toString("base64url"),
	studioRoot: resolve(packageRoot, "studio/dist"),
	templatesRoot: resolve(packageRoot, "lib/templates"),
	templatesPromise: null,
	operations: /* @__PURE__ */ new Map(),
	switches: /* @__PURE__ */ new Map(),
	manager: new VideoRuntimeManager()
};
const inject = [
	"webServer",
	"workspaceRegistry",
	"tools"
];
function apply(ctx) {
	ctx.effect(() => ctx.webServer.register({
		kind: "prefix",
		path: ROUTE_ROOT,
		handler: async (req, res) => {
			try {
				const url = new URL(req.url ?? ROUTE_ROOT, "http://localhost");
				if (url.pathname.startsWith(`${ROUTE_ROOT}/api`)) await handleApi(runtime, ctx, req, res, url);
				else if (url.pathname === `${ROUTE_ROOT}/studio` || url.pathname.startsWith(`${ROUTE_ROOT}/studio/`)) await handleStudioStatic({
					routeRoot: ROUTE_ROOT,
					studioRoot: runtime.studioRoot,
					token: runtime.token,
					tokenPlaceholder: TOKEN_PLACEHOLDER,
					res,
					url
				});
				else throw new StudioHttpError(404, "iVideo route was not found.");
			} catch (error) {
				if (res.headersSent) {
					res.destroy(error instanceof Error ? error : void 0);
					return;
				}
				sendJson(res, error instanceof StudioHttpError ? error.status : 500, {
					ok: false,
					message: error instanceof Error ? error.message : "iVideo request failed."
				});
			}
		}
	}), "deepseek-ivideo: routes");
	ctx.effect(() => ctx.tools.register(validationTool(runtime, ctx)), "deepseek-ivideo: validation tool");
	ctx.effect(() => () => runtime.manager.dispose(), "deepseek-ivideo: runtime cleanup");
}
//#endregion
export { apply, inject };
