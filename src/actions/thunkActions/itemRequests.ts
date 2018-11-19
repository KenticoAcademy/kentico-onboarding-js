import {
  IItem,
  Item,
} from '../../models/Item';
import { fetchFactory } from '../thunkFactories/fetchFactory';
import { urlBase } from '../utils/urlBase';
import { headerBase } from '../utils/headerBase';

const itemFetch = fetchFactory(fetch, urlBase, headerBase);

export const getItemsRequest = async (): Promise<ReadonlyArray<IItem>> => {
  const getItems = itemFetch({ method: 'GET' });
  const response = await getItems({});

  const data = await response.json();

  return data.map((item: IItem) => new Item(item));
};

export const postItemRequest = async (text: string): Promise<IItem> => {
  const postItem = itemFetch({ method: 'POST' });
  const response = await postItem({
    data: JSON.stringify({text}),
  });

  const data = await response.json();

  return new Item({
    id: data.id,
    text: data.text,
  });
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

  const data = await response.json();

  return new Item({
    id: data.id,
    text: data.text,
  });
};
