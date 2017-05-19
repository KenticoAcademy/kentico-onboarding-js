import { IAction } from '../../actions/IAction';
import { Item } from '../../models/Item';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  EDIT_ITEM,
  ITEM_SAVE_SUCCEED
} from '../../actions/actionTypes';

export const itemReducer = (state = new Item(), action: IAction): Item => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('value', action.payload.value) as Item;

    case POSITIVELY_CREATE_ITEM_LOCALLY:
      return new Item({
        ueid: action.payload.ueid,
        value: action.payload.value,
      });

    case ITEM_SAVE_SUCCEED:
      return new Item(action.payload.item);

    default:
      return state;
  }
};

