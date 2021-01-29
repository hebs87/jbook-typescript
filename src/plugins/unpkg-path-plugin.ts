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
          return {
            path: new URL(args.path, args.importer + '/').href,
            namespace: 'a'
          }
        }

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a'
        };

        // else if (args.path === 'tiny-test-pkg') {
        //   return {
        //     path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //     namespace: 'a'
        //   }
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('medium-test-pkg');
              console.log(message);
            `,
          };
        }

        // Get the data from the unpkg package path
        const {data} = await axios.get(args.path);
        console.log(data);
        return {
          loader: 'jsx',
          contents: data
        };
      });
    },
  };
};
