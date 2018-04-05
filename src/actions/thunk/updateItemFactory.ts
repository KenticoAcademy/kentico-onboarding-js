import { Uuid } from '../../models/Uuid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IUpdatedItem } from '../../models/interfaces/IUpdatedItem';
import { desyncItem } from '../actionCreators';
import { SyncOperation } from '../../models/enums/SyncOperation';
import { SyncState } from '../../models/enums/SyncState';
import {
  ITEM_UPDATE_START,
  ITEM_UPDATE_SUCCESS,
} from '../../constants/actionTypes';

export const requestItemUpdate = (item: IUpdatedItem): IAction => ({
  type: ITEM_UPDATE_START,
  payload: {
    item,
    itemSyncInfo: {
      id: item.id,
      operation: SyncOperation.Update,
      syncState: SyncState.Pending,
    },
  },
});

export const confirmItemUpdate = (id: Uuid): IAction => ({
  type: ITEM_UPDATE_SUCCESS,
  payload: {
    id,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Update,
      syncState: SyncState.Synced,
    },
  }
});

interface IUpdateItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export interface IUpdateItemActionParams {
  readonly id: Uuid;
  readonly text: string;
  readonly syncedText: string;
}

export const updateItemFactory = ({ httpClient, uri }: IUpdateItemFactoryDependencies) =>
  ({ id, text, syncedText }: IUpdateItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem: IUpdatedItem = { id, text, syncedText };
      const putUri = uri + id;

      dispatch(requestItemUpdate(updatedItem));

      return httpClient.put(putUri, { id, text })
        .then(() => dispatch(confirmItemUpdate(id)))
        .catch(() => dispatch(desyncItem(id)));
    };
