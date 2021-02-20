import React, {FC, ReactElement, Fragment, useState, useEffect, useRef} from "react";
import MDEditor from '@uiw/react-md-editor';
import {Cell} from "../../state";
import {useActions} from "../../hooks/use-actions";
import './text-editor.styles.scss';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({cell}):ReactElement => {
  const [editing, setEditing] = useState(false);
  const mdEditorDiv = useRef<HTMLDivElement | null>(null);
  const {updateCell} = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent):void => {
      // Only change editing state when clicking outside the editor div
      if (mdEditorDiv.current && event.target && mdEditorDiv.current.contains(event.target as Node)) {
        return;
      }
      handleClick(false);
    };

    document.addEventListener('click', listener, {capture: true});

    return(() => {
      document.removeEventListener('click', listener, {capture: true});
    })
  }, []);

  const handleClick = (value: boolean): void => {
    setEditing(value);
  }

  return(
    <Fragment>
      {
        editing &&
        <div className="text-editor" ref={mdEditorDiv}>
          <MDEditor
            value={cell.content}
            onChange={(value) => updateCell(cell.id, value || '')}
          />
        </div>
      }
      {
        !editing &&
        <div className="text-editor card" onClick={() => handleClick(true)}>
          <div className="card-content">
            <MDEditor.Markdown
              source={cell.content || 'Click to edit...'}
            />
          </div>
        </div>
      }
    </Fragment>
  );
};

export default TextEditor;
