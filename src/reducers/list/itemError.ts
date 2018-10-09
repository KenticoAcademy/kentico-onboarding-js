import { Actions } from '../../actions/types/itemsActionTypes';
import { ItemError } from '../../models/Error';

export const itemError = (state: ItemError = new ItemError(), action: Actions): ItemError => {
  switch (action.type) {
    case 'ADD_ITEM_ERROR':
      return new ItemError({
        id: action.payload.errorId,
        message: action.payload.error,
        action: action.payload.action,
      });

    default:
      return state;
  }
};
