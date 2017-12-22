import { FetchItemsState } from '../../../models/FetchItemsState';
import { IAction } from '../../../models/IAction';
import { FETCH_ITEMS } from '../../../constants/actionTypes';

const fetchItems = (state: FetchItemsState, action: IAction): FetchItemsState => {
  const { payload } = action;

  if (payload.items) {
    return FetchItemsState.RECEIVED;
  }

  if (payload.uri) {
    return FetchItemsState.REQUESTED;
  }

  if (payload.error) {
    return FetchItemsState.FAILED;
  }

  return state;
};

export const fetchItemsState = (state = FetchItemsState.INITIAL, action: IAction): FetchItemsState => {
  switch (action.type) {
    case FETCH_ITEMS:
      return fetchItems(state, action);

    default:
      return state;
  }
};
