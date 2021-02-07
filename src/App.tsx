import React, {FC, ReactElement, useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import CodeEditor from "./components/CodeEditor/code-editor";
import Preview from "./components/Preview/preview";
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";

const App: FC = (): ReactElement => {
  const ref = useRef<any>();
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

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

    // Set the result code as the code state to render in the iframe
    setCode(result.outputFiles[0].text);
  }

  return (
    <div>
      <CodeEditor
        initialValue={`// Enter your code below this line`}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <Preview code={code}/>
    </div>
  );
}

export default App;
