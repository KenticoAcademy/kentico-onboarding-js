import { OrderedMap } from 'immutable';
import { generateId } from '../utils/generateId';
import { Item } from '../models/Item.ts';

const defaultListItems = [
  'Make a coffee',
  'Master React',
  'Learn Redux',
  'Help making Draft awesome',
].map(text => {
  const id = generateId();
  return [
    id,
    new Item({
      id,
      text,
    }),
  ];
});

const defaultStateValues = {
  items: {
    byId: new OrderedMap(defaultListItems),
    newItemText: '',
  },
};

export { defaultStateValues };
