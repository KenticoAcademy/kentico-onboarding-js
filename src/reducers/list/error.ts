import { Actions } from '../../actions/types/itemsActionTypes';

export const error = (state: string | null = null, action: Actions): string | null => {
  switch (action.type) {
    case 'DISPLAY_ERROR':
      return action.payload.error;

    case 'LOADING_ITEMS_SUCCESS':
      return null;

    default:
      return state;
  }
};
