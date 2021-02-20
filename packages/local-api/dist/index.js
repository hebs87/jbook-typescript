"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var path_1 = __importDefault(require("path"));
// Args - port to run on, filename of the save/fetch file, dir to save the file into, useProxy to determine which serve
// method to use depending on environment
var serve = function (port, filename, dir, useProxy) {
    var app = express_1.default();
    if (useProxy) {
        // Create proxy to port that React app is running on
        app.use(http_proxy_middleware_1.createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        // Serve React app build files - get absolute path to node_modules dir in local machine
        var packagePath = require.resolve('local-client/build/index.html');
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    // Resolve promise if successful, or reject and put into error state on error
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
