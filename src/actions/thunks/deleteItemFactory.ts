import { IListAction } from '../types/IListAction';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { deleteItemFail, deleteItemSuccess, initItemDelete } from '../listActionCreators';
import { ErrorType } from '../../models/ErrorType';

interface IDeleteDeps {
  readonly removeItem: (id: Uuid) => Promise<void>;
}

export const deleteItemFactory =
  ({removeItem}: IDeleteDeps) =>
    (id: Uuid) =>
      async (dispatch: Dispatch): Promise<IListAction> => {
        dispatch(initItemDelete(id));

        try {
          await removeItem(id);

          return dispatch(deleteItemSuccess(id));
        } catch (exception) {
          return dispatch(deleteItemFail(
            id,
            createError(ErrorType.DELETE, id)),
          );
        }
      };
