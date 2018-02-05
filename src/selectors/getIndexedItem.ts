import * as memoize from 'memoizee';
import { IndexedItem } from '../models/IndexedItem';
import { IAppState } from '../models/IAppState';
import { Uuid } from '../utils/generateId';
import { ListItem } from '../models/ListItem';

const createIndexedItem = (item: ListItem, index: number): IndexedItem =>
  new IndexedItem({
    index,
    id: item.id,
    text: item.text,
    isEdited: item.isEdited,
    isSynchronized: item.isSynchronized,
    errorMessage: item.errorMessage
  });

const createIndexedItemMemoized = memoize(createIndexedItem);

export const getIndexedItem = (state: IAppState, index: number, id: Uuid) => {
  const retrievedItem = state.todoList.items.get(id);

  return createIndexedItemMemoized(retrievedItem, index);
};
