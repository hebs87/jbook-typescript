import * as esbuild from 'esbuild-wasm';
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return {
            path: args.path,
            namespace: 'a'
          };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          // Append the package to the end of the base URL - it uses the base URL as a relative path
          // For nested packages, we append the pathname of where the index.js file was found to the base URL
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
            namespace: 'a'
          }
        }

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a'
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
          };
        }

        // Get the data from the unpkg package path, and the request object which has the pathname of where the
        // index.js file is found - for nested packages - e.g. /src/index.js
        const {data, request} = await axios.get(args.path);
        // resolveDir contains the pathname without the /index.js - this is passed on to the next cycle
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };
      });
    },
  };
};
