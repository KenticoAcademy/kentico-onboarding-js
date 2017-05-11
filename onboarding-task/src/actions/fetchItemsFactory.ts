import { Fetch } from './Fetch';
import { Dispatch } from '../stores/Dispatch';
import { IAction } from './IAction';
import { receiveItemsFetchingError, requestItems, receiveItems } from './actionCreators';
import { parseResponse } from '../utils/parseResponse';

const fetchItemsFactory = (fetch: Fetch) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());
    return fetch('api/v1/Items/')
      .then(parseResponse(': Loading the Item list did not go well'))
      .then((json: JSON) => dispatch(receiveItems(json)))
      .catch((error: Error) => dispatch(receiveItemsFetchingError(error)));
  };
};

export { fetchItemsFactory }
