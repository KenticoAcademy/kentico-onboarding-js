import { IError } from '../../models/ListError';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { closeAddError, closeDeleteError, closeSaveError } from '../listActionCreators';
import { ErrorType } from '../../models/ErrorType';
import { IStore } from '../../store/types/IStore';

export const closeError = (error: IError) =>
  (dispatch: Dispatch, getState: () => IStore): IListAction => {
    const backupText = getState().backupTexts.get(error.itemId);

    switch (error.action) {
      case ErrorType.ADD:
        return dispatch(closeAddError(error.itemId));

      case ErrorType.DELETE:
        return dispatch(closeDeleteError(error.itemId));

      case ErrorType.SAVE:
        return dispatch(closeSaveError(error.itemId, backupText));

      default:
        throw new Error('Invalid action was dispatched.');
    }
  };
