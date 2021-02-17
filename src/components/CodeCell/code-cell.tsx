import React, {FC, ReactElement, useEffect} from 'react';
import CodeEditor from "../CodeEditor/code-editor";
import Preview from "../Preview/preview";
import Resizable from "../Resizable/resizable";
import {Cell} from "../../state";
import {useActions} from "../../hooks/use-actions";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import "./code-cell.styles.scss";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: FC<CodeCellProps> = ({cell}): ReactElement => {
  const {updateCell, createBundle} = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    // Debounce logic to only read input after user stops typing for 1 second
    const timer = setTimeout(async () => {
      // Call the createBundle action
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction={'vertical'}>
      <div className="window-container">
        <Resizable direction={'horizontal'}>
          <CodeEditor
            initialValue={cell.content || '// Enter your code here...'}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {
          bundle &&
          <Preview code={bundle.code} error={bundle.error}/>
        }
      </div>
    </Resizable>
  );
}

export default CodeCell;
