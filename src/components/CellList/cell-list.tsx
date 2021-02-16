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
      <AddCell nextCellId={cell.id}/>
      <CellListItem cell={cell}/>
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells.length === 0} nextCellId={null}/>
    </div>
  );
};

export default CellList;
