import { IAction } from './IAction';
import { receiveItemsFetchingError, requestItems, receiveItems } from './actionCreators';
import { parseResponse } from '../utils/parseResponse';
import { API_VERSION_1, ITEMS } from '../constants/urls';

const fetchItemsFactory = (fetch: Fetch) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());
    return fetch(API_VERSION_1 + ITEMS)
      .then(parseResponse('Loading the Item list did not go well'))
      .then((json: JSON) => dispatch(receiveItems(json)))
      .catch((error: Error) => dispatch(receiveItemsFetchingError(error)));
  };
};

export { fetchItemsFactory }
