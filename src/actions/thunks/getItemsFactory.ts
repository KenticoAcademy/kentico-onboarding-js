import { IListAction } from '../types/IListAction';
import { Dispatch } from '../types/Dispatcher';
import { ItemsState } from '../../store/types/ItemsState';
import { itemsFetchFail, itemsFetchSuccess, requestItems } from '../listActionCreators';

interface IGetDeps {
  readonly obtainItems: () => Promise<ItemsState>;
}

export const getItemsFactory =
  ({obtainItems}: IGetDeps) =>
    () =>
      async (dispatch: Dispatch): Promise<IListAction> => {
        dispatch(requestItems());

        try {
          const items: ItemsState = await obtainItems();

          return dispatch(itemsFetchSuccess(items));
        } catch (exception) {
          return dispatch(itemsFetchFail());
        }
      };
