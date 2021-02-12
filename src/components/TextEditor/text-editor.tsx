import React, {FC, ReactElement, Fragment, useState, useEffect, useRef} from "react";
import MDEditor from '@uiw/react-md-editor';
import './text-editor.styles.scss';

const TextEditor: FC = ():ReactElement => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');
  const mdEditorDiv = useRef<HTMLDivElement | null>(null);

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

  const handleEditorChange = (value: string): void => {
    setValue(value);
  }

  return(
    <Fragment>
      {
        editing &&
        <div className="text-editor" ref={mdEditorDiv}>
          <MDEditor
            value={value}
            onChange={(value) => handleEditorChange(value || '')}
          />
        </div>
      }
      {
        !editing &&
        <div className="text-editor card" onClick={() => handleClick(true)}>
          <div className="card-content">
            <MDEditor.Markdown
              source={value}
            />
          </div>
        </div>
      }
    </Fragment>
  );
};

export default TextEditor;
