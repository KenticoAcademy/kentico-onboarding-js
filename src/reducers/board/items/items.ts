import { OrderedMap } from 'immutable';
import { IAction } from '../../../actions/IAction';
import {
  CREATE_ITEM,
  SAVE_TEXT_ITEM,
  START_EDIT_ITEM,
  CANCEL_EDIT_ITEM,
  DELETE_ITEM,
} from '../../../actions/actionTypes';
import { item } from './item';
import { Item } from '../../../models/Item';

export type IItemState = OrderedMap<Guid, Item>;

export const items = (state = OrderedMap<Guid, Item>(), action: IAction): IItemState => {
  switch (action.type) {
    case CREATE_ITEM:
    case SAVE_TEXT_ITEM:
    case START_EDIT_ITEM:
    case CANCEL_EDIT_ITEM:
      const requiredItem = state.get(action.payload.id);
      const updatedItem = item(requiredItem, action);
      return state.set(action.payload.id, updatedItem);

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};
