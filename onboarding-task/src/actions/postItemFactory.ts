import { Fetch } from './Fetch';
import { IAction } from './IAction';
import { Dispatch } from '../stores/Dispatch';
import { Item } from '../models/Item';
import { receivePostItemError, createItem, receiveItemCreated } from './actionCreators';
import { parseResponse } from '../utils/parseResponse';



const postItemFactory = (fetch: Fetch) =>
  (generateId: () => string) =>
    (value: string) => {
      return (dispatch: Dispatch): Promise<IAction> => {
        const item = new Item({ ueid: generateId(), value });
        dispatch(createItem(item));
        return fetch('api/v1/Items/',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ueid: item.ueid, value: item.value }),
          })
          .then(parseResponse(': Item was not correctly saved on the server'))
          .then((json: Item) => dispatch(receiveItemCreated(json)))
          .catch((error: Error) => dispatch(receivePostItemError(error, item.ueid)));
      };
    };

export { postItemFactory };
