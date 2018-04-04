import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { Guid } from '../../models/Guid';
import { INewItem } from '../../models/interfaces/INewItem';
import { itemSyncFailed as addNewItemFailed } from '../actionCreators';
import { IAddedItemConfirmed } from '../../models/interfaces/IAddedItemConfirmed';
import { SyncOperation } from '../../models/enums/SyncOperation';
import { SyncState } from '../../models/enums/SyncState';
import * as ActionTypes from '../../constants/actionTypes';

export const addNewItemRequest = ({ id, text }: INewItem): IAction => ({
  type: ActionTypes.ITEM_ADD_START,
  payload: {
    id,
    text,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Add,
      syncState: SyncState.Pending,
    },
  },
});

export const addNewItemConfirm = ({ oldId, updatedItem }: IAddedItemConfirmed) => ({
  type: ActionTypes.ITEM_ADD_SUCCESS,
  payload: {
    oldId,
    updatedItem,
  },
});

interface IPostItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly createNewId: () => Guid;
}

export interface IPostItemActionParams {
  readonly text: string;
  readonly givenId?: Guid;
}

export const postItemFactory = (dependencies: IPostItemFactoryDependencies) =>
  ({ text, givenId }: IPostItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const id = givenId || dependencies.createNewId();
      const newItem: INewItem = {
        id,
        text,
      };

      dispatch(addNewItemRequest(newItem));

      return dependencies.httpClient.post<IListItem>(
        dependencies.uri,
        {
          text,
        })
        .then(updatedItem => dispatch(addNewItemConfirm({
          oldId: id,
          updatedItem,
        })))
        .catch(() => dispatch(addNewItemFailed(id)));
    };
