import {FC, ReactElement} from 'react';
import AddButton, {AddButtonProps} from "../AddButton/add-button";
import {useActions} from "../../hooks/use-actions";
import './add-cell.styles.scss';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({nextCellId, forceVisible}): ReactElement => {
  const {insertCellBefore} = useActions();

  const AddButtons: AddButtonProps[] = [
    {
      btnClassName: "button is-rounded is-primary is-small",
      onClick: () => insertCellBefore(nextCellId, 'code'),
      iconClassName: "icon is-small",
      iconName: "fas fa-plus",
      btnText: "Code"
    },
    {
      btnClassName: "button is-rounded is-primary is-small",
      onClick: () => insertCellBefore(nextCellId, 'text'),
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
