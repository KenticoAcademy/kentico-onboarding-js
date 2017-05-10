import { ITEMS_FETCHING_SUCCESS, ITEMS_FETCHING_STARTED } from './actionTypes';
import { Fetch } from './Fetch';
import { Dispatch } from '../stores/Dispatch';
import { IAction } from './IAction';
import { Item } from '../models/Item';
import { receiveItemsFetchingError } from './actionCreators';
import { parseResponse } from '../utils/parseResponse';

const requestItems = () => ({
  type: ITEMS_FETCHING_STARTED,
  payload: {},
});

const receiveItems = (json: any): IAction => ({
  type: ITEMS_FETCHING_SUCCESS,
  payload: {
    items: json.map((item: Item) => item as Item),
  },
});

const fetchItems = (fetch: Fetch) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());
    return fetch('api/v1/Items/')
      .then(parseResponse(': Loading the Item list did not go well'))
      .then((json: JSON) => dispatch(receiveItems(json)))
      .catch((error: Error) => dispatch(receiveItemsFetchingError(error)));
  };
};

const fetchItemsFactory = (fetchData: Fetch) =>
  () => fetchItems(fetchData);

export { fetchItemsFactory }
