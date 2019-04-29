import * as ActionType from '../../../actions/ActionTypes';
import { IAction } from '../../../actions/IAction';
import { NewItemError } from '../../../models/NewItemError';

export const newItemError = (state: NewItemError = new NewItemError(), action: IAction): NewItemError => {
  switch (action.type) {
    case ActionType.NewItemErrorWasRendered: {
      return state.with({ wasRendered: true });
    }

    case ActionType.FetchAddItemFailed: {
      return state.with({ errorMessage: action.payload.errorMessage, wasRendered: false });
    }

    case ActionType.FetchAddItemSucceeded: {
      return state.with({ errorMessage: '', wasRendered: false });
    }

    default:
      return state;
  }
};
