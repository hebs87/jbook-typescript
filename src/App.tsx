import React, {FC, ReactElement, useState} from 'react';

const App: FC = (): ReactElement => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onSubmit = (): void => {
    console.log(input);
  }

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
