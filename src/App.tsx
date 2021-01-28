import React, {FC, ReactElement, useState, useEffect} from 'react';
import * as esbuild from 'esbuild-wasm';

const App: FC = (): ReactElement => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // Initialise esbuild
  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
    console.log(service);
  }

  useEffect(() => {
    startService();
  }, []);

  const onSubmit = (): void => {
    console.log(input);
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
