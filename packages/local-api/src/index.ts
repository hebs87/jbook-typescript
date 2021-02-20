import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import path from "path";

// Args - port to run on, filename of the save/fetch file, dir to save the file into, useProxy to determine which serve
// method to use depending on environment
export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  const app = express();

  if (useProxy) {
    // Create proxy to port that React app is running on
    app.use(createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: 'silent',
    }));
  } else {
    // Serve React app build files - get absolute path to node_modules dir in local machine
    const packagePath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packagePath)));
  }

  // Resolve promise if successful, or reject and put into error state on error
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
