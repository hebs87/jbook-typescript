import React, {FC, ReactElement, useState, useEffect} from "react";
import {ResizableBox, ResizableBoxProps} from "react-resizable";
import './resizable.styles.scss';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: FC<ResizableProps> = ({direction, children}): ReactElement => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(windowWidth * 0.75);

  // Set prop values based on direction value
  let resizableProps: ResizableBoxProps = direction === 'vertical' ? {
    width: Infinity,
    height: 300,
    maxConstraints: [Infinity, windowHeight * 0.9],
    minConstraints: [Infinity, 50],
    resizeHandles: ['s']
  } : {
    className: 'resize-horizontal',
    height: Infinity,
    width,
    maxConstraints: [windowWidth * 0.75, Infinity],
    minConstraints: [windowWidth * 0.2, Infinity],
    resizeHandles: ['e'],
    // Callback function to set width state when user finishes resizing editor
    onResizeStop: (event, data) => {
      setWidth(data.size.width);
    }
  };

  useEffect(() => {
    let timer: any;
    const listener = () => {
      // Debouncing to reduce buggy resize of window
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
