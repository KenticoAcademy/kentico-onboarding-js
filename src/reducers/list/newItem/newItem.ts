import * as ActionType from '../../../actions/ActionTypes';
import { IAction } from '../../../actions/IAction';
import { ItemStatus } from '../../interfaces/ItemStatus';
import { NewItemProperties } from '../../../models/NewItemProperties';
import { newItemError } from './newItemError';

export const newItem = (state: NewItemProperties = new NewItemProperties(), action: IAction): NewItemProperties => {
  switch (action.type) {
    case ActionType.FetchAddItemStarted:
      return new NewItemProperties({
        status: ItemStatus.BeingProcessed,
        text: action.payload.text,
        error: newItemError(undefined, action),
      });

    case ActionType.FetchAddItemSucceeded:
      return state.with({
        status: ItemStatus.NothingIsHappening,
        text: '',
        error: newItemError(state.error, action)
      });

    case ActionType.FetchAddItemFailed:
      return state.with({
        status: ItemStatus.SavingFailed,
        error: newItemError(state.error, action)
      });

    case ActionType.NewItemErrorWasRendered:
      return state.with({
        error: newItemError(state.error, action)
      });


    default:
      return state;
  }
};
