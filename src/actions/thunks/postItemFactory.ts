import { IListAction } from '../types/IListAction';
import { createError } from '../../utils/errorsCreator';
import { addItem, addItemFail, addItemSuccess } from '../listActionCreators';
import { IFetchedItem } from '../../models/IFetchedItem';
import { Dispatch } from '../types/Dispatcher';
import { ErrorType } from '../../models/ErrorType';
import { generateId } from '../../utils/generateId';

interface IPostDeps {
  readonly createItem: (text: string) => Promise<IFetchedItem>;
}

export const postItemFactory =
  ({createItem}: IPostDeps) =>
    (text: string, currentId?: Uuid) =>
      async (dispatch: Dispatch): Promise<IListAction> => {
        const id = currentId ? currentId : generateId();
        dispatch(addItem(id, text));

        try {
          const fetchedItem: IFetchedItem = await createItem(text);

          return dispatch(addItemSuccess(id, fetchedItem.id));
        } catch (exception) {
          return dispatch(addItemFail(
            id,
            createError(ErrorType.ADD, id)),
          );
        }
      };
