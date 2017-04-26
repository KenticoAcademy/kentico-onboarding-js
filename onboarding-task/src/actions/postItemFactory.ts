import { Fetch } from './Fetch';
import { IAction } from './IAction';
import { Dispatch } from '../stores/Dispatch';
import { CREATE_ITEM, RECEIVE_ITEM_CREATED } from './actionTypes';
import { Item } from '../models/Item';

const postItem = (value: string, fetchData: Fetch, generateId: () => string) => {
  return (dispatch: Dispatch): Promise<IAction> => {
    const item = new Item({ ueid: generateId(), value });
    dispatch(createItem(item));
    return fetchData('api/v1/Items/',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ueid: item.ueid, value: item.value })
      })
      .then((response: any) => response.json())
      .then((json: any) => dispatch(receiveItemCreated(json)))
  }
};

const createItem = (item: Item) => ({
  type: CREATE_ITEM,
  payload: {
    ueid: item.ueid,
    value: item.value,
  }
});

const receiveItemCreated = (json: any): IAction => ({
  type: RECEIVE_ITEM_CREATED,
  payload: {
    item: json as Item,
  }
});

const postItemFactory = (fetchData: Fetch) =>
  (generateId: () => string) =>
  (value: string) => postItem(value, fetchData, generateId);

export { postItemFactory };
