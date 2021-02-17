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
    // Run the bundler immediately when we first start the app and return
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    // Debounce logic to only read input after user stops typing for 1 second
    const timer = setTimeout(async () => {
      // Call the createBundle action
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="progress-wrapper">
          {
            (!bundle || bundle.loading) ? (
                <div className="progress-cover">
                  <progress className="progress is-small is-primary" max="100">
                    Loading
                  </progress>
                </div>
            ) : (
              <Preview code={bundle.code} error={bundle.error}/>
            )
          }
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
