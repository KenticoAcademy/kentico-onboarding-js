import { IAction } from '../../models/IAction';
import { IListItem } from '../../models/IListItem';
import { Dispatch } from 'redux';
import { addNewItem, cancelItemChanges, deleteItem, receiveItems, requestItems } from '../actionCreators';
import { Guid } from '../../models/Guid';
import { ListItem } from '../../models/ListItem';

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

export const deleteItemFactory = (fetch: any) => (uri: string, id: Guid) => (dispatch: Dispatch<IAction>) =>
  fetch(
    uri + id,
    {
      method: 'DELETE',
    },
  )
    .then(() => dispatch(deleteItem(id)));

export const cancelItemFactory = (fetch: any) => (uri: string, item: ListItem) => (dispatch: Dispatch<IAction>) => {
  const { id } = item;
  const updatedItem = {
    isBeingEdited: false,
    id,
  };

  return fetch(
    uri + id,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    },
  )
    .then(() => dispatch(cancelItemChanges(id)));
};
