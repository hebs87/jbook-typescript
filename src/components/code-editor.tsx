import React, {FC, ReactElement} from 'react';
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({onChange, initialValue}): ReactElement => {
  // Get value of the editor on change
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({tabSize: 2});
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
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
