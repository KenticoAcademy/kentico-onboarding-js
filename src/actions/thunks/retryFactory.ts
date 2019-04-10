import { IError } from '../../models/ListError';
import { Dispatch } from '../types/Dispatcher';
import { IListAction } from '../types/IListAction';
import { IStore } from '../../store/types/IStore';
import { ThunkAction } from 'redux-thunk';
import { ErrorType } from '../../models/ErrorType';

interface IRetryActions {
  readonly postItem: (text: string, id: Uuid) => ThunkAction<Promise<IListAction>, IStore, undefined, IListAction>;
  readonly deleteItem: (id: Uuid) => ThunkAction<Promise<IListAction>, IStore, undefined, IListAction>;
  readonly putItem: (id: Uuid, text: string) => ThunkAction<Promise<IListAction>, IStore, undefined, IListAction>;
}

export const retryFactory =
  ({postItem, deleteItem, putItem}: IRetryActions) =>
    (error: IError) =>
      (dispatch: Dispatch, getState: () => IStore): Promise<IListAction> => {
        const item = getState().items.get(error.itemId);

        switch (error.action) {
          case ErrorType.ADD:
            return dispatch(postItem(item.text, item.id));

          case ErrorType.DELETE:
            return dispatch(deleteItem(item.id));

          case ErrorType.SAVE:
            return dispatch(putItem(item.id, item.text));

          default:
            throw new Error('Invalid action was dispatched.');
        }
      };
