import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  // Ensure action creators are only bound once when the value of dispatch changes
  return useMemo(() => (
    bindActionCreators(actionCreators, dispatch)
  ), [dispatch]);
};
