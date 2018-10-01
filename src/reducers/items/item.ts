import { IAction } from '../../actions/IAction';
import {
  CREATE_ITEM,
  EDIT_ITEM,
} from '../../actions/actionTypes';
import { Item } from '../../models/Item';

export const item = (state: Item = new Item(), action: IAction): Item => {
  switch (action.type) {
    case CREATE_ITEM:
      return (
        new Item({
          id: action.payload.id,
          text: action.payload.text,
        })
      );
    case EDIT_ITEM:
      return state.with({text: action.payload.text});
    default:
      return state;
  }
};
