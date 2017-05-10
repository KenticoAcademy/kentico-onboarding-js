import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import {
  CREATE_ITEM,
  EDIT_ITEM,
  ITEM_POST_SUCCESS
} from '../actions/actionTypes';

export const itemReducer = (state = new Item(), action: IAction): Item => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('value', action.payload.value) as Item;

    case CREATE_ITEM:
      return new Item({
        ueid: action.payload.ueid,
        value: action.payload.value,
      });

    case ITEM_POST_SUCCESS:
      return new Item(action.payload.item);

    default:
      return state;
  }
};

