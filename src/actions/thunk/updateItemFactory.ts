import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IUpdatedItem } from '../../models/interfaces/IUpdatedItem';
import { desyncItem } from '../actionCreators';
import { SyncOperation } from '../../models/enums/SyncOperation';
import { SyncState } from '../../models/enums/SyncState';
import * as ActionTypes from '../../constants/actionTypes';

export const requestItemUpdate = (item: IUpdatedItem): IAction => ({
  type: ActionTypes.ITEM_UPDATE_START,
  payload: {
    item,
    itemSyncInfo: {
      id: item.id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Pending,
    },
  },
});

export const confirmItemUpdate = (id: Guid): IAction => ({
  type: ActionTypes.ITEM_UPDATE_SUCCESS,
  payload: {
    id,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Modify,
      syncState: SyncState.Synced,
    },
  }
});

interface IUpdateItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export interface IUpdateItemActionParams {
  readonly id: Guid;
  readonly text: string;
  readonly syncedText: string;
}

export const updateItemFactory = (dependencies: IUpdateItemFactoryDependencies) =>
  ({ id, text, syncedText }: IUpdateItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem: IUpdatedItem = {
        id,
        text,
        syncedText,
      };
      dispatch(requestItemUpdate(updatedItem));

      return dependencies.httpClient.put(dependencies.uri + id, {
        id,
        text,
      })
        .then(() => dispatch(confirmItemUpdate(id)))
        .catch(() => dispatch(desyncItem(id)));
    };
