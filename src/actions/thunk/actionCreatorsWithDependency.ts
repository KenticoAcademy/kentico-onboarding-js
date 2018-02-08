import { IAction } from '../../models/interfaces/IAction';
import { IListItem } from '../../models/interfaces/IListItem';
import { Dispatch } from 'redux';
import { Guid } from '../../models/Guid';
import { ListItem } from '../../models/classes/ListItem';

export const fetchItemsFactory =
  (fetch: any) =>
  (requestItems: (uri: string) => IAction) =>
  (receiveItems: (items: IListItem[]) => IAction) =>
  (fetchFailed: (err: Error) => IAction) =>
  (notifyError: (message: string) => IAction) =>
  (registerAction: (action: () => void) => IAction) =>
  (handleErrors: <T>(response: T) => T) =>
  (uri: string) =>
  (dispatch: Dispatch<IAction>) => {
    const action = () => {
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

    dispatch(registerAction(action));

    return action();
  };

export const postItemFactory =
  (fetch: any) =>
  (addNewItem: (item: IListItem) => IAction) =>
  (notifySuccess: (message: string) => IAction) =>
  (notifyError: (message: string) => IAction) =>
  (registerAction: (action: () => void) => IAction) =>
  (handleErrors: <T>(response: T) => T) =>
  (uri: string, text: string) =>
  (dispatch: Dispatch<IAction>) => {
    const newItem = {
      isBeingEdited: false,
      text,
    };

    const action = () => fetch(
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

    dispatch(registerAction(action));

    return action();
  };

export const deleteItemFactory =
  (fetch: any) =>
  (deleteItem: (id: Guid) => IAction) =>
  (notifySuccess: (message: string) => IAction) =>
  (notifyError: (message: string) => IAction) =>
  (registerAction: (action: () => void) => IAction) =>
  (handleErrors: <T>(response: T) => T) =>
  (uri: string, id: Guid) =>
  (dispatch: Dispatch<IAction>) => {
    const action = () => fetch(
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

    dispatch(registerAction(action));

    return action();
  };

export const cancelItemFactory =
  (fetch: any) =>
  (cancelItemChanges: (id: Guid) => IAction) =>
  (notifyError: (message: string) => IAction) =>
  (registerAction: (action: () => void) => IAction) =>
  (handleErrors: <T>(response: T) => T) =>
  (uri: string, item: ListItem) =>
  (dispatch: Dispatch<IAction>) => {
    const { id } = item;
    const updatedItem = {
      isBeingEdited: false,
      id,
    };

    const action = () => fetch(
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

    dispatch(registerAction(action));

    return action();
  };

export const openItemFactory =
  (fetch: any) =>
  (openItemForEditing: (id: Guid) => IAction) =>
  (notifyError: (message: string) => IAction) =>
  (registerAction: (action: () => void) => IAction) =>
  (handleErrors: <T>(response: T) => T) =>
  (uri: string, item: ListItem) =>
  (dispatch: Dispatch<IAction>) => {
    const { id } = item;
    const updatedItem = {
      isBeingEdited: true,
      id,
    };

    const action = () => fetch(
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

    dispatch(registerAction(action));

    return action();
  };

export const saveNewTextFactory =
  (fetch: any) =>
  (saveItemChanges: (id: Guid, text: string) => IAction) =>
  (notifySuccess: (message: string) => IAction) =>
  (notifyError: (message: string) => IAction) =>
  (registerAction: (action: () => void) => IAction) =>
  (handleErrors: <T>(response: T) => T) =>
  (uri: string, item: ListItem, text: string) =>
  (dispatch: Dispatch<IAction>) => {
    const { id } = item;
    const updatedItem = {
      text,
      isBeingEdited: false,
      id,
    };

    const action = () => fetch(
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

    dispatch(registerAction(action));

    return action();
  };
