import React, {FC, ReactElement, useState, useEffect} from 'react';
import CodeEditor from "../CodeEditor/code-editor";
import Preview from "../Preview/preview";
import bundle from '../../Bundler';
import Resizable from "../Resizable/resizable";
import "./code-cell.styles.scss";

const CodeCell: FC = (): ReactElement => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    // Debounce logic to only read input after user stops typing for 1 second
    const timer = setTimeout(async () => {
      // Run the bundler and get the output
      const output = await bundle(input);
      // Set the result code as the code state to render in the iframe
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction={'vertical'}>
      <div className="window-container">
        <Resizable direction={'horizontal'}>
          <CodeEditor
            initialValue={`// Enter your code below this line`}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={error}/>
      </div>
    </Resizable>
  );
}

export default CodeCell;
