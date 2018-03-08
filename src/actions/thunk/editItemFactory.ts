import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IItemSyncRequest } from '../../models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../models/enums/SyncOperation';

interface IEditItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly saveItemChangesRequest: (id: Guid, text: string, itemSyncRequest: IItemSyncRequest) => IAction;
  readonly saveItemChangesConfirm: (itemSyncRequest: IItemSyncRequest) => IAction;
  readonly saveItemChangesFailed: (itemSyncRequest: IItemSyncRequest) => IAction;
}

export interface IEditItemActionParams {
  readonly id: Guid;
  readonly text: string;
}

export const editItemFactory = (dependencies: IEditItemFactoryDependencies) =>
  ({ id, text }: IEditItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const updatedItem = {
        text,
        isBeingEdited: false,
        id,
      };

      const itemSyncRequest: IItemSyncRequest = {
        id,
        operation: SyncOperation.Modify,
      };

      dispatch(dependencies.saveItemChangesRequest(id, text, itemSyncRequest));

      return dependencies.httpClient.patch(dependencies.uri + id, updatedItem)
        .then(() => dispatch(dependencies.saveItemChangesConfirm(itemSyncRequest)))
        .catch(() => dispatch(dependencies.saveItemChangesFailed(itemSyncRequest)));
    };
