import React, {FC, ReactElement, Fragment, useEffect} from "react";
import CellListItem from "../CellListItem/cell-list-item";
import AddCell from "../AddCell/add-cell";
import {useTypedSelector} from "../../hooks/use-typed-selector";
import {useActions} from "../../hooks/use-actions";
import './cell-list.styles.scss';

const CellList: FC = (): ReactElement => {
  const cells = useTypedSelector(({cells: {data, order}}) => (
    order.map((id) => data[id])
  ));
  const {fetchCells} = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell}/>
      <AddCell previousCellId={cell.id}/>
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null}/>
      {renderedCells}
    </div>
  );
};

export default CellList;
