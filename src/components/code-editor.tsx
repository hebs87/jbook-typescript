import React, {FC, ReactElement} from 'react';
import MonacoEditor from '@monaco-editor/react';

const CodeEditor: FC = (): ReactElement => {
  return (
    <MonacoEditor
      height={500}
    />
  );
};

export default CodeEditor;
