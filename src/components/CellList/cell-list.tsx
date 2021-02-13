import React, {FC, ReactElement} from "react";
import {useTypedSelector} from "../../hooks/use-typed-selector";

const CellList: FC = (): ReactElement => {
  const state = useTypedSelector((state) => state);

  return (
    <div>Cell List</div>
  );
};

export default CellList;
