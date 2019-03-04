import { IListItem } from '../models/ListItem';
import { requestPath } from '../constants/requestPath';

const getErrorMessage = async <T>(response: Response): Promise<T> => {
  const responseJson = await response.json();
  const error = responseJson.modelState;
  const errorMessage = Object.keys(error)
    .map(key => error[key][0])
    .join('');

  return Promise.reject(new Error(errorMessage));
};

export const storeItem = async (itemText: string): Promise<IListItem> => {
  try {
    const response = await fetch(requestPath, {
      method: 'POST',
      body: JSON.stringify({ text: itemText }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      return await response.json();
    }

    return await getErrorMessage(response);
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};

export const fetchItems = async (): Promise<ReadonlyArray<IListItem>> => {
  try {
    const response = await fetch(
      requestPath,
      { method: 'GET' }
    );

    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('This should never happen! Something went really wrong.'));
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};

export const deleteItem = async (id: Uuid): Promise<void> => {
  try {
    const response = await fetch(requestPath + id,
      {
        method: 'DELETE'
      });

    if (response.ok) {
      return;
    }

    await getErrorMessage(response);
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};

export const editItem = async (id: Uuid, text: string): Promise<IListItem> => {
  try {
    const response = await fetch(
      requestPath + id,
      {
        method: 'PUT',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
      });

    if (response.ok) {
      return await response.json();
    }

    return getErrorMessage(response);
  } catch (error) {
    throw new Error('Couldn\'t connect to server.');
  }
};
