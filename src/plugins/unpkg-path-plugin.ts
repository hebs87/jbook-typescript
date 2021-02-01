import * as esbuild from 'esbuild-wasm';
import axios from "axios";
import localForage from 'localforage';

// Create localForage instance to enable caching npm package requests
const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const unpkgPathPlugin = (userInput: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onResolve({ filter: /^index\.js$/ }, () => {
        return {
          path: 'index.js',
          namespace: 'a'
        };
      });

      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: 'a'
        }
      });

      // Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
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
            contents: userInput,
          };
        }

        // Check if we've already fetched the package
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // If so, return it from the cache
        if (cachedResult) {
          return cachedResult;
        }

        // If not, let the request occur and cache the returned object
        // Get the data from the unpkg package path, and the request object which has the pathname of where the
        // index.js file is found - for nested packages - e.g. /src/index.js
        const {data, request} = await axios.get(args.path);
        // resolveDir contains the pathname without the /index.js - this is passed on to the next cycle
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
