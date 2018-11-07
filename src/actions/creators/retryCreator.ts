import { IAppState } from '../../store/state/IAppState';
import { IError } from '../../models/Error';
import { IItem } from '../../models/Item';
import { deleteItemSuccess, deleteItemError } from '../itemsActions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  Actions,
  AddItemErrorAction,
  DeleteItemSuccessAction,
  PostItemSuccessAction,
  PutItemSuccessAction,
} from '../types/itemsActionTypes';

export const retryCreator = (
  deleteItemRequest: (itemId: Guid) => ThunkAction<Promise<DeleteItemSuccessAction | AddItemErrorAction>, void, void, Actions>,
  postItemRequest: (text: string) => ThunkAction<Promise<PostItemSuccessAction | AddItemErrorAction>, void, void, Actions>,
  putItemRequest: (item: IItem) => ThunkAction<Promise<PutItemSuccessAction | AddItemErrorAction>, void, void, Actions>,
) =>
  (itemId: Guid) =>
    (dispatch: ThunkDispatch<IAppState, void, Actions>, getState: () => IAppState): Promise<Actions> => {
      const item: IItem = getState().list.items.get(itemId);
      const error: IError = getState().list.itemErrors.get(item.errorId);
      dispatch(deleteItemError(error.id));

      switch (error.action) {
        case 'DELETE':
          return dispatch(deleteItemRequest(itemId));

        case 'POST':
          dispatch(deleteItemSuccess(itemId));
          return dispatch(postItemRequest(item.text));

        case 'PUT':
          return dispatch(putItemRequest(item));

        default:
          throw Error('Unknown error action: ' + error.action);
      }
    };
