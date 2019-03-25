import { Map } from 'immutable';
import * as ActionType from '../../../actions/ActionTypes';
import { ItemError } from '../../../models/ItemError';
import { IAction } from '../../../actions/IAction';
import { itemError } from './itemError';

export const itemsErrors = (state = Map<Uuid, ItemError>(), action: IAction): Map<Uuid, ItemError> => {
  switch (action.type) {
    case ActionType.FetchEditItemFailed:
    case ActionType.FetchDeleteItemFailed:
    case ActionType.ItemErrorWasRendered: {
      const existingItem = state.get(action.payload.id);
      const editedItem = itemError(existingItem, action);
      return state.set(action.payload.id, editedItem);
    }

    case ActionType.FetchDeleteItemSucceeded:
    case ActionType.FetchEditItemSucceeded:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};
