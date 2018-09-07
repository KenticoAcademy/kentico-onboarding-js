import { Action } from '../../actions/actionInterface';
import {
  CREATE_ITEM,
  EDIT_ITEM,
} from '../../actions/actionTypes';
import { Item } from '../../models/ItemRecord';

export const item = (state = new Item(), action: Action) => {
  switch (action.type) {
    case CREATE_ITEM:
    case EDIT_ITEM:
      return (
        new Item({
          id: action.payload.id,
          text: action.payload.text,
        })
      );

    default:
      return state;
  }
};
