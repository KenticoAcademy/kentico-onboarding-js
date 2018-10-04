import { Item } from '../../models/Item';
import { Actions } from '../../actions/types/itemsActionTypes';

export const item = (state: Item = new Item(), action: Actions): Item => {
  switch (action.type) {
    case 'ADD_ITEM':
      return new Item({
        id: action.payload.id,
        text: action.payload.text,
        isSyncing: true,
      });

    case 'SAVE_ITEM_TEXT':
      return state.with({
        text: action.payload.text,
        isBeingEdited: false,
        isSyncing: true,
        oldText: state.text,
      });

    case 'TOGGLE_ITEM_EDITING':
      return state.with({
        isBeingEdited: !state.isBeingEdited,
      });

    case 'POST_ITEM_SUCCESS':
      return new Item({
        id: action.payload.newId,
        text: action.payload.text,
        isSyncing: false,
      });

    case 'PUT_ITEM_SUCCESS':
      return state.with({
        isSyncing: false,
        oldText: '',
      });

    default:
      return state;
  }
};
