import { FetchItemsState } from '../../../models/enums/FetchItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import {
  FETCH_FAILED,
  REQUEST_ITEMS,
  RECEIVE_ITEMS,
} from '../../../constants/actionTypes';

export const fetchItemsState = (state = FetchItemsState.INITIAL, action: IAction): FetchItemsState => {
  switch (action.type) {
    case REQUEST_ITEMS:
      return FetchItemsState.REQUESTED;

    case RECEIVE_ITEMS:
      return FetchItemsState.RECEIVED;

    case FETCH_FAILED:
      return FetchItemsState.FAILED;

    default:
      return state;
  }
};
