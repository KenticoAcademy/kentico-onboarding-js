import { OrderedMap } from 'immutable';
import { Actions } from '../../actions/types/itemsActionTypes';
import { IErrorsState } from '../../store/state/IErrorsState';
import { ItemError } from '../../models/Error';
import { itemError } from './itemError';

export const itemErrors = (state: IErrorsState = OrderedMap(), action: Actions): IErrorsState => {
  switch (action.type) {
    case 'ADD_ITEM_ERROR': {
      const newError = itemError(new ItemError(), action);
      return state.set(newError.id, newError);
    }

    case 'POST_ITEM_SUCCESS':
    case 'PUT_ITEM_SUCCESS':
    case 'DELETE_ITEM_SUCCESS':
    case 'DELETE_ITEM_ERROR':
    case 'CANCEL_ITEM_UPDATING':
      return state.delete(action.payload.errorId);

    default:
      return state;
  }
};
