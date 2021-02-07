import React, {FC, ReactElement, useRef} from 'react';
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({onChange, initialValue}): ReactElement => {
  const editorRef = useRef<any>();

  // Get value of the editor on change
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    // Update editorRef value on mount
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({tabSize: 2});
  };

  const onFormatClick = () => {
    // Get current unformatted value from the editor
    const unformatted = editorRef.current.getModel().getValue();

    // Format the value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    });

    // Set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
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
    </div>
  );
};

export default CodeEditor;
