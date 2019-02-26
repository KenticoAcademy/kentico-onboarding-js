import * as ActionType from '../../actions/ActionTypes';
import { IAction } from '../../actions/IAction';
import { ListStatus } from '../interfaces/ListStatus';

export const listStatus = (state: ListStatus = ListStatus.IsNotInitialized, action: IAction): ListStatus => {
  switch (action.type) {
    case ActionType.FetchItemsStarted:
      return ListStatus.IsBeingInitialized;

    case ActionType.FetchItemsSucceeded:
      return ListStatus.IsInitialized;

    case ActionType.FetchItemsFailed:
      return ListStatus.InitializationFailed;

    default:
      return state;
  }
};
