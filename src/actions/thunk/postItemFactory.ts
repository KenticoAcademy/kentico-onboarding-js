import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { Guid } from '../../models/Guid';
import { IAddedItemConfirmed } from '../../models/interfaces/IAddedItemConfirmed';
import { INewItem } from '../../models/interfaces/INewItem';

interface IPostItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly createNewId: () => Guid;
  readonly addNewItemRequest: (item: INewItem) => IAction;
  readonly addNewItemConfirm: (addedItemConfirmation: IAddedItemConfirmed) => IAction;
  readonly addNewItemFailed: (id: Guid) => IAction;
}

export interface IPostItemActionParams {
  readonly text: string;
  readonly givenId?: Guid;
}

export const postItemFactory = (dependencies: IPostItemFactoryDependencies) =>
  ({ text, givenId }: IPostItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const id = givenId || dependencies.createNewId();
      const newItem: INewItem = {
        id,
        text,
      };

      dispatch(dependencies.addNewItemRequest(newItem));

      return dependencies.httpClient.post<IListItem>(
        dependencies.uri,
        {
          text,
        })
        .then(updatedItem => dispatch(dependencies.addNewItemConfirm({
          oldId: id,
          updatedItem,
        })))
        .catch(() => dispatch(dependencies.addNewItemFailed(id)));
    };
