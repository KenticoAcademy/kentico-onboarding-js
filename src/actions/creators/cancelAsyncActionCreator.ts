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

export const cancelAsyncActionCreator = (itemId: Guid) =>
  (dispatch: Dispatch, getState: () => IAppState): Actions | undefined => {
    const item: IItem = getState().list.items.get(itemId);
    const error: IError = getState().list.itemErrors.get(item.errorId);
    dispatch(deleteItemError(error.id));

    switch (error.action) {
      case 'POST':
        return dispatch(deleteItemSuccess(itemId));

      case 'PUT':
        return dispatch(cancelItemUpdating(itemId));

      case 'DELETE':
        return;

      default:
        throw Error('Unknown error action: ' + error.action);
    }
  };
