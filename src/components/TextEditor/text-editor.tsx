import React, {FC, ReactElement, Fragment, useState, useEffect, useRef} from "react";
import MDEditor from '@uiw/react-md-editor';
import './text-editor.styles.scss';

const TextEditor: FC = ():ReactElement => {
  const [editing, setEditing] = useState(false);
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

  return(
    <Fragment>
      {
        editing &&
        <div ref={mdEditorDiv}>
          <MDEditor/>
        </div>
      }
      {
        !editing &&
        <div onClick={() => handleClick(true)}>
          <MDEditor.Markdown source="# Heading"/>
        </div>
      }
    </Fragment>
  );
};

export default TextEditor;
