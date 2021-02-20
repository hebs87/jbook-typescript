import {FC, ReactElement, Fragment} from 'react';

export interface AddButtonProps {
  btnClassName: string;
  onClick: () => void;
  iconClassName: string;
  iconName: string;
  btnText: string;
}

const AddButton: FC<AddButtonProps> = ({btnClassName, onClick, iconClassName, iconName, btnText}): ReactElement => {
  return (
    <Fragment>
      <button
        className={btnClassName}
        onClick={onClick}
      >
        <span className={iconClassName}>
          <i className={iconName}/>
        </span>
        <span>
          {btnText}
        </span>
      </button>
    </Fragment>
  )
};

export default AddButton;
