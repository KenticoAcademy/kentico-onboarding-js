import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IFetchItemsFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly requestItems: () => IAction;
  readonly receiveItems: (items: IListItem[]) => IAction;
  readonly fetchFailed: () => IAction;
}

export const fetchItemsFactory = ({ uri, ...dependencies }: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(dependencies.requestItems());

      return dependencies.httpClient.get<IListItem[]>(uri)
        .then(items => dispatch(dependencies.receiveItems(items)))
        .catch(() => dispatch(dependencies.fetchFailed()));
    };
