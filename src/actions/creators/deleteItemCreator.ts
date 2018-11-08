import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  DeleteItemSuccessAction,
  AddItemErrorAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { deleteItemSuccess, setItemSyncing } from '../itemsActions';

export const deleteItemCreator = (
  fetch: Fetch,
  addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction,
) =>
  (id: Guid): ThunkAction<Promise<DeleteItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    async (dispatch: Dispatch): Promise<DeleteItemSuccessAction | AddItemErrorAction> => {
      dispatch(setItemSyncing(id, true));

      try {
        const response: Response = await fetch(`/${id}`, {method: 'DELETE'});
        const json = await response.json();

        return dispatch(deleteItemSuccess(json.id));

      } catch (error) {
        return dispatch(addItemError(id, 'There was an error while deleting item: ' + error.message, 'DELETE'));
      }
    };
