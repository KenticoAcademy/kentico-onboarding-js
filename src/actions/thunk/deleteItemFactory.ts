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
  readonly itemSyncFailed: (itemSyncRequest: IItemSyncRequest) => IAction;
}

export interface IDeleteItemActionParams {
  readonly id: Guid;
}

export const deleteItemFactory = (deps: IDeleteItemFactoryDependencies) =>
  ({ id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const itemSyncRequest: IItemSyncRequest = {
        id,
        operation: SyncOperation.Delete,
      };

      dispatch(deps.deleteItemRequest(id, itemSyncRequest));

      return deps.httpClient.delete(deps.uri + id)
        .then(() => dispatch(deps.deleteItemConfirm(id)))
        .catch(() => dispatch(deps.itemSyncFailed(itemSyncRequest)));
    };
