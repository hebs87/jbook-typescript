import React, {FC, ReactElement, Fragment} from "react";
import CellListItem from "../CellListItem/cell-list-item";
import AddCell from "../AddCell/add-cell";
import {useTypedSelector} from "../../hooks/use-typed-selector";

const CellList: FC = (): ReactElement => {
  const cells = useTypedSelector(({cells: {data, order}}) => (
    order.map((id) => data[id])
  ));

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell}/>
      <AddCell previousCellId={cell.id}/>
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null}/>
      {renderedCells}
    </div>
  );
};

export default CellList;
