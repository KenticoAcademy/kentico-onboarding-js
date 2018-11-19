import { IAppState } from '../../store/state/IAppState';
import { deleteItemError } from '../itemsActions';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../types/itemsActionTypes';
import { ErrorAction } from '../types/ErrorAction';

export interface IRetryDependencies {
  readonly deleteItemThunk: (itemId: Guid) => Thunk;
  readonly repostItemThunk: (tempId: Guid, text: string) => Thunk;
  readonly putItemThunk: (id: Guid, text: string, oldText?: string) => Thunk;
}

export const retryThunkActionFactory = (dependencies: IRetryDependencies) =>
  (itemId: Guid): Thunk<Promise<Actions> | void> =>
    (dispatch: ThunkDispatch<IAppState, void, Actions>, getState: () => IAppState): Promise<Actions> | void => {
      const item = getState().list.items.get(itemId);
      const error = getState().list.itemErrors.get(item.errorId);
      dispatch(deleteItemError(error.id));

      switch (error.action) {
        case ErrorAction.Delete:
          return dispatch(dependencies.deleteItemThunk(itemId));

        case ErrorAction.Add:
          return dispatch(dependencies.repostItemThunk(itemId, item.text));

        case ErrorAction.Update:
          return dispatch(dependencies.putItemThunk(item.id, item.text, error.oldText));

        default:
          throw Error('Unknown error action: ' + error.action);
      }
    };
