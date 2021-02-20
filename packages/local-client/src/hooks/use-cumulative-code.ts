import {useTypedSelector} from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(({cells: {data, order}}) => {
    // Get code from all code cells in the data, in the order that they are in and join them in an array
    const orderedCells = order.map(id => data[id]);

    // Implement show() function to render code snippet in preview - working show function if there is code in the cell
    // Non-working function if no code in the cell
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = value => {
        const root = document.querySelector('#root');
        
        if (typeof value === 'object') {
          // Convert JSX else show object
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;
    const showFuncNoOp = `var show = () => {}`;

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) break;
    }
    return cumulativeCode;
  }).join('\n');
};
