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
        oldText: action.payload.text !== state.text
          ? state.text
          : state.oldText,
      });

    case 'TOGGLE_ITEM_EDITING':
      return state.with({
        isBeingEdited: !state.isBeingEdited,
      });

    case 'SET_ITEM_SYNCING':
      return state.with({
        isSyncing: action.payload.value,
      });

    case 'POST_ITEM_SUCCESS':
      return state.with({
        id: action.payload.newId,
        isSyncing: false,
        errorId: '',
      });

    case 'PUT_ITEM_SUCCESS':
      return state.with({
        isSyncing: false,
        oldText: '',
        errorId: '',
      });

    case 'ADD_ITEM_ERROR':
      return state.with({
        errorId: action.payload.errorId,
      });

    case 'DELETE_ITEM_ERROR':
      return state.with({
        errorId: '',
        isBeingEdited: false,
        isSyncing: false,
      });

    case 'CANCEL_ITEM_UPDATING':
      return state.with({
        text: state.oldText,
        errorId: '',
        isBeingEdited: false,
        isSyncing: false,
        oldText: '',
      });

    default:
      return state;
  }
};
