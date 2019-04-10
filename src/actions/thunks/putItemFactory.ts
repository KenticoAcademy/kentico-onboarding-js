import { IListAction } from '../types/IListAction';
import { IFetchedItem } from '../../models/IFetchedItem';
import { Dispatch } from '../types/Dispatcher';
import { createError } from '../../utils/errorsCreator';
import { saveItem, saveItemFail, saveItemSuccess } from '../listActionCreators';
import { IStore } from '../../store/types/IStore';
import { ErrorType } from '../../models/ErrorType';

interface IPutDeps {
  readonly updateItem: (id: Uuid, text: string) => Promise<IFetchedItem>;
}

export const putItemFactory =
  ({updateItem}: IPutDeps) =>
    (id: Uuid, text: string) =>
      async (dispatch: Dispatch, getState: () => IStore): Promise<IListAction> => {
        const currentText = getState().items.get(id).text;
        const backupText = getState().backupTexts.get(id);
        dispatch(saveItem(id, text, backupText ? backupText : currentText));

        try {
          const fetchedItem: IFetchedItem = await updateItem(id, text);

          return dispatch(saveItemSuccess(fetchedItem.id));
        } catch (exception) {
          return dispatch(saveItemFail(
            id,
            createError(ErrorType.SAVE, id)),
          );
        }
      };
