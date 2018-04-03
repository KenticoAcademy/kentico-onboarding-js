import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { Guid } from '../../models/Guid';
import { INewItem } from '../../models/interfaces/INewItem';
import {
  addNewItemConfirm,
  addNewItemRequest,
  itemSyncFailed as addNewItemFailed,
} from '../actionCreators';

interface IPostItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly createNewId: () => Guid;
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

      dispatch(addNewItemRequest(newItem));

      return dependencies.httpClient.post<IListItem>(
        dependencies.uri,
        {
          text,
        })
        .then(updatedItem => dispatch(addNewItemConfirm({
          oldId: id,
          updatedItem,
        })))
        .catch(() => dispatch(addNewItemFailed(id)));
    };
