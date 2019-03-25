import { IListItem } from '../models/ListItem';
import { requestPath } from '../constants/requestPath';

const validateResponse = async (response: Response): Promise<IListItem> => {
  const responseJson = await response.json();

  if (response.ok) {
    return responseJson;
  }

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

    return await validateResponse(response);
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
