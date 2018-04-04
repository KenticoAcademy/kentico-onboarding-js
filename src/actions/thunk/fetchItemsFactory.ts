import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IFetchedItem } from '../../models/interfaces/IFetchedItem';
import * as ActionTypes from '../../constants/actionTypes';

export const requestItems = (): IAction => ({
  type: ActionTypes.ITEMS_FETCH_START,
  payload: undefined,
});

export const receiveItems = (items: IFetchedItem[]): IAction => ({
  type: ActionTypes.ITEMS_FETCH_SUCCESS,
  payload: {
    items,
  }
});

export const fetchFailed = (): IAction => ({
  type: ActionTypes.ITEMS_FETCH_FAILED,
  payload: undefined,
});

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
