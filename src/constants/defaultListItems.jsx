import { generateId } from '../utils/generateId';
import Immutable from 'immutable';

const rec1 = Immutable.Record({
  value: 'Make a coffee',
  isBeingEdited: false,
});
const rec2 = Immutable.Record({
  value: 'Master React',
  isBeingEdited: false,
});
const rec3 = Immutable.Record({
  value: 'Learn Redux',
  isBeingEdited: false,
});
const rec4 = Immutable.Record({
  value: 'Help making Draft awesome',
  isBeingEdited: false,
});

const defaultListItems = Immutable.Map();
defaultListItems.set(generateId(), rec1);
defaultListItems.set(generateId(), rec2);
defaultListItems.set(generateId(), rec3);
defaultListItems.set(generateId(), rec4);

export { defaultListItems };
