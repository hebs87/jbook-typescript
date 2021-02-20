"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
// Args - port to run on, filename of the save/fetch file, dir to save the file into
var serve = function (port, filename, dir) {
    console.log("Serving traffic on port " + port);
    console.log("Saving/fetching cells from " + filename);
    console.log("That file is in dir " + dir);
};
exports.serve = serve;
