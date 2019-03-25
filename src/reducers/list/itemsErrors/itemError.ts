import * as ActionType from '../../../actions/ActionTypes';
import { IAction } from '../../../actions/IAction';
import { ItemError } from '../../../models/ItemError';

export const itemError = (state: ItemError = new ItemError(), action: IAction): ItemError => {
  switch (action.type) {
    case ActionType.ItemErrorWasRendered: {
      return state.with({ wasRendered: true });
    }

    case ActionType.FetchEditItemFailed:
    case ActionType.FetchDeleteItemFailed: {
      return state.with({
        id: action.payload.id,
        errorMessage: action.payload.errorMessage,
        wasRendered: false
      });
    }

    default:
      return state;
  }
};
