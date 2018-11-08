import { IItem } from '../../models/Item';
import { ThunkAction } from 'redux-thunk';
import {
  Actions,
  AddItemErrorAction,
  PutItemSuccessAction,
} from '../types/itemsActionTypes';
import { Dispatch } from 'redux';
import { putItemSuccess, saveItemText } from '../itemsActions';

export const putItemCreator = (
  fetch: Fetch,
  addItemError: (itemId: Guid, error: string, action: ErrorAction) => AddItemErrorAction,
) =>
  (item: IItem): ThunkAction<Promise<PutItemSuccessAction | AddItemErrorAction>, void, void, Actions> =>
    async (dispatch: Dispatch): Promise<PutItemSuccessAction | AddItemErrorAction> => {
      dispatch(saveItemText(item.id, item.text));

      try {
        await fetch(`/${item.id}`, {
          method: 'PUT',
          body: JSON.stringify({id: item.id, text: item.text}),
        });

        return dispatch(putItemSuccess(item.id));

      } catch (error) {
        return dispatch(addItemError(item.id, 'There was an error while saving item: ' + error.message, 'PUT'));
      }
    };
