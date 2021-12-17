"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
// We use "require" instead of "import" here because import statement must be put in top level. Our current code does
// not allow terser to tree-shaking code as expected because some codes are treated as having side effects.
// So we import code inside the if-clause to allow terser remove the code safely.
__exportStar(require("onnxruntime-common"), exports);
const onnxruntime_common_1 = require("onnxruntime-common");
if (!BUILD_DEFS.DISABLE_WEBGL) {
    const onnxjsBackend = require('./backend-onnxjs').onnxjsBackend;
    onnxruntime_common_1.registerBackend('webgl', onnxjsBackend, -1);
}
if (!BUILD_DEFS.DISABLE_WASM) {
    const wasmBackend = require('./backend-wasm').wasmBackend;
    onnxruntime_common_1.registerBackend('wasm', wasmBackend, 0);
}
//# sourceMappingURL=index.js.map