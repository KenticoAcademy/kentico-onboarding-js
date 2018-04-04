import { Dispatch } from 'redux';
import { IAction } from '../../models/interfaces/IAction';
import { IHttpClient } from '../../models/interfaces/IHttpClient';
import { IFetchedItem } from '../../models/interfaces/IFetchedItem';
import * as ActionTypes from '../../constants/actionTypes';

export const startFetchingItems = (): IAction => ({
  type: ActionTypes.ITEMS_FETCH_START,
  payload: undefined,
});

export const receiveFetchedItems = (items: IFetchedItem[]): IAction => ({
  type: ActionTypes.ITEMS_FETCH_SUCCESS,
  payload: {
    items,
  }
});

export const notifyFailedItemsFetching = (): IAction => ({
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
      dispatch(startFetchingItems());

      return dependencies.httpClient.get<IFetchedItem[]>(uri)
        .then(items => dispatch(receiveFetchedItems(items)))
        .catch(() => dispatch(notifyFailedItemsFetching()));
    };
