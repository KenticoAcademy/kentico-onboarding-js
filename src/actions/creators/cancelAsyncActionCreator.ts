import { Dispatch } from 'redux';
import { IAppState } from '../../store/state/IAppState';
import { IItem } from '../../models/Item';
import { IError } from '../../models/Error';
import { cancelItemUpdating, deleteItemError, deleteItemSuccess } from '../itemsActions';

export const cancelAsyncActionCreator = (itemId: Guid) =>
  (dispatch: Dispatch, getState: () => IAppState) => {
    const item: IItem = getState().list.items.get(itemId);
    const error: IError = getState().list.itemErrors.get(item.errorId);

    switch (error.action) {
      case 'POST':
        return dispatch(deleteItemSuccess(itemId, error.id));

      case 'PUT':
        return dispatch(cancelItemUpdating(itemId, error.id));

      case 'DELETE':
        return dispatch(deleteItemError(error.id));

      default:
        return;
    }
  };
