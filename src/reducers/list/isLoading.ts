import { Actions } from '../../actions/types/itemsActionTypes';

export const isLoading = (state: boolean = true, action: Actions): boolean => {
  switch (action.type) {
    case 'FETCH_ITEMS_SUCCESS':
      return false;
    default:
      return state;
  }
};
