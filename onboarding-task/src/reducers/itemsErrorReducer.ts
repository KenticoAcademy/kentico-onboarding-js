import { OrderedMap } from 'immutable';
import { IAction } from '../actions/IAction';
import { ITEM_POST_FAILED, ITEMS_FETCHING_FAILED } from '../actions/actionTypes';
import { ErrorMessage } from '../models/ErrorMessage';

const itemsErrorReducer = (state = OrderedMap<string, ErrorMessage>(),
                          action: IAction,) => {
  switch (action.type) {
    case ITEM_POST_FAILED:
      return state.set(action.payload.ueid, new ErrorMessage(action.payload.error));

    case ITEMS_FETCHING_FAILED:
      return state.set(action.payload.id, new ErrorMessage(action.payload.error));

    default:
      return state;
  }
};

export { itemsErrorReducer };
