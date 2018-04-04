import { FetchItemsState } from '../../../models/enums/FetchItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import {
  ITEMS_FETCH_FAILED,
  ITEMS_FETCH_START,
  ITEMS_FETCH_SUCCESS,
} from '../../../constants/actionTypes';

export const fetchItemsState = (state = FetchItemsState.INITIAL, action: IAction): FetchItemsState => {
  switch (action.type) {
    case ITEMS_FETCH_START:
      return FetchItemsState.REQUESTED;

    case ITEMS_FETCH_SUCCESS:
      return FetchItemsState.RECEIVED;

    case ITEMS_FETCH_FAILED:
      return FetchItemsState.FAILED;

    default:
      return state;
  }
};
