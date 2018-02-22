import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';

interface IFetchItemsFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
  readonly requestItems: (uri: string) => IAction;
  readonly receiveItems: (items: IListItem[]) => IAction;
  readonly fetchFailed: () => IAction;
}


export const fetchItemsFactory = ({ uri, ...deps }: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(deps.requestItems(uri));

      return deps.httpClient.get<IListItem[]>(uri)
        .then(items => dispatch(deps.receiveItems(items)))
        .catch(() => dispatch(deps.fetchFailed()));
    };
