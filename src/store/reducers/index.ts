import cellsReducer from "./cells-reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  cells: cellsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;