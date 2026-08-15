//#region src/preview-owner-guard.ts
/**
* Runs inside plugin-owned HyperFrames preview processes. The IPC channel is
* held by the Harness host; if that host disappears, only this detached process
* group is stopped so previews cannot survive as orphans.
*/
process.once("disconnect", () => {
	if (process.platform !== "win32") try {
		process.kill(-process.pid, "SIGTERM");
		return;
	} catch {}
	process.exit(0);
});
//#endregion
export {};
