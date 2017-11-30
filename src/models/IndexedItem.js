import { Record } from 'immutable';
import { defaultId } from '../utils/generateId';

const emptyIndexedItem = {
  index: null,
  id: defaultId,
  text: '',
  isEdited: false,
};

export const IndexedItem = Record(emptyIndexedItem);
