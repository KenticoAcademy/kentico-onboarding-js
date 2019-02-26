import { IListItem } from '../models/ListItem';
import { requestPath } from '../constants/requestPath';

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
