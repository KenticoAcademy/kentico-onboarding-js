import { Fetch } from './Fetch';
import { IAction } from './IAction';
import { Item } from '../models/Item';
import {
  receivePostItemError,
  positivelyCreateItemLocally,
  receiveItemCreated
} from './actionCreators';
import { parseResponse } from '../utils/parseResponse';
import { API_VERSION_1, ITEMS } from '../constants/urls';

const postItemFactory = (fetch: Fetch, generateId: () => string) =>
  (value: string) => {
    return (dispatch: Dispatch): Promise<IAction> => {
      const item = new Item({ ueid: generateId(), value });
      dispatch(positivelyCreateItemLocally(item));

      if (!navigator.onLine) {
        return new Promise(() =>
          dispatch(receivePostItemError(
            new Error('A good chance we are offline. Item was not saved on the server.'),
            item.ueid
            )
          )
        );
      }
      return fetch(
        API_VERSION_1 + ITEMS,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ueid: item.ueid, value: item.value }),
        })
        .then(parseResponse('Item was not correctly saved on the server'))
        .then((json: Item) => dispatch(receiveItemCreated(json)))
        .catch((error: Error) => dispatch(receivePostItemError(error, item.ueid)));
    };
  };

export { postItemFactory };
