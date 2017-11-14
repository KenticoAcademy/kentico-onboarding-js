import { generateId } from '../utils/generateId';
import Immutable from 'immutable';

const rec1 = Immutable.Record({
  id: generateId(),
  value: 'Make a coffee',
  isBeingEdited: false,
});
const rec2 = Immutable.Record({
  id: generateId(),
  value: 'Master React',
  isBeingEdited: false,
});
const rec3 = Immutable.Record({
  id: generateId(),
  value: 'Learn Redux',
  isBeingEdited: false,
});
const rec4 = Immutable.Record({
  id: generateId(),
  value: 'Help making Draft awesome',
  isBeingEdited: false,
});

const defaultListItems = Immutable.OrderedMap();
defaultListItems.set(rec1.id, rec1);
defaultListItems.set(rec2.id, rec2);
defaultListItems.set(rec3.id, rec3);
defaultListItems.set(rec4.id, rec4);

export { defaultListItems };
