import { Actions } from '../../actions/types/itemsActionTypes';

export const error = (state: string = '', action: Actions): string => {
  switch (action.type) {
    case 'DISPLAY_ERROR':
      return action.payload.error;

    case 'LOADING_ITEMS_SUCCESS':
      return '';

    default:
      return state;
  }
};
