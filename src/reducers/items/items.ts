import { OrderedMap } from 'immutable';
import { Item } from '../../models/ItemRecord';
import { Action } from '../../actions/actionInterface';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
} from '../../actions/actionTypes';
import { item } from './item';

export const items = (state = OrderedMap<string, Item>(), action: Action) => {
  switch (action.type) {
    case CREATE_ITEM:
    case EDIT_ITEM:
      return (
        state.set(action.payload.id,
                  item(state.get(action.payload.id), action))
      );

    case DELETE_ITEM:
      return (
        state.delete(action.payload.id)
      );

    default:
      return state;
  }
};
