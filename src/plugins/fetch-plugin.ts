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
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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

        // Change the fileType depending on whether we are importing jsx or css files and create the contents accordingly
        const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
        // Escape CSS files so the quotes don't interfere with our jsx - new lines, double and single quotes
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = fileType === 'css' ?
          `
            const style = document.createElement('style');
            style.innerText = '${escaped}'
            document.head.appendChild(style);
          ` : data;

        // resolveDir contains the pathname without the /index.js - this is passed on to the next cycle
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    }
  };
};
