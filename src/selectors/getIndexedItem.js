import memoize from 'memoizee';
import { IndexedItem } from '../models/IndexedItem';

const createIndexedItem = (item, index) =>
  new IndexedItem({
    index,
    id: item.id,
    text: item.text,
    isEdited: item.isEdited,
  });

const createIndexedItemMemoized = memoize(createIndexedItem);

export const getIndexedItem = (state, index, id) => {
  const retrievedItem = state.todoList.items.get(id);
  const indexedItem = createIndexedItemMemoized(
    retrievedItem,
    index);

  return createIndexedItemMemoized(indexedItem, index);
};
