import { IAction } from '../../models/IAction';
import { IListItem } from '../../models/IListItem';
import { Dispatch } from 'redux';
import { addNewItem, receiveItems, requestItems } from '../actionCreators';

export const fetchItemsFactory = (fetch: any) => (uri: string) => (dispatch: Dispatch<IAction>) => {
  dispatch(requestItems(uri));

  return fetch(uri)
    .then((res: any) => res.json())
    .then((items: IListItem[]) => dispatch(receiveItems(items)));
};

export const postItemFactory = (fetch: any) => (uri: string, text: string) => (dispatch: Dispatch<IAction>) => {
  const newItem = {
    isBeingEdited: false,
    text,
  };

  return fetch(
    uri,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    }
  )
    .then((res: any) => res.json())
    .then((returnedItem: IListItem) => dispatch(addNewItem(returnedItem)));
};
