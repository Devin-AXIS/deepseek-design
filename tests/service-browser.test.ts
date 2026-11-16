import test from 'node:test';
import assert from 'node:assert/strict';
import {runStudioService,serviceBrowser} from '../packages/studio-core/src/service-runtime.ts';
test('standalone previews retain local execution and cloud previews acquire only their service lease',async()=>{
 assert.equal(await serviceBrowser(),undefined);
 let calls=0,released=0;
 const binding={official:async()=>true,fetch:async()=>new Response(),browser:async()=>{calls++;return{endpoint:'wss://sandbox.example/ws/automation',headers:{},release:()=>{released++;}};}};
 await runStudioService({},undefined,async()=>{const lease=await serviceBrowser();assert.equal(lease?.endpoint,'wss://sandbox.example/ws/automation');lease?.release();},binding);
 assert.equal(calls,1);assert.equal(released,1);assert.equal(await serviceBrowser(),undefined);
});
test('a remote browser error does not select local execution',async()=>{
 const binding={official:async()=>true,fetch:async()=>new Response(),browser:async()=>{throw new Error('remote unavailable');}};
 await assert.rejects(runStudioService({},undefined,()=>serviceBrowser(),binding),/remote unavailable/);
});
