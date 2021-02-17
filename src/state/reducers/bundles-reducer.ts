import produce from "immer";
import {ActionType} from "../action-types";
import {Action} from "../actions";

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundlesState = {};

const bundlesReducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      // Find the cell if it exists, make it blank and set loading to true
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: ''
      };
      return state;
    case ActionType.BUNDLE_COMPLETE:
      const {code, err} = action.payload.bundle;
      // Find the cell if it exists, set loading to false and set it props to the response data
      state[action.payload.cellId] = {
        loading: true,
        code,
        err
      };
      return state;
    default:
      return state;
  }
});

export default bundlesReducer;
