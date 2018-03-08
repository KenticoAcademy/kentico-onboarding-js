import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IItemSyncRequest } from '../../models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../models/enums/SyncOperation';

interface IDeleteItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly deleteItemRequest: (id: Guid, itemSyncRequest: IItemSyncRequest) => IAction;
  readonly deleteItemConfirm: (id: Guid) => IAction;
  readonly deleteItemFailed: (itemSyncRequest: IItemSyncRequest) => IAction;
}

export interface IDeleteItemActionParams {
  readonly id: Guid;
}

export const deleteItemFactory = (dependencies: IDeleteItemFactoryDependencies) =>
  ({ id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const itemSyncRequest: IItemSyncRequest = {
        id,
        operation: SyncOperation.Delete,
      };

      dispatch(dependencies.deleteItemRequest(id, itemSyncRequest));

      return dependencies.httpClient.delete(dependencies.uri + id)
        .then(() => dispatch(dependencies.deleteItemConfirm(id)))
        .catch(() => dispatch(dependencies.deleteItemFailed(itemSyncRequest)));
    };
