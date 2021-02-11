import React, {FC, ReactElement, useState, useEffect} from 'react';
import CodeEditor from "../components/CodeEditor/code-editor";
import Preview from "../components/Preview/preview";
import bundle from '../Bundler/index';
import Resizable from "../components/Resizable/resizable";
import "./code-cell.styles.scss";

const CodeCell: FC = (): ReactElement => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    // Debounce logic to only read input after user stops typing for 1 second
    const timer = setTimeout(async () => {
      // Run the bundler and get the output
      const output = await bundle(input);
      // Set the result code as the code state to render in the iframe
      setCode(output);
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
        <Preview code={code}/>
      </div>
    </Resizable>
  );
}

export default CodeCell;
