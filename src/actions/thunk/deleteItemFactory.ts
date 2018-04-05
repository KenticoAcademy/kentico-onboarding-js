import { Uuid } from '../../models/Uuid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { desyncItem } from '../actionCreators';
import { SyncOperation } from '../../models/enums/SyncOperation';
import { SyncState } from '../../models/enums/SyncState';
import {
  ITEM_DELETE_START,
  ITEM_DELETE_SUCCESS,
} from '../../constants/actionTypes';

export const requestItemDeletion = (id: Uuid): IAction => ({
  type: ITEM_DELETE_START,
  payload: {
    id,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Delete,
      syncState: SyncState.Pending,
    },
  }
});

export const confirmItemDeletion = (id: Uuid): IAction => ({
  type: ITEM_DELETE_SUCCESS,
  payload: { id },
});

interface IDeleteItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export interface IDeleteItemActionParams {
  readonly id: Uuid;
}

export const deleteItemFactory = ({ uri, httpClient }: IDeleteItemFactoryDependencies) =>
  ({ id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(requestItemDeletion(id));

      const deleteUri = uri + id;

      return httpClient.delete(deleteUri)
        .then(() => dispatch(confirmItemDeletion(id)))
        .catch(() => dispatch(desyncItem(id)));
    };
