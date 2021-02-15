import React, {FC, ReactElement} from "react";
import {Cell} from "../../state";
import CodeCell from "../CodeCell/code-cell";
import TextEditor from "../TextEditor/text-editor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({cell}): ReactElement => {
  const child: JSX.Element = cell.type === 'code' ? <CodeCell cell={cell}/> : <TextEditor/>;

  return (
    <div>{child}</div>
  );
};

export default CellListItem;
