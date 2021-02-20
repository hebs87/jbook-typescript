import cellsReducer from "./cells-reducer";
import bundlesReducer from "./bundles-reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
