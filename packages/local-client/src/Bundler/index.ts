import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";

let service: esbuild.Service;

const bundle = async (rawCode: string) => {
  // Only start service if not already started
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  // Catch any bundling errors
  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      // Change standard React functionality to prevent naming collisions with user import statements
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    });

    return {
      code: result.outputFiles[0].text,
      error: ''
    };
  } catch (err) {
    return {
      code: '',
      error: err.message
    };
  }
};

export default bundle;
