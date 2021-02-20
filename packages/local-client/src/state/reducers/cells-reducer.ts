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
    case ActionType.SAVE_CELLS_ERROR:
      // Set error state
      state.error = action.payload;
      return state;

    case ActionType.FETCH_CELLS:
      // Set loading and error states
      state.loading = true;
      state.error = null;
      return state;

    case ActionType.FETCH_CELLS_COMPLETE:
      state.loading = false;
      // Set the order state - map over the array of cell objects and return the cell id
      state.order = action.payload.map(cell => cell.id);
      // Parse payload data to create the state data object
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState['data']);
      return state;

    case ActionType.FETCH_CELLS_ERROR:
      // Set loading and error states
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionType.MOVE_CELL:
      const {direction} = action.payload;
      // Find the index of the id matching the payload id
      const index = state.order.findIndex((id) => id === action.payload.id);
      // Set target index - reduce index if direction is up, or increase if direction is down
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      // Check the new index is not outside the bounds of the array - not the first/last element, depending on direction
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      // Complete swapping logic
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;

    case ActionType.INSERT_CELL_AFTER:
      const {type} = action.payload;
      // Create new cell object
      const cell: Cell = {
        id: randomId(),
        type,
        content: ''
      };
      // Add new cell object to data object
      state.data[cell.id] = cell;
      // Find the index of the id matching the payload id
      const foundIndex = state.order.findIndex((id) => id === action.payload.id);
      // Add cell to start of order array if id is null, or add it after the matching id index
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }
      return state;

    case ActionType.UPDATE_CELL:
      const {id, content} = action.payload;
      // Update the content of the cell at the matching id key
      state.data[id].content = content;
      return state;

    case ActionType.DELETE_CELL:
      // Delete cell at the matching id key and remove id from order array
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);
      return state;

    default:
      return state;
  }
});

// Generate random alphanumeric id
const randomId = (): string => {
  return Math.random().toString(36).substr(2, 5);
};

export default cellsReducer;
