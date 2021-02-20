import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from 'localforage';

// Create localForage instance to enable caching npm package requests
const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (userInput: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onLoad({ filter: /^index\.js$/ }, () => {
        return {
          loader: 'jsx',
          contents: userInput,
        };
      });

      // onLoad that holds common logic for below onLoads, but doesn't return a value
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check if we've already fetched the package
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // If so, return it from the cache
        if (cachedResult) {
          return cachedResult;
        }
      });

      // Handle CSS files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // If not, let the request occur and cache the returned object
        // Get the data from the unpkg package path, and the request object which has the pathname of where the
        // index.js file is found - for nested packages - e.g. /src/index.js
        const {data, request} = await axios.get(args.path);

        // Change the fileType depending on whether we are importing jsx or css files and create the contents accordingly
        // Escape CSS files, so the quotes don't interfere with our jsx - new lines, double and single quotes
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}'
            document.head.appendChild(style);
          `;

        // resolveDir contains the pathname without the /index.js - this is passed on to the next cycle
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      // Handle all other files (JSX)
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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
    }
  };
};
