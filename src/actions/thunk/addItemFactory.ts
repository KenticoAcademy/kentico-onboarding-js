import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { Uuid } from '../../models/Uuid';
import { INewItem } from '../../models/interfaces/INewItem';
import { desyncItem } from '../actionCreators';
import { IAddedItemConfirmed } from '../../models/interfaces/IAddedItemConfirmed';
import { SyncOperation } from '../../models/enums/SyncOperation';
import { SyncState } from '../../models/enums/SyncState';
import * as ActionTypes from '../../constants/actionTypes';

export const requestItemAddition = ({ id, text }: INewItem): IAction => ({
  type: ActionTypes.ITEM_ADD_START,
  payload: {
    id,
    text,
    itemSyncInfo: {
      id,
      operation: SyncOperation.Add,
      syncState: SyncState.Pending,
    },
  },
});

export const confirmItemAddition = ({ oldId, updatedItem }: IAddedItemConfirmed) => ({
  type: ActionTypes.ITEM_ADD_SUCCESS,
  payload: {
    oldId,
    updatedItem,
  },
});

interface IAddItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly createNewId: () => Uuid;
}

export interface IAddItemActionParams {
  readonly text: string;
  readonly givenId?: Uuid;
}

export const addItemFactory = (dependencies: IAddItemFactoryDependencies) =>
  ({ text, givenId }: IAddItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      const id = givenId || dependencies.createNewId();
      const newItem: INewItem = {
        id,
        text,
      };

      dispatch(requestItemAddition(newItem));

      return dependencies.httpClient.post<IListItem>(
        dependencies.uri,
        {
          text,
        })
        .then(updatedItem => dispatch(confirmItemAddition({
          oldId: id,
          updatedItem,
        })))
        .catch(() => dispatch(desyncItem(id)));
    };
