/*!
 * ONNX Runtime Web v1.10.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";var e={};if("object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node){var a=require("worker_threads"),t=a.parentPort;t.on("message",(function(e){onmessage({data:e})}));var r=require("fs");Object.assign(global,{self:global,require:require,Module:e,location:{href:__filename},Worker:a.Worker,importScripts:function(e){(0,eval)(r.readFileSync(e,"utf8"))},postMessage:function(e){t.postMessage(e)},performance:global.performance||{now:function(){return Date.now()}}})}var s=function(){var e=Array.prototype.slice.call(arguments).join(" ");console.error(e)};self.alert=function(){var a=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:a,threadId:e._pthread_self()})},e.instantiateWasm=function(a,t){var r=new WebAssembly.Instance(e.wasmModule,a);return t(r),e.wasmModule=null,r.exports},self.onmessage=function(a){try{if("load"===a.data.cmd){if(e.wasmModule=a.data.wasmModule,e.wasmMemory=a.data.wasmMemory,e.buffer=e.wasmMemory.buffer,e.ENVIRONMENT_IS_PTHREAD=!0,"string"==typeof a.data.urlOrBlob)importScripts(a.data.urlOrBlob);else{var t=URL.createObjectURL(a.data.urlOrBlob);importScripts(t),URL.revokeObjectURL(t)}ortWasmThreaded(e).then((function(a){e=a}))}else if("objectTransfer"===a.data.cmd)e.PThread.receiveObjectTransfer(a.data);else if("run"===a.data.cmd){e.__performance_now_clock_drift=performance.now()-a.data.time,e.__emscripten_thread_init(a.data.threadInfoStruct,0,0);var r=a.data.stackBase,o=a.data.stackBase+a.data.stackSize;e.establishStackSpace(o,r),e.PThread.receiveObjectTransfer(a.data),e.PThread.threadInit();try{var n=e.invokeEntryPoint(a.data.start_routine,a.data.arg);e.keepRuntimeAlive()?e.PThread.setExitStatus(n):e.PThread.threadExit(n)}catch(a){if("Canceled!"===a)e.PThread.threadCancel();else if("unwind"!=a){if(!(a instanceof e.ExitStatus))throw e.PThread.threadExit(-2),a;e.keepRuntimeAlive()||e.PThread.threadExit(a.status)}}}else"cancel"===a.data.cmd?e._pthread_self()&&e.PThread.threadCancel():"setimmediate"===a.data.target||("processThreadQueue"===a.data.cmd?e._pthread_self()&&e._emscripten_current_thread_process_queued_calls():(s("worker.js received unknown command "+a.data.cmd),s(a.data)))}catch(e){throw s("worker.js onmessage() captured an uncaught exception: "+e),e&&e.stack&&s(e.stack),e}};
