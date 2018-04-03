import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import {
  deleteItemConfirm,
  deleteItemRequest,
  itemSyncFailed as deleteItemFailed,
} from '../actionCreators';

interface IDeleteItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export interface IDeleteItemActionParams {
  readonly id: Guid;
}

export const deleteItemFactory = (dependencies: IDeleteItemFactoryDependencies) =>
  ({ id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(deleteItemRequest(id));

      return dependencies.httpClient.delete(dependencies.uri + id)
        .then(() => dispatch(deleteItemConfirm(id)))
        .catch(() => dispatch(deleteItemFailed(id)));
    };
