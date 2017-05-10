import { Fetch } from './Fetch';
import { IAction } from './IAction';
import { Dispatch } from '../stores/Dispatch';
import { CREATE_ITEM, ITEM_POST_SUCCESS } from './actionTypes';
import { Item } from '../models/Item';
import { receivePostItemError } from './actionCreators';
import { parseResponse } from '../utils/parseResponse';

const createItem = (item: Item) => ({
  type: CREATE_ITEM,
  payload: {
    ueid: item.ueid,
    value: item.value,
  }
});

const receiveItemCreated = (json: Item): IAction => ({
  type: ITEM_POST_SUCCESS,
  payload: {
    item: json as Item,
  }
});


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

export { postItemFactory, createItem };
