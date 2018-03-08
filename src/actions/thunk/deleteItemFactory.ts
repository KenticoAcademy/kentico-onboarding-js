import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IDeleteItemFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly deleteItemRequest: (id: Guid) => IAction;
  readonly deleteItemConfirm: (id: Guid) => IAction;
  readonly deleteItemFailed: (id: Guid) => IAction;
}

export interface IDeleteItemActionParams {
  readonly id: Guid;
}

export const deleteItemFactory = (dependencies: IDeleteItemFactoryDependencies) =>
  ({ id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(dependencies.deleteItemRequest(id));

      return dependencies.httpClient.delete(dependencies.uri + id)
        .then(() => dispatch(dependencies.deleteItemConfirm(id)))
        .catch(() => dispatch(dependencies.deleteItemFailed(id)));
    };
