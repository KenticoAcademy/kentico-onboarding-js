import { IAction } from '../actions/IAction';
import { RECEIVE_ITEMS, REQUEST_ITEMS } from '../actions/actionTypes';

const itemsFetchReducer = (state = false,
                           action: IAction,) => {
  switch (action.type) {
    case REQUEST_ITEMS:
      return true;

    case RECEIVE_ITEMS:
      return false;

    default:
      return state;
  }
};

export { itemsFetchReducer };
