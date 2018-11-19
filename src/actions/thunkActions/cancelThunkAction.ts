import { Dispatch } from 'redux';
import { IAppState } from '../../store/state/IAppState';
import { IItem } from '../../models/Item';
import { IError } from '../../models/Error';
import { Actions } from '../types/itemsActionTypes';
import {
  cancelItemUpdating,
  deleteItemError,
  deleteItemSuccess,
} from '../itemsActions';
import { ErrorAction } from '../types/ErrorAction';

export const cancelThunkAction = (itemId: Guid) =>
  (dispatch: Dispatch, getState: () => IAppState): Actions | void => {
    const item: IItem = getState().list.items.get(itemId);
    const error: IError = getState().list.itemErrors.get(item.errorId);
    dispatch(deleteItemError(error.id));

    switch (error.action) {
      case ErrorAction.Add:
        return dispatch(deleteItemSuccess(itemId));

      case ErrorAction.Update:
        return dispatch(cancelItemUpdating(itemId, error.oldText));

      case ErrorAction.Delete:
        return;

      default:
        throw Error('Unknown error action: ' + error.action);
    }
  };
