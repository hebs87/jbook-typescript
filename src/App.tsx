import React, {FC, ReactElement, useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App: FC = (): ReactElement => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
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

    // Reset iframe content to remove and changes from previous execution
    iframe.current.srcdoc = html;

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

    // Set the result code as the code state to render in the iframe
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  }

  // HTML to render in iframe
  const html = `
    <html lang="en">
      <head>
        <title>Preview</title>
      </head>
      <body>
        <div id="root"></div>
        <script >
          window.addEventListener('message', (event) => {
            try {
              // Transpile the data to render in the iframe
              eval(event.data);
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error:</h4><p>' + err + '</p></div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor/>
      <textarea value={input} onChange={e => setInput(e.target.value)}>
      </textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        frameBorder="0"
      >
      </iframe>
    </div>
  );
}

export default App;
