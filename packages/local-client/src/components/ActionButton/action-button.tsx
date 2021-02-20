import {FC, ReactElement, Fragment} from "react";

export interface ActionButtonProps {
  className: string;
  onClick: () => void;
  iconName: string;
}

const ActionButton: FC<ActionButtonProps> = ({className, onClick, iconName}):ReactElement => {
  return (
    <Fragment>
      <button
        className={className}
        onClick={onClick}
      >
        <span className="icon">
          <i className={iconName}/>
        </span>
      </button>
    </Fragment>
  );
};

export default ActionButton;
