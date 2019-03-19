import {
  DeleteItemSuccessAction,
  AddItemErrorAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import {
  deleteItemSuccess,
  setItemSyncing,
} from '../itemsActions';
import { IItem } from '../../models/Item';

export interface IDeleteItemDependencies {
  readonly deleteItemRequest: (id: Guid) => Promise<IItem>;
  readonly createItemError: (message: string, itemId: Guid) => AddItemErrorAction;
}

export const deleteItemFactory = (dependencies: IDeleteItemDependencies) =>
  (id: Guid): Thunk =>
    async (dispatch: Dispatch): Promise<DeleteItemSuccessAction | AddItemErrorAction> => {
      dispatch(setItemSyncing(id, true));

      try {
        const deletedItem = await dependencies.deleteItemRequest(id);

        return dispatch(deleteItemSuccess(deletedItem.id));

      } catch (error) {
        return dispatch(dependencies.createItemError(
          'There was an error while deleting item: ' + error.message,
          id,
        ));
      }
    };
