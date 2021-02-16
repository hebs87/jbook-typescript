import React, {FC, ReactElement, Fragment} from "react";
import {Cell} from "../../state";
import CodeCell from "../CodeCell/code-cell";
import TextEditor from "../TextEditor/text-editor";
import ActionBar from "../ActionBar/action-bar";
import './cell-list-item.styles.scss';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({cell}): ReactElement => {
  const child: JSX.Element = cell.type === 'code' ? (
    <Fragment>
      <div className="action-bar-wrapper">
        <ActionBar id={cell.id}/>
      </div>
      <CodeCell cell={cell}/>
    </Fragment>
  ) : (
    <Fragment>
      <TextEditor cell={cell}/>
      <ActionBar id={cell.id}/>
    </Fragment>
  );

  return (
    <div className="cell-list-item">
      {child}
    </div>
  );
};

export default CellListItem;
