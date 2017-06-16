import { Map } from 'immutable';
import { IAction } from '../actionCreators/IAction';
import {
  FETCH_ITEMS_FAILURE,
  POST_ITEM_FAILURE,
  DISMISS_ERROR,
} from '../constants/actionTypes';
const errorReducer = (state: Map<string, string> = Map<string, string>(), action: IAction) => {
  switch (action.type) {
    case DISMISS_ERROR:
      return state.delete(action.payload.id);

    case POST_ITEM_FAILURE:
    case FETCH_ITEMS_FAILURE: {
      const errorId = action.payload.id;
      const errorMessage = action.payload.errorMessage;
      return state.set(errorId, errorMessage);
    }

    default:
      return state;
  }
};

export { errorReducer };
