import React, {FC, ReactElement, useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";

const App: FC = (): ReactElement => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // Initialise esbuild
  const startService = async () => {
    // Assigns this service build to the ref variable, so we can use it anywhere in our App file
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
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
      plugins: [unpkgPathPlugin()]
    });

    console.log(result);

    // Set the result code as the code state to render in the browser
    setCode(result.outputFiles[0].text);
  }

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
