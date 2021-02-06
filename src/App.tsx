import React, {FC, ReactElement, useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";

const App: FC = (): ReactElement => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // Initialise esbuild
  const startService = async () => {
    // Assigns this service build to the ref variable, so we can use it anywhere in our App file
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  useEffect(() => {
    startService();
  }, []);

  const onSubmit = async () => {
    if (!ref.current) return;

    // Transform the input code - intercept it to use npm bundler plugin
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    console.log(result);

    // Set the result code as the code state to render in the browser
    setCode(result.outputFiles[0].text);
  }

  // Script tag containing JSX code to pass into iFrame via srcDoc attribute
  const html = `
    <script>
      ${code}
    </script>
  `;

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe sandbox="allow-scripts" srcDoc={html} frameBorder="0"></iframe>
    </div>
  );
}

export default App;
