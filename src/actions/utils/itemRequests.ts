import {
  IItem,
  Item,
} from '../../models/Item';
import { fetchFactory } from './fetchFactory';
import { urlBase } from './urlBase';
import { headerBase } from './headerBase';

const itemFetch = fetchFactory(fetch, urlBase, headerBase);

export const getItemsRequest = async (): Promise<ReadonlyArray<IItem>> => {
  const getItems = itemFetch({ method: 'GET' });
  const response = await getItems({});

  const rawItems = await response.json();

  return rawItems.map((item: IItem) => new Item(item));
};

export const postItemRequest = async (text: string): Promise<IItem> => {
  const postItem = itemFetch({ method: 'POST' });
  const response = await postItem({
    data: JSON.stringify({text}),
  });

  const rawItem = await response.json();

  return new Item(rawItem);
};

export const putItemRequest = async (item: IItem): Promise<void> => {
  const {id, text} = item;
  const putItem = itemFetch({ method: 'PUT' });

  await putItem({
    id,
    data: JSON.stringify({id, text}),
  });
};

export const deleteItemRequest = async (id: Guid): Promise<IItem> => {
  const deleteItem = itemFetch({ method: 'DELETE' });
  const response = await deleteItem({ id });

  const rawItem = await response.json();

  return new Item(rawItem);
};
