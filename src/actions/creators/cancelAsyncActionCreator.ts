import { Dispatch } from 'redux';
import { IAppState } from '../../store/state/IAppState';
import { IItem } from '../../models/Item';
import { IError } from '../../models/Error';
import { cancelItemUpdating, deleteItemError, deleteItemSuccess } from '../itemsActions';
import { Actions } from '../types/itemsActionTypes';

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

      default:
        return;
    }
  };
