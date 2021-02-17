import {FC, ReactElement} from 'react';
import AddButton, {AddButtonProps} from "../AddButton/add-button";
import {useActions} from "../../hooks/use-actions";
import './add-cell.styles.scss';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({previousCellId, forceVisible}): ReactElement => {
  const {insertCellAfter} = useActions();

  const AddButtons: AddButtonProps[] = [
    {
      btnClassName: "button is-rounded is-primary is-small",
      onClick: () => insertCellAfter(previousCellId, 'code'),
      iconClassName: "icon is-small",
      iconName: "fas fa-plus",
      btnText: "Code"
    },
    {
      btnClassName: "button is-rounded is-primary is-small",
      onClick: () => insertCellAfter(previousCellId, 'text'),
      iconClassName: "icon is-small",
      iconName: "fas fa-plus",
      btnText: "Text"
    }
  ];

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        {
          AddButtons.map((props, key) => (
            <AddButton
              key={key}
              {...props}
            />
          ))
        }
      </div>
      <div className="divider"/>
    </div>
  )
};

export default AddCell;
