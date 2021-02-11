import React, {FC, ReactElement} from "react";
import {ResizableBox} from "react-resizable";
import './resizable.styles.scss';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: FC<ResizableProps> = ({direction, children}): ReactElement => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 50]}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
