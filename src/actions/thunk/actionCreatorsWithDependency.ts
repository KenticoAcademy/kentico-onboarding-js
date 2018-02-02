import { IAction } from '../../models/IAction';
import { IListItem } from '../../models/IListItem';
import { Dispatch } from 'redux';
import {
  addNewItem, cancelItemChanges, deleteItem, fetchFailed, notifyError, notifySuccess,
  openItemForEditing, receiveItems, requestItems,
  saveItemChanges
} from '../actionCreators';
import { Guid } from '../../models/Guid';
import { ListItem } from '../../models/ListItem';

const handleErrors = (response: any) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export const fetchItemsFactory = (fetch: any) => (uri: string) => (dispatch: Dispatch<IAction>) => {
  dispatch(requestItems(uri));

  return fetch(uri)
    .then(handleErrors)
    .then((res: any) => res.json())
    .then((items: IListItem[]) => dispatch(receiveItems(items)))
    .catch((err: Error) => {
      dispatch(notifyError('Items failed to load.'));
      dispatch(fetchFailed(err));
    });
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
    .then(handleErrors)
    .then((res: any) => res.json())
    .then((returnedItem: IListItem) => {
      dispatch(notifySuccess('Item was created.'));
      dispatch(addNewItem(returnedItem));
    })
    .catch(() => dispatch(notifyError('Item failed to create.')));
};

export const deleteItemFactory = (fetch: any) => (uri: string, id: Guid) => (dispatch: Dispatch<IAction>) =>
  fetch(
    uri + id,
    {
      method: 'DELETE',
    },
  )
    .then(handleErrors)
    .then(() => {
      dispatch(notifySuccess('Item was deleted.'));
      dispatch(deleteItem(id));
    })
    .catch(() => dispatch(notifyError('Item failed to delete.')));

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
    .then(handleErrors)
    .then(() => dispatch(cancelItemChanges(id)))
    .catch(() => dispatch(notifyError('Item failed to cancel.')));
};

export const openItemFactory = (fetch: any) => (uri: string, item: ListItem) => (dispatch: Dispatch<IAction>) => {
  const { id } = item;
  const updatedItem = {
    isBeingEdited: true,
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
    .then(handleErrors)
    .then(() => dispatch(openItemForEditing(id)))
    .catch(() => dispatch(notifyError('Item failed to open.')));
};

export const saveNewTextFactory = (fetch: any) => (uri: string, item: ListItem, text: string) => (dispatch: Dispatch<IAction>) => {
  const { id } = item;
  const updatedItem = {
    text,
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
    .then(handleErrors)
    .then(() => {
      dispatch(notifySuccess('Item text was updated.'));
      dispatch(saveItemChanges(item.id, text));
    })
    .catch(() => dispatch(notifyError('Item failed to update.')));
};
