import { RECEIVE_ITEMS, REQUEST_ITEMS } from './actionTypes';
import { Fetch } from './Fetch';
import { Dispatch } from '../stores/Dispatch';
import { IAction } from './IAction';
import { Item } from '../models/Item';
import { receiveError } from './actionCreators';

const requestItems = () => ({
  type: REQUEST_ITEMS,
  payload: {},
});

const receiveItems = (json: any): IAction => ({
  type: RECEIVE_ITEMS,
  payload: {
    items: json.map((item: Item) => item as Item),
  },
});

const fetchItems = (fetchData: Fetch) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());
    return fetchData('api/v1/Items/')
      .then((response: Response) => response.json())
      .then((json: JSON) => dispatch(receiveItems(json)))
      .catch((error: Error) => receiveError(error))
  }
};

const fetchItemsFactory = (fetchData: Fetch) =>
  () => fetchItems(fetchData);

export { fetchItemsFactory }
