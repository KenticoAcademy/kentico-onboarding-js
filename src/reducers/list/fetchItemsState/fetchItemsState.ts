import { FetchItemsState } from '../../../models/enums/FetchItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import {
  FETCH_ITEMS_FAIL,
  FETCH_ITEMS_START,
  FETCH_ITEMS_SUCCESS,
} from '../../../constants/actionTypes';

export const fetchItemsState = (state = FetchItemsState.INITIAL, action: IAction): FetchItemsState => {
  switch (action.type) {
    case FETCH_ITEMS_START:
      return FetchItemsState.REQUESTED;

    case FETCH_ITEMS_SUCCESS:
      return FetchItemsState.RECEIVED;

    case FETCH_ITEMS_FAIL:
      return FetchItemsState.FAILED;

    default:
      return state;
  }
};
