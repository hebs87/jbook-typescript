import {Dispatch} from "redux";
import {Action} from "../actions";
import {ActionType} from "../action-types";
import {saveCells} from "../action-creators";
import {RootState} from "../reducers";

// Thunk middlewares return a function that returns another function
export const persistMiddleware = ({dispatch, getState}: {dispatch: Dispatch<Action>, getState: () => RootState}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      // Always forward on the action
      next(action);

      const {MOVE_CELL, UPDATE_CELL, INSERT_CELL_AFTER, DELETE_CELL} = ActionType;
      if ([MOVE_CELL, UPDATE_CELL, INSERT_CELL_AFTER, DELETE_CELL].includes(action.type)) {
        // Add debounce logic to ensure we aren't saving after every key press
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          // Receive the saveCells function that we get back and then immediately call it with dispatch and getState
          saveCells()(dispatch, getState);
        }, 250);
      }
    }
  }
};
