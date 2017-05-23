import { IAction } from './IAction';
import { requestItems } from './actionCreators';
import { API_VERSION_1, ITEMS } from '../constants/urls';

const fetchItemsFactory = (fetch: Fetch,
                           parseResponse: (errorMessage: string) => (response: Response) => Promise<any>,
                           receiveItems: (json: any) => IAction,
                           receiveItemsFetchingError: (error: Error) => IAction) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    dispatch(requestItems());
    return fetch(API_VERSION_1 + ITEMS)
      .then(parseResponse('Loading the Item list did not go well'))
      .then((json: JSON) => dispatch(receiveItems(json)))
      .catch((error: Error) => dispatch(receiveItemsFetchingError(error)));
  };
};

export { fetchItemsFactory }
