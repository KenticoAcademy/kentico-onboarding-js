import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IFetchedItem } from '../../models/interfaces/IFetchedItem';

interface IFetchItemsFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly requestItems: () => IAction;
  readonly receiveItems: (items: IFetchedItem[]) => IAction;
  readonly fetchFailed: () => IAction;
}

export const fetchItemsFactory = ({ uri, ...dependencies }: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(dependencies.requestItems());

      return dependencies.httpClient.get<IFetchedItem[]>(uri)
        .then(items => dispatch(dependencies.receiveItems(items)))
        .catch(() => dispatch(dependencies.fetchFailed()));
    };
