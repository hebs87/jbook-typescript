import axios from "axios";
import {Dispatch} from "redux";
import {ActionType} from "../action-types";
import {Action, DeleteCellAction, InsertCellAfterAction, MoveCellAction, UpdateCellAction} from "../actions";
import {Cell, CellTypes, MoveCellDirectionTypes} from "../cell";
import bundle from "../../Bundler";

export const moveCell = (id: string, direction: MoveCellDirectionTypes): MoveCellAction => ({
  type: ActionType.MOVE_CELL,
  payload: {
    id,
    direction
  }
});

export const insertCellAfter = (id: string | null, type: CellTypes): InsertCellAfterAction => ({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id,
    type
  }
});

export const updateCell = (id: string, content: string): UpdateCellAction => ({
  type: ActionType.UPDATE_CELL,
  payload: {
    id,
    content
  }
});

export const deleteCell = (id: string): DeleteCellAction => ({
  type: ActionType.DELETE_CELL,
  payload: id
});

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // Dispatch BUNDLE_START action
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    // Dispatch BUNDLE_COMPLETE action
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  }
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    // Dispatch FETCH_CELLS action
    dispatch({
      type: ActionType.FETCH_CELLS,
    });

    try {
      // Make network request
      const {data}: {data: Cell[]} = await axios.get('/cells');

      // Dispatch FETCH_CELLS_COMPLETE action
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });

    } catch (error) {
      // Dispatch FETCH_CELLS_ERROR action
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  }
};
