import React, {FC, ReactElement} from "react";
import CellListItem from "../CellListItem/cell-list-item";
import {useTypedSelector} from "../../hooks/use-typed-selector";

const CellList: FC = (): ReactElement => {
  const cells = useTypedSelector(({cells: {data, order}}) => (
    order.map((id) => data[id])
  ));

  const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell}/>)

  return (
    <div>{renderedCells}</div>
  );
};

export default CellList;
