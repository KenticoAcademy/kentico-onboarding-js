import { generateId } from '../utils/generateId';
import { Item } from '../models/Item';
import Immutable from 'immutable';

const item1 = new Item({
  id: generateId(),
  value: 'Make a coffee',
});
const item2 = new Item({
  id: generateId(),
  value: 'Master React',
});
const item3 = new Item({
  id: generateId(),
  value: 'Learn Redux',
});
const item4 = new Item({
  id: generateId(),
  value: 'Help making Draft awesome',
});

const defaultListItems = Immutable.OrderedMap({
  [item1.id]: item1,
  [item2.id]: item2,
  [item3.id]: item3,
  [item4.id]: item4,
});

export { defaultListItems };
