import React, {FC, ReactElement} from 'react';
import CellList from "./components/CellList/cell-list";

const App: FC = (): ReactElement => {
  return (
    <div>
      <CellList/>
    </div>
  );
}

export default App;
