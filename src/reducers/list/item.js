import { Item } from '../../models/item';
import {
  ITEM_VALUE_CHANGED,
  ITEM_EDITING_STOP,
  ITEM_EDITING_START,
  ITEM_SAVE,
} from '../../constants/actionTypes';
import {
  saveItem,
  cancelItemEditing,
} from './itemActions';

export const item = (state = Item(), action) => {
  switch (action.type) {
    case ITEM_SAVE:
      return saveItem(state);

    case ITEM_EDITING_START:
      return state.merge({ isBeingEdited: true });

    case ITEM_EDITING_STOP:
      return cancelItemEditing(state);

    case ITEM_VALUE_CHANGED:
      return state.merge({ temporaryValue: action.payload.updatedValue });

    default:
      return state;
  }
};
