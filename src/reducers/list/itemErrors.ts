import { OrderedMap } from 'immutable';
import { Actions } from '../../actions/types/itemsActionTypes';
import { IErrorsState } from '../../store/state/IErrorsState';
import { ItemError } from '../../models/Error';

export const itemErrors = (state: IErrorsState = OrderedMap(), action: Actions): IErrorsState => {
  switch (action.type) {
    case 'ADD_ITEM_ERROR': {
      const newError = new ItemError(action.payload.error);
      return state.set(newError.id, newError);
    }

    case 'DELETE_ITEM_ERROR':
      return state.delete(action.payload.errorId);

    default:
      return state;
  }
};
