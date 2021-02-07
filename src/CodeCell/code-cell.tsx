import React, {FC, ReactElement, useState} from 'react';
import CodeEditor from "../components/CodeEditor/code-editor";
import Preview from "../components/Preview/preview";
import bundle from '../Bundler/index';

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

export default CodeCell;
