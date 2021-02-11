import React, {FC, ReactElement, useState} from 'react';
import CodeEditor from "../components/CodeEditor/code-editor";
import Preview from "../components/Preview/preview";
import bundle from '../Bundler/index';
import Resizable from "../components/Resizable/resizable";
import "./code-cell.styles.scss";

const CodeCell: FC = (): ReactElement => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onSubmit = async () => {
    // Run the bundler and get the output
    const output = await bundle(input);
    // Set the result code as the code state to render in the iframe
    setCode(output);
  }

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
