import { generateId } from '../utils/generateId';
import { ItemPattern } from '../models/ItemPattern';
import Immutable from 'immutable';

const item1 = new ItemPattern({
  id: generateId(),
  value: 'Make a coffee',
});
const item2 = new ItemPattern({
  id: generateId(),
  value: 'Master React',
});
const item3 = new ItemPattern({
  id: generateId(),
  value: 'Learn Redux',
});
const item4 = new ItemPattern({
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
