import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { itemSyncFailed as deleteItemFailed } from '../actionCreators';
import { SyncOperation } from '../../models/enums/SyncOperation';
import { SyncState } from '../../models/enums/SyncState';
import * as ActionTypes from '../../constants/actionTypes';

export const deleteItemRequest = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETE_START,
  payload: {
    id,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Delete,
      syncState: SyncState.Pending,
    },
  }
});

export const deleteItemConfirm = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_DELETE_SUCCESS,
  payload: {
    id,
  },
});

interface IDeleteItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export interface IDeleteItemActionParams {
  readonly id: Guid;
}

export const deleteItemFactory = (dependencies: IDeleteItemFactoryDependencies) =>
  ({ id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(deleteItemRequest(id));

      return dependencies.httpClient.delete(dependencies.uri + id)
        .then(() => dispatch(deleteItemConfirm(id)))
        .catch(() => dispatch(deleteItemFailed(id)));
    };
