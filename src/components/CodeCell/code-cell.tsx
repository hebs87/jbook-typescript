import React, {FC, ReactElement, useState, useEffect} from 'react';
import CodeEditor from "../CodeEditor/code-editor";
import Preview from "../Preview/preview";
import bundle from '../../Bundler';
import Resizable from "../Resizable/resizable";
import {Cell} from "../../state";
import {useActions} from "../../hooks/use-actions";
import "./code-cell.styles.scss";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({cell}): ReactElement => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const {updateCell} = useActions();

  useEffect(() => {
    // Debounce logic to only read input after user stops typing for 1 second
    const timer = setTimeout(async () => {
      // Run the bundler and get the output
      const output = await bundle(cell.content);
      // Set the result code as the code state to render in the iframe
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction={'vertical'}>
      <div className="window-container">
        <Resizable direction={'horizontal'}>
          <CodeEditor
            initialValue={cell.content || '// Enter your code here...'}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} error={error}/>
      </div>
    </Resizable>
  );
}

export default CodeCell;
