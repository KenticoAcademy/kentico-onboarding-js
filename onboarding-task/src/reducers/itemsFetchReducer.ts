import { IAction } from '../actions/IAction';
import { ITEMS_FETCHING_FAILED, RECEIVE_ITEMS, REQUEST_ITEMS } from '../actions/actionTypes';

const itemsFetchReducer = (state = false,
                           action: IAction,) => {
  switch (action.type) {
    case REQUEST_ITEMS:
      return true;

    case ITEMS_FETCHING_FAILED:
    case RECEIVE_ITEMS:
      return false;

    default:
      return state;
  }
};

export { itemsFetchReducer };
