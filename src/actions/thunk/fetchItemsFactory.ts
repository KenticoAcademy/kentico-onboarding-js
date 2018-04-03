import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IFetchedItem } from '../../models/interfaces/IFetchedItem';
import {
  fetchFailed,
  receiveItems,
  requestItems,
} from '../actionCreators';

interface IFetchItemsFactoryDependencies {
  readonly uri: string;
  readonly httpClient: IHttpClient;
}

export const fetchItemsFactory = ({ uri, ...dependencies }: IFetchItemsFactoryDependencies) =>
  () =>
    (dispatch: Dispatch<IAction>) => {
      dispatch(requestItems());

      return dependencies.httpClient.get<IFetchedItem[]>(uri)
        .then(items => dispatch(receiveItems(items)))
        .catch(() => dispatch(fetchFailed()));
    };
