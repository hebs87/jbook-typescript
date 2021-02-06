import React, {FC, ReactElement} from 'react';
import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string
}

const CodeEditor: FC<CodeEditorProps> = ({initialValue}): ReactElement => {
  return (
    <MonacoEditor
      value={initialValue}
      theme="dark"
      language="javascript"
      height={500}
      options={{
        wordWrap: 'on',
        minimap: {enabled: false},
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  );
};

export default CodeEditor;
