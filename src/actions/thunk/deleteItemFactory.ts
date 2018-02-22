import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IItemSyncRequest } from '../../models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../models/enums/SyncOperation';

interface IDeleteItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly deleteItem: (id: Guid) => IAction;
  readonly closeItem: (id: Guid) => IAction;
  readonly itemSyncRequested: (itemSyncRequest: IItemSyncRequest) => IAction;
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

      dispatch(deps.itemSyncRequested(itemSyncRequest));
      dispatch(deps.closeItem(id));

      return deps.httpClient.delete(deps.uri + id)
        .then(() => dispatch(deps.deleteItem(id)))
        .catch(() => dispatch(deps.itemSyncFailed(itemSyncRequest)));
    };
