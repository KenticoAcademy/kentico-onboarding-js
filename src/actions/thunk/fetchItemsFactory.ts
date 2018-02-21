import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IFetchItemsFactoryDependencies {
  readonly httpClient: IHttpClient;
  readonly requestItems: (uri: string) => IAction;
  readonly receiveItems: (items: IListItem[]) => IAction;
  readonly fetchFailed: () => IAction;
}

export interface IFetchItemsActionParams {
  readonly uri: string;
}

export const fetchItemsFactory = (deps: IFetchItemsFactoryDependencies) =>
  ({ uri }: IFetchItemsActionParams) =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(deps.requestItems(uri));

      return deps.httpClient.get<IListItem[]>(uri)
        .then(items => dispatch(deps.receiveItems(items)))
        .catch(() => dispatch(deps.fetchFailed()));
    };
