import {ActionType} from "../action-types";
import {Action} from "../actions";
import {Cell} from "../cell";
import produce from "immer";

interface CellsState {
  loading: boolean;
  error: string | null;
  // order of the cells - array of id strings
  order: string[];
  // cell objects - key is id string and value is the Cell object
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

// Wrap reducer in immer produce method to enable simplifying state update
const cellsReducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state;

    case ActionType.INSERT_CELL_BEFORE:
      return state;

    case ActionType.UPDATE_CELL:
      const {id, content} = action.payload;
      // Update the content of the cell at the matching id key
      state.data[id].content = content;
      return;

    case ActionType.DELETE_CELL:
      // Delete cell at the matching id key and remove id from order array
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);
      return;

    default:
      return state;
  }
});

export default cellsReducer;
