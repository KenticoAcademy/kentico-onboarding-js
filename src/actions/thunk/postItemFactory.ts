import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { Guid } from '../../models/Guid';
import { IAddedItemConfirmed } from '../../models/interfaces/IAddedItemConfirmed';
import { IItemSyncRequest } from '../../models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../models/enums/SyncOperation';

interface IPostItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly createNewId: () => Guid;
  readonly addNewItemRequest: (item: Partial<IListItem>, itemSyncRequest: IItemSyncRequest) => IAction;
  readonly addNewItemConfirm: (addedItemConfirmation: IAddedItemConfirmed) => IAction;
  readonly addNewItemFailed: (itemSyncRequest: IItemSyncRequest) => IAction;
}

export interface IPostItemActionParams {
  readonly text: string;
  readonly givenId?: Guid;
}

export const postItemFactory = (dependencies: IPostItemFactoryDependencies) =>
  ({ text, givenId }: IPostItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const id = givenId || dependencies.createNewId();
      const newItem = {
        id,
        text,
      };

      const itemSyncRequest: IItemSyncRequest = {
        id,
        operation: SyncOperation.Add,
      };

      dispatch(dependencies.addNewItemRequest(newItem, itemSyncRequest));

      return dependencies.httpClient.post<IListItem>(
        dependencies.uri,
        {
          text,
        })
        .then(({ id: newId }) => dispatch(dependencies.addNewItemConfirm({
          id,
          newId,
        })))
        .catch(() => dispatch(dependencies.addNewItemFailed(itemSyncRequest)));
    };
