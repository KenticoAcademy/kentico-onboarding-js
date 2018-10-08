import { OrderedMap } from 'immutable';
import { IAction } from '../../../actions/IAction';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  SAVE_TEXT_ITEM,
  CANCEL_EDIT_ITEM,
  START_EDIT_ITEM,
} from '../../../actions/actionTypes';
import { item } from './item';
import { Item } from '../../../models/Item';

export const items = (state = OrderedMap<Guid, Item>(), action: IAction): OrderedMap<Guid, Item> => {
  switch (action.type) {
    case CREATE_ITEM:
    case SAVE_TEXT_ITEM:
    case START_EDIT_ITEM:
    case CANCEL_EDIT_ITEM:
      const requiredItem = state.get(action.payload.id);
      const updatedItem = item(requiredItem, action);
      const updatedItems = state.set(action.payload.id, updatedItem);
      return updatedItems;
    case DELETE_ITEM:
      return state.delete(action.payload.id);
    default:
      return state;
  }
};
