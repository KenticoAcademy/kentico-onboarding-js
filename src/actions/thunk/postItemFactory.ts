import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { Guid } from '../../models/Guid';
import { IAddedItemConfirmed } from '../../models/interfaces/IAddedItemConfirmed';
import { IItemSyncRequest } from '../../models/interfaces/IItemSyncRequest';
import { SyncOperation } from '../../models/enums/SyncOperation';

interface IPostItemFactoryDependencies {
  readonly httpClient: IHttpClient;
  readonly addNewItem: (item: Partial<IListItem>) => IAction;
  readonly createNewId: () => Guid;
  readonly itemSyncFailed: (itemSyncRequest: IItemSyncRequest) => IAction;
  readonly confirmAddedItem: (addedItemConfirmation: IAddedItemConfirmed) => IAction;
}

export interface IPostItemActionParams {
  readonly uri: string;
  readonly text: string;
  readonly givenId?: Guid;
}

export const postItemFactory = (deps: IPostItemFactoryDependencies) =>
  ({ uri, text, givenId }: IPostItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const id = givenId || deps.createNewId();
      const newItem = {
        id,
        text,
        uri,
      };

      const itemSyncRequest: IItemSyncRequest = {
        id,
        operation: SyncOperation.Add,
        uri,
      };

      dispatch(deps.addNewItem(newItem));

      return deps.httpClient.post<IListItem>(
        uri,
        {
          text,
        })
        .then(({ id: newId }) => dispatch(deps.confirmAddedItem({
          id,
          newId,
        })))
        .catch(() => dispatch(deps.itemSyncFailed(itemSyncRequest)));
    };
