import React, {FC, ReactElement} from 'react';
import CodeCell from "./components/CodeCell/code-cell";
import TextEditor from "./components/TextEditor/text-editor";

const App: FC = (): ReactElement => {
  return (
    <div>
      {/*<CodeCell/>*/}
      <TextEditor/>
    </div>
  );
}

export default App;
