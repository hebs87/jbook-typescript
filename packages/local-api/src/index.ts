import express from "express";
import {createProxyMiddleware} from "http-proxy-middleware";

// Args - port to run on, filename of the save/fetch file, dir to save the file into
export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // Create proxy to port that React app is running on
  app.use(createProxyMiddleware({
    target: 'http://localhost:3000',
    ws: true,
    logLevel: 'silent',
  }));

  // Resolve promise if successful, or reject and put into error state on error
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
