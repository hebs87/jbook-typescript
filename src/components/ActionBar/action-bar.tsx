import {FC, ReactElement} from 'react';
import ActionButton, {ActionButtonProps} from "../ActionButton/action-button";
import {useActions} from "../../hooks/use-actions";
import './action-bar.styles.scss';

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({id}):ReactElement => {
  const {moveCell, deleteCell} = useActions();

  const ActionButtons: ActionButtonProps[] = [
    {
      className: "button is-primary is-small",
      onClick: () => moveCell(id, 'up'),
      iconName: "fas fa-arrow-up"
    },
    {
      className: "button is-primary is-small",
      onClick: () => moveCell(id, 'down'),
      iconName: "fas fa-arrow-down"
    },
    {
      className: "button is-primary is-small",
      onClick: () => deleteCell(id),
      iconName: "fas fa-times"
    },
  ];

  return (
    <div className="action-bar">
      {
        ActionButtons.map((props, key) => (
          <ActionButton
            key={key}
            {...props}
          />
        ))
      }
    </div>
  );
};

export default ActionBar;
