import { IAction } from './IAction';
import { Item } from '../models/Item';
import {
  positivelyCreateItemLocally
} from './actionCreators';
import { API_VERSION_1, ITEMS } from '../constants/urls';

const postItemFactory = (dependencies: {
  fetch: Fetch,
  generateId: () => string,
  receivePostItemError: (error: Error, itemUeid: string) => IAction,
  receiveItemCreated: (json: Item) => IAction,
  parseResponse: (errorMessage: string) => (response: Response) => Promise<any>
}) =>
  (value: string) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      const item = new Item({ ueid: dependencies.generateId(), value });
      dispatch(positivelyCreateItemLocally(item));

      return dependencies.fetch(
        API_VERSION_1 + ITEMS,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ueid: item.ueid, value: item.value }),
        })
        .catch(() => Promise.reject(new Error('A good chance we are offline. Item was not saved on the server.')))
        .then(dependencies.parseResponse('Item was not correctly saved on the server'))
        .then((json: Item) => dispatch(dependencies.receiveItemCreated(json)))
        .catch((error: Error) => dispatch(dependencies.receivePostItemError(error, item.ueid)));
    };
  };

export { postItemFactory };
