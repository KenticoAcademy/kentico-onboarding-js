import { OrderedMap } from 'immutable';
import { generateId } from '../utils/generateId';
import { Item } from '../models/Item';

const id1 = generateId();
const id2 = generateId();
const id3 = generateId();
const id4 = generateId();

const defaultListItems = [
  [
    id1,
    new Item({
      id: id1,
      text: 'Make a coffee',
    }),
  ],
  [
    id2,
    new Item({
      id: id2,
      text: 'Master React',
    }),
  ],
  [
    id3,
    new Item({
      id: id3,
      text: 'Learn Redux',
    }),
  ],
  [
    id4,
    new Item({
      id: id4,
      text: 'Help making Draft awesome',
    }),
  ],
];

const defaultStateValues = { items: { byId: new OrderedMap(defaultListItems) }, newItemText: '' };

export { defaultStateValues };
