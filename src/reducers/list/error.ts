import { Actions } from '../../actions/types/itemsActionTypes';

export const error = (_: string = '', action: Actions): string => {
  switch (action.type) {
    case 'FETCH_ERROR':
      return action.payload.error;
    default:
      return '';
  }
};
