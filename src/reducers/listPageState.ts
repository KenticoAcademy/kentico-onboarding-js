import { ListPageState } from '../enums/listPageState';
import { IAction } from '../actions/IAction';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_STARTED,
  ITEMS_FETCH_SUCCEEDED
} from '../constants/actionTypes';

export const listPageState = (previousState: ListPageState = ListPageState.Loading, action: IAction) => {
  switch (action.type) {
    case ITEMS_FETCH_STARTED:
      return ListPageState.Loading;

    case ITEMS_FETCH_FAILED:
      return ListPageState.LoadFailed;

    case ITEMS_FETCH_SUCCEEDED:
      return ListPageState.Loaded;

    default:
      return previousState;
  }
};
