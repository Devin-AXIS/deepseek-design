//#region ../../../packages/types/src/hyperframes-project.ts
const HYPERFRAMES_PORT_BASE = 3100;
const HYPERFRAMES_PORT_RANGE = 800;
function hyperframesStudioPort(sessionId) {
	let hash = 0;
	for (const character of sessionId) hash = hash * 31 + character.charCodeAt(0) >>> 0;
	return HYPERFRAMES_PORT_BASE + hash % HYPERFRAMES_PORT_RANGE;
}
function videoProjectId(sessionId) {
	return sessionId.replace(/[^a-zA-Z0-9_-]/g, "_");
}
function videoProjectDirectory(sessionId) {
	return `video/${videoProjectId(sessionId)}`;
}
//#endregion
//#region ../../../packages/video-studio/src/project.ts
const HYPERFRAMES_VERSION = "0.7.60";
function hyperframesStudioUrl(port = 3002, projectId = "video", locale, theme, reloadToken) {
	const routeParams = new URLSearchParams({
		v: "1",
		t: "0",
		tab: "design",
		rc: "1",
		tv: "1"
	});
	if (locale) routeParams.set("locale", locale);
	if (theme) routeParams.set("ipolloworkTheme", theme);
	const requestParams = new URLSearchParams();
	if (reloadToken != null) requestParams.set("ipwReload", String(reloadToken));
	return `http://localhost:${port}/${requestParams.size ? `?${requestParams.toString()}` : ""}#project/${encodeURIComponent(projectId)}?${routeParams.toString()}`;
}
function videoProjectEntryPath(sessionId) {
	return `${videoProjectDirectory(sessionId)}/index.html`;
}
//#endregion
export { videoProjectDirectory as a, hyperframesStudioPort as i, hyperframesStudioUrl as n, videoProjectId as o, videoProjectEntryPath as r, HYPERFRAMES_VERSION as t };
