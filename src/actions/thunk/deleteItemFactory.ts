import { Guid } from '../../models/Guid';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IDeleteItemFactoryDependencies {
  readonly httpClient: IHttpClient;
  readonly deleteItem: (id: Guid) => IAction;
}

export interface IDeleteItemActionParams {
  readonly uri: string;
  readonly id: Guid;
}

export const deleteItemFactory = (deps: IDeleteItemFactoryDependencies) =>
  ({ uri, id }: IDeleteItemActionParams) =>
    (dispatch: Dispatch<IAction>) => deps.httpClient.delete(uri + id)
      .then(() => dispatch(deps.deleteItem(id)));
