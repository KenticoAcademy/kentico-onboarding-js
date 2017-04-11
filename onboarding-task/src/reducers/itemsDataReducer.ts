import { Map } from 'immutable';

import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM } from '../actions/actionTypes';
import { itemReducer } from './itemReducer';

const itemsDataReducer = (state = Map<string, Item>(),
                          action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set(action.payload.id, itemReducer(state.get(action.payload.id), action));

    case CREATE_ITEM:
      return state.set(action.payload.id, itemReducer(new Item(), action));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};

export { itemsDataReducer };
